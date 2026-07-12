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

// Per-game best-score localStorage keys (letter games share the legacy key)
const KIDS_BEST_KEYS = {
  wordmatch: 'kidsWordMatchBest',
  listenword: 'kidsListenWordBest',
  letterhunt: 'kidsLetterHuntBest'
};

// Amber highlight applied to a Quran word chip while its audio plays
const KIDS_WORD_HL = ['bg-amber-300', 'dark:bg-amber-500/70', 'ring-2', 'ring-amber-400'];

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
    this.section = 'letters';        // letters | sounds | words | numbers | surahs | duas | quiz
    this.expandedLetter = null;      // char of the expanded letter card
    this.soundLetter = 'ب';          // letter selected in the Sounds picker
    this.quiz = null;                // active quiz state
    this.ttsNoteDismissed = false;
    this._advanceTimer = null;

    // Surahs guided-reading state
    this.surahPick = null;           // surah number currently open for reading (null = picker)
    this.surahCache = {};            // `${n}:${lang}` -> { verses } | { error:true }
    this._loadingSurah = null;       // key currently being fetched
    this.surahPlaying = false;       // whole-surah playback in progress
    this._surahAudio = null;         // active per-word <audio> during playback
    this._surahChips = null;         // word-chip elements for the playing surah
    this._surahIdx = 0;
    this._wordTapAudio = null;       // single-word tap playback
    this._wordTapTimer = null;

    window.addEventListener('learnModuleSelected', (e) => {
      if (e.detail && e.detail.module === 'kids') {
        this.render();
      }
    });

    // Stop all audio + timers when the user leaves the Learn tab
    window.addEventListener('tabChanged', (e) => {
      if (e.detail && e.detail.tabId !== 'learn') this.stopAll();
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

    // Bundled Arabic audio clips (real recordings) so sound works even on
    // devices with no Arabic speech-synthesis voice. { arabicText: "NNN.mp3" }
    this._clipAudio = new Audio();
    this._clips = null;
    fetch('audio/qaida/manifest.json')
      .then(r => r.ok ? r.json() : null)
      .then(m => { this._clips = m || {}; })
      .catch(() => { this._clips = {}; });

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
   * Play Arabic audio for `text`. Prefers a bundled real-voice clip (works on
   * any device); falls back to the browser's speech synthesis; and only shows
   * the "no audio" note when neither is possible.
   */
  speakArabic(text, rate = 0.9) {
    // 1) Bundled clip (real recording) — the reliable path
    if (this._clips && this._clips[text]) {
      try {
        if (window.speechSynthesis) window.speechSynthesis.cancel();
        this._clipAudio.pause();
        this._clipAudio.src = 'audio/qaida/' + this._clips[text];
        this._clipAudio.playbackRate = Math.min(Math.max(rate + 0.15, 0.5), 1.5);
        this._clipAudio.play().catch(() => this.speakViaSynth(text, rate));
        return;
      } catch (err) { /* fall through to synth */ }
    }
    // 2) Speech synthesis fallback
    this.speakViaSynth(text, rate);
  }

  speakViaSynth(text, rate = 0.9) {
    if (!window.speechSynthesis || typeof SpeechSynthesisUtterance === 'undefined') {
      this.showTtsNote();
      return;
    }
    const synth = window.speechSynthesis;
    const voices = synth.getVoices();
    const arVoice = voices.find(v => v.lang && v.lang.toLowerCase().startsWith('ar'));
    // Clip missing AND no Arabic voice → let the learner know (once)
    if (!arVoice && (!this._clips || !this._clips[text])) this.showTtsNote();
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
    this.stopSurahPlay();
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
      { id: 'numbers', emoji: '🔢', label: t('kids_numbers', lang) },
      { id: 'surahs',  emoji: '📖', label: t('kids_surahs', lang) },
      { id: 'duas',    emoji: '🤲', label: t('kids_duas', lang) },
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
      case 'sounds':  return this.renderSounds(lang);
      case 'words':   return this.renderWords(lang);
      case 'numbers': return this.renderNumbers(lang);
      case 'surahs':  return this.renderSurahs(lang);
      case 'duas':    return this.renderDuas(lang);
      case 'quiz':    return this.renderQuiz(lang);
      default:        return this.renderLetters(lang);
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

    if (!expanded) {
      return `
        <button data-kids-letter="${letter.char}"
                class="rounded-2xl bg-gradient-to-br ${grad} shadow hover:shadow-lg hover:scale-105
                       transition-all p-3 sm:p-4 min-h-[6rem] flex flex-col items-center justify-center">
          <span class="ayah-arabic !text-5xl sm:!text-6xl !leading-tight" dir="rtl">${letter.char}</span>
        </button>
      `;
    }

    // Expanded card — a div so it can hold nested interactive controls
    return `
      <div class="col-span-2 sm:col-span-3 lg:col-span-4 rounded-2xl bg-gradient-to-br ${grad}
                  shadow-lg ring-4 ring-indigo-300 dark:ring-indigo-700 p-4 relative">
        <button data-kids-letter-close="${letter.char}" title="${t('close', lang)}"
                class="absolute top-2 ${isRTL(lang) ? 'left-2' : 'right-2'} w-8 h-8 rounded-full bg-white/70 dark:bg-gray-900/50
                       text-gray-600 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-900 flex items-center justify-center">✕</button>
        <div class="flex flex-col items-center">
          <span class="ayah-arabic !text-6xl !leading-tight" dir="rtl">${letter.char}</span>
          <div class="flex items-center gap-2 mt-1">
            <div class="ayah-arabic !text-2xl" dir="rtl">${letter.name}</div>
            <button data-kids-letter-play="${letter.char}" title="${t('play', lang)}"
                    class="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/80">▶</button>
          </div>
          <div class="text-sm font-bold text-gray-600 dark:text-gray-300">${letter.translit}</div>

          <div class="flex flex-wrap justify-center gap-2 mt-3" dir="rtl">
            ${this.positionalForms(letter.char, lang).map(f => `
              <span class="bg-white/70 dark:bg-gray-900/40 rounded-xl px-3 py-1 text-center">
                <span class="ayah-arabic !text-2xl !leading-normal block">${f.text}</span>
                <span class="text-[10px] text-gray-500 dark:text-gray-400 block" dir="auto">${f.label}</span>
              </span>`).join('')}
          </div>

          <div id="kids-letter-examples" class="w-full mt-4">
            <p class="text-center text-xs text-gray-400">${t('loading', lang)}</p>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Load 3 example Quran words for the expanded letter — one with the letter
   * at the start, one in the middle, one at the end — and inject them.
   */
  async loadLetterExamples(letterChar, lang) {
    const host = this.root.querySelector('#kids-letter-examples');
    if (!host) return;
    try {
      const data = await QuranData.getQuranWords();
      const strip = w => QuranData.normalizeWord(w);
      const found = { start: null, middle: null, end: null };
      outer:
      for (const vk in data) {
        for (const w of data[vk]) {
          const s = strip(w);
          if (s.length < 3 || s.length > 6) continue;
          if (!found.start && s[0] === letterChar) found.start = { word: w, key: vk, pos: 0 };
          else if (!found.end && s[s.length - 1] === letterChar) found.end = { word: w, key: vk, pos: s.length - 1 };
          else if (!found.middle && s.slice(1, -1).includes(letterChar)) found.middle = { word: w, key: vk, pos: s.indexOf(letterChar, 1) };
          if (found.start && found.middle && found.end) break outer;
        }
      }
      if (this.expandedLetter !== letterChar) return; // collapsed meanwhile

      const cell = (ex, labelKey) => {
        if (!ex) return '';
        return `
          <button data-kids-example-verse="${ex.key}" class="flex-1 min-w-[6rem] rounded-xl bg-white/70 dark:bg-gray-900/40 hover:bg-white dark:hover:bg-gray-900 p-2 text-center">
            <span class="block text-[10px] uppercase text-gray-400">${t(labelKey, lang)}</span>
            <span class="ayah-arabic !text-2xl block" dir="rtl">${this.hlLetter(ex.word, letterChar)}</span>
            <span class="block text-[10px] text-gray-400" dir="ltr">${ex.key}</span>
          </button>`;
      };
      host.innerHTML = `
        <p class="text-center text-xs text-gray-500 dark:text-gray-400 mb-2">${t('letter_examples', lang)}</p>
        <div class="flex gap-2" dir="rtl">
          ${cell(found.start, 'form_start')}
          ${cell(found.middle, 'form_middle')}
          ${cell(found.end, 'form_end')}
        </div>`;
    } catch (err) {
      host.innerHTML = '';
    }
  }

  /** Highlight the target letter inside a diacritized word (first matching base letter). */
  hlLetter(word, letterChar) {
    const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
    // Walk graphemes: a base letter plus following combining marks
    let out = '', done = false;
    for (let i = 0; i < word.length; i++) {
      const ch = word[i];
      const isMark = /[ً-ٰٟۖ-ۭـ]/.test(ch);
      if (!done && !isMark && ch === letterChar) {
        // include trailing marks
        let j = i + 1;
        while (j < word.length && /[ً-ٰٟۖ-ۭـ]/.test(word[j])) j++;
        out += '<span class="bg-amber-300 dark:bg-amber-500/70 rounded">' + esc(word.slice(i, j)) + '</span>';
        i = j - 1; done = true;
      } else {
        out += esc(ch);
      }
    }
    return out;
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
            <div class="rounded-2xl bg-gradient-to-br ${grad} shadow hover:shadow-lg transition-all p-4 sm:p-5 flex flex-col items-center gap-1">
              <button data-kids-sound-idx="${i}" class="flex flex-col items-center gap-1 hover:scale-105 transition-transform">
                <span class="ayah-arabic !text-5xl sm:!text-6xl !leading-tight" dir="rtl">${example}</span>
                <span class="ayah-arabic !text-lg !leading-normal text-gray-600 dark:text-gray-300" dir="rtl">${h.name}</span>
                <span class="text-sm font-bold text-gray-600 dark:text-gray-300">
                  ${h.translit}${h.soundSuffix ? ` · «${h.soundSuffix}»` : ''}
                </span>
              </button>
              <button data-kids-find-idx="${i}"
                      class="mt-2 px-2.5 py-1 text-xs rounded-full bg-white/70 dark:bg-gray-900/40 text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-900/70">
                📖 ${t('find_in_quran', lang)}
              </button>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  /* ------------------------------------------------ Words-in-Quran finder */

  ensureFinderModal() {
    if (this.finder) return;
    this.finder = document.createElement('div');
    this.finder.id = 'kids-finder-modal';
    this.finder.className = 'fixed inset-0 bg-black/50 z-50 items-center justify-center p-4 hidden';
    this.finder.innerHTML = `
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-2xl max-h-[85vh] flex flex-col">
        <div class="flex items-center gap-2 px-5 py-3 border-b border-gray-200 dark:border-gray-700">
          <h3 id="kids-finder-title" class="flex-1 font-bold text-gray-800 dark:text-gray-100"></h3>
          <button id="kids-finder-close" class="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700">✕</button>
        </div>
        <div id="kids-finder-body" class="flex-1 overflow-y-auto p-4"></div>
      </div>`;
    document.body.appendChild(this.finder);
    if (window.escClose) window.escClose(this.finder, () => { this.finder.classList.add('hidden'); this.finder.classList.remove('flex'); });
    this.finder.addEventListener('click', (e) => {
      if (e.target === this.finder || e.target.closest('#kids-finder-close')) {
        this.finder.classList.add('hidden'); this.finder.classList.remove('flex');
      }
      const wordBtn = e.target.closest('[data-finder-verse]');
      if (wordBtn) {
        // Show the ayah in a modal layered over the finder — stay in place
        this.openAyahModal(wordBtn.getAttribute('data-finder-verse'), wordBtn.getAttribute('data-finder-word'));
      }
    });
  }

  /* ---------- Ayah preview modal (no tab switch) ---------- */

  ensureAyahModal() {
    if (this.ayahModal) return;
    this.ayahModal = document.createElement('div');
    this.ayahModal.id = 'kids-ayah-modal';
    // z-[60] sits above the finder (z-50) so it layers on top
    this.ayahModal.className = 'fixed inset-0 bg-black/60 z-[60] items-center justify-center p-4 hidden';
    this.ayahModal.innerHTML = `
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-xl max-h-[85vh] flex flex-col">
        <div class="flex items-center gap-2 px-5 py-3 border-b border-gray-200 dark:border-gray-700">
          <h3 id="kids-ayah-title" class="flex-1 font-bold text-gray-800 dark:text-gray-100"></h3>
          <button id="kids-ayah-close" class="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700">✕</button>
        </div>
        <div id="kids-ayah-body" class="flex-1 overflow-y-auto p-5"></div>
      </div>`;
    document.body.appendChild(this.ayahModal);
    if (window.escClose) window.escClose(this.ayahModal, () => { if (this._ayahAudio) this._ayahAudio.pause(); this.ayahModal.classList.add('hidden'); this.ayahModal.classList.remove('flex'); });
    this.ayahModal.addEventListener('click', (e) => {
      if (e.target === this.ayahModal || e.target.closest('#kids-ayah-close')) {
        if (this._ayahAudio) this._ayahAudio.pause();
        this.ayahModal.classList.add('hidden'); this.ayahModal.classList.remove('flex');
      }
      const wordPlay = e.target.closest('[data-word-audio]');
      if (wordPlay) {
        if (!this._ayahAudio) this._ayahAudio = new Audio();
        this._ayahAudio.src = wordPlay.getAttribute('data-word-audio');
        this._ayahAudio.play().catch(() => {});
        return;
      }
      const play = e.target.closest('[data-ayah-audio]');
      if (play) {
        if (!this._ayahAudio) this._ayahAudio = new Audio();
        this._ayahAudio.src = play.getAttribute('data-ayah-audio');
        this._ayahAudio.play().catch(() => {});
      }
    });
  }

  async openAyahModal(verseKey, targetWord) {
    const lang = this.language;
    this.ensureAyahModal();
    this.ayahModal.classList.remove('hidden'); this.ayahModal.classList.add('flex');
    this.ayahModal.querySelector('#kids-ayah-title').textContent = verseKey;
    const body = this.ayahModal.querySelector('#kids-ayah-body');
    body.innerHTML = `<p class="text-center text-gray-400 py-8">${t('loading', lang)}</p>`;
    try {
      const [s, a] = verseKey.split(':').map(Number);
      const verses = await QuranData.fetchRange(s, a, a, lang);
      const v = verses[0];
      if (!v) throw new Error('not found');
      this.ayahModal.querySelector('#kids-ayah-title').textContent = `${v.surahName} ${v.key}`;

      const norm = (x) => (typeof QuranData !== 'undefined' && QuranData.normalizeWord)
        ? QuranData.normalizeWord(x || '') : String(x || '');
      const target = targetWord ? norm(targetWord) : null;

      // Each word is its own play button; the tapped word is highlighted.
      const wbw = (v.words || []).map(w => {
        const isTarget = target && norm(w.arabic) === target;
        const canPlay = !!w.audio;
        return `
          <button ${canPlay ? `data-word-audio="${this.esc(w.audio)}"` : ''} data-word-idx
                  class="inline-flex flex-col items-center text-center px-2 py-1 my-1 rounded-lg transition-colors
                         ${canPlay ? 'hover:bg-blue-50 dark:hover:bg-gray-700 cursor-pointer' : 'cursor-default'}
                         ${isTarget ? 'ring-2 ring-amber-400 bg-amber-50 dark:bg-amber-500/10' : ''}">
            <span class="ayah-arabic !text-2xl block">${w.arabic}${canPlay ? ' <span class="text-[10px] text-primary align-middle">🔊</span>' : ''}</span>
            <span class="text-[11px] text-gray-500 dark:text-gray-400 block" dir="auto">${w.meaning || ''}</span>
          </button>`;
      }).join('');

      const pad = (n) => String(n).padStart(3, '0');
      const fullAyahUrl = `https://everyayah.com/data/Alafasy_128kbps/${pad(s)}${pad(a)}.mp3`;

      body.innerHTML = `
        <div class="ayah-arabic !text-3xl !leading-loose text-center mb-3" dir="rtl">${v.arabic}</div>
        <p class="text-xs text-center text-gray-400 mb-2">${t('tap_word_to_hear', lang)}</p>
        <div class="flex flex-wrap justify-center gap-x-1 mb-3" dir="rtl">${wbw}</div>
        <p class="text-center text-gray-600 dark:text-gray-300 mb-4" dir="auto">${v.translation || ''}</p>
        <div class="flex flex-wrap justify-center gap-2">
          <button data-ayah-audio="${fullAyahUrl}"
                  class="px-4 py-2 rounded-lg bg-primary text-white text-sm hover:bg-primary/80">🔊 ${t('play_full_ayah', lang)}</button>
        </div>
      `;

      // Auto-play the tapped word so the user immediately hears what they clicked.
      if (target) {
        const btn = body.querySelector('[data-word-audio].ring-2') || body.querySelector('.ring-2 [data-word-audio], .ring-2');
        const url = btn && btn.getAttribute && btn.getAttribute('data-word-audio');
        if (url) { if (!this._ayahAudio) this._ayahAudio = new Audio(); this._ayahAudio.src = url; this._ayahAudio.play().catch(() => {}); }
      }
    } catch (err) {
      body.innerHTML = `<p class="text-center text-gray-500 dark:text-gray-400 py-8">${t('error', lang)}</p>`;
    }
  }

  async openWordFinder(idx) {
    const h = QAIDA_HARAKAT[idx];
    if (!h) return;
    const lang = this.language;
    const seq = h.makeExample(this.soundLetter);
    this.ensureFinderModal();
    this.finder.classList.remove('hidden'); this.finder.classList.add('flex');
    this.finder.querySelector('#kids-finder-title').innerHTML =
      `📖 <span class="ayah-arabic !text-2xl mx-1" dir="rtl">${seq}</span> — ${t('words_with_sound', lang)}`;
    const body = this.finder.querySelector('#kids-finder-body');
    body.innerHTML = `<p class="text-center text-gray-400 py-8">${t('loading', lang)}</p>`;

    try {
      const res = await QuranData.findWordsContaining(seq);
      if (!res.forms.length) {
        body.innerHTML = `<p class="text-center text-gray-500 dark:text-gray-400 py-8">${t('no_words_found', lang)}</p>`;
        return;
      }
      const shown = res.forms.slice(0, 120);
      body.innerHTML = `
        <p class="text-center text-sm text-gray-500 dark:text-gray-400 mb-3">
          ${t('words_found_count', lang).replace('{count}', res.forms.length).replace('{verses}', res.verses)}
          <br><span class="text-xs">${t('tap_to_read_verse', lang)}</span>
        </p>
        <div class="flex flex-wrap gap-2 justify-center" dir="rtl">
          ${shown.map(f => `
            <button data-finder-verse="${f.first}" data-finder-word="${this.esc(f.word)}"
                    class="group px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-700/60 hover:bg-blue-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600">
              <span class="ayah-arabic !text-2xl">${this.highlightSeq(f.word, seq)}</span>
              <span class="block text-[10px] text-gray-400" dir="ltr">×${f.count}</span>
            </button>`).join('')}
        </div>
        ${res.forms.length > shown.length ? `<p class="text-center text-xs text-gray-400 mt-3">+${res.forms.length - shown.length}</p>` : ''}
      `;
    } catch (err) {
      body.innerHTML = `<p class="text-center text-gray-500 dark:text-gray-400 py-8">${t('error', lang)}</p>`;
    }
  }

  esc(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

  /** Wrap the first occurrence of the letter+haraka sequence in an amber highlight */
  highlightSeq(word, seq) {
    const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
    const i = word.indexOf(seq);
    if (i < 0) return esc(word);
    return esc(word.slice(0, i)) +
      '<span class="bg-amber-200 dark:bg-amber-600/60 rounded">' + esc(word.slice(i, i + seq.length)) + '</span>' +
      esc(word.slice(i + seq.length));
  }

  /* -------------------------------------------------------------- Words */

  renderWords(lang) {
    return `
      <p class="text-center text-gray-500 dark:text-gray-400 mb-1">🐢 ${t('tap_word_hint', lang)}</p>
      <p class="text-center text-xs text-gray-400 mb-4">${t('kids_words_freq_note', lang)}</p>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        ${this.freqWords().map((w, i) => `
          <button data-kids-word-idx="${i}"
                  class="relative rounded-2xl bg-gradient-to-br ${KIDS_GRADIENTS[i % KIDS_GRADIENTS.length]}
                         shadow hover:shadow-lg hover:scale-105 transition-all p-4 sm:p-5
                         flex flex-col items-center gap-1 text-center">
            <span class="absolute top-1.5 left-2 text-[10px] font-bold text-gray-500/70 dark:text-gray-300/60">#${i + 1}</span>
            <span class="ayah-arabic !text-4xl sm:!text-5xl !leading-tight" dir="rtl">${w.arabic}</span>
            <span class="text-sm font-bold text-gray-700 dark:text-gray-200">${w.translit}</span>
            <span class="text-xs text-gray-600 dark:text-gray-300" dir="auto">${this.wordMeaning(w)}</span>
            <span class="text-[10px] text-gray-500/80 dark:text-gray-400/80">≈ ${w.count.toLocaleString()}× ${t('kids_in_quran', lang)}</span>
          </button>
        `).join('')}
      </div>
    `;
  }

  /** Vocabulary ordered by Quranic frequency (most common first). */
  freqWords() {
    if (!this._freqWords) {
      const src = (typeof VOCAB_WORDS !== 'undefined') ? VOCAB_WORDS : [];
      this._freqWords = src.slice().sort((a, b) => (b.count || 0) - (a.count || 0));
    }
    return this._freqWords;
  }

  wordMeaning(w) {
    const m = w.meanings || {};
    return m[this.language] || m.en || '';
  }

  /* ------------------------------------------------------------ Numbers */

  renderNumbers(lang) {
    return `
      <p class="text-center text-gray-500 dark:text-gray-400 mb-4">🔢 ${t('tap_number_hint', lang)}</p>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
        ${KIDS_NUMBERS.map((num, i) => `
          <button data-kids-number-idx="${i}"
                  class="rounded-2xl bg-gradient-to-br ${KIDS_GRADIENTS[i % KIDS_GRADIENTS.length]}
                         shadow hover:shadow-lg hover:scale-105 transition-all p-4 sm:p-5
                         flex flex-col items-center gap-1">
            <span class="ayah-arabic !text-6xl !leading-none" dir="rtl">${num.digit}</span>
            <span class="ayah-arabic !text-2xl !leading-normal text-gray-700 dark:text-gray-200" dir="rtl">${num.word}</span>
            <span class="text-sm font-bold text-gray-600 dark:text-gray-300">${num.value} · ${num.translit}</span>
          </button>
        `).join('')}
      </div>
    `;
  }

  /* -------------------------------------------------------------- Surahs */

  surahKey(n) { return `${n}:${this.language}`; }

  renderSurahs(lang) {
    if (this.surahPick == null) {
      return `
        <p class="text-center text-gray-500 dark:text-gray-400 mb-4">📖 ${t('pick_surah_hint', lang)}</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          ${KIDS_SURAHS.map((s, i) => {
            const info = getSurahByNumber(s.n);
            return `
              <button data-kids-surah-pick="${s.n}"
                      class="rounded-2xl bg-gradient-to-br ${KIDS_GRADIENTS[i % KIDS_GRADIENTS.length]}
                             shadow hover:shadow-lg hover:scale-105 transition-all p-4 sm:p-5
                             flex items-center gap-3 text-left">
                <span class="shrink-0 w-11 h-11 rounded-full bg-white/70 dark:bg-gray-900/40 flex items-center justify-center
                             text-lg font-extrabold text-gray-700 dark:text-gray-100">${s.n}</span>
                <span class="flex-1 min-w-0">
                  <span class="block font-bold text-gray-800 dark:text-gray-100 truncate">${getSurahName(s.n, lang)}</span>
                  <span class="block text-xs text-gray-500 dark:text-gray-400">${s.versesTo} ${t('kids_verses', lang)}</span>
                </span>
                <span class="ayah-arabic !text-2xl shrink-0" dir="rtl">${info ? info.arabicName : ''}</span>
              </button>
            `;
          }).join('')}
        </div>
      `;
    }
    return this.renderSurahReading(lang);
  }

  renderSurahReading(lang) {
    const n = this.surahPick;
    const info = getSurahByNumber(n);
    const dir = (typeof isRTL === 'function' && isRTL(lang)) ? 'rtl' : 'ltr';
    const header = `
      <div class="flex items-center gap-3 mb-4" dir="${dir}">
        <button data-kids-surah-back
                class="shrink-0 px-3 py-2 rounded-xl bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200
                       font-bold shadow hover:scale-105 transition-all">← ${t('surah_back', lang)}</button>
        <div class="flex-1 min-w-0">
          <div class="font-extrabold text-gray-800 dark:text-gray-100 truncate">${getSurahName(n, lang)}</div>
        </div>
        <span class="ayah-arabic !text-2xl shrink-0" dir="rtl">${info ? info.arabicName : ''}</span>
      </div>`;

    const key = this.surahKey(n);
    const cached = this.surahCache[key];

    if (!cached) {
      this.loadSurah(n);
      return `${header}
        <div class="text-center text-gray-400 py-10">
          <div class="text-4xl mb-2">⏳</div>${t('loading', lang)}
        </div>`;
    }
    if (cached.error) {
      return `${header}
        <div class="text-center py-10 space-y-3">
          <p class="text-gray-500 dark:text-gray-400">😕 ${t('error', lang)}</p>
          <button data-kids-surah-retry
                  class="px-5 py-2 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white font-bold shadow">
            🔁 ${t('retry', lang)}
          </button>
        </div>`;
    }

    const versesHtml = cached.verses.map((v, vi) => `
      <div class="rounded-2xl bg-white dark:bg-gray-800 shadow p-3 sm:p-4">
        <div class="flex items-center gap-2 mb-2">
          <span class="shrink-0 w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300
                       text-xs font-bold flex items-center justify-center">${v.ayah}</span>
          ${v.translation ? `<span class="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">${v.translation}</span>` : ''}
        </div>
        <div class="flex flex-wrap gap-2 justify-center" dir="rtl">
          ${v.words.map((w, wi) => `
            <button data-kids-word-audio="${w.audio || ''}" data-word-id="${vi}-${wi}"
                    class="kq-wordchip rounded-xl bg-gray-50 dark:bg-gray-700/60 hover:bg-amber-50 dark:hover:bg-gray-700
                           border border-gray-200 dark:border-gray-600 px-2.5 py-1.5 transition-colors
                           flex flex-col items-center">
              <span class="ayah-arabic !text-3xl !leading-tight" dir="rtl">${w.arabic}</span>
              ${w.translit ? `<span class="text-[11px] text-gray-500 dark:text-gray-400" dir="ltr">${w.translit}</span>` : ''}
              ${w.meaning ? `<span class="text-[10px] text-gray-400 dark:text-gray-500" dir="auto">${w.meaning}</span>` : ''}
            </button>
          `).join('')}
        </div>
      </div>
    `).join('');

    return `${header}
      <div class="flex justify-center mb-4">
        <button id="kids-surah-playbtn" data-kids-surah-playbtn
                class="px-6 py-3 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white
                       text-base font-bold shadow hover:scale-105 transition-all">
          ${this.surahPlaying ? `⏹ ${t('stop', lang)}` : `▶️ ${t('play_whole_surah', lang)}`}
        </button>
      </div>
      <p class="text-center text-xs text-gray-500 dark:text-gray-400 mb-3">👆 ${t('tap_word_to_hear', lang)}</p>
      <div class="space-y-3">${versesHtml}</div>
    `;
  }

  async loadSurah(n) {
    const key = this.surahKey(n);
    if (this.surahCache[key] && !this.surahCache[key].error) return;
    if (this._loadingSurah === key) return;
    this._loadingSurah = key;
    const info = KIDS_SURAHS.find(s => s.n === n);
    try {
      const verses = await QuranData.fetchRange(n, 1, info ? info.versesTo : 1, this.language);
      this.surahCache[key] = { verses };
    } catch (err) {
      this.surahCache[key] = { error: true };
    } finally {
      this._loadingSurah = null;
      if (this.section === 'surahs' && this.surahPick === n) this.updateBody();
    }
  }

  /* ------------------------------------------------- Surah word playback */

  clearWordHighlights() {
    this.root.querySelectorAll('.kq-wordchip').forEach(c => c.classList.remove(...KIDS_WORD_HL));
  }

  highlightChip(chip) {
    this.clearWordHighlights();
    chip.classList.add(...KIDS_WORD_HL);
  }

  playWordChip(chip) {
    this.stopSurahPlay();
    if (this._wordTapTimer) { clearTimeout(this._wordTapTimer); this._wordTapTimer = null; }
    if (this._wordTapAudio) { try { this._wordTapAudio.pause(); } catch (e) {} this._wordTapAudio = null; }
    this.highlightChip(chip);
    const url = chip.getAttribute('data-kids-word-audio');
    if (url) {
      const a = new Audio(url);
      this._wordTapAudio = a;
      a.onended = () => chip.classList.remove(...KIDS_WORD_HL);
      a.play().catch(() => {});
    }
    // Fallback un-highlight in case audio is missing or never ends
    this._wordTapTimer = setTimeout(() => chip.classList.remove(...KIDS_WORD_HL), 2000);
  }

  toggleSurahPlay() {
    if (this.surahPlaying) { this.stopSurahPlay(); return; }
    const chips = Array.from(this.root.querySelectorAll('.kq-wordchip'));
    if (!chips.length) return;
    this.surahPlaying = true;
    this._surahChips = chips;
    this._surahIdx = 0;
    this.updatePlayButton();
    this.playChipSeq();
  }

  playChipSeq() {
    if (!this.surahPlaying) return;
    if (!this._surahChips || this._surahIdx >= this._surahChips.length) {
      this.stopSurahPlay();
      return;
    }
    const chip = this._surahChips[this._surahIdx];
    this.highlightChip(chip);
    if (chip.scrollIntoView) chip.scrollIntoView({ block: 'center', behavior: 'smooth' });
    const url = chip.getAttribute('data-kids-word-audio');
    const advance = () => { this._surahIdx++; this.playChipSeq(); };
    if (!url) { setTimeout(advance, 350); return; }
    const a = new Audio(url);
    this._surahAudio = a;
    a.onended = advance;
    a.onerror = advance;
    a.play().catch(advance);
  }

  stopSurahPlay() {
    this.surahPlaying = false;
    if (this._surahAudio) {
      try { this._surahAudio.pause(); } catch (e) {}
      this._surahAudio.onended = null;
      this._surahAudio.onerror = null;
      this._surahAudio = null;
    }
    this._surahChips = null;
    this._surahIdx = 0;
    this.clearWordHighlights();
    this.updatePlayButton();
  }

  updatePlayButton() {
    const btn = this.root.querySelector('#kids-surah-playbtn');
    if (!btn) return;
    const lang = this.language;
    btn.innerHTML = this.surahPlaying
      ? `⏹ ${t('stop', lang)}`
      : `▶️ ${t('play_whole_surah', lang)}`;
  }

  /* ---------------------------------------------------------------- Duas */

  renderDuas(lang) {
    return `
      <p class="text-center text-gray-500 dark:text-gray-400 mb-4">🤲 ${t('tap_dua_hint', lang)}</p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${KIDS_DUAS.map((d, i) => `
          <button data-kids-dua-idx="${i}"
                  class="rounded-2xl bg-gradient-to-br ${KIDS_GRADIENTS[i % KIDS_GRADIENTS.length]}
                         shadow hover:shadow-lg hover:scale-105 transition-all p-5 sm:p-6 text-center flex flex-col gap-3">
            <span class="ayah-arabic !text-3xl sm:!text-4xl !leading-relaxed" dir="rtl">${d.arabic}</span>
            <span class="text-base font-bold text-gray-600 dark:text-gray-300">${d.translit}</span>
            <span class="text-sm text-gray-600 dark:text-gray-300">
              <span class="font-semibold">${t('meaning_label', lang)}</span> ${d.meaning_en}
            </span>
            <span class="text-xs text-gray-500 dark:text-gray-400">
              <span class="font-semibold">${t('when_label', lang)}</span> ${d.when_en}
            </span>
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
    const games = [
      { mode: 'listen',     emoji: '👂', grad: 'from-sky-100 to-blue-200 dark:from-sky-900/40 dark:to-blue-900/40',       title: t('quiz_listen_find', lang),  desc: t('quiz_listen_find_desc', lang) },
      { mode: 'name',       emoji: '👀', grad: 'from-rose-100 to-pink-200 dark:from-rose-900/40 dark:to-pink-900/40',      title: t('quiz_name_letter', lang),  desc: t('quiz_name_letter_desc', lang) },
      { mode: 'wordmatch',  emoji: '🔤', grad: 'from-lime-100 to-green-200 dark:from-lime-900/40 dark:to-green-900/40',    title: t('quiz_word_match', lang),   desc: t('quiz_word_match_desc', lang) },
      { mode: 'listenword', emoji: '🎧', grad: 'from-violet-100 to-purple-200 dark:from-violet-900/40 dark:to-purple-900/40', title: t('quiz_listen_word', lang), desc: t('quiz_listen_word_desc', lang) },
      { mode: 'letterhunt', emoji: '🔍', grad: 'from-amber-100 to-orange-200 dark:from-amber-900/40 dark:to-orange-900/40', title: t('quiz_letter_hunt', lang),  desc: t('quiz_letter_hunt_desc', lang) }
    ];
    return `
      <div class="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
        ${games.map(g => {
          const best = this.getBestScore(g.mode);
          return `
            <button data-kids-quiz-mode="${g.mode}"
                    class="rounded-2xl bg-gradient-to-br ${g.grad}
                           shadow hover:shadow-lg hover:scale-105 transition-all p-6 sm:p-8 text-center">
              <div class="text-5xl sm:text-6xl mb-3">${g.emoji}</div>
              <div class="text-lg sm:text-xl font-extrabold text-gray-800 dark:text-gray-100">${g.title}</div>
              <div class="text-sm text-gray-600 dark:text-gray-300 mt-1">${g.desc}</div>
              ${best !== null ? `
                <div class="text-xs font-bold text-gray-500 dark:text-gray-400 mt-2">
                  🏆 ${t('best_score', lang)}: ${best} / ${KIDS_QUIZ_ROUNDS}
                </div>` : ''}
            </button>
          `;
        }).join('')}
      </div>
    `;
  }

  renderQuizRound(lang) {
    const q = this.quiz;
    const cur = q.current;

    // Prompt block (varies per game)
    let prompt = '';
    switch (q.mode) {
      case 'listen':
        prompt = `
          <p class="text-lg font-bold text-gray-700 dark:text-gray-200 mb-3">${t('quiz_which_letter', lang)}</p>
          <button data-kids-quiz-replay
                  class="px-6 py-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white
                         text-lg font-bold shadow hover:scale-105 transition-all">🔊 ${t('hear_again', lang)}</button>`;
        break;
      case 'name':
        prompt = `
          <p class="text-lg font-bold text-gray-700 dark:text-gray-200 mb-3">${t('quiz_what_name', lang)}</p>
          <div class="ayah-arabic !text-7xl !leading-tight" dir="rtl">${cur.promptChar}</div>`;
        break;
      case 'wordmatch':
        prompt = `
          <p class="text-lg font-bold text-gray-700 dark:text-gray-200 mb-3">${t('quiz_which_translit', lang)}</p>
          <div class="ayah-arabic !text-6xl !leading-tight" dir="rtl">${cur.promptArabic}</div>`;
        break;
      case 'listenword':
        prompt = `
          <p class="text-lg font-bold text-gray-700 dark:text-gray-200 mb-3">${t('quiz_which_word', lang)}</p>
          <button data-kids-quiz-replay
                  class="px-6 py-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white
                         text-lg font-bold shadow hover:scale-105 transition-all">🔊 ${t('hear_again', lang)}</button>`;
        break;
      case 'letterhunt':
        prompt = `
          <p class="text-lg font-bold text-gray-700 dark:text-gray-200 mb-3">${t('quiz_which_has_letter', lang)}</p>
          <div class="ayah-arabic !text-7xl !leading-tight" dir="rtl">${cur.promptChar}</div>`;
        break;
    }

    // How each option is displayed
    const renderOpt = (opt) => {
      switch (cur.optionType) {
        case 'char':
          return `<span class="ayah-arabic !text-6xl !leading-tight" dir="rtl">${opt.char}</span>`;
        case 'name':
          return `<span class="ayah-arabic !text-3xl !leading-normal block" dir="rtl">${opt.name}</span>
                  <span class="text-base font-bold text-gray-600 dark:text-gray-300">${opt.translit}</span>`;
        case 'translit':
          return `<span class="text-2xl sm:text-3xl font-extrabold text-gray-700 dark:text-gray-100">${opt.translit}</span>`;
        case 'word':
        default:
          return `<span class="ayah-arabic !text-4xl sm:!text-5xl !leading-tight" dir="rtl">${opt.arabic}</span>`;
      }
    };

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
          ${prompt}
        </div>

        <div class="grid grid-cols-2 gap-3 sm:gap-4">
          ${cur.options.map((opt, i) => `
            <button data-kids-quiz-pick="${i}"
                    class="kq-option rounded-2xl bg-gradient-to-br ${KIDS_GRADIENTS[i % KIDS_GRADIENTS.length]}
                           shadow hover:shadow-lg hover:scale-105 transition-all p-5 sm:p-6 text-center min-h-[5.5rem]
                           flex flex-col items-center justify-center gap-1">
              ${renderOpt(opt)}
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
    const best = this.getBestScore(q.mode);

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

  bestKeyFor(mode) {
    return KIDS_BEST_KEYS[mode] || KIDS_QUIZ_BEST_KEY;
  }

  getBestScore(mode) {
    try {
      const raw = localStorage.getItem(this.bestKeyFor(mode));
      return raw === null ? null : parseInt(raw, 10);
    } catch (err) {
      return null;
    }
  }

  saveBestScore(score, mode) {
    try {
      const best = this.getBestScore(mode);
      if (best === null || score > best) {
        localStorage.setItem(this.bestKeyFor(mode), String(score));
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

  shuffleInPlace(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  /** Strip harakat/tatweel and unify alef forms — for whole-word letter matching. */
  stripMarks(s) {
    return s
      .replace(/[ً-ٰٕـ]/g, '')
      .replace(/[أإآٱ]/g, 'ا');
  }

  buildRound(mode) {
    if (mode === 'listen' || mode === 'name') {
      const pool = this.shuffleInPlace(QAIDA_LETTERS.slice());
      const options = pool.slice(0, 4);
      const correctIndex = Math.floor(Math.random() * 4);
      const correct = options[correctIndex];
      return {
        mode, options, correctIndex,
        optionType: mode === 'listen' ? 'char' : 'name',
        promptChar: correct.char,
        autoSpeak: mode === 'listen' ? correct.name : null,
        rewardAudio: correct.name
      };
    }

    if (mode === 'wordmatch' || mode === 'listenword') {
      // Pick 4 words with distinct transliterations
      const pool = this.shuffleInPlace(QAIDA_WORDS.slice());
      const options = [];
      const seen = new Set();
      for (const w of pool) {
        if (seen.has(w.translit)) continue;
        seen.add(w.translit);
        options.push(w);
        if (options.length === 4) break;
      }
      const correctIndex = Math.floor(Math.random() * options.length);
      const correct = options[correctIndex];
      return {
        mode, options, correctIndex,
        optionType: mode === 'wordmatch' ? 'translit' : 'word',
        promptArabic: correct.arabic,
        autoSpeak: mode === 'listenword' ? correct.arabic : null,
        rewardAudio: correct.arabic
      };
    }

    // letterhunt: pick one word containing a target letter, 3 without it
    if (mode === 'letterhunt') {
      const words = QAIDA_WORDS.map(w => ({ w, norm: this.stripMarks(w.arabic) }));
      const letters = this.shuffleInPlace(QAIDA_LETTERS.slice());
      for (const letter of letters) {
        const ch = this.stripMarks(letter.char);
        const withL = words.filter(x => x.norm.includes(ch));
        const without = words.filter(x => !x.norm.includes(ch));
        if (withL.length >= 1 && without.length >= 3) {
          const correctWord = withL[Math.floor(Math.random() * withL.length)].w;
          const distractors = this.shuffleInPlace(without.slice()).slice(0, 3).map(x => x.w);
          const options = this.shuffleInPlace([correctWord, ...distractors]);
          return {
            mode, options,
            correctIndex: options.indexOf(correctWord),
            optionType: 'word',
            promptChar: letter.char,
            autoSpeak: null,
            rewardAudio: correctWord.arabic
          };
        }
      }
      // Fallback (should not happen): behave like wordmatch
      return this.buildRound('wordmatch');
    }
  }

  nextRound() {
    const q = this.quiz;
    if (!q) return;
    q.round++;
    q.locked = false;

    if (q.round > q.total) {
      q.finished = true;
      this.saveBestScore(q.score, q.mode);
      this.updateBody();
      return;
    }

    q.current = this.buildRound(q.mode);

    this.updateBody();
    if (q.current && q.current.autoSpeak) {
      this.speakArabic(q.current.autoSpeak, q.mode === 'listenword' ? 0.7 : 0.9);
    }
  }

  pickAnswer(index) {
    const q = this.quiz;
    if (!q || q.locked || q.finished || !q.current) return;
    q.locked = true;

    const correctIndex = q.current.correctIndex;
    const correct = index === correctIndex;
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
      } else if (!correct && i === correctIndex) {
        // Gently reveal the right answer
        btn.classList.add('ring-4', 'ring-green-400');
      }
    });

    if (correct && q.current.rewardAudio) {
      this.speakArabic(q.current.rewardAudio, q.mode === 'name' || q.mode === 'listen' ? 1 : 0.7);
    }

    this.clearAdvanceTimer();
    this._advanceTimer = setTimeout(() => this.nextRound(), 1100);
  }

  clearAdvanceTimer() {
    if (this._advanceTimer) {
      clearTimeout(this._advanceTimer);
      this._advanceTimer = null;
    }
  }

  /** Stop every audio source + timer this module owns (called on tab leave). */
  stopAll() {
    this.clearAdvanceTimer();
    this.stopSurahPlay();
    if (this._wordTapTimer) { clearTimeout(this._wordTapTimer); this._wordTapTimer = null; }
    [this._clipAudio, this._wordTapAudio, this._ayahAudio].forEach(a => { try { if (a) a.pause(); } catch (e) {} });
    try { if (window.speechSynthesis) window.speechSynthesis.cancel(); } catch (e) {}
  }

  /* -------------------------------------------------------------- Events */

  updateBody() {
    const body = this.root.querySelector('#kids-body');
    if (body) body.innerHTML = this.renderSection(this.language);
  }

  setSection(section) {
    this.clearAdvanceTimer();
    this.stopSurahPlay();
    this.section = section;
    if (section !== 'quiz') this.quiz = null;
    if (section !== 'surahs') this.surahPick = null;
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

    // Close the expanded letter card
    const closeBtn = e.target.closest('[data-kids-letter-close]');
    if (closeBtn) {
      this.expandedLetter = null;
      this.updateBody();
      return;
    }

    // Play the expanded letter's name
    const playBtn = e.target.closest('[data-kids-letter-play]');
    if (playBtn) {
      const letter = QAIDA_LETTERS.find(l => l.char === playBtn.getAttribute('data-kids-letter-play'));
      if (letter) this.speakArabic(letter.name);
      return;
    }

    // An example word → show its verse in a modal (stay in the kids view)
    const exBtn = e.target.closest('[data-kids-example-verse]');
    if (exBtn) {
      this.openAyahModal(exBtn.getAttribute('data-kids-example-verse'));
      return;
    }

    const letterBtn = e.target.closest('[data-kids-letter]');
    if (letterBtn) {
      const char = letterBtn.getAttribute('data-kids-letter');
      const letter = QAIDA_LETTERS.find(l => l.char === char);
      if (!letter) return;
      this.expandedLetter = this.expandedLetter === char ? null : char;
      this.updateBody();
      if (this.expandedLetter) {
        this.speakArabic(letter.name);
        this.loadLetterExamples(char, this.language); // async fill example words
      }
      return;
    }

    const pickerBtn = e.target.closest('[data-kids-sound-letter]');
    if (pickerBtn) {
      this.soundLetter = pickerBtn.getAttribute('data-kids-sound-letter');
      this.updateBody();
      return;
    }

    const findBtn = e.target.closest('[data-kids-find-idx]');
    if (findBtn) {
      this.openWordFinder(parseInt(findBtn.getAttribute('data-kids-find-idx'), 10));
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
      const word = this.freqWords()[parseInt(wordBtn.getAttribute('data-kids-word-idx'), 10)];
      if (word) this.speakArabic(word.arabic, 0.65);
      return;
    }

    const numberBtn = e.target.closest('[data-kids-number-idx]');
    if (numberBtn) {
      const num = KIDS_NUMBERS[parseInt(numberBtn.getAttribute('data-kids-number-idx'), 10)];
      if (num) this.speakArabic(num.word, 0.8);
      return;
    }

    const duaBtn = e.target.closest('[data-kids-dua-idx]');
    if (duaBtn) {
      const dua = KIDS_DUAS[parseInt(duaBtn.getAttribute('data-kids-dua-idx'), 10)];
      if (dua) this.speakArabic(dua.arabic, 0.8);
      return;
    }

    // ---- Surahs guided reading ----
    const surahPickBtn = e.target.closest('[data-kids-surah-pick]');
    if (surahPickBtn) {
      this.stopSurahPlay();
      this.surahPick = parseInt(surahPickBtn.getAttribute('data-kids-surah-pick'), 10);
      this.updateBody();
      return;
    }

    const surahBackBtn = e.target.closest('[data-kids-surah-back]');
    if (surahBackBtn) {
      this.stopSurahPlay();
      this.surahPick = null;
      this.updateBody();
      return;
    }

    const surahRetryBtn = e.target.closest('[data-kids-surah-retry]');
    if (surahRetryBtn) {
      if (this.surahPick != null) delete this.surahCache[this.surahKey(this.surahPick)];
      this.updateBody();
      return;
    }

    const surahPlayBtn = e.target.closest('[data-kids-surah-playbtn]');
    if (surahPlayBtn) {
      this.toggleSurahPlay();
      return;
    }

    const wordChip = e.target.closest('.kq-wordchip');
    if (wordChip) {
      this.playWordChip(wordChip);
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
      if (this.quiz && this.quiz.current && this.quiz.current.autoSpeak) {
        this.speakArabic(this.quiz.current.autoSpeak, this.quiz.mode === 'listenword' ? 0.7 : 0.9);
      }
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
