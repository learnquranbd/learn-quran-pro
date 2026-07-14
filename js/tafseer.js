/**
 * Tafseer Module
 * Renders classical tafsir commentary for the loaded ayahs, fetched from the
 * quran.com v4 API (GET /tafsirs/{id}/by_ayah/{surah}:{ayah}).
 */

/**
 * Verified tafsir resource IDs on api.quran.com, grouped by content language.
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
    { id: 164, name: 'Tafseer ibn Kathir' }
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
    { id: 170, name: "Al-Sa'di" }
  ]
  // es/fa/hi/de/ms/zh have no native tafsir on quran.com → fall back to the
  // English list plus the Arabic classics (see sourcesFor / populateSources).
};

// Content language of every tafsir resource (drives RTL rendering of the body)
const TAFSIR_ID_LANG = {};
Object.keys(TAFSIR_SOURCES).forEach(lang => {
  TAFSIR_SOURCES[lang].forEach(src => { TAFSIR_ID_LANG[src.id] = lang; });
});

const TAFSIR_RTL_LANGS = ['ar', 'ur'];

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
        this.rendered = false;
        if (this.isTabVisible()) this.render();
      });
    }

    // Lazy accordion expansion
    if (this.content) {
      this.content.addEventListener('click', (e) => this.onContentClick(e));
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
      .tafseer-body { line-height: 1.8; font-size: calc(1rem * var(--tafsir-scale, 1)); }
      .tafseer-body p { margin: 0 0 0.75rem; }
      .tafseer-body h1, .tafseer-body h2, .tafseer-body h3, .tafseer-body h4 {
        font-weight: 600; margin: 1rem 0 0.5rem;
      }
      .tafseer-body blockquote {
        border-inline-start: 3px solid rgba(30, 64, 175, 0.4);
        padding-inline-start: 0.75rem; margin: 0.75rem 0; opacity: 0.9;
      }
      .tafseer-body ul, .tafseer-body ol { padding-inline-start: 1.5rem; margin: 0 0 0.75rem; }
      .tafseer-body[dir="rtl"] { font-size: calc(1.125rem * var(--tafsir-scale, 1)); }
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
      opt.value = String(src.id);
      opt.textContent = src.name;
      this.select.appendChild(opt);
    });

    // Arabic classics as a secondary group when the UI language is not Arabic
    if (lang !== 'ar') {
      const group = document.createElement('optgroup');
      group.label = t('arabic_classics', lang);
      TAFSIR_SOURCES.ar.forEach(src => {
        const opt = document.createElement('option');
        opt.value = String(src.id);
        opt.textContent = src.name;
        group.appendChild(opt);
      });
      this.select.appendChild(group);
    }

    // Keep the previous choice if it still exists in the new list
    if (previous && [...this.select.options].some(o => o.value === previous)) {
      this.select.value = previous;
    }
  }

  selectedTafsirId() {
    const val = this.select && this.select.value;
    const id = parseInt(val, 10);
    return Number.isFinite(id) ? id : this.sourcesFor(this.language)[0].id;
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

  /** Fetch one tafsir entry, cached by "tafsirId:verseKey". Returns null if empty. */
  async fetchTafsir(tafsirId, verseKey) {
    const cacheKey = `${tafsirId}:${verseKey}`;
    if (this.cache.has(cacheKey)) return this.cache.get(cacheKey);

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

    if (this.ayahs.length > TAFSIR_ACCORDION_THRESHOLD) {
      this.renderAccordions(tafsirId);
    } else {
      this.renderExpanded(tafsirId);
    }
    this.content.insertAdjacentHTML('afterbegin', this.toolbarHtml(lang));
    this.applyFontScale();
  }

  /* ---------- reading comfort: font size + copy ---------- */

  toolbarHtml(lang) {
    return `
      <div class="flex items-center justify-end gap-1 mb-3 text-sm" id="tafsir-toolbar">
        <span class="text-xs text-gray-400 mr-1">${t('font_size', lang)}</span>
        <button data-tafsir-font="-1" class="px-2 py-1 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">A-</button>
        <button data-tafsir-font="1" class="px-2 py-1 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">A+</button>
      </div>`;
  }

  fontScale() {
    const v = parseFloat(localStorage.getItem('tafsirFontScale'));
    return isNaN(v) ? 1 : Math.min(Math.max(v, 0.8), 1.6);
  }

  applyFontScale() {
    if (this.content) this.content.style.setProperty('--tafsir-scale', this.fontScale());
  }

  bumpFont(dir) {
    const next = Math.min(Math.max(this.fontScale() + dir * 0.1, 0.8), 1.6);
    try { localStorage.setItem('tafsirFontScale', String(next)); } catch (e) { /* ignore */ }
    this.applyFontScale();
  }

  /** Copy an ayah's Arabic + its loaded tafsir text as plain text. */
  copyCard(key) {
    const card = this.content.querySelector(`[data-tafseer-card="${key}"]`) ||
                 this.content.querySelector(`[data-key="${key}"]`)?.closest('div');
    const ayah = this.ayahs.find(a => a.key === key);
    const body = card && card.querySelector('.tafseer-body');
    const text = `${ayah ? ayah.arabic : ''}\n(${key})\n\n${body ? body.innerText.trim() : ''}`.trim();
    const done = (btn) => { if (btn) { const old = btn.textContent; btn.textContent = '✓'; setTimeout(() => { btn.textContent = old; }, 1200); } };
    const btn = this.content.querySelector(`[data-tafsir-copy="${key}"]`);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => done(btn)).catch(() => {});
    }
  }

  ayahHeaderHtml(ayah, withCopy = true) {
    // withCopy=false inside the accordion toggle (a button can't nest a button)
    return `
      <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 flex-1">
        <span class="ayah-number">${ayah.ayah}</span>
        <span>${ayah.surahName} ${ayah.key}</span>
        ${withCopy ? `<button data-tafsir-copy="${ayah.key}" title="${t('copy', this.language)}" aria-label="${t('copy', this.language)}"
                class="ml-auto px-2 py-1 text-xs rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">📋</button>` : ''}
      </div>
    `;
  }

  ayahArabicHtml(ayah) {
    return `
      <div class="ayah-arabic !text-2xl !leading-loose text-gray-800 dark:text-gray-100 my-3" dir="rtl">
        ${ayah.arabic}
      </div>
    `;
  }

  tafsirBodyShell(tafsirId, extraClasses = '') {
    return `
      <div class="tafseer-body text-gray-700 dark:text-gray-300 ${extraClasses}"
           dir="${this.bodyDirAttr(tafsirId)}"></div>
    `;
  }

  /** 8 or fewer ayahs: full cards, all tafsirs fetched in parallel. */
  renderExpanded(tafsirId) {
    const lang = this.language;
    const token = this.renderToken;

    this.content.innerHTML = this.ayahs.map(ayah => `
      <div class="border-b border-gray-100 dark:border-gray-700 last:border-b-0 py-4 first:pt-0 last:pb-0"
           data-tafseer-card="${ayah.key}">
        ${this.ayahHeaderHtml(ayah)}
        ${this.ayahArabicHtml(ayah)}
        ${this.tafsirBodyShell(tafsirId)}
      </div>
    `).join('');

    this.ayahs.forEach(ayah => {
      const card = this.content.querySelector(`[data-tafseer-card="${ayah.key}"]`);
      const body = card && card.querySelector('.tafseer-body');
      if (body) this.loadInto(body, tafsirId, ayah.key, token);
    });
  }

  /** More than 8 ayahs: collapsed accordions, fetched on first expand. */
  renderAccordions(tafsirId) {
    this.content.innerHTML = this.ayahs.map(ayah => `
      <div class="border border-gray-100 dark:border-gray-700 rounded-lg mb-3 overflow-hidden"
           data-tafseer-card="${ayah.key}">
        <button type="button"
                class="tafseer-toggle w-full flex items-center justify-between gap-3 px-4 py-3 text-left
                       hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                data-key="${ayah.key}" aria-expanded="false">
          ${this.ayahHeaderHtml(ayah, false)}
          <svg class="tafseer-chevron w-5 h-5 text-gray-400 shrink-0 transition-transform"
               fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>
        <div class="tafseer-panel hidden px-4 pb-4">
          <div class="text-right"><button data-tafsir-copy="${ayah.key}" title="${t('copy', this.language)}" aria-label="${t('copy', this.language)}"
                class="px-2 py-1 text-xs rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">📋</button></div>
          ${this.ayahArabicHtml(ayah)}
          ${this.tafsirBodyShell(tafsirId)}
        </div>
      </div>
    `).join('');
  }

  onContentClick(e) {
    const font = e.target.closest('[data-tafsir-font]');
    if (font) { this.bumpFont(parseInt(font.getAttribute('data-tafsir-font'), 10)); return; }
    const copy = e.target.closest('[data-tafsir-copy]');
    if (copy) { this.copyCard(copy.getAttribute('data-tafsir-copy')); return; }

    const toggle = e.target.closest('.tafseer-toggle');
    if (!toggle || !this.content.contains(toggle)) return;

    const card = toggle.closest('[data-tafseer-card]');
    const panel = card.querySelector('.tafseer-panel');
    const chevron = toggle.querySelector('.tafseer-chevron');
    const isOpen = !panel.classList.contains('hidden');

    panel.classList.toggle('hidden', isOpen);
    toggle.setAttribute('aria-expanded', String(!isOpen));
    if (chevron) chevron.style.transform = isOpen ? '' : 'rotate(180deg)';

    if (!isOpen && !card.hasAttribute('data-loaded')) {
      const body = panel.querySelector('.tafseer-body');
      // Only mark as loaded when the fetch actually succeeds, so a failed load
      // can be retried by collapsing and re-expanding.
      this.loadInto(body, this.selectedTafsirId(), toggle.getAttribute('data-key'), this.renderToken)
        .then(ok => { if (ok) card.setAttribute('data-loaded', 'true'); });
    }
  }

  /** Fetch a tafsir and inject it into a body element (stale-render safe). */
  async loadInto(body, tafsirId, verseKey, token) {
    const lang = this.language;
    body.innerHTML = `<p class="text-gray-400">${t('loading', lang)}</p>`;

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
      body.innerHTML = `<p class="text-gray-400 text-sm">${t('tafsir_unavailable', lang)}</p>`;
      return false;
    }
  }
}

// Initialize when DOM is ready
let tafseerView;
document.addEventListener('DOMContentLoaded', () => {
  tafseerView = new TafseerView();
});
