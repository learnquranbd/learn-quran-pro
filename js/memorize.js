/**
 * Memorization Checker Module
 * Listens to the user's recitation with the Web Speech API (Arabic) and
 * checks it word-by-word against the loaded ayahs:
 *   green = recited correctly, red = wrong/skipped, amber = expected next.
 * Words can be hidden (blurred) and are revealed as they are recited.
 */

class MemorizeChecker {
  constructor() {
    this.container = document.getElementById('memorize-container');
    if (!this.container) return;

    this.ayahs = [];
    this.language = 'en';
    this.words = [];          // flat list: {ayahKey, position, arabic, norm, meaning, translit, audio, el}
    this.listening = false;
    this.typing = false;      // keyboard-only fallback active
    this.hideWords = true;
    this.recognition = null;
    this.startTime = null;
    this.startWordIndex = 0;  // "restart from ayah" support
    this.activeEnd = null;    // exclusive upper word bound (drill / range), null = all
    this.diag = [];           // per word index: {heard: [tokens], skipped: bool}
    this.ayahBounds = [];     // per ayah: {key, start, end} word-index range

    // Matching leniency: 0 strict, 1 normal, 2 lenient — tunes edit-distance tolerance
    this.leniency = 1;

    // Structured repetition ("compounding") drill: repeat each ayah N times,
    // then chain 1, 1-2, 1-2-3… — populated when the drill is running
    this.drill = null;
    this.drillReps = 3;

    // Lifetime hifz stats + daily streak, and per-selection resume progress
    this.stats = this.loadStats();
    this.progress = { done: [] };  // { done: [ayahKey, …] } for the current selection

    // Per-ayah voice recordings: ayahKey -> {url, blob}
    this.recordings = {};
    this.mediaStream = null;
    this.recorder = null;
    this.recAyahKey = null;
    this.playback = new Audio();
    this.wordAudio = new Audio();

    window.addEventListener('ayahsLoaded', (e) => {
      this.ayahs = e.detail.ayahs;
      this.language = e.detail.language;
      this.stop();
      this.drill = null;
      this.activeEnd = null;
      this.startWordIndex = 0;
      this.progress = this.loadProgress();
      this.render();
      this.loadStoredRecordings();
    });

    window.addEventListener('settingChanged', (e) => {
      if (e.detail.key === 'language') {
        this.language = e.detail.value;
      }
    });

    // Delegated clicks: word tips, per-ayah restart, per-ayah playback
    this.container.addEventListener('click', (e) => {
      const restart = e.target.closest('[data-restart-ayah]');
      if (restart) return this.restartFromAyah(restart.getAttribute('data-restart-ayah'));

      const orig = e.target.closest('[data-play-original]');
      if (orig) return this.playOriginal(orig.getAttribute('data-play-original'), orig);

      const rec = e.target.closest('[data-play-recording]');
      if (rec) return this.playRecording(rec.getAttribute('data-play-recording'));

      const dot = e.target.closest('[data-jump-ayah]');
      if (dot) return this.restartFromAyah(dot.getAttribute('data-jump-ayah'));

      const mistake = e.target.closest('[data-mistake-index]');
      if (mistake) return this.openTipModal(parseInt(mistake.getAttribute('data-mistake-index')));

      const word = e.target.closest('.mem-word');
      if (word && (word.dataset.state === 'missed' || word.dataset.state === 'correct')) {
        this.openTipModal(parseInt(word.dataset.index));
      }
    });

    this.createTipModal();
    this.render();
  }

  /* ---------- IndexedDB persistence for recordings ---------- */

  openDb() {
    if (this._dbPromise) return this._dbPromise;
    this._dbPromise = new Promise((resolve) => {
      if (!window.indexedDB) return resolve(null);
      const req = indexedDB.open('quranMemorize', 1);
      req.onupgradeneeded = () => req.result.createObjectStore('recordings');
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => resolve(null);
    });
    return this._dbPromise;
  }

  async storeRecording(key, blob) {
    const db = await this.openDb();
    if (!db) return;
    try {
      db.transaction('recordings', 'readwrite').objectStore('recordings').put(blob, key);
    } catch (e) { /* storage unavailable */ }
  }

  async loadStoredRecordings() {
    const db = await this.openDb();
    if (!db) return;
    this.ayahs.forEach(ayah => {
      try {
        const req = db.transaction('recordings').objectStore('recordings').get(ayah.key);
        req.onsuccess = () => {
          if (req.result && !this.recordings[ayah.key]) {
            this.recordings[ayah.key] = { blob: req.result, url: URL.createObjectURL(req.result) };
            this.showRecordingButton(ayah.key);
          }
        };
      } catch (e) { /* ignore */ }
    });
  }

  /* ---------- Arabic text normalization ---------- */

  normalize(text) {
    return text
      // strip tashkeel/diacritics, superscript alef, Quranic annotation marks, tatweel
      .replace(/[\u064B-\u065F\u0670\u06D6-\u06ED\u08D3-\u08FF\u0640]/g, '')
      // normalize alef variants (incl. wasla) and hamza carriers
      .replace(/[آأإٱ]/g, 'ا')
      .replace(/ؤ/g, 'و')
      .replace(/ئ/g, 'ي')
      // alef maqsura → ya, ta marbuta → ha (forgiving match)
      .replace(/ى/g, 'ي')
      .replace(/ة/g, 'ه')
      // standalone hamza often dropped by ASR
      .replace(/ء/g, '')
      // keep Arabic letters only
      .replace(/[^\u0621-\u064A]/g, '');
  }

  levenshtein(a, b) {
    if (Math.abs(a.length - b.length) > 3) return 99;
    const dp = Array.from({ length: a.length + 1 }, (_, i) => [i]);
    for (let j = 1; j <= b.length; j++) dp[0][j] = j;
    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,
          dp[i][j - 1] + 1,
          dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
        );
      }
    }
    return dp[a.length][b.length];
  }

  wordsMatch(expected, heard) {
    if (!expected || !heard) return false;
    if (expected === heard) return true;
    let tol = expected.length >= 6 ? 2 : expected.length >= 4 ? 1 : 0;
    if (this.leniency === 0) tol = Math.max(0, tol - 1);   // strict
    else if (this.leniency === 2) tol += 1;                // lenient
    return tol > 0 && this.levenshtein(expected, heard) <= tol;
  }

  /* ---------- Rendering ---------- */

  render() {
    const lang = this.language;

    if (this.ayahs.length === 0) {
      this.container.innerHTML = `
        <div class="text-center py-12">
          <div class="text-5xl mb-4">🎙️</div>
          <p class="text-gray-500 dark:text-gray-400">${t('load_ayah_first', lang)}</p>
        </div>
      `;
      return;
    }

    const supported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;

    this.container.innerHTML = `
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        ${this.statsBarHtml()}

        <div class="flex flex-wrap items-center gap-3 mb-3">
          <button id="mem-start" ${supported ? '' : 'disabled'}
                  class="px-6 py-3 rounded-lg font-medium text-white ${supported ? 'bg-secondary hover:bg-secondary/80' : 'bg-gray-400 cursor-not-allowed'}">
            🎙️ <span>${t('start_reciting', lang)}</span>
          </button>
          <button id="mem-reset" class="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
            ${t('reset', lang)}
          </button>
          <button id="mem-peek" class="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700" title="${t('mem_peek', lang)}">
            👁️ ${t('mem_peek', lang)}
          </button>
          <label class="flex items-center gap-2 ml-auto text-sm text-gray-600 dark:text-gray-300 cursor-pointer">
            <input type="checkbox" id="mem-hide" ${this.hideWords ? 'checked' : ''} class="w-4 h-4">
            ${t('hide_words', lang)}
          </label>
        </div>

        <div class="flex flex-wrap items-center gap-4 mb-4 text-sm">
          <label class="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            ${t('mem_leniency', lang)}:
            <select id="mem-leniency" class="rounded border border-gray-300 dark:border-gray-600 bg-transparent px-2 py-1">
              <option value="0" ${this.leniency === 0 ? 'selected' : ''}>${t('mem_strict', lang)}</option>
              <option value="1" ${this.leniency === 1 ? 'selected' : ''}>${t('mem_normal', lang)}</option>
              <option value="2" ${this.leniency === 2 ? 'selected' : ''}>${t('mem_lenient', lang)}</option>
            </select>
          </label>
          <button id="mem-type-toggle" class="px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300">
            ⌨️ ${t('mem_type_instead', lang)}
          </button>
        </div>

        ${supported ? '' : `
          <div class="mb-4 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 text-sm">
            ${t('speech_not_supported', lang)} — ${t('mem_type_hint', lang)}
          </div>`}

        ${this.drillPanelHtml()}

        ${this.progressMapHtml()}

        <div id="mem-type-box" class="mb-4 ${supported && !this.typing ? 'hidden' : ''}">
          <div class="text-xs text-gray-400 dark:text-gray-500 mb-1">💡 ${t('mem_type_hint', lang)}</div>
          <div class="flex gap-2" dir="rtl">
            <input id="mem-type-input" type="text" dir="rtl"
                   class="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent px-3 py-2 ayah-arabic !text-xl"
                   placeholder="${t('mem_type_placeholder', lang)}">
            <button id="mem-type-check" class="px-4 py-2 rounded-lg bg-secondary text-white hover:bg-secondary/80 whitespace-nowrap">
              ${t('mem_check', lang)}
            </button>
          </div>
        </div>

        <div id="mem-status" class="mb-1 text-sm text-gray-500 dark:text-gray-400 min-h-[1.5rem]"></div>
        <div class="mb-4 text-xs text-gray-400 dark:text-gray-500">💡 ${t('tap_word_hint', lang)}</div>

        <div id="mem-verses" class="space-y-6"></div>

        <div id="mem-summary" class="hidden mt-6 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 text-center"></div>
      </div>
    `;

    this.renderWords();

    this.container.querySelector('#mem-start').addEventListener('click', () => {
      this.listening ? this.stop() : this.start();
    });
    this.container.querySelector('#mem-reset').addEventListener('click', () => this.reset());
    this.container.querySelector('#mem-peek').addEventListener('click', () => this.peek());
    this.container.querySelector('#mem-hide').addEventListener('change', (e) => {
      this.hideWords = e.target.checked;
      this.applyHideMode();
    });
    this.container.querySelector('#mem-leniency').addEventListener('change', (e) => {
      this.leniency = parseInt(e.target.value) || 0;
    });
    this.container.querySelector('#mem-type-toggle').addEventListener('click', () => this.toggleTyping());
    this.container.querySelector('#mem-type-check').addEventListener('click', () => this.submitTyped());
    this.container.querySelector('#mem-type-input').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.submitTyped();
    });

    this.bindDrillControls();
  }

  renderWords() {
    const versesEl = this.container.querySelector('#mem-verses');
    this.words = [];

    const lang = this.language;
    versesEl.innerHTML = this.ayahs.map(ayah => `
      <div class="mem-verse" data-verse="${ayah.key}">
        <div class="flex items-center gap-2 mb-2">
          <span class="text-xs text-gray-400">${ayah.surahName} ${ayah.key}</span>
          <button data-restart-ayah="${ayah.key}" title="${t('restart_from_here', lang)}"
                  class="px-1.5 py-0.5 text-xs rounded border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
            ⟲ ${t('restart_from_here', lang)}
          </button>
          <button data-play-original="${ayah.key}" title="${t('original_recitation', lang)}"
                  class="px-1.5 py-0.5 text-xs rounded border border-blue-300 dark:border-blue-700 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30">
            🔊 ${t('original_recitation', lang)}
          </button>
          <button data-play-recording="${ayah.key}" title="${t('your_recording', lang)}"
                  class="mem-rec-btn hidden px-1.5 py-0.5 text-xs rounded border border-emerald-300 dark:border-emerald-700 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30">
            ▶ ${t('your_recording', lang)}
          </button>
        </div>
        <div class="flex flex-wrap gap-x-3 gap-y-4" dir="rtl">
          ${ayah.words.map(w => `
            <span class="mem-word ayah-arabic !text-3xl px-1 rounded transition-colors duration-200 cursor-pointer"
                  data-key="${ayah.key}" data-pos="${w.position}">${w.arabic}</span>
          `).join('')}
        </div>
      </div>
    `).join('');

    versesEl.querySelectorAll('.mem-word').forEach((el, idx) => {
      const key = el.getAttribute('data-key');
      const pos = parseInt(el.getAttribute('data-pos'));
      const ayah = this.ayahs.find(a => a.key === key);
      const word = ayah.words.find(w => w.position === pos);
      el.dataset.index = idx;
      this.words.push({
        ayahKey: key,
        position: pos,
        arabic: word.arabic,
        norm: this.normalize(word.arabic),
        meaning: word.meaning || '',
        translit: word.translit || '',
        audio: word.audio || null,
        el
      });
    });

    // Word-index range [start, end) for each ayah — drives the drill and progress map
    this.ayahBounds = this.ayahs.map(ayah => {
      let start = this.words.findIndex(w => w.ayahKey === ayah.key);
      let end = start;
      while (end < this.words.length && this.words[end].ayahKey === ayah.key) end++;
      return { key: ayah.key, start, end };
    }).filter(b => b.start >= 0);

    // Re-show playback buttons for ayahs that already have recordings
    Object.keys(this.recordings).forEach(key => this.showRecordingButton(key));

    this.applyHideMode();
    this.paint([], 0);
    this.markCompletedAyahs();
  }

  applyHideMode() {
    this.words.forEach(w => {
      const revealed = w.el.dataset.state === 'correct' || w.el.dataset.state === 'missed';
      w.el.style.filter = (this.hideWords && !revealed) ? 'blur(8px)' : '';
    });
  }

  /* ---------- Speech recognition ---------- */

  start() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;

    this.recognition = new SR();
    this.recognition.lang = 'ar-SA';
    this.recognition.continuous = true;
    this.recognition.interimResults = true;

    this.finalTranscript = '';
    this.diag = this.words.map(() => null);
    this.startTime = Date.now();
    this.listening = true;
    this.setStartButton(true);
    this.setStatus(`👂 ${t('listening', this.language)}`);

    // Record the user's actual voice, one clip per ayah
    this.startRecordingStream();

    this.recognition.onresult = (event) => {
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const text = event.results[i][0].transcript;
        if (event.results[i].isFinal) this.finalTranscript += ' ' + text;
        else interim += ' ' + text;
      }
      this.check(this.finalTranscript + ' ' + interim);
    };

    this.recognition.onerror = (event) => {
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        this.setStatus(`⚠️ ${t('mic_error', this.language)}`);
        this.stop();
      }
    };

    // Chrome auto-stops after silence — restart while session is active
    this.recognition.onend = () => {
      if (this.listening) {
        try { this.recognition.start(); } catch (e) { /* already started */ }
      }
    };

    try { this.recognition.start(); } catch (e) { /* already started */ }
  }

  stop() {
    this.listening = false;
    if (this.recognition) {
      this.recognition.onend = null;
      try { this.recognition.stop(); } catch (e) { /* not started */ }
      this.recognition = null;
    }
    this.stopRecordingStream();
    if (this.container.querySelector('#mem-start')) this.setStartButton(false);
  }

  /* ---------- Voice recording (one clip per ayah) ---------- */

  async startRecordingStream() {
    if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) return;
    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const startKey = this.words[this.startWordIndex]?.ayahKey || this.words[0]?.ayahKey;
      this.startRecorderFor(startKey);
    } catch (err) {
      // No mic permission for recording — recognition may still work on its own
      this.mediaStream = null;
    }
  }

  startRecorderFor(ayahKey) {
    if (!this.mediaStream || !ayahKey) return;
    this.recAyahKey = ayahKey;
    const chunks = [];
    const recorder = new MediaRecorder(this.mediaStream);
    recorder.ondataavailable = (e) => { if (e.data.size) chunks.push(e.data); };
    recorder.onstop = () => {
      if (chunks.length) this.saveRecording(ayahKey, new Blob(chunks, { type: recorder.mimeType }));
    };
    recorder.start();
    this.recorder = recorder;
  }

  /** Called when the recitation pointer crosses into a new ayah */
  rotateRecorder(newAyahKey) {
    if (!this.mediaStream || newAyahKey === this.recAyahKey) return;
    if (this.recorder && this.recorder.state !== 'inactive') this.recorder.stop();
    this.startRecorderFor(newAyahKey);
  }

  stopRecordingStream() {
    if (this.recorder && this.recorder.state !== 'inactive') {
      try { this.recorder.stop(); } catch (e) { /* already stopped */ }
    }
    this.recorder = null;
    this.recAyahKey = null;
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(tr => tr.stop());
      this.mediaStream = null;
    }
  }

  saveRecording(ayahKey, blob) {
    if (this.recordings[ayahKey]?.url) URL.revokeObjectURL(this.recordings[ayahKey].url);
    this.recordings[ayahKey] = { blob, url: URL.createObjectURL(blob) };
    this.storeRecording(ayahKey, blob);
    this.showRecordingButton(ayahKey);
  }

  showRecordingButton(ayahKey) {
    const btn = this.container.querySelector(`[data-play-recording="${ayahKey}"]`);
    if (btn && this.recordings[ayahKey]) btn.classList.remove('hidden');
  }

  /** Cumulative ayah offsets → the global 1..6236 ayah number for a verse */
  globalAyahNumber(surah, ayah) {
    if (!this._surahOffsets) {
      this._surahOffsets = {};
      let off = 0;
      SURAH_DATA.forEach(s => { this._surahOffsets[s.number] = off; off += s.ayahCount; });
    }
    return this._surahOffsets[surah] + ayah;
  }

  /** Play the reference reciter audio for one ayah (Alafasy, islamic.network) */
  playOriginal(ayahKey, btn) {
    if (!this._origAudio) {
      this._origAudio = new Audio();
      this._origAudio.addEventListener('ended', () => this.markOrigPlaying(null));
      this._origAudio.addEventListener('pause', () => this.markOrigPlaying(null));
    }
    // Toggle off if the same ayah is playing
    if (this._origKey === ayahKey && !this._origAudio.paused) {
      this._origAudio.pause();
      return;
    }
    const [s, a] = ayahKey.split(':').map(Number);
    const n = this.globalAyahNumber(s, a);
    this._origKey = ayahKey;
    this._origAudio.src = `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${n}.mp3`;
    this._origAudio.play().then(() => this.markOrigPlaying(btn)).catch(() => {});
  }

  markOrigPlaying(activeBtn) {
    this.container.querySelectorAll('[data-play-original]').forEach(b => {
      const on = b === activeBtn;
      b.classList.toggle('bg-blue-100', on);
      b.classList.toggle('dark:bg-blue-900/40', on);
    });
  }

  playRecording(ayahKey) {
    const rec = this.recordings[ayahKey];
    if (!rec) return;
    this.playback.src = rec.url;
    this.playback.play().catch(() => {});
  }

  /* ---------- Restart from a chosen ayah ---------- */

  restartFromAyah(ayahKey) {
    if (this.drill) return; // drill drives its own ranges
    const idx = this.words.findIndex(w => w.ayahKey === ayahKey);
    if (idx < 0) return;

    this.startWordIndex = idx;
    this.activeEnd = null;
    this.finalTranscript = '';
    this.diag = this.words.map(() => null);
    this.words.forEach(w => { delete w.el.dataset.state; });
    const summary = this.container.querySelector('#mem-summary');
    if (summary) summary.classList.add('hidden');

    if (this.listening) {
      // Clean slate for the recognizer; onend auto-restarts it
      try { this.recognition.abort(); } catch (e) { /* not started */ }
      this.rotateRecorder(ayahKey);
      this.startTime = Date.now();
      this.setStatus(`👂 ${t('listening', this.language)} — ${ayahKey}`);
    } else {
      this.setStatus(`⟲ ${ayahKey}`);
    }

    this.paint([], this.startWordIndex);
    this.applyHideMode();
    this.words[idx].el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  reset() {
    this.stop();
    this.typing = false;
    this.drill = null;
    this.activeEnd = null;
    this.finalTranscript = '';
    this.startWordIndex = 0;
    this.diag = [];
    this.setStatus('');
    const summary = this.container.querySelector('#mem-summary');
    if (summary) summary.classList.add('hidden');
    this.words.forEach(w => { delete w.el.dataset.state; });
    this.paint([], 0);
    this.applyHideMode();
    this.render();
  }

  setStartButton(listening) {
    const btn = this.container.querySelector('#mem-start');
    if (!btn) return;
    btn.innerHTML = listening
      ? `⏹️ <span>${t('stop', this.language)}</span>`
      : `🎙️ <span>${t('start_reciting', this.language)}</span>`;
    btn.classList.toggle('bg-red-600', listening);
    btn.classList.toggle('hover:bg-red-700', listening);
    btn.classList.toggle('bg-secondary', !listening);
    btn.classList.toggle('hover:bg-secondary/80', !listening);
  }

  setStatus(msg) {
    const el = this.container.querySelector('#mem-status');
    if (el) el.textContent = msg;
  }

  /* ---------- Alignment: transcript → word states ---------- */

  check(transcript) {
    const rawTokens = transcript.split(/\s+/).filter(Boolean);
    const heard = rawTokens.map(x => ({ raw: x, norm: this.normalize(x) })).filter(x => x.norm);

    // Greedy alignment with a small lookahead window:
    // states[i] = 'correct' | 'missed' | undefined
    const end = this.activeEnd == null ? this.words.length : this.activeEnd;
    const states = new Array(this.words.length);
    const diag = this.words.map(() => null);
    let i = this.startWordIndex; // pointer into expected words
    const LOOKAHEAD = 3;

    for (const token of heard) {
      if (i >= end) break;

      if (this.wordsMatch(this.words[i].norm, token.norm)) {
        states[i] = 'correct';
        diag[i] = diag[i] || {};
        diag[i].matched = token.raw;
        i++;
        continue;
      }

      // Did the reciter skip ahead a few words?
      let jumped = false;
      for (let k = 1; k <= LOOKAHEAD && i + k < end; k++) {
        if (this.wordsMatch(this.words[i + k].norm, token.norm)) {
          for (let m = i; m < i + k; m++) {
            states[m] = 'missed';
            diag[m] = diag[m] || { heard: [] };
            diag[m].skipped = true;
          }
          states[i + k] = 'correct';
          diag[i + k] = { matched: token.raw };
          i = i + k + 1;
          jumped = true;
          break;
        }
      }

      // Unmatched extra token: attribute it to the word the reciter is
      // currently attempting, so the tip modal can show "you said X"
      if (!jumped) {
        diag[i] = diag[i] || { heard: [] };
        (diag[i].heard = diag[i].heard || []).push(token.raw);
      }
    }

    this.diag = diag;
    this.paint(states, i);
    this.markCompletedAyahs(states);

    // Rotate the per-ayah voice recorder when the pointer enters a new ayah
    if (this.listening && i < this.words.length) {
      this.rotateRecorder(this.words[i].ayahKey);
    }

    if (i >= end && end > this.startWordIndex) {
      if (this.drill) this.onDrillStepComplete(states);
      else this.finish(states);
    }
  }

  paint(states, currentIndex) {
    this.words.forEach((w, idx) => {
      const el = w.el;
      el.classList.remove('text-green-600', 'dark:text-green-400', 'text-red-500', 'dark:text-red-400',
        'bg-amber-100', 'dark:bg-amber-900/40', 'underline', 'opacity-40');

      // Words before the chosen restart point are out of scope
      if (idx < this.startWordIndex) {
        delete el.dataset.state;
        el.classList.add('opacity-40');
        el.style.filter = '';
        return;
      }

      if (states[idx] === 'correct') {
        el.dataset.state = 'correct';
        el.classList.add('text-green-600', 'dark:text-green-400');
        el.style.filter = '';
      } else if (states[idx] === 'missed') {
        el.dataset.state = 'missed';
        el.classList.add('text-red-500', 'dark:text-red-400');
        el.style.filter = '';
      } else {
        delete el.dataset.state;
        if (idx === currentIndex && (this.listening || this.typing)) {
          el.classList.add('bg-amber-100', 'dark:bg-amber-900/40');
        }
        if (this.hideWords) el.style.filter = 'blur(8px)';
      }
    });
  }

  finish(states) {
    this.stop();
    this.typing = false;
    const lang = this.language;
    const correct = states.filter(s => s === 'correct').length;
    const total = this.words.length - this.startWordIndex;
    const pct = Math.round((correct / Math.max(total, 1)) * 100);
    const secs = Math.round((Date.now() - (this.startTime || Date.now())) / 1000);

    // Longest run of consecutive correct words in this session
    let run = 0, best = 0;
    for (let idx = this.startWordIndex; idx < this.words.length; idx++) {
      if (states[idx] === 'correct') { run++; best = Math.max(best, run); }
      else run = 0;
    }

    this.recordStats({ correct, total, pct, best });
    this.markCompletedAyahs(states);

    const summary = this.container.querySelector('#mem-summary');
    summary.classList.remove('hidden');
    summary.innerHTML = `
      <div class="text-3xl mb-2">${pct >= 90 ? '🌟' : pct >= 70 ? '👍' : '💪'}</div>
      <div class="text-xl font-bold ${pct >= 70 ? 'text-green-700 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'}">
        ${t('accuracy', lang)}: ${pct}%
      </div>
      <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">
        ${correct}/${total} · ${secs}s · ${t('mem_best_run', lang)} ${best}
      </div>
      ${this.mistakesHtml(states)}
    `;
    this.setStatus(`✅ ${t('completed', lang)}`);
    this.renderStatsBar();
  }

  /** Missed / mis-recited words as a tappable review list (opens the tip modal). */
  mistakesHtml(states) {
    const lang = this.language;
    const misses = [];
    this.words.forEach((w, idx) => {
      if (idx < this.startWordIndex) return;
      const d = this.diag[idx] || {};
      if (states[idx] === 'missed' || (d.heard && d.heard.length)) misses.push(idx);
    });
    if (!misses.length) {
      return `<div class="mt-3 text-sm text-green-600 dark:text-green-400">${t('mem_no_mistakes', lang)}</div>`;
    }
    return `
      <div class="mt-4 pt-3 border-t border-green-200 dark:border-green-800 text-left">
        <div class="text-xs uppercase text-gray-400 mb-2">${t('mem_mistakes', lang)} (${misses.length})</div>
        <div class="flex flex-wrap gap-2" dir="rtl">
          ${misses.map(idx => `
            <button data-mistake-index="${idx}"
                    class="ayah-arabic !text-xl px-2 py-1 rounded border border-red-300 dark:border-red-700 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20">
              ${this.words[idx].arabic}
            </button>
          `).join('')}
        </div>
      </div>
    `;
  }

  /* ---------- Lifetime stats & daily streak (localStorage) ---------- */

  loadStats() {
    try {
      return Object.assign(
        { sessions: 0, wordsCorrect: 0, ayahsCompleted: 0, accSum: 0, accN: 0,
          bestRun: 0, streak: 0, lastDay: null },
        JSON.parse(localStorage.getItem('memorizeStats') || '{}')
      );
    } catch (e) {
      return { sessions: 0, wordsCorrect: 0, ayahsCompleted: 0, accSum: 0, accN: 0,
               bestRun: 0, streak: 0, lastDay: null };
    }
  }

  saveStats() {
    try { localStorage.setItem('memorizeStats', JSON.stringify(this.stats)); } catch (e) { /* ignore */ }
  }

  recordStats({ correct, total, pct, best }) {
    const s = this.stats;
    s.sessions += 1;
    s.wordsCorrect += correct;
    s.accSum += pct;
    s.accN += 1;
    s.bestRun = Math.max(s.bestRun || 0, best || 0);

    // Daily streak: consecutive calendar days with at least one session
    const dayMs = 86400000;
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const todayN = Math.floor(today.getTime() / dayMs);
    if (s.lastDay == null) s.streak = 1;
    else if (todayN === s.lastDay) { /* already counted today */ }
    else if (todayN === s.lastDay + 1) s.streak = (s.streak || 0) + 1;
    else s.streak = 1;
    s.lastDay = todayN;

    this.saveStats();
  }

  statsBarHtml() {
    const lang = this.language;
    const s = this.stats;
    const avg = s.accN ? Math.round(s.accSum / s.accN) : 0;
    const cell = (icon, val, label) => `
      <div class="flex-1 min-w-[5rem] text-center">
        <div class="text-lg font-bold text-gray-800 dark:text-gray-100">${icon} ${val}</div>
        <div class="text-[11px] text-gray-400">${label}</div>
      </div>`;
    return `
      <div id="mem-stats" class="flex flex-wrap gap-2 mb-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-900/40">
        ${cell('🔥', s.streak || 0, t('mem_streak', lang))}
        ${cell('🏆', s.bestRun || 0, t('mem_best_run', lang))}
        ${cell('📖', s.ayahsCompleted || 0, t('mem_ayahs_done', lang))}
        ${cell('✅', s.wordsCorrect || 0, t('mem_words_correct', lang))}
        ${cell('🎯', avg + '%', t('mem_avg_accuracy', lang))}
      </div>`;
  }

  renderStatsBar() {
    const bar = this.container.querySelector('#mem-stats');
    if (bar) bar.outerHTML = this.statsBarHtml();
  }

  /* ---------- Per-selection progress (resume) ---------- */

  selectionSig() {
    if (!this.ayahs.length) return '';
    return this.ayahs[0].key + '_' + this.ayahs[this.ayahs.length - 1].key + '_' + this.ayahs.length;
  }

  loadProgress() {
    try {
      const all = JSON.parse(localStorage.getItem('memorizeProgress') || '{}');
      return all[this.selectionSig()] || { done: [] };
    } catch (e) { return { done: [] }; }
  }

  saveProgress() {
    try {
      const all = JSON.parse(localStorage.getItem('memorizeProgress') || '{}');
      all[this.selectionSig()] = this.progress;
      localStorage.setItem('memorizeProgress', JSON.stringify(all));
    } catch (e) { /* ignore */ }
  }

  /** Mark ayahs whose every word is 'correct' as completed — updates dots,
   *  lifetime "ayahs done", and persisted resume progress. */
  markCompletedAyahs(states) {
    if (!this.ayahBounds.length) return;
    let changed = false;
    this.ayahBounds.forEach(b => {
      const doneNow = states
        ? this.range(b.start, b.end).every(i => states[i] === 'correct')
        : false;
      const already = this.progress.done.includes(b.key);
      if (doneNow && !already) {
        this.progress.done.push(b.key);
        this.stats.ayahsCompleted = (this.stats.ayahsCompleted || 0) + 1;
        changed = true;
      }
      const dot = this.container.querySelector(`[data-jump-ayah="${b.key}"]`);
      if (dot && (doneNow || already)) {
        dot.classList.remove('bg-gray-300', 'dark:bg-gray-600');
        dot.classList.add('bg-green-500');
      }
    });
    if (changed) { this.saveStats(); this.saveProgress(); this.renderStatsBar(); }
  }

  range(a, b) { const r = []; for (let i = a; i < b; i++) r.push(i); return r; }

  progressMapHtml() {
    if (this.ayahs.length < 2) return '';
    const lang = this.language;
    const done = new Set(this.progress.done || []);
    const dots = this.ayahs.map((ayah, i) => {
      const on = done.has(ayah.key);
      return `<button data-jump-ayah="${ayah.key}" title="${ayah.key}"
                class="w-3.5 h-3.5 rounded-full ${on ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'} hover:ring-2 hover:ring-secondary/50"></button>`;
    }).join('');
    const firstUndone = this.ayahs.find(a => !done.has(a.key));
    return `
      <div class="mb-4 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs uppercase text-gray-400">${t('mem_progress', lang)} (${done.size}/${this.ayahs.length})</span>
          ${firstUndone ? `<button data-jump-ayah="${firstUndone.key}"
              class="text-xs px-2 py-0.5 rounded border border-secondary text-secondary hover:bg-secondary/10">
              ⏵ ${t('mem_resume', lang)}</button>` : ''}
        </div>
        <div class="flex flex-wrap gap-1.5">${dots}</div>
      </div>`;
  }

  /* ---------- Repetition (compounding) drill ---------- */

  drillPanelHtml() {
    const lang = this.language;
    if (this.ayahs.length < 1) return '';
    if (!this.drill) {
      return `
        <div class="mb-4 p-3 rounded-lg bg-indigo-50 dark:bg-indigo-900/20">
          <div class="text-sm font-semibold text-indigo-700 dark:text-indigo-300 mb-1">🔁 ${t('mem_drill', lang)}</div>
          <div class="text-xs text-gray-500 dark:text-gray-400 mb-2">${t('mem_drill_hint', lang)}</div>
          <div class="flex flex-wrap items-center gap-2">
            <label class="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
              ${t('mem_drill_reps', lang)}:
              <select id="mem-drill-reps" class="rounded border border-gray-300 dark:border-gray-600 bg-transparent px-2 py-1">
                ${[2, 3, 5, 7].map(n => `<option value="${n}" ${n === this.drillReps ? 'selected' : ''}>${n}</option>`).join('')}
              </select>
            </label>
            <button id="mem-drill-start" class="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-sm hover:bg-indigo-700">
              ${t('mem_drill_start', lang)}
            </button>
          </div>
        </div>`;
    }
    return `
      <div class="mb-4 p-3 rounded-lg bg-indigo-50 dark:bg-indigo-900/20">
        <div class="flex items-center justify-between mb-1">
          <span class="text-sm font-semibold text-indigo-700 dark:text-indigo-300">🔁 ${t('mem_drill', lang)}</span>
          <button id="mem-drill-exit" class="text-xs px-2 py-0.5 rounded border border-indigo-400 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/40">
            ${t('mem_drill_stop', lang)}
          </button>
        </div>
        <div id="mem-drill-step" class="text-sm text-gray-700 dark:text-gray-200 mb-2"></div>
        <div class="h-1.5 rounded bg-indigo-100 dark:bg-indigo-900/50 overflow-hidden">
          <div id="mem-drill-bar" class="h-full bg-indigo-500 transition-all" style="width:0%"></div>
        </div>
      </div>`;
  }

  bindDrillControls() {
    const startBtn = this.container.querySelector('#mem-drill-start');
    if (startBtn) {
      const sel = this.container.querySelector('#mem-drill-reps');
      if (sel) sel.addEventListener('change', (e) => { this.drillReps = parseInt(e.target.value) || 3; });
      startBtn.addEventListener('click', () => this.startDrill());
    }
    const exitBtn = this.container.querySelector('#mem-drill-exit');
    if (exitBtn) exitBtn.addEventListener('click', () => this.exitDrill());
  }

  buildDrillSteps(reps) {
    const steps = [];
    this.ayahBounds.forEach((b, ai) => {
      for (let r = 1; r <= reps; r++) {
        steps.push({ type: 'rep', ai, rep: r, reps, start: b.start, end: b.end });
      }
      if (ai > 0) {
        steps.push({ type: 'chain', ai, start: this.ayahBounds[0].start, end: b.end });
      }
    });
    return steps;
  }

  startDrill() {
    if (!this.ayahBounds.length) return;
    const supported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
    if (!supported) this.typing = true; // fall back to keyboard when speech is unavailable
    this.drill = { steps: this.buildDrillSteps(this.drillReps), i: 0 };
    this.render();
    this.applyDrillStep(0);
    if (!this.typing && supported) this.start();
  }

  exitDrill() {
    this.drill = null;
    this.activeEnd = null;
    this.startWordIndex = 0;
    this.stop();
    this.render();
  }

  applyDrillStep(index) {
    const step = this.drill.steps[index];
    if (!step) return;
    this.drill.i = index;
    this.drill.advancing = false;
    this.startWordIndex = step.start;
    this.activeEnd = step.end;
    this.finalTranscript = '';
    this.diag = this.words.map(() => null);
    this.startTime = Date.now();

    // Clear session state within (and after) the active range so it can be re-painted
    this.words.forEach((w, idx) => { if (idx >= step.start) delete w.el.dataset.state; });
    this.paint([], step.start);
    this.applyHideMode();

    const lang = this.language;
    const stepEl = this.container.querySelector('#mem-drill-step');
    if (stepEl) {
      const ayahKey = this.ayahBounds[step.ai].key;
      if (step.type === 'rep') {
        stepEl.textContent = t('mem_drill_rep_of', lang)
          .replace('{a}', ayahKey).replace('{n}', step.rep).replace('{m}', step.reps);
      } else {
        stepEl.textContent = t('mem_drill_chain', lang)
          .replace('{from}', this.ayahBounds[0].key).replace('{to}', ayahKey);
      }
    }
    const bar = this.container.querySelector('#mem-drill-bar');
    if (bar) bar.style.width = Math.round((index / this.drill.steps.length) * 100) + '%';

    // Restart the recognizer cleanly so alignment begins at the new range
    if (this.listening && this.recognition) {
      try { this.recognition.abort(); } catch (e) { /* not started */ }
    }
    this.rotateRecorder(this.words[step.start]?.ayahKey);
    this.words[step.start]?.el.scrollIntoView({ behavior: 'smooth', block: 'center' });

    const typeInput = this.container.querySelector('#mem-type-input');
    if (typeInput) { typeInput.value = ''; if (this.typing) typeInput.focus(); }
  }

  onDrillStepComplete(states) {
    if (this.drill.advancing) return; // ignore repeat check() calls mid-transition
    this.drill.advancing = true;
    this.markCompletedAyahs(states);
    // Count correctly-recited words toward lifetime stats
    const correct = this.range(this.startWordIndex, this.activeEnd)
      .filter(i => states[i] === 'correct').length;
    this.stats.wordsCorrect = (this.stats.wordsCorrect || 0) + correct;
    this.saveStats();
    this.renderStatsBar();

    const next = this.drill.i + 1;
    if (next < this.drill.steps.length) {
      setTimeout(() => { if (this.drill) this.applyDrillStep(next); }, 700);
    } else {
      const lang = this.language;
      this.recordStats({ correct: 0, total: 1, pct: 100, best: 0 });
      const bar = this.container.querySelector('#mem-drill-bar');
      if (bar) bar.style.width = '100%';
      this.setStatus(`🎉 ${t('mem_drill_done', lang)}`);
      this.drill = null;
      this.activeEnd = null;
      this.stop();
      this.renderStatsBar();
    }
  }

  /* ---------- Peek & keyboard-only fallback ---------- */

  peek() {
    this.words.forEach(w => { w.el.style.filter = ''; });
    clearTimeout(this._peekTimer);
    this._peekTimer = setTimeout(() => this.applyHideMode(), 2500);
  }

  toggleTyping() {
    this.typing = !this.typing;
    const box = this.container.querySelector('#mem-type-box');
    if (box) box.classList.toggle('hidden', !this.typing);
    if (this.typing) {
      this.container.querySelector('#mem-type-input')?.focus();
      this.setStatus(`⌨️ ${t('mem_type_hint', this.language)}`);
    }
  }

  /** Feed typed Arabic through the same alignment as speech. */
  submitTyped() {
    const input = this.container.querySelector('#mem-type-input');
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;
    if (!this.startTime) this.startTime = Date.now();
    this.finalTranscript = text;
    this.check(text);
  }

  /* ---------- Word tip modal (correct word vs. what was heard) ---------- */

  createTipModal() {
    this.tipModal = document.createElement('div');
    this.tipModal.className = 'fixed inset-0 bg-black/50 z-50 items-center justify-center p-4 hidden';
    this.tipModal.innerHTML = `
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-sm">
        <div class="flex items-center justify-between px-5 py-3 border-b border-gray-200 dark:border-gray-700">
          <h3 id="mem-tip-title" class="font-semibold text-sm text-gray-500 dark:text-gray-400"></h3>
          <button id="mem-tip-close" class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-500">✕</button>
        </div>
        <div id="mem-tip-body" class="p-5"></div>
      </div>
    `;
    document.body.appendChild(this.tipModal);
    this.tipModal.querySelector('#mem-tip-close').addEventListener('click', () => this.closeTipModal());
    this.tipModal.addEventListener('click', (e) => {
      if (e.target === this.tipModal) this.closeTipModal();
      const wa = e.target.closest('[data-tip-word-audio]');
      if (wa) {
        this.wordAudio.src = wa.getAttribute('data-tip-word-audio');
        this.wordAudio.play().catch(() => {});
      }
      const ra = e.target.closest('[data-tip-recording]');
      if (ra) this.playRecording(ra.getAttribute('data-tip-recording'));
    });
  }

  closeTipModal() {
    this.tipModal.classList.add('hidden');
    this.tipModal.classList.remove('flex');
  }

  openTipModal(index) {
    const w = this.words[index];
    if (!w) return;
    const lang = this.language;
    const d = this.diag[index] || {};
    const state = w.el.dataset.state;

    let heardHtml;
    if (state === 'correct') {
      heardHtml = `<span class="text-green-600 dark:text-green-400 ayah-arabic !text-2xl" dir="rtl">${d.matched || w.arabic}</span>`;
    } else if (d.heard && d.heard.length) {
      heardHtml = `<span class="text-red-500 dark:text-red-400 ayah-arabic !text-2xl" dir="rtl">${d.heard.join(' · ')}</span>`;
    } else {
      heardHtml = `<span class="text-red-500 dark:text-red-400 text-sm">— ${t('skipped_word', lang)} —</span>`;
    }

    this.tipModal.querySelector('#mem-tip-title').textContent = `${w.ayahKey} · ${t('word', lang)} ${w.position}`;
    this.tipModal.querySelector('#mem-tip-body').innerHTML = `
      <div class="text-center mb-4">
        <div class="text-xs uppercase text-gray-400 mb-1">${t('correct_word', lang)}</div>
        <div class="ayah-arabic !text-5xl !leading-loose">${w.arabic}</div>
        ${w.translit ? `<div class="text-sm italic text-gray-400">${w.translit}</div>` : ''}
        ${w.meaning ? `<div class="text-sm text-gray-600 dark:text-gray-300" dir="auto">${w.meaning}</div>` : ''}
      </div>
      <div class="text-center mb-4 pt-3 border-t border-gray-100 dark:border-gray-700">
        <div class="text-xs uppercase text-gray-400 mb-1">${t('you_said', lang)}</div>
        ${heardHtml}
      </div>
      <div class="flex flex-wrap justify-center gap-2">
        ${w.audio ? `
          <button data-tip-word-audio="${w.audio}"
                  class="px-3 py-2 rounded-lg bg-primary text-white text-sm hover:bg-primary/80">
            🔊 ${t('correct_word', lang)}
          </button>` : ''}
        ${this.recordings[w.ayahKey] ? `
          <button data-tip-recording="${w.ayahKey}"
                  class="px-3 py-2 rounded-lg border border-emerald-400 dark:border-emerald-600 text-emerald-600 dark:text-emerald-400 text-sm hover:bg-emerald-50 dark:hover:bg-emerald-900/30">
            ▶ ${t('your_recording', lang)}
          </button>` : ''}
      </div>
    `;
    this.tipModal.classList.remove('hidden');
    this.tipModal.classList.add('flex');
  }
}

// Initialize when DOM is ready
let memorizeChecker;
document.addEventListener('DOMContentLoaded', () => {
  memorizeChecker = new MemorizeChecker();
});
