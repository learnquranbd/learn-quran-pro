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
    makeExample: function (letterChar) { return letterChar + 'َ'; }
  },
  {
    mark: 'ِ', // kasra
    name: 'كَسْرَة',
    translit: 'Kasra',
    soundSuffix: 'i',
    makeExample: function (letterChar) { return letterChar + 'ِ'; }
  },
  {
    mark: 'ُ', // damma
    name: 'ضَمَّة',
    translit: 'Damma',
    soundSuffix: 'u',
    makeExample: function (letterChar) { return letterChar + 'ُ'; }
  },
  {
    mark: 'ً', // fathatan
    name: 'فَتْحَتَان',
    translit: 'Fathatan',
    soundSuffix: 'an',
    makeExample: function (letterChar) { return letterChar + 'ًا'; } // e.g. بًا
  },
  {
    mark: 'ٍ', // kasratan
    name: 'كَسْرَتَان',
    translit: 'Kasratan',
    soundSuffix: 'in',
    makeExample: function (letterChar) { return letterChar + 'ٍ'; }
  },
  {
    mark: 'ٌ', // dammatan
    name: 'ضَمَّتَان',
    translit: 'Dammatan',
    soundSuffix: 'un',
    makeExample: function (letterChar) { return letterChar + 'ٌ'; }
  },
  {
    mark: 'ْ', // sukoon
    name: 'سُكُون',
    translit: 'Sukoon',
    soundSuffix: '',
    // A resting letter needs a vowel before it: أَبْ (ab)
    makeExample: function (letterChar) { return 'أَ' + letterChar + 'ْ'; }
  },
  {
    mark: 'ّ', // shadda
    name: 'شَدَّة',
    translit: 'Shadda',
    soundSuffix: '',
    // Doubled letter: أَبَّ (abba)
    makeExample: function (letterChar) { return 'أَ' + letterChar + 'َّ'; }
  },
  {
    mark: 'ا', // long alif
    name: 'مَدّ أَلِف',
    translit: 'Madd Alif',
    soundSuffix: 'aa',
    makeExample: function (letterChar) { return letterChar + 'َا'; } // بَا
  },
  {
    mark: 'ي', // long ya
    name: 'مَدّ يَاء',
    translit: 'Madd Ya',
    soundSuffix: 'ii',
    makeExample: function (letterChar) { return letterChar + 'ِي'; } // بِي
  },
  {
    mark: 'و', // long waw
    name: 'مَدّ وَاو',
    translit: 'Madd Waw',
    soundSuffix: 'uu',
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
 * 6 short, authentic everyday duas for kids.
 * arabic: fully-voweled one-line dua, translit, meaning_en, when_en (the occasion).
 */
const KIDS_DUAS = [
  {
    arabic: 'بِسْمِ اللَّهِ',
    translit: 'Bismillah',
    meaning_en: 'In the name of Allah.',
    when_en: 'Before eating'
  },
  {
    arabic: 'الْحَمْدُ لِلَّهِ',
    translit: 'Alhamdulillah',
    meaning_en: 'All praise is for Allah.',
    when_en: 'After eating'
  },
  {
    arabic: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
    translit: 'Bismika-llahumma amutu wa ahya',
    meaning_en: 'In Your name, O Allah, I die and I live.',
    when_en: 'Before sleeping'
  },
  {
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا',
    translit: "Alhamdu lillahil-ladhi ahyana",
    meaning_en: 'All praise is for Allah who gave us life.',
    when_en: 'When waking up'
  },
  {
    arabic: 'رَبِّ زِدْنِي عِلْمًا',
    translit: "Rabbi zidni 'ilma",
    meaning_en: 'My Lord, increase me in knowledge.',
    when_en: 'Before studying'
  },
  {
    arabic: 'بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ',
    translit: "Bismillahi tawakkaltu 'ala-llah",
    meaning_en: 'In the name of Allah, I place my trust in Allah.',
    when_en: 'When leaving home'
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
  module.exports = { QAIDA_LETTERS, QAIDA_HARAKAT, QAIDA_WORDS, KIDS_NUMBERS, KIDS_DUAS, KIDS_SURAHS };
}
