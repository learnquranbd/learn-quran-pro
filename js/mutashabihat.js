/**
 * Mutashabihat (متشابهات) — Similar Verses.
 *
 * The near-identical verses scattered across the Quran that huffaz most often
 * confuse. For a chosen surah, every ayah that shares a long identical phrase
 * (>= 4 words) with verses elsewhere is listed, the shared phrase highlighted,
 * with one-tap links to the look-alike verses.
 *
 * Built ENTIRELY from the app's own bundled data/quran-tokens.json (see
 * scripts) — data/mutashabihat.json maps "s:a" -> [[ref, phraseLen, startIdx]].
 * Display Arabic comes from data/quran-words.json. Renders into
 * #mutashabihat-container (tab "mutashabihat").
 */

class Mutashabihat {
  constructor() {
    this.container = document.getElementById('mutashabihat-container');
    if (!this.container) return;
    this.language = (typeof appSettings !== 'undefined' && appSettings) ? appSettings.get('language') : 'en';
    this.surah = 2;
    this.index = null;    // { "s:a": [[ref,len,start],...] }
    this.words = null;    // { "s:a": [diacritized words] }
    this.loaded = false;

    window.addEventListener('tabChanged', (e) => { if (e.detail.tabId === 'mutashabihat') this.ensureLoaded(); });
    window.addEventListener('settingChanged', (e) => {
      if (e.detail.key === 'language') { this.language = e.detail.value; if (this.loaded) this.render(); }
    });
  }

  tt(key) { return t(key, this.language); }
  esc(s) { return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }

  async ensureLoaded() {
    if (this.loaded) { this.render(); return; }
    this.container.innerHTML = `<div class="text-center py-16 text-gray-400">${this.tt('loading')}</div>`;
    try {
      const [idx, wd] = await Promise.all([
        fetch('data/mutashabihat.json').then(r => r.json()),
        (typeof QuranData !== 'undefined' && QuranData.getQuranWords) ? QuranData.getQuranWords()
          : fetch('data/quran-words.json').then(r => r.json())
      ]);
      this.index = idx; this.words = wd;
    } catch (e) {
      this.container.innerHTML = `<div class="text-center py-16 text-red-500">${this.tt('topics_load_error')}</div>`;
      return;
    }
    this.loaded = true;
    this.bindOnce();
    this.render();
  }

  bindOnce() {
    if (this._bound) return;
    this._bound = true;
    this.container.addEventListener('change', (e) => {
      if (e.target.id === 'mt-surah') { this.surah = parseInt(e.target.value); this.render(); }
    });
    this.container.addEventListener('click', (e) => {
      const chip = e.target.closest('[data-mt-ref]');
      if (chip && typeof ayahModal !== 'undefined' && ayahModal) { ayahModal.open(chip.getAttribute('data-mt-ref')); return; }
      const open = e.target.closest('[data-mt-open]');
      if (open) { window.location.hash = open.getAttribute('data-mt-open'); return; }
    });
  }

  /** Verses of the current surah that have similar verses, in ayah order. */
  surahVerses() {
    const prefix = this.surah + ':';
    return Object.keys(this.index)
      .filter(k => k.startsWith(prefix))
      .sort((a, b) => parseInt(a.split(':')[1]) - parseInt(b.split(':')[1]));
  }

  /** Diacritized verse HTML with the shared phrase [start, start+len) highlighted. */
  verseHtml(key, start, len) {
    const w = this.words[key] || [];
    return w.map((word, i) => {
      const on = i >= start && i < start + len;
      return on
        ? `<span class="bg-amber-200 dark:bg-amber-500/30 rounded px-0.5">${this.esc(word)}</span>`
        : this.esc(word);
    }).join(' ');
  }

  render() {
    const lang = this.language;
    const verses = this.loaded ? this.surahVerses() : [];
    this.container.innerHTML = `
      <div class="w-full max-w-4xl mx-auto">
        <div class="text-center mb-4">
          <h2 class="text-2xl font-bold mb-1">🪞 ${this.tt('mutashabihat_title')}</h2>
          <p class="text-gray-500 dark:text-gray-400 text-sm">${this.tt('mutashabihat_subtitle')}</p>
        </div>
        <div class="flex flex-wrap items-center justify-center gap-2 mb-4">
          <select id="mt-surah" class="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm">
            ${SURAH_DATA.map(s => {
              const n = Object.keys(this.index || {}).filter(k => k.startsWith(s.number + ':')).length;
              return `<option value="${s.number}" ${s.number === this.surah ? 'selected' : ''}>${this.esc(formatSurahOption(s, lang))}${n ? ` · ${n}` : ''}</option>`;
            }).join('')}
          </select>
        </div>
        <p class="text-xs text-gray-400 dark:text-gray-500 text-center mb-4">${this.tt('mutashabihat_hint')}</p>
        <div id="mt-results" class="space-y-3">
          ${verses.length ? verses.map(k => this.cardHtml(k)).join('')
            : `<div class="text-center py-10 text-gray-400">${this.tt('mutashabihat_none')}</div>`}
        </div>
      </div>`;
  }

  cardHtml(key) {
    const sims = this.index[key] || [];
    if (!sims.length) return '';
    const ayah = key.split(':')[1];
    const [, topLen, topStart] = sims[0];
    const chips = sims.map(([ref, len]) => {
      const [s, a] = ref.split(':');
      const nm = (typeof getSurahName === 'function') ? getSurahName(parseInt(s), this.language) : s;
      return `<button data-mt-ref="${ref}" title="${this.tt('mutashabihat_shared')}: ${len} ${this.tt('mt_words')}"
                class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-gray-200 dark:border-gray-700 text-xs hover:border-primary hover:bg-primary/5">
                <span class="ayah-arabic !text-sm !mb-0 !pb-0 !border-b-0 !leading-none">${this.esc(this.shortName(s))}</span>
                <span class="text-gray-500 dark:text-gray-400">${ref}</span>
                <span class="text-[0.65rem] text-amber-600 dark:text-amber-400">${len} ${this.tt('mt_words')}</span>
              </button>`;
    }).join('');
    return `
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
        <div class="flex items-center gap-2 mb-2 text-sm text-gray-500 dark:text-gray-400">
          <span class="ayah-number">${ayah}</span>
          <span>${this.tt('ayah')} ${ayah}</span>
          <button data-mt-open="${key}" class="ms-auto text-xs text-primary dark:text-blue-400 hover:underline">${this.tt('preview')} ↗</button>
        </div>
        <div class="ayah-arabic !text-2xl !leading-loose mb-3" dir="rtl">${this.verseHtml(key, topStart, topLen)}</div>
        <div class="text-xs text-gray-400 dark:text-gray-500 mb-1.5">${this.tt('mutashabihat_similar')} (${sims.length})</div>
        <div class="flex flex-wrap gap-2">${chips}</div>
      </div>`;
  }

  shortName(s) {
    const info = (typeof getSurahByNumber === 'function') ? getSurahByNumber(parseInt(s)) : null;
    return info ? info.arabicName : s;
  }
}

let mutashabihat;
document.addEventListener('DOMContentLoaded', () => { mutashabihat = new Mutashabihat(); });
