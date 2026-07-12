/**
 * Word Highlight Module
 * Highlights the word currently being recited, driven by the audio player's
 * timeupdate events (word-level segment timings from the quran.com v4 API).
 * Targets BOTH the word-by-word tiles (.wbw-inline-word[data-key][data-pos])
 * and the plain-Arabic word spans (.ayah-arabic [data-key][data-pos]).
 */

class WordHighlight {
  constructor() {
    this.highlighted = [];
  }

  /**
   * Highlight one word (clears any previous highlight first).
   * @param {string} key - verse key "surah:ayah"
   * @param {number} pos - 1-based word position within the ayah
   */
  highlight(key, pos) {
    this.clear();
    if (!key || pos == null) return;

    const els = document.querySelectorAll(
      `.wbw-inline-word[data-key="${key}"][data-pos="${pos}"],` +
      ` .ayah-arabic [data-key="${key}"][data-pos="${pos}"]`
    );
    els.forEach(el => el.classList.add('word-audio-highlight'));
    this.highlighted = Array.from(els);

    // Auto-scroll the highlighted word into view, but only while the
    // reading tab is the active one (never yank other tabs around).
    if (typeof tabSystem !== 'undefined' && tabSystem && tabSystem.activeTab === 'reading') {
      const visible = this.highlighted.find(el =>
        el.closest('#tab-reading') && el.offsetParent !== null);
      if (visible) visible.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }

  /** Remove every active word highlight. */
  clear() {
    this.highlighted.forEach(el => el.classList.remove('word-audio-highlight'));
    this.highlighted = [];
  }
}

// Initialize when DOM is ready
let wordHighlight;
document.addEventListener('DOMContentLoaded', () => {
  wordHighlight = new WordHighlight();
});
