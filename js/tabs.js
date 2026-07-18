/**
 * Tab System Module
 * Handles tab navigation and content switching
 */

// Per-module headline (emoji + i18n title key) shown at the top of the content
// area so users always know which module — or sub-module — they're viewing,
// even in deep sub-views (e.g. an in-progress quiz) that have no active top tab.
const TAB_META = {
  reading:      { emoji: '📖', key: 'ayah_reading' },
  search:       { emoji: '🔍', key: 'search' },
  tafseer:      { emoji: '📚', key: 'tafseers' },
  wordbyword:   { emoji: '🔤', key: 'word_by_word' },
  grammar:      { emoji: '🧩', key: 'grammar' },
  tajweedreading: { emoji: '🎨', key: 'tajweed_label' },
  learn:        { emoji: '🎓', key: 'learn' },
  memorize:     { emoji: '🎙️', key: 'memorize' },
  quiz:         { emoji: '❓', key: 'quiz_center_title' },
  audio:        { emoji: '🎧', key: 'audio' },
  mushaf:       { emoji: '📗', key: 'mushaf' },
  topics:       { emoji: '🗂️', key: 'topics_title' },
  wordrepeat:   { emoji: '🔁', key: 'wr_title' },
  sarf:         { emoji: '🧬', key: 'sarf_title' },
  amal:         { emoji: '📿', key: 'amal_title' },
  khatmah:      { emoji: '📅', key: 'khatmah_title' },
  tajweedlearn: { emoji: '🎨', key: 'tj_learn_title' },
  resources:    { emoji: '🔗', key: 'resources_title' },
  mutashabihat: { emoji: '🪞', key: 'mutashabihat_title' },
  quranicarabic: { emoji: '🔤', key: 'qa_title' },
  seerah:       { emoji: '🌙', key: 'seerah_title' },
  whyislam:     { emoji: '💡', key: 'whyislam_title' },
  prophets:     { emoji: '📜', key: 'prophets_title' },
  nuzul:        { emoji: '🌅', key: 'nuzul_title' }
};

class TabSystem {
  constructor() {
    this.tabNav = document.getElementById('tabs-nav');
    this.tabContent = document.getElementById('tab-content');
    this.activeTab = 'reading';
    this.tabHandlers = {};

    this.init();
  }

  init() {
    if (!this.tabNav) return;

    // Add click handlers to all tab buttons
    const tabButtons = this.tabNav.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tabId = btn.getAttribute('data-tab');
        this.switchTab(tabId);
      });
    });

    // Module headline at the top of the content area (which module am I in?)
    this.ensureHeadline();
    this.updateHeadline(this.activeTab);
    // Re-localize the headline when the UI language changes
    window.addEventListener('settingChanged', (e) => {
      if (e.detail && e.detail.key === 'language') this.updateHeadline(this.activeTab);
    });

    // Browser Back/Forward: restore the tab recorded in the history state.
    // Only acts on our own tab entries (state.lqTab); ayah-hash entries keep
    // their existing hashchange handling untouched.
    window.addEventListener('popstate', (e) => {
      const tab = e.state && e.state.lqTab;
      if (tab && tab !== this.activeTab && document.getElementById('tab-' + tab)) {
        this.switchTab(tab, true);   // fromHistory=true → don't push a new entry
      }
    });
    // Seed the first history entry with the initial tab so the very first Back
    // has somewhere to return to.
    try { history.replaceState({ lqTab: this.activeTab }, ''); } catch (e) { /* ignore */ }
  }

  /** Insert the headline banner as the first child of the content area (once). */
  ensureHeadline() {
    if (this.headline || !this.tabContent) return;
    this.headline = document.createElement('div');
    this.headline.id = 'module-headline';
    this.headline.className = 'flex items-center gap-3 mb-5';
    this.tabContent.insertBefore(this.headline, this.tabContent.firstChild);
  }

  /** Set the headline to the current module's emoji + localized name. */
  updateHeadline(tabId) {
    if (!this.headline) return;
    const meta = TAB_META[tabId];
    if (!meta) { this.headline.classList.add('hidden'); this.headline.innerHTML = ''; return; }
    const lang = (typeof appSettings !== 'undefined' && appSettings) ? appSettings.get('language') : 'en';
    const name = (typeof t === 'function') ? t(meta.key, lang) : tabId;
    this.headline.classList.remove('hidden');
    this.headline.innerHTML =
      `<span class="text-2xl leading-none" aria-hidden="true">${meta.emoji}</span>` +
      `<h2 class="text-xl font-bold text-gray-800 dark:text-gray-100">${name}</h2>`;
  }

  /**
   * Switch to a specific tab
   * @param {string} tabId
   */
  switchTab(tabId, fromHistory = false) {
    const fromTab = this.activeTab;
    // Update active button
    const tabButtons = this.tabNav.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
      const isActive = btn.getAttribute('data-tab') === tabId;
      btn.classList.toggle('active', isActive);
      btn.classList.toggle('border-primary', isActive);
      btn.classList.toggle('text-primary', isActive);
      btn.classList.toggle('dark:text-sky-300', isActive);
      btn.classList.toggle('dark:border-sky-300', isActive);
      btn.classList.toggle('border-transparent', !isActive);
      btn.classList.toggle('text-gray-500', !isActive);
    });

    // Update active panel
    const tabPanels = this.tabContent.querySelectorAll('.tab-panel');
    tabPanels.forEach(panel => {
      const panelId = panel.id.replace('tab-', '');
      panel.classList.toggle('active', panelId === tabId);
      panel.classList.toggle('hidden', panelId !== tabId);
    });

    this.activeTab = tabId;

    // Show tabs-nav only for Quran-related modules; hide for standalone modules
    // (learn, memorize, amal, whyislam, resources, prophets, seerah, etc.)
    const quranTabs = new Set([
      'reading', 'search', 'tafseer', 'wordbyword', 'grammar', 'tajweedreading',
      'mushaf', 'topics', 'wordrepeat', 'sarf', 'mutashabihat', 'nuzul',
      'quiz', 'audio', 'khatmah', 'tajweedlearn', 'quranicarabic'
    ]);
    this.tabNav.classList.toggle('hidden', !quranTabs.has(tabId));

    this.updateHeadline(tabId);

    // Back-navigation: when a module sends us to Reading to view a verse,
    // offer a one-tap return to that module.
    if (tabId === 'reading' && fromTab && fromTab !== 'reading') this.returnTab = fromTab;
    // Cross-module jumps (switchTabWithReturn) get the same pill; any further
    // navigation away from the jump target dismisses it.
    if (this.jumpReturn && this.jumpReturn.to !== tabId) this.jumpReturn = null;
    this.updateBackPill();

    // Call tab-specific handler if registered
    if (this.tabHandlers[tabId]) {
      this.tabHandlers[tabId]();
    }

    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('tabChanged', { detail: { tabId } }));

    // Browser-history integration: push a state entry per tab switch so the
    // browser Back button returns to the previous module (instead of leaving the
    // app). We use history STATE (not the hash — the hash is already used for
    // ayah deep-links). Skips the push when the switch itself came from popstate.
    if (!fromHistory && tabId !== fromTab) {
      try {
        history.pushState({ lqTab: tabId }, '');
      } catch (e) { /* history unavailable — ignore */ }
    }
  }

  /** Cross-module jump (e.g. Word-Repetition → Sarf) with a one-tap return pill. */
  switchTabWithReturn(tabId) {
    if (tabId !== this.activeTab) this.jumpReturn = { to: tabId, from: this.activeTab };
    this.switchTab(tabId);
  }

  updateBackPill() {
    const jump = this.jumpReturn && this.activeTab === this.jumpReturn.to ? this.jumpReturn.from : null;
    const backTo = jump || (this.activeTab === 'reading' && this.returnTab !== 'reading' ? this.returnTab : null);
    if (!this.backPill) {
      this.backPill = document.createElement('button');
      this.backPill.id = 'tab-back-pill';
      this.backPill.className = 'fixed bottom-20 left-4 z-40 hidden items-center gap-2 px-4 py-2.5 rounded-full bg-primary text-white shadow-lg hover:bg-primary/90 text-sm font-medium';
      this.backPill.addEventListener('click', () => {
        const target = this._backTo;
        this.jumpReturn = null;
        if (target) this.switchTab(target);
      });
      document.body.appendChild(this.backPill);
    }
    this._backTo = backTo;
    if (backTo) {
      const lang = (typeof appSettings !== 'undefined' && appSettings) ? appSettings.get('language') : 'en';
      const labels = { reading: 'ayah_reading', search: 'search', tafseer: 'tafseers', wordbyword: 'word_by_word', grammar: 'grammar', learn: 'learn', memorize: 'memorize', quiz: 'quiz_center_title', audio: 'audio', mushaf: 'mushaf', topics: 'topics_title', wordrepeat: 'wr_title', sarf: 'sarf_title' };
      const name = (typeof t === 'function') ? t(labels[backTo] || 'back', lang) : backTo;
      this.backPill.innerHTML = `<span class="text-base leading-none">←</span><span>${name}</span>`;
      this.backPill.classList.remove('hidden');
      this.backPill.classList.add('flex');
    } else {
      this.backPill.classList.add('hidden');
      this.backPill.classList.remove('flex');
    }
  }

  /**
   * Register a handler for when a tab becomes active
   * @param {string} tabId
   * @param {function} handler
   */
  onTabActive(tabId, handler) {
    this.tabHandlers[tabId] = handler;
  }

  /**
   * Get the currently active tab
   * @returns {string}
   */
  getActiveTab() {
    return this.activeTab;
  }

  /**
   * Add a new tab dynamically
   * @param {string} id
   * @param {string} label
   * @param {string} content - HTML content for the panel
   */
  addTab(id, label, content = '') {
    // Add tab button
    const btn = document.createElement('button');
    btn.className = 'tab-btn px-4 py-3 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200';
    btn.setAttribute('data-tab', id);
    btn.innerHTML = `<span>${label}</span>`;
    btn.addEventListener('click', () => this.switchTab(id));
    this.tabNav.appendChild(btn);

    // Add tab panel
    const panel = document.createElement('div');
    panel.id = `tab-${id}`;
    panel.className = 'tab-panel hidden';
    panel.innerHTML = content;
    this.tabContent.appendChild(panel);
  }

  /**
   * Remove a tab
   * @param {string} id
   */
  removeTab(id) {
    // Remove button
    const btn = this.tabNav.querySelector(`[data-tab="${id}"]`);
    if (btn) btn.remove();

    // Remove panel
    const panel = document.getElementById(`tab-${id}`);
    if (panel) panel.remove();

    // If removed tab was active, switch to first tab
    if (this.activeTab === id) {
      const firstBtn = this.tabNav.querySelector('.tab-btn');
      if (firstBtn) {
        this.switchTab(firstBtn.getAttribute('data-tab'));
      }
    }
  }

  /**
   * Update tab content
   * @param {string} tabId
   * @param {string} content - HTML content
   */
  updateTabContent(tabId, content) {
    const panel = document.getElementById(`tab-${tabId}`);
    if (panel) {
      const container = panel.querySelector('[id$="-container"]') || panel;
      container.innerHTML = content;
    }
  }
}

// Initialize tab system when DOM is ready
let tabSystem;
document.addEventListener('DOMContentLoaded', () => {
  tabSystem = new TabSystem();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TabSystem };
}
