/**
 * Vocabulary Trainer Module (Learn tab > Vocabulary)
 * Flashcards + thematic word sets + word-of-the-day + quizzes (meanings, root
 * families, listening drill with real per-word Quran audio) + spaced-repetition
 * review + per-theme mastery tracking for the most frequent Quran words.
 * Renders into #learn-vocab-root when the 'learnModuleSelected' event fires
 * with {module:'vocab'}. Uses VOCAB_WORDS / VOCAB_THEMES from js/vocab-data.js,
 * plus data/word-index.json (corpus deck) and data/sarf.json (root-family quiz).
 */

/**
 * Local fallbacks for i18n keys not yet in js/translations.js (that file is
 * owned by the orchestrator). t() returns the key itself when missing; these
 * keep the UI readable (en/bn) until the keys land centrally.
 */
const VOCAB_I18N_FALLBACK = {
  vocab_review:         { en: 'Review', bn: 'রিভিউ', zh: '复习', ja: '復習'},
  vocab_due:            { en: '{count} due', bn: '{count}টি বাকি', zh: '待复习{count}个', ja: '{count}が期限'},
  vocab_review_empty:   { en: 'All caught up! Nothing due for review.', bn: 'দারুণ! এখন রিভিউয়ের জন্য কিছু বাকি নেই।', zh: '全部完成！没有待复习的。', ja: 'すべて完了！復習期限はありません。'},
  vocab_next_due:       { en: 'Next review in {time}', bn: 'পরবর্তী রিভিউ {time} পরে', zh: '下次复习在{time}后', ja: '次回復習まで{time}'},
  vocab_show_meaning:   { en: 'Show meaning', bn: 'অর্থ দেখুন', zh: '显示含义', ja: '意味を表示'},
  vocab_again:          { en: 'Again', bn: 'আবার', zh: '再来一次', ja: 'もう一度'},
  vocab_good:           { en: 'Good', bn: 'পেরেছি', zh: '记住了', ja: '良好'},
  vocab_new_word:       { en: 'New', bn: 'নতুন', zh: '新词', ja: '新規'},
  vocab_all:            { en: 'All', bn: 'সব', zh: '全部', ja: 'すべて'},
  vocab_quiz_words:     { en: 'Word meanings', bn: 'শব্দের অর্থ', zh: '词义', ja: '単語の意味'},
  vocab_quiz_roots:     { en: 'Root families', bn: 'মূল ধাতু', zh: '词根家族', ja: '語根ファミリー'},
  vocab_choose_arabic:  { en: 'Choose the Arabic word', bn: 'সঠিক আরবি শব্দটি বেছে নিন', zh: '选择正确的阿拉伯语单词', ja: '正しいアラビア語を選んでください'},
  vocab_root_prompt:    { en: 'Which word comes from this root?', bn: 'কোন শব্দটি এই মূল থেকে এসেছে?', zh: '哪个词来自这个词根？', ja: 'どの単語がこの語根から来ていますか？'},
  vocab_reviewed_count: { en: '{count} reviewed this session', bn: 'এই সেশনে {count}টি রিভিউ হয়েছে', zh: '本课复习了{count}个', ja: 'このセッションで{count}復習しました'},
  vocab_wotd:           { en: 'Word of the day', bn: 'আজকের শব্দ', zh: '每日一词', ja: '今日の単語'},
  vocab_quiz_listen:    { en: 'Listening', bn: 'শুনে চিনুন', zh: '听力', ja: 'リスニング'},
  vocab_listen_prompt:  { en: 'Listen, then choose the meaning', bn: 'শুনে সঠিক অর্থটি বেছে নিন', zh: '听音选择正确含义', ja: '聞いて正しい意味を選んでください'},
  vocab_play_word:      { en: 'Play word audio', bn: 'শব্দটি শুনুন', zh: '播放音频', ja: '単語を再生'},
  vocab_mastery:        { en: 'Mastery by theme', bn: 'বিষয়ভিত্তিক অগ্রগতি', zh: '按主题掌握度', ja: 'テーマ別習熟度'},
  vocab_core_words:     { en: 'Core 50 words', bn: 'মূল ৫০ শব্দ', zh: '核心50词', ja: 'コア50語'},
  vocab_favorites:      { en: 'Favorites', bn: 'প্রিয়', zh: '收藏', ja: 'お気に入り'},
  vocab_favorite:       { en: 'Favorite', bn: 'প্রিয়', zh: '收藏', ja: 'お気に入り'},
  vocab_search:         { en: 'Search words…', bn: 'শব্দ খুঁজুন…', zh: '搜索单词…', ja: '単語を検索…'},
  vocab_no_matches:     { en: 'No matching words', bn: 'কোনো মিল পাওয়া শব্দ নেই', zh: '没有匹配的单词', ja: '一致する単語がありません'},
  vocab_clear_search:   { en: 'Clear', bn: 'মুছুন', zh: '清除', ja: 'クリア'}
};

class VocabTrainer {
  constructor() {
    this.root = document.getElementById('learn-vocab-root');
    if (!this.root) return;

    this.language = (typeof appSettings !== 'undefined' && appSettings)
      ? appSettings.get('language')
      : 'en';

    this.rendered = false;
    this.mode = 'flashcards';
    this.category = 'all';       // flashcards filter: 'all', 'fav', or a VOCAB_THEMES id
    this.search = '';            // flashcards free-text filter (arabic/translit/meaning)

    // Quiz state
    this.quiz = null;
    this.quizType = 'words';     // 'words' | 'roots'
    this.quizTimer = null;

    // Review (spaced-repetition-lite) state
    this.reviewQueue = null;
    this.reviewRevealed = false;
    this.reviewedCount = 0;

    // Progress state
    this.resetArmed = false;
    this.resetTimer = null;

    window.addEventListener('learnModuleSelected', (e) => {
      if (e.detail && e.detail.module === 'vocab') {
        if (!this.rendered) {
          this.rendered = true;
          this.setMode('flashcards');
        }
      }
    });

    window.addEventListener('settingChanged', (e) => {
      if (e.detail && e.detail.key === 'language') {
        this.language = e.detail.value;
        if (this.rendered) this.render();
      }
    });

    this.root.addEventListener('click', (e) => this.onClick(e));
    this.root.addEventListener('input', (e) => this.onInput(e));
  }

  /** Live search box in flashcards — filter without losing input focus. */
  onInput(e) {
    const box = e.target.closest('[data-vsearch]');
    if (!box) return;
    this.search = box.value || '';
    this.page = 0;
    this._focusSearch = true;
    this.render();
  }

  // ---------- persistence ----------

  getKnown() {
    try {
      const raw = localStorage.getItem('vocabKnown');
      const arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr : [];
    } catch (err) {
      return [];
    }
  }

  saveKnown(arr) {
    try {
      localStorage.setItem('vocabKnown', JSON.stringify(arr));
    } catch (err) { /* storage unavailable — session-only progress */ }
  }

  bestScoreKey(type) {
    if (type === 'roots') return 'vocabQuizBestRoots';
    if (type === 'listen') return 'vocabQuizBestListen';
    return 'vocabQuizBest';
  }

  getBestScore(type) {
    const v = parseInt(localStorage.getItem(this.bestScoreKey(type)), 10);
    return isNaN(v) ? null : v;
  }

  saveBestScore(score, type) {
    try {
      localStorage.setItem(this.bestScoreKey(type), String(score));
    } catch (err) { /* ignore */ }
  }

  /** Review queue store: { arabic: { iv: intervalDays, due: epochMs } } */
  getReview() {
    try {
      const o = JSON.parse(localStorage.getItem('vocabReview') || '{}');
      return (o && typeof o === 'object' && !Array.isArray(o)) ? o : {};
    } catch (err) {
      return {};
    }
  }

  saveReview(obj) {
    try {
      localStorage.setItem('vocabReview', JSON.stringify(obj));
    } catch (err) { /* storage unavailable — session-only review */ }
  }

  /** Favorite/starred words, stored as an array of Arabic forms. */
  getFav() {
    try {
      const raw = localStorage.getItem('lq_vocab_fav');
      const arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr : [];
    } catch (err) {
      return [];
    }
  }

  saveFav(arr) {
    try {
      localStorage.setItem('lq_vocab_fav', JSON.stringify(arr));
    } catch (err) { /* storage unavailable — session-only favorites */ }
  }

  toggleFav(arabic) {
    if (!arabic) return;
    const fav = this.getFav();
    this.saveFav(fav.includes(arabic) ? fav.filter(x => x !== arabic) : fav.concat(arabic));
  }

  // ---------- helpers ----------

  escapeHtml(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  meaningOf(word) {
    return word.meanings[this.language] || word.meanings.en;
  }

  /** t() with local en/bn fallback for keys not yet in translations.js. */
  tt(key, repl) {
    let s = t(key, this.language);
    if (s === key) {
      const fb = VOCAB_I18N_FALLBACK[key];
      if (fb) s = fb[this.language] || fb.en || key;
    }
    if (repl) {
      Object.keys(repl).forEach(k => { s = s.split('{' + k + '}').join(repl[k]); });
    }
    return s;
  }

  /** All thematic words flattened (schema identical to VOCAB_WORDS + ref). */
  themeWords() {
    if (typeof VOCAB_THEMES === 'undefined') return [];
    if (!this._themeWords) {
      this._themeWords = VOCAB_THEMES.reduce((acc, th) => acc.concat(th.words), []);
    }
    return this._themeWords;
  }

  /** Curated 50 + thematic words, deduped by Arabic form. */
  studyPool() {
    const seen = new Set();
    return VOCAB_WORDS.concat(this.themeWords()).filter(w => {
      if (seen.has(w.arabic)) return false;
      seen.add(w.arabic);
      return true;
    });
  }

  /** Words currently due for review (never-seen words count as due). */
  dueList() {
    const rev = this.getReview();
    const now = Date.now();
    return this.studyPool().filter(w => {
      const r = rev[w.arabic];
      return !r || r.due <= now;
    });
  }

  /** Compact relative time: "5m", "3h", "2d". */
  formatDue(ts) {
    const d = ts - Date.now();
    if (d <= 0) return '0m';
    const m = Math.round(d / 60000);
    if (m < 60) return m + 'm';
    const h = Math.round(m / 60);
    if (h < 48) return h + 'h';
    return Math.round(h / 24) + 'd';
  }

  shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  /** True if a deck word matches the lowercased search query (arabic/translit/meaning). */
  matchesSearch(w, q) {
    if (!q) return true;
    if ((w.arabic || '').toLowerCase().includes(q)) return true;
    if ((w.translit || '').toLowerCase().includes(q)) return true;
    const m = w.dyn ? this._dynMeaning(`${w.norm}:${this.language}`) : this.meaningOf(w);
    return !!(m && String(m).toLowerCase().includes(q));
  }

  /** Re-focus the search box after a filter-triggered re-render (caret at end). */
  restoreSearchFocus() {
    if (!this.root) return;
    requestAnimationFrame(() => {
      const box = this.root.querySelector('[data-vsearch]');
      if (!box) return;
      box.focus();
      try { const n = box.value.length; box.setSelectionRange(n, n); } catch (e) { /* type=search may reject */ }
    });
  }

  hasTTS() {
    return 'speechSynthesis' in window
      && typeof SpeechSynthesisUtterance !== 'undefined';
  }

  speak(text) {
    if (!this.hasTTS()) return;
    try {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'ar-SA';
      utter.rate = 0.8;
      window.speechSynthesis.speak(utter);
    } catch (err) { /* TTS failed — degrade silently */ }
  }

  // ---------- word audio (qurancdn per-word recordings) ----------

  /** Lazily load data/word-index.json for word audio + word-of-the-day refs. */
  ensureWordIdx() {
    if (this._idx || this._idxLoading || this._idxFailed) return;
    this._idxLoading = true;
    QuranData.getWordIndex()
      .then(idx => {
        this._idx = idx;
        this._idxLoading = false;
        if (this.mode === 'quiz' && this.quizType === 'listen' && !this.quiz) {
          this.startListenQuiz();
          this.render();
        } else if (this.mode === 'flashcards') {
          this.render();  // WOTD audio/ref chips become available
        }
      })
      .catch(() => {
        this._idxLoading = false;
        this._idxFailed = true;
        // Listening quiz needs the index — fall back to the word quiz.
        if (this.mode === 'quiz' && this.quizType === 'listen') {
          this.quizType = 'words';
          this.startQuiz();
          this.render();
        }
      });
  }

  /**
   * Find a "surah:ayah:word" occurrence of this vocab word in the exact-word
   * index so its CDN recording can be played. Tries the normalized form plus
   * Uthmani-orthography variants (صلاة→صلوة, آخرة→ءاخرة, قيامة→قيمة, …);
   * prefers an occurrence inside the word's own `ref` verse.
   */
  audioOcc(word) {
    if (!this._idx) return null;
    const n = word.norm || QuranData.normalizeWord(word.arabic);
    const alt = n.replace(/اة$/, 'وة');           // tāʾ-marbūṭa after alif → wāw spelling
    const maq = n.replace(/ي/g, 'ى');             // yāʾ → alif maqṣūra (في→فى, شيء→شىء)
    const bald = n.replace(/ا/g, '');             // dagger-alif spellings (قيمة, خلدين…)
    const variants = [
      n, alt, maq, 'ال' + n, 'ال' + alt, 'الء' + n, bald, 'ال' + bald,
      'و' + n, 'ف' + n, n + 'ا',
      n.charAt(0) === 'ل' ? 'ا' + n : null        // assimilated lām (الليل → اليل)
    ].filter(Boolean);
    // First pass: an occurrence inside the word's own ref verse wins outright.
    if (word.ref) {
      for (const v of variants) {
        const hit = (this._idx[v] || []).find(o => o.startsWith(word.ref + ':'));
        if (hit) return hit;
      }
    }
    for (const v of variants) {
      const occs = this._idx[v];
      if (occs && occs.length) return occs[0];
    }
    return null;
  }

  /** Play the word's real Quran recording; fall back to Arabic TTS. */
  playWord(word) {
    if (!word) return;
    const occ = this.audioOcc(word);
    if (!occ) { this.speak(word.arabic); return; }
    const [s, a, w] = occ.split(':').map(Number);
    if (!this._audioEl) this._audioEl = new Audio();
    const el = this._audioEl;
    el.onerror = () => this.speak(word.arabic);
    el.src = QuranData.wordAudioUrl(s, a, w);
    el.play().catch(() => this.speak(word.arabic));
  }

  // ---------- word of the day ----------

  /** Deterministic daily pick: rotates through the study pool by day number. */
  wordOfDay() {
    const pool = this.studyPool();
    if (!pool.length) return null;
    const day = Math.floor(Date.now() / 86400000);
    return pool[day % pool.length];
  }

  // ---------- events ----------

  onClick(e) {
    const h2 = e.target.closest('h2');
    if (h2 && this.root.contains(h2)) { this.setMode('flashcards'); this.category = 'all'; this.search = ''; this.quiz = null; this.render(); return; }
    // Verse-preview chip on a grid card — handled before the action dispatch
    const vv = e.target.closest('[data-vocab-verse]');
    if (vv) {
      e.stopPropagation();
      const ref = vv.getAttribute('data-vocab-verse');
      const word = vv.getAttribute('data-word');
      if (typeof ayahModal !== 'undefined' && ayahModal) ayahModal.open(ref, { word: word || null });
      return;
    }

    // Grid view actions
    const vfav = e.target.closest('[data-vfav]');
    if (vfav) {
      e.stopPropagation();
      this.toggleFav(vfav.getAttribute('data-vfav'));
      this.render();
      return;
    }
    const vknow = e.target.closest('[data-vknow]');
    if (vknow) {
      const w = vknow.getAttribute('data-vknow');
      const known = this.getKnown();
      this.saveKnown(known.includes(w) ? known.filter(x => x !== w) : known.concat(w));
      this.render();
      return;
    }
    const vcard = e.target.closest('[data-vcard]');
    if (vcard) {
      // Meanings hidden → tap reveals this card; always speak the word
      if (!this.showMeanings()) {
        this.revealed = this.revealed || new Set();
        const key = vcard.getAttribute('data-vcard');
        this.revealed.has(key) ? this.revealed.delete(key) : this.revealed.add(key);
        this.render();
      }
      this.speak(vcard.getAttribute('data-text') || '');
      return;
    }

    const el = e.target.closest('[data-action]');
    if (!el || !this.root.contains(el)) return;

    switch (el.getAttribute('data-action')) {
      case 'mode':
        this.setMode(el.getAttribute('data-mode'));
        break;
      case 'quiz-choice':
        this.answerQuiz(el);
        break;
      case 'play-again':
        this.startQuiz();
        this.render();
        break;
      case 'vmeanings':
        try { localStorage.setItem('vocabShowMeanings', this.showMeanings() ? '0' : '1'); } catch (err) {}
        this.revealed = new Set();
        this.render();
        break;
      case 'vmore':
        this.page = (this.page || 0) + 1;
        this.render();
        break;
      case 'vcat': {
        const cat = el.getAttribute('data-cat');
        if (cat !== this.category) {
          this.category = cat;
          this.page = 0;
          this.search = '';
          this.revealed = new Set();
          this.render();
        }
        break;
      }
      case 'quiz-type': {
        const ty = el.getAttribute('data-qt');
        if (ty !== this.quizType) {
          this.quizType = ty;
          if (this.quizTimer) { clearTimeout(this.quizTimer); this.quizTimer = null; }
          this.startQuiz();
          this.render();
        }
        break;
      }
      case 'rev-show':
        this.reviewRevealed = true;
        this.render();
        break;
      case 'rev-again':
        this.gradeReview(false);
        break;
      case 'rev-good':
        this.gradeReview(true);
        break;
      case 'rev-speak':
        this.speak(el.getAttribute('data-text') || '');
        break;
      case 'wotd-audio':
        this.playWord(this.wordOfDay());
        break;
      case 'quiz-play': {
        const q = this.quiz && this.quiz.questions[this.quiz.round];
        if (q && q.word) this.playWord(q.word);
        break;
      }
      case 'reset':
        this.handleReset();
        break;
    }
  }

  setMode(mode) {
    this.mode = mode;
    this.resetArmed = false;
    if (this.quizTimer) { clearTimeout(this.quizTimer); this.quizTimer = null; }

    if (mode === 'quiz') {
      this.startQuiz();
    } else if (mode === 'review') {
      this.reviewQueue = this.shuffle(this.dueList()).slice(0, 20);
      this.reviewRevealed = false;
      this.reviewedCount = 0;
    }
    this.render();
  }

  // ---------- rendering ----------

  render() {
    if (!this.root) return;
    const lang = this.language;
    const dir = (typeof isRTL === 'function' && isRTL(lang)) ? 'rtl' : 'ltr';

    let body = '';
    if (this.mode === 'flashcards') body = this.renderFlashcards();
    else if (this.mode === 'quiz') body = this.renderQuiz();
    else if (this.mode === 'review') body = this.renderReview();
    else body = this.renderProgress();

    const due = this.dueList().length;

    this.root.innerHTML = `
      <div dir="${dir}" class="w-full space-y-6">
        <div class="text-center">
          <h2 class="text-2xl font-bold cursor-pointer" title="${t('vocab_title', lang)}">${t('vocab_title', lang)}</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">${t('vocab_subtitle', lang)}</p>
        </div>
        <div class="flex justify-center gap-2 flex-wrap">
          ${this.renderModeTab('flashcards', t('flashcards', lang))}
          ${this.renderModeTab('quiz', t('quiz', lang))}
          ${this.renderModeTab('review', this.tt('vocab_review'), due)}
          ${this.renderModeTab('progress', t('progress', lang))}
        </div>
        ${body}
      </div>
    `;
  }

  renderModeTab(mode, label, badge) {
    const active = this.mode === mode;
    const cls = active
      ? 'bg-primary text-white dark:bg-blue-600'
      : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700';
    const badgeHtml = badge
      ? `<span class="ms-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold align-middle ${active ? 'bg-white/25' : 'bg-amber-500 text-white'}">${badge}</span>`
      : '';
    return `
      <button data-action="mode" data-mode="${mode}"
              class="px-4 py-2 rounded-lg text-sm font-medium transition-colors ${cls}">
        ${label}${badgeHtml}
      </button>
    `;
  }

  // ---------- flashcards ----------

  /* ---------- expanded corpus deck (beyond the curated 50) ---------- */

  /** Top frequent Quran words from the bundled index, excluding the curated 50. */
  async ensureExtra() {
    if (this.extra || this._extraLoading) return;
    this._extraLoading = true;
    try {
      const [idx, words] = await Promise.all([QuranData.getWordIndex(), QuranData.getQuranWords()]);
      const curated = new Set(VOCAB_WORDS.map(w => QuranData.normalizeWord(w.arabic)));
      // First-occurrence verse refs for curated words (dyn words carry their own ref)
      this.curatedRefs = {};
      VOCAB_WORDS.forEach(w => {
        const occ = (idx[QuranData.normalizeWord(w.arabic)] || [])[0];
        if (occ) this.curatedRefs[w.arabic] = occ.split(':').slice(0, 2).join(':');
      });
      this.extra = Object.entries(idx)
        .map(([norm, occs]) => ({ norm, count: occs.length, first: occs[0] }))
        .filter(e => !curated.has(e.norm) && e.count >= 40)
        .sort((a, b) => b.count - a.count)
        .slice(0, 250)
        .map(e => {
          const [s, a, w] = e.first.split(':').map(Number);
          const display = (words[`${s}:${a}`] || [])[w - 1] || e.norm;
          return { arabic: display, norm: e.norm, count: e.count, ref: `${s}:${a}`, pos: w, dyn: true };
        });
      if (this.mode === 'flashcards' || this.mode === 'progress') this.render();
    } catch (e) { this.extra = []; }
  }

  deckAll() {
    const known = new Set(this.getKnown());
    let list;
    if (this.category === 'fav') {
      const fav = new Set(this.getFav());
      const seen = new Set();
      list = this.studyPool().concat(this.extra || []).filter(w => {
        if (!fav.has(w.arabic) || seen.has(w.arabic)) return false;
        seen.add(w.arabic);
        return true;
      }).map(w => ({ ...w, key: w.arabic }));
    } else if (this.category && this.category !== 'all' && typeof VOCAB_THEMES !== 'undefined') {
      const th = VOCAB_THEMES.find(x => x.id === this.category);
      list = th ? th.words.map(w => ({ ...w, key: w.arabic })) : [];
    } else {
      list = VOCAB_WORDS.map(w => ({ ...w, key: w.arabic }))
        .concat(this.extra || []);
    }
    const favSet = new Set(this.getFav());
    return list.map(w => ({ ...w, key: w.key || w.arabic, known: known.has(w.arabic), fav: favSet.has(w.arabic) }));
  }

  /** Everything trackable for progress: curated + themes + corpus extras. */
  progressDeck() {
    const known = new Set(this.getKnown());
    const seen = new Set();
    return this.studyPool().concat(this.extra || []).filter(w => {
      if (seen.has(w.arabic)) return false;
      seen.add(w.arabic);
      return true;
    }).map(w => ({ ...w, known: known.has(w.arabic) }));
  }

  showMeanings() {
    try { return localStorage.getItem('vocabShowMeanings') !== '0'; } catch (e) { return true; }
  }

  /** Lazily fetch meanings (UI language) for dynamic words on the visible page. */
  prefetchDyn(items) {
    const lang = this.language;
    items.filter(w => w.dyn && this._dynMeaning(`${w.norm}:${lang}`) == null).slice(0, 30).forEach(w => {
      const key = `${w.norm}:${lang}`;
      this._dyn = this._dyn || {};
      if (this._dyn[key] !== undefined) return;
      this._dyn[key] = '';   // in flight
      const [s, a] = w.ref.split(':').map(Number);
      QuranData.fetchRange(s, a, a, lang).then(vs => {
        const v = vs && vs[0];
        const m = v && (v.words || []).find(x => x.position === w.pos);
        this._dyn[key] = (m && m.meaning) || '—';
        const el = this.root.querySelector(`[data-vmean="${CSS.escape(key)}"]`);
        if (el) el.textContent = this._dyn[key];
      }).catch(() => { this._dyn[key] = '—'; });
    });
  }
  _dynMeaning(key) { return (this._dyn || {})[key]; }

  cardMeaning(w) {
    if (!w.dyn) return this.meaningOf(w);
    const m = this._dynMeaning(`${w.norm}:${this.language}`);
    return m || '…';
  }

  /** Hero card for the deterministic daily word (rotates with the day number). */
  renderWotd() {
    const w = this.wordOfDay();
    if (!w) return '';
    const lang = this.language;
    const occ = this.audioOcc(w);
    const ref = w.ref || (occ ? occ.split(':').slice(0, 2).join(':') : null);
    const known = this.getKnown().includes(w.arabic);
    const fav = this.getFav().includes(w.arabic);
    return `
      <div class="rounded-2xl bg-gradient-to-br from-primary to-secondary text-white p-5 shadow-lg">
        <div class="flex items-center justify-between text-xs font-semibold uppercase tracking-wide opacity-90">
          <span>📅 ${this.tt('vocab_wotd')}</span>
          <span>×${w.count}</span>
        </div>
        <div class="flex flex-wrap items-center justify-between gap-3 mt-2">
          <div>
            <div class="ayah-arabic !text-5xl !leading-normal !text-white break-words" dir="rtl">${w.arabic}</div>
            <div class="text-sm italic opacity-80" dir="ltr">${w.translit}</div>
            <div class="text-lg font-semibold mt-1" dir="auto">${this.escapeHtml(this.meaningOf(w))}</div>
          </div>
          <div class="flex items-center gap-2">
            <button data-action="wotd-audio" title="${this.tt('vocab_play_word')}"
                    class="w-11 h-11 rounded-full bg-white/20 hover:bg-white/35 text-xl transition-colors">🔊</button>
            ${ref ? `<button data-vocab-verse="${ref}" data-word="${this.escapeHtml(w.arabic)}" title="${t('names_search_quran', lang)}"
                    class="w-11 h-11 rounded-full bg-white/20 hover:bg-white/35 text-xl transition-colors">📖</button>` : ''}
            <button data-vfav="${this.escapeHtml(w.arabic)}" title="${this.tt('vocab_favorite')}" aria-label="${this.tt('vocab_favorite')}"
                    class="w-11 h-11 rounded-full ${fav ? 'bg-rose-500' : 'bg-white/20 hover:bg-white/35'} text-xl transition-colors">${fav ? '❤️' : '🤍'}</button>
            <button data-vknow="${this.escapeHtml(w.arabic)}" title="${t('vocab_know_it', lang)}"
                    class="w-11 h-11 rounded-full ${known ? 'bg-green-500' : 'bg-white/20 hover:bg-white/35'} text-xl transition-colors">✓</button>
          </div>
        </div>
      </div>
    `;
  }

  renderFlashcards() {
    const lang = this.language;
    this.ensureExtra();
    this.ensureWordIdx();
    // Empty favorites view can strand the user on an invisible chip → fall back.
    if (this.category === 'fav' && !this.getFav().length) this.category = 'all';
    const deck = this.deckAll();
    const q = (this.search || '').trim().toLowerCase();
    const all = q ? deck.filter(w => this.matchesSearch(w, q)) : deck;
    const pageSize = 24;
    const shownCount = Math.min(((this.page || 0) + 1) * pageSize, all.length);
    const items = all.slice(0, shownCount);
    const show = this.showMeanings();
    const knownCount = all.filter(w => w.known).length;
    const favCount = this.getFav().length;
    setTimeout(() => this.prefetchDyn(items), 0);
    if (this._focusSearch) { this._focusSearch = false; this.restoreSearchFocus(); }

    const themes = (typeof VOCAB_THEMES !== 'undefined') ? VOCAB_THEMES : [];
    const cats = [{ id: 'all', icon: '⭐', name: this.tt('vocab_all') }]
      .concat(favCount ? [{ id: 'fav', icon: '❤️', name: this.tt('vocab_favorites') }] : [])
      .concat(themes.map(th => ({ id: th.id, icon: th.icon, name: th.names[lang] || th.names.en })));

    return `
      ${this.renderWotd()}
      <div class="flex flex-wrap justify-center gap-1.5">
        ${cats.map(c => {
          const active = (this.category || 'all') === c.id;
          const cls = active
            ? 'bg-secondary text-white border-secondary'
            : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700';
          return `<button data-action="vcat" data-cat="${c.id}"
                    class="px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${cls}">
                    ${c.icon} ${c.name}
                  </button>`;
        }).join('')}
      </div>
      <div class="max-w-sm mx-auto relative">
        <input data-vsearch type="search" value="${this.escapeHtml(this.search || '')}"
               placeholder="🔍 ${this.tt('vocab_search')}" dir="auto"
               class="w-full ps-3 pe-8 py-2 rounded-full text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:border-primary dark:focus:border-blue-400" />
      </div>
      <div class="flex flex-wrap items-center justify-center gap-3 text-sm text-gray-500 dark:text-gray-400">
        <span><b class="text-gray-800 dark:text-gray-100">${all.length}</b> ${t('vocab_words_label', lang)}</span>
        <span>✓ <b class="text-green-600">${knownCount}</b></span>
        ${favCount ? `<span>❤️ <b class="text-rose-500">${favCount}</b></span>` : ''}
        <button data-action="vmeanings" class="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs">
          ${show ? '🙈 ' + t('vocab_hide_meanings', lang) : '👁 ' + t('vocab_show_meanings', lang)}
        </button>
      </div>
      ${all.length === 0 ? `
        <div class="text-center text-gray-500 dark:text-gray-400 py-8">
          <div class="text-4xl mb-2">🔍</div>
          <p class="text-sm">${this.tt('vocab_no_matches')}</p>
        </div>` : ''}
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
        ${items.map((w, i) => {
          const key = w.dyn ? `${w.norm}:${lang}` : '';
          const revealed = show || (this.revealed && this.revealed.has(w.key));
          const ref = w.ref || (this.curatedRefs || {})[w.arabic];
          return `
          <div class="rounded-xl bg-white dark:bg-gray-800 border ${w.known ? 'border-green-300 dark:border-green-700' : 'border-gray-200 dark:border-gray-700'} p-2.5 flex flex-col items-center gap-1">
            <button data-vcard="${this.escapeHtml(w.key)}" data-text="${this.escapeHtml(w.arabic)}" class="flex flex-col items-center gap-0.5 w-full">
              <span class="ayah-arabic !text-3xl !leading-normal" dir="rtl">${w.arabic}</span>
              ${w.translit ? `<span class="text-xs italic text-gray-400">${w.translit}</span>` : ''}
              <span class="text-sm text-gray-700 dark:text-gray-200 text-center leading-tight min-h-[1.25rem]" dir="auto" ${w.dyn ? `data-vmean="${this.escapeHtml(key)}"` : ''}>
                ${revealed ? this.escapeHtml(this.cardMeaning(w)) : '•••'}
              </span>
            </button>
            <div class="flex items-center justify-center flex-wrap gap-1.5">
              <span class="text-xs text-gray-400">×${w.count}</span>
              ${ref ? `<button data-vocab-verse="${ref}" data-word="${this.escapeHtml(w.arabic)}" title="${t('names_search_quran', lang)}"
                      class="text-xs px-1.5 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-400 hover:bg-primary hover:text-white">📖</button>` : ''}
              <button data-vfav="${this.escapeHtml(w.arabic)}" title="${this.tt('vocab_favorite')}" aria-label="${this.tt('vocab_favorite')}"
                      class="text-xs px-1.5 py-0.5 rounded-full ${w.fav ? 'bg-rose-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-400 hover:bg-rose-500 hover:text-white'}">${w.fav ? '❤️' : '🤍'}</button>
              <button data-vknow="${this.escapeHtml(w.arabic)}" title="${t('vocab_know_it', lang)}"
                      class="text-xs px-1.5 py-0.5 rounded-full ${w.known ? 'bg-green-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-400 hover:bg-green-500 hover:text-white'}">✓</button>
            </div>
          </div>`;
        }).join('')}
      </div>
      ${shownCount < all.length ? `
        <div class="text-center">
          <button data-action="vmore" class="px-5 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm text-primary dark:text-blue-300 hover:bg-gray-100 dark:hover:bg-gray-700">
            ${t('topics_show_more', lang)} (${all.length - shownCount}) →
          </button>
        </div>` : ''}
      <div class="mt-6">
        <h3 class="text-xs uppercase font-semibold text-gray-400 dark:text-gray-500 mb-2 text-center">🌐 ${t('resources_title', lang)}</h3>
        <div class="flex flex-wrap justify-center gap-2">
          <a href="https://corpus.quran.com/wordbyword.jsp" target="_blank" rel="noopener" class="flex items-center gap-2 px-3 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow text-sm"><span>🏛️</span><span class="font-medium">Quranic Corpus</span><span class="text-xs text-gray-400">word grammar &amp; morphology</span></a>
          <a href="https://understandquran.com" target="_blank" rel="noopener" class="flex items-center gap-2 px-3 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow text-sm"><span>📗</span><span class="font-medium">UnderstandQuran</span><span class="text-xs text-gray-400">80% words course</span></a>
          <a href="https://quranwbw.com" target="_blank" rel="noopener" class="flex items-center gap-2 px-3 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow text-sm"><span>🔤</span><span class="font-medium">QuranWBW</span><span class="text-xs text-gray-400">word-by-word reader</span></a>
        </div>
      </div>
    `;
  }

  // ---------- quiz ----------

  startQuiz() {
    if (this.quizTimer) { clearTimeout(this.quizTimer); this.quizTimer = null; }
    if (this.quizType === 'roots') { this.startRootQuiz(); return; }
    if (this.quizType === 'listen') { this.startListenQuiz(); return; }
    this.quiz = {
      type: 'words',
      // Half the questions run in reverse: meaning shown, Arabic word chosen.
      questions: this.shuffle(this.studyPool()).slice(0, 10)
        .map(w => ({ word: w, rev: Math.random() < 0.5 })),
      round: 0,
      score: 0,
      answered: false,
      finished: false,
      newBest: false
    };
    this.buildQuizChoices();
  }

  /** Lazily load data/sarf.json (top-30 root morphology) for the root quiz. */
  ensureSarf() {
    if (this.sarf || this._sarfLoading) return;
    this._sarfLoading = true;
    fetch('data/sarf.json')
      .then(r => { if (!r.ok) throw new Error('sarf not found'); return r.json(); })
      .then(data => {
        this.sarf = data;
        this._sarfLoading = false;
        if (this.mode === 'quiz' && this.quizType === 'roots' && !this.quiz) {
          this.startRootQuiz();
          this.render();
        }
      })
      .catch(() => {
        this._sarfLoading = false;
        this._sarfFailed = true;
        // Fall back to the word quiz so the tab never dead-ends.
        if (this.mode === 'quiz' && this.quizType === 'roots') {
          this.quizType = 'words';
          this.startQuiz();
          this.render();
        }
      });
  }

  /** Localized root gloss: SARF_GLOSS (defined in js/sarf.js) → English gloss. */
  rootGloss(root, info) {
    if (typeof SARF_GLOSS !== 'undefined'
        && SARF_GLOSS[this.language] && SARF_GLOSS[this.language][root]) {
      return SARF_GLOSS[this.language][root];
    }
    return (info && info.gloss) || '';
  }

  /** Random verb form {text, meaning} from a sarf root entry. */
  pickRootForm(info) {
    const list = (info && info.verbs) || [];
    if (!list.length) return null;
    const v = list[Math.floor(Math.random() * list.length)];
    return { text: v.form, meaning: v.meaning || '' };
  }

  /** "Which word comes from this root?" — 10 rounds over data/sarf.json roots. */
  startRootQuiz() {
    if (!this.sarf) {
      this.quiz = null;          // renderQuiz shows a loading card meanwhile
      this.ensureSarf();
      return;
    }
    const order = (this.sarf.order || Object.keys(this.sarf.roots || {}))
      .filter(r => ((this.sarf.roots[r] || {}).verbs || []).length);
    const picks = this.shuffle(order).slice(0, 10);
    const questions = picks.map(root => {
      const info = this.sarf.roots[root];
      const correct = this.pickRootForm(info);
      const seenTexts = new Set([correct.text]);
      const others = [];
      for (const r of this.shuffle(order)) {
        if (r === root) continue;
        const f = this.pickRootForm(this.sarf.roots[r]);
        if (!f || seenTexts.has(f.text)) continue;
        seenTexts.add(f.text);
        others.push({ form: f, correct: false });
        if (others.length === 3) break;
      }
      return {
        root,
        gloss: this.rootGloss(root, info),
        choices: this.shuffle([{ form: correct, correct: true }].concat(others))
      };
    });
    this.quiz = {
      type: 'roots', questions, round: 0, score: 0,
      answered: false, finished: false, newBest: false
    };
    this.buildQuizChoices();
  }

  /** Listening drill: play the word's Quran recording, pick the meaning. */
  startListenQuiz() {
    if (!this._idx) {
      this.quiz = null;          // renderQuiz shows a loading card meanwhile
      this.ensureWordIdx();
      return;
    }
    const pool = this.studyPool().filter(w => this.audioOcc(w));
    if (pool.length < 8) {
      // Not enough words with real recordings — hide the tab, use word quiz.
      this._idxFailed = true;
      this.quizType = 'words';
      this.startQuiz();
      return;
    }
    this.quiz = {
      type: 'listen',
      questions: this.shuffle(pool).slice(0, 10).map(w => ({ word: w })),
      round: 0, score: 0, answered: false, finished: false, newBest: false
    };
    this.buildQuizChoices();
    // Autoplay attempt (allowed after the tab click; degrades to the 🔊 button)
    const first = this.quiz.questions[0];
    setTimeout(() => {
      if (this.quiz && this.quiz.type === 'listen' && this.quiz.round === 0) this.playWord(first.word);
    }, 300);
  }

  /** Build the current round's answer buttons once, so re-renders are idempotent.
   *  Distractors are deduped by meaning AND Arabic form — two buttons must never
   *  show the same gloss (or, in reverse mode, the same word). */
  buildQuizChoices() {
    const q = this.quiz.questions[this.quiz.round];
    if (this.quiz.type === 'roots') {
      this.quiz.choices = q.choices;    // prebuilt per-question
      return;
    }
    const w = q.word;
    const seenMeanings = new Set([this.meaningOf(w)]);
    const seenArabic = new Set([w.arabic]);
    const others = [];
    for (const c of this.shuffle(this.studyPool())) {
      if (seenArabic.has(c.arabic) || seenMeanings.has(this.meaningOf(c))) continue;
      seenMeanings.add(this.meaningOf(c));
      seenArabic.add(c.arabic);
      others.push(c);
      if (others.length === 3) break;
    }
    this.quiz.choices = this.shuffle(
      [{ word: w, correct: true }].concat(others.map(o => ({ word: o, correct: false })))
    );
  }

  renderQuizTypeTabs() {
    const mk = (ty, label) => {
      const active = this.quizType === ty;
      const cls = active
        ? 'bg-secondary text-white border-secondary'
        : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700';
      return `<button data-action="quiz-type" data-qt="${ty}"
                class="px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${cls}">${label}</button>`;
    };
    return `
      <div class="flex justify-center gap-1.5">
        ${mk('words', '🃏 ' + this.tt('vocab_quiz_words'))}
        ${this._sarfFailed ? '' : mk('roots', '🌱 ' + this.tt('vocab_quiz_roots'))}
        ${this._idxFailed ? '' : mk('listen', '🔊 ' + this.tt('vocab_quiz_listen'))}
      </div>
    `;
  }

  renderQuiz() {
    const lang = this.language;
    if (!this.quiz && this.quizType === 'roots' && !this.sarf) {
      this.ensureSarf();
      return `
        ${this.renderQuizTypeTabs()}
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-10 text-center text-gray-500 dark:text-gray-400">
          <div class="text-3xl animate-pulse">🌱</div>
        </div>
      `;
    }
    if (!this.quiz && this.quizType === 'listen' && !this._idx) {
      this.ensureWordIdx();
      return `
        ${this.renderQuizTypeTabs()}
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-10 text-center text-gray-500 dark:text-gray-400">
          <div class="text-3xl animate-pulse">🔊</div>
        </div>
      `;
    }
    if (!this.quiz) this.startQuiz();
    if (this.quiz.finished) return this.renderQuizEnd();

    const q = this.quiz.questions[this.quiz.round];
    if (!this.quiz.choices) this.buildQuizChoices();
    const choices = this.quiz.choices;
    const isRoots = this.quiz.type === 'roots';
    const isListen = this.quiz.type === 'listen';
    const reversed = !isRoots && !isListen && q.rev;

    let promptCard;
    if (isListen) {
      promptCard = `
        <button data-action="quiz-play" title="${this.tt('vocab_play_word')}"
                class="w-20 h-20 rounded-full bg-primary hover:bg-primary/80 text-white text-3xl shadow-lg transition-colors">🔊</button>
        <div data-listen-reveal class="hidden pt-3">
          <span class="ayah-arabic !text-4xl !leading-normal" dir="rtl">${q.word.arabic}</span>
          <div class="text-sm italic text-gray-400 dark:text-gray-500" dir="ltr">${q.word.translit}</div>
        </div>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-4">${this.tt('vocab_listen_prompt')}</p>
      `;
    } else if (isRoots) {
      promptCard = `
        <div class="ayah-arabic !text-6xl !leading-normal tracking-widest" dir="rtl">${q.root.split('').join(' ')}</div>
        <div class="text-base text-gray-500 dark:text-gray-400 mt-3" dir="auto">${this.escapeHtml(q.gloss)}</div>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-4">${this.tt('vocab_root_prompt')}</p>
      `;
    } else if (reversed) {
      promptCard = `
        <div class="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100" dir="auto">${this.escapeHtml(this.meaningOf(q.word))}</div>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-4">${this.tt('vocab_choose_arabic')}</p>
      `;
    } else {
      promptCard = `
        <div class="ayah-arabic !text-6xl !leading-normal" dir="rtl">${q.word.arabic}</div>
        <div class="text-base text-gray-400 dark:text-gray-500 italic mt-3" dir="ltr">${q.word.translit}</div>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-4">${t('vocab_choose_meaning', lang)}</p>
      `;
    }

    const arabicChoices = isRoots || reversed;

    return `
      ${this.renderQuizTypeTabs()}
      <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <span>${t('vocab_question_of', lang)
          .replace('{current}', this.quiz.round + 1)
          .replace('{total}', this.quiz.questions.length)}</span>
        <span>${t('vocab_score', lang).replace('{score}', this.quiz.score)}</span>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 text-center">
        ${promptCard}
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        ${choices.map(c => {
          const label = isRoots
            ? `<span class="ayah-arabic !text-2xl !leading-normal">${c.form.text}</span>`
            : (reversed
              ? `<span class="ayah-arabic !text-2xl !leading-normal">${c.word.arabic}</span>`
              : this.meaningOf(c.word));
          return `
          <button data-action="quiz-choice" data-correct="${c.correct ? '1' : '0'}" dir="${arabicChoices ? 'rtl' : 'auto'}"
                  class="px-4 py-4 rounded-xl text-lg font-medium border-2 border-gray-200 dark:border-gray-700
                         bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100
                         hover:border-primary dark:hover:border-blue-400 transition-colors">
            ${label}
          </button>`;
        }).join('')}
      </div>
    `;
  }

  answerQuiz(btn) {
    if (!this.quiz || this.quiz.answered || this.quiz.finished) return;
    this.quiz.answered = true;

    const correct = btn.getAttribute('data-correct') === '1';
    if (correct) this.quiz.score++;

    // Listening round: reveal the Arabic word alongside the graded buttons
    if (this.quiz.type === 'listen') {
      const rv = this.root.querySelector('[data-listen-reveal]');
      if (rv) rv.classList.remove('hidden');
    }

    this.root.querySelectorAll('[data-action="quiz-choice"]').forEach(b => {
      b.disabled = true;
      b.classList.remove('hover:border-primary', 'dark:hover:border-blue-400');
      if (b.getAttribute('data-correct') === '1') {
        b.classList.remove('border-gray-200', 'dark:border-gray-700', 'bg-white', 'dark:bg-gray-800');
        b.classList.add('border-green-500', 'bg-green-100', 'dark:bg-green-900/40',
          'text-green-800', 'dark:text-green-300');
        b.insertAdjacentHTML('afterbegin', '<span aria-hidden="true" class="me-1">✓</span>');
      } else if (b === btn) {
        b.classList.remove('border-gray-200', 'dark:border-gray-700', 'bg-white', 'dark:bg-gray-800');
        b.classList.add('border-red-500', 'bg-red-100', 'dark:bg-red-900/40',
          'text-red-800', 'dark:text-red-300');
        b.insertAdjacentHTML('afterbegin', '<span aria-hidden="true" class="me-1">✗</span>');
      }
    });

    this.quizTimer = setTimeout(() => {
      this.quizTimer = null;
      this.quiz.answered = false;
      this.quiz.round++;
      if (this.quiz.round >= this.quiz.questions.length) {
        this.quiz.finished = true;
        const best = this.getBestScore(this.quiz.type);
        if (best === null || this.quiz.score > best) {
          this.saveBestScore(this.quiz.score, this.quiz.type);
          this.quiz.newBest = true;
        }
      } else {
        this.buildQuizChoices();
      }
      this.render();
      if (this.quiz.type === 'listen' && !this.quiz.finished) {
        const nq = this.quiz.questions[this.quiz.round];
        setTimeout(() => {
          if (this.quiz && this.quiz.type === 'listen' && !this.quiz.answered) this.playWord(nq.word);
        }, 250);
      }
    }, 1100);
  }

  renderQuizEnd() {
    const lang = this.language;
    const best = this.getBestScore(this.quiz.type);
    return `
      ${this.renderQuizTypeTabs()}
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-10 text-center space-y-4">
        <div class="text-5xl">${this.quiz.score >= 7 ? '🏆' : '📚'}</div>
        <h3 class="text-xl font-bold">${t('vocab_quiz_complete', lang)}</h3>
        <p class="text-3xl font-bold text-primary dark:text-blue-400">
          ${t('vocab_your_score', lang)
            .replace('{score}', this.quiz.score)
            .replace('{total}', this.quiz.questions.length)}
        </p>
        ${this.quiz.newBest
          ? `<p class="text-green-600 dark:text-green-400 font-medium">${t('vocab_new_best', lang)}</p>`
          : (best !== null
            ? `<p class="text-sm text-gray-500 dark:text-gray-400">${t('vocab_best_score', lang).replace('{score}', best)}</p>`
            : '')}
        <button data-action="play-again"
                class="px-6 py-3 bg-primary hover:bg-primary/80 text-white rounded-xl font-medium transition-colors">
          ${t('vocab_play_again', lang)}
        </button>
      </div>
    `;
  }

  // ---------- review (spaced-repetition-lite) ----------

  /**
   * Grade the current review card. Good doubles the interval (1d → 2d → …,
   * capped at 30d); Again resets it and re-queues the card ~5 minutes out
   * (it stays in this session's queue so it comes around again).
   */
  gradeReview(good) {
    const w = this.reviewQueue && this.reviewQueue[0];
    if (!w) return;
    const rev = this.getReview();
    const r = rev[w.arabic];
    if (good) {
      const iv = (r && r.iv) ? Math.min(r.iv * 2, 30) : 1;
      rev[w.arabic] = { iv, due: Date.now() + iv * 86400000 };
      this.reviewQueue.shift();
    } else {
      rev[w.arabic] = { iv: 0, due: Date.now() + 5 * 60000 };
      if (this.reviewQueue.length > 1) this.reviewQueue.push(this.reviewQueue.shift());
    }
    this.saveReview(rev);
    this.reviewedCount++;
    this.reviewRevealed = false;
    if (!this.reviewQueue.length) {
      this.reviewQueue = this.shuffle(this.dueList()).slice(0, 20);
    }
    this.render();
  }

  renderReview() {
    const rev = this.getReview();
    if (!this.reviewQueue || !this.reviewQueue.length) {
      this.reviewQueue = this.shuffle(this.dueList()).slice(0, 20);
    }

    if (!this.reviewQueue.length) {
      const future = Object.values(rev).map(r => r.due).filter(d => d > Date.now());
      const next = future.length ? Math.min(...future) : null;
      return `
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-10 text-center space-y-3">
          <div class="text-5xl">🎉</div>
          <p class="font-medium text-gray-700 dark:text-gray-200">${this.tt('vocab_review_empty')}</p>
          ${next ? `<p class="text-sm text-gray-500 dark:text-gray-400">${this.tt('vocab_next_due', { time: this.formatDue(next) })}</p>` : ''}
          ${this.reviewedCount ? `<p class="text-sm text-green-600 dark:text-green-400">${this.tt('vocab_reviewed_count', { count: this.reviewedCount })}</p>` : ''}
        </div>
      `;
    }

    const w = this.reviewQueue[0];
    const r = rev[w.arabic];
    const isNew = !r;
    const dueCount = this.dueList().length;
    const goodIv = (r && r.iv) ? Math.min(r.iv * 2, 30) : 1;

    return `
      <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <span>📥 ${this.tt('vocab_due', { count: dueCount })}</span>
        <span>${this.reviewedCount ? this.tt('vocab_reviewed_count', { count: this.reviewedCount }) : ''}</span>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 text-center space-y-4">
        ${isNew ? `<span class="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 uppercase">${this.tt('vocab_new_word')}</span>` : ''}
        <div class="ayah-arabic !text-6xl !leading-normal" dir="rtl">${w.arabic}</div>
        <div class="flex items-center justify-center gap-2 text-base text-gray-400 dark:text-gray-500 italic" dir="ltr">
          <span>${w.translit}</span>
          ${this.hasTTS() ? `<button data-action="rev-speak" data-text="${this.escapeHtml(w.arabic)}" title="${this.tt('vocab_play_word')}" aria-label="${this.tt('vocab_play_word')}" class="not-italic text-sm px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-primary hover:text-white">🔊</button>` : ''}
        </div>
        ${this.reviewRevealed ? `
          <div class="text-2xl font-semibold text-gray-800 dark:text-gray-100 pt-2" dir="auto">${this.escapeHtml(this.meaningOf(w))}</div>
          <div class="grid grid-cols-2 gap-3 pt-2 max-w-md mx-auto">
            <button data-action="rev-again"
                    class="px-4 py-3 rounded-xl font-medium bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors">
              🔁 ${this.tt('vocab_again')} <span class="text-xs opacity-70">5m</span>
            </button>
            <button data-action="rev-good"
                    class="px-4 py-3 rounded-xl font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors">
              ✓ ${this.tt('vocab_good')} <span class="text-xs opacity-70">${goodIv}d</span>
            </button>
          </div>` : `
          <button data-action="rev-show"
                  class="px-6 py-3 bg-primary hover:bg-primary/80 text-white rounded-xl font-medium transition-colors">
            👁 ${this.tt('vocab_show_meaning')}
          </button>`}
      </div>
    `;
  }

  // ---------- progress ----------

  renderProgress() {
    const lang = this.language;
    this.ensureExtra();
    const all = this.progressDeck();
    const knownWords = all.filter(w => w.known);
    const total = all.length;
    const percent = total ? Math.round((knownWords.length / total) * 100) : 0;
    const best = this.getBestScore('words');
    const bestRoots = this.getBestScore('roots');
    const bestListen = this.getBestScore('listen');

    // Mastery per theme (Core 50 + each thematic set), from the known list
    const knownSet = new Set(this.getKnown());
    const themes = (typeof VOCAB_THEMES !== 'undefined') ? VOCAB_THEMES : [];
    const groups = [{ icon: '⭐', name: this.tt('vocab_core_words'), words: VOCAB_WORDS }]
      .concat(themes.map(th => ({ icon: th.icon, name: th.names[lang] || th.names.en, words: th.words })));
    const masteryRows = groups.map(g => {
      const gTotal = g.words.length;
      const gKnown = g.words.filter(w => knownSet.has(w.arabic)).length;
      const gPct = gTotal ? Math.round((gKnown / gTotal) * 100) : 0;
      return `
        <div>
          <div class="flex items-center justify-between text-xs text-gray-600 dark:text-gray-300 mb-1">
            <span>${g.icon} ${g.name}</span>
            <span class="tabular-nums">${gKnown}/${gTotal}</span>
          </div>
          <div class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div class="h-full ${gPct === 100 ? 'bg-green-500' : 'bg-secondary'} rounded-full transition-all duration-500" style="width:${gPct}%"></div>
          </div>
        </div>`;
    }).join('');

    return `
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 space-y-6">
        <div>
          <div class="flex items-center justify-between mb-2 text-sm text-gray-600 dark:text-gray-300">
            <span>${t('vocab_words_known', lang)
              .replace('{known}', knownWords.length)
              .replace('{total}', total)}</span>
            <span class="font-semibold">${percent}%</span>
          </div>
          <div class="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div class="h-full bg-secondary rounded-full transition-all duration-500" style="width:${percent}%"></div>
          </div>
        </div>

        ${best !== null ? `
          <p class="text-sm text-gray-500 dark:text-gray-400">
            🃏 ${this.tt('vocab_quiz_words')} — ${t('vocab_best_score', lang).replace('{score}', best)}
          </p>` : ''}
        ${bestRoots !== null ? `
          <p class="text-sm text-gray-500 dark:text-gray-400">
            🌱 ${this.tt('vocab_quiz_roots')} — ${t('vocab_best_score', lang).replace('{score}', bestRoots)}
          </p>` : ''}
        ${bestListen !== null ? `
          <p class="text-sm text-gray-500 dark:text-gray-400">
            🔊 ${this.tt('vocab_quiz_listen')} — ${t('vocab_best_score', lang).replace('{score}', bestListen)}
          </p>` : ''}

        <div>
          <h3 class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-3">${this.tt('vocab_mastery')}</h3>
          <div class="space-y-3">${masteryRows}</div>
        </div>

        <div>
          <h3 class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-3">${t('vocab_known_words', lang)}</h3>
          ${knownWords.length ? `
            <div class="flex flex-wrap gap-2" dir="rtl">
              ${knownWords.map(w => `
                <span class="ayah-arabic !text-xl px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                  ${w.arabic}
                </span>`).join('')}
            </div>` : `
            <p class="text-sm text-gray-500 dark:text-gray-400">${t('vocab_no_known_words', lang)}</p>`}
        </div>

        <div class="pt-2 border-t border-gray-200 dark:border-gray-700">
          <button data-action="reset"
                  class="px-4 py-2 rounded-lg text-sm font-medium transition-colors ${this.resetArmed
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/50'}">
            ${this.resetArmed ? t('vocab_reset_confirm', lang) : t('vocab_reset_progress', lang)}
          </button>
        </div>
      </div>
    `;
  }

  handleReset() {
    if (this.resetTimer) { clearTimeout(this.resetTimer); this.resetTimer = null; }

    if (!this.resetArmed) {
      // First click: arm the button; disarm automatically after 4s
      this.resetArmed = true;
      this.resetTimer = setTimeout(() => {
        this.resetTimer = null;
        this.resetArmed = false;
        if (this.mode === 'progress') this.render();
      }, 4000);
      this.render();
      return;
    }

    // Second click: actually reset
    this.resetArmed = false;
    try {
      localStorage.removeItem('vocabKnown');
      localStorage.removeItem('vocabQuizBest');
      localStorage.removeItem('vocabQuizBestRoots');
      localStorage.removeItem('vocabQuizBestListen');
      localStorage.removeItem('vocabReview');
      localStorage.removeItem('lq_vocab_fav');
    } catch (err) { /* ignore */ }
    if (this.category === 'fav') this.category = 'all';
    this.reviewQueue = null;
    this.reviewedCount = 0;
    this.render();
  }
}

// Initialize when DOM is ready
let vocabTrainer;
document.addEventListener('DOMContentLoaded', () => {
  vocabTrainer = new VocabTrainer();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { VocabTrainer };
}
