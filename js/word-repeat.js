/**
 * Word-Repetition analysis (سূরার শব্দ পুনরাবৃত্তি — হুবুহু | মৌলিক).
 *
 * For a chosen surah (whole) or a single ayah, list how often each word repeats:
 *   • Exact (হুবুহু)  — identical normalized wording, from data/quran-tokens.json.
 *   • Root  (মৌলিক)  — shared triliteral root, from data/roots.json (root → refs).
 * Tap a word to see every verse it occurs in; tap a verse to open it in Reading.
 *
 * Renders into #wordrepeat-container (tab "wordrepeat").
 */

class WordRepeat {
  constructor() {
    this.container = document.getElementById('wordrepeat-container');
    if (!this.container) return;

    this.language = (typeof appSettings !== 'undefined' && appSettings)
      ? appSettings.get('language') : 'en';
    this.tokens = null;   // { "s:a": [normalized tokens] }
    this.roots = null;    // { root: ["s:a:w", ...] }
    this.surah = 1;
    this.scope = 'surah'; // 'surah' | 'ayah'
    this.ayah = 1;
    this.type = 'exact';  // 'exact' | 'root'
    this.onlyRepeated = false;   // show ALL words by default (repeated + singles)
    this.openTerm = null;
    this.loaded = false;
    this.ayahModal = null;
    this._ayahAudio = null;

    window.addEventListener('tabChanged', (e) => { if (e.detail.tabId === 'wordrepeat') this.ensureLoaded(); });
    window.addEventListener('settingChanged', (e) => {
      if (e.detail.key === 'language') { this.language = e.detail.value; if (this.loaded) this.render(); }
    });
  }

  tt(key) { return t(key, this.language); }

  async ensureLoaded() {
    if (this.loaded) { this.render(); return; }
    this.container.innerHTML = `<div class="text-center py-16 text-gray-400">${this.tt('loading')}</div>`;
    try {
      const [tk, rt] = await Promise.all([
        fetch('data/quran-tokens.json').then(r => r.json()),
        fetch('data/roots.json').then(r => r.json())
      ]);
      this.tokens = tk; this.roots = rt;
    } catch (e) {
      this.container.innerHTML = `<div class="text-center py-16 text-red-500">${this.tt('topics_load_error')}</div>`;
      return;
    }
    this.loaded = true;
    this.bindOnce();
    this.render();
  }

  bindOnce() {
    if (this._bound) return;
    this._bound = true;
    this.container.addEventListener('click', (e) => {
      const t2 = e.target.closest('[data-typ]');
      if (t2) { this.type = t2.getAttribute('data-typ'); this.openTerm = null; this.render(); return; }
      const sc = e.target.closest('[data-scope]');
      if (sc) { this.scope = sc.getAttribute('data-scope'); this.openTerm = null; this.render(); return; }
      const rep = e.target.closest('[data-onlyrep]');
      if (rep) { this.onlyRepeated = !this.onlyRepeated; this.openTerm = null; this.renderResults(); return; }
      const term = e.target.closest('[data-term]');
      if (term) { const k = term.getAttribute('data-term'); this.openTerm = this.openTerm === k ? null : k; this.renderResults(); return; }
      const verse = e.target.closest('[data-verse]');
      if (verse) {
        const ref = verse.getAttribute('data-verse'), w = verse.getAttribute('data-term-word');
        if (typeof ayahModal !== 'undefined' && ayahModal) ayahModal.open(ref, { word: w });
        else this.openAyah(ref, w);
        return;
      }
    });
    this.container.addEventListener('change', (e) => {
      if (e.target.id === 'wr-surah') { this.surah = parseInt(e.target.value); this.ayah = 1; this.openTerm = null; this.render(); }
      else if (e.target.id === 'wr-ayah') { this.ayah = parseInt(e.target.value); this.openTerm = null; this.renderResults(); }
    });
  }

  render() {
    const lang = this.language;
    const surah = getSurahByNumber(this.surah);
    const ayahCount = surah ? surah.ayahCount : 7;
    this.container.innerHTML = `
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-5">
          <h2 class="text-2xl font-bold mb-1">🔁 ${this.tt('wr_title')}</h2>
          <p class="text-gray-500 dark:text-gray-400 text-sm">${this.tt('wr_subtitle')}</p>
        </div>
        <div class="flex flex-wrap items-center justify-center gap-2 mb-3">
          <select id="wr-surah" class="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm">
            ${SURAH_DATA.map(s => `<option value="${s.number}" ${s.number === this.surah ? 'selected' : ''}>${this.esc(formatSurahOption(s, lang))}</option>`).join('')}
          </select>
          <div class="inline-flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <button data-scope="surah" class="px-3 py-2 text-sm ${this.scope === 'surah' ? 'bg-primary text-white' : 'bg-white dark:bg-gray-800'}">${this.tt('wr_whole_surah')}</button>
            <button data-scope="ayah" class="px-3 py-2 text-sm ${this.scope === 'ayah' ? 'bg-primary text-white' : 'bg-white dark:bg-gray-800'}">${this.tt('wr_single_ayah')}</button>
          </div>
          ${this.scope === 'ayah' ? `
            <select id="wr-ayah" class="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm">
              ${Array.from({ length: ayahCount }, (_, i) => i + 1).map(a => `<option value="${a}" ${a === this.ayah ? 'selected' : ''}>${this.tt('ayah')} ${a}</option>`).join('')}
            </select>` : ''}
        </div>
        <div class="flex flex-wrap items-center justify-center gap-2 mb-4">
          <div class="inline-flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <button data-typ="exact" class="px-4 py-2 text-sm ${this.type === 'exact' ? 'bg-secondary text-white' : 'bg-white dark:bg-gray-800'}">${this.tt('wr_exact')}</button>
            <button data-typ="root" class="px-4 py-2 text-sm ${this.type === 'root' ? 'bg-secondary text-white' : 'bg-white dark:bg-gray-800'}">${this.tt('wr_root')}</button>
          </div>
          <label class="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300 cursor-pointer">
            <button data-onlyrep class="w-9 h-5 rounded-full relative transition-colors ${this.onlyRepeated ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}">
              <span class="absolute top-0.5 ${this.onlyRepeated ? 'left-4' : 'left-0.5'} w-4 h-4 rounded-full bg-white transition-all"></span>
            </button>
            ${this.tt('wr_only_repeated')}
          </label>
        </div>
        <div id="wr-results"></div>
      </div>`;
    this.renderResults();
  }

  /** Compute [{ term, count, refs:Set("s:a") }] for the current scope + type. */
  compute() {
    const s = this.surah;
    const map = new Map();   // term -> { count, refs:Set }
    const add = (term, ref) => {
      let e = map.get(term); if (!e) { e = { count: 0, refs: new Set() }; map.set(term, e); }
      e.count++; e.refs.add(ref);
    };
    if (this.type === 'exact') {
      const keys = this.scope === 'ayah' ? [`${s}:${this.ayah}`] : Object.keys(this.tokens).filter(k => k.startsWith(s + ':'));
      for (const key of keys) {
        for (const tok of (this.tokens[key] || [])) add(tok, key);
      }
    } else {
      const prefix = this.scope === 'ayah' ? `${s}:${this.ayah}:` : `${s}:`;
      for (const root in this.roots) {
        for (const occ of this.roots[root]) {
          if (occ.startsWith(prefix)) {
            const ref = occ.split(':').slice(0, 2).join(':');
            add(root, ref);
          }
        }
      }
    }
    return [...map.entries()]
      .map(([term, e]) => ({ term, count: e.count, refs: [...e.refs].sort(this.refCmp) }))
      .sort((a, b) => b.count - a.count || a.term.localeCompare(b.term));
  }

  refCmp(a, b) { const [s1, a1] = a.split(':').map(Number), [s2, a2] = b.split(':').map(Number); return s1 - s2 || a1 - a2; }

  renderResults() {
    const box = this.container.querySelector('#wr-results');
    if (!box) return;
    const full = this.compute();
    const total = full.reduce((n, x) => n + x.count, 0);
    const uniqueCount = full.length;
    const repeatedCount = full.filter(x => x.count >= 2).length;
    const list = this.onlyRepeated ? full.filter(x => x.count >= 2) : full;
    if (!list.length) { box.innerHTML = `<p class="text-center py-10 text-gray-400">${this.tt('wr_none')}</p>`; return; }

    box.innerHTML = `
      <div class="flex flex-wrap gap-4 justify-center text-sm text-gray-500 dark:text-gray-400 mb-3">
        <span>${this.tt('wr_total_words')}: <b class="text-gray-800 dark:text-gray-100">${total}</b></span>
        <span>${this.tt('wr_unique')}: <b class="text-gray-800 dark:text-gray-100">${uniqueCount}</b></span>
        <span>${this.tt('wr_repeated')}: <b class="text-gray-800 dark:text-gray-100">${repeatedCount}</b></span>
      </div>
      <p class="text-center text-xs text-gray-400 mb-3">${this.tt('wr_tap_hint')}</p>
      <div class="flex flex-wrap gap-2 justify-center">
        ${list.map(x => this.termChip(x)).join('')}
      </div>`;
  }

  termChip(x) {
    const open = this.openTerm === x.term;
    return `
      <div class="${open ? 'w-full' : ''}">
        <button data-term="${this.esc(x.term)}" class="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white dark:bg-gray-800 border ${open ? 'border-primary' : 'border-gray-200 dark:border-gray-700'} hover:border-primary transition-colors">
          <span class="ayah-arabic text-2xl" dir="rtl">${this.esc(x.term)}</span>
          <span class="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary dark:bg-blue-500/15 dark:text-blue-300">×${x.count}</span>
        </button>
        ${open ? `
          <div class="mt-2 mb-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40 flex flex-wrap gap-1.5">
            ${x.refs.map(r => `<button data-verse="${r}" data-term-word="${this.esc(x.term)}" class="text-xs font-mono px-2 py-1 rounded-md bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:bg-primary hover:text-white">${r}</button>`).join('')}
          </div>` : ''}
      </div>`;
  }

  // In-module ayah preview — stays inside Word Repetition (no tab switch).
  ensureAyahModal() {
    if (this.ayahModal) return;
    this.ayahModal = document.createElement('div');
    this.ayahModal.id = 'wr-ayah-modal';
    this.ayahModal.className = 'fixed inset-0 bg-black/60 z-[70] items-center justify-center p-4 hidden';
    this.ayahModal.innerHTML = `
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-xl max-h-[85vh] flex flex-col">
        <div class="flex items-center gap-2 px-5 py-3 border-b border-gray-200 dark:border-gray-700">
          <h3 id="wr-ayah-title" class="flex-1 font-bold text-gray-800 dark:text-gray-100"></h3>
          <button id="wr-ayah-close" class="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700">✕</button>
        </div>
        <div id="wr-ayah-body" class="flex-1 overflow-y-auto p-5"></div>
      </div>`;
    document.body.appendChild(this.ayahModal);
    if (window.escClose) window.escClose(this.ayahModal, () => { if (this._ayahAudio) this._ayahAudio.pause(); this.ayahModal.classList.add('hidden'); this.ayahModal.classList.remove('flex'); });
    this.ayahModal.addEventListener('click', (e) => {
      if (e.target === this.ayahModal || e.target.closest('#wr-ayah-close')) {
        if (this._ayahAudio) this._ayahAudio.pause();
        this.ayahModal.classList.add('hidden'); this.ayahModal.classList.remove('flex'); return;
      }
      const wp = e.target.closest('[data-word-audio]');
      if (wp) { if (!this._ayahAudio) this._ayahAudio = new Audio(); this._ayahAudio.src = wp.getAttribute('data-word-audio'); this._ayahAudio.play().catch(() => {}); return; }
      const fp = e.target.closest('[data-ayah-audio]');
      if (fp) { if (!this._ayahAudio) this._ayahAudio = new Audio(); this._ayahAudio.src = fp.getAttribute('data-ayah-audio'); this._ayahAudio.play().catch(() => {}); }
    });
  }

  async openAyah(ref, term) {
    const lang = this.language;
    this.ensureAyahModal();
    this.ayahModal.classList.remove('hidden'); this.ayahModal.classList.add('flex');
    this.ayahModal.querySelector('#wr-ayah-title').textContent = ref;
    const body = this.ayahModal.querySelector('#wr-ayah-body');
    body.innerHTML = `<p class="text-center text-gray-400 py-8">${this.tt('loading')}</p>`;
    try {
      const [s, a] = ref.split(':').map(Number);
      const v = (await QuranData.fetchRange(s, a, a, lang))[0];
      if (!v) throw new Error('nf');
      this.ayahModal.querySelector('#wr-ayah-title').textContent = `${v.surahName} ${v.key}`;
      const norm = x => (QuranData.normalizeWord ? QuranData.normalizeWord(x || '') : String(x || ''));
      // For root matches term is an Arabic root; for exact it's a normalized token.
      const wbw = (v.words || []).map(w => {
        const hit = term && (norm(w.arabic) === norm(term) || (w.arabic || '').indexOf(term) >= 0);
        const canPlay = !!w.audio;
        return `<button ${canPlay ? `data-word-audio="${this.esc(w.audio)}"` : ''}
                  class="inline-flex flex-col items-center px-2 py-1 my-1 rounded-lg ${canPlay ? 'hover:bg-blue-50 dark:hover:bg-gray-700 cursor-pointer' : ''} ${hit ? 'ring-2 ring-amber-400 bg-amber-50 dark:bg-amber-500/10' : ''}">
                  <span class="ayah-arabic !text-2xl block">${w.arabic}</span>
                  <span class="text-[11px] text-gray-500 dark:text-gray-400 block" dir="auto">${w.meaning || ''}</span>
                </button>`;
      }).join('');
      const pad = n => String(n).padStart(3, '0');
      body.innerHTML = `
        <div class="ayah-arabic !text-3xl !leading-loose text-center mb-3" dir="rtl">${v.arabic}</div>
        <div class="flex flex-wrap justify-center gap-x-1 mb-3" dir="rtl">${wbw}</div>
        <p class="text-center text-gray-600 dark:text-gray-300 mb-4" dir="auto">${v.translation || ''}</p>
        <div class="flex justify-center">
          <button data-ayah-audio="https://everyayah.com/data/Alafasy_128kbps/${pad(s)}${pad(a)}.mp3"
                  class="px-4 py-2 rounded-lg bg-primary text-white text-sm hover:bg-primary/80">🔊 ${this.tt('play_full_ayah')}</button>
        </div>`;
    } catch (e) {
      body.innerHTML = `<p class="text-center text-gray-500 dark:text-gray-400 py-8">${this.tt('topics_load_error')}</p>`;
    }
  }

  esc(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
}

let wordRepeat;
document.addEventListener('DOMContentLoaded', () => { wordRepeat = new WordRepeat(); });
