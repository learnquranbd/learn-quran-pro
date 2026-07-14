/**
 * 99 Names of Allah Module (Learn tab > Names)
 * Browse grid with search + audio, and a 10-round meaning quiz.
 * Renders lazily into #learn-names-root when the Learn hub dispatches
 * 'learnModuleSelected' with {module:'names'}. Uses NAMES_99 from
 * js/names-data.js and browser TTS (Arabic voice) with graceful fallback.
 */

const NAMES_QUIZ_ROUNDS = 10;
const NAMES_QUIZ_BEST_KEY = 'namesQuizBest';

class NamesOfAllah {
  constructor() {
    this.root = document.getElementById('learn-names-root');

    this.language = (typeof appSettings !== 'undefined' && appSettings)
      ? appSettings.get('language')
      : 'en';

    this.rendered = false;
    this.mode = 'browse';            // browse | quiz
    this.query = '';                 // browse search text
    this.quiz = null;                // active quiz state
    this.quizTimer = null;
    this.ttsNoteDismissed = false;
    this.listenersBound = false;

    if (this.root) this.bindListeners();

    window.addEventListener('learnModuleSelected', (e) => {
      if (e.detail && e.detail.module === 'names') {
        // The root may be injected after this script was constructed
        if (!this.root) {
          this.root = document.getElementById('learn-names-root');
          if (this.root) this.bindListeners();
        }
        if (!this.rendered && this.root) {
          this.rendered = true;
          this.render();
        }
      }
    });

    window.addEventListener('settingChanged', (e) => {
      if (e.detail && e.detail.key === 'language') {
        this.language = e.detail.value;
        if (this.rendered) this.render();
      }
    });

    // Warm up the async voice list so an Arabic voice is ready on first tap
    if (window.speechSynthesis) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.addEventListener?.('voiceschanged', () => {}, { once: true });
    }
  }

  bindListeners() {
    if (this.listenersBound || !this.root) return;
    this.listenersBound = true;
    this.root.addEventListener('click', (e) => this.onClick(e));
    this.root.addEventListener('input', (e) => {
      if (e.target && e.target.id === 'names-search') {
        this.query = e.target.value;
        this.updateGrid();
      }
    });
  }

  // ---------- persistence ----------

  getBestScore() {
    try {
      const v = parseInt(localStorage.getItem(NAMES_QUIZ_BEST_KEY), 10);
      return isNaN(v) ? null : v;
    } catch (err) {
      return null;
    }
  }

  saveBestScore(score) {
    try {
      localStorage.setItem(NAMES_QUIZ_BEST_KEY, String(score));
    } catch (err) { /* private mode — ignore */ }
  }

  // ---------- helpers ----------

  meaningOf(name) {
    return name.meanings[this.language] || name.meanings.en;
  }

  shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // ---------- TTS ----------

  /**
   * Speak an Arabic name via speech synthesis; prefer an Arabic voice.
   * Falls back gracefully (visual-only + dismissible note) when unavailable.
   */
  speakArabic(text) {
    if (!window.speechSynthesis || typeof SpeechSynthesisUtterance === 'undefined') {
      this.showTtsNote();
      return;
    }
    const synth = window.speechSynthesis;
    const voices = synth.getVoices();
    if (!voices.length) {
      // No voices at all on this device — keep working visually
      this.showTtsNote();
    }
    const arVoice = voices.find(v => v.lang && v.lang.toLowerCase().startsWith('ar'));
    const utter = new SpeechSynthesisUtterance(text);
    if (arVoice) utter.voice = arVoice;
    utter.lang = arVoice ? arVoice.lang : 'ar-SA';
    utter.rate = 0.8;
    try {
      synth.cancel();
      synth.speak(utter);
    } catch (err) {
      this.showTtsNote();
    }
  }

  showTtsNote() {
    if (this.ttsNoteDismissed) return;
    const note = this.root.querySelector('#names-tts-note');
    if (note) note.classList.remove('hidden');
  }

  // ---------- name detail (audio + Quranic occurrences + reflection) ------

  async loadTokens() {
    if (!this._tokensPromise) this._tokensPromise = fetch('data/quran-tokens.json').then(r => r.json()).catch(() => null);
    return this._tokensPromise;
  }

  ensureNameModal() {
    if (this.nameModal) return;
    this.nameModal = document.createElement('div');
    this.nameModal.id = 'names-detail-modal';
    this.nameModal.className = 'fixed inset-0 bg-black/60 z-[70] items-center justify-center p-4 hidden';
    this.nameModal.innerHTML = `
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-lg max-h-[85vh] flex flex-col">
        <div class="flex items-center gap-2 px-5 py-3 border-b border-gray-200 dark:border-gray-700">
          <h3 id="names-detail-title" class="flex-1 font-bold text-gray-800 dark:text-gray-100"></h3>
          <button id="names-detail-close" class="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700">✕</button>
        </div>
        <div id="names-detail-body" class="flex-1 overflow-y-auto p-5"></div>
      </div>`;
    document.body.appendChild(this.nameModal);
    if (window.escClose) window.escClose(this.nameModal, () => { if (this._nameAudio) this._nameAudio.pause(); this.nameModal.classList.add('hidden'); this.nameModal.classList.remove('flex'); });
    this.nameModal.addEventListener('click', (e) => {
      if (e.target === this.nameModal || e.target.closest('#names-detail-close')) {
        if (this._nameAudio) this._nameAudio.pause();
        this.nameModal.classList.add('hidden'); this.nameModal.classList.remove('flex'); return;
      }
      const sp = e.target.closest('[data-name-speak]');
      if (sp) {
        // Prefer real recitation (resolved from the name's first Quranic occurrence)
        const url = sp.getAttribute('data-name-audio');
        if (url) {
          if (!this._nameAudio) this._nameAudio = new Audio();
          this._nameAudio.src = url;
          this._nameAudio.play().catch(() => this.speakArabic(sp.getAttribute('data-name-speak')));
        } else {
          this.speakArabic(sp.getAttribute('data-name-speak'));
        }
        return;
      }
      const verse = e.target.closest('[data-verse]');
      if (verse) {
        const ref = verse.getAttribute('data-verse');
        const nm = this._openName;
        if (typeof ayahModal !== 'undefined' && ayahModal) ayahModal.open(ref, { word: nm ? nm.ar : null });
      }
    });
  }

  async openName(name) {
    const lang = this.language;
    this._openName = name;
    this.ensureNameModal();
    this.nameModal.classList.remove('hidden'); this.nameModal.classList.add('flex');
    this.speakArabic(name.ar);
    const title = this.nameModal.querySelector('#names-detail-title');
    const body = this.nameModal.querySelector('#names-detail-body');
    title.textContent = `${name.n}. ${name.translit}`;
    body.innerHTML = `
      <div class="text-center mb-4">
        <div class="ayah-arabic !text-5xl mb-2" dir="rtl">${name.ar}</div>
        <div class="text-lg font-semibold text-gray-800 dark:text-gray-100">${this.escapeHtml(name.translit)}</div>
        <div class="text-gray-500 dark:text-gray-400" dir="auto">${this.escapeHtml(this.meaningOf(name))}</div>
        <button data-name-speak="${this.escapeHtml(name.ar)}" class="mt-3 px-4 py-2 rounded-lg bg-primary text-white text-sm hover:bg-primary/80">🔊 ${t('play', lang)}</button>
      </div>
      <div class="rounded-xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 p-4 mb-4">
        <p class="text-sm text-indigo-800 dark:text-indigo-200" dir="auto">💭 ${t('names_reflect_lead', lang)} <b>${this.escapeHtml(this.meaningOf(name))}</b>. ${t('names_reflect_body', lang)}</p>
        <div class="flex flex-wrap gap-2 mt-3">
          <a href="https://quran.com/search?q=${encodeURIComponent(name.ar)}" target="_blank" rel="noopener" class="text-xs px-3 py-1.5 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:shadow">🔎 ${t('names_search_quran', lang)}</a>
          <a href="https://myislam.org/99-names-of-allah/" target="_blank" rel="noopener" class="text-xs px-3 py-1.5 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:shadow">📖 ${t('names_learn_more', lang)}</a>
        </div>
      </div>
      <div id="names-occ"><p class="text-center text-gray-400 text-sm py-2">${t('loading', lang)}</p></div>`;
    // Quranic occurrences (exact word appearances) from bundled tokens.
    const occBox = body.querySelector('#names-occ');
    try {
      const tokens = await this.loadTokens();
      const norm = (QuranData && QuranData.normalizeWord) ? QuranData.normalizeWord(name.ar) : name.ar;
      const refs = [];
      if (tokens) {
        for (const key in tokens) { if (tokens[key].includes(norm)) refs.push(key); }
      }
      refs.sort((a, b) => { const [s1, a1] = a.split(':').map(Number), [s2, a2] = b.split(':').map(Number); return s1 - s2 || a1 - a2; });
      if (!refs.length) {
        occBox.innerHTML = `<p class="text-center text-gray-400 text-sm py-2">${t('names_no_occurrences', lang)}</p>`;
      } else {
        const shown = refs.slice(0, 60);
        occBox.innerHTML = `
          <h4 class="text-sm font-bold mb-2">📿 ${t('names_in_quran', lang)} <span class="text-gray-400 font-normal">(${refs.length})</span></h4>
          <div class="flex flex-wrap gap-1.5">
            ${shown.map(r => `<button data-verse="${r}" class="text-xs font-mono px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-primary hover:text-white">${r}</button>`).join('')}
            ${refs.length > shown.length ? `<span class="text-xs text-gray-400 self-center">+${refs.length - shown.length}</span>` : ''}
          </div>`;

        // Resolve REAL recitation for this name: the matching word's audio in its
        // first Quranic occurrence (quran.com word audio) — beats robotic TTS.
        try {
          const [s, a] = refs[0].split(':').map(Number);
          const v = (await QuranData.fetchRange(s, a, a, lang))[0];
          const w = (v && v.words || []).find(x => QuranData.normalizeWord(x.arabic) === norm && x.audio);
          const playBtn = body.querySelector('[data-name-speak]');
          if (w && playBtn) playBtn.setAttribute('data-name-audio', w.audio);
        } catch (e) { /* TTS fallback stays */ }
      }
    } catch (e) {
      occBox.innerHTML = '';
    }
  }

  // ---------- events ----------

  onClick(e) {
    const dismissBtn = e.target.closest('[data-names-tts-dismiss]');
    if (dismissBtn) {
      this.ttsNoteDismissed = true;
      const note = this.root.querySelector('#names-tts-note');
      if (note) note.classList.add('hidden');
      return;
    }

    const el = e.target.closest('[data-action]');
    if (!el || !this.root.contains(el)) return;

    switch (el.getAttribute('data-action')) {
      case 'mode':
        this.setMode(el.getAttribute('data-mode'));
        break;
      case 'speak': {
        const n = parseInt(el.getAttribute('data-n'), 10);
        const name = NAMES_99.find(x => x.n === n);
        if (name) this.openName(name);
        break;
      }
      case 'quiz-choice':
        this.answerQuiz(el);
        break;
      case 'play-again':
        this.startQuiz();
        this.render();
        break;
    }
  }

  setMode(mode) {
    this.mode = mode;
    if (this.quizTimer) { clearTimeout(this.quizTimer); this.quizTimer = null; }
    if (mode === 'quiz') this.startQuiz();
    this.render();
  }

  // ---------- rendering ----------

  render() {
    if (!this.root) return;
    const lang = this.language;
    const dir = (typeof isRTL === 'function' && isRTL(lang)) ? 'rtl' : 'ltr';

    const body = this.mode === 'quiz' ? this.renderQuiz() : this.renderBrowse();

    this.root.innerHTML = `
      <div dir="${dir}" class="w-full space-y-6">
        <div class="text-center">
          <h2 class="text-2xl font-bold">${t('names_title', lang)}</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">${t('names_subtitle', lang)}</p>
        </div>
        <div class="flex justify-center gap-2 flex-wrap">
          ${this.renderModeTab('browse', t('names_browse', lang))}
          ${this.renderModeTab('quiz', t('quiz', lang))}
        </div>
        ${this.renderTtsNote(lang)}
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

  renderTtsNote(lang) {
    return `
      <div id="names-tts-note" class="hidden flex items-center justify-between gap-3 max-w-xl mx-auto
                  bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800
                  text-yellow-800 dark:text-yellow-200 text-sm rounded-xl px-4 py-2">
        <span>🔇 ${t('tts_unavailable', lang)}</span>
        <button data-names-tts-dismiss
                class="shrink-0 px-2 py-1 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-900/40 font-bold"
                title="${t('dismiss', lang)}">✕</button>
      </div>
    `;
  }

  // ---------- browse ----------

  filteredNames() {
    const q = this.query.trim().toLowerCase();
    if (!q) return NAMES_99;
    return NAMES_99.filter(name =>
      String(name.n) === q
      || name.translit.toLowerCase().includes(q)
      || this.meaningOf(name).toLowerCase().includes(q)
      || name.meanings.en.toLowerCase().includes(q)
      || name.ar.includes(this.query.trim())
    );
  }

  renderBrowse() {
    const lang = this.language;
    return `
      <div class="max-w-md mx-auto">
        <input id="names-search" type="text" dir="auto"
               value="${this.escapeHtml(this.query)}"
               placeholder="${t('names_search_placeholder', lang)}"
               class="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700
                      bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100
                      placeholder-gray-400 dark:placeholder-gray-500
                      focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-blue-500">
      </div>
      <p class="text-center text-xs text-gray-400 dark:text-gray-500">🔊 ${t('names_tap_hint', lang)}</p>
      <div id="names-grid">
        ${this.renderGrid()}
      </div>
    `;
  }

  renderGrid() {
    const lang = this.language;
    const names = this.filteredNames();
    if (!names.length) {
      return `<p class="text-center text-sm text-gray-500 dark:text-gray-400 py-10">${t('no_results', lang)}</p>`;
    }
    return `
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        ${names.map(name => this.renderCard(name)).join('')}
      </div>
    `;
  }

  renderCard(name) {
    return `
      <button data-action="speak" data-n="${name.n}"
              class="relative bg-white dark:bg-gray-800 rounded-2xl shadow border border-gray-200 dark:border-gray-700
                     hover:shadow-lg hover:border-primary dark:hover:border-blue-400 transition-all
                     p-4 pt-6 flex flex-col items-center text-center gap-1">
        <span class="absolute top-2 start-2 w-7 h-7 flex items-center justify-center text-xs font-bold rounded-full
                     bg-primary/10 text-primary dark:bg-blue-900/40 dark:text-blue-300">${name.n}</span>
        <span class="ayah-arabic !text-3xl !leading-normal" dir="rtl">${name.ar}</span>
        <span class="text-sm font-semibold text-gray-700 dark:text-gray-200" dir="ltr">${name.translit}</span>
        <span class="text-xs text-gray-500 dark:text-gray-400" dir="auto">${this.meaningOf(name)}</span>
      </button>
    `;
  }

  updateGrid() {
    const grid = this.root.querySelector('#names-grid');
    if (grid) grid.innerHTML = this.renderGrid();
  }

  // ---------- quiz ----------

  startQuiz() {
    if (this.quizTimer) { clearTimeout(this.quizTimer); this.quizTimer = null; }
    this.quiz = {
      questions: this.shuffle(NAMES_99).slice(0, NAMES_QUIZ_ROUNDS),
      round: 0,
      score: 0,
      answered: false,
      finished: false,
      newBest: false
    };
  }

  renderQuiz() {
    const lang = this.language;
    if (!this.quiz) this.startQuiz();
    if (this.quiz.finished) return this.renderQuizEnd();

    const q = this.quiz.questions[this.quiz.round];
    const others = this.shuffle(NAMES_99.filter(x => x.n !== q.n)).slice(0, 3);
    const choices = this.shuffle(
      [{ name: q, correct: true }].concat(others.map(x => ({ name: x, correct: false })))
    );

    return `
      <div class="max-w-2xl mx-auto space-y-6">
        <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>${t('vocab_question_of', lang)
            .replace('{current}', this.quiz.round + 1)
            .replace('{total}', this.quiz.questions.length)}</span>
          <span>${t('vocab_score', lang).replace('{score}', this.quiz.score)}</span>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 text-center">
          <div class="ayah-arabic !text-6xl !leading-normal" dir="rtl">${q.ar}</div>
          <div class="text-base text-gray-400 dark:text-gray-500 italic mt-3" dir="ltr">${q.translit}</div>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-4">${t('vocab_choose_meaning', lang)}</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          ${choices.map(c => `
            <button data-action="quiz-choice" data-correct="${c.correct ? '1' : '0'}" dir="auto"
                    class="px-4 py-4 rounded-xl text-lg font-medium border-2 border-gray-200 dark:border-gray-700
                           bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100
                           hover:border-primary dark:hover:border-blue-400 transition-colors">
              ${this.meaningOf(c.name)}
            </button>
          `).join('')}
        </div>
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
      } else if (b === btn) {
        b.classList.remove('border-gray-200', 'dark:border-gray-700', 'bg-white', 'dark:bg-gray-800');
        b.classList.add('border-red-500', 'bg-red-100', 'dark:bg-red-900/40',
          'text-red-800', 'dark:text-red-300');
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
      }
      this.render();
    }, 1100);
  }

  renderQuizEnd() {
    const lang = this.language;
    const best = this.getBestScore();
    return `
      <div class="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-10 text-center space-y-4">
        <div class="text-5xl">${this.quiz.score >= 7 ? '🏆' : '📿'}</div>
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
          ${t('play_again', lang)}
        </button>
      </div>
    `;
  }
}

// Initialize when DOM is ready
let namesOfAllah;
document.addEventListener('DOMContentLoaded', () => {
  namesOfAllah = new NamesOfAllah();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { NamesOfAllah };
}
