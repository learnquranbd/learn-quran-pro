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

  tt(key) { return t(key, this.language); }

  /** Localized display name for a topic (falls back to the English key). */
  dn(topic) { return (this.names && this.names[topic]) || topic; }

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
      const letter = e.target.closest('[data-letter]');
      if (letter) { this.activeLetter = letter.getAttribute('data-letter'); this.render(); return; }
      const showmore = e.target.closest('[data-showmore]');
      if (showmore) { this.openModal(null); return; }
      const topic = e.target.closest('[data-topic]');
      if (topic) { this.openModal(topic.getAttribute('data-topic')); return; }
    });
  }

  // ---- main (compact) view ----------------------------------------------

  render() {
    this.container.innerHTML = `
      <div class="w-full">
        <div class="text-center mb-6">
          <h2 class="text-2xl font-bold mb-1">🗂️ ${this.tt('topics_title')}</h2>
          <p class="text-gray-500 dark:text-gray-400">${this.tt('topics_subtitle')}</p>
        </div>
        <div class="flex justify-center mb-4">
          <button data-showmore="1" class="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 shadow">
            🔍 ${this.tt('topics_browse_all')} (${this.list.length})
          </button>
        </div>
        <div id="topics-letters" class="flex flex-wrap gap-1 justify-center mb-5">
          ${this.letters.map(l => `
            <button data-letter="${l}" class="w-8 h-8 rounded-lg text-sm font-semibold transition-colors ${
              l === this.activeLetter
                ? 'bg-primary text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}">${l}</button>`).join('')}
        </div>
        ${this.previewHtml()}
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
    return `<button data-topic="${this.esc(item.topic)}" class="flex items-center gap-2 px-3 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary hover:shadow text-sm transition-all" dir="auto">
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
          <button id="topics-modal-back" class="hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700">←</button>
          <h3 id="topics-modal-title" class="flex-1 font-semibold text-gray-800 dark:text-gray-100 truncate" dir="auto"></h3>
          <button id="topics-modal-close" class="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700">✕</button>
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
      const mt = e.target.closest('[data-mtopic]');
      if (mt) { this.showModalTopic(mt.getAttribute('data-mtopic')); return; }
      const verse = e.target.closest('[data-verse]');
      if (verse) {
        const ref = verse.getAttribute('data-verse');
        const isOpenAll = verse.hasAttribute('data-openall');
        // Single verse chip → preview in-module modal; "Open all" → load into Reading (explicit).
        if (!isOpenAll && ref.indexOf(',') === -1 && typeof ayahModal !== 'undefined' && ayahModal) {
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
    this.modalBody.innerHTML = `
      <input id="topics-modal-search" type="text" value="${this.esc(this.modalQuery)}"
             placeholder="${this.esc(this.tt('topics_search_placeholder'))}" autofocus
             class="w-full mb-3 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary">
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
    if (!items.length) { box.innerHTML = `<p class="text-center py-8 text-gray-400">${this.tt('topics_no_results')}</p>`; return; }
    const countLine = total > items.length
      ? this.tt('topics_showing_first').replace('{shown}', items.length).replace('{total}', total)
      : `${items.length} ${this.tt('topics_count_label')}`;
    box.innerHTML = `
      <div class="text-xs text-gray-400 mb-2">${countLine}</div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
        ${items.map(i => `
          <button data-mtopic="${this.esc(i.topic)}" class="flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-left hover:bg-gray-100 dark:hover:bg-gray-700 border border-transparent hover:border-gray-200 dark:hover:border-gray-600" dir="auto">
            <span class="text-sm truncate">${this.esc(this.dn(i.topic))}</span>
            <span class="shrink-0 text-xs px-1.5 py-0.5 rounded-full bg-primary/10 text-primary dark:bg-blue-500/15 dark:text-blue-300">${i.verses.length}</span>
          </button>`).join('')}
      </div>`;
  }

  showModalTopic(name) {
    const item = this.list.find(i => i.topic === name);
    if (!item) return this.showModalList();
    this.modalBack.classList.remove('hidden');
    this.modalTitle.textContent = this.dn(name);
    const verses = item.verses;
    const cap = this.OPEN_ALL_CAP;
    // Small topic: a single "Open all" button. Large topic: one chip per
    // batch of OPEN_ALL_CAP refs ("1–30", "31–60", …) so verses 31+ are reachable too.
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
          <span class="text-xs text-gray-500">${this.tt('topics_open_batch').replace('{n}', cap)}</span>
          ${chunks.join('')}
        </div>`;
    }
    this.modalBody.innerHTML = `
      <div class="flex items-center justify-between gap-2 flex-wrap mb-3">
        <span class="text-sm text-gray-500">${verses.length} ${this.tt('topics_verses_label')}</span>
        ${openBar}
      </div>
      <div class="flex flex-wrap gap-1.5">
        ${verses.map(v => `<button data-verse="${v}" class="text-sm font-mono px-2.5 py-1.5 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-primary hover:text-white dark:hover:bg-primary transition-colors">${v}</button>`).join('')}
      </div>`;
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

let topicsBrowser;
document.addEventListener('DOMContentLoaded', () => { topicsBrowser = new TopicsBrowser(); });
