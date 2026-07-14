/**
 * Khatmah (খতম) — Quran completion planner.
 *
 * Pick a pace (7/15/30/60 days, custom days, or a pages-per-day calculator);
 * each day gets a portion of the mushaf. 30-day plans follow the real juz
 * boundaries (JUZ_DATA); other durations divide the Quran's 6,236 verses
 * evenly in mushaf order. Progress lives in localStorage; "Read" loads the
 * day's ranges into the Reading tab and "Mushaf" jumps the Mushaf tab to the
 * portion's page (explicit navigation). Renders into #khatmah-container.
 *
 * Enrichments: pages-per-day preset calculator, habit streak (real calendar
 * days, tracked via completion timestamps), verses-read + projected-finish
 * stats, a catch-up card that bundles every overdue portion into one link,
 * "resume where I left off", and a one-tap jump into the Mushaf.
 */

class Khatmah {
  constructor() {
    this.container = document.getElementById('khatmah-container');
    if (!this.container) return;
    this.language = (typeof appSettings !== 'undefined' && appSettings) ? appSettings.get('language') : 'en';
    this.plan = this.load();
    this.viewDay = null;        // day whose portion card is shown (defaults to today)
    this.confirmRestart = false;

    // Cumulative verse counts: cum[s] = verses before surah s (1-based)
    this.cum = [0, 0];
    let total = 0;
    SURAH_DATA.forEach(s => { this.cum[s.number] = total; total += s.ayahCount; });
    this.totalVerses = total; // 6236

    // Local fallback for new i18n keys not yet in translations.js. t() falls
    // back to the raw key when missing; f() substitutes these so the UI stays
    // readable until the keys are merged. (Reported alongside this change.)
    this.FB = {
      en: {
        khatmah_or_pages: 'or by pages/day:',
        khatmah_stat_streak: 'Day streak',
        khatmah_stat_verses: 'Verses read',
        khatmah_stat_projected: 'Projected finish',
        khatmah_open_mushaf: 'Open in Mushaf',
        khatmah_catchup_title: 'Catch up',
        khatmah_catchup_desc: "{n} days behind — read the missed portions below to get back on track",
        khatmah_catchup_read: 'Read catch-up portion',
        khatmah_resume: 'Resume where I left off',
        khatmah_projected_done: 'Finished!',
        khatmah_none: '—'
      },
      bn: {
        khatmah_or_pages: 'অথবা পৃষ্ঠা/দিন হিসেবে:',
        khatmah_stat_streak: 'ধারাবাহিকতা',
        khatmah_stat_verses: 'পঠিত আয়াত',
        khatmah_stat_projected: 'প্রক্ষেপিত সমাপ্তি',
        khatmah_open_mushaf: 'মুসহাফে খুলুন',
        khatmah_catchup_title: 'পুষিয়ে নিন',
        khatmah_catchup_desc: '{n} দিন পিছিয়ে — পুষিয়ে নিতে নিচের বাদ পড়া অংশগুলো পড়ুন',
        khatmah_catchup_read: 'পুষিয়ে নেওয়ার অংশ পড়ুন',
        khatmah_resume: 'যেখানে থেমেছিলেন সেখান থেকে শুরু করুন',
        khatmah_projected_done: 'সম্পন্ন!',
        khatmah_none: '—'
      }
    };

    window.addEventListener('tabChanged', (e) => { if (e.detail.tabId === 'khatmah') this.render(); });
    window.addEventListener('settingChanged', (e) => {
      if (e.detail.key === 'language') { this.language = e.detail.value; if (this.container.innerHTML) this.render(); }
    });
    this.container.addEventListener('click', (e) => this.onClick(e));
  }

  tt(key) { return t(key, this.language); }

  /** Translate a (possibly new) key with {placeholder} substitution + local fallback. */
  f(key, vars) {
    let s = t(key, this.language);
    if (s === key) s = (this.FB[this.language] && this.FB[this.language][key]) || this.FB.en[key] || key;
    if (vars) for (const k in vars) s = s.split('{' + k + '}').join(vars[k]);
    return s;
  }

  load() {
    try { return JSON.parse(localStorage.getItem('khatmahPlan')) || null; } catch (e) { return null; }
  }
  save() {
    try { localStorage.setItem('khatmahPlan', JSON.stringify(this.plan)); } catch (e) { /* ignore */ }
  }

  startPlan(days) {
    days = Math.max(1, Math.min(365, Math.floor(days)));
    const today = new Date(); today.setHours(0, 0, 0, 0);
    this.plan = { days, start: today.getTime(), done: [], doneAt: {} };
    this.viewDay = null;
    this.confirmRestart = false;
    this.save();
    this.render();
  }

  /** 1-based calendar day of the plan (clamped to [1, days]). */
  currentDay() {
    if (!this.plan) return 1;
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const elapsed = Math.floor((today.getTime() - this.plan.start) / 86400000);
    return Math.max(1, Math.min(this.plan.days, elapsed + 1));
  }

  /** Global verse index (0-based) of surah:ayah. */
  gIndex(s, a) { return this.cum[s] + (a - 1); }

  /** Convert an inclusive global-index range into per-surah "s:a-b" segments. */
  segments(gStart, gEnd) {
    const segs = [];
    let g = gStart;
    while (g <= gEnd) {
      const s = SURAH_DATA.find(x => this.cum[x.number] <= g && g < this.cum[x.number] + x.ayahCount);
      if (!s) break;
      const from = g - this.cum[s.number] + 1;
      const to = Math.min(s.ayahCount, gEnd - this.cum[s.number] + 1);
      segs.push({ surah: s.number, from, to });
      g = this.cum[s.number] + to;
      g++;
    }
    return segs;
  }

  /** Day (1-based) → verse segments. 30-day plans use real juz boundaries. */
  portion(day) {
    const days = this.plan.days;
    if (days === 30 && typeof JUZ_DATA !== 'undefined') {
      const j = JUZ_DATA[day - 1];
      return this.segments(this.gIndex(j.startSurah, j.startAyah), this.gIndex(j.endSurah, j.endAyah));
    }
    const per = this.totalVerses / days;
    const gStart = Math.round((day - 1) * per);
    const gEnd = Math.min(this.totalVerses - 1, Math.round(day * per) - 1);
    return this.segments(gStart, gEnd);
  }

  /** Number of verses in a day's portion. */
  portionVerses(day) {
    return this.portion(day).reduce((n, s) => n + (s.to - s.from + 1), 0);
  }

  segLabel(seg) {
    const name = (typeof getSurahName === 'function') ? getSurahName(seg.surah, this.language) : String(seg.surah);
    return `${name} ${seg.from}${seg.to > seg.from ? '–' + seg.to : ''}`;
  }
  segsToHash(segs) {
    return segs.map(s => s.from === s.to ? `${s.surah}:${s.from}` : `${s.surah}:${s.from}-${s.to}`).join(',');
  }

  /* ---------- progress analytics ---------- */

  /** First day (1-based) not yet marked done, or plan length if all done. */
  firstUnreadDay() {
    for (let d = 1; d <= this.plan.days; d++) if (!this.plan.done.includes(d)) return d;
    return this.plan.days;
  }

  /** Days that are due (1..currentDay) but not yet completed. */
  overdueDays() {
    const cur = this.currentDay();
    const out = [];
    for (let d = 1; d <= cur; d++) if (!this.plan.done.includes(d)) out.push(d);
    return out;
  }

  /** Total verses across all completed days. */
  versesRead() {
    return this.plan.done.reduce((n, d) => n + this.portionVerses(d), 0);
  }

  /** Consecutive calendar-day streak of completions, using doneAt timestamps. */
  streak() {
    const at = this.plan.doneAt || {};
    const DAY = 86400000;
    const set = new Set();
    Object.values(at).forEach(ts => { const d = new Date(ts); d.setHours(0, 0, 0, 0); set.add(d.getTime()); });
    if (!set.size) return 0;
    let today = new Date(); today.setHours(0, 0, 0, 0); today = today.getTime();
    let cursor;
    if (set.has(today)) cursor = today;
    else if (set.has(today - DAY)) cursor = today - DAY; // still alive: yesterday counts
    else return 0;
    let n = 0;
    while (set.has(cursor)) { n++; cursor -= DAY; }
    return n;
  }

  /** Projected finish date from the actual completion rate. */
  projectedFinish() {
    const p = this.plan, doneCount = p.done.length, DAY = 86400000;
    if (doneCount >= p.days) return { done: true };
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const elapsed = Math.max(1, Math.floor((today.getTime() - p.start) / DAY) + 1);
    const rate = doneCount / elapsed; // portions per elapsed day
    if (rate <= 0) return { date: null };
    const projDays = Math.ceil((p.days - doneCount) / rate);
    return { date: new Date(today.getTime() + projDays * DAY) };
  }

  fmtDate(d) {
    return d.toLocaleDateString(this.language, { day: 'numeric', month: 'short', year: 'numeric' });
  }

  /* ---------- navigation ---------- */

  /** Jump the Mushaf tab to the page holding the given surah's start. */
  openMushaf(surah) {
    let page = null;
    try { const m = JSON.parse(localStorage.getItem('surahPages')); if (m && m[surah]) page = m[surah]; } catch (e) { /* ignore */ }
    if (page && typeof mushafView !== 'undefined' && mushafView) mushafView.goTo(page);
    if (typeof tabSystem !== 'undefined' && tabSystem) tabSystem.switchTab('mushaf');
  }

  /** Explicit navigation to the Reading tab for a set of "s:a-b" refs. */
  openReading(refs) {
    if (typeof tabSystem !== 'undefined' && tabSystem) tabSystem.switchTab('reading');
    if (decodeURIComponent(window.location.hash.slice(1)) === refs) {
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    } else {
      window.location.hash = refs;
    }
  }

  onClick(e) {
    const start = e.target.closest('[data-kh-start]');
    if (start) {
      const v = start.getAttribute('data-kh-start');
      if (v === 'custom') {
        const inp = this.container.querySelector('#kh-custom');
        const n = inp ? parseInt(inp.value) : NaN;
        if (n >= 1) this.startPlan(n);
      } else if (v === 'pages') {
        const inp = this.container.querySelector('#kh-ppd');
        const ppd = inp ? parseInt(inp.value) : NaN;
        if (ppd >= 1) this.startPlan(Math.max(1, Math.round(604 / ppd)));
      } else this.startPlan(parseInt(v));
      return;
    }
    const day = e.target.closest('[data-kh-day]');
    if (day) { this.viewDay = parseInt(day.getAttribute('data-kh-day')); this.render(); return; }
    if (e.target.closest('[data-kh-resume]')) { this.viewDay = this.firstUnreadDay(); this.render(); return; }
    const mark = e.target.closest('[data-kh-done]');
    if (mark) {
      const d = parseInt(mark.getAttribute('data-kh-done'));
      const i = this.plan.done.indexOf(d);
      if (!this.plan.doneAt) this.plan.doneAt = {};
      if (i >= 0) { this.plan.done.splice(i, 1); delete this.plan.doneAt[d]; }
      else { this.plan.done.push(d); this.plan.doneAt[d] = Date.now(); }
      this.save();
      this.render();
      return;
    }
    const mushaf = e.target.closest('[data-kh-mushaf]');
    if (mushaf) { this.openMushaf(parseInt(mushaf.getAttribute('data-kh-mushaf'))); return; }
    const read = e.target.closest('[data-kh-read]');
    if (read) { this.openReading(read.getAttribute('data-kh-read')); return; }
    if (e.target.closest('[data-kh-restart]')) {
      if (!this.confirmRestart) { this.confirmRestart = true; this.render(); return; }
      this.plan = null;
      this.confirmRestart = false;
      try { localStorage.removeItem('khatmahPlan'); } catch (err) { /* ignore */ }
      this.render();
    }
  }

  header() {
    return `
      <div class="text-center mb-6">
        <p class="text-gray-500 dark:text-gray-400 text-sm">${this.tt('khatmah_subtitle')}</p>
      </div>`;
  }

  renderPicker() {
    const presets = [7, 15, 30, 60];
    const cards = presets.map(d => `
      <button data-kh-start="${d}" class="rounded-2xl p-5 text-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow hover:shadow-lg hover:-translate-y-0.5 transition-all">
        <div class="text-3xl font-extrabold text-primary dark:text-blue-400">${d}</div>
        <div class="text-sm font-medium mt-0.5">${this.tt('khatmah_days_label').replace('{n}', d)}</div>
        <div class="text-xs text-gray-400 mt-2">${this.tt('khatmah_pages_day').replace('{n}', Math.ceil(604 / d))}</div>
        <div class="text-xs text-gray-400">${this.tt('khatmah_verses_day').replace('{n}', Math.ceil(this.totalVerses / d))}</div>
        ${d === 30 ? `<div class="text-xs mt-2 px-2 py-0.5 rounded-full bg-primary/10 text-primary dark:text-blue-300 inline-block">${this.tt('khatmah_juz_aligned')}</div>` : ''}
      </button>`).join('');
    return `
      ${this.header()}
      <div class="w-full max-w-3xl mx-auto">
        <h3 class="text-sm uppercase tracking-wide font-semibold text-gray-400 dark:text-gray-500 mb-3 text-center">${this.tt('khatmah_choose')}</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">${cards}</div>
        <div class="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          <div class="flex items-center gap-2">
            <label for="kh-custom" class="text-sm text-gray-500 dark:text-gray-400">${this.tt('khatmah_custom')}</label>
            <input id="kh-custom" type="number" min="1" max="365" value="45"
                   class="w-24 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-center">
            <button data-kh-start="custom" class="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/80">${this.tt('khatmah_start')}</button>
          </div>
          <div class="flex items-center gap-2">
            <label for="kh-ppd" class="text-sm text-gray-500 dark:text-gray-400">${this.f('khatmah_or_pages')}</label>
            <input id="kh-ppd" type="number" min="1" max="604" value="4"
                   class="w-24 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-center">
            <button data-kh-start="pages" class="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/80">${this.tt('khatmah_start')}</button>
          </div>
        </div>
      </div>`;
  }

  statCard(label, value) {
    return `
      <div class="rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-3 py-2.5 text-center">
        <div class="text-lg font-bold text-primary dark:text-blue-400 leading-tight" dir="auto">${value}</div>
        <div class="text-[11px] text-gray-400 mt-0.5">${label}</div>
      </div>`;
  }

  renderPlan() {
    const p = this.plan;
    const cur = this.currentDay();
    const view = Math.max(1, Math.min(p.days, this.viewDay || cur));
    const doneCount = p.done.length;
    const pct = Math.round(doneCount / p.days * 100);
    const complete = doneCount >= p.days;

    // Pace: how many of the elapsed days are done
    const diff = doneCount - cur;
    let pace;
    if (complete) pace = `<span class="text-green-600 dark:text-green-400 font-semibold">🎉 ${this.tt('khatmah_completed')}</span>`;
    else if (diff >= 0) pace = `<span class="text-green-600 dark:text-green-400">✓ ${diff > 0 ? this.tt('khatmah_ahead').replace('{n}', diff) : this.tt('khatmah_on_track')}</span>`;
    else pace = `<span class="text-amber-600 dark:text-amber-400">${this.tt('khatmah_behind').replace('{n}', -diff)}</span>`;

    const finish = new Date(p.start + (p.days - 1) * 86400000);
    const finishStr = this.fmtDate(finish);

    // Stats: streak, verses read, projected finish
    const streak = this.streak();
    const vr = this.versesRead();
    const proj = this.projectedFinish();
    const projStr = proj.done ? this.f('khatmah_projected_done')
      : (proj.date ? this.fmtDate(proj.date) : this.f('khatmah_none'));
    const stats = `
      <div class="grid grid-cols-3 gap-2 mb-5">
        ${this.statCard(this.f('khatmah_stat_streak'), '🔥 ' + streak)}
        ${this.statCard(this.f('khatmah_stat_verses'), vr + ' / ' + this.totalVerses)}
        ${this.statCard(this.f('khatmah_stat_projected'), projStr)}
      </div>`;

    // Catch-up card when behind: bundle every overdue portion into one link
    let catchup = '';
    if (!complete && diff < 0) {
      const missed = this.overdueDays();
      const mSegs = [];
      missed.forEach(d => this.portion(d).forEach(s => mSegs.push(s)));
      const mRefs = this.segsToHash(mSegs);
      catchup = `
        <div class="rounded-2xl border border-amber-300 dark:border-amber-500/50 bg-amber-50 dark:bg-amber-900/20 p-4 mb-5">
          <div class="text-sm font-bold text-amber-700 dark:text-amber-300 mb-1">⏱️ ${this.f('khatmah_catchup_title')}</div>
          <div class="text-xs text-amber-700/90 dark:text-amber-200/90 mb-3">${this.f('khatmah_catchup_desc', { n: -diff })}</div>
          <div class="flex flex-wrap gap-2">
            <button data-kh-read="${mRefs}" class="px-4 py-2 rounded-lg bg-amber-500 text-white text-sm font-medium hover:bg-amber-600">📖 ${this.f('khatmah_catchup_read')}</button>
            <button data-kh-resume class="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-amber-300 dark:border-amber-500/50 text-amber-700 dark:text-amber-300 text-sm font-medium hover:bg-amber-100 dark:hover:bg-amber-900/40">↩️ ${this.f('khatmah_resume')}</button>
          </div>
        </div>`;
    }

    const segs = this.portion(view);
    const refs = this.segsToHash(segs);
    const isDone = p.done.includes(view);
    const firstSurah = segs.length ? segs[0].surah : 1;

    const chips = Array.from({ length: p.days }, (_, i) => {
      const d = i + 1;
      const done = p.done.includes(d);
      const isCur = d === cur;
      const isView = d === view;
      return `<button data-kh-day="${d}"
        class="w-9 h-9 rounded-lg text-xs font-semibold flex items-center justify-center transition-colors
               ${done ? 'bg-green-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}
               ${isCur ? 'ring-2 ring-primary dark:ring-blue-400' : ''}
               ${isView && !isCur ? 'ring-2 ring-gray-400/60' : ''}"
        title="${this.tt('khatmah_day').replace('{n}', d)}">${done ? '✓' : d}</button>`;
    }).join('');

    return `
      ${this.header()}
      <div class="w-full">
        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 mb-5">
          <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
            <span class="text-sm font-semibold">${this.tt('khatmah_progress').replace('{done}', doneCount).replace('{total}', p.days)}</span>
            <span class="text-sm">${pace}</span>
          </div>
          <div class="h-2.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
            <div class="h-full bg-gradient-to-r from-primary to-secondary transition-all" style="width:${pct}%"></div>
          </div>
          <div class="flex flex-wrap items-center justify-between gap-2 mt-2 text-xs text-gray-400">
            <span>${pct}%</span>
            <span>${this.tt('khatmah_finish').replace('{date}', finishStr)}</span>
          </div>
        </div>

        ${stats}

        ${catchup}

        <div class="rounded-2xl border ${view === cur ? 'border-amber-300 dark:border-amber-500/50 shadow-lg' : 'border-gray-200 dark:border-gray-700'} bg-white dark:bg-gray-800 p-4 mb-5">
          <div class="flex flex-wrap items-center gap-2 mb-2">
            <span class="text-sm font-bold">${view === cur ? '🌟 ' + this.tt('khatmah_today').replace('{n}', view) : this.tt('khatmah_day').replace('{n}', view)}</span>
            ${p.days === 30 ? `<span class="text-xs px-1.5 py-0.5 rounded-full bg-primary/10 text-primary dark:text-blue-300">${this.tt('juz')} ${view}</span>` : ''}
          </div>
          <div class="flex flex-wrap gap-1.5 mb-3" dir="auto">
            ${segs.map(s => `<span class="text-sm px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-700">${this.segLabel(s)}</span>`).join('')}
          </div>
          <div class="flex flex-wrap gap-2">
            <button data-kh-read="${refs}" class="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/80">📖 ${this.tt('khatmah_read')}</button>
            <button data-kh-mushaf="${firstSurah}" class="px-4 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-600">📕 ${this.f('khatmah_open_mushaf')}</button>
            <button data-kh-done="${view}" class="px-4 py-2 rounded-lg text-sm font-medium ${isDone ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'}">
              ${isDone ? '✓ ' : ''}${this.tt('khatmah_mark_done')}
            </button>
          </div>
        </div>

        <div class="flex flex-wrap gap-1.5 mb-6">${chips}</div>

        <div class="text-center">
          <button data-kh-restart class="text-xs px-3 py-1.5 rounded-lg ${this.confirmRestart ? 'bg-red-500 text-white' : 'text-gray-400 hover:text-red-500'}">
            ${this.confirmRestart ? this.tt('khatmah_restart_confirm') : this.tt('khatmah_restart')}
          </button>
        </div>
      </div>`;
  }

  render() {
    this.container.innerHTML = `<div class="w-full">${this.plan ? this.renderPlan() : this.renderPicker()}</div>`;
  }
}

let khatmah;
document.addEventListener('DOMContentLoaded', () => { khatmah = new Khatmah(); });
