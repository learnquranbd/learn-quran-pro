/**
 * Ayah to Ponder (Tadabbur)
 * Shows a daily reflection card in the empty reading view: one curated
 * thought-provoking ayah (deterministic per day) with reflection prompts.
 * Disappears naturally once the user loads any verses.
 */

// Curated reflection-worthy ayahs (well-known tadabbur selections)
const PONDER_REFS = [
  '2:152', '2:155-157', '2:186', '2:216', '2:255', '2:286',
  '3:8', '3:26-27', '3:139', '3:159', '3:190-191',
  '4:110', '6:59', '6:162-163', '7:55-56', '8:2-4',
  '9:40', '9:51', '10:57', '12:86-87', '13:11', '13:28',
  '14:7', '16:18', '16:90', '16:96-97', '17:23-24',
  '18:109-110', '20:114', '21:35', '21:87', '23:115-116',
  '24:35', '25:63', '25:74', '26:88-89', '28:77', '29:2-3',
  '29:69', '30:21', '31:17-19', '39:53', '40:60', '42:36-38',
  '49:12-13', '50:16', '51:55-56', '53:39-42', '55:13',
  '57:22-23', '59:18-19', '65:2-3', '67:1-2', '87:14-17',
  '93:3-5', '94:5-6', '103:1-3',
  // extended curated selections
  '2:45-46', '2:201', '3:133-134', '3:185', '4:36', '6:32',
  '7:23', '9:105', '11:114', '13:24', '14:34', '17:80',
  '20:25-28', '23:1-3', '24:22', '31:14', '33:41-42',
  '35:29-30', '39:9', '41:34', '46:15', '55:60', '64:11',
  '73:8', '89:27-30', '99:7-8',
  // wave-3 curated selections
  '1:1-5', '2:163', '2:222', '2:257', '3:102-103', '3:200',
  '7:180', '7:205', '10:62-64', '11:88', '15:49', '16:53',
  '17:44', '18:23-24', '19:96', '20:7-8', '22:46', '25:70',
  '27:62', '28:24', '29:45', '30:22', '33:35', '35:15',
  '36:82', '39:10', '41:53', '42:19', '55:26-27', '66:8',
  '76:1', '112:1-4',
  // v111 additions
  '2:2', '2:22', '2:153', '2:164', '3:160', '3:186', '4:82',
  '6:54', '7:156', '15:56', '16:78', '16:127', '17:9', '17:37',
  '25:58', '25:72', '27:19', '34:13', '39:23', '45:13', '47:24',
  '49:11', '51:20-21', '54:17', '59:22-24', '63:9', '88:17-20',
  '102:1-2',
  // v114 additions
  '2:284', '3:189', '17:110', '62:1', '3:145', '4:78', '62:8',
  '20:82', '40:3', '42:25', '25:64', '41:33', '70:22-23',
  '17:26', '66:6', '18:46', '57:20', '64:15', '21:30',
  '51:47-49', '67:3-4', '47:15', '55:46-47', '76:12-22'
];

// Generic, non-doctrinal tadabbur prompt keys (cycled per verse). These never
// assert a specific tafsir — they only invite the reader's own reflection.
const PONDER_PROMPT_KEYS = [
  'ponder_q1', 'ponder_q2', 'ponder_q3', 'ponder_q4',
  'ponder_q5', 'ponder_q6', 'ponder_q7', 'ponder_q8',
  'ponder_q9', 'ponder_q10', 'ponder_q11', 'ponder_q12',
  'ponder_q13', 'ponder_q14', 'ponder_q15', 'ponder_q16'
];

// Themed reflection sets — each draws a relevant subset of the pool above.
// Labels carry their own inline en/bn text (no translation keys needed).
// Every ref below is guaranteed to exist in PONDER_REFS.
const PONDER_THEMES = {
  mercy:      { emoji: '💚', en: 'Mercy & Forgiveness', bn: 'দয়া ও ক্ষমা',
                refs: ['2:186', '2:286', '3:8', '3:133-134', '4:110', '7:23', '12:86-87', '24:22', '39:53', '40:60'] },
  patience:   { emoji: '🌱', en: 'Patience & Trials', bn: 'ধৈর্য ও পরীক্ষা',
                refs: ['2:45-46', '2:155-157', '2:216', '3:139', '13:24', '21:87', '29:2-3', '46:15', '94:5-6', '103:1-3'] },
  gratitude:  { emoji: '🙏', en: 'Gratitude', bn: 'কৃতজ্ঞতা',
                refs: ['2:152', '2:201', '14:7', '14:34', '16:18', '31:14', '55:13', '55:60', '93:3-5'] },
  trust:      { emoji: '🕊️', en: 'Trust in God', bn: 'আল্লাহর উপর ভরসা',
                refs: ['3:159', '8:2-4', '9:40', '9:51', '42:36-38', '65:2-3'] },
  hereafter:  { emoji: '🌌', en: 'The Hereafter', bn: 'আখিরাত',
                refs: ['3:185', '21:35', '23:115-116', '57:22-23', '59:18-19', '64:11', '87:14-17', '89:27-30', '99:7-8'] },
  character:  { emoji: '🤝', en: 'Character & Conduct', bn: 'চরিত্র ও আচরণ',
                refs: ['4:36', '16:90', '17:23-24', '23:1-3', '25:63', '25:74', '31:17-19', '49:12-13', '73:8'] },
  remembrance:{ emoji: '📿', en: 'Remembrance', bn: 'যিকির',
                refs: ['2:152', '13:28', '20:114', '24:35', '33:41-42', '50:16', '87:14-17'] },
  creation:   { emoji: '🌿', en: 'Signs in Creation', bn: 'সৃষ্টিতে নিদর্শন',
                refs: ['3:190-191', '6:59', '17:44', '30:21', '30:22', '41:53', '55:13'] },
  repentance: { emoji: '🌷', en: 'Repentance & Return', bn: 'তওবা ও প্রত্যাবর্তন',
                refs: ['2:222', '4:110', '7:23', '25:70', '39:53', '66:8'] },
  prayer:     { emoji: '🤲', en: 'Prayer & Nearness', bn: 'দোয়া ও নৈকট্য',
                refs: ['2:186', '11:88', '27:62', '29:45', '35:15'] },
  tawheed:    { emoji: '🕌', en: 'Oneness of God', bn: 'আল্লাহর একত্ব',
                refs: ['2:22', '2:163', '2:255', '2:257', '6:59', '24:35', '59:22-24', '112:1-4'] },
  guidance:   { emoji: '🧭', en: 'Guidance & the Qur\'an', bn: 'হেদায়েত ও কুরআন',
                refs: ['1:1-5', '2:2', '4:82', '17:9', '39:23', '47:24', '54:17'] },
  majesty:    { emoji: '👑', en: 'Divine Majesty & Names', bn: 'আল্লাহর মহিমা ও নামসমূহ',
                refs: ['2:255', '2:284', '3:189', '7:180', '17:110', '59:22-24', '62:1', '112:1-4'] },
  accountability: { emoji: '⚖️', en: 'Death & Accountability', bn: 'মৃত্যু ও হিসাব',
                refs: ['3:145', '3:185', '4:78', '21:35', '62:8', '89:27-30', '99:7-8', '102:1-2'] }
};

// In-module en/bn fallbacks for NEW UI strings (render before translations.js
// is updated). t() returns the key unchanged when it is not yet merged.
const PONDER_I18N = {
  ponder_themes: { en: 'Reflect by theme', bn: 'থিম অনুযায়ী ভাবুন', zh: '按主题反思', ja: 'テーマ別に振り返る'},
  ponder_all:    { en: 'All', bn: 'সব', zh: '全部', ja: 'すべて'},
  ponder_prev:   { en: 'Previous ayah', bn: 'পূর্ববর্তী আয়াত', zh: '上一节', ja: '前の節'},
  ponder_next:   { en: 'Next ayah', bn: 'পরবর্তী আয়াত', zh: '下一节', ja: '次の節'}
};

class PonderCard {
  constructor() {
    this.container = document.getElementById('ayah-container');
    if (!this.container) return;

    this.language = (typeof appSettings !== 'undefined' && appSettings) ? appSettings.get('language') : 'en';
    this.theme = null;        // active themed set id (null = full pool)
    this.poolPos = null;      // explicit position in current pool (null = today's pick)
    this.promptSeed = 0;      // extra seed for prompt rotation on a random pick
    this.curRef = null;       // ref currently shown in the card (for journaling)
    this.curName = '';        // surah display name of the current verse
    this.journalOpen = false; // reflection editor visibility
    this.editingTs = null;    // ts of the entry being edited (null = new)
    this.pendingDelete = null;// ts of entry awaiting delete confirmation

    // Show only when nothing is being loaded via the URL hash
    if (!window.location.hash.slice(1)) this.render();

    window.addEventListener('settingChanged', (e) => {
      if (e.detail.key === 'language') {
        this.language = e.detail.value;
        if (this.isShowing()) this.render();
      }
    });

    this.container.addEventListener('click', (e) => this.onClick(e));
  }

  onClick(e) {
    if (e.target.closest('#ponder-another') || e.target.closest('[data-ponder-next]')) {
      this.poolPos = this.currentIndex() + 1;
      this.promptSeed = 0;
      this.render();
      return;
    }
    if (e.target.closest('[data-ponder-prev]')) {
      this.poolPos = this.currentIndex() - 1;
      this.promptSeed = 0;
      this.render();
      return;
    }
    if (e.target.closest('[data-ponder-random]')) {
      const pool = this.pool();
      this.poolPos = Math.floor(Math.random() * pool.length);
      this.promptSeed = Math.floor(Math.random() * 100000);
      this.render();
      return;
    }
    const themeBtn = e.target.closest('[data-ponder-theme]');
    if (themeBtn) {
      const th = themeBtn.getAttribute('data-ponder-theme');
      this.theme = (th && PONDER_THEMES[th]) ? th : null;
      this.poolPos = null;      // fall back to the day's pick within the new set
      this.promptSeed = 0;
      this.render();
      return;
    }
    const shareBtn = e.target.closest('[data-ponder-share]');
    if (shareBtn) { this.shareCurrent(shareBtn); return; }
    if (e.target.closest('[data-dismiss-dev]')) {
      try { localStorage.setItem('devNoticeDismissed', '1'); } catch (err) {}
      const n = document.getElementById('dev-notice');
      if (n) n.remove();
      return;
    }
    // ---- Reflection journal interactions (only refresh the journal subtree) ----
    if (e.target.closest('[data-ponder-write]')) {
      this.journalOpen = true; this.editingTs = null; this.pendingDelete = null;
      this.refreshJournal();
      const ta = document.getElementById('ponder-note');
      if (ta) ta.focus();
      return;
    }
    if (e.target.closest('[data-ponder-cancel]')) {
      this.journalOpen = false; this.editingTs = null;
      this.refreshJournal();
      return;
    }
    if (e.target.closest('[data-ponder-save]')) { this.saveEntry(); return; }
    if (e.target.closest('[data-ponder-mark]')) { this.logToday(); this.refreshJournal(); return; }
    const editBtn = e.target.closest('[data-ponder-edit]');
    if (editBtn) {
      this.editingTs = Number(editBtn.getAttribute('data-ponder-edit'));
      this.journalOpen = true; this.pendingDelete = null;
      this.refreshJournal();
      return;
    }
    const delBtn = e.target.closest('[data-ponder-del]');
    if (delBtn) { this.pendingDelete = Number(delBtn.getAttribute('data-ponder-del')); this.refreshJournal(); return; }
    if (e.target.closest('[data-ponder-delcancel]')) { this.pendingDelete = null; this.refreshJournal(); return; }
    const okBtn = e.target.closest('[data-ponder-delok]');
    if (okBtn) { this.deleteEntry(Number(okBtn.getAttribute('data-ponder-delok'))); return; }
    const copyBtn = e.target.closest('[data-ponder-copy]');
    if (copyBtn) { this.copyEntry(Number(copyBtn.getAttribute('data-ponder-copy')), copyBtn); return; }
    const expBtn = e.target.closest('[data-ponder-export]');
    if (expBtn) { this.exportAll(expBtn); return; }

    const ql = e.target.closest('[data-ql]');
    if (ql) {
      const tab = ql.getAttribute('data-ql');
      const mod = ql.getAttribute('data-ql-module');
      if (typeof tabSystem !== 'undefined' && tabSystem) tabSystem.switchTab(tab);
      if (mod) window.dispatchEvent(new CustomEvent('learnModuleSelected', { detail: { module: mod } }));
    }
  }

  isShowing() {
    return !!document.getElementById('ponder-card');
  }

  // ---- small utilities -----------------------------------------------------
  esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  }

  todayStr(d) {
    const n = d || new Date();
    return `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, '0')}-${String(n.getDate()).padStart(2, '0')}`;
  }

  copyText(text, btn) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        if (!btn) return;
        const prev = btn.textContent;
        btn.textContent = '✓';
        setTimeout(() => { btn.textContent = prev; }, 1200);
      }).catch(() => {});
    }
  }

  // ---- localStorage: journal + reflection dates ----------------------------
  loadJournal() {
    try { return JSON.parse(localStorage.getItem('ponderJournal')) || []; } catch (e) { return []; }
  }
  saveJournal(list) {
    try { localStorage.setItem('ponderJournal', JSON.stringify(list)); } catch (e) { /* ignore */ }
  }
  loadDates() {
    try { return JSON.parse(localStorage.getItem('ponderDates')) || []; } catch (e) { return []; }
  }
  logToday() {
    const d = this.todayStr();
    const arr = this.loadDates();
    if (!arr.includes(d)) { arr.push(d); try { localStorage.setItem('ponderDates', JSON.stringify(arr)); } catch (e) {} }
  }
  ponderedToday() { return this.loadDates().includes(this.todayStr()); }

  /** Consecutive-day reflection streak ending today (or yesterday). */
  streak() {
    const set = new Set(this.loadDates());
    let s = 0;
    const d = new Date(); d.setHours(0, 0, 0, 0);
    if (!set.has(this.todayStr(d))) d.setDate(d.getDate() - 1); // grace: today not logged yet
    while (set.has(this.todayStr(d))) { s++; d.setDate(d.getDate() - 1); }
    return s;
  }

  saveEntry() {
    const noteEl = document.getElementById('ponder-note');
    if (!noteEl) return;
    const get = (id) => { const el = document.getElementById(id); return el ? el.value.trim() : ''; };
    const note = noteEl.value.trim();
    const divineName = get('ponder-name');
    const dua = get('ponder-dua');
    const action = get('ponder-action');
    if (!note && !divineName && !dua && !action) { this.journalOpen = false; this.refreshJournal(); return; }

    const list = this.loadJournal();
    if (this.editingTs) {
      const it = list.find(x => x.ts === this.editingTs);
      if (it) { it.note = note; it.divineName = divineName; it.dua = dua; it.action = action; it.updated = Date.now(); }
    } else {
      list.unshift({ ts: Date.now(), ref: this.curRef, surahName: this.curName, note, divineName, dua, action });
    }
    this.saveJournal(list);
    this.logToday();
    this.journalOpen = false; this.editingTs = null; this.pendingDelete = null;
    this.refreshJournal();
  }

  deleteEntry(ts) {
    const list = this.loadJournal().filter(x => x.ts !== ts);
    this.saveJournal(list);
    this.pendingDelete = null;
    if (this.editingTs === ts) { this.editingTs = null; this.journalOpen = false; }
    this.refreshJournal();
  }

  entryText(it) {
    const lang = this.language;
    const lines = [`${it.surahName || ''} ${it.ref || ''}`.trim()];
    if (it.note) lines.push(it.note);
    if (it.divineName) lines.push(`${t('ponder_name_label', lang)}: ${it.divineName}`);
    if (it.dua) lines.push(`${t('ponder_dua_label', lang)}: ${it.dua}`);
    if (it.action) lines.push(`${t('ponder_action_label', lang)}: ${it.action}`);
    return lines.join('\n');
  }

  copyEntry(ts, btn) {
    const it = this.loadJournal().find(x => x.ts === ts);
    if (it) this.copyText(this.entryText(it), btn);
  }

  exportAll(btn) {
    const list = this.loadJournal();
    if (!list.length) return;
    const text = list.map(it => this.entryText(it)).join('\n\n───────────\n\n');
    this.copyText(text, btn);
  }

  /** Build shareable text for the verse currently on the card. */
  shareText() {
    const lang = this.language;
    const lines = [];
    if (this.curArabic) lines.push(this.curArabic);
    if (this.curTranslation) lines.push(this.curTranslation);
    lines.push(`— ${this.curName || ''} ${this.curRef || ''}`.trim());
    if (Array.isArray(this.curPrompts) && this.curPrompts.length) {
      lines.push('');
      lines.push(`${t('ponder_title', lang)}:`);
      this.curPrompts.forEach(p => { if (p) lines.push(`• ${p}`); });
    }
    return lines.join('\n');
  }

  /** Share via the native share sheet when available, otherwise copy to clipboard. */
  shareCurrent(btn) {
    if (!this.curRef) return;
    const text = this.shareText();
    if (navigator.share) {
      navigator.share({ text }).catch(() => {});
      return;
    }
    this.copyText(text, btn);
  }

  /** Dismissible "under development" notice with a contact email. */
  devBannerHtml(lang) {
    let dismissed = false;
    try { dismissed = localStorage.getItem('devNoticeDismissed') === '1'; } catch (e) {}
    if (dismissed) return '';
    const email = 'shahinbdboy@gmail.com';
    return `
      <div id="dev-notice" class="w-full mt-4 rounded-2xl border border-amber-300 dark:border-amber-500/40 bg-amber-50 dark:bg-amber-500/10 px-5 py-4 relative">
        <button data-dismiss-dev class="absolute top-2 right-2 p-1.5 rounded-lg text-amber-700/70 dark:text-amber-300/70 hover:bg-amber-100 dark:hover:bg-amber-500/20" aria-label="${t('close', lang)}">✕</button>
        <div class="flex items-start gap-3 pr-6">
          <span class="text-2xl" aria-hidden="true">🚧</span>
          <div>
            <p class="font-bold text-amber-800 dark:text-amber-200">${t('dev_notice_title', lang)}</p>
            <p class="text-sm text-amber-700 dark:text-amber-300/90 mt-0.5">${t('dev_notice_body', lang)}
              <a href="mailto:${email}" class="font-semibold underline hover:no-underline">${email}</a>.
            </p>
          </div>
        </div>
      </div>`;
  }

  /** Quick-launch cards for the most-used modules (legacy dashboard shortcuts). */
  quickLinksHtml(lang) {
    const QUICK = [
      { tab: 'topics',     emoji: '🗂️', label: 'topics_title',      grad: 'from-sky-400 to-blue-600' },
      { tab: 'quiz',       emoji: '❓', label: 'quiz_center_title',  grad: 'from-purple-400 to-fuchsia-600' },
      { tab: 'wordrepeat', emoji: '🔁', label: 'wr_title',          grad: 'from-amber-400 to-orange-500' },
      { tab: 'sarf',       emoji: '🧬', label: 'sarf_title',        grad: 'from-teal-400 to-emerald-600' },
      { tab: 'memorize',   emoji: '🎙️', label: 'memorize',          grad: 'from-rose-400 to-pink-600' },
      { tab: 'learn', module: 'kids', emoji: '🧒', label: 'learn_kids_title', grad: 'from-yellow-400 to-amber-500' },
      { tab: 'mushaf',     emoji: '📗', label: 'mushaf',            grad: 'from-indigo-400 to-violet-600' },
      { tab: 'audio',      emoji: '🎧', label: 'audio',             grad: 'from-cyan-400 to-sky-600' }
    ];
    return `
      <div class="w-full mt-6">
        <h3 class="text-sm uppercase tracking-wide font-semibold text-gray-400 dark:text-gray-500 mb-3 text-center">${t('quick_links', lang)}</h3>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          ${QUICK.map(q => `
            <button data-ql="${q.tab}"${q.module ? ` data-ql-module="${q.module}"` : ''}
                    class="group rounded-2xl overflow-hidden shadow hover:shadow-lg hover:-translate-y-0.5 transition-all bg-white dark:bg-gray-800 text-center">
              <div class="h-16 bg-gradient-to-br ${q.grad} flex items-center justify-center text-3xl">${q.emoji}</div>
              <div class="py-2 px-1 text-xs font-semibold text-gray-700 dark:text-gray-200">${t(q.label, lang)}</div>
            </button>`).join('')}
        </div>
      </div>`;
  }

  // ---- i18n fallback for new UI strings ------------------------------------
  L(key) {
    const s = t(key, this.language);
    if (s !== key) return s;
    const fb = PONDER_I18N[key];
    return fb ? (fb[this.language] || fb.en) : key;
  }
  themeLabel(id) {
    const o = PONDER_THEMES[id];
    return o ? (o[this.language] || o.en) : '';
  }

  // ---- pool + position -----------------------------------------------------
  dayNumber() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    return Math.floor((now - start) / 86400000);
  }
  /** The active pool: a themed subset, or the full reflection pool. */
  pool() {
    return (this.theme && PONDER_THEMES[this.theme]) ? PONDER_THEMES[this.theme].refs : PONDER_REFS;
  }
  /** Normalised index into the current pool (day-derived, or explicit). */
  currentIndex() {
    const n = this.pool().length;
    const base = (this.poolPos == null) ? this.dayNumber() : this.poolPos;
    return ((base % n) + n) % n;
  }

  /** Theme picker chips + a heading. */
  themeBarHtml() {
    const chip = (id, label, active) => `
      <button data-ponder-theme="${this.esc(id)}"
              class="px-3 py-1 rounded-full text-xs font-medium border transition-colors ${active
                ? 'bg-primary text-white border-primary'
                : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}">${label}</button>`;
    const chips = [chip('', '🌐 ' + this.esc(this.L('ponder_all')), !this.theme)]
      .concat(Object.keys(PONDER_THEMES).map(id =>
        chip(id, PONDER_THEMES[id].emoji + ' ' + this.esc(this.themeLabel(id)), this.theme === id)));
    return `
      <p class="text-[11px] uppercase tracking-wide font-semibold text-gray-400 mb-2 text-center">${this.esc(this.L('ponder_themes'))}</p>
      <div class="flex flex-wrap justify-center gap-2">${chips.join('')}</div>`;
  }

  /**
   * Three distinct generic prompts for the given rotation seed.
   * If an invented key hasn't been merged into translations.js yet, t() returns
   * the key unchanged — in that case we fall back to the always-present q1..q4.
   */
  promptText(key) {
    const s = t(key, this.language);
    if (s !== key) return s;
    const fb = 'ponder_q' + (((key.match(/\d+/) || [1])[0] - 1) % 4 + 1);
    return t(fb, this.language);
  }
  promptsFor(seed) {
    const n = PONDER_PROMPT_KEYS.length;
    return [0, 1, 2].map(k => this.promptText(PONDER_PROMPT_KEYS[((seed * 3) + k) % n]));
  }

  async render() {
    const lang = this.language;
    const pool = this.pool();
    const total = pool.length;
    const idx = this.currentIndex();
    const ref = pool[idx];
    const m = ref.match(/(\d+):(\d+)(?:-(\d+))?/);
    const surah = parseInt(m[1]);
    const start = parseInt(m[2]);
    const end = m[3] ? parseInt(m[3]) : start;

    this.container.innerHTML = `
      ${this.devBannerHtml(lang)}
      <div id="ponder-card" class="w-full mt-6 rounded-2xl overflow-hidden shadow-lg
                                   bg-gradient-to-br from-indigo-50 via-white to-emerald-50
                                   dark:from-gray-800 dark:via-gray-800 dark:to-gray-800
                                   border border-indigo-100 dark:border-gray-700">
        <div class="px-6 pt-5 pb-2 text-center">
          <div class="text-3xl mb-1">🌅</div>
          <h2 class="text-lg font-bold text-gray-800 dark:text-gray-100">${t('ponder_title', lang)}</h2>
        </div>
        <div class="px-6 pb-2">${this.themeBarHtml()}</div>
        <div id="ponder-body" class="px-6 pb-6 text-center">
          <p class="text-gray-400 py-6">${t('loading', lang)}</p>
        </div>
      </div>
      ${this.quickLinksHtml(lang)}
    `;

    // Rebuilding the container wipes the bookmarks/continue-reading strip
    // bookmarks.js inserted above the card — ask it to re-insert (deferred).
    if (typeof bookmarks !== 'undefined' && bookmarks) bookmarks.scheduleStrip();

    try {
      const verses = await QuranData.fetchRange(surah, start, end, lang);
      if (!this.isShowing() || !verses.length) return; // user loaded something meanwhile

      const arabic = verses.map(v => v.arabic).join(' ۝ ');
      const translation = verses.map(v => v.translation).join(' ');
      const name = verses[0].surahName;

      // Remember the current pick so the journal can attach reflections to it.
      this.curRef = ref;
      this.curName = name;
      this.curArabic = arabic;
      this.curTranslation = translation;

      // Three rotating generic reflection prompts (varies with day / random pick).
      const seed = (this.promptSeed || 0) + idx;
      const [p1, p2, p3] = this.promptsFor(seed);
      this.curPrompts = [p1, p2, p3];

      document.getElementById('ponder-body').innerHTML = `
        <div class="ayah-arabic !text-3xl !leading-loose mb-3" dir="rtl">${arabic}</div>
        <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-2" dir="auto">${translation}</p>
        <p class="text-sm text-gray-400 mb-3">— ${name} ${ref}</p>
        <div class="flex items-center justify-center gap-3 mb-5">
          <button data-ponder-prev aria-label="${this.esc(this.L('ponder_prev'))}" title="${this.esc(this.L('ponder_prev'))}"
                  class="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 text-lg leading-none text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">‹</button>
          <span class="text-xs font-medium text-gray-500 dark:text-gray-400 tabular-nums">${idx + 1} / ${total}${this.theme ? ' · ' + this.esc(this.themeLabel(this.theme)) : ''}</span>
          <button data-ponder-next aria-label="${this.esc(this.L('ponder_next'))}" title="${this.esc(this.L('ponder_next'))}"
                  class="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 text-lg leading-none text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">›</button>
        </div>
        <div class="text-start max-w-3xl mx-auto space-y-2 mb-6">
          <p class="flex gap-2 text-sm text-gray-600 dark:text-gray-300"><span>💭</span><span>${p1}</span></p>
          <p class="flex gap-2 text-sm text-gray-600 dark:text-gray-300"><span>💭</span><span>${p2}</span></p>
          <p class="flex gap-2 text-sm text-gray-600 dark:text-gray-300"><span>💭</span><span>${p3}</span></p>
        </div>
        <div class="flex flex-wrap justify-center gap-3">
          <button onclick="window.location.hash='${ref}'"
                  class="px-5 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/80">
            ${t('open_verse', lang)} →
          </button>
          <button id="ponder-another"
                  class="px-5 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
            🎲 ${t('ponder_another', lang)}
          </button>
          <button data-ponder-random
                  class="px-5 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
            ✨ ${t('ponder_random', lang)}
          </button>
          <button data-ponder-share
                  class="px-5 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
            📤 ${t('ponder_share', lang)}
          </button>
        </div>
        <div id="ponder-journal" class="mt-6 pt-5 border-t border-indigo-100 dark:border-gray-700 text-start">
          ${this.journalInnerHtml()}
        </div>
      `;
    } catch (err) {
      const body = document.getElementById('ponder-body');
      if (body) body.innerHTML = `<p class="text-gray-400 py-4">${t('error', lang)}</p>`;
    }
  }

  /** Re-render only the journal subtree (keeps the verse above untouched). */
  refreshJournal() {
    const el = document.getElementById('ponder-journal');
    if (el) el.innerHTML = this.journalInnerHtml();
  }

  /** The full reflection-journal panel: stats, editor, and saved list. */
  journalInnerHtml() {
    const lang = this.language;
    const list = this.loadJournal();
    const streak = this.streak();
    const pondered = this.ponderedToday();

    const inp = 'w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white/70 dark:bg-gray-900/40 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/40';

    // ---- stats + primary actions ----
    const stats = `
      <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div class="flex items-center gap-3 text-sm">
          <span class="inline-flex items-center gap-1 font-semibold text-orange-500 dark:text-orange-400">🔥 ${streak} <span class="font-normal text-gray-500 dark:text-gray-400">${t('ponder_streak', lang)}</span></span>
          <span class="inline-flex items-center gap-1 font-semibold text-indigo-500 dark:text-indigo-300">📔 ${list.length} <span class="font-normal text-gray-500 dark:text-gray-400">${t('ponder_total_label', lang)}</span></span>
        </div>
        <button data-ponder-mark ${pondered ? 'disabled' : ''}
                class="px-3 py-1.5 rounded-lg text-xs font-medium ${pondered
                  ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 cursor-default'
                  : 'border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}">
          ${pondered ? '✓ ' + t('ponder_marked', lang) : t('ponder_mark', lang)}
        </button>
      </div>`;

    // ---- editor (open state) ----
    let editor = '';
    if (this.journalOpen) {
      const editing = this.editingTs ? list.find(x => x.ts === this.editingTs) : null;
      const v = (k) => editing ? this.esc(editing[k] || '') : '';
      const refLabel = editing ? `${this.esc(editing.surahName || '')} ${this.esc(editing.ref || '')}` : `${this.esc(this.curName)} ${this.esc(this.curRef)}`;
      editor = `
        <div class="rounded-xl bg-white/60 dark:bg-gray-900/30 border border-indigo-100 dark:border-gray-700 p-4 mb-4 space-y-3">
          <p class="text-xs font-semibold text-gray-400">${refLabel.trim()}</p>
          <div>
            <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">${t('ponder_note_label', lang)}</label>
            <textarea id="ponder-note" rows="3" dir="auto" class="${inp}" placeholder="${t('ponder_note_ph', lang)}">${v('note')}</textarea>
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">${t('ponder_name_label', lang)}</label>
            <input id="ponder-name" type="text" dir="auto" class="${inp}" placeholder="${t('ponder_name_ph', lang)}" value="${v('divineName')}">
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">${t('ponder_dua_label', lang)}</label>
            <input id="ponder-dua" type="text" dir="auto" class="${inp}" placeholder="${t('ponder_dua_ph', lang)}" value="${v('dua')}">
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">${t('ponder_action_label', lang)}</label>
            <input id="ponder-action" type="text" dir="auto" class="${inp}" placeholder="${t('ponder_action_ph', lang)}" value="${v('action')}">
          </div>
          <div class="flex gap-2 justify-end pt-1">
            <button data-ponder-cancel class="px-4 py-1.5 rounded-lg text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">${t('ponder_cancel', lang)}</button>
            <button data-ponder-save class="px-4 py-1.5 rounded-lg text-sm font-medium bg-primary text-white hover:bg-primary/80">${this.editingTs ? t('ponder_update', lang) : t('ponder_save', lang)}</button>
          </div>
        </div>`;
    } else {
      editor = `
        <button data-ponder-write class="w-full mb-4 px-4 py-2.5 rounded-xl border border-dashed border-indigo-300 dark:border-gray-600 text-sm font-medium text-indigo-600 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-gray-700/40">
          ✍️ ${t('ponder_write', lang)}
        </button>`;
    }

    // ---- saved list ----
    let saved = '';
    if (list.length) {
      const items = list.map(it => {
        const date = new Date(it.updated || it.ts);
        const dateStr = date.toLocaleDateString(lang === 'ar' ? 'ar' : (lang === 'bn' ? 'bn-BD' : undefined), { year: 'numeric', month: 'short', day: 'numeric' });
        const chip = (icon, label, val) => val
          ? `<p class="text-xs text-gray-500 dark:text-gray-400 mt-1"><span class="font-medium">${icon} ${label}:</span> <span dir="auto">${this.esc(val)}</span></p>` : '';
        const confirming = this.pendingDelete === it.ts;
        return `
          <div class="rounded-xl bg-white/70 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 p-3">
            <div class="flex items-center justify-between gap-2 mb-1">
              <p class="text-xs font-semibold text-primary dark:text-blue-300">${this.esc(it.surahName || '')} ${this.esc(it.ref || '')}</p>
              <span class="text-[11px] text-gray-400">${dateStr}</span>
            </div>
            ${it.note ? `<p class="text-sm text-gray-700 dark:text-gray-200 whitespace-pre-wrap" dir="auto">${this.esc(it.note)}</p>` : ''}
            ${chip('🕋', t('ponder_name_label', lang), it.divineName)}
            ${chip('🤲', t('ponder_dua_label', lang), it.dua)}
            ${chip('🎯', t('ponder_action_label', lang), it.action)}
            <div class="flex items-center gap-1 mt-2">
              ${confirming ? `
                <span class="text-xs text-red-500 me-1">${t('ponder_confirm_delete', lang)}</span>
                <button data-ponder-delok="${it.ts}" class="px-2 py-1 rounded text-xs font-medium bg-red-500 text-white hover:bg-red-600">${t('ponder_delete', lang)}</button>
                <button data-ponder-delcancel class="px-2 py-1 rounded text-xs text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700">${t('ponder_cancel', lang)}</button>
              ` : `
                <button data-ponder-edit="${it.ts}" class="px-2 py-1 rounded text-xs text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">✏️ ${t('ponder_edit', lang)}</button>
                <button data-ponder-copy="${it.ts}" class="px-2 py-1 rounded text-xs text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700" title="${t('copy', lang)}" aria-label="${t('copy', lang)}">📋</button>
                <button data-ponder-del="${it.ts}" class="px-2 py-1 rounded text-xs text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">🗑️ ${t('ponder_delete', lang)}</button>
              `}
            </div>
          </div>`;
      }).join('');
      saved = `
        <div class="flex items-center justify-between mb-2">
          <h4 class="text-sm font-semibold text-gray-600 dark:text-gray-300">${t('ponder_saved_list', lang)}</h4>
          <button data-ponder-export class="px-2 py-1 rounded text-xs text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">${t('ponder_export', lang)}</button>
        </div>
        <div class="space-y-2">${items}</div>`;
    } else {
      saved = `<p class="text-xs text-gray-400 text-center py-2">${t('ponder_no_notes', lang)}</p>`;
    }

    return `
      <h3 class="text-sm font-bold text-gray-700 dark:text-gray-200 mb-1">📔 ${t('ponder_journal_title', lang)}</h3>
      <p class="text-xs text-gray-400 mb-4">${t('ponder_journal_subtitle', lang)}</p>
      ${stats}
      ${editor}
      ${saved}`;
  }
}

// Initialize when DOM is ready
let ponderCard;
document.addEventListener('DOMContentLoaded', () => {
  ponderCard = new PonderCard();
});
