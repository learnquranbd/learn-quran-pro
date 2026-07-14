/**
 * App Navigation Module
 * Brings the sidebar to life:
 *  - Sidebar topic links open their tab (or a picker modal for Duas / Topics)
 *  - A reusable picker modal for RABBANA_DUAS and TOPIC_GROUPS (js/topics-data.js)
 *  - A searchable Surah quick-nav list injected above the Juz list
 */

class AppNavigation {
  constructor() {
    this.sidebar = document.getElementById('sidebar');
    if (!this.sidebar) return;

    this.language = (typeof appSettings !== 'undefined' && appSettings)
      ? appSettings.get('language')
      : 'en';
    this.modalType = null; // 'dua' | 'topics' | null
    this._datasets = {};   // lazy-loaded data/*.json catalogs (ported from learn-quran-bd.web.app)

    this.setupSidebarLinks();
    this.createModal();
    this.injectSurahPicker();

    // Re-localize on language change
    window.addEventListener('settingChanged', (e) => {
      if (e.detail && e.detail.key === 'language') {
        this.language = e.detail.value;
        this.refreshSurahPicker();
        // If a picker modal is open, re-render it in the new language
        if (this.modalType && !this.overlay.classList.contains('hidden')) {
          if (this.modalType === 'dua') this.openDuaModal();
          else if (this.modalType === 'topics') this.openTopicsModal();
        }
      }
    });
  }

  /* ------------------------------------------------------------------ *
   * Sidebar links
   * ------------------------------------------------------------------ */

  setupSidebarLinks() {
    const links = document.querySelectorAll('.sidebar-link');
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const topic = link.getAttribute('data-topic');
        this.handleTopic(topic);
      });
    });
  }

  handleTopic(topic) {
    switch (topic) {
      case 'reading':
        this.switchTab('reading');
        this.closeSidebar();
        break;
      case 'tafseer':
        this.switchTab('tafseer');
        this.closeSidebar();
        break;
      case 'grammar':
        this.switchTab('grammar');
        this.closeSidebar();
        break;
      case 'words':
        this.switchTab('learn');
        window.dispatchEvent(new CustomEvent('learnModuleSelected', {
          detail: { module: 'vocab' }
        }));
        this.closeSidebar();
        break;
      case 'names':
        this.switchTab('learn');
        window.dispatchEvent(new CustomEvent('learnModuleSelected', {
          detail: { module: 'names' }
        }));
        this.closeSidebar();
        break;
      case 'dua':
        this.openDuaModal();
        break;
      case 'topics':
        this.openTopicsModal();
        break;
    }
  }

  switchTab(tabId) {
    if (typeof tabSystem !== 'undefined' && tabSystem) {
      tabSystem.switchTab(tabId);
    }
  }

  /**
   * Close the mobile sidebar (mirrors QuranApp.closeSidebar)
   */
  closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (sidebar) sidebar.classList.add('-translate-x-full');
    if (overlay) overlay.classList.add('hidden');
  }

  /* ------------------------------------------------------------------ *
   * Navigation helper
   * ------------------------------------------------------------------ */

  /**
   * Load a verse reference set via the URL hash and show the reading tab.
   * @param {string|Array<string>} refs - e.g. "2:201" or ["2:153","3:200"]
   */
  navigateToRefs(refs, ctx = null) {
    // Hand the collection context (title + optional intro) to the reading view
    if (typeof quranApp !== 'undefined' && quranApp) {
      quranApp.pendingContext = ctx;
    }
    const rangeStr = Array.isArray(refs) ? refs.join(',') : refs;

    if (window.location.hash === '#' + rangeStr) {
      // Hash unchanged: no hashchange event will fire, load manually
      if (typeof quranApp !== 'undefined' && quranApp) {
        quranApp.handleHashChange();
      }
    } else {
      window.location.hash = rangeStr;
    }

    this.switchTab('reading');
    this.closeModal();
    this.closeSidebar();
  }

  /* ------------------------------------------------------------------ *
   * Reusable picker modal
   * ------------------------------------------------------------------ */

  createModal() {
    this.overlay = document.createElement('div');
    this.overlay.id = 'nav-picker-modal';
    this.overlay.className = 'fixed inset-0 bg-black/50 z-50 items-center justify-center p-4 hidden';
    this.overlay.innerHTML = `
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-lg max-h-[80vh] flex flex-col">
        <div class="flex items-center justify-between px-5 py-3 border-b border-gray-200 dark:border-gray-700">
          <h3 id="nav-modal-title" class="font-semibold text-gray-800 dark:text-gray-100"></h3>
          <button id="nav-modal-close" class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-500 dark:text-gray-400">✕</button>
        </div>
        <div id="nav-modal-body" class="overflow-y-auto p-3 space-y-1"></div>
      </div>
    `;
    document.body.appendChild(this.overlay);
    if (window.escClose) window.escClose(this.overlay, () => this.closeModal());

    this.modalTitle = this.overlay.querySelector('#nav-modal-title');
    this.modalBody = this.overlay.querySelector('#nav-modal-body');

    // Close button
    this.overlay.querySelector('#nav-modal-close').addEventListener('click', () => this.closeModal());

    // Click outside closes
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) this.closeModal();
    });

    // Item clicks (delegated)
    this.modalBody.addEventListener('click', (e) => {
      const item = e.target.closest('[data-refs]');
      if (item) {
        let ctx = null;
        const raw = item.getAttribute('data-ctx');
        if (raw) {
          try { ctx = JSON.parse(decodeURIComponent(raw)); } catch (err) { /* no context */ }
        }
        this.navigateToRefs(item.getAttribute('data-refs'), ctx);
      }
    });
  }

  openModal(title) {
    this.modalTitle.textContent = title;
    this.overlay.querySelector('#nav-modal-close').setAttribute('title', t('close', this.language));
    this.overlay.classList.remove('hidden');
    this.overlay.classList.add('flex');
  }

  closeModal() {
    this.overlay.classList.add('hidden');
    this.overlay.classList.remove('flex');
    this.modalType = null;
  }

  /**
   * Lazy-load one of the catalogs ported from the original Bangla app
   * (data/duas.json, data/subjects.json, data/stories.json, data/pillars.json)
   */
  async loadDataset(name) {
    if (!this._datasets[name]) {
      this._datasets[name] = fetch(`data/${name}.json`)
        .then(r => { if (!r.ok) throw new Error(name + ' not found'); return r.json(); })
        .catch(err => { delete this._datasets[name]; return []; });
    }
    return this._datasets[name];
  }

  /** Display label for a ported catalog item: Bangla UI gets the original label */
  catalogLabel(item, lang) {
    if (lang === 'bn' && item.bn) return item.bn;
    if (item.en) return item.en;
    return (item.slug || '').replace(/^_+/, '').replace(/_+/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase());
  }

  sectionHeading(text) {
    return `<h4 class="px-2 pt-3 pb-1 text-xs font-semibold uppercase text-gray-400 dark:text-gray-500">${text}</h4>`;
  }

  catalogButton(item, lang, emoji) {
    const label = this.catalogLabel(item, lang);
    const ctx = encodeURIComponent(JSON.stringify({
      t: (emoji ? emoji + ' ' : '') + label,
      i: item.intro_bn || ''
    }));
    return `
      <button data-refs="${item.refs.join(',')}" data-ctx="${ctx}"
              class="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-start
                     hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
        ${emoji ? `<span class="text-xl">${emoji}</span>` : ''}
        <span class="flex-1 text-sm text-gray-700 dark:text-gray-200" dir="auto">${label}</span>
        <span class="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap">${item.refs.length} ${t('verses', lang)}</span>
      </button>
    `;
  }

  async openDuaModal() {
    if (typeof RABBANA_DUAS === 'undefined') return;
    this.modalType = 'dua';

    const lang = this.language;
    const featured = RABBANA_DUAS.map(dua => `
      <button data-refs="${dua.refs}"
              data-ctx="${encodeURIComponent(JSON.stringify({ t: '🤲 ' + (dua.names[lang] || dua.names.en) }))}"
              class="w-full flex items-center justify-between gap-3 px-4 py-2 rounded-lg text-start
                     hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
        <span class="text-sm text-gray-700 dark:text-gray-200" dir="auto">${dua.names[lang] || dua.names.en}</span>
        <span class="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap" dir="ltr">${dua.refs}</span>
      </button>
    `).join('');

    this.modalBody.innerHTML = featured;
    this.openModal(t('duas', lang));

    // Ported dua collections (data/duas.json)
    const collections = await this.loadDataset('duas');
    if (this.modalType !== 'dua' || collections.length === 0) return;
    this.modalBody.innerHTML =
      this.sectionHeading(t('dua_collections', lang)) +
      collections.map(c => this.catalogButton(c, lang, c.emoji)).join('') +
      this.sectionHeading(t('rabbana_duas', lang)) +
      featured;
  }

  async openTopicsModal() {
    if (typeof TOPIC_GROUPS === 'undefined') return;
    this.modalType = 'topics';

    const lang = this.language;
    const featured = TOPIC_GROUPS.map(topic => `
      <button data-refs="${topic.refs.join(',')}"
              data-ctx="${encodeURIComponent(JSON.stringify({ t: topic.emoji + ' ' + (topic.names[lang] || topic.names.en) }))}"
              class="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-start
                     hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
        <span class="text-xl">${topic.emoji}</span>
        <span class="flex-1 text-sm text-gray-700 dark:text-gray-200" dir="auto">${topic.names[lang] || topic.names.en}</span>
        <span class="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap">${this.countVerses(topic.refs)} ${t('verses', lang)}</span>
      </button>
    `).join('');

    this.modalBody.innerHTML = `
      <div class="px-2 pb-2 sticky top-0 bg-white dark:bg-gray-800">
        <input type="text" id="subject-search"
               class="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600
                      bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100
                      placeholder-gray-400 dark:placeholder-gray-500
                      focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-blue-500"
               placeholder="${t('search_subjects', lang)}">
      </div>
      <div id="subject-results"></div>
      <div id="topics-default">${this.sectionHeading(t('featured_topics', lang))}${featured}</div>
    `;
    this.openModal(t('topics_by_subject', lang));

    // Append ported catalogs: prophet stories + pillars of Islam
    const [stories, pillars, subjects] = await Promise.all([
      this.loadDataset('stories'), this.loadDataset('pillars'), this.loadDataset('subjects')
    ]);
    if (this.modalType !== 'topics') return;

    const defaults = this.modalBody.querySelector('#topics-default');
    if (defaults) {
      if (pillars.length) {
        defaults.innerHTML += this.sectionHeading(t('pillars_of_islam', lang)) +
          pillars.map(p => this.catalogButton(p, lang, '🕌')).join('');
      }
      if (stories.length) {
        defaults.innerHTML += this.sectionHeading(t('stories_of_prophets', lang)) +
          stories.map(s => this.catalogButton(s, lang, '📜')).join('');
      }
    }

    // Live search across the full ported subject catalog (1,800+ entries)
    const input = this.modalBody.querySelector('#subject-search');
    const results = this.modalBody.querySelector('#subject-results');
    if (input && results && subjects.length) {
      input.setAttribute('placeholder', t('search_subjects', lang) + ` (${subjects.length})`);
      input.addEventListener('input', () => {
        const q = input.value.trim().toLowerCase();
        const defaultsEl = this.modalBody.querySelector('#topics-default');
        if (!q) {
          results.innerHTML = '';
          if (defaultsEl) defaultsEl.classList.remove('hidden');
          return;
        }
        if (defaultsEl) defaultsEl.classList.add('hidden');
        const matches = subjects.filter(s =>
          (s.en && s.en.toLowerCase().includes(q)) || (s.bn && s.bn.includes(input.value.trim()))
        ).slice(0, 60);
        results.innerHTML = matches.length
          ? matches.map(s => this.catalogButton(s, lang)).join('')
          : `<p class="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">${t('no_results', lang)}</p>`;
      });
    }
  }

  /**
   * Count total verses covered by an array of refs like ["2:155-157", "3:200"]
   * @param {Array<string>} refs
   * @returns {number}
   */
  countVerses(refs) {
    return refs.reduce((total, ref) => {
      const match = ref.match(/(\d+):(\d+)(?:-(\d+))?/);
      if (!match) return total;
      const start = parseInt(match[2]);
      const end = match[3] ? parseInt(match[3]) : start;
      return total + (end - start + 1);
    }, 0);
  }

  /* ------------------------------------------------------------------ *
   * Surah quick-nav picker (injected above #juz-list)
   * ------------------------------------------------------------------ */

  injectSurahPicker() {
    const juzList = document.getElementById('juz-list');
    if (!juzList || !juzList.parentNode) return;

    const lang = this.language;
    try { this.qnTab = localStorage.getItem('quickNavTab') || 'surah'; } catch (e) { this.qnTab = 'surah'; }

    this.surahSection = document.createElement('div');
    this.surahSection.id = 'surah-quick-nav';
    this.surahSection.className = 'mb-4';
    this.surahSection.innerHTML = `
      <div id="qn-tabs" class="flex p-1 mb-2 rounded-lg bg-black/20 dark:bg-black/30 gap-1">
        <button data-qn-tab="surah" class="qn-tab flex-1 px-3 py-1.5 text-sm rounded-md transition-colors">${t('surah', lang)}</button>
        <button data-qn-tab="juz" class="qn-tab flex-1 px-3 py-1.5 text-sm rounded-md transition-colors">${t('juz', lang)}</button>
        <button data-qn-tab="page" class="qn-tab flex-1 px-3 py-1.5 text-sm rounded-md transition-colors">${t('page', lang)}</button>
      </div>
      <div id="qn-goto" class="flex gap-2 mb-2">
        <input type="text" id="qn-goto-input" inputmode="numeric" autocomplete="off"
               class="flex-1 min-w-0 px-3 py-1.5 text-sm rounded-lg border border-gray-300 dark:border-gray-600
                      bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100
                      placeholder-gray-400 dark:placeholder-gray-500
                      focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-blue-500"
               placeholder="${t('go_to_verse_hint', lang)}">
        <button id="qn-goto-go"
                class="px-3 py-1.5 text-sm rounded-lg bg-secondary text-white hover:bg-secondary/80 transition-colors">${t('go', lang)}</button>
      </div>
      <div id="qn-actions" class="flex flex-wrap gap-1 mb-2">
        <button id="qn-continue" data-refs="" title="${t('continue_reading', lang)}"
                class="hidden flex items-center gap-1 px-2 py-1 text-xs rounded-lg
                       bg-primary/10 text-primary dark:bg-blue-500/20 dark:text-blue-300
                       hover:bg-primary hover:text-white dark:hover:bg-blue-600 transition-colors max-w-full">
          <span>▶</span><span class="qn-cont-word">${t('continue_reading', lang)}</span>
          <span class="qn-cont-label font-medium truncate"></span>
        </button>
        <button id="qn-rand-surah" title="${t('random_surah_title', lang)}"
                class="px-2 py-1 text-xs rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300
                       hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">🎲 <span class="qn-rs-label">${t('surah', lang)}</span></button>
        <button id="qn-rand-juz" title="${t('random_juz_title', lang)}"
                class="px-2 py-1 text-xs rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300
                       hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">🎲 <span class="qn-rj-label">${t('juz', lang)}</span></button>
      </div>
      <div id="qn-recent" class="mb-2"></div>
      <div id="qn-surah-pane">
        <input type="text" id="surah-quick-search"
               class="w-full px-3 py-1.5 mb-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600
                      bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100
                      placeholder-gray-400 dark:placeholder-gray-500
                      focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-blue-500"
               placeholder="${t('search_surah', lang)}">
        <div id="surah-quick-list" class="max-h-64 overflow-y-auto space-y-1 text-sm"></div>
      </div>
      <div id="qn-juz-pane" class="max-h-64 overflow-y-auto"></div>
      <div id="qn-page-pane" class="flex gap-2">
        <input type="number" id="qn-page-input" min="1" max="604" placeholder="1-604"
               class="flex-1 min-w-0 px-3 py-1.5 text-sm rounded-lg border border-gray-300 dark:border-gray-600
                      bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100
                      placeholder-gray-400 dark:placeholder-gray-500
                      focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-blue-500">
        <button id="qn-page-go"
                class="px-3 py-1.5 text-sm rounded-lg bg-secondary text-white hover:bg-secondary/80 transition-colors">${t('go', lang)}</button>
      </div>
    `;

    juzList.parentNode.insertBefore(this.surahSection, juzList);

    // Adopt the existing #juz-list (app.js keeps populating it) into the Juz pane
    this.surahSection.querySelector('#qn-juz-pane').appendChild(juzList);

    this.searchInput = this.surahSection.querySelector('#surah-quick-search');
    this.surahList = this.surahSection.querySelector('#surah-quick-list');

    // Tab switching (persisted)
    this.surahSection.querySelector('#qn-tabs').addEventListener('click', (e) => {
      const btn = e.target.closest('[data-qn-tab]');
      if (!btn) return;
      this.qnTab = btn.getAttribute('data-qn-tab');
      try { localStorage.setItem('quickNavTab', this.qnTab); } catch (err) { /* ignore */ }
      this.applyQnTab();
    });
    this.applyQnTab();

    // Live filtering
    this.searchInput.addEventListener('input', () => {
      this.renderSurahList(this.searchInput.value);
    });

    // Delegated click
    this.surahList.addEventListener('click', (e) => {
      const link = e.target.closest('[data-surah]');
      if (!link) return;
      e.preventDefault();
      this.onSurahPicked(parseInt(link.getAttribute('data-surah')));
    });

    // "Page" pill: jump straight to a mushaf page (js/mushaf.js)
    const pageInput = this.surahSection.querySelector('#qn-page-input');
    const pageGo = this.surahSection.querySelector('#qn-page-go');
    const goToPage = () => {
      const p = parseInt(pageInput.value, 10);
      if (!p || p < 1 || p > 604) return;
      if (window.mushafView) window.mushafView.goTo(p);
      this.switchTab('mushaf');
      this.closeSidebar();
    };
    pageGo.addEventListener('click', goToPage);
    pageInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); goToPage(); }
    });

    // "Go to verse" quick input: accepts "2:255" or "18:1-10"
    this.gotoInput = this.surahSection.querySelector('#qn-goto-input');
    const gotoGo = this.surahSection.querySelector('#qn-goto-go');
    this.gotoInput.addEventListener('input', () => this.gotoInput.classList.remove('ring-2', 'ring-red-500'));
    gotoGo.addEventListener('click', () => this.goToVerse());
    this.gotoInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); this.goToVerse(); }
    });

    // Quick actions: Continue / Random surah / Random juz
    this.surahSection.querySelector('#qn-continue').addEventListener('click', (e) => {
      const refs = e.currentTarget.getAttribute('data-refs');
      if (refs) this.navigateToRefs(refs);
    });
    this.surahSection.querySelector('#qn-rand-surah').addEventListener('click', () => this.randomSurah());
    this.surahSection.querySelector('#qn-rand-juz').addEventListener('click', () => this.randomJuz());

    // Recent list (delegated: chips reload a range, clear button empties it)
    this.surahSection.querySelector('#qn-recent').addEventListener('click', (e) => {
      if (e.target.closest('#qn-recent-clear')) { this.clearRecents(); return; }
      const chip = e.target.closest('[data-recent-refs]');
      if (!chip) return;
      const refs = chip.getAttribute('data-recent-refs');
      const entry = this.getRecents().find(r => r.refs === refs);
      this.recordVisit(refs, entry ? entry.label : refs);
      this.navigateToRefs(refs);
    });

    // Record visits made through the adopted Juz list (app.js still loads them)
    this.surahSection.querySelector('#qn-juz-pane').addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (!link) return;
      const idx = Array.prototype.indexOf.call(juzList.children, link);
      const juz = (idx >= 0) ? JUZ_DATA[idx] : null;
      if (juz) this.recordVisit(this.juzRangeString(juz), `${t('juz', this.language)} ${juz.number}`);
    });

    this.renderSurahList('');
    this.renderQuickExtras();
  }

  /** Show the active quick-nav pane and style the pill tabs */
  applyQnTab() {
    const active = 'bg-white text-gray-900 shadow font-medium';
    const idle = 'text-inherit opacity-70 hover:opacity-100';
    this.surahSection.querySelectorAll('.qn-tab').forEach(btn => {
      const on = btn.getAttribute('data-qn-tab') === this.qnTab;
      btn.className = 'qn-tab flex-1 px-3 py-1.5 text-sm rounded-md transition-colors ' + (on ? active : idle);
    });
    this.surahSection.querySelector('#qn-surah-pane').classList.toggle('hidden', this.qnTab !== 'surah');
    this.surahSection.querySelector('#qn-juz-pane').classList.toggle('hidden', this.qnTab !== 'juz');
    this.surahSection.querySelector('#qn-page-pane').classList.toggle('hidden', this.qnTab !== 'page');
  }

  /* ------------------------------------------------------------------ *
   * Recently-visited ranges (localStorage) + "continue where I left off"
   * ------------------------------------------------------------------ */

  getRecents() {
    try { return JSON.parse(localStorage.getItem('quickNavRecent') || '[]'); }
    catch (e) { return []; }
  }

  saveRecents(list) {
    try { localStorage.setItem('quickNavRecent', JSON.stringify(list.slice(0, 6))); }
    catch (e) { /* storage may be unavailable */ }
  }

  /** Push a range to the front of the recent list (deduped) and re-render. */
  recordVisit(refs, label) {
    if (!refs) return;
    const list = this.getRecents().filter(r => r.refs !== refs);
    list.unshift({ refs, label: label || refs });
    this.saveRecents(list);
    this.renderQuickExtras();
  }

  clearRecents() {
    this.saveRecents([]);
    this.renderQuickExtras();
  }

  /** Render the Recent chips and toggle the Continue button (uses newest). */
  renderQuickExtras() {
    if (!this.surahSection) return;
    const lang = this.language;
    const list = this.getRecents();

    const cont = this.surahSection.querySelector('#qn-continue');
    if (cont) {
      if (list.length) {
        cont.classList.remove('hidden');
        cont.setAttribute('data-refs', list[0].refs);
        const lbl = cont.querySelector('.qn-cont-label');
        if (lbl) lbl.textContent = list[0].label;
      } else {
        cont.classList.add('hidden');
        cont.setAttribute('data-refs', '');
      }
    }

    const rec = this.surahSection.querySelector('#qn-recent');
    if (!rec) return;
    if (!list.length) { rec.innerHTML = ''; return; }
    rec.innerHTML = `
      <div class="flex items-center justify-between mb-1">
        <span class="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500">${t('recent', lang)}</span>
        <button id="qn-recent-clear" class="text-xs text-gray-400 hover:text-red-500 transition-colors">${t('clear', lang)}</button>
      </div>
      <div class="flex flex-wrap gap-1">
        ${list.map(r => `
          <button data-recent-refs="${r.refs}" title="${r.refs}"
                  class="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300
                         hover:bg-primary hover:text-white dark:hover:bg-blue-600 transition-colors max-w-full truncate"
                  dir="auto">${r.label}</button>`).join('')}
      </div>
    `;
  }

  /* ------------------------------------------------------------------ *
   * Go-to-verse + random helpers
   * ------------------------------------------------------------------ */

  /**
   * Validate a "S:A" / "S:A-B" reference against SURAH_DATA.
   * @returns {{surah: object, refs: string}|null}
   */
  parseVerseRef(raw) {
    const m = (raw || '').trim().match(/^(\d{1,3})\s*:\s*(\d{1,3})(?:\s*-\s*(\d{1,3}))?$/);
    if (!m) return null;
    const surah = (typeof getSurahByNumber !== 'undefined') ? getSurahByNumber(parseInt(m[1])) : null;
    if (!surah) return null;
    const start = parseInt(m[2]);
    const end = m[3] ? parseInt(m[3]) : start;
    if (start < 1 || start > surah.ayahCount || end < start || end > surah.ayahCount) return null;
    return { surah, refs: start === end ? `${surah.number}:${start}` : `${surah.number}:${start}-${end}` };
  }

  goToVerse() {
    if (!this.gotoInput) return;
    const parsed = this.parseVerseRef(this.gotoInput.value);
    if (!parsed) {
      this.gotoInput.classList.add('ring-2', 'ring-red-500');
      this.gotoInput.setAttribute('title', t('invalid_reference', this.language));
      return;
    }
    const ayahPart = parsed.refs.split(':')[1];
    const label = `${parsed.surah.number}. ${getSurahName(parsed.surah.number, this.language)} · ${ayahPart}`;
    this.gotoInput.value = '';
    this.recordVisit(parsed.refs, label);
    this.navigateToRefs(parsed.refs);
  }

  randomSurah() {
    if (typeof SURAH_DATA === 'undefined' || !SURAH_DATA.length) return;
    const surah = SURAH_DATA[Math.floor(Math.random() * SURAH_DATA.length)];
    this.onSurahPicked(surah.number);
  }

  randomJuz() {
    if (typeof JUZ_DATA === 'undefined' || !JUZ_DATA.length) return;
    const juz = JUZ_DATA[Math.floor(Math.random() * JUZ_DATA.length)];
    const refs = this.juzRangeString(juz);
    this.recordVisit(refs, `${t('juz', this.language)} ${juz.number}`);
    this.navigateToRefs(refs);
  }

  /** Build a comma-joined range string spanning a whole Juz (mirrors app.loadJuz). */
  juzRangeString(juz) {
    if (juz.startSurah === juz.endSurah) {
      return `${juz.startSurah}:${juz.startAyah}-${juz.endAyah}`;
    }
    const parts = [`${juz.startSurah}:${juz.startAyah}-${getSurahByNumber(juz.startSurah).ayahCount}`];
    for (let s = juz.startSurah + 1; s < juz.endSurah; s++) {
      parts.push(`${s}:1-${getSurahByNumber(s).ayahCount}`);
    }
    parts.push(`${juz.endSurah}:1-${juz.endAyah}`);
    return parts.join(',');
  }

  renderSurahList(query) {
    if (!this.surahList || typeof SURAH_DATA === 'undefined') return;

    const lang = this.language;
    const q = (query || '').trim().toLowerCase();

    const matches = SURAH_DATA.filter(surah => {
      if (!q) return true;
      const localizedName = (getSurahName(surah.number, lang) || '').toLowerCase();
      return String(surah.number).includes(q) ||
             localizedName.includes(q) ||
             surah.arabicName.includes(q);
    });

    if (matches.length === 0) {
      this.surahList.innerHTML = `
        <p class="px-2 py-2 text-gray-500 dark:text-gray-400">${t('no_results', lang)}</p>
      `;
      return;
    }

    this.surahList.innerHTML = matches.map(surah => {
      const meccan = surah.revelationType === 'Meccan';
      const badge = `<span class="px-1.5 py-0.5 rounded text-[10px] font-medium ${meccan
        ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'
        : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'}">${t(meccan ? 'meccan' : 'medinan', lang)}</span>`;
      return `
      <a href="#" data-surah="${surah.number}"
         class="flex items-center justify-between gap-2 px-2 py-1 rounded
                text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400
                hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
        <span dir="auto" class="truncate">${surah.number}. ${getSurahName(surah.number, lang)}</span>
        <span class="flex items-center gap-1.5 shrink-0">
          ${badge}
          <span class="text-xs text-gray-400 dark:text-gray-500">${surah.ayahCount} ${t('verses', lang)}</span>
        </span>
      </a>
    `;
    }).join('');
  }

  refreshSurahPicker() {
    if (!this.surahSection) return;
    const lang = this.language;
    this.surahSection.querySelectorAll('.qn-tab').forEach(btn => {
      // Pill keys double as translation keys: 'surah' | 'juz' | 'page'
      btn.textContent = t(btn.getAttribute('data-qn-tab'), lang);
    });
    if (this.searchInput) this.searchInput.setAttribute('placeholder', t('search_surah', lang));
    const goBtn = this.surahSection.querySelector('#qn-page-go');
    if (goBtn) goBtn.textContent = t('go', lang);

    // Re-localize the enrichment controls
    if (this.gotoInput) this.gotoInput.setAttribute('placeholder', t('go_to_verse_hint', lang));
    const gotoGo = this.surahSection.querySelector('#qn-goto-go');
    if (gotoGo) gotoGo.textContent = t('go', lang);
    const contWord = this.surahSection.querySelector('.qn-cont-word');
    if (contWord) contWord.textContent = t('continue_reading', lang);
    const rsLabel = this.surahSection.querySelector('.qn-rs-label');
    if (rsLabel) rsLabel.textContent = t('surah', lang);
    const rjLabel = this.surahSection.querySelector('.qn-rj-label');
    if (rjLabel) rjLabel.textContent = t('juz', lang);
    this.renderQuickExtras();

    this.renderSurahList(this.searchInput ? this.searchInput.value : '');
  }

  onSurahPicked(surahNumber) {
    const surah = (typeof getSurahByNumber !== 'undefined') ? getSurahByNumber(surahNumber) : null;
    if (!surah) return;

    // Keep the header dropdown in sync
    const surahSelect = document.getElementById('surah-select');
    if (surahSelect) surahSelect.value = String(surah.number);

    const refs = `${surah.number}:1-${surah.ayahCount}`;
    this.recordVisit(refs, `${surah.number}. ${getSurahName(surah.number, this.language)}`);
    this.navigateToRefs(refs);
  }
}

// Initialize when DOM is ready
let appNavigation;
document.addEventListener('DOMContentLoaded', () => {
  appNavigation = new AppNavigation();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { AppNavigation };
}
