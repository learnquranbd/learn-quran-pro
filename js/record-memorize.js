/**
 * Record & Self-check (Memorize → Record mode).
 *
 * Recite a surah/range from memory into the mic, play your recitation back, and
 * manually mark each ayah correct / wrong while you listen — then see which
 * ayahs still need review. A per-ayah REFERENCE recitation (Alafasy) is one tap
 * away for comparison.
 *
 * The recording is kept ONLY in memory (an object URL) for the session — it is
 * never uploaded or saved to disk. Renders into #record-memorize-root.
 */

class RecordMemorize {
  constructor() {
    this.root = document.getElementById('record-memorize-root');
    if (!this.root) return;

    this.language = (typeof appSettings !== 'undefined' && appSettings) ? appSettings.get('language') : 'en';
    this.surah = 112;
    this.from = 1;
    this.to = 4;
    this.ayahs = [];              // [{ key, ayah, arabic }]
    this.marks = {};              // ayahKey -> 'ok' | 'wrong'
    this.rec = null;              // { blob, url } of the user's recitation
    this.mediaRecorder = null;
    this.chunks = [];
    this.recording = false;
    this.recStart = 0;
    this.recTimer = null;
    this.rendered = false;

    this.playback = new Audio();  // the user's own recitation
    this.refAudio = new Audio();  // reference (Alafasy) per-ayah
    this.playback.addEventListener('play', () => this.syncPlayBtn());
    this.playback.addEventListener('pause', () => this.syncPlayBtn());
    this.playback.addEventListener('ended', () => this.syncPlayBtn());

    // Cumulative verse counts for the reference-audio global ayah number
    this.cum = [0, 0]; let total = 0;
    if (typeof SURAH_DATA !== 'undefined') SURAH_DATA.forEach(s => { this.cum[s.number] = total; total += s.ayahCount; });

    window.addEventListener('learnModuleSelected', (e) => {
      if (e.detail && e.detail.module === 'recordmemorize') this.render();
    });
    window.addEventListener('settingChanged', (e) => {
      if (e.detail && e.detail.key === 'language') { this.language = e.detail.value; if (this.rendered) this.render(); }
    });

    this.root.addEventListener('click', (e) => this.onClick(e));
    this.root.addEventListener('change', (e) => this.onChange(e));
  }

  tt(key) { return t(key, this.language); }
  esc(s) { return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }

  render() {
    this.rendered = true;
    const lang = this.language;
    const surah = getSurahByNumber(this.surah);
    const count = surah ? surah.ayahCount : 7;
    const opt = (n, sel) => `<option value="${n}" ${n === sel ? 'selected' : ''}>${n}</option>`;
    this.root.innerHTML = `
      <div class="w-full max-w-3xl mx-auto">
        <div class="text-center mb-4">
          <h3 class="text-xl font-bold mb-1">🔴 ${this.tt('rec_title')}</h3>
          <p class="text-gray-500 dark:text-gray-400 text-sm">${this.tt('rec_subtitle')}</p>
        </div>

        <div class="flex flex-wrap items-center justify-center gap-2 mb-4">
          <select id="rc-surah" class="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm">
            ${SURAH_DATA.map(s => `<option value="${s.number}" ${s.number === this.surah ? 'selected' : ''}>${this.esc(formatSurahOption(s, lang))}</option>`).join('')}
          </select>
          <span class="text-sm text-gray-500">${this.tt('ayah')}</span>
          <select id="rc-from" class="px-2 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm">
            ${Array.from({ length: count }, (_, i) => opt(i + 1, this.from)).join('')}
          </select>
          <span class="text-gray-400">–</span>
          <select id="rc-to" class="px-2 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm">
            ${Array.from({ length: count }, (_, i) => opt(i + 1, this.to)).join('')}
          </select>
        </div>

        <div id="rc-recorder" class="text-center mb-4"></div>
        <div id="rc-board" class="bg-white dark:bg-gray-800 rounded-2xl shadow p-4 min-h-[140px]"></div>
        <p class="text-xs text-gray-400 dark:text-gray-500 text-center mt-3">🔒 ${this.tt('rec_privacy')}</p>
      </div>`;
    this.renderRecorder();
    this.load();
  }

  onChange(e) {
    if (e.target.id === 'rc-surah') { this.surah = parseInt(e.target.value); this.from = 1; this.to = Math.min(4, getSurahByNumber(this.surah).ayahCount); this.resetRecording(); this.render(); }
    else if (e.target.id === 'rc-from') { this.from = parseInt(e.target.value); if (this.to < this.from) this.to = this.from; this.resetRecording(); this.render(); }
    else if (e.target.id === 'rc-to') { this.to = parseInt(e.target.value); if (this.to < this.from) this.from = this.to; this.resetRecording(); this.render(); }
  }

  onClick(e) {
    const t2 = e.target.closest('[data-rc]');
    if (!t2) return;
    const action = t2.getAttribute('data-rc');
    if (action === 'record') return this.startRecording();
    if (action === 'stop') return this.stopRecording();
    if (action === 'rerecord') { this.resetRecording(); this.renderRecorder(); return; }
    if (action === 'play') return this.togglePlayback();
    if (action === 'ref') return this.playReference(t2.getAttribute('data-key'), parseInt(t2.getAttribute('data-num')));
    if (action === 'mark') return this.mark(t2.getAttribute('data-key'), t2.getAttribute('data-val'));
  }

  async load() {
    const board = this.root.querySelector('#rc-board');
    if (!board) return;
    board.innerHTML = `<div class="text-center py-10 text-gray-400">${this.tt('loading')}</div>`;
    try {
      const verses = await QuranData.fetchRange(this.surah, this.from, this.to, this.language);
      this.ayahs = (verses || []).map(v => ({ key: v.key, ayah: v.ayah, arabic: v.arabic }));
    } catch (e) {
      board.innerHTML = `<div class="text-center py-10 text-red-500">${this.tt('topics_load_error')}</div>`;
      return;
    }
    this.renderBoard();
  }

  // ---------- recording ----------------------------------------------------

  renderRecorder() {
    const el = this.root.querySelector('#rc-recorder');
    if (!el) return;
    if (this.recording) {
      el.innerHTML = `
        <button data-rc="stop" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-600 text-white text-sm font-medium hover:bg-red-700">
          <span class="w-3 h-3 rounded-full bg-white animate-pulse"></span> ${this.tt('rec_stop')} <span id="rc-timer" class="tabular-nums">0:00</span>
        </button>`;
      return;
    }
    if (this.rec) {
      el.innerHTML = `
        <div class="flex flex-wrap items-center justify-center gap-2">
          <button data-rc="play" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary/90">
            <span class="rc-play-icon">▶</span> <span class="rc-play-label">${this.tt('rec_play')}</span>
          </button>
          <button data-rc="rerecord" class="px-4 py-2.5 rounded-full border border-gray-300 dark:border-gray-600 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">↺ ${this.tt('rec_rerecord')}</button>
        </div>`;
      return;
    }
    el.innerHTML = `
      <button data-rc="record" class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-red-600 text-white text-sm font-semibold hover:bg-red-700 shadow">
        <span class="w-3 h-3 rounded-full bg-white"></span> ${this.tt('rec_start')}
      </button>`;
  }

  async startRecording() {
    if (typeof MediaRecorder === 'undefined' || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      return this.recorderMessage(this.tt('rec_unsupported'));
    }
    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (err) {
      return this.recorderMessage(this.tt('rec_mic_denied'));
    }
    this.chunks = [];
    try {
      this.mediaRecorder = new MediaRecorder(stream);
    } catch (e) {
      stream.getTracks().forEach(t => t.stop());
      return this.recorderMessage(this.tt('rec_unsupported'));
    }
    this.mediaRecorder.addEventListener('dataavailable', (ev) => { if (ev.data && ev.data.size) this.chunks.push(ev.data); });
    this.mediaRecorder.addEventListener('stop', () => {
      stream.getTracks().forEach(t => t.stop());
      const blob = new Blob(this.chunks, { type: this.mediaRecorder.mimeType || 'audio/webm' });
      if (this.rec && this.rec.url) URL.revokeObjectURL(this.rec.url);
      this.rec = { blob, url: URL.createObjectURL(blob) };
      this.playback.src = this.rec.url;
      this.recording = false;
      clearInterval(this.recTimer);
      this.renderRecorder();
    });
    this.mediaRecorder.start();
    this.recording = true;
    this.recStart = Date.now();
    this.renderRecorder();
    this.recTimer = setInterval(() => {
      const el = this.root.querySelector('#rc-timer');
      if (el) { const s = Math.floor((Date.now() - this.recStart) / 1000); el.textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; }
    }, 250);
  }

  stopRecording() {
    if (this.mediaRecorder && this.recording) { try { this.mediaRecorder.stop(); } catch (e) { /* ignore */ } }
  }

  recorderMessage(msg) {
    const el = this.root.querySelector('#rc-recorder');
    if (el) el.innerHTML = `<p class="text-sm text-amber-600 dark:text-amber-400">${this.esc(msg)}</p>
      <button data-rc="record" class="mt-2 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">${this.tt('rec_start')}</button>`;
  }

  resetRecording() {
    if (this.recording && this.mediaRecorder) { try { this.mediaRecorder.stop(); } catch (e) { /* ignore */ } }
    this.recording = false;
    clearInterval(this.recTimer);
    this.playback.pause();
    if (this.rec && this.rec.url) URL.revokeObjectURL(this.rec.url);
    this.rec = null;
    this.marks = {};
  }

  togglePlayback() {
    if (!this.rec) return;
    if (this.playback.paused) { this.refAudio.pause(); this.playback.play().catch(() => {}); }
    else this.playback.pause();
  }

  syncPlayBtn() {
    const icon = this.root.querySelector('.rc-play-icon');
    const label = this.root.querySelector('.rc-play-label');
    const playing = !this.playback.paused;
    if (icon) icon.textContent = playing ? '⏸' : '▶';
    if (label) label.textContent = playing ? this.tt('rec_pause') : this.tt('rec_play');
  }

  // ---------- reference recitation (Alafasy, per ayah) ---------------------

  playReference(key, num) {
    const global = this.cum[this.surah] + num;   // 1-based global ayah number
    this.playback.pause();
    this.refAudio.src = `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${global}.mp3`;
    this.refAudio.play().catch(() => {});
  }

  // ---------- self-check board ---------------------------------------------

  mark(key, val) {
    if (this.marks[key] === val) delete this.marks[key];   // tap again to clear
    else this.marks[key] = val;
    this.renderBoard();
  }

  renderBoard() {
    const board = this.root.querySelector('#rc-board');
    if (!board) return;
    if (!this.ayahs.length) { board.innerHTML = `<div class="text-center py-10 text-gray-400">${this.tt('wa_no_words')}</div>`; return; }
    const ok = this.ayahs.filter(a => this.marks[a.key] === 'ok').length;
    const wrong = this.ayahs.filter(a => this.marks[a.key] === 'wrong').length;

    board.innerHTML = `
      <div class="flex items-center justify-between mb-3 text-sm">
        <span class="font-medium text-gray-600 dark:text-gray-300">${this.tt('rec_summary').replace('{ok}', ok).replace('{wrong}', wrong)}</span>
      </div>
      <div class="space-y-2">
        ${this.ayahs.map(a => {
          const st = this.marks[a.key];
          const rowbg = st === 'wrong' ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                      : st === 'ok' ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                      : 'border-gray-100 dark:border-gray-700';
          const mbtn = (val, on, txt, cls) =>
            `<button data-rc="mark" data-key="${a.key}" data-val="${val}" title="${txt}"
                     class="w-9 h-9 rounded-lg text-base flex items-center justify-center border ${on ? cls + ' text-white' : 'border-gray-300 dark:border-gray-600 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}">${val === 'ok' ? '✓' : '✗'}</button>`;
          return `
            <div class="flex items-start gap-3 p-3 rounded-xl border ${rowbg}">
              <span class="ayah-number shrink-0 mt-1">${a.ayah}</span>
              <button data-rc="ref" data-key="${a.key}" data-num="${a.ayah}" title="${this.tt('rec_ref')}"
                      class="shrink-0 mt-0.5 w-8 h-8 rounded-lg border border-gray-300 dark:border-gray-600 text-primary dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700">🔊</button>
              <div class="ayah-arabic !text-2xl !leading-loose !mb-0 !pb-0 !border-b-0 flex-1 min-w-0" dir="rtl">${this.esc(a.arabic || '')}</div>
              <div class="flex gap-1.5 shrink-0">
                ${mbtn('ok', st === 'ok', this.tt('rec_correct'), 'bg-green-500 border-green-500')}
                ${mbtn('wrong', st === 'wrong', this.tt('rec_wrong'), 'bg-red-500 border-red-500')}
              </div>
            </div>`;
        }).join('')}
      </div>`;
  }
}

let recordMemorize;
document.addEventListener('DOMContentLoaded', () => { recordMemorize = new RecordMemorize(); });
