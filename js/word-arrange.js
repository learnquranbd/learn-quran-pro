/**
 * Word-Arrangement Memory Test.
 *
 * Shows a verse's word-by-word MEANINGS in order with the Arabic hidden, so you
 * can recall the wording from memory and self-check. Two modes:
 *   • Reveal  — meanings listed; each Arabic word is blurred, tap to reveal.
 *   • Arrange — the Arabic words are shuffled into a pool; tap them in order to
 *               match the meaning slots, then Check.
 *
 * Words come from QuranData.fetchRange (quran.com WBW: { arabic, meaning }).
 * Renders into #word-arrange-root (Memorize tab → "Arrange" mode).
 */

class WordArrange {
  constructor() {
    this.root = document.getElementById('word-arrange-root');
    if (!this.root) return;

    this.language = (typeof appSettings !== 'undefined' && appSettings)
      ? appSettings.get('language') : 'en';
    this.surah = 112;
    this.ayah = 1;
    this.mode = 'arrange';
    this.words = null;         // [{ arabic, meaning }]
    this.revealed = new Set(); // reveal-mode: indices shown
    this.placed = [];          // arrange-mode: pool indices placed into slots (in order)
    this.rendered = false;

    window.addEventListener('learnModuleSelected', (e) => {
      if (e.detail && e.detail.module === 'wordarrange') this.render();
    });
    window.addEventListener('settingChanged', (e) => {
      if (e.detail && e.detail.key === 'language') { this.language = e.detail.value; if (this.rendered) this.load(); }
    });

    this.root.addEventListener('click', (e) => this.onClick(e));
    this.root.addEventListener('change', (e) => {
      if (e.target.id === 'wa-surah') { this.surah = parseInt(e.target.value); this.ayah = 1; this.load(); }
      else if (e.target.id === 'wa-ayah') { this.ayah = parseInt(e.target.value); this.load(); }
    });
  }

  tt(key) { return t(key, this.language); }

  render() {
    this.rendered = true;
    const lang = this.language;
    const surah = getSurahByNumber(this.surah);
    const ayahCount = surah ? surah.ayahCount : 7;
    this.root.innerHTML = `
      <div class="w-full">
        <div class="text-center mb-5">
          <h3 class="text-xl font-bold mb-1">🔀 ${this.tt('wa_title')}</h3>
          <p class="text-gray-500 dark:text-gray-400 text-sm">${this.tt('wa_subtitle')}</p>
        </div>
        <div class="flex flex-wrap items-center justify-center gap-2 mb-4">
          <select id="wa-surah" class="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm">
            ${SURAH_DATA.map(s => `<option value="${s.number}" ${s.number === this.surah ? 'selected' : ''}>${this.esc(formatSurahOption(s, lang))}</option>`).join('')}
          </select>
          <div class="inline-flex items-stretch rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <button data-ayah-nav="prev" ${this.ayah <= 1 ? 'disabled' : ''} class="px-2 py-2 text-sm bg-white dark:bg-gray-800 disabled:opacity-40 hover:bg-gray-100 dark:hover:bg-gray-700" title="${this.tt('previous')}">‹</button>
            <select id="wa-ayah" class="px-3 py-2 text-sm bg-white dark:bg-gray-800 border-x border-gray-200 dark:border-gray-700">
              ${Array.from({ length: ayahCount }, (_, i) => i + 1).map(a => `<option value="${a}" ${a === this.ayah ? 'selected' : ''}>${this.tt('ayah')} ${a}</option>`).join('')}
            </select>
            <button data-ayah-nav="next" ${this.ayah >= ayahCount ? 'disabled' : ''} class="px-2 py-2 text-sm bg-white dark:bg-gray-800 disabled:opacity-40 hover:bg-gray-100 dark:hover:bg-gray-700" title="${this.tt('next')}">›</button>
          </div>
          <div class="inline-flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <button data-mode="arrange" class="wa-mode px-3 py-2 text-sm ${this.mode === 'arrange' ? 'bg-primary text-white' : 'bg-white dark:bg-gray-800'}">${this.tt('wa_mode_arrange')}</button>
            <button data-mode="reveal" class="wa-mode px-3 py-2 text-sm ${this.mode === 'reveal' ? 'bg-primary text-white' : 'bg-white dark:bg-gray-800'}">${this.tt('wa_mode_reveal')}</button>
          </div>
        </div>
        <div id="wa-board" class="bg-white dark:bg-gray-800 rounded-2xl shadow p-5 min-h-[180px]"></div>
      </div>`;
    this.load();
  }

  async load() {
    const board = this.root.querySelector('#wa-board');
    if (!board) return;
    board.innerHTML = `<div class="text-center py-10 text-gray-400">${this.tt('loading')}</div>`;
    try {
      const verses = await QuranData.fetchRange(this.surah, this.ayah, this.ayah, this.language);
      const v = verses && verses[0];
      this.words = (v && v.words ? v.words : []).filter(w => w.arabic && w.meaning);
      if (!this.words.length) { board.innerHTML = `<div class="text-center py-10 text-gray-400">${this.tt('wa_no_words')}</div>`; return; }
    } catch (e) {
      board.innerHTML = `<div class="text-center py-10 text-red-500">${this.tt('topics_load_error')}</div>`;
      return;
    }
    this.revealed = new Set();
    this.buildArrangePool();
    this.renderBoard();
  }

  buildArrangePool() {
    // Deterministic-ish shuffle (no Math.random dependency on load order): rotate by ayah+len.
    const idx = this.words.map((_, i) => i);
    const seed = (this.surah * 31 + this.ayah * 7 + this.words.length) % (this.words.length || 1);
    for (let r = 0; r < seed + 3; r++) {
      for (let i = idx.length - 1; i > 0; i--) {
        const j = (i * 7 + seed + r) % (i + 1);
        [idx[i], idx[j]] = [idx[j], idx[i]];
      }
    }
    this.pool = idx;         // shuffled order of original indices
    this.placed = [];        // original indices placed so far, in order
  }

  renderBoard() {
    const board = this.root.querySelector('#wa-board');
    if (this.mode === 'reveal') return this.renderReveal(board);
    this.renderArrange(board);
  }

  // ---- Reveal mode (words side by side, RTL) -----------------------------
  renderReveal(board) {
    const allShown = this.revealed.size === this.words.length;
    board.innerHTML = `
      <div class="flex justify-end mb-3">
        <button data-reveal-all class="text-xs px-3 py-1.5 rounded-lg bg-secondary text-white hover:bg-secondary/90">
          ${allShown ? this.tt('wa_hide_all') : this.tt('wa_reveal_all')}
        </button>
      </div>
      <div class="flex flex-wrap gap-x-2 gap-y-4 justify-center" dir="rtl">
        ${this.words.map((w, i) => {
          const shown = this.revealed.has(i);
          return `
            <div class="flex flex-col items-center max-w-[110px]">
              <button data-reveal="${i}" class="ayah-arabic text-2xl px-1 leading-loose transition ${shown ? '' : 'blur-sm hover:blur-none'}" title="${this.tt('wa_tap_reveal')}">${this.esc(w.arabic)}</button>
              <span class="text-[10px] text-gray-500 dark:text-gray-400 mt-1 text-center leading-tight" dir="auto">${this.esc(w.meaning)}</span>
            </div>`;
        }).join('')}
      </div>`;
  }

  // ---- Arrange mode (slots side by side, RTL) ----------------------------
  renderArrange(board) {
    const done = this.placed.length === this.words.length;
    const allCorrect = done && this.placed.every((p, i) => p === i);
    const info = (typeof getSurahByNumber === 'function') ? getSurahByNumber(this.surah) : null;
    const hasNext = info && this.ayah < info.ayahCount;
    board.innerHTML = `
      <p class="text-center text-sm text-gray-500 mb-4">${this.tt('wa_tap_hint')}</p>
      <div class="flex flex-wrap gap-2 justify-center mb-5" dir="rtl">
        ${this.words.map((w, i) => {
          const placedIdx = this.placed[i];
          const filled = placedIdx !== undefined;
          const correct = filled && placedIdx === i;
          return `
            <div class="flex flex-col items-center">
              <button ${filled ? `data-unplace="${i}"` : ''} class="min-w-[64px] h-12 px-2 flex items-center justify-center rounded-lg border-2 ${
                filled ? (correct ? 'border-green-400 bg-green-50 dark:bg-green-900/20' : 'border-red-400 bg-red-50 dark:bg-red-900/20')
                       : 'border-dashed border-gray-300 dark:border-gray-600'}">
                <span class="ayah-arabic text-2xl">${filled ? this.esc(this.words[placedIdx].arabic) : ''}</span>
              </button>
              <span class="text-[10px] text-gray-500 dark:text-gray-400 mt-1 max-w-[72px] text-center leading-tight" dir="auto">${this.esc(w.meaning)}</span>
            </div>`;
        }).join('')}
      </div>
      <div class="border-t border-gray-100 dark:border-gray-700 pt-3">
        <div class="flex flex-wrap gap-2 justify-center min-h-[44px]" dir="rtl">
          ${this.pool.map(origIdx => {
            const used = this.placed.includes(origIdx);
            return `<button data-place="${origIdx}" ${used ? 'disabled' : ''} class="ayah-arabic text-2xl px-3 py-1.5 rounded-lg border ${used ? 'opacity-30 border-gray-200 dark:border-gray-700' : 'border-primary/40 bg-primary/5 hover:bg-primary hover:text-white'}">${this.esc(this.words[origIdx].arabic)}</button>`;
          }).join('')}
        </div>
        <div class="flex flex-wrap items-center justify-center gap-2 mt-4">
          <button data-reset class="text-xs px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">${this.tt('wa_reset')}</button>
          ${done ? `<span class="text-sm font-semibold ${allCorrect ? 'text-green-600' : 'text-red-500'}">${allCorrect ? '✓ ' + this.tt('wa_correct') : '✗ ' + this.tt('wa_wrong')}</span>` : ''}
          ${allCorrect && hasNext ? `<button data-ayah-nav="next" class="text-xs px-4 py-1.5 rounded-lg bg-primary text-white hover:bg-primary/80">${this.tt('wa_next_ayah')} →</button>` : ''}
        </div>
      </div>`;
  }

  onClick(e) {
    const nav = e.target.closest('[data-ayah-nav]');
    if (nav && !nav.disabled) {
      const info = (typeof getSurahByNumber === 'function') ? getSurahByNumber(this.surah) : null;
      const dir = nav.getAttribute('data-ayah-nav');
      if (dir === 'next' && info && this.ayah < info.ayahCount) { this.ayah++; this.render(); }
      else if (dir === 'prev' && this.ayah > 1) { this.ayah--; this.render(); }
      return;
    }
    const mode = e.target.closest('[data-mode]');
    if (mode) { this.mode = mode.getAttribute('data-mode'); this.render(); return; }

    const revealAll = e.target.closest('[data-reveal-all]');
    if (revealAll) {
      if (this.revealed.size === this.words.length) this.revealed = new Set();
      else this.revealed = new Set(this.words.map((_, i) => i));
      this.renderBoard(); return;
    }
    const reveal = e.target.closest('[data-reveal]');
    if (reveal) { this.revealed.add(parseInt(reveal.getAttribute('data-reveal'))); this.renderBoard(); return; }

    const place = e.target.closest('[data-place]');
    if (place && !place.disabled) { this.placed.push(parseInt(place.getAttribute('data-place'))); this.renderBoard(); return; }
    const unplace = e.target.closest('[data-unplace]');
    if (unplace) { const slot = parseInt(unplace.getAttribute('data-unplace')); this.placed.splice(slot, 1); this.renderBoard(); return; }
    const reset = e.target.closest('[data-reset]');
    if (reset) { this.placed = []; this.renderBoard(); return; }
  }

  esc(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
}

let wordArrange;
document.addEventListener('DOMContentLoaded', () => { wordArrange = new WordArrange(); });
