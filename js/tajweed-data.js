/**
 * Tajweed — DATA MODULE
 * Extracted from js/tajweed-learn.js.
 * Globals: TAJWEED_LESSONS, TAJWEED_PATH, MAKHARIJ_ZONES, NOON_SAKINAH_RULES,
 *   MEEM_SAKINAH_RULES, TAJWEED_MISTAKES, TAJWEED_RESOURCES, TAJWEED_RULE_EXAMPLES.
 * Loaded BEFORE js/tajweed-learn.js in index.html.
 */

const TAJWEED_LESSONS = {
  ghunnah: { group: 'core', names: { bn: 'গুন্নাহ', ar: 'الغنّة', zh: '鼻音', ja: 'グンナ' }, letters: 'نّ مّ',
    en: 'Nasalisation: hold a nasal sound for 2 counts on a doubled noon or meem (نّ / مّ).',
    bn: 'গুন্নাহ: নূন বা মীম মুশাদ্দাদ (نّ / مّ)-এ ২ হরকত পরিমাণ নাকি সুরে টান।' },
  qalqalah: { group: 'core', names: { bn: 'কলকলা', ar: 'القلقلة', zh: '回弹', ja: 'カルカラ' }, letters: 'ق ط ب ج د',
    en: 'Echo/bounce: the letters ق ط ب ج د get a slight bounce when bearing sukoon (strongest when stopping).',
    bn: 'কলকলা: ق ط ب ج د অক্ষরে সাকিন হলে হালকা প্রতিধ্বনি — থামলে সবচেয়ে জোরালো।' },
  ikhfa: { group: 'noon', names: { bn: 'ইখফা', ar: 'الإخفاء', zh: '隐藏', ja: 'イフファー' }, letters: 'ت ث ج د ذ ز س ش ص ض ط ظ ف ق ك',
    en: 'Hiding: noon sakinah/tanween before these 15 letters is pronounced lightly hidden with ghunnah.',
    bn: 'ইখফা: নূন সাকিন/তানউইনের পরে এই ১৫টি অক্ষর এলে গুন্নাহসহ গোপনভাবে উচ্চারণ।' },
  iqlab: { group: 'noon', names: { bn: 'ইকলাব', ar: 'الإقلاب', zh: '转换', ja: 'イクラーブ' }, letters: 'ب',
    en: 'Conversion: noon sakinah/tanween before ب converts to a hidden meem sound with ghunnah.',
    bn: 'ইকলাব: নূন সাকিন/তানউইনের পরে ب এলে তা মীমের ধ্বনিতে বদলে যায়, গুন্নাহসহ।' },
  idghaam_ghunnah: { group: 'noon', names: { bn: 'ইদগাম (গুন্নাহসহ)', ar: 'الإدغام بغنّة', zh: '带鼻音合并', ja: 'グンナ付きイドガーム' }, letters: 'ي ن م و',
    en: 'Merging with ghunnah: noon sakinah/tanween merges into ي ن م و, keeping the nasal sound.',
    bn: 'ইদগাম (গুন্নাহসহ): নূন সাকিন/তানউইন ي ن م و-তে মিশে যায়, গুন্নাহ বজায় থাকে।' },
  idghaam_no_ghunnah: { group: 'noon', names: { bn: 'ইদগাম (গুন্নাহ ছাড়া)', ar: 'الإدغام بغير غنّة', zh: '无鼻音合并', ja: 'グンナ無しイドガーム' }, letters: 'ل ر',
    en: 'Merging without ghunnah: noon sakinah/tanween merges completely into ل or ر.',
    bn: 'ইদগাম (গুন্নাহ ছাড়া): নূন সাকিন/তানউইন ل বা ر-তে সম্পূর্ণ মিশে যায়।' },
  ikhfa_shafawi: { group: 'meem', names: { bn: 'ইখফা শাফাবি', ar: 'الإخفاء الشفوي', zh: '唇部隐藏', ja: 'イフファー・シャファウィー' }, letters: 'ب',
    en: 'Labial hiding: meem sakinah before ب is lightly hidden with ghunnah on the lips.',
    bn: 'ইখফা শাফাবি: মীম সাকিনের পরে ب এলে ঠোঁটে গুন্নাহসহ গোপন উচ্চারণ।' },
  idghaam_shafawi: { group: 'meem', names: { bn: 'ইদগাম শাফাবি', ar: 'الإدغام الشفوي', zh: '唇部合并', ja: 'イドガーム・シャファウィー' }, letters: 'م',
    en: 'Labial merging: meem sakinah merges into a following م with ghunnah.',
    bn: 'ইদগাম শাফাবি: মীম সাকিন পরবর্তী م-এ গুন্নাহসহ মিশে যায়।' },
  madd_2: { group: 'madd', names: { bn: 'মাদ্দ তবিয়ি (২)', ar: 'المد الطبيعي (2)', zh: '自然长音 (2)', ja: 'マッド・タビーイー (2)' }, letters: 'ا و ي',
    en: 'Natural prolongation: stretch the madd letter exactly 2 counts.',
    bn: 'মাদ্দ তবিয়ি: মাদ্দের অক্ষর ঠিক ২ হরকত টানুন।' },
  madd_246: { group: 'madd', names: { bn: 'মাদ্দ (২/৪/৬)', ar: 'المد (2/4/6)', zh: '弹性长音 (2/4/6)', ja: 'マッド (2/4/6)' }, letters: 'ا و ي',
    en: 'Flexible madd (e.g. when stopping): may be stretched 2, 4 or 6 counts.',
    bn: 'মাদ্দ (২/৪/৬): থামার সময় ইত্যাদিতে ২, ৪ বা ৬ হরকত টানা যায়।' },
  madd_munfasil: { group: 'madd', names: { bn: 'মাদ্দ মুনফাসিল (৪-৫)', ar: 'المد المنفصل (4-5)', zh: '分离长音 (4-5)', ja: 'マッド・ムンファシル (4-5)' }, letters: 'ا و ي + ء',
    en: 'Separated madd: madd letter ends a word and hamza starts the next — stretch 4–5 counts.',
    bn: 'মাদ্দ মুনফাসিল: এক শব্দের শেষে মাদ্দ, পরের শব্দের শুরুতে হামযা — ৪–৫ হরকত।' },
  madd_muttasil: { group: 'madd', names: { bn: 'মাদ্দ মুত্তাসিল (৪-৫)', ar: 'المد المتصل (4-5)', zh: '连接长音 (4-5)', ja: 'マッド・ムッタシル (4-5)' }, letters: 'ا و ي + ء',
    en: 'Connected madd: madd letter and hamza in the SAME word — stretch 4–5 counts (obligatory).',
    bn: 'মাদ্দ মুত্তাসিল: একই শব্দে মাদ্দ ও হামযা — ৪–৫ হরকত (ওয়াজিব)।' },
  madd_6: { group: 'madd', names: { bn: 'মাদ্দ লাযিম (৬)', ar: 'المد اللازم (6)', zh: '必须长音 (6)', ja: 'マッド・ラージム (6)' }, letters: 'ا و ي',
    en: 'Madd Lazim: the heaviest madd — always stretch 6 counts.',
    bn: 'মাদ্দ লাযিম: সবচেয়ে দীর্ঘ মাদ্দ — সর্বদা ৬ হরকত।' },
  idghaam_mutajanisayn: { group: 'other', names: { bn: 'ইদগাম মুতাজানিসাইন', ar: 'إدغام المتجانسين', zh: '同部位合并', ja: 'イドガーム・ムタジャーニサイン' }, letters: 'ت/ط ث/ذ …',
    en: 'Merging of two letters sharing the same articulation point but differing in attributes (e.g. ت into ط).',
    bn: 'ইদগাম মুতাজানিসাইন: একই মাখরাজের দুটি ভিন্ন বৈশিষ্ট্যের অক্ষরের মিলন (যেমন ت → ط)।' },
  idghaam_mutaqaribayn: { group: 'other', names: { bn: 'ইদগাম মুতাকারিবাইন', ar: 'إدغام المتقاربين', zh: '近部位合并', ja: 'イドガーム・ムタカリバイン' }, letters: 'ق/ك ل/ر …',
    en: 'Merging of two letters with CLOSE articulation points (e.g. ق into ك).',
    bn: 'ইদগাম মুতাকারিবাইন: কাছাকাছি মাখরাজের দুটি অক্ষরের মিলন (যেমন ق → ك)।' },
  hamzat_wasl: { group: 'other', names: { bn: 'হামযাতুল ওয়াসল', ar: 'همزة الوصل', zh: '连接性哈姆扎', ja: 'ハムザトゥル＝ワスル' }, letters: 'ٱ',
    en: 'Connecting hamza: pronounced only when you START at it; silent when you continue through.',
    bn: 'হামযাতুল ওয়াসল: শুরু করলে উচ্চারিত হয়; মাঝখানে পড়লে নীরব।' },
  lam_shamsiyyah: { group: 'other', names: { bn: 'লাম শামসিয়্যাহ', ar: 'اللام الشمسية', zh: '太阳字母的لام', ja: 'ラーム・シャムスィッヤ' }, letters: 'ال', lettersExtraKey: 'tj_sun_letters',
    en: 'Sun lam: the ل of ال is silent and assimilates into the following "sun letter" (which doubles).',
    bn: 'লাম শামসিয়্যাহ: ال-এর লাম নীরব হয়ে পরবর্তী "সূর্য অক্ষরে" মিশে যায় (সেটি দ্বিগুণ হয়)।' },
  silent: { group: 'other', names: { bn: 'নীরব অক্ষর', ar: 'حرف صامت', zh: '静音字母', ja: '無音文字' }, letters: '—',
    en: 'Silent letter: written in the script but not pronounced.',
    bn: 'নীরব অক্ষর: লেখা থাকলেও উচ্চারিত হয় না।' },

  // ── Noon Sākinah: Iẓhār — the two clear-pronunciation rulings ────────────
  izhar_halqi: { group: 'noon', names: { bn: 'ইযহার হালকি', ar: 'الإظهار الحلقي' }, letters: 'ء هـ ع ح غ خ',
    en: 'Clear pronunciation: noon sakinah/tanween before the six throat letters is pronounced clearly with no ghunnah and no merging.',
    bn: 'ইযহার হালকি: নূন সাকিন/তানউইনের পরে ছয়টি গলার হরফ এলে গুন্নাহ বা মিলন ছাড়াই স্পষ্ট উচ্চারণ।' },
  izhar_mutlaq: { group: 'noon', names: { bn: 'ইযহার মুতলাক', ar: 'الإظهار المطلق' }, letters: 'ي و ن م',
    en: 'Absolute clarity: noon sakinah followed by ي, و, م or ن within the SAME word is always clear — never merged (e.g. دُنْيَا, بُنْيَان, صِنْوَان).',
    bn: 'ইযহার মুতলাক: একই শব্দে নূন সাকিনের পরে ي، و، م বা ن এলে সর্বদা স্পষ্ট উচ্চারণ — কোনো মিলন নেই (যেমন دُنْيَا, بُنْيَان)।' },

  // ── Madd al-Far'ī: derived/secondary madd types ──────────────────────────
  madd_aridh: { group: 'madd', names: { bn: 'মাদ্দ আরিদ লিস-সুকুন (২/৪/৬)', ar: 'المد العارض للسكون (2/4/6)' }, letters: 'ا و ي',
    en: "Madd 'Āridh li-Sukoon: stopping at a verse end makes the letter after the madd temporarily silent — stretch 2, 4 or 6 counts. Choose one length and keep it consistent throughout the recitation.",
    bn: 'মাদ্দ আরিদ লিস-সুকুন: আয়াতের শেষে থামার কারণে মাদ্দ হরফের পরের হরফ সাময়িক সাকিন হলে ২, ৪ বা ৬ হরকত — একটি বেছে নিন ও সারা তিলাওয়াতে ধারাবাহিক রাখুন।' },
  madd_lin: { group: 'madd', names: { bn: 'মাদ্দ লিন (২/৪/৬)', ar: 'مد اللين (2/4/6)' }, letters: 'وْ يْ',
    en: "Madd al-Līn: و or ي bearing sukoon, preceded by fathah — the soft 'liin' sound heard when stopping (e.g. خَوْف, بَيْت, رَيْب). Stretch 2, 4 or 6 counts at a waqf.",
    bn: 'মাদ্দ লিন: ফাতহার পরে সুকুনসহ و বা ي — থামার সময় শোনা যায় এই কোমল মাদ্দ (যেমন خَوْف, بَيْت, رَيْب)। ওয়াকফে ২, ৪ বা ৬ হরকত।' },
  madd_badal: { group: 'madd', names: { bn: 'মাদ্দ বদল (২)', ar: 'مد البدل (2)' }, letters: 'ء + ا و ي',
    en: 'Madd al-Badal: a hamza precedes a madd letter in the same word (the madd substituted for an original hamza). Recited as 2 counts in the narration of Hafs \'an \'Asim (e.g. آمَنَ, إِيمَان, أُوتِيَ).',
    bn: 'মাদ্দ বদল: একই শব্দে হামযার পরে মাদ্দের হরফ (মূলত মাদ্দ হামযার স্থলে এসেছে)। হাফসের রিওয়ায়েতে সাধারণত ২ হরকত (যেমন آمَنَ, إِيمَان)।' },
  madd_iwad: { group: 'madd', names: { bn: 'মাদ্দ ইওয়াদ (২)', ar: 'مد العوض (2)' }, letters: 'ـً',
    en: "Madd al-'Iwad: stopping on a word ending in tanwin fathah (ـً) — the tanwin is dropped and the fathah is prolonged for 2 counts as compensation (e.g. عَلِيمًا → عَلِيمَا at waqf).",
    bn: 'মাদ্দ ইওয়াদ: তানউইন ফাতহায় (ـً) শেষ হওয়া শব্দে থামলে তানউইন বাদ দিয়ে ফাতহার উপর ২ হরকত ক্ষতিপূরণ মাদ্দ (যেমন عَلِيمًا → عَلِيمَا ওয়াকফে)।' },

  // ── Ra' rules: tafkhīm (heavy) and tarqīq (light) ────────────────────────
  ra_tafkhim: { group: 'ra', names: { bn: 'রা তাফখিম (ভারী রা)', ar: 'تفخيم الراء' }, letters: 'ر',
    en: "Heavy Ra': pronounced full and heavy when it carries fathah or dammah, has sukoon after a fathah/dammah, or comes after alif. Also heavy at the start of a word after hamzat al-wasl.",
    bn: 'রা তাফখিম: রা ফাতহা/দাম্মাযুক্ত হলে, ফাতহা বা দাম্মার পরে সাকিন হলে বা আলিফের পরে — গভীর ও ভারী উচ্চারণ।' },
  ra_tarqiq: { group: 'ra', names: { bn: 'রা তারকিক (হালকা রা)', ar: 'ترقيق الراء' }, letters: 'ر',
    en: "Light Ra': thin and light when it carries kasrah, follows a kasrah into sukoon (e.g. رِزْق, stopping on ذِكْر), or in certain exceptional waqf cases governed by classical rules.",
    bn: 'রা তারকিক: রা কাসরাযুক্ত হলে বা কাসরার পরে সাকিন হলে (যেমন رِزْق, থামার সময় ذِكْر) পাতলা ও হালকা উচ্চারণ।' },

  // ── Waqf & special-letter rules ───────────────────────────────────────────
  lam_qamariyyah: { group: 'other', names: { bn: 'লাম কামারিয়্যাহ', ar: 'اللام القمرية' }, letters: 'ال',
    en: "Moon lam: the ل of ال is pronounced clearly before the fourteen 'moon letters' (ا ب ج ح خ ع غ ف ق ك م و ه ي) — the lam is audible and the moon letter takes no shadda.",
    bn: 'লাম কামারিয়্যাহ: চৌদ্দটি "চাঁদের হরফ"-এর আগে ال-এর لام স্পষ্ট উচ্চারিত হয় — লাম শোনা যায়, পরের হরফে শাদ্দা নেই।' },
  ha_sakt: { group: 'other', names: { bn: 'হা আস-সাকত', ar: 'هاء السكت' }, letters: 'هْ',
    en: "Ha' as-Sakt: a silent هـ appended to certain Quranic words (e.g. مَالِيَهْ, سُلْطَانِيَهْ, كِتَابِيَهْ) to preserve the vowel when stopping. Pronounced only at waqf; dropped when continuing.",
    bn: 'হা আস-সাকত: কোরআনের কিছু শব্দের শেষে (যেমন مَالِيَهْ, سُلْطَانِيَهْ) ওয়াকফে স্বর রক্ষার জন্য নীরব هـ যোগ হয়। শুধুমাত্র থামার সময় পড়া হয়; ওয়াসলে বাদ।' },
  sakt: { group: 'other', names: { bn: 'সাকত', ar: 'السكت' }, letters: '—',
    en: "Sakt: a brief, silent pause without inhaling at four specific places in the Quran in Hafs 'an 'Asim (e.g. عِوَجاً|قَيِّماً, مَرْقَدِنَا|هَذَا, مَنْ|رَاقٍ, بَلْ|رَانَ).",
    bn: "সাকত: শ্বাস না নিয়ে স্বল্প নীরব বিরতি — হাফসের রিওয়ায়েতে কোরআনের চারটি নির্দিষ্ট স্থানে (যেমন عِوَجاً|قَيِّماً, مَرْقَدِنَا|هَذَا, مَنْ|رَاقٍ, بَلْ|رَانَ)।" },

  // ── Meem Sākinah: the clear ruling ────────────────────────────────────────
  izhar_shafawi: { group: 'meem', names: { bn: 'ইযহার শাফাবি', ar: 'الإظهار الشفوي' }, letters: '26 letters (all except ب م)',
    en: "Labial clarity: meem sakinah (مْ) before any of the 26 letters other than ب and م is pronounced clearly with no ghunnah. Take extra care before و and ف — sharing the meem's articulation area — so the meem is not accidentally hidden.",
    bn: 'ইযহার শাফাবি: মীম সাকিন (مْ)-এর পরে ب ও م ছাড়া বাকি ২৬টি হরফ এলে গুন্নাহ ছাড়াই স্পষ্ট উচ্চারণ। বিশেষত و ও ف-এর আগে সতর্ক থাকুন যেন মীম গোপন না হয়।' },

  // ── Idghām of two identical letters ───────────────────────────────────────
  idghaam_mutamathilayn: { group: 'other', names: { bn: 'ইদগাম মুতামাসিলাইন', ar: 'إدغام المتماثلين' }, letters: 'same letter ×2',
    en: 'Merging of two identical letters: when a letter with sukoon is followed by the same letter (same makhraj AND same attributes), the first merges completely into the second, which takes a shaddah (e.g. اضْرِب بِّعَصَاكَ, قَد دَّخَلُوا).',
    bn: 'ইদগাম মুতামাসিলাইন: এক হরফ সাকিন হয়ে অবিকল একই হরফের (একই মাখরাজ ও একই সিফাত) আগে এলে প্রথমটি দ্বিতীয়টিতে সম্পূর্ণ মিশে যায় এবং সেটি শাদ্দাযুক্ত হয় (যেমন اضْرِب بِّعَصَاكَ, قَد دَّخَلُوا)।' },

  // ── Lafẓ al-Jalālah: the lām of the Name "Allāh" ──────────────────────────
  lafz_jalalah: { group: 'ra', names: { bn: 'লাফযুল জালালাহ (আল্লাহ শব্দের লাম)', ar: 'لفظ الجلالة (اللّٰه)' }, letters: 'اللّٰه',
    en: 'The lām of the Name اللّٰه is heavy (tafkhim) when preceded by a fathah or dammah (e.g. قَالَ اللّٰهُ, هُوَ اللّٰهُ), and light (tarqiq) when preceded by a kasrah (e.g. بِسْمِ اللّٰهِ, الْحَمْدُ لِلّٰهِ).',
    bn: 'اللّٰه শব্দের লাম — এর আগে ফাতহা বা দাম্মা থাকলে ভারী (তাফখিম) (যেমন قَالَ اللّٰهُ, هُوَ اللّٰهُ), আর কাসরা থাকলে হালকা (তারকিক) (যেমন بِسْمِ اللّٰهِ, الْحَمْدُ لِلّٰهِ)।' },

  // ── Istiʿlāʾ: the seven ever-heavy letters ────────────────────────────────
  tafkhim_istila: { group: 'ra', names: { bn: 'তাফখিম (ইসতিলা হরফ)', ar: 'تفخيم حروف الاستعلاء' }, letters: 'خ ص ض غ ط ق ظ',
    en: "Letters of isti'la (خُصَّ ضَغْطٍ قِظْ): خ ص ض غ ط ق ظ are always heavy (mufakhkham) — the back of the tongue rises regardless of their vowel, and they colour the surrounding vowels (e.g. خَلَقَ, الصِّرَاطَ, الْعَظِيم).",
    bn: 'ইসতিলার হরফ (خُصَّ ضَغْطٍ قِظْ): خ ص ض غ ط ق ظ সর্বদা ভারী (মুফাখখাম) — স্বরচিহ্ন যাই হোক জিহ্বার পিছন উঁচু হয় এবং পার্শ্ববর্তী স্বরকেও প্রভাবিত করে (যেমন خَلَقَ, الصِّرَاطَ, الْعَظِيم)।' },

  // ── Madd al-Ṣilah & Madd al-Farq ──────────────────────────────────────────
  madd_silah: { group: 'madd', names: { bn: 'মাদ্দ সিলাহ (২ / ৪-৫)', ar: 'مد الصلة (2 / 4-5)' }, letters: 'ـهُ ـهِ',
    en: 'Madd al-Silah: the pronoun haa (ـهُ / ـهِ) between two voweled letters is stretched as a hidden و/ي. Silah Sughra = 2 counts before a normal letter (e.g. لَهُ مَا); Silah Kubra = 4–5 counts before a hamzat qatʿ (e.g. مَالَهُ أَخْلَدَهُ).',
    bn: 'মাদ্দ সিলাহ: দুই স্বরযুক্ত হরফের মাঝে থাকা সর্বনাম হা (ـهُ / ـهِ) গোপন و/ي হিসেবে টানা হয়। সিলাহ সুগরা = সাধারণ হরফের আগে ২ হরকত (যেমন لَهُ مَا); সিলাহ কুবরা = হামযাতুল ক্বাতের আগে ৪–৫ হরকত (যেমন مَالَهُ أَخْلَدَهُ)।' },
  madd_farq: { group: 'madd', names: { bn: 'মাদ্দ ফারক (৬)', ar: 'مد الفرق (6)' }, letters: 'ٱ + ال',
    en: 'Madd al-Farq: an interrogative hamza meets the hamzat al-wasl of ال, lengthened 6 counts to distinguish a question from a statement (e.g. آلذَّكَرَيْنِ, آللّٰهُ أَذِنَ, آلْآنَ). One of six such places in the Quran.',
    bn: 'মাদ্দ ফারক: প্রশ্নবোধক হামযা ال-এর হামযাতুল ওয়াসলের সাথে মিলিত হলে প্রশ্ন ও বিবৃতির পার্থক্য বোঝাতে ৬ হরকত টানা হয় (যেমন آلذَّكَرَيْنِ, آللّٰهُ أَذِنَ, آلْآنَ)। কোরআনে এমন ছয়টি স্থান।' },

  // ── Hamzat al-Qaṭʿ: the always-pronounced hamza (pairs with hamzat al-wasl) ─
  hamzat_qat: { group: 'other', names: { bn: 'হামযাতুল ক্বাত', ar: 'همزة القطع' }, letters: 'ء أ إ ؤ ئ',
    en: 'Cutting hamza: a fixed, always-pronounced hamza (ء / أ / إ / ؤ / ئ) — sounded whether you START at it or continue THROUGH it, unlike hamzat al-wasl which drops in continuation (e.g. أَنْعَمْتَ, إِيَّاكَ, اقْرَأْ).',
    bn: 'হামযাতুল ক্বাত: স্থায়ী হামযা (ء / أ / إ / ؤ / ئ) — শুরু করলেও মাঝে পড়লেও সর্বদা উচ্চারিত; হামযাতুল ওয়াসলের বিপরীত যা ওয়াসলে বাদ পড়ে (যেমন أَنْعَمْتَ, إِيَّاكَ, اقْرَأْ)।' },

  // ── Tarqīq of the general Lām (every lām except the Name Allāh) ─────────────
  tarqiq_lam: { group: 'ra', names: { bn: 'তারকিকুল লাম (সাধারণ লাম)', ar: 'ترقيق اللام' }, letters: 'ل',
    en: 'Light Lām: the letter ل is recited light (tarqīq) in every word of the Quran — the ONLY heavy lām is that of the Name اللّٰه after a fathah or dammah (so لَا, قُلْ, مَالِكِ are all light).',
    bn: 'তারকিকুল লাম: কোরআনের প্রতিটি শব্দে ل হালকা (তারকিক) উচ্চারিত — একমাত্র اللّٰه শব্দের লাম ফাতহা/দাম্মার পরে ভারী হয় (তাই لَا, قُلْ, مَالِكِ সবই হালকা)।' },

  // ── Marātib al-Ghunnah: the levels/strength of the nasal sound ──────────────
  ghunnah_maratib: { group: 'core', names: { bn: 'গুন্নাহর স্তর (মারাতিব)', ar: 'مراتب الغنّة' }, letters: 'ن م',
    en: 'Levels of ghunnah: the nasal sound varies in strength — strongest on a doubled نّ/مّ, then in idghām & iqlāb, then ikhfā (~2 counts each), lighter on a sākinah with iẓhār, and lightest on a voweled ن/م.',
    bn: 'গুন্নাহর স্তর: নাকি ধ্বনির মাত্রা ভিন্ন — সবচেয়ে জোরালো মুশাদ্দাদ نّ/مّ-এ, তারপর ইদগাম ও ইকলাবে, এরপর ইখফায় (~২ হরকত), ইযহারে হালকা এবং স্বরযুক্ত ن/م-এ সবচেয়ে হালকা।' },

  // ── Waqf & Ibtidāʾ: stopping and starting correctly ────────────────────────
  waqf_ibtida: { group: 'other', names: { bn: 'ওয়াকফ ও ইবতিদা', ar: 'الوقف والابتداء' }, letters: '—',
    en: 'Stopping & starting: choosing correct places to pause (waqf) and resume (ibtidāʾ). A tāmm (complete) stop ends a full meaning, e.g. a verse end; a ḥasan stop is sound mid-verse; avoid a qabīḥ stop that breaks the meaning. A tie-mark (muʿānaqah ۛ) means stop at only ONE of two adjacent spots.',
    bn: 'ওয়াকফ ও ইবতিদা: থামা (ওয়াকফ) ও পুনরায় শুরু (ইবতিদা)-র সঠিক স্থান বাছাই। তাম্ম (পূর্ণ) ওয়াকফ সম্পূর্ণ অর্থে শেষ হয় — যেমন আয়াতের শেষ; হাসান ওয়াকফ আয়াতের মাঝে সঠিক; অর্থ নষ্টকারী কবিহ ওয়াকফ পরিহার্য। মুআনাকা চিহ্ন (ۛ) মানে পাশাপাশি দুই স্থানের যেকোনো একটিতেই থামা।' },
};

/**
 * Structured learning path: classical teaching order. A level is "complete"
 * when every rule in it is marked learned; the next level then unlocks
 * (advisory only — all rule cards stay reachable below).
 */
const TAJWEED_PATH = [
  { level: 'beginner', emoji: '🌱', labelKey: 'tj_level_beginner', fallback: 'Beginner',
    rules: ['madd_2', 'lam_shamsiyyah', 'lam_qamariyyah', 'hamzat_wasl', 'hamzat_qat', 'silent', 'ghunnah', 'qalqalah', 'izhar_halqi'] },
  { level: 'intermediate', emoji: '🌿', labelKey: 'tj_level_intermediate', fallback: 'Intermediate',
    rules: ['ikhfa', 'iqlab', 'idghaam_ghunnah', 'idghaam_no_ghunnah', 'ikhfa_shafawi', 'idghaam_shafawi', 'izhar_shafawi', 'izhar_mutlaq', 'madd_aridh', 'madd_lin', 'ra_tafkhim', 'ra_tarqiq', 'lafz_jalalah', 'tarqiq_lam', 'tafkhim_istila', 'ghunnah_maratib'] },
  { level: 'advanced', emoji: '🌳', labelKey: 'tj_level_advanced', fallback: 'Advanced',
    rules: ['madd_muttasil', 'madd_munfasil', 'madd_246', 'madd_6', 'madd_badal', 'madd_iwad', 'madd_silah', 'madd_farq', 'idghaam_mutamathilayn', 'idghaam_mutajanisayn', 'idghaam_mutaqaribayn', 'ha_sakt', 'sakt', 'waqf_ibtida'] },
];

/**
 * The classical 17 makharij (articulation points) in 5 zones, as taught in
 * standard tajweed curricula (al-Jazariyyah ordering). Letters only — no
 * example words needed, so nothing to verify against the corpus.
 */
const MAKHARIJ_ZONES = [
  { key: 'jawf', ar: 'الجوف', color: '#3B82F6',
    names: { en: 'Al-Jawf — the empty space of the mouth and throat', bn: 'আল-জাওফ — মুখ ও গলার খালি জায়গা' },
    points: [
      { letters: 'ا و ي', pointName: 'الجوف',
        en: 'The three madd letters — sound flows from the open cavity and ends with the breath.',
        bn: 'মাদ্দের তিন হরফ — খালি জায়গা থেকে আওয়াজ প্রবাহিত হয়ে শ্বাসের সাথে শেষ হয়।' },
    ] },
  { key: 'halq', ar: 'الحلق', color: '#EF4444',
    names: { en: 'Al-Halq — the throat', bn: 'আল-হালক — গলা' },
    points: [
      { letters: 'ء هـ', pointName: 'أقصى الحلق', en: 'Deepest part of the throat (nearest the chest).', bn: 'গলার গভীরতম অংশ (বুকের নিকটবর্তী)।' },
      { letters: 'ع ح', pointName: 'وسط الحلق', en: 'Middle of the throat.', bn: 'গলার মধ্যভাগ।' },
      { letters: 'غ خ', pointName: 'أدنى الحلق', en: 'Top of the throat (nearest the mouth).', bn: 'গলার উপরের অংশ (মুখের নিকটবর্তী)।' },
    ] },
  { key: 'lisan', ar: 'اللسان', color: '#10B981',
    names: { en: 'Al-Lisan — the tongue', bn: 'আল-লিসান — জিহ্বা' },
    points: [
      { letters: 'ق', pointName: 'أقصى اللسان مع الحنك الأعلى', en: 'Deepest part of the tongue with the soft palate above it.', bn: 'জিহ্বার গোড়া ও তার উপরের নরম তালু।' },
      { letters: 'ك', pointName: 'أقصى اللسان فويق مخرج القاف', en: 'Slightly forward of ق — back of the tongue with the palate.', bn: 'ق-এর সামান্য সামনে — জিহ্বার পিছনের অংশ ও তালু।' },
      { letters: 'ج ش ي', pointName: 'وسط اللسان مع الحنك الأعلى', en: 'Middle of the tongue with the roof of the mouth.', bn: 'জিহ্বার মধ্যভাগ ও তালু।' },
      { letters: 'ض', pointName: 'إحدى حافتي اللسان مع الأضراس العليا', en: 'Side(s) of the tongue against the upper molars.', bn: 'জিহ্বার পার্শ্বদেশ ও উপরের মাড়ির দাঁত।' },
      { letters: 'ل', pointName: 'حافة اللسان مع ما يليها من اللثة', en: 'Nearest edge of the tongue with the upper gums.', bn: 'জিহ্বার অগ্রভাগের কিনারা ও উপরের মাড়ি।' },
      { letters: 'ن', pointName: 'طرف اللسان تحت مخرج اللام', en: 'Tip of the tongue with the upper gums, just below the point of ل.', bn: 'জিহ্বার অগ্রভাগ ও উপরের মাড়ি — ل-এর ঠিক নিচে।' },
      { letters: 'ر', pointName: 'طرف اللسان (مع ظهره) قريباً من مخرج النون', en: 'Tip of the tongue (with its back) near the point of ن.', bn: 'জিহ্বার অগ্রভাগ (পিঠসহ) — ن-এর কাছাকাছি স্থান।' },
      { letters: 'ط د ت', pointName: 'طرف اللسان مع أصول الثنايا العليا', en: 'Tip of the tongue with the base of the upper front teeth.', bn: 'জিহ্বার অগ্রভাগ ও উপরের সামনের দাঁতের গোড়া।' },
      { letters: 'ص س ز', pointName: 'طرف اللسان قريباً من الثنايا السفلى', en: 'Tip of the tongue close to the lower front teeth, leaving a small gap.', bn: 'জিহ্বার অগ্রভাগ ও নিচের সামনের দাঁত — সামান্য ফাঁক রেখে।' },
      { letters: 'ظ ذ ث', pointName: 'طرف اللسان مع أطراف الثنايا العليا', en: 'Tip of the tongue with the edges of the upper front teeth.', bn: 'জিহ্বার অগ্রভাগ ও উপরের সামনের দাঁতের কিনারা।' },
    ] },
  { key: 'shafatan', ar: 'الشفتان', color: '#F59E0B',
    names: { en: 'Ash-Shafatan — the two lips', bn: 'আশ-শাফাতান — দুই ঠোঁট' },
    points: [
      { letters: 'ف', pointName: 'باطن الشفة السفلى مع أطراف الثنايا العليا', en: 'Inside of the lower lip with the tips of the upper front teeth.', bn: 'নিচের ঠোঁটের ভেতরের অংশ ও উপরের সামনের দাঁতের প্রান্ত।' },
      { letters: 'ب م و', pointName: 'الشفتان كلتاهما', en: 'The two lips together — closed for ب and م, slightly rounded open for و.', bn: 'দুই ঠোঁট একসাথে — ب ও م-এ বন্ধ, و-তে সামান্য গোল করে খোলা।' },
    ] },
  { key: 'khayshum', ar: 'الخيشوم', color: '#8B5CF6',
    names: { en: 'Al-Khayshum — the nasal cavity', bn: 'আল-খাইশুম — নাসারন্ধ্র' },
    points: [
      { letters: 'نّ مّ', pointName: 'الخيشوم',
        en: 'Source of the ghunnah — in doubled ن/م, ikhfa, iqlab and idgham with ghunnah.',
        bn: 'গুন্নাহর উৎস — নূন/মীম মুশাদ্দাদ, ইখফা, ইকলাব ও গুন্নাহসহ ইদগামে।' },
    ] },
];

/**
 * The four rulings of Noon Sakinah (نْ) & Tanween (ـً ـٍ ـٌ), in the classical
 * teaching order. Izhar Halqi has no colour in the highlighting engine (it is
 * the default "clear" pronunciation), so it carries its own neutral swatch.
 * en/bn text is embedded inline, matching the MAKHARIJ_ZONES style.
 */
const NOON_SAKINAH_RULES = [
  { color: '#64748B', trigger: 'ء هـ ع ح غ خ',
    names: { en: 'Izhar Halqi — clear', bn: 'ইযহার হালকি — স্পষ্ট' },
    en: 'Before the six throat letters, pronounce the noon/tanween clearly with no extra ghunnah or merging.',
    bn: 'ছয়টি গলার হরফের আগে নূন/তানউইন স্পষ্ট উচ্চারণ — অতিরিক্ত গুন্নাহ বা মিলন নয়।' },
  { color: '#169777', trigger: 'ي ر م ل و ن',
    names: { en: 'Idghaam — merging', bn: 'ইদগাম — মিলন' },
    en: 'Merge into the letters of يرملون: with ghunnah in ي ن م و (ينمو), without ghunnah in ل ر.',
    bn: 'يرملون-এর হরফে মিশে যায়: ي ن م و (ينمو)-তে গুন্নাহসহ, ل ر-এ গুন্নাহ ছাড়া।' },
  { color: '#26BFFD', trigger: 'ب',
    names: { en: 'Iqlab — conversion', bn: 'ইকলাব — রূপান্তর' },
    en: 'Before ب the noon/tanween turns into a hidden meem sound, held with ghunnah.',
    bn: 'ب-এর আগে নূন/তানউইন গুন্নাহসহ গোপন মীমের ধ্বনিতে বদলে যায়।' },
  { color: '#9400A8', trigger: 'ت ث ج د ذ ز س ش ص ض ط ظ ف ق ك',
    names: { en: 'Ikhfa — hiding', bn: 'ইখফা — গোপন' },
    en: 'Before the remaining 15 letters, hide the noon lightly between izhar and idghaam, with ghunnah (~2 counts).',
    bn: 'বাকি ১৫টি হরফের আগে নূন হালকাভাবে গোপন — ইযহার ও ইদগামের মাঝামাঝি, গুন্নাহসহ (~২ হরকত)।' },
];

/** The three rulings of Meem Sakinah (مْ). Izhar Shafawi uses a neutral swatch. */
const MEEM_SAKINAH_RULES = [
  { color: '#D500B7', trigger: 'ب',
    names: { en: 'Ikhfa Shafawi — labial hiding', bn: 'ইখফা শাফাবি — ঠোঁটে গোপন' },
    en: 'Before ب the meem sakinah is lightly hidden on the lips, held with ghunnah.',
    bn: 'ب-এর আগে মীম সাকিন ঠোঁটে হালকাভাবে গোপন — গুন্নাহসহ।' },
  { color: '#58B800', trigger: 'م',
    names: { en: 'Idghaam Shafawi — labial merging', bn: 'ইদগাম শাফাবি — ঠোঁটে মিলন' },
    en: 'Before another م the two meems merge into one doubled meem, held with ghunnah.',
    bn: 'পরবর্তী م-এ দুই মীম মিশে একটি মুশাদ্দাদ মীম হয় — গুন্নাহসহ।' },
  { color: '#64748B', trigger: '—',
    names: { en: 'Izhar Shafawi — clear', bn: 'ইযহার শাফাবি — স্পষ্ট' },
    en: 'Before all remaining letters pronounce the meem clearly — take special care with و and ف so it is not hidden.',
    bn: 'বাকি সব হরফের আগে মীম স্পষ্ট উচ্চারণ — বিশেষত و ও ف-এর আগে যেন গোপন না হয়, সতর্ক থাকুন।' },
];

/** Common mistakes per rule family — standard textbook cautions only. */
const TAJWEED_MISTAKES = {
  noon: {
    en: [
      'Pronouncing the noon clearly during ikhfa — it should sit between izhar and idgham: lightly hidden, with ghunnah.',
      'Cutting the ghunnah short — in ikhfa, iqlab and idgham with ghunnah, hold the nasal sound about 2 counts.',
      'Applying idgham inside a single word — دُنْيَا and بُنْيَان are read with clear izhar (izhar mutlaq).',
    ],
    bn: [
      'ইখফায় নূন স্পষ্ট করে পড়া — এটি ইযহার ও ইদগামের মাঝামাঝি: গুন্নাহসহ হালকাভাবে গোপন রাখতে হয়।',
      'গুন্নাহ ছোট করে ফেলা — ইখফা, ইকলাব ও গুন্নাহসহ ইদগামে প্রায় ২ হরকত নাকি আওয়াজ ধরে রাখুন।',
      'এক শব্দের ভিতরে ইদগাম করা — دُنْيَا ও بُنْيَان-এ স্পষ্ট ইযহার হবে (ইযহার মুতলাক)।',
    ],
  },
  meem: {
    en: [
      'Hiding the meem before ف or و — meem sakinah there takes clear izhar (izhar shafawi) and needs extra care.',
      'Dropping the ghunnah when meem sakinah merges into a following م (idgham shafawi).',
      'Pressing the lips too hard in ikhfa shafawi before ب — the closure stays light, with ghunnah.',
    ],
    bn: [
      'ف বা و-এর আগে মীম সাকিন গোপন করা — সেখানে স্পষ্ট ইযহার (ইযহার শাফাবি) হবে; বিশেষ সতর্কতা দরকার।',
      'ইদগাম শাফাবিতে গুন্নাহ বাদ দেওয়া — মীম সাকিন পরের م-এ মিশলে গুন্নাহ বজায় থাকবে।',
      'ইখফা শাফাবিতে ب-এর আগে ঠোঁট খুব শক্ত করে চাপা — চাপ হালকা হবে, গুন্নাহসহ।',
    ],
  },
  madd: {
    en: [
      'Stretching natural madd beyond 2 counts — or clipping it below 2.',
      'Shortening madd muttasil below 4 counts — its lengthening is obligatory (wajib).',
      'Mixing lengths for madd munfasil — choose 4 or 5 counts and keep it consistent through the recitation.',
      'Giving madd lazim less than its full 6 counts.',
    ],
    bn: [
      'মাদ্দ তবিয়ি ২ হরকতের বেশি টানা — বা ২-এর কম করা।',
      'মাদ্দ মুত্তাসিল ৪ হরকতের কম টানা — এর দৈর্ঘ্য ওয়াজিব।',
      'মাদ্দ মুনফাসিলে একবার ৪, একবার ৫ — একটি দৈর্ঘ্য বেছে নিয়ে পুরো তিলাওয়াতে তা বজায় রাখুন।',
      'মাদ্দ লাযিম পূর্ণ ৬ হরকতের কম টানা।',
    ],
  },
  core: {
    en: [
      'Turning the qalqalah bounce into a vowel — it must not sound like a fathah, kasrah or dammah.',
      'Applying qalqalah to ق ط ب ج د when they carry a vowel — it happens only with sukoon (strongest when stopping).',
      'Weakening the ghunnah on a doubled ن or م — hold it about 2 counts.',
    ],
    bn: [
      'কলকলার প্রতিধ্বনিকে হরকতের মতো করা — তা যেন ফাতহা, কাসরা বা দাম্মার মতো না শোনায়।',
      'হরকতযুক্ত ق ط ب ج د-এ কলকলা করা — কলকলা কেবল সাকিন অবস্থায় (থামলে সবচেয়ে জোরালো)।',
      'নূন/মীম মুশাদ্দাদে গুন্নাহ দুর্বল করা — প্রায় ২ হরকত ধরে রাখুন।',
    ],
  },
  other: {
    en: [
      'Pronouncing hamzat al-wasl while continuing from the previous word — it is read only when you start at it.',
      'Pronouncing the lam of ال before a sun letter — the lam is silent and the sun letter is doubled.',
      'Pronouncing the lam of ال before a moon letter with shadda — moon lam is clear; no shadda on the following letter.',
      'Extending idgham mutajanisayn/mutaqaribayn beyond their specific letter pairs — merge only where the rule applies.',
      'Pronouncing ha\' as-sakt in the middle of flowing speech — it exists only at a waqf (stop).',
      'Inserting a breath at the four sakt positions — sakt is a silent pause without inhaling.',
    ],
    bn: [
      'আগের শব্দের সাথে মিলিয়ে পড়ার সময় হামযাতুল ওয়াসল উচ্চারণ করা — সেখান থেকে শুরু করলেই কেবল তা পড়া হয়।',
      'সূর্য অক্ষরের আগে ال-এর লাম উচ্চারণ করা — লাম নীরব, সূর্য অক্ষর দ্বিগুণ হয়।',
      'চাঁদের হরফের আগে ال-এর লামকে নীরব করা — লাম কামারিয়্যাহতে لাম স্পষ্ট, পরের হরফে শাদ্দা নেই।',
      'নির্দিষ্ট হরফ-জোড়ার বাইরে ইদগাম মুতাজানিসাইন/মুতাকারিবাইন প্রয়োগ করা — নিয়ম যেখানে প্রযোজ্য কেবল সেখানেই মিলন।',
      'ওয়াসলের সময় হা আস-সাকত উচ্চারণ করা — এটি শুধুমাত্র ওয়াকফে (থামার সময়) উচ্চারিত হয়।',
      'সাকতের চারটি স্থানে শ্বাস নেওয়া — সাকত হলো শ্বাস ছাড়াই নীরব বিরতি।',
    ],
  },
  ra: {
    en: [
      'Making Ra\' heavy before a kasrah — Ra\' takes tarqiq (light) when it carries or is preceded by a kasrah.',
      'Making Ra\' light before a fathah or dammah — these require tafkhim (heavy Ra\').',
      'Ignoring exceptional cases where Ra\' with sukoon after kasrah is still heavy (e.g. فِرْق, إِرْصَاد) because of a barrier letter.',
      'Giving Ra\' the same weight in all contexts — it must switch between tafkhim and tarqiq based on its vowel environment.',
    ],
    bn: [
      'কাসরার আগে রা ভারী করা — কাসরাযুক্ত বা কাসরার পরের রা তারকিক (হালকা) হয়।',
      'ফাতহা বা দাম্মার আগে রা হালকা করা — এই অবস্থানে তাফখিম (ভারী) বাধ্যতামূলক।',
      'ব্যতিক্রম স্থান উপেক্ষা করা — যেমন فِرْق, إِرْصَاد-এ কাসরা ও রা-র মাঝে বাধা হরফ থাকায় রা ভারী হয়।',
      'সব ক্ষেত্রে রাকে একই ওজন দেওয়া — স্বরচিহ্ন অনুযায়ী তাফখিম ও তারকিকের মধ্যে পরিবর্তন আবশ্যক।',
    ],
  },
  general: {
    en: [
      'Pronouncing Arabic letters through the nearest native-language sound — e.g. using English "t" for ط (which is heavier, emphatic and dental) or "d" for ض (unique to Arabic).',
      'Neglecting the difference between ح (deep, breathy, from the middle throat) and هـ (soft, from the mouth) — both are often collapsed into one sound.',
      'Treating ع (voiced pharyngeal consonant) as a plain "a" vowel — it is a distinct consonant produced deep in the throat.',
      'Pronouncing ذ, ث, ظ as "z", "s" or "d" respectively — all three require the tongue tip near or touching the upper teeth.',
      'Dropping ghunnah entirely in fast recitation — the nasal resonance is obligatory and must last approximately 2 counts.',
      'Keeping the final short vowel when stopping (waqf) — at a stop, final short vowels are dropped and the last letter becomes sukoon.',
      'Not distinguishing madd lengths — treating every long vowel equally when recitation requires 2, 4, 5 or 6 counts depending on the rule.',
      'Confusing sukoon (absence of vowel) with a vowel sound — a letter with sukoon is held without any vowel colour.',
      'Pronouncing connective hamza (همزة الوصل) when continuing speech — it is silent in the middle of connected recitation, not a glottal stop.',
      'Applying the same weight to every letter — Arabic has heavy (مفخّم) and light (مرقّق) letters, and confusing them distorts meaning.',
      'Mispronouncing ص, ض, ط, ظ as their light equivalents — these four are always emphatic and raise the quality of surrounding vowels.',
      'Rushing through qalqalah letters without the echo bounce — the echo is brief but must be audible, especially at a waqf (strongest) or mid-word sukoon.',
      // ── Non-Arab learner errors: Bengali / Urdu / Indonesian / Turkish speakers ──
      'Inserting a short vowel (schwa) after consonants bearing sukoon — Bengali, Urdu and Malay speakers influenced by native syllable habits sometimes say "bi-si-mi" for بِسْمِ instead of "bism". Sukoon means no vowel at all.',
      'Pronouncing ق as a plain velar "k" (Urdu/Bengali) or as a glottal stop (some Indonesian speakers) — ق is a uvular stop produced deeper than ك; the back of the tongue presses against the soft palate/uvula.',
      'Using a trilled or heavily rolled ر — Urdu, Bengali, Turkish and Indonesian/Malay speakers often trill; Arabic ر in most positions is a single-tap (flap) not a prolonged trill, though tafkhīm fills the mouth.',
      'Treating ع as a plain vowel "a/i/u" — speakers of Turkish, Indonesian and many South and Southeast Asian languages have no equivalent phoneme; ع requires an audible pharyngeal constriction, not just an open vowel.',
      'Pronouncing the initial hamzat al-qaṭʿ (ء) in أَعُوذُ, أَكْبَرُ, إِلَٰهَ as a soft glide — Bengali/Urdu speakers sometimes open into the following vowel without the crisp glottal stop that hamza demands.',
      'Aspirating Arabic stops — English, Bengali, Turkish and many Urdu speakers unconsciously aspirate ت, ك, ق (adding a puff of air); Arabic plosives are unaspirated: the airflow is fully stopped and released cleanly.',
      'Nasalising long vowels before ن or م that carry a full vowel — ghunnah is only for a doubled ن/مّ or where ikhfa/iqlab applies; pronouncing رَسُولُ نَبِيٍّ with extra nasalisation on the وُ is hypercorrection.',
      'Applying the same heavy quality to all ر sounds — Turkish and Indonesian speakers may keep ر uniformly thick; remember ر switches between tafkhīm (heavy) and tarqīq (light) strictly based on its vowel environment.',
    ],
    bn: [
      'আরবি হরফ মাতৃভাষার কাছাকাছি ধ্বনিতে পড়া — যেমন ط-এর বদলে ইংরেজি "t" বা বাংলা "ট", অথচ ط আরও ভারী ও দন্তমূলীয়।',
      'ح (গলার মধ্যভাগ থেকে গভীর, শ্বাসযুক্ত ধ্বনি) ও هـ (মুখ থেকে মৃদু শ্বাস)-এর পার্থক্য না রাখা — উভয়কে একই ধ্বনি মনে করা ভুল।',
      'ع (কণ্ঠনালির ব্যঞ্জনধ্বনি)-কে সাধারণ "আ" স্বরের মতো পড়া — এটি গলার গভীর থেকে উৎপন্ন একটি স্বতন্ত্র ব্যঞ্জন।',
      'ذ, ث, ظ-কে যথাক্রমে "z", "s" বা "d"-এর মতো পড়া — তিনটিতেই জিহ্বার অগ্রভাগ উপরের দাঁতের কাছে স্পর্শ করতে হয়।',
      'দ্রুত তিলাওয়াতে গুন্নাহ (নাকি অনুরণন) বাদ দেওয়া — গুন্নাহ বাধ্যতামূলক ও প্রায় ২ হরকত স্থায়ী।',
      'থামার সময় শেষ স্বর ধরে রাখা — ওয়াকফে শেষ স্বর বাদ দিয়ে শেষ হরফ সাকিন করতে হয়।',
      'মাদ্দের দৈর্ঘ্য আলাদা না রাখা — নিয়ম অনুযায়ী ২, ৪, ৫ বা ৬ হরকত ভিন্ন ভিন্ন হওয়া উচিত।',
      'সুকুন (স্বরহীনতা)-কে স্বরের মতো পড়া — সুকুনযুক্ত হরফ কোনো স্বর ছাড়াই উচ্চারিত হয়।',
      'একাধারে পড়ার সময় হামযাতুল ওয়াসল উচ্চারণ করা — কথার মাঝে এটি নীরব, কোনো গলার শব্দ নয়।',
      'সব হরফকে সমান ওজন দেওয়া — আরবিতে ভারী (মুফাখখাম) ও হালকা (মুরাক্কাক) হরফ রয়েছে, গুলিয়ে ফেললে অর্থ বিকৃত হয়।',
      'ص, ض, ط, ظ-কে তাদের হালকা সমতুল্য হরফের মতো পড়া — এই চারটি সর্বদা গুরু/ভারী এবং পার্শ্ববর্তী স্বরের মানও পরিবর্তন করে।',
      'কলকলার হরফে প্রতিধ্বনি ছাড়া পড়া — বাউন্স সংক্ষিপ্ত হলেও শ্রুতিগোচর হওয়া আবশ্যক; বিশেষত ওয়াকফে সবচেয়ে জোরালো।',
      // ── অ-আরব শিক্ষার্থীর ভুল: বাংলা / উর্দু / ইন্দোনেশিয়ান / তুর্কি বক্তা ──
      'সুকুনযুক্ত হরফের পরে সংযোজক স্বর (schwa) যোগ করা — বাংলা, উর্দু ও মালয়ভাষীরা মাতৃভাষার প্রভাবে بِسْمِ-কে "বি-সি-মি" বলেন; সুকুন মানে কোনো স্বরই নেই।',
      'ق-কে সাধারণ "ক" (বাংলা/উর্দু) বা গলার শব্দ (ইন্দোনেশিয়ান) হিসেবে পড়া — ق হলো জিহ্বার পিছনের অংশ থেকে উৎপন্ন উভয়ের চেয়ে গভীর উভৈলাপনীয় বর্ণ; ক (ك)-এর চেয়ে গভীরে।',
      'ر-কে দীর্ঘ কম্পিত (trilled) রূপে পড়া — বাংলা, উর্দু, তুর্কি ও ইন্দোনেশিয়ান শিক্ষার্থীরা প্রায়ই দীর্ঘ কম্পন দেন; আরবি র অধিকাংশ ক্ষেত্রে একক-ফ্ল্যাপ, দীর্ঘ কম্পন নয়।',
      'ع-কে শুধু একটি স্বরধ্বনি ভাবা — তুর্কি, ইন্দোনেশিয়ান ও দক্ষিণ-দক্ষিণপূর্ব এশিয়ার ভাষায় সমতুল্য ধ্বনি নেই; ع-এর জন্য কণ্ঠনালিতে স্পষ্ট সংকোচন দরকার।',
      'أَعُوذُ, أَكْبَرُ-এর শুরুতে হামযাতুল ক্বাত্ব (ء) স্বরের মতো উচ্চারণ করা — বাংলা/উর্দু শিক্ষার্থীরা প্রায়ই হামযা ছাড়াই স্বরে প্রবেশ করেন; হামযার জন্য স্পষ্ট গলার আঘাত চাই।',
      'আরবি স্টপ হরফে (ت, ك, ق) শ্বাসের ছাড়া (aspiration) যোগ করা — বাংলা, ইংরেজি ও তুর্কির প্রভাবে এটি হয়; আরবিতে এই হরফগুলো অ্যাসপিরেটেড নয়, বায়ুপ্রবাহ সম্পূর্ণ বন্ধ হয়ে পরিষ্কারভাবে ছাড়া পায়।',
      'ন বা ম-এর আগে দীর্ঘ স্বরে অতিরিক্ত নাসালতা যোগ করা (হাইপারকারেকশন) — গুন্নাহ কেবল মুশাদ্দাদ ن/م বা ইখফা/ইকলাব/ইদগামের ক্ষেত্রে; স্বরযুক্ত ن বা م-এর আগে সাধারণ দীর্ঘ স্বরে অতিরিক্ত গুন্নাহ দেবেন না।',
      'সব ر-কে একই ভারী মানে পড়া — তুর্কি ও ইন্দোনেশিয়ান শিক্ষার্থীরা র সর্বত্র মোটা রাখেন; মনে রাখুন ر স্বরের পরিবেশ অনুযায়ী তাফখিম (ভারী) ও তারকিক (হালকা)-এর মধ্যে পরিবর্তন করে।',
    ],
  },
};

const TAJWEED_RESOURCES = [
  { name: 'KSU Electronic Mushaf', url: 'https://quran.ksu.edu.sa', emoji: '🕌', descKey: 'tjr_ksu_desc' },
  { name: 'TajweedQuran.com', url: 'https://www.tajweedquran.com', emoji: '📗', descKey: 'tjr_tajweedquran_desc' },
  { name: 'ReciteQuran.com', url: 'https://recitequran.com', emoji: '🎧', descKey: 'tjr_recitequran_desc' },
  { name: 'Tarteel.ai', url: 'https://tarteel.ai', emoji: '🎙️', descKey: 'tjr_tarteel_desc' },
  { name: 'EveryAyah', url: 'https://everyayah.com', emoji: '🔁', descKey: 'tjr_everyayah_desc' },
];

/**
 * Authentic Quranic examples for every rule in TAJWEED_LESSONS.
 * Each entry: { ref: 'S:A', focus: 'exact Arabic word/phrase', noteEn: '...', noteBn: '...' }
 * Sources: al-Jazariyyah, Tuḥfat al-Aṭfāl, Kareema Czerepinski's Complete Illustrated Guide.
 */
const TAJWEED_RULE_EXAMPLES = {

  // ── Core rules ─────────────────────────────────────────────────────────────
  ghunnah: [
    { ref: '2:6',   focus: 'إِنَّ',          noteEn: 'Doubled noon (نّ) in إِنَّ الَّذِينَ — hold the nasal resonance for 2 full counts.',           noteBn: 'إِنَّ-তে مُشَدَّد نّ — ২ পূর্ণ হরকত গুন্নাহ।' },
    { ref: '108:1', focus: 'إِنَّا',          noteEn: 'إِنَّا أَعْطَيْنَاكَ — doubled noon; resonance flows from al-khayshoom (nasal cavity).',       noteBn: 'إِنَّا-তে مُشَدَّد نّ; খাইশুম থেকে নাকি অনুরণন।' },
    { ref: '2:25',  focus: 'مِمَّا',          noteEn: 'Doubled meem (مّ) in مِمَّا رُزِقُوا — the same 2-count ghunnah applies to مّ as to نّ.',        noteBn: 'مِمَّا رُزِقُوا-তে مُشَدَّد مّ — نّ-এর মতোই ২ হরকত।' },
    { ref: '3:18',  focus: 'أَنَّهُ',        noteEn: 'أَنَّهُ لَا إِلَٰهَ إِلَّا هُوَ — doubled noon; avoid shortening below 2 counts.',               noteBn: 'أَنَّهُ-তে مُشَدَّد نّ — ২ হরকতের কম করবেন না।' },
    { ref: '3:126', focus: 'ثُمَّ',           noteEn: 'Doubled meem in ثُمَّ لَا يُنظَرُونَ — nasal resonance through the nasal cavity.',               noteBn: 'ثُمَّ-তে مُشَدَّد مّ — নাসারন্ধ্র থেকে অনুরণন।' },
    { ref: '73:20', focus: 'إِنَّ رَبَّكَ',  noteEn: 'إِنَّ رَبَّكَ يَعْلَمُ — clear 2-count ghunnah on the doubled noon; a common verse for drill.', noteBn: 'إِنَّ رَبَّكَ-তে مُشَدَّد نّ — ২ হরকত গুন্নাহ।' },
  ],

  qalqalah: [
    { ref: '112:4', focus: 'أَحَدٌ',            noteEn: 'Stopping on أَحَدٌ — دٌ gets waqf sukoon: maximum qalqalah (waqf is the strongest degree).',  noteBn: 'أَحَدٌ-তে ওয়াকফ: دٌ সর্বোচ্চ কলকলা।' },
    { ref: '89:1',  focus: 'وَالْفَجْرِ',      noteEn: 'ج bears sukoon in وَالْفَجْرِ — mid-strength bounce while continuing the recitation.',         noteBn: 'وَالْفَجْرِ-তে جْ সাকিন — মধ্যমাত্রার বাউন্স।' },
    { ref: '113:1', focus: 'الْفَلَقِ',         noteEn: 'Stopping on الْفَلَقِ — ق gets waqf sukoon: strong echo at the back of the throat.',           noteBn: 'الْفَلَقِ-তে ওয়াকফ: قِ-তে শক্তিশালী কলকলা।' },
    { ref: '96:1',  focus: 'اقْرَأْ',           noteEn: 'ق bears sukoon in اقْرَأْ — lighter mid-word qalqalah (not at waqf so less intense).',        noteBn: 'اقْرَأْ-তে قْ সাকিন — মধ্য-শব্দে হালকা কলকলা।' },
    { ref: '86:1',  focus: 'الطَّارِقِ',       noteEn: 'Stopping on الطَّارِقِ — ق at waqf: strong bounce from the back of the tongue.',               noteBn: 'الطَّارِقِ-তে ওয়াকফ: قِ-তে শক্তিশালী বাউন্স।' },
    { ref: '2:7',   focus: 'أَبْصَارِهِمْ',   noteEn: 'ب bears sukoon in أَبْصَارِهِمْ — qalqalah on the lips while recitation continues.',           noteBn: 'أَبْصَارِهِمْ-তে بْ সাকিন — ওয়াসলেও ঠোঁটে বাউন্স।' },
  ],

  // ── Noon Sākinah & Tanween ─────────────────────────────────────────────────
  izhar_halqi: [
    { ref: '2:106', focus: 'مِنْ آيَةٍ',      noteEn: 'نْ before ء (hamza) — pronounce the noon fully clear; no ghunnah, no merging.',               noteBn: 'ء-এর আগে نْ — নূন স্পষ্ট; গুন্নাহ বা মিলন নেই।' },
    { ref: '2:100', focus: 'مِنْهُمْ',         noteEn: 'نْ before هـ in مِنْهُمْ — izhar: noon is fully audible before the haa.',                    noteBn: 'هـ-এর আগে نْ — ইযহার: নূন হা-এর আগে শ্রুতিগোচর।' },
    { ref: '13:43', focus: 'وَمَنْ عِندَهُ',  noteEn: 'نْ before ع — izhar halqi: the noon is pronounced clearly, not hidden.',                      noteBn: 'ع-এর আগে نْ — ইযহার হালকি: নূন স্পষ্ট।' },
    { ref: '2:228', focus: 'عَزِيزٌ حَكِيمٌ', noteEn: 'Tanween (ٌ) before حَ — izhar halqi: the noon of tanween is fully clear.',                    noteBn: 'حَ-এর আগে তানউইন (ٌ) — ইযহার হালকি: নূন স্পষ্ট।' },
    { ref: '49:13', focus: 'عَلِيمٌ خَبِيرٌ', noteEn: 'Tanween (ٌ) before خَ — izhar halqi; note خَ is also a throat letter.',                      noteBn: 'خَ-এর আগে তানউইন — ইযহার হালকি; خَও গলার হরফ।' },
  ],

  izhar_mutlaq: [
    { ref: '2:132', focus: 'الدُّنْيَا',      noteEn: 'نْ before يَ inside ONE word — always clear izhar mutlaq; never merged (unlike cross-word idghaam).', noteBn: 'এক শব্দে نْ before يَ — সর্বদা স্পষ্ট ইযহার মুতলাক।' },
    { ref: '2:266', focus: 'بُنْيَانٌ',        noteEn: 'بُنْيَان: نْ before يَ within the same word — clear noon, no ghunnah.',                        noteBn: 'بُنْيَان-এ نْ before يَ — স্পষ্ট নূন, গুন্নাহ নেই।' },
    { ref: '6:99',  focus: 'قِنْوَانٌ',        noteEn: 'قِنْوَان: نْ before وَ within one word — izhar mutlaq.',                                        noteBn: 'قِنْوَان-এ নْ before وَ — একই শব্দে ইযহার মুতলাক।' },
    { ref: '13:4',  focus: 'صِنْوَانٌ',        noteEn: 'صِنْوَان: نْ before وَ inside one word — no merging; a classical textbook example.',            noteBn: 'صِنْوَان-এ نْ before وَ — মিলন নেই; পাঠ্যবইয়ের উদাহরণ।' },
  ],

  ikhfa: [
    { ref: '2:3',   focus: 'يُنفِقُونَ',       noteEn: 'نْ before ف — hide the noon lightly with ghunnah (~2 counts); between izhar and idghaam.',     noteBn: 'ف-এর আগে نْ — গুন্নাহসহ হালকা গোপন; ইযহার ও ইদগামের মাঝামাঝি।' },
    { ref: '2:25',  focus: 'مِن تَحْتِهَا',    noteEn: 'نْ before تَ in مِن تَحْتِهَا — ikhfa; the taa is not doubled.',                                noteBn: 'تَ-এর আগে نْ — ইখফা; تَ-তে শাদ্দা নেই।' },
    { ref: '3:92',  focus: 'مِن شَيْءٍ',        noteEn: 'نْ before شَ — ikhfa with ghunnah; the sheen does not double.',                                noteBn: 'شَ-এর আগে نْ — গুন্নাহসহ ইখফা।' },
    { ref: '4:94',  focus: 'مَنْ صَلَّى',       noteEn: 'نْ before صَ (emphatic letter) — ikhfa; ghunnah remains clearly nasal.',                       noteBn: 'صَ-এর আগে نْ — গুন্নাহ বজায় রেখে ইখফা।' },
    { ref: '27:29', focus: 'كِتَابٌ كَرِيمٌ',  noteEn: 'Tanween (ٌ) before كَ — ikhfa: hidden noon with nasal sound ~2 counts.',                       noteBn: 'كَ-এর আগে তানউইন (ٌ) — ~২ হরকত গুন্নাহসহ ইখফা।' },
    { ref: '4:1',   focus: 'أُنزِلَ',           noteEn: 'نْ before زَ in أُنزِلَ — ikhfa; a very common word across many verses.',                      noteBn: 'أُنزِلَ-তে نْ before زَ — সচরাচর দেখা ইখফার উদাহরণ।' },
  ],

  iqlab: [
    { ref: '2:18',  focus: 'صُمٌّ بُكْمٌ',      noteEn: 'Tanween (ٌ) before بُ — converts to a hidden meem sound on the lips, held with ghunnah.',     noteBn: 'بُ-এর আগে তানউইন (ٌ) — ঠোঁটে গোপন মীম, গুন্নাহসহ।' },
    { ref: '36:52', focus: 'مَن بَعَثَنَا',      noteEn: 'نْ before بَ across word boundary — noon turns into a hidden nasal meem (~2 counts).',        noteBn: 'بَ-এর আগে نْ — নূন গুন্নাহসহ মীমে রূপান্তর।' },
    { ref: '2:137', focus: 'شِقَاقٍ بَعِيدٍ',   noteEn: 'Tanween (ٍ) before بَ — iqlab: nasal meem sound closes the lips slightly.',                   noteBn: 'بَ-এর আগে তানউইন (ٍ) — ঠোঁটে নাকি মীম ধ্বনি।' },
    { ref: '3:73',  focus: 'مِن بَعْدِ',          noteEn: 'نْ before بَ — classic iqlab at a word boundary.',                                            noteBn: 'بَ-এর আগে نْ — শব্দ সীমায় ক্লাসিক ইকলাব।' },
    { ref: '4:150', focus: 'أَن بَيْنَ',          noteEn: 'نْ before بَ across words — iqlab with ghunnah; do not merge fully (that would be idghaam).',  noteBn: 'أَن بَيْنَ-তে نْ before بَ — গুন্নাহসহ ইকলাব।' },
  ],

  idghaam_ghunnah: [
    { ref: '3:37',  focus: 'مَن يَشَاءُ',         noteEn: 'نْ before يَ (across words) — noon merges into yaa with 2-count ghunnah; note shaddah on يَّ.', noteBn: 'يَ-এর আগে نْ — গুন্নাহসহ ইয়া-তে মিলন।' },
    { ref: '25:54', focus: 'مِن مَّاءٍ',           noteEn: 'نْ before مَ — merges into meem with ghunnah; the meem takes a shaddah (مَّ).',              noteBn: 'مَ-এর আগে نْ — গুن্নাহসহ মীমে মিলন; مَّ-তে শাদ্দা।' },
    { ref: '4:56',  focus: 'عَذَابٌ مُهِينٌ',     noteEn: 'Tanween (ٌ) before مُ — idghaam with ghunnah across a word boundary.',                       noteBn: 'مُ-এর আগে তানউইন (ٌ) — গুন্নাহসহ ইদগাম।' },
    { ref: '16:93', focus: 'أُمَّةً وَاحِدَةً',   noteEn: 'Tanween (ً) before وَ — noon merges into waaw with ghunnah.',                                noteBn: 'وَ-এর আগে তানউইন (ً) — গুন্নাহসহ ওয়াওতে মিলন।' },
    { ref: '4:173', focus: 'مِن نَّعِيمٍ',         noteEn: 'نْ before نَ — noon merges into noon with ghunnah; shaddah appears on نَّ.',                  noteBn: 'نَ-এর আগে نْ — গুন্নাহসহ মিলন; نَّ-তে শাদ্দা।' },
  ],

  idghaam_no_ghunnah: [
    { ref: '2:2',   focus: 'هُدًى لِّلْمُتَّقِينَ', noteEn: 'Tanween on هُدًى before لِّ — total merger into laam; no ghunnah, laam takes shaddah.',  noteBn: 'هُدًى-তে তানউইন + لِّ — লামে সম্পূর্ণ মিলন, গুন্নাহ নেই।' },
    { ref: '2:60',  focus: 'مِن رِّزْقِ',            noteEn: 'نْ before رِّ — noon completely absorbed into raa; no nasal sound at all.',                noteBn: 'رِّ-এর আগে نْ — রা-তে সম্পূর্ণ মিলন, কোনো নাসাল নেই।' },
    { ref: '3:38',  focus: 'مِن لَّدُنكَ',            noteEn: 'نْ before لَّ — noon fully absorbed into laam; no ghunnah.',                               noteBn: 'لَّ-এর আগে نْ — লামে সম্পূর্ণ মিলন, গুন্নাহ নেই।' },
    { ref: '4:96',  focus: 'غَفُورًا رَّحِيمًا',    noteEn: 'Tanween (ً) before رَّ — merges into raa with no ghunnah; raa takes shaddah.',              noteBn: 'رَّ-এর আগে তানউইন (ً) — রা-তে গুন্নাহবিহীন মিলন।' },
  ],

  // ── Meem Sākinah ──────────────────────────────────────────────────────────
  ikhfa_shafawi: [
    { ref: '36:65', focus: 'أَرْجُلُهُم بِمَا',     noteEn: 'Meem sakinah before بِ — lightly hidden on the lips with ghunnah; do not fully close.',   noteBn: 'مْ-এর পরে بِ — ঠোঁটে গুন্নাহসহ হালকা গোপন।' },
    { ref: '7:45',  focus: 'وَهُم بِالْآخِرَةِ',   noteEn: 'مْ before بِ — ikhfa shafawi: the lips barely close, a light labial hiding.',              noteBn: 'وَهُم before بِ — ঠোঁট সামান্য স্পর্শ, সম্পূর্ণ বন্ধ নয়।' },
    { ref: '59:14', focus: 'بَأْسُهُمْ بَيْنَهُمْ', noteEn: 'مْ before بَ — two ikhfa shafawi in one phrase; both times lips touch lightly with ghunnah.', noteBn: 'بَأْسُهُمْ بَيْنَهُمْ — একই বাক্যে দুটি মْ…بَ: উভয়বার ইখফা শাফাবি।' },
    { ref: '23:88', focus: 'كُنتُمْ بِهِ',           noteEn: 'مْ at end of كُنتُمْ before بِهِ — labial hiding with ghunnah.',                           noteBn: 'كُنتُمْ-এর مْ before بِهِ — ঠোঁটে গুন্নাহসহ ইখফা।' },
  ],

  idghaam_shafawi: [
    { ref: '2:46',  focus: 'أَنَّهُم مُّلَاقُو',   noteEn: 'مْ before مُّ — two meems merge into one doubled meem held with ghunnah.',                 noteBn: 'مْ before مُّ — দুই মীম মিশে এক مُشَدَّد মীম।' },
    { ref: '60:8',  focus: 'يُخْرِجُوكُم مِّن',    noteEn: 'مْ before مِّ — idghaam shafawi: the merged meem is held ~2 counts.',                      noteBn: 'مْ before مِّ — মিলিত মীম ~২ হরকত ধরুন।' },
    { ref: '10:42', focus: 'وَمِنْهُم مَّن',         noteEn: 'مْ before مَّ — total labial merger; no lip separation between the two meems.',            noteBn: 'مْ before مَّ — ঠোঁটে সম্পূর্ণ মিলন।' },
    { ref: '3:154', focus: 'أَهَمَّتْهُم مَّا',     noteEn: 'مْ before مَ — idghaam shafawi with ghunnah; a clear example in mid-verse.',              noteBn: 'مْ before مَ — গুন্নাহসহ ইদগাম শাফাবি।' },
  ],

  // ── Madd ──────────────────────────────────────────────────────────────────
  madd_2: [
    { ref: '1:3',   focus: 'الرَّحِيمِ',    noteEn: 'يِ madd: kasrah then يَ — stretch exactly 2 counts, neither more nor less.',                      noteBn: 'الرَّحِيمِ-তে يِ মাদ্দ — ঠিক ২ হরকত।' },
    { ref: '1:4',   focus: 'مَالِكِ',        noteEn: 'Alif madd: fathah then ا — natural stretch of 2 counts.',                                        noteBn: 'مَالِكِ-তে আলিফ মাদ্দ — ২ হরকত স্বাভাবিক।' },
    { ref: '2:23',  focus: 'وَادْعُوا',     noteEn: 'وُ madd: dammah then وَ — stretch 2 counts; a common verb form across the Quran.',               noteBn: 'وَادْعُوا-তে وُ মাদ্দ — ২ হরকত।' },
    { ref: '3:67',  focus: 'إِبْرَاهِيمَ', noteEn: 'Both alif madd (إِبْرَا) and yaa madd (هِيمَ) in one word — each 2 counts.',                      noteBn: 'إِبْرَاهِيمَ-তে আলিফ ও ইয়া মাদ্দ — প্রতিটি ২ হরকত।' },
    { ref: '2:2',   focus: 'الْكِتَابُ',    noteEn: 'Alif madd in كِتَاب — fathah before ا; 2 counts in continuous and at waqf (madd tabi\'i).',       noteBn: 'الْكِتَابُ-তে আলিফ মাদ্দ — ২ হরকত।' },
  ],

  madd_246: [
    { ref: '1:4',   focus: 'الدِّينِ',        noteEn: 'Stopping on الدِّينِ — يِ madd before waqf sukoon; choose 2, 4 or 6 and keep it consistent throughout.', noteBn: 'الدِّينِ-তে ওয়াকফ — ২, ৪ বা ৬ হরকত; ধারাবাহিক রাখুন।' },
    { ref: '1:5',   focus: 'نَسْتَعِينُ',     noteEn: 'Stopping on نَسْتَعِينُ — يِ madd; flexible 2/4/6 at waqf.',                                    noteBn: 'نَسْتَعِينُ-তে ওয়াকফ — ২/৪/৬ নমনীয়।' },
    { ref: '1:2',   focus: 'الْعَالَمِينَ',  noteEn: 'Stopping on الْعَالَمِينَ — يِ madd before the waqf sukoon on نَ.',                              noteBn: 'الْعَالَمِينَ-তে ওয়াকফ — يِ মাদ্দ, নমনীয়।' },
    { ref: '108:1', focus: 'الْكَوْثَرَ',    noteEn: 'Stopping on الْكَوْثَرَ — alif madd (وَثَرَ: the ا before رَ at waqf) → 2, 4 or 6 counts.',     noteBn: 'الْكَوْثَرَ-তে ওয়াকফ — আলিফ মাদ্দ, ২/৪/৬।' },
    { ref: '112:2', focus: 'الصَّمَدُ',       noteEn: 'No madd letter before the final دُ — no madd \'aridh here; contrast to sharpen recognition.',   noteBn: 'الصَّمَدُ-তে দ-এর আগে মাদ্দের হরফ নেই — মাদ্দ আরিদ নয়।' },
  ],

  madd_aridh: [
    { ref: '1:7',   focus: 'الضَّالِّينَ',   noteEn: 'Stopping at verse end — يَ madd (يِ in لِّينَ) + نَ becomes sukoon at waqf → 2, 4 or 6 counts.', noteBn: 'آয়াত শেষে ওয়াকফ — يِ মাদ্দ + ن সাময়িক সাকিন → ২,৪,৬।' },
    { ref: '2:255', focus: 'الْقَيُّومُ',    noteEn: 'Stopping on الْقَيُّومُ — وُ madd then مُ gets waqf sukoon: madd \'aridh.',                       noteBn: 'الْقَيُّومُ-তে ওয়াকফ: وُ মাদ্দ — মাদ্দ আরিদ।' },
    { ref: '1:1',   focus: 'الرَّحِيمِ',     noteEn: 'Stopping at end of basmalah — يِ madd in الرَّحِيمِ before waqf sukoon: 2/4/6.',                 noteBn: 'الرَّحِيمِ-তে ওয়াকফ — يِ মাদ্দ → ২/৪/৬।' },
    { ref: '55:27', focus: 'وَالْإِكْرَامِ', noteEn: 'Stopping on وَالْإِكْرَامِ — alif madd + مِ gets waqf sukoon: madd \'aridh.',                    noteBn: 'وَالْإِكْرَامِ-তে ওয়াকফ — আলিফ মাদ্দ → মাদ্দ আরিদ।' },
    { ref: '36:83', focus: 'تُرْجَعُونَ',    noteEn: 'Stopping here — وُ madd before نَ at waqf; a verse-final madd \'aridh.',                         noteBn: 'تُرْجَعُونَ-তে ওয়াকফ — وُ মাদ্দ, মাদ্দ আরিদ।' },
  ],

  madd_lin: [
    { ref: '106:4', focus: 'خَوْفٍ',          noteEn: 'Stopping on خَوْفٍ — وْ (fathah + و with sukoon) before final ف at waqf: liin madd 2/4/6.',     noteBn: 'خَوْفٍ-তে ওয়াকফ — وْ (فتح + و সাকিন): মাদ্দ লিন ২/৪/৬।' },
    { ref: '2:2',   focus: 'رَيْبٌ',           noteEn: 'Stopping on رَيْبٌ — يْ (fathah + يَ with sukoon) before بٌ at waqf: soft liin madd.',           noteBn: 'رَيْبٌ-তে ওয়াকফ — يْ (فتح + يَ সাকিন): মাদ্দ লিন।' },
    { ref: '114:1', focus: 'قُرَيْشٍ',         noteEn: 'Stopping on قُرَيْشٍ (surah 106) — يْ before شٍ at waqf: madd liin.',                          noteBn: 'قُرَيْشٍ-তে ওয়াকফ — يْ সাকিন: মাদ্দ লিন।' },
    { ref: '34:46', focus: 'الْجِنِّ وَالْإِنسِ', noteEn: 'No liin here — contrast: لِين requires و/ي with sukoon AFTER a fathah, not after kasrah.', noteBn: 'এখানে মাদ্দ লিন নেই — ফাতহার পরে و/ي সাকিন হওয়া চাই।' },
    { ref: '69:28', focus: 'مَالِيَهْ',         noteEn: 'يَ in مَالِيَهْ — this is يَ with fathah, not liin (liin needs يْ with sukoon after fathah).',   noteBn: 'مَالِيَهْ-তে يَ ফাতহাসহ — এটি মাদ্দ লিন নয়।' },
    { ref: '9:51',  focus: 'خَوْفًا',           noteEn: 'Stopping on خَوْفًا — وْ (fathah + و sukoon) + ف at waqf; tanween drops: madd liin 2/4/6.',    noteBn: 'خَوْفًا-তে ওয়াকফ — وْ সাকিন: মাদ্দ লিন।' },
  ],

  madd_badal: [
    { ref: '2:62',  focus: 'آمَنُوا',          noteEn: 'آمَنَ: hamza + alif madd (the long ā replaced an original hamza) — recite as 2 counts in Hafs.', noteBn: 'آمَنَ-তে হামযা + আলিফ মাদ্দ — হাফসে ২ হরকত।' },
    { ref: '2:3',   focus: 'إِيمَانٌ',          noteEn: 'إِيمَان: hamza + yaa madd — the madd substitutes for an original hamza; 2 counts.',             noteBn: 'إِيمَان-তে هَمْزَة + يِ মাদ্দ — হামযার স্থলে ২ হরকত।' },
    { ref: '3:44',  focus: 'أُوتِيَ',           noteEn: 'أُوتِيَ: hamza + waaw madd — a badal madd; 2 counts.',                                         noteBn: 'أُوتِيَ-তে هَمْزَة + وُ মাদ্দ — মাদ্দ বদল, ২ হরকত।' },
    { ref: '2:31',  focus: 'آدَمَ',              noteEn: 'آدَمَ: hamza before alif madd — the stretched ā is a badal madd; 2 counts in Hafs.',            noteBn: 'آدَمَ-তে হামযা + আলিফ মাদ্দ — মাদ্দ বদল।' },
    { ref: '3:33',  focus: 'آلَ',                noteEn: 'آلَ: hamza + alif madd — badal madd of 2 counts.',                                             noteBn: 'آلَ-তে هَمْزَة + আলিফ মাদ্দ — ২ হরকত মাদ্দ বদল।' },
  ],

  madd_iwad: [
    { ref: '4:24',  focus: 'فَرِيضَةً',         noteEn: 'Stopping on فَرِيضَةً — tanween fathah (ً) drops; alif compensation of 2 counts: فَرِيضَةَ.',  noteBn: 'فَرِيضَةً-তে ওয়াকফ — তানউইন বাদ, ফাতহায় ২ হরকত ক্ষতিপূরণ।' },
    { ref: '4:93',  focus: 'عَظِيمًا',           noteEn: 'Stopping on عَظِيمًا → عَظِيمَا: the ً drops, the fathah on م stretches 2 counts.',            noteBn: 'عَظِيمًا-তে ওয়াকফ → عَظِيمَا: মাদ্দ ইওয়াদ।' },
    { ref: '2:137', focus: 'عَلِيمًا',           noteEn: 'Stopping on عَلِيمًا → عَلِيمَا: tanween fathah converts to 2-count madd.',                    noteBn: 'عَلِيمًا → عَلِيمَا ওয়াকফে: তানউইন বাদ, ২ হরকত।' },
    { ref: '1:7',   focus: 'الضَّالِّينَ',       noteEn: 'No madd \'iwad here — يَ already has a madd; \'iwad applies only to ً (tanwin fathah).',        noteBn: 'এখানে মাদ্দ ইওয়াদ নয় — ً (তানউইন ফাতহা) হলেই ইওয়াদ।' },
    { ref: '4:171', focus: 'رَسُولُهُ وَكَلِمَتُهُ', noteEn: 'No ً here — \'iwad applies only when a word ends in tanwin fathah (ً) and you stop.', noteBn: 'এখানে ً নেই — মাদ্দ ইওয়াদ শুধু ـً-তে থামলে।' },
  ],

  madd_muttasil: [
    { ref: '2:87',  focus: 'جَاءَكُمْ',          noteEn: 'Alif madd then ء in same word — obligatory (wajib) stretch of 4–5 counts.',                  noteBn: 'جَاءَكُمْ-তে آلف مَدّ + ء একই শব্দে — ৪–৫ হরকত ওয়াজিব।' },
    { ref: '2:19',  focus: 'السَّمَاءِ',          noteEn: 'Alif madd then ء in السَّمَاء — connected madd; 4–5 counts (obligatory).',                    noteBn: 'السَّمَاءِ-তে আলিফ মাদ্দ + ء একই শব্দে — ৪–৫ হরকত।' },
    { ref: '2:6',   focus: 'سَوَاءٌ',             noteEn: 'Alif madd then ء in سَوَاء — muttasil; stretch 4–5 counts.',                                  noteBn: 'سَوَاءٌ-তে আলিফ মাদ্দ + ء — মুত্তাসিল, ৪–৫ হরকত।' },
    { ref: '4:93',  focus: 'يَشَاءُ',             noteEn: 'يَشَاءُ — alif madd + ء in one word: connected madd; 4–5 counts obligatory.',                noteBn: 'يَشَاءُ-তে আলিফ + ء একই শব্দে — ওয়াজিব মাদ্দ।' },
    { ref: '2:148', focus: 'الْمَاءِ',             noteEn: 'Alif madd before ء in الْمَاء — same-word hamza: muttasil, 4–5 counts.',                     noteBn: 'الْمَاءِ-তে আলিফ মাদ্দ + ء — মুত্তাসিল।' },
  ],

  madd_munfasil: [
    { ref: '108:1', focus: 'إِنَّا أَعْطَيْنَاكَ', noteEn: 'Alif madd at end of إِنَّا, hamza starts أَعْطَيْنَاكَ — separated madd; 4–5 counts.',    noteBn: 'إِنَّا শেষে مَدّ, أَعْطَيْنَاكَ-এর শুরুতে ء — ৪–৫ হরকত।' },
    { ref: '114:1', focus: 'قُلْ أَعُوذُ',         noteEn: 'وُ madd ends قُلْ, ء starts أَعُوذُ — munfasil; 4–5 counts.',                               noteBn: 'قُلْ-এর وُ মাদ্দ + أَعُوذُ-র ء — মুনফাসিল ৪–৫।' },
    { ref: '4:1',   focus: 'يَا أَيُّهَا',          noteEn: 'Alif madd in يَا then ء starts أَيُّهَا — separated; 4–5 counts consistently.',            noteBn: 'يَا-এর আলিফ মাদ্দ + أَيُّهَا-র ء — মুনফাসিল।' },
    { ref: '2:163', focus: 'لَا إِلَٰهَ إِلَّا',    noteEn: 'لَا ends with alif madd, إِلَٰهَ starts with ء — munfasil; 4–5 counts.',                    noteBn: 'لَا-এর আলিফ + إِلَٰهَ-র ء — মুনফাসিল ৪–৫।' },
    { ref: '1:5',   focus: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ', noteEn: 'يِ madd in the first إِيَّاكَ continues into the verse — practise consistent length.', noteBn: 'إِيَّاكَ-তে يِ মাদ্দ — ধারাবাহিক দৈর্ঘ্য অনুশীলন করুন।' },
  ],

  madd_6: [
    { ref: '2:1',   focus: 'الٓمٓ',               noteEn: 'ل (laam) in الٓمٓ — each muqaṭṭaʿa letter is a separate recitation unit; لَامْ has madd lazim of 6 counts.', noteBn: 'الٓمٓ-তে لَامْ — প্রতিটি হরফ আলাদা; ৬ হরকত মাদ্দ লাযিম।' },
    { ref: '10:1',  focus: 'الٓرٰ',               noteEn: 'الٓرٰ — لَامْ has 6-count madd lazim; رَا does not (natural 2-count).',                          noteBn: 'الٓرٰ-তে لَامْ-এ ৬ হরকত; رَا-তে মাদ্দ লাযিম নয়।' },
    { ref: '36:1',  focus: 'يٰسٓ',                noteEn: 'يٰسٓ — يَا has 6-count madd lazim; one of the most-recited muqaṭṭaʿa openings.',               noteBn: 'يٰسٓ-তে يَا-তে ৬ হরকত — সর্বাধিক পঠিত মুকাত্তা আলিফ।' },
    { ref: '40:1',  focus: 'حٰمٓ',                noteEn: 'حٰمٓ — حَا has 6-count madd lazim; مِيمْ too; both must be 6 counts.',                          noteBn: 'حٰمٓ-তে حَا ও مِيمْ উভয়েই ৬ হরকত।' },
    { ref: '50:1',  focus: 'قٓ',                  noteEn: 'قٓ — قَافْ contains a madd letter (alif) + sukoon: madd lazim 6 counts.',                      noteBn: 'قٓ-তে قَافْ: আলিফ + সাকিন — ৬ হরকত মাদ্দ লাযিম।' },
    { ref: '68:1',  focus: 'نٓ',                  noteEn: 'نٓ — نُونْ contains a madd letter (و) + sukoon; 6-count madd lazim.',                          noteBn: 'نٓ-তে نُونْ: و + সাকিন — ৬ হরকত মাদ্দ লাযিম।' },
  ],

  // ── Other rules ────────────────────────────────────────────────────────────
  idghaam_mutajanisayn: [
    { ref: '4:28',  focus: 'بَسَطتَ',             noteEn: 'ط before تَ — same makhraj (tongue-tip/gum), ط merges fully into تَ.',                       noteBn: 'بَسَطتَ-তে ط before تَ — একই মাখরাজ, ط মিশে যায়।' },
    { ref: '27:22', focus: 'أَحَطتُ',              noteEn: 'ط before تُ in أَحَطتُ بِهِ — the ط is absorbed into the following ت.',                      noteBn: 'أَحَطتُ-তে ط before تُ — ط শোষিত হয়।' },
    { ref: '7:176', focus: 'يَلْهَث ذَّٰلِكَ',   noteEn: 'ث before ذَّ — both interdental letters; ث merges into ذَّ.',                                 noteBn: 'يَلْهَث ذَّٰلِكَ-তে ث before ذَّ — আন্তদন্তীয় মিলন।' },
    { ref: '11:42', focus: 'ارْكَب مَّعَنَا',     noteEn: 'ب before مَّ — both labial letters; ب merges into meem (idghaam mutajanisayn).',              noteBn: 'ارْكَب مَّعَنَا-তে ب before مَّ — ঠোঁটের হরফ মিলন।' },
  ],

  idghaam_mutaqaribayn: [
    { ref: '77:20', focus: 'أَلَمْ نَخْلُقكُّم', noteEn: 'ق before كُّ — close (but not identical) makhraj; ق completely absorbed into كُّ.',             noteBn: 'نَخْلُقكُّم-তে ق before ك — কাছাকাছি মাখরাজ; ق মিশে যায়।' },
    { ref: '4:158', focus: 'بَلْ رَّفَعَهُ',       noteEn: 'ل before رَّ — both tongue-tip letters with close articulation; ل absorbed into رَّ.',        noteBn: 'بَلْ رَّفَعَهُ-তে ل before رَّ — জিহ্বার অগ্র-হরফ মিলন।' },
    { ref: '17:45', focus: 'قَالَ رَبِّ',           noteEn: 'ل before رَ — if the ل has sukoon (at waqf context or specific readings); mutaqaribayn.',    noteBn: 'ل before رَ — কাছাকাছি মাখরাজ: মুতাকারিবাইন।' },
  ],

  hamzat_wasl: [
    { ref: '1:1',   focus: 'ٱللَّهِ',              noteEn: 'Start at ٱللَّهِ: ا is pronounced "al-". Connecting from بِسْمِ: ا is silent, لل immediately joins.', noteBn: 'ٱللَّهِ থেকে শুরু: ا উচ্চারিত। বিসমি থেকে: ا নীরব।' },
    { ref: '1:6',   focus: 'ٱهْدِنَا',              noteEn: 'ا in ٱهْدِنَا is hamzat al-wasl — silent in connected recitation, pronounced only when starting here.', noteBn: 'ٱهْدِنَا-তে ا হামযাতুল ওয়াসল — ওয়াসলে নীরব।' },
    { ref: '96:1',  focus: 'ٱقْرَأْ',               noteEn: 'ا in ٱقْرَأْ is hamzat al-wasl — drop it when joining from a previous word.',                 noteBn: 'ٱقْرَأْ-তে ا হামযাতুল ওয়াসল — আগের শব্দ থেকে যুক্ত হলে নীরব।' },
    { ref: '2:58',  focus: 'ٱدْخُلُوا',              noteEn: 'ا in ٱدْخُلُوا — pronounced with a kasra vowel "id-" when starting alone.',                   noteBn: 'ٱدْخُلُوا-তে ا — এককভাবে শুরু করলে কাসরাসহ।' },
    { ref: '3:97',  focus: 'ٱسْتَطَاعَ',             noteEn: 'ا in ٱسْتَطَاعَ — hamzat al-wasl with kasra; silent when flowing from previous word.',          noteBn: 'ٱسْتَطَاعَ-তে ا হামযাতুল ওয়াসল — কাসরাসহ, ওয়াসলে নীরব।' },
  ],

  lam_shamsiyyah: [
    { ref: '91:1',  focus: 'وَالشَّمْسِ',           noteEn: 'ل of ال before شَ — silent; شَ doubles: الشَّمْس. The sun letters (14) assimilate the lam.', noteBn: 'شَ-এর আগে ال-এর ل নীরব; شَ-তে শাদ্দা — সূর্য হরফ।' },
    { ref: '1:1',   focus: 'الرَّحْمَٰنِ',           noteEn: 'ل of ال before رَ — silent; رَ doubles.',                                                     noteBn: 'رَ-এর আগে ال-এর ل নীরব; رَ-তে শাদ্দা।' },
    { ref: '2:3',   focus: 'الصَّلَاةَ',             noteEn: 'ل of ال before صَ — lam shamsiyyah; صَ takes a shaddah.',                                    noteBn: 'صَ-এর আগে ال-এর ل নীরব — صَ-তে শাদ্দা।' },
    { ref: '114:1', focus: 'النَّاسِ',               noteEn: 'ل of ال before نَ — lam silent; نَّ doubles.',                                               noteBn: 'نَ-এর আগে ال-এর ل নীরব; نَّ।' },
    { ref: '91:3',  focus: 'وَالنَّهَارِ',           noteEn: 'ل of ال before نَ — silent; نَّ is doubled.',                                                noteBn: 'وَالنَّهَارِ-তে ل নীরব, نَّ ডবল।' },
  ],

  lam_qamariyyah: [
    { ref: '1:1',   focus: 'الْحَمْدُ',              noteEn: 'ل of ال before حَ — moon letter; lam is fully pronounced.',                                   noteBn: 'حَ-এর আগে ال-এর ل স্পষ্ট — চাঁদের হরফ।' },
    { ref: '2:2',   focus: 'الْكِتَابُ',              noteEn: 'ل of ال before كِ — moon letter; lam audible, كِ takes no shaddah.',                         noteBn: 'كِ-এর আগে ال-এর ل স্পষ্ট; شَدَّة নেই।' },
    { ref: '1:2',   focus: 'الْعَالَمِينَ',          noteEn: 'ل of ال before عَ — moon letter; lam clearly heard.',                                         noteBn: 'عَ-এর আগে ال-এর ل শ্রুতিগোচর।' },
    { ref: '2:255', focus: 'الْقَيُّومُ',            noteEn: 'ل of ال before قَ — moon letter; lam pronounced clearly.',                                    noteBn: 'قَ-এর আগে ال-এর ল স্পষ্ট।' },
    { ref: '2:3',   focus: 'الآخِرَةِ',               noteEn: 'ل of ال before ء (hamza) — always a moon letter; lam clear, no shaddah on ء.',               noteBn: 'ء-এর আগে ال-এর ل স্পষ্ট — ء সর্বদা চাঁদের হরফ।' },
  ],

  silent: [
    { ref: '2:14',  focus: 'قَالُوا۟',               noteEn: 'The final ا after و in قَالُوا is a silent spelling alif — written in all jama\' verb forms, never pronounced.', noteBn: 'قَالُوا-এর شেষ ا বর্ণগত আলিফ — উচ্চারিত হয় না।' },
    { ref: '2:7',   focus: 'كَفَرُوا۟',               noteEn: 'Same silent alif in كَفَرُوا — pronunciation ends at وَ; the ا is a distinguishing orthographic mark.', noteBn: 'كَفَرُوا-তে একই নীরব আলিফ — و-তেই উচ্চারণ শেষ।' },
    { ref: '3:93',  focus: 'آمَنُوا۟',                noteEn: 'آمَنُوا — the trailing ا is silent; a consistent pattern across every plural perfect verb in the Quran.', noteBn: 'آمَنُوا-তে শেষ ا নীরব — সকল জমা মাযি ক্রিয়ায় একই।' },
    { ref: '18:38', focus: 'لَّٰكِنَّا۟',              noteEn: 'The alif at the end of لَّٰكِنَّا is written but dropped in continuous recitation (only heard if stopping here).', noteBn: 'لَّٰكِنَّا-এর শেষ ا ওয়াসলে নীরব — ওয়াকফে শোনা যায়।' },
  ],

  // ── Ra' rules ─────────────────────────────────────────────────────────────
  ra_tafkhim: [
    { ref: '1:2',   focus: 'رَبِّ',                  noteEn: 'رَ with fathah — fill the mouth; this is the default heavy ra\'.',                            noteBn: 'رَبِّ-তে رَ ফাতহাসহ — মুখ ভরে উচ্চারণ।' },
    { ref: '55:1',  focus: 'الرَّحْمَٰنُ',           noteEn: 'رَّ with fathah and shaddah — clearly heavy.',                                                noteBn: 'الرَّحْمَٰنُ-তে رَّ ফাতহা + শাদ্দা — স্পষ্ট তাফখিম।' },
    { ref: '16:1',  focus: 'أَمْرُ',                  noteEn: 'رُ with dammah in أَمْرُ اللَّهِ — heavy ra\'.',                                              noteBn: 'أَمْرُ-তে رُ দাম্মাসহ — ভারী উচ্চারণ।' },
    { ref: '1:6',   focus: 'الصِّرَاطَ',             noteEn: 'رَا in الصِّرَاطَ — the ر carries fathah: tafkhim despite the kasrah on صِ.',                 noteBn: 'الصِّرَاطَ-তে رَ ফাতহাসহ — তাফখিম।' },
    { ref: '2:49',  focus: 'إِسْرَائِيلَ',           noteEn: 'رَ in إِسْرَائِيلَ has fathah — tafkhim; do not let the surrounding kasra soften it.',        noteBn: 'إِسْرَائِيلَ-তে رَ ফাতহাসহ — পার্শ্ব কাসরা সত্ত্বেও তাফখিম।' },
  ],

  ra_tarqiq: [
    { ref: '13:26', focus: 'الرِّزْقَ',              noteEn: 'رِ with kasrah in الرِّزْق — light, thin pronunciation; tongue stays low.',                    noteBn: 'الرِّزْقَ-তে رِ কাসরাসহ — পাতলা তারকিক।' },
    { ref: '4:34',  focus: 'الرِّجَالُ',             noteEn: 'رِ with kasrah in الرِّجَال — tarqiq; light ra\'.',                                           noteBn: 'الرِّجَالُ-তে رِ কাসরাসহ — তারকিক।' },
    { ref: '2:49',  focus: 'فِرْعَوْنَ',             noteEn: 'رْ in فِرْعَوْن has sukoon, preceded by kasrah on فِ — tarqiq (light ra\').',                  noteBn: 'فِرْعَوْنَ-তে رْ সাকিন, فِ-তে কাসরা — তারকিক।' },
    { ref: '1:7',   focus: 'غَيْرِ',                  noteEn: 'رِ with kasrah in غَيْرِ — tarqiq: light ra\' at end of phrase.',                             noteBn: 'غَيْرِ-তে رِ কাসরাসহ — হালকা তারকিক।' },
    { ref: '2:87',  focus: 'جِبْرِيلَ',              noteEn: 'رِ in جِبْرِيل — kasrah on ر: tarqiq.',                                                       noteBn: 'جِبْرِيلَ-তে رِ কাসরাসহ — তারকিক।' },
  ],

  // ── Waqf & special-letter rules ────────────────────────────────────────────
  ha_sakt: [
    { ref: '69:19', focus: 'كِتَابِيَهْ',            noteEn: 'هَاء السَّكْت at waqf — pronounced only when stopping; dropped when joining to the next word.',  noteBn: 'كِتَابِيَهْ-তে হা আস-সাকত — ওয়াকফে পড়া, ওয়াসলে বাদ।' },
    { ref: '69:20', focus: 'حِسَابِيَهْ',            noteEn: 'Silent هـ preserves the long vowel when stopping on حِسَابِيَهْ.',                             noteBn: 'حِسَابِيَهْ-তে নীরব هـ — ওয়াকফে দীর্ঘ স্বর রক্ষা।' },
    { ref: '69:25', focus: 'كِتَابِيَهْ',            noteEn: 'Second occurrence of كِتَابِيَهْ (the disbeliever\'s cry) — same هَاء السَّكْت rule.',          noteBn: 'দ্বিতীয় كِتَابِيَهْ — একই هـ আস-সাকতের নিয়ম।' },
    { ref: '69:28', focus: 'مَالِيَهْ',              noteEn: 'مَالِيَهْ — هَاء السَّكْت prevents elision of the يَ at waqf.',                                  noteBn: 'مَالِيَهْ-তে হা আস-সাকত — ওয়াকফে يَ বজায় থাকে।' },
    { ref: '69:29', focus: 'سُلْطَانِيَهْ',          noteEn: 'سُلْطَانِيَهْ — هَاء السَّكْت at waqf; connect and it vanishes completely.',                    noteBn: 'سُلْطَانِيَهْ-তে هـ আস-সাকত — ওয়াসলে অদৃশ্য।' },
  ],

  sakt: [
    { ref: '18:1',  focus: 'عِوَجًا ۜ قَيِّمًا',     noteEn: 'Sakt after عِوَجًا — brief silent pause without breathing before قَيِّمًا; marks the contrast between crookedness and straightness.', noteBn: 'عِوَجًا-র পর সাকত — শ্বাস ছাড়াই স্বল্প বিরতি, তারপর قَيِّمًا।' },
    { ref: '36:52', focus: 'مَرْقَدِنَا ۜ هَٰذَا',   noteEn: 'Sakt after مَرْقَدِنَا — the pause marks the shift between the disbelievers\' words and the reply.',  noteBn: 'مَرْقَدِنَا-র পর সাকত — বক্তা পরিবর্তনের পূর্বে বিরতি।' },
    { ref: '75:27', focus: 'مَنْ ۜ رَاقٍ',           noteEn: 'Sakt on مَنْ before رَاقٍ — prevents نْ from merging into رَ (which would otherwise be idghaam mutaqaribayn).', noteBn: 'مَنْ-এর পর সাকত — نْ কে رَ-তে মিশতে বাধা দেয়।' },
    { ref: '83:14', focus: 'بَلْ ۜ رَانَ',           noteEn: 'Sakt on بَلْ before رَانَ — prevents ل from merging into رَ; these are the only four sakt positions in Hafs.',  noteBn: 'بَلْ-এর পর সাকত — ل কে رَ-তে মিশতে বাধা; হাফসে মোট চার স্থান।' },
  ],

  // ── Meem Sākinah: Iẓhār Shafawī ─────────────────────────────────────────────
  izhar_shafawi: [
    { ref: '1:2',   focus: 'الْحَمْدُ',        noteEn: 'مْ before د in الْحَمْدُ — pronounce the meem clearly, no ghunnah, no hiding.',              noteBn: 'الْحَمْدُ-তে مْ before د — মীম স্পষ্ট, গুন্নাহ নেই।' },
    { ref: '1:7',   focus: 'أَنْعَمْتَ',       noteEn: 'مْ before تَ in أَنْعَمْتَ — clear izhar shafawi.',                                           noteBn: 'أَنْعَمْتَ-তে مْ before تَ — স্পষ্ট ইযহার শাফাবি।' },
    { ref: '1:7',   focus: 'عَلَيْهِمْ غَيْرِ', noteEn: 'مْ before غَ across words — meem clear; note غ is a heavy letter but the meem stays light.',   noteBn: 'عَلَيْهِمْ before غَيْرِ — مْ স্পষ্ট, মীম হালকা।' },
    { ref: '112:3', focus: 'لَمْ يَلِدْ',       noteEn: 'مْ before يَ — a careful case: keep the meem clearly separate from the yaa, no ghunnah.',      noteBn: 'لَمْ before يَ — সতর্ক স্থান: মীম ইয়া থেকে আলাদা, গুন্নাহ নেই।' },
    { ref: '2:25',  focus: 'لَهُمْ فِيهَا',     noteEn: 'مْ before ف — the trickiest case: do NOT hide the meem into the faa; pronounce it clearly.',   noteBn: 'مْ before ف — কঠিনতম স্থান: মীমকে ف-এ গোপন করবেন না, স্পষ্ট রাখুন।' },
  ],

  // ── Idghām of two identical letters ─────────────────────────────────────────
  idghaam_mutamathilayn: [
    { ref: '2:60',  focus: 'اضْرِب بِّعَصَاكَ', noteEn: 'بْ before بِّ — identical letters; the first ب merges fully into the second (بّ takes shaddah).', noteBn: 'اضْرِب بِّعَصَاكَ-তে بْ before بِّ — অভিন্ন হরফ, প্রথম ب দ্বিতীয়টিতে মিশে যায়।' },
    { ref: '5:61',  focus: 'قَد دَّخَلُوا',     noteEn: 'دْ before دَّ — the د of قَد merges completely into the following دَّ.',                       noteBn: 'قَد دَّخَلُوا-তে دْ before دَّ — قَد-এর দাল সম্পূর্ণ মিশে যায়।' },
    { ref: '4:78',  focus: 'يُدْرِككُّمُ',       noteEn: 'كْ before كُّ within يُدْرِككُّمُ — two identical kaafs merge into one doubled كّ.',          noteBn: 'يُدْرِككُّمُ-তে كْ before كُّ — দুই অভিন্ন কাফ মিশে এক مُشَدَّد كّ।' },
    { ref: '21:87', focus: 'إِذ ذَّهَبَ',       noteEn: 'ذْ before ذَّ — the ذ of إِذ merges completely into the following ذَّ (shaddah).',            noteBn: 'إِذ ذَّهَبَ-তে ذْ before ذَّ — إِذ-এর ذ সম্পূর্ণ মিশে যায়।' },
  ],

  // ── Lafẓ al-Jalālah: the lām of "Allāh" ─────────────────────────────────────
  lafz_jalalah: [
    { ref: '112:1', focus: 'هُوَ اللَّهُ',      noteEn: 'اللَّهُ after the fathah of هُوَ — heavy lām (tafkhim): fill the mouth.',                     noteBn: 'هُوَ-এর ফাতহার পরে اللَّهُ — ভারী লাম (তাফখিম)।' },
    { ref: '3:18',  focus: 'شَهِدَ اللَّهُ',     noteEn: 'اللَّهُ after the fathah of شَهِدَ — heavy lām.',                                             noteBn: 'شَهِدَ-এর ফাতহার পরে اللَّهُ — ভারী লাম।' },
    { ref: '5:110', focus: 'قَالَ اللَّهُ',      noteEn: 'اللَّهُ after the fathah of قَالَ — tafkhim; the classic heavy lām of the Name.',            noteBn: 'قَالَ-এর ফাতহার পরে اللَّهُ — তাফখিম, ভারী লাম।' },
    { ref: '1:1',   focus: 'بِسْمِ اللَّهِ',     noteEn: 'اللَّهِ after the kasrah of بِسْمِ — light lām (tarqiq): thin and soft.',                     noteBn: 'بِسْمِ-এর কাসরার পরে اللَّهِ — হালকা লাম (তারকিক)।' },
    { ref: '1:2',   focus: 'الْحَمْدُ لِلَّهِ',  noteEn: 'لِلَّهِ after the kasrah of لِ — light lām; contrast this with the heavy cases above.',        noteBn: 'لِلَّهِ-তে কাসরার পরে লাম হালকা — উপরের ভারী উদাহরণের বিপরীত।' },
  ],

  // ── Istiʿlāʾ: the seven ever-heavy letters ──────────────────────────────────
  tafkhim_istila: [
    { ref: '96:2',  focus: 'خَلَقَ',            noteEn: 'خ (and ق) in خَلَقَ — letters of istiʿlāʾ; always heavy, whatever the vowel.',               noteBn: 'خَلَقَ-তে خ (ও ق) — ইসতিলার হরফ; সর্বদা ভারী।' },
    { ref: '1:6',   focus: 'الصِّرَاطَ',        noteEn: 'ص and ط in الصِّرَاطَ — heavy despite the kasrah on ص; isti\'la overrides the vowel.',        noteBn: 'الصِّرَاطَ-তে ص ও ط — কাসরা সত্ত্বেও ভারী; ইসতিলা স্বরচিহ্নকে ছাপিয়ে যায়।' },
    { ref: '1:7',   focus: 'الضَّالِّينَ',      noteEn: 'ض in الضَّالِّينَ — a heavy isti\'la letter unique to Arabic.',                               noteBn: 'الضَّالِّينَ-তে ض — আরবির স্বতন্ত্র ভারী ইসতিলা হরফ।' },
    { ref: '1:7',   focus: 'غَيْرِ',             noteEn: 'غ in غَيْرِ — heavy, from the top of the throat; keep it full even before a kasrah.',         noteBn: 'غَيْرِ-তে غ — গলার উপর থেকে ভারী; কাসরার আগেও পূর্ণ রাখুন।' },
    { ref: '2:255', focus: 'الْعَظِيمُ',        noteEn: 'ظ in الْعَظِيمُ — a heavy isti\'la letter; the tongue-tip touches the upper teeth, mouth full.', noteBn: 'الْعَظِيمُ-তে ظ — ভারী ইসতিলা হরফ; জিহ্বার অগ্র উপরের দাঁতে, মুখ ভরা।' },
    { ref: '112:1', focus: 'قُلْ',               noteEn: 'ق in قُلْ — deepest isti\'la letter; a full, heavy uvular stop.',                             noteBn: 'قُلْ-তে ق — গভীরতম ইসতিলা হরফ; পূর্ণ ভারী উচ্চারণ।' },
  ],

  // ── Madd al-Ṣilah ───────────────────────────────────────────────────────────
  madd_silah: [
    { ref: '2:255', focus: 'لَهُ مَا',           noteEn: 'ـهُ between two vowels, next letter مَ (not hamza) — Silah Sughra: stretch 2 counts as a hidden waaw.', noteBn: 'لَهُ مَا-তে ـهُ দুই স্বরের মাঝে, পরে مَ — সিলাহ সুগরা: ২ হরকত।' },
    { ref: '2:37',  focus: 'إِنَّهُ هُوَ',       noteEn: 'ـهُ in إِنَّهُ before هُوَ — Silah Sughra, 2 counts (a hidden waaw after the dammah).',       noteBn: 'إِنَّهُ before هُوَ — সিলাহ সুগরা, ২ হরকত।' },
    { ref: '104:3', focus: 'مَالَهُ أَخْلَدَهُ', noteEn: 'ـهُ in مَالَهُ before أَخْلَدَهُ (hamzat qatʿ) — Silah Kubra: stretch 4–5 counts.',            noteBn: 'مَالَهُ before أَخْلَدَ (হামযা) — সিলাহ কুবরা: ৪–৫ হরকত।' },
    { ref: '18:110', focus: 'رَبِّهِ أَحَدًا',   noteEn: 'ـهِ in رَبِّهِ before أَحَدًا (hamzat qatʿ) — Silah Kubra: 4–5 counts as a hidden yaa.',       noteBn: 'رَبِّهِ before أَحَدًا (হামযা) — সিলাহ কুবরা: ৪–৫ হরকত।' },
    { ref: '2:2',   focus: 'فِيهِ',              noteEn: 'No silah here — the haa of فِيهِ is preceded by a sukoon (long ī), so it is not stretched.',   noteBn: 'এখানে সিলাহ নেই — فِيهِ-এর হা-এর আগে সাকিন (দীর্ঘ ঈ), তাই টানা হয় না।' },
  ],

  // ── Madd al-Farq ────────────────────────────────────────────────────────────
  madd_farq: [
    { ref: '6:143', focus: 'آلذَّكَرَيْنِ',     noteEn: 'Interrogative hamza + ال of الذَّكَرَيْنِ — stretch 6 counts so the question is not heard as a statement.', noteBn: 'প্রশ্নবোধক হামযা + الذَّكَرَيْنِ — প্রশ্ন যেন বিবৃতি না শোনায়, ৬ হরকত।' },
    { ref: '6:144', focus: 'آلذَّكَرَيْنِ',     noteEn: 'The parallel place in the next verse — same madd al-farq, 6 counts.',                          noteBn: 'পরের আয়াতে একই স্থান — মাদ্দ ফারক, ৬ হরকত।' },
    { ref: '10:59', focus: 'آللَّهُ أَذِنَ',     noteEn: 'آللَّهُ — interrogative hamza before the ال of the Name; 6-count madd al-farq.',              noteBn: 'آللَّهُ — প্রশ্নবোধক হামযা + الله; ৬ হরকত মাদ্দ ফারক।' },
    { ref: '27:59', focus: 'آللَّهُ خَيْرٌ',     noteEn: 'آللَّهُ خَيْرٌ — the same interrogative آللَّهُ; distinguish "Is it Allah?" with 6 counts.',   noteBn: 'آللَّهُ خَيْرٌ — একই প্রশ্নবোধক آللَّهُ; ৬ হরকতে পার্থক্য।' },
    { ref: '10:51', focus: 'آلْآنَ',             noteEn: 'آلْآنَ — interrogative hamza + ال of الآن; 6-count madd al-farq ("Now?").',                   noteBn: 'آلْآنَ — প্রশ্নবোধক হামযা + الآن; ৬ হরকত মাদ্দ ফারক।' },
  ],

  // ── Hamzat al-Qaṭʿ ──────────────────────────────────────────────────────────
  hamzat_qat: [
    { ref: '1:7',   focus: 'أَنْعَمْتَ',        noteEn: 'أ hamzat al-qatʿ with fathah — sounded whether you start at أَنْعَمْتَ or join from الَّذِينَ before it.', noteBn: 'أَنْعَمْتَ-তে أ হামযাতুল ক্বাত — শুরু করলেও ওয়াসলেও উচ্চারিত।' },
    { ref: '1:5',   focus: 'إِيَّاكَ',          noteEn: 'إ hamzat al-qatʿ with kasrah at the head of إِيَّاكَ — always pronounced, never dropped.',   noteBn: 'إِيَّاكَ-এর শুরুতে إ হামযাতুল ক্বাত — সর্বদা উচ্চারিত।' },
    { ref: '2:6',   focus: 'إِنَّ',             noteEn: 'إِنَّ opens with hamzat al-qatʿ; contrast the wasl-alif of الَّذِينَ right after it (which drops in flow).', noteBn: 'إِنَّ-তে হামযাতুল ক্বাত; পরের الَّذِينَ-এর ওয়াসল-আলিফ ওয়াসলে বাদ পড়ে — বৈসাদৃশ্য।' },
    { ref: '106:4', focus: 'أَطْعَمَهُم',       noteEn: 'أ hamzat al-qatʿ mid-verse in أَطْعَمَهُم — pronounced fully even when connected to الَّذِي before it.', noteBn: 'أَطْعَمَهُم-তে أ হামযাতুল ক্বাত — আয়াতের মাঝেও পূর্ণ উচ্চারিত।' },
    { ref: '96:1',  focus: 'اقْرَأْ',           noteEn: 'One word, two hamzas: the initial ا is hamzat al-wasl (dropped when joined), the FINAL ء is hamzat al-qatʿ (always sounded).', noteBn: 'اقْرَأْ — এক শব্দে দুই হামযা: শুরুর ا ওয়াসল (ওয়াসলে বাদ), শেষের ء ক্বাত (সর্বদা উচ্চারিত)।' },
  ],

  // ── Tarqīq of the general Lām ───────────────────────────────────────────────
  tarqiq_lam: [
    { ref: '2:2',   focus: 'لَا',               noteEn: 'The ل of the negative لَا — light (tarqīq); this is the default weight of every lām in the Quran.', noteBn: 'لَا-এর ল হালকা (তারকিক) — কোরআনে লামের স্বাভাবিক ওজন।' },
    { ref: '1:2',   focus: 'الْحَمْدُ',         noteEn: 'The ل of the article ال in الْحَمْدُ — pronounced light and thin.',                          noteBn: 'الْحَمْدُ-তে ال-এর ল হালকা ও পাতলা।' },
    { ref: '112:1', focus: 'قُلْ',              noteEn: 'The ل with sukoon in قُلْ — light, not heavy.',                                              noteBn: 'قُلْ-তে সাকিন ل — হালকা, ভারী নয়।' },
    { ref: '1:4',   focus: 'مَالِكِ',           noteEn: 'The ل with kasrah in مَالِكِ — light and thin.',                                             noteBn: 'مَالِكِ-তে কাসরাযুক্ত ل — হালকা।' },
    { ref: '3:2',   focus: 'اللَّهُ لَا إِلَٰهَ', noteEn: 'Contrast: starting on اللَّهُ its lām is HEAVY (after the fathah), while the lāms of لَا and إِلَٰهَ stay light.', noteBn: 'বৈসাদৃশ্য: اللَّهُ থেকে শুরু করলে এর লাম ভারী, কিন্তু لَا ও إِلَٰهَ-এর লাম হালকা।' },
  ],

  // ── Marātib al-Ghunnah ──────────────────────────────────────────────────────
  ghunnah_maratib: [
    { ref: '108:1', focus: 'إِنَّا',            noteEn: 'Doubled نّ — the STRONGEST, fullest ghunnah (level 1), held ~2 counts.',                    noteBn: 'إِنَّا-তে মুশাদ্দাদ نّ — সবচেয়ে জোরালো গুন্নাহ (স্তর ১), ~২ হরকত।' },
    { ref: '3:37',  focus: 'مَن يَشَاءُ',       noteEn: 'نْ merging into يَ (idghām bi-ghunnah) — strong ghunnah, one level below the doubled letter.', noteBn: 'مَن يَشَاءُ-তে ইদগাম বিল-গুন্নাহ — জোরালো গুন্নাহ (মুশাদ্দাদের এক ধাপ নিচে)।' },
    { ref: '2:18',  focus: 'صُمٌّ بُكْمٌ',      noteEn: 'Tanween before بُ (iqlāb) — full ghunnah on the converted nasal meem.',                    noteBn: 'صُمٌّ بُكْمٌ-এ ইকলাব — রূপান্তরিত নাকি মীমে পূর্ণ গুন্নাহ।' },
    { ref: '2:3',   focus: 'يُنفِقُونَ',        noteEn: 'نْ before ف (ikhfā) — medium-strength ghunnah, held ~2 counts.',                            noteBn: 'يُنفِقُونَ-তে ইখফা — মধ্যম গুন্নাহ, ~২ হরকত।' },
    { ref: '1:2',   focus: 'الْعَالَمِينَ',    noteEn: 'The voweled نَ carries only the faint inherent ghunnah (the weakest level) — do not over-nasalise it.', noteBn: 'الْعَالَمِينَ-তে স্বরযুক্ত نَ — কেবল সহজাত ক্ষীণ গুন্নাহ (সবচেয়ে হালকা); অতিরিক্ত নাসাল দেবেন না।' },
  ],

  // ── Waqf & Ibtidāʾ ──────────────────────────────────────────────────────────
  waqf_ibtida: [
    { ref: '2:5',   focus: 'الْمُفْلِحُونَ',    noteEn: 'A verse end with complete meaning — a tāmm (complete) stop; begin the next verse fresh.',   noteBn: 'الْمُفْلِحُونَ — পূর্ণ অর্থে আয়াতের শেষ: তাম্ম ওয়াকফ; পরের আয়াত নতুন করে শুরু।' },
    { ref: '1:7',   focus: 'عَلَيْهِمْ',        noteEn: 'The first عَلَيْهِمْ mid-verse is a ḥasan (good) stop — grammatically sound but connected to what follows.', noteBn: 'প্রথম عَلَيْهِمْ আয়াতের মাঝে — হাসান ওয়াকফ: ব্যাকরণসম্মত কিন্তু পরের সাথে যুক্ত।' },
    { ref: '2:2',   focus: 'فِيهِ',             noteEn: 'The tie-mark ۛ sits on both لَا رَيْبَ ۛ and فِيهِ ۛ (muʿānaqah) — stop at only ONE of the two, never both.', noteBn: 'لَا رَيْبَ ۛ ও فِيهِ ۛ উভয়ে মুআনাকা চিহ্ন — দুইয়ের যেকোনো একটিতেই থামুন, দুটিতে নয়।' },
    { ref: '114:6', focus: 'النَّاسِ',          noteEn: 'The very last word of the Quran — the most complete stop of all.',                          noteBn: 'النَّاسِ — কোরআনের শেষ শব্দ: সবচেয়ে পূর্ণ ওয়াকফ।' },
    { ref: '1:1',   focus: 'بِسْمِ اللَّهِ',    noteEn: 'Ibtidāʾ: after the istiʿādhah, the recommended place to begin the recitation.',              noteBn: 'বিসমিল্লাহ — ইবতিদা: ইস্তিআযার পর তিলাওয়াত শুরুর উত্তম স্থান।' },
  ],
};

const TAJWEED_QUIZ = [
  { qEn: 'How many harakāt (beats) is Madd Ṭabī\'ī (natural madd) held for?',
    qBn: 'মাদ্দ তাবী\'ঈ (স্বাভাবিক মাদ্দ) কত হারাকাত পরিমাণ টানা হয়?',
    optsEn: ['1 harakah', '2 harakāt', '4 harakāt', '6 harakāt'],
    optsBn: ['১ হারাকাহ', '২ হারাকাত', '৪ হারাকাত', '৬ হারাকাত'],
    correct: 1 },
  { qEn: 'Madd \'Āriḍ li-l-Sukūn is typically held for how many harakāt when stopping?',
    qBn: 'ওয়াকফের সময় মাদ্দ আরিয কত হারাকাত টানা হয়?',
    optsEn: ['2 harakāt only', '4 harakāt only', '6 harakāt only', '2, 4, or 6 harakāt (permissible)'],
    optsBn: ['শুধু ২ হারাকাত', 'শুধু ৪ হারাকাত', 'শুধু ৬ হারাকাত', '২, ৪ বা ৬ হারাকাত (সবই জায়েজ)'],
    correct: 3 },
  { qEn: 'Madd Lāzim is always held for how many harakāt?',
    qBn: 'মাদ্দ লাযিম সবসময় কত হারাকাত টানা হয়?',
    optsEn: ['2 harakāt', '4 harakāt', '6 harakāt', '8 harakāt'],
    optsBn: ['২ হারাকাত', '৪ হারাকাত', '৬ হারাকাত', '৮ হারাকাত'],
    correct: 2 },
  { qEn: 'Which rule applies when noon sākinah or tanwīn is followed by one of the letters أ هـ ع ح غ خ?',
    qBn: 'নূন সাকিন বা তানওয়ীনের পর أ هـ ع ح غ خ আসলে কোন নিয়ম প্রযোজ্য?',
    optsEn: ['Idghām', 'Ikhfā\'', 'Izhār', 'Iqlāb'],
    optsBn: ['ইদগাম', 'ইখফা', 'ইযহার', 'ইকলাব'],
    correct: 2 },
  { qEn: 'Iqlāb occurs when noon sākinah or tanwīn is followed by which letter?',
    qBn: 'নূন সাকিন বা তানওয়ীনের পর কোন হরফ আসলে ইকলাব হয়?',
    optsEn: ['م', 'ب', 'ن', 'و'],
    optsBn: ['م', 'ب', 'ن', 'و'],
    correct: 1 },
  { qEn: 'Ikhfā Shafawī (labial concealment) applies when meem sākinah is followed by which letter?',
    qBn: 'মীম সাকিনের পর কোন হরফ আসলে ইখফা শাফাওয়ী হয়?',
    optsEn: ['ف', 'ب', 'و', 'م'],
    optsBn: ['ف', 'ب', 'و', 'م'],
    correct: 1 },
  { qEn: 'Idghām Mutamāthilayn occurs when two letters meeting are:',
    qBn: 'ইদগাম মুতামাসিলাইন কখন হয়?',
    optsEn: ['Identical in makhraj and sifah', 'Same makhraj but different sifah', 'Different makhraj but close sifah', 'Completely unrelated letters'],
    optsBn: ['মাখরাজ ও সিফাত উভয়ই একই', 'মাখরাজ একই কিন্তু সিফাত ভিন্ন', 'মাখরাজ ভিন্ন কিন্তু সিফাত কাছাকাছি', 'সম্পূর্ণ ভিন্ন হরফ'],
    correct: 0 },
  { qEn: 'Which of the following is the correct set of Qalqalah letters?',
    qBn: 'নিচের কোনটি সঠিক কলকলাহ হরফের সেট?',
    optsEn: ['ق ط ب ج د', 'ق ك ب ج د', 'ق ط ف ج د', 'ق ط ب ز د'],
    optsBn: ['ق ط ب ج د', 'ق ك ب ج د', 'ق ط ف ج د', 'ق ط ب ز د'],
    correct: 0 },
  { qEn: 'Which Waqf sign indicates that stopping is OBLIGATORY (must stop)?',
    qBn: 'কোন ওয়াকফ চিহ্নে থামা আবশ্যিক (লাযিম)?',
    optsEn: ['مـ (Lāzim)', 'لا (Mamnūʿ)', 'ط (Muṭlaq)', 'ج (Jāʾiz)'],
    optsBn: ['مـ (লাযিম)', 'لا (মামনূ)', 'ط (মুতলাক)', 'ج (জায়েজ)'],
    correct: 0 },
  { qEn: 'How many Sakt (brief silent pause) positions exist in the recitation of Ḥafṣ \'an \'Āṣim?',
    qBn: 'হাফস আন আসিমের কিরাতে মোট কতটি সাকত স্থান আছে?',
    optsEn: ['2', '3', '4', '5'],
    optsBn: ['২', '৩', '৪', '৫'],
    correct: 2 },
  { qEn: 'Rāʾ is pronounced with Tafkhīm (heavy) in which of the following cases?',
    qBn: 'নিচের কোন ক্ষেত্রে রা-কে তাফখিম (মোটা) উচ্চারণ করা হয়?',
    optsEn: ['Rāʾ with kasrah', 'Rāʾ preceded by a kasrah with no letter between them', 'Rāʾ with fatḥah or ḍammah', 'Rāʾ followed by a kasrah'],
    optsBn: ['কাসরাযুক্ত রা', 'রা-র আগে কাসরা থাকলে', 'ফাতহা বা দাম্মাযুক্ত রা', 'রা-র পরে কাসরা থাকলে'],
    correct: 2 },
  { qEn: 'Rāʾ is pronounced with Tarqīq (light/thin) when:',
    qBn: 'রা তারকিক (পাতলা) উচ্চারণ হয় যখন:',
    optsEn: ['Rāʾ carries a fatḥah', 'Rāʾ carries a ḍammah', 'Rāʾ carries a kasrah', 'Rāʾ is preceded by a fatḥah'],
    optsBn: ['রা-তে ফাতহা আছে', 'রা-তে দাম্মা আছে', 'রা-তে কাসরা আছে', 'রা-র আগে ফাতহা আছে'],
    correct: 2 },
  { qEn: 'Lām Shamsiyyah differs from Lām Qamariyyah in that the shamsī lām:',
    qBn: 'লাম শামসিয়্যা ও লাম কামারিয়্যার পার্থক্য হলো শামসী লামে:',
    optsEn: ['Is pronounced clearly', 'Is assimilated into the following letter (tashdīd on next letter)', 'Is dropped entirely', 'Is replaced by noon'],
    optsBn: ['স্পষ্টভাবে উচ্চারিত হয়', 'পরের হরফে মিশে যায় (পরের হরফে শাদ্দা হয়)', 'সম্পূর্ণ বাদ পড়ে', 'নূন দিয়ে প্রতিস্থাপিত হয়'],
    correct: 1 },
  { qEn: 'The standard duration of Ghunnah (nasalisation) in Ikhfā and Idghām bi-Ghunnah is:',
    qBn: 'ইখফা ও ইদগাম বিল-গুন্নায় গুন্নার স্বাভাবিক পরিমাণ কত?',
    optsEn: ['1 harakah', '2 harakāt', '4 harakāt', '6 harakāt'],
    optsBn: ['১ হারাকাহ', '২ হারাকাত', '৪ হারাকাত', '৬ হারাকাত'],
    correct: 1 },
  { qEn: 'Which of the following correctly describes Rawm (in Waqf)?',
    qBn: 'ওয়াকফে রওম বলতে কী বোঝায়?',
    optsEn: ['Pronouncing the vowel with full voice', 'Pronouncing about one-third of the vowel sound with a very weak voice', 'Pursing the lips to indicate a ḍammah without sound', 'A silent pause before the next word'],
    optsBn: ['পূর্ণ স্বরে হরকত উচ্চারণ করা', 'অত্যন্ত দুর্বল কণ্ঠে আনুমানিক এক-তৃতীয়াংশ স্বর উচ্চারণ করা', 'শব্দ ছাড়াই ঠোঁট গোল করে দাম্মা ইঙ্গিত করা', 'পরের শব্দের আগে নীরব বিরতি'],
    correct: 1 },
];
