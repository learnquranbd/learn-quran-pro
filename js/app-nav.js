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
          { tab: 'tajweedlearn', emoji: '🎨', label: 'tj_learn_title' }
        ] }
    ] },
  { id: 'quranicarabic', emoji: '🔤', label: 'qa_title', tab: 'quranicarabic' },
  { id: 'names', emoji: '✨', label: 'learn_names_title', tab: 'names' },
  { id: 'amal', emoji: '📿', label: 'amal_title', tab: 'amal' },
  { id: 'sawm', emoji: '🌅', label: 'learn_sawm_title', tab: 'sawm' },
  { id: 'hajj', emoji: '🕋', label: 'learn_hajj_title', tab: 'hajj' },
  { id: 'zakat', emoji: '💰', label: 'learn_zakat_title', tab: 'zakat' },
  { id: 'namaz', emoji: '🕌', label: 'learn_salah_title', tab: 'namaz' },
  { id: 'anbiya', emoji: '🕋', label: 'group_prophets', children: [
      { tab: 'prophets', emoji: '📜', label: 'prophets_title' },
      { tab: 'seerah',   emoji: '🌙', label: 'seerah_title' }
    ] },
  { id: 'islam', emoji: '💡', label: 'islam_group_title', children: [
      { tab: 'whyislam', emoji: '💡', label: 'whyislam_title' },
      { tab: 'fard',     emoji: '⭐', label: 'islam_fard_title' },
      { tab: 'wajib',    emoji: '🔷', label: 'islam_wajib_title' },
      { tab: 'nafl',     emoji: '✨', label: 'islam_nafl_title' }
    ] },
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
    this._popupHideTimer = null;

    this._initPopup();
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

  _initPopup() {
    this.popup = document.createElement('div');
    this.popup.id = 'app-nav-popup';
    this.popup.className = 'fixed z-[60] hidden rounded-xl bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700 p-2 min-w-[200px] max-w-[280px]';
    document.body.appendChild(this.popup);

    this.subPopup = document.createElement('div');
    this.subPopup.id = 'app-nav-sub-popup';
    this.subPopup.className = 'fixed z-[60] hidden rounded-xl bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700 p-2 min-w-[200px] max-w-[280px]';
    document.body.appendChild(this.subPopup);

    this.popup.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-popup-child]');
      if (!btn) return;
      this._handlePopupClick(btn);
      this._hidePopup();
    });

    this.popup.addEventListener('mouseenter', () => {
      if (this._popupHideTimer) { clearTimeout(this._popupHideTimer); this._popupHideTimer = null; }
    });

    this.popup.addEventListener('mouseleave', (e) => {
      if (this.subPopup && !this.subPopup.classList.contains('hidden')) return;
      if (e.relatedTarget && this.subPopup && (e.relatedTarget === this.subPopup || this.subPopup.contains(e.relatedTarget))) return;
      this._popupHideTimer = setTimeout(() => this._hidePopup(), 150);
    });

    this.subPopup.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-sub-child]');
      if (!btn) return;
      this._handleSubPopupClick(btn);
      this._hidePopup();
    });

    this.subPopup.addEventListener('mouseenter', () => {
      if (this._popupHideTimer) { clearTimeout(this._popupHideTimer); this._popupHideTimer = null; }
    });

    this.subPopup.addEventListener('mouseleave', (e) => {
      if (e.relatedTarget && this.popup && (e.relatedTarget === this.popup || this.popup.contains(e.relatedTarget))) return;
      this._popupHideTimer = setTimeout(() => this._hidePopup(), 150);
    });

    document.addEventListener('click', (e) => {
      if (this.popup && !this.popup.classList.contains('hidden') &&
          !this.popup.contains(e.target) && !this.subPopup.contains(e.target) && !e.target.closest('[data-primary]')) {
        this._hidePopup();
      }
    });

    window.addEventListener('scroll', () => this._hidePopup(), { passive: true });
  }

  _popupItems(primary) {
    if (primary.children) {
      return primary.children.map(c => {
        const hasSub = c.children || c.modes;
        const kind = hasSub ? 'children' : (c.tab ? 'tab' : 'module');
        return { ...c, key: hasSub ? c.id : (c.module || c.tab), kind, drill: c.drill || '' };
      });
    }
    if (primary.modes) {
      return primary.modes.map(m => ({ key: m.mode, kind: 'mode', emoji: m.emoji, label: m.label }));
    }
    return [];
  }

  _showPopup(btn, primary) {
    if (window.innerWidth < 1024) return;
    const sidebar = document.getElementById('sidebar');
    if (sidebar && sidebar.classList.contains('lg:hidden')) return;
    const items = this._popupItems(primary);
    if (!items.length) return;

    if (this._popupHideTimer) { clearTimeout(this._popupHideTimer); this._popupHideTimer = null; }
    this._hideSubPopup();

    this.popup.innerHTML = items.map(it => {
      const hasSub = it.children || it.modes;
      return `<button data-popup-child="${it.key}" data-popup-kind="${it.kind}" data-popup-drill="${it.drill}"
        class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-left transition-colors text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 whitespace-nowrap">
        <span class="text-lg leading-none">${it.emoji}</span>
        <span class="flex-1">${this.tt(it.label)}</span>
        ${hasSub ? '<span class="text-gray-400">›</span>' : ''}
      </button>`;
    }).join('');

    const rect = btn.getBoundingClientRect();
    this.popup.style.left = (rect.right + 8) + 'px';
    this.popup.style.top = Math.max(rect.top, 80) + 'px';
    this.popup.classList.remove('hidden');

    this.popup.querySelectorAll('[data-popup-kind="children"]').forEach(subBtn => {
      const key = subBtn.getAttribute('data-popup-child');
      const child = primary.children ? primary.children.find(c => c.id === key) : null;
      if (!child || !(child.children || child.modes)) return;
      subBtn.addEventListener('mouseenter', () => this._showSubPopup(subBtn, child));
      subBtn.addEventListener('mouseleave', (ev) => {
        if (ev.relatedTarget && this.subPopup && (ev.relatedTarget === this.subPopup || this.subPopup.contains(ev.relatedTarget))) return;
        if (this.subPopup && !this.subPopup.classList.contains('hidden')) {
          this._popupHideTimer = setTimeout(() => this._hideSubPopup(), 250);
        }
      });
    });
  }

  _showSubPopup(triggerBtn, child) {
    const subItems = child.children || child.modes || [];
    if (!subItems.length) return;

    if (this._popupHideTimer) { clearTimeout(this._popupHideTimer); this._popupHideTimer = null; }

    this.subPopup.innerHTML = subItems.map(si => {
      const key = si.mode || si.module || si.tab || '';
      const kind = si.mode ? 'mode' : (si.module ? 'module' : 'tab');
      return `<button data-sub-child="${key}" data-sub-kind="${kind}"
        class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-left transition-colors text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 whitespace-nowrap">
        <span class="text-lg leading-none">${si.emoji}</span>
        <span class="flex-1">${this.tt(si.label)}</span>
      </button>`;
    }).join('');

    const btnRect = triggerBtn.getBoundingClientRect();
    this.subPopup.style.left = (btnRect.right + 4) + 'px';
    this.subPopup.style.top = Math.max(btnRect.top, 80) + 'px';
    this.subPopup.classList.remove('hidden');
  }

  _hideSubPopup() {
    if (this.subPopup && !this.subPopup.classList.contains('hidden')) {
      this.subPopup.classList.add('hidden');
    }
  }

  _hidePopup() {
    this._hideSubPopup();
    if (this.popup && !this.popup.classList.contains('hidden')) {
      this.popup.classList.add('hidden');
    }
  }

  _handlePopupClick(btn) {
    const drill = btn.getAttribute('data-popup-drill');
    if (drill === 'legacy') { this.showLegacy(); this.closeSidebarMobile(); return; }
    const kind = btn.getAttribute('data-popup-kind');
    const key = btn.getAttribute('data-popup-child');
    if (kind === 'children') {
      const p = APP_NAV_PRIMARY.find(x => x.id === key);
      if (p) { this.onPrimary(key); }
      return;
    }
    if (kind === 'mode') this.openMemMode(key);
    else if (kind === 'tab') { this.switchTab(key); this.closeSidebarMobile(); }
    else this.openLearnModule(key);
  }

  _handleSubPopupClick(btn) {
    const kind = btn.getAttribute('data-sub-kind');
    const key = btn.getAttribute('data-sub-child');
    if (kind === 'mode') this.openMemMode(key);
    else if (kind === 'tab') { this.switchTab(key); this.closeSidebarMobile(); }
    else this.openLearnModule(key);
  }

  _moduleTab(primary) {
    if (primary.tab) return primary.tab;
    const map = { quran: 'reading', anbiya: 'prophets' };
    return map[primary.id] || (primary.id === 'memorize' ? 'memorize' : primary.id);
  }

  tt(key) { return t(key, this.language); }

  // ---- rendering ---------------------------------------------------------

  render() {
    this._hidePopup();
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
              class="w-full py-2 text-lg rounded-lg text-gray-200 bg-white/10 hover:bg-white/20 hover:text-white transition-colors">
        ${emoji}
      </button>`;
    this.root.innerHTML = `
      <div id="app-nav-tools" class="grid grid-cols-2 sm:grid-cols-4 gap-1.5 mb-3">
        ${toolBtn('memorize', '🎯', this.tt('memorize'))}
        ${toolBtn('seerah', '🌙', this.tt('seerah_title'))}
        ${toolBtn('mutashabihat', '🪞', this.tt('mutashabihat_title'))}
        ${toolBtn('quiz', '❓', this.tt('quiz_center_title'))}
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
      btn.addEventListener('mouseenter', () => {
        if (this._popupHideTimer) { clearTimeout(this._popupHideTimer); this._popupHideTimer = null; }
        const p = APP_NAV_PRIMARY.find(x => x.id === btn.getAttribute('data-primary'));
        if (p && (p.children || p.modes)) this._showPopup(btn, p);
      });
      btn.addEventListener('mouseleave', () => {
        if (this.popup && !this.popup.classList.contains('hidden') && !this.popup.matches(':hover')) {
          this._popupHideTimer = setTimeout(() => this._hidePopup(), 200);
        }
      });
    });
    const toolsRow = this.root.querySelector('#app-nav-tools');
    if (toolsRow) toolsRow.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-navtool]');
      if (btn) this.runTool(btn.getAttribute('data-navtool'));
    });
  }

  runTool(name) {
    if (name === 'seerah') { this.switchTab('seerah'); this.closeSidebarMobile(); return; }
    if (name === 'memorize') { this.switchTab('memorize'); this.closeSidebarMobile(); return; }
    if (name === 'mutashabihat') { this.switchTab('mutashabihat'); this.closeSidebarMobile(); return; }
    if (name === 'quiz') { this.switchTab('quiz'); this.closeSidebarMobile(); return; }
    // Legacy tools – delegate to sidebar-menu singleton
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
      <button data-nav-heading="${primary.id}"
        class="w-full flex items-center gap-2 px-3 py-2 mb-2 rounded-lg text-sm font-bold text-white hover:bg-white/10 transition-colors text-left"
        title="${this.tt('back')}">
        <span>${primary.emoji}</span><span class="flex-1">${this.tt(primary.label)}</span>
        <span class="text-xs text-gray-400">⌂</span>
      </button>
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
    const heading = this.root.querySelector('[data-nav-heading]');
    if (heading) heading.addEventListener('click', () => {
      this._hidePopup();
      const tab = this._moduleTab(primary);
      this.switchTab(tab);
      this.closeSidebarMobile();
      this.showPrimary();
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
    this._hidePopup();
    this.view = 'primary';
    this.renderPrimary();
    this.highlightActive();
  }

  showLegacy() {
    this._hidePopup();
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
