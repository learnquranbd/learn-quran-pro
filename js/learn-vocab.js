/**
 * Vocabulary Trainer Module (Learn tab > Vocabulary)
 * Flashcards + quiz + progress tracking for the 50 most frequent Quran words.
 * Renders into #learn-vocab-root when the 'learnModuleSelected' event fires
 * with {module:'vocab'}. Uses VOCAB_WORDS from js/vocab-data.js.
 */

class VocabTrainer {
  constructor() {
    this.root = document.getElementById('learn-vocab-root');
    if (!this.root) return;

    this.language = (typeof appSettings !== 'undefined' && appSettings)
      ? appSettings.get('language')
      : 'en';

    this.rendered = false;
    this.mode = 'flashcards';

    // Quiz state
    this.quiz = null;
    this.quizTimer = null;

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

  getBestScore() {
    const v = parseInt(localStorage.getItem('vocabQuizBest'), 10);
    return isNaN(v) ? null : v;
  }

  saveBestScore(score) {
    try {
      localStorage.setItem('vocabQuizBest', String(score));
    } catch (err) { /* ignore */ }
  }

  // ---------- helpers ----------

  escapeHtml(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  meaningOf(word) {
    return word.meanings[this.language] || word.meanings.en;
  }

  shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
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

  // ---------- events ----------

  onClick(e) {
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
    else body = this.renderProgress();

    this.root.innerHTML = `
      <div dir="${dir}" class="w-full space-y-6">
        <div class="text-center">
          <h2 class="text-2xl font-bold">${t('vocab_title', lang)}</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">${t('vocab_subtitle', lang)}</p>
        </div>
        <div class="flex justify-center gap-2 flex-wrap">
          ${this.renderModeTab('flashcards', t('flashcards', lang))}
          ${this.renderModeTab('quiz', t('quiz', lang))}
          ${this.renderModeTab('progress', t('progress', lang))}
        </div>
        ${body}
      </div>
    `;
  }

  renderModeTab(mode, label) {
    const active = this.mode === mode;
    const cls = active
      ? 'bg-primary text-white dark:bg-blue-600'
      : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700';
    return `
      <button data-action="mode" data-mode="${mode}"
              class="px-4 py-2 rounded-lg text-sm font-medium transition-colors ${cls}">
        ${label}
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
    const list = VOCAB_WORDS.map(w => ({ ...w, key: w.arabic }))
      .concat(this.extra || []);
    return list.map(w => ({ ...w, key: w.key || w.arabic, known: known.has(w.arabic) }));
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

  renderFlashcards() {
    const lang = this.language;
    this.ensureExtra();
    const all = this.deckAll();
    const pageSize = 24;
    const shownCount = Math.min(((this.page || 0) + 1) * pageSize, all.length);
    const items = all.slice(0, shownCount);
    const show = this.showMeanings();
    const knownCount = all.filter(w => w.known).length;
    setTimeout(() => this.prefetchDyn(items), 0);

    return `
      <div class="flex flex-wrap items-center justify-center gap-3 text-sm text-gray-500 dark:text-gray-400">
        <span><b class="text-gray-800 dark:text-gray-100">${all.length}</b> ${t('vocab_words_label', lang)}</span>
        <span>✓ <b class="text-green-600">${knownCount}</b></span>
        <button data-action="vmeanings" class="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs">
          ${show ? '🙈 ' + t('vocab_hide_meanings', lang) : '👁 ' + t('vocab_show_meanings', lang)}
        </button>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
        ${items.map((w, i) => {
          const key = w.dyn ? `${w.norm}:${lang}` : '';
          const revealed = show || (this.revealed && this.revealed.has(w.key));
          const ref = w.dyn ? w.ref : (this.curatedRefs || {})[w.arabic];
          return `
          <div class="rounded-xl bg-white dark:bg-gray-800 border ${w.known ? 'border-green-300 dark:border-green-700' : 'border-gray-200 dark:border-gray-700'} p-2.5 flex flex-col items-center gap-1">
            <button data-vcard="${this.escapeHtml(w.key)}" data-text="${this.escapeHtml(w.arabic)}" class="flex flex-col items-center gap-0.5 w-full">
              <span class="ayah-arabic !text-3xl !leading-normal" dir="rtl">${w.arabic}</span>
              ${w.translit ? `<span class="text-xs italic text-gray-400">${w.translit}</span>` : ''}
              <span class="text-sm text-gray-700 dark:text-gray-200 text-center leading-tight min-h-[1.25rem]" dir="auto" ${w.dyn ? `data-vmean="${this.escapeHtml(key)}"` : ''}>
                ${revealed ? this.escapeHtml(this.cardMeaning(w)) : '•••'}
              </span>
            </button>
            <div class="flex items-center gap-1.5">
              <span class="text-xs text-gray-400">×${w.count}</span>
              ${ref ? `<button data-vocab-verse="${ref}" data-word="${this.escapeHtml(w.arabic)}" title="${t('names_search_quran', lang)}"
                      class="text-xs px-1.5 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-400 hover:bg-primary hover:text-white">📖</button>` : ''}
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
    this.quiz = {
      questions: this.shuffle(VOCAB_WORDS).slice(0, 10),
      round: 0,
      score: 0,
      answered: false,
      finished: false,
      newBest: false
    };
    this.buildQuizChoices();
  }

  /** Build the current round's answer buttons once, so re-renders are idempotent.
   *  Distractors are deduped by meaning — two buttons must never show the same gloss. */
  buildQuizChoices() {
    const q = this.quiz.questions[this.quiz.round];
    const seen = new Set([this.meaningOf(q)]);
    const others = [];
    for (const w of this.shuffle(VOCAB_WORDS)) {
      if (w.arabic === q.arabic || seen.has(this.meaningOf(w))) continue;
      seen.add(this.meaningOf(w));
      others.push(w);
      if (others.length === 3) break;
    }
    this.quiz.choices = this.shuffle(
      [{ word: q, correct: true }].concat(others.map(w => ({ word: w, correct: false })))
    );
  }

  renderQuiz() {
    const lang = this.language;
    if (!this.quiz) this.startQuiz();
    if (this.quiz.finished) return this.renderQuizEnd();

    const q = this.quiz.questions[this.quiz.round];
    if (!this.quiz.choices) this.buildQuizChoices();
    const choices = this.quiz.choices;

    return `
      <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <span>${t('vocab_question_of', lang)
          .replace('{current}', this.quiz.round + 1)
          .replace('{total}', this.quiz.questions.length)}</span>
        <span>${t('vocab_score', lang).replace('{score}', this.quiz.score)}</span>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 text-center">
        <div class="ayah-arabic !text-6xl !leading-normal" dir="rtl">${q.arabic}</div>
        <div class="text-base text-gray-400 dark:text-gray-500 italic mt-3" dir="ltr">${q.translit}</div>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-4">${t('vocab_choose_meaning', lang)}</p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        ${choices.map(c => `
          <button data-action="quiz-choice" data-correct="${c.correct ? '1' : '0'}" dir="auto"
                  class="px-4 py-4 rounded-xl text-lg font-medium border-2 border-gray-200 dark:border-gray-700
                         bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100
                         hover:border-primary dark:hover:border-blue-400 transition-colors">
            ${this.meaningOf(c.word)}
          </button>
        `).join('')}
      </div>
    `;
  }

  answerQuiz(btn) {
    if (!this.quiz || this.quiz.answered || this.quiz.finished) return;
    this.quiz.answered = true;

    const correct = btn.getAttribute('data-correct') === '1';
    if (correct) this.quiz.score++;

    this.root.querySelectorAll('[data-action="quiz-choice"]').forEach(b => {
      b.disabled = true;
      b.classList.remove('hover:border-primary', 'dark:hover:border-blue-400');
      if (b.getAttribute('data-correct') === '1') {
        b.classList.remove('border-gray-200', 'dark:border-gray-700', 'bg-white', 'dark:bg-gray-800');
        b.classList.add('border-green-500', 'bg-green-100', 'dark:bg-green-900/40',
          'text-green-800', 'dark:text-green-300');
        b.insertAdjacentHTML('afterbegin', '<span aria-hidden="true" class="mr-1">✓</span>');
      } else if (b === btn) {
        b.classList.remove('border-gray-200', 'dark:border-gray-700', 'bg-white', 'dark:bg-gray-800');
        b.classList.add('border-red-500', 'bg-red-100', 'dark:bg-red-900/40',
          'text-red-800', 'dark:text-red-300');
        b.insertAdjacentHTML('afterbegin', '<span aria-hidden="true" class="mr-1">✗</span>');
      }
    });

    this.quizTimer = setTimeout(() => {
      this.quizTimer = null;
      this.quiz.answered = false;
      this.quiz.round++;
      if (this.quiz.round >= this.quiz.questions.length) {
        this.quiz.finished = true;
        const best = this.getBestScore();
        if (best === null || this.quiz.score > best) {
          this.saveBestScore(this.quiz.score);
          this.quiz.newBest = true;
        }
      } else {
        this.buildQuizChoices();
      }
      this.render();
    }, 1100);
  }

  renderQuizEnd() {
    const lang = this.language;
    const best = this.getBestScore();
    return `
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

  // ---------- progress ----------

  renderProgress() {
    const lang = this.language;
    this.ensureExtra();
    const all = this.deckAll();
    const knownWords = all.filter(w => w.known);
    const total = all.length;
    const percent = total ? Math.round((knownWords.length / total) * 100) : 0;
    const best = this.getBestScore();

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
            ${t('vocab_best_score', lang).replace('{score}', best)}
          </p>` : ''}

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
    } catch (err) { /* ignore */ }
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
