/**
 * Arabic Phrase / Word-block Repetition Search
 *
 * Flagship feature for advanced Quran students: "how many times does this
 * exact word or word-block repeat across the whole Quran?"
 *
 * Data source: data/quran-tokens.json — { "s:a": [normalizedWord, ...] } for
 * all 6236 verses / 77429 words, normalized with EXACTLY the same rule as
 * QuranData.normalizeWord (strip tashkeel/diacritics + unify alef آأإٱ → ا).
 * The scan is a pure in-memory string compare, so it is instant; only the
 * verse *display* text (with tashkeel) is lazily fetched from the quran.com API.
 */

class SearchView {
  constructor() {
    this.container = document.getElementById('search-container');
    if (!this.container) return;

    this.language = (typeof appSettings !== 'undefined' && appSettings)
      ? appSettings.get('language') : 'en';

    this.mode = 'phrase';          // 'phrase' | 'contains'
    this.query = '';
    this.tokens = null;            // { "s:a": [normalizedWord, ...] }
    this._tokensPromise = null;
    this.results = null;           // { count, verses: [ {key, surah, ayah, ranges} ] }
    this.shown = 0;                // how many result verses are currently rendered
    this.pageSize = 50;
    this.displayCache = new Map(); // "s:a" -> normalized verse object (with words)
    this.debounceTimer = null;
    this.searchToken = 0;          // guards against stale async renders

    this.renderShell();
    this.bindEvents();

    window.addEventListener('tabChanged', (e) => {
      if (e.detail.tabId === 'search') {
        const inp = this.container.querySelector('#search-input');
        if (inp) inp.focus();
      }
    });

    window.addEventListener('settingChanged', (e) => {
      if (e.detail.key !== 'language') return;
      this.language = e.detail.value;
      this.displayCache.clear();   // translations + word text follow the language
      this.renderShell();
      if (this.query) this.runSearch();
    });
  }

  /* ------------------------------------------------------------------ *
   * Static shell (input + mode toggle + results container)
   * ------------------------------------------------------------------ */

  renderShell() {
    const lang = this.language;
    const rtl = isRTL(lang);
    const modeBtn = (id, label) => `
      <button data-mode="${id}"
              class="search-mode-btn px-4 py-1.5 text-sm rounded-full border transition-colors ${this.mode === id
                ? 'bg-primary text-white border-primary dark:bg-blue-600 dark:border-blue-600'
                : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}">
        ${label}
      </button>`;

    this.container.innerHTML = `
      <div class="space-y-5" dir="${rtl ? 'rtl' : 'ltr'}">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-5 space-y-4">
          <div>
            <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">${t('search_title', lang)}</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">${t('search_hint', lang)}</p>
          </div>
          <div class="relative">
            <input type="text" id="search-input" dir="rtl"
                   value="${this._attr(this.query)}"
                   placeholder="${this._attr(t('search_placeholder', lang))}"
                   class="ayah-arabic w-full !text-3xl !mb-0 !pb-0 !border-b-0 px-4 py-3 rounded-xl
                          border-2 border-gray-300 dark:border-gray-600
                          bg-gray-50 dark:bg-gray-900/40 text-gray-900 dark:text-gray-100
                          focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-blue-500">
          </div>
          <div class="flex flex-wrap items-center gap-2">
            ${modeBtn('phrase', t('search_mode_phrase', lang))}
            ${modeBtn('contains', t('search_mode_contains', lang))}
          </div>
          <p class="text-xs text-gray-400 dark:text-gray-500" id="search-mode-hint">
            ${this.mode === 'phrase' ? t('search_phrase_hint', lang) : t('search_contains_hint', lang)}
          </p>
        </div>
        <div id="search-results"></div>
      </div>
    `;

    this.renderResults();
  }

  bindEvents() {
    // Delegated so it survives shell re-renders (language change)
    this.container.addEventListener('input', (e) => {
      if (e.target.id !== 'search-input') return;
      this.query = e.target.value;
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => this.runSearch(), 250);
    });

    this.container.addEventListener('click', (e) => {
      const modeBtn = e.target.closest('.search-mode-btn');
      if (modeBtn) {
        const m = modeBtn.getAttribute('data-mode');
        if (m !== this.mode) {
          this.mode = m;
          this.renderShell();
          if (this.query.trim()) this.runSearch();
        }
        return;
      }

      const more = e.target.closest('#search-show-more');
      if (more) {
        this.shown += this.pageSize;
        this.renderResults();
        return;
      }

      const goto = e.target.closest('[data-goto]');
      if (goto) {
        window.location.hash = goto.getAttribute('data-goto');
        if (typeof tabSystem !== 'undefined' && tabSystem) tabSystem.switchTab('reading');
      }
    });
  }

  /* ------------------------------------------------------------------ *
   * Token data (lazy, cached once)
   * ------------------------------------------------------------------ */

  loadTokens() {
    if (this.tokens) return Promise.resolve(this.tokens);
    if (!this._tokensPromise) {
      this._tokensPromise = fetch('data/quran-tokens.json')
        .then(r => { if (!r.ok) throw new Error('tokens not found'); return r.json(); })
        .then(json => { this.tokens = json; return json; })
        .catch(err => { this._tokensPromise = null; throw err; });
    }
    return this._tokensPromise;
  }

  /* ------------------------------------------------------------------ *
   * Search
   * ------------------------------------------------------------------ */

  async runSearch() {
    const lang = this.language;
    const raw = (this.query || '').trim();
    const resultsEl = this.container.querySelector('#search-results');
    if (!resultsEl) return;

    if (!raw) {
      this.results = null;
      resultsEl.innerHTML = this._infoBox(t('search_empty', lang));
      return;
    }

    const token = ++this.searchToken;
    resultsEl.innerHTML = this._infoBox(`<span class="inline-flex items-center gap-2">
      <span class="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full"></span>
      ${t('search_loading', lang)}</span>`);

    let tokens;
    try {
      tokens = await this.loadTokens();
    } catch (err) {
      if (token !== this.searchToken) return;
      resultsEl.innerHTML = this._infoBox(t('search_data_error', lang));
      return;
    }
    if (token !== this.searchToken) return; // superseded by a newer keystroke

    this.results = (this.mode === 'phrase')
      ? this.scanPhrase(tokens, raw)
      : this.scanContains(tokens, raw);

    this.shown = this.pageSize;
    this.renderResults();
  }

  /**
   * EXACT PHRASE: normalize the query word-by-word into a token array Q, then
   * find every CONTIGUOUS run V[i..i+Q.length-1] that deep-equals Q.
   */
  scanPhrase(tokens, raw) {
    const Q = raw.split(/\s+/)
      .map(w => QuranData.normalizeWord(w))
      .filter(Boolean);
    if (Q.length === 0) return { count: 0, verses: [] };

    const verses = [];
    let count = 0;
    const qLen = Q.length;
    const q0 = Q[0];

    for (const key in tokens) {
      const V = tokens[key];
      const last = V.length - qLen;
      let ranges = null;
      for (let i = 0; i <= last; i++) {
        if (V[i] !== q0) continue;
        let ok = true;
        for (let j = 1; j < qLen; j++) {
          if (V[i + j] !== Q[j]) { ok = false; break; }
        }
        if (!ok) continue;
        (ranges || (ranges = [])).push({ start: i, len: qLen });
        count++;
      }
      if (ranges) verses.push(this._verseEntry(key, ranges));
    }

    verses.sort(this._verseCompare);
    return { count, verses };
  }

  /**
   * CONTAINS WORD: find every word whose normalized form CONTAINS the
   * normalized query as a substring. Query is treated as a single token
   * (first word if the user typed several).
   */
  scanContains(tokens, raw) {
    const q = QuranData.normalizeWord(raw.split(/\s+/)[0] || '');
    if (!q) return { count: 0, verses: [] };

    const verses = [];
    let count = 0;

    for (const key in tokens) {
      const V = tokens[key];
      let ranges = null;
      for (let i = 0; i < V.length; i++) {
        if (V[i].indexOf(q) !== -1) {
          (ranges || (ranges = [])).push({ start: i, len: 1 });
          count++;
        }
      }
      if (ranges) verses.push(this._verseEntry(key, ranges));
    }

    verses.sort(this._verseCompare);
    return { count, verses };
  }

  _verseEntry(key, ranges) {
    const [surah, ayah] = key.split(':').map(Number);
    return { key, surah, ayah, ranges };
  }

  _verseCompare(a, b) {
    return a.surah - b.surah || a.ayah - b.ayah;
  }

  /* ------------------------------------------------------------------ *
   * Results rendering
   * ------------------------------------------------------------------ */

  renderResults() {
    const resultsEl = this.container.querySelector('#search-results');
    if (!resultsEl) return;
    const lang = this.language;

    if (!this.results) {
      resultsEl.innerHTML = this._infoBox(t('search_empty', lang));
      return;
    }

    const { count, verses } = this.results;
    if (count === 0) {
      resultsEl.innerHTML = this._infoBox(t('search_no_results', lang));
      return;
    }

    const headlineKey = this.mode === 'phrase' ? 'search_phrase_count' : 'search_contains_count';
    const headline = this._fill(t(headlineKey, lang), {
      count: count.toLocaleString(),
      verses: verses.length.toLocaleString(),
      query: this._esc(this.query.trim())
    });

    const slice = verses.slice(0, this.shown);
    const cards = slice.map(v => this._verseCardShell(v, lang)).join('');
    const moreCount = verses.length - slice.length;
    const moreBtn = moreCount > 0 ? `
      <div class="text-center pt-2">
        <button id="search-show-more"
                class="px-5 py-2 text-sm rounded-full border border-gray-300 dark:border-gray-600
                       text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          ${t('search_show_more', lang)} (${moreCount.toLocaleString()})
        </button>
      </div>` : '';

    resultsEl.innerHTML = `
      <div class="mb-4 p-4 rounded-lg bg-primary/10 dark:bg-blue-900/30 border border-primary/20 dark:border-blue-800">
        <p class="text-base font-semibold text-primary dark:text-blue-200" dir="auto">${headline}</p>
      </div>
      <div class="space-y-3">${cards}</div>
      ${moreBtn}
    `;

    // Lazily fetch + fill the display text (with tashkeel) for each shown verse
    slice.forEach(v => this.fillVerse(v));
  }

  /** A result card with a skeleton Arabic line, filled asynchronously. */
  _verseCardShell(v, lang) {
    const surahName = (typeof getSurahName === 'function') ? getSurahName(v.surah, lang) : '';
    const times = v.ranges.length;
    const badge = times > 1
      ? `<span class="text-xs px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300">${this._fill(t('search_times', lang), { n: times })}</span>`
      : '';
    return `
      <div data-goto="${v.key}" data-verse-card="${v.key}"
           class="ayah-card cursor-pointer hover:ring-2 hover:ring-primary/40 dark:hover:ring-blue-500/40 transition">
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <span class="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 dark:bg-blue-900/40 text-primary dark:text-blue-300">${v.key}</span>
          <span class="text-sm text-gray-600 dark:text-gray-300" dir="auto">${this._esc(surahName)}</span>
          ${badge}
          <span class="ms-auto text-xs text-gray-400 dark:text-gray-500">${t('search_open_verse', lang)} →</span>
        </div>
        <div class="ayah-arabic !mb-2 !pb-2" dir="rtl" data-arabic>
          <span class="text-gray-300 dark:text-gray-600 text-base">${t('loading', lang)}…</span>
        </div>
        <div class="text-sm text-gray-600 dark:text-gray-300" dir="auto" data-translation></div>
      </div>
    `;
  }

  async fillVerse(v) {
    let verse = this.displayCache.get(v.key);
    if (!verse) {
      try {
        const arr = await QuranData.fetchRange(v.surah, v.ayah, v.ayah, this.language);
        verse = (arr && arr[0]) || null;
        if (verse) this.displayCache.set(v.key, verse);
      } catch (err) { verse = null; }
    }

    const card = this.container.querySelector(`[data-verse-card="${v.key}"]`);
    if (!card) return; // scrolled out / re-rendered
    const arabicEl = card.querySelector('[data-arabic]');
    const transEl = card.querySelector('[data-translation]');
    if (!verse) {
      if (arabicEl) arabicEl.textContent = t('search_verse_unavailable', this.language);
      return;
    }

    if (arabicEl) arabicEl.innerHTML = this.highlightArabic(verse, v.ranges);
    if (transEl) transEl.textContent = verse.translation || '';
  }

  /** Build the verse Arabic with the matched word-block(s) highlighted (amber). */
  highlightArabic(verse, ranges) {
    const words = verse.words || [];
    if (!words.length) return this._esc(verse.arabic || '');

    const hl = new Set();
    ranges.forEach(r => {
      for (let k = 0; k < r.len; k++) hl.add(r.start + k);
    });

    const medallion = `<span class="text-primary dark:text-blue-400 select-none mx-1">۝${this._arabicDigits(verse.ayah)}</span>`;
    return words.map((w, idx) => {
      const text = this._esc(w.arabic || '');
      return hl.has(idx)
        ? `<span class="bg-amber-200 dark:bg-amber-500/40 rounded px-1">${text}</span>`
        : `<span>${text}</span>`;
    }).join(' ') + medallion;
  }

  /* ------------------------------------------------------------------ *
   * Small helpers
   * ------------------------------------------------------------------ */

  _infoBox(html) {
    return `<div class="text-center py-12 text-gray-500 dark:text-gray-400">${html}</div>`;
  }

  _fill(str, obj) {
    return String(str).replace(/\{(\w+)\}/g, (m, k) => (k in obj ? obj[k] : m));
  }

  _esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  _attr(s) {
    return this._esc(s).replace(/"/g, '&quot;');
  }

  _arabicDigits(n) {
    return String(n).replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
  }
}

// Initialize when DOM is ready
let searchView;
document.addEventListener('DOMContentLoaded', () => {
  searchView = new SearchView();
  window.searchView = searchView;
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SearchView };
}
