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
    meanings: { en: 'from, of', bn: 'থেকে', fr: 'de, depuis', id: 'dari', ur: 'سے', tr: '-den, -dan', ar: 'لِلابْتِدَاء' , zh: '从，来自', ja: 'から、より'}
  },
  {
    arabic: 'مَا', translit: 'mā', count: 2150,
    meanings: { en: 'what; not', bn: 'যা; না', fr: 'ce que ; ne pas', id: 'apa; tidak', ur: 'جو؛ نہیں', tr: 'ne; değil', ar: 'الَّذِي / نَفْي' , zh: '什么；不', ja: '何；ない'}
  },
  {
    arabic: 'لَا', translit: 'lā', count: 1800,
    meanings: { en: 'no, not', bn: 'না', fr: 'non, ne pas', id: 'tidak', ur: 'نہیں', tr: 'hayır, değil', ar: 'نَفْي' , zh: '不，非', ja: 'いいえ、ない'}
  },
  {
    arabic: 'فِي', translit: 'fī', count: 1700,
    meanings: { en: 'in', bn: 'মধ্যে', fr: 'dans', id: 'di dalam', ur: 'میں', tr: 'içinde', ar: 'دَاخِلَ' , zh: '在…里', ja: '〜の中に'}
  },
  {
    arabic: 'إِنَّ', translit: 'inna', count: 1680,
    meanings: { en: 'indeed, surely', bn: 'নিশ্চয়ই', fr: 'certes', id: 'sesungguhnya', ur: 'بےشک', tr: 'şüphesiz', ar: 'لِلتَّوْكِيد' , zh: '确实，的确', ja: '本当に、確かに'}
  },
  {
    arabic: 'عَلَىٰ', translit: 'ʿalā', count: 1440,
    meanings: { en: 'on, upon', bn: 'উপরে', fr: 'sur', id: 'di atas', ur: 'پر', tr: 'üzerine', ar: 'فَوْقَ' , zh: '在…上', ja: '〜の上に'}
  },
  {
    arabic: 'الَّذِينَ', translit: 'alladhīna', count: 1080,
    meanings: { en: 'those who', bn: 'যারা', fr: 'ceux qui', id: 'orang-orang yang', ur: 'جو لوگ', tr: 'onlar ki', ar: 'جَمْعُ الَّذِي' , zh: '那些人', ja: '〜する者たち'}
  },
  {
    arabic: 'إِلَىٰ', translit: 'ilā', count: 740,
    meanings: { en: 'to, towards', bn: 'দিকে', fr: 'vers', id: 'ke, menuju', ur: 'کی طرف', tr: '-e doğru', ar: 'نَحْوَ' , zh: '到，向', ja: '〜へ、〜の方へ'}
  },
  {
    arabic: 'إِنْ', translit: 'in', count: 690,
    meanings: { en: 'if', bn: 'যদি', fr: 'si', id: 'jika', ur: 'اگر', tr: 'eğer', ar: 'لِلشَّرْط' , zh: '如果', ja: 'もし'}
  },
  {
    arabic: 'ذَٰلِكَ', translit: 'dhālika', count: 520,
    meanings: { en: 'that', bn: 'সেটি', fr: 'cela', id: 'itu', ur: 'وہ (اشارہ)', tr: 'şu, o', ar: 'إِشَارَةٌ لِلْبَعِيد' , zh: '那个', ja: 'それ、その'}
  },
  {
    arabic: 'هُوَ', translit: 'huwa', count: 480,
    meanings: { en: 'he, it', bn: 'সে, তিনি', fr: 'il, lui', id: 'dia', ur: 'وہ', tr: 'o', ar: 'ضَمِيرُ الْغَائِب' , zh: '他，它', ja: '彼、それ'}
  },
  {
    arabic: 'إِذَا', translit: 'idhā', count: 400,
    meanings: { en: 'when', bn: 'যখন', fr: 'lorsque', id: 'apabila', ur: 'جب', tr: '-dığı zaman', ar: 'حِينَ' , zh: '当…时', ja: '〜の時'}
  },
  {
    arabic: 'كُلُّ', translit: 'kull', count: 360,
    meanings: { en: 'every, all', bn: 'প্রত্যেক, সব', fr: 'chaque, tout', id: 'setiap, semua', ur: 'ہر، سب', tr: 'her, bütün', ar: 'جَمِيع' , zh: '每个，所有', ja: '全ての'}
  },
  {
    arabic: 'ثُمَّ', translit: 'thumma', count: 340,
    meanings: { en: 'then', bn: 'তারপর', fr: 'ensuite', id: 'kemudian', ur: 'پھر', tr: 'sonra', ar: 'بَعْدَ ذَٰلِك' , zh: '然后', ja: 'それから'}
  },
  {
    arabic: 'أَوْ', translit: 'aw', count: 280,
    meanings: { en: 'or', bn: 'অথবা', fr: 'ou', id: 'atau', ur: 'یا', tr: 'veya', ar: 'لِلتَّخْيِير' , zh: '或者', ja: 'または'}
  },

  // ---- Prepositions / adverbs of place and time ----
  {
    arabic: 'بَيْنَ', translit: 'bayna', count: 265,
    meanings: { en: 'between', bn: 'মাঝে', fr: 'entre', id: 'di antara', ur: 'درمیان', tr: 'arasında', ar: 'وَسَطَ' , zh: '之间', ja: '間'}
  },
  {
    arabic: 'قَبْلَ', translit: 'qabla', count: 240,
    meanings: { en: 'before', bn: 'আগে', fr: 'avant', id: 'sebelum', ur: 'سے پہلے', tr: 'önce', ar: 'ضِدُّ بَعْد' , zh: '之前', ja: '前'}
  },
  {
    arabic: 'عِنْدَ', translit: 'ʿinda', count: 200,
    meanings: { en: 'with, at', bn: 'কাছে', fr: 'auprès de', id: 'di sisi', ur: 'کے پاس', tr: 'yanında, katında', ar: 'لَدَى' , zh: '在…跟前', ja: '〜のそばに'}
  },
  {
    arabic: 'بَعْدَ', translit: 'baʿda', count: 195,
    meanings: { en: 'after', bn: 'পরে', fr: 'après', id: 'sesudah', ur: 'کے بعد', tr: 'sonra', ar: 'عَقِبَ' , zh: '之后', ja: '後'}
  },
  {
    arabic: 'غَيْرُ', translit: 'ghayr', count: 150,
    meanings: { en: 'other than', bn: 'ছাড়া, ভিন্ন', fr: 'autre que', id: 'selain', ur: 'کے سوا', tr: 'başka, gayrı', ar: 'سِوَى' , zh: '除…之外', ja: '以外'}
  },

  // ---- Key verbs ----
  {
    arabic: 'قَالَ', translit: 'qāla', count: 1720,
    meanings: { en: 'he said', bn: 'সে বলল', fr: 'il a dit', id: 'dia berkata', ur: 'اس نے کہا', tr: 'dedi', ar: 'تَكَلَّمَ' , zh: '他说', ja: '彼は言った'}
  },
  {
    arabic: 'كَانَ', translit: 'kāna', count: 1360,
    meanings: { en: 'he was', bn: 'সে ছিল', fr: 'il était', id: 'dia adalah', ur: 'وہ تھا', tr: 'idi, oldu', ar: 'وُجِدَ' , zh: '他是', ja: '彼はいた'}
  },
  {
    arabic: 'عَلِمَ', translit: 'ʿalima', count: 850,
    meanings: { en: 'he knew', bn: 'সে জানল', fr: 'il a su', id: 'dia mengetahui', ur: 'اس نے جانا', tr: 'bildi', ar: 'عَرَفَ' , zh: '他知道', ja: '彼は知った'}
  },
  {
    arabic: 'آمَنَ', translit: 'āmana', count: 540,
    meanings: { en: 'he believed', bn: 'ঈমান আনল', fr: 'il a cru', id: 'dia beriman', ur: 'ایمان لایا', tr: 'iman etti', ar: 'صَدَّقَ' , zh: '他归信', ja: '彼は信じた'}
  },
  {
    arabic: 'كَفَرَ', translit: 'kafara', count: 520,
    meanings: { en: 'he disbelieved', bn: 'কুফরি করল', fr: 'il a mécru', id: 'dia kafir', ur: 'کفر کیا', tr: 'inkâr etti', ar: 'جَحَدَ' , zh: '他不信', ja: '彼は不信仰になった'}
  },
  {
    arabic: 'عَمِلَ', translit: 'ʿamila', count: 360,
    meanings: { en: 'he did, worked', bn: 'সে আমল করল', fr: 'il a œuvré', id: 'dia beramal', ur: 'عمل کیا', tr: 'yaptı', ar: 'فَعَلَ' , zh: '他做（善功）', ja: '彼は行った'}
  },
  {
    arabic: 'جَاءَ', translit: 'jāʾa', count: 280,
    meanings: { en: 'he came', bn: 'সে এল', fr: 'il est venu', id: 'dia datang', ur: 'وہ آیا', tr: 'geldi', ar: 'أَتَى' , zh: '他来了', ja: '彼は来た'}
  },
  {
    arabic: 'خَلَقَ', translit: 'khalaqa', count: 260,
    meanings: { en: 'he created', bn: 'সৃষ্টি করলেন', fr: 'il a créé', id: 'dia menciptakan', ur: 'پیدا کیا', tr: 'yarattı', ar: 'أَوْجَدَ' , zh: '他创造', ja: '彼は創造した'}
  },
  {
    arabic: 'أَنْزَلَ', translit: 'anzala', count: 190,
    meanings: { en: 'he sent down', bn: 'নাযিল করলেন', fr: 'il a fait descendre', id: 'dia menurunkan', ur: 'نازل کیا', tr: 'indirdi', ar: 'أَهْبَطَ' , zh: '他降示', ja: '彼は下した'}
  },
  {
    arabic: 'سَمِعَ', translit: 'samiʿa', count: 185,
    meanings: { en: 'he heard', bn: 'সে শুনল', fr: 'il a entendu', id: 'dia mendengar', ur: 'اس نے سنا', tr: 'işitti', ar: 'أَدْرَكَ بِالْأُذُن' , zh: '他听见', ja: '彼は聞いた'}
  },

  // ---- Key nouns ----
  {
    arabic: 'اللَّهُ', translit: 'Allāh', count: 2700,
    meanings: { en: 'Allah, God', bn: 'আল্লাহ', fr: 'Allah, Dieu', id: 'Allah', ur: 'اللہ', tr: 'Allah', ar: 'الْإِلَٰهُ الْحَقّ' , zh: '安拉，真主', ja: 'アッラー'}
  },
  {
    arabic: 'رَبٌّ', translit: 'rabb', count: 975,
    meanings: { en: 'Lord', bn: 'প্রতিপালক', fr: 'Seigneur', id: 'Tuhan', ur: 'رب', tr: 'Rab', ar: 'الْمَالِكُ الْمُدَبِّر' , zh: '主，养育者', ja: '主、養育者'}
  },
  {
    arabic: 'أَرْضٌ', translit: 'arḍ', count: 460,
    meanings: { en: 'earth, land', bn: 'পৃথিবী, ভূমি', fr: 'terre', id: 'bumi', ur: 'زمین', tr: 'yer, arz', ar: 'ضِدُّ السَّمَاء' , zh: '大地', ja: '大地'}
  },
  {
    arabic: 'يَوْمٌ', translit: 'yawm', count: 400,
    meanings: { en: 'day', bn: 'দিন', fr: 'jour', id: 'hari', ur: 'دن', tr: 'gün', ar: 'نَهَار' , zh: '日子，天', ja: '日、日曜'}
  },
  {
    arabic: 'قَوْمٌ', translit: 'qawm', count: 380,
    meanings: { en: 'people, nation', bn: 'জাতি, সম্প্রদায়', fr: 'peuple', id: 'kaum', ur: 'قوم', tr: 'kavim, topluluk', ar: 'جَمَاعَةُ النَّاس' , zh: '民族，宗族', ja: '民、民族'}
  },
  {
    arabic: 'آيَةٌ', translit: 'āyah', count: 380,
    meanings: { en: 'sign, verse', bn: 'নিদর্শন, আয়াত', fr: 'signe, verset', id: 'tanda, ayat', ur: 'نشانی، آیت', tr: 'ayet, işaret', ar: 'عَلَامَة' , zh: '迹象，节文', ja: '印、節'}
  },
  {
    arabic: 'رَسُولٌ', translit: 'rasūl', count: 330,
    meanings: { en: 'messenger', bn: 'রাসূল', fr: 'messager', id: 'rasul, utusan', ur: 'رسول', tr: 'elçi, resul', ar: 'مُرْسَل' , zh: '使者', ja: '使徒、使者'}
  },
  {
    arabic: 'عَذَابٌ', translit: 'ʿadhāb', count: 320,
    meanings: { en: 'punishment', bn: 'শাস্তি', fr: 'châtiment', id: 'azab, siksa', ur: 'عذاب', tr: 'azap', ar: 'عُقُوبَة' , zh: '惩罚', ja: '懲罰'}
  },
  {
    arabic: 'سَمَاءٌ', translit: 'samāʾ', count: 310,
    meanings: { en: 'sky, heaven', bn: 'আকাশ', fr: 'ciel', id: 'langit', ur: 'آسمان', tr: 'gök', ar: 'مَا عَلَاك' , zh: '天空，天', ja: '天'}
  },
  {
    arabic: 'نَفْسٌ', translit: 'nafs', count: 295,
    meanings: { en: 'soul, self', bn: 'আত্মা, নিজ', fr: 'âme', id: 'jiwa, diri', ur: 'نفس، جان', tr: 'nefis, can', ar: 'الذَّات / الرُّوح' , zh: '灵魂，自我', ja: '魂、自己'}
  },
  {
    arabic: 'حَقٌّ', translit: 'ḥaqq', count: 285,
    meanings: { en: 'truth, right', bn: 'সত্য, অধিকার', fr: 'vérité, droit', id: 'kebenaran, hak', ur: 'حق، سچ', tr: 'hak, gerçek', ar: 'ضِدُّ الْبَاطِل' , zh: '真理，权利', ja: '真理、権利'}
  },
  {
    arabic: 'شَيْءٌ', translit: 'shayʾ', count: 280,
    meanings: { en: 'thing', bn: 'বস্তু, জিনিস', fr: 'chose', id: 'sesuatu', ur: 'چیز', tr: 'şey', ar: 'مَوْجُود' , zh: '事物', ja: '物事'}
  },
  {
    arabic: 'عَبْدٌ', translit: 'ʿabd', count: 275,
    meanings: { en: 'servant, slave', bn: 'বান্দা', fr: 'serviteur', id: 'hamba', ur: 'بندہ', tr: 'kul', ar: 'خَادِم / مَمْلُوك' , zh: '仆人，奴仆', ja: '僕、奴隷'}
  },
  {
    arabic: 'كِتَابٌ', translit: 'kitāb', count: 260,
    meanings: { en: 'book, scripture', bn: 'কিতাব', fr: 'livre', id: 'kitab', ur: 'کتاب', tr: 'kitap', ar: 'مَكْتُوب' , zh: '经典，天经', ja: '書物、啓典'}
  },
  {
    arabic: 'خَيْرٌ', translit: 'khayr', count: 185,
    meanings: { en: 'good, better', bn: 'কল্যাণ, ভালো', fr: 'bien, meilleur', id: 'kebaikan', ur: 'بھلائی', tr: 'hayır, iyilik', ar: 'ضِدُّ الشَّرّ' , zh: '好，善', ja: '善、良い'}
  },
  {
    arabic: 'جَنَّةٌ', translit: 'jannah', count: 145,
    meanings: { en: 'garden, Paradise', bn: 'জান্নাত, বাগান', fr: 'paradis, jardin', id: 'surga', ur: 'جنت', tr: 'cennet', ar: 'بُسْتَانُ النَّعِيم' , zh: '天园，乐园', ja: '楽園、天園'}
  },
  {
    arabic: 'نَارٌ', translit: 'nār', count: 145,
    meanings: { en: 'fire, Hellfire', bn: 'আগুন, জাহান্নাম', fr: 'feu, Enfer', id: 'api, neraka', ur: 'آگ، دوزخ', tr: 'ateş', ar: 'لَهَبٌ مُحْرِق' , zh: '火狱', ja: '火獄'}
  },
  {
    arabic: 'قَلْبٌ', translit: 'qalb', count: 130,
    meanings: { en: 'heart', bn: 'হৃদয়, অন্তর', fr: 'cœur', id: 'hati', ur: 'دل', tr: 'kalp', ar: 'فُؤَاد' , zh: '心', ja: '心'}
  },
  {
    arabic: 'رَحْمَةٌ', translit: 'raḥmah', count: 115,
    meanings: { en: 'mercy', bn: 'রহমত, দয়া', fr: 'miséricorde', id: 'rahmat', ur: 'رحمت', tr: 'rahmet', ar: 'رَأْفَة' , zh: '慈悯', ja: '慈悲、慈愛'}
  },
  {
    arabic: 'صَلَاةٌ', translit: 'ṣalāh', count: 99,
    meanings: { en: 'prayer', bn: 'নামায, সালাত', fr: 'prière', id: 'salat', ur: 'نماز', tr: 'namaz', ar: 'دُعَاء / عِبَادَة' , zh: '拜功，礼拜', ja: '礼拝、サラート'}
  }
];

/**
 * Thematic vocabulary sets — real Quranic words grouped by everyday themes.
 * Same entry shape as VOCAB_WORDS plus `ref`: a well-known verse ("surah:ayah")
 * where the word (in some inflected form) occurs, used for the verse-preview chip.
 * Counts are APPROXIMATE: root-level totals from data/roots.json where the root
 * is unambiguous, otherwise word-form counts from data/word-index.json.
 * Theme names are bilingual inline (en/bn) per the data-file convention;
 * other UI languages fall back to English.
 */
const VOCAB_THEMES = [
  {
    id: 'body', icon: '🖐️',
    names: { en: 'Body parts', bn: 'শরীরের অঙ্গ' },
    words: [
      {
        arabic: 'وَجْهٌ', translit: 'wajh', count: 72, ref: '55:27',
        meanings: { en: 'face', bn: 'মুখমণ্ডল, চেহারা', fr: 'visage', id: 'wajah', ur: 'چہرہ', tr: 'yüz', ar: 'مُحَيَّا' , zh: '脸，面容', ja: '顔、面'}
      },
      {
        arabic: 'يَدٌ', translit: 'yad', count: 120, ref: '48:10',
        meanings: { en: 'hand', bn: 'হাত', fr: 'main', id: 'tangan', ur: 'ہاتھ', tr: 'el', ar: 'كَفّ' , zh: '手', ja: '手'}
      },
      {
        arabic: 'عَيْنٌ', translit: 'ʿayn', count: 65, ref: '88:12',
        meanings: { en: 'eye; spring', bn: 'চোখ; ঝর্ণা', fr: 'œil ; source', id: 'mata; mata air', ur: 'آنکھ؛ چشمہ', tr: 'göz; pınar', ar: 'بَاصِرَة / يَنْبُوع' , zh: '眼；泉源', ja: '目；泉'}
      },
      {
        arabic: 'لِسَانٌ', translit: 'lisān', count: 25, ref: '28:34',
        meanings: { en: 'tongue, language', bn: 'জিহ্বা, ভাষা', fr: 'langue', id: 'lidah, bahasa', ur: 'زبان', tr: 'dil', ar: 'لُغَة' , zh: '舌头，语言', ja: '舌、言葉'}
      },
      {
        arabic: 'صَدْرٌ', translit: 'ṣadr', count: 46, ref: '94:1',
        meanings: { en: 'chest, breast', bn: 'বক্ষ, বুক', fr: 'poitrine', id: 'dada', ur: 'سینہ', tr: 'göğüs', ar: 'مَوْضِعُ الْقَلْب' , zh: '胸，心扉', ja: '胸'}
      },
      {
        arabic: 'بَطْنٌ', translit: 'baṭn', count: 25, ref: '3:35',
        meanings: { en: 'belly, womb', bn: 'পেট, উদর', fr: 'ventre', id: 'perut', ur: 'پیٹ', tr: 'karın', ar: 'جَوْف' , zh: '腹，子宫', ja: '腹'}
      },
      {
        arabic: 'رَأْسٌ', translit: 'raʾs', count: 18, ref: '19:4',
        meanings: { en: 'head', bn: 'মাথা', fr: 'tête', id: 'kepala', ur: 'سر', tr: 'baş', ar: 'أَعْلَى الْجَسَد' , zh: '头', ja: '頭'}
      },
      {
        arabic: 'أُذُنٌ', translit: 'udhun', count: 18, ref: '5:45',
        meanings: { en: 'ear', bn: 'কান', fr: 'oreille', id: 'telinga', ur: 'کان', tr: 'kulak', ar: 'عُضْوُ السَّمْع' , zh: '耳朵', ja: '耳'}
      }
    ]
  },
  {
    id: 'family', icon: '👨‍👩‍👧‍👦',
    names: { en: 'Family', bn: 'পরিবার' },
    words: [
      {
        arabic: 'أَبٌ', translit: 'ab', count: 117, ref: '12:4',
        meanings: { en: 'father', bn: 'বাবা, পিতা', fr: 'père', id: 'ayah, bapak', ur: 'باپ', tr: 'baba', ar: 'وَالِد' , zh: '父亲', ja: '父'}
      },
      {
        arabic: 'أُمٌّ', translit: 'umm', count: 35, ref: '28:7',
        meanings: { en: 'mother', bn: 'মা', fr: 'mère', id: 'ibu', ur: 'ماں', tr: 'anne', ar: 'وَالِدَة' , zh: '母亲', ja: '母'}
      },
      {
        arabic: 'اِبْنٌ', translit: 'ibn', count: 30, ref: '2:87',
        meanings: { en: 'son', bn: 'ছেলে, পুত্র', fr: 'fils', id: 'anak laki-laki', ur: 'بیٹا', tr: 'oğul', ar: 'وَلَدٌ ذَكَر' , zh: '儿子', ja: '息子'}
      },
      {
        arabic: 'أَخٌ', translit: 'akh', count: 85, ref: '4:12',
        meanings: { en: 'brother', bn: 'ভাই', fr: 'frère', id: 'saudara laki-laki', ur: 'بھائی', tr: 'erkek kardeş', ar: 'شَقِيق' , zh: '兄弟', ja: '兄弟'}
      },
      {
        arabic: 'أُخْتٌ', translit: 'ukht', count: 8, ref: '19:28',
        meanings: { en: 'sister', bn: 'বোন', fr: 'sœur', id: 'saudara perempuan', ur: 'بہن', tr: 'kız kardeş', ar: 'شَقِيقَة' , zh: '姐妹', ja: '姉妹'}
      },
      {
        arabic: 'زَوْجٌ', translit: 'zawj', count: 81, ref: '2:35',
        meanings: { en: 'spouse; pair', bn: 'স্বামী/স্ত্রী; জোড়া', fr: 'époux ; paire', id: 'pasangan', ur: 'جوڑا، شریکِ حیات', tr: 'eş; çift', ar: 'قَرِين' , zh: '配偶；对', ja: '配偶者；対'}
      },
      {
        arabic: 'وَلَدٌ', translit: 'walad', count: 102, ref: '2:116',
        meanings: { en: 'child, son', bn: 'সন্তান', fr: 'enfant', id: 'anak', ur: 'اولاد، بچہ', tr: 'çocuk', ar: 'طِفْل' , zh: '孩子，儿女', ja: '子供'}
      },
      {
        arabic: 'أَهْلٌ', translit: 'ahl', count: 127, ref: '2:105',
        meanings: { en: 'family, people', bn: 'পরিবার, অধিবাসী', fr: 'famille, gens', id: 'keluarga', ur: 'گھر والے، اہل', tr: 'aile, halk', ar: 'عَشِيرَة' , zh: '家属，族人', ja: '家族、一族'}
      }
    ]
  },
  {
    id: 'nature', icon: '🌄',
    names: { en: 'Nature', bn: 'প্রকৃতি' },
    words: [
      {
        arabic: 'شَمْسٌ', translit: 'shams', count: 33, ref: '91:1',
        meanings: { en: 'sun', bn: 'সূর্য', fr: 'soleil', id: 'matahari', ur: 'سورج', tr: 'güneş', ar: 'نَجْمُ النَّهَار' , zh: '太阳', ja: '太陽'}
      },
      {
        arabic: 'قَمَرٌ', translit: 'qamar', count: 27, ref: '54:1',
        meanings: { en: 'moon', bn: 'চাঁদ', fr: 'lune', id: 'bulan', ur: 'چاند', tr: 'ay', ar: 'بَدْر' , zh: '月亮', ja: '月'}
      },
      {
        arabic: 'نَجْمٌ', translit: 'najm', count: 13, ref: '53:1',
        meanings: { en: 'star', bn: 'তারা, নক্ষত্র', fr: 'étoile', id: 'bintang', ur: 'ستارہ', tr: 'yıldız', ar: 'كَوْكَب' , zh: '星星', ja: '星'}
      },
      {
        arabic: 'جَبَلٌ', translit: 'jabal', count: 41, ref: '7:143',
        meanings: { en: 'mountain', bn: 'পাহাড়', fr: 'montagne', id: 'gunung', ur: 'پہاڑ', tr: 'dağ', ar: 'طَوْد' , zh: '山', ja: '山'}
      },
      {
        arabic: 'بَحْرٌ', translit: 'baḥr', count: 42, ref: '18:109',
        meanings: { en: 'sea', bn: 'সমুদ্র', fr: 'mer', id: 'laut', ur: 'سمندر', tr: 'deniz', ar: 'يَمّ' , zh: '海', ja: '海'}
      },
      {
        arabic: 'نَهَرٌ', translit: 'nahar', count: 54, ref: '54:54',
        meanings: { en: 'river', bn: 'নদী', fr: 'rivière, fleuve', id: 'sungai', ur: 'نہر، دریا', tr: 'nehir', ar: 'مَجْرَى مَاء' , zh: '河流', ja: '川'}
      },
      {
        arabic: 'شَجَرَةٌ', translit: 'shajarah', count: 27, ref: '2:35',
        meanings: { en: 'tree', bn: 'গাছ', fr: 'arbre', id: 'pohon', ur: 'درخت', tr: 'ağaç', ar: 'ذَاتُ أَغْصَان' , zh: '树', ja: '木'}
      },
      {
        arabic: 'مَاءٌ', translit: 'māʾ', count: 63, ref: '21:30',
        meanings: { en: 'water', bn: 'পানি', fr: 'eau', id: 'air', ur: 'پانی', tr: 'su', ar: 'سَائِلُ الْحَيَاة' , zh: '水', ja: '水'}
      }
    ]
  },
  {
    id: 'animals', icon: '🐪',
    names: { en: 'Animals', bn: 'প্রাণী' },
    words: [
      {
        arabic: 'بَقَرَةٌ', translit: 'baqarah', count: 9, ref: '2:67',
        meanings: { en: 'cow', bn: 'গাভী, গরু', fr: 'vache', id: 'sapi betina', ur: 'گائے', tr: 'inek', ar: 'مِنَ الْأَنْعَام' , zh: '牛', ja: '雌牛'}
      },
      {
        arabic: 'كَلْبٌ', translit: 'kalb', count: 6, ref: '18:18',
        meanings: { en: 'dog', bn: 'কুকুর', fr: 'chien', id: 'anjing', ur: 'کتا', tr: 'köpek', ar: 'حَيَوَانٌ أَلِيف' , zh: '狗', ja: '犬'}
      },
      {
        arabic: 'حُوتٌ', translit: 'ḥūt', count: 5, ref: '37:142',
        meanings: { en: 'fish, whale', bn: 'মাছ, তিমি', fr: 'poisson, baleine', id: 'ikan (besar)', ur: 'مچھلی', tr: 'balık, balina', ar: 'سَمَكَةٌ عَظِيمَة' , zh: '鱼，鲸', ja: '魚、鯨'}
      },
      {
        arabic: 'ذِئْبٌ', translit: 'dhiʾb', count: 3, ref: '12:13',
        meanings: { en: 'wolf', bn: 'নেকড়ে', fr: 'loup', id: 'serigala', ur: 'بھیڑیا', tr: 'kurt', ar: 'حَيَوَانٌ مُفْتَرِس' , zh: '狼', ja: '狼'}
      },
      {
        arabic: 'نَمْلَةٌ', translit: 'namlah', count: 4, ref: '27:18',
        meanings: { en: 'ant', bn: 'পিঁপড়া', fr: 'fourmi', id: 'semut', ur: 'چیونٹی', tr: 'karınca', ar: 'حَشَرَةٌ صَغِيرَة' , zh: '蚂蚁', ja: '蟻'}
      },
      {
        arabic: 'نَحْلٌ', translit: 'naḥl', count: 1, ref: '16:68',
        meanings: { en: 'bee', bn: 'মৌমাছি', fr: 'abeille', id: 'lebah', ur: 'شہد کی مکھی', tr: 'arı', ar: 'صَانِعُ الْعَسَل' , zh: '蜜蜂', ja: '蜜蜂'}
      },
      {
        arabic: 'عَنكَبُوتٌ', translit: 'ʿankabūt', count: 2, ref: '29:41',
        meanings: { en: 'spider', bn: 'মাকড়সা', fr: 'araignée', id: 'laba-laba', ur: 'مکڑی', tr: 'örümcek', ar: 'نَاسِجُ الْبَيْت' , zh: '蜘蛛', ja: '蜘蛛'}
      },
      {
        arabic: 'طَيْرٌ', translit: 'ṭayr', count: 29, ref: '67:19',
        meanings: { en: 'bird(s)', bn: 'পাখি', fr: 'oiseau(x)', id: 'burung', ur: 'پرندہ', tr: 'kuş', ar: 'ذُو جَنَاحَيْن' , zh: '鸟', ja: '鳥'}
      }
    ]
  },
  {
    id: 'numbers', icon: '🔢',
    names: { en: 'Numbers', bn: 'সংখ্যা' },
    words: [
      {
        arabic: 'وَاحِدٌ', translit: 'wāḥid', count: 61, ref: '2:163',
        meanings: { en: 'one', bn: 'এক', fr: 'un', id: 'satu', ur: 'ایک', tr: 'bir', ar: 'الْعَدَد ١' , zh: '一', ja: '一'}
      },
      {
        arabic: 'اِثْنَانِ', translit: 'ithnān', count: 25, ref: '5:106',
        meanings: { en: 'two', bn: 'দুই', fr: 'deux', id: 'dua', ur: 'دو', tr: 'iki', ar: 'الْعَدَد ٢' , zh: '二', ja: '二'}
      },
      {
        arabic: 'ثَلَاثَةٌ', translit: 'thalāthah', count: 30, ref: '18:22',
        meanings: { en: 'three', bn: 'তিন', fr: 'trois', id: 'tiga', ur: 'تین', tr: 'üç', ar: 'الْعَدَد ٣' , zh: '三', ja: '三'}
      },
      {
        arabic: 'أَرْبَعَةٌ', translit: 'arbaʿah', count: 22, ref: '9:36',
        meanings: { en: 'four', bn: 'চার', fr: 'quatre', id: 'empat', ur: 'چار', tr: 'dört', ar: 'الْعَدَد ٤' , zh: '四', ja: '四'}
      },
      {
        arabic: 'سِتَّةٌ', translit: 'sittah', count: 8, ref: '7:54',
        meanings: { en: 'six', bn: 'ছয়', fr: 'six', id: 'enam', ur: 'چھ', tr: 'altı', ar: 'الْعَدَد ٦' , zh: '六', ja: '六'}
      },
      {
        arabic: 'سَبْعَةٌ', translit: 'sabʿah', count: 28, ref: '15:44',
        meanings: { en: 'seven', bn: 'সাত', fr: 'sept', id: 'tujuh', ur: 'سات', tr: 'yedi', ar: 'الْعَدَد ٧' , zh: '七', ja: '七'}
      },
      {
        arabic: 'مِائَةٌ', translit: 'miʾah', count: 10, ref: '2:261',
        meanings: { en: 'hundred', bn: 'একশো', fr: 'cent', id: 'seratus', ur: 'سو', tr: 'yüz', ar: 'الْعَدَد ١٠٠' , zh: '百', ja: '百'}
      },
      {
        arabic: 'أَلْفٌ', translit: 'alf', count: 19, ref: '97:3',
        meanings: { en: 'thousand', bn: 'হাজার', fr: 'mille', id: 'seribu', ur: 'ہزار', tr: 'bin', ar: 'الْعَدَد ١٠٠٠' , zh: '千', ja: '千'}
      }
    ]
  },
  {
    id: 'time', icon: '🕰️',
    names: { en: 'Time', bn: 'সময়' },
    words: [
      {
        arabic: 'لَيْلٌ', translit: 'layl', count: 92, ref: '92:1',
        meanings: { en: 'night', bn: 'রাত', fr: 'nuit', id: 'malam', ur: 'رات', tr: 'gece', ar: 'ضِدُّ النَّهَار' , zh: '夜', ja: '夜'}
      },
      {
        arabic: 'نَهَارٌ', translit: 'nahār', count: 57, ref: '92:2',
        meanings: { en: 'daytime', bn: 'দিন, দিবস', fr: 'journée', id: 'siang', ur: 'دن', tr: 'gündüz', ar: 'ضِدُّ اللَّيْل' , zh: '昼', ja: '昼間'}
      },
      {
        arabic: 'سَاعَةٌ', translit: 'sāʿah', count: 48, ref: '7:34',
        meanings: { en: 'hour; the Hour', bn: 'মুহূর্ত; কিয়ামত', fr: 'heure ; l’Heure', id: 'saat; kiamat', ur: 'گھڑی؛ قیامت', tr: 'saat; kıyamet', ar: 'الْقِيَامَة' , zh: '时刻，复活时', ja: '時、時節'}
      },
      {
        arabic: 'شَهْرٌ', translit: 'shahr', count: 21, ref: '97:3',
        meanings: { en: 'month', bn: 'মাস', fr: 'mois', id: 'bulan (waktu)', ur: 'مہینہ', tr: 'ay (süre)', ar: 'جُزْءُ السَّنَة' , zh: '月', ja: '月（暦）'}
      },
      {
        arabic: 'سَنَةٌ', translit: 'sanah', count: 20, ref: '2:96',
        meanings: { en: 'year', bn: 'বছর', fr: 'an, année', id: 'tahun', ur: 'سال', tr: 'yıl, sene', ar: 'عَام' , zh: '年', ja: '年'}
      },
      {
        arabic: 'فَجْرٌ', translit: 'fajr', count: 6, ref: '89:1',
        meanings: { en: 'dawn', bn: 'ফজর, ভোর', fr: 'aube', id: 'fajar', ur: 'فجر، سحر', tr: 'fecir, şafak', ar: 'طُلُوعُ الصُّبْح' , zh: '黎明，晨礼', ja: '暁、ファジュル'}
      },
      {
        arabic: 'صُبْحٌ', translit: 'ṣubḥ', count: 5, ref: '11:81',
        meanings: { en: 'morning', bn: 'সকাল', fr: 'matin', id: 'pagi', ur: 'صبح', tr: 'sabah', ar: 'أَوَّلُ النَّهَار' , zh: '早晨', ja: '朝'}
      },
      {
        arabic: 'غَدٌ', translit: 'ghad', count: 5, ref: '31:34',
        meanings: { en: 'tomorrow', bn: 'আগামীকাল', fr: 'demain', id: 'besok', ur: 'آنے والا کل', tr: 'yarın', ar: 'الْيَوْمُ التَّالِي' , zh: '明天', ja: '明日'}
      }
    ]
  },
  {
    id: 'opposites', icon: '↔️',
    names: { en: 'Opposites', bn: 'বিপরীত শব্দ' },
    words: [
      {
        arabic: 'حَيَاةٌ', translit: 'ḥayāh', count: 71, ref: '67:2',
        meanings: { en: 'life', bn: 'জীবন', fr: 'vie', id: 'kehidupan', ur: 'زندگی', tr: 'hayat, yaşam', ar: 'عَيْش' , zh: '生活，生命', ja: '生活、生'}
      },
      {
        arabic: 'مَوْتٌ', translit: 'mawt', count: 38, ref: '67:2',
        meanings: { en: 'death', bn: 'মৃত্যু', fr: 'mort', id: 'kematian', ur: 'موت', tr: 'ölüm', ar: 'وَفَاة' , zh: '死亡', ja: '死'}
      },
      {
        arabic: 'نُورٌ', translit: 'nūr', count: 43, ref: '24:35',
        meanings: { en: 'light', bn: 'আলো, নূর', fr: 'lumière', id: 'cahaya', ur: 'روشنی، نور', tr: 'nur, ışık', ar: 'ضِيَاء' , zh: '光，光明', ja: '光'}
      },
      {
        arabic: 'ظُلُمَاتٌ', translit: 'ẓulumāt', count: 23, ref: '2:257',
        meanings: { en: 'darkness(es)', bn: 'অন্ধকার', fr: 'ténèbres', id: 'kegelapan', ur: 'اندھیرے', tr: 'karanlıklar', ar: 'ضِدُّ النُّور' , zh: '黑暗', ja: '闇'}
      },
      {
        arabic: 'دُنْيَا', translit: 'dunyā', count: 115, ref: '2:86',
        meanings: { en: 'this world', bn: 'দুনিয়া, পার্থিব জীবন', fr: 'ce bas monde', id: 'dunia', ur: 'دنیا', tr: 'dünya', ar: 'الْحَيَاةُ الْأُولَى' , zh: '今世', ja: '現世'}
      },
      {
        arabic: 'آخِرَةٌ', translit: 'ākhirah', count: 115, ref: '2:4',
        meanings: { en: 'the Hereafter', bn: 'আখিরাত, পরকাল', fr: 'l’au-delà', id: 'akhirat', ur: 'آخرت', tr: 'ahiret', ar: 'دَارُ الْبَقَاء' , zh: '后世', ja: '来世'}
      },
      {
        arabic: 'هُدًى', translit: 'hudā', count: 85, ref: '2:2',
        meanings: { en: 'guidance', bn: 'হিদায়াত, পথনির্দেশ', fr: 'guidée, direction', id: 'petunjuk', ur: 'ہدایت', tr: 'hidayet', ar: 'رَشَاد' , zh: '引导，正道', ja: '導き'}
      },
      {
        arabic: 'ضَلَالٌ', translit: 'ḍalāl', count: 44, ref: '3:164',
        meanings: { en: 'misguidance, straying', bn: 'পথভ্রষ্টতা', fr: 'égarement', id: 'kesesatan', ur: 'گمراہی', tr: 'sapkınlık, dalalet', ar: 'ضِدُّ الْهُدَى' , zh: '迷误', ja: '迷い'}
      }
    ]
  },
  {
    id: 'worship', icon: '🕌',
    names: { en: 'Worship', bn: 'ইবাদত' },
    words: [
      {
        arabic: 'زَكَاةٌ', translit: 'zakāh', count: 32, ref: '2:43',
        meanings: { en: 'alms, zakat', bn: 'যাকাত', fr: 'aumône (zakât)', id: 'zakat', ur: 'زکوٰۃ', tr: 'zekât', ar: 'صَدَقَةٌ مَفْرُوضَة' , zh: '天课', ja: 'ザカート'}
      },
      {
        arabic: 'صِيَامٌ', translit: 'ṣiyām', count: 10, ref: '2:183',
        meanings: { en: 'fasting', bn: 'রোযা, সিয়াম', fr: 'jeûne', id: 'puasa', ur: 'روزہ', tr: 'oruç', ar: 'إِمْسَاكٌ لِلَّه' , zh: '斋戒', ja: '断食'}
      },
      {
        arabic: 'حَجٌّ', translit: 'ḥajj', count: 11, ref: '3:97',
        meanings: { en: 'pilgrimage', bn: 'হজ্জ', fr: 'pèlerinage', id: 'haji', ur: 'حج', tr: 'hac', ar: 'قَصْدُ الْبَيْت' , zh: '朝觐', ja: 'ハッジ巡礼'}
      },
      {
        arabic: 'دُعَاءٌ', translit: 'duʿāʾ', count: 15, ref: '14:39',
        meanings: { en: 'supplication', bn: 'দোয়া', fr: 'invocation', id: 'doa', ur: 'دعا', tr: 'dua', ar: 'طَلَبٌ مِنَ اللَّه' , zh: '祈祷，杜阿', ja: '祈り、ドゥアー'}
      },
      {
        arabic: 'ذِكْرٌ', translit: 'dhikr', count: 76, ref: '15:9',
        meanings: { en: 'remembrance; reminder', bn: 'যিকির, স্মরণ', fr: 'rappel', id: 'zikir, peringatan', ur: 'ذکر، یاد', tr: 'zikir, anma', ar: 'تَذْكِرَة' , zh: '记念，提醒', ja: '念唱、教訓'}
      },
      {
        arabic: 'سَجَدَ', translit: 'sajada', count: 64, ref: '96:19',
        meanings: { en: 'he prostrated', bn: 'সে সিজদা করল', fr: 'il s’est prosterné', id: 'dia bersujud', ur: 'سجدہ کیا', tr: 'secde etti', ar: 'خَرَّ لِلَّه' , zh: '他叩头', ja: '彼はサジダした'}
      },
      {
        arabic: 'تَقْوَىٰ', translit: 'taqwā', count: 17, ref: '49:3',
        meanings: { en: 'God-consciousness', bn: 'তাকওয়া, আল্লাহভীতি', fr: 'piété', id: 'takwa', ur: 'تقویٰ', tr: 'takva', ar: 'خَشْيَةُ اللَّه' , zh: '敬畏', ja: 'タクワー'}
      },
      {
        arabic: 'مَسْجِدٌ', translit: 'masjid', count: 28, ref: '9:18',
        meanings: { en: 'mosque', bn: 'মসজিদ', fr: 'mosquée', id: 'masjid', ur: 'مسجد', tr: 'mescit, cami', ar: 'بَيْتُ الصَّلَاة' , zh: '清真寺', ja: 'モスク、マスジド'}
      }
    ]
  },
  {
    id: 'hereafter', icon: '⚖️',
    names: { en: 'Hereafter', bn: 'পরকাল' },
    words: [
      {
        arabic: 'قِيَامَةٌ', translit: 'qiyāmah', count: 70, ref: '75:1',
        meanings: { en: 'resurrection', bn: 'কিয়ামত', fr: 'résurrection', id: 'kiamat', ur: 'قیامت', tr: 'kıyamet', ar: 'يَوْمُ الْبَعْث' , zh: '复活', ja: '復活'}
      },
      {
        arabic: 'بَعَثَ', translit: 'baʿatha', count: 67, ref: '2:56',
        meanings: { en: 'he raised, sent', bn: 'পুনরুত্থিত/প্রেরণ করলেন', fr: 'il a ressuscité, envoyé', id: 'dia membangkitkan', ur: 'اٹھایا، بھیجا', tr: 'diriltti, gönderdi', ar: 'أَحْيَا / أَرْسَل' , zh: '他复活，派遣', ja: '彼は復活させ派遣した'}
      },
      {
        arabic: 'حِسَابٌ', translit: 'ḥisāb', count: 37, ref: '40:17',
        meanings: { en: 'reckoning, account', bn: 'হিসাব', fr: 'compte, jugement', id: 'perhitungan, hisab', ur: 'حساب', tr: 'hesap', ar: 'مُحَاسَبَة' , zh: '清算', ja: '清算'}
      },
      {
        arabic: 'مِيزَانٌ', translit: 'mīzān', count: 16, ref: '55:7',
        meanings: { en: 'balance, scale', bn: 'দাঁড়িপাল্লা, মিযান', fr: 'balance', id: 'timbangan', ur: 'ترازو، میزان', tr: 'mizan, terazi', ar: 'آلَةُ الْوَزْن' , zh: '天平，秤', ja: '天秤'}
      },
      {
        arabic: 'أَجْرٌ', translit: 'ajr', count: 98, ref: '3:185',
        meanings: { en: 'reward, wage', bn: 'প্রতিদান, পুরস্কার', fr: 'récompense', id: 'pahala, ganjaran', ur: 'اجر، بدلہ', tr: 'ecir, mükâfat', ar: 'ثَوَاب' , zh: '报酬', ja: '報酬'}
      },
      {
        arabic: 'جَهَنَّمُ', translit: 'jahannam', count: 77, ref: '3:12',
        meanings: { en: 'Hellfire, Jahannam', bn: 'জাহান্নাম', fr: 'Géhenne, Enfer', id: 'neraka Jahanam', ur: 'جہنم', tr: 'cehennem', ar: 'دَارُ الْعَذَاب' , zh: '火狱，哲汗南', ja: 'ジャハンナム'}
      },
      {
        arabic: 'فِرْدَوْسٌ', translit: 'firdaws', count: 2, ref: '18:107',
        meanings: { en: 'Firdaws, highest Paradise', bn: 'ফিরদাউস', fr: 'Firdaws, Paradis', id: 'Firdaus', ur: 'فردوس', tr: 'Firdevs', ar: 'أَعْلَى الْجَنَّة' , zh: '费尔道斯', ja: 'フィルダウス'}
      },
      {
        arabic: 'خَالِدِينَ', translit: 'khālidīn', count: 45, ref: '4:57',
        meanings: { en: 'abiding forever', bn: 'চিরস্থায়ীভাবে', fr: 'éternellement', id: 'kekal di dalamnya', ur: 'ہمیشہ رہنے والے', tr: 'ebedî kalıcılar', ar: 'مَاكِثِينَ أَبَدًا' , zh: '永居者', ja: '永遠に留まる者'}
      }
    ]
  }
];

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { VOCAB_WORDS, VOCAB_THEMES };
}
