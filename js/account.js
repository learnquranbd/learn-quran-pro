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

const ACCOUNT_SYNC_KEYS = ['vocabKnown', 'vocabQuizBest', 'kidsQuizBest', 'namesQuizBest', 'quranAppSettings'];
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

    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return; // DOM hook missing — bail like other modules

    this.language = (typeof appSettings !== 'undefined' && appSettings) ? appSettings.get('language') : 'en';
    this.user = null;
    this.status = 'idle'; // idle | syncing | synced | error
    this.signInError = false;
    this.lastSyncTime = null;
    this._lastPushed = null;   // serialized snapshot of last state pushed to Firestore
    this._applyingRemote = false;
    this._open = false;

    this.init(themeToggle);
  }

  /* ------------------------------------------------------------ bootstrap */

  async init(themeToggle) {
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

    this.injectButton(themeToggle);

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

  injectButton(themeToggle) {
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

    themeToggle.parentElement.appendChild(this.wrap);
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

// Initialize when DOM is ready
let accountSync;
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    accountSync = new AccountSync();
  });
}

// Export for module usage (merge logic is unit-testable in node)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { AccountSync };
}
