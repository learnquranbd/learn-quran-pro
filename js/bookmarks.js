/**
 * Bookmarks (saved verses) + Continue reading
 *
 * - Star toggle on every ayah card persists a verse key ("s:a") to
 *   localStorage 'bookmarks' (deduped array, insertion order).
 * - On the empty reading view (no verses loaded) shows, above the ponder
 *   card, a "Continue reading" button (last read range) and a rich "Your
 *   bookmarks" panel. Disappears the moment real verses are loaded.
 * - Enrichments layered on top of the original star flow:
 *     • Named collections/folders — assign each bookmark to a collection
 *       and move it between them; filter chips (with counts) per collection.
 *     • Per-bookmark notes (📝) — inline editor, kept in 'bookmarkNotes'.
 *     • Live search over surah name / key / note / collection, with an
 *       empty state when nothing matches.
 *     • Sort: most-recent (insertion order) or by surah:ayah. Persisted.
 *     • Backup: copy everything (bookmarks + notes + collections) as JSON,
 *       and import/merge a pasted JSON backup. Plus a plain-text copy.
 *     • Count badge in the header.
 * - All UI strings go through t(); resilient if localStorage is unavailable.
 */

class Bookmarks {
  constructor() {
    this.container = document.getElementById('ayah-container');
    if (!this.container) return; // DOM hook missing — bail like other modules

    this.language = (typeof appSettings !== 'undefined' && appSettings)
      ? appSettings.get('language') : 'en';

    // Panel view state (session-only, except sort which is persisted)
    this.editingNote = null;        // key whose note editor is open
    this.editingCollection = null;  // key whose collection editor is open
    this.query = '';                // live search text
    this.activeCollection = null;   // collection filter (null = All)
    this.importing = false;         // import panel open?
    this.sortMode = this.read('bookmarkSort', 'recent'); // 'recent' | 'surah'

    // Local fallback for NEW i18n keys not yet merged into translations.js;
    // t() returns the raw key when missing, so fb() substitutes a readable
    // string until the keys land. (Reported alongside this change.)
    this.FB = {
      en: {
        recently_read: 'Recently read',
        jump_to_ayah: 'Go',
        jump_placeholder: 'Jump to ayah, e.g. 2:255',
      },
      bn: {
        recently_read: 'সম্প্রতি পঠিত',
        jump_to_ayah: 'যান',
        jump_placeholder: 'আয়াতে যান, যেমন ২:২৫৫',
      },
    };

    // Toggle stars + strip controls (own delegated listener on the container)
    this.container.addEventListener('click', (e) => this.onClick(e));

    // Every time verses render: remember where we are + light up saved stars
    window.addEventListener('ayahsLoaded', (e) => {
      this.language = e.detail.language || this.language;
      this.saveLastRead(e.detail.ayahs);
      this.reflectStates();
      // Verses are showing now → the empty-view strip is not relevant.
    });

    window.addEventListener('settingChanged', (e) => {
      if (e.detail.key === 'language') {
        this.language = e.detail.value;
        this.scheduleStrip();
      }
    });

    // Initial empty-view strip. Only when nothing is being loaded from the
    // hash; deferred so ponder.js renders its card first (we insert above it).
    if (!window.location.hash.slice(1)) this.scheduleStrip();
  }

  /* --------------------------------------------------------- storage */

  read(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return fallback;
      const val = JSON.parse(raw);
      return val == null ? fallback : val;
    } catch (err) {
      return fallback;
    }
  }

  write(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) { /* private mode / quota — in-memory only */ }
  }

  /** Translate a (possibly new) key with a local en/bn fallback. */
  fb(key, lang) {
    let s = t(key, lang);
    if (s === key) s = (this.FB[lang] && this.FB[lang][key]) || this.FB.en[key] || key;
    return s;
  }

  getBookmarks() {
    const val = this.read('bookmarks', []);
    return Array.isArray(val) ? val.filter(k => typeof k === 'string') : [];
  }

  isBookmarked(key) {
    return this.getBookmarks().indexOf(key) !== -1;
  }

  /** Add/remove a verse key; returns the new state (true = bookmarked). */
  toggle(key) {
    const list = this.getBookmarks();
    const i = list.indexOf(key);
    let on;
    if (i === -1) { list.push(key); on = true; }
    else { list.splice(i, 1); on = false; this.forget(key); }
    this.write('bookmarks', list);
    this.scheduleStrip();
    return on;
  }

  remove(key) {
    const list = this.getBookmarks().filter(k => k !== key);
    this.write('bookmarks', list);
    this.forget(key);
    this.scheduleStrip();
  }

  /** Drop a removed bookmark's note + collection so they don't linger. */
  forget(key) {
    const notes = this.read('bookmarkNotes', {});
    if (key in notes) { delete notes[key]; this.write('bookmarkNotes', notes); }
    const colls = this.read('bookmarkCollections', {});
    if (key in colls) { delete colls[key]; this.write('bookmarkCollections', colls); }
  }

  /** Assign (or clear, when name is empty) the collection for a bookmark. */
  setCollection(key, name) {
    const colls = this.read('bookmarkCollections', {});
    const v = String(name || '').trim().slice(0, 40);
    if (v) colls[key] = v; else delete colls[key];
    this.write('bookmarkCollections', colls);
  }

  /** Sorted list of distinct collection names in use by current bookmarks. */
  collectionNames(colls) {
    const set = new Set(this.getBookmarks());
    const names = new Set();
    Object.keys(colls || {}).forEach(k => {
      if (set.has(k) && colls[k]) names.add(colls[k]);
    });
    return Array.from(names).sort((a, b) => a.localeCompare(b));
  }

  saveLastRead(ayahs) {
    if (!Array.isArray(ayahs) || !ayahs.length) return;
    const raw = window.location.hash.slice(1);
    let hash;
    try { hash = decodeURIComponent(raw); } catch (e) { hash = raw; }   // tolerate malformed %-sequences
    if (!hash) return;
    const first = ayahs[0];
    const last = ayahs[ayahs.length - 1];
    const name = this.localSurahName(first.surah);
    const range = ayahs.length > 1 ? `${first.ayah}–${last.ayah}` : `${first.ayah}`;
    const label = `${name} ${range}`.trim();
    this.write('lastRead', { hash, label });

    // Recent-read history: newest first, deduped by hash, capped.
    const prev = this.read('recentReads', []);
    const arr = Array.isArray(prev) ? prev.filter(x => x && x.hash && x.hash !== hash) : [];
    arr.unshift({ hash, label, at: Date.now() });
    this.write('recentReads', arr.slice(0, 8));
  }

  /* --------------------------------------------------------- helpers */

  localSurahName(num) {
    if (typeof getSurahByNumber !== 'function') return '';
    const s = getSurahByNumber(num);
    if (!s) return '';
    return (s.names && (s.names[this.language] || s.names.en)) || s.arabicName || '';
  }

  escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  /** Numeric surah:ayah comparator for the "by surah" sort. */
  byKey(a, b) {
    const pa = a.split(':'), pb = b.split(':');
    return (parseInt(pa[0], 10) - parseInt(pb[0], 10))
        || (parseInt(pa[1], 10) - parseInt(pb[1], 10));
  }

  /* --------------------------------------------------------- stars */

  /** Reflect saved state on every star button currently in the container. */
  reflectStates() {
    const set = new Set(this.getBookmarks());
    this.container.querySelectorAll('.bookmark-ayah').forEach(btn => {
      const on = set.has(btn.getAttribute('data-key'));
      btn.textContent = on ? '★' : '☆'; // ★ / ☆
      btn.classList.toggle('text-yellow-500', on);
      btn.setAttribute('title', t(on ? 'remove_bookmark' : 'bookmark', this.language));
    });
  }

  onClick(e) {
    const star = e.target.closest('.bookmark-ayah');
    if (star) {
      const key = star.getAttribute('data-key');
      const on = this.toggle(key);
      star.textContent = on ? '★' : '☆';
      star.classList.toggle('text-yellow-500', on);
      star.setAttribute('title', t(on ? 'remove_bookmark' : 'bookmark', this.language));
      return;
    }

    const remove = e.target.closest('.bm-remove');
    if (remove) {
      e.preventDefault();
      this.remove(remove.getAttribute('data-key'));
      return;
    }

    const open = e.target.closest('.bm-open');
    if (open) {
      e.preventDefault();
      window.location.hash = open.getAttribute('data-key');
      return;
    }

    const cont = e.target.closest('#bm-continue');
    if (cont) {
      e.preventDefault();
      window.location.hash = cont.getAttribute('data-hash');
      return;
    }

    // Recent-read chip → jump back to that range
    const recent = e.target.closest('.bm-recent');
    if (recent) {
      e.preventDefault();
      window.location.hash = recent.getAttribute('data-hash');
      return;
    }

    // Jump-to-ayah button
    const jump = e.target.closest('#bm-jump');
    if (jump) {
      e.preventDefault();
      this.doJump();
      return;
    }

    // Per-bookmark note: toggle editor / save
    const noteBtn = e.target.closest('.bm-note');
    if (noteBtn) {
      e.preventDefault();
      const key = noteBtn.getAttribute('data-key');
      this.editingNote = this.editingNote === key ? null : key;
      this.editingCollection = null;
      this.renderStrip();
      const input = document.getElementById('bm-note-input');
      if (input) { input.focus(); input.setSelectionRange(input.value.length, input.value.length); }
      return;
    }
    const saveBtn = e.target.closest('.bm-note-save');
    if (saveBtn) {
      e.preventDefault();
      this.saveNote(saveBtn.getAttribute('data-key'));
      return;
    }

    // Per-bookmark collection: toggle editor / pick an existing / save typed
    const collBtn = e.target.closest('.bm-collection');
    if (collBtn) {
      e.preventDefault();
      const key = collBtn.getAttribute('data-key');
      this.editingCollection = this.editingCollection === key ? null : key;
      this.editingNote = null;
      this.renderStrip();
      const input = document.getElementById('bm-collection-input');
      if (input) { input.focus(); input.setSelectionRange(input.value.length, input.value.length); }
      return;
    }
    const collPick = e.target.closest('.bm-collection-pick');
    if (collPick) {
      e.preventDefault();
      this.setCollection(collPick.getAttribute('data-key'), collPick.getAttribute('data-name'));
      this.editingCollection = null;
      this.renderStrip();
      return;
    }
    const collSave = e.target.closest('.bm-collection-save');
    if (collSave) {
      e.preventDefault();
      const input = document.getElementById('bm-collection-input');
      this.setCollection(collSave.getAttribute('data-key'), input ? input.value : '');
      this.editingCollection = null;
      this.renderStrip();
      return;
    }

    // Collection filter chips
    const chip = e.target.closest('.bm-chip');
    if (chip) {
      e.preventDefault();
      const coll = chip.getAttribute('data-coll') || '';
      this.activeCollection = coll || null;
      this.renderStrip();
      return;
    }

    // Sort toggle (recent ⇄ by surah)
    const sortBtn = e.target.closest('#bm-sort');
    if (sortBtn) {
      e.preventDefault();
      this.sortMode = this.sortMode === 'surah' ? 'recent' : 'surah';
      this.write('bookmarkSort', this.sortMode);
      this.renderStrip();
      return;
    }

    // Copy all bookmarks (+ notes) as plain text
    const exp = e.target.closest('#bm-export');
    if (exp) {
      e.preventDefault();
      const notes = this.read('bookmarkNotes', {});
      const text = this.getBookmarks().map(k => {
        const name = this.localSurahName(parseInt(k.split(':')[0], 10));
        return `${name} ${k}${notes[k] ? ' — ' + notes[k] : ''}`;
      }).join('\n');
      this.copy(exp, text, '📋');
      return;
    }

    // Copy full backup as JSON
    const expJson = e.target.closest('#bm-export-json');
    if (expJson) {
      e.preventDefault();
      const data = {
        version: 1,
        bookmarks: this.getBookmarks(),
        notes: this.read('bookmarkNotes', {}),
        collections: this.read('bookmarkCollections', {}),
      };
      this.copy(expJson, JSON.stringify(data, null, 2), '{ }');
      return;
    }

    // Toggle the import panel
    const impBtn = e.target.closest('#bm-import');
    if (impBtn) {
      e.preventDefault();
      this.importing = !this.importing;
      this.renderStrip();
      const ta = document.getElementById('bm-import-input');
      if (ta) ta.focus();
      return;
    }
    const impApply = e.target.closest('#bm-import-apply');
    if (impApply) {
      e.preventDefault();
      this.applyImport();
      return;
    }
  }

  /** Copy text to the clipboard and flash a ✓ on the given button. */
  copy(btn, text, restore) {
    if (!navigator.clipboard || !navigator.clipboard.writeText) return;
    navigator.clipboard.writeText(text).then(() => {
      btn.textContent = '✓';
      setTimeout(() => { btn.textContent = restore; }, 1200);
    }).catch(() => {});
  }

  /** Navigate to a "s:a" typed into the jump box (ignores invalid input). */
  doJump() {
    const inp = document.getElementById('bm-jump-input');
    if (!inp) return;
    const m = String(inp.value).trim().match(/^(\d+)\s*:\s*(\d+)$/);
    if (!m) return;
    window.location.hash = `${m[1]}:${m[2]}`;
  }

  saveNote(key) {
    const input = document.getElementById('bm-note-input');
    if (!input) return;
    const notes = this.read('bookmarkNotes', {});
    const val = input.value.trim();
    if (val) notes[key] = val; else delete notes[key];
    this.write('bookmarkNotes', notes);
    this.editingNote = null;
    this.renderStrip();
  }

  /** Merge a pasted JSON backup into the current bookmarks. */
  applyImport() {
    const input = document.getElementById('bm-import-input');
    const msg = document.getElementById('bm-import-msg');
    if (!input) return;
    let data;
    try { data = JSON.parse(input.value); } catch (e) {
      if (msg) msg.textContent = t('import_failed', this.language);
      return;
    }
    const incoming = Array.isArray(data) ? { bookmarks: data } : (data || {});
    const keyRe = /^\d+:\d+$/;

    const list = this.getBookmarks();
    (Array.isArray(incoming.bookmarks) ? incoming.bookmarks : [])
      .forEach(k => { if (typeof k === 'string' && keyRe.test(k) && list.indexOf(k) === -1) list.push(k); });
    this.write('bookmarks', list);

    if (incoming.notes && typeof incoming.notes === 'object') {
      const notes = this.read('bookmarkNotes', {});
      Object.keys(incoming.notes).forEach(k => {
        if (keyRe.test(k) && typeof incoming.notes[k] === 'string') notes[k] = incoming.notes[k].slice(0, 200);
      });
      this.write('bookmarkNotes', notes);
    }
    if (incoming.collections && typeof incoming.collections === 'object') {
      const colls = this.read('bookmarkCollections', {});
      Object.keys(incoming.collections).forEach(k => {
        if (keyRe.test(k) && typeof incoming.collections[k] === 'string') colls[k] = incoming.collections[k].slice(0, 40);
      });
      this.write('bookmarkCollections', colls);
    }

    this.importing = false;
    this.renderStrip();
  }

  /* --------------------------------------------------------- empty-view strip */

  scheduleStrip() {
    // Defer so ponder.js (or a language-change re-render) settles first,
    // then we insert our strip above the ponder card.
    setTimeout(() => this.renderStrip(), 0);
  }

  buildStripHtml() {
    const lang = this.language;
    const lastRead = this.read('lastRead', null);
    const bookmarks = this.getBookmarks();
    if ((!lastRead || !lastRead.hash) && !bookmarks.length) return '';

    let inner = '';

    if (lastRead && lastRead.hash) {
      inner += `
        <button id="bm-continue" data-hash="${this.escapeHtml(lastRead.hash)}"
                class="w-full flex items-center gap-2 px-4 py-3 rounded-lg text-start
                       bg-primary/10 dark:bg-blue-900/30 border border-primary/20 dark:border-blue-800
                       text-primary dark:text-blue-300 hover:bg-primary/20 dark:hover:bg-blue-900/50 transition-colors">
          <span>↪️</span>
          <span class="font-medium">${t('continue_reading', lang)}:</span>
          <span class="truncate" dir="auto">${this.escapeHtml(lastRead.label || lastRead.hash)}</span>
        </button>`;
    }

    inner += this.buildRecentHtml(lang, lastRead);
    inner += this.buildJumpHtml(lang);

    if (bookmarks.length) inner += this.buildBookmarksSection(lang, bookmarks);

    return `
      <div id="bookmarks-strip"
           class="w-full mt-6 mb-2 rounded-2xl bg-white dark:bg-gray-800 shadow px-4 py-4
                  border border-gray-100 dark:border-gray-700">
        ${inner}
      </div>`;
  }

  /** Chips for previously-read ranges (excludes the one shown as Continue). */
  buildRecentHtml(lang, lastRead) {
    const hist = this.read('recentReads', []);
    if (!Array.isArray(hist)) return '';
    const topHash = lastRead && lastRead.hash;
    const items = hist
      .filter(x => x && x.hash && x.hash !== topHash)
      .slice(0, 6);
    if (!items.length) return '';
    const chips = items.map(x => `
      <button class="bm-recent px-2.5 py-1 rounded-full text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-primary hover:text-white transition-colors truncate max-w-[11rem]"
              data-hash="${this.escapeHtml(x.hash)}" dir="auto">${this.escapeHtml(x.label || x.hash)}</button>`).join('');
    return `
      <div class="mt-3">
        <h3 class="text-xs uppercase font-semibold text-gray-400 dark:text-gray-500 mb-2 px-1">🕘 ${this.fb('recently_read', lang)}</h3>
        <div class="flex flex-wrap gap-1.5">${chips}</div>
      </div>`;
  }

  /** Quick "go to any ayah by s:a" input. */
  buildJumpHtml(lang) {
    return `
      <div class="mt-3 flex items-center gap-2">
        <input id="bm-jump-input" type="text" dir="ltr" inputmode="text"
               placeholder="${this.escapeHtml(this.fb('jump_placeholder', lang))}"
               class="flex-1 min-w-0 px-3 py-1.5 text-sm rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/60 focus:outline-none focus:ring-2 focus:ring-primary">
        <button id="bm-jump" class="px-3 py-1.5 text-sm rounded-lg bg-primary text-white hover:bg-primary/80 whitespace-nowrap">↪ ${this.fb('jump_to_ayah', lang)}</button>
      </div>`;
  }

  buildBookmarksSection(lang, bookmarks) {
    const notes = this.read('bookmarkNotes', {});
    const colls = this.read('bookmarkCollections', {});
    const names = this.collectionNames(colls);

    // Guard the active filter against a collection that no longer exists.
    if (this.activeCollection && names.indexOf(this.activeCollection) === -1) this.activeCollection = null;

    // Sort (a copy — never mutate stored insertion order)
    let list = bookmarks.slice();
    if (this.sortMode === 'surah') list.sort((a, b) => this.byKey(a, b));

    // Collection filter
    const filtered = this.activeCollection
      ? list.filter(k => colls[k] === this.activeCollection)
      : list;

    const rows = filtered.map(key => this.buildRow(key, lang, notes, colls, names)).join('');

    // Header: title + count badge + action buttons
    const header = `
      <h3 class="text-xs uppercase font-semibold text-gray-400 dark:text-gray-500 mb-2 px-1 flex items-center gap-1">
        <span>★ ${t('your_bookmarks', lang)}</span>
        <span class="normal-case px-1.5 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300 text-[10px] font-medium">${bookmarks.length}</span>
        <button id="bm-sort" class="ml-auto p-1.5 rounded normal-case font-medium text-gray-400 hover:text-primary dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-0.5"
                title="${t('sort_by', lang)}" aria-label="${t('sort_by', lang)}">↕ <span class="hidden sm:inline">${t(this.sortMode === 'surah' ? 'sort_surah' : 'sort_recent', lang)}</span></button>
        <button id="bm-export-json" class="p-1.5 rounded text-gray-400 hover:text-primary dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 normal-case font-mono" title="${t('export_json', lang)}" aria-label="${t('export_json', lang)}">{ }</button>
        <button id="bm-import" class="p-1.5 rounded normal-case ${this.importing ? 'text-primary dark:text-blue-400' : 'text-gray-400'} hover:text-primary dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700" title="${t('import_bookmarks', lang)}" aria-label="${t('import_bookmarks', lang)}">📥</button>
        <button id="bm-export" class="p-1.5 rounded text-gray-400 hover:text-primary dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 normal-case" title="${t('copy', lang)}" aria-label="${t('copy', lang)}">📋</button>
      </h3>`;

    // Search box
    const searchBox = `
      <input id="bm-search" type="text" value="${this.escapeHtml(this.query)}" dir="auto"
             placeholder="${t('search_bookmarks', lang)}"
             class="w-full mb-2 px-3 py-1.5 text-sm rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/60 focus:outline-none focus:ring-2 focus:ring-primary">`;

    // Collection filter chips (only when at least one collection exists)
    let chips = '';
    if (names.length) {
      const chip = (label, coll, count, active) => `
        <button class="bm-chip px-2 py-0.5 rounded-full text-xs whitespace-nowrap transition-colors
                       ${active ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}"
                data-coll="${this.escapeHtml(coll)}">${this.escapeHtml(label)} <span class="opacity-70">${count}</span></button>`;
      const counts = {};
      list.forEach(k => { const c = colls[k]; if (c) counts[c] = (counts[c] || 0) + 1; });
      chips = `<div class="flex flex-wrap gap-1 mb-2">
        ${chip(t('bm_all', lang), '', list.length, !this.activeCollection)}
        ${names.map(n => chip(n, n, counts[n] || 0, this.activeCollection === n)).join('')}
      </div>`;
    }

    // Import panel
    const importPanel = this.importing ? `
      <div class="mb-2 p-2 rounded-lg bg-gray-50 dark:bg-gray-700/60 border border-gray-200 dark:border-gray-600">
        <textarea id="bm-import-input" rows="3" dir="ltr"
                  placeholder="${t('import_paste', lang)}"
                  class="w-full px-2 py-1 text-xs font-mono rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"></textarea>
        <div class="flex items-center gap-2 mt-1">
          <button id="bm-import-apply" class="px-2 py-1 text-xs rounded-md bg-primary text-white hover:bg-primary/80">${t('import_apply', lang)}</button>
          <span id="bm-import-msg" class="text-xs text-red-500"></span>
        </div>
      </div>` : '';

    const emptyState = `
      <p id="bm-empty" class="hidden text-center text-sm text-gray-400 dark:text-gray-500 py-4">${t('no_results', lang)}</p>`;

    return `
      <div class="mt-3">
        ${header}
        ${searchBox}
        ${chips}
        ${importPanel}
        <div class="space-y-1">${rows}</div>
        ${emptyState}
      </div>`;
  }

  buildRow(key, lang, notes, colls, names) {
    const num = parseInt(key.split(':')[0], 10);
    const name = this.localSurahName(num);
    const note = notes[key] || '';
    const coll = colls[key] || '';
    const editingNote = this.editingNote === key;
    const editingColl = this.editingCollection === key;
    // Lowercased haystack for the live search (name + key + note + collection)
    const hay = `${name} ${key} ${note} ${coll}`.toLowerCase();

    const collPicks = names.filter(n => n !== coll).map(n =>
      `<button class="bm-collection-pick px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-gray-600 hover:bg-primary hover:text-white"
               data-key="${this.escapeHtml(key)}" data-name="${this.escapeHtml(n)}">${this.escapeHtml(n)}</button>`).join('');

    return `
      <div class="bm-row px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/60 transition-colors" data-search="${this.escapeHtml(hay)}">
        <div class="flex items-center gap-2">
          <button class="bm-open flex-1 flex items-baseline gap-2 text-start min-w-0" data-key="${this.escapeHtml(key)}">
            <span class="text-yellow-500">★</span>
            <span class="truncate text-gray-700 dark:text-gray-200" dir="auto">${this.escapeHtml(name)}</span>
            <span class="text-xs text-gray-400 dark:text-gray-500 shrink-0">${this.escapeHtml(key)}</span>
            ${coll ? `<span class="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary dark:bg-blue-900/40 dark:text-blue-300 shrink-0 truncate max-w-[8rem]" dir="auto">${this.escapeHtml(coll)}</span>` : ''}
          </button>
          <button class="bm-collection p-2 rounded-lg ${coll ? 'text-primary dark:text-blue-400' : 'text-gray-400'} hover:text-primary dark:hover:text-blue-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                  data-key="${this.escapeHtml(key)}" title="${t('move_to_collection', lang)}" aria-label="${t('move_to_collection', lang)}">📁</button>
          <button class="bm-note p-2 rounded-lg ${note ? 'text-amber-500' : 'text-gray-400'} hover:text-amber-500 hover:bg-gray-200 dark:hover:bg-gray-600"
                  data-key="${this.escapeHtml(key)}" title="${t('bookmark_note', lang)}" aria-label="${t('bookmark_note', lang)}">📝</button>
          <button class="bm-remove p-2 rounded-lg text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                  data-key="${this.escapeHtml(key)}" title="${t('remove_bookmark', lang)}" aria-label="${t('remove_bookmark', lang)}">✕</button>
        </div>
        ${!editingNote && note ? `<p class="ml-7 mt-0.5 text-xs italic text-gray-500 dark:text-gray-400" dir="auto">${this.escapeHtml(note)}</p>` : ''}
        ${editingNote ? `
          <div class="ml-7 mt-1 flex items-center gap-1">
            <input id="bm-note-input" type="text" value="${this.escapeHtml(note)}" maxlength="200" dir="auto"
                   class="flex-1 px-2 py-1 text-xs rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary">
            <button class="bm-note-save px-2.5 py-1.5 text-xs rounded-md bg-primary text-white hover:bg-primary/80" data-key="${this.escapeHtml(key)}" title="${t('ponder_save', lang)}" aria-label="${t('ponder_save', lang)}">✓</button>
          </div>` : ''}
        ${editingColl ? `
          <div class="ml-7 mt-1">
            <div class="flex items-center gap-1">
              <input id="bm-collection-input" type="text" value="${this.escapeHtml(coll)}" maxlength="40" dir="auto"
                     placeholder="${t('new_collection', lang)}"
                     class="flex-1 px-2 py-1 text-xs rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary">
              <button class="bm-collection-save px-2.5 py-1.5 text-xs rounded-md bg-primary text-white hover:bg-primary/80" data-key="${this.escapeHtml(key)}" title="${t('ponder_save', lang)}" aria-label="${t('ponder_save', lang)}">✓</button>
            </div>
            ${collPicks ? `<div class="flex flex-wrap gap-1 mt-1">${collPicks}</div>` : ''}
          </div>` : ''}
      </div>`;
  }

  /** Hide rows that don't match the live search; toggle the empty state. */
  applySearch() {
    const strip = document.getElementById('bookmarks-strip');
    if (!strip) return;
    const q = (this.query || '').trim().toLowerCase();
    const rows = strip.querySelectorAll('.bm-row');
    let visible = 0;
    rows.forEach(r => {
      const show = !q || (r.getAttribute('data-search') || '').indexOf(q) !== -1;
      r.classList.toggle('hidden', !show);
      if (show) visible++;
    });
    const empty = strip.querySelector('#bm-empty');
    if (empty) empty.classList.toggle('hidden', visible !== 0 || rows.length === 0);
  }

  renderStrip() {
    if (!this.container) return;
    // Never clobber loaded verses.
    if (this.container.querySelector('.ayah-card')) return;

    const existing = document.getElementById('bookmarks-strip');
    if (existing) existing.remove();

    const html = this.buildStripHtml();
    if (!html) return;

    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    const strip = tmp.firstElementChild;
    if (!strip) return;

    const ponder = document.getElementById('ponder-card');
    if (ponder && ponder.parentElement) {
      ponder.parentElement.insertBefore(strip, ponder);
    } else {
      this.container.insertBefore(strip, this.container.firstChild);
    }

    // Live search — filter without re-rendering (preserves focus/caret)
    const search = strip.querySelector('#bm-search');
    if (search) search.addEventListener('input', () => {
      this.query = search.value;
      this.applySearch();
    });

    // Enter saves the note being edited
    const noteInput = strip.querySelector('#bm-note-input');
    if (noteInput) noteInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); this.saveNote(this.editingNote); }
      if (e.key === 'Escape') { this.editingNote = null; this.renderStrip(); }
    });

    // Enter saves the collection being edited
    const collInput = strip.querySelector('#bm-collection-input');
    if (collInput) collInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); this.setCollection(this.editingCollection, collInput.value); this.editingCollection = null; this.renderStrip(); }
      if (e.key === 'Escape') { this.editingCollection = null; this.renderStrip(); }
    });

    // Enter jumps to the typed ayah
    const jumpInput = strip.querySelector('#bm-jump-input');
    if (jumpInput) jumpInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); this.doJump(); }
    });

    // Apply any existing search term to the freshly rendered rows
    this.applySearch();
  }
}

// Initialize when DOM is ready
let bookmarks;
document.addEventListener('DOMContentLoaded', () => {
  bookmarks = new Bookmarks();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Bookmarks };
}
