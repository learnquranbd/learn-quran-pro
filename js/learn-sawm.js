class SawmModule {
  constructor() {
    this.root = document.getElementById('sawm-root');
    if (!this.root) return;
    this.language = (typeof appSettings !== 'undefined' && appSettings) ? appSettings.get('language') : 'en';
    this.rendered = false;

    window.addEventListener('tabChanged', (e) => {
      try { if (e && e.detail && e.detail.tabId === 'sawm') this.render(); } catch (_) { }
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
          <div class="p-6 bg-gradient-to-br from-amber-50 to-transparent dark:from-amber-900/10">
            <div class="text-4xl mb-2" aria-hidden="true">🌅</div>
            <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100">${T('learn_sawm_title')}</h2>
            <p class="text-gray-500 dark:text-gray-400 mt-1 text-sm">${L({ en: 'Fasting in Ramadan — one of the five pillars of Islam.', bn: 'রমজানের রোজা — ইসলামের পঞ্চস্তম্ভের একটি।' })}</p>
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">📖 ${T('learn_sawm_title')} ${L({ en: 'in the Quran', bn: 'কুরআনে' })}</h3>
          <div class="space-y-3">
            <div class="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/40">
              <p class="text-sm text-amber-800 dark:text-amber-200 leading-relaxed" dir="auto">${L({ en: '"O you who have believed, decreed upon you is fasting as it was decreed upon those before you that you may become righteous."', bn: '"হে ঈমানদারগণ! তোমাদের উপর রোজা ফরয করা হয়েছে, যেমন ফরয করা হয়েছিল তোমাদের পূর্ববর্তীদের উপর, যাতে তোমরা তাকওয়া অবলম্বন করতে পার।"' })}</p>
              <button type="button" data-sawm-ayah="2:183" class="mt-2 inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs font-medium hover:bg-amber-500 hover:text-white transition-colors">📖 2:183 ${L({ en: 'Read', bn: 'পড়ুন' })}</button>
            </div>
            <div class="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/40">
              <p class="text-sm text-amber-800 dark:text-amber-200 leading-relaxed" dir="auto">${L({ en: '"The month of Ramadan [is that] in which was revealed the Qur\'an, a guidance for the people and clear proofs of guidance and criterion. So whoever sights [the new moon of] the month, let him fast it."', bn: '"রমজান মাস, যাতে কুরআন নাযিল করা হয়েছে মানুষের জন্য হিদায়াতস্বরূপ এবং হিদায়াত ও ফুরকানের সুস্পষ্ট প্রমাণস্বরূপ। সুতরাং তোমাদের মধ্যে যে এই মাস পাবে, সে যেন রোজা রাখে।"' })}</p>
              <button type="button" data-sawm-ayah="2:185" class="mt-2 inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs font-medium hover:bg-amber-500 hover:text-white transition-colors">📖 2:185 ${L({ en: 'Read', bn: 'পড়ুন' })}</button>
            </div>
            <div class="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/40">
              <p class="text-sm text-amber-800 dark:text-amber-200 leading-relaxed" dir="auto">${L({ en: '"And eat and drink until the white thread of dawn becomes distinct to you from the black thread [of night]. Then complete the fast until the night."', bn: '"আর তোমরা পানাহর কর যতক্ষণ না ফজরের শুভ্র রেখা কালো রেখা থেকে স্পষ্ট হয়। এরপর রাত পর্যন্ত রোজা পূর্ণ কর।"' })}</p>
              <button type="button" data-sawm-ayah="2:187" class="mt-2 inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs font-medium hover:bg-amber-500 hover:text-white transition-colors">📖 2:187 ${L({ en: 'Read', bn: 'পড়ুন' })}</button>
            </div>
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">💡 ${L({ en: 'Key Rulings', bn: 'প্রধান বিধান' })}</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40">
              <div class="text-sm font-semibold text-gray-700 dark:text-gray-200">${L({ en: 'Who must fast', bn: 'কারা রোজা রাখবে' })}</div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1" dir="auto">${L({ en: 'Every adult, sane, healthy Muslim who is resident (not traveling).', bn: 'প্রত্যেক প্রাপ্তবয়স্ক, সুস্থ বিবেকসম্পন্ন, মুকিম মুসলিম।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40">
              <div class="text-sm font-semibold text-gray-700 dark:text-gray-200">${L({ en: 'Exemptions', bn: 'ব্যতিক্রম' })}</div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1" dir="auto">${L({ en: 'Travelers, sick, elderly, pregnant/nursing, menstruating — make up later or pay fidya.', bn: 'মুসাফির, অসুস্থ, বৃদ্ধ, গর্ভবতী/দুধদানকারী, হায়েজ — পরে কাযা বা ফিদইয়া।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40">
              <div class="text-sm font-semibold text-gray-700 dark:text-gray-200">${L({ en: 'Nullifiers', bn: 'রোজা ভঙ্গের কারণ' })}</div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1" dir="auto">${L({ en: 'Eating/drinking intentionally, smoking, sexual relations, menstruation.', bn: 'ইচ্ছাকৃত পানাহার, ধূমপান, স্ত্রীসঙ্গম, ঋতুস্রাব।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40">
              <div class="text-sm font-semibold text-gray-700 dark:text-gray-200">${L({ en: 'Recommended', bn: 'মুস্তাহাব' })}</div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1" dir="auto">${L({ en: 'Suhur (pre-dawn meal), iftar promptly, tarawih prayer, increased charity.', bn: 'সেহরি, দ্রুত ইফতার, তারাবিহ, বেশি দান-সদকা।' })}</p>
            </div>
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">🌸 ${L({ en: 'Spiritual Benefits', bn: 'আধ্যাত্মিক ফজিলত' })}</h3>
          <ul class="space-y-2">
            <li class="flex gap-2 text-sm text-gray-600 dark:text-gray-300" dir="auto"><span class="text-green-500 shrink-0">✓</span> ${L({ en: 'Develops taqwa (God-consciousness) — 2:183', bn: 'তাকওয়া অর্জন — ২:১৮৩' })}</li>
            <li class="flex gap-2 text-sm text-gray-600 dark:text-gray-300" dir="auto"><span class="text-green-500 shrink-0">✓</span> ${L({ en: 'Sins are forgiven — Ramadan is a month of mercy', bn: 'গুনাহ মাফ — রমজান রহমতের মাস' })}</li>
            <li class="flex gap-2 text-sm text-gray-600 dark:text-gray-300" dir="auto"><span class="text-green-500 shrink-0">✓</span> ${L({ en: 'Teaches self-discipline, patience, and empathy for the poor', bn: 'আত্মনিয়ন্ত্রণ, ধৈর্য ও গরিবদের প্রতি সহানুভূতি শিক্ষা দেয়' })}</li>
            <li class="flex gap-2 text-sm text-gray-600 dark:text-gray-300" dir="auto"><span class="text-green-500 shrink-0">✓</span> ${L({ en: 'Quran was revealed in this month — 2:185', bn: 'এই মাসে কুরআন নাযিল হয়েছে — ২:১৮৫' })}</li>
          </ul>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">📚 ${L({ en: 'More Quranic References', bn: 'আরও কুরআনি রেফারেন্স' })}</h3>
          <div class="flex flex-wrap gap-2">
            <button type="button" data-sawm-ayah="2:184" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary hover:text-white transition-colors">📖 2:184</button>
            <button type="button" data-sawm-ayah="33:35" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary hover:text-white transition-colors">📖 33:35</button>
            <button type="button" data-sawm-ayah="4:92" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary hover:text-white transition-colors">📖 4:92</button>
            <button type="button" data-sawm-ayah="5:89" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary hover:text-white transition-colors">📖 5:89</button>
            <button type="button" data-sawm-ayah="5:95" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary hover:text-white transition-colors">📖 5:95</button>
            <button type="button" data-sawm-ayah="2:187" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary hover:text-white transition-colors">📖 2:187</button>
            <button type="button" data-sawm-ayah="19:26" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary hover:text-white transition-colors">📖 19:26</button>
            <button type="button" data-sawm-ayah="97:1" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary hover:text-white transition-colors">📖 97:1</button>
            <button type="button" data-sawm-ayah="44:3" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary hover:text-white transition-colors">📖 44:3</button>
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">🤲 ${L({ en: 'Iftar Dua', bn: 'ইফতারের দোয়া' })}</h3>
          <div class="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/40">
            <p class="text-lg text-amber-800 dark:text-amber-200 text-center font-arabic leading-loose" dir="rtl">اللَّهُمَّ لَكَ صُمْتُ وَعَلَى رِزْقِكَ أَفْطَرْتُ</p>
            <p class="text-xs text-amber-600 dark:text-amber-400 text-center mt-1 italic">Allahumma laka sumtu wa \'ala rizqika aftartu</p>
            <p class="text-sm text-amber-800 dark:text-amber-200 text-center mt-1">${L({ en: '"O Allah, for You I have fasted, and upon Your provision I have broken my fast."', bn: '"হে আল্লাহ, তোমারই জন্য আমি রোজা রেখেছি এবং তোমারই রিযিকের মাধ্যমে ইফতার করছি।"' })}</p>
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">📜 ${L({ en: 'Hadith on Fasting', bn: 'রোজা সম্পর্কে হাদিস' })}</h3>
          <div class="space-y-3">
            <div class="p-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/40">
              <p class="text-sm text-green-800 dark:text-green-200 leading-relaxed" dir="auto">${L({ en: '"Whoever fasts Ramadan with faith and hope of reward, his previous sins will be forgiven." — Sahih al-Bukhari', bn: '"যে ব্যক্তি ঈমান ও সওয়াবের আশায় রমজানের রোজা রাখে, তার পূর্ববর্তী গুনাহ মাফ করে দেওয়া হয়।" — সহীহ বুখারি' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/40">
              <p class="text-sm text-green-800 dark:text-green-200 leading-relaxed" dir="auto">${L({ en: '"The smell of the mouth of a fasting person is more pleasant to Allah than the scent of musk." — Sahih al-Bukhari', bn: '"রোজাদারের মুখের গন্ধ আল্লাহর কাছে মিশকের সুগন্ধির চেয়েও প্রিয়।" — সহীহ বুখারি' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/40">
              <p class="text-sm text-green-800 dark:text-green-200 leading-relaxed" dir="auto">${L({ en: '"There is a gate in Paradise called Ar-Rayyan. On the Day of Resurrection, it will be said, \'Where are those who fasted?\' None enter through it except them." — Sahih al-Bukhari', bn: '"জান্নাতে একটি দরজা আছে, যার নাম আর-রাইয়ান। কিয়ামতের দিন ঘোষণা করা হবে, \'রোজাদাররা কোথায়?\' তারা ছাড়া আর কেউ এই দরজা দিয়ে প্রবেশ করবে না।" — সহীহ বুখারি' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/40">
              <p class="text-sm text-green-800 dark:text-green-200 leading-relaxed" dir="auto">${L({ en: '"When Ramadan comes, the gates of Paradise are opened, the gates of Hell are closed, and the devils are chained." — Sahih al-Bukhari', bn: '"রমজান আসলে জান্নাতের দরজাসমূহ খুলে দেওয়া হয়, জাহান্নামের দরজাসমূহ বন্ধ করে দেওয়া হয় এবং শয়তানদের শৃঙ্খলিত করা হয়।" — সহীহ বুখারি' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/40">
              <p class="text-sm text-green-800 dark:text-green-200 leading-relaxed" dir="auto">${L({ en: '"Fasting is a shield; so when one of you is fasting he should not behave obscenely or quarrel, and if someone fights him, let him say: I am fasting." — Sahih al-Bukhari & Muslim', bn: '"রোজা ঢাল; সুতরাং যখন তোমাদের কেউ রোজা রাখে, সে যেন অশ্লীল কথা না বলে ও ঝগড়া না করে। যদি কেউ তার সাথে লড়াই করে, সে যেন বলে: আমি রোজা রেখেছি।" — সহীহ বুখারি ও মুসলিম' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/40">
              <p class="text-sm text-green-800 dark:text-green-200 leading-relaxed" dir="auto">${L({ en: '"Allah said: Every deed of the son of Adam is for him except fasting — it is for Me and I shall reward it." (Hadith Qudsi) — Sahih al-Bukhari & Muslim', bn: '"আল্লাহ বলেন: আদম সন্তানের প্রতিটি আমল তার জন্য — কিন্তু রোজা ব্যতীত; তা আমার জন্য এবং আমিই এর প্রতিদান দেব।" (হাদিস কুদসি) — সহীহ বুখারি ও মুসলিম' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/40">
              <p class="text-sm text-green-800 dark:text-green-200 leading-relaxed" dir="auto">${L({ en: '"The fasting person has two occasions for joy: when he breaks his fast and when he meets his Lord." — Sahih al-Bukhari & Muslim', bn: '"রোজাদারের দুটি আনন্দ মুহূর্ত রয়েছে: ইফতারের সময় এবং যখন সে তার রবের সাথে মিলিত হবে।" — সহীহ বুখারি ও মুসলিম' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/40">
              <p class="text-sm text-green-800 dark:text-green-200 leading-relaxed" dir="auto">${L({ en: '"Whoever does not give up false speech and acting upon it, Allah has no need of his leaving food and drink." — Sahih al-Bukhari', bn: '"যে ব্যক্তি মিথ্যা কথা ও তদনুযায়ী আমল ত্যাগ করে না, তার পানাহার ত্যাগে আল্লাহর কোনো প্রয়োজন নেই।" — সহীহ বুখারি' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/40">
              <p class="text-sm text-green-800 dark:text-green-200 leading-relaxed" dir="auto">${L({ en: '"Have suhur, for in suhur there is blessing." — Sahih al-Bukhari & Muslim', bn: '"সেহরি খাও, কেননা সেহরিতে বরকত রয়েছে।" — সহীহ বুখারি ও মুসলিম' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/40">
              <p class="text-sm text-green-800 dark:text-green-200 leading-relaxed" dir="auto">${L({ en: '"Hasten to break the fast, for the people will remain in good condition as long as they hasten to break the fast." — Sahih al-Bukhari & Muslim', bn: '"ইফতার করতে তাড়া করো; যতদিন মানুষ তাড়াতাড়ি ইফতার করবে ততদিন তারা কল্যাণে থাকবে।" — সহীহ বুখারি ও মুসলিম' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/40">
              <p class="text-sm text-green-800 dark:text-green-200 leading-relaxed" dir="auto">${L({ en: '"Fasting and the Quran will intercede for the servant on the Day of Resurrection. Fasting will say: O Lord, I prevented him from food and desires — accept my intercession. The Quran will say: I prevented him from sleep at night — accept my intercession." — Musnad Ahmad (sahih)', bn: '"রোজা ও কুরআন কিয়ামতের দিন বান্দার জন্য সুপারিশ করবে। রোজা বলবে: হে রব, আমি তাকে খাবার ও প্রবৃত্তি থেকে বিরত রেখেছি — আমার সুপারিশ কবুল করুন। কুরআন বলবে: আমি তাকে রাতের ঘুম থেকে বিরত রেখেছি — আমার সুপারিশ কবুল করুন।" — মুসনাদ আহমাদ (সহীহ)' })}</p>
            </div>
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">🔍 ${L({ en: 'Tafsir of 2:183-187 — The Fasting Verses', bn: 'সূরা বাকারা ২:১৮৩-১৮৭ — রোজার আয়াতের তাফসির' })}</h3>
          <p class="text-xs text-gray-500 dark:text-gray-400 mb-3" dir="auto">${L({ en: 'Brief bilingual commentary on the core fasting verses — drawn from Ibn Kathir\'s Tafsir al-Quran al-Azim and classical scholarship.', bn: 'মূল রোজার আয়াতগুলোর সংক্ষিপ্ত দ্বিভাষিক তাফসির — ইবনে কাসিরের তাফসির আল-কুরআন আল-আজিম ও ক্লাসিক্যাল গ্রন্থ থেকে।' })}</p>
          <div class="space-y-3">
            <div class="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/40">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-xs font-bold text-amber-700 dark:text-amber-300 bg-amber-200/60 dark:bg-amber-800/40 px-2 py-0.5 rounded">2:183</span>
                <button type="button" data-sawm-ayah="2:183" class="text-xs text-amber-600 dark:text-amber-400 hover:underline">📖 ${L({ en: 'Read', bn: 'পড়ুন' })}</button>
              </div>
              <p class="text-sm text-amber-800 dark:text-amber-200 leading-relaxed" dir="auto">${L({ en: 'Allah addresses the believers directly — "O you who have believed" — tying fasting to faith itself. Fasting was decreed for earlier nations too, confirming its universal spiritual value across all revealed religions. The word "kutiba" (decreed) is the same used for obligatory prayer, indicating fasting\'s firm obligation. The ultimate purpose is taqwa: heightened God-consciousness that shapes every action.', bn: 'আল্লাহ সরাসরি মুমিনদের সম্বোধন করেন — "হে ঈমানদারগণ" — রোজাকে ঈমানের সাথে যুক্ত করে। পূর্ববর্তী উম্মতের জন্যও রোজা ফরজ ছিল, যা এর সার্বজনীন আধ্যাত্মিক মূল্য প্রমাণ করে। "কুতিবা" শব্দটি নামাজের জন্যও ব্যবহৃত হয়েছে, যা রোজার দৃঢ় বাধ্যবাধকতা নির্দেশ করে। চূড়ান্ত উদ্দেশ্য হলো তাকওয়া — গভীর আল্লাহ-সচেতনতা।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/40">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-xs font-bold text-amber-700 dark:text-amber-300 bg-amber-200/60 dark:bg-amber-800/40 px-2 py-0.5 rounded">2:184</span>
                <button type="button" data-sawm-ayah="2:184" class="text-xs text-amber-600 dark:text-amber-400 hover:underline">📖 ${L({ en: 'Read', bn: 'পড়ুন' })}</button>
              </div>
              <p class="text-sm text-amber-800 dark:text-amber-200 leading-relaxed" dir="auto">${L({ en: 'This verse establishes the mercy-based exemptions: the sick and the traveler may break the fast and make up an equal number of days. Those permanently unable to fast — the elderly and chronically ill — pay fidyah (feeding one poor person per missed day). Ibn Kathir notes the early Muslims had a choice between fasting or fidyah, but 2:185 then made fasting obligatory for those who are present and able.', bn: 'এই আয়াত রহমত-ভিত্তিক ছাড় নির্ধারণ করে: অসুস্থ ও মুসাফির রোজা ভেঙে পরে সমান দিন কাযা করবে। স্থায়ীভাবে অক্ষম — বৃদ্ধ ও দীর্ঘমেয়াদী রোগী — ফিদইয়া দেবে (প্রতিটি রোজার জন্য একজন দরিদ্রকে খাওয়ানো)। ইবনে কাসির বলেন, শুরুতে মুসলিমদের রোজা বা ফিদইয়ার বিকল্প ছিল, কিন্তু ২:১৮৫ আয়াত সক্ষম মুকিমদের জন্য রোজাকে বাধ্যতামূলক করে।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/40">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-xs font-bold text-amber-700 dark:text-amber-300 bg-amber-200/60 dark:bg-amber-800/40 px-2 py-0.5 rounded">2:185</span>
                <button type="button" data-sawm-ayah="2:185" class="text-xs text-amber-600 dark:text-amber-400 hover:underline">📖 ${L({ en: 'Read', bn: 'পড়ুন' })}</button>
              </div>
              <p class="text-sm text-amber-800 dark:text-amber-200 leading-relaxed" dir="auto">${L({ en: 'Ramadan is identified as the month of the Quran\'s revelation — making it the most blessed month. Whoever witnesses the crescent must fast the full month. The traveler\'s exemption is repeated, emphasising Allah\'s mercy. The verse closes with "Allah intends for you ease, not hardship" — a foundational principle of Islamic law (la haraj). The phrase "walitukammilu al-\'iddata" commands completing the full count of days.', bn: 'রমজানকে কুরআন নাযিলের মাস হিসেবে চিহ্নিত করা হয়েছে — এটিকে সর্বোচ্চ মর্যাদার মাস করে। যে এই মাস পাবে সে পূর্ণ মাস রোজা রাখবে। মুসাফিরের ছাড় পুনরাবৃত্তি করে আল্লাহর রহমত তুলে ধরা হয়। আয়াতটি "আল্লাহ তোমাদের জন্য সহজ চান, কঠিন চান না" দিয়ে শেষ হয় — ইসলামি বিধানের ভিত্তিমূলক নীতি (লা হারাজ)।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/40">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-xs font-bold text-amber-700 dark:text-amber-300 bg-amber-200/60 dark:bg-amber-800/40 px-2 py-0.5 rounded">2:186</span>
              </div>
              <p class="text-sm text-amber-800 dark:text-amber-200 leading-relaxed" dir="auto">${L({ en: 'Placed between the fasting verses, this verse responds to a question about whether Allah is near or distant. Allah declares: "I am near — I answer the caller when he calls upon Me." Scholars note this was revealed when a companion asked: "Is our Lord near so we speak secretly, or far so we call out?" Its placement signals that du\'a during Ramadan — especially at the time of iftar — receives special divine attention.', bn: 'রোজার আয়াতের মাঝখানে এই আয়াতটি আল্লাহর নৈকট্য বিষয়ক প্রশ্নের জবাব দেয়। আল্লাহ ঘোষণা করেন: "আমি নিকটেই — ডাকলে সাড়া দিই।" আলিমরা বলেন, এক সাহাবি জিজ্ঞেস করেছিলেন আল্লাহ কি নিকটে না দূরে। এর অবস্থান ইঙ্গিত দেয় যে রমজানে — বিশেষত ইফতারের সময়ের — দোয়া বিশেষ ঐশ্বরিক মনোযোগ পায়।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/40">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-xs font-bold text-amber-700 dark:text-amber-300 bg-amber-200/60 dark:bg-amber-800/40 px-2 py-0.5 rounded">2:187</span>
                <button type="button" data-sawm-ayah="2:187" class="text-xs text-amber-600 dark:text-amber-400 hover:underline">📖 ${L({ en: 'Read', bn: 'পড়ুন' })}</button>
              </div>
              <p class="text-sm text-amber-800 dark:text-amber-200 leading-relaxed" dir="auto">${L({ en: 'This verse abrogated an earlier restriction, informing believers that marital relations are permitted at night during Ramadan. The metaphor "they are garments for you and you are garments for them" — expressing profound intimacy and mutual protection — is one of the Quran\'s most beautiful descriptions of marriage. The verse precisely defines the fast: from the white thread of dawn (Fajr) to the night (Maghrib). It also commands staying in mosques for i\'tikaf and not approaching spouses during that retreat.', bn: 'এই আয়াত একটি পূর্ববর্তী নিষেধাজ্ঞা রহিত করে, মুমিনদের জানায় রমজানের রাতে দাম্পত্য মিলন বৈধ। "তারা তোমাদের পোশাক এবং তোমরা তাদের পোশাক" — গভীর ঘনিষ্ঠতা ও পারস্পরিক সুরক্ষা প্রকাশকারী — কুরআনের বিবাহের সুন্দরতম বর্ণনা। আয়াতটি রোজার সময় নির্ধারণ করে: ফজরের শুভ্র রেখা থেকে রাত পর্যন্ত এবং ইতিকাফের নির্দেশ দেয়।' })}</p>
            </div>
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">🌙 ${L({ en: 'Laylatul Qadr — The Night of Decree', bn: 'লাইলাতুল কদর — নির্ধারণের রাত' })}</h3>
          <div class="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-900/40">
            <p class="text-sm text-indigo-800 dark:text-indigo-200 leading-relaxed" dir="auto">${L({ en: 'Laylatul Qadr (the Night of Decree) is better than a thousand months. It falls in the last ten nights of Ramadan, especially on odd-numbered nights. On this night, the Quran was first revealed, and the angels descend with blessings and peace until dawn.', bn: 'লাইলাতুল কদর (নির্ধারণের রাত) হাজার মাসের চেয়ে উত্তম। এটি রমজানের শেষ দশকের বিজোড় রাত্রিগুলোর মধ্যে একটি। এই রাতে কুরআন প্রথম নাযিল হয় এবং ফেরেশতারা বারাকাত ও শান্তি নিয়ে ফজর পর্যন্ত অবতরণ করেন।' })}</p>
            <div class="flex flex-wrap gap-2 mt-3">
              <button type="button" data-sawm-ayah="97:1" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 text-xs font-medium hover:bg-indigo-500 hover:text-white transition-colors">📖 97:1-5</button>
              <button type="button" data-sawm-ayah="44:3" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 text-xs font-medium hover:bg-indigo-500 hover:text-white transition-colors">📖 44:3</button>
            </div>
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">📅 ${L({ en: 'A Day in Ramadan (Suhur → Iftar)', bn: 'রমজানের একটি দিন (সেহরি → ইফতার)' })}</h3>
          <div class="space-y-3">
            <div class="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40">
              <div class="text-sm font-semibold text-gray-700 dark:text-gray-200">🌌 ${L({ en: 'Before Fajr — Suhur & Niyyah', bn: 'ফজরের আগে — সেহরি ও নিয়ত' })}</div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1" dir="auto">${L({ en: 'Eat suhur — even a sip of water. Make the intention to fast for Allah. Eating and drinking are allowed until Subh Sadiq (true dawn, when Fajr time begins); stop at that point.', bn: 'সেহরি খান — এক ঢোক পানি হলেও। আল্লাহর জন্য রোজার নিয়ত করুন। সুবহে সাদিক (ফজরের ওয়াক্ত শুরু হওয়ার সময়) পর্যন্ত পানাহার করা যায়; সুবহে সাদিক হলে খাওয়া-দাওয়া বন্ধ করুন।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40">
              <div class="text-sm font-semibold text-gray-700 dark:text-gray-200">🕌 ${L({ en: 'Fajr → Dhuhr', bn: 'ফজর → যোহর' })}</div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1" dir="auto">${L({ en: 'Pray Fajr in congregation. Recite Quran, morning adhkar. Rest or work while fasting; guard tongue and eyes.', bn: 'জামাতে ফজর আদায় করুন। কুরআন তিলাওয়াত, সকালের যিকির। রোজা রেখে বিশ্রাম বা কাজ করুন; মুখ ও চোখ সংযত রাখুন।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40">
              <div class="text-sm font-semibold text-gray-700 dark:text-gray-200">☀️ ${L({ en: 'Dhuhr → Asr', bn: 'যোহর → আসর' })}</div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1" dir="auto">${L({ en: 'Pray Dhuhr on time. A short qaylulah (nap) is sunnah. Increase in dhikr, dua and Quran review.', bn: 'সময়মতো যোহর পড়ুন। সংক্ষিপ্ত কাইলুলাহ (দিবানিদ্রা) সুন্নাত। যিকির, দোয়া ও কুরআন পুনরালোচনা বাড়ান।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40">
              <div class="text-sm font-semibold text-gray-700 dark:text-gray-200">🌇 ${L({ en: 'Asr → Maghrib (Iftar)', bn: 'আসর → মাগরিব (ইফতার)' })}</div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1" dir="auto">${L({ en: 'Best time for dua — a fasting person\'s dua at iftar is not rejected. Break the fast promptly with dates and water. Then pray Maghrib.', bn: 'দোয়ার সর্বোত্তম সময় — ইফতারের সময় রোজাদারের দোয়া প্রত্যাখ্যাত হয় না। খেজুর ও পানি দিয়ে দ্রুত ইফতার করুন। এরপর মাগরিব আদায় করুন।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40">
              <div class="text-sm font-semibold text-gray-700 dark:text-gray-200">🌙 ${L({ en: 'Isha & Tarawih', bn: 'ইশা ও তারাবিহ' })}</div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1" dir="auto">${L({ en: 'Pray Isha in congregation, followed by 8 or 20 rak\'ahs of Tarawih. In the last ten nights, add Tahajjud and increase i\'tikaf.', bn: 'জামাতে ইশা আদায় করুন, এরপর ৮ বা ২০ রাকাত তারাবিহ। শেষ দশ রাতে তাহাজ্জুদ যোগ করুন এবং ইতিকাফ বাড়ান।' })}</p>
            </div>
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">⭐ ${L({ en: 'Sunnah & Voluntary Fasts', bn: 'সুন্নাত ও নফল রোজা' })}</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/40">
              <div class="text-sm font-semibold text-amber-800 dark:text-amber-200">${L({ en: '6 Days of Shawwal', bn: 'শাওয়ালের ৬ রোজা' })}</div>
              <p class="text-xs text-amber-700 dark:text-amber-300 mt-1" dir="auto">${L({ en: 'Fasting Ramadan + six days of Shawwal is like fasting the whole year. (Muslim)', bn: 'রমজানের পর শাওয়ালের ছয় রোজা রাখলে সারা বছর রোজা রাখার সওয়াব। (মুসলিম)' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/40">
              <div class="text-sm font-semibold text-amber-800 dark:text-amber-200">${L({ en: 'Day of Arafah (9th Dhul-Hijjah)', bn: 'আরাফার দিন (৯ জিলহজ)' })}</div>
              <p class="text-xs text-amber-700 dark:text-amber-300 mt-1" dir="auto">${L({ en: 'For non-pilgrims: expiates sins of the past and coming year. (Muslim)', bn: 'হাজী নয় এমন ব্যক্তির জন্য: গত ও আগামী বছরের গুনাহ মাফ। (মুসলিম)' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/40">
              <div class="text-sm font-semibold text-amber-800 dark:text-amber-200">${L({ en: 'Day of Ashura (10th Muharram)', bn: 'আশুরার দিন (১০ মহররম)' })}</div>
              <p class="text-xs text-amber-700 dark:text-amber-300 mt-1" dir="auto">${L({ en: 'Expiates sins of the past year. Recommended to fast the 9th and 10th together to differ from Jews. (Muslim)', bn: 'গত বছরের গুনাহ মাফ। ইহুদিদের থেকে ভিন্ন হতে ৯ ও ১০ তারিখ একসাথে রোজা রাখা মুস্তাহাব। (মুসলিম)' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/40">
              <div class="text-sm font-semibold text-amber-800 dark:text-amber-200">${L({ en: 'Mondays & Thursdays', bn: 'সোম ও বৃহস্পতিবার' })}</div>
              <p class="text-xs text-amber-700 dark:text-amber-300 mt-1" dir="auto">${L({ en: 'Deeds are presented to Allah — the Prophet ﷺ liked his deeds to be presented while he was fasting. (Tirmidhi)', bn: 'আমল আল্লাহর কাছে পেশ করা হয় — নবী ﷺ চাইতেন তাঁর আমল রোজা অবস্থায় পেশ করা হোক। (তিরমিযি)' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/40">
              <div class="text-sm font-semibold text-amber-800 dark:text-amber-200">${L({ en: 'White Days (13, 14, 15 of each lunar month)', bn: 'আইয়্যামে বীজ (প্রতি চান্দ্র মাসের ১৩, ১৪, ১৫)' })}</div>
              <p class="text-xs text-amber-700 dark:text-amber-300 mt-1" dir="auto">${L({ en: 'Fasting three days of each month is like fasting for a lifetime. (Bukhari & Muslim)', bn: 'প্রতি মাসে তিন দিন রোজা রাখা সারা জীবন রোজা রাখার সমতুল্য। (বুখারি ও মুসলিম)' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/40">
              <div class="text-sm font-semibold text-amber-800 dark:text-amber-200">${L({ en: 'Fast of Dawud (AS)', bn: 'দাউদ (আঃ)-এর রোজা' })}</div>
              <p class="text-xs text-amber-700 dark:text-amber-300 mt-1" dir="auto">${L({ en: 'Fast alternate days — this is the most beloved fasting to Allah. (Bukhari)', bn: 'একদিন পরপর রোজা — এটি আল্লাহর কাছে সবচেয়ে প্রিয় রোজা। (বুখারি)' })}</p>
            </div>
          </div>
          <div class="mt-3 p-3 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-900/40">
            <div class="text-xs font-semibold text-rose-800 dark:text-rose-200">🚫 ${L({ en: 'Days on which fasting is forbidden', bn: 'যে দিনগুলিতে রোজা রাখা নিষিদ্ধ' })}</div>
            <p class="text-xs text-rose-700 dark:text-rose-300 mt-1" dir="auto">${L({ en: 'The two Eid days (Fitr and Adha), and the three days of Tashreeq (11, 12, 13 Dhul-Hijjah).', bn: 'দুই ঈদের দিন (ফিতর ও আযহা) এবং তাশরিকের তিন দিন (১১, ১২, ১৩ জিলহজ)।' })}</p>
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">🕌 ${L({ en: 'I\'tikaf — Spiritual Retreat', bn: 'ইতিকাফ — আধ্যাত্মিক নির্জনতা' })}</h3>
          <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3" dir="auto">${L({ en: 'I\'tikaf is secluding oneself in the mosque for worship, especially during the last ten days of Ramadan. The Prophet ﷺ observed it every year, and in his final year for twenty days. It aims to catch Laylatul Qadr and detach from worldly distractions.', bn: 'ইতিকাফ হলো ইবাদতের উদ্দেশ্যে মসজিদে অবস্থান, বিশেষত রমজানের শেষ দশ দিনে। নবী ﷺ প্রতিবছর ইতিকাফ করতেন এবং শেষ বছরে বিশ দিন করেছিলেন। এর উদ্দেশ্য লাইলাতুল কদর ধরা ও দুনিয়াবি ব্যস্ততা থেকে বিচ্ছিন্ন হওয়া।' })}</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-900/40">
              <div class="text-sm font-semibold text-indigo-800 dark:text-indigo-200">${L({ en: 'Requirements', bn: 'শর্তসমূহ' })}</div>
              <p class="text-xs text-indigo-700 dark:text-indigo-300 mt-1" dir="auto">${L({ en: 'Intention (niyyah), a mosque where the five daily prayers are held, purity from major impurity. Fasting is required in the Hanafi and Maliki schools.', bn: 'নিয়ত, যেখানে পাঁচ ওয়াক্ত জামাত হয় সেই মসজিদ, বড় নাপাকি থেকে পবিত্রতা। হানাফি ও মালিকি মাযহাবে রোজা শর্ত।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-900/40">
              <div class="text-sm font-semibold text-indigo-800 dark:text-indigo-200">${L({ en: 'Recommended acts', bn: 'মুস্তাহাব আমল' })}</div>
              <p class="text-xs text-indigo-700 dark:text-indigo-300 mt-1" dir="auto">${L({ en: 'Recite Quran, dhikr, tahajjud, du\'a, study of the deen. Speak little; avoid worldly conversation.', bn: 'কুরআন তিলাওয়াত, যিকির, তাহাজ্জুদ, দোয়া, ইলম চর্চা। কম কথা বলা; দুনিয়াবি আলাপ পরিহার।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-900/40">
              <div class="text-sm font-semibold text-indigo-800 dark:text-indigo-200">${L({ en: 'Permitted to leave for', bn: 'যে কারণে বের হওয়া যায়' })}</div>
              <p class="text-xs text-indigo-700 dark:text-indigo-300 mt-1" dir="auto">${L({ en: 'Wudu, ghusl, essential food/drink, natural needs, Jumu\'ah if the mosque doesn\'t hold it.', bn: 'অজু, গোসল, প্রয়োজনীয় পানাহার, প্রাকৃতিক প্রয়োজন, ওই মসজিদে জুমা না হলে জুমার জন্য।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-900/40">
              <div class="text-sm font-semibold text-indigo-800 dark:text-indigo-200">${L({ en: 'Dua of Laylatul Qadr', bn: 'লাইলাতুল কদরের দোয়া' })}</div>
              <p class="text-base text-indigo-900 dark:text-indigo-100 mt-1 text-center leading-loose" dir="rtl">اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي</p>
              <p class="text-xs text-indigo-700 dark:text-indigo-300 mt-1 italic text-center">Allahumma innaka ‘Afuwwun tuḥibbul-‘afwa fa‘fu ‘annī</p>
              <p class="text-xs text-indigo-700 dark:text-indigo-300 mt-1" dir="auto">${L({ en: '"O Allah, You are Most Forgiving, You love forgiveness — so forgive me." (Tirmidhi)', bn: '"হে আল্লাহ, আপনি ক্ষমাশীল, ক্ষমা ভালোবাসেন — আমাকে ক্ষমা করে দিন।" (তিরমিযি)' })}</p>
            </div>
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">🎁 ${L({ en: 'Zakat al-Fitr (Sadaqatul Fitr)', bn: 'যাকাতুল ফিতর (সাদাকাতুল ফিতর)' })}</h3>
          <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3" dir="auto">${L({ en: 'A charity obligatory on every Muslim — young and old, male and female — paid before the Eid al-Fitr prayer. It purifies the fast from idle talk and shortcomings and feeds the poor on Eid day.', bn: 'প্রত্যেক মুসলিমের উপর ফরয সদকা — ছোট-বড়, নারী-পুরুষ — যা ঈদুল ফিতরের নামাজের আগে আদায় করতে হয়। এটি রোজাকে অনর্থক কথা ও ত্রুটি থেকে পবিত্র করে এবং ঈদের দিন গরিবদের খাবারের ব্যবস্থা করে।' })}</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="p-3 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-900/40">
              <div class="text-sm font-semibold text-teal-800 dark:text-teal-200">${L({ en: 'Amount', bn: 'পরিমাণ' })}</div>
              <p class="text-xs text-teal-700 dark:text-teal-300 mt-1" dir="auto">${L({ en: 'One Sa\' (~2.5-3 kg) of the staple food of the region — dates, barley, wheat, rice — per person; or its cash equivalent.', bn: 'অঞ্চলের প্রধান খাদ্যের এক সা\' (প্রায় ২.৫-৩ কেজি) — খেজুর, যব, গম, চাল — প্রতিজনের জন্য; অথবা তার মূল্যের সমান নগদ।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-900/40">
              <div class="text-sm font-semibold text-teal-800 dark:text-teal-200">${L({ en: 'When to pay', bn: 'কখন দেবেন' })}</div>
              <p class="text-xs text-teal-700 dark:text-teal-300 mt-1" dir="auto">${L({ en: 'Best on Eid morning before the Eid prayer. May be paid one or two days earlier. Paying after the prayer counts as ordinary charity, not Zakat al-Fitr.', bn: 'সর্বোত্তম ঈদের সকালে ঈদের নামাজের আগে। এক-দুই দিন আগেও দেওয়া যায়। নামাজের পর দিলে সাধারণ সদকা হিসেবে গণ্য, যাকাতুল ফিতর নয়।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-900/40">
              <div class="text-sm font-semibold text-teal-800 dark:text-teal-200">${L({ en: 'Who pays', bn: 'কে দেবেন' })}</div>
              <p class="text-xs text-teal-700 dark:text-teal-300 mt-1" dir="auto">${L({ en: 'The head of household pays on behalf of every dependent (spouse, children, servants) — one Sa\' each.', bn: 'পরিবারের প্রধান প্রত্যেক নির্ভরশীলের (স্ত্রী, সন্তান, খাদেম) পক্ষ থেকে এক সা\' করে আদায় করবেন।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-900/40">
              <div class="text-sm font-semibold text-teal-800 dark:text-teal-200">${L({ en: 'Who receives', bn: 'কে পাবেন' })}</div>
              <p class="text-xs text-teal-700 dark:text-teal-300 mt-1" dir="auto">${L({ en: 'The poor and needy — same categories as Zakat (9:60), so no non-Muslim family is left hungry on Eid.', bn: 'গরিব ও অভাবী — সাধারণ যাকাতের মতোই আট শ্রেণির লোক (৯:৬০), যাতে ঈদের দিন কোনো পরিবার ক্ষুধার্ত না থাকে।' })}</p>
            </div>
          </div>
        </div>

        
          <div class="space-y-3">
            <div class="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40">
              <div class="text-sm font-semibold text-gray-700 dark:text-gray-200">${L({ en: 'Does eating or drinking by mistake break my fast?', bn: 'ভুলবশত খেয়ে ফেললে কি রোজা ভেঙে যায়?' })}</div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1" dir="auto">${L({ en: 'No. If you eat or drink forgetfully while fasting, your fast remains valid. Continue fasting and thank Allah. (Bukhari)', bn: 'না। ভুলে পানাহার করলে রোজা ভাঙ্গে না। রোজা চালিয়ে যান এবং আল্লাহর শুকরিয়া আদায় করুন। (বুখারি)' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40">
              <div class="text-sm font-semibold text-gray-700 dark:text-gray-200">${L({ en: 'Can I delay making up missed fasts (qada) until after the next Ramadan?', bn: 'কাযা রোজা পরবর্তী রমজান পর্যন্ত দেরি করা যাবে কি?' })}</div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1" dir="auto">${L({ en: 'It is recommended to make up missed fasts before the next Ramadan. If delayed beyond that, you must make up the fasts and also pay fidya (feed a poor person for each day).', bn: 'পরবর্তী রমজানের আগেই কাযা রোজা আদায় করা উত্তম। এরপর দেরি করলে রোজার পাশাপাশি ফিদইয়া (প্রতিটি রোজার জন্য একজন গরিবকে খাওয়ানো) দিতে হবে।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40">
              <div class="text-sm font-semibold text-gray-700 dark:text-gray-200">${L({ en: 'Does using a miswak or toothpaste break the fast?', bn: 'মিসওয়াক বা টুথপেস্ট ব্যবহার করলে রোজা ভাঙ্গে কি?' })}</div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1" dir="auto">${L({ en: 'Using miswak is recommended during fasting. Toothpaste is permissible as long as you avoid swallowing it, though many scholars recommend avoiding it out of caution.', bn: 'রোজা অবস্থায় মিসওয়াক ব্যবহার করা মুস্তাহাব। টুথপেস্ট ব্যবহার করা যাবে যদি গিলে ফেলা না হয়, তবে অনেক আলিম সতর্কতার পরামর্শ দেন।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40">
              <div class="text-sm font-semibold text-gray-700 dark:text-gray-200">${L({ en: 'Can I take injections or medication while fasting?', bn: 'রোজা অবস্থায় ইনজেকশন বা ওষুধ নেওয়া যাবে কি?' })}</div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1" dir="auto">${L({ en: 'Injections that are nutritional break the fast. Medical injections (like vaccines, insulin) are generally allowed according to most scholars, but taking oral medication breaks the fast.', bn: 'পুষ্টিকর ইনজেকশন রোজা ভঙ্গ করে। চিকিৎসা সংক্রান্ত ইনজেকশন (টিকা, ইনসুলিন ইত্যাদি) সাধারণত অনুমোদিত, তবে মুখে খাওয়ার ওষুধ রোজা ভঙ্গ করে।' })}</p>
            </div>
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">👨‍👩‍👧 ${L({ en: 'Fasting: Children, Elderly & Special Cases', bn: 'রোজা: শিশু, বৃদ্ধ ও বিশেষ ক্ষেত্র' })}</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="p-3 rounded-xl bg-sky-50 dark:bg-sky-900/20 border border-sky-100 dark:border-sky-900/40">
              <div class="text-sm font-semibold text-sky-800 dark:text-sky-200">👦 ${L({ en: 'Children', bn: 'শিশু' })}</div>
              <p class="text-xs text-sky-700 dark:text-sky-300 mt-1" dir="auto">${L({ en: 'Fasting is not obligatory before puberty. Parents should encourage children to fast — or try partial days — from around age 7, gradually building the habit. Once puberty is reached, fasting becomes fully obligatory. The Companions trained their children to fast Ashura and distracted younger ones with toys when they cried from hunger. (Bukhari)', bn: 'বালেগ হওয়ার আগে রোজা ফরজ নয়। পিতামাতা প্রায় ৭ বছর বয়স থেকে শিশুদের রোজার অভ্যাস করাবেন — প্রথমে আংশিক রোজা দিয়ে। বালেগ হলেই রোজা পূর্ণ ফরজ। সাহাবিরা শিশুদের আশুরায় রোজা রাখাতেন এবং ক্ষুধায় কাঁদলে খেলনা দিয়ে ভুলিয়ে রাখতেন। (বুখারি)' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-sky-50 dark:bg-sky-900/20 border border-sky-100 dark:border-sky-900/40">
              <div class="text-sm font-semibold text-sky-800 dark:text-sky-200">👴 ${L({ en: 'The Elderly', bn: 'বৃদ্ধ ও বৃদ্ধা' })}</div>
              <p class="text-xs text-sky-700 dark:text-sky-300 mt-1" dir="auto">${L({ en: 'An elderly person who genuinely cannot endure fasting due to extreme old age is exempt. They pay fidyah — feeding one poor person for each missed day. This is based on Quran 2:184. No make-up fasts are required, as the exemption is permanent. If they fast willingly some days despite hardship, the fast is valid and meritorious.', bn: 'অতিবার্ধক্যের কারণে সত্যিই রোজা রাখতে অক্ষম বৃদ্ধ মাফ। তারা ফিদইয়া দেবেন — প্রতিটি রোজার জন্য একজন দরিদ্রকে খাওয়ানো। এটি কুরআন ২:১৮৪-এর উপর ভিত্তি করে। কাযা প্রয়োজন নেই কারণ ছাড় স্থায়ী। কষ্ট সত্ত্বেও স্বেচ্ছায় কিছু রোজা রাখলে তা বৈধ ও সওয়াবের।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-sky-50 dark:bg-sky-900/20 border border-sky-100 dark:border-sky-900/40">
              <div class="text-sm font-semibold text-sky-800 dark:text-sky-200">🏥 ${L({ en: 'Chronically Ill', bn: 'দীর্ঘমেয়াদী অসুস্থ' })}</div>
              <p class="text-xs text-sky-700 dark:text-sky-300 mt-1" dir="auto">${L({ en: 'A person with a chronic illness unlikely to recover (e.g., diabetes requiring food at set intervals, advanced heart or kidney disease) may skip fasting and pay fidyah for each missed day. If they recover later, the majority opinion is that make-up fasts (qada) are still required. Always consult a qualified scholar alongside your doctor.', bn: 'যার দীর্ঘমেয়াদী অসুখ সেরে ওঠার সম্ভাবনা নেই (যেমন নিয়মিত খাবার প্রয়োজনীয় ডায়াবেটিস, গুরুতর হৃদ বা কিডনি রোগ) তিনি রোজা বাদ দিতে পারেন এবং প্রতিটি রোজার জন্য ফিদইয়া দেবেন। পরে সুস্থ হলে জমহুরের মতে কাযাও করতে হবে। যোগ্য আলিম ও চিকিৎসকের পরামর্শ নিন।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-sky-50 dark:bg-sky-900/20 border border-sky-100 dark:border-sky-900/40">
              <div class="text-sm font-semibold text-sky-800 dark:text-sky-200">🤰 ${L({ en: 'Pregnant & Nursing Women', bn: 'গর্ভবতী ও স্তন্যদানকারী' })}</div>
              <p class="text-xs text-sky-700 dark:text-sky-300 mt-1" dir="auto">${L({ en: 'If fasting poses a risk to mother or child, she may break the fast. Hanafi & Shafi\'i: make up (qada) all missed days. Maliki & Hanbali (and Ibn Abbas\' view): pay fidyah, no make-up. A common scholarly synthesis: if the worry is for herself, qada is sufficient; if the worry is only for the child, both qada and fidyah apply. Consult a qualified scholar.', bn: 'রোজায় মা বা শিশুর ঝুঁকি থাকলে ভাঙা যাবে। হানাফি ও শাফিঈ: সব কাযা আদায় করতে হবে। মালিকি ও হানবালি (ইবনে আব্বাসের মত): শুধু ফিদইয়া, কাযা নেই। প্রচলিত সমন্বয়: নিজের জন্য ভয় হলে শুধু কাযা; শুধু শিশুর জন্য হলে কাযা ও ফিদইয়া উভয়। যোগ্য আলিমের পরামর্শ নিন।' })}</p>
            </div>
          </div>
          <div class="mt-3 p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/40">
            <div class="text-xs font-semibold text-amber-800 dark:text-amber-200">💡 ${L({ en: 'Fidyah amount', bn: 'ফিদইয়ার পরিমাণ' })}</div>
            <p class="text-xs text-amber-700 dark:text-amber-300 mt-1" dir="auto">${L({ en: 'Feeding one poor person a full meal (or its monetary equivalent) per missed day. Roughly one Mudd (~750 g) per day in Shafi\'i/Hanbali, or half a Sa\' in Hanafi. Many scholars accept the local cash equivalent of the staple food.', bn: 'প্রতিটি রোজার জন্য একজন দরিদ্রকে একবেলা পূর্ণ আহার (বা সমমূল্যের অর্থ)। শাফিঈ/হানবালিতে প্রায় এক মুদ্দ (~৭৫০ গ্রাম), হানাফিতে আধা সা\'। অনেক আলিম প্রধান খাদ্যের স্থানীয় নগদ সমতুল্য গ্রহণ করেন।' })}</p>
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">🚨 ${L({ en: 'When Is It Obligatory to Break the Fast?', bn: 'কখন রোজা ভাঙা ওয়াজিব হয়?' })}</h3>
          <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3" dir="auto">${L({ en: 'Islam prohibits self-harm. In certain situations breaking the fast is not merely permitted — it becomes obligatory (wajib). Continuing in these cases is sinful.', bn: 'ইসলাম আত্মক্ষতি নিষিদ্ধ করে। কিছু পরিস্থিতিতে রোজা ভাঙা শুধু বৈধ নয় — ওয়াজিব হয়ে যায়। এসব ক্ষেত্রে রোজা চালিয়ে যাওয়া গুনাহ।' })}</p>
          <div class="space-y-3">
            <div class="p-3 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-900/40">
              <div class="text-sm font-semibold text-rose-800 dark:text-rose-200">⚕️ ${L({ en: 'Medical Emergency', bn: 'চিকিৎসা জরুরি অবস্থা' })}</div>
              <p class="text-xs text-rose-700 dark:text-rose-300 mt-1" dir="auto">${L({ en: 'If fasting causes a life-threatening condition — severe dehydration, hypoglycaemia causing loss of consciousness, cardiac event, or any situation where harm is immediate — breaking the fast is obligatory. The principle: "Do not throw yourselves into ruin" (2:195) and "He has not placed upon you in the religion any difficulty" (22:78). Make up the day later.', bn: 'যদি রোজায় জীবন-হুমকি হয় — তীব্র পানিশূন্যতা, হাইপোগ্লাইসেমিয়ায় বেহুঁশ হওয়া, হার্টের সমস্যা বা তাৎক্ষণিক ক্ষতির পরিস্থিতি — তখন রোজা ভাঙা ওয়াজিব। নীতি: "নিজেদের ধ্বংসের মুখে ঠেলে দিও না" (২:১৯৫) এবং "তিনি দ্বীনে কোনো সংকীর্ণতা রাখেননি" (২২:৭৮)। পরে কাযা করতে হবে।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-900/40">
              <div class="text-sm font-semibold text-rose-800 dark:text-rose-200">😷 ${L({ en: 'Illness That Will Worsen Significantly', bn: 'রোগ যা মারাত্মকভাবে বাড়বে' })}</div>
              <p class="text-xs text-rose-700 dark:text-rose-300 mt-1" dir="auto">${L({ en: 'If a qualified doctor confirms that fasting will cause serious harm or significantly worsen the illness — not just minor discomfort — breaking the fast is obligatory. The consensus of all four madhabs agrees on this principle. Self-diagnosis is unreliable; seek medical advice early in Ramadan if you have a condition.', bn: 'যদি যোগ্য চিকিৎসক নিশ্চিত করেন রোজায় গুরুতর ক্ষতি হবে বা অসুখ উল্লেখযোগ্যভাবে বাড়বে — শুধু সামান্য অস্বস্তি নয় — তখন রোজা ভাঙা ওয়াজিব। চার মাযহাবের ইজমা এই নীতিতে একমত। নিজে নিজে সিদ্ধান্ত নেওয়া নির্ভরযোগ্য নয়; রমজানের আগেই চিকিৎসকের পরামর্শ নিন।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-900/40">
              <div class="text-sm font-semibold text-rose-800 dark:text-rose-200">🌡️ ${L({ en: 'Ongoing Illness With No Prospect of Recovery', bn: 'সেরে ওঠার সম্ভাবনাহীন চলমান অসুখ' })}</div>
              <p class="text-xs text-rose-700 dark:text-rose-300 mt-1" dir="auto">${L({ en: 'A chronically ill person who is medically ordered not to fast must not continue fasting out of devotion — this crosses into self-harm. They pay fidyah instead. Deliberately fasting against clear medical advice when harm is medically certain would be sinful under the Islamic prohibition of self-harm (la darar wa la dirar).', bn: 'দীর্ঘমেয়াদী অসুস্থ ব্যক্তিকে চিকিৎসক রোজা না রাখতে বললে ইবাদতের নিয়তে রোজা চালিয়ে যাওয়া ঠিক নয় — এটি আত্মক্ষতিতে পরিণত হয়। তিনি ফিদইয়া দেবেন। চিকিৎসাগতভাবে নিশ্চিত ক্ষতি জেনেও রোজা রাখা ইসলামের আত্মক্ষতি নিষেধ নীতির (লা দারার ওয়া লা দিরার) বিরুদ্ধে।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-900/40">
              <div class="text-sm font-semibold text-rose-800 dark:text-rose-200">🤱 ${L({ en: 'Pregnant / Nursing — High Risk Confirmed', bn: 'গর্ভবতী/স্তন্যদান — উচ্চ ঝুঁকি নিশ্চিত' })}</div>
              <p class="text-xs text-rose-700 dark:text-rose-300 mt-1" dir="auto">${L({ en: 'If a pregnant or nursing woman faces confirmed serious risk to herself or her infant from fasting — evidenced by medical assessment or a well-grounded personal fear — breaking the fast becomes obligatory. A strong maternal assessment of imminent danger is sufficient even without a formal doctor\'s note. The make-up (qada) or fidyah ruling then applies per her school of thought.', bn: 'গর্ভবতী বা স্তন্যদানকারী মা যদি রোজায় নিজের বা শিশুর নিশ্চিত গুরুতর ঝুঁকির সম্মুখীন হন — চিকিৎসা মূল্যায়ন বা সুপ্রতিষ্ঠিত ব্যক্তিগত ভয়ের ভিত্তিতে — তখন রোজা ভাঙা ওয়াজিব। আসন্ন বিপদের শক্তিশালী মাতৃ মূল্যায়ন আনুষ্ঠানিক চিকিৎসক নোট ছাড়াও যথেষ্ট। এরপর মাযহাব অনুযায়ী কাযা বা ফিদইয়া প্রযোজ্য।' })}</p>
            </div>
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">⚖️ ${L({ en: 'What Breaks the Fast — and What Does Not', bn: 'কী রোজা ভাঙ্গে — আর কী ভাঙ্গে না' })}</h3>
          <p class="text-xs text-gray-500 dark:text-gray-400 mb-3" dir="auto">${L({ en: 'A fast is broken (mufsidat) only when something enters the body by the usual route, or by certain deliberate acts. Many everyday things do NOT break it.', bn: 'রোজা কেবল তখনই ভাঙ্গে (মুফসিদাত) যখন স্বাভাবিক পথে দেহে কিছু প্রবেশ করে বা কিছু ইচ্ছাকৃত কাজ ঘটে। বহু দৈনন্দিন বিষয় রোজা ভাঙ্গে না।' })}</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="p-3 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-900/40">
              <div class="text-sm font-semibold text-rose-800 dark:text-rose-200 mb-2">❌ ${L({ en: 'Breaks the fast', bn: 'রোজা ভাঙ্গে' })}</div>
              <ul class="space-y-1.5">
                <li class="flex gap-2 text-xs text-rose-700 dark:text-rose-300" dir="auto"><span class="shrink-0">•</span> ${L({ en: 'Intentionally eating or drinking — anything reaching the stomach by the usual route.', bn: 'ইচ্ছাকৃত পানাহার — স্বাভাবিক পথে পেটে পৌঁছায় এমন কিছু।' })}</li>
                <li class="flex gap-2 text-xs text-rose-700 dark:text-rose-300" dir="auto"><span class="shrink-0">•</span> ${L({ en: 'Sexual intercourse — breaks the fast and additionally requires kaffara.', bn: 'সহবাস — রোজা ভাঙ্গে এবং অতিরিক্ত কাফফারা ওয়াজিব হয়।' })}</li>
                <li class="flex gap-2 text-xs text-rose-700 dark:text-rose-300" dir="auto"><span class="shrink-0">•</span> ${L({ en: 'Deliberately inducing vomiting — "whoever vomits intentionally must make up the fast." (Abu Dawud, Tirmidhi)', bn: 'ইচ্ছাকৃতভাবে বমি করা — "যে ইচ্ছাকৃত বমি করে সে যেন কাযা করে।" (আবু দাউদ, তিরমিযি)' })}</li>
                <li class="flex gap-2 text-xs text-rose-700 dark:text-rose-300" dir="auto"><span class="shrink-0">•</span> ${L({ en: 'Onset of menstruation (hayd) or postnatal bleeding (nifas) — even moments before Maghrib.', bn: 'ঋতুস্রাব (হায়য) বা নিফাস শুরু হওয়া — মাগরিবের কিছু আগেও।' })}</li>
                <li class="flex gap-2 text-xs text-rose-700 dark:text-rose-300" dir="auto"><span class="shrink-0">•</span> ${L({ en: 'Intentional ejaculation (e.g. masturbation) while fasting.', bn: 'ইচ্ছাকৃত বীর্যপাত (যেমন হস্তমৈথুন) রোজা অবস্থায়।' })}</li>
                <li class="flex gap-2 text-xs text-rose-700 dark:text-rose-300" dir="auto"><span class="shrink-0">•</span> ${L({ en: 'Nutritional injections or IV drips that replace food and drink (per contemporary scholars).', bn: 'পুষ্টিকর ইনজেকশন বা স্যালাইন যা খাদ্য-পানীয়ের বিকল্প (সমকালীন আলিমদের মতে)।' })}</li>
              </ul>
            </div>
            <div class="p-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/40">
              <div class="text-sm font-semibold text-green-800 dark:text-green-200 mb-2">✅ ${L({ en: 'Does NOT break the fast', bn: 'রোজা ভাঙ্গে না' })}</div>
              <ul class="space-y-1.5">
                <li class="flex gap-2 text-xs text-green-700 dark:text-green-300" dir="auto"><span class="shrink-0">•</span> ${L({ en: 'Eating or drinking forgetfully — "Allah fed him and gave him drink." (Bukhari)', bn: 'ভুলবশত পানাহার — "আল্লাহই তাকে খাইয়েছেন ও পান করিয়েছেন।" (বুখারি)' })}</li>
                <li class="flex gap-2 text-xs text-green-700 dark:text-green-300" dir="auto"><span class="shrink-0">•</span> ${L({ en: 'Involuntary vomiting; swallowing one\'s own saliva; dust or a fly entering unintentionally.', bn: 'অনিচ্ছাকৃত বমি; নিজের থুতু গেলা; ধুলা বা মাছি ভুলবশত ঢোকা।' })}</li>
                <li class="flex gap-2 text-xs text-green-700 dark:text-green-300" dir="auto"><span class="shrink-0">•</span> ${L({ en: 'Rinsing the mouth and nose (without exaggeration) and using the miswak.', bn: 'কুলি করা ও নাকে পানি দেওয়া (অতিরঞ্জন ছাড়া) এবং মিসওয়াক ব্যবহার।' })}</li>
                <li class="flex gap-2 text-xs text-green-700 dark:text-green-300" dir="auto"><span class="shrink-0">•</span> ${L({ en: 'A wet dream — ghusl becomes due, but the fast remains valid.', bn: 'স্বপ্নদোষ — গোসল ফরজ হয়, তবে রোজা সহীহ থাকে।' })}</li>
                <li class="flex gap-2 text-xs text-green-700 dark:text-green-300" dir="auto"><span class="shrink-0">•</span> ${L({ en: 'Injections that are not nutritional (e.g. vaccines, insulin) — per the majority.', bn: 'অপুষ্টিকর ইনজেকশন (যেমন টিকা, ইনসুলিন) — জমহুরের মতে।' })}</li>
                <li class="flex gap-2 text-xs text-green-700 dark:text-green-300" dir="auto"><span class="shrink-0">•</span> ${L({ en: 'Blood test or giving a little blood; eye and ear drops — per the majority.', bn: 'রক্ত পরীক্ষা বা সামান্য রক্তদান; চোখ ও কানের ড্রপ — জমহুরের মতে।' })}</li>
                <li class="flex gap-2 text-xs text-green-700 dark:text-green-300" dir="auto"><span class="shrink-0">•</span> ${L({ en: 'Bathing, swimming, or applying perfume, oil or kohl — provided nothing is swallowed.', bn: 'গোসল, সাঁতার বা সুগন্ধি, তেল, সুরমা ব্যবহার — যদি কিছু গিলে ফেলা না হয়।' })}</li>
              </ul>
            </div>
          </div>
          <div class="mt-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40">
            <div class="text-xs font-semibold text-gray-700 dark:text-gray-200">📝 ${L({ en: 'A point of scholarly difference', bn: 'একটি মতভেদের বিষয়' })}</div>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1" dir="auto">${L({ en: 'Cupping (hijama): the majority hold it does not break the fast, while the Hanbali school considers that it does. Where scholars differ, follow reliable local guidance.', bn: 'হিজামা (রক্তমোক্ষণ): জমহুরের মতে এতে রোজা ভাঙ্গে না, তবে হানবালি মাযহাব মনে করে ভাঙ্গে। মতভেদের ক্ষেত্রে নির্ভরযোগ্য স্থানীয় আলিমের পরামর্শ অনুসরণ করুন।' })}</p>
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">🌟 ${L({ en: 'Sunnahs & Adab of Fasting', bn: 'রোজার সুন্নাত ও আদব' })}</h3>
          <ul class="space-y-2">
            <li class="flex gap-2 text-sm text-gray-600 dark:text-gray-300" dir="auto"><span class="text-amber-500 shrink-0">✦</span> ${L({ en: 'Take suhur and delay it close to dawn — "Have suhur, for in suhur there is blessing." (Bukhari & Muslim)', bn: 'সেহরি খাওয়া ও তা ফজরের কাছাকাছি দেরি করা — "সেহরি খাও, কেননা সেহরিতে বরকত রয়েছে।" (বুখারি ও মুসলিম)' })}</li>
            <li class="flex gap-2 text-sm text-gray-600 dark:text-gray-300" dir="auto"><span class="text-amber-500 shrink-0">✦</span> ${L({ en: 'Hasten to break the fast at sunset with fresh dates, or dry dates, or water. (Abu Dawud, Tirmidhi)', bn: 'সূর্যাস্তে তাজা খেজুর, নয়তো শুকনো খেজুর, নয়তো পানি দিয়ে দ্রুত ইফতার করা। (আবু দাউদ, তিরমিযি)' })}</li>
            <li class="flex gap-2 text-sm text-gray-600 dark:text-gray-300" dir="auto"><span class="text-amber-500 shrink-0">✦</span> ${L({ en: 'Make du\'a at the moment of iftar — the fasting person\'s supplication is not turned away.', bn: 'ইফতারের মুহূর্তে দোয়া করা — রোজাদারের দোয়া ফিরিয়ে দেওয়া হয় না।' })}</li>
            <li class="flex gap-2 text-sm text-gray-600 dark:text-gray-300" dir="auto"><span class="text-amber-500 shrink-0">✦</span> ${L({ en: 'Guard the tongue and limbs from lies, backbiting and quarrels — "Fasting is a shield." (Bukhari)', bn: 'মিথ্যা, গীবত ও ঝগড়া থেকে জিহ্বা ও অঙ্গ সংযত রাখা — "রোজা ঢাল।" (বুখারি)' })}</li>
            <li class="flex gap-2 text-sm text-gray-600 dark:text-gray-300" dir="auto"><span class="text-amber-500 shrink-0">✦</span> ${L({ en: 'Increase recitation of the Quran — Jibril reviewed the Quran with the Prophet ﷺ each Ramadan. (Bukhari)', bn: 'কুরআন তিলাওয়াত বাড়ানো — জিবরীল প্রতি রমজানে নবী ﷺ-এর সাথে কুরআন পুনরালোচনা করতেন। (বুখারি)' })}</li>
            <li class="flex gap-2 text-sm text-gray-600 dark:text-gray-300" dir="auto"><span class="text-amber-500 shrink-0">✦</span> ${L({ en: 'Be abundantly generous and feed others — "Whoever feeds a fasting person will have a reward like his." (Tirmidhi)', bn: 'প্রচুর দানশীল হওয়া ও অন্যকে খাওয়ানো — "যে রোজাদারকে ইফতার করায় তার জন্য রোজাদারের সমান সওয়াব।" (তিরমিযি)' })}</li>
            <li class="flex gap-2 text-sm text-gray-600 dark:text-gray-300" dir="auto"><span class="text-amber-500 shrink-0">✦</span> ${L({ en: 'If insulted or provoked, respond calmly: "I am fasting." (Bukhari & Muslim)', bn: 'কেউ গালি দিলে বা উস্কে দিলে শান্তভাবে বলা: "আমি রোজা রেখেছি।" (বুখারি ও মুসলিম)' })}</li>
            <li class="flex gap-2 text-sm text-gray-600 dark:text-gray-300" dir="auto"><span class="text-amber-500 shrink-0">✦</span> ${L({ en: 'Stand in Tarawih at night and seek Laylatul Qadr in the last ten nights.', bn: 'রাতে তারাবিহে দাঁড়ানো এবং শেষ দশ রাতে লাইলাতুল কদর অনুসন্ধান করা।' })}</li>
          </ul>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">🍽️ ${L({ en: 'Suhur & Iftar Etiquette', bn: 'সেহরি ও ইফতারের আদব' })}</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40">
              <div class="text-sm font-semibold text-gray-700 dark:text-gray-200">🌌 ${L({ en: 'Suhur — the blessed meal', bn: 'সেহরি — বরকতময় আহার' })}</div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1" dir="auto">${L({ en: 'Do not skip suhur — even a sip of water carries blessing. Delaying it close to (but ending at) true dawn is sunnah. The intention (niyyah) is made in the heart; no spoken formula is needed. Eating and drinking are permitted until Subh Sadiq (the true dawn when Fajr begins), per Quran 2:187.', bn: 'সেহরি বাদ দেবেন না — এক ঢোক পানিতেও বরকত। সুবহে সাদিকের কাছাকাছি (তবে সেখানেই শেষ করে) দেরি করা সুন্নাত। নিয়ত অন্তরে করলেই হয়; মুখে বলা লাগে না। কুরআন ২:১৮৭ অনুযায়ী সুবহে সাদিক (ফজরের ওয়াক্ত শুরুর প্রকৃত ভোর) পর্যন্ত পানাহার বৈধ।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40">
              <div class="text-sm font-semibold text-gray-700 dark:text-gray-200">🌇 ${L({ en: 'Iftar — breaking the fast', bn: 'ইফতার — রোজা খোলা' })}</div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1" dir="auto">${L({ en: 'Break the fast promptly once the sun has set — do not delay. Begin with fresh or dry dates, or water. Make du\'a before eating, then pray Maghrib without long delay. Avoid overeating so worship at night stays easy.', bn: 'সূর্য অস্ত গেলে দেরি না করে দ্রুত ইফতার করুন। তাজা বা শুকনো খেজুর, নয়তো পানি দিয়ে শুরু করুন। খাওয়ার আগে দোয়া করুন, এরপর দেরি না করে মাগরিব পড়ুন। বেশি খাওয়া এড়িয়ে চলুন যাতে রাতের ইবাদত সহজ হয়।' })}</p>
            </div>
          </div>
          <div class="mt-3 p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/40">
            <div class="text-xs font-semibold text-amber-800 dark:text-amber-200 mb-1">🤲 ${L({ en: 'Du\'a after breaking the fast', bn: 'ইফতারের পরের দোয়া' })}</div>
            <p class="text-lg text-amber-800 dark:text-amber-200 text-center font-arabic leading-loose" dir="rtl">ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللَّهُ</p>
            <p class="text-xs text-amber-600 dark:text-amber-400 text-center mt-1 italic">Dhahaba az-zama\'u wabtallatil-\'urooqu wa thabatal-ajru in sha\'a Allah</p>
            <p class="text-sm text-amber-800 dark:text-amber-200 text-center mt-1" dir="auto">${L({ en: '"The thirst is gone, the veins are moistened, and the reward is confirmed, if Allah wills." (Abu Dawud — hasan)', bn: '"পিপাসা দূর হয়েছে, শিরাগুলো সিক্ত হয়েছে এবং ইনশাআল্লাহ সওয়াব সাব্যস্ত হয়েছে।" (আবু দাউদ — হাসান)' })}</p>
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">🧩 ${L({ en: 'Common Misconceptions', bn: 'প্রচলিত ভুল ধারণা' })}</h3>
          <p class="text-xs text-gray-500 dark:text-gray-400 mb-3" dir="auto">${L({ en: 'Widespread beliefs about fasting that are not correct, with the mainstream position.', bn: 'রোজা নিয়ে প্রচলিত কিছু ভুল ধারণা এবং তার বিপরীতে মূলধারার অবস্থান।' })}</p>
          <div class="space-y-2">
            <div class="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40">
              <div class="text-xs font-semibold text-rose-700 dark:text-rose-300" dir="auto">❌ ${L({ en: '"Swallowing your own saliva breaks the fast."', bn: '"নিজের থুতু গিললে রোজা ভাঙ্গে।"' })}</div>
              <p class="text-xs text-green-700 dark:text-green-300 mt-1" dir="auto">✅ ${L({ en: 'It does not — only what enters from outside the body counts.', bn: 'ভাঙ্গে না — কেবল বাইরে থেকে দেহে প্রবেশকারী বস্তুই ধর্তব্য।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40">
              <div class="text-xs font-semibold text-rose-700 dark:text-rose-300" dir="auto">❌ ${L({ en: '"You must say the intention aloud every night."', bn: '"প্রতি রাতে মুখে নিয়ত উচ্চারণ করতে হয়।"' })}</div>
              <p class="text-xs text-green-700 dark:text-green-300 mt-1" dir="auto">✅ ${L({ en: 'The niyyah is in the heart; no verbal formula is required.', bn: 'নিয়ত অন্তরে; কোনো মৌখিক বাক্য আবশ্যক নয়।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40">
              <div class="text-xs font-semibold text-rose-700 dark:text-rose-300" dir="auto">❌ ${L({ en: '"Brushing the teeth or using the miswak breaks the fast."', bn: '"দাঁত ব্রাশ বা মিসওয়াক করলে রোজা ভাঙ্গে।"' })}</div>
              <p class="text-xs text-green-700 dark:text-green-300 mt-1" dir="auto">✅ ${L({ en: 'The miswak is sunnah; toothpaste is allowed if not swallowed (some avoid it out of caution).', bn: 'মিসওয়াক সুন্নাত; টুথপেস্ট গিলে না ফেললে বৈধ (কেউ সতর্কতাবশত এড়িয়ে চলেন)।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40">
              <div class="text-xs font-semibold text-rose-700 dark:text-rose-300" dir="auto">❌ ${L({ en: '"Any injection or blood test breaks the fast."', bn: '"যেকোনো ইনজেকশন বা রক্ত পরীক্ষা রোজা ভাঙ্গে।"' })}</div>
              <p class="text-xs text-green-700 dark:text-green-300 mt-1" dir="auto">✅ ${L({ en: 'Non-nutritional injections and blood tests do not, per the majority; only nourishing drips break the fast.', bn: 'জমহুরের মতে অপুষ্টিকর ইনজেকশন ও রক্ত পরীক্ষায় ভাঙ্গে না; কেবল পুষ্টিকর স্যালাইনে ভাঙ্গে।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40">
              <div class="text-xs font-semibold text-rose-700 dark:text-rose-300" dir="auto">❌ ${L({ en: '"Eating by mistake means you must start the fast over."', bn: '"ভুলে খেয়ে ফেললে রোজা নতুন করে শুরু করতে হয়।"' })}</div>
              <p class="text-xs text-green-700 dark:text-green-300 mt-1" dir="auto">✅ ${L({ en: 'The fast stays valid — "Allah fed him and gave him drink." (Bukhari)', bn: 'রোজা সহীহ থাকে — "আল্লাহই তাকে খাইয়েছেন ও পান করিয়েছেন।" (বুখারি)' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40">
              <div class="text-xs font-semibold text-rose-700 dark:text-rose-300" dir="auto">❌ ${L({ en: '"You must stop eating 10-15 minutes before Fajr (imsak)."', bn: '"ফজরের ১০-১৫ মিনিট আগে (ইমসাক) খাওয়া বন্ধ করতেই হবে।"' })}</div>
              <p class="text-xs text-green-700 dark:text-green-300 mt-1" dir="auto">✅ ${L({ en: 'Eating is permitted until true dawn / Subh Sadiq (Quran 2:187); the imsak margin is a precaution, not an obligation.', bn: 'প্রকৃত ভোর / সুবহে সাদিক পর্যন্ত খাওয়া বৈধ (কুরআন ২:১৮৭); ইমসাকের ব্যবধান একটি সতর্কতা, বাধ্যবাধকতা নয়।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40">
              <div class="text-xs font-semibold text-rose-700 dark:text-rose-300" dir="auto">❌ ${L({ en: '"A wet dream or bathing breaks the fast."', bn: '"স্বপ্নদোষ বা গোসল করলে রোজা ভাঙ্গে।"' })}</div>
              <p class="text-xs text-green-700 dark:text-green-300 mt-1" dir="auto">✅ ${L({ en: 'Neither breaks the fast; ghusl is simply due before prayer.', bn: 'কোনোটিই রোজা ভাঙ্গে না; শুধু নামাজের আগে গোসল ফরজ হয়।' })}</p>
            </div>
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">🧠 ${L({ en: 'Self-check — Test Your Understanding', bn: 'নিজেই যাচাই — আপনার বোঝাপড়া পরীক্ষা করুন' })}</h3>
          <p class="text-xs text-gray-500 dark:text-gray-400 mb-3" dir="auto">${L({ en: 'Tap each question to reveal the answer.', bn: 'প্রতিটি প্রশ্নে ট্যাপ করে উত্তর দেখুন।' })}</p>
          <div class="space-y-2">
            ${[
              { q: { en: 'What is the ruling on fasting Ramadan?', bn: 'রমজানের রোজার হুকুম কী?' }, a: { en: 'It is fard (obligatory) on every adult, sane, healthy, resident Muslim (Quran 2:183).', bn: 'প্রত্যেক প্রাপ্তবয়স্ক, সুস্থ, মুকিম মুসলিমের উপর ফরজ (কুরআন ২:১৮৩)।' } },
              { q: { en: 'What breaks the fast?', bn: 'কী কী রোজা ভঙ্গ করে?' }, a: { en: 'Intentional eating, drinking, smoking, sexual intercourse, and menstruation. Vomiting deliberately also breaks the fast.', bn: 'ইচ্ছাকৃত পানাহার, ধূমপান, সহবাস ও ঋতুস্রাব। ইচ্ছাকৃত বমিও রোজা ভাঙ্গে।' } },
              { q: { en: 'What if someone eats or drinks by mistake?', bn: 'ভুলে পানাহার করলে?' }, a: { en: 'The fast remains valid — "Allah has fed him and given him drink." (Bukhari)', bn: 'রোজা সহীহ থাকে — "আল্লাহই তাকে খাইয়েছেন ও পান করিয়েছেন।" (বুখারি)' } },
              { q: { en: 'Do dreams or wet dreams break the fast?', bn: 'স্বপ্নদোষে রোজা ভাঙ্গে?' }, a: { en: 'No. Wet dreams do not break the fast, but ghusl becomes obligatory before prayer.', bn: 'না। স্বপ্নদোষে রোজা ভাঙ্গে না, তবে নামাজের আগে গোসল ফরজ।' } },
              { q: { en: 'Best time to make du\'a during Ramadan?', bn: 'রমজানে দোয়ার সর্বোত্তম সময়?' }, a: { en: 'Just before iftar (a fasting person\'s du\'a is not rejected) and in the last third of the night.', bn: 'ইফতারের ঠিক আগে (রোজাদারের দোয়া প্রত্যাখ্যাত হয় না) এবং রাতের শেষ তৃতীয়াংশে।' } },
              { q: { en: 'When is Zakat al-Fitr paid?', bn: 'যাকাতুল ফিতর কখন দেওয়া হয়?' }, a: { en: 'Before the Eid al-Fitr prayer. Best paid on Eid morning; may be paid a day or two earlier.', bn: 'ঈদুল ফিতরের নামাজের আগে। সর্বোত্তম ঈদের সকাল; এক-দুই দিন আগেও দেওয়া যায়।' } },
              { q: { en: 'What is Laylatul Qadr?', bn: 'লাইলাতুল কদর কী?' }, a: { en: 'The Night of Decree — better than a thousand months (97:3). Sought in the odd nights of the last ten of Ramadan.', bn: 'নির্ধারণের রাত — হাজার মাসের চেয়ে উত্তম (৯৭:৩)। রমজানের শেষ দশকের বিজোড় রাতে অনুসন্ধান করা হয়।' } },
              { q: { en: 'Do the six days of Shawwal have to be consecutive?', bn: 'শাওয়ালের ছয় রোজা কি পরপর হতে হবে?' }, a: { en: 'No, they can be spread throughout the month of Shawwal — consecutive is preferred but not required.', bn: 'না, শাওয়াল মাসজুড়ে ছড়িয়ে রাখা যায় — পরপর রাখা উত্তম কিন্তু আবশ্যক নয়।' } },
              { q: { en: 'On which day is fasting forbidden?', bn: 'কোন দিন রোজা রাখা হারাম?' }, a: { en: 'The two Eid days (Eid al-Fitr and Eid al-Adha), and the three days of Tashreeq (11, 12, 13 Dhul-Hijjah).', bn: 'দুই ঈদের দিন (ঈদুল ফিতর ও ঈদুল আযহা) এবং তাশরিকের তিন দিন (১১, ১২, ১৩ জিলহজ)।' } },
              { q: { en: 'Does the fast of a traveler have to be made up?', bn: 'মুসাফিরের ছুটে যাওয়া রোজা কি কাযা করতে হবে?' }, a: { en: 'Yes. A traveler may break the fast during travel and make it up later on other days (2:184-185).', bn: 'হ্যাঁ। মুসাফির সফরে রোজা ভাঙ্গতে পারে এবং পরে অন্য দিনে কাযা আদায় করবে (২:১৮৪-১৮৫)।' } },
              { q: { en: 'What is fidyah and who must pay it?', bn: 'ফিদইয়া কী এবং কাকে দিতে হয়?' }, a: { en: 'Fidyah is a compensation for each missed fast — feeding one poor person a full meal per day. It applies to those permanently unable to fast: the elderly, the chronically ill, and (per some schools) pregnant/nursing women who cannot make up the fasts.', bn: 'ফিদইয়া প্রতিটি রোজার বিনিময় — একজন দরিদ্রকে একবেলা পূর্ণ আহার। স্থায়ীভাবে অক্ষমদের জন্য: বৃদ্ধ, দীর্ঘমেয়াদী রোগী, এবং (কিছু মাযহাবে) যেসব গর্ভবতী/স্তন্যদানকারী কাযা করতে পারবেন না।' } },
              { q: { en: 'At what age does fasting become obligatory?', bn: 'কোন বয়সে রোজা ফরজ হয়?' }, a: { en: 'At puberty (bulugh). Before that it is not obligatory, but children should be trained to fast from around age 7. Signs of puberty include menstruation, wet dreams, pubic hair growth, or reaching age 15.', bn: 'বালেগ হওয়ার সাথে সাথে। এর আগে ফরজ নয়, তবে প্রায় ৭ বছর থেকে অভ্যাস করানো উচিত। বালেগের আলামত: ঋতুস্রাব, স্বপ্নদোষ, যৌনকেশ বা ১৫ বছর বয়স।' } },
              { q: { en: 'If I deliberately break a Ramadan fast, what is the kaffara?', bn: 'ইচ্ছাকৃতভাবে রমজানের রোজা ভাঙলে কাফফারা কী?' }, a: { en: 'Kaffara for deliberately breaking a Ramadan fast (via food, drink, or intercourse) is: freeing a slave; if unable, fasting 60 consecutive days; if unable, feeding 60 poor persons — plus making up the day. Breaking the fast by other means requires only qada, not kaffara.', bn: 'ইচ্ছাকৃতভাবে রমজানের রোজা ভাঙার (পানাহার বা সহবাসে) কাফফারা: একজন দাস মুক্তি; অক্ষম হলে ৬০টি ধারাবাহিক রোজা; অক্ষম হলে ৬০ জন দরিদ্রকে খাওয়ানো — সাথে সেই দিনটির কাযাও। অন্য কারণে ভাঙলে শুধু কাযা, কাফফারা নয়।' } },
              { q: { en: 'Does kissing one\'s spouse break the fast?', bn: 'স্ত্রী/স্বামীকে চুম্বন করলে কি রোজা ভাঙ্গে?' }, a: { en: 'Kissing the spouse does not break the fast provided it does not lead to ejaculation. The Prophet ﷺ used to kiss while fasting. (Bukhari & Muslim). However, if it leads to ejaculation or intercourse the fast is broken and kaffara applies.', bn: 'স্ত্রী/স্বামীকে চুম্বন করলে রোজা ভাঙ্গে না যদি বীর্যপাত না হয়। নবী ﷺ রোজা অবস্থায় চুম্বন করতেন। (বুখারি ও মুসলিম)। তবে বীর্যপাত বা সহবাস হলে রোজা ভেঙে যায় এবং কাফফারা প্রযোজ্য।' } },
              { q: { en: 'Can a woman fast during menstruation?', bn: 'ঋতুস্রাবের সময় মহিলা কি রোজা রাখতে পারবেন?' }, a: { en: 'No. Fasting is prohibited for a woman during menstruation (hayd) and postnatal bleeding (nifas) — the fast would not be valid. She must make up the missed days after Ramadan. This is the unanimous ruling (ijma\') of all four schools.', bn: 'না। ঋতুস্রাব (হায়য) ও নিফাসের সময় নারীর জন্য রোজা হারাম — রোজা সহীহ হবে না। রমজানের পর এই দিনগুলোর কাযা আদায় করতে হবে। এটি চার মাযহাবের ইজমা।' } },
              { q: { en: 'Is a verbal niyyah (intention) required for fasting?', bn: 'রোজার জন্য মৌখিক নিয়ত কি আবশ্যক?' }, a: { en: 'No. The niyyah is in the heart — intending to fast for Allah is sufficient. A verbal statement is not required. For Ramadan fasts, the majority say the intention must be formed before Fajr each night.', bn: 'না। নিয়ত অন্তরে থাকলেই যথেষ্ট — আল্লাহর জন্য রোজার সংকল্পই যথেষ্ট। মৌখিক নিয়ত আবশ্যক নয়। রমজানের রোজার জন্য জমহুরের মতে প্রতি রাতে ফজরের আগে নিয়ত করতে হবে।' } },
              { q: { en: 'What is the ruling on eye drops while fasting?', bn: 'রোজা অবস্থায় চোখের ড্রপের বিধান কী?' }, a: { en: 'Eye drops do not break the fast according to the majority of scholars (Shafi\'i, Maliki, Hanbali) — even if a taste reaches the throat — because the eye is not an entry point for nourishment. This is the stronger scholarly position.', bn: 'জমহুর আলিম (শাফিঈ, মালিকি, হানবালি) মতে চোখের ড্রপ রোজা ভাঙ্গে না — গলায় স্বাদ গেলেও — কারণ চোখ পুষ্টির প্রবেশদ্বার নয়। এটিই শক্তিশালী মত।' } },
              { q: { en: 'When is it obligatory (wajib) to break the fast?', bn: 'কখন রোজা ভাঙা ওয়াজিব হয়?' }, a: { en: 'When continuing the fast would cause serious harm or be life-threatening — e.g., a medical emergency, uncontrolled diabetes, severe dehydration. Islam forbids self-harm (la darar). In such cases, breaking the fast and making it up later is obligatory, not just permitted.', bn: 'রোজা চালিয়ে যাওয়ায় গুরুতর ক্ষতি বা জীবনহানির আশঙ্কা থাকলে — যেমন চিকিৎসা জরুরি অবস্থা, অনিয়ন্ত্রিত ডায়াবেটিস, তীব্র পানিশূন্যতা। ইসলাম আত্মক্ষতি নিষিদ্ধ করে (লা দারার)। এসব ক্ষেত্রে রোজা ভাঙা ও পরে কাযা করা ওয়াজিব।' } },
              { q: { en: 'Does swallowing your own saliva break the fast?', bn: 'নিজের থুতু গিললে কি রোজা ভাঙ্গে?' }, a: { en: 'No. Only substances entering the body from outside break the fast — swallowing one\'s own saliva does not.', bn: 'না। কেবল বাইরে থেকে দেহে প্রবেশকারী বস্তু রোজা ভাঙ্গে — নিজের থুতু গিলে ফেললে ভাঙ্গে না।' } },
              { q: { en: 'Does deliberately making yourself vomit break the fast?', bn: 'ইচ্ছাকৃতভাবে বমি করলে কি রোজা ভাঙ্গে?' }, a: { en: 'Yes. Intentional vomiting breaks the fast and must be made up; involuntary vomiting does not break it. (Abu Dawud, Tirmidhi)', bn: 'হ্যাঁ। ইচ্ছাকৃত বমি রোজা ভাঙ্গে ও কাযা করতে হয়; অনিচ্ছাকৃত বমিতে ভাঙ্গে না। (আবু দাউদ, তিরমিযি)' } },
              { q: { en: 'What is the sunnah way to break the fast?', bn: 'ইফতারের সুন্নাত পদ্ধতি কী?' }, a: { en: 'Hasten at sunset and break the fast with fresh dates; if none, dry dates; if none, water. (Abu Dawud, Tirmidhi)', bn: 'সূর্যাস্তে দ্রুত করে তাজা খেজুর দিয়ে ইফতার করা; না থাকলে শুকনো খেজুর; তাও না থাকলে পানি দিয়ে। (আবু দাউদ, তিরমিযি)' } },
              { q: { en: 'Does a blood test or non-nutritional injection break the fast?', bn: 'রক্ত পরীক্ষা বা অপুষ্টিকর ইনজেকশন কি রোজা ভাঙ্গে?' }, a: { en: 'No, according to the majority of scholars. Only injections or drips that nourish the body (replacing food and drink) break the fast.', bn: 'না, জমহুর আলিমের মতে। কেবল দেহকে পুষ্টি দেয় এমন ইনজেকশন বা স্যালাইন (খাদ্য-পানীয়ের বিকল্প) রোজা ভাঙ্গে।' } },
            ].map(item => `
              <details class="rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/40 overflow-hidden">
                <summary class="flex items-center gap-2 p-3 cursor-pointer list-none hover:bg-amber-100/50 dark:hover:bg-amber-900/30">
                  <span class="text-amber-600 dark:text-amber-400 text-sm">❓</span>
                  <span class="flex-1 text-sm font-medium text-gray-800 dark:text-gray-100" dir="auto">${L(item.q)}</span>
                  <span class="text-amber-500 text-xs">▼</span>
                </summary>
                <div class="px-4 pb-3 pt-1 text-xs text-gray-700 dark:text-gray-200 leading-relaxed border-t border-amber-100 dark:border-amber-900/40" dir="auto">✅ ${L(item.a)}</div>
              </details>`).join('')}
          </div>
        </div>

      </div>`;
  }

  handleClick(e) {
    const ayah = e.target.closest('[data-sawm-ayah]');
    if (ayah) { this.openAyah(ayah.getAttribute('data-sawm-ayah')); return; }
  }

  openAyah(ref) {
    try {
      if (typeof ayahModal !== 'undefined' && ayahModal && typeof ayahModal.open === 'function') {
        ayahModal.open(ref);
      }
    } catch (_) { }
  }
}

let sawmModule;
document.addEventListener('DOMContentLoaded', () => { sawmModule = new SawmModule(); });
