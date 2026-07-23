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
  },

  // ---- High-frequency Quranic nouns and concepts ----
  {
    arabic: 'صَبْرٌ', translit: 'ṣabr', count: 103,
    meanings: { en: 'patience, endurance', bn: 'ধৈর্য, সবর', fr: 'patience', id: 'sabar', ur: 'صبر', tr: 'sabır', ar: 'تَحَمُّل' , zh: '忍耐，坚忍', ja: '忍耐、サブル'}
  },
  {
    arabic: 'ظُلْمٌ', translit: 'ẓulm', count: 315,
    meanings: { en: 'wrongdoing, injustice', bn: 'অত্যাচার, যুলুম', fr: 'injustice, tort', id: 'kezaliman', ur: 'ظلم', tr: 'zulüm', ar: 'جَوْر' , zh: '不义，压迫', ja: '不正、暴虐'}
  },
  {
    arabic: 'شُكْرٌ', translit: 'shukr', count: 75,
    meanings: { en: 'gratitude, thankfulness', bn: 'কৃতজ্ঞতা, শোকর', fr: 'gratitude', id: 'syukur', ur: 'شکر', tr: 'şükür', ar: 'امْتِنَان' , zh: '感谢，感恩', ja: '感謝、シュクル'}
  },
  {
    arabic: 'صِدْقٌ', translit: 'ṣidq', count: 155,
    meanings: { en: 'truth, sincerity', bn: 'সততা, সত্যবাদিতা', fr: 'vérité, sincérité', id: 'kejujuran', ur: 'صدق، سچائی', tr: 'doğruluk', ar: 'ضِدُّ الْكَذِب' , zh: '诚实，真诚', ja: '誠実、真実'}
  },
  {
    arabic: 'نَبِيٌّ', translit: 'nabiyy', count: 75,
    meanings: { en: 'prophet', bn: 'নবী', fr: 'prophète', id: 'nabi', ur: 'نبی', tr: 'nebi, peygamber', ar: 'مُنْبِئٌ عَنِ اللَّه' , zh: '先知', ja: '預言者、ナビー'}
  },
  {
    arabic: 'سَبِيلٌ', translit: 'sabīl', count: 176,
    meanings: { en: 'way, path', bn: 'পথ, রাস্তা', fr: 'voie, chemin', id: 'jalan', ur: 'راستہ، سبیل', tr: 'yol, sebil', ar: 'طَرِيق' , zh: '道路，途径', ja: '道、方法'}
  },
  {
    arabic: 'أُمَّةٌ', translit: 'ummah', count: 64,
    meanings: { en: 'community, nation', bn: 'উম্মত, জাতি', fr: 'communauté, nation', id: 'umat', ur: 'امت', tr: 'ümmet', ar: 'جَمَاعَةٌ مُتَّحِدَة' , zh: '民族，社群', ja: 'ウンマ、共同体'}
  },
  {
    arabic: 'رِزْقٌ', translit: 'rizq', count: 123,
    meanings: { en: 'provision, sustenance', bn: 'রিযিক, জীবিকা', fr: 'provision, subsistance', id: 'rezeki', ur: 'رزق', tr: 'rızık', ar: 'قُوتٌ مِنَ اللَّه' , zh: '给养，赐予', ja: 'リズク、糧'}
  },
  {
    arabic: 'سَلَامٌ', translit: 'salām', count: 140,
    meanings: { en: 'peace, safety', bn: 'সালাম, শান্তি', fr: 'paix, salut', id: 'salam, kedamaian', ur: 'سلام، امن', tr: 'selam, barış', ar: 'أَمَان' , zh: '平安，和平', ja: '平和、サラーム'}
  },
  {
    arabic: 'قُرْآنٌ', translit: 'qurʾān', count: 70,
    meanings: { en: 'the Quran, recitation', bn: 'কুরআন, পাঠ', fr: 'le Coran', id: 'Al-Quran', ur: 'قرآن', tr: 'Kur\'an', ar: 'كَلَامُ اللَّه' , zh: '古兰经', ja: 'クルアーン'}
  },
  {
    arabic: 'تَوْبَةٌ', translit: 'tawbah', count: 87,
    meanings: { en: 'repentance, return to God', bn: 'তওবা, অনুতাপ', fr: 'repentance', id: 'taubat', ur: 'توبہ', tr: 'tövbe', ar: 'رُجُوعٌ إِلَى اللَّه' , zh: '悔过，回归', ja: '悔悟、タウバ'}
  },
  {
    arabic: 'فِتْنَةٌ', translit: 'fitnah', count: 60,
    meanings: { en: 'trial, temptation, affliction', bn: 'ফিতনা, পরীক্ষা', fr: 'épreuve, tentation', id: 'fitnah, cobaan', ur: 'فتنہ', tr: 'fitne', ar: 'ابْتِلَاء' , zh: '考验，迷乱', ja: 'フィトナ、試練'}
  },
  {
    arabic: 'صِرَاطٌ', translit: 'ṣirāṭ', count: 45,
    meanings: { en: 'path, road', bn: 'সিরাত, পথ', fr: 'voie, chemin', id: 'jalan lurus', ur: 'صراط', tr: 'sırat, yol', ar: 'طَرِيقٌ مُسْتَقِيم' , zh: '正路，道路', ja: 'スィラート、道'}
  },
  {
    arabic: 'مَلَكٌ', translit: 'malak', count: 88,
    meanings: { en: 'angel', bn: 'ফেরেশতা, মালাক', fr: 'ange', id: 'malaikat', ur: 'فرشتہ', tr: 'melek', ar: 'رَسُولٌ رُوحَانِيّ' , zh: '天使', ja: '天使、マラク'}
  },
  {
    arabic: 'إِيمَانٌ', translit: 'īmān', count: 279,
    meanings: { en: 'faith, belief', bn: 'ঈমান, বিশ্বাস', fr: 'foi, croyance', id: 'iman', ur: 'ایمان', tr: 'iman', ar: 'تَصْدِيقٌ وَإِذْعَان' , zh: '信仰，伊玛尼', ja: 'イーマン、信仰'}
  },
  {
    arabic: 'حِكْمَةٌ', translit: 'ḥikmah', count: 210,
    meanings: { en: 'wisdom', bn: 'হিকমত, প্রজ্ঞা', fr: 'sagesse', id: 'hikmah, kebijaksanaan', ur: 'حکمت', tr: 'hikmet', ar: 'صَوَابُ الرَّأْي' , zh: '智慧', ja: 'ヒクマ、知恵'}
  },
  {
    arabic: 'فَضْلٌ', translit: 'faḍl', count: 90,
    meanings: { en: 'grace, bounty, favor', bn: 'অনুগ্রহ, ফযল', fr: 'grâce, bienfait', id: 'karunia, keutamaan', ur: 'فضل، احسان', tr: 'lütuf, fazilet', ar: 'إِنْعَام' , zh: '恩典，恩惠', ja: '恩寵、ファドル'}
  },
  {
    arabic: 'مَغْفِرَةٌ', translit: 'maghfirah', count: 234,
    meanings: { en: 'forgiveness, pardon', bn: 'মাগফিরাত, ক্ষমা', fr: 'pardon', id: 'ampunan', ur: 'مغفرت، بخشش', tr: 'mağfiret', ar: 'عَفْو' , zh: '饶恕，宽恕', ja: '赦免、マグフィラ'}
  },
  {
    arabic: 'بُشْرَىٰ', translit: 'bushrā', count: 122,
    meanings: { en: 'glad tidings, good news', bn: 'সুসংবাদ, বুশরা', fr: 'bonne nouvelle', id: 'kabar gembira', ur: 'خوشخبری، بشارت', tr: 'müjde', ar: 'خَبَرٌ سَارّ' , zh: '好消息，喜讯', ja: '吉報、ブシュラー'}
  },
  {
    arabic: 'نَذِيرٌ', translit: 'nadhīr', count: 60,
    meanings: { en: 'warner, admonisher', bn: 'সতর্ককারী, নাযির', fr: 'avertisseur', id: 'pemberi peringatan', ur: 'ڈرانے والا', tr: 'uyarıcı, nezir', ar: 'مُحَذِّر' , zh: '警告者', ja: '警告者、ナザィール'}
  },
  {
    arabic: 'نَعِيمٌ', translit: 'naʿīm', count: 21,
    meanings: { en: 'bliss, comfort', bn: 'নেয়ামত, পরম সুখ', fr: 'délices, bonheur', id: 'kenikmatan', ur: 'نعمت، راحت', tr: 'nimet', ar: 'بَهْجَةٌ وَرَفَاهِيَة' , zh: '喜乐，安逸', ja: '至福、ナイーム'}
  },
  {
    arabic: 'أَمَانَةٌ', translit: 'amānah', count: 6,
    meanings: { en: 'trust, integrity', bn: 'আমানত, বিশ্বস্ততা', fr: 'confiance, honnêteté', id: 'amanah', ur: 'امانت', tr: 'emanet', ar: 'وَدِيعَة' , zh: '信托，诚信', ja: 'アマーナ、信託'}
  },
  {
    arabic: 'مُؤْمِنٌ', translit: 'muʾmin', count: 230,
    meanings: { en: 'believer, faithful', bn: 'মুমিন, বিশ্বাসী', fr: 'croyant', id: 'mukmin, orang beriman', ur: 'مومن', tr: 'mümin', ar: 'مُصَدِّقٌ بِاللَّه' , zh: '信士', ja: 'ムウミン、信者'}
  },
  {
    arabic: 'بَاطِلٌ', translit: 'bāṭil', count: 36,
    meanings: { en: 'falsehood, vain', bn: 'বাতিল, মিথ্যা', fr: 'faux, vain', id: 'batil', ur: 'باطل، جھوٹ', tr: 'bâtıl, yanlış', ar: 'ضِدُّ الْحَقّ' , zh: '虚伪，错误', ja: '虚偽、バーティル'}
  },
  {
    arabic: 'عَهْدٌ', translit: 'ʿahd', count: 95,
    meanings: { en: 'covenant, promise', bn: 'প্রতিশ্রুতি, চুক্তি', fr: 'pacte, promesse', id: 'janji, perjanjian', ur: 'عہد، وعدہ', tr: 'ahit, söz', ar: 'مِيثَاق' , zh: '契约，盟约', ja: '誓約、アフド'}
  },
  {
    arabic: 'وَحْيٌ', translit: 'waḥy', count: 78,
    meanings: { en: 'revelation, inspiration', bn: 'ওহী, প্রত্যাদেশ', fr: 'révélation', id: 'wahyu', ur: 'وحی', tr: 'vahiy', ar: 'إِلْهَامٌ إِلَهِيّ' , zh: '启示，天启', ja: 'ワヒー、啓示'}
  },
  {
    arabic: 'نِعْمَةٌ', translit: 'niʿmah', count: 34,
    meanings: { en: 'blessing, favor', bn: 'নিয়ামত, আশীর্বাদ', fr: 'bienfait, faveur', id: 'nikmat', ur: 'نعمت', tr: 'nimet, lütuf', ar: 'إِنْعَام' , zh: '恩赐，恩德', ja: '恩恵、ニウマ'}
  },
  {
    arabic: 'حَمْدٌ', translit: 'ḥamd', count: 68,
    meanings: { en: 'praise, thanksgiving', bn: 'প্রশংসা, হামদ', fr: 'louange', id: 'pujian, alhamdulillah', ur: 'حمد، تعریف', tr: 'hamd, şükür', ar: 'ثَنَاءٌ عَلَى اللَّه' , zh: '赞美，颂扬', ja: 'ハムド、賛美'}
  },
  {
    arabic: 'حَسَنَةٌ', translit: 'ḥasanah', count: 167,
    meanings: { en: 'good deed, blessing', bn: 'সৎকাজ, হাসানাহ', fr: 'bonne action, bénédiction', id: 'amal baik, kebaikan', ur: 'نیکی، بھلائی', tr: 'iyilik, hasene', ar: 'عَمَلٌ صَالِح' , zh: '善行，赐福', ja: '善行、ハサナ'}
  },
  {
    arabic: 'فَوْزٌ', translit: 'fawz', count: 40,
    meanings: { en: 'success, triumph', bn: 'সাফল্য, মুক্তি', fr: 'succès, triomphe', id: 'keberhasilan, kemenangan', ur: 'کامیابی، نجات', tr: 'kurtuluş, zafer', ar: 'نَجَاح' , zh: '成功，胜利', ja: '成功、ファウズ'}
  },

  // ---- More high-frequency verbs ----
  {
    arabic: 'جَعَلَ', translit: 'jaʿala', count: 340,
    meanings: { en: 'he made, placed', bn: 'সে বানাল, রাখল', fr: 'il a fait, placé', id: 'dia menjadikan', ur: 'اس نے بنایا', tr: 'yaptı, kıldı', ar: 'صَيَّرَ' , zh: '他使，安置', ja: '彼は作った、定めた'}
  },
  {
    arabic: 'كَذَّبَ', translit: 'kadhdhaba', count: 280,
    meanings: { en: 'he denied, belied', bn: 'সে মিথ্যা প্রতিপন্ন করল', fr: 'il a démenti', id: 'dia mendustakan', ur: 'اس نے جھٹلایا', tr: 'yalanladı', ar: 'أَنْكَرَ وَكَذَّب' , zh: '他否认，斥为谎言', ja: '彼は嘘とした'}
  },
  {
    arabic: 'أَخَذَ', translit: 'akhadha', count: 270,
    meanings: { en: 'he took, seized', bn: 'সে নিল, ধরল', fr: 'il a pris, saisi', id: 'dia mengambil', ur: 'اس نے لیا، پکڑا', tr: 'aldı, yakaladı', ar: 'تَنَاوَلَ / أَمْسَكَ' , zh: '他拿取，抓住', ja: '彼は取った、捕らえた'}
  },
  {
    arabic: 'أَرَادَ', translit: 'arāda', count: 140,
    meanings: { en: 'he wanted, willed', bn: 'সে চাইল', fr: 'il a voulu', id: 'dia menghendaki', ur: 'اس نے چاہا', tr: 'istedi, diledi', ar: 'شَاءَ' , zh: '他想要，意欲', ja: '彼は望んだ'}
  },
  {
    arabic: 'عَبَدَ', translit: 'ʿabada', count: 140,
    meanings: { en: 'he worshipped', bn: 'সে ইবাদত করল', fr: 'il a adoré', id: 'dia menyembah', ur: 'اس نے عبادت کی', tr: 'ibadet etti, kulluk etti', ar: 'تَذَلَّلَ لِلَّه' , zh: '他崇拜', ja: '彼は崇拝した'}
  },
  {
    arabic: 'دَخَلَ', translit: 'dakhala', count: 125,
    meanings: { en: 'he entered', bn: 'সে প্রবেশ করল', fr: 'il est entré', id: 'dia masuk', ur: 'وہ داخل ہوا', tr: 'girdi', ar: 'وَلَجَ' , zh: '他进入', ja: '彼は入った'}
  },
  {
    arabic: 'رَزَقَ', translit: 'razaqa', count: 120,
    meanings: { en: 'he provided, sustained', bn: 'তিনি রিযিক দিলেন', fr: 'il a pourvu', id: 'dia memberi rezeki', ur: 'اس نے رزق دیا', tr: 'rızıklandırdı', ar: 'أَعْطَى الْقُوت' , zh: '他供给', ja: '彼は糧を与えた'}
  },
  {
    arabic: 'نَصَرَ', translit: 'naṣara', count: 120,
    meanings: { en: 'he helped, aided', bn: 'তিনি সাহায্য করলেন', fr: 'il a secouru', id: 'dia menolong', ur: 'اس نے مدد کی', tr: 'yardım etti', ar: 'أَعَانَ' , zh: '他援助', ja: '彼は助けた'}
  },
  {
    arabic: 'غَفَرَ', translit: 'ghafara', count: 95,
    meanings: { en: 'he forgave', bn: 'তিনি ক্ষমা করলেন', fr: 'il a pardonné', id: 'dia mengampuni', ur: 'اس نے بخشا', tr: 'bağışladı', ar: 'سَتَرَ الذَّنْب' , zh: '他饶恕', ja: '彼は赦した'}
  },
  {
    arabic: 'ضَرَبَ', translit: 'ḍaraba', count: 58,
    meanings: { en: 'he struck; set forth', bn: 'সে আঘাত করল; উপমা দিল', fr: 'il a frappé; proposé', id: 'dia memukul; membuat (perumpamaan)', ur: 'اس نے مارا؛ مثال دی', tr: 'vurdu; örnek verdi', ar: 'صَكَّ / أَوْرَدَ مَثَلًا' , zh: '他打；设（比喻）', ja: '彼は打った；例を挙げた'}
  },

  // ---- More high-frequency nouns ----
  {
    arabic: 'نَاسٌ', translit: 'nās', count: 240,
    meanings: { en: 'people, mankind', bn: 'মানুষ, লোকজন', fr: 'les gens, l’humanité', id: 'manusia', ur: 'لوگ، انسان', tr: 'insanlar', ar: 'الْبَشَر' , zh: '人们，人类', ja: '人々、人類'}
  },
  {
    arabic: 'أَمْرٌ', translit: 'amr', count: 250,
    meanings: { en: 'command; matter', bn: 'আদেশ; বিষয়', fr: 'ordre; affaire', id: 'perintah; urusan', ur: 'حکم؛ معاملہ', tr: 'emir; iş', ar: 'حُكْمٌ / شَأْن' , zh: '命令；事务', ja: '命令；事柄'}
  },
  {
    arabic: 'مَالٌ', translit: 'māl', count: 86,
    meanings: { en: 'wealth, property', bn: 'ধন-সম্পদ', fr: 'biens, richesse', id: 'harta', ur: 'مال، دولت', tr: 'mal, servet', ar: 'مَا يُمْلَك' , zh: '财产，财富', ja: '財産、富'}
  },
  {
    arabic: 'بَيْتٌ', translit: 'bayt', count: 65,
    meanings: { en: 'house, home', bn: 'ঘর, গৃহ', fr: 'maison', id: 'rumah', ur: 'گھر', tr: 'ev', ar: 'مَسْكَن' , zh: '房屋，家', ja: '家'}
  },
  {
    arabic: 'عَدُوٌّ', translit: 'ʿaduww', count: 45,
    meanings: { en: 'enemy', bn: 'শত্রু', fr: 'ennemi', id: 'musuh', ur: 'دشمن', tr: 'düşman', ar: 'خَصْمٌ مُعَادٍ' , zh: '敌人', ja: '敵'}
  },
  {
    arabic: 'كَلِمَةٌ', translit: 'kalimah', count: 42,
    meanings: { en: 'word, statement', bn: 'শব্দ, কথা, কালিমা', fr: 'parole, mot', id: 'kata, kalimat', ur: 'کلمہ، بات', tr: 'kelime, söz', ar: 'لَفْظٌ ذُو مَعْنًى' , zh: '话语，词', ja: '言葉'}
  },
  {
    arabic: 'ذَنْبٌ', translit: 'dhanb', count: 39,
    meanings: { en: 'sin, offense', bn: 'পাপ, গুনাহ', fr: 'péché', id: 'dosa', ur: 'گناہ', tr: 'günah', ar: 'إِثْم' , zh: '罪过', ja: '罪'}
  },
  {
    arabic: 'رُوحٌ', translit: 'rūḥ', count: 24,
    meanings: { en: 'spirit, soul', bn: 'রূহ, আত্মা', fr: 'esprit', id: 'roh', ur: 'روح', tr: 'ruh', ar: 'مَا بِهِ الْحَيَاة' , zh: '精神，灵', ja: '霊、魂'}
  },
  {
    arabic: 'مَلِكٌ', translit: 'malik', count: 13,
    meanings: { en: 'king, sovereign', bn: 'রাজা, বাদশাহ', fr: 'roi', id: 'raja', ur: 'بادشاہ', tr: 'kral, hükümdar', ar: 'ذُو الْمُلْك' , zh: '国王，君主', ja: '王、君主'}
  },

  // ---- Divine names & key adjectives ----
  {
    arabic: 'عَظِيمٌ', translit: 'ʿaẓīm', count: 107,
    meanings: { en: 'great, mighty', bn: 'মহান, বিরাট', fr: 'immense, grandiose', id: 'agung, besar', ur: 'عظیم، بہت بڑا', tr: 'büyük, azametli', ar: 'كَبِيرُ الشَّأْن' , zh: '伟大的', ja: '偉大な'}
  },
  {
    arabic: 'عَزِيزٌ', translit: 'ʿazīz', count: 99,
    meanings: { en: 'mighty, Almighty', bn: 'পরাক্রমশালী, সম্মানিত', fr: 'puissant, tout-puissant', id: 'Maha Perkasa', ur: 'زبردست، غالب', tr: 'aziz, üstün', ar: 'قَوِيٌّ غَالِب' , zh: '万能的，尊贵的', ja: '偉力ある者'}
  },
  {
    arabic: 'حَكِيمٌ', translit: 'ḥakīm', count: 97,
    meanings: { en: 'wise, All-Wise', bn: 'প্রজ্ঞাময়, হাকীম', fr: 'sage', id: 'Maha Bijaksana', ur: 'حکمت والا، حکیم', tr: 'hikmet sahibi, hakîm', ar: 'ذُو الْحِكْمَة' , zh: '至睿的，明智的', ja: '英明な者'}
  },
  {
    arabic: 'سَمِيعٌ', translit: 'samīʿ', count: 47,
    meanings: { en: 'All-Hearing', bn: 'সর্বশ্রোতা', fr: 'qui entend tout', id: 'Maha Mendengar', ur: 'سب سننے والا', tr: 'her şeyi işiten', ar: 'كَثِيرُ السَّمْع' , zh: '全聪的', ja: '全聴者'}
  },
  {
    arabic: 'بَصِيرٌ', translit: 'baṣīr', count: 42,
    meanings: { en: 'All-Seeing', bn: 'সর্বদ্রষ্টা', fr: 'qui voit tout', id: 'Maha Melihat', ur: 'سب دیکھنے والا', tr: 'her şeyi gören', ar: 'كَثِيرُ الْبَصَر' , zh: '全明的', ja: '全視者'}
  },
  {
    arabic: 'قَدِيرٌ', translit: 'qadīr', count: 45,
    meanings: { en: 'All-Powerful, able', bn: 'সর্বশক্তিমান', fr: 'tout-puissant, capable', id: 'Maha Kuasa', ur: 'قادر، ہر چیز پر قادر', tr: 'her şeye gücü yeten', ar: 'قَادِرٌ عَلَى كُلِّ شَيْء' , zh: '全能的', ja: '全能者'}
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
  },

  // ---- Root-family clusters ----
  // Each cluster shows common Quranic derivatives of one trilateral root so
  // students recognise morphological patterns. Base forms already present in
  // VOCAB_WORDS (كِتَاب، عَلِمَ، رَحْمَة، خَلَقَ، كَفَرَ، حَمْد) are omitted here.

  {
    id: 'root-ktb', icon: '📖',
    names: { en: 'Root: ك-ت-ب (write)', bn: 'মূল: ك-ت-ب (লেখা)' },
    words: [
      {
        arabic: 'كَاتِبٌ', translit: 'kātib', count: 45, ref: '2:282',
        meanings: { en: 'writer, scribe', bn: 'লেখক, কাতিব', fr: 'écrivain, scribe', id: 'penulis, juru tulis', ur: 'لکھنے والا، کاتب', tr: 'yazıcı, kâtip', ar: 'مَنْ يَكْتُب', zh: '书记员，抄写者', ja: '書記、筆記者' }
      },
      {
        arabic: 'مَكْتُوبٌ', translit: 'maktūb', count: 4, ref: '4:103',
        meanings: { en: 'written; prescribed', bn: 'লেখা, নির্ধারিত', fr: 'écrit; prescrit', id: 'tertulis; ditetapkan', ur: 'لکھا ہوا، مقدّر', tr: 'yazılmış; farz kılınmış', ar: 'مُقَرَّرٌ كِتَابَةً', zh: '已写的；注定的', ja: '記された；定められた' }
      },
      {
        arabic: 'كِتَابَةٌ', translit: 'kitāba', count: 3, ref: '2:282',
        meanings: { en: 'writing, inscription', bn: 'লেখা (কাজ), কিতাবাত', fr: 'écriture, rédaction', id: 'penulisan, kitabah', ur: 'لکھنا، کتابت', tr: 'yazı yazma', ar: 'فِعْلُ الْكِتَابَة', zh: '书写（行为）', ja: '書くこと、執筆' }
      },
      {
        arabic: 'كُتُبٌ', translit: 'kutub', count: 20, ref: '2:177',
        meanings: { en: 'books, scriptures (pl.)', bn: 'কিতাবসমূহ, গ্রন্থাবলি', fr: 'livres, Écritures (pl.)', id: 'kitab-kitab (jamak)', ur: 'کتابیں، کتب', tr: 'kitaplar (çoğul)', ar: 'جَمْعُ كِتَاب', zh: '诸经典，众书', ja: '諸書、聖典複数' }
      }
    ]
  },
  {
    id: 'root-alm', icon: '🎓',
    names: { en: 'Root: ع-ل-م (know)', bn: 'মূল: ع-ل-م (জানা)' },
    words: [
      {
        arabic: 'عِلْمٌ', translit: 'ʿilm', count: 105, ref: '2:32',
        meanings: { en: 'knowledge, learning', bn: 'জ্ঞান, ইলম', fr: 'savoir, science', id: 'ilmu, pengetahuan', ur: 'علم، جانکاری', tr: 'ilim, bilgi', ar: 'مَعْرِفَةٌ وَإِدْرَاك', zh: '知识，学问', ja: '知識、学問' }
      },
      {
        arabic: 'عَالِمٌ', translit: 'ʿālim', count: 33, ref: '6:73',
        meanings: { en: 'knowing; scholar', bn: 'জ্ঞানী, আলিম', fr: 'savant; érudit', id: 'mengetahui; ulama', ur: 'جاننے والا، عالم', tr: 'bilen; âlim', ar: 'مُدْرِكٌ عَارِف', zh: '全知的；学者', ja: '知る者；学者' }
      },
      {
        arabic: 'مَعْلُومٌ', translit: 'maʿlūm', count: 13, ref: '15:38',
        meanings: { en: 'known; determined', bn: 'জানা, নির্ধারিত', fr: 'connu; déterminé', id: 'diketahui; ditentukan', ur: 'معلوم، جانا ہوا', tr: 'bilinen; belirlenmiş', ar: 'مَنْ أُدْرِكَ عِلْمُهُ', zh: '已知的；确定的', ja: '知られた；確定した' }
      },
      {
        arabic: 'أَعْلَمُ', translit: 'aʿlam', count: 46, ref: '2:216',
        meanings: { en: 'more knowing; All-Knowing', bn: 'অধিক জ্ঞাত, সর্বজ্ঞ', fr: 'plus savant; omniscient', id: 'lebih mengetahui; Maha Mengetahui', ur: 'زیادہ جاننے والا', tr: 'daha iyi bilen; her şeyi bilen', ar: 'أَشَدُّ عِلْمًا', zh: '更知悉的；全知', ja: 'より知る者；全知' }
      },
      {
        arabic: 'عَالَمِينَ', translit: 'ʿālamīn', count: 73, ref: '1:2',
        meanings: { en: 'worlds, all creation', bn: 'জগতসমূহ, আলামিন', fr: 'mondes, univers', id: 'seluruh alam semesta', ur: 'تمام جہانوں کے', tr: 'âlemler, bütün varlıklar', ar: 'جَمِيعُ الْخَلَائِق', zh: '万世界，众世界', ja: '全世界、万物' }
      }
    ]
  },
  {
    id: 'root-rhm', icon: '💚',
    names: { en: 'Root: ر-ح-م (mercy)', bn: 'মূল: ر-ح-م (রহমত)' },
    words: [
      {
        arabic: 'الرَّحْمَـٰنُ', translit: 'al-raḥmān', count: 57, ref: '1:3',
        meanings: { en: 'the Most Gracious', bn: 'রহমান, পরম দয়ালু', fr: 'le Tout-Miséricordieux', id: 'Yang Maha Pengasih', ur: 'رحمان، بہت مہربان', tr: 'Rahman, çok merhametli', ar: 'كَثِيرُ الرَّحْمَة', zh: '至仁的', ja: '慈悲深き者' }
      },
      {
        arabic: 'الرَّحِيمُ', translit: 'al-raḥīm', count: 114, ref: '1:3',
        meanings: { en: 'the Most Merciful', bn: 'রাহীম, অতি দয়ালু', fr: 'le Très-Miséricordieux', id: 'Yang Maha Penyayang', ur: 'رحیم، بہت رحم کرنے والا', tr: 'Rahim, pek merhametli', ar: 'دَائِمُ الرَّحْمَة', zh: '至慈的', ja: '深く慈悲ある者' }
      },
      {
        arabic: 'أَرْحَمُ', translit: 'arḥam', count: 3, ref: '12:64',
        meanings: { en: 'most merciful (superlative)', bn: 'সর্বাধিক দয়ালু', fr: 'le plus miséricordieux', id: 'paling penyayang', ur: 'سب سے زیادہ رحم کرنے والا', tr: 'en merhametli', ar: 'أَكْثَرُ رَحْمَةً', zh: '最有慈悯者', ja: '最も慈悲深い' }
      },
      {
        arabic: 'رَحِمٌ', translit: 'raḥim', count: 15, ref: '4:1',
        meanings: { en: 'womb; ties of kinship', bn: 'গর্ভ; আত্মীয়তার বন্ধন', fr: 'ventre maternel; liens de parenté', id: 'rahim; silaturahmi', ur: 'رحم، کوکھ؛ رشتہ داری', tr: 'rahim; akrabalık bağları', ar: 'مَوْضِعُ الْجَنِين', zh: '子宫；亲属关系', ja: '子宮；血縁の絆' }
      }
    ]
  },
  {
    id: 'root-slh', icon: '⚖️',
    names: { en: 'Root: ص-ل-ح (righteous)', bn: 'মূল: ص-ل-ح (সৎ/সংস্কার)' },
    words: [
      {
        arabic: 'صَالِحٌ', translit: 'ṣāliḥ', count: 190, ref: '4:69',
        meanings: { en: 'righteous, good', bn: 'সৎ, নেক, সালিহ', fr: 'vertueux, bon', id: 'shalih, orang baik', ur: 'صالح، نیک', tr: 'salih, erdemli', ar: 'حَسَنُ الْعَمَل', zh: '善良的，正直的', ja: '義人、善き者' }
      },
      {
        arabic: 'صَالِحَاتٌ', translit: 'ṣāliḥāt', count: 60, ref: '2:25',
        meanings: { en: 'good deeds; righteous (women)', bn: 'সৎকাজ; সৎ নারীরা', fr: 'bonnes œuvres; femmes vertueuses', id: 'amal shalih; perempuan shalihah', ur: 'صالحات، نیک اعمال', tr: 'salih ameller; saliha kadınlar', ar: 'أَعْمَالٌ حَسَنَة', zh: '善行；善良的女性', ja: '善行；善い女性たち' }
      },
      {
        arabic: 'إِصْلَاحٌ', translit: 'iṣlāḥ', count: 9, ref: '2:220',
        meanings: { en: 'reform, reconciliation', bn: 'সংস্কার, সন্ধি', fr: 'réforme, réconciliation', id: 'perdamaian, reformasi', ur: 'اصلاح، سلح', tr: 'ıslah, uzlaşma', ar: 'إِزَالَةُ الْفَسَاد', zh: '改革，调解', ja: '改革、和解' }
      },
      {
        arabic: 'مُصْلِحٌ', translit: 'muṣliḥ', count: 5, ref: '2:11',
        meanings: { en: 'reformer, peacemaker', bn: 'সংস্কারক, শান্তিস্থাপক', fr: 'réformateur, médiateur', id: 'pembuat perdamaian, pereformasi', ur: 'اصلاح کرنے والا', tr: 'ıslah edici, barış yapıcı', ar: 'سَاعٍ إِلَى الصَّلَاح', zh: '改革者，调解人', ja: '改革者、平和をつくる者' }
      },
      {
        arabic: 'صُلْحٌ', translit: 'ṣulḥ', count: 1, ref: '4:128',
        meanings: { en: 'peace, reconciliation', bn: 'সন্ধি, মিটমাট', fr: 'paix, réconciliation', id: 'perdamaian, shulhu', ur: 'صلح، سلامتی', tr: 'sulh, barış', ar: 'إِنْهَاءُ النِّزَاع', zh: '和解，和约', ja: '和解、講和' }
      }
    ]
  },
  {
    id: 'root-hmd', icon: '🌟',
    names: { en: 'Root: ح-م-د (praise)', bn: 'মূল: ح-م-د (প্রশংসা)' },
    words: [
      {
        arabic: 'حَمِيدٌ', translit: 'ḥamīd', count: 17, ref: '14:8',
        meanings: { en: 'praiseworthy', bn: 'প্রশংসনীয়, হামীদ', fr: 'digne de louange', id: 'Maha Terpuji', ur: 'قابلِ تعریف، حمید', tr: 'övgüye layık, Hamid', ar: 'مُسْتَحِقُّ الْحَمْد', zh: '值得赞美的', ja: '讃えられるべき者' }
      },
      {
        arabic: 'مُحَمَّدٌ', translit: 'muḥammad', count: 4, ref: '3:144',
        meanings: { en: 'Muhammad; the praised one', bn: 'মুহাম্মদ; প্রশংসিত', fr: 'Muhammad; le Loué', id: 'Muhammad; orang yang terpuji', ur: 'محمد؛ قابل تعریف', tr: 'Muhammed; övülmüş', ar: 'اسْمُ النَّبِيّ ﷺ', zh: '穆罕默德；受赞颂的', ja: 'ムハンマド；称えられた者' }
      },
      {
        arabic: 'أَحْمَدُ', translit: 'aḥmad', count: 1, ref: '61:6',
        meanings: { en: 'more praiseworthy; Prophet\'s name', bn: 'অধিক প্রশংসনীয়; নবীর নাম', fr: 'plus digne de louange; nom du Prophète', id: 'lebih terpuji; nama Nabi', ur: 'زیادہ قابلِ تعریف؛ نبی کا نام', tr: 'daha övgüye değer; Peygamberin adı', ar: 'أَفْعَلُ التَّفْضِيلِ مِنَ الْحَمْد', zh: '更值得赞美；先知之名', ja: 'より称えられる者；預言者の名' }
      },
      {
        arabic: 'مَحْمُودٌ', translit: 'maḥmūd', count: 1, ref: '17:79',
        meanings: { en: 'praised, lauded', bn: 'প্রশংসিত, মাহমুদ', fr: 'loué, glorifié', id: 'yang dipuji, mahmud', ur: 'محمود، تعریف شدہ', tr: 'övülen, mahmut', ar: 'مَنْ أَثْنَى عَلَيْهِ النَّاس', zh: '受赞扬的', ja: '称えられた者' }
      }
    ]
  },
  {
    id: 'root-khlq', icon: '🌐',
    names: { en: 'Root: خ-ل-ق (create)', bn: 'মূল: خ-ل-ق (সৃষ্টি)' },
    words: [
      {
        arabic: 'خَلْقٌ', translit: 'khalq', count: 15, ref: '31:11',
        meanings: { en: 'creation; created beings', bn: 'সৃষ্টি; সৃষ্টিকুল', fr: 'création; créatures', id: 'penciptaan; makhluk', ur: 'خلق، پیدائش؛ مخلوق', tr: 'yaratma; yaratıklar', ar: 'إِيجَادُ الْأَشْيَاء', zh: '创造；受造物', ja: '創造；被造物' }
      },
      {
        arabic: 'خَالِقٌ', translit: 'khāliq', count: 8, ref: '59:24',
        meanings: { en: 'creator', bn: 'সৃষ্টিকর্তা, খালিক', fr: 'créateur', id: 'pencipta, khaliq', ur: 'خالق، پیدا کرنے والا', tr: 'yaratan, Hâlik', ar: 'مُوجِدُ الْكَوْن', zh: '造物主，创造者', ja: '創造者、ハーリク' }
      },
      {
        arabic: 'مَخْلُوقٌ', translit: 'makhlūq', count: 2, ref: '36:71',
        meanings: { en: 'created being, creature', bn: 'সৃষ্ট বস্তু, মাখলুক', fr: 'créature', id: 'makhluk, yang diciptakan', ur: 'مخلوق، پیدا کردہ', tr: 'yaratılmış varlık, mahlûk', ar: 'مَا أَوْجَدَهُ اللَّه', zh: '受造物，被造者', ja: '被造物、マフルーク' }
      },
      {
        arabic: 'خُلُقٌ', translit: 'khuluq', count: 5, ref: '68:4',
        meanings: { en: 'character, moral nature', bn: 'স্বভাব, চরিত্র, আখলাক', fr: 'caractère, mœurs', id: 'akhlak, budi pekerti', ur: 'اخلاق، خُلق، کردار', tr: 'ahlak, karakter', ar: 'طِبَاعُ النَّفْس', zh: '品德，道德本性', ja: '品性、道徳的性質' }
      }
    ]
  },
  {
    id: 'root-kfr', icon: '⚡',
    names: { en: 'Root: ك-ف-ر (disbelieve)', bn: 'মূল: ك-ف-ر (কুফর)' },
    words: [
      {
        arabic: 'كُفْرٌ', translit: 'kufr', count: 25, ref: '2:108',
        meanings: { en: 'disbelief, ingratitude', bn: 'কুফর, অবিশ্বাস', fr: 'mécréance, ingratitude', id: 'kekufuran', ur: 'کفر، ناشکری', tr: 'küfür, inkâr', ar: 'جُحُودُ الْحَقّ', zh: '不信，忘恩', ja: '不信仰、クフル' }
      },
      {
        arabic: 'كَافِرٌ', translit: 'kāfir', count: 200, ref: '2:6',
        meanings: { en: 'disbeliever, unbeliever', bn: 'কাফির, অবিশ্বাসী', fr: 'mécréant, incroyant', id: 'kafir, orang yang ingkar', ur: 'کافر، منکر', tr: 'kâfir, inkârcı', ar: 'مَنْ جَحَدَ الْحَقّ', zh: '不信者，卡菲尔', ja: '不信者、カーフィル' }
      },
      {
        arabic: 'كَفَّارَةٌ', translit: 'kaffāra', count: 6, ref: '5:89',
        meanings: { en: 'expiation, atonement', bn: 'কাফফারা, প্রায়শ্চিত্ত', fr: 'expiation, rachat', id: 'kafarat, penebusan dosa', ur: 'کفارہ، تلافی', tr: 'kefaret, fidye', ar: 'مَا يُكَفِّرُ الذَّنْب', zh: '赎罪，赎金', ja: '贖罪、カッファーラ' }
      },
      {
        arabic: 'كَافُورٌ', translit: 'kāfūr', count: 1, ref: '76:5',
        meanings: { en: 'camphor; fragrant drink of Paradise', bn: 'কাফূর, সুগন্ধিযুক্ত পানীয়', fr: 'camphre; breuvage parfumé du Paradis', id: 'kafur, minuman wangi surga', ur: 'کافور، خوشبو دار مشروب', tr: 'kâfur, cennet içeceği', ar: 'نَبَاتٌ طَيِّبُ الرَّائِحَة', zh: '樟脑；天园香饮', ja: 'カーフール；天国の飲み物' }
      }
    ]
  },
  {
    id: 'root-hdy', icon: '🧭',
    names: { en: 'Root: ه-د-ي (guide)', bn: 'মূল: ه-د-ي (হিদায়াত)' },
    words: [
      {
        arabic: 'هَادٍ', translit: 'hādī', count: 11, ref: '13:7',
        meanings: { en: 'guide, leader to truth', bn: 'পথপ্রদর্শক, হাদী', fr: 'guide, directeur', id: 'pemberi petunjuk, hadi', ur: 'ہادی، رہنما', tr: 'hidayete erdiren, Hâdi', ar: 'مَنْ يَدُلُّ عَلَى الصَّوَاب', zh: '引导者，向导', ja: '導く者、ハーディー' }
      },
      {
        arabic: 'مُهْتَدٍ', translit: 'muhtadī', count: 14, ref: '17:97',
        meanings: { en: 'guided, rightly guided', bn: 'হিদায়াতপ্রাপ্ত, পথপ্রদর্শিত', fr: 'bien guidé, qui a trouvé la voie', id: 'orang yang mendapat petunjuk', ur: 'ہدایت یافتہ', tr: 'hidayete ermiş', ar: 'مَنِ اهْتَدَى', zh: '得到引导者', ja: '導かれた者' }
      },
      {
        arabic: 'اهْدِنَا', translit: 'ihdinā', count: 1, ref: '1:6',
        meanings: { en: 'guide us (supplication)', bn: 'আমাদের পথ দেখাও', fr: 'guide-nous', id: 'tunjukilah kami', ur: 'ہمیں ہدایت دے', tr: 'bizi doğru yola ilet', ar: 'أَرْشِدْنَا', zh: '引导我们', ja: '私たちを導いてください' }
      },
      {
        arabic: 'هِدَايَةٌ', translit: 'hidāya', count: 3, ref: '2:120',
        meanings: { en: 'guidance, right path', bn: 'হিদায়াত, সঠিক পথ', fr: 'guidée, voie droite', id: 'hidayah, petunjuk yang benar', ur: 'ہدایت، صحیح راستہ', tr: 'hidayet, doğru yol', ar: 'إِرْشَادٌ إِلَى الصَّوَاب', zh: '正道引导', ja: 'ヒダーヤ、正しい導き' }
      }
    ]
  },
  {
    id: 'root-dkr', icon: '🔔',
    names: { en: 'Root: ذ-ك-ر (remember)', bn: 'মূল: ذ-ك-ر (যিকির/স্মরণ)' },
    words: [
      {
        arabic: 'ذَاكِرٌ', translit: 'dhākir', count: 2, ref: '33:35',
        meanings: { en: 'one who remembers Allah', bn: 'স্মরণকারী, জিকিরকারী', fr: 'celui qui fait dhikr', id: 'orang yang berdzikir', ur: 'ذاکر، ذکر کرنے والا', tr: 'zikreden, anan', ar: 'مَنْ يَذْكُرُ اللَّه', zh: '记念者', ja: '念唱する者' }
      },
      {
        arabic: 'مَذْكُورٌ', translit: 'madhkūr', count: 3, ref: '76:1',
        meanings: { en: 'mentioned, remembered', bn: 'উল্লিখিত, স্মরিত', fr: 'mentionné, rappelé', id: 'yang disebut, yang diingat', ur: 'مذکور، یاد کیا گیا', tr: 'zikredilen, bahsedilen', ar: 'مَنْ ذُكِرَ', zh: '被提及的', ja: '言及された者' }
      },
      {
        arabic: 'تَذْكِرَةٌ', translit: 'tadhkira', count: 10, ref: '80:11',
        meanings: { en: 'reminder, admonition', bn: 'তাযকিরা, সতর্কতা', fr: 'rappel, avertissement', id: 'peringatan, tadzkirah', ur: 'تذکرہ، یاد دہانی', tr: 'öğüt, hatırlatma', ar: 'مَا يُذَكِّرُ بِاللَّه', zh: '提醒，训诫', ja: '訓戒、タズキラ' }
      },
      {
        arabic: 'ذِكْرَىٰ', translit: 'dhikrā', count: 35, ref: '6:90',
        meanings: { en: 'reminder, exhortation', bn: 'স্মরণ, উপদেশ', fr: 'rappel, souvenance', id: 'pengingat, kenangan', ur: 'یاد دہانی، نصیحت', tr: 'anma, hatırlatma', ar: 'تَنْبِيهٌ وَتَذْكِير', zh: '劝谕，警示', ja: '思い起こし、忠告' }
      }
    ]
  },
  {
    id: 'root-nwr', icon: '💡',
    names: { en: 'Root: ن-و-ر (light)', bn: 'মূল: ن-و-ر (নূর/আলো)' },
    words: [
      {
        arabic: 'مُنِيرٌ', translit: 'munīr', count: 7, ref: '33:46',
        meanings: { en: 'illuminating, giving light', bn: 'আলো দানকারী, মুনীর', fr: 'illuminant, lumineux', id: 'pemberi cahaya, munir', ur: 'روشن کرنے والا، منیر', tr: 'aydınlatan, nurlu', ar: 'مُضِيءٌ كَالنُّور', zh: '发光的，照耀的', ja: '光を放つ者、ムニール' }
      },
      {
        arabic: 'أَنْوَارٌ', translit: 'anwār', count: 1, ref: '24:40',
        meanings: { en: 'lights (plural)', bn: 'আলোসমূহ, অনওয়ার', fr: 'lumières (pluriel)', id: 'cahaya-cahaya (jamak)', ur: 'انوار، روشنیاں', tr: 'nurlar (çoğul)', ar: 'جَمْعُ نُور', zh: '诸光，众光', ja: '光々、アンワール' }
      },
      {
        arabic: 'تَنْوِيرٌ', translit: 'tanwīr', count: 2, ref: '24:35',
        meanings: { en: 'enlightening, illuminating', bn: 'আলোকদান, প্রদীপন', fr: 'illumination, éclairage', id: 'penerangan, tanwir', ur: 'روشن کرنا، نور پھیلانا', tr: 'aydınlatma, nurlandırma', ar: 'إِضَاءَةٌ وَإِنَارَة', zh: '照明，启示', ja: '照らすこと、啓蒙' }
      }
    ]
  }
];

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { VOCAB_WORDS, VOCAB_THEMES };
}
