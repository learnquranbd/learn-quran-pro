/**
 * Mushaf Page View Module
 * Page-by-page reading of the 604-page mushaf using the legacy tajweed
 * page scans loaded cross-origin from QuranData.legacyImgBase.
 *
 * Image mapping (verified empirically against the scans): the directory
 * resources/images/tajweed_quran/ holds exactly 604 files named 0.jpg..603.jpg,
 * where 0.jpg is mushaf page 1 (Surah Al-Fatiha) and 603.jpg is mushaf
 * page 604 (its printed page number reads "604"). So page N -> (N-1).jpg.
 *
 * The whole feature (tab button included) hides itself when
 * QuranData.legacyAvailable() is false.
 */

class MushafView {
  constructor() {
    this.container = document.getElementById('mushaf-container');
    if (!this.container) return;

    this.TOTAL_PAGES = 604;
    this.language = (typeof appSettings !== 'undefined' && appSettings)
      ? appSettings.get('language')
      : 'en';

    // Remember last page across sessions
    let saved = 1;
    try { saved = parseInt(localStorage.getItem('mushafPage'), 10) || 1; } catch (e) { /* ignore */ }
    this.page = this.clampPage(saved);

    this.rendered = false;
    this.surahPages = null; // { surahNumber: firstMushafPage }
    this._loadToken = 0;

    // Availability check at startup (hides the tab if legacy assets missing)
    this.checkAvailability();

    // Lazy render when the tab becomes active
    window.addEventListener('tabChanged', (e) => {
      if (e.detail && e.detail.tabId === 'mushaf') this.ensureRendered();
    });

    // Re-render chrome in the new language
    window.addEventListener('settingChanged', (e) => {
      if (e.detail && e.detail.key === 'language') {
        this.language = e.detail.value;
        if (this.rendered) {
          this.rendered = false;
          if (this.isActiveTab()) this.ensureRendered();
        }
      }
    });

    // Keyboard paging — only while the mushaf tab is active
    document.addEventListener('keydown', (e) => this.handleKey(e));
  }

  clampPage(page) {
    return Math.min(Math.max(page || 1, 1), this.TOTAL_PAGES);
  }

  /** Page N of the mushaf is file (N-1).jpg — see mapping note in the header. */
  imageUrl(page) {
    // 604 mushaf page scans (0.jpg..603.jpg → page N = file N-1) are large, so
    // they load cross-origin as plain <img> from the original site.
    return `${QuranData.legacyImgBase}/resources/images/tajweed_quran/${page - 1}.jpg`;
  }

  isActiveTab() {
    return typeof tabSystem !== 'undefined' && tabSystem && tabSystem.getActiveTab() === 'mushaf';
  }

  /* ------------------------------------------------------------------ *
   * Availability
   * ------------------------------------------------------------------ */

  async checkAvailability() {
    const ok = await QuranData.legacyAvailable();
    if (!ok) this.hideFeature();
    return ok;
  }

  hideFeature() {
    const tabBtn = document.querySelector('#tabs-nav [data-tab="mushaf"]');
    if (tabBtn) tabBtn.classList.add('hidden');
    const panel = document.getElementById('tab-mushaf');
    if (panel) panel.classList.add('hidden');

    // Hide the "Page" pill in the sidebar quick-nav too
    const pill = document.querySelector('#qn-tabs [data-qn-tab="page"]');
    if (pill) pill.classList.add('hidden');
    const pane = document.getElementById('qn-page-pane');
    if (pane) pane.classList.add('hidden');
    if (typeof appNavigation !== 'undefined' && appNavigation && appNavigation.qnTab === 'page') {
      appNavigation.qnTab = 'surah';
      appNavigation.applyQnTab();
    }
  }

  /* ------------------------------------------------------------------ *
   * Rendering
   * ------------------------------------------------------------------ */

  async ensureRendered() {
    if (this.rendered) return;
    const lang = this.language;

    this.container.innerHTML = `
      <div class="flex flex-col items-center justify-center py-16">
        <div class="animate-spin rounded-full h-10 w-10 border-4 border-primary border-t-transparent"></div>
        <p class="mt-4 text-sm text-gray-500 dark:text-gray-400">${t('loading', lang)}</p>
      </div>
    `;

    // Re-check on first render (the startup check may have raced or failed)
    const ok = await QuranData.legacyAvailable();
    if (!ok) {
      this.hideFeature();
      this.container.innerHTML = `
        <p class="text-gray-500 dark:text-gray-400 text-center py-12">${t('mushaf_unavailable', lang)}</p>
      `;
      return;
    }

    this.rendered = true;
    this.renderShell();
    this.loadSurahPages(); // async; populates the surah jump select when ready
    this.showPage(this.page);
  }

  renderShell() {
    const lang = this.language;

    // dir="ltr" keeps the physical page-turn arrows in place for RTL UIs:
    // in a mushaf the NEXT page is always the one to the LEFT.
    this.container.innerHTML = `
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <div class="flex flex-wrap items-center justify-center gap-3 mb-4">
          <select id="mushaf-surah-select"
                  class="px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600
                         bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100
                         focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-blue-500">
            <option value="">${t('select_surah', lang)}</option>
          </select>
          <div class="flex items-center gap-2">
            <label for="mushaf-page-input" class="text-sm text-gray-600 dark:text-gray-300">${t('page', lang)}</label>
            <input id="mushaf-page-input" type="number" min="1" max="${this.TOTAL_PAGES}" value="${this.page}"
                   class="w-20 px-2 py-2 text-sm text-center rounded-lg border border-gray-300 dark:border-gray-600
                          bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100
                          focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-blue-500">
            <span class="text-sm text-gray-500 dark:text-gray-400">/ ${this.TOTAL_PAGES}</span>
          </div>

          <!-- Clear labelled page navigation in the header -->
          <div class="flex items-center gap-2">
            <button id="mushaf-hdr-prev"
                    class="px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600
                           text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700
                           disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
              &lsaquo; ${t('previous', lang)}
            </button>
            <button id="mushaf-hdr-next"
                    class="px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600
                           text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700
                           disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
              ${t('next', lang)} &rsaquo;
            </button>
          </div>

          <!-- Zoom (dense tajweed print is hard to read at fit-to-screen) -->
          <div class="flex items-center gap-1">
            <button id="mushaf-zoom-out" title="${t('zoom_out', lang)}" aria-label="${t('zoom_out', lang)}"
                    class="px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30">🔍−</button>
            <span id="mushaf-zoom-label" class="text-xs text-gray-400 w-10 text-center">100%</span>
            <button id="mushaf-zoom-in" title="${t('zoom_in', lang)}" aria-label="${t('zoom_in', lang)}"
                    class="px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30">🔍+</button>
          </div>
        </div>

        <div class="flex items-center justify-center gap-2 sm:gap-4" dir="ltr">
          <button id="mushaf-next" title="${t('next', lang)}" aria-label="${t('next', lang)}"
                  class="shrink-0 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full text-2xl
                         text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700
                         disabled:opacity-30 disabled:cursor-not-allowed transition-colors">&lsaquo;</button>

          <!-- White plate stays white in dark mode: the scans are printed on white paper -->
          <div id="mushaf-plate" class="relative bg-white rounded-lg shadow-lg dark:shadow-black/40 p-2 sm:p-3
                                        flex items-center justify-center min-h-[300px] min-w-[200px] max-w-full">
            <div id="mushaf-status"
                 class="absolute inset-0 flex items-center justify-center px-4 text-center text-sm text-gray-500 hidden z-10"></div>
            <!-- One page normally; two side-by-side (RTL: current page on the right) on wide screens -->
            <div id="mushaf-pages" class="flex items-stretch justify-center gap-1 sm:gap-2" dir="rtl"></div>
          </div>

          <button id="mushaf-prev" title="${t('previous', lang)}" aria-label="${t('previous', lang)}"
                  class="shrink-0 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full text-2xl
                         text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700
                         disabled:opacity-30 disabled:cursor-not-allowed transition-colors">&rsaquo;</button>
        </div>
      </div>
    `;

    this.pagesEl = this.container.querySelector('#mushaf-pages');
    this.plateEl = this.container.querySelector('#mushaf-plate');
    this.status = this.container.querySelector('#mushaf-status');
    this.pageInput = this.container.querySelector('#mushaf-page-input');
    this.surahSelect = this.container.querySelector('#mushaf-surah-select');
    this.nextBtn = this.container.querySelector('#mushaf-next');
    this.prevBtn = this.container.querySelector('#mushaf-prev');
    this.hdrNextBtn = this.container.querySelector('#mushaf-hdr-next');
    this.hdrPrevBtn = this.container.querySelector('#mushaf-hdr-prev');

    // NEXT page is the LEFT one in a right-to-left book; step by 2 in spread view
    this.nextBtn.addEventListener('click', () => this.goTo(this.page + this.step()));
    this.prevBtn.addEventListener('click', () => this.goTo(this.page - this.step()));
    // Header buttons follow reading order: "next" advances, "previous" goes back
    this.hdrNextBtn.addEventListener('click', () => this.goTo(this.page + this.step()));
    this.hdrPrevBtn.addEventListener('click', () => this.goTo(this.page - this.step()));

    // Zoom controls
    this.container.querySelector('#mushaf-zoom-in')?.addEventListener('click', () => this.setZoom(this.zoom() + 0.25));
    this.container.querySelector('#mushaf-zoom-out')?.addEventListener('click', () => this.setZoom(this.zoom() - 0.25));

    // Re-render when crossing the one-page / two-page breakpoint (bind once)
    if (!this._resizeBound) {
      this._resizeBound = true;
      window.addEventListener('resize', () => {
        const nowSpread = this.isSpread();
        if (nowSpread !== this._wasSpread) { this._wasSpread = nowSpread; if (this.rendered) this.showPage(this.page); }
      });
    }

    const commitInput = () => {
      const p = parseInt(this.pageInput.value, 10);
      if (p) this.goTo(p);
      else this.pageInput.value = this.page;
    };
    this.pageInput.addEventListener('change', commitInput);
    this.pageInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); commitInput(); this.pageInput.blur(); }
    });

    this.surahSelect.addEventListener('change', () => {
      const num = parseInt(this.surahSelect.value, 10);
      if (num && this.surahPages && this.surahPages[num]) this.goTo(this.surahPages[num]);
    });
  }

  /* ------------------------------------------------------------------ *
   * Paging
   * ------------------------------------------------------------------ */

  /** Public entry point (also used by the sidebar quick-nav "Page" pill). */
  goTo(page) {
    page = this.clampPage(parseInt(page, 10) || 1);
    this.page = page;
    try { localStorage.setItem('mushafPage', String(page)); } catch (e) { /* ignore */ }
    if (this.rendered) this.showPage(page);
  }

  isSpread() { return window.innerWidth >= 1024; }
  step() { return this.isSpread() ? 2 : 1; }

  /* ---------- zoom (dense tajweed print) ---------- */

  zoom() {
    const v = parseFloat(localStorage.getItem('mushafZoom'));
    return isNaN(v) ? 1 : Math.min(Math.max(v, 1), 2.5);
  }

  setZoom(z) {
    z = Math.min(Math.max(Math.round(z * 100) / 100, 1), 2.5);
    try { localStorage.setItem('mushafZoom', String(z)); } catch (e) { /* ignore */ }
    this.applyZoom();
  }

  applyZoom() {
    const z = this.zoom();
    const label = this.container.querySelector('#mushaf-zoom-label');
    if (label) label.textContent = Math.round(z * 100) + '%';
    const zi = this.container.querySelector('#mushaf-zoom-in');
    const zo = this.container.querySelector('#mushaf-zoom-out');
    if (zi) zi.disabled = z >= 2.5;
    if (zo) zo.disabled = z <= 1;
    if (this.pagesEl) this.pagesEl.querySelectorAll('.mushaf-page-img').forEach(img => {
      img.style.maxHeight = (80 * z) + 'vh';
      img.style.maxWidth = z > 1 ? 'none' : '';
    });
    // When zoomed past fit, the plate pans (scrolls) instead of overflowing the page
    if (this.plateEl) {
      this.plateEl.classList.toggle('overflow-auto', z > 1);
      this.plateEl.style.maxHeight = z > 1 ? '85vh' : '';
      this.plateEl.style.maxWidth = z > 1 ? '100%' : '';
    }
  }

  showPage(page) {
    const lang = this.language;
    page = this.clampPage(page);
    this.page = page;
    this._wasSpread = this.isSpread();
    try { localStorage.setItem('mushafPage', String(page)); } catch (e) { /* ignore */ }

    if (this.pageInput) this.pageInput.value = page;
    const atLast = page >= this.TOTAL_PAGES;
    const atFirst = page <= 1;
    if (this.nextBtn) this.nextBtn.disabled = atLast;
    if (this.prevBtn) this.prevBtn.disabled = atFirst;
    if (this.hdrNextBtn) this.hdrNextBtn.disabled = atLast;
    if (this.hdrPrevBtn) this.hdrPrevBtn.disabled = atFirst;
    this.syncSurahSelect(page);

    // Which pages to show: current, plus the next one on wide screens (RTL: current on the right)
    const pages = (this.isSpread() && page + 1 <= this.TOTAL_PAGES) ? [page, page + 1] : [page];
    const token = ++this._loadToken;
    this.showStatus(t('loading', lang));
    let pending = pages.length;
    const maxH = pages.length > 1 ? 'max-h-[82vh]' : 'max-h-[80vh]';

    this.pagesEl.innerHTML = pages.map(p =>
      `<img class="mushaf-page-img ${maxH} max-w-full w-auto rounded opacity-40" data-page="${p}" alt="${t('page', lang)} ${p}" draggable="false">`
    ).join('');

    this.pagesEl.querySelectorAll('.mushaf-page-img').forEach(img => {
      const p = parseInt(img.getAttribute('data-page'), 10);
      img.onload = () => { if (token !== this._loadToken) return; img.classList.remove('opacity-40'); if (--pending <= 0) this.hideStatus(); };
      img.onerror = () => { if (token !== this._loadToken) return; img.classList.remove('opacity-40'); img.removeAttribute('src'); this.showStatus(t('mushaf_page_error', lang)); };
      img.src = this.imageUrl(p);
    });

    this.applyZoom();

    // Preload neighbours for instant turns (skip pages already displayed)
    [page - 1, page + 1, page + 2, page + 3].forEach(p => {
      if (p >= 1 && p <= this.TOTAL_PAGES && pages.indexOf(p) === -1) { const pre = new Image(); pre.src = this.imageUrl(p); }
    });
  }

  showStatus(text) {
    if (!this.status) return;
    this.status.textContent = text;
    this.status.classList.remove('hidden');
  }

  hideStatus() {
    if (this.status) this.status.classList.add('hidden');
  }

  handleKey(e) {
    if (!this.rendered || !this.isActiveTab()) return;
    const tag = (e.target && e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'select' || tag === 'textarea' || (e.target && e.target.isContentEditable)) return;

    if (e.key === 'ArrowLeft') {        // left = forward in a RTL book
      e.preventDefault();
      this.goTo(this.page + this.step());
    } else if (e.key === 'ArrowRight') { // right = back
      e.preventDefault();
      this.goTo(this.page - this.step());
    }
  }

  /* ------------------------------------------------------------------ *
   * Surah -> page mapping (quran.com /chapters, cached in localStorage)
   * ------------------------------------------------------------------ */

  async loadSurahPages() {
    try {
      let map = null;
      try { map = JSON.parse(localStorage.getItem('surahPages')); } catch (e) { /* ignore */ }

      if (!map || Object.keys(map).length !== 114) {
        const r = await fetch(`${QuranData.apiBase}/chapters`);
        if (!r.ok) throw new Error(`chapters request failed (${r.status})`);
        const data = await r.json();
        map = {};
        (data.chapters || []).forEach(c => {
          if (c.id && Array.isArray(c.pages)) map[c.id] = c.pages[0];
        });
        if (Object.keys(map).length !== 114) throw new Error('unexpected chapters payload');
        try { localStorage.setItem('surahPages', JSON.stringify(map)); } catch (e) { /* ignore */ }
      }

      this.surahPages = map;
      this.populateSurahSelect();
    } catch (err) {
      // Degrade gracefully: paging still works, only the surah jump is hidden
      if (this.surahSelect) this.surahSelect.classList.add('hidden');
    }
  }

  populateSurahSelect() {
    if (!this.surahSelect || !this.surahPages) return;
    const lang = this.language;
    let options = `<option value="">${t('select_surah', lang)}</option>`;
    for (let n = 1; n <= 114; n++) {
      const name = (typeof getSurahName !== 'undefined') ? getSurahName(n, lang) : n;
      options += `<option value="${n}">${n}. ${name}</option>`;
    }
    this.surahSelect.innerHTML = options;
    this.syncSurahSelect(this.page);
  }

  /** Select the surah that begins closest before (or on) the given page. */
  syncSurahSelect(page) {
    if (!this.surahSelect || !this.surahPages) return;
    let current = '';
    for (let n = 1; n <= 114; n++) {
      const start = this.surahPages[n];
      if (start && start <= page) current = String(n);
      else if (start && start > page) break;
    }
    this.surahSelect.value = current;
  }
}

// Initialize when DOM is ready
let mushafView;
document.addEventListener('DOMContentLoaded', () => {
  mushafView = new MushafView();
  window.mushafView = mushafView;
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MushafView };
}
