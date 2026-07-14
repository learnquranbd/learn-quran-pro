/**
 * Learn Hub
 * Landing view of the Learn tab: choose between the Kids Qaida module,
 * the Vocabulary trainer, or jump to the Memorization checker.
 * Modules render themselves into #learn-kids-root / #learn-vocab-root
 * when they receive the 'learnModuleSelected' event.
 *
 * Enrichments: a learner dashboard (streak / items learned / modules started)
 * pulled from the localStorage each module already writes, per-card progress
 * bars & chips, a "continue learning" banner, a suggested daily goal, and
 * difficulty tags. All progress reads degrade gracefully when a key/global
 * is absent, and the card → module navigation is unchanged.
 */

// Module cards (shared by the grid and the "continue" banner).
const LEARN_CARDS = [
  { module: 'kids',         emoji: '🧒', grad: 'from-amber-400 to-orange-500',  title: 'learn_kids_title',     desc: 'learn_kids_desc',      level: 'learn_level_beginner' },
  { module: 'vocab',        emoji: '📚', grad: 'from-sky-400 to-blue-600',      title: 'learn_vocab_title',    desc: 'learn_vocab_desc',     level: 'learn_level_beginner' },
  { module: 'names',        emoji: '✨', grad: 'from-violet-400 to-purple-600', title: 'learn_names_title',    desc: 'learn_names_desc',     level: 'learn_level_intermediate' },
  { module: 'handwriting',  emoji: '✍️', grad: 'from-rose-400 to-pink-600',     title: 'hw_title',             desc: 'hw_subtitle',          level: 'learn_level_beginner' },
  { module: 'memorize',     emoji: '🎙️', grad: 'from-emerald-400 to-green-600', title: 'learn_memorize_title', desc: 'learn_memorize_desc',  level: 'learn_level_advanced' },
  { module: 'tajweedlearn', emoji: '🎨', grad: 'from-cyan-400 to-teal-600',     title: 'tj_learn_title',       desc: 'tj_learn_subtitle',    level: 'learn_level_intermediate' }
];

// Local i18n fallback so new keys render as real text before translations.js
// gets them. `t()` returns the raw key when a key is missing — we detect that
// and substitute the fallback. Reported for later merge into translations.js.
const LEARN_I18N_FALLBACK = {
  learn_dashboard_title:   { en: 'Your progress',                     bn: 'আপনার অগ্রগতি' },
  learn_stat_streak:       { en: 'day streak',                        bn: 'দিনের ধারা' },
  learn_stat_learned:      { en: 'items learned',                     bn: 'শেখা আইটেম' },
  learn_stat_modules:      { en: 'modules started',                   bn: 'শুরু করা মডিউল' },
  learn_continue_title:    { en: 'Continue learning',                 bn: 'শেখা চালিয়ে যান' },
  learn_continue_cta:      { en: 'Pick up where you left off',        bn: 'যেখানে থেমেছিলেন সেখান থেকে' },
  learn_continue_btn:      { en: 'Resume',                            bn: 'চালিয়ে যান' },
  learn_goal_label:        { en: "Today's goal",                      bn: 'আজকের লক্ষ্য' },
  learn_goal_review:       { en: 'Review {n} vocabulary words',       bn: '{n}টি শব্দ রিভিউ করুন' },
  learn_goal_start:        { en: 'Start any lesson to begin a streak',bn: 'ধারা শুরু করতে যেকোনো পাঠ শুরু করুন' },
  learn_goal_keep_streak:  { en: 'Practice today to keep your {n}-day streak', bn: 'আপনার {n} দিনের ধারা ধরে রাখতে আজ অনুশীলন করুন' },
  learn_goal_explore:      { en: 'Explore a new module today',        bn: 'আজ একটি নতুন মডিউল ঘুরে দেখুন' },
  learn_level_beginner:    { en: 'Beginner',                          bn: 'প্রাথমিক' },
  learn_level_intermediate:{ en: 'Intermediate',                      bn: 'মধ্যম' },
  learn_level_advanced:    { en: 'Advanced',                          bn: 'উন্নত' },
  learn_not_started:       { en: 'Not started',                       bn: 'শুরু হয়নি' },
  learn_chip_best:         { en: 'Best {n}',                          bn: 'সেরা {n}' },
  learn_chip_due:          { en: '{n} due',                           bn: '{n}টি বাকি' },
  learn_chip_practiced:    { en: '{n} practiced',                     bn: '{n}টি অনুশীলিত' },
  learn_chip_ayahs:        { en: '{n} ayahs',                         bn: '{n}টি আয়াত' },
  learn_chip_progress:     { en: '{done}/{total}',                    bn: '{done}/{total}' }
};

const LEARN_LAST_MODULE_KEY = 'learnLastModule';

class LearnHub {
  constructor() {
    this.hub = document.getElementById('learn-hub');
    if (!this.hub) return;

    this.roots = {
      kids: document.getElementById('learn-kids-root'),
      vocab: document.getElementById('learn-vocab-root'),
      names: document.getElementById('learn-names-root'),
      handwriting: document.getElementById('handwriting-root')
    };
    this.backBar = document.getElementById('learn-back');
    this.language = (typeof appSettings !== 'undefined' && appSettings) ? appSettings.get('language') : 'en';

    this.render();

    window.addEventListener('settingChanged', (e) => {
      if (e.detail.key === 'language') {
        this.language = e.detail.value;
        this.render();
      }
    });

    // External requests to open a module (e.g. sidebar "Quranic Words")
    window.addEventListener('learnModuleSelected', (e) => {
      if (this.roots[e.detail.module]) {
        this.rememberModule(e.detail.module);
        this.showModule(e.detail.module, false);
      }
    });

    this.backBar.querySelector('button').addEventListener('click', () => this.showHub());
  }

  // ---------- i18n helper (local fallback + {var} interpolation) ----------

  tt(key, vars) {
    let s = t(key, this.language);
    if (s === key && LEARN_I18N_FALLBACK[key]) {
      s = LEARN_I18N_FALLBACK[key][this.language] || LEARN_I18N_FALLBACK[key].en;
    }
    if (vars) Object.keys(vars).forEach(k => { s = s.split('{' + k + '}').join(vars[k]); });
    return s;
  }

  // ---------- localStorage readers (never throw) ----------

  lsJSON(key, fallback) {
    try {
      const v = JSON.parse(localStorage.getItem(key));
      return (v === null || v === undefined) ? fallback : v;
    } catch (e) { return fallback; }
  }

  lsInt(key) {
    try {
      const v = parseInt(localStorage.getItem(key), 10);
      return isNaN(v) ? null : v;
    } catch (e) { return null; }
  }

  rememberModule(module) {
    try { localStorage.setItem(LEARN_LAST_MODULE_KEY, module); } catch (e) { /* ignore */ }
  }

  /**
   * Per-module progress read from the keys each module already writes.
   * Returns { started, pct|null, done, total, due, learned, chips[] }.
   * `learned` feeds the dashboard "items learned" total; `chips` are small
   * status badges shown on the card when there is no percentage bar.
   */
  moduleProgress(module) {
    const now = Date.now();
    switch (module) {
      case 'kids': {
        // Best scores across the mini-games (learn-kids.js KIDS_BEST_KEYS + legacy quiz key)
        const keys = ['kidsQuizBest', 'kidsWordMatchBest', 'kidsListenWordBest',
                      'kidsLetterHuntBest', 'kidsHarakatBest', 'kidsNumberMatchBest', 'kidsSurahMatchBest'];
        const scores = keys.map(k => this.lsInt(k)).filter(v => v != null);
        const best = scores.length ? Math.max(...scores) : null;
        const chips = best != null ? [{ icon: '🏆', text: this.tt('learn_chip_best', { n: best }) }] : [];
        return { started: scores.length > 0, pct: null, done: 0, total: 0, due: 0, learned: 0, chips };
      }
      case 'vocab': {
        // learn-vocab.js: 'vocabKnown' (array), 'vocabReview' ({arabic:{iv,due}})
        const known = this.lsJSON('vocabKnown', []);
        const knownN = Array.isArray(known) ? known.length : 0;
        const total = (typeof VOCAB_WORDS !== 'undefined') ? VOCAB_WORDS.length : 0;
        const review = this.lsJSON('vocabReview', {});
        const due = (review && typeof review === 'object')
          ? Object.values(review).filter(r => r && r.due <= now).length : 0;
        const chips = due > 0 ? [{ icon: '⏰', text: this.tt('learn_chip_due', { n: due }) }] : [];
        const started = knownN > 0 || (review && Object.keys(review).length > 0);
        return { started, pct: total ? Math.round((knownN / total) * 100) : null, done: knownN, total, due, learned: knownN, chips };
      }
      case 'names': {
        // learn-names.js: 'namesLearned' (array of learned name numbers)
        const arr = this.lsJSON('namesLearned', []);
        const n = Array.isArray(arr) ? arr.length : 0;
        const total = (typeof NAMES_99 !== 'undefined') ? NAMES_99.length : 99;
        return { started: n > 0, pct: total ? Math.round((n / total) * 100) : null, done: n, total, due: 0, learned: n, chips: [] };
      }
      case 'handwriting': {
        // handwriting.js: 'hw_progress' ({key: bestPct}); >=60 counts as passed
        const prog = this.lsJSON('hw_progress', {});
        const practiced = (prog && typeof prog === 'object')
          ? Object.values(prog).filter(v => (v || 0) >= 60).length : 0;
        const chips = practiced > 0 ? [{ icon: '✍️', text: this.tt('learn_chip_practiced', { n: practiced }) }] : [];
        return { started: practiced > 0, pct: null, done: 0, total: 0, due: 0, learned: practiced, chips };
      }
      case 'memorize': {
        // memorize.js: 'memorizeStats' ({sessions, ayahsCompleted, streak, lastDay,...})
        const s = this.lsJSON('memorizeStats', {});
        const ayahs = (s && s.ayahsCompleted) || 0;
        const chips = ayahs > 0 ? [{ icon: '📖', text: this.tt('learn_chip_ayahs', { n: ayahs }) }] : [];
        return { started: (s && s.sessions > 0) || false, pct: null, done: 0, total: 0, due: 0, learned: ayahs, chips };
      }
      case 'tajweedlearn': {
        // tajweed-learn.js: 'tajweedLearned' (array of rule keys)
        const arr = this.lsJSON('tajweedLearned', []);
        const n = Array.isArray(arr) ? arr.length : 0;
        const total = (typeof TAJWEED_LESSONS !== 'undefined') ? Object.keys(TAJWEED_LESSONS).length : 0;
        return { started: n > 0, pct: total ? Math.round((n / total) * 100) : null, done: n, total, due: 0, learned: n, chips: [] };
      }
    }
    return { started: false, pct: null, done: 0, total: 0, due: 0, learned: 0, chips: [] };
  }

  /** Global streak from memorize, only counted if today or yesterday. */
  currentStreak() {
    const s = this.lsJSON('memorizeStats', {});
    if (!s || s.lastDay == null) return 0;
    const dayMs = 86400000;
    const todayN = Math.floor(Date.now() / dayMs);
    return (s.lastDay === todayN || s.lastDay === todayN - 1) ? (s.streak || 0) : 0;
  }

  render() {
    const lang = this.language;
    const prog = {};
    LEARN_CARDS.forEach(c => { prog[c.module] = this.moduleProgress(c.module); });

    this.hub.innerHTML = `
      <div class="text-center mb-6">
        <h2 class="text-2xl font-bold mb-1">${t('learn_hub_title', lang)}</h2>
        <p class="text-gray-500 dark:text-gray-400">${t('learn_hub_subtitle', lang)}</p>
      </div>
      ${this.dashboardHtml(prog)}
      ${this.continueHtml(prog)}
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 w-full">
        ${LEARN_CARDS.map(c => this.cardHtml(c, prog[c.module])).join('')}
      </div>
      ${this.resourcesHtml(lang)}
    `;

    this.hub.querySelectorAll('.learn-card').forEach(card => {
      card.addEventListener('click', () => this.openModule(card.getAttribute('data-module')));
    });
    const cont = this.hub.querySelector('#learn-continue-btn');
    if (cont) cont.addEventListener('click', () => this.openModule(cont.getAttribute('data-module')));

    this.backBar.querySelector('button').innerHTML = `← ${t('back', lang)}`;
  }

  /** Single hub card, with difficulty tag and either a progress bar or chips. */
  cardHtml(c, p) {
    const lang = this.language;
    let footer;
    if (p.pct != null && p.total > 0) {
      footer = `
        <div class="mt-3">
          <div class="flex items-center justify-between text-[11px] mb-1">
            <span class="text-gray-400">${this.tt('learn_chip_progress', { done: p.done, total: p.total })}</span>
            <span class="font-semibold text-gray-500 dark:text-gray-300">${p.pct}%</span>
          </div>
          <div class="h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
            <div class="h-full rounded-full bg-gradient-to-r ${c.grad}" style="width:${p.pct}%"></div>
          </div>
        </div>`;
    } else if (p.chips.length) {
      footer = `<div class="mt-3 flex flex-wrap gap-1">${p.chips.map(ch => `
        <span class="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
          <span>${ch.icon}</span><span>${ch.text}</span></span>`).join('')}</div>`;
    } else {
      footer = `<div class="mt-3 text-[11px] text-gray-400">${this.tt('learn_not_started')}</div>`;
    }
    return `
      <button data-module="${c.module}"
              class="learn-card group text-left rounded-2xl shadow-lg overflow-hidden bg-white dark:bg-gray-800
                     hover:shadow-2xl hover:-translate-y-1 transition-all duration-200">
        <div class="relative h-28 bg-gradient-to-br ${c.grad} flex items-center justify-center text-6xl">
          ${c.emoji}
          <span class="absolute top-2 right-2 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/25 text-white backdrop-blur-sm">${this.tt(c.level)}</span>
        </div>
        <div class="p-4">
          <h3 class="font-bold mb-1">${t(c.title, lang)}</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400">${t(c.desc, lang)}</p>
          ${footer}
        </div>
      </button>`;
  }

  /** Top dashboard: streak / items learned / modules started + a daily goal. */
  dashboardHtml(prog) {
    const learned = LEARN_CARDS.reduce((a, c) => a + (prog[c.module].learned || 0), 0);
    const started = LEARN_CARDS.filter(c => prog[c.module].started).length;
    const streak = this.currentStreak();

    const stat = (icon, val, label) => `
      <div class="flex-1 min-w-[5rem] text-center">
        <div class="text-xl font-bold text-gray-800 dark:text-gray-100">${icon} ${val}</div>
        <div class="text-[11px] text-gray-400">${label}</div>
      </div>`;

    return `
      <div class="w-full max-w-3xl mx-auto mb-5 p-4 rounded-2xl bg-gray-50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-700">
        <div class="text-xs uppercase font-semibold text-gray-400 mb-2 text-center">${this.tt('learn_dashboard_title')}</div>
        <div class="flex flex-wrap gap-2 mb-3">
          ${stat('🔥', streak, this.tt('learn_stat_streak'))}
          ${stat('🎓', learned, this.tt('learn_stat_learned'))}
          ${stat('🧭', `${started}/${LEARN_CARDS.length}`, this.tt('learn_stat_modules'))}
        </div>
        <div class="text-center text-sm">
          <span class="font-semibold text-gray-500 dark:text-gray-300">${this.tt('learn_goal_label')}:</span>
          <span class="text-gray-600 dark:text-gray-400">${this.dailyGoal(prog, started, streak)}</span>
        </div>
      </div>`;
  }

  /** Pick a contextual suggestion from existing data. */
  dailyGoal(prog, started, streak) {
    const due = prog.vocab ? prog.vocab.due : 0;
    if (due > 0) return this.tt('learn_goal_review', { n: due });
    if (started === 0) return this.tt('learn_goal_start');
    if (streak > 0) return this.tt('learn_goal_keep_streak', { n: streak });
    return this.tt('learn_goal_explore');
  }

  /** "Continue learning" banner jumping to the last-opened module. */
  continueHtml(prog) {
    let last = null;
    try { last = localStorage.getItem(LEARN_LAST_MODULE_KEY); } catch (e) { /* ignore */ }
    const c = LEARN_CARDS.find(x => x.module === last);
    if (!c) return '';
    const p = prog[c.module] || {};
    const meta = (p.pct != null && p.total > 0)
      ? `${p.pct}%`
      : (p.chips && p.chips.length ? p.chips[0].text : '');
    return `
      <div class="w-full max-w-3xl mx-auto mb-5">
        <button id="learn-continue-btn" data-module="${c.module}"
                class="w-full flex items-center gap-4 p-4 rounded-2xl text-left text-white shadow-lg
                       bg-gradient-to-r ${c.grad} hover:shadow-xl hover:-translate-y-0.5 transition-all">
          <span class="text-4xl">${c.emoji}</span>
          <span class="flex-1 min-w-0">
            <span class="block text-xs uppercase font-semibold opacity-80">${this.tt('learn_continue_title')}</span>
            <span class="block font-bold truncate">${t(c.title, this.language)}</span>
            <span class="block text-xs opacity-80">${this.tt('learn_continue_cta')}${meta ? ' · ' + meta : ''}</span>
          </span>
          <span class="shrink-0 px-3 py-1.5 rounded-full bg-white/25 text-sm font-semibold backdrop-blur-sm">${this.tt('learn_continue_btn')} →</span>
        </button>
      </div>`;
  }

  /** Curated external learning resources (reputable, free) */
  resourcesHtml(lang) {
    const RESOURCES = [
      { name: 'Quran.com', url: 'https://quran.com', emoji: '📖', desc: 'res_read_study' },
      { name: 'Corpus.Quran.com', url: 'https://corpus.quran.com', emoji: '🏛️', desc: 'res_grammar_corpus' },
      { name: 'QuranWBW.com', url: 'https://quranwbw.com', emoji: '🔤', desc: 'res_wbw_reader' },
      { name: 'Tanzil.net', url: 'https://tanzil.net', emoji: '📜', desc: 'res_text_downloads' },
      { name: 'QuranicAudio.com', url: 'https://quranicaudio.com', emoji: '🎧', desc: 'res_recitations' },
      { name: 'EveryAyah.com', url: 'https://everyayah.com', emoji: '🔁', desc: 'res_ayah_audio' },
      { name: 'Tarteel.ai', url: 'https://tarteel.ai', emoji: '🎙️', desc: 'res_ai_memorization' },
      { name: 'QuranReflect.com', url: 'https://quranreflect.com', emoji: '💭', desc: 'res_reflections' }
    ];
    return `
      <div class="w-full mt-10">
        <h3 class="text-sm uppercase font-semibold text-gray-400 dark:text-gray-500 mb-3 text-center">🌐 ${t('resources_title', lang)}</h3>
        <div class="flex flex-wrap justify-center gap-2">
          ${RESOURCES.map(r => `
            <a href="${r.url}" target="_blank" rel="noopener"
               class="flex items-center gap-2 px-3 py-2 rounded-xl bg-white dark:bg-gray-800 shadow border border-gray-100 dark:border-gray-700
                      hover:shadow-md hover:-translate-y-0.5 transition-all text-sm">
              <span>${r.emoji}</span>
              <span class="font-medium text-gray-800 dark:text-gray-100">${r.name}</span>
              <span class="text-xs text-gray-400">${t(r.desc, lang)}</span>
            </a>`).join('')}
        </div>
      </div>
    `;
  }

  /** Central navigation: remembers the choice, then opens the module. */
  openModule(module) {
    if (!module) return;
    this.rememberModule(module);
    if (module === 'memorize' || module === 'tajweedlearn') {
      tabSystem.switchTab(module);
    } else {
      this.showModule(module, true);
    }
  }

  showModule(module, dispatch) {
    this.hub.classList.add('hidden');
    this.backBar.classList.remove('hidden');
    Object.entries(this.roots).forEach(([name, root]) => {
      root.classList.toggle('hidden', name !== module);
    });
    if (dispatch !== false) {
      window.dispatchEvent(new CustomEvent('learnModuleSelected', { detail: { module } }));
    }
  }

  showHub() {
    this.hub.classList.remove('hidden');
    this.backBar.classList.add('hidden');
    Object.values(this.roots).forEach(root => root.classList.add('hidden'));
    // Refresh the dashboard & card progress with anything learned in-module.
    this.render();
    // No module is active any more — lets modules stop audio/timers.
    // (Safe for all listeners: they check module === '<name>' or roots[module].)
    window.dispatchEvent(new CustomEvent('learnModuleSelected', { detail: { module: null } }));
  }
}

// Initialize when DOM is ready
let learnHub;
document.addEventListener('DOMContentLoaded', () => {
  learnHub = new LearnHub();
});
