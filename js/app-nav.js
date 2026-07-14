/**
 * App Nav — drill-down module navigation in the left sidebar.
 *
 * Level 0 shows the primary modules (Quranic Ayah by Subject, Learn, Memorize,
 * Quiz, Audio, Mushaf). Tapping a primary that has children swaps the sidebar to
 * that child list with a back arrow; tapping a leaf switches the matching tab
 * panel (and, for Learn/Memorize, the sub-module or mode) and closes the sidebar
 * on mobile.
 *
 * "Quranic Ayah by Subject" delegates to the legacy tree that js/sidebar-menu.js
 * renders into #legacy-menu (wrapped in #legacy-menu-wrap).
 */

const APP_NAV_PRIMARY = [
  { id: 'subject', emoji: '📖', label: 'nav_subject', drill: 'legacy' },
  { id: 'topics', emoji: '🗂️', label: 'topics_title', tab: 'topics' },
  { id: 'wordrepeat', emoji: '🔁', label: 'wr_title', tab: 'wordrepeat' },
  { id: 'sarf', emoji: '🧬', label: 'sarf_title', tab: 'sarf' },
  { id: 'amal', emoji: '📿', label: 'amal_title', tab: 'amal' },
  { id: 'tajweedlearn', emoji: '🎨', label: 'tj_learn_title', tab: 'tajweedlearn' },
  { id: 'learn', emoji: '🎓', label: 'learn', children: [
      { module: 'kids',        emoji: '🧒', label: 'learn_kids_title' },
      { module: 'vocab',       emoji: '📚', label: 'learn_vocab_title' },
      { module: 'names',       emoji: '✨', label: 'learn_names_title' },
      { module: 'handwriting', emoji: '✍️', label: 'hw_title' }
    ] },
  { id: 'memorize', emoji: '🎙️', label: 'memorize', modes: [
      { mode: 'speech', emoji: '🎙️', label: 'mem_mode_speech' },
      { mode: 'typing', emoji: '⌨️', label: 'mem_mode_typing' },
      { mode: 'arrange', emoji: '🔀', label: 'mem_mode_arrange' }
    ] },
  { id: 'quiz',   emoji: '❓', label: 'quiz_center_title', tab: 'quiz' },
  { id: 'audio',  emoji: '🎧', label: 'audio',  tab: 'audio' },
  { id: 'mushaf', emoji: '📗', label: 'mushaf', tab: 'mushaf' }
];

class AppNav {
  constructor() {
    this.root = document.getElementById('app-nav');
    if (!this.root) return;

    this.legacyWrap = document.getElementById('legacy-menu-wrap');
    this.language = (typeof appSettings !== 'undefined' && appSettings)
      ? appSettings.get('language') : 'en';
    this.view = 'primary';        // 'primary' | 'learn' | 'memorize'
    this.activeTab = 'reading';
    this.memMode = 'speech';

    this.render();

    // Back out of the legacy subject tree
    const legacyBack = document.getElementById('legacy-menu-back');
    if (legacyBack) legacyBack.addEventListener('click', () => this.showPrimary());

    // Memorize in-panel mode buttons
    const modeBar = document.getElementById('memorize-modes');
    if (modeBar) modeBar.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-mmode]');
      if (btn) this.setMemMode(btn.getAttribute('data-mmode'));
    });

    window.addEventListener('settingChanged', (e) => {
      if (e.detail.key === 'language') { this.language = e.detail.value; this.render(); }
    });
    window.addEventListener('tabChanged', (e) => {
      this.activeTab = e.detail.tabId;
      if (this.view === 'primary') this.highlightActive();
    });
  }

  tt(key) { return t(key, this.language); }

  // ---- rendering ---------------------------------------------------------

  render() {
    if (this.view === 'learn') return this.renderChildren(APP_NAV_PRIMARY.find(p => p.id === 'learn'));
    if (this.view === 'memorize') return this.renderChildren(APP_NAV_PRIMARY.find(p => p.id === 'memorize'));
    this.renderPrimary();
  }

  itemClass(active) {
    // The sidebar always uses the dark legacy theme (#343a40), so items must be
    // light-on-dark in BOTH colour schemes — not the light-mode gray text.
    return 'app-nav-item w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-left transition-colors ' +
      (active
        ? 'bg-white/15 text-white'
        : 'text-gray-200 hover:bg-white/10 hover:text-white');
  }

  renderPrimary() {
    this.view = 'primary';
    if (this.legacyWrap) this.legacyWrap.classList.add('hidden');
    this.root.classList.remove('hidden');
    this.root.innerHTML = `
      <h3 class="text-xs uppercase tracking-wide font-semibold text-gray-400 dark:text-gray-500 px-3 mb-2">${this.tt('nav_modules')}</h3>
      ${APP_NAV_PRIMARY.map(p => {
        const active = p.tab && p.tab === this.activeTab;
        const hasChild = p.children || p.modes || p.drill;
        return `
          <button data-primary="${p.id}" class="${this.itemClass(active)}">
            <span class="text-lg leading-none">${p.emoji}</span>
            <span class="flex-1">${this.tt(p.label)}</span>
            ${hasChild ? '<span class="text-gray-400">›</span>' : ''}
          </button>`;
      }).join('')}
    `;
    this.root.querySelectorAll('[data-primary]').forEach(btn => {
      btn.addEventListener('click', () => this.onPrimary(btn.getAttribute('data-primary')));
    });
  }

  renderChildren(primary) {
    if (this.legacyWrap) this.legacyWrap.classList.add('hidden');
    this.root.classList.remove('hidden');
    const items = primary.children
      ? primary.children.map(c => ({ key: c.module, kind: 'module', emoji: c.emoji, label: c.label }))
      : primary.modes.map(m => ({ key: m.mode, kind: 'mode', emoji: m.emoji, label: m.label }));
    this.root.innerHTML = `
      <button data-nav-back class="w-full flex items-center gap-2 px-3 py-2 mb-2 rounded-lg text-sm font-semibold text-gray-200 hover:bg-white/10 hover:text-white">
        <span class="text-lg leading-none">←</span><span>${this.tt('back')}</span>
      </button>
      <div class="flex items-center gap-2 px-3 mb-2 text-sm font-bold text-white">
        <span>${primary.emoji}</span><span>${this.tt(primary.label)}</span>
      </div>
      ${items.map(it => {
        const active = (it.kind === 'mode' && this.activeTab === 'memorize' && this.memMode === it.key);
        return `
        <button data-child="${it.key}" data-kind="${it.kind}" class="${this.itemClass(active)}">
          <span class="text-lg leading-none">${it.emoji}</span>
          <span class="flex-1">${this.tt(it.label)}</span>
        </button>`;
      }).join('')}
    `;
    this.root.querySelector('[data-nav-back]').addEventListener('click', () => this.showPrimary());
    this.root.querySelectorAll('[data-child]').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-child');
        if (btn.getAttribute('data-kind') === 'mode') this.openMemMode(key);
        else this.openLearnModule(key);
      });
    });
  }

  highlightActive() {
    this.root.querySelectorAll('[data-primary]').forEach(btn => {
      const p = APP_NAV_PRIMARY.find(x => x.id === btn.getAttribute('data-primary'));
      const active = p && p.tab && p.tab === this.activeTab;
      btn.className = this.itemClass(active);
    });
  }

  // ---- navigation --------------------------------------------------------

  onPrimary(id) {
    const p = APP_NAV_PRIMARY.find(x => x.id === id);
    if (!p) return;
    if (p.drill === 'legacy') return this.showLegacy();
    if (p.children) { this.view = 'learn'; return this.renderChildren(p); }
    if (p.modes) { this.view = 'memorize'; return this.renderChildren(p); }
    if (p.tab) { this.switchTab(p.tab); this.closeSidebarMobile(); }
  }

  showPrimary() {
    this.view = 'primary';
    this.renderPrimary();
    this.highlightActive();
  }

  showLegacy() {
    this.root.classList.add('hidden');
    if (this.legacyWrap) this.legacyWrap.classList.remove('hidden');
  }

  openLearnModule(module) {
    this.switchTab('learn');
    // learn.js listens for this and reveals the matching root; the module renders itself.
    window.dispatchEvent(new CustomEvent('learnModuleSelected', { detail: { module } }));
    this.closeSidebarMobile();
  }

  openMemMode(mode) {
    this.switchTab('memorize');
    this.setMemMode(mode);
    this.closeSidebarMobile();
  }

  setMemMode(mode) {
    this.memMode = mode;
    const panels = {
      speech: document.getElementById('memorize-container'),
      typing: document.getElementById('type-memorize-root'),
      arrange: document.getElementById('word-arrange-root')
    };
    Object.entries(panels).forEach(([m, el]) => { if (el) el.classList.toggle('hidden', m !== mode); });
    // Reflect the active mode on the in-panel buttons
    document.querySelectorAll('#memorize-modes [data-mmode]').forEach(btn => {
      const on = btn.getAttribute('data-mmode') === mode;
      btn.classList.toggle('active', on);
      btn.classList.toggle('bg-primary', on);
      btn.classList.toggle('text-white', on);
      btn.classList.toggle('shadow', on);
      btn.classList.toggle('bg-gray-100', !on);
      btn.classList.toggle('dark:bg-gray-700', !on);
      btn.classList.toggle('text-gray-700', !on);
      btn.classList.toggle('dark:text-gray-200', !on);
    });
    // The typing / arrange modules render on this event (idempotent re-render).
    if (mode === 'typing') window.dispatchEvent(new CustomEvent('learnModuleSelected', { detail: { module: 'typememorize' } }));
    if (mode === 'arrange') window.dispatchEvent(new CustomEvent('learnModuleSelected', { detail: { module: 'wordarrange' } }));
  }

  switchTab(tabId) {
    if (typeof tabSystem !== 'undefined' && tabSystem) tabSystem.switchTab(tabId);
  }

  closeSidebarMobile() {
    if (window.innerWidth >= 1024) return;
    document.getElementById('sidebar')?.classList.add('-translate-x-full');
    document.getElementById('sidebar-overlay')?.classList.add('hidden');
  }
}

let appNav;
document.addEventListener('DOMContentLoaded', () => { appNav = new AppNav(); });
