/**
 * Daily Amal (আমল) — sunnah recitations for the right time & day.
 *
 * Surfaces what to recite NOW (night / morning / evening / Friday) with the
 * hadith source for each practice, honestly graded: 'sahih' (authentic chain)
 * vs 'common' (widely practised, narration weak or general). "Read" loads the
 * passage into the Reading tab (explicit navigation).
 *
 * Renders into #amal-container (tab "amal").
 */

const AMAL_ITEMS = [
  { id: 'mulk', refs: '67:1-30', surahs: [67], when: ['night'],
    src: 'Tirmidhi 2891', grade: 'sahih',
    en: 'Recite Al-Mulk every night — it intercedes until its reciter is forgiven, and protects from the punishment of the grave.',
    bn: 'প্রতি রাতে সূরা মুলক পড়ুন — এটি সুপারিশ করবে যতক্ষণ না পাঠকারীকে ক্ষমা করা হয়, এবং কবরের আযাব থেকে রক্ষা করে।' },
  { id: 'sajdah', refs: '32:1-30', surahs: [32], when: ['night'],
    src: 'Tirmidhi 3404', grade: 'sahih',
    en: 'The Prophet ﷺ would not sleep until he recited As-Sajdah and Al-Mulk.',
    bn: 'নবী ﷺ সূরা সাজদাহ ও সূরা মুলক না পড়ে ঘুমাতেন না।' },
  { id: 'kursi', refs: '2:255', surahs: [2], when: ['night', 'any'],
    src: 'Bukhari 2311', grade: 'sahih',
    en: 'Ayat al-Kursi before sleep — a guardian from Allah remains with you and Shaytan cannot approach until morning. Also after every prayer.',
    bn: 'ঘুমানোর আগে আয়াতুল কুরসি — আল্লাহর পক্ষ থেকে একজন রক্ষী থাকবে, সকাল পর্যন্ত শয়তান কাছে আসতে পারবে না। প্রতি নামাজের পরেও।' },
  { id: 'baqarah-end', refs: '2:285-286', surahs: [2], when: ['night'],
    src: 'Bukhari 5009', grade: 'sahih',
    en: 'Whoever recites the last two verses of Al-Baqarah at night, they will suffice him.',
    bn: 'যে রাতে সূরা বাকারার শেষ দুই আয়াত পড়বে, তা তার জন্য যথেষ্ট হবে।' },
  { id: 'quls', refs: '112:1-4,113:1-5,114:1-6', surahs: [112, 113, 114], when: ['morning', 'evening', 'night'],
    src: 'Abu Dawud 5082 · Bukhari 5017', grade: 'sahih',
    en: 'The three Quls — three times morning and evening suffice you against everything; the Prophet ﷺ also recited them into his palms before sleep.',
    bn: 'তিন কুল — সকাল-সন্ধ্যায় তিনবার সবকিছু থেকে যথেষ্ট; নবী ﷺ ঘুমানোর আগে হাতের তালুতে পড়ে শরীর মাসাহ করতেন।' },
  { id: 'kafirun', refs: '109:1-6', surahs: [109], when: ['night'],
    src: 'Abu Dawud 5055', grade: 'sahih',
    en: 'Recite Al-Kafirun before sleeping — it is a disavowal of shirk.',
    bn: 'ঘুমানোর আগে সূরা কাফিরুন পড়ুন — এটি শিরক থেকে মুক্তির ঘোষণা।' },
  { id: 'kahf', refs: '18:1-110', surahs: [18], when: ['friday'],
    src: 'al-Hakim 2/399 (sahih)', grade: 'sahih',
    en: 'Recite Al-Kahf on Friday — a light shines for you between the two Fridays.',
    bn: 'জুমার দিনে সূরা কাহফ পড়ুন — দুই জুমার মধ্যবর্তী সময় আলোয় আলোকিত হবে।' },
  { id: 'kahf10', refs: '18:1-10', surahs: [18], when: ['any'],
    src: 'Muslim 809', grade: 'sahih',
    en: 'Memorize the first ten verses of Al-Kahf — protection from the Dajjal.',
    bn: 'সূরা কাহফের প্রথম দশ আয়াত মুখস্থ করুন — দাজ্জাল থেকে সুরক্ষা।' },
  { id: 'friday-fajr', refs: '32:1-30,76:1-31', surahs: [32, 76], when: ['friday', 'morning'],
    src: 'Bukhari 891', grade: 'sahih',
    en: 'On Friday Fajr the Prophet ﷺ would recite As-Sajdah and Al-Insan.',
    bn: 'জুমার ফজরে নবী ﷺ সূরা সাজদাহ ও সূরা ইনসান তিলাওয়াত করতেন।' },
  { id: 'yasin', refs: '36:1-83', surahs: [36], when: ['morning'],
    src: '—', grade: 'common',
    en: 'Ya-Sin in the morning is a widespread practice; the specific narrations about it are weak, but reciting Quran any time is rewarded.',
    bn: 'সকালে সূরা ইয়াসিন পড়া প্রচলিত আমল; এ বিষয়ের নির্দিষ্ট বর্ণনাগুলো দুর্বল, তবে যেকোনো সময় কুরআন তিলাওয়াতই সওয়াবের।' },
  { id: 'waqiah', refs: '56:1-96', surahs: [56], when: ['night'],
    src: '—', grade: 'common',
    en: "Al-Waqi'ah at night (against poverty) is widely practised; the narration is weak, but the recitation itself is virtuous.",
    bn: 'রাতে সূরা ওয়াকিয়া (অভাব থেকে বাঁচতে) বহুল প্রচলিত; বর্ণনাটি দুর্বল, তবে তিলাওয়াত নিজেই ফজিলতপূর্ণ।' },
  { id: 'rahman', refs: '55:1-78', surahs: [55], when: ['any'],
    src: '—', grade: 'common',
    en: 'Ar-Rahman — "the bride of the Quran" is a weak narration, but it is beloved to recite and ponder often.',
    bn: 'সূরা আর-রাহমান — "কুরআনের দুলহান" বর্ণনাটি দুর্বল, তবে প্রায়ই তিলাওয়াত ও তাদাব্বুর করা উত্তম।' },
];

class AmalDaily {
  constructor() {
    this.container = document.getElementById('amal-container');
    if (!this.container) return;
    this.language = (typeof appSettings !== 'undefined' && appSettings) ? appSettings.get('language') : 'en';

    window.addEventListener('tabChanged', (e) => { if (e.detail.tabId === 'amal') this.render(); });
    window.addEventListener('settingChanged', (e) => {
      if (e.detail.key === 'language') { this.language = e.detail.value; if (this.container.innerHTML) this.render(); }
    });
    this.container.addEventListener('click', (e) => {
      const read = e.target.closest('[data-amal-read]');
      if (read) {
        this.stopAudio();
        // Explicit navigation: load the passage in the Reading tab
        if (typeof tabSystem !== 'undefined' && tabSystem) tabSystem.switchTab('reading');
        const refs = read.getAttribute('data-amal-read');
        if (decodeURIComponent(window.location.hash.slice(1)) === refs) {
          window.dispatchEvent(new HashChangeEvent('hashchange'));
        } else {
          window.location.hash = refs;
        }
        return;
      }
      const prev = e.target.closest('[data-amal-preview]');
      if (prev && typeof ayahModal !== 'undefined' && ayahModal) {
        ayahModal.open(prev.getAttribute('data-amal-preview'));
        return;
      }
      const listen = e.target.closest('[data-amal-listen]');
      if (listen) this.toggleListen(listen);
    });
    window.addEventListener('tabChanged', (e) => { if (e.detail.tabId !== 'amal') this.stopAudio(); });
  }

  tt(key) { return t(key, this.language); }
  desc(item) { return item[this.language] || item.en; }

  /** Link a hadith citation to sunnah.com so users can verify the source. */
  srcHtml(src) {
    const M = { 'Bukhari': 'bukhari', 'Muslim': 'muslim', 'Tirmidhi': 'tirmidhi', 'Abu Dawud': 'abudawud' };
    const parts = src.split('·').map(x => x.trim());
    return parts.map(part => {
      const m = part.match(/^(Bukhari|Muslim|Tirmidhi|Abu Dawud)\s+(\d+)$/);
      if (m) return `<a href="https://sunnah.com/${M[m[1]]}:${m[2]}" target="_blank" rel="noopener" class="underline decoration-dotted hover:text-primary">${this.esc(part)}</a>`;
      return this.esc(part);
    }).join(' · ');
  }

  /** Current period of the local day. */
  period() {
    const h = new Date().getHours();
    if (h >= 4 && h < 11) return 'morning';
    if (h >= 11 && h < 17) return 'day';
    if (h >= 17 && h < 20) return 'evening';
    return 'night';
  }
  /**
   * The night of Jumu'ah begins at Thursday sunset, so Kahf & co. surface
   * from Thursday evening through Friday.
   */
  isFriday() {
    const d = new Date();
    return d.getDay() === 5 || (d.getDay() === 4 && d.getHours() >= 17);
  }

  /** Items recommended right now ('any' items always apply). */
  nowItems() {
    const p = this.period();
    const fri = this.isFriday();
    return AMAL_ITEMS.filter(it =>
      it.when.includes(p) || it.when.includes('any') || (fri && it.when.includes('friday')));
  }

  /** Expand '2:255,112:1-4' into ['2:255','112:1',...]. */
  expandRefs(refs) {
    const out = [];
    refs.split(',').forEach(part => {
      const m = part.trim().match(/^(\d+):(\d+)(?:-(\d+))?$/);
      if (!m) return;
      const s = +m[1], from = +m[2], to = m[3] ? +m[3] : from;
      for (let a = from; a <= to; a++) out.push(`${s}:${a}`);
    });
    return out;
  }

  stopAudio() {
    this._playQueue = null;
    if (this._audio) { try { this._audio.pause(); } catch (e) { /* ignore */ } }
    if (this._playBtn) { this._playBtn.innerHTML = this._playBtn.getAttribute('data-idle'); this._playBtn = null; }
  }

  /** Play a short passage ayah-by-ayah (everyayah.com), toggling on second tap. */
  toggleListen(btn) {
    if (this._playBtn === btn) { this.stopAudio(); return; }
    this.stopAudio();
    const list = this.expandRefs(btn.getAttribute('data-amal-listen'));
    if (!list.length) return;
    this._playBtn = btn;
    if (!btn.getAttribute('data-idle')) btn.setAttribute('data-idle', btn.innerHTML);
    btn.innerHTML = '⏸ ' + this.tt('amal_listen');
    if (!this._audio) {
      this._audio = new Audio();
      this._audio.addEventListener('ended', () => this._advance());
      this._audio.addEventListener('error', () => this._advance());
    }
    this._playQueue = list.slice();
    this._advance();
  }

  _advance() {
    if (!this._playQueue || !this._playQueue.length) { this.stopAudio(); return; }
    const [s, a] = this._playQueue.shift().split(':').map(Number);
    const pad = n => String(n).padStart(3, '0');
    this._audio.src = `https://everyayah.com/data/Alafasy_128kbps/${pad(s)}${pad(a)}.mp3`;
    this._audio.play().catch(() => this.stopAudio());
  }

  surahNames(item) {
    return item.surahs.map(n => (typeof getSurahName === 'function' ? getSurahName(n, this.language) : String(n))).join(' + ');
  }

  card(item, highlight) {
    const allRefs = this.expandRefs(item.refs);
    const ayahCount = allRefs.length;
    const firstRef = allRefs[0] || item.refs.split(',')[0];
    const gradeBadge = item.grade === 'sahih'
      ? `<span class="text-xs px-1.5 py-0.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-300">✓ ${this.tt('amal_grade_sahih')}</span>`
      : `<span class="text-xs px-1.5 py-0.5 rounded-full bg-gray-400/10 text-gray-500 dark:text-gray-400">${this.tt('amal_grade_common')}</span>`;
    const whenBadges = item.when.map(w => `<span class="text-xs px-1.5 py-0.5 rounded-full bg-primary/10 text-primary dark:text-blue-300">${this.tt('amal_when_' + w)}</span>`).join(' ');
    return `
      <div class="rounded-2xl bg-white dark:bg-gray-800 border ${highlight ? 'border-amber-300 dark:border-amber-500/50 shadow-lg' : 'border-gray-200 dark:border-gray-700'} p-4 flex flex-col gap-2">
        <div class="flex items-start justify-between gap-2">
          <div class="font-bold text-gray-800 dark:text-gray-100" dir="auto">${this.esc(this.surahNames(item))}</div>
          <span class="shrink-0 text-xs font-mono text-gray-400">${item.refs.split(',')[0]}${item.refs.includes(',') ? ' +' : ''}</span>
        </div>
        <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed" dir="auto">${this.esc(this.desc(item))}</p>
        <div class="flex flex-wrap items-center gap-1.5">${whenBadges} ${gradeBadge}
          ${item.src !== '—' ? `<span class="text-xs text-gray-400">📖 ${this.srcHtml(item.src)}</span>` : ''}
        </div>
        <div class="flex flex-wrap gap-2 mt-1">
          <button data-amal-read="${item.refs}" class="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/80">📖 ${this.tt('amal_read')}</button>
          ${ayahCount <= 19 ? `<button data-amal-listen="${item.refs}" class="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600">🔊 ${this.tt('amal_listen')}</button>` : ''}
          ${ayahCount <= 3 ? `<button data-amal-preview="${firstRef}" class="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600">👁 ${this.tt('amal_preview')}</button>` : ''}
        </div>
      </div>`;
  }

  render() {
    this.stopAudio();
    const now = this.nowItems();
    const nowIds = new Set(now.map(i => i.id));
    const rest = AMAL_ITEMS.filter(i => !nowIds.has(i.id));
    const periodLabel = this.tt('amal_when_' + this.period()) + (this.isFriday() ? ' · ' + this.tt('amal_when_friday') : '');
    this.container.innerHTML = `
      <div class="w-full">
        <div class="text-center mb-6">
          <h2 class="text-2xl font-bold mb-1">📿 ${this.tt('amal_title')}</h2>
          <p class="text-gray-500 dark:text-gray-400 text-sm">${this.tt('amal_subtitle')}</p>
        </div>
        <div class="mb-8">
          <h3 class="text-sm uppercase tracking-wide font-semibold text-amber-600 dark:text-amber-400 mb-3">🌟 ${this.tt('amal_now')} — ${periodLabel}</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            ${now.map(i => this.card(i, true)).join('')}
          </div>
        </div>
        <div>
          <h3 class="text-sm uppercase tracking-wide font-semibold text-gray-400 dark:text-gray-500 mb-3">${this.tt('amal_all')}</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            ${rest.map(i => this.card(i, false)).join('')}
          </div>
        </div>
        <p class="text-xs text-gray-400 mt-6 text-center">${this.tt('amal_note')}</p>
      </div>`;
  }

  esc(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
}

let amalDaily;
document.addEventListener('DOMContentLoaded', () => { amalDaily = new AmalDaily(); });
