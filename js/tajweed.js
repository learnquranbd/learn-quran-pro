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

/**
 * Tap-to-toggle rule explanations (touch devices have no hover):
 * every legend chip / guide row carries `.tj-item`, its explanation `.tj-tip`.
 * A single delegated click toggles `tj-open` on the tapped item, closes any
 * other open one, and a tap elsewhere closes all. Hover behavior is untouched.
 */
if (typeof document !== 'undefined') (function () {
  const style = document.createElement('style');
  style.textContent = '.tj-item.tj-open .tj-tip{display:block}';
  document.head.appendChild(style);
  document.addEventListener('click', (e) => {
    // Panel chrome (collapse arrow, mobile pill / close) must not toggle tips
    if (e.target.closest('.tjg-toggle, #tjg-m-open, #tjg-m-close')) return;
    const item = e.target.closest('.tj-item');
    document.querySelectorAll('.tj-item.tj-open').forEach(el => {
      if (el !== item) el.classList.remove('tj-open');
    });
    if (item) item.classList.toggle('tj-open');
  });
})();

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
        ? `<span class="tj-seg cursor-pointer" style="color:${rule.color}" title="${rule.label}" data-tj-rule="${ann.rule}">${esc(text.slice(start, end))}</span>`
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
          <span class="tj-item relative group inline-flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-300 cursor-help" dir="auto">
            <span class="inline-block w-3 h-3 rounded-full" style="background:${rule.color}"></span>${name}
            <span class="tj-tip hidden group-hover:block absolute bottom-full right-0 mb-1.5 w-60 p-2.5 rounded-lg
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
 * Off-canvas tajweed rules guide, shown while tajweed mode is on.
 * Desktop (lg+): slide-in drawer docked to the inner screen edge (right in LTR,
 * left in RTL) with an always-visible handle tab; open/closed remembered.
 * Mobile (<lg): floating 🎨 pill opening a bottom sheet. Rows show explanations.
 */
const TajweedGuide = {
  el: null,   // desktop fixed side panel (lg+)
  mel: null,  // mobile pill + bottom-sheet (below lg)

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
        if (e.target.closest('.tjg-toggle')) {
          this.collapsed = !this.collapsed;
          this.render(this._lang);
        }
      });
    }

    if (!this.mel) {
      // Below lg the fixed panel is hidden, so give small screens a floating
      // 🎨 pill (bottom-LEFT — the Go-to-Top button owns bottom-right) that
      // opens the same rule list as a bottom sheet.
      this.mel = document.createElement('div');
      this.mel.id = 'tajweed-guide-m';
      this.mel.className = 'lg:hidden';
      document.body.appendChild(this.mel);

      this.mel.addEventListener('click', (e) => {
        if (e.target.closest('#tjg-m-open')) this.toggleSheet(true);
        else if (e.target.closest('#tjg-m-close') || e.target.closest('#tjg-m-overlay')) this.toggleSheet(false);
      });
    }

    // Only meaningful on the reading tab — bind the tab listener exactly once
    if (!this._tabBound) {
      this._tabBound = true;
      window.addEventListener('tabChanged', (e) => {
        const off = e.detail.tabId !== 'reading';
        if (this.el) this.el.classList.toggle('hidden', off);
        if (this.mel) { this.mel.classList.toggle('hidden', off); if (off) this.toggleSheet(false); }
      });
      // Language changes can flip document dir (ar/ur/fa → rtl): re-render to re-dock
      window.addEventListener('settingChanged', (e) => {
        if (e.detail.key === 'language' && this.el) { this._lang = e.detail.value; this.render(this._lang); }
      });
    }
    this._lang = lang;
    const activeTab = (typeof tabSystem !== 'undefined' && tabSystem) ? tabSystem.getActiveTab() : 'reading';
    this.el.classList.toggle('hidden', activeTab !== 'reading');
    this.mel.classList.toggle('hidden', activeTab !== 'reading');
    this.render(lang);
  },

  unmount() {
    if (this.el) { this.el.remove(); this.el = null; }
    if (this.mel) { this.mel.remove(); this.mel = null; }
    if (this._mUnbind) { this._mUnbind(); this._mUnbind = null; }
  },

  /**
   * One rule row per tajweed rule (shared by desktop panel and mobile sheet).
   * `tipSide` set (e.g. 'left-full ml-2') → hover/tap tooltip floating beside
   * the row; null → tap-only explanation expanding inline below the row
   * (absolute tips would be clipped by the sheet's overflow scroll).
   */
  _rowsHtml(lang, tipSide) {
    return Object.entries(TAJWEED_RULES).map(([key, rule]) => {
      const name = (typeof TAJWEED_LESSONS !== 'undefined' && TAJWEED_LESSONS[key] && TAJWEED_LESSONS[key].names && TAJWEED_LESSONS[key].names[lang]) || rule.label;
      const nameColor = rule.color === '#AAAAAA' ? '#ddd' : rule.color;
      const tip = tipSide
        ? `<span class="tj-tip hidden group-hover:block absolute ${tipSide} top-1/2 -translate-y-1/2 w-64 p-2.5 rounded-lg
                        bg-gray-900 text-white text-xs leading-relaxed shadow-xl z-40 pointer-events-none" dir="auto">
             <span class="font-semibold" style="color:${nameColor}">${name}</span><br>
             ${t('tjd_' + key, lang)}
           </span>`
        : `<span class="tj-tip hidden basis-full ps-5 pb-1 text-xs text-gray-500 dark:text-gray-400 leading-relaxed" dir="auto">
             ${t('tjd_' + key, lang)}
           </span>`;
      return `
        <div class="tj-item relative group flex ${tipSide ? 'items-center' : 'flex-wrap items-center cursor-pointer'} gap-2 px-2 py-1 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/60${tipSide ? ' cursor-help' : ''}">
          <span class="inline-block w-3 h-3 rounded-full shrink-0" style="background:${rule.color}"></span>
          <span class="text-xs text-gray-700 dark:text-gray-200 leading-tight" dir="auto">${name}</span>
          ${tip}
        </div>`;
    }).join('');
  },

  /** Open/close the small-screen bottom sheet */
  toggleSheet(open) {
    if (!this.mel) return;
    const ov = this.mel.querySelector('#tjg-m-overlay');
    const sheet = this.mel.querySelector('#tjg-m-sheet');
    if (!ov || !sheet) return;
    ov.classList.toggle('hidden', !open);
    sheet.classList.toggle('hidden', !open);
    sheet.classList.toggle('flex', open);
    if (!open) sheet.querySelectorAll('.tj-item.tj-open').forEach(el => el.classList.remove('tj-open'));
  },

  renderMobile(lang) {
    if (!this.mel) return;
    if (this._mUnbind) { this._mUnbind(); this._mUnbind = null; }
    this.mel.innerHTML = `
      <button id="tjg-m-open" title="${t('tajweed_label', lang)}" aria-label="${t('tajweed_label', lang)}"
              class="fixed bottom-6 left-6 z-40 w-11 h-11 rounded-full bg-white dark:bg-gray-800 shadow-lg
                     border border-gray-200 dark:border-gray-700 text-lg flex items-center justify-center">🎨</button>
      <div id="tjg-m-overlay" class="hidden fixed inset-0 z-40 bg-black/40"></div>
      <div id="tjg-m-sheet" class="hidden fixed inset-x-0 bottom-0 z-50 flex-col max-h-[60vh] rounded-t-2xl
                                   bg-white dark:bg-gray-800 shadow-2xl border-t border-gray-200 dark:border-gray-700">
        <div class="flex items-center gap-2 px-4 py-3 border-b border-gray-200 dark:border-gray-700 shrink-0">
          <span class="text-sm font-semibold flex-1">🎨 ${t('tajweed_label', lang)}</span>
          <button id="tjg-m-close" class="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500"
                  title="${t('hide_all', lang)}" aria-label="${t('hide_all', lang)}">✕</button>
        </div>
        <div class="overflow-y-auto px-2 py-2 space-y-0.5">
          ${this._rowsHtml(lang, null)}
        </div>
      </div>
    `;
    if (window.escClose) this._mUnbind = window.escClose(this.mel.querySelector('#tjg-m-overlay'), () => this.toggleSheet(false));
  },

  render(lang) {
    if (!this.el) return;
    this.renderMobile(lang);

    // Off-canvas drawer anchored to the inner screen edge (right in LTR, left in
    // RTL — ar/ur/fa flip document dir). It slides fully off that edge when
    // closed, leaving only the handle tab; the whole panel stays mounted so the
    // translate-x transition can animate it in and out.
    const rtl = document.documentElement.dir === 'rtl';
    const hidden = this.el.classList.contains('hidden');
    const open = !this.collapsed;
    const edge = rtl ? 'left-0' : 'right-0';
    const closedShift = rtl ? '-translate-x-72' : 'translate-x-72'; // = panel w-72
    this.el.className = `fixed ${edge} top-28 z-40 flex items-start max-lg:!hidden `
      + `transition-transform duration-300 ease-in-out `
      + `${open ? 'translate-x-0' : closedShift}${hidden ? ' hidden' : ''}`;

    // Tooltip floats into the open space beside the drawer (toward screen centre).
    const tipSide = rtl ? 'left-full ml-2' : 'right-full mr-2';
    const handleRound = rtl ? 'rounded-r-xl' : 'rounded-l-xl';
    const handleBorder = rtl ? 'border-l-0' : 'border-r-0';
    const panelRound = rtl ? 'rounded-r-none' : 'rounded-l-none';
    const panelBorder = rtl ? 'border-r-0' : 'border-l-0';
    // Chevron points the way a click will move the drawer.
    const glyph = open ? (rtl ? '‹' : '›') : (rtl ? '›' : '‹');

    const handle = `
      <button title="${t('tajweed_label', lang)}" aria-label="${t('tajweed_label', lang)}"
              class="tjg-toggle self-start mt-2 flex flex-col items-center gap-1 px-1.5 py-3 ${handleRound} ${handleBorder}
                     bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700
                     text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
        <span class="text-base leading-none">🎨</span>
        <span class="text-xs leading-none">${glyph}</span>
      </button>`;

    const panel = `
      <div class="w-72 max-w-[80vw] ${panelRound} ${panelBorder} bg-white dark:bg-gray-800 shadow-2xl
                  border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div class="flex items-center gap-2 px-3 py-2 border-b border-gray-200 dark:border-gray-700">
          <span class="text-sm font-semibold flex-1">🎨 ${t('tajweed_label', lang)}</span>
          <button class="tjg-toggle p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500"
                  title="${t('hide_all', lang)}" aria-label="${t('hide_all', lang)}">✕</button>
        </div>
        <div class="max-h-[70vh] overflow-y-auto px-2 py-2 space-y-0.5">
          ${this._rowsHtml(lang, tipSide)}
        </div>
      </div>`;

    // Handle sits on the inner side of the panel: after it in LTR, before in RTL.
    this.el.innerHTML = rtl ? panel + handle : handle + panel;
  }
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TAJWEED_RULES, TajweedData, TajweedGuide };
}
