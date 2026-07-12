/**
 * Legacy Sidebar Menu Module
 * Rebuilds the OLD app's full sidebar tree (LEGACY_MENU, js/menu-data.js)
 * inside <nav id="legacy-menu"> as collapsible groups, and wires every item:
 *
 *  - Items whose data/legacy-pages.json entry has verse refs load the verses
 *    into the reading view (banner via quranApp.pendingContext).
 *  - Items without refs (help / grammar-chart pages ...) open the raw
 *    legacy partial — sanitized — in a scrollable modal.
 *  - Three quick tools at the top: on-screen Arabic keyboard, waqf (stop)
 *    signs chart, and the memorize tab shortcut.
 *
 * Open groups are remembered in localStorage 'sidebarOpenGroups'.
 * Adds body.legacy-sidebar so the old-theme CSS in css/style.css applies.
 * Menu item labels (bn/en) are CONTENT data; all chrome strings go via t().
 */

class SidebarMenu {
  constructor() {
    this.container = document.getElementById('legacy-menu');
    if (!this.container || typeof LEGACY_MENU === 'undefined') return;

    this.language = (typeof appSettings !== 'undefined' && appSettings)
      ? appSettings.get('language')
      : 'en';
    this.query = '';
    this._pagesPromise = null;   // lazy fetch of data/legacy-pages.json → {path: entry}
    this.overlay = null;         // reusable modal (built lazily)

    try {
      this.openGroups = new Set(JSON.parse(localStorage.getItem('sidebarOpenGroups') || '[]'));
    } catch (err) {
      this.openGroups = new Set();
    }

    // Opt in to the old AdminLTE-style sidebar theme (css/style.css)
    document.body.classList.add('legacy-sidebar');

    this.render();

    window.addEventListener('settingChanged', (e) => {
      if (e.detail && e.detail.key === 'language') {
        this.language = e.detail.value;
        this.render();
      }
    });
  }

  /* ------------------------------------------------------------------ *
   * Helpers
   * ------------------------------------------------------------------ */

  esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  itemLabel(item) {
    return this.language === 'bn' ? item.bn : (item.en || item.bn);
  }

  switchTab(tabId) {
    if (typeof tabSystem !== 'undefined' && tabSystem) tabSystem.switchTab(tabId);
  }

  closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (sidebar) sidebar.classList.add('-translate-x-full');
    if (overlay) overlay.classList.add('hidden');
  }

  saveOpenGroups() {
    try {
      localStorage.setItem('sidebarOpenGroups', JSON.stringify([...this.openGroups]));
    } catch (err) { /* storage unavailable */ }
  }

  /** Lazy-fetch data/legacy-pages.json once, keyed by partial path; null on failure */
  loadPages() {
    if (!this._pagesPromise) {
      this._pagesPromise = fetch('data/legacy-pages.json')
        .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
        .then(list => {
          const map = {};
          list.forEach(entry => { map[entry.path] = entry; });
          return map;
        })
        .catch(() => { this._pagesPromise = null; return null; });
    }
    return this._pagesPromise;
  }

  /* ------------------------------------------------------------------ *
   * Rendering the menu tree
   * ------------------------------------------------------------------ */

  render() {
    const lang = this.language;

    const toolBtn = (tool, emoji, label) => `
      <button data-tool="${tool}" title="${this.esc(label)}" aria-label="${this.esc(label)}"
              class="flex-1 p-2 text-lg rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
        ${emoji}
      </button>`;

    this.container.innerHTML = `
      <div id="legacy-menu-tools" class="flex items-center gap-2 mb-3">
        ${toolBtn('keyboard', '⌨️', t('arabic_keyboard', lang))}
        ${toolBtn('waqf', '🛑', t('waqf_signs', lang))}
        ${toolBtn('memorize', '🎯', t('memorize', lang))}
      </div>
      <input type="text" id="legacy-menu-search"
             class="w-full px-3 py-1.5 mb-2 text-sm rounded-lg border border-gray-500 dark:border-gray-600
                    bg-white/90 dark:bg-gray-700 text-gray-800 dark:text-gray-100
                    placeholder-gray-500 dark:placeholder-gray-400
                    focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-blue-500"
             placeholder="${this.esc(t('search_menu', lang))}">
      <div id="legacy-menu-tree" class="space-y-1"></div>
    `;

    this.tree = this.container.querySelector('#legacy-menu-tree');
    this.searchInput = this.container.querySelector('#legacy-menu-search');
    this.searchInput.value = this.query;

    // Quick tools
    this.container.querySelector('#legacy-menu-tools').addEventListener('click', (e) => {
      const btn = e.target.closest('[data-tool]');
      if (!btn) return;
      const tool = btn.getAttribute('data-tool');
      if (tool === 'keyboard') this.openKeyboardModal();
      else if (tool === 'waqf') this.openWaqfModal();
      else if (tool === 'memorize') { this.switchTab('memorize'); this.closeSidebar(); }
    });

    // Live search across ALL items (bn + en)
    this.searchInput.addEventListener('input', () => {
      this.query = this.searchInput.value;
      this.renderTree();
    });

    // Item clicks (delegated)
    this.tree.addEventListener('click', (e) => {
      const link = e.target.closest('[data-partial]');
      if (!link) return;
      e.preventDefault();
      this.onItemClick(link.getAttribute('data-partial'), link.getAttribute('data-label'));
    });

    // Group open/close → chevron + persistence ('toggle' doesn't bubble: capture)
    this.tree.addEventListener('toggle', (e) => {
      const details = e.target;
      if (!details.classList || !details.classList.contains('nav-group')) return;
      const id = details.getAttribute('data-group');
      if (details.open) this.openGroups.add(id);
      else this.openGroups.delete(id);
      const chev = details.querySelector('.legacy-chevron');
      if (chev) chev.classList.toggle('rotate-90', details.open);
      this.saveOpenGroups();
    }, true);

    this.renderTree();
  }

  renderTree() {
    const raw = this.query.trim();
    if (!raw) {
      this.tree.innerHTML = LEGACY_MENU.map(group => this.groupHtml(group)).join('');
      return;
    }

    // Flat filtered list across every group (bn verbatim + en case-insensitive)
    const q = raw.toLowerCase();
    const matches = [];
    LEGACY_MENU.forEach(group => {
      group.items.forEach(item => {
        if ((item.bn && item.bn.includes(raw)) ||
            (item.en && item.en.toLowerCase().includes(q))) {
          matches.push(this.itemHtml(item, group.icon));
        }
      });
    });

    this.tree.innerHTML = matches.length
      ? matches.slice(0, 120).join('')
      : `<p class="px-3 py-2 text-sm opacity-70">${this.esc(t('no_results', this.language))}</p>`;
  }

  groupHtml(group) {
    const open = this.openGroups.has(group.id);
    const label = this.language === 'bn' ? group.bn : (group.en || group.bn);
    return `
      <details class="nav-group" data-group="${this.esc(group.id)}" ${open ? 'open' : ''}>
        <summary class="flex items-center gap-2 px-3 py-2 text-sm font-medium select-none
                        list-none [&::-webkit-details-marker]:hidden">
          <span>${group.icon || ''}</span>
          <span class="flex-1" dir="auto">${this.esc(label)}</span>
          <span class="legacy-chevron inline-block transition-transform duration-200 ${open ? 'rotate-90' : ''}">›</span>
        </summary>
        <div class="mt-1 mb-2 ms-2 space-y-0.5">
          ${group.items.map(item => this.itemHtml(item)).join('')}
        </div>
      </details>`;
  }

  itemHtml(item, icon) {
    const label = this.itemLabel(item);
    return `
      <a href="#" data-partial="${this.esc(item.partial)}" data-label="${this.esc(label)}"
         class="block px-3 py-1.5 text-sm rounded-lg transition-colors" dir="auto">
        ${icon ? icon + ' ' : ''}${this.esc(label)}
      </a>`;
  }

  /* ------------------------------------------------------------------ *
   * Item click behavior
   * ------------------------------------------------------------------ */

  async onItemClick(partial, label) {
    // Utility partials handled natively (no legacy-pages entry exists for them)
    if (partial === 'arabic_keyboard') return this.openKeyboardModal();
    if (partial === 'stop_sign') return this.openWaqfModal();
    if (partial === 'quran_memory_test') {
      this.switchTab('memorize');
      this.closeSidebar();
      return;
    }

    const pages = await this.loadPages();
    const entry = pages ? pages[partial] : null;

    if (entry && entry.refs && entry.refs.length) {
      this.openCollection(entry, label);
    } else {
      this.openLegacyPage(partial, label, entry);
    }
  }

  /** Verse-collection item: banner context, then load refs */
  openCollection(entry, label) {
    if (typeof quranApp !== 'undefined' && quranApp) {
      quranApp.pendingContext = { t: label, i: entry.intro || '' };
    }

    const rangeStr = entry.refs.join(',');
    if (window.location.hash === '#' + rangeStr) {
      // Hash unchanged: no hashchange event will fire, load manually
      if (typeof quranApp !== 'undefined' && quranApp) quranApp.handleHashChange();
    } else {
      window.location.hash = rangeStr;
    }

    this.switchTab('reading');
    this.closeSidebar();
  }

  /* ------------------------------------------------------------------ *
   * Legacy page modal (items without verse refs)
   * ------------------------------------------------------------------ */

  ensureModal() {
    if (this.overlay) return;

    this.overlay = document.createElement('div');
    this.overlay.id = 'legacy-menu-modal';
    this.overlay.className = 'fixed inset-0 bg-black/50 z-50 items-center justify-center p-4 hidden';
    this.overlay.innerHTML = `
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700
                  w-[90vw] max-w-none h-[90vh] flex flex-col">
        <div class="flex items-center gap-1 px-5 py-3 border-b border-gray-200 dark:border-gray-700">
          <h3 id="legacy-menu-modal-title" class="flex-1 font-semibold text-gray-800 dark:text-gray-100 truncate" dir="auto"></h3>
          <button id="legacy-menu-modal-close" class="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">✕</button>
        </div>
        <div id="legacy-menu-modal-body" class="flex-1 overflow-y-auto p-4"></div>
      </div>
    `;
    document.body.appendChild(this.overlay);

    this.modalTitle = this.overlay.querySelector('#legacy-menu-modal-title');
    this.modalBody = this.overlay.querySelector('#legacy-menu-modal-body');

    this.overlay.querySelector('#legacy-menu-modal-close').addEventListener('click', () => this.closeModal());
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) this.closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !this.overlay.classList.contains('hidden')) this.closeModal();
    });
  }

  showModal(title) {
    this.ensureModal();
    this.modalTitle.textContent = title;
    this.overlay.querySelector('#legacy-menu-modal-close').setAttribute('title', t('close', this.language));
    this.overlay.classList.remove('hidden');
    this.overlay.classList.add('flex');
  }

  closeModal() {
    if (!this.overlay) return;
    this.overlay.classList.add('hidden');
    this.overlay.classList.remove('flex');
    this.modalBody.innerHTML = ''; // stop any playing embeds
  }

  loadingHtml() {
    return `<p class="text-sm text-gray-400 p-2">${this.esc(t('loading', this.language))}</p>`;
  }

  fallbackHtml() {
    const lang = this.language;
    const site = (typeof QuranData !== 'undefined' && QuranData.legacyWebBase)
      ? QuranData.legacyWebBase
      : 'https://learn-quran-bd.web.app';
    return `
      <div class="text-center py-10 space-y-4">
        <p class="text-sm text-gray-500 dark:text-gray-400">${this.esc(t('legacy_unavailable', lang))}</p>
        <a href="${this.esc(site)}" target="_blank" rel="noopener"
           class="inline-block px-4 py-2 rounded-lg bg-primary text-white text-sm hover:bg-primary/80 transition-colors">
          ${this.esc(t('open_old_site', lang))} ↗
        </a>
      </div>`;
  }

  /**
   * Fetch a legacy partial, sanitize it and show it in the modal.
   */
  async openLegacyPage(partial, label, entry = null) {
    this.showModal(label || partial);
    this.modalBody.innerHTML = this.loadingHtml();
    this.closeSidebar();

    const url = QuranData.legacyBase + '/partials/' + partial + '.html';
    let html = null;
    try {
      const r = await fetch(url);
      if (r.ok) html = await r.text();
    } catch (err) { /* fall through to fallback */ }

    if (html === null) {
      this.modalBody.innerHTML = this.fallbackHtml();
      return;
    }

    const dir = partial.includes('/') ? partial.slice(0, partial.lastIndexOf('/')) : '';
    const baseDir = QuranData.legacyBase + '/partials' + (dir ? '/' + dir : '');

    this.modalBody.innerHTML = '';
    const wrap = document.createElement('div');
    // Legacy partials were designed for a white page
    wrap.className = 'legacy-html bg-white text-gray-900 rounded-lg p-4 overflow-x-auto';
    wrap.appendChild(this.sanitizeLegacy(html, baseDir));
    this.modalBody.appendChild(wrap);

  }

  /**
   * Parse untrusted legacy HTML into a detached node: strips scripts/styles/
   * embeds/forms plus inline "on..." and "javascript:" handlers, and rewrites
   * relative src/href to absolute legacy paths.
   */
  sanitizeLegacy(html, baseDir) {
    const tpl = document.createElement('template');
    tpl.innerHTML = html;

    tpl.content.querySelectorAll('script, style, link, iframe, object, embed, form').forEach(el => el.remove());
    tpl.content.querySelectorAll('*').forEach(el => {
      for (const attr of [...el.attributes]) {
        if (/^on/i.test(attr.name) || /^\s*javascript:/i.test(attr.value)) {
          el.removeAttribute(attr.name);
        }
      }
    });

    const fix = (el, attrName) => {
      const v = el.getAttribute(attrName) || '';
      if (!v || /^(https?:|data:|mailto:|tel:|#|\/\/)/i.test(v)) return;
      el.setAttribute(attrName, v.startsWith('/') ? QuranData.legacyBase + v : baseDir + '/' + v);
    };
    tpl.content.querySelectorAll('img[src]').forEach(img => {
      fix(img, 'src');
      img.setAttribute('loading', 'lazy');
      img.classList.add('max-w-full');
    });
    tpl.content.querySelectorAll('a[href]').forEach(a => {
      fix(a, 'href');
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener');
    });

    const div = document.createElement('div');
    div.appendChild(tpl.content);
    return div;
  }

  /* ------------------------------------------------------------------ *
   * Quick tool 1: on-screen Arabic keyboard
   * ------------------------------------------------------------------ */

  openKeyboardModal() {
    const lang = this.language;
    this.showModal(t('arabic_keyboard', lang));
    this.closeSidebar();

    const letterRows = [
      ['ا', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر'],
      ['ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف'],
      ['ق', 'ك', 'ل', 'م', 'ن', 'ه', 'و', 'ي', 'ء', 'ة'],
      ['أ', 'إ', 'آ', 'ؤ', 'ئ', 'ى', 'ٱ', 'لا']
    ];
    // Harakat & tajweed marks — labelled on a dotted-circle carrier
    const harakat = ['َ', 'ِ', 'ُ', 'ً', 'ٍ', 'ٌ', 'ْ', 'ّ', 'ٰ', 'ٓ'];

    const keyBtn = (insert, display) => `
      <button data-kb-insert="${this.esc(insert)}"
              class="kb-key min-w-[2.5rem] px-2 py-2 text-xl rounded-lg border border-gray-300 dark:border-gray-600
                     bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100
                     hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-arabic">
        ${display}
      </button>`;

    const panel = document.createElement('div');
    panel.innerHTML = `
      <div class="space-y-3">
        <textarea id="kb-output" rows="3" dir="rtl"
                  class="w-full px-4 py-3 text-2xl font-arabic leading-loose rounded-lg border
                         border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900
                         text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"></textarea>
        <div class="space-y-2" dir="rtl">
          ${letterRows.map(row => `
            <div class="flex flex-wrap gap-1.5 justify-center">
              ${row.map(ch => keyBtn(ch, ch)).join('')}
            </div>`).join('')}
          <div class="flex flex-wrap gap-1.5 justify-center">
            ${harakat.map(mark => keyBtn(mark, '◌' + mark)).join('')}
          </div>
        </div>
        <div class="flex flex-wrap items-center justify-center gap-2" dir="ltr">
          <button id="kb-space" class="px-8 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600
                       text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">␣</button>
          <button id="kb-backspace" class="px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600
                       text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">⌫</button>
          <button id="kb-clear" class="px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600
                       text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">${this.esc(t('clear', lang))}</button>
          <button id="kb-copy" class="px-4 py-2 text-sm rounded-lg bg-primary text-white hover:bg-primary/80 transition-colors">
            📋 ${this.esc(t('copy', lang))}
          </button>
        </div>
      </div>
    `;

    this.modalBody.innerHTML = '';
    this.modalBody.appendChild(panel);

    const output = panel.querySelector('#kb-output');
    const insertAtCursor = (text) => {
      const start = output.selectionStart != null ? output.selectionStart : output.value.length;
      const end = output.selectionEnd != null ? output.selectionEnd : start;
      output.value = output.value.slice(0, start) + text + output.value.slice(end);
      const pos = start + text.length;
      output.focus();
      output.setSelectionRange(pos, pos);
    };

    panel.addEventListener('click', (e) => {
      const key = e.target.closest('[data-kb-insert]');
      if (key) return insertAtCursor(key.getAttribute('data-kb-insert'));
      if (e.target.closest('#kb-space')) return insertAtCursor(' ');
      if (e.target.closest('#kb-backspace')) {
        const start = output.selectionStart != null ? output.selectionStart : output.value.length;
        const end = output.selectionEnd != null ? output.selectionEnd : start;
        if (start === end && start > 0) {
          output.value = output.value.slice(0, start - 1) + output.value.slice(end);
          output.focus();
          output.setSelectionRange(start - 1, start - 1);
        } else if (start !== end) {
          output.value = output.value.slice(0, start) + output.value.slice(end);
          output.focus();
          output.setSelectionRange(start, start);
        }
        return;
      }
      if (e.target.closest('#kb-clear')) {
        output.value = '';
        output.focus();
        return;
      }
      const copyBtn = e.target.closest('#kb-copy');
      if (copyBtn) {
        const done = () => {
          const original = copyBtn.innerHTML;
          copyBtn.textContent = '✓ ' + t('copied', this.language);
          setTimeout(() => { copyBtn.innerHTML = original; }, 1500);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(output.value).then(done).catch(() => {
            output.select();
            document.execCommand('copy');
            done();
          });
        } else {
          output.select();
          document.execCommand('copy');
          done();
        }
      }
    });
  }

  /* ------------------------------------------------------------------ *
   * Quick tool 2: waqf (stop) signs chart
   * ------------------------------------------------------------------ */

  openWaqfModal() {
    const lang = this.language;
    this.showModal(t('waqf_signs', lang));
    this.closeSidebar();

    this.modalBody.innerHTML = `
      <div class="bg-white rounded-lg p-2 text-center">
        <img id="waqf-chart" src="${this.esc(QuranData.legacyBase + '/images/stop_sign.png')}"
             class="max-w-full mx-auto" alt="${this.esc(t('waqf_signs', lang))}">
      </div>`;

    const img = this.modalBody.querySelector('#waqf-chart');
    img.addEventListener('error', () => {
      this.modalBody.innerHTML = this.fallbackHtml();
    });
  }
}

// Initialize when DOM is ready
let sidebarMenu;
document.addEventListener('DOMContentLoaded', () => {
  sidebarMenu = new SidebarMenu();

  /**
   * Override the collection banner so legacy topic intros render as
   * SANITIZED HTML instead of escaped text (they contain <br/>, styled
   * Arabic spans etc. from the old app).
   */
  if (typeof QuranApp !== 'undefined') {
    const sanitizeIntro = (html) => {
      const tpl = document.createElement('template');
      tpl.innerHTML = html;
      tpl.content.querySelectorAll('script,style,link,iframe,object,embed,form').forEach(n => n.remove());
      tpl.content.querySelectorAll('*').forEach(el => {
        [...el.attributes].forEach(attr => {
          const n = attr.name.toLowerCase();
          if (n.startsWith('on') || ((n === 'href' || n === 'src') && /^\s*javascript:/i.test(attr.value))) {
            el.removeAttribute(attr.name);
          }
        });
      });
      const div = document.createElement('div');
      div.appendChild(tpl.content);
      return div.innerHTML;
    };

    // One-time styles for the intro's legacy markup (.arabic / .text-right)
    const style = document.createElement('style');
    style.textContent = `
      .collection-intro { line-height: 1.9; }
      .collection-intro .arabic { font-family: 'CustomArabic', 'Amiri', serif; font-size: 1.5em; direction: rtl; }
      .collection-intro .text-right { text-align: right; direction: rtl; display: block; margin: .4rem 0; }
    `;
    document.head.appendChild(style);

    QuranApp.prototype.renderCollectionBanner = function (lang) {
      const ctx = this.collectionContext;
      if (!ctx || !ctx.t) return '';
      const escape = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      const showIntro = ctx.i && lang === 'bn';
      return `
        <div class="bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-blue-900/30 dark:to-emerald-900/20
                    border border-primary/20 dark:border-blue-800 rounded-lg p-5">
          <h2 class="text-lg font-bold text-primary dark:text-blue-300" dir="auto">${escape(ctx.t)}
            <span class="text-sm font-normal text-gray-500 dark:text-gray-400">· ${this.ayahData.length} ${t('verses', lang)}</span>
          </h2>
          ${showIntro ? `<div class="collection-intro mt-2 text-sm text-gray-700 dark:text-gray-300" dir="auto">${sanitizeIntro(ctx.i)}</div>` : ''}
        </div>
      `;
    };
  }
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SidebarMenu };
}
