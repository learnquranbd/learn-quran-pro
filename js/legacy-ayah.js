/**
 * Legacy Ayah Enrichment Module
 * Adds an "I'rab (Syntax)" button to each ayah header, opening a modal with
 * corpus.quran.com morphology tables. The tables are bundled in-project at
 * data/irab/{s}_{a}.html (covers surahs 1-8 and 59-114); the large
 * dependency-graph images they reference load cross-origin as <img> from
 * QuranData.legacyImgBase (no CORS needed for image display).
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
    this.container.querySelectorAll('.ayah-card').forEach(card => {
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

    // I'rab (syntax) only exists for surahs 1-8 and 59-114 in the bundled dataset —
    // don't offer the pill on cards where it would open to nothing.
    const surah = parseInt(card.getAttribute('data-surah'));
    if ((surah >= 1 && surah <= 8) || (surah >= 59 && surah <= 114)) {
      const irabBtn = document.createElement('button');
      irabBtn.className = 'legacy-irab-btn ' + this.pillClass();
      irabBtn.title = t('irab_label', lang);
      irabBtn.textContent = '🏛 ' + t('irab_label', lang);
      buttons.push(irabBtn);
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

  }

  /* ------------------------------------------------------------------ *
   * Fetching + sanitizing legacy HTML fragments
   * ------------------------------------------------------------------ */

  /** Fetch a bundled fragment (same-origin path), cached; null on failure */
  fetchLegacy(path) {
    if (!this._fetchCache.has(path)) {
      this._fetchCache.set(path, fetch(path)
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

  /**
   * Rewrite img src to the external image host. The i'rab dependency-graph
   * images (src="/resources/irab/images/N.png") are too large to bundle, so
   * they load cross-origin as plain <img> from the original site (no CORS
   * needed for image display).
   */
  rewriteImages(root, baseDir) {
    root.querySelectorAll('img').forEach(img => {
      const src = img.getAttribute('src') || '';
      if (!src || /^(https?:|data:|\/\/)/i.test(src)) return;
      img.setAttribute('src', QuranData.legacyImgBase + '/' + src.replace(/^\//, ''));
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

    const html = await this.fetchLegacy(`data/irab/${surah}_${ayah}.html`);

    // Stale guard: user may have navigated or closed while fetching
    if (this.modalMode !== 'irab' || this.modalSurah !== surah || this.modalAyah !== ayah) return;

    if (!html) {
      this.modalBody.innerHTML = this.unavailableHtml();
      return;
    }

    const content = this.sanitize(html, true);
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
   * Scoped CSS (injected once): Kitab font, light plates for legacy
   * fragments in dark mode, corpus table + tajweed read-mode colors
   * ------------------------------------------------------------------ */

  injectStyles() {
    if (document.getElementById('legacy-ayah-styles')) return;

    const style = document.createElement('style');
    style.id = 'legacy-ayah-styles';
    style.textContent = `
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
