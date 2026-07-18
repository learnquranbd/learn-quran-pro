/**
 * Tajweed Learning (তাজবীদ শিক্ষা) — learn the rules, then SEE them in the Quran.
 *
 * - Every rule from the app's tajweed engine (TAJWEED_RULES) as a card:
 *   colour swatch, what it is, which letters trigger it (en + bn, en fallback).
 * - Tap a rule → real examples: pick any surah and every occurrence of that rule
 *   is highlighted in the actual verse text (bundled data/tajweed-json spans).
 * - Practice: jump to the tajweed quiz, colored reading view, or tajweed mushaf.
 * - Structured learning path (beginner → intermediate → advanced) driven by the
 *   same learned-tracker, with per-level progress bars.
 * - Makharij view: the classical 17 articulation points in 5 zones (pure HTML/CSS).
 * - Inline rule-identification drill: real color-annotated verse spans, 4 options
 *   (with a persisted personal best score).
 * - Reference view: a printable colour key for every rule, plus the classical
 *   Noon-Sakinah/Tanween (4 rulings) and Meem-Sakinah (3 rulings) decision tables.
 * - "Common mistakes" card per rule family (textbook-level guidance).
 * - Curated reputable external resources.
 *
 * Renders into #tajweedlearn-container (tab "tajweedlearn").
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
};

/**
 * Structured learning path: classical teaching order. A level is "complete"
 * when every rule in it is marked learned; the next level then unlocks
 * (advisory only — all rule cards stay reachable below).
 */
const TAJWEED_PATH = [
  { level: 'beginner', emoji: '🌱', labelKey: 'tj_level_beginner', fallback: 'Beginner',
    rules: ['madd_2', 'lam_shamsiyyah', 'hamzat_wasl', 'silent', 'ghunnah', 'qalqalah'] },
  { level: 'intermediate', emoji: '🌿', labelKey: 'tj_level_intermediate', fallback: 'Intermediate',
    rules: ['ikhfa', 'iqlab', 'idghaam_ghunnah', 'idghaam_no_ghunnah', 'ikhfa_shafawi', 'idghaam_shafawi'] },
  { level: 'advanced', emoji: '🌳', labelKey: 'tj_level_advanced', fallback: 'Advanced',
    rules: ['madd_muttasil', 'madd_munfasil', 'madd_246', 'madd_6', 'idghaam_mutajanisayn', 'idghaam_mutaqaribayn'] },
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
      { letters: 'ا و ي',
        en: 'The three madd letters — the sound flows from the open cavity and ends with the breath.',
        bn: 'মাদ্দের তিন হরফ — খালি জায়গা থেকে আওয়াজ প্রবাহিত হয়ে শ্বাসের সাথে শেষ হয়।' },
    ] },
  { key: 'halq', ar: 'الحلق', color: '#EF4444',
    names: { en: 'Al-Halq — the throat', bn: 'আল-হালক — গলা' },
    points: [
      { letters: 'ء هـ', en: 'Deepest part of the throat (nearest the chest).', bn: 'গলার গভীরতম অংশ (বুকের নিকটবর্তী)।' },
      { letters: 'ع ح', en: 'Middle of the throat.', bn: 'গলার মধ্যভাগ।' },
      { letters: 'غ خ', en: 'Top of the throat (nearest the mouth).', bn: 'গলার উপরের অংশ (মুখের নিকটবর্তী)।' },
    ] },
  { key: 'lisan', ar: 'اللسان', color: '#10B981',
    names: { en: 'Al-Lisan — the tongue', bn: 'আল-লিসান — জিহ্বা' },
    points: [
      { letters: 'ق', en: 'Deepest part of the tongue with the soft palate above it.', bn: 'জিহ্বার গোড়া ও তার উপরের নরম তালু।' },
      { letters: 'ك', en: 'Slightly forward of ق — back of the tongue with the palate.', bn: 'ق-এর সামান্য সামনে — জিহ্বার পিছনের অংশ ও তালু।' },
      { letters: 'ج ش ي', en: 'Middle of the tongue with the roof of the mouth.', bn: 'জিহ্বার মধ্যভাগ ও তালু।' },
      { letters: 'ض', en: 'Side(s) of the tongue against the upper molars.', bn: 'জিহ্বার পার্শ্বদেশ ও উপরের মাড়ির দাঁত।' },
      { letters: 'ل', en: 'Nearest edge of the tongue with the upper gums.', bn: 'জিহ্বার অগ্রভাগের কিনারা ও উপরের মাড়ি।' },
      { letters: 'ن', en: 'Tip of the tongue with the upper gums, just below the point of ل.', bn: 'জিহ্বার অগ্রভাগ ও উপরের মাড়ি — ل-এর ঠিক নিচে।' },
      { letters: 'ر', en: 'Tip of the tongue (with its back) near the point of ن.', bn: 'জিহ্বার অগ্রভাগ (পিঠসহ) — ن-এর কাছাকাছি স্থান।' },
      { letters: 'ط د ت', en: 'Tip of the tongue with the base of the upper front teeth.', bn: 'জিহ্বার অগ্রভাগ ও উপরের সামনের দাঁতের গোড়া।' },
      { letters: 'ص س ز', en: 'Tip of the tongue close to the lower front teeth, leaving a small gap.', bn: 'জিহ্বার অগ্রভাগ ও নিচের সামনের দাঁত — সামান্য ফাঁক রেখে।' },
      { letters: 'ظ ذ ث', en: 'Tip of the tongue with the edges of the upper front teeth.', bn: 'জিহ্বার অগ্রভাগ ও উপরের সামনের দাঁতের কিনারা।' },
    ] },
  { key: 'shafatan', ar: 'الشفتان', color: '#F59E0B',
    names: { en: 'Ash-Shafatan — the two lips', bn: 'আশ-শাফাতান — দুই ঠোঁট' },
    points: [
      { letters: 'ف', en: 'Inside of the lower lip with the tips of the upper front teeth.', bn: 'নিচের ঠোঁটের ভেতরের অংশ ও উপরের সামনের দাঁতের প্রান্ত।' },
      { letters: 'ب م و', en: 'The two lips together — closed for ب and م, slightly rounded open for و.', bn: 'দুই ঠোঁট একসাথে — ب ও م-এ বন্ধ, و-তে সামান্য গোল করে খোলা।' },
    ] },
  { key: 'khayshum', ar: 'الخيشوم', color: '#8B5CF6',
    names: { en: 'Al-Khayshum — the nasal cavity', bn: 'আল-খাইশুম — নাসারন্ধ্র' },
    points: [
      { letters: 'نّ مّ',
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
      'Extending idgham mutajanisayn/mutaqaribayn beyond their specific letter pairs — merge only where the rule applies.',
    ],
    bn: [
      'আগের শব্দের সাথে মিলিয়ে পড়ার সময় হামযাতুল ওয়াসল উচ্চারণ করা — সেখান থেকে শুরু করলেই কেবল তা পড়া হয়।',
      'সূর্য অক্ষরের আগে ال-এর লাম উচ্চারণ করা — লাম নীরব, সূর্য অক্ষর দ্বিগুণ হয়।',
      'নির্দিষ্ট হরফ-জোড়ার বাইরে ইদগাম মুতাজানিসাইন/মুতাকারিবাইন প্রয়োগ করা — নিয়ম যেখানে প্রযোজ্য কেবল সেখানেই মিলন।',
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

class TajweedLearn {
  constructor() {
    this.container = document.getElementById('tajweedlearn-container');
    if (!this.container) return;
    this.language = (typeof appSettings !== 'undefined' && appSettings) ? appSettings.get('language') : 'en';
    this.rule = null;          // selected rule key
    this.surah = 1;            // examples surah
    this.exLimit = 15;         // examples shown before "Show more"
    this._exReq = 0;           // loadExamples() request token (guards stale responses)
    this.view = 'rules';       // 'rules' | 'makharij' | 'drill'
    this.drill = null;         // null | {status} | {questions, idx, score, picked}
    this._drillReq = 0;        // startDrill() request token
    this.bound = false;
    this.learned = this.loadLearned();
    this.drillBest = this.loadDrillBest();  // { score, total } personal best

    window.addEventListener('tabChanged', (e) => {
      if (e.detail.tabId === 'tajweedlearn') this.render();
      else if (this._audio) this._audio.pause();
    });
    window.addEventListener('settingChanged', (e) => {
      if (e.detail.key === 'language') { this.language = e.detail.value; if (this.container.innerHTML) this.render(); }
    });
  }

  /** t() with an optional English fallback for keys not yet in translations.js */
  tt(key, fb) { const v = t(key, this.language); return (fb && v === key) ? fb : v; }
  loadLearned() {
    try { return new Set(JSON.parse(localStorage.getItem('tajweedLearned') || '[]')); } catch (e) { return new Set(); }
  }
  saveLearned() {
    try { localStorage.setItem('tajweedLearned', JSON.stringify([...this.learned])); } catch (e) { /* ignore */ }
  }
  loadDrillBest() {
    try {
      const b = JSON.parse(localStorage.getItem('tajweedDrillBest') || 'null');
      return (b && typeof b.score === 'number' && typeof b.total === 'number' && b.total > 0) ? b : null;
    } catch (e) { return null; }
  }
  /** Keep the run with the best score/total ratio (ties broken by more questions). */
  saveDrillBest(score, total) {
    if (!total) return;
    const prev = this.drillBest;
    const better = !prev || (score / total > prev.score / prev.total) ||
      (score / total === prev.score / prev.total && total > prev.total);
    if (!better) return;
    this.drillBest = { score, total };
    try { localStorage.setItem('tajweedDrillBest', JSON.stringify(this.drillBest)); } catch (e) { /* ignore */ }
  }
  lesson(k) { const l = TAJWEED_LESSONS[k] || {}; return l[this.language] || l.en || ''; }
  /** Rule display name in the UI language (technical Arabic terms transliterated). */
  ruleName(k) {
    const l = TAJWEED_LESSONS[k] || {};
    if (l.names && l.names[this.language]) return l.names[this.language];
    return ((typeof TAJWEED_RULES !== 'undefined' && TAJWEED_RULES[k]) || {}).label || k;
  }

  bindOnce() {
    if (this.bound) return;
    this.bound = true;
    this.container.addEventListener('click', (e) => {
      const mark = e.target.closest('[data-tj-learned]');
      if (mark) {
        const k = mark.getAttribute('data-tj-learned');
        this.learned.has(k) ? this.learned.delete(k) : this.learned.add(k);
        this.saveLearned();
        this.render();
        return;
      }
      const view = e.target.closest('[data-tj-view]');
      if (view) { this.view = view.getAttribute('data-tj-view'); this.render(); return; }
      // Learning-path chip → open that rule's card below and scroll to it
      const pathRule = e.target.closest('[data-tj-path]');
      if (pathRule) {
        const k = pathRule.getAttribute('data-tj-path');
        this.view = 'rules'; this.rule = k; this.exLimit = 15;
        this.render(); this.loadExamples();
        const card = this.container.querySelector(`[data-tj-rule="${k}"]`);
        if (card) card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }
      if (e.target.closest('[data-tj-drill-start]')) { this.startDrill(); return; }
      const opt = e.target.closest('[data-tj-opt]');
      if (opt && this.drill && this.drill.questions && this.drill.picked === null) {
        const i = parseInt(opt.getAttribute('data-tj-opt'), 10);
        const q = this.drill.questions[this.drill.idx];
        if (q && q.options[i]) {
          this.drill.picked = i;
          if (q.options[i].correct) this.drill.score++;
          this.render();
        }
        return;
      }
      if (e.target.closest('[data-tj-drill-next]') && this.drill && this.drill.questions) {
        this.drill.idx++; this.drill.picked = null;
        if (this.drill.idx >= this.drill.questions.length) this.saveDrillBest(this.drill.score, this.drill.questions.length);
        this.render(); return;
      }
      if (e.target.closest('[data-tj-print]')) { try { window.print(); } catch (err) { /* ignore */ } return; }
      const rule = e.target.closest('[data-tj-rule]');
      if (rule) {
        const k = rule.getAttribute('data-tj-rule');
        this.rule = this.rule === k ? null : k;
        this.exLimit = 15;
        this.render();
        if (this.rule) this.loadExamples();
        return;
      }
      const more = e.target.closest('[data-tj-more]');
      if (more) { this.exLimit += 15; this.loadExamples(); return; }
      const quiz = e.target.closest('[data-tj-quiz]');
      if (quiz && typeof tabSystem !== 'undefined') {
        tabSystem.switchTab('quiz');
        if (typeof quizCenter !== 'undefined' && quizCenter) quizCenter.selectType('tajweed_rule');
        return;
      }
      const go = e.target.closest('[data-tj-goto]');
      if (go && typeof tabSystem !== 'undefined') {
        const tab = go.getAttribute('data-tj-goto');
        tabSystem.switchTab(tab);
        // 'Coloured reading' should actually SHOW the colours: turn tajweed on
        if (tab === 'reading' && typeof quranApp !== 'undefined' && quranApp && !quranApp.globalTajweed) {
          quranApp.applyGlobalToggle('tajweed');
        }
        return;
      }
      const play = e.target.closest('[data-ayah-audio]');
      if (play) { this.toggleAyahAudio(play); return; }
      // Ref badge → shared verse modal with word-by-word audio (checked AFTER 🔊)
      const ref = e.target.closest('[data-ayah-ref]');
      if (ref && typeof ayahModal !== 'undefined' && ayahModal) ayahModal.open(ref.getAttribute('data-ayah-ref'));
    });
    this.container.addEventListener('change', (e) => {
      if (e.target.id === 'tj-surah') { this.surah = parseInt(e.target.value, 10); this.exLimit = 15; this.loadExamples(); }
    });
  }

  /** 🔊 plays, second tap pauses (icon flips back via the 'pause' listener). */
  toggleAyahAudio(btn) {
    if (!this._audio) {
      this._audio = new Audio();
      // 'pause' also fires when playback ends, so one listener resets the icon
      this._audio.addEventListener('pause', () => this.resetPlayIcon());
    }
    if (this._playingBtn === btn && !this._audio.paused) { this._audio.pause(); return; }
    this.resetPlayIcon();
    this._audio.src = btn.getAttribute('data-ayah-audio');
    this._audio.play().then(() => {
      this._playingBtn = btn;
      btn.innerHTML = btn.innerHTML.replace('🔊', '⏸');
    }).catch(() => {});
  }

  resetPlayIcon() {
    if (this._playingBtn) {
      this._playingBtn.innerHTML = this._playingBtn.innerHTML.replace('⏸', '🔊');
      this._playingBtn = null;
    }
  }

  ruleCard(key) {
    const def = (typeof TAJWEED_RULES !== 'undefined' && TAJWEED_RULES[key]) || { color: '#888', label: key };
    const open = this.rule === key;
    const learned = this.learned.has(key);
    const les = TAJWEED_LESSONS[key] || {};
    const lettersHtml = les.lettersExtraKey
      ? `${this.esc(les.letters || '')} <span dir="auto">+ ${this.esc(this.tt(les.lettersExtraKey))}</span>`
      : this.esc(les.letters || '');
    return `
      <div class="rounded-xl bg-white dark:bg-gray-800 border ${open ? 'border-2' : 'border-gray-200 dark:border-gray-700'} ${learned ? 'ring-2 ring-green-500/40' : ''}" ${open ? `style="border-color:${def.color}"` : ''}>
        <div class="flex items-center pe-2">
          <button data-tj-rule="${key}" class="flex-1 min-w-0 flex items-center gap-3 px-3 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700/40 rounded-xl">
            <span class="shrink-0 w-4 h-4 rounded-full" style="background:${def.color}"></span>
            <span class="flex-1 min-w-0">
              <span class="block font-semibold text-sm text-gray-800 dark:text-gray-100" dir="auto">${this.esc(this.ruleName(key))}</span>
              <span class="block text-gray-400 truncate ayah-arabic !text-lg !leading-normal" dir="rtl">${lettersHtml}</span>
            </span>
            <span class="text-gray-400">${open ? '▾' : '▸'}</span>
          </button>
          <button data-tj-learned="${key}" title="${this.tt('tj_mark_learned')}"
                  class="shrink-0 w-7 h-7 rounded-full text-sm leading-none ${learned
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'border border-gray-300 dark:border-gray-600 text-gray-400 hover:text-green-600 hover:border-green-500'}">✓</button>
        </div>
        <p class="px-4 pb-3 text-sm text-gray-600 dark:text-gray-300 leading-relaxed" dir="auto">${this.esc(this.lesson(key))}</p>
        ${open ? `
          <div class="px-4 pb-4">
            <div class="flex flex-wrap items-center gap-2 mb-2">
              <label class="text-xs text-gray-400">${this.tt('tj_examples_in')}</label>
              <select id="tj-surah" class="px-2 py-1.5 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700">
                ${SURAH_DATA.map(s => `<option value="${s.number}" ${s.number === this.surah ? 'selected' : ''}>${this.esc(formatSurahOption(s, this.language))}</option>`).join('')}
              </select>
            </div>
            <div id="tj-examples" class="space-y-2"><p class="text-center text-gray-400 text-sm py-3">${this.tt('loading')}</p></div>
          </div>` : ''}
      </div>`;
  }

  /** Highlight ONLY the selected rule's spans in a verse (bundled annotations). */
  highlight(text, spans, color) {
    const parts = [];
    let cur = 0;
    for (const sp of spans.sort((a, b) => a.start - b.start)) {
      if (sp.start < cur) continue;
      parts.push(this.esc(text.slice(cur, sp.start)));
      parts.push(`<span style="color:${color};font-weight:700">${this.esc(text.slice(sp.start, sp.end))}</span>`);
      cur = sp.end;
    }
    parts.push(this.esc(text.slice(cur)));
    return parts.join('');
  }

  async loadExamples() {
    const box = this.container.querySelector('#tj-examples');
    if (!box || !this.rule) return;
    // Token guards against out-of-order responses on rapid surah changes
    const req = ++this._exReq;
    const surah = this.surah;
    box.innerHTML = `<p class="text-center text-gray-400 text-sm py-3">${this.tt('loading')}</p>`;
    try {
      const { text, rules } = await TajweedData.load(surah);
      if (req !== this._exReq) return; // superseded by a newer request
      const color = (TAJWEED_RULES[this.rule] || {}).color || '#888';
      const rows = [];
      const pad = n => String(n).padStart(3, '0');
      for (const vk in rules) {
        const m = vk.match(/^verse_(\d+)$/);
        if (!m || m[1] === '0') continue;
        const spans = (rules[vk] || []).filter(r => r.rule === this.rule);
        if (!spans.length) continue;
        const a = parseInt(m[1], 10);
        rows.push({ a, html: this.highlight(text[vk] || '', spans, color), n: spans.length });
      }
      if (!rows.length) { box.innerHTML = `<p class="text-center text-gray-400 text-sm py-3">${this.tt('tj_no_examples')}</p>`; return; }
      rows.sort((x, y) => x.a - y.a);
      const shown = rows.slice(0, this.exLimit);
      const remaining = rows.length - shown.length;
      box.innerHTML = shown.map(r => `
        <div class="rounded-lg bg-gray-50 dark:bg-gray-900/40 p-3">
          <div class="flex items-center gap-2 mb-1">
            <button data-ayah-ref="${surah}:${r.a}" title="${this.tt('tj_open_verse')}"
                    class="text-xs font-mono text-gray-400 hover:text-primary underline decoration-dotted underline-offset-2">${surah}:${r.a} ⓘ</button>
            <span class="text-xs px-1.5 rounded-full" style="background:${color}22;color:${color}">×${r.n}</span>
            <button data-ayah-audio="https://everyayah.com/data/Alafasy_128kbps/${pad(surah)}${pad(r.a)}.mp3" title="${this.tt('play')}" aria-label="${this.tt('play')}" class="ms-auto text-xs px-2.5 py-1 rounded-md bg-primary text-white hover:bg-primary/80">🔊</button>
          </div>
          <div class="ayah-arabic !text-2xl !leading-[2.4]" dir="rtl">${r.html}</div>
        </div>`).join('')
        + (remaining > 0 ? `
        <button data-tj-more class="w-full text-center text-sm py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
          ${this.tt('topics_show_more')} (+${remaining})
        </button>` : '');
    } catch (e) {
      if (req !== this._exReq) return;
      box.innerHTML = `<p class="text-center text-gray-400 text-sm py-3">${this.tt('tj_no_examples')}</p>`;
    }
  }

  render() {
    this.bindOnce();
    if (this._audio) this._audio.pause();
    const keys = Object.keys(TAJWEED_LESSONS);
    const learnedCount = keys.filter(k => this.learned.has(k)).length;
    const pct = Math.round((learnedCount / keys.length) * 100);
    const pills = [
      ['rules', '📜', 'tj_nav_rules', 'Rules'],
      ['reference', '🗂️', 'tj_nav_reference', 'Reference'],
      ['makharij', '👄', 'tj_nav_makharij', 'Makharij'],
      ['drill', '🎯', 'tj_nav_drill', 'Practice drill'],
    ].map(([v, em, key, fb]) => `
      <button data-tj-view="${v}" class="px-4 py-2 rounded-full text-sm font-medium ${this.view === v
        ? 'bg-primary text-white'
        : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}">${em} ${this.tt(key, fb)}</button>`).join('');
    this.container.innerHTML = `
      <div class="w-full">
        <div class="text-center mb-5">
          <p class="text-gray-500 dark:text-gray-400 text-sm">${this.tt('tj_learn_subtitle')}</p>
          <div class="max-w-md mx-auto mt-3">
            <div class="flex justify-between text-xs font-medium text-green-600 dark:text-green-400 mb-1">
              <span>✓ ${learnedCount} / ${keys.length} ${this.tt('tj_learned')}</span><span>${pct}%</span>
            </div>
            <div class="h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
              <div class="h-full rounded-full bg-green-500 transition-all duration-500" style="width:${pct}%"></div>
            </div>
          </div>
        </div>
        <div class="flex flex-wrap justify-center gap-2 mb-6">${pills}</div>
        ${this.view === 'makharij' ? this.makharijHtml()
          : this.view === 'drill' ? this.drillHtml()
          : this.view === 'reference' ? this.referenceHtml(keys)
          : this.rulesHtml(keys)}
      </div>`;
    if (this.view === 'rules' && this.rule) this.loadExamples();
  }

  /** Default view: practice shortcuts, learning path, rule groups (+ mistakes), resources. */
  rulesHtml(keys) {
    const groups = [
      ['noon', 'tj_group_noon'], ['meem', 'tj_group_meem'], ['madd', 'tj_group_madd'],
      ['core', 'tj_group_core'], ['other', 'tj_group_other'],
    ];
    return `
        <div class="flex flex-wrap justify-center gap-2 mb-6">
          <button data-tj-quiz class="px-4 py-2 rounded-lg bg-secondary text-white text-sm font-medium hover:bg-secondary/80">❓ ${this.tt('tj_practice_quiz')}</button>
          <button data-tj-goto="reading" class="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">📖 ${this.tt('tj_practice_reading')}</button>
          <button data-tj-goto="mushaf" class="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">📗 ${this.tt('tj_practice_mushaf')}</button>
        </div>
        ${this.pathHtml()}
        ${groups.map(([g, labelKey]) => {
          const inGroup = keys.filter(k => TAJWEED_LESSONS[k].group === g);
          if (!inGroup.length) return '';
          return `
            <h3 class="text-sm uppercase tracking-wide font-semibold text-gray-400 dark:text-gray-500 mb-2 mt-5">${this.tt(labelKey)}</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
              ${inGroup.map(k => this.ruleCard(k)).join('')}
            </div>
            ${this.mistakesHtml(g)}`;
        }).join('')}
        <h3 class="text-sm uppercase tracking-wide font-semibold text-gray-400 dark:text-gray-500 mb-2 mt-8">🌐 ${this.tt('resources_title')}</h3>
        <div class="flex flex-wrap gap-2">
          ${TAJWEED_RESOURCES.map(r => `
            <a href="${r.url}" target="_blank" rel="noopener" class="flex items-center gap-2 px-3 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow text-sm">
              <span>${r.emoji}</span><span class="font-medium">${r.name}</span>
              <span class="text-xs text-gray-400">${this.esc(this.tt(r.descKey))}</span>
            </a>`).join('')}
        </div>`;
  }

  /** Beginner → intermediate → advanced panel with per-level progress bars. */
  pathHtml() {
    let prevDone = true;
    const cards = TAJWEED_PATH.map(stage => {
      const done = stage.rules.filter(k => this.learned.has(k)).length;
      const total = stage.rules.length;
      const pct = Math.round((done / total) * 100);
      const unlocked = prevDone;
      const complete = done === total;
      const html = `
        <div class="rounded-lg border ${complete ? 'border-green-400 dark:border-green-600' : 'border-gray-200 dark:border-gray-700'} p-3 ${unlocked ? '' : 'opacity-60'}">
          <div class="flex items-center gap-2 mb-1.5">
            <span>${complete ? '✅' : unlocked ? stage.emoji : '🔒'}</span>
            <span class="font-semibold text-sm flex-1">${this.tt(stage.labelKey, stage.fallback)}</span>
            <span class="text-xs text-gray-400">${done}/${total}</span>
          </div>
          <div class="h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden mb-2">
            <div class="h-full rounded-full ${complete ? 'bg-green-500' : 'bg-primary'} transition-all duration-500" style="width:${pct}%"></div>
          </div>
          ${complete ? `<p class="text-xs text-green-600 dark:text-green-400 mb-1.5">${this.tt('tj_path_done', 'Level complete!')}</p>` : ''}
          ${unlocked ? `
            <div class="flex flex-wrap gap-1">
              ${stage.rules.map(k => {
                const learned = this.learned.has(k);
                const color = ((typeof TAJWEED_RULES !== 'undefined' && TAJWEED_RULES[k]) || {}).color || '#888';
                return `
                  <button data-tj-path="${k}" dir="auto" class="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs border ${learned
                    ? 'border-green-400 dark:border-green-600 text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-500/10'
                    : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}">
                    <span class="w-2 h-2 rounded-full shrink-0" style="background:${color}"></span>${this.esc(this.ruleName(k))}${learned ? ' ✓' : ''}
                  </button>`;
              }).join('')}
            </div>`
          : `<p class="text-xs text-gray-400">${this.tt('tj_path_locked', 'Complete the previous level to unlock')}</p>`}
        </div>`;
      prevDone = complete;
      return html;
    }).join('');
    return `
      <div class="rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 mb-4">
        <h3 class="text-sm uppercase tracking-wide font-semibold text-gray-400 dark:text-gray-500 mb-3">🧭 ${this.tt('tj_path_title', 'Learning path')}</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">${cards}</div>
      </div>`;
  }

  /** Collapsible "common mistakes" card under a rule group. */
  mistakesHtml(group) {
    const m = TAJWEED_MISTAKES[group];
    if (!m) return '';
    const list = m[this.language] || m.en;
    return `
      <details class="mt-2 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10">
        <summary class="cursor-pointer px-4 py-2.5 text-sm font-medium text-amber-800 dark:text-amber-300 select-none">⚠️ ${this.tt('tj_mistakes_title', 'Common mistakes')}</summary>
        <ul class="px-4 pb-3 ps-9 space-y-1.5 text-sm text-amber-900/80 dark:text-amber-100/80 list-disc">
          ${list.map(x => `<li dir="auto">${this.esc(x)}</li>`).join('')}
        </ul>
      </details>`;
  }

  /** The 17 makharij in 5 zones + a simple CSS cross-section diagram. */
  makharijHtml() {
    const lang = this.language;
    const nasal = MAKHARIJ_ZONES.find(z => z.key === 'khayshum');
    const seg = (z, flex, count) => `
      <div class="py-2 px-1" style="background:${z.color};flex:${flex}">${z.ar}<br>${count}</div>`;
    const byKey = k => MAKHARIJ_ZONES.find(z => z.key === k);
    return `
      <div class="text-center mb-4">
        <h3 class="font-semibold text-gray-800 dark:text-gray-100">${this.tt('tj_makharij_title', 'Makharij — articulation points')}</h3>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">${this.tt('tj_makharij_subtitle', 'The 17 articulation points of the Arabic letters, grouped into 5 zones.')}</p>
      </div>
      <div class="rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 mb-4">
        <div dir="rtl" class="max-w-md mx-auto">
          <div class="mb-1 ps-1">
            <span class="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full text-white" style="background:${nasal.color}">👃 ${nasal.ar} · 1</span>
          </div>
          <div class="flex rounded-lg overflow-hidden text-[11px] text-white text-center font-medium">
            ${seg(byKey('shafatan'), 2, 2)}${seg(byKey('lisan'), 6, 10)}${seg(byKey('halq'), 3, 3)}${seg(byKey('jawf'), 2, 1)}
          </div>
          <div class="flex justify-between text-[10px] text-gray-400 mt-1">
            <span>${this.tt('tj_mx_front', 'front (lips)')}</span><span>${this.tt('tj_mx_deep', 'deep (throat & cavity)')}</span>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
        ${MAKHARIJ_ZONES.map(z => `
          <div class="rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 ${z.key === 'lisan' ? 'lg:col-span-2' : ''}">
            <div class="flex items-center gap-2 mb-2">
              <span class="w-3 h-3 rounded-full shrink-0" style="background:${z.color}"></span>
              <span class="font-semibold text-sm text-gray-800 dark:text-gray-100" dir="auto">${this.esc(z.names[lang] || z.names.en)}</span>
              <span class="ms-auto ayah-arabic !text-xl !leading-none" dir="rtl">${z.ar}</span>
              <span class="text-xs px-1.5 py-0.5 rounded-full shrink-0" style="background:${z.color}22;color:${z.color}">${z.points.length}</span>
            </div>
            <div class="space-y-1.5 ${z.key === 'lisan' ? 'lg:columns-2 lg:gap-3 lg:space-y-0' : ''}">
              ${z.points.map(p => `
                <div class="flex items-start gap-3 rounded-lg bg-gray-50 dark:bg-gray-900/40 p-2.5 ${z.key === 'lisan' ? 'lg:break-inside-avoid lg:mb-1.5' : ''}">
                  <span class="ayah-arabic !text-2xl !leading-normal shrink-0 px-2 rounded-md border" style="border-color:${z.color}55;color:${z.color}" dir="rtl">${p.letters}</span>
                  <span class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed" dir="auto">${this.esc(p[lang] || p.en)}</span>
                </div>`).join('')}
            </div>
          </div>`).join('')}
      </div>`;
  }

  /** Printable quick reference: colour key + noon/meem decision tables. */
  referenceHtml(keys) {
    const lang = this.language;
    const legend = keys.map(k => {
      const def = (typeof TAJWEED_RULES !== 'undefined' && TAJWEED_RULES[k]) || { color: '#888' };
      const les = TAJWEED_LESSONS[k] || {};
      return `
        <div class="flex items-center gap-2 rounded-lg bg-gray-50 dark:bg-gray-900/40 px-2.5 py-2">
          <span class="w-3.5 h-3.5 rounded-full shrink-0" style="background:${def.color}"></span>
          <span class="flex-1 min-w-0 text-xs font-medium text-gray-700 dark:text-gray-200 truncate" dir="auto">${this.esc(this.ruleName(k))}</span>
          <span class="ayah-arabic !text-base !leading-none text-gray-400 shrink-0 max-w-[8rem] truncate" dir="rtl">${this.esc(les.letters || '')}</span>
        </div>`;
    }).join('');
    const decisionCard = (title, rows) => `
      <div class="rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 mb-4">
        <h3 class="font-semibold text-sm text-gray-800 dark:text-gray-100 mb-3" dir="auto">${title}</h3>
        <div class="space-y-2">
          ${rows.map(r => `
            <div class="flex items-start gap-3 rounded-lg bg-gray-50 dark:bg-gray-900/40 p-2.5">
              <span class="w-3 h-3 rounded-full shrink-0 mt-1.5" style="background:${r.color}"></span>
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="text-sm font-semibold text-gray-800 dark:text-gray-100" dir="auto">${this.esc(r.names[lang] || r.names.en)}</span>
                  <span class="text-[11px] text-gray-400">${this.tt('tj_ref_trigger', 'when followed by')}</span>
                  <span class="ayah-arabic !text-lg !leading-normal px-1.5 rounded" style="color:${r.color}" dir="rtl">${this.esc(r.trigger)}</span>
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mt-0.5" dir="auto">${this.esc(r[lang] || r.en)}</p>
              </div>
            </div>`).join('')}
        </div>
      </div>`;
    return `
      <div class="flex items-start justify-between gap-3 mb-4">
        <div>
          <h3 class="font-semibold text-gray-800 dark:text-gray-100">${this.tt('tj_ref_title', 'Quick reference & colour key')}</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">${this.tt('tj_ref_subtitle', 'The colour used for each rule, plus the classical decision tables for noon and meem sakinah.')}</p>
        </div>
        <button data-tj-print class="shrink-0 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">🖨️ ${this.tt('tj_ref_print', 'Print')}</button>
      </div>
      <div class="rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 mb-4">
        <h3 class="text-sm uppercase tracking-wide font-semibold text-gray-400 dark:text-gray-500 mb-3">🎨 ${this.tt('tj_ref_legend', 'Colour key')}</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">${legend}</div>
      </div>
      ${decisionCard('🅝 ' + this.tt('tj_ref_noon_title', 'Noon Sakinah & Tanween'), NOON_SAKINAH_RULES)}
      ${decisionCard('🅜 ' + this.tt('tj_ref_meem_title', 'Meem Sakinah'), MEEM_SAKINAH_RULES)}`;
  }

  /** Inline "which rule?" drill built from real annotated verses. */
  drillHtml() {
    const d = this.drill;
    const head = `
      <h3 class="font-semibold text-gray-800 dark:text-gray-100">🎯 ${this.tt('tj_drill_title', 'Rule identification drill')}</h3>
      <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">${this.tt('tj_drill_intro', 'Read the highlighted letters in a real verse and pick the tajweed rule that applies.')}</p>`;
    const startBtn = `<button data-tj-drill-start class="px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/80">▶ ${this.tt('tj_drill_start', 'Start drill')}</button>`;
    const bestBadge = this.drillBest ? `
      <p class="text-xs text-amber-600 dark:text-amber-400 mt-2">🏅 ${this.tt('tj_drill_best', 'Best')}: ${this.drillBest.score} / ${this.drillBest.total}</p>` : '';
    if (!d) return `
      <div class="max-w-xl mx-auto rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 text-center">
        ${head}
        ${bestBadge}
        <div class="flex flex-wrap justify-center gap-2 mt-4">
          ${startBtn}
          <button data-tj-quiz class="px-5 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">❓ ${this.tt('tj_practice_quiz')}</button>
        </div>
      </div>`;
    if (d.status === 'loading') return `<p class="text-center text-gray-400 text-sm py-8">${this.tt('loading')}</p>`;
    if (d.status === 'empty') return `
      <div class="max-w-xl mx-auto rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 text-center">
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">${this.tt('tj_drill_empty', 'Could not build drill questions — please try again.')}</p>
        ${startBtn}
      </div>`;
    if (d.idx >= d.questions.length) {
      const scorePct = d.score / d.questions.length;
      return `
        <div class="max-w-xl mx-auto rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 text-center">
          <div class="text-4xl mb-2">${scorePct === 1 ? '🏆' : scorePct >= 0.5 ? '🎉' : '💪'}</div>
          <p class="font-semibold text-gray-800 dark:text-gray-100 mb-1">${this.esc(this.tt('quiz_your_score').replace('{score}', d.score).replace('{total}', d.questions.length))}</p>
          ${bestBadge ? `<p class="text-xs text-amber-600 dark:text-amber-400 mb-4">🏅 ${this.tt('tj_drill_best', 'Best')}: ${this.drillBest.score} / ${this.drillBest.total}</p>` : '<div class="mb-4"></div>'}
          <div class="flex flex-wrap justify-center gap-2">
            <button data-tj-drill-start class="px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/80">🔄 ${this.tt('retry')}</button>
            <button data-tj-quiz class="px-5 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">❓ ${this.tt('tj_practice_quiz')}</button>
          </div>
        </div>`;
    }
    const q = d.questions[d.idx];
    const answered = d.picked !== null;
    const correct = answered && q.options[d.picked] && q.options[d.picked].correct;
    return `
      <div class="max-w-2xl mx-auto rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
        <div class="flex items-center justify-between text-xs text-gray-400 mb-3">
          <span>${d.idx + 1} / ${d.questions.length}</span>
          <span>${this.tt('quiz_score')}: ${d.score}</span>
        </div>
        <p class="text-sm font-medium text-gray-700 dark:text-gray-200 mb-3" dir="auto">${this.tt('quiz_which_rule')}</p>
        <div class="rounded-lg bg-gray-50 dark:bg-gray-900/40 p-4 mb-2">
          <div class="ayah-arabic !text-2xl !leading-[2.4]" dir="rtl">${q.promptHtml}</div>
        </div>
        <div class="mb-4">
          <button data-ayah-ref="${q.ref}" title="${this.tt('tj_open_verse')}"
                  class="text-xs font-mono text-gray-400 hover:text-primary underline decoration-dotted underline-offset-2">${q.ref} ⓘ</button>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
          ${q.options.map((o, i) => {
            let cls = 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/40';
            if (answered) {
              if (o.correct) cls = 'border-green-500 bg-green-50 dark:bg-green-500/15 text-green-700 dark:text-green-300';
              else if (i === d.picked) cls = 'border-red-500 bg-red-50 dark:bg-red-500/15 text-red-600 dark:text-red-300';
              else cls = 'border-gray-200 dark:border-gray-700 opacity-60';
            }
            return `<button data-tj-opt="${i}" ${answered ? 'disabled' : ''} dir="auto" class="px-3 py-3 min-h-[2.75rem] rounded-lg border text-sm text-start ${cls}">${this.esc(o.name)}</button>`;
          }).join('')}
        </div>
        ${answered ? `
          <div class="mt-4 rounded-lg p-3 text-sm ${correct ? 'bg-green-50 dark:bg-green-500/10 text-green-800 dark:text-green-200' : 'bg-red-50 dark:bg-red-500/10 text-red-800 dark:text-red-200'}">
            <p class="font-semibold mb-1">${correct ? '✅ ' + this.tt('quiz_correct') : '❌ ' + this.tt('quiz_wrong')}</p>
            <p dir="auto">${this.esc(t('tjd_' + q.rule, this.language))}</p>
          </div>
          <button data-tj-drill-next class="mt-3 w-full px-4 py-2.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/80">${this.tt('next')} →</button>` : ''}
      </div>`;
  }

  async startDrill() {
    this.drill = { status: 'loading' };
    this.render();
    const req = ++this._drillReq;
    let questions = [];
    try { questions = await this.buildDrillQuestions(); } catch (e) { /* fall through to empty */ }
    if (req !== this._drillReq) return; // superseded by a newer start
    this.drill = questions.length ? { questions, idx: 0, score: 0, picked: null } : { status: 'empty' };
    if (this.view === 'drill') this.render();
  }

  _shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  /** Long verses: keep ~70 chars of context on each side of the span (word-aligned). */
  _trimWindow(text, start, end) {
    const PAD = 70;
    let s = 0, e = text.length, pre = '', post = '';
    if (start > PAD) {
      const sp = text.lastIndexOf(' ', start - PAD);
      s = sp === -1 ? start - PAD : sp + 1;
      pre = '… ';
    }
    if (text.length - end > PAD) {
      const sp = text.indexOf(' ', end + PAD);
      e = sp === -1 ? end + PAD : sp;
      post = ' …';
    }
    return { s, e, pre, post };
  }

  /** ~8 questions: one random annotated span per verse from 6 random surahs, max 2 per rule. */
  async buildDrillQuestions() {
    const surahs = this._shuffle(SURAH_DATA.map(s => s.number)).slice(0, 6);
    const items = [];
    for (const n of surahs) {
      try {
        const { text, rules } = await TajweedData.load(n);
        for (const vk in rules) {
          const m = vk.match(/^verse_(\d+)$/);
          if (!m || m[1] === '0') continue;
          const tx = text[vk], anns = rules[vk];
          if (!tx || !anns || !anns.length) continue;
          const ann = anns[Math.floor(Math.random() * anns.length)];
          if (!TAJWEED_RULES[ann.rule]) continue;
          const start = Math.max(0, ann.start), end = Math.min(tx.length, ann.end);
          if (end <= start) continue;
          items.push({ surah: n, ayah: parseInt(m[1], 10), text: tx, start, end, rule: ann.rule });
        }
      } catch (e) { /* surah data unavailable — skip */ }
      if (items.length >= 80) break;
    }
    this._shuffle(items);
    const picked = [], perRule = {};
    for (const it of items) {
      if ((perRule[it.rule] || 0) >= 2) continue;
      perRule[it.rule] = (perRule[it.rule] || 0) + 1;
      picked.push(it);
      if (picked.length >= 8) break;
    }
    const ruleKeys = Object.keys(TAJWEED_RULES);
    return picked.map(it => {
      const { s, e, pre, post } = this._trimWindow(it.text, it.start, it.end);
      const promptHtml = pre + this.esc(it.text.slice(s, it.start))
        + `<span class="bg-yellow-200 dark:bg-yellow-500/40 rounded px-0.5">${this.esc(it.text.slice(it.start, it.end))}</span>`
        + this.esc(it.text.slice(it.end, e)) + post;
      const others = this._shuffle(ruleKeys.filter(k => k !== it.rule)).slice(0, 3);
      const options = this._shuffle(
        [{ name: this.ruleName(it.rule), correct: true }]
          .concat(others.map(k => ({ name: this.ruleName(k), correct: false }))));
      return { promptHtml, options, rule: it.rule, ref: `${it.surah}:${it.ayah}` };
    });
  }

  esc(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
}

let tajweedLearn;
document.addEventListener('DOMContentLoaded', () => { tajweedLearn = new TajweedLearn(); });
