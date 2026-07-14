/**
 * Grammar Module
 * Full morphological breakdown of loaded ayahs from the
 * Quranic Arabic Corpus data (data/morphology/*.json).
 *
 * Enrichments: POS legend + colour key, POS highlight filter, per-ayah
 * summary (noun/verb/particle counts + roots), per-word actions
 * (copy morphology, corpus.quran.com link, jump to Sarf), an expandable
 * raw-feature detail row, a loading skeleton and graceful per-surah fallback.
 * Presentation/navigation only — all linguistic data comes from the corpus.
 */

class GrammarView {
  constructor() {
    this.container = document.getElementById('grammar-container');
    this.ayahs = [];
    this.language = 'en';
    this.rendered = false;
    this.filter = 'all';   // all | noun | verb | particle

    if (this.container) {
      // One delegated handler survives every innerHTML re-render.
      this.container.addEventListener('click', (e) => this.onClick(e));

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

  // ---------------------------------------------------------------- helpers

  /** Top-level corpus part of speech for one segment. */
  posCategory(seg) {
    if (seg.g === 'V') return 'verb';
    if (seg.g === 'N') return 'noun';
    return 'particle';
  }

  /**
   * The word's head part of speech: prefer the root/lemma-bearing content
   * segment, skipping bare prefixes (attached ال / conjunction / preposition).
   */
  wordPrimaryPOS(segments) {
    const content = segments.filter(s => !(s.f || []).includes('PREF'));
    const pool = content.length ? content : segments;
    const head = pool.find(s => s.r) || pool.find(s => s.l) || pool[pool.length - 1] || segments[0];
    return head ? this.posCategory(head) : 'particle';
  }

  /** Plain-text morphology of one word, for the clipboard. */
  morphToText(ayah, segments, wordIndex) {
    const loc = `${ayah.surah}:${ayah.ayah}:${wordIndex + 1}`;
    const arabic = segments.map(s => s.t).join('');
    const lines = [`${arabic}  (${loc})`];
    const root = segments.map(s => s.r).find(Boolean);
    if (root) lines.push(`Root: ${root}`);
    segments.forEach(seg => {
      const desc = (typeof corpusDescribe === 'function') ? corpusDescribe(seg) : (seg.g || '');
      lines.push(`  ${seg.t} — ${desc}${seg.l ? '  [lemma ' + seg.l + ']' : ''}`);
    });
    return lines.join('\n');
  }

  esc(s) {
    return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  // ----------------------------------------------------------------- render

  async render() {
    const lang = this.language;

    if (this.ayahs.length === 0) {
      this.container.innerHTML = `
        <p class="text-gray-500 dark:text-gray-400 text-center py-12">${t('load_ayah_first', lang)}</p>
      `;
      return;
    }

    this.rendered = true;
    this.container.innerHTML = this.skeletonHtml();

    try {
      const surahNumbers = [...new Set(this.ayahs.map(a => a.surah))];
      const morphBySurah = {};
      // Resolve each surah independently so one missing file can't blank the tab.
      await Promise.all(surahNumbers.map(async s => {
        try {
          morphBySurah[s] = await QuranData.getMorphology(s);
        } catch (err) {
          console.warn('Grammar: morphology unavailable for surah', s, err);
          morphBySurah[s] = null;
        }
      }));

      const cards = this.ayahs.map(ayah => {
        const surahMorph = morphBySurah[ayah.surah];
        if (!surahMorph) {
          return `
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              ${this.ayahHeaderHtml(ayah)}
              <p class="text-gray-500 dark:text-gray-400 text-sm py-4 text-center">${t('gr_no_morph_surah', lang)}</p>
            </div>`;
        }
        const words = surahMorph[String(ayah.ayah)] || [];
        return `
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            ${this.ayahHeaderHtml(ayah)}
            ${this.ayahSummaryHtml(words, lang)}
            <div class="space-y-3">
              ${words.map((segments, i) => this.renderWordRow(ayah, segments, i)).join('')}
            </div>
          </div>
        `;
      }).join('');

      this.container.innerHTML = this.toolbarHtml(lang) + cards;
      this.applyFilter();
    } catch (err) {
      console.error('Grammar render failed:', err);
      this.container.innerHTML = `
        <p class="text-gray-500 dark:text-gray-400 text-center py-12">${t('grammar_unavailable', lang)}</p>
      `;
    }
  }

  skeletonHtml() {
    const card = `
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4 animate-pulse">
        <div class="h-3 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
        <div class="space-y-3">
          ${[0, 1, 2].map(() => `
            <div class="border border-gray-100 dark:border-gray-700 rounded-lg p-3">
              <div class="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div class="h-16 bg-gray-100 dark:bg-gray-700/60 rounded"></div>
            </div>`).join('')}
        </div>
      </div>`;
    return `<div class="space-y-6">${card}${card}</div>`;
  }

  ayahHeaderHtml(ayah) {
    return `
      <div class="flex items-center gap-2 mb-3 text-sm text-gray-500 dark:text-gray-400">
        <span class="ayah-number">${ayah.ayah}</span>
        <span>${ayah.surahName} ${ayah.key}</span>
      </div>`;
  }

  /** Colour key + POS highlight filter, shown once above all cards. */
  toolbarHtml(lang) {
    const swatch = (cls, label) =>
      `<span class="inline-flex items-center gap-1.5"><span class="w-3 h-3 rounded-full ${cls}"></span><span class="text-xs text-gray-600 dark:text-gray-300">${label}</span></span>`;

    const filterBtn = (key, label) =>
      `<button data-gfilter="${key}" class="gr-filter-btn text-xs px-3 py-1.5 rounded-full transition-colors">${label}</button>`;

    const wrJump = document.getElementById('tab-wordrepeat')
      ? `<button data-gr-wordrepeat class="text-xs px-3 py-1.5 rounded-full bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-300 hover:bg-fuchsia-500 hover:text-white transition-colors">🔁 ${t('wr_title', lang)}</button>`
      : '';

    return `
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4 space-y-3">
        <div class="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span class="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">${t('gr_legend', lang)}</span>
          ${swatch('bg-red-600 dark:bg-red-400', t('gr_verbs', lang))}
          ${swatch('bg-sky-700 dark:bg-sky-400', t('gr_nouns', lang))}
          ${swatch('bg-emerald-600 dark:bg-emerald-400', t('gr_particles', lang))}
          ${swatch('bg-purple-600 dark:bg-purple-400', t('gr_pronoun', lang))}
          ${swatch('bg-indigo-600 dark:bg-indigo-400', t('gr_proper_noun', lang))}
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <span class="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 mr-1">${t('gr_highlight', lang)}</span>
          ${filterBtn('all', t('gr_filter_all', lang))}
          ${filterBtn('noun', t('gr_nouns', lang))}
          ${filterBtn('verb', t('gr_verbs', lang))}
          ${filterBtn('particle', t('gr_particles', lang))}
          ${wrJump ? `<span class="ml-auto">${wrJump}</span>` : ''}
        </div>
      </div>`;
  }

  /** Per-ayah summary: POS counts + the distinct roots present. */
  ayahSummaryHtml(words, lang) {
    if (!words.length) return '';
    const counts = { noun: 0, verb: 0, particle: 0 };
    const roots = [];
    words.forEach(segments => {
      counts[this.wordPrimaryPOS(segments)]++;
      const r = segments.map(s => s.r).find(Boolean);
      if (r && !roots.includes(r)) roots.push(r);
    });

    const pill = (n, label, cls) =>
      `<span class="text-xs px-2 py-0.5 rounded-full ${cls}">${label}: <span class="font-semibold">${n}</span></span>`;

    const rootChips = roots.map(r =>
      `<button data-sarf-root="${this.esc(r)}" title="${t('sarf_title', lang)}"
         class="ayah-arabic !text-base px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700 hover:bg-fuchsia-500 hover:text-white transition-colors">${this.esc(r.split('').join(' '))}</button>`
    ).join('');

    return `
      <div class="mb-3 pb-3 border-b border-gray-100 dark:border-gray-700 space-y-2">
        <div class="flex flex-wrap items-center gap-2">
          ${pill(counts.noun, t('gr_nouns', lang), 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300')}
          ${pill(counts.verb, t('gr_verbs', lang), 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300')}
          ${pill(counts.particle, t('gr_particles', lang), 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300')}
        </div>
        ${roots.length ? `
          <div class="flex flex-wrap items-center gap-1.5">
            <span class="text-xs text-gray-500 dark:text-gray-400 mr-1">${t('gr_roots', lang)}:</span>
            ${rootChips}
          </div>` : ''}
      </div>`;
  }

  renderWordRow(ayah, segments, wordIndex) {
    const lang = this.language;
    const apiWord = ayah.words[wordIndex];
    // Use the morphology segment text (always aligned with these segments) for the
    // Arabic; the quran.com word list can segment differently, so only borrow its meaning.
    const arabic = segments.map(s => s.t).join('') || apiWord?.arabic || '';
    const meaning = apiWord?.meaning || '';
    const root = segments.map(s => s.r).find(Boolean);
    const pos = this.wordPrimaryPOS(segments);
    const wid = `${ayah.surah}_${ayah.ayah}_${wordIndex}`;
    const corpusLoc = `(${ayah.surah}:${ayah.ayah}:${wordIndex + 1})`;
    const copyPayload = encodeURIComponent(this.morphToText(ayah, segments, wordIndex));

    return `
      <div class="border border-gray-100 dark:border-gray-700 rounded-lg p-3 transition-opacity" data-word-pos="${pos}">
        <div class="flex flex-wrap items-baseline gap-3 mb-2">
          <span class="text-xs text-gray-400">${wordIndex + 1}</span>
          <span class="ayah-arabic !text-2xl">${arabic}</span>
          <span class="text-sm text-gray-600 dark:text-gray-300" dir="auto">${meaning}</span>
          ${root ? `
            <button data-sarf-root="${this.esc(root)}" title="${t('gr_open_sarf', lang)}"
              class="ml-auto text-sm text-gray-500 dark:text-gray-400 hover:text-fuchsia-600 dark:hover:text-fuchsia-300 transition-colors">
              ${t('root', lang)}: <span class="ayah-arabic !text-lg">${this.esc(root.split('').join(' '))}</span> 🧬
            </button>` : ''}
        </div>
        ${renderSegments(segments, lang)}
        <div class="flex flex-wrap items-center gap-2 mt-2">
          <button data-word-toggle="${wid}"
            class="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">
            <span data-toggle-arrow>▸</span> ${t('gr_features', lang)}
          </button>
          <button data-copy-morph="${copyPayload}"
            class="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">
            📋 ${t('copy', lang)}
          </button>
          <a href="https://corpus.quran.com/wordmorphology.jsp?location=${encodeURIComponent(corpusLoc)}"
            target="_blank" rel="noopener"
            class="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-primary dark:text-blue-300 hover:underline">
            corpus.quran.com ↗
          </a>
        </div>
        <div data-word-features="${wid}" class="hidden mt-2 p-3 rounded bg-gray-50 dark:bg-gray-700/50 space-y-1.5">
          ${this.featuresDetail(segments, lang)}
        </div>
      </div>
    `;
  }

  /** Raw corpus feature tags for each segment, glossed via the shared decoder. */
  featuresDetail(segments, lang) {
    return segments.map(seg => {
      const color = (typeof segmentColor === 'function') ? segmentColor(seg) : '';
      const feats = (seg.f || []).map(f => {
        const label = (typeof decodeGrammarFeature === 'function') ? decodeGrammarFeature(f, seg.g) : f;
        return `<span class="px-1.5 py-0.5 rounded bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-xs">${this.esc(label)}</span>`;
      }).join('');
      return `
        <div class="flex flex-wrap items-center gap-1.5 text-sm">
          <span class="ayah-arabic !text-base min-w-[2rem] ${color}">${seg.t}</span>
          ${feats || '<span class="text-xs text-gray-400">—</span>'}
          ${seg.l ? `<span class="text-xs text-gray-500 dark:text-gray-400 ml-1">${t('lemma', lang)}: <span class="ayah-arabic !text-base">${seg.l}</span></span>` : ''}
        </div>`;
    }).join('');
  }

  // ----------------------------------------------------------- interactions

  onClick(e) {
    const filterBtn = e.target.closest('[data-gfilter]');
    if (filterBtn) { this.filter = filterBtn.getAttribute('data-gfilter'); this.applyFilter(); return; }

    const sarfBtn = e.target.closest('[data-sarf-root]');
    if (sarfBtn) {
      const root = sarfBtn.getAttribute('data-sarf-root');
      if (typeof sarf !== 'undefined' && sarf && typeof sarf.openRoot === 'function') sarf.openRoot(root);
      return;
    }

    const wrBtn = e.target.closest('[data-gr-wordrepeat]');
    if (wrBtn) {
      if (typeof tabSystem !== 'undefined' && tabSystem) {
        if (tabSystem.switchTabWithReturn) tabSystem.switchTabWithReturn('wordrepeat');
        else tabSystem.switchTab('wordrepeat');
      }
      return;
    }

    const toggle = e.target.closest('[data-word-toggle]');
    if (toggle) {
      const id = toggle.getAttribute('data-word-toggle');
      const panel = this.container.querySelector(`[data-word-features="${id}"]`);
      const arrow = toggle.querySelector('[data-toggle-arrow]');
      if (panel) {
        const open = panel.classList.toggle('hidden') === false;
        if (arrow) arrow.textContent = open ? '▾' : '▸';
      }
      return;
    }

    const copyBtn = e.target.closest('[data-copy-morph]');
    if (copyBtn) { this.copyMorph(copyBtn); return; }
  }

  copyMorph(btn) {
    const text = decodeURIComponent(btn.getAttribute('data-copy-morph') || '');
    const done = () => {
      const original = btn.innerHTML;
      btn.innerHTML = `✓ ${t('copied', this.language)}`;
      setTimeout(() => { btn.innerHTML = original; }, 1500);
    };
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(() => this.fallbackCopy(text, done));
      } else {
        this.fallbackCopy(text, done);
      }
    } catch (err) {
      this.fallbackCopy(text, done);
    }
  }

  fallbackCopy(text, done) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); done(); } catch (err) { /* ignore */ }
    document.body.removeChild(ta);
  }

  /** Dim word rows that don't match the active POS filter; sync button styles. */
  applyFilter() {
    const active = 'bg-primary text-white';
    const idle = 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:text-primary';
    this.container.querySelectorAll('[data-gfilter]').forEach(btn => {
      const on = btn.getAttribute('data-gfilter') === this.filter;
      btn.className = `gr-filter-btn text-xs px-3 py-1.5 rounded-full transition-colors ${on ? active : idle}`;
    });
    this.container.querySelectorAll('[data-word-pos]').forEach(row => {
      const match = this.filter === 'all' || row.getAttribute('data-word-pos') === this.filter;
      row.classList.toggle('opacity-30', !match);
    });
  }
}

// Initialize when DOM is ready
let grammarView;
document.addEventListener('DOMContentLoaded', () => {
  grammarView = new GrammarView();
});
