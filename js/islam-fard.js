/**
 * Islam → Fard (Obligatory Acts) module.
 *
 * Renders into #fard-container (tab "fard"). Content covers: definition,
 * categories (fard 'ayn vs fard kifayah), the five pillars, additional
 * personal fards (belief, hijra when needed, jumu'ah for men, etc.), the
 * consequences of neglect, and Quranic references. Uses the shared bilingual
 * {en, bn} pattern with CI18N fallback for other languages.
 */

const FARD_I18N = {
  islam_fard_title:    { en: 'Fard (Obligatory)', bn: 'ফরজ (অবশ্যই পালনীয়)', zh: '主命 (Fard)', ja: '義務行為（ファルド）', ar: 'الفرض', ur: 'فرض', hi: 'फ़र्ज़ (अनिवार्य)', fa: 'فرض (واجب)', id: 'Fardhu (Wajib)', ms: 'Fardu (Wajib)', tr: 'Farz (Zorunlu)', fr: 'Fard (Obligatoire)', es: 'Fard (Obligatorio)', de: 'Fard (Pflicht)', ru: 'Фард (обязательное)' },
  islam_fard_subtitle: { en: 'What Allah has made obligatory — every capable Muslim must perform it. Neglecting a fard without valid excuse is a major sin; denying it takes one outside Islam.', bn: 'আল্লাহ যা ফরজ করেছেন — প্রত্যেক সামর্থ্যবান মুসলিমকে অবশ্যই তা পালন করতে হবে। বৈধ ওজর ছাড়া ফরজ ছাড়া কবিরা গুনাহ; ফরজ অস্বীকার করলে ইসলাম থেকে বের হয়ে যায়।' },
};

const FARD_CATEGORIES = [
  {
    id: 'fard-ayn', emoji: '👤',
    titleEn: "Fard 'Ayn (Individual Obligation)",  titleBn: 'ফরজে আইন (ব্যক্তিগত ফরজ)',
    descEn: 'What EVERY capable Muslim must perform personally — no one can do it on your behalf. The five pillars of Islam are all fard \'ayn.',
    descBn: 'প্রত্যেক সামর্থ্যবান মুসলিম নিজে যা পালন করবে — কেউ আপনার পক্ষে আদায় করতে পারে না। ইসলামের পঞ্চস্তম্ভ সবই ফরজে আইন।',
  },
  {
    id: 'fard-kifayah', emoji: '🕌',
    titleEn: 'Fard Kifāyah (Collective Obligation)', titleBn: 'ফরজে কিফায়া (সামষ্টিক ফরজ)',
    descEn: 'An obligation on the community — if a sufficient number performs it, the duty is lifted from the rest. Examples: janazah prayer, saving a drowning person, seeking specialized knowledge (medicine, fiqh).',
    descBn: 'সমাজের উপর ফরজ — যথেষ্ট সংখ্যক ব্যক্তি আদায় করলে বাকি সবার পক্ষ থেকে দায় শেষ হয়। উদাহরণ: জানাযার নামাজ, ডুবন্ত ব্যক্তিকে বাঁচানো, বিশেষায়িত ইলম (চিকিৎসা, ফিকহ)।',
  },
];

const FARD_PILLARS = [
  { emoji: '☝️',
    titleEn: 'Shahādah (Testimony of Faith)', titleBn: 'শাহাদাহ (কালেমা)',
    descEn: 'To bear witness: "There is no god but Allah, and Muhammad is His Messenger." The gateway to Islam and the foundation of all obligations.',
    descBn: 'সাক্ষ্য দেওয়া: "আল্লাহ ছাড়া কোনো ইলাহ নেই, মুহাম্মদ ﷺ আল্লাহর রাসূল।" ইসলামের প্রবেশদ্বার ও সকল বিধানের ভিত্তি।',
    ref: '3:18, 47:19',
  },
  { emoji: '🕌',
    titleEn: 'Ṣalāh (5 daily prayers)', titleBn: 'সালাত (পাঁচ ওয়াক্ত নামাজ)',
    descEn: 'Establishing the five obligatory prayers at their appointed times. The first act to be judged on the Day of Resurrection.',
    descBn: 'পাঁচ ওয়াক্ত নামাজ নির্ধারিত সময়ে আদায় করা। কিয়ামতের দিন প্রথম যে আমল সম্পর্কে হিসাব হবে।',
    ref: '4:103, 2:238',
  },
  { emoji: '🌅',
    titleEn: 'Ṣawm (Fasting in Ramadan)', titleBn: 'সাওম (রমজানের রোজা)',
    descEn: 'Fasting from dawn to sunset for the entire month of Ramadan — abstaining from food, drink, sexual relations and sins.',
    descBn: 'সুবহে সাদিক থেকে সূর্যাস্ত পর্যন্ত রমজানের পুরো মাস রোজা — পানাহার, সহবাস ও পাপ থেকে বিরত থাকা।',
    ref: '2:183-185',
  },
  { emoji: '💰',
    titleEn: 'Zakāh (Obligatory Almsgiving)', titleBn: 'যাকাত',
    descEn: '2.5% of one\'s wealth held for a full lunar year (once it reaches nisāb) — distributed to the eight categories in Quran 9:60.',
    descBn: 'নেসাব পরিমাণ সম্পদের উপর এক চান্দ্র বছর অতিবাহিত হলে ২.৫% — কুরআন ৯:৬০-এর আট শ্রেণিতে বিতরণ।',
    ref: '2:110, 9:60, 9:103',
  },
  { emoji: '🕋',
    titleEn: 'Ḥajj (Pilgrimage — once in a lifetime)', titleBn: 'হজ (জীবনে একবার)',
    descEn: 'Pilgrimage to Makkah, obligatory once in a lifetime on every Muslim who has the physical and financial capacity.',
    descBn: 'মক্কায় হজ, শারীরিক ও আর্থিক সামর্থ্য থাকলে প্রত্যেক মুসলিমের উপর জীবনে একবার ফরজ।',
    ref: '3:97, 2:196-197',
  },
];

const FARD_OTHER = [
  { emoji: '💚',
    titleEn: 'ʿAqīdah (Correct Belief)', titleBn: 'সঠিক আকিদা',
    descEn: 'Believing in the six pillars of faith: Allah, His angels, His books, His messengers, the Last Day, and divine decree. This is a fard for the heart.',
    descBn: 'ঈমানের ছয়টি রুকনে বিশ্বাস: আল্লাহ, ফেরেশতা, কিতাবসমূহ, রাসূলগণ, শেষ দিবস ও তাকদীর। এটি অন্তরের ফরজ।',
    ref: '2:285, 4:136',
  },
  { emoji: '📚',
    titleEn: 'Seeking Essential Knowledge', titleBn: 'জরুরি ইলম অর্জন',
    descEn: 'Learning enough of Islam to correctly perform your daily obligations (tawhid, salah, purity, halal earnings, family rulings). "Seeking knowledge is fard on every Muslim." (Ibn Majah)',
    descBn: 'দৈনন্দিন ফরজ সঠিকভাবে আদায়ের মতো ইলম শেখা (তাওহীদ, নামাজ, পবিত্রতা, হালাল উপার্জন, পারিবারিক বিধান)। "প্রত্যেক মুসলিমের উপর ইলম অর্জন ফরজ।" (ইবনে মাজাহ)',
    ref: 'Ibn Majah 224',
  },
  { emoji: '👨‍👩‍👧',
    titleEn: 'Honouring & Caring for Parents', titleBn: 'পিতা-মাতার সাথে সদাচার',
    descEn: 'Obedience (in what is halal) and kindness to parents is directly linked with worship of Allah in the Quran.',
    descBn: 'পিতা-মাতার প্রতি (হালালে) আনুগত্য ও সদাচার কুরআনে সরাসরি আল্লাহর ইবাদতের সাথে যুক্ত।',
    ref: '17:23-24, 31:14',
  },
  { emoji: '🍽️',
    titleEn: 'Eating & Earning from Ḥalāl', titleBn: 'হালাল খাদ্য ও উপার্জন',
    descEn: 'Consuming only what is lawful (ḥalāl) and pure (ṭayyib) — and earning through lawful means. Ḥarām income invalidates du\'a.',
    descBn: 'শুধু হালাল ও পবিত্র (তাইয়িব) খাওয়া এবং হালাল উপায়ে উপার্জন। হারাম উপার্জনে দোয়া কবুল হয় না।',
    ref: '2:172, 5:88, 23:51',
  },
  { emoji: '🚶',
    titleEn: 'Jumu\'ah for Adult Free Men', titleBn: 'জুমার নামাজ (প্রাপ্তবয়স্ক স্বাধীন পুরুষের উপর)',
    descEn: 'Friday congregational prayer replaces Dhuhr and is obligatory on every free, adult, resident, sane Muslim male.',
    descBn: 'জুমার নামাজ যোহরের স্থলে আদায় হয় এবং প্রত্যেক স্বাধীন, প্রাপ্তবয়স্ক, মুকিম, সুস্থ পুরুষ মুসলিমের উপর ফরজ।',
    ref: '62:9',
  },
  { emoji: '🤝',
    titleEn: 'Fulfilling Contracts & Trusts', titleBn: 'চুক্তি ও আমানত রক্ষা',
    descEn: 'Every promise, contract, and entrusted responsibility must be fulfilled. "Return trusts to those to whom they are due." (4:58)',
    descBn: 'প্রত্যেক ওয়াদা, চুক্তি ও আমানত রক্ষা করতে হবে। "আমানত তার প্রাপকদের কাছে পৌঁছে দাও।" (৪:৫৮)',
    ref: '5:1, 4:58, 23:8',
  },
  { emoji: '⚖️',
    titleEn: 'Justice (ʿAdl) in Words and Deeds', titleBn: 'ন্যায়বিচার (কথায় ও কর্মে)',
    descEn: 'Standing firm for justice — even against oneself, parents, or relatives. Prohibited to bear false witness or take bribes.',
    descBn: 'ন্যায়ের পক্ষে দৃঢ় থাকা — এমনকি নিজের, পিতা-মাতা বা আত্মীয়দের বিরুদ্ধেও। মিথ্যা সাক্ষ্য ও ঘুষ হারাম।',
    ref: '4:135, 5:8, 16:90',
  },
  { emoji: '🚫',
    titleEn: 'Avoiding Major Sins (Kabāʾir)', titleBn: 'কবিরা গুনাহ থেকে বিরত থাকা',
    descEn: 'Abstaining from major sins is fard on every Muslim: shirk, murder, adultery, riba, false testimony, magic, mistreating parents, fleeing battle, and slandering chaste women.',
    descBn: 'কবিরা গুনাহ পরিহার প্রত্যেক মুসলিমের উপর ফরজ: শিরক, হত্যা, ব্যভিচার, সুদ, মিথ্যা সাক্ষ্য, জাদু, পিতা-মাতার সাথে দুর্ব্যবহার, যুদ্ধ ছেড়ে পালানো, সতী নারীর অপবাদ।',
    ref: '4:31, 31:13, 17:32',
  },
];

const FARD_QUR = [
  { ref: '2:183', en: '"O you who believe, decreed upon you is fasting as it was decreed upon those before you, that you may become righteous."', bn: '"হে ঈমানদারগণ! তোমাদের উপর রোজা ফরজ করা হয়েছে, যেমন তোমাদের পূর্ববর্তীদের উপর ফরজ করা হয়েছিল, যাতে তোমরা তাকওয়া অবলম্বন কর।"' },
  { ref: '4:103', en: '"Indeed, prayer has been decreed upon the believers at fixed times."', bn: '"নিশ্চয়ই নামাজ ঈমানদারদের উপর নির্ধারিত সময়ে ফরজ করা হয়েছে।"' },
  { ref: '2:110', en: '"And establish prayer and give zakat, and whatever good you put forward for yourselves — you will find it with Allah."', bn: '"তোমরা নামাজ কায়েম কর ও যাকাত দাও, তোমরা নিজেদের জন্য যে কল্যাণ অগ্রিম পাঠাবে তা আল্লাহর কাছে পাবে।"' },
  { ref: '3:97', en: '"And [due] to Allah from the people is a pilgrimage to the House — for whoever is able to find a way there."', bn: '"সামর্থ্যবান মানুষের উপর আল্লাহর জন্য এই ঘরের হজ ফরজ।"' },
  { ref: '62:9', en: '"O you who have believed, when the call to Friday prayer is proclaimed, hasten to the remembrance of Allah and leave trade."', bn: '"হে ঈমানদারগণ! জুমার দিনে যখন নামাজের জন্য আহবান করা হয়, তখন আল্লাহর যিকিরের দিকে দ্রুত ধাবিত হও এবং বেচা-কেনা ছেড়ে দাও।"' },
  { ref: '4:58', en: '"Indeed, Allah commands you to render trusts to whom they are due and, when you judge between people, to judge with justice."', bn: '"নিশ্চয়ই আল্লাহ তোমাদের নির্দেশ দেন যে, আমানতসমূহ তার প্রাপকদের কাছে পৌঁছে দাও এবং যখন লোকদের মধ্যে বিচার কর, ন্যায়ের সাথে বিচার কর।"' },
  { ref: '17:23', en: '"Your Lord has decreed that you worship none but Him, and to parents good treatment."', bn: '"তোমার রব আদেশ দিয়েছেন যে, তোমরা তাঁকে ছাড়া কারো ইবাদত করবে না এবং পিতা-মাতার সাথে সদাচার করবে।"' },
  { ref: '2:238', en: '"Guard strictly your prayers, especially the middle prayer, and stand before Allah in devout obedience."', bn: '"তোমাদের নামাজসমূহ হেফাজত কর এবং বিশেষত মধ্যবর্তী নামাজটি; আর আল্লাহর সামনে বিনীতভাবে দাঁড়াও।"' },
  { ref: '9:103', en: '"Take from their wealth a charity by which you purify them and cause them increase, and invoke blessings upon them."', bn: '"তাদের সম্পদ থেকে সদকা গ্রহণ কর যা দ্বারা তুমি তাদের পবিত্র করবে ও বরকত দেবে এবং তাদের জন্য দোয়া করো।"' },
  { ref: '23:1-2', en: '"Certainly will the believers have succeeded: they who are during their prayer humbly submissive."', bn: '"নিশ্চয়ই মুমিনগণ সফল হয়েছে: যারা তাদের নামাজে বিনয়ী।"' },
  { ref: '9:71', en: '"The believing men and believing women are allies of one another. They enjoin what is right and forbid what is wrong and establish prayer and give zakāh…"', bn: '"মুমিন পুরুষ ও মুমিন নারী পরস্পরের বন্ধু। তারা ভালো কাজের আদেশ দেয়, মন্দ থেকে নিষেধ করে, নামাজ কায়েম করে ও যাকাত দেয়…"' },
  { ref: '22:77', en: '"O you who have believed, bow and prostrate and worship your Lord and do good — that you may succeed."', bn: '"হে মুমিনগণ! রুকু কর, সিজদা কর, তোমাদের রবের ইবাদত কর এবং ভালো কাজ কর — যাতে তোমরা সফল হও।"' },
  { ref: '31:17', en: '"O my son, establish prayer, enjoin what is right, forbid what is wrong, and be patient over what befalls you."', bn: '"হে আমার পুত্র! নামাজ কায়েম কর, ভালো কাজের আদেশ দাও, মন্দ থেকে নিষেধ কর এবং তোমার উপর যে বিপদ আসে তাতে ধৈর্য ধরো।"' },
  { ref: '19:59', en: '"But there came after them successors who neglected prayer and pursued desires; so they are going to meet evil."', bn: '"তাদের পরে এমন উত্তরসূরিরা এলো যারা নামাজ নষ্ট করল ও কুপ্রবৃত্তির অনুসরণ করল; তারা শীঘ্রই ধ্বংসের সম্মুখীন হবে।"' },
  { ref: '16:90', en: '"Indeed, Allah orders justice and good conduct and giving to relatives and forbids immorality and bad conduct and oppression."', bn: '"নিশ্চয়ই আল্লাহ ন্যায়বিচার, সদাচার ও আত্মীয়দের দানের আদেশ দেন এবং অশ্লীলতা, মন্দ কাজ ও অত্যাচার থেকে নিষেধ করেন।"' },
];

const FARD_HADITH = [
  {
    textEn: '"Islam is built on five: testifying there is no god but Allah and that Muhammad is His Messenger, establishing the prayer, paying zakāh, making pilgrimage to the House, and fasting Ramadan."',
    textBn: '"ইসলাম পাঁচটি ভিত্তির উপর প্রতিষ্ঠিত: সাক্ষ্য দেওয়া যে আল্লাহ ছাড়া কোনো ইলাহ নেই এবং মুহাম্মদ ﷺ আল্লাহর রাসূল, নামাজ কায়েম করা, যাকাত দেওয়া, বাইতুল্লাহর হজ করা এবং রমজানের রোজা রাখা।"',
    srcEn: 'Bukhari 8, Muslim 16',
    srcBn: 'বুখারি ৮, মুসলিম ১৬',
  },
  {
    textEn: '"The first thing the servant will be accountable for on the Day of Resurrection is his prayer. If it is sound, the rest of his deeds will be sound; if it is corrupt, the rest of his deeds will be corrupt."',
    textBn: '"কিয়ামতের দিন বান্দার সর্বপ্রথম হিসাব হবে তার নামাজের। যদি নামাজ ঠিক থাকে তার বাকি আমলও ঠিক থাকবে; আর যদি নামাজ নষ্ট হয় তার বাকি আমলও নষ্ট হবে।"',
    srcEn: 'Tirmidhi 413 — hasan/sahih',
    srcBn: 'তিরমিযি ৪১৩ — হাসান/সহিহ',
  },
  {
    textEn: '"Whoever misses the \'Asr prayer is like one who has lost all his family and property."',
    textBn: '"যে আসরের নামাজ মিস করে সে যেন তার পরিবার ও সম্পদ সবই হারিয়ে ফেলেছে।"',
    srcEn: 'Bukhari 552, Muslim 626',
    srcBn: 'বুখারি ৫৫২, মুসলিম ৬২৬',
  },
  {
    textEn: '"Between a person and shirk and kufr is the abandonment of prayer."',
    textBn: '"একজন মানুষ ও শিরক-কুফরের মাঝে পার্থক্য হলো নামাজ ছেড়ে দেওয়া।"',
    srcEn: 'Muslim 82',
    srcBn: 'মুসলিম ৮২',
  },
  {
    textEn: '"Seeking knowledge is an obligation upon every Muslim."',
    textBn: '"প্রত্যেক মুসলিমের উপর ইলম অন্বেষণ ফরজ।"',
    srcEn: 'Ibn Majah 224 — authenticated by al-Albani',
    srcBn: 'ইবনে মাজাহ ২২৪ — আলবানি কর্তৃক সহিহ সাব্যস্ত',
  },
  {
    textEn: '"Allah said: Every deed of the son of Adam is for him, except fasting — it is for Me and I shall give the reward for it."',
    textBn: '"আল্লাহ বলেন: আদম সন্তানের প্রতিটি কাজ তার নিজের জন্য, রোজা ছাড়া — এটা আমার জন্য এবং আমিই তার পুরস্কার দেব।"',
    srcEn: 'Bukhari 1904, Muslim 1151',
    srcBn: 'বুখারি ১৯০৪, মুসলিম ১১৫১',
  },
  {
    textEn: '"Allah\'s pleasure is in the father\'s (parent\'s) pleasure, and Allah\'s displeasure is in the father\'s displeasure."',
    textBn: '"আল্লাহর সন্তুষ্টি পিতার সন্তুষ্টিতে এবং আল্লাহর অসন্তুষ্টি পিতার অসন্তুষ্টিতে।"',
    srcEn: 'Tirmidhi 1899 — sahih',
    srcBn: 'তিরমিযি ১৮৯৯ — সহিহ',
  },
  {
    textEn: '"A man came to the Prophet ﷺ seeking permission to go on jihad. The Prophet asked: Are your parents alive? He said: Yes. The Prophet said: Then make jihad with them (i.e., serve them)."',
    textBn: '"এক ব্যক্তি নবী ﷺ-এর কাছে জিহাদে যাওয়ার অনুমতি চাইলে নবী জিজ্ঞেস করলেন: তোমার পিতা-মাতা কি বেঁচে আছেন? সে বলল: হ্যাঁ। নবী বললেন: তাহলে তাদের মধ্যেই জিহাদ কর (অর্থাৎ তাদের সেবা কর)।"',
    srcEn: 'Bukhari 3004, Muslim 2549',
    srcBn: 'বুখারি ৩০০৪, মুসলিম ২৫৪৯',
  },
];

class FardModule {
  constructor() {
    this.root = document.getElementById('fard-container');
    if (!this.root) return;
    this.language = (typeof appSettings !== 'undefined' && appSettings) ? appSettings.get('language') : 'en';
    this.rendered = false;
    window.addEventListener('tabChanged', (e) => { try { if (e && e.detail && e.detail.tabId === 'fard') this.render(); } catch (_) {} });
    window.addEventListener('settingChanged', (e) => {
      try { if (e && e.detail && e.detail.key === 'language') { this.language = e.detail.value || 'en'; if (this.rendered) this.render(); } } catch (_) {}
    });
    this.root.addEventListener('click', (e) => this.handleClick(e));
  }
  tt(key) {
    const fb = FARD_I18N[key];
    if (fb) {
      if (this.language && fb[this.language]) return fb[this.language];
      if (this.language === 'bn') return fb.bn || fb.en;
      if (this.language && this.language !== 'en' && typeof CI18N !== 'undefined') { const tr = CI18N.tr(this.language, fb.en); if (tr) return tr; }
      return fb.en;
    }
    return (typeof t === 'function') ? t(key, this.language) : key;
  }
  lc(o) {
    if (!o) return '';
    const lang = this.language;
    if (lang && o[lang]) return o[lang];
    if (lang === 'bn') return o.bn || o.en || '';
    if (lang && lang !== 'en' && typeof CI18N !== 'undefined' && o.en) { const tr = CI18N.tr(lang, o.en); if (tr) return tr; }
    return o.en || o.bn || '';
  }
  esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
  render() {
    this.rendered = true;
    const L = (o) => this.esc(this.lc(o));
    this.root.innerHTML = `
      <div class="max-w-3xl mx-auto space-y-6 py-4">
        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div class="p-6 bg-gradient-to-br from-emerald-50 to-transparent dark:from-emerald-900/10">
            <div class="text-4xl mb-2" aria-hidden="true">⭐</div>
            <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100">${this.esc(this.tt('islam_fard_title'))}</h2>
            <p class="text-gray-500 dark:text-gray-400 mt-2 text-sm leading-relaxed" dir="auto">${this.esc(this.tt('islam_fard_subtitle'))}</p>
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">📚 ${L({ en: 'Two categories of Fard', bn: 'ফরজের দুই প্রকার' })}</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            ${FARD_CATEGORIES.map(c => `
              <div class="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/40">
                <div class="text-sm font-semibold text-emerald-800 dark:text-emerald-200 mb-1"><span aria-hidden="true">${c.emoji}</span> ${L({ en: c.titleEn, bn: c.titleBn })}</div>
                <p class="text-xs text-emerald-700 dark:text-emerald-300 leading-relaxed" dir="auto">${L({ en: c.descEn, bn: c.descBn })}</p>
              </div>`).join('')}
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">🕋 ${L({ en: 'The Five Pillars of Islam', bn: 'ইসলামের পঞ্চস্তম্ভ' })}</h3>
          <div class="space-y-3">
            ${FARD_PILLARS.map((p, i) => `
              <div class="flex gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700">
                <span class="shrink-0 w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-sm font-bold flex items-center justify-center">${i + 1}</span>
                <div class="flex-1 min-w-0">
                  <div class="text-sm font-semibold text-gray-800 dark:text-gray-100"><span aria-hidden="true">${p.emoji}</span> ${L({ en: p.titleEn, bn: p.titleBn })}</div>
                  <p class="text-xs text-gray-600 dark:text-gray-300 mt-1 leading-relaxed" dir="auto">${L({ en: p.descEn, bn: p.descBn })}</p>
                  <button type="button" data-fard-ayah="${this.esc(p.ref.split(',')[0].trim())}" class="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-[0.65rem] font-medium hover:bg-emerald-500 hover:text-white transition-colors">📖 ${this.esc(p.ref)}</button>
                </div>
              </div>`).join('')}
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">✅ ${L({ en: 'Other Personal Obligations', bn: 'অন্যান্য ব্যক্তিগত ফরজ' })}</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            ${FARD_OTHER.map(o => `
              <div class="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700">
                <div class="text-sm font-semibold text-gray-800 dark:text-gray-100"><span aria-hidden="true">${o.emoji}</span> ${L({ en: o.titleEn, bn: o.titleBn })}</div>
                <p class="text-xs text-gray-600 dark:text-gray-300 mt-1 leading-relaxed" dir="auto">${L({ en: o.descEn, bn: o.descBn })}</p>
                <button type="button" data-fard-ayah="${this.esc(o.ref.split(',')[0].trim())}" class="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[0.65rem] font-medium hover:bg-primary hover:text-white transition-colors">📖 ${this.esc(o.ref)}</button>
              </div>`).join('')}
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-red-200 dark:border-red-900/30 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-1 flex items-center gap-2">⚠️ ${L({ en: 'Consequences of Neglecting Fard', bn: 'ফরজ অবহেলার পরিণতি' })}</h3>
          <p class="text-xs text-gray-500 dark:text-gray-400 mb-3 leading-relaxed" dir="auto">${L({ en: 'Neglecting a fard while accepting its obligation is a grave major sin. Denying a definitively established fard takes one outside Islam. The Quran and the Prophet ﷺ warn explicitly about abandoning obligatory acts.', bn: 'ফরজ মেনে নিয়েও পালন না করা ভয়াবহ কবিরা গুনাহ। সুনিশ্চিত ফরজ অস্বীকার করা ইসলাম থেকে বের করে দেয়। কুরআন ও নবী ﷺ ফরজ পরিত্যাগ সম্পর্কে সরাসরি সতর্ক করেছেন।' })}</p>
          <div class="space-y-2 mb-3">
            ${[
              { ref: '19:59', en: '"But there came after them successors who neglected prayer and pursued desires; so they are going to meet evil [Ghayy — a valley in Hell]."', bn: '"তাদের পরে এমন উত্তরসূরিরা এলো যারা নামাজ নষ্ট করল ও কুপ্রবৃত্তির অনুসরণ করল; তারা শীঘ্রই \'গাইয়্যা\' নামক জাহান্নামের উপত্যকায় পতিত হবে।"' },
              { ref: '74:42-43', en: '"What put you into Saqar (Hell)? They will say: We were not of those who prayed."', bn: '"কী তোমাদের সাকারে (জাহান্নামে) প্রবেশ করিয়েছে? তারা বলবে: আমরা নামাজ পড়তাম না।"' },
              { ref: '20:124', en: '"Whoever turns away from My remembrance — indeed, he will have a depressed life, and We will gather him on the Day of Resurrection blind."', bn: '"যে আমার স্মরণ থেকে মুখ ফিরিয়ে নেবে তার জীবিকা সংকীর্ণ হবে এবং কিয়ামতের দিন আমি তাকে অন্ধ অবস্থায় উঠাব।"' },
            ].map(q => `
              <div class="p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30">
                <p class="text-sm text-red-800 dark:text-red-200 leading-relaxed" dir="auto">${L({ en: q.en, bn: q.bn })}</p>
                <button type="button" data-fard-ayah="${this.esc(q.ref)}" class="mt-2 inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-red-500/10 text-red-700 dark:text-red-300 text-xs font-medium hover:bg-red-500 hover:text-white transition-colors">📖 ${this.esc(q.ref)} ${L({ en: 'Read', bn: 'পড়ুন' })}</button>
              </div>`).join('')}
          </div>
          <div class="space-y-2">
            ${[
              { textEn: '"Between a person and shirk and kufr is the abandonment of prayer."', textBn: '"একজন মানুষ ও শিরক-কুফরের মাঝে পার্থক্য হলো নামাজ ছেড়ে দেওয়া।"', srcEn: 'Muslim 82', srcBn: 'মুসলিম ৮২' },
              { textEn: '"The covenant between us and them is prayer; whoever abandons it has committed kufr."', textBn: '"আমাদের ও তাদের মাঝে চুক্তি হলো নামাজ; যে তা ছেড়ে দেয় সে কুফরে পড়ে গেছে।"', srcEn: 'Tirmidhi 2621, Ahmad — sahih', srcBn: 'তিরমিযি ২৬২১, আহমাদ — সহিহ' },
            ].map(h => `
              <div class="p-3 rounded-xl bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-900/30">
                <p class="text-sm text-orange-800 dark:text-orange-200 leading-relaxed" dir="auto">${L({ en: h.textEn, bn: h.textBn })}</p>
                <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">— ${L({ en: h.srcEn, bn: h.srcBn })}</p>
              </div>`).join('')}
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">💬 ${L({ en: 'Hadith on Fard', bn: 'ফরজ সম্পর্কে হাদিস' })}</h3>
          <div class="space-y-3">
            ${FARD_HADITH.map(h => `
              <div class="p-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/40">
                <p class="text-sm text-green-800 dark:text-green-200 leading-relaxed" dir="auto">${L({ en: h.textEn, bn: h.textBn })}</p>
                <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">— ${L({ en: h.srcEn, bn: h.srcBn })}</p>
              </div>`).join('')}
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">📖 ${L({ en: 'Quranic References on Fard', bn: 'ফরজ সম্পর্কে কুরআনি রেফারেন্স' })}</h3>
          <div class="space-y-3">
            ${FARD_QUR.map(q => `
              <div class="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/40">
                <p class="text-sm text-emerald-800 dark:text-emerald-200 leading-relaxed" dir="auto">${L({ en: q.en, bn: q.bn })}</p>
                <button type="button" data-fard-ayah="${this.esc(q.ref)}" class="mt-2 inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-xs font-medium hover:bg-emerald-500 hover:text-white transition-colors">📖 ${this.esc(q.ref)} ${L({ en: 'Read', bn: 'পড়ুন' })}</button>
              </div>`).join('')}
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">🧠 ${L({ en: 'Self-check', bn: 'নিজেই যাচাই' })}</h3>
          <div class="space-y-2">
            ${[
              { q: { en: 'What is the difference between fard \'ayn and fard kifayah?', bn: 'ফরজে আইন ও ফরজে কিফায়ার পার্থক্য কী?' }, a: { en: 'Fard \'ayn is an individual obligation on every Muslim (like the five daily prayers). Fard kifayah is on the community as a whole — if enough people do it, the rest are relieved (like janazah prayer).', bn: 'ফরজে আইন প্রত্যেক ব্যক্তির উপর ফরজ (যেমন পাঁচ ওয়াক্ত নামাজ)। ফরজে কিফায়া সমগ্র সমাজের উপর — যথেষ্ট সংখ্যক আদায় করলে বাকিরা মুক্ত (যেমন জানাযা)।' } },
              { q: { en: 'What is the ruling on denying a well-known fard?', bn: 'সর্বজনস্বীকৃত ফরজ অস্বীকার করার হুকুম কী?' }, a: { en: 'Denying a fard that is definitively established (like the five prayers or fasting Ramadan) takes a person outside Islam (kufr). Neglecting it while accepting its obligation is a major sin.', bn: 'সুস্পষ্ট ফরজ (যেমন পাঁচ ওয়াক্ত নামাজ, রমজান রোজা) অস্বীকার করলে ইসলাম থেকে বের হয়ে যায় (কুফর)। ফরজ মেনে অলসতায় ছেড়ে দিলে কবিরা গুনাহ।' } },
              { q: { en: 'Is seeking Islamic knowledge fard on every Muslim?', bn: 'প্রত্যেক মুসলিমের উপর কি ইসলামি ইলম অর্জন ফরজ?' }, a: { en: 'Yes — enough to correctly perform daily obligations (tawhid, salah, purity, halal earnings, etc.) is fard \'ayn. Specialized knowledge (medicine, fiqh mastery) is fard kifayah.', bn: 'হ্যাঁ — দৈনন্দিন ফরজ সঠিকভাবে আদায়ের মতো ইলম (তাওহীদ, নামাজ, পবিত্রতা, হালাল উপার্জন) ফরজে আইন। বিশেষায়িত ইলম (চিকিৎসা, ফিকহের গভীর জ্ঞান) ফরজে কিফায়া।' } },
              { q: { en: 'Is Jumu\'ah fard for women?', bn: 'জুমা কি নারীদের উপর ফরজ?' }, a: { en: 'The majority of scholars say no — it is not obligatory on women, children, travelers, or slaves. Women may attend and it will count for them; women pray Dhuhr at home if they don\'t attend.', bn: 'জমহুরের মতে না — নারী, শিশু, মুসাফির বা দাসের উপর ফরজ নয়। নারীরা অংশ নিলে গণ্য হবে; না গেলে যোহর পড়বেন।' } },
              { q: { en: 'Which comes first in importance: shahādah or salah?', bn: 'শাহাদাহ ও নামাজের মধ্যে কোনটির অগ্রাধিকার?' }, a: { en: 'Shahādah — it is the gateway to Islam and the foundation of every other obligation. Salah is the second pillar and the first act to be judged, but without shahādah no other act is accepted.', bn: 'শাহাদাহ — এটি ইসলামের প্রবেশদ্বার ও সকল বিধানের ভিত্তি। নামাজ দ্বিতীয় স্তম্ভ ও কিয়ামতে প্রথম হিসাব হওয়া আমল, কিন্তু শাহাদাহ ছাড়া কোনো আমল কবুল হয় না।' } },
              { q: { en: 'What constitutes physical and financial capability (istiṭāʿah) for Ḥajj?', bn: 'হজের জন্য শারীরিক ও আর্থিক সামর্থ্য (ইস্তিতাআহ) কী?' }, a: { en: 'Financial: sufficient funds to cover the journey, accommodation, and family expenses during absence. Physical: able to travel without extreme hardship. Safety on the route is also required — a dangerous route removes the obligation until it is safe.', bn: 'আর্থিক: যাতায়াত, থাকা-খাওয়া ও অনুপস্থিতিতে পরিবারের খরচ বহনের সামর্থ্য। শারীরিক: অতিরিক্ত কষ্ট ছাড়া সফর করার সক্ষমতা। পথের নিরাপত্তাও শর্ত — নিরাপদ না হলে সামর্থ্য থাকলেও দায় শেষ হয়।' } },
              { q: { en: 'What are the seven great destroyers (sabʿu l-mūbiqāt)?', bn: 'সাতটি মহা ধ্বংসকারী (সাবউল মূবিকাত) কী?' }, a: { en: '"Avoid the seven great destroyers: shirk, magic, unlawful killing, consuming the orphan\'s wealth, consuming ribā, fleeing from battle, and slandering chaste believing women." (Bukhari 2766, Muslim 89)', bn: '"সাতটি মহা ধ্বংসকারী থেকে বাঁচো: শিরক, জাদু, অন্যায় হত্যা, ইয়াতিমের সম্পদ ভোগ, সুদ, যুদ্ধ থেকে পলায়ন ও সতী মুমিন নারীর অপবাদ।" (বুখারি ২৭৬৬, মুসলিম ৮৯)' } },
              { q: { en: 'What is the nisāb (minimum threshold) for zakāh on gold and cash?', bn: 'সোনা ও নগদ অর্থের যাকাতের নেসাব কী?' }, a: { en: 'Gold nisāb: 85 grams (20 mithqāl). Silver nisāb: 595 grams (200 dirhams). Cash and trade goods are assessed against the lower of the two (silver, per most scholars). After one full lunar year (ḥawl) passes on that wealth, 2.5% is due.', bn: 'সোনার নেসাব: ৮৫ গ্রাম (২০ মিসকাল)। রূপার নেসাব: ৫৯৫ গ্রাম (২০০ দিরহাম)। নগদ ও ব্যবসায়িক পণ্য অধিকাংশ আলেমের মতে রূপার নেসাবে মাপা হয়। এক চান্দ্র বছর (হাওল) পার হলে ২.৫% যাকাত ফরজ।' } },
              { q: { en: 'What is the ruling on a Muslim who abandons ṣalāh entirely out of laziness?', bn: 'আলসেমিতে সম্পূর্ণ নামাজ ছেড়ে দেওয়া মুসলিমের হুকুম কী?' }, a: { en: 'The majority (Ḥanafī, Mālikī, Shāfiʿī) say it is an enormously grave sin deserving severe punishment, but does not constitute kufr so long as the person believes the prayer is obligatory. The Ḥanbalī school holds it constitutes kufr (apostasy), based on Muslim 82 and Tirmidhi 2621.', bn: 'জমহুর আলেম (হানাফি, মালিকী, শাফিয়ী) বলেন: এটা ভয়াবহ কবিরা গুনাহ — কঠোর শাস্তিযোগ্য — কিন্তু নামাজ ফরজ মনে করলে কুফর নয়। হাম্বলী মাযহাব বলে: এটা কুফর (মুসলিম ৮২, তিরমিযি ২৬২১)।' } },
              { q: { en: 'Which events make ghusl (major ritual bath) obligatory?', bn: 'কোন ঘটনায় গোসল (বড় তাহারাত) ফরজ হয়?' }, a: { en: 'Four: (1) ejaculation with desire (wet dream or intercourse), (2) sexual intercourse even without ejaculation, (3) end of menstruation (ḥayḍ), (4) end of post-natal bleeding (nifās). One must be in a state of purity to pray — ghusl is a personal fard whenever these occur.', bn: 'চারটি: (১) কামভাবসহ বীর্যপাত (স্বপ্নদোষ বা মিলন), (২) মিলন যদিও বীর্যপাত না হয়, (৩) হায়েজ শেষ হওয়া, (৪) নিফাস শেষ হওয়া। পবিত্র না হলে নামাজ হয় না — এই কারণগুলো ঘটলে গোসল ব্যক্তিগত ফরজ।' } },
              { q: { en: 'Is jihad (defensive) a fard ʿayn or fard kifāyah?', bn: 'প্রতিরক্ষামূলক জিহাদ কি ফরজে আইন নাকি ফরজে কিফায়া?' }, a: { en: 'Generally fard kifāyah on the community. It becomes fard ʿayn on every capable Muslim in that area when: (1) the enemy invades Muslim lands, (2) the ruler calls all to arms, or (3) one is already present on the battlefield and retreat would cause harm.', bn: 'সাধারণত সমাজের উপর ফরজে কিফায়া। নিম্নোক্ত ক্ষেত্রে সেই এলাকার প্রত্যেক সক্ষম মুসলিমের উপর ফরজে আইন হয়: (১) শত্রু মুসলিম ভূমিতে আক্রমণ করলে, (২) শাসক সবাইকে ডাকলে, বা (৩) ইতোমধ্যে যুদ্ধক্ষেত্রে উপস্থিত থাকলে।' } },
            ].map(item => `
              <details class="rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/40 overflow-hidden">
                <summary class="flex items-center gap-2 p-3 cursor-pointer list-none hover:bg-emerald-100/50 dark:hover:bg-emerald-900/30">
                  <span class="text-emerald-600 dark:text-emerald-400 text-sm">❓</span>
                  <span class="flex-1 text-sm font-medium text-gray-800 dark:text-gray-100" dir="auto">${L(item.q)}</span>
                  <span class="text-emerald-500 text-xs">▼</span>
                </summary>
                <div class="px-4 pb-3 pt-1 text-xs text-gray-700 dark:text-gray-200 leading-relaxed border-t border-emerald-100 dark:border-emerald-900/40" dir="auto">✅ ${L(item.a)}</div>
              </details>`).join('')}
          </div>
        </div>
      </div>`;
  }
  handleClick(e) {
    const ayah = e.target.closest('[data-fard-ayah]');
    if (ayah) { try { if (typeof ayahModal !== 'undefined' && ayahModal && ayahModal.open) ayahModal.open(ayah.getAttribute('data-fard-ayah')); } catch (_) {} }
  }
}

let fardModule;
document.addEventListener('DOMContentLoaded', () => { fardModule = new FardModule(); });
