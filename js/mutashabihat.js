/**
 * Mutashabihat (متشابهات) — Similar Verses.
 *
 * The near-identical verses scattered across the Quran that huffaz most often
 * confuse. For a chosen surah, every ayah that shares a long identical phrase
 * (>= 4 words) with verses elsewhere is listed, the shared phrase highlighted,
 * with one-tap links to the look-alike verses.
 *
 * Built ENTIRELY from the app's own bundled data/quran-tokens.json (see
 * scripts) — data/mutashabihat.json maps "s:a" -> [[ref, phraseLen, startIdx]].
 * Display Arabic comes from data/quran-words.json. Renders into
 * #mutashabihat-container (tab "mutashabihat").
 *
 * Enrichments: browse search + sort, "random pair" jump, mark verses as
 * "tricky" (localStorage) with a review view, copy-a-pair, and a "distinguish"
 * practice quiz (which reference is this verse?) with a persisted best streak.
 */

class Mutashabihat {
  constructor() {
    this.container = document.getElementById('mutashabihat-container');
    if (!this.container) return;
    this.language = (typeof appSettings !== 'undefined' && appSettings) ? appSettings.get('language') : 'en';
    this.surah = 2;
    this.index = null;    // { "s:a": [[ref,len,start],...] }
    this.words = null;    // { "s:a": [diacritized words] }
    this.loaded = false;

    this.mode = 'browse'; // 'browse' | 'tricky' | 'practice'
    this.query = '';
    this.sort = 'ayah';   // 'ayah' | 'most'
    this.flashKey = null;
    this.quiz = null;
    this.streak = 0;
    this.tricky = this.loadTricky();
    this.best = this.loadBest();

    window.addEventListener('tabChanged', (e) => { if (e.detail.tabId === 'mutashabihat') this.ensureLoaded(); });
    window.addEventListener('settingChanged', (e) => {
      if (e.detail.key === 'language') { this.language = e.detail.value; if (this.loaded) this.render(); }
    });
  }

  tt(key) { return t(key, this.language); }
  esc(s) { return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }

  /* ---------- persistence ---------- */
  loadTricky() {
    try { const a = JSON.parse(localStorage.getItem('mutashabihat:tricky') || '[]'); return new Set(Array.isArray(a) ? a : []); }
    catch (e) { return new Set(); }
  }
  saveTricky() {
    try { localStorage.setItem('mutashabihat:tricky', JSON.stringify([...this.tricky])); } catch (e) { /* ignore */ }
  }
  isTricky(key) { return this.tricky.has(key); }
  toggleTricky(key) {
    if (this.tricky.has(key)) this.tricky.delete(key); else this.tricky.add(key);
    this.saveTricky();
  }
  loadBest() {
    try { return parseInt(localStorage.getItem('mutashabihat:bestStreak') || '0') || 0; } catch (e) { return 0; }
  }
  saveBest() {
    try { localStorage.setItem('mutashabihat:bestStreak', String(this.best)); } catch (e) { /* ignore */ }
  }

  /* ---------- data load ---------- */
  async ensureLoaded() {
    if (this.loaded) { this.render(); return; }
    this.container.innerHTML = `<div class="text-center py-16 text-gray-400">${this.tt('loading')}</div>`;
    try {
      const [idx, wd] = await Promise.all([
        fetch('data/mutashabihat.json').then(r => r.json()),
        (typeof QuranData !== 'undefined' && QuranData.getQuranWords) ? QuranData.getQuranWords()
          : fetch('data/quran-words.json').then(r => r.json())
      ]);
      this.index = idx; this.words = wd;
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
    this.container.addEventListener('change', (e) => {
      if (e.target.id === 'mt-surah') {
        this.surah = parseInt(e.target.value); this.query = '';
        const sb = this.container.querySelector('#mt-search'); if (sb) sb.value = '';
        this.updateResults();
      }
      else if (e.target.id === 'mt-sort') { this.sort = e.target.value; this.updateResults(); }
    });
    this.container.addEventListener('input', (e) => {
      if (e.target.id === 'mt-search') { this.query = e.target.value; this.updateResults(); }
    });
    this.container.addEventListener('click', (e) => {
      const chip = e.target.closest('[data-mt-ref]');
      if (chip && typeof ayahModal !== 'undefined' && ayahModal) {
        const phrase = chip.getAttribute('data-mt-phrase');
        ayahModal.open(chip.getAttribute('data-mt-ref'), phrase ? { phrase } : undefined);
        return;
      }
      const open = e.target.closest('[data-mt-open]');
      if (open) { window.location.hash = open.getAttribute('data-mt-open'); return; }

      const modeBtn = e.target.closest('[data-mt-mode]');
      if (modeBtn) { this.setMode(modeBtn.getAttribute('data-mt-mode')); return; }

      if (e.target.closest('[data-mt-random]')) { this.randomPair(); return; }

      const tri = e.target.closest('[data-mt-tricky]');
      if (tri) { this.toggleTricky(tri.getAttribute('data-mt-tricky')); this.render(); return; }

      const cp = e.target.closest('[data-mt-copy]');
      if (cp) { this.copyPair(cp.getAttribute('data-mt-copy'), cp); return; }

      const choice = e.target.closest('[data-mt-choice]');
      if (choice) { this.answerQuiz(choice.getAttribute('data-mt-choice')); return; }
      if (e.target.closest('[data-mt-next]')) { this.quiz = null; this.buildQuiz(); this.updateResults(); return; }
    });
  }

  setMode(mode) {
    this.mode = mode;
    if (mode === 'practice' && !this.quiz) this.buildQuiz();
    this.render();
  }

  /* ---------- helpers ---------- */
  shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

  surahName(sNum, short) {
    if (short) {
      const info = (typeof getSurahByNumber === 'function') ? getSurahByNumber(parseInt(sNum)) : null;
      return info ? info.arabicName : String(sNum);
    }
    return (typeof getSurahName === 'function') ? getSurahName(parseInt(sNum), this.language) : String(sNum);
  }
  shortName(s) { return this.surahName(s, true); }

  /** Verses of the current surah that have similar verses, in ayah order. */
  surahVerses() {
    const prefix = this.surah + ':';
    return Object.keys(this.index)
      .filter(k => k.startsWith(prefix))
      .sort((a, b) => parseInt(a.split(':')[1]) - parseInt(b.split(':')[1]));
  }

  matchesQuery(key, q) {
    if (!q) return true;
    const [s, a] = key.split(':');
    if (`${s}:${a}`.includes(q) || a.startsWith(q)) return true;
    const nm = this.surahName(s).toLowerCase();
    if (nm.includes(q)) return true;
    return (this.index[key] || []).some(([ref]) => {
      if (ref.includes(q)) return true;
      return this.surahName(ref.split(':')[0]).toLowerCase().includes(q);
    });
  }

  /** Diacritized verse HTML with the shared phrase [start, start+len) highlighted. */
  verseHtml(key, start, len) {
    const w = this.words[key] || [];
    return w.map((word, i) => {
      const on = i >= start && i < start + len;
      return on
        ? `<span class="bg-amber-200 dark:bg-amber-500/30 rounded px-0.5">${this.esc(word)}</span>`
        : this.esc(word);
    }).join(' ');
  }

  randomPair() {
    const keys = Object.keys(this.index || {}).filter(k => (this.words[k] || []).length);
    if (!keys.length) return;
    const key = keys[Math.floor(Math.random() * keys.length)];
    this.mode = 'browse';
    this.query = '';
    this.surah = parseInt(key.split(':')[0]);
    this.flashKey = key;
    this.render();
  }

  copyPair(key, btn) {
    const words = (this.words[key] || []).join(' ');
    const [s] = key.split(':');
    const sims = (this.index[key] || []).map(x => x[0]).join('، ');
    const text = `${this.surahName(s)} ${key}\n${words}\n${this.tt('mutashabihat_similar')}: ${sims}`;
    const done = () => {
      if (!btn) return;
      const prev = btn.getAttribute('data-label') || btn.textContent;
      btn.textContent = '✓ ' + this.tt('copied');
      setTimeout(() => { btn.textContent = prev; }, 1400);
    };
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, () => {});
      else {
        const ta = document.createElement('textarea');
        ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); done(); } catch (e) { /* ignore */ }
        document.body.removeChild(ta);
      }
    } catch (e) { /* ignore */ }
  }

  /* ---------- quiz ---------- */
  buildQuiz() {
    if (!this.index || !this.words) { this.quiz = null; return; }
    const usable = k => (this.words[k] || []).length && (this.index[k] || []).length;
    const all = Object.keys(this.index).filter(usable);
    const rich = all.filter(k => this.index[k].length >= 2);
    const pool = rich.length ? rich : all;
    if (!pool.length) { this.quiz = null; return; }
    const key = pool[Math.floor(Math.random() * pool.length)];
    const sims = [...new Set(this.index[key].map(x => x[0]).filter(r => r !== key))];
    const distractors = this.shuffle(sims.slice()).slice(0, 3);
    const options = this.shuffle([key, ...distractors]);
    const [, len, start] = this.index[key][0];
    this.quiz = { key, options, answer: key, start, len, answered: null };
  }

  answerQuiz(ref) {
    if (!this.quiz || this.quiz.answered) return;
    this.quiz.answered = ref;
    if (ref === this.quiz.answer) {
      this.streak += 1;
      if (this.streak > this.best) { this.best = this.streak; this.saveBest(); }
    } else {
      this.streak = 0;
    }
    this.updateResults();
  }

  practiceHtml() {
    if (!this.quiz) this.buildQuiz();
    if (!this.quiz) return `<div class="text-center py-10 text-gray-400">${this.tt('mt_not_enough')}</div>`;
    const q = this.quiz;
    const answered = !!q.answered;
    const options = q.options.map(ref => {
      const [s] = ref.split(':');
      const label = `${this.esc(this.surahName(s))} <span class="opacity-60">${ref}</span>`;
      let cls = 'border-gray-200 dark:border-gray-700 hover:border-primary hover:bg-primary/5 dark:hover:bg-primary/10';
      let mark = '';
      if (answered) {
        if (ref === q.answer) { cls = 'border-green-500 bg-green-50 dark:bg-green-500/15 text-green-700 dark:text-green-300'; mark = ' ✓'; }
        else if (ref === q.answered) { cls = 'border-red-400 bg-red-50 dark:bg-red-500/15 text-red-600 dark:text-red-300'; mark = ' ✕'; }
        else cls = 'border-gray-200 dark:border-gray-700 opacity-60';
      }
      return `<button ${answered ? 'disabled' : ''} data-mt-choice="${ref}"
                class="w-full text-start px-3 py-2.5 rounded-lg border text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${cls}">
                ${label}${mark}</button>`;
    }).join('');
    const verdict = answered
      ? (q.answered === q.answer
          ? `<span class="text-green-600 dark:text-green-400 font-semibold">✓ ${this.tt('mt_correct')}</span>`
          : `<span class="text-red-500 dark:text-red-400 font-semibold">✕ ${this.tt('mt_wrong')}</span>`)
      : '';
    return `
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-4 max-w-2xl mx-auto">
        <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
          <span>🎯 ${this.tt('mt_practice_q')}</span>
          <span>${this.tt('mt_streak')}: <b class="text-primary">${this.streak}</b> · ${this.tt('best_score')}: <b>${this.best}</b></span>
        </div>
        <div class="ayah-arabic !text-2xl !leading-[2.4] mb-4" dir="rtl">${this.verseHtml(q.key, q.start, q.len)}</div>
        <div class="space-y-2">${options}</div>
        <div class="flex items-center justify-between mt-4 min-h-[2.25rem]">
          <div>${verdict}</div>
          ${answered ? `<button data-mt-next class="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">${this.tt('mt_new_question')} →</button>` : ''}
        </div>
      </div>`;
  }

  /* ---------- browse / tricky results ---------- */
  resultsHtml() {
    if (this.mode === 'practice') return this.practiceHtml();
    if (this.mode === 'tricky') {
      const keys = [...this.tricky].filter(k => (this.index || {})[k])
        .sort((a, b) => a.split(':').map(Number)[0] - b.split(':').map(Number)[0] || a.split(':').map(Number)[1] - b.split(':').map(Number)[1]);
      return keys.length ? keys.map(k => this.cardHtml(k)).join('')
        : `<div class="text-center py-10 text-gray-400">${this.tt('mt_no_tricky')}</div>`;
    }
    // browse
    let verses = this.surahVerses();
    const q = (this.query || '').trim().toLowerCase();
    if (q) verses = verses.filter(k => this.matchesQuery(k, q));
    if (this.sort === 'most') {
      verses = verses.slice().sort((a, b) =>
        (this.index[b].length - this.index[a].length) ||
        (parseInt(a.split(':')[1]) - parseInt(b.split(':')[1])));
    }
    if (!verses.length) {
      return `<div class="text-center py-10 text-gray-400">${q ? this.tt('mt_no_match') : this.tt('mutashabihat_none')}</div>`;
    }
    return verses.map(k => this.cardHtml(k)).join('');
  }

  updateResults() {
    const el = this.container.querySelector('#mt-results');
    if (el) el.innerHTML = this.resultsHtml();
  }

  render() {
    const lang = this.language;
    const trickyN = [...this.tricky].filter(k => (this.index || {})[k]).length;
    const tab = (mode, label, badge) => `
      <button data-mt-mode="${mode}" class="px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${this.mode === mode ? 'bg-primary text-white border-primary' : 'border-gray-200 dark:border-gray-700 hover:border-primary'}">${label}${badge ? ` <span class="ms-0.5 px-1.5 rounded-full text-[0.65rem] ${this.mode === mode ? 'bg-white/25' : 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300'}">${badge}</span>` : ''}</button>`;

    const browseTools = this.mode === 'browse' ? `
      <div class="flex flex-wrap items-center justify-center gap-2 mb-3">
        <select id="mt-surah" aria-label="${this.tt('select_surah')}" class="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm">
          ${SURAH_DATA.map(s => {
            const n = Object.keys(this.index || {}).filter(k => k.startsWith(s.number + ':')).length;
            return `<option value="${s.number}" ${s.number === this.surah ? 'selected' : ''}>${this.esc(formatSurahOption(s, lang))}${n ? ` · ${n}` : ''}</option>`;
          }).join('')}
        </select>
        <input id="mt-search" type="search" value="${this.esc(this.query)}" placeholder="${this.tt('mt_search_ph')}" aria-label="${this.tt('search')}"
          class="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm w-40">
        <select id="mt-sort" aria-label="${this.tt('mt_sort')}" class="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm">
          <option value="ayah" ${this.sort === 'ayah' ? 'selected' : ''}>${this.tt('mt_sort_ayah')}</option>
          <option value="most" ${this.sort === 'most' ? 'selected' : ''}>${this.tt('mt_sort_most')}</option>
        </select>
        <button data-mt-random class="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm hover:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">🎲 ${this.tt('mt_random')}</button>
      </div>` : '';

    this.container.innerHTML = `
      <div class="w-full max-w-4xl mx-auto">
        <div class="text-center mb-4">
          <h2 class="text-2xl font-bold mb-1">🪞 ${this.tt('mutashabihat_title')}</h2>
          <p class="text-gray-500 dark:text-gray-400 text-sm">${this.tt('mutashabihat_subtitle')}</p>
        </div>
        <div class="flex flex-wrap items-center justify-center gap-2 mb-3">
          ${tab('browse', this.tt('mt_browse'))}
          ${tab('practice', '🎯 ' + this.tt('mt_practice'))}
          ${tab('tricky', '⭐ ' + this.tt('mt_review_tricky'), trickyN || '')}
        </div>
        ${browseTools}
        ${this.mode === 'browse' ? `<p class="text-xs text-gray-400 dark:text-gray-500 text-center mb-4">${this.tt('mutashabihat_hint')}</p>` : ''}
        <div id="mt-results" class="space-y-3">${this.resultsHtml()}</div>
      </div>`;

    if (this.flashKey) this.flashCard(this.flashKey);
    this.flashKey = null;
  }

  flashCard(key) {
    const id = 'mt-card-' + key.replace(':', '-');
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (!el) return;
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('ring-2', 'ring-primary');
      setTimeout(() => el.classList.remove('ring-2', 'ring-primary'), 1600);
    });
  }

  cardHtml(key) {
    const sims = this.index[key] || [];
    if (!sims.length) return '';
    const [sNum, ayah] = key.split(':');
    const [, topLen, topStart] = sims[0];
    const tricky = this.isTricky(key);
    const chips = sims.map(([ref, len, start]) => {
      const [s] = ref.split(':');
      const st = start || 0;
      const phrase = (this.words[key] || []).slice(st, st + len).join(' ');
      return `<button data-mt-ref="${ref}" data-mt-phrase="${this.esc(phrase)}" title="${this.tt('mutashabihat_shared')}: ${len} ${this.tt('mt_words')}"
                class="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-xs hover:border-primary hover:bg-primary/5 dark:hover:bg-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                <span class="ayah-arabic !text-sm !mb-0 !pb-0 !border-b-0 !leading-none">${this.esc(this.shortName(s))}</span>
                <span class="text-gray-500 dark:text-gray-400">${ref}</span>
                <span class="text-[0.65rem] text-amber-600 dark:text-amber-400">${len} ${this.tt('mt_words')}</span>
              </button>`;
    }).join('');
    return `
      <div id="mt-card-${key.replace(':', '-')}" class="bg-white dark:bg-gray-800 rounded-xl shadow p-4 transition-shadow">
        <div class="flex items-center gap-2 mb-2 text-sm text-gray-500 dark:text-gray-400">
          <span class="ayah-number">${ayah}</span>
          <span>${this.esc(this.surahName(sNum))} · ${this.tt('ayah')} ${ayah}</span>
          <div class="ms-auto flex items-center gap-1">
            <button data-mt-tricky="${key}" title="${this.tt('mt_tricky')}" aria-pressed="${tricky}"
              class="px-2 py-1.5 rounded-lg text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${tricky ? 'text-amber-500' : 'text-gray-300 dark:text-gray-600 hover:text-amber-400'}">${tricky ? '★' : '☆'}</button>
            <button data-mt-copy="${key}" data-label="⧉" title="${this.tt('copy')}"
              class="px-2 py-1.5 rounded-lg text-xs text-gray-400 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">⧉</button>
            <button data-mt-open="${key}" class="px-2 py-1.5 -me-2 rounded-lg text-xs text-primary dark:text-blue-400 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">${this.tt('preview')} ↗</button>
          </div>
        </div>
        <div class="ayah-arabic !text-2xl !leading-[2.4] mb-3" dir="rtl">${this.verseHtml(key, topStart, topLen)}</div>
        <div class="text-xs text-gray-400 dark:text-gray-500 mb-1.5">${this.tt('mutashabihat_similar')} (${sims.length})</div>
        <div class="flex flex-wrap gap-2">${chips}</div>
      </div>`;
  }
}

let mutashabihat;
document.addEventListener('DOMContentLoaded', () => { mutashabihat = new Mutashabihat(); });
