/**
 * Reading Settings Drawer (quranmazid-style)
 * Right slide-in panel consolidating reading controls:
 * display toggles, translation source, word-by-word language, font, theme.
 * Fully self-contained: injects its own gear button and drawer DOM.
 */

class SettingsDrawer {
  constructor() {
    this.language = (typeof appSettings !== 'undefined' && appSettings) ? appSettings.get('language') : 'en';
    this._translationLists = {}; // lang -> [{id, name}] from quran.com

    this.injectButton();
    this.createDrawer();
    this.applyTypography();   // restore persisted translation size / Arabic line spacing
    this.restoreReciter();    // mirror persisted reciter into the audio-tab <select>

    window.addEventListener('settingChanged', (e) => {
      if (e.detail.key === 'language') {
        this.language = e.detail.value;
        if (!this.drawer.classList.contains('translate-x-full')) this.render();
      }
    });

    // Keep toggle states fresh whenever new ayahs render
    window.addEventListener('ayahsLoaded', () => {
      if (!this.drawer.classList.contains('translate-x-full')) this.render();
      this.applyTextVisibility();
    });
  }

  injectButton() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    const btn = document.createElement('button');
    btn.id = 'settings-drawer-btn';
    btn.className = 'p-2 hover:bg-white/10 rounded-lg';
    btn.setAttribute('aria-label', t('reading_settings', this.language) || 'Settings');
    btn.setAttribute('title', t('reading_settings', this.language) || 'Settings');
    btn.innerHTML = `
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
      </svg>`;
    themeToggle.parentElement.appendChild(btn);
    btn.addEventListener('click', () => this.open());
  }

  createDrawer() {
    this.overlay = document.createElement('div');
    this.overlay.className = 'fixed inset-0 bg-black/40 z-50 hidden';
    this.overlay.addEventListener('click', () => this.close());
    document.body.appendChild(this.overlay);
    if (window.escClose) window.escClose(this.overlay, () => this.close());

    this.drawer = document.createElement('aside');
    this.drawer.id = 'settings-drawer';
    this.drawer.className =
      'fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-white dark:bg-gray-800 shadow-2xl z-50 ' +
      'transform translate-x-full transition-transform duration-300 overflow-y-auto';
    document.body.appendChild(this.drawer);

    this.drawer.addEventListener('click', (e) => {
      if (e.target.closest('#sd-close')) return this.close();

      // Reset-to-defaults: two-step, in-drawer confirm (no native confirm())
      if (e.target.closest('#sd-reset')) {
        this.drawer.querySelector('#sd-reset')?.classList.add('hidden');
        this.drawer.querySelector('#sd-reset-confirm')?.classList.remove('hidden');
        return;
      }
      if (e.target.closest('#sd-reset-no')) {
        this.drawer.querySelector('#sd-reset-confirm')?.classList.add('hidden');
        this.drawer.querySelector('#sd-reset')?.classList.remove('hidden');
        return;
      }
      if (e.target.closest('#sd-reset-yes')) return this.resetDefaults();

      const theme = e.target.closest('[data-sd-theme]');
      if (theme) appSettings.set('theme', theme.getAttribute('data-sd-theme'));
      if (e.target.closest('#sd-font-dec')) appSettings.set('fontSize', Math.max(70, appSettings.get('fontSize') - 10));
      if (e.target.closest('#sd-font-inc')) appSettings.set('fontSize', Math.min(200, appSettings.get('fontSize') + 10));
      if (e.target.closest('#sd-ar-dec')) appSettings.set('arabicFontSize', Math.max(70, (appSettings.get('arabicFontSize') || 100) - 10));
      if (e.target.closest('#sd-ar-inc')) appSettings.set('arabicFontSize', Math.min(250, (appSettings.get('arabicFontSize') || 100) + 10));
      if (e.target.closest('#sd-tr-dec')) { appSettings.set('translationFontSize', Math.max(70, (appSettings.get('translationFontSize') || 100) - 10)); this.applyTypography(); }
      if (e.target.closest('#sd-tr-inc')) { appSettings.set('translationFontSize', Math.min(200, (appSettings.get('translationFontSize') || 100) + 10)); this.applyTypography(); }
      if (theme || e.target.closest('#sd-font-dec') || e.target.closest('#sd-font-inc')
          || e.target.closest('#sd-ar-dec') || e.target.closest('#sd-ar-inc')
          || e.target.closest('#sd-tr-dec') || e.target.closest('#sd-tr-inc')) this.render();
    });

    this.drawer.addEventListener('change', (e) => this.onChange(e));
    this.drawer.addEventListener('input', (e) => this.onInput(e));
  }

  open() { this.overlay.classList.remove('hidden'); this.drawer.classList.remove('translate-x-full'); this.render(); }
  close() { this.overlay.classList.add('hidden'); this.drawer.classList.add('translate-x-full'); }

  /* ---------- data ---------- */

  async translationsFor(lang) {
    if (!this._translationLists[lang]) {
      const names = { en: 'english', bn: 'bengali', fr: 'french', id: 'indonesian', ur: 'urdu', tr: 'turkish', ar: 'arabic',
        es: 'spanish', ru: 'russian', fa: 'persian', hi: 'hindi', de: 'german', ms: 'malay', zh: 'chinese', ja: 'japanese' };
      this._translationLists[lang] = fetch(`${QuranData.apiBase}/resources/translations?language=${lang}`)
        .then(r => r.json())
        .then(d => (d.translations || [])
          .filter(x => (x.language_name || '').toLowerCase() === names[lang])
          .map(x => ({ id: x.id, name: x.name })))
        .catch(() => { delete this._translationLists[lang]; return []; });
    }
    return this._translationLists[lang];
  }

  /**
   * Translate with a graceful English fallback. t() returns the raw key when a
   * translation is missing, so plain `t(k) || fallback` never fires — this
   * substitutes `fallback` until the new keys land in js/translations.js.
   */
  tr(key, fallback) {
    const v = t(key, this.language);
    return (v && v !== key) ? v : fallback;
  }

  /** Options for the reciter <select>, mirrored from the audio tab's #reciter-select. */
  reciterOptions() {
    const cur = appSettings.get('reciter') || 'mishary';
    const real = document.getElementById('reciter-select');
    let opts = [{ value: 'mishary', label: 'Mishary Rashid Alafasy' }];
    if (real && real.options.length) {
      opts = Array.from(real.options).map(o => ({ value: o.value, label: o.textContent }));
    }
    return opts.map(o => `<option value="${o.value}" ${o.value === cur ? 'selected' : ''}>${o.label}</option>`).join('');
  }

  /* ---------- typography (persisted CSS variables) ---------- */

  /** Inject the one-time rule that binds Arabic line spacing to a CSS variable. */
  ensureLineHeightStyle() {
    if (document.getElementById('sd-typography-style')) return;
    const s = document.createElement('style');
    s.id = 'sd-typography-style';
    s.textContent = '.ayah-arabic, .arabic-text { line-height: var(--arabic-line-height, 2.4) !important; }';
    document.head.appendChild(s);
  }

  /**
   * Apply persisted translation font-size (--translation-font-size, already used
   * by css/style.css) and Arabic line spacing (--arabic-line-height, our var).
   * Only set when the user has customised them so mobile CSS defaults survive.
   */
  applyTypography() {
    const tfs = appSettings.get('translationFontSize');
    if (tfs) document.documentElement.style.setProperty('--translation-font-size', (tfs / 100) + 'rem');
    else document.documentElement.style.removeProperty('--translation-font-size');

    const lh = appSettings.get('arabicLineHeight');
    if (lh) { document.documentElement.style.setProperty('--arabic-line-height', lh); this.ensureLineHeightStyle(); }
    else document.documentElement.style.removeProperty('--arabic-line-height');
  }

  /** Restore the persisted reciter into the audio tab's <select> (audio.js reads it at play time). */
  restoreReciter() {
    const persisted = appSettings.get('reciter');
    const real = document.getElementById('reciter-select');
    if (real && persisted && real.value !== persisted) real.value = persisted;
  }

  /* ---------- rendering ---------- */

  toggleRow(id, label, checked) {
    return `
      <label class="flex items-center justify-between py-2 cursor-pointer">
        <span class="text-sm text-gray-700 dark:text-gray-200">${label}</span>
        <input type="checkbox" data-sd-toggle="${id}" ${checked ? 'checked' : ''}
               class="w-9 h-5 appearance-none rounded-full bg-gray-300 dark:bg-gray-600 checked:bg-primary relative transition-colors
                      before:content-[''] before:absolute before:top-0.5 before:left-0.5 before:w-4 before:h-4 before:rounded-full
                      before:bg-white before:transition-transform checked:before:translate-x-4 cursor-pointer">
      </label>`;
  }

  sectionHead(text) {
    return `<h4 class="text-xs uppercase font-semibold text-gray-400 dark:text-gray-500 mt-5 mb-1">${text}</h4>`;
  }

  async render() {
    const lang = this.language;
    const app = (typeof quranApp !== 'undefined') ? quranApp : null;
    const showTranslit = appSettings.get('showTransliteration') !== false;
    const showTranslation = appSettings.get('showTranslation') !== false;
    const theme = appSettings.get('theme');

    this.drawer.innerHTML = `
      <div class="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
        <h3 class="font-bold">⚙️ ${t('reading_settings', lang)}</h3>
        <button id="sd-close" aria-label="${t('close', lang) || 'Close'}" class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-500">✕</button>
      </div>
      <div class="px-5 pb-8">
        ${this.sectionHead(t('display', lang))}
        ${this.toggleRow('wbw', '🔤 ' + t('word_by_word', lang), app ? app.globalWbw : true)}
        ${app && app.tajweedAvailable ? this.toggleRow('tajweed', '🎨 ' + t('tajweed_label', lang), app.globalTajweed) : ''}
        ${this.toggleRow('tafsir', '📖 ' + t('tafseer', lang), app ? app.globalTafsir : false)}
        ${this.toggleRow('grammar', '🧩 ' + t('grammar', lang), app ? app.globalGrammar : false)}
        ${this.toggleRow('translit', 'Aa ' + t('transliteration', lang), showTranslit)}
        ${this.toggleRow('translation', '🌐 ' + t('translation', lang), showTranslation)}
        ${this.toggleRow('wordtaprepeat', '🔁 ' + t('word_tap_repeat', lang), appSettings.get('wordTapRepeat') !== false)}

        ${this.sectionHead(t('translation_source', lang))}
        <select data-sd-select="translation" class="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700">
          <option value="">${t('loading', lang)}</option>
        </select>

        ${this.sectionHead(t('wbw_language', lang))}
        <select data-sd-select="wbwlang" class="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700">
          <option value="">${t('follow_app_language', lang)}</option>
          ${QuranData.WBW_LANGS.map(l => `<option value="${l}" ${appSettings.get('wbwLang') === l ? 'selected' : ''}>${l}</option>`).join('')}
        </select>

        ${this.sectionHead(t('font_size', lang))}
        <div class="flex items-center gap-3">
          <button id="sd-font-dec" class="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">A-</button>
          <span class="flex-1 text-center text-sm">${appSettings.get('fontSize')}%</span>
          <button id="sd-font-inc" class="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">A+</button>
        </div>

        ${this.sectionHead(t('arabic_font_size', lang))}
        <div class="flex items-center gap-3">
          <button id="sd-ar-dec" class="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 ayah-arabic !text-base">ا-</button>
          <span id="sd-arabic-display" class="flex-1 text-center text-sm">${appSettings.get('arabicFontSize') || 100}%</span>
          <button id="sd-ar-inc" class="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 ayah-arabic !text-base">ا+</button>
        </div>

        ${this.sectionHead(this.tr('translation_font_size', 'Translation size'))}
        <div class="flex items-center gap-3">
          <button id="sd-tr-dec" class="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">A-</button>
          <span class="flex-1 text-center text-sm">${appSettings.get('translationFontSize') || 100}%</span>
          <button id="sd-tr-inc" class="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">A+</button>
        </div>

        ${this.sectionHead(this.tr('arabic_line_spacing', 'Arabic line spacing'))}
        <div class="flex items-center gap-3">
          <span class="text-xs text-gray-400">${this.tr('tight', 'Tight')}</span>
          <input type="range" data-sd-range="lineheight" min="18" max="34" step="1"
                 value="${Math.round((appSettings.get('arabicLineHeight') || 2.4) * 10)}"
                 class="flex-1 accent-primary cursor-pointer">
          <span id="sd-lh-display" class="text-xs text-gray-400 w-6 text-right">${(appSettings.get('arabicLineHeight') || 2.4).toFixed(1)}</span>
        </div>

        ${this.sectionHead(t('audio', lang))}
        <select data-sd-select="reciter" class="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700">
          ${this.reciterOptions()}
        </select>

        ${this.sectionHead(t('theme', lang))}
        <div class="grid grid-cols-3 gap-2">
          ${['light', 'dark', 'system'].map(v => `
            <button data-sd-theme="${v}"
                    class="px-3 py-2 text-sm rounded-lg border ${theme === v
                      ? 'border-primary bg-primary/10 text-primary dark:text-blue-300 font-medium'
                      : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}">
              ${t(v, lang)}
            </button>`).join('')}
        </div>

        <div class="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button id="sd-reset" class="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
            ↺ ${this.tr('reset_defaults', 'Reset to defaults')}
          </button>
          <div id="sd-reset-confirm" class="hidden mt-2 p-3 rounded-lg border border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
            <p class="text-sm text-gray-700 dark:text-gray-200 mb-2">${this.tr('reset_confirm', 'Reset all reading settings to their defaults?')}</p>
            <div class="flex gap-2">
              <button id="sd-reset-yes" class="flex-1 px-3 py-1.5 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700">${this.tr('reset_defaults', 'Reset to defaults')}</button>
              <button id="sd-reset-no" class="flex-1 px-3 py-1.5 text-sm rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">${this.tr('cancel', 'Cancel')}</button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Populate translation sources asynchronously
    const list = await this.translationsFor(lang);
    if (lang !== this.language) return; // stale render: language changed while awaiting
    const sel = this.drawer.querySelector('[data-sd-select="translation"]');
    if (sel && list.length) {
      const current = appSettings.get('trId_' + lang) || QuranData.TRANSLATION_IDS[lang];
      sel.innerHTML = list.map(x =>
        `<option value="${x.id}" ${x.id === current ? 'selected' : ''}>${x.name}</option>`).join('');
    } else if (sel) {
      sel.innerHTML = `<option value="">—</option>`;
    }
  }

  /* ---------- behavior ---------- */

  onChange(e) {
    const app = (typeof quranApp !== 'undefined') ? quranApp : null;
    const toggle = e.target.closest('[data-sd-toggle]');
    if (toggle) {
      const id = toggle.getAttribute('data-sd-toggle');
      if (['wbw', 'tafsir', 'grammar', 'tajweed'].includes(id)) {
        if (app) app.applyGlobalToggle(id);   // these need the reading app
      } else if (id === 'translit') {
        appSettings.set('showTransliteration', toggle.checked);
        this.applyTextVisibility();
      } else if (id === 'translation') {
        appSettings.set('showTranslation', toggle.checked);
        this.applyTextVisibility();
      } else if (id === 'wordtaprepeat') {
        appSettings.set('wordTapRepeat', toggle.checked);
      }
      return;
    }

    const select = e.target.closest('[data-sd-select]');
    if (!select) return;
    const kind = select.getAttribute('data-sd-select');
    if (kind === 'translation') {
      appSettings.set('trId_' + this.language, parseInt(select.value) || null);
      QuranData._verseCache = {}; QuranData._pageCache = {};
      if (app && app.ayahData.length) { app.pendingContext = app.collectionContext; app.loadAyahs(); }
    } else if (kind === 'wbwlang') {
      appSettings.set('wbwLang', select.value || null);
      QuranData._verseCache = {}; QuranData._pageCache = {};
      if (app && app.ayahData.length) { app.pendingContext = app.collectionContext; app.loadAyahs(); }
    } else if (kind === 'reciter') {
      appSettings.set('reciter', select.value);
      const real = document.getElementById('reciter-select');
      if (real) { real.value = select.value; real.dispatchEvent(new Event('change')); }
    }
  }

  /** Live-drag handler for the Arabic line-spacing range slider. */
  onInput(e) {
    const range = e.target.closest('[data-sd-range]');
    if (!range || range.getAttribute('data-sd-range') !== 'lineheight') return;
    const lh = parseInt(range.value, 10) / 10;
    appSettings.set('arabicLineHeight', lh);
    document.documentElement.style.setProperty('--arabic-line-height', lh);
    this.ensureLineHeightStyle();
    const disp = this.drawer.querySelector('#sd-lh-display');
    if (disp) disp.textContent = lh.toFixed(1);
  }

  /** Restore every drawer-owned setting to its default (called after in-drawer confirm). */
  resetDefaults() {
    const app = (typeof quranApp !== 'undefined') ? quranApp : null;
    const lang = this.language;

    appSettings.set('theme', 'system');
    appSettings.set('fontSize', 100);
    appSettings.set('arabicFontSize', 100);
    appSettings.set('showTransliteration', true);
    appSettings.set('showTranslation', true);
    appSettings.set('reciter', 'mishary');
    appSettings.set('translationFontSize', null);
    appSettings.set('arabicLineHeight', null);
    appSettings.set('wbwLang', null);
    appSettings.set('trId_' + lang, null);
    appSettings.set('showWbw', true);

    this.applyTypography();       // clears the custom CSS variables
    this.applyTextVisibility();   // re-shows translit / translation lines

    const real = document.getElementById('reciter-select');
    if (real) real.value = 'mishary';

    if (app) {
      app.globalWbw = true;
      app.globalTafsir = false;
      app.globalGrammar = false;
      if (app.globalTajweed && typeof TajweedGuide !== 'undefined') TajweedGuide.unmount();
      app.globalTajweed = false;
      QuranData._verseCache = {}; QuranData._pageCache = {};
      if (app.ayahData.length) { app.pendingContext = app.collectionContext; app.loadAyahs(); }
    }

    this.render();
  }

  /** Show/hide transliteration and translation lines across the reading view */
  applyTextVisibility() {
    const showTranslit = appSettings.get('showTransliteration') !== false;
    const showTranslation = appSettings.get('showTranslation') !== false;
    document.querySelectorAll('.ayah-translit').forEach(el => el.classList.toggle('hidden', !showTranslit));
    document.querySelectorAll('.ayah-translation').forEach(el => el.classList.toggle('hidden', !showTranslation));
  }
}

// Initialize when DOM is ready
let settingsDrawer;
document.addEventListener('DOMContentLoaded', () => {
  settingsDrawer = new SettingsDrawer();
});
