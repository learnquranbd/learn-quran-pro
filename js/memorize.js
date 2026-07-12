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
    this.hideWords = true;
    this.recognition = null;
    this.startTime = null;
    this.startWordIndex = 0;  // "restart from ayah" support
    this.diag = [];           // per word index: {heard: [tokens], skipped: bool}

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

      const rec = e.target.closest('[data-play-recording]');
      if (rec) return this.playRecording(rec.getAttribute('data-play-recording'));

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
    if (Math.abs(a.length - b.length) > 2) return 99;
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
    const tol = expected.length >= 6 ? 2 : expected.length >= 4 ? 1 : 0;
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
        <div class="flex flex-wrap items-center gap-3 mb-4">
          <button id="mem-start" ${supported ? '' : 'disabled'}
                  class="px-6 py-3 rounded-lg font-medium text-white ${supported ? 'bg-secondary hover:bg-secondary/80' : 'bg-gray-400 cursor-not-allowed'}">
            🎙️ <span>${t('start_reciting', lang)}</span>
          </button>
          <button id="mem-reset" class="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
            ${t('reset', lang)}
          </button>
          <label class="flex items-center gap-2 ml-auto text-sm text-gray-600 dark:text-gray-300 cursor-pointer">
            <input type="checkbox" id="mem-hide" ${this.hideWords ? 'checked' : ''} class="w-4 h-4">
            ${t('hide_words', lang)}
          </label>
        </div>

        ${supported ? '' : `
          <div class="mb-4 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 text-sm">
            ${t('speech_not_supported', lang)}
          </div>`}

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
    this.container.querySelector('#mem-hide').addEventListener('change', (e) => {
      this.hideWords = e.target.checked;
      this.applyHideMode();
    });
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

    // Re-show playback buttons for ayahs that already have recordings
    Object.keys(this.recordings).forEach(key => this.showRecordingButton(key));

    this.applyHideMode();
    this.paint([], 0);
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

  playRecording(ayahKey) {
    const rec = this.recordings[ayahKey];
    if (!rec) return;
    this.playback.src = rec.url;
    this.playback.play().catch(() => {});
  }

  /* ---------- Restart from a chosen ayah ---------- */

  restartFromAyah(ayahKey) {
    const idx = this.words.findIndex(w => w.ayahKey === ayahKey);
    if (idx < 0) return;

    this.startWordIndex = idx;
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
    this.finalTranscript = '';
    this.startWordIndex = 0;
    this.diag = [];
    this.setStatus('');
    const summary = this.container.querySelector('#mem-summary');
    if (summary) summary.classList.add('hidden');
    this.words.forEach(w => { delete w.el.dataset.state; });
    this.paint([], 0);
    this.applyHideMode();
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
    const states = new Array(this.words.length);
    const diag = this.words.map(() => null);
    let i = this.startWordIndex; // pointer into expected words
    const LOOKAHEAD = 3;

    for (const token of heard) {
      if (i >= this.words.length) break;

      if (this.wordsMatch(this.words[i].norm, token.norm)) {
        states[i] = 'correct';
        diag[i] = diag[i] || {};
        diag[i].matched = token.raw;
        i++;
        continue;
      }

      // Did the reciter skip ahead a few words?
      let jumped = false;
      for (let k = 1; k <= LOOKAHEAD && i + k < this.words.length; k++) {
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

    // Rotate the per-ayah voice recorder when the pointer enters a new ayah
    if (this.listening && i < this.words.length) {
      this.rotateRecorder(this.words[i].ayahKey);
    }

    if (i >= this.words.length && this.words.length > 0) {
      this.finish(states);
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
        if (idx === currentIndex && this.listening) {
          el.classList.add('bg-amber-100', 'dark:bg-amber-900/40');
        }
        if (this.hideWords) el.style.filter = 'blur(8px)';
      }
    });
  }

  finish(states) {
    this.stop();
    const lang = this.language;
    const correct = states.filter(s => s === 'correct').length;
    const total = this.words.length - this.startWordIndex;
    const pct = Math.round((correct / Math.max(total, 1)) * 100);
    const secs = Math.round((Date.now() - this.startTime) / 1000);

    const summary = this.container.querySelector('#mem-summary');
    summary.classList.remove('hidden');
    summary.innerHTML = `
      <div class="text-3xl mb-2">${pct >= 90 ? '🌟' : pct >= 70 ? '👍' : '💪'}</div>
      <div class="text-xl font-bold ${pct >= 70 ? 'text-green-700 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'}">
        ${t('accuracy', lang)}: ${pct}%
      </div>
      <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">
        ${correct}/${total} · ${secs}s
      </div>
    `;
    this.setStatus(`✅ ${t('completed', lang)}`);
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
