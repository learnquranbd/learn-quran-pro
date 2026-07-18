/**
 * 99 Names of Allah Module (Learn tab > Names)
 * Browse grid with search + audio, memorization sets (9 groups of 11 with
 * localStorage progress), the 25 prophets named in the Quran (with verified
 * mention counts + tap-through to every verse), and a 10-round recall quiz
 * in both directions (name→meaning and meaning→name).
 * Renders lazily into #learn-names-root when the Learn hub dispatches
 * 'learnModuleSelected' with {module:'names'}. Uses NAMES_99 / PROPHETS_25
 * from js/names-data.js and browser TTS (Arabic voice) with graceful fallback.
 */

const NAMES_QUIZ_ROUNDS = 10;
const NAMES_QUIZ_BEST_KEY = 'namesQuizBest';          // name → meaning
const NAMES_QUIZ_BEST_REV_KEY = 'namesQuizBestRev';   // meaning → name
const NAMES_LEARNED_KEY = 'namesLearned';             // JSON array of learned n's
const NAMES_FAVORITES_KEY = 'lq_names_favorites';     // JSON array of favorited n's
const NAMES_GROUP_SIZE = 11;                          // 9 groups of 11

class NamesOfAllah {
  constructor() {
    this.root = document.getElementById('learn-names-root');

    this.language = (typeof appSettings !== 'undefined' && appSettings)
      ? appSettings.get('language')
      : 'en';

    this.rendered = false;
    this.mode = 'browse';            // browse | memorize | prophets | quiz
    this.query = '';                 // browse search text
    this.quiz = null;                // active quiz state (null in quiz mode = direction picker)
    this.quizTimer = null;
    this.memGroup = null;            // selected memorize group (0-8); null = auto-pick
    this.memRevealed = new Set();    // name numbers with meaning revealed this session
    this.favOnly = false;            // browse: show only favorited names
    this.fcOrder = null;             // flashcard order (array of n's); null = natural
    this.fcIndex = 0;                // flashcard current position
    this.fcFlipped = false;          // flashcard: meaning revealed
    this.ttsNoteDismissed = false;
    this.listenersBound = false;

    if (this.root) this.bindListeners();

    window.addEventListener('learnModuleSelected', (e) => {
      if (e.detail && e.detail.module === 'names') {
        // The root may be injected after this script was constructed
        if (!this.root) {
          this.root = document.getElementById('learn-names-root');
          if (this.root) this.bindListeners();
        }
        if (!this.rendered && this.root) {
          this.rendered = true;
          this.render();
        }
      }
    });

    window.addEventListener('settingChanged', (e) => {
      if (e.detail && e.detail.key === 'language') {
        this.language = e.detail.value;
        if (this.rendered) this.render();
      }
    });

    // Warm up the async voice list so an Arabic voice is ready on first tap
    if (window.speechSynthesis) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.addEventListener?.('voiceschanged', () => {}, { once: true });
    }
  }

  bindListeners() {
    if (this.listenersBound || !this.root) return;
    this.listenersBound = true;
    this.root.addEventListener('click', (e) => this.onClick(e));
    this.root.addEventListener('input', (e) => {
      if (e.target && e.target.id === 'names-search') {
        this.query = e.target.value;
        this.updateGrid();
      }
    });
  }

  // ---------- persistence ----------

  bestScoreKey(dir) {
    return dir === 'm2n' ? NAMES_QUIZ_BEST_REV_KEY : NAMES_QUIZ_BEST_KEY;
  }

  getBestScore(dir) {
    try {
      const v = parseInt(localStorage.getItem(this.bestScoreKey(dir)), 10);
      return isNaN(v) ? null : v;
    } catch (err) {
      return null;
    }
  }

  saveBestScore(dir, score) {
    try {
      localStorage.setItem(this.bestScoreKey(dir), String(score));
    } catch (err) { /* private mode — ignore */ }
  }

  /** Set of learned name numbers (memorization progress) */
  getLearned() {
    try {
      const arr = JSON.parse(localStorage.getItem(NAMES_LEARNED_KEY) || '[]');
      return new Set(Array.isArray(arr) ? arr.filter(n => Number.isInteger(n)) : []);
    } catch (err) {
      return new Set();
    }
  }

  saveLearned(set) {
    try {
      localStorage.setItem(NAMES_LEARNED_KEY, JSON.stringify([...set].sort((a, b) => a - b)));
    } catch (err) { /* private mode — ignore */ }
  }

  toggleLearned(n) {
    const set = this.getLearned();
    if (set.has(n)) set.delete(n); else set.add(n);
    this.saveLearned(set);
    return set;
  }

  /** Set of favorited (bookmarked) name numbers */
  getFavorites() {
    try {
      const arr = JSON.parse(localStorage.getItem(NAMES_FAVORITES_KEY) || '[]');
      return new Set(Array.isArray(arr) ? arr.filter(n => Number.isInteger(n)) : []);
    } catch (err) {
      return new Set();
    }
  }

  saveFavorites(set) {
    try {
      localStorage.setItem(NAMES_FAVORITES_KEY, JSON.stringify([...set].sort((a, b) => a - b)));
    } catch (err) { /* private mode — ignore */ }
  }

  toggleFavorite(n) {
    const set = this.getFavorites();
    if (set.has(n)) set.delete(n); else set.add(n);
    this.saveFavorites(set);
    return set;
  }

  // ---------- helpers ----------

  meaningOf(name) {
    return name.meanings[this.language] || name.meanings.en;
  }

  /** Deterministic "name of the day" — same name for everyone on a given date */
  nameOfDay() {
    if (!Array.isArray(NAMES_99) || !NAMES_99.length) return null;
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const dayOfYear = Math.floor((now - start) / 86400000);
    const idx = ((dayOfYear % NAMES_99.length) + NAMES_99.length) % NAMES_99.length;
    return NAMES_99[idx];
  }

  prophetNameOf(p) {
    return p.names[this.language] || p.names.en;
  }

  shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // ---------- TTS ----------

  /**
   * Speak an Arabic name via speech synthesis; prefer an Arabic voice.
   * Falls back gracefully (visual-only + dismissible note) when unavailable.
   */
  speakArabic(text) {
    if (!window.speechSynthesis || typeof SpeechSynthesisUtterance === 'undefined') {
      this.showTtsNote();
      return;
    }
    const synth = window.speechSynthesis;
    const voices = synth.getVoices();
    if (!voices.length) {
      // No voices at all on this device — keep working visually
      this.showTtsNote();
    }
    const arVoice = voices.find(v => v.lang && v.lang.toLowerCase().startsWith('ar'));
    const utter = new SpeechSynthesisUtterance(text);
    if (arVoice) utter.voice = arVoice;
    utter.lang = arVoice ? arVoice.lang : 'ar-SA';
    utter.rate = 0.8;
    try {
      synth.cancel();
      synth.speak(utter);
    } catch (err) {
      this.showTtsNote();
    }
  }

  showTtsNote() {
    if (this.ttsNoteDismissed) return;
    const note = this.root.querySelector('#names-tts-note');
    if (note) note.classList.remove('hidden');
  }

  // ---------- name detail (audio + Quranic occurrences + reflection) ------

  async loadTokens() {
    if (!this._tokensPromise) {
      this._tokensPromise = fetch('data/quran-tokens.json')
        .then(r => r.json())
        .catch(() => { this._tokensPromise = null; return null; }); // don't cache failures — retry next open
    }
    return this._tokensPromise;
  }

  ensureNameModal() {
    if (this.nameModal) return;
    this.nameModal = document.createElement('div');
    this.nameModal.id = 'names-detail-modal';
    this.nameModal.className = 'fixed inset-0 bg-black/60 z-[70] items-center justify-center p-4 hidden';
    this.nameModal.innerHTML = `
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-lg max-h-[85vh] flex flex-col">
        <div class="flex items-center gap-2 px-5 py-3 border-b border-gray-200 dark:border-gray-700">
          <h3 id="names-detail-title" class="flex-1 font-bold text-gray-800 dark:text-gray-100"></h3>
          <button id="names-detail-close" title="${t('close', this.language)}" aria-label="${t('close', this.language)}"
                  class="p-2 min-w-[2.5rem] min-h-[2.5rem] rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700">✕</button>
        </div>
        <div id="names-detail-body" class="flex-1 overflow-y-auto p-5"></div>
      </div>`;
    document.body.appendChild(this.nameModal);
    if (window.escClose) window.escClose(this.nameModal, () => { if (this._nameAudio) this._nameAudio.pause(); try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch (e) { /* ignore */ } this.nameModal.classList.add('hidden'); this.nameModal.classList.remove('flex'); });
    this.nameModal.addEventListener('click', (e) => {
      if (e.target === this.nameModal || e.target.closest('#names-detail-close')) {
        if (this._nameAudio) this._nameAudio.pause();
        try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch (err) { /* ignore */ }
        this.nameModal.classList.add('hidden'); this.nameModal.classList.remove('flex'); return;
      }
      const sp = e.target.closest('[data-name-speak]');
      if (sp) {
        // Prefer real recitation (resolved from the name's first Quranic occurrence)
        const url = sp.getAttribute('data-name-audio');
        if (url) {
          if (!this._nameAudio) this._nameAudio = new Audio();
          this._nameAudio.src = url;
          this._nameAudio.play().catch(() => this.speakArabic(sp.getAttribute('data-name-speak')));
        } else {
          this.speakArabic(sp.getAttribute('data-name-speak'));
        }
        return;
      }
      const verse = e.target.closest('[data-verse]');
      if (verse) {
        const ref = verse.getAttribute('data-verse');
        if (typeof ayahModal !== 'undefined' && ayahModal) ayahModal.open(ref, { word: this._openWord || null });
      }
    });
  }

  async openName(name) {
    const lang = this.language;
    this._openName = name;
    this._openWord = name.ar;
    this.ensureNameModal();
    this.nameModal.classList.remove('hidden'); this.nameModal.classList.add('flex');
    this.speakArabic(name.ar);
    const title = this.nameModal.querySelector('#names-detail-title');
    const body = this.nameModal.querySelector('#names-detail-body');
    title.textContent = `${name.n}. ${name.translit}`;
    body.innerHTML = `
      <div class="text-center mb-4">
        <div class="ayah-arabic !text-5xl mb-2" dir="rtl">${name.ar}</div>
        <div class="text-lg font-semibold text-gray-800 dark:text-gray-100">${this.escapeHtml(name.translit)}</div>
        <div class="text-gray-500 dark:text-gray-400" dir="auto">${this.escapeHtml(this.meaningOf(name))}</div>
        <button data-name-speak="${this.escapeHtml(name.ar)}" class="mt-3 px-4 py-2 rounded-lg bg-primary text-white text-sm hover:bg-primary/80">🔊 ${t('play', lang)}</button>
      </div>
      <div class="rounded-xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 p-4 mb-4">
        <p class="text-sm text-indigo-800 dark:text-indigo-200" dir="auto">💭 ${t('names_reflect_lead', lang)} <b>${this.escapeHtml(this.meaningOf(name))}</b>. ${t('names_reflect_body', lang)}</p>
        <div class="flex flex-wrap gap-2 mt-3">
          <a href="https://quran.com/search?q=${encodeURIComponent(name.ar)}" target="_blank" rel="noopener" class="text-xs px-3 py-1.5 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:shadow">🔎 ${t('names_search_quran', lang)}</a>
          <a href="https://myislam.org/99-names-of-allah/" target="_blank" rel="noopener" class="text-xs px-3 py-1.5 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:shadow">📖 ${t('names_learn_more', lang)}</a>
        </div>
      </div>
      <div id="names-occ"><p class="text-center text-gray-400 text-sm py-2">${t('loading', lang)}</p></div>`;
    // Quranic occurrences (exact word appearances) from bundled tokens.
    const occBox = body.querySelector('#names-occ');
    try {
      const tokens = await this.loadTokens();
      if (this._openName !== name) return; // another name was opened meanwhile — don't touch the live modal
      const norm = (QuranData && QuranData.normalizeWord) ? QuranData.normalizeWord(name.ar) : name.ar;
      const refs = [];
      if (tokens) {
        for (const key in tokens) { if (tokens[key].includes(norm)) refs.push(key); }
      }
      refs.sort((a, b) => { const [s1, a1] = a.split(':').map(Number), [s2, a2] = b.split(':').map(Number); return s1 - s2 || a1 - a2; });
      if (!refs.length) {
        occBox.innerHTML = `<p class="text-center text-gray-400 text-sm py-2">${t('names_no_occurrences', lang)}</p>`;
      } else {
        const shown = refs.slice(0, 60);
        occBox.innerHTML = `
          <h4 class="text-sm font-bold mb-2">📿 ${t('names_in_quran', lang)} <span class="text-gray-400 font-normal">(${refs.length})</span></h4>
          <div class="flex flex-wrap gap-1.5">
            ${shown.map(r => `<button data-verse="${r}" class="text-xs font-mono px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-primary hover:text-white">${r}</button>`).join('')}
            ${refs.length > shown.length ? `<span class="text-xs text-gray-400 self-center">+${refs.length - shown.length}</span>` : ''}
          </div>`;

        // Resolve REAL recitation for this name: the matching word's audio in its
        // first Quranic occurrence (quran.com word audio) — beats robotic TTS.
        try {
          const [s, a] = refs[0].split(':').map(Number);
          const v = (await QuranData.fetchRange(s, a, a, lang))[0];
          if (this._openName !== name) return; // stale fetch — a newer name owns the modal now
          const w = (v && v.words || []).find(x => QuranData.normalizeWord(x.arabic) === norm && x.audio);
          const playBtn = body.querySelector('[data-name-speak]');
          if (w && playBtn) playBtn.setAttribute('data-name-audio', w.audio);
        } catch (e) { /* TTS fallback stays */ }
      }
    } catch (e) {
      occBox.innerHTML = '';
    }
  }

  /**
   * Verse refs where this prophet is named. Uses the pre-verified `refs`
   * list when the bare spelling is ambiguous (Hud/Salih/Yahya/…), otherwise
   * scans the bundled tokens for the name's exact token forms.
   */
  async prophetRefs(p) {
    if (p.refs) return p.refs.slice();
    const tokens = await this.loadTokens();
    const refs = [];
    if (tokens && p.forms) {
      for (const key in tokens) {
        if (tokens[key].some(w => p.forms.includes(w))) refs.push(key);
      }
    }
    refs.sort((a, b) => { const [s1, a1] = a.split(':').map(Number), [s2, a2] = b.split(':').map(Number); return s1 - s2 || a1 - a2; });
    return refs;
  }

  async openProphet(p) {
    const lang = this.language;
    this._openName = p;
    this._openWord = (p.forms && p.forms[0]) || p.ar;
    this.ensureNameModal();
    this.nameModal.classList.remove('hidden'); this.nameModal.classList.add('flex');
    this.speakArabic(p.ar);
    const title = this.nameModal.querySelector('#names-detail-title');
    const body = this.nameModal.querySelector('#names-detail-body');
    title.textContent = `${p.n}. ${p.translit}`;
    body.innerHTML = `
      <div class="text-center mb-4">
        <div class="ayah-arabic !text-5xl mb-2" dir="rtl">${p.ar}</div>
        <div class="text-lg font-semibold text-gray-800 dark:text-gray-100" dir="auto">${this.escapeHtml(this.prophetNameOf(p))}</div>
        <div class="text-gray-500 dark:text-gray-400" dir="ltr">${this.escapeHtml(p.translit)}</div>
        <div class="inline-block mt-2 text-xs font-medium px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-500/20">
          📖 ${t('names_mentions', lang).replace('{count}', p.count)}
        </div><br>
        <button data-name-speak="${this.escapeHtml(p.ar)}" class="mt-3 px-4 py-2 rounded-lg bg-primary text-white text-sm hover:bg-primary/80">🔊 ${t('play', lang)}</button>
      </div>
      <div id="names-occ"><p class="text-center text-gray-400 text-sm py-2">${t('loading', lang)}</p></div>`;
    const occBox = body.querySelector('#names-occ');
    try {
      const refs = await this.prophetRefs(p);
      if (this._openName !== p) return; // another entry was opened meanwhile
      if (!refs.length) {
        occBox.innerHTML = '';
      } else {
        const shown = refs.slice(0, 60);
        occBox.innerHTML = `
          <h4 class="text-sm font-bold mb-2">📿 ${t('names_in_quran', lang)} <span class="text-gray-400 font-normal">(${refs.length})</span></h4>
          <div class="flex flex-wrap gap-1.5">
            ${shown.map(r => `<button data-verse="${r}" class="text-xs font-mono px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-primary hover:text-white">${r}</button>`).join('')}
            ${refs.length > shown.length ? `<span class="text-xs text-gray-400 self-center">+${refs.length - shown.length}</span>` : ''}
          </div>`;

        // Resolve real recitation of the name from its first occurrence (word audio)
        try {
          const [s, a] = refs[0].split(':').map(Number);
          const v = (await QuranData.fetchRange(s, a, a, lang))[0];
          if (this._openName !== p) return;
          const match = (x) => {
            const norm = QuranData.normalizeWord(x.arabic);
            return (p.forms ? p.forms.includes(norm) : norm === QuranData.normalizeWord(p.ar)) && x.audio;
          };
          const w = (v && v.words || []).find(match);
          const playBtn = body.querySelector('[data-name-speak]');
          if (w && playBtn) playBtn.setAttribute('data-name-audio', w.audio);
        } catch (e) { /* TTS fallback stays */ }
      }
    } catch (e) {
      occBox.innerHTML = '';
    }
  }

  // ---------- events ----------

  onClick(e) {
    const h2 = e.target.closest('h2');
    if (h2 && this.root.contains(h2)) { this.mode = 'browse'; this.query = ''; this.quiz = null; this.favOnly = false; this.memGroup = null; this.memRevealed.clear(); this.fcIndex = 0; this.fcFlipped = false; this.render(); return; }
    const dismissBtn = e.target.closest('[data-names-tts-dismiss]');
    if (dismissBtn) {
      this.ttsNoteDismissed = true;
      const note = this.root.querySelector('#names-tts-note');
      if (note) note.classList.add('hidden');
      return;
    }

    const el = e.target.closest('[data-action]');
    if (!el || !this.root.contains(el)) return;

    switch (el.getAttribute('data-action')) {
      case 'mode':
        this.setMode(el.getAttribute('data-mode'));
        break;
      case 'speak': {
        const n = parseInt(el.getAttribute('data-n'), 10);
        const name = NAMES_99.find(x => x.n === n);
        if (name) this.openName(name);
        break;
      }
      case 'quiz-choice':
        this.answerQuiz(el);
        break;
      case 'quiz-start':
        this.startQuiz(el.getAttribute('data-dir'));
        this.render();
        break;
      case 'play-again':
        this.startQuiz(this.quiz ? this.quiz.dir : 'n2m');
        this.render();
        break;
      case 'prophet': {
        const n = parseInt(el.getAttribute('data-n'), 10);
        const p = (typeof PROPHETS_25 !== 'undefined') && PROPHETS_25.find(x => x.n === n);
        if (p) this.openProphet(p);
        break;
      }
      case 'mem-group':
        this.memGroup = parseInt(el.getAttribute('data-g'), 10);
        this.memRevealed.clear();
        this.render();
        break;
      case 'mem-reveal': {
        const n = parseInt(el.getAttribute('data-n'), 10);
        if (this.memRevealed.has(n)) this.memRevealed.delete(n); else this.memRevealed.add(n);
        this.render();
        break;
      }
      case 'mem-learned': {
        const n = parseInt(el.getAttribute('data-n'), 10);
        this.toggleLearned(n);
        this.render();
        break;
      }
      case 'mem-reset':
        if (window.confirm(t('names_reset_confirm', this.language))) {
          this.saveLearned(new Set());
          this.render();
        }
        break;
      case 'fav': {
        const n = parseInt(el.getAttribute('data-n'), 10);
        this.toggleFavorite(n);
        // Re-render only the grid so the search box keeps focus while browsing
        if (this.mode === 'browse') this.updateGrid(); else this.render();
        break;
      }
      case 'fav-only':
        this.favOnly = !this.favOnly;
        this.render();
        break;
      case 'fc-flip':
        this.fcFlipped = !this.fcFlipped;
        this.render();
        break;
      case 'fc-next':
        this.fcAdvance(1);
        break;
      case 'fc-prev':
        this.fcAdvance(-1);
        break;
      case 'fc-shuffle':
        this.fcOrder = this.shuffle(NAMES_99.map(x => x.n));
        this.fcIndex = 0;
        this.fcFlipped = false;
        this.render();
        break;
      case 'fc-speak': {
        const n = parseInt(el.getAttribute('data-n'), 10);
        const name = NAMES_99.find(x => x.n === n);
        if (name) this.openName(name);
        break;
      }
    }
  }

  fcAdvance(step) {
    const len = this.fcNames().length;
    if (!len) return;
    this.fcIndex = ((this.fcIndex + step) % len + len) % len;
    this.fcFlipped = false;
    this.render();
  }

  setMode(mode) {
    this.mode = mode;
    if (this.quizTimer) { clearTimeout(this.quizTimer); this.quizTimer = null; }
    if (mode === 'quiz') this.quiz = null; // show direction picker
    this.render();
  }

  // ---------- rendering ----------

  render() {
    if (!this.root) return;
    const lang = this.language;
    const dir = (typeof isRTL === 'function' && isRTL(lang)) ? 'rtl' : 'ltr';

    let body;
    switch (this.mode) {
      case 'quiz': body = this.renderQuiz(); break;
      case 'memorize': body = this.renderMemorize(); break;
      case 'flashcards': body = this.renderFlashcards(); break;
      case 'prophets': body = this.renderProphets(); break;
      default: body = this.renderBrowse();
    }
    const isProphets = this.mode === 'prophets';

    this.root.innerHTML = `
      <div dir="${dir}" class="w-full space-y-6">
        <div class="text-center">
          <h2 class="text-2xl font-bold cursor-pointer" title="${t('names_title', lang)}">${isProphets ? t('names_prophets_title', lang) : t('names_title', lang)}</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">${isProphets ? t('names_prophets_subtitle', lang) : t('names_subtitle', lang)}</p>
        </div>
        <div class="flex justify-center gap-2 flex-wrap">
          ${this.renderModeTab('browse', t('names_browse', lang))}
          ${this.renderModeTab('memorize', t('names_memorize', lang))}
          ${this.renderModeTab('flashcards', t('names_flashcards', lang))}
          ${this.renderModeTab('prophets', t('names_prophets', lang))}
          ${this.renderModeTab('quiz', t('quiz', lang))}
        </div>
        ${this.renderTtsNote(lang)}
        ${body}
      </div>
    `;
  }

  renderModeTab(mode, label) {
    const active = this.mode === mode;
    const cls = active
      ? 'bg-primary text-white dark:bg-blue-600'
      : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700';
    return `
      <button data-action="mode" data-mode="${mode}"
              class="px-4 py-2 rounded-lg text-sm font-medium transition-colors ${cls}">
        ${label}
      </button>
    `;
  }

  renderTtsNote(lang) {
    return `
      <div id="names-tts-note" class="hidden flex items-center justify-between gap-3 max-w-xl mx-auto
                  bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800
                  text-yellow-800 dark:text-yellow-200 text-sm rounded-xl px-4 py-2">
        <span>🔇 ${t('tts_unavailable', lang)}</span>
        <button data-names-tts-dismiss
                class="shrink-0 px-2 py-1 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-900/40 font-bold"
                title="${t('dismiss', lang)}">✕</button>
      </div>
    `;
  }

  // ---------- browse ----------

  filteredNames() {
    let list = NAMES_99;
    if (this.favOnly) {
      const favs = this.getFavorites();
      list = list.filter(name => favs.has(name.n));
    }
    const q = this.query.trim().toLowerCase();
    if (!q) return list;
    // Diacritic-insensitive Arabic match: strip tashkeel/tatweel + unify alefs
    // so plain "الرحمن" finds the fully-voweled name.ar.
    const normAr = (typeof QuranData !== 'undefined' && QuranData.normalizeWord)
      ? (s) => QuranData.normalizeWord(s)
      : (s) => s;
    const qAr = normAr(this.query.trim());
    return list.filter(name =>
      String(name.n) === q
      || name.translit.toLowerCase().includes(q)
      || this.meaningOf(name).toLowerCase().includes(q)
      || name.meanings.en.toLowerCase().includes(q)
      || (qAr && normAr(name.ar).includes(qAr))
    );
  }

  renderBrowse() {
    const lang = this.language;
    return `
      ${this.renderNameOfDay(lang)}
      <div class="max-w-md mx-auto space-y-3">
        <input id="names-search" type="text" dir="auto"
               value="${this.escapeHtml(this.query)}"
               placeholder="${t('names_search_placeholder', lang)}"
               class="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700
                      bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100
                      placeholder-gray-400 dark:placeholder-gray-500
                      focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-blue-500">
        <div class="flex justify-center">
          <button data-action="fav-only"
                  class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors
                         ${this.favOnly
                           ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-700'
                           : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'}">
            ${this.favOnly ? '★' : '☆'} ${t('names_favorites_only', lang)}
          </button>
        </div>
      </div>
      <p class="text-center text-xs text-gray-400 dark:text-gray-500">🔊 ${t('names_tap_hint', lang)}</p>
      <div id="names-grid">
        ${this.renderGrid()}
      </div>
    `;
  }

  renderNameOfDay(lang) {
    if (this.favOnly || this.query.trim()) return ''; // hide while filtering/searching
    const name = this.nameOfDay();
    if (!name) return '';
    return `
      <div class="max-w-md mx-auto">
        <button data-action="speak" data-n="${name.n}"
                class="w-full flex items-center gap-4 rounded-2xl px-5 py-4 text-start
                       bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/20
                       border border-indigo-100 dark:border-indigo-500/30 hover:shadow-lg transition-all">
          <span class="ayah-arabic !text-4xl shrink-0" dir="rtl">${name.ar}</span>
          <span class="flex-1 min-w-0">
            <span class="block text-[11px] font-semibold uppercase tracking-wide text-indigo-500 dark:text-indigo-300">✨ ${t('names_name_of_day', lang)}</span>
            <span class="block font-bold text-gray-800 dark:text-gray-100 truncate" dir="ltr">${name.n}. ${this.escapeHtml(name.translit)}</span>
            <span class="block text-xs text-gray-500 dark:text-gray-400 truncate" dir="auto">${this.escapeHtml(this.meaningOf(name))}</span>
          </span>
        </button>
      </div>
    `;
  }

  renderGrid() {
    const lang = this.language;
    const names = this.filteredNames();
    if (!names.length) {
      const msg = this.favOnly && !this.query.trim() ? t('names_no_favorites', lang) : t('no_results', lang);
      return `<p class="text-center text-sm text-gray-500 dark:text-gray-400 py-10">${msg}</p>`;
    }
    const learned = this.getLearned();
    const favs = this.getFavorites();
    return `
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        ${names.map(name => this.renderCard(name, learned, favs)).join('')}
      </div>
    `;
  }

  renderCard(name, learned, favs) {
    const lang = this.language;
    const isFav = favs && favs.has(name.n);
    const check = learned && learned.has(name.n)
      ? `<span class="absolute top-2 end-9 w-5 h-5 flex items-center justify-center text-[10px] font-bold rounded-full
                bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300" title="${t('names_learned', lang)}">✓</span>`
      : '';
    const star = `
      <span data-action="fav" data-n="${name.n}" role="button"
            title="${isFav ? t('names_unfavorite', lang) : t('names_favorite', lang)}"
            aria-label="${isFav ? t('names_unfavorite', lang) : t('names_favorite', lang)}"
            class="absolute top-1.5 end-1.5 w-7 h-7 flex items-center justify-center text-lg rounded-full
                   ${isFav ? 'text-amber-500' : 'text-gray-300 dark:text-gray-600 hover:text-amber-400'}">${isFav ? '★' : '☆'}</span>`;
    return `
      <button data-action="speak" data-n="${name.n}"
              class="relative bg-white dark:bg-gray-800 rounded-2xl shadow border border-gray-200 dark:border-gray-700
                     hover:shadow-lg hover:border-primary dark:hover:border-blue-400 transition-all
                     p-4 pt-6 flex flex-col items-center text-center gap-1">
        <span class="absolute top-2 start-2 w-7 h-7 flex items-center justify-center text-xs font-bold rounded-full
                     bg-primary/10 text-primary dark:bg-blue-900/40 dark:text-blue-300">${name.n}</span>
        ${check}
        ${star}
        <span class="ayah-arabic !text-3xl !leading-[2.2] max-w-full break-words" dir="rtl">${name.ar}</span>
        <span class="text-sm font-semibold text-gray-700 dark:text-gray-200" dir="ltr">${name.translit}</span>
        <span class="text-xs text-gray-500 dark:text-gray-400" dir="auto">${this.meaningOf(name)}</span>
      </button>
    `;
  }

  // ---------- memorize (9 groups of 11 + progress) ----------

  renderMemorize() {
    const lang = this.language;
    const learned = this.getLearned();
    const groupCount = Math.ceil(NAMES_99.length / NAMES_GROUP_SIZE);

    // Default to the first group that still has unlearned names
    if (this.memGroup === null || this.memGroup < 0 || this.memGroup >= groupCount) {
      this.memGroup = 0;
      for (let g = 0; g < groupCount; g++) {
        const names = NAMES_99.slice(g * NAMES_GROUP_SIZE, (g + 1) * NAMES_GROUP_SIZE);
        if (names.some(x => !learned.has(x.n))) { this.memGroup = g; break; }
      }
    }

    const pct = Math.round((learned.size / NAMES_99.length) * 100);
    const chips = [];
    for (let g = 0; g < groupCount; g++) {
      const names = NAMES_99.slice(g * NAMES_GROUP_SIZE, (g + 1) * NAMES_GROUP_SIZE);
      const done = names.filter(x => learned.has(x.n)).length;
      const complete = done === names.length;
      const active = g === this.memGroup;
      const cls = active
        ? 'bg-primary text-white dark:bg-blue-600 border-transparent'
        : complete
          ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800'
          : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700';
      chips.push(`
        <button data-action="mem-group" data-g="${g}"
                class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${cls}">
          ${names[0].n}–${names[names.length - 1].n}
          <span class="${active ? 'opacity-80' : 'opacity-60'}">${complete ? '✓' : `${done}/${names.length}`}</span>
        </button>`);
    }

    const groupNames = NAMES_99.slice(this.memGroup * NAMES_GROUP_SIZE, (this.memGroup + 1) * NAMES_GROUP_SIZE);
    const rows = groupNames.map(name => {
      const isLearned = learned.has(name.n);
      const revealed = this.memRevealed.has(name.n);
      return `
        <div class="flex items-stretch gap-2">
          <button data-action="mem-reveal" data-n="${name.n}"
                  class="flex-1 flex items-center gap-3 bg-white dark:bg-gray-800 rounded-xl border
                         ${isLearned ? 'border-green-300 dark:border-green-800' : 'border-gray-200 dark:border-gray-700'}
                         px-4 py-3 text-start hover:shadow transition-all">
            <span class="w-7 h-7 shrink-0 flex items-center justify-center text-xs font-bold rounded-full
                         bg-primary/10 text-primary dark:bg-blue-900/40 dark:text-blue-300">${name.n}</span>
            <span class="ayah-arabic !text-2xl !leading-[2.2] min-w-0 break-words" dir="rtl">${name.ar}</span>
            <span class="flex-1 min-w-0">
              ${revealed
                ? `<span class="block text-sm font-semibold text-gray-700 dark:text-gray-200" dir="ltr">${name.translit}</span>
                   <span class="block text-xs text-gray-500 dark:text-gray-400" dir="auto">${this.meaningOf(name)}</span>`
                : `<span class="block text-xs text-gray-400 dark:text-gray-500 italic">👁 ${t('names_tap_reveal', this.language)}</span>`}
            </span>
          </button>
          <button data-action="mem-learned" data-n="${name.n}" title="${t('names_mark_learned', this.language)}"
                  class="w-12 shrink-0 flex items-center justify-center rounded-xl border text-lg transition-colors
                         ${isLearned
                           ? 'bg-green-100 dark:bg-green-900/40 border-green-300 dark:border-green-800 text-green-700 dark:text-green-300'
                           : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-300 dark:text-gray-600 hover:text-green-500'}">
            ✓
          </button>
        </div>`;
    }).join('');

    return `
      <div class="max-w-2xl mx-auto space-y-4">
        <div>
          <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
            <span>${t('names_learned_total', lang).replace('{done}', learned.size).replace('{total}', NAMES_99.length)}</span>
            <span>${pct}%</span>
          </div>
          <div class="h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
            <div class="h-full bg-green-500 rounded-full transition-all" style="width:${pct}%"></div>
          </div>
        </div>
        <div class="flex flex-wrap justify-center gap-2">${chips.join('')}</div>
        <div class="space-y-2">${rows}</div>
        <div class="text-center pt-2">
          <button data-action="mem-reset"
                  class="text-xs text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 underline">
            ${t('names_reset_progress', lang)}
          </button>
        </div>
      </div>
    `;
  }

  // ---------- prophets (25 named in the Quran) ----------

  renderProphets() {
    const lang = this.language;
    if (typeof PROPHETS_25 === 'undefined') return '';
    return `
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        ${PROPHETS_25.map(p => `
          <button data-action="prophet" data-n="${p.n}"
                  class="relative bg-white dark:bg-gray-800 rounded-2xl shadow border border-gray-200 dark:border-gray-700
                         hover:shadow-lg hover:border-primary dark:hover:border-blue-400 transition-all
                         p-4 pt-6 flex flex-col items-center text-center gap-1">
            <span class="absolute top-2 start-2 w-7 h-7 flex items-center justify-center text-xs font-bold rounded-full
                         bg-emerald-500/10 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-300">${p.n}</span>
            <span class="ayah-arabic !text-3xl !leading-normal" dir="rtl">${p.ar}</span>
            <span class="text-sm font-semibold text-gray-700 dark:text-gray-200" dir="auto">${this.prophetNameOf(p)}</span>
            <span class="text-xs text-gray-400 dark:text-gray-500" dir="ltr">${p.translit}</span>
            <span class="text-[11px] mt-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
              📖 ${t('names_mentions', lang).replace('{count}', p.count)}
            </span>
          </button>
        `).join('')}
      </div>
    `;
  }

  updateGrid() {
    const grid = this.root.querySelector('#names-grid');
    if (grid) grid.innerHTML = this.renderGrid();
  }

  // ---------- flashcards (flip self-test) ----------

  fcNames() {
    if (Array.isArray(this.fcOrder) && this.fcOrder.length) {
      const byN = new Map(NAMES_99.map(x => [x.n, x]));
      const list = this.fcOrder.map(n => byN.get(n)).filter(Boolean);
      if (list.length) return list;
    }
    return NAMES_99;
  }

  renderFlashcards() {
    const lang = this.language;
    if (!Array.isArray(NAMES_99) || !NAMES_99.length) return '';
    const names = this.fcNames();
    if (this.fcIndex < 0 || this.fcIndex >= names.length) this.fcIndex = 0;
    const name = names[this.fcIndex];
    const learned = this.getLearned();
    const isLearned = learned.has(name.n);
    const flipped = this.fcFlipped;

    return `
      <div class="max-w-md mx-auto space-y-4">
        <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>${this.fcIndex + 1} / ${names.length}</span>
          <button data-action="fc-shuffle"
                  class="px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-200 dark:border-gray-700
                         bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            🔀 ${t('names_shuffle', lang)}
          </button>
        </div>

        <button data-action="fc-flip"
                class="w-full min-h-[16rem] flex flex-col items-center justify-center gap-3 text-center
                       bg-white dark:bg-gray-800 rounded-3xl shadow-lg border-2
                       ${isLearned ? 'border-green-300 dark:border-green-800' : 'border-gray-200 dark:border-gray-700'}
                       hover:border-primary dark:hover:border-blue-400 transition-colors p-8">
          <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary dark:bg-blue-900/40 dark:text-blue-300">${name.n}</span>
          <span class="ayah-arabic !text-6xl !leading-[2.2] break-words max-w-full" dir="rtl">${name.ar}</span>
          ${flipped
            ? `<span class="block text-xl font-semibold text-gray-800 dark:text-gray-100" dir="ltr">${this.escapeHtml(name.translit)}</span>
               <span class="block text-base text-gray-500 dark:text-gray-400" dir="auto">${this.escapeHtml(this.meaningOf(name))}</span>`
            : `<span class="block text-xs text-gray-400 dark:text-gray-500 italic mt-2">👁 ${t('names_flip_hint', lang)}</span>`}
        </button>

        <div class="flex items-center justify-center gap-2">
          <button data-action="fc-prev"
                  class="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium border border-gray-200 dark:border-gray-700
                         bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            ‹ ${t('previous', lang)}
          </button>
          <button data-action="fc-speak" data-n="${name.n}" title="${t('play', lang)}" aria-label="${t('play', lang)}"
                  class="px-4 py-2.5 rounded-xl text-sm font-medium bg-primary text-white hover:bg-primary/80 transition-colors">
            🔊
          </button>
          <button data-action="mem-learned" data-n="${name.n}" title="${t('names_mark_learned', lang)}" aria-label="${t('names_mark_learned', lang)}"
                  class="px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors
                         ${isLearned
                           ? 'bg-green-100 dark:bg-green-900/40 border-green-300 dark:border-green-800 text-green-700 dark:text-green-300'
                           : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500 hover:text-green-500'}">
            ✓
          </button>
          <button data-action="fc-next"
                  class="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium border border-gray-200 dark:border-gray-700
                         bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            ${t('next', lang)} ›
          </button>
        </div>
      </div>
    `;
  }

  // ---------- quiz ----------

  startQuiz(dir) {
    if (this.quizTimer) { clearTimeout(this.quizTimer); this.quizTimer = null; }
    this.quiz = {
      dir: dir === 'm2n' ? 'm2n' : 'n2m', // n2m: name→meaning | m2n: meaning→name
      questions: this.shuffle(NAMES_99).slice(0, NAMES_QUIZ_ROUNDS),
      round: 0,
      score: 0,
      answered: false,
      finished: false,
      newBest: false
    };
  }

  renderQuizPick() {
    const lang = this.language;
    const dirs = [
      { dir: 'n2m', icon: '🕌', label: t('names_quiz_n2m', lang) },
      { dir: 'm2n', icon: '💡', label: t('names_quiz_m2n', lang) }
    ];
    return `
      <div class="max-w-md mx-auto space-y-4">
        <p class="text-center text-sm text-gray-500 dark:text-gray-400">${t('names_quiz_pick', lang)}</p>
        ${dirs.map(d => {
          const best = this.getBestScore(d.dir);
          return `
            <button data-action="quiz-start" data-dir="${d.dir}"
                    class="w-full flex items-center gap-4 bg-white dark:bg-gray-800 rounded-2xl shadow border-2 border-gray-200 dark:border-gray-700
                           hover:border-primary dark:hover:border-blue-400 transition-colors px-6 py-5 text-start">
              <span class="text-3xl">${d.icon}</span>
              <span class="flex-1">
                <span class="block font-bold text-gray-800 dark:text-gray-100">${d.label}</span>
                ${best !== null
                  ? `<span class="block text-xs text-gray-400 dark:text-gray-500 mt-0.5">${t('vocab_best_score', lang).replace('{score}', best)}</span>`
                  : ''}
              </span>
              <span class="text-gray-300 dark:text-gray-600">›</span>
            </button>`;
        }).join('')}
      </div>
    `;
  }

  renderQuiz() {
    const lang = this.language;
    if (!this.quiz) return this.renderQuizPick();
    if (this.quiz.finished) return this.renderQuizEnd();

    const q = this.quiz.questions[this.quiz.round];
    // Distractors deduped by meaning — some names share a gloss (e.g. Al-Ghaffar/
    // Al-Ghafur), which would render two identical answer buttons.
    const seenMeanings = new Set([this.meaningOf(q).toLowerCase()]);
    const others = [];
    for (const x of this.shuffle(NAMES_99.filter(x => x.n !== q.n))) {
      const m = this.meaningOf(x).toLowerCase();
      if (seenMeanings.has(m)) continue;
      seenMeanings.add(m);
      others.push(x);
      if (others.length === 3) break;
    }
    const choices = this.shuffle(
      [{ name: q, correct: true }].concat(others.map(x => ({ name: x, correct: false })))
    );
    const rev = this.quiz.dir === 'm2n';

    const questionCard = rev
      ? `<div class="text-2xl font-bold text-gray-800 dark:text-gray-100" dir="auto">${this.meaningOf(q)}</div>
         <p class="text-sm text-gray-500 dark:text-gray-400 mt-4">${t('names_choose_name', lang)}</p>`
      : `<div class="ayah-arabic !text-6xl !leading-[2.2] break-words" dir="rtl">${q.ar}</div>
         <div class="text-base text-gray-400 dark:text-gray-500 italic mt-3" dir="ltr">${q.translit}</div>
         <p class="text-sm text-gray-500 dark:text-gray-400 mt-4">${t('vocab_choose_meaning', lang)}</p>`;

    const choiceLabel = (c) => rev
      ? `<span class="ayah-arabic !text-2xl !leading-[2.2] block break-words" dir="rtl">${c.name.ar}</span>
         <span class="block text-xs text-gray-400 dark:text-gray-500 mt-1" dir="ltr">${c.name.translit}</span>`
      : this.meaningOf(c.name);

    return `
      <div class="w-full space-y-6">
        <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>${t('vocab_question_of', lang)
            .replace('{current}', this.quiz.round + 1)
            .replace('{total}', this.quiz.questions.length)}</span>
          <span>${t('vocab_score', lang).replace('{score}', this.quiz.score)}</span>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 text-center">
          ${questionCard}
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          ${choices.map(c => `
            <button data-action="quiz-choice" data-correct="${c.correct ? '1' : '0'}" dir="auto"
                    class="px-4 py-4 rounded-xl text-lg font-medium border-2 border-gray-200 dark:border-gray-700
                           bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100
                           hover:border-primary dark:hover:border-blue-400 transition-colors text-center">
              ${choiceLabel(c)}
            </button>
          `).join('')}
        </div>
      </div>
    `;
  }

  answerQuiz(btn) {
    if (!this.quiz || this.quiz.answered || this.quiz.finished) return;
    this.quiz.answered = true;

    const correct = btn.getAttribute('data-correct') === '1';
    if (correct) this.quiz.score++;

    this.root.querySelectorAll('[data-action="quiz-choice"]').forEach(b => {
      b.disabled = true;
      b.classList.remove('hover:border-primary', 'dark:hover:border-blue-400');
      if (b.getAttribute('data-correct') === '1') {
        b.classList.remove('border-gray-200', 'dark:border-gray-700', 'bg-white', 'dark:bg-gray-800');
        b.classList.add('border-green-500', 'bg-green-100', 'dark:bg-green-900/40',
          'text-green-800', 'dark:text-green-300');
      } else if (b === btn) {
        b.classList.remove('border-gray-200', 'dark:border-gray-700', 'bg-white', 'dark:bg-gray-800');
        b.classList.add('border-red-500', 'bg-red-100', 'dark:bg-red-900/40',
          'text-red-800', 'dark:text-red-300');
      }
    });

    this.quizTimer = setTimeout(() => {
      this.quizTimer = null;
      this.quiz.answered = false;
      this.quiz.round++;
      if (this.quiz.round >= this.quiz.questions.length) {
        this.quiz.finished = true;
        const best = this.getBestScore(this.quiz.dir);
        if (best === null || this.quiz.score > best) {
          this.saveBestScore(this.quiz.dir, this.quiz.score);
          this.quiz.newBest = true;
        }
      }
      this.render();
    }, 1100);
  }

  renderQuizEnd() {
    const lang = this.language;
    const best = this.getBestScore(this.quiz.dir);
    return `
      <div class="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-10 text-center space-y-4">
        <div class="text-5xl">${this.quiz.score >= 7 ? '🏆' : '📿'}</div>
        <h3 class="text-xl font-bold">${t('vocab_quiz_complete', lang)}</h3>
        <p class="text-3xl font-bold text-primary dark:text-blue-400">
          ${t('vocab_your_score', lang)
            .replace('{score}', this.quiz.score)
            .replace('{total}', this.quiz.questions.length)}
        </p>
        ${this.quiz.newBest
          ? `<p class="text-green-600 dark:text-green-400 font-medium">${t('vocab_new_best', lang)}</p>`
          : (best !== null
            ? `<p class="text-sm text-gray-500 dark:text-gray-400">${t('vocab_best_score', lang).replace('{score}', best)}</p>`
            : '')}
        <button data-action="play-again"
                class="px-6 py-3 bg-primary hover:bg-primary/80 text-white rounded-xl font-medium transition-colors">
          ${t('play_again', lang)}
        </button>
      </div>
    `;
  }
}

// Initialize when DOM is ready
let namesOfAllah;
document.addEventListener('DOMContentLoaded', () => {
  namesOfAllah = new NamesOfAllah();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { NamesOfAllah };
}
