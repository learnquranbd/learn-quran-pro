/**
 * Learn Hub
 * Landing view of the Learn tab: choose between the Kids Qaida module,
 * the Vocabulary trainer, or jump to the Memorization checker.
 * Modules render themselves into #learn-kids-root / #learn-vocab-root
 * when they receive the 'learnModuleSelected' event.
 */

class LearnHub {
  constructor() {
    this.hub = document.getElementById('learn-hub');
    if (!this.hub) return;

    this.roots = {
      kids: document.getElementById('learn-kids-root'),
      vocab: document.getElementById('learn-vocab-root'),
      names: document.getElementById('learn-names-root'),
      handwriting: document.getElementById('handwriting-root')
    };
    this.backBar = document.getElementById('learn-back');
    this.language = (typeof appSettings !== 'undefined' && appSettings) ? appSettings.get('language') : 'en';

    this.render();

    window.addEventListener('settingChanged', (e) => {
      if (e.detail.key === 'language') {
        this.language = e.detail.value;
        this.render();
      }
    });

    // External requests to open a module (e.g. sidebar "Quranic Words")
    window.addEventListener('learnModuleSelected', (e) => {
      if (this.roots[e.detail.module]) this.showModule(e.detail.module, false);
    });

    this.backBar.querySelector('button').addEventListener('click', () => this.showHub());
  }

  render() {
    const lang = this.language;
    const cards = [
      { module: 'kids', emoji: '🧒', grad: 'from-amber-400 to-orange-500', title: 'learn_kids_title', desc: 'learn_kids_desc' },
      { module: 'vocab', emoji: '📚', grad: 'from-sky-400 to-blue-600', title: 'learn_vocab_title', desc: 'learn_vocab_desc' },
      { module: 'names', emoji: '✨', grad: 'from-violet-400 to-purple-600', title: 'learn_names_title', desc: 'learn_names_desc' },
      { module: 'handwriting', emoji: '✍️', grad: 'from-rose-400 to-pink-600', title: 'hw_title', desc: 'hw_subtitle' },
      { module: 'memorize', emoji: '🎙️', grad: 'from-emerald-400 to-green-600', title: 'learn_memorize_title', desc: 'learn_memorize_desc' }
    ];

    this.hub.innerHTML = `
      <div class="text-center mb-8">
        <h2 class="text-2xl font-bold mb-1">${t('learn_hub_title', lang)}</h2>
        <p class="text-gray-500 dark:text-gray-400">${t('learn_hub_subtitle', lang)}</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
        ${cards.map(c => `
          <button data-module="${c.module}"
                  class="learn-card group text-left rounded-2xl shadow-lg overflow-hidden bg-white dark:bg-gray-800
                         hover:shadow-2xl hover:-translate-y-1 transition-all duration-200">
            <div class="h-28 bg-gradient-to-br ${c.grad} flex items-center justify-center text-6xl">${c.emoji}</div>
            <div class="p-4">
              <h3 class="font-bold mb-1">${t(c.title, lang)}</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">${t(c.desc, lang)}</p>
            </div>
          </button>
        `).join('')}
      </div>
      ${this.resourcesHtml(lang)}
    `;

    this.hub.querySelectorAll('.learn-card').forEach(card => {
      card.addEventListener('click', () => {
        const module = card.getAttribute('data-module');
        if (module === 'memorize') {
          tabSystem.switchTab('memorize');
        } else {
          this.showModule(module, true);
        }
      });
    });

    this.backBar.querySelector('button').innerHTML = `← ${t('back', lang)}`;
  }

  /** Curated external learning resources (reputable, free) */
  resourcesHtml(lang) {
    const RESOURCES = [
      { name: 'Quran.com', url: 'https://quran.com', emoji: '📖', desc: 'res_read_study' },
      { name: 'Corpus.Quran.com', url: 'https://corpus.quran.com', emoji: '🏛️', desc: 'res_grammar_corpus' },
      { name: 'QuranWBW.com', url: 'https://quranwbw.com', emoji: '🔤', desc: 'res_wbw_reader' },
      { name: 'Tanzil.net', url: 'https://tanzil.net', emoji: '📜', desc: 'res_text_downloads' },
      { name: 'QuranicAudio.com', url: 'https://quranicaudio.com', emoji: '🎧', desc: 'res_recitations' },
      { name: 'EveryAyah.com', url: 'https://everyayah.com', emoji: '🔁', desc: 'res_ayah_audio' },
      { name: 'Tarteel.ai', url: 'https://tarteel.ai', emoji: '🎙️', desc: 'res_ai_memorization' },
      { name: 'QuranReflect.com', url: 'https://quranreflect.com', emoji: '💭', desc: 'res_reflections' }
    ];
    return `
      <div class="max-w-5xl mx-auto mt-10">
        <h3 class="text-sm uppercase font-semibold text-gray-400 dark:text-gray-500 mb-3 text-center">🌐 ${t('resources_title', lang)}</h3>
        <div class="flex flex-wrap justify-center gap-2">
          ${RESOURCES.map(r => `
            <a href="${r.url}" target="_blank" rel="noopener"
               class="flex items-center gap-2 px-3 py-2 rounded-xl bg-white dark:bg-gray-800 shadow border border-gray-100 dark:border-gray-700
                      hover:shadow-md hover:-translate-y-0.5 transition-all text-sm">
              <span>${r.emoji}</span>
              <span class="font-medium text-gray-800 dark:text-gray-100">${r.name}</span>
              <span class="text-xs text-gray-400">${t(r.desc, lang)}</span>
            </a>`).join('')}
        </div>
      </div>
    `;
  }

  showModule(module, dispatch) {
    this.hub.classList.add('hidden');
    this.backBar.classList.remove('hidden');
    Object.entries(this.roots).forEach(([name, root]) => {
      root.classList.toggle('hidden', name !== module);
    });
    if (dispatch !== false) {
      window.dispatchEvent(new CustomEvent('learnModuleSelected', { detail: { module } }));
    }
  }

  showHub() {
    this.hub.classList.remove('hidden');
    this.backBar.classList.add('hidden');
    Object.values(this.roots).forEach(root => root.classList.add('hidden'));
  }
}

// Initialize when DOM is ready
let learnHub;
document.addEventListener('DOMContentLoaded', () => {
  learnHub = new LearnHub();
});
