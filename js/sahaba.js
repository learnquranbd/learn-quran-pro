/**
 * Sahaba (Companions of the Prophet ﷺ) — a vertical Timeline view grouped by
 * era, a Grid view, and a per-companion detail page (role, life-span, story,
 * key highlights, connected Quran references as tappable pills, and a lesson).
 * Bilingual en/bn content is authored INLINE per companion in js/sahaba-data.js;
 * UI chrome falls back through SAHABA_UI (+ CI18N) so the module renders under
 * any of the app's languages. Per-companion "read" progress lives in
 * localStorage under `lq_sahaba_read`.
 *
 * Renders into #sahaba-container (tab "sahaba"). Everything is defensive — it
 * never throws (guards DOM / localStorage / JSON / ayahModal / tabSystem / t /
 * appSettings). No figurative depiction of any person appears — avatars are
 * purely typographic (initials) on a colour token.
 *
 * ACCURACY: content follows mainstream Sunni sources; every entry was passed
 * through an adversarial fact-check before shipping.
 */

/* eslint-disable no-unused-vars */

/* --- Data lives in js/sahaba-data.js (SAHABA_ERAS, SAHABA_DATA, SAHABA_UI). --- */

class SahabaView {
  constructor() {
    this.container = document.getElementById('sahaba-container');
    if (!this.container) return;
    this.language = (typeof appSettings !== 'undefined' && appSettings) ? appSettings.get('language') : 'en';
    if (!this.language) this.language = 'en';
    this.rendered = false;
    this.view = 'timeline';   // 'timeline' | 'grid'
    this.grouped = true;      // timeline view: group by era
    this.filter = 'all';      // 'all' | 'caliph' | 'ashara' | 'ansar' | 'women'
    this.query = '';
    this.selected = null;     // companion id when in detail view
    this.read = this.loadRead();

    window.addEventListener('tabChanged', (e) => {
      try { if (e && e.detail && e.detail.tabId === 'sahaba') this.render(); } catch (_) { /* ignore */ }
    });
    window.addEventListener('settingChanged', (e) => {
      try {
        if (e && e.detail && e.detail.key === 'language') {
          this.language = e.detail.value || 'en';
          if (this.rendered) this.render();
        }
      } catch (_) { /* ignore */ }
    });
  }

  // ── helpers ──────────────────────────────────────────────────────────
  tt(key) {
    try { const v = t(key, this.language); if (v && v !== key) return v; } catch (_) { /* ignore */ }
    const e = (typeof SAHABA_UI !== 'undefined' && SAHABA_UI) ? SAHABA_UI[key] : null;
    if (e) {
      if (this.language && e[this.language]) return e[this.language];
      if (this.language === 'bn') return e.bn || e.en;
      if (this.language && this.language !== 'en' && typeof CI18N !== 'undefined' && e.en) {
        const tr = CI18N.tr(this.language, e.en); if (tr) return tr;
      }
      return e.en;
    }
    return key;
  }
  esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
  // Localized content picker: bn → CI18N knowledgebase → en fallback.
  lc(o) {
    if (!o) return '';
    if (this.language === 'bn' && o.bn) return o.bn;
    if (o.en && typeof CI18N !== 'undefined') { const tr = CI18N.tr(this.language, o.en); if (tr) return tr; }
    return o.en || o.bn || '';
  }
  loc(item, base) { return this.lc({ en: item[base + 'En'], bn: item[base + 'Bn'] }); }
  // Localized display name: Bengali form for the bn UI, transliteration elsewhere.
  cname(c) { return (this.language === 'bn' && c.bn) ? c.bn : c.translit; }

  loadRead() {
    try {
      const raw = localStorage.getItem('lq_sahaba_read');
      if (!raw) return new Set();
      const arr = JSON.parse(raw);
      return new Set(Array.isArray(arr) ? arr : []);
    } catch (_) { return new Set(); }
  }
  saveRead() {
    try { localStorage.setItem('lq_sahaba_read', JSON.stringify([...this.read])); } catch (_) { /* ignore */ }
  }

  surahName(n) {
    try {
      if (typeof getSurahByNumber === 'function') {
        const s = getSurahByNumber(n);
        if (s && s.names) return this.lc(s.names) || ('Surah ' + n);
        if (s && s.arabicName) return s.arabicName;
      }
      if (typeof SURAH_DATA !== 'undefined' && Array.isArray(SURAH_DATA)) {
        const s = SURAH_DATA.find(x => x.number === n);
        if (s && s.names) return this.lc(s.names) || ('Surah ' + n);
      }
    } catch (_) { /* ignore */ }
    return 'Surah ' + n;
  }
  // Convert a display ref ("9:40" or "2:255-257") to an openable "surah:ayah".
  openRef(ref) {
    const str = String(ref || '');
    if (str.indexOf(':') !== -1) {
      const surah = str.split(':')[0];
      let ayah = str.split(':')[1] || '1';
      ayah = ayah.split('-')[0].split(',')[0].trim();
      return surah + ':' + (ayah || '1');
    }
    return str + ':1';
  }
  refLabel(ref) {
    const str = String(ref || '');
    const surah = parseInt(str.split(':')[0], 10);
    const name = this.surahName(surah);
    const ayahPart = str.indexOf(':') !== -1 ? (':' + str.split(':')[1]) : '';
    return name + ' (' + surah + ayahPart + ')';
  }

  matches(c) {
    if (this.filter === 'caliph' && !c.caliph) return false;
    if (this.filter === 'ashara' && !c.ashara) return false;
    if (this.filter === 'ansar' && !c.ansar) return false;
    if (this.filter === 'women' && !c.woman) return false;
    const q = this.query.trim().toLowerCase();
    if (!q) return true;
    const hay = [c.ar, c.translit, c.en, c.bn, this.loc(c, 'role')].join(' ').toLowerCase();
    return hay.indexOf(q) !== -1;
  }

  badges(c) {
    let out = '';
    if (c.caliph) out += `<span class="px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-600 dark:text-amber-300 text-[0.65rem] font-semibold whitespace-nowrap">${this.esc(this.tt('sahaba_badge_caliph'))}</span>`;
    if (c.ashara) out += `<span class="px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 text-[0.65rem] font-semibold whitespace-nowrap">★ ${this.esc(this.tt('sahaba_badge_ashara'))}</span>`;
    if (c.ansar) out += `<span class="px-1.5 py-0.5 rounded bg-teal-500/10 text-teal-600 dark:text-teal-300 text-[0.65rem] font-semibold whitespace-nowrap">${this.esc(this.tt('sahaba_badge_ansar'))}</span>`;
    if (c.woman) out += `<span class="px-1.5 py-0.5 rounded bg-pink-500/10 text-pink-600 dark:text-pink-300 text-[0.65rem] font-semibold whitespace-nowrap">${this.esc(this.tt('sahaba_badge_woman'))}</span>`;
    return out;
  }

  avatar(c, size) {
    const s = size || 'w-11 h-11 text-sm';
    return `<span class="inline-flex items-center justify-center ${s} rounded-full ${c.color || 'bg-slate-500'} text-white font-bold shrink-0" aria-hidden="true">${this.esc(c.init || '·')}</span>`;
  }

  // ── rendering ────────────────────────────────────────────────────────
  render() {
    if (!this.container) return;
    this.rendered = true;

    const total = SAHABA_DATA.length;
    const readCount = SAHABA_DATA.filter(c => this.read.has(c.id)).length;
    const pct = total ? Math.round((readCount / total) * 100) : 0;

    const viewToggle = ['timeline', 'grid'].map(v => {
      const active = this.view === v;
      const label = v === 'timeline' ? this.tt('sahaba_view_timeline') : this.tt('sahaba_view_grid');
      const icon = v === 'timeline' ? '🕰️' : '▦';
      return `<button type="button" data-sahaba-view="${v}"
        class="px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors
               ${active ? 'bg-primary text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-primary'}">
        <span aria-hidden="true">${icon}</span> ${this.esc(label)}</button>`;
    }).join('');

    const filters = [
      { id: 'all', key: 'sahaba_filter_all', emoji: '✦' },
      { id: 'caliph', key: 'sahaba_filter_caliph', emoji: '👑' },
      { id: 'ashara', key: 'sahaba_filter_ashara', emoji: '★' },
      { id: 'ansar', key: 'sahaba_filter_ansar', emoji: '🌿' },
      { id: 'women', key: 'sahaba_filter_women', emoji: '🌸' },
    ].map(c => {
      const active = this.filter === c.id;
      return `<button type="button" data-sahaba-filter="${c.id}"
        class="px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap border transition-colors
               ${active ? 'bg-primary text-white border-primary'
                        : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-primary'}">
        <span aria-hidden="true">${c.emoji}</span> ${this.esc(this.tt(c.key))}</button>`;
    }).join('');

    this.container.innerHTML = `
      <div class="w-full max-w-4xl mx-auto pb-10">
        <div class="text-center mb-2">
          <p class="text-gray-500 dark:text-gray-400 text-sm">${this.esc(this.tt('sahaba_subtitle'))}</p>
        </div>
        <p class="text-xs text-gray-400 dark:text-gray-500 text-center mb-4" dir="auto">${this.esc(this.tt('sahaba_intro'))}</p>

        ${this.cotdHtml()}

        <div class="rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3 mb-4">
          <div class="flex items-center justify-between gap-2 mb-1.5">
            <span class="text-xs font-medium text-gray-500 dark:text-gray-400">${this.esc(this.tt('sahaba_progress'))}</span>
            <span class="text-xs font-semibold text-primary" data-sahaba-count>${readCount} ${this.esc(this.tt('sahaba_of'))} ${total}</span>
          </div>
          <div class="h-2 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
            <div class="h-full bg-primary transition-all" style="width:${pct}%" data-sahaba-bar></div>
          </div>
          <div class="text-right mt-1">
            <button type="button" data-sahaba-reset class="text-[0.7rem] text-gray-400 hover:text-red-500 transition-colors">↺ ${this.esc(this.tt('sahaba_reset'))}</button>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
          <div class="inline-flex gap-1 p-1 rounded-xl bg-gray-100 dark:bg-gray-800 w-max">${viewToggle}</div>
          <input type="text" data-sahaba-search value="${this.esc(this.query)}"
            placeholder="${this.esc(this.tt('sahaba_search_placeholder'))}"
            class="flex-1 px-3 py-2 rounded-lg text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none" dir="auto" />
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-5">
          ${filters}
          ${this.view === 'timeline' ? `<button type="button" data-sahaba-group
            class="px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap border transition-colors
                   ${this.grouped ? 'bg-primary text-white border-primary'
                                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-primary'}">
            <span aria-hidden="true">${this.grouped ? '▣' : '▢'}</span> ${this.esc(this.tt('sahaba_group_toggle'))}</button>` : ''}
        </div>

        ${this.asharaStripHtml()}

        <div data-sahaba-list></div>

        <div class="mt-6 rounded-lg bg-gray-50 dark:bg-gray-800/60 p-3">
          <p class="text-[0.7rem] text-gray-400 dark:text-gray-500 leading-relaxed" dir="auto">ℹ️ ${this.esc(this.tt('sahaba_note'))}</p>
        </div>
      </div>`;

    this.renderList();
    if (this.selected) this.renderDetailInline();
    this.bind();
  }

  renderList() {
    const listEl = this.container.querySelector('[data-sahaba-list]');
    if (!listEl) return;
    const items = SAHABA_DATA.filter(c => this.matches(c));
    if (!items.length) {
      listEl.innerHTML = `<p class="text-center text-gray-400 dark:text-gray-500 text-sm py-10">${this.esc(this.tt('sahaba_no_results'))}</p>`;
      return;
    }
    listEl.innerHTML = this.view === 'timeline' ? this.timelineHtml(items) : this.gridHtml(items);
  }

  // ── Companion of the day (deterministic pick by day-of-year) ─────────
  cotd() {
    try {
      const arr = SAHABA_DATA;
      if (!Array.isArray(arr) || !arr.length) return null;
      const now = new Date();
      const start = new Date(now.getFullYear(), 0, 0);
      const doy = Math.floor((now - start) / 86400000);
      const idx = ((doy % arr.length) + arr.length) % arr.length;
      return arr[idx] || null;
    } catch (_) { return null; }
  }
  cotdHtml() {
    const c = this.cotd();
    if (!c) return '';
    return `
      <div class="rounded-2xl bg-gradient-to-br from-primary/15 to-transparent border border-primary/25 p-4 mb-4">
        <div class="flex items-center gap-1.5 text-[0.7rem] font-semibold uppercase tracking-wide text-primary mb-2">
          <span aria-hidden="true">✦</span> ${this.esc(this.tt('sahaba_cotd_title'))}
        </div>
        <div class="flex items-start gap-3">
          ${this.avatar(c, 'w-12 h-12 text-base')}
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="font-bold text-gray-800 dark:text-gray-100">${this.esc(this.cname(c))}</span>
              <span class="text-lg font-arabic text-primary" dir="rtl" lang="ar">${this.esc(c.ar)}</span>
            </div>
            <p class="text-xs text-gray-600 dark:text-gray-300 mt-0.5" dir="auto">${this.esc(this.loc(c, 'role'))} · ${this.esc(c.yearEn)}</p>
            <button type="button" data-sahaba-open="${this.esc(c.id)}"
              class="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-semibold hover:opacity-90 transition-opacity">
              📖 ${this.esc(this.tt('sahaba_cotd_open'))} ›
            </button>
          </div>
        </div>
      </div>`;
  }

  // ── Ten Promised Paradise spotlight strip ────────────────────────────
  asharaStripHtml() {
    const ten = SAHABA_DATA.filter(c => c.ashara);
    if (!ten.length) return '';
    const chips = ten.map(c => `
      <button type="button" data-sahaba-open="${this.esc(c.id)}"
        class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white dark:bg-gray-800 border border-emerald-300/60 dark:border-emerald-700/60 hover:border-emerald-500 hover:shadow-sm transition-all whitespace-nowrap">
        ${this.avatar(c, 'w-6 h-6 text-[0.6rem]')}
        <span class="text-xs font-semibold text-gray-700 dark:text-gray-200">${this.esc(this.cname(c))}</span>
      </button>`).join('');
    return `
      <div class="rounded-xl bg-emerald-500/5 border border-emerald-300/40 dark:border-emerald-800/40 p-3 mb-4">
        <div class="flex items-center gap-1.5 text-[0.7rem] font-semibold text-emerald-600 dark:text-emerald-300 mb-2">
          <span aria-hidden="true">★</span> ${this.esc(this.tt('sahaba_ashara_strip_title'))}
        </div>
        <div class="flex flex-wrap gap-2">${chips}</div>
      </div>`;
  }

  timelineHtml(items) {
    if (!this.grouped) return this.timelineOl(items);
    return SAHABA_ERAS.map(era => {
      const group = items.filter(c => c.era === era.id);
      if (!group.length) return '';
      return `
        <div class="flex items-center gap-2 mt-5 mb-2 first:mt-0">
          <span class="text-base" aria-hidden="true">${era.emoji}</span>
          <h4 class="text-sm font-bold text-gray-700 dark:text-gray-200">${this.esc(this.tt(era.key))}</h4>
          <span class="flex-1 h-px bg-gray-200 dark:bg-gray-700"></span>
        </div>
        ${this.timelineOl(group)}`;
    }).join('');
  }

  timelineOl(items) {
    return `
      <ol class="relative border-s-2 border-gray-200 dark:border-gray-700 ms-5 space-y-4">
        ${items.map(c => {
          const isRead = this.read.has(c.id);
          return `
          <li class="ms-6">
            <span class="absolute -start-[1.35rem] ring-4 ring-gray-50 dark:ring-gray-900 rounded-full">${this.avatar(c, 'w-9 h-9 text-xs')}</span>
            <button type="button" data-sahaba-open="${this.esc(c.id)}"
              class="w-full text-left rounded-xl bg-white dark:bg-gray-800 border ${isRead ? 'border-green-300 dark:border-green-800' : 'border-gray-200 dark:border-gray-700'} p-4 hover:border-primary hover:shadow-md transition-all">
              <div class="flex items-start gap-3">
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2 flex-wrap">
                    <span class="font-bold text-gray-800 dark:text-gray-100">${this.esc(this.cname(c))}</span>
                    <span class="text-sm font-arabic text-primary" dir="rtl" lang="ar">${this.esc(c.ar)}</span>
                    ${isRead ? '<span class="text-green-500 text-xs">✓</span>' : ''}
                  </div>
                  <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mt-0.5" dir="auto">${this.esc(this.loc(c, 'role'))} <span class="opacity-60">· ${this.esc(c.yearEn)}</span></p>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 italic" dir="auto">“${this.esc(this.loc(c, 'highlight'))}”</p>
                  <div class="flex flex-wrap gap-1 mt-1.5">${this.badges(c)}</div>
                </div>
                <span class="text-gray-300 dark:text-gray-600 shrink-0" aria-hidden="true">›</span>
              </div>
            </button>
          </li>
          <div class="sahaba-detail-${this.esc(c.id)} mx-6"></div>`;
        }).join('')}
      </ol>`;
  }

  gridHtml(items) {
    return `
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        ${items.map(c => {
          const isRead = this.read.has(c.id);
          return `
          <div class="contents">
          <button type="button" data-sahaba-open="${this.esc(c.id)}"
            class="group text-left relative rounded-xl bg-white dark:bg-gray-800 border ${isRead ? 'border-green-300 dark:border-green-800' : 'border-gray-200 dark:border-gray-700'} p-4 hover:border-primary hover:shadow-md transition-all">
            <div class="flex items-center gap-2.5 mb-2">
              ${this.avatar(c, 'w-10 h-10 text-sm')}
              <div class="min-w-0">
                <div class="font-bold text-gray-800 dark:text-gray-100 truncate">${this.esc(this.cname(c))} ${isRead ? '<span class="text-green-500 text-xs align-middle">✓</span>' : ''}</div>
                <div class="text-[0.7rem] text-gray-400 dark:text-gray-500 truncate" dir="auto">${this.esc(this.loc(c, 'role'))}</div>
              </div>
            </div>
            <p class="text-xs text-gray-500 dark:text-gray-400 italic leading-relaxed mb-2" dir="auto">“${this.esc(this.loc(c, 'highlight'))}”</p>
            <div class="flex flex-wrap gap-1">${this.badges(c)}</div>
          </button>
          <div class="sahaba-detail-${this.esc(c.id)} col-span-full"></div>
          </div>`;
        }).join('')}
      </div>`;
  }

  renderDetailInline() {
    const c = SAHABA_DATA.find(x => x.id === this.selected);
    if (!c) return;
    const isRead = this.read.has(c.id);
    const el = this.container ? this.container.querySelector('.sahaba-detail-' + c.id) : null;
    if (!el) return;

    const events = Array.isArray(c.events) ? c.events : [];
    const eventsHtml = events.length ? `
      <div class="mb-4">
        <h3 class="text-sm font-bold text-gray-700 dark:text-gray-200 mb-2 flex items-center gap-1.5">◆ ${this.esc(this.tt('sahaba_label_highlights'))}</h3>
        <ul class="space-y-1.5">
          ${events.map(ev => `<li class="flex gap-2 text-sm text-gray-600 dark:text-gray-300" dir="auto"><span class="text-primary mt-0.5 shrink-0" aria-hidden="true">▸</span><span class="flex-1">${this.esc(this.lc(ev))}</span></li>`).join('')}
        </ul>
      </div>` : '';

    const refs = Array.isArray(c.refs) ? c.refs : [];
    const refsHtml = refs.length ? `
      <div class="mb-4">
        <h3 class="text-sm font-bold text-gray-700 dark:text-gray-200 mb-1 flex items-center gap-1.5">📖 ${this.esc(this.tt('sahaba_label_refs'))}</h3>
        <p class="text-[0.7rem] text-gray-400 dark:text-gray-500 mb-2">${this.esc(this.tt('sahaba_ref_hint'))}</p>
        <div class="flex flex-wrap gap-1.5">
          ${refs.map(r => `<button type="button" data-sahaba-ayah="${this.esc(this.openRef(r))}"
            class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium hover:bg-primary hover:text-white transition-colors" dir="auto">
            📖 ${this.esc(this.refLabel(r))}</button>`).join('')}
        </div>
      </div>` : '';

    el.innerHTML = `
      <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden mb-4">
        <div class="relative p-5 bg-gradient-to-br from-primary/10 to-transparent">
          <button type="button" data-sahaba-close="${this.esc(c.id)}"
            class="absolute top-3 end-3 inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-500 hover:text-primary hover:bg-white dark:hover:bg-gray-700 shadow-sm transition-colors z-10" title="Close">✕</button>
          <div class="flex items-center gap-3">
            ${this.avatar(c, 'w-14 h-14 text-lg')}
            <div class="min-w-0">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="font-bold text-lg text-gray-800 dark:text-gray-100">${this.esc(this.cname(c))}</span>
                <span class="text-xl font-arabic text-primary" dir="rtl" lang="ar">${this.esc(c.ar)}</span>
              </div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5" dir="auto">${this.esc(this.loc(c, 'role'))} · ${this.esc(c.yearEn)}</p>
              <div class="flex flex-wrap gap-1 mt-1.5">${this.badges(c)}</div>
            </div>
          </div>
        </div>

        <div class="p-5">
          <div class="mb-4">
            <h3 class="text-sm font-bold text-gray-700 dark:text-gray-200 mb-2 flex items-center gap-1.5">✦ ${this.esc(this.tt('sahaba_label_story'))}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed" dir="auto">${this.esc(this.loc(c, 'summary'))}</p>
          </div>

          ${eventsHtml}
          ${refsHtml}

          <div class="mb-4 p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/40">
            <div class="text-xs font-bold text-amber-700 dark:text-amber-300 mb-1">💡 ${this.esc(this.tt('sahaba_label_lesson'))}</div>
            <p class="text-sm text-amber-800 dark:text-amber-200 leading-relaxed" dir="auto">${this.esc(this.loc(c, 'lesson'))}</p>
          </div>

          <button type="button" data-sahaba-read="${this.esc(c.id)}"
            class="w-full sm:w-auto text-sm px-4 py-2.5 rounded-xl font-medium transition-colors
                   ${isRead ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' : 'bg-primary text-white hover:opacity-90'}">
            ${isRead ? '✓ ' + this.esc(this.tt('sahaba_marked_read')) : this.esc(this.tt('sahaba_mark_read'))}
          </button>
        </div>
      </div>`;

    try { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); } catch (_) { /* ignore */ }
  }

  // ── events ───────────────────────────────────────────────────────────
  bind() {
    if (this._bound) return;
    this._bound = true;

    this.container.addEventListener('click', (e) => {
      try {
        const close = e.target.closest('[data-sahaba-close]');
        if (close) { this.selected = null; this.render(); return; }

        const open = e.target.closest('[data-sahaba-open]');
        if (open) { this.selected = open.getAttribute('data-sahaba-open'); this.render(); return; }

        const viewBtn = e.target.closest('[data-sahaba-view]');
        if (viewBtn) { this.view = viewBtn.getAttribute('data-sahaba-view'); this.render(); return; }

        const groupBtn = e.target.closest('[data-sahaba-group]');
        if (groupBtn) { this.grouped = !this.grouped; this.render(); return; }

        const filterBtn = e.target.closest('[data-sahaba-filter]');
        if (filterBtn) { this.filter = filterBtn.getAttribute('data-sahaba-filter'); this.render(); return; }

        const readBtn = e.target.closest('[data-sahaba-read]');
        if (readBtn) { this.toggleRead(readBtn.getAttribute('data-sahaba-read')); return; }

        const ayahBtn = e.target.closest('[data-sahaba-ayah]');
        if (ayahBtn) { this.openAyah(ayahBtn.getAttribute('data-sahaba-ayah')); return; }

        const reset = e.target.closest('[data-sahaba-reset]');
        if (reset) { this.resetProgress(); return; }
      } catch (_) { /* ignore */ }
    });

    this.container.addEventListener('input', (e) => {
      try {
        const search = e.target.closest ? e.target.closest('[data-sahaba-search]') : null;
        if (search) { this.query = search.value || ''; this.renderList(); }
      } catch (_) { /* ignore */ }
    });
  }

  toggleRead(id) {
    if (this.read.has(id)) this.read.delete(id); else this.read.add(id);
    this.saveRead();
    if (this.selected === id) { this.renderDetailInline(); }
    else { this.renderList(); }
    this.updateProgress();
  }
  updateProgress() {
    const total = SAHABA_DATA.length;
    const readCount = SAHABA_DATA.filter(c => this.read.has(c.id)).length;
    const pct = total ? Math.round((readCount / total) * 100) : 0;
    const countEl = this.container.querySelector('[data-sahaba-count]');
    const barEl = this.container.querySelector('[data-sahaba-bar]');
    if (countEl) countEl.textContent = `${readCount} ${this.tt('sahaba_of')} ${total}`;
    if (barEl) barEl.style.width = `${pct}%`;
  }
  resetProgress() {
    this.read = new Set();
    this.saveRead();
    this.render();
  }
  openAyah(ref) {
    try {
      if (typeof ayahModal !== 'undefined' && ayahModal && typeof ayahModal.open === 'function') ayahModal.open(ref);
    } catch (_) { /* ignore */ }
  }
}

let sahabaView;
document.addEventListener('DOMContentLoaded', () => { try { sahabaView = new SahabaView(); } catch (_) { /* ignore */ } });
