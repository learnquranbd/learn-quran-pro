/**
 * PWA Support
 * - Registers the service worker (sw.js, at the app root) at app scope.
 * - Captures beforeinstallprompt and offers a small, dismissible install button
 *   injected next to #theme-toggle (settings-drawer injectButton pattern).
 * - Hides the button after install or dismissal (persisted in localStorage).
 *
 * All user-facing strings go through t(); constructor bails if its DOM hook is
 * absent so it never throws on pages without the header.
 */

class PWA {
  constructor() {
    this.deferredPrompt = null;
    this.button = null;

    this.registerServiceWorker();
    this.setupInstallFlow();
  }

  lang() {
    return (typeof appSettings !== 'undefined' && appSettings)
      ? appSettings.get('language')
      : 'en';
  }

  isDismissed() {
    try {
      return localStorage.getItem('pwaInstallDismissed') === '1';
    } catch (e) {
      return false;
    }
  }

  setDismissed() {
    try {
      localStorage.setItem('pwaInstallDismissed', '1');
    } catch (e) {
      /* ignore */
    }
  }

  registerServiceWorker() {
    if (!('serviceWorker' in navigator)) return;
    const secure = location.protocol === 'https:'
      || location.hostname === 'localhost'
      || location.hostname === '127.0.0.1';
    if (!secure) return;

    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js', { scope: './' })
        .catch((e) => console.warn('SW registration failed', e));
    });
  }

  setupInstallFlow() {
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent the default mini-infobar so we can show our own button.
      e.preventDefault();
      this.deferredPrompt = e;
      if (!this.isDismissed()) this.injectButton();
    });

    window.addEventListener('appinstalled', () => {
      this.setDismissed();
      this.removeButton();
      this.deferredPrompt = null;
    });

    // Re-label on language change.
    window.addEventListener('settingChanged', (e) => {
      if (e.detail && e.detail.key === 'language') this.updateLabels();
    });
  }

  injectButton() {
    if (this.button || this.isDismissed()) return;
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    const lang = this.lang();

    const wrap = document.createElement('span');
    wrap.id = 'pwa-install';
    wrap.className = 'flex items-center gap-1 ml-1';

    const install = document.createElement('button');
    install.id = 'pwa-install-btn';
    install.className = 'flex items-center gap-1 px-2 py-1 text-sm rounded-md bg-white/15 hover:bg-white/25 text-white';
    install.setAttribute('title', t('install_app', lang));
    install.innerHTML = `
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3"/>
      </svg>
      <span data-pwa-label>${t('install_app', lang)}</span>`;
    install.addEventListener('click', () => this.promptInstall());

    const dismiss = document.createElement('button');
    dismiss.id = 'pwa-dismiss-btn';
    dismiss.className = 'p-1 rounded-md hover:bg-white/10 text-white/80';
    dismiss.setAttribute('title', t('dismiss', lang));
    dismiss.setAttribute('aria-label', t('dismiss', lang));
    dismiss.innerHTML = '✕';
    dismiss.addEventListener('click', () => {
      this.setDismissed();
      this.removeButton();
    });

    wrap.appendChild(install);
    wrap.appendChild(dismiss);
    themeToggle.parentElement.appendChild(wrap);
    this.button = wrap;
  }

  removeButton() {
    if (this.button && this.button.parentElement) {
      this.button.parentElement.removeChild(this.button);
    }
    this.button = null;
  }

  updateLabels() {
    if (!this.button) return;
    const lang = this.lang();
    const label = this.button.querySelector('[data-pwa-label]');
    if (label) label.textContent = t('install_app', lang);
    const install = this.button.querySelector('#pwa-install-btn');
    if (install) install.setAttribute('title', t('install_app', lang));
    const dismiss = this.button.querySelector('#pwa-dismiss-btn');
    if (dismiss) {
      dismiss.setAttribute('title', t('dismiss', lang));
      dismiss.setAttribute('aria-label', t('dismiss', lang));
    }
  }

  async promptInstall() {
    if (!this.deferredPrompt) return;
    const prompt = this.deferredPrompt;
    this.deferredPrompt = null;
    try {
      prompt.prompt();
      const choice = await prompt.userChoice;
      // A choice was made and the browser consumed the prompt event; either way
      // it cannot be shown again this session, so retire the button.
      this.removeButton();
    } catch (e) {
      /* ignore */
    }
  }
}

let pwa;
document.addEventListener('DOMContentLoaded', () => {
  pwa = new PWA();
});
