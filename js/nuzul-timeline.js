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

    return `<div class="max-w-3xl mx-auto p-1">${this.header()}${this.subToggleHtml()}${landmarks}${toggle}${body}</div>`;
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

    return `<div class="max-w-2xl mx-auto p-1">${back}${headCard}${timeline}${nav}</div>`;
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
