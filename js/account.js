/**
 * Account & Cloud Sync (Firebase) — SCAFFOLD
 *
 * Google sign-in + cross-device progress sync via Firestore.
 * Entirely dormant until js/firebase-config.js provides FIREBASE_CONFIG:
 * with a null config this file injects NO UI and makes NO network request.
 *
 * Data model: one Firestore document per user at users/{uid}/data/progress
 *   {
 *     vocabKnown:          string[]      (known-word keys; merged as set union)
 *     vocabQuizBest:       number|null   (merged as max)
 *     kidsQuizBest:        number|null   (merged as max)
 *     namesQuizBest:       number|null   (merged as max)
 *     quranAppSettings:    object|null   (whole settings blob; newer updatedAt wins)
 *     settingsUpdatedAt:   number        (client ms timestamp of last settings edit)
 *     updatedAt:           serverTimestamp
 *   }
 *
 * SECURITY: requires the Firestore rules documented in js/firebase-config.js
 * (allow read/write only when request.auth.uid == userId).
 */

const ACCOUNT_SYNC_KEYS = ['vocabKnown', 'vocabQuizBest', 'kidsQuizBest', 'namesQuizBest', 'quranAppSettings', 'bookmarks', 'lastRead'];
const ACCOUNT_NUMERIC_KEYS = ['vocabQuizBest', 'kidsQuizBest', 'namesQuizBest'];
const ACCOUNT_SETTINGS_TS_KEY = 'quranAppSettingsUpdatedAt';
const ACCOUNT_FIREBASE_VERSION = '10.14.1';
const ACCOUNT_PUSH_INTERVAL_MS = 60000;

class AccountSync {
  constructor() {
    // Dormant without a pasted Firebase config — no UI, no network.
    this.config = (typeof FIREBASE_CONFIG !== 'undefined' && FIREBASE_CONFIG && FIREBASE_CONFIG.apiKey)
      ? FIREBASE_CONFIG : null;
    if (!this.config) return;

    if (!document.getElementById('header-quick-actions')) return;

    this.language = (typeof appSettings !== 'undefined' && appSettings) ? appSettings.get('language') : 'en';
    this.user = null;
    this.status = 'idle'; // idle | syncing | synced | error
    this.signInError = false;
    this.lastSyncTime = null;
    this._lastPushed = null;   // serialized snapshot of last state pushed to Firestore
    this._applyingRemote = false;
    this._open = false;

    this.init();
  }

  /* ------------------------------------------------------------ bootstrap */

  async init() {
    try {
      await this.loadFirebase();
    } catch (err) {
      console.warn('AccountSync: Firebase SDK failed to load, account feature disabled.', err);
      return; // degrade gracefully — no UI at all
    }

    try {
      if (!firebase.apps.length) firebase.initializeApp(this.config);
      this.auth = firebase.auth();
      this.db = firebase.firestore();
    } catch (err) {
      console.warn('AccountSync: Firebase init failed.', err);
      return;
    }

    this.injectButton();

    window.addEventListener('settingChanged', (e) => {
      if (e.detail.key === 'language') this.language = e.detail.value;
      // Track when the user last edited settings so the merge can pick the
      // newer quranAppSettings blob. Skip while we apply a remote merge.
      if (!this._applyingRemote) {
        try { localStorage.setItem(ACCOUNT_SETTINGS_TS_KEY, String(Date.now())); } catch (err) { /* ignore */ }
      }
      if (this._open) this.renderPanel();
    });

    this.auth.onAuthStateChanged((user) => {
      this.user = user;
      this.signInError = false;
      if (user) this.fullSync();
      else this.setStatus('idle');
      this.renderButton();
      if (this._open) this.renderPanel();
    });

    // Periodic + on-hide push of local changes
    setInterval(() => this.pushIfChanged(), ACCOUNT_PUSH_INTERVAL_MS);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') this.pushIfChanged();
    });
  }

  loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = () => reject(new Error('Failed to load ' + src));
      document.head.appendChild(s);
    });
  }

  async loadFirebase() {
    if (typeof firebase !== 'undefined' && firebase.firestore && firebase.auth) return;
    const base = `https://www.gstatic.com/firebasejs/${ACCOUNT_FIREBASE_VERSION}/`;
    await this.loadScript(base + 'firebase-app-compat.js');
    await Promise.all([
      this.loadScript(base + 'firebase-auth-compat.js'),
      this.loadScript(base + 'firebase-firestore-compat.js')
    ]);
  }

  /* ------------------------------------------------------------ UI */

  injectButton() {
    this.wrap = document.createElement('div');
    this.wrap.className = 'relative';

    this.btn = document.createElement('button');
    this.btn.id = 'account-btn';
    this.btn.className = 'p-2 hover:bg-white/10 rounded-lg';
    this.btn.setAttribute('title', t('account', this.language));
    this.wrap.appendChild(this.btn);

    this.panel = document.createElement('div');
    this.panel.id = 'account-panel';
    this.panel.className =
      'absolute top-full mt-2 w-72 max-w-[90vw] rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 ' +
      'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 z-50 hidden text-start';
    this.panel.style.insetInlineEnd = '0';
    this.wrap.appendChild(this.panel);

    const container = document.getElementById('header-quick-actions');
    if (container) container.appendChild(this.wrap);
    this.renderButton();

    this.btn.addEventListener('click', () => (this._open ? this.close() : this.open()));
    document.addEventListener('click', (e) => {
      if (this._open && !this.wrap.contains(e.target)) this.close();
    });

    this.panel.addEventListener('click', (e) => {
      if (e.target.closest('#acct-signin')) this.signIn();
      if (e.target.closest('#acct-signout')) this.signOut();
      if (e.target.closest('#acct-sync')) this.fullSync();
    });
  }

  open() { this._open = true; this.panel.classList.remove('hidden'); this.renderPanel(); }
  close() { this._open = false; this.panel.classList.add('hidden'); }

  renderButton() {
    if (!this.btn) return;
    if (this.user && this.user.photoURL) {
      this.btn.innerHTML =
        `<img src="${this.user.photoURL}" alt="" referrerpolicy="no-referrer"
              class="w-6 h-6 rounded-full ring-2 ring-white/60">`;
    } else {
      this.btn.innerHTML = `<span class="w-6 h-6 flex items-center justify-center text-lg leading-none">👤</span>`;
    }
  }

  statusLine() {
    const lang = this.language;
    if (this.status === 'syncing') return `<span class="text-blue-600 dark:text-blue-400">⟳ ${t('syncing', lang)}</span>`;
    if (this.status === 'error') return `<span class="text-red-600 dark:text-red-400">⚠ ${t('sync_error', lang)}</span>`;
    if (this.status === 'synced') {
      const when = this.lastSyncTime ? new Date(this.lastSyncTime).toLocaleTimeString() : '';
      return `<span class="text-green-600 dark:text-green-400">✓ ${t('synced', lang)}</span>` +
             (when ? ` <span class="text-gray-400 dark:text-gray-500">· ${t('last_synced', lang)} ${when}</span>` : '');
    }
    return '';
  }

  renderPanel() {
    if (!this.panel) return;
    const lang = this.language;

    if (!this.user) {
      this.panel.innerHTML = `
        <div class="p-4">
          <h4 class="font-bold mb-1">👤 ${t('account', lang)}</h4>
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-3">${t('not_signed_in', lang)}</p>
          ${this.signInError ? `<p class="text-sm text-red-600 dark:text-red-400 mb-2">⚠ ${t('sign_in_error', lang)}</p>` : ''}
          <button id="acct-signin"
                  class="w-full px-3 py-2 text-sm font-medium rounded-lg bg-primary text-white hover:opacity-90">
            ${t('sign_in', lang)}
          </button>
        </div>`;
      return;
    }

    const u = this.user;
    this.panel.innerHTML = `
      <div class="p-4">
        <div class="flex items-center gap-3 mb-3">
          ${u.photoURL
            ? `<img src="${u.photoURL}" alt="" referrerpolicy="no-referrer" class="w-10 h-10 rounded-full">`
            : `<span class="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-xl">👤</span>`}
          <div class="min-w-0">
            <div class="font-semibold truncate">${this.escapeHtml(u.displayName || '')}</div>
            <div class="text-xs text-gray-500 dark:text-gray-400 truncate">${this.escapeHtml(u.email || '')}</div>
          </div>
        </div>
        <div class="text-xs mb-3 min-h-[1rem]">${this.statusLine()}</div>
        <div class="flex gap-2">
          <button id="acct-sync"
                  class="flex-1 px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
            ⟳ ${t('sync_now', lang)}
          </button>
          <button id="acct-signout"
                  class="flex-1 px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700">
            ${t('sign_out', lang)}
          </button>
        </div>
      </div>`;
  }

  escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  setStatus(s) {
    this.status = s;
    if (this._open) this.renderPanel();
  }

  /* ------------------------------------------------------------ auth */

  async signIn() {
    this.signInError = false;
    try {
      await this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      // onAuthStateChanged triggers the initial sync + rerender
    } catch (err) {
      if (err && err.code !== 'auth/popup-closed-by-user' && err.code !== 'auth/cancelled-popup-request') {
        console.warn('AccountSync: sign-in failed.', err);
        this.signInError = true;
      }
      if (this._open) this.renderPanel();
    }
  }

  async signOut() {
    try { await this.auth.signOut(); } catch (err) { console.warn('AccountSync: sign-out failed.', err); }
    this._lastPushed = null;
    this.close();
  }

  /* ------------------------------------------------------------ sync engine */

  docRef() {
    return this.db.collection('users').doc(this.user.uid).collection('data').doc('progress');
  }

  /** Read the synced keys from localStorage into a normalized state object. */
  readLocalState() {
    const state = { vocabKnown: [], quranAppSettings: null, settingsUpdatedAt: 0 };
    ACCOUNT_NUMERIC_KEYS.forEach(k => { state[k] = null; });
    try {
      const known = JSON.parse(localStorage.getItem('vocabKnown') || '[]');
      if (Array.isArray(known)) state.vocabKnown = known;
      ACCOUNT_NUMERIC_KEYS.forEach(k => {
        const n = parseInt(localStorage.getItem(k), 10);
        if (!isNaN(n)) state[k] = n;
      });
      const settings = JSON.parse(localStorage.getItem('quranAppSettings') || 'null');
      if (settings && typeof settings === 'object') state.quranAppSettings = settings;
      const ts = parseInt(localStorage.getItem(ACCOUNT_SETTINGS_TS_KEY), 10);
      if (!isNaN(ts)) state.settingsUpdatedAt = ts;
    } catch (err) { /* private mode / corrupt JSON — start from defaults */ }
    return state;
  }

  /** Merge local + remote: arrays = union, numeric bests = max, settings = newer wins. */
  mergeStates(local, remote) {
    const merged = {};

    const remoteKnown = Array.isArray(remote.vocabKnown) ? remote.vocabKnown : [];
    merged.vocabKnown = Array.from(new Set([...local.vocabKnown, ...remoteKnown]));

    ACCOUNT_NUMERIC_KEYS.forEach(k => {
      const l = local[k], r = (typeof remote[k] === 'number' && !isNaN(remote[k])) ? remote[k] : null;
      merged[k] = (l === null) ? r : (r === null) ? l : Math.max(l, r);
    });

    const remoteTs = (typeof remote.settingsUpdatedAt === 'number') ? remote.settingsUpdatedAt : 0;
    const remoteSettings = (remote.quranAppSettings && typeof remote.quranAppSettings === 'object')
      ? remote.quranAppSettings : null;
    if (!remoteSettings || (local.quranAppSettings && local.settingsUpdatedAt >= remoteTs)) {
      merged.quranAppSettings = local.quranAppSettings;
    } else {
      merged.quranAppSettings = remoteSettings;
    }
    merged.settingsUpdatedAt = Math.max(local.settingsUpdatedAt, remoteTs);

    return merged;
  }

  /** Write a merged state back to localStorage and notify the UI of changes. */
  applyLocal(merged) {
    const before = (typeof appSettings !== 'undefined' && appSettings)
      ? { language: appSettings.get('language'), theme: appSettings.get('theme') }
      : null;

    try {
      localStorage.setItem('vocabKnown', JSON.stringify(merged.vocabKnown));
      ACCOUNT_NUMERIC_KEYS.forEach(k => {
        if (merged[k] !== null) localStorage.setItem(k, String(merged[k]));
      });
      if (merged.quranAppSettings) {
        localStorage.setItem('quranAppSettings', JSON.stringify(merged.quranAppSettings));
      }
      localStorage.setItem(ACCOUNT_SETTINGS_TS_KEY, String(merged.settingsUpdatedAt));
    } catch (err) { /* private mode — in-memory only */ }

    // Re-apply merged settings through appSettings so theme/language changes
    // take effect immediately and 'settingChanged' listeners react.
    if (before && merged.quranAppSettings) {
      this._applyingRemote = true;
      try {
        Object.assign(appSettings.settings, merged.quranAppSettings);
        ['language', 'theme'].forEach(key => {
          const v = merged.quranAppSettings[key];
          if (v !== undefined && v !== before[key]) appSettings.set(key, v);
        });
      } finally {
        this._applyingRemote = false;
      }
    }
  }

  /** Serialized snapshot of the synced localStorage keys, for change detection. */
  snapshot() {
    let out;
    try {
      out = JSON.stringify(ACCOUNT_SYNC_KEYS.map(k => localStorage.getItem(k)));
    } catch (err) { out = ''; }
    return out;
  }

  async push(state) {
    const s = state || this.readLocalState();
    await this.docRef().set({
      vocabKnown: s.vocabKnown,
      vocabQuizBest: s.vocabQuizBest,
      kidsQuizBest: s.kidsQuizBest,
      namesQuizBest: s.namesQuizBest,
      quranAppSettings: s.quranAppSettings,
      settingsUpdatedAt: s.settingsUpdatedAt,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    this._lastPushed = this.snapshot();
  }

  /** Pull remote, merge with local, apply locally, push merged back. */
  async fullSync() {
    if (!this.user || this.status === 'syncing') return;
    this.setStatus('syncing');
    try {
      const snap = await this.docRef().get();
      const remote = snap.exists ? (snap.data() || {}) : {};
      const merged = this.mergeStates(this.readLocalState(), remote);
      this.applyLocal(merged);
      await this.push(this.readLocalState());
      this.lastSyncTime = Date.now();
      this.setStatus('synced');
    } catch (err) {
      console.warn('AccountSync: sync failed.', err);
      this.setStatus('error');
    }
  }

  /** Cheap periodic push: only when the serialized local state changed. */
  async pushIfChanged() {
    if (!this.user || this.status === 'syncing') return;
    if (this.snapshot() === this._lastPushed) return;
    try {
      await this.push();
      this.lastSyncTime = Date.now();
      this.setStatus('synced');
    } catch (err) {
      console.warn('AccountSync: background push failed.', err);
      this.setStatus('error');
    }
  }
}

/* ============================================================================
 * My Progress dashboard  (LOCAL-ONLY, no network, independent of Firebase)
 *
 * A self-contained profile panel that AGGREGATES learning stats by READING
 * (never mutating) localStorage keys that other modules already write. Every
 * stat degrades silently when its source key is absent or corrupt. Also offers
 * a purely-local export/import of progress as a downloadable JSON file.
 *
 * This runs regardless of whether Firebase sync is configured — the account
 * sync above stays dormant without a config, but progress is always local.
 * ==========================================================================*/

// Keys included in the local export/import (prefix match or exact). Only keys
// matching these are ever WRITTEN back on import, so a tampered file cannot set
// arbitrary localStorage entries.
const PROGRESS_KEY_PREFIXES = [
  'lq_', 'vocab', 'names', 'kids', 'tajweed', 'mushaf', 'khatmah', 'memorize',
  'wa_', 'ponder', 'amal', 'mutashabihat', 'quizBest', 'quizStreak', 'hw_',
  'sarf', 'surahPages', 'tafsir', 'wbw', 'wr_', 'searchHistory', 'quickNav',
  'quranAppSettings'
];

class ProgressDashboard {
  constructor() {
    if (typeof document === 'undefined') return;
    if (!document.getElementById('header-quick-actions')) return;

    this.lang = (typeof appSettings !== 'undefined' && appSettings) ? appSettings.get('language') : 'en';
    this._open = false;
    this._pendingImport = null; // { keys:{}, count } awaiting inline confirm
    this._msg = null;           // transient status message { text, tone }
    this._msgTimer = null;

    this.inject();

    window.addEventListener('settingChanged', (e) => {
      if (e && e.detail && e.detail.key === 'language') {
        this.lang = e.detail.value;
        if (this._open) this.renderPanel();
      }
    });
  }

  /* ------------------------------------------------------------ i18n helper */
  // Falls back to the supplied English text when a key is not in translations.js
  // yet (mirrors the pattern used by tajweed-learn.js's tt()).
  tt(key, en) {
    try {
      const v = t(key, this.lang);
      return (v === key) ? en : v;
    } catch (e) { return en; }
  }

  /* ------------------------------------------------------------ ls readers */
  _get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  _int(k) { const v = parseInt(this._get(k), 10); return isNaN(v) ? null : v; }
  _arr(k) {
    const raw = this._get(k);
    if (raw === null) return null;
    try { const a = JSON.parse(raw); return Array.isArray(a) ? a : null; } catch (e) { return null; }
  }
  _obj(k) {
    const raw = this._get(k);
    if (raw === null) return null;
    try { const o = JSON.parse(raw); return (o && typeof o === 'object' && !Array.isArray(o)) ? o : null; } catch (e) { return null; }
  }
  _maxInt(keys) {
    let best = null;
    keys.forEach(k => { const v = this._int(k); if (v !== null) best = (best === null) ? v : Math.max(best, v); });
    return best;
  }
  // Max numeric value across all localStorage keys with a given prefix.
  _maxByPrefix(prefix) {
    let best = null;
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.indexOf(prefix) === 0) {
          const v = parseInt(localStorage.getItem(k), 10);
          if (!isNaN(v)) best = (best === null) ? v : Math.max(best, v);
        }
      }
    } catch (e) { /* ignore */ }
    return best;
  }

  isProgressKey(k) {
    return typeof k === 'string' && PROGRESS_KEY_PREFIXES.some(p => k.indexOf(p) === 0);
  }

  /* ------------------------------------------------------------ stat model */
  // Returns { tiles:[...], achievements:[...] }. Anything without a source is
  // simply omitted. Never throws.
  computeStats() {
    const tiles = [];
    const raw = {};
    const push = (icon, label, value, accent) => tiles.push({ icon, label, value, accent });

    // --- 99 Names of Allah -------------------------------------------------
    const namesLearned = this._arr('namesLearned');
    if (namesLearned) { raw.names = namesLearned.length; push('💠', this.tt('stat_names_learned', 'Names learned'), namesLearned.length + '/99', 'emerald'); }
    const namesFav = this._arr('lq_names_favorites');
    if (namesFav && namesFav.length) push('⭐', this.tt('stat_names_fav', 'Favorite names'), String(namesFav.length), 'amber');
    const namesQuiz = this._maxInt(['namesQuizBest', 'namesQuizBestRev']);
    if (namesQuiz !== null) { raw.namesQuiz = namesQuiz; push('🏅', this.tt('stat_names_quiz', 'Best names quiz'), String(namesQuiz), 'amber'); }

    // --- Vocabulary --------------------------------------------------------
    const vocabKnown = this._arr('vocabKnown');
    if (vocabKnown) { raw.vocab = vocabKnown.length; push('📚', this.tt('stat_vocab_known', 'Words known'), String(vocabKnown.length), 'sky'); }
    const vocabFav = this._arr('lq_vocab_fav');
    if (vocabFav && vocabFav.length) push('⭐', this.tt('stat_vocab_fav', 'Favorite words'), String(vocabFav.length), 'amber');
    const vocabReview = this._obj('vocabReview');
    if (vocabReview) { const n = Object.keys(vocabReview).length; if (n) push('🔁', this.tt('stat_vocab_review', 'Words in review'), String(n), 'sky'); }
    const vocabQuiz = this._maxInt(['vocabQuizBest', 'vocabQuizBestRoots', 'vocabQuizBestListen']);
    if (vocabQuiz !== null) push('🎯', this.tt('stat_vocab_quiz', 'Best vocab quiz'), String(vocabQuiz), 'sky');

    // --- Khatmah reading plan ----------------------------------------------
    const plan = this._obj('khatmahPlan');
    if (plan && typeof plan.days === 'number' && plan.days > 0) {
      const done = Array.isArray(plan.done) ? plan.done.length : 0;
      const pct = Math.min(100, Math.round(done / plan.days * 100));
      raw.khatmah = pct;
      push('📖', this.tt('stat_khatmah', 'Khatmah progress'), pct + '%', 'violet');
    }

    // --- Memorization ------------------------------------------------------
    const memStats = this._obj('memorizeStats');
    if (memStats) {
      const a = parseInt(memStats.ayahsCompleted, 10);
      if (!isNaN(a)) { raw.memAyahs = a; push('🧠', this.tt('stat_memorize_ayahs', 'Ayahs memorized'), String(a), 'violet'); }
      const w = parseInt(memStats.wordsCorrect, 10);
      if (!isNaN(w) && w) push('🗣️', this.tt('stat_memorize_words', 'Words recited'), String(w), 'violet');
    }

    // --- Tajweed -----------------------------------------------------------
    const tajLearned = this._arr('tajweedLearned');
    if (tajLearned) { raw.tajweed = tajLearned.length; push('🎨', this.tt('stat_tajweed_rules', 'Tajweed rules learned'), String(tajLearned.length), 'rose'); }
    const tajDrill = this._obj('tajweedDrillBest');
    if (tajDrill && typeof tajDrill.score === 'number' && typeof tajDrill.total === 'number') {
      push('🏆', this.tt('stat_tajweed_drill', 'Best tajweed drill'), tajDrill.score + '/' + tajDrill.total, 'rose');
    }

    // --- Word-arrange game -------------------------------------------------
    const waStreak = this._int('wa_streak');
    if (waStreak !== null && waStreak) { raw.waStreak = waStreak; push('🧩', this.tt('stat_wordarrange_streak', 'Word-arrange streak'), String(waStreak), 'teal'); }

    // --- Mutashabihat ------------------------------------------------------
    const mutStreak = this._int('mutashabihat:bestStreak');
    if (mutStreak !== null && mutStreak) push('🔍', this.tt('stat_mutashabihat', 'Mutashabihat streak'), String(mutStreak), 'teal');

    // --- Quiz center (aggregate across all types/scopes) -------------------
    const quizBest = this._maxByPrefix('quizBest:');
    if (quizBest !== null) push('❓', this.tt('stat_quiz_best', 'Best quiz score'), String(quizBest), 'indigo');
    const quizStreak = this._maxByPrefix('quizStreak:');
    if (quizStreak !== null && quizStreak) { raw.quizStreak = quizStreak; push('⚡', this.tt('stat_quiz_streak', 'Best quiz streak'), String(quizStreak), 'indigo'); }

    // --- Kids --------------------------------------------------------------
    const kidsStreak = this._int('kidsStreakCount');
    const kidsBest = this._int('kidsStreakBest');
    if (kidsBest !== null && kidsBest) { raw.kidsStreak = kidsBest; push('🌈', this.tt('stat_kids_streak', 'Kids best streak'), String(kidsBest), 'pink'); }
    else if (kidsStreak !== null && kidsStreak) { raw.kidsStreak = kidsStreak; push('🌈', this.tt('stat_kids_streak', 'Kids best streak'), String(kidsStreak), 'pink'); }

    // --- Bookmarks & recent reads ------------------------------------------
    const marks = this._arr('mushafBookmarks');
    if (marks && marks.length) push('🔖', this.tt('stat_bookmarks', 'Bookmarks'), String(marks.length), 'slate');
    const recent = this._arr('quickNavRecent');
    if (recent && recent.length) push('🕘', this.tt('stat_recent_reads', 'Recent reads'), String(recent.length), 'slate');

    // --- Reflection journal ------------------------------------------------
    const journal = this._arr('ponderJournal');
    if (journal && journal.length) push('✍️', this.tt('stat_ponder_journal', 'Reflections written'), String(journal.length), 'lime');

    // --- Word-form (sarf) favorites ----------------------------------------
    const sarfFav = this._arr('lq_sarf_favorites');
    if (sarfFav && sarfFav.length) push('🌿', this.tt('stat_sarf_fav', 'Saved word-forms'), String(sarfFav.length), 'lime');

    // --- Achievements (only earned ones are shown) -------------------------
    const ach = [];
    const badge = (cond, icon, label) => { if (cond) ach.push({ icon, label }); };
    badge(raw.names >= 10, '💠', this.tt('ach_names_10', 'First 10 Names'));
    badge(raw.names >= 50, '🌟', this.tt('ach_names_50', 'Half the Names'));
    badge(raw.names >= 99, '👑', this.tt('ach_names_99', 'All 99 Names'));
    badge(raw.namesQuiz >= 20, '🎖️', this.tt('ach_names_quiz', 'Names Quiz Ace'));
    badge(raw.vocab >= 100, '📚', this.tt('ach_vocab_100', '100 Words Known'));
    badge(raw.vocab >= 500, '🎓', this.tt('ach_vocab_500', '500 Words Known'));
    badge(raw.khatmah > 0, '📖', this.tt('ach_khatmah_start', 'Khatmah Begun'));
    badge(raw.khatmah >= 100, '🕋', this.tt('ach_khatmah_done', 'Quran Completed'));
    badge(raw.memAyahs >= 10, '🧠', this.tt('ach_mem_10', '10 Ayahs Memorized'));
    badge(raw.tajweed >= 5, '🎨', this.tt('ach_tajweed_5', 'Tajweed Explorer'));
    badge(raw.kidsStreak >= 7, '🌈', this.tt('ach_kids_7', '7-Day Kids Streak'));
    badge(Math.max(raw.quizStreak || 0, raw.waStreak || 0) >= 10, '⚡', this.tt('ach_streak_10', '10-in-a-Row Streak'));

    return { tiles, achievements: ach };
  }

  /* ------------------------------------------------------------ UI shell */
  inject() {
    this.wrap = document.createElement('div');
    this.wrap.className = 'relative';

    this.btn = document.createElement('button');
    this.btn.id = 'progress-btn';
    this.btn.className = 'p-2 hover:bg-white/10 rounded-lg';
    this.btn.setAttribute('title', this.tt('my_progress', 'My Progress'));
    this.btn.innerHTML = `<span class="w-6 h-6 flex items-center justify-center text-lg leading-none">📊</span>`;
    this.wrap.appendChild(this.btn);

    this.panel = document.createElement('div');
    this.panel.id = 'progress-panel';
    this.panel.className =
      'absolute top-full mt-2 w-80 max-w-[92vw] max-h-[80vh] overflow-y-auto rounded-xl shadow-2xl ' +
      'border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 ' +
      'z-50 hidden text-start';
    this.panel.style.insetInlineEnd = '0';
    this.wrap.appendChild(this.panel);

    // Hidden file input for local import.
    this.fileInput = document.createElement('input');
    this.fileInput.type = 'file';
    this.fileInput.accept = 'application/json,.json';
    this.fileInput.className = 'hidden';
    this.fileInput.addEventListener('change', (e) => this.onFileChosen(e));
    this.wrap.appendChild(this.fileInput);

    const container = document.getElementById('header-quick-actions');
    if (container) container.appendChild(this.wrap);

    this.btn.addEventListener('click', () => (this._open ? this.close() : this.open()));
    document.addEventListener('click', (e) => {
      if (this._open && !this.wrap.contains(e.target)) this.close();
    });
    this.panel.addEventListener('click', (e) => this.onPanelClick(e));
  }

  open() {
    this._open = true;
    this._pendingImport = null;
    this.panel.classList.remove('hidden');
    this.renderPanel();
  }
  close() {
    this._open = false;
    this._pendingImport = null;
    this.panel.classList.add('hidden');
  }

  flash(text, tone) {
    this._msg = { text, tone: tone || 'green' };
    if (this._msgTimer) clearTimeout(this._msgTimer);
    this._msgTimer = setTimeout(() => { this._msg = null; if (this._open) this.renderPanel(); }, 4000);
    if (this._open) this.renderPanel();
  }

  accentClass(a) {
    const map = {
      emerald: 'text-emerald-600 dark:text-emerald-400',
      amber: 'text-amber-600 dark:text-amber-400',
      sky: 'text-sky-600 dark:text-sky-400',
      violet: 'text-violet-600 dark:text-violet-400',
      rose: 'text-rose-600 dark:text-rose-400',
      teal: 'text-teal-600 dark:text-teal-400',
      indigo: 'text-indigo-600 dark:text-indigo-400',
      pink: 'text-pink-600 dark:text-pink-400',
      slate: 'text-slate-600 dark:text-slate-300',
      lime: 'text-lime-600 dark:text-lime-400'
    };
    return map[a] || 'text-gray-700 dark:text-gray-200';
  }

  renderPanel() {
    if (!this.panel) return;
    const lang = this.lang;
    const { tiles, achievements } = this.computeStats();

    const header = `
      <div class="flex items-center gap-2 px-4 py-3 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
        <span class="text-lg leading-none">📊</span>
        <h4 class="font-bold flex-1">${this.tt('my_progress', 'My Progress')}</h4>
        <button data-action="close" class="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500"
                title="${t('close', lang)}" aria-label="${t('close', lang)}">✕</button>
      </div>`;

    let body;
    if (!tiles.length) {
      body = `<div class="p-6 text-sm text-center text-gray-500 dark:text-gray-400">${this.tt('no_progress_yet', 'Start learning to see your progress here.')}</div>`;
    } else {
      const tileHtml = tiles.map(ti => `
        <div class="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/40 p-2.5">
          <div class="flex items-center gap-1.5 text-[11px] text-gray-500 dark:text-gray-400 mb-0.5">
            <span class="leading-none">${ti.icon}</span>
            <span class="truncate">${this.escapeHtml(ti.label)}</span>
          </div>
          <div class="text-lg font-bold ${this.accentClass(ti.accent)}">${this.escapeHtml(ti.value)}</div>
        </div>`).join('');

      const achHtml = achievements.length ? `
        <div class="px-4 pb-1">
          <h5 class="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">🏅 ${this.tt('achievements', 'Achievements')}</h5>
          <div class="flex flex-wrap gap-1.5">
            ${achievements.map(a => `
              <span class="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full
                           bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                <span class="leading-none">${a.icon}</span>${this.escapeHtml(a.label)}
              </span>`).join('')}
          </div>
        </div>` : '';

      body = `
        <div class="p-4 grid grid-cols-2 gap-2">${tileHtml}</div>
        ${achHtml}`;
    }

    // Export / import + inline confirm.
    let ioSection;
    if (this._pendingImport) {
      ioSection = `
        <div class="rounded-lg border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/30 p-3">
          <p class="text-xs text-amber-800 dark:text-amber-200 mb-2">⚠ ${this.escapeHtml(
            this.tt('import_confirm', 'Replace this device’s progress with {n} saved items from the file?').replace('{n}', String(this._pendingImport.count)))}</p>
          <div class="flex gap-2">
            <button data-action="import-apply" class="flex-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-amber-500 text-white hover:bg-amber-600">
              ${this.tt('import_apply', 'Replace')}
            </button>
            <button data-action="import-cancel" class="flex-1 px-3 py-1.5 text-xs rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
              ${t('cancel', lang)}
            </button>
          </div>
        </div>`;
    } else {
      ioSection = `
        <div class="flex gap-2">
          <button data-action="export" class="flex-1 px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
            ⬇ ${this.tt('export_progress', 'Export')}
          </button>
          <button data-action="import" class="flex-1 px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
            ⬆ ${this.tt('import_progress', 'Import')}
          </button>
        </div>`;
    }

    const msgHtml = this._msg
      ? `<p class="text-xs mt-2 ${this._msg.tone === 'red' ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}">${this.escapeHtml(this._msg.text)}</p>`
      : '';

    const footer = `
      <div class="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
        ${ioSection}
        <p class="text-[11px] text-gray-400 dark:text-gray-500 mt-2">🔒 ${this.tt('progress_local_note', 'Stored only on this device. Nothing is uploaded.')}</p>
        ${msgHtml}
      </div>`;

    this.panel.innerHTML = header + body + footer;
  }

  onPanelClick(e) {
    const el = e.target.closest('[data-action]');
    if (!el) return;
    const action = el.getAttribute('data-action');
    if (action === 'close') this.close();
    else if (action === 'export') this.exportProgress();
    else if (action === 'import') this.fileInput.click();
    else if (action === 'import-apply') this.applyImport();
    else if (action === 'import-cancel') { this._pendingImport = null; this.renderPanel(); }
  }

  /* ------------------------------------------------------------ export */
  gatherProgress() {
    const out = {};
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (this.isProgressKey(k)) {
          const v = localStorage.getItem(k);
          if (v !== null) out[k] = v;
        }
      }
    } catch (e) { /* ignore */ }
    return out;
  }

  exportProgress() {
    try {
      const payload = {
        app: 'all-language-quran',
        kind: 'progress-export',
        version: 1,
        exportedAt: new Date().toISOString(),
        data: this.gatherProgress()
      };
      const count = Object.keys(payload.data).length;
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'quran-progress-' + new Date().toISOString().slice(0, 10) + '.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      this.flash(this.tt('export_done', 'Exported {n} items.').replace('{n}', String(count)), 'green');
    } catch (err) {
      console.warn('ProgressDashboard: export failed.', err);
      this.flash(this.tt('export_failed', 'Could not export progress.'), 'red');
    }
  }

  /* ------------------------------------------------------------ import */
  onFileChosen(e) {
    const file = e.target && e.target.files && e.target.files[0];
    e.target.value = ''; // allow re-choosing the same file later
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        const data = (parsed && typeof parsed.data === 'object' && parsed.data) ? parsed.data
          : (parsed && typeof parsed === 'object' ? parsed : null);
        const keys = {};
        if (data) Object.keys(data).forEach(k => {
          if (this.isProgressKey(k) && typeof data[k] === 'string') keys[k] = data[k];
        });
        const count = Object.keys(keys).length;
        if (!count) { this.flash(this.tt('import_empty', 'No progress data found in that file.'), 'red'); return; }
        this._pendingImport = { keys, count };
        this.renderPanel();
      } catch (err) {
        console.warn('ProgressDashboard: import parse failed.', err);
        this.flash(this.tt('import_invalid', 'Could not read that file.'), 'red');
      }
    };
    reader.onerror = () => this.flash(this.tt('import_invalid', 'Could not read that file.'), 'red');
    try { reader.readAsText(file); } catch (err) { this.flash(this.tt('import_invalid', 'Could not read that file.'), 'red'); }
  }

  applyImport() {
    const pending = this._pendingImport;
    this._pendingImport = null;
    if (!pending) { this.renderPanel(); return; }
    let written = 0;
    Object.keys(pending.keys).forEach(k => {
      if (!this.isProgressKey(k)) return;
      try { localStorage.setItem(k, pending.keys[k]); written++; } catch (e) { /* private mode / quota */ }
    });
    this.flash(this.tt('import_done', 'Imported {n} items. Reopen a section to see updates.').replace('{n}', String(written)), 'green');
  }

  escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
}

// Initialize when DOM is ready
let accountSync;
let progressDashboard;
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    accountSync = new AccountSync();
    try { progressDashboard = new ProgressDashboard(); } catch (err) { console.warn('ProgressDashboard init failed.', err); }
  });
}

// Export for module usage (merge logic is unit-testable in node)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { AccountSync, ProgressDashboard };
}
