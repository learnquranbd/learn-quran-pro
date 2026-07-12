/**
 * Grammar Module
 * Full morphological breakdown of loaded ayahs from the
 * Quranic Arabic Corpus data (data/morphology/*.json).
 */

class GrammarView {
  constructor() {
    this.container = document.getElementById('grammar-container');
    this.ayahs = [];
    this.language = 'en';
    this.rendered = false;

    if (this.container) {
      window.addEventListener('ayahsLoaded', (e) => {
        this.ayahs = e.detail.ayahs;
        this.language = e.detail.language;
        this.rendered = false;
        // Render lazily when the tab is opened; render now if it's visible
        if (!document.getElementById('tab-grammar').classList.contains('hidden')) {
          this.render();
        }
      });

      window.addEventListener('tabChanged', (e) => {
        if (e.detail.tabId === 'grammar' && !this.rendered) {
          this.render();
        }
      });
    }
  }

  async render() {
    const lang = this.language;

    if (this.ayahs.length === 0) {
      this.container.innerHTML = `
        <p class="text-gray-500 dark:text-gray-400 text-center py-12">${t('load_ayah_first', lang)}</p>
      `;
      return;
    }

    this.rendered = true;
    this.container.innerHTML = `<p class="text-gray-400 text-center py-12">${t('loading', lang)}</p>`;

    try {
      const surahNumbers = [...new Set(this.ayahs.map(a => a.surah))];
      const morphBySurah = {};
      await Promise.all(surahNumbers.map(async s => {
        morphBySurah[s] = await QuranData.getMorphology(s);
      }));

      this.container.innerHTML = this.ayahs.map(ayah => {
        const words = morphBySurah[ayah.surah]?.[String(ayah.ayah)] || [];
        return `
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <div class="flex items-center gap-2 mb-3 text-sm text-gray-500 dark:text-gray-400">
              <span class="ayah-number">${ayah.ayah}</span>
              <span>${ayah.surahName} ${ayah.key}</span>
            </div>
            <div class="space-y-3">
              ${words.map((segments, i) => this.renderWordRow(ayah, segments, i)).join('')}
            </div>
          </div>
        `;
      }).join('');
    } catch (err) {
      console.error('Grammar render failed:', err);
      this.container.innerHTML = `
        <p class="text-gray-500 dark:text-gray-400 text-center py-12">${t('grammar_unavailable', lang)}</p>
      `;
    }
  }

  renderWordRow(ayah, segments, wordIndex) {
    const lang = this.language;
    const apiWord = ayah.words[wordIndex];
    const arabic = apiWord?.arabic || segments.map(s => s.t).join('');
    const meaning = apiWord?.meaning || '';
    const root = segments.map(s => s.r).find(Boolean);

    return `
      <div class="border border-gray-100 dark:border-gray-700 rounded-lg p-3">
        <div class="flex flex-wrap items-baseline gap-3 mb-2">
          <span class="text-xs text-gray-400">${wordIndex + 1}</span>
          <span class="ayah-arabic !text-2xl">${arabic}</span>
          <span class="text-sm text-gray-600 dark:text-gray-300" dir="auto">${meaning}</span>
          ${root ? `
            <span class="ml-auto text-sm text-gray-500 dark:text-gray-400">
              ${t('root', lang)}: <span class="ayah-arabic !text-lg">${root.split('').join(' ')}</span>
            </span>` : ''}
        </div>
        ${renderSegments(segments, lang)}
      </div>
    `;
  }
}

// Initialize when DOM is ready
let grammarView;
document.addEventListener('DOMContentLoaded', () => {
  grammarView = new GrammarView();
});
