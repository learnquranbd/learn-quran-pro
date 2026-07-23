class ZakatModule {
  constructor() {
    this.root = document.getElementById('zakat-root');
    if (!this.root) return;
    this.language = (typeof appSettings !== 'undefined' && appSettings) ? appSettings.get('language') : 'en';
    this.rendered = false;

    window.addEventListener('tabChanged', (e) => {
      try { if (e && e.detail && e.detail.tabId === 'zakat') this.render(); } catch (_) { }
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
          <div class="p-6 bg-gradient-to-br from-teal-50 to-transparent dark:from-teal-900/10">
            <div class="text-4xl mb-2" aria-hidden="true">💰</div>
            <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100">${T('learn_zakat_title')}</h2>
            <p class="text-gray-500 dark:text-gray-400 mt-1 text-sm">${L({ en: 'Obligatory charity — one of the five pillars of Islam.', bn: 'ফরয সদকা — ইসলামের পঞ্চস্তম্ভের একটি।' })}</p>
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">📖 ${T('learn_zakat_title')} ${L({ en: 'in the Quran', bn: 'কুরআনে' })}</h3>
          <div class="space-y-3">
            <div class="p-3 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-900/40">
              <p class="text-sm text-teal-800 dark:text-teal-200 leading-relaxed" dir="auto">${L({ en: '"And establish prayer and give zakah, and bow with those who bow [in worship].', bn: '"আর তোমরা সালাত কায়েম কর, যাকাত দাও এবং রুকুকারীদের সাথে রুকু কর।"' })}</p>
              <button type="button" data-zakat-ayah="2:43" class="mt-2 inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-teal-500/10 text-teal-700 dark:text-teal-300 text-xs font-medium hover:bg-teal-500 hover:text-white transition-colors">📖 2:43 ${L({ en: 'Read', bn: 'পড়ুন' })}</button>
            </div>
            <div class="p-3 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-900/40">
              <p class="text-sm text-teal-800 dark:text-teal-200 leading-relaxed" dir="auto">${L({ en: '"Zakah expenditures are only for the poor and the needy, and for those employed to collect [zakah], and for bringing hearts together [for Islam], and for freeing captives [or slaves], and for those in debt, and for the cause of Allah, and for the [stranded] traveler — an obligation [imposed] by Allah."', bn: '"যাকাত কেবল ফকীর, মিসকীন, যাকাত আদায়কারী, নব মুসলিমের হৃদয় জয়, দাসমুক্তি, ঋণগ্রস্ত, আল্লাহর পথে এবং মুসাফিরদের জন্য — আল্লাহর পক্ষ থেকে ফরয।"' })}</p>
              <button type="button" data-zakat-ayah="9:60" class="mt-2 inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-teal-500/10 text-teal-700 dark:text-teal-300 text-xs font-medium hover:bg-teal-500 hover:text-white transition-colors">📖 9:60 ${L({ en: 'Read', bn: 'পড়ুন' })}</button>
            </div>
            <div class="p-3 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-900/40">
              <p class="text-sm text-teal-800 dark:text-teal-200 leading-relaxed" dir="auto">${L({ en: '"Take, [O Muhammad], from their wealth a charity by which you purify them and cause them to increase, and invoke [Allah\'s blessings] upon them."', bn: '"হে নবী! তাদের সম্পদ থেকে সদকা গ্রহণ করুন, যা দ্বারা আপনি তাদের পবিত্র করবেন ও পরিশুদ্ধ করবেন এবং তাদের জন্য দোয়া করুন।"' })}</p>
              <button type="button" data-zakat-ayah="9:103" class="mt-2 inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-teal-500/10 text-teal-700 dark:text-teal-300 text-xs font-medium hover:bg-teal-500 hover:text-white transition-colors">📖 9:103 ${L({ en: 'Read', bn: 'পড়ুন' })}</button>
            </div>
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">🔍 ${L({ en: 'Tafsir of 9:60 — The Eight Categories', bn: 'সূরা তাওবা ৯:৬০ — আট শ্রেণির তাফসির' })}</h3>
          <p class="text-xs text-gray-500 dark:text-gray-400 mb-3" dir="auto">${L({ en: 'Ibn Kathir notes that the opening word "innama" (only/solely) is a particle of restriction — limiting zakat to these eight categories alone. Allah closes the verse with "Knowing, Wise," affirming that this allocation was chosen with perfect divine wisdom.', bn: 'ইবনে কাসির বলেন, শুরুর শব্দ "ইন্নামা" (কেবল/শুধু) একটি নিয়ন্ত্রণকারী শব্দ — যাকাতকে এই আট শ্রেণির মধ্যেই সীমাবদ্ধ করে। আল্লাহ আয়াতটি "জ্ঞানী, প্রজ্ঞাবান" দিয়ে শেষ করেন, নিশ্চিত করেন যে এই বরাদ্দ নিখুঁত ঐশ্বরিক প্রজ্ঞায় নির্ধারিত।' })}</p>
          <div class="space-y-2">
            <div class="p-3 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-900/40">
              <div class="flex gap-2">
                <span class="text-xs font-bold text-teal-700 dark:text-teal-300 bg-teal-200/60 dark:bg-teal-800/40 px-2 py-0.5 rounded shrink-0">1</span>
                <div>
                  <div class="text-sm font-semibold text-teal-800 dark:text-teal-200">${L({ en: 'Al-Fuqara — The Poor', bn: 'আল-ফুকারা — দরিদ্র' })}</div>
                  <p class="text-xs text-teal-700 dark:text-teal-300 mt-0.5" dir="auto">${L({ en: 'Those with little or nothing, unable to meet basic needs. Scholars differ on whether fuqara or masakin are the needier group; the distinction is the faqir may be too proud to ask while the miskin openly seeks help.', bn: 'যাদের প্রায় কিছুই নেই, মৌলিক প্রয়োজন পূরণে অক্ষম। ফকির ও মিসকিনের মধ্যে পার্থক্য নিয়ে আলিমরা দ্বিমত করেন; ফকির অহংকারবশত চাইতে পারে না, মিসকিন প্রকাশ্যে চায়।' })}</p>
                </div>
              </div>
            </div>
            <div class="p-3 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-900/40">
              <div class="flex gap-2">
                <span class="text-xs font-bold text-teal-700 dark:text-teal-300 bg-teal-200/60 dark:bg-teal-800/40 px-2 py-0.5 rounded shrink-0">2</span>
                <div>
                  <div class="text-sm font-semibold text-teal-800 dark:text-teal-200">${L({ en: 'Al-Masakin — The Needy', bn: 'আল-মাসাকীন — অভাবী' })}</div>
                  <p class="text-xs text-teal-700 dark:text-teal-300 mt-0.5" dir="auto">${L({ en: 'Those in hardship who have some income but fall short of sufficiency. The Shafi\'i and Hanbali schools hold the miskin is worse off than the faqir; the Hanafi and Maliki say the reverse.', bn: 'যাদের কিছু আয় আছে কিন্তু প্রয়োজনের জন্য যথেষ্ট নয়। শাফিঈ ও হানবালি মতে মিসকিন ফকিরের চেয়ে বেশি কষ্টে; হানাফি ও মালিকি বলেন বিপরীত।' })}</p>
                </div>
              </div>
            </div>
            <div class="p-3 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-900/40">
              <div class="flex gap-2">
                <span class="text-xs font-bold text-teal-700 dark:text-teal-300 bg-teal-200/60 dark:bg-teal-800/40 px-2 py-0.5 rounded shrink-0">3</span>
                <div>
                  <div class="text-sm font-semibold text-teal-800 dark:text-teal-200">${L({ en: 'Al-Amilin — Zakat Administrators', bn: 'আল-আমিলীন — যাকাত প্রশাসক' })}</div>
                  <p class="text-xs text-teal-700 dark:text-teal-300 mt-0.5" dir="auto">${L({ en: 'Officers appointed by an Islamic authority to collect, distribute, and administer zakat. They receive a salary from zakat funds even if they are personally wealthy — a unique category where wealth disqualification does not apply.', bn: 'ইসলামি কর্তৃপক্ষ কর্তৃক নিযুক্ত যাকাত সংগ্রহ, বিতরণ ও ব্যবস্থাপনাকারী। তারা নিজেরা ধনী হলেও যাকাত তহবিল থেকে বেতন পাবেন — এটি একমাত্র শ্রেণি যেখানে সম্পদের যোগ্যতা প্রযোজ্য নয়।' })}</p>
                </div>
              </div>
            </div>
            <div class="p-3 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-900/40">
              <div class="flex gap-2">
                <span class="text-xs font-bold text-teal-700 dark:text-teal-300 bg-teal-200/60 dark:bg-teal-800/40 px-2 py-0.5 rounded shrink-0">4</span>
                <div>
                  <div class="text-sm font-semibold text-teal-800 dark:text-teal-200">${L({ en: 'Al-Mu\'allafati Qulubuhum — Reconciliation of Hearts', bn: 'আল-মুয়াল্লাফাতি কুলূবুহুম — হৃদয় আকৃষ্টকরণ' })}</div>
                  <p class="text-xs text-teal-700 dark:text-teal-300 mt-0.5" dir="auto">${L({ en: 'New Muslims whose faith is being strengthened, or non-Muslim tribal leaders whose goodwill benefits the Muslim community. Abu Hanifa held this category lapsed after Islam\'s political dominance; the majority maintain it applies whenever circumstances require.', bn: 'নতুন মুসলিম যাদের ঈমান মজবুত করা দরকার, বা অমুসলিম নেতা যাদের সদিচ্ছা মুসলিমদের উপকার করে। আবু হানিফা মনে করতেন ইসলামের রাজনৈতিক শক্তির পর এই শ্রেণি রহিত; জমহুর বলেন পরিস্থিতি অনুযায়ী এখনও প্রযোজ্য।' })}</p>
                </div>
              </div>
            </div>
            <div class="p-3 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-900/40">
              <div class="flex gap-2">
                <span class="text-xs font-bold text-teal-700 dark:text-teal-300 bg-teal-200/60 dark:bg-teal-800/40 px-2 py-0.5 rounded shrink-0">5</span>
                <div>
                  <div class="text-sm font-semibold text-teal-800 dark:text-teal-200">${L({ en: 'Ar-Riqab — Freeing Captives', bn: 'আর-রিকাব — দাসমুক্তি / বন্দিমুক্তি' })}</div>
                  <p class="text-xs text-teal-700 dark:text-teal-300 mt-0.5" dir="auto">${L({ en: 'Historically: helping slaves purchase their freedom (mukatab contract). Contemporary scholars extend this to ransoming Muslim prisoners of war and combating human trafficking — the spirit of liberation from bondage.', bn: 'ঐতিহাসিকভাবে: দাসদের স্বাধীনতা ক্রয়ে সাহায্য (মুকাতাব চুক্তি)। সমসাময়িক আলিমরা এটি মুসলিম যুদ্ধবন্দি মুক্তি ও মানব পাচার বিরোধে প্রসারিত করেন — বন্ধন থেকে মুক্তির চেতনা।' })}</p>
                </div>
              </div>
            </div>
            <div class="p-3 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-900/40">
              <div class="flex gap-2">
                <span class="text-xs font-bold text-teal-700 dark:text-teal-300 bg-teal-200/60 dark:bg-teal-800/40 px-2 py-0.5 rounded shrink-0">6</span>
                <div>
                  <div class="text-sm font-semibold text-teal-800 dark:text-teal-200">${L({ en: 'Al-Gharimin — Debtors', bn: 'আল-গারিমীন — ঋণগ্রস্ত' })}</div>
                  <p class="text-xs text-teal-700 dark:text-teal-300 mt-0.5" dir="auto">${L({ en: 'Those crushed by debt for lawful purposes (personal need, mediating community disputes) and unable to repay. Debts incurred for haram purposes or extravagance do not qualify. Ibn Kathir cites the case of one who incurred debt to reconcile two feuding families.', bn: 'বৈধ কারণে (ব্যক্তিগত প্রয়োজন, সামাজিক বিবাদ মীমাংসা) ঋণে জর্জরিত এবং শোধ করতে অক্ষম। হারাম উদ্দেশ্যে বা অপব্যয়ে নেওয়া ঋণ যোগ্য নয়। ইবনে কাসির দুই পরিবারের বিবাদ মীমাংসায় ঋণগ্রস্তের উদাহরণ উল্লেখ করেন।' })}</p>
                </div>
              </div>
            </div>
            <div class="p-3 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-900/40">
              <div class="flex gap-2">
                <span class="text-xs font-bold text-teal-700 dark:text-teal-300 bg-teal-200/60 dark:bg-teal-800/40 px-2 py-0.5 rounded shrink-0">7</span>
                <div>
                  <div class="text-sm font-semibold text-teal-800 dark:text-teal-200">${L({ en: 'Fi Sabilillah — In the Cause of Allah', bn: 'ফী সাবীলিল্লাহ — আল্লাহর পথে' })}</div>
                  <p class="text-xs text-teal-700 dark:text-teal-300 mt-0.5" dir="auto">${L({ en: 'Classical opinion: soldiers in jihad who lack equipment and provisions. Contemporary scholars (Yusuf al-Qaradawi and others) broaden this to Islamic education, dawah, and building mosques — though the stronger classical opinion restricts it to fighters. A matter of ongoing scholarly debate.', bn: 'ক্লাসিক্যাল মত: সরঞ্জামহীন মুজাহিদ। সমসাময়িক আলিমরা (ইউসুফ আল-কারাদাওয়ি প্রমুখ) ইসলামি শিক্ষা, দাওয়াহ ও মসজিদ নির্মাণে প্রসারিত করেন — তবে শক্তিশালী ক্লাসিক্যাল মত শুধু মুজাহিদে সীমিত। এটি একটি চলমান বিদ্বানী বিতর্ক।' })}</p>
                </div>
              </div>
            </div>
            <div class="p-3 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-900/40">
              <div class="flex gap-2">
                <span class="text-xs font-bold text-teal-700 dark:text-teal-300 bg-teal-200/60 dark:bg-teal-800/40 px-2 py-0.5 rounded shrink-0">8</span>
                <div>
                  <div class="text-sm font-semibold text-teal-800 dark:text-teal-200">${L({ en: 'Ibn as-Sabil — The Stranded Traveler', bn: 'ইবনুস সাবীল — পথে আটকা মুসাফির' })}</div>
                  <p class="text-xs text-teal-700 dark:text-teal-300 mt-0.5" dir="auto">${L({ en: 'A traveler who has run out of resources while away from home — even if wealthy at home — given enough to reach their destination. Ibn Kathir specifies the amount should be what is sufficient for the journey, no more.', bn: 'গৃহ থেকে দূরে সম্বলহীন মুসাফির — বাড়িতে ধনী হলেও — গন্তব্যে পৌঁছানোর মতো সাহায্য পাবেন। ইবনে কাসির বলেন পরিমাণ শুধু যাত্রার জন্য যথেষ্ট, বেশি নয়।' })}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">💡 ${L({ en: 'Key Rulings', bn: 'প্রধান বিধান' })}</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40">
              <div class="text-sm font-semibold text-gray-700 dark:text-gray-200">${L({ en: 'Who pays Zakat', bn: 'কে যাকাত দেবেন' })}</div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1" dir="auto">${L({ en: 'Every adult, sane Muslim who possesses the nisab (minimum threshold) for one lunar year.', bn: 'প্রত্যেক প্রাপ্তবয়স্ক, সুস্থ বিবেকসম্পন্ন মুসলিম যার নেসাব পরিমাণ সম্পদ এক চান্দ্র বছর ধরে থাকে।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40">
              <div class="text-sm font-semibold text-gray-700 dark:text-gray-200">${L({ en: 'Nisab (Threshold)', bn: 'নেসাব (সর্বনিম্ন সীমা)' })}</div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1" dir="auto">${L({ en: 'Equivalent to 85g of gold or 595g of silver. Value changes with market price.', bn: '৮৫ গ্রাম সোনা বা ৫৯৫ গ্রাম রুপার সমতুল্য। বাজারমূল্য অনুযায়ী মান পরিবর্তিত হয়।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40">
              <div class="text-sm font-semibold text-gray-700 dark:text-gray-200">${L({ en: 'Rate', bn: 'হার' })}</div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1" dir="auto">${L({ en: '2.5% of qualifying wealth (cash, gold, silver, business inventory).', bn: 'পাত্ত্য সম্পদের ২.৫% (নগদ, সোনা, রুপা, ব্যবসায়িক পণ্য)।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40">
              <div class="text-sm font-semibold text-gray-700 dark:text-gray-200">${L({ en: 'Recipients', bn: 'প্রাপক' })}</div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1" dir="auto">${L({ en: 'Eight categories listed in 9:60 — poor, needy, collectors, new Muslims, slaves, debtors, Allah\'s cause, travelers.', bn: '৯:৬০-এ আট শ্রেণী — ফকীর, মিসকীন, আদায়কারী, নওমুসলিম, দাস, ঋণী, আল্লাহর পথে, মুসাফির।' })}</p>
            </div>
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">🌸 ${L({ en: 'Spiritual Benefits', bn: 'আধ্যাত্মিক ফজিলত' })}</h3>
          <ul class="space-y-2">
            <li class="flex gap-2 text-sm text-gray-600 dark:text-gray-300" dir="auto"><span class="text-green-500 shrink-0">✓</span> ${L({ en: 'Purifies wealth and soul — 9:103', bn: 'সম্পদ ও আত্মাকে পবিত্র করে — ৯:১০৩' })}</li>
            <li class="flex gap-2 text-sm text-gray-600 dark:text-gray-300" dir="auto"><span class="text-green-500 shrink-0">✓</span> ${L({ en: 'Multiplying reward — the parable of a grain that grows seven hundredfold (2:261)', bn: 'সওয়াব বহুগুণ বৃদ্ধি করে — একটি দানার উদাহরণ যা সাতশ গুণ হয় (২:২৬১)' })}</li>
            <li class="flex gap-2 text-sm text-gray-600 dark:text-gray-300" dir="auto"><span class="text-green-500 shrink-0">✓</span> ${L({ en: 'Fosters social justice and brotherhood', bn: 'সামাজিক ন্যায়বিচার ও ভ্রাতৃত্ব স্থাপন করে' })}</li>
            <li class="flex gap-2 text-sm text-gray-600 dark:text-gray-300" dir="auto"><span class="text-green-500 shrink-0">✓</span> ${L({ en: 'Protects from miserliness and love of wealth', bn: 'কৃপণতা ও সম্পদের মোহ থেকে রক্ষা করে' })}</li>
          </ul>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">📚 ${L({ en: 'More Quranic References', bn: 'আরও কুরআনি রেফারেন্স' })}</h3>
          <div class="flex flex-wrap gap-2">
            <button type="button" data-zakat-ayah="2:177" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary hover:text-white transition-colors">📖 2:177</button>
            <button type="button" data-zakat-ayah="2:267" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary hover:text-white transition-colors">📖 2:267</button>
            <button type="button" data-zakat-ayah="2:261" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary hover:text-white transition-colors">📖 2:261</button>
            <button type="button" data-zakat-ayah="30:39" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary hover:text-white transition-colors">📖 30:39</button>
            <button type="button" data-zakat-ayah="58:12" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary hover:text-white transition-colors">📖 58:12</button>
            <button type="button" data-zakat-ayah="2:110" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary hover:text-white transition-colors">📖 2:110</button>
            <button type="button" data-zakat-ayah="73:20" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary hover:text-white transition-colors">📖 73:20</button>
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">📜 ${L({ en: 'Zakat in Hadith', bn: 'হাদিসে যাকাত' })}</h3>
          <div class="space-y-3">
            <div class="p-3 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-900/40">
              <p class="text-sm text-teal-800 dark:text-teal-200 leading-relaxed" dir="auto">${L({ en: '"Protect your wealth by paying zakat." — Tabarani (hasan)', bn: '"তোমাদের সম্পদ যাকাত দ্বারা রক্ষা করো।" — তাবারানি (হাসান)' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-900/40">
              <p class="text-sm text-teal-800 dark:text-teal-200 leading-relaxed" dir="auto">${L({ en: '"The one who gives charity secretly will be under the shade of Allah\'s Throne on the Day of Judgment." — Bukhari', bn: '"যে ব্যক্তি গোপনে সদকা দেয়, কিয়ামতের দিন সে আল্লাহর আরশের ছায়ায় থাকবে।" — বুখারি' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-900/40">
              <p class="text-sm text-teal-800 dark:text-teal-200 leading-relaxed" dir="auto">${L({ en: '"No people withhold the zakat of their wealth but they are afflicted with famine." — Tabarani', bn: '"যে সম্প্রদায় তাদের সম্পদের যাকাত দেয় না, তারা দুর্ভিক্ষের সম্মুখীন হয়।" — তাবারানি' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-900/40">
              <p class="text-sm text-teal-800 dark:text-teal-200 leading-relaxed" dir="auto">${L({ en: '"Charity does not decrease wealth." — Sahih Muslim', bn: '"সদকা সম্পদ কমায় না।" — সহীহ মুসলিম' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-900/40">
              <p class="text-sm text-teal-800 dark:text-teal-200 leading-relaxed" dir="auto">${L({ en: '"Islam is built on five: testifying there is no god but Allah and Muhammad is His Messenger, establishing prayer, paying zakat, making pilgrimage, and fasting Ramadan." — Sahih al-Bukhari & Muslim', bn: '"ইসলাম পাঁচটি স্তম্ভের উপর প্রতিষ্ঠিত: আল্লাহ ছাড়া কোনো ইলাহ নেই এবং মুহাম্মদ তাঁর রাসূল — এই সাক্ষ্য দেওয়া, সালাত কায়েম করা, যাকাত দেওয়া, হজ করা এবং রমজানে রোজা রাখা।" — সহীহ বুখারি ও মুসলিম' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-900/40">
              <p class="text-sm text-teal-800 dark:text-teal-200 leading-relaxed" dir="auto">${L({ en: '"Whoever is made wealthy by Allah and does not pay zakat of his wealth, on the Day of Resurrection his wealth will be made like a bald-headed poisonous male snake that will coil around his neck and bite his cheeks saying: I am your wealth, I am your treasure." — Sahih al-Bukhari', bn: '"আল্লাহ যাকে ধন-সম্পদ দিয়েছেন কিন্তু সে যাকাত দেয়নি, কিয়ামতের দিন তার সম্পদকে বিষধর সাপে পরিণত করা হবে যা তার গলায় পেঁচিয়ে কামড় দিতে থাকবে এবং বলবে: আমি তোমার সম্পদ, আমি তোমার সঞ্চয়।" — সহীহ বুখারি' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-900/40">
              <p class="text-sm text-teal-800 dark:text-teal-200 leading-relaxed" dir="auto">${L({ en: '"Every day two angels descend and one says: O Allah! Compensate every person who spends in Your cause. And the other says: O Allah! Bring ruin upon the miser." — Sahih al-Bukhari', bn: '"প্রতিদিন দুজন ফেরেশতা অবতরণ করেন; একজন বলেন: হে আল্লাহ! যে আপনার পথে ব্যয় করে তাকে বিনিময় দিন। আর অন্যজন বলেন: হে আল্লাহ! কৃপণকে ধ্বংস করুন।" — সহীহ বুখারি' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-900/40">
              <p class="text-sm text-teal-800 dark:text-teal-200 leading-relaxed" dir="auto">${L({ en: '"The upper hand is better than the lower hand. The upper hand is the one that gives, and the lower hand is the one that takes." — Sahih al-Bukhari & Muslim', bn: '"উপরের হাত নিচের হাতের চেয়ে উত্তম। উপরের হাত দানকারীর এবং নিচের হাত গ্রহণকারীর।" — সহীহ বুখারি ও মুসলিম' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-900/40">
              <p class="text-sm text-teal-800 dark:text-teal-200 leading-relaxed" dir="auto">${L({ en: '"Give charity without delay, for it stands in the way of calamity." — Sunan al-Tirmidhi (hasan)', bn: '"দেরি না করে সদকা করো, কারণ তা বিপদের পথে বাধা হয়ে দাঁড়ায়।" — সুনান তিরমিযি (হাসান)' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-900/40">
              <p class="text-sm text-teal-800 dark:text-teal-200 leading-relaxed" dir="auto">${L({ en: '"Every Muslim must give sadaqah." They asked: What about those who have nothing? He said: "He should work and give. If he cannot work: help someone in need. If he cannot: do good and refrain from evil — this is sadaqah." — Sahih al-Bukhari', bn: '"প্রত্যেক মুসলিমের উপর সদকা করা আবশ্যক।" জিজ্ঞেস করা হলো: যার কিছু নেই? তিনি বললেন: "কাজ করুক এবং নিজের উপকার করুক ও দান করুক। যদি না পারে: সাহায্য প্রার্থীকে সাহায্য করুক। যদি না পারে: ভালো করুক ও মন্দ থেকে বিরত থাকুক — এটিও সদকা।" — সহীহ বুখারি' })}</p>
            </div>
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">🧮 ${L({ en: 'Zakat Calculator', bn: 'যাকাত ক্যালকুলেটর' })}</h3>
          <p class="text-xs text-gray-500 dark:text-gray-400 mb-4">${L({ en: 'Enter your asset values below to calculate your zakat obligation (2.5%).', bn: 'নিচে আপনার সম্পদের মূল্য লিখুন এবং আপনার যাকাতের পরিমাণ গণনা করুন (২.৫%)।' })}</p>
          <div class="space-y-3">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">${L({ en: 'Cash & Savings', bn: 'নগদ ও সঞ্চয়' })}</label>
              <input type="number" id="zakat-cash" class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder="0" min="0" step="0.01">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">${L({ en: 'Gold Value', bn: 'স্বর্ণের মূল্য' })}</label>
              <input type="number" id="zakat-gold" class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder="0" min="0" step="0.01">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">${L({ en: 'Silver Value', bn: 'রূপার মূল্য' })}</label>
              <input type="number" id="zakat-silver" class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder="0" min="0" step="0.01">
            </div>
            <button type="button" id="zakat-calc-btn" class="w-full px-4 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-medium text-sm transition-colors">${L({ en: 'Calculate Zakat', bn: 'যাকাত গণনা করুন' })}</button>
            <div id="zakat-result" class="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700 text-center hidden">
              <div class="text-sm text-gray-500 dark:text-gray-400">${L({ en: 'Your estimated zakat:', bn: 'আপনার আনুমানিক যাকাত:' })}</div>
              <div class="text-2xl font-bold text-teal-600 dark:text-teal-400" id="zakat-amount">0.00</div>
            </div>
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">📋 ${L({ en: 'Zakat on Different Asset Types', bn: 'বিভিন্ন সম্পদে যাকাত' })}</h3>
          <div class="space-y-3">
            <div class="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40">
              <div class="flex items-center justify-between">
                <span class="text-sm font-semibold text-gray-700 dark:text-gray-200">${L({ en: 'Cash & Savings', bn: 'নগদ ও সঞ্চয়' })}</span>
                <span class="text-xs font-medium text-teal-600 dark:text-teal-400">2.5%</span>
              </div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">${L({ en: 'Includes bank accounts, cash in hand, and savings. Zakat is due after one lunar year.', bn: 'ব্যাংক অ্যাকাউন্ট, হাতে থাকা নগদ ও সঞ্চয় অন্তর্ভুক্ত। এক চান্দ্র বছর পর যাকাত দেয়া হয়।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40">
              <div class="flex items-center justify-between">
                <span class="text-sm font-semibold text-gray-700 dark:text-gray-200">${L({ en: 'Gold & Silver', bn: 'স্বর্ণ ও রূপা' })}</span>
                <span class="text-xs font-medium text-teal-600 dark:text-teal-400">2.5%</span>
              </div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">${L({ en: 'On jewelry, coins, and bullion above the nisab threshold.', bn: 'নেসাব পরিমাণের বেশি গহনা, মুদ্রা ও বুলিয়নের উপর।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40">
              <div class="flex items-center justify-between">
                <span class="text-sm font-semibold text-gray-700 dark:text-gray-200">${L({ en: 'Business Inventory', bn: 'ব্যবসায়িক পণ্য' })}</span>
                <span class="text-xs font-medium text-teal-600 dark:text-teal-400">2.5%</span>
              </div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">${L({ en: 'Goods held for trade valued at cost price or market value.', bn: 'বিক্রয়ের জন্য রাখা পণ্য — ক্রয়মূল্য বা বাজারমূল্য অনুযায়ী।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40">
              <div class="flex items-center justify-between">
                <span class="text-sm font-semibold text-gray-700 dark:text-gray-200">${L({ en: 'Agricultural Produce', bn: 'কৃষিজ ফসল' })}</span>
                <span class="text-xs font-medium text-teal-600 dark:text-teal-400">10% / 5%</span>
              </div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">${L({ en: '10% on naturally irrigated crops, 5% on artificially irrigated — due at harvest.', bn: 'প্রাকৃতিক সেচে ১০%, কৃত্রিম সেচে ৫% — ফসল তোলার সময় দিতে হবে।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40">
              <div class="flex items-center justify-between">
                <span class="text-sm font-semibold text-gray-700 dark:text-gray-200">${L({ en: 'Livestock', bn: 'গবাদি পশু' })}</span>
                <span class="text-xs font-medium text-teal-600 dark:text-teal-400">${L({ en: 'Varies', bn: 'পরিবর্তনশীল' })}</span>
              </div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">${L({ en: 'Zakat on camels, cattle, sheep, and goats when they reach specific numbers and are pasture-fed.', bn: 'উট, গরু, ভেড়া ও ছাগলের নির্দিষ্ট সংখ্যা ও চারণভূমি-প্রতিপালিত হলে যাকাত দেয়া হয়।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40">
              <div class="flex items-center justify-between">
                <span class="text-sm font-semibold text-gray-700 dark:text-gray-200">${L({ en: 'Investments', bn: 'বিনিয়োগ' })}</span>
                <span class="text-xs font-medium text-teal-600 dark:text-teal-400">2.5%</span>
              </div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">${L({ en: 'Stocks, mutual funds, rental income, and pension funds with zakat on principal or profit.', bn: 'শেয়ার, মিউচুয়াল ফান্ড, ভাড়া আয় ও পেনশন তহবিল — মূলধন বা মুনাফার উপর যাকাত।' })}</p>
            </div>
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">⚖️ ${L({ en: 'Sadaqah vs Zakat', bn: 'সদকা ও যাকাতের পার্থক্য' })}</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="p-3 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-900/40">
              <div class="text-sm font-semibold text-teal-700 dark:text-teal-300">${L({ en: 'Zakat (Obligatory)', bn: 'যাকাত (ফরয)' })}</div>
              <ul class="mt-2 space-y-1">
                <li class="text-xs text-teal-600 dark:text-teal-400 flex gap-1"><span>•</span> ${L({ en: 'One of the five pillars of Islam', bn: 'ইসলামের পঞ্চস্তম্ভের একটি' })}</li>
                <li class="text-xs text-teal-600 dark:text-teal-400 flex gap-1"><span>•</span> ${L({ en: 'Fixed rate of 2.5% on qualifying wealth', bn: 'পাত্ত্য সম্পদের উপর ২.৫% নির্ধারিত হার' })}</li>
                <li class="text-xs text-teal-600 dark:text-teal-400 flex gap-1"><span>•</span> ${L({ en: 'Specific recipients — 8 categories in Quran 9:60', bn: 'নির্দিষ্ট প্রাপক — কুরআন ৯:৬০-এ ৮ শ্রেণী' })}</li>
                <li class="text-xs text-teal-600 dark:text-teal-400 flex gap-1"><span>•</span> ${L({ en: 'Annual obligation after nisab and one lunar year', bn: 'নেসাব ও এক চান্দ্র বছর পর বার্ষিক ফরয' })}</li>
              </ul>
            </div>
            <div class="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/40">
              <div class="text-sm font-semibold text-amber-700 dark:text-amber-300">${L({ en: 'Sadaqah (Voluntary)', bn: 'সদকা (স্বেচ্ছায়)' })}</div>
              <ul class="mt-2 space-y-1">
                <li class="text-xs text-amber-600 dark:text-amber-400 flex gap-1"><span>•</span> ${L({ en: 'Voluntary charity — given at any time', bn: 'স্বেচ্ছাধীন দান — যেকোনো সময় দেওয়া যায়' })}</li>
                <li class="text-xs text-amber-600 dark:text-amber-400 flex gap-1"><span>•</span> ${L({ en: 'No fixed amount or minimum rate', bn: 'কোনো নির্ধারিত পরিমাণ বা হার নেই' })}</li>
                <li class="text-xs text-amber-600 dark:text-amber-400 flex gap-1"><span>•</span> ${L({ en: 'Can be given to anyone in need', bn: 'যেকোনো প্রয়োজনগ্রস্তকে দেওয়া যায়' })}</li>
                <li class="text-xs text-amber-600 dark:text-amber-400 flex gap-1"><span>•</span> ${L({ en: 'Includes money, food, kind words, even a smile', bn: 'টাকা, খাবার, ভালো কথা, এমনকি হাসিও সদকা' })}</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">👥 ${L({ en: 'The 8 Categories of Recipients (Asnaf)', bn: 'যাকাতের ৮ শ্রেণির প্রাপক (আসনাফ)' })}</h3>
          <p class="text-xs text-gray-500 dark:text-gray-400 mb-3" dir="auto">${L({ en: 'Allah has restricted zakat to eight specific categories mentioned in Surah at-Tawbah (9:60). Zakat given outside these categories is not valid.', bn: 'আল্লাহ যাকাতকে সূরা তাওবার (৯:৬০) নির্দিষ্ট আট শ্রেণির জন্য নির্ধারণ করেছেন। এর বাইরে কাউকে দিলে যাকাত আদায় হবে না।' })}</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="p-3 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-900/40">
              <div class="text-sm font-semibold text-teal-800 dark:text-teal-200">1. ${L({ en: 'Al-Fuqara (The Poor)', bn: '১. আল-ফুকারা (দরিদ্র)' })}</div>
              <p class="text-xs text-teal-700 dark:text-teal-300 mt-1" dir="auto">${L({ en: 'Those who have little or nothing and cannot meet their basic needs.', bn: 'যাদের প্রায় কিছুই নেই এবং যারা মৌলিক প্রয়োজন পূরণ করতে পারে না।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-900/40">
              <div class="text-sm font-semibold text-teal-800 dark:text-teal-200">2. ${L({ en: 'Al-Masakin (The Needy)', bn: '২. আল-মাসাকীন (অভাবী)' })}</div>
              <p class="text-xs text-teal-700 dark:text-teal-300 mt-1" dir="auto">${L({ en: 'Those in hardship who have some income but not enough to cover their basic needs.', bn: 'যাদের কিছু আয় আছে কিন্তু মৌলিক প্রয়োজনের জন্য যথেষ্ট নয়।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-900/40">
              <div class="text-sm font-semibold text-teal-800 dark:text-teal-200">3. ${L({ en: 'Al-\'Amilin (Zakat Administrators)', bn: '৩. আল-আমিলীন (যাকাত আদায়কারী)' })}</div>
              <p class="text-xs text-teal-700 dark:text-teal-300 mt-1" dir="auto">${L({ en: 'Those appointed by an Islamic authority to collect, distribute, and administer zakat.', bn: 'ইসলামি কর্তৃপক্ষ কর্তৃক নিযুক্ত যাকাত সংগ্রহ, বিতরণ ও ব্যবস্থাপনার দায়িত্বপ্রাপ্ত ব্যক্তি।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-900/40">
              <div class="text-sm font-semibold text-teal-800 dark:text-teal-200">4. ${L({ en: 'Al-Mu\'allafati Qulubuhum (Reconciliation of Hearts)', bn: '৪. আল-মুয়াল্লাফাতি কুলূবুহুম (হৃদয় আকৃষ্টকরণ)' })}</div>
              <p class="text-xs text-teal-700 dark:text-teal-300 mt-1" dir="auto">${L({ en: 'New Muslims or those inclined toward Islam whose hearts are being reconciled to the faith.', bn: 'নতুন মুসলিম বা যাদের হৃদয় ইসলামের প্রতি আকৃষ্ট করা দরকার।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-900/40">
              <div class="text-sm font-semibold text-teal-800 dark:text-teal-200">5. ${L({ en: 'Ar-Riqab (Freeing Captives / Slaves)', bn: '৫. আর-রিকাব (দাসমুক্তি / বন্দিমুক্তি)' })}</div>
              <p class="text-xs text-teal-700 dark:text-teal-300 mt-1" dir="auto">${L({ en: 'Historically freeing slaves; today extended to ransoming Muslim captives and modern anti-trafficking efforts.', bn: 'ঐতিহাসিকভাবে দাসমুক্তি; আজ মুসলিম বন্দিদের মুক্তি ও মানব পাচার বিরোধী প্রচেষ্টা।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-900/40">
              <div class="text-sm font-semibold text-teal-800 dark:text-teal-200">6. ${L({ en: 'Al-Gharimin (Debtors)', bn: '৬. আল-গারিমীন (ঋণগ্রস্ত)' })}</div>
              <p class="text-xs text-teal-700 dark:text-teal-300 mt-1" dir="auto">${L({ en: 'Those burdened by debt they cannot repay — provided the debt was for a lawful purpose.', bn: 'যারা ঋণে জর্জরিত এবং শোধ করতে অক্ষম — যদি ঋণ বৈধ কারণে হয়ে থাকে।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-900/40">
              <div class="text-sm font-semibold text-teal-800 dark:text-teal-200">7. ${L({ en: 'Fi Sabilillah (In the Cause of Allah)', bn: '৭. ফী সাবীলিল্লাহ (আল্লাহর পথে)' })}</div>
              <p class="text-xs text-teal-700 dark:text-teal-300 mt-1" dir="auto">${L({ en: 'Traditionally military jihad; scholars today also include broader efforts serving Islam — da\'wah, education, and building mosques according to many.', bn: 'ঐতিহ্যগতভাবে জিহাদ; বর্তমানে অনেক আলিমের মতে দাওয়াহ, শিক্ষা ও মসজিদ নির্মাণসহ ইসলামের ব্যাপক পরিসরে সেবা।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-900/40">
              <div class="text-sm font-semibold text-teal-800 dark:text-teal-200">8. ${L({ en: 'Ibn as-Sabil (Stranded Traveler)', bn: '৮. ইবনুস সাবীল (মুসাফির)' })}</div>
              <p class="text-xs text-teal-700 dark:text-teal-300 mt-1" dir="auto">${L({ en: 'A traveler cut off from means, even if wealthy at home — enough to reach their destination.', bn: 'যে মুসাফির পথে সহায়সম্বলহীন, বাড়িতে ধনবান হলেও — গন্তব্যে পৌঁছানোর মতো সাহায্য।' })}</p>
            </div>
          </div>
          <div class="mt-3 p-3 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-900/40">
            <div class="text-xs font-semibold text-rose-800 dark:text-rose-200">🚫 ${L({ en: 'Zakat cannot be given to:', bn: 'যাদের যাকাত দেওয়া যাবে না:' })}</div>
            <p class="text-xs text-rose-700 dark:text-rose-300 mt-1" dir="auto">${L({ en: 'Parents, grandparents, children, grandchildren, or spouse (you are already responsible for their support); non-Muslims (per majority opinion for zakat, though sadaqah is permitted); the wealthy; and descendants of the Prophet ﷺ (Banu Hashim) per many scholars.', bn: 'পিতামাতা, দাদা-দাদী, সন্তান, নাতি-নাতনি বা স্বামী/স্ত্রী (তাদের ভরণপোষণে আপনি এমনিতেই দায়ী); অমুসলিমকে (যাকাতের ক্ষেত্রে জমহুরের মত, তবে সদকা বৈধ); ধনী ব্যক্তি; এবং অনেক আলিমের মতে নবী ﷺ-এর বংশধর (বনু হাশিম)।' })}</p>
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">🌟 ${L({ en: 'Etiquette of Giving & Common Mistakes', bn: 'দান করার আদব ও সাধারণ ভুল' })}</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/40">
              <div class="text-sm font-semibold text-emerald-800 dark:text-emerald-200">✅ ${L({ en: 'Best manners of giving', bn: 'দানের সর্বোত্তম আদব' })}</div>
              <ul class="mt-2 space-y-1">
                <li class="text-xs text-emerald-700 dark:text-emerald-300 flex gap-1"><span>•</span> ${L({ en: 'Give in secret whenever possible (2:271)', bn: 'যতটা সম্ভব গোপনে দিন (২:২৭১)' })}</li>
                <li class="text-xs text-emerald-700 dark:text-emerald-300 flex gap-1"><span>•</span> ${L({ en: 'Give from the best of what you own, not the leftover (2:267)', bn: 'যা আপনার কাছে সবচেয়ে উত্তম তা থেকে দিন, বাদ দেয়া অংশ থেকে নয় (২:২৬৭)' })}</li>
                <li class="text-xs text-emerald-700 dark:text-emerald-300 flex gap-1"><span>•</span> ${L({ en: 'Preserve the dignity of the recipient — do not follow charity with reminders or hurt (2:264)', bn: 'গ্রহীতার সম্মান রক্ষা করুন — দানের পর খোঁটা বা কষ্ট দেবেন না (২:২৬৪)' })}</li>
                <li class="text-xs text-emerald-700 dark:text-emerald-300 flex gap-1"><span>•</span> ${L({ en: 'Make sincere intention — for Allah alone', bn: 'ইখলাসের সাথে নিয়ত করুন — শুধু আল্লাহর জন্য' })}</li>
                <li class="text-xs text-emerald-700 dark:text-emerald-300 flex gap-1"><span>•</span> ${L({ en: 'Prefer close relatives who are eligible (double reward: charity + upholding ties)', bn: 'উপযুক্ত নিকটাত্মীয়দের অগ্রাধিকার দিন (দ্বৈত সওয়াব: দান + আত্মীয়তা রক্ষা)' })}</li>
                <li class="text-xs text-emerald-700 dark:text-emerald-300 flex gap-1"><span>•</span> ${L({ en: 'Verify the recipient is truly eligible', bn: 'গ্রহীতা প্রকৃতপক্ষে পাত্ত্য কিনা যাচাই করুন' })}</li>
              </ul>
            </div>
            <div class="p-3 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-900/40">
              <div class="text-sm font-semibold text-rose-800 dark:text-rose-200">⚠️ ${L({ en: 'Common mistakes to avoid', bn: 'যে ভুলগুলো এড়ানো উচিত' })}</div>
              <ul class="mt-2 space-y-1">
                <li class="text-xs text-rose-700 dark:text-rose-300 flex gap-1"><span>•</span> ${L({ en: 'Forgetting to include gold jewelry in the calculation', bn: 'স্বর্ণের গহনা হিসাবে অন্তর্ভুক্ত না করা' })}</li>
                <li class="text-xs text-rose-700 dark:text-rose-300 flex gap-1"><span>•</span> ${L({ en: 'Only counting the money "left over" instead of all zakatable assets', bn: 'সম্পূর্ণ যাকাতযোগ্য সম্পদের বদলে শুধু "অবশিষ্ট" টাকার হিসাব করা' })}</li>
                <li class="text-xs text-rose-700 dark:text-rose-300 flex gap-1"><span>•</span> ${L({ en: 'Missing the hawl anniversary and delaying payment year after year', bn: 'হাওল (বার্ষিকী) মিস করে বছরের পর বছর দেরি করা' })}</li>
                <li class="text-xs text-rose-700 dark:text-rose-300 flex gap-1"><span>•</span> ${L({ en: 'Confusing zakat with general sadaqah — zakat has specific rules', bn: 'যাকাতকে সাধারণ সদকার সাথে গুলিয়ে ফেলা — যাকাতের নিজস্ব নিয়ম আছে' })}</li>
                <li class="text-xs text-rose-700 dark:text-rose-300 flex gap-1"><span>•</span> ${L({ en: 'Giving to ineligible recipients (e.g., building a mosque with pure zakat funds is disputed)', bn: 'অ-পাত্ত্য প্রাপকদের দেওয়া (যেমন খাঁটি যাকাত দিয়ে মসজিদ নির্মাণ বিতর্কিত)' })}</li>
                <li class="text-xs text-rose-700 dark:text-rose-300 flex gap-1"><span>•</span> ${L({ en: 'Publicizing zakat given for reputation instead of Allah\'s pleasure', bn: 'আল্লাহর সন্তুষ্টির বদলে খ্যাতির জন্য দান প্রচার করা' })}</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">🎁 ${L({ en: 'Zakat al-Fitr — Special Ramadan Charity', bn: 'যাকাতুল ফিতর — রমজানের বিশেষ সদকা' })}</h3>
          <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3" dir="auto">${L({ en: 'Distinct from the annual wealth zakat, Zakat al-Fitr (also called Sadaqatul Fitr) is obligatory on every Muslim — young, old, male, female, free or dependent — paid before the Eid al-Fitr prayer. It purifies the fast from any shortcomings and ensures the poor share in the joy of Eid.', bn: 'বার্ষিক সম্পদের যাকাত থেকে ভিন্ন, যাকাতুল ফিতর (সাদাকাতুল ফিতরও বলা হয়) প্রত্যেক মুসলিমের জন্য ফরয — ছোট-বড়, নারী-পুরুষ, স্বাধীন বা নির্ভরশীল — যা ঈদুল ফিতরের নামাজের আগে আদায় করতে হয়। এটি রোজাকে ত্রুটি থেকে পবিত্র করে এবং গরিবরা যেন ঈদের আনন্দে অংশ নিতে পারে তা নিশ্চিত করে।' })}</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/40">
              <div class="text-sm font-semibold text-amber-800 dark:text-amber-200">${L({ en: 'Amount', bn: 'পরিমাণ' })}</div>
              <p class="text-xs text-amber-700 dark:text-amber-300 mt-1" dir="auto">${L({ en: 'One Sa\' (~2.5-3 kg) of the region\'s staple food (dates, wheat, rice, barley) per person; or its cash equivalent.', bn: 'অঞ্চলের প্রধান খাদ্যের এক সা\' (প্রায় ২.৫-৩ কেজি) — খেজুর, গম, চাল, যব — প্রতিজনের জন্য; অথবা মূল্যের সমান নগদ।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/40">
              <div class="text-sm font-semibold text-amber-800 dark:text-amber-200">${L({ en: 'When to pay', bn: 'কখন দিতে হবে' })}</div>
              <p class="text-xs text-amber-700 dark:text-amber-300 mt-1" dir="auto">${L({ en: 'Best on Eid morning before the Eid prayer. May be paid one or two days earlier; if delayed after the prayer it becomes ordinary sadaqah, not Zakat al-Fitr.', bn: 'সর্বোত্তম ঈদের সকালে ঈদের নামাজের আগে। এক-দুই দিন আগেও দেওয়া যায়; নামাজের পর দিলে সাধারণ সদকা হিসেবে গণ্য হবে, যাকাতুল ফিতর নয়।' })}</p>
            </div>
          </div>
        </div>

        
          <div class="space-y-3">
            <div class="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40">
              <div class="text-sm font-semibold text-gray-700 dark:text-gray-200">${L({ en: 'Can I give zakat to my brother?', bn: 'আমি কি আমার ভাইকে যাকাত দিতে পারি?' })}</div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1" dir="auto">${L({ en: 'Most scholars say you cannot give zakat to immediate family members you are obliged to support (parents, children, spouse). However, you may give zakat to a brother or sister if they are among the eight eligible categories and you are not financially responsible for them.', bn: 'বেশিরভাগ আলিমের মতে, আপনি যাদের ভরণপোষণ দিতে বাধ্য (পিতামাতা, সন্তান, স্বামী/স্ত্রী) তাদের যাকাত দিতে পারবেন না। তবে ভাই বা বোনকে যাকাত দেওয়া যাবে যদি তারা আটটি পাত্ত্য শ্রেণীর মধ্যে হন এবং আপনি তাদের জন্য আর্থিকভাবে দায়ী না হন।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40">
              <div class="text-sm font-semibold text-gray-700 dark:text-gray-200">${L({ en: 'When is zakat due?', bn: 'যাকাত কখন দিতে হবে?' })}</div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1" dir="auto">${L({ en: 'Zakat becomes due once you have possessed the nisab amount for one complete lunar year (hawl). You may pay at any time during the year, but many choose Ramadan for greater reward.', bn: 'যাকাত তখনই ফরয হয় যখন আপনার কাছে নেসাব পরিমাণ সম্পদ এক পূর্ণ চান্দ্র বছর (হাওল) ধরে থাকে। আপনি বছরের যেকোনো সময় দিতে পারেন, তবে অনেকে অধিক সওয়াবের জন্য রমজানে দিয়ে থাকেন।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40">
              <div class="text-sm font-semibold text-gray-700 dark:text-gray-200">${L({ en: 'Can I pay zakat in installments?', bn: 'আমি কি কিস্তিতে যাকাত দিতে পারি?' })}</div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1" dir="auto">${L({ en: 'Yes, you may pay zakat in installments throughout the year as long as the full amount is discharged by the end of the lunar year. It is advisable to calculate and set aside the amount early to ensure timely payment.', bn: 'হ্যাঁ, আপনি সারা বছর কিস্তিতে যাকাত দিতে পারেন যতক্ষণ না চান্দ্র বছরের শেষে পুরো পরিমাণ আদায় করা হয়। সময়মতো পরিশোধ নিশ্চিত করতে পরিমাণটি আগে থেকেই গণনা করে আলাদা করে রাখা উত্তম।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40">
              <div class="text-sm font-semibold text-gray-700 dark:text-gray-200">${L({ en: 'What about zakat on salary?', bn: 'বেতনের উপর যাকাত কীভাবে?' })}</div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1" dir="auto">${L({ en: 'Your salary itself is not subject to zakat when received. However, savings from your salary that remain for one lunar year and exceed the nisab threshold are subject to zakat. Track your cumulative savings and include them in your annual zakat calculation.', bn: 'বেতন প্রাপ্তির মুহূর্তে তার উপর যাকাত ফরয নয়। তবে বেতন থেকে সঞ্চিত অর্থ যদি এক চান্দ্র বছর ধরে থাকে এবং নেসাব পরিমাণের বেশি হয়, তবে তার উপর যাকাত দিতে হবে। আপনার সঞ্চয়ের হিসাব রাখুন এবং বার্ষিক যাকাত গণনায় অন্তর্ভুক্ত করুন।' })}</p>
            </div>
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">💻 ${L({ en: 'Modern Assets — Zakat Rulings', bn: 'আধুনিক সম্পদ — যাকাতের বিধান' })}</h3>
          <p class="text-xs text-gray-500 dark:text-gray-400 mb-3" dir="auto">${L({ en: 'Contemporary scholarly positions on new forms of wealth — primarily based on Fiqh az-Zakah (Yusuf al-Qaradawi) and AAOIFI standards.', bn: 'নতুন ধরনের সম্পদে সমসাময়িক বিদ্বানী অবস্থান — মূলত ফিকহ আয-যাকাহ (ইউসুফ আল-কারাদাওয়ি) ও AAOIFI মানদণ্ড থেকে।' })}</p>
          <div class="space-y-3">
            <div class="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40">
              <div class="flex items-center justify-between mb-1">
                <span class="text-sm font-semibold text-gray-700 dark:text-gray-200">₿ ${L({ en: 'Cryptocurrency', bn: 'ক্রিপ্টোকারেন্সি' })}</span>
                <span class="text-xs font-medium text-teal-600 dark:text-teal-400">2.5%</span>
              </div>
              <p class="text-xs text-gray-500 dark:text-gray-400" dir="auto">${L({ en: 'Majority of contemporary scholars (AAOIFI, ECFR, and others) hold that cryptocurrency held as wealth or for trade is zakatable as mal (wealth). Calculate at market value on the hawl anniversary at 2.5%. Crypto mining income is zakatable as income when received. A minority view withholds ruling until the asset class stabilises.', bn: 'সমসাময়িক আলিমদের জমহুর (AAOIFI, ECFR প্রমুখ) মনে করেন সম্পদ বা বাণিজ্য হিসেবে রাখা ক্রিপ্টো মাল হিসেবে যাকাতযোগ্য। হাওলের বার্ষিকীতে বাজারমূল্যে ২.৫% হিসাব করুন। মাইনিং আয় প্রাপ্তির সময় যাকাতযোগ্য। সংখ্যালঘু মত সম্পদশ্রেণি স্থিতিশীল না হওয়া পর্যন্ত মতামত স্থগিত রাখেন।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40">
              <div class="flex items-center justify-between mb-1">
                <span class="text-sm font-semibold text-gray-700 dark:text-gray-200">🏦 ${L({ en: 'Retirement Accounts (401k / Provident Fund / Pension)', bn: 'অবসর ভান্ডার (প্রভিডেন্ট ফান্ড / পেনশন)' })}</span>
                <span class="text-xs font-medium text-teal-600 dark:text-teal-400">2.5%</span>
              </div>
              <p class="text-xs text-gray-500 dark:text-gray-400" dir="auto">${L({ en: 'For the portion you can access (withdrawable minus taxes and penalties): pay 2.5% annually. For locked/inaccessible portions: the majority view is to pay when it becomes accessible; a minority calculates and pays annually on the full amount. Employee contributions that have already been deducted are generally included.', bn: 'আপনি যে অংশ তুলতে পারেন (কর ও জরিমানা বাদে): বার্ষিক ২.৫% দিন। লক করা/অপ্রাপ্য অংশে: জমহুরের মত অ্যাক্সেসযোগ্য হলে দিন; সংখ্যালঘু মত সম্পূর্ণ পরিমাণে বার্ষিক হিসাব করেন। ইতিমধ্যে কাটা কর্মচারী চাঁদা সাধারণত অন্তর্ভুক্ত।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40">
              <div class="flex items-center justify-between mb-1">
                <span class="text-sm font-semibold text-gray-700 dark:text-gray-200">📈 ${L({ en: 'Stocks (Listed Shares)', bn: 'শেয়ার (তালিকাভুক্ত)' })}</span>
                <span class="text-xs font-medium text-teal-600 dark:text-teal-400">2.5%</span>
              </div>
              <p class="text-xs text-gray-500 dark:text-gray-400" dir="auto">${L({ en: 'Shares held for trading (short/medium-term buying and selling): pay 2.5% on market value at the hawl date. Shares held purely for dividends/long-term investment: pay 2.5% on dividends received, OR calculate your proportionate share of the company\'s zakatable liquid assets (the Qaradawi method preferred by many contemporary scholars).', bn: 'ট্রেডিংয়ের জন্য রাখা শেয়ার (স্বল্প/মধ্য মেয়াদী ক্রয়-বিক্রয়): হাওলের তারিখে বাজারমূল্যে ২.৫%। শুধু লভ্যাংশ/দীর্ঘমেয়াদী বিনিয়োগের জন্য: প্রাপ্ত লভ্যাংশে ২.৫%, অথবা কোম্পানির যাকাতযোগ্য তরল সম্পদে আপনার অংশীদারিত্ব হিসাব (কারাদাওয়ির পদ্ধতি, অনেক আলিম পছন্দ করেন)।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40">
              <div class="flex items-center justify-between mb-1">
                <span class="text-sm font-semibold text-gray-700 dark:text-gray-200">🏢 ${L({ en: 'Business Shares / Partnership', bn: 'ব্যবসায়িক শেয়ার / অংশীদারিত্ব' })}</span>
                <span class="text-xs font-medium text-teal-600 dark:text-teal-400">2.5%</span>
              </div>
              <p class="text-xs text-gray-500 dark:text-gray-400" dir="auto">${L({ en: 'Calculate the zakatable assets of the business (stock-in-trade at market value, cash, receivables due within the year) and pay 2.5% on your proportionate share. Fixed non-liquid assets (machinery, buildings, equipment) are exempt from zakat as they are not wealth held for trade or growth.', bn: 'ব্যবসার যাকাতযোগ্য সম্পদ হিসাব করুন (বাজারমূল্যে পণ্য, নগদ, বছরের মধ্যে পাওনা) এবং আপনার অনুপাত অনুযায়ী ২.৫% দিন। অ-তরল স্থায়ী সম্পদ (যন্ত্রপাতি, ভবন, সরঞ্জাম) যাকাতমুক্ত কারণ এগুলো বাণিজ্য বা বৃদ্ধির জন্য রাখা সম্পদ নয়।' })}</p>
            </div>
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">⚖️ ${L({ en: 'Zakat vs Sadaqah Jariyah vs Sadaqah — Comparison', bn: 'যাকাত, সাদাকাহ জারিয়াহ ও সাদাকাহ — তুলনা' })}</h3>
          <div class="overflow-x-auto">
            <table class="w-full text-xs border-collapse">
              <thead>
                <tr class="bg-teal-100 dark:bg-teal-900/40">
                  <th class="text-left p-2 font-semibold text-teal-800 dark:text-teal-200 border border-teal-200 dark:border-teal-800/60">${L({ en: 'Aspect', bn: 'দিক' })}</th>
                  <th class="text-left p-2 font-semibold text-teal-800 dark:text-teal-200 border border-teal-200 dark:border-teal-800/60">${L({ en: 'Zakat', bn: 'যাকাত' })}</th>
                  <th class="text-left p-2 font-semibold text-teal-800 dark:text-teal-200 border border-teal-200 dark:border-teal-800/60">${L({ en: 'Sadaqah Jariyah', bn: 'সাদাকাহ জারিয়াহ' })}</th>
                  <th class="text-left p-2 font-semibold text-teal-800 dark:text-teal-200 border border-teal-200 dark:border-teal-800/60">${L({ en: 'Sadaqah', bn: 'সাদাকাহ' })}</th>
                </tr>
              </thead>
              <tbody>
                <tr class="bg-white dark:bg-gray-800/60">
                  <td class="p-2 font-medium text-gray-700 dark:text-gray-300 border border-teal-100 dark:border-teal-900/40">${L({ en: 'Obligation', bn: 'বাধ্যবাধকতা' })}</td>
                  <td class="p-2 text-gray-600 dark:text-gray-400 border border-teal-100 dark:border-teal-900/40">${L({ en: 'Fard (obligatory) pillar of Islam', bn: 'ফরজ — ইসলামের স্তম্ভ' })}</td>
                  <td class="p-2 text-gray-600 dark:text-gray-400 border border-teal-100 dark:border-teal-900/40">${L({ en: 'Voluntary (nafl)', bn: 'নফল (স্বেচ্ছাধীন)' })}</td>
                  <td class="p-2 text-gray-600 dark:text-gray-400 border border-teal-100 dark:border-teal-900/40">${L({ en: 'Voluntary (nafl)', bn: 'নফল (স্বেচ্ছাধীন)' })}</td>
                </tr>
                <tr class="bg-teal-50/40 dark:bg-teal-900/10">
                  <td class="p-2 font-medium text-gray-700 dark:text-gray-300 border border-teal-100 dark:border-teal-900/40">${L({ en: 'Amount', bn: 'পরিমাণ' })}</td>
                  <td class="p-2 text-gray-600 dark:text-gray-400 border border-teal-100 dark:border-teal-900/40">${L({ en: '2.5% of qualifying wealth per lunar year', bn: 'যোগ্য সম্পদের ২.৫% প্রতি চান্দ্র বছর' })}</td>
                  <td class="p-2 text-gray-600 dark:text-gray-400 border border-teal-100 dark:border-teal-900/40">${L({ en: 'Any amount — typically a one-time lasting gift', bn: 'যেকোনো পরিমাণ — সাধারণত একটি স্থায়ী উপহার' })}</td>
                  <td class="p-2 text-gray-600 dark:text-gray-400 border border-teal-100 dark:border-teal-900/40">${L({ en: 'Any amount, at any time', bn: 'যেকোনো পরিমাণ, যেকোনো সময়' })}</td>
                </tr>
                <tr class="bg-white dark:bg-gray-800/60">
                  <td class="p-2 font-medium text-gray-700 dark:text-gray-300 border border-teal-100 dark:border-teal-900/40">${L({ en: 'Recipients', bn: 'প্রাপক' })}</td>
                  <td class="p-2 text-gray-600 dark:text-gray-400 border border-teal-100 dark:border-teal-900/40">${L({ en: 'Only the 8 categories in 9:60', bn: 'শুধু ৯:৬০-এর ৮ শ্রেণি' })}</td>
                  <td class="p-2 text-gray-600 dark:text-gray-400 border border-teal-100 dark:border-teal-900/40">${L({ en: 'Broad — mosques, schools, wells, etc.', bn: 'ব্যাপক — মসজিদ, স্কুল, কূপ ইত্যাদি' })}</td>
                  <td class="p-2 text-gray-600 dark:text-gray-400 border border-teal-100 dark:border-teal-900/40">${L({ en: 'Anyone in need — Muslim or non-Muslim', bn: 'যেকোনো প্রয়োজনগ্রস্ত — মুসলিম বা অমুসলিম' })}</td>
                </tr>
                <tr class="bg-teal-50/40 dark:bg-teal-900/10">
                  <td class="p-2 font-medium text-gray-700 dark:text-gray-300 border border-teal-100 dark:border-teal-900/40">${L({ en: 'Reward Duration', bn: 'সওয়াবের মেয়াদ' })}</td>
                  <td class="p-2 text-gray-600 dark:text-gray-400 border border-teal-100 dark:border-teal-900/40">${L({ en: 'Fulfils obligation; reward for obedience', bn: 'ফরজ পালন; আনুগত্যের সওয়াব' })}</td>
                  <td class="p-2 text-gray-600 dark:text-gray-400 border border-teal-100 dark:border-teal-900/40">${L({ en: 'Continues after death as long as benefit flows', bn: 'মৃত্যুর পরেও উপকার চলতে থাকলে সওয়াব জারি' })}</td>
                  <td class="p-2 text-gray-600 dark:text-gray-400 border border-teal-100 dark:border-teal-900/40">${L({ en: 'At the time of giving', bn: 'দানের সময়ে' })}</td>
                </tr>
                <tr class="bg-white dark:bg-gray-800/60">
                  <td class="p-2 font-medium text-gray-700 dark:text-gray-300 border border-teal-100 dark:border-teal-900/40">${L({ en: 'Examples', bn: 'উদাহরণ' })}</td>
                  <td class="p-2 text-gray-600 dark:text-gray-400 border border-teal-100 dark:border-teal-900/40">${L({ en: '2.5% of savings, gold, trade goods', bn: 'সঞ্চয়, সোনা, পণ্যের ২.৫%' })}</td>
                  <td class="p-2 text-gray-600 dark:text-gray-400 border border-teal-100 dark:border-teal-900/40">${L({ en: 'Building a mosque, digging a well, endowing a school (waqf)', bn: 'মসজিদ নির্মাণ, কূপ খনন, বিদ্যালয় ওয়াকফ' })}</td>
                  <td class="p-2 text-gray-600 dark:text-gray-400 border border-teal-100 dark:border-teal-900/40">${L({ en: 'Food, money, kind words, a smile, removing harm from a path', bn: 'খাবার, অর্থ, সদকলা, হাসি, পথ থেকে কষ্টদায়ক বস্তু সরানো' })}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-2" dir="auto">${L({ en: 'Source: Muslim (on sadaqah jariyah — hadith of three deeds that continue after death), Quran 9:60 (zakat), Quran 2:261-274 (sadaqah).', bn: 'সূত্র: মুসলিম (সাদাকাহ জারিয়াহ — মৃত্যুর পর তিনটি আমল চলতে থাকার হাদিস), কুরআন ৯:৬০ (যাকাত), কুরআন ২:২৬১-২৭৪ (সাদাকাহ)।' })}</p>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">⚖️ ${L({ en: 'Which Nisab — Gold or Silver?', bn: 'কোন নেসাব — সোনা নাকি রুপা?' })}</h3>
          <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3" dir="auto">${L({ en: 'The nisab is the minimum amount of wealth a Muslim must hold before zakat becomes due: the value of 85 g of gold OR 595 g of silver. Because gold and silver prices differ, the two thresholds are not equal in cash terms — and which one you apply matters.', bn: 'নেসাব হলো সেই সর্বনিম্ন সম্পদ যা থাকলে যাকাত ফরজ হয়: ৮৫ গ্রাম সোনা অথবা ৫৯৫ গ্রাম রুপার মূল্য। সোনা ও রুপার দাম ভিন্ন হওয়ায় নগদমূল্যে দুটি সীমা সমান নয় — এবং আপনি কোনটি প্রয়োগ করবেন তা গুরুত্বপূর্ণ।' })}</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="p-3 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-900/40">
              <div class="text-sm font-semibold text-teal-800 dark:text-teal-200">${L({ en: 'Mixed wealth → use silver', bn: 'মিশ্র সম্পদ → রুপা ব্যবহার' })}</div>
              <p class="text-xs text-teal-700 dark:text-teal-300 mt-1" dir="auto">${L({ en: 'If you hold a mix of cash, savings, gold, silver and trade goods, most contemporary scholars recommend the silver nisab (595 g) because it is lower — so more people qualify and more zakat reaches the poor. This is the more cautious choice.', bn: 'যদি আপনার কাছে নগদ, সঞ্চয়, সোনা, রুপা ও পণ্যের মিশ্রণ থাকে, বেশিরভাগ সমসাময়িক আলিম রুপার নেসাব (৫৯৫ গ্রাম) সুপারিশ করেন কারণ তা কম — এতে বেশি মানুষ যোগ্য হন ও গরিব বেশি পায়। এটি অধিক সতর্ক পছন্দ।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-900/40">
              <div class="text-sm font-semibold text-teal-800 dark:text-teal-200">${L({ en: 'Gold only → use gold', bn: 'শুধু সোনা → সোনা ব্যবহার' })}</div>
              <p class="text-xs text-teal-700 dark:text-teal-300 mt-1" dir="auto">${L({ en: 'If your zakatable wealth is gold alone, the gold nisab (85 g) applies. Both positions are held by reputable scholars; the difference is one of caution and benefit to the poor, not of validity.', bn: 'যদি আপনার যাকাতযোগ্য সম্পদ কেবল সোনা হয়, সোনার নেসাব (৮৫ গ্রাম) প্রযোজ্য। উভয় অবস্থানই নির্ভরযোগ্য আলিমদের কাছে গৃহীত; পার্থক্যটি সতর্কতা ও গরিবের উপকারের, বৈধতার নয়।' })}</p>
            </div>
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">🧾 ${L({ en: 'Step-by-Step: How to Calculate Your Zakat', bn: 'ধাপে ধাপে: আপনার যাকাত কীভাবে হিসাব করবেন' })}</h3>
          <ol class="space-y-2 mb-3">
            <li class="flex gap-2 text-sm text-gray-600 dark:text-gray-300" dir="auto"><span class="text-xs font-bold text-teal-700 dark:text-teal-300 bg-teal-200/60 dark:bg-teal-800/40 px-2 py-0.5 rounded shrink-0">1</span> ${L({ en: 'Fix your zakat date — the lunar date each year when nisab has been held for a full year (hawl).', bn: 'আপনার যাকাত-তারিখ নির্ধারণ করুন — প্রতি বছর যে চান্দ্র তারিখে এক পূর্ণ বছর (হাওল) নেসাব ধরে ছিল।' })}</li>
            <li class="flex gap-2 text-sm text-gray-600 dark:text-gray-300" dir="auto"><span class="text-xs font-bold text-teal-700 dark:text-teal-300 bg-teal-200/60 dark:bg-teal-800/40 px-2 py-0.5 rounded shrink-0">2</span> ${L({ en: 'Add up all zakatable assets: cash and bank savings, gold and silver (market value), trade goods (market value), money receivable (good debts) and zakatable investments.', bn: 'সব যাকাতযোগ্য সম্পদ যোগ করুন: নগদ ও ব্যাংক সঞ্চয়, সোনা ও রুপা (বাজারমূল্য), পণ্য (বাজারমূল্য), পাওনা অর্থ (ভালো ঋণ) ও যাকাতযোগ্য বিনিয়োগ।' })}</li>
            <li class="flex gap-2 text-sm text-gray-600 dark:text-gray-300" dir="auto"><span class="text-xs font-bold text-teal-700 dark:text-teal-300 bg-teal-200/60 dark:bg-teal-800/40 px-2 py-0.5 rounded shrink-0">3</span> ${L({ en: 'Deduct immediate debts and liabilities that are due (for a long-term loan, deduct only the current instalment, not the whole balance).', bn: 'তাৎক্ষণিক পরিশোধযোগ্য ঋণ ও দায় বাদ দিন (দীর্ঘমেয়াদী ঋণের ক্ষেত্রে কেবল চলতি কিস্তি বাদ দিন, পুরো ব্যালেন্স নয়)।' })}</li>
            <li class="flex gap-2 text-sm text-gray-600 dark:text-gray-300" dir="auto"><span class="text-xs font-bold text-teal-700 dark:text-teal-300 bg-teal-200/60 dark:bg-teal-800/40 px-2 py-0.5 rounded shrink-0">4</span> ${L({ en: 'Check the net total against the nisab. If it equals or exceeds nisab, zakat is due.', bn: 'নিট মোট নেসাবের সাথে মিলিয়ে দেখুন। নেসাবের সমান বা বেশি হলে যাকাত ফরজ।' })}</li>
            <li class="flex gap-2 text-sm text-gray-600 dark:text-gray-300" dir="auto"><span class="text-xs font-bold text-teal-700 dark:text-teal-300 bg-teal-200/60 dark:bg-teal-800/40 px-2 py-0.5 rounded shrink-0">5</span> ${L({ en: 'Multiply the net by 2.5% (divide by 40). That is your zakat.', bn: 'নিট পরিমাণকে ২.৫% দিয়ে গুণ করুন (৪০ দিয়ে ভাগ করুন)। এটিই আপনার যাকাত।' })}</li>
          </ol>
          <div class="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/40">
            <div class="text-sm font-semibold text-amber-800 dark:text-amber-200">${L({ en: 'Worked example', bn: 'উদাহরণসহ হিসাব' })}</div>
            <p class="text-xs text-amber-700 dark:text-amber-300 mt-1" dir="auto">${L({ en: 'Cash 10,000 + gold 3,000 + trade goods 5,000 = 18,000. Subtract a bill due of 2,000 → net 16,000. This is above nisab, so zakat = 16,000 × 2.5% = 400.', bn: 'নগদ ১০,০০০ + সোনা ৩,০০০ + পণ্য ৫,০০০ = ১৮,০০০। পরিশোধযোগ্য বিল ২,০০০ বাদ → নিট ১৬,০০০। এটি নেসাবের উপরে, তাই যাকাত = ১৬,০০০ × ২.৫% = ৪০০।' })}</p>
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">📅 ${L({ en: 'The Hawl — How the Lunar Year Works', bn: 'হাওল — চান্দ্র বছর কীভাবে কাজ করে' })}</h3>
          <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3" dir="auto">${L({ en: 'Zakat on wealth (cash, gold, silver, trade goods) is only due after that wealth has been owned for one complete lunar year — about 354 days — while remaining at or above the nisab. This waiting period is called the hawl. Crops and fruit have no hawl; their zakat (ushr) is due at harvest.', bn: 'সম্পদের যাকাত (নগদ, সোনা, রুপা, পণ্য) তখনই ফরজ হয় যখন সেই সম্পদ এক পূর্ণ চান্দ্র বছর — প্রায় ৩৫৪ দিন — মালিকানায় থাকে এবং নেসাবের সমান বা উপরে থাকে। এই অপেক্ষার সময়কে হাওল বলে। ফসল ও ফলের কোনো হাওল নেই; এগুলোর যাকাত (উশর) ফসল তোলার সময় ফরজ।' })}</p>
          <div class="space-y-2">
            <div class="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40">
              <div class="text-sm font-semibold text-gray-700 dark:text-gray-200">${L({ en: 'If wealth dips below nisab', bn: 'সম্পদ নেসাবের নিচে নামলে' })}</div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1" dir="auto">${L({ en: 'The Shafi\'i and majority view: the hawl restarts, because nisab must be maintained throughout the year. The Hanafi school looks only at the start and end of the year — dips in between do not interrupt the count if nisab is present at both ends.', bn: 'শাফিঈ ও জমহুরের মত: হাওল নতুন করে শুরু হয়, কারণ সারা বছর নেসাব বজায় রাখতে হয়। হানাফি মাযহাব শুধু বছরের শুরু ও শেষ দেখে — উভয় প্রান্তে নেসাব থাকলে মাঝের হ্রাস গণনা বাধাগ্রস্ত করে না।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40">
              <div class="text-sm font-semibold text-gray-700 dark:text-gray-200">${L({ en: 'New income during the year', bn: 'বছরের মাঝে নতুন আয়' })}</div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1" dir="auto">${L({ en: 'To avoid tracking each amount separately, most people attach new savings of the same type to their existing wealth and pay for everything on one fixed zakat date. This is a practical, widely accepted approach.', bn: 'প্রতিটি পরিমাণ আলাদা হিসাব এড়াতে বেশিরভাগ মানুষ একই ধরনের নতুন সঞ্চয় বিদ্যমান সম্পদের সাথে যুক্ত করে এক নির্দিষ্ট যাকাত-তারিখে সবকিছুর যাকাত দেন। এটি একটি বাস্তবসম্মত ও ব্যাপকভাবে গৃহীত পদ্ধতি।' })}</p>
            </div>
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">💳 ${L({ en: 'Zakat on Debts — Owed To You and By You', bn: 'ঋণে যাকাত — আপনার পাওনা ও আপনার দেনা' })}</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/40">
              <div class="text-sm font-semibold text-emerald-800 dark:text-emerald-200">${L({ en: 'Money owed TO you (receivables)', bn: 'আপনার পাওনা অর্থ' })}</div>
              <p class="text-xs text-emerald-700 dark:text-emerald-300 mt-1" dir="auto">${L({ en: 'A "strong" debt — a solvent borrower who acknowledges it and is likely to repay — is added to your zakatable wealth every year (majority view). A "weak" or doubtful debt (borrower insolvent or denying) carries no zakat until you actually recover it; many scholars then require zakat for one year only.', bn: '"শক্তিশালী" ঋণ — স্বচ্ছল ঋণগ্রহীতা যে স্বীকার করে ও শোধ করবে বলে আশা — প্রতি বছর আপনার যাকাতযোগ্য সম্পদে যুক্ত হয় (জমহুরের মত)। "দুর্বল" বা সন্দেহজনক ঋণ (দেউলিয়া বা অস্বীকারকারী) প্রকৃতপক্ষে আদায় না হওয়া পর্যন্ত যাকাত নেই; তারপর অনেক আলিম কেবল এক বছরের যাকাত ওয়াজিব করেন।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-900/40">
              <div class="text-sm font-semibold text-rose-800 dark:text-rose-200">${L({ en: 'Money owed BY you (liabilities)', bn: 'আপনার দেনা অর্থ' })}</div>
              <p class="text-xs text-rose-700 dark:text-rose-300 mt-1" dir="auto">${L({ en: 'Debts due now may be deducted from your zakatable assets before calculating (majority). For a long-term debt such as a mortgage, deduct only the instalment currently due — not the entire loan. Madhabs differ on exactly how much debt may be deducted, so follow a trusted local scholar.', bn: 'এখন পরিশোধযোগ্য ঋণ হিসাবের আগে আপনার যাকাতযোগ্য সম্পদ থেকে বাদ দেওয়া যায় (জমহুর)। বন্ধকের মতো দীর্ঘমেয়াদী ঋণের ক্ষেত্রে কেবল বর্তমানে পরিশোধযোগ্য কিস্তি বাদ দিন — পুরো ঋণ নয়। কতটা ঋণ বাদ দেওয়া যায় সে বিষয়ে মাযহাবগুলোর মতভেদ আছে, তাই নির্ভরযোগ্য স্থানীয় আলিমের অনুসরণ করুন।' })}</p>
            </div>
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">🐫 ${L({ en: 'Nisab Details: Livestock & Crops (Ushr)', bn: 'নেসাব বিস্তারিত: গবাদি পশু ও ফসল (উশর)' })}</h3>
          <p class="text-xs text-gray-500 dark:text-gray-400 mb-3" dir="auto">${L({ en: 'Livestock and agricultural produce have their own thresholds and rates, distinct from the 2.5% on monetary wealth.', bn: 'গবাদি পশু ও কৃষিজ ফসলের নিজস্ব সীমা ও হার আছে, যা আর্থিক সম্পদের ২.৫% থেকে ভিন্ন।' })}</p>
          <div class="space-y-2">
            <div class="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40">
              <div class="text-sm font-semibold text-gray-700 dark:text-gray-200">🐑 ${L({ en: 'Livestock (grazing / sa\'ima)', bn: 'গবাদি পশু (চারণভূমি-প্রতিপালিত / সা\'ইমা)' })}</div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1" dir="auto">${L({ en: 'Zakat applies only to freely-pastured animals reaching their nisab: camels from 5 (one sheep per five, up to 24), cattle from 30 (a one-year-old calf per 30, a two-year-old per 40), and sheep/goats from 40 (one for 40-120, two for 121-200, three for 201-300, then one per hundred). Stall-fed or working animals are treated differently.', bn: 'যাকাত কেবল অবাধে চরানো পশুতে প্রযোজ্য যা নেসাবে পৌঁছায়: উট ৫ থেকে (প্রতি পাঁচে একটি ছাগল, ২৪ পর্যন্ত), গরু ৩০ থেকে (প্রতি ৩০-এ এক বছরের বাছুর, প্রতি ৪০-এ দুই বছরের), এবং ভেড়া/ছাগল ৪০ থেকে (৪০-১২০-এ একটি, ১২১-২০০-এ দুটি, ২০১-৩০০-এ তিনটি, তারপর প্রতি শতে একটি)। গোয়ালে পালিত বা কর্মে ব্যবহৃত পশুর বিধান ভিন্ন।' })}</p>
            </div>
            <div class="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40">
              <div class="text-sm font-semibold text-gray-700 dark:text-gray-200">🌾 ${L({ en: 'Crops & fruit (Ushr)', bn: 'ফসল ও ফল (উশর)' })}</div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1" dir="auto">${L({ en: 'Zakat on produce is due at each harvest (no hawl). The majority set a nisab of 5 wasq (~653 kg) of the storable crop. The rate is 10% if the land is watered naturally (rain, rivers, springs) and 5% if watered by artificial means (pumps, purchased water). Abu Hanifa held there is no nisab and it applies to all produce; the majority require the 5-wasq threshold.', bn: 'ফসলের যাকাত প্রতিটি ফসল তোলার সময় ফরজ (কোনো হাওল নেই)। জমহুর সংরক্ষণযোগ্য ফসলের নেসাব ৫ ওয়াসাক (~৬৫৩ কেজি) নির্ধারণ করেন। জমি প্রাকৃতিকভাবে সিক্ত হলে (বৃষ্টি, নদী, ঝর্ণা) হার ১০% এবং কৃত্রিম উপায়ে সিক্ত হলে (পাম্প, ক্রয়কৃত পানি) ৫%। আবু হানিফা মনে করতেন কোনো নেসাব নেই ও এটি সব ফসলে প্রযোজ্য; জমহুর ৫-ওয়াসাক সীমা আবশ্যক করেন।' })}</p>
            </div>
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">🧠 ${L({ en: 'Self-check — Test Your Understanding', bn: 'নিজেই যাচাই — আপনার বোঝাপড়া পরীক্ষা করুন' })}</h3>
          <p class="text-xs text-gray-500 dark:text-gray-400 mb-3" dir="auto">${L({ en: 'Tap each question to reveal the answer.', bn: 'প্রতিটি প্রশ্নে ট্যাপ করে উত্তর দেখুন।' })}</p>
          <div class="space-y-2">
            ${[
              { q: { en: 'What percentage is zakat on cash and savings?', bn: 'নগদ ও সঞ্চয়ের উপর যাকাতের হার কত?' }, a: { en: '2.5% (one-fortieth) of the total when it reaches the nisab and one lunar year (hawl) has passed.', bn: '২.৫% (মোটের এক-চল্লিশাংশ), যখন সম্পদ নেসাব পৌঁছায় ও এক চান্দ্র বছর (হাওল) অতিবাহিত হয়।' } },
              { q: { en: 'What is nisab?', bn: 'নেসাব কী?' }, a: { en: 'The minimum wealth threshold below which zakat is not obligatory: 85 g of gold or 595 g of silver, or their cash equivalent.', bn: 'সর্বনিম্ন সীমা যার নিচে যাকাত ফরজ নয়: ৮৫ গ্রাম সোনা বা ৫৯৫ গ্রাম রুপা, অথবা এর সমমূল্যের নগদ।' } },
              { q: { en: 'Who cannot receive zakat?', bn: 'কাদের যাকাত দেওয়া যায় না?' }, a: { en: 'Parents, grandparents, children, grandchildren and spouse (you are already responsible for their support); the wealthy; non-Muslims (per majority); descendants of the Prophet ﷺ (Banu Hashim) per many scholars.', bn: 'পিতামাতা, দাদা-দাদী, সন্তান, নাতি-নাতনি ও স্বামী/স্ত্রী (তাদের ভরণপোষণে আপনি দায়ী); ধনী; অমুসলিম (জমহুর); বনু হাশিম (অনেক আলিমের মতে)।' } },
              { q: { en: 'How many categories of recipients are mentioned in Quran 9:60?', bn: 'কুরআন ৯:৬০-এ কয় শ্রেণির প্রাপকের উল্লেখ আছে?' }, a: { en: 'Eight: the poor, needy, zakat administrators, those whose hearts are reconciled, freeing captives, debtors, in Allah\'s cause, and stranded travelers.', bn: 'আট শ্রেণি: ফকীর, মিসকীন, যাকাত-আদায়কারী, হৃদয় আকৃষ্টকরণ, দাসমুক্তি, ঋণগ্রস্ত, আল্লাহর পথে, মুসাফির।' } },
              { q: { en: 'Can I pay zakat to build a mosque or fund general Islamic work?', bn: 'মসজিদ নির্মাণ বা সাধারণ ইসলামি কাজে যাকাত দেওয়া যাবে?' }, a: { en: 'This is disputed. The stronger view is no — zakat must go to the 8 specified categories (individuals). Fund such projects from general sadaqah instead.', bn: 'এটি বিতর্কিত। প্রধান মত: না — যাকাত ৯:৬০-এর আট শ্রেণিতে (ব্যক্তিতে) দিতে হবে। এমন প্রকল্প সাধারণ সদকা থেকে অর্থায়ন করুন।' } },
              { q: { en: 'When exactly is zakat due?', bn: 'যাকাত ঠিক কখন ফরজ হয়?' }, a: { en: 'When your zakatable wealth reaches nisab AND one complete lunar year (~354 days) has passed while it remained above nisab.', bn: 'যখন আপনার যাকাতযোগ্য সম্পদ নেসাবে পৌঁছায় এবং নেসাবের উপরে এক পূর্ণ চান্দ্র বছর (~৩৫৪ দিন) অতিবাহিত হয়।' } },
              { q: { en: 'Is zakat due on gold jewelry that is worn?', bn: 'পরিধেয় স্বর্ণের গহনার উপর কি যাকাত ফরজ?' }, a: { en: 'The majority (Hanafi and others) say YES — zakat is due if it reaches nisab. Some scholars exempt jewelry in normal use. Best to pay to be safe.', bn: 'জমহুর (হানাফি প্রমুখ) বলেন: হ্যাঁ, নেসাব পৌঁছালে ফরজ। কিছু আলিম স্বাভাবিক ব্যবহারের গহনা মাফ করেন। সতর্কতার জন্য দেওয়া উত্তম।' } },
              { q: { en: 'What is the difference between zakat and sadaqah?', bn: 'যাকাত ও সদকার পার্থক্য কী?' }, a: { en: 'Zakat is an obligatory annual charity (2.5% of wealth) restricted to 8 categories. Sadaqah is voluntary, unlimited, and can be given to anyone in need.', bn: 'যাকাত ফরজ বার্ষিক দান (সম্পদের ২.৫%), আট শ্রেণিতে সীমাবদ্ধ। সদকা স্বেচ্ছাধীন, অসীম, যে কোনো প্রয়োজনগ্রস্তকে দেওয়া যায়।' } },
              { q: { en: 'Is zakat due on a house I live in?', bn: 'যে বাড়িতে আমি থাকি তার উপর যাকাত?' }, a: { en: 'No — personal residence, car, clothing, and everyday tools are exempt. Zakat is on productive/growing wealth (cash, gold, silver, trade goods, livestock, produce).', bn: 'না — বসবাসের বাড়ি, গাড়ি, পোশাক, দৈনন্দিন সরঞ্জাম মাফ। যাকাত উৎপাদনশীল/বৃদ্ধিশীল সম্পদে (নগদ, সোনা, রুপা, পণ্য, পশু, ফসল)।' } },
              { q: { en: 'Does forgiving someone\'s debt count as paying zakat to them?', bn: 'কারও ঋণ মাফ করা কি তাকে যাকাত দেওয়া হিসেবে গণ্য?' }, a: { en: 'The majority say no. Zakat must be a transfer of wealth. Forgiving a debt is charity (sadaqah) but does not fulfill the zakat obligation.', bn: 'জমহুরের মতে: না। যাকাত সম্পদ হস্তান্তর হতে হবে। ঋণ মাফ সদকা কিন্তু যাকাতের বিকল্প নয়।' } },
              { q: { en: 'Is zakat due on cryptocurrency?', bn: 'ক্রিপ্টোকারেন্সির উপর কি যাকাত ফরজ?' }, a: { en: 'Yes, according to the majority of contemporary scholars (AAOIFI, ECFR). Cryptocurrency held as wealth or for trade is zakatable at market value on the hawl anniversary at 2.5%. A minority withholds ruling pending further analysis.', bn: 'হ্যাঁ, সমসাময়িক আলিমদের জমহুর মতে (AAOIFI, ECFR)। বাণিজ্য বা সম্পদ হিসেবে রাখা ক্রিপ্টো হাওলের বার্ষিকীতে বাজারমূল্যে ২.৫% হারে যাকাতযোগ্য।' } },
              { q: { en: 'What is sadaqah jariyah and how is it different from zakat?', bn: 'সাদাকাহ জারিয়াহ কী এবং যাকাতের সাথে পার্থক্য কী?' }, a: { en: 'Sadaqah jariyah is a voluntary ongoing charity whose benefit continues after death — like a mosque, a well, or a school. Zakat is obligatory (2.5% of qualifying wealth annually). Sadaqah jariyah earns continuous reward post-death; zakat discharges a religious duty.', bn: 'সাদাকাহ জারিয়াহ হলো স্বেচ্ছাধীন চলমান দান যার সুবিধা মৃত্যুর পরেও অব্যাহত — যেমন মসজিদ, কূপ, স্কুল। যাকাত ফরজ (বার্ষিক সম্পদের ২.৫%)। সাদাকাহ জারিয়াহ মৃত্যু-পরবর্তী ক্রমাগত সওয়াব দেয়; যাকাত একটি ধর্মীয় দায়িত্ব পূরণ করে।' } },
              { q: { en: 'How is zakat calculated on stocks held for investment (not trade)?', bn: 'বিনিয়োগের (বাণিজ্য নয়) শেয়ারে যাকাত কীভাবে হিসাব করবেন?' }, a: { en: 'Two valid methods: (1) Pay 2.5% on dividends received. (2) Calculate your proportionate share of the company\'s zakatable liquid assets (cash, receivables, stock-in-trade) and pay 2.5% on that amount — the method recommended by Qaradawi and many contemporary scholars.', bn: 'দুটি বৈধ পদ্ধতি: (১) প্রাপ্ত লভ্যাংশে ২.৫%। (২) কোম্পানির যাকাতযোগ্য তরল সম্পদে (নগদ, পাওনা, পণ্য) আপনার অংশ হিসাব করে সেই পরিমাণে ২.৫% — কারাদাওয়ি ও অনেক সমসাময়িক আলিম এই পদ্ধতি সুপারিশ করেন।' } },
              { q: { en: 'Is zakat obligatory on a locked retirement account?', bn: 'লক করা অবসর ভান্ডারে যাকাত কি ফরজ?' }, a: { en: 'Scholarly difference exists. Majority view: pay zakat only on the accessible portion (withdrawable amount after tax/penalties). A minority says calculate annually on the full balance. At minimum, pay on the accessible portion and add any back-zakat when it becomes accessible.', bn: 'বিদ্বানী মতভেদ রয়েছে। জমহুরের মত: শুধু অ্যাক্সেসযোগ্য অংশে (কর/জরিমানার পর তোলার যোগ্য) যাকাত দিন। সংখ্যালঘু মত পুরো ব্যালেন্সে বার্ষিক হিসাব করেন। কমপক্ষে অ্যাক্সেসযোগ্য অংশ দিন এবং অ্যাক্সেসযোগ্য হলে বাকি আদায় করুন।' } },
              { q: { en: 'Are business fixed assets (machinery, buildings) subject to zakat?', bn: 'ব্যবসায়িক স্থায়ী সম্পদ (যন্ত্রপাতি, ভবন) কি যাকাতযোগ্য?' }, a: { en: 'No. Fixed assets used in the business (machinery, equipment, vehicles, buildings) are exempt from zakat. Only the zakatable working capital — stock-in-trade at market value, cash, and receivables — is subject to the 2.5% zakat.', bn: 'না। ব্যবসায় ব্যবহৃত স্থায়ী সম্পদ (যন্ত্রপাতি, সরঞ্জাম, যানবাহন, ভবন) যাকাতমুক্ত। শুধু যাকাতযোগ্য কার্যকরী মূলধন — বাজারমূল্যে পণ্য, নগদ ও পাওনা — ২.৫% যাকাতের আওতাধীন।' } },
              { q: { en: 'Can I give zakat to build a mosque or fund an Islamic school?', bn: 'মসজিদ নির্মাণ বা ইসলামি স্কুলে তহবিল দিতে যাকাত দেওয়া যাবে কি?' }, a: { en: 'This is disputed. The stronger classical view is no — zakat must go to the 8 specified individual categories in 9:60, not to institutions or buildings. Fund mosques, schools, and Islamic work from sadaqah or sadaqah jariyah instead.', bn: 'এটি বিতর্কিত। শক্তিশালী ক্লাসিক্যাল মত: না — যাকাত অবশ্যই ৯:৬০-এর ৮টি নির্দিষ্ট ব্যক্তি শ্রেণিতে যেতে হবে, প্রতিষ্ঠান বা ভবনে নয়। মসজিদ, স্কুল ও ইসলামি কাজ সাদাকাহ বা সাদাকাহ জারিয়াহ থেকে অর্থায়ন করুন।' } },
              { q: { en: 'What is the difference between zakat and sadaqah in terms of recipients?', bn: 'প্রাপকের দিক থেকে যাকাত ও সাদাকাহর পার্থক্য কী?' }, a: { en: 'Zakat is restricted to the 8 categories in Quran 9:60 and cannot be given to non-Muslims (per majority), wealthy people, or immediate dependants. Sadaqah is unrestricted — it can be given to anyone in need, Muslim or non-Muslim, near or far, for any worthy cause.', bn: 'যাকাত কুরআন ৯:৬০-এর ৮ শ্রেণিতে সীমাবদ্ধ এবং অমুসলিম (জমহুরের মতে), ধনী বা নিকট নির্ভরশীলদের দেওয়া যায় না। সাদাকাহ সীমাহীন — যেকোনো প্রয়োজনগ্রস্তকে দেওয়া যায়, মুসলিম বা অমুসলিম, কাছে বা দূরে।' } },
              { q: { en: 'Should I use the gold or the silver nisab?', bn: 'আমি কি সোনার নাকি রুপার নেসাব ব্যবহার করব?' }, a: { en: 'If your wealth is a mix of cash, gold, silver and trade goods, most contemporary scholars recommend using the silver nisab (595 g) because it is lower — more people then qualify to pay and more reaches the poor. If you own only gold, the gold nisab (85 g) is used. Both approaches are held by scholars; using silver is the more cautious.', bn: 'যদি আপনার সম্পদ নগদ, সোনা, রুপা ও পণ্যের মিশ্রণ হয়, বেশিরভাগ সমসাময়িক আলিম রুপার নেসাব (৫৯৫ গ্রাম) ব্যবহারের পরামর্শ দেন কারণ তা কম — এতে বেশি মানুষ যাকাতযোগ্য হন ও গরিব বেশি পায়। শুধু সোনা থাকলে সোনার নেসাব (৮৫ গ্রাম)। উভয় মতই আলিমদের মধ্যে আছে; রুপা ব্যবহার অধিক সতর্কতাপূর্ণ।' } },
              { q: { en: 'Who pays Zakat al-Fitr, and on whose behalf?', bn: 'যাকাতুল ফিতর কে দেয়, এবং কার পক্ষ থেকে?' }, a: { en: 'The head of the household pays one Sa\' (~2.5-3 kg of staple food, or its value) for himself and for every dependent he is responsible for — wife, minor children, and dependants. It is due on anyone who has food surplus to their needs on the day of Eid. Paying on behalf of an unborn child is recommended but not obligatory.', bn: 'পরিবারের কর্তা নিজের এবং তার দায়িত্বে থাকা প্রত্যেকের পক্ষ থেকে এক সা\' (প্রায় ২.৫-৩ কেজি প্রধান খাদ্য বা এর মূল্য) দেন — স্ত্রী, নাবালক সন্তান ও নির্ভরশীলরা। ঈদের দিন প্রয়োজনের অতিরিক্ত খাদ্য যার কাছে আছে তার উপরই এটি ফরজ। গর্ভস্থ সন্তানের পক্ষ থেকে দেওয়া মুস্তাহাব, ফরজ নয়।' } },
              { q: { en: 'Can Zakat al-Fitr be given to all eight categories?', bn: 'যাকাতুল ফিতর কি আট শ্রেণির সবাইকে দেওয়া যায়?' }, a: { en: 'The primary purpose of Zakat al-Fitr is "food for the poor" (hadith of Ibn Abbas — Abu Dawud, hasan), so many scholars restrict it chiefly to the poor and needy (categories 1 and 2). Others permit all eight categories by analogy with wealth-zakat. The safest practice is to give it to the poor and needy.', bn: 'যাকাতুল ফিতরের মূল উদ্দেশ্য "গরিবের খাদ্য" (ইবনে আব্বাসের হাদিস — আবু দাউদ, হাসান), তাই অনেক আলিম এটিকে মূলত ফকীর ও মিসকীনের (১ম ও ২য় শ্রেণি) জন্য সীমিত করেন। অন্যরা সম্পদ-যাকাতের সাদৃশ্যে আট শ্রেণিকেই অনুমোদন করেন। সর্বাধিক নিরাপদ হলো ফকীর ও মিসকীনকে দেওয়া।' } },
              { q: { en: 'Does money that people owe me count toward my zakat?', bn: 'মানুষ আমার কাছে যে টাকা পায়/আমি যা পাব তা কি যাকাতে গণ্য?' }, a: { en: 'A "strong" debt owed to you (a solvent borrower who acknowledges it and is expected to repay) is added to your zakatable wealth every year (majority view). A "weak" or doubtful debt (borrower insolvent or denying) carries no zakat until you actually receive it — then many scholars require zakat for one year only.', bn: 'আপনার পাওনা "শক্তিশালী" ঋণ (স্বচ্ছল ঋণগ্রহীতা যে স্বীকার করে ও শোধ করবে বলে আশা) প্রতি বছর আপনার যাকাতযোগ্য সম্পদে যুক্ত হয় (জমহুরের মত)। "দুর্বল" বা সন্দেহজনক ঋণ (ঋণগ্রহীতা দেউলিয়া বা অস্বীকারকারী) প্রকৃতপক্ষে হাতে না পাওয়া পর্যন্ত যাকাত নেই — তারপর অনেক আলিম কেবল এক বছরের যাকাত ওয়াজিব করেন।' } },
              { q: { en: 'What interrupts the hawl (lunar-year) count?', bn: 'হাওল (চান্দ্র-বছর) গণনা কী বাধাগ্রস্ত করে?' }, a: { en: 'If your wealth drops below the nisab during the year, the majority (Shafi\'i and others) reset the count, requiring nisab throughout the year. The Hanafi school looks only at the start and end of the year — dips in between do not matter as long as nisab is present at both ends. New income of the same type is usually attached to your existing wealth and paid on one hawl date.', bn: 'বছরের মাঝে সম্পদ নেসাবের নিচে নামলে জমহুর (শাফিঈ প্রমুখ) গণনা রিসেট করেন, সারা বছর নেসাব থাকা আবশ্যক। হানাফি মাযহাব শুধু বছরের শুরু ও শেষ দেখে — উভয় প্রান্তে নেসাব থাকলে মাঝের হ্রাস গণ্য নয়। একই ধরনের নতুন আয় সাধারণত বিদ্যমান সম্পদের সাথে যুক্ত হয়ে এক হাওল-তারিখে দেওয়া হয়।' } },
            ].map(item => `
              <details class="rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-900/40 overflow-hidden">
                <summary class="flex items-center gap-2 p-3 cursor-pointer list-none hover:bg-teal-100/50 dark:hover:bg-teal-900/30">
                  <span class="text-teal-600 dark:text-teal-400 text-sm">❓</span>
                  <span class="flex-1 text-sm font-medium text-gray-800 dark:text-gray-100" dir="auto">${L(item.q)}</span>
                  <span class="text-teal-500 text-xs">▼</span>
                </summary>
                <div class="px-4 pb-3 pt-1 text-xs text-gray-700 dark:text-gray-200 leading-relaxed border-t border-teal-100 dark:border-teal-900/40" dir="auto">✅ ${L(item.a)}</div>
              </details>`).join('')}
          </div>
        </div>

      </div>`;

    const calcCash = this.root.querySelector('#zakat-cash');
    const calcGold = this.root.querySelector('#zakat-gold');
    const calcSilver = this.root.querySelector('#zakat-silver');
    const calcBtn = this.root.querySelector('#zakat-calc-btn');
    const calcResult = this.root.querySelector('#zakat-result');
    const calcAmount = this.root.querySelector('#zakat-amount');

    if (calcBtn && calcCash && calcGold && calcSilver && calcResult && calcAmount) {
      calcBtn.addEventListener('click', () => {
        const cash = parseFloat(calcCash.value) || 0;
        const gold = parseFloat(calcGold.value) || 0;
        const silver = parseFloat(calcSilver.value) || 0;
        const total = cash + gold + silver;
        const zakat = total * 0.025;
        calcAmount.textContent = zakat.toFixed(2);
        calcResult.classList.remove('hidden');
      });
    }
  }

  handleClick(e) {
    const ayah = e.target.closest('[data-zakat-ayah]');
    if (ayah) { this.openAyah(ayah.getAttribute('data-zakat-ayah')); return; }
  }

  openAyah(ref) {
    try {
      if (typeof ayahModal !== 'undefined' && ayahModal && typeof ayahModal.open === 'function') {
        ayahModal.open(ref);
      }
    } catch (_) { }
  }
}

let zakatModule;
document.addEventListener('DOMContentLoaded', () => { zakatModule = new ZakatModule(); });
