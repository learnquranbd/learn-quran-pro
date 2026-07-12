/**
 * Word by Word Module
 * Renders per-word Arabic + transliteration + meaning cards, with a detail
 * panel showing grammar (morphology), root, and occurrences in other verses.
 */

class WordByWord {
  constructor() {
    this.container = document.getElementById('wbw-container');
    this.ayahs = [];
    this.language = 'en';
    this.wordAudio = new Audio();

    if (this.container) {
      window.addEventListener('ayahsLoaded', (e) => {
        this.ayahs = e.detail.ayahs;
        this.language = e.detail.language;
        this.render();
      });

      this.container.addEventListener('click', (e) => this.onClick(e));
      this.createDetailPanel();
    }
  }

  render() {
    if (this.ayahs.length === 0) {
      this.container.innerHTML = `
        <p class="text-gray-500 dark:text-gray-400 text-center py-12">${t('load_ayah_first', this.language)}</p>
      `;
      return;
    }

    this.container.innerHTML = this.ayahs.map(ayah => `
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <div class="flex items-center gap-2 mb-3 text-sm text-gray-500 dark:text-gray-400">
          <span class="ayah-number">${ayah.ayah}</span>
          <span>${ayah.surahName} ${ayah.key}</span>
        </div>
        <div class="flex flex-wrap gap-2" dir="rtl">
          ${ayah.words.map(w => this.renderWordTile(ayah, w)).join('')}
        </div>
      </div>
    `).join('');
  }

  renderWordTile(ayah, w) {
    return `
      <button class="wbw-word group text-center px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700
                     hover:border-primary hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
              data-key="${ayah.key}" data-pos="${w.position}">
        <div class="ayah-arabic !text-2xl !leading-relaxed">${w.arabic}</div>
        <div class="text-xs text-gray-400 dark:text-gray-500 italic" dir="ltr">${w.translit}</div>
        <div class="text-sm text-gray-700 dark:text-gray-300" dir="auto">${w.meaning}</div>
      </button>
    `;
  }

  onClick(e) {
    const tile = e.target.closest('.wbw-word');
    if (!tile) return;
    const key = tile.getAttribute('data-key');
    const pos = parseInt(tile.getAttribute('data-pos'));
    const ayah = this.ayahs.find(a => a.key === key);
    const word = ayah?.words.find(w => w.position === pos);
    if (ayah && word) this.showDetail(ayah, word);
  }

  createDetailPanel() {
    this.panel = document.createElement('div');
    this.panel.id = 'word-detail-panel';
    this.panel.className = 'fixed inset-x-0 bottom-0 z-50 hidden';
    this.panel.innerHTML = `
      <div class="max-w-6xl w-[95vw] mx-auto m-4 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 max-h-[85vh] overflow-y-auto">
        <div class="flex items-center justify-between px-5 py-3 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800">
          <div id="wdp-title" class="font-semibold"></div>
          <button id="wdp-close" class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">✕</button>
        </div>
        <div id="wdp-body" class="p-5"></div>
      </div>
    `;
    document.body.appendChild(this.panel);
    this.panel.querySelector('#wdp-close').addEventListener('click', () => this.hideDetail());

    // Delegate clicks inside the panel (audio, occurrence chips, previews)
    this.panel.addEventListener('click', (e) => {
      const audioBtn = e.target.closest('[data-word-audio]');
      if (audioBtn) {
        this.wordAudio.src = audioBtn.getAttribute('data-word-audio');
        this.wordAudio.play().catch(() => {});
        return;
      }

      // Occurrence chip → inline verse preview (stay in the modal)
      const chip = e.target.closest('[data-preview]');
      if (chip) {
        this.showVersePreview(chip);
        return;
      }

      // "Show more" chips
      const more = e.target.closest('[data-more-section]');
      if (more) {
        this.appendChips(more.getAttribute('data-more-section'));
        return;
      }

      // Explicit navigation from a preview (closes the modal)
      const goto = e.target.closest('[data-goto-verse]');
      if (goto) {
        this.hideDetail();
        window.location.hash = goto.getAttribute('data-goto-verse');
      }
    });
  }

  hideDetail() {
    this.panel.classList.add('hidden');
  }

  async showDetail(ayah, word) {
    const lang = this.language;
    this._occ = {};   // section id -> {locations, shown}
    this.panel.classList.remove('hidden');
    this.panel.querySelector('#wdp-title').innerHTML =
      `<span class="ayah-arabic !text-xl">${word.arabic}</span>
       <span class="text-sm text-gray-500 dark:text-gray-400 mx-2">${ayah.key} · ${t('word', lang)} ${word.position}</span>`;

    const body = this.panel.querySelector('#wdp-body');
    body.innerHTML = `<p class="text-gray-400">${t('loading', lang)}</p>`;

    let morphHtml = '';
    let root = null;

    try {
      const morph = await QuranData.getMorphology(ayah.surah);
      const segments = morph[String(ayah.ayah)]?.[word.position - 1] || [];
      root = segments.map(s => s.r).find(Boolean) || null;
      morphHtml = renderSegments(segments, lang);
    } catch (err) {
      morphHtml = `<p class="text-gray-400 text-sm">${t('grammar_unavailable', lang)}</p>`;
    }

    // Exact-word repetition (same written form anywhere in the Quran)
    let exactHtml = '';
    try {
      const index = await QuranData.getWordIndex();
      const normalized = QuranData.normalizeWord(word.arabic);
      const locations = index[normalized] || [];
      exactHtml = this.occurrenceSection('exact',
        `${t('exact_word_repeat', lang)} <span class="ayah-arabic !text-xl mx-1">${word.arabic}</span>`,
        locations, lang);
    } catch (err) { /* index unavailable — skip */ }

    // Same-root repetition
    let rootHtml = '';
    if (root) {
      try {
        const roots = await QuranData.getRoots();
        const locations = roots[root] || [];
        rootHtml = this.occurrenceSection('root',
          `${t('root_word_repeat', lang)} <span class="ayah-arabic !text-xl mx-1">${root.split('').join(' ')}</span>`,
          locations, lang);
      } catch (err) { /* skip */ }
    }

    const corpusLoc = `(${ayah.surah}:${ayah.ayah}:${word.position})`;

    body.innerHTML = `
      <div class="flex flex-wrap items-center gap-4 mb-4">
        <div>
          <div class="text-xs text-gray-400 uppercase">${t('meaning', lang)}</div>
          <div class="font-medium" dir="auto">${word.meaning}</div>
        </div>
        <div>
          <div class="text-xs text-gray-400 uppercase">${t('transliteration', lang)}</div>
          <div class="italic">${word.translit}</div>
        </div>
        ${word.audio ? `
          <button data-word-audio="${word.audio}" class="ml-auto px-3 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary/80">
            🔊 ${t('play', lang)}
          </button>` : ''}
      </div>
      <h4 class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">
        ${t('grammar', lang)}
        <a href="https://corpus.quran.com/wordmorphology.jsp?location=${encodeURIComponent(corpusLoc)}"
           target="_blank" rel="noopener" class="ml-2 text-xs normal-case font-normal text-primary dark:text-blue-400 hover:underline">
          corpus.quran.com ↗
        </a>
      </h4>
      ${morphHtml}
      ${exactHtml}
      ${rootHtml}
    `;

    // Fill the first page of occurrence chips
    if (this._occ.exact) this.appendChips('exact');
    if (this._occ.root) this.appendChips('root');
  }

  /**
   * One occurrence section (exact-word or same-root): count + paged chips +
   * an inline preview area. Chips preview the verse INSIDE the modal.
   */
  occurrenceSection(id, headingHtml, locations, lang) {
    this._occ[id] = { locations, shown: 0 };
    return `
      <div class="mt-5" data-occ-section="${id}">
        <h4 class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">
          ${headingHtml}
          — <span class="text-primary dark:text-blue-400">${locations.length}</span> ${t('occurrences', lang)}
        </h4>
        <div class="occ-chips flex flex-wrap gap-2"></div>
        <div class="occ-preview mt-2"></div>
      </div>
    `.trim();
  }

  /** Append the next batch of chips for a section (called after render + on "show more") */
  appendChips(id, batch = 40) {
    const state = this._occ[id];
    const section = this.panel.querySelector(`[data-occ-section="${id}"]`);
    if (!state || !section) return;

    const chipsEl = section.querySelector('.occ-chips');
    // Drop the old "show more" button
    chipsEl.querySelector('[data-more-section]')?.remove();

    const next = state.locations.slice(state.shown, state.shown + batch);
    state.shown += next.length;

    chipsEl.insertAdjacentHTML('beforeend', next.map(loc => {
      const [s, a, w] = loc.split(':');
      return `
        <button data-preview="${loc}" data-section="${id}"
                class="px-2 py-1 text-sm rounded bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300">
          ${s}:${a}
        </button>`;
    }).join(''));

    const remaining = state.locations.length - state.shown;
    if (remaining > 0) {
      chipsEl.insertAdjacentHTML('beforeend', `
        <button data-more-section="${id}"
                class="px-2 py-1 text-sm rounded border border-dashed border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
          +${remaining} ${t('show_more', this.language)}
        </button>`);
    }
  }

  /** Fetch + render a verse preview inside the modal, highlighting the tapped word */
  async showVersePreview(chip) {
    const [s, a, w] = chip.getAttribute('data-preview').split(':').map(Number);
    const sectionId = chip.getAttribute('data-section');
    const section = this.panel.querySelector(`[data-occ-section="${sectionId}"]`);
    const previewEl = section?.querySelector('.occ-preview');
    if (!previewEl) return;

    const lang = this.language;
    previewEl.innerHTML = `<p class="text-sm text-gray-400 p-2">${t('loading', lang)}</p>`;

    try {
      const verses = await QuranData.fetchRange(s, a, a, lang);
      const verse = verses[0];
      if (!verse) throw new Error('not found');

      const arabicHtml = verse.words.map(word =>
        word.position === w
          ? `<span class="bg-amber-200 dark:bg-amber-700/60 rounded px-1">${word.arabic}</span>`
          : word.arabic
      ).join(' ');

      previewEl.innerHTML = `
        <div class="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/40 p-3">
          <div class="flex items-center gap-2 mb-2">
            <span class="text-xs font-semibold text-gray-500 dark:text-gray-400">${verse.surahName} ${verse.key}</span>
            <button data-goto-verse="${verse.key}"
                    class="ml-auto px-2 py-1 text-xs rounded bg-primary text-white hover:bg-primary/80">
              ${t('open_verse', lang)} →
            </button>
          </div>
          <div class="ayah-arabic !text-2xl !leading-loose" dir="rtl">${arabicHtml}</div>
          <div class="mt-1 text-sm text-gray-600 dark:text-gray-300" dir="auto">${verse.translation}</div>
        </div>
      `;
    } catch (err) {
      previewEl.innerHTML = `<p class="text-sm text-gray-400 p-2">${t('error', lang)}</p>`;
    }
  }
}

/**
 * Render morphology segments of one word as labeled chips.
 * Shared with the Grammar tab.
 */
function renderSegments(segments, lang) {
  if (!segments.length) {
    return `<p class="text-gray-400 text-sm">${t('grammar_unavailable', lang)}</p>`;
  }

  // Corpus-style: the whole word with color-coded segments...
  const coloredWord = segments.map(seg =>
    `<span class="${segmentColor(seg)}">${seg.t}</span>`
  ).join('');

  // ...then one description line per segment
  return `
    <div class="p-3 rounded bg-gray-50 dark:bg-gray-700/50">
      <div class="ayah-arabic !text-3xl !leading-loose mb-2" dir="rtl">${coloredWord}</div>
      <div class="space-y-1.5">
        ${segments.map(seg => `
          <div class="flex flex-wrap items-baseline gap-2 text-sm">
            <span class="ayah-arabic !text-lg min-w-[2.5rem] text-center ${segmentColor(seg)}">${seg.t}</span>
            <span class="text-gray-700 dark:text-gray-200">${corpusDescribe(seg)}</span>
            ${seg.r ? `<span class="text-xs text-gray-500 dark:text-gray-400">${t('root', lang)}: <span class="ayah-arabic !text-base">${seg.r.split('').join(' ')}</span></span>` : ''}
            ${seg.l ? `<span class="text-xs text-gray-500 dark:text-gray-400">${t('lemma', lang)}: <span class="ayah-arabic !text-base">${seg.l}</span></span>` : ''}
          </div>`).join('')}
      </div>
    </div>
  `;
}

// Initialize when DOM is ready
let wordByWord;
document.addEventListener('DOMContentLoaded', () => {
  wordByWord = new WordByWord();
});
