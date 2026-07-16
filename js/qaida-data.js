/**
 * Qaida Data — static learning content for the Kids "Learn to Read Quran" module.
 * Pure data, no DOM. Consumed by js/learn-kids.js.
 */

/**
 * The 28 Arabic letters in traditional order.
 * char: the isolated letter, name: its Arabic name, translit: Latin transliteration.
 */
const QAIDA_LETTERS = [
  { char: 'ا', name: 'أَلِف',  translit: 'Alif'  },
  { char: 'ب', name: 'بَاء',  translit: 'Ba'    },
  { char: 'ت', name: 'تَاء',  translit: 'Ta'    },
  { char: 'ث', name: 'ثَاء',  translit: 'Tha'   },
  { char: 'ج', name: 'جِيم',  translit: 'Jim'   },
  { char: 'ح', name: 'حَاء',  translit: 'Ḥa'    },
  { char: 'خ', name: 'خَاء',  translit: 'Kha'   },
  { char: 'د', name: 'دَال',  translit: 'Dal'   },
  { char: 'ذ', name: 'ذَال',  translit: 'Dhal'  },
  { char: 'ر', name: 'رَاء',  translit: 'Ra'    },
  { char: 'ز', name: 'زَاي',  translit: 'Zay'   },
  { char: 'س', name: 'سِين',  translit: 'Sin'   },
  { char: 'ش', name: 'شِين',  translit: 'Shin'  },
  { char: 'ص', name: 'صَاد',  translit: 'Ṣad'   },
  { char: 'ض', name: 'ضَاد',  translit: 'Ḍad'   },
  { char: 'ط', name: 'طَاء',  translit: 'Ṭa'    },
  { char: 'ظ', name: 'ظَاء',  translit: 'Ẓa'    },
  { char: 'ع', name: 'عَيْن', translit: "'Ayn"  },
  { char: 'غ', name: 'غَيْن', translit: 'Ghayn' },
  { char: 'ف', name: 'فَاء',  translit: 'Fa'    },
  { char: 'ق', name: 'قَاف',  translit: 'Qaf'   },
  { char: 'ك', name: 'كَاف',  translit: 'Kaf'   },
  { char: 'ل', name: 'لَام',  translit: 'Lam'   },
  { char: 'م', name: 'مِيم',  translit: 'Mim'   },
  { char: 'ن', name: 'نُون',  translit: 'Nun'   },
  { char: 'ه', name: 'هَاء',  translit: 'Ha'    },
  { char: 'و', name: 'وَاو',  translit: 'Waw'   },
  { char: 'ي', name: 'يَاء',  translit: 'Ya'    }
];

/**
 * Harakat (short vowels), tanween, sukoon, shadda and long vowels.
 * mark: the combining mark / madd letter, name: Arabic name, translit: Latin name,
 * makeExample(letterChar): the letter combined with the mark for display + TTS,
 * soundSuffix: what the mark adds to the letter's sound (a/i/u/an/in/un/aa/ii/uu).
 */
const QAIDA_HARAKAT = [
  {
    mark: 'َ', // fatha
    name: 'فَتْحَة',
    translit: 'Fatha',
    soundSuffix: 'a',
    makeExample: function (letterChar) { return letterChar + 'َ'; },
    example: { arabic: 'كَتَبَ', translit: 'Kataba', meaning: { en: 'he wrote', bn: 'সে লিখল' } }
  },
  {
    mark: 'ِ', // kasra
    name: 'كَسْرَة',
    translit: 'Kasra',
    soundSuffix: 'i',
    makeExample: function (letterChar) { return letterChar + 'ِ'; },
    example: { arabic: 'بِنْت', translit: 'Bint', meaning: { en: 'girl', bn: 'মেয়ে' } }
  },
  {
    mark: 'ُ', // damma
    name: 'ضَمَّة',
    translit: 'Damma',
    soundSuffix: 'u',
    makeExample: function (letterChar) { return letterChar + 'ُ'; },
    example: { arabic: 'كُتُب', translit: 'Kutub', meaning: { en: 'books', bn: 'বইসমূহ' } }
  },
  {
    mark: 'ً', // fathatan
    name: 'فَتْحَتَان',
    translit: 'Fathatan',
    soundSuffix: 'an',
    makeExample: function (letterChar) { return letterChar + 'ًا'; }, // e.g. بًا
    example: { arabic: 'عَلِيمًا', translit: "'Aliman", meaning: { en: 'all-knowing', bn: 'সর্বজ্ঞ' } }
  },
  {
    mark: 'ٍ', // kasratan
    name: 'كَسْرَتَان',
    translit: 'Kasratan',
    soundSuffix: 'in',
    makeExample: function (letterChar) { return letterChar + 'ٍ'; },
    example: { arabic: 'عَلِيمٍ', translit: "'Alimin", meaning: { en: 'all-knowing', bn: 'সর্বজ্ঞ' } }
  },
  {
    mark: 'ٌ', // dammatan
    name: 'ضَمَّتَان',
    translit: 'Dammatan',
    soundSuffix: 'un',
    makeExample: function (letterChar) { return letterChar + 'ٌ'; },
    example: { arabic: 'عَلِيمٌ', translit: "'Alimun", meaning: { en: 'all-knowing', bn: 'সর্বজ্ঞ' } }
  },
  {
    mark: 'ْ', // sukoon
    name: 'سُكُون',
    translit: 'Sukoon',
    soundSuffix: '',
    // A resting letter needs a vowel before it: أَبْ (ab)
    makeExample: function (letterChar) { return 'أَ' + letterChar + 'ْ'; },
    example: { arabic: 'قُلْ', translit: 'Qul', meaning: { en: 'say', bn: 'বলো' } }
  },
  {
    mark: 'ّ', // shadda
    name: 'شَدَّة',
    translit: 'Shadda',
    soundSuffix: '',
    example: { arabic: 'رَبّ', translit: 'Rabb', meaning: { en: 'Lord', bn: 'প্রভু' } },
    // Doubled letter: أَبَّ (abba)
    makeExample: function (letterChar) { return 'أَ' + letterChar + 'َّ'; }
  },
  {
    mark: 'ا', // long alif
    name: 'مَدّ أَلِف',
    translit: 'Madd Alif',
    soundSuffix: 'aa',
    example: { arabic: 'قَالَ', translit: 'Qala', meaning: { en: 'he said', bn: 'সে বলল' } },
    makeExample: function (letterChar) { return letterChar + 'َا'; } // بَا
  },
  {
    mark: 'ي', // long ya
    name: 'مَدّ يَاء',
    translit: 'Madd Ya',
    soundSuffix: 'ii',
    example: { arabic: 'قِيلَ', translit: 'Qila', meaning: { en: 'it was said', bn: 'বলা হলো' } },
    makeExample: function (letterChar) { return letterChar + 'ِي'; } // بِي
  },
  {
    mark: 'و', // long waw
    name: 'مَدّ وَاو',
    translit: 'Madd Waw',
    soundSuffix: 'uu',
    example: { arabic: 'نُور', translit: 'Nur', meaning: { en: 'light', bn: 'আলো' } },
    makeExample: function (letterChar) { return letterChar + 'ُو'; } // بُو
  }
];

/**
 * 12 short, fully-voweled Quranic words for first reading practice.
 */
const QAIDA_WORDS = [
  { arabic: 'بِسْمِ',    translit: 'Bismi'   },
  { arabic: 'رَبِّ',     translit: 'Rabbi'   },
  { arabic: 'نُورٌ',     translit: 'Nurun'   },
  { arabic: 'قُلْ',      translit: 'Qul'     },
  { arabic: 'كِتَابٌ',   translit: 'Kitabun' },
  { arabic: 'قَمَرٌ',    translit: 'Qamarun' },
  { arabic: 'شَمْسٌ',    translit: 'Shamsun' },
  { arabic: 'يَوْمٌ',    translit: 'Yawmun'  },
  { arabic: 'جَنَّةٌ',   translit: 'Jannatun' },
  { arabic: 'سَلَامٌ',   translit: 'Salamun' },
  { arabic: 'عَيْنٌ',    translit: "'Aynun"  },
  { arabic: 'بَابٌ',     translit: 'Babun'   },
  // --- ~28 additional simple, fully-voweled words for early readers ---
  { arabic: 'أَب',       translit: 'Ab'      },
  { arabic: 'أُمّ',       translit: 'Umm'     },
  { arabic: 'مَاء',      translit: "Ma'"     },
  { arabic: 'نَار',      translit: 'Nar'     },
  { arabic: 'نُور',      translit: 'Nur'     },
  { arabic: 'عَبْد',     translit: "'Abd"    },
  { arabic: 'خَيْر',     translit: 'Khayr'   },
  { arabic: 'حُبّ',      translit: 'Hubb'    },
  { arabic: 'قَلْب',     translit: 'Qalb'    },
  { arabic: 'عَيْن',     translit: "'Ayn"    },
  { arabic: 'يَد',       translit: 'Yad'     },
  { arabic: 'دَار',      translit: 'Dar'     },
  { arabic: 'بَحْر',     translit: 'Bahr'    },
  { arabic: 'جَبَل',     translit: 'Jabal'   },
  { arabic: 'طَيْر',     translit: 'Tayr'    },
  { arabic: 'وَرْد',     translit: 'Ward'    },
  { arabic: 'لَيْل',     translit: 'Layl'    },
  { arabic: 'نَهَار',    translit: 'Nahar'   },
  { arabic: 'مَلِك',     translit: 'Malik'   },
  { arabic: 'كَلْب',     translit: 'Kalb'    },
  { arabic: 'سَمَك',     translit: 'Samak'   },
  { arabic: 'شَجَر',     translit: 'Shajar'  },
  { arabic: 'بَاب',      translit: 'Bab'     },
  { arabic: 'بَيْت',     translit: 'Bayt'    },
  { arabic: 'أَرْض',     translit: 'Ard'     },
  { arabic: 'سَمَاء',    translit: "Sama'"   },
  { arabic: 'رَحْمَة',   translit: 'Rahmah'  },
  { arabic: 'سَلَام',    translit: 'Salam'   }
];

/**
 * Themed Quranic vocabulary for kids ("Word Fun" section).
 * Every word is a real Quran word verified against data/quran-tokens.json:
 * ref = a verse where it occurs, hl = the exact diacritized token from
 * data/quran-words.json at that verse (used to highlight it in the ayah modal).
 * arabic = simple fully-voweled teaching form; meaning is inline-bilingual
 * ({en, bn}) following the KIDS_DUA_L10N render pattern (m[lang] || m.en).
 */
const KIDS_THEME_WORDS = [
  {
    id: 'animals',
    emoji: '🐾',
    label: { en: 'Animals', bn: 'প্রাণী' },
    words: [
      { arabic: 'بَقَرَة',    translit: 'Baqarah',   emoji: '🐄',  meaning: { en: 'Cow',            bn: 'গরু' },            ref: '2:67',   hl: 'بَقَرَةً' },
      { arabic: 'فِيل',       translit: 'Fil',       emoji: '🐘',  meaning: { en: 'Elephant',       bn: 'হাতি' },           ref: '105:1',  hl: 'ٱلْفِيلِ' },
      { arabic: 'حُوت',       translit: 'Hut',       emoji: '🐋',  meaning: { en: 'Big fish (whale)', bn: 'বড় মাছ (তিমি)' }, ref: '37:142', hl: 'ٱلْحُوتُ' },
      { arabic: 'كَلْب',      translit: 'Kalb',      emoji: '🐕',  meaning: { en: 'Dog',            bn: 'কুকুর' },          ref: '18:18',  hl: 'وَكَلْبُهُم' },
      { arabic: 'غُرَاب',     translit: 'Ghurab',    emoji: '🐦‍⬛', meaning: { en: 'Crow',           bn: 'কাক' },            ref: '5:31',   hl: 'غُرَابًا' },
      { arabic: 'نَحْل',      translit: 'Nahl',      emoji: '🐝',  meaning: { en: 'Bee',            bn: 'মৌমাছি' },         ref: '16:68',  hl: 'ٱلنَّحْلِ' },
      { arabic: 'نَمْل',      translit: 'Naml',      emoji: '🐜',  meaning: { en: 'Ants',           bn: 'পিঁপড়া' },         ref: '27:18',  hl: 'ٱلنَّمْلِ' },
      { arabic: 'عَنْكَبُوت', translit: "'Ankabut",  emoji: '🕷️', meaning: { en: 'Spider',         bn: 'মাকড়সা' },         ref: '29:41',  hl: 'ٱلْعَنكَبُوتِ' },
      { arabic: 'ذِئْب',      translit: 'Dhib',      emoji: '🐺',  meaning: { en: 'Wolf',           bn: 'নেকড়ে' },          ref: '12:13',  hl: 'ٱلذِّئْبُ' },
      { arabic: 'هُدْهُد',    translit: 'Hudhud',    emoji: '🐦',  meaning: { en: 'Hoopoe bird',    bn: 'হুদহুদ পাখি' },     ref: '27:20',  hl: 'ٱلْهُدْهُدَ' }
    ]
  },
  {
    id: 'nature',
    emoji: '🌿',
    label: { en: 'Nature', bn: 'প্রকৃতি' },
    words: [
      { arabic: 'شَمْس',     translit: 'Shams',     emoji: '☀️',  meaning: { en: 'Sun',            bn: 'সূর্য' },           ref: '91:1',   hl: 'وَٱلشَّمْسِ' },
      { arabic: 'قَمَر',     translit: 'Qamar',     emoji: '🌙',  meaning: { en: 'Moon',           bn: 'চাঁদ' },            ref: '91:2',   hl: 'وَٱلْقَمَرِ' },
      { arabic: 'نَجْم',     translit: 'Najm',      emoji: '⭐',  meaning: { en: 'Star',           bn: 'তারা' },            ref: '53:1',   hl: 'وَٱلنَّجْمِ' },
      { arabic: 'بَحْر',     translit: 'Bahr',      emoji: '🌊',  meaning: { en: 'Sea',            bn: 'সমুদ্র' },          ref: '18:109', hl: 'ٱلْبَحْرُ' },
      { arabic: 'جِبَال',    translit: 'Jibal',     emoji: '⛰️',  meaning: { en: 'Mountains',      bn: 'পাহাড়' },           ref: '88:19',  hl: 'ٱلْجِبَالِ' },
      { arabic: 'مَاء',      translit: "Ma'",       emoji: '💧',  meaning: { en: 'Water',          bn: 'পানি' },            ref: '2:22',   hl: 'مَآءً' },
      { arabic: 'شَجَرَة',   translit: 'Shajarah',  emoji: '🌳',  meaning: { en: 'Tree',           bn: 'গাছ' },             ref: '2:35',   hl: 'ٱلشَّجَرَةَ' },
      { arabic: 'نَخْل',     translit: 'Nakhl',     emoji: '🌴',  meaning: { en: 'Date palm',      bn: 'খেজুর গাছ' },       ref: '55:68',  hl: 'وَنَخْلٌ' },
      { arabic: 'عِنَب',     translit: "'Inab",     emoji: '🍇',  meaning: { en: 'Grapes',         bn: 'আঙুর' },            ref: '80:28',  hl: 'وَعِنَبًا' },
      { arabic: 'زَيْتُون',  translit: 'Zaytun',    emoji: '🫒',  meaning: { en: 'Olive',          bn: 'জলপাই' },           ref: '95:1',   hl: 'وَٱلزَّيْتُونِ' }
    ]
  },
  {
    id: 'family',
    emoji: '👨‍👩‍👧‍👦',
    label: { en: 'Family', bn: 'পরিবার' },
    words: [
      { arabic: 'أَب',         translit: 'Ab',        emoji: '👨',       meaning: { en: 'Father',   bn: 'বাবা' },     ref: '12:78', hl: 'أَبًا' },
      { arabic: 'أُمّ',         translit: 'Umm',       emoji: '👩',       meaning: { en: 'Mother',   bn: 'মা' },       ref: '28:7',  hl: 'أُمِّ' },
      { arabic: 'أَخ',         translit: 'Akh',       emoji: '👦',       meaning: { en: 'Brother',  bn: 'ভাই' },      ref: '4:12',  hl: 'أَخٌ' },
      { arabic: 'أُخْت',       translit: 'Ukht',      emoji: '👧',       meaning: { en: 'Sister',   bn: 'বোন' },      ref: '4:12',  hl: 'أُخْتٌ' },
      { arabic: 'وَالِدَيْن',  translit: 'Walidayn',  emoji: '👨‍👩‍👧',    meaning: { en: 'Parents',  bn: 'বাবা-মা' },  ref: '4:36',  hl: 'وَبِٱلْوَٰلِدَيْنِ' },
      { arabic: 'أَهْل',       translit: 'Ahl',       emoji: '🏠',       meaning: { en: 'Family',   bn: 'পরিবার' },   ref: '20:29', hl: 'أَهْلِى' }
    ]
  },
  {
    id: 'colors',
    emoji: '🎨',
    label: { en: 'Colours', bn: 'রং' },
    words: [
      { arabic: 'أَبْيَض',   translit: 'Abyad',    emoji: '⚪', meaning: { en: 'White',            bn: 'সাদা' },           ref: '2:187', hl: 'ٱلْأَبْيَضُ' },
      { arabic: 'أَسْوَد',   translit: 'Aswad',    emoji: '⚫', meaning: { en: 'Black',            bn: 'কালো' },           ref: '2:187', hl: 'ٱلْأَسْوَدِ' },
      { arabic: 'أَخْضَر',   translit: 'Akhdar',   emoji: '🟢', meaning: { en: 'Green',            bn: 'সবুজ' },           ref: '36:80', hl: 'ٱلْأَخْضَرِ' },
      { arabic: 'صَفْرَاء',  translit: "Safra'",   emoji: '🟡', meaning: { en: 'Yellow',           bn: 'হলুদ' },           ref: '2:69',  hl: 'صَفْرَآءُ' },
      { arabic: 'حُمْر',     translit: 'Humr',     emoji: '🔴', meaning: { en: 'Red (streaks)',    bn: 'লাল' },            ref: '35:27', hl: 'وَحُمْرٌ' },
      { arabic: 'وَرْدَة',   translit: 'Wardah',   emoji: '🌹', meaning: { en: 'Rose (rosy pink)', bn: 'গোলাপ (গোলাপি)' }, ref: '55:37', hl: 'وَرْدَةً' }
    ]
  }
];

/**
 * Arabic numbers 1–10: Eastern-Arabic digit, numeric value, fully-voweled word, transliteration.
 */
const KIDS_NUMBERS = [
  { digit: '١',  value: 1,  word: 'وَاحِد',      translit: 'Wahid'      },
  { digit: '٢',  value: 2,  word: 'اِثْنَان',    translit: 'Ithnan'     },
  { digit: '٣',  value: 3,  word: 'ثَلَاثَة',    translit: 'Thalathah'  },
  { digit: '٤',  value: 4,  word: 'أَرْبَعَة',   translit: "Arba'ah"    },
  { digit: '٥',  value: 5,  word: 'خَمْسَة',     translit: 'Khamsah'    },
  { digit: '٦',  value: 6,  word: 'سِتَّة',      translit: 'Sittah'     },
  { digit: '٧',  value: 7,  word: 'سَبْعَة',     translit: "Sab'ah"     },
  { digit: '٨',  value: 8,  word: 'ثَمَانِيَة',  translit: 'Thamaniyah' },
  { digit: '٩',  value: 9,  word: 'تِسْعَة',     translit: "Tis'ah"     },
  { digit: '١٠', value: 10, word: 'عَشَرَة',     translit: "'Asharah"   }
];

/**
 * 12 short, authentic everyday duas for kids.
 * arabic: fully-voweled one-line dua, translit, meaning_en, when_en (the occasion),
 * src: source reference (Quran ayah or well-known sahih hadith collection + number).
 */
const KIDS_DUAS = [
  {
    arabic: 'بِسْمِ اللَّهِ',
    translit: 'Bismillah',
    meaning_en: 'In the name of Allah.',
    when_en: 'Before eating',
    src: 'Bukhari 5376'
  },
  {
    arabic: 'الْحَمْدُ لِلَّهِ',
    translit: 'Alhamdulillah',
    meaning_en: 'All praise is for Allah.',
    when_en: 'After eating',
    src: 'Muslim 2734'
  },
  {
    arabic: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
    translit: 'Bismika-llahumma amutu wa ahya',
    meaning_en: 'In Your name, O Allah, I die and I live.',
    when_en: 'Before sleeping',
    src: 'Bukhari 6324'
  },
  {
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا',
    translit: "Alhamdu lillahil-ladhi ahyana",
    meaning_en: 'All praise is for Allah who gave us life.',
    when_en: 'When waking up',
    src: 'Bukhari 6324'
  },
  {
    arabic: 'رَبِّ زِدْنِي عِلْمًا',
    translit: "Rabbi zidni 'ilma",
    meaning_en: 'My Lord, increase me in knowledge.',
    when_en: 'Before studying',
    src: 'Quran 20:114'
  },
  {
    arabic: 'بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ',
    translit: "Bismillahi tawakkaltu 'ala-llah",
    meaning_en: 'In the name of Allah, I place my trust in Allah.',
    when_en: 'When leaving home',
    src: 'Abu Dawud 5095'
  },
  {
    arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ',
    translit: "Allahumma inni a'udhu bika minal-khubuthi wal-khaba'ith",
    meaning_en: 'O Allah, I seek Your protection from all evil and impure things.',
    when_en: 'Before entering the toilet',
    src: 'Bukhari 142, Muslim 375'
  },
  {
    arabic: 'غُفْرَانَكَ',
    translit: 'Ghufranak',
    meaning_en: 'I ask for Your forgiveness.',
    when_en: 'After leaving the toilet',
    src: 'Abu Dawud 30, Tirmidhi 7'
  },
  {
    arabic: 'الْحَمْدُ لِلَّهِ',
    translit: 'Alhamdulillah',
    meaning_en: 'All praise is for Allah.',
    when_en: 'After sneezing',
    src: 'Bukhari 6224'
  },
  {
    arabic: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ',
    translit: 'Subhanal-ladhi sakhkhara lana hadha wa ma kunna lahu muqrinin',
    meaning_en: 'Glory to Him who has placed this at our service; we could never have done it by ourselves.',
    when_en: 'When riding a car or bus',
    src: 'Quran 43:13'
  },
  {
    arabic: 'رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا',
    translit: 'Rabbi-rhamhuma kama rabbayani saghira',
    meaning_en: 'My Lord, have mercy on my parents as they raised me when I was little.',
    when_en: 'Praying for parents',
    src: 'Quran 17:24'
  },
  {
    arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    translit: "Rabbana atina fid-dunya hasanah wa fil-akhirati hasanah wa qina 'adhaban-nar",
    meaning_en: 'Our Lord, give us good in this world and good in the Hereafter, and protect us from the punishment of the Fire.',
    when_en: 'Any time — a complete dua',
    src: 'Quran 2:201'
  }
];

/**
 * The 6 Kalimas — standard basic-aqeedah texts children memorize.
 * name_en: traditional name, arabic: fully-voweled text, translit, meaning_en,
 * src (optional): hadith reference where the wording itself is hadith-attested.
 * Bengali names/meanings live in KIDS_KALIMA_L10N (js/learn-kids.js).
 */
const KIDS_KALIMAS = [
  {
    name_en: '1st Kalima — Tayyibah (Purity)',
    arabic: 'لَا إِلَٰهَ إِلَّا اللَّهُ مُحَمَّدٌ رَسُولُ اللَّهِ',
    translit: 'La ilaha illallahu Muhammadur-rasulullah',
    meaning_en: 'There is no god but Allah; Muhammad is the Messenger of Allah.'
  },
  {
    name_en: '2nd Kalima — Shahadat (Testimony)',
    arabic: 'أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
    translit: "Ash-hadu an la ilaha illallahu wa ash-hadu anna Muhammadan 'abduhu wa rasuluh",
    meaning_en: 'I bear witness that there is no god but Allah, and I bear witness that Muhammad is His servant and His Messenger.'
  },
  {
    name_en: '3rd Kalima — Tamjeed (Glorification)',
    arabic: 'سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلَٰهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ الْعَلِيِّ الْعَظِيمِ',
    translit: "Subhanallahi wal-hamdu lillahi wa la ilaha illallahu wallahu akbar, wa la hawla wa la quwwata illa billahil-'aliyyil-'azim",
    meaning_en: 'Glory be to Allah, all praise is for Allah, there is no god but Allah, and Allah is the Greatest. There is no power and no strength except with Allah, the Most High, the Most Great.'
  },
  {
    name_en: '4th Kalima — Tawheed (Oneness)',
    arabic: 'لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ',
    translit: "La ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu wa huwa 'ala kulli shay'in qadir",
    meaning_en: 'There is no god but Allah, alone, without partner. His is the kingdom and His is all praise, and He has power over everything.',
    src: 'Bukhari 6404'
  },
  {
    name_en: '5th Kalima — Astaghfar (Seeking Forgiveness)',
    arabic: 'أَسْتَغْفِرُ اللَّهَ رَبِّي مِنْ كُلِّ ذَنْبٍ أَذْنَبْتُهُ عَمَدًا أَوْ خَطَأً سِرًّا أَوْ عَلَانِيَةً وَأَتُوبُ إِلَيْهِ مِنَ الذَّنْبِ الَّذِي أَعْلَمُ وَمِنَ الذَّنْبِ الَّذِي لَا أَعْلَمُ إِنَّكَ أَنْتَ عَلَّامُ الْغُيُوبِ وَسَتَّارُ الْعُيُوبِ وَغَفَّارُ الذُّنُوبِ وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ الْعَلِيِّ الْعَظِيمِ',
    translit: "Astaghfirullaha rabbi min kulli dhambin adhnabtuhu 'amadan aw khata'an sirran aw 'alaniyah, wa atubu ilayhi minadh-dhambil-ladhi a'lamu wa minadh-dhambil-ladhi la a'lam, innaka anta 'allamul-ghuyubi wa sattarul-'uyubi wa ghaffarudh-dhunub, wa la hawla wa la quwwata illa billahil-'aliyyil-'azim",
    meaning_en: 'I seek forgiveness from Allah, my Lord, for every sin I committed knowingly or by mistake, secretly or openly, and I turn to Him from the sin I know and the sin I do not know. Surely You are the Knower of the hidden, the Concealer of faults and the Forgiver of sins, and there is no power and no strength except with Allah, the Most High, the Most Great.'
  },
  {
    name_en: '6th Kalima — Radd-e-Kufr (Rejecting Disbelief)',
    arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ أَنْ أُشْرِكَ بِكَ شَيْئًا وَأَنَا أَعْلَمُ بِهِ وَأَسْتَغْفِرُكَ لِمَا لَا أَعْلَمُ بِهِ تُبْتُ عَنْهُ وَتَبَرَّأْتُ مِنَ الْكُفْرِ وَالشِّرْكِ وَالْكِذْبِ وَالْغِيبَةِ وَالْبِدْعَةِ وَالنَّمِيمَةِ وَالْفَوَاحِشِ وَالْبُهْتَانِ وَالْمَعَاصِي كُلِّهَا وَأَسْلَمْتُ وَأَقُولُ لَا إِلَٰهَ إِلَّا اللَّهُ مُحَمَّدٌ رَسُولُ اللَّهِ',
    translit: "Allahumma inni a'udhu bika min an ushrika bika shay'an wa ana a'lamu bih, wa astaghfiruka lima la a'lamu bih, tubtu 'anhu wa tabarra'tu minal-kufri wash-shirki wal-kidhbi wal-ghibati wal-bid'ati wan-namimati wal-fawahishi wal-buhtani wal-ma'asi kulliha, wa aslamtu wa aqulu la ilaha illallahu Muhammadur-rasulullah",
    meaning_en: 'O Allah, I seek refuge in You from knowingly associating anything with You, and I ask Your forgiveness for what I do not know. I repent from it and free myself from disbelief, from associating partners with Allah, from lying, backbiting, innovation, tale-carrying, shameful deeds, false accusation and all sins. I submit, and I say: there is no god but Allah; Muhammad is the Messenger of Allah.'
  }
];

/**
 * Short surahs offered for guided reading. Text + per-word audio pulled at runtime
 * via QuranData.fetchRange(). n: surah number, versesTo: ayah count.
 */
const KIDS_SURAHS = [
  { n: 1,   versesTo: 7 },
  { n: 103, versesTo: 3 },
  { n: 108, versesTo: 3 },
  { n: 110, versesTo: 3 },
  { n: 112, versesTo: 4 },
  { n: 113, versesTo: 5 },
  { n: 114, versesTo: 6 },
  { n: 107, versesTo: 7 },
  { n: 105, versesTo: 5 },
  { n: 106, versesTo: 4 },
  { n: 109, versesTo: 6 },
  { n: 111, versesTo: 5 }
];

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { QAIDA_LETTERS, QAIDA_HARAKAT, QAIDA_WORDS, KIDS_THEME_WORDS, KIDS_NUMBERS, KIDS_DUAS, KIDS_KALIMAS, KIDS_SURAHS };
}
