/**
 * Shared in-module Ayah modal.
 *
 * Lets any module preview a verse WITHOUT leaving that module: shows the verse
 * word-by-word (each word playable, the relevant word highlighted), a play/pause
 * full-ayah button, a per-word grammar snippet (root · part of speech · lemma),
 * word-by-word and ayah-by-ayah navigation, copy-verse, and an explicit
 * "Read full ayah" button that IS the only thing that navigates to the Reading
 * tab. Use: ayahModal.open('2:255', { word: 'ٱللَّهُ' }).
 *
 * Enrichments layered on the original contract (open(ref,{word}) is unchanged):
 *  - Prev/next WORD navigation within the verse (moves the highlight, plays the
 *    word, refreshes the grammar snippet) and prev/next AYAH navigation that
 *    re-opens in place without closing the modal, respecting surah bounds.
 *  - A grammar snippet for the focused word built from the already-shipped
 *    morphology JSON (QuranData.getMorphology), with a chip to open the root in
 *    Sarf and a button to open the full Grammar tab (tabSystem.switchTabWithReturn).
 *  - Full-ayah audio is now a play/PAUSE toggle sharing one <audio> with the
 *    per-word audio.
 *  - Copy verse (Arabic + translation + reference) to the clipboard with inline
 *    "Copied!" feedback — never a native alert/confirm.
 *  - Keyboard: Esc closes (shared escClose), ← / → step through ayahs. Focus is
 *    saved on open and restored on close.
 */

class AyahModal {
  constructor() {
    this.overlay = null;
    this.audio = null;
    this._audioMode = null;   // 'word' | 'ayah' | null — what the shared <audio> is playing
    this._morphCache = {};    // surah -> morphology object, or null if unavailable
    this._st = null;          // current render state { ref, s, a, v, lang, surahName, ayahCount, curIdx }
    this._open = false;
    this._lastFocus = null;
  }

  tt(key) {
    const lang = (typeof appSettings !== 'undefined' && appSettings) ? appSettings.get('language') : 'en';
    return (typeof t === 'function') ? t(key, lang) : key;
  }

  normW(x) { return QuranData.normalizeWord ? QuranData.normalizeWord(x || '') : String(x || ''); }

  getAudio() {
    if (!this.audio) {
      this.audio = new Audio();
      this.audio.addEventListener('play', () => this.syncAudioBtn());
      this.audio.addEventListener('pause', () => this.syncAudioBtn());
      this.audio.addEventListener('ended', () => { this._audioMode = null; this.syncAudioBtn(); });
    }
    return this.audio;
  }

  ensure() {
    if (this.overlay) return;
    this.overlay = document.createElement('div');
    this.overlay.id = 'shared-ayah-modal';
    this.overlay.className = 'fixed inset-0 bg-black/60 z-[80] hidden items-center justify-center p-4';
    this.overlay.innerHTML = `
      <div role="dialog" aria-modal="true" tabindex="-1" class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-3xl max-h-[88vh] flex flex-col focus:outline-none">
        <div class="flex items-center gap-2 px-5 py-3 border-b border-gray-200 dark:border-gray-700">
          <h3 id="sam-title" class="flex-1 font-bold text-gray-800 dark:text-gray-100 truncate"></h3>
          <button id="sam-close" aria-label="${this.esc(this.tt('close') || 'Close')}" class="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700">✕</button>
        </div>
        <div id="sam-body" class="flex-1 overflow-y-auto p-5"></div>
      </div>`;
    document.body.appendChild(this.overlay);
    this.titleEl = this.overlay.querySelector('#sam-title');
    this.bodyEl = this.overlay.querySelector('#sam-body');
    this.dialogEl = this.overlay.querySelector('[role="dialog"]');
    this.overlay.querySelector('#sam-close').addEventListener('click', () => this.close());
    if (window.escClose) window.escClose(this.overlay, () => this.close());

    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) { this.close(); return; }
      const nv = e.target.closest('[data-nav-ayah]');
      if (nv) { this.open(nv.getAttribute('data-nav-ayah')); return; }
      const wi = e.target.closest('[data-word-idx]');
      if (wi) { this.setWord(parseInt(wi.getAttribute('data-word-idx'), 10)); return; }
      const wn = e.target.closest('[data-word-nav]');
      if (wn) { this.setWord((this._st ? this._st.curIdx : -1) + parseInt(wn.getAttribute('data-word-nav'), 10)); return; }
      const wp = e.target.closest('[data-word-audio]');
      if (wp) { this.play(wp.getAttribute('data-word-audio')); return; }
      const fp = e.target.closest('[data-ayah-audio]');
      if (fp) { this.toggleAyah(fp.getAttribute('data-ayah-audio')); return; }
      const cp = e.target.closest('[data-copy-verse]');
      if (cp) { this.copyVerse(); return; }
      const gr = e.target.closest('[data-open-grammar]');
      if (gr) {
        this.close();
        if (typeof tabSystem !== 'undefined' && tabSystem) {
          if (tabSystem.switchTabWithReturn) tabSystem.switchTabWithReturn('grammar');
          else tabSystem.switchTab('grammar');
        }
        return;
      }
      const sr = e.target.closest('[data-open-sarf-root]');
      if (sr) {
        const root = sr.getAttribute('data-open-sarf-root');
        this.close();
        if (typeof sarf !== 'undefined' && sarf && typeof sarf.openRoot === 'function') sarf.openRoot(root);
        return;
      }
      const rd = e.target.closest('[data-read-full]');
      if (rd) {
        const ref = rd.getAttribute('data-read-full');
        this.close();
        if (typeof tabSystem !== 'undefined' && tabSystem) tabSystem.switchTab('reading');
        if (decodeURIComponent(window.location.hash.slice(1)) === ref) window.dispatchEvent(new HashChangeEvent('hashchange'));
        else window.location.hash = ref;
      }
    });

    // Arrow keys step through ayahs while the modal is open (Esc is handled by escClose).
    document.addEventListener('keydown', (e) => {
      if (!this.overlay || this.overlay.classList.contains('hidden') || !this._st) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); this.navAyah(1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); this.navAyah(-1); }
    });
  }

  // ---- audio ---------------------------------------------------------------

  play(src) {
    if (!src) return;
    const au = this.getAudio();
    this._audioMode = 'word';
    au.src = src; au.play().catch(() => {});
    this.syncAudioBtn();
  }

  toggleAyah(src) {
    if (!src) return;
    const au = this.getAudio();
    if (this._audioMode === 'ayah' && au.src) {
      if (au.paused) au.play().catch(() => {});
      else au.pause();
      return;
    }
    this._audioMode = 'ayah';
    au.src = src; au.play().catch(() => {});
  }

  syncAudioBtn() {
    if (!this.overlay) return;
    const btn = this.overlay.querySelector('[data-ayah-audio]');
    if (!btn) return;
    const playing = this._audioMode === 'ayah' && this.audio && this.audio.src && !this.audio.paused;
    btn.innerHTML = playing ? `⏸ ${this.tt('pause')}` : `🔊 ${this.tt('play_full_ayah')}`;
  }

  // ---- open / close --------------------------------------------------------

  close() {
    if (this.audio) this.audio.pause();
    this._audioMode = null;
    if (this.overlay) { this.overlay.classList.add('hidden'); this.overlay.classList.remove('flex'); }
    this._open = false;
    const prev = this._lastFocus;
    this._lastFocus = null;
    if (prev && typeof prev.focus === 'function') { try { prev.focus(); } catch (e) { /* ignore */ } }
  }

  esc(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

  async open(ref, opts) {
    opts = opts || {};
    this._req = ref;
    this.ensure();
    if (!this._open) { this._lastFocus = document.activeElement; this._open = true; }
    this.overlay.classList.remove('hidden'); this.overlay.classList.add('flex');
    this.titleEl.textContent = ref;
    this.bodyEl.innerHTML = `<p class="text-center text-gray-400 py-8">${this.tt('loading')}</p>`;
    const lang = (typeof appSettings !== 'undefined' && appSettings) ? appSettings.get('language') : 'en';
    try {
      const [s, a] = ref.split(':').map(Number);
      const v = (await QuranData.fetchRange(s, a, a, lang))[0];
      if (this._req !== ref) return;
      if (!v) throw new Error('nf');
      const surahName = (typeof getSurahName === 'function') ? getSurahName(s, lang) : (v.surahName || '');
      const ayahCount = (typeof getSurahByNumber === 'function') ? (getSurahByNumber(s)?.ayahCount || a) : a;

      // Initial focused word: the one the caller asked to highlight (else none).
      let curIdx = -1;
      if (opts.word) {
        const target = this.normW(opts.word);
        curIdx = (v.words || []).findIndex(w => this.normW(w.arabic) === target || (w.arabic || '').indexOf(opts.word) >= 0);
      }

      this._st = { ref, s, a, v, lang, surahName, ayahCount, curIdx };
      this.titleEl.textContent = `${surahName} ${v.key}`;
      this.renderBody();
      try { this.dialogEl.focus(); } catch (e) { /* ignore */ }
      this.loadMorph();
    } catch (e) {
      if (this._req !== ref) return;
      this.bodyEl.innerHTML = `<p class="text-center text-gray-500 dark:text-gray-400 py-8">${this.tt('error')}</p>`;
    }
  }

  // ---- navigation ----------------------------------------------------------

  navAyah(dir) {
    if (!this._st) return;
    const { s, a, ayahCount } = this._st;
    const na = a + dir;
    if (na < 1 || na > ayahCount) return;
    this.open(`${s}:${na}`);
  }

  setWord(idx) {
    if (!this._st) return;
    const words = this._st.v.words || [];
    if (!words.length) return;
    idx = Math.max(0, Math.min(words.length - 1, idx));
    this._st.curIdx = idx;
    const w = words[idx];
    if (w && w.audio) this.play(w.audio);
    this.rerender();
  }

  rerender() {
    const top = this.bodyEl ? this.bodyEl.scrollTop : 0;
    this.renderBody();
    if (this.bodyEl) this.bodyEl.scrollTop = top;
  }

  // ---- render --------------------------------------------------------------

  renderBody() {
    const st = this._st;
    if (!st) return;
    const { v, s, a, ayahCount, curIdx } = st;
    const words = v.words || [];
    const pad = n => String(n).padStart(3, '0');
    const ayahSrc = `https://everyayah.com/data/Alafasy_128kbps/${pad(s)}${pad(a)}.mp3`;

    const wbw = words.map((w, i) => {
      const hit = i === curIdx;
      const canPlay = !!w.audio;
      return `<button data-word-idx="${i}" ${canPlay ? `data-word-audio="${this.esc(w.audio)}"` : ''}
                class="inline-flex flex-col items-center px-2 py-1 my-1 rounded-lg cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-700 ${hit ? 'ring-2 ring-amber-400 bg-amber-50 dark:bg-amber-500/10' : ''}">
                <span class="ayah-arabic !text-2xl block">${w.arabic}</span>
                ${w.translit ? `<span class="text-[0.6875rem] text-gray-400 dark:text-gray-500 block" dir="ltr">${this.esc(w.translit)}</span>` : ''}
                <span class="text-[0.6875rem] text-gray-500 dark:text-gray-400 block" dir="auto">${w.meaning || ''}</span>
              </button>`;
    }).join('');

    const navBtn = (toRef, label, sym) => toRef
      ? `<button data-nav-ayah="${toRef}" aria-label="${this.esc(label)}" title="${this.esc(label)}"
                class="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">${sym}</button>`
      : `<button disabled aria-label="${this.esc(label)}" class="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-300 dark:text-gray-600 cursor-not-allowed">${sym}</button>`;

    const wordBtn = (delta, label, sym, disabled) => disabled
      ? `<button disabled aria-label="${this.esc(label)}" class="px-2.5 py-1 rounded-md border border-gray-200 dark:border-gray-700 text-sm text-gray-300 dark:text-gray-600 cursor-not-allowed">${sym}</button>`
      : `<button data-word-nav="${delta}" aria-label="${this.esc(label)}" title="${this.esc(label)}"
                class="px-2.5 py-1 rounded-md border border-gray-300 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">${sym}</button>`;

    const counter = `${curIdx >= 0 ? curIdx + 1 : '—'} / ${words.length}`;

    this.bodyEl.innerHTML = `
      <div class="ayah-arabic !text-3xl !leading-loose text-center mb-3" dir="rtl">${v.arabic}</div>
      <p class="text-xs text-center text-gray-400 mb-2">${this.tt('tap_word_to_hear')}</p>
      <div class="flex flex-wrap justify-center gap-x-1 mb-2" dir="rtl">${wbw}</div>
      ${words.length ? `
        <div class="flex items-center justify-center gap-2 mb-3 text-sm text-gray-500 dark:text-gray-400">
          ${wordBtn(-1, this.tt('previous_word'), '&lsaquo;', curIdx <= 0)}
          <span class="min-w-[3.5rem] text-center tabular-nums">${counter}</span>
          ${wordBtn(1, this.tt('next_word'), '&rsaquo;', curIdx >= words.length - 1)}
        </div>` : ''}
      <div id="sam-grammar" class="mb-3"></div>
      <p class="text-center text-gray-600 dark:text-gray-300 mb-4" dir="auto">${v.translation || ''}</p>
      <div class="flex flex-wrap items-center justify-center gap-2">
        ${navBtn(a > 1 ? `${s}:${a - 1}` : null, this.tt('previous_ayah'), '&lsaquo;')}
        <button data-ayah-audio="${ayahSrc}"
                class="px-4 py-2 rounded-lg bg-primary text-white text-sm hover:bg-primary/80">🔊 ${this.tt('play_full_ayah')}</button>
        <button data-copy-verse aria-label="${this.esc(this.tt('copy_verse'))}"
                class="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">📋 ${this.tt('copy_verse')}</button>
        <button data-read-full="${v.key}"
                class="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">📖 ${this.tt('read_full_ayah')}</button>
        ${navBtn(a < ayahCount ? `${s}:${a + 1}` : null, this.tt('next_ayah'), '&rsaquo;')}
      </div>`;

    this.updateGrammar();
    this.syncAudioBtn();
  }

  /** Load the surah morphology once, then refresh the grammar snippet. */
  async loadMorph() {
    const st = this._st;
    if (!st) return;
    const s = st.s;
    if (Object.prototype.hasOwnProperty.call(this._morphCache, s)) { this.updateGrammar(); return; }
    try {
      this._morphCache[s] = await QuranData.getMorphology(s);
    } catch (e) {
      this._morphCache[s] = null;
    }
    if (this._st && this._st.s === s && this._req === st.ref) this.updateGrammar();
  }

  /** Grammar snippet (root · part of speech · lemma) for the focused word. */
  updateGrammar() {
    const box = this.overlay && this.overlay.querySelector('#sam-grammar');
    if (!box) return;
    const st = this._st;
    if (!st) { box.innerHTML = ''; return; }

    if (st.curIdx < 0) {
      box.innerHTML = `<p class="text-xs text-center text-gray-400">${this.tt('sam_tap_word_grammar')}</p>`;
      return;
    }
    if (!Object.prototype.hasOwnProperty.call(this._morphCache, st.s)) {
      box.innerHTML = `<p class="text-xs text-center text-gray-400">${this.tt('loading')}</p>`;
      return;
    }
    const morph = this._morphCache[st.s];
    if (!morph) { box.innerHTML = ''; return; }

    const mWords = morph[String(st.a)] || [];
    const cur = st.v.words[st.curIdx];
    const curNorm = this.normW(cur && cur.arabic);
    // Prefer an exact (normalized) text match so the snippet can never describe a
    // neighbouring word when the two sources segment the verse differently; only
    // fall back to positional index when the display word has no text to match.
    let segs = null;
    if (curNorm) {
      const byIdx = mWords[st.curIdx];
      if (byIdx && this.normW(byIdx.map(x => x.t).join('')) === curNorm) segs = byIdx;
      else segs = mWords.find(ws => this.normW(ws.map(x => x.t).join('')) === curNorm) || null;
    } else {
      segs = mWords[st.curIdx] || null;
    }
    if (!segs || !segs.length) { box.innerHTML = ''; return; }

    const content = segs.filter(x => !((x.f || []).includes('PREF')));
    const pool = content.length ? content : segs;
    const head = pool.find(x => x.r) || pool.find(x => x.l) || pool[pool.length - 1] || segs[0];
    const desc = (typeof corpusDescribe === 'function' && head) ? corpusDescribe(head) : (head && head.g || '');
    const root = segs.map(x => x.r).find(Boolean);
    const lemma = segs.map(x => x.l).find(Boolean);
    const arabic = segs.map(x => x.t).join('');

    box.innerHTML = `
      <div class="rounded-lg bg-gray-50 dark:bg-gray-700/40 border border-gray-100 dark:border-gray-700 p-3">
        <div class="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span class="text-[0.65rem] font-semibold uppercase tracking-wide text-gray-400">${this.tt('sam_word_grammar')}</span>
          <span class="ayah-arabic !text-xl">${arabic}</span>
          ${desc ? `<span class="text-sm text-gray-600 dark:text-gray-300">${this.esc(desc)}</span>` : ''}
        </div>
        <div class="flex flex-wrap items-center gap-2 mt-2">
          ${root ? `<button data-open-sarf-root="${this.esc(root)}" title="${this.esc(this.tt('gr_open_sarf'))}"
                      class="text-xs px-2 py-1 rounded bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900/40 dark:text-fuchsia-200 hover:bg-fuchsia-200 dark:hover:bg-fuchsia-900/60">${this.tt('root')}: <span class="ayah-arabic !text-base">${this.esc(root.split('').join(' '))}</span> 🧬</button>` : ''}
          ${lemma ? `<span class="text-xs text-gray-500 dark:text-gray-400">${this.tt('lemma')}: <span class="ayah-arabic !text-base">${this.esc(lemma)}</span></span>` : ''}
          <button data-open-grammar
                  class="text-xs px-2 py-1 rounded border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 ml-auto">${this.tt('open_grammar')} ↗</button>
        </div>
      </div>`;
  }

  // ---- copy ----------------------------------------------------------------

  copyVerse() {
    const st = this._st;
    if (!st) return;
    const v = st.v;
    const trans = (QuranData.stripFootnotes && v.translation) ? QuranData.stripFootnotes(v.translation) : (v.translation || '');
    const text = `${v.arabic}\n${trans}\n— ${st.surahName} ${v.key}`.trim();
    const done = () => this.flashCopy();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(() => this.fallbackCopy(text, done));
    } else {
      this.fallbackCopy(text, done);
    }
  }

  fallbackCopy(text, done) {
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      done();
    } catch (e) { /* silent — never a native dialog */ }
  }

  flashCopy() {
    const btn = this.overlay && this.overlay.querySelector('[data-copy-verse]');
    if (!btn) return;
    btn.innerHTML = `✅ ${this.tt('copied')}`;
    clearTimeout(this._copyT);
    this._copyT = setTimeout(() => {
      const b = this.overlay && this.overlay.querySelector('[data-copy-verse]');
      if (b) b.innerHTML = `📋 ${this.tt('copy_verse')}`;
    }, 1400);
  }
}

let ayahModal;
document.addEventListener('DOMContentLoaded', () => { ayahModal = new AyahModal(); });

/**
 * Shared helper: close a modal overlay when Escape is pressed while it is visible.
 * Modules call this once when they create their overlay.
 *   const unbind = window.escClose(this.overlay, () => this.close());
 * `overlay` is the element that carries the `hidden` class when closed.
 * One shared keydown listener closes only the TOPMOST visible overlay (by
 * z-index, then registration order); re-binding the same overlay is a no-op.
 * Returns an unbind function.
 */
window.escClose = (function () {
  const bound = new WeakSet(); // overlays already registered (de-dupe)
  const entries = [];          // { overlay, closeFn } in registration order
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    let top = null, topZ = -Infinity;
    for (const en of entries) {
      if (!en.overlay.isConnected || en.overlay.classList.contains('hidden')) continue;
      const z = parseInt(window.getComputedStyle(en.overlay).zIndex, 10) || 0;
      if (z >= topZ) { topZ = z; top = en; }
    }
    if (top) top.closeFn();
  });
  return function (overlay, closeFn) {
    if (!overlay || typeof closeFn !== 'function' || bound.has(overlay)) return () => {};
    bound.add(overlay);
    const entry = { overlay, closeFn };
    entries.push(entry);
    return function unbind() {
      const i = entries.indexOf(entry);
      if (i !== -1) entries.splice(i, 1);
      bound.delete(overlay);
    };
  };
})();
