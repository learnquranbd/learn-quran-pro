/**
 * Bookmarks (saved verses) + Continue reading
 *
 * - Star toggle on every ayah card persists a verse key ("s:a") to
 *   localStorage 'bookmarks' (deduped array, insertion order).
 * - On the empty reading view (no verses loaded) shows, above the ponder
 *   card, a "Continue reading" button (last read range) and a "Your
 *   bookmarks" list. Disappears the moment real verses are loaded.
 * - All UI strings go through t(); resilient if localStorage is unavailable.
 */

class Bookmarks {
  constructor() {
    this.container = document.getElementById('ayah-container');
    if (!this.container) return; // DOM hook missing — bail like other modules

    this.language = (typeof appSettings !== 'undefined' && appSettings)
      ? appSettings.get('language') : 'en';

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
    else { list.splice(i, 1); on = false; }
    this.write('bookmarks', list);
    this.scheduleStrip();
    return on;
  }

  remove(key) {
    const list = this.getBookmarks().filter(k => k !== key);
    this.write('bookmarks', list);
    this.scheduleStrip();
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
    this.write('lastRead', { hash, label: `${name} ${range}`.trim() });
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
    }
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

    if (bookmarks.length) {
      const rows = bookmarks.map(key => {
        const num = parseInt(key.split(':')[0], 10);
        const name = this.localSurahName(num);
        return `
          <div class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/60 transition-colors">
            <button class="bm-open flex-1 flex items-baseline gap-2 text-start min-w-0" data-key="${this.escapeHtml(key)}">
              <span class="text-yellow-500">★</span>
              <span class="truncate text-gray-700 dark:text-gray-200" dir="auto">${this.escapeHtml(name)}</span>
              <span class="text-xs text-gray-400 dark:text-gray-500 shrink-0">${this.escapeHtml(key)}</span>
            </button>
            <button class="bm-remove p-1 rounded text-gray-400 hover:text-red-500 hover:bg-gray-200 dark:hover:bg-gray-600"
                    data-key="${this.escapeHtml(key)}" title="${t('remove_bookmark', lang)}">✕</button>
          </div>`;
      }).join('');

      inner += `
        <div class="mt-3">
          <h3 class="text-xs uppercase font-semibold text-gray-400 dark:text-gray-500 mb-2 px-1">
            ★ ${t('your_bookmarks', lang)}
          </h3>
          <div class="space-y-1">${rows}</div>
        </div>`;
    }

    return `
      <div id="bookmarks-strip"
           class="max-w-3xl mx-auto mt-6 mb-2 rounded-2xl bg-white dark:bg-gray-800 shadow px-4 py-4
                  border border-gray-100 dark:border-gray-700">
        ${inner}
      </div>`;
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
