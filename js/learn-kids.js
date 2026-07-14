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
  letterhunt: 'kidsLetterHuntBest',
  harakat: 'kidsHarakatBest',
  numbermatch: 'kidsNumberMatchBest',
  surahmatch: 'kidsSurahMatchBest',
  emojiword: 'kidsEmojiWordBest',
  oddone: 'kidsOddOneBest'
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

// Localized meaning/when for KIDS_DUAS (js/qaida-data.js), same order as that
// array. Rendered as m[lang] || m.en, mirroring VOCAB_WORDS.meanings.
const KIDS_DUA_L10N = [
  { // Bismillah
    meaning: { en: 'In the name of Allah.', bn: 'আল্লাহর নামে।' },
    when:    { en: 'Before eating', bn: 'খাওয়ার আগে' }
  },
  { // Alhamdulillah
    meaning: { en: 'All praise is for Allah.', bn: 'সমস্ত প্রশংসা আল্লাহর জন্য।' },
    when:    { en: 'After eating', bn: 'খাওয়ার পরে' }
  },
  { // Bismika-llahumma amutu wa ahya
    meaning: { en: 'In Your name, O Allah, I die and I live.', bn: 'হে আল্লাহ, আপনার নামেই আমি মরি ও বাঁচি।' },
    when:    { en: 'Before sleeping', bn: 'ঘুমানোর আগে' }
  },
  { // Alhamdu lillahil-ladhi ahyana
    meaning: { en: 'All praise is for Allah who gave us life.', bn: 'সমস্ত প্রশংসা আল্লাহর জন্য, যিনি আমাদের জীবিত করেছেন।' },
    when:    { en: 'When waking up', bn: 'ঘুম থেকে উঠে' }
  },
  { // Rabbi zidni 'ilma
    meaning: { en: 'My Lord, increase me in knowledge.', bn: 'হে আমার রব, আমার জ্ঞান বাড়িয়ে দিন।' },
    when:    { en: 'Before studying', bn: 'পড়াশোনার আগে' }
  },
  { // Bismillahi tawakkaltu 'ala-llah
    meaning: { en: 'In the name of Allah, I place my trust in Allah.', bn: 'আল্লাহর নামে, আমি আল্লাহর উপর ভরসা করলাম।' },
    when:    { en: 'When leaving home', bn: 'ঘর থেকে বের হওয়ার সময়' }
  },
  { // Allahumma inni a'udhu bika minal-khubuthi wal-khaba'ith
    meaning: { en: 'O Allah, I seek Your protection from all evil and impure things.', bn: 'হে আল্লাহ, আমি সব অপবিত্র ও ক্ষতিকর জিনিস থেকে আপনার আশ্রয় চাই।' },
    when:    { en: 'Before entering the toilet', bn: 'টয়লেটে ঢোকার আগে' }
  },
  { // Ghufranak
    meaning: { en: 'I ask for Your forgiveness.', bn: 'আপনার কাছে ক্ষমা চাই।' },
    when:    { en: 'After leaving the toilet', bn: 'টয়লেট থেকে বের হয়ে' }
  },
  { // Alhamdulillah (sneezing)
    meaning: { en: 'All praise is for Allah.', bn: 'সমস্ত প্রশংসা আল্লাহর জন্য।' },
    when:    { en: 'After sneezing', bn: 'হাঁচি দেওয়ার পরে' }
  },
  { // Subhanal-ladhi sakhkhara lana hadha
    meaning: { en: 'Glory to Him who has placed this at our service; we could never have done it by ourselves.', bn: 'পবিত্র-মহান তিনি, যিনি এটিকে আমাদের বশ করে দিয়েছেন; আমরা নিজেরা এটি বশ করতে পারতাম না।' },
    when:    { en: 'When riding a car or bus', bn: 'গাড়ি বা বাসে চড়ার সময়' }
  },
  { // Rabbi-rhamhuma
    meaning: { en: 'My Lord, have mercy on my parents as they raised me when I was little.', bn: 'হে আমার রব, তাঁদের (বাবা-মায়ের) প্রতি রহম করুন, যেমন তাঁরা ছোটবেলায় আমাকে লালন-পালন করেছেন।' },
    when:    { en: 'Praying for parents', bn: 'বাবা-মায়ের জন্য দোয়া' }
  },
  { // Rabbana atina fid-dunya hasanah
    meaning: { en: 'Our Lord, give us good in this world and good in the Hereafter, and protect us from the punishment of the Fire.', bn: 'হে আমাদের রব, আমাদের দুনিয়াতে কল্যাণ দিন, আখিরাতেও কল্যাণ দিন, আর জাহান্নামের আজাব থেকে আমাদের রক্ষা করুন।' },
    when:    { en: 'Any time — a complete dua', bn: 'যেকোনো সময় — একটি পূর্ণাঙ্গ দোয়া' }
  }
];

// Localized name/meaning for KIDS_KALIMAS (js/qaida-data.js), same order as
// that array. Rendered as x[lang] || x.en, mirroring KIDS_DUA_L10N.
const KIDS_KALIMA_L10N = [
  {
    name:    { en: '1st Kalima — Tayyibah (Purity)', bn: '১ম কালিমা — তাইয়্যিবাহ' },
    meaning: { en: 'There is no god but Allah; Muhammad is the Messenger of Allah.',
               bn: 'আল্লাহ ছাড়া কোনো উপাস্য নেই, মুহাম্মাদ ﷺ আল্লাহর রাসূল।' }
  },
  {
    name:    { en: '2nd Kalima — Shahadat (Testimony)', bn: '২য় কালিমা — শাহাদাত' },
    meaning: { en: 'I bear witness that there is no god but Allah, and I bear witness that Muhammad is His servant and His Messenger.',
               bn: 'আমি সাক্ষ্য দিচ্ছি, আল্লাহ ছাড়া কোনো উপাস্য নেই, আর আমি সাক্ষ্য দিচ্ছি, মুহাম্মাদ ﷺ তাঁর বান্দা ও রাসূল।' }
  },
  {
    name:    { en: '3rd Kalima — Tamjeed (Glorification)', bn: '৩য় কালিমা — তামজীদ' },
    meaning: { en: 'Glory be to Allah, all praise is for Allah, there is no god but Allah, and Allah is the Greatest. There is no power and no strength except with Allah, the Most High, the Most Great.',
               bn: 'আল্লাহ পবিত্র-মহান, সমস্ত প্রশংসা আল্লাহর, আল্লাহ ছাড়া কোনো উপাস্য নেই, আল্লাহ সবচেয়ে বড়। সর্বোচ্চ ও মহান আল্লাহর সাহায্য ছাড়া কোনো ক্ষমতা ও শক্তি নেই।' }
  },
  {
    name:    { en: '4th Kalima — Tawheed (Oneness)', bn: '৪র্থ কালিমা — তাওহীদ' },
    meaning: { en: 'There is no god but Allah, alone, without partner. His is the kingdom and His is all praise, and He has power over everything.',
               bn: 'আল্লাহ ছাড়া কোনো উপাস্য নেই, তিনি একক, তাঁর কোনো শরিক নেই। রাজত্ব তাঁরই, সমস্ত প্রশংসা তাঁরই, আর তিনি সব কিছুর উপর ক্ষমতাবান।' }
  },
  {
    name:    { en: '5th Kalima — Astaghfar (Seeking Forgiveness)', bn: '৫ম কালিমা — ইস্তিগফার' },
    meaning: { en: 'I seek forgiveness from Allah, my Lord, for every sin I committed knowingly or by mistake, secretly or openly, and I turn to Him from the sin I know and the sin I do not know. Surely You are the Knower of the hidden, the Concealer of faults and the Forgiver of sins, and there is no power and no strength except with Allah, the Most High, the Most Great.',
               bn: 'আমি আমার রব আল্লাহর কাছে ক্ষমা চাই — ইচ্ছায় বা ভুলে, গোপনে বা প্রকাশ্যে করা প্রতিটি গুনাহ থেকে; যে গুনাহ আমি জানি আর যে গুনাহ জানি না, সব থেকে তাঁর কাছে তাওবা করছি। নিশ্চয়ই আপনি অদৃশ্যের জ্ঞানী, দোষ গোপনকারী ও গুনাহ ক্ষমাকারী। সর্বোচ্চ ও মহান আল্লাহর সাহায্য ছাড়া কোনো ক্ষমতা ও শক্তি নেই।' }
  },
  {
    name:    { en: '6th Kalima — Radd-e-Kufr (Rejecting Disbelief)', bn: '৬ষ্ঠ কালিমা — রাদ্দে কুফর' },
    meaning: { en: 'O Allah, I seek refuge in You from knowingly associating anything with You, and I ask Your forgiveness for what I do not know. I repent from it and free myself from disbelief, from associating partners with Allah, from lying, backbiting, innovation, tale-carrying, shameful deeds, false accusation and all sins. I submit, and I say: there is no god but Allah; Muhammad is the Messenger of Allah.',
               bn: 'হে আল্লাহ! জেনে-শুনে আপনার সাথে কোনো কিছু শরিক করা থেকে আপনার কাছে আশ্রয় চাই, আর যা জানি না তার জন্য ক্ষমা চাই। আমি তাওবা করলাম এবং কুফর, শিরক, মিথ্যা, গীবত, বিদআত, চোগলখুরি, অশ্লীলতা, অপবাদ ও সকল গুনাহ থেকে মুক্ত হলাম। আমি ইসলাম গ্রহণ করলাম এবং বলছি — আল্লাহ ছাড়া কোনো উপাস্য নেই, মুহাম্মাদ ﷺ আল্লাহর রাসূল।' }
  }
];

class KidsQaida {
  constructor() {
    this.root = document.getElementById('learn-kids-root');
    if (!this.root) return;

    this.language = (typeof appSettings !== 'undefined' && appSettings)
      ? appSettings.get('language') : 'en';
    this.rendered = false;
    this.section = 'letters';        // letters | sounds | words | themes | numbers | surahs | duas | kalimas | quiz | stars
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
      } else {
        // Another Learn module opened (or Back to the hub, module:null) —
        // stop any surah playback / TTS / clips still running.
        this.stopAll();
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
    // Kept so speakArabic can await the manifest on first taps instead of
    // falling back to robotic TTS while the fetch is still in flight.
    this._clipsReady = fetch('audio/qaida/manifest.json')
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
  async speakArabic(text, rate = 0.9) {
    // Wait for the clip manifest so the very first taps also use the bundled
    // recordings instead of falling back to speech synthesis.
    if (this._clips === null && this._clipsReady) await this._clipsReady;
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
      { id: 'themes',  emoji: '🐾', label: t('kids_themes', lang) },
      { id: 'numbers', emoji: '🔢', label: t('kids_numbers', lang) },
      { id: 'surahs',  emoji: '📖', label: t('kids_surahs', lang) },
      { id: 'duas',    emoji: '🤲', label: t('kids_duas', lang) },
      { id: 'kalimas', emoji: '🕋', label: t('kids_kalimas', lang) },
      { id: 'quiz',    emoji: '🎮', label: t('kids_quiz', lang) },
      { id: 'stars',   emoji: '⭐', label: t('kids_stars', lang) }
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
      case 'themes':  return this.renderThemes(lang);
      case 'numbers': return this.renderNumbers(lang);
      case 'surahs':  return this.renderSurahs(lang);
      case 'duas':    return this.renderDuas(lang);
      case 'kalimas': return this.renderKalimas(lang);
      case 'quiz':    return this.renderQuiz(lang);
      case 'stars':   return this.renderStars(lang);
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
        <div class="flex flex-wrap gap-2" dir="rtl">
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
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-3xl max-h-[88vh] flex flex-col">
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
        const audio = this.ensureAyahAudio();
        audio.pause(); // resets the full-ayah ⏸ icon if it was playing
        audio.src = wordPlay.getAttribute('data-word-audio');
        audio.play().catch(() => {});
        return;
      }
      const play = e.target.closest('[data-ayah-audio]');
      if (play) this.toggleAyahAudio(play);
    });
  }

  /** Shared modal <audio>; the 'pause' listener (also fired on 'ended') resets the icon. */
  ensureAyahAudio() {
    if (!this._ayahAudio) {
      this._ayahAudio = new Audio();
      this._ayahAudio.addEventListener('pause', () => this.resetAyahPlayIcon());
    }
    return this._ayahAudio;
  }

  /** Play/pause toggle for the modal's full-ayah button: the icon flips 🔊 ↔ ⏸. */
  toggleAyahAudio(btn) {
    const audio = this.ensureAyahAudio();
    if (this._playingAyahBtn === btn && !audio.paused) { audio.pause(); return; }
    this.resetAyahPlayIcon();
    audio.src = btn.getAttribute('data-ayah-audio');
    audio.play().then(() => {
      this._playingAyahBtn = btn;
      btn.innerHTML = btn.innerHTML.replace('🔊', '⏸');
    }).catch(() => {});
  }

  resetAyahPlayIcon() {
    if (this._playingAyahBtn) {
      this._playingAyahBtn.innerHTML = this._playingAyahBtn.innerHTML.replace('⏸', '🔊');
      this._playingAyahBtn = null;
    }
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
        if (url) { const audio = this.ensureAyahAudio(); audio.src = url; audio.play().catch(() => {}); }
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

  /* ------------------------------------------- Themed words ("Word Fun") */

  /** Flat list of all theme words with their theme attached (for the quiz). */
  themeWordPool() {
    if (!this._themePool) {
      this._themePool = [];
      const src = (typeof KIDS_THEME_WORDS !== 'undefined') ? KIDS_THEME_WORDS : [];
      for (const theme of src) {
        for (const w of theme.words) this._themePool.push({ ...w, themeId: theme.id, theme });
      }
    }
    return this._themePool;
  }

  themeMeaning(w) {
    const m = w.meaning || {};
    return m[this.language] || m.en || '';
  }

  renderThemes(lang) {
    const src = (typeof KIDS_THEME_WORDS !== 'undefined') ? KIDS_THEME_WORDS : [];
    return `
      <p class="text-center text-gray-500 dark:text-gray-400 mb-4">🐾 ${t('kids_theme_hint', lang)}</p>
      ${src.map(theme => `
        <h3 class="text-sm uppercase tracking-wide font-semibold text-gray-400 dark:text-gray-500 mb-2 mt-5">
          ${theme.emoji} ${theme.label[lang] || theme.label.en}
        </h3>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          ${theme.words.map((w, i) => `
            <div class="rounded-2xl bg-gradient-to-br ${KIDS_GRADIENTS[i % KIDS_GRADIENTS.length]}
                        shadow hover:shadow-lg transition-all p-3 sm:p-4 flex flex-col items-center gap-1 text-center">
              <button data-kids-theme-word="${this.esc(w.arabic)}"
                      class="flex flex-col items-center gap-0.5 hover:scale-105 transition-transform max-w-full"
                      title="${t('play', lang)}">
                <span class="text-4xl sm:text-5xl leading-none">${w.emoji}</span>
                <span class="ayah-arabic !text-4xl sm:!text-5xl !leading-tight" dir="rtl">${w.arabic}</span>
                <span class="text-sm font-bold text-gray-700 dark:text-gray-200">${w.translit}</span>
                <span class="text-xs text-gray-600 dark:text-gray-300" dir="auto">${this.themeMeaning(w)}</span>
              </button>
              <button data-kids-theme-verse="${w.ref}" data-kids-theme-hl="${this.esc(w.hl || w.arabic)}"
                      class="mt-1 px-2.5 py-1 text-xs rounded-full bg-white/70 dark:bg-gray-900/40
                             text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-900/70">
                📖 ${w.ref}
              </button>
            </div>
          `).join('')}
        </div>
      `).join('')}
    `;
  }

  /* ------------------------------------------------------------ Numbers */

  /** Every number the Quran actually uses, with its real Quranic phrase + verse. */
  numbersExt() {
    if (this._numExt) return this._numExt;
    // hl: the word in the verse phrase that IS the number — passed to the
    // ayah modal so the correct word gets highlighted and auto-played.
    this._numExt = [
      { sec: 'basic', value: 1, digit: '١', word: 'وَاحِد', translit: 'wahid', phrase: 'إِلَٰهٌ وَاحِدٌ', hl: 'وَاحِدٌ', ref: '2:163' },
      { sec: 'basic', value: 2, digit: '٢', word: 'اِثْنَان', translit: 'ithnan', phrase: 'إِلَٰهَيْنِ اثْنَيْنِ', hl: 'اثْنَيْنِ', ref: '16:51' },
      { sec: 'basic', value: 3, digit: '٣', word: 'ثَلَاثَة', translit: 'thalathah', phrase: 'ثَلَاثَةِ أَيَّامٍ', hl: 'ثَلَاثَةِ', ref: '2:196' },
      { sec: 'basic', value: 4, digit: '٤', word: 'أَرْبَعَة', translit: "arba'ah", phrase: 'أَرْبَعَةٌ حُرُمٌ', hl: 'أَرْبَعَةٌ', ref: '9:36' },
      { sec: 'basic', value: 5, digit: '٥', word: 'خَمْسَة', translit: 'khamsah', phrase: 'خَمْسَةٍ إِلَّا هُوَ سَادِسُهُمْ', hl: 'خَمْسَةٍ', ref: '58:7' },
      { sec: 'basic', value: 6, digit: '٦', word: 'سِتَّة', translit: 'sittah', phrase: 'سِتَّةِ أَيَّامٍ', hl: 'سِتَّةِ', ref: '7:54' },
      { sec: 'basic', value: 7, digit: '٧', word: 'سَبْعَة', translit: "sab'ah", phrase: 'سَبْعَ سَمَاوَاتٍ', hl: 'سَبْعَ', ref: '2:29' },
      { sec: 'basic', value: 8, digit: '٨', word: 'ثَمَانِيَة', translit: 'thamaniyah', phrase: 'ثَمَانِيَةٌ', hl: 'ثَمَانِيَةٌ', ref: '69:17' },
      { sec: 'basic', value: 9, digit: '٩', word: 'تِسْعَة', translit: "tis'ah", phrase: 'تِسْعَةُ رَهْطٍ', hl: 'تِسْعَةُ', ref: '27:48' },
      { sec: 'basic', value: 10, digit: '١٠', word: 'عَشَرَة', translit: "'asharah", phrase: 'عَشَرَةٌ كَامِلَةٌ', hl: 'عَشَرَةٌ', ref: '2:196' },
      { sec: 'teens', value: 11, digit: '١١', word: 'أَحَدَ عَشَرَ', translit: "ahada 'ashar", phrase: 'أَحَدَ عَشَرَ كَوْكَبًا', hl: 'أَحَدَ', ref: '12:4' },
      { sec: 'teens', value: 12, digit: '١٢', word: 'اِثْنَا عَشَرَ', translit: "ithna 'ashar", phrase: 'اثْنَا عَشَرَ شَهْرًا', hl: 'اثْنَا', ref: '9:36' },
      { sec: 'teens', value: 19, digit: '١٩', word: 'تِسْعَةَ عَشَرَ', translit: "tis'ata 'ashar", phrase: 'عَلَيْهَا تِسْعَةَ عَشَرَ', hl: 'تِسْعَةَ', ref: '74:30' },
      { sec: 'tens', value: 20, digit: '٢٠', word: 'عِشْرُون', translit: "'ishrun", phrase: 'عِشْرُونَ صَابِرُونَ', hl: 'عِشْرُونَ', ref: '8:65' },
      { sec: 'tens', value: 30, digit: '٣٠', word: 'ثَلَاثُون', translit: 'thalathun', phrase: 'ثَلَاثُونَ شَهْرًا', hl: 'ثَلَاثُونَ', ref: '46:15' },
      { sec: 'tens', value: 40, digit: '٤٠', word: 'أَرْبَعُون', translit: "arba'un", phrase: 'أَرْبَعِينَ لَيْلَةً', hl: 'أَرْبَعِينَ', ref: '2:51' },
      { sec: 'tens', value: 50, digit: '٥٠', word: 'خَمْسُون', translit: 'khamsun', phrase: 'خَمْسِينَ عَامًا', hl: 'خَمْسِينَ', ref: '29:14' },
      { sec: 'tens', value: 60, digit: '٦٠', word: 'سِتُّون', translit: 'sittun', phrase: 'سِتِّينَ مِسْكِينًا', hl: 'سِتِّينَ', ref: '58:4' },
      { sec: 'tens', value: 70, digit: '٧٠', word: 'سَبْعُون', translit: "sab'un", phrase: 'سَبْعِينَ مَرَّةً', hl: 'سَبْعِينَ', ref: '9:80' },
      { sec: 'tens', value: 80, digit: '٨٠', word: 'ثَمَانُون', translit: 'thamanun', phrase: 'ثَمَانِينَ جَلْدَةً', hl: 'ثَمَانِينَ', ref: '24:4' },
      { sec: 'tens', value: 99, digit: '٩٩', word: 'تِسْعٌ وَتِسْعُون', translit: "tis' wa-tis'un", phrase: 'تِسْعٌ وَتِسْعُونَ نَعْجَةً', hl: 'تِسْعٌ', ref: '38:23' },
      { sec: 'big', value: 100, digit: '١٠٠', word: 'مِائَة', translit: "mi'ah", phrase: 'مِائَةُ حَبَّةٍ', hl: 'مِائَةُ', ref: '2:261' },
      { sec: 'big', value: 200, digit: '٢٠٠', word: 'مِائَتَيْن', translit: "mi'atayn", phrase: 'مِائَتَيْنِ', hl: 'مِائَتَيْنِ', ref: '8:65' },
      { sec: 'big', value: 300, digit: '٣٠٠', word: 'ثَلَاثُ مِائَة', translit: "thalathu mi'ah", phrase: 'ثَلَاثَ مِائَةٍ سِنِينَ', hl: 'ثَلَاثَ', ref: '18:25' },
      { sec: 'big', value: 1000, digit: '١٠٠٠', word: 'أَلْف', translit: 'alf', phrase: 'أَلْفِ شَهْرٍ', hl: 'أَلْفِ', ref: '97:3' },
      { sec: 'big', value: 2000, digit: '٢٠٠٠', word: 'أَلْفَيْن', translit: 'alfayn', phrase: 'أَلْفَيْنِ', hl: 'أَلْفَيْنِ', ref: '8:66' },
      { sec: 'big', value: 5000, digit: '٥٠٠٠', word: 'خَمْسَةُ آلَاف', translit: 'khamsatu alaf', phrase: 'بِخَمْسَةِ آلَافٍ', hl: 'بِخَمْسَةِ', ref: '3:125' },
      { sec: 'big', value: 50000, digit: '٥٠٠٠٠', word: 'خَمْسِينَ أَلْف', translit: 'khamsina alf', phrase: 'خَمْسِينَ أَلْفَ سَنَةٍ', hl: 'خَمْسِينَ', ref: '70:4' },
      { sec: 'big', value: 100000, digit: '١٠٠٠٠٠', word: 'مِائَةُ أَلْف', translit: "mi'atu alf", phrase: 'مِائَةِ أَلْفٍ أَوْ يَزِيدُونَ', hl: 'مِائَةِ', ref: '37:147' },
    ];
    return this._numExt;
  }

  numberCard(num, i) {
    return `
      <div class="rounded-2xl bg-gradient-to-br ${KIDS_GRADIENTS[i % KIDS_GRADIENTS.length]}
                  shadow hover:shadow-lg transition-all p-3 sm:p-4 flex flex-col items-center gap-1">
        <button data-kids-num-word="${this.esc(num.word)}" class="flex flex-col items-center gap-0.5 hover:scale-105 transition-transform max-w-full" title="${t('play', this.language)}">
          <span class="ayah-arabic !text-3xl sm:!text-5xl !leading-none max-w-full" dir="rtl">${num.digit}</span>
          <span class="ayah-arabic !text-2xl !leading-normal text-gray-700 dark:text-gray-200" dir="rtl">${num.word}</span>
          <span class="text-sm font-bold text-gray-600 dark:text-gray-300">${num.value.toLocaleString()} · ${num.translit}</span>
        </button>
        <button data-kids-num-verse="${num.ref}" data-kids-num-hl="${this.esc(num.hl || num.word.split(' ')[0])}"
                class="mt-1 w-full rounded-lg bg-white/60 dark:bg-gray-900/40 hover:bg-white dark:hover:bg-gray-900 px-2 py-1.5 text-center">
          <span class="ayah-arabic !text-lg !leading-normal block" dir="rtl">${num.phrase}</span>
          <span class="text-xs text-gray-500 dark:text-gray-400 font-mono">📖 ${num.ref}</span>
        </button>
      </div>`;
  }

  renderNumbers(lang) {
    const ext = this.numbersExt();
    const secs = [['basic', 'kids_num_basic'], ['teens', 'kids_num_teens'], ['tens', 'kids_num_tens'], ['big', 'kids_num_big']];
    return `
      <p class="text-center text-gray-500 dark:text-gray-400 mb-1">🔢 ${t('tap_number_hint', lang)}</p>
      <p class="text-center text-xs text-gray-400 mb-4">${t('kids_num_note', lang)}</p>
      ${secs.map(([sec, key]) => `
        <h3 class="text-sm uppercase tracking-wide font-semibold text-gray-400 dark:text-gray-500 mb-2 mt-5">${t(key, lang)}</h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          ${ext.filter(n => n.sec === sec).map((n, i) => this.numberCard(n, i)).join('')}
        </div>`).join('')}
    `;
  }

  /* -------------------------------------------------------------- Surahs */

  surahKey(n) { return `${n}:${this.language}`; }

  /** Easy starter surahs first, then the rest of Juz 'Amma (78-114) by length. */
  kidsSurahList() {
    if (this._kidsSurahs) return this._kidsSurahs;
    const easy = KIDS_SURAHS.map(s => ({ ...s, sec: 'easy' }));
    const have = new Set(easy.map(s => s.n));
    const more = [];
    for (let n = 78; n <= 114; n++) {
      if (have.has(n)) continue;
      const info = getSurahByNumber(n);
      if (info) more.push({ n, versesTo: info.ayahCount, sec: 'more' });
    }
    more.sort((a, b) => a.versesTo - b.versesTo);
    this._kidsSurahs = easy.concat(more);
    return this._kidsSurahs;
  }

  renderSurahs(lang) {
    if (this.surahPick == null) {
      const list = this.kidsSurahList();
      const section = (sec, key) => `
        <h3 class="text-sm uppercase tracking-wide font-semibold text-gray-400 dark:text-gray-500 mb-2 mt-5">${t(key, lang)}</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          ${list.filter(x => x.sec === sec).map((s, i) => this.surahPickCard(s, i, lang)).join('')}
        </div>`;
      return `
        <p class="text-center text-gray-500 dark:text-gray-400 mb-1">📖 ${t('pick_surah_hint', lang)}</p>
        ${section('easy', 'kids_surah_easy')}
        ${section('more', 'kids_surah_more')}
      `;
    }
    return this.renderSurahReading(lang);
  }

  surahPickCard(s, i, lang) {
    return [s].map((s, _i) => {
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
          }).join('');
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
    const info = this.kidsSurahList().find(s => s.n === n);
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
        ${KIDS_DUAS.map((d, i) => {
          const l10n = KIDS_DUA_L10N[i] || {};
          const m = l10n.meaning || { en: d.meaning_en };
          const w = l10n.when || { en: d.when_en };
          return `
          <button data-kids-dua-idx="${i}"
                  class="rounded-2xl bg-gradient-to-br ${KIDS_GRADIENTS[i % KIDS_GRADIENTS.length]}
                         shadow hover:shadow-lg hover:scale-105 transition-all p-5 sm:p-6 text-center flex flex-col gap-3">
            <span class="ayah-arabic !text-3xl sm:!text-4xl !leading-[2.4]" dir="rtl">${d.arabic}</span>
            <span class="text-base font-bold text-gray-600 dark:text-gray-300">${d.translit}</span>
            <span class="text-sm text-gray-600 dark:text-gray-300" dir="auto">
              <span class="font-semibold">${t('meaning_label', lang)}</span> ${m[lang] || m.en}
            </span>
            <span class="text-xs text-gray-500 dark:text-gray-400" dir="auto">
              <span class="font-semibold">${t('when_label', lang)}</span> ${w[lang] || w.en}
            </span>
            ${d.src ? `<span class="text-[10px] text-gray-500/80 dark:text-gray-400/80">📜 ${d.src}</span>` : ''}
          </button>
        `;}).join('')}
      </div>
    `;
  }

  /* ------------------------------------------------------------- Kalimas */

  renderKalimas(lang) {
    return `
      <p class="text-center text-gray-500 dark:text-gray-400 mb-4">🕋 ${t('tap_kalima_hint', lang)}</p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${KIDS_KALIMAS.map((k, i) => {
          const l10n = KIDS_KALIMA_L10N[i] || {};
          const name = l10n.name || { en: k.name_en };
          const m = l10n.meaning || { en: k.meaning_en };
          return `
          <button data-kids-kalima-idx="${i}"
                  class="rounded-2xl bg-gradient-to-br ${KIDS_GRADIENTS[i % KIDS_GRADIENTS.length]}
                         shadow hover:shadow-lg hover:scale-105 transition-all p-5 sm:p-6 text-center flex flex-col gap-3">
            <span class="text-sm font-extrabold text-indigo-700 dark:text-indigo-300" dir="auto">${name[lang] || name.en}</span>
            <span class="ayah-arabic !text-2xl sm:!text-3xl !leading-[2.4]" dir="rtl">${k.arabic}</span>
            <span class="text-sm font-bold text-gray-600 dark:text-gray-300" dir="ltr">${k.translit}</span>
            <span class="text-sm text-gray-600 dark:text-gray-300" dir="auto">
              <span class="font-semibold">${t('meaning_label', lang)}</span> ${m[lang] || m.en}
            </span>
            ${k.src ? `<span class="text-[10px] text-gray-500/80 dark:text-gray-400/80">📜 ${k.src}</span>` : ''}
          </button>
        `;}).join('')}
      </div>
    `;
  }

  /* --------------------------------------------------------------- Quiz */

  renderQuiz(lang) {
    if (!this.quiz) return this.renderQuizMenu(lang);
    if (this.quiz.finished) return this.renderQuizEnd(lang);
    return this.renderQuizRound(lang);
  }

  /** All quiz games — shared by the quiz menu and the "My Stars" screen. */
  gamesMeta(lang) {
    return [
      { mode: 'listen',     emoji: '👂', grad: 'from-sky-100 to-blue-200 dark:from-sky-900/40 dark:to-blue-900/40',       title: t('quiz_listen_find', lang),  desc: t('quiz_listen_find_desc', lang) },
      { mode: 'name',       emoji: '👀', grad: 'from-rose-100 to-pink-200 dark:from-rose-900/40 dark:to-pink-900/40',      title: t('quiz_name_letter', lang),  desc: t('quiz_name_letter_desc', lang) },
      { mode: 'wordmatch',  emoji: '🔤', grad: 'from-lime-100 to-green-200 dark:from-lime-900/40 dark:to-green-900/40',    title: t('quiz_word_match', lang),   desc: t('quiz_word_match_desc', lang) },
      { mode: 'listenword', emoji: '🎧', grad: 'from-violet-100 to-purple-200 dark:from-violet-900/40 dark:to-purple-900/40', title: t('quiz_listen_word', lang), desc: t('quiz_listen_word_desc', lang) },
      { mode: 'letterhunt', emoji: '🔍', grad: 'from-amber-100 to-orange-200 dark:from-amber-900/40 dark:to-orange-900/40', title: t('quiz_letter_hunt', lang),  desc: t('quiz_letter_hunt_desc', lang) },
      { mode: 'harakat',    emoji: '🎵', grad: 'from-teal-100 to-cyan-200 dark:from-teal-900/40 dark:to-cyan-900/40',        title: t('quiz_sound_match', lang),  desc: t('quiz_sound_match_desc', lang) },
      { mode: 'numbermatch', emoji: '🔢', grad: 'from-emerald-100 to-green-200 dark:from-emerald-900/40 dark:to-green-900/40', title: t('quiz_number_match', lang), desc: t('quiz_number_match_desc', lang) },
      { mode: 'surahmatch', emoji: '📖', grad: 'from-fuchsia-100 to-pink-200 dark:from-fuchsia-900/40 dark:to-pink-900/40',  title: t('quiz_surah_match', lang),  desc: t('quiz_surah_match_desc', lang) },
      { mode: 'emojiword',  emoji: '🖼️', grad: 'from-orange-100 to-amber-200 dark:from-orange-900/40 dark:to-amber-900/40',  title: t('quiz_picture_match', lang), desc: t('quiz_picture_match_desc', lang) },
      { mode: 'oddone',     emoji: '🧐', grad: 'from-cyan-100 to-sky-200 dark:from-cyan-900/40 dark:to-sky-900/40',          title: t('quiz_odd_one', lang),      desc: t('quiz_odd_one_desc', lang) }
    ];
  }

  renderQuizMenu(lang) {
    const games = this.gamesMeta(lang);
    return `
      <div class="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
      case 'harakat':
        prompt = `
          <p class="text-lg font-bold text-gray-700 dark:text-gray-200 mb-3">${t('quiz_which_sound', lang)}</p>
          <button data-kids-quiz-replay
                  class="px-6 py-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white
                         text-lg font-bold shadow hover:scale-105 transition-all">🔊 ${t('hear_again', lang)}</button>`;
        break;
      case 'numbermatch':
        prompt = `
          <p class="text-lg font-bold text-gray-700 dark:text-gray-200 mb-3">${t('quiz_which_number', lang)}</p>
          <div class="ayah-arabic !text-7xl !leading-tight" dir="rtl">${cur.promptChar}</div>`;
        break;
      case 'surahmatch':
        prompt = `
          <p class="text-lg font-bold text-gray-700 dark:text-gray-200 mb-3">${t('kids_which_surah', lang)}</p>
          <div class="ayah-arabic !text-5xl sm:!text-6xl !leading-tight" dir="rtl">${cur.promptChar}</div>`;
        break;
      case 'emojiword':
        prompt = `
          <p class="text-lg font-bold text-gray-700 dark:text-gray-200 mb-3">${t('quiz_which_picture_word', lang)}</p>
          <div class="text-7xl leading-none">${cur.promptEmoji}</div>
          <div class="text-base font-bold text-gray-600 dark:text-gray-300 mt-2" dir="auto">${cur.promptText}</div>`;
        break;
      case 'oddone':
        prompt = `
          <p class="text-lg font-bold text-gray-700 dark:text-gray-200" dir="auto">
            ${t('quiz_odd_hint', lang).replace('{theme}', `${cur.promptEmoji} ${cur.promptText}`)}
          </p>`;
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
        case 'harakah':
          return `<span class="ayah-arabic !text-5xl !leading-tight" dir="rtl">${opt.display}</span>
                  <span class="text-sm font-bold text-gray-600 dark:text-gray-300">${opt.translit}</span>`;
        case 'numword':
          return `<span class="ayah-arabic !text-4xl !leading-tight" dir="rtl">${opt.word}</span>
                  <span class="text-sm font-bold text-gray-600 dark:text-gray-300">${opt.translit}</span>`;
        case 'surahname':
          return `<span class="text-lg sm:text-xl font-extrabold text-gray-700 dark:text-gray-100" dir="auto">${opt.label}</span>
                  <span class="text-xs text-gray-500 dark:text-gray-400">#${opt.n}</span>`;
        case 'themeword':
          return `<span class="ayah-arabic !text-4xl sm:!text-5xl !leading-tight" dir="rtl">${opt.arabic}</span>
                  <span class="text-sm font-bold text-gray-600 dark:text-gray-300">${opt.translit}</span>`;
        case 'word':
        default:
          return `<span class="ayah-arabic !text-4xl sm:!text-5xl !leading-tight" dir="rtl">${opt.arabic}</span>`;
      }
    };

    return `
      <div class="w-full space-y-5">
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
      <div class="w-full rounded-2xl bg-gradient-to-br from-amber-100 to-orange-200
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

  /* ------------------------------------------------- Stars (progress) */

  /** Same thresholds as renderQuizEnd: 9+ → 3 stars, 6+ → 2, played → 1. */
  starsForScore(score) {
    if (score === null || score === undefined) return 0;
    return score >= 9 ? 3 : score >= 6 ? 2 : 1;
  }

  renderStars(lang) {
    const games = this.gamesMeta(lang);
    // Note: 'listen' and 'name' share the legacy best-score key, so a best
    // earned in either shows on both rows (same behaviour as the quiz menu).
    let total = 0;
    const rows = games.map((g, i) => {
      const best = this.getBestScore(g.mode);
      const stars = this.starsForScore(best);
      total += stars;
      return `
        <button data-kids-quiz-go="${g.mode}"
                class="w-full rounded-2xl bg-gradient-to-br ${g.grad} shadow hover:shadow-lg hover:scale-[1.02]
                       transition-all p-4 flex items-center gap-3 text-left">
          <span class="text-3xl shrink-0">${g.emoji}</span>
          <span class="flex-1 min-w-0">
            <span class="block font-extrabold text-gray-800 dark:text-gray-100 truncate">${g.title}</span>
            <span class="block text-xs text-gray-600 dark:text-gray-300">
              ${best !== null
                ? `🏆 ${t('best_score', lang)}: ${best} / ${KIDS_QUIZ_ROUNDS}`
                : t('kids_not_played_yet', lang)}
            </span>
          </span>
          <span class="text-xl tracking-widest shrink-0">${'⭐'.repeat(stars)}${'☆'.repeat(3 - stars)}</span>
        </button>`;
    }).join('');

    const maxStars = games.length * 3;
    return `
      <div class="max-w-2xl mx-auto space-y-4">
        <div class="rounded-2xl bg-gradient-to-br from-amber-100 to-orange-200
                    dark:from-amber-900/40 dark:to-orange-900/40 shadow p-6 text-center space-y-1">
          <div class="text-5xl">${total > 0 ? '🌟' : '⭐'}</div>
          <div class="text-2xl font-extrabold text-gray-800 dark:text-gray-100">
            ${t('kids_total_stars', lang)}: ${total} / ${maxStars}
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-300">${t('kids_stars_hint', lang)}</p>
        </div>
        <div class="space-y-3">${rows}</div>
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

    // harakat "Sound Match": hear letter+haraka, pick the written form.
    // Same random letter in all 4 options, so only the haraka differs.
    if (mode === 'harakat') {
      const letter = QAIDA_LETTERS[Math.floor(Math.random() * QAIDA_LETTERS.length)];
      const pool = this.shuffleInPlace(QAIDA_HARAKAT.slice()).slice(0, 4);
      const options = pool.map(h => ({ display: h.makeExample(letter.char), translit: h.translit }));
      const correctIndex = Math.floor(Math.random() * options.length);
      const correct = options[correctIndex];
      return {
        mode, options, correctIndex,
        optionType: 'harakah',
        autoSpeak: correct.display,
        rewardAudio: correct.display
      };
    }

    // numbermatch: see the Eastern-Arabic digit, pick its Arabic word
    if (mode === 'numbermatch') {
      const pool = this.shuffleInPlace(KIDS_NUMBERS.slice());
      const options = pool.slice(0, 4);
      const correctIndex = Math.floor(Math.random() * options.length);
      const correct = options[correctIndex];
      return {
        mode, options, correctIndex,
        optionType: 'numword',
        promptChar: correct.digit,
        autoSpeak: null,
        rewardAudio: correct.word
      };
    }

    // surahmatch: see a surah's Arabic name, pick its translated name
    if (mode === 'surahmatch') {
      const list = this.kidsSurahList().filter(s => getSurahByNumber(s.n));
      const pool = this.shuffleInPlace(list.slice()).slice(0, 4);
      const options = pool.map(s => ({ n: s.n, label: getSurahName(s.n, this.language) }));
      const correctIndex = Math.floor(Math.random() * options.length);
      const correct = options[correctIndex];
      const info = getSurahByNumber(correct.n);
      return {
        mode, options, correctIndex,
        optionType: 'surahname',
        promptChar: info ? info.arabicName : '',
        autoSpeak: null,
        rewardAudio: info ? info.arabicName : null
      };
    }

    // emojiword "Picture Match": see the emoji + meaning, pick the Arabic word
    if (mode === 'emojiword') {
      const pool = this.shuffleInPlace(this.themeWordPool().slice());
      const options = [];
      const seen = new Set();
      for (const w of pool) {
        if (seen.has(w.arabic) || seen.has(w.emoji)) continue;
        seen.add(w.arabic); seen.add(w.emoji);
        options.push(w);
        if (options.length === 4) break;
      }
      const correctIndex = Math.floor(Math.random() * options.length);
      const correct = options[correctIndex];
      return {
        mode, options, correctIndex,
        optionType: 'themeword',
        promptEmoji: correct.emoji,
        promptText: this.themeMeaning(correct),
        autoSpeak: null,
        rewardAudio: correct.arabic
      };
    }

    // oddone "Odd One Out": 3 words from one theme + 1 from another
    if (mode === 'oddone') {
      const themes = (typeof KIDS_THEME_WORDS !== 'undefined') ? KIDS_THEME_WORDS : [];
      const pick = this.shuffleInPlace(themes.filter(th => th.words.length >= 3).slice());
      if (pick.length >= 2) {
        const main = pick[0], other = pick[1];
        const three = this.shuffleInPlace(main.words.slice()).slice(0, 3);
        const odd = other.words[Math.floor(Math.random() * other.words.length)];
        const options = this.shuffleInPlace([...three, odd]);
        return {
          mode, options,
          correctIndex: options.indexOf(odd),
          optionType: 'themeword',
          promptEmoji: main.emoji,
          promptText: main.label[this.language] || main.label.en,
          autoSpeak: null,
          rewardAudio: odd.arabic
        };
      }
      // Fallback (should not happen): behave like emojiword
      return this.buildRound('emojiword');
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

    // ---- Themed words ("Word Fun") ----
    const themeWord = e.target.closest('[data-kids-theme-word]');
    if (themeWord) { this.speakArabic(themeWord.getAttribute('data-kids-theme-word'), 0.7); return; }
    const themeVerse = e.target.closest('[data-kids-theme-verse]');
    if (themeVerse) {
      // Show the word's real Quranic verse inline (word highlighted)
      this.openAyahModal(themeVerse.getAttribute('data-kids-theme-verse'), themeVerse.getAttribute('data-kids-theme-hl'));
      return;
    }

    const numWord = e.target.closest('[data-kids-num-word]');
    if (numWord) { this.speakArabic(numWord.getAttribute('data-kids-num-word'), 0.8); return; }
    const numVerse = e.target.closest('[data-kids-num-verse]');
    if (numVerse) {
      // Show the number's real Quranic verse inline (word highlighted)
      this.openAyahModal(numVerse.getAttribute('data-kids-num-verse'), numVerse.getAttribute('data-kids-num-hl'));
      return;
    }

    const duaBtn = e.target.closest('[data-kids-dua-idx]');
    if (duaBtn) {
      const dua = KIDS_DUAS[parseInt(duaBtn.getAttribute('data-kids-dua-idx'), 10)];
      if (dua) this.speakArabic(dua.arabic, 0.8);
      return;
    }

    const kalimaBtn = e.target.closest('[data-kids-kalima-idx]');
    if (kalimaBtn) {
      const kalima = KIDS_KALIMAS[parseInt(kalimaBtn.getAttribute('data-kids-kalima-idx'), 10)];
      if (kalima) this.speakArabic(kalima.arabic, 0.8);
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

    // "My Stars" row → jump into the quiz section and start that game
    const goBtn = e.target.closest('[data-kids-quiz-go]');
    if (goBtn) {
      const mode = goBtn.getAttribute('data-kids-quiz-go');
      this.section = 'quiz';
      this.render();               // marks the Quiz pill active
      this.startQuiz(mode);        // fills #kids-body with the first round
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
