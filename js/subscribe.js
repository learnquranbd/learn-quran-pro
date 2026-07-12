/**
 * Email Subscribe — lightweight newsletter/updates signup.
 *
 * Adds a compact "Get updates" entry to the footer that opens a modal with a
 * single email field. On submit the email is stored in Firestore collection
 * 'subscribers' (no Google login required — anonymous create only).
 *
 * Firebase is OPTIONAL: js/account.js loads the Firebase compat SDK and calls
 * firebase.initializeApp() only when js/firebase-config.js provides a real
 * FIREBASE_CONFIG. This module NEVER loads Firebase itself and NEVER errors
 * when Firebase is absent — submissions are queued in localStorage and flushed
 * automatically once Firebase becomes available, so a submission is never lost.
 *
 * localStorage keys:
 *   'subscribed'          — "1" once the user has successfully submitted
 *   'pendingSubscribers'  — JSON array of queued {email, lang, ua} objects
 *
 * All user-facing strings go through t(key, lang).
 */

const SUBSCRIBE_QUEUE_KEY = 'pendingSubscribers';
const SUBSCRIBE_FLAG_KEY = 'subscribed';
const SUBSCRIBE_COLLECTION = 'subscribers';
// Pragmatic email pattern: local@domain.tld — good enough for signup UX.
const SUBSCRIBE_EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

class Subscribe {
  constructor() {
    // DOM hook: the footer. Bail (like other modules) if it's missing.
    this.footer = document.querySelector('footer');
    if (!this.footer) return;

    this.lang = (typeof appSettings !== 'undefined' && appSettings)
      ? appSettings.get('language') : 'en';
    this.subscribed = this.readFlag();
    this.modal = null;
    this._open = false;

    this.injectFooterCta();

    // Keep language in sync with the rest of the app.
    window.addEventListener('settingChanged', (e) => {
      if (e && e.detail && e.detail.key === 'language') {
        this.lang = e.detail.value;
        this.applyLang();
      }
    });

    // Flush any queued submissions once Firebase (loaded async by account.js)
    // becomes available. Harmless no-op when the queue is empty.
    this.tryFlushWithRetry(15);

    // Public API so other modules / the console can open the form.
    window.subscribe = this;
  }

  /* ----------------------------------------------------------- storage */

  readFlag() {
    try { return localStorage.getItem(SUBSCRIBE_FLAG_KEY) === '1'; }
    catch (e) { return false; }
  }

  setFlag() {
    this.subscribed = true;
    try { localStorage.setItem(SUBSCRIBE_FLAG_KEY, '1'); } catch (e) { /* private mode */ }
  }

  readQueue() {
    try {
      const raw = JSON.parse(localStorage.getItem(SUBSCRIBE_QUEUE_KEY) || '[]');
      return Array.isArray(raw) ? raw.filter(x => x && typeof x.email === 'string') : [];
    } catch (e) { return []; }
  }

  saveQueue(arr) {
    try {
      if (!arr.length) localStorage.removeItem(SUBSCRIBE_QUEUE_KEY);
      else localStorage.setItem(SUBSCRIBE_QUEUE_KEY, JSON.stringify(arr));
    } catch (e) { /* private mode — best effort */ }
  }

  /** Add a submission to the local queue, deduped by lowercased email. */
  enqueue(data) {
    const queue = this.readQueue();
    if (!queue.some(x => x.email === data.email)) queue.push(data);
    this.saveQueue(queue);
  }

  /* ----------------------------------------------------------- firebase */

  firebaseReady() {
    return typeof firebase !== 'undefined'
      && firebase.apps && firebase.apps.length > 0
      && typeof firebase.firestore === 'function';
  }

  /** Write one subscriber doc. Doc id = encoded email so re-subscribes merge. */
  writeToFirestore(data) {
    const db = firebase.firestore();
    const id = encodeURIComponent(data.email);
    return db.collection(SUBSCRIBE_COLLECTION).doc(id).set({
      email: data.email,
      lang: data.lang,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      ua: data.ua
    }, { merge: true });
  }

  /** Flush queued submissions to Firestore, keeping any that still fail. */
  async flushQueue() {
    if (!this.firebaseReady()) return;
    const queue = this.readQueue();
    if (!queue.length) return;
    const remaining = [];
    for (const item of queue) {
      try { await this.writeToFirestore(item); }
      catch (e) { remaining.push(item); }
    }
    this.saveQueue(remaining);
  }

  /**
   * Retry flushing while Firebase is still loading (account.js pulls the SDK
   * over the network). Stops early once flushed or when nothing is queued.
   */
  tryFlushWithRetry(attempts) {
    if (!this.readQueue().length) return;
    if (this.firebaseReady()) { this.flushQueue(); return; }
    if (attempts <= 0) return;
    setTimeout(() => this.tryFlushWithRetry(attempts - 1), 1500);
  }

  /* ----------------------------------------------------------- footer CTA */

  injectFooterCta() {
    const container = this.footer.querySelector('.flex') || this.footer.firstElementChild || this.footer;
    this.cta = document.createElement('button');
    this.cta.type = 'button';
    this.cta.id = 'subscribe-cta';
    this.cta.className =
      'inline-flex items-center gap-1 text-primary dark:text-blue-400 hover:underline';
    this.cta.addEventListener('click', () => this.open());
    container.appendChild(this.cta);
    this.renderCta();
  }

  renderCta() {
    if (!this.cta) return;
    const key = this.subscribed ? 'subscribe_subscribed_badge' : 'subscribe_cta';
    const icon = this.subscribed ? '✓' : '✉️';
    this.cta.innerHTML =
      `<span aria-hidden="true">${icon}</span><span>${this.escapeHtml(t(key, this.lang))}</span>`;
  }

  /* ----------------------------------------------------------- modal */

  open() {
    if (this._open) return;
    this._open = true;
    this.buildModal();
    document.body.appendChild(this.modal);
    // Focus the input (or the close button in the subscribed state).
    const input = this.modal.querySelector('#subscribe-email');
    if (input) input.focus();
    document.addEventListener('keydown', this._onKeydown = (e) => {
      if (e.key === 'Escape') this.close();
    });
  }

  close() {
    if (!this._open) return;
    this._open = false;
    if (this.modal && this.modal.parentNode) this.modal.parentNode.removeChild(this.modal);
    this.modal = null;
    if (this._onKeydown) document.removeEventListener('keydown', this._onKeydown);
    this._onKeydown = null;
  }

  buildModal() {
    const lang = this.lang;
    const dir = (typeof isRTL === 'function' && isRTL(lang)) ? 'rtl' : 'ltr';

    const overlay = document.createElement('div');
    overlay.className =
      'fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', t('subscribe_heading', lang));
    overlay.dir = dir;
    overlay.addEventListener('click', (e) => { if (e.target === overlay) this.close(); });

    const card = document.createElement('div');
    card.className =
      'w-full max-w-sm rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 ' +
      'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-5 text-start';
    overlay.appendChild(card);
    this.modal = overlay;
    this.card = card;

    if (this.subscribed) this.renderSubscribedState();
    else this.renderForm();
  }

  headerHtml() {
    const lang = this.lang;
    return `
      <div class="flex items-start justify-between gap-3 mb-2">
        <h4 class="font-bold text-lg leading-tight">✉️ ${this.escapeHtml(t('subscribe_heading', lang))}</h4>
        <button type="button" id="subscribe-close"
                aria-label="${this.escapeHtml(t('subscribe_close', lang))}"
                class="shrink-0 -mt-1 -me-1 p-1 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
          <span aria-hidden="true" class="text-xl leading-none">&times;</span>
        </button>
      </div>`;
  }

  renderForm() {
    const lang = this.lang;
    this.card.innerHTML = `
      ${this.headerHtml()}
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">${this.escapeHtml(t('subscribe_rationale', lang))}</p>
      <form id="subscribe-form" novalidate>
        <input id="subscribe-email" type="email" autocomplete="email" inputmode="email"
               placeholder="${this.escapeHtml(t('subscribe_email_placeholder', lang))}"
               class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary">
        <p id="subscribe-error" class="hidden text-sm text-red-600 dark:text-red-400 mt-2"></p>
        <button type="submit" id="subscribe-submit"
                class="w-full mt-3 px-3 py-2 text-sm font-medium rounded-lg bg-primary text-white hover:opacity-90 disabled:opacity-60">
          ${this.escapeHtml(t('subscribe_button', lang))}
        </button>
        <p class="text-xs text-gray-400 dark:text-gray-500 mt-3">🔒 ${this.escapeHtml(t('subscribe_privacy', lang))}</p>
      </form>`;

    this.card.querySelector('#subscribe-close').addEventListener('click', () => this.close());
    this.card.querySelector('#subscribe-form').addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit();
    });
  }

  renderSubscribedState() {
    const lang = this.lang;
    this.card.innerHTML = `
      ${this.headerHtml()}
      <div class="flex items-center gap-2 text-green-600 dark:text-green-400 mb-1">
        <span aria-hidden="true" class="text-xl">✓</span>
        <p class="text-sm font-medium">${this.escapeHtml(t('subscribe_already', lang))}</p>
      </div>
      <p class="text-xs text-gray-400 dark:text-gray-500 mt-3">🔒 ${this.escapeHtml(t('subscribe_privacy', lang))}</p>`;
    this.card.querySelector('#subscribe-close').addEventListener('click', () => this.close());
  }

  showError(msg) {
    if (!this.card) return;
    const el = this.card.querySelector('#subscribe-error');
    if (el) { el.textContent = msg; el.classList.remove('hidden'); }
  }

  clearError() {
    if (!this.card) return;
    const el = this.card.querySelector('#subscribe-error');
    if (el) { el.textContent = ''; el.classList.add('hidden'); }
  }

  async handleSubmit() {
    const input = this.card && this.card.querySelector('#subscribe-email');
    if (!input) return;
    const email = String(input.value || '').trim().toLowerCase();

    if (!SUBSCRIBE_EMAIL_RE.test(email) || email.length > 254) {
      this.showError(t('subscribe_invalid_email', this.lang));
      input.focus();
      return;
    }
    this.clearError();

    const data = {
      email,
      lang: (typeof appSettings !== 'undefined' && appSettings) ? appSettings.get('language') : this.lang,
      ua: (typeof navigator !== 'undefined' && navigator.userAgent) ? navigator.userAgent.slice(0, 180) : ''
    };

    const submitBtn = this.card.querySelector('#subscribe-submit');
    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = t('subscribe_sending', this.lang); }

    // Try a direct write; on ANY failure fall back to the local queue so the
    // submission is never lost. When Firebase is absent, queue immediately.
    if (this.firebaseReady()) {
      try {
        await this.writeToFirestore(data);
      } catch (e) {
        this.enqueue(data);
      }
    } else {
      this.enqueue(data);
      // Opportunistically start flushing in case Firebase arrives shortly.
      this.tryFlushWithRetry(15);
    }

    this.setFlag();
    this.renderCta();
    this.renderSuccess();
  }

  renderSuccess() {
    const lang = this.lang;
    this.card.innerHTML = `
      ${this.headerHtml()}
      <div class="flex items-center gap-2 text-green-600 dark:text-green-400 mb-1">
        <span aria-hidden="true" class="text-2xl">✓</span>
        <p class="text-sm font-medium">${this.escapeHtml(t('subscribe_success', lang))}</p>
      </div>
      <p class="text-xs text-gray-400 dark:text-gray-500 mt-3">🔒 ${this.escapeHtml(t('subscribe_privacy', lang))}</p>`;
    const closeBtn = this.card.querySelector('#subscribe-close');
    closeBtn.addEventListener('click', () => this.close());
    closeBtn.focus();
  }

  /* ----------------------------------------------------------- misc */

  applyLang() {
    this.renderCta();
    // Re-render an open modal in the new language, preserving its state.
    if (this._open && this.card) {
      if (this.subscribed) this.renderSubscribedState();
      else this.renderForm();
      const dir = (typeof isRTL === 'function' && isRTL(this.lang)) ? 'rtl' : 'ltr';
      if (this.modal) this.modal.dir = dir;
    }
  }

  escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
}

// Initialize when DOM is ready.
let subscribe;
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    subscribe = new Subscribe();
  });
}

// Export for node-based testing.
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Subscribe };
}
