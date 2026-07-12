/**
 * Legacy Ayah Enrichment Module
 * Enriches the reading view with the old Bangla app's per-ayah resources
 * (served same-origin from QuranData.legacyBase):
 *   - "Irab" header button  → modal with corpus.quran.com morphology tables
 *                             (resources/irab/{s}_{a}.html)
 *   - "Bangla Tafsir" header button (bn UI only) → inline accordion built from
 *                             resources/quran/{s}/{a}_tafseer.html (7 sources)
 *   - Word-detail modal      → per-word colorful Bangla morphology image
 *                             (resources/wbwgrammer/{s}/{s}_{a}_{w}.png)
 *   - Surah actions bar      → mushaf read mode (Kitab font), per-surah
 *                             grammar PDF, words-per-surah tables
 * Does nothing when QuranData.legacyAvailable() is false.
 */

class LegacyAyah {
  constructor() {
    this.container = document.getElementById('ayah-container');
    if (!this.container) return;

    this.language = (typeof appSettings !== 'undefined' && appSettings)
      ? appSettings.get('language')
      : 'en';

    this._fetchCache = new Map();  // path -> Promise<string|null>
    this.overlay = null;           // reusable modal (built lazily)
    this.modalMode = null;         // 'irab' | 'read' | 'words'
    this.modalSurah = null;
    this.modalAyah = null;

    window.addEventListener('ayahsLoaded', (e) => {
      if (e.detail && e.detail.language) this.language = e.detail.language;
      this.enhance();
    });

    window.addEventListener('settingChanged', (e) => {
      if (e.detail && e.detail.key === 'language') this.language = e.detail.value;
    });

    // Delegated clicks for everything we add inside the reading view
    this.container.addEventListener('click', (e) => this.onContainerClick(e));

      }

  /* ------------------------------------------------------------------ *
   * Card post-processing (runs after every 'ayahsLoaded')
   * ------------------------------------------------------------------ */

  async enhance() {
    if (!(await QuranData.legacyAvailable())) return;

    this.injectStyles();
 // retry: wordByWord may not have existed at construction

    const lang = this.language;
    const seenSurahs = new Set();

    this.container.querySelectorAll('.ayah-card').forEach(card => {
      const surah = parseInt(card.getAttribute('data-surah'));

      // One actions bar before the FIRST card of each distinct surah
      if (!seenSurahs.has(surah)) {
        seenSurahs.add(surah);
        const prev = card.previousElementSibling;
        if (!prev || prev.getAttribute('data-legacy-bar') !== String(surah)) {
          card.insertAdjacentElement('beforebegin', this.buildSurahBar(surah, lang));
        }
      }

      if (card.dataset.legacyEnhanced) return;
      card.dataset.legacyEnhanced = '1';
      this.addHeaderButtons(card, lang);
    });
  }

  pillClass() {
    return 'px-2 py-1 text-xs rounded-full border border-gray-300 dark:border-gray-600 ' +
           'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700';
  }

  addHeaderButtons(card, lang) {
    const header = card.querySelector('.ayah-header');
    if (!header) return;

    const buttons = [];

    const irabBtn = document.createElement('button');
    irabBtn.className = 'legacy-irab-btn ' + this.pillClass();
    irabBtn.title = t('irab_label', lang);
    irabBtn.textContent = '🏛 ' + t('irab_label', lang);
    buttons.push(irabBtn);

    // Bangla tafsir is Bangla-only content: offer it only on the bn UI
    if (lang === 'bn') {
      const tafsirBtn = document.createElement('button');
      tafsirBtn.className = 'legacy-btafsir-btn ' + this.pillClass();
      tafsirBtn.title = t('bangla_tafseer', lang);
      tafsirBtn.textContent = '📚 ' + t('bangla_tafseer', lang);
      buttons.push(tafsirBtn);
    }

    // Keep the pills grouped with the existing toggles (before the ml-auto meta span)
    const meta = header.querySelector('.ml-auto');
    buttons.forEach(btn => {
      if (meta) header.insertBefore(btn, meta);
      else header.appendChild(btn);
    });
  }

  onContainerClick(e) {
    const irabBtn = e.target.closest('.legacy-irab-btn');
    if (irabBtn) {
      const card = irabBtn.closest('.ayah-card');
      if (card) {
        this.openIrab(parseInt(card.getAttribute('data-surah')), parseInt(card.getAttribute('data-ayah')));
      }
      return;
    }

    const btafsirBtn = e.target.closest('.legacy-btafsir-btn');
    if (btafsirBtn) {
      const card = btafsirBtn.closest('.ayah-card');
      if (card) this.toggleBanglaTafsir(card);
      return;
    }

    // Bangla-tafsir accordion headers (our own class — .tafsir-acc is app.js's)
    const acc = e.target.closest('.legacy-acc');
    if (acc) {
      const body = acc.parentElement.querySelector('.legacy-acc-body');
      const icon = acc.querySelector('.acc-icon');
      if (body) {
        const open = body.classList.contains('hidden');
        body.classList.toggle('hidden', !open);
        if (icon) icon.textContent = open ? '−' : '+';
      }
      return;
    }

    const actionBtn = e.target.closest('[data-legacy-action]');
    if (actionBtn) {
      const surah = parseInt(actionBtn.getAttribute('data-surah'));
      const action = actionBtn.getAttribute('data-legacy-action');
      if (action === 'read') this.openReadMode(surah);
      else if (action === 'words') this.openSurahWords(surah);
    }
  }

  /* ------------------------------------------------------------------ *
   * Fetching + sanitizing legacy HTML fragments
   * ------------------------------------------------------------------ */

  /** Fetch a legacy fragment (path relative to legacyBase), cached; null on failure */
  fetchLegacy(path) {
    if (!this._fetchCache.has(path)) {
      this._fetchCache.set(path, fetch(QuranData.legacyBase + path)
        .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.text(); })
        .catch(() => null));
    }
    return this._fetchCache.get(path);
  }

  /**
   * Parse untrusted legacy HTML into a detached <div>:
   * strips script/style/embeds, on* handlers and javascript: URLs,
   * and rewrites relative/rooted img paths to absolute legacy paths.
   * @param {string} html
   * @param {string} baseDir absolute base for relative img src (no trailing slash)
   */
  sanitize(html, baseDir) {
    const tpl = document.createElement('template');
    tpl.innerHTML = html;

    tpl.content.querySelectorAll('script, style, link, iframe, object, embed, form').forEach(el => el.remove());
    tpl.content.querySelectorAll('*').forEach(el => {
      for (const attr of [...el.attributes]) {
        if (/^on/i.test(attr.name) || /^\s*javascript:/i.test(attr.value)) {
          el.removeAttribute(attr.name);
        }
      }
    });

    if (baseDir) this.rewriteImages(tpl.content, baseDir);

    const div = document.createElement('div');
    div.appendChild(tpl.content);
    return div;
  }

  /** Rewrite img src: "/resources/..." → legacyBase-rooted; "images/..." → baseDir-relative */
  rewriteImages(root, baseDir) {
    root.querySelectorAll('img').forEach(img => {
      const src = img.getAttribute('src') || '';
      if (!src || /^(https?:|data:|\/\/)/i.test(src)) return;
      img.setAttribute('src', src.startsWith('/') ? QuranData.legacyBase + src : baseDir + '/' + src);
      img.setAttribute('loading', 'lazy');
    });
  }

  loadingHtml() {
    return `<p class="text-sm text-gray-400 p-2">${t('loading', this.language)}</p>`;
  }

  unavailableHtml() {
    return `<p class="text-sm text-gray-400 p-2">${t('legacy_unavailable', this.language)}</p>`;
  }

  /* ------------------------------------------------------------------ *
   * Reusable modal (irab / read mode / surah words)
   * ------------------------------------------------------------------ */

  ensureModal() {
    if (this.overlay) return;

    this.overlay = document.createElement('div');
    this.overlay.id = 'legacy-ayah-modal';
    this.overlay.className = 'fixed inset-0 bg-black/50 z-50 items-center justify-center p-4 hidden';
    this.overlay.innerHTML = `
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 w-[90vw] max-w-none h-[90vh] flex flex-col">
        <div class="flex items-center gap-1 px-5 py-3 border-b border-gray-200 dark:border-gray-700">
          <h3 id="legacy-modal-title" class="flex-1 font-semibold text-gray-800 dark:text-gray-100 truncate" dir="auto"></h3>
          <button id="legacy-modal-prev" class="hidden px-3 py-1 rounded-lg text-lg leading-none text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">‹</button>
          <button id="legacy-modal-next" class="hidden px-3 py-1 rounded-lg text-lg leading-none text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">›</button>
          <button id="legacy-modal-close" class="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">✕</button>
        </div>
        <div id="legacy-modal-body" class="flex-1 overflow-y-auto p-4"></div>
        <div id="legacy-modal-footer" class="hidden px-5 py-2 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-400 dark:text-gray-500"></div>
      </div>
    `;
    document.body.appendChild(this.overlay);

    this.modalTitle = this.overlay.querySelector('#legacy-modal-title');
    this.modalBody = this.overlay.querySelector('#legacy-modal-body');
    this.modalFooter = this.overlay.querySelector('#legacy-modal-footer');
    this.modalPrev = this.overlay.querySelector('#legacy-modal-prev');
    this.modalNext = this.overlay.querySelector('#legacy-modal-next');

    this.overlay.querySelector('#legacy-modal-close').addEventListener('click', () => this.closeModal());
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) this.closeModal();
    });

    this.modalPrev.addEventListener('click', () => this.stepIrab(-1));
    this.modalNext.addEventListener('click', () => this.stepIrab(1));

    // Converted bootstrap tab bars (words-per-surah)
    this.modalBody.addEventListener('click', (e) => {
      const tabBtn = e.target.closest('[data-legacy-tab]');
      if (!tabBtn) return;
      const scope = tabBtn.closest('.legacy-html') || this.modalBody;
      const id = tabBtn.getAttribute('data-legacy-tab');
      scope.querySelectorAll('.tab-pane').forEach(p => p.classList.toggle('hidden', p.id !== id));
      tabBtn.parentElement.querySelectorAll('[data-legacy-tab]').forEach(b => {
        b.className = this.tabBtnClass(b === tabBtn);
      });
    });
  }

  openModal(title, opts = {}) {
    this.ensureModal();
    this.modalTitle.textContent = title;
    this.overlay.querySelector('#legacy-modal-close').setAttribute('title', t('close', this.language));

    this.modalPrev.classList.toggle('hidden', !opts.nav);
    this.modalNext.classList.toggle('hidden', !opts.nav);

    if (opts.footer) {
      this.modalFooter.textContent = opts.footer;
      this.modalFooter.classList.remove('hidden');
    } else {
      this.modalFooter.classList.add('hidden');
    }

    this.overlay.classList.remove('hidden');
    this.overlay.classList.add('flex');
  }

  closeModal() {
    if (!this.overlay) return;
    this.overlay.classList.add('hidden');
    this.overlay.classList.remove('flex');
    this.modalMode = null;
  }

  /* ------------------------------------------------------------------ *
   * 1. Irab (corpus morphology) modal with prev/next ayah arrows
   * ------------------------------------------------------------------ */

  async openIrab(surah, ayah) {
    const lang = this.language;
    this.modalMode = 'irab';
    this.modalSurah = surah;
    this.modalAyah = ayah;

    this.openModal(`${t('irab_label', lang)} — ${surah}:${ayah}`, {
      nav: true,
      footer: 'Source: corpus.quran.com'
    });
    this.updateIrabNav();
    this.modalBody.innerHTML = this.loadingHtml();

    const html = await this.fetchLegacy(`/resources/irab/${surah}_${ayah}.html`);

    // Stale guard: user may have navigated or closed while fetching
    if (this.modalMode !== 'irab' || this.modalSurah !== surah || this.modalAyah !== ayah) return;

    if (!html) {
      this.modalBody.innerHTML = this.unavailableHtml();
      return;
    }

    const content = this.sanitize(html, QuranData.legacyBase + '/resources/irab');
    content.className = 'legacy-html legacy-irab';
    this.modalBody.innerHTML = '';
    this.modalBody.appendChild(content);
  }

  stepIrab(delta) {
    if (this.modalMode !== 'irab') return;
    const next = this.modalAyah + delta;
    const max = this.surahAyahCount(this.modalSurah);
    if (next < 1 || next > max) return;
    this.openIrab(this.modalSurah, next);
  }

  updateIrabNav() {
    const max = this.surahAyahCount(this.modalSurah);
    this.modalPrev.disabled = this.modalAyah <= 1;
    this.modalNext.disabled = this.modalAyah >= max;
    this.modalPrev.classList.toggle('opacity-30', this.modalPrev.disabled);
    this.modalNext.classList.toggle('opacity-30', this.modalNext.disabled);
  }

  surahAyahCount(surah) {
    const info = (typeof getSurahByNumber === 'function') ? getSurahByNumber(surah) : null;
    return info ? info.ayahCount : 286;
  }

  /* ------------------------------------------------------------------ *
   * 2. Inline Bangla tafsir accordion (7 legacy sources)
   * ------------------------------------------------------------------ */

  async toggleBanglaTafsir(card) {
    let section = card.querySelector('.legacy-btafsir');
    if (section) {
      section.classList.toggle('hidden');
      return;
    }

    section = document.createElement('div');
    section.className = 'legacy-btafsir mt-3 space-y-2';
    const anchor = card.querySelector('.inline-tafsir');
    if (anchor) anchor.insertAdjacentElement('afterend', section);
    else (card.querySelector('.ayah-content') || card).appendChild(section);

    section.innerHTML = this.loadingHtml();

    const surah = parseInt(card.getAttribute('data-surah'));
    const ayah = parseInt(card.getAttribute('data-ayah'));
    const html = await this.fetchLegacy(`/resources/quran/${surah}/${ayah}_tafseer.html`);
    if (!html) {
      section.innerHTML = this.unavailableHtml();
      return;
    }

    // Convert the old Bootstrap panel-group accordion into our accordion pattern
    const parsed = this.sanitize(html, QuranData.legacyBase + `/resources/quran/${surah}`);
    const panels = [...parsed.querySelectorAll('.panel')];

    section.innerHTML = panels.map(panel => {
      const title = (panel.querySelector('.panel-title')?.textContent || '').trim();
      const body = panel.querySelector('.panel-body')?.innerHTML || '';
      return `
        <div class="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <button class="legacy-acc w-full flex items-center justify-between px-4 py-2 text-sm font-medium
                         bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600">
            <span dir="auto">${title}</span><span class="acc-icon">+</span>
          </button>
          <div class="legacy-acc-body hidden px-4 py-3 text-sm leading-relaxed text-gray-700 dark:text-gray-200" dir="auto">${body}</div>
        </div>
      `;
    }).join('') || this.unavailableHtml();
  }

  /* ------------------------------------------------------------------ *
   * 5. Surah actions bar (read mode / grammar PDF / surah words)
   * ------------------------------------------------------------------ */

  buildSurahBar(surah, lang) {
    const info = (typeof getSurahByNumber === 'function') ? getSurahByNumber(surah) : null;
    const name = (typeof getSurahName === 'function')
      ? getSurahName(surah, lang)
      : (info && info.names ? info.names.en : 'Surah ' + surah);
    const arabic = info && info.arabicName ? ' (' + info.arabicName + ')' : '';
    const pill = this.pillClass();

    const bar = document.createElement('div');
    bar.className = 'legacy-surah-bar bg-white dark:bg-gray-800 rounded-lg shadow px-4 py-2 flex flex-wrap items-center gap-2';
    bar.setAttribute('data-legacy-bar', String(surah));
    bar.innerHTML = `
      <span class="text-sm font-semibold text-gray-700 dark:text-gray-200" dir="auto">📖 ${surah}. ${name}${arabic}</span>
      <span class="flex-1"></span>
      <button data-legacy-action="read" data-surah="${surah}" class="${pill}">📗 ${t('read_mode', lang)}</button>
      <button data-legacy-action="words" data-surah="${surah}" class="${pill}">🔡 ${t('surah_words', lang)}</button>
    `;
    return bar;
  }

  /** Mushaf read mode: legacy tajweed-colored page in the Kitab font */
  async openReadMode(surah) {
    const lang = this.language;
    this.modalMode = 'read';
    this.modalSurah = surah;

    const name = (typeof getSurahName === 'function') ? getSurahName(surah, lang) : String(surah);
    this.openModal(`${t('read_mode', lang)} — ${name}`, {});
    this.modalBody.innerHTML = this.loadingHtml();

    const html = await this.fetchLegacy(`/partials/quran/surah_tajweed/${surah}.html`);
    if (this.modalMode !== 'read' || this.modalSurah !== surah) return;
    if (!html) {
      this.modalBody.innerHTML = this.unavailableHtml();
      return;
    }

    const content = this.sanitize(html, QuranData.legacyBase + '/partials/quran/surah_tajweed');
    content.className = 'qtext-page';
    content.setAttribute('dir', 'rtl');
    this.modalBody.innerHTML = '';
    this.modalBody.appendChild(content);
  }

  /** Words-per-surah repetition tables (exact word + lemma tabs) */
  async openSurahWords(surah) {
    const lang = this.language;
    this.modalMode = 'words';
    this.modalSurah = surah;

    const name = (typeof getSurahName === 'function') ? getSurahName(surah, lang) : String(surah);
    this.openModal(`${t('surah_words', lang)} — ${name}`, {});
    this.modalBody.innerHTML = this.loadingHtml();

    const html = await this.fetchLegacy(`/partials/arabic_languages/wordspersurah/${surah}.html`);
    if (this.modalMode !== 'words' || this.modalSurah !== surah) return;
    if (!html) {
      this.modalBody.innerHTML = this.unavailableHtml();
      return;
    }

    const content = this.sanitize(html, QuranData.legacyBase + '/partials/arabic_languages/wordspersurah');
    content.className = 'legacy-html';
    this.convertTabs(content);
    this.modalBody.innerHTML = '';
    this.modalBody.appendChild(content);
  }

  /** Turn a Bootstrap nav-tabs + tab-content fragment into our own tab buttons */
  convertTabs(root) {
    const panes = [...root.querySelectorAll('.tab-pane')];
    if (!panes.length) return;
    panes.forEach((pane, i) => {
      pane.classList.remove('fade', 'show', 'active');
      pane.classList.toggle('hidden', i !== 0);
    });

    const nav = root.querySelector('.nav-tabs');
    if (!nav) return;
    const bar = document.createElement('div');
    bar.className = 'flex flex-wrap gap-2 mb-3';
    [...nav.querySelectorAll('a')].forEach((a, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.setAttribute('data-legacy-tab', (a.getAttribute('href') || '').replace(/^#/, ''));
      btn.className = this.tabBtnClass(i === 0);
      btn.textContent = a.textContent.trim();
      bar.appendChild(btn);
    });
    nav.replaceWith(bar);
  }

  /** Tab buttons live inside the forced-light .legacy-html plate */
  tabBtnClass(active) {
    return 'px-3 py-1.5 text-sm rounded-full border transition-colors ' + (active
      ? 'bg-primary text-white border-primary'
      : 'border-gray-300 text-gray-600 hover:bg-gray-100');
  }

  /* ------------------------------------------------------------------ *
   * Scoped CSS (injected once): Kitab font, light plates for legacy
   * fragments in dark mode, corpus table + tajweed read-mode colors
   * ------------------------------------------------------------------ */

  injectStyles() {
    if (document.getElementById('legacy-ayah-styles')) return;
    const base = QuranData.legacyBase;

    const style = document.createElement('style');
    style.id = 'legacy-ayah-styles';
    style.textContent = `
@font-face {
  font-family: 'Kitab';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('${base}/webfonts/kitab.woff2') format('woff2'),
       url('${base}/webfonts/kitab.woff') format('woff');
}

/* Legacy HTML plates stay light so the old tables/images stay readable in dark mode */
.legacy-html { background: #fff; color: #111827; border-radius: .5rem; padding: .5rem; overflow-x: auto; }
.legacy-html img { max-width: 100%; height: auto; }
.legacy-html .row { display: flex; flex-wrap: wrap; align-items: center; gap: 1rem; }
.legacy-html .row > div { flex: 1 1 280px; min-width: 0; }
.legacy-html hr { border: 0; border-top: 1px solid #e5e7eb; margin: 1rem 0; }
.legacy-html table { width: 100%; border-collapse: collapse; margin: .5rem 0; }
.legacy-html table td, .legacy-html table th { border-bottom: 1px dashed #b4b4b4; padding: .35em .5em; text-align: center; }
.legacy-html table.morphologyTable { border: 3px solid #79a1c0; }
.legacy-html .arabicGrammar { direction: rtl; color: rgb(50,150,50); font-size: 1.25em; font-weight: bold; margin-top: .4em; }

/* corpus.quran.com segment colors (old styles_v7.css) */
.legacy-html .segGray { color: rgb(87,87,87); }
.legacy-html .segSky { color: rgb(84,141,212); }
.legacy-html .segBlue { color: rgb(37,126,156); }
.legacy-html .segPurple { color: rgb(129,38,192); }
.legacy-html .segBrown { color: rgb(191,159,62); }
.legacy-html .segMetal { color: rgb(92,112,133); }
.legacy-html .segGold { color: rgb(129,116,24); }
.legacy-html .segSeagreen { color: rgb(50,189,47); }
.legacy-html .segGreen { color: rgb(29,105,20); }
.legacy-html .segRed { color: rgb(244,64,11); }
.legacy-html .segRust { color: rgb(173,35,35); }
.legacy-html .segPink { color: rgb(168,1,123); }
.legacy-html .segRose { color: rgb(253,81,98); }
.legacy-html .segNavy { color: rgb(19,1,184); }
.legacy-html .segOrange { color: rgb(227,112,16); }
.legacy-html .segSilver { color: rgb(180,180,180); }

/* Mushaf read-mode page: always the printed light page, even in dark mode */
.qtext-page {
  font-family: 'Kitab', serif;
  font-size: 2.6rem;
  line-height: 1.9;
  direction: rtl;
  text-align: justify;
  background: #f6fbf1;
  color: #093333;
  border: 1px solid #5bada5;
  border-radius: .375rem;
  padding: 1rem 1.25rem;
}
.qtext-page .surah-name {
  text-align: center;
  font-size: 1.2em;
  white-space: pre-wrap;
  border-bottom: 3px solid #dde8d5;
  margin-bottom: .75rem;
  padding-bottom: .5rem;
}
.qtext-page .line { text-align: justify; text-align-last: center; }
.qtext-page i { font-style: normal; }
.qtext-page .madd-lazim { color: #d70092; }
.qtext-page .madd-wajib { color: #e72929; }
.qtext-page .madd-aarid { color: orange; }
.qtext-page .ikhfaa { color: green; }
.qtext-page .idgham { color: hsla(0, 0%, 66.3%, .9); }
.qtext-page .qalqalah { color: #46b1dd; }
`;
    document.head.appendChild(style);
  }
}

// Initialize when DOM is ready
let legacyAyah;
document.addEventListener('DOMContentLoaded', () => {
  legacyAyah = new LegacyAyah();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { LegacyAyah };
}
