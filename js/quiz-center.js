/**
 * Quiz Center Module (Quiz tab)
 * A shared quiz ENGINE + 14 quiz-type generators for testing Quran knowledge,
 * plus an Exam mode that mixes questions from several generators into one
 * longer graded round (pass/merit bands, per-type breakdown, optional timer).
 * Renders into #quiz-container when the 'quiz' tab becomes active.
 *
 * Data sources: bundled data/quran-json, data/quran-words.json, data/morphology,
 * data/roots.json, data/sarf.json, data/word-index.json, SURAH_DATA/JUZ_DATA,
 * data/tajweed-json + TajweedData, and the quran.com API
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

    // Exam mode (mixed-type test) settings
    this.examLen = 20;           // exam question count: 10 | 20 | 30
    this.EXAM_LENS = [10, 20, 30];
    this.examTimePer = 0;        // seconds per exam question (0 = no timer)
    this.EXAM_TIMES = [0, 15, 30];
    this.qTimer = null;          // per-question countdown interval (exam mode)
    this.timeLeft = 0;

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

    // <select> pickers fire 'change' (not 'click') on mobile native pickers and keyboard
    this.root.addEventListener('change', (e) => {
      const el = e.target.closest('[data-action]');
      if (!el || !this.root.contains(el)) return;
      const action = el.getAttribute('data-action');
      if (action === 'set-surah' && this.scope) this.scope.surah = parseInt(el.value);
      else if (action === 'set-juz' && this.scope) this.scope.juz = parseInt(el.value);
    });

    // Keyboard answering: press 1-4 to pick an option while a question is up
    document.addEventListener('keydown', (e) => {
      if (typeof tabSystem !== 'undefined' && tabSystem && tabSystem.getActiveTab() !== 'quiz') return;
      if (this.view !== 'running' || this.answered) return;
      const tag = (e.target && e.target.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'select' || tag === 'textarea') return;
      const n = parseInt(e.key, 10);
      if (n >= 1 && n <= 4) {
        const btn = this.root.querySelector(`[data-action="answer"][data-i="${n - 1}"]`);
        if (btn && !btn.disabled) { e.preventDefault(); this.answer(btn); }
      }
    });
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

  // Sarf tables ({ order: [roots], roots: { root: { gloss, verbs, nouns } } }), loaded once
  loadSarf() {
    if (!this._sarfPromise) {
      this._sarfPromise = fetch('data/sarf.json')
        .then(r => { if (!r.ok) throw new Error('no sarf json'); return r.json(); })
        .catch(err => { this._sarfPromise = null; throw err; });
    }
    return this._sarfPromise;
  }

  // Localized root gloss: SARF_GLOSS (js/sarf.js) if present, else the English gloss
  sarfGloss(sarf, root) {
    const map = (typeof SARF_GLOSS !== 'undefined' && SARF_GLOSS) ? SARF_GLOSS[this.language] : null;
    return (map && map[root]) || (sarf.roots[root] && sarf.roots[root].gloss) || '';
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
      { id: 'exam', emoji: '🎓', scopes: ['surah', 'juz', 'whole'], color: 'from-slate-600 to-gray-900', exam: true,
        build: (sc) => this.buildExam(sc) },
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
        build: (sc) => this.buildSameRoot(sc) },
      { id: 'revelation_type', emoji: '🕋', scopes: ['whole'], color: 'from-indigo-500 to-violet-600',
        build: (sc) => this.buildRevelationType(sc) },
      { id: 'ayah_count', emoji: '📏', scopes: ['whole'], color: 'from-cyan-500 to-blue-600',
        build: (sc) => this.buildAyahCount(sc) },
      { id: 'root_family', emoji: '🌳', scopes: ['whole'], color: 'from-green-500 to-lime-600',
        build: (sc) => this.buildRootFamily(sc) },
      { id: 'word_frequency', emoji: '📊', scopes: ['whole'], color: 'from-yellow-500 to-amber-600',
        build: (sc) => this.buildWordFrequency(sc) },
      { id: 'surah_juz_start', emoji: '🧭', scopes: ['whole'], color: 'from-red-500 to-rose-600',
        build: (sc) => this.buildSurahJuzStart(sc) }
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
      case 'set-sub':
        this.subMode = el.getAttribute('data-sub');
        this.render();
        break;
      case 'set-diff':
        this.difficulty = el.getAttribute('data-diff');
        this.render();
        break;
      case 'set-exam-len':
        this.examLen = parseInt(el.getAttribute('data-len')) || 20;
        this.render();
        break;
      case 'set-exam-time':
        this.examTimePer = parseInt(el.getAttribute('data-sec')) || 0;
        this.render();
        break;
      case 'start':
        this.start();
        break;
      case 'answer':
        this.answer(el);
        break;
      case 'show-ayah': {
        const full = el.getAttribute('data-ref');   // full "s:a" ref (review cards)
        const a = el.getAttribute('data-ayah');     // ayah within the quiz surah (strip chips)
        if (typeof ayahModal !== 'undefined' && ayahModal) {
          if (full) ayahModal.open(full.replace(/^(\d+):(\d+).*$/, '$1:$2'));
          else if (this.scope && this.scope.surah) ayahModal.open(`${this.scope.surah}:${a}`);
        }
        break;
      }
      case 'goto':
        this.gotoVerse(el.getAttribute('data-goto'));
        break;
      case 'play-again':
        this.start();
        break;
      case 'retry-missed':
        this.retryMissed();
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
    this.clearQuestionTimer();
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

  roundSize() {
    return (this.currentType && this.currentType.exam) ? this.examLen : (this.DIFF[this.difficulty] || 10);
  }

  // Best scores are tracked per difficulty / exam length (question counts differ).
  // (Named bestScopeKey so it doesn't shadow bestKey(type, scope) above.)
  bestScopeKey() {
    return (this.currentType && this.currentType.exam)
      ? `${this.scopeLabel()}:x${this.examLen}`
      : `${this.scopeLabel()}:${this.difficulty}`;
  }

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
      _ok: false,
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
    this.retryRound = false;
    this.missed = [];   // questions answered incorrectly, for the end-of-round review
    // Blur-strip: for ayah_sequence over a surah, reconstruct the surah as you answer.
    this.revealedAyahs = (this.currentType.id === 'ayah_sequence' && this.scope.kind === 'surah') ? new Set() : null;
    this.wrongAyahs = new Set();
    this.view = 'running';
    this.render();
  }

  // Replay only the questions missed this round (options reshuffled, best score untouched)
  retryMissed() {
    if (!this.missed || !this.missed.length) return;
    if (this.advanceTimer) { clearTimeout(this.advanceTimer); this.advanceTimer = null; }
    this.questions = this.shuffle(this.missed.map(m => m.question)).map(q => ({
      ...q,
      _ok: false,
      options: this.shuffle(q.options)
    }));
    this.index = 0;
    this.score = 0;
    this.streak = 0;
    this.answered = false;
    this.newBest = false;
    this.retryRound = true;
    this.missed = [];
    this.revealedAyahs = (this.currentType.id === 'ayah_sequence' && this.scope.kind === 'surah') ? new Set() : null;
    this.wrongAyahs = new Set();
    this.view = 'running';
    this.render();
  }

  answer(btn) {
    if (this.answered) return;
    this.answered = true;
    this.clearQuestionTimer();
    const q = this.questions[this.index];
    const i = parseInt(btn.getAttribute('data-i'));
    const chosen = q.options[i];
    const correct = !!(chosen && chosen.correct);
    q._ok = correct;   // per-type exam breakdown

    if (correct) { this.score++; this.streak++; }
    else {
      this.streak = 0;
      // Remember what was missed for the end-of-round review
      const right = q.options.find(o => o.correct);
      this.missed.push({ prompt: q.prompt, promptHtml: q.promptHtml, chosenHtml: chosen ? chosen.html : '', correctHtml: right ? right.html : '', gotoVerse: q.gotoVerse || null, question: q });
    }

    // Reveal this ayah on the surah blur-strip — green if you got it right, red if not.
    if (this.revealedAyahs && q.answerAyah != null) {
      this.revealedAyahs.add(q.answerAyah);
      if (!correct) this.wrongAyahs.add(q.answerAyah);
      const chip = this.root.querySelector(`[data-ayah-chip="${q.answerAyah}"]`);
      if (chip) {
        chip.classList.remove('bg-gray-200', 'dark:bg-gray-700', 'text-gray-400', 'blur-[1.5px]');
        chip.classList.add(correct ? 'bg-green-500' : 'bg-red-500', 'text-white', 'quiz-pop', 'cursor-pointer');
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
      fb.innerHTML = (correct
        ? `<span class="text-green-600 dark:text-green-400 font-semibold">✓ ${this.tt('quiz_correct')}</span>`
        : `<span class="text-red-600 dark:text-red-400 font-semibold">✕ ${this.tt('quiz_wrong')}</span>`
          + (q.explanation ? ` <span class="text-gray-500 dark:text-gray-400">— ${q.explanation}</span>` : ''))
        + (q.multi ? `<div class="text-xs text-gray-500 dark:text-gray-400 mt-1">${this.tt('quiz_multi_note')}</div>` : '');
    }

    this.scheduleAdvance();
  }

  // Shared post-answer/timeout advance: next question or the end screen
  scheduleAdvance() {
    this.advanceTimer = setTimeout(() => {
      this.advanceTimer = null;
      this.index++;
      this.answered = false;
      if (this.index >= this.questions.length) {
        // Retry rounds have fewer questions — they don't count towards best scores
        if (!this.retryRound) {
          const scope = this.bestScopeKey();
          const best = this.getBest(this.currentType.id, scope);
          if (best === null || this.score > best) {
            this.saveBest(this.currentType.id, scope, this.score);
            this.newBest = true;
          }
        }
        this.view = 'end';
      }
      this.render();
    }, 1100);
  }

  // ---------- exam per-question countdown (display only; timeout = unanswered) ----------

  clearQuestionTimer() {
    if (this.qTimer) { clearInterval(this.qTimer); this.qTimer = null; }
  }

  startQuestionTimer() {
    this.clearQuestionTimer();
    this.timeLeft = this.examTimePer;
    this.qTimer = setInterval(() => {
      this.timeLeft--;
      const el = document.getElementById('quiz-timer');
      if (el) {
        el.textContent = `⏱ ${Math.max(0, this.timeLeft)}s`;
        if (this.timeLeft <= 5) el.classList.add('text-red-500');
      }
      if (this.timeLeft <= 0) { this.clearQuestionTimer(); this.timeUp(); }
    }, 1000);
  }

  // Countdown expired: counts as unanswered (wrong), reveals the answer, advances
  timeUp() {
    if (this.answered || this.view !== 'running') return;
    this.answered = true;
    const q = this.questions[this.index];
    q._ok = false;
    this.streak = 0;
    const right = q.options.find(o => o.correct);
    this.missed.push({
      prompt: q.prompt, promptHtml: q.promptHtml,
      chosenHtml: `<span class="text-gray-400">⏱ ${this.esc(this.tt('quiz_exam_timeout'))}</span>`,
      correctHtml: right ? right.html : '', gotoVerse: q.gotoVerse || null, question: q
    });

    // Reveal correct option(s), disable the rest — same visual language as answer()
    this.root.querySelectorAll('[data-action="answer"]').forEach(b => {
      const bi = parseInt(b.getAttribute('data-i'));
      b.disabled = true;
      b.classList.remove('hover:border-primary', 'dark:hover:border-blue-400');
      if (q.options[bi].correct) {
        b.classList.remove('border-gray-200', 'dark:border-gray-700', 'bg-white', 'dark:bg-gray-800');
        b.classList.add('border-green-500', 'bg-green-100', 'dark:bg-green-900/40', 'text-green-800', 'dark:text-green-200', 'quiz-pop');
        b.insertAdjacentHTML('afterbegin', '<span class="mr-1">✓</span>');
      }
    });

    const fb = document.getElementById('quiz-feedback');
    if (fb) fb.innerHTML = `<span class="text-red-600 dark:text-red-400 font-semibold">⏱ ${this.tt('quiz_exam_timeout')}</span>`;

    this.scheduleAdvance();
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
    this.root.innerHTML = `<div dir="${dir}" class="w-full">${body}</div>`;

    // Exam countdown lives while an unanswered exam question is on screen
    if (this.view === 'running' && this.currentType && this.currentType.exam
        && this.examTimePer > 0 && !this.answered) {
      this.startQuestionTimer();
    } else {
      this.clearQuestionTimer();
    }
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

    // Difficulty (question count) — exam mode gets its own length + timer pickers
    const optCls = (on) => on
      ? 'bg-secondary text-white'
      : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700';
    let diffUI;
    if (type.exam) {
      const lenBtn = (n) => `<button data-action="set-exam-len" data-len="${n}"
          class="px-4 py-2 rounded-lg text-sm font-medium transition-colors ${optCls(this.examLen === n)}">${n}<span class="block text-[10px] opacity-70">${t('quiz_q_short', lang)}</span></button>`;
      const timeBtn = (s) => `<button data-action="set-exam-time" data-sec="${s}"
          class="px-3 py-2 rounded-lg text-sm font-medium transition-colors ${optCls(this.examTimePer === s)}">${s === 0 ? t('quiz_exam_no_timer', lang) : `⏱ ${s}s`}</button>`;
      diffUI = `
        <div class="text-xs text-gray-400 mb-1">${t('quiz_exam_length', lang)}</div>
        <div class="flex flex-wrap justify-center gap-2 mb-3">${this.EXAM_LENS.map(lenBtn).join('')}</div>
        <div class="text-xs text-gray-400 mb-1">${t('quiz_exam_timer', lang)}</div>
        <div class="flex flex-wrap justify-center gap-2 mb-4">${this.EXAM_TIMES.map(timeBtn).join('')}</div>`;
    } else {
      const diffBtn = (d, label) => `<button data-action="set-diff" data-diff="${d}"
          class="px-3 py-2 rounded-lg text-sm font-medium transition-colors ${optCls(this.difficulty === d)}">${label}<span class="block text-[10px] opacity-70">${this.DIFF[d]}${t('quiz_q_short', lang)}</span></button>`;
      diffUI = `<div class="flex flex-wrap justify-center gap-2 mb-4">
          ${diffBtn('easy', t('quiz_diff_easy', lang))}${diffBtn('mid', t('quiz_diff_mid', lang))}${diffBtn('hifz', t('quiz_diff_hifz', lang))}
        </div>`;
    }

    const best = this.getBest(type.id, this.bestScopeKey());

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
      const wrong = this.wrongAyahs.has(a);
      const cls = on ? (wrong ? 'bg-red-500 text-white cursor-pointer' : 'bg-green-500 text-white cursor-pointer')
                     : 'bg-gray-200 dark:bg-gray-700 text-gray-400 blur-[1.5px]';
      // Revealed chips are clickable → open that ayah inline.
      chips += on
        ? `<button data-action="show-ayah" data-ayah="${a}" data-ayah-chip="${a}" title="${this.scope.surah}:${a}" class="inline-flex items-center justify-center w-7 h-7 rounded-md text-xs font-medium transition-all ${cls}">${a}</button>`
        : `<span data-ayah-chip="${a}" class="inline-flex items-center justify-center w-7 h-7 rounded-md text-xs font-medium transition-all ${cls}">${a}</span>`;
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
              class="relative w-full px-4 py-4 rounded-xl text-lg font-medium border-2 border-gray-200 dark:border-gray-700
                     bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100
                     hover:border-primary dark:hover:border-blue-400 transition-colors text-center">
        <span class="hidden sm:flex absolute top-1.5 left-2 w-5 h-5 rounded-md bg-gray-100 dark:bg-gray-700 text-[10px] text-gray-400 items-center justify-center" aria-hidden="true">${i + 1}</span>
        ${o.html}
      </button>`).join('');

    return `
      <div class="mb-3">
        <button data-action="back-menu" class="text-sm text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400">← ${t('back', lang)}</button>
      </div>
      <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-3">
        <span>${t('quiz_question_of', lang).replace('{current}', this.index + 1).replace('{total}', total)}</span>
        <span class="flex items-center gap-3">
          ${this.currentType.exam && this.examTimePer > 0
            ? `<span id="quiz-timer" class="font-mono font-semibold text-gray-700 dark:text-gray-200">⏱ ${this.examTimePer}s</span>` : ''}
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
        ${q.gotoVerse ? `<button data-action="show-ayah" data-ref="${q.gotoVerse}"
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
    const best = this.getBest(this.currentType.id, this.bestScopeKey());
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
        ${this.examResultHtml(lang, pct)}
        ${this.newBest
          ? `<p class="text-green-600 dark:text-green-400 font-medium">🌟 ${t('quiz_new_best', lang)}</p>`
          : (best !== null && !this.retryRound ? `<p class="text-sm text-gray-500 dark:text-gray-400">${t('best_score', lang)}: ${best}/${total}</p>` : '')}
        <div class="flex flex-wrap justify-center gap-3 pt-2">
          <button data-action="play-again"
                  class="px-6 py-3 bg-primary hover:bg-primary/80 text-white rounded-xl font-medium transition-colors">
            ${t('play_again', lang)}
          </button>
          ${this.missed && this.missed.length ? `<button data-action="retry-missed"
                  class="px-6 py-3 bg-secondary hover:bg-secondary/80 text-white rounded-xl font-medium transition-colors">
            🔁 ${t('quiz_practice_missed', lang)}
          </button>` : ''}
          <button data-action="back-menu"
                  class="px-6 py-3 rounded-xl font-medium border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            ${t('back', lang)}
          </button>
        </div>
      </div>
      ${this.missedReviewHtml(lang)}
    `;
  }

  /** Exam end screen extras: pass/merit band + per-quiz-type breakdown. */
  examResultHtml(lang, pct) {
    if (!this.currentType || !this.currentType.exam) return '';

    // Grade band (pass mark 60%)
    const band = pct >= 90 ? ['excellent', 'text-emerald-600 dark:text-emerald-400', '🏅']
      : pct >= 75 ? ['good', 'text-green-600 dark:text-green-400', '🎖️']
      : pct >= 60 ? ['pass', 'text-amber-600 dark:text-amber-500', '✅']
      : ['fail', 'text-red-600 dark:text-red-400', '📚'];

    // Per-type breakdown from the questions actually asked (q.qType set by buildExam)
    const stats = {};
    this.questions.forEach(q => {
      const id = q.qType || this.currentType.id;
      if (!stats[id]) stats[id] = { c: 0, t: 0 };
      stats[id].t++;
      if (q._ok) stats[id].c++;
    });
    const rows = Object.keys(stats).map(id => {
      const type = this.types.find(x => x.id === id);
      const s = stats[id];
      const w = Math.round((s.c / s.t) * 100);
      return `
        <div class="flex items-center gap-2 text-sm">
          <span class="w-6 text-center">${type ? type.emoji : '❓'}</span>
          <span class="flex-1 truncate">${this.esc(type ? this.typeName(type) : id)}</span>
          <span class="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <span class="block h-full ${w >= 60 ? 'bg-green-500' : 'bg-red-400'}" style="width:${w}%"></span>
          </span>
          <span class="w-10 text-end font-medium text-gray-700 dark:text-gray-200">${s.c}/${s.t}</span>
        </div>`;
    }).join('');

    return `
      <p class="font-semibold ${band[1]}">${band[2]} ${t('quiz_exam_grade', lang)}: ${t('quiz_exam_band_' + band[0], lang)}
        <span class="block text-xs font-normal text-gray-400 mt-1">${t('quiz_exam_pass_mark', lang)}: 60%</span>
      </p>
      <div class="max-w-sm mx-auto border-t border-gray-100 dark:border-gray-700 pt-4">
        <p class="text-xs text-gray-400 mb-2">${t('quiz_exam_breakdown', lang)}</p>
        <div class="space-y-2 text-start">${rows}</div>
      </div>`;
  }

  /** End-of-round review: every missed question with your answer vs the correct one. */
  missedReviewHtml(lang) {
    if (!this.missed || !this.missed.length) return '';
    return `
      <div class="mt-6 bg-white dark:bg-gray-800 rounded-2xl shadow border border-gray-200 dark:border-gray-700 p-6">
        <h4 class="font-bold mb-4 text-center">📖 ${t('quiz_review_missed', lang)} <span class="text-gray-400 font-normal">(${this.missed.length})</span></h4>
        <div class="space-y-4">
          ${this.missed.map(m => `
            <div class="rounded-xl border border-gray-100 dark:border-gray-700 p-4">
              <p class="text-xs text-gray-400 mb-1">${this.esc(m.prompt)}</p>
              <div class="mb-3 text-center">${m.promptHtml}</div>
              <div class="grid sm:grid-cols-2 gap-2 text-center">
                <div class="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-2">
                  <div class="text-[10px] uppercase text-red-500 mb-1">✗ ${t('quiz_your_answer', lang)}</div>
                  ${m.chosenHtml}
                </div>
                <div class="rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-2">
                  <div class="text-[10px] uppercase text-green-600 mb-1">✓ ${t('quiz_correct_answer', lang)}</div>
                  ${m.correctHtml}
                </div>
              </div>
              ${m.gotoVerse ? `<div class="text-center mt-2"><button data-action="show-ayah" data-ayah="${m.gotoVerse.split(':')[1]}" class="text-xs text-primary dark:text-blue-400 hover:underline" data-ref="${m.gotoVerse}">↗ ${t('quiz_view_verse', lang)}</button></div>` : ''}
            </div>`).join('')}
        </div>
      </div>`;
  }

  // ---------- generators ----------

  // 1. Ayah sequence: next / previous / first / last / random within one surah
  async buildAyahSequence(scope) {
    const verses = await this.surahVerses(scope.surah);
    if (verses.length < 3) return [];
    const surahNum = scope.surah;
    const N = verses.length;
    const surahName = getSurahName(surahNum, this.language) || `Surah ${surahNum}`;

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
      // One first/last question; pad the round with next/previous questions
      const nextPos = verses.map((_, i) => i).filter(i => i < N - 1).map(i => ['next', i]);
      const prevPos = verses.map((_, i) => i).filter(i => i > 0).map(i => ['previous', i]);
      const fillers = this.shuffle(nextPos.concat(prevPos)).slice(0, size - 1).map(([d, i]) => makeDir(i, d));
      return this.shuffle([makeEnd(this.subMode)].concat(fillers));
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

  // Localized tajweed rule name (TAJWEED_LESSONS carries per-language names), English label fallback
  ruleName(key) {
    const lesson = (typeof TAJWEED_LESSONS !== 'undefined' && TAJWEED_LESSONS) ? TAJWEED_LESSONS[key] : null;
    return (lesson && lesson.names && lesson.names[this.language]) || TAJWEED_RULES[key].label;
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
      const options = [{ html: this.esc(this.ruleName(it.rule)), correct: true }]
        .concat(others.map(k => ({ html: this.esc(this.ruleName(k)), correct: false })));
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

  // 10. Meccan or Medinan: where was this surah revealed (SURAH_DATA.revelationType)
  async buildRevelationType(scope) {
    const surahs = this.sample(SURAH_DATA.filter(s => s.revelationType), this.roundSize());
    return surahs.map(s => {
      const meccan = s.revelationType === 'Meccan';
      return {
        prompt: this.tt('quiz_which_revelation'),
        promptHtml: this.ar(s.arabicName, '!text-4xl')
          + `<div class="text-lg font-semibold mt-2">${this.esc(getSurahName(s.number, this.language))}</div>`
          + `<div class="text-xs text-gray-400 mt-1">${this.tt('surah')} ${s.number}</div>`,
        options: [
          { html: `🕋 ${this.esc(this.tt('quiz_meccan'))}`, correct: meccan },
          { html: `🕌 ${this.esc(this.tt('quiz_medinan'))}`, correct: !meccan }
        ],
        gotoVerse: `${s.number}:1`
      };
    });
  }

  // 11. Ayah count: which of these 4 surahs has the most / fewest ayahs (SURAH_DATA)
  async buildAyahCount(scope) {
    const questions = [];
    const seen = new Set();   // avoid repeating the same 4-surah set in one round
    let attempts = 0;
    while (questions.length < this.roundSize() && attempts < this.roundSize() * 10) {
      attempts++;
      // 4 surahs with pairwise-distinct ayah counts so the answer is unambiguous
      const picked = [];
      const counts = new Set();
      for (const s of this.shuffle(SURAH_DATA)) {
        if (counts.has(s.ayahCount)) continue;
        counts.add(s.ayahCount);
        picked.push(s);
        if (picked.length === 4) break;
      }
      if (picked.length < 4) break;
      const setKey = picked.map(s => s.number).sort((a, b) => a - b).join(',');
      if (seen.has(setKey)) continue;
      seen.add(setKey);

      const most = this.rand(2) === 0;
      const target = picked.reduce((best, s) =>
        (most ? s.ayahCount > best.ayahCount : s.ayahCount < best.ayahCount) ? s : best, picked[0]);
      questions.push({
        prompt: most ? this.tt('quiz_most_ayahs') : this.tt('quiz_fewest_ayahs'),
        promptHtml: `<div class="text-4xl">${most ? '📈' : '📉'}</div>`,
        options: picked.map(s => ({
          html: this.esc(getSurahName(s.number, this.language)),
          correct: s.number === target.number
        })),
        explanation: picked.map(s =>
          `${this.esc(getSurahName(s.number, this.language))}: ${s.ayahCount}`).join(' · '),
        gotoVerse: `${target.number}:1`
      });
    }
    return questions;
  }

  // 12. Root family: given a root + gloss (data/sarf.json), pick the word built from it
  async buildRootFamily(scope) {
    const sarf = await this.loadSarf();
    const order = (sarf.order || []).filter(r => {
      const e = sarf.roots[r];
      return e && (e.verbs || []).concat(e.nouns || []).some(f => f.form);
    });
    if (order.length < 4) return [];

    const formsOf = (root) => {
      const e = sarf.roots[root];
      return (e.verbs || []).concat(e.nouns || []).filter(f => f.form);
    };

    const questions = [];
    for (const root of this.shuffle(order).slice(0, this.roundSize())) {
      const forms = formsOf(root);
      const answer = forms[this.rand(forms.length)];

      // Distractors: one form each from 3 other roots
      const distractors = [];
      const usedText = new Set([answer.form]);
      for (const dr of this.shuffle(order)) {
        if (dr === root) continue;
        const df = formsOf(dr);
        const w = df[this.rand(df.length)];
        if (w && !usedText.has(w.form)) { usedText.add(w.form); distractors.push(w); }
        if (distractors.length >= 3) break;
      }
      if (distractors.length < 3) continue;

      questions.push({
        prompt: this.tt('quiz_which_root_word'),
        promptHtml: this.ar(root.split('').join(' '), '!text-5xl')
          + `<div class="text-sm text-gray-500 dark:text-gray-400 mt-2" dir="auto">${this.esc(this.sarfGloss(sarf, root))}</div>`,
        options: [{ html: this.ar(answer.form, '!text-3xl'), correct: true }]
          .concat(distractors.map(w => ({ html: this.ar(w.form, '!text-3xl'), correct: false }))),
        explanation: answer.meaning ? `${this.esc(answer.form)} — ${this.esc(answer.meaning)}` : undefined,
        gotoVerse: answer.ref || null
      });
    }
    return questions;
  }

  // 13. Word frequency: which of these 4 words appears most often (data/word-index.json)
  async buildWordFrequency(scope) {
    if (!this._freqPool) {
      const index = await QuranData.getWordIndex();
      // Meaningful pool: words of >=2 letters occurring at least 3 times
      this._freqPool = Object.keys(index)
        .filter(w => w.length >= 2 && index[w].length >= 3)
        .map(w => ({ word: w, count: index[w].length }));
    }
    const pool = this._freqPool;
    if (pool.length < 4) return [];

    const questions = [];
    const usedWinners = new Set();
    let attempts = 0;
    while (questions.length < this.roundSize() && attempts < this.roundSize() * 30) {
      attempts++;
      const picked = this.sample(pool, 4).sort((a, b) => b.count - a.count);
      // Answerable only when the winner clearly dominates (2x the runner-up)
      if (picked[0].count < picked[1].count * 2) continue;
      if (usedWinners.has(picked[0].word)) continue;
      usedWinners.add(picked[0].word);

      questions.push({
        prompt: this.tt('quiz_most_frequent'),
        promptHtml: `<div class="text-4xl">📊</div>`,
        options: picked.map(p => ({
          html: this.ar(p.word, '!text-3xl'),
          correct: p === picked[0]
        })),
        explanation: picked.map(p => `${this.esc(p.word)}: ${p.count}×`).join(' · ')
      });
    }
    return questions;
  }

  // 14. Which juz does a surah begin in (JUZ_DATA boundaries)
  async buildSurahJuzStart(scope) {
    const surahs = this.sample(SURAH_DATA, this.roundSize());
    return surahs.map(s => {
      const juz = this.juzOf(s.number, 1);

      // Options: correct + nearby juz numbers (same pattern as buildWhichJuz)
      const opts = new Set([juz]);
      let spread = 1;
      while (opts.size < 4 && spread <= 30) {
        if (juz - spread >= 1) opts.add(juz - spread);
        if (opts.size < 4 && juz + spread <= 30) opts.add(juz + spread);
        spread++;
      }
      return {
        prompt: this.tt('quiz_which_juz_start'),
        promptHtml: this.ar(s.arabicName, '!text-4xl')
          + `<div class="text-lg font-semibold mt-2">${this.esc(getSurahName(s.number, this.language))}</div>`
          + `<div class="text-xs text-gray-400 mt-1">${this.tt('surah')} ${s.number}</div>`,
        options: [...opts].map(n => ({
          html: `${t('juz', this.language)} ${n}`,
          correct: n === juz
        })),
        gotoVerse: `${s.number}:1`
      };
    });
  }

  // 15. Exam: a longer MIXED round composed from the existing generators above.
  // No question logic of its own — it only picks scope-compatible generators,
  // builds their pools, tags each question with its source type (qType) and
  // merges them round-robin so every type is represented.
  async buildExam(scope) {
    const plans = [];   // [{ id, scope }] — generator runs, each with a valid scope for it
    if (scope.kind === 'surah') {
      ['ayah_sequence', 'word_meaning', 'meaning_word', 'complete_ayah', 'grammar_pos', 'tajweed_rule']
        .forEach(id => plans.push({ id, scope: { kind: 'surah', surah: scope.surah } }));
    } else if (scope.kind === 'juz') {
      // Verse→surah questions over the whole juz + surah-local questions
      // for a couple of surahs inside it (keeps every question juz-local).
      plans.push({ id: 'guess_surah', scope: { kind: 'juz', juz: scope.juz } });
      const j = JUZ_DATA.find(x => x.number === scope.juz);
      if (j) {
        const surahs = [];
        for (let s = j.startSurah; s <= j.endSurah; s++) surahs.push(s);
        for (const s of this.sample(surahs, Math.min(2, surahs.length))) {
          plans.push({ id: 'ayah_sequence', scope: { kind: 'surah', surah: s } });
          plans.push({ id: 'complete_ayah', scope: { kind: 'surah', surah: s } });
          plans.push({ id: 'grammar_pos', scope: { kind: 'surah', surah: s } });
        }
      }
    } else {
      // Whole Quran: cheap SURAH_DATA/JUZ_DATA facts always, plus 2 heavier data-file types
      ['guess_surah', 'revelation_type', 'ayah_count', 'surah_juz_start']
        .forEach(id => plans.push({ id, scope: { kind: 'whole' } }));
      this.sample(['same_root', 'root_family', 'word_frequency', 'which_juz'], 2)
        .forEach(id => plans.push({ id, scope: { kind: 'whole' } }));
    }

    // Build each pool; a failing generator (missing data) is skipped, not fatal
    const buckets = [];
    const savedSub = this.subMode;
    for (const plan of plans) {
      const type = this.types.find(x => x.id === plan.id);
      if (!type) continue;
      try {
        this.subMode = 'random';   // ayah_sequence: mixed directions in exams
        const qs = await type.build(plan.scope);
        if (qs && qs.length) buckets.push(this.shuffle(qs.map(q => ({ ...q, qType: plan.id }))));
      } catch (e) { /* skip this generator */ }
      this.subMode = savedSub;
    }
    if (!buckets.length) return [];

    // Round-robin draw so the exam mixes types evenly, then shuffle the order
    const size = this.roundSize();
    const merged = [];
    let drew = true;
    while (merged.length < size && drew) {
      drew = false;
      for (const b of this.shuffle(buckets)) {
        if (b.length && merged.length < size) { merged.push(b.pop()); drew = true; }
      }
    }
    return this.shuffle(merged);
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
