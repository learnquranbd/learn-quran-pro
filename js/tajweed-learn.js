/**
 * Tajweed Learning (তাজবীদ শিক্ষা) — learn the rules, then SEE them in the Quran.
 *
 * - Every rule from the app's tajweed engine (TAJWEED_RULES) as a card:
 *   colour swatch, what it is, which letters trigger it (en + bn, en fallback).
 * - Tap a rule → real examples: pick any surah and every occurrence of that rule
 *   is highlighted in the actual verse text (bundled data/tajweed-json spans).
 * - Practice: jump to the tajweed quiz, colored reading view, or tajweed mushaf.
 * - Curated reputable external resources.
 *
 * Renders into #tajweedlearn-container (tab "tajweedlearn").
 */

const TAJWEED_LESSONS = {
  ghunnah: { group: 'core', names: { bn: 'গুন্নাহ', ar: 'الغنّة' }, letters: 'نّ مّ',
    en: 'Nasalisation: hold a nasal sound for 2 counts on a doubled noon or meem (نّ / مّ).',
    bn: 'গুন্নাহ: নূন বা মীম মুশাদ্দাদ (نّ / مّ)-এ ২ হরকত পরিমাণ নাকি সুরে টান।' },
  qalqalah: { group: 'core', names: { bn: 'কলকলা', ar: 'القلقلة' }, letters: 'ق ط ب ج د',
    en: 'Echo/bounce: the letters ق ط ب ج د get a slight bounce when bearing sukoon (strongest when stopping).',
    bn: 'কলকলা: ق ط ب ج د অক্ষরে সাকিন হলে হালকা প্রতিধ্বনি — থামলে সবচেয়ে জোরালো।' },
  ikhfa: { group: 'noon', names: { bn: 'ইখফা', ar: 'الإخفاء' }, letters: 'ت ث ج د ذ ز س ش ص ض ط ظ ف ق ك',
    en: 'Hiding: noon sakinah/tanween before these 15 letters is pronounced lightly hidden with ghunnah.',
    bn: 'ইখফা: নূন সাকিন/তানউইনের পরে এই ১৫টি অক্ষর এলে গুন্নাহসহ গোপনভাবে উচ্চারণ।' },
  iqlab: { group: 'noon', names: { bn: 'ইকলাব', ar: 'الإقلاب' }, letters: 'ب',
    en: 'Conversion: noon sakinah/tanween before ب converts to a hidden meem sound with ghunnah.',
    bn: 'ইকলাব: নূন সাকিন/তানউইনের পরে ب এলে তা মীমের ধ্বনিতে বদলে যায়, গুন্নাহসহ।' },
  idghaam_ghunnah: { group: 'noon', names: { bn: 'ইদগাম (গুন্নাহসহ)', ar: 'الإدغام بغنّة' }, letters: 'ي ن م و',
    en: 'Merging with ghunnah: noon sakinah/tanween merges into ي ن م و, keeping the nasal sound.',
    bn: 'ইদগাম (গুন্নাহসহ): নূন সাকিন/তানউইন ي ن م و-তে মিশে যায়, গুন্নাহ বজায় থাকে।' },
  idghaam_no_ghunnah: { group: 'noon', names: { bn: 'ইদগাম (গুন্নাহ ছাড়া)', ar: 'الإدغام بغير غنّة' }, letters: 'ل ر',
    en: 'Merging without ghunnah: noon sakinah/tanween merges completely into ل or ر.',
    bn: 'ইদগাম (গুন্নাহ ছাড়া): নূন সাকিন/তানউইন ل বা ر-তে সম্পূর্ণ মিশে যায়।' },
  ikhfa_shafawi: { group: 'meem', names: { bn: 'ইখফা শাফাবি', ar: 'الإخفاء الشفوي' }, letters: 'ب',
    en: 'Labial hiding: meem sakinah before ب is lightly hidden with ghunnah on the lips.',
    bn: 'ইখফা শাফাবি: মীম সাকিনের পরে ب এলে ঠোঁটে গুন্নাহসহ গোপন উচ্চারণ।' },
  idghaam_shafawi: { group: 'meem', names: { bn: 'ইদগাম শাফাবি', ar: 'الإدغام الشفوي' }, letters: 'م',
    en: 'Labial merging: meem sakinah merges into a following م with ghunnah.',
    bn: 'ইদগাম শাফাবি: মীম সাকিন পরবর্তী م-এ গুন্নাহসহ মিশে যায়।' },
  madd_2: { group: 'madd', names: { bn: 'মাদ্দ তবিয়ি (২)', ar: 'المد الطبيعي (2)' }, letters: 'ا و ي',
    en: 'Natural prolongation: stretch the madd letter exactly 2 counts.',
    bn: 'মাদ্দ তবিয়ি: মাদ্দের অক্ষর ঠিক ২ হরকত টানুন।' },
  madd_246: { group: 'madd', names: { bn: 'মাদ্দ (২/৪/৬)', ar: 'المد (2/4/6)' }, letters: 'ا و ي',
    en: 'Flexible madd (e.g. when stopping): may be stretched 2, 4 or 6 counts.',
    bn: 'মাদ্দ (২/৪/৬): থামার সময় ইত্যাদিতে ২, ৪ বা ৬ হরকত টানা যায়।' },
  madd_munfasil: { group: 'madd', names: { bn: 'মাদ্দ মুনফাসিল (৪-৫)', ar: 'المد المنفصل (4-5)' }, letters: 'ا و ي + ء',
    en: 'Separated madd: madd letter ends a word and hamza starts the next — stretch 4–5 counts.',
    bn: 'মাদ্দ মুনফাসিল: এক শব্দের শেষে মাদ্দ, পরের শব্দের শুরুতে হামযা — ৪–৫ হরকত।' },
  madd_muttasil: { group: 'madd', names: { bn: 'মাদ্দ মুত্তাসিল (৪-৫)', ar: 'المد المتصل (4-5)' }, letters: 'ا و ي + ء',
    en: 'Connected madd: madd letter and hamza in the SAME word — stretch 4–5 counts (obligatory).',
    bn: 'মাদ্দ মুত্তাসিল: একই শব্দে মাদ্দ ও হামযা — ৪–৫ হরকত (ওয়াজিব)।' },
  madd_6: { group: 'madd', names: { bn: 'মাদ্দ লাযিম (৬)', ar: 'المد اللازم (6)' }, letters: 'ا و ي',
    en: 'Madd Lazim: the heaviest madd — always stretch 6 counts.',
    bn: 'মাদ্দ লাযিম: সবচেয়ে দীর্ঘ মাদ্দ — সর্বদা ৬ হরকত।' },
  idghaam_mutajanisayn: { group: 'other', names: { bn: 'ইদগাম মুতাজানিসাইন', ar: 'إدغام المتجانسين' }, letters: 'ت/ط ث/ذ …',
    en: 'Merging of two letters sharing the same articulation point but differing in attributes (e.g. ت into ط).',
    bn: 'ইদগাম মুতাজানিসাইন: একই মাখরাজের দুটি ভিন্ন বৈশিষ্ট্যের অক্ষরের মিলন (যেমন ت → ط)।' },
  idghaam_mutaqaribayn: { group: 'other', names: { bn: 'ইদগাম মুতাকারিবাইন', ar: 'إدغام المتقاربين' }, letters: 'ق/ك ل/ر …',
    en: 'Merging of two letters with CLOSE articulation points (e.g. ق into ك).',
    bn: 'ইদগাম মুতাকারিবাইন: কাছাকাছি মাখরাজের দুটি অক্ষরের মিলন (যেমন ق → ك)।' },
  hamzat_wasl: { group: 'other', names: { bn: 'হামযাতুল ওয়াসল', ar: 'همزة الوصل' }, letters: 'ٱ',
    en: 'Connecting hamza: pronounced only when you START at it; silent when you continue through.',
    bn: 'হামযাতুল ওয়াসল: শুরু করলে উচ্চারিত হয়; মাঝখানে পড়লে নীরব।' },
  lam_shamsiyyah: { group: 'other', names: { bn: 'লাম শামসিয়্যাহ', ar: 'اللام الشمسية' }, letters: 'ال', lettersExtraKey: 'tj_sun_letters',
    en: 'Sun lam: the ل of ال is silent and assimilates into the following "sun letter" (which doubles).',
    bn: 'লাম শামসিয়্যাহ: ال-এর লাম নীরব হয়ে পরবর্তী "সূর্য অক্ষরে" মিশে যায় (সেটি দ্বিগুণ হয়)।' },
  silent: { group: 'other', names: { bn: 'নীরব অক্ষর', ar: 'حرف صامت' }, letters: '—',
    en: 'Silent letter: written in the script but not pronounced.',
    bn: 'নীরব অক্ষর: লেখা থাকলেও উচ্চারিত হয় না।' },
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
    this.bound = false;
    this.learned = this.loadLearned();

    window.addEventListener('tabChanged', (e) => {
      if (e.detail.tabId === 'tajweedlearn') this.render();
      else if (this._audio) this._audio.pause();
    });
    window.addEventListener('settingChanged', (e) => {
      if (e.detail.key === 'language') { this.language = e.detail.value; if (this.container.innerHTML) this.render(); }
    });
  }

  tt(key) { return t(key, this.language); }
  loadLearned() {
    try { return new Set(JSON.parse(localStorage.getItem('tajweedLearned') || '[]')); } catch (e) { return new Set(); }
  }
  saveLearned() {
    try { localStorage.setItem('tajweedLearned', JSON.stringify([...this.learned])); } catch (e) { /* ignore */ }
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
            <button data-ayah-audio="https://everyayah.com/data/Alafasy_128kbps/${pad(surah)}${pad(r.a)}.mp3" class="ms-auto text-xs px-2 py-0.5 rounded-md bg-primary text-white hover:bg-primary/80">🔊</button>
          </div>
          <div class="ayah-arabic !text-2xl !leading-loose" dir="rtl">${r.html}</div>
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
    const groups = [
      ['noon', 'tj_group_noon'], ['meem', 'tj_group_meem'], ['madd', 'tj_group_madd'],
      ['core', 'tj_group_core'], ['other', 'tj_group_other'],
    ];
    const keys = Object.keys(TAJWEED_LESSONS);
    const learnedCount = keys.filter(k => this.learned.has(k)).length;
    this.container.innerHTML = `
      <div class="w-full">
        <div class="text-center mb-6">
          <h2 class="text-2xl font-bold mb-1">🎨 ${this.tt('tj_learn_title')}</h2>
          <p class="text-gray-500 dark:text-gray-400 text-sm">${this.tt('tj_learn_subtitle')}</p>
          <p class="text-sm font-medium text-green-600 dark:text-green-400 mt-1">✓ ${learnedCount} / ${keys.length} ${this.tt('tj_learned')}</p>
        </div>
        <div class="flex flex-wrap justify-center gap-2 mb-6">
          <button data-tj-quiz class="px-4 py-2 rounded-lg bg-secondary text-white text-sm font-medium hover:bg-secondary/80">❓ ${this.tt('tj_practice_quiz')}</button>
          <button data-tj-goto="reading" class="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">📖 ${this.tt('tj_practice_reading')}</button>
          <button data-tj-goto="mushaf" class="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">📗 ${this.tt('tj_practice_mushaf')}</button>
        </div>
        ${groups.map(([g, labelKey]) => {
          const inGroup = keys.filter(k => TAJWEED_LESSONS[k].group === g);
          if (!inGroup.length) return '';
          return `
            <h3 class="text-sm uppercase tracking-wide font-semibold text-gray-400 dark:text-gray-500 mb-2 mt-5">${this.tt(labelKey)}</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
              ${inGroup.map(k => this.ruleCard(k)).join('')}
            </div>`;
        }).join('')}
        <h3 class="text-sm uppercase tracking-wide font-semibold text-gray-400 dark:text-gray-500 mb-2 mt-8">🌐 ${this.tt('resources_title')}</h3>
        <div class="flex flex-wrap gap-2">
          ${TAJWEED_RESOURCES.map(r => `
            <a href="${r.url}" target="_blank" rel="noopener" class="flex items-center gap-2 px-3 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow text-sm">
              <span>${r.emoji}</span><span class="font-medium">${r.name}</span>
              <span class="text-xs text-gray-400">${this.esc(this.tt(r.descKey))}</span>
            </a>`).join('')}
        </div>
      </div>`;
    if (this.rule) this.loadExamples();
  }

  esc(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
}

let tajweedLearn;
document.addEventListener('DOMContentLoaded', () => { tajweedLearn = new TajweedLearn(); });
