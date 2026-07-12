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
    this.hideTarget = true;
    this._words = null; // data/quran-words.json

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
      if (e.target && e.target.id === 'tm-input') this.liveCheck();
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

  async loadWords() {
    if (!this._words) {
      this._words = await fetch('data/quran-words.json').then(r => {
        if (!r.ok) throw new Error('no data'); return r.json();
      });
    }
    return this._words;
  }

  /** Flat expected word list for the current surah: [{arabic, norm, key}] */
  async expectedWords() {
    const data = await this.loadWords();
    const info = getSurahByNumber(this.surah);
    const out = [];
    for (let a = 1; a <= info.ayahCount; a++) {
      const ws = data[`${this.surah}:${a}`] || [];
      ws.forEach(w => out.push({ arabic: w, norm: this.norm(w), key: `${this.surah}:${a}` }));
    }
    return out;
  }

  /* ---------- render ---------- */

  async render() {
    const lang = this.language;
    const options = (typeof SURAH_DATA !== 'undefined' ? SURAH_DATA : [])
      .map(s => `<option value="${s.number}">${s.number}. ${getSurahName(s.number, lang)} (${s.ayahCount})</option>`).join('');

    this.root.innerHTML = `
      <div class="max-w-3xl mx-auto">
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
            <label class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 cursor-pointer">
              <input type="checkbox" id="tm-hide" ${this.hideTarget ? 'checked' : ''} class="w-4 h-4"> ${t('hide_words', lang)}
            </label>
          </div>

          <div id="tm-target" class="${this.hideTarget ? 'hidden' : ''} ayah-arabic !text-2xl !leading-loose p-3 rounded-lg bg-gray-50 dark:bg-gray-900/40 max-h-56 overflow-y-auto" dir="rtl"></div>

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
        </div>
      </div>
    `;
    this.root.querySelector('#tm-surah').value = String(this.surah);
    this.loadTarget();
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
    } catch (e) { el.textContent = ''; }
  }

  /* ---------- checking ---------- */

  liveCheck() {
    // Lightweight running count of correctly-typed words so far (full report on Check)
    if (!this._expected) return;
    const live = this.root.querySelector('#tm-live');
    if (!live) return;
    const expected = this._expected;
    const typed = (this.root.querySelector('#tm-input').value || '').split(/\s+/).map(x => this.norm(x)).filter(Boolean);
    let i = 0, ok = 0; const LOOK = 3;
    for (const tok of typed) {
      if (i >= expected.length) break;
      if (this.match(expected[i].norm, tok)) { ok++; i++; continue; }
      for (let k = 1; k <= LOOK && i + k < expected.length; k++) {
        if (this.match(expected[i + k].norm, tok)) { ok++; i = i + k + 1; break; }
      }
    }
    live.textContent = `${ok} / ${expected.length}`;
    live.className = 'text-sm font-semibold ' + (ok === expected.length && ok > 0 ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400');
  }

  async check() {
    const lang = this.language;
    const input = this.root.querySelector('#tm-input').value;
    const typed = input.split(/\s+/).map(x => this.norm(x)).filter(Boolean);
    let expected;
    try { expected = await this.expectedWords(); } catch (e) { return; }

    // Greedy word alignment with small lookahead (like the speech memorize)
    const states = new Array(expected.length);
    let i = 0;
    const LOOK = 3;
    for (const tok of typed) {
      if (i >= expected.length) break;
      if (this.match(expected[i].norm, tok)) { states[i] = 'ok'; i++; continue; }
      let jumped = false;
      for (let k = 1; k <= LOOK && i + k < expected.length; k++) {
        if (this.match(expected[i + k].norm, tok)) {
          for (let m = i; m < i + k; m++) states[m] = 'miss';
          states[i + k] = 'ok'; i = i + k + 1; jumped = true; break;
        }
      }
      // unmatched extra token → ignore (keeps i)
      if (!jumped) { /* skip */ }
    }

    const correct = states.filter(s => s === 'ok').length;
    const total = expected.length;
    const pct = total ? Math.round((correct / total) * 100) : 0;

    const res = this.root.querySelector('#tm-result');
    res.classList.remove('hidden');
    res.innerHTML = `
      <div class="text-center mb-3">
        <span class="text-2xl font-bold ${pct >= 80 ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'}">${t('accuracy', lang)}: ${pct}%</span>
        <span class="text-sm text-gray-500 dark:text-gray-400 ml-2">${correct}/${total}</span>
      </div>
      <div class="ayah-arabic !text-2xl !leading-loose p-3 rounded-lg bg-gray-50 dark:bg-gray-900/40" dir="rtl">
        ${expected.map((w, idx) => {
          const st = states[idx];
          const cls = st === 'ok' ? 'text-green-600 dark:text-green-400'
            : st === 'miss' ? 'text-red-500 dark:text-red-400'
            : 'text-gray-400 dark:text-gray-500';
          return `<span class="${cls} mx-0.5">${w.arabic}</span>`;
        }).join(' ')}
      </div>
    `;
  }

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
      if (k === 'BS') ta.value = ta.value.slice(0, -1);
      else ta.value += k;
      ta.focus();
      return;
    }
    if (e.target.closest('#tm-check')) return this.check();
    if (e.target.closest('#tm-clear')) {
      this.root.querySelector('#tm-input').value = '';
      this.root.querySelector('#tm-result').classList.add('hidden');
      return;
    }
    if (e.target.closest('#tm-hide')) {
      this.hideTarget = this.root.querySelector('#tm-hide').checked;
      this.root.querySelector('#tm-target').classList.toggle('hidden', this.hideTarget);
      return;
    }
    if (e.target.closest('#tm-surah')) { /* handled on change */ }
  }
}

// react to surah change (change event, not click)
document.addEventListener('change', (e) => {
  if (e.target && e.target.id === 'tm-surah' && typeof typeMemorize !== 'undefined' && typeMemorize) {
    typeMemorize.surah = parseInt(e.target.value, 10);
    typeMemorize.loadTarget();
    const res = typeMemorize.root.querySelector('#tm-result');
    if (res) res.classList.add('hidden');
  }
});

let typeMemorize;
document.addEventListener('DOMContentLoaded', () => { typeMemorize = new TypeMemorize(); });
