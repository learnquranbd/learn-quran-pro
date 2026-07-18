class HajjModule {
  constructor() {
    this.root = document.getElementById('hajj-root');
    if (!this.root) return;
    this.language = (typeof appSettings !== 'undefined' && appSettings) ? appSettings.get('language') : 'en';
    this.rendered = false;

    window.addEventListener('tabChanged', (e) => {
      try { if (e && e.detail && e.detail.tabId === 'hajj') this.render(); } catch (_) { }
    });
    window.addEventListener('settingChanged', (e) => {
      try {
        if (e && e.detail && e.detail.key === 'language') {
          this.language = e.detail.value || 'en';
          if (this.rendered) this.render();
        }
      } catch (_) { }
    });

    this.root.addEventListener('click', (e) => this.handleClick(e));
  }

  tt(key) { return typeof t === 'function' ? t(key, this.language) : key; }

  lc(o) {
    if (!o) return '';
    const lang = this.language;
    if (lang && o[lang]) return o[lang];
    if (lang === 'bn') return o.bn || o.en || '';
    if (lang && lang !== 'en' && typeof CI18N !== 'undefined') {
      const tr = CI18N.tr(lang, o.en);
      if (tr) return tr;
    }
    return o.en || o.bn || '';
  }

  esc(s) {
    if (typeof s !== 'string') return '';
    const d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  render() {
    this.rendered = true;
    const L = (o) => this.lc(o);
    const T = (k) => this.tt(k);

    this.root.innerHTML = `
      <div class="max-w-3xl mx-auto space-y-6 py-4">
        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div class="p-6 bg-gradient-to-br from-emerald-50 to-transparent dark:from-emerald-900/10">
            <div class="text-4xl mb-2" aria-hidden="true">🕋</div>
            <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100">${T('learn_hajj_title')}</h2>
            <p class="text-gray-500 dark:text-gray-400 mt-1 text-sm">${L({ en: 'Pilgrimage to Makkah — one of the five pillars of Islam.', bn: 'মক্কায় হজ — ইসলামের পঞ্চস্তম্ভের একটি।' })}</p>
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">📖 ${T('learn_hajj_title')} ${L({ en: 'in the Quran', bn: 'কুরআনে' })}</h3>
          <div class="space-y-3">
            <div class="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/40">
              <p class="text-sm text-emerald-800 dark:text-emerald-200 leading-relaxed" dir="auto">${L({ en: '"Indeed, the first House [of worship] established for mankind was that at Bakkah [Makkah] — blessed and a guidance for the worlds. In it are clear signs [such as] the standing place of Abraham. And whoever enters it shall be safe. And [due] to Allah from the people is a pilgrimage to the House — for whoever is able to find a way there."', bn: '"নিশ্চয়ই প্রথম ঘর যা মানুষের জন্য প্রতিষ্ঠিত হয়েছে তা হলো বাক্কায় (মক্কা) — বরকতময় ও সারা বিশ্বের জন্য হিদায়াত। সেখানে রয়েছে সুস্পষ্ট নিদর্শনসমূহ, মাকামে ইবরাহীম। আর যে তাতে প্রবেশ করে সে নিরাপদ। আর মানুষের উপর আল্লাহর জন্য এই ঘরের হজ করা ফরয, যে সেখানে পৌঁছার সামর্থ্য রাখে।"' })}</p>
              <button type="button" data-hajj-ayah="3:96-97" class="mt-2 inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-xs font-medium hover:bg-emerald-500 hover:text-white transition-colors">📖 3:96-97 ${L({ en: 'Read', bn: 'পড়ুন' })}</button>
            </div>
            <div class="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/40">
              <p class="text-sm text-emerald-800 dark:text-emerald-200 leading-relaxed" dir="auto">${L({ en: '"And complete the Hajj and Umrah for Allah."', bn: '"আর তোমরা আল্লাহর জন্য হজ ও উমরা পূর্ণ কর।"' })}</p>
              <button type="button" data-hajj-ayah="2:196" class="mt-2 inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-xs font-medium hover:bg-emerald-500 hover:text-white transition-colors">📖 2:196 ${L({ en: 'Read', bn: 'পড়ুন' })}</button>
            </div>
            <div class="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/40">
              <p class="text-sm text-emerald-800 dark:text-emerald-200 leading-relaxed" dir="auto">${L({ en: '"Hajj is [during] well-known months. So whoever has made Hajj obligatory upon himself therein, there is [to be for him] no sexual relations and no disobedience and no disputing during Hajj."', bn: '"হজ নির্ধারিত মাসসমূহে। অতএব যে তাতে হজ ফরয করে নেয়, তার জন্য হজে স্ত্রীসঙ্গম, পাপকার্য ও ঝগড়া-বিবাদ বৈধ নয়।"' })}</p>
              <button type="button" data-hajj-ayah="2:197" class="mt-2 inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-xs font-medium hover:bg-emerald-500 hover:text-white transition-colors">📖 2:197 ${L({ en: 'Read', bn: 'পড়ুন' })}</button>
            </div>
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">💡 ${L({ en: 'Key Rulings', bn: 'প্রধান বিধান' })}</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40">
              <div class="text-sm font-semibold text-gray-700 dark:text-gray-200">${L({ en: 'Who must perform Hajj', bn: 'কারা হজ করবেন' })}</div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1" dir="auto">${L({ en: 'Every adult, sane Muslim who has the physical and financial ability, once in a lifetime.', bn: 'প্রত্যেক প্রাপ্তবয়স্ক, সুস্থ বিবেকসম্পন্ন মুসলিম যার শারীরিক ও আর্থিক সামর্থ্য আছে, জীবনে একবার।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40">
              <div class="text-sm font-semibold text-gray-700 dark:text-gray-200">${L({ en: 'Pillars of Hajj', bn: 'হজের রুকন' })}</div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1" dir="auto">${L({ en: 'Ihram, standing at Arafah (Wuquf), Tawaf al-Ifadah, Sa\'i between Safa and Marwah.', bn: 'ইহরাম, আরাফায় অবস্থান (উকুফ), তাওয়াফে ইফাদা, সাফা-মারওয়ায় সাঈ।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40">
              <div class="text-sm font-semibold text-gray-700 dark:text-gray-200">${L({ en: 'Timing', bn: 'সময়' })}</div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1" dir="auto">${L({ en: '8th-13th of Dhul-Hijjah (the 12th Islamic month). Arafah is on the 9th.', bn: '৮-১৩ জিলহজ (১২তম চান্দ্র মাস)। আরাফা ৯ তারিখে।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40">
              <div class="text-sm font-semibold text-gray-700 dark:text-gray-200">${L({ en: 'Types of Hajj', bn: 'হজের প্রকার' })}</div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1" dir="auto">${L({ en: 'Ifrad (Hajj only), Tamattu\' (Umrah + Hajj with break), Qiran (Umrah + Hajj combined).', bn: 'ইফরাদ (শুধু হজ), তামাত্তু (উমরা + হজ বিরতি সহ), কিরান (উমরা + হজ একত্রে)।' })}</p>
            </div>
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">🌸 ${L({ en: 'Spiritual Significance', bn: 'আধ্যাত্মিক তাৎপর্য' })}</h3>
          <ul class="space-y-2">
            <li class="flex gap-2 text-sm text-gray-600 dark:text-gray-300" dir="auto"><span class="text-green-500 shrink-0">✓</span> ${L({ en: 'A symbol of unity — Muslims from all over the world gather as one', bn: 'ঐক্যের প্রতীক — সারা বিশ্বের মুসলিমরা একত্র হয়' })}</li>
            <li class="flex gap-2 text-sm text-gray-600 dark:text-gray-300" dir="auto"><span class="text-green-500 shrink-0">✓</span> ${L({ en: 'Complete forgiveness of sins — the Prophet ﷺ said: "An accepted Hajj has no reward but Paradise"', bn: 'গুনাহের পূর্ণ ক্ষমা — নবী ﷺ বলেছেন: "হজে মাবরুরের বিনিময় জান্নাত ছাড়া আর কিছু নয়"' })}</li>
            <li class="flex gap-2 text-sm text-gray-600 dark:text-gray-300" dir="auto"><span class="text-green-500 shrink-0">✓</span> ${L({ en: 'Follows the tradition of Ibrahim and Ismail (AS) — 22:26-27', bn: 'ইবরাহীম ও ইসমাঈল (আঃ)-এর ঐতিহ্যের অনুসরণ — ২২:২৬-২৭' })}</li>
            <li class="flex gap-2 text-sm text-gray-600 dark:text-gray-300" dir="auto"><span class="text-green-500 shrink-0">✓</span> ${L({ en: 'Reminds of the Day of Judgment — the gathering at Arafah', bn: 'কিয়ামতের স্মরণ করিয়ে দেয় — আরাফার সমাবেশ' })}</li>
          </ul>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">📚 ${L({ en: 'More Quranic References', bn: 'আরও কুরআনি রেফারেন্স' })}</h3>
          <div class="flex flex-wrap gap-2">
            <button type="button" data-hajj-ayah="2:198" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary hover:text-white transition-colors">📖 2:198</button>
            <button type="button" data-hajj-ayah="2:199" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary hover:text-white transition-colors">📖 2:199</button>
            <button type="button" data-hajj-ayah="22:26" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary hover:text-white transition-colors">📖 22:26</button>
            <button type="button" data-hajj-ayah="22:27" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary hover:text-white transition-colors">📖 22:27</button>
            <button type="button" data-hajj-ayah="22:28" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary hover:text-white transition-colors">📖 22:28</button>
            <button type="button" data-hajj-ayah="22:29" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary hover:text-white transition-colors">📖 22:29</button>
            <button type="button" data-hajj-ayah="22:30" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary hover:text-white transition-colors">📖 22:30</button>
            <button type="button" data-hajj-ayah="5:2" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary hover:text-white transition-colors">📖 5:2</button>
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">📿 ${T('learn_hajj_talbiyah') || L({ en: 'Talbiyah', bn: 'তালবিয়া' })}</h3>
          <div class="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/40">
            <p class="text-lg text-emerald-800 dark:text-emerald-200 leading-relaxed text-center" dir="rtl">لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ</p>
            <p class="text-sm text-emerald-700 dark:text-emerald-300 mt-2 italic text-center">Labbayka Allāhumma labbayk, labbayka lā sharīka laka labbayk, inna al-ḥamda wan-ni'mata laka wal-mulk, lā sharīka laka.</p>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center" dir="auto">${L({ en: '"Here I am, O Allah, here I am. Here I am, You have no partner, here I am. Indeed, all praise, grace, and sovereignty belong to You. You have no partner."', bn: '"আমি উপস্থিত, হে আল্লাহ, আমি উপস্থিত। আপনার কোনো শরীক নেই, আমি উপস্থিত। নিশ্চয়ই সমস্ত প্রশংসা, অনুগ্রহ ও রাজত্ব আপনারই। আপনার কোনো শরীক নেই।"' })}</p>
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">🗓️ ${L({ en: 'Step-by-Step Hajj Rituals (Day by Day)', bn: 'ধাপে ধাপে হজের অনুষ্ঠান (দিন অনুযায়ী)' })}</h3>
          <div class="space-y-3">
            <div class="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40">
              <div class="text-sm font-semibold text-gray-700 dark:text-gray-200">${L({ en: '8th Dhul-Hijjah (Yawm at-Tarwiyah)', bn: '৮ জিলহজ (ইয়াওমুত তারবিয়া)' })}</div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1" dir="auto">${L({ en: 'Enter Ihram, recite Talbiyah, and proceed to Mina. Spend the day and night in Mina, performing prayers shortened.', bn: 'ইহরাম বাঁধুন, তালবিয়া পড়ুন এবং মিনায় যান। মিনায় দিন ও রাত কাটান, সংক্ষিপ্ত নামাজ পড়ুন।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40">
              <div class="text-sm font-semibold text-gray-700 dark:text-gray-200">${L({ en: '9th Dhul-Hijjah (Yawm Arafah)', bn: '৯ জিলহজ (ইয়াওমে আরাফা)' })}</div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1" dir="auto">${L({ en: 'After sunrise, proceed to Arafah. Stand in prayer and supplication (Wuquf) until sunset. This is the most essential part of Hajj.', bn: 'সূর্যোদয়ের পর আরাফার দিকে রওনা হন। সূর্যাস্ত পর্যন্ত দোয়া ও ইবাদতে অবস্থান করুন (উকুফ)। এটাই হজের সবচেয়ে গুরুত্বপূর্ণ অংশ।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40">
              <div class="text-sm font-semibold text-gray-700 dark:text-gray-200">${L({ en: '10th Dhul-Hijjah (Yawm an-Nahr)', bn: '১০ জিলহজ (ইয়াওমুন নাহর)' })}</div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1" dir="auto">${L({ en: 'After Fajr, proceed to Muzdalifah. Collect pebbles, then go to Mina. Stoning of Jamarat al-Aqabah (7 pebbles). Sacrifice an animal (Qurbani). Shave or trim hair (Halaq/Taqsir).', bn: 'ফজরের পর মুজদালিফায় যান। পাথর সংগ্রহ করুন, তারপর মিনায় যান। জামারায়ে আকাবায় পাথর নিক্ষেপ (৭টি)। পশু কুরবানি করুন। মাথা মুণ্ডন বা চুল ছাঁটুন (হালাক/তাকসির)।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40">
              <div class="text-sm font-semibold text-gray-700 dark:text-gray-200">${L({ en: '11th-13th Dhul-Hijjah (Ayyam at-Tashreeq)', bn: '১১-১৩ জিলহজ (আইয়ামে তাশরিক)' })}</div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1" dir="auto">${L({ en: 'Stay in Mina. Stoning of the three Jamarat each day (small, middle, large). Perform Tawaf al-Ifadah and Sa\'i before departing. On the 13th, perform the farewell Tawaf (Tawaf al-Wida).', bn: 'মিনায় অবস্থান করুন। প্রতিদিন তিনটি জামারা (ছোট, মধ্যম, বড়) নিক্ষেপ করুন। বিদেশের আগে তাওয়াফে ইফাদা ও সাঈ করুন। ১৩ তারিখে বিদায়ী তাওয়াফ (তাওয়াফুল বিদা) করুন।' })}</p>
            </div>
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">💬 ${L({ en: 'Hadith on Hajj', bn: 'হজ সম্পর্কে হাদিস' })}</h3>
          <div class="space-y-3">
            <div class="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/40">
              <p class="text-sm text-amber-800 dark:text-amber-200 leading-relaxed" dir="auto">${L({ en: 'The Prophet ﷺ said: "The one who performs Hajj and does not commit any obscenity or transgression will return free of sin as on the day his mother bore him."', bn: 'নবী ﷺ বলেছেন: "যে ব্যক্তি হজ করে এবং কোনো অশ্লীলতা ও পাপাচার না করে, সে সেদিনের মতো নিষ্পাপ হয়ে ফিরে আসে যেদিন তার মা তাকে জন্ম দিয়েছিল।"' })}</p>
              <p class="text-xs text-gray-400 mt-1">${L({ en: 'Sahih al-Bukhari', bn: 'সহীহ বুখারী' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/40">
              <p class="text-sm text-amber-800 dark:text-amber-200 leading-relaxed" dir="auto">${L({ en: 'The Prophet ﷺ said: "An accepted Hajj (Hajj Mabrur) has no reward but Paradise."', bn: 'নবী ﷺ বলেছেন: "হজে মাবরুরের বিনিময় জান্নাত ছাড়া আর কিছু নয়।"' })}</p>
              <p class="text-xs text-gray-400 mt-1">${L({ en: 'Sahih al-Bukhari & Muslim', bn: 'সহীহ বুখারী ও মুসলিম' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/40">
              <p class="text-sm text-amber-800 dark:text-amber-200 leading-relaxed" dir="auto">${L({ en: 'The Prophet ﷺ said: "Perform Hajj and Umrah, for they remove poverty and sins as a furnace removes impurities from iron."', bn: 'নবী ﷺ বলেছেন: "তোমরা হজ ও উমরা কর, কারণ এগুলো দারিদ্র্য ও পাপ দূর করে যেমন আগুনের ভাটি লোহার ময়লা দূর করে।"' })}</p>
              <p class="text-xs text-gray-400 mt-1">${L({ en: 'Sunan al-Tirmidhi', bn: 'সুনানে তিরমিযী' })}</p>
            </div>
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">🕋 ${L({ en: 'Umrah Guide', bn: 'উমরা নির্দেশিকা' })}</h3>
          <p class="text-xs text-gray-500 dark:text-gray-400 mb-3" dir="auto">${L({ en: 'Umrah is the lesser pilgrimage that can be performed at any time of the year. It consists of the following rituals:', bn: 'উমরা হলো ক্ষুদ্র তীর্থযাত্রা যা বছরের যে কোনো সময় করা যায়। এটি নিম্নলিখিত অনুষ্ঠানগুলি নিয়ে গঠিত:' })}</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="p-3 rounded-xl bg-sky-50 dark:bg-sky-900/20 border border-sky-100 dark:border-sky-900/40">
              <div class="text-sm font-semibold text-sky-700 dark:text-sky-200">1. ${L({ en: 'Ihram', bn: 'ইহরাম' })}</div>
              <p class="text-xs text-sky-600 dark:text-sky-400 mt-1" dir="auto">${L({ en: 'Enter the state of Ihram at the Miqat with the intention of Umrah, wearing the prescribed garments.', bn: 'মীকাত থেকে উমরার নিয়তে ইহরাম বাঁধুন, নির্ধারিত পোশাক পরুন।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-sky-50 dark:bg-sky-900/20 border border-sky-100 dark:border-sky-900/40">
              <div class="text-sm font-semibold text-sky-700 dark:text-sky-200">2. ${L({ en: 'Tawaf', bn: 'তাওয়াফ' })}</div>
              <p class="text-xs text-sky-600 dark:text-sky-400 mt-1" dir="auto">${L({ en: 'Circumambulate the Kaaba seven times counter-clockwise, starting from the Black Stone.', bn: 'কাবা সাতবার প্রদক্ষিণ করুন ঘড়ির কাঁটার বিপরীতে, হাজরে আসওয়াদ থেকে শুরু করে।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-sky-50 dark:bg-sky-900/20 border border-sky-100 dark:border-sky-900/40">
              <div class="text-sm font-semibold text-sky-700 dark:text-sky-200">3. ${L({ en: 'Sa\'i', bn: 'সাঈ' })}</div>
              <p class="text-xs text-sky-600 dark:text-sky-400 mt-1" dir="auto">${L({ en: 'Walk seven times between the hills of Safa and Marwah, commemorating Hajar\'s search for water.', bn: 'সাফা ও মারওয়া পাহাড়ের মধ্যে সাতবার সাঈ করুন, বিবি হাজারের পানি অনুসন্ধানের স্মরণে।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-sky-50 dark:bg-sky-900/20 border border-sky-100 dark:border-sky-900/40">
              <div class="text-sm font-semibold text-sky-700 dark:text-sky-200">4. ${L({ en: 'Halaq / Taqsir', bn: 'হালাক / তাকসির' })}</div>
              <p class="text-xs text-sky-600 dark:text-sky-400 mt-1" dir="auto">${L({ en: 'Shave the entire head (Halaq) or trim a portion of the hair (Taqsir). Men: shaving is preferred. Women: trim a fingertip\'s length.', bn: 'সমস্ত মাথা মুণ্ডন করুন (হালাক) বা কিছু চুল ছাঁটুন (তাকসির)। পুরুষ: মুণ্ডন উত্তম। মহিলা: এক আঙুল পরিমাণ ছাঁটুন।' })}</p>
            </div>
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">🚫 ${L({ en: 'Prohibitions during Ihram', bn: 'ইহরাম অবস্থায় নিষিদ্ধ কাজ' })}</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div class="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300 p-2 rounded-lg bg-red-50 dark:bg-red-900/10" dir="auto"><span class="text-red-500 shrink-0">✕</span> ${L({ en: 'Wearing stitched clothing (men)', bn: 'সেলাই করা কাপড় পরা (পুরুষ)' })}</div>
            <div class="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300 p-2 rounded-lg bg-red-50 dark:bg-red-900/10" dir="auto"><span class="text-red-500 shrink-0">✕</span> ${L({ en: 'Covering the head (men) or face (women with niqab)', bn: 'মাথা ঢাকা (পুরুষ) বা মুখ ঢাকা (মহিলা নিকাব)' })}</div>
            <div class="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300 p-2 rounded-lg bg-red-50 dark:bg-red-900/10" dir="auto"><span class="text-red-500 shrink-0">✕</span> ${L({ en: 'Cutting nails or removing hair', bn: 'নখ কাটা বা চুল অপসারণ' })}</div>
            <div class="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300 p-2 rounded-lg bg-red-50 dark:bg-red-900/10" dir="auto"><span class="text-red-500 shrink-0">✕</span> ${L({ en: 'Applying perfume or scented products', bn: 'আতর বা সুগন্ধি ব্যবহার' })}</div>
            <div class="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300 p-2 rounded-lg bg-red-50 dark:bg-red-900/10" dir="auto"><span class="text-red-500 shrink-0">✕</span> ${L({ en: 'Hunting or killing animals', bn: 'শিকার করা বা প্রাণী হত্যা' })}</div>
            <div class="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300 p-2 rounded-lg bg-red-50 dark:bg-red-900/10" dir="auto"><span class="text-red-500 shrink-0">✕</span> ${L({ en: 'Marriage contract or sexual relations', bn: 'বিয়ে করা বা যৌন সম্পর্ক' })}</div>
            <div class="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300 p-2 rounded-lg bg-red-50 dark:bg-red-900/10" dir="auto"><span class="text-red-500 shrink-0">✕</span> ${L({ en: 'Fighting, arguing, or using foul language', bn: 'ঝগড়া, তর্ক বা অশ্লীল ভাষা ব্যবহার' })}</div>
            <div class="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300 p-2 rounded-lg bg-red-50 dark:bg-red-900/10" dir="auto"><span class="text-red-500 shrink-0">✕</span> ${L({ en: 'Using henna or wearing gloves', bn: 'মেহেন্দি ব্যবহার বা গ্লাভস পরা' })}</div>
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">📍 ${L({ en: 'Key Locations', bn: 'গুরুত্বপূর্ণ স্থান' })}</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="p-3 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-900/40">
              <div class="text-sm font-semibold text-purple-700 dark:text-purple-200">${L({ en: 'Mina', bn: 'মিনা' })}</div>
              <p class="text-xs text-purple-600 dark:text-purple-400 mt-1" dir="auto">${L({ en: 'A tent city about 5 km east of Makkah. Pilgrims spend the 8th and 11th-13th nights here. Site of the Jamarat (stoning ritual).', bn: 'মক্কা থেকে প্রায় ৫ কিমি পূর্বে তাঁবুর শহর। হাজিরা ৮ ও ১১-১৩ তারিখের রাত এখানে কাটান। জামারা (পাথর নিক্ষেপ) এখানে অবস্থিত।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-900/40">
              <div class="text-sm font-semibold text-purple-700 dark:text-purple-200">${L({ en: 'Muzdalifah', bn: 'মুজদালিফা' })}</div>
              <p class="text-xs text-purple-600 dark:text-purple-400 mt-1" dir="auto">${L({ en: 'An open plain between Mina and Arafah. Pilgrims stay here the night of the 10th after returning from Arafah, collecting pebbles for the Jamarat.', bn: 'মিনা ও আরাফার মধ্যবর্তী খোলা ময়দান। আরাফা থেকে ফিরে ১০ তারিখের রাত এখানে কাটান হাজিরা এবং জামারার জন্য পাথর সংগ্রহ করেন।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-900/40">
              <div class="text-sm font-semibold text-purple-700 dark:text-purple-200">${L({ en: 'Arafah', bn: 'আরাফা' })}</div>
              <p class="text-xs text-purple-600 dark:text-purple-400 mt-1" dir="auto">${L({ en: 'A vast plain about 20 km east of Makkah. The core of Hajj — Wuquf (standing) on the 9th of Dhul-Hijjah. Pilgrims spend the day in prayer and supplication.', bn: 'মক্কা থেকে প্রায় ২০ কিমি পূর্বে বিশাল ময়দান। হজের মূল অংশ — ৯ জিলহজ উকুফ (অবস্থান)। হাজিরা সারাদিন দোয়া ও ইবাদতে কাটান।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-900/40">
              <div class="text-sm font-semibold text-purple-700 dark:text-purple-200">${L({ en: 'Jamarat', bn: 'জামারা' })}</div>
              <p class="text-xs text-purple-600 dark:text-purple-400 mt-1" dir="auto">${L({ en: 'Three stone pillars in Mina representing Satan: the small (Jamarat al-Ula), the middle (Jamarat al-Wusta), and the large (Jamarat al-Aqabah). Pilgrims throw 7 pebbles at each.', bn: 'মিনায় তিনটি পাথরের স্তম্ভ যা শয়তানের প্রতীক: ছোট (জামারায়ে উলা), মধ্যম (জামারায়ে উসতা), এবং বড় (জামারায়ে আকাবা)। হাজিরা প্রতিটিতে ৭টি করে পাথর নিক্ষেপ করেন।' })}</p>
            </div>
          </div>
        </div>
        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">👕 ${L({ en: 'Ihram — Rules & Prohibitions', bn: 'ইহরাম — নিয়ম ও নিষিদ্ধ কাজ' })}</h3>
          <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3" dir="auto">${L({ en: 'Ihram is the sacred state a pilgrim enters for Hajj or Umrah. Men wear two unstitched white cloths (izar and rida); women wear their normal modest clothing without covering the face or hands with niqab/gloves during salah. The intention is made at the Miqat.', bn: 'ইহরাম হলো হজ বা উমরার জন্য পবিত্র অবস্থা। পুরুষরা দু\'টি সাদা সেলাইবিহীন কাপড় পরেন (ইযার ও রিদা); মহিলারা সাধারণ শালীন পোশাক পরেন এবং নামাজে নিকাব বা হাতমোজা পরবেন না। মীকাতে নিয়ত করতে হয়।' })}</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/40">
              <div class="text-sm font-semibold text-emerald-800 dark:text-emerald-200">✅ ${L({ en: 'Before Ihram (Sunnah)', bn: 'ইহরামের আগে (সুন্নাত)' })}</div>
              <ul class="mt-2 space-y-1">
                <li class="text-xs text-emerald-700 dark:text-emerald-300 flex gap-1"><span>•</span> ${L({ en: 'Trim nails, clip mustache, remove underarm and pubic hair', bn: 'নখ কাটা, গোঁফ ছাঁটা, বগল ও নাভির নিচের পশম দূর করা' })}</li>
                <li class="text-xs text-emerald-700 dark:text-emerald-300 flex gap-1"><span>•</span> ${L({ en: 'Perform ghusl (or wudu at minimum)', bn: 'গোসল করা (অন্তত অজু)' })}</li>
                <li class="text-xs text-emerald-700 dark:text-emerald-300 flex gap-1"><span>•</span> ${L({ en: 'Apply perfume to body (not to the ihram cloth)', bn: 'শরীরে সুগন্ধি লাগানো (ইহরামের কাপড়ে নয়)' })}</li>
                <li class="text-xs text-emerald-700 dark:text-emerald-300 flex gap-1"><span>•</span> ${L({ en: 'Pray two rak\'ahs, then make niyyah and start Talbiyah', bn: 'দু\'রাকাত নামাজ, তারপর নিয়ত ও তালবিয়া শুরু' })}</li>
              </ul>
            </div>
            <div class="p-3 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-900/40">
              <div class="text-sm font-semibold text-rose-800 dark:text-rose-200">🚫 ${L({ en: 'Prohibited in Ihram', bn: 'ইহরামে নিষিদ্ধ' })}</div>
              <ul class="mt-2 space-y-1">
                <li class="text-xs text-rose-700 dark:text-rose-300 flex gap-1"><span>•</span> ${L({ en: 'Cutting hair or nails', bn: 'চুল বা নখ কাটা' })}</li>
                <li class="text-xs text-rose-700 dark:text-rose-300 flex gap-1"><span>•</span> ${L({ en: 'Wearing perfume or scented products', bn: 'সুগন্ধি বা সুগন্ধযুক্ত জিনিস ব্যবহার' })}</li>
                <li class="text-xs text-rose-700 dark:text-rose-300 flex gap-1"><span>•</span> ${L({ en: 'Sexual relations or intimate contact', bn: 'সহবাস বা যৌন সংস্পর্শ' })}</li>
                <li class="text-xs text-rose-700 dark:text-rose-300 flex gap-1"><span>•</span> ${L({ en: 'Hunting land animals; killing lice/pests', bn: 'স্থল প্রাণী শিকার; উকুন/পোকা মারা' })}</li>
                <li class="text-xs text-rose-700 dark:text-rose-300 flex gap-1"><span>•</span> ${L({ en: 'Men: sewn clothing, covering head, closed-toe shoes', bn: 'পুরুষ: সেলাই করা পোশাক, মাথা ঢাকা, বন্ধ জুতা' })}</li>
                <li class="text-xs text-rose-700 dark:text-rose-300 flex gap-1"><span>•</span> ${L({ en: 'Women: niqab or gloves', bn: 'মহিলা: নিকাব বা হাতমোজা' })}</li>
                <li class="text-xs text-rose-700 dark:text-rose-300 flex gap-1"><span>•</span> ${L({ en: 'Contracting or arranging marriage', bn: 'বিবাহ চুক্তি বা প্রস্তাব দেওয়া' })}</li>
                <li class="text-xs text-rose-700 dark:text-rose-300 flex gap-1"><span>•</span> ${L({ en: 'Quarreling or foul speech (2:197)', bn: 'ঝগড়া বা অশ্লীল কথা (২:১৯৭)' })}</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">🤲 ${L({ en: 'Recommended Duas During Hajj', bn: 'হজে পঠিত মুস্তাহাব দোয়া' })}</h3>
          <div class="space-y-3">
            <div class="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/40">
              <div class="text-xs font-semibold text-emerald-800 dark:text-emerald-200 mb-1">📍 ${L({ en: 'Between the Yemeni Corner and the Black Stone (during Tawaf)', bn: 'রুকনে ইয়ামানি ও হাজরে আসওয়াদের মাঝে (তাওয়াফে)' })}</div>
              <p class="text-base text-emerald-900 dark:text-emerald-100 text-center leading-loose" dir="rtl">رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ</p>
              <p class="text-xs text-emerald-700 dark:text-emerald-300 mt-1 italic text-center">Rabbanā ātinā fid-dunyā ḥasanatan wa fil-ākhirati ḥasanatan wa qinā ‘adhāban-nār</p>
              <p class="text-xs text-emerald-700 dark:text-emerald-300 mt-1" dir="auto">${L({ en: '"Our Lord, grant us good in this world and good in the Hereafter, and save us from the punishment of the Fire." (2:201)', bn: '"হে আমাদের রব! আমাদের দুনিয়াতে কল্যাণ দাও এবং আখিরাতে কল্যাণ দাও, আর জাহান্নামের শাস্তি থেকে রক্ষা কর।" (২:২০১)' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/40">
              <div class="text-xs font-semibold text-emerald-800 dark:text-emerald-200 mb-1">📍 ${L({ en: 'On climbing Safa and Marwah', bn: 'সাফা ও মারওয়ায় আরোহণে' })}</div>
              <p class="text-base text-emerald-900 dark:text-emerald-100 text-center leading-loose" dir="rtl">إِنَّ الصَّفَا وَالْمَرْوَةَ مِن شَعَائِرِ اللَّهِ</p>
              <p class="text-xs text-emerald-700 dark:text-emerald-300 mt-1" dir="auto">${L({ en: '"Indeed Safa and Marwah are among the symbols of Allah." (2:158). Then face the Kaaba, raise hands, say "Allahu Akbar" and make personal du\'a three times.', bn: '"নিশ্চয়ই সাফা ও মারওয়া আল্লাহর নিদর্শনের অন্তর্ভুক্ত।" (২:১৫৮)। এরপর কাবার দিকে মুখ করে হাত তুলে "আল্লাহু আকবার" বলুন এবং তিনবার নিজের দোয়া করুন।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/40">
              <div class="text-xs font-semibold text-emerald-800 dark:text-emerald-200 mb-1">📍 ${L({ en: 'On the Day of Arafah', bn: 'আরাফার দিনে' })}</div>
              <p class="text-base text-emerald-900 dark:text-emerald-100 text-center leading-loose" dir="rtl">لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ</p>
              <p class="text-xs text-emerald-700 dark:text-emerald-300 mt-1 italic text-center">Lā ilāha illa-llāhu waḥdahu lā sharīka lah, lahul-mulku wa lahul-ḥamd, wa huwa ‘alā kulli shay\'in qadīr</p>
              <p class="text-xs text-emerald-700 dark:text-emerald-300 mt-1" dir="auto">${L({ en: '"There is no god but Allah, alone, with no partner. His is the dominion and His is the praise, and He has power over all things." — The best du\'a of the Prophets on the best day. (Tirmidhi)', bn: '"আল্লাহ ছাড়া কোনো ইলাহ নেই, তিনি একক, তাঁর কোনো শরীক নেই। রাজত্ব তাঁরই, প্রশংসা তাঁরই, তিনি সবকিছুর উপর ক্ষমতাবান।" — শ্রেষ্ঠ দিনে নবীদের শ্রেষ্ঠ দোয়া। (তিরমিযি)' })}</p>
            </div>
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">👩 ${L({ en: 'Women\'s Hajj — Special Notes', bn: 'মহিলাদের হজ — বিশেষ নির্দেশনা' })}</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="p-3 rounded-xl bg-pink-50 dark:bg-pink-900/20 border border-pink-100 dark:border-pink-900/40">
              <div class="text-sm font-semibold text-pink-800 dark:text-pink-200">${L({ en: 'Mahram requirement', bn: 'মাহরাম শর্ত' })}</div>
              <p class="text-xs text-pink-700 dark:text-pink-300 mt-1" dir="auto">${L({ en: 'A mahram (husband or unmarriageable male relative) is required for travel in the majority view. Some contemporary scholars allow group travel with trustworthy female companions.', bn: 'জমহুরের মতে সফরে মাহরাম (স্বামী বা অবিবাহযোগ্য পুরুষ আত্মীয়) প্রয়োজন। কিছু আধুনিক আলিম বিশ্বস্ত মহিলা সঙ্গীদের সাথে দলবদ্ধ সফরের অনুমতি দেন।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-pink-50 dark:bg-pink-900/20 border border-pink-100 dark:border-pink-900/40">
              <div class="text-sm font-semibold text-pink-800 dark:text-pink-200">${L({ en: 'Menstruation', bn: 'ঋতুস্রাব' })}</div>
              <p class="text-xs text-pink-700 dark:text-pink-300 mt-1" dir="auto">${L({ en: 'A menstruating woman does everything of Hajj except Tawaf. She may enter Ihram, stand at Arafah, spend the night at Muzdalifah, and stone the Jamarat. Tawaf is delayed until purity is restored.', bn: 'ঋতুবতী মহিলা তাওয়াফ ছাড়া হজের সব কাজ করবেন। তিনি ইহরাম বাঁধতে, আরাফায় দাঁড়াতে, মুজদালিফায় রাত কাটাতে ও জামারায় পাথর মারতে পারেন। পবিত্র হওয়া পর্যন্ত তাওয়াফ পিছিয়ে দেবেন।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-pink-50 dark:bg-pink-900/20 border border-pink-100 dark:border-pink-900/40">
              <div class="text-sm font-semibold text-pink-800 dark:text-pink-200">${L({ en: 'Clothing in ihram', bn: 'ইহরামে পোশাক' })}</div>
              <p class="text-xs text-pink-700 dark:text-pink-300 mt-1" dir="auto">${L({ en: 'Any modest clothing that covers the body except face and hands. Face-covering (niqab) and gloves are not worn during Ihram — but a woman may drop a loose cloth over her face if non-mahram men are near.', bn: 'শালীন যেকোনো পোশাক যা মুখ ও হাত ছাড়া শরীর ঢাকে। ইহরামে নিকাব ও হাতমোজা পরা যাবে না — তবে গায়রে-মাহরাম পুরুষ কাছে এলে মুখে একটি ঢিলা কাপড় ঝুলিয়ে রাখা যায়।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-pink-50 dark:bg-pink-900/20 border border-pink-100 dark:border-pink-900/40">
              <div class="text-sm font-semibold text-pink-800 dark:text-pink-200">${L({ en: 'Cutting hair (halq/taqsir)', bn: 'চুল ছাঁটা (হালাক/তাকসির)' })}</div>
              <p class="text-xs text-pink-700 dark:text-pink-300 mt-1" dir="auto">${L({ en: 'A woman only trims (taqsir) a small tip (fingertip length) of her hair. Shaving the head is not permitted for women.', bn: 'মহিলা কেবল চুলের অগ্রভাগ (আঙুলের একটি গিঁট পরিমাণ) ছাঁটবেন। মহিলাদের জন্য মাথা মুণ্ডন অনুমোদিত নয়।' })}</p>
            </div>
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">🕌 ${L({ en: 'Ziyarah to Madinah', bn: 'মদীনায় যিয়ারত' })}</h3>
          <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3" dir="auto">${L({ en: 'Visiting the Prophet\'s Mosque (Masjid an-Nabawi) in Madinah is not a pillar of Hajj but a great sunnah. The Prophet ﷺ said, "One prayer in my mosque is better than a thousand prayers in any other mosque, except al-Masjid al-Haram." (Bukhari & Muslim)', bn: 'মদীনার মসজিদে নববী যিয়ারত হজের রুকন নয়, তবে বড় সুন্নাত। নবী ﷺ বলেছেন, "আমার মসজিদে এক নামাজ অন্য যেকোনো মসজিদের এক হাজার নামাজের চেয়ে উত্তম, মসজিদুল হারাম ছাড়া।" (বুখারি ও মুসলিম)' })}</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="p-3 rounded-xl bg-sky-50 dark:bg-sky-900/20 border border-sky-100 dark:border-sky-900/40">
              <div class="text-sm font-semibold text-sky-800 dark:text-sky-200">${L({ en: 'Recommended visits', bn: 'সুন্নাত যিয়ারত' })}</div>
              <ul class="mt-2 space-y-1">
                <li class="text-xs text-sky-700 dark:text-sky-300 flex gap-1"><span>•</span> ${L({ en: 'Masjid an-Nabawi and the Rawdah (Garden of Paradise)', bn: 'মসজিদে নববী ও রওজা (জান্নাতের বাগান)' })}</li>
                <li class="text-xs text-sky-700 dark:text-sky-300 flex gap-1"><span>•</span> ${L({ en: 'Greeting the Prophet ﷺ and Abu Bakr and Umar (RA)', bn: 'নবী ﷺ, আবু বকর ও উমর (রাঃ)-কে সালাম' })}</li>
                <li class="text-xs text-sky-700 dark:text-sky-300 flex gap-1"><span>•</span> ${L({ en: 'Masjid Quba — pray two rak\'ahs (equivalent to Umrah in reward)', bn: 'মসজিদে কুবা — দুই রাকাত নামাজ (সওয়াবে উমরার সমতুল্য)' })}</li>
                <li class="text-xs text-sky-700 dark:text-sky-300 flex gap-1"><span>•</span> ${L({ en: 'Baqi al-Gharqad cemetery and Uhud (visit the graves of martyrs)', bn: 'বাকী গারকাদ কবরস্থান ও উহুদ (শহীদদের কবর জিয়ারত)' })}</li>
              </ul>
            </div>
            <div class="p-3 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-900/40">
              <div class="text-sm font-semibold text-rose-800 dark:text-rose-200">⚠️ ${L({ en: 'Avoid', bn: 'পরিহার্য' })}</div>
              <ul class="mt-2 space-y-1">
                <li class="text-xs text-rose-700 dark:text-rose-300 flex gap-1"><span>•</span> ${L({ en: 'Making du\'a to the Prophet ﷺ instead of Allah', bn: 'আল্লাহর বদলে নবী ﷺ-এর কাছে দোয়া চাওয়া' })}</li>
                <li class="text-xs text-rose-700 dark:text-rose-300 flex gap-1"><span>•</span> ${L({ en: 'Rubbing the walls of the chamber or kissing the grille', bn: 'হুজরার দেয়াল মোছা বা জালিতে চুম্বন করা' })}</li>
                <li class="text-xs text-rose-700 dark:text-rose-300 flex gap-1"><span>•</span> ${L({ en: 'Believing Madinah visit is a pillar of Hajj', bn: 'মদীনা যিয়ারতকে হজের রুকন মনে করা' })}</li>
                <li class="text-xs text-rose-700 dark:text-rose-300 flex gap-1"><span>•</span> ${L({ en: 'Traveling with the sole intent of visiting other graves', bn: 'শুধু অন্য কবর জিয়ারতের নিয়তে সফর করা' })}</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">⚠️ ${L({ en: 'Common Mistakes & Fidyah (Expiation)', bn: 'সাধারণ ভুল ও ফিদইয়া (কাফফারা)' })}</h3>
          <div class="space-y-3">
            <div class="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/40">
              <div class="text-sm font-semibold text-amber-800 dark:text-amber-200">${L({ en: 'Missing an obligation (wajib) — e.g., leaving Muzdalifah early, skipping a stoning day', bn: 'ওয়াজিব ছেড়ে দেওয়া — যেমন মুজদালিফা তাড়াতাড়ি ছেড়ে যাওয়া, একদিনের পাথর মারা বাদ' })}</div>
              <p class="text-xs text-amber-700 dark:text-amber-300 mt-1" dir="auto">${L({ en: 'Expiation: sacrifice a sheep in Makkah and distribute the meat to the poor.', bn: 'কাফফারা: মক্কায় একটি ছাগল/ভেড়া কুরবানি করে গরিবদের মাংস বিতরণ।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/40">
              <div class="text-sm font-semibold text-amber-800 dark:text-amber-200">${L({ en: 'Breaking Ihram prohibitions (perfume, hair-cutting, closed footwear) — with excuse', bn: 'ইহরাম ভঙ্গকারী কাজ (সুগন্ধি, চুল কাটা, ঢাকা জুতা) — ওজরসহ' })}</div>
              <p class="text-xs text-amber-700 dark:text-amber-300 mt-1" dir="auto">${L({ en: 'Choose one of three (2:196): fast 3 days, feed 6 poor people (½ Sa\' each), or sacrifice a sheep.', bn: 'তিনটির মধ্যে যেকোনো একটি (২:১৯৬): ৩ দিন রোজা, ৬ জন গরিবকে খাওয়ানো (প্রতিজন ½ সা\'), বা একটি ছাগল কুরবানি।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-900/40">
              <div class="text-sm font-semibold text-rose-800 dark:text-rose-200">${L({ en: 'Sexual relations before the first tahallul (partial release)', bn: 'প্রথম তাহাল্লুলের আগে সহবাস' })}</div>
              <p class="text-xs text-rose-700 dark:text-rose-300 mt-1" dir="auto">${L({ en: 'Invalidates Hajj — must complete this year, make up next year, and sacrifice a camel. After first tahallul: still sinful, expiated by a sacrifice.', bn: 'হজ বাতিল — এই বছর সম্পূর্ণ করা, আগামী বছর কাযা করা, এবং একটি উট কুরবানি করতে হবে। প্রথম তাহাল্লুলের পর: এখনও গুনাহ, একটি কুরবানি দ্বারা কাফফারা।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40">
              <div class="text-sm font-semibold text-gray-700 dark:text-gray-200">${L({ en: 'Common practical errors', bn: 'সাধারণ ব্যবহারিক ভুল' })}</div>
              <ul class="mt-2 space-y-1">
                <li class="text-xs text-gray-500 dark:text-gray-400 flex gap-1"><span>•</span> ${L({ en: 'Passing the Miqat without entering Ihram — must return or sacrifice a sheep', bn: 'ইহরাম ছাড়া মীকাত অতিক্রম — ফিরে আসতে হবে বা ছাগল কুরবানি' })}</li>
                <li class="text-xs text-gray-500 dark:text-gray-400 flex gap-1"><span>•</span> ${L({ en: 'Kissing the Yemeni Corner (only touching is sunnah; only Black Stone is kissed)', bn: 'রুকনে ইয়ামানিতে চুম্বন (শুধু ছোঁয়া সুন্নাত; শুধু হাজরে আসওয়াদে চুম্বন)' })}</li>
                <li class="text-xs text-gray-500 dark:text-gray-400 flex gap-1"><span>•</span> ${L({ en: 'Believing the pebbles must hit the pillar physically — the pit is the target', bn: 'পাথর সরাসরি স্তম্ভে লাগাতে হবে বলে বিশ্বাস — গর্তটিই লক্ষ্য' })}</li>
                <li class="text-xs text-gray-500 dark:text-gray-400 flex gap-1"><span>•</span> ${L({ en: 'Neglecting the farewell Tawaf (Tawaf al-Wida) — obligatory before leaving Makkah', bn: 'বিদায়ী তাওয়াফ (তাওয়াফুল বিদা) বাদ দেওয়া — মক্কা ছাড়ার আগে ওয়াজিব' })}</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">📜 ${L({ en: 'Hadith Collection — Hajj & Umrah', bn: 'হাদিস সংকলন — হজ ও উমরা' })}</h3>
          <p class="text-xs text-gray-500 dark:text-gray-400 mb-3" dir="auto">${L({ en: '12 authentic traditions from Sahih Bukhari, Muslim & Tirmidhi.', bn: 'সহীহ বুখারী, মুসলিম ও তিরমিযী থেকে ১২টি বিশুদ্ধ হাদিস।' })}</p>
          <div class="space-y-3">
            ${[
              { text: { en: 'The Prophet \u0635\u0644\u0649 \u0627\u0644\u0644\u0647 \u0639\u0644\u064a\u0647 \u0648\u0633\u0644\u0645 said: "Whoever performs Hajj for Allah and avoids all obscenity and transgression will return as sinless as the day his mother bore him."', bn: '\u09a8\u09ac\u09c0 \ufdfa \u09ac\u09b2\u09c7\u099b\u09c7\u09a8: "\u09af\u09c7 \u0986\u09b2\u09cd\u09b2\u09be\u09b9\u09b0 \u099c\u09a8\u09cd\u09af \u09b9\u099c \u0995\u09b0\u09c7 \u098f\u09ac\u0982 \u0985\u09b6\u09cd\u09b2\u09c0\u09b2\u09a4\u09be \u09a5\u09c7\u0995\u09c7 \u09ac\u09bf\u09b0\u09a4 \u09a5\u09be\u0995\u09c7, \u09b8\u09c7 \u09b8\u09c7\u09a6\u09bf\u09a8\u09c7\u09b0 \u09ae\u09a4\u09cb \u09a8\u09bf\u09b7\u09cd\u09aa\u09be\u09aa \u09b9\u09df\u09c7 \u09ab\u09bf\u09b0\u09c7 \u0986\u09b8\u09c7 \u09af\u09c7\u09a6\u09bf\u09a8 \u09a4\u09be\u09b0 \u09ae\u09be \u09a4\u09be\u0995\u09c7 \u099c\u09a8\u09cd\u09ae \u09a6\u09bf\u09df\u09c7\u099b\u09bf\u09b2\u0964"' }, src: { en: 'Sahih al-Bukhari 1521', bn: '\u09b8\u09b9\u09c0\u09b9 \u09ac\u09c1\u0996\u09be\u09b0\u09c0 \u09e7\u09eb\u09e8\u09e7' } },
              { text: { en: 'The Prophet \ufdfa said: "An accepted Hajj (Hajj Mabrur) has no reward except Paradise."', bn: '\u09a8\u09ac\u09c0 \ufdfa \u09ac\u09b2\u09c7\u099b\u09c7\u09a8: "\u09b9\u099c\u09c7 \u09ae\u09be\u09ac\u09b0\u09c1\u09b0\u09c7\u09b0 \u09ac\u09bf\u09a8\u09bf\u09ae\u09df \u099c\u09be\u09a8\u09cd\u09a8\u09be\u09a4 \u099b\u09be\u09dc\u09be \u0986\u09b0 \u0995\u09bf\u099b\u09c1 \u09a8\u09df\u0964"' }, src: { en: 'Sahih al-Bukhari 1773, Sahih Muslim 1349', bn: '\u09b8\u09b9\u09c0\u09b9 \u09ac\u09c1\u0996\u09be\u09b0\u09c0 \u09e7\u09ed\u09ed\u09e9, \u09b8\u09b9\u09c0\u09b9 \u09ae\u09c1\u09b8\u09b2\u09bf\u09ae \u09e7\u09e9\u09ea\u09ef' } },
              { text: { en: 'The Prophet \ufdfa said: "Follow up Hajj and Umrah consecutively; they remove poverty and sins as the bellows removes impurity from iron."', bn: '\u09a8\u09ac\u09c0 \ufdfa \u09ac\u09b2\u09c7\u099b\u09c7\u09a8: "\u09a4\u09cb\u09ae\u09b0\u09be \u09aa\u09b0\u09cd\u09af\u09be\u09df\u0995\u09cd\u09b0\u09ae\u09c7 \u09b9\u099c \u09a6 \u0989\u09ae\u09b0\u09be \u0995\u09b0; \u098f\u0997\u09c1\u09b2\u09cb \u09a6\u09be\u09b0\u09bf\u09a6\u09cd\u09b0\u09cd\u09af \u09a1 \u09aa\u09be\u09aa \u09a6\u09c2\u09b0 \u0995\u09b0\u09c7 \u09af\u09c7\u09ae\u09a8 \u09ad\u09be\u099f\u09bf \u09b2\u09cb\u09b9\u09be\u09b0 \u09ae\u09b0\u09bf\u099a\u09be \u09a6\u09c2\u09b0 \u0995\u09b0\u09c7\u0964"' }, src: { en: 'Sunan al-Tirmidhi 810', bn: '\u09b8\u09c1\u09a8\u09be\u09a8\u09c7 \u09a4\u09bf\u09b0\u09ae\u09bf\u09af\u09c0 \u09ee\u09e7\u09e6' } },
              { text: { en: 'The Prophet \ufdfa said: "There is no day on which Allah frees more servants from the Fire than the Day of Arafah. He draws near and boasts to the angels: What do these people want?"', bn: '\u09a8\u09ac\u09c0 \ufdfa \u09ac\u09b2\u09c7\u099b\u09c7\u09a8: "\u0986\u09b0\u09be\u09ab\u09be\u09b0 \u09a6\u09bf\u09a8\u09c7\u09b0 \u099a\u09c7\u09df\u09c7 \u0985\u09a7\u09bf\u0995 \u09b8\u0982\u0996\u09cd\u09af\u09be\u09df \u0986\u09b2\u09cd\u09b2\u09be\u09b9 \u0986\u09b0 \u0995\u09cb\u09a8\u09cb \u09a6\u09bf\u09a8 \u09ac\u09be\u09a8\u09cd\u09a6\u09be\u09a6\u09c7\u09b0 \u099c\u09be\u09b9\u09be\u09a8\u09cd\u09a8\u09be\u09ae \u09a5\u09c7\u0995\u09c7 \u09ae\u09c1\u0995\u09cd\u09a4\u09bf \u09a6\u09c7\u09a8 \u09a8\u09be\u0964 \u09a4\u09bf\u09a8\u09bf \u0995\u09be\u099b\u09c7 \u0986\u09b8\u09c7\u09a8 \u098f\u09ac\u0982 \u09ab\u09c7\u09b0\u09c7\u09b6\u09cd\u09a4\u09be\u09a6\u09c7\u09b0 \u09b8\u09be\u09ae\u09a8\u09c7 \u0997\u09b0\u09cd\u09ac \u0995\u09b0\u09c7\u09a8: \u098f\u09b0\u09be \u0995\u09c0 \u099a\u09be\u09df?"' }, src: { en: 'Sahih Muslim 1348', bn: '\u09b8\u09b9\u09c0\u09b9 \u09ae\u09c1\u09b8\u09b2\u09bf\u09ae \u09e7\u09e9\u09ea\u09ee' } },
              { text: { en: 'The Prophet \ufdfa said: "The best supplication is on the Day of Arafah, and the best of what I and the Prophets before me have said is: There is no god but Allah alone, with no partner; His is the dominion and His is the praise."', bn: '\u09a8\u09ac\u09c0 \ufdfa \u09ac\u09b2\u09c7\u099b\u09c7\u09a8: "\u09b8\u09b0\u09cd\u09ac\u09cb\u09a4\u09cd\u09a4\u09ae \u09a6\u09cb\u09df\u09be \u0986\u09b0\u09be\u09ab\u09be\u09b0 \u09a6\u09bf\u09a8\u09c7\u09b0 \u09a6\u09cb\u09df\u09be, \u098f\u09ac\u0982 \u0986\u09ae\u09bf \u09a1 \u0986\u09ae\u09be\u09b0 \u09aa\u09c2\u09b0\u09cd\u09ac\u09ac\u09b0\u09cd\u09a4\u09c0 \u09a8\u09ac\u09bf\u09b0\u09be \u09af\u09be \u09ac\u09b2\u09c7\u099b\u09c7\u09a8 \u09a4\u09be\u09b0 \u09b6\u09cd\u09b0\u09c7\u09b7\u09cd\u09a0: \u09b2\u09be \u0987\u09b2\u09be\u09b9\u09be \u0987\u09b2\u09cd\u09b2\u09be\u09b2\u09cd\u09b2\u09be\u09b9\u09c1 \u0993\u09df\u09be\u09b9\u09a6\u09be\u09b9\u09c1 \u09b2\u09be \u09b6\u09be\u09b0\u09bf\u0995\u09be \u09b2\u09be\u09b9, \u09b2\u09be\u09b9\u09c1\u09b2 \u09ae\u09c1\u09b2\u0995\u09c1 \u0993\u09df\u09be \u09b2\u09be\u09b9\u09c1\u09b2 \u09b9\u09be\u09ae\u09a6\u09c1\u0964"' }, src: { en: 'Sunan al-Tirmidhi 3585', bn: '\u09b8\u09c1\u09a8\u09be\u09a8\u09c7 \u09a4\u09bf\u09b0\u09ae\u09bf\u09af\u09c0 \u09e9\u09eb\u09ee\u09eb' } },
              { text: { en: 'The Prophet \ufdfa instructed at the Farewell Hajj: "Take your rituals from me; I do not know whether I will perform Hajj again after this year."', bn: '\u09a8\u09ac\u09c0 \ufdfa \u09ac\u09bf\u09a6\u09be\u09df \u09b9\u099c\u09c7 \u09a8\u09bf\u09b0\u09cd\u09a6\u09c7\u09b6 \u09a6\u09bf\u09b2\u09c7\u09a8: "\u09a4\u09cb\u09ae\u09b0\u09be \u0986\u09ae\u09be\u09b0 \u0995\u09be\u099b \u09a5\u09c7\u0995\u09c7 \u09b9\u099c\u09c7\u09b0 \u0986\u09ae\u09b2 \u09b6\u09bf\u0996\u09c7 \u09a8\u09be\u0993; \u0986\u09ae\u09bf \u099c\u09be\u09a8\u09bf \u09a8\u09be \u098f \u09ac\u099b\u09b0\u09c7\u09b0 \u09aa\u09b0 \u0986\u09ac\u09be\u09b0 \u09b9\u099c \u0995\u09b0\u09a4\u09c7 \u09aa\u09be\u09b0\u09ac \u0995\u09bf\u09a8\u09be\u0964"' }, src: { en: 'Sahih Muslim 1297', bn: '\u09b8\u09b9\u09c0\u09b9 \u09ae\u09c1\u09b8\u09b2\u09bf\u09ae \u09e7\u09e8\u09ef\u09ed' } },
              { text: { en: 'The Prophet \ufdfa said: "Umrah to Umrah is an expiation for the sins between them, and there is no reward for an accepted Hajj except Paradise."', bn: '\u09a8\u09ac\u09c0 \ufdfa \u09ac\u09b2\u09c7\u099b\u09c7\u09a8: "\u098f\u0995 \u0989\u09ae\u09b0\u09be \u09a5\u09c7\u0995\u09c7 \u0986\u09b0\u09c7\u0995 \u0989\u09ae\u09b0\u09be\u09b0 \u09ae\u09a7\u09cd\u09af\u09ac\u09b0\u09cd\u09a4\u09c0 \u09aa\u09be\u09aa\u09c7\u09b0 \u0995\u09be\u09ab\u09ab\u09be\u09b0\u09be, \u0986\u09b0 \u09b9\u099c\u09c7 \u09ae\u09be\u09ac\u09b0\u09c1\u09b0\u09c7\u09b0 \u09ac\u09bf\u09a8\u09bf\u09ae\u09df \u099c\u09be\u09a8\u09cd\u09a8\u09be\u09a4 \u099b\u09be\u09dc\u09be \u0995\u09bf\u099b\u09c1 \u09a8\u09df\u0964"' }, src: { en: 'Sahih al-Bukhari 1773', bn: '\u09b8\u09b9\u09c0\u09b9 \u09ac\u09c1\u0996\u09be\u09b0\u09c0 \u09e7\u09ed\u09ed\u09e9' } },
              { text: { en: 'The Prophet \ufdfa said: "Raise your voices with the Talbiyah, for it is one of the great rites of Hajj."', bn: '\u09a8\u09ac\u09c0 \ufdfa \u09ac\u09b2\u09c7\u099b\u09c7\u09a8: "\u09a4\u09be\u09b2\u09ac\u09bf\u09df\u09be\u09df \u09a4\u09cb\u09ae\u09be\u09a6\u09c7\u09b0 \u0986\u0993\u09df\u09be\u099c \u0989\u0981\u099a\u09c1 \u0995\u09b0\u09cb, \u0995\u09be\u09b0\u09a3 \u098f\u099f\u09bf \u09b9\u099c\u09c7\u09b0 \u0985\u09a8\u09cd\u09af\u09a4\u09ae \u09ac\u09dc \u09b6\u09bf\u0986\u09b0\u0964"' }, src: { en: 'Sunan Ibn Majah 2922 (Sahih)', bn: '\u09b8\u09c1\u09a8\u09be\u09a8\u09c7 \u0987\u09ac\u09a8\u09c7 \u09ae\u09be\u099c\u09be\u09b9 \u09e8\u09ef\u09e8\u09e8 (\u09b8\u09b9\u09c0\u09b9)' } },
              { text: { en: 'The Prophet \ufdfa said: "Whoever performs Tawaf around this House seven times and prays two rak\'ahs, it is as though he freed a slave."', bn: '\u09a8\u09ac\u09c0 \ufdfa \u09ac\u09b2\u09c7\u099b\u09c7\u09a8: "\u09af\u09c7 \u098f\u0987 \u0998\u09b0\u09c7\u09b0 \u099a\u09be\u09b0\u09aa\u09be\u09b6\u09c7 \u09b8\u09be\u09a4 \u099a\u0995\u09cd\u09b0 \u09a4\u09be\u0993\u09df\u09be\u09ab \u0995\u09b0\u09c7 \u098f\u09ac\u0982 \u09a6\u09c1\u0987 \u09b0\u09be\u0995\u09be\u09a4 \u09a8\u09be\u09ae\u09be\u099c \u09aa\u09dc\u09c7, \u09a4\u09be \u098f\u0995\u099f\u09bf \u0997\u09cb\u09b2\u09be\u09ae \u0986\u09af\u09be\u09a6 \u0995\u09b0\u09be\u09b0 \u09b8\u09ae\u09a4\u09c1\u09b2\u09cd\u09af\u0964"' }, src: { en: 'Sunan Ibn Majah 2956, Musnad Ahmad', bn: '\u09b8\u09c1\u09a8\u09be\u09a8\u09c7 \u0987\u09ac\u09a8\u09c7 \u09ae\u09be\u099c\u09be\u09b9 \u09e8\u09ef\u09eb\u09ec, \u09ae\u09c1\u09b8\u09a8\u09be\u09a6\u09c7 \u0986\u09b9\u09ae\u09a6' } },
              { text: { en: 'The Prophet \ufdfa said: "Allah boasts to His angels on the afternoon of Arafah: Look at My servants who came to Me dishevelled and dusty from every distant valley."', bn: '\u09a8\u09ac\u09c0 \ufdfa \u09ac\u09b2\u09c7\u099b\u09c7\u09a8: "\u0986\u09b0\u09be\u09ab\u09be\u09b0 \u09ac\u09bf\u0995\u09c7\u09b2\u09c7 \u0986\u09b2\u09cd\u09b2\u09be\u09b9 \u09ab\u09c7\u09b0\u09c7\u09b6\u09cd\u09a4\u09be\u09a6\u09c7\u09b0 \u09b8\u09be\u09ae\u09a8\u09c7 \u09b9\u09be\u099c\u09bf\u09a6\u09c7\u09b0 \u09a8\u09bf\u09df\u09c7 \u0997\u09b0\u09cd\u09ac \u0995\u09b0\u09c7\u09a8: \u09a6\u09c7\u0996\u09cb \u0986\u09ae\u09be\u09b0 \u09ac\u09be\u09a8\u09cd\u09a6\u09be\u09a6\u09c7\u09b0, \u09af\u09be\u09b0\u09be \u098f\u09b2\u09cb\u09ae\u09c7\u09b2\u09cb \u09a1 \u09a7\u09c1\u09b2\u09cb\u09ae\u09be\u0996\u09be \u09b9\u09df\u09c7 \u09a6\u09c2\u09b0-\u09a6\u09c2\u09b0\u09be\u09a8\u09cd\u09a4 \u09a5\u09c7\u0995\u09c7 \u098f\u09b8\u09c7\u099b\u09c7\u0964"' }, src: { en: 'Musnad Ahmad 4/258 (Sahih)', bn: '\u09ae\u09c1\u09b8\u09a8\u09be\u09a6\u09c7 \u0986\u09b9\u09ae\u09a6 \u09ea/\u09e8\u09eb\u09ee (\u09b8\u09b9\u09c0\u09b9)' } },
              { text: { en: 'The Prophet \ufdfa said: "Performing Umrah in Ramadan equals the reward of a Hajj — or Hajj with me."', bn: '\u09a8\u09ac\u09c0 \ufdfa \u09ac\u09b2\u09c7\u099b\u09c7\u09a8: "\u09b0\u09ae\u099c\u09be\u09a8\u09c7 \u0989\u09ae\u09b0\u09be \u0995\u09b0\u09be \u09b9\u099c\u09c7\u09b0 \u09b8\u09ae\u09a4\u09c1\u09b2\u09cd\u09af \u2014 \u0985\u09a5\u09ac\u09be \u0986\u09ae\u09be\u09b0 \u09b8\u09be\u09a5\u09c7 \u09b9\u099c\u09c7\u09b0 \u09b8\u09ae\u09be\u09a8\u0964"' }, src: { en: 'Sahih al-Bukhari 1863, Sahih Muslim 1256', bn: '\u09b8\u09b9\u09c0\u09b9 \u09ac\u09c1\u0996\u09be\u09b0\u09c0 \u09e7\u09ee\u09ec\u09e9, \u09b8\u09b9\u09c0\u09b9 \u09ae\u09c1\u09b8\u09b2\u09bf\u09ae \u09e7\u09e8\u09eb\u09ec' } },
              { text: { en: 'The Prophet \ufdfa said: "The pilgrims of Hajj and Umrah are the guests of Allah. He invited them and they responded; they ask Him and He gives to them."', bn: '\u09a8\u09ac\u09c0 \ufdfa \u09ac\u09b2\u09c7\u099b\u09c7\u09a8: "\u09b9\u099c \u09a6 \u0989\u09ae\u09b0\u09be\u09b0 \u09b9\u09be\u099c\u09bf\u09b0\u09be \u0986\u09b2\u09cd\u09b2\u09be\u09b9\u09b0 \u09ae\u09c7\u09b9\u09ae\u09be\u09a8\u0964 \u09a4\u09bf\u09a8\u09bf \u09a4\u09be\u09a6\u09c7\u09b0 \u09a1\u09c7\u0995\u09c7\u099b\u09c7\u09a8 \u098f\u09ac\u0982 \u09a4\u09be\u09b0\u09be \u09b8\u09be\u09dc\u09be \u09a6\u09bf\u09df\u09c7\u099b\u09c7; \u09a4\u09be\u09b0\u09be \u09a4\u09be\u0981\u09b0 \u0995\u09be\u099b\u09c7 \u099a\u09be\u09df \u098f\u09ac\u0982 \u09a4\u09bf\u09a8\u09bf \u09a6\u09c7\u09a8\u0964"' }, src: { en: 'Sunan Ibn Majah 2892 (Sahih al-Albani)', bn: '\u09b8\u09c1\u09a8\u09be\u09a8\u09c7 \u0987\u09ac\u09a8\u09c7 \u09ae\u09be\u099c\u09be\u09b9 \u09e8\u09ee\u09ef\u09e8 (\u09b8\u09b9\u09c0\u09b9 \u0986\u09b2-\u0986\u09b2\u09ac\u09be\u09a8\u09c0)' } },
            ].map(h => `
              <div class="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/40">
                <p class="text-sm text-amber-800 dark:text-amber-200 leading-relaxed" dir="auto">${L(h.text)}</p>
                <p class="text-xs text-gray-400 mt-1">${L(h.src)}</p>
              </div>`).join('')}
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">🔍 ${L({ en: 'Tafsir Snapshots — Key Hajj Verses', bn: 'তাফসীর সংক্ষেপ — হজের প্রধান আয়াতসমূহ' })}</h3>
          <p class="text-xs text-gray-500 dark:text-gray-400 mb-3" dir="auto">${L({ en: 'Brief bilingual commentary from Ibn Kathir and Tafsir as-Sadi.', bn: 'ইবনে কাসীর ও তাফসীর আস-সাদি থেকে সংক্ষিপ্ত দ্বিভাষিক ব্যাখ্যা।' })}</p>
          <div class="space-y-3">
            ${[
              { ref: '2:196', verse: { en: '"Complete the Hajj and Umrah for Allah. But if prevented, then [offer] what is easy of sacrificial animals." (2:196)', bn: '"তোমরা আল্লাহর জন্য হজ ও উমরা পূর্ণ কর। বাধা পেলে সহজলভ্য কুরবানি পাঠাও।" (২:১৯৬)' }, tafsir: { en: 'Ibn Kathir: Completing both Hajj and Umrah is obligatory once begun, even if they were voluntary acts. The phrase "for Allah" (lillah) mandates pure sincerity. One physically prevented (ihsar) may send a sacrificial animal and exit ihram — as the Prophet \ufdfa did at Hudaybiyah.', bn: 'ইবনে কাসীর: হজ ও উমরা শুরু করলে তা সম্পন্ন করা ওয়াজিব — যদিও তা নফল হয়। "আল্লাহর জন্য" কথাটি বিশুদ্ধ নিয়তের শর্ত করে। ইহসারের ক্ষেত্রে কুরবানির পশু পাঠিয়ে ইহরাম খুলে নেওয়া যাবে — নবী \ufdfa হুদাইবিয়ায় এটাই করেছিলেন।' }, src: 'Ibn Kathir' },
              { ref: '3:96-97', verse: { en: '"Indeed, the first House established for mankind was at Makkah... And due to Allah from the people is a pilgrimage — for whoever is able to find thereto a way." (3:96-97)', bn: '"নিশ্চয়ই মানুষের জন্য প্রথম নির্মিত ঘর মক্কায়... মানুষের উপর আল্লাহর হক — সামর্থ্যবানের জন্য এই ঘরের হজ।" (৩:৯৬-৯৭)' }, tafsir: { en: 'Ibn Kathir: Makkah (Bakkah) was the first masjid on earth, predating Bayt al-Maqdis by forty years. Ibrahim (AS) built it by divine command; Allah made it a sanctuary for all. Hajj is obligatory once upon every adult, sane, free Muslim with physical and financial ability.', bn: 'ইবনে কাসীর: মক্কা (বাক্কা) ছিল পৃথিবীর প্রথম মসজিদ — বায়তুল মাকদিসের চল্লিশ বছর আগে প্রতিষ্ঠিত। ইবরাহীম (আঃ) দিব্য নির্দেশে নির্মাণ করেন এবং আল্লাহ এটিকে আশ্রয়ের স্থান করেছেন। হজ প্রতিটি সামর্থ্যবান প্রাপ্তবয়স্ক মুসলিমের উপর একবার ফরজ।' }, src: 'Ibn Kathir' },
              { ref: '22:26-27', verse: { en: '"And when We designated for Ibrahim the site of the House... and proclaim to mankind the Hajj — they will come to you on foot and on every lean camel." (22:26-27)', bn: '"যখন আমি ইবরাহীমের জন্য ঘরের স্থান নির্ধারণ করলাম... এবং মানুষের মধ্যে হজের ঘোষণা দাও।" (২২:২৬-২৭)' }, tafsir: { en: 'Ibn Kathir: Allah commanded Ibrahim (AS) to purify the Kaaba for worshippers performing tawaf and prayer, then to proclaim Hajj to all humanity. Ibn Abbas narrated: Ibrahim asked how his voice could reach all people; Allah replied: "You call — I will convey it." That proclamation still echoes in every Muslim who answers the call.', bn: 'ইবনে কাসীর: আল্লাহ ইবরাহীম (আঃ)-কে তাওয়াফকারী ও নামাজিদের জন্য কাবা পবিত্র রাখার নির্দেশ দেন, তারপর সমস্ত মানুষের কাছে হজ ঘোষণার আদেশ দেন। ইবনে আব্বাস বলেন: ইবরাহীম (আঃ) জিজ্ঞেস করলেন কীভাবে সবার কাছে পৌঁছাবে; আল্লাহ বললেন: তুমি ডাকো, আমি পৌঁছে দেব।' }, src: 'Ibn Kathir' },
              { ref: '22:36-37', verse: { en: '"And the sacrificial camels We have made for you among the symbols of Allah... Their meat will not reach Allah, nor their blood — but what reaches Him is piety from you." (22:36-37)', bn: '"কুরবানির উট আমি তোমাদের জন্য আল্লাহর নিদর্শনের অন্তর্ভুক্ত করেছি... এগুলোর গোশত বা রক্ত আল্লাহর কাছে পৌঁছায় না — পৌঁছায় তোমাদের তাকওয়া।" (২২:৩৬-৩৭)' }, tafsir: { en: 'Tafsir as-Sadi: The sacrificial animals (hady/udhiyah) are among the most visible rites of Hajj. Pilgrims are commanded to face them qiblah-ward, invoke the name of Allah upon slaughter, and distribute the meat to the poor. Verse 37 reveals the spiritual core: the outward sacrifice is worthless without inward taqwa — God-consciousness alone ascends to Allah.', bn: 'তাফসীর আস-সাদি: কুরবানির পশু হজের সবচেয়ে দৃশ্যমান শিআরগুলির একটি। হাজিদের কিবলামুখী করে আল্লাহর নামে জবাই করে গরিবদের মাংস বিতরণের নির্দেশ দেওয়া হয়েছে। আয়াত ৩৭ সারসত্য প্রকাশ করে: বাহ্যিক কুরবানি তাকওয়া ছাড়া মূল্যহীন — কেবল আল্লাহ-সচেতনতাই তাঁর কাছে পৌঁছায়।' }, src: 'Tafsir as-Sadi' },
              { ref: '5:97', verse: { en: '"Allah has made the Kaabah, the Sacred House, a means of support for the people, and the sacred month and the offerings and the garlands." (5:97)', bn: '"আল্লাহ কাবা — পবিত্র গৃহ — মানুষের জন্য প্রতিষ্ঠার স্তম্ভ করেছেন, এবং পবিত্র মাস, কুরবানির পশু ও মালা।" (৫:৯৭)' }, tafsir: { en: 'Ibn Kathir: The Kaaba, sacred months, garlands on sacrificial animals, and the hady offerings are divinely appointed symbols that sustain the ummah spiritually and materially. Through them Allah provides religious structure, safe travel, and economic stability. The verse affirms that Allah has full knowledge of all in the heavens and earth.', bn: 'ইবনে কাসীর: কাবা, পবিত্র মাস, গলার মালা ও হাদি — এগুলো আল্লাহর মনোনীত শিআর যা উম্মাহর আধ্যাত্মিক ও বৈষয়িক শৃঙ্খলা ধারণ করে। এর মাধ্যমে আল্লাহ দীনি কাঠামো, নিরাপদ যাতায়াত ও স্থিতিশীলতা দেন। আয়াত শেষ হয় এই স্বীকৃতিতে যে আল্লাহ আকাশ ও পৃথিবীর সব কিছু জানেন।' }, src: 'Ibn Kathir' },
              { ref: '5:2', verse: { en: '"O believers, do not violate the rites of Allah, or the sacred month, or the sacrificial offerings... and cooperate in righteousness and piety." (5:2)', bn: '"হে বিশ্বাসীরা, আল্লাহর নিদর্শন, পবিত্র মাস, কুরবানির পশু লঙ্ঘন করো না... নেকী ও তাকওয়ায় পরস্পর সাহায্য করো।" (৫:২)' }, tafsir: { en: 'Tafsir as-Sadi: Surah al-Maidah opens with a comprehensive command to honor all divinely legislated rites, including the sacred months and animals marked for the Haram. Pilgrims must not be hindered or harmed even by opponents. The verse closes with the golden principle of Hajj conduct: cooperate in righteousness and piety, never in sin and transgression.', bn: 'তাফসীর আস-সাদি: সূরা মায়েদা শুরু হয় আল্লাহর সমস্ত শিআর — পবিত্র মাস ও হারামে যাওয়া চিহ্নিত পশু — সম্মান করার ব্যাপক নির্দেশ দিয়ে। মক্কার দিকে আসা হাজিদের বাধা দেওয়া বা ক্ষতি করা নিষিদ্ধ। আয়াত শেষ হয় হজের সোনালি নীতিতে: নেকী ও তাকওয়ায় সহযোগিতা করো, পাপ ও সীমালঙ্ঘনে নয়।' }, src: 'Tafsir as-Sadi' },
            ].map(ts => `
              <div class="p-4 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-900/40">
                <div class="flex items-center justify-between mb-2">
                  <span class="font-bold text-teal-700 dark:text-teal-300 text-sm">📖 ${ts.ref}</span>
                  <span class="text-xs px-2 py-0.5 rounded-full bg-teal-200 dark:bg-teal-800 text-teal-800 dark:text-teal-200">${ts.src}</span>
                </div>
                <p class="text-sm text-teal-800 dark:text-teal-200 italic mb-2 leading-relaxed" dir="auto">${L(ts.verse)}</p>
                <p class="text-xs text-gray-600 dark:text-gray-300 leading-relaxed" dir="auto">${L(ts.tafsir)}</p>
              </div>`).join('')}
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">⚖️ ${L({ en: 'Comparing Hajj & Umrah', bn: 'হজ ও উমরার তুলনা' })}</h3>
          <div class="overflow-x-auto">
            <table class="w-full text-xs border-collapse">
              <thead>
                <tr>
                  <th class="p-2.5 border border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-left font-semibold text-gray-700 dark:text-gray-200" dir="auto">${L({ en: 'Aspect', bn: 'বিষয়' })}</th>
                  <th class="p-2.5 border border-gray-200 dark:border-gray-600 bg-emerald-50 dark:bg-emerald-900/30 text-left font-semibold text-emerald-700 dark:text-emerald-300">🕋 ${L({ en: 'Hajj', bn: 'হজ' })}</th>
                  <th class="p-2.5 border border-gray-200 dark:border-gray-600 bg-sky-50 dark:bg-sky-900/30 text-left font-semibold text-sky-700 dark:text-sky-300">🌙 ${L({ en: 'Umrah', bn: 'উমরা' })}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="p-2.5 border border-gray-200 dark:border-gray-600 font-medium text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-900/20" dir="auto">${L({ en: 'Duration', bn: 'সময়কাল' })}</td>
                  <td class="p-2.5 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300" dir="auto">${L({ en: '5-6 days (8th-13th Dhul-Hijjah)', bn: '৫-৬ দিন (৮-১৩ জিলহজ)' })}</td>
                  <td class="p-2.5 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300" dir="auto">${L({ en: 'A few hours to 1 day', bn: 'কয়েক ঘণ্টা থেকে ১ দিন' })}</td>
                </tr>
                <tr>
                  <td class="p-2.5 border border-gray-200 dark:border-gray-600 font-medium text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-900/20" dir="auto">${L({ en: 'Timing', bn: 'সময়' })}</td>
                  <td class="p-2.5 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300" dir="auto">${L({ en: 'Dhul-Hijjah only (fixed days)', bn: 'শুধু জিলহজ মাসে (নির্ধারিত দিনে)' })}</td>
                  <td class="p-2.5 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300" dir="auto">${L({ en: 'Any time of year', bn: 'বছরের যেকোনো সময়' })}</td>
                </tr>
                <tr>
                  <td class="p-2.5 border border-gray-200 dark:border-gray-600 font-medium text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-900/20" dir="auto">${L({ en: 'Major rites', bn: 'প্রধান আচার' })}</td>
                  <td class="p-2.5 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300" dir="auto">${L({ en: '~10 rites (Ihram, Wuquf, Muzdalifah, Jamarat x3 days, Sacrifice, Halq, Tawaf al-Ifadah, Sa\'i, Tawaf al-Wida)', bn: '~১০টি (ইহরাম, উকুফ, মুজদালিফা, জামারা ×৩ দিন, কুরবানি, হালাক, তাওয়াফে ইফাদা, সাঈ, তাওয়াফুল বিদা)' })}</td>
                  <td class="p-2.5 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300" dir="auto">${L({ en: '4 rites (Ihram, Tawaf, Sa\'i, Halq/Taqsir)', bn: '৪টি (ইহরাম, তাওয়াফ, সাঈ, হালাক/তাকসির)' })}</td>
                </tr>
                <tr>
                  <td class="p-2.5 border border-gray-200 dark:border-gray-600 font-medium text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-900/20" dir="auto">${L({ en: 'Obligation grade', bn: 'বিধানের মর্যাদা' })}</td>
                  <td class="p-2.5 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300" dir="auto">${L({ en: 'Fard (obligatory) once in a lifetime', bn: 'ফরজ — জীবনে একবার' })}</td>
                  <td class="p-2.5 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300" dir="auto">${L({ en: 'Wajib per Shafi\'i/Hanbali; Sunnah mu\'akkadah per Hanafi/Maliki', bn: 'শাফিয়ী/হাম্বলীর মতে ওয়াজিব; হানাফি/মালিকীর মতে সুন্নাতে মুয়াক্কাদা' })}</td>
                </tr>
                <tr>
                  <td class="p-2.5 border border-gray-200 dark:border-gray-600 font-medium text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-900/20" dir="auto">${L({ en: 'Reward', bn: 'প্রতিদান' })}</td>
                  <td class="p-2.5 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300" dir="auto">${L({ en: 'Wipes all prior sins; Paradise for Hajj Mabrur', bn: 'পূর্বের সব গুনাহ মাফ; হজে মাবরুরের প্রতিদান জান্নাত' })}</td>
                  <td class="p-2.5 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300" dir="auto">${L({ en: 'Expiation of sins between two Umrahs', bn: 'দুই উমরার মধ্যবর্তী গুনাহের কাফফারা' })}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">📋 ${L({ en: 'Preparation Checklist', bn: 'প্রস্তুতির চেকলিস্ট' })}</h3>
          <p class="text-xs text-gray-500 dark:text-gray-400 mb-3" dir="auto">${L({ en: '22 practical bilingual items — tap each category to expand.', bn: '২২টি ব্যবহারিক দ্বিভাষিক আইটেম — প্রতিটি ক্যাটাগরি ট্যাপ করে বিস্তারিত দেখুন।' })}</p>
          <div class="space-y-2">
            <details class="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <summary class="flex items-center gap-2 p-3 cursor-pointer bg-gray-50 dark:bg-gray-900/40 hover:bg-gray-100 dark:hover:bg-gray-700/40 list-none">
                <span>💰</span><span class="font-semibold text-sm text-gray-800 dark:text-gray-100 flex-1" dir="auto">${L({ en: 'Financial Preparation', bn: 'আর্থিক প্রস্তুতি' })}</span><span class="text-xs text-gray-400">▼</span>
              </summary>
              <div class="p-3 space-y-2 bg-white dark:bg-gray-800">
                ${[
                  { en: 'Settle all outstanding debts and loans before departure — Hajj does not absolve unpaid debts.', bn: 'যাত্রার আগে সমস্ত ঋণ পরিশোধ করুন — হজ অপরিশোধিত ঋণ মাফ করে না।' },
                  { en: 'Write a legal will (wasiyyah) and appoint a trusted executor to manage your affairs during absence.', bn: 'আইনগত ওসিয়ত লিখুন এবং অনুপস্থিতিতে বিষয়াদি পরিচালনার জন্য বিশ্বস্ত নির্বাহক নিযুক্ত করুন।' },
                  { en: 'Leave sufficient provision for your family covering the entire duration of your absence.', bn: 'অনুপস্থিতির পুরো সময়ের জন্য পরিবারের জন্য পর্যাপ্ত অর্থ রেখে যান।' },
                  { en: 'Obtain travel insurance covering medical emergencies, hospitalization, and trip interruption.', bn: 'চিকিৎসা জরুরি অবস্থা, হাসপাতালে ভর্তি ও সফর বাধাগ্রস্ততা কভার করে এমন ট্রাভেল ইন্স্যুরেন্স নিন।' },
                ].map(item => `<div class="flex gap-2 text-xs text-gray-600 dark:text-gray-300 p-2 rounded-lg bg-yellow-50 dark:bg-yellow-900/10" dir="auto"><span class="text-yellow-500 shrink-0 mt-0.5">✓</span><span>${L(item)}</span></div>`).join('')}
              </div>
            </details>
            <details class="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <summary class="flex items-center gap-2 p-3 cursor-pointer bg-gray-50 dark:bg-gray-900/40 hover:bg-gray-100 dark:hover:bg-gray-700/40 list-none">
                <span>📄</span><span class="font-semibold text-sm text-gray-800 dark:text-gray-100 flex-1" dir="auto">${L({ en: 'Documentation & Logistics', bn: 'কাগজপত্র ও লজিস্টিক্স' })}</span><span class="text-xs text-gray-400">▼</span>
              </summary>
              <div class="p-3 space-y-2 bg-white dark:bg-gray-800">
                ${[
                  { en: 'Ensure passport is valid for 6+ months beyond return date and Hajj visa is confirmed.', bn: 'পাসপোর্ট ফেরার তারিখের ৬ মাসেরও বেশি মেয়াদী এবং হজ ভিসা নিশ্চিত করুন।' },
                  { en: 'Keep photocopies/scans of all documents (passport, visa, tickets) stored separately from originals.', bn: 'সমস্ত কাগজপত্রের (পাসপোর্ট, ভিসা, টিকিট) ফটোকপি/স্ক্যান মূল থেকে আলাদা রাখুন।' },
                  { en: 'Arrange a mahram for women — husband or a close unmarriageable male relative per majority scholarly opinion.', bn: 'মহিলাদের জন্য মাহরামের ব্যবস্থা করুন — জমহুরের মতে স্বামী বা নিকট অবিবাহযোগ্য পুরুষ আত্মীয়।' },
                ].map(item => `<div class="flex gap-2 text-xs text-gray-600 dark:text-gray-300 p-2 rounded-lg bg-blue-50 dark:bg-blue-900/10" dir="auto"><span class="text-blue-500 shrink-0 mt-0.5">✓</span><span>${L(item)}</span></div>`).join('')}
              </div>
            </details>
            <details class="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <summary class="flex items-center gap-2 p-3 cursor-pointer bg-gray-50 dark:bg-gray-900/40 hover:bg-gray-100 dark:hover:bg-gray-700/40 list-none">
                <span>💊</span><span class="font-semibold text-sm text-gray-800 dark:text-gray-100 flex-1" dir="auto">${L({ en: 'Health & Medical', bn: 'স্বাস্থ্য ও চিকিৎসা' })}</span><span class="text-xs text-gray-400">▼</span>
              </summary>
              <div class="p-3 space-y-2 bg-white dark:bg-gray-800">
                ${[
                  { en: 'Complete a thorough medical check-up — especially cardiac, diabetic, and blood pressure screening for elderly parents.', bn: 'সম্পূর্ণ মেডিকেল চেকআপ করুন — বিশেষত বয়স্ক বাবা-মার জন্য হার্ট, ডায়াবেটিস ও রক্তচাপ পরীক্ষা।' },
                  { en: 'Pack all prescription medicines for the full trip plus an extra week — heat and crowds aggravate chronic conditions.', bn: 'সফরের পুরো সময়ের জন্য প্রেসক্রিপশনের ওষুধ এবং অতিরিক্ত এক সপ্তাহের জন্য নিন।' },
                  { en: 'Get all Saudi-required vaccinations: meningitis (mandatory), flu and COVID boosters (strongly recommended).', bn: 'সৌদি আরবের প্রয়োজনীয় টিকা নিন: মেনিনজাইটিস (বাধ্যতামূলক), ফ্লু ও কোভিড বুস্টার (দৃঢ়ভাবে সুপারিশকৃত)।' },
                  { en: 'Pre-arrange wheelchair/mobility assistance at airports and the Haram for elderly or mobility-impaired companions.', bn: 'বয়স্ক বা সীমিত চলাফেরার সঙ্গীদের জন্য বিমানবন্দর ও হারামে হুইলচেয়ারের আগাম ব্যবস্থা করুন।' },
                ].map(item => `<div class="flex gap-2 text-xs text-gray-600 dark:text-gray-300 p-2 rounded-lg bg-red-50 dark:bg-red-900/10" dir="auto"><span class="text-red-500 shrink-0 mt-0.5">✓</span><span>${L(item)}</span></div>`).join('')}
              </div>
            </details>
            <details class="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <summary class="flex items-center gap-2 p-3 cursor-pointer bg-gray-50 dark:bg-gray-900/40 hover:bg-gray-100 dark:hover:bg-gray-700/40 list-none">
                <span>🎒</span><span class="font-semibold text-sm text-gray-800 dark:text-gray-100 flex-1" dir="auto">${L({ en: 'Packing Essentials', bn: 'প্যাকিং অপরিহার্য' })}</span><span class="text-xs text-gray-400">▼</span>
              </summary>
              <div class="p-3 space-y-2 bg-white dark:bg-gray-800">
                ${[
                  { en: 'Comfortable flat-soled walking shoes — pilgrims walk 10-15 km daily during peak Hajj rites.', bn: 'আরামদায়ক সমতলতলার জুতা — হজের প্রধান আচারে প্রতিদিন ১০-১৫ কিমি হাঁটতে হয়।' },
                  { en: 'Ihram garments — at least 2 sets for men; modest long-sleeve outfits in neutral colours for women.', bn: 'ইহরামের কাপড় — পুরুষদের কমপক্ষে ২ সেট; মহিলাদের জন্য নিরপেক্ষ রঙের পূর্ণ পোশাক।' },
                  { en: 'Waist pouch or money belt — keep cash, passport copy, and emergency contacts secure at all times.', bn: 'কোমরের থলি বা মানি বেল্ট — নগদ, পাসপোর্ট কপি ও জরুরি নম্বর সর্বদা সুরক্ষিত রাখুন।' },
                  { en: 'Unscented soap, shampoo, and moisturiser — fragranced products are forbidden during ihram.', bn: 'গন্ধহীন সাবান, শ্যাম্পু ও ময়েশ্চারাইজার — ইহরামে সুগন্ধি পণ্য নিষিদ্ধ।' },
                  { en: 'Small lightweight backpack for carrying daily essentials in Mina, Arafah, and Muzdalifah.', bn: 'মিনা, আরাফা ও মুজদালিফার দৈনন্দিন আচারে প্রয়োজনীয় জিনিসের জন্য ছোট হালকা ব্যাকপ্যাক।' },
                  { en: 'Portable power bank — charging access in heavily crowded areas can be unreliable.', bn: 'পোর্টেবল পাওয়ার ব্যাংক — অতিরিক্ত ভিড়ের এলাকায় চার্জিং সুবিধা অনির্ভরযোগ্য হতে পারে।' },
                ].map(item => `<div class="flex gap-2 text-xs text-gray-600 dark:text-gray-300 p-2 rounded-lg bg-purple-50 dark:bg-purple-900/10" dir="auto"><span class="text-purple-500 shrink-0 mt-0.5">✓</span><span>${L(item)}</span></div>`).join('')}
              </div>
            </details>
            <details class="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <summary class="flex items-center gap-2 p-3 cursor-pointer bg-gray-50 dark:bg-gray-900/40 hover:bg-gray-100 dark:hover:bg-gray-700/40 list-none">
                <span>🤲</span><span class="font-semibold text-sm text-gray-800 dark:text-gray-100 flex-1" dir="auto">${L({ en: 'Spiritual Preparation', bn: 'আধ্যাত্মিক প্রস্তুতি' })}</span><span class="text-xs text-gray-400">▼</span>
              </summary>
              <div class="p-3 space-y-2 bg-white dark:bg-gray-800">
                ${[
                  { en: 'Attend a certified pre-Hajj course or workshop to learn all rites correctly before departure.', bn: 'যাত্রার আগে সব আচার সঠিকভাবে শিখতে প্রত্যয়িত প্রি-হজ কোর্স বা ওয়ার্কশপে অংশ নিন।' },
                  { en: 'Memorise the Talbiyah and the key duas for each rite: on Safa, during Tawaf, at Arafah, and at Muzdalifah.', bn: 'তালবিয়া ও প্রতিটি আচারের মূল দোয়া মুখস্থ করুন: সাফায়, তাওয়াফে, আরাফায় ও মুজদালিফায়।' },
                  { en: 'Make sincere tawbah (repentance) before departure and begin the journey in a state of spiritual purity.', bn: 'যাত্রার আগে আন্তরিক তাওবা করুন এবং আধ্যাত্মিক পবিত্রতায় সফর শুরু করুন।' },
                  { en: 'Study a reliable Hajj manual before travel — classic references: Zad al-Maad (Ibn al-Qayyim) and Minhaj al-Muslim.', bn: 'যাত্রার আগে নির্ভরযোগ্য হজ নির্দেশিকা পড়ুন — ক্লাসিক রেফারেন্স: যাদুল মাআদ (ইবনুল কায়্যিম) ও মিনহাজুল মুসলিম।' },
                  { en: 'Inform close family of your travel itinerary and your Hajj group emergency contact numbers.', bn: 'নিকট পরিবারকে আপনার সফরের সময়সূচি ও হজ দলের জরুরি যোগাযোগ নম্বর জানান।' },
                ].map(item => `<div class="flex gap-2 text-xs text-gray-600 dark:text-gray-300 p-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/10" dir="auto"><span class="text-emerald-500 shrink-0 mt-0.5">✓</span><span>${L(item)}</span></div>`).join('')}
              </div>
            </details>
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">🧠 ${L({ en: 'Self-check — Test Your Understanding', bn: 'নিজেই যাচাই — আপনার বোঝাপড়া পরীক্ষা করুন' })}</h3>
          <p class="text-xs text-gray-500 dark:text-gray-400 mb-3" dir="auto">${L({ en: 'Tap each question to reveal the answer.', bn: 'প্রতিটি প্রশ্নে ট্যাপ করে উত্তর দেখুন।' })}</p>
          <div class="space-y-2">
            ${[
              { q: { en: 'What is the essential day (rukn) of Hajj?', bn: 'হজের অপরিহার্য দিন (রুকন) কোনটি?' }, a: { en: 'The 9th of Dhul-Hijjah — the day of standing at Arafah (Wuqūf). "Hajj is Arafah." (Tirmidhi)', bn: '৯ জিলহজ — আরাফায় অবস্থানের দিন (উকুফ)। "হজই আরাফা।" (তিরমিযি)' } },
              { q: { en: 'How many types of Hajj are there?', bn: 'হজ কত প্রকার?' }, a: { en: 'Three: Ifrad (Hajj only), Tamattu\' (Umrah + break + Hajj), Qiran (Umrah + Hajj combined in one ihram).', bn: 'তিন প্রকার: ইফরাদ (শুধু হজ), তামাত্তু (উমরা + বিরতি + হজ), কিরান (এক ইহরামে উমরা+হজ একত্রে)।' } },
              { q: { en: 'How many rounds of Tawaf and Sa\'i?', bn: 'তাওয়াফ ও সাঈ কত চক্র?' }, a: { en: 'Tawaf: 7 counter-clockwise circuits around the Kaaba. Sa\'i: 7 trips between Safa and Marwah (Safa→Marwah counts as one).', bn: 'তাওয়াফ: কাবার চারপাশে ৭ চক্র বামাবর্তে। সাঈ: সাফা ও মারওয়ায় ৭ চক্র (সাফা→মারওয়া একবার)।' } },
              { q: { en: 'On which day is stoning of Jamarat al-Aqabah performed?', bn: 'জামারায়ে আকাবায় পাথর কোন দিন?' }, a: { en: 'On the 10th of Dhul-Hijjah (Yawm an-Nahr), the day of sacrifice — 7 pebbles at the large pillar only.', bn: '১০ জিলহজ (ইয়াওমুন নাহর), কুরবানির দিন — বড় স্তম্ভে শুধু ৭টি পাথর।' } },
              { q: { en: 'Is Umrah obligatory?', bn: 'উমরা কি ফরজ?' }, a: { en: 'Scholars differ. Shafi\'i and Hanbali: yes, once in a lifetime. Hanafi and Maliki: strong sunnah. Both agree Hajj is obligatory once.', bn: 'আলিমগণ মতভেদ করেছেন। শাফিয়ী ও হাম্বলী: হ্যাঁ, জীবনে একবার। হানাফি ও মালিকী: প্রবল সুন্নাত। উভয়ে একমত: হজ জীবনে একবার ফরজ।' } },
              { q: { en: 'What are the 5 miqats (points to enter ihram)?', bn: '৫টি মীকাত (ইহরাম বাঁধার স্থান)?' }, a: { en: 'Dhul-Hulayfah (Madinah), Al-Juhfah (Sham/Egypt), Qarn al-Manazil (Najd/Ta\'if), Yalamlam (Yemen), Dhat Irq (Iraq). Air travellers assume ihram when passing over these points.', bn: 'যুল-হুলাইফা (মদিনা), আল-জুহফা (সিরিয়া/মিসর), কারনুল মানাজিল (নাজদ/তায়িফ), ইয়ালামলাম (ইয়েমেন), যাতু ইরক (ইরাক)। বিমানযাত্রীরা এসব স্থান অতিক্রমকালে ইহরাম বাঁধেন।' } },
              { q: { en: 'What if a woman gets her period during Hajj?', bn: 'হজের মধ্যে মহিলার ঋতুস্রাব হলে?' }, a: { en: 'She does everything except Tawaf. She may still enter ihram, stand at Arafah, spend the night at Muzdalifah, and stone the Jamarat. Tawaf is delayed until purity is restored.', bn: 'তাওয়াফ ছাড়া সব করেন। ইহরাম বাঁধেন, আরাফায় দাঁড়ান, মুজদালিফায় রাত কাটান, জামারায় পাথর মারেন। পবিত্র হওয়া পর্যন্ত তাওয়াফ পিছিয়ে দেন।' } },
              { q: { en: 'What is the reward of an accepted Hajj?', bn: 'হজে মাবরুরের প্রতিদান কী?' }, a: { en: 'Paradise. "An accepted Hajj has no reward but Paradise." (Bukhari & Muslim) And it wipes previous sins as though the day one\'s mother bore them.', bn: 'জান্নাত। "হজে মাবরুরের বিনিময় জান্নাত ছাড়া কিছু নয়।" (বুখারি ও মুসলিম) এবং পূর্ববর্তী গুনাহ মাফ হয় জন্মদিনের মতো।' } },
              { q: { en: 'What is Tawaf al-Wida?', bn: 'তাওয়াফুল বিদা কী?' }, a: { en: 'The farewell Tawaf — the final Tawaf before leaving Makkah. Obligatory except for menstruating women.', bn: 'বিদায়ী তাওয়াফ — মক্কা ছাড়ার আগে সর্বশেষ তাওয়াফ। ঋতুবতী মহিলা ছাড়া সবার জন্য ওয়াজিব।' } },
              { q: { en: 'Which pillar (rukn) of Islam does Hajj represent?', bn: 'হজ ইসলামের কোন স্তম্ভ?' }, a: { en: 'The fifth and final pillar — obligatory once in a lifetime on every capable adult Muslim (3:97).', bn: 'পঞ্চম ও শেষ স্তম্ভ — সামর্থ্যবান প্রত্যেক প্রাপ্তবয়স্ক মুসলিমের উপর জীবনে একবার ফরজ (৩:৯৭)।' } },
              { q: { en: 'What is the ruling (hukm) if a pilgrim misses the Wuquf at Arafah entirely?', bn: 'কোনো হাজি যদি আরাফায় উকুফ সম্পূর্ণ মিস করেন তাহলে বিধান কী?' }, a: { en: 'Wuquf at Arafah is the supreme pillar of Hajj — "Hajj is Arafah." (Tirmidhi). Missing it entirely without valid excuse nullifies the Hajj; it must be made up the following year along with a dam (sacrificial animal). The valid window is from noon on the 9th to the dawn of the 10th Dhul-Hijjah.', bn: 'আরাফায় উকুফ হজের সর্বোচ্চ রুকন — "হজই আরাফা।" (তিরমিযি)। বৈধ কারণ ছাড়া সম্পূর্ণ বাদ দিলে হজ বাতিল হয়ে যায়; পরবর্তী বছর কাযা করতে হবে এবং দম দিতে হবে। সময়সীমা: ৯ জিলহজ দুপুর থেকে ১০ জিলহজ ভোর পর্যন্ত।' } },
              { q: { en: 'What are the sunnah acts of Tawaf specific to men — Idtiba and Ramal?', bn: 'পুরুষদের জন্য তাওয়াফের বিশেষ সুন্নাত — ইদতিবা ও রামাল কী?' }, a: { en: 'Two sunnahs unique to men in Tawaf al-Qudum (arrival tawaf): (1) Idtiba — draping the ihram sheet under the right armpit so the right shoulder is exposed throughout all seven circuits. (2) Ramal — brisk short-stepped walking in the first three of seven circuits. Both demonstrate physical strength; Ibn Kathir notes they were done to show the Mushrikeen at Hudaybiyah that the Muslims were vigorous.', bn: 'পুরুষদের তাওয়াফুল কুদুমে দুটি সুন্নাত: (১) ইদতিবা — চাদর ডান বগলের নিচ দিয়ে পরে সাত চক্র জুড়ে ডান কাঁধ উন্মুক্ত রাখা। (২) রামাল — প্রথম তিন চক্রে দ্রুত ছোট পদক্ষেপে হাঁটা। হুদাইবিয়ায় মুশরিকদের সামনে মুসলিমদের শারীরিক সক্ষমতা প্রমাণ করতে এগুলো করা হয়েছিল।' } },
              { q: { en: 'In detail: how do Tamattu, Qiran, and Ifrad differ in obligations and dam?', bn: 'বিস্তারিত: তামাত্তু, কিরান ও ইফরাদের দায়িত্ব ও দমে পার্থক্য কী?' }, a: { en: '(1) Tamattu\': enter ihram for Umrah at Miqat, complete Umrah, exit ihram, then re-enter ihram for Hajj on 8th Dhul-Hijjah — dam obligatory. (2) Qiran: one ihram for both Umrah and Hajj with no exit in between — dam obligatory. (3) Ifrad: Hajj only with no Umrah in the same trip — no dam required. The Prophet \ufdfa performed Qiran and recommended Tamattu\' for his Companions at the Farewell Hajj.', bn: '(১) তামাত্তু: মীকাতে উমরার ইহরাম, উমরা সম্পন্ন, ইহরাম খুলুন, তারপর ৮ জিলহজ হজের ইহরাম — দম ওয়াজিব। (২) কিরান: উমরা ও হজের জন্য একসাথে একটি ইহরাম, মাঝে বের হওয়া যাবে না — দম ওয়াজিব। (৩) ইফরাদ: শুধু হজ, উমরা নেই — কোনো দম নেই। নবী \ufdfa কিরান করেছিলেন এবং সাহাবিদের জন্য তামাত্তু সুপারিশ করেছিলেন।' } },
              { q: { en: 'What are the kaffarah (expiations) for violating ihram prohibitions?', bn: 'ইহরামের নিষিদ্ধ কাজ করলে কাফফারা কী?' }, a: { en: 'Three categories: (a) Minor violations — cutting hair/nails, perfume, forbidden clothing: fidyah — choose one of: fast 3 days, feed 6 poor people (half a Sa\' each), or sacrifice a sheep (2:196). (b) Hunting land game: replace with equivalent livestock, feed the poor, or fast. (c) Sexual intercourse before the first tahallul: Hajj is nullified — complete it, repeat next year, and sacrifice a camel (the gravest violation).', bn: 'তিন শ্রেণি: (ক) ছোট লঙ্ঘন — চুল/নখ কাটা, সুগন্ধি, নিষিদ্ধ পোশাক: ফিদইয়া — তিনটির একটি: ৩ দিন রোজা, ৬ জন গরিবকে খাওয়ানো (প্রতিজন আধা সা), বা একটি ছাগল। (খ) স্থল প্রাণী শিকার: সমতুল্য পশু, গরিবকে খাওয়ানো, বা রোজা। (গ) প্রথম তাহাল্লুলের আগে সহবাস: হজ বাতিল — সম্পন্ন করুন, পরের বছর কাযা, এবং উট কুরবানি।' } },
              { q: { en: 'What is the virtue of fasting the Day of Arafah for non-pilgrims?', bn: 'হাজি নন এমন ব্যক্তির জন্য আরাফার দিন রোজার ফজিলত কী?' }, a: { en: 'The Prophet \ufdfa said: "Fasting on the Day of Arafah — I hope from Allah that it expiates the sins of the previous year and the coming year." (Sahih Muslim 1162). It is a confirmed sunnah for those not on Hajj. Pilgrims themselves do not fast on this day — they need full strength for the rites, and the Prophet \ufdfa was seen eating at Arafah.', bn: 'নবী \ufdfa বলেছেন: "আরাফার দিনের রোজা — আমি আশা করি আল্লাহ আগের বছর ও পরের বছরের গুনাহ মাফ করবেন।" (সহীহ মুসলিম ১১৬২)। যারা হজে নেই তাদের জন্য এটি সুন্নাতে মুয়াক্কাদা। হাজিরা রোজা রাখবেন না — আচার পালনে পূর্ণ শক্তি প্রয়োজন এবং নবী \ufdfa আরাফায় খেতে দেখা গেছেন।' } },
              { q: { en: 'Can Hajj be performed on behalf of a deceased person or someone permanently unable?', bn: 'মৃত বা স্থায়ীভাবে অক্ষম ব্যক্তির পক্ষে কি হজ করা যায়?' }, a: { en: 'Yes — Hajj Badal (proxy Hajj) is valid. The proxy must have already completed their own obligatory Hajj. Evidence: a woman from Khath\'am asked the Prophet \ufdfa whether she could perform Hajj on behalf of her elderly father who could not ride; he said yes (Sahih al-Bukhari 1513). The same ruling applies by consensus for those who die before performing Hajj.', bn: 'হ্যাঁ — হজে বদল (প্রক্সি হজ) বৈধ। শর্ত: প্রক্সি ব্যক্তি নিজের ফরজ হজ আগেই করেছেন। দলিল: খাসআম গোত্রের একজন মহিলা বৃদ্ধ বাবার পক্ষে হজ করার অনুমতি চাইলে নবী \ufdfa সম্মতি দেন (সহীহ বুখারী ১৫১৩)। হজের আগে মারা গেলেও একই বিধান প্রযোজ্য।' } },
              { q: { en: 'What is the ruling on Tawaf al-Wida for a menstruating woman?', bn: 'ঋতুবতী মহিলার জন্য তাওয়াফুল বিদার বিধান কী?' }, a: { en: 'It is waived for her alone — no fidyah required. When Safiyyah (RA) got her period before departure, the Prophet \ufdfa asked whether she would delay them. When told she had already completed Tawaf al-Ifadah, he said: "Then she may depart." (Sahih al-Bukhari 1757). All other pilgrims must perform it; missing it requires a dam (sacrifice) according to the majority.', bn: 'শুধু তার জন্য মাফ — কোনো ফিদইয়া নেই। সফিয়া (রাঃ) বিদায়ের আগে ঋতুবতী হলে নবী \ufdfa জিজ্ঞেস করলেন সে কি দেরি করাবে। জানতে পেরে যে তিনি ইতোমধ্যে তাওয়াফে ইফাদা সম্পন্ন করেছেন, বললেন: "তাহলে সে চলে যেতে পারে।" (সহীহ বুখারী ১৭৫৭)। অন্য সবার জন্য ওয়াজিব; বাদ দিলে জমহুরের মতে দম দিতে হবে।' } },
              { q: { en: 'What defines Hajj Mabrur (accepted Hajj) and how is it recognised?', bn: 'হজে মাবরুর কী এবং কীভাবে চেনা যায়?' }, a: { en: 'Scholars define Hajj Mabrur as a Hajj performed with: (1) sincere intention for Allah alone, (2) halal wealth, (3) all rites performed correctly per sunnah, and (4) avoidance of major sins throughout. Ibn Rajab al-Hanbali wrote: the sign of acceptance is that the person returns morally better than before — turned away from previous sins. Its sole reward is Paradise (Bukhari & Muslim).', bn: 'আলিমরা হজে মাবরুর সংজ্ঞায়িত করেন: (১) একমাত্র আল্লাহর জন্য নিয়ত, (২) হালাল সম্পদ, (৩) সুন্নাহ অনুযায়ী সব আচার পালন, (৪) কবিরা গুনাহ থেকে বিরত থাকা। ইবনে রজব আল-হাম্বালি লিখেছেন: কবুল হওয়ার চিহ্ন হলো ব্যক্তি পূর্বের চেয়ে নৈতিকভাবে উন্নত হয়ে ফিরে আসেন। এর একমাত্র প্রতিদান জান্নাত (বুখারী ও মুসলিম)।' } },
            ].map(item => `
              <details class="rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/40 overflow-hidden">
                <summary class="flex items-center gap-2 p-3 cursor-pointer list-none hover:bg-emerald-100/50 dark:hover:bg-emerald-900/30">
                  <span class="text-emerald-600 dark:text-emerald-400 text-sm">❓</span>
                  <span class="flex-1 text-sm font-medium text-gray-800 dark:text-gray-100" dir="auto">${L(item.q)}</span>
                  <span class="text-emerald-500 text-xs">▼</span>
                </summary>
                <div class="px-4 pb-3 pt-1 text-xs text-gray-700 dark:text-gray-200 leading-relaxed border-t border-emerald-100 dark:border-emerald-900/40" dir="auto">✅ ${L(item.a)}</div>
              </details>`).join('')}
          </div>
        </div>

      </div>`;
  }

  handleClick(e) {
    const ayah = e.target.closest('[data-hajj-ayah]');
    if (ayah) { this.openAyah(ayah.getAttribute('data-hajj-ayah')); return; }
  }

  openAyah(ref) {
    try {
      if (typeof ayahModal !== 'undefined' && ayahModal && typeof ayahModal.open === 'function') {
        ayahModal.open(ref);
      }
    } catch (_) { }
  }
}

let hajjModule;
document.addEventListener('DOMContentLoaded', () => { hajjModule = new HajjModule(); });
