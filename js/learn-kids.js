/**
 * Kids Qaida Module — "Learn to Read Quran" for children.
 * Interactive Qaida: letters, harakat sounds, first words and two quiz games.
 * Renders lazily into #learn-kids-root when the Learn hub dispatches
 * 'learnModuleSelected' with {module:'kids'}. Uses browser TTS (Arabic voice).
 */

const KIDS_TATWEEL = 'ـ';
// Letters that do not connect to the following letter
const KIDS_NON_CONNECTING = ['ا', 'د', 'ذ', 'ر', 'ز', 'و'];
const KIDS_QUIZ_ROUNDS = 10;
const KIDS_QUIZ_BEST_KEY = 'kidsQuizBest';

// Playful gradient palette, rotated across cards
const KIDS_GRADIENTS = [
  'from-rose-100 to-pink-200 dark:from-rose-900/40 dark:to-pink-900/40',
  'from-amber-100 to-orange-200 dark:from-amber-900/40 dark:to-orange-900/40',
  'from-lime-100 to-green-200 dark:from-lime-900/40 dark:to-green-900/40',
  'from-sky-100 to-blue-200 dark:from-sky-900/40 dark:to-blue-900/40',
  'from-violet-100 to-purple-200 dark:from-violet-900/40 dark:to-purple-900/40',
  'from-teal-100 to-cyan-200 dark:from-teal-900/40 dark:to-cyan-900/40'
];

class KidsQaida {
  constructor() {
    this.root = document.getElementById('learn-kids-root');
    if (!this.root) return;

    this.language = (typeof appSettings !== 'undefined' && appSettings)
      ? appSettings.get('language') : 'en';
    this.rendered = false;
    this.section = 'letters';        // letters | sounds | words | quiz
    this.expandedLetter = null;      // char of the expanded letter card
    this.soundLetter = 'ب';          // letter selected in the Sounds picker
    this.quiz = null;                // active quiz state
    this.ttsNoteDismissed = false;
    this._advanceTimer = null;

    window.addEventListener('learnModuleSelected', (e) => {
      if (e.detail && e.detail.module === 'kids') {
        this.render();
      }
    });

    window.addEventListener('settingChanged', (e) => {
      if (e.detail && e.detail.key === 'language') {
        this.language = e.detail.value;
        if (this.rendered) this.render();
      }
    });

    this.root.addEventListener('click', (e) => this.onClick(e));

    // Warm up the async voice list so an Arabic voice is ready on first tap
    if (window.speechSynthesis) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.addEventListener?.('voiceschanged', () => {}, { once: true });
    }

    this.injectStyles();
  }

  injectStyles() {
    if (document.getElementById('kids-qaida-styles')) return;
    const style = document.createElement('style');
    style.id = 'kids-qaida-styles';
    style.textContent = `
      @keyframes kq-shake {
        0%, 100% { transform: translateX(0); }
        20%, 60% { transform: translateX(-8px); }
        40%, 80% { transform: translateX(8px); }
      }
      .kq-shake { animation: kq-shake 0.5s ease-in-out; }
      @keyframes kq-pop {
        0% { transform: scale(1); }
        50% { transform: scale(1.15); }
        100% { transform: scale(1); }
      }
      .kq-pop { animation: kq-pop 0.5s ease-in-out; }
      .kq-scroll::-webkit-scrollbar { height: 6px; }
      .kq-scroll::-webkit-scrollbar-thumb { background: rgba(120,120,120,.4); border-radius: 3px; }
    `;
    document.head.appendChild(style);
  }

  /* ---------------------------------------------------------------- TTS */

  /**
   * Speak Arabic text with the browser's speech synthesis.
   * Falls back gracefully (visual-only + note) when TTS is unavailable.
   */
  speakArabic(text, rate = 0.9) {
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
    utter.rate = rate;
    utter.pitch = 1.05;
    try {
      synth.cancel();
      synth.speak(utter);
    } catch (err) {
      this.showTtsNote();
    }
  }

  showTtsNote() {
    if (this.ttsNoteDismissed) return;
    const note = this.root.querySelector('#kids-tts-note');
    if (note) note.classList.remove('hidden');
  }

  /* ------------------------------------------------------------- Render */

  render() {
    this.rendered = true;
    const lang = this.language;

    this.root.innerHTML = `
      <div class="space-y-5">
        ${this.renderHeader(lang)}
        ${this.renderTtsNote(lang)}
        <div id="kids-body">
          ${this.renderSection(lang)}
        </div>
      </div>
    `;
  }

  renderHeader(lang) {
    const pills = [
      { id: 'letters', emoji: '🔤', label: t('kids_letters', lang) },
      { id: 'sounds',  emoji: '🎵', label: t('kids_sounds', lang) },
      { id: 'words',   emoji: '📚', label: t('kids_words', lang) },
      { id: 'quiz',    emoji: '🎮', label: t('kids_quiz', lang) }
    ];

    return `
      <div class="text-center">
        <h2 class="text-2xl sm:text-3xl font-extrabold text-gray-800 dark:text-gray-100">
          🌟 ${t('kids_title', lang)} 📖
        </h2>
        <p class="text-gray-500 dark:text-gray-400 mt-1">${t('kids_subtitle', lang)}</p>
      </div>
      <div class="flex flex-wrap justify-center gap-2 sm:gap-3">
        ${pills.map(p => `
          <button data-kids-section="${p.id}"
                  class="px-5 py-3 sm:px-6 rounded-2xl text-base sm:text-lg font-bold transition-all shadow
                         ${this.section === p.id
                           ? 'bg-gradient-to-br from-indigo-500 to-purple-500 text-white scale-105'
                           : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-gray-700'}">
            <span class="text-xl align-middle">${p.emoji}</span> ${p.label}
          </button>
        `).join('')}
      </div>
    `;
  }

  renderTtsNote(lang) {
    return `
      <div id="kids-tts-note" class="hidden flex items-center justify-between gap-3 max-w-xl mx-auto
                  bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800
                  text-yellow-800 dark:text-yellow-200 text-sm rounded-xl px-4 py-2">
        <span>🔇 ${t('tts_unavailable', lang)}</span>
        <button data-kids-tts-dismiss
                class="shrink-0 px-2 py-1 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-900/40 font-bold"
                title="${t('dismiss', lang)}">✕</button>
      </div>
    `;
  }

  renderSection(lang) {
    switch (this.section) {
      case 'sounds': return this.renderSounds(lang);
      case 'words':  return this.renderWords(lang);
      case 'quiz':   return this.renderQuiz(lang);
      default:       return this.renderLetters(lang);
    }
  }

  /* ------------------------------------------------------------ Letters */

  positionalForms(char, lang) {
    if (KIDS_NON_CONNECTING.includes(char)) {
      return [{ label: t('form_end', lang), text: KIDS_TATWEEL + char }];
    }
    return [
      { label: t('form_start', lang),  text: char + KIDS_TATWEEL },
      { label: t('form_middle', lang), text: KIDS_TATWEEL + char + KIDS_TATWEEL },
      { label: t('form_end', lang),    text: KIDS_TATWEEL + char }
    ];
  }

  renderLetters(lang) {
    return `
      <p class="text-center text-gray-500 dark:text-gray-400 mb-4">👆 ${t('tap_letter_hint', lang)}</p>
      <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-3 sm:gap-4">
        ${QAIDA_LETTERS.map((l, i) => this.renderLetterCard(l, i, lang)).join('')}
      </div>
    `;
  }

  renderLetterCard(letter, index, lang) {
    const grad = KIDS_GRADIENTS[index % KIDS_GRADIENTS.length];
    const expanded = this.expandedLetter === letter.char;

    const expandedHtml = expanded ? `
      <div class="mt-2 pt-2 border-t border-white/60 dark:border-gray-600 text-center">
        <div class="ayah-arabic !text-2xl !leading-normal" dir="rtl">${letter.name}</div>
        <div class="text-sm font-bold text-gray-600 dark:text-gray-300">${letter.translit}</div>
        <div class="flex flex-wrap justify-center gap-2 mt-2" dir="rtl">
          ${this.positionalForms(letter.char, lang).map(f => `
            <span class="bg-white/70 dark:bg-gray-900/40 rounded-xl px-2 py-1">
              <span class="ayah-arabic !text-2xl !leading-normal block">${f.text}</span>
              <span class="text-[10px] text-gray-500 dark:text-gray-400 block" dir="auto">${f.label}</span>
            </span>
          `).join('')}
        </div>
      </div>
    ` : '';

    return `
      <button data-kids-letter="${letter.char}"
              class="rounded-2xl bg-gradient-to-br ${grad} shadow hover:shadow-lg hover:scale-105
                     transition-all p-3 sm:p-4 min-h-[6rem] flex flex-col items-center justify-center
                     ${expanded ? 'col-span-2 sm:col-span-2 ring-4 ring-indigo-300 dark:ring-indigo-700 scale-105' : ''}">
        <span class="ayah-arabic !text-5xl sm:!text-6xl !leading-tight" dir="rtl">${letter.char}</span>
        ${expandedHtml}
      </button>
    `;
  }

  /* ------------------------------------------------------------- Sounds */

  renderSounds(lang) {
    const selected = QAIDA_LETTERS.find(l => l.char === this.soundLetter) || QAIDA_LETTERS[1];

    return `
      <p class="text-center text-gray-500 dark:text-gray-400 mb-3">🎯 ${t('pick_letter', lang)}</p>
      <div class="kq-scroll flex gap-2 overflow-x-auto pb-3 px-1" dir="rtl">
        ${QAIDA_LETTERS.map(l => `
          <button data-kids-sound-letter="${l.char}"
                  class="shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center
                         transition-all shadow
                         ${l.char === selected.char
                           ? 'bg-gradient-to-br from-indigo-500 to-purple-500 text-white scale-110'
                           : 'bg-white dark:bg-gray-800 hover:bg-indigo-50 dark:hover:bg-gray-700'}">
            <span class="ayah-arabic !text-3xl !leading-none">${l.char}</span>
          </button>
        `).join('')}
      </div>
      <p class="text-center text-gray-500 dark:text-gray-400 my-4">👆 ${t('tap_sound_hint', lang)}</p>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        ${QAIDA_HARAKAT.map((h, i) => {
          const example = h.makeExample(selected.char);
          const grad = KIDS_GRADIENTS[i % KIDS_GRADIENTS.length];
          return `
            <button data-kids-sound-idx="${i}"
                    class="rounded-2xl bg-gradient-to-br ${grad} shadow hover:shadow-lg hover:scale-105
                           transition-all p-4 sm:p-5 flex flex-col items-center gap-1">
              <span class="ayah-arabic !text-5xl sm:!text-6xl !leading-tight" dir="rtl">${example}</span>
              <span class="ayah-arabic !text-lg !leading-normal text-gray-600 dark:text-gray-300" dir="rtl">${h.name}</span>
              <span class="text-sm font-bold text-gray-600 dark:text-gray-300">
                ${h.translit}${h.soundSuffix ? ` · «${h.soundSuffix}»` : ''}
              </span>
            </button>
          `;
        }).join('')}
      </div>
    `;
  }

  /* -------------------------------------------------------------- Words */

  renderWords(lang) {
    return `
      <p class="text-center text-gray-500 dark:text-gray-400 mb-4">🐢 ${t('tap_word_hint', lang)}</p>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        ${QAIDA_WORDS.map((w, i) => `
          <button data-kids-word-idx="${i}"
                  class="rounded-2xl bg-gradient-to-br ${KIDS_GRADIENTS[i % KIDS_GRADIENTS.length]}
                         shadow hover:shadow-lg hover:scale-105 transition-all p-5 sm:p-6
                         flex flex-col items-center gap-2">
            <span class="ayah-arabic !text-5xl !leading-tight" dir="rtl">${w.arabic}</span>
            <span class="text-base font-bold text-gray-600 dark:text-gray-300">${w.translit}</span>
          </button>
        `).join('')}
      </div>
    `;
  }

  /* --------------------------------------------------------------- Quiz */

  renderQuiz(lang) {
    if (!this.quiz) return this.renderQuizMenu(lang);
    if (this.quiz.finished) return this.renderQuizEnd(lang);
    return this.renderQuizRound(lang);
  }

  renderQuizMenu(lang) {
    const best = this.getBestScore();
    return `
      <div class="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button data-kids-quiz-mode="listen"
                class="rounded-2xl bg-gradient-to-br from-sky-100 to-blue-200 dark:from-sky-900/40 dark:to-blue-900/40
                       shadow hover:shadow-lg hover:scale-105 transition-all p-8 text-center">
          <div class="text-6xl mb-3">👂</div>
          <div class="text-xl font-extrabold text-gray-800 dark:text-gray-100">${t('quiz_listen_find', lang)}</div>
          <div class="text-sm text-gray-600 dark:text-gray-300 mt-1">${t('quiz_listen_find_desc', lang)}</div>
        </button>
        <button data-kids-quiz-mode="name"
                class="rounded-2xl bg-gradient-to-br from-rose-100 to-pink-200 dark:from-rose-900/40 dark:to-pink-900/40
                       shadow hover:shadow-lg hover:scale-105 transition-all p-8 text-center">
          <div class="text-6xl mb-3">👀</div>
          <div class="text-xl font-extrabold text-gray-800 dark:text-gray-100">${t('quiz_name_letter', lang)}</div>
          <div class="text-sm text-gray-600 dark:text-gray-300 mt-1">${t('quiz_name_letter_desc', lang)}</div>
        </button>
      </div>
      ${best !== null ? `
        <p class="text-center text-gray-500 dark:text-gray-400 mt-5">
          🏆 ${t('best_score', lang)}: <span class="font-bold">${best} / ${KIDS_QUIZ_ROUNDS}</span>
        </p>` : ''}
    `;
  }

  renderQuizRound(lang) {
    const q = this.quiz;
    const isListen = q.mode === 'listen';

    return `
      <div class="max-w-2xl mx-auto space-y-5">
        <div class="flex items-center justify-between text-base font-bold text-gray-600 dark:text-gray-300">
          <span>🎯 ${t('quiz_round', lang)} ${q.round} / ${q.total}</span>
          <span>⭐ ${t('quiz_score', lang)}: ${q.score}</span>
        </div>
        <div class="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div class="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all"
               style="width:${Math.round(((q.round - 1) / q.total) * 100)}%"></div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 shadow p-6 text-center">
          ${isListen ? `
            <p class="text-lg font-bold text-gray-700 dark:text-gray-200 mb-3">${t('quiz_which_letter', lang)}</p>
            <button data-kids-quiz-replay
                    class="px-6 py-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white
                           text-lg font-bold shadow hover:scale-105 transition-all">
              🔊 ${t('hear_again', lang)}
            </button>
          ` : `
            <p class="text-lg font-bold text-gray-700 dark:text-gray-200 mb-3">${t('quiz_what_name', lang)}</p>
            <div class="ayah-arabic !text-7xl !leading-tight" dir="rtl">${q.current.correct.char}</div>
          `}
        </div>

        <div class="grid grid-cols-2 gap-3 sm:gap-4">
          ${q.current.options.map((opt, i) => `
            <button data-kids-quiz-pick="${i}"
                    class="kq-option rounded-2xl bg-gradient-to-br ${KIDS_GRADIENTS[i % KIDS_GRADIENTS.length]}
                           shadow hover:shadow-lg hover:scale-105 transition-all p-5 sm:p-6 text-center min-h-[5.5rem]">
              ${isListen ? `
                <span class="ayah-arabic !text-6xl !leading-tight" dir="rtl">${opt.char}</span>
              ` : `
                <span class="ayah-arabic !text-3xl !leading-normal block" dir="rtl">${opt.name}</span>
                <span class="text-base font-bold text-gray-600 dark:text-gray-300">${opt.translit}</span>
              `}
            </button>
          `).join('')}
        </div>
      </div>
    `;
  }

  renderQuizEnd(lang) {
    const q = this.quiz;
    const stars = q.score >= 9 ? 3 : q.score >= 6 ? 2 : 1;
    const msgKey = stars === 3 ? 'quiz_great' : stars === 2 ? 'quiz_good' : 'quiz_try';
    const best = this.getBestScore();

    return `
      <div class="max-w-xl mx-auto rounded-2xl bg-gradient-to-br from-amber-100 to-orange-200
                  dark:from-amber-900/40 dark:to-orange-900/40 shadow p-8 text-center space-y-4">
        <div class="text-2xl font-extrabold text-gray-800 dark:text-gray-100">🎉 ${t('quiz_done', lang)}</div>
        <div class="text-5xl tracking-widest">
          ${'⭐'.repeat(stars)}${'☆'.repeat(3 - stars)}
        </div>
        <div class="text-4xl font-extrabold text-gray-800 dark:text-gray-100">${q.score} / ${q.total}</div>
        <p class="text-lg font-bold text-gray-700 dark:text-gray-200">${t(msgKey, lang)}</p>
        ${best !== null ? `
          <p class="text-sm text-gray-600 dark:text-gray-300">
            🏆 ${t('best_score', lang)}: <span class="font-bold">${best} / ${q.total}</span>
          </p>` : ''}
        <div class="flex flex-wrap justify-center gap-3 pt-2">
          <button data-kids-quiz-mode="${q.mode}"
                  class="px-6 py-3 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white
                         text-lg font-bold shadow hover:scale-105 transition-all">
            🔁 ${t('play_again', lang)}
          </button>
          <button data-kids-quiz-menu
                  class="px-6 py-3 rounded-2xl bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200
                         text-lg font-bold shadow hover:scale-105 transition-all">
            🎮 ${t('back_to_games', lang)}
          </button>
        </div>
      </div>
    `;
  }

  /* ---------------------------------------------------------- Quiz logic */

  getBestScore() {
    try {
      const raw = localStorage.getItem(KIDS_QUIZ_BEST_KEY);
      return raw === null ? null : parseInt(raw, 10);
    } catch (err) {
      return null;
    }
  }

  saveBestScore(score) {
    try {
      const best = this.getBestScore();
      if (best === null || score > best) {
        localStorage.setItem(KIDS_QUIZ_BEST_KEY, String(score));
      }
    } catch (err) { /* private mode — ignore */ }
  }

  startQuiz(mode) {
    this.clearAdvanceTimer();
    this.quiz = {
      mode: mode,
      round: 0,
      total: KIDS_QUIZ_ROUNDS,
      score: 0,
      locked: false,
      finished: false,
      current: null
    };
    this.nextRound();
  }

  nextRound() {
    const q = this.quiz;
    if (!q) return;
    q.round++;
    q.locked = false;

    if (q.round > q.total) {
      q.finished = true;
      this.saveBestScore(q.score);
      this.updateBody();
      return;
    }

    // Pick a correct letter + 3 distractors
    const pool = QAIDA_LETTERS.slice();
    const correct = pool.splice(Math.floor(Math.random() * pool.length), 1)[0];
    const options = [correct];
    while (options.length < 4) {
      options.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);
    }
    // Shuffle
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    q.current = { correct: correct, options: options };

    this.updateBody();
    if (q.mode === 'listen') {
      this.speakArabic(correct.name);
    }
  }

  pickAnswer(index) {
    const q = this.quiz;
    if (!q || q.locked || q.finished || !q.current) return;
    q.locked = true;

    const chosen = q.current.options[index];
    const correct = chosen && chosen.char === q.current.correct.char;
    if (correct) q.score++;

    // Instant visual feedback on the tapped button
    const buttons = this.root.querySelectorAll('[data-kids-quiz-pick]');
    buttons.forEach((btn, i) => {
      if (i === index) {
        if (correct) {
          btn.classList.add('!bg-none', 'bg-green-400', 'dark:bg-green-600', 'text-white',
            'ring-4', 'ring-green-300', 'animate-bounce', 'kq-pop');
        } else {
          btn.classList.add('!bg-none', 'bg-red-400', 'dark:bg-red-600', 'text-white',
            'ring-4', 'ring-red-300', 'kq-shake');
        }
      } else if (!correct && q.current.options[i].char === q.current.correct.char) {
        // Gently reveal the right answer
        btn.classList.add('ring-4', 'ring-green-400');
      }
    });

    if (correct) this.speakArabic(q.current.correct.name, 1);

    this.clearAdvanceTimer();
    this._advanceTimer = setTimeout(() => this.nextRound(), 1100);
  }

  clearAdvanceTimer() {
    if (this._advanceTimer) {
      clearTimeout(this._advanceTimer);
      this._advanceTimer = null;
    }
  }

  /* -------------------------------------------------------------- Events */

  updateBody() {
    const body = this.root.querySelector('#kids-body');
    if (body) body.innerHTML = this.renderSection(this.language);
  }

  setSection(section) {
    this.clearAdvanceTimer();
    this.section = section;
    if (section !== 'quiz') this.quiz = null;
    this.render();
  }

  onClick(e) {
    const sectionBtn = e.target.closest('[data-kids-section]');
    if (sectionBtn) {
      this.setSection(sectionBtn.getAttribute('data-kids-section'));
      return;
    }

    const dismissBtn = e.target.closest('[data-kids-tts-dismiss]');
    if (dismissBtn) {
      this.ttsNoteDismissed = true;
      const note = this.root.querySelector('#kids-tts-note');
      if (note) note.classList.add('hidden');
      return;
    }

    const letterBtn = e.target.closest('[data-kids-letter]');
    if (letterBtn) {
      const char = letterBtn.getAttribute('data-kids-letter');
      const letter = QAIDA_LETTERS.find(l => l.char === char);
      if (!letter) return;
      this.expandedLetter = this.expandedLetter === char ? null : char;
      this.updateBody();
      this.speakArabic(letter.name);
      return;
    }

    const pickerBtn = e.target.closest('[data-kids-sound-letter]');
    if (pickerBtn) {
      this.soundLetter = pickerBtn.getAttribute('data-kids-sound-letter');
      this.updateBody();
      return;
    }

    const soundBtn = e.target.closest('[data-kids-sound-idx]');
    if (soundBtn) {
      const haraka = QAIDA_HARAKAT[parseInt(soundBtn.getAttribute('data-kids-sound-idx'), 10)];
      if (haraka) this.speakArabic(haraka.makeExample(this.soundLetter), 0.8);
      return;
    }

    const wordBtn = e.target.closest('[data-kids-word-idx]');
    if (wordBtn) {
      const word = QAIDA_WORDS[parseInt(wordBtn.getAttribute('data-kids-word-idx'), 10)];
      if (word) this.speakArabic(word.arabic, 0.65);
      return;
    }

    const modeBtn = e.target.closest('[data-kids-quiz-mode]');
    if (modeBtn) {
      this.startQuiz(modeBtn.getAttribute('data-kids-quiz-mode'));
      return;
    }

    const menuBtn = e.target.closest('[data-kids-quiz-menu]');
    if (menuBtn) {
      this.clearAdvanceTimer();
      this.quiz = null;
      this.updateBody();
      return;
    }

    const replayBtn = e.target.closest('[data-kids-quiz-replay]');
    if (replayBtn) {
      if (this.quiz && this.quiz.current) this.speakArabic(this.quiz.current.correct.name);
      return;
    }

    const pickBtn = e.target.closest('[data-kids-quiz-pick]');
    if (pickBtn) {
      this.pickAnswer(parseInt(pickBtn.getAttribute('data-kids-quiz-pick'), 10));
    }
  }
}

// Initialize when DOM is ready
let kidsQaida;
document.addEventListener('DOMContentLoaded', () => {
  kidsQaida = new KidsQaida();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { KidsQaida };
}
