/**
 * Learn Quranic Arabic — a flagship learning module that teaches the Arabic
 * LANGUAGE (grammar & sentence structure) using REAL, verified Quranic examples.
 * Every grammar point is illustrated by an actual ayah whose Arabic wording was
 * checked against the app's own local data (data/quran-words.json). No Arabic is
 * written from memory.
 *
 * Integration (mirrors js/resources.js):
 *   - Renders into #quranic-arabic-container
 *   - Responds to tab id "quranicarabic" (tabChanged event)
 *   - Re-renders on settingChanged:language
 *   - Global instance: quranicArabicView
 *   - Chrome strings via t(key, lang) with a built-in inline fallback so the
 *     module never shows raw keys even before the orchestrator registers them.
 *   - Lesson CONTENT is inline with per-item en/bn fields.
 *   - Progress persisted in localStorage under "lq_qarabic_progress".
 *
 * ACCURACY: every ayah reference, Arabic phrase (word tokens) and highlighted
 * word below was copied from data/quran-words.json (Uthmani text). Grammatical
 * claims are kept at standard textbook level for Quranic-Arabic courses.
 */

/* ------------------------------------------------------------------ *
 * Units (syllabus grouping)                                          *
 * ------------------------------------------------------------------ */
const QA_UNITS = [
  { id: 'foundations', icon: '🕌', en: 'Foundations',   bn: 'ভিত্তি' },
  { id: 'vocabulary',  icon: '⭐', en: 'Frequency Vocabulary', bn: 'বহুল ব্যবহৃত শব্দ' },
  { id: 'nouns',       icon: '📘', en: 'Nouns & Cases', bn: 'বিশেষ্য ও এ‘রাব' },
  { id: 'verbs',       icon: '⚡', en: 'Verbs',         bn: 'ক্রিয়া' },
  { id: 'forms',       icon: '🧬', en: 'Word Forms',    bn: 'শব্দরূপ' },
  { id: 'sentences',   icon: '🔗', en: 'Sentences',     bn: 'বাক্য' },
  { id: 'particles',   icon: '📎', en: 'Particles & Structures', bn: 'অব্যয় ও গঠন' },
  { id: 'advanced',    icon: '📐', en: 'Advanced Grammar', bn: 'উচ্চতর ব্যাকরণ' },
  { id: 'reading',     icon: '📖', en: 'Reading Real Ayat', bn: 'বাস্তব আয়াত পড়া' },
];

/* ------------------------------------------------------------------ *
 * Lessons. Each lesson: id, unit, icon, title{en,bn}, concept{en,bn}, *
 * examples[{ ref, words[{ar,en,bn,hl?}], trans{en,bn}, note{en,bn} }],*
 * practice{ q{en,bn}, options[str|{en,bn}], answer, explain{en,bn} }. *
 * Every `ar` token is verified against data/quran-words.json.         *
 * ------------------------------------------------------------------ */
const QA_LESSONS = [
  /* ===================== UNIT 1 — FOUNDATIONS ===================== */
  {
    id: 'word-types', unit: 'foundations', icon: '🔤',
    title: { en: 'The three word types', bn: 'শব্দের তিন প্রকার' },
    concept: {
      en: 'Every Arabic word is one of three types: an <b>ism</b> (اسم — a noun/name: a person, thing or idea), a <b>fiʿl</b> (فعل — a verb: an action tied to a time), or a <b>harf</b> (حرف — a particle: a small connector such as "in", "to" or "and" that only has meaning with other words). Recognising a word\'s type is the very first step to reading Quranic Arabic.',
      bn: 'প্রতিটি আরবি শব্দ তিন প্রকারের একটি: <b>ইসম</b> (اسم — নাম/বিশেষ্য: ব্যক্তি, বস্তু বা ধারণা), <b>ফি‘ল</b> (فعل — ক্রিয়া: সময়ের সাথে যুক্ত কাজ), অথবা <b>হারফ</b> (حرف — অব্যয়: "তে", "জন্য", "ও"-এর মতো ছোট সংযোজক যা কেবল অন্য শব্দের সাথে অর্থ দেয়)। শব্দের প্রকার চেনা কুরআনি আরবি পড়ার প্রথম ধাপ।',
    },
    examples: [
      { ref: '1:2', trans: { en: 'All praise is for Allah, Lord of the worlds.', bn: 'সকল প্রশংসা আল্লাহর, যিনি জগতসমূহের পালনকর্তা।' },
        note: { en: 'ٱلْحَمْدُ and رَبِّ are nouns (ism); the لِ inside لِلَّهِ ("to/for") is a particle (harf).', bn: 'ٱلْحَمْدُ ও رَبِّ বিশেষ্য (ইসম); لِلَّهِ-এর ভেতরের لِ ("জন্য") একটি অব্যয় (হারফ)।' },
        words: [
          { ar: 'ٱلْحَمْدُ', en: 'the praise', bn: 'সকল প্রশংসা', hl: true },
          { ar: 'لِلَّهِ', en: 'to Allah', bn: 'আল্লাহর জন্য' },
          { ar: 'رَبِّ', en: 'Lord of', bn: 'পালনকর্তা' },
          { ar: 'ٱلْعَٰلَمِينَ', en: 'the worlds', bn: 'জগতসমূহের' },
        ] },
      { ref: '1:5', trans: { en: 'You alone we worship, and You alone we ask for help.', bn: 'কেবল তোমারই ইবাদত করি এবং কেবল তোমারই সাহায্য চাই।' },
        note: { en: 'نَعْبُدُ ("we worship") is a verb (fiʿl) — an action happening in time.', bn: 'نَعْبُدُ ("আমরা ইবাদত করি") একটি ক্রিয়া (ফি‘ল) — সময়ে ঘটমান কাজ।' },
        words: [
          { ar: 'إِيَّاكَ', en: 'You alone', bn: 'কেবল তোমারই' },
          { ar: 'نَعْبُدُ', en: 'we worship', bn: 'আমরা ইবাদত করি', hl: true },
          { ar: 'وَإِيَّاكَ', en: 'and You alone', bn: 'এবং কেবল তোমারই' },
          { ar: 'نَسْتَعِينُ', en: 'we ask for help', bn: 'আমরা সাহায্য চাই' },
        ] },
    ],
    practice: {
      q: { en: 'Which word is a fiʿl (verb)?', bn: 'কোন শব্দটি ফি‘ল (ক্রিয়া)?' },
      options: ['ٱلْحَمْدُ', 'نَعْبُدُ', 'رَبِّ', 'ٱللَّهِ'], answer: 1,
      explain: { en: 'نَعْبُدُ ("we worship") is an action tied to time, so it is a verb. The others are nouns (ism).', bn: 'نَعْبُدُ ("আমরা ইবাদত করি") সময়-সম্পর্কিত কাজ, তাই এটি ক্রিয়া। বাকিগুলো বিশেষ্য (ইসম)।' },
    },
  },
  {
    id: 'definite-article', unit: 'foundations', icon: '🌙',
    title: { en: 'The definite article ٱلْ (sun & moon letters)', bn: 'নির্দিষ্টতার ٱلْ (সূর্য ও চন্দ্র অক্ষর)' },
    concept: {
      en: 'ٱلْ ("the") is placed on the front of a noun to make it definite, exactly like English "the". Its lam is pronounced clearly before a <b>moon letter</b> (e.g. ٱلْحَمْد → "al-ḥamd"). But before a <b>sun letter</b> the lam is silent and the next letter is doubled (ٱلرَّحْمَٰن → "ar-raḥmān", not "al-raḥmān"). The spelling keeps the ل either way; only the pronunciation changes.',
      bn: 'ٱلْ ("the/নির্দিষ্ট") বিশেষ্যের আগে বসে তাকে নির্দিষ্ট করে, ইংরেজি "the"-এর মতো। <b>চন্দ্র অক্ষরের</b> আগে এর লাম স্পষ্ট উচ্চারিত হয় (ٱلْحَمْد → "আল-হামদ")। কিন্তু <b>সূর্য অক্ষরের</b> আগে লাম নীরব থাকে ও পরের অক্ষরে শাদ্দা পড়ে (ٱلرَّحْمَٰن → "আর-রাহমান")। বানানে ل থাকে, কেবল উচ্চারণ বদলায়।',
    },
    examples: [
      { ref: '1:2', trans: { en: 'the praise ("al-ḥamd") — moon letter', bn: 'সকল প্রশংসা ("আল-হামদ") — চন্দ্র অক্ষর' },
        note: { en: 'ح is a moon letter, so the ل is pronounced: "al-ḥamdu".', bn: 'ح একটি চন্দ্র অক্ষর, তাই ل উচ্চারিত হয়: "আল-হামদু"।' },
        words: [ { ar: 'ٱلْحَمْدُ', en: 'the praise', bn: 'সকল প্রশংসা', hl: true } ] },
      { ref: '1:3', trans: { en: 'the Most Merciful, the Bestower of Mercy ("ar-raḥmān") — sun letter', bn: 'পরম করুণাময়, অসীম দয়ালু ("আর-রাহমান") — সূর্য অক্ষর' },
        note: { en: 'ر is a sun letter, so the ل is silent and ر is doubled: "ar-raḥmān".', bn: 'ر একটি সূর্য অক্ষর, তাই ل নীরব ও ر-তে শাদ্দা: "আর-রাহমান"।' },
        words: [
          { ar: 'ٱلرَّحْمَٰنِ', en: 'the Most Merciful', bn: 'পরম করুণাময়', hl: true },
          { ar: 'ٱلرَّحِيمِ', en: 'the Bestower of Mercy', bn: 'অসীম দয়ালু' },
        ] },
    ],
    practice: {
      q: { en: 'In ٱلرَّحْمَٰن the ل is not pronounced because ر is a ___ letter.', bn: 'ٱلرَّحْمَٰن-এ ل উচ্চারিত হয় না কারণ ر একটি ___ অক্ষর।' },
      options: [{ en: 'moon', bn: 'চন্দ্র' }, { en: 'sun', bn: 'সূর্য' }, { en: 'weak', bn: 'দুর্বল' }], answer: 1,
      explain: { en: 'ر is one of the 14 sun letters, which absorb the ل of ٱلْ.', bn: 'ر হলো ১৪টি সূর্য অক্ষরের একটি, যা ٱلْ-এর ل-কে মিলিয়ে নেয়।' },
    },
  },
  {
    id: 'gender', unit: 'foundations', icon: '⚥',
    title: { en: 'Gender & the taa marbuta ة', bn: 'লিঙ্গ ও তা মারবুতা ة' },
    concept: {
      en: 'Every Arabic noun is either masculine or feminine. The clearest sign of a feminine noun is the <b>taa marbuta</b> ة at its end (it looks like a ه with two dots). Words without it are usually masculine. So رَحْمَة ("mercy") is feminine, while كِتَاب ("book") is masculine.',
      bn: 'প্রতিটি আরবি বিশেষ্য পুংলিঙ্গ বা স্ত্রীলিঙ্গ। স্ত্রীলিঙ্গের সবচেয়ে স্পষ্ট চিহ্ন শেষে <b>তা মারবুতা</b> ة (দুই বিন্দুসহ ه-এর মতো দেখতে)। এটি না থাকলে সাধারণত পুংলিঙ্গ। তাই رَحْمَة ("রহমত") স্ত্রীলিঙ্গ, আর كِتَاب ("কিতাব") পুংলিঙ্গ।',
    },
    examples: [
      { ref: '21:107', trans: { en: 'And We sent you only as a mercy to the worlds.', bn: 'আর আমরা তোমাকে কেবল জগতসমূহের জন্য রহমতস্বরূপ পাঠিয়েছি।' },
        note: { en: 'رَحْمَةً ends in taa marbuta ة → feminine.', bn: 'رَحْمَةً শেষ হয়েছে তা মারবুতা ة দিয়ে → স্ত্রীলিঙ্গ।' },
        words: [
          { ar: 'وَمَآ', en: 'And not', bn: 'আর না' },
          { ar: 'أَرْسَلْنَٰكَ', en: 'We sent you', bn: 'আমরা তোমাকে পাঠিয়েছি' },
          { ar: 'إِلَّا', en: 'except', bn: 'কেবল' },
          { ar: 'رَحْمَةً', en: 'a mercy', bn: 'রহমতস্বরূপ', hl: true },
          { ar: 'لِّلْعَٰلَمِينَ', en: 'to the worlds', bn: 'জগতসমূহের জন্য' },
        ] },
      { ref: '2:2', trans: { en: 'That is the Book…', bn: 'এই সেই কিতাব…' },
        note: { en: 'ٱلْكِتَٰبُ has no taa marbuta → masculine.', bn: 'ٱلْكِتَٰبُ-তে তা মারবুতা নেই → পুংলিঙ্গ।' },
        words: [
          { ar: 'ذَٰلِكَ', en: 'That', bn: 'এই সেই' },
          { ar: 'ٱلْكِتَٰبُ', en: 'the Book', bn: 'কিতাব', hl: true },
        ] },
    ],
    practice: {
      q: { en: 'Which word is feminine?', bn: 'কোন শব্দটি স্ত্রীলিঙ্গ?' },
      options: ['ٱلْكِتَٰبُ', 'رَحْمَةً', 'رَبِّ'], answer: 1,
      explain: { en: 'رَحْمَةً ends in the taa marbuta ة, the mark of a feminine noun.', bn: 'رَحْمَةً শেষ হয় তা মারবুতা ة দিয়ে, যা স্ত্রীলিঙ্গের চিহ্ন।' },
    },
  },
  {
    id: 'detached-pronouns', unit: 'foundations', icon: '👤',
    title: { en: 'Detached pronouns (هُوَ، أَنْتَ، أَنَا…)', bn: 'বিচ্ছিন্ন সর্বনাম (هُوَ، أَنْتَ، أَنَا…)' },
    concept: {
      en: 'Detached (standalone) pronouns are separate words: هُوَ ("he/it"), هِيَ ("she/it"), أَنْتَ ("you", m.), أَنَا ("I"), نَحْنُ ("we"). They usually stand as the subject of a sentence. In Al-Ikhlas, هُوَ points to Allah.',
      bn: 'বিচ্ছিন্ন (স্বতন্ত্র) সর্বনাম আলাদা শব্দ: هُوَ ("সে/তিনি"), هِيَ ("সে", স্ত্রী.), أَنْتَ ("তুমি", পুং.), أَنَا ("আমি"), نَحْنُ ("আমরা")। এগুলো সাধারণত বাক্যের কর্তা হয়। সূরা ইখলাসে هُوَ আল্লাহকে বোঝায়।',
    },
    examples: [
      { ref: '112:1', trans: { en: 'Say, "He is Allah, One."', bn: 'বলো, "তিনি আল্লাহ, একক।"' },
        note: { en: 'هُوَ ("He") is a detached pronoun and the subject of the sentence.', bn: 'هُوَ ("তিনি") একটি বিচ্ছিন্ন সর্বনাম ও বাক্যের কর্তা।' },
        words: [
          { ar: 'قُلْ', en: 'Say', bn: 'বলো' },
          { ar: 'هُوَ', en: 'He (is)', bn: 'তিনি', hl: true },
          { ar: 'ٱللَّهُ', en: 'Allah', bn: 'আল্লাহ' },
          { ar: 'أَحَدٌ', en: 'One', bn: 'একক' },
        ] },
    ],
    practice: {
      q: { en: 'What does the pronoun هُوَ mean?', bn: 'هُوَ সর্বনামের অর্থ কী?' },
      options: [{ en: 'I', bn: 'আমি' }, { en: 'you', bn: 'তুমি' }, { en: 'he / it', bn: 'সে / তিনি' }], answer: 2,
      explain: { en: 'هُوَ means "he / it" (3rd person masculine singular).', bn: 'هُوَ মানে "সে / তিনি" (তৃতীয় পুরুষ, পুংলিঙ্গ, একবচন)।' },
    },
  },

  /* ===================== UNIT 2 — NOUNS & CASES ===================== */
  {
    id: 'cases', unit: 'nouns', icon: '🎯',
    title: { en: 'The three cases: rafʿ, naṣb, jarr', bn: 'তিন এ‘রাব: রফ‘, নসব, জর' },
    concept: {
      en: 'The ending vowel of a noun shows its role in the sentence — this is <b>iʿrāb</b>. The three basic cases are <b>rafʿ</b> (nominative, usually ‑u, for the subject), <b>naṣb</b> (accusative, usually ‑a, for the object), and <b>jarr</b> (genitive, usually ‑i, after a preposition or in possession). Watch the last vowel: ٱلْحَمْدُ (‑u) vs ٱلْعَٰلَمِينَ (‑a/i form).',
      bn: 'বিশেষ্যের শেষ স্বর তার বাক্যে ভূমিকা দেখায় — একে <b>এ‘রাব</b> বলে। তিনটি মূল অবস্থা: <b>রফ‘</b> (সাধারণত ‑u, কর্তার জন্য), <b>নসব</b> (সাধারণত ‑a, কর্মের জন্য), এবং <b>জর</b> (সাধারণত ‑i, অব্যয়ের পরে বা সম্বন্ধে)। শেষ স্বরটি লক্ষ করো: ٱلْحَمْدُ (‑u) বনাম ٱلْعَٰلَمِينَ।',
    },
    examples: [
      { ref: '1:2', trans: { en: 'All praise (rafʿ) is for Allah, Lord of the worlds (jarr).', bn: 'সকল প্রশংসা (রফ‘) আল্লাহর, জগতসমূহের (জর) পালনকর্তা।' },
        note: { en: 'ٱلْحَمْدُ ends in ‑u (rafʿ, the subject). ٱلْعَٰلَمِينَ is genitive (jarr) in the possession chain.', bn: 'ٱلْحَمْدُ শেষ ‑u (রফ‘, কর্তা)। ٱلْعَٰلَمِينَ সম্বন্ধ-শৃঙ্খলে জর।' },
        words: [
          { ar: 'ٱلْحَمْدُ', en: 'the praise (‑u, rafʿ)', bn: 'সকল প্রশংসা (‑u, রফ‘)', hl: true },
          { ar: 'لِلَّهِ', en: 'for Allah', bn: 'আল্লাহর জন্য' },
          { ar: 'رَبِّ', en: 'Lord of', bn: 'পালনকর্তা' },
          { ar: 'ٱلْعَٰلَمِينَ', en: 'the worlds (jarr)', bn: 'জগতসমূহের (জর)', hl: true },
        ] },
    ],
    practice: {
      q: { en: 'The ‑u ending on ٱلْحَمْدُ shows it is in the case of…', bn: 'ٱلْحَمْدُ-এর ‑u শেষ কোন অবস্থা বোঝায়…' },
      options: [{ en: 'rafʿ (nominative)', bn: 'রফ‘ (কর্তা)' }, { en: 'naṣb (accusative)', bn: 'নসব (কর্ম)' }, { en: 'jarr (genitive)', bn: 'জর (সম্বন্ধ)' }], answer: 0,
      explain: { en: 'A ‑u (ḍamma) ending marks rafʿ (nominative) — here the subject of praise.', bn: '‑u (দম্মা) শেষ রফ‘ (কর্তা) বোঝায় — এখানে প্রশংসার কর্তা।' },
    },
  },
  {
    id: 'idafah', unit: 'nouns', icon: '🔗',
    title: { en: 'The iḍāfah (possessive construction)', bn: 'ইদাফা (সম্বন্ধ গঠন)' },
    concept: {
      en: 'The iḍāfah joins two nouns to mean "X of Y". The first noun takes NO ٱلْ and no tanwīn; the second noun is in the genitive (jarr). مَٰلِكِ يَوْمِ ٱلدِّينِ = "Master of the Day of Judgement" — a chain of three nouns, each owned by the next.',
      bn: 'ইদাফা দুটি বিশেষ্যকে জুড়ে "X-এর Y" অর্থ দেয়। প্রথম বিশেষ্যে ٱلْ বা তানভীন থাকে না; দ্বিতীয় বিশেষ্য জর অবস্থায় থাকে। مَٰلِكِ يَوْمِ ٱلدِّينِ = "বিচার দিনের মালিক" — তিন বিশেষ্যের শৃঙ্খল।',
    },
    examples: [
      { ref: '1:4', trans: { en: 'Master of the Day of Judgement.', bn: 'বিচার দিনের মালিক।' },
        note: { en: 'مَٰلِكِ ("Master") owns يَوْمِ ("Day"), which owns ٱلدِّينِ ("the Judgement") — all genitive.', bn: 'مَٰلِكِ ("মালিক") এর সাথে يَوْمِ ("দিন"), তার সাথে ٱلدِّينِ ("বিচার") — সবই জর।' },
        words: [
          { ar: 'مَٰلِكِ', en: 'Master of', bn: 'মালিক', hl: true },
          { ar: 'يَوْمِ', en: 'the Day of', bn: 'দিনের', hl: true },
          { ar: 'ٱلدِّينِ', en: 'the Judgement', bn: 'বিচার', hl: true },
        ] },
    ],
    practice: {
      q: { en: 'In an iḍāfah, the SECOND noun is always in which case?', bn: 'ইদাফায় দ্বিতীয় বিশেষ্য সবসময় কোন অবস্থায় থাকে?' },
      options: [{ en: 'rafʿ', bn: 'রফ‘' }, { en: 'jarr (genitive)', bn: 'জর' }, { en: 'naṣb', bn: 'নসব' }], answer: 1,
      explain: { en: 'The possessed-by (second) noun of an iḍāfah is always genitive (jarr).', bn: 'ইদাফার দ্বিতীয় (অধিকৃত) বিশেষ্য সবসময় জর হয়।' },
    },
  },
  {
    id: 'prepositions', unit: 'nouns', icon: '🧭',
    title: { en: 'Prepositions (ḥurūf al-jarr)', bn: 'অব্যয় (হুরুফুল জর)' },
    concept: {
      en: 'Prepositions are particles that come before a noun and put it in the genitive (jarr). Common ones: بِـ ("with/by"), فِي ("in"), عَلَىٰ ("on/upon"), مِنْ ("from"), إِلَىٰ ("to"). The noun after them always takes the ‑i (kasra) ending.',
      bn: 'অব্যয় হলো এমন হারফ যা বিশেষ্যের আগে বসে তাকে জর করে। প্রচলিত: بِـ ("দিয়ে/সাথে"), فِي ("মধ্যে"), عَلَىٰ ("উপর"), مِنْ ("থেকে"), إِلَىٰ ("দিকে")। এদের পরের বিশেষ্য সবসময় ‑i (কাসরা) নেয়।',
    },
    examples: [
      { ref: '1:1', trans: { en: 'In the name of Allah…', bn: 'আল্লাহর নামে…' },
        note: { en: 'بِـ ("with/in") makes ٱسْم genitive → بِسْمِ.', bn: 'بِـ ("দিয়ে") ٱسْم-কে জর করে → بِسْمِ।' },
        words: [
          { ar: 'بِسْمِ', en: 'In the name of', bn: 'নামে', hl: true },
          { ar: 'ٱللَّهِ', en: 'Allah', bn: 'আল্লাহর' },
        ] },
      { ref: '2:2', trans: { en: '…there is no doubt in it…', bn: '…এতে কোনো সন্দেহ নেই…' },
        note: { en: 'فِي ("in") merges with the pronoun ‑هِ → فِيهِ ("in it").', bn: 'فِي ("মধ্যে") সর্বনাম ‑هِ-এর সাথে মিশে → فِيهِ ("এতে")।' },
        words: [
          { ar: 'لَا', en: 'no', bn: 'নেই' },
          { ar: 'رَيْبَ', en: 'doubt', bn: 'সন্দেহ' },
          { ar: 'فِيهِ', en: 'in it', bn: 'এতে', hl: true },
        ] },
    ],
    practice: {
      q: { en: 'A noun coming right after a preposition like فِي is in which case?', bn: 'فِي-এর মতো অব্যয়ের ঠিক পরের বিশেষ্য কোন অবস্থায়?' },
      options: [{ en: 'jarr (genitive)', bn: 'জর' }, { en: 'rafʿ', bn: 'রফ‘' }, { en: 'naṣb', bn: 'নসব' }], answer: 0,
      explain: { en: 'That is why they are called ḥurūf al-jarr — they force the genitive (jarr).', bn: 'সেজন্যই এদের হুরুফুল জর বলা হয় — এরা জর টানে।' },
    },
  },
  {
    id: 'demonstratives', unit: 'nouns', icon: '👉',
    title: { en: 'Demonstratives (هٰذَا، ذٰلِكَ)', bn: 'নির্দেশক সর্বনাম (هٰذَا، ذٰلِكَ)' },
    concept: {
      en: 'Demonstratives point things out. هٰذَا means "this" (near, masculine) and هٰذِهِ "this" (near, feminine); ذٰلِكَ means "that" (far, masculine) and تِلْكَ "that" (far, feminine). Al-Baqarah opens with ذٰلِكَ ٱلْكِتَٰبُ, "That is the Book".',
      bn: 'নির্দেশক সর্বনাম কোনো কিছু নির্দেশ করে। هٰذَا মানে "এই" (কাছে, পুং.), هٰذِهِ "এই" (কাছে, স্ত্রী.); ذٰلِكَ মানে "সেই" (দূরে, পুং.), تِلْكَ "সেই" (দূরে, স্ত্রী.)। সূরা বাকারা শুরু হয় ذٰلِكَ ٱلْكِتَٰبُ দিয়ে, "এই সেই কিতাব"।',
    },
    examples: [
      { ref: '2:2', trans: { en: 'That is the Book about which there is no doubt.', bn: 'এই সেই কিতাব, যাতে কোনো সন্দেহ নেই।' },
        note: { en: 'ذَٰلِكَ ("that") is a far, masculine demonstrative pointing to ٱلْكِتَٰبُ.', bn: 'ذَٰلِكَ ("সেই") একটি দূরবর্তী পুংলিঙ্গ নির্দেশক, ٱلْكِتَٰبُ-কে নির্দেশ করে।' },
        words: [
          { ar: 'ذَٰلِكَ', en: 'That (is)', bn: 'এই সেই', hl: true },
          { ar: 'ٱلْكِتَٰبُ', en: 'the Book', bn: 'কিতাব' },
          { ar: 'لَا', en: 'no', bn: 'নেই' },
          { ar: 'رَيْبَ', en: 'doubt', bn: 'সন্দেহ' },
          { ar: 'فِيهِ', en: 'in it', bn: 'এতে' },
        ] },
    ],
    practice: {
      q: { en: 'ذٰلِكَ means…', bn: 'ذٰلِكَ মানে…' },
      options: [{ en: 'this (near)', bn: 'এই (কাছে)' }, { en: 'that (far)', bn: 'সেই (দূরে)' }, { en: 'who', bn: 'যে' }], answer: 1,
      explain: { en: 'ذٰلِكَ is the far, masculine "that"; هٰذَا is the near "this".', bn: 'ذٰلِكَ দূরবর্তী পুংলিঙ্গ "সেই"; هٰذَا কাছের "এই"।' },
    },
  },

  /* ===================== UNIT 3 — VERBS ===================== */
  {
    id: 'past-tense', unit: 'verbs', icon: '⏮️',
    title: { en: 'The past tense (al-māḍī)', bn: 'অতীত কাল (আল-মাদি)' },
    concept: {
      en: 'The past tense (al-māḍī) describes a completed action. The base form is "he did": فَعَلَ. Endings are attached to show the doer: ‑تَ ("you", m.), ‑تُ ("I"), ‑نَا ("we"). أَنْعَمْتَ = "You bestowed favour", أَعْطَيْنَا = "We gave".',
      bn: 'অতীত কাল (আল-মাদি) সম্পন্ন কাজ বোঝায়। মূল রূপ "সে করলো": فَعَلَ। কর্তা বোঝাতে শেষে যুক্ত হয়: ‑تَ ("তুমি", পুং.), ‑تُ ("আমি"), ‑نَا ("আমরা")। أَنْعَمْتَ = "তুমি অনুগ্রহ করেছ", أَعْطَيْنَا = "আমরা দিয়েছি"।',
    },
    examples: [
      { ref: '1:7', trans: { en: 'the path of those upon whom You have bestowed favour…', bn: 'তাদের পথ, যাদের প্রতি তুমি অনুগ্রহ করেছ…' },
        note: { en: 'أَنْعَمْتَ = past verb أَنْعَمَ + ‑تَ ("you"): "You bestowed favour".', bn: 'أَنْعَمْتَ = অতীত ক্রিয়া أَنْعَمَ + ‑تَ ("তুমি"): "তুমি অনুগ্রহ করেছ"।' },
        words: [
          { ar: 'صِرَٰطَ', en: 'the path of', bn: 'পথ' },
          { ar: 'ٱلَّذِينَ', en: 'those whom', bn: 'যাদের' },
          { ar: 'أَنْعَمْتَ', en: 'You bestowed favour', bn: 'তুমি অনুগ্রহ করেছ', hl: true },
          { ar: 'عَلَيْهِمْ', en: 'upon them', bn: 'তাদের প্রতি' },
        ] },
      { ref: '108:1', trans: { en: 'Indeed, We have given you al-Kawthar.', bn: 'নিশ্চয় আমরা তোমাকে কাউসার দিয়েছি।' },
        note: { en: 'أَعْطَيْنَا = past verb أَعْطَىٰ + ‑نَا ("we"): "We gave" (the ‑كَ is the object "you").', bn: 'أَعْطَيْنَا = অতীত ক্রিয়া أَعْطَىٰ + ‑نَا ("আমরা"): "আমরা দিয়েছি" (‑كَ কর্ম "তোমাকে")।' },
        words: [
          { ar: 'إِنَّآ', en: 'Indeed We', bn: 'নিশ্চয় আমরা' },
          { ar: 'أَعْطَيْنَٰكَ', en: 'We gave you', bn: 'আমরা তোমাকে দিয়েছি', hl: true },
          { ar: 'ٱلْكَوْثَرَ', en: 'al-Kawthar', bn: 'কাউসার' },
        ] },
    ],
    practice: {
      q: { en: 'In أَنْعَمْتَ, the ending ‑تَ tells us the doer is…', bn: 'أَنْعَمْتَ-এ শেষ ‑تَ বলে কর্তা হলো…' },
      options: [{ en: '"I"', bn: '"আমি"' }, { en: '"you" (he addressed)', bn: '"তুমি"' }, { en: '"they"', bn: '"তারা"' }], answer: 1,
      explain: { en: 'The suffix ‑تَ on a past verb marks "you" (2nd person masculine singular).', bn: 'অতীত ক্রিয়ায় ‑تَ প্রত্যয় "তুমি" (দ্বিতীয় পুরুষ, পুং., একবচন) বোঝায়।' },
    },
  },
  {
    id: 'present-tense', unit: 'verbs', icon: '⏯️',
    title: { en: 'The present/future (al-muḍāriʿ)', bn: 'বর্তমান/ভবিষ্যৎ (আল-মুদারি‘)' },
    concept: {
      en: 'The muḍāriʿ describes an ongoing or future action ("does / is doing / will do"). It begins with a prefix letter that shows the doer: أَ ("I"), نَ ("we"), يَ ("he"), تَ ("you/she"). نَعْبُدُ = "we worship", نَسْتَعِينُ = "we seek help" — both start with نَ ("we").',
      bn: 'মুদারি‘ চলমান বা ভবিষ্যৎ কাজ বোঝায় ("করে / করছে / করবে")। এর শুরুতে কর্তা-নির্দেশক অক্ষর থাকে: أَ ("আমি"), نَ ("আমরা"), يَ ("সে"), تَ ("তুমি/সে-স্ত্রী")। نَعْبُدُ = "আমরা ইবাদত করি", نَسْتَعِينُ = "আমরা সাহায্য চাই" — দুটোই نَ ("আমরা") দিয়ে শুরু।',
    },
    examples: [
      { ref: '1:5', trans: { en: 'You alone we worship, and You alone we ask for help.', bn: 'কেবল তোমারই ইবাদত করি এবং কেবল তোমারই সাহায্য চাই।' },
        note: { en: 'The نَ‑ prefix on نَعْبُدُ and نَسْتَعِينُ means "we".', bn: 'نَعْبُدُ ও نَسْتَعِينُ-এর نَ‑ উপসর্গ মানে "আমরা"।' },
        words: [
          { ar: 'إِيَّاكَ', en: 'You alone', bn: 'কেবল তোমারই' },
          { ar: 'نَعْبُدُ', en: 'we worship', bn: 'আমরা ইবাদত করি', hl: true },
          { ar: 'وَإِيَّاكَ', en: 'and You alone', bn: 'এবং কেবল তোমারই' },
          { ar: 'نَسْتَعِينُ', en: 'we seek help', bn: 'আমরা সাহায্য চাই', hl: true },
        ] },
    ],
    practice: {
      q: { en: 'The نَ‑ at the start of نَعْبُدُ shows the subject is…', bn: 'نَعْبُدُ-এর শুরুর نَ‑ কর্তা বোঝায়…' },
      options: [{ en: '"we"', bn: '"আমরা"' }, { en: '"he"', bn: '"সে"' }, { en: '"you"', bn: '"তুমি"' }], answer: 0,
      explain: { en: 'The present-tense prefix نَ‑ means "we"; يَ‑ = "he", أَ‑ = "I", تَ‑ = "you/she".', bn: 'বর্তমান কালের نَ‑ উপসর্গ মানে "আমরা"; يَ‑ = "সে", أَ‑ = "আমি", تَ‑ = "তুমি/সে"।' },
    },
  },
  {
    id: 'command', unit: 'verbs', icon: '❗',
    title: { en: 'The command (al-amr)', bn: 'আদেশ (আল-আমর)' },
    concept: {
      en: 'The command (al-amr) tells someone to do something ("do!"). It is formed from the present tense by dropping the prefix. ٱهْدِنَا = "Guide us!", صَلِّ = "Pray!", قُلْ = "Say!". Much of du‘ā in the Quran uses the command form addressed to Allah.',
      bn: 'আদেশ (আল-আমর) কাউকে কিছু করতে বলে ("করো!")। বর্তমান কাল থেকে উপসর্গ ফেলে এটি গঠিত হয়। ٱهْدِنَا = "আমাদের পথ দেখাও!", صَلِّ = "সালাত পড়ো!", قُلْ = "বলো!"। কুরআনের অনেক দু‘আ আল্লাহর প্রতি আদেশ-রূপে।',
    },
    examples: [
      { ref: '1:6', trans: { en: 'Guide us to the straight path.', bn: 'আমাদের সরল পথ দেখাও।' },
        note: { en: 'ٱهْدِنَا = command "guide!" + ‑نَا ("us").', bn: 'ٱهْدِنَا = আদেশ "পথ দেখাও!" + ‑نَا ("আমাদের")।' },
        words: [
          { ar: 'ٱهْدِنَا', en: 'Guide us', bn: 'আমাদের পথ দেখাও', hl: true },
          { ar: 'ٱلصِّرَٰطَ', en: 'to the path', bn: 'পথ' },
          { ar: 'ٱلْمُسْتَقِيمَ', en: 'the straight', bn: 'সরল' },
        ] },
      { ref: '108:2', trans: { en: 'So pray to your Lord and sacrifice.', bn: 'অতএব তোমার রবের উদ্দেশ্যে সালাত পড়ো ও কুরবানি করো।' },
        note: { en: 'صَلِّ ("pray!") and ٱنْحَرْ ("sacrifice!") are both commands.', bn: 'صَلِّ ("সালাত পড়ো!") ও ٱنْحَرْ ("কুরবানি করো!") দুটোই আদেশ।' },
        words: [
          { ar: 'فَصَلِّ', en: 'So pray', bn: 'অতএব সালাত পড়ো', hl: true },
          { ar: 'لِرَبِّكَ', en: 'to your Lord', bn: 'তোমার রবের জন্য' },
          { ar: 'وَٱنْحَرْ', en: 'and sacrifice', bn: 'ও কুরবানি করো' },
        ] },
    ],
    practice: {
      q: { en: 'ٱهْدِنَا ("Guide us") is an example of which verb form?', bn: 'ٱهْدِنَا ("আমাদের পথ দেখাও") কোন ক্রিয়ারূপ?' },
      options: [{ en: 'past (māḍī)', bn: 'অতীত (মাদি)' }, { en: 'command (amr)', bn: 'আদেশ (আমর)' }, { en: 'present (muḍāriʿ)', bn: 'বর্তমান (মুদারি‘)' }], answer: 1,
      explain: { en: 'It requests an action to be done, so it is the command (al-amr).', bn: 'এটি কাজ করার অনুরোধ, তাই এটি আদেশ (আল-আমর)।' },
    },
  },
  {
    id: 'object-pronouns', unit: 'verbs', icon: '📎',
    title: { en: 'Attached (object) pronouns on verbs', bn: 'ক্রিয়ায় যুক্ত (কর্ম) সর্বনাম' },
    concept: {
      en: 'A pronoun can attach to the END of a verb as its object: ‑نِي ("me"), ‑كَ ("you"), ‑هُ ("him/it"), ‑نَا ("us"), ‑هُمْ ("them"). So أَعْطَيْنَٰكَ = "We gave YOU", and the ‑نَا in ٱهْدِنَا = "guide US".',
      bn: 'একটি সর্বনাম ক্রিয়ার শেষে কর্ম হিসেবে যুক্ত হতে পারে: ‑نِي ("আমাকে"), ‑كَ ("তোমাকে"), ‑هُ ("তাকে"), ‑نَا ("আমাদের"), ‑هُمْ ("তাদের")। তাই أَعْطَيْنَٰكَ = "আমরা তোমাকে দিয়েছি", আর ٱهْدِنَا-এর ‑نَا = "আমাদের পথ দেখাও"।',
    },
    examples: [
      { ref: '108:1', trans: { en: 'Indeed, We have given you al-Kawthar.', bn: 'নিশ্চয় আমরা তোমাকে কাউসার দিয়েছি।' },
        note: { en: 'The final ‑كَ on أَعْطَيْنَٰكَ is the object "you".', bn: 'أَعْطَيْنَٰكَ-এর শেষ ‑كَ কর্ম "তোমাকে"।' },
        words: [
          { ar: 'إِنَّآ', en: 'Indeed We', bn: 'নিশ্চয় আমরা' },
          { ar: 'أَعْطَيْنَٰكَ', en: 'We gave you', bn: 'আমরা তোমাকে দিয়েছি', hl: true },
          { ar: 'ٱلْكَوْثَرَ', en: 'al-Kawthar', bn: 'কাউসার' },
        ] },
      { ref: '1:6', trans: { en: 'Guide us to the straight path.', bn: 'আমাদের সরল পথ দেখাও।' },
        note: { en: 'The ‑نَا on ٱهْدِنَا is the object "us".', bn: 'ٱهْدِنَا-এর ‑نَا কর্ম "আমাদের"।' },
        words: [
          { ar: 'ٱهْدِنَا', en: 'Guide us', bn: 'আমাদের পথ দেখাও', hl: true },
          { ar: 'ٱلصِّرَٰطَ', en: 'the path', bn: 'পথ' },
          { ar: 'ٱلْمُسْتَقِيمَ', en: 'the straight', bn: 'সরল' },
        ] },
    ],
    practice: {
      q: { en: 'In أَعْطَيْنَٰكَ, what does the attached ‑كَ mean?', bn: 'أَعْطَيْنَٰكَ-এ যুক্ত ‑كَ-এর অর্থ কী?' },
      options: [{ en: '"us"', bn: '"আমাদের"' }, { en: '"you" (object)', bn: '"তোমাকে" (কর্ম)' }, { en: '"them"', bn: '"তাদের"' }], answer: 1,
      explain: { en: 'The suffix ‑كَ means "you" as the object of the verb — "We gave you".', bn: '‑كَ প্রত্যয় ক্রিয়ার কর্ম "তোমাকে" — "আমরা তোমাকে দিয়েছি"।' },
    },
  },
  {
    id: 'verb-forms', unit: 'verbs', icon: '🧩',
    title: { en: 'Verb forms (al-awzān)', bn: 'ক্রিয়ার ওজন (আল-আওযান)' },
    concept: {
      en: 'Most Arabic verbs are built from a 3-letter root cast into one of ten patterns (awzān) that shade the meaning. <b>Form I</b> is the plain root (فَعَلَ). <b>Form II</b> doubles the middle letter and often adds "make/cause": عَلِمَ ("he knew") → عَلَّمَ ("he taught"). <b>Form X</b> (ٱسْتَفْعَلَ) often means "to seek/ask for".',
      bn: 'অধিকাংশ আরবি ক্রিয়া তিন-অক্ষরের মূল থেকে দশটি প্যাটার্নের (আওযান) একটিতে গঠিত হয়, যা অর্থে ছায়া যোগ করে। <b>প্রথম রূপ</b> সাধারণ মূল (فَعَلَ)। <b>দ্বিতীয় রূপ</b> মধ্য অক্ষর দ্বিগুণ করে ও প্রায়ই "করানো" যোগ করে: عَلِمَ ("সে জানলো") → عَلَّمَ ("সে শেখালো")। <b>দশম রূপ</b> (ٱسْتَفْعَلَ) প্রায়ই "চাওয়া/খোঁজা" বোঝায়।',
    },
    examples: [
      { ref: '55:2', trans: { en: 'He taught the Quran.', bn: 'তিনি কুরআন শিক্ষা দিয়েছেন।' },
        note: { en: 'عَلَّمَ is Form II (doubled middle letter) — "to teach", from عَلِمَ "to know".', bn: 'عَلَّمَ দ্বিতীয় রূপ (মধ্য অক্ষর দ্বিগুণ) — "শেখানো", عَلِمَ "জানা" থেকে।' },
        words: [
          { ar: 'عَلَّمَ', en: 'He taught', bn: 'তিনি শিক্ষা দিয়েছেন', hl: true },
          { ar: 'ٱلْقُرْءَانَ', en: 'the Quran', bn: 'কুরআন' },
        ] },
      { ref: '1:5', trans: { en: '…and You alone we ask for help.', bn: '…এবং কেবল তোমারই সাহায্য চাই।' },
        note: { en: 'نَسْتَعِينُ is Form X (ٱسْتَفْعَلَ) — "to seek help", from عَوْن "help".', bn: 'نَسْتَعِينُ দশম রূপ (ٱسْتَفْعَلَ) — "সাহায্য চাওয়া", عَوْن "সাহায্য" থেকে।' },
        words: [
          { ar: 'وَإِيَّاكَ', en: 'and You alone', bn: 'এবং কেবল তোমারই' },
          { ar: 'نَسْتَعِينُ', en: 'we seek help', bn: 'আমরা সাহায্য চাই', hl: true },
        ] },
    ],
    practice: {
      q: { en: 'عَلَّمَ ("he taught") is made from عَلِمَ ("he knew") by doubling the middle letter. This Form II pattern often adds the sense of…', bn: 'عَلَّمَ ("সে শেখালো") তৈরি হয়েছে عَلِمَ ("সে জানলো") থেকে মধ্য অক্ষর দ্বিগুণ করে। এই দ্বিতীয় রূপ প্রায়ই যোগ করে…' },
      options: [{ en: 'seeking / asking', bn: 'চাওয়া / খোঁজা' }, { en: 'making / causing', bn: 'করানো / ঘটানো' }, { en: 'negation', bn: 'নেতিবাচকতা' }], answer: 1,
      explain: { en: 'Form II typically makes a verb causative: "know" → "make known / teach".', bn: 'দ্বিতীয় রূপ সাধারণত ক্রিয়াকে কার্যকারক করে: "জানা" → "জানানো / শেখানো"।' },
    },
  },

  /* ===================== UNIT 4 — SENTENCES & PARTICLES ===================== */
  {
    id: 'sentence-types', unit: 'sentences', icon: '🧱',
    title: { en: 'Nominal vs verbal sentences', bn: 'নামবাচক বনাম ক্রিয়াবাচক বাক্য' },
    concept: {
      en: 'Arabic has two sentence types. A <b>nominal sentence</b> (jumla ismiyya) starts with a noun and often has no verb — "X is Y": ٱللَّهُ أَحَدٌ = "Allah is One". A <b>verbal sentence</b> (jumla fiʿliyya) starts with a verb: ٱهْدِنَا ٱلصِّرَٰطَ = "Guide us to the path".',
      bn: 'আরবিতে দুই ধরনের বাক্য। <b>নামবাচক বাক্য</b> (জুমলা ইসমিয়া) বিশেষ্য দিয়ে শুরু হয় ও প্রায়ই ক্রিয়াহীন — "X হলো Y": ٱللَّهُ أَحَدٌ = "আল্লাহ একক"। <b>ক্রিয়াবাচক বাক্য</b> (জুমলা ফি‘লিয়া) ক্রিয়া দিয়ে শুরু: ٱهْدِنَا ٱلصِّرَٰطَ = "আমাদের পথ দেখাও"।',
    },
    examples: [
      { ref: '112:1', trans: { en: 'He is Allah, One. — a nominal sentence (no verb).', bn: 'তিনি আল্লাহ, একক। — নামবাচক বাক্য (ক্রিয়াহীন)।' },
        note: { en: 'هُوَ ٱللَّهُ أَحَدٌ has no verb — it links nouns: "He (is) Allah, One".', bn: 'هُوَ ٱللَّهُ أَحَدٌ-এ ক্রিয়া নেই — এটি বিশেষ্য জোড়ে: "তিনি (হলেন) আল্লাহ, একক"।' },
        words: [
          { ar: 'قُلْ', en: 'Say', bn: 'বলো' },
          { ar: 'هُوَ', en: 'He (is)', bn: 'তিনি', hl: true },
          { ar: 'ٱللَّهُ', en: 'Allah', bn: 'আল্লাহ', hl: true },
          { ar: 'أَحَدٌ', en: 'One', bn: 'একক', hl: true },
        ] },
      { ref: '1:6', trans: { en: 'Guide us to the straight path. — a verbal sentence.', bn: 'আমাদের সরল পথ দেখাও। — ক্রিয়াবাচক বাক্য।' },
        note: { en: 'The sentence begins with the verb ٱهْدِنَا, so it is verbal.', bn: 'বাক্যটি ٱهْدِنَا ক্রিয়া দিয়ে শুরু, তাই এটি ক্রিয়াবাচক।' },
        words: [
          { ar: 'ٱهْدِنَا', en: 'Guide us', bn: 'আমাদের পথ দেখাও', hl: true },
          { ar: 'ٱلصِّرَٰطَ', en: 'the path', bn: 'পথ' },
          { ar: 'ٱلْمُسْتَقِيمَ', en: 'the straight', bn: 'সরল' },
        ] },
    ],
    practice: {
      q: { en: 'A sentence that begins with a verb is called…', bn: 'ক্রিয়া দিয়ে শুরু হওয়া বাক্যকে বলে…' },
      options: [{ en: 'nominal (ismiyya)', bn: 'নামবাচক (ইসমিয়া)' }, { en: 'verbal (fiʿliyya)', bn: 'ক্রিয়াবাচক (ফি‘লিয়া)' }], answer: 1,
      explain: { en: 'A verbal sentence (jumla fiʿliyya) starts with a verb; a nominal one starts with a noun.', bn: 'ক্রিয়াবাচক বাক্য (জুমলা ফি‘লিয়া) ক্রিয়া দিয়ে শুরু; নামবাচক বিশেষ্য দিয়ে।' },
    },
  },
  {
    id: 'relative-pronouns', unit: 'sentences', icon: '🪢',
    title: { en: 'Relative pronouns (ٱلَّذِي، ٱلَّذِينَ)', bn: 'সম্বন্ধবাচক সর্বনাম (ٱلَّذِي، ٱلَّذِينَ)' },
    concept: {
      en: 'Relative pronouns mean "who / which / that" and join a describing clause to a noun. ٱلَّذِي = "who" (masculine singular), ٱلَّتِي = "who" (feminine singular), ٱلَّذِينَ = "those who" (masculine plural). ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ = "those upon whom You bestowed favour".',
      bn: 'সম্বন্ধবাচক সর্বনাম মানে "যে / যা / যাদের" এবং বর্ণনা-বাক্যকে বিশেষ্যের সাথে জোড়ে। ٱلَّذِي = "যে" (পুং. একবচন), ٱلَّتِي = "যে" (স্ত্রী. একবচন), ٱلَّذِينَ = "যারা" (পুং. বহুবচন)। ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ = "যাদের প্রতি তুমি অনুগ্রহ করেছ"।',
    },
    examples: [
      { ref: '1:7', trans: { en: 'the path of those whom You have favoured…', bn: 'তাদের পথ, যাদের প্রতি তুমি অনুগ্রহ করেছ…' },
        note: { en: 'ٱلَّذِينَ ("those who") joins the clause أَنْعَمْتَ عَلَيْهِمْ to صِرَٰط.', bn: 'ٱلَّذِينَ ("যারা") أَنْعَمْتَ عَلَيْهِمْ বাক্যকে صِرَٰط-এর সাথে জোড়ে।' },
        words: [
          { ar: 'صِرَٰطَ', en: 'the path of', bn: 'পথ' },
          { ar: 'ٱلَّذِينَ', en: 'those whom', bn: 'যাদের', hl: true },
          { ar: 'أَنْعَمْتَ', en: 'You favoured', bn: 'তুমি অনুগ্রহ করেছ' },
          { ar: 'عَلَيْهِمْ', en: 'upon them', bn: 'তাদের প্রতি' },
        ] },
    ],
    practice: {
      q: { en: 'ٱلَّذِينَ is used for…', bn: 'ٱلَّذِينَ ব্যবহৃত হয়…' },
      options: [{ en: 'one man', bn: 'একজন পুরুষ' }, { en: 'one woman', bn: 'একজন নারী' }, { en: 'a plural group (masc.)', bn: 'বহুবচন দল (পুং.)' }], answer: 2,
      explain: { en: 'ٱلَّذِينَ = "those who" (masculine plural). ٱلَّذِي is the singular "who".', bn: 'ٱلَّذِينَ = "যারা" (পুং. বহুবচন)। ٱلَّذِي একবচন "যে"।' },
    },
  },
  {
    id: 'negation', unit: 'sentences', icon: '🚫',
    title: { en: 'Negation particles (لَا، لَمْ، لَنْ، مَا)', bn: 'নেতিবাচক অব্যয় (لَا، لَمْ، لَنْ، مَا)' },
    concept: {
      en: 'Different particles negate different things. <b>لَا</b> negates the present or a category ("there is no…"): لَا رَيْبَ = "no doubt". <b>لَمْ</b> + present verb negates the PAST ("did not"): لَمْ يَلِدْ = "He did not beget". <b>لَنْ</b> negates the future ("will never"), and <b>مَا</b> negates a past verb or noun sentence.',
      bn: 'ভিন্ন অব্যয় ভিন্ন জিনিস নেতিবাচক করে। <b>لَا</b> বর্তমান বা শ্রেণি নাকচ করে ("কোনো … নেই"): لَا رَيْبَ = "কোনো সন্দেহ নেই"। <b>لَمْ</b> + বর্তমান ক্রিয়া অতীতকে নাকচ করে ("করেনি"): لَمْ يَلِدْ = "তিনি জন্ম দেননি"। <b>لَنْ</b> ভবিষ্যৎ নাকচ করে ("কখনো করবে না"), <b>مَا</b> অতীত ক্রিয়া বা নাম-বাক্য নাকচ করে।',
    },
    examples: [
      { ref: '2:2', trans: { en: '…there is no doubt in it…', bn: '…এতে কোনো সন্দেহ নেই…' },
        note: { en: 'لَا denies the very existence of doubt: "no doubt".', bn: 'لَا সন্দেহের অস্তিত্বই নাকচ করে: "কোনো সন্দেহ নেই"।' },
        words: [
          { ar: 'لَا', en: 'no', bn: 'নেই', hl: true },
          { ar: 'رَيْبَ', en: 'doubt', bn: 'সন্দেহ' },
          { ar: 'فِيهِ', en: 'in it', bn: 'এতে' },
        ] },
      { ref: '112:3', trans: { en: 'He neither begets nor is born.', bn: 'তিনি জন্ম দেননি এবং জন্মগ্রহণ করেননি।' },
        note: { en: 'لَمْ before the present verb يَلِدْ turns it into a PAST negation: "did not beget".', bn: 'বর্তমান ক্রিয়া يَلِدْ-এর আগে لَمْ একে অতীত নেতিবাচক করে: "জন্ম দেননি"।' },
        words: [
          { ar: 'لَمْ', en: 'not (did)', bn: 'নি', hl: true },
          { ar: 'يَلِدْ', en: 'He beget', bn: 'তিনি জন্ম দেন' },
          { ar: 'وَلَمْ', en: 'and not', bn: 'এবং নি' },
          { ar: 'يُولَدْ', en: 'He is born', bn: 'তিনি জন্মগ্রহণ করেন' },
        ] },
    ],
    practice: {
      q: { en: 'To negate a verb in the PAST ("did not…"), the Quran often uses لَمْ with which tense?', bn: 'অতীত নাকচ করতে ("করেনি…"), কুরআন প্রায়ই لَمْ ব্যবহার করে কোন কালের সাথে?' },
      options: [{ en: 'the past verb', bn: 'অতীত ক্রিয়া' }, { en: 'the present verb', bn: 'বর্তমান ক্রিয়া' }, { en: 'a noun', bn: 'বিশেষ্য' }], answer: 1,
      explain: { en: 'لَمْ is followed by the present-tense (muḍāriʿ) verb but gives a PAST meaning: لَمْ يَلِدْ.', bn: 'لَمْ-এর পরে বর্তমান (মুদারি‘) ক্রিয়া আসে কিন্তু অর্থ হয় অতীত: لَمْ يَلِدْ।' },
    },
  },
  {
    id: 'dual-plural', unit: 'nouns', icon: '👥',
    title: { en: 'The dual & sound plurals', bn: 'দ্বিবচন ও সহজ বহুবচন' },
    concept: {
      en: 'Arabic counts in three: singular, <b>dual</b> (exactly two) and <b>plural</b> (three+). The dual adds ‑ānِ / ‑ayn and the dual pronoun is ‑هُمَا ("them two"). A masculine <b>sound plural</b> adds ‑ūna (rafʿ) or ‑īna (naṣb/jarr): ٱلْمُفْلِحُونَ ("the successful"), ٱلْعَٰلَمِينَ ("the worlds").',
      bn: 'আরবি তিনভাবে গণনা করে: একবচন, <b>দ্বিবচন</b> (ঠিক দুই) ও <b>বহুবচন</b> (তিন+)। দ্বিবচনে ‑ānِ / ‑ayn যোগ হয় ও দ্বিবচন সর্বনাম ‑هُمَا ("তারা দুজন")। পুংলিঙ্গ <b>সহজ বহুবচন</b> ‑ūna (রফ‘) বা ‑īna (নসব/জর) যোগ করে: ٱلْمُفْلِحُونَ ("সফলকাম"), ٱلْعَٰلَمِينَ ("জগতসমূহ")।',
    },
    examples: [
      { ref: '1:2', trans: { en: '…Lord of the worlds. — masculine sound plural (‑īn).', bn: '…জগতসমূহের পালনকর্তা। — পুংলিঙ্গ সহজ বহুবচন (‑īn)।' },
        note: { en: 'ٱلْعَٰلَمِينَ = "the worlds"; the ‑īna ending is a masculine sound plural (genitive here).', bn: 'ٱلْعَٰلَمِينَ = "জগতসমূহ"; ‑īna শেষ পুংলিঙ্গ সহজ বহুবচন (এখানে জর)।' },
        words: [
          { ar: 'رَبِّ', en: 'Lord of', bn: 'পালনকর্তা' },
          { ar: 'ٱلْعَٰلَمِينَ', en: 'the worlds', bn: 'জগতসমূহের', hl: true },
        ] },
      { ref: '2:5', trans: { en: '…and it is they who are the successful. — sound plural (‑ūn).', bn: '…আর তারাই সফলকাম। — সহজ বহুবচন (‑ūn)।' },
        note: { en: 'ٱلْمُفْلِحُونَ = "the successful"; the ‑ūna ending is the nominative (rafʿ) sound plural.', bn: 'ٱلْمُفْلِحُونَ = "সফলকাম"; ‑ūna শেষ রফ‘ সহজ বহুবচন।' },
        words: [
          { ar: 'هُمُ', en: 'they (are)', bn: 'তারা' },
          { ar: 'ٱلْمُفْلِحُونَ', en: 'the successful', bn: 'সফলকাম', hl: true },
        ] },
    ],
    practice: {
      q: { en: 'The ‑ūna ending on ٱلْمُفْلِحُونَ marks a…', bn: 'ٱلْمُفْلِحُونَ-এর ‑ūna শেষ কী বোঝায়…' },
      options: [{ en: 'dual (two)', bn: 'দ্বিবচন (দুই)' }, { en: 'masculine sound plural', bn: 'পুংলিঙ্গ সহজ বহুবচন' }, { en: 'feminine singular', bn: 'স্ত্রীলিঙ্গ একবচন' }], answer: 1,
      explain: { en: '‑ūna (nominative) / ‑īna (accusative-genitive) is the masculine sound plural ending.', bn: '‑ūna (রফ‘) / ‑īna (নসব-জর) পুংলিঙ্গ সহজ বহুবচনের শেষ।' },
    },
  },
  {
    id: 'broken-plurals', unit: 'nouns', icon: '🧩',
    title: { en: 'Broken plurals (jamʿ at-taksīr)', bn: 'ভাঙা বহুবচন (জম‘ আত-তাকসীর)' },
    concept: {
      en: 'Not every plural just adds an ending. Many nouns form a <b>broken plural</b> (jamʿ at-taksīr) by re-shaping the word itself — like English "man → men". قَلْب ("heart") becomes قُلُوب ("hearts"). Because the pattern changes, each broken plural is learned with its word.',
      bn: 'সব বহুবচন কেবল একটি প্রত্যয় যোগ করে না। অনেক বিশেষ্য শব্দের ভেতরের গঠন বদলে <b>ভাঙা বহুবচন</b> (জম‘ আত-তাকসীর) গঠন করে — যেমন ইংরেজি "man → men"। قَلْب ("হৃদয়") হয় قُلُوب ("হৃদয়সমূহ")। প্যাটার্ন বদলায় বলে প্রতিটি ভাঙা বহুবচন শব্দসহ শিখতে হয়।',
    },
    examples: [
      { ref: '2:7', trans: { en: 'Allah has set a seal upon their hearts…', bn: 'আল্লাহ তাদের হৃদয়ে মোহর দিয়েছেন…' },
        note: { en: 'قُلُوب ("hearts") is the broken plural of قَلْب ("heart").', bn: 'قُلُوب ("হৃদয়সমূহ") হলো قَلْب ("হৃদয়")-এর ভাঙা বহুবচন।' },
        words: [
          { ar: 'خَتَمَ', en: 'has sealed', bn: 'মোহর দিয়েছেন' },
          { ar: 'ٱللَّهُ', en: 'Allah', bn: 'আল্লাহ' },
          { ar: 'عَلَىٰ', en: 'upon', bn: 'উপর' },
          { ar: 'قُلُوبِهِمْ', en: 'their hearts', bn: 'তাদের হৃদয়', hl: true },
        ] },
    ],
    practice: {
      q: { en: 'قُلُوب ("hearts") from قَلْب, made by reshaping the word, is which kind of plural?', bn: 'قَلْب থেকে গঠিত قُلُوب ("হৃদয়সমূহ") কোন ধরনের বহুবচন?' },
      options: [{ en: 'sound plural', bn: 'সহজ বহুবচন' }, { en: 'broken plural', bn: 'ভাঙা বহুবচন' }, { en: 'dual', bn: 'দ্বিবচন' }], answer: 1,
      explain: { en: 'Reshaping the internal pattern of the word makes a broken plural (jamʿ at-taksīr).', bn: 'শব্দের ভেতরের গঠন বদলানো ভাঙা বহুবচন (জম‘ আত-তাকসীর) তৈরি করে।' },
    },
  },
  {
    id: 'numbers', unit: 'nouns', icon: '🔢',
    title: { en: 'Numbers & counting (basics)', bn: 'সংখ্যা ও গণনা (মৌলিক)' },
    concept: {
      en: 'Counting in Arabic starts with <b>وَاحِد / أَحَد</b> ("one"); "two" is shown by the dual ending (‑ān / ‑ayn), and larger numbers have their own words, e.g. ٱثْنَا عَشَرَ = "twelve". Numbers interact with the counted noun in special ways, but the foundation is وَاحِد for "one".',
      bn: 'আরবিতে গণনা শুরু হয় <b>وَاحِد / أَحَد</b> ("এক") দিয়ে; "দুই" বোঝানো হয় দ্বিবচন প্রত্যয়ে (‑ān / ‑ayn), আর বড় সংখ্যার আলাদা শব্দ আছে, যেমন ٱثْنَا عَشَرَ = "বারো"। সংখ্যা গণিত বিশেষ্যের সাথে বিশেষভাবে মেলে, তবে ভিত্তি হলো "এক"-এর জন্য وَاحِد।',
    },
    examples: [
      { ref: '2:163', trans: { en: 'And your God is One God…', bn: 'আর তোমাদের ইলাহ এক ইলাহ…' },
        note: { en: 'وَٰحِد = "one", agreeing with the masculine noun إِلَٰه.', bn: 'وَٰحِد = "এক", পুংলিঙ্গ إِلَٰه-এর সাথে সঙ্গতিপূর্ণ।' },
        words: [
          { ar: 'وَإِلَٰهُكُمْ', en: 'And your God', bn: 'আর তোমাদের ইলাহ' },
          { ar: 'إِلَٰهٌ', en: '(is) a God', bn: 'ইলাহ' },
          { ar: 'وَٰحِدٌ', en: 'One', bn: 'এক', hl: true },
        ] },
      { ref: '9:36', trans: { en: '…twelve months…', bn: '…বারো মাস…' },
        note: { en: 'ٱثْنَا عَشَرَ = "twelve" (literally "two-ten") counting شَهْر ("month").', bn: 'ٱثْنَا عَشَرَ = "বারো" (আক্ষরিক "দুই-দশ"), شَهْر ("মাস") গণনা করে।' },
        words: [
          { ar: 'ٱثْنَا', en: 'two', bn: 'দুই', hl: true },
          { ar: 'عَشَرَ', en: '(and) ten', bn: 'দশ', hl: true },
          { ar: 'شَهْرًا', en: 'months', bn: 'মাস' },
        ] },
    ],
    practice: {
      q: { en: 'The word وَٰحِد means…', bn: 'وَٰحِد শব্দের অর্থ…' },
      options: [{ en: 'one', bn: 'এক' }, { en: 'two', bn: 'দুই' }, { en: 'ten', bn: 'দশ' }], answer: 0,
      explain: { en: 'وَٰحِد (like أَحَد) means "one".', bn: 'وَٰحِد (أَحَد-এর মতো) মানে "এক"।' },
    },
  },
  {
    id: 'nasb-jazm', unit: 'verbs', icon: '🔧',
    title: { en: 'Particles that change the present verb (naṣb & jazm)', bn: 'বর্তমান ক্রিয়া বদলানো অব্যয় (নসব ও জযম)' },
    concept: {
      en: 'A present verb (muḍāriʿ) normally ends in ‑u. Certain particles change that. <b>لَنْ</b> and <b>أَنْ</b> put it into naṣb (‑a): لَنْ = "will never" (future). <b>لَمْ</b> and prohibiting <b>لا</b> put it into jazm (sukūn): لَمْ negates the past ("did not"), and لا forbids ("do not!").',
      bn: 'বর্তমান ক্রিয়া (মুদারি‘) সাধারণত ‑u-তে শেষ হয়। কিছু অব্যয় তা বদলায়। <b>لَنْ</b> ও <b>أَنْ</b> একে নসব (‑a) করে: لَنْ = "কখনো করবে না" (ভবিষ্যৎ)। <b>لَمْ</b> ও নিষেধের <b>لا</b> একে জযম (সুকূন) করে: لَمْ অতীত নাকচ করে ("করেনি"), আর لا নিষেধ করে ("করো না!")।',
    },
    examples: [
      { ref: '2:80', trans: { en: 'The Fire will never touch us…', bn: 'আগুন আমাদের কখনো স্পর্শ করবে না…' },
        note: { en: 'لَنْ ("never") puts تَمَسَّ into naṣb and points to the future.', bn: 'لَنْ ("কখনো না") تَمَسَّ-কে নসব করে ও ভবিষ্যৎ বোঝায়।' },
        words: [
          { ar: 'لَن', en: 'never', bn: 'কখনো না', hl: true },
          { ar: 'تَمَسَّنَا', en: 'will touch us', bn: 'আমাদের স্পর্শ করবে' },
          { ar: 'ٱلنَّارُ', en: 'the Fire', bn: 'আগুন' },
        ] },
      { ref: '112:3', trans: { en: 'He did not beget…', bn: 'তিনি জন্ম দেননি…' },
        note: { en: 'لَمْ + present يَلِدْ (in jazm) gives a PAST negation.', bn: 'لَمْ + বর্তমান يَلِدْ (জযমে) অতীত নেতিবাচক অর্থ দেয়।' },
        words: [
          { ar: 'لَمْ', en: 'not (did)', bn: 'নি', hl: true },
          { ar: 'يَلِدْ', en: 'He beget', bn: 'তিনি জন্ম দেন' },
        ] },
      { ref: '93:9', trans: { en: 'As for the orphan, do not oppress (him).', bn: 'সুতরাং এতিমকে দমন করো না।' },
        note: { en: 'Prohibiting لا puts تَقْهَرْ into jazm: "do not oppress".', bn: 'নিষেধের لا تَقْهَرْ-কে জযম করে: "দমন করো না"।' },
        words: [
          { ar: 'ٱلْيَتِيمَ', en: 'the orphan', bn: 'এতিমকে' },
          { ar: 'فَلَا', en: 'so do not', bn: 'সুতরাং না' },
          { ar: 'تَقْهَرْ', en: 'oppress', bn: 'দমন করো', hl: true },
        ] },
    ],
    practice: {
      q: { en: 'لَنْ before a present verb (as in لَن تَمَسَّنَا) means…', bn: 'বর্তমান ক্রিয়ার আগে لَنْ (যেমন لَن تَمَسَّنَا) মানে…' },
      options: [{ en: 'did not (past)', bn: 'করেনি (অতীত)' }, { en: 'will never (future)', bn: 'কখনো করবে না (ভবিষ্যৎ)' }, { en: 'a command', bn: 'আদেশ' }], answer: 1,
      explain: { en: 'لَنْ negates the future emphatically: "will never…", and makes the verb naṣb.', bn: 'لَنْ জোরালোভাবে ভবিষ্যৎ নাকচ করে: "কখনো করবে না", এবং ক্রিয়াকে নসব করে।' },
    },
  },
  {
    id: 'participle', unit: 'forms', icon: '🎭',
    title: { en: 'Active & passive participle (ism al-fāʿil / ism al-mafʿūl)', bn: 'কর্তৃবাচক ও কর্মবাচক বিশেষণ (ইসমুল ফা‘িল / ইসমুল মাফ‘ূল)' },
    concept: {
      en: 'From a verb, Arabic builds two describing nouns. The <b>active participle</b> (ism al-fāʿil, pattern فَاعِل) names the DOER: مَالِك ("owner"). The <b>passive participle</b> (ism al-mafʿūl, pattern مَفْعُول) names the one the action falls upon: مَغْضُوب ("one earned anger upon").',
      bn: 'ক্রিয়া থেকে আরবি দুটি বর্ণনাকারী বিশেষ্য গঠন করে। <b>কর্তৃবাচক বিশেষণ</b> (ইসমুল ফা‘িল, ছাঁচ فَاعِل) কর্তাকে বোঝায়: مَالِك ("মালিক")। <b>কর্মবাচক বিশেষণ</b> (ইসমুল মাফ‘ূল, ছাঁচ مَفْعُول) যার উপর কাজ পড়ে তাকে বোঝায়: مَغْضُوب ("যার উপর ক্রোধ হয়েছে")।',
    },
    examples: [
      { ref: '1:4', trans: { en: 'Master of the Day of Judgement.', bn: 'বিচার দিনের মালিক।' },
        note: { en: 'مَٰلِك (pattern فَاعِل) is an active participle — "the one who owns".', bn: 'مَٰلِك (ছাঁচ فَاعِل) কর্তৃবাচক বিশেষণ — "যিনি মালিক"।' },
        words: [
          { ar: 'مَٰلِكِ', en: 'Master of', bn: 'মালিক', hl: true },
          { ar: 'يَوْمِ', en: 'the Day of', bn: 'দিনের' },
          { ar: 'ٱلدِّينِ', en: 'Judgement', bn: 'বিচার' },
        ] },
      { ref: '1:7', trans: { en: '…not of those who earned anger…', bn: '…যাদের উপর ক্রোধ হয়েছে তাদের নয়…' },
        note: { en: 'مَغْضُوب (pattern مَفْعُول) is a passive participle — the receiver of the action.', bn: 'مَغْضُوب (ছাঁচ مَفْعُول) কর্মবাচক বিশেষণ — কাজের গ্রহীতা।' },
        words: [
          { ar: 'غَيْرِ', en: 'not (of)', bn: 'নয়' },
          { ar: 'ٱلْمَغْضُوبِ', en: 'those angered upon', bn: 'যাদের উপর ক্রোধ', hl: true },
          { ar: 'عَلَيْهِمْ', en: 'upon them', bn: 'তাদের উপর' },
        ] },
    ],
    practice: {
      q: { en: 'مَغْضُوب ("the one angered upon") names the RECEIVER of the action. It is an…', bn: 'مَغْضُوب ("যার উপর ক্রোধ") কাজের গ্রহীতাকে বোঝায়। এটি একটি…' },
      options: [{ en: 'active participle (fāʿil)', bn: 'কর্তৃবাচক (ফা‘িল)' }, { en: 'passive participle (mafʿūl)', bn: 'কর্মবাচক (মাফ‘ূল)' }, { en: 'verb (fiʿl)', bn: 'ক্রিয়া (ফি‘ল)' }], answer: 1,
      explain: { en: 'The مَفْعُول pattern names the one an action is done TO — a passive participle.', bn: 'مَفْعُول ছাঁচ যার উপর কাজ করা হয় তাকে বোঝায় — কর্মবাচক বিশেষণ।' },
    },
  },
  {
    id: 'masdar', unit: 'forms', icon: '📜',
    title: { en: 'The verbal noun (maṣdar)', bn: 'ক্রিয়াবাচক বিশেষ্য (মাসদার)' },
    concept: {
      en: 'The <b>maṣdar</b> is the noun of an action — "the doing" itself, much like English "-ing" or "-tion": حَمْد ("praising / praise"), عِلْم ("knowing / knowledge"). It names the action with no doer and no time attached.',
      bn: '<b>মাসদার</b> হলো কাজের বিশেষ্য — "করা"টাই, অনেকটা ইংরেজি "-ing/-tion"-এর মতো: حَمْد ("প্রশংসা করা / প্রশংসা"), عِلْم ("জানা / জ্ঞান")। এটি কর্তা বা সময় ছাড়াই কাজকে নাম দেয়।',
    },
    examples: [
      { ref: '1:2', trans: { en: 'All praise is for Allah…', bn: 'সকল প্রশংসা আল্লাহর…' },
        note: { en: 'ٱلْحَمْد ("praise") is a maṣdar — the action of praising as a noun.', bn: 'ٱلْحَمْد ("প্রশংসা") একটি মাসদার — প্রশংসা করার কাজ বিশেষ্য রূপে।' },
        words: [
          { ar: 'ٱلْحَمْدُ', en: 'the praise', bn: 'সকল প্রশংসা', hl: true },
          { ar: 'لِلَّهِ', en: 'for Allah', bn: 'আল্লাহর জন্য' },
        ] },
      { ref: '103:2', trans: { en: 'Indeed mankind is in loss.', bn: 'নিশ্চয় মানুষ ক্ষতির মধ্যে।' },
        note: { en: 'خُسْر ("loss") is a maṣdar — the act/state of losing.', bn: 'خُسْر ("ক্ষতি") একটি মাসদার — হারানোর কাজ/অবস্থা।' },
        words: [
          { ar: 'إِنَّ', en: 'Indeed', bn: 'নিশ্চয়' },
          { ar: 'ٱلْإِنسَٰنَ', en: 'mankind', bn: 'মানুষ' },
          { ar: 'لَفِى', en: 'is surely in', bn: 'নিশ্চিতভাবে মধ্যে' },
          { ar: 'خُسْرٍ', en: 'loss', bn: 'ক্ষতি', hl: true },
        ] },
    ],
    practice: {
      q: { en: 'ٱلْحَمْد ("praise") names the action itself, with no doer. Such a verbal noun is a…', bn: 'ٱلْحَمْد ("প্রশংসা") কর্তা ছাড়াই কাজকে নাম দেয়। এমন ক্রিয়াবাচক বিশেষ্য হলো…' },
      options: [{ en: 'maṣdar', bn: 'মাসদার' }, { en: 'fāʿil', bn: 'ফা‘িল' }, { en: 'fiʿl', bn: 'ফি‘ল' }], answer: 0,
      explain: { en: 'The noun that names an action itself is the maṣdar (verbal noun).', bn: 'যে বিশেষ্য কাজটিকেই নাম দেয় তা হলো মাসদার (ক্রিয়াবাচক বিশেষ্য)।' },
    },
  },
  {
    id: 'tafdil', unit: 'forms', icon: '🏆',
    title: { en: 'Comparative & superlative (ism at-tafḍīl)', bn: 'তুলনা ও শ্রেষ্ঠত্ব (ইসমুত-তাফদীল)' },
    concept: {
      en: 'To say "more" or "most", Arabic uses the pattern <b>أَفْعَل</b> (ism at-tafḍīl): أَكْبَر ("greater / greatest"), أَحْسَن ("better / best"), أَعْلَم ("more knowing"). The single form serves for both "more" and "most" depending on context.',
      bn: '"অধিক" বা "সর্বাধিক" বলতে আরবি <b>أَفْعَل</b> ছাঁচ (ইসমুত-তাফদীল) ব্যবহার করে: أَكْبَر ("বৃহত্তর / বৃহত্তম"), أَحْسَن ("উত্তম / উত্তমতম"), أَعْلَم ("অধিক জ্ঞাত")। প্রসঙ্গভেদে একই রূপ "অধিক" ও "সর্বাধিক" দুটোই বোঝায়।',
    },
    examples: [
      { ref: '95:4', trans: { en: 'We created man in the best form.', bn: 'আমরা মানুষকে সর্বোত্তম গঠনে সৃষ্টি করেছি।' },
        note: { en: 'أَحْسَن ("best", pattern أَفْعَل) is the superlative of حَسَن ("good").', bn: 'أَحْسَن ("সর্বোত্তম", ছাঁচ أَفْعَل) হলো حَسَن ("ভালো")-এর শ্রেষ্ঠত্ববাচক রূপ।' },
        words: [
          { ar: 'خَلَقْنَا', en: 'We created', bn: 'আমরা সৃষ্টি করেছি' },
          { ar: 'ٱلْإِنسَٰنَ', en: 'man', bn: 'মানুষকে' },
          { ar: 'فِىٓ', en: 'in', bn: 'মধ্যে' },
          { ar: 'أَحْسَنِ', en: 'the best', bn: 'সর্বোত্তম', hl: true },
          { ar: 'تَقْوِيمٍ', en: 'form', bn: 'গঠন' },
        ] },
    ],
    practice: {
      q: { en: 'The pattern أَفْعَل, as in أَحْسَن ("best"), expresses…', bn: 'أَفْعَل ছাঁচ, যেমন أَحْسَن ("সর্বোত্তম"), প্রকাশ করে…' },
      options: [{ en: 'the doer', bn: 'কর্তা' }, { en: 'comparison ("more / most")', bn: 'তুলনা ("অধিক / সর্বাধিক")' }, { en: 'negation', bn: 'নেতিবাচকতা' }], answer: 1,
      explain: { en: 'أَفْعَل is the ism at-tafḍīl — the comparative/superlative pattern.', bn: 'أَفْعَل হলো ইসমুত-তাফদীল — তুলনা/শ্রেষ্ঠত্বের ছাঁচ।' },
    },
  },
  {
    id: 'mubtada-khabar', unit: 'sentences', icon: '🧩',
    title: { en: 'Subject & predicate (mubtadaʾ & khabar)', bn: 'উদ্দেশ্য ও বিধেয় (মুবতাদা ও খবর)' },
    concept: {
      en: 'A nominal sentence has two pillars: the <b>mubtadaʾ</b> (the subject we speak about) and the <b>khabar</b> (the information about it). Both are usually in the rafʿ (‑u) case, and there is no separate word for "is" — it is understood. ٱللَّهُ ٱلصَّمَدُ = "Allah (mubtadaʾ) is the Eternal Refuge (khabar)".',
      bn: 'নাম-বাক্যের দুটি স্তম্ভ: <b>মুবতাদা</b> (যাকে নিয়ে বলা হয়, উদ্দেশ্য) ও <b>খবর</b> (তার সম্পর্কে তথ্য, বিধেয়)। দুটোই সাধারণত রফ‘ (‑u) অবস্থায় থাকে, এবং "is/হলো" এর আলাদা শব্দ নেই — তা উহ্য। ٱللَّهُ ٱلصَّمَدُ = "আল্লাহ (মুবতাদা) অমুখাপেক্ষী (খবর)"।',
    },
    examples: [
      { ref: '112:2', trans: { en: 'Allah is the Eternal Refuge.', bn: 'আল্লাহ অমুখাপেক্ষী।' },
        note: { en: 'ٱللَّهُ is the mubtadaʾ (subject); ٱلصَّمَدُ is the khabar (predicate). No "is" is written.', bn: 'ٱللَّهُ মুবতাদা (উদ্দেশ্য); ٱلصَّمَدُ খবর (বিধেয়)। কোনো "is" লেখা হয় না।' },
        words: [
          { ar: 'ٱللَّهُ', en: 'Allah (subject)', bn: 'আল্লাহ (উদ্দেশ্য)', hl: true },
          { ar: 'ٱلصَّمَدُ', en: 'the Eternal Refuge (predicate)', bn: 'অমুখাপেক্ষী (বিধেয়)', hl: true },
        ] },
      { ref: '2:163', trans: { en: 'And your God is One God…', bn: 'আর তোমাদের ইলাহ এক ইলাহ…' },
        note: { en: 'إِلَٰهُكُمْ is the mubtadaʾ; إِلَٰهٌ (وَٰحِدٌ) is the khabar.', bn: 'إِلَٰهُكُمْ মুবতাদা; إِلَٰهٌ (وَٰحِدٌ) খবর।' },
        words: [
          { ar: 'وَإِلَٰهُكُمْ', en: 'And your God (subject)', bn: 'আর তোমাদের ইলাহ (উদ্দেশ্য)', hl: true },
          { ar: 'إِلَٰهٌ', en: '(is) a God (predicate)', bn: 'ইলাহ (বিধেয়)', hl: true },
          { ar: 'وَٰحِدٌ', en: 'One', bn: 'এক' },
        ] },
    ],
    practice: {
      q: { en: 'In ٱللَّهُ ٱلصَّمَدُ, which word is the mubtadaʾ (the subject we speak about)?', bn: 'ٱللَّهُ ٱلصَّمَدُ-তে কোন শব্দটি মুবতাদা (উদ্দেশ্য)?' },
      options: ['ٱللَّهُ', 'ٱلصَّمَدُ'], answer: 0,
      explain: { en: 'ٱللَّهُ is the mubtadaʾ; ٱلصَّمَدُ is the khabar telling us about it.', bn: 'ٱللَّهُ মুবতাদা; ٱلصَّمَدُ খবর, যা তার সম্পর্কে জানায়।' },
    },
  },
  {
    id: 'objects', unit: 'sentences', icon: '🎯',
    title: { en: 'The object (al-mafʿūl bihi)', bn: 'কর্ম (আল-মাফ‘ূল বিহি)' },
    concept: {
      en: 'In a verbal sentence the <b>mafʿūl bihi</b> is the thing the action falls upon — the direct object — and it takes the naṣb (‑a) case. عَلَّمَ ٱلْقُرْءَانَ = "He taught THE QURAN"; ٱلْقُرْءَانَ is the manṣūb object.',
      bn: 'ক্রিয়া-বাক্যে <b>মাফ‘ূল বিহি</b> হলো যার উপর কাজ পড়ে — সরাসরি কর্ম — এবং তা নসব (‑a) অবস্থায় থাকে। عَلَّمَ ٱلْقُرْءَانَ = "তিনি কুরআন শিক্ষা দিয়েছেন"; ٱلْقُرْءَانَ মানসূব কর্ম।',
    },
    examples: [
      { ref: '55:2', trans: { en: 'He taught the Quran.', bn: 'তিনি কুরআন শিক্ষা দিয়েছেন।' },
        note: { en: 'ٱلْقُرْءَانَ ends in ‑a (naṣb) because it is the object of عَلَّمَ.', bn: 'ٱلْقُرْءَانَ ‑a (নসব)-তে শেষ কারণ এটি عَلَّمَ-এর কর্ম।' },
        words: [
          { ar: 'عَلَّمَ', en: 'He taught', bn: 'তিনি শিক্ষা দিয়েছেন' },
          { ar: 'ٱلْقُرْءَانَ', en: 'the Quran (object)', bn: 'কুরআন (কর্ম)', hl: true },
        ] },
      { ref: '108:1', trans: { en: 'Indeed, We have given you al-Kawthar.', bn: 'নিশ্চয় আমরা তোমাকে কাউসার দিয়েছি।' },
        note: { en: 'ٱلْكَوْثَرَ is the manṣūb object of أَعْطَيْنَا.', bn: 'ٱلْكَوْثَرَ হলো أَعْطَيْنَا-এর মানসূব কর্ম।' },
        words: [
          { ar: 'أَعْطَيْنَٰكَ', en: 'We gave you', bn: 'আমরা তোমাকে দিয়েছি' },
          { ar: 'ٱلْكَوْثَرَ', en: 'al-Kawthar (object)', bn: 'কাউসার (কর্ম)', hl: true },
        ] },
    ],
    practice: {
      q: { en: 'The direct object (mafʿūl bihi), like ٱلْقُرْءَانَ, is in which case?', bn: 'সরাসরি কর্ম (মাফ‘ূল বিহি), যেমন ٱلْقُرْءَانَ, কোন অবস্থায়?' },
      options: [{ en: 'rafʿ', bn: 'রফ‘' }, { en: 'naṣb (accusative)', bn: 'নসব' }, { en: 'jarr', bn: 'জর' }], answer: 1,
      explain: { en: 'The direct object takes the naṣb (accusative, ‑a) case.', bn: 'সরাসরি কর্ম নসব (‑a) অবস্থা নেয়।' },
    },
  },
  {
    id: 'inna-sisters', unit: 'particles', icon: '❕',
    title: { en: 'إِنَّ and her sisters', bn: 'إِنَّ ও তার বোনেরা' },
    concept: {
      en: '<b>إِنَّ</b> ("indeed / truly") and similar particles (أَنَّ, كَأَنَّ, لَٰكِنَّ, لَعَلَّ) enter a nominal sentence and put the subject into the naṣb (‑a) case, while the predicate stays rafʿ. إِنَّ adds strong emphasis: "truly…".',
      bn: '<b>إِنَّ</b> ("নিশ্চয়/সত্যিই") ও অনুরূপ অব্যয় (أَنَّ, كَأَنَّ, لَٰكِنَّ, لَعَلَّ) নাম-বাক্যে প্রবেশ করে উদ্দেশ্যকে নসব (‑a) করে, আর বিধেয় রফ‘ থাকে। إِنَّ জোরালো তাগিদ যোগ করে: "সত্যিই…"।',
    },
    examples: [
      { ref: '103:2', trans: { en: 'Indeed, mankind is in loss.', bn: 'নিশ্চয় মানুষ ক্ষতির মধ্যে।' },
        note: { en: 'After إِنَّ, the subject ٱلْإِنسَٰنَ takes ‑a (naṣb).', bn: 'إِنَّ-এর পরে উদ্দেশ্য ٱلْإِنسَٰنَ ‑a (নসব) নেয়।' },
        words: [
          { ar: 'إِنَّ', en: 'Indeed', bn: 'নিশ্চয়', hl: true },
          { ar: 'ٱلْإِنسَٰنَ', en: 'mankind (naṣb)', bn: 'মানুষ (নসব)', hl: true },
          { ar: 'لَفِى', en: 'is surely in', bn: 'নিশ্চিতভাবে মধ্যে' },
          { ar: 'خُسْرٍ', en: 'loss', bn: 'ক্ষতি' },
        ] },
      { ref: '108:1', trans: { en: 'Indeed, We have given you al-Kawthar.', bn: 'নিশ্চয় আমরা তোমাকে কাউসার দিয়েছি।' },
        note: { en: 'إِنَّآ = إِنَّ + نَا ("we") — the same emphatic particle with an attached pronoun.', bn: 'إِنَّآ = إِنَّ + نَا ("আমরা") — একই তাগিদ-অব্যয়ে যুক্ত সর্বনাম।' },
        words: [
          { ar: 'إِنَّآ', en: 'Indeed We', bn: 'নিশ্চয় আমরা', hl: true },
          { ar: 'أَعْطَيْنَٰكَ', en: 'have given you', bn: 'তোমাকে দিয়েছি' },
          { ar: 'ٱلْكَوْثَرَ', en: 'al-Kawthar', bn: 'কাউসার' },
        ] },
    ],
    practice: {
      q: { en: 'After إِنَّ, the subject noun (like ٱلْإِنسَٰنَ) changes to which case?', bn: 'إِنَّ-এর পরে উদ্দেশ্য বিশেষ্য (যেমন ٱلْإِنسَٰنَ) কোন অবস্থায় বদলায়?' },
      options: [{ en: 'rafʿ', bn: 'রফ‘' }, { en: 'naṣb (accusative)', bn: 'নসব' }, { en: 'jarr', bn: 'জর' }], answer: 1,
      explain: { en: 'إِنَّ and her sisters make the subject naṣb while the predicate stays rafʿ.', bn: 'إِنَّ ও তার বোনেরা উদ্দেশ্যকে নসব করে, বিধেয় রফ‘ থাকে।' },
    },
  },
  {
    id: 'kana-sisters', unit: 'particles', icon: '🔄',
    title: { en: 'كَانَ and her sisters', bn: 'كَانَ ও তার বোনেরা' },
    concept: {
      en: '<b>كَانَ</b> ("was / is") and her sisters (أَصْبَحَ, صَارَ, لَيْسَ…) enter a nominal sentence: they keep the subject in rafʿ but push the predicate (khabar) into naṣb (‑a). كَانَ … مَرِيضًا = "he was sick" — مَرِيضًا is the manṣūb predicate.',
      bn: '<b>كَانَ</b> ("ছিল / আছে") ও তার বোনেরা (أَصْبَحَ, صَارَ, لَيْسَ…) নাম-বাক্যে প্রবেশ করে: উদ্দেশ্যকে রফ‘ রাখে কিন্তু বিধেয় (খবর)-কে নসব (‑a) করে। كَانَ … مَرِيضًا = "সে অসুস্থ ছিল" — مَرِيضًا মানসূব বিধেয়।',
    },
    examples: [
      { ref: '2:184', trans: { en: 'So whoever among you is sick…', bn: 'সুতরাং তোমাদের মধ্যে যে অসুস্থ…' },
        note: { en: 'كَانَ makes its predicate مَرِيضًا take ‑a (naṣb).', bn: 'كَانَ তার বিধেয় مَرِيضًا-কে ‑a (নসব) করে।' },
        words: [
          { ar: 'فَمَن', en: 'So whoever', bn: 'সুতরাং যে' },
          { ar: 'كَانَ', en: 'is / was', bn: 'ছিল', hl: true },
          { ar: 'مِنكُم', en: 'among you', bn: 'তোমাদের মধ্যে' },
          { ar: 'مَّرِيضًا', en: 'sick (naṣb)', bn: 'অসুস্থ (নসব)', hl: true },
        ] },
      { ref: '112:4', trans: { en: 'And there is none comparable to Him.', bn: 'আর তাঁর সমতুল্য কেউ নেই।' },
        note: { en: 'يَكُن (from كَانَ) makes كُفُوًا ("comparable") naṣb.', bn: 'يَكُن (كَانَ থেকে) كُفُوًا ("সমতুল্য")-কে নসব করে।' },
        words: [
          { ar: 'وَلَمْ', en: 'And not', bn: 'আর নেই' },
          { ar: 'يَكُن', en: 'is', bn: 'হয়' },
          { ar: 'لَّهُۥ', en: 'for Him', bn: 'তাঁর' },
          { ar: 'كُفُوًا', en: 'comparable (naṣb)', bn: 'সমতুল্য (নসব)', hl: true },
          { ar: 'أَحَدٌۢ', en: 'anyone', bn: 'কেউ' },
        ] },
    ],
    practice: {
      q: { en: 'كَانَ puts the PREDICATE (khabar), like مَرِيضًا, into which case?', bn: 'كَانَ বিধেয় (খবর), যেমন مَرِيضًا, কোন অবস্থায় নেয়?' },
      options: [{ en: 'rafʿ', bn: 'রফ‘' }, { en: 'naṣb (accusative)', bn: 'নসব' }, { en: 'jarr', bn: 'জর' }], answer: 1,
      explain: { en: 'كَانَ keeps the subject rafʿ but makes the predicate naṣb.', bn: 'كَانَ উদ্দেশ্য রফ‘ রাখে কিন্তু বিধেয় নসব করে।' },
    },
  },
  {
    id: 'vocative', unit: 'particles', icon: '📣',
    title: { en: 'Calling out — the vocative (yā an-nidāʾ)', bn: 'সম্বোধন — নিদা (يا)' },
    concept: {
      en: 'To address or call someone, Arabic places <b>يَا</b> ("O…") before the name: يَا رَبِّ ("O my Lord"). For a definite noun ("the…") the longer form يَٰأَيُّهَا is used: يَٰأَيُّهَا ٱلَّذِينَ ءَامَنُوا ("O you who believe").',
      bn: 'কাউকে সম্বোধন বা ডাকতে আরবি নামের আগে <b>يَا</b> ("হে…") বসায়: يَا رَبِّ ("হে আমার রব")। নির্দিষ্ট বিশেষ্যের ("the…") জন্য দীর্ঘ রূপ يَٰأَيُّهَا ব্যবহৃত হয়: يَٰأَيُّهَا ٱلَّذِينَ ءَامَنُوا ("হে ঈমানদারগণ")।',
    },
    examples: [
      { ref: '109:1', trans: { en: 'Say, "O disbelievers!"', bn: 'বলো, "হে কাফিরগণ!"' },
        note: { en: 'يَٰٓأَيُّهَا is the vocative "O…", calling ٱلْكَٰفِرُونَ.', bn: 'يَٰٓأَيُّهَا হলো সম্বোধন "হে…", ٱلْكَٰفِرُونَ-কে ডাকছে।' },
        words: [
          { ar: 'قُلْ', en: 'Say', bn: 'বলো' },
          { ar: 'يَٰٓأَيُّهَا', en: 'O', bn: 'হে', hl: true },
          { ar: 'ٱلْكَٰفِرُونَ', en: 'disbelievers', bn: 'কাফিরগণ' },
        ] },
    ],
    practice: {
      q: { en: 'The particle يَا (as in يَٰأَيُّهَا) is used to…', bn: 'يَا অব্যয় (যেমন يَٰأَيُّهَا) ব্যবহৃত হয়…' },
      options: [{ en: 'negate', bn: 'নাকচ করতে' }, { en: 'call / address someone', bn: 'কাউকে ডাকতে/সম্বোধন করতে' }, { en: 'ask a question', bn: 'প্রশ্ন করতে' }], answer: 1,
      explain: { en: 'يَا is the particle of calling (nidāʾ) — "O…!"', bn: 'يَا হলো সম্বোধনের (নিদা) অব্যয় — "হে…!"' },
    },
  },
  {
    id: 'atf', unit: 'particles', icon: '➕',
    title: { en: 'Connectors (ḥurūf al-ʿaṭf: وَ، فَ، ثُمَّ)', bn: 'সংযোজক (হুরুফুল আতফ: وَ، فَ، ثُمَّ)' },
    concept: {
      en: 'Conjunctions join words and clauses. <b>وَ</b> = "and" (simple joining), <b>فَ</b> = "and so / then" (an immediate result or sequence), <b>ثُمَّ</b> = "then" (after a gap). The joined word shares the grammar of the first.',
      bn: 'সংযোজক শব্দ ও বাক্যাংশ জোড়ে। <b>وَ</b> = "এবং" (সাধারণ সংযোগ), <b>فَ</b> = "অতঃপর / তখন" (তাৎক্ষণিক ফল বা ধারাবাহিকতা), <b>ثُمَّ</b> = "তারপর" (বিরতির পরে)। যুক্ত শব্দ প্রথমটির ব্যাকরণ অনুসরণ করে।',
    },
    examples: [
      { ref: '108:2', trans: { en: 'So pray to your Lord and sacrifice.', bn: 'অতএব তোমার রবের উদ্দেশ্যে সালাত পড়ো ও কুরবানি করো।' },
        note: { en: 'فَ ("so") on فَصَلِّ shows result; وَ ("and") on وَٱنْحَرْ joins the second command.', bn: 'فَصَلِّ-এর فَ ("অতএব") ফল দেখায়; وَٱنْحَرْ-এর وَ ("ও") দ্বিতীয় আদেশ জোড়ে।' },
        words: [
          { ar: 'فَصَلِّ', en: 'So pray', bn: 'অতএব সালাত পড়ো', hl: true },
          { ar: 'لِرَبِّكَ', en: 'to your Lord', bn: 'তোমার রবের জন্য' },
          { ar: 'وَٱنْحَرْ', en: 'and sacrifice', bn: 'ও কুরবানি করো', hl: true },
        ] },
      { ref: '95:1', trans: { en: 'By the fig and the olive.', bn: 'শপথ ডুমুর ও জলপাইয়ের।' },
        note: { en: 'وَ ("and") joins ٱلزَّيْتُون to ٱلتِّين — two nouns in the same case.', bn: 'وَ ("ও") ٱلزَّيْتُون-কে ٱلتِّين-এর সাথে জোড়ে — একই অবস্থার দুই বিশেষ্য।' },
        words: [
          { ar: 'وَٱلتِّينِ', en: 'By the fig', bn: 'শপথ ডুমুরের' },
          { ar: 'وَٱلزَّيْتُونِ', en: 'and the olive', bn: 'ও জলপাইয়ের', hl: true },
        ] },
    ],
    practice: {
      q: { en: 'The connector فَ (as in فَصَلِّ) adds the sense of…', bn: 'সংযোজক فَ (যেমন فَصَلِّ) কোন অর্থ যোগ করে…' },
      options: [{ en: 'and so / then (result)', bn: 'অতঃপর / তখন (ফল)' }, { en: 'or', bn: 'অথবা' }, { en: 'not', bn: 'না' }], answer: 0,
      explain: { en: 'فَ links with a sense of immediate result or sequence: "and so…".', bn: 'فَ তাৎক্ষণিক ফল বা ধারাবাহিকতা বোঝায়: "অতঃপর…"।' },
    },
  },
  {
    id: 'oath', unit: 'particles', icon: '🤝',
    title: { en: 'The oath (wāw al-qasam)', bn: 'শপথ (ওয়াও আল-কসম)' },
    concept: {
      en: 'Allah often opens a sūrah with an <b>oath</b> to draw attention, using the <b>wāw of oath</b> ("By…"). The noun after it is in the jarr case. وَٱلْعَصْرِ = "By time"; وَٱلْفَجْرِ = "By the dawn". Here the wāw is NOT "and".',
      bn: 'আল্লাহ প্রায়ই মনোযোগ আকর্ষণে সূরার শুরুতে <b>শপথ</b> করেন, <b>শপথের ওয়াও</b> ("শপথ…") দিয়ে। এর পরের বিশেষ্য জর অবস্থায় থাকে। وَٱلْعَصْرِ = "সময়ের শপথ"; وَٱلْفَجْرِ = "ভোরের শপথ"। এখানে ওয়াও "এবং" নয়।',
    },
    examples: [
      { ref: '103:1', trans: { en: 'By time.', bn: 'সময়ের শপথ।' },
        note: { en: 'The wāw of oath makes ٱلْعَصْر genitive (jarr).', bn: 'শপথের ওয়াও ٱلْعَصْر-কে জর করে।' },
        words: [ { ar: 'وَٱلْعَصْرِ', en: 'By time', bn: 'সময়ের শপথ', hl: true } ] },
      { ref: '89:1', trans: { en: 'By the dawn.', bn: 'ভোরের শপথ।' },
        note: { en: 'Another oath opening — وَ = "By", not "and".', bn: 'আরেকটি শপথ-সূচনা — وَ = "শপথ", "এবং" নয়।' },
        words: [ { ar: 'وَٱلْفَجْرِ', en: 'By the dawn', bn: 'ভোরের শপথ', hl: true } ] },
    ],
    practice: {
      q: { en: 'In وَٱلْعَصْرِ the wāw is not "and" but the wāw of…', bn: 'وَٱلْعَصْرِ-তে ওয়াও "এবং" নয়, বরং কীসের ওয়াও…' },
      options: [{ en: 'negation', bn: 'নাকচ' }, { en: 'oath ("By…")', bn: 'শপথ ("শপথ…")' }, { en: 'possession', bn: 'সম্বন্ধ' }], answer: 1,
      explain: { en: 'It is the wāw of oath (qasam): "By time…".', bn: 'এটি শপথের (কসম) ওয়াও: "সময়ের শপথ…"।' },
    },
  },
  {
    id: 'conditional', unit: 'particles', icon: '🔀',
    title: { en: 'Conditional style (إِنْ / مَنْ)', bn: 'শর্তবাচক রীতি (إِنْ / مَنْ)' },
    concept: {
      en: 'A condition links "if… then…". <b>إِنْ</b> = "if" and <b>مَنْ</b> = "whoever". Both are followed by two present verbs put into jazm: the condition, then its answer. مَن يَعْمَلْ … يَرَهُ = "whoever does … will see it".',
      bn: 'শর্ত "যদি… তবে…" জোড়ে। <b>إِنْ</b> = "যদি" আর <b>مَنْ</b> = "যে/যেই"। দুটোর পরেই দুটি বর্তমান ক্রিয়া জযমে আসে: শর্ত, তারপর তার উত্তর। مَن يَعْمَلْ … يَرَهُ = "যে করবে … সে তা দেখবে"।',
    },
    examples: [
      { ref: '99:7', trans: { en: 'So whoever does an atom\'s weight of good will see it.', bn: 'সুতরাং যে অণু পরিমাণ ভালো করবে সে তা দেখবে।' },
        note: { en: 'مَن ("whoever") + jazm verbs يَعْمَلْ (condition) and يَرَهُ (answer).', bn: 'مَن ("যে") + জযম-ক্রিয়া يَعْمَلْ (শর্ত) ও يَرَهُ (উত্তর)।' },
        words: [
          { ar: 'فَمَن', en: 'So whoever', bn: 'সুতরাং যে', hl: true },
          { ar: 'يَعْمَلْ', en: 'does', bn: 'করবে' },
          { ar: 'مِثْقَالَ', en: 'weight of', bn: 'পরিমাণ' },
          { ar: 'ذَرَّةٍ', en: 'an atom', bn: 'অণু' },
          { ar: 'خَيْرًا', en: 'good', bn: 'ভালো' },
          { ar: 'يَرَهُۥ', en: 'will see it', bn: 'সে তা দেখবে' },
        ] },
      { ref: '99:8', trans: { en: 'And whoever does an atom\'s weight of evil will see it.', bn: 'আর যে অণু পরিমাণ মন্দ করবে সে তা দেখবে।' },
        note: { en: 'The parallel مَن with شَرًّا ("evil") shows the same conditional structure.', bn: 'شَرًّا ("মন্দ") সহ সমান্তরাল مَن একই শর্ত-গঠন দেখায়।' },
        words: [
          { ar: 'وَمَن', en: 'And whoever', bn: 'আর যে', hl: true },
          { ar: 'يَعْمَلْ', en: 'does', bn: 'করবে' },
          { ar: 'مِثْقَالَ', en: 'weight of', bn: 'পরিমাণ' },
          { ar: 'ذَرَّةٍ', en: 'an atom', bn: 'অণু' },
          { ar: 'شَرًّا', en: 'evil', bn: 'মন্দ' },
          { ar: 'يَرَهُۥ', en: 'will see it', bn: 'সে তা দেখবে' },
        ] },
    ],
    practice: {
      q: { en: 'مَنْ used to begin a condition means…', bn: 'শর্ত শুরু করতে ব্যবহৃত مَنْ মানে…' },
      options: [{ en: 'in', bn: 'মধ্যে' }, { en: 'whoever', bn: 'যে / যেই' }, { en: 'not', bn: 'না' }], answer: 1,
      explain: { en: 'مَنْ here means "whoever" and starts a conditional sentence with jazm verbs.', bn: 'এখানে مَنْ মানে "যে/যেই" এবং জযম-ক্রিয়াসহ শর্ত-বাক্য শুরু করে।' },
    },
  },
  {
    id: 'passive-voice', unit: 'advanced', icon: '🔁',
    title: { en: 'The passive voice (al-fiʿl al-majhūl)', bn: 'কর্মবাচ্য (আল-ফি‘ল আল-মাজহূল)' },
    concept: {
      en: 'When the doer is unknown or unmentioned, a verb goes into the <b>passive</b> (majhūl): "was done / is done". The vowels change — the past فَعَلَ ("he did") becomes فُعِلَ ("it was done"): خَلَقَ ("He created") → خُلِقَ ("it was created"). The object it happened to becomes the grammatical subject.',
      bn: 'কর্তা অজানা বা অনুক্ত হলে ক্রিয়া <b>কর্মবাচ্যে</b> (মাজহূল) যায়: "করা হয়েছিল / করা হয়"। স্বর বদলায় — অতীত فَعَلَ ("সে করলো") হয় فُعِلَ ("তা করা হলো"): خَلَقَ ("তিনি সৃষ্টি করলেন") → خُلِقَ ("তা সৃষ্টি করা হলো")।',
    },
    examples: [
      { ref: '86:5', trans: { en: 'So let man observe from what he was created.', bn: 'সুতরাং মানুষ যেন দেখে সে কী থেকে সৃষ্ট হয়েছে।' },
        note: { en: 'خُلِقَ ("was created", pattern فُعِلَ) is a past passive verb — no doer is named.', bn: 'خُلِقَ ("সৃষ্ট হয়েছে", ছাঁচ فُعِلَ) অতীত কর্মবাচ্য ক্রিয়া — কর্তা উল্লেখ নেই।' },
        words: [
          { ar: 'فَلْيَنظُرِ', en: 'So let observe', bn: 'সুতরাং দেখুক' },
          { ar: 'ٱلْإِنسَٰنُ', en: 'man', bn: 'মানুষ' },
          { ar: 'مِمَّ', en: 'from what', bn: 'কী থেকে' },
          { ar: 'خُلِقَ', en: 'he was created', bn: 'সৃষ্ট হয়েছে', hl: true },
        ] },
      { ref: '112:3', trans: { en: '…nor is He born.', bn: '…এবং তাঁকে জন্ম দেওয়া হয়নি।' },
        note: { en: 'يُولَدْ ("is born") is a present passive verb — the action is done TO Him.', bn: 'يُولَدْ ("জন্মগ্রহণ করা হয়") বর্তমান কর্মবাচ্য ক্রিয়া — কাজটি তাঁর উপর করা হয়।' },
        words: [
          { ar: 'وَلَمْ', en: 'and not', bn: 'এবং না' },
          { ar: 'يُولَدْ', en: 'is He born', bn: 'তাঁকে জন্ম দেওয়া হয়', hl: true },
        ] },
    ],
    practice: {
      q: { en: 'خُلِقَ ("was created", from خَلَقَ) is an example of the…', bn: 'خُلِقَ ("সৃষ্ট হলো", خَلَقَ থেকে) কীসের উদাহরণ…' },
      options: [{ en: 'command', bn: 'আদেশ' }, { en: 'passive voice (majhūl)', bn: 'কর্মবাচ্য (মাজহূল)' }, { en: 'dual', bn: 'দ্বিবচন' }], answer: 1,
      explain: { en: 'Changing فَعَلَ to فُعِلَ makes the verb passive — "was done", doer unnamed.', bn: 'فَعَلَ-কে فُعِلَ করলে ক্রিয়া কর্মবাচ্য হয় — "করা হলো", কর্তা অনুক্ত।' },
    },
  },
  {
    id: 'haal', unit: 'advanced', icon: '🎬',
    title: { en: 'The circumstantial ḥāl', bn: 'অবস্থাবাচক হাল (ḥāl)' },
    concept: {
      en: 'The <b>ḥāl</b> describes the STATE of the doer or object while the action happens — answering "how?" It is a noun in the naṣb (‑a) case: يَمْشُونَ … هَوْنًا = "they walk … humbly". English often uses "‑ly" or "while ‑ing".',
      bn: '<b>হাল</b> কাজের সময় কর্তা বা কর্মের <b>অবস্থা</b> বর্ণনা করে — "কীভাবে?" প্রশ্নের উত্তর দেয়। এটি নসব (‑a) অবস্থার বিশেষ্য: يَمْشُونَ … هَوْنًا = "তারা … নম্রভাবে চলে"।',
    },
    examples: [
      { ref: '25:63', trans: { en: '…who walk upon the earth humbly…', bn: '…যারা যমীনে নম্রভাবে চলে…' },
        note: { en: 'هَوْنًا ("humbly", naṣb) is the ḥāl — the manner of walking.', bn: 'هَوْنًا ("নম্রভাবে", নসব) হলো হাল — চলার ধরন।' },
        words: [
          { ar: 'يَمْشُونَ', en: 'who walk', bn: 'যারা চলে' },
          { ar: 'عَلَى', en: 'upon', bn: 'উপর' },
          { ar: 'ٱلْأَرْضِ', en: 'the earth', bn: 'যমীন' },
          { ar: 'هَوْنًا', en: 'humbly', bn: 'নম্রভাবে', hl: true },
        ] },
      { ref: '15:46', trans: { en: 'Enter it in peace, secure.', bn: 'শান্তিতে, নিরাপদে এতে প্রবেশ করো।' },
        note: { en: 'ءَامِنِينَ ("secure", naṣb) is a ḥāl — the state of those entering.', bn: 'ءَامِنِينَ ("নিরাপদ", নসব) একটি হাল — প্রবেশকারীদের অবস্থা।' },
        words: [
          { ar: 'ٱدْخُلُوهَا', en: 'Enter it', bn: 'এতে প্রবেশ করো' },
          { ar: 'بِسَلَٰمٍ', en: 'in peace', bn: 'শান্তিতে' },
          { ar: 'ءَامِنِينَ', en: 'secure', bn: 'নিরাপদে', hl: true },
        ] },
    ],
    practice: {
      q: { en: 'هَوْنًا in "they walk … humbly" describes HOW the action is done. It is a…', bn: '"তারা … নম্রভাবে চলে"-তে هَوْنًا কাজ কীভাবে হয় তা বোঝায়। এটি একটি…' },
      options: [{ en: 'ḥāl (state)', bn: 'হাল (অবস্থা)' }, { en: 'object', bn: 'কর্ম' }, { en: 'subject', bn: 'কর্তা' }], answer: 0,
      explain: { en: 'A ḥāl (in naṣb) describes the state/manner during the action.', bn: 'হাল (নসবে) কাজের সময়কার অবস্থা/ধরন বর্ণনা করে।' },
    },
  },
  {
    id: 'tamyiz', unit: 'advanced', icon: '🔎',
    title: { en: 'Specification (at-tamyīz)', bn: 'নির্দিষ্টকরণ (আত-তাময়ীয)' },
    concept: {
      en: 'The <b>tamyīz</b> is a noun in the naṣb (‑a) case that removes vagueness — it says "in respect of what". وَٱشْتَعَلَ ٱلرَّأْسُ شَيْبًا = "the head blazed with grey hair"; شَيْبًا specifies HOW the head "blazed" — in greyness.',
      bn: '<b>তাময়ীয</b> নসব (‑a) অবস্থার বিশেষ্য যা অস্পষ্টতা দূর করে — "কীসে/কোন দিক থেকে" তা জানায়। وَٱشْتَعَلَ ٱلرَّأْسُ شَيْبًا = "মাথা শুভ্রতায় জ্বলে উঠল"; شَيْبًا নির্দিষ্ট করে মাথা কীসে "জ্বলল" — শুভ্রতায়।',
    },
    examples: [
      { ref: '19:4', trans: { en: '…and the head has flared up with grey hair…', bn: '…আর মাথা শুভ্রতায় ভরে গেছে…' },
        note: { en: 'شَيْبًا ("in grey hair", naṣb) is the tamyīz — it specifies the vague verb.', bn: 'شَيْبًا ("শুভ্রতায়", নসব) হলো তাময়ীয — এটি অস্পষ্ট ক্রিয়াকে নির্দিষ্ট করে।' },
        words: [
          { ar: 'وَٱشْتَعَلَ', en: 'and has flared up', bn: 'আর জ্বলে উঠেছে' },
          { ar: 'ٱلرَّأْسُ', en: 'the head', bn: 'মাথা' },
          { ar: 'شَيْبًا', en: 'with grey hair', bn: 'শুভ্রতায়', hl: true },
        ] },
    ],
    practice: {
      q: { en: 'شَيْبًا ("in grey hair") clarifies in what respect the head "flared up". Such a manṣūb noun is a…', bn: 'شَيْبًا ("শুভ্রতায়") স্পষ্ট করে মাথা কোন দিকে "জ্বলল"। এমন মানসূব বিশেষ্য হলো…' },
      options: [{ en: 'ḥāl', bn: 'হাল' }, { en: 'tamyīz (specification)', bn: 'তাময়ীয' }, { en: 'maṣdar', bn: 'মাসদার' }], answer: 1,
      explain: { en: 'The tamyīz (naṣb) removes ambiguity: "flared up — in what? — in greyness".', bn: 'তাময়ীয (নসব) অস্পষ্টতা দূর করে: "জ্বলল — কীসে? — শুভ্রতায়"।' },
    },
  },
  {
    id: 'istithna', unit: 'advanced', icon: '➖',
    title: { en: 'Exception with إِلَّا (al-istithnāʾ)', bn: 'إِلَّا দিয়ে ব্যতিক্রম (আল-ইস্তিসনা)' },
    concept: {
      en: '<b>إِلَّا</b> ("except / but") carves an exception out of a general statement: "all… except X". After a negation it means "none… except", giving powerful affirmation: لَآ إِلَٰهَ إِلَّا هُوَ = "there is no god EXCEPT Him".',
      bn: '<b>إِلَّا</b> ("ছাড়া / কিন্তু") সাধারণ বক্তব্য থেকে ব্যতিক্রম বের করে: "সব… ছাড়া X"। নেতিবাচকের পরে এর অর্থ "কেউ নয়… ছাড়া", যা জোরালো নিশ্চয়তা দেয়: لَآ إِلَٰهَ إِلَّا هُوَ = "তিনি ছাড়া কোনো ইলাহ নেই"।',
    },
    examples: [
      { ref: '2:255', trans: { en: 'Allah — there is no god except Him…', bn: 'আল্লাহ — তিনি ছাড়া কোনো ইলাহ নেই…' },
        note: { en: 'إِلَّا excepts هُوَ from the negation لَآ إِلَٰهَ — "none except He".', bn: 'إِلَّا نেতিবাচক لَآ إِلَٰهَ থেকে هُوَ-কে ব্যতিক্রম করে — "তিনি ছাড়া কেউ নয়"।' },
        words: [
          { ar: 'لَآ', en: 'no', bn: 'নেই' },
          { ar: 'إِلَٰهَ', en: 'god', bn: 'ইলাহ' },
          { ar: 'إِلَّا', en: 'except', bn: 'ছাড়া', hl: true },
          { ar: 'هُوَ', en: 'Him', bn: 'তিনি' },
        ] },
      { ref: '103:3', trans: { en: 'Except those who believe and do righteous deeds…', bn: 'তারা ছাড়া যারা ঈমান আনে ও সৎকর্ম করে…' },
        note: { en: 'إِلَّا excepts the believers from the loss of "all mankind".', bn: 'إِلَّا "সব মানুষ"-এর ক্ষতি থেকে ঈমানদারদের ব্যতিক্রম করে।' },
        words: [
          { ar: 'إِلَّا', en: 'Except', bn: 'ছাড়া', hl: true },
          { ar: 'ٱلَّذِينَ', en: 'those who', bn: 'যারা' },
          { ar: 'ءَامَنُوا۟', en: 'believe', bn: 'ঈমান আনে' },
          { ar: 'وَعَمِلُوا۟', en: 'and do', bn: 'ও করে' },
          { ar: 'ٱلصَّٰلِحَٰتِ', en: 'righteous deeds', bn: 'সৎকর্ম' },
        ] },
    ],
    practice: {
      q: { en: 'In لَآ إِلَٰهَ إِلَّا هُوَ, the word إِلَّا means…', bn: 'لَآ إِلَٰهَ إِلَّا هُوَ-তে إِلَّا শব্দের অর্থ…' },
      options: [{ en: 'and', bn: 'এবং' }, { en: 'except / but', bn: 'ছাড়া / কিন্তু' }, { en: 'in', bn: 'মধ্যে' }], answer: 1,
      explain: { en: 'إِلَّا is the particle of exception: "no god EXCEPT Him".', bn: 'إِلَّا ব্যতিক্রমের অব্যয়: "তিনি ছাড়া কোনো ইলাহ নেই"।' },
    },
  },
  {
    id: 'nun-tawkid', unit: 'advanced', icon: '‼️',
    title: { en: 'The emphatic nūn (nūn at-tawkīd)', bn: 'তাগিদের নূন (নূন আত-তাওকীদ)' },
    concept: {
      en: 'A present-tense verb can take an <b>emphatic nūn</b> ending to stress that it WILL certainly happen. It comes as a heavy ‑نَّ or a light ‑نْ, usually with a preceding لَـ: لَيُنۢبَذَنَّ = "he will SURELY be thrown". It adds force, like "certainly / surely".',
      bn: 'বর্তমান ক্রিয়ায় <b>তাগিদের নূন</b> প্রত্যয় যুক্ত হয়ে বোঝায় যে তা নিশ্চিতভাবে ঘটবেই। এটি ভারী ‑نَّ বা হালকা ‑نْ রূপে আসে, সাধারণত আগে لَـ সহ: لَيُنۢبَذَنَّ = "তাকে অবশ্যই নিক্ষেপ করা হবে"।',
    },
    examples: [
      { ref: '104:4', trans: { en: 'Nay! He will surely be thrown into the Crusher.', bn: 'কখনো নয়! তাকে অবশ্যই নিক্ষেপ করা হবে হুতামায়।' },
        note: { en: 'لَيُنۢبَذَنَّ carries the heavy emphatic nūn ‑نَّ (with لَـ): "he will SURELY be thrown".', bn: 'لَيُنۢبَذَنَّ-তে ভারী তাগিদ-নূন ‑نَّ (لَـ সহ): "অবশ্যই নিক্ষেপ করা হবে"।' },
        words: [
          { ar: 'كَلَّا', en: 'Nay!', bn: 'কখনো নয়!' },
          { ar: 'لَيُنۢبَذَنَّ', en: 'he will surely be thrown', bn: 'অবশ্যই নিক্ষেপ করা হবে', hl: true },
          { ar: 'فِى', en: 'into', bn: 'মধ্যে' },
          { ar: 'ٱلْحُطَمَةِ', en: 'the Crusher', bn: 'হুতামা' },
        ] },
      { ref: '96:15', trans: { en: '…We will surely drag him by the forelock.', bn: '…আমরা অবশ্যই টেনে নেব সামনের চুল ধরে।' },
        note: { en: 'لَنَسْفَعًۢا shows the light emphatic nūn ‑نْ (written as tanwīn): "We will SURELY drag".', bn: 'لَنَسْفَعًۢا-তে হালকা তাগিদ-নূন ‑نْ (তানভীন রূপে): "অবশ্যই টেনে নেব"।' },
        words: [
          { ar: 'لَنَسْفَعًۢا', en: 'We will surely drag', bn: 'অবশ্যই টেনে নেব', hl: true },
          { ar: 'بِٱلنَّاصِيَةِ', en: 'by the forelock', bn: 'সামনের চুল ধরে' },
        ] },
    ],
    practice: {
      q: { en: 'The ‑نَّ ending on لَيُنۢبَذَنَّ ("he will surely be thrown") adds a sense of…', bn: 'لَيُنۢبَذَنَّ-এর ‑نَّ প্রত্যয় কোন অর্থ যোগ করে…' },
      options: [{ en: 'the past', bn: 'অতীত' }, { en: 'strong emphasis ("surely")', bn: 'জোরালো তাগিদ ("অবশ্যই")' }, { en: 'a question', bn: 'প্রশ্ন' }], answer: 1,
      explain: { en: 'The nūn at-tawkīd emphasises certainty: "will SURELY happen".', bn: 'নূন আত-তাওকীদ নিশ্চয়তা জোরদার করে: "অবশ্যই ঘটবে"।' },
    },
  },
  {
    id: 'five-nouns', unit: 'advanced', icon: '🖐️',
    title: { en: 'The five nouns (al-asmāʾ al-khamsa)', bn: 'পাঁচ বিশেষ্য (আল-আসমা আল-খামসা)' },
    concept: {
      en: 'Five special nouns — أَب ("father"), أَخ ("brother"), ذُو ("owner of"), فو ("mouth"), حَم ("father-in-law") — show their case with a LONG letter instead of a short vowel: و for rafʿ, ا for naṣb, ي for jarr. So ذُو = "owner" (rafʿ) but أَبِي = "father of" (jarr).',
      bn: 'পাঁচটি বিশেষ বিশেষ্য — أَب ("পিতা"), أَخ ("ভাই"), ذُو ("মালিক"), فو ("মুখ"), حَم ("শ্বশুর") — স্বল্প স্বরের বদলে দীর্ঘ অক্ষরে এ‘রাব দেখায়: রফ‘-তে و, নসব-তে ا, জর-তে ي। তাই ذُو = "মালিক" (রফ‘) কিন্তু أَبِي = "পিতা" (জর)।',
    },
    examples: [
      { ref: '85:15', trans: { en: 'Owner of the Throne, the Glorious.', bn: 'আরশের অধিপতি, মহিমান্বিত।' },
        note: { en: 'ذُو ("owner of") ends in و because it is in the rafʿ (nominative) case.', bn: 'ذُو ("মালিক") و-তে শেষ কারণ এটি রফ‘ অবস্থায়।' },
        words: [
          { ar: 'ذُو', en: 'Owner of', bn: 'অধিপতি', hl: true },
          { ar: 'ٱلْعَرْشِ', en: 'the Throne', bn: 'আরশের' },
          { ar: 'ٱلْمَجِيدُ', en: 'the Glorious', bn: 'মহিমান্বিত' },
        ] },
      { ref: '111:1', trans: { en: 'May the hands of Abu Lahab perish…', bn: 'আবু লাহাবের হাত ধ্বংস হোক…' },
        note: { en: 'أَبِى ("father of") ends in ي because it is in the jarr (genitive) case.', bn: 'أَبِى ("পিতা") ي-তে শেষ কারণ এটি জর অবস্থায়।' },
        words: [
          { ar: 'تَبَّتْ', en: 'Perish', bn: 'ধ্বংস হোক' },
          { ar: 'يَدَآ', en: 'the two hands of', bn: 'দুই হাত' },
          { ar: 'أَبِى', en: 'the father of', bn: 'পিতার', hl: true },
          { ar: 'لَهَبٍ', en: 'Lahab', bn: 'লাহাবের' },
        ] },
    ],
    practice: {
      q: { en: 'The five nouns (أَب, أَخ, ذُو…) show their case using a…', bn: 'পাঁচ বিশেষ্য (أَب, أَخ, ذُو…) এ‘রাব দেখায় কী দিয়ে…' },
      options: [{ en: 'long letter (و / ا / ي)', bn: 'দীর্ঘ অক্ষর (و / ا / ي)' }, { en: 'short vowel', bn: 'স্বল্প স্বর' }, { en: 'the article ٱلْ', bn: 'ٱلْ দিয়ে' }], answer: 0,
      explain: { en: 'The five nouns take و (rafʿ), ا (naṣb) or ي (jarr) as their case sign.', bn: 'পাঁচ বিশেষ্য এ‘রাব-চিহ্ন হিসেবে و (রফ‘), ا (নসব) বা ي (জর) নেয়।' },
    },
  },
  {
    id: 'inna-kana-applied', unit: 'advanced', icon: '🧠',
    title: { en: 'Sisters of إِنَّ & كَانَ in action (لَعَلَّ، لَيْسَ)', bn: 'إِنَّ ও كَانَ-এর বোনেরা প্রয়োগে (لَعَلَّ، لَيْسَ)' },
    concept: {
      en: 'The sisters of إِنَّ and كَانَ appear constantly in the Quran. <b>لَعَلَّ</b> ("so that perhaps / that you may") is a sister of إِنَّ — it makes the subject naṣb and expresses hope. <b>لَيْسَ</b> ("is not") is a sister of كَانَ — it negates a nominal sentence and makes the predicate naṣb.',
      bn: 'إِنَّ ও كَانَ-এর বোনেরা কুরআনে অহরহ আসে। <b>لَعَلَّ</b> ("যাতে সম্ভবত / যেন তোমরা") إِنَّ-এর বোন — উদ্দেশ্যকে নসব করে ও আশা প্রকাশ করে। <b>لَيْسَ</b> ("নয়") كَانَ-এর বোন — নাম-বাক্য নাকচ করে ও বিধেয়কে নসব করে।',
    },
    examples: [
      { ref: '2:21', trans: { en: '…worship your Lord… so that you may become mindful.', bn: '…তোমাদের রবের ইবাদত করো… যেন তোমরা মুত্তাকী হও।' },
        note: { en: 'لَعَلَّكُمْ = لَعَلَّ ("so that perhaps") + كُمْ ("you") — a sister of إِنَّ expressing hope.', bn: 'لَعَلَّكُمْ = لَعَلَّ ("যাতে সম্ভবত") + كُمْ ("তোমরা") — إِنَّ-এর বোন, আশা প্রকাশক।' },
        words: [
          { ar: 'ٱعْبُدُوا۟', en: 'worship', bn: 'ইবাদত করো' },
          { ar: 'رَبَّكُمُ', en: 'your Lord', bn: 'তোমাদের রব' },
          { ar: 'لَعَلَّكُمْ', en: 'so that you may', bn: 'যেন তোমরা', hl: true },
          { ar: 'تَتَّقُونَ', en: 'become mindful', bn: 'মুত্তাকী হও' },
        ] },
      { ref: '95:8', trans: { en: 'Is Allah not the most just of judges?', bn: 'আল্লাহ কি বিচারকদের মধ্যে সর্বাধিক ন্যায়পরায়ণ নন?' },
        note: { en: 'أَلَيْسَ = the hamza of question + لَيْسَ ("is not"), a sister of كَانَ.', bn: 'أَلَيْسَ = প্রশ্নের হামযা + لَيْسَ ("নয়"), كَانَ-এর বোন।' },
        words: [
          { ar: 'أَلَيْسَ', en: 'Is not', bn: 'নন কি' },
          { ar: 'ٱللَّهُ', en: 'Allah', bn: 'আল্লাহ' },
          { ar: 'بِأَحْكَمِ', en: 'the most just of', bn: 'সর্বাধিক ন্যায়পরায়ণ' },
          { ar: 'ٱلْحَٰكِمِينَ', en: 'the judges', bn: 'বিচারকদের' },
        ] },
    ],
    practice: {
      q: { en: 'لَعَلَّ (as in لَعَلَّكُمْ تَتَّقُونَ) is a sister of إِنَّ that expresses…', bn: 'لَعَلَّ (যেমন لَعَلَّكُمْ تَتَّقُونَ) إِنَّ-এর বোন, যা প্রকাশ করে…' },
      options: [{ en: 'hope / purpose ("so that")', bn: 'আশা / উদ্দেশ্য ("যেন")' }, { en: 'the past', bn: 'অতীত' }, { en: 'an oath', bn: 'শপথ' }], answer: 0,
      explain: { en: 'لَعَلَّ conveys hope or purpose: "so that you may…", and makes the subject naṣb.', bn: 'لَعَلَّ আশা বা উদ্দেশ্য বোঝায়: "যেন তোমরা…", এবং উদ্দেশ্যকে নসব করে।' },
    },
  },
  {
    id: 'lam-purpose', unit: 'advanced', icon: '🎯',
    title: { en: 'The lām of purpose + subjunctive', bn: 'উদ্দেশ্যের লাম + নসব-রূপ' },
    concept: {
      en: 'A present verb can be put into the <b>subjunctive</b> (naṣb, ending ‑a) by particles of purpose. The most common is the <b>lām of reason</b> لِـ ("in order to / so that"): لِيَعْبُدُونِ = "so that they worship Me". أَنْ ("to") and حَتَّىٰ ("until") work the same way.',
      bn: 'বর্তমান ক্রিয়াকে উদ্দেশ্যবাচক অব্যয় দিয়ে <b>নসব-রূপে</b> (‑a শেষ) নেওয়া যায়। সবচেয়ে প্রচলিত <b>কারণের লাম</b> لِـ ("যাতে / যেন"): لِيَعْبُدُونِ = "যাতে তারা আমার ইবাদত করে"। أَنْ ("যে") ও حَتَّىٰ ("যতক্ষণ না") একইভাবে কাজ করে।',
    },
    examples: [
      { ref: '51:56', trans: { en: 'I did not create jinn and mankind except to worship Me.', bn: 'আমি জিন ও মানুষকে কেবল আমার ইবাদতের জন্যই সৃষ্টি করেছি।' },
        note: { en: 'لِـ ("so that") on لِيَعْبُدُونِ puts the verb into the subjunctive (naṣb) — purpose.', bn: 'لِيَعْبُدُونِ-এর لِـ ("যাতে") ক্রিয়াকে নসব-রূপে নেয় — উদ্দেশ্য।' },
        words: [
          { ar: 'وَمَا', en: 'And not', bn: 'আর না' },
          { ar: 'خَلَقْتُ', en: 'I created', bn: 'আমি সৃষ্টি করেছি' },
          { ar: 'ٱلْجِنَّ', en: 'the jinn', bn: 'জিন' },
          { ar: 'وَٱلْإِنسَ', en: 'and mankind', bn: 'ও মানুষ' },
          { ar: 'إِلَّا', en: 'except', bn: 'কেবল' },
          { ar: 'لِيَعْبُدُونِ', en: 'to worship Me', bn: 'আমার ইবাদতের জন্য', hl: true },
        ] },
    ],
    practice: {
      q: { en: 'The لِـ on لِيَعْبُدُونِ ("so that they worship Me") shows…', bn: 'لِيَعْبُدُونِ-এর لِـ ("যাতে তারা ইবাদত করে") কী বোঝায়…' },
      options: [{ en: 'possession', bn: 'সম্বন্ধ' }, { en: 'purpose ("in order to")', bn: 'উদ্দেশ্য ("যাতে")' }, { en: 'negation', bn: 'নেতিবাচকতা' }], answer: 1,
      explain: { en: 'The lām of purpose gives "in order to…" and makes the verb subjunctive (naṣb).', bn: 'উদ্দেশ্যের লাম "যাতে…" অর্থ দেয় এবং ক্রিয়াকে নসব-রূপ করে।' },
    },
  },
  {
    id: 'word-roots', unit: 'advanced', icon: '🌳',
    title: { en: 'Word roots: the genius of the Arabic lexicon', bn: 'শব্দমূল: আরবি অভিধানের মেধা' },
    concept: {
      en: 'Almost every Arabic word grows from a <b>root</b> of (usually) three consonants. Roots carry a core meaning; patterns add tense, voice, agency and part of speech. Knowing the root lets you guess the meaning of an unfamiliar word. Example: <b>ك-ت-ب</b> (k-t-b) = "write" → كَتَبَ (he wrote), كِتَاب (book), كَاتِب (writer), مَكْتَب (desk/office).',
      bn: 'প্রায় প্রতিটি আরবি শব্দ (সাধারণত) <b>তিনটি ব্যঞ্জনের মূল</b> থেকে জন্মে। মূল একটি কেন্দ্রীয় অর্থ বহন করে; প্যাটার্ন কাল, বাচ্য, কর্তৃত্ব ও পদজাতি যোগ করে। মূল জানলে অপরিচিত শব্দের অর্থ অনুমান করা যায়। যেমন: <b>ك-ت-ب</b> = "লেখা" → كَتَبَ (সে লিখল), كِتَاب (বই), كَاتِب (লেখক), مَكْتَب (ডেস্ক/অফিস)।',
    },
    examples: [
      { ref: '96:1', trans: { en: 'Read! In the name of your Lord who created.', bn: 'পড়ো! তোমার রবের নামে যিনি সৃষ্টি করেছেন।' },
        note: { en: 'ٱقْرَأْ comes from root <b>ق-ر-أ</b> (q-r-) = "to read/recite". Same root as Qur\'an.', bn: 'ٱقْرَأْ মূল <b>ق-ر-أ</b> থেকে — "পড়া/তিলাওয়াত করা"। একই মূল থেকে قُرْآن (কুরআন)।' },
        words: [
          { ar: 'ٱقْرَأْ', en: 'Read! (impv)', bn: 'পড়ো!', hl: true },
          { ar: 'بِٱسْمِ', en: 'in (the) name of', bn: 'নামে' },
          { ar: 'رَبِّكَ', en: 'your Lord', bn: 'তোমার রবের' },
          { ar: 'ٱلَّذِى', en: 'who', bn: 'যিনি' },
          { ar: 'خَلَقَ', en: 'created', bn: 'সৃষ্টি করেছেন', role: { en: 'root خ-ل-ق = create', bn: 'মূল خ-ل-ق = সৃষ্টি' } },
        ] },
      { ref: '1:2', trans: { en: 'All praise is for Allah, Lord of all worlds.', bn: 'সমস্ত প্রশংসা আল্লাহর জন্য, বিশ্বজগতের রব।' },
        note: { en: 'رَبّ comes from root <b>ر-ب-ب</b> (r-b-b) = "to nurture, to be lord/master". Also active participle: "nurturer/sustainer".', bn: 'رَبّ মূল <b>ر-ب-ب</b> থেকে — "লালন করা/প্রভু হওয়া"। মুখ্য কর্তা: "পালনকর্তা/প্রভু"।' },
        words: [
          { ar: 'رَبِّ', en: 'Lord of', bn: 'রব', hl: true },
          { ar: 'ٱلْعَٰلَمِينَ', en: 'the worlds', bn: 'বিশ্বজগতের', role: { en: 'root ع-ل-م = know/sign → world', bn: 'مূল ع-ل-م = জানা/চিহ্ন → বিশ্ব' } },
        ] },
      { ref: '103:1', trans: { en: 'By the declining day!', bn: 'শপথ সময়ের!' },
        note: { en: 'وَٱلْعَصْرِ — root <b>ع-ص-ر</b> (ʿ-ṣ-r) = "to squeeze/press" → "time" (as something that presses upon us).', bn: 'وَٱلْعَصْرِ — মূল <b>ع-ص-ر</b> = "চাপ দেওয়া" → "সময়" (যা আমাদের উপর চাপ দেয়)।' },
        words: [
          { ar: 'وَٱلْعَصْرِ', en: 'By the time', bn: 'শপথ সময়ের', hl: true, role: { en: 'root ع-ص-ر = squeeze → age', bn: 'مূল ع-ص-ر = চাপ দেওয়া → যুগ' } },
        ] },
    ],
    practice: {
      q: { en: 'كِتَاب ("book") and كَاتِب ("writer") share which root?', bn: 'كِتَاب ("বই") ও كَاتِب ("লেখক") কোন মূল ভাগাভাগি করে?' },
      options: [{ en: 'ك-ت-ب', bn: 'ك-ت-ب' }, { en: 'ك-ب-ت', bn: 'ك-ب-ت' }, { en: 'ب-ت-ك', bn: 'ب-ت-ك' }], answer: 0,
      explain: { en: 'Both come from ك-ت-ب (k-t-b) = "to write". كِتَاب = "book", كَاتِب = "writer".', bn: 'উভয়ই ك-ت-ب (k-t-b) = "লেখা" থেকে। كِتَاب = "বই", كَاتِب = "লেখক"।' },
    },
  },

  /* ===================== FREQUENCY VOCABULARY ===================== */
  {
    id: 'freq-nouns', unit: 'vocabulary', icon: '🏷️',
    title: { en: 'Top nouns of the Quran', bn: 'কুরআনের শীর্ষ বিশেষ্যসমূহ' },
    concept: {
      en: 'A small set of nouns carries a huge share of the Quran\'s text. Learning them first unlocks whole verses at once. Each card below is a real occurrence — tap it to see the word inside its ayah.',
      bn: 'অল্প কিছু বিশেষ্যই কুরআনের পাঠের বিরাট অংশ জুড়ে আছে। এগুলো আগে শিখলে একসাথে পুরো আয়াত খুলে যায়। নিচের প্রতিটি কার্ড একটি বাস্তব ব্যবহার — আয়াতের ভেতরে শব্দটি দেখতে ট্যাপ করুন।',
    },
    vocab: [
      { ar: 'ٱللَّهُ', ref: '112:1', en: 'Allah', bn: 'আল্লাহ', pos: { en: 'proper noun', bn: 'বিশেষ নাম' } },
      { ar: 'رَبِّ', ref: '1:2', en: 'Lord (of)', bn: 'রব / পালনকর্তা', pos: { en: 'noun', bn: 'বিশেষ্য' } },
      { ar: 'يَوْمِ', ref: '1:4', en: 'day (of)', bn: 'দিন', pos: { en: 'noun', bn: 'বিশেষ্য' } },
      { ar: 'ٱلنَّاسِ', ref: '114:1', en: 'mankind, the people', bn: 'মানুষ', pos: { en: 'noun', bn: 'বিশেষ্য' } },
      { ar: 'ٱلْكِتَٰبُ', ref: '2:2', en: 'the Book', bn: 'কিতাব', pos: { en: 'noun', bn: 'বিশেষ্য' } },
      { ar: 'ٱلْأَرْضِ', ref: '25:63', en: 'the earth', bn: 'যমীন', pos: { en: 'noun', bn: 'বিশেষ্য' } },
      { ar: 'ٱلسَّمَٰوَٰتِ', ref: '2:255', en: 'the heavens', bn: 'আসমানসমূহ', pos: { en: 'noun (plural)', bn: 'বিশেষ্য (বহুবচন)' } },
      { ar: 'قُلُوبِهِمْ', ref: '2:7', en: 'their hearts', bn: 'তাদের হৃদয়', pos: { en: 'noun + pronoun', bn: 'বিশেষ্য + সর্বনাম' } },
    ],
    examples: [],
    practice: {
      q: { en: 'What does رَبِّ mean?', bn: 'رَبِّ শব্দের অর্থ কী?' },
      options: [{ en: 'Lord', bn: 'রব / পালনকর্তা' }, { en: 'day', bn: 'দিন' }, { en: 'book', bn: 'কিতাব' }], answer: 0,
      explain: { en: 'رَبّ means "Lord / Master / Sustainer" — as in رَبِّ ٱلْعَٰلَمِينَ (1:2).', bn: 'رَبّ মানে "রব / প্রভু / পালনকর্তা" — যেমন رَبِّ ٱلْعَٰلَمِينَ (১:২)।' },
    },
  },
  {
    id: 'freq-pronouns', unit: 'vocabulary', icon: '🫵',
    title: { en: 'Top pronouns & pointers', bn: 'শীর্ষ সর্বনাম ও নির্দেশক' },
    concept: {
      en: 'Pronouns and pointing words appear in nearly every ayah. Master هُوَ، هُمْ، ذَٰلِكَ، ٱلَّذِي/ٱلَّذِينَ and the flexible مَا and مَنْ, and sentences start to parse themselves.',
      bn: 'সর্বনাম ও নির্দেশক শব্দ প্রায় প্রতিটি আয়াতে আসে। هُوَ، هُمْ، ذَٰلِكَ، ٱلَّذِي/ٱلَّذِينَ এবং বহুমুখী مَا ও مَنْ আয়ত্ত করলে বাক্য নিজে নিজেই বোঝা যেতে থাকে।',
    },
    vocab: [
      { ar: 'هُوَ', ref: '112:1', en: 'he / it', bn: 'সে / তিনি', pos: { en: 'pronoun', bn: 'সর্বনাম' } },
      { ar: 'هُمْ', ref: '2:4', en: 'they', bn: 'তারা', pos: { en: 'pronoun', bn: 'সর্বনাম' } },
      { ar: 'ذَٰلِكَ', ref: '2:2', en: 'that', bn: 'সেই / ঐ', pos: { en: 'demonstrative', bn: 'নির্দেশক' } },
      { ar: 'ٱلَّذِينَ', ref: '1:7', en: 'those who', bn: 'যারা', pos: { en: 'relative pronoun', bn: 'সম্বন্ধবাচক' } },
      { ar: 'ٱلَّذِى', ref: '107:1', en: 'who / which (sing.)', bn: 'যে / যা', pos: { en: 'relative pronoun', bn: 'সম্বন্ধবাচক' } },
      { ar: 'مَا', ref: '2:255', en: 'what / that which', bn: 'যা / কী', pos: { en: 'pronoun / particle', bn: 'সর্বনাম / অব্যয়' } },
      { ar: 'مَن', ref: '2:255', en: 'who / whoever', bn: 'যে / কে', pos: { en: 'pronoun', bn: 'সর্বনাম' } },
    ],
    examples: [],
    practice: {
      q: { en: 'ٱلَّذِينَ means…', bn: 'ٱلَّذِينَ মানে…' },
      options: [{ en: 'those who', bn: 'যারা' }, { en: 'in', bn: 'মধ্যে' }, { en: 'say!', bn: 'বলো!' }], answer: 0,
      explain: { en: 'ٱلَّذِينَ = "those who" (masculine plural relative pronoun).', bn: 'ٱلَّذِينَ = "যারা" (পুংলিঙ্গ বহুবচন সম্বন্ধবাচক সর্বনাম)।' },
    },
  },
  {
    id: 'freq-particles', unit: 'vocabulary', icon: '🧲',
    title: { en: 'Top particles that glue the Quran', bn: 'কুরআন জোড়ার শীর্ষ অব্যয়সমূহ' },
    concept: {
      en: 'Particles are tiny but everywhere: prepositions (فِي، عَلَىٰ، مِنْ), the emphasiser إِنَّ, the exceptor إِلَّا, and the negators لَا، لَمْ، لَنْ. Knowing this handful lets you follow the skeleton of almost any verse.',
      bn: 'অব্যয় ছোট কিন্তু সর্বত্র: অব্যয়পদ (فِي، عَلَىٰ، مِنْ), তাগিদের إِنَّ, ব্যতিক্রমের إِلَّا, এবং নেতিবাচক لَا، لَمْ، لَنْ। এই কয়টি জানলেই প্রায় যেকোনো আয়াতের কাঠামো অনুসরণ করা যায়।',
    },
    vocab: [
      { ar: 'فِى', ref: '104:4', en: 'in', bn: 'মধ্যে', pos: { en: 'preposition', bn: 'অব্যয়পদ' } },
      { ar: 'عَلَىٰ', ref: '2:7', en: 'on / upon', bn: 'উপর', pos: { en: 'preposition', bn: 'অব্যয়পদ' } },
      { ar: 'مِن', ref: '2:4', en: 'from / of', bn: 'থেকে', pos: { en: 'preposition', bn: 'অব্যয়পদ' } },
      { ar: 'إِنَّ', ref: '103:2', en: 'indeed, truly', bn: 'নিশ্চয়', pos: { en: 'emphasis particle', bn: 'তাগিদ-অব্যয়' } },
      { ar: 'إِلَّا', ref: '103:3', en: 'except', bn: 'ছাড়া', pos: { en: 'exception particle', bn: 'ব্যতিক্রম-অব্যয়' } },
      { ar: 'لَا', ref: '2:2', en: 'no / not', bn: 'না / নেই', pos: { en: 'negation particle', bn: 'নেতিবাচক অব্যয়' } },
      { ar: 'لَمْ', ref: '112:3', en: 'did not', bn: 'নি (অতীত নাকচ)', pos: { en: 'negation particle', bn: 'নেতিবাচক অব্যয়' } },
      { ar: 'لَن', ref: '2:80', en: 'will never', bn: 'কখনো না', pos: { en: 'negation particle', bn: 'নেতিবাচক অব্যয়' } },
    ],
    examples: [],
    practice: {
      q: { en: 'Which particle means "except"?', bn: 'কোন অব্যয়ের অর্থ "ছাড়া"?' },
      options: ['إِلَّا', 'إِنَّ', 'لَمْ'], answer: 0,
      explain: { en: 'إِلَّا is the particle of exception ("except"); إِنَّ = "indeed", لَمْ = "did not".', bn: 'إِلَّا ব্যতিক্রমের অব্যয় ("ছাড়া"); إِنَّ = "নিশ্চয়", لَمْ = "নি"।' },
    },
  },
  {
    id: 'freq-verbs', unit: 'vocabulary', icon: '🗣️',
    title: { en: 'Top verbs of faith & speech', bn: 'ঈমান ও কথার শীর্ষ ক্রিয়াসমূহ' },
    concept: {
      en: 'The Quran\'s most frequent verbs revolve around saying, knowing, creating, being and believing. Notice the tense of each: past (قَالَ، خَلَقَ، كَانَ), present (يَعْلَمُ، يُؤْمِنُونَ، نَعْبُدُ) and command (قُلْ).',
      bn: 'কুরআনের সবচেয়ে ঘন ঘন আসা ক্রিয়াগুলো বলা, জানা, সৃষ্টি, হওয়া ও ঈমান ঘিরে। প্রতিটির কাল লক্ষ করুন: অতীত (قَالَ، خَلَقَ، كَانَ), বর্তমান (يَعْلَمُ، يُؤْمِنُونَ، نَعْبُدُ) ও আদেশ (قُلْ)।',
    },
    vocab: [
      { ar: 'قَالَ', ref: '19:4', en: 'he said', bn: 'সে বলল', pos: { en: 'verb (past)', bn: 'ক্রিয়া (অতীত)' } },
      { ar: 'قُلْ', ref: '112:1', en: 'say!', bn: 'বলো!', pos: { en: 'verb (command)', bn: 'ক্রিয়া (আদেশ)' } },
      { ar: 'خَلَقَ', ref: '9:36', en: 'he created', bn: 'তিনি সৃষ্টি করেছেন', pos: { en: 'verb (past)', bn: 'ক্রিয়া (অতীত)' } },
      { ar: 'كَانَ', ref: '2:184', en: 'he was / is', bn: 'ছিল / হয়', pos: { en: 'verb (past)', bn: 'ক্রিয়া (অতীত)' } },
      { ar: 'يَعْلَمُ', ref: '2:255', en: 'he knows', bn: 'তিনি জানেন', pos: { en: 'verb (present)', bn: 'ক্রিয়া (বর্তমান)' } },
      { ar: 'يُؤْمِنُونَ', ref: '2:3', en: 'they believe', bn: 'তারা ঈমান আনে', pos: { en: 'verb (present)', bn: 'ক্রিয়া (বর্তমান)' } },
      { ar: 'ءَامَنُوا۟', ref: '103:3', en: 'they believed', bn: 'তারা ঈমান এনেছে', pos: { en: 'verb (past)', bn: 'ক্রিয়া (অতীত)' } },
      { ar: 'نَعْبُدُ', ref: '1:5', en: 'we worship', bn: 'আমরা ইবাদত করি', pos: { en: 'verb (present)', bn: 'ক্রিয়া (বর্তমান)' } },
    ],
    examples: [],
    practice: {
      q: { en: 'قَالَ means…', bn: 'قَالَ মানে…' },
      options: [{ en: 'he said', bn: 'সে বলল' }, { en: 'he created', bn: 'তিনি সৃষ্টি করলেন' }, { en: 'he knows', bn: 'তিনি জানেন' }], answer: 0,
      explain: { en: 'قَالَ is the past verb "he said" — one of the most frequent words in the Quran.', bn: 'قَالَ অতীত ক্রিয়া "সে বলল" — কুরআনের অন্যতম বেশি ব্যবহৃত শব্দ।' },
    },
  },

  /* ===================== UNIT 9 — READING REAL AYAT ===================== *
   * Full word-by-word parse of complete short verses. Every token below is *
   * verified against data/quran-words.json, and every "role" tag only      *
   * re-applies grammar already taught in Units 1–8 (reinforcement, not new  *
   * claims). Each example word may carry an optional role{en,bn} tag.       */
  {
    id: 'read-bismillah', unit: 'reading', icon: '🌸',
    title: { en: 'Reading 1:1 — Bismillah, word by word', bn: '১:১ পড়া — বিসমিল্লাহ, শব্দে শব্দে' },
    concept: {
      en: 'Now we read a COMPLETE verse and label every single word with the grammar you already learned. The Basmala is a <b>phrase</b> (not a full sentence): a preposition, a chain of possession (iḍāfah), and two adjectives — all in the genitive (jarr). Read each word, then its role tag.',
      bn: 'এবার আমরা একটি সম্পূর্ণ আয়াত পড়ব এবং প্রতিটি শব্দকে আগে শেখা ব্যাকরণ দিয়ে চিহ্নিত করব। বিসমিল্লাহ একটি <b>বাক্যাংশ</b> (পূর্ণ বাক্য নয়): একটি অব্যয়, একটি সম্বন্ধ-শৃঙ্খল (ইদাফা), ও দুটি বিশেষণ — সবই জর অবস্থায়। প্রতিটি শব্দ পড়ো, তারপর তার ভূমিকা-চিহ্ন দেখো।',
    },
    examples: [
      { ref: '1:1', trans: { en: 'In the name of Allah, the Most Merciful, the Bestower of Mercy.', bn: 'পরম করুণাময় অসীম দয়ালু আল্লাহর নামে।' },
        note: { en: 'بِـ (a preposition, ḥarf jarr) makes ٱسْم genitive → بِسْمِ. ٱسْم then owns ٱللَّهِ (iḍāfah, so ٱللَّهِ is jarr). ٱلرَّحْمَٰنِ and ٱلرَّحِيمِ are adjectives (ṣifa) of ٱللَّهِ, matching it in the genitive.', bn: 'بِـ (একটি অব্যয়, হারফ জর) ٱسْم-কে জর করে → بِسْمِ। এরপর ٱسْم-এর সাথে ٱللَّهِ যুক্ত (ইদাফা, তাই ٱللَّهِ জর)। ٱلرَّحْمَٰنِ ও ٱلرَّحِيمِ হলো ٱللَّهِ-এর বিশেষণ (সিফা), জর অবস্থায় মিলে যায়।' },
        words: [
          { ar: 'بِسْمِ', en: 'In the name of', bn: 'নামে', hl: true, role: { en: 'preposition + noun (jarr)', bn: 'অব্যয় + বিশেষ্য (জর)' } },
          { ar: 'ٱللَّهِ', en: 'of Allah', bn: 'আল্লাহর', role: { en: 'proper noun — muḍāf ilayh (jarr)', bn: 'বিশেষ নাম — মুদাফ ইলাইহি (জর)' } },
          { ar: 'ٱلرَّحْمَٰنِ', en: 'the Most Merciful', bn: 'পরম করুণাময়', role: { en: 'adjective (ṣifa, jarr)', bn: 'বিশেষণ (সিফা, জর)' } },
          { ar: 'ٱلرَّحِيمِ', en: 'the Bestower of Mercy', bn: 'অসীম দয়ালু', role: { en: 'adjective (ṣifa, jarr)', bn: 'বিশেষণ (সিফা, জর)' } },
        ] },
    ],
    practice: {
      q: { en: 'In بِسْمِ, the letter بِـ is a…', bn: 'بِسْمِ-এ بِـ অক্ষরটি একটি…' },
      options: [{ en: 'preposition (ḥarf jarr)', bn: 'অব্যয় (হারফ জর)' }, { en: 'verb (fiʿl)', bn: 'ক্রিয়া (ফি‘ল)' }, { en: 'noun (ism)', bn: 'বিশেষ্য (ইসম)' }], answer: 0,
      explain: { en: 'بِـ ("in/with") is a preposition, so the noun ٱسْم after it becomes genitive: بِسْمِ.', bn: 'بِـ ("নামে/দিয়ে") একটি অব্যয়, তাই এর পরের বিশেষ্য ٱسْم জর হয়: بِسْمِ।' },
    },
  },
  {
    id: 'read-ikhlas', unit: 'reading', icon: '💎',
    title: { en: 'Reading 112:1–4 — Al-Ikhlas', bn: '১১২:১–৪ পড়া — সূরা ইখলাস' },
    concept: {
      en: 'Al-Ikhlas is four short verses that use nominal sentences, negation and a sister of كَانَ — all from earlier units. Walk each word: a command, a subject-and-predicate, two negated verbs (one passive), then كَانَ negated with its subject and predicate.',
      bn: 'সূরা ইখলাস চারটি ছোট আয়াত, যেখানে নাম-বাক্য, নেতিবাচকতা ও كَانَ-এর একটি বোন ব্যবহৃত — সবই আগের ইউনিট থেকে। প্রতিটি শব্দ ঘুরে দেখো: একটি আদেশ, একটি উদ্দেশ্য-ও-বিধেয়, দুটি নেতিবাচক ক্রিয়া (একটি কর্মবাচ্য), তারপর كَانَ নেতিবাচক তার উদ্দেশ্য ও বিধেয়সহ।',
    },
    examples: [
      { ref: '112:1', trans: { en: 'Say, "He is Allah, One."', bn: 'বলো, "তিনি আল্লাহ, একক।"' },
        note: { en: 'قُلْ is a command. What follows is a nominal sentence with NO verb: هُوَ is the subject (mubtadaʾ), and ٱللَّهُ … أَحَدٌ is the predicate — all in rafʿ.', bn: 'قُلْ একটি আদেশ। এরপর একটি ক্রিয়াহীন নাম-বাক্য: هُوَ উদ্দেশ্য (মুবতাদা), আর ٱللَّهُ … أَحَدٌ বিধেয় — সবই রফ‘।' },
        words: [
          { ar: 'قُلْ', en: 'Say', bn: 'বলো', role: { en: 'command verb (amr)', bn: 'আদেশ ক্রিয়া (আমর)' } },
          { ar: 'هُوَ', en: 'He (is)', bn: 'তিনি', hl: true, role: { en: 'detached pronoun — mubtadaʾ (rafʿ)', bn: 'বিচ্ছিন্ন সর্বনাম — মুবতাদা (রফ‘)' } },
          { ar: 'ٱللَّهُ', en: 'Allah', bn: 'আল্লাহ', role: { en: 'proper noun — khabar (rafʿ)', bn: 'বিশেষ নাম — খবর (রফ‘)' } },
          { ar: 'أَحَدٌ', en: 'One', bn: 'একক', role: { en: 'noun — khabar (rafʿ, tanwīn)', bn: 'বিশেষ্য — খবর (রফ‘, তানভীন)' } },
        ] },
      { ref: '112:2', trans: { en: 'Allah, the Eternal Refuge.', bn: 'আল্লাহ, অমুখাপেক্ষী চিরসত্তা।' },
        note: { en: 'A second nominal sentence: ٱللَّهُ is the mubtadaʾ (subject) and ٱلصَّمَدُ is the khabar (predicate) — both in rafʿ.', bn: 'আরেকটি নাম-বাক্য: ٱللَّهُ মুবতাদা (উদ্দেশ্য) ও ٱلصَّمَدُ খবর (বিধেয়) — দুটোই রফ‘।' },
        words: [
          { ar: 'ٱللَّهُ', en: 'Allah', bn: 'আল্লাহ', role: { en: 'mubtadaʾ (rafʿ)', bn: 'মুবতাদা (রফ‘)' } },
          { ar: 'ٱلصَّمَدُ', en: 'the Eternal Refuge', bn: 'অমুখাপেক্ষী', hl: true, role: { en: 'khabar / predicate (rafʿ)', bn: 'খবর / বিধেয় (রফ‘)' } },
        ] },
      { ref: '112:3', trans: { en: 'He neither begets nor is born.', bn: 'তিনি জন্ম দেননি এবং জন্মগ্রহণ করেননি।' },
        note: { en: 'لَمْ + a present verb gives a PAST negation. يَلِدْ is active ("beget"); يُولَدْ is the passive ("is born") — the doer is unnamed.', bn: 'لَمْ + বর্তমান ক্রিয়া অতীত নেতিবাচক দেয়। يَلِدْ কর্তৃবাচ্য ("জন্ম দেওয়া"); يُولَدْ কর্মবাচ্য ("জন্মগ্রহণ") — কর্তা অনুক্ত।' },
        words: [
          { ar: 'لَمْ', en: 'not (did)', bn: 'নি', role: { en: 'negation particle (ḥarf)', bn: 'নেতিবাচক অব্যয় (হারফ)' } },
          { ar: 'يَلِدْ', en: 'He begets', bn: 'তিনি জন্ম দেন', hl: true, role: { en: 'present verb, jazm (past negation)', bn: 'বর্তমান ক্রিয়া, জযম (অতীত নাকচ)' } },
          { ar: 'وَلَمْ', en: 'and not', bn: 'এবং নি', role: { en: 'and + negation particle', bn: 'ও + নেতিবাচক অব্যয়' } },
          { ar: 'يُولَدْ', en: 'is He born', bn: 'তিনি জন্মগ্রহণ করেন', role: { en: 'passive present verb (majhūl)', bn: 'কর্মবাচ্য বর্তমান ক্রিয়া (মাজহূল)' } },
        ] },
      { ref: '112:4', trans: { en: 'Nor is there to Him any equivalent.', bn: 'আর তাঁর সমতুল্য কেউ নেই।' },
        note: { en: 'يَكُن is from كَانَ (a sister of كَانَ). Its subject (ism) is أَحَدٌۢ ("anyone", rafʿ) and its predicate (khabar) is كُفُوًا ("an equal", naṣb, brought forward). لَّهُۥ = the preposition لِ + "him".', bn: 'يَكُن হলো كَانَ থেকে (كَانَ-এর বোন)। এর উদ্দেশ্য (ইসম) أَحَدٌۢ ("কেউ", রফ‘) ও বিধেয় (খবর) كُفُوًا ("সমতুল্য", নসব, আগে আনা)। لَّهُۥ = অব্যয় لِ + "তাঁর"।' },
        words: [
          { ar: 'وَلَمْ', en: 'And not', bn: 'আর নি', role: { en: 'and + negation particle', bn: 'ও + নেতিবাচক অব্যয়' } },
          { ar: 'يَكُن', en: 'there is', bn: 'আছে', hl: true, role: { en: 'verb كَانَ, jazm', bn: 'ক্রিয়া كَانَ, জযম' } },
          { ar: 'لَّهُۥ', en: 'to Him', bn: 'তাঁর জন্য', role: { en: 'preposition + pronoun', bn: 'অব্যয় + সর্বনাম' } },
          { ar: 'كُفُوًا', en: 'equivalent', bn: 'সমতুল্য', role: { en: 'khabar of كَانَ (naṣb)', bn: 'كَانَ-এর খবর (নসব)' } },
          { ar: 'أَحَدٌۢ', en: 'any one', bn: 'কেউ', role: { en: 'ism of كَانَ (rafʿ)', bn: 'كَانَ-এর ইসম (রফ‘)' } },
        ] },
    ],
    practice: {
      q: { en: 'In 112:3, why does يُولَدْ mean "is born" rather than "gives birth"?', bn: '১১২:৩-এ يُولَدْ মানে "জন্মগ্রহণ করেন", "জন্ম দেন" নয় কেন?' },
      options: [{ en: 'it is a passive verb (majhūl)', bn: 'এটি কর্মবাচ্য ক্রিয়া (মাজহূল)' }, { en: 'it is a command', bn: 'এটি আদেশ' }, { en: 'it is a noun', bn: 'এটি বিশেষ্য' }], answer: 0,
      explain: { en: 'يُولَدْ is the passive of "to beget": the action falls ON the subject, so "is born". The doer is left unnamed.', bn: 'يُولَدْ হলো "জন্ম দেওয়া"-র কর্মবাচ্য: কাজটি উদ্দেশ্যের উপর পড়ে, তাই "জন্মগ্রহণ"। কর্তা অনুক্ত থাকে।' },
    },
  },
  {
    id: 'read-kawthar', unit: 'reading', icon: '🏞️',
    title: { en: 'Reading 108:1–3 — Al-Kawthar', bn: '১০৮:১–৩ পড়া — সূরা কাউসার' },
    concept: {
      en: 'The shortest surah, in three verses: an emphatic إِنَّ with an attached pronoun and a past verb carrying an object, two commands, and a final إِنَّ sentence. Every piece appeared in earlier lessons — here we read them together.',
      bn: 'সবচেয়ে ছোট সূরা, তিন আয়াতে: একটি তাগিদপূর্ণ إِنَّ যুক্ত সর্বনাম ও কর্মবাহী অতীত ক্রিয়াসহ, দুটি আদেশ, এবং শেষে একটি إِنَّ বাক্য। প্রতিটি অংশ আগের পাঠে এসেছে — এখানে একসাথে পড়ি।',
    },
    examples: [
      { ref: '108:1', trans: { en: 'Indeed, We have given you al-Kawthar.', bn: 'নিশ্চয় আমরা তোমাকে কাউসার দিয়েছি।' },
        note: { en: 'إِنَّآ = إِنَّ ("indeed") + نَا ("we"). أَعْطَيْنَٰكَ = the past verb أَعْطَيْنَا ("We gave") + the object ‑كَ ("you"). ٱلْكَوْثَرَ is the object (mafʿūl bihi) in naṣb.', bn: 'إِنَّآ = إِنَّ ("নিশ্চয়") + نَا ("আমরা")। أَعْطَيْنَٰكَ = অতীত ক্রিয়া أَعْطَيْنَا ("আমরা দিলাম") + কর্ম ‑كَ ("তোমাকে")। ٱلْكَوْثَرَ কর্ম (মাফ‘ূল বিহি) নসব-এ।' },
        words: [
          { ar: 'إِنَّآ', en: 'Indeed We', bn: 'নিশ্চয় আমরা', role: { en: 'emphasis particle + pronoun', bn: 'তাগিদ-অব্যয় + সর্বনাম' } },
          { ar: 'أَعْطَيْنَٰكَ', en: 'We gave you', bn: 'আমরা তোমাকে দিয়েছি', hl: true, role: { en: 'past verb + object pronoun', bn: 'অতীত ক্রিয়া + কর্ম সর্বনাম' } },
          { ar: 'ٱلْكَوْثَرَ', en: 'al-Kawthar', bn: 'কাউসার', role: { en: 'object — mafʿūl bihi (naṣb)', bn: 'কর্ম — মাফ‘ূল বিহি (নসব)' } },
        ] },
      { ref: '108:2', trans: { en: 'So pray to your Lord and sacrifice.', bn: 'অতএব তোমার রবের উদ্দেশ্যে সালাত পড়ো ও কুরবানি করো।' },
        note: { en: 'Two commands joined by فَـ and وَ. لِرَبِّكَ = the preposition لِ + رَبّ (jarr) + ‑كَ ("your") — a possessive pronoun on a genitive noun.', bn: 'فَـ ও وَ দিয়ে জোড়া দুটি আদেশ। لِرَبِّكَ = অব্যয় لِ + رَبّ (জর) + ‑كَ ("তোমার") — জর বিশেষ্যে সম্বন্ধ-সর্বনাম।' },
        words: [
          { ar: 'فَصَلِّ', en: 'So pray', bn: 'অতএব সালাত পড়ো', hl: true, role: { en: 'connector + command verb (amr)', bn: 'সংযোজক + আদেশ ক্রিয়া (আমর)' } },
          { ar: 'لِرَبِّكَ', en: 'to your Lord', bn: 'তোমার রবের জন্য', role: { en: 'preposition + noun (jarr) + pronoun', bn: 'অব্যয় + বিশেষ্য (জর) + সর্বনাম' } },
          { ar: 'وَٱنْحَرْ', en: 'and sacrifice', bn: 'ও কুরবানি করো', role: { en: 'and + command verb (amr)', bn: 'ও + আদেশ ক্রিয়া (আমর)' } },
        ] },
      { ref: '108:3', trans: { en: 'Indeed, your enemy is the one cut off.', bn: 'নিশ্চয় তোমার শত্রুই নির্বংশ।' },
        note: { en: 'إِنَّ puts its subject شَانِئَكَ ("your hater") into naṣb. Then هُوَ ٱلْأَبْتَرُ is a nominal predicate: "he (is) the cut-off one" (rafʿ).', bn: 'إِنَّ তার উদ্দেশ্য شَانِئَكَ ("তোমার বিদ্বেষী")-কে নসব করে। এরপর هُوَ ٱلْأَبْتَرُ একটি নাম-বিধেয়: "সে (হলো) নির্বংশ" (রফ‘)।' },
        words: [
          { ar: 'إِنَّ', en: 'Indeed', bn: 'নিশ্চয়', role: { en: 'emphasis particle (ḥarf)', bn: 'তাগিদ-অব্যয় (হারফ)' } },
          { ar: 'شَانِئَكَ', en: 'your enemy', bn: 'তোমার শত্রু', hl: true, role: { en: 'ism of إِنَّ (naṣb) + pronoun', bn: 'إِنَّ-এর ইসম (নসব) + সর্বনাম' } },
          { ar: 'هُوَ', en: 'he (is)', bn: 'সে', role: { en: 'detached pronoun', bn: 'বিচ্ছিন্ন সর্বনাম' } },
          { ar: 'ٱلْأَبْتَرُ', en: 'the one cut off', bn: 'নির্বংশ', role: { en: 'khabar / predicate (rafʿ)', bn: 'খবর / বিধেয় (রফ‘)' } },
        ] },
    ],
    practice: {
      q: { en: 'In 108:3, the word شَانِئَكَ is in naṣb because it is the subject of…', bn: '১০৮:৩-এ شَانِئَكَ শব্দটি নসব-এ কারণ এটি কার উদ্দেশ্য…' },
      options: [{ en: 'إِنَّ ("indeed")', bn: 'إِنَّ ("নিশ্চয়")' }, { en: 'a preposition', bn: 'একটি অব্যয়' }, { en: 'a command verb', bn: 'একটি আদেশ ক্রিয়া' }], answer: 0,
      explain: { en: 'إِنَّ makes its following subject (its ism) accusative (naṣb) — here شَانِئَكَ.', bn: 'إِنَّ তার পরের উদ্দেশ্য (তার ইসম)-কে নসব করে — এখানে شَانِئَكَ।' },
    },
  },
  {
    id: 'read-asr', unit: 'reading', icon: '⏳',
    title: { en: 'Reading 103:1–3 — Al-‘Asr', bn: '১০৩:১–৩ পড়া — সূরা আসর' },
    concept: {
      en: 'Al-‘Asr opens with an oath, states a sweeping claim with إِنَّ, then carves out an exception with إِلَّا followed by a relative clause of four verbs. Reading it end to end ties together oaths, إِنَّ, exception and relative pronouns.',
      bn: 'সূরা আসর শুরু হয় শপথ দিয়ে, إِنَّ দিয়ে একটি ব্যাপক দাবি করে, তারপর إِلَّا দিয়ে একটি ব্যতিক্রম বের করে যার পরে চারটি ক্রিয়ার সম্বন্ধ-বাক্য। পুরোটা পড়লে শপথ, إِنَّ, ব্যতিক্রম ও সম্বন্ধবাচক সর্বনাম একসাথে জোড়া লাগে।',
    },
    examples: [
      { ref: '103:1', trans: { en: 'By time.', bn: 'সময়ের শপথ।' },
        note: { en: 'The وَ here is the wāw of oath (qasam); it puts ٱلْعَصْر into the genitive (jarr): وَٱلْعَصْرِ.', bn: 'এখানকার وَ হলো শপথের ওয়াও (কসম); এটি ٱلْعَصْر-কে জর করে: وَٱلْعَصْرِ।' },
        words: [
          { ar: 'وَٱلْعَصْرِ', en: 'By time', bn: 'সময়ের শপথ', hl: true, role: { en: 'oath particle + noun (jarr)', bn: 'শপথ-অব্যয় + বিশেষ্য (জর)' } },
        ] },
      { ref: '103:2', trans: { en: 'Indeed, mankind is in loss.', bn: 'নিশ্চয় মানুষ ক্ষতির মধ্যে।' },
        note: { en: 'إِنَّ makes ٱلْإِنسَٰنَ its subject in naṣb. لَفِى = the emphatic لَـ ("surely") + the preposition فِى, which puts خُسْرٍ into jarr.', bn: 'إِنَّ ٱلْإِنسَٰنَ-কে তার উদ্দেশ্য হিসেবে নসব করে। لَفِى = তাগিদের لَـ ("অবশ্যই") + অব্যয় فِى, যা خُسْرٍ-কে জর করে।' },
        words: [
          { ar: 'إِنَّ', en: 'Indeed', bn: 'নিশ্চয়', role: { en: 'emphasis particle (ḥarf)', bn: 'তাগিদ-অব্যয় (হারফ)' } },
          { ar: 'ٱلْإِنسَٰنَ', en: 'mankind', bn: 'মানুষ', hl: true, role: { en: 'ism of إِنَّ (naṣb)', bn: 'إِنَّ-এর ইসম (নসব)' } },
          { ar: 'لَفِى', en: 'is surely in', bn: 'অবশ্যই মধ্যে', role: { en: 'emphatic lām + preposition', bn: 'তাগিদের লাম + অব্যয়' } },
          { ar: 'خُسْرٍ', en: 'loss', bn: 'ক্ষতি', role: { en: 'noun (jarr, tanwīn)', bn: 'বিশেষ্য (জর, তানভীন)' } },
        ] },
      { ref: '103:3', trans: { en: 'Except those who believe, do righteous deeds, and urge one another to truth and to patience.', bn: 'তারা ছাড়া যারা ঈমান আনে, সৎকর্ম করে, এবং পরস্পরকে সত্য ও ধৈর্যের উপদেশ দেয়।' },
        note: { en: 'إِلَّا ("except") carves out the saved group. ٱلَّذِينَ ("those who") opens a relative clause of past verbs: ءَامَنُوا۟, عَمِلُوا۟, تَوَاصَوْا۟. بِـ makes ٱلْحَقِّ and ٱلصَّبْرِ genitive.', bn: 'إِلَّا ("ছাড়া") রক্ষাপ্রাপ্ত দলটিকে আলাদা করে। ٱلَّذِينَ ("যারা") অতীত ক্রিয়ার সম্বন্ধ-বাক্য খোলে: ءَامَنُوا۟, عَمِلُوا۟, تَوَاصَوْا۟। بِـ ٱلْحَقِّ ও ٱلصَّبْرِ-কে জর করে।' },
        words: [
          { ar: 'إِلَّا', en: 'except', bn: 'ছাড়া', hl: true, role: { en: 'exception particle (ḥarf)', bn: 'ব্যতিক্রম-অব্যয় (হারফ)' } },
          { ar: 'ٱلَّذِينَ', en: 'those who', bn: 'যারা', role: { en: 'relative pronoun', bn: 'সম্বন্ধবাচক সর্বনাম' } },
          { ar: 'ءَامَنُوا۟', en: 'believe', bn: 'ঈমান আনে', role: { en: 'past verb', bn: 'অতীত ক্রিয়া' } },
          { ar: 'وَعَمِلُوا۟', en: 'and do', bn: 'ও করে', role: { en: 'and + past verb', bn: 'ও + অতীত ক্রিয়া' } },
          { ar: 'ٱلصَّٰلِحَٰتِ', en: 'righteous deeds', bn: 'সৎকর্ম', role: { en: 'object — mafʿūl bihi', bn: 'কর্ম — মাফ‘ূল বিহি' } },
          { ar: 'وَتَوَاصَوْا۟', en: 'and urge one another', bn: 'ও পরস্পরকে উপদেশ দেয়', role: { en: 'and + past verb', bn: 'ও + অতীত ক্রিয়া' } },
          { ar: 'بِٱلْحَقِّ', en: 'to truth', bn: 'সত্যের', role: { en: 'preposition + noun (jarr)', bn: 'অব্যয় + বিশেষ্য (জর)' } },
          { ar: 'وَتَوَاصَوْا۟', en: 'and urge one another', bn: 'ও পরস্পরকে উপদেশ দেয়', role: { en: 'and + past verb', bn: 'ও + অতীত ক্রিয়া' } },
          { ar: 'بِٱلصَّبْرِ', en: 'to patience', bn: 'ধৈর্যের', role: { en: 'preposition + noun (jarr)', bn: 'অব্যয় + বিশেষ্য (জর)' } },
        ] },
    ],
    practice: {
      q: { en: 'In 103:3, إِلَّا is a particle of…', bn: '১০৩:৩-এ إِلَّا কোন ধরনের অব্যয়…' },
      options: [{ en: 'exception (istithnāʾ)', bn: 'ব্যতিক্রম (ইসতিসনা)' }, { en: 'negation', bn: 'নেতিবাচকতা' }, { en: 'oath', bn: 'শপথ' }], answer: 0,
      explain: { en: 'إِلَّا ("except") is the particle of exception; it excludes the believers from the loss just mentioned.', bn: 'إِلَّا ("ছাড়া") ব্যতিক্রমের অব্যয়; এটি মাত্র উল্লেখিত ক্ষতি থেকে মুমিনদের বাদ দেয়।' },
    },
  },
  {
    id: 'read-nas', unit: 'reading', icon: '🛡️',
    title: { en: 'Reading 114:1–6 — An-Nas (Mankind)', bn: '১১৪:১–৬ পড়া — সূরা নাস (মানবজাতি)' },
    concept: {
      en: 'The final surah of the Quran, seeking refuge in the Lord of mankind from the whisperer. It features three titles of Allah (رَبّ, مَلِك, إِلٰه) in iḍāfah with ٱلنَّاسِ, a relative clause with ٱلَّذِى, and a present-tense verb يُوَسْوِسُ describing the ongoing action of the whisperer.',
      bn: 'কুরআনের শেষ সূরাটি, যাতে মানবজাতির রবের কাছে আশ্রয় চাওয়া হয়েছে কুমন্ত্রণাদাতার থেকে। এতে ٱلنَّاسِ-এর সাথে ইদাফায় আল্লাহর তিনটি গুণবাচক নাম (رَبّ, مَلِك, إِلٰه) রয়েছে, ٱلَّذِى দিয়ে একটি সম্বন্ধ-বাক্য, এবং কুমন্ত্রণাদাতার চলমান কর্ম বর্ণনায় একটি বর্তমান ক্রিয়া يُوَسْوِسُ।',
    },
    examples: [
      { ref: '114:1', trans: { en: 'Say, "I seek refuge in the Lord of mankind."', bn: 'বলুন, "আশ্রয় চাই মানবজাতির রবের কাছে।"' },
        note: { en: 'قُلْ is a command (amr). أَعُوذُ is a present (muḍāriʿ) verb in rafʿ. بِرَبِّ = preposition بِ + رَبّ (jarr). ٱلنَّاسِ is the muḍāf ilayh in jarr.', bn: 'قُلْ একটি আদেশ (আমর)। أَعُوذُ বর্তমান (মুযারি) ক্রিয়া রফ‘-এ। بِرَبِّ = অব্যয় بِ + رَبّ (জর)। ٱلنَّاسِ মুদাফ ইলাইহি জর-এ।' },
        words: [
          { ar: 'قُلْ', en: 'Say', bn: 'বলুন', role: { en: 'command verb (amr)', bn: 'আদেশ ক্রিয়া (আমর)' } },
          { ar: 'أَعُوذُ', en: 'I seek refuge', bn: 'আশ্রয় চাই', hl: true, role: { en: 'present verb (muḍāriʿ, rafʿ)', bn: 'বর্তমান ক্রিয়া (মুযারি, রফ‘)' } },
          { ar: 'بِرَبِّ', en: 'in (the) Lord', bn: 'রবের কাছে', role: { en: 'preposition + noun (jarr)', bn: 'অব্যয় + বিশেষ্য (জর)' } },
          { ar: 'ٱلنَّاسِ', en: 'of mankind', bn: 'মানবজাতির', role: { en: 'muḍāf ilayh (jarr)', bn: 'মুদাফ ইলাইহি (জর)' } },
        ] },
      { ref: '114:2', trans: { en: 'The King of mankind.', bn: 'মানবজাতির বাদশাহ।' },
        note: { en: 'مَلِكِ is a second attribute (ṣifa) following رَبِّ in jarr. ٱلنَّاسِ is again muḍāf ilayh.', bn: 'مَلِكِ দ্বিতীয় গুণবাচক নাম (সিফা) যা رَبِّ-এর অনুসরণ করে জর-এ। ٱلنَّاسِ আবার মুদাফ ইলাইহি।' },
        words: [
          { ar: 'مَلِكِ', en: 'King', bn: 'বাদশাহ', hl: true, role: { en: 'adjective/attribute (ṣifa, jarr)', bn: 'বিশেষণ/গুণবাচক (সিফা, জর)' } },
          { ar: 'ٱلنَّاسِ', en: 'of mankind', bn: 'মানবজাতির', role: { en: 'muḍāf ilayh (jarr)', bn: 'মুদাফ ইলাইহি (জর)' } },
        ] },
      { ref: '114:3', trans: { en: 'The God of mankind.', bn: 'মানবজাতির উপাস্য।' },
        note: { en: 'إِلَٰهُ is the third attribute, still in jarr, continuing the iḍāfah chain with ٱلنَّاسِ.', bn: 'إِلَٰهُ তৃতীয় গুণবাচক নাম, এখনও জর-এ, ٱلنَّاسِ-এর সাথে ইদাফা শৃঙ্খল চালিয়ে যাচ্ছে।' },
        words: [
          { ar: 'إِلَٰهُ', en: 'God', bn: 'উপাস্য', role: { en: 'adjective/attribute (ṣifa, jarr)', bn: 'বিশেষণ/গুণবাচক (সিফা, জর)' } },
          { ar: 'ٱلنَّاسِ', en: 'of mankind', bn: 'মানবজাতির', role: { en: 'muḍāf ilayh (jarr)', bn: 'মুদাফ ইলাইহি (জর)' } },
        ] },
      { ref: '114:4', trans: { en: 'From the evil of the retreating whisperer.', bn: 'পশ্চাৎপসরণকারী কুমন্ত্রণাদাতার অনিষ্ট থেকে।' },
        note: { en: 'مِن شَرِّ — from + evil, a muḍāf in jarr. Then ٱلْوَسْوَاسِ is the muḍāf ilayh, followed by ٱلْخَنَّاسِ — another ṣifa describing the whisperer.', bn: 'مِن شَرِّ — থেকে + অনিষ্ট, একটি মুদাফ জর-এ। তারপর ٱلْوَسْوَاسِ মুদাফ ইলাইহি, তারপর ٱلْخَنَّاسِ — কুমন্ত্রণাদাতার আরেকটি সিফা।' },
        words: [
          { ar: 'مِن', en: 'from', bn: 'থেকে', role: { en: 'preposition (ḥarf jarr)', bn: 'অব্যয় (হারফ জর)' } },
          { ar: 'شَرِّ', en: 'evil', bn: 'অনিষ্ট', role: { en: 'noun (muḍāf, jarr)', bn: 'বিশেষ্য (মুদাফ, জর)' } },
          { ar: 'ٱلْوَسْوَاسِ', en: 'the whisperer', bn: 'কুমন্ত্রণাদাতা', hl: true, role: { en: 'muḍāf ilayh (jarr)', bn: 'মুদাফ ইলাইহি (জর)' } },
          { ar: 'ٱلْخَنَّاسِ', en: 'the retreating one', bn: 'পশ্চাৎপসরণকারী', role: { en: 'adjective (ṣifa, jarr)', bn: 'বিশেষণ (সিফা, জর)' } },
        ] },
      { ref: '114:5', trans: { en: 'Who whispers in the hearts of mankind.', bn: 'যে কুমন্ত্রণা দেয় মানুষের অন্তরে।' },
        note: { en: 'ٱلَّذِى — a relative pronoun. يُوَسْوِسُ — a present verb (muḍāriʿ) in rafʿ. فِى صُدُورِ — preposition + noun (jarr). ٱلنَّاسِ — muḍāf ilayh.', bn: 'ٱلَّذِى — সম্বন্ধবাচক সর্বনাম। يُوَسْوِسُ — বর্তমান ক্রিয়া (মুযারি) রফ‘-এ। فِى صُدُورِ — অব্যয় + বিশেষ্য (জর)। ٱلنَّاسِ — মুদাফ ইলাইহি।' },
        words: [
          { ar: 'ٱلَّذِى', en: 'who', bn: 'যে', role: { en: 'relative pronoun', bn: 'সম্বন্ধবাচক সর্বনাম' } },
          { ar: 'يُوَسْوِسُ', en: 'whispers', bn: 'কুমন্ত্রণা দেয়', hl: true, role: { en: 'present verb (muḍāriʿ, rafʿ)', bn: 'বর্তমান ক্রিয়া (মুযারি, রফ‘)' } },
          { ar: 'فِى', en: 'in', bn: 'মধ্যে', role: { en: 'preposition (ḥarf jarr)', bn: 'অব্যয় (হারফ জর)' } },
          { ar: 'صُدُورِ', en: 'the hearts', bn: 'অন্তর', role: { en: 'noun (jarr)', bn: 'বিশেষ্য (জর)' } },
          { ar: 'ٱلنَّاسِ', en: 'of mankind', bn: 'মানবজাতির', role: { en: 'muḍāf ilayh (jarr)', bn: 'মুদাফ ইলাইহি (জর)' } },
        ] },
      { ref: '114:6', trans: { en: 'From among the jinn and mankind.', bn: 'জিন ও মানুষের মধ্য থেকে।' },
        note: { en: 'مِنَ — another occurrence of "from". ٱلْجِنَّةِ and ٱلنَّاسِ — both in jarr after مِنَ, joined by وَ.', bn: 'مِنَ — "থেকে"-র আরেকটি ব্যবহার। ٱلْجِنَّةِ ও ٱلنَّاسِ — উভয়েই مِنَ-এর পর জর-এ, وَ দিয়ে যুক্ত।' },
        words: [
          { ar: 'مِنَ', en: 'from', bn: 'থেকে', role: { en: 'preposition (ḥarf jarr)', bn: 'অব্যয় (হারফ জর)' } },
          { ar: 'ٱلْجِنَّةِ', en: 'the jinn', bn: 'জিন', role: { en: 'noun (jarr)', bn: 'বিশেষ্য (জর)' } },
          { ar: 'وَٱلنَّاسِ', en: 'and mankind', bn: 'ও মানুষ', role: { en: 'and + noun (jarr)', bn: 'ও + বিশেষ্য (জর)' } },
        ] },
    ],
    practice: {
      q: { en: 'In 114:1, what type of verb is أَعُوذُ?', bn: '১১৪:১-এ أَعُوذُ কোন ধরনের ক্রিয়া?' },
      options: [{ en: 'Past (māḍī)', bn: 'অতীত (মাদি)' }, { en: 'Present (muḍāriʿ)', bn: 'বর্তমান (মুযারি)' }, { en: 'Command (amr)', bn: 'আদেশ (আমর)' }], answer: 1,
      explain: { en: 'أَعُوذُ is a present-tense verb (muḍāriʿ) in rafʿ — "I seek refuge."', bn: 'أَعُوذُ একটি বর্তমানকালের ক্রিয়া (মুযারি) রফ‘-এ — "আমি আশ্রয় চাই।"' },
    },
  },
  {
    id: 'read-falaq', unit: 'reading', icon: '🌄',
    title: { en: 'Reading 113:1–5 — Al-Falaq (The Daybreak)', bn: '১১৩:১–৫ পড়া — সূরা ফালাক (প্রভাত)' },
    concept: {
      en: 'A surah of seeking refuge from four specific evils. It uses the command قُلْ, the present verb أَعُوذُ, prepositions (بِ, مِن), a relative clause, the comparative شَرّ in iḍāfah, and ḥāl-like descriptive phrases in jarr.',
      bn: 'চারটি নির্দিষ্ট অনিষ্ট থেকে আশ্রয় চাওয়ার সূরা। এতে আদেশ قُلْ, বর্তমান ক্রিয়া أَعُوذُ, অব্যয় (بِ, مِن), সম্বন্ধ-বাক্য, ইদাফায় তুলনামূলক شَرّ, এবং জর-এ হাল-সদৃশ বর্ণনামূলক বাক্যাংশ রয়েছে।',
    },
    examples: [
      { ref: '113:1', trans: { en: 'Say, "I seek refuge in the Lord of the daybreak."', bn: 'বলুন, "আশ্রয় চাই প্রভাতের রবের কাছে।"' },
        note: { en: 'قُلْ amr, أَعُوذُ muḍāriʿ. بِرَبِّ = preposition + noun (jarr). ٱلْفَلَقِ = muḍāf ilayh (jarr).', bn: 'قُلْ আমর, أَعُوذُ মুযারি। بِرَبِّ = অব্যয় + বিশেষ্য (জর)। ٱلْفَلَقِ = মুদাফ ইলাইহি (জর)।' },
        words: [
          { ar: 'قُلْ', en: 'Say', bn: 'বলুন', role: { en: 'command (amr)', bn: 'আদেশ (আমর)' } },
          { ar: 'أَعُوذُ', en: 'I seek refuge', bn: 'আশ্রয় চাই', role: { en: 'present verb (muḍāriʿ, rafʿ)', bn: 'বর্তমান ক্রিয়া (মুযারি, রফ‘)' } },
          { ar: 'بِرَبِّ', en: 'in (the) Lord', bn: 'রবের কাছে', role: { en: 'preposition + noun (jarr)', bn: 'অব্যয় + বিশেষ্য (জর)' } },
          { ar: 'ٱلْفَلَقِ', en: 'the daybreak', bn: 'প্রভাত', hl: true, role: { en: 'muḍāf ilayh (jarr)', bn: 'মুদাফ ইলাইহি (জর)' } },
        ] },
      { ref: '113:2', trans: { en: 'From the evil of what He created.', bn: 'তিনি যা সৃষ্টি করেছেন তার অনিষ্ট থেকে।' },
        note: { en: 'مِن شَرِّ — from + evil (muḍāf, jarr). Then مَا is a relative pronoun — "what He created". خَلَقَ is a past verb.', bn: 'مِن شَرِّ — থেকে + অনিষ্ট (মুদাফ, জর)। তারপর مَا একটি সম্বন্ধবাচক সর্বনাম — "তিনি যা সৃষ্টি করেছেন"। خَلَقَ একটি অতীত ক্রিয়া।' },
        words: [
          { ar: 'مِن', en: 'from', bn: 'থেকে', role: { en: 'preposition (ḥarf jarr)', bn: 'অব্যয় (হারফ জর)' } },
          { ar: 'شَرِّ', en: 'evil', bn: 'অনিষ্ট', hl: true, role: { en: 'noun (muḍāf, jarr)', bn: 'বিশেষ্য (মুদাফ, জর)' } },
          { ar: 'مَا', en: 'what', bn: 'যা', role: { en: 'relative pronoun', bn: 'সম্বন্ধবাচক সর্বনাম' } },
          { ar: 'خَلَقَ', en: 'He created', bn: 'সৃষ্টি করেছেন', role: { en: 'past verb (māḍī)', bn: 'অতীত ক্রিয়া (মাদি)' } },
        ] },
      { ref: '113:3', trans: { en: 'And from the evil of the darkness when it settles.', bn: 'এবং অন্ধকারের অনিষ্ট থেকে যখন তা গভীর হয়।' },
        note: { en: 'غَاسِقٍ is an active participle (ism al-fāʿil) in jarr after مِن — describing the darkness that "intrudes". إِذَا وَقَبَ = "when it enters" — a temporal clause.', bn: 'غَاسِقٍ একটি ক্রিয়াবাচক বিশেষ্য (ইসমুল ফায়িল) যা مِن-এর পর জর-এ — অন্ধকারকে বর্ণনা করে যা "প্রবেশ করে"। إِذَا وَقَبَ = "যখন তা প্রবেশ করে" — একটি সময়বাচক বাক্যাংশ।' },
        words: [
          { ar: 'وَمِن', en: 'and from', bn: 'এবং থেকে', role: { en: 'and + preposition', bn: 'ও + অব্যয়' } },
          { ar: 'شَرِّ', en: 'evil', bn: 'অনিষ্ট', role: { en: 'noun (muḍāf, jarr)', bn: 'বিশেষ্য (মুদাফ, জর)' } },
          { ar: 'غَاسِقٍ', en: 'the darkness', bn: 'অন্ধকার', hl: true, role: { en: 'active participle (ism al-fāʿil, jarr)', bn: 'ক্রিয়াবাচক বিশেষ্য (ইসমুল ফায়িল, জর)' } },
          { ar: 'إِذَا', en: 'when', bn: 'যখন', role: { en: 'temporal adverb', bn: 'সময়বাচক ক্রিয়াবিশেষণ' } },
          { ar: 'وَقَبَ', en: 'it settles/enters', bn: 'গভীর হয়/প্রবেশ করে', role: { en: 'past verb (māḍī)', bn: 'অতীত ক্রিয়া (মাদি)' } },
        ] },
      { ref: '113:4', trans: { en: 'And from the evil of those who blow on knots.', bn: 'এবং গ্রন্থিতে ফুঁৎকার দেওয়িনীদের অনিষ্ট থেকে।' },
        note: { en: 'شَرِّ again in the iḍāfah chain. ٱلنَّفَّٰثَٰتِ is an intensive active participle ("those who blow repeatedly") in jarr, followed by فِى ٱلْعُقَدِ = preposition + noun (jarr).', bn: 'شَرِّ আবার ইদাফা শৃঙ্খলে। ٱلنَّفَّٰثَٰتِ একটি তীব্রতাবাচক ক্রিয়াবাচক বিশেষ্য ("যারা বারবার ফুঁ দেয়") জর-এ, তারপর فِى ٱلْعُقَدِ = অব্যয় + বিশেষ্য (জর)।' },
        words: [
          { ar: 'وَمِن', en: 'and from', bn: 'এবং থেকে', role: { en: 'and + preposition', bn: 'ও + অব্যয়' } },
          { ar: 'شَرِّ', en: 'evil', bn: 'অনিষ্ট', role: { en: 'noun (muḍāf, jarr)', bn: 'বিশেষ্য (মুদাফ, জর)' } },
          { ar: 'ٱلنَّفَّٰثَٰتِ', en: 'those who blow', bn: 'ফুঁৎকারদাত্রী', hl: true, role: { en: 'intensive active participle (jarr)', bn: 'তীব্রতাবাচক ক্রিয়াবাচক বিশেষ্য (জর)' } },
          { ar: 'فِى', en: 'on', bn: 'মধ্যে', role: { en: 'preposition (ḥarf jarr)', bn: 'অব্যয় (হারফ জর)' } },
          { ar: 'ٱلْعُقَدِ', en: 'knots', bn: 'গ্রন্থি', role: { en: 'noun (jarr)', bn: 'বিশেষ্য (জর)' } },
        ] },
      { ref: '113:5', trans: { en: 'And from the evil of an envier when he envies.', bn: 'এবং হিংসুকের অনিষ্ট থেকে যখন সে হিংসা করে।' },
        note: { en: 'حَاسِدٍ — an active participle in jarr. إِذَا حَسَدَ = "when he envies" — the same إِذَا temporal clause structure as verse 3.', bn: 'حَاسِدٍ — একটি ক্রিয়াবাচক বিশেষ্য জর-এ। إِذَا حَسَدَ = "যখন সে হিংসা করে" — আয়াত ৩-এর মতো একই إِذَا সময়বাচক বাক্য গঠন।' },
        words: [
          { ar: 'وَمِن', en: 'and from', bn: 'এবং থেকে', role: { en: 'and + preposition', bn: 'ও + অব্যয়' } },
          { ar: 'شَرِّ', en: 'evil', bn: 'অনিষ্ট', role: { en: 'noun (muḍāf, jarr)', bn: 'বিশেষ্য (মুদাফ, জর)' } },
          { ar: 'حَاسِدٍ', en: 'an envier', bn: 'হিংসুক', hl: true, role: { en: 'active participle (ism al-fāʿil, jarr)', bn: 'ক্রিয়াবাচক বিশেষ্য (ইসমুল ফায়িল, জর)' } },
          { ar: 'إِذَا', en: 'when', bn: 'যখন', role: { en: 'temporal adverb', bn: 'সময়বাচক ক্রিয়াবিশেষণ' } },
          { ar: 'حَسَدَ', en: 'he envies', bn: 'হিংসা করে', role: { en: 'past verb (māḍī)', bn: 'অতীত ক্রিয়া (মাদি)' } },
        ] },
    ],
    practice: {
      q: { en: 'In 113:2, what is شَرِّ in grammatical terms?', bn: '১১৩:২-এ شَرِّ ব্যাকরণিক দিক থেকে কী?' },
      options: [{ en: 'muḍāf (possessed noun, jarr)', bn: 'মুদাফ (সম্বন্ধপদ, জর)' }, { en: 'fāʿil (doer, rafʿ)', bn: 'ফা‘িল (কর্তা, রফ‘)' }, { en: 'mafʿūl (object, naṣb)', bn: 'মাফ‘ূল (কর্ম, নসব)' }], answer: 0,
      explain: { en: 'شَرِّ is the muḍāf (possessed noun) in the iḍāfah chain — it is in jarr because of the preceding preposition مِن.', bn: 'شَرِّ ইদাফা শৃঙ্খলে মুদাফ (সম্বন্ধপদ) — এটি পূর্ববর্তী অব্যয় مِن-এর কারণে জর-এ রয়েছে।' },
    },
  },
  {
    id: 'read-fatiha', unit: 'reading', icon: '👑',
    title: { en: 'Reading 1:1–7 — Al-Fatiha (The Opener)', bn: '১:১–৭ পড়া — সূরা ফাতিহা (সূচনা)' },
    concept: {
      en: 'The most-recited surah in the Quran, compulsory in every rakʿah. It is a complete lesson in iḍāfah, nominal sentences, two types of predicate (مِن after a comparative), relative clauses, and the naṣb of adverbs. Every word appears in earlier lessons; here we see how they combine into a flowing prayer.',
      bn: 'কুরআনের সবচেয়ে বেশি পঠিত সূরা, প্রতি রাকাতে আবশ্যক। এটি ইদাফা, নাম-বাক্য, দুটি প্রকারের বিধেয় (তুলনামূলকের পর مِن), সম্বন্ধ-বাক্য এবং ক্রিয়াবিশেষণের নসব-এর একটি সম্পূর্ণ পাঠ। প্রতিটি শব্দ আগের পাঠে এসেছে; এখানে দেখি কীভাবে তারা একটি প্রবাহিত প্রার্থনায় মিলিত হয়।',
    },
    examples: [
      { ref: '1:1', trans: { en: 'In the name of Allah, the Most Gracious, the Most Merciful.', bn: 'শুরু করছি আল্লাহর নামে, যিনি পরম করুণাময়, অতি দয়ালু।' },
        note: { en: 'بِسْمِ — a fixed contraction of بِ ("by/in") and ٱسْمِ ("name"). It is an iḍāfah muḍāf with ٱللَّهِ as the muḍāf ilayh in jarr. ٱلرَّحْمَٰنِ and ٱلرَّحِيمِ are adjectives (ṣifa) following in jarr.', bn: 'بِسْمِ — بِ ("দ্বারা/মধ্যে") ও ٱسْمِ ("নাম")-এর একটি নির্দিষ্ট সংকোচন। এটি একটি ইদাফা মুদাফ যার মুদাফ ইলাইহি ٱللَّهِ জর-এ। ٱلرَّحْمَٰنِ ও ٱلرَّحِيمِ বিশেষণ (সিফা) যা জর-এ অনুসরণ করে।' },
        words: [
          { ar: 'بِسْمِ', en: 'In (the) name', bn: 'শুরু করছি নামে', hl: true, role: { en: 'prepositional phrase — muḍāf (jarr)', bn: 'অব্যয় বাক্যাংশ — মুদাফ (জর)' } },
          { ar: 'ٱللَّهِ', en: 'of Allah', bn: 'আল্লাহর', role: { en: 'muḍāf ilayh (jarr)', bn: 'মুদাফ ইলাইহি (জর)' } },
          { ar: 'ٱلرَّحْمَٰنِ', en: 'the Most Gracious', bn: 'পরম করুণাময়', role: { en: 'adjective (ṣifa, jarr)', bn: 'বিশেষণ (সিফা, জর)' } },
          { ar: 'ٱلرَّحِيمِ', en: 'the Most Merciful', bn: 'অতি দয়ালু', role: { en: 'adjective (ṣifa, jarr)', bn: 'বিশেষণ (সিফা, জর)' } },
        ] },
      { ref: '1:2', trans: { en: 'All praise is for Allah, Lord of all worlds.', bn: 'সমস্ত প্রশংসা আল্লাহর জন্য, যিনি সকল সৃষ্টিজগতের রব।' },
        note: { en: 'ٱلْحَمْدُ — mubtadaʾ (rafʿ). لِلَّهِ — the khabar consisting of لِ + لَفْظُ ٱلْجَلَالَة (jarr). رَبِّ — a badal (substitute) or ṣifa of ٱللَّهِ in jarr. ٱلْعَٰلَمِينَ — muḍāf ilayh in jarr (broken plural).', bn: 'ٱلْحَمْدُ — মুবতাদা (রফ‘)। لِلَّهِ — খবর যা لِ + لَفْظُ ٱلْجَلَالَة (জর) নিয়ে গঠিত। رَبِّ — ٱللَّهِ-এর বদল বা সিফা জর-এ। ٱلْعَٰلَمِينَ — মুদাফ ইলাইহি জর-এ (ভগ্ন বহুবচন)।' },
        words: [
          { ar: 'ٱلْحَمْدُ', en: 'All praise', bn: 'সমস্ত প্রশংসা', role: { en: 'mubtadaʾ (subject, rafʿ)', bn: 'মুবতাদা (উদ্দেশ্য, রফ‘)' } },
          { ar: 'لِلَّهِ', en: 'is for Allah', bn: 'আল্লাহর জন্য', role: { en: 'preposition + divine name (khabar, jarr)', bn: 'অব্যয় + আল্লাহর নাম (খবর, জর)' } },
          { ar: 'رَبِّ', en: 'Lord', bn: 'রব', hl: true, role: { en: 'badal/ṣifa (substitute, jarr)', bn: 'বদল/সিফা (বিকল্প, জর)' } },
          { ar: 'ٱلْعَٰلَمِينَ', en: 'of the worlds', bn: 'সৃষ্টিজগতের', role: { en: 'muḍāf ilayh — broken plural (jarr)', bn: 'মুদাফ ইলাইহি — ভগ্ন বহুবচন (জর)' } },
        ] },
      { ref: '1:3', trans: { en: 'The Most Gracious, the Most Merciful.', bn: 'পরম করুণাময়, অতি দয়ালু।' },
        note: { en: 'These two names are adjectives (ṣifa) describing ٱللَّهِ (implied from the previous verse), matching in jarr.', bn: 'এই দুটি নাম (পূর্ববর্তী আয়াতের) ٱللَّهِ-কে বর্ণনাকারী বিশেষণ (সিফা), জর-এ মিলে যায়।' },
        words: [
          { ar: 'ٱلرَّحْمَٰنِ', en: 'the Most Gracious', bn: 'পরম করুণাময়', role: { en: 'adjective (ṣifa, jarr)', bn: 'বিশেষণ (সিফা, জর)' } },
          { ar: 'ٱلرَّحِيمِ', en: 'the Most Merciful', bn: 'অতি দয়ালু', role: { en: 'adjective (ṣifa, jarr)', bn: 'বিশেষণ (সিফা, জর)' } },
        ] },
      { ref: '1:4', trans: { en: 'Master of the Day of Judgment.', bn: 'বিচার দিনের মালিক।' },
        note: { en: 'مَٰلِكِ — an active participle (ism al-fāʿil) in jarr, a ṣifa for ٱللَّهِ or a badal of رَبِّ. يَوْمِ — muḍāf (jarr). ٱلدِّينِ — muḍāf ilayh (jarr).', bn: 'مَٰلِكِ — একটি ক্রিয়াবাচক বিশেষ্য (ইসমুল ফায়িল) জর-এ, ٱللَّهِ-এর সিফা বা رَبِّ-এর বদল। يَوْمِ — মুদাফ (জর)। ٱلدِّينِ — মুদাফ ইলাইহি (জর)।' },
        words: [
          { ar: 'مَٰلِكِ', en: 'Master', bn: 'মালিক', role: { en: 'active participle (ism al-fāʿil, jarr)', bn: 'ক্রিয়াবাচক বিশেষ্য (ইসমুল ফায়িল, জর)' } },
          { ar: 'يَوْمِ', en: '(of the) Day', bn: 'দিনের', role: { en: 'muḍāf (jarr)', bn: 'মুদাফ (জর)' } },
          { ar: 'ٱلدِّينِ', en: 'of Judgment', bn: 'বিচারের', role: { en: 'muḍāf ilayh (jarr)', bn: 'মুদাফ ইলাইহি (জর)' } },
        ] },
      { ref: '1:5', trans: { en: 'You alone we worship, and You alone we ask for help.', bn: 'আমরা একমাত্র আপনারই ইবাদত করি এবং একমাত্র আপনার কাছেই সাহায্য প্রার্থনা করি।' },
        note: { en: 'إِيَّاكَ — the object (mafʿūl bihi) placed before the verb for emphasis (تقديم). نَعْبُدُ — present verb (muḍāriʿ) rafʿ. نَسْتَعِينُ — another present verb, joined by وَ.', bn: 'إِيَّاكَ — কর্ম (মাফ‘ূল বিহি) যা জোর দেওয়ার জন্য ক্রিয়ার আগে স্থাপিত (তাকদিম)। نَعْبُدُ — বর্তমান ক্রিয়া (মুযারি) রফ‘। نَسْتَعِينُ — আরেকটি বর্তমান ক্রিয়া, وَ দিয়ে যুক্ত।' },
        words: [
          { ar: 'إِيَّاكَ', en: 'You alone', bn: 'একমাত্র আপনাকে', hl: true, role: { en: 'object pronoun (mafʿūl bihi, naṣb) — fronted for emphasis', bn: 'কর্ম সর্বনাম (মাফ‘ূল বিহি, নসব) — জোর দিতে সামনে আনা' } },
          { ar: 'نَعْبُدُ', en: 'we worship', bn: 'আমরা ইবাদত করি', role: { en: 'present verb (muḍāriʿ, rafʿ)', bn: 'বর্তমান ক্রিয়া (মুযারি, রফ‘)' } },
          { ar: 'وَإِيَّاكَ', en: 'and You alone', bn: 'এবং একমাত্র আপনাকে', role: { en: 'and + object pronoun (naṣb)', bn: 'ও + কর্ম সর্বনাম (নসব)' } },
          { ar: 'نَسْتَعِينُ', en: 'we ask for help', bn: 'সাহায্য চাই', role: { en: 'present verb (muḍāriʿ, rafʿ)', bn: 'বর্তমান ক্রিয়া (মুযারি, রফ‘)' } },
        ] },
      { ref: '1:6', trans: { en: 'Guide us to the straight path.', bn: 'আমাদেরকে সরল পথ দেখান।' },
        note: { en: 'ٱهْدِنَا — command (amr) + object pronoun ‐نَا. ٱلصِّرَٰطَ — object of the hidden verb implied by the direction (mafʿūl bihi, naṣb). ٱلْمُسْتَقِيمَ — ṣifa of ٱلصِّرَٰطَ (naṣb).', bn: 'ٱهْدِنَا — আদেশ (আমর) + কর্ম সর্বনাম ‐نَا। ٱلصِّرَٰطَ — অন্তর্নিহিত দিকনির্দেশক ক্রিয়ার কর্ম (মাফ‘ূল বিহি, নসব)। ٱلْمُسْتَقِيمَ — ٱلصِّرَٰطَ-এর সিফা (নসব)।' },
        words: [
          { ar: 'ٱهْدِنَا', en: 'Guide us', bn: 'আমাদেরকে পথ দেখান', role: { en: 'command (amr) + object pronoun', bn: 'আদেশ (আমর) + কর্ম সর্বনাম' } },
          { ar: 'ٱلصِّرَٰطَ', en: 'the path', bn: 'পথ', role: { en: 'object — mafʿūl (naṣb)', bn: 'কর্ম — মাফ‘ূল (নসব)' } },
          { ar: 'ٱلْمُسْتَقِيمَ', en: 'straight', bn: 'সরল', hl: true, role: { en: 'adjective (ṣifa, naṣb)', bn: 'বিশেষণ (সিফা, নসব)' } },
        ] },
      { ref: '1:7', trans: { en: 'The path of those You have blessed — not of those who incur wrath, nor of the astray.', bn: 'তাদের পথ যাদের আপনি অনুগ্রহ করেছেন — তাদের পথ নয় যাদের উপর গজব নেমেছে, আর না পথভ্রষ্টদের।' },
        note: { en: 'صِرَٰطَ — a badal repeating the object in naṣb. Then a long relative clause starting with ٱلَّذِينَ. أَنْعَمْتَ — past verb + subject pronoun ("You blessed"). عَلَيْهِمْ — preposition + pronoun. غَيْرِ — a quasi-negative, in jarr. Then two more genitive phrases linked by وَلَا.', bn: 'صِرَٰطَ — কর্মটির পুনরাবৃত্তি বদল নসব-এ। তারপর ٱلَّذِينَ দিয়ে শুরু একটি দীর্ঘ সম্বন্ধ-বাক্য। أَنْعَمْتَ — অতীত ক্রিয়া + কর্তৃ সর্বনাম ("আপনি অনুগ্রহ করেছেন")। عَلَيْهِمْ — অব্যয় + সর্বনাম। غَيْرِ — একটি আধা-নেতিবাচক, জর-এ। তারপর وَلَا দিয়ে যুক্ত আরও দুটি জর বাক্যাংশ।' },
        words: [
          { ar: 'صِرَٰطَ', en: '(the) path', bn: 'পথ', role: { en: 'badal (substitute, naṣb)', bn: 'বদল (বিকল্প, নসব)' } },
          { ar: 'ٱلَّذِينَ', en: 'of those who', bn: 'তাদের যারা', role: { en: 'relative pronoun (jarr)', bn: 'সম্বন্ধবাচক সর্বনাম (জর)' } },
          { ar: 'أَنْعَمْتَ', en: 'You have blessed', bn: 'আপনি অনুগ্রহ করেছেন', hl: true, role: { en: 'past verb + subject pronoun (māḍī)', bn: 'অতীত ক্রিয়া + কর্তৃ সর্বনাম (মাদি)' } },
          { ar: 'عَلَيْهِمْ', en: 'upon them', bn: 'তাদের উপর', role: { en: 'preposition + pronoun', bn: 'অব্যয় + সর্বনাম' } },
          { ar: 'غَيْرِ', en: 'not (those)', bn: 'নয় (তারা)', role: { en: 'quasi-negative noun (jarr)', bn: 'আধা-নেতিবাচক বিশেষ্য (জর)' } },
          { ar: 'ٱلْمَغْضُوبِ', en: 'who incur wrath', bn: 'গজবপ্রাপ্ত', role: { en: 'passive participle (ism al-mafʿūl, jarr)', bn: 'ক্রিয়াবাচক বিশেষ্য (ইসমুল মাফ‘ূল, জর)' } },
          { ar: 'عَلَيْهِمْ', en: 'upon them', bn: 'তাদের উপর', role: { en: 'preposition + pronoun', bn: 'অব্যয় + সর্বনাম' } },
          { ar: 'وَلَا', en: 'and not', bn: 'এবং না', role: { en: 'and + negation', bn: 'ও + নেতিবাচক' } },
          { ar: 'ٱلضَّآلِّينَ', en: 'the astray', bn: 'পথভ্রষ্ট', role: { en: 'active participle (ism al-fāʿil, jarr, broken plural)', bn: 'ক্রিয়াবাচক বিশেষ্য (ইসমুল ফায়িল, জর, ভগ্ন বহুবচন)' } },
        ] },
    ],
    practice: {
      q: { en: 'In 1:2, what case is ٱلْحَمْدُ and why?', bn: '১:২-এ ٱلْحَمْدُ কী এ‘রাবে এবং কেন?' },
      options: [{ en: 'Rafʿ — it is the mubtadaʾ (subject)', bn: 'রফ‘ — এটি মুবতাদা (উদ্দেশ্য)' }, { en: 'Naṣb — it is the mafʿūl (object)', bn: 'নসব — এটি মাফ‘ূল (কর্ম)' }, { en: 'Jarr — after a preposition', bn: 'জর — অব্যয়ের পর' }], answer: 0,
      explain: { en: 'ٱلْحَمْدُ is the mubtadaʾ (subject) of a nominal sentence, so it takes rafʿ (ـُ). Its khabar is لِلَّهِ.', bn: 'ٱلْحَمْدُ নাম-বাক্যের মুবতাদা (উদ্দেশ্য), তাই এটি রফ‘ (ـُ) নেয়। এর খবর হলো لِلَّهِ।' },
    },
  },
  /* ===================== WAVE-1 NEW LESSONS ===================== */
  {
    id: 'pronoun-table', unit: 'foundations', icon: '👤',
    title: { en: 'The 12 Arabic pronouns', bn: 'আরবির ১২টি সর্বনাম' },
    concept: {
      en: 'Arabic has 12 detached pronouns grouped by person, number and gender. 1st person: أَنَا (I) and نَحْنُ (we). 2nd person has five forms for m.sg, f.sg, m.dual, m.pl and f.pl. 3rd person likewise: هُوَ (he), هِيَ (she), two dual forms, هُمْ (they m.) and هُنَّ (they f.). These stand alone as subjects or for emphasis.',
      bn: 'আরবিতে ১২টি স্বাধীন সর্বনাম রয়েছে — ব্যক্তি, সংখ্যা ও লিঙ্গ অনুযায়ী। ১ম পুরুষ: أَنَا (আমি) ও نَحْنُ (আমরা)। ২য় পুরুষে পাঁচটি রূপ। ৩য় পুরুষেও পাঁচটি রূপ: هُوَ (সে পুং.), هِيَ (সে স্ত্রী.), দুটি দ্বিবচন, هُمْ (তারা পুং.) এবং هُنَّ (তারা স্ত্রী.)।',
    },
    examples: [
      { ref: '15:9', trans: { en: 'Indeed, it is We who sent down the Reminder, and indeed, We are its Guardian.', bn: 'নিশ্চয়ই আমরাই যিকর অবতীর্ণ করেছি, এবং আমরাই এর সংরক্ষক।' },
        note: { en: 'نَحْنُ (naḥnu, "We") is the 1st-person plural pronoun — used twice here for divine emphasis.', bn: 'نَحْنُ (নাহনু, "আমরা") ১ম পুরুষ বহুবচন সর্বনাম — এখানে ঐশী জোরের জন্য দুবার।' },
        words: [
          { ar: 'إِنَّا', en: 'Indeed We', bn: 'নিশ্চয়ই আমরা', hl: true },
          { ar: 'نَحْنُ', en: 'We (emphatic)', bn: 'আমরা (জোর)', hl: true },
          { ar: 'نَزَّلْنَا', en: 'sent down', bn: 'অবতীর্ণ করেছি' },
          { ar: 'ٱلذِّكْرَ', en: 'the Reminder', bn: 'যিকর' },
        ] },
      { ref: '20:14', trans: { en: 'Indeed, I am Allah — there is no deity except Me, so worship Me.', bn: 'নিশ্চয়ই আমি আল্লাহ — আমি ছাড়া কোনো ইলাহ নেই, তাই আমার ইবাদত করো।' },
        note: { en: 'إِنَّنِي and أَنَا are both 1st-person singular pronouns used for divine self-declaration.', bn: 'إِنَّنِي ও أَنَا উভয়ই ১ম পুরুষ একবচন সর্বনাম — ঐশী আত্মঘোষণায়।' },
        words: [
          { ar: 'إِنَّنِي', en: 'Indeed I', bn: 'নিশ্চয়ই আমি', hl: true },
          { ar: 'أَنَا', en: 'I (emphatic)', bn: 'আমি (জোর)', hl: true },
          { ar: 'ٱللَّهُ', en: 'Allah', bn: 'আল্লাহ' },
          { ar: 'لَآ إِلَٰهَ إِلَّآ أَنَا۠', en: 'no deity except Me', bn: 'আমি ছাড়া কোনো ইলাহ নেই' },
        ] },
    ],
    practice: {
      q: { en: 'What is the 1st-person plural pronoun in Arabic?', bn: 'আরবিতে ১ম পুরুষ বহুবচন সর্বনাম কী?' },
      options: [{ en: 'أَنَا', bn: 'আনা' }, { en: 'نَحْنُ', bn: 'নাহনু' }, { en: 'هُمْ', bn: 'হুম' }, { en: 'هِيَ', bn: 'হিয়া' }], answer: 1,
      explain: { en: 'نَحْنُ (naḥnu) means "we" — the 1st-person plural. أَنَا means "I" (singular).', bn: 'نَحْنُ (নাহনু) মানে "আমরা" — ১ম পুরুষ বহুবচন। أَنَا মানে "আমি" (একবচন)।' },
    },
  },
  {
    id: 'ten-awzan', unit: 'forms', icon: '🔟',
    title: { en: 'The ten verb forms (awzān I–X)', bn: 'দশটি ক্রিয়ার ছাঁচ (ওযান I–X)' },
    concept: {
      en: 'Arabic verbs derive from a 3-letter root via ten patterns (awzān). Form I (فَعَلَ) is the base. Form II (فَعَّلَ) often intensifies or causes. Form III (فَاعَلَ) implies mutuality. Form IV (أَفْعَلَ) is causative. Form V (تَفَعَّلَ) is reflexive of II. Form VI (تَفَاعَلَ) is reflexive of III. Form VII (انْفَعَلَ) is passive/intransitive. Form VIII (افْتَعَلَ) is reflexive. Form IX (افْعَلَّ) covers colours/defects. Form X (اسْتَفْعَلَ) means "to seek or consider".',
      bn: 'আরবি ক্রিয়া তিন-অক্ষরের মূল থেকে দশটি ছাঁচের মাধ্যমে তৈরি হয়। রূপ I (فَعَلَ) ভিত্তি। রূপ II (فَعَّلَ) তীব্রতা বা কার্যকারণ। রূপ III (فَاعَلَ) পারস্পরিকতা। রূপ IV (أَفْعَلَ) কার্যকারণ। রূপ V (تَفَعَّلَ) II-এর প্রতিফলন। রূপ VI (تَفَاعَلَ) III-এর প্রতিফলন। রূপ VII (انْفَعَلَ) কর্মবাচ্য। রূপ VIII (افْتَعَلَ) প্রতিফলনমূলক। রূপ IX (افْعَلَّ) বর্ণ বা ত্রুটির জন্য। রূপ X (اسْتَفْعَلَ) চাওয়া বা মনে করার অর্থে।',
    },
    examples: [
      { ref: '55:2', trans: { en: 'He taught the Quran.', bn: 'তিনি কুরআন শিক্ষা দিয়েছেন।' },
        note: { en: 'عَلَّمَ is Form II (فَعَّلَ) of root ع-ل-م — "to teach" (intensive of "to know").', bn: 'عَلَّمَ হলো ع-ل-م মূলের রূপ II (فَعَّلَ) — "শিক্ষা দেওয়া"।' },
        words: [
          { ar: 'عَلَّمَ', en: 'He taught (Form II)', bn: 'তিনি শিক্ষা দিলেন (রূপ II)', hl: true },
          { ar: 'ٱلْقُرْءَانَ', en: 'the Quran', bn: 'কুরআন' },
        ] },
      { ref: '5:2', trans: { en: 'Cooperate in righteousness and piety.', bn: 'সৎকার্য ও তাকওয়ায় পরস্পর সহযোগিতা করো।' },
        note: { en: 'تَعَاوَنُوا is Form VI (تَفَاعَلَ) of ع-و-ن — "to cooperate with each other".', bn: 'تَعَاوَنُوا হলো ع-و-ن-এর রূপ VI (تَفَاعَلَ) — "পরস্পর সাহায্য করা"।' },
        words: [
          { ar: 'وَتَعَاوَنُوا۟', en: 'and cooperate (Form VI)', bn: 'এবং সহযোগিতা করো (রূপ VI)', hl: true },
          { ar: 'عَلَى ٱلْبِرِّ', en: 'in righteousness', bn: 'সৎকার্যে' },
          { ar: 'وَٱلتَّقْوَىٰ', en: 'and piety', bn: 'ও তাকওয়ায়' },
        ] },
      { ref: '1:5', trans: { en: 'You alone we ask for help.', bn: 'কেবল তোমারই সাহায্য চাই।' },
        note: { en: 'نَسْتَعِينُ is Form X (اسْتَفْعَلَ) of ع-و-ن — "we seek help" (seeking pattern).', bn: 'نَسْتَعِينُ হলো ع-و-ن-এর রূপ X (اسْتَفْعَلَ) — "আমরা সাহায্য চাই"।' },
        words: [
          { ar: 'نَسْتَعِينُ', en: 'we seek help (Form X)', bn: 'আমরা সাহায্য চাই (রূপ X)', hl: true },
        ] },
    ],
    practice: {
      q: { en: 'Form X (اسْتَفْعَلَ) typically means:', bn: 'রূপ X (اسْتَفْعَلَ) সাধারণত বোঝায়:' },
      options: [{ en: 'to intensify the action', bn: 'কাজ তীব্র করা' }, { en: 'to do mutually', bn: 'পারস্পরিক করা' }, { en: 'to seek or consider', bn: 'চাওয়া বা মনে করা' }, { en: 'colour or defect', bn: 'বর্ণ বা ত্রুটি' }], answer: 2,
      explain: { en: 'Form X conveys seeking, requesting or considering — e.g. نَسْتَعِينُ "we seek help".', bn: 'রূপ X চাওয়া বা অনুরোধের অর্থ বহন করে — যেমন نَسْتَعِينُ "আমরা সাহায্য চাই"।' },
    },
  },
  {
    id: 'sound-plural', unit: 'nouns', icon: '👥',
    title: { en: 'Sound plurals (masculine & feminine)', bn: 'সহিহ বহুবচন (পুং ও স্ত্রীলিঙ্গ)' },
    concept: {
      en: 'The <b>sound masculine plural</b> adds <b>ونَ</b> (rafʿ) or <b>ينَ</b> (naṣb/jarr) to the singular: مُسْلِم → مُسْلِمُونَ / مُسْلِمِينَ. The <b>sound feminine plural</b> replaces ة with <b>ات</b>: مُسْلِمَة → مُسْلِمَاتٌ. These are "sound" because the root letters stay intact — unlike broken plurals.',
      bn: '<b>সহিহ পুংলিঙ্গ বহুবচন</b> একবচনে <b>ونَ</b> (রফ) বা <b>ينَ</b> (নসব/জর) যোগ করে: مُسْلِم → مُسْلِمُونَ / مُسْلِمِينَ। <b>সহিহ স্ত্রীলিঙ্গ বহুবচন</b> ة-এর জায়গায় <b>ات</b> বসায়: مُسْلِمَة → مُسْلِمَاتٌ। এগুলোকে "সহিহ" বলা হয় কারণ মূল অক্ষর অপরিবর্তিত থাকে।',
    },
    examples: [
      { ref: '33:35', trans: { en: 'Indeed the Muslim men and Muslim women…', bn: 'নিশ্চয়ই মুসলিম পুরুষ ও মুসলিম নারীরা…' },
        note: { en: 'مُسْلِمِينَ is the sound masculine plural (naṣb/jarr, ينَ). وَٱلْمُسْلِمَاتِ is the sound feminine plural (ات).', bn: 'مُسْلِمِينَ হলো সহিহ পুংলিঙ্গ বহুবচন (নসব/জর, ينَ)। وَٱلْمُسْلِمَاتِ হলো সহিহ স্ত্রীলিঙ্গ বহুবচন (ات)।' },
        words: [
          { ar: 'ٱلْمُسْلِمِينَ', en: 'Muslim men (m.pl naṣb)', bn: 'মুসলিম পুরুষরা (পুং.বহু. নসব)', hl: true },
          { ar: 'وَٱلْمُسْلِمَاتِ', en: 'and Muslim women (f.pl)', bn: 'এবং মুসলিম নারীরা (স্ত্রী.বহু.)', hl: true },
        ] },
    ],
    practice: {
      q: { en: 'What ending marks the sound masculine plural in naṣb/jarr?', bn: 'নসব/জর হালতে সহিহ পুংলিঙ্গ বহুবচনের শেষাংশ কী?' },
      options: [{ en: 'ونَ', bn: 'ونَ' }, { en: 'ينَ', bn: 'ينَ' }, { en: 'ات', bn: 'ات' }, { en: 'ان', bn: 'ان' }], answer: 1,
      explain: { en: 'The sound masculine plural takes ونَ in rafʿ and ينَ in naṣb/jarr. The و is replaced by ي in oblique cases.', bn: 'সহিহ পুংলিঙ্গ বহুবচন রফ-এ ونَ এবং নসব/জর-এ ينَ নেয়।' },
    },
  },
  {
    id: 'broken-plural', unit: 'nouns', icon: '🧩',
    title: { en: 'Broken plural (jamʿ taksīr)', bn: 'ভগ্ন বহুবচন (জমউ তাকসির)' },
    concept: {
      en: 'A <b>broken plural</b> (jamʿ taksīr) reshapes the root letters into a new internal pattern rather than adding a suffix. Examples: كِتَاب → كُتُب, قَلْب → قُلُوب, رَجُل → رِجَال. There are over 30 such patterns; the most common is فُعُول (e.g. قُلُوب, بُيُوت). Readers must memorise common broken plurals since the pattern cannot always be predicted.',
      bn: '<b>ভগ্ন বহুবচন</b> (জমউ তাকসির) সাফিক্স যোগের পরিবর্তে মূল অক্ষরগুলোকে নতুন ছাঁচে পুনর্বিন্যস্ত করে। উদাহরণ: كِتَاب → كُتُب, قَلْب → قُلُوب, رَجُل → رِجَال। ৩০-এরও বেশি ছাঁচ রয়েছে; সবচেয়ে সাধারণ هو فُعُول (যেমন قُلُوب, بُيُوت)। ছাঁচ অনুমান করা যায় না বলে সাধারণ রূপগুলো মুখস্থ করতে হয়।',
    },
    examples: [
      { ref: '2:7', trans: { en: 'Allah has set a seal upon their hearts and upon their hearing.', bn: 'আল্লাহ তাদের অন্তরে ও কানে মোহর মেরে দিয়েছেন।' },
        note: { en: 'قُلُوبِهِمْ (their hearts) is the broken plural of قَلْب using the فُعُول pattern.', bn: 'قُلُوبِهِمْ (তাদের অন্তরসমূহ) হলো قَلْب-এর ভগ্ন বহুবচন — ছাঁচ فُعُول।' },
        words: [
          { ar: 'خَتَمَ ٱللَّهُ', en: 'Allah has sealed', bn: 'আল্লাহ মোহর মেরেছেন' },
          { ar: 'عَلَىٰ قُلُوبِهِمْ', en: 'upon their hearts (broken pl.)', bn: 'তাদের অন্তরে (ভগ্ন বহু.)', hl: true },
        ] },
    ],
    practice: {
      q: { en: 'What is the broken plural of قَلْب (heart)?', bn: 'قَلْب (অন্তর)-এর ভগ্ন বহুবচন কী?' },
      options: ['قَلْبَات', 'قَلْبُونَ', 'قُلُوب', 'قَالِبَات'], answer: 2,
      explain: { en: 'قُلُوب is the broken plural of قَلْب (فُعُول pattern), as in 2:7.', bn: 'قُلُوب হলো قَلْب-এর ভগ্ন বহুবচন (فُعُول ছাঁচ), যা ২:৭-এ দেখা যায়।' },
    },
  },
  {
    id: 'cases-deep', unit: 'nouns', icon: '🔄',
    title: { en: 'Three cases in practice (rafʿ, naṣb, jarr)', bn: 'তিনটি এরাব বিস্তারিত (রফ, নসব, জর)' },
    concept: {
      en: 'Arabic has three cases: <b>Rafʿ</b> (nominative, ـُ/ـٌ) for subjects and predicates; <b>Naṣb</b> (accusative, ـَ/ـً) for objects, adverbs and complements; <b>Jarr</b> (genitive, ـِ/ـٍ) after prepositions and in iḍāfah. The diacritics ḍamma, fatḥa and kasra (and their tanwīn doubles) signal the case. Dual and sound plurals use special endings rather than short vowels.',
      bn: 'আরবিতে তিনটি বিভক্তি (এরাব) শব্দের শেষ বদলায়: <b>রফ</b> (কর্তাকারক, ـُ/ـٌ) কর্তা ও বিধেয়ের জন্য; <b>নসব</b> (কর্মকারক, ـَ/ـً) কর্ম ও পরিপূরকের জন্য; <b>জর</b> (সম্পর্ককারক, ـِ/ـٍ) অব্যয়ের পর এবং ইযাফায়। যম্মা, ফাতহা ও কাসরা (এবং তাদের তানওয়িন রূপ) এরাব নির্দেশ করে।',
    },
    examples: [
      { ref: '1:2', trans: { en: 'All praise is for Allah, Lord of the worlds.', bn: 'সকল প্রশংসা আল্লাহর, জগতসমূহের পালনকর্তার।' },
        note: { en: 'ٱلْحَمْدُ (rafʿ, subject); لِلَّهِ has jarr; رَبِّ (jarr, muḍāf); ٱلْعَٰلَمِينَ (jarr, muḍāf ilayh).', bn: 'ٱلْحَمْدُ (রফ, কর্তা); رَبِّ (জর, মুযাফ); ٱلْعَٰلَمِينَ (জর, মুযাফ ইলাইহি)।' },
        words: [
          { ar: 'ٱلْحَمْدُ', en: 'praise (rafʿ, subject)', bn: 'প্রশংসা (রফ, কর্তা)', hl: true },
          { ar: 'لِلَّهِ', en: 'for Allah (jarr)', bn: 'আল্লাহর জন্য (জর)' },
          { ar: 'رَبِّ', en: 'Lord (jarr, muḍāf)', bn: 'পালনকর্তা (জর, মুযাফ)', hl: true },
          { ar: 'ٱلْعَٰلَمِينَ', en: 'worlds (jarr, muḍāf ilayh)', bn: 'জগতসমূহ (জর, মুযাফ ইলাইহি)', hl: true },
        ] },
      { ref: '2:255', trans: { en: 'Allah — there is no deity except Him, the Ever-Living, the Sustainer.', bn: 'আল্লাহ — তিনি ছাড়া কোনো ইলাহ নেই, চিরজীবন্ত, মহাঅভিভাবক।' },
        note: { en: 'ٱللَّهُ is rafʿ as mubtadaʾ; ٱلْحَيُّ ٱلْقَيُّومُ are rafʿ as khabar (predicate).', bn: 'ٱللَّهُ মুবতাদা হিসেবে রফ; ٱلْحَيُّ ٱلْقَيُّومُ রফ-এ খবর (বিধেয়) হিসেবে।' },
        words: [
          { ar: 'ٱللَّهُ', en: 'Allah (rafʿ, mubtadaʾ)', bn: 'আল্লাহ (রফ, মুবতাদা)', hl: true },
          { ar: 'لَا إِلَٰهَ', en: 'no deity (naṣb)', bn: 'কোনো ইলাহ নেই (নসব)' },
          { ar: 'ٱلْحَىُّ', en: 'Ever-Living (rafʿ, khabar)', bn: 'চিরজীবন্ত (রফ, খবর)', hl: true },
        ] },
    ],
    practice: {
      q: { en: 'Which case does a noun take after a preposition (like بِ, فِي, مِن)?', bn: 'অব্যয়ের (বি, ফি, মিন) পর বিশেষ্য কোন এরাব নেয়?' },
      options: [{ en: 'Rafʿ', bn: 'রফ' }, { en: 'Naṣb', bn: 'নসব' }, { en: 'Jarr', bn: 'জর' }], answer: 2,
      explain: { en: 'Prepositions always govern the jarr case, marked by kasra (ـِ) or its tanwīn.', bn: 'অব্যয় সবসময় জর এরাব নিয়ন্ত্রণ করে, কাসরা (ـِ) বা তানওয়িন দিয়ে চিহ্নিত।' },
    },
  },
  {
    id: 'nat', unit: 'nouns', icon: '🔗',
    title: { en: 'Noun-adjective agreement (naʿt)', bn: 'বিশেষ্য-বিশেষণ সামঞ্জস্য (নাত)' },
    concept: {
      en: 'In Arabic, an adjective (<b>naʿt / ṣifa</b>) must agree with its noun (<b>manʿūt</b>) in four ways: (1) case (rafʿ/naṣb/jarr), (2) definiteness (with/without ٱلْ), (3) gender (m./f.), and (4) number (sg/dual/pl). Human plurals take a plural adjective; non-human plurals take a feminine singular adjective.',
      bn: 'আরবিতে বিশেষণ (<b>নাত / সিফা</b>) তার বিশেষ্যের সাথে চারটি বিষয়ে সামঞ্জস্য রাখে: (১) এরাব, (২) নির্দিষ্টতা (ٱلْ সহ/ছাড়া), (৩) লিঙ্গ, (৪) সংখ্যা। মানুষের বহুবচনে বিশেষণের বহুবচন; অ-মানুষের বহুবচনে বিশেষণের স্ত্রীলিঙ্গ একবচন।',
    },
    examples: [
      { ref: '1:6', trans: { en: 'Guide us to the straight path.', bn: 'আমাদের সরল পথ দেখাও।' },
        note: { en: 'ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ: both m., definite, naṣb — four-way naʿt agreement.', bn: 'ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ: উভয়ই পুংলিঙ্গ, নির্দিষ্ট, নসব — চার-মাত্রার সামঞ্জস্য।' },
        words: [
          { ar: 'ٱلصِّرَٰطَ', en: 'the path (m.sg, naṣb)', bn: 'পথ (পুং.এক., নসব)', hl: true },
          { ar: 'ٱلْمُسْتَقِيمَ', en: 'the straight (adj, naṣb)', bn: 'সরল (বিশেষণ, নসব)', hl: true },
        ] },
      { ref: '2:7', trans: { en: 'And for them is a great punishment.', bn: 'এবং তাদের জন্য রয়েছে বড় শাস্তি।' },
        note: { en: 'عَذَابٌ عَظِيمٌ: both indefinite, rafʿ, masculine sg — four-way naʿt agreement.', bn: 'عَذَابٌ عَظِيمٌ: উভয়ই অনির্দিষ্ট, রফ, পুংলিঙ্গ একবচন — নিখুঁত নাত সামঞ্জস্য।' },
        words: [
          { ar: 'عَذَابٌ', en: 'punishment (m.sg, rafʿ)', bn: 'শাস্তি (পুং.এক., রফ)', hl: true },
          { ar: 'عَظِيمٌ', en: 'great (adj, rafʿ)', bn: 'বড় (বিশেষণ, রফ)', hl: true },
        ] },
    ],
    practice: {
      q: { en: 'An adjective for a definite masculine noun in jarr must be:', bn: 'জর হালতে নির্দিষ্ট পুংলিঙ্গ বিশেষ্যের বিশেষণ হতে হবে:' },
      options: [
        { en: 'definite, masculine, jarr', bn: 'নির্দিষ্ট, পুংলিঙ্গ, জর' },
        { en: 'indefinite, masculine, jarr', bn: 'অনির্দিষ্ট, পুংলিঙ্গ, জর' },
        { en: 'definite, feminine, rafʿ', bn: 'নির্দিষ্ট, স্ত্রীলিঙ্গ, রফ' },
      ], answer: 0,
      explain: { en: 'The adjective must mirror the noun in definiteness (ٱلْ), gender, number and case (jarr).', bn: 'বিশেষণকে নির্দিষ্টতা (ٱلْ), লিঙ্গ, সংখ্যা ও এরাব (জর)-এ বিশেষ্যের অনুসরণ করতে হবে।' },
    },
  },
  {
    id: 'dual', unit: 'nouns', icon: '2️⃣',
    title: { en: 'The dual form (muthannā)', bn: 'দ্বিবচন (মুসান্না)' },
    concept: {
      en: 'Arabic marks "exactly two" with a dual suffix: add <b>ـَانِ</b> (rafʿ) or <b>ـَيْنِ</b> (naṣb/jarr) to the singular. Feminine nouns change ة to ت first: جَنَّة → جَنَّتَانِ / جَنَّتَيْنِ. Verbs, pronouns and adjectives also have dual forms. The dual is very common in Sūrat ar-Raḥmān.',
      bn: 'আরবিতে "ঠিক দুটি" বোঝাতে দ্বিবচন প্রত্যয় ব্যবহার হয়: একবচনে <b>ـَانِ</b> (রফ) বা <b>ـَيْنِ</b> (নসব/জর) যোগ। স্ত্রীলিঙ্গ বিশেষ্যে আগে ة → ت বদলায়: جَنَّة → جَنَّتَانِ / جَنَّتَيْنِ। ক্রিয়া, সর্বনাম ও বিশেষণেও দ্বিবচন রূপ আছে। সূরা আর-রাহমানে দ্বিবচন অত্যন্ত সাধারণ।',
    },
    examples: [
      { ref: '55:46', trans: { en: 'And for whoever fears the standing before his Lord are two gardens.', bn: 'আর যে তার প্রভুর সামনে দাঁড়াতে ভয় পায়, তার জন্য দুটি বাগান।' },
        note: { en: 'جَنَّتَانِ is the dual of جَنَّة in rafʿ — ة becomes ت before adding ـَانِ.', bn: 'جَنَّتَانِ হলো جَنَّة-এর রফ দ্বিবচন — ـَانِ যোগের আগে ة, ت হয়।' },
        words: [
          { ar: 'وَلِمَنْ خَافَ', en: 'And for whoever fears', bn: 'আর যে ভয় পায়' },
          { ar: 'مَقَامَ رَبِّهِۦ', en: 'the station of his Lord', bn: 'তার প্রভুর সামনে দাঁড়ানো' },
          { ar: 'جَنَّتَانِ', en: 'two gardens (dual, rafʿ)', bn: 'দুটি বাগান (দ্বিবচন, রফ)', hl: true },
        ] },
    ],
    practice: {
      q: { en: 'What is the dual of كِتَاب (book) in naṣb/jarr?', bn: 'নসব/জর হালতে كِتَاب-এর দ্বিবচন কী?' },
      options: ['كِتَابَانِ', 'كِتَابَيْنِ', 'كِتَابَات', 'كُتُب'], answer: 1,
      explain: { en: 'Dual naṣb/jarr adds ـَيْنِ: كِتَابَيْنِ. The rafʿ form is كِتَابَانِ (ـَانِ).', bn: 'নসব/জর দ্বিবচনে ـَيْنِ যোগ হয়: كِتَابَيْنِ। রফ রূপ হলো كِتَابَانِ।' },
    },
  },
  {
    id: 'interrogatives', unit: 'particles', icon: '❓',
    title: { en: 'Question words (interrogatives)', bn: 'প্রশ্নবোধক শব্দ' },
    concept: {
      en: 'Key Quranic question words: <b>هَلْ</b> (hal) — yes/no question; <b>أَ</b> (a-) — yes/no prefix; <b>مَن</b> (man) — who (persons); <b>مَا / مَاذَا</b> (mā/mādhā) — what; <b>أَيْنَ</b> (ayna) — where; <b>كَيْفَ</b> (kayfa) — how; <b>مَتَى</b> (matā) — when; <b>لِمَ</b> (lima) — why; <b>كَمْ</b> (kam) — how many. هَلْ and أَ are the two yes/no markers; أَ is prefixed directly to the first word.',
      bn: 'প্রধান কুরআনি প্রশ্নবোধক শব্দ: <b>هَلْ</b> (হাল) — হ্যাঁ/না প্রশ্ন; <b>أَ</b> — হ্যাঁ/না উপসর্গ; <b>مَن</b> (মান) — কে; <b>مَا/مَاذَا</b> — কী; <b>أَيْنَ</b> (আইনা) — কোথায়; <b>كَيْفَ</b> (কাইফা) — কীভাবে; <b>مَتَى</b> (মাতা) — কখন; <b>لِمَ</b> (লিমা) — কেন; <b>كَمْ</b> (কাম) — কতটুকু।',
    },
    examples: [
      { ref: '2:28', trans: { en: 'How can you disbelieve in Allah when you were lifeless and He brought you to life?', bn: 'তোমরা কীভাবে আল্লাহকে অস্বীকার করো, যখন তোমরা মৃত ছিলে এবং তিনি তোমাদের জীবন দিয়েছেন?' },
        note: { en: 'كَيْفَ (kayfa) introduces a rhetorical "how?" — challenging disbelief with logic.', bn: 'كَيْفَ (কাইফা) একটি অলঙ্কারমূলক "কীভাবে?" শুরু করে — যুক্তি দিয়ে অবিশ্বাসকে চ্যালেঞ্জ করে।' },
        words: [
          { ar: 'كَيْفَ', en: 'How (kayfa)', bn: 'কীভাবে (কাইফা)', hl: true },
          { ar: 'تَكْفُرُونَ بِٱللَّهِ', en: 'do you disbelieve in Allah', bn: 'তোমরা আল্লাহকে অস্বীকার করো' },
        ] },
      { ref: '75:10', trans: { en: 'Man will say on that Day: "Where is the escape?"', bn: 'সেদিন মানুষ বলবে: "পালানোর পথ কোথায়?"' },
        note: { en: 'أَيْنَ (ayna, "where") — a desperate rhetorical question on the Day of Judgment.', bn: 'أَيْنَ (আইনা, "কোথায়") — কিয়ামতের দিনের আকুল অলঙ্কারমূলক প্রশ্ন।' },
        words: [
          { ar: 'أَيْنَ', en: 'Where (ayna)', bn: 'কোথায় (আইনা)', hl: true },
          { ar: 'ٱلْمَفَرُّ', en: 'the escape', bn: 'পালানোর পথ' },
        ] },
    ],
    practice: {
      q: { en: 'Which word asks "who?" for a person?', bn: 'কোন শব্দটি ব্যক্তি সম্পর্কে "কে?" জিজ্ঞেস করে?' },
      options: ['كَيْفَ', 'أَيْنَ', 'مَن', 'مَا'], answer: 2,
      explain: { en: 'مَن (man) is used for persons ("who?"). مَا / مَاذَا is used for things ("what?").', bn: 'مَن (মান) ব্যক্তির জন্য ("কে?")। مَا / مَاذَا বস্তুর জন্য ("কী?") ব্যবহৃত হয়।' },
    },
  },
  {
    id: 'relative-allati', unit: 'particles', icon: '🔍',
    title: { en: 'Relative pronouns: alladhī / allatī table', bn: 'সম্বন্ধবাচক সর্বনাম: اَلَّذِي / اَلَّتِي সারণি' },
    concept: {
      en: 'The Arabic relative pronoun ("who/which/that") changes for gender and number: <b>اَلَّذِي</b> (m.sg), <b>اَلَّتِي</b> (f.sg), <b>اَللَّذَانِ/اَللَّذَيْنِ</b> (m.dual), <b>اَللَّتَانِ/اَللَّتَيْنِ</b> (f.dual), <b>اَلَّذِينَ</b> (m.pl), <b>اَللَّاتِي</b> (f.pl). Each is followed by a relative clause (ṣila) containing a back-reference pronoun matching the antecedent.',
      bn: 'আরবি সম্বন্ধবাচক সর্বনাম ("যে/যিনি/যা") লিঙ্গ ও সংখ্যা অনুযায়ী বদলায়: <b>اَلَّذِي</b> (পুং.এক.), <b>اَلَّتِي</b> (স্ত্রী.এক.), <b>اَللَّذَانِ/اَللَّذَيْنِ</b> (পুং.দ্বি.), <b>اَللَّتَانِ/اَللَّتَيْنِ</b> (স্ত্রী.দ্বি.), <b>اَلَّذِينَ</b> (পুং.বহু.), <b>اَللَّاتِي</b> (স্ত্রী.বহু.)। প্রতিটির পর একটি আপেক্ষিক উপবাক্য (সিলা) আসে।',
    },
    examples: [
      { ref: '2:40', trans: { en: 'O Children of Israel, remember My favour that I bestowed upon you.', bn: 'হে বনি ইসরাঈল, আমার সেই নিয়ামতের কথা স্মরণ করো যা আমি তোমাদের দিয়েছিলাম।' },
        note: { en: 'اَلَّتِي (allatī, f.sg) agrees with نِعْمَتِيَ ("my favour") which is grammatically feminine.', bn: 'اَلَّتِي (আল্লাতি, স্ত্রী.এক.) স্ত্রীলিঙ্গ نِعْمَتِيَ (নিমাতি, "আমার নিয়ামত")-এর সাথে সামঞ্জস্যপূর্ণ।' },
        words: [
          { ar: 'نِعْمَتِيَ', en: 'My favour (f.)', bn: 'আমার নিয়ামত (স্ত্রী.)', hl: true },
          { ar: 'ٱلَّتِىٓ', en: 'which (f.sg relative)', bn: 'যা (স্ত্রী.এক. সম্বন্ধ)', hl: true },
          { ar: 'أَنْعَمْتُ عَلَيْكُمْ', en: 'I bestowed upon you', bn: 'আমি তোমাদের দিয়েছিলাম' },
        ] },
    ],
    practice: {
      q: { en: 'Which relative pronoun is used for a masculine singular antecedent?', bn: 'পুংলিঙ্গ একবচন পূর্বনির্দেশকের জন্য কোন সম্বন্ধবাচক সর্বনাম ব্যবহার হয়?' },
      options: ['اَلَّتِي', 'اَلَّذِينَ', 'اَلَّذِي', 'اَللَّاتِي'], answer: 2,
      explain: { en: 'اَلَّذِي (alladhī) is the masculine singular relative pronoun. اَلَّتِي is its feminine counterpart.', bn: 'اَلَّذِي (আল্লাযি) পুংলিঙ্গ একবচন সম্বন্ধবাচক সর্বনাম। اَلَّتِي হলো এর স্ত্রীলিঙ্গ প্রতিরূপ।' },
    },
  },
  {
    id: 'conditional-in-fa', unit: 'sentences', icon: '🔀',
    title: { en: 'Conditional sentences: in…fa (if…then)', bn: 'শর্তবাক্য: إِن...فَ (যদি...তাহলে)' },
    concept: {
      en: 'The most common conditional in the Quran uses <b>إِن</b> (if) + a past-tense verb as the condition (sharṭ), followed by <b>فَ</b> (then) + the consequence (jawāb). Both verbs can be past tense even when a future meaning is intended. <b>إِذَا</b> (idhā) is used for near-certain or temporal conditions.',
      bn: 'কুরআনে সবচেয়ে সাধারণ শর্তবাক্যে <b>إِن</b> (যদি) + অতীত ক্রিয়া শর্ত (শার্ত) হিসেবে, তারপর <b>فَ</b> (তাহলে) + ফলাফল (জাওয়াব) থাকে। ভবিষ্যৎ অর্থ হলেও উভয় ক্রিয়া অতীতকালে হতে পারে। <b>إِذَا</b> (ইযা) অনুমানিক বা সময়-নির্ভর শর্তের জন্য।',
    },
    examples: [
      { ref: '14:7', trans: { en: 'If you are grateful, I will surely increase you in favour.', bn: 'যদি তোমরা কৃতজ্ঞ হও, তাহলে আমি অবশ্যই তোমাদের আরও বাড়িয়ে দেব।' },
        note: { en: 'لَئِن شَكَرْتُمْ (condition) → لَأَزِيدَنَّكُمْ (consequence with emphatic lam and nun).', bn: 'لَئِن شَكَرْتُمْ (শর্ত) → لَأَزِيدَنَّكُمْ (তাকিদের লাম ও নুন তাওকিদ সহ ফলাফল)।' },
        words: [
          { ar: 'لَئِن', en: 'If indeed', bn: 'যদি সত্যিই', hl: true },
          { ar: 'شَكَرْتُمْ', en: 'you are grateful', bn: 'তোমরা কৃতজ্ঞ হও' },
          { ar: 'لَأَزِيدَنَّكُمْ', en: 'I will surely increase you', bn: 'আমি অবশ্যই বাড়িয়ে দেব', hl: true },
        ] },
      { ref: '99:7', trans: { en: 'Whoever does an atom-weight of good will see it.', bn: 'যে বিন্দুমাত্র ভালো কাজ করবে সে তা দেখবে।' },
        note: { en: 'فَمَن يَعْمَلْ: فَ + مَن (whoever) + jussive verb — مَن functions as a conditional particle.', bn: 'فَمَن يَعْمَلْ: فَ + مَن (যে) + মজযুম ক্রিয়া — مَن এখানে শর্তীয় অব্যয় হিসেবে।' },
        words: [
          { ar: 'فَمَن', en: 'So whoever', bn: 'তাই যে', hl: true },
          { ar: 'يَعْمَلْ مِثْقَالَ ذَرَّةٍ', en: 'does an atom-weight', bn: 'বিন্দুমাত্র করে' },
          { ar: 'خَيْرًا يَرَهُۥ', en: 'of good will see it', bn: 'ভালো সে তা দেখবে', hl: true },
        ] },
    ],
    practice: {
      q: { en: 'In an إِن conditional, what tense is typically used for the condition verb?', bn: 'إِن শর্তবাক্যে শর্ত ক্রিয়াটি সাধারণত কোন কালে হয়?' },
      options: [{ en: 'Present (muḍāriʿ)', bn: 'বর্তমান (মুযারি)' }, { en: 'Past (māḍī)', bn: 'অতীত (মাযি)' }, { en: 'Command (amr)', bn: 'আদেশ (আমর)' }], answer: 1,
      explain: { en: 'The إِن conditional typically uses a past-tense (māḍī) verb for the condition, even when the meaning is future.', bn: 'إِن শর্তবাক্যে সাধারণত অতীত (মাযি) ক্রিয়া শর্ত হিসেবে নেয়, এমনকি ভবিষ্যৎ অর্থ হলেও।' },
    },
  },
  {
    id: 'kull-quantifiers', unit: 'sentences', icon: '🌐',
    title: { en: 'Quantifiers: kull, kilā, baʿḍ as muḍāf', bn: 'পরিমাণবাচক: كُلّ, كِلَا, بَعْض ইযাফায়' },
    concept: {
      en: '<b>كُلّ</b> (every/all), <b>كِلَا</b> (both) and <b>بَعْض</b> (some) function as the <b>muḍāf</b> (first noun in an iḍāfah). كُلُّ نَفْسٍ = "every soul" (نَفْس is muḍāf ilayh, indefinite jarr). كِلَا الرَّجُلَيْنِ = "both the two men". بَعْضُ النَّاسِ = "some people". All three take the case of their own syntactic position in the sentence.',
      bn: '<b>كُلّ</b> (প্রতিটি/সব), <b>كِلَا</b> (উভয়) ও <b>بَعْض</b> (কিছু) ইযাফা শৃঙ্খলের প্রথম বিশেষ্য (মুযাফ) হিসেবে কাজ করে। كُلُّ نَفْسٍ মানে "প্রতিটি আত্মা" (نَفْس মুযাফ ইলাইহি, জর, অনির্দিষ্ট)। بَعْضُ النَّاسِ মানে "কিছু মানুষ"। তিনটিই বাক্যে নিজের অবস্থান অনুযায়ী এরাব নেয়।',
    },
    examples: [
      { ref: '3:185', trans: { en: 'Every soul will taste death.', bn: 'প্রতিটি আত্মা মৃত্যুর স্বাদ গ্রহণ করবে।' },
        note: { en: 'كُلُّ (muḍāf, rafʿ as mubtadaʾ) + نَفْسٍ (muḍāf ilayh, jarr, indefinite).', bn: 'كُلُّ (মুযাফ, মুবতাদা হিসেবে রফ) + نَفْسٍ (মুযাফ ইলাইহি, জর, অনির্দিষ্ট)।' },
        words: [
          { ar: 'كُلُّ', en: 'every (muḍāf, rafʿ)', bn: 'প্রতিটি (মুযাফ, রফ)', hl: true },
          { ar: 'نَفْسٍ', en: 'soul (muḍāf ilayh, jarr)', bn: 'আত্মা (মুযাফ ইলাইহি, জর)', hl: true },
          { ar: 'ذَآئِقَةُ ٱلْمَوْتِ', en: 'will taste death', bn: 'মৃত্যুর স্বাদ গ্রহণ করবে' },
        ] },
      { ref: '55:26', trans: { en: 'Everyone on it will perish.', bn: 'পৃথিবীতে যা কিছু আছে সব ফানা হয়ে যাবে।' },
        note: { en: 'كُلُّ مَنْ: كُلُّ (muḍāf) + مَنْ (relative pronoun as muḍāf ilayh) — "everyone who".', bn: 'كُلُّ مَنْ: كُلُّ (মুযাফ) + مَنْ (মুযাফ ইলাইহি হিসেবে সম্বন্ধবাচক সর্বনাম) — "যে প্রত্যেকে"।' },
        words: [
          { ar: 'كُلُّ مَنْ', en: 'everyone who (muḍāf + muḍāf ilayh)', bn: 'যে প্রত্যেকে (মুযাফ + মুযাফ ইলাইহি)', hl: true },
          { ar: 'عَلَيْهَا فَانٍ', en: 'on it will perish', bn: 'তার উপর ফানা হবে' },
        ] },
    ],
    practice: {
      q: { en: 'In كُلُّ نَفْسٍ, what case is نَفْسٍ and why?', bn: 'كُلُّ نَفْسٍ-এ نَفْسٍ কোন এরাবে এবং কেন?' },
      options: [
        { en: 'Rafʿ — it is the subject', bn: 'রফ — এটি কর্তা' },
        { en: 'Jarr — it is the muḍāf ilayh after كُلُّ', bn: 'জর — كُلُّ-এর পরে মুযাফ ইলাইহি' },
        { en: 'Naṣb — it is the object', bn: 'নসব — এটি কর্ম' },
      ], answer: 1,
      explain: { en: 'نَفْسٍ is the muḍāf ilayh (second member of the iḍāfah) so it takes jarr (ـٍ). كُلُّ is the muḍāf.', bn: 'نَفْسٍ হলো মুযাফ ইলাইহি (ইযাফার দ্বিতীয় সদস্য), তাই জর (ـٍ) নেয়। كُلُّ হলো মুযাফ।' },
    },
  },
];

/* ------------------------------------------------------------------ *
 * Grammar glossary. Each term: ar, translit, en, bn, and (where clean) *
 * a one-word Quranic example ex{ar, ref} verified from the data file.  *
 * ------------------------------------------------------------------ */
const QA_GLOSSARY = [
  { ar: 'اِسْم', translit: 'ism', en: 'Noun — a person, thing, place or idea.', bn: 'বিশেষ্য — ব্যক্তি, বস্তু, স্থান বা ধারণা।', ex: { ar: 'ٱلْكِتَٰبُ', ref: '2:2' } },
  { ar: 'فِعْل', translit: 'fiʿl', en: 'Verb — an action tied to a time.', bn: 'ক্রিয়া — সময়ের সাথে যুক্ত কাজ।', ex: { ar: 'نَعْبُدُ', ref: '1:5' } },
  { ar: 'حَرْف', translit: 'harf', en: 'Particle — a connector (in, to, and) with meaning only alongside other words.', bn: 'অব্যয় — সংযোজক (মধ্যে, জন্য, ও), যা অন্য শব্দের সাথে অর্থ দেয়।', ex: { ar: 'فِيهِ', ref: '2:2' } },
  { ar: 'إِعْرَاب', translit: 'iʿrāb', en: 'Case inflection — the change of a word\'s ending to show its role.', bn: 'এ‘রাব — ভূমিকা বোঝাতে শব্দের শেষ পরিবর্তন।' },
  { ar: 'رَفْع', translit: 'rafʿ', en: 'Nominative case (‑u), typically for the subject.', bn: 'রফ‘ (‑u), সাধারণত কর্তার জন্য।', ex: { ar: 'ٱلْحَمْدُ', ref: '1:2' } },
  { ar: 'نَصْب', translit: 'naṣb', en: 'Accusative case (‑a), typically for the object.', bn: 'নসব (‑a), সাধারণত কর্মের জন্য।', ex: { ar: 'ٱلْكَوْثَرَ', ref: '108:1' } },
  { ar: 'جَرّ', translit: 'jarr', en: 'Genitive case (‑i), after prepositions or in possession.', bn: 'জর (‑i), অব্যয়ের পরে বা সম্বন্ধে।', ex: { ar: 'ٱلْعَٰلَمِينَ', ref: '1:2' } },
  { ar: 'جَزْم', translit: 'jazm', en: 'Jussive — a present verb "cut short" (sukūn) after لَمْ, لا, etc.', bn: 'জযম — لَمْ, لا ইত্যাদির পরে বর্তমান ক্রিয়া সংক্ষিপ্ত (সুকূন)।', ex: { ar: 'يَلِدْ', ref: '112:3' } },
  { ar: 'إِضَافَة', translit: 'iḍāfah', en: 'Possessive construction: "X of Y".', bn: 'সম্বন্ধ গঠন: "X-এর Y"।', ex: { ar: 'يَوْمِ', ref: '1:4' } },
  { ar: 'مُبْتَدَأ', translit: 'mubtadaʾ', en: 'The subject of a nominal sentence (what we speak about).', bn: 'নাম-বাক্যের উদ্দেশ্য (যাকে নিয়ে বলা হয়)।', ex: { ar: 'ٱللَّهُ', ref: '112:2' } },
  { ar: 'خَبَر', translit: 'khabar', en: 'The predicate — the information about the subject.', bn: 'বিধেয় — উদ্দেশ্য সম্পর্কে তথ্য।', ex: { ar: 'ٱلصَّمَدُ', ref: '112:2' } },
  { ar: 'فَاعِل', translit: 'fāʿil', en: 'The doer / subject of a verb.', bn: 'কর্তা — ক্রিয়ার কর্তা।', ex: { ar: 'ٱللَّهُ', ref: '2:7' } },
  { ar: 'مَفْعُول بِهِ', translit: 'mafʿūl bihi', en: 'The direct object of a verb (naṣb).', bn: 'ক্রিয়ার সরাসরি কর্ম (নসব)।', ex: { ar: 'ٱلْقُرْءَانَ', ref: '55:2' } },
  { ar: 'مَصْدَر', translit: 'maṣdar', en: 'Verbal noun — the name of an action itself.', bn: 'মাসদার — কাজের নাম নিজেই।', ex: { ar: 'ٱلْحَمْدُ', ref: '1:2' } },
  { ar: 'وَزْن', translit: 'wazn', en: 'Pattern / form into which a root is cast.', bn: 'ওজন — যে ছাঁচে মূল ঢালা হয়।', ex: { ar: 'عَلَّمَ', ref: '55:2' } },
  { ar: 'ضَمِير', translit: 'ḍamīr', en: 'Pronoun (he, you, us…), detached or attached.', bn: 'সর্বনাম (সে, তুমি, আমরা…), বিচ্ছিন্ন বা যুক্ত।', ex: { ar: 'هُوَ', ref: '112:1' } },
  { ar: 'اِسْم الْفَاعِل', translit: 'ism al-fāʿil', en: 'Active participle (فَاعِل) — names the doer.', bn: 'কর্তৃবাচক বিশেষণ (فَاعِل) — কর্তাকে বোঝায়।', ex: { ar: 'مَٰلِكِ', ref: '1:4' } },
  { ar: 'اِسْم الْمَفْعُول', translit: 'ism al-mafʿūl', en: 'Passive participle (مَفْعُول) — names the receiver.', bn: 'কর্মবাচক বিশেষণ (مَفْعُول) — গ্রহীতাকে বোঝায়।', ex: { ar: 'ٱلْمَغْضُوبِ', ref: '1:7' } },
  { ar: 'اِسْم التَّفْضِيل', translit: 'ism at-tafḍīl', en: 'Comparative/superlative (أَفْعَل): "more / most".', bn: 'তুলনা/শ্রেষ্ঠত্ব (أَفْعَل): "অধিক / সর্বাধিক"।', ex: { ar: 'أَحْسَنِ', ref: '95:4' } },
  { ar: 'جُمْلَة اِسْمِيَّة', translit: 'jumla ismiyya', en: 'Nominal sentence — begins with a noun.', bn: 'নাম-বাক্য — বিশেষ্য দিয়ে শুরু।', ex: { ar: 'ٱللَّهُ', ref: '112:2' } },
  { ar: 'جُمْلَة فِعْلِيَّة', translit: 'jumla fiʿliyya', en: 'Verbal sentence — begins with a verb.', bn: 'ক্রিয়া-বাক্য — ক্রিয়া দিয়ে শুরু।', ex: { ar: 'ٱهْدِنَا', ref: '1:6' } },
  { ar: 'مَاضٍ', translit: 'māḍī', en: 'Past-tense verb (completed action).', bn: 'অতীত ক্রিয়া (সম্পন্ন কাজ)।', ex: { ar: 'أَنْعَمْتَ', ref: '1:7' } },
  { ar: 'مُضَارِع', translit: 'muḍāriʿ', en: 'Present/future-tense verb (ongoing action).', bn: 'বর্তমান/ভবিষ্যৎ ক্রিয়া (চলমান কাজ)।', ex: { ar: 'نَعْبُدُ', ref: '1:5' } },
  { ar: 'أَمْر', translit: 'amr', en: 'Command / imperative verb.', bn: 'আদেশ / অনুজ্ঞা ক্রিয়া।', ex: { ar: 'ٱهْدِنَا', ref: '1:6' } },
  { ar: 'تَاء مَرْبُوطَة', translit: 'tāʾ marbūṭa', en: 'The ة ending — the usual mark of a feminine noun.', bn: 'ة শেষ — স্ত্রীলিঙ্গ বিশেষ্যের সাধারণ চিহ্ন।', ex: { ar: 'رَحْمَةً', ref: '21:107' } },
  { ar: 'إِنَّ', translit: 'inna', en: 'Emphasis particle ("indeed"); makes the subject naṣb.', bn: 'তাগিদ-অব্যয় ("নিশ্চয়"); উদ্দেশ্যকে নসব করে।', ex: { ar: 'إِنَّ', ref: '103:2' } },
  { ar: 'جَمْع التَّكْسِير', translit: 'jamʿ at-taksīr', en: 'Broken plural — formed by reshaping the word.', bn: 'ভাঙা বহুবচন — শব্দ পুনর্গঠনে গঠিত।', ex: { ar: 'قُلُوبِهِمْ', ref: '2:7' } },
  { ar: 'حَال', translit: 'ḥāl', en: 'Circumstantial noun (naṣb) — describes the state during an action.', bn: 'হাল — কাজের সময়কার অবস্থা বর্ণনাকারী বিশেষ্য (নসব)।', ex: { ar: 'هَوْنًا', ref: '25:63' } },
  { ar: 'تَمْيِيز', translit: 'tamyīz', en: 'Specification (naṣb) — clarifies "in respect of what".', bn: 'তাময়ীয — "কোন দিক থেকে" তা স্পষ্টকারী বিশেষ্য (নসব)।', ex: { ar: 'شَيْبًا', ref: '19:4' } },
  { ar: 'فِعْل مَجْهُول', translit: 'fiʿl majhūl', en: 'Passive verb — "was/is done", the doer unnamed.', bn: 'কর্মবাচ্য ক্রিয়া — "করা হলো/হয়", কর্তা অনুক্ত।', ex: { ar: 'خُلِقَ', ref: '86:5' } },
  { ar: 'اِسْتِثْنَاء', translit: 'istithnāʾ', en: 'Exception with إِلَّا ("except").', bn: 'إِلَّا ("ছাড়া") দিয়ে ব্যতিক্রম।', ex: { ar: 'إِلَّا', ref: '103:3' } },
  { ar: 'نُون التَّوْكِيد', translit: 'nūn at-tawkīd', en: 'Emphatic nūn ending — "will surely…".', bn: 'তাগিদের নূন প্রত্যয় — "অবশ্যই…"।', ex: { ar: 'لَيُنۢبَذَنَّ', ref: '104:4' } },
  { ar: 'الأَسْمَاء الخَمْسَة', translit: 'al-asmāʾ al-khamsa', en: 'The five nouns (أَب, أَخ, ذُو…) — case shown by و/ا/ي.', bn: 'পাঁচ বিশেষ্য (أَب, أَخ, ذُو…) — এ‘রাব و/ا/ي দিয়ে।', ex: { ar: 'ذُو', ref: '85:15' } },
  { ar: 'لَام التَّعْلِيل', translit: 'lām at-taʿlīl', en: 'Lām of purpose ("so that") + subjunctive verb.', bn: 'উদ্দেশ্যের লাম ("যাতে") + নসব-রূপ ক্রিয়া।', ex: { ar: 'لِيَعْبُدُونِ', ref: '51:56' } },
  { ar: 'لَعَلَّ', translit: 'laʿalla', en: 'Sister of إِنَّ expressing hope/purpose ("so that perhaps").', bn: 'إِنَّ-এর বোন, আশা/উদ্দেশ্য প্রকাশক ("যাতে সম্ভবত")।', ex: { ar: 'لَعَلَّكُمْ', ref: '2:21' } },
  { ar: 'لَيْسَ', translit: 'laysa', en: 'Sister of كَانَ meaning "is not"; makes the predicate naṣb.', bn: 'كَانَ-এর বোন, অর্থ "নয়"; বিধেয়কে নসব করে।', ex: { ar: 'أَلَيْسَ', ref: '95:8' } },
  { ar: 'تَنْوِين', translit: 'tanwīn', en: 'Nunation — the doubled ‑un/‑an/‑in ending of an indefinite noun.', bn: 'তানভীন — অনির্দিষ্ট বিশেষ্যের দ্বিগুণ ‑un/‑an/‑in শেষ।', ex: { ar: 'أَحَدٌ', ref: '112:1' } },
];

/* ------------------------------------------------------------------ *
 * Iʿrāb practice — identify the grammatical role of a highlighted     *
 * word. Built ONLY from verse snippets already verified in the        *
 * lessons above (unambiguous textbook analyses). Question shape       *
 * matches lesson practice, plus words[] + ref for display.            *
 * ------------------------------------------------------------------ */
const QA_IRAB_Q = { en: 'What is the grammatical role of the highlighted word?', bn: 'হাইলাইট করা শব্দটির ব্যাকরণিক ভূমিকা কী?' };
const QA_IRAB = [
  { ref: '1:2', q: QA_IRAB_Q,
    words: [ { ar: 'ٱلْحَمْدُ', hl: true }, { ar: 'لِلَّهِ' }, { ar: 'رَبِّ' }, { ar: 'ٱلْعَٰلَمِينَ' } ],
    options: [{ en: 'mubtadaʾ (subject of a nominal sentence)', bn: 'মুবতাদা (নাম-বাক্যের উদ্দেশ্য)' }, { en: 'mafʿūl bihi (object)', bn: 'মাফ‘ূল বিহি (কর্ম)' }, { en: 'harf jarr (preposition)', bn: 'হারফ জর (অব্যয়পদ)' }, { en: 'ḥāl (state)', bn: 'হাল (অবস্থা)' }], answer: 0,
    explain: { en: 'ٱلْحَمْدُ opens a nominal sentence in rafʿ (‑u): it is the mubtadaʾ; لِلَّهِ is its khabar.', bn: 'ٱلْحَمْدُ রফ‘ (‑u) নিয়ে নাম-বাক্য শুরু করে: এটি মুবতাদা; لِلَّهِ তার খবর।' } },
  { ref: '112:2', q: QA_IRAB_Q,
    words: [ { ar: 'ٱللَّهُ' }, { ar: 'ٱلصَّمَدُ', hl: true } ],
    options: [{ en: 'khabar (predicate)', bn: 'খবর (বিধেয়)' }, { en: 'mubtadaʾ (subject)', bn: 'মুবতাদা (উদ্দেশ্য)' }, { en: 'fāʿil (doer)', bn: 'ফা‘িল (কর্তা)' }, { en: 'tamyīz (specification)', bn: 'তাময়ীয (নির্দিষ্টকরণ)' }], answer: 0,
    explain: { en: 'ٱللَّهُ is the mubtadaʾ; ٱلصَّمَدُ is the khabar — the information given about Him.', bn: 'ٱللَّهُ মুবতাদা; ٱلصَّمَدُ খবর — তাঁর সম্পর্কে প্রদত্ত তথ্য।' } },
  { ref: '2:7', q: QA_IRAB_Q,
    words: [ { ar: 'خَتَمَ' }, { ar: 'ٱللَّهُ', hl: true }, { ar: 'عَلَىٰ' }, { ar: 'قُلُوبِهِمْ' } ],
    options: [{ en: 'fāʿil (doer of the verb)', bn: 'ফা‘িল (ক্রিয়ার কর্তা)' }, { en: 'mafʿūl bihi (object)', bn: 'মাফ‘ূল বিহি (কর্ম)' }, { en: 'khabar (predicate)', bn: 'খবর (বিধেয়)' }, { en: 'harf jarr (preposition)', bn: 'হারফ জর (অব্যয়পদ)' }], answer: 0,
    explain: { en: 'The sentence starts with the verb خَتَمَ, so ٱللَّهُ (rafʿ) is its fāʿil — the doer.', bn: 'বাক্যটি خَتَمَ ক্রিয়া দিয়ে শুরু, তাই ٱللَّهُ (রফ‘) তার ফা‘িল — কর্তা।' } },
  { ref: '55:2', q: QA_IRAB_Q,
    words: [ { ar: 'عَلَّمَ' }, { ar: 'ٱلْقُرْءَانَ', hl: true } ],
    options: [{ en: 'mafʿūl bihi (object)', bn: 'মাফ‘ূল বিহি (কর্ম)' }, { en: 'fāʿil (doer)', bn: 'ফা‘িল (কর্তা)' }, { en: 'mubtadaʾ (subject)', bn: 'মুবতাদা (উদ্দেশ্য)' }, { en: 'ḥāl (state)', bn: 'হাল (অবস্থা)' }], answer: 0,
    explain: { en: 'ٱلْقُرْءَانَ ends in ‑a (naṣb): it is the mafʿūl bihi of عَلَّمَ — what was taught.', bn: 'ٱلْقُرْءَانَ ‑a (নসব)-তে শেষ: এটি عَلَّمَ-এর মাফ‘ূল বিহি — যা শেখানো হয়েছে।' } },
  { ref: '104:4', q: QA_IRAB_Q,
    words: [ { ar: 'كَلَّا' }, { ar: 'لَيُنۢبَذَنَّ' }, { ar: 'فِى', hl: true }, { ar: 'ٱلْحُطَمَةِ' } ],
    options: [{ en: 'harf jarr (preposition)', bn: 'হারফ জর (অব্যয়পদ)' }, { en: 'fāʿil (doer)', bn: 'ফা‘িল (কর্তা)' }, { en: 'ḥāl (state)', bn: 'হাল (অবস্থা)' }, { en: 'mubtadaʾ (subject)', bn: 'মুবতাদা (উদ্দেশ্য)' }], answer: 0,
    explain: { en: 'فِى ("in") is a preposition (harf jarr); it puts ٱلْحُطَمَةِ into the jarr case.', bn: 'فِى ("মধ্যে") একটি হারফ জর; এটি ٱلْحُطَمَةِ-কে জর করে।' } },
  { ref: '1:4', q: QA_IRAB_Q,
    words: [ { ar: 'مَٰلِكِ' }, { ar: 'يَوْمِ' }, { ar: 'ٱلدِّينِ', hl: true } ],
    options: [{ en: 'muḍāf ilayh (possessor, majrūr)', bn: 'মুদাফ ইলাইহি (সম্বন্ধপদ, মাজরূর)' }, { en: 'fāʿil (doer)', bn: 'ফা‘িল (কর্তা)' }, { en: 'mafʿūl bihi (object)', bn: 'মাফ‘ূল বিহি (কর্ম)' }, { en: 'khabar (predicate)', bn: 'খবর (বিধেয়)' }], answer: 0,
    explain: { en: 'In the iḍāfah chain مَٰلِكِ يَوْمِ ٱلدِّينِ, the word ٱلدِّينِ is the final muḍāf ilayh — genitive (jarr).', bn: 'ইদাফা-শৃঙ্খল مَٰلِكِ يَوْمِ ٱلدِّينِ-এ ٱلدِّينِ শেষ মুদাফ ইলাইহি — জর অবস্থায়।' } },
  { ref: '25:63', q: QA_IRAB_Q,
    words: [ { ar: 'يَمْشُونَ' }, { ar: 'عَلَى' }, { ar: 'ٱلْأَرْضِ' }, { ar: 'هَوْنًا', hl: true } ],
    options: [{ en: 'ḥāl (state/manner)', bn: 'হাল (অবস্থা/ধরন)' }, { en: 'fāʿil (doer)', bn: 'ফা‘িল (কর্তা)' }, { en: 'muḍāf ilayh (possessor)', bn: 'মুদাফ ইলাইহি (সম্বন্ধপদ)' }, { en: 'harf jarr (preposition)', bn: 'হারফ জর (অব্যয়পদ)' }], answer: 0,
    explain: { en: 'هَوْنًا (naṣb) describes HOW they walk — the circumstantial ḥāl.', bn: 'هَوْنًا (নসব) বোঝায় তারা কীভাবে চলে — অবস্থাবাচক হাল।' } },
  { ref: '19:4', q: QA_IRAB_Q,
    words: [ { ar: 'وَٱشْتَعَلَ' }, { ar: 'ٱلرَّأْسُ' }, { ar: 'شَيْبًا', hl: true } ],
    options: [{ en: 'tamyīz (specification)', bn: 'তাময়ীয (নির্দিষ্টকরণ)' }, { en: 'khabar (predicate)', bn: 'খবর (বিধেয়)' }, { en: 'mafʿūl bihi (object)', bn: 'মাফ‘ূল বিহি (কর্ম)' }, { en: 'mubtadaʾ (subject)', bn: 'মুবতাদা (উদ্দেশ্য)' }], answer: 0,
    explain: { en: 'شَيْبًا (naṣb) specifies in what respect the head "flared up" — the tamyīz.', bn: 'شَيْبًا (নসব) নির্দিষ্ট করে মাথা কোন দিক থেকে "জ্বলল" — তাময়ীয।' } },
  { ref: '103:2', q: QA_IRAB_Q,
    words: [ { ar: 'إِنَّ' }, { ar: 'ٱلْإِنسَٰنَ', hl: true }, { ar: 'لَفِى' }, { ar: 'خُسْرٍ' } ],
    options: [{ en: 'ism inna (subject of إِنَّ, naṣb)', bn: 'ইসমু ইন্না (إِنَّ-এর উদ্দেশ্য, নসব)' }, { en: 'fāʿil (doer)', bn: 'ফা‘িল (কর্তা)' }, { en: 'harf jarr (preposition)', bn: 'হারফ জর (অব্যয়পদ)' }, { en: 'tamyīz (specification)', bn: 'তাময়ীয (নির্দিষ্টকরণ)' }], answer: 0,
    explain: { en: 'After إِنَّ the subject takes naṣb: ٱلْإِنسَٰنَ is the ism of إِنَّ.', bn: 'إِنَّ-এর পরে উদ্দেশ্য নসব নেয়: ٱلْإِنسَٰنَ হলো إِنَّ-এর ইসম।' } },
  { ref: '1:6', q: QA_IRAB_Q,
    words: [ { ar: 'ٱهْدِنَا' }, { ar: 'ٱلصِّرَٰطَ' }, { ar: 'ٱلْمُسْتَقِيمَ', hl: true } ],
    options: [{ en: 'ṣifa (adjective describing the path)', bn: 'সিফা (পথের বিশেষণ)' }, { en: 'fāʿil (doer)', bn: 'ফা‘িল (কর্তা)' }, { en: 'mubtadaʾ (subject)', bn: 'মুবতাদা (উদ্দেশ্য)' }, { en: 'harf jarr (preposition)', bn: 'হারফ জর (অব্যয়পদ)' }], answer: 0,
    explain: { en: 'ٱلْمُسْتَقِيمَ is a ṣifa (adjective) of ٱلصِّرَٰطَ — it matches it in case (naṣb), definiteness and gender.', bn: 'ٱلْمُسْتَقِيمَ হলো ٱلصِّرَٰطَ-এর সিফা (বিশেষণ) — এ‘রাব (নসব), নির্দিষ্টতা ও লিঙ্গে মিলে যায়।' } },
  { ref: '2:163', q: QA_IRAB_Q,
    words: [ { ar: 'وَإِلَٰهُكُمْ' }, { ar: 'إِلَٰهٌ' }, { ar: 'وَٰحِدٌ' }, { ar: 'لَّآ', hl: true }, { ar: 'إِلَٰهَ' }, { ar: 'إِلَّا' }, { ar: 'هُوَ' } ],
    options: [{ en: 'ḥarf (negation of genus, naṣb)', bn: 'হারফ (جنس کی نفی، نصب)' }, { en: 'fāʿil (doer)', bn: 'فاعل (کर्तا)' }, { en: 'mubtadaʾ (subject)', bn: 'مبتدا (উদ্দেশ্য)' }, { en: 'ḥāl (state)', bn: 'حال (অবস্থা)' }], answer: 0,
    explain: { en: 'لَّآ is the negation of genus (lā al-nāfiya li-l-jins), which puts إِلَٰهَ into naṣb: "there is no god".', bn: 'لَّآ جنس کی نفی کا حرف (لا النافیۃ للجنس)، جو إِلَٰهَ کو نصب میں ڈالتا ہے: "کوئی معبود نہیں"' } },
  { ref: '2:285', q: QA_IRAB_Q,
    words: [ { ar: 'ءَامَنَ' }, { ar: 'ٱلرَّسُولُ' }, { ar: 'بِمَآ' }, { ar: 'أُنزِلَ' }, { ar: 'إِلَيْهِ' }, { ar: 'مِن رَّبِّهِۦ' } ],
    options: [{ en: 'fāʿil (doer of a past verb)', bn: 'فاعل (ماضی کا کرتا)' }, { en: 'mafʿūl bihi (object)', bn: 'مفعول به (مفعول)' }, { en: 'khabar (predicate)', bn: 'خبر (بيدھا)' }, { en: 'muḍāf ilayh', bn: 'مضاف اليه' }], answer: 0,
    explain: { en: 'ٱلرَّسُولُ ends in ‑u (rafʿ) and is the doer (fāʿil) of the past verb ءَامَنَ.', bn: 'ٱلرَّسُولُ ‑u (rafʿ) پر ختم ہے اور فعل ماضی ءَامَنَ کا فاعل ہے۔' } },
  { ref: '36:82', q: QA_IRAB_Q,
    words: [ { ar: 'إِنَّمَآ' }, { ar: 'أَمْرُهُۥٓ' }, { ar: 'إِذَآ' }, { ar: 'أَرَادَ' }, { ar: 'شَيْـًٔا' }, { ar: 'أَن يَقُولَ' }, { ar: 'لَهُۥ' }, { ar: 'كُن', hl: true }, { ar: 'فَيَكُونُ' } ],
    options: [{ en: 'command verb (amr)', bn: 'فعل امر' }, { en: 'present verb (muḍāriʿ)', bn: 'فعل مضارع' }, { en: 'past verb (māḍī)', bn: 'فعل ماضی' }, { en: 'verbal noun (maṣdar)', bn: 'مصدر' }], answer: 0,
    explain: { en: 'كُن is a command (amr): "Be!" — it is the essence of creation by divine will.', bn: 'كُن فعل امر ہے: "هو جاؤ!" — يه اللہ تعالیٰ کی تخلیق کا جوہر ہے۔' } },
  { ref: '1:5', q: QA_IRAB_Q,
    words: [ { ar: 'إِيَّاكَ', hl: true }, { ar: 'نَعْبُدُ' }, { ar: 'وَإِيَّاكَ' }, { ar: 'نَسْتَعِينُ' } ],
    options: [{ en: 'mafʿūl bihi (object) placed before the verb', bn: 'مفعول به (مفعول) جو فعل سے پہلے آیا ہے' }, { en: 'mubtadaʾ (subject)', bn: 'مبتدا (موضوع)' }, { en: 'fāʿil (doer)', bn: 'فاعل (کرتا)' }, { en: 'ḥarf (particle)', bn: 'حرف' }], answer: 0,
    explain: { en: 'إِيَّاكَ is the object of نَعْبُدُ placed before the verb for emphasis — "You alone we worship."', bn: 'إِيَّاكَ نَعْبُدُ کا مفعول ہے جو فعل سے پہلے تاکید کے لیے آیا ہے — "آپ ہی کی ہم عبادت کرتے ہیں۔"' } },
  { ref: '2:177', q: QA_IRAB_Q,
    words: [ { ar: 'لَّٰكِنَّ', hl: true }, { ar: 'ٱلْبِرَّ' }, { ar: 'مَنْ' }, { ar: 'ءَامَنَ' }, { ar: 'بِٱللَّهِ' } ],
    options: [{ en: 'ḥarf nasb (sister of إِنَّ, nasb)', bn: 'حرف نصب (إِنَّ کی بہن، نصب)' }, { en: 'harf jarr (preposition)', bn: 'حرف جر' }, { en: 'istithnāʾ (exception)', bn: 'استثناء' }, { en: 'ʿaṭf (connector)', bn: 'عطف' }], answer: 0,
    explain: { en: 'لَّٰكِنَّ is a sister of إِنَّ (ḥarf nasb wa tawkīd), putting its subject ٱلْبِرَّ in naṣb.', bn: 'لَّٰكِنَّ إِنَّ کی بہن ہے (حرف نصب و تاکید)، جو اپنے اسم ٱلْبِرَّ کو نصب میں ڈالتی ہے۔' } },
  { ref: '30:30', q: QA_IRAB_Q,
    words: [ { ar: 'فَأَقِمْ' }, { ar: 'وَجْهَكَ' }, { ar: 'لِلدِّينِ' }, { ar: 'حَنِيفًا', hl: true } ],
    options: [{ en: 'ḥāl (state/manner)', bn: 'حال (حالت/انداز)' }, { en: 'mafʿūl bihi (object)', bn: 'مفعول به (مفعول)' }, { en: 'tamyīz (specification)', bn: 'تمييز (تعيين)' }, { en: 'khabar (predicate)', bn: 'خبر (بيدھا)' }], answer: 0,
    explain: { en: 'حَنِيفًا (naṣb) describes the STATE of the doer as he turns his face — the circumstantial ḥāl.', bn: 'حَنِيفًا (نصب) فاعل کی حالت کو بیان کرتا ہے جب وہ اپنا چہرہ موڑتا ہے — حالِ ظرفی۔' } },
  { ref: '1:4', q: QA_IRAB_Q,
    words: [ { ar: 'مَٰلِكِ' }, { ar: 'يَوْمِ' }, { ar: 'ٱلدِّينِ' } ],
    options: [{ en: 'ṣifa (adjective)', bn: 'صفت' }, { en: 'badal (substitute)', bn: 'بدل' }, { en: 'tamyīz (specification)', bn: 'تمييز (تعيين)' }, { en: 'naʿt (adjective)', bn: 'نعت' }], answer: 0,
    explain: { en: 'There are two ways to analyse مَٰلِكِ: (1) as a noun in the iḍāfah chain (muḍāf), or (2) as a ṣifa/naʿt (adjective) of رَبِّ — matching it in definiteness, number and case (jarr).', bn: 'مَٰلِكِ کے دو تجزیے ہیں: (1) اضافہ زنجیر میں اسم (مضاف)، یا (2) رَبِّ کی صفت/نعت — جنس، تعداد اور حالت (جر) میں مطابقت۔' } },
  { ref: '9:40', q: QA_IRAB_Q,
    words: [ { ar: 'فَأَنزَلَ' }, { ar: 'ٱللَّهُ' }, { ar: 'سَكِينَتَهُۥ' }, { ar: 'عَلَيْهِ' }, { ar: 'وَأَيَّدَهُۥ' }, { ar: 'بِجُنُودٍ' }, { ar: 'لَّمْ', hl: true }, { ar: 'تَرَوْهَا' } ],
    options: [{ en: 'ḥarf jazm (negates a present verb, jazm)', bn: 'حرف جزم (مضارع کو جزم کرتا ہے)' }, { en: 'ḥarf nasb (makes naṣb)', bn: 'حرف نصب' }, { en: 'istifhām (question)', bn: 'استفہام (سوال)' }, { en: 'qasam (oath)', bn: 'قسم' }], answer: 0,
    explain: { en: 'لَّمْ is a negation particle that puts the present verb تَرَوْ into the jussive (jazm) — "you did not see".', bn: 'لَّمْ نفی کا حرف ہے جو مضارع تَرَوْ کو جزم میں ڈالتا ہے — "تم نے نہیں دیکھا"' } },
  { ref: '55:26', q: QA_IRAB_Q,
    words: [ { ar: 'كُلُّ' }, { ar: 'مَنْ' }, { ar: 'عَلَيْهَا' }, { ar: 'فَانٍ', hl: true } ],
    options: [{ en: 'khabar (predicate of nominal sentence, rafʿ)', bn: 'خبر (اسمیہ جملہ کی خبر، رفع)' }, { en: 'mubtadaʾ (subject)', bn: 'مبتدا (موضوع)' }, { en: 'fāʿil (doer)', bn: 'فاعل (کرتا)' }, { en: 'mafʿūl (object)', bn: 'مفعول (مفعول)' }], answer: 0,
    explain: { en: 'كُلُّ is the mubtadaʾ; فَانٍ is its khabar (predicate) in rafʿ: "everything (on it) is perishing."', bn: 'كُلُّ مبتدا ہے؛ فَانٍ اس کی خبر رفع میں ہے: "ہر چیز (اس پر) فنا ہونے والی ہے۔"' } },
  { ref: '5:6', q: QA_IRAB_Q,
    words: [ { ar: 'فَٱغْسِلُوا۟' }, { ar: 'وُجُوهَكُمْ' }, { ar: 'وَأَيْدِيَكُمْ' }, { ar: 'إِلَى' }, { ar: 'ٱلْمَرَافِقِ' }, { ar: 'وَٱمْسَحُوا۟' }, { ar: 'بِرُءُوسِكُمْ' }, { ar: 'وَأَرْجُلَكُمْ', hl: true } ],
    options: [{ en: 'mafʿūl bihi (object, naṣb) joined by wa', bn: 'مفعول به (مفعول، نصب) واو کے ساتھ ملا ہوا' }, { en: 'fāʿil (doer, rafʿ)', bn: 'فاعل (کرتا، رفع)' }, { en: 'muḍāf ilayh (jarr)', bn: 'مضاف اليه (جر)' }, { en: 'ḥāl (state, naṣb)', bn: 'حال (حالت، نصب)' }], answer: 0,
    explain: { en: 'وَأَرْجُلَكُمْ is joined by the conjunction وَ to the object وُجُوهَكُمْ — both are objects of the command wash/wipe (mafʿūl bihi, naṣb).', bn: 'وَأَرْجُلَكُمْ حرف عطف وَ کے ذریعے مفعول وُجُوهَكُمْ سے ملا ہوا ہے — دونوں حکم دھونے/مسح کرنے کے مفعول (نصب) ہیں۔' } },
];

/* ------------------------------------------------------------------ *
 * "How to continue studying" — plain-text pointers (no URLs).         *
 * ------------------------------------------------------------------ */
const QA_NEXT_STEPS = [
  { en: 'Revisit these lessons until every unit shows 100%, and skim the glossary until each term feels familiar.', bn: 'প্রতিটি ইউনিট ১০০% না হওয়া পর্যন্ত পাঠগুলো আবার দেখুন, আর প্রতিটি পরিভাষা চেনা না লাগা পর্যন্ত গ্লসারি ঝালিয়ে নিন।' },
  { en: 'Take a free structured course: the "Madinah Arabic course" or "Understand Al-Quran Academy" (teaches ~80% of Quranic words).', bn: 'বিনামূল্যের কাঠামোবদ্ধ কোর্স করুন: "মদিনা অ্যারাবিক কোর্স" বা "আন্ডারস্ট্যান্ড আল-কুরআন একাডেমি" (কুরআনের প্রায় ৮০% শব্দ শেখায়)।' },
  { en: 'See the word-by-word grammar of any ayah on the "Quranic Arabic Corpus" — great for checking your own iʿrāb.', bn: 'যেকোনো আয়াতের শব্দে-শব্দে ব্যাকরণ দেখুন "কুরআনিক অ্যারাবিক কর্পাস"-এ — নিজের এ‘রাব যাচাইয়ের জন্য চমৎকার।' },
  { en: 'Prefer video? Follow the "Bayyinah (Nouman Ali Khan) Quranic Arabic" series.', bn: 'ভিডিও পছন্দ? "বাইয়িনাহ (নোমান আলী খান) কুরআনি আরবি" সিরিজ অনুসরণ করুন।' },
  { en: 'Open the Resources tab of this app for a full vetted list of Arabic-learning sites.', bn: 'আরবি শেখার যাচাইকৃত সাইটের পূর্ণ তালিকার জন্য এই অ্যাপের রিসোর্স ট্যাব খুলুন।' },
];

/* ------------------------------------------------------------------ *
 * Inline chrome strings (fallback used when t() has no key yet).      *
 * ------------------------------------------------------------------ */
const QA_UI = {
  qa_title:        { en: 'Learn Quranic Arabic', bn: 'কুরআনি আরবি শিখুন' },
  qa_subtitle:     { en: 'Learn the Arabic language through real Quranic verses — one grammar point at a time.', bn: 'বাস্তব কুরআনি আয়াতের মাধ্যমে আরবি ভাষা শিখুন — একবারে একটি ব্যাকরণ বিষয়।' },
  qa_progress:     { en: 'lessons learned', bn: 'পাঠ শেখা হয়েছে' },
  qa_lesson:       { en: 'Lesson', bn: 'পাঠ' },
  qa_of:           { en: 'of', bn: '/' },
  qa_concept:      { en: 'Concept', bn: 'ধারণা' },
  qa_example:      { en: 'Quranic example', bn: 'কুরআনি উদাহরণ' },
  qa_translation:  { en: 'Translation', bn: 'অনুবাদ' },
  qa_tap_ref:      { en: 'Tap the reference to open the full ayah', bn: 'পূর্ণ আয়াত খুলতে রেফারেন্সে ট্যাপ করুন' },
  qa_practice:     { en: 'Check yourself', bn: 'নিজেকে যাচাই করুন' },
  qa_correct:      { en: 'Correct!', bn: 'সঠিক!' },
  qa_incorrect:    { en: 'Not quite — try again.', bn: 'ঠিক হয়নি — আবার চেষ্টা করুন।' },
  qa_learned:      { en: 'Learned ✓', bn: 'শেখা হয়েছে ✓' },
  qa_mark_learned: { en: 'Marked as learned', bn: 'শেখা হিসেবে চিহ্নিত' },
  qa_prev:         { en: 'Previous', bn: 'পূর্ববর্তী' },
  qa_next:         { en: 'Next', bn: 'পরবর্তী' },
  qa_back:         { en: 'All lessons', bn: 'সব পাঠ' },
  qa_start:        { en: 'Start', bn: 'শুরু' },
  qa_review:       { en: 'Review', bn: 'পুনরালোচনা' },
  qa_retry:        { en: 'Try again', bn: 'আবার চেষ্টা' },
  qa_finish_title: { en: 'You finished the course! 🎉', bn: 'আপনি কোর্সটি সম্পন্ন করেছেন! 🎉' },
  qa_finish_desc:  { en: 'You have learned every lesson. Revisit any lesson to refresh.', bn: 'আপনি প্রতিটি পাঠ শিখেছেন। রিফ্রেশ করতে যেকোনো পাঠে ফিরে যান।' },
  qa_unavailable:  { en: 'Lessons could not be loaded.', bn: 'পাঠ লোড করা যায়নি।' },
  qa_units:        { en: 'Units', bn: 'ইউনিট' },
  qa_glossary:     { en: 'Glossary', bn: 'পরিভাষা' },
  qa_glossary_title: { en: 'Grammar glossary', bn: 'ব্যাকরণ পরিভাষা' },
  qa_glossary_sub: { en: 'Key Arabic grammar terms used in this course.', bn: 'এই কোর্সে ব্যবহৃত মূল আরবি ব্যাকরণ পরিভাষা।' },
  qa_search:       { en: 'Search terms…', bn: 'পরিভাষা খুঁজুন…' },
  qa_no_results:   { en: 'No matching terms.', bn: 'কোনো মিল পাওয়া যায়নি।' },
  qa_example_word: { en: 'Example', bn: 'উদাহরণ' },
  qa_unit_quiz:    { en: 'Unit review quiz', bn: 'ইউনিট রিভিউ কুইজ' },
  qa_final_quiz:   { en: 'Final review (all units)', bn: 'চূড়ান্ত রিভিউ (সব ইউনিট)' },
  qa_quiz:         { en: 'Review quiz', bn: 'রিভিউ কুইজ' },
  qa_question:     { en: 'Question', bn: 'প্রশ্ন' },
  qa_score:        { en: 'Score', bn: 'স্কোর' },
  qa_best:         { en: 'Best', bn: 'সেরা' },
  qa_quiz_done:    { en: 'Quiz complete!', bn: 'কুইজ সম্পন্ন!' },
  qa_your_score:   { en: 'Your score', bn: 'আপনার স্কোর' },
  qa_finish:       { en: 'Finish', bn: 'শেষ' },
  qa_continue:     { en: 'Continue', bn: 'পরবর্তী' },
  qa_close:        { en: 'Close', bn: 'বন্ধ' },
  qa_lessons_word: { en: 'lessons', bn: 'পাঠ' },
  qa_review_missed: { en: 'Review missed questions', bn: 'ভুল প্রশ্ন রিভিউ' },
  qa_review_scope:  { en: 'Missed questions', bn: 'ভুল প্রশ্ন' },
  qa_all_clear:     { en: 'No missed questions — well done!', bn: 'কোনো ভুল প্রশ্ন নেই — দারুণ!' },
  qa_irab_quiz:     { en: 'Iʿrāb practice', bn: 'এ‘রাব অনুশীলন' },
  qa_vocab_words:   { en: 'Words in this group', bn: 'এই গ্রুপের শব্দসমূহ' },
  qa_vocab_hint:    { en: 'Tap any word to see it inside its verse', bn: 'আয়াতের ভেতরে দেখতে যেকোনো শব্দে ট্যাপ করুন' },
  qa_continue_title:{ en: 'How to continue studying', bn: 'কীভাবে পড়া চালিয়ে যাবেন' },
  qa_listen:        { en: 'Listen', bn: 'শুনুন' },
  /* progress dashboard */
  qa_dashboard:     { en: 'Your progress', bn: 'আপনার অগ্রগতি' },
  qa_dash_lessons:  { en: 'Lessons learned', bn: 'পাঠ শেখা' },
  qa_dash_glossary: { en: 'Glossary terms seen', bn: 'পরিভাষা দেখা' },
  qa_dash_cards:    { en: 'Flashcards mastered', bn: 'ফ্ল্যাশকার্ড আয়ত্ত' },
  qa_dash_irab:     { en: 'Iʿrāb best', bn: 'এ‘রাব সেরা' },
  qa_dash_units:    { en: 'Units aced', bn: 'ইউনিট শতভাগ' },
  /* vocabulary flashcards */
  qa_flashcards:    { en: 'Flashcards', bn: 'ফ্ল্যাশকার্ড' },
  qa_flash_title:   { en: 'Vocabulary flashcards', bn: 'শব্দভাণ্ডার ফ্ল্যাশকার্ড' },
  qa_flash_sub:     { en: 'Tap a card to reveal its meaning, then rate how well you knew it. Cards you miss come back sooner.', bn: 'অর্থ দেখতে কার্ডে ট্যাপ করুন, তারপর কতটা জানতেন রেট করুন। ভুল করা কার্ড আগে ফিরে আসে।' },
  qa_flash_start:   { en: 'Practice the frequency vocabulary with spaced-repetition flashcards.', bn: 'বহুল ব্যবহৃত শব্দ স্পেসড-রিপিটিশন ফ্ল্যাশকার্ডে অনুশীলন করুন।' },
  qa_flash_reveal:  { en: 'Tap to reveal', bn: 'দেখতে ট্যাপ করুন' },
  qa_flash_known:   { en: 'I knew it', bn: 'জানতাম' },
  qa_flash_again:   { en: 'Review again', bn: 'আবার দেখব' },
  qa_flash_box:     { en: 'Box', bn: 'বক্স' },
  qa_flash_done:    { en: 'Review session complete!', bn: 'রিভিউ সেশন সম্পন্ন!' },
  qa_flash_restart: { en: 'Start over', bn: 'আবার শুরু' },
  qa_flash_card:    { en: 'Card', bn: 'কার্ড' },
  qa_flash_empty:   { en: 'No vocabulary available.', bn: 'কোনো শব্দভাণ্ডার নেই।' },
  /* resume affordance */
  qa_resume:        { en: 'Resume', bn: 'চালিয়ে যান' },
  qa_resume_hint:   { en: 'Continue where you left off', bn: 'যেখানে থেমেছিলেন সেখান থেকে' },
  /* word match / matching exercise */
  qa_match:         { en: 'Word match', bn: 'শব্দ মেলানো' },
  qa_match_title:   { en: 'Match words to meanings', bn: 'শব্দের সাথে অর্থ মেলাও' },
  qa_match_sub:     { en: 'Tap an Arabic word, then tap its meaning. Match every pair with as few mistakes as possible.', bn: 'একটি আরবি শব্দে ট্যাপ করো, তারপর তার অর্থে ট্যাপ করো। যত কম ভুলে সব জোড়া মেলাও।' },
  qa_match_word:    { en: 'Words', bn: 'শব্দ' },
  qa_match_meaning: { en: 'Meanings', bn: 'অর্থ' },
  qa_match_pick:    { en: 'Selected — now tap its meaning', bn: 'নির্বাচিত — এবার এর অর্থে ট্যাপ করো' },
  qa_match_done:    { en: 'All matched! 🎉', bn: 'সব মিলে গেছে! 🎉' },
  qa_match_accuracy:{ en: 'Accuracy', bn: 'নির্ভুলতা' },
  qa_match_mistakes:{ en: 'Mistakes', bn: 'ভুল' },
  qa_match_restart: { en: 'Play again', bn: 'আবার খেলো' },
  qa_match_empty:   { en: 'No vocabulary available.', bn: 'কোনো শব্দভাণ্ডার নেই।' },
  qa_dash_match:    { en: 'Word-match best', bn: 'শব্দ-মেলানো সেরা' },
};

/* ------------------------------------------------------------------ *
 * View                                                                *
 * ------------------------------------------------------------------ */
class QuranicArabicView {
  constructor() {
    this.container = document.getElementById('quranic-arabic-container');
    this.language = (typeof appSettings !== 'undefined' && appSettings) ? (appSettings.get('language') || 'en') : 'en';
    this.rendered = false;
    this.view = 'syllabus';      // 'syllabus' | 'lesson' | 'quiz' | 'glossary' | 'flashcards' | 'match'
    this.current = 0;            // current lesson index (into ordered list)
    this.answer = null;         // { selected, correct } for the current practice
    this.quiz = null;           // active quiz state
    this.glossaryQuery = '';    // glossary search text
    this.cards = null;          // active flashcard session state
    this.match = null;          // active word-match session state
    this._ordered = null;       // cached ordered lesson list
    this._vocab = null;         // cached unique vocab deck
    this.progress = this.loadProgress();

    window.addEventListener('tabChanged', (e) => {
      try { if (e && e.detail && e.detail.tabId === 'quranicarabic') this.render(); } catch (err) { /* ignore */ }
    });
    window.addEventListener('settingChanged', (e) => {
      try {
        if (e && e.detail && e.detail.key === 'language') {
          this.language = e.detail.value || 'en';
          if (this.rendered) this.render();
        }
      } catch (err) { /* ignore */ }
    });

    // One delegated click handler (survives innerHTML re-renders).
    if (this.container) {
      this.container.addEventListener('click', (e) => this.onClick(e));
      this.container.addEventListener('input', (e) => this.onInput(e));
    }

    // Kick off supplemental content loading (fully async, non-blocking).
    // Inline lessons render immediately; external lessons merge + re-render
    // when (and if) they arrive. Any failure is swallowed silently.
    try { this.loadSupplemental(); } catch (e) { /* ignore */ }
  }

  /* ------------------------------------------------------------------ *
   * Supplemental content loader (manifest-driven, purely additive)      *
   * ------------------------------------------------------------------ *
   * Fetches data/qarabic/manifest.json (a JSON array of filenames).     *
   * Each file is a JSON object with optional keys `units`, `lessons`,   *
   * `glossary` — each entry in the SAME shape as the inline arrays.     *
   * Merges into QA_UNITS / QA_LESSONS / QA_GLOSSARY (dedupe by id),      *
   * honouring an optional numeric `order` on new units. Never throws,   *
   * never blocks the UI, and works identically when no files exist.     *
   * ------------------------------------------------------------------ */
  loadSupplemental() {
    if (this._dataLoaded) return;      // guard against double-merge
    this._dataLoaded = true;
    if (typeof fetch !== 'function') return;
    const base = 'data/qarabic/';
    const grabJson = (url) => {
      try {
        return fetch(url, { cache: 'no-cache' })
          .then(r => (r && r.ok) ? r.json() : null)
          .catch(() => null);
      } catch (e) { return Promise.resolve(null); }
    };
    Promise.resolve()
      .then(() => grabJson(base + 'manifest.json'))
      .then(list => {
        if (!Array.isArray(list) || !list.length) return null;
        const files = list.filter(f => typeof f === 'string' && f);
        return Promise.all(files.map(f => grabJson(base + f)));
      })
      .then(results => {
        if (!Array.isArray(results)) return;
        let changed = 0;
        results.forEach(obj => {
          if (!obj || typeof obj !== 'object') return;
          try {
            changed += this._mergeUnits(obj.units);
            changed += this._mergeArr(QA_LESSONS, obj.lessons, x => (x && x.id != null) ? x.id : null);
            changed += this._mergeArr(QA_GLOSSARY, obj.glossary, x => x ? (x.id != null ? x.id : x.ar) : null);
          } catch (e) { /* skip malformed file, keep going */ }
        });
        if (changed) {
          this._ordered = null;        // rebuild ordered lesson list on next read
          this._vocab = null;          // rebuild vocab/flashcard deck
          if (this.rendered) this.render();   // re-render if already on screen
        }
      })
      .catch(() => { /* fully silent: inline lessons remain intact */ });
  }

  // Append entries from `incoming` into `target`, skipping any whose key
  // already exists (dedupe). Returns the number actually added.
  _mergeArr(target, incoming, keyOf) {
    if (!Array.isArray(target) || !Array.isArray(incoming)) return 0;
    const seen = Object.create(null);
    target.forEach(x => { const k = keyOf(x); if (k != null) seen[k] = true; });
    let added = 0;
    incoming.forEach(x => {
      if (!x || typeof x !== 'object') return;
      const k = keyOf(x);
      if (k == null || seen[k]) return;
      target.push(x); seen[k] = true; added++;
    });
    return added;
  }

  // Merge new units into QA_UNITS (in place, preserving the const binding),
  // deduping by id and honouring an optional numeric `order` field as the
  // desired index position. Existing units keep their relative order.
  _mergeUnits(incoming) {
    if (!Array.isArray(incoming)) return 0;
    const existing = Object.create(null);
    QA_UNITS.forEach(u => { if (u && u.id != null) existing[u.id] = true; });
    const toAdd = [];
    incoming.forEach(u => {
      if (!u || typeof u !== 'object' || u.id == null || existing[u.id]) return;
      existing[u.id] = true;
      toAdd.push(u);
    });
    if (!toAdd.length) return 0;
    // `pos` is the target index; `rank` breaks ties so a new unit with an
    // explicit order lands AT that index (splice semantics), while new units
    // without an order fall to the end. `seq` preserves file order otherwise.
    const positioned = QA_UNITS.map((u, i) => ({ u, pos: i, rank: 1, seq: i }));
    let seq = QA_UNITS.length;
    toAdd.forEach(u => {
      const hasOrder = (typeof u.order === 'number' && isFinite(u.order));
      const pos = hasOrder ? u.order : Number.MAX_SAFE_INTEGER;
      positioned.push({ u, pos, rank: hasOrder ? 0 : 1, seq: seq++ });
    });
    positioned.sort((a, b) =>
      (a.pos !== b.pos) ? a.pos - b.pos
        : (a.rank !== b.rank) ? a.rank - b.rank
          : a.seq - b.seq);
    const sorted = positioned.map(x => x.u);
    QA_UNITS.length = 0;
    Array.prototype.push.apply(QA_UNITS, sorted);
    return toAdd.length;
  }

  /* ---------- ordered lessons (sorted by unit order, stable within unit) ---------- */
  lessons() {
    if (this._ordered) return this._ordered;
    try {
      const rank = {};
      QA_UNITS.forEach((u, i) => { rank[u.id] = i; });
      this._ordered = QA_LESSONS
        .map((l, i) => ({ l, i }))
        .sort((a, b) => {
          const ra = (rank[a.l.unit] != null) ? rank[a.l.unit] : 99;
          const rb = (rank[b.l.unit] != null) ? rank[b.l.unit] : 99;
          return ra !== rb ? ra - rb : a.i - b.i;
        })
        .map(x => x.l);
    } catch (e) { this._ordered = QA_LESSONS.slice(); }
    return this._ordered;
  }
  unitLessons(unitId) { return this.lessons().filter(l => l.unit === unitId); }

  /* ---------- helpers ---------- */
  tt(key) {
    let v = key;
    try { if (typeof t === 'function') v = t(key, this.language); } catch (e) { v = key; }
    if (v && v !== key) return v;
    const entry = QA_UI[key];
    return entry ? (entry[this.language] || entry.en) : key;
  }
  // Content-language resolver: bn from inline data, other languages via the
  // CI18N knowledgebase (content-i18n.js), falling back to English.
  lc(o) {
    if (!o) return '';
    if (this.language === 'bn' && o.bn) return o.bn;
    if (o.en && typeof CI18N !== 'undefined') { const tr = CI18N.tr(this.language, o.en); if (tr) return tr; }
    return o.en || o.bn || '';
  }
  L(obj) { return this.lc(obj); } // legacy alias
  esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
  optText(o) { return typeof o === 'string' ? o : this.lc(o); }

  loadProgress() {
    try {
      const raw = localStorage.getItem('lq_qarabic_progress');
      const o = raw ? JSON.parse(raw) : null;
      const p = (o && typeof o === 'object') ? o : {};
      if (!p.learned || typeof p.learned !== 'object') p.learned = {};
      if (!p.quiz || typeof p.quiz !== 'object') p.quiz = {};
      if (!p.missed || typeof p.missed !== 'object') p.missed = {};
      if (!p.cards || typeof p.cards !== 'object') p.cards = {};   // Leitner box per Arabic word
      if (!p.match || typeof p.match !== 'object') p.match = {};   // { best: pct }
      if (typeof p.lastLesson !== 'string') p.lastLesson = '';     // id of last lesson opened
      return p;
    } catch (e) { return { learned: {}, quiz: {}, missed: {}, cards: {}, match: {}, lastLesson: '' }; }
  }
  saveProgress() {
    try { localStorage.setItem('lq_qarabic_progress', JSON.stringify(this.progress)); } catch (e) { /* ignore */ }
  }
  isLearned(id) { return !!(this.progress.learned && this.progress.learned[id]); }
  markLearned(id) { if (!this.progress.learned) this.progress.learned = {}; if (!this.progress.learned[id]) { this.progress.learned[id] = true; this.saveProgress(); } }
  learnedCount() { try { return Object.keys(this.progress.learned || {}).filter(k => this.progress.learned[k]).length; } catch (e) { return 0; } }
  unitLearnedCount(unitId) { try { return this.unitLessons(unitId).filter(l => this.isLearned(l.id)).length; } catch (e) { return 0; } }
  bestQuiz(scopeId) { try { const v = this.progress.quiz && this.progress.quiz[scopeId]; return (typeof v === 'number' && isFinite(v)) ? v : null; } catch (e) { return null; } }
  addMissed(id) { try { if (!id) return; if (!this.progress.missed) this.progress.missed = {}; if (!this.progress.missed[id]) { this.progress.missed[id] = true; this.saveProgress(); } } catch (e) { /* ignore */ } }
  removeMissed(id) { try { if (this.progress.missed && this.progress.missed[id]) { delete this.progress.missed[id]; this.saveProgress(); } } catch (e) { /* ignore */ } }
  missedIds() { try { return Object.keys(this.progress.missed || {}).filter(k => this.progress.missed[k]); } catch (e) { return []; } }
  missedCount() { return this.missedIds().length; }
  saveQuizScore(scopeId, pct) {
    try {
      if (!this.progress.quiz) this.progress.quiz = {};
      const prev = this.bestQuiz(scopeId);
      if (prev == null || pct > prev) { this.progress.quiz[scopeId] = pct; this.saveProgress(); }
    } catch (e) { /* ignore */ }
  }

  /* ---------- glossary-seen (read-only dashboard signal) ---------- */
  markGlossarySeen() {
    try {
      const n = (typeof QA_GLOSSARY !== 'undefined' && Array.isArray(QA_GLOSSARY)) ? QA_GLOSSARY.length : 0;
      if (this.progress.glossarySeen !== n) { this.progress.glossarySeen = n; this.saveProgress(); }
    } catch (e) { /* ignore */ }
  }
  glossarySeenCount() {
    try { const total = (typeof QA_GLOSSARY !== 'undefined' && Array.isArray(QA_GLOSSARY)) ? QA_GLOSSARY.length : 0; return Math.min(this.progress.glossarySeen || 0, total); } catch (e) { return 0; }
  }

  /* ---------- audio (guarded browser TTS; omitted entirely if unavailable) ---------- */
  ttsAvailable() {
    try { return typeof window !== 'undefined' && !!window.speechSynthesis && typeof window.SpeechSynthesisUtterance !== 'undefined'; } catch (e) { return false; }
  }
  speakArabic(text) {
    if (!text || !this.ttsAvailable()) return;
    try {
      const synth = window.speechSynthesis;
      const voices = synth.getVoices ? synth.getVoices() : [];
      const arVoice = voices.find(v => v.lang && v.lang.toLowerCase().startsWith('ar'));
      const utter = new SpeechSynthesisUtterance(text);
      if (arVoice) utter.voice = arVoice;
      utter.lang = arVoice ? arVoice.lang : 'ar-SA';
      utter.rate = 0.8;
      synth.cancel();
      synth.speak(utter);
    } catch (e) { /* ignore */ }
  }

  /* ---------- flashcards: unique verified vocab deck + Leitner boxes ---------- */
  allVocab() {
    if (this._vocab) return this._vocab;
    const seen = {}; const out = [];
    try {
      (typeof QA_LESSONS !== 'undefined' && Array.isArray(QA_LESSONS) ? QA_LESSONS : []).forEach(l => {
        if (l && Array.isArray(l.vocab)) l.vocab.forEach(w => {
          if (w && w.ar && !seen[w.ar]) { seen[w.ar] = true; out.push(w); }
        });
      });
    } catch (e) { /* ignore */ }
    this._vocab = out;
    return out;
  }
  cardBox(ar) { try { const v = this.progress.cards && this.progress.cards[ar]; return (typeof v === 'number' && isFinite(v)) ? v : 0; } catch (e) { return 0; } }
  markCard(ar, known) {
    try {
      if (!ar) return;
      if (!this.progress.cards) this.progress.cards = {};
      const cur = this.cardBox(ar) || 1;             // treat a brand-new card as box 1
      this.progress.cards[ar] = known ? Math.min(cur + 1, 5) : 1;
      this.saveProgress();
    } catch (e) { /* ignore */ }
  }
  cardsSeenCount() { try { return Object.keys(this.progress.cards || {}).length; } catch (e) { return 0; } }
  cardsMasteredCount() { try { const c = this.progress.cards || {}; return Object.keys(c).filter(k => c[k] >= 5).length; } catch (e) { return 0; } }

  /* ---------- events ---------- */
  onClick(e) {
    const t0 = e.target;
    // Audio: guarded browser TTS for a single Arabic word (sibling of ref buttons).
    const sayEl = t0.closest ? t0.closest('[data-qa-say]') : null;
    if (sayEl) { e.stopPropagation(); this.speakArabic(sayEl.getAttribute('data-qa-say')); return; }
    const refEl = t0.closest ? t0.closest('[data-qa-ref]') : null;
    if (refEl) {
      const ref = refEl.getAttribute('data-qa-ref');
      const word = refEl.getAttribute('data-qa-word') || null;
      try { if (typeof ayahModal !== 'undefined' && ayahModal && typeof ayahModal.open === 'function') ayahModal.open(ref, { word: word }); } catch (err) { /* ignore */ }
      return;
    }
    const openEl = t0.closest ? t0.closest('[data-qa-open]') : null;
    if (openEl) { this.openLesson(parseInt(openEl.getAttribute('data-qa-open'), 10)); return; }
    if (t0.closest && t0.closest('[data-qa-back]')) { this.toSyllabus(); return; }
    if (t0.closest && t0.closest('[data-qa-prev]')) { this.openLesson(this.current - 1); return; }
    if (t0.closest && t0.closest('[data-qa-next]')) { this.openLesson(this.current + 1); return; }
    if (t0.closest && t0.closest('[data-qa-retry]')) { this.answer = null; this.render(); return; }
    const optEl = t0.closest ? t0.closest('[data-qa-opt]') : null;
    if (optEl) { this.answerPractice(parseInt(optEl.getAttribute('data-qa-opt'), 10)); return; }

    // Syllabus / navigation
    const unitEl = t0.closest ? t0.closest('[data-qa-unit]') : null;
    if (unitEl) { this.scrollToUnit(unitEl.getAttribute('data-qa-unit')); return; }
    if (t0.closest && t0.closest('[data-qa-glossary]')) { this.markGlossarySeen(); this.view = 'glossary'; this.render(); return; }
    if (t0.closest && t0.closest('[data-qa-flash]')) { this.startFlashcards(); return; }
    if (t0.closest && t0.closest('[data-qa-match]')) { this.startMatch(); return; }
    if (t0.closest && t0.closest('[data-qa-resume]')) { this.resumeLesson(); return; }
    const quizEl = t0.closest ? t0.closest('[data-qa-quiz]') : null;
    if (quizEl) { this.startQuiz(quizEl.getAttribute('data-qa-quiz')); return; }

    // Flashcard runner
    if (t0.closest && t0.closest('[data-qa-reveal]')) { if (this.cards) { this.cards.revealed = true; this.render(); } return; }
    const cardAns = t0.closest ? t0.closest('[data-qa-card]') : null;
    if (cardAns) { this.answerCard(cardAns.getAttribute('data-qa-card') === 'known'); return; }
    if (t0.closest && t0.closest('[data-qa-flash-restart]')) { this.startFlashcards(); return; }

    // Word-match runner
    if (t0.closest && t0.closest('[data-qa-match-restart]')) { this.startMatch(); return; }
    const mleftEl = t0.closest ? t0.closest('[data-qa-mleft]') : null;
    if (mleftEl) { this.matchSelect(parseInt(mleftEl.getAttribute('data-qa-mleft'), 10)); return; }
    const mrightEl = t0.closest ? t0.closest('[data-qa-mright]') : null;
    if (mrightEl) { this.matchAnswer(parseInt(mrightEl.getAttribute('data-qa-mright'), 10)); return; }

    // Quiz runner
    const qoptEl = t0.closest ? t0.closest('[data-qa-qopt]') : null;
    if (qoptEl) { this.answerQuiz(parseInt(qoptEl.getAttribute('data-qa-qopt'), 10)); return; }
    if (t0.closest && t0.closest('[data-qa-qnext]')) { this.nextQuiz(); return; }
    if (t0.closest && t0.closest('[data-qa-qretry]')) { if (this.quiz) this.startQuiz(this.quiz.scope); return; }
  }

  onInput(e) {
    try {
      const el = e.target;
      if (el && el.id === 'qa-gloss-search') { this.glossaryQuery = el.value || ''; this.filterGlossary(); }
    } catch (err) { /* ignore */ }
  }

  toSyllabus() { this.view = 'syllabus'; this.answer = null; this.quiz = null; this.cards = null; this.match = null; this.render(); }

  openLesson(idx) {
    const list = this.lessons();
    if (idx < 0 || idx >= list.length) return;
    this.current = idx;
    this.view = 'lesson';
    this.answer = null;
    try { const l = list[idx]; if (l && l.id && this.progress.lastLesson !== l.id) { this.progress.lastLesson = l.id; this.saveProgress(); } } catch (e) { /* ignore */ }
    this.render();
    try { if (this.container && this.container.scrollIntoView) this.container.scrollIntoView({ block: 'start' }); } catch (e) { /* ignore */ }
  }

  scrollToUnit(unitId) {
    try {
      const el = this.container ? this.container.querySelector('#qa-unit-' + unitId) : null;
      if (el && el.scrollIntoView) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (e) { /* ignore */ }
  }

  answerPractice(i) {
    const lesson = this.lessons()[this.current];
    if (!lesson || !lesson.practice) return;
    const correct = i === lesson.practice.answer;
    this.answer = { selected: i, correct: correct };
    if (correct) { this.markLearned(lesson.id); this.removeMissed(lesson.id); }
    else this.addMissed(lesson.id);
    this.render();
  }

  /* ---------- quiz ---------- */
  shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const tmp = a[i]; a[i] = a[j]; a[j] = tmp; }
    return a;
  }

  startQuiz(scope) {
    try {
      let qs;
      if (scope === 'irab') {
        // Iʿrāb practice: standalone question bank (no lesson tagging).
        qs = this.shuffle((typeof QA_IRAB !== 'undefined' && Array.isArray(QA_IRAB) ? QA_IRAB : []).map(q => Object.assign({}, q)));
      } else {
        let pool;
        if (scope === 'final') pool = this.lessons();
        else if (scope === 'missed') { const ids = this.missedIds(); pool = this.lessons().filter(l => ids.indexOf(l.id) >= 0); }
        else pool = this.unitLessons(scope);
        // Tag each question with its lesson id so quiz results can update the missed list.
        qs = this.shuffle((pool || []).filter(l => l && l.practice).map(l => Object.assign({ _lid: l.id }, l.practice)));
      }
      if (!qs.length) { this.toSyllabus(); return; }
      const cap = (scope === 'final' || scope === 'missed' || scope === 'irab') ? 10 : 5;
      this.quiz = { scope: scope, qs: qs.slice(0, Math.min(cap, qs.length)), idx: 0, score: 0, picked: null, done: false, saved: false };
      this.view = 'quiz';
      this.render();
      try { if (this.container && this.container.scrollIntoView) this.container.scrollIntoView({ block: 'start' }); } catch (e) { /* ignore */ }
    } catch (e) { this.toSyllabus(); }
  }

  answerQuiz(i) {
    const q = this.quiz;
    if (!q || q.done || q.picked != null) return;
    const cur = q.qs[q.idx];
    if (!cur) return;
    q.picked = i;
    if (i === cur.answer) { q.score++; if (cur._lid) this.removeMissed(cur._lid); }
    else if (cur._lid) this.addMissed(cur._lid);
    this.render();
  }

  nextQuiz() {
    const q = this.quiz;
    if (!q) return;
    if (q.idx + 1 < q.qs.length) { q.idx++; q.picked = null; }
    else {
      q.done = true;
      if (!q.saved) {
        const pct = q.qs.length ? Math.round((q.score / q.qs.length) * 100) : 0;
        this.saveQuizScore(q.scope, pct);
        q.saved = true;
      }
    }
    this.render();
  }

  /* ---------- flashcards ---------- */
  startFlashcards() {
    try {
      const deck = this.allVocab();
      if (!deck.length) { this.toSyllabus(); return; }
      // Leitner order: lowest box (new + missed) first, shuffled within each box.
      const byBox = {};
      deck.forEach(w => { const b = this.cardBox(w.ar); (byBox[b] = byBox[b] || []).push(w); });
      let order = [];
      Object.keys(byBox).map(Number).sort((a, b) => a - b).forEach(b => { order = order.concat(this.shuffle(byBox[b])); });
      this.cards = { deck: order, idx: 0, revealed: false, done: false, known: 0, again: 0, total: order.length };
      this.view = 'flashcards';
      this.render();
      try { if (this.container && this.container.scrollIntoView) this.container.scrollIntoView({ block: 'start' }); } catch (e) { /* ignore */ }
    } catch (e) { this.toSyllabus(); }
  }
  answerCard(known) {
    const c = this.cards;
    if (!c || c.done) return;
    const w = c.deck[c.idx];
    if (!w) return;
    this.markCard(w.ar, known);
    if (known) c.known++; else c.again++;
    if (c.idx + 1 < c.deck.length) { c.idx++; c.revealed = false; }
    else c.done = true;
    this.render();
  }

  /* ---------- resume where you left off ---------- */
  resumeIndex() {
    try {
      const id = this.progress && this.progress.lastLesson;
      if (!id) return -1;
      return this.lessons().findIndex(l => l && l.id === id);
    } catch (e) { return -1; }
  }
  resumeLesson() {
    const idx = this.resumeIndex();
    if (idx >= 0) this.openLesson(idx);
  }

  /* ---------- word match: pair verified vocab to meanings (scored, persisted) ---------- */
  matchBest() { try { const v = this.progress.match && this.progress.match.best; return (typeof v === 'number' && isFinite(v)) ? v : null; } catch (e) { return null; } }
  saveMatchScore(pct) {
    try {
      if (!this.progress.match) this.progress.match = {};
      const prev = this.matchBest();
      if (prev == null || pct > prev) { this.progress.match.best = pct; this.saveProgress(); }
    } catch (e) { /* ignore */ }
  }
  startMatch() {
    try {
      const deck = this.shuffle(this.allVocab()).slice(0, 5);
      if (deck.length < 2) { this.toSyllabus(); return; }
      // Each pair gets a stable id; the right column is a shuffled view of the same pairs.
      const pairs = deck.map((w, i) => ({ id: i, ar: w.ar, meaning: this.lc(w) }));
      this.match = {
        left: pairs,
        right: this.shuffle(pairs.slice()),
        sel: null,          // selected pair id (from the left column)
        wrongId: null,      // id briefly flagged wrong (cleared on next tap)
        matched: {},        // id -> true
        mistakes: 0,
        total: pairs.length,
        done: false,
        saved: false,
      };
      this.view = 'match';
      this.render();
      try { if (this.container && this.container.scrollIntoView) this.container.scrollIntoView({ block: 'start' }); } catch (e) { /* ignore */ }
    } catch (e) { this.toSyllabus(); }
  }
  matchSelect(id) {
    const m = this.match;
    if (!m || m.done || m.matched[id]) return;
    m.sel = id; m.wrongId = null;
    this.render();
  }
  matchAnswer(id) {
    const m = this.match;
    if (!m || m.done || m.matched[id]) return;
    if (m.sel == null) { m.wrongId = null; this.render(); return; }
    if (m.sel === id) {
      m.matched[id] = true;
      m.sel = null; m.wrongId = null;
      if (Object.keys(m.matched).length >= m.total) {
        m.done = true;
        if (!m.saved) {
          const pct = m.total ? Math.round((m.total / (m.total + m.mistakes)) * 100) : 0;
          this.saveMatchScore(pct);
          m.saved = true;
        }
      }
    } else {
      m.mistakes++;
      m.wrongId = id;
      m.sel = null;
    }
    this.render();
  }

  /* ---------- render ---------- */
  render() {
    if (!this.container) return;
    this.rendered = true;
    try {
      if (!Array.isArray(QA_LESSONS) || !QA_LESSONS.length) {
        this.container.innerHTML = `<p class="text-center text-gray-500 dark:text-gray-400 py-10">${this.esc(this.tt('qa_unavailable'))}</p>`;
        return;
      }
      let html;
      if (this.view === 'lesson') html = this.renderLesson();
      else if (this.view === 'quiz') html = this.renderQuiz();
      else if (this.view === 'glossary') html = this.renderGlossary();
      else if (this.view === 'flashcards') html = this.renderFlashcards();
      else if (this.view === 'match') html = this.renderMatch();
      else html = this.renderSyllabus();
      this.container.innerHTML = html;
    } catch (e) {
      this.container.innerHTML = `<p class="text-center text-gray-500 dark:text-gray-400 py-10">${this.esc(this.tt('qa_unavailable'))}</p>`;
    }
  }

  renderSyllabus() {
    const list = this.lessons();
    const total = list.length;
    const done = this.learnedCount();
    const pct = total ? Math.round((done / total) * 100) : 0;
    const allDone = done >= total;

    // Units overview chips (jump + per-unit progress)
    const overview = QA_UNITS.map(unit => {
      const uTotal = this.unitLessons(unit.id).length;
      if (!uTotal) return '';
      const uDone = this.unitLearnedCount(unit.id);
      const full = uDone >= uTotal;
      return `
        <button type="button" data-qa-unit="${this.esc(unit.id)}"
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${full ? 'bg-emerald-100 dark:bg-emerald-900/40 border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300'} hover:border-primary transition-colors">
          <span aria-hidden="true">${this.esc(unit.icon)}</span>
          <span dir="auto">${this.esc(this.lc(unit))}</span>
          <span class="opacity-70">${uDone}/${uTotal}</span>
        </button>`;
    }).join('');

    const units = QA_UNITS.map(unit => {
      const items = list.map((l, idx) => ({ l, idx })).filter(x => x.l.unit === unit.id);
      if (!items.length) return '';
      const uTotal = items.length;
      const uDone = this.unitLearnedCount(unit.id);
      const best = this.bestQuiz(unit.id);
      const cards = items.map(({ l, idx }) => {
        const learned = this.isLearned(l.id);
        return `
          <button type="button" data-qa-open="${idx}"
            class="group w-full text-left flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-gray-800 border ${learned ? 'border-emerald-300 dark:border-emerald-700' : 'border-gray-200 dark:border-gray-700'} hover:border-primary hover:shadow-md transition-all">
            <span class="flex items-center justify-center w-9 h-9 shrink-0 rounded-lg text-lg ${learned ? 'bg-emerald-100 dark:bg-emerald-900/40' : 'bg-gray-100 dark:bg-gray-700'}" aria-hidden="true">${learned ? '✓' : this.esc(l.icon)}</span>
            <span class="flex-1 min-w-0">
              <span class="block font-semibold text-gray-800 dark:text-gray-100 truncate" dir="auto">${this.esc(this.lc(l.title))}</span>
              <span class="block text-xs ${learned ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400 dark:text-gray-500'}">${learned ? this.esc(this.tt('qa_learned')) : (this.esc(this.tt('qa_lesson')) + ' ' + (idx + 1))}</span>
            </span>
            <span class="text-gray-300 dark:text-gray-600 group-hover:text-primary transition-colors" aria-hidden="true">›</span>
          </button>`;
      }).join('');
      return `
        <section id="qa-unit-${this.esc(unit.id)}" class="mb-7 scroll-mt-4">
          <div class="flex items-center justify-between gap-2 mb-3">
            <h3 class="flex items-center gap-2 text-base font-bold text-gray-700 dark:text-gray-200">
              <span aria-hidden="true">${this.esc(unit.icon)}</span><span dir="auto">${this.esc(this.lc(unit))}</span>
              <span class="text-xs font-normal text-gray-400 dark:text-gray-500">${uDone}/${uTotal}</span>
            </h3>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">${cards}</div>
          <div class="mt-3 text-center">
            <button type="button" data-qa-quiz="${this.esc(unit.id)}"
              class="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300 hover:bg-sky-200 dark:hover:bg-sky-900/60 transition-colors">
              📝 ${this.esc(this.tt('qa_unit_quiz'))}
              ${best != null ? `<span class="text-xs opacity-80">${this.esc(this.tt('qa_best'))} ${best}%</span>` : ''}
            </button>
          </div>
        </section>`;
    }).join('');

    const finalBest = this.bestQuiz('final');
    const irabBest = this.bestQuiz('irab');
    const missed = this.missedCount();

    // ---------- read-only progress dashboard (degrades silently if keys absent) ----------
    const glossTotal = (typeof QA_GLOSSARY !== 'undefined' && Array.isArray(QA_GLOSSARY)) ? QA_GLOSSARY.length : 0;
    const glossSeen = this.glossarySeenCount();
    const vocabTotal = this.allVocab().length;
    const cardsMastered = this.cardsMasteredCount();
    const unitsAced = QA_UNITS.filter(u => { const ut = this.unitLessons(u.id).length; return ut > 0 && this.unitLearnedCount(u.id) >= ut; }).length;
    const unitsWithLessons = QA_UNITS.filter(u => this.unitLessons(u.id).length > 0).length;
    const dashTile = (icon, label, value, tone) => `
      <div class="p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-center">
        <div class="text-lg" aria-hidden="true">${icon}</div>
        <div class="text-lg font-extrabold ${tone}">${value}</div>
        <div class="text-[0.68rem] text-gray-400 dark:text-gray-500 leading-tight" dir="auto">${this.esc(label)}</div>
      </div>`;
    const dashboard = `
      <div class="mb-6 p-4 rounded-2xl bg-white/60 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-700">
        <h3 class="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-200 mb-3">
          <span aria-hidden="true">📊</span><span dir="auto">${this.esc(this.tt('qa_dashboard'))}</span>
        </h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          ${dashTile('📚', this.tt('qa_dash_lessons'), `${done}/${total}`, 'text-emerald-600 dark:text-emerald-400')}
          ${dashTile('🏅', this.tt('qa_dash_units'), `${unitsAced}/${unitsWithLessons}`, 'text-sky-600 dark:text-sky-400')}
          ${dashTile('📖', this.tt('qa_dash_glossary'), `${glossSeen}/${glossTotal}`, 'text-amber-600 dark:text-amber-400')}
          ${dashTile('🃏', this.tt('qa_dash_cards'), `${cardsMastered}/${vocabTotal}`, 'text-indigo-600 dark:text-indigo-400')}
          ${dashTile('🧩', this.tt('qa_dash_irab'), irabBest != null ? irabBest + '%' : '—', 'text-violet-600 dark:text-violet-400')}
          ${dashTile('🎯', this.tt('qa_dash_match'), this.matchBest() != null ? this.matchBest() + '%' : '—', 'text-teal-600 dark:text-teal-400')}
        </div>
      </div>`;

    return `
      <div class="w-full max-w-4xl mx-auto">
        <div class="text-center mb-5">
          <h2 class="text-2xl font-extrabold text-gray-800 dark:text-gray-100">${this.esc(this.tt('qa_title'))}</h2>
          <p class="text-gray-500 dark:text-gray-400 text-sm mt-1 max-w-2xl mx-auto" dir="auto">${this.esc(this.tt('qa_subtitle'))}</p>
        </div>
        <div class="mb-5 p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-sky-50 dark:from-gray-800 dark:to-gray-800 border border-emerald-100 dark:border-gray-700">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-semibold text-gray-700 dark:text-gray-200">${done} / ${total} ${this.esc(this.tt('qa_progress'))}</span>
            <span class="text-sm font-bold text-emerald-600 dark:text-emerald-400">${pct}%</span>
          </div>
          <div class="w-full h-2.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
            <div class="h-full rounded-full bg-gradient-to-r from-emerald-400 to-sky-500 transition-all" style="width:${pct}%"></div>
          </div>
          ${allDone ? `<p class="text-center text-sm font-semibold text-emerald-700 dark:text-emerald-400 mt-3">${this.esc(this.tt('qa_finish_title'))}</p>` : ''}
        </div>

        ${(() => {
          const ri = this.resumeIndex();
          if (ri < 0) return '';
          const rl = this.lessons()[ri];
          if (!rl) return '';
          return `
        <button type="button" data-qa-resume class="w-full mb-5 flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-gray-800 border border-primary/40 hover:border-primary hover:shadow-md transition-all text-left">
          <span class="flex items-center justify-center w-10 h-10 shrink-0 rounded-xl bg-primary/10 text-lg" aria-hidden="true">↩️</span>
          <span class="flex-1 min-w-0">
            <span class="block text-[0.7rem] font-semibold uppercase tracking-wide text-primary">${this.esc(this.tt('qa_resume'))}</span>
            <span class="block font-semibold text-gray-800 dark:text-gray-100 truncate" dir="auto">${this.esc(this.lc(rl.title))}</span>
            <span class="block text-xs text-gray-400 dark:text-gray-500" dir="auto">${this.esc(this.tt('qa_resume_hint'))}</span>
          </span>
          <span class="text-primary text-lg" aria-hidden="true">›</span>
        </button>`;
        })()}

        ${dashboard}

        <div class="mb-6">
          <div class="flex items-center justify-between gap-2 mb-2">
            <span class="text-xs font-bold uppercase tracking-wide text-gray-400 dark:text-gray-500">${this.esc(this.tt('qa_units'))}</span>
            <div class="flex items-center gap-2">
              <button type="button" data-qa-flash
                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-900/60 transition-colors">
                🃏 ${this.esc(this.tt('qa_flashcards'))}
              </button>
              <button type="button" data-qa-match
                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 hover:bg-teal-200 dark:hover:bg-teal-900/60 transition-colors">
                🧩 ${this.esc(this.tt('qa_match'))}${this.matchBest() != null ? ` <span class="opacity-80">${this.matchBest()}%</span>` : ''}
              </button>
              <button type="button" data-qa-glossary
                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-900/60 transition-colors">
                📖 ${this.esc(this.tt('qa_glossary'))}
              </button>
            </div>
          </div>
          <div class="flex flex-wrap gap-2">${overview}</div>
        </div>

        ${units}

        <div class="mt-2 mb-8 flex flex-wrap items-center justify-center gap-3">
          ${missed > 0 ? `
          <button type="button" data-qa-quiz="missed"
            class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 hover:bg-rose-200 dark:hover:bg-rose-900/60 transition-colors">
            🔁 ${this.esc(this.tt('qa_review_missed'))}
            <span class="text-xs font-semibold opacity-90">${missed}</span>
          </button>` : ''}
          <button type="button" data-qa-quiz="irab"
            class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 hover:bg-violet-200 dark:hover:bg-violet-900/60 transition-colors">
            🧩 ${this.esc(this.tt('qa_irab_quiz'))}
            ${irabBest != null ? `<span class="text-xs font-semibold opacity-90">${this.esc(this.tt('qa_best'))} ${irabBest}%</span>` : ''}
          </button>
          <button type="button" data-qa-quiz="final"
            class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-primary text-white hover:opacity-90 transition-opacity">
            🎓 ${this.esc(this.tt('qa_final_quiz'))}
            ${finalBest != null ? `<span class="text-xs font-semibold opacity-90">${this.esc(this.tt('qa_best'))} ${finalBest}%</span>` : ''}
          </button>
        </div>

        <div class="mb-10 p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-emerald-50 dark:from-gray-800 dark:to-gray-800 border border-amber-100 dark:border-gray-700">
          <h3 class="flex items-center gap-2 text-base font-bold text-gray-700 dark:text-gray-200 mb-3">
            <span aria-hidden="true">🧭</span><span dir="auto">${this.esc(this.tt('qa_continue_title'))}</span>
          </h3>
          <ul class="space-y-2">
            ${(typeof QA_NEXT_STEPS !== 'undefined' && Array.isArray(QA_NEXT_STEPS) ? QA_NEXT_STEPS : []).map(s => `
            <li class="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300 leading-relaxed" dir="auto">
              <span class="text-emerald-500 mt-0.5" aria-hidden="true">✔</span>
              <span>${this.esc(this.lc(s))}</span>
            </li>`).join('')}
          </ul>
        </div>
      </div>`;
  }

  renderWordRow(words) {
    return (words || []).map(w => `
      <span class="inline-flex flex-col items-center px-1.5 py-1 rounded-lg ${w.hl ? 'bg-emerald-100 dark:bg-emerald-900/40' : ''}">
        <span class="text-xl leading-snug ${w.hl ? 'text-emerald-700 dark:text-emerald-300 font-bold' : 'text-gray-800 dark:text-gray-100'}" dir="rtl">${this.esc(w.ar)}</span>
        <span class="text-[0.68rem] ${w.hl ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-gray-400 dark:text-gray-500'}" dir="auto">${this.esc(this.lc(w))}</span>
        ${w.role ? `<span class="mt-0.5 text-[0.58rem] leading-tight px-1 py-0.5 rounded bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300 text-center" dir="auto">${this.esc(this.lc(w.role))}</span>` : ''}
      </span>`).join('');
  }

  renderExample(ex) {
    const arabic = (ex.words || []).map(w =>
      `<span class="${w.hl ? 'text-emerald-600 dark:text-emerald-400' : ''}">${this.esc(w.ar)}</span>`
    ).join(' ');
    const plainArabic = (ex.words || []).map(w => w.ar).join(' ');
    const hlWord = (ex.words || []).find(w => w.hl);
    const tts = this.ttsAvailable();
    return `
      <div class="mb-4 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div class="p-4 bg-gray-50 dark:bg-gray-800/60 text-center">
          <p class="text-2xl sm:text-3xl leading-loose font-[500] text-gray-800 dark:text-gray-100" dir="rtl" lang="ar">${arabic}</p>
          ${tts ? `<button type="button" data-qa-say="${this.esc(plainArabic)}" title="${this.esc(this.tt('qa_listen'))}" aria-label="${this.esc(this.tt('qa_listen'))}"
            class="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-primary/15 hover:text-primary transition-colors">🔊 ${this.esc(this.tt('qa_listen'))}</button>` : ''}
        </div>
        <div class="p-4">
          <div class="flex flex-wrap items-start justify-center gap-1.5 mb-3" dir="rtl">${this.renderWordRow(ex.words)}</div>
          <p class="text-sm text-gray-600 dark:text-gray-300 text-center italic mb-3" dir="auto">“${this.esc(this.lc(ex.trans))}”</p>
          ${ex.note ? `<p class="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/60 rounded-lg p-2.5 mb-3" dir="auto">💡 ${this.esc(this.lc(ex.note))}</p>` : ''}
          <div class="text-center">
            <button type="button" data-qa-ref="${this.esc(ex.ref)}" ${hlWord ? `data-qa-word="${this.esc(hlWord.ar)}"` : ''}
              class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
              📖 ${this.esc(ex.ref)} <span class="text-[0.65rem] opacity-70">↗</span>
            </button>
          </div>
        </div>
      </div>`;
  }

  renderPractice(lesson) {
    const p = lesson.practice;
    if (!p) return '';
    const answered = this.answer != null;
    const opts = (p.options || []).map((o, i) => {
      let cls = 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-primary';
      let icon = '';
      if (answered) {
        if (i === p.answer) { cls = 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-400 dark:border-emerald-600 text-emerald-800 dark:text-emerald-300'; icon = '✓'; }
        else if (i === this.answer.selected) { cls = 'bg-rose-50 dark:bg-rose-900/30 border-rose-300 dark:border-rose-700 text-rose-700 dark:text-rose-300'; icon = '✕'; }
        else { cls = 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 opacity-60'; }
      }
      return `
        <button type="button" ${answered ? 'disabled' : `data-qa-opt="${i}"`}
          class="w-full text-left flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl border ${cls} transition-all">
          <span dir="auto">${this.esc(this.optText(o))}</span>
          <span class="text-sm font-bold" aria-hidden="true">${icon}</span>
        </button>`;
    }).join('');

    let feedback = '';
    if (answered) {
      const ok = this.answer.correct;
      feedback = `
        <div class="mt-3 p-3 rounded-xl ${ok ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300' : 'bg-amber-50 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300'}">
          <p class="font-semibold text-sm mb-1">${ok ? '🎉 ' + this.esc(this.tt('qa_correct')) : '🤔 ' + this.esc(this.tt('qa_incorrect'))}</p>
          <p class="text-xs leading-relaxed" dir="auto">${this.esc(this.lc(p.explain))}</p>
          ${!ok ? `<button type="button" data-qa-retry class="mt-2 text-xs font-semibold underline">${this.esc(this.tt('qa_retry'))}</button>` : ''}
        </div>`;
    }

    return `
      <div class="mb-6 p-4 rounded-2xl bg-sky-50/60 dark:bg-gray-800/60 border border-sky-100 dark:border-gray-700">
        <h4 class="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-200 mb-3">
          <span aria-hidden="true">🧠</span><span>${this.esc(this.tt('qa_practice'))}</span>
        </h4>
        <p class="text-sm text-gray-700 dark:text-gray-200 mb-3" dir="auto">${this.esc(this.lc(p.q))}</p>
        <div class="space-y-2">${opts}</div>
        ${feedback}
      </div>`;
  }

  renderLesson() {
    const list = this.lessons();
    const idx = this.current;
    const lesson = list[idx];
    if (!lesson) { this.view = 'syllabus'; return this.renderSyllabus(); }
    const unit = QA_UNITS.find(u => u.id === lesson.unit);
    const learned = this.isLearned(lesson.id);
    const examples = (lesson.examples || []).map(ex => this.renderExample(ex)).join('');
    const tts = this.ttsAvailable();

    return `
      <div class="w-full max-w-3xl mx-auto">
        <div class="flex items-center justify-between mb-4">
          <button type="button" data-qa-back class="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-primary transition-colors">
            ‹ ${this.esc(this.tt('qa_back'))}
          </button>
          <span class="text-xs text-gray-400 dark:text-gray-500">${this.esc(this.tt('qa_lesson'))} ${idx + 1} ${this.esc(this.tt('qa_of'))} ${list.length}</span>
        </div>

        <div class="mb-4">
          ${unit ? `<span class="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 mb-2">${this.esc(unit.icon)} ${this.esc(this.lc(unit))}</span>` : ''}
          <h2 class="text-2xl font-extrabold text-gray-800 dark:text-gray-100 flex items-center gap-2" dir="auto">
            <span aria-hidden="true">${this.esc(lesson.icon)}</span><span>${this.esc(this.lc(lesson.title))}</span>
            ${learned ? `<span class="text-xs font-semibold text-emerald-600 dark:text-emerald-400 align-middle">${this.esc(this.tt('qa_learned'))}</span>` : ''}
          </h2>
        </div>

        <div class="mb-5 p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <h4 class="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">
            <span aria-hidden="true">📚</span><span>${this.esc(this.tt('qa_concept'))}</span>
          </h4>
          <p class="text-sm leading-relaxed text-gray-600 dark:text-gray-300" dir="auto">${this.lc(lesson.concept)}</p>
        </div>

        ${Array.isArray(lesson.vocab) && lesson.vocab.length ? `
        <h4 class="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-200 mb-1">
          <span aria-hidden="true">⭐</span><span>${this.esc(this.tt('qa_vocab_words'))}</span>
        </h4>
        <p class="text-[0.68rem] text-gray-400 dark:text-gray-500 mb-3">${this.esc(this.tt('qa_vocab_hint'))}</p>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 mb-6">
          ${lesson.vocab.map(w => `
          <div class="relative">
            <button type="button" data-qa-ref="${this.esc(w.ref)}" data-qa-word="${this.esc(w.ar)}"
              class="group w-full flex flex-col items-center gap-1 p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary hover:shadow-md transition-all">
              <span class="text-2xl leading-snug text-gray-800 dark:text-gray-100 group-hover:text-primary transition-colors" dir="rtl" lang="ar">${this.esc(w.ar)}</span>
              <span class="text-xs text-gray-600 dark:text-gray-300 text-center leading-tight" dir="auto">${this.esc(this.lc(w))}</span>
              <span class="text-[0.6rem] px-1.5 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400" dir="auto">${this.esc(this.lc(w.pos))}</span>
              <span class="text-[0.6rem] text-primary/70">📖 ${this.esc(w.ref)}</span>
            </button>
            ${tts ? `<button type="button" data-qa-say="${this.esc(w.ar)}" title="${this.esc(this.tt('qa_listen'))}" aria-label="${this.esc(this.tt('qa_listen'))}"
              class="absolute top-1.5 right-1.5 w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-sm text-gray-500 dark:text-gray-300 hover:bg-primary/15 hover:text-primary transition-colors">🔊</button>` : ''}
          </div>`).join('')}
        </div>` : ''}

        ${examples ? `
        <h4 class="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-200 mb-3">
          <span aria-hidden="true">🕋</span><span>${this.esc(this.tt('qa_example'))}</span>
          <span class="text-[0.68rem] font-normal text-gray-400 dark:text-gray-500">— ${this.esc(this.tt('qa_tap_ref'))}</span>
        </h4>
        ${examples}` : ''}

        ${this.renderPractice(lesson)}

        <div class="flex items-center justify-between gap-3 mt-6">
          <button type="button" ${idx > 0 ? 'data-qa-prev' : 'disabled'}
            class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold ${idx > 0 ? 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600' : 'bg-gray-50 dark:bg-gray-800 text-gray-300 dark:text-gray-600 cursor-not-allowed'} transition-colors">
            ‹ ${this.esc(this.tt('qa_prev'))}
          </button>
          <button type="button" ${idx < list.length - 1 ? 'data-qa-next' : 'data-qa-back'}
            class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold bg-primary text-white hover:opacity-90 transition-opacity">
            ${idx < list.length - 1 ? this.esc(this.tt('qa_next')) + ' ›' : this.esc(this.tt('qa_back'))}
          </button>
        </div>
      </div>`;
  }

  /* ---------- glossary ---------- */
  glossaryMatch(item, q) {
    if (!q) return true;
    const hay = [item.translit, item.en, item.bn, item.ar].join(' ').toLowerCase();
    return hay.indexOf(q.toLowerCase()) >= 0;
  }

  filterGlossary() {
    try {
      const q = (this.glossaryQuery || '').trim().toLowerCase();
      const rows = this.container ? this.container.querySelectorAll('[data-qa-gterm]') : [];
      let shown = 0;
      rows.forEach((row) => {
        const hay = (row.getAttribute('data-qa-gterm') || '').toLowerCase();
        const match = !q || hay.indexOf(q) >= 0;
        row.classList.toggle('hidden', !match);
        if (match) shown++;
      });
      const empty = this.container ? this.container.querySelector('#qa-gloss-empty') : null;
      if (empty) empty.classList.toggle('hidden', shown !== 0);
    } catch (e) { /* ignore */ }
  }

  renderGlossary() {
    const q = (this.glossaryQuery || '').trim();
    const rows = QA_GLOSSARY.map(item => {
      const hay = [item.translit, item.en, item.bn, item.ar].join(' ');
      const hidden = this.glossaryMatch(item, q) ? '' : ' hidden';
      const ex = item.ex ? `
        <button type="button" data-qa-ref="${this.esc(item.ex.ref)}" data-qa-word="${this.esc(item.ex.ar)}"
          class="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
          <span dir="rtl" lang="ar" class="text-sm">${this.esc(item.ex.ar)}</span>
          <span class="opacity-70">${this.esc(item.ex.ref)} ↗</span>
        </button>` : '';
      return `
        <div data-qa-gterm="${this.esc(hay)}" class="p-3.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700${hidden}">
          <div class="flex items-baseline justify-between gap-2">
            <span class="text-lg font-bold text-gray-800 dark:text-gray-100" dir="rtl" lang="ar">${this.esc(item.ar)}</span>
            <span class="text-xs font-semibold text-primary">${this.esc(item.translit)}</span>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-300 mt-1 leading-relaxed" dir="auto">${this.esc(this.lc(item))}</p>
          ${ex}
        </div>`;
    }).join('');

    return `
      <div class="w-full max-w-4xl mx-auto">
        <div class="flex items-center justify-between mb-4">
          <button type="button" data-qa-back class="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-primary transition-colors">
            ‹ ${this.esc(this.tt('qa_back'))}
          </button>
        </div>
        <div class="text-center mb-4">
          <h2 class="text-2xl font-extrabold text-gray-800 dark:text-gray-100">📖 ${this.esc(this.tt('qa_glossary_title'))}</h2>
          <p class="text-gray-500 dark:text-gray-400 text-sm mt-1" dir="auto">${this.esc(this.tt('qa_glossary_sub'))}</p>
        </div>
        <div class="mb-4">
          <input id="qa-gloss-search" type="search" autocomplete="off" value="${this.esc(q)}"
            placeholder="${this.esc(this.tt('qa_search'))}"
            class="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-800 dark:text-gray-100 focus:outline-none focus:border-primary" dir="auto" />
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">${rows}</div>
        <p id="qa-gloss-empty" class="hidden text-center text-gray-400 dark:text-gray-500 py-8 text-sm">${this.esc(this.tt('qa_no_results'))}</p>
      </div>`;
  }

  /* ---------- flashcards view ---------- */
  renderFlashcards() {
    const c = this.cards;
    if (!c || !Array.isArray(c.deck) || !c.deck.length) { this.view = 'syllabus'; return this.renderSyllabus(); }
    const tts = this.ttsAvailable();
    const header = `
      <div class="flex items-center justify-between mb-4">
        <button type="button" data-qa-back class="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-primary transition-colors">‹ ${this.esc(this.tt('qa_back'))}</button>
        <span class="text-xs text-gray-400 dark:text-gray-500">${this.esc(this.tt('qa_flash_card'))} ${Math.min(c.idx + 1, c.total)} / ${c.total}</span>
      </div>`;

    if (c.done) {
      return `
        <div class="w-full max-w-xl mx-auto">
          ${header}
          <div class="pt-8 p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-center">
            <div class="text-5xl mb-3">🃏</div>
            <h2 class="text-xl font-extrabold text-gray-800 dark:text-gray-100 mb-2">${this.esc(this.tt('qa_flash_done'))}</h2>
            <div class="flex items-center justify-center gap-4 my-4">
              <div><div class="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">${c.known}</div><div class="text-[0.68rem] text-gray-400">${this.esc(this.tt('qa_flash_known'))}</div></div>
              <div><div class="text-2xl font-extrabold text-amber-600 dark:text-amber-400">${c.again}</div><div class="text-[0.68rem] text-gray-400">${this.esc(this.tt('qa_flash_again'))}</div></div>
            </div>
            <div class="flex items-center justify-center gap-3 mt-4">
              <button type="button" data-qa-flash-restart class="px-4 py-2 rounded-xl text-sm font-semibold bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">↺ ${this.esc(this.tt('qa_flash_restart'))}</button>
              <button type="button" data-qa-back class="px-4 py-2 rounded-xl text-sm font-semibold bg-primary text-white hover:opacity-90 transition-opacity">${this.esc(this.tt('qa_close'))}</button>
            </div>
          </div>
        </div>`;
    }

    const w = c.deck[c.idx];
    const box = this.cardBox(w.ar) || 1;
    const prog = c.total ? Math.round((c.idx / c.total) * 100) : 0;
    const listenBtn = tts ? `<button type="button" data-qa-say="${this.esc(w.ar)}" title="${this.esc(this.tt('qa_listen'))}" aria-label="${this.esc(this.tt('qa_listen'))}"
        class="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-primary/15 hover:text-primary transition-colors">🔊 ${this.esc(this.tt('qa_listen'))}</button>` : '';

    const front = `
      <div class="text-4xl sm:text-5xl leading-loose text-gray-800 dark:text-gray-100 mb-2" dir="rtl" lang="ar">${this.esc(w.ar)}</div>
      ${listenBtn}
      <p class="mt-4 text-xs text-gray-400 dark:text-gray-500">${this.esc(this.tt('qa_flash_reveal'))} 👆</p>`;

    const back = `
      <div class="text-4xl sm:text-5xl leading-loose text-gray-800 dark:text-gray-100 mb-2" dir="rtl" lang="ar">${this.esc(w.ar)}</div>
      ${listenBtn}
      <p class="mt-3 text-lg font-bold text-emerald-700 dark:text-emerald-300" dir="auto">${this.esc(this.lc(w))}</p>
      <p class="mt-1 text-xs text-gray-500 dark:text-gray-400" dir="auto">${this.esc(this.lc(w.pos))}</p>
      <button type="button" data-qa-ref="${this.esc(w.ref)}" data-qa-word="${this.esc(w.ar)}"
        class="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary hover:bg-primary/20 transition-colors">📖 ${this.esc(w.ref)} <span class="text-[0.65rem] opacity-70">↗</span></button>`;

    const controls = c.revealed ? `
      <div class="grid grid-cols-2 gap-3 mt-4">
        <button type="button" data-qa-card="again" class="px-4 py-3 rounded-xl text-sm font-bold bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-900/60 transition-colors">🔁 ${this.esc(this.tt('qa_flash_again'))}</button>
        <button type="button" data-qa-card="known" class="px-4 py-3 rounded-xl text-sm font-bold bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-900/60 transition-colors">✓ ${this.esc(this.tt('qa_flash_known'))}</button>
      </div>` : `
      <button type="button" data-qa-reveal class="w-full mt-4 px-4 py-3 rounded-xl text-sm font-bold bg-primary text-white hover:opacity-90 transition-opacity">${this.esc(this.tt('qa_flash_reveal'))}</button>`;

    return `
      <div class="w-full max-w-xl mx-auto">
        ${header}
        <div class="text-center mb-3">
          <h2 class="text-xl font-extrabold text-gray-800 dark:text-gray-100">🃏 ${this.esc(this.tt('qa_flash_title'))}</h2>
          <p class="text-gray-500 dark:text-gray-400 text-xs mt-1 max-w-md mx-auto" dir="auto">${this.esc(this.tt('qa_flash_sub'))}</p>
        </div>
        <div class="mb-3 w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
          <div class="h-full rounded-full bg-gradient-to-r from-indigo-400 to-sky-500 transition-all" style="width:${prog}%"></div>
        </div>
        ${c.revealed ? '' : `<div data-qa-reveal role="button" tabindex="0"
          class="block w-full text-center p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary transition-colors cursor-pointer">${front}</div>`}
        ${c.revealed ? `<div class="text-center p-8 rounded-2xl bg-white dark:bg-gray-800 border border-emerald-300 dark:border-emerald-700">${back}</div>` : ''}
        <div class="flex items-center justify-between mt-3 text-[0.68rem] text-gray-400 dark:text-gray-500">
          <span>${this.esc(this.tt('qa_flash_box'))} ${box}/5</span>
          <span>✓ ${c.known} · 🔁 ${c.again}</span>
        </div>
        ${controls}
      </div>`;
  }

  /* ---------- word match view ---------- */
  renderMatch() {
    const m = this.match;
    if (!m || !Array.isArray(m.left) || !m.left.length) { this.view = 'syllabus'; return this.renderSyllabus(); }
    const matchedN = Object.keys(m.matched).length;
    const header = `
      <div class="flex items-center justify-between mb-4">
        <button type="button" data-qa-back class="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-primary transition-colors">‹ ${this.esc(this.tt('qa_back'))}</button>
        <span class="text-xs text-gray-400 dark:text-gray-500">${matchedN} / ${m.total}</span>
      </div>`;

    if (m.done) {
      const pct = m.total ? Math.round((m.total / (m.total + m.mistakes)) * 100) : 0;
      const best = this.matchBest();
      const good = m.mistakes === 0;
      return `
        <div class="w-full max-w-xl mx-auto">
          ${header}
          <div class="pt-8 p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-center">
            <div class="text-5xl mb-3">${good ? '🎯' : '🧩'}</div>
            <h2 class="text-xl font-extrabold text-gray-800 dark:text-gray-100 mb-2">${this.esc(this.tt('qa_match_done'))}</h2>
            <div class="text-4xl font-extrabold text-teal-600 dark:text-teal-400 mb-1">${pct}%</div>
            <p class="text-sm text-gray-600 dark:text-gray-300 mb-1">${this.esc(this.tt('qa_match_accuracy'))}</p>
            <p class="text-xs text-gray-400 dark:text-gray-500 mb-1">${this.esc(this.tt('qa_match_mistakes'))}: ${m.mistakes}</p>
            ${best != null ? `<p class="text-xs text-gray-400 dark:text-gray-500 mb-4">${this.esc(this.tt('qa_best'))}: ${best}%</p>` : '<div class="mb-4"></div>'}
            <div class="flex items-center justify-center gap-3">
              <button type="button" data-qa-match-restart class="px-4 py-2 rounded-xl text-sm font-semibold bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">↺ ${this.esc(this.tt('qa_match_restart'))}</button>
              <button type="button" data-qa-back class="px-4 py-2 rounded-xl text-sm font-semibold bg-primary text-white hover:opacity-90 transition-opacity">${this.esc(this.tt('qa_close'))}</button>
            </div>
          </div>
        </div>`;
    }

    const leftCol = m.left.map(p => {
      const done = !!m.matched[p.id];
      const sel = m.sel === p.id;
      let cls = 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-primary';
      if (done) cls = 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-400 dark:border-emerald-600 opacity-70';
      else if (sel) cls = 'bg-teal-50 dark:bg-teal-900/30 border-teal-400 dark:border-teal-500 ring-2 ring-teal-300 dark:ring-teal-700';
      return `
        <button type="button" ${done ? 'disabled' : `data-qa-mleft="${p.id}"`}
          class="w-full flex items-center justify-center px-3 py-3 rounded-xl border ${cls} transition-all">
          <span class="text-2xl leading-snug text-gray-800 dark:text-gray-100" dir="rtl" lang="ar">${this.esc(p.ar)}</span>
          ${done ? '<span class="ml-2 text-emerald-600 dark:text-emerald-400 text-sm">✓</span>' : ''}
        </button>`;
    }).join('');

    const rightCol = m.right.map(p => {
      const done = !!m.matched[p.id];
      const wrong = m.wrongId === p.id;
      let cls = 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-primary';
      if (done) cls = 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-400 dark:border-emerald-600 opacity-70';
      else if (wrong) cls = 'bg-rose-50 dark:bg-rose-900/30 border-rose-300 dark:border-rose-700';
      return `
        <button type="button" ${done ? 'disabled' : `data-qa-mright="${p.id}"`}
          class="w-full flex items-center justify-between gap-2 px-3 py-3 rounded-xl border ${cls} transition-all text-left">
          <span class="text-sm text-gray-700 dark:text-gray-200" dir="auto">${this.esc(p.meaning)}</span>
          ${done ? '<span class="text-emerald-600 dark:text-emerald-400 text-sm">✓</span>' : (wrong ? '<span class="text-rose-500 text-sm">✕</span>' : '')}
        </button>`;
    }).join('');

    const prog = m.total ? Math.round((matchedN / m.total) * 100) : 0;
    return `
      <div class="w-full max-w-2xl mx-auto">
        ${header}
        <div class="text-center mb-3">
          <h2 class="text-xl font-extrabold text-gray-800 dark:text-gray-100">🧩 ${this.esc(this.tt('qa_match_title'))}</h2>
          <p class="text-gray-500 dark:text-gray-400 text-xs mt-1 max-w-md mx-auto" dir="auto">${this.esc(this.tt('qa_match_sub'))}</p>
        </div>
        <div class="mb-3 w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
          <div class="h-full rounded-full bg-gradient-to-r from-teal-400 to-emerald-500 transition-all" style="width:${prog}%"></div>
        </div>
        <div class="flex items-center justify-between mb-2 text-[0.68rem] text-gray-400 dark:text-gray-500">
          <span>${m.sel != null ? this.esc(this.tt('qa_match_pick')) : ''}</span>
          <span>${this.esc(this.tt('qa_match_mistakes'))}: ${m.mistakes}</span>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <p class="text-[0.7rem] font-bold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-1.5 text-center">${this.esc(this.tt('qa_match_word'))}</p>
            <div class="space-y-2">${leftCol}</div>
          </div>
          <div>
            <p class="text-[0.7rem] font-bold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-1.5 text-center">${this.esc(this.tt('qa_match_meaning'))}</p>
            <div class="space-y-2">${rightCol}</div>
          </div>
        </div>
      </div>`;
  }

  /* ---------- quiz view ---------- */
  quizScopeName(scope) {
    if (scope === 'final') return this.tt('qa_final_quiz');
    if (scope === 'missed') return this.tt('qa_review_scope');
    if (scope === 'irab') return this.tt('qa_irab_quiz');
    const u = QA_UNITS.find(x => x.id === scope);
    return u ? this.lc(u) : this.tt('qa_quiz');
  }

  renderQuiz() {
    const q = this.quiz;
    if (!q || !Array.isArray(q.qs) || !q.qs.length) { this.view = 'syllabus'; return this.renderSyllabus(); }
    const nTotal = q.qs.length;

    if (q.done) {
      const pct = nTotal ? Math.round((q.score / nTotal) * 100) : 0;
      const best = this.bestQuiz(q.scope);
      const good = pct >= 60;
      return `
        <div class="w-full max-w-xl mx-auto text-center">
          <div class="mb-4">
            <button type="button" data-qa-back class="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-primary transition-colors float-left">‹ ${this.esc(this.tt('qa_back'))}</button>
          </div>
          <div class="pt-8 p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <div class="text-5xl mb-3">${good ? '🎉' : '📚'}</div>
            <h2 class="text-xl font-extrabold text-gray-800 dark:text-gray-100 mb-1">${this.esc(this.tt('qa_quiz_done'))}</h2>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-4" dir="auto">${this.esc(this.quizScopeName(q.scope))}</p>
            <div class="text-4xl font-extrabold ${good ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'} mb-1">${pct}%</div>
            <p class="text-sm text-gray-600 dark:text-gray-300 mb-1">${this.esc(this.tt('qa_your_score'))}: ${q.score} / ${nTotal}</p>
            ${best != null ? `<p class="text-xs text-gray-400 dark:text-gray-500 mb-4">${this.esc(this.tt('qa_best'))}: ${best}%</p>` : '<div class="mb-4"></div>'}
            <div class="flex items-center justify-center gap-3">
              <button type="button" data-qa-qretry class="px-4 py-2 rounded-xl text-sm font-semibold bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">↺ ${this.esc(this.tt('qa_retry'))}</button>
              <button type="button" data-qa-back class="px-4 py-2 rounded-xl text-sm font-semibold bg-primary text-white hover:opacity-90 transition-opacity">${this.esc(this.tt('qa_close'))}</button>
            </div>
          </div>
        </div>`;
    }

    const cur = q.qs[q.idx];
    const answered = q.picked != null;
    const opts = (cur.options || []).map((o, i) => {
      let cls = 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-primary';
      let icon = '';
      if (answered) {
        if (i === cur.answer) { cls = 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-400 dark:border-emerald-600 text-emerald-800 dark:text-emerald-300'; icon = '✓'; }
        else if (i === q.picked) { cls = 'bg-rose-50 dark:bg-rose-900/30 border-rose-300 dark:border-rose-700 text-rose-700 dark:text-rose-300'; icon = '✕'; }
        else { cls = 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 opacity-60'; }
      }
      return `
        <button type="button" ${answered ? 'disabled' : `data-qa-qopt="${i}"`}
          class="w-full text-left flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl border ${cls} transition-all">
          <span dir="auto">${this.esc(this.optText(o))}</span>
          <span class="text-sm font-bold" aria-hidden="true">${icon}</span>
        </button>`;
    }).join('');

    let feedback = '';
    if (answered) {
      const ok = q.picked === cur.answer;
      const isLast = q.idx + 1 >= nTotal;
      feedback = `
        <div class="mt-3 p-3 rounded-xl ${ok ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300' : 'bg-amber-50 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300'}">
          <p class="font-semibold text-sm mb-1">${ok ? '🎉 ' + this.esc(this.tt('qa_correct')) : '🤔 ' + this.esc(this.tt('qa_incorrect'))}</p>
          <p class="text-xs leading-relaxed" dir="auto">${this.esc(this.lc(cur.explain))}</p>
        </div>
        <button type="button" data-qa-qnext class="mt-3 w-full px-4 py-2.5 rounded-xl text-sm font-bold bg-primary text-white hover:opacity-90 transition-opacity">
          ${isLast ? this.esc(this.tt('qa_finish')) : this.esc(this.tt('qa_continue')) + ' ›'}
        </button>`;
    }

    const prog = nTotal ? Math.round(((q.idx) / nTotal) * 100) : 0;
    return `
      <div class="w-full max-w-xl mx-auto">
        <div class="flex items-center justify-between mb-4">
          <button type="button" data-qa-back class="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-primary transition-colors">‹ ${this.esc(this.tt('qa_back'))}</button>
          <span class="text-xs text-gray-400 dark:text-gray-500">${this.esc(this.tt('qa_score'))}: ${q.score}</span>
        </div>
        <div class="mb-4">
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-sm font-bold text-gray-700 dark:text-gray-200" dir="auto">📝 ${this.esc(this.quizScopeName(q.scope))}</span>
            <span class="text-xs text-gray-400 dark:text-gray-500">${this.esc(this.tt('qa_question'))} ${q.idx + 1} / ${nTotal}</span>
          </div>
          <div class="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
            <div class="h-full rounded-full bg-gradient-to-r from-emerald-400 to-sky-500 transition-all" style="width:${prog}%"></div>
          </div>
        </div>
        <div class="p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <p class="text-sm text-gray-700 dark:text-gray-200 mb-3 font-medium" dir="auto">${this.esc(this.lc(cur.q))}</p>
          ${Array.isArray(cur.words) && cur.words.length ? `
          <div class="p-3 mb-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 text-center">
            <p class="text-2xl leading-loose text-gray-800 dark:text-gray-100" dir="rtl" lang="ar">
              ${cur.words.map(w => `<span class="${w.hl ? 'text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-100 dark:bg-emerald-900/40 rounded px-1' : ''}">${this.esc(w.ar)}</span>`).join(' ')}
            </p>
            ${cur.ref ? `
            <button type="button" data-qa-ref="${this.esc(cur.ref)}"
              class="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
              📖 ${this.esc(cur.ref)} <span class="text-[0.65rem] opacity-70">↗</span>
            </button>` : ''}
          </div>` : ''}
          <div class="space-y-2">${opts}</div>
          ${feedback}
        </div>
      </div>`;
  }
}

let quranicArabicView;
document.addEventListener('DOMContentLoaded', () => { try { quranicArabicView = new QuranicArabicView(); } catch (e) { /* ignore */ } });
