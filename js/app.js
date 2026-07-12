/**
 * Main Application Module
 * Handles core functionality: Surah loading, ayah display, and content management
 */

class QuranApp {
  constructor() {
    this.currentSurah = null;
    this.currentAyahRange = null;
    this.ayahData = [];
    this.language = 'en';

    // Global reading-view toggles (apply to all loaded ayahs)
    this.globalWbw = true;
    this.globalTafsir = false;
    this.globalGrammar = false;
    this.globalTajweed = false;
    this.tajweedAvailable = false;

    this.init();
  }

  init() {
    if (typeof appSettings !== 'undefined' && appSettings) {
      this.globalWbw = appSettings.get('showWbw') !== false;
    }
    this.cacheElements();
    this.setupEventListeners();
    this.populateSurahDropdown();
    this.populateJuzList();

    // Check for URL hash on load
    this.handleHashChange();
  }

  cacheElements() {
    this.surahSelect = document.getElementById('surah-select');
    this.ayahRangeInput = document.getElementById('ayah-range');
    this.loadBtn = document.getElementById('load-btn');
    this.ayahContainer = document.getElementById('ayah-container');
    this.loadingOverlay = document.getElementById('loading-overlay');
    this.sidebar = document.getElementById('sidebar');
    this.sidebarToggle = document.getElementById('sidebar-toggle');
    this.sidebarOverlay = document.getElementById('sidebar-overlay');
  }

  setupEventListeners() {
    // Surah selection
    if (this.surahSelect) {
      this.surahSelect.addEventListener('change', (e) => this.onSurahSelect(e));
    }

    // Load button
    if (this.loadBtn) {
      this.loadBtn.addEventListener('click', () => this.loadAyahs());
    }

    // Ayah range input - load on Enter
    if (this.ayahRangeInput) {
      this.ayahRangeInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.loadAyahs();
        }
      });
    }

    // Sidebar toggle
    if (this.sidebarToggle) {
      this.sidebarToggle.addEventListener('click', () => this.toggleSidebar());
    }

    if (this.sidebarOverlay) {
      this.sidebarOverlay.addEventListener('click', () => this.closeSidebar());
    }

    // Listen for language changes
    window.addEventListener('settingChanged', (e) => {
      if (e.detail.key === 'language') {
        this.language = e.detail.value;
        this.populateSurahDropdown();
        // Reload the current ayahs so translations follow the new language,
        // preserving any active collection banner
        if (this.ayahData.length > 0) {
          this.pendingContext = this.collectionContext;
          this.loadAyahs();
        }
      }
    });

    // Per-ayah controls in the reading tab (delegated)
    if (this.ayahContainer) {
      this.ayahContainer.addEventListener('click', (e) => {
        const play = e.target.closest('.play-ayah');
        if (play) {
          window.dispatchEvent(new CustomEvent('playAyah', {
            detail: { ref: play.getAttribute('data-ref') }
          }));
          return;
        }

        const globalBtn = e.target.closest('[data-global]');
        if (globalBtn) return this.applyGlobalToggle(globalBtn.getAttribute('data-global'));

        const copy = e.target.closest('.copy-ayah');
        if (copy) return this.copyAyah(copy);

        const card = e.target.closest('.ayah-card');
        if (!card) return;

        if (e.target.closest('.toggle-wbw')) return this.toggleWbw(card);
        if (e.target.closest('.toggle-tafsir')) return this.toggleInlineTafsir(card);
        if (e.target.closest('.toggle-grammar')) return this.toggleInlineGrammar(card);
        if (e.target.closest('.toggle-tajweed')) {
          const section = card.querySelector('.tajweed-view');
          return this.setTajweed(card, section && section.classList.contains('hidden'));
        }

        const accBtn = e.target.closest('.tafsir-acc');
        if (accBtn) return this.expandTafsirAccordion(accBtn);

        // Word tap → analysis modal (exact-word + root repetition), stays on page
        const wordBtn = e.target.closest('.wbw-inline-word');
        if (wordBtn && typeof wordByWord !== 'undefined' && wordByWord) {
          const key = wordBtn.getAttribute('data-key');
          const pos = parseInt(wordBtn.getAttribute('data-pos'));
          const ayah = this.ayahData.find(a => a.key === key);
          const word = ayah?.words.find(w => w.position === pos);
          if (ayah && word) wordByWord.showDetail(ayah, word);
        }
      });
    }

    // Handle URL hash changes
    window.addEventListener('hashchange', () => this.handleHashChange());
  }

  /**
   * Populate the Surah dropdown with all 114 Surahs
   * @param {string} lang - Language code
   */
  populateSurahDropdown(lang = null) {
    if (!this.surahSelect) return;

    lang = lang || (appSettings ? appSettings.get('language') : 'en');
    this.language = lang;

    // Keep the first option (placeholder)
    const placeholder = this.surahSelect.querySelector('option[value=""]');
    this.surahSelect.innerHTML = '';

    if (placeholder) {
      placeholder.textContent = t('select_surah', lang);
      this.surahSelect.appendChild(placeholder);
    } else {
      const opt = document.createElement('option');
      opt.value = '';
      opt.textContent = t('select_surah', lang);
      this.surahSelect.appendChild(opt);
    }

    // Add all Surahs
    SURAH_DATA.forEach(surah => {
      const opt = document.createElement('option');
      opt.value = surah.number;
      opt.setAttribute('data-ayah-count', surah.ayahCount);
      opt.textContent = formatSurahOption(surah, lang);
      this.surahSelect.appendChild(opt);
    });
  }

  /**
   * Populate the Juz navigation list
   */
  populateJuzList() {
    const juzList = document.getElementById('juz-list');
    if (!juzList) return;

    juzList.innerHTML = '';
    JUZ_DATA.forEach(juz => {
      const link = document.createElement('a');
      link.href = '#';
      link.className = 'block px-2 py-1 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400 rounded';
      link.textContent = `${t('juz', this.language)} ${juz.number}`;
      link.addEventListener('click', (e) => {
        e.preventDefault();
        this.loadJuz(juz.number);
      });
      juzList.appendChild(link);
    });
  }

  /**
   * Handle Surah selection change
   * @param {Event} e
   */
  onSurahSelect(e) {
    const surahNumber = parseInt(e.target.value);
    if (!surahNumber) {
      this.ayahRangeInput.value = '';
      return;
    }

    const surah = getSurahByNumber(surahNumber);
    if (surah) {
      this.currentSurah = surah;
      this.ayahRangeInput.value = `${surah.number}:1-${surah.ayahCount}`;
    }
  }

  /**
   * Load ayahs based on current selection
   */
  async loadAyahs() {
    const rangeStr = this.ayahRangeInput.value.trim();
    if (!rangeStr) {
      alert('Please select a Surah or enter an ayah range');
      return;
    }

    // Consume the collection context (set by navigation when the load came
    // from a dua/topic/story pick) — cleared on any other load
    this.collectionContext = this.pendingContext || null;
    this.pendingContext = null;

    this.showLoading(true);

    try {
      this.tajweedAvailable = await QuranData.legacyAvailable();
      const ranges = this.parseAyahRange(rangeStr);
      const rangeResults = await Promise.all(ranges.map(r =>
        QuranData.fetchRange(r.surah, r.startAyah, r.endAyah, this.language)
          .catch(err => {
            console.error(`Error fetching ${r.surah}:${r.startAyah}-${r.endAyah}:`, err);
            return [];
          })
      ));

      this.ayahData = rangeResults.flat();
      this.renderAyahs();

      // Update URL hash
      window.location.hash = rangeStr;

    } catch (error) {
      console.error('Error loading ayahs:', error);
      this.showError('Failed to load ayahs. Please try again.');
    } finally {
      this.showLoading(false);
    }
  }

  /**
   * Parse ayah range string (e.g., "2:255" or "2:1-10" or "2:1-10,3:1-5")
   * @param {string} rangeStr
   * @returns {Array} contiguous ranges: { surah, startAyah, endAyah }
   */
  parseAyahRange(rangeStr) {
    const ranges = [];
    const parts = rangeStr.split(',');

    parts.forEach(part => {
      part = part.trim();
      const match = part.match(/(\d+):(\d+)(?:-(\d+))?/);

      if (match) {
        const surah = parseInt(match[1]);
        const startAyah = parseInt(match[2]);
        const endAyah = match[3] ? parseInt(match[3]) : startAyah;

        // Merge with the previous range when consecutive in the same surah
        // (topic/story collections list long runs like 7:103, 7:104, ...)
        const prev = ranges[ranges.length - 1];
        if (prev && prev.surah === surah && startAyah <= prev.endAyah + 1 && startAyah >= prev.startAyah) {
          prev.endAyah = Math.max(prev.endAyah, endAyah);
        } else {
          ranges.push({ surah, startAyah, endAyah });
        }
      }
    });

    return ranges;
  }

  /**
   * Render ayahs to the container
   */
  renderAyahs() {
    if (!this.ayahContainer) return;

    if (this.ayahData.length === 0) {
      this.ayahContainer.innerHTML = `
        <div class="text-center py-12">
          <p class="text-gray-500 dark:text-gray-400">${t('no_results', this.language)}</p>
        </div>
      `;
      return;
    }

    const lang = this.language;
    const banner = this.renderCollectionBanner(lang);
    const html = this.ayahData.map(ayah => this.renderAyahCard(ayah, lang)).join('');
    this.ayahContainer.innerHTML = this.renderGlobalControls(lang) + banner + html;

    // Apply the global expand states to the freshly rendered cards
    if (this.globalTafsir || this.globalGrammar || this.globalTajweed) {
      this.ayahContainer.querySelectorAll('.ayah-card').forEach(card => {
        if (this.globalTafsir) this.setInlineTafsir(card, true);
        if (this.globalGrammar) this.setInlineGrammar(card, true);
        if (this.globalTajweed) this.setTajweed(card, true);
      });
    }

    // Keep the sticky tajweed guide in sync (re-renders on language change)
    if (typeof TajweedGuide !== 'undefined') {
      this.globalTajweed ? TajweedGuide.mount(lang) : TajweedGuide.unmount();
    }

    // Also update other tabs if they're listening
    this.updateTabsContent();
  }

  /**
   * Global toolbar above the verses: master show/hide for word-by-word,
   * tafsir and grammar across ALL loaded ayahs.
   */
  renderGlobalControls(lang) {
    const btn = (action, active, emoji, label) => `
      <button data-global="${action}"
              class="px-3 py-1.5 text-sm rounded-full border transition-colors ${active
                ? 'bg-primary text-white border-primary dark:bg-blue-600 dark:border-blue-600'
                : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}"
              title="${active ? t('hide_all', lang) : t('show_all', lang)}">
        ${emoji} ${label}
      </button>`;

    return `
      <div id="global-reading-controls"
           class="flex flex-wrap items-center gap-2 bg-white dark:bg-gray-800 rounded-lg shadow px-4 py-3 sticky top-0 z-10">
        <span class="text-xs uppercase font-semibold text-gray-400 dark:text-gray-500 mr-1">${t('display', lang)}</span>
        ${btn('wbw', this.globalWbw, '🔤', t('word_by_word', lang))}
        ${btn('tafsir', this.globalTafsir, '📖', t('tafseer', lang))}
        ${btn('grammar', this.globalGrammar, '🧩', t('grammar', lang))}
        ${this.tajweedAvailable ? btn('tajweed', this.globalTajweed, '🎨', t('tajweed_label', lang)) : ''}
      </div>
    `;
  }

  /** Flip one global toggle and apply it to every loaded ayah card */
  applyGlobalToggle(action) {
    const cards = this.ayahContainer.querySelectorAll('.ayah-card');
    if (action === 'wbw') {
      this.globalWbw = !this.globalWbw;
      if (typeof appSettings !== 'undefined' && appSettings) appSettings.set('showWbw', this.globalWbw);
      cards.forEach(card => this.setWbw(card, this.globalWbw));
    } else if (action === 'tafsir') {
      this.globalTafsir = !this.globalTafsir;
      cards.forEach(card => this.setInlineTafsir(card, this.globalTafsir));
    } else if (action === 'grammar') {
      this.globalGrammar = !this.globalGrammar;
      cards.forEach(card => this.setInlineGrammar(card, this.globalGrammar));
    } else if (action === 'tajweed') {
      this.globalTajweed = !this.globalTajweed;
      cards.forEach(card => this.setTajweed(card, this.globalTajweed));
      // Sticky right-side rule guide follows the tajweed mode
      if (typeof TajweedGuide !== 'undefined') {
        this.globalTajweed ? TajweedGuide.mount(this.language) : TajweedGuide.unmount();
      }
    }

    // Re-render the toolbar so button states update
    const bar = document.getElementById('global-reading-controls');
    if (bar) bar.outerHTML = this.renderGlobalControls(this.language);
  }

  /**
   * Banner shown above the verses when they were loaded from a
   * dua/topic/story collection (title + optional Bangla intro).
   */
  renderCollectionBanner(lang) {
    const ctx = this.collectionContext;
    if (!ctx || !ctx.t) return '';
    const escape = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const showIntro = ctx.i && lang === 'bn';
    return `
      <div class="bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-blue-900/30 dark:to-emerald-900/20
                  border border-primary/20 dark:border-blue-800 rounded-lg p-5">
        <h2 class="text-lg font-bold text-primary dark:text-blue-300" dir="auto">${escape(ctx.t)}
          <span class="text-sm font-normal text-gray-500 dark:text-gray-400">· ${this.ayahData.length} ${t('verses', lang)}</span>
        </h2>
        ${showIntro ? `<p class="mt-2 text-sm leading-relaxed text-gray-700 dark:text-gray-300" dir="auto">${escape(ctx.i)}</p>` : ''}
      </div>
    `;
  }

  /**
   * Render a single ayah card
   * @param {object} ayah
   * @param {string} lang
   * @returns {string}
   */
  /** Convert a number to Arabic-Indic digits for the verse-end medallion */
  toArabicDigits(n) {
    return String(n).replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
  }

  renderAyahCard(ayah, lang) {
    const translation = ayah.translation || '';
    const words = ayah.words || [];
    const translitLine = words.map(w => w.translit).filter(Boolean).join(' ');
    const showTranslit = (typeof appSettings === 'undefined' || !appSettings) || appSettings.get('showTransliteration') !== false;
    const showTranslation = (typeof appSettings === 'undefined' || !appSettings) || appSettings.get('showTranslation') !== false;
    const medallion = `<span class="text-primary dark:text-blue-400 select-none mx-1">۝${this.toArabicDigits(ayah.ayah)}</span>`;

    // Plain-Arabic line as word spans → hover shows the meaning (quranmazid-style);
    // data-key/data-pos let the audio player highlight the word being recited
    const plainArabic = words.length
      ? words.map(w => `<span class="cursor-help hover:text-primary dark:hover:text-blue-300 transition-colors"
                             data-key="${ayah.key}" data-pos="${w.position}"
                             title="${(w.meaning || '').replace(/"/g, '&quot;')}">${w.arabic}</span>`).join(' ') + medallion
      : ayah.arabic;

    // Word-by-word row: Arabic on top, meaning under each word (old-app layout)
    const wbwRow = words.map(w => `
      <button class="wbw-inline-word text-center px-1 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
              data-key="${ayah.key}" data-pos="${w.position}" title="${t('word', lang)} ${w.position}">
        <div class="ayah-arabic !text-3xl !leading-loose">${w.arabic}</div>
        <div class="text-xs md:text-sm text-gray-600 dark:text-gray-300 max-w-[9rem]" dir="auto">${w.meaning}</div>
      </button>
    `).join('');

    return `
      <div class="ayah-card" data-surah="${ayah.surah}" data-ayah="${ayah.ayah}" data-key="${ayah.key}">
        <div class="ayah-header flex flex-wrap items-center gap-2">
          <span class="ayah-number">${ayah.ayah}</span>
          <button class="copy-ayah p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-sm" title="${t('copy_ayah', lang)}" data-key="${ayah.key}">📋</button>
          <button class="bookmark-ayah p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-sm" title="${t('bookmark', lang)}" data-key="${ayah.key}">☆</button>
          <button class="play-ayah p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded" title="${t('play', lang)}" data-ref="${ayah.key}">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"/>
            </svg>
          </button>
          <button class="toggle-wbw px-2 py-1 text-xs rounded-full border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  title="${t('word_by_word', lang)}">🔤 ${t('word_by_word', lang)}</button>
          <button class="toggle-tafsir px-2 py-1 text-xs rounded-full border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  title="${t('tafseer', lang)}">📖 ${t('tafseer', lang)}</button>
          <button class="toggle-grammar px-2 py-1 text-xs rounded-full border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  title="${t('grammar', lang)}">🧩 ${t('grammar', lang)}</button>
          ${this.tajweedAvailable ? `
          <button class="toggle-tajweed px-2 py-1 text-xs rounded-full border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  title="${t('tajweed_label', lang)}">🎨 ${t('tajweed_label', lang)}</button>` : ''}
          <span class="ml-auto text-sm text-gray-500 dark:text-gray-400">
            ${ayah.surahName} (${ayah.surahArabicName}) ${ayah.key} · ${t('juz', lang)} ${ayah.juz}
          </span>
        </div>
        <div class="ayah-content">
          <div class="wbw-row flex flex-wrap gap-x-4 gap-y-3 py-2 border-b border-gray-100 dark:border-gray-700 ${this.globalWbw ? '' : 'hidden'}" dir="rtl">
            ${wbwRow}
            <span class="ayah-arabic !text-3xl !leading-loose self-center">${medallion}</span>
          </div>
          <div class="ayah-arabic ${this.globalWbw ? 'hidden' : ''}" dir="rtl">${plainArabic}</div>
          ${translitLine ? `<div class="ayah-translit mt-2 text-sm italic text-gray-400 dark:text-gray-500 ${showTranslit ? '' : 'hidden'}" dir="ltr">${translitLine}</div>` : ''}
          <div class="ayah-translation ${showTranslation ? '' : 'hidden'}">${translation}</div>
          <div class="tajweed-view hidden mt-2"></div>
          <div class="inline-tafsir hidden mt-3 space-y-2"></div>
          <div class="inline-grammar hidden mt-3 space-y-3"></div>
        </div>
      </div>
    `;
  }

  /** Copy an ayah (Arabic + translation + reference) to the clipboard */
  async copyAyah(btn) {
    const ayah = this.ayahData.find(a => a.key === btn.getAttribute('data-key'));
    if (!ayah) return;
    const text = `${ayah.arabic}\n\n${ayah.translation}\n— ${ayah.surahName} ${ayah.key}`;
    try {
      await navigator.clipboard.writeText(text);
      btn.textContent = '✅';
      setTimeout(() => { btn.textContent = '📋'; }, 1200);
    } catch (err) { /* clipboard unavailable */ }
  }

  /**
   * Toggle inline word-by-word for one ayah card (fall back to plain Arabic)
   */
  toggleWbw(card) {
    const row = card.querySelector('.wbw-row');
    if (!row) return;
    this.setWbw(card, row.classList.contains('hidden'));
  }

  setWbw(card, show) {
    const row = card.querySelector('.wbw-row');
    if (!row) return;
    row.classList.toggle('hidden', !show);
    card.querySelectorAll('.ayah-content > .ayah-arabic').forEach(el => el.classList.toggle('hidden', show));
  }

  /**
   * Toggle + lazily fill the inline tafsir accordions for one ayah card
   */
  async toggleInlineTafsir(card) {
    const section = card.querySelector('.inline-tafsir');
    if (!section) return;
    return this.setInlineTafsir(card, section.classList.contains('hidden'));
  }

  async setInlineTafsir(card, show) {
    const section = card.querySelector('.inline-tafsir');
    if (!section) return;
    section.classList.toggle('hidden', !show);
    if (section.dataset.loaded || !show) return;
    section.dataset.loaded = '1';

    const lang = this.language;
    const key = card.getAttribute('data-key');
    const sources = (typeof tafseerView !== 'undefined' && tafseerView)
      ? tafseerView.sourcesFor(lang) : [];

    section.innerHTML = sources.map(src => `
      <div class="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <button class="tafsir-acc w-full flex items-center justify-between px-4 py-2 text-sm font-medium
                       bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
                data-tafsir-id="${src.id}" data-verse-key="${key}">
          <span>${src.name}</span><span class="acc-icon">+</span>
        </button>
        <div class="tafsir-acc-body hidden px-4 py-3 text-sm leading-relaxed"></div>
      </div>
    `).join('') || `<p class="text-sm text-gray-400">${t('tafsir_unavailable', lang)}</p>`;
  }

  /**
   * Expand one tafsir accordion, fetching its content on first open
   */
  async expandTafsirAccordion(btn) {
    const body = btn.parentElement.querySelector('.tafsir-acc-body');
    const icon = btn.querySelector('.acc-icon');
    const open = body.classList.contains('hidden');
    body.classList.toggle('hidden', !open);
    if (icon) icon.textContent = open ? '−' : '+';
    if (!open || body.dataset.loaded) return;
    body.dataset.loaded = '1';

    body.innerHTML = `<span class="text-gray-400">${t('loading', this.language)}</span>`;
    try {
      const tafsirId = parseInt(btn.getAttribute('data-tafsir-id'));
      const result = await tafseerView.fetchTafsir(tafsirId, btn.getAttribute('data-verse-key'));
      if (result && result.text) {
        body.innerHTML = result.text;
        body.setAttribute('dir', tafseerView.bodyDirAttr(tafsirId));
      } else {
        body.innerHTML = `<span class="text-gray-400">${t('tafsir_unavailable', this.language)}</span>`;
      }
    } catch (err) {
      body.innerHTML = `<span class="text-gray-400">${t('tafsir_unavailable', this.language)}</span>`;
    }
  }

  /**
   * Toggle + lazily fill the inline grammar breakdown for one ayah card
   */
  async toggleInlineGrammar(card) {
    const section = card.querySelector('.inline-grammar');
    if (!section) return;
    return this.setInlineGrammar(card, section.classList.contains('hidden'));
  }

  async setInlineGrammar(card, show) {
    const section = card.querySelector('.inline-grammar');
    if (!section) return;
    section.classList.toggle('hidden', !show);
    if (section.dataset.loaded || !show) return;
    section.dataset.loaded = '1';

    const lang = this.language;
    section.innerHTML = `<p class="text-sm text-gray-400">${t('loading', lang)}</p>`;
    try {
      const surah = parseInt(card.getAttribute('data-surah'));
      const ayahNum = parseInt(card.getAttribute('data-ayah'));
      const ayah = this.ayahData.find(a => a.surah === surah && a.ayah === ayahNum);
      const morph = await QuranData.getMorphology(surah);
      const wordSegs = morph[String(ayahNum)] || [];

      section.innerHTML = wordSegs.map((segments, i) => {
        const apiWord = ayah?.words?.[i];
        const root = segments.map(s => s.r).find(Boolean);
        return `
          <div class="border border-gray-100 dark:border-gray-700 rounded-lg p-3">
            <div class="flex flex-wrap items-baseline gap-3 mb-2">
              <span class="text-xs text-gray-400">${i + 1}</span>
              <span class="ayah-arabic !text-2xl">${apiWord?.arabic || segments.map(s => s.t).join('')}</span>
              <span class="text-sm text-gray-600 dark:text-gray-300" dir="auto">${apiWord?.meaning || ''}</span>
              ${root ? `<span class="ml-auto text-sm text-gray-500 dark:text-gray-400">${t('root', lang)}: <span class="ayah-arabic !text-lg">${root.split('').join(' ')}</span></span>` : ''}
            </div>
            ${renderSegments(segments, lang)}
          </div>
        `;
      }).join('') || `<p class="text-sm text-gray-400">${t('grammar_unavailable', lang)}</p>`;
    } catch (err) {
      section.innerHTML = `<p class="text-sm text-gray-400">${t('grammar_unavailable', lang)}</p>`;
    }
  }

  /**
   * Notify feature modules (word-by-word, grammar, memorize, audio)
   * that new ayahs are loaded
   */
  updateTabsContent() {
    window.dispatchEvent(new CustomEvent('ayahsLoaded', {
      detail: { ayahs: this.ayahData, language: this.language }
    }));
  }

  /**
   * Toggle + lazily fill the color-coded tajweed text for one ayah card
   */
  async setTajweed(card, show) {
    const section = card.querySelector('.tajweed-view');
    if (!section) return;
    section.classList.toggle('hidden', !show);
    if (section.dataset.loaded || !show) return;
    section.dataset.loaded = '1';

    const lang = this.language;
    section.innerHTML = `<p class="text-sm text-gray-400">${t('loading', lang)}</p>`;
    try {
      const surah = parseInt(card.getAttribute('data-surah'));
      const ayahNum = parseInt(card.getAttribute('data-ayah'));
      const html = await TajweedData.renderAyah(surah, ayahNum);
      section.innerHTML = html
        ? `<div class="ayah-arabic !leading-loose p-3 rounded-lg bg-gray-50 dark:bg-gray-900/40" dir="rtl">${html}</div>`
        : `<p class="text-sm text-gray-400">${t('tajweed_unavailable', lang)}</p>`;
    } catch (err) {
      section.innerHTML = `<p class="text-sm text-gray-400">${t('tajweed_unavailable', lang)}</p>`;
    }
  }

  /**
   * Load a specific Juz
   * @param {number} juzNumber
   */
  loadJuz(juzNumber) {
    const juz = JUZ_DATA.find(j => j.number === juzNumber);
    if (!juz) return;

    // Build the ayah range string
    let rangeStr;
    if (juz.startSurah === juz.endSurah) {
      rangeStr = `${juz.startSurah}:${juz.startAyah}-${juz.endAyah}`;
    } else {
      // Just load the first few ayahs of the Juz for now
      rangeStr = `${juz.startSurah}:${juz.startAyah}-${Math.min(juz.startAyah + 9, getSurahByNumber(juz.startSurah).ayahCount)}`;
    }

    this.ayahRangeInput.value = rangeStr;
    this.loadAyahs();
    this.closeSidebar();
  }

  /**
   * Handle URL hash changes for deep linking
   */
  handleHashChange() {
    const hash = window.location.hash.slice(1);
    if (hash) {
      this.ayahRangeInput.value = decodeURIComponent(hash);
      this.loadAyahs();
    }
  }

  /**
   * Toggle sidebar visibility
   */
  toggleSidebar() {
    this.sidebar.classList.toggle('-translate-x-full');
    this.sidebarOverlay.classList.toggle('hidden');
  }

  /**
   * Close sidebar
   */
  closeSidebar() {
    this.sidebar.classList.add('-translate-x-full');
    this.sidebarOverlay.classList.add('hidden');
  }

  /**
   * Show/hide loading overlay
   * @param {boolean} show
   */
  showLoading(show) {
    if (this.loadingOverlay) {
      this.loadingOverlay.classList.toggle('hidden', !show);
    }
  }

  /**
   * Show error message
   * @param {string} message
   */
  showError(message) {
    if (this.ayahContainer) {
      this.ayahContainer.innerHTML = `
        <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
          <p class="text-red-600 dark:text-red-400">${message}</p>
        </div>
      `;
    }
  }
}

// Make functions globally available for Settings module
function populateSurahDropdown(lang) {
  if (quranApp) {
    quranApp.populateSurahDropdown(lang);
  }
}

// Initialize app when DOM is ready
let quranApp;
document.addEventListener('DOMContentLoaded', () => {
  quranApp = new QuranApp();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { QuranApp };
}
