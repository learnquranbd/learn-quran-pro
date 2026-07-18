/**
 * Topics Browser — an A–Z topical index of the Quran (~1,857 topics),
 * sourced from QuranWBW's public quran-topics dataset and bundled locally at
 * data/quran-topics.json as { "Topic Name": ["surah:ayah", ...], ... }.
 *
 * Renders into #topics-container (tab "topics"). The page stays compact: a
 * letter bar + a short preview of topics. Tapping a topic — or "Show more" —
 * opens a quick modal to browse/search and load a topic's verses into Reading.
 */

class TopicsBrowser {
  constructor() {
    this.container = document.getElementById('topics-container');
    if (!this.container) return;

    this.language = (typeof appSettings !== 'undefined' && appSettings)
      ? appSettings.get('language') : 'en';
    this.data = null;          // { topic: [refs] }
    this.list = [];            // [{ topic, verses }]
    this.byLetter = {};        // { 'A': [items] }
    this.letters = [];
    this.activeLetter = 'A';
    this.query = '';
    this.loaded = false;
    this.PREVIEW = 24;         // topics shown inline before "Show more"
    this.OPEN_ALL_CAP = 30;    // max verses loaded at once via "Open all"
    this.overlay = null;
    this.modalQuery = '';
    this.names = null;         // { englishTopic: localizedName } for the current language
    this._namesLang = null;
    this.collections = (typeof TOPIC_COLLECTIONS !== 'undefined') ? TOPIC_COLLECTIONS : [];
    this.FAV_KEY = 'topics_favs_v1';
    this.RECENT_KEY = 'topics_recent_v1';
    this.SORT_KEY = 'topics_sort_v1';
    this.RECENT_MAX = 12;
    this.sort = this.loadSort();          // 'az' | 'count'
    this.favs = this.loadStore(this.FAV_KEY);       // [topic keys]
    this.recent = this.loadStore(this.RECENT_KEY);  // [topic keys], most-recent first

    window.addEventListener('tabChanged', (e) => {
      if (e.detail.tabId === 'topics') this.ensureLoaded();
    });
    window.addEventListener('settingChanged', (e) => {
      if (e.detail.key === 'language') {
        this.language = e.detail.value;
        this.ensureNames();
        if (this.loaded) this.render();
      }
    });
  }

  /**
   * Translate a key. New keys not yet present in js/translations.js resolve
   * against a small local bilingual fallback so the UI never shows raw keys.
   */
  tt(key) {
    const s = t(key, this.language);
    if (s !== key) return s;
    const fb = TopicsBrowser.L[key];
    if (fb) return fb[this.language] || fb.en || key;
    return s;
  }

  /** Localized display name for a topic (falls back to the English key). */
  dn(topic) { return (this.names && this.names[topic]) || topic; }

  /** Localized name for a curated collection. */
  cn(c) { return (c.names && (c.names[this.language] || c.names.en)) || c.id; }

  // ---- localStorage (favourites + recently viewed) ----------------------

  loadStore(key) {
    try { const v = JSON.parse(localStorage.getItem(key)); return Array.isArray(v) ? v : []; }
    catch (e) { return []; }
  }
  saveStore(key, arr) {
    try { localStorage.setItem(key, JSON.stringify(arr)); } catch (e) { /* quota / private mode */ }
  }
  isFav(topic) { return this.favs.indexOf(topic) !== -1; }
  toggleFav(topic) {
    const i = this.favs.indexOf(topic);
    if (i === -1) this.favs.unshift(topic); else this.favs.splice(i, 1);
    this.saveStore(this.FAV_KEY, this.favs);
    this.render();
  }
  loadSort() {
    try { return localStorage.getItem(this.SORT_KEY) === 'count' ? 'count' : 'az'; }
    catch (e) { return 'az'; }
  }
  setSort(mode) {
    this.sort = mode === 'count' ? 'count' : 'az';
    try { localStorage.setItem(this.SORT_KEY, this.sort); } catch (e) { /* ignore */ }
    this.renderModalList();
  }
  /** Order a topic list by the active sort: localized name, or verse count desc. */
  sortItems(items) {
    const arr = items.slice();
    if (this.sort === 'count') {
      arr.sort((a, b) => (b.verses.length - a.verses.length) ||
        this.dn(a.topic).localeCompare(this.dn(b.topic), this.language));
    }
    return arr;
  }

  pushRecent(topic) {
    this.recent = [topic, ...this.recent.filter(t => t !== topic)].slice(0, this.RECENT_MAX);
    this.saveStore(this.RECENT_KEY, this.recent);
  }

  /** Total number of verses covered by a collection's refs (ranges expanded). */
  countRefs(refs) {
    let n = 0;
    for (const r of refs) {
      const a = r.split(':')[1] || '';
      if (a.indexOf('-') !== -1) { const [lo, hi] = a.split('-').map(Number); n += (hi - lo + 1); }
      else n += 1;
    }
    return n;
  }

  /** Load the topic-name translations for the current language (once). */
  async ensureNames() {
    if (this.language === 'en') { this.names = null; this._namesLang = 'en'; this.rebuildLetters(); return; }
    if (this._namesLang === this.language) return;
    const lang = this.language;
    this._namesLang = lang;
    try {
      const res = await fetch(`data/topic-names/${lang}.json`);
      if (!res.ok) throw new Error('no names');
      const names = await res.json();
      if (this.language !== lang) return;   // stale response: a newer language switch won
      this.names = names;
      this.rebuildLetters();
      // Re-render with localized names once they arrive
      if (this.loaded) this.render();
      if (this.overlay && !this.overlay.classList.contains('hidden')) this.renderModalList();
    } catch (e) {
      if (this.language !== lang) return;   // stale failure: don't clobber the newer language
      this.names = null;                    // fall back to English display
      this._namesLang = null;               // so a later revisit retries the fetch
      this.rebuildLetters();
      if (this.loaded) this.render();
    }
  }

  async ensureLoaded() {
    if (this.loaded) { this.render(); return; }
    this.container.innerHTML = `<div class="text-center py-16 text-gray-400">${this.tt('loading')}</div>`;
    try {
      const res = await fetch('data/quran-topics.json');
      if (!res.ok) throw new Error('topics fetch failed');
      this.data = await res.json();
    } catch (e) {
      this.container.innerHTML = `<div class="text-center py-16 text-red-500">${this.tt('topics_load_error')}</div>`;
      return;
    }
    this.list = Object.keys(this.data)
      .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
      .map(topic => ({ topic, verses: this.data[topic] }));
    this.rebuildLetters();
    this.loaded = true;
    this.bindOnce();
    this.ensureNames();
    this.render();
  }

  /**
   * Group topics by the first letter of their DISPLAYED (localized) name so
   * the letter bar matches what the user actually sees (e.g. Bengali letters
   * for Bengali names, not the hidden English keys).
   */
  rebuildLetters() {
    if (!this.list.length) return;
    this.byLetter = {};
    for (const item of this.list) {
      const c = (this.dn(item.topic)[0] || '#').toLocaleUpperCase(this.language);
      const key = /\p{L}/u.test(c) ? c : '#';
      (this.byLetter[key] = this.byLetter[key] || []).push(item);
    }
    for (const key of Object.keys(this.byLetter)) {
      this.byLetter[key].sort((a, b) => this.dn(a.topic).localeCompare(this.dn(b.topic), this.language));
    }
    this.letters = Object.keys(this.byLetter).sort((a, b) => a.localeCompare(b, this.language));
    if (!this.byLetter[this.activeLetter]) this.activeLetter = this.letters[0];
  }

  bindOnce() {
    this.container.addEventListener('click', (e) => {
      // Favourite star lives inside a topic chip — handle it first and stop.
      const fav = e.target.closest('[data-fav]');
      if (fav) { e.stopPropagation(); this.toggleFav(fav.getAttribute('data-fav')); return; }
      const random = e.target.closest('[data-random]');
      if (random) { this.openRandom(); return; }
      const coll = e.target.closest('[data-collection]');
      if (coll) { this.openCollection(coll.getAttribute('data-collection')); return; }
      const letter = e.target.closest('[data-letter]');
      if (letter) { this.activeLetter = letter.getAttribute('data-letter'); this.render(); return; }
      const showmore = e.target.closest('[data-showmore]');
      if (showmore) { this.openModal(null); return; }
      const topic = e.target.closest('[data-topic]');
      if (topic) { this.openModal(topic.getAttribute('data-topic')); return; }
    });
  }

  openRandom() {
    if (!this.list.length) return;
    const item = this.list[Math.floor(Math.random() * this.list.length)];
    this.openModal(item.topic);
  }

  // ---- main (compact) view ----------------------------------------------

  render() {
    this.container.innerHTML = `
      <div class="w-full">
        <div class="text-center mb-6">
          <p class="text-gray-500 dark:text-gray-400">${this.tt('topics_subtitle')}</p>
        </div>
        <div class="flex flex-wrap justify-center gap-2 mb-5">
          <button data-showmore="1" class="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 shadow">
            🔍 ${this.tt('topics_browse_all')} (${this.list.length})
          </button>
          <button data-random="1" class="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-medium text-primary dark:text-blue-300 hover:border-primary shadow-sm">
            🎲 ${this.tt('topics_random')}
          </button>
        </div>
        ${this.collectionsHtml()}
        ${this.favouritesHtml()}
        ${this.recentHtml()}
        <div class="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">${this.tt('topics_az_index')}</div>
        <div id="topics-letters" class="flex flex-wrap gap-1 justify-center mb-5">
          ${this.letters.map(l => `
            <button data-letter="${l}" class="w-9 h-9 rounded-lg text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:focus-visible:ring-blue-400 ${
              l === this.activeLetter
                ? 'bg-primary text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}">${l}</button>`).join('')}
        </div>
        ${this.previewHtml()}
      </div>`;
  }

  /** Curated, verse-verified thematic collections (from TOPIC_COLLECTIONS). */
  collectionsHtml() {
    if (!this.collections.length) return '';
    return `
      <div class="mb-5">
        <div class="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">${this.tt('topics_collections')}</div>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
          ${this.collections.map(c => `
            <button data-collection="${this.esc(c.id)}" class="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary hover:shadow text-start transition-all" dir="auto">
              <span class="text-xl shrink-0">${c.emoji || '•'}</span>
              <span class="min-w-0">
                <span class="block text-sm font-medium truncate">${this.esc(this.cn(c))}</span>
                <span class="block text-xs text-gray-400">${this.countRefs(c.refs)} ${this.tt('topics_verses_label')}</span>
              </span>
            </button>`).join('')}
        </div>
      </div>`;
  }

  favouritesHtml() {
    const items = this.favs.map(k => this.list.find(i => i.topic === k)).filter(Boolean);
    if (!items.length) return '';
    return `
      <div class="mb-5">
        <div class="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">⭐ ${this.tt('topics_favourites')} (${items.length})</div>
        <div class="flex flex-wrap gap-2">${items.map(i => this.chip(i)).join('')}</div>
      </div>`;
  }

  recentHtml() {
    const items = this.recent.map(k => this.list.find(i => i.topic === k)).filter(Boolean);
    if (!items.length) return '';
    return `
      <div class="mb-5">
        <div class="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">🕘 ${this.tt('topics_recent')}</div>
        <div class="flex flex-wrap gap-2">${items.map(i => this.chip(i)).join('')}</div>
      </div>`;
  }

  previewHtml() {
    const items = this.byLetter[this.activeLetter] || [];
    const shown = items.slice(0, this.PREVIEW);
    const more = items.length - shown.length;
    return `
      <div class="text-xs text-gray-400 mb-2">${items.length} ${this.tt('topics_count_label')}</div>
      <div class="flex flex-wrap gap-2">
        ${shown.map(i => this.chip(i)).join('')}
      </div>
      ${more > 0 ? `
        <div class="text-center mt-4">
          <button data-showmore="1" class="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm font-medium text-primary dark:text-blue-300 hover:bg-gray-100 dark:hover:bg-gray-700">
            ${this.tt('topics_show_more')} (${more}) →
          </button>
        </div>` : ''}`;
  }

  chip(item) {
    const fav = this.isFav(item.topic);
    return `<button data-topic="${this.esc(item.topic)}" class="flex items-center gap-2 px-3 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary hover:shadow text-sm transition-all" dir="auto">
      <span data-fav="${this.esc(item.topic)}" role="button" aria-label="${this.esc(this.tt(fav ? 'topics_unfav' : 'topics_fav'))}" title="${this.esc(this.tt(fav ? 'topics_unfav' : 'topics_fav'))}" class="shrink-0 p-1 -m-1 text-base leading-none cursor-pointer ${fav ? 'text-amber-400' : 'text-gray-300 dark:text-gray-600 hover:text-amber-400'}">${fav ? '★' : '☆'}</span>
      <span class="font-medium truncate max-w-[180px]">${this.esc(this.dn(item.topic))}</span>
      <span class="shrink-0 text-xs px-1.5 py-0.5 rounded-full bg-primary/10 text-primary dark:bg-blue-500/15 dark:text-blue-300">${item.verses.length}</span>
    </button>`;
  }

  // ---- quick modal (browse / load) --------------------------------------

  ensureModal() {
    if (this.overlay) return;
    this.overlay = document.createElement('div');
    this.overlay.id = 'topics-modal';
    this.overlay.className = 'fixed inset-0 z-[70] hidden items-center justify-center bg-black/50 p-4';
    this.overlay.innerHTML = `
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden">
        <div class="flex items-center gap-2 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <button id="topics-modal-back" aria-label="${this.esc(this.tt('back'))}" title="${this.esc(this.tt('back'))}" class="hidden min-w-[2.5rem] min-h-[2.5rem] p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:focus-visible:ring-blue-400">←</button>
          <h3 id="topics-modal-title" class="flex-1 min-w-0 font-semibold text-gray-800 dark:text-gray-100 truncate" dir="auto"></h3>
          <button id="topics-modal-close" aria-label="${this.esc(this.tt('close'))}" title="${this.esc(this.tt('close'))}" class="min-w-[2.5rem] min-h-[2.5rem] p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:focus-visible:ring-blue-400">✕</button>
        </div>
        <div id="topics-modal-body" class="flex-1 overflow-y-auto p-4"></div>
      </div>`;
    document.body.appendChild(this.overlay);
    if (window.escClose) window.escClose(this.overlay, () => this.closeModal());
    this.modalTitle = this.overlay.querySelector('#topics-modal-title');
    this.modalBody = this.overlay.querySelector('#topics-modal-body');
    this.modalBack = this.overlay.querySelector('#topics-modal-back');
    this.overlay.querySelector('#topics-modal-close').addEventListener('click', () => this.closeModal());
    this.modalBack.addEventListener('click', () => this.showModalList());
    this.overlay.addEventListener('click', (e) => { if (e.target === this.overlay) this.closeModal(); });
    this.modalBody.addEventListener('click', (e) => {
      const sort = e.target.closest('[data-sort]');
      if (sort) { this.setSort(sort.getAttribute('data-sort')); return; }
      const cr = e.target.closest('[data-copyrefs]');
      if (cr) { this.copyRefs(cr.getAttribute('data-copyrefs'), cr); return; }
      const mfav = e.target.closest('[data-mfav]');
      if (mfav) { this.toggleFav(mfav.getAttribute('data-mfav')); this.showModalTopic(mfav.getAttribute('data-mfav'), true); return; }
      const mt = e.target.closest('[data-mtopic]');
      if (mt) { this.showModalTopic(mt.getAttribute('data-mtopic')); return; }
      const mc = e.target.closest('[data-mcoll]');
      if (mc) { this.showModalCollection(mc.getAttribute('data-mcoll')); return; }
      const verse = e.target.closest('[data-verse]');
      if (verse) {
        const ref = verse.getAttribute('data-verse');
        const isOpenAll = verse.hasAttribute('data-openall');
        // Single ayah chip → preview in-module modal; ranges/"Open all"/lists → load into Reading.
        if (!isOpenAll && ref.indexOf(',') === -1 && ref.indexOf('-') === -1 && typeof ayahModal !== 'undefined' && ayahModal) {
          ayahModal.open(ref);
        } else {
          this.gotoVerses(ref); this.closeModal();
        }
        return;
      }
    });
    this.modalBody.addEventListener('input', (e) => {
      if (e.target.id === 'topics-modal-search') { this.modalQuery = e.target.value.trim(); this.renderModalList(); }
    });
  }

  openModal(topic) {
    this.ensureModal();
    this.overlay.classList.remove('hidden');
    this.overlay.classList.add('flex');
    if (topic) this.showModalTopic(topic);
    else this.showModalList();
  }

  closeModal() {
    if (!this.overlay) return;
    this.overlay.classList.add('hidden');
    this.overlay.classList.remove('flex');
  }

  showModalList() {
    this.modalBack.classList.add('hidden');
    this.modalTitle.textContent = this.tt('topics_title');
    const collRow = this.collections.length ? `
      <div class="flex flex-wrap gap-1.5 mb-3">
        ${this.collections.map(c => `<button data-mcoll="${this.esc(c.id)}" class="text-xs px-2.5 py-1.5 rounded-lg bg-primary/10 text-primary dark:bg-blue-500/15 dark:text-blue-300 hover:bg-primary hover:text-white transition-colors" dir="auto">${c.emoji || ''} ${this.esc(this.cn(c))}</button>`).join('')}
      </div>` : '';
    this.modalBody.innerHTML = `
      <input id="topics-modal-search" type="text" value="${this.esc(this.modalQuery)}"
             placeholder="${this.esc(this.tt('topics_search_placeholder'))}" autofocus
             class="w-full mb-3 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary">
      ${collRow}
      <div id="topics-modal-list"></div>`;
    this.renderModalList();
    const inp = this.modalBody.querySelector('#topics-modal-search');
    if (inp) inp.focus();
  }

  renderModalList() {
    const box = this.modalBody.querySelector('#topics-modal-list');
    if (!box) return;
    let items, total;
    if (this.modalQuery) {
      const q = this.modalQuery.toLowerCase();
      // Match the English key AND the localized name so search works in any language.
      const matches = this.list.filter(i => i.topic.toLowerCase().includes(q) || this.dn(i.topic).toLowerCase().includes(q));
      total = matches.length;
      items = matches.slice(0, 200);
    } else {
      items = this.byLetter[this.activeLetter] || [];
      total = items.length;
    }
    items = this.sortItems(items);
    if (!items.length) { box.innerHTML = `<p class="text-center py-8 text-gray-400">${this.tt('topics_no_results')}</p>`; return; }
    const countLine = total > items.length
      ? this.tt('topics_showing_first').replace('{shown}', items.length).replace('{total}', total)
      : `${items.length} ${this.tt('topics_count_label')}`;
    const sortBtn = (mode, label) =>
      `<button data-sort="${mode}" class="px-2 py-0.5 rounded-md ${this.sort === mode
        ? 'bg-primary text-white'
        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}">${label}</button>`;
    box.innerHTML = `
      <div class="flex items-center justify-between gap-2 mb-2">
        <span class="text-xs text-gray-400">${countLine}</span>
        <span class="flex items-center gap-1 text-xs">
          <span class="text-gray-400">${this.tt('sort_by')}</span>
          ${sortBtn('az', this.tt('topics_sort_az'))}
          ${sortBtn('count', this.tt('topics_sort_count'))}
        </span>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
        ${items.map(i => `
          <button data-mtopic="${this.esc(i.topic)}" class="flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-start hover:bg-gray-100 dark:hover:bg-gray-700 border border-transparent hover:border-gray-200 dark:hover:border-gray-600" dir="auto">
            <span class="text-sm truncate min-w-0">${this.esc(this.dn(i.topic))}</span>
            <span class="shrink-0 text-xs px-1.5 py-0.5 rounded-full bg-primary/10 text-primary dark:bg-blue-500/15 dark:text-blue-300">${i.verses.length}</span>
          </button>`).join('')}
      </div>`;
  }

  showModalTopic(name, skipRecent) {
    const item = this.list.find(i => i.topic === name);
    if (!item) return this.showModalList();
    if (!skipRecent) this.pushRecent(name);
    this.modalBack.classList.remove('hidden');
    this.modalTitle.textContent = this.dn(name);
    const fav = this.isFav(name);
    const favBtn = `<button data-mfav="${this.esc(name)}" class="shrink-0 text-lg leading-none px-2 py-1 -my-1 ${fav ? 'text-amber-400' : 'text-gray-300 dark:text-gray-600 hover:text-amber-400'}" aria-label="${this.esc(this.tt(fav ? 'topics_unfav' : 'topics_fav'))}" title="${this.esc(this.tt(fav ? 'topics_unfav' : 'topics_fav'))}">${fav ? '★' : '☆'}</button>`;
    this.modalBody.innerHTML = this.verseSectionHtml(item.verses, favBtn);
  }

  openCollection(id) {
    this.ensureModal();
    this.overlay.classList.remove('hidden');
    this.overlay.classList.add('flex');
    this.showModalCollection(id);
  }

  showModalCollection(id) {
    const c = this.collections.find(x => x.id === id);
    if (!c) return this.showModalList();
    this.modalBack.classList.remove('hidden');
    this.modalTitle.textContent = (c.emoji ? c.emoji + ' ' : '') + this.cn(c);
    this.modalBody.innerHTML = this.verseSectionHtml(c.refs, '');
  }

  /**
   * Shared verse view (count/open bar + tappable ref chips) used by both
   * A–Z topics and curated collections. `headerExtra` slots a fav toggle.
   */
  verseSectionHtml(verses, headerExtra) {
    const cap = this.OPEN_ALL_CAP;
    // Small set: a single "Open all" button. Large set: one chip per batch of
    // OPEN_ALL_CAP refs ("1–30", "31–60", …) so verses 31+ are reachable too.
    let openBar;
    if (verses.length <= cap) {
      openBar = `<button data-verse="${verses.join(',')}" data-openall="1"
                class="text-xs px-3 py-1.5 rounded-lg bg-secondary text-white hover:bg-secondary/90">
          ${this.tt('topics_open_all')}
        </button>`;
    } else {
      const chunks = [];
      for (let i = 0; i < verses.length; i += cap) {
        const slice = verses.slice(i, i + cap);
        chunks.push(`<button data-verse="${slice.join(',')}" data-openall="1" class="text-xs font-mono px-2.5 py-1.5 rounded-lg bg-secondary text-white hover:bg-secondary/90">${i + 1}–${i + slice.length}</button>`);
      }
      openBar = `<div class="flex flex-wrap items-center gap-1.5">
          <span class="text-xs text-gray-500 dark:text-gray-400">${this.tt('topics_open_batch').replace('{n}', cap)}</span>
          ${chunks.join('')}
        </div>`;
    }
    return `
      <div class="flex items-center justify-between gap-2 flex-wrap mb-3">
        <span class="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">${headerExtra || ''}<span>${verses.length} ${this.tt('topics_verses_label')}</span></span>
        <span class="flex items-center gap-1.5">
          <button data-copyrefs="${this.esc(verses.join(','))}" title="${this.esc(this.tt('copy'))}" aria-label="${this.esc(this.tt('copy'))}"
                  class="text-xs px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">📋</button>
          ${openBar}
        </span>
      </div>
      <div class="flex flex-wrap gap-1.5">
        ${verses.map(v => `<button data-verse="${this.esc(v)}" class="text-sm font-mono px-2.5 py-1.5 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-primary hover:text-white dark:hover:bg-primary transition-colors">${this.esc(v)}</button>`).join('')}
      </div>`;
  }

  /** Copy a topic/collection's verse references to the clipboard. */
  copyRefs(refStr, btn) {
    const text = String(refStr || '').split(',').map(s => s.trim()).filter(Boolean).join(', ');
    if (!text || !navigator.clipboard || !navigator.clipboard.writeText) return;
    navigator.clipboard.writeText(text).then(() => {
      if (!btn) return;
      const old = btn.textContent;
      btn.textContent = this.tt('copied');
      setTimeout(() => { btn.textContent = old; }, 1200);
    }).catch(() => {});
  }

  /** Load one or more "surah:ayah" refs into the Reading tab via deep-link hash. */
  gotoVerses(refStr) {
    const clean = refStr.split(',').map(s => s.trim()).filter(Boolean).join(', ');
    if (!clean) return;
    if (typeof tabSystem !== 'undefined' && tabSystem) tabSystem.switchTab('reading');
    if (decodeURIComponent(window.location.hash.slice(1)) === clean) {
      // Hash unchanged: no hashchange event will fire, load manually
      if (typeof quranApp !== 'undefined' && quranApp) {
        quranApp._writingHash = null;   // don't let the ignore-own-write guard swallow this reload
        quranApp.handleHashChange();
      }
    } else {
      window.location.hash = clean;
    }
  }

  esc(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
}

/**
 * Local bilingual fallback for keys not yet in js/translations.js (that file is
 * not edited from here — see the report). Once the keys are added there, t()
 * wins and this map is bypassed. en + bn cover the app's primary languages.
 */
TopicsBrowser.L = {
  topics_random:      { en: 'Random', bn: 'এলোমেলো', zh: '随机', ja: 'ランダム'},
  topics_collections: { en: 'Collections', bn: 'সংকলন', zh: '合集', ja: 'コレクション'},
  topics_favourites:  { en: 'Favourites', bn: 'পছন্দের তালিকা', zh: '收藏', ja: 'お気に入り'},
  topics_recent:      { en: 'Recently viewed', bn: 'সম্প্রতি দেখা', zh: '最近浏览', ja: '最近見た'},
  topics_az_index:    { en: 'A–Z index', bn: 'বর্ণানুক্রমিক তালিকা', zh: '字母索引', ja: 'アルファベット順索引'},
  topics_fav:         { en: 'Add to favourites', bn: 'পছন্দে যোগ করুন', zh: '加入收藏', ja: 'お気に入りに追加'},
  topics_unfav:       { en: 'Remove from favourites', bn: 'পছন্দ থেকে সরান', zh: '从收藏中移除', ja: 'お気に入りから削除'},
  topics_sort_az:     { en: 'A–Z', bn: 'ক-হ', zh: 'A–Z', ja: 'A–Z'},
  topics_sort_count:  { en: 'Verses', bn: 'আয়াত', zh: '节文', ja: '節'}
};

let topicsBrowser;
document.addEventListener('DOMContentLoaded', () => { topicsBrowser = new TopicsBrowser(); });
