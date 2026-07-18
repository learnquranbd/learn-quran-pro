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
    this.difficulty = 'normal'; // 'normal' | 'hard' (hard salts the pool with decoy words)
    this.words = null;         // [{ arabic, meaning }]
    this.decoys = [];          // hard mode: real Quranic words from OTHER ayahs mixed into the pool
    this.revealed = new Set(); // reveal-mode: indices shown
    this.placed = [];          // arrange-mode: pool indices placed into slots (in order)
    this.rendered = false;

    // Enrichment state: move counter, timer, streak, per-ayah best score, audio.
    this.moves = 0;            // place + unplace + hint actions this attempt
    this.hintsUsed = 0;
    this.startTime = null;     // set on first activity; drives the live timer
    this._timerInt = null;
    this._newBest = false;     // last solve beat the stored best for this ayah
    this.streak = this.loadStreak();
    this._audio = null;

    // Local i18n fallback (translations.js is read-only). tt() prefers the
    // global dictionary and falls back to this map for the enrichment keys.
    this.i18n = {
      en: { wa_moves: 'Moves', wa_time: 'Time', wa_streak: 'Streak', wa_best: 'Best',
            wa_hint: 'Hint', wa_new_best: 'New best!', wa_hear_word: 'Hear word' },
      bn: { wa_moves: 'চাল', wa_time: 'সময়', wa_streak: 'ধারা', wa_best: 'সেরা',
            wa_hint: 'ইঙ্গিত', wa_new_best: 'নতুন সেরা!', wa_hear_word: 'শব্দ শুনুন' }
    };

    window.addEventListener('learnModuleSelected', (e) => {
      if (e.detail && e.detail.module === 'wordarrange') this.render();
    });
    window.addEventListener('settingChanged', (e) => {
      if (e.detail && e.detail.key === 'language') { this.language = e.detail.value; if (this.rendered) this.render(); }
    });

    this.root.addEventListener('click', (e) => this.onClick(e));
    this.root.addEventListener('change', (e) => {
      if (e.target.id === 'wa-surah') { this.surah = parseInt(e.target.value); this.ayah = 1; this.render(); }
      else if (e.target.id === 'wa-ayah') { this.ayah = parseInt(e.target.value); this.load(); }
    });
  }

  tt(key) {
    const g = t(key, this.language);
    if (g !== key) return g;                 // present in the global dictionary
    const loc = (this.i18n[this.language] || {})[key] || this.i18n.en[key];
    return loc || key;                       // enrichment key → local fallback
  }

  // ---- Enrichment helpers: persistence, timer, audio ---------------------
  loadStreak() { try { return parseInt(localStorage.getItem('wa_streak'), 10) || 0; } catch (e) { return 0; } }
  saveStreak() { try { localStorage.setItem('wa_streak', String(this.streak)); } catch (e) {} }
  loadBest() { try { return JSON.parse(localStorage.getItem('wa_best') || '{}') || {}; } catch (e) { return {}; } }
  saveBest(o) { try { localStorage.setItem('wa_best', JSON.stringify(o)); } catch (e) {} }
  bestFor(surah, ayah) { return this.loadBest()[`${surah}:${ayah}`] || null; }

  getAudio() { if (!this._audio) this._audio = new Audio(); return this._audio; }
  playAudio(src) { if (!src) return; try { const a = this.getAudio(); a.src = src; a.play().catch(() => {}); } catch (e) {} }

  startTimer() {
    if (!this.startTime) this.startTime = Date.now();
    if (this._timerInt) return;
    this._timerInt = setInterval(() => {
      const el = this.root && this.root.querySelector('#wa-timer');
      if (el) el.textContent = this.fmtTime(this.elapsed());
    }, 500);
  }
  stopTimer() { if (this._timerInt) { clearInterval(this._timerInt); this._timerInt = null; } }
  elapsed() { return this.startTime ? Math.floor((Date.now() - this.startTime) / 1000) : 0; }
  fmtTime(s) { const m = Math.floor(s / 60), ss = s % 60; return `${m}:${String(ss).padStart(2, '0')}`; }

  /** Briefly flash the pool word that belongs in the next empty slot. */
  showHint() {
    if (!this.root || !this.words) return;
    const slot = this.placed.length;
    if (slot >= this.words.length) return;
    const target = this.words[slot] && this.words[slot].arabic;
    if (!target) return;
    this.hintsUsed++;
    this.moves++;                 // hints count against the move score
    this.startTimer();
    const btn = [...this.root.querySelectorAll('[data-place]')].find(b => {
      const w = !b.disabled && this.wordAt(parseInt(b.getAttribute('data-place'), 10));
      return w && w.arabic === target;
    });
    if (btn) {
      btn.classList.add('ring-4', 'ring-amber-400', 'relative', 'z-10');
      setTimeout(() => btn.classList.remove('ring-4', 'ring-amber-400', 'z-10'), 1200);
    }
    const mv = this.root.querySelector('#wa-moves');
    if (mv) mv.textContent = String(this.moves);
  }

  /** When all slots are filled, freeze the timer and update streak + best. */
  evaluateIfDone() {
    if (!this.words || this.placed.length !== this.words.length) return;
    if (this._scored) { this.stopTimer(); return; }   // score a completed grid once
    const correct = this.placed.every((p, i) => this.wordAt(p) && this.wordAt(p).arabic === this.words[i].arabic);
    this.stopTimer();
    this._scored = true;
    this._newBest = false;
    if (correct) { this.streak++; this.saveStreak(); this.recordBest(); }
    else { this.streak = 0; this.saveStreak(); }
  }

  recordBest() {
    const key = `${this.surah}:${this.ayah}`;
    const best = this.loadBest();
    const cur = best[key];
    const score = { moves: this.moves, time: this.elapsed(), hints: this.hintsUsed };
    if (!cur || score.moves < cur.moves || (score.moves === cur.moves && score.time < cur.time)) {
      best[key] = score; this.saveBest(best); this._newBest = true;
    }
  }

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
            <button data-ayah-nav="prev" ${this.ayah <= 1 ? 'disabled' : ''} class="min-w-[2.5rem] px-2 py-2 text-sm bg-white dark:bg-gray-800 disabled:opacity-40 hover:bg-gray-100 dark:hover:bg-gray-700" title="${this.tt('previous')}" aria-label="${this.tt('previous')}">‹</button>
            <select id="wa-ayah" class="px-3 py-2 text-sm bg-white dark:bg-gray-800 border-x border-gray-200 dark:border-gray-700">
              ${Array.from({ length: ayahCount }, (_, i) => i + 1).map(a => `<option value="${a}" ${a === this.ayah ? 'selected' : ''}>${this.tt('ayah')} ${a}</option>`).join('')}
            </select>
            <button data-ayah-nav="next" ${this.ayah >= ayahCount ? 'disabled' : ''} class="min-w-[2.5rem] px-2 py-2 text-sm bg-white dark:bg-gray-800 disabled:opacity-40 hover:bg-gray-100 dark:hover:bg-gray-700" title="${this.tt('next')}" aria-label="${this.tt('next')}">›</button>
          </div>
          <div class="inline-flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <button data-mode="arrange" class="wa-mode px-3 py-2 text-sm ${this.mode === 'arrange' ? 'bg-primary text-white' : 'bg-white dark:bg-gray-800'}">${this.tt('wa_mode_arrange')}</button>
            <button data-mode="reveal" class="wa-mode px-3 py-2 text-sm ${this.mode === 'reveal' ? 'bg-primary text-white' : 'bg-white dark:bg-gray-800'}">${this.tt('wa_mode_reveal')}</button>
          </div>
          ${this.mode === 'arrange' ? `
          <div class="inline-flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700" title="${this.tt('wa_hard_hint')}">
            <button data-diff="normal" class="px-3 py-2 text-sm ${this.difficulty === 'normal' ? 'bg-secondary text-white' : 'bg-white dark:bg-gray-800'}">${this.tt('wa_diff_normal')}</button>
            <button data-diff="hard" class="px-3 py-2 text-sm ${this.difficulty === 'hard' ? 'bg-secondary text-white' : 'bg-white dark:bg-gray-800'}">🌶️ ${this.tt('wa_diff_hard')}</button>
          </div>` : ''}
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
    this.decoys = [];
    // Fresh attempt: reset the move counter, timer and best-flag.
    this.moves = 0;
    this.hintsUsed = 0;
    this.startTime = null;
    this._newBest = false;
    this._scored = false;
    this.stopTimer();
    if (this.mode === 'arrange' && this.difficulty === 'hard') {
      try { await this.loadDecoys(); } catch (e) { /* hard mode degrades to normal pool */ }
    }
    this.buildArrangePool();
    this.renderBoard();
  }

  /** Pool index → word: real verse words first, then decoys (hard mode). */
  wordAt(i) {
    return i < this.words.length ? this.words[i] : this.decoys[i - this.words.length];
  }

  /**
   * Hard mode: pull real Quranic words from NEIGHBORING ayahs of the same surah
   * (falling back to the next surah for single-ayah ends) to salt the pool with
   * plausible decoys. Decoys never duplicate a word of the current verse.
   */
  async loadDecoys() {
    const info = getSurahByNumber(this.surah);
    const count = Math.min(5, Math.max(3, Math.ceil(this.words.length / 2)));
    const inVerse = new Set(this.words.map(w => w.arabic));
    const seen = new Set();
    const decoys = [];
    const harvest = (verses) => {
      for (const v of (verses || [])) {
        if (v.ayah === this.ayah && v.surah === this.surah) continue;
        for (const w of (v.words || [])) {
          if (decoys.length >= count) return;
          if (!w.arabic || !w.meaning) continue;
          if (inVerse.has(w.arabic) || seen.has(w.arabic)) continue;
          seen.add(w.arabic);
          decoys.push({ arabic: w.arabic, meaning: w.meaning });
        }
      }
    };
    const from = Math.max(1, this.ayah - 2);
    const to = Math.min(info ? info.ayahCount : this.ayah, this.ayah + 2);
    harvest(await QuranData.fetchRange(this.surah, from, to, this.language));
    if (decoys.length < count && this.surah < 114) {
      // Short surah: top up from the start of the next surah
      harvest(await QuranData.fetchRange(this.surah + 1, 1, 3, this.language));
    }
    this.decoys = decoys;
  }

  buildArrangePool() {
    // Deterministic-ish shuffle (no Math.random dependency on load order): rotate by ayah+len.
    // Hard mode appends decoy indices (>= words.length) so extra words salt the pool.
    const idx = this.words.map((_, i) => i)
      .concat(this.decoys.map((_, j) => this.words.length + j));
    const seed = (this.surah * 31 + this.ayah * 7 + idx.length) % (idx.length || 1);
    for (let r = 0; r < seed + 3; r++) {
      for (let i = idx.length - 1; i > 0; i--) {
        const j = (i * 7 + seed + r) % (i + 1);
        [idx[i], idx[j]] = [idx[j], idx[i]];
      }
    }
    // Guard: if the shuffle landed on the identity permutation, rotate so the
    // pool is never presented already in verse order.
    if (idx.length > 1 && idx.every((v, i) => v === i)) {
      const half = Math.floor(idx.length / 2);
      idx.push(...idx.splice(0, half));
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
              <button data-reveal="${i}" class="ayah-arabic !text-2xl !leading-loose !mb-0 !pb-0 !border-b-0 px-1 transition ${shown ? '' : 'blur-sm hover:blur-none'}" title="${this.tt('wa_tap_reveal')}">${this.esc(w.arabic)}</button>
              <span class="flex items-center gap-1 mt-1">
                <span class="text-[0.625rem] text-gray-500 dark:text-gray-400 text-center leading-tight break-words" dir="auto">${this.esc(w.meaning)}</span>
                ${w.audio ? `<button data-wa-audio="${this.esc(w.audio)}" title="${this.esc(this.tt('wa_hear_word'))}" aria-label="${this.esc(this.tt('wa_hear_word'))}" class="text-xs text-gray-400 hover:text-primary focus:outline-none">🔊</button>` : ''}
              </span>
            </div>`;
        }).join('')}
      </div>`;
  }

  // ---- Arrange mode (slots side by side, RTL) ----------------------------
  renderArrange(board) {
    const done = this.placed.length === this.words.length;
    const allCorrect = done && this.placed.every((p, i) => this.wordAt(p) && this.wordAt(p).arabic === this.words[i].arabic);
    const info = (typeof getSurahByNumber === 'function') ? getSurahByNumber(this.surah) : null;
    const hasNext = info && this.ayah < info.ayahCount;
    const best = this.bestFor(this.surah, this.ayah);
    board.innerHTML = `
      <div class="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 mb-3 text-xs text-gray-500 dark:text-gray-400">
        <span>${this.tt('wa_moves')}: <b id="wa-moves" class="text-gray-700 dark:text-gray-200">${this.moves}</b></span>
        <span>${this.tt('wa_time')}: <b id="wa-timer" class="text-gray-700 dark:text-gray-200 font-mono">${this.fmtTime(this.elapsed())}</b></span>
        <span>${this.tt('wa_streak')}: <b class="text-gray-700 dark:text-gray-200">🔥 ${this.streak}</b></span>
        ${best ? `<span>${this.tt('wa_best')}: <b class="text-gray-700 dark:text-gray-200">${best.moves} · ${this.fmtTime(best.time)}</b></span>` : ''}
      </div>
      <p class="text-center text-sm text-gray-500 dark:text-gray-400 mb-4">${this.tt('wa_tap_hint')}</p>
      <div class="flex flex-wrap gap-2 justify-center mb-5" dir="rtl">
        ${this.words.map((w, i) => {
          const placedIdx = this.placed[i];
          const filled = placedIdx !== undefined;
          const correct = filled && this.wordAt(placedIdx) && this.wordAt(placedIdx).arabic === this.words[i].arabic;
          return `
            <div class="flex flex-col items-center">
              <button ${filled ? `data-unplace="${i}"` : ''} class="min-w-[64px] h-14 px-2 flex items-center justify-center rounded-lg border-2 ${
                filled ? (correct ? 'border-green-400 bg-green-50 dark:bg-green-900/20' : 'border-red-400 bg-red-50 dark:bg-red-900/20')
                       : 'border-dashed border-gray-300 dark:border-gray-600'}">
                <span class="ayah-arabic !text-2xl !leading-normal !mb-0 !pb-0 !border-b-0">${filled ? this.esc(this.wordAt(placedIdx)?.arabic || '') : ''}</span>
              </button>
              <span class="flex items-center gap-1 mt-1 max-w-[72px]">
                <span class="text-[0.625rem] text-gray-500 dark:text-gray-400 text-center leading-tight break-words" dir="auto">${this.esc(w.meaning)}</span>
                ${filled && this.wordAt(placedIdx) && this.wordAt(placedIdx).audio ? `<button data-wa-audio="${this.esc(this.wordAt(placedIdx).audio)}" title="${this.esc(this.tt('wa_hear_word'))}" aria-label="${this.esc(this.tt('wa_hear_word'))}" class="text-xs text-gray-400 hover:text-primary focus:outline-none">🔊</button>` : ''}
              </span>
            </div>`;
        }).join('')}
      </div>
      <div class="border-t border-gray-100 dark:border-gray-700 pt-3">
        <div class="flex flex-wrap gap-2 justify-center min-h-[44px]" dir="rtl">
          ${this.pool.map(origIdx => {
            const used = this.placed.includes(origIdx);
            return `<button data-place="${origIdx}" ${used ? 'disabled' : ''} class="px-3 py-1.5 rounded-lg border ${used ? 'opacity-30 border-gray-200 dark:border-gray-700' : 'border-primary/40 bg-primary/5 dark:bg-primary/20 hover:bg-primary hover:text-white'}"><span class="ayah-arabic !text-2xl !leading-normal !mb-0 !pb-0 !border-b-0 !text-inherit">${this.esc(this.wordAt(origIdx).arabic)}</span></button>`;
          }).join('')}
        </div>
        <div class="flex flex-wrap items-center justify-center gap-2 mt-4">
          <button data-hint ${done ? 'disabled' : ''} class="text-xs px-3 py-1.5 rounded-lg border border-amber-300 dark:border-amber-500/50 text-amber-600 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/20 disabled:opacity-40" title="${this.tt('wa_hint')}" aria-label="${this.tt('wa_hint')}">💡 ${this.tt('wa_hint')}</button>
          <button data-undo ${this.placed.length === 0 ? 'disabled' : ''} class="text-xs px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30">↩ ${this.tt('wa_undo')}</button>
          <button data-reset class="text-xs px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">${this.tt('wa_reset')}</button>
          ${done ? `<span class="text-sm font-semibold ${allCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}">${allCorrect ? '✓ ' + this.tt('wa_correct') : '✗ ' + this.tt('wa_wrong')}</span>` : ''}
          ${allCorrect && this._newBest ? `<span class="text-xs font-semibold text-amber-600 dark:text-amber-300">🏆 ${this.tt('wa_new_best')}</span>` : ''}
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
    const diff = e.target.closest('[data-diff]');
    if (diff) {
      const d = diff.getAttribute('data-diff');
      if (d !== this.difficulty) { this.difficulty = d; this.render(); }
      return;
    }

    // Tap-to-hear a word's recitation (reveal words + filled arrange slots)
    const aud = e.target.closest('[data-wa-audio]');
    if (aud) { this.playAudio(aud.getAttribute('data-wa-audio')); return; }
    const hint = e.target.closest('[data-hint]');
    if (hint && !hint.disabled) { this.showHint(); return; }

    const revealAll = e.target.closest('[data-reveal-all]');
    if (revealAll) {
      if (this.revealed.size === this.words.length) this.revealed = new Set();
      else this.revealed = new Set(this.words.map((_, i) => i));
      this.renderBoard(); return;
    }
    const reveal = e.target.closest('[data-reveal]');
    if (reveal) {
      const i = parseInt(reveal.getAttribute('data-reveal'), 10);
      this.revealed.add(i);
      const w = this.words && this.words[i];
      if (w && w.audio) this.playAudio(w.audio);   // hear it as you reveal it
      this.renderBoard(); return;
    }

    const place = e.target.closest('[data-place]');
    if (place && !place.disabled) {
      this.placed.push(parseInt(place.getAttribute('data-place'), 10));
      this.moves++; this.startTimer(); this.evaluateIfDone();
      this.renderBoard(); return;
    }
    const unplace = e.target.closest('[data-unplace]');
    if (unplace) { const slot = parseInt(unplace.getAttribute('data-unplace'), 10); this.placed.splice(slot, 1); this.moves++; this._scored = false; this.renderBoard(); return; }
    const reset = e.target.closest('[data-reset]');
    if (reset) { this.placed = []; this.moves = 0; this.startTime = null; this._scored = false; this.stopTimer(); this.renderBoard(); return; }
    const undo = e.target.closest('[data-undo]');
    if (undo && this.placed.length > 0) { this.placed.pop(); this.moves++; this._scored = false; this.renderBoard(); return; }
  }

  esc(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
}

let wordArrange;
document.addEventListener('DOMContentLoaded', () => { wordArrange = new WordArrange(); });
