/**
 * Arabic Handwriting / Tracing Practice
 * Trace a faint target letter / letter-form / word on a canvas with finger
 * or mouse, then "Reveal" the perfect calligraphic form to compare. Clear /
 * undo per stroke; step through targets; hear the target. Guided practice —
 * not handwriting-recognition (that needs a server model), but what teaches
 * Arabic writing.
 *
 * Enrichments:
 * - Letter Forms section: practice each letter's isolated / initial / medial /
 *   final form (shaped via tatweel joining — the standard textbook display).
 * - Guide overlay: numbered dots along the glyph, right-to-left — where to
 *   start and which way to write.
 * - Check: pixel-coverage score (how much of the template your ink covers),
 *   friendly pass threshold with retry.
 * - Progress: best scores persist in localStorage; passed targets get a green
 *   ring in the picker and a per-section practiced counter.
 */

/** Letters that do not connect to the following letter — no initial/medial form. */
const HW_NON_CONNECTORS = ['ا', 'د', 'ذ', 'ر', 'ز', 'و'];
const HW_FORMS = ['isolated', 'initial', 'medial', 'final'];
const HW_PASS_PCT = 60;
/** Ink palette + nib sizes offered under the canvas (persisted per user). */
const HW_COLORS = ['#111827', '#1e40af', '#dc2626', '#059669', '#d97706', '#7c3aed'];
const HW_SIZES = [3, 6, 10, 16];

class Handwriting {
  constructor() {
    this.root = document.getElementById('handwriting-root');
    if (!this.root) return;

    this.language = (typeof appSettings !== 'undefined' && appSettings) ? appSettings.get('language') : 'en';
    this.section = 'letters';   // letters | forms | words
    this.form = 'isolated';     // for the forms section
    this.index = 0;
    this.strokes = [];          // [[{x,y}...], ...]
    this.drawing = false;
    this.reveal = false;
    this.guide = false;
    this.progress = this.loadProgress(); // { 'section:target[:form]': bestPct }
    this.brush = this.loadBrush();        // { size, color } — persisted nib
    this._audio = new Audio();
    this._clips = null;
    fetch('audio/qaida/manifest.json').then(r => r.ok ? r.json() : null).then(m => { this._clips = m || {}; }).catch(() => {});

    window.addEventListener('learnModuleSelected', (e) => {
      if (e.detail && e.detail.module === 'handwriting') this.render();
      else this.stopAll(); // another module — or null when going back to the Learn hub
    });
    // Stop audio when the user leaves the Learn tab
    window.addEventListener('tabChanged', (e) => {
      if (e.detail && e.detail.tabId !== 'learn') this.stopAll();
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
    // letters + forms both pick from the 28 letters
    return (typeof QAIDA_LETTERS !== 'undefined' ? QAIDA_LETTERS : []).map(l => ({ text: l.char, label: l.translit + ' · ' + l.name, audio: l.name }));
  }

  current() {
    const list = this.targets();
    return list[Math.min(this.index, list.length - 1)] || { text: '', label: '' };
  }

  /** Which of the 4 forms exist for a letter (non-connectors lack initial/medial). */
  formsFor(char) {
    return HW_NON_CONNECTORS.includes(char) ? ['isolated', 'final'] : HW_FORMS;
  }

  /** The text actually drawn on the canvas — shaped with tatweel for letter forms. */
  glyphText() {
    const ch = this.current().text;
    if (this.section !== 'forms') return ch;
    if (this.form === 'initial') return ch + 'ـ';
    if (this.form === 'medial') return 'ـ' + ch + 'ـ';
    if (this.form === 'final') return 'ـ' + ch;
    return ch;
  }

  /* ---------- progress (localStorage) ---------- */

  loadProgress() {
    try { return JSON.parse(localStorage.getItem('hw_progress') || '{}') || {}; } catch (e) { return {}; }
  }

  saveProgress() {
    try { localStorage.setItem('hw_progress', JSON.stringify(this.progress)); } catch (e) {}
  }

  /* ---------- brush (localStorage) ---------- */

  loadBrush() {
    try {
      const b = JSON.parse(localStorage.getItem('hw_brush') || '{}') || {};
      return {
        size: HW_SIZES.includes(b.size) ? b.size : 6,
        color: (typeof b.color === 'string' && /^#[0-9a-fA-F]{6}$/.test(b.color)) ? b.color : '#111827'
      };
    } catch (e) { return { size: 6, color: '#111827' }; }
  }

  saveBrush() {
    try { localStorage.setItem('hw_brush', JSON.stringify(this.brush)); } catch (e) {}
  }

  progressKey(text, form) {
    return this.section === 'forms' ? `forms:${text}:${form || this.form}` : `${this.section}:${text}`;
  }

  /** Has target i in the current section been passed (all its forms, for the forms section)? */
  isDone(i) {
    const tg = this.targets()[i];
    if (!tg) return false;
    if (this.section === 'forms') {
      return this.formsFor(tg.text).every(f => (this.progress[`forms:${tg.text}:${f}`] || 0) >= HW_PASS_PCT);
    }
    return (this.progress[this.progressKey(tg.text)] || 0) >= HW_PASS_PCT;
  }

  /** { done, total } practiced counter for the current section. */
  sectionProgress() {
    const list = this.targets();
    if (this.section === 'forms') {
      let done = 0, total = 0;
      list.forEach(tg => this.formsFor(tg.text).forEach(f => {
        total++;
        if ((this.progress[`forms:${tg.text}:${f}`] || 0) >= HW_PASS_PCT) done++;
      }));
      return { done, total };
    }
    let done = 0;
    list.forEach((tg, i) => { if (this.isDone(i)) done++; });
    return { done, total: list.length };
  }

  render() {
    const lang = this.language;
    this.strokes = [];
    this.reveal = false;
    // Keep the chosen form valid for the current letter
    if (this.section === 'forms' && !this.formsFor(this.current().text).includes(this.form)) this.form = 'isolated';
    const prog = this.sectionProgress();

    this.root.innerHTML = `
      <div class="w-full">
        <div class="text-center mb-4">
          <div class="text-4xl mb-1">✍️</div>
          <h2 class="text-xl font-bold">${t('hw_title', lang)}</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400">${t('hw_subtitle', lang)}</p>
          <p class="text-xs mt-1 text-emerald-600 dark:text-emerald-400">⭐ ${t('hw_progress', lang)}: <span id="hw-progress-count">${prog.done}</span>/${prog.total}</p>
        </div>

        <div class="flex justify-center gap-2 mb-4">
          ${['letters', 'forms', 'words'].map(s => `
            <button data-hw-section="${s}" class="px-4 py-2 text-sm rounded-full transition-colors ${s === this.section
              ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}">
              ${t(s === 'letters' ? 'kids_letters' : s === 'forms' ? 'hw_forms' : 'kids_words', lang)}
            </button>`).join('')}
        </div>

        <!-- Every target on one page — tap any harf/word to practise it -->
        <div class="flex flex-wrap justify-center gap-1.5 mb-4" dir="rtl">
          ${this.targets().map((tg, i) => `
            <button data-hw-pick="${i}" class="min-w-[2.75rem] px-2 py-2 rounded-lg ayah-arabic !text-xl !leading-none transition-colors ${i === this.index
              ? 'bg-primary text-white shadow'
              : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700'} ${this.isDone(i) ? 'ring-2 ring-emerald-400/70' : ''}">${tg.text}</button>`).join('')}
        </div>

        ${this.section === 'forms' ? `
        <div class="flex flex-wrap justify-center gap-1.5 mb-4">
          ${HW_FORMS.map(f => {
            const ok = this.formsFor(this.current().text).includes(f);
            return `
            <button data-hw-form="${f}" ${ok ? '' : 'disabled'} class="px-3 py-1.5 text-xs rounded-lg transition-colors ${f === this.form
              ? 'bg-secondary text-white shadow'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'} disabled:opacity-30 disabled:cursor-not-allowed">
              ${t('hw_form_' + f, lang)}
            </button>`;
          }).join('')}
        </div>
        ${this.formsFor(this.current().text).length < 4 ? `<p class="text-center text-xs text-gray-400 -mt-2 mb-3">${t('hw_no_form', lang)}</p>` : ''}` : ''}

        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow p-4">
          <div class="flex items-center justify-between mb-2">
            <button data-hw-nav="-1" title="${t('previous', lang)}" aria-label="${t('previous', lang)}"
                    class="w-11 h-11 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-xl disabled:opacity-30">‹</button>
            <div class="text-center">
              <div class="text-sm font-medium text-gray-700 dark:text-gray-200">${this.current().label}${this.section === 'forms' ? ' · ' + t('hw_form_' + this.form, lang) : ''}</div>
              <div class="text-xs text-gray-400">${this.index + 1} / ${this.targets().length}</div>
            </div>
            <div class="flex items-center gap-1">
              <button data-hw-play class="w-11 h-11 rounded-full bg-primary text-white hover:bg-primary/80" title="${t('play', lang)}" aria-label="${t('play', lang)}">▶</button>
              <button data-hw-nav="1" title="${t('next', lang)}" aria-label="${t('next', lang)}"
                      class="w-11 h-11 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-xl disabled:opacity-30">›</button>
            </div>
          </div>

          <div class="relative rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 bg-white" style="touch-action:none;">
            <canvas id="hw-canvas" class="w-full block rounded-xl" style="height:clamp(260px, 50vh, 480px);"></canvas>
          </div>

          <div class="flex flex-wrap justify-center gap-2 mt-3">
            <button data-hw-check class="px-4 py-2 text-sm rounded-lg bg-primary text-white hover:bg-primary/80">✔ ${t('hw_check', lang)}</button>
            <button data-hw-guide class="px-4 py-2 text-sm rounded-lg ${this.guide
              ? 'bg-amber-500 text-white' : 'border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'}">① ${t('hw_guide', lang)}</button>
            <button data-hw-reveal class="px-4 py-2 text-sm rounded-lg bg-secondary text-white hover:bg-secondary/80">✨ ${t('hw_reveal', lang)}</button>
            <button data-hw-undo class="px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">↶ ${t('hw_undo', lang)}</button>
            <button data-hw-clear class="px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">${t('clear', lang)}</button>
          </div>

          <!-- Nib controls: ink colour, brush size, and save-as-PNG -->
          <div class="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-3">
            <div class="flex items-center gap-1.5">
              <span class="text-xs text-gray-500 dark:text-gray-400">${t('hw_color', lang)}</span>
              ${HW_COLORS.map(c => `
                <button data-hw-color="${c}" aria-label="${c}" title="${c}"
                        class="w-6 h-6 rounded-full border-2 transition-transform ${c === this.brush.color ? 'border-primary scale-110' : 'border-transparent'}"
                        style="background:${c}"></button>`).join('')}
            </div>
            <div class="flex items-center gap-1.5">
              <span class="text-xs text-gray-500 dark:text-gray-400">${t('hw_brush', lang)}</span>
              ${HW_SIZES.map(s => `
                <button data-hw-size="${s}" aria-label="${s}px"
                        class="w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${s === this.brush.size
                          ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}">
                  <span style="display:inline-block;width:${Math.max(4, Math.round(s / 1.4))}px;height:${Math.max(4, Math.round(s / 1.4))}px;border-radius:9999px;background:currentColor"></span>
                </button>`).join('')}
            </div>
            <button data-hw-download class="px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">⬇ ${t('hw_download', lang)}</button>
          </div>

          <div id="hw-feedback" class="text-center text-sm mt-2 min-h-[1.25rem]"></div>
          <p id="hw-hint" class="text-center text-xs text-gray-400 mt-1">${this.guide ? t('hw_guide_hint', lang) : t('hw_hint', lang)}</p>
        </div>
      </div>
    `;

    this.setupCanvas();
  }

  setupCanvas() {
    this.canvas = this.root.querySelector('#hw-canvas');
    if (!this.canvas) return;
    this.cw = 0; this.ch = 0; // fresh canvas — no stroke rescale on first sizing
    this.sizeCanvas();

    const pos = (e) => {
      const r = this.canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const start = (e) => {
      e.preventDefault();
      // Capture the pointer so strokes keep recording past the canvas edge.
      try { this.canvas.setPointerCapture(e.pointerId); } catch (err) {}
      this.drawing = true;
      this.strokes.push([pos(e)]);
    };
    const move = (e) => { if (!this.drawing) return; e.preventDefault(); this.strokes[this.strokes.length - 1].push(pos(e)); this.redraw(); };
    const end = (e) => {
      this.drawing = false;
      try { this.canvas.releasePointerCapture(e.pointerId); } catch (err) {}
    };

    this.canvas.addEventListener('pointerdown', start);
    this.canvas.addEventListener('pointermove', move);
    this.canvas.addEventListener('pointerup', end);
    this.canvas.addEventListener('pointercancel', end);
    // The canvas is recreated each render, but window survives — bind pointerup once (safety net).
    if (!this._pointerUpBound) {
      this._pointerUpBound = true;
      this._onPointerUp = () => { this.drawing = false; };
      window.addEventListener('pointerup', this._onPointerUp);
    }

    // Re-size the backing store on rotation/resize so ink stays under the finger.
    if (typeof ResizeObserver !== 'undefined') {
      if (this._resizeObs) this._resizeObs.disconnect();
      this._resizeObs = new ResizeObserver(() => {
        clearTimeout(this._resizeTimer);
        this._resizeTimer = setTimeout(() => this.sizeCanvas(), 120);
      });
      this._resizeObs.observe(this.canvas);
    }
  }

  /** Match the backing store to the CSS box; rescale existing strokes to the new size. */
  sizeCanvas() {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return; // hidden (other tab/module) — keep as-is
    const dpr = window.devicePixelRatio || 1;
    if (this.cw && this.ch && (rect.width !== this.cw || rect.height !== this.ch)) {
      const sx = rect.width / this.cw, sy = rect.height / this.ch;
      this.strokes = this.strokes.map(s => s.map(p => ({ x: p.x * sx, y: p.y * sy })));
    }
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.scale(dpr, dpr);
    this.cw = rect.width; this.ch = rect.height;
    this.redraw();
  }

  /** Set the glyph font on ctx, shrinking to fit wide targets (words, medial forms). */
  fitGlyphFont(ctx) {
    let size = Math.round(this.ch * (this.section === 'words' ? 0.44 : 0.65)); // ≈150/220px at the old 340px height
    ctx.font = `${size}px 'CustomArabic','Amiri',serif`;
    const w = ctx.measureText(this.glyphText()).width;
    const maxW = this.cw * 0.88;
    if (w > maxW) {
      size = Math.max(40, Math.floor(size * maxW / w));
      ctx.font = `${size}px 'CustomArabic','Amiri',serif`;
    }
  }

  redraw() {
    const ctx = this.ctx;
    if (!ctx) return;
    ctx.clearRect(0, 0, this.cw, this.ch);
    // Guide glyph (faint) — or solid when "reveal"
    const glyph = this.glyphText();
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    this.fitGlyphFont(ctx);
    ctx.fillStyle = this.reveal ? 'rgba(30,64,175,0.85)' : 'rgba(120,120,120,0.14)';
    ctx.fillText(glyph, this.cw / 2, this.ch / 2 + 10);
    ctx.restore();
    // Numbered stroke-direction dots (right-to-left) when the guide is on
    if (this.guide && !this.reveal) this.drawGuideDots(ctx);
    // User strokes
    ctx.strokeStyle = (this.brush && this.brush.color) || '#111827';
    ctx.lineWidth = (this.brush && this.brush.size) || 6;
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

  /* ---------- template pixels (offscreen, CSS-pixel space — same as strokes) ---------- */

  /** Render the glyph alone on an offscreen canvas and cache its ImageData. */
  templateData() {
    const W = Math.round(this.cw), H = Math.round(this.ch);
    if (!W || !H) return null;
    const key = this.glyphText() + '|' + W + 'x' + H;
    if (this._tplKey === key && this._tpl) return this._tpl;
    const c = document.createElement('canvas');
    c.width = W; c.height = H;
    const x = c.getContext('2d');
    x.textAlign = 'center';
    x.textBaseline = 'middle';
    this.fitGlyphFont(x);
    x.fillStyle = '#000';
    x.fillText(this.glyphText(), this.cw / 2, this.ch / 2 + 10);
    this._tpl = x.getImageData(0, 0, W, H);
    this._tplKey = key;
    this._guidePts = null; // template changed → recompute dots
    return this._tpl;
  }

  /**
   * Numbered guide dots: scan the template's ink columns right-to-left and place
   * evenly spaced dots on the dominant ink run of each sampled column — the
   * writing path of Arabic body strokes (start right, move left).
   */
  guidePoints() {
    if (this._guidePts && this._tplKey === this.glyphText() + '|' + Math.round(this.cw) + 'x' + Math.round(this.ch)) return this._guidePts;
    const img = this.templateData();
    if (!img) return [];
    const d = img.data, W = img.width, H = img.height;
    const cols = [];
    for (let x = 0; x < W; x += 3) {
      let run = null, best = null;
      for (let y = 0; y < H; y++) {
        if (d[(y * W + x) * 4 + 3] > 60) {
          if (run) run.y1 = y; else run = { y0: y, y1: y };
        } else if (run) {
          if (!best || (run.y1 - run.y0) > (best.y1 - best.y0)) best = run;
          run = null;
        }
      }
      if (run && (!best || (run.y1 - run.y0) > (best.y1 - best.y0))) best = run;
      if (best) cols.push({ x, y: (best.y0 + best.y1) / 2 });
    }
    if (cols.length < 2) { this._guidePts = []; return this._guidePts; }
    const inkWidth = cols.length * 3;
    const n = Math.max(3, Math.min(8, Math.round(inkWidth / 70)));
    const pts = [];
    for (let i = 0; i < n; i++) {
      // rightmost column first — Arabic is written right-to-left
      const idx = Math.round((cols.length - 1) * (1 - i / (n - 1)));
      pts.push(cols[idx]);
    }
    this._guidePts = pts;
    return pts;
  }

  drawGuideDots(ctx) {
    const pts = this.guidePoints();
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    pts.forEach((p, i) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 11, 0, Math.PI * 2);
      ctx.fillStyle = i === 0 ? 'rgba(217,119,6,0.95)' : 'rgba(245,158,11,0.8)';
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText(String(i + 1), p.x, p.y + 0.5);
    });
    ctx.restore();
  }

  /* ---------- coverage check ---------- */

  /** Compare user ink against template pixels; score = % of template covered. */
  check() {
    const fb = this.root.querySelector('#hw-feedback');
    if (!fb) return;
    if (!this.strokes.some(s => s.length > 1)) {
      fb.innerHTML = `<span class="text-gray-500 dark:text-gray-400">${t('hw_draw_first', this.language)}</span>`;
      return;
    }
    const tpl = this.templateData();
    if (!tpl) return;
    const W = tpl.width, H = tpl.height;
    // Render the user's strokes alone, thickened for a forgiving tolerance band.
    const uc = document.createElement('canvas');
    uc.width = W; uc.height = H;
    const ux = uc.getContext('2d');
    ux.strokeStyle = '#000';
    ux.lineWidth = 18;
    ux.lineCap = 'round';
    ux.lineJoin = 'round';
    for (const stroke of this.strokes) {
      if (stroke.length < 1) continue;
      ux.beginPath();
      ux.moveTo(stroke[0].x, stroke[0].y);
      stroke.forEach(p => ux.lineTo(p.x, p.y));
      ux.stroke();
    }
    const ud = ux.getImageData(0, 0, W, H).data;
    const td = tpl.data;
    let total = 0, hit = 0;
    for (let y = 0; y < H; y += 2) {
      for (let x = 0; x < W; x += 2) {
        const a = (y * W + x) * 4 + 3;
        if (td[a] > 60) { total++; if (ud[a] > 0) hit++; }
      }
    }
    const pct = total ? Math.round(hit / total * 100) : 0;
    const pass = pct >= HW_PASS_PCT;
    fb.innerHTML = pass
      ? `<span class="font-semibold text-emerald-600 dark:text-emerald-400">🎉 ${t('hw_pass', this.language)} — ${t('hw_score', this.language)}: ${pct}%</span>`
      : `<span class="text-amber-600 dark:text-amber-400">${t('hw_try_again', this.language)} (${t('hw_score', this.language)}: ${pct}%)</span>`;
    // Persist the best score; badge the picker + counter live (no re-render — keep the ink)
    const key = this.progressKey(this.current().text);
    if (pct > (this.progress[key] || 0)) { this.progress[key] = pct; this.saveProgress(); }
    if (pass) {
      const pick = this.root.querySelector(`[data-hw-pick="${this.index}"]`);
      if (pick && this.isDone(this.index)) pick.classList.add('ring-2', 'ring-emerald-400/70');
      const count = this.root.querySelector('#hw-progress-count');
      if (count) count.textContent = String(this.sectionProgress().done);
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

  /** Flatten the canvas (guide glyph + ink) onto a white page and download a PNG. */
  downloadPNG() {
    if (!this.canvas || !this.canvas.width) return;
    try {
      const out = document.createElement('canvas');
      out.width = this.canvas.width;
      out.height = this.canvas.height;
      const ox = out.getContext('2d');
      if (!ox) return;
      ox.fillStyle = '#ffffff';
      ox.fillRect(0, 0, out.width, out.height);
      ox.drawImage(this.canvas, 0, 0);
      const safe = String(this.current().label || 'letter').replace(/[^A-Za-z0-9]+/g, '_').replace(/^_|_$/g, '') || 'letter';
      const a = document.createElement('a');
      a.href = out.toDataURL('image/png');
      a.download = `handwriting_${safe}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (e) {}
  }

  /** Stop the clip + TTS this module owns (called on tab/module leave). */
  stopAll() {
    try { this._audio.pause(); } catch (e) {}
    try { if (window.speechSynthesis) window.speechSynthesis.cancel(); } catch (e) {}
  }

  onClick(e) {
    const pick = e.target.closest('[data-hw-pick]');
    if (pick) { this.index = parseInt(pick.getAttribute('data-hw-pick'), 10); this.render(); return; }
    const sec = e.target.closest('[data-hw-section]');
    if (sec) { this.section = sec.getAttribute('data-hw-section'); this.index = 0; this.form = 'isolated'; this.render(); return; }
    const form = e.target.closest('[data-hw-form]');
    if (form && !form.disabled) { this.form = form.getAttribute('data-hw-form'); this.render(); return; }
    const nav = e.target.closest('[data-hw-nav]');
    if (nav) {
      const d = parseInt(nav.getAttribute('data-hw-nav'), 10);
      const n = this.targets().length;
      this.index = (this.index + d + n) % n;
      this.render();
      return;
    }
    if (e.target.closest('[data-hw-play]')) return this.playCurrent();
    if (e.target.closest('[data-hw-check]')) return this.check();
    if (e.target.closest('[data-hw-guide]')) {
      // Live toggle — no re-render, so in-progress ink survives.
      this.guide = !this.guide;
      const btn = this.root.querySelector('[data-hw-guide]');
      if (btn) {
        btn.classList.toggle('bg-amber-500', this.guide);
        btn.classList.toggle('text-white', this.guide);
        btn.classList.toggle('border', !this.guide);
        btn.classList.toggle('border-gray-300', !this.guide);
        btn.classList.toggle('dark:border-gray-600', !this.guide);
      }
      const hint = this.root.querySelector('#hw-hint');
      if (hint) hint.textContent = t(this.guide ? 'hw_guide_hint' : 'hw_hint', this.language);
      this.redraw();
      return;
    }
    const color = e.target.closest('[data-hw-color]');
    if (color) {
      // Live — no re-render, so in-progress ink survives the colour change.
      this.brush.color = color.getAttribute('data-hw-color');
      this.saveBrush();
      this.root.querySelectorAll('[data-hw-color]').forEach(b => {
        const on = b.getAttribute('data-hw-color') === this.brush.color;
        b.classList.toggle('border-primary', on);
        b.classList.toggle('scale-110', on);
        b.classList.toggle('border-transparent', !on);
      });
      this.redraw();
      return;
    }
    const size = e.target.closest('[data-hw-size]');
    if (size) {
      this.brush.size = parseInt(size.getAttribute('data-hw-size'), 10) || 6;
      this.saveBrush();
      this.root.querySelectorAll('[data-hw-size]').forEach(b => {
        const on = parseInt(b.getAttribute('data-hw-size'), 10) === this.brush.size;
        b.classList.toggle('bg-primary', on);
        b.classList.toggle('text-white', on);
        b.classList.toggle('bg-gray-100', !on);
        b.classList.toggle('dark:bg-gray-800', !on);
        b.classList.toggle('text-gray-600', !on);
        b.classList.toggle('dark:text-gray-300', !on);
      });
      this.redraw();
      return;
    }
    if (e.target.closest('[data-hw-download]')) return this.downloadPNG();
    if (e.target.closest('[data-hw-reveal]')) { this.reveal = !this.reveal; this.redraw(); return; }
    if (e.target.closest('[data-hw-undo]')) { this.strokes.pop(); this.redraw(); return; }
    if (e.target.closest('[data-hw-clear]')) {
      this.strokes = []; this.reveal = false; this.redraw();
      const fb = this.root.querySelector('#hw-feedback');
      if (fb) fb.innerHTML = '';
      return;
    }
  }
}

let handwriting;
document.addEventListener('DOMContentLoaded', () => { handwriting = new Handwriting(); });
