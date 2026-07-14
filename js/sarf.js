/**
 * Sarf (صرف) — morphology charts for the Quran's most frequent roots.
 *
 * For each of the top ~30 roots, data/sarf.json holds every surface form that
 * actually occurs in the Quran (built from data/morphology), tagged with its
 * features. This module renders them as real, Quran-grounded paradigm tables:
 *   • Verbs  — conjugation by tense × person/gender × singular/dual/plural.
 *   • Nouns  — declension by gender/number × case (nominative/accusative/genitive/unmarked).
 * Every cell shows the actual form, how many times it occurs, and a sample verse.
 *
 * Renders into #sarf-container (tab "sarf").
 */

/**
 * Localized root glosses (data/sarf.json glosses are English-only).
 * Keyed by UI language → root. Add more languages here as needed;
 * missing entries fall back to the English gloss from sarf.json.
 */
const SARF_GLOSS = {
  bn: {
    'أله': 'ইলাহ / উপাস্য',
    'قول': 'বলা',
    'كون': 'হওয়া',
    'ربب': 'রব / প্রতিপালক',
    'أمن': 'ঈমান আনা / নিরাপত্তা',
    'علم': 'জানা / জ্ঞান',
    'قوم': 'জাতি / দাঁড়ানো',
    'أيي': 'কোন / নিদর্শন',
    'أتي': 'আসা',
    'كفر': 'কুফরি করা / অবিশ্বাস',
    'بين': 'মাঝে / স্পষ্ট',
    'شيأ': 'চাওয়া / বস্তু',
    'رسل': 'প্রেরণ করা / রাসূল',
    'يوم': 'দিন',
    'أرض': 'জমিন / পৃথিবী',
    'سمو': 'আকাশ / নাম',
    'كلل': 'সকল / প্রত্যেক',
    'عذب': 'শাস্তি দেওয়া / আযাব',
    'عمل': 'কাজ করা / আমল',
    'جعل': 'বানানো / নির্ধারণ করা',
    'رحم': 'রহমত / দয়া',
    'أنس': 'মানুষ',
    'رأي': 'দেখা',
    'كتب': 'লেখা / কিতাব',
    'هدي': 'হিদায়াত দেওয়া / পথ দেখানো',
    'ظلم': 'জুলুম করা / অন্ধকার',
    'نفس': 'আত্মা / নিজ',
    'قبل': 'পূর্বে',
    'نزل': 'নাযিল করা / অবতীর্ণ হওয়া',
    'ذكر': 'স্মরণ করা / যিকর',
  },
};

/**
 * Localized strings for the enrichments added to this module. These keys are
 * NOT yet in js/translations.js (which this module must not edit); they are
 * reported for later inclusion there. `ui()` prefers this map, then falls back
 * to t() so the strings resolve correctly the moment they land in translations.
 */
const SARF_STRINGS = {
  en: {
    sarf_search_placeholder: 'Filter roots…',
    sarf_no_roots: 'No roots match',
    sarf_prev_root: 'Previous root',
    sarf_next_root: 'Next root',
    sarf_distinct_forms: 'forms',
    sarf_practice: 'Practice',
    sarf_practice_prompt: 'Which form fits these features?',
    sarf_practice_correct: 'Correct!',
    sarf_practice_wrong: 'Not quite',
    sarf_practice_next: 'Next',
    sarf_practice_score: 'Score',
    sarf_practice_exit: 'Exit practice',
    sarf_practice_none: 'Not enough distinct forms in this root to practice.',
  },
  bn: {
    sarf_search_placeholder: 'রুট ছাঁকুন…',
    sarf_no_roots: 'কোনো রুট মেলেনি',
    sarf_prev_root: 'পূর্ববর্তী রুট',
    sarf_next_root: 'পরবর্তী রুট',
    sarf_distinct_forms: 'রূপ',
    sarf_practice: 'অনুশীলন',
    sarf_practice_prompt: 'এই বৈশিষ্ট্যগুলোর সাথে কোন রূপটি মেলে?',
    sarf_practice_correct: 'সঠিক!',
    sarf_practice_wrong: 'ঠিক হয়নি',
    sarf_practice_next: 'পরবর্তী',
    sarf_practice_score: 'স্কোর',
    sarf_practice_exit: 'অনুশীলন বন্ধ',
    sarf_practice_none: 'অনুশীলনের জন্য এই রুটে যথেষ্ট ভিন্ন রূপ নেই।',
  },
};

class Sarf {
  constructor() {
    this.container = document.getElementById('sarf-container');
    if (!this.container) return;
    this.language = (typeof appSettings !== 'undefined' && appSettings)
      ? appSettings.get('language') : 'en';
    this.data = null;
    this.root = null;
    this.loaded = false;
    this.practiceOn = false;   // quiz mode toggle
    this.quiz = null;          // current practice question
    this.score = { right: 0, total: 0 };

    window.addEventListener('tabChanged', (e) => { if (e.detail.tabId === 'sarf') this.ensureLoaded(); });
    window.addEventListener('settingChanged', (e) => {
      if (e.detail.key === 'language') { this.language = e.detail.value; if (this.loaded) this.render(); }
    });
  }

  tt(key) { return t(key, this.language); }

  /** Like tt(), but prefers the local SARF_STRINGS map for enrichment-only keys. */
  ui(key) {
    const map = SARF_STRINGS[this.language] || SARF_STRINGS.en;
    return (map && map[key]) || (SARF_STRINGS.en && SARF_STRINGS.en[key]) || t(key, this.language);
  }

  /** Localized gloss for a root, falling back to the English gloss in sarf.json. */
  gloss(root) {
    const map = SARF_GLOSS[this.language];
    return (map && map[root]) || this.data.roots[root].gloss || '';
  }

  /** Per-form meaning in the UI language (fetched WBW), falling back to the baked English. */
  localMeaning(m) {
    const map = this._meanings && this._meanings[`${this.language}:${this.root}`];
    return (map && map[`${m.form}|${m.ref}`]) || m.meaning;
  }

  /**
   * The meanings baked into sarf.json are English WBW. For other UI languages,
   * fetch each form's sample verse word-by-word in that language and match the
   * form to its word, then re-render. Cached per language:root.
   */
  async ensureMeanings() {
    const lang = this.language;
    const root = this.root;
    if (lang === 'en' || typeof QuranData === 'undefined') return;
    const key = `${lang}:${root}`;
    this._meanings = this._meanings || {};
    this._meanInflight = this._meanInflight || new Set();
    if (this._meanings[key] || this._meanInflight.has(key)) return;
    this._meanInflight.add(key);
    const token = this._meanToken = (this._meanToken || 0) + 1;
    try {
      const r = this.data.roots[root];
      const forms = r.verbs.concat(r.nouns);
      const norm = w => QuranData.normalizeWord ? QuranData.normalizeWord(w) : w;
      const byRef = {};
      forms.forEach(m => { (byRef[m.ref] = byRef[m.ref] || []).push(m); });
      const refs = Object.keys(byRef);
      const map = {};
      for (let i = 0; i < refs.length; i += 6) {
        if (token !== this._meanToken) return;
        await Promise.all(refs.slice(i, i + 6).map(async ref => {
          try {
            const [s, a] = ref.split(':').map(Number);
            const verses = await QuranData.fetchRange(s, a, a, lang);
            const words = (verses && verses[0] && verses[0].words) || [];
            byRef[ref].forEach(m => {
              const nf = norm(m.form);
              const hit = words.find(w => norm(w.arabic || '') === nf);
              if (hit && hit.meaning) map[`${m.form}|${m.ref}`] = hit.meaning;
            });
          } catch (e) { /* keep the English fallback for this ref */ }
        }));
      }
      if (token !== this._meanToken) return;
      this._meanings[key] = map;
      if (this.language === lang && this.root === root) this.render();
    } finally {
      this._meanInflight.delete(key);
    }
  }

  async ensureLoaded() {
    if (this.loaded) { this.applyPendingRoot(); this.render(); return; }
    this.container.innerHTML = `<div class="text-center py-16 text-gray-400">${this.tt('loading')}</div>`;
    try {
      this.data = await fetch('data/sarf.json').then(r => r.json());
    } catch (e) {
      this.container.innerHTML = `<div class="text-center py-16 text-red-500">${this.tt('topics_load_error')}</div>`;
      return;
    }
    this.root = this.data.order[0];
    try {
      const last = localStorage.getItem('sarf_last_root');
      if (last && this.data.roots[last]) this.root = last;
    } catch (e) { /* localStorage unavailable */ }
    this.loaded = true;
    this.bindOnce();
    this.applyPendingRoot();
    this.render();
  }

  applyPendingRoot() {
    if (this._pendingRoot && this.data && this.data.roots[this._pendingRoot]) this.root = this._pendingRoot;
    this._pendingRoot = null;
  }

  /** Other modules (e.g. Word-Repetition) jump here with a specific root. */
  hasRoot(root) { return !!(this.loaded && this.data && this.data.roots[root]); }
  openRoot(root) {
    this._pendingRoot = root;
    if (typeof tabSystem !== 'undefined' && tabSystem) {
      if (tabSystem.switchTabWithReturn) tabSystem.switchTabWithReturn('sarf');
      else tabSystem.switchTab('sarf');
    }
  }

  /** Change the active root: persist it, reset any in-progress quiz, re-render. */
  setRoot(root) {
    if (!this.data.roots[root]) return;
    this.root = root;
    try { localStorage.setItem('sarf_last_root', root); } catch (e) { /* ignore */ }
    this.quiz = this.practiceOn ? this.buildQuiz(this.data.roots[root]) : null;
    this.render();
  }

  bindOnce() {
    this.container.addEventListener('click', (e) => {
      const rootBtn = e.target.closest('[data-sarf-root]');
      if (rootBtn) { this.setRoot(rootBtn.getAttribute('data-sarf-root')); return; }

      // Prev / next root navigation
      const nav = e.target.closest('[data-sarf-nav]');
      if (nav) {
        const order = this.data.order;
        const idx = order.indexOf(this.root);
        const next = nav.getAttribute('data-sarf-nav') === 'next' ? idx + 1 : idx - 1;
        if (next >= 0 && next < order.length) this.setRoot(order[next]);
        return;
      }

      // Practice mode controls
      if (e.target.closest('[data-sarf-practice-toggle]')) {
        this.practiceOn = !this.practiceOn;
        this.quiz = this.practiceOn ? this.buildQuiz(this.data.roots[this.root]) : null;
        this.render();
        return;
      }
      if (e.target.closest('[data-sarf-practice-exit]')) {
        this.practiceOn = false; this.quiz = null; this.render(); return;
      }
      if (e.target.closest('[data-sarf-practice-next]')) {
        this.quiz = this.buildQuiz(this.data.roots[this.root]); this.render(); return;
      }
      const opt = e.target.closest('[data-sarf-practice-opt]');
      if (opt && this.quiz && this.quiz.picked == null) {
        const picked = opt.getAttribute('data-sarf-practice-opt');
        this.quiz.picked = picked;
        this.score.total++;
        if (picked === this.quiz.answer) this.score.right++;
        this.render();
        return;
      }

      const verse = e.target.closest('[data-verse]');
      if (verse && typeof ayahModal !== 'undefined' && ayahModal) {
        ayahModal.open(verse.getAttribute('data-verse'), { word: verse.getAttribute('data-word') });
      }
    });

    // Live root filter — toggles rail buttons without a full re-render (keeps focus).
    this.container.addEventListener('input', (e) => {
      if (e.target.id === 'sarf-search') this.filterRail(e.target.value);
    });
  }

  /** Show/hide rail buttons whose searchable text contains the query. */
  filterRail(q) {
    const query = (q || '').trim().toLowerCase();
    const rail = this.container.querySelector('#sarf-rail');
    if (!rail) return;
    let shown = 0;
    rail.querySelectorAll('.sarf-rail-btn').forEach(btn => {
      const hay = btn.getAttribute('data-search') || '';
      const match = !query || hay.indexOf(query) !== -1;
      btn.classList.toggle('hidden', !match);
      if (match) shown++;
    });
    const empty = this.container.querySelector('#sarf-norail');
    if (empty) empty.classList.toggle('hidden', shown !== 0);
  }

  /** Left vertical root rail (horizontal chip strip on mobile). */
  railHtml() {
    return this.data.order.map(root => {
      const rr = this.data.roots[root];
      const gl = this.gloss(root);
      const active = root === this.root;
      const search = `${root} ${gl} ${rr.gloss || ''}`.toLowerCase();
      return `
        <button data-sarf-root="${root}" data-search="${this.esc(search)}"
                class="sarf-rail-btn shrink-0 md:shrink md:w-full text-start px-3 py-2 rounded-lg border-s-2 transition-colors
                       ${active
                         ? 'bg-primary/10 border-primary text-primary dark:text-blue-300'
                         : 'border-transparent hover:bg-gray-100 dark:hover:bg-gray-700/60 text-gray-700 dark:text-gray-200'}">
          <span class="flex items-center gap-2">
            <span class="ayah-arabic !text-2xl !leading-none !mb-0 !pb-0 !border-b-0" dir="rtl">${this.esc(root)}</span>
            <span class="min-w-0">
              ${gl ? `<span class="block text-sm truncate max-w-[9rem]" dir="auto">${this.esc(gl)}</span>` : ''}
              <span class="block text-xs ${active ? 'text-primary/70 dark:text-blue-300/70' : 'text-gray-400'}">×${rr.count}</span>
            </span>
          </span>
        </button>`;
    }).join('');
  }

  render() {
    // Preserve the rail's scroll position across re-renders
    const oldRail = this.container.querySelector('#sarf-rail');
    const railScroll = oldRail ? { top: oldRail.scrollTop, left: oldRail.scrollLeft } : null;

    const r = this.data.roots[this.root];
    const PERSON = { '1': this.tt('sarf_1st'), '2': this.tt('sarf_2nd'), '3': this.tt('sarf_3rd') };
    const NUM = { S: this.tt('sarf_singular'), D: this.tt('sarf_dual'), P: this.tt('sarf_plural') };
    this.container.innerHTML = `
      <div class="w-full">
        <div class="text-center mb-4">
          <p class="text-gray-500 dark:text-gray-400 text-sm">${this.tt('sarf_subtitle')}</p>
        </div>
        <div class="flex flex-col md:flex-row gap-4 items-start">
          <div class="w-full md:w-56 shrink-0 md:sticky md:top-20">
            <div class="relative mb-2">
              <span class="absolute inset-y-0 start-2 flex items-center text-gray-400 pointer-events-none">🔍</span>
              <input id="sarf-search" type="search" autocomplete="off" placeholder="${this.esc(this.ui('sarf_search_placeholder'))}"
                     aria-label="${this.esc(this.ui('sarf_search_placeholder'))}"
                     class="w-full ps-8 pe-2 py-1.5 text-sm rounded-lg border border-gray-200 dark:border-gray-700
                            bg-white dark:bg-gray-800 focus:outline-none focus:border-primary" />
            </div>
            <nav id="sarf-rail" aria-label="${this.tt('sarf_title')}"
                 class="w-full flex md:flex-col gap-1 overflow-x-auto md:overflow-x-hidden md:overflow-y-auto
                        md:max-h-[70vh] pb-2 md:pb-0 md:pe-1
                        border-b md:border-b-0 md:border-e border-gray-100 dark:border-gray-700">
              ${this.railHtml()}
            </nav>
            <div id="sarf-norail" class="hidden text-xs text-gray-400 py-3 text-center">${this.esc(this.ui('sarf_no_roots'))}</div>
          </div>
          <div class="flex-1 min-w-0 w-full">
            ${this.headerHtml(r)}
            ${this.practiceOn
              ? this.practiceHtml(r)
              : `${r.verbs.length ? this.verbSection(r.verbs, PERSON, NUM) : ''}${r.nouns.length ? this.nounSection(r.nouns, NUM) : ''}`}
          </div>
        </div>
      </div>`;

    const rail = this.container.querySelector('#sarf-rail');
    if (rail) {
      if (railScroll) {
        rail.scrollTop = railScroll.top;
        rail.scrollLeft = railScroll.left;
      } else {
        // First paint (or external openRoot jump): bring the active root into view
        const btn = rail.querySelector('[data-sarf-root].bg-primary\\/10, .sarf-rail-btn.bg-primary\\/10') ||
                    rail.querySelector(`[data-sarf-root="${CSS.escape(this.root)}"]`);
        if (btn) {
          rail.scrollTop = Math.max(0, btn.offsetTop - rail.clientHeight / 2);
          rail.scrollLeft = Math.max(0, btn.offsetLeft - rail.clientWidth / 2);
        }
      }
    }

    // Localize the per-form meanings for non-English UI languages (async, cached)
    this.ensureMeanings();
  }

  // ---- Verbs: conjugation tables per tense -------------------------------
  verbSection(verbs, PERSON, NUM) {
    const tenses = [['perfect', this.tt('sarf_perfect')], ['imperfect', this.tt('sarf_imperfect')], ['imperative', this.tt('sarf_imperative')]];
    // '' gender = gender-common forms (e.g. 2nd-person duals) in a shared, unlabeled-gender row
    const rows = [['3', 'M'], ['3', 'F'], ['3', ''], ['2', 'M'], ['2', 'F'], ['2', ''], ['1', '']];
    const cols = ['S', 'D', 'P'];
    let html = `<h3 class="text-lg font-bold mb-2">🔤 ${this.tt('sarf_verbs')}</h3>`;
    for (const [tKey, tLabel] of tenses) {
      const set = verbs.filter(v => v.tense === tKey);
      if (!set.length) continue;
      html += `
        <div class="mb-5 overflow-x-auto">
          <div class="text-sm font-semibold text-secondary mb-1">${tLabel}</div>
          <table class="w-full text-center border-collapse">
            <thead><tr class="text-xs text-gray-400">
              <th class="p-1"></th>${cols.map(c => `<th class="p-1 font-medium">${NUM[c]}</th>`).join('')}
            </tr></thead>
            <tbody>
              ${rows.map(([p, g]) => {
                const label = !g ? PERSON[p] : `${PERSON[p]} ${g === 'M' ? this.tt('sarf_masc') : this.tt('sarf_fem')}`;
                const cells = cols.map(c => {
                  const matches = set.filter(v => v.person === p && (p === '1' || v.gender === g) && v.number === c);
                  return `<td class="p-1 border border-gray-100 dark:border-gray-700">${this.cellHtml(matches)}</td>`;
                }).join('');
                if (!cols.some(c => set.some(v => v.person === p && (p === '1' || v.gender === g) && v.number === c))) return '';
                return `<tr><td class="p-1 text-xs text-gray-500 text-right whitespace-nowrap">${label}</td>${cells}</tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>`;
    }
    return html;
  }

  // ---- Nouns: declension by (gender/number) × case -----------------------
  nounSection(nouns, NUM) {
    const cases = [['nominative', this.tt('sarf_nom')], ['accusative', this.tt('sarf_acc')], ['genitive', this.tt('sarf_gen')]];
    // indeclinable/unmarked forms (case '') get their own column, only when present
    if (nouns.some(n => n.case === '')) cases.push(['', this.tt('sarf_case_none')]);
    // distinct (gender, number, ntype) rows present
    const seen = [];
    for (const n of nouns) {
      const key = `${n.gender}|${n.number}|${n.ntype}`;
      if (!seen.find(x => x.key === key)) seen.push({ key, gender: n.gender, number: n.number, ntype: n.ntype });
    }
    const numOrder = { S: 0, D: 1, P: 2 };
    seen.sort((a, b) => ((numOrder[a.number] ?? 3) - (numOrder[b.number] ?? 3)) || a.gender.localeCompare(b.gender));
    let html = `<h3 class="text-lg font-bold mb-2 mt-4">📐 ${this.tt('sarf_nouns')}</h3>
      <div class="overflow-x-auto"><table class="w-full text-center border-collapse">
        <thead><tr class="text-xs text-gray-400">
          <th class="p-1"></th>${cases.map(c => `<th class="p-1 font-medium">${c[1]}</th>`).join('')}
        </tr></thead><tbody>`;
    for (const row of seen) {
      const parts = [];
      if (row.gender) parts.push(row.gender === 'M' ? this.tt('sarf_masc') : this.tt('sarf_fem'));
      parts.push(NUM[row.number] || row.number);
      if (row.ntype !== 'noun') parts.push(this.tt('sarf_type_' + row.ntype.replace('-', '_')) || row.ntype);
      const label = parts.join(' · ');
      const cells = cases.map(([cKey]) => {
        const matches = nouns.filter(n => n.gender === row.gender && n.number === row.number && n.ntype === row.ntype && n.case === cKey);
        return `<td class="p-1 border border-gray-100 dark:border-gray-700">${this.cellHtml(matches)}</td>`;
      }).join('');
      html += `<tr><td class="p-1 text-xs text-gray-500 text-right whitespace-nowrap">${label}</td>${cells}</tr>`;
    }
    html += `</tbody></table></div>`;
    return html;
  }

  cellHtml(matches) {
    if (!matches.length) return '<span class="text-gray-300 dark:text-gray-600">—</span>';
    // distinct forms, kept separate per voice; active before passive
    const byForm = {};
    for (const m of matches) { const k = `${m.form}|${m.voice || ''}`; if (!byForm[k]) byForm[k] = m; }
    const forms = Object.values(byForm).sort((a, b) => (a.voice === 'passive') - (b.voice === 'passive'));
    return forms.map(m => {
      const voice = m.voice ? this.tt(m.voice === 'passive' ? 'sarf_passive' : 'sarf_active') : '';
      const meaning = this.localMeaning(m);
      return `
      <button data-verse="${m.ref}" data-word="${this.esc(m.form)}" title="${m.count}× · ${m.ref}${voice ? ' · ' + voice : ''}${meaning ? ' · ' + this.esc(meaning) : ''}" class="inline-block px-1 rounded hover:bg-primary hover:text-white">
        <span class="ayah-arabic !text-2xl !leading-snug !mb-0 !pb-0 !border-b-0 block" dir="rtl">${this.esc(m.form)}</span>
        ${m.voice === 'passive' ? `<span class="block text-xs font-medium text-amber-600 dark:text-amber-400 leading-tight">${this.tt('sarf_passive')}</span>` : ''}
        ${meaning ? `<span class="block text-xs text-gray-500 dark:text-gray-400 leading-tight max-w-[8rem] truncate mx-auto" dir="auto">${this.esc(meaning)}</span>` : ''}
        <span class="block text-xs text-gray-400 leading-none">×${m.count}</span>
      </button>`;
    }).join(' ');
  }

  // ---- Root header: big root, prev/next nav, compact summary, practice toggle ----
  headerHtml(r) {
    const idx = this.data.order.indexOf(this.root);
    const gl = this.gloss(this.root);
    const distinct = new Set(r.verbs.concat(r.nouns).map(m => m.form)).size;
    const verbOcc = r.verbs.reduce((s, v) => s + (v.count || 0), 0);
    const nounOcc = r.nouns.reduce((s, n) => s + (n.count || 0), 0);
    const canPractice = distinct >= 2;
    const navBtn = (dir, label, glyph, disabled) => `
      <button data-sarf-nav="${dir}" ${disabled ? 'disabled' : ''} aria-label="${this.esc(label)}" title="${this.esc(label)}"
              class="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700
                     ${disabled ? 'opacity-30 cursor-not-allowed' : 'hover:border-primary hover:text-primary'}">${glyph}</button>`;
    const chip = (txt) => `<span class="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">${txt}</span>`;
    return `
      <div class="mb-5">
        <div class="flex items-center justify-center gap-3 mb-2">
          ${navBtn('prev', this.ui('sarf_prev_root'), '‹', idx <= 0)}
          <div class="text-center">
            <span class="ayah-arabic !text-4xl !mb-0 !pb-0 !border-b-0" dir="rtl">${this.esc(this.root)}</span>
            <div class="text-xs text-gray-400 mt-0.5">${idx + 1} / ${this.data.order.length}</div>
          </div>
          ${navBtn('next', this.ui('sarf_next_root'), '›', idx >= this.data.order.length - 1)}
        </div>
        ${gl ? `<div class="text-center text-sm font-medium text-gray-600 dark:text-gray-300 mb-2" dir="auto">${this.esc(gl)}</div>` : ''}
        <div class="flex flex-wrap items-center justify-center gap-1.5 mb-3">
          ${chip(`${r.count} ${this.tt('sarf_occurrences')}`)}
          ${chip(`${distinct} ${this.ui('sarf_distinct_forms')}`)}
          ${r.verbs.length ? chip(`🔤 ${this.tt('sarf_verbs')} ×${verbOcc}`) : ''}
          ${r.nouns.length ? chip(`📐 ${this.tt('sarf_nouns')} ×${nounOcc}`) : ''}
        </div>
        ${canPractice ? `<div class="text-center">
          <button data-sarf-practice-toggle
                  class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
                         ${this.practiceOn ? 'bg-primary text-white' : 'bg-primary/10 text-primary dark:text-blue-300 hover:bg-primary hover:text-white'}">
            🎯 ${this.esc(this.ui('sarf_practice'))}
          </button>
        </div>` : ''}
      </div>`;
  }

  /** Human-readable, localized feature tags for a form (used by practice mode). */
  featureTags(m) {
    const P = { '1': this.tt('sarf_1st'), '2': this.tt('sarf_2nd'), '3': this.tt('sarf_3rd') };
    const N = { S: this.tt('sarf_singular'), D: this.tt('sarf_dual'), P: this.tt('sarf_plural') };
    const CASE = { nominative: 'sarf_nom', accusative: 'sarf_acc', genitive: 'sarf_gen' };
    const tags = [];
    if (m.tense) {
      tags.push(this.tt('sarf_' + m.tense));
      if (P[m.person]) tags.push(P[m.person]);
      if (m.gender) tags.push(m.gender === 'M' ? this.tt('sarf_masc') : this.tt('sarf_fem'));
      if (N[m.number]) tags.push(N[m.number]);
      if (m.voice) tags.push(this.tt(m.voice === 'passive' ? 'sarf_passive' : 'sarf_active'));
    } else {
      if (m.ntype && m.ntype !== 'noun') tags.push(this.tt('sarf_type_' + m.ntype.replace('-', '_')));
      if (m.gender) tags.push(m.gender === 'M' ? this.tt('sarf_masc') : this.tt('sarf_fem'));
      if (N[m.number]) tags.push(N[m.number]);
      if (m.case && CASE[m.case]) tags.push(this.tt(CASE[m.case]));
    }
    return tags.filter(Boolean);
  }

  /** Build one practice question from a root's own forms (answer + distractors). */
  buildQuiz(r) {
    const all = r.verbs.concat(r.nouns);
    const byForm = {};
    for (const m of all) { if (!byForm[m.form]) byForm[m.form] = m; }
    const distinct = Object.values(byForm);
    if (distinct.length < 2) return null;
    const shuffle = (arr) => { for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [arr[i], arr[j]] = [arr[j], arr[i]]; } return arr; };
    const answer = distinct[Math.floor(Math.random() * distinct.length)];
    const others = shuffle(distinct.filter(m => m.form !== answer.form)).slice(0, 3);
    const options = shuffle([answer, ...others]).map(m => m.form);
    return { answer: answer.form, options, tags: this.featureTags(answer), picked: null };
  }

  // ---- Practice mode: identify the form matching a set of feature tags -------
  practiceHtml(r) {
    if (!this.quiz) this.quiz = this.buildQuiz(r);
    const q = this.quiz;
    if (!q) {
      return `<div class="max-w-md mx-auto text-center py-8">
        <p class="text-gray-400 mb-4">${this.esc(this.ui('sarf_practice_none'))}</p>
        <button data-sarf-practice-exit class="text-xs text-gray-400 hover:text-primary">${this.esc(this.ui('sarf_practice_exit'))}</button>
      </div>`;
    }
    const answered = q.picked != null;
    const opts = q.options.map(f => {
      let cls = 'border-gray-200 dark:border-gray-700 hover:border-primary';
      if (answered) {
        if (f === q.answer) cls = 'border-green-500 bg-green-500/10';
        else if (f === q.picked) cls = 'border-red-500 bg-red-500/10';
        else cls = 'border-gray-200 dark:border-gray-700 opacity-50';
      }
      return `<button ${answered ? 'disabled' : ''} data-sarf-practice-opt="${this.esc(f)}"
                class="border-2 rounded-lg py-3 ${cls}"><span class="ayah-arabic !text-3xl !leading-snug !mb-0 !pb-0 !border-b-0" dir="rtl">${this.esc(f)}</span></button>`;
    }).join('');
    return `
      <div class="max-w-md mx-auto">
        <div class="flex items-center justify-between mb-3">
          <span class="text-sm font-semibold">🎯 ${this.esc(this.ui('sarf_practice'))}</span>
          <span class="text-xs text-gray-500 dark:text-gray-400">${this.esc(this.ui('sarf_practice_score'))}: <span class="font-semibold">${this.score.right}/${this.score.total}</span></span>
        </div>
        <div class="rounded-xl border border-gray-200 dark:border-gray-700 p-4">
          <p class="text-sm text-gray-500 dark:text-gray-400 text-center mb-1">${this.esc(this.ui('sarf_practice_prompt'))}</p>
          <div class="text-center mb-3"><span class="ayah-arabic !text-2xl !mb-0 !pb-0 !border-b-0 text-gray-400" dir="rtl">${this.esc(this.root)}</span></div>
          <div class="flex flex-wrap gap-1.5 justify-center mb-4">
            ${q.tags.map(tg => `<span class="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary dark:text-blue-300">${this.esc(tg)}</span>`).join('')}
          </div>
          <div class="grid grid-cols-2 gap-2">${opts}</div>
          ${answered ? `
            <div class="mt-4 text-center text-sm font-semibold ${q.picked === q.answer ? 'text-green-600 dark:text-green-400' : 'text-red-500'}">
              ${this.esc(q.picked === q.answer ? this.ui('sarf_practice_correct') : this.ui('sarf_practice_wrong'))}
            </div>
            <div class="text-center mt-3">
              <button data-sarf-practice-next class="px-4 py-1.5 rounded-lg bg-primary text-white text-sm font-medium hover:opacity-90">${this.esc(this.ui('sarf_practice_next'))} →</button>
            </div>` : ''}
        </div>
        <div class="text-center mt-3">
          <button data-sarf-practice-exit class="text-xs text-gray-400 hover:text-primary">${this.esc(this.ui('sarf_practice_exit'))}</button>
        </div>
      </div>`;
  }

  esc(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
}

let sarf;
document.addEventListener('DOMContentLoaded', () => { sarf = new Sarf(); });
