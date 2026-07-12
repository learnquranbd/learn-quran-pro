/**
 * Quranic Vocabulary Data
 *
 * The 50 highest-frequency words of the Quran (function words plus the most
 * common nouns and verbs). Source: high-frequency Quranic wordlists
 * (Quranic Arabic Corpus and similar frequency studies).
 * Occurrence counts are APPROXIMATE, rounded, and often cover the whole root
 * or all inflected forms of the word.
 *
 * Entry shape:
 *   {
 *     arabic:   fully voweled Arabic form,
 *     translit: simple Latin transliteration,
 *     count:    approximate occurrences in the Quran,
 *     meanings: { en, bn, fr, id, ur, tr, ar } — short glosses per UI language
 *               (ar is a simple Arabic synonym / gloss)
 *   }
 */

const VOCAB_WORDS = [
  // ---- Particles, pronouns and other function words ----
  {
    arabic: 'مِنْ', translit: 'min', count: 3200,
    meanings: { en: 'from, of', bn: 'থেকে', fr: 'de, depuis', id: 'dari', ur: 'سے', tr: '-den, -dan', ar: 'لِلابْتِدَاء' }
  },
  {
    arabic: 'مَا', translit: 'mā', count: 2150,
    meanings: { en: 'what; not', bn: 'যা; না', fr: 'ce que ; ne pas', id: 'apa; tidak', ur: 'جو؛ نہیں', tr: 'ne; değil', ar: 'الَّذِي / نَفْي' }
  },
  {
    arabic: 'لَا', translit: 'lā', count: 1800,
    meanings: { en: 'no, not', bn: 'না', fr: 'non, ne pas', id: 'tidak', ur: 'نہیں', tr: 'hayır, değil', ar: 'نَفْي' }
  },
  {
    arabic: 'فِي', translit: 'fī', count: 1700,
    meanings: { en: 'in', bn: 'মধ্যে', fr: 'dans', id: 'di dalam', ur: 'میں', tr: 'içinde', ar: 'دَاخِلَ' }
  },
  {
    arabic: 'إِنَّ', translit: 'inna', count: 1680,
    meanings: { en: 'indeed, surely', bn: 'নিশ্চয়ই', fr: 'certes', id: 'sesungguhnya', ur: 'بےشک', tr: 'şüphesiz', ar: 'لِلتَّوْكِيد' }
  },
  {
    arabic: 'عَلَىٰ', translit: 'ʿalā', count: 1440,
    meanings: { en: 'on, upon', bn: 'উপরে', fr: 'sur', id: 'di atas', ur: 'پر', tr: 'üzerine', ar: 'فَوْقَ' }
  },
  {
    arabic: 'الَّذِينَ', translit: 'alladhīna', count: 1080,
    meanings: { en: 'those who', bn: 'যারা', fr: 'ceux qui', id: 'orang-orang yang', ur: 'جو لوگ', tr: 'onlar ki', ar: 'جَمْعُ الَّذِي' }
  },
  {
    arabic: 'إِلَىٰ', translit: 'ilā', count: 740,
    meanings: { en: 'to, towards', bn: 'দিকে', fr: 'vers', id: 'ke, menuju', ur: 'کی طرف', tr: '-e doğru', ar: 'نَحْوَ' }
  },
  {
    arabic: 'إِنْ', translit: 'in', count: 690,
    meanings: { en: 'if', bn: 'যদি', fr: 'si', id: 'jika', ur: 'اگر', tr: 'eğer', ar: 'لِلشَّرْط' }
  },
  {
    arabic: 'ذَٰلِكَ', translit: 'dhālika', count: 520,
    meanings: { en: 'that', bn: 'সেটি', fr: 'cela', id: 'itu', ur: 'وہ (اشارہ)', tr: 'şu, o', ar: 'إِشَارَةٌ لِلْبَعِيد' }
  },
  {
    arabic: 'هُوَ', translit: 'huwa', count: 480,
    meanings: { en: 'he, it', bn: 'সে, তিনি', fr: 'il, lui', id: 'dia', ur: 'وہ', tr: 'o', ar: 'ضَمِيرُ الْغَائِب' }
  },
  {
    arabic: 'إِذَا', translit: 'idhā', count: 400,
    meanings: { en: 'when', bn: 'যখন', fr: 'lorsque', id: 'apabila', ur: 'جب', tr: '-dığı zaman', ar: 'حِينَ' }
  },
  {
    arabic: 'كُلُّ', translit: 'kull', count: 360,
    meanings: { en: 'every, all', bn: 'প্রত্যেক, সব', fr: 'chaque, tout', id: 'setiap, semua', ur: 'ہر، سب', tr: 'her, bütün', ar: 'جَمِيع' }
  },
  {
    arabic: 'ثُمَّ', translit: 'thumma', count: 340,
    meanings: { en: 'then', bn: 'তারপর', fr: 'ensuite', id: 'kemudian', ur: 'پھر', tr: 'sonra', ar: 'بَعْدَ ذَٰلِك' }
  },
  {
    arabic: 'أَوْ', translit: 'aw', count: 280,
    meanings: { en: 'or', bn: 'অথবা', fr: 'ou', id: 'atau', ur: 'یا', tr: 'veya', ar: 'لِلتَّخْيِير' }
  },

  // ---- Prepositions / adverbs of place and time ----
  {
    arabic: 'بَيْنَ', translit: 'bayna', count: 265,
    meanings: { en: 'between', bn: 'মাঝে', fr: 'entre', id: 'di antara', ur: 'درمیان', tr: 'arasında', ar: 'وَسَطَ' }
  },
  {
    arabic: 'قَبْلَ', translit: 'qabla', count: 240,
    meanings: { en: 'before', bn: 'আগে', fr: 'avant', id: 'sebelum', ur: 'سے پہلے', tr: 'önce', ar: 'ضِدُّ بَعْد' }
  },
  {
    arabic: 'عِنْدَ', translit: 'ʿinda', count: 200,
    meanings: { en: 'with, at', bn: 'কাছে', fr: 'auprès de', id: 'di sisi', ur: 'کے پاس', tr: 'yanında, katında', ar: 'لَدَى' }
  },
  {
    arabic: 'بَعْدَ', translit: 'baʿda', count: 195,
    meanings: { en: 'after', bn: 'পরে', fr: 'après', id: 'sesudah', ur: 'کے بعد', tr: 'sonra', ar: 'عَقِبَ' }
  },
  {
    arabic: 'غَيْرُ', translit: 'ghayr', count: 150,
    meanings: { en: 'other than', bn: 'ছাড়া, ভিন্ন', fr: 'autre que', id: 'selain', ur: 'کے سوا', tr: 'başka, gayrı', ar: 'سِوَى' }
  },

  // ---- Key verbs ----
  {
    arabic: 'قَالَ', translit: 'qāla', count: 1720,
    meanings: { en: 'he said', bn: 'সে বলল', fr: 'il a dit', id: 'dia berkata', ur: 'اس نے کہا', tr: 'dedi', ar: 'تَكَلَّمَ' }
  },
  {
    arabic: 'كَانَ', translit: 'kāna', count: 1360,
    meanings: { en: 'he was', bn: 'সে ছিল', fr: 'il était', id: 'dia adalah', ur: 'وہ تھا', tr: 'idi, oldu', ar: 'وُجِدَ' }
  },
  {
    arabic: 'عَلِمَ', translit: 'ʿalima', count: 850,
    meanings: { en: 'he knew', bn: 'সে জানল', fr: 'il a su', id: 'dia mengetahui', ur: 'اس نے جانا', tr: 'bildi', ar: 'عَرَفَ' }
  },
  {
    arabic: 'آمَنَ', translit: 'āmana', count: 540,
    meanings: { en: 'he believed', bn: 'ঈমান আনল', fr: 'il a cru', id: 'dia beriman', ur: 'ایمان لایا', tr: 'iman etti', ar: 'صَدَّقَ' }
  },
  {
    arabic: 'كَفَرَ', translit: 'kafara', count: 520,
    meanings: { en: 'he disbelieved', bn: 'কুফরি করল', fr: 'il a mécru', id: 'dia kafir', ur: 'کفر کیا', tr: 'inkâr etti', ar: 'جَحَدَ' }
  },
  {
    arabic: 'عَمِلَ', translit: 'ʿamila', count: 360,
    meanings: { en: 'he did, worked', bn: 'সে আমল করল', fr: 'il a œuvré', id: 'dia beramal', ur: 'عمل کیا', tr: 'yaptı', ar: 'فَعَلَ' }
  },
  {
    arabic: 'جَاءَ', translit: 'jāʾa', count: 280,
    meanings: { en: 'he came', bn: 'সে এল', fr: 'il est venu', id: 'dia datang', ur: 'وہ آیا', tr: 'geldi', ar: 'أَتَى' }
  },
  {
    arabic: 'خَلَقَ', translit: 'khalaqa', count: 260,
    meanings: { en: 'he created', bn: 'সৃষ্টি করলেন', fr: 'il a créé', id: 'dia menciptakan', ur: 'پیدا کیا', tr: 'yarattı', ar: 'أَوْجَدَ' }
  },
  {
    arabic: 'أَنْزَلَ', translit: 'anzala', count: 190,
    meanings: { en: 'he sent down', bn: 'নাযিল করলেন', fr: 'il a fait descendre', id: 'dia menurunkan', ur: 'نازل کیا', tr: 'indirdi', ar: 'أَهْبَطَ' }
  },
  {
    arabic: 'سَمِعَ', translit: 'samiʿa', count: 185,
    meanings: { en: 'he heard', bn: 'সে শুনল', fr: 'il a entendu', id: 'dia mendengar', ur: 'اس نے سنا', tr: 'işitti', ar: 'أَدْرَكَ بِالْأُذُن' }
  },

  // ---- Key nouns ----
  {
    arabic: 'اللَّهُ', translit: 'Allāh', count: 2700,
    meanings: { en: 'Allah, God', bn: 'আল্লাহ', fr: 'Allah, Dieu', id: 'Allah', ur: 'اللہ', tr: 'Allah', ar: 'الْإِلَٰهُ الْحَقّ' }
  },
  {
    arabic: 'رَبٌّ', translit: 'rabb', count: 975,
    meanings: { en: 'Lord', bn: 'প্রতিপালক', fr: 'Seigneur', id: 'Tuhan', ur: 'رب', tr: 'Rab', ar: 'الْمَالِكُ الْمُدَبِّر' }
  },
  {
    arabic: 'أَرْضٌ', translit: 'arḍ', count: 460,
    meanings: { en: 'earth, land', bn: 'পৃথিবী, ভূমি', fr: 'terre', id: 'bumi', ur: 'زمین', tr: 'yer, arz', ar: 'ضِدُّ السَّمَاء' }
  },
  {
    arabic: 'يَوْمٌ', translit: 'yawm', count: 400,
    meanings: { en: 'day', bn: 'দিন', fr: 'jour', id: 'hari', ur: 'دن', tr: 'gün', ar: 'نَهَار' }
  },
  {
    arabic: 'قَوْمٌ', translit: 'qawm', count: 380,
    meanings: { en: 'people, nation', bn: 'জাতি, সম্প্রদায়', fr: 'peuple', id: 'kaum', ur: 'قوم', tr: 'kavim, topluluk', ar: 'جَمَاعَةُ النَّاس' }
  },
  {
    arabic: 'آيَةٌ', translit: 'āyah', count: 380,
    meanings: { en: 'sign, verse', bn: 'নিদর্শন, আয়াত', fr: 'signe, verset', id: 'tanda, ayat', ur: 'نشانی، آیت', tr: 'ayet, işaret', ar: 'عَلَامَة' }
  },
  {
    arabic: 'رَسُولٌ', translit: 'rasūl', count: 330,
    meanings: { en: 'messenger', bn: 'রাসূল', fr: 'messager', id: 'rasul, utusan', ur: 'رسول', tr: 'elçi, resul', ar: 'مُرْسَل' }
  },
  {
    arabic: 'عَذَابٌ', translit: 'ʿadhāb', count: 320,
    meanings: { en: 'punishment', bn: 'শাস্তি', fr: 'châtiment', id: 'azab, siksa', ur: 'عذاب', tr: 'azap', ar: 'عُقُوبَة' }
  },
  {
    arabic: 'سَمَاءٌ', translit: 'samāʾ', count: 310,
    meanings: { en: 'sky, heaven', bn: 'আকাশ', fr: 'ciel', id: 'langit', ur: 'آسمان', tr: 'gök', ar: 'مَا عَلَاك' }
  },
  {
    arabic: 'نَفْسٌ', translit: 'nafs', count: 295,
    meanings: { en: 'soul, self', bn: 'আত্মা, নিজ', fr: 'âme', id: 'jiwa, diri', ur: 'نفس، جان', tr: 'nefis, can', ar: 'الذَّات / الرُّوح' }
  },
  {
    arabic: 'حَقٌّ', translit: 'ḥaqq', count: 285,
    meanings: { en: 'truth, right', bn: 'সত্য, অধিকার', fr: 'vérité, droit', id: 'kebenaran, hak', ur: 'حق، سچ', tr: 'hak, gerçek', ar: 'ضِدُّ الْبَاطِل' }
  },
  {
    arabic: 'شَيْءٌ', translit: 'shayʾ', count: 280,
    meanings: { en: 'thing', bn: 'বস্তু, জিনিস', fr: 'chose', id: 'sesuatu', ur: 'چیز', tr: 'şey', ar: 'مَوْجُود' }
  },
  {
    arabic: 'عَبْدٌ', translit: 'ʿabd', count: 275,
    meanings: { en: 'servant, slave', bn: 'বান্দা', fr: 'serviteur', id: 'hamba', ur: 'بندہ', tr: 'kul', ar: 'خَادِم / مَمْلُوك' }
  },
  {
    arabic: 'كِتَابٌ', translit: 'kitāb', count: 260,
    meanings: { en: 'book, scripture', bn: 'কিতাব', fr: 'livre', id: 'kitab', ur: 'کتاب', tr: 'kitap', ar: 'مَكْتُوب' }
  },
  {
    arabic: 'خَيْرٌ', translit: 'khayr', count: 185,
    meanings: { en: 'good, better', bn: 'কল্যাণ, ভালো', fr: 'bien, meilleur', id: 'kebaikan', ur: 'بھلائی', tr: 'hayır, iyilik', ar: 'ضِدُّ الشَّرّ' }
  },
  {
    arabic: 'جَنَّةٌ', translit: 'jannah', count: 145,
    meanings: { en: 'garden, Paradise', bn: 'জান্নাত, বাগান', fr: 'paradis, jardin', id: 'surga', ur: 'جنت', tr: 'cennet', ar: 'بُسْتَانُ النَّعِيم' }
  },
  {
    arabic: 'نَارٌ', translit: 'nār', count: 145,
    meanings: { en: 'fire, Hellfire', bn: 'আগুন, জাহান্নাম', fr: 'feu, Enfer', id: 'api, neraka', ur: 'آگ، دوزخ', tr: 'ateş', ar: 'لَهَبٌ مُحْرِق' }
  },
  {
    arabic: 'قَلْبٌ', translit: 'qalb', count: 130,
    meanings: { en: 'heart', bn: 'হৃদয়, অন্তর', fr: 'cœur', id: 'hati', ur: 'دل', tr: 'kalp', ar: 'فُؤَاد' }
  },
  {
    arabic: 'رَحْمَةٌ', translit: 'raḥmah', count: 115,
    meanings: { en: 'mercy', bn: 'রহমত, দয়া', fr: 'miséricorde', id: 'rahmat', ur: 'رحمت', tr: 'rahmet', ar: 'رَأْفَة' }
  },
  {
    arabic: 'صَلَاةٌ', translit: 'ṣalāh', count: 99,
    meanings: { en: 'prayer', bn: 'নামায, সালাত', fr: 'prière', id: 'salat', ur: 'نماز', tr: 'namaz', ar: 'دُعَاء / عِبَادَة' }
  }
];

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { VOCAB_WORDS };
}
