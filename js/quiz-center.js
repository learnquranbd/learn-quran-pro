/**
 * Quiz Center Module (Quiz tab)
 * A shared quiz ENGINE + 9 quiz-type generators for testing Quran knowledge.
 * Renders into #quiz-container when the 'quiz' tab becomes active.
 *
 * Data sources: bundled data/quran-json, data/quran-words.json, data/morphology,
 * data/roots.json, data/tajweed-json + TajweedData, and the quran.com API
 * (QuranData.fetchRange) for word meanings. Every quiz falls back to t('error')
 * when its data/API is unavailable.
 */

class QuizCenter {
  constructor() {
    this.root = document.getElementById('quiz-container');
    if (!this.root) return;

    this.language = (typeof appSettings !== 'undefined' && appSettings)
      ? appSettings.get('language') : 'en';

    this.view = 'home';          // home | config | loading | running | end
    this.currentType = null;     // active quiz-type object
    this.scope = null;           // { kind, surah?, juz? }
    this.subMode = 'next';       // ayah_sequence: next | previous | first | last | random
    this.difficulty = 'mid';     // easy(5) | mid(10) | hifz(20) — sets question count
    this.DIFF = { easy: 5, mid: 10, hifz: 20 };
    this.revealedAyahs = null;   // ayah_sequence blur-strip: Set of revealed ayah numbers

    // Runner state
    this.questions = [];
    this.index = 0;
    this.score = 0;
    this.streak = 0;
    this.answered = false;
    this.newBest = false;
    this.advanceTimer = null;

    // Data caches
    this._surahJson = {};
    this._dupMap = null;         // joined-verse-text -> [surah numbers]
    this._keyText = null;        // "s:a" -> joined text
    this._wordPool = {};         // meaning-quiz word pools keyed by surah:lang

    this.rendered = false;

    this.defineTypes();
    this.injectStyle();

    window.addEventListener('tabChanged', (e) => {
      if (e.detail && e.detail.tabId === 'quiz') {
        if (!this.rendered) { this.rendered = true; this.render(); }
      }
    });

    window.addEventListener('settingChanged', (e) => {
      if (e.detail && e.detail.key === 'language') {
        this.language = e.detail.value;
        if (this.rendered) this.render();
      }
    });

    this.root.addEventListener('click', (e) => this.onClick(e));
  }

  // ---------- one-time feedback animation styles ----------

  injectStyle() {
    if (document.getElementById('quiz-center-style')) return;
    const s = document.createElement('style');
    s.id = 'quiz-center-style';
    s.textContent = `
      @keyframes quizPop { 0%{transform:scale(1)} 40%{transform:scale(1.06)} 100%{transform:scale(1)} }
      @keyframes quizShake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-7px)} 40%{transform:translateX(7px)} 60%{transform:translateX(-5px)} 80%{transform:translateX(5px)} }
      .quiz-pop { animation: quizPop .4s ease; }
      .quiz-shake { animation: quizShake .4s ease; }
    `;
    document.head.appendChild(s);
  }

  // ---------- persistence ----------

  bestKey(type, scope) { return `quizBest:${type}:${scope}`; }

  getBest(type, scope) {
    const v = parseInt(localStorage.getItem(this.bestKey(type, scope)), 10);
    return isNaN(v) ? null : v;
  }

  saveBest(type, scope, score) {
    try { localStorage.setItem(this.bestKey(type, scope), String(score)); } catch (e) { /* ignore */ }
  }

  // ---------- helpers ----------

  shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  sample(arr, n) { return this.shuffle(arr).slice(0, n); }

  rand(n) { return Math.floor(Math.random() * n); }

  esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  ar(text, cls = '!text-3xl') {
    return `<span class="ayah-arabic ${cls}" dir="rtl">${this.esc(text)}</span>`;
  }

  // Load one surah's plain-text verses from bundled quran-json (verse_0 skipped)
  async loadSurahJson(n) {
    if (!this._surahJson[n]) {
      this._surahJson[n] = fetch(`data/quran-json/${n}.json`)
        .then(r => { if (!r.ok) throw new Error('no surah json'); return r.json(); })
        .catch(err => { delete this._surahJson[n]; throw err; });
    }
    return this._surahJson[n];
  }

  // [{ ayah, text }] for a surah, real verses only (verse_0 = bismillah dropped)
  async surahVerses(n) {
    const data = await this.loadSurahJson(n);
    const out = [];
    for (const k in data.verse) {
      const m = k.match(/^verse_(\d+)$/);
      if (m && m[1] !== '0') out.push({ ayah: parseInt(m[1]), text: data.verse[k] });
    }
    return out.sort((a, b) => a.ayah - b.ayah);
  }

  // Which juz (1-30) contains surah:ayah, via JUZ_DATA boundaries
  juzOf(surah, ayah) {
    for (const j of JUZ_DATA) {
      const afterStart = surah > j.startSurah || (surah === j.startSurah && ayah >= j.startAyah);
      const beforeEnd = surah < j.endSurah || (surah === j.endSurah && ayah <= j.endAyah);
      if (afterStart && beforeEnd) return j.number;
    }
    return 1;
  }

  // Every "s:a" verse key contained in a juz (uses SURAH_DATA ayah counts)
  versesInJuz(juzNum) {
    const j = JUZ_DATA.find(x => x.number === juzNum);
    if (!j) return [];
    const keys = [];
    for (let s = j.startSurah; s <= j.endSurah; s++) {
      const info = getSurahByNumber(s);
      if (!info) continue;
      const from = s === j.startSurah ? j.startAyah : 1;
      const to = s === j.endSurah ? j.endAyah : info.ayahCount;
      for (let a = from; a <= to; a++) keys.push(`${s}:${a}`);
    }
    return keys;
  }

  // Duplicate-text index: joined verse text -> [surah numbers], built once
  async buildDupMap() {
    if (this._dupMap) return;
    const words = await QuranData.getQuranWords();
    const map = new Map();     // text -> Set(surah)
    const keyText = {};
    for (const key in words) {
      const text = words[key].join(' ');
      keyText[key] = text;
      const surah = parseInt(key.split(':')[0]);
      let set = map.get(text);
      if (!set) { set = new Set(); map.set(text, set); }
      set.add(surah);
    }
    this._dupMap = map;
    this._keyText = keyText;
  }

  // Primary part-of-speech of a corpus word (array of segments), or null if ambiguous
  posOfWord(segs) {
    const has = (s, f) => (s.f || []).includes(f);
    const prefs = segs.filter(s => has(s, 'PREF'));
    // Only neutral prefixes (definite article, conjunction) are allowed
    if (prefs.some(p => !(has(p, 'DET') || has(p, 'CONJ')))) return null;
    const core = segs.filter(s => !has(s, 'PREF') && !has(s, 'SUFF'));
    if (core.length !== 1) return null;
    const c = core[0];
    const f = c.f || [];
    if (!c.t || f.includes('DEM') || f.includes('REL') || f.includes('INL')) return null;
    if (f.includes('PN')) return 'proper_noun';
    if (f.includes('ADJ')) return 'adjective';
    if (c.g === 'V') return 'verb';
    if (f.includes('PRON') || c.g === 'PRON') return 'pronoun';
    if (c.g === 'P') return 'particle';
    if (c.g === 'N') return 'noun';
    return null;
  }

  coreSegment(segs) {
    const has = (s, f) => (s.f || []).includes(f);
    return segs.filter(s => !has(s, 'PREF') && !has(s, 'SUFF'))[0] || segs[0];
  }

  // ---------- quiz-type definitions ----------

  defineTypes() {
    this.types = [
      { id: 'ayah_sequence', emoji: '🔢', scopes: ['surah'], color: 'from-blue-500 to-indigo-600',
        build: (sc) => this.buildAyahSequence(sc) },
      { id: 'guess_surah', emoji: '🕌', scopes: ['juz', 'whole'], color: 'from-emerald-500 to-teal-600',
        build: (sc) => this.buildGuessSurah(sc) },
      { id: 'word_meaning', emoji: '📖', scopes: ['surah'], color: 'from-amber-500 to-orange-600',
        build: (sc) => this.buildWordMeaning(sc, false) },
      { id: 'meaning_word', emoji: '🔤', scopes: ['surah'], color: 'from-orange-500 to-red-500',
        build: (sc) => this.buildWordMeaning(sc, true) },
      { id: 'grammar_pos', emoji: '🧩', scopes: ['surah', 'whole'], color: 'from-purple-500 to-fuchsia-600',
        build: (sc) => this.buildGrammarPos(sc) },
      { id: 'complete_ayah', emoji: '✍️', scopes: ['surah'], color: 'from-sky-500 to-cyan-600',
        build: (sc) => this.buildCompleteAyah(sc) },
      { id: 'which_juz', emoji: '📚', scopes: ['whole'], color: 'from-rose-500 to-pink-600',
        build: (sc) => this.buildWhichJuz(sc) },
      { id: 'tajweed_rule', emoji: '🎨', scopes: ['surah', 'whole'], color: 'from-lime-500 to-green-600',
        build: (sc) => this.buildTajweedRule(sc) },
      { id: 'same_root', emoji: '🌱', scopes: ['whole'], color: 'from-teal-500 to-emerald-600',
        build: (sc) => this.buildSameRoot(sc) }
    ];
  }

  typeName(t) { return this.tt('quiz_' + t.id + '_name'); }
  typeDesc(t) { return this.tt('quiz_' + t.id + '_desc'); }
  tt(key) { return t(key, this.language); }

  // ---------- click routing ----------

  onClick(e) {
    const el = e.target.closest('[data-action]');
    if (!el || !this.root.contains(el)) return;
    const action = el.getAttribute('data-action');

    switch (action) {
      case 'pick-type':
        this.selectType(el.getAttribute('data-type'));
        break;
      case 'set-scope':
        this.scope = this.defaultScope(this.currentType, el.getAttribute('data-kind'));
        this.render();
        break;
      case 'set-surah':
        if (this.scope) this.scope.surah = parseInt(el.value);
        break;
      case 'set-juz':
        if (this.scope) this.scope.juz = parseInt(el.value);
        break;
      case 'set-sub':
        this.subMode = el.getAttribute('data-sub');
        this.render();
        break;
      case 'set-diff':
        this.difficulty = el.getAttribute('data-diff');
        this.render();
        break;
      case 'start':
        this.start();
        break;
      case 'answer':
        this.answer(el);
        break;
      case 'goto':
        this.gotoVerse(el.getAttribute('data-goto'));
        break;
      case 'play-again':
        this.start();
        break;
      case 'back-menu':
        this.toHome();
        break;
    }
  }

  gotoVerse(ref) {
    if (!ref) return;
    window.location.hash = ref.replace(/^(\d+):(\d+).*$/, '$1:$2');
    if (typeof tabSystem !== 'undefined' && tabSystem) tabSystem.switchTab('reading');
  }

  // ---------- navigation between views ----------

  toHome() {
    if (this.advanceTimer) { clearTimeout(this.advanceTimer); this.advanceTimer = null; }
    this.view = 'home';
    this.currentType = null;
    this.render();
  }

  selectType(id) {
    const type = this.types.find(t => t.id === id);
    if (!type) return;
    this.currentType = type;
    this.subMode = 'next';
    this.scope = this.defaultScope(type, type.scopes[0]);
    this.view = 'config';
    this.render();
  }

  defaultScope(type, kind) {
    kind = kind || type.scopes[0];
    const sc = { kind };
    if (kind === 'surah') sc.surah = (this.scope && this.scope.surah) || 1;
    if (kind === 'juz') sc.juz = (this.scope && this.scope.juz) || 1;
    return sc;
  }

  roundSize() { return this.DIFF[this.difficulty] || 10; }

  // Best scores are tracked per difficulty (question counts differ).
  bestKey() { return `${this.scopeLabel()}:${this.difficulty}`; }

  scopeLabel() {
    const sc = this.scope;
    if (!sc) return 'whole';
    if (sc.kind === 'surah') return `surah:${sc.surah}`;
    if (sc.kind === 'juz') return `juz:${sc.juz}`;
    return 'whole';
  }

  // ---------- start a round ----------

  async start() {
    if (this.advanceTimer) { clearTimeout(this.advanceTimer); this.advanceTimer = null; }
    this.view = 'loading';
    this.render();

    let questions = [];
    try {
      questions = await this.currentType.build(this.scope);
    } catch (err) {
      questions = [];
    }

    // Shuffle each question's options, cap the round to the chosen difficulty
    questions = questions.slice(0, this.roundSize()).map(q => ({
      ...q,
      options: this.shuffle(q.options)
    }));

    if (!questions.length) {
      this.view = 'config';
      this.buildError = true;
      this.render();
      return;
    }

    this.buildError = false;
    this.questions = questions;
    this.index = 0;
    this.score = 0;
    this.streak = 0;
    this.answered = false;
    this.newBest = false;
    // Blur-strip: for ayah_sequence over a surah, reconstruct the surah as you answer.
    this.revealedAyahs = (this.currentType.id === 'ayah_sequence' && this.scope.kind === 'surah') ? new Set() : null;
    this.view = 'running';
    this.render();
  }

  answer(btn) {
    if (this.answered) return;
    this.answered = true;
    const q = this.questions[this.index];
    const i = parseInt(btn.getAttribute('data-i'));
    const chosen = q.options[i];
    const correct = !!(chosen && chosen.correct);

    if (correct) { this.score++; this.streak++; } else { this.streak = 0; }

    // Reveal this ayah on the surah blur-strip (answered, so show it).
    if (this.revealedAyahs && q.answerAyah != null) {
      this.revealedAyahs.add(q.answerAyah);
      const chip = this.root.querySelector(`[data-ayah-chip="${q.answerAyah}"]`);
      if (chip) {
        chip.classList.remove('bg-gray-200', 'dark:bg-gray-700', 'text-gray-400', 'blur-[1.5px]');
        chip.classList.add('bg-green-500', 'text-white', 'quiz-pop');
      }
    }

    // Reveal: every correct option greens, a wrong pick reds + shakes
    this.root.querySelectorAll('[data-action="answer"]').forEach(b => {
      const bi = parseInt(b.getAttribute('data-i'));
      b.disabled = true;
      b.classList.remove('hover:border-primary', 'dark:hover:border-blue-400');
      if (q.options[bi].correct) {
        b.classList.remove('border-gray-200', 'dark:border-gray-700', 'bg-white', 'dark:bg-gray-800');
        b.classList.add('border-green-500', 'bg-green-100', 'dark:bg-green-900/40', 'text-green-800', 'dark:text-green-200', 'quiz-pop');
        b.insertAdjacentHTML('afterbegin', '<span class="mr-1">✓</span>');
      } else if (b === btn) {
        b.classList.remove('border-gray-200', 'dark:border-gray-700', 'bg-white', 'dark:bg-gray-800');
        b.classList.add('border-red-500', 'bg-red-100', 'dark:bg-red-900/40', 'text-red-800', 'dark:text-red-200', 'quiz-shake');
      }
    });

    const fb = document.getElementById('quiz-feedback');
    if (fb) {
      fb.innerHTML = correct
        ? `<span class="text-green-600 dark:text-green-400 font-semibold">✓ ${this.tt('quiz_correct')}</span>`
        : `<span class="text-red-600 dark:text-red-400 font-semibold">✕ ${this.tt('quiz_wrong')}</span>`
          + (q.explanation ? ` <span class="text-gray-500 dark:text-gray-400">— ${q.explanation}</span>` : '');
    }

    this.advanceTimer = setTimeout(() => {
      this.advanceTimer = null;
      this.index++;
      this.answered = false;
      if (this.index >= this.questions.length) {
        const scope = this.bestKey();
        const best = this.getBest(this.currentType.id, scope);
        if (best === null || this.score > best) {
          this.saveBest(this.currentType.id, scope, this.score);
          this.newBest = true;
        }
        this.view = 'end';
      }
      this.render();
    }, 1100);
  }

  // ---------- rendering ----------

  render() {
    if (!this.root) return;
    const dir = (typeof isRTL === 'function' && isRTL(this.language)) ? 'rtl' : 'ltr';
    let body = '';
    if (this.view === 'home') body = this.renderHome();
    else if (this.view === 'config') body = this.renderConfig();
    else if (this.view === 'loading') body = this.renderLoading();
    else if (this.view === 'running') body = this.renderRunning();
    else if (this.view === 'end') body = this.renderEnd();
    this.root.innerHTML = `<div dir="${dir}" class="max-w-3xl mx-auto">${body}</div>`;
  }

  renderHome() {
    const lang = this.language;
    const cards = this.types.map(type => `
      <button data-action="pick-type" data-type="${type.id}"
              class="text-left rounded-2xl p-5 text-white shadow-lg bg-gradient-to-br ${type.color}
                     hover:scale-[1.02] transition-transform focus:outline-none focus:ring-2 focus:ring-white/60">
        <div class="text-4xl mb-2">${type.emoji}</div>
        <div class="text-lg font-bold leading-tight">${this.esc(this.typeName(type))}</div>
        <div class="text-sm text-white/85 mt-1">${this.esc(this.typeDesc(type))}</div>
      </button>
    `).join('');

    return `
      <div class="text-center mb-6">
        <h2 class="text-2xl font-bold">🎯 ${t('quiz_center_title', lang)}</h2>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">${t('quiz_center_subtitle', lang)}</p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">${cards}</div>
    `;
  }

  renderConfig() {
    const lang = this.language;
    const type = this.currentType;
    const scope = this.scope;

    // Scope selector (only when the type offers more than one scope)
    let scopeUI = '';
    if (type.scopes.length > 1) {
      scopeUI += `
        <div class="flex flex-wrap justify-center gap-2 mb-4">
          ${type.scopes.map(k => {
            const active = scope.kind === k;
            return `<button data-action="set-scope" data-kind="${k}"
                      class="px-4 py-2 rounded-lg text-sm font-medium transition-colors ${active
                        ? 'bg-primary text-white dark:bg-blue-600'
                        : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}">
                      ${t('quiz_scope_' + k, lang)}</button>`;
          }).join('')}
        </div>`;
    }

    // Picker for the chosen scope
    let pickerUI = '';
    if (scope.kind === 'surah') {
      pickerUI = `
        <label class="block text-sm text-gray-500 dark:text-gray-400 mb-1">${t('select_surah', lang)}</label>
        <select data-action="set-surah"
                class="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600">
          ${SURAH_DATA.map(s => `<option value="${s.number}" ${s.number === scope.surah ? 'selected' : ''}>${this.esc(formatSurahOption(s, lang))}</option>`).join('')}
        </select>`;
    } else if (scope.kind === 'juz') {
      pickerUI = `
        <label class="block text-sm text-gray-500 dark:text-gray-400 mb-1">${t('juz', lang)}</label>
        <select data-action="set-juz"
                class="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600">
          ${JUZ_DATA.map(j => `<option value="${j.number}" ${j.number === scope.juz ? 'selected' : ''}>${t('juz', lang)} ${j.number}</option>`).join('')}
        </select>`;
    }

    // Direction sub-mode for the ayah-sequence quiz
    let subUI = '';
    if (type.id === 'ayah_sequence') {
      const b = (sub, label) => `<button data-action="set-sub" data-sub="${sub}"
          class="px-3 py-2 rounded-lg text-sm font-medium transition-colors ${this.subMode === sub
            ? 'bg-primary text-white dark:bg-blue-600'
            : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}">${label}</button>`;
      subUI = `<div class="flex flex-wrap justify-center gap-2 mb-4">
                 ${b('next', t('next', lang))}${b('previous', t('previous', lang))}
                 ${b('first', t('quiz_sub_first', lang))}${b('last', t('quiz_sub_last', lang))}
                 ${b('random', t('quiz_sub_random', lang))}
               </div>`;
    }

    // Difficulty (question count) — all quiz types
    const diffBtn = (d, label) => `<button data-action="set-diff" data-diff="${d}"
        class="px-3 py-2 rounded-lg text-sm font-medium transition-colors ${this.difficulty === d
          ? 'bg-secondary text-white'
          : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}">${label}<span class="block text-[10px] opacity-70">${this.DIFF[d]}${t('quiz_q_short', lang)}</span></button>`;
    const diffUI = `<div class="flex flex-wrap justify-center gap-2 mb-4">
        ${diffBtn('easy', t('quiz_diff_easy', lang))}${diffBtn('mid', t('quiz_diff_mid', lang))}${diffBtn('hifz', t('quiz_diff_hifz', lang))}
      </div>`;

    const best = this.getBest(type.id, this.bestKey());

    return `
      <div class="mb-4">
        <button data-action="back-menu" class="text-sm text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400">← ${t('back', lang)}</button>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 text-center">
        <div class="text-5xl mb-2">${type.emoji}</div>
        <h2 class="text-xl font-bold">${this.esc(this.typeName(type))}</h2>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-5">${this.esc(this.typeDesc(type))}</p>
        ${scopeUI}
        ${subUI}
        ${diffUI}
        <div class="max-w-sm mx-auto text-left mb-5">${pickerUI}</div>
        ${this.buildError ? `<p class="text-sm text-red-600 dark:text-red-400 mb-4">${t('quiz_no_data', lang)}</p>` : ''}
        <button data-action="start"
                class="px-8 py-3 bg-primary hover:bg-primary/80 text-white rounded-xl font-semibold transition-colors">
          ${t('quiz_start', lang)}
        </button>
        ${best !== null ? `<p class="text-sm text-gray-500 dark:text-gray-400 mt-4">${t('best_score', lang)}: ${best}/${this.roundSize()}</p>` : ''}
      </div>
    `;
  }

  renderLoading() {
    return `
      <div class="flex flex-col items-center justify-center py-24">
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
        <p class="mt-4 text-gray-500 dark:text-gray-400">${this.tt('loading')}</p>
      </div>`;
  }

  // Blur-strip: shows the surah's ayahs, blurred, revealing each as you answer it.
  sequenceStripHtml() {
    if (!this.revealedAyahs) return '';
    const info = (typeof getSurahByNumber === 'function') ? getSurahByNumber(this.scope.surah) : null;
    const N = info ? info.ayahCount : Math.max(1, ...this.questions.map(q => q.answerAyah || 1));
    let chips = '';
    for (let a = 1; a <= N; a++) {
      const on = this.revealedAyahs.has(a);
      chips += `<span data-ayah-chip="${a}" class="inline-flex items-center justify-center w-7 h-7 rounded-md text-xs font-medium transition-all ${
        on ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-400 blur-[1.5px]'}">${a}</span>`;
    }
    return `
      <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-3 mb-4">
        <div class="text-xs text-gray-400 mb-2 text-center">${this.tt('quiz_surah_progress')} — <b class="text-gray-600 dark:text-gray-300">${this.revealedAyahs.size}/${N}</b></div>
        <div class="flex flex-wrap gap-1 justify-center">${chips}</div>
      </div>`;
  }

  renderRunning() {
    const lang = this.language;
    const q = this.questions[this.index];
    const total = this.questions.length;

    const options = q.options.map((o, i) => `
      <button data-action="answer" data-i="${i}" dir="auto"
              class="w-full px-4 py-4 rounded-xl text-lg font-medium border-2 border-gray-200 dark:border-gray-700
                     bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100
                     hover:border-primary dark:hover:border-blue-400 transition-colors text-center">
        ${o.html}
      </button>`).join('');

    return `
      <div class="mb-3">
        <button data-action="back-menu" class="text-sm text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400">← ${t('back', lang)}</button>
      </div>
      <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-3">
        <span>${t('quiz_question_of', lang).replace('{current}', this.index + 1).replace('{total}', total)}</span>
        <span class="flex items-center gap-3">
          <span>${t('score', lang)}: <b class="text-gray-700 dark:text-gray-200">${this.score}</b></span>
          <span>🔥 ${t('quiz_streak', lang)}: <b class="text-gray-700 dark:text-gray-200">${this.streak}</b></span>
        </span>
      </div>
      <div class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-5">
        <div class="h-full bg-secondary transition-all duration-300" style="width:${Math.round((this.index / total) * 100)}%"></div>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8 text-center mb-5">
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">${this.esc(q.prompt)}</p>
        <div>${q.promptHtml}</div>
        ${q.gotoVerse ? `<button data-action="goto" data-goto="${q.gotoVerse}"
            class="mt-4 text-xs text-primary dark:text-blue-400 hover:underline">↗ ${t('quiz_view_verse', lang)}</button>` : ''}
      </div>
      ${this.sequenceStripHtml()}
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">${options}</div>
      <div id="quiz-feedback" class="mt-4 text-center min-h-[1.5rem] text-sm"></div>
    `;
  }

  renderEnd() {
    const lang = this.language;
    const total = this.questions.length;
    const pct = Math.round((this.score / total) * 100);
    const stars = pct >= 90 ? 3 : pct >= 60 ? 2 : 1;
    const best = this.getBest(this.currentType.id, this.bestKey());
    const starStr = '★'.repeat(stars) + '☆'.repeat(3 - stars);

    return `
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-10 text-center space-y-4">
        <div class="text-5xl">${pct >= 90 ? '🏆' : pct >= 60 ? '🎉' : '📚'}</div>
        <h3 class="text-xl font-bold">${t('quiz_complete', lang)}</h3>
        <div class="text-4xl text-amber-500 tracking-widest">${starStr}</div>
        <p class="text-3xl font-bold text-primary dark:text-blue-400">
          ${t('quiz_your_score', lang).replace('{score}', this.score).replace('{total}', total)}
        </p>
        <p class="text-sm text-gray-500 dark:text-gray-400">${pct}%</p>
        ${this.newBest
          ? `<p class="text-green-600 dark:text-green-400 font-medium">🌟 ${t('quiz_new_best', lang)}</p>`
          : (best !== null ? `<p class="text-sm text-gray-500 dark:text-gray-400">${t('best_score', lang)}: ${best}/${total}</p>` : '')}
        <div class="flex flex-wrap justify-center gap-3 pt-2">
          <button data-action="play-again"
                  class="px-6 py-3 bg-primary hover:bg-primary/80 text-white rounded-xl font-medium transition-colors">
            ${t('play_again', lang)}
          </button>
          <button data-action="back-menu"
                  class="px-6 py-3 rounded-xl font-medium border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            ${t('back', lang)}
          </button>
        </div>
      </div>
    `;
  }

  // ---------- generators ----------

  // 1. Ayah sequence: next / previous / first / last / random within one surah
  async buildAyahSequence(scope) {
    const verses = await this.surahVerses(scope.surah);
    if (verses.length < 3) return [];
    const surahNum = scope.surah;
    const N = verses.length;
    const info = (typeof getSurahByNumber === 'function') ? getSurahByNumber(surahNum) : null;
    const surahName = info ? (info.name || info.englishName || `Surah ${surahNum}`) : `Surah ${surahNum}`;

    const makeDir = (i, dir) => {
      const shown = verses[i];
      const answer = verses[dir === 'next' ? i + 1 : i - 1];
      const distractors = this.sample(verses.filter(v => v.ayah !== shown.ayah && v.ayah !== answer.ayah), 3);
      return {
        prompt: dir === 'next' ? this.tt('quiz_which_next') : this.tt('quiz_which_prev'),
        promptHtml: this.ar(shown.text, '!text-3xl') + `<div class="text-xs text-gray-400 mt-2">${surahNum}:${shown.ayah}</div>`,
        options: [{ html: this.ar(answer.text, '!text-2xl'), correct: true }]
          .concat(distractors.map(v => ({ html: this.ar(v.text, '!text-2xl'), correct: false }))),
        gotoVerse: `${surahNum}:${shown.ayah}`, answerAyah: answer.ayah, surahNum
      };
    };
    const makeEnd = (which) => {
      const answer = which === 'first' ? verses[0] : verses[N - 1];
      const distractors = this.sample(verses.filter(v => v.ayah !== answer.ayah), 3);
      return {
        prompt: which === 'first' ? this.tt('quiz_which_first') : this.tt('quiz_which_last'),
        promptHtml: `<div class="text-2xl font-bold">${this.esc(surahName)}</div><div class="text-xs text-gray-400 mt-1">${surahNum}</div>`,
        options: [{ html: this.ar(answer.text, '!text-2xl'), correct: true }]
          .concat(distractors.map(v => ({ html: this.ar(v.text, '!text-2xl'), correct: false }))),
        gotoVerse: `${surahNum}:${answer.ayah}`, answerAyah: answer.ayah, surahNum
      };
    };

    const size = this.roundSize();
    if (this.subMode === 'first' || this.subMode === 'last') {
      return Array.from({ length: size }, () => makeEnd(this.subMode));
    }
    if (this.subMode === 'random') {
      const nextPos = verses.map((_, i) => i).filter(i => i < N - 1).map(i => ['next', i]);
      const prevPos = verses.map((_, i) => i).filter(i => i > 0).map(i => ['previous', i]);
      let pool = this.shuffle(nextPos.concat(prevPos)).map(([d, i]) => makeDir(i, d));
      pool = this.shuffle([makeEnd('first'), makeEnd('last')].concat(pool));
      return pool.slice(0, size);
    }
    const next = this.subMode !== 'previous';
    const positions = verses.map((_, i) => i).filter(i => next ? i < N - 1 : i > 0);
    return this.shuffle(positions).slice(0, size).map(i => makeDir(i, next ? 'next' : 'previous'));
  }

  // 2. Guess the surah of a verse (multiple correct when text repeats across surahs)
  async buildGuessSurah(scope) {
    await this.buildDupMap();
    const words = await QuranData.getQuranWords();
    const pool = scope.kind === 'juz'
      ? this.versesInJuz(scope.juz)
      : Object.keys(words);

    // Candidate verses: >=3 words, not repeated in more than 3 surahs
    const candidates = pool.filter(k => {
      const w = words[k];
      if (!w || w.length < 3) return false;
      const set = this._dupMap.get(w.join(' '));
      return set && set.size <= 3;
    });
    if (!candidates.length) return [];

    const questions = [];
    for (const key of this.shuffle(candidates).slice(0, this.roundSize())) {
      const text = words[key].join(' ');
      const correctSurahs = [...this._dupMap.get(text)];
      const others = this.sample(
        SURAH_DATA.map(s => s.number).filter(n => !correctSurahs.includes(n)),
        Math.max(0, 4 - correctSurahs.length)
      );
      const opts = correctSurahs.map(n => ({ n, correct: true }))
        .concat(others.map(n => ({ n, correct: false })));
      questions.push({
        prompt: this.tt('quiz_which_surah'),
        promptHtml: this.ar(text, '!text-2xl'),
        multi: correctSurahs.length > 1,
        options: opts.slice(0, 4).map(o => ({
          html: this.esc(getSurahName(o.n, this.language)),
          correct: o.correct
        })),
        gotoVerse: key
      });
    }
    return questions;
  }

  // 3 / 4. Word <-> meaning (reverse=true => show meaning, pick Arabic word)
  async buildWordMeaning(scope, reverse) {
    const cacheKey = `${scope.surah}:${this.language}`;
    let pool = this._wordPool[cacheKey];
    if (!pool) {
      const info = getSurahByNumber(scope.surah);
      if (!info) return [];
      const verses = await QuranData.fetchRange(scope.surah, 1, info.ayahCount, this.language);
      const seen = new Set();
      pool = [];
      verses.forEach(v => (v.words || []).forEach(w => {
        const meaning = (w.meaning || '').trim();
        if (!meaning || !w.arabic) return;
        const dedupe = meaning.toLowerCase();
        if (seen.has(dedupe)) return;
        seen.add(dedupe);
        pool.push({ arabic: w.arabic, meaning, key: v.key });
      }));
      this._wordPool[cacheKey] = pool;
    }
    if (pool.length < 4) return [];

    const questions = [];
    for (const q of this.shuffle(pool).slice(0, this.roundSize())) {
      const distractors = this.sample(pool.filter(w => w !== q), 3);
      let options;
      if (reverse) {
        options = [{ html: this.ar(q.arabic, '!text-3xl'), correct: true }]
          .concat(distractors.map(w => ({ html: this.ar(w.arabic, '!text-3xl'), correct: false })));
      } else {
        options = [{ html: this.esc(q.meaning), correct: true }]
          .concat(distractors.map(w => ({ html: this.esc(w.meaning), correct: false })));
      }
      questions.push({
        prompt: reverse ? this.tt('quiz_which_word') : this.tt('quiz_which_meaning'),
        promptHtml: reverse
          ? `<div class="text-2xl font-semibold" dir="auto">${this.esc(q.meaning)}</div>`
          : this.ar(q.arabic, '!text-5xl'),
        options,
        gotoVerse: q.key
      });
    }
    return questions;
  }

  // 5. Grammar: part of speech of a word
  async buildGrammarPos(scope) {
    const POS = ['noun', 'verb', 'particle', 'pronoun'];
    const candidates = [];

    const collectFromSurah = async (n) => {
      const morph = await QuranData.getMorphology(n);
      for (const ayah in morph) {
        for (const segs of morph[ayah]) {
          const pos = this.posOfWord(segs);
          if (!pos) continue;
          candidates.push({
            surah: n, ayah: parseInt(ayah),
            text: segs.map(s => s.t).join(''),
            pos,
            hint: corpusDescribe(this.coreSegment(segs))
          });
        }
      }
    };

    try {
      if (scope.kind === 'surah') {
        await collectFromSurah(scope.surah);
      } else {
        // Whole Quran: sample a handful of random surahs
        const surahs = this.sample(SURAH_DATA.map(s => s.number), 12);
        for (const n of surahs) {
          try { await collectFromSurah(n); } catch (e) { /* skip surah */ }
          if (candidates.length >= 120) break;
        }
      }
    } catch (e) { return []; }
    if (candidates.length < 4) return [];

    const questions = [];
    for (const c of this.shuffle(candidates).slice(0, this.roundSize())) {
      const pool = POS.slice();
      if ((c.pos === 'proper_noun' || c.pos === 'adjective') && !pool.includes(c.pos)) pool.push(c.pos);
      const others = this.sample(pool.filter(p => p !== c.pos), 3);
      const options = [{ html: this.esc(this.tt('quiz_pos_' + c.pos)), correct: true }]
        .concat(others.map(p => ({ html: this.esc(this.tt('quiz_pos_' + p)), correct: false })));
      questions.push({
        prompt: this.tt('quiz_which_pos'),
        promptHtml: this.ar(c.text, '!text-5xl'),
        options,
        explanation: this.esc(c.hint),
        gotoVerse: `${c.surah}:${c.ayah}`
      });
    }
    return questions;
  }

  // 6. Complete the ayah: one word blanked out
  async buildCompleteAyah(scope) {
    const words = await QuranData.getQuranWords();
    const keys = Object.keys(words).filter(k => k.startsWith(scope.surah + ':') && words[k].length >= 4);
    if (!keys.length) return [];

    // Word bank of the whole surah for distractors
    const bank = [];
    keys.forEach(k => words[k].forEach(w => bank.push(w)));
    const uniqueBank = [...new Set(bank)];
    if (uniqueBank.length < 4) return [];

    const questions = [];
    for (const key of this.shuffle(keys).slice(0, this.roundSize())) {
      const arr = words[key];
      const blankIdx = this.rand(arr.length);
      const answer = arr[blankIdx];
      const shown = arr.map((w, i) => i === blankIdx
        ? '<span class="inline-block min-w-[3rem] border-b-2 border-dashed border-primary dark:border-blue-400 mx-1">____</span>'
        : this.esc(w)).join(' ');
      const distractors = this.sample(uniqueBank.filter(w => w !== answer), 3);
      const options = [{ html: this.ar(answer, '!text-2xl'), correct: true }]
        .concat(distractors.map(w => ({ html: this.ar(w, '!text-2xl'), correct: false })));
      questions.push({
        prompt: this.tt('quiz_fill_blank'),
        promptHtml: `<div class="ayah-arabic !text-3xl !leading-loose" dir="rtl">${shown}</div>`,
        options,
        gotoVerse: key
      });
    }
    return questions;
  }

  // 7. Which juz does an ayah belong to
  async buildWhichJuz(scope) {
    const questions = [];
    let attempts = 0;
    while (questions.length < this.roundSize() && attempts < this.roundSize() * 6) {
      attempts++;
      const surahNum = 1 + this.rand(114);
      let verses;
      try { verses = await this.surahVerses(surahNum); } catch (e) { continue; }
      if (!verses.length) continue;
      const v = verses[this.rand(verses.length)];
      const juz = this.juzOf(surahNum, v.ayah);

      // Options: correct + nearby juz numbers
      const opts = new Set([juz]);
      let spread = 1;
      while (opts.size < 4) {
        if (juz - spread >= 1) opts.add(juz - spread);
        if (opts.size < 4 && juz + spread <= 30) opts.add(juz + spread);
        spread++;
        if (spread > 30) break;
      }
      const options = [...opts].map(n => ({
        html: `${t('juz', this.language)} ${n}`,
        correct: n === juz
      }));
      questions.push({
        prompt: this.tt('quiz_which_juz'),
        promptHtml: this.ar(v.text, '!text-2xl') + `<div class="text-xs text-gray-400 mt-2">${getSurahName(surahNum, this.language)} · ${surahNum}:${v.ayah}</div>`,
        options,
        gotoVerse: `${surahNum}:${v.ayah}`
      });
    }
    return questions;
  }

  // 8. Tajweed: which rule applies to a highlighted span
  async buildTajweedRule(scope) {
    const ruleKeys = Object.keys(TAJWEED_RULES);
    const items = [];

    const collect = async (n) => {
      const data = await TajweedData.load(n);
      for (const vk in data.rules) {
        const m = vk.match(/^verse_(\d+)$/);
        if (!m || m[1] === '0') continue;
        const text = data.text[vk];
        const anns = data.rules[vk];
        if (!text || !anns || !anns.length) continue;
        const ann = anns[this.rand(anns.length)];
        if (!TAJWEED_RULES[ann.rule]) continue;
        const start = Math.max(0, ann.start), end = Math.min(text.length, ann.end);
        if (end <= start) continue;
        items.push({ surah: n, ayah: parseInt(m[1]), text, start, end, rule: ann.rule });
      }
    };

    try {
      if (scope.kind === 'surah') {
        await collect(scope.surah);
      } else {
        const surahs = this.sample(SURAH_DATA.map(s => s.number), 15);
        for (const n of surahs) {
          try { await collect(n); } catch (e) { /* skip */ }
          if (items.length >= 100) break;
        }
      }
    } catch (e) { return []; }
    if (!items.length) return [];

    const esc = s => this.esc(s);
    const questions = [];
    for (const it of this.shuffle(items).slice(0, this.roundSize())) {
      const before = esc(it.text.slice(0, it.start));
      const hit = esc(it.text.slice(it.start, it.end));
      const after = esc(it.text.slice(it.end));
      const promptHtml = `<div class="ayah-arabic !text-3xl !leading-loose" dir="rtl">${before}<span class="bg-yellow-200 dark:bg-yellow-500/40 rounded px-0.5">${hit}</span>${after}</div>`;
      const others = this.sample(ruleKeys.filter(k => k !== it.rule), 3);
      const options = [{ html: this.esc(TAJWEED_RULES[it.rule].label), correct: true }]
        .concat(others.map(k => ({ html: this.esc(TAJWEED_RULES[k].label), correct: false })));
      questions.push({
        prompt: this.tt('quiz_which_rule'),
        promptHtml,
        options,
        explanation: this.esc(t('tjd_' + it.rule, this.language)),
        gotoVerse: `${it.surah}:${it.ayah}`
      });
    }
    return questions;
  }

  // 9. Same root: pick the word sharing the shown word's root
  async buildSameRoot(scope) {
    const [roots, words] = await Promise.all([QuranData.getRoots(), QuranData.getQuranWords()]);
    const surfaceOf = (occ) => {
      const parts = occ.split(':');
      const arr = words[`${parts[0]}:${parts[1]}`];
      const w = arr && arr[parseInt(parts[2]) - 1];
      return w || null;
    };

    // Roots with at least two distinct surface forms
    const rootKeys = Object.keys(roots).filter(r => roots[r].length >= 2 && r.length >= 2);
    if (rootKeys.length < 4) return [];

    const questions = [];
    let attempts = 0;
    for (const root of this.shuffle(rootKeys)) {
      if (questions.length >= this.roundSize() || attempts > this.roundSize() * 6) break;
      attempts++;
      const occs = this.shuffle(roots[root]);
      const shownOcc = occs[0];
      const shown = surfaceOf(shownOcc);
      if (!shown) continue;
      // A different occurrence of the same root (prefer a different surface form)
      const answerOcc = occs.slice(1).map(o => ({ o, s: surfaceOf(o) }))
        .find(x => x.s && x.s !== shown) || occs.slice(1).map(o => ({ o, s: surfaceOf(o) })).find(x => x.s);
      if (!answerOcc) continue;

      // Distractors from other roots
      const distractors = [];
      const usedText = new Set([shown, answerOcc.s]);
      for (const dr of this.shuffle(rootKeys)) {
        if (dr === root) continue;
        const w = surfaceOf(roots[dr][this.rand(roots[dr].length)]);
        if (w && !usedText.has(w)) { usedText.add(w); distractors.push(w); }
        if (distractors.length >= 3) break;
      }
      if (distractors.length < 3) continue;

      const options = [{ html: this.ar(answerOcc.s, '!text-3xl'), correct: true }]
        .concat(distractors.map(w => ({ html: this.ar(w, '!text-3xl'), correct: false })));
      questions.push({
        prompt: this.tt('quiz_same_root'),
        promptHtml: this.ar(shown, '!text-5xl'),
        options,
        explanation: `${this.tt('quiz_root_label')}: ${root.split('').join(' ')}`,
        gotoVerse: `${shownOcc.split(':')[0]}:${shownOcc.split(':')[1]}`
      });
    }
    return questions;
  }
}

// Initialize when DOM is ready
let quizCenter;
document.addEventListener('DOMContentLoaded', () => {
  quizCenter = new QuizCenter();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { QuizCenter };
}
