/**
 * Tajweed Module
 * Renders color-coded tajweed text using the legacy app's per-surah data:
 *   resources/json/surah/{s}.json   — verse text (verse_{n} = ayah n)
 *   resources/json/tajweed/{s}.json — [{start, end, rule}] char ranges per verse
 * Colors follow the widely used mushaf/tajweed color conventions.
 */

const TAJWEED_RULES = {
  // Unpronounced / silent letters
  hamzat_wasl:           { color: '#AAAAAA', label: 'Hamzat al-Wasl' },
  silent:                { color: '#AAAAAA', label: 'Silent' },
  lam_shamsiyyah:        { color: '#AAAAAA', label: 'Lam Shamsiyyah' },
  // Prolongation (madd) family — blues, darker = longer/stronger
  madd_2:                { color: '#537FFF', label: 'Madd Tabee (2)' },
  madd_246:              { color: '#4050FF', label: 'Madd (2/4/6)' },
  madd_munfasil:         { color: '#2E5CFF', label: 'Madd Munfasil (4-5)' },
  madd_muttasil:         { color: '#2144C1', label: 'Madd Muttasil (4-5)' },
  madd_6:                { color: '#000EBC', label: 'Madd Lazim (6)' },
  // Echoing / nasalization
  qalqalah:              { color: '#DD0008', label: 'Qalqalah' },
  ghunnah:               { color: '#FF7E1E', label: 'Ghunnah' },
  // Noon sakinah & tanween rules
  ikhfa:                 { color: '#9400A8', label: 'Ikhfa' },
  ikhfa_shafawi:         { color: '#D500B7', label: 'Ikhfa Shafawi' },
  idghaam_ghunnah:       { color: '#169777', label: 'Idgham (Ghunnah)' },
  idghaam_no_ghunnah:    { color: '#169200', label: 'Idgham (no Ghunnah)' },
  idghaam_shafawi:       { color: '#58B800', label: 'Idgham Shafawi' },
  iqlab:                 { color: '#26BFFD', label: 'Iqlab' },
  idghaam_mutajanisayn:  { color: '#A52A2A', label: 'Idgham Mutajanisayn' },
  idghaam_mutaqaribayn:  { color: '#8B4513', label: 'Idgham Mutaqaribayn' }
};

const TajweedData = {
  _cache: {},

  /** Load text + rule annotations for one surah (cached promise; bundled in-project) */
  load(surah) {
    if (!this._cache[surah]) {
      this._cache[surah] = Promise.all([
        fetch(`data/quran-json/${surah}.json`).then(r => { if (!r.ok) throw new Error('no text'); return r.json(); }),
        fetch(`data/tajweed-json/${surah}.json`).then(r => { if (!r.ok) throw new Error('no rules'); return r.json(); })
      ]).then(([text, rules]) => ({ text: text.verse || {}, rules: rules.verse || {} }))
        .catch(err => { delete this._cache[surah]; throw err; });
    }
    return this._cache[surah];
  },

  /**
   * Colored HTML for one ayah, or null when unavailable.
   * Annotations are UTF-16 char ranges [start, end) over the verse string.
   */
  async renderAyah(surah, ayah) {
    const data = await this.load(surah);
    const text = data.text[`verse_${ayah}`];
    if (!text) return null;

    const anns = (data.rules[`verse_${ayah}`] || [])
      .slice()
      .sort((a, b) => a.start - b.start);

    let html = '';
    let cursor = 0;
    const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

    for (const ann of anns) {
      const start = Math.max(ann.start, cursor);
      const end = Math.min(ann.end, text.length);
      if (end <= start) continue;
      if (start > cursor) html += esc(text.slice(cursor, start));
      const rule = TAJWEED_RULES[ann.rule];
      html += rule
        ? `<span style="color:${rule.color}" title="${rule.label}">${esc(text.slice(start, end))}</span>`
        : esc(text.slice(start, end));
      cursor = end;
    }
    if (cursor < text.length) html += esc(text.slice(cursor));
    return html;
  },

  /** Legend of all rules as right-aligned chips with hover explanations */
  legendHtml(lang) {
    return `
      <div class="flex flex-wrap gap-x-4 gap-y-1.5 justify-end">
        ${Object.entries(TAJWEED_RULES).map(([key, rule]) => {
          const name = (typeof TAJWEED_LESSONS !== 'undefined' && TAJWEED_LESSONS[key] && TAJWEED_LESSONS[key].names && TAJWEED_LESSONS[key].names[lang]) || rule.label;
          return `
          <span class="relative group inline-flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-300 cursor-help" dir="auto">
            <span class="inline-block w-3 h-3 rounded-full" style="background:${rule.color}"></span>${name}
            <span class="hidden group-hover:block absolute bottom-full right-0 mb-1.5 w-60 p-2.5 rounded-lg
                         bg-gray-900 text-white text-xs leading-relaxed shadow-xl z-30 pointer-events-none" dir="auto">
              <span class="font-semibold" style="color:${rule.color === '#AAAAAA' ? '#ddd' : rule.color}">${name}</span><br>
              ${t('tjd_' + key, lang)}
            </span>
          </span>`; }).join('')}
      </div>
    `;
  }
};

/**
 * Sticky right-side tajweed guide, shown while tajweed mode is on.
 * Collapsible (state remembered); rule rows show hover explanations.
 */
const TajweedGuide = {
  el: null,

  get collapsed() {
    try { return localStorage.getItem('tajweedGuideCollapsed') === '1'; } catch (e) { return false; }
  },
  set collapsed(v) {
    try { localStorage.setItem('tajweedGuideCollapsed', v ? '1' : '0'); } catch (e) { /* ignore */ }
  },

  mount(lang) {
    if (!this.el) {
      this.el = document.createElement('div');
      this.el.id = 'tajweed-guide';
      // Side classes are set in render() (they depend on document dir);
      // max-lg:!hidden keeps it off small screens (it would overlay the reading column)
      this.el.className = 'fixed top-28 z-30 flex items-start max-lg:!hidden';
      document.body.appendChild(this.el);

      this.el.addEventListener('click', (e) => {
        if (e.target.closest('#tjg-collapse')) {
          this.collapsed = !this.collapsed;
          this.render(this._lang);
        }
      });
    }

    // Only meaningful on the reading tab — bind the tab listener exactly once
    if (!this._tabBound) {
      this._tabBound = true;
      window.addEventListener('tabChanged', (e) => {
        if (this.el) this.el.classList.toggle('hidden', e.detail.tabId !== 'reading');
      });
      // Language changes can flip document dir (ar/ur/fa → rtl): re-render to re-dock
      window.addEventListener('settingChanged', (e) => {
        if (e.detail.key === 'language' && this.el) { this._lang = e.detail.value; this.render(this._lang); }
      });
    }
    this._lang = lang;
    const activeTab = (typeof tabSystem !== 'undefined' && tabSystem) ? tabSystem.getActiveTab() : 'reading';
    this.el.classList.toggle('hidden', activeTab !== 'reading');
    this.render(lang);
  },

  unmount() {
    if (this.el) { this.el.remove(); this.el = null; }
  },

  render(lang) {
    if (!this.el) return;

    // Dock beside the sidebar: left edge in LTR, right edge in RTL (ar/ur/fa
    // flip document dir, so the desktop sidebar sits on the RIGHT).
    const rtl = document.documentElement.dir === 'rtl';
    const hidden = this.el.classList.contains('hidden');
    this.el.className = `fixed ${rtl ? 'right-0 lg:right-64' : 'left-0 lg:left-64'} top-28 z-30 flex items-start max-lg:!hidden${hidden ? ' hidden' : ''}`;
    const corner = rtl ? 'rounded-l-xl border-r-0' : 'rounded-r-xl border-l-0';
    const glyph = rtl ? '→' : '←';
    const peek = rtl ? 'hover:pr-3' : 'hover:pl-3';
    const tipSide = rtl ? 'right-full mr-2' : 'left-full ml-2';

    if (this.collapsed) {
      this.el.innerHTML = `
        <button id="tjg-collapse" title="${t('tajweed_label', lang)}"
                class="px-2 py-3 ${corner} bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700
                       text-lg ${peek} transition-all">🎨</button>`;
      return;
    }

    this.el.innerHTML = `
      <div class="w-56 max-w-[70vw] ${corner} bg-white dark:bg-gray-800 shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div class="flex items-center gap-2 px-3 py-2 border-b border-gray-200 dark:border-gray-700">
          <span class="text-sm font-semibold flex-1">🎨 ${t('tajweed_label', lang)}</span>
          <button id="tjg-collapse" class="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500" title="${t('hide_all', lang)}">${glyph}</button>
        </div>
        <div class="max-h-[62vh] overflow-y-auto px-2 py-2 space-y-0.5">
          ${Object.entries(TAJWEED_RULES).map(([key, rule]) => {
            const name = (typeof TAJWEED_LESSONS !== 'undefined' && TAJWEED_LESSONS[key] && TAJWEED_LESSONS[key].names && TAJWEED_LESSONS[key].names[lang]) || rule.label;
            return `
            <div class="relative group flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/60 cursor-help">
              <span class="inline-block w-3 h-3 rounded-full shrink-0" style="background:${rule.color}"></span>
              <span class="text-xs text-gray-700 dark:text-gray-200 leading-tight" dir="auto">${name}</span>
              <span class="hidden group-hover:block absolute ${tipSide} top-1/2 -translate-y-1/2 w-64 p-2.5 rounded-lg
                           bg-gray-900 text-white text-xs leading-relaxed shadow-xl z-40 pointer-events-none" dir="auto">
                <span class="font-semibold" style="color:${rule.color === '#AAAAAA' ? '#ddd' : rule.color}">${name}</span><br>
                ${t('tjd_' + key, lang)}
              </span>
            </div>`; }).join('')}
        </div>
      </div>
    `;
  }
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TAJWEED_RULES, TajweedData, TajweedGuide };
}
