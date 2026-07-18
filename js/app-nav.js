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
  { id: 'memorize', emoji: '🎙️', label: 'memorize', modes: [
      { mode: 'speech', emoji: '🎙️', label: 'mem_mode_speech' },
      { mode: 'typing', emoji: '⌨️', label: 'mem_mode_typing' },
      { mode: 'arrange', emoji: '🔀', label: 'mem_mode_arrange' },
      { mode: 'record', emoji: '🔴', label: 'mem_mode_record' }
    ] },
  { id: 'quran', emoji: '📖', label: 'nav_quran', children: [
      { tab: 'mushaf', emoji: '📗', label: 'mushaf' },
      { tab: 'subject', emoji: '📖', label: 'nav_subject', drill: 'legacy' },
      { tab: 'topics', emoji: '🗂️', label: 'topics_title' },
      { tab: 'mutashabihat', emoji: '🪞', label: 'mutashabihat_title' },
      { tab: 'wordrepeat', emoji: '🔁', label: 'wr_title' },
      { tab: 'sarf', emoji: '🧬', label: 'sarf_title' },
      { tab: 'nuzul', emoji: '🌅', label: 'nuzul_title' },
      { tab: 'quiz', emoji: '❓', label: 'quiz' },
      { tab: 'audio', emoji: '🎧', label: 'audio' },
      { tab: 'khatmah', emoji: '📅', label: 'khatmah_title' },
      { id: 'learn', emoji: '🎓', label: 'learn', children: [
          { module: 'kids',        emoji: '🧒', label: 'learn_kids_title' },
          { module: 'vocab',       emoji: '📚', label: 'learn_vocab_title' },
          { module: 'handwriting', emoji: '✍️', label: 'hw_title' },
          { tab: 'tajweedlearn', emoji: '🎨', label: 'tj_learn_title' },
          { tab: 'quranicarabic', emoji: '🔤', label: 'qa_title' }
        ] }
    ] },
  { id: 'names', emoji: '✨', label: 'learn_names_title', learnModule: 'names' },
  { id: 'amal', emoji: '📿', label: 'amal_title', tab: 'amal' },
  { id: 'salah', emoji: '🕌', label: 'learn_salah_title', learnModule: 'salah' },
  { id: 'anbiya', emoji: '🕋', label: 'group_prophets', children: [
      { tab: 'prophets', emoji: '📜', label: 'prophets_title' },
      { tab: 'seerah',   emoji: '🌙', label: 'seerah_title' }
    ] },
  { id: 'whyislam', emoji: '💡', label: 'whyislam_title', tab: 'whyislam' },
  { id: 'resources', emoji: '🔗', label: 'resources_title', tab: 'resources' }
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
    // A drilled-in children group (Learn, Nabi & Rasul, …) — tracked by id so any
    // number of groups work, not just a hardcoded one.
    if (this.view === 'children') {
      const g = APP_NAV_PRIMARY.find(p => p.id === this.childGroup);
      if (g) return this.renderChildren(g);
    }
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
    const toolBtn = (tool, emoji, label) => `
      <button data-navtool="${tool}" title="${label}" aria-label="${label}"
              class="flex-1 py-2 text-lg rounded-lg text-gray-200 bg-white/10 hover:bg-white/20 hover:text-white transition-colors">
        ${emoji}
      </button>`;
    this.root.innerHTML = `
      <div id="app-nav-tools" class="flex items-center gap-2 mb-3">
        ${toolBtn('keyboard', '⌨️', this.tt('arabic_keyboard'))}
        ${toolBtn('waqf', '🛑', this.tt('waqf_signs'))}
        ${toolBtn('memorize', '🎯', this.tt('memorize'))}
      </div>
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
    const toolsRow = this.root.querySelector('#app-nav-tools');
    if (toolsRow) toolsRow.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-navtool]');
      if (btn) this.runTool(btn.getAttribute('data-navtool'));
    });
  }

  // Delegate the always-visible quick tools to the legacy sidebar-menu singleton
  // (which owns the keyboard / waqf modals). Guard against init order: both are
  // created on DOMContentLoaded, so the instance may not exist yet.
  runTool(name) {
    if (typeof sidebarMenu !== 'undefined' && sidebarMenu && typeof sidebarMenu.runTool === 'function') {
      sidebarMenu.runTool(name);
    }
  }

  renderChildren(primary, parentPrimary) {
    if (this.legacyWrap) this.legacyWrap.classList.add('hidden');
    this.root.classList.remove('hidden');
    this._childParent = parentPrimary || null;
    const items = primary.children
      ? primary.children.map(c => {
          const hasSub = c.children || c.modes;
          return { ...c, key: hasSub ? c.id : (c.module || c.tab), kind: hasSub ? 'children' : (c.tab ? 'tab' : 'module') };
        })
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
        <button data-child="${it.key}" data-kind="${it.kind}" data-drill="${it.drill || ''}" class="${this.itemClass(active)}">
          <span class="text-lg leading-none">${it.emoji}</span>
          <span class="flex-1">${this.tt(it.label)}</span>
          ${it.children || it.modes ? '<span class="text-gray-400">›</span>' : ''}
        </button>`;
      }).join('')}
    `;
    this.root.querySelector('[data-nav-back]').addEventListener('click', () => {
      if (this._childParent) { this.renderChildren(this._childParent); }
      else { this.showPrimary(); }
    });
    this.root.querySelectorAll('[data-child]').forEach(btn => {
      btn.addEventListener('click', () => {
        const drill = btn.getAttribute('data-drill');
        if (drill === 'legacy') { this.showLegacy(); this.closeSidebarMobile(); return; }
        const kind = btn.getAttribute('data-kind');
        if (kind === 'children') {
          const key = btn.getAttribute('data-child');
          const child = primary.children ? primary.children.find(c => c.id === key) : null;
          if (child) {
            this.childGroup = child.id;
            this.renderChildren(child, primary);
          }
          return;
        }
        const key = btn.getAttribute('data-child');
        if (kind === 'mode') this.openMemMode(key);
        else if (kind === 'tab') { this.switchTab(key); this.closeSidebarMobile(); }
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
    if (p.children) { this.view = 'children'; this.childGroup = p.id; return this.renderChildren(p); }
    if (p.modes) { this.view = 'memorize'; return this.renderChildren(p); }
    if (p.learnModule) { this.openLearnModule(p.learnModule); return; }
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
      arrange: document.getElementById('word-arrange-root'),
      record: document.getElementById('record-memorize-root')
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
    if (mode === 'record') window.dispatchEvent(new CustomEvent('learnModuleSelected', { detail: { module: 'recordmemorize' } }));
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
