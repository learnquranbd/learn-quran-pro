/**
 * Typing Memorization
 * Type a surah / ayah range from memory; it's checked word-by-word against the
 * real text (diacritic-tolerant) → green (correct) / red (wrong or extra),
 * amber (missed), with an accuracy score. Complements the speech-recognition
 * memorize. Uses the bundled diacritized text (data/quran-words.json) — offline.
 */

class TypeMemorize {
  constructor() {
    this.root = document.getElementById('type-memorize-root');
    if (!this.root) return;

    this.language = (typeof appSettings !== 'undefined' && appSettings) ? appSettings.get('language') : 'en';
    this.surah = 1;
    this.fromAyah = 1;
    this.toAyah = null; // null → full surah (set on render / surah change)
    this.hideTarget = true;
    this._words = null; // data/quran-words.json

    // enrichments -----------------------------------------------------------
    this.firstLetterHint = false;  // show first letter of each not-yet-typed word
    this.strictTashkeel = false;   // also require exact diacritics to count a word
    this.revealCount = 0;          // words progressively revealed via 💡 button
    this.elapsedMs = 0;            // stopwatch for the current ayah/range
    this.timerStart = null;
    this.timerId = null;
    this.lastResult = null;        // {pct, ms} of the last Check (for Next-ayah)
    this.session = { count: 0, sumPct: 0, sumMs: 0, items: [] }; // range-chain summary

    window.addEventListener('learnModuleSelected', (e) => {
      if (e.detail && e.detail.module === 'typememorize') this.render();
    });
    window.addEventListener('settingChanged', (e) => {
      if (e.detail && e.detail.key === 'language') {
        this.language = e.detail.value;
        if (this.root.innerHTML) this.render();
      }
    });

    this.root.addEventListener('click', (e) => this.onClick(e));
    this.root.addEventListener('input', (e) => {
      if (e.target && e.target.id === 'tm-input') {
        if (e.target.value.trim()) this.startTimer();
        this.liveCheck();
      }
    });
  }

  /* ---------- Arabic normalization (matches QuranData.normalizeWord) ---------- */
  norm(t) {
    return (t || '')
      .replace(/[ً-ٰٟۖ-ۭ࣓-ࣿـ]/g, '')
      .replace(/[آأإٱ]/g, 'ا')
      .replace(/ؤ/g, 'و').replace(/ئ/g, 'ي')
      .replace(/ى/g, 'ي').replace(/ة/g, 'ه')
      .replace(/ء/g, '')
      .replace(/[^ء-ي]/g, '');
  }

  /** Like norm() but KEEPS the tashkeel — used only when strict-tashkeel mode is on. */
  normD(t) {
    return (t || '')
      .replace(/ـ/g, '')
      .replace(/[آأإٱ]/g, 'ا')
      .replace(/ؤ/g, 'و').replace(/ئ/g, 'ي')
      .replace(/ى/g, 'ي').replace(/ة/g, 'ه')
      .replace(/[^ء-ْٰ]/g, '');
  }

  /** Split raw input into comparable tokens: [{raw, norm, normD}]. */
  tokenize(str) {
    return (str || '').split(/\s+/)
      .map(raw => ({ raw, norm: this.norm(raw), normD: this.normD(raw) }))
      .filter(x => x.norm);
  }

  async loadWords() {
    if (!this._words) {
      this._words = await fetch('data/quran-words.json').then(r => {
        if (!r.ok) throw new Error('no data'); return r.json();
      });
    }
    return this._words;
  }

  /** Flat expected word list for the selected ayah range: [{arabic, norm, key}] */
  async expectedWords() {
    const data = await this.loadWords();
    const [from, to] = this.range();
    const out = [];
    for (let a = from; a <= to; a++) {
      const ws = data[`${this.surah}:${a}`] || [];
      ws.forEach(w => out.push({ arabic: w, norm: this.norm(w), normD: this.normD(w), key: `${this.surah}:${a}` }));
    }
    return out;
  }

  /** Clamped [from, to] ayah range for the current surah (1 ≤ from ≤ to ≤ ayahCount). */
  range() {
    const count = getSurahByNumber(this.surah).ayahCount;
    const from = Math.min(Math.max(this.fromAyah || 1, 1), count);
    const to = Math.min(Math.max(this.toAyah || count, from), count);
    return [from, to];
  }

  /* ---------- render ---------- */

  async render() {
    const lang = this.language;
    const options = (typeof SURAH_DATA !== 'undefined' ? SURAH_DATA : [])
      .map(s => `<option value="${s.number}">${s.number}. ${getSurahName(s.number, lang)} (${s.ayahCount})</option>`).join('');

    this.root.innerHTML = `
      <div class="w-full">
        <div class="text-center mb-5">
          <div class="text-4xl mb-1">⌨️</div>
          <h2 class="text-xl font-bold">${t('typemem_title', lang)}</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400">${t('typemem_subtitle', lang)}</p>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow p-5 space-y-4">
          <div class="flex flex-wrap items-center gap-3">
            <select id="tm-surah" class="flex-1 min-w-[180px] px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700">
              ${options}
            </select>
            <div class="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300">
              <span>${t('ayah', lang)}</span>
              <select id="tm-from" class="px-2 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"></select>
              <span>–</span>
              <select id="tm-to" class="px-2 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"></select>
            </div>
            <label class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 cursor-pointer">
              <input type="checkbox" id="tm-hide" ${this.hideTarget ? 'checked' : ''} class="w-4 h-4"> ${t('hide_words', lang)}
            </label>
          </div>

          <div id="tm-target" class="${this.hideTarget ? 'hidden' : ''} ayah-arabic !text-2xl !leading-loose p-3 rounded-lg bg-gray-50 dark:bg-gray-900/40 max-h-56 overflow-y-auto" dir="rtl"></div>

          <div class="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
            <label class="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" id="tm-hint" ${this.firstLetterHint ? 'checked' : ''} class="w-4 h-4"> ${t('typemem_first_letter', lang)}
            </label>
            <label class="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" id="tm-strict" ${this.strictTashkeel ? 'checked' : ''} class="w-4 h-4"> ${t('typemem_strict', lang)}
            </label>
            <button id="tm-reveal" class="px-2.5 py-1 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">💡 ${t('typemem_reveal', lang)}</button>
            <span class="ml-auto font-mono">⏱ <span id="tm-timer">0:00</span></span>
          </div>

          <div id="tm-skeleton" class="ayah-arabic !text-2xl !leading-loose p-3 rounded-lg bg-gray-50 dark:bg-gray-900/40 min-h-[3.5rem]" dir="rtl"></div>

          <div class="flex flex-wrap items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <span id="tm-stats"></span>
            <button id="tm-reset-stats" class="underline hover:text-gray-700 dark:hover:text-gray-200">${t('reset', lang)}</button>
          </div>

          <textarea id="tm-input" rows="4" dir="rtl"
            class="w-full px-3 py-2 ayah-arabic !text-2xl !leading-loose rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="${t('typemem_placeholder', lang)}"></textarea>
          <div class="text-right text-sm mt-1">${t('typemem_matched', lang)}: <span id="tm-live" class="text-gray-500 dark:text-gray-400 font-semibold">0 / 0</span></div>

          ${this.arabicKeyboard(lang)}

          <div class="flex flex-wrap gap-2">
            <button id="tm-check" class="px-5 py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary/80">✓ ${t('typemem_check', lang)}</button>
            <button id="tm-clear" class="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">${t('clear', lang)}</button>
          </div>

          <div id="tm-result" class="hidden"></div>
          <div id="tm-session" class="hidden"></div>
        </div>
      </div>
    `;
    this.root.querySelector('#tm-surah').value = String(this.surah);
    this.fillRangeSelects();
    this.loadTarget();
  }

  /** (Re)populate the from/to ayah selects for the current surah and clamp values. */
  fillRangeSelects() {
    const count = getSurahByNumber(this.surah).ayahCount;
    const [from, to] = this.range();
    this.fromAyah = from; this.toAyah = to;
    const opts = Array.from({ length: count }, (_, i) => `<option value="${i + 1}">${i + 1}</option>`).join('');
    const fromSel = this.root.querySelector('#tm-from');
    const toSel = this.root.querySelector('#tm-to');
    if (!fromSel || !toSel) return;
    fromSel.innerHTML = opts; toSel.innerHTML = opts;
    fromSel.value = String(from); toSel.value = String(to);
  }

  arabicKeyboard(lang) {
    const rows = [
      'ض ص ث ق ف غ ع ه خ ح ج د',
      'ش س ي ب ل ا ت ن م ك ط',
      'ئ ء ؤ ر لا ى ة و ز ظ',
      'ذ إ أ آ ً ٌ ٍ َ ُ ِ ّ ْ'
    ];
    return `
      <details class="rounded-lg border border-gray-200 dark:border-gray-700">
        <summary class="px-3 py-2 text-sm cursor-pointer select-none text-gray-600 dark:text-gray-300">⌨️ ${t('arabic_keyboard', lang)}</summary>
        <div class="p-2 space-y-1" dir="rtl">
          ${rows.map(r => `<div class="flex flex-wrap justify-center gap-1">
            ${r.split(' ').map(c => `<button data-tm-key="${c}" class="w-8 h-9 rounded bg-gray-100 dark:bg-gray-700 ayah-arabic !text-xl hover:bg-blue-100 dark:hover:bg-gray-600">${c}</button>`).join('')}
          </div>`).join('')}
          <div class="flex justify-center gap-1">
            <button data-tm-key=" " class="px-8 h-9 rounded bg-gray-100 dark:bg-gray-700 text-xs hover:bg-blue-100 dark:hover:bg-gray-600">${t('typemem_space', lang)}</button>
            <button data-tm-key="BS" class="px-4 h-9 rounded bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-gray-600">⌫</button>
          </div>
        </div>
      </details>
    `;
  }

  async loadTarget() {
    const el = this.root.querySelector('#tm-target');
    if (!el) return;
    try {
      const words = await this.expectedWords();
      this._expected = words;   // cached for live progress
      el.innerHTML = words.map(w => `<span class="mx-0.5">${w.arabic}</span>`).join(' ');
      this.revealCount = 0;     // fresh range → nothing revealed yet
      this.resetTimer();        // fresh range → fresh stopwatch
      this.renderStats();       // best score/time for this exact range
      this.liveCheck();         // counter + skeleton follow the selected range
      this.renderSessionBar();  // keep the running session banner in sync
    } catch (e) { el.textContent = ''; }
  }

  /* ---------- stopwatch ---------- */

  startTimer() {
    if (this.timerId) return;
    this.timerStart = Date.now() - this.elapsedMs;
    this.timerId = setInterval(() => {
      this.elapsedMs = Date.now() - this.timerStart;
      this.updateTimerDisplay();
    }, 250);
  }

  stopTimer() {
    if (this.timerId) { clearInterval(this.timerId); this.timerId = null; }
    if (this.timerStart != null) this.elapsedMs = Date.now() - this.timerStart;
  }

  resetTimer() {
    this.stopTimer();
    this.elapsedMs = 0; this.timerStart = null;
    this.updateTimerDisplay();
  }

  updateTimerDisplay() {
    const el = this.root && this.root.querySelector('#tm-timer');
    if (el) el.textContent = this.fmtTime(this.elapsedMs);
  }

  fmtTime(ms) {
    const s = Math.round((ms || 0) / 1000);
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  }

  /* ---------- best-score persistence ---------- */

  statsKey() {
    const [from, to] = this.range();
    return `tmStats:${this.surah}:${from}-${to}`;
  }

  loadStats() {
    try { return JSON.parse(localStorage.getItem(this.statsKey())) || {}; }
    catch (e) { return {}; }
  }

  /** Persist best accuracy (and fastest time for a perfect run). Returns true if improved. */
  saveStats(pct, ms) {
    const s = this.loadStats();
    let improved = false;
    if (pct > (s.bestPct || 0)) { s.bestPct = pct; improved = true; }
    if (pct >= 100 && (!s.bestTimeMs || ms < s.bestTimeMs)) { s.bestTimeMs = ms; improved = true; }
    s.attempts = (s.attempts || 0) + 1;
    try { localStorage.setItem(this.statsKey(), JSON.stringify(s)); } catch (e) { /* full/blocked */ }
    return improved;
  }

  renderStats() {
    const el = this.root && this.root.querySelector('#tm-stats');
    if (!el) return;
    const lang = this.language;
    const s = this.loadStats();
    if (!s.bestPct) { el.textContent = ''; return; }
    el.textContent = `${t('typemem_best', lang)}: ${s.bestPct}%`
      + (s.bestTimeMs ? ` · ⏱ ${this.fmtTime(s.bestTimeMs)}` : '')
      + (s.attempts ? ` · ${s.attempts}×` : '');
  }

  /* ---------- per-word hint / reveal strip ---------- */

  firstLetterOf(arabic) {
    const m = (arabic || '').match(/[ء-ي]/);
    return m ? m[0] : '•';
  }

  /** Live per-word strip: matched→green word, revealed→blue word, else first-letter/blank hint. */
  renderSkeleton(matched) {
    const el = this.root && this.root.querySelector('#tm-skeleton');
    if (!el || !this._expected) return;
    if (!matched) matched = this.liveAlignment().matched;
    el.innerHTML = this._expected.map((w, idx) => {
      let text, cls;
      if (matched[idx]) { text = w.arabic; cls = 'text-green-600 dark:text-green-400'; }
      else if (idx < this.revealCount) { text = w.arabic; cls = 'text-blue-500 dark:text-blue-400'; }
      else if (this.firstLetterHint) { text = this.firstLetterOf(w.arabic) + '…'; cls = 'text-gray-400 dark:text-gray-500'; }
      else { text = '•'.repeat(Math.min(Math.max(w.norm.length, 2), 5)); cls = 'text-gray-300 dark:text-gray-600'; }
      return `<span class="mx-0.5 ${cls}">${this.esc(text)}</span>`;
    }).join(' ');
  }

  /* ---------- range-chaining session ---------- */

  recordAttempt() {
    if (!this.lastResult) return;
    const r = this.lastResult;
    const [from, to] = this.range();
    this.session.items.push({ label: `${this.surah}:${from}${to !== from ? '-' + to : ''}`, pct: r.pct, ms: r.ms });
    this.session.count++;
    this.session.sumPct += r.pct;
    this.session.sumMs += r.ms;
    this.lastResult = null;
  }

  /** Advance the selection to the next single ayah (chaining through a range). */
  nextAyah() {
    this.recordAttempt();
    const count = getSurahByNumber(this.surah).ayahCount;
    const [, to] = this.range();
    if (to < count) { this.fromAyah = to + 1; this.toAyah = to + 1; }
    else if (this.surah < 114) { this.surah += 1; this.fromAyah = 1; this.toAyah = 1; }
    // reflect the new selection in the pickers
    const sSel = this.root.querySelector('#tm-surah');
    if (sSel) sSel.value = String(this.surah);
    this.fillRangeSelects();
    const input = this.root.querySelector('#tm-input');
    if (input) input.value = '';
    const res = this.root.querySelector('#tm-result');
    if (res) res.classList.add('hidden');
    this.loadTarget();
  }

  renderSessionBar() {
    const el = this.root && this.root.querySelector('#tm-session');
    if (!el) return;
    const lang = this.language;
    const s = this.session;
    if (!s.count) { el.classList.add('hidden'); el.innerHTML = ''; return; }
    const avg = Math.round(s.sumPct / s.count);
    el.classList.remove('hidden');
    el.innerHTML = `
      <div class="flex flex-wrap items-center gap-2 text-sm p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
        <span>${t('typemem_session', lang)}: ${s.count} ${t('typemem_ayat_done', lang)} · ${t('accuracy', lang)} ${avg}% · ⏱ ${this.fmtTime(s.sumMs)}</span>
        <button id="tm-finish" class="ml-auto px-3 py-1 rounded-lg border border-blue-300 dark:border-blue-700 hover:bg-blue-100 dark:hover:bg-blue-800/40">${t('typemem_finish', lang)}</button>
      </div>`;
  }

  /** Freeze the running session into a summary card, then start a new session. */
  finishSession() {
    this.recordAttempt();
    const lang = this.language;
    const s = this.session;
    const res = this.root.querySelector('#tm-result');
    if (!s.count) { if (res) res.classList.add('hidden'); return; }
    const avg = Math.round(s.sumPct / s.count);
    res.classList.remove('hidden');
    res.innerHTML = `
      <div class="p-3 rounded-lg bg-gray-50 dark:bg-gray-900/40">
        <div class="text-center font-bold mb-2">🏁 ${t('typemem_session', lang)}</div>
        <div class="flex justify-center gap-4 text-sm mb-3">
          <span>${t('typemem_ayat_done', lang)}: <b>${s.count}</b></span>
          <span>${t('typemem_avg_accuracy', lang)}: <b>${avg}%</b></span>
          <span>${t('typemem_total_time', lang)}: <b>${this.fmtTime(s.sumMs)}</b></span>
        </div>
        <div class="space-y-1 text-sm" dir="ltr">
          ${s.items.map(it => `<div class="flex justify-between border-b border-gray-200 dark:border-gray-700 py-0.5">
            <span>${this.esc(it.label)}</span>
            <span class="${it.pct >= 80 ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'}">${it.pct}% · ${this.fmtTime(it.ms)}</span>
          </div>`).join('')}
        </div>
      </div>`;
    this.session = { count: 0, sumPct: 0, sumMs: 0, items: [] };
    this.renderSessionBar();
  }

  /* ---------- checking ---------- */

  /** True if a typed token matches an expected word (honours the strict-tashkeel toggle). */
  wordOk(exp, tok) {
    if (!this.match(exp.norm, tok.norm)) return false;
    if (this.strictTashkeel) return this.normD(exp.arabic) === tok.normD;
    return true;
  }

  /** Greedy word alignment (small lookahead) → per-word matched flags + count. */
  liveAlignment() {
    const expected = this._expected || [];
    const inputEl = this.root.querySelector('#tm-input');
    const typed = this.tokenize(inputEl ? inputEl.value : '');
    const matched = new Array(expected.length).fill(false);
    let i = 0, ok = 0; const LOOK = 3;
    for (const tok of typed) {
      if (i >= expected.length) break;
      if (this.wordOk(expected[i], tok)) { matched[i] = true; ok++; i++; continue; }
      for (let k = 1; k <= LOOK && i + k < expected.length; k++) {
        if (this.wordOk(expected[i + k], tok)) { matched[i + k] = true; ok++; i = i + k + 1; break; }
      }
    }
    return { matched, ok, total: expected.length };
  }

  liveCheck() {
    // Lightweight running count + per-word feedback strip (full report on Check)
    if (!this._expected) return;
    const align = this.liveAlignment();
    const live = this.root.querySelector('#tm-live');
    if (live) {
      live.textContent = `${align.ok} / ${align.total}`;
      live.className = 'text-sm font-semibold ' + (align.ok === align.total && align.ok > 0 ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400');
    }
    this.renderSkeleton(align.matched);
  }

  async check() {
    const lang = this.language;
    const input = this.root.querySelector('#tm-input').value;
    const typed = this.tokenize(input);
    let expected;
    try { expected = await this.expectedWords(); } catch (e) { return; }
    this.stopTimer();

    // Greedy word alignment with small lookahead (like the speech memorize)
    const states = new Array(expected.length);
    const extras = {}; // slot index → [raw unmatched typed tokens shown red there]
    let extraCount = 0;
    const addExtra = (at, raw) => { (extras[at] = extras[at] || []).push(raw); extraCount++; };
    let i = 0;
    const LOOK = 3;
    for (const tok of typed) {
      if (i >= expected.length) { addExtra(expected.length, tok.raw); continue; }
      if (this.wordOk(expected[i], tok)) { states[i] = 'ok'; i++; continue; }
      let jumped = false;
      for (let k = 1; k <= LOOK && i + k < expected.length; k++) {
        if (this.wordOk(expected[i + k], tok)) {
          for (let m = i; m < i + k; m++) states[m] = 'miss';
          states[i + k] = 'ok'; i = i + k + 1; jumped = true; break;
        }
      }
      // unmatched extra token → wrong/extra (rendered red, lowers the score)
      if (!jumped) addExtra(i, tok.raw);
    }

    const correct = states.filter(s => s === 'ok').length;
    const total = expected.length;
    const pct = (total + extraCount) ? Math.round((correct / (total + extraCount)) * 100) : 0;

    const ms = this.elapsedMs;
    this.lastResult = { pct, ms };
    const improved = this.saveStats(pct, ms);
    this.renderStats();

    const res = this.root.querySelector('#tm-result');
    res.classList.remove('hidden');
    res.innerHTML = `
      <div class="text-center mb-3">
        <span class="text-2xl font-bold ${pct >= 80 ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'}">${t('accuracy', lang)}: ${pct}%</span>
        <span class="text-sm text-gray-500 dark:text-gray-400 ml-2">${correct}/${total}</span>
        ${extraCount ? `<span class="text-sm text-red-500 dark:text-red-400 ml-2">+${extraCount} ${t('typemem_extra', lang)}</span>` : ''}
        <span class="text-sm text-gray-500 dark:text-gray-400 ml-2">⏱ ${this.fmtTime(ms)}</span>
        ${improved ? `<span class="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300">★ ${t('typemem_new_best', lang)}</span>` : ''}
      </div>
      <div class="ayah-arabic !text-2xl !leading-loose p-3 rounded-lg bg-gray-50 dark:bg-gray-900/40" dir="rtl">
        ${expected.map((w, idx) => {
          const st = states[idx];
          const cls = st === 'ok' ? 'text-green-600 dark:text-green-400'
            : st === 'miss' ? 'text-red-500 dark:text-red-400'
            : 'text-gray-400 dark:text-gray-500';
          return this.extraSpans(extras[idx]) + `<span class="${cls} mx-0.5">${w.arabic}</span>`;
        }).join(' ')}
        ${this.extraSpans(extras[expected.length])}
      </div>
      <div class="flex justify-center mt-3">
        <button id="tm-next" class="px-5 py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary/80">${t('typemem_next_ayah', lang)} →</button>
      </div>
    `;
  }

  /** Unmatched extra typed tokens → red + struck through, inline where they were typed. */
  extraSpans(raws) {
    if (!raws || !raws.length) return '';
    return raws.map(r => `<span class="text-red-500 dark:text-red-400 line-through mx-0.5">${this.esc(r)}</span>`).join(' ') + ' ';
  }

  esc(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

  match(exp, got) {
    if (exp === got) return true;
    const tol = exp.length >= 6 ? 2 : exp.length >= 4 ? 1 : 0;
    return tol > 0 && this.lev(exp, got) <= tol;
  }

  lev(a, b) {
    if (Math.abs(a.length - b.length) > 2) return 99;
    const dp = Array.from({ length: a.length + 1 }, (_, i) => [i]);
    for (let j = 1; j <= b.length; j++) dp[0][j] = j;
    for (let i = 1; i <= a.length; i++)
      for (let j = 1; j <= b.length; j++)
        dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return dp[a.length][b.length];
  }

  /* ---------- events ---------- */

  onClick(e) {
    const key = e.target.closest('[data-tm-key]');
    if (key) {
      const ta = this.root.querySelector('#tm-input');
      const k = key.getAttribute('data-tm-key');
      // Insert/delete at the caret (not blindly at the end), keep the caret there.
      const start = ta.selectionStart != null ? ta.selectionStart : ta.value.length;
      const end = ta.selectionEnd != null ? ta.selectionEnd : ta.value.length;
      if (k === 'BS') {
        const from = start === end ? Math.max(0, start - 1) : start;
        ta.value = ta.value.slice(0, from) + ta.value.slice(end);
        ta.setSelectionRange(from, from);
      } else {
        ta.value = ta.value.slice(0, start) + k + ta.value.slice(end);
        ta.setSelectionRange(start + k.length, start + k.length);
      }
      ta.focus();
      // Programmatic value changes don't fire 'input' → keep the live counter updated.
      ta.dispatchEvent(new Event('input', { bubbles: true }));
      return;
    }
    if (e.target.closest('#tm-check')) return this.check();
    if (e.target.closest('#tm-clear')) {
      this.root.querySelector('#tm-input').value = '';
      this.root.querySelector('#tm-result').classList.add('hidden');
      this.revealCount = 0;
      this.resetTimer();
      this.liveCheck();
      return;
    }
    if (e.target.closest('#tm-hide')) {
      this.hideTarget = this.root.querySelector('#tm-hide').checked;
      this.root.querySelector('#tm-target').classList.toggle('hidden', this.hideTarget);
      return;
    }
    if (e.target.closest('#tm-hint')) {
      this.firstLetterHint = this.root.querySelector('#tm-hint').checked;
      this.renderSkeleton();
      return;
    }
    if (e.target.closest('#tm-strict')) {
      this.strictTashkeel = this.root.querySelector('#tm-strict').checked;
      this.liveCheck();
      return;
    }
    if (e.target.closest('#tm-reveal')) {
      if (this._expected) this.revealCount = Math.min(this.revealCount + 1, this._expected.length);
      this.renderSkeleton();
      return;
    }
    if (e.target.closest('#tm-reset-stats')) {
      try { localStorage.removeItem(this.statsKey()); } catch (e2) { /* ignore */ }
      this.renderStats();
      return;
    }
    if (e.target.closest('#tm-next')) return this.nextAyah();
    if (e.target.closest('#tm-finish')) return this.finishSession();
    if (e.target.closest('#tm-surah')) { /* handled on change */ }
  }
}

// react to surah / ayah-range change (change event, not click)
document.addEventListener('change', (e) => {
  if (!e.target || typeof typeMemorize === 'undefined' || !typeMemorize) return;
  const id = e.target.id;
  if (id !== 'tm-surah' && id !== 'tm-from' && id !== 'tm-to') return;
  if (id === 'tm-surah') {
    typeMemorize.surah = parseInt(e.target.value, 10);
    typeMemorize.fromAyah = 1;
    typeMemorize.toAyah = null; // full surah
    typeMemorize.fillRangeSelects();
  } else {
    const v = parseInt(e.target.value, 10);
    if (id === 'tm-from') {
      typeMemorize.fromAyah = v;
      if (typeMemorize.toAyah < v) typeMemorize.toAyah = v;       // keep from ≤ to
    } else {
      typeMemorize.toAyah = v;
      if (typeMemorize.fromAyah > v) typeMemorize.fromAyah = v;   // keep from ≤ to
    }
    typeMemorize.fillRangeSelects();
  }
  typeMemorize.loadTarget();
  const res = typeMemorize.root.querySelector('#tm-result');
  if (res) res.classList.add('hidden');
});

let typeMemorize;
document.addEventListener('DOMContentLoaded', () => { typeMemorize = new TypeMemorize(); });
