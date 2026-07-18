const NUZUL_I18N = {
  nuzul_title:          { en: 'Revelation Context', bn: 'শানে নুযূল', zh: '启示背景', ja: '啓示の背景' },
  nuzul_subtitle:       { en: 'The order in which the Qur\'an was revealed, and — sūrah by sūrah — the documented occasions behind the verses (asbāb an-nuzūl). Not every āyah has a recorded occasion; those that do are shown in āyah order.', bn: 'কুরআন যে ক্রমে অবতীর্ণ হয়েছে, এবং সূরা ধরে ধরে আয়াতসমূহের পেছনের নথিভুক্ত প্রেক্ষাপট (আসবাবুন নুযূল)। প্রতিটি আয়াতের নির্দিষ্ট শানে নুযূল নেই; যেগুলোর আছে সেগুলো আয়াত-ক্রমে দেখানো হয়েছে।', zh: '古兰经启示的顺序，以及逐章记录的经文背后的事件（启示背景）。并非每节经文都有记录。', ja: 'クルアーンが啓示された順序と、章ごとに記録された啓示の背景（アスバーブ・アン＝ヌズール）。すべての節に記録があるわけではありません。' },
  nuzul_view_overview:  { en: 'Sūrahs', bn: 'সূরা', zh: '章节', ja: 'スーラ' },
  nuzul_view_quiz:      { en: 'Quiz', bn: 'কুইজ', zh: '测验', ja: 'クイズ' },
  nuzul_quiz_intro:     { en: 'Test your knowledge of revelation order and asbāb an-nuzūl.', bn: 'অবতীর্ণের ক্রম ও আসবাবুন নুযূল সম্পর্কে আপনার জ্ঞান পরীক্ষা করুন।', zh: '测试您对启示顺序和启示背景的了解。', ja: '啓示の順序とアスバーブ・アン＝ヌズールの知識をテストしましょう。' },
  nuzul_quiz_score:     { en: 'Your score', bn: 'আপনার স্কোর', zh: '您的分数', ja: 'スコア' },
  nuzul_quiz_best:      { en: 'Best', bn: 'সেরা', zh: '最佳', ja: '最高' },
  nuzul_quiz_submit:    { en: 'Check answers', bn: 'উত্তর দেখুন', zh: '检查答案', ja: '回答を確認' },
  nuzul_quiz_retake:    { en: 'Try again', bn: 'আবার চেষ্টা করুন', zh: '再试一次', ja: 'もう一度挑戦' },
  nuzul_quiz_hint:      { en: 'Answer all questions to submit', bn: 'জমা দিতে সব প্রশ্নের উত্তর দিন', zh: '回答所有问题后提交', ja: 'すべての質問に答えて提出' },
  nuzul_view_themes:    { en: 'Themes', bn: 'বিষয়ভিত্তিক', zh: '主题', ja: 'テーマ' },
  nuzul_view_timeline:  { en: 'Timeline', bn: 'কালরেখা', zh: '时间轴', ja: 'タイムライン' },
  nuzul_themes_intro:   { en: 'Browse sūrahs grouped by dominant theme. A sūrah may appear under more than one theme.', bn: 'প্রধান বিষয় অনুযায়ী সূরাসমূহ দেখুন। একটি সূরা একাধিক বিষয়ের অন্তর্ভুক্ত হতে পারে।', zh: '按主题浏览章节，一章可能出现在多个主题下。', ja: 'テーマ別にスーラを閲覧します。一つのスーラが複数のテーマに登場することがあります。' },
  nuzul_timeline_intro: { en: 'Six revelation phases from the first waḥy in Ḥirāʾ to the completion of the Qurʾānic message.', bn: 'হেরা গুহায় প্রথম ওয়াহী থেকে কুরআনের বার্তা পূর্ণ হওয়া পর্যন্ত ছয়টি অবতীর্ণ পর্যায়।', zh: '从希拉山的第一次启示到古兰经信息完成的六个阶段。', ja: 'ヒラーの洞窟の最初のワヒーからクルアーンのメッセージ完成までの6つの段階。' },
  nuzul_rev_neighbors:  { en: 'Neighbors in Revelation Order', bn: 'অবতীর্ণ ক্রমে প্রতিবেশী সূরা', zh: '启示顺序中的相邻章节', ja: '啓示順序の隣接スーラ' },
  nuzul_first_last_rev: { en: 'Revelation Position', bn: 'অবতীর্ণ অবস্থান', zh: '启示位置', ja: '啓示の位置' },
  nuzul_asbab_count:    { en: 'asbāb entries', bn: 'আসবাব', zh: '启示背景条目', ja: 'アスバーブ記録' },
  nuzul_key_events:     { en: 'Key events', bn: 'প্রধান ঘটনাসমূহ', zh: '主要事件', ja: '主要な出来事' },
};

const NUZUL_QUIZ = [
  { qEn: 'Which sūrah is generally accepted as the first complete sūrah revealed?', qBn: 'সর্বপ্রথম পূর্ণাঙ্গ সূরারূপে অবতীর্ণ হয়েছে কোন সূরা?',
    optsEn: ['Surah al-Fatiha', 'Surah al-Ikhlas', "Surah al-'Alaq", 'Surah an-Nas'], optsBn: ['সূরা ফাতিহা', 'সূরা ইখলাস', 'সূরা আলাক', 'সূরা নাস'], correct: 0 },
  { qEn: 'How many sūrahs make up the "Seven Long Ones" (al-Sab\' al-Tiwāl)?', qBn: '"সাবউ তিওয়াল" (সাত দীর্ঘ) সূরা কয়টি?',
    optsEn: ['7', '5', '9', '11'], optsBn: ['৭', '৫', '৯', '১১'], correct: 0 },
  { qEn: 'What was the first āyah revealed to Prophet Muhammad ﷺ?', qBn: 'নবী মুহাম্মাদ ﷺ-এর উপর প্রথম অবতীর্ণ আয়াত কোনটি?',
    optsEn: ['Bismillahir Rahmanir Rahim', 'Alhamdu lillahi Rabbil Alamin', 'Iqra bismi rabbik', 'Ya ayyuhal muddaththir'], optsBn: ['বিসমিল্লাহির রাহমানির রাহিম', 'আলহামদু লিল্লাহি রাব্বিল আলামিন', 'إقْرَأْ بِاسْمِ رَبِّكَ', 'يَا أَيُّهَا الْمُدَّثِّرُ'], correct: 2 },
  { qEn: 'Into how many phases is the revelation order typically divided?', qBn: 'অবতীর্ণের ক্রমকে সাধারণত কয়টি পর্যায়ে ভাগ করা হয়?',
    optsEn: ['2', '4', '6', '8'], optsBn: ['২', '৪', '৬', '৮'], correct: 1 },
  { qEn: 'Which sūrah is the last complete sūrah of the Qur\'an?', qBn: 'কুরআনের সর্বশেষ পূর্ণাঙ্গ সূরা কোনটি?',
    optsEn: ['Surah al-Ikhlas (112)', "Surah al-Falaq (113)", 'Surah an-Nas (114)', 'Surah an-Nasr (110)'], optsBn: ['সূরা ইখলাস (১১২)', 'সূরা ফালাক (১১৩)', 'সূরা নাস (১১৪)', 'সূরা নাসর (১১০)'], correct: 3 },
  { qEn: 'How many Meccan sūrahs are there in the Qur\'an?', qBn: 'কুরআনে কয়টি মক্কী সূরা আছে?',
    optsEn: ['82', '86', '92', '76'], optsBn: ['৮২', '৮৬', '৯২', '৭৬'], correct: 1 },
  { qEn: 'How many Medinan sūrahs are there?', qBn: 'কুরআনে কয়টি মাদানী সূরা আছে?',
    optsEn: ['20', '28', '32', '18'], optsBn: ['২০', '২৮', '৩২', '১৮'], correct: 1 },
  { qEn: 'What is the meaning of "Asbāb an-Nuzūl"?', qBn: '"আসবাবুন নুযূল" এর অর্থ কী?',
    optsEn: ['The pillars of faith', 'The causes/occasions of revelation', 'The rules of recitation', 'The levels of paradise'], optsBn: ['ঈমানের স্তম্ভ', 'অবতীর্ণের কারণ/প্রেক্ষাপট', 'তিলাওয়াতের নিয়ম', 'জান্নাতের স্তর'], correct: 1 },
  { qEn: 'Which Meccan period (phase) includes sūrahs like al-Qalam (68) and al-Muzzammil (73)?', qBn: 'কোন মক্কী পর্যায়ে সূরা আল-কলম (৬৮) ও আল-মুজ্জাম্মিল (৭৩) অন্তর্ভুক্ত?',
    optsEn: ['Early Meccan', 'Middle Meccan', 'Late Meccan', 'Medinan'], optsBn: ['প্রথম মক্কী', 'মধ্য মক্কী', 'শেষ মক্কী', 'মাদানী'], correct: 0 },
  { qEn: 'Which sūrah in the muṣḥaf is a Medinan sūrah?', qBn: 'মুসহাফের কোন সূরাটি মাদানী?',
    optsEn: ["Surah al-'Alaq (96)", 'Surah al-Baqarah (2)', "Surah al-Masad (111)", 'Surah al-Quraysh (106)'], optsBn: ['সূরা আলাক (৯৬)', 'সূরা বাকারা (২)', 'সূরা মাসাদ (১১১)', 'সূরা কুরায়শ (১০৬)'], correct: 1 },
  { qEn: 'What was the context (asbab) for the revelation of Surah al-Kawthar (108)?', qBn: 'সূরা কাওসার (১০৮) অবতীর্ণের প্রেক্ষাপট কী?',
    optsEn: ['When the Prophet\'s son passed away and he was mocked', 'During the Battle of Badr', 'During the conquest of Mecca', 'On the night of Isra and Mi\'raj'], optsBn: ['নবী ﷺ-এর পুত্রের ইন্তেকালে ব্যঙ্গ করা হলে', 'বদর যুদ্ধের সময়', 'মক্কা বিজয়ের সময়', 'ইসরা ও মিরাজের রাতে'], correct: 0 },
  { qEn: 'The longest sūrah in the Qur\'an was revealed in which phase?', qBn: 'কুরআনের দীর্ঘতম সূরাটি কোন পর্যায়ে অবতীর্ণ হয়েছে?',
    optsEn: ['Early Meccan', 'Middle Meccan', 'Late Meccan', 'Medinan'], optsBn: ['প্রথম মক্কী', 'মধ্য মক্কী', 'শেষ মক্কী', 'মাদানী'], correct: 3 },
  { qEn: 'Which sūrah was revealed when the Prophet ﷺ was in the cave of Thawr during the Hijra?', qBn: 'হিজরতের সময় নবী ﷺ সাওর গুহায় থাকাকালে কোন সূরাটি অবতীর্ণ হয়?',
    optsEn: ['Surah at-Tawbah (9)', 'Surah al-Anfal (8)', 'Surah Muhammad (47)', 'Surah al-Fatiha (1)'], optsBn: ['সূরা তাওবা (৯)', 'সূরা আনফাল (৮)', 'সূরা মুহাম্মাদ (৪৭)', 'সূরা ফাতিহা (১)'], correct: 0 },
  { qEn: 'How many total sūrahs were revealed in the Meccan period?', qBn: 'মক্কী পর্যায়ে মোট কতটি সূরা অবতীর্ণ হয়েছে?',
    optsEn: ['About 48', 'About 62', 'About 86', 'About 96'], optsBn: ['প্রায় ৪৮', 'প্রায় ৬২', 'প্রায় ৮৬', 'প্রায় ৯৬'], correct: 2 },
  { qEn: 'What does "Makki" refer to?', qBn: '"মক্কী" বলতে কী বোঝায়?',
    optsEn: ['Sūrahs revealed before the Hijra', 'Sūrahs revealed in Mecca only', 'Sūrahs about Mecca', 'Short sūrahs'], optsBn: ['হিজরতের পূর্বে অবতীর্ণ সূরা', 'শুধু মক্কায় অবতীর্ণ সূরা', 'মক্কা সম্পর্কিত সূরা', 'ছোট সূরা'], correct: 0 },
  { qEn: 'What does "Madani" refer to?', qBn: '"মাদানী" বলতে কী বোঝায়?',
    optsEn: ['Sūrahs about Medina', 'Sūrahs revealed after the Hijra', 'Long sūrahs', 'Medinan Arabic dialect'], optsBn: ['মদিনা সম্পর্কিত সূরা', 'হিজরতের পর অবতীর্ণ সূরা', 'দীর্ঘ সূরা', 'মাদানী আরবি উপভাষা'], correct: 1 },
];

const NUZUL_THEMES = [
  {
    id: 'identity', emoji: '🕌',
    titleEn: "Believers' Identity", titleBn: 'মুমিনের পরিচয়',
    descEn: 'Sūrahs that define the Muslim community — their qualities, their role as a united ummah, and the essence of sincere faith.',
    descBn: 'যেসব সূরায় মুসলিম সমাজের পরিচয় — তাদের গুণাবলী, ঐক্যবদ্ধ উম্মাহ হিসেবে ভূমিকা এবং খাঁটি ঈমানের সারমর্ম নির্ধারণ করা হয়েছে।',
    surahs: [2, 3, 4, 9, 22, 49, 57, 61, 103]
  },
  {
    id: 'prophethood', emoji: '📜',
    titleEn: 'Prophethood', titleBn: 'নবুওয়াত',
    descEn: 'Sūrahs addressing the reality of messengership, the sending of prophets to every nation, and the mission of the final Messenger ﷺ.',
    descBn: 'রাসূলের বাস্তবতা, প্রতিটি জাতিতে নবী প্রেরণ এবং শেষ রাসূল ﷺ-এর মিশন নিয়ে সূরাসমূহ।',
    surahs: [10, 11, 16, 21, 25, 36, 40, 43]
  },
  {
    id: 'divine', emoji: '✨',
    titleEn: 'Divine Attributes', titleBn: 'আল্লাহর গুণাবলী',
    descEn: 'Sūrahs centrally focused on the Names and Attributes of Allah — His majesty, mercy, power, and absolute uniqueness (tawḥīd).',
    descBn: 'আল্লাহর নাম ও গুণাবলী — তাঁর মহিমা, রহমত, ক্ষমতা এবং একচ্ছত্র অদ্বিতীয়তা (তাওহীদ) কেন্দ্রিক সূরাসমূহ।',
    surahs: [1, 55, 57, 59, 64, 67, 87, 112, 113, 114]
  },
  {
    id: 'stories', emoji: '📖',
    titleEn: 'Prophetic Stories', titleBn: 'নবীদের কাহিনী',
    descEn: 'Sūrahs rich with narratives of the prophets — Ādam, Ibrāhīm, Mūsā, Yūsuf, ʿĪsā and others — as timeless lessons and comfort.',
    descBn: 'আদম, ইবরাহিম, মুসা, ইউসুফ, ঈসা ও অন্যান্য নবীদের কাহিনীসমৃদ্ধ সূরাসমূহ — চিরকালীন শিক্ষা ও সান্ত্বনা।',
    surahs: [7, 11, 12, 18, 19, 20, 21, 26, 27, 28, 37, 38]
  },
  {
    id: 'legal', emoji: '⚖️',
    titleEn: 'Legal Rulings', titleBn: 'বিধিমালা',
    descEn: 'Sūrahs containing detailed legislation — prayer, fasting, family law, inheritance, social contracts, and community governance.',
    descBn: 'যেসব সূরায় বিস্তারিত বিধি-বিধান — নামাজ, রোজা, পারিবারিক আইন, উত্তরাধিকার, সামাজিক চুক্তি ও রাষ্ট্রপরিচালনা।',
    surahs: [2, 4, 5, 24, 33, 58, 65, 66]
  },
  {
    id: 'eschato', emoji: '🌅',
    titleEn: 'Eschatology', titleBn: 'পরকালতত্ত্ব',
    descEn: 'Sūrahs whose primary focus is the Day of Judgment, the Hereafter, scenes of Heaven and Hell, and the ultimate reckoning.',
    descBn: 'যেসব সূরার মূল আলোচনা কিয়ামত, পরকাল, জান্নাত-জাহান্নামের দৃশ্য এবং চূড়ান্ত হিসাব।',
    surahs: [36, 44, 50, 56, 69, 75, 78, 82, 84, 99, 101]
  },
  {
    id: 'warnings', emoji: '⚡',
    titleEn: 'Warnings', titleBn: 'সতর্কবার্তা',
    descEn: 'Sūrahs whose dominant tone is a solemn warning to those who reject the truth, drawing on the fate of destroyed nations.',
    descBn: 'যেসব সূরার প্রধান সুর হলো সত্যপ্রত্যাখ্যানকারীদের প্রতি গুরুতর সতর্কবার্তা এবং ধ্বংসপ্রাপ্ত জাতির পরিণতি।',
    surahs: [14, 17, 54, 67, 71, 88, 102, 104, 111]
  },
  {
    id: 'consolations', emoji: '💚',
    titleEn: 'Consolations', titleBn: 'সান্ত্বনা',
    descEn: 'Sūrahs of divine comfort — revealed to reassure the Prophet ﷺ and early believers during hardship, grief, and pressure.',
    descBn: 'দিব্য সান্ত্বনার সূরাসমূহ — কঠিন সময়, দুঃখ ও চাপের মধ্যে নবী ﷺ এবং প্রথম মুমিনদের আশ্বস্ত করতে অবতীর্ণ।',
    surahs: [6, 28, 40, 73, 93, 94, 97, 108, 110]
  },
  {
    id: 'guidance', emoji: '🌟',
    titleEn: 'Guidance for Believers', titleBn: 'মুমিনদের পথনির্দেশ',
    descEn: 'Sūrahs delivering direct practical and moral guidance — etiquettes, virtues, self-purification, and conduct within society.',
    descBn: 'যেসব সূরায় সরাসরি ব্যবহারিক ও নৈতিক নির্দেশনা — আদব, সদগুণ, আত্মশুদ্ধি ও সামাজিক আচরণ।',
    surahs: [17, 23, 24, 29, 30, 31, 49, 60]
  },
];

class NuzulView {
  constructor() {
    this.container = document.getElementById('nuzul-container');
    if (!this.container) return;
    this.language = (typeof appSettings !== 'undefined' && appSettings) ? appSettings.get('language') : 'en';
    if (!this.language) this.language = 'en';

    this.rendered = false;
    this.orderMode = this.loadOrderMode();
    this.selected = null;
    this.query = '';
    this.subView = 'surahs';

    this.revBySurah = {};
    this.phases = [];
    this.landmarks = [];
    this.asbab = {};
    this.dataLoaded = false;
    this.dataLoading = false;

    this.quizAnswers = {};
    this.quizSubmitted = false;
    this.quizBest = this.loadQuizBest();

    this.loadData();

    window.addEventListener('tabChanged', (e) => {
      try { if (e && e.detail && e.detail.tabId === 'nuzul') this.render(); } catch (_) { }
    });
    window.addEventListener('settingChanged', (e) => {
      try {
        if (e && e.detail && e.detail.key === 'language') {
          this.language = e.detail.value || 'en';
          if (this.rendered) this.render();
        }
      } catch (_) { }
    });
  }

  loadQuizBest() {
    try { return parseInt(localStorage.getItem('lq_nuzul_quiz_best'), 10) || 0; } catch (_) { return 0; }
  }
  saveQuizBest() {
    try { localStorage.setItem('lq_nuzul_quiz_best', String(this.quizBest)); } catch (_) { }
  }

  async loadData() {
    if (this.dataLoaded || this.dataLoading) return;
    this.dataLoading = true;
    try {
      const rev = await this.fetchJson('data/nuzul/revelation-order.json');
      if (rev && typeof rev === 'object') {
        if (Array.isArray(rev.surahOrder)) {
          for (const s of rev.surahOrder) {
            if (s && typeof s.n === 'number') this.revBySurah[s.n] = { order: s.order, phase: s.phase };
          }
        }
        if (Array.isArray(rev.phases)) this.phases = rev.phases;
        if (Array.isArray(rev.landmarks)) this.landmarks = rev.landmarks;
      }
      const manifest = await this.fetchJson('data/nuzul/manifest.json');
      if (Array.isArray(manifest)) {
        for (const fname of manifest) {
          if (typeof fname !== 'string' || !fname) continue;
          const shard = await this.fetchJson('data/nuzul/' + fname);
          if (shard && shard.asbab && typeof shard.asbab === 'object') this.mergeAsbab(shard.asbab);
        }
      }
    } catch (_) { }
    this.dataLoading = false;
    this.dataLoaded = true;
    try { if (this.rendered) this.render(); } catch (_) { }
  }

  async fetchJson(url) {
    try {
      const res = await fetch(url, { cache: 'no-cache' });
      if (!res || !res.ok) return null;
      return await res.json();
    } catch (_) { return null; }
  }

  mergeAsbab(map) {
    for (const key of Object.keys(map)) {
      const arr = map[key];
      if (!Array.isArray(arr)) continue;
      if (!this.asbab[key]) this.asbab[key] = [];
      const seen = new Set(this.asbab[key].map(x => x && x.ref));
      for (const e of arr) {
        if (!e || typeof e !== 'object' || !e.ref || seen.has(e.ref)) continue;
        seen.add(e.ref);
        this.asbab[key].push(e);
      }
      this.asbab[key].sort((a, b) => this.ayahNum(a.ref) - this.ayahNum(b.ref));
    }
  }

  esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }

  tt(key) {
    try { const v = t(key, this.language); if (v && v !== key) return v; } catch (_) { }
    const e = NUZUL_I18N[key];
    if (e) return e[this.language] || e.en || key;
    return key;
  }

  lc(o) {
    if (!o) return '';
    if (this.language === 'bn' && o.bn) return o.bn;
    if (o.en && typeof CI18N !== 'undefined') { const tr = CI18N.tr(this.language, o.en); if (tr) return tr; }
    return o.en || o.bn || '';
  }
  pick(item, field) { return this.lc({ en: item[field + 'En'], bn: item[field + 'Bn'] }); }

  ayahNum(ref) { const p = String(ref || '').split(':'); return parseInt(p[1], 10) || 0; }
  surahNum(ref) { const p = String(ref || '').split(':'); return parseInt(p[0], 10) || 0; }

  surahMeta(n) {
    try {
      const s = (typeof SURAH_DATA !== 'undefined') ? SURAH_DATA[n - 1] : null;
      if (!s) return { name: 'Surah ' + n, arabic: '', ayahCount: 0, medinan: false };
      const name = (s.names && (s.names[this.language] || s.names.en)) || ('Surah ' + n);
      return { name, arabic: s.arabicName || '', ayahCount: s.ayahCount || 0, medinan: s.revelationType === 'Medinan' };
    } catch (_) { return { name: 'Surah ' + n, arabic: '', ayahCount: 0, medinan: false }; }
  }

  phaseById(id) { return this.phases.find(p => p && p.id === id) || null; }

  loadOrderMode() {
    try { const v = localStorage.getItem('lq_nuzul_order'); return (v === 'mushaf' || v === 'nuzul') ? v : 'nuzul'; } catch (_) { return 'nuzul'; }
  }
  saveOrderMode() { try { localStorage.setItem('lq_nuzul_order', this.orderMode); } catch (_) { } }

  openAyah(ref) {
    try {
      if (typeof ayahModal !== 'undefined' && ayahModal && typeof ayahModal.open === 'function') ayahModal.open(ref);
    } catch (_) { }
  }

  render() {
    this.rendered = true;
    if (!this.container) return;
    if (this.selected) {
      this.container.innerHTML = this.renderDetail(this.selected);
    } else if (this.subView === 'quiz') {
      this.container.innerHTML = this.renderQuiz();
    } else if (this.subView === 'themes') {
      this.container.innerHTML = this.renderThemes();
    } else if (this.subView === 'timeline') {
      this.container.innerHTML = this.renderTimeline();
    } else {
      this.container.innerHTML = this.renderOverview();
    }
    this.bind();
  }

  header() {
    return `
      <div class="mb-4">
        <h2 class="text-xl font-bold text-gray-900 dark:text-gray-50" dir="auto">📜 ${this.esc(this.tt('nuzul_title'))}</h2>
        <p class="text-sm text-gray-600 dark:text-gray-300 mt-1 leading-relaxed" dir="auto">${this.esc(this.tt('nuzul_subtitle'))}</p>
      </div>`;
  }

  subToggleHtml() {
    const btn = (id, label) => `
      <button type="button" data-nuzul-sub="${id}"
        class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap
               ${this.subView === id ? 'bg-white dark:bg-gray-700 text-primary shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}">
        ${this.esc(label)}</button>`;
    return `
      <div class="flex justify-center mb-4">
        <div class="inline-flex gap-1 p-1 rounded-xl bg-gray-100 dark:bg-gray-800">
          ${btn('surahs', this.tt('nuzul_view_overview'))}
          ${btn('themes', this.tt('nuzul_view_themes'))}
          ${btn('timeline', this.tt('nuzul_view_timeline'))}
          ${btn('quiz', this.tt('nuzul_view_quiz'))}
        </div>
      </div>`;
  }

  renderOverview() {
    const landmarks = this.renderLandmarks();
    const toggle = `
      <div class="flex items-center gap-2 mb-4 flex-wrap">
        <div class="inline-flex rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600 text-sm">
          <button data-nuzul-order="nuzul" class="px-3 py-1.5 ${this.orderMode === 'nuzul' ? 'bg-emerald-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200'}">${this.esc(this.lc({ en: 'Revelation order', bn: 'অবতীর্ণের ক্রম' }))}</button>
          <button data-nuzul-order="mushaf" class="px-3 py-1.5 ${this.orderMode === 'mushaf' ? 'bg-emerald-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200'}">${this.esc(this.lc({ en: 'Muṣḥaf order', bn: 'মুসহাফ ক্রম' }))}</button>
        </div>
        <input data-nuzul-search value="${this.esc(this.query)}" placeholder="${this.esc(this.lc({ en: 'Search sūrah…', bn: 'সূরা খুঁজুন…' }))}" class="flex-1 min-w-[8rem] px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-100" dir="auto" />
      </div>`;

    let body = '';
    if (this.orderMode === 'nuzul' && this.phases.length) {
      body = this.phases.map(ph => {
        const rows = [];
        for (let n = 1; n <= 114; n++) {
          const r = this.revBySurah[n];
          if (!r || r.phase !== ph.id) continue;
          rows.push({ n, order: r.order });
        }
        rows.sort((a, b) => a.order - b.order);
        const chips = rows.filter(x => this.matchesSurah(x.n)).map(x => this.surahChip(x.n, x.order)).join('');
        if (!chips) return '';
        return `
          <div class="mb-5">
            <div class="flex items-center gap-2 mb-2">
              <span class="text-lg">${this.esc(ph.emoji || '•')}</span>
              <h3 class="font-semibold text-gray-800 dark:text-gray-100" dir="auto">${this.esc(this.pick(ph, 'title'))}</h3>
              <span class="text-xs text-gray-500 dark:text-gray-400">${rows.length}</span>
            </div>
            <p class="text-xs text-gray-500 dark:text-gray-400 mb-2 leading-relaxed" dir="auto">${this.esc(this.pick(ph, 'desc'))}</p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">${chips}</div>
          </div>`;
      }).join('');
    } else {
      const chips = [];
      for (let n = 1; n <= 114; n++) {
        if (!this.matchesSurah(n)) continue;
        const r = this.revBySurah[n];
        chips.push(this.surahChip(n, r ? r.order : null));
      }
      body = `<div class="grid grid-cols-1 sm:grid-cols-2 gap-2">${chips.join('')}</div>`;
    }
    if (!body.trim()) body = `<p class="text-sm text-gray-500 dark:text-gray-400 py-8 text-center" dir="auto">${this.esc(this.lc({ en: 'No sūrah matches your search.', bn: 'আপনার অনুসন্ধানে কোনো সূরা মেলেনি।' }))}</p>`;

    return `<div class="max-w-3xl mx-auto p-1">${this.header()}${this.subToggleHtml()}${this.renderFoundations()}${landmarks}${toggle}${body}</div>`;
  }

  /**
   * "Foundations of Nuzūl" — a compact educational preamble that appears above
   * the sūrah list in the overview. Explains the 23-year timeline, Makki vs
   * Madani characteristics, first & last revelations, and the longest known
   * pause in revelation (fatratul-wahy). All bilingual, CI18N-aware.
   */
  renderFoundations() {
    const L = (o) => this.esc(this.lc(o));
    return `
      <details class="mb-5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
        <summary class="flex items-center gap-2 p-4 cursor-pointer list-none hover:bg-gray-50 dark:hover:bg-gray-700/40">
          <span class="text-xl">📖</span>
          <span class="flex-1 font-semibold text-sm text-gray-800 dark:text-gray-100" dir="auto">${L({ en: 'Foundations of Nuzūl — how the Quran was revealed', bn: 'নুযূলের মূলধারা — কুরআন যেভাবে অবতীর্ণ হয়েছে' })}</span>
          <span class="text-gray-400 text-xs">▼</span>
        </summary>
        <div class="px-4 pb-4 space-y-4">

          <div class="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/40">
            <div class="text-sm font-semibold text-emerald-800 dark:text-emerald-200 mb-1">⏱️ ${L({ en: '23-year revelation span', bn: '২৩ বছরের অবতীর্ণকাল' })}</div>
            <p class="text-xs text-emerald-700 dark:text-emerald-300 leading-relaxed" dir="auto">${L({ en: 'The Quran was revealed to the Prophet ﷺ gradually over approximately 23 years — ~13 years in Makkah (from age 40) and ~10 years in Madinah (after the Hijrah), ending shortly before his passing at age 63. It was NOT sent down all at once; verses came as circumstances demanded, guiding an emerging community.', bn: 'কুরআন নবী ﷺ-এর উপর প্রায় ২৩ বছর ধরে ক্রমান্বয়ে অবতীর্ণ হয় — মক্কায় প্রায় ১৩ বছর (৪০ বছর বয়সে শুরু) ও মদিনায় প্রায় ১০ বছর (হিজরতের পর), ৬৩ বছর বয়সে ইন্তেকালের কিছু আগে সমাপ্ত হয়। এটি একসাথে অবতীর্ণ হয়নি; পরিস্থিতি অনুযায়ী আয়াত এসেছে, উদীয়মান সমাজকে পথ দেখিয়েছে।' })}</p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/40">
              <div class="text-sm font-semibold text-amber-800 dark:text-amber-200 mb-1">🕋 ${L({ en: 'Makki sūrahs (~86)', bn: 'মক্কী সূরা (~৮৬)' })}</div>
              <ul class="mt-1 space-y-1">
                <li class="text-xs text-amber-700 dark:text-amber-300 flex gap-1"><span>•</span> ${L({ en: 'Generally shorter, powerful rhythm', bn: 'সাধারণত ছোট, শক্তিশালী ছন্দ' })}</li>
                <li class="text-xs text-amber-700 dark:text-amber-300 flex gap-1"><span>•</span> ${L({ en: 'Focus on tawḥīd (Oneness of Allah), the Hereafter, prophethood, and stories of past nations', bn: 'তাওহীদ, আখিরাত, নবুওয়াত ও পূর্ববর্তী জাতির কাহিনী কেন্দ্রিক' })}</li>
                <li class="text-xs text-amber-700 dark:text-amber-300 flex gap-1"><span>•</span> ${L({ en: 'Frequent oaths ("By the fig and the olive…") and vivid imagery of Judgment Day', bn: 'ঘন কসম ("তীন ও যায়তুনের কসম…") এবং কিয়ামতের প্রাণবন্ত বর্ণনা' })}</li>
                <li class="text-xs text-amber-700 dark:text-amber-300 flex gap-1"><span>•</span> ${L({ en: 'Address "O mankind" (yā ayyuha-nnās) — the message is universal', bn: 'সম্বোধন "হে মানবজাতি" (يا أيها الناس) — বার্তা সর্বজনীন' })}</li>
                <li class="text-xs text-amber-700 dark:text-amber-300 flex gap-1"><span>•</span> ${L({ en: 'Almost every sūrah with a prostration (sajdah) verse is Makki', bn: 'সিজদার আয়াতযুক্ত প্রায় প্রতিটি সূরা মক্কী' })}</li>
              </ul>
            </div>
            <div class="p-3 rounded-xl bg-sky-50 dark:bg-sky-900/20 border border-sky-100 dark:border-sky-900/40">
              <div class="text-sm font-semibold text-sky-800 dark:text-sky-200 mb-1">🌇 ${L({ en: 'Madani sūrahs (~28)', bn: 'মাদানী সূরা (~২৮)' })}</div>
              <ul class="mt-1 space-y-1">
                <li class="text-xs text-sky-700 dark:text-sky-300 flex gap-1"><span>•</span> ${L({ en: 'Generally longer, detailed rulings and legislation', bn: 'সাধারণত দীর্ঘ, বিস্তারিত বিধান ও আইন' })}</li>
                <li class="text-xs text-sky-700 dark:text-sky-300 flex gap-1"><span>•</span> ${L({ en: 'Focus on family law, inheritance, ḥudūd, jihād, treaties, community governance', bn: 'পারিবারিক আইন, উত্তরাধিকার, হুদূদ, জিহাদ, চুক্তি ও রাষ্ট্রপরিচালনা কেন্দ্রিক' })}</li>
                <li class="text-xs text-sky-700 dark:text-sky-300 flex gap-1"><span>•</span> ${L({ en: 'Address the People of the Book (Jews and Christians) and hypocrites', bn: 'আহলে কিতাব (ইহুদি ও খ্রিস্টান) ও মুনাফিকদের সম্বোধন' })}</li>
                <li class="text-xs text-sky-700 dark:text-sky-300 flex gap-1"><span>•</span> ${L({ en: 'Address "O you who believe" (yā ayyuha-lladhīna āmanū)', bn: 'সম্বোধন "হে ঈমানদারগণ" (يا أيها الذين آمنوا)' })}</li>
                <li class="text-xs text-sky-700 dark:text-sky-300 flex gap-1"><span>•</span> ${L({ en: 'All ribā, hijāb, munāfiqīn and jihād rulings are Madani', bn: 'সুদ, হিজাব, মুনাফিক ও জিহাদ সংক্রান্ত সব বিধান মাদানী' })}</li>
              </ul>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="p-3 rounded-xl bg-violet-50 dark:bg-violet-900/20 border border-violet-100 dark:border-violet-900/40">
              <div class="text-sm font-semibold text-violet-800 dark:text-violet-200 mb-1">🌟 ${L({ en: 'First revelation', bn: 'প্রথম অবতীর্ণ' })}</div>
              <p class="text-base text-violet-900 dark:text-violet-100 text-center leading-loose mt-1" dir="rtl">اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ</p>
              <p class="text-xs text-violet-700 dark:text-violet-300 mt-1" dir="auto">${L({ en: 'The first five verses of Sūrat al-\'Alaq (96:1-5) were revealed by Jibrīl (AS) in the cave of Ḥirā\' when the Prophet ﷺ was 40. He returned home trembling and said "Cover me, cover me" (zammilūnī zammilūnī). Khadījah (RA) comforted him.', bn: 'নবী ﷺ-এর ৪০ বছর বয়সে হেরা গুহায় জিবরাঈল (আঃ) সূরা আলাক (৯৬:১-৫)-এর প্রথম পাঁচ আয়াত নিয়ে আসেন। তিনি কাঁপতে কাঁপতে ঘরে ফিরে "যাম্মিলূনী যাম্মিলূনী" (আমাকে ঢেকে দাও) বললে খাদীজা (রাঃ) তাঁকে সান্ত্বনা দেন।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-violet-50 dark:bg-violet-900/20 border border-violet-100 dark:border-violet-900/40">
              <div class="text-sm font-semibold text-violet-800 dark:text-violet-200 mb-1">🕊️ ${L({ en: 'Among the last revelations', bn: 'সর্বশেষ অবতীর্ণগুলির অন্যতম' })}</div>
              <p class="text-base text-violet-900 dark:text-violet-100 text-center leading-loose mt-1" dir="rtl">الْيَوْمَ أَكْمَلْتُ لَكُمْ دِينَكُمْ</p>
              <p class="text-xs text-violet-700 dark:text-violet-300 mt-1" dir="auto">${L({ en: 'Sūrat al-Māʾidah 5:3 was revealed on the Day of Arafah during the Farewell Pilgrimage (10 AH): "This day I have perfected for you your religion…" Scholars debate the very last verse — commonly cited: al-Baqarah 2:281 (about a Day when all return to Allah), revealed just days before the Prophet ﷺ passed away.', bn: 'সূরা মায়িদাহ ৫:৩ বিদায় হজের দিনে (১০ হিজরি আরাফা) অবতীর্ণ হয়: "আজ আমি তোমাদের জন্য তোমাদের দ্বীন পূর্ণাঙ্গ করেছি…" শেষ আয়াত সম্পর্কে মতভেদ আছে — জনপ্রিয় মত: আল-বাকারা ২:২৮১ (আল্লাহর দিকে ফিরে যাওয়ার দিন সম্পর্কে), যা নবী ﷺ-এর ইন্তেকালের কয়েকদিন আগে অবতীর্ণ হয়।' })}</p>
            </div>
          </div>

          <div class="p-3 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-900/40">
            <div class="text-sm font-semibold text-rose-800 dark:text-rose-200 mb-1">🌑 ${L({ en: 'Fatrat al-Waḥy — the pause of revelation', bn: 'ফতরাতুল ওয়াহী — অবতীর্ণের বিরতি' })}</div>
            <p class="text-xs text-rose-700 dark:text-rose-300 leading-relaxed" dir="auto">${L({ en: 'After the first revelation, wahy paused for a period (traditions differ: some say a few days, others longer). The Prophet ﷺ was so distressed that he feared abandonment. Then Sūrat al-Ḍuḥā (93) descended: "Your Lord has not forsaken you, nor is He displeased." — a comfort that reaffirmed the mission and continues to console every believer feeling distant from Allah.', bn: 'প্রথম ওয়াহীর পর কিছুকাল অবতীর্ণ থেমে ছিল (রেওয়ায়াতে মতভেদ: কেউ কয়েক দিন, কেউ দীর্ঘ)। নবী ﷺ এতটাই ব্যথিত হন যে তিনি পরিত্যক্ত হওয়ার ভয় করেন। তখন সূরা আদ-দুহা (৯৩) নাযিল হয়: "তোমার রব তোমাকে ত্যাগ করেননি, তিনি তোমার প্রতি অসন্তুষ্টও নন।" — একটি সান্ত্বনা যা মিশন পুনঃনিশ্চিত করে এবং আজও আল্লাহ থেকে দূরত্ব অনুভবকারী প্রতিটি ঈমানদারকে সান্ত্বনা দেয়।' })}</p>
          </div>

          <div class="p-3 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-900/40">
            <div class="text-sm font-semibold text-teal-800 dark:text-teal-200 mb-1">📚 ${L({ en: 'Two orders: revelation vs muṣḥaf', bn: 'দুই ধরনের ক্রম: অবতীর্ণ বনাম মুসহাফ' })}</div>
            <p class="text-xs text-teal-700 dark:text-teal-300 leading-relaxed" dir="auto">${L({ en: 'The order verses were revealed differs from the order they appear in the muṣḥaf (the compiled Quran). The muṣḥaf order was fixed by the Prophet ﷺ himself, guided by Jibrīl (AS), and preserved by the Companions. The revelation order — reconstructed by scholars from hadith and asbāb an-nuzūl — helps us understand the historical context, why certain rulings came before others, and the pedagogical progression of the message.', bn: 'আয়াতসমূহ যে ক্রমে অবতীর্ণ হয়েছে তা মুসহাফের ক্রম (সংকলিত কুরআন) থেকে ভিন্ন। মুসহাফের ক্রম স্বয়ং নবী ﷺ জিবরাঈল (আঃ)-এর নির্দেশনায় নির্ধারণ করেছেন এবং সাহাবাগণ তা সংরক্ষণ করেছেন। অবতীর্ণের ক্রম — হাদিস ও আসবাবুন নুযূল থেকে আলিমগণ পুনর্গঠিত — আমাদের ঐতিহাসিক প্রেক্ষাপট, কেন কিছু বিধান অন্যগুলোর আগে এসেছে এবং বার্তার শিক্ষণীয় ক্রম বুঝতে সাহায্য করে।' })}</p>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            <div class="p-2 rounded-lg bg-white dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700 text-center">
              <div class="text-xl font-bold text-primary">114</div>
              <div class="text-[0.65rem] text-gray-500 dark:text-gray-400" dir="auto">${L({ en: 'total sūrahs', bn: 'মোট সূরা' })}</div>
            </div>
            <div class="p-2 rounded-lg bg-white dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700 text-center">
              <div class="text-xl font-bold text-amber-600">86</div>
              <div class="text-[0.65rem] text-gray-500 dark:text-gray-400" dir="auto">${L({ en: 'Makki', bn: 'মক্কী' })}</div>
            </div>
            <div class="p-2 rounded-lg bg-white dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700 text-center">
              <div class="text-xl font-bold text-sky-600">28</div>
              <div class="text-[0.65rem] text-gray-500 dark:text-gray-400" dir="auto">${L({ en: 'Madani', bn: 'মাদানী' })}</div>
            </div>
            <div class="p-2 rounded-lg bg-white dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700 text-center">
              <div class="text-xl font-bold text-emerald-600">6236</div>
              <div class="text-[0.65rem] text-gray-500 dark:text-gray-400" dir="auto">${L({ en: 'total āyāt', bn: 'মোট আয়াত' })}</div>
            </div>
          </div>

        </div>
      </details>`;
  }

  matchesSurah(n) {
    const q = this.query.trim().toLowerCase();
    if (!q) return true;
    const m = this.surahMeta(n);
    const hay = [String(n), m.name, m.arabic, this.revBySurah[n] ? String(this.revBySurah[n].order) : ''].join(' ').toLowerCase();
    return hay.indexOf(q) !== -1;
  }

  surahChip(n, order) {
    const m = this.surahMeta(n);
    const hasAsbab = Array.isArray(this.asbab[String(n)]) && this.asbab[String(n)].length;
    const badge = this.orderMode === 'nuzul' ? (order != null ? order : '–') : n;
    const badgeLabel = this.orderMode === 'nuzul'
      ? this.lc({ en: 'revealed #', bn: 'অবতীর্ণ #' })
      : this.lc({ en: 'sūrah #', bn: 'সূরা #' });
    const dot = m.medinan ? 'bg-sky-500' : 'bg-amber-500';
    const place = m.medinan ? this.lc({ en: 'Medinan', bn: 'মাদানী' }) : this.lc({ en: 'Meccan', bn: 'মক্কী' });
    return `
      <button data-nuzul-surah="${n}" class="text-start flex items-center gap-3 p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-emerald-400 dark:hover:border-emerald-500 transition-colors">
        <span class="flex-shrink-0 w-9 h-9 rounded-full bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 flex items-center justify-center text-sm font-bold" title="${this.esc(badgeLabel)}">${this.esc(String(badge))}</span>
        <span class="flex-1 min-w-0">
          <span class="flex items-center gap-2">
            <span class="font-semibold text-sm text-gray-800 dark:text-gray-100 truncate" dir="auto">${this.esc(m.name)}</span>
            <span class="text-[0.9rem] text-gray-500 dark:text-gray-400 shrink-0" dir="rtl">${this.esc(m.arabic)}</span>
          </span>
          <span class="flex items-center gap-2 mt-0.5">
            <span class="inline-flex items-center gap-1 text-[0.65rem] text-gray-500 dark:text-gray-400"><span class="w-1.5 h-1.5 rounded-full ${dot}"></span>${this.esc(place)}</span>
            <span class="text-[0.65rem] text-gray-400 dark:text-gray-500">${m.ayahCount} ${this.esc(this.lc({ en: 'āyāt', bn: 'আয়াত' }))}</span>
            ${hasAsbab ? `<span class="text-[0.65rem] px-1.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300">${this.esc(this.lc({ en: 'context', bn: 'প্রেক্ষাপট' }))} · ${this.asbab[String(n)].length}</span>` : ''}
          </span>
        </span>
      </button>`;
  }

  renderLandmarks() {
    if (!this.landmarks.length) return '';
    const kindLabel = (k) => ({
      first: this.lc({ en: 'First revealed', bn: 'সর্বপ্রথম অবতীর্ণ' }),
      last: this.lc({ en: 'Among the last', bn: 'সর্বশেষগুলোর একটি' }),
      completion: this.lc({ en: 'Completion', bn: 'পূর্ণতা' }),
      asbab: this.lc({ en: 'Landmark', bn: 'মাইলফলক' }),
    }[k] || this.lc({ en: 'Landmark', bn: 'মাইলফলক' }));
    const cards = this.landmarks.map(l => `
      <button data-nuzul-ayah="${this.esc(l.ref)}" class="text-start flex-shrink-0 w-60 p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-900/30 dark:to-gray-800 hover:border-emerald-400 transition-colors">
        <span class="inline-block text-[0.6rem] uppercase tracking-wide font-semibold text-emerald-700 dark:text-emerald-300 mb-1">${this.esc(kindLabel(l.kind))} · ${this.esc(l.ref)}</span>
        <span class="block font-semibold text-sm text-gray-800 dark:text-gray-100 mb-1" dir="auto">${this.esc(this.pick(l, 'title'))}</span>
        <span class="block text-xs text-gray-600 dark:text-gray-300 leading-snug line-clamp-3" dir="auto">${this.esc(this.pick(l, 'note'))}</span>
      </button>`).join('');
    return `
      <div class="mb-4">
        <h3 class="text-xs uppercase tracking-wide font-semibold text-gray-500 dark:text-gray-400 mb-2">${this.esc(this.lc({ en: 'Landmark āyāt', bn: 'মাইলফলক আয়াত' }))}</h3>
        <div class="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">${cards}</div>
      </div>`;
  }

  renderDetail(n) {
    const m = this.surahMeta(n);
    const r = this.revBySurah[n];
    const ph = r ? this.phaseById(r.phase) : null;
    const entries = (this.asbab[String(n)] || []).slice().sort((a, b) => this.ayahNum(a.ref) - this.ayahNum(b.ref));
    let prevRevN = null, nextRevN = null;
    if (r) {
      for (let i = 1; i <= 114; i++) {
        const ri = this.revBySurah[i];
        if (ri && ri.order === r.order - 1) prevRevN = i;
        if (ri && ri.order === r.order + 1) nextRevN = i;
      }
    }

    const back = `
      <button data-nuzul-back class="inline-flex items-center gap-1 text-sm text-emerald-700 dark:text-emerald-300 mb-3 hover:underline">
        <span aria-hidden="true">←</span> ${this.esc(this.lc({ en: 'All sūrahs', bn: 'সব সূরা' }))}
      </button>`;

    const place = m.medinan ? this.lc({ en: 'Medinan', bn: 'মাদানী' }) : this.lc({ en: 'Meccan', bn: 'মক্কী' });
    const headCard = `
      <div class="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 mb-4">
        <div class="flex items-start justify-between gap-3">
          <div class="min-w-0">
            <div class="flex items-center gap-2 flex-wrap">
              <h2 class="text-lg font-bold text-gray-900 dark:text-gray-50" dir="auto">${this.esc(m.name)}</h2>
              <span class="text-lg text-gray-500 dark:text-gray-400" dir="rtl">${this.esc(m.arabic)}</span>
            </div>
            <div class="flex items-center gap-2 mt-1 flex-wrap text-xs text-gray-500 dark:text-gray-400">
              <span class="inline-flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full ${m.medinan ? 'bg-sky-500' : 'bg-amber-500'}"></span>${this.esc(place)}</span>
              <span>· ${m.ayahCount} ${this.esc(this.lc({ en: 'āyāt', bn: 'আয়াত' }))}</span>
              <span>· ${this.esc(this.lc({ en: 'Muṣḥaf #', bn: 'মুসহাফ #' }))}${n}</span>
              ${entries.length ? `<span class="inline-block px-1.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 font-medium">${entries.length} ${this.esc(this.tt('nuzul_asbab_count'))}</span>` : ''}
            </div>
          </div>
          ${r ? `<div class="flex-shrink-0 text-center">
            <div class="w-14 h-14 rounded-full bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 flex items-center justify-center text-xl font-bold">${r.order}</div>
            <div class="text-[0.6rem] text-gray-500 dark:text-gray-400 mt-1 leading-tight">${this.esc(this.lc({ en: 'revealed<br>of 114', bn: 'অবতীর্ণ<br>১১৪-এর' }))}</div>
          </div>` : ''}
        </div>
        ${ph ? `<div class="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 flex items-start gap-2">
          <span class="text-base">${this.esc(ph.emoji || '•')}</span>
          <div>
            <div class="text-sm font-semibold text-gray-700 dark:text-gray-200" dir="auto">${this.esc(this.pick(ph, 'title'))}</div>
            <div class="text-xs text-gray-500 dark:text-gray-400 leading-relaxed" dir="auto">${this.esc(this.pick(ph, 'desc'))}</div>
          </div>
        </div>` : ''}
      </div>`;

    const revInfoCard = r ? `
      <div class="rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20 p-3 mb-4">
        <div class="flex items-center gap-1.5 mb-2">
          <span>🔢</span>
          <span class="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">${this.esc(this.tt('nuzul_first_last_rev'))}</span>
        </div>
        <div class="flex flex-wrap gap-x-5 gap-y-1 text-sm text-gray-700 dark:text-gray-200">
          <span dir="auto">${this.esc(this.lc({ en: 'Revelation order', bn: 'অবতীর্ণ ক্রম' }))}: <strong class="text-emerald-700 dark:text-emerald-300">#${r.order}</strong> / 114</span>
          ${ph ? `<span dir="auto">${this.esc(ph.emoji || '')} ${this.esc(this.pick(ph, 'title'))}</span>` : ''}
          <span dir="auto">${this.esc(this.lc({ en: 'Spans', bn: 'বিস্তৃত' }))} ${this.esc(this.lc({ en: 'āyāt', bn: 'আয়াত' }))} 1–${m.ayahCount}</span>
        </div>
      </div>` : '';

    const revNeighbors = (prevRevN || nextRevN) ? `
      <div class="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 mb-4">
        <div class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">↔ ${this.esc(this.tt('nuzul_rev_neighbors'))}</div>
        <div class="flex items-stretch gap-2">
          ${prevRevN ? `
            <button data-nuzul-surah="${prevRevN}" class="flex-1 text-start p-2 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-emerald-400 dark:hover:border-emerald-500 transition-colors">
              <div class="text-[0.65rem] text-gray-400 dark:text-gray-500 mb-0.5">← #${r.order - 1} ${this.esc(this.lc({ en: 'revealed before', bn: 'আগে অবতীর্ণ' }))}</div>
              <div class="font-semibold text-sm text-emerald-700 dark:text-emerald-300 truncate" dir="auto">${this.esc(this.surahMeta(prevRevN).name)}</div>
              <div class="text-[0.65rem] text-gray-400 dark:text-gray-500 truncate" dir="rtl">${this.esc(this.surahMeta(prevRevN).arabic)}</div>
            </button>` : '<div class="flex-1"></div>'}
          ${nextRevN ? `
            <button data-nuzul-surah="${nextRevN}" class="flex-1 text-end p-2 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-emerald-400 dark:hover:border-emerald-500 transition-colors">
              <div class="text-[0.65rem] text-gray-400 dark:text-gray-500 mb-0.5">#${r.order + 1} ${this.esc(this.lc({ en: 'revealed after', bn: 'পরে অবতীর্ণ' }))} →</div>
              <div class="font-semibold text-sm text-emerald-700 dark:text-emerald-300 truncate" dir="auto">${this.esc(this.surahMeta(nextRevN).name)}</div>
              <div class="text-[0.65rem] text-gray-400 dark:text-gray-500 truncate" dir="rtl">${this.esc(this.surahMeta(nextRevN).arabic)}</div>
            </button>` : '<div class="flex-1"></div>'}
        </div>
      </div>` : '';

    let timeline;
    if (entries.length) {
      const items = entries.map((e, i) => `
        <div class="relative pl-8 pb-5 ${i === entries.length - 1 ? '' : 'border-s-2 border-emerald-200 dark:border-emerald-800'} ms-1">
          <span class="absolute -start-[9px] top-0.5 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-gray-900"></span>
          <button data-nuzul-ayah="${this.esc(e.ref)}" class="inline-block text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 mb-1 hover:bg-emerald-200">${this.esc(e.ref)}</button>
          <h4 class="font-semibold text-sm text-gray-800 dark:text-gray-100" dir="auto">${this.esc(this.pick(e, 'title'))}</h4>
          <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mt-0.5" dir="auto">${this.esc(this.pick(e, 'context'))}</p>
        </div>`).join('');
      timeline = `
        <h3 class="text-xs uppercase tracking-wide font-semibold text-gray-500 dark:text-gray-400 mb-3">${this.esc(this.lc({ en: 'Occasions of revelation', bn: 'অবতীর্ণের প্রেক্ষাপট' }))} · ${entries.length}</h3>
        <div class="mt-1">${items}</div>`;
    } else {
      timeline = `
        <div class="rounded-xl border border-dashed border-gray-300 dark:border-gray-600 p-6 text-center">
          <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed" dir="auto">${this.esc(this.lc({
            en: 'No specific occasion of revelation is documented for this sūrah in the mainstream sources. Many sūrahs were revealed as guidance without a particular reported incident — that is normal and does not lessen their meaning.',
            bn: 'মূলধারার সূত্রে এই সূরার জন্য কোনো নির্দিষ্ট শানে নুযূল বর্ণিত হয়নি। অনেক সূরা কোনো নির্দিষ্ট ঘটনা ছাড়াই হিদায়াত হিসেবে অবতীর্ণ হয়েছে — এটি স্বাভাবিক এবং এতে তাদের তাৎপর্য কমে না।'
          }))}</p>
        </div>`;
    }

    const nav = `
      <div class="flex items-center justify-between mt-5 pt-3 border-t border-gray-100 dark:border-gray-700">
        <button data-nuzul-surah="${n > 1 ? n - 1 : 1}" class="text-sm text-gray-600 dark:text-gray-300 hover:text-emerald-600 ${n <= 1 ? 'invisible' : ''}">← ${this.esc(this.surahMeta(n - 1 || 1).name)}</button>
        <button data-nuzul-surah="${n < 114 ? n + 1 : 114}" class="text-sm text-gray-600 dark:text-gray-300 hover:text-emerald-600 ${n >= 114 ? 'invisible' : ''}">${this.esc(this.surahMeta(n + 1 > 114 ? 114 : n + 1).name)} →</button>
      </div>`;

    return `<div class="max-w-2xl mx-auto p-1">${back}${headCard}${revInfoCard}${revNeighbors}${timeline}${nav}</div>`;
  }

  renderQuiz() {
    const submitted = this.quizSubmitted;
    const total = NUZUL_QUIZ.length;
    let score = 0;
    const answeredAll = NUZUL_QUIZ.every((_, i) => this.quizAnswers[i] != null);

    const questions = NUZUL_QUIZ.map((q, qi) => {
      const sel = this.quizAnswers[qi];
      const opts = q.optsEn.map((_, oi) => ({ en: q.optsEn[oi], bn: q.optsBn[oi] }));
      if (submitted && sel === q.correct) score++;
      const optHtml = opts.map((o, oi) => {
        const chosen = sel === oi;
        let cls = 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:border-primary';
        let mark = '';
        if (submitted) {
          if (oi === q.correct) { cls = 'bg-green-50 dark:bg-green-900/20 border-green-400 dark:border-green-700 text-green-700 dark:text-green-300'; mark = ' ✓'; }
          else if (chosen) { cls = 'bg-red-50 dark:bg-red-900/20 border-red-400 dark:border-red-700 text-red-700 dark:text-red-300'; mark = ' ✗'; }
          else { cls = 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500'; }
        } else if (chosen) {
          cls = 'bg-primary/10 border-primary text-primary';
        }
        return `<button type="button" ${submitted ? 'disabled' : ''} data-nuzul-quiz-opt="${qi}:${oi}"
          class="w-full text-left px-3 py-2 rounded-lg border text-sm transition-colors ${cls}" dir="auto">${this.esc(this.lc(o))}${mark}</button>`;
      }).join('');
      return `
        <div class="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
          <p class="font-semibold text-sm text-gray-800 dark:text-gray-100 mb-2" dir="auto">${qi + 1}. ${this.esc(this.lc({ en: q.qEn, bn: q.qBn }))}</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">${optHtml}</div>
        </div>`;
    }).join('');

    const footer = submitted
      ? `<div class="text-center py-6">
           <div class="inline-flex flex-col items-center gap-1 px-6 py-4 rounded-xl bg-primary/5">
             <span class="text-sm text-gray-500 dark:text-gray-400">${this.esc(this.tt('nuzul_quiz_score'))}</span>
             <span class="text-3xl font-bold text-primary">${score} / ${total}</span>
             <span class="text-xs text-gray-500 dark:text-gray-400">${this.esc(this.tt('nuzul_quiz_best'))}: ${Math.max(this.quizBest, score)} / ${total}</span>
           </div>
           <div class="mt-3">
             <button type="button" data-nuzul-quiz-reset
               class="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:opacity-90">${this.esc(this.tt('nuzul_quiz_retake'))}</button>
           </div>
         </div>`
      : `<div class="text-center pt-4 pb-6">
           <button type="button" data-nuzul-quiz-submit ${answeredAll ? '' : 'disabled'}
             class="px-5 py-2 rounded-lg text-sm font-medium transition-colors ${answeredAll ? 'bg-primary text-white hover:opacity-90 cursor-pointer' : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'}">${this.esc(this.tt('nuzul_quiz_submit'))}</button>
           ${answeredAll ? '' : `<p class="text-xs text-gray-400 dark:text-gray-500 mt-2">${this.esc(this.tt('nuzul_quiz_hint'))}</p>`}
         </div>`;

    return `
      <div class="max-w-3xl mx-auto p-1">${this.header()}${this.subToggleHtml()}
        <div class="text-center mb-4">
          <p class="text-xs text-gray-400 dark:text-gray-500" dir="auto">${this.esc(this.tt('nuzul_quiz_intro'))}
            <span class="ml-2">· ${this.esc(this.tt('nuzul_quiz_best'))}: ${this.quizBest} / ${total}</span></p>
        </div>
        <div class="space-y-3">${questions}</div>
        ${footer}
      </div>`;
  }

  renderThemes() {
    const themeCards = NUZUL_THEMES.map(th => {
      const chips = th.surahs.map(sn => {
        const sm = this.surahMeta(sn);
        return `<button data-nuzul-surah="${sn}" class="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors" dir="auto">${this.esc(sm.name)}<span class="opacity-50 ml-0.5">(${sn})</span></button>`;
      }).join('');
      return `
        <div class="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
          <div class="flex items-center gap-2 mb-1">
            <span class="text-xl">${this.esc(th.emoji)}</span>
            <h3 class="font-semibold text-gray-800 dark:text-gray-100 text-sm" dir="auto">${this.esc(this.lc({ en: th.titleEn, bn: th.titleBn }))}</h3>
            <span class="ml-auto text-[0.65rem] px-1.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300">${th.surahs.length}</span>
          </div>
          <p class="text-xs text-gray-500 dark:text-gray-400 mb-3 leading-relaxed" dir="auto">${this.esc(this.lc({ en: th.descEn, bn: th.descBn }))}</p>
          <div class="flex flex-wrap gap-1.5">${chips}</div>
        </div>`;
    }).join('');
    return `
      <div class="max-w-3xl mx-auto p-1">
        ${this.header()}
        ${this.subToggleHtml()}
        <p class="text-sm text-gray-600 dark:text-gray-300 mb-4 text-center leading-relaxed" dir="auto">${this.esc(this.tt('nuzul_themes_intro'))}</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">${themeCards}</div>
      </div>`;
  }

  renderTimeline() {
    const L = (o) => this.esc(this.lc(o));
    const phaseEvents = [
      [
        { en: 'First revelation in Cave Hira (610 CE)', bn: 'হেরা গুহায় প্রথম ওয়াহী (৬১০ খ্রি.)' },
        { en: 'Fatrat al-Wahy — pause in revelation; Surah al-Duha revealed as comfort', bn: 'ফতরাতুল ওয়াহী — অবতীর্ণের বিরতি; সূরা আদ-দুহা সান্ত্বনাস্বরূপ অবতীর্ণ' },
        { en: 'Secret preaching; first converts: Khadijah, Abu Bakr, Ali (RA)', bn: 'গোপন দাওয়াত শুরু; প্রথম মুসলমান: খাদীজা, আবু বকর, আলী (রাঃ)' },
        { en: 'Public call at Mount Safa (613 CE) — open proclamation of Islam', bn: 'সাফা পাহাড়ে প্রকাশ্য আহ্বান (৬১৩ খ্রি.) — ইসলামের প্রকাশ্য ঘোষণা' },
      ],
      [
        { en: 'Severe Quraysh persecution — Bilal, Khabbab (RA) tortured', bn: 'কুরাইশদের তীব্র নির্যাতন — বিলাল, খাব্বাব (রাঃ)-এর উপর' },
        { en: 'First Hijra to Abyssinia under the Negus (615 CE)', bn: 'আবিসিনিয়ায় প্রথম হিজরত — নাজ্জাশীর কাছে (৬১৫ খ্রি.)' },
        { en: 'Economic boycott of Banu Hashim (616–619 CE)', bn: 'বনু হাশিমের বিরুদ্ধে অর্থনৈতিক অবরোধ (৬১৬–৬১৯ খ্রি.)' },
      ],
      [
        { en: 'Year of Grief — Khadijah (RA) and Abu Talib pass away (619 CE)', bn: 'দুঃখের বছর — খাদীজা (রাঃ) ও আবু তালিবের ইন্তেকাল (৬১৯ খ্রি.)' },
        { en: 'Night Journey and Ascension — Isra and Miraj (621 CE)', bn: 'ইসরা ও মিরাজ (৬২১ খ্রি.)' },
        { en: 'First and Second Pledges of Aqabah — Medinan delegation', bn: 'আকাবার প্রথম ও দ্বিতীয় শপথ — মদিনা প্রতিনিধিদল' },
      ],
      [
        { en: 'The Hijra — migration to Madinah (622 CE / 1 AH)', bn: 'হিজরত — মদিনায় স্থানান্তর (৬২২ খ্রি. / ১ হিজরি)' },
        { en: 'Constitution of Madinah established; first Islamic state formed', bn: 'মদিনার সনদ প্রতিষ্ঠা; প্রথম ইসলামি রাষ্ট্র গঠন' },
        { en: 'Change of Qiblah from Jerusalem to Makkah (624 CE)', bn: 'কিবলা পরিবর্তন — জেরুসালেম থেকে মক্কায় (৬২৪ খ্রি.)' },
        { en: 'Battle of Badr — decisive first major victory (2 AH)', bn: 'বদর যুদ্ধ — প্রথম বড় বিজয় (২ হিজরি)' },
      ],
      [
        { en: 'Battle of Uhud (3 AH / 625 CE)', bn: 'উহুদ যুদ্ধ (৩ হিজরি / ৬২৫ খ্রি.)' },
        { en: 'Battle of the Trench — Khandaq (5 AH / 627 CE)', bn: 'খন্দকের যুদ্ধ (৫ হিজরি / ৬২৭ খ্রি.)' },
        { en: 'Treaty of Hudaybiyyah — the clear victory (6 AH / 628 CE)', bn: 'হুদায়বিয়ার সন্ধি — স্পষ্ট বিজয় (৬ হিজরি / ৬২৮ খ্রি.)' },
        { en: 'Letters sent to Heraclius, Khosrow, and other heads of state', bn: 'হিরাক্লিয়াস, কিসরা ও অন্যান্য রাষ্ট্রপ্রধানদের পত্র প্রেরণ' },
      ],
      [
        { en: 'Conquest of Makkah (8 AH / 630 CE) — mass acceptance of Islam', bn: 'মক্কা বিজয় (৮ হিজরি / ৬৩০ খ্রি.) — ব্যাপক ইসলাম গ্রহণ' },
        { en: 'Battle of Hunayn (8 AH / 630 CE)', bn: 'হুনায়ন যুদ্ধ (৮ হিজরি / ৬৩০ খ্রি.)' },
        { en: 'Farewell Pilgrimage — Hajjat al-Wada (10 AH / 632 CE)', bn: 'বিদায় হজ (১০ হিজরি / ৬৩২ খ্রি.)' },
        { en: 'Surah al-Maidah 5:3 — religion perfected (10 AH)', bn: 'সূরা মায়িদাহ ৫:৩ — দ্বীন পূর্ণাঙ্গ (১০ হিজরি)' },
        { en: 'Prophet ﷺ passes away (11 AH / 632 CE) — revelation complete', bn: 'নবী ﷺ-এর ইন্তেকাল (১১ হিজরি / ৬৩২ খ্রি.) — অবতীর্ণ সম্পূর্ণ' },
      ],
    ];

    if (!this.phases.length) {
      return `<div class="max-w-3xl mx-auto p-1">${this.header()}${this.subToggleHtml()}<p class="text-center text-sm text-gray-500 dark:text-gray-400 py-8" dir="auto">${L({ en: 'Loading phase data\u2026', bn: 'লোড হচ্ছে\u2026' })}</p></div>`;
    }

    const phaseCount = {};
    for (let i = 1; i <= 114; i++) {
      const ri = this.revBySurah[i];
      if (ri && ri.phase) phaseCount[ri.phase] = (phaseCount[ri.phase] || 0) + 1;
    }

    const phaseHtml = this.phases.map((ph, idx) => {
      const events = phaseEvents[idx] || [];
      const count = phaseCount[ph.id] || 0;
      const isFirst = idx === 0, isLast = idx === this.phases.length - 1;
      const evHtml = events.map(ev => `
        <li class="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-300">
          <span class="text-emerald-500 mt-0.5 flex-shrink-0">▸</span>
          <span dir="auto">${L(ev)}</span>
        </li>`).join('');
      return `
        <div class="relative pl-8 pb-6 ${isLast ? '' : 'border-s-2 border-emerald-200 dark:border-emerald-800'} ms-3">
          <span class="absolute -start-[11px] top-1 w-5 h-5 rounded-full ${isFirst ? 'bg-emerald-600' : isLast ? 'bg-rose-500' : 'bg-emerald-400'} border-2 border-white dark:border-gray-900 flex items-center justify-center text-white text-[0.55rem] font-bold">${idx + 1}</span>
          <details class="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
            <summary class="flex items-center gap-2 p-3 cursor-pointer list-none hover:bg-gray-50 dark:hover:bg-gray-700/40">
              <span class="text-xl flex-shrink-0">${this.esc(ph.emoji || '\u2022')}</span>
              <span class="flex-1 min-w-0">
                <span class="block font-semibold text-sm text-gray-800 dark:text-gray-100" dir="auto">${this.esc(this.pick(ph, 'title'))}</span>
                <span class="block text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-snug" dir="auto">${this.esc(this.pick(ph, 'desc'))}</span>
              </span>
              <span class="flex-shrink-0 text-xs px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 font-medium whitespace-nowrap">${count} ${L({ en: 's\u016brahs', bn: '\u09b8\u09c2\u09b0\u09be' })}</span>
              <span class="text-gray-400 text-xs ml-1">\u25bc</span>
            </summary>
            <div class="px-4 pb-3 border-t border-gray-100 dark:border-gray-700">
              <p class="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-3 mb-2 uppercase tracking-wide">${this.esc(this.tt('nuzul_key_events'))}</p>
              <ul class="space-y-1.5">${evHtml}</ul>
            </div>
          </details>
        </div>`;
    }).join('');

    return `
      <div class="max-w-3xl mx-auto p-1">
        ${this.header()}
        ${this.subToggleHtml()}
        <p class="text-sm text-gray-600 dark:text-gray-300 mb-5 text-center leading-relaxed" dir="auto">${this.esc(this.tt('nuzul_timeline_intro'))}</p>
        <div class="mt-2">${phaseHtml}</div>
      </div>`;
  }

  bind() {
    if (!this.container) return;
    this.container.onclick = (ev) => {
      const subBtn = ev.target.closest('[data-nuzul-sub]');
      if (subBtn) {
        this.subView = subBtn.getAttribute('data-nuzul-sub');
        this.selected = null;
        this.query = '';
        this.render();
        this.scrollTop();
        return;
      }
      const surahBtn = ev.target.closest('[data-nuzul-surah]');
      if (surahBtn) { this.selected = parseInt(surahBtn.getAttribute('data-nuzul-surah'), 10); this.query = ''; this.render(); this.scrollTop(); return; }
      const backBtn = ev.target.closest('[data-nuzul-back]');
      if (backBtn) { this.selected = null; this.render(); this.scrollTop(); return; }
      const orderBtn = ev.target.closest('[data-nuzul-order]');
      if (orderBtn) { this.orderMode = orderBtn.getAttribute('data-nuzul-order'); this.saveOrderMode(); this.render(); return; }
      const ayahBtn = ev.target.closest('[data-nuzul-ayah]');
      if (ayahBtn) { this.openAyah(ayahBtn.getAttribute('data-nuzul-ayah')); return; }
      const qopt = ev.target.closest('[data-nuzul-quiz-opt]');
      if (qopt && !this.quizSubmitted) {
        const [qi, oi] = qopt.getAttribute('data-nuzul-quiz-opt').split(':').map(Number);
        if (!isNaN(qi) && !isNaN(oi)) { this.quizAnswers[qi] = oi; this.render(); }
        return;
      }
      const qsub = ev.target.closest('[data-nuzul-quiz-submit]');
      if (qsub) { this.submitQuiz(); return; }
      const qreset = ev.target.closest('[data-nuzul-quiz-reset]');
      if (qreset) { this.quizAnswers = {}; this.quizSubmitted = false; this.render(); return; }
    };
    const search = this.container.querySelector('[data-nuzul-search]');
    if (search) {
      search.oninput = (e) => {
        this.query = e.target.value || '';
        const caret = e.target.selectionStart;
        this.render();
        const s2 = this.container.querySelector('[data-nuzul-search]');
        if (s2) { s2.focus(); try { s2.setSelectionRange(caret, caret); } catch (_) { } }
      };
    }
  }

  submitQuiz() {
    let score = 0;
    NUZUL_QUIZ.forEach((q, i) => { if (this.quizAnswers[i] === q.correct) score++; });
    if (score > this.quizBest) { this.quizBest = score; this.saveQuizBest(); }
    this.quizSubmitted = true;
    this.render();
  }

  scrollTop() {
    try { this.container.scrollIntoView({ behavior: 'smooth', block: 'start' }); } catch (_) { }
  }
}

let nuzulView;
document.addEventListener('DOMContentLoaded', () => { try { nuzulView = new NuzulView(); } catch (_) { } });
