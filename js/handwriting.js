/**
 * Arabic Handwriting / Tracing Practice
 * Trace a faint target letter / word / short-surah word on a canvas with finger
 * or mouse, then "Reveal" the perfect calligraphic form to compare. Clear /
 * undo per stroke; step through targets; hear the target. Guided practice —
 * not handwriting-recognition (that needs a server model), but what teaches
 * Arabic writing.
 */

class Handwriting {
  constructor() {
    this.root = document.getElementById('handwriting-root');
    if (!this.root) return;

    this.language = (typeof appSettings !== 'undefined' && appSettings) ? appSettings.get('language') : 'en';
    this.section = 'letters';   // letters | words
    this.index = 0;
    this.strokes = [];          // [[{x,y}...], ...]
    this.drawing = false;
    this.reveal = false;
    this._audio = new Audio();
    this._clips = null;
    fetch('audio/qaida/manifest.json').then(r => r.ok ? r.json() : null).then(m => { this._clips = m || {}; }).catch(() => {});

    window.addEventListener('learnModuleSelected', (e) => {
      if (e.detail && e.detail.module === 'handwriting') this.render();
    });
    window.addEventListener('settingChanged', (e) => {
      if (e.detail && e.detail.key === 'language') { this.language = e.detail.value; if (this.root.innerHTML) this.render(); }
    });
    this.root.addEventListener('click', (e) => this.onClick(e));
  }

  targets() {
    if (this.section === 'words') {
      return (typeof QAIDA_WORDS !== 'undefined' ? QAIDA_WORDS : []).map(w => ({ text: w.arabic, label: w.translit, audio: w.arabic }));
    }
    return (typeof QAIDA_LETTERS !== 'undefined' ? QAIDA_LETTERS : []).map(l => ({ text: l.char, label: l.translit + ' · ' + l.name, audio: l.name }));
  }

  current() {
    const list = this.targets();
    return list[Math.min(this.index, list.length - 1)] || { text: '', label: '' };
  }

  render() {
    const lang = this.language;
    this.strokes = [];
    this.reveal = false;

    this.root.innerHTML = `
      <div class="w-full">
        <div class="text-center mb-4">
          <div class="text-4xl mb-1">✍️</div>
          <h2 class="text-xl font-bold">${t('hw_title', lang)}</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400">${t('hw_subtitle', lang)}</p>
        </div>

        <div class="flex justify-center gap-2 mb-4">
          ${['letters', 'words'].map(s => `
            <button data-hw-section="${s}" class="px-4 py-2 text-sm rounded-full transition-colors ${s === this.section
              ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}">
              ${t(s === 'letters' ? 'kids_letters' : 'kids_words', lang)}
            </button>`).join('')}
        </div>

        <!-- Every target on one page — tap any harf/word to practise it -->
        <div class="flex flex-wrap justify-center gap-1.5 mb-4" dir="rtl">
          ${this.targets().map((tg, i) => `
            <button data-hw-pick="${i}" class="min-w-[2.5rem] px-2 py-1.5 rounded-lg ayah-arabic !text-xl !leading-none transition-colors ${i === this.index
              ? 'bg-primary text-white shadow'
              : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700'}">${tg.text}</button>`).join('')}
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow p-4">
          <div class="flex items-center justify-between mb-2">
            <button data-hw-nav="-1" class="w-9 h-9 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-xl disabled:opacity-30">‹</button>
            <div class="text-center">
              <div class="text-sm font-medium text-gray-700 dark:text-gray-200">${this.current().label}</div>
              <div class="text-xs text-gray-400">${this.index + 1} / ${this.targets().length}</div>
            </div>
            <div class="flex items-center gap-1">
              <button data-hw-play class="w-9 h-9 rounded-full bg-primary text-white hover:bg-primary/80" title="${t('play', lang)}">▶</button>
              <button data-hw-nav="1" class="w-9 h-9 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-xl disabled:opacity-30">›</button>
            </div>
          </div>

          <div class="relative rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 bg-white" style="touch-action:none;">
            <canvas id="hw-canvas" class="w-full block rounded-xl" style="height:340px;"></canvas>
          </div>

          <div class="flex flex-wrap justify-center gap-2 mt-3">
            <button data-hw-reveal class="px-4 py-2 text-sm rounded-lg bg-secondary text-white hover:bg-secondary/80">✨ ${t('hw_reveal', lang)}</button>
            <button data-hw-undo class="px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">↶ ${t('hw_undo', lang)}</button>
            <button data-hw-clear class="px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">${t('clear', lang)}</button>
          </div>
          <p class="text-center text-xs text-gray-400 mt-2">${t('hw_hint', lang)}</p>
        </div>
      </div>
    `;

    this.setupCanvas();
  }

  setupCanvas() {
    this.canvas = this.root.querySelector('#hw-canvas');
    if (!this.canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = rect.width * dpr;
    this.canvas.height = 340 * dpr;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.scale(dpr, dpr);
    this.cw = rect.width; this.ch = 340;
    this.redraw();

    const pos = (e) => {
      const r = this.canvas.getBoundingClientRect();
      const p = e.touches ? e.touches[0] : e;
      return { x: p.clientX - r.left, y: p.clientY - r.top };
    };
    const start = (e) => { e.preventDefault(); this.drawing = true; this.strokes.push([pos(e)]); };
    const move = (e) => { if (!this.drawing) return; e.preventDefault(); this.strokes[this.strokes.length - 1].push(pos(e)); this.redraw(); };
    const end = () => { this.drawing = false; };

    this.canvas.addEventListener('pointerdown', start);
    this.canvas.addEventListener('pointermove', move);
    // The canvas is recreated each render, but window survives — bind pointerup once.
    if (!this._pointerUpBound) {
      this._pointerUpBound = true;
      this._onPointerUp = () => { this.drawing = false; };
      window.addEventListener('pointerup', this._onPointerUp);
    }
  }

  redraw() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.cw, this.ch);
    // Guide glyph (faint) — or solid when "reveal"
    const glyph = this.current().text;
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `${this.section === 'words' ? 150 : 220}px 'CustomArabic','Amiri',serif`;
    ctx.fillStyle = this.reveal ? 'rgba(30,64,175,0.85)' : 'rgba(120,120,120,0.14)';
    ctx.fillText(glyph, this.cw / 2, this.ch / 2 + 10);
    ctx.restore();
    // User strokes
    ctx.strokeStyle = '#111827';
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    for (const stroke of this.strokes) {
      if (stroke.length < 1) continue;
      ctx.beginPath();
      ctx.moveTo(stroke[0].x, stroke[0].y);
      stroke.forEach(p => ctx.lineTo(p.x, p.y));
      ctx.stroke();
    }
  }

  playCurrent() {
    const text = this.current().audio;
    if (this._clips && this._clips[text]) {
      this._audio.src = 'audio/qaida/' + this._clips[text];
      this._audio.play().catch(() => {});
    } else if (window.speechSynthesis && typeof SpeechSynthesisUtterance !== 'undefined') {
      const u = new SpeechSynthesisUtterance(text); u.lang = 'ar-SA'; u.rate = 0.8;
      try { speechSynthesis.cancel(); speechSynthesis.speak(u); } catch (e) {}
    }
  }

  onClick(e) {
    const pick = e.target.closest('[data-hw-pick]');
    if (pick) { this.index = parseInt(pick.getAttribute('data-hw-pick'), 10); this.render(); return; }
    const sec = e.target.closest('[data-hw-section]');
    if (sec) { this.section = sec.getAttribute('data-hw-section'); this.index = 0; this.render(); return; }
    const nav = e.target.closest('[data-hw-nav]');
    if (nav) {
      const d = parseInt(nav.getAttribute('data-hw-nav'), 10);
      const n = this.targets().length;
      this.index = (this.index + d + n) % n;
      this.render();
      return;
    }
    if (e.target.closest('[data-hw-play]')) return this.playCurrent();
    if (e.target.closest('[data-hw-reveal]')) { this.reveal = !this.reveal; this.redraw(); return; }
    if (e.target.closest('[data-hw-undo]')) { this.strokes.pop(); this.redraw(); return; }
    if (e.target.closest('[data-hw-clear]')) { this.strokes = []; this.reveal = false; this.redraw(); return; }
  }
}

let handwriting;
document.addEventListener('DOMContentLoaded', () => { handwriting = new Handwriting(); });
