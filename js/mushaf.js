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
    this.juzPages = null;   // { juzNumber: firstMushafPage } — derived from JUZ_DATA via the API
    this._loadToken = 0;

    // Distinct pages opened this session (a reading-effort indicator)
    this.sessionPages = new Set();

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

    // Keep the fullscreen button + container styling in sync with browser state
    // (covers Esc-to-exit and the OS-level fullscreen controls too)
    document.addEventListener('fullscreenchange', () => this.syncFullscreenButton());
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
    this.loadJuzPages();   // async; populates the Juz jump select when ready
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
          <select id="mushaf-juz-select"
                  class="px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600
                         bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100
                         focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-blue-500">
            <option value="">${t('select_juz', lang)}</option>
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

          <!-- View comfort: fit mode + night/sepia reading filter (persisted) -->
          <div class="flex items-center gap-1">
            <button id="mushaf-fit" title="${t('mushaf_fit', lang)}" aria-label="${t('mushaf_fit', lang)}"
                    class="px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"></button>
            <button id="mushaf-filter" title="${t('mushaf_filter', lang)}" aria-label="${t('mushaf_filter', lang)}"
                    class="px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"></button>
            <button id="mushaf-fullscreen" title="${t('mushaf_fullscreen', lang)}" aria-label="${t('mushaf_fullscreen', lang)}"
                    class="px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">⛶</button>
          </div>

          <!-- Page bookmarks -->
          <div class="flex items-center gap-1">
            <button id="mushaf-bookmark" title="${t('mushaf_bookmark_add', lang)}" aria-label="${t('mushaf_bookmark_add', lang)}"
                    class="px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">☆</button>
            <button id="mushaf-bookmarks-toggle" title="${t('mushaf_bookmarks', lang)}" aria-label="${t('mushaf_bookmarks', lang)}"
                    class="px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">🔖</button>
          </div>
        </div>

        <!-- Reading progress + session effort -->
        <div class="mb-3">
          <div class="h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
            <div id="mushaf-progress-bar" class="h-full bg-primary dark:bg-blue-500 transition-all duration-300" style="width:0%"></div>
          </div>
          <div class="mt-1.5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
            <span id="mushaf-progress-text"></span>
            <span id="mushaf-session-count"></span>
            <span class="hidden sm:inline">${t('mushaf_shortcuts', lang)}</span>
          </div>
        </div>

        <!-- Bookmarks panel (toggled) -->
        <div id="mushaf-bookmarks-panel" class="hidden mb-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/40">
          <div class="text-xs font-medium text-gray-600 dark:text-gray-300 mb-2">${t('mushaf_bookmarks', lang)}</div>
          <div id="mushaf-bookmarks-list" class="flex flex-wrap gap-2"></div>
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
    this.juzSelect = this.container.querySelector('#mushaf-juz-select');
    this.nextBtn = this.container.querySelector('#mushaf-next');
    this.prevBtn = this.container.querySelector('#mushaf-prev');
    this.hdrNextBtn = this.container.querySelector('#mushaf-hdr-next');
    this.hdrPrevBtn = this.container.querySelector('#mushaf-hdr-prev');
    this.fitBtn = this.container.querySelector('#mushaf-fit');
    this.filterBtn = this.container.querySelector('#mushaf-filter');
    this.fullscreenBtn = this.container.querySelector('#mushaf-fullscreen');
    this.bookmarkBtn = this.container.querySelector('#mushaf-bookmark');
    this.bookmarksPanel = this.container.querySelector('#mushaf-bookmarks-panel');
    this.bookmarksList = this.container.querySelector('#mushaf-bookmarks-list');
    this.progressBar = this.container.querySelector('#mushaf-progress-bar');
    this.progressText = this.container.querySelector('#mushaf-progress-text');
    this.sessionCountEl = this.container.querySelector('#mushaf-session-count');

    // NEXT page is the LEFT one in a right-to-left book; step by 2 in spread view
    this.nextBtn.addEventListener('click', () => this.goTo(this.page + this.step()));
    this.prevBtn.addEventListener('click', () => this.goTo(this.page - this.step()));
    // Header buttons follow reading order: "next" advances, "previous" goes back
    this.hdrNextBtn.addEventListener('click', () => this.goTo(this.page + this.step()));
    this.hdrPrevBtn.addEventListener('click', () => this.goTo(this.page - this.step()));

    // Zoom controls
    this.container.querySelector('#mushaf-zoom-in')?.addEventListener('click', () => this.setZoom(this.zoom() + 0.25));
    this.container.querySelector('#mushaf-zoom-out')?.addEventListener('click', () => this.setZoom(this.zoom() - 0.25));

    // View comfort controls
    this.fitBtn.addEventListener('click', () => this.setFit(this.fit() === 'height' ? 'width' : 'height'));
    this.filterBtn.addEventListener('click', () => this.cycleFilter());
    if (this.fullscreenBtn) this.fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());
    this.syncFitButton();
    this.syncFilterButton();
    this.syncFullscreenButton();

    // Bookmark controls
    this.bookmarkBtn.addEventListener('click', () => this.toggleBookmark(this.page));
    this.container.querySelector('#mushaf-bookmarks-toggle')?.addEventListener('click', () => {
      this.bookmarksPanel.classList.toggle('hidden');
      if (!this.bookmarksPanel.classList.contains('hidden')) this.renderBookmarks();
    });
    this.renderBookmarks();

    // Juz jump
    this.juzSelect.addEventListener('change', () => {
      const n = parseInt(this.juzSelect.value, 10);
      if (n && this.juzPages && this.juzPages[n]) this.goTo(this.juzPages[n]);
    });

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

    // Touch swipe page-turning on the page plate (renderShell recreates the
    // DOM, so binding here on the fresh element is safe across re-renders)
    this.bindSwipe(this.plateEl);
  }

  /* ------------------------------------------------------------------ *
   * Touch swipe page-turning (mobile)
   * ------------------------------------------------------------------ */

  /**
   * Physical RTL book: the NEXT page sits to the LEFT (same side as the
   * ‹ next arrow), so dragging the paper toward the RIGHT reveals it.
   * Swipe RIGHT -> next page, swipe LEFT -> previous page — the swipe moves
   * toward the on-screen arrow for the page it turns to.
   * All listeners are passive: vertical scrolling and pinch-zoom keep working.
   */
  bindSwipe(el) {
    if (!el) return;
    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    const threshold = 3 * rem; // minimum horizontal travel (~48px at default font size)
    let startX = 0, startY = 0, tracking = false;

    el.addEventListener('touchstart', (e) => {
      if (e.touches.length !== 1) { tracking = false; return; } // ignore multi-touch (pinch)
      tracking = true;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }, { passive: true });

    el.addEventListener('touchmove', (e) => {
      if (e.touches.length > 1) tracking = false; // a second finger joined: it's a pinch, not a swipe
    }, { passive: true });

    el.addEventListener('touchcancel', () => { tracking = false; }, { passive: true });

    el.addEventListener('touchend', (e) => {
      if (!tracking) return;
      tracking = false;
      if (this.zoom() > 1) return; // zoomed plate pans horizontally — don't hijack it
      const t0 = e.changedTouches && e.changedTouches[0];
      if (!t0) return;
      const dx = t0.clientX - startX;
      const dy = t0.clientY - startY;
      // Require clear horizontal dominance so vertical page scrolling still works
      if (Math.abs(dx) < threshold || Math.abs(dx) < Math.abs(dy) * 1.5) return;
      if (dx > 0) this.goTo(this.page + this.step()); // swipe right -> next (the page on the LEFT)
      else this.goTo(this.page - this.step());        // swipe left  -> previous (the page on the RIGHT)
    }, { passive: true });
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
    this.applyImageSizing();
    // When zoomed past fit, the plate pans (scrolls) instead of overflowing the page
    if (this.plateEl) {
      this.plateEl.classList.toggle('overflow-auto', z > 1);
      this.plateEl.style.maxHeight = z > 1 ? '85vh' : '';
      this.plateEl.style.maxWidth = z > 1 ? '100%' : '';
    }
  }

  /* ---------- view comfort: fit mode + reading filter ---------- */

  /** 'height' (cap by viewport height — default) or 'width' (fill available width). */
  fit() {
    const v = localStorage.getItem('mushafFit');
    return v === 'width' ? 'width' : 'height';
  }

  setFit(mode) {
    mode = mode === 'width' ? 'width' : 'height';
    try { localStorage.setItem('mushafFit', mode); } catch (e) { /* ignore */ }
    this.syncFitButton();
    this.applyZoom();
  }

  syncFitButton() {
    if (!this.fitBtn) return;
    const w = this.fit() === 'width';
    // Show the icon for the mode you'd switch TO, with a clear label
    this.fitBtn.textContent = w ? '↕' : '↔';
    const label = w ? t('mushaf_fit_height', this.language) : t('mushaf_fit_width', this.language);
    this.fitBtn.title = label;
    this.fitBtn.setAttribute('aria-label', label);
  }

  /** none → sepia → night → none. */
  filter() {
    const v = localStorage.getItem('mushafFilter');
    return (v === 'sepia' || v === 'night') ? v : 'none';
  }

  filterCss() {
    switch (this.filter()) {
      case 'sepia': return 'sepia(0.55) brightness(0.97) contrast(0.95)';
      // Invert the white scan to a dark page for low-light reading; hue-rotate keeps
      // tajweed colours roughly recognisable after the inversion.
      case 'night': return 'invert(0.9) hue-rotate(180deg) brightness(0.92) contrast(0.95)';
      default: return '';
    }
  }

  cycleFilter() {
    const order = ['none', 'sepia', 'night'];
    const next = order[(order.indexOf(this.filter()) + 1) % order.length];
    try { localStorage.setItem('mushafFilter', next); } catch (e) { /* ignore */ }
    this.syncFilterButton();
    this.applyImageSizing();
  }

  syncFilterButton() {
    if (!this.filterBtn) return;
    const f = this.filter();
    const icon = f === 'sepia' ? '📜' : (f === 'night' ? '🌙' : '☀️');
    const name = f === 'sepia' ? t('mushaf_sepia', this.language)
      : (f === 'night' ? t('mushaf_night', this.language) : t('mushaf_filter_off', this.language));
    this.filterBtn.textContent = icon;
    this.filterBtn.title = name;
    this.filterBtn.setAttribute('aria-label', name);
  }

  /** Single place that sizes the page image(s) from zoom + fit + reading filter. */
  applyImageSizing() {
    if (!this.pagesEl) return;
    const z = this.zoom();
    const fit = this.fit();
    const fcss = this.filterCss();
    const imgs = this.pagesEl.querySelectorAll('.mushaf-page-img');
    const single = imgs.length <= 1;
    // Fit-width needs the plate to span the row so a % width is meaningful.
    if (this.plateEl) {
      if (fit === 'width') { this.plateEl.style.flex = '1 1 auto'; this.plateEl.style.width = '100%'; }
      else { this.plateEl.style.flex = ''; this.plateEl.style.width = ''; }
    }
    imgs.forEach(img => {
      img.style.filter = fcss;
      if (fit === 'width') {
        img.style.height = 'auto';
        img.style.maxHeight = 'none';
        img.style.width = single ? (100 * z) + '%' : `calc(${50 * z}% - 0.5rem)`;
        img.style.maxWidth = z > 1 ? 'none' : '100%';
      } else {
        img.style.width = 'auto';
        img.style.height = '';
        img.style.maxHeight = ((single ? 80 : 82) * z) + 'vh';
        img.style.maxWidth = z > 1 ? 'none' : '100%';
      }
    });
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
    this.syncJuzSelect(page);

    // Session reading effort + progress
    this.sessionPages.add(page);
    this.updateProgress(page);
    this.syncBookmarkButton(page);

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
    } else if (e.key === 'Home') {       // first page
      e.preventDefault();
      this.goTo(1);
    } else if (e.key === 'End') {        // last page
      e.preventDefault();
      this.goTo(this.TOTAL_PAGES);
    } else if (e.key === 'g' || e.key === 'G') { // go to page
      e.preventDefault();
      if (this.pageInput) { this.pageInput.focus(); this.pageInput.select(); }
    } else if (e.key === 'b' || e.key === 'B') { // bookmark current page
      e.preventDefault();
      this.toggleBookmark(this.page);
    } else if (e.key === 'f' || e.key === 'F') { // fullscreen reading toggle
      e.preventDefault();
      this.toggleFullscreen();
    }
  }

  /* ------------------------------------------------------------------ *
   * Fullscreen reading (distraction-free page view)
   * ------------------------------------------------------------------ */

  isFullscreen() {
    return !!(document.fullscreenElement);
  }

  toggleFullscreen() {
    try {
      if (this.isFullscreen()) {
        if (document.exitFullscreen) document.exitFullscreen();
      } else if (this.container && this.container.requestFullscreen) {
        this.container.requestFullscreen();
      }
    } catch (e) { /* fullscreen unsupported / blocked — no-op */ }
  }

  syncFullscreenButton() {
    const fs = this.isFullscreen();
    // Give the container breathing room + a neutral backdrop while fullscreen
    if (this.container) {
      this.container.classList.toggle('overflow-auto', fs);
      this.container.classList.toggle('bg-gray-100', fs);
      this.container.classList.toggle('dark:bg-gray-900', fs);
      this.container.classList.toggle('p-2', fs);
    }
    if (!this.fullscreenBtn) return;
    this.fullscreenBtn.textContent = fs ? '🡼' : '⛶';
    const label = fs ? t('mushaf_exit_fullscreen', this.language) : t('mushaf_fullscreen', this.language);
    this.fullscreenBtn.title = label;
    this.fullscreenBtn.setAttribute('aria-label', label);
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
    // Bookmark chips can now show surah names too
    this.renderBookmarks();
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

  /* ------------------------------------------------------------------ *
   * Juz -> page mapping (start ayah of each Juz from JUZ_DATA, resolved
   * to a mushaf page via the quran.com verse page_number, cached locally)
   * ------------------------------------------------------------------ */

  async loadJuzPages() {
    if (typeof JUZ_DATA === 'undefined' || !Array.isArray(JUZ_DATA)) {
      if (this.juzSelect) this.juzSelect.classList.add('hidden');
      return;
    }
    try {
      let map = null;
      try { map = JSON.parse(localStorage.getItem('mushafJuzPages')); } catch (e) { /* ignore */ }

      if (!map || Object.keys(map).length !== JUZ_DATA.length) {
        const results = await Promise.all(JUZ_DATA.map(j =>
          fetch(`${QuranData.apiBase}/verses/by_key/${j.startSurah}:${j.startAyah}?fields=page_number`)
            .then(r => (r.ok ? r.json() : null))
            .catch(() => null)
        ));
        map = {};
        results.forEach((d, i) => {
          const p = d && d.verse && d.verse.page_number;
          if (p) map[JUZ_DATA[i].number] = p;
        });
        if (Object.keys(map).length !== JUZ_DATA.length) throw new Error('juz page mapping incomplete');
        try { localStorage.setItem('mushafJuzPages', JSON.stringify(map)); } catch (e) { /* ignore */ }
      }

      this.juzPages = map;
      this.populateJuzSelect();
    } catch (err) {
      // Degrade gracefully: paging still works, only the Juz jump is hidden
      if (this.juzSelect) this.juzSelect.classList.add('hidden');
    }
  }

  populateJuzSelect() {
    if (!this.juzSelect || !this.juzPages) return;
    const lang = this.language;
    let options = `<option value="">${t('select_juz', lang)}</option>`;
    Object.keys(this.juzPages).map(Number).sort((a, b) => a - b).forEach(n => {
      options += `<option value="${n}">${t('juz', lang)} ${n} — ${t('page', lang)} ${this.juzPages[n]}</option>`;
    });
    this.juzSelect.innerHTML = options;
    this.syncJuzSelect(this.page);
  }

  /** Select the Juz that begins closest before (or on) the given page. */
  syncJuzSelect(page) {
    if (!this.juzSelect || !this.juzPages) return;
    let current = '';
    Object.keys(this.juzPages).map(Number).sort((a, b) => a - b).forEach(n => {
      if (this.juzPages[n] <= page) current = String(n);
    });
    this.juzSelect.value = current;
  }

  /* ------------------------------------------------------------------ *
   * Reading progress + per-session effort
   * ------------------------------------------------------------------ */

  updateProgress(page) {
    const lang = this.language;
    const pct = Math.round((page / this.TOTAL_PAGES) * 100);
    if (this.progressBar) this.progressBar.style.width = pct + '%';
    if (this.progressText) {
      this.progressText.textContent =
        `${t('page', lang)} ${page} / ${this.TOTAL_PAGES} · ${pct}% ${t('mushaf_of_quran', lang)}`;
    }
    if (this.sessionCountEl) {
      this.sessionCountEl.textContent =
        `${t('mushaf_read_session', lang)}: ${this.sessionPages.size}`;
    }
  }

  /* ------------------------------------------------------------------ *
   * Page bookmarks (localStorage 'mushafBookmarks')
   * ------------------------------------------------------------------ */

  getBookmarks() {
    let arr = [];
    try { arr = JSON.parse(localStorage.getItem('mushafBookmarks')) || []; } catch (e) { /* ignore */ }
    return Array.isArray(arr) ? arr.filter(p => Number.isInteger(p)) : [];
  }

  setBookmarks(arr) {
    const uniq = Array.from(new Set(arr)).sort((a, b) => a - b);
    try { localStorage.setItem('mushafBookmarks', JSON.stringify(uniq)); } catch (e) { /* ignore */ }
    return uniq;
  }

  toggleBookmark(page) {
    page = this.clampPage(page);
    const marks = this.getBookmarks();
    const idx = marks.indexOf(page);
    if (idx === -1) marks.push(page); else marks.splice(idx, 1);
    this.setBookmarks(marks);
    this.syncBookmarkButton(this.page);
    this.renderBookmarks();
  }

  syncBookmarkButton(page) {
    if (!this.bookmarkBtn) return;
    const marked = this.getBookmarks().indexOf(page) !== -1;
    this.bookmarkBtn.textContent = marked ? '★' : '☆';
    this.bookmarkBtn.classList.toggle('text-yellow-500', marked);
    const label = marked ? t('mushaf_bookmark_remove', this.language) : t('mushaf_bookmark_add', this.language);
    this.bookmarkBtn.title = label;
    this.bookmarkBtn.setAttribute('aria-label', label);
  }

  renderBookmarks() {
    if (!this.bookmarksList) return;
    const lang = this.language;
    const marks = this.getBookmarks();
    if (!marks.length) {
      this.bookmarksList.innerHTML =
        `<span class="text-xs text-gray-400 dark:text-gray-500">${t('mushaf_no_bookmarks', lang)}</span>`;
      return;
    }
    this.bookmarksList.innerHTML = marks.map(p => {
      const surah = this.surahForPage(p);
      const name = surah ? `${surah}. ${(typeof getSurahName !== 'undefined') ? getSurahName(surah, lang) : ''}` : '';
      return `
        <span class="inline-flex items-center gap-1 pl-2 pr-1 py-1 rounded-full text-xs
                     bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600">
          <button class="mushaf-bm-go text-gray-700 dark:text-gray-200 hover:text-primary" data-page="${p}"
                  title="${t('page', lang)} ${p}">${t('page', lang)} ${p}${name ? ' · ' + name : ''}</button>
          <button class="mushaf-bm-del w-6 h-6 -my-1 flex items-center justify-center rounded-full
                         text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600" data-page="${p}"
                  title="${t('mushaf_bookmark_remove', lang)}" aria-label="${t('mushaf_bookmark_remove', lang)}">×</button>
        </span>`;
    }).join('');
    this.bookmarksList.querySelectorAll('.mushaf-bm-go').forEach(b =>
      b.addEventListener('click', () => this.goTo(parseInt(b.getAttribute('data-page'), 10))));
    this.bookmarksList.querySelectorAll('.mushaf-bm-del').forEach(b =>
      b.addEventListener('click', (e) => { e.stopPropagation(); this.toggleBookmark(parseInt(b.getAttribute('data-page'), 10)); }));
  }

  /** Surah number whose scan begins on/before the given page (for labelling). */
  surahForPage(page) {
    if (!this.surahPages) return null;
    let current = null;
    for (let n = 1; n <= 114; n++) {
      const start = this.surahPages[n];
      if (start && start <= page) current = n;
      else if (start && start > page) break;
    }
    return current;
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
