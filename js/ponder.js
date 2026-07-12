/**
 * Ayah to Ponder (Tadabbur)
 * Shows a daily reflection card in the empty reading view: one curated
 * thought-provoking ayah (deterministic per day) with reflection prompts.
 * Disappears naturally once the user loads any verses.
 */

// Curated reflection-worthy ayahs (well-known tadabbur selections)
const PONDER_REFS = [
  '2:152', '2:155-157', '2:186', '2:216', '2:255', '2:286',
  '3:8', '3:26-27', '3:139', '3:159', '3:190-191',
  '4:110', '6:59', '6:162-163', '7:55-56', '8:2-4',
  '9:40', '9:51', '10:57', '12:86-87', '13:11', '13:28',
  '14:7', '16:18', '16:90', '16:96-97', '17:23-24',
  '18:109-110', '20:114', '21:35', '21:87', '23:115-116',
  '24:35', '25:63', '25:74', '26:88-89', '28:77', '29:2-3',
  '29:69', '30:21', '31:17-19', '39:53', '40:60', '42:36-38',
  '49:12-13', '50:16', '51:55-56', '53:39-42', '55:13',
  '57:22-23', '59:18-19', '65:2-3', '67:1-2', '87:14-17',
  '93:3-5', '94:5-6', '103:1-3'
];

class PonderCard {
  constructor() {
    this.container = document.getElementById('ayah-container');
    if (!this.container) return;

    this.language = (typeof appSettings !== 'undefined' && appSettings) ? appSettings.get('language') : 'en';
    this.offset = 0; // "another ayah" clicks shift off today's pick

    // Show only when nothing is being loaded via the URL hash
    if (!window.location.hash.slice(1)) this.render();

    window.addEventListener('settingChanged', (e) => {
      if (e.detail.key === 'language') {
        this.language = e.detail.value;
        if (this.isShowing()) this.render();
      }
    });

    this.container.addEventListener('click', (e) => {
      if (e.target.closest('#ponder-another')) {
        this.offset++;
        this.render();
      }
    });
  }

  isShowing() {
    return !!document.getElementById('ponder-card');
  }

  dayIndex() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const day = Math.floor((now - start) / 86400000);
    return (day + this.offset) % PONDER_REFS.length;
  }

  async render() {
    const lang = this.language;
    const ref = PONDER_REFS[this.dayIndex()];
    const m = ref.match(/(\d+):(\d+)(?:-(\d+))?/);
    const surah = parseInt(m[1]);
    const start = parseInt(m[2]);
    const end = m[3] ? parseInt(m[3]) : start;

    this.container.innerHTML = `
      <div id="ponder-card" class="max-w-3xl mx-auto mt-6 rounded-2xl overflow-hidden shadow-lg
                                   bg-gradient-to-br from-indigo-50 via-white to-emerald-50
                                   dark:from-gray-800 dark:via-gray-800 dark:to-gray-800
                                   border border-indigo-100 dark:border-gray-700">
        <div class="px-6 pt-5 pb-2 text-center">
          <div class="text-3xl mb-1">🌅</div>
          <h2 class="text-lg font-bold text-gray-800 dark:text-gray-100">${t('ponder_title', lang)}</h2>
        </div>
        <div id="ponder-body" class="px-6 pb-6 text-center">
          <p class="text-gray-400 py-6">${t('loading', lang)}</p>
        </div>
      </div>
    `;

    try {
      const verses = await QuranData.fetchRange(surah, start, end, lang);
      if (!this.isShowing() || !verses.length) return; // user loaded something meanwhile

      const arabic = verses.map(v => v.arabic).join(' ۝ ');
      const translation = verses.map(v => v.translation).join(' ');
      const name = verses[0].surahName;

      // Two rotating reflection prompts per day
      const prompts = [1, 2, 3, 4].map(i => t('ponder_q' + i, lang));
      const p1 = prompts[this.dayIndex() % 4];
      const p2 = prompts[(this.dayIndex() + 1) % 4];

      document.getElementById('ponder-body').innerHTML = `
        <div class="ayah-arabic !text-3xl !leading-loose mb-3" dir="rtl">${arabic}</div>
        <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-2" dir="auto">${translation}</p>
        <p class="text-sm text-gray-400 mb-5">— ${name} ${ref}</p>
        <div class="text-start max-w-xl mx-auto space-y-2 mb-6">
          <p class="flex gap-2 text-sm text-gray-600 dark:text-gray-300"><span>💭</span><span>${p1}</span></p>
          <p class="flex gap-2 text-sm text-gray-600 dark:text-gray-300"><span>💭</span><span>${p2}</span></p>
        </div>
        <div class="flex flex-wrap justify-center gap-3">
          <button onclick="window.location.hash='${ref}'"
                  class="px-5 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/80">
            ${t('open_verse', lang)} →
          </button>
          <button id="ponder-another"
                  class="px-5 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
            🎲 ${t('ponder_another', lang)}
          </button>
        </div>
      `;
    } catch (err) {
      const body = document.getElementById('ponder-body');
      if (body) body.innerHTML = `<p class="text-gray-400 py-4">${t('error', lang)}</p>`;
    }
  }
}

// Initialize when DOM is ready
let ponderCard;
document.addEventListener('DOMContentLoaded', () => {
  ponderCard = new PonderCard();
});
