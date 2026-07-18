/**
 * Islam → Wajib (Essential Acts) module.
 *
 * Wājib in the Ḥanafī school is slightly less binding than fard (proven by
 * probable but not absolutely definitive evidence) but still required.
 * Leaving it without excuse is sinful. In the Shāfiʿī / Mālikī / Ḥanbalī
 * schools, wājib and farḍ are used interchangeably — this module notes the
 * distinction where it matters.
 */

const WAJIB_I18N = {
  islam_wajib_title:    { en: 'Wajib (Essential)', bn: 'ওয়াজিব (অপরিহার্য)', zh: '当行 (Wajib)', ja: '必要行為（ワージブ）', ar: 'الواجب', ur: 'واجب', hi: 'वाजिब (आवश्यक)', fa: 'واجب (لازم)', id: 'Wajib', ms: 'Wajib', tr: 'Vacip (Gerekli)', fr: 'Wajib (Nécessaire)', es: 'Wayib (Necesario)', de: 'Wadschib (Notwendig)', ru: 'Ваджиб (обязательное)' },
  islam_wajib_subtitle: { en: 'What is established as binding by probable evidence. In the Ḥanafī school it is one degree below fard; leaving it without excuse is sinful. In the other three schools, wājib and fard are the same category.', bn: 'যা প্রবল দলিল দ্বারা অপরিহার্য প্রমাণিত। হানাফি মাযহাবে এটি ফরজের এক ধাপ নিচে; ওজর ছাড়া ছাড়লে গুনাহ। বাকি তিন মাযহাবে ওয়াজিব ও ফরজ একই।' },
};

const WAJIB_ITEMS = [
  { emoji: '🕌',
    titleEn: 'Witr Prayer (Ḥanafī view)', titleBn: 'বিতর নামাজ (হানাফি মতে)',
    descEn: 'A 1 or 3 rak\'ah prayer performed after Isha until dawn. Ḥanafī: wājib. Other schools: strong sunnah. The Prophet ﷺ never omitted it, even in travel.',
    descBn: 'ইশার পর ফজরের আগ পর্যন্ত ১ বা ৩ রাকাত নামাজ। হানাফি মতে: ওয়াজিব। অন্য মাযহাবে: প্রবল সুন্নাত। নবী ﷺ সফরেও ছাড়েননি।',
    ref: '73:20',
  },
  { emoji: '🎉',
    titleEn: 'ʿEid Prayer (2 Eids)', titleBn: 'দুই ঈদের নামাজ',
    descEn: '2 rak\'ah prayer with extra takbīrs on Eid al-Fitr (1 Shawwal) and Eid al-Adha (10 Dhul-Hijjah). Ḥanafī: wājib on adult free men; others: strong sunnah.',
    descBn: 'ঈদুল ফিতর (১ শাওয়াল) ও ঈদুল আযহা (১০ জিলহজ) — ২ রাকাতে অতিরিক্ত তাকবিরসহ। হানাফি মতে: প্রাপ্তবয়স্ক স্বাধীন পুরুষের উপর ওয়াজিব; অন্যদের মতে: প্রবল সুন্নাত।',
    ref: '108:2',
  },
  { emoji: '🐐',
    titleEn: 'Qurbānī / Uḍḥiyyah (Sacrifice)', titleBn: 'কুরবানি / উযহিয়্যা',
    descEn: 'Animal sacrifice on Eid al-Adha for every capable Muslim who reaches nisab (Ḥanafī: wājib once a year). Meat divided into three: family, relatives/neighbours, poor.',
    descBn: 'ঈদুল আযহায় নেসাবের অধিকারী প্রত্যেক সামর্থ্যবান মুসলিমের কুরবানি (হানাফি মতে: বছরে একবার ওয়াজিব)। মাংস তিন ভাগে: পরিবার, আত্মীয়/প্রতিবেশী, গরিব।',
    ref: '22:34-37, 108:2',
  },
  { emoji: '🎁',
    titleEn: 'Ṣadaqat al-Fiṭr (Fitrah)', titleBn: 'সাদাকাতুল ফিতর',
    descEn: 'A small charity paid before the Eid al-Fitr prayer on behalf of every Muslim in the household (young, old, male, female). Purifies the fast from any lapses.',
    descBn: 'ঈদুল ফিতরের নামাজের আগে পরিবারের প্রত্যেক মুসলিমের (ছোট-বড়, নারী-পুরুষ) পক্ষ থেকে একটি ছোট দান। রোজার ত্রুটি থেকে পবিত্র করে।',
    ref: 'Bukhari 1503',
  },
  { emoji: '🤲',
    titleEn: 'Reciting Al-Fātiḥah in Each Rakah', titleBn: 'প্রতি রাকাতে সূরা ফাতিহা তিলাওয়াত',
    descEn: 'The Ḥanafī view: reciting al-Fātiḥah in every rakah is wājib (fard on the imām and munfarid, but the mustaḥabb in ma\'mūm). Other schools: it is a fard/rukn of every rakah.',
    descBn: 'হানাফি মত: প্রতি রাকাতে ফাতিহা পড়া ওয়াজিব (ইমাম ও একাকীর ফরজ, মুক্তাদির মুস্তাহাব)। অন্য মাযহাবে: প্রতি রাকাতের ফরজ/রুকন।',
    ref: 'Bukhari 756',
  },
  { emoji: '🙏',
    titleEn: 'Tashahhud in the Middle & Final Sitting', titleBn: 'বৈঠকে তাশাহহুদ পড়া',
    descEn: 'Reciting the tashahhud in the middle and final sitting is wājib. Forgetting it requires sajda al-sahw (compensating prostrations).',
    descBn: 'মধ্যম ও শেষ বৈঠকে তাশাহহুদ পড়া ওয়াজিব। ভুলে গেলে সিজদায়ে সাহু আবশ্যক।',
    ref: 'Bukhari 831',
  },
  { emoji: '☮️',
    titleEn: 'Tasleem (Ending with Salam)', titleBn: 'সালাম দিয়ে নামাজ শেষ করা',
    descEn: 'Concluding salah with "As-salamu alaykum wa raḥmatullah" to the right, then to the left. Wājib per Ḥanafī; fard per others.',
    descBn: '"আসসালামু আলাইকুম ওয়া রাহমাতুল্লাহ" — ডান ও বাম দিকে সালাম দিয়ে নামাজ শেষ করা। হানাফি মতে: ওয়াজিব; অন্য মাযহাবে: ফরজ।',
    ref: 'Muslim 582',
  },
  { emoji: '↩️',
    titleEn: 'Sajda al-Sahw (Compensating Prostrations)', titleBn: 'সিজদায়ে সাহু',
    descEn: 'Two prostrations performed after tashahhud (before or after salam per school) to compensate for a forgotten wājib or added rakah. Wājib whenever a wājib is missed.',
    descBn: 'তাশাহহুদের পর দুটি সিজদা (মাযহাব অনুযায়ী সালামের আগে বা পরে) — ভুলে ছুটে যাওয়া ওয়াজিব বা বাড়তি রাকাতের কাফফারা। যখনই ওয়াজিব ছুটে যায় তখনই ওয়াজিব।',
    ref: 'Bukhari 1224',
  },
  { emoji: '📖',
    titleEn: 'Long Recitation in Fajr & First Two Rakahs of Dhuhr', titleBn: 'ফজর ও যোহরের প্রথম দুই রাকাতে দীর্ঘ কিরাত',
    descEn: 'Reciting audibly (Fajr, Maghrib, Isha first two rak\'ahs) or silently (Dhuhr, Asr) with appropriate length is a wājib of prayer.',
    descBn: 'জোরে (ফজর, মাগরিব, ইশার প্রথম দুই রাকাত) বা চুপিসারে (যোহর, আসর) যথাযথ দৈর্ঘ্যে কিরাত পড়া নামাজের ওয়াজিব।',
    ref: 'Bukhari 762',
  },
  { emoji: '⏳',
    titleEn: 'Fulfilling Vows (Nadhr)', titleBn: 'মান্নত পূরণ',
    descEn: 'If one vows to perform an act of worship for Allah (e.g., "I vow to fast three days if my sick child recovers"), fulfilling it becomes wājib. Vowing to sin is invalid.',
    descBn: 'কেউ ইবাদতের মান্নত করলে (যেমন "আমার অসুস্থ সন্তান সুস্থ হলে তিন দিন রোজা রাখব"), তা পূরণ করা ওয়াজিব। পাপের মান্নত বাতিল।',
    ref: '22:29, Bukhari 6696',
  },
];

const WAJIB_QUR = [
  { ref: '73:20', en: '"So recite what is easy from the Quran. He knows that there will be among you those who are ill and others travelling throughout the land seeking Allah\'s bounty…"', bn: '"যতটুকু সহজ হয় কুরআন থেকে পড়। তিনি জানেন তোমাদের মধ্যে অসুস্থ থাকবে এবং অন্যরা আল্লাহর অনুগ্রহ অন্বেষণে ভূপৃষ্ঠে সফর করবে…"' },
  { ref: '108:1-3', en: '"Indeed, We have granted you al-Kawthar. So pray to your Lord and sacrifice. Indeed, your enemy is the one cut off."', bn: '"নিশ্চয়ই আমি তোমাকে কাওসার দান করেছি। সুতরাং তোমার রবের জন্য নামাজ পড় ও কুরবানি কর। নিশ্চয়ই তোমার শত্রুই বিচ্ছিন্ন।"' },
  { ref: '22:36', en: '"And the camels and cattle — We have appointed them for you as among the symbols of Allah…"', bn: '"আর উট ও গরু — আমি এগুলো তোমাদের জন্য আল্লাহর নিদর্শনসমূহের অন্তর্ভুক্ত করেছি…"' },
  { ref: '22:29', en: '"Then let them end their untidiness, fulfill their vows, and perform tawaf around the ancient House."', bn: '"তারপর তারা যেন তাদের ময়লা দূর করে, মান্নত পূর্ণ করে এবং প্রাচীন ঘরের চারপাশে তাওয়াফ করে।"' },
  { ref: '2:43', en: '"And establish prayer and give zakāh and bow with those who bow [in worship]."', bn: '"তোমরা নামাজ কায়েম কর, যাকাত দাও এবং রুকুকারীদের সাথে রুকু কর।"' },
  { ref: '5:97', en: '"Allah has appointed the Kaʿbah, the Sacred House, as a means of support and order for the people."', bn: '"আল্লাহ কাবাকে — পবিত্র ঘরকে — মানুষের জন্য প্রতিষ্ঠার কেন্দ্রবিন্দু করেছেন।"' },
  { ref: '98:5', en: '"And they were not commanded except to worship Allah, [being] sincere to Him in religion, inclining to truth, and to establish prayer and give zakāh."', bn: '"তাদেরকে কেবল এই নির্দেশ দেওয়া হয়েছিল যে, তারা খাঁটি মনে একনিষ্ঠভাবে আল্লাহর ইবাদত করবে, নামাজ কায়েম করবে ও যাকাত দেবে।"' },
  { ref: '2:196', en: '"And complete the Ḥajj and ʿumrah for Allah. But if you are prevented, then [offer] whatever sacrificial animal is available…"', bn: '"আল্লাহর উদ্দেশে হজ ও উমরা পূর্ণ কর। কিন্তু যদি বাধা পাও, তাহলে যত সহজে সম্ভব কুরবানি দাও…"' },
  { ref: '22:34', en: '"And for all religion We have appointed a rite [of sacrifice], that they may mention the name of Allah over what He has provided them of sacrificial animals."', bn: '"প্রতিটি সম্প্রদায়ের জন্য আমি কুরবানির বিধান রেখেছি, যাতে তারা আল্লাহ-প্রদত্ত চতুষ্পদ জন্তুর উপর আল্লাহর নাম উচ্চারণ করে।"' },
  { ref: '73:2-4', en: '"Arise [to pray] the night, except for a little — half of it or subtract from it a little, or add to it; and recite the Quran with measured recitation."', bn: '"রাতে নামাজে দাঁড়াও — অল্প সময় বাদে — অর্ধেক রাত বা তার চেয়ে কিছু কম, অথবা তার চেয়ে বেশি; এবং কুরআন সুন্দরভাবে তিলাওয়াত কর।"' },
];

const WAJIB_HADITH = [
  {
    textEn: '"Make witr the last of your prayers at night."',
    textBn: '"রাতের নামাজের শেষটিকে বিতর বানাও।"',
    srcEn: 'Bukhari 998, Muslim 751',
    srcBn: 'বুখারি ৯৯৮, মুসলিম ৭৫১',
  },
  {
    textEn: '"Witr is a right [ḥaqq]. Whoever does not perform witr is not from us."',
    textBn: '"বিতর হক (অধিকার)। যে বিতর পড়ে না সে আমাদের দলের নয়।"',
    srcEn: 'Abu Dawud 1419, Ahmad — authenticated',
    srcBn: 'আবু দাউদ ১৪১৯, আহমাদ — সহিহ',
  },
  {
    textEn: '"The Messenger of Allah ﷺ made zakāt al-fiṭr compulsory upon slaves and free people, males and females, young and old among the Muslims — one sāʿ of dates or barley — and ordered it to be paid before the people go out for the \'Eid prayer."',
    textBn: '"রাসূলুল্লাহ ﷺ দাস-মুক্ত, পুরুষ-মহিলা, ছোট-বড় সকল মুসলিমের উপর এক সা খেজুর বা যব দ্বারা ফিতরা ফরজ করেছেন এবং ঈদের নামাজে বের হওয়ার আগেই তা আদায়ের নির্দেশ দিয়েছেন।"',
    srcEn: 'Bukhari 1503, Abu Dawud 1609',
    srcBn: 'বুখারি ১৫০৩, আবু দাউদ ১৬০৯',
  },
  {
    textEn: '"There is no prayer for one who does not recite al-Fātiḥah."',
    textBn: '"যে সূরা ফাতিহা পড়ে না তার নামাজ হয় না।"',
    srcEn: 'Bukhari 756, Muslim 394',
    srcBn: 'বুখারি ৭৫৬, মুসলিম ৩৯৪',
  },
  {
    textEn: '"Whoever slaughters the sacrifice before the prayer, let him slaughter another animal in its place; and whoever has not yet slaughtered, let him slaughter."',
    textBn: '"যে ঈদের নামাজের আগে কুরবানি করে, সে যেন তার জায়গায় আরেকটি জবাই করে; যে এখনো করেনি সে যেন আল্লাহর নামে জবাই করে।"',
    srcEn: 'Bukhari 5560, Muslim 1961',
    srcBn: 'বুখারি ৫৫৬০, মুসলিম ১৯৬১',
  },
  {
    textEn: '"When any of you sits [in prayer], let him say: At-Taḥiyyātu lillāh, waṣ-ṣalawātu waṭ-ṭayyibāt…"',
    textBn: '"তোমাদের কেউ বৈঠকে বসলে বলবে: আত-তাহিয়্যাতু লিল্লাহ, ওয়াস-সালাওয়াতু ওয়াত-ত্বাইয়িবাত…"',
    srcEn: 'Bukhari 831, Muslim 402',
    srcBn: 'বুখারি ৮৩১, মুসলিম ৪০২',
  },
  {
    textEn: '"When one of you is uncertain in his prayer and does not know how many he prayed — three or four — let him cast aside doubt and build on what he is sure of, then perform two prostrations before salam."',
    textBn: '"তোমাদের কেউ নামাজে সন্দেহে পড়লে — তিন পড়েছে না চার — সন্দেহ ছেড়ে দিয়ে নিশ্চিত সংখ্যার উপর ভিত্তি করুক, তারপর সালামের আগে দুটি সিজদা করুক।"',
    srcEn: 'Muslim 571, Bukhari 1232',
    srcBn: 'মুসলিম ৫৭১, বুখারি ১২৩২',
  },
  {
    textEn: '"Whoever made a vow to obey Allah, let him obey Him; whoever made a vow to disobey Allah, let him not disobey Him."',
    textBn: '"যে আল্লাহর আনুগত্যের মান্নত করেছে সে যেন তা পূরণ করে; যে আল্লাহর নাফরমানির মান্নত করেছে সে যেন তা না করে।"',
    srcEn: 'Bukhari 6696',
    srcBn: 'বুখারি ৬৬৯৬',
  },
];

class WajibModule {
  constructor() {
    this.root = document.getElementById('wajib-container');
    if (!this.root) return;
    this.language = (typeof appSettings !== 'undefined' && appSettings) ? appSettings.get('language') : 'en';
    this.rendered = false;
    window.addEventListener('tabChanged', (e) => { try { if (e && e.detail && e.detail.tabId === 'wajib') this.render(); } catch (_) {} });
    window.addEventListener('settingChanged', (e) => {
      try { if (e && e.detail && e.detail.key === 'language') { this.language = e.detail.value || 'en'; if (this.rendered) this.render(); } } catch (_) {}
    });
    this.root.addEventListener('click', (e) => this.handleClick(e));
  }
  tt(key) {
    const fb = WAJIB_I18N[key];
    if (fb) {
      if (this.language && fb[this.language]) return fb[this.language];
      if (this.language === 'bn') return fb.bn || fb.en;
      if (this.language && this.language !== 'en' && typeof CI18N !== 'undefined') { const tr = CI18N.tr(this.language, fb.en); if (tr) return tr; }
      return fb.en;
    }
    return (typeof t === 'function') ? t(key, this.language) : key;
  }
  lc(o) {
    if (!o) return '';
    const lang = this.language;
    if (lang && o[lang]) return o[lang];
    if (lang === 'bn') return o.bn || o.en || '';
    if (lang && lang !== 'en' && typeof CI18N !== 'undefined' && o.en) { const tr = CI18N.tr(lang, o.en); if (tr) return tr; }
    return o.en || o.bn || '';
  }
  esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
  render() {
    this.rendered = true;
    const L = (o) => this.esc(this.lc(o));
    this.root.innerHTML = `
      <div class="max-w-3xl mx-auto space-y-6 py-4">
        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div class="p-6 bg-gradient-to-br from-indigo-50 to-transparent dark:from-indigo-900/10">
            <div class="text-4xl mb-2" aria-hidden="true">🔷</div>
            <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100">${this.esc(this.tt('islam_wajib_title'))}</h2>
            <p class="text-gray-500 dark:text-gray-400 mt-2 text-sm leading-relaxed" dir="auto">${this.esc(this.tt('islam_wajib_subtitle'))}</p>
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">📚 ${L({ en: 'Common Wajib Acts', bn: 'সাধারণ ওয়াজিব আমল' })}</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            ${WAJIB_ITEMS.map(w => `
              <div class="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-900/40">
                <div class="text-sm font-semibold text-indigo-800 dark:text-indigo-200"><span aria-hidden="true">${w.emoji}</span> ${L({ en: w.titleEn, bn: w.titleBn })}</div>
                <p class="text-xs text-indigo-700 dark:text-indigo-300 mt-1 leading-relaxed" dir="auto">${L({ en: w.descEn, bn: w.descBn })}</p>
                <button type="button" data-wajib-ayah="${this.esc(w.ref.split(',')[0].trim())}" class="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 text-[0.65rem] font-medium hover:bg-indigo-500 hover:text-white transition-colors">📖 ${this.esc(w.ref)}</button>
              </div>`).join('')}
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">💬 ${L({ en: 'Hadith on Wajib', bn: 'ওয়াজিব সম্পর্কে হাদিস' })}</h3>
          <div class="space-y-3">
            ${WAJIB_HADITH.map(h => `
              <div class="p-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/40">
                <p class="text-sm text-green-800 dark:text-green-200 leading-relaxed" dir="auto">${L({ en: h.textEn, bn: h.textBn })}</p>
                <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">— ${L({ en: h.srcEn, bn: h.srcBn })}</p>
              </div>`).join('')}
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">📖 ${L({ en: 'Quranic References on Wajib', bn: 'ওয়াজিব সম্পর্কে কুরআনি রেফারেন্স' })}</h3>
          <div class="space-y-3">
            ${WAJIB_QUR.map(q => `
              <div class="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-900/40">
                <p class="text-sm text-indigo-800 dark:text-indigo-200 leading-relaxed" dir="auto">${L({ en: q.en, bn: q.bn })}</p>
                <button type="button" data-wajib-ayah="${this.esc(q.ref)}" class="mt-2 inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 text-xs font-medium hover:bg-indigo-500 hover:text-white transition-colors">📖 ${this.esc(q.ref)} ${L({ en: 'Read', bn: 'পড়ুন' })}</button>
              </div>`).join('')}
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-1 flex items-center gap-2">📊 ${L({ en: 'Wajib vs Sunnah — Practical Comparison', bn: 'ওয়াজিব বনাম সুন্নাত — ব্যবহারিক তুলনা' })}</h3>
          <p class="text-xs text-gray-500 dark:text-gray-400 mb-3 leading-relaxed" dir="auto">${L({ en: 'Ḥanafī classification shown. In the Shāfiʿī, Mālikī and Ḥanbalī schools, wājib and fard are synonymous, so the ranking of several acts below differs.', bn: 'হানাফি শ্রেণীবিভাগ দেখানো হয়েছে। শাফিয়ী, মালিকী ও হাম্বলী মাযহাবে ওয়াজিব ও ফরজ সমার্থক; তাই নিচের কিছু আমলের মর্যাদা তাদের কাছে ভিন্ন।' })}</p>
          <div class="overflow-x-auto">
            <table class="w-full text-xs border-collapse">
              <thead>
                <tr class="bg-indigo-50 dark:bg-indigo-900/30">
                  <th class="text-left p-2 border border-indigo-100 dark:border-indigo-900/40 text-indigo-800 dark:text-indigo-200 font-semibold">${L({ en: 'Act', bn: 'আমল' })}</th>
                  <th class="text-left p-2 border border-indigo-100 dark:border-indigo-900/40 text-indigo-800 dark:text-indigo-200 font-semibold">${L({ en: 'Ḥanafī', bn: 'হানাফি' })}</th>
                  <th class="text-left p-2 border border-indigo-100 dark:border-indigo-900/40 text-indigo-800 dark:text-indigo-200 font-semibold">${L({ en: 'Other Schools', bn: 'অন্য মাযহাব' })}</th>
                  <th class="text-left p-2 border border-indigo-100 dark:border-indigo-900/40 text-indigo-800 dark:text-indigo-200 font-semibold">${L({ en: 'If Omitted Without Excuse', bn: 'ওজর ছাড়া ছাড়লে' })}</th>
                </tr>
              </thead>
              <tbody>
                ${[
                  { act: { en: 'Witr prayer', bn: 'বিতর নামাজ' }, hanafi: { en: 'Wājib', bn: 'ওয়াজিব' }, other: { en: 'Sunnah muʾakkadah', bn: 'সুন্নাতে মুয়াক্কাদা' }, cons: { en: 'Sin (Ḥanafī); great reward missed (others)', bn: 'গুনাহ (হানাফি); মহা সওয়াব মিস (অন্যরা)' } },
                  { act: { en: '\'Eid prayer', bn: 'ঈদের নামাজ' }, hanafi: { en: 'Wājib', bn: 'ওয়াজিব' }, other: { en: 'Sunnah muʾakkadah', bn: 'সুন্নাতে মুয়াক্কাদা' }, cons: { en: 'Sin (Ḥanafī); no sin (others)', bn: 'গুনাহ (হানাফি); গুনাহ নেই (অন্যরা)' } },
                  { act: { en: 'Qurbānī / Uḍḥiyyah', bn: 'কুরবানি / উযহিয়্যা' }, hanafi: { en: 'Wājib (if nisāb-owner)', bn: 'ওয়াজিব (নেসাবের মালিক হলে)' }, other: { en: 'Sunnah muʾakkadah', bn: 'সুন্নাতে মুয়াক্কাদা' }, cons: { en: 'Sin (Ḥanafī); strongly discouraged to omit (others)', bn: 'গুনাহ (হানাফি); ছাড়া অত্যন্ত অপছন্দনীয় (অন্যরা)' } },
                  { act: { en: 'Al-Fātiḥah in each rakʿah', bn: 'প্রতি রাকাতে সূরা ফাতিহা' }, hanafi: { en: 'Wājib (imām & munfarid)', bn: 'ওয়াজিব (ইমাম ও একা)' }, other: { en: 'Fard / Rukn (invalidates prayer if omitted)', bn: 'ফরজ / রুকন (বাদ পড়লে নামাজ বাতিল)' }, cons: { en: 'Sajda al-sahw (Ḥanafī); prayer invalid (others)', bn: 'সিজদায়ে সাহু (হানাফি); নামাজ বাতিল (অন্যরা)' } },
                  { act: { en: 'Tashahhud in final sitting', bn: 'শেষ বৈঠকে তাশাহহুদ' }, hanafi: { en: 'Wājib', bn: 'ওয়াজিব' }, other: { en: 'Fard / Rukn', bn: 'ফরজ / রুকন' }, cons: { en: 'Sajda al-sahw (Ḥanafī); prayer invalid (others)', bn: 'সিজদায়ে সাহু (হানাফি); নামাজ বাতিল (অন্যরা)' } },
                  { act: { en: 'Ṣadaqat al-Fiṭr (Fitrah)', bn: 'সাদাকাতুল ফিতর' }, hanafi: { en: 'Wājib', bn: 'ওয়াজিব' }, other: { en: 'Wājib / Fard (Shāfiʿī, Ḥanbalī)', bn: 'ওয়াজিব / ফরজ (শাফিয়ী, হাম্বলী)' }, cons: { en: 'Sin if omitted while able', bn: 'সামর্থ্য থাকলে ছাড়া গুনাহ' } },
                ].map((r, i) => `
                  <tr class="${i % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-indigo-50/40 dark:bg-indigo-900/10'}">
                    <td class="p-2 border border-indigo-100 dark:border-indigo-900/30 font-medium text-gray-800 dark:text-gray-100" dir="auto">${L(r.act)}</td>
                    <td class="p-2 border border-indigo-100 dark:border-indigo-900/30 text-indigo-700 dark:text-indigo-300" dir="auto">${L(r.hanafi)}</td>
                    <td class="p-2 border border-indigo-100 dark:border-indigo-900/30 text-gray-600 dark:text-gray-300" dir="auto">${L(r.other)}</td>
                    <td class="p-2 border border-indigo-100 dark:border-indigo-900/30 text-gray-500 dark:text-gray-400" dir="auto">${L(r.cons)}</td>
                  </tr>`).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">🧠 ${L({ en: 'Self-check', bn: 'নিজেই যাচাই' })}</h3>
          <div class="space-y-2">
            ${[
              { q: { en: 'How does wājib differ from fard in the Ḥanafī school?', bn: 'হানাফি মাযহাবে ওয়াজিব ফরজ থেকে কীভাবে ভিন্ন?' }, a: { en: 'Wājib is proven by probable (ẓannī) evidence, one degree below fard which is proven by definitive (qaṭ\'ī) evidence. Denying a fard is kufr; denying a wājib is a major sin, not kufr.', bn: 'ওয়াজিব প্রবল (যান্নী) দলিল দ্বারা প্রমাণিত, ফরজের এক ধাপ নিচে যা নিশ্চিত (কাত্বী) দলিল দ্বারা প্রমাণিত। ফরজ অস্বীকার করলে কুফর; ওয়াজিব অস্বীকার কবিরা গুনাহ, কুফর নয়।' } },
              { q: { en: 'Is Witr fard, wājib or sunnah?', bn: 'বিতর কি ফরজ, ওয়াজিব নাকি সুন্নাত?' }, a: { en: 'Ḥanafī: wājib. Shāfiʿī, Mālikī, Ḥanbalī: sunnah mu\'akkadah (strong sunnah). All agree the Prophet ﷺ never omitted it, even in travel.', bn: 'হানাফি: ওয়াজিব। শাফিয়ী, মালিকী, হাম্বলী: সুন্নাতে মুয়াক্কাদা। সবাই একমত যে নবী ﷺ সফরেও তা ছাড়েননি।' } },
              { q: { en: 'What happens if I miss a wājib in prayer?', bn: 'নামাজে ওয়াজিব ছুটে গেলে কী করব?' }, a: { en: 'You perform sajda al-sahw (two extra prostrations) after tashahhud — before or after salam depending on the school. If you notice after leaving the prayer, you should still perform sajda al-sahw as soon as possible.', bn: 'তাশাহহুদের পর সিজদায়ে সাহু (দুই অতিরিক্ত সিজদা) করবেন — মাযহাব অনুযায়ী সালামের আগে বা পরে। নামাজ শেষে খেয়াল করলে যত দ্রুত সম্ভব সিজদায়ে সাহু করবেন।' } },
              { q: { en: 'Is Qurbānī on every household or every person?', bn: 'কুরবানি কি প্রতি পরিবারে না প্রতি ব্যক্তির উপর?' }, a: { en: 'Ḥanafī: on every adult, sane, resident Muslim who owns nisab — even multiple family members if each has nisab. Other schools: sunnah mu\'akkadah on the household head with the whole family sharing the reward.', bn: 'হানাফি: প্রত্যেক প্রাপ্তবয়স্ক, সুস্থ, মুকিম মুসলিম যার নেসাব আছে — একই পরিবারে একাধিক ব্যক্তির উপরও ওয়াজিব যদি প্রত্যেকের নেসাব থাকে। অন্য মাযহাবে: পরিবারের প্রধানের উপর সুন্নাতে মুয়াক্কাদা, সবাই সওয়াবের অংশীদার।' } },
              { q: { en: 'Can I break a vow (nadhr) that I made?', bn: 'করা মান্নত কি ভাঙ্গা যায়?' }, a: { en: 'A vow to do a good deed (fasting, charity, prayer) MUST be fulfilled. If unable, one pays kaffārah (like breaking an oath: feed 10 poor, or fast 3 days). Vows to sin are invalid and must not be fulfilled.', bn: 'ভালো কাজের মান্নত (রোজা, দান, নামাজ) অবশ্যই পূরণ করতে হবে। অসম্ভব হলে কাফফারা দিতে হবে (কসম ভঙ্গের মতো: ১০ গরিবকে খাওয়ানো বা ৩ দিন রোজা)। পাপের মান্নত বাতিল, তা পূরণ করা যাবে না।' } },
              { q: { en: 'Is Ṣadaqat al-Fiṭr obligatory on poor Muslims too?', bn: 'গরিব মুসলিমের উপরও ফিতরা ওয়াজিব?' }, a: { en: 'Yes — if one possesses food in excess of one\'s own and family\'s needs for that day and night of Eid. It is given on behalf of every household member including young children. If genuinely unable to afford it, the obligation is lifted.', bn: 'হ্যাঁ — ঈদের দিন ও রাতের নিজের ও পরিবারের প্রয়োজনের বেশি খাবার থাকলে। শিশুসহ প্রতিটি পরিবারের সদস্যের পক্ষ থেকে দিতে হবে। সত্যিই সামর্থ্য না থাকলে দায় নেই।' } },
              { q: { en: 'How many extra takbīrs are there in Eid prayer, and when are they recited?', bn: 'ঈদের নামাজে কতটি অতিরিক্ত তাকবির এবং কখন বলতে হয়?' }, a: { en: 'Ḥanafī: 3 extra in the 1st rak\'ah before recitation, 3 in the 2nd after recitation. Shāfiʿī/Ḥanbalī: 7 in the 1st (after opening du\'a), 5 in the 2nd (before recitation). Mālikī: 6 then 5. All: two rak\'ahs with elevated voice, khutbah after prayer.', bn: 'হানাফি: প্রথম রাকাতে কিরাতের আগে ৩, দ্বিতীয়তে কিরাতের পরে ৩। শাফিয়ী/হাম্বলী: প্রথমে ৭টি (ইফতিতাহের পরে), দ্বিতীয়তে ৫টি (কিরাতের আগে)। মালিকী: ৬ তারপর ৫। সবাই: দুই রাকাত উচ্চস্বরে, নামাজের পরে খুতবা।' } },
              { q: { en: 'What are the valid species and minimum ages for Qurbānī?', bn: 'কুরবানির বৈধ পশু ও ন্যূনতম বয়স কী?' }, a: { en: 'Camel: 5 years. Cattle (cow/buffalo/ox): 2 years. Sheep or goat: 1 year (a plump 6-month lamb is also acceptable). Camels and cattle may serve for up to 7 people; sheep and goats for 1 person each. Time: after Eid prayer until sunset of 13 Dhul-Hijjah (3 slaughter days).', bn: 'উট: ৫ বছর। গরু/মহিষ/বলদ: ২ বছর। ভেড়া বা ছাগল: ১ বছর (মোটাতাজা ৬ মাসের মেষও জায়েয)। উট ও গরু ৭ জনের পক্ষ থেকে; ভেড়া-ছাগল ১ জনের পক্ষ থেকে। সময়: ঈদের নামাজের পর থেকে ১৩ জিলহজের সূর্যাস্ত পর্যন্ত।' } },
              { q: { en: 'Why does the Ḥanafī school treat witr as wājib rather than sunnah?', bn: 'হানাফি মাযহাব বিতরকে সুন্নাতের বদলে ওয়াজিব কেন বলে?' }, a: { en: 'Because of the hadith: "Witr is a right (ḥaqq); whoever does not pray witr is not from us." (Abu Dawud 1419) Ḥanafī scholars read ḥaqq as indicating wujūb (obligation), while other schools understand it as strong emphasis on a sunnah (taʾkīd).', bn: 'এই হাদিসের কারণে: "বিতর হক; যে বিতর পড়ে না সে আমাদের দলের নয়।" (আবু দাউদ ১৪১৯) হানাফি আলেমরা "হক" শব্দটিকে ওয়াজিবের নির্দেশক মনে করেন, অন্য মাযহাবগুলো এটিকে সুন্নাতের উপর তাকিদ বলে।' } },
              { q: { en: 'What wājib acts of Ḥajj require a compensatory slaughter (dam) if omitted?', bn: 'হজের কোন ওয়াজিব বাদ পড়লে দম (ক্ষতিপূরণ কুরবানি) লাগে?' }, a: { en: 'Ḥanafī school: the wājibāt of Hajj beyond its arkān include staying overnight in Muzdalifah, throwing pebbles at the three Jamarat (in order), and performing tawāf al-wadāʿ (farewell tawaf, for non-Makkans). Missing any one requires a dam (slaughter in Makkah); the Hajj remains valid.', bn: 'হানাফি মতে হজের রুকনের বাইরে ওয়াজিব হলো: মুযদালিফায় রাতযাপন, তিন জামারাতে ক্রমানুসারে কঙ্কর নিক্ষেপ এবং তাওয়াফে বিদা (মক্কাবাসী ছাড়া)। একটি বাদ পড়লে মক্কায় দম (পশু জবাই) দিতে হয়; হজ সহিহ থাকে।' } },
            ].map(item => `
              <details class="rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-900/40 overflow-hidden">
                <summary class="flex items-center gap-2 p-3 cursor-pointer list-none hover:bg-indigo-100/50 dark:hover:bg-indigo-900/30">
                  <span class="text-indigo-600 dark:text-indigo-400 text-sm">❓</span>
                  <span class="flex-1 text-sm font-medium text-gray-800 dark:text-gray-100" dir="auto">${L(item.q)}</span>
                  <span class="text-indigo-500 text-xs">▼</span>
                </summary>
                <div class="px-4 pb-3 pt-1 text-xs text-gray-700 dark:text-gray-200 leading-relaxed border-t border-indigo-100 dark:border-indigo-900/40" dir="auto">✅ ${L(item.a)}</div>
              </details>`).join('')}
          </div>
        </div>
      </div>`;
  }
  handleClick(e) {
    const ayah = e.target.closest('[data-wajib-ayah]');
    if (ayah) { try { if (typeof ayahModal !== 'undefined' && ayahModal && ayahModal.open) ayahModal.open(ayah.getAttribute('data-wajib-ayah')); } catch (_) {} }
  }
}

let wajibModule;
document.addEventListener('DOMContentLoaded', () => { wajibModule = new WajibModule(); });
