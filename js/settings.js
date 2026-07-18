/**
 * Settings Module
 * Handles theme, language, and font size settings
 */

class Settings {
  constructor() {
    this.defaults = {
      theme: 'system',
      language: 'en',
      fontSize: 100,
      arabicFontSize: 100,
      showTransliteration: true,
      showTranslation: true,
      reciter: 'mishary'
    };

    this.settings = this.loadSettings();
    this.init();
  }

  init() {
    // One-time migration: clear WBW-language overrides saved before v41 — they
    // froze word-by-word meanings to English regardless of the UI language.
    // (Users can still pick an explicit override in the settings drawer.)
    try {
      if (!localStorage.getItem('wbwLangMigrated')) {
        if (this.settings.wbwLang != null) this.set('wbwLang', null);
        localStorage.setItem('wbwLangMigrated', '1');
      }
    } catch (e) { /* ignore */ }

    this.applyTheme();
    this.applyLanguage();
    this.applyFontSize();
    this.applyArabicFontSize();
    this.setupEventListeners();
  }

  /**
   * Load settings from localStorage
   * @returns {object}
   */
  loadSettings() {
    try {
      const saved = localStorage.getItem('quranAppSettings');
      return saved ? { ...this.defaults, ...JSON.parse(saved) } : { ...this.defaults };
    } catch (e) {
      return { ...this.defaults };
    }
  }

  /**
   * Save settings to localStorage
   */
  saveSettings() {
    try {
      localStorage.setItem('quranAppSettings', JSON.stringify(this.settings));
    } catch (e) {
      console.warn('Could not save settings to localStorage');
    }
  }

  /**
   * Get a setting value
   * @param {string} key
   * @returns {*}
   */
  get(key) {
    return this.settings[key];
  }

  /**
   * Set a setting value
   * @param {string} key
   * @param {*} value
   */
  set(key, value) {
    this.settings[key] = value;
    this.saveSettings();

    // Apply changes immediately
    switch (key) {
      case 'theme':
        this.applyTheme();
        break;
      case 'language':
        this.applyLanguage();
        break;
      case 'fontSize':
        this.applyFontSize();
        break;
      case 'arabicFontSize':
        this.applyArabicFontSize();
        break;
    }

    // Dispatch event for other modules
    window.dispatchEvent(new CustomEvent('settingChanged', {
      detail: { key, value }
    }));
  }

  /**
   * Apply theme setting
   */
  applyTheme() {
    const theme = this.settings.theme;
    const html = document.documentElement;

    if (theme === 'dark') {
      html.classList.add('dark');
    } else if (theme === 'light') {
      html.classList.remove('dark');
    } else {
      // System preference
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        html.classList.add('dark');
      } else {
        html.classList.remove('dark');
      }
    }

    // Update select element if exists
    const themeSelect = document.getElementById('theme-select');
    if (themeSelect) {
      themeSelect.value = theme;
    }
  }

  /**
   * Apply language setting
   */
  applyLanguage() {
    const lang = this.settings.language;

    // Apply translations using the translations module
    if (typeof applyTranslations === 'function') {
      applyTranslations(lang);
    }

    // Update Surah dropdown if exists
    if (typeof populateSurahDropdown === 'function') {
      populateSurahDropdown(lang);
    }

    // Update select element if exists
    const langSelect = document.getElementById('language-select');
    if (langSelect) {
      langSelect.value = lang;
    }
  }

  /**
   * Apply font size setting
   */
  /** Separate multiplier for Quranic Arabic text (.ayah-arabic) only. */
  applyArabicFontSize() {
    const v = this.settings.arabicFontSize || 100;
    document.documentElement.style.setProperty('--arabic-scale', v / 100);
    const disp = document.getElementById('sd-arabic-display');
    if (disp) disp.textContent = v + '%';
  }

  applyFontSize() {
    const scale = this.settings.fontSize / 100;
    // Scale the ROOT font size: every Tailwind class is rem-based, so this
    // resizes the ENTIRE app (all modules), not just the few elements that used
    // the old --font-scale variable. That variable is pinned to 1 so the
    // remaining calc() rules in style.css don't double-scale.
    document.documentElement.style.fontSize = (scale * 100) + '%';
    document.documentElement.style.setProperty('--font-scale', 1);

    // Font size is now controlled via the settings drawer (gear icon)
  }

  /**
   * Setup event listeners for settings controls
   */
  setupEventListeners() {
    // Language select
    const langSelect = document.getElementById('language-select');
    if (langSelect) {
      langSelect.value = this.settings.language;
      langSelect.addEventListener('change', (e) => {
        this.set('language', e.target.value);
      });
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (this.settings.theme === 'system') {
        this.applyTheme();
      }
    });
  }
}

// Initialize settings when DOM is ready
let appSettings;
document.addEventListener('DOMContentLoaded', () => {
  appSettings = new Settings();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Settings };
}
