/**
 * Shared in-module Ayah modal.
 *
 * Lets any module preview a verse WITHOUT leaving that module: shows the verse
 * word-by-word (each word playable, the relevant word highlighted), a play-full-
 * ayah button, and an explicit "Read full ayah" button that IS the only thing
 * that navigates to the Reading tab. Use: ayahModal.open('2:255', { word: 'ٱللَّهُ' }).
 */

class AyahModal {
  constructor() {
    this.overlay = null;
    this.audio = null;
  }

  tt(key) {
    const lang = (typeof appSettings !== 'undefined' && appSettings) ? appSettings.get('language') : 'en';
    return (typeof t === 'function') ? t(key, lang) : key;
  }

  ensure() {
    if (this.overlay) return;
    this.overlay = document.createElement('div');
    this.overlay.id = 'shared-ayah-modal';
    this.overlay.className = 'fixed inset-0 bg-black/60 z-[80] hidden items-center justify-center p-4';
    this.overlay.innerHTML = `
      <div role="dialog" aria-modal="true" class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-xl max-h-[85vh] flex flex-col">
        <div class="flex items-center gap-2 px-5 py-3 border-b border-gray-200 dark:border-gray-700">
          <h3 id="sam-title" class="flex-1 font-bold text-gray-800 dark:text-gray-100 truncate"></h3>
          <button id="sam-close" class="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700">✕</button>
        </div>
        <div id="sam-body" class="flex-1 overflow-y-auto p-5"></div>
      </div>`;
    document.body.appendChild(this.overlay);
    this.titleEl = this.overlay.querySelector('#sam-title');
    this.bodyEl = this.overlay.querySelector('#sam-body');
    this.overlay.querySelector('#sam-close').addEventListener('click', () => this.close());
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.overlay && !this.overlay.classList.contains('hidden')) this.close();
    });
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) { this.close(); return; }
      const wp = e.target.closest('[data-word-audio]');
      if (wp) { this.play(wp.getAttribute('data-word-audio')); return; }
      const fp = e.target.closest('[data-ayah-audio]');
      if (fp) { this.play(fp.getAttribute('data-ayah-audio')); return; }
      const rd = e.target.closest('[data-read-full]');
      if (rd) {
        const ref = rd.getAttribute('data-read-full');
        this.close();
        if (typeof tabSystem !== 'undefined' && tabSystem) tabSystem.switchTab('reading');
        if (window.location.hash.slice(1) === encodeURIComponent(ref)) window.dispatchEvent(new HashChangeEvent('hashchange'));
        else window.location.hash = ref;
      }
    });
  }

  play(src) { if (!this.audio) this.audio = new Audio(); this.audio.src = src; this.audio.play().catch(() => {}); }
  close() {
    if (this.audio) { this.audio.pause(); }
    if (this.overlay) { this.overlay.classList.add('hidden'); this.overlay.classList.remove('flex'); }
  }
  esc(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

  async open(ref, opts) {
    opts = opts || {};
    this.ensure();
    this.overlay.classList.remove('hidden'); this.overlay.classList.add('flex');
    this.titleEl.textContent = ref;
    this.bodyEl.innerHTML = `<p class="text-center text-gray-400 py-8">${this.tt('loading')}</p>`;
    const lang = (typeof appSettings !== 'undefined' && appSettings) ? appSettings.get('language') : 'en';
    try {
      const [s, a] = ref.split(':').map(Number);
      const v = (await QuranData.fetchRange(s, a, a, lang))[0];
      if (!v) throw new Error('nf');
      this.titleEl.textContent = `${v.surahName || ''} ${v.key}`;
      const norm = x => (QuranData.normalizeWord ? QuranData.normalizeWord(x || '') : String(x || ''));
      const target = opts.word ? norm(opts.word) : null;
      const wbw = (v.words || []).map(w => {
        const hit = target && (norm(w.arabic) === target || (w.arabic || '').indexOf(opts.word) >= 0);
        const canPlay = !!w.audio;
        return `<button ${canPlay ? `data-word-audio="${this.esc(w.audio)}"` : ''}
                  class="inline-flex flex-col items-center px-2 py-1 my-1 rounded-lg ${canPlay ? 'hover:bg-blue-50 dark:hover:bg-gray-700 cursor-pointer' : ''} ${hit ? 'ring-2 ring-amber-400 bg-amber-50 dark:bg-amber-500/10' : ''}">
                  <span class="ayah-arabic !text-2xl block">${w.arabic}</span>
                  <span class="text-[11px] text-gray-500 dark:text-gray-400 block" dir="auto">${w.meaning || ''}</span>
                </button>`;
      }).join('');
      const pad = n => String(n).padStart(3, '0');
      this.bodyEl.innerHTML = `
        <div class="ayah-arabic !text-3xl !leading-loose text-center mb-3" dir="rtl">${v.arabic}</div>
        <p class="text-xs text-center text-gray-400 mb-2">${this.tt('tap_word_to_hear')}</p>
        <div class="flex flex-wrap justify-center gap-x-1 mb-3" dir="rtl">${wbw}</div>
        <p class="text-center text-gray-600 dark:text-gray-300 mb-4" dir="auto">${v.translation || ''}</p>
        <div class="flex flex-wrap justify-center gap-2">
          <button data-ayah-audio="https://everyayah.com/data/Alafasy_128kbps/${pad(s)}${pad(a)}.mp3"
                  class="px-4 py-2 rounded-lg bg-primary text-white text-sm hover:bg-primary/80">🔊 ${this.tt('play_full_ayah')}</button>
          <button data-read-full="${v.key}"
                  class="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">📖 ${this.tt('read_full_ayah')}</button>
        </div>`;
    } catch (e) {
      this.bodyEl.innerHTML = `<p class="text-center text-gray-500 dark:text-gray-400 py-8">${this.tt('error')}</p>`;
    }
  }
}

let ayahModal;
document.addEventListener('DOMContentLoaded', () => { ayahModal = new AyahModal(); });

/**
 * Shared helper: close a modal overlay when Escape is pressed while it is visible.
 * Modules call this once when they create their overlay.
 *   window.escClose(this.overlay, () => this.close());
 * `overlay` is the element that carries the `hidden` class when closed.
 */
window.escClose = function (overlay, closeFn) {
  if (!overlay || typeof closeFn !== 'function') return;
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay && !overlay.classList.contains('hidden')) closeFn();
  });
};
