/**
 * Tafseer Module
 * Renders classical tafsir commentary for the loaded ayahs, fetched from the
 * quran.com v4 API (GET /tafsirs/{id}/by_ayah/{surah}:{ayah}).
 */

/**
 * Tafsir sources grouped by content language. Two kinds of source:
 *   • `id`   → a numeric quran.com v4 resource (offline-first: bundled JSON in
 *              data/tafsir/<id>.json, else GET /tafsirs/<id>/by_ayah/<key>).
 *   • `slug` → a spa5k/tafsir_api edition served from the jsdelivr CDN
 *              (GET .../tafsir/<slug>/<surah>/<ayah>.json → { "text": … }).
 * The slug editions bring per-verse tafsir to the UI languages that quran.com
 * has none for (fa/id/tr/hi/fr/es/ja/zh) — primarily al-Mukhtasar ("Abridged
 * Explanation of the Quran", Tafsir Center), plus As-Saadi where published.
 * Every slug below was verified to return HTTP 200 for a sample verse.
 * Names are proper titles of published works — intentionally not translated.
 */
const TAFSIR_SOURCES = {
  en: [
    { id: 169, name: 'Ibn Kathir (Abridged)' },
    { id: 168, name: "Ma'arif al-Qur'an" },
    { id: 817, name: 'Tazkirul Quran' }
  ],
  bn: [
    { id: 165, name: 'Tafsir Ahsanul Bayaan' },
    { id: 166, name: 'Tafsir Abu Bakr Zakaria' },
    { id: 164, name: 'Tafseer ibn Kathir' },
    { slug: 'bengali-mokhtasar', name: 'Al-Mukhtasar (সংক্ষিপ্ত তাফসীর)' }
  ],
  ar: [
    { id: 16, name: 'Tafsir Muyassar' },
    { id: 14, name: 'Tafsir Ibn Kathir' },
    { id: 15, name: 'Tafsir al-Tabari' },
    { id: 90, name: 'Al-Qurtubi' },
    { id: 91, name: "Al-Sa'di" }
  ],
  ur: [
    { id: 160, name: 'Tafsir Ibn Kathir' },
    { id: 157, name: 'Fi Zilal al-Quran' },
    { id: 159, name: 'Bayan ul Quran' }
  ],
  ru: [
    { id: 170, name: "Al-Sa'di" },
    { slug: 'russian-mokhtasar', name: 'Al-Mukhtasar (Толкование)' }
  ],
  fa: [
    { slug: 'persian-mokhtasar', name: 'المختصر (Al-Mukhtasar)' },
    { slug: 'fr-tafsir-as-saadi', name: 'تفسیر سعدی (As-Saadi)' }
  ],
  id: [
    { slug: 'indonesian-mokhtasar', name: 'Al-Mukhtasar (Tafsir Ringkas)' },
    { slug: 'id-tafsir-as-saadi', name: 'Tafsir As-Saadi' }
  ],
  tr: [
    { slug: 'turkish-mokhtasar', name: 'El-Muhtasar (Özet Tefsir)' },
    { slug: 'turkish-tafsir-as-saadi-turkish', name: 'Tefsir es-Sa\'dî' }
  ],
  hi: [
    { slug: 'hindi-mokhtasar', name: 'अल-मुख़्तसर (Al-Mukhtasar)' }
  ],
  fr: [
    { slug: 'french-mokhtasar', name: 'Al-Mukhtasar (Explication abrégée)' }
  ],
  es: [
    { slug: 'spanish-mokhtasar', name: 'Al-Mujtasar (Explicación abreviada)' }
  ],
  ja: [
    { slug: 'japanese-mokhtasar', name: 'Al-Mukhtasar (要約された解説)' }
  ],
  zh: [
    { slug: 'chinese-mokhtasar', name: '古兰经简明注释 (Al-Mukhtasar)' }
  ]
  // ms/de have no published al-Mukhtasar edition → fall back to the English
  // list plus the Arabic classics (see sourcesFor / populateSources).
};

/** Stable string key for a source: the slug, or the quran.com id as text. */
function tafsirKey(src) {
  return src.slug || String(src.id);
}
/** True when a tafsir key is a tafsir_api slug (vs. a numeric quran.com id). */
function isTafsirSlug(key) {
  return typeof key === 'string' && !/^\d+$/.test(key);
}

// Content language of every tafsir resource (drives RTL rendering of the body)
const TAFSIR_ID_LANG = {};
// Proper title of every tafsir resource (used for compare-mode column labels)
const TAFSIR_ID_NAME = {};
Object.keys(TAFSIR_SOURCES).forEach(lang => {
  TAFSIR_SOURCES[lang].forEach(src => {
    const key = tafsirKey(src);
    TAFSIR_ID_LANG[key] = lang;
    TAFSIR_ID_NAME[key] = src.name;
  });
});

const TAFSIR_RTL_LANGS = ['ar', 'ur', 'fa'];

// Above this many loaded ayahs, render collapsed accordions and fetch lazily
const TAFSIR_ACCORDION_THRESHOLD = 8;

class TafseerView {
  constructor() {
    this.container = document.getElementById('tafseer-container');
    if (!this.container) return;

    this.select = document.getElementById('tafseer-source');
    this.content = document.getElementById('tafseer-content');

    this.ayahs = [];
    this.language = (typeof appSettings !== 'undefined' && appSettings.get('language')) || 'en';
    this.rendered = false;
    this.renderToken = 0;
    this.cache = new Map(); // "tafsirId:verseKey" -> {text, resourceName} | null
    // Side-by-side source comparison (remembered across sessions)
    this.compare = false;
    try { this.compare = localStorage.getItem('tafsirCompare') === '1'; } catch (e) { /* ignore */ }
    // Persisted per-ayah bookmarks: [{ key, sid }] (sid = tafsir source id)
    this.BOOKMARKS_KEY = 'tafsirBookmarks_v1';
    this.bookmarks = this.loadBookmarks();

    this.injectStyles();
    this.populateSources();

    window.addEventListener('ayahsLoaded', (e) => {
      this.ayahs = e.detail.ayahs;
      this.language = e.detail.language;
      this.rendered = false;
      if (this.isTabVisible()) this.render();
    });

    window.addEventListener('tabChanged', (e) => {
      if (e.detail.tabId === 'tafseer' && !this.rendered) this.render();
    });

    window.addEventListener('settingChanged', (e) => {
      if (e.detail.key !== 'language') return;
      this.language = e.detail.value;
      this.populateSources();
      this.rendered = false;
      if (this.isTabVisible()) this.render();
    });

    if (this.select) {
      this.select.addEventListener('change', () => {
        this.rememberSource();
        this.rendered = false;
        if (this.isTabVisible()) this.render();
      });
    }

    // Lazy accordion expansion + in-pane controls (font, width, compare, jump…)
    if (this.content) {
      this.content.addEventListener('click', (e) => this.onContentClick(e));
      this.content.addEventListener('change', (e) => this.onContentChange(e));
    }
  }

  /** Persist the chosen primary source, scoped to the current UI language. */
  rememberSource() {
    if (!this.select || !this.select.value) return;
    try { localStorage.setItem('tafsirSource:' + this.language, this.select.value); } catch (e) { /* ignore */ }
  }

  /* ---------- bookmarks (persist an ayah + its chosen source) ---------- */

  loadBookmarks() {
    try {
      const v = JSON.parse(localStorage.getItem(this.BOOKMARKS_KEY));
      // sid may be a legacy number or a tafsir_api slug — normalise to a string
      // so it round-trips against the string-keyed source maps.
      return Array.isArray(v)
        ? v.filter(b => b && b.key).map(b => ({ key: b.key, sid: b.sid == null ? '' : String(b.sid) }))
        : [];
    } catch (e) { return []; }
  }

  saveBookmarks() {
    try { localStorage.setItem(this.BOOKMARKS_KEY, JSON.stringify(this.bookmarks)); }
    catch (e) { /* quota / private mode */ }
  }

  isBookmarked(key) {
    const sid = this.selectedTafsirId();
    return this.bookmarks.some(b => b.key === key && b.sid === sid);
  }

  /** Toggle the current source's bookmark for an ayah, then refresh the view. */
  toggleBookmark(key) {
    if (!key) return;
    const sid = this.selectedTafsirId();
    const i = this.bookmarks.findIndex(b => b.key === key && b.sid === sid);
    if (i === -1) this.bookmarks.unshift({ key, sid });
    else this.bookmarks.splice(i, 1);
    this.saveBookmarks();
    this.rendered = false;
    this.render();
  }

  /**
   * Open a saved bookmark: restore its source, then ensure the ayah is loaded.
   * If it is among the loaded ayahs, just jump to its card; otherwise deep-link
   * it into Reading (same hash pattern the rest of the app uses) so the shared
   * selection — and this tafsir view — reload around it.
   */
  loadBookmark(key, sid) {
    if (this.select && sid &&
        [...this.select.options].some(o => o.value === sid)) {
      this.select.value = sid;
      this.rememberSource();
    }
    if (this.ayahs.some(a => a.key === key)) {
      this.rendered = false;
      this.render();
      this.jumpToCard(key);
      return;
    }
    if (typeof tabSystem !== 'undefined' && tabSystem) tabSystem.switchTab('reading');
    if (decodeURIComponent(window.location.hash.slice(1)) === key) {
      if (typeof quranApp !== 'undefined' && quranApp) {
        quranApp._writingHash = null;
        quranApp.handleHashChange();
      }
    } else {
      window.location.hash = key;
    }
  }

  isTabVisible() {
    const panel = document.getElementById('tab-tafseer');
    return panel && !panel.classList.contains('hidden');
  }

  injectStyles() {
    if (document.getElementById('tafseer-styles')) return;
    const style = document.createElement('style');
    style.id = 'tafseer-styles';
    style.textContent = `
      .tafseer-body { line-height: 1.8; font-size: calc(1rem * var(--tafsir-scale, 1)); overflow-wrap: break-word; }
      .tafseer-body p { margin: 0 0 0.75rem; }
      /* API HTML can contain wide tables/images: keep them inside the card */
      .tafseer-body table { display: block; max-width: 100%; overflow-x: auto; }
      .tafseer-body img { max-width: 100%; height: auto; }
      .tafseer-body h1, .tafseer-body h2, .tafseer-body h3, .tafseer-body h4 {
        font-weight: 600; margin: 1rem 0 0.5rem;
      }
      .tafseer-body blockquote {
        border-inline-start: 3px solid rgba(30, 64, 175, 0.4);
        padding-inline-start: 0.75rem; margin: 0.75rem 0; opacity: 0.9;
      }
      .tafseer-body ul, .tafseer-body ol { padding-inline-start: 1.5rem; margin: 0 0 0.75rem; }
      .tafseer-body[dir="rtl"] { font-size: calc(1.125rem * var(--tafsir-scale, 1)); }
      /* Reading-width control: narrow centres the prose column for comfort */
      #tafseer-content.tafseer-narrow > [data-tafseer-card] { max-width: 46rem; margin-inline: auto; }
      /* Compare mode: two source columns side by side on wide screens */
      .tafseer-compare-grid { display: grid; gap: 1rem; }
      @media (min-width: 768px) { .tafseer-compare-grid { grid-template-columns: 1fr 1fr; } }
      /* Visible keyboard focus on the pane's controls */
      #tafseer-content button:focus-visible, #tafseer-content select:focus-visible {
        outline: 2px solid #1e40af; outline-offset: 2px;
      }
      .dark #tafseer-content button:focus-visible, .dark #tafseer-content select:focus-visible {
        outline-color: #60a5fa;
      }
      /* Comfortable touch targets for the small pill controls on phones */
      @media (max-width: 640px) {
        #tafsir-toolbar button, #tafseer-content [data-tafsir-copy],
        #tafseer-content [data-tafsir-jump], #tafseer-content [data-tafsir-rel],
        #tafseer-content [data-tafsir-retry] {
          min-height: 2.5rem; min-width: 2.5rem;
        }
      }
    `;
    document.head.appendChild(style);
  }

  /** Native tafsir list for a UI language (fr/id/tr fall back to English). */
  sourcesFor(lang) {
    return TAFSIR_SOURCES[lang] || TAFSIR_SOURCES.en;
  }

  populateSources() {
    if (!this.select) return;
    const lang = this.language;
    const previous = this.select.value;
    this.select.innerHTML = '';

    this.sourcesFor(lang).forEach(src => {
      const opt = document.createElement('option');
      opt.value = tafsirKey(src);
      opt.textContent = src.name;
      this.select.appendChild(opt);
    });

    // Arabic classics as a secondary group when the UI language is not Arabic
    if (lang !== 'ar') {
      const group = document.createElement('optgroup');
      group.label = t('arabic_classics', lang);
      TAFSIR_SOURCES.ar.forEach(src => {
        const opt = document.createElement('option');
        opt.value = tafsirKey(src);
        opt.textContent = src.name;
        group.appendChild(opt);
      });
      this.select.appendChild(group);
    }

    // Keep the previous choice, else fall back to the source remembered for
    // this language, else leave the first option selected.
    const has = (val) => val && [...this.select.options].some(o => o.value === val);
    let saved = null;
    try { saved = localStorage.getItem('tafsirSource:' + lang); } catch (e) { /* ignore */ }
    if (has(previous)) this.select.value = previous;
    else if (has(saved)) this.select.value = saved;
  }

  /** Shared <option>/<optgroup> markup for the primary + compare selects. */
  sourceOptionsHtml(selectedId) {
    const opt = (src) => {
      const key = tafsirKey(src);
      return `<option value="${key}"${key === selectedId ? ' selected' : ''}>${src.name}</option>`;
    };
    let html = this.sourcesFor(this.language).map(opt).join('');
    if (this.language !== 'ar') {
      html += `<optgroup label="${t('arabic_classics', this.language)}">` +
        TAFSIR_SOURCES.ar.map(opt).join('') + '</optgroup>';
    }
    return html;
  }

  /**
   * Resolve the secondary source for compare mode (never equal to primary).
   * Keys are strings (numeric quran.com id or a tafsir_api slug).
   */
  compareTafsirId() {
    const primary = this.selectedTafsirId();
    let stored = null;
    try { stored = localStorage.getItem('tafsirCompareId'); } catch (e) { /* ignore */ }
    if (stored && stored !== primary) return stored;
    const list = this.sourcesFor(this.language).concat(TAFSIR_SOURCES.ar);
    const alt = list.find(s => tafsirKey(s) !== primary);
    return alt ? tafsirKey(alt) : primary;
  }

  /** The chosen primary source key (numeric-id string or tafsir_api slug). */
  selectedTafsirId() {
    const val = this.select && this.select.value;
    if (val) return val;
    return tafsirKey(this.sourcesFor(this.language)[0]);
  }

  /** Strip scripts, styles, iframes and inline event handlers from API HTML. */
  sanitizeHtml(html) {
    const tpl = document.createElement('template');
    tpl.innerHTML = html || '';
    tpl.content.querySelectorAll('script, style, iframe, object, embed, link, meta, form')
      .forEach(node => node.remove());
    tpl.content.querySelectorAll('*').forEach(el => {
      [...el.attributes].forEach(attr => {
        const name = attr.name.toLowerCase();
        if (name.startsWith('on')) el.removeAttribute(attr.name);
        if ((name === 'href' || name === 'src') &&
            attr.value.trim().toLowerCase().startsWith('javascript:')) {
          el.removeAttribute(attr.name);
        }
      });
    });
    return tpl.innerHTML;
  }

  /**
   * Lazily load a whole bundled tafsir (data/tafsir/<id>.json = { "s:a": html })
   * once per source id, cached as a promise. Resolves to the dict, or null if the
   * source isn't bundled offline (then fetchTafsir falls back to the live API).
   */
  getLocalTafsir(tafsirId) {
    if (!this._localTafsir) this._localTafsir = {};
    if (!(tafsirId in this._localTafsir)) {
      this._localTafsir[tafsirId] = fetch(`data/tafsir/${tafsirId}.json`)
        .then(r => r.ok ? r.json() : null)
        .catch(() => null);
    }
    return this._localTafsir[tafsirId];
  }

  /** Fetch one tafsir entry, cached by "tafsirId:verseKey". Returns null if empty. */
  async fetchTafsir(tafsirId, verseKey) {
    const cacheKey = `${tafsirId}:${verseKey}`;
    if (this.cache.has(cacheKey)) return this.cache.get(cacheKey);

    // spa5k/tafsir_api sources (slug-keyed): fetch the per-verse JSON off the
    // jsdelivr CDN. The service worker caches cross-origin GETs, so this becomes
    // available offline after the first successful view — no SW change needed.
    if (isTafsirSlug(tafsirId)) {
      const [s, a] = verseKey.split(':');
      const url = `https://cdn.jsdelivr.net/gh/spa5k/tafsir_api@main/tafsir/${tafsirId}/${s}/${a}.json`;
      const promise = fetch(url)
        .then(r => {
          if (!r.ok) throw new Error(`Tafsir request failed (${r.status})`);
          return r.json();
        })
        .then(data => {
          const txt = data && data.text;
          if (typeof txt !== 'string' || !txt.trim()) return null;
          return {
            text: this.sanitizeHtml(txt),
            resourceName: TAFSIR_ID_NAME[tafsirId] || ''
          };
        })
        .catch(err => { this.cache.delete(cacheKey); throw err; });
      this.cache.set(cacheKey, promise);
      const slugResult = await promise;
      this.cache.set(cacheKey, slugResult);
      return slugResult;
    }

    // Offline-first: use the bundled tafsir when this source is available locally.
    // Files are stored compactly (commentary text once per group, keyed at the
    // group's first verse), so for a mid-group verse we forward-fill: walk back
    // within the same surah to the nearest preceding verse that carries text.
    try {
      const local = await this.getLocalTafsir(tafsirId);
      if (local) {
        let txt = local[verseKey];
        if (!txt || !txt.trim()) {
          const parts = verseKey.split(':');
          const s = parts[0], a = parseInt(parts[1], 10);
          for (let x = a - 1; x >= 1; x--) {
            const t = local[s + ':' + x];
            if (t && t.trim()) { txt = t; break; }
          }
        }
        if (typeof txt === 'string' && txt.trim()) {
          const result = { text: this.sanitizeHtml(txt), resourceName: TAFSIR_ID_NAME[tafsirId] || '' };
          this.cache.set(cacheKey, result);
          return result;
        }
      }
    } catch (e) { /* fall through to API */ }

    const promise = fetch(`https://api.quran.com/api/v4/tafsirs/${tafsirId}/by_ayah/${verseKey}`)
      .then(r => {
        if (!r.ok) throw new Error(`Tafsir request failed (${r.status})`);
        return r.json();
      })
      .then(data => {
        const tafsir = data && data.tafsir;
        if (!tafsir || !tafsir.text || !tafsir.text.trim()) return null;
        return {
          text: this.sanitizeHtml(tafsir.text),
          resourceName: tafsir.resource_name || ''
        };
      })
      .catch(err => {
        this.cache.delete(cacheKey);
        throw err;
      });

    this.cache.set(cacheKey, promise);
    const result = await promise;
    this.cache.set(cacheKey, result);
    return result;
  }

  bodyDirAttr(tafsirId) {
    return TAFSIR_RTL_LANGS.includes(TAFSIR_ID_LANG[tafsirId]) ? 'rtl' : 'ltr';
  }

  render() {
    const lang = this.language;

    if (!this.content) return;

    if (this.ayahs.length === 0) {
      this.content.innerHTML = `
        <p class="text-gray-500 dark:text-gray-400 text-center py-12">${t('load_ayah_first', lang)}</p>
      `;
      return;
    }

    this.rendered = true;
    this.renderToken++;
    const tafsirId = this.selectedTafsirId();
    this.accordionMode = this.ayahs.length > TAFSIR_ACCORDION_THRESHOLD;

    if (this.accordionMode) {
      this.renderAccordions(tafsirId);
    } else {
      this.renderExpanded(tafsirId);
    }
    this.content.insertAdjacentHTML('afterbegin', this.headerHtml(lang));
    this.applyReadingPrefs();
  }

  /* ---------- reading comfort: toolbar, outline, font, width ---------- */

  /** Full in-pane header: outline strip (jump-to-ayah) + control toolbar. */
  headerHtml(lang) {
    return this.bookmarksBarHtml(lang) + this.outlineHtml(lang) +
           this.toolbarHtml(lang) + this.compareBarHtml(lang);
  }

  /** Saved-bookmark chips; a chip restores its source and reopens the ayah. */
  bookmarksBarHtml(lang) {
    if (!this.bookmarks.length) return '';
    const chips = this.bookmarks.map(b => {
      const name = TAFSIR_ID_NAME[b.sid] || '';
      return `<button data-tafsir-bm-jump="${b.key}" data-sid="${b.sid}"
          title="${b.key}${name ? ' · ' + name : ''}"
          class="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-full border border-amber-300 dark:border-amber-500/40 text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-500/10 hover:bg-amber-100 dark:hover:bg-amber-500/20 transition-colors">
          <span aria-hidden="true">🔖</span>${b.key}</button>`;
    }).join('');
    return `
      <div class="mb-3">
        <div class="text-xs text-gray-400 mb-1">${t('tafsir_bookmarks', lang)}</div>
        <div class="flex gap-1.5 overflow-x-auto pb-1" dir="ltr">${chips}</div>
      </div>`;
  }

  /** Control toolbar: font size, reading width, compare + expand/collapse all. */
  toolbarHtml(lang) {
    const btn = (attr, label) =>
      `<button ${attr} class="px-2 py-1 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">${label}</button>`;
    const bulk = this.accordionMode ? `
        ${btn(`data-tafsir-expand-all="1"`, t('expand_all', lang))}
        ${btn(`data-tafsir-collapse-all="1"`, t('collapse_all', lang))}
        <span class="w-px h-5 bg-gray-200 dark:bg-gray-600 mx-1"></span>` : '';
    const compareOn = this.compare;
    const compareCls = compareOn
      ? 'bg-primary text-white border-primary'
      : 'border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700';
    return `
      <div class="flex flex-wrap items-center gap-1 mb-3 text-sm" id="tafsir-toolbar">
        ${bulk}
        <button data-tafsir-compare-toggle="1" aria-pressed="${compareOn}"
                class="px-2 py-1 rounded-md border ${compareCls}">⇄ ${compareOn ? t('hide_comparison', lang) : t('compare_sources', lang)}</button>
        <span class="w-px h-5 bg-gray-200 dark:bg-gray-600 mx-1"></span>
        <span class="text-xs text-gray-400 mx-1" title="${t('reading_width', lang)}">${t('reading_width', lang)}</span>
        ${btn(`data-tafsir-width="1" aria-label="${t('reading_width', lang)}"`, this.readingWidth() === 'narrow' ? '↔' : '⇥')}
        <span class="ml-auto text-xs text-gray-400 mr-1">${t('font_size', lang)}</span>
        ${btn(`data-tafsir-font="-1" aria-label="${t('font_size', lang)}"`, 'A-')}
        ${btn(`data-tafsir-font="1" aria-label="${t('font_size', lang)}"`, 'A+')}
      </div>`;
  }

  /** Compact horizontal index of every loaded ayah; a chip jumps to its card. */
  outlineHtml(lang) {
    if (this.ayahs.length < 2) return '';
    const chips = this.ayahs.map(a =>
      `<button data-tafsir-jump="${a.key}"
          class="shrink-0 px-2.5 py-1 text-xs rounded-full border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-primary hover:text-white hover:border-primary transition-colors">${a.key}</button>`
    ).join('');
    return `
      <div class="mb-3">
        <div class="text-xs text-gray-400 mb-1">${t('tafseer_outline', lang)}</div>
        <div class="flex gap-1.5 overflow-x-auto pb-1" dir="ltr">${chips}</div>
      </div>`;
  }

  /** Second source picker, shown only while compare mode is active. */
  compareBarHtml(lang) {
    if (!this.compare) return '';
    return `
      <div class="flex items-center gap-2 mb-3 text-sm">
        <span class="text-xs text-gray-400">${t('compare_sources', lang)}</span>
        <select data-tafsir-compare-select
                class="flex-1 px-3 py-1.5 border rounded-lg dark:bg-gray-700 dark:border-gray-600 text-sm">
          ${this.sourceOptionsHtml(this.compareTafsirId())}
        </select>
      </div>`;
  }

  fontScale() {
    const v = parseFloat(localStorage.getItem('tafsirFontScale'));
    return isNaN(v) ? 1 : Math.min(Math.max(v, 0.8), 1.6);
  }

  readingWidth() {
    try { return localStorage.getItem('tafsirWidth') === 'narrow' ? 'narrow' : 'wide'; }
    catch (e) { return 'wide'; }
  }

  applyReadingPrefs() {
    this.applyFontScale();
    if (this.content) this.content.classList.toggle('tafseer-narrow', this.readingWidth() === 'narrow');
  }

  applyFontScale() {
    if (this.content) this.content.style.setProperty('--tafsir-scale', this.fontScale());
  }

  bumpFont(dir) {
    const next = Math.min(Math.max(this.fontScale() + dir * 0.1, 0.8), 1.6);
    try { localStorage.setItem('tafsirFontScale', String(next)); } catch (e) { /* ignore */ }
    this.applyFontScale();
  }

  toggleWidth() {
    const next = this.readingWidth() === 'narrow' ? 'wide' : 'narrow';
    try { localStorage.setItem('tafsirWidth', next); } catch (e) { /* ignore */ }
    if (this.content) this.content.classList.toggle('tafseer-narrow', next === 'narrow');
    // Refresh the toolbar glyph without a full re-render of the (fetched) bodies
    const wbtn = this.content && this.content.querySelector('[data-tafsir-width]');
    if (wbtn) wbtn.textContent = next === 'narrow' ? '↔' : '⇥';
  }

  toggleCompare() {
    this.compare = !this.compare;
    try { localStorage.setItem('tafsirCompare', this.compare ? '1' : '0'); } catch (e) { /* ignore */ }
    this.rendered = false;
    this.render();
  }

  /** Plain-text of an ayah's Arabic + its loaded tafsir (both columns in compare). */
  getCardText(key) {
    const card = this.content.querySelector(`[data-tafseer-card="${key}"]`) ||
                 this.content.querySelector(`[data-key="${key}"]`)?.closest('div');
    const ayah = this.ayahs.find(a => a.key === key);
    const bodies = card ? [...card.querySelectorAll('.tafseer-body')] : [];
    const parts = bodies.map(b => {
      const id = b.getAttribute('data-tafsir');
      const name = TAFSIR_ID_NAME[id] || '';
      const txt = b.innerText.trim();
      return this.compare && name ? `[${name}]\n${txt}` : txt;
    }).filter(Boolean);
    return `${ayah ? ayah.arabic : ''}\n(${key})\n\n${parts.join('\n\n')}`.trim();
  }

  flashBtn(btn, glyph) {
    if (!btn) return;
    const old = btn.textContent;
    btn.textContent = glyph;
    setTimeout(() => { btn.textContent = old; }, 1200);
  }

  /** Copy an ayah's Arabic + its loaded tafsir text (both columns in compare). */
  copyCard(key) {
    const text = this.getCardText(key);
    const btn = this.content.querySelector(`[data-tafsir-copy="${key}"]`);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => this.flashBtn(btn, '✓')).catch(() => {});
    }
  }

  /** Share via the native share sheet, falling back to a clipboard copy. */
  shareCard(key) {
    const text = this.getCardText(key);
    if (!text) return;
    const btn = this.content.querySelector(`[data-tafsir-share="${key}"]`);
    if (navigator.share) {
      navigator.share({ text }).catch(() => { /* user dismissed / unsupported */ });
      return;
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => this.flashBtn(btn, '✓')).catch(() => {});
    }
  }

  ayahHeaderHtml(ayah, withCopy = true) {
    // withCopy=false inside the accordion toggle (a button can't nest a button)
    return `
      <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 flex-1">
        <span class="ayah-number">${ayah.ayah}</span>
        <span>${ayah.surahName} ${ayah.key}</span>
        ${withCopy ? `<span class="ml-auto flex items-center gap-1">${this.cardActionsHtml(ayah.key)}</span>` : ''}
      </div>
    `;
  }

  /** Copy / share / bookmark cluster, reused in expanded headers + accordions. */
  cardActionsHtml(key) {
    const lang = this.language;
    const marked = this.isBookmarked(key);
    const cls = 'px-2 py-1 text-xs rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700';
    return `
      <button data-tafsir-copy="${key}" title="${t('copy', lang)}" aria-label="${t('copy', lang)}" class="${cls}">📋</button>
      <button data-tafsir-share="${key}" title="${t('share', lang)}" aria-label="${t('share', lang)}" class="${cls}">🔗</button>
      <button data-tafsir-bookmark="${key}" aria-pressed="${marked}"
              title="${t(marked ? 'remove_bookmark' : 'bookmark', lang)}" aria-label="${t(marked ? 'remove_bookmark' : 'bookmark', lang)}"
              class="${cls} ${marked ? 'text-amber-500 border-amber-300 dark:border-amber-500/40' : ''}">${marked ? '🔖' : '🏷️'}</button>`;
  }

  ayahArabicHtml(ayah) {
    return `
      <div class="ayah-arabic !text-2xl !leading-loose text-gray-800 dark:text-gray-100 my-3" dir="rtl">
        ${ayah.arabic}
      </div>
    `;
  }

  /** One empty tafsir body, tagged with its source id (drives per-body fetch). */
  tafsirBodyShell(tafsirId, extraClasses = '') {
    const label = this.compare
      ? `<div class="text-xs font-semibold text-primary dark:text-blue-400 mb-1">${TAFSIR_ID_NAME[tafsirId] || ''}</div>`
      : '';
    return `
      <div class="min-w-0">${label}
        <div class="tafseer-body text-gray-700 dark:text-gray-300 ${extraClasses}"
             data-tafsir="${tafsirId}" dir="${this.bodyDirAttr(tafsirId)}"></div>
      </div>`;
  }

  /** Primary body, plus the compare body side by side when compare is on. */
  bodiesHtml(primaryId) {
    if (!this.compare) return this.tafsirBodyShell(primaryId);
    return `
      <div class="tafseer-compare-grid">
        ${this.tafsirBodyShell(primaryId)}
        ${this.tafsirBodyShell(this.compareTafsirId())}
      </div>`;
  }

  /** Cross-navigation to the sibling modules that share the loaded selection. */
  relatedToolsHtml(ayah) {
    const lang = this.language;
    const btn = (target, icon, key) =>
      `<button data-tafsir-rel="${target}" data-key="${ayah.key}"
          class="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-md border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
          <span aria-hidden="true">${icon}</span>${t(key, lang)}</button>`;
    return `
      <div class="flex flex-wrap items-center gap-1.5 mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
        <span class="text-xs text-gray-400 mr-1">${t('related_tools', lang)}</span>
        ${btn('preview', '👁️', 'preview')}
        ${btn('wordbyword', '🔤', 'word_by_word')}
        ${btn('grammar', '🧩', 'grammar')}
        ${btn('tajweedreading', '🎨', 'tajweed_label')}
        ${btn('wordrepeat', '🔁', 'wr_title')}
      </div>`;
  }

  /** 8 or fewer ayahs: full cards, all tafsirs fetched in parallel. */
  renderExpanded(tafsirId) {
    const token = this.renderToken;

    this.content.innerHTML = this.ayahs.map(ayah => `
      <div class="border-b border-gray-100 dark:border-gray-700 last:border-b-0 py-4 first:pt-0 last:pb-0"
           data-tafseer-card="${ayah.key}">
        ${this.ayahHeaderHtml(ayah)}
        ${this.ayahArabicHtml(ayah)}
        ${this.bodiesHtml(tafsirId)}
        ${this.relatedToolsHtml(ayah)}
      </div>
    `).join('');

    this.ayahs.forEach(ayah => {
      const card = this.content.querySelector(`[data-tafseer-card="${ayah.key}"]`);
      if (card) this.loadCard(card, ayah, token);
    });
  }

  /** More than 8 ayahs: collapsed accordions, fetched on first expand. */
  renderAccordions(tafsirId) {
    this.content.innerHTML = this.ayahs.map(ayah => `
      <div class="border border-gray-100 dark:border-gray-700 rounded-lg mb-3 overflow-hidden"
           data-tafseer-card="${ayah.key}">
        <button type="button"
                class="tafseer-toggle w-full flex items-center justify-between gap-3 px-4 py-3 text-start
                       hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                data-key="${ayah.key}" aria-expanded="false">
          ${this.ayahHeaderHtml(ayah, false)}
          <svg class="tafseer-chevron w-5 h-5 text-gray-400 shrink-0 transition-transform"
               fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>
        <div class="tafseer-panel hidden px-4 pb-4">
          <div class="flex items-center justify-end gap-1">${this.cardActionsHtml(ayah.key)}</div>
          ${this.ayahArabicHtml(ayah)}
          ${this.bodiesHtml(tafsirId)}
          ${this.relatedToolsHtml(ayah)}
        </div>
      </div>
    `).join('');
  }

  onContentClick(e) {
    const font = e.target.closest('[data-tafsir-font]');
    if (font) { this.bumpFont(parseInt(font.getAttribute('data-tafsir-font'), 10)); return; }
    if (e.target.closest('[data-tafsir-width]')) { this.toggleWidth(); return; }
    if (e.target.closest('[data-tafsir-compare-toggle]')) { this.toggleCompare(); return; }
    if (e.target.closest('[data-tafsir-expand-all]')) { this.setAllCards(true); return; }
    if (e.target.closest('[data-tafsir-collapse-all]')) { this.setAllCards(false); return; }

    const jump = e.target.closest('[data-tafsir-jump]');
    if (jump) { this.jumpToCard(jump.getAttribute('data-tafsir-jump')); return; }

    const rel = e.target.closest('[data-tafsir-rel]');
    if (rel) { this.gotoRelated(rel.getAttribute('data-tafsir-rel'), rel.getAttribute('data-key')); return; }

    const retry = e.target.closest('[data-tafsir-retry]');
    if (retry) {
      const body = retry.closest('.tafseer-body');
      const card = retry.closest('[data-tafseer-card]');
      if (body && card) {
        this.loadInto(body, body.getAttribute('data-tafsir'),
                      card.getAttribute('data-tafseer-card'), this.renderToken);
      }
      return;
    }

    const copy = e.target.closest('[data-tafsir-copy]');
    if (copy) { this.copyCard(copy.getAttribute('data-tafsir-copy')); return; }

    const share = e.target.closest('[data-tafsir-share]');
    if (share) { this.shareCard(share.getAttribute('data-tafsir-share')); return; }

    const bm = e.target.closest('[data-tafsir-bookmark]');
    if (bm) { this.toggleBookmark(bm.getAttribute('data-tafsir-bookmark')); return; }

    const bmJump = e.target.closest('[data-tafsir-bm-jump]');
    if (bmJump) {
      this.loadBookmark(bmJump.getAttribute('data-tafsir-bm-jump'),
                        bmJump.getAttribute('data-sid'));
      return;
    }

    const toggle = e.target.closest('.tafseer-toggle');
    if (!toggle || !this.content.contains(toggle)) return;
    const card = toggle.closest('[data-tafseer-card]');
    this.setCardOpen(card, card.querySelector('.tafseer-panel').classList.contains('hidden'));
  }

  onContentChange(e) {
    const cmp = e.target.closest('[data-tafsir-compare-select]');
    if (!cmp) return;
    try { localStorage.setItem('tafsirCompareId', cmp.value); } catch (err) { /* ignore */ }
    this.rendered = false;
    this.render();
  }

  /** Open/close one accordion card, lazily loading its bodies on first open. */
  setCardOpen(card, open) {
    if (!card) return;
    const panel = card.querySelector('.tafseer-panel');
    if (!panel) return; // expanded (non-accordion) mode: nothing to toggle
    const toggle = card.querySelector('.tafseer-toggle');
    const chevron = card.querySelector('.tafseer-chevron');
    panel.classList.toggle('hidden', !open);
    if (toggle) toggle.setAttribute('aria-expanded', String(open));
    if (chevron) chevron.style.transform = open ? 'rotate(180deg)' : '';

    if (open && !card.hasAttribute('data-loaded')) {
      const ayah = this.ayahs.find(a => a.key === card.getAttribute('data-tafseer-card'));
      // Only mark loaded on full success, so a failed load can be retried by
      // collapsing and re-expanding (or via the inline Retry button).
      this.loadCard(card, ayah, this.renderToken)
        .then(ok => { if (ok) card.setAttribute('data-loaded', 'true'); });
    }
  }

  setAllCards(open) {
    this.content.querySelectorAll('[data-tafseer-card]').forEach(card => this.setCardOpen(card, open));
  }

  /** Scroll a card into view; expand it first when in accordion mode. */
  jumpToCard(key) {
    const card = this.content.querySelector(`[data-tafseer-card="${key}"]`);
    if (!card) return;
    if (card.querySelector('.tafseer-panel')) this.setCardOpen(card, true);
    card.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /** Jump to a sibling module (or preview the verse in the shared modal). */
  gotoRelated(target, key) {
    if (target === 'preview') {
      if (typeof ayahModal !== 'undefined' && ayahModal) ayahModal.open(key);
      return;
    }
    if (typeof tabSystem === 'undefined' || !tabSystem) return;
    if (typeof tabSystem.switchTabWithReturn === 'function') tabSystem.switchTabWithReturn(target);
    else tabSystem.switchTab(target);
  }

  /** Load every tagged body inside a card; resolves true only if all succeed. */
  async loadCard(card, ayah, token) {
    if (!ayah) return false;
    const bodies = [...card.querySelectorAll('.tafseer-body[data-tafsir]')];
    if (!bodies.length) return false;
    const results = await Promise.all(bodies.map(b =>
      this.loadInto(b, b.getAttribute('data-tafsir'), ayah.key, token)));
    return results.every(r => r === true);
  }

  /** Fetch a tafsir and inject it into a body element (stale-render safe). */
  async loadInto(body, tafsirId, verseKey, token) {
    const lang = this.language;
    body.innerHTML = this.skeletonHtml();

    try {
      const tafsir = await this.fetchTafsir(tafsirId, verseKey);
      if (token !== this.renderToken) return; // a newer render replaced this DOM

      if (!tafsir) {
        body.innerHTML = `<p class="text-gray-400 text-sm">${t('tafsir_unavailable', lang)}</p>`;
        return false;
      }

      body.innerHTML = tafsir.text;
      if (tafsir.resourceName) {
        const credit = document.createElement('p');
        credit.className = 'text-xs text-gray-400 dark:text-gray-500 mt-3';
        credit.textContent = `— ${tafsir.resourceName}`;
        body.appendChild(credit);
      }
      return true;
    } catch (err) {
      console.error('Tafsir fetch failed:', err);
      if (token !== this.renderToken) return false;
      // Offer an explicit retry instead of a dead end (the id lives on the body).
      body.innerHTML = `
        <div class="text-sm text-gray-400">
          <p class="mb-2">${t('tafsir_load_error', lang)}</p>
          <button data-tafsir-retry="1"
                  class="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">${t('retry', lang)}</button>
        </div>`;
      return false;
    }
  }

  /** Pulsing placeholder lines shown while a tafsir entry is being fetched. */
  skeletonHtml() {
    const bar = (w) => `<div class="h-3 bg-gray-200 dark:bg-gray-700 rounded ${w}"></div>`;
    return `<div class="animate-pulse space-y-2 py-1" aria-hidden="true">
      ${bar('w-11/12')}${bar('w-full')}${bar('w-10/12')}${bar('w-9/12')}
    </div>`;
  }
}

// Initialize when DOM is ready
let tafseerView;
document.addEventListener('DOMContentLoaded', () => {
  tafseerView = new TafseerView();
});
