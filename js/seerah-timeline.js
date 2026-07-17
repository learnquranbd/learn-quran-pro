/**
 * Seerah — Life of the Prophet Muhammad ﷺ.
 * An interactive, chronological timeline of the Prophet's life ﷺ grouped into
 * eras (Before Prophethood, Meccan, Hijra & Medinan, Later Medinan & Farewell).
 * Content is drawn from mainstream Sunni seerah works (Ibn Hisham/Ibn Ishaq,
 * ar-Raheeq al-Makhtum "The Sealed Nectar", Martin Lings). All content is inline
 * with per-item en/bn fields; other UI languages fall back to English.
 *
 * Renders into #seerah-container (tab "seerah"). Marks read state in
 * localStorage under `lq_seerah_read`. Everything is defensive — it never throws.
 */

const SEERAH_ERAS = [
  { id: 'before',   key: 'seerah_era_before',   emoji: '🕰️' },
  { id: 'meccan',   key: 'seerah_era_meccan',   emoji: '🕋' },
  { id: 'medinan',  key: 'seerah_era_medinan',  emoji: '🌿' },
  { id: 'farewell', key: 'seerah_era_farewell', emoji: '🤲' },
];

const SEERAH_EVENTS = [
  // ── Before Prophethood ────────────────────────────────────────────────
  {
    id: 'lineage', era: 'before', yearCE: 'c. 570 CE', yearAH: '',
    placeEn: 'Mecca', placeBn: 'মক্কা',
    titleEn: 'Noble Lineage — Quraysh & Banu Hashim',
    titleBn: 'সম্ভ্রান্ত বংশ — কুরাইশ ও বনু হাশিম',
    descEn: 'The Prophet ﷺ was born into Banu Hashim, a respected clan of the Quraysh, the custodians of the Ka’bah in Mecca. His lineage traces back to Prophet Ibrahim (AS) through his son Isma’il (AS).',
    descBn: 'নবী ﷺ কুরাইশদের সম্মানিত গোত্র বনু হাশিমে জন্মগ্রহণ করেন, যারা ছিলেন মক্কার কাবার তত্ত্বাবধায়ক। তাঁর বংশধারা পুত্র ইসমাইল (আঃ)-এর মাধ্যমে নবী ইবরাহিম (আঃ) পর্যন্ত পৌঁছে।',
    lessonEn: 'He arose from an honoured house, yet his message elevated character above lineage.',
    lessonBn: 'তিনি সম্মানিত বংশে জন্মালেও তাঁর বার্তা বংশের ঊর্ধ্বে চরিত্রকে মর্যাদা দিয়েছে।',
  },
  {
    id: 'birth', era: 'before', yearCE: 'c. 570 CE', yearAH: '',
    placeEn: 'Mecca', placeBn: 'মক্কা',
    titleEn: 'Year of the Elephant & the Birth',
    titleBn: 'হস্তীবর্ষ ও জন্ম',
    descEn: 'Muhammad ﷺ was born in Mecca in the "Year of the Elephant" — the year Abraha’s army with an elephant failed to destroy the Ka’bah. His father Abdullah had already passed away before his birth.',
    descBn: 'মুহাম্মদ ﷺ "হস্তীবর্ষে" মক্কায় জন্মগ্রহণ করেন — যে বছর আবরাহার হাতিসহ বাহিনী কাবা ধ্বংস করতে ব্যর্থ হয়েছিল। জন্মের আগেই তাঁর পিতা আবদুল্লাহ ইন্তেকাল করেছিলেন।',
    lessonEn: 'Allah protected His House; the Prophet ﷺ entered a world already marked by divine care.',
    lessonBn: 'আল্লাহ তাঁর ঘর রক্ষা করেছেন; নবী ﷺ এমন এক পৃথিবীতে এলেন যা আগে থেকেই ঐশী রহমতে চিহ্নিত।',
  },
  {
    id: 'halimah', era: 'before', yearCE: 'c. 570–574 CE', yearAH: '',
    placeEn: 'Desert of Banu Sa’d', placeBn: 'বনু সাদের মরুভূমি',
    titleEn: 'Infancy with Halimah al-Sa’diyah (RA)',
    titleBn: 'হালিমা সাদিয়া (রাঃ)-এর কাছে শৈশব',
    descEn: 'As was Meccan custom, the infant Muhammad ﷺ was nursed and raised in the desert by Halimah al-Sa’diyah (RA) of Banu Sa’d, where the air was pure and the Arabic eloquent.',
    descBn: 'মক্কার প্রথা অনুযায়ী শিশু মুহাম্মদ ﷺ-কে বনু সাদের হালিমা সাদিয়া (রাঃ) মরুভূমিতে দুধ পান করিয়ে লালন-পালন করেন, যেখানে বাতাস ছিল বিশুদ্ধ ও আরবি ভাষা ছিল বিশুদ্ধতম।',
    lessonEn: 'His upbringing combined purity of environment with the eloquence of the Arabs.',
    lessonBn: 'তাঁর লালন-পালনে পরিবেশের বিশুদ্ধতা ও আরবদের ভাষার সৌকর্য একত্র হয়েছিল।',
  },
  {
    id: 'orphan', era: 'before', yearCE: 'c. 576–578 CE', yearAH: '',
    placeEn: 'Mecca', placeBn: 'মক্কা',
    titleEn: 'Orphanhood — Loss of His Mother & Grandfather',
    titleBn: 'ইয়াতিমত্ব — মা ও দাদার মৃত্যু',
    descEn: 'His mother Aminah passed away when he was about six. His grandfather Abd al-Muttalib then took him in but died about two years later, after which his uncle Abu Talib became his guardian.',
    descBn: 'প্রায় ছয় বছর বয়সে তাঁর মা আমিনা মারা যান। এরপর দাদা আবদুল মুত্তালিব তাঁকে লালন করেন, কিন্তু প্রায় দুই বছর পর তিনিও মারা যান; তখন চাচা আবু তালিব তাঁর অভিভাবক হন।',
    lessonEn: 'Early loss taught him compassion; the Quran later reminded him: care for the orphan.',
    lessonBn: 'শৈশবের এই ক্ষতি তাঁকে সহানুভূতি শিখিয়েছে; কুরআন পরে স্মরণ করিয়েছে: ইয়াতিমের প্রতি যত্নবান হও।',
    ayah: '93:9',
  },
  {
    id: 'abutalib', era: 'before', yearCE: 'c. 578–583 CE', yearAH: '',
    placeEn: 'Mecca / Syria route', placeBn: 'মক্কা / সিরিয়ার পথ',
    titleEn: 'Under Abu Talib’s Care & the Monk Bahira',
    titleBn: 'আবু তালিবের তত্ত্বাবধান ও পাদ্রি বাহিরা',
    descEn: 'Raised by his uncle Abu Talib, the young Muhammad ﷺ tended flocks and, on a trade journey to Syria, was noticed by the monk Bahira, who recognised signs of prophethood in him.',
    descBn: 'চাচা আবু তালিবের কাছে বড় হয়ে যুবক মুহাম্মদ ﷺ পশু চরাতেন এবং সিরিয়ায় এক ব্যবসায়িক সফরে পাদ্রি বাহিরার নজরে পড়েন, যিনি তাঁর মধ্যে নবুয়তের নিদর্শন দেখেছিলেন।',
    lessonEn: 'Tending flocks trained patience and responsibility — a school of many prophets.',
    lessonBn: 'পশু চরানো ধৈর্য ও দায়িত্ববোধ শেখায় — বহু নবীর এই একই বিদ্যালয়।',
  },
  {
    id: 'amin', era: 'before', yearCE: 'c. 580–595 CE', yearAH: '',
    placeEn: 'Mecca', placeBn: 'মক্কা',
    titleEn: 'The Trustworthy — "al-Amin"',
    titleBn: 'বিশ্বস্তজন — "আল-আমিন"',
    descEn: 'Known for truthfulness and honesty long before prophethood, the people of Mecca called him al-Amin ("the trustworthy"). He joined Hilf al-Fudul, a pact to defend the wronged.',
    descBn: 'নবুয়তের অনেক আগে থেকেই সত্যবাদিতা ও সততার জন্য পরিচিত হয়ে মক্কাবাসী তাঁকে আল-আমিন ("বিশ্বস্ত") বলে ডাকত। তিনি মজলুমদের রক্ষার চুক্তি "হিলফুল ফুযুল"-এ অংশ নেন।',
    lessonEn: 'His character was proven trustworthy even by those who later opposed his message.',
    lessonBn: 'যারা পরে তাঁর বার্তার বিরোধিতা করেছিল, তারাও তাঁর চরিত্রকে বিশ্বস্ত বলে মেনেছিল।',
  },
  {
    id: 'khadijah', era: 'before', yearCE: 'c. 595 CE', yearAH: '',
    placeEn: 'Mecca', placeBn: 'মক্কা',
    titleEn: 'Marriage to Khadijah (RA)',
    titleBn: 'খাদিজা (রাঃ)-এর সাথে বিবাহ',
    descEn: 'Impressed by his honesty in managing her trade, the noble merchant Khadijah bint Khuwaylid (RA) proposed marriage. She became his devoted wife and first supporter, and mother of most of his children.',
    descBn: 'ব্যবসা পরিচালনায় তাঁর সততায় মুগ্ধ হয়ে সম্ভ্রান্ত ব্যবসায়ী খাদিজা বিনতে খুওয়াইলিদ (রাঃ) বিবাহের প্রস্তাব দেন। তিনি হন তাঁর নিবেদিত স্ত্রী ও প্রথম সহায়, এবং তাঁর অধিকাংশ সন্তানের মা।',
    lessonEn: 'A partnership of trust and support that would soon carry the weight of revelation.',
    lessonBn: 'বিশ্বাস ও সহায়তার এই বন্ধন শীঘ্রই ওহীর ভার বহন করবে।',
  },
  {
    id: 'kaaba', era: 'before', yearCE: 'c. 605 CE', yearAH: '',
    placeEn: 'Mecca', placeBn: 'মক্কা',
    titleEn: 'Rebuilding the Ka’bah & the Black Stone',
    titleBn: 'কাবা পুনর্নির্মাণ ও হাজরে আসওয়াদ',
    descEn: 'When the Quraysh rebuilt the Ka’bah, the clans nearly came to blows over who would set the Black Stone in place. Muhammad ﷺ resolved it wisely: he placed it on a cloth so all clans could lift it together.',
    descBn: 'কুরাইশরা কাবা পুনর্নির্মাণের সময় হাজরে আসওয়াদ কে স্থাপন করবে তা নিয়ে গোত্রগুলো প্রায় সংঘর্ষে জড়াতে যাচ্ছিল। মুহাম্মদ ﷺ প্রজ্ঞার সাথে সমাধান দেন: তিনি পাথরটি একটি কাপড়ে রাখলেন যাতে সব গোত্র একসাথে তা তুলতে পারে।',
    lessonEn: 'Wisdom and fairness can defuse conflict and unite rivals.',
    lessonBn: 'প্রজ্ঞা ও ন্যায়পরায়ণতা দ্বন্দ্ব নিরসন করে ও প্রতিদ্বন্দ্বীদের এক করে।',
  },

  // ── Meccan Period ─────────────────────────────────────────────────────
  {
    id: 'hira', era: 'meccan', yearCE: 'c. 610 CE', yearAH: '',
    placeEn: 'Cave of Hira, Mecca', placeBn: 'হেরা গুহা, মক্কা',
    titleEn: 'The First Revelation in Cave Hira',
    titleBn: 'হেরা গুহায় প্রথম ওহী',
    descEn: 'At about age 40, while in seclusion in the Cave of Hira, the angel Jibril (AS) came to him with the first revelation: "Read, in the name of your Lord..." (Surah al-’Alaq). Thus began prophethood.',
    descBn: 'প্রায় ৪০ বছর বয়সে হেরা গুহায় নির্জনে থাকা অবস্থায় ফেরেশতা জিবরিল (আঃ) প্রথম ওহী নিয়ে আসেন: "পড়ো তোমার প্রভুর নামে..." (সূরা আলাক)। এভাবেই নবুয়তের সূচনা হয়।',
    lessonEn: 'The first command was "Read" — knowledge is the foundation of the faith.',
    lessonBn: 'প্রথম আদেশ ছিল "পড়ো" — জ্ঞানই ঈমানের ভিত্তি।',
    ayah: '96:1',
  },
  {
    id: 'firstbelievers', era: 'meccan', yearCE: 'c. 610 CE', yearAH: '',
    placeEn: 'Mecca', placeBn: 'মক্কা',
    titleEn: 'The First Believers',
    titleBn: 'প্রথম ঈমানদারগণ',
    descEn: 'The earliest to accept Islam were his wife Khadijah (RA), his close friend Abu Bakr (RA), the young Ali ibn Abi Talib (RA), and his freed servant Zayd ibn Harithah (RA).',
    descBn: 'প্রথম ইসলাম গ্রহণকারীদের মধ্যে ছিলেন তাঁর স্ত্রী খাদিজা (রাঃ), ঘনিষ্ঠ বন্ধু আবু বকর (রাঃ), তরুণ আলী ইবনে আবি তালিব (রাঃ) এবং মুক্ত করা সেবক যায়েদ ইবনে হারিসা (রাঃ)।',
    lessonEn: 'The first to believe spanned wife, friend, youth and freedman — faith is for all.',
    lessonBn: 'প্রথম ঈমানদারদের মধ্যে ছিলেন স্ত্রী, বন্ধু, যুবক ও মুক্তদাস — ঈমান সকলের জন্য।',
  },
  {
    id: 'public', era: 'meccan', yearCE: 'c. 613 CE', yearAH: '',
    placeEn: 'Mecca', placeBn: 'মক্কা',
    titleEn: 'Secret Dawah, then the Public Call',
    titleBn: 'গোপন দাওয়াত, অতঃপর প্রকাশ্য আহ্বান',
    descEn: 'For about three years the call to Islam was quiet. Then, commanded to "warn your nearest kindred," the Prophet ﷺ climbed Mount Safa and openly proclaimed the oneness of Allah to the Quraysh.',
    descBn: 'প্রায় তিন বছর ইসলামের দাওয়াত ছিল গোপন। এরপর "তোমার নিকটাত্মীয়দের সতর্ক করো" আদেশ পেয়ে নবী ﷺ সাফা পাহাড়ে উঠে কুরাইশদের কাছে প্রকাশ্যে আল্লাহর একত্ববাদ ঘোষণা করেন।',
    lessonEn: 'Truth is first nurtured in private, then proclaimed with courage.',
    lessonBn: 'সত্য প্রথমে গোপনে লালিত হয়, অতঃপর সাহসের সাথে ঘোষিত হয়।',
    ayah: '26:214',
  },
  {
    id: 'persecution', era: 'meccan', yearCE: 'c. 613–615 CE', yearAH: '',
    placeEn: 'Mecca', placeBn: 'মক্কা',
    titleEn: 'Persecution of the Muslims',
    titleBn: 'মুসলমানদের উপর নির্যাতন',
    descEn: 'As Islam spread, the Quraysh persecuted the weak and enslaved believers. Bilal ibn Rabah (RA) and others were tortured, yet held firm; Abu Bakr (RA) freed several by purchasing them.',
    descBn: 'ইসলাম ছড়িয়ে পড়ায় কুরাইশরা দুর্বল ও দাস ঈমানদারদের উপর নির্যাতন চালায়। বিলাল ইবনে রাবাহ (রাঃ) ও অন্যরা নির্যাতিত হন, তবু অবিচল থাকেন; আবু বকর (রাঃ) অনেককে কিনে মুক্ত করেন।',
    lessonEn: 'Faith under trial revealed the steadfastness of the early believers.',
    lessonBn: 'পরীক্ষার মুখে ঈমান প্রথম যুগের বিশ্বাসীদের অবিচলতা প্রকাশ করেছে।',
  },
  {
    id: 'abyssinia', era: 'meccan', yearCE: 'c. 615–616 CE', yearAH: '',
    placeEn: 'Abyssinia (Habashah)', placeBn: 'আবিসিনিয়া (হাবশা)',
    titleEn: 'Migration to Abyssinia & the Negus',
    titleBn: 'আবিসিনিয়ায় হিজরত ও নাজ্জাশি',
    descEn: 'To escape persecution, groups of Muslims migrated to Abyssinia, whose just Christian king (the Negus) gave them refuge. Ja’far ibn Abi Talib (RA) recited verses about ’Isa (AS) and Maryam, moving the king to protect them.',
    descBn: 'নির্যাতন থেকে বাঁচতে একদল মুসলিম আবিসিনিয়ায় হিজরত করেন, যার ন্যায়পরায়ণ খ্রিস্টান রাজা (নাজ্জাশি) তাদের আশ্রয় দেন। জাফর ইবনে আবি তালিব (রাঃ) ঈসা (আঃ) ও মারইয়াম সম্পর্কে আয়াত পাঠ করলে রাজা মুগ্ধ হয়ে তাদের রক্ষা করেন।',
    lessonEn: 'Justice can be found even among those of another faith; migration for religion is honoured.',
    lessonBn: 'ন্যায় ভিন্ন ধর্মের মানুষের মধ্যেও পাওয়া যায়; দ্বীনের জন্য হিজরত সম্মানিত।',
  },
  {
    id: 'boycott', era: 'meccan', yearCE: 'c. 617–619 CE', yearAH: '',
    placeEn: 'Mecca', placeBn: 'মক্কা',
    titleEn: 'The Social & Economic Boycott',
    titleBn: 'সামাজিক ও অর্থনৈতিক বয়কট',
    descEn: 'The Quraysh imposed a harsh boycott on Banu Hashim, cutting off trade and marriage for about three years. The Muslims endured severe hunger in the valley until the pact was finally broken.',
    descBn: 'কুরাইশরা বনু হাশিমের উপর কঠোর বয়কট আরোপ করে, প্রায় তিন বছর ব্যবসা ও বিবাহ বন্ধ করে দেয়। উপত্যকায় মুসলিমরা তীব্র ক্ষুধা সহ্য করেন, শেষে চুক্তিটি ভেঙে যায়।',
    lessonEn: 'Hardship endured with patience only strengthened the community’s resolve.',
    lessonBn: 'ধৈর্যের সাথে সহ্য করা কষ্ট সমাজের সংকল্পকে আরও দৃঢ় করেছে।',
  },
  {
    id: 'sorrow', era: 'meccan', yearCE: 'c. 619 CE', yearAH: '',
    placeEn: 'Mecca', placeBn: 'মক্কা',
    titleEn: 'The Year of Sorrow',
    titleBn: 'দুঃখের বছর (আমুল হুযন)',
    descEn: 'Within a short span the Prophet ﷺ lost his beloved wife Khadijah (RA) and his protecting uncle Abu Talib. This "Year of Sorrow" left him without two great supports.',
    descBn: 'অল্প সময়ের মধ্যে নবী ﷺ তাঁর প্রিয় স্ত্রী খাদিজা (রাঃ) ও রক্ষাকারী চাচা আবু তালিবকে হারান। এই "দুঃখের বছর" তাঁকে দুই মহান সহায়হীন করে দেয়।',
    lessonEn: 'Even the Prophet ﷺ knew grief; loss is met with patience and trust in Allah.',
    lessonBn: 'নবী ﷺ-ও শোক জানতেন; ক্ষতি ধৈর্য ও আল্লাহর উপর ভরসায় মোকাবিলা করা হয়।',
  },
  {
    id: 'taif', era: 'meccan', yearCE: 'c. 619 CE', yearAH: '',
    placeEn: 'Ta’if', placeBn: 'তায়েফ',
    titleEn: 'The Journey to Ta’if',
    titleBn: 'তায়েফের সফর',
    descEn: 'Seeking new support, the Prophet ﷺ went to Ta’if but was rejected and stoned. Though wounded, he prayed for their guidance rather than their destruction.',
    descBn: 'নতুন সমর্থনের খোঁজে নবী ﷺ তায়েফে যান, কিন্তু প্রত্যাখ্যাত ও পাথর নিক্ষেপের শিকার হন। আহত হয়েও তিনি তাদের ধ্বংস নয়, বরং হেদায়েতের জন্য দোয়া করেন।',
    lessonEn: 'His mercy answered cruelty with prayer — a mercy to all creation.',
    lessonBn: 'তাঁর দয়া নিষ্ঠুরতার জবাব দিয়েছে দোয়া দিয়ে — সমগ্র সৃষ্টির জন্য রহমত।',
    ayah: '21:107',
  },
  {
    id: 'isra', era: 'meccan', yearCE: 'c. 620–621 CE', yearAH: '',
    placeEn: 'Mecca → Jerusalem → Heavens', placeBn: 'মক্কা → জেরুজালেম → ঊর্ধ্বাকাশ',
    titleEn: 'Isra & Mi’raj — the Five Daily Prayers',
    titleBn: 'ইসরা ও মিরাজ — পাঁচ ওয়াক্ত সালাত',
    descEn: 'In one night the Prophet ﷺ was taken from the Sacred Mosque to al-Aqsa in Jerusalem (Isra), then ascended through the heavens (Mi’raj), where the five daily prayers were prescribed.',
    descBn: 'এক রাতে নবী ﷺ-কে মসজিদুল হারাম থেকে জেরুজালেমের আল-আকসায় নেওয়া হয় (ইসরা), অতঃপর ঊর্ধ্বাকাশে আরোহণ করানো হয় (মিরাজ), যেখানে পাঁচ ওয়াক্ত সালাত ফরজ করা হয়।',
    lessonEn: 'The prayer, gift of this night, is the believer’s daily ascent to Allah.',
    lessonBn: 'এই রাতের উপহার সালাত হলো মুমিনের প্রতিদিনের আল্লাহর দিকে আরোহণ।',
    ayah: '17:1',
  },
  {
    id: 'aqabah', era: 'meccan', yearCE: 'c. 621–622 CE', yearAH: '',
    placeEn: 'Aqabah, near Mina', placeBn: 'আকাবা, মিনার কাছে',
    titleEn: 'The Pledges of al-Aqabah',
    titleBn: 'আকাবার শপথসমূহ',
    descEn: 'Pilgrims from Yathrib (Medina) met the Prophet ﷺ at Aqabah and embraced Islam. In two successive pledges they promised to believe and to protect him, opening the door to the Hijra.',
    descBn: 'ইয়াসরিব (মদিনা) থেকে আগত হাজীরা আকাবায় নবী ﷺ-এর সাথে সাক্ষাৎ করে ইসলাম গ্রহণ করেন। দুই ধারাবাহিক শপথে তারা ঈমান আনা ও তাঁকে রক্ষার অঙ্গীকার করেন, যা হিজরতের পথ খুলে দেয়।',
    lessonEn: 'Sincere allegiance from Medina prepared a home for the new community.',
    lessonBn: 'মদিনার আন্তরিক আনুগত্য নতুন সমাজের জন্য একটি আবাস প্রস্তুত করে।',
  },

  // ── Hijra & Medinan Period ────────────────────────────────────────────
  {
    id: 'hijra', era: 'medinan', yearCE: '622 CE', yearAH: '1 AH',
    placeEn: 'Mecca → Medina', placeBn: 'মক্কা → মদিনা',
    titleEn: 'The Hijra & the Cave of Thawr',
    titleBn: 'হিজরত ও সাওর গুহা',
    descEn: 'Facing a plot on his life, the Prophet ﷺ migrated to Medina with Abu Bakr (RA). They hid in the Cave of Thawr as pursuers passed by, then completed the journey. The Hijra marks year 1 of the Islamic calendar.',
    descBn: 'তাঁকে হত্যার ষড়যন্ত্রের মুখে নবী ﷺ আবু বকর (রাঃ)-কে সঙ্গে নিয়ে মদিনায় হিজরত করেন। শত্রুরা পাশ দিয়ে গেলে তারা সাওর গুহায় আত্মগোপন করেন, অতঃপর যাত্রা সম্পন্ন করেন। হিজরত ইসলামি বর্ষপঞ্জির ১ম বছর।',
    lessonEn: '"Do not grieve, Allah is with us" — trust in Allah in the face of danger.',
    lessonBn: '"চিন্তা করো না, আল্লাহ আমাদের সাথে আছেন" — বিপদের মুখে আল্লাহর উপর ভরসা।',
    ayah: '9:40',
  },
  {
    id: 'mosque', era: 'medinan', yearCE: '622–623 CE', yearAH: '1 AH',
    placeEn: 'Medina', placeBn: 'মদিনা',
    titleEn: 'The Prophet’s Mosque, Brotherhood & Charter',
    titleBn: 'মসজিদে নববী, ভ্রাতৃত্ব ও সনদ',
    descEn: 'In Medina the Prophet ﷺ built his mosque, paired each migrant (Muhajir) with a helper (Ansari) in bonds of brotherhood, and established the Charter of Medina — a covenant ordering life among its communities.',
    descBn: 'মদিনায় নবী ﷺ তাঁর মসজিদ নির্মাণ করেন, প্রত্যেক মুহাজিরকে এক আনসারের সাথে ভ্রাতৃত্বের বন্ধনে বাঁধেন এবং মদিনা সনদ প্রতিষ্ঠা করেন — যা এর জনগোষ্ঠীগুলোর জীবনযাপনের চুক্তি।',
    lessonEn: 'A community is built on worship, brotherhood, and just agreements.',
    lessonBn: 'একটি সমাজ গড়ে ওঠে ইবাদত, ভ্রাতৃত্ব ও ন্যায্য চুক্তির উপর।',
  },
  {
    id: 'badr', era: 'medinan', yearCE: '624 CE', yearAH: '2 AH',
    placeEn: 'Badr', placeBn: 'বদর',
    titleEn: 'The Battle of Badr',
    titleBn: 'বদরের যুদ্ধ',
    descEn: 'The first major battle: about 313 Muslims faced a far larger Meccan army at Badr and, with Allah’s help, won a decisive victory. It established the Muslim community’s standing.',
    descBn: 'প্রথম বড় যুদ্ধ: প্রায় ৩১৩ জন মুসলিম বদরে বহুগুণ বড় মক্কার বাহিনীর মুখোমুখি হন এবং আল্লাহর সাহায্যে চূড়ান্ত বিজয় লাভ করেন। এটি মুসলিম সমাজের অবস্থান প্রতিষ্ঠা করে।',
    lessonEn: 'Victory comes from Allah — sincerity and reliance matter more than numbers.',
    lessonBn: 'বিজয় আসে আল্লাহর কাছ থেকে — সংখ্যার চেয়ে আন্তরিকতা ও ভরসা বড়।',
    ayah: '3:123',
  },
  {
    id: 'uhud', era: 'medinan', yearCE: '625 CE', yearAH: '3 AH',
    placeEn: 'Mount Uhud, Medina', placeBn: 'উহুদ পাহাড়, মদিনা',
    titleEn: 'The Battle of Uhud',
    titleBn: 'উহুদের যুদ্ধ',
    descEn: 'The Quraysh returned for revenge. The Muslims were winning until some archers left their post; the tide turned and many companions were martyred, including the Prophet’s uncle Hamzah (RA).',
    descBn: 'কুরাইশরা প্রতিশোধ নিতে ফিরে আসে। মুসলিমরা জয়ের পথে ছিলেন যতক্ষণ না কিছু তীরন্দাজ তাদের স্থান ছেড়ে যান; মোড় ঘুরে যায় এবং নবীর চাচা হামজা (রাঃ) সহ বহু সাহাবি শহীদ হন।',
    lessonEn: 'Discipline and obedience to leadership are essential; even setbacks carry lessons.',
    lessonBn: 'শৃঙ্খলা ও নেতৃত্বের আনুগত্য অপরিহার্য; পরাজয়েও রয়েছে শিক্ষা।',
  },
  {
    id: 'trench', era: 'medinan', yearCE: '627 CE', yearAH: '5 AH',
    placeEn: 'Medina', placeBn: 'মদিনা',
    titleEn: 'The Battle of the Trench (al-Khandaq)',
    titleBn: 'খন্দকের যুদ্ধ',
    descEn: 'A large alliance besieged Medina. On Salman al-Farsi’s (RA) advice, the Muslims dug a defensive trench. After weeks of siege, wind and division scattered the enemy without a major battle.',
    descBn: 'একটি বিশাল মিত্রজোট মদিনা অবরোধ করে। সালমান ফারসি (রাঃ)-এর পরামর্শে মুসলিমরা প্রতিরক্ষামূলক পরিখা খনন করেন। সপ্তাহব্যাপী অবরোধের পর ঝড় ও অন্তর্দ্বন্দ্ব বড় যুদ্ধ ছাড়াই শত্রুদের ছত্রভঙ্গ করে দেয়।',
    lessonEn: 'Consultation (shura) and planning, joined with reliance on Allah, bring relief.',
    lessonBn: 'পরামর্শ (শূরা) ও পরিকল্পনা, আল্লাহর উপর ভরসার সাথে মিলে, মুক্তি আনে।',
  },
  {
    id: 'hudaybiyyah', era: 'medinan', yearCE: '628 CE', yearAH: '6 AH',
    placeEn: 'Hudaybiyyah, near Mecca', placeBn: 'হুদায়বিয়া, মক্কার কাছে',
    titleEn: 'The Treaty of Hudaybiyyah',
    titleBn: 'হুদায়বিয়ার সন্ধি',
    descEn: 'Coming for pilgrimage, the Muslims were stopped at Hudaybiyyah and agreed to a ten-year truce with the Quraysh. Though its terms seemed unfavourable, the Quran called it a "clear victory."',
    descBn: 'উমরার উদ্দেশ্যে এসে মুসলিমরা হুদায়বিয়ায় বাধাপ্রাপ্ত হন এবং কুরাইশদের সাথে দশ বছরের সন্ধিতে সম্মত হন। শর্তগুলো প্রতিকূল মনে হলেও কুরআন একে "সুস্পষ্ট বিজয়" বলে অভিহিত করে।',
    lessonEn: 'Patience and peace can achieve more than immediate confrontation.',
    lessonBn: 'ধৈর্য ও শান্তি তাৎক্ষণিক সংঘাতের চেয়ে বেশি অর্জন করতে পারে।',
    ayah: '48:1',
  },
  {
    id: 'letters', era: 'medinan', yearCE: '628 CE', yearAH: '6–7 AH',
    placeEn: 'Medina', placeBn: 'মদিনা',
    titleEn: 'Letters to Kings & Rulers',
    titleBn: 'রাজা-বাদশাহদের কাছে পত্র',
    descEn: 'After the truce, the Prophet ﷺ sent letters inviting the rulers of his time — including Heraclius of Byzantium, the Negus, and others — to Islam, showing the message was for all peoples.',
    descBn: 'সন্ধির পর নবী ﷺ তৎকালীন শাসকদের — বাইজেন্টাইনের হিরাক্লিয়াস, নাজ্জাশি ও অন্যদের — কাছে ইসলামের দাওয়াতের পত্র পাঠান, যা প্রমাণ করে বার্তাটি সব জাতির জন্য।',
    lessonEn: 'The call of Islam is universal, addressed to all nations.',
    lessonBn: 'ইসলামের আহ্বান বিশ্বজনীন, সকল জাতির উদ্দেশ্যে।',
  },
  {
    id: 'khaybar', era: 'medinan', yearCE: '628 CE', yearAH: '7 AH',
    placeEn: 'Khaybar', placeBn: 'খায়বার',
    titleEn: 'Khaybar',
    titleBn: 'খায়বার',
    descEn: 'The Muslims secured the northern oasis of Khaybar, ending a source of hostility. It brought relief and stability, and the returning migrants from Abyssinia rejoined the community around this time.',
    descBn: 'মুসলিমরা উত্তরের মরুদ্যান খায়বারকে নিয়ন্ত্রণে আনেন, যা এক শত্রুতার উৎস দূর করে। এটি স্বস্তি ও স্থিতিশীলতা আনে, এবং এ সময়ই আবিসিনিয়া থেকে ফেরা মুহাজিররা সমাজে পুনরায় যোগ দেন।',
    lessonEn: 'Security and stability allowed the community to grow and consolidate.',
    lessonBn: 'নিরাপত্তা ও স্থিতিশীলতা সমাজকে বেড়ে ওঠা ও সংহত হওয়ার সুযোগ দেয়।',
  },

  // ── Later Medinan Period & Farewell ───────────────────────────────────
  {
    id: 'conquest', era: 'farewell', yearCE: '630 CE', yearAH: '8 AH',
    placeEn: 'Mecca', placeBn: 'মক্কা',
    titleEn: 'The Conquest of Mecca',
    titleBn: 'মক্কা বিজয়',
    descEn: 'After the truce was violated, the Prophet ﷺ entered Mecca almost without bloodshed. He forgave his former persecutors, cleared the Ka’bah of its idols, and restored it to the worship of Allah alone.',
    descBn: 'সন্ধি ভঙ্গ হওয়ার পর নবী ﷺ প্রায় রক্তপাতহীনভাবে মক্কায় প্রবেশ করেন। তিনি তাঁর সাবেক নির্যাতনকারীদের ক্ষমা করেন, কাবাকে মূর্তিমুক্ত করেন এবং একমাত্র আল্লাহর ইবাদতের জন্য তা পুনঃপ্রতিষ্ঠা করেন।',
    lessonEn: 'In the hour of triumph he chose mercy and forgiveness over revenge.',
    lessonBn: 'বিজয়ের মুহূর্তে তিনি প্রতিশোধের বদলে দয়া ও ক্ষমা বেছে নিয়েছেন।',
  },
  {
    id: 'hunayn', era: 'farewell', yearCE: '630 CE', yearAH: '8 AH',
    placeEn: 'Hunayn', placeBn: 'হুনাইন',
    titleEn: 'The Battle of Hunayn',
    titleBn: 'হুনাইনের যুদ্ধ',
    descEn: 'Soon after the conquest, a large Muslim army was ambushed at Hunayn and initially wavered. They regrouped around the Prophet ﷺ and won — a reminder that numbers alone do not secure victory.',
    descBn: 'বিজয়ের অল্প পরেই এক বিশাল মুসলিম বাহিনী হুনাইনে আকস্মিক আক্রমণের শিকার হয়ে প্রথমে টলে যায়। তারা নবী ﷺ-এর চারপাশে পুনরায় সংগঠিত হয়ে জয়লাভ করেন — এক স্মারক যে কেবল সংখ্যা বিজয় নিশ্চিত করে না।',
    lessonEn: 'Pride in numbers is misplaced; help and victory are from Allah alone.',
    lessonBn: 'সংখ্যায় গর্ব অস্থানে; সাহায্য ও বিজয় কেবল আল্লাহর কাছ থেকে।',
    ayah: '9:25',
  },
  {
    id: 'tabuk', era: 'farewell', yearCE: '631 CE', yearAH: '9 AH',
    placeEn: 'Tabuk', placeBn: 'তাবুক',
    titleEn: 'The Expedition of Tabuk',
    titleBn: 'তাবুক অভিযান',
    descEn: 'In great heat and hardship the Prophet ﷺ led an expedition north to Tabuk. No battle occurred, but the campaign showed the strength and readiness of the Muslim community; 9 AH is also called the "Year of Delegations."',
    descBn: 'প্রচণ্ড গরম ও কষ্টের মধ্যে নবী ﷺ উত্তরে তাবুকের দিকে অভিযান পরিচালনা করেন। কোনো যুদ্ধ হয়নি, তবে অভিযানটি মুসলিম সমাজের শক্তি ও প্রস্তুতি দেখায়; ৯ হিজরিকে "প্রতিনিধি দলের বছর"ও বলা হয়।',
    lessonEn: 'Answering the call in hardship proves the sincerity of faith.',
    lessonBn: 'কষ্টের সময়ে আহ্বানে সাড়া দেওয়া ঈমানের আন্তরিকতা প্রমাণ করে।',
  },
  {
    id: 'farewell', era: 'farewell', yearCE: '632 CE', yearAH: '10 AH',
    placeEn: 'Arafat, near Mecca', placeBn: 'আরাফাত, মক্কার কাছে',
    titleEn: 'The Farewell Pilgrimage & Sermon',
    titleBn: 'বিদায় হজ ও বিদায় ভাষণ',
    descEn: 'On his only Hajj, the Prophet ﷺ delivered the Farewell Sermon at Arafat before a great gathering, affirming the sanctity of life and property, the rights of women, and the brotherhood of all believers.',
    descBn: 'তাঁর একমাত্র হজে নবী ﷺ আরাফাতে বিশাল সমাবেশের সামনে বিদায় ভাষণ দেন, যেখানে জীবন ও সম্পদের পবিত্রতা, নারীর অধিকার এবং সকল মুমিনের ভ্রাতৃত্ব নিশ্চিত করেন।',
    lessonEn: 'His final counsel: hold to the Quran, and treat one another with justice and mercy.',
    lessonBn: 'তাঁর শেষ উপদেশ: কুরআন আঁকড়ে ধরো, এবং একে অপরের সাথে ন্যায় ও দয়ায় আচরণ করো।',
    ayah: '5:3',
  },
  {
    id: 'passing', era: 'farewell', yearCE: '632 CE', yearAH: '11 AH',
    placeEn: 'Medina', placeBn: 'মদিনা',
    titleEn: 'The Passing of the Prophet ﷺ',
    titleBn: 'নবী ﷺ-এর ইন্তেকাল',
    descEn: 'A few months after the Farewell Pilgrimage, the Prophet ﷺ fell ill and passed away in Medina, in the room of ’Aishah (RA). He left behind the Quran and his Sunnah as guidance for all who follow.',
    descBn: 'বিদায় হজের কয়েক মাস পর নবী ﷺ অসুস্থ হয়ে মদিনায়, আয়েশা (রাঃ)-এর কক্ষে ইন্তেকাল করেন। তিনি রেখে যান কুরআন ও তাঁর সুন্নাহ, যা সকল অনুসারীর জন্য পথনির্দেশ।',
    lessonEn: 'His mission complete, he left a lasting guidance: the Book of Allah and his example.',
    lessonBn: 'তাঁর দায়িত্ব সম্পন্ন করে তিনি রেখে গেছেন চিরস্থায়ী পথনির্দেশ: আল্লাহর কিতাব ও তাঁর আদর্শ।',
  },
];

/**
 * Per-era colour + ABSTRACT inline SVG icon (geometric only — no human/animal
 * figures). Icons use currentColor and inherit the era colour class, so they are
 * theme-aware on both light and dark backgrounds.
 */
const ERA_META = {
  before: {
    dot: 'bg-amber-500', text: 'text-amber-500',
    icon: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M15.6 3.4A8.5 8.5 0 1 0 20.3 18 6.6 6.6 0 1 1 15.6 3.4Z" fill="currentColor"/></svg>',
  },
  meccan: {
    dot: 'bg-rose-500', text: 'text-rose-500',
    icon: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M2 21 L9 7 L13 14 L16 9 L22 21 Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M9.5 21 v-3 a2.5 2.5 0 0 1 5 0 v3" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>',
  },
  medinan: {
    dot: 'bg-emerald-500', text: 'text-emerald-500',
    icon: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M4 21 V12 a8 8 0 0 1 16 0 V21" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><line x1="2.5" y1="21" x2="21.5" y2="21" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><line x1="21.5" y1="21" x2="21.5" y2="9" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/><circle cx="12" cy="4.5" r="1" fill="currentColor"/></svg>',
  },
  farewell: {
    dot: 'bg-indigo-500', text: 'text-indigo-500',
    icon: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M5 7 L12 3 L19 7" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><rect x="5" y="7" width="14" height="13" rx="1" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="5" y="10.5" width="14" height="2" fill="currentColor"/></svg>',
  },
};

// Abstract shield-with-cross motif for battle events (no human/animal figures).
const SEERAH_BATTLE_ICON = '<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path d="M12 2 L20 5 V11 C20 16 12 22 12 22 C12 22 4 16 4 11 V5 Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M9 9 L15 15 M15 9 L9 15" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>';

/**
 * Optional battlefield data keyed by event id. Mainstream Sunni figures
 * (ar-Raheeq al-Makhtum / Ibn Hisham / Ibn Ishaq). Numbers are kept
 * language-neutral (Western digits). Non-battle events simply have no entry.
 */
const SEERAH_BATTLES = {
  badr: {
    muslims: '~313', opp: '~1,000',
    oppEn: 'Quraysh of Mecca', oppBn: 'মক্কার কুরাইশ',
    cmdMEn: 'Prophet Muhammad ﷺ', cmdMBn: 'নবী মুহাম্মদ ﷺ',
    cmdOEn: 'Abu Jahl, ‘Utbah ibn Rabi‘ah', cmdOBn: 'আবু জাহল, উতবা ইবনে রাবিয়া',
    outEn: 'Decisive Muslim victory', outBn: 'মুসলিমদের চূড়ান্ত বিজয়',
    casEn: '~14 Muslims martyred; ~70 Quraysh killed, ~70 captured', casBn: '~14 মুসলিম শহীদ; ~70 কুরাইশ নিহত, ~70 বন্দি',
    geoEn: 'Wells of Badr, on the caravan route southwest of Medina', geoBn: 'মদিনার দক্ষিণ-পশ্চিমে কাফেলা পথের বদরের কূপ',
    momEn: ['The Muslims reached the wells first and controlled the water', 'The armies met on 17 Ramadan, 2 AH', 'Quraysh leaders including Abu Jahl were killed and the Muslims prevailed'],
    momBn: ['মুসলিমরা আগে কূপে পৌঁছে পানির নিয়ন্ত্রণ নেন', '২ হিজরির ১৭ রমজান দুই বাহিনী মুখোমুখি হয়', 'আবু জাহলসহ কুরাইশ নেতারা নিহত হন এবং মুসলিমরা জয়ী হন'],
    verses: ['3:123', '8:9', '8:17'],
    diagram: { terrain: 'wells', leftEn: 'Muslims', leftBn: 'মুসলিম', rightEn: 'Quraysh', rightBn: 'কুরাইশ', featureEn: 'Wells', featureBn: 'কূপ',
      captionEn: 'Abstract layout: Muslims secured the wells; arrows show the clash. Not to scale.', captionBn: 'বিমূর্ত বিন্যাস: মুসলিমরা কূপ নিয়ন্ত্রণে নেন; তীর সংঘর্ষ দেখায়। মাপানুযায়ী নয়।' },
  },
  uhud: {
    muslims: '~700', opp: '~3,000',
    oppEn: 'Quraysh of Mecca', oppBn: 'মক্কার কুরাইশ',
    cmdMEn: 'Prophet Muhammad ﷺ; archers led by ‘Abdullah ibn Jubayr (RA)', cmdMBn: 'নবী মুহাম্মদ ﷺ; তীরন্দাজদের নেতা আবদুল্লাহ ইবনে জুবায়ের (রাঃ)',
    cmdOEn: 'Abu Sufyan; cavalry under Khalid ibn al-Walid', cmdOBn: 'আবু সুফিয়ান; অশ্বারোহী নেতৃত্বে খালিদ ইবনুল ওয়ালিদ',
    outEn: 'Costly setback for the Muslims (inconclusive)', outBn: 'মুসলিমদের জন্য ব্যয়বহুল বিপর্যয় (অমীমাংসিত)',
    casEn: '~70 Muslims martyred, including Hamzah (RA)', casBn: '~70 মুসলিম শহীদ, হামজা (রাঃ) সহ',
    geoEn: 'Slopes of Mount Uhud, north of Medina', geoBn: 'মদিনার উত্তরে উহুদ পাহাড়ের ঢাল',
    momEn: ['The Muslims gained the upper hand early in the fighting', 'Some archers left their assigned hill to gather spoils', 'Khalid’s cavalry attacked from the rear and turned the battle', 'A false rumour spread that the Prophet ﷺ had been killed'],
    momBn: ['যুদ্ধের শুরুতে মুসলিমরা অগ্রগামী ছিলেন', 'কিছু তীরন্দাজ গনিমতের জন্য নির্ধারিত টিলা ছেড়ে যান', 'খালিদের অশ্বারোহী পেছন থেকে আক্রমণ করে যুদ্ধের মোড় ঘুরিয়ে দেয়', 'নবী ﷺ নিহত হয়েছেন বলে মিথ্যা গুজব ছড়ায়'],
    verses: ['3:139', '3:152', '3:153'],
    diagram: { terrain: 'hill', leftEn: 'Muslims', leftBn: 'মুসলিম', rightEn: 'Quraysh', rightBn: 'কুরাইশ', featureEn: 'Archers’ hill', featureBn: 'তীরন্দাজ টিলা',
      captionEn: 'Abstract layout: the archers’ hill and the rear cavalry flank (red). Not to scale.', captionBn: 'বিমূর্ত বিন্যাস: তীরন্দাজ টিলা ও পেছনের অশ্বারোহী আক্রমণ (লাল)। মাপানুযায়ী নয়।' },
  },
  trench: {
    muslims: '~3,000', opp: '~10,000',
    oppEn: 'Confederate tribes (al-Ahzab)', oppBn: 'সম্মিলিত গোত্রজোট (আহযাব)',
    cmdMEn: 'Prophet Muhammad ﷺ', cmdMBn: 'নবী মুহাম্মদ ﷺ',
    cmdOEn: 'Abu Sufyan (Quraysh, Ghatafan & allies)', cmdOBn: 'আবু সুফিয়ান (কুরাইশ, গাতফান ও মিত্ররা)',
    outEn: 'Siege failed; strategic Muslim victory', outBn: 'অবরোধ ব্যর্থ; মুসলিমদের কৌশলগত বিজয়',
    casEn: 'Few on both sides', casBn: 'উভয় পক্ষে অল্প হতাহত',
    geoEn: 'The exposed northern approach to Medina, where a trench was dug', geoBn: 'মদিনার উন্মুক্ত উত্তর দিক, যেখানে পরিখা খনন করা হয়',
    momEn: ['Salman al-Farsi (RA) advised digging a trench on the exposed side', 'The trench blocked the confederate cavalry for weeks', 'A cold wind and disunity broke the siege without a major battle'],
    momBn: ['সালমান ফারসি (রাঃ) উন্মুক্ত দিকে পরিখা খননের পরামর্শ দেন', 'পরিখা সপ্তাহ ধরে জোটের অশ্বারোহীদের আটকে রাখে', 'শীতল ঝড় ও অনৈক্য বড় যুদ্ধ ছাড়াই অবরোধ ভেঙে দেয়'],
    verses: ['33:9', '33:22', '33:25'],
    diagram: { terrain: 'trench', leftEn: 'Muslims', leftBn: 'মুসলিম', rightEn: 'Confederates', rightBn: 'জোট', featureEn: 'Trench', featureBn: 'পরিখা',
      captionEn: 'Abstract layout: the trench held off the confederate advance (red). Not to scale.', captionBn: 'বিমূর্ত বিন্যাস: পরিখা জোটবাহিনীর অগ্রযাত্রা (লাল) রুখে দেয়। মাপানুযায়ী নয়।' },
  },
  khaybar: {
    muslims: '~1,400', opp: '',
    oppEn: 'Defenders of the Khaybar fortresses', oppBn: 'খায়বার দুর্গের রক্ষীরা',
    cmdMEn: 'Prophet Muhammad ﷺ; the banner given to ‘Ali ibn Abi Talib (RA)', cmdMBn: 'নবী মুহাম্মদ ﷺ; পতাকা দেওয়া হয় আলী ইবনে আবি তালিব (রাঃ)-কে',
    cmdOEn: 'Chiefs of the Khaybar strongholds', cmdOBn: 'খায়বার দুর্গগুলোর নেতারা',
    outEn: 'Muslim victory; forts taken, then a land-share treaty', outBn: 'মুসলিম বিজয়; দুর্গ দখল, অতঃপর ভূমি-ভাগ চুক্তি',
    casEn: 'Modest on both sides', casBn: 'উভয় পক্ষে সীমিত হতাহত',
    geoEn: 'A fortified oasis about 150 km north of Medina', geoBn: 'মদিনার প্রায় 150 কিমি উত্তরে সুরক্ষিত মরূদ্যান',
    momEn: ['The strongholds were taken one after another', '‘Ali (RA) carried the banner and opened the fort of al-Qamus', 'A treaty let the inhabitants stay as cultivators for a share of the produce'],
    momBn: ['দুর্গগুলো একের পর এক দখল হয়', 'আলী (রাঃ) পতাকা বহন করে আল-কামুস দুর্গ জয় করেন', 'চুক্তিতে বাসিন্দারা উৎপাদনের অংশের বিনিময়ে চাষি হিসেবে থেকে যান'],
    verses: ['48:15', '48:18', '48:19'],
    diagram: { terrain: 'fortress', leftEn: 'Muslims', leftBn: 'মুসলিম', rightEn: 'Forts', rightBn: 'দুর্গ', featureEn: 'Fortresses', featureBn: 'দুর্গ',
      captionEn: 'Abstract layout: fortress blocks taken in sequence (arrows). Not to scale.', captionBn: 'বিমূর্ত বিন্যাস: ধারাবাহিকভাবে দখল হওয়া দুর্গ (তীর)। মাপানুযায়ী নয়।' },
  },
  conquest: {
    muslims: '~10,000', opp: '',
    oppEn: 'Quraysh of Mecca (largely surrendered)', oppBn: 'মক্কার কুরাইশ (অধিকাংশ আত্মসমর্পণ করে)',
    cmdMEn: 'Prophet Muhammad ﷺ, leading four columns', cmdMBn: 'নবী মুহাম্মদ ﷺ, চারটি বাহিনীর নেতৃত্বে',
    cmdOEn: 'Quraysh leadership', cmdOBn: 'কুরাইশ নেতৃত্ব',
    outEn: 'Near-bloodless conquest; general amnesty', outBn: 'প্রায় রক্তপাতহীন বিজয়; সাধারণ ক্ষমা',
    casEn: 'Very few', casBn: 'অতি অল্প হতাহত',
    geoEn: 'The city of Mecca, entered from four directions', geoBn: 'চারদিক থেকে প্রবেশ করা মক্কা নগরী',
    momEn: ['The army entered Mecca in four divisions, ordered to avoid fighting', 'A general amnesty was declared for the people of Mecca', 'The idols were removed from the Ka‘bah and it was restored to Allah’s worship'],
    momBn: ['যুদ্ধ এড়ানোর নির্দেশসহ বাহিনী চার ভাগে মক্কায় প্রবেশ করে', 'মক্কাবাসীর জন্য সাধারণ ক্ষমা ঘোষণা করা হয়', 'কাবা থেকে মূর্তি অপসারণ করে তা আল্লাহর ইবাদতের জন্য পুনঃপ্রতিষ্ঠিত হয়'],
    verses: ['110:1', '110:2', '17:81'],
    diagram: { terrain: 'city', leftEn: 'Muslims', leftBn: 'মুসলিম', rightEn: 'Makkah', rightBn: 'মক্কা', featureEn: 'Ka‘bah', featureBn: 'কাবা',
      captionEn: 'Abstract layout: four columns entering toward the Ka‘bah (centre). Not to scale.', captionBn: 'বিমূর্ত বিন্যাস: চার বাহিনী কাবার দিকে (কেন্দ্র) প্রবেশ করছে। মাপানুযায়ী নয়।' },
  },
  hunayn: {
    muslims: '~12,000', opp: '',
    oppEn: 'Hawazin & Thaqif tribes', oppBn: 'হাওয়াজিন ও সাকিফ গোত্র',
    cmdMEn: 'Prophet Muhammad ﷺ', cmdMBn: 'নবী মুহাম্মদ ﷺ',
    cmdOEn: 'Malik ibn ‘Awf al-Nasri', cmdOBn: 'মালিক ইবনে আওফ আন-নাসরি',
    outEn: 'Decisive Muslim victory after an initial ambush', outBn: 'প্রাথমিক আকস্মিক আক্রমণের পর মুসলিমদের চূড়ান্ত বিজয়',
    casEn: '', casBn: '',
    geoEn: 'A narrow valley between Mecca and Ta’if', geoBn: 'মক্কা ও তায়েফের মাঝে এক সংকীর্ণ উপত্যকা',
    momEn: ['Hidden archers ambushed the Muslims as they entered the valley', 'The large army was thrown into confusion and many fell back', 'The Prophet ﷺ stood firm and rallied the believers, and victory followed'],
    momBn: ['উপত্যকায় প্রবেশের সময় লুকানো তীরন্দাজরা মুসলিমদের ওপর আকস্মিক আক্রমণ করে', 'বিশাল বাহিনী বিশৃঙ্খল হয়ে অনেকে পিছু হটে', 'নবী ﷺ অবিচল থেকে বিশ্বাসীদের পুনরায় সংগঠিত করেন এবং বিজয় আসে'],
    verses: ['9:25', '9:26'],
    diagram: { terrain: 'valley', leftEn: 'Muslims', leftBn: 'মুসলিম', rightEn: 'Hawazin', rightBn: 'হাওয়াজিন', featureEn: 'Ambush', featureBn: 'অতর্কিত হামলা',
      captionEn: 'Abstract layout: ambush arrows (red) descending on the column in the pass. Not to scale.', captionBn: 'বিমূর্ত বিন্যাস: গিরিপথে বাহিনীর ওপর নেমে আসা অতর্কিত তীর (লাল)। মাপানুযায়ী নয়।' },
  },
  tabuk: {
    muslims: '~30,000', opp: '',
    oppEn: 'Byzantine frontier forces (did not engage)', oppBn: 'বাইজেন্টাইন সীমান্ত বাহিনী (মুখোমুখি হয়নি)',
    cmdMEn: 'Prophet Muhammad ﷺ', cmdMBn: 'নবী মুহাম্মদ ﷺ',
    cmdOEn: '—', cmdOBn: '—',
    outEn: 'No battle; a show of strength and northern treaties', outBn: 'কোনো যুদ্ধ নয়; শক্তি প্রদর্শন ও উত্তরের চুক্তি',
    casEn: 'None in battle', casBn: 'যুদ্ধে কোনো হতাহত নয়',
    geoEn: 'Tabuk, far north toward the Byzantine Syrian frontier', geoBn: 'তাবুক, বাইজেন্টাইন সিরীয় সীমান্তের দিকে সুদূর উত্তরে',
    momEn: ['The march took place in intense heat and scarcity — the “Army of Hardship”', 'The expected Byzantine force did not appear, so no battle occurred', 'Treaties were made with several northern towns before the return'],
    momBn: ['প্রচণ্ড গরম ও অভাবের মধ্যে অভিযান হয় — “কষ্টের বাহিনী” (জায়শুল উসরা)', 'প্রত্যাশিত বাইজেন্টাইন বাহিনী আসেনি, তাই কোনো যুদ্ধ হয়নি', 'ফেরার আগে উত্তরের কয়েকটি জনপদের সাথে চুক্তি হয়'],
    verses: ['9:41', '9:117'],
    diagram: { terrain: 'expedition', leftEn: 'Muslims', leftBn: 'মুসলিম', rightEn: 'Byzantines (absent)', rightBn: 'বাইজেন্টাইন (অনুপস্থিত)', featureEn: 'Tabuk', featureBn: 'তাবুক',
      captionEn: 'Abstract layout: a long northward march (green); the opposing force did not appear (dashed). Not to scale.', captionBn: 'বিমূর্ত বিন্যাস: উত্তরমুখী দীর্ঘ অভিযান (সবুজ); প্রতিপক্ষ আসেনি (ড্যাশ)। মাপানুযায়ী নয়।' },
  },
};

// Abstract/geometric view-toggle icons (no figures): a timeline spine, and an
// interlaced 8-point star (classic Islamic geometry) for the Topics view.
const SEERAH_TIMELINE_ICON = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><line x1="6" y1="3" x2="6" y2="21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="6" cy="7" r="2" fill="currentColor"/><circle cx="6" cy="16" r="2" fill="currentColor"/><line x1="10" y1="7" x2="19" y2="7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><line x1="10" y1="16" x2="17" y2="16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>';
const SEERAH_TOPICS_ICON = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><rect x="6" y="6" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.4"/><rect x="6" y="6" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.4" transform="rotate(45 12 12)"/></svg>';
const SEERAH_QUIZ_ICON = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="3" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 12.5 L11 15.5 L16.5 9" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
// Abstract location-pin accent for the places gazetteer (geometric only).
const SEERAH_PIN_ICON = '<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path d="M12 2 a7 7 0 0 1 7 7 c0 5 -7 13 -7 13 s-7 -8 -7 -13 a7 7 0 0 1 7 -7 Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><circle cx="12" cy="9" r="2.4" fill="currentColor"/></svg>';
// Abstract open-book / flowing-lines motif for Story mode (geometric only — no figures).
const SEERAH_STORY_ICON = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M12 5 C9 3 5 3 3 4 V19 C5 18 9 18 12 20 C15 18 19 18 21 19 V4 C19 3 15 3 12 5 Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><line x1="12" y1="5" x2="12" y2="20" stroke="currentColor" stroke-width="1.2"/></svg>';

/**
 * MAJOR TOPICS — browsable thematic cards (bilingual, tap-to-expand). Content is
 * drawn from mainstream Sunni sources; only well-established points are used and
 * no images of the Prophet ﷺ, companions, or any figures are made (per the
 * aniconic tradition). Emoji are decorative labels, not depictions. Each topic
 * carries verified Quran refs shown as tappable pills.
 */
const SEERAH_TOPICS = [
  {
    id: 'tp_akhlaq', emoji: '🌟',
    titleEn: 'Noble Character & Manners (Akhlaq)',
    titleBn: 'মহৎ চরিত্র ও আচরণ (আখলাক)',
    summaryEn: 'Even before prophethood the Prophet ﷺ was called al-Amin, "the trustworthy," for his honesty and truthfulness. The Quran describes him as being upon "an exalted standard of character," and he was gentle, merciful, and humble with all people.',
    summaryBn: 'নবুয়তের আগেও নবী ﷺ সততা ও সত্যবাদিতার জন্য "আল-আমিন" (বিশ্বস্ত) নামে পরিচিত ছিলেন। কুরআন তাঁকে "মহান চরিত্রের অধিকারী" বলে বর্ণনা করেছে; তিনি ছিলেন সকলের প্রতি কোমল, দয়ালু ও বিনয়ী।',
    pointsEn: ['Trusted even by his opponents, who left valuables in his keeping', 'Gentle and forgiving — he pardoned the people of Mecca at its conquest', 'Humble in daily life: he helped his family and served others'],
    pointsBn: ['শত্রুরাও তাঁকে বিশ্বাস করত ও মূল্যবান জিনিস তাঁর কাছে গচ্ছিত রাখত', 'কোমল ও ক্ষমাশীল — মক্কা বিজয়ের দিন তিনি মক্কাবাসীকে ক্ষমা করেন', 'দৈনন্দিন জীবনে বিনয়ী: তিনি পরিবারকে সাহায্য করতেন ও অন্যদের সেবা করতেন'],
    verses: ['68:4', '3:159', '33:21'],
  },
  {
    id: 'tp_appearance', emoji: '📜',
    titleEn: 'Physical Description & Appearance',
    titleBn: 'দৈহিক বর্ণনা ও অবয়ব',
    summaryEn: 'Authentic narrations from companions such as Anas and Ali (RA) describe the Prophet ﷺ as of medium height and balanced build, with a radiant, luminous face, dark eyes, and hair reaching between his earlobes and shoulders. Out of reverence, Muslims describe him in words only and make no images of him.',
    summaryBn: 'আনাস ও আলী (রাঃ)-এর মতো সাহাবিদের সহিহ বর্ণনায় নবী ﷺ-কে মাঝারি উচ্চতা ও সুষম গড়নের, উজ্জ্বল দীপ্তিময় চেহারা, কালো চোখ এবং কান ও কাঁধের মাঝামাঝি পর্যন্ত পৌঁছানো চুলের অধিকারী বলে বর্ণনা করা হয়েছে। শ্রদ্ধাবশত মুসলিমরা তাঁকে কেবল ভাষায় বর্ণনা করেন, কোনো ছবি আঁকেন না।',
    pointsEn: ['Neither very tall nor short; of a balanced, dignified build', 'A bright, radiant face and a welcoming presence', 'The "seal of prophethood" was between his shoulders', 'Muslims honour him without any image or portrait'],
    pointsBn: ['খুব লম্বাও নন, বেঁটেও নন; সুষম ও মর্যাদাপূর্ণ গড়ন', 'উজ্জ্বল দীপ্তিময় চেহারা ও প্রীতিকর উপস্থিতি', '"নবুয়তের মোহর" ছিল তাঁর দুই কাঁধের মাঝে', 'মুসলিমরা কোনো ছবি বা প্রতিকৃতি ছাড়াই তাঁকে সম্মান করেন'],
    verses: ['33:45', '48:29'],
  },
  {
    id: 'tp_family', emoji: '🏡',
    titleEn: 'His Family — Khadijah (RA), the Mothers of the Believers & His Children',
    titleBn: 'তাঁর পরিবার — খাদিজা (রাঃ), উম্মাহাতুল মুমিনিন ও সন্তানগণ',
    summaryEn: 'The Prophet ﷺ was married to Khadijah (RA) alone for about 25 years, and she was the mother of most of his children. After her death he married several wives — the "Mothers of the Believers" (Ummahat al-Mu’minin), including Aishah, Hafsah, Umm Salamah and Zaynab (RA) — many of these marriages building ties or giving care and support. His daughter Fatimah (RA) is among the most honoured women in Islam.',
    summaryBn: 'নবী ﷺ প্রায় ২৫ বছর কেবল খাদিজা (রাঃ)-এর সাথে দাম্পত্যে ছিলেন, এবং তিনিই তাঁর অধিকাংশ সন্তানের মা। তাঁর মৃত্যুর পর তিনি একাধিক স্ত্রী গ্রহণ করেন — "উম্মাহাতুল মুমিনিন" (মুমিনদের মাতাগণ), যাদের মধ্যে আয়েশা, হাফসা, উম্মে সালামা ও যয়নব (রাঃ) রয়েছেন — এসব বিবাহের অনেকগুলো ছিল সম্পর্ক গড়া বা আশ্রয়-সহায়তা দানের জন্য। তাঁর কন্যা ফাতিমা (রাঃ) ইসলামে সর্বাধিক সম্মানিত নারীদের একজন।',
    pointsEn: ['Khadijah (RA): his first wife and first supporter of the message', 'The Mothers of the Believers (RA) taught the community much of the Sunnah', 'His children included Fatimah, Zaynab, Ruqayyah and Umm Kulthum (RA); his sons died young'],
    pointsBn: ['খাদিজা (রাঃ): তাঁর প্রথম স্ত্রী ও বার্তার প্রথম সহায়', 'উম্মাহাতুল মুমিনিন (রাঃ) সমাজকে সুন্নাহর অনেক কিছু শিখিয়েছেন', 'তাঁর সন্তানদের মধ্যে ছিলেন ফাতিমা, যয়নব, রুকাইয়া ও উম্মে কুলসুম (রাঃ); পুত্ররা অল্প বয়সে মারা যান'],
    verses: ['33:6', '33:32'],
  },
  {
    id: 'tp_companions', emoji: '🤝',
    titleEn: 'The Major Companions (Sahaba)',
    titleBn: 'প্রধান সাহাবিগণ',
    summaryEn: 'The Companions (Sahaba, RA) believed in the Prophet ﷺ and carried his message forward. Foremost are the four Rightly-Guided Caliphs: Abu Bakr, Umar, Uthman and Ali (RA). Along with six others they are traditionally counted among the ten given glad tidings of Paradise, and countless companions — such as Bilal (RA) — served Islam devotedly.',
    summaryBn: 'সাহাবিগণ (রাঃ) নবী ﷺ-এর প্রতি ঈমান আনেন ও তাঁর বার্তা এগিয়ে নেন। সবার অগ্রে চার খুলাফায়ে রাশিদিন: আবু বকর, উমর, উসমান ও আলী (রাঃ)। আরও ছয়জনসহ তাঁরা ঐতিহ্যগতভাবে জান্নাতের সুসংবাদপ্রাপ্ত দশজনের অন্তর্ভুক্ত, এবং বিলাল (রাঃ)-এর মতো অগণিত সাহাবি নিষ্ঠার সাথে ইসলামের সেবা করেছেন।',
    pointsEn: ['Abu Bakr (RA): closest friend, companion of the Hijra, and first caliph', 'Umar (RA): known for justice; the community expanded greatly in his time', 'Uthman (RA): generous, and the Quran was compiled into one standard text in his caliphate', 'Ali (RA): the Prophet’s cousin, noted for knowledge and courage'],
    pointsBn: ['আবু বকর (রাঃ): ঘনিষ্ঠতম বন্ধু, হিজরতের সঙ্গী ও প্রথম খলিফা', 'উমর (রাঃ): ন্যায়বিচারের জন্য প্রসিদ্ধ; তাঁর সময়ে ইসলাম বহুদূর বিস্তৃত হয়', 'উসমান (রাঃ): দানশীল; তাঁর খিলাফতে কুরআন এক আদর্শ গ্রন্থে সংকলিত হয়', 'আলী (রাঃ): নবীর চাচাতো ভাই, জ্ঞান ও সাহসের জন্য খ্যাত'],
    verses: ['9:100', '48:29', '9:40'],
  },
  {
    id: 'tp_worship', emoji: '🕌',
    titleEn: 'His Worship & Daily Life',
    titleBn: 'তাঁর ইবাদত ও দৈনন্দিন জীবন',
    summaryEn: 'Though he was forgiven, the Prophet ﷺ worshipped intensely out of gratitude — standing long in night prayer, fasting often, and remembering Allah constantly. In daily life he was generous "like the blowing wind," simple in his needs, and served his own household.',
    summaryBn: 'ক্ষমাপ্রাপ্ত হওয়া সত্ত্বেও নবী ﷺ কৃতজ্ঞতাবশত তীব্রভাবে ইবাদত করতেন — রাতে দীর্ঘক্ষণ সালাতে দাঁড়াতেন, প্রায়ই রোজা রাখতেন এবং সদা আল্লাহর স্মরণে থাকতেন। দৈনন্দিন জীবনে তিনি ছিলেন "প্রবহমান বাতাসের মতো" দানশীল, চাহিদায় সরল, এবং নিজের ঘরের কাজ নিজেই করতেন।',
    pointsEn: ['He stood in night prayer (tahajjud) at length', 'He fasted frequently and encouraged moderation and gratitude', 'He was exceedingly generous, especially in Ramadan', 'He lived simply and helped with household chores'],
    pointsBn: ['তিনি দীর্ঘ সময় রাতের সালাত (তাহাজ্জুদ) আদায় করতেন', 'তিনি প্রায়ই রোজা রাখতেন এবং পরিমিতি ও কৃতজ্ঞতার উৎসাহ দিতেন', 'তিনি ছিলেন অত্যন্ত দানশীল, বিশেষত রমজানে', 'তিনি সরল জীবনযাপন করতেন ও ঘরের কাজে সাহায্য করতেন'],
    verses: ['73:1', '73:2', '17:79'],
  },
  {
    id: 'tp_miracles', emoji: '✨',
    titleEn: 'Signs & Miracles',
    titleBn: 'নিদর্শন ও মুজিজা',
    summaryEn: 'The greatest and lasting miracle of the Prophet ﷺ is the Quran — a revelation whose eloquence and guidance no one has matched, preserved unchanged to this day. Other authentically-reported signs include the splitting of the moon and occasions when water increased from between his fingers.',
    summaryBn: 'নবী ﷺ-এর সর্বশ্রেষ্ঠ ও চিরস্থায়ী মুজিজা হলো কুরআন — এমন এক ওহি যার ভাষাশৈলী ও হেদায়েতের সমতুল্য কেউ আনতে পারেনি এবং যা আজ পর্যন্ত অপরিবর্তিত রয়েছে। সহিহভাবে বর্ণিত অন্যান্য নিদর্শনের মধ্যে রয়েছে চন্দ্র বিদীর্ণ হওয়া এবং তাঁর আঙুলের মাঝ থেকে পানি বৃদ্ধি পাওয়ার ঘটনা।',
    pointsEn: ['The Quran is the greatest miracle — an open, lasting challenge to all people', 'The splitting of the moon is mentioned in the Quran (54:1)', 'Muslims focus on well-established signs and avoid weak or invented reports'],
    pointsBn: ['কুরআনই সর্বশ্রেষ্ঠ মুজিজা — সকল মানুষের জন্য এক উন্মুক্ত, চিরস্থায়ী চ্যালেঞ্জ', 'চন্দ্র বিদীর্ণ হওয়ার কথা কুরআনে উল্লেখ আছে (৫৪:১)', 'মুসলিমরা সুপ্রতিষ্ঠিত নিদর্শনে মনোযোগ দেন, দুর্বল বা বানানো বর্ণনা এড়িয়ে চলেন'],
    verses: ['54:1', '17:88', '2:23'],
  },
  {
    id: 'tp_mercy', emoji: '💚',
    titleEn: 'A Mercy to All',
    titleBn: 'সকলের জন্য রহমত',
    summaryEn: 'Allah describes the Prophet ﷺ as "a mercy to the worlds." He was tender with children, kind to the poor and the weak, gentle even with animals, and forgiving toward those who had wronged him — most famously when he pardoned the people of Mecca.',
    summaryBn: 'আল্লাহ নবী ﷺ-কে "বিশ্বজগতের জন্য রহমত" বলে বর্ণনা করেছেন। তিনি শিশুদের প্রতি স্নেহশীল, দরিদ্র ও দুর্বলদের প্রতি দয়ালু, এমনকি প্রাণীর প্রতিও কোমল, এবং তাঁর প্রতি অন্যায়কারীদের প্রতিও ক্ষমাশীল ছিলেন — সবচেয়ে বিখ্যাতভাবে মক্কাবাসীকে ক্ষমা করার মাধ্যমে।',
    pointsEn: ['Tender to children and the young', 'Kind to the poor, the weak and the traveller', 'Forgave enemies — and prayed for the guidance of the people of Ta’if'],
    pointsBn: ['শিশু ও তরুণদের প্রতি স্নেহশীল', 'দরিদ্র, দুর্বল ও মুসাফিরের প্রতি দয়ালু', 'শত্রুদের ক্ষমা করেছেন — এবং তায়েফবাসীর হেদায়েতের জন্য দোয়া করেছেন'],
    verses: ['21:107', '9:128', '3:159'],
  },
  {
    id: 'tp_sermon', emoji: '📢',
    titleEn: 'The Farewell Sermon',
    titleBn: 'বিদায় হজের ভাষণ',
    summaryEn: 'During his only Hajj in 10 AH, the Prophet ﷺ addressed a great gathering at Arafat. He affirmed the sanctity of life, property and honour, abolished the interest (riba) of the pre-Islamic age, urged the good treatment of women, and declared the equality of all people — the noblest being the most God-conscious.',
    summaryBn: '১০ হিজরিতে তাঁর একমাত্র হজের সময় নবী ﷺ আরাফাতে এক বিশাল সমাবেশে ভাষণ দেন। তিনি জীবন, সম্পদ ও সম্মানের পবিত্রতা নিশ্চিত করেন, জাহেলি যুগের সুদ (রিবা) রহিত করেন, নারীর প্রতি সদাচরণের আহ্বান জানান এবং সকল মানুষের সমতা ঘোষণা করেন — সবচেয়ে সম্মানিত সেই, যে সবচেয়ে বেশি আল্লাহভীরু।',
    pointsEn: ['The life, property and honour of people are sacred', 'Interest (riba) of the age of ignorance was abolished', 'He urged kindness and justice toward women', 'All people are equal; the noblest is the most righteous', 'He left two things to hold to: the Book of Allah (and his Sunnah)'],
    pointsBn: ['মানুষের জীবন, সম্পদ ও সম্মান পবিত্র', 'জাহেলি যুগের সুদ (রিবা) রহিত করা হয়', 'তিনি নারীর প্রতি সদয় ও ন্যায়পরায়ণ হওয়ার আহ্বান জানান', 'সকল মানুষ সমান; সবচেয়ে সম্মানিত সেই যে সবচেয়ে বেশি পরহেজগার', 'তিনি আঁকড়ে ধরার জন্য দুটি জিনিস রেখে যান: আল্লাহর কিতাব (ও তাঁর সুন্নাহ)'],
    verses: ['5:3', '49:13'],
  },
  {
    id: 'tp_letters', emoji: '✉️',
    titleEn: 'Covenants & Letters to Kings',
    titleBn: 'চুক্তি ও রাজাদের কাছে পত্র',
    summaryEn: 'After the Treaty of Hudaybiyyah, the Prophet ﷺ sent letters inviting the rulers of his time — such as Heraclius of Byzantium and the Negus of Abyssinia — to Islam, and made covenants of protection with various communities. His message was addressed to all peoples, not one tribe or land.',
    summaryBn: 'হুদায়বিয়ার সন্ধির পর নবী ﷺ তৎকালীন শাসকদের — যেমন বাইজেন্টাইনের হিরাক্লিয়াস ও আবিসিনিয়ার নাজ্জাশি — কাছে ইসলামের দাওয়াতের পত্র পাঠান এবং বিভিন্ন জনগোষ্ঠীর সাথে নিরাপত্তার চুক্তি করেন। তাঁর বার্তা ছিল সকল জাতির জন্য, কোনো একক গোত্র বা ভূমির জন্য নয়।',
    pointsEn: ['Letters invited kings and rulers to worship the One God', 'The message was universal — “Come to a common word” (3:64)', 'He honoured the covenants and safe-conducts he granted'],
    pointsBn: ['পত্রগুলো রাজা-শাসকদের এক আল্লাহর ইবাদতের দিকে আহ্বান জানায়', 'বার্তাটি ছিল বিশ্বজনীন — "একটি অভিন্ন কথায় এসো" (৩:৬৪)', 'তিনি প্রদত্ত চুক্তি ও নিরাপত্তার অঙ্গীকার রক্ষা করতেন'],
    verses: ['3:64', '21:107', '34:28'],
  },
  {
    id: 'tp_treaties', emoji: '📜',
    titleEn: 'Non-Muslims, Treaties & the Charter of Medina',
    titleBn: 'অমুসলিম, চুক্তি ও মদিনা সনদ',
    summaryEn: 'On reaching Medina the Prophet ﷺ drew up the Charter of Medina, a written agreement ordering relations among the city’s groups, including its Jewish tribes, guaranteeing mutual defence and freedom of religion. Islam teaches justice and kindness toward peaceful non-Muslims and forbids compelling anyone into faith.',
    summaryBn: 'মদিনায় পৌঁছে নবী ﷺ মদিনা সনদ প্রণয়ন করেন, যা ইহুদি গোত্রসহ নগরীর জনগোষ্ঠীগুলোর সম্পর্ক নিয়ন্ত্রণকারী এক লিখিত চুক্তি, যেখানে পারস্পরিক প্রতিরক্ষা ও ধর্মীয় স্বাধীনতার নিশ্চয়তা ছিল। ইসলাম শান্তিপ্রিয় অমুসলিমদের প্রতি ন্যায় ও সদাচরণ শেখায় এবং কাউকে জোর করে ধর্মে আনতে নিষেধ করে।',
    pointsEn: ['The Charter of Medina bound the city’s groups in mutual defence', 'It recognised religious freedom for the communities of Medina', '“There is no compulsion in religion” (2:256); justice is due even to opponents (5:8)'],
    pointsBn: ['মদিনা সনদ নগরীর জনগোষ্ঠীগুলোকে পারস্পরিক প্রতিরক্ষায় বেঁধেছিল', 'এটি মদিনার জনগোষ্ঠীগুলোর ধর্মীয় স্বাধীনতা স্বীকার করেছিল', '"দ্বীনে কোনো জবরদস্তি নেই" (২:২৫৬); বিরোধীদের প্রতিও ন্যায় করা কর্তব্য (৫:৮)'],
    verses: ['2:256', '60:8', '5:8'],
  },
  {
    id: 'tp_women', emoji: '🌸',
    titleEn: 'Women & Family Rights',
    titleBn: 'নারী ও পারিবারিক অধিকার',
    summaryEn: 'The Prophet ﷺ raised the status of women in a society that had often neglected them, affirming their rights to inheritance, property, consent in marriage, and dignified treatment. He urged husbands to be kind, and taught that marriage is a bond of love and mercy.',
    summaryBn: 'যে সমাজে নারীরা প্রায়ই অবহেলিত ছিল, সেখানে নবী ﷺ নারীর মর্যাদা উঁচু করেন — উত্তরাধিকার, সম্পত্তি, বিবাহে সম্মতি এবং সম্মানজনক আচরণের অধিকার নিশ্চিত করেন। তিনি স্বামীদের সদয় হতে আহ্বান জানান এবং শেখান যে বিবাহ হলো ভালোবাসা ও দয়ার বন্ধন।',
    pointsEn: ['Women were granted rights to inheritance and property', '“Live with them in kindness” (4:19)', 'Marriage brings “affection and mercy” between spouses (30:21)'],
    pointsBn: ['নারীদের উত্তরাধিকার ও সম্পত্তির অধিকার দেওয়া হয়', '"তাদের সাথে সদ্ভাবে বসবাস করো" (৪:১৯)', 'বিবাহ স্বামী-স্ত্রীর মাঝে "ভালোবাসা ও দয়া" আনে (৩০:২১)'],
    verses: ['4:19', '30:21', '2:228'],
  },
  {
    id: 'tp_economy', emoji: '⚖️',
    titleEn: 'Economic & Charity Teachings',
    titleBn: 'অর্থনৈতিক ও দান-শিক্ষা',
    summaryEn: 'Islam established zakat — an obligatory charity that purifies wealth and supports the poor — and prohibited riba (interest/usury) as an injustice. The Prophet ﷺ encouraged honest trade, fulfilling contracts, and generosity toward the needy.',
    summaryBn: 'ইসলাম প্রতিষ্ঠা করে যাকাত — এক বাধ্যতামূলক দান যা সম্পদ পবিত্র করে ও দরিদ্রদের সহায়তা করে — এবং সুদ (রিবা)-কে অন্যায় হিসেবে নিষিদ্ধ করে। নবী ﷺ সৎ ব্যবসা, চুক্তি পূরণ এবং অভাবীদের প্রতি দানশীলতার উৎসাহ দিতেন।',
    pointsEn: ['Zakat is an obligatory charity for the poor and other categories (9:60)', 'Riba (interest) is forbidden as an injustice (2:275)', 'Honest trade and fulfilling agreements are commanded'],
    pointsBn: ['যাকাত দরিদ্র ও অন্যান্য খাতের জন্য বাধ্যতামূলক দান (৯:৬০)', 'সুদ (রিবা) অন্যায় হিসেবে নিষিদ্ধ (২:২৭৫)', 'সৎ ব্যবসা ও চুক্তি পূরণের নির্দেশ দেওয়া হয়েছে'],
    verses: ['2:275', '9:60', '2:277'],
  },
  {
    id: 'tp_calendar', emoji: '🌙',
    titleEn: 'The Hijri Calendar & Key Dates',
    titleBn: 'হিজরি বর্ষপঞ্জি ও গুরুত্বপূর্ণ তারিখ',
    summaryEn: 'The Islamic (Hijri) calendar is a lunar calendar of twelve months, and its year 1 was set to the Hijra — the migration to Medina in 622 CE. The dating from the Hijra was formally adopted later, during the caliphate of Umar (RA).',
    summaryBn: 'ইসলামি (হিজরি) বর্ষপঞ্জি বারো মাসের এক চান্দ্র বর্ষপঞ্জি, এবং এর ১ম বছর নির্ধারণ করা হয় হিজরত — অর্থাৎ ৬২২ খ্রিস্টাব্দে মদিনায় হিজরত — থেকে। হিজরত থেকে গণনা আনুষ্ঠানিকভাবে পরে, উমর (রাঃ)-এর খিলাফতকালে গৃহীত হয়।',
    pointsEn: ['The year of the Hijra (622 CE) is year 1 AH', 'The lunar year has twelve months (9:36)', 'Key dates: Badr 2 AH, Hudaybiyyah 6 AH, Conquest of Mecca 8 AH, Farewell Hajj 10 AH'],
    pointsBn: ['হিজরতের বছর (৬২২ খ্রি.) হলো ১ম হিজরি বছর', 'চান্দ্র বছরে বারো মাস (৯:৩৬)', 'গুরুত্বপূর্ণ তারিখ: বদর ২ হি., হুদায়বিয়া ৬ হি., মক্কা বিজয় ৮ হি., বিদায় হজ ১০ হি.'],
    verses: ['9:36', '2:189'],
  },
  {
    id: 'tp_dua', emoji: '🤲',
    titleEn: 'His Du‘a & Dhikr Life',
    titleBn: 'তাঁর দোয়া ও যিকিরের জীবন',
    summaryEn: 'The Prophet ﷺ was constant in supplication (du‘a) and remembrance of Allah (dhikr) throughout his day — on waking, eating, travelling, and in times of ease and hardship alike. He taught that hearts find rest in the remembrance of Allah.',
    summaryBn: 'নবী ﷺ সারা দিন — ঘুম থেকে ওঠা, খাওয়া, সফর, স্বাচ্ছন্দ্য ও কষ্ট সব সময়েই — দোয়া ও আল্লাহর স্মরণে (যিকির) নিরত থাকতেন। তিনি শিখিয়েছেন যে আল্লাহর স্মরণে অন্তর প্রশান্তি পায়।',
    pointsEn: ['He supplicated in every state and taught du‘as for daily life', '“In the remembrance of Allah hearts find rest” (13:28)', 'Allah is near and answers the one who calls upon Him (2:186)'],
    pointsBn: ['তিনি সব অবস্থায় দোয়া করতেন ও দৈনন্দিন জীবনের দোয়া শেখাতেন', '"আল্লাহর স্মরণেই অন্তর প্রশান্তি পায়" (১৩:২৮)', 'আল্লাহ নিকটে আছেন এবং আহ্বানকারীর ডাকে সাড়া দেন (২:১৮৬)'],
    verses: ['2:186', '13:28', '33:41'],
  },
  {
    id: 'tp_preservation', emoji: '📖',
    titleEn: 'Preservation of Revelation',
    titleBn: 'ওহি সংরক্ষণ',
    summaryEn: 'During the Prophet’s ﷺ life the Quran was both memorised by many companions and written down by scribes on available materials as it was revealed. Its full arrangement into one written volume was completed shortly after his passing (under Abu Bakr, then standardised under Uthman, RA), and Allah promises its preservation.',
    summaryBn: 'নবী ﷺ-এর জীবদ্দশায় কুরআন একাধিক সাহাবির মুখস্থ ছিল এবং অবতীর্ণ হওয়ার সাথে সাথে লেখক-সাহাবিগণ তা সহজলভ্য উপকরণে লিখে রাখতেন। এক গ্রন্থে এর পূর্ণ সংকলন তাঁর ইন্তেকালের অল্প পরেই সম্পন্ন হয় (আবু বকর, অতঃপর উসমান (রাঃ)-এর সময়ে মানসম্মত করা হয়), এবং আল্লাহ এর সংরক্ষণের প্রতিশ্রুতি দিয়েছেন।',
    pointsEn: ['The Quran was memorised and written down during the Prophet’s ﷺ life', 'Scribes of revelation recorded it as it came', 'Allah guarantees its preservation: “We will surely guard it” (15:9)'],
    pointsBn: ['কুরআন নবী ﷺ-এর জীবদ্দশায় মুখস্থ ও লিখিত ছিল', 'ওহি-লেখক সাহাবিগণ অবতীর্ণ হওয়ামাত্র তা লিপিবদ্ধ করতেন', 'আল্লাহ এর সংরক্ষণের নিশ্চয়তা দিয়েছেন: "আমিই তা রক্ষা করব" (১৫:৯)'],
    verses: ['15:9', '75:17', '85:22'],
  },
  {
    id: 'tp_legacy', emoji: '📿',
    titleEn: 'His Final Illness & Legacy',
    titleBn: 'তাঁর শেষ অসুস্থতা ও উত্তরাধিকার',
    summaryEn: 'In his final illness the Prophet ﷺ grew weak and asked Abu Bakr (RA) to lead the prayers. He passed away in Medina in 11 AH (632 CE) in the room of Aishah (RA). He left the Quran and his Sunnah as lasting guidance, and a community that carried his message across the world.',
    summaryBn: 'শেষ অসুস্থতায় নবী ﷺ দুর্বল হয়ে পড়েন এবং আবু বকর (রাঃ)-কে সালাতের ইমামতির আদেশ দেন। তিনি ১১ হিজরিতে (৬৩২ খ্রি.) মদিনায় আয়েশা (রাঃ)-এর কক্ষে ইন্তেকাল করেন। তিনি রেখে যান কুরআন ও তাঁর সুন্নাহ চিরস্থায়ী পথনির্দেশ হিসেবে, এবং এমন এক সমাজ যা তাঁর বার্তা বিশ্বজুড়ে ছড়িয়ে দিয়েছে।',
    pointsEn: ['In his last days he asked Abu Bakr (RA) to lead the prayer', 'He passed away in Medina in 11 AH (632 CE)', 'His lasting legacy is the Book of Allah and his Sunnah (5:3)'],
    pointsBn: ['শেষ দিনগুলোতে তিনি আবু বকর (রাঃ)-কে সালাতে ইমামতির আদেশ দেন', 'তিনি ১১ হিজরিতে (৬৩২ খ্রি.) মদিনায় ইন্তেকাল করেন', 'তাঁর চিরস্থায়ী উত্তরাধিকার আল্লাহর কিতাব ও তাঁর সুন্নাহ (৫:৩)'],
    verses: ['3:144', '39:30', '5:3'],
  },
  {
    id: 'tp_revelation', emoji: '🕯️',
    titleEn: 'Revelation & the Seerah',
    titleBn: 'ওহি ও সিরাত',
    summaryEn: 'The Quran was revealed gradually over about 23 years, accompanying the events of the Prophet’s ﷺ life. The early Meccan surahs (such as 96, 74 and 73) built creed, worship and patience under persecution; the Medinan surahs added law, community and treaty matters. Many passages are linked to specific events — Badr (Surah 8), Uhud (Surah 3), the Trench (Surah 33), the Conquest (Surah 110), and the completion of the religion at the Farewell Hajj (5:3).',
    summaryBn: 'কুরআন প্রায় ২৩ বছর ধরে ধাপে ধাপে অবতীর্ণ হয়, নবী ﷺ-এর জীবনের ঘটনাগুলোর সাথে সাথে। প্রাথমিক মক্কি সূরাগুলো (যেমন ৯৬, ৭৪ ও ৭৩) আকিদা, ইবাদত ও নির্যাতনের মধ্যে ধৈর্য গড়ে তোলে; মাদানি সূরাগুলো যোগ করে বিধান, সমাজ ও চুক্তির বিষয়। বহু আয়াত নির্দিষ্ট ঘটনার সাথে যুক্ত — বদর (সূরা ৮), উহুদ (সূরা ৩), খন্দক (সূরা ৩৩), মক্কা বিজয় (সূরা ১১০), এবং বিদায় হজে দ্বীনের পূর্ণতা (৫:৩)।',
    pointsEn: ['Among the earliest revelations: 96 (al-‘Alaq), 74 (al-Muddaththir), 73 (al-Muzzammil)', 'Meccan surahs focus on creed and the Hereafter; Medinan surahs on law and community', 'Event-linked passages: Badr → Surah 8; Uhud → Surah 3; Trench → Surah 33; Conquest → Surah 110', 'Revelation came gradually to strengthen the believers’ hearts (25:32)'],
    pointsBn: ['সর্বপ্রথম অবতীর্ণ সূরাগুলোর মধ্যে: ৯৬ (আলাক), ৭৪ (মুদ্দাসসির), ৭৩ (মুযযাম্মিল)', 'মক্কি সূরায় আকিদা ও আখিরাত; মাদানি সূরায় বিধান ও সমাজ', 'ঘটনা-সংযুক্ত আয়াত: বদর → সূরা ৮; উহুদ → সূরা ৩; খন্দক → সূরা ৩৩; বিজয় → সূরা ১১০', 'মুমিনদের অন্তর দৃঢ় করতে ওহি ধাপে ধাপে আসে (২৫:৩২)'],
    verses: ['96:1', '74:1', '73:1', '25:32', '8:9', '33:9', '110:1', '5:3'],
  },
];

/**
 * Places of the Seerah — a mini-gazetteer (1-line each, bilingual). Shown in the
 * Topics view with an abstract location-pin accent (no figurative imagery).
 */
const SEERAH_PLACES = [
  { nameEn: 'Mecca', nameBn: 'মক্কা', descEn: 'Birthplace of the Prophet ﷺ and home of the Ka‘bah; the message began here.', descBn: 'নবী ﷺ-এর জন্মস্থান ও কাবার শহর; বার্তার সূচনা এখানেই।' },
  { nameEn: 'Cave of Hira', nameBn: 'হেরা গুহা', descEn: 'Where the first revelation, “Read” (96:1), came in c. 610 CE.', descBn: 'যেখানে আনু. ৬১০ খ্রি. প্রথম ওহি "পড়ো" (৯৬:১) আসে।' },
  { nameEn: 'Cave of Thawr', nameBn: 'সাওর গুহা', descEn: 'The hiding place of the Prophet ﷺ and Abu Bakr (RA) during the Hijra.', descBn: 'হিজরতের সময় নবী ﷺ ও আবু বকর (রাঃ)-এর আত্মগোপনের স্থান।' },
  { nameEn: 'Ta’if', nameBn: 'তায়েফ', descEn: 'The hill town that rejected him ﷺ; he prayed for its people’s guidance.', descBn: 'যে পাহাড়ি শহর তাঁকে ﷺ প্রত্যাখ্যান করে; তিনি তাদের হেদায়েতের দোয়া করেন।' },
  { nameEn: 'Quba', nameBn: 'কুবা', descEn: 'Just outside Medina, where the first mosque of Islam was established at the Hijra.', descBn: 'মদিনার উপকণ্ঠে, হিজরতের সময় যেখানে ইসলামের প্রথম মসজিদ প্রতিষ্ঠিত হয়।' },
  { nameEn: 'Medina', nameBn: 'মদিনা', descEn: 'The Prophet’s ﷺ city after the Hijra — home of his mosque and his resting place.', descBn: 'হিজরতের পর নবী ﷺ-এর শহর — তাঁর মসজিদ ও সমাধিস্থল।' },
  { nameEn: 'Badr', nameBn: 'বদর', descEn: 'Site of the first decisive victory in 2 AH (624 CE).', descBn: '২ হিজরিতে (৬২৪ খ্রি.) প্রথম চূড়ান্ত বিজয়ের স্থান।' },
  { nameEn: 'Uhud', nameBn: 'উহুদ', descEn: 'The mountain north of Medina where the costly battle of 3 AH took place.', descBn: 'মদিনার উত্তরের পাহাড়, যেখানে ৩ হিজরির কঠিন যুদ্ধ হয়।' },
  { nameEn: 'Khandaq', nameBn: 'খন্দক', descEn: 'The trench dug on Medina’s northern side against the confederate siege (5 AH).', descBn: 'জোট-অবরোধের বিরুদ্ধে মদিনার উত্তর দিকে খনন করা পরিখা (৫ হি.)।' },
  { nameEn: 'Hudaybiyyah', nameBn: 'হুদায়বিয়া', descEn: 'Where the ten-year truce with the Quraysh was signed in 6 AH.', descBn: 'যেখানে ৬ হিজরিতে কুরাইশদের সাথে দশ বছরের সন্ধি হয়।' },
  { nameEn: 'Khaybar', nameBn: 'খায়বার', descEn: 'The fortified oasis north of Medina secured in 7 AH.', descBn: 'মদিনার উত্তরের সুরক্ষিত মরূদ্যান, ৭ হিজরিতে নিয়ন্ত্রণে আসে।' },
  { nameEn: 'Hunayn', nameBn: 'হুনাইন', descEn: 'The valley between Mecca and Ta’if where the ambush of 8 AH was overcome.', descBn: 'মক্কা-তায়েফের মাঝের উপত্যকা, যেখানে ৮ হিজরির অতর্কিত হামলা পরাভূত হয়।' },
  { nameEn: 'Tabuk', nameBn: 'তাবুক', descEn: 'The far northern destination of the “Army of Hardship” expedition in 9 AH.', descBn: '৯ হিজরিতে "কষ্টের বাহিনী" অভিযানের সুদূর উত্তরের গন্তব্য।' },
];

/**
 * Key companions (Sahaba, RA) — a brief, respectful directory. Initials are
 * rendered in a coloured badge (no figurative image).
 */
const SEERAH_COMPANIONS = [
  { init: 'AB', color: 'bg-amber-500', nameEn: 'Abu Bakr as-Siddiq (RA)', nameBn: 'আবু বকর সিদ্দিক (রাঃ)',
    descEn: 'Closest friend of the Prophet ﷺ, companion of the Hijra, and the first caliph.', descBn: 'নবী ﷺ-এর ঘনিষ্ঠতম বন্ধু, হিজরতের সঙ্গী ও প্রথম খলিফা।' },
  { init: 'U', color: 'bg-rose-500', nameEn: 'Umar ibn al-Khattab (RA)', nameBn: 'উমর ইবনুল খাত্তাব (রাঃ)',
    descEn: 'The second caliph, renowned for his justice; Islam expanded greatly in his time.', descBn: 'দ্বিতীয় খলিফা, ন্যায়বিচারের জন্য প্রসিদ্ধ; তাঁর সময়ে ইসলাম বহুদূর বিস্তৃত হয়।' },
  { init: 'U', color: 'bg-emerald-500', nameEn: 'Uthman ibn Affan (RA)', nameBn: 'উসমান ইবনে আফফান (রাঃ)',
    descEn: 'The third caliph, known for generosity; the Quran was standardised in his caliphate.', descBn: 'তৃতীয় খলিফা, দানশীলতার জন্য খ্যাত; তাঁর খিলাফতে কুরআন মানসম্মত করা হয়।' },
  { init: 'A', color: 'bg-indigo-500', nameEn: 'Ali ibn Abi Talib (RA)', nameBn: 'আলী ইবনে আবি তালিব (রাঃ)',
    descEn: 'Cousin and son-in-law of the Prophet ﷺ, the fourth caliph, noted for knowledge and courage.', descBn: 'নবী ﷺ-এর চাচাতো ভাই ও জামাতা, চতুর্থ খলিফা, জ্ঞান ও সাহসের জন্য খ্যাত।' },
  { init: 'K', color: 'bg-pink-500', nameEn: 'Khadijah bint Khuwaylid (RA)', nameBn: 'খাদিজা বিনতে খুওয়াইলিদ (রাঃ)',
    descEn: 'His first wife and the first person to believe in his message.', descBn: 'তাঁর প্রথম স্ত্রী এবং তাঁর বার্তায় বিশ্বাসকারী প্রথম ব্যক্তি।' },
  { init: 'A', color: 'bg-fuchsia-500', nameEn: 'Aishah bint Abi Bakr (RA)', nameBn: 'আয়েশা বিনতে আবি বকর (রাঃ)',
    descEn: 'A wife of the Prophet ﷺ and a leading scholar who transmitted much of the Sunnah.', descBn: 'নবী ﷺ-এর স্ত্রী এবং একজন প্রধান আলিমা যিনি সুন্নাহর অনেক কিছু বর্ণনা করেছেন।' },
  { init: 'F', color: 'bg-teal-500', nameEn: 'Fatimah az-Zahra (RA)', nameBn: 'ফাতিমা আয-যাহরা (রাঃ)',
    descEn: 'His beloved daughter and the wife of Ali (RA); among the most honoured women in Islam.', descBn: 'তাঁর প্রিয় কন্যা ও আলী (রাঃ)-এর স্ত্রী; ইসলামে সর্বাধিক সম্মানিত নারীদের একজন।' },
  { init: 'H', color: 'bg-red-600', nameEn: 'Hamzah ibn Abd al-Muttalib (RA)', nameBn: 'হামজা ইবনে আবদুল মুত্তালিব (রাঃ)',
    descEn: 'The Prophet’s ﷺ uncle, a brave defender of Islam, martyred at Uhud.', descBn: 'নবী ﷺ-এর চাচা, ইসলামের সাহসী রক্ষক, উহুদে শহীদ হন।' },
  { init: 'B', color: 'bg-slate-600', nameEn: 'Bilal ibn Rabah (RA)', nameBn: 'বিলাল ইবনে রাবাহ (রাঃ)',
    descEn: 'A freed slave who endured torture for his faith and became the first muezzin of Islam.', descBn: 'একজন মুক্ত দাস যিনি ঈমানের জন্য নির্যাতন সহ্য করেন এবং ইসলামের প্রথম মুয়াজ্জিন হন।' },
  { init: 'K', color: 'bg-sky-600', nameEn: 'Khalid ibn al-Walid (RA)', nameBn: 'খালিদ ইবনুল ওয়ালিদ (রাঃ)',
    descEn: 'A gifted military commander honoured as “the Sword of Allah.”', descBn: 'একজন প্রতিভাবান সেনাপতি, "আল্লাহর তরবারি" উপাধিতে ভূষিত।' },
  { init: 'S', color: 'bg-lime-600', nameEn: 'Salman al-Farsi (RA)', nameBn: 'সালমান আল-ফারসি (রাঃ)',
    descEn: 'A Persian companion whose advice led to the digging of the trench at Khandaq.', descBn: 'একজন পারস্য সাহাবি, যাঁর পরামর্শে খন্দকে পরিখা খনন করা হয়।' },
  { init: 'A', color: 'bg-cyan-600', nameEn: 'Abu Hurayrah (RA)', nameBn: 'আবু হুরায়রা (রাঃ)',
    descEn: 'A devoted companion who narrated a great number of the Prophet’s ﷺ hadith.', descBn: 'একজন নিবেদিত সাহাবি যিনি নবী ﷺ-এর অসংখ্য হাদিস বর্ণনা করেছেন।' },
];

/**
 * The Ten Promised Paradise (al-‘Ashara al-Mubashshara, RA) — the ten companions
 * given the glad tidings of Paradise in a single authentic narration. One
 * respectful line each (mainstream Sunni). The first four are also the Rightly-
 * Guided Caliphs and appear as full cards above; here they anchor the group of
 * ten. No figurative image — initials only, per the aniconic tradition.
 */
const SEERAH_ASHARA = [
  { nameEn: 'Abu Bakr as-Siddiq (RA)', nameBn: 'আবু বকর সিদ্দিক (রাঃ)',
    descEn: 'The closest friend of the Prophet ﷺ and the first caliph.', descBn: 'নবী ﷺ-এর ঘনিষ্ঠতম বন্ধু ও প্রথম খলিফা।' },
  { nameEn: 'Umar ibn al-Khattab (RA)', nameBn: 'উমর ইবনুল খাত্তাব (রাঃ)',
    descEn: 'The second caliph, renowned for his justice and strength.', descBn: 'দ্বিতীয় খলিফা, ন্যায়বিচার ও দৃঢ়তার জন্য প্রসিদ্ধ।' },
  { nameEn: 'Uthman ibn Affan (RA)', nameBn: 'উসমান ইবনে আফফান (রাঃ)',
    descEn: 'The third caliph, known for his modesty and great generosity.', descBn: 'তৃতীয় খলিফা, লজ্জাশীলতা ও অকুণ্ঠ দানশীলতার জন্য খ্যাত।' },
  { nameEn: 'Ali ibn Abi Talib (RA)', nameBn: 'আলী ইবনে আবি তালিব (রাঃ)',
    descEn: 'The fourth caliph, cousin of the Prophet ﷺ, noted for knowledge and courage.', descBn: 'চতুর্থ খলিফা, নবী ﷺ-এর চাচাতো ভাই, জ্ঞান ও সাহসের জন্য খ্যাত।' },
  { nameEn: 'Talhah ibn Ubaydillah (RA)', nameBn: 'তালহা ইবনে উবায়দুল্লাহ (রাঃ)',
    descEn: 'An early believer who shielded the Prophet ﷺ with his own body at Uhud.', descBn: 'একজন প্রথম যুগের ঈমানদার, যিনি উহুদে নিজ দেহ দিয়ে নবী ﷺ-কে রক্ষা করেন।' },
  { nameEn: 'Az-Zubayr ibn al-Awwam (RA)', nameBn: 'যুবায়ের ইবনুল আওয়াম (রাঃ)',
    descEn: 'The Prophet’s ﷺ cousin and a devoted early Muslim, called his “disciple” (hawari).', descBn: 'নবী ﷺ-এর চাচাতো ভাই ও নিবেদিত প্রথম মুসলিম, যাঁকে তাঁর "হাওয়ারি" বলা হয়।' },
  { nameEn: 'Abdur-Rahman ibn Awf (RA)', nameBn: 'আবদুর রহমান ইবনে আওফ (রাঃ)',
    descEn: 'An early Muslim and successful merchant famed for his abundant charity.', descBn: 'একজন প্রথম যুগের মুসলিম ও সফল ব্যবসায়ী, প্রচুর দানের জন্য প্রসিদ্ধ।' },
  { nameEn: 'Sa‘d ibn Abi Waqqas (RA)', nameBn: 'সাদ ইবনে আবি ওয়াক্কাস (রাঃ)',
    descEn: 'An early believer and skilled archer among the first to defend Islam.', descBn: 'একজন প্রথম যুগের ঈমানদার ও দক্ষ তীরন্দাজ, ইসলামের প্রথম রক্ষকদের একজন।' },
  { nameEn: 'Sa‘id ibn Zayd (RA)', nameBn: 'সাঈদ ইবনে যায়েদ (রাঃ)',
    descEn: 'An early Muslim whose household’s faith helped lead Umar (RA) to Islam.', descBn: 'একজন প্রথম যুগের মুসলিম, যাঁর পরিবারের ঈমান উমর (রাঃ)-কে ইসলামের পথে আনতে সহায়ক হয়।' },
  { nameEn: 'Abu Ubaydah ibn al-Jarrah (RA)', nameBn: 'আবু উবায়দা ইবনুল জাররাহ (রাঃ)',
    descEn: 'A trusted companion whom the Prophet ﷺ called “the trustworthy one (amin) of this Ummah.”', descBn: 'একজন বিশ্বস্ত সাহাবি, যাঁকে নবী ﷺ "এই উম্মাহর আমিন (বিশ্বস্ত)" বলে অভিহিত করেন।' },
];

/**
 * Lessons from the Seerah — concise thematic lessons distilled from the timeline.
 * Each links to a timeline event (by id) and, where clean, a verified verse.
 * Content is bilingual inline and routed through lc(); mainstream Sunni only.
 */
const SEERAH_LESSONS = [
  { id: 'ls_patience', emoji: '🕯️', event: 'persecution', ayah: '2:153',
    textEn: 'The early believers bore torture and boycott without abandoning faith. Patience (sabr) and prayer are the believer’s support under trial.',
    textBn: 'প্রথম যুগের ঈমানদারগণ ঈমান না ছেড়ে নির্যাতন ও বয়কট সহ্য করেছেন। পরীক্ষার মুখে ধৈর্য (সবর) ও সালাত মুমিনের অবলম্বন।' },
  { id: 'ls_trust', emoji: '🤲', event: 'hijra', ayah: '9:40',
    textEn: 'Hiding in the Cave of Thawr as enemies passed, the Prophet ﷺ told Abu Bakr (RA), “Do not grieve, Allah is with us.” True safety lies in reliance on Allah.',
    textBn: 'শত্রুরা পাশ দিয়ে যাওয়ার সময় সাওর গুহায় নবী ﷺ আবু বকর (রাঃ)-কে বলেন, "চিন্তা করো না, আল্লাহ আমাদের সাথে আছেন।" প্রকৃত নিরাপত্তা আল্লাহর উপর ভরসায়।' },
  { id: 'ls_mercy', emoji: '💚', event: 'conquest', ayah: '21:107',
    textEn: 'Entering Mecca in triumph, the Prophet ﷺ forgave those who had persecuted him for years. In the hour of power he chose mercy over revenge.',
    textBn: 'বিজয়ীবেশে মক্কায় প্রবেশ করে নবী ﷺ বছরের পর বছর নির্যাতনকারীদের ক্ষমা করে দেন। ক্ষমতার মুহূর্তে তিনি প্রতিশোধের বদলে দয়া বেছে নেন।' },
  { id: 'ls_covenant', emoji: '📜', event: 'hudaybiyyah', ayah: '16:91',
    textEn: 'At Hudaybiyyah the Prophet ﷺ accepted hard terms and held firmly to the truce. Honouring agreements, even costly ones, is a mark of faith.',
    textBn: 'হুদায়বিয়ায় নবী ﷺ কঠিন শর্ত মেনে সন্ধিতে অবিচল থাকেন। ব্যয়বহুল হলেও চুক্তি রক্ষা করা ঈমানের নিদর্শন।' },
  { id: 'ls_shura', emoji: '🧭', event: 'trench', ayah: '3:159',
    textEn: 'At the Trench he adopted Salman al-Farsi’s (RA) plan, and at Uhud he followed the counsel of the many. Consultation (shura) strengthens a community.',
    textBn: 'খন্দকে তিনি সালমান ফারসি (রাঃ)-এর পরিকল্পনা গ্রহণ করেন এবং উহুদে বহুজনের পরামর্শ মানেন। পরামর্শ (শূরা) সমাজকে দৃঢ় করে।' },
  { id: 'ls_steadfast', emoji: '⛰️', event: 'taif', ayah: '46:35',
    textEn: 'Rejected and injured at Ta’if, the Prophet ﷺ prayed for his people’s guidance rather than their ruin. Steadfastness meets hardship with hope, not despair.',
    textBn: 'তায়েফে প্রত্যাখ্যাত ও আহত হয়েও নবী ﷺ তাদের ধ্বংস নয়, হেদায়েতের দোয়া করেন। অবিচলতা কষ্টের মোকাবিলা করে হতাশা নয়, আশা দিয়ে।' },
  { id: 'ls_gradual', emoji: '🌱', event: 'public', ayah: '25:32',
    textEn: 'The call began in private for three years before going public, and revelation came gradually. Lasting change is built step by step with wisdom.',
    textBn: 'দাওয়াত তিন বছর গোপনে চলে অতঃপর প্রকাশ্য হয়, আর ওহি ধাপে ধাপে আসে। স্থায়ী পরিবর্তন প্রজ্ঞার সাথে ধাপে ধাপে গড়ে ওঠে।' },
  { id: 'ls_brotherhood', emoji: '🤝', event: 'mosque', ayah: '49:10',
    textEn: 'In Medina the Prophet ﷺ paired each migrant with a helper in bonds of brotherhood. Faith unites believers above tribe, wealth, and origin.',
    textBn: 'মদিনায় নবী ﷺ প্রত্যেক মুহাজিরকে এক আনসারের সাথে ভ্রাতৃত্বের বন্ধনে বাঁধেন। ঈমান গোত্র, সম্পদ ও বংশের ঊর্ধ্বে মুমিনদের এক করে।' },
];

/**
 * Meccan vs Medinan — a short reference contrasting the two phases of revelation.
 * Introductory and uncontroversial; example surahs are shown as tappable pills.
 */
const SEERAH_MECCAN_MEDINAN = {
  meccan: {
    emoji: '🕋',
    descEn: 'Revealed before the Hijra, mostly at Mecca. These surahs build creed (tawhid), the Hereafter and resurrection, and patience under persecution — often in shorter, rhythmic passages.',
    descBn: 'হিজরতের পূর্বে, অধিকাংশ মক্কায় অবতীর্ণ। এসব সূরা আকিদা (তাওহিদ), আখিরাত ও পুনরুত্থান এবং নির্যাতনের মধ্যে ধৈর্য গড়ে তোলে — প্রায়ই সংক্ষিপ্ত, ছন্দময় বাক্যে।',
    examples: [
      { ref: '96:1', nameEn: 'al-‘Alaq (96)', nameBn: 'আলাক (৯৬)' },
      { ref: '112:1', nameEn: 'al-Ikhlas (112)', nameBn: 'ইখলাস (১১২)' },
      { ref: '74:1', nameEn: 'al-Muddaththir (74)', nameBn: 'মুদ্দাসসির (৭৪)' },
    ],
  },
  medinan: {
    emoji: '🌿',
    descEn: 'Revealed after the Hijra, at or around Medina. These surahs add law and worship, family and social order, treaties and community life — often in longer passages.',
    descBn: 'হিজরতের পর, মদিনায় বা এর আশপাশে অবতীর্ণ। এসব সূরা যোগ করে বিধান ও ইবাদত, পরিবার ও সমাজব্যবস্থা, চুক্তি ও সমাজজীবন — প্রায়ই দীর্ঘ বাক্যে।',
    examples: [
      { ref: '2:1', nameEn: 'al-Baqarah (2)', nameBn: 'বাকারা (২)' },
      { ref: '4:1', nameEn: 'an-Nisa (4)', nameBn: 'নিসা (৪)' },
      { ref: '5:1', nameEn: 'al-Ma’idah (5)', nameBn: 'মায়িদা (৫)' },
    ],
  },
};

/**
 * Quick self-test quiz drawn from the timeline/topics. Answers are unambiguous
 * mainstream facts. Best score is saved to localStorage (lq_seerah_quiz_best).
 */
const SEERAH_QUIZ = [
  { qEn: 'In which year (CE) was the Prophet ﷺ born, the Year of the Elephant?', qBn: 'হস্তীবর্ষে নবী ﷺ কোন সালে (খ্রি.) জন্মগ্রহণ করেন?',
    optsEn: ['c. 570 CE', 'c. 610 CE', '622 CE', '632 CE'], optsBn: ['আনু. ৫৭০ খ্রি.', 'আনু. ৬১০ খ্রি.', '৬২২ খ্রি.', '৬৩২ খ্রি.'], correct: 0 },
  { qEn: 'At what age did he ﷺ receive the first revelation?', qBn: 'কত বছর বয়সে তিনি ﷺ প্রথম ওহি লাভ করেন?',
    optsEn: ['40', '25', '30', '50'], optsBn: ['৪০', '২৫', '৩০', '৫০'], correct: 0 },
  { qEn: 'Where did the first revelation come to him ﷺ?', qBn: 'তাঁর ﷺ কাছে প্রথম ওহি কোথায় আসে?',
    optsEn: ['Cave of Hira', 'Cave of Thawr', 'Mount Uhud', "The Prophet's Mosque"], optsBn: ['হেরা গুহা', 'সাওর গুহা', 'উহুদ পাহাড়', 'মসজিদে নববী'], correct: 0 },
  { qEn: 'The Hijra to Medina marks which year of the Islamic calendar?', qBn: 'মদিনায় হিজরত ইসলামি বর্ষপঞ্জির কোন বছরকে চিহ্নিত করে?',
    optsEn: ['1 AH', '2 AH', '10 AH', '11 AH'], optsBn: ['১ হিজরি', '২ হিজরি', '১০ হিজরি', '১১ হিজরি'], correct: 0 },
  { qEn: 'Which battle took place in 2 AH?', qBn: '২ হিজরিতে কোন যুদ্ধ সংঘটিত হয়?',
    optsEn: ['Badr', 'Uhud', 'The Trench', 'Tabuk'], optsBn: ['বদর', 'উহুদ', 'খন্দক', 'তাবুক'], correct: 0 },
  { qEn: 'Approximately how many Muslims fought at Badr?', qBn: 'বদরে আনুমানিক কতজন মুসলিম যুদ্ধ করেন?',
    optsEn: ['~313', '~1,000', '~3,000', '~10,000'], optsBn: ['~৩১৩', '~১,০০০', '~৩,০০০', '~১০,০০০'], correct: 0 },
  { qEn: 'In which year was the Conquest of Mecca?', qBn: 'মক্কা বিজয় কোন বছরে হয়?',
    optsEn: ['8 AH', '5 AH', '6 AH', '11 AH'], optsBn: ['৮ হিজরি', '৫ হিজরি', '৬ হিজরি', '১১ হিজরি'], correct: 0 },
  { qEn: 'In which city did the Prophet ﷺ pass away?', qBn: 'নবী ﷺ কোন শহরে ইন্তেকাল করেন?',
    optsEn: ['Medina', 'Mecca', "Ta'if", 'Jerusalem'], optsBn: ['মদিনা', 'মক্কা', 'তায়েফ', 'জেরুজালেম'], correct: 0 },
  { qEn: 'In which cave did the Prophet ﷺ and Abu Bakr (RA) hide during the Hijra?', qBn: 'হিজরতের সময় নবী ﷺ ও আবু বকর (রাঃ) কোন গুহায় আত্মগোপন করেন?',
    optsEn: ['Cave of Hira', 'Cave of Thawr', 'Mount Uhud', 'Mina'], optsBn: ['হেরা গুহা', 'সাওর গুহা', 'উহুদ পাহাড়', 'মিনা'], correct: 1 },
  { qEn: 'Which surah is among the very first revelations?', qBn: 'কোন সূরাটি সর্বপ্রথম অবতীর্ণ ওহিগুলোর অন্তর্ভুক্ত?',
    optsEn: ['Surah al-Baqarah (2)', 'Surah an-Nasr (110)', "Surah al-'Alaq (96)", "Surah al-Ma'idah (5)"], optsBn: ['সূরা বাকারা (২)', 'সূরা নাসর (১১০)', 'সূরা আলাক (৯৬)', 'সূরা মায়িদা (৫)'], correct: 2 },
  { qEn: 'Where was the first mosque of Islam established at the Hijra?', qBn: 'হিজরতের সময় ইসলামের প্রথম মসজিদ কোথায় প্রতিষ্ঠিত হয়?',
    optsEn: ['Mecca', "Ta'if", 'Khaybar', 'Quba'], optsBn: ['মক্কা', 'তায়েফ', 'খায়বার', 'কুবা'], correct: 3 },
  { qEn: 'Roughly how far is the journey from Mecca to Medina?', qBn: 'মক্কা থেকে মদিনার পথ আনুমানিক কত দূর?',
    optsEn: ['~45 km', '~450 km', '~4,500 km', '~1,000 km'], optsBn: ['~৪৫ কিমি', '~৪৫০ কিমি', '~৪,৫০০ কিমি', '~১,০০০ কিমি'], correct: 1 },
];

/**
 * Local fallback dictionary for all UI chrome. tt() prefers the global t()
 * (so translations.js can override once wired), and falls back here so the
 * module renders correctly under ANY UI language (English fallback for the
 * other languages; Bengali authored inline). Historical narrative is NOT here —
 * it stays on each event/battle as en/bn fields.
 */
const SEERAH_UI = {
  seerah_title: { en: 'Seerah — Life of the Prophet ﷺ', bn: 'সিরাত — নবী ﷺ-এর জীবনী' },
  seerah_subtitle: { en: 'An interactive timeline of the life of Prophet Muhammad ﷺ', bn: 'নবী মুহাম্মদ ﷺ-এর জীবনের একটি ইন্টারেক্টিভ টাইমলাইন' },
  seerah_intro: { en: "Browse the major events of the Prophet's life ﷺ by era. Tap any event to read more and mark it as read.", bn: 'যুগ অনুযায়ী নবী ﷺ-এর জীবনের গুরুত্বপূর্ণ ঘটনাগুলো দেখুন। বিস্তারিত পড়তে ও পঠিত চিহ্নিত করতে যেকোনো ঘটনায় ট্যাপ করুন।' },
  seerah_search_placeholder: { en: 'Search events…', bn: 'ঘটনা খুঁজুন…' },
  seerah_filter_all: { en: 'All', bn: 'সব' },
  seerah_era_before: { en: 'Before Prophethood', bn: 'নবুয়তের পূর্বে' },
  seerah_era_meccan: { en: 'Meccan Period', bn: 'মক্কি যুগ' },
  seerah_era_medinan: { en: 'Hijra & Medinan Period', bn: 'হিজরত ও মাদানি যুগ' },
  seerah_era_farewell: { en: 'Later Medina & Farewell', bn: 'মাদানি শেষভাগ ও বিদায়' },
  seerah_progress: { en: 'Your progress', bn: 'আপনার অগ্রগতি' },
  seerah_significance: { en: 'Lesson', bn: 'শিক্ষা' },
  seerah_mark_read: { en: 'Mark as read', bn: 'পঠিত চিহ্নিত করুন' },
  seerah_marked_read: { en: 'Read', bn: 'পঠিত' },
  seerah_open_ayah: { en: 'Related verse', bn: 'সম্পর্কিত আয়াত' },
  seerah_no_results: { en: 'No events match your search.', bn: 'আপনার অনুসন্ধানের সাথে কোনো ঘটনা মেলেনি।' },
  seerah_reset_progress: { en: 'Reset progress', bn: 'অগ্রগতি রিসেট করুন' },
  seerah_bt_label: { en: 'Battlefield', bn: 'রণাঙ্গন' },
  seerah_bt_location: { en: 'Location', bn: 'স্থান' },
  seerah_bt_forces: { en: 'Forces', bn: 'সৈন্যবল' },
  seerah_bt_muslims: { en: 'Muslims', bn: 'মুসলিম' },
  seerah_bt_opponent: { en: 'Opponents', bn: 'প্রতিপক্ষ' },
  seerah_bt_commanders: { en: 'Commanders', bn: 'সেনাপতি' },
  seerah_bt_outcome: { en: 'Outcome', bn: 'ফলাফল' },
  seerah_bt_casualties: { en: 'Casualties', bn: 'হতাহত' },
  seerah_bt_moments: { en: 'Key moments', bn: 'গুরুত্বপূর্ণ মুহূর্ত' },
  seerah_bt_verses: { en: 'Related verses', bn: 'সম্পর্কিত আয়াত' },
  seerah_view_timeline: { en: 'Timeline', bn: 'টাইমলাইন' },
  seerah_view_topics: { en: 'Topics', bn: 'বিষয়সমূহ' },
  seerah_view_quiz: { en: 'Quiz', bn: 'কুইজ' },
  seerah_view_story: { en: 'Story', bn: 'গল্প' },
  seerah_story_title: { en: 'Story Mode — Continuous Read', bn: 'গল্প মোড — ধারাবাহিক পাঠ' },
  seerah_story_intro: { en: 'Read the Prophet’s life ﷺ as one flowing narrative, era by era.', bn: 'নবী ﷺ-এর জীবন যুগ ধরে ধরে একটানা বর্ণনায় পড়ুন।' },
  seerah_story_prev: { en: 'Previous era', bn: 'পূর্ববর্তী যুগ' },
  seerah_story_next: { en: 'Next era', bn: 'পরবর্তী যুগ' },
  seerah_story_progress: { en: 'Reading', bn: 'পাঠ চলছে' },
  seerah_story_finish: { en: 'You have reached the end of the Seerah.', bn: 'আপনি সিরাতের শেষ প্রান্তে পৌঁছেছেন।' },
  seerah_share: { en: 'Share', bn: 'শেয়ার' },
  seerah_copy: { en: 'Copy', bn: 'কপি' },
  seerah_copied: { en: 'Copied!', bn: 'কপি হয়েছে!' },
  seerah_glance_title: { en: 'Seerah at a Glance', bn: 'এক নজরে সিরাত' },
  seerah_glance_prophethood: { en: 'Years of prophethood', bn: 'নবুয়তের বছর' },
  seerah_glance_meccan: { en: 'Meccan period', bn: 'মক্কি যুগ' },
  seerah_glance_medinan: { en: 'Medinan period', bn: 'মাদানি যুগ' },
  seerah_glance_battles: { en: 'Major battles', bn: 'প্রধান যুদ্ধ' },
  seerah_glance_years: { en: 'years', bn: 'বছর' },
  seerah_topics_title: { en: 'Major Topics', bn: 'প্রধান বিষয়সমূহ' },
  seerah_topics_intro: { en: "Explore key themes from the life and teachings of the Prophet ﷺ. Tap any topic to expand.", bn: 'নবী ﷺ-এর জীবন ও শিক্ষার গুরুত্বপূর্ণ বিষয়গুলো ঘুরে দেখুন। বিস্তারিত দেখতে যেকোনো বিষয়ে ট্যাপ করুন।' },
  seerah_key_points: { en: 'Key points', bn: 'মূল বিষয়' },
  seerah_companions_title: { en: 'Key Companions', bn: 'উল্লেখযোগ্য সাহাবিগণ' },
  seerah_ashara_title: { en: 'The Ten Promised Paradise', bn: 'জান্নাতের সুসংবাদপ্রাপ্ত দশজন' },
  seerah_ashara_sub: { en: 'al-‘Ashara al-Mubashshara (RA)', bn: 'আল-আশারাতুল মুবাশশারা (রাঃ)' },
  seerah_lessons_title: { en: 'Lessons from the Seerah', bn: 'সিরাত থেকে শিক্ষা' },
  seerah_lessons_intro: { en: 'Thematic lessons drawn from the timeline, each linked to its event and a verse.', bn: 'টাইমলাইন থেকে নেওয়া বিষয়ভিত্তিক শিক্ষা, প্রতিটি এর ঘটনা ও একটি আয়াতের সাথে যুক্ত।' },
  seerah_mm_title: { en: 'Meccan vs Medinan Revelation', bn: 'মক্কি বনাম মাদানি ওহি' },
  seerah_mm_intro: { en: 'How revelation differed across the two great phases of the Prophet’s life ﷺ.', bn: 'নবী ﷺ-এর জীবনের দুই মহান পর্বে ওহি কীভাবে ভিন্ন ছিল।' },
  seerah_mm_meccan: { en: 'Meccan Revelation', bn: 'মক্কি ওহি' },
  seerah_mm_medinan: { en: 'Medinan Revelation', bn: 'মাদানি ওহি' },
  seerah_mm_examples: { en: 'Example surahs', bn: 'উদাহরণ সূরা' },
  seerah_quiz_title: { en: 'Test Your Knowledge', bn: 'আপনার জ্ঞান যাচাই করুন' },
  seerah_quiz_intro: { en: 'Answer the questions, then check your score.', bn: 'প্রশ্নগুলোর উত্তর দিন, অতঃপর আপনার স্কোর দেখুন।' },
  seerah_quiz_submit: { en: 'Check answers', bn: 'উত্তর যাচাই করুন' },
  seerah_quiz_retake: { en: 'Try again', bn: 'আবার চেষ্টা করুন' },
  seerah_quiz_score: { en: 'Your score', bn: 'আপনার স্কোর' },
  seerah_quiz_best: { en: 'Best', bn: 'সেরা' },
  seerah_quiz_hint: { en: 'Answer all questions to check your score.', bn: 'স্কোর দেখতে সব প্রশ্নের উত্তর দিন।' },
  seerah_places_title: { en: 'Places of the Seerah', bn: 'সিরাতের স্থানসমূহ' },
  seerah_route_title: { en: 'The Hijra Route', bn: 'হিজরতের পথ' },
  seerah_route_caption: { en: 'Abstract route: Mecca → Cave of Thawr (south first, to evade pursuit) → along the coastal route → Quba → Medina. About 450 km in roughly two weeks. Not to scale.', bn: 'বিমূর্ত পথ: মক্কা → সাওর গুহা (ধাওয়া এড়াতে প্রথমে দক্ষিণে) → উপকূলীয় পথ ধরে → কুবা → মদিনা। প্রায় ৪৫০ কিমি, আনুমানিক দুই সপ্তাহে। মাপানুযায়ী নয়।' },
};

class SeerahView {
  constructor() {
    this.container = document.getElementById('seerah-container');
    if (!this.container) return;
    this.language = (typeof appSettings !== 'undefined' && appSettings) ? appSettings.get('language') : 'en';
    if (!this.language) this.language = 'en';
    this.rendered = false;
    this.view = 'timeline';
    this.filter = 'all';
    this.query = '';
    this.expanded = new Set();
    this.read = this.loadRead();
    this.quizAnswers = {};
    this.quizSubmitted = false;
    this.quizScore = 0;
    this.quizBest = this.loadQuizBest();
    this.storyPos = this.loadStoryPos();

    window.addEventListener('tabChanged', (e) => {
      try { if (e && e.detail && e.detail.tabId === 'seerah') this.render(); } catch (_) { /* ignore */ }
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
    const e = SEERAH_UI[key];
    if (e) return this.language === 'bn' ? (e.bn || e.en) : e.en;
    return key;
  }
  esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
  lc(o) {
    if (!o) return '';
    if (this.language === 'bn' && o.bn) return o.bn;
    if (o.en && typeof CI18N !== 'undefined') { const tr = CI18N.tr(this.language, o.en); if (tr) return tr; }
    return o.en || o.bn || '';
  }
  pick(item, field) {
    return this.lc({ en: item[field + 'En'], bn: item[field + 'Bn'] });
  }

  loadRead() {
    try {
      const raw = localStorage.getItem('lq_seerah_read');
      if (!raw) return new Set();
      const arr = JSON.parse(raw);
      return new Set(Array.isArray(arr) ? arr : []);
    } catch (_) { return new Set(); }
  }
  saveRead() {
    try { localStorage.setItem('lq_seerah_read', JSON.stringify([...this.read])); } catch (_) { /* ignore */ }
  }

  loadQuizBest() {
    try { const n = parseInt(localStorage.getItem('lq_seerah_quiz_best'), 10); return isNaN(n) ? 0 : n; } catch (_) { return 0; }
  }
  saveQuizBest() {
    try { localStorage.setItem('lq_seerah_quiz_best', String(this.quizBest)); } catch (_) { /* ignore */ }
  }

  loadStoryPos() {
    try {
      const n = parseInt(localStorage.getItem('lq_seerah_story_pos'), 10);
      if (isNaN(n) || n < 0) return 0;
      return Math.min(n, SEERAH_ERAS.length - 1);
    } catch (_) { return 0; }
  }
  saveStoryPos() {
    try { localStorage.setItem('lq_seerah_story_pos', String(this.storyPos)); } catch (_) { /* ignore */ }
  }

  matches(ev) {
    if (this.filter !== 'all' && ev.era !== this.filter) return false;
    const q = this.query.trim().toLowerCase();
    if (!q) return true;
    const hay = [
      this.pick(ev, 'title'), this.pick(ev, 'place'), this.pick(ev, 'desc'),
      ev.titleEn, ev.titleBn, ev.yearCE, ev.yearAH,
    ].join(' ').toLowerCase();
    return hay.indexOf(q) !== -1;
  }

  // ── rendering ────────────────────────────────────────────────────────
  render() {
    this.rendered = true;
    const total = SEERAH_EVENTS.length;
    const readCount = SEERAH_EVENTS.filter(ev => this.read.has(ev.id)).length;
    const pct = total ? Math.round((readCount / total) * 100) : 0;

    const chips = [{ id: 'all', key: 'seerah_filter_all', emoji: '📜' }]
      .concat(SEERAH_ERAS.map(er => ({ id: er.id, key: er.key, emoji: er.emoji })))
      .map(c => {
        const active = this.filter === c.id;
        return `<button type="button" data-seerah-filter="${c.id}"
          class="px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap border transition-colors
                 ${active
                   ? 'bg-primary text-white border-primary'
                   : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-primary'}">
          <span aria-hidden="true">${c.emoji}</span> ${this.esc(this.tt(c.key))}</button>`;
      }).join('');

    const vbtn = (id, icon, label) => {
      const active = this.view === id;
      return `<button type="button" data-seerah-view="${id}"
        class="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors
               ${active ? 'bg-white dark:bg-gray-700 text-primary shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}">
        <span aria-hidden="true">${icon}</span>${this.esc(label)}</button>`;
    };
    const toggle = `
      <div class="flex justify-center mb-4">
        <div class="inline-flex gap-1 p-1 rounded-xl bg-gray-100 dark:bg-gray-800">
          ${vbtn('timeline', SEERAH_TIMELINE_ICON, this.tt('seerah_view_timeline'))}
          ${vbtn('story', SEERAH_STORY_ICON, this.tt('seerah_view_story'))}
          ${vbtn('topics', SEERAH_TOPICS_ICON, this.tt('seerah_view_topics'))}
          ${vbtn('quiz', SEERAH_QUIZ_ICON, this.tt('seerah_view_quiz'))}
        </div>
      </div>`;

    const timelineBody = `
      ${this.glanceHtml()}
      <div class="mb-3">
        <div class="flex items-center justify-between gap-2 mb-1">
          <span class="text-xs font-medium text-gray-500 dark:text-gray-400">${this.esc(this.tt('seerah_progress'))}</span>
          <span class="text-xs font-semibold text-primary" data-seerah-count>${readCount} / ${total}</span>
        </div>
        <div class="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
          <div data-seerah-bar class="h-full bg-primary transition-all" style="width:${pct}%"></div>
        </div>
      </div>

      <div class="mb-3">
        <input type="search" data-seerah-search value="${this.esc(this.query)}"
          placeholder="${this.esc(this.tt('seerah_search_placeholder'))}"
          class="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800
                 text-sm text-gray-800 dark:text-gray-100 focus:outline-none focus:border-primary" dir="auto" />
      </div>

      <div class="flex gap-2 overflow-x-auto pb-2 mb-4 -mx-1 px-1">${chips}</div>

      <div data-seerah-list></div>

      <div class="text-center mt-6 mb-8">
        <button type="button" data-seerah-reset
          class="text-xs text-gray-400 dark:text-gray-500 hover:text-red-500 underline">
          ${this.esc(this.tt('seerah_reset_progress'))}
        </button>
      </div>`;

    const topicsBody = `
      <div class="text-center mb-4">
        <p class="text-xs text-gray-400 dark:text-gray-500" dir="auto">${this.esc(this.tt('seerah_topics_intro'))}</p>
      </div>
      <div class="space-y-3 mb-6">
        ${SEERAH_TOPICS.map(tp => this.topicCardHtml(tp)).join('')}
      </div>
      ${this.lessonsHtml()}
      ${this.meccanMedinanHtml()}
      ${this.companionsHtml()}
      ${this.placesHtml()}`;

    const subtitleLine = this.view === 'topics'
      ? this.tt('seerah_topics_title')
      : (this.view === 'quiz' ? this.tt('seerah_quiz_title')
        : (this.view === 'story' ? this.tt('seerah_story_title') : this.tt('seerah_intro')));

    let body = timelineBody;
    if (this.view === 'topics') body = topicsBody;
    else if (this.view === 'quiz') body = this.quizHtml();
    else if (this.view === 'story') body = this.storyHtml();

    this.container.innerHTML = `
      <div class="w-full max-w-3xl mx-auto">
        <div class="text-center mb-3">
          <h2 class="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100">🌙 ${this.esc(this.tt('seerah_title'))}</h2>
          <p class="text-gray-500 dark:text-gray-400 text-sm mt-1">${this.esc(this.tt('seerah_subtitle'))}</p>
          <p class="text-xs text-gray-400 dark:text-gray-500 mt-2" dir="auto">${this.esc(subtitleLine)}</p>
        </div>
        ${toggle}
        ${body}
      </div>`;

    if (this.view === 'timeline') this.renderList();
    this.bind();
  }

  /**
   * Abstract, stylized Hijra route map (geometric only — points, a dashed route
   * curve, a coastline line; no figures). Theme-aware via currentColor; the
   * route itself is green, points labelled. Nothing is to scale.
   */
  hijraMapHtml() {
    const L = {
      mecca: this.lc({ en: 'Mecca', bn: 'মক্কা' }),
      thawr: this.lc({ en: 'Cave of Thawr', bn: 'সাওর গুহা' }),
      quba: this.lc({ en: 'Quba', bn: 'কুবা' }),
      medina: this.lc({ en: 'Medina', bn: 'মদিনা' }),
      sea: this.lc({ en: 'Red Sea', bn: 'লোহিত সাগর' }),
      dist: '~450 km',
    };
    const G = '#16a34a';
    const svg = `
      <svg viewBox="0 0 320 200" width="100%" style="max-width:340px;height:auto;display:block;margin:0 auto" role="img" aria-label="Abstract Hijra route map">
        <rect x="0" y="0" width="320" height="200" rx="8" fill="currentColor" opacity="0.04"/>
        <path d="M28 200 C 20 150, 30 90, 18 40 L 0 30 L 0 200 Z" fill="currentColor" opacity="0.08"/>
        <path d="M28 200 C 20 150, 30 90, 18 40" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>
        <text x="14" y="120" font-size="8" fill="currentColor" opacity="0.6" transform="rotate(-80 14 120)">${this.esc(L.sea)}</text>
        <circle cx="238" cy="168" r="6" fill="none" stroke="currentColor" stroke-width="1.6"/>
        <rect x="234.5" y="164.5" width="7" height="7" fill="currentColor"/>
        <text x="252" y="172" font-size="10" font-weight="600" fill="currentColor">${this.esc(L.mecca)}</text>
        <path d="M252 186 a6 6 0 1 0 6 -8" fill="none" stroke="currentColor" stroke-width="1.6"/>
        <text x="264" y="194" font-size="9" fill="currentColor" opacity="0.85">${this.esc(L.thawr)}</text>
        <circle cx="216" cy="46" r="3.5" fill="${G}"/>
        <text x="224" y="42" font-size="9" fill="currentColor" opacity="0.85">${this.esc(L.quba)}</text>
        <circle cx="232" cy="24" r="6" fill="none" stroke="${G}" stroke-width="1.8"/>
        <circle cx="232" cy="24" r="2.2" fill="${G}"/>
        <text x="244" y="28" font-size="10" font-weight="600" fill="currentColor">${this.esc(L.medina)}</text>
        <path d="M238 174 C 244 184, 252 186, 256 182" fill="none" stroke="${G}" stroke-width="2" stroke-dasharray="5 4" stroke-linecap="round"/>
        <path d="M256 182 C 200 178, 120 150, 84 112 C 60 84, 120 60, 216 46 L 230 30"
              fill="none" stroke="${G}" stroke-width="2" stroke-dasharray="5 4" stroke-linecap="round"/>
        <polygon points="232,27 226,36 236,35" fill="${G}"/>
        <text x="104" y="100" font-size="9" font-weight="600" fill="${G}">${this.esc(L.dist)}</text>
      </svg>`;
    return `
      <figure class="mt-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 text-gray-500 dark:text-gray-400">
        <figcaption class="mb-1 text-xs font-semibold text-gray-600 dark:text-gray-300 text-center" dir="auto">🧭 ${this.esc(this.tt('seerah_route_title'))}</figcaption>
        <div class="w-full overflow-x-auto">${svg}</div>
        <figcaption class="mt-1 text-[0.68rem] text-center text-gray-400 dark:text-gray-500" dir="auto">${this.esc(this.tt('seerah_route_caption'))}</figcaption>
      </figure>`;
  }

  placesHtml() {
    return `
      <section class="mb-8">
        <h3 class="flex items-center gap-2 text-base font-bold text-gray-700 dark:text-gray-200 mb-3">
          <span class="text-primary" aria-hidden="true">${SEERAH_PIN_ICON}</span><span>${this.esc(this.tt('seerah_places_title'))}</span>
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          ${SEERAH_PLACES.map(p => `
            <div class="flex gap-2.5 items-start p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <span class="shrink-0 mt-0.5 text-primary" aria-hidden="true">${SEERAH_PIN_ICON}</span>
              <span class="flex-1 min-w-0">
                <span class="block font-semibold text-sm text-gray-800 dark:text-gray-100" dir="auto">${this.esc(this.pick(p, 'name'))}</span>
                <span class="block text-xs text-gray-500 dark:text-gray-400 leading-relaxed mt-0.5" dir="auto">${this.esc(this.pick(p, 'desc'))}</span>
              </span>
            </div>`).join('')}
        </div>
      </section>`;
  }

  companionsHtml() {
    return `
      <section class="mb-8">
        <h3 class="flex items-center gap-2 text-base font-bold text-gray-700 dark:text-gray-200 mb-3">
          <span class="text-primary" aria-hidden="true">🤝</span><span>${this.esc(this.tt('seerah_companions_title'))}</span>
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          ${SEERAH_COMPANIONS.map(c => `
            <div class="flex gap-3 items-start p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <span class="shrink-0 w-9 h-9 rounded-full ${c.color} text-white text-xs font-bold flex items-center justify-center" aria-hidden="true">${this.esc(c.init)}</span>
              <span class="flex-1 min-w-0">
                <span class="block font-semibold text-sm text-gray-800 dark:text-gray-100" dir="auto">${this.esc(this.pick(c, 'name'))}</span>
                <span class="block text-xs text-gray-500 dark:text-gray-400 leading-relaxed mt-0.5" dir="auto">${this.esc(this.pick(c, 'desc'))}</span>
              </span>
            </div>`).join('')}
        </div>
        ${this.asharaHtml()}
      </section>`;
  }

  /**
   * The Ten Promised Paradise (al-‘Ashara al-Mubashshara, RA) — a compact,
   * labelled sub-list rendered inside the Key Companions section. Numbered chips
   * only (no figurative imagery); content routed through lc().
   */
  asharaHtml() {
    return `
      <div class="mt-5 pt-4 border-t border-gray-200 dark:border-gray-700">
        <h4 class="flex items-baseline gap-2 flex-wrap text-sm font-bold text-gray-700 dark:text-gray-200 mb-3">
          <span aria-hidden="true">🌟</span>
          <span dir="auto">${this.esc(this.tt('seerah_ashara_title'))}</span>
          <span class="text-[0.7rem] font-medium text-gray-400 dark:text-gray-500" dir="auto">${this.esc(this.tt('seerah_ashara_sub'))}</span>
        </h4>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
          ${SEERAH_ASHARA.map((c, i) => `
            <div class="flex gap-2.5 items-start p-2.5 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
              <span class="shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-[0.7rem] font-bold flex items-center justify-center" aria-hidden="true">${i + 1}</span>
              <span class="flex-1 min-w-0">
                <span class="block font-semibold text-[0.8rem] text-gray-800 dark:text-gray-100" dir="auto">${this.esc(this.pick(c, 'name'))}</span>
                <span class="block text-[0.72rem] text-gray-500 dark:text-gray-400 leading-relaxed mt-0.5" dir="auto">${this.esc(this.pick(c, 'desc'))}</span>
              </span>
            </div>`).join('')}
        </div>
      </div>`;
  }

  /**
   * Lessons from the Seerah — thematic lessons distilled from the timeline. Each
   * links to its source event (scrolls/filters not needed; shown as a label) and,
   * where clean, a tappable verse pill (reusing the shared data-seerah-ayah click).
   */
  lessonsHtml() {
    const eventTitle = (id) => {
      const ev = SEERAH_EVENTS.find(e => e.id === id);
      return ev ? this.pick(ev, 'title') : '';
    };
    return `
      <section class="mb-8">
        <h3 class="flex items-center gap-2 text-base font-bold text-gray-700 dark:text-gray-200 mb-1">
          <span class="text-primary" aria-hidden="true">💡</span><span>${this.esc(this.tt('seerah_lessons_title'))}</span>
        </h3>
        <p class="text-xs text-gray-400 dark:text-gray-500 mb-3" dir="auto">${this.esc(this.tt('seerah_lessons_intro'))}</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          ${SEERAH_LESSONS.map(ls => {
            const evTitle = eventTitle(ls.event);
            const evPill = evTitle
              ? `<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300 text-[0.68rem]" dir="auto">📍 ${this.esc(evTitle)}</span>`
              : '';
            const ayahPill = ls.ayah
              ? `<button type="button" data-seerah-ayah="${this.esc(ls.ayah)}"
                   class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[0.68rem] font-medium hover:bg-primary hover:text-white transition-colors">📖 ${this.esc(ls.ayah)}</button>`
              : '';
            return `
              <div class="flex flex-col gap-2 p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <div class="flex gap-2.5 items-start">
                  <span class="shrink-0 text-lg leading-none mt-0.5" aria-hidden="true">${this.esc(ls.emoji)}</span>
                  <span class="flex-1 text-sm text-gray-700 dark:text-gray-200 leading-relaxed" dir="auto">${this.esc(this.lc({ en: ls.textEn, bn: ls.textBn }))}</span>
                </div>
                <div class="flex flex-wrap gap-1.5 pl-8">${evPill}${ayahPill}</div>
              </div>`;
          }).join('')}
        </div>
      </section>`;
  }

  /**
   * Meccan vs Medinan mini-reference — a two-column card contrasting the two
   * phases of revelation, each with a short description and example-surah pills
   * (tappable, reusing the shared data-seerah-ayah click). Introductory only.
   */
  meccanMedinanHtml() {
    const col = (labelKey, data) => `
      <div class="flex-1 min-w-0 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
        <h4 class="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-200 mb-1.5">
          <span aria-hidden="true">${this.esc(data.emoji)}</span><span dir="auto">${this.esc(this.tt(labelKey))}</span>
        </h4>
        <p class="text-xs text-gray-600 dark:text-gray-300 leading-relaxed" dir="auto">${this.esc(this.lc({ en: data.descEn, bn: data.descBn }))}</p>
        <div class="mt-2">
          <span class="text-[0.68rem] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">${this.esc(this.tt('seerah_mm_examples'))}</span>
          <div class="flex flex-wrap gap-1.5 mt-1">
            ${(data.examples || []).map(x => `<button type="button" data-seerah-ayah="${this.esc(x.ref)}"
              class="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium hover:bg-primary hover:text-white transition-colors" dir="auto">📖 ${this.esc(this.pick(x, 'name'))}</button>`).join('')}
          </div>
        </div>
      </div>`;
    return `
      <section class="mb-8">
        <h3 class="flex items-center gap-2 text-base font-bold text-gray-700 dark:text-gray-200 mb-1">
          <span class="text-primary" aria-hidden="true">📖</span><span>${this.esc(this.tt('seerah_mm_title'))}</span>
        </h3>
        <p class="text-xs text-gray-400 dark:text-gray-500 mb-3" dir="auto">${this.esc(this.tt('seerah_mm_intro'))}</p>
        <div class="flex flex-col sm:flex-row gap-2.5">
          ${col('seerah_mm_meccan', SEERAH_MECCAN_MEDINAN.meccan)}
          ${col('seerah_mm_medinan', SEERAH_MECCAN_MEDINAN.medinan)}
        </div>
      </section>`;
  }

  /**
   * "Seerah at a glance" — a compact bilingual stat strip derived from existing
   * data. Prophethood ≈ 23 years (Meccan 13 + Medinan 10); the battle count is
   * read from SEERAH_BATTLES so it stays in sync with the data.
   */
  glanceHtml() {
    const battleCount = Object.keys(SEERAH_BATTLES).length;
    const yr = this.esc(this.tt('seerah_glance_years'));
    const tiles = [
      { emoji: '📜', value: `~23 <span class="text-[0.6rem] font-normal opacity-70">${yr}</span>`, label: this.tt('seerah_glance_prophethood'), text: 'text-primary' },
      { emoji: '🕋', value: `13 <span class="text-[0.6rem] font-normal opacity-70">${yr}</span>`, label: this.tt('seerah_glance_meccan'), text: 'text-rose-500' },
      { emoji: '🌿', value: `10 <span class="text-[0.6rem] font-normal opacity-70">${yr}</span>`, label: this.tt('seerah_glance_medinan'), text: 'text-emerald-500' },
      { emoji: '🛡️', value: String(battleCount), label: this.tt('seerah_glance_battles'), text: 'text-indigo-500' },
    ];
    return `
      <section class="mb-4" aria-label="${this.esc(this.tt('seerah_glance_title'))}">
        <h3 class="sr-only">${this.esc(this.tt('seerah_glance_title'))}</h3>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
          ${tiles.map(s => `
            <div class="flex flex-col items-center text-center gap-0.5 p-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <span class="text-lg leading-none" aria-hidden="true">${s.emoji}</span>
              <span class="text-base font-bold ${s.text}">${s.value}</span>
              <span class="text-[0.65rem] leading-tight text-gray-500 dark:text-gray-400" dir="auto">${this.esc(s.label)}</span>
            </div>`).join('')}
        </div>
      </section>`;
  }

  /**
   * Story mode — a continuous read of every timeline event, one era at a time,
   * reusing each event's existing title/description text (no new prose). Prev/next
   * move between eras; the current era index is saved to localStorage so the
   * reader can resume where they left off.
   */
  storyHtml() {
    const eras = SEERAH_ERAS;
    if (this.storyPos >= eras.length) this.storyPos = eras.length - 1;
    if (this.storyPos < 0) this.storyPos = 0;
    const era = eras[this.storyPos];
    const em = ERA_META[era.id] || {};
    const events = SEERAH_EVENTS.filter(ev => ev.era === era.id);
    const pct = eras.length ? Math.round(((this.storyPos + 1) / eras.length) * 100) : 0;

    const passages = events.map(ev => {
      const year = [ev.yearCE, ev.yearAH].filter(Boolean).join(' · ');
      return `
        <div class="mb-5">
          <h4 class="flex items-baseline gap-2 flex-wrap font-semibold text-gray-800 dark:text-gray-100 leading-snug" dir="auto">
            <span>${this.esc(this.pick(ev, 'title'))}</span>
            <span class="text-[0.7rem] font-medium text-gray-400 dark:text-gray-500 whitespace-nowrap">${this.esc(year)}</span>
          </h4>
          <p class="mt-1 text-sm text-gray-600 dark:text-gray-300 leading-relaxed" dir="auto">${this.esc(this.pick(ev, 'desc'))}</p>
        </div>`;
    }).join('');

    const atStart = this.storyPos <= 0;
    const atEnd = this.storyPos >= eras.length - 1;
    const navBtn = (dir, label, disabled) =>
      `<button type="button" data-seerah-story-nav="${dir}" ${disabled ? 'disabled' : ''}
        class="px-4 py-2 rounded-lg text-sm font-medium transition-colors ${disabled
          ? 'bg-gray-100 dark:bg-gray-800 text-gray-300 dark:text-gray-600 cursor-not-allowed'
          : 'bg-primary text-white hover:opacity-90'}">${this.esc(label)}</button>`;

    return `
      <div class="text-center mb-4">
        <p class="text-xs text-gray-400 dark:text-gray-500" dir="auto">${this.esc(this.tt('seerah_story_intro'))}</p>
      </div>
      <div class="mb-3">
        <div class="flex items-center justify-between gap-2 mb-1">
          <span class="text-xs font-medium text-gray-500 dark:text-gray-400">${this.esc(this.tt('seerah_story_progress'))}</span>
          <span class="text-xs font-semibold text-primary">${this.storyPos + 1} / ${eras.length}</span>
        </div>
        <div class="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
          <div class="h-full bg-primary transition-all" style="width:${pct}%"></div>
        </div>
      </div>
      <article class="rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm p-4 sm:p-5">
        <h3 class="flex items-center gap-2 text-base font-bold text-gray-700 dark:text-gray-200 mb-4">
          <span class="${em.text || ''}" aria-hidden="true">${em.icon || '<span>' + this.esc(era.emoji) + '</span>'}</span>
          <span dir="auto">${this.esc(this.tt(era.key))}</span>
        </h3>
        ${passages}
        ${atEnd ? `<p class="mt-2 text-xs italic text-gray-400 dark:text-gray-500" dir="auto">🤲 ${this.esc(this.tt('seerah_story_finish'))}</p>` : ''}
      </article>
      <div class="flex items-center justify-between gap-2 mt-4 mb-8">
        ${navBtn('prev', '‹ ' + this.tt('seerah_story_prev'), atStart)}
        ${navBtn('next', this.tt('seerah_story_next') + ' ›', atEnd)}
      </div>`;
  }

  quizHtml() {
    const submitted = this.quizSubmitted;
    const total = SEERAH_QUIZ.length;
    let score = 0;
    const answeredAll = SEERAH_QUIZ.every((_, qi) => this.quizAnswers[qi] != null);

    const questions = SEERAH_QUIZ.map((q, qi) => {
      const sel = this.quizAnswers[qi];
      const opts = (q.optsEn || q.optsBn || []).map((_, oi2) => this.lc({ en: (q.optsEn || [])[oi2], bn: (q.optsBn || [])[oi2] }));
      if (submitted && sel === q.correct) score++;
      const optHtml = opts.map((o, oi) => {
        const chosen = sel === oi;
        let cls = 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:border-primary';
        let mark = '';
        if (submitted) {
          if (oi === q.correct) { cls = 'bg-green-50 dark:bg-green-900/20 border-green-400 dark:border-green-700 text-green-700 dark:text-green-300'; mark = ' ✓'; }
          else if (chosen) { cls = 'bg-red-50 dark:bg-red-900/20 border-red-400 dark:border-red-700 text-red-700 dark:text-red-300'; mark = ' ✗'; }
          else { cls = 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500'; }
        } else if (chosen) {
          cls = 'bg-primary/10 border-primary text-primary';
        }
        return `<button type="button" ${submitted ? 'disabled' : ''} data-seerah-quiz-opt="${qi}:${oi}"
          class="w-full text-left px-3 py-2 rounded-lg border text-sm transition-colors ${cls}" dir="auto">${this.esc(o)}${mark}</button>`;
      }).join('');
      return `
        <div class="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
          <p class="font-semibold text-sm text-gray-800 dark:text-gray-100 mb-2" dir="auto">${qi + 1}. ${this.esc(this.lc({ en: q.qEn, bn: q.qBn }))}</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">${optHtml}</div>
        </div>`;
    }).join('');

    const footer = submitted
      ? `<div class="text-center mt-4 mb-8">
           <div class="inline-flex flex-col items-center gap-1 px-6 py-4 rounded-xl bg-primary/10">
             <span class="text-sm text-gray-500 dark:text-gray-400">${this.esc(this.tt('seerah_quiz_score'))}</span>
             <span class="text-3xl font-bold text-primary">${score} / ${total}</span>
             <span class="text-xs text-gray-500 dark:text-gray-400">${this.esc(this.tt('seerah_quiz_best'))}: ${Math.max(this.quizBest, score)} / ${total}</span>
           </div>
           <div class="mt-3">
             <button type="button" data-seerah-quiz-reset
               class="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:opacity-90">${this.esc(this.tt('seerah_quiz_retake'))}</button>
           </div>
         </div>`
      : `<div class="text-center mt-4 mb-8">
           <button type="button" data-seerah-quiz-submit ${answeredAll ? '' : 'disabled'}
             class="px-5 py-2 rounded-lg text-sm font-medium transition-colors ${answeredAll ? 'bg-primary text-white hover:opacity-90' : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'}">${this.esc(this.tt('seerah_quiz_submit'))}</button>
           ${answeredAll ? '' : `<p class="text-xs text-gray-400 dark:text-gray-500 mt-2">${this.esc(this.tt('seerah_quiz_hint'))}</p>`}
         </div>`;

    return `
      <div class="text-center mb-4">
        <p class="text-xs text-gray-400 dark:text-gray-500" dir="auto">${this.esc(this.tt('seerah_quiz_intro'))}
          <span class="ml-1">· ${this.esc(this.tt('seerah_quiz_best'))}: ${this.quizBest} / ${total}</span></p>
      </div>
      <div class="space-y-3">${questions}</div>
      ${footer}`;
  }

  submitQuiz() {
    let score = 0;
    SEERAH_QUIZ.forEach((q, qi) => { if (this.quizAnswers[qi] === q.correct) score++; });
    this.quizScore = score;
    if (score > this.quizBest) { this.quizBest = score; this.saveQuizBest(); }
    this.quizSubmitted = true;
    this.render();
  }

  topicCardHtml(tp) {
    const isOpen = this.expanded.has(tp.id);
    const points = (tp.pointsEn || tp.pointsBn || []).map((_, pi) => this.lc({ en: (tp.pointsEn || [])[pi], bn: (tp.pointsBn || [])[pi] }));
    const verses = Array.isArray(tp.verses) ? tp.verses : [];
    const pointsHtml = points.length
      ? `<ul class="mt-2 space-y-1 list-none">
           ${points.map(p => `<li class="flex gap-2 text-sm text-gray-700 dark:text-gray-200" dir="auto"><span class="text-primary mt-0.5" aria-hidden="true">▸</span><span class="flex-1">${this.esc(p)}</span></li>`).join('')}
         </ul>`
      : '';
    const versesHtml = verses.length
      ? `<div class="pt-3"><span class="text-[0.7rem] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">${this.esc(this.tt('seerah_bt_verses'))}</span>
           <div class="flex flex-wrap gap-1.5 mt-1">
             ${verses.map(v => `<button type="button" data-seerah-ayah="${this.esc(v)}"
               class="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium hover:bg-primary hover:text-white transition-colors">
               📖 ${this.esc(v)}</button>`).join('')}
           </div>
         </div>`
      : '';
    return `
      <article class="rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
        <button type="button" data-seerah-toggle="${this.esc(tp.id)}"
          class="w-full text-left p-4 flex items-center gap-3">
          <span class="text-2xl" aria-hidden="true">${this.esc(tp.emoji)}</span>
          <span class="flex-1 font-semibold text-gray-800 dark:text-gray-100 leading-snug" dir="auto">${this.esc(this.pick(tp, 'title'))}</span>
          <span class="text-gray-300 dark:text-gray-500 text-sm" data-seerah-caret="${this.esc(tp.id)}">${isOpen ? '▲' : '▼'}</span>
        </button>
        <div data-seerah-detail="${this.esc(tp.id)}" class="${isOpen ? '' : 'hidden'} px-4 pb-4 -mt-1">
          <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed" dir="auto">${this.esc(this.pick(tp, 'summary'))}</p>
          ${pointsHtml ? `<div class="mt-2"><span class="text-[0.7rem] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">${this.esc(this.tt('seerah_key_points'))}</span>${pointsHtml}</div>` : ''}
          ${versesHtml}
        </div>
      </article>`;
  }

  renderList() {
    const listEl = this.container.querySelector('[data-seerah-list]');
    if (!listEl) return;
    const eras = this.filter === 'all' ? SEERAH_ERAS : SEERAH_ERAS.filter(e => e.id === this.filter);
    let html = '';
    let shown = 0;

    eras.forEach(era => {
      const events = SEERAH_EVENTS.filter(ev => ev.era === era.id && this.matches(ev));
      if (!events.length) return;
      shown += events.length;
      const em = ERA_META[era.id] || {};
      html += `
        <section class="mb-6">
          <h3 class="flex items-center gap-2 text-base font-bold text-gray-700 dark:text-gray-200 mb-3
                     sticky top-0 bg-gray-50/90 dark:bg-gray-900/90 backdrop-blur py-1 z-10">
            <span class="${em.text || ''}" aria-hidden="true">${em.icon || '<span>' + this.esc(era.emoji) + '</span>'}</span><span>${this.esc(this.tt(era.key))}</span>
          </h3>
          <div class="relative pl-5 border-l-2 border-gray-200 dark:border-gray-700 space-y-3">
            ${events.map(ev => this.cardHtml(ev)).join('')}
          </div>
        </section>`;
    });

    if (!shown) {
      html = `<p class="text-center text-gray-400 dark:text-gray-500 text-sm py-10">${this.esc(this.tt('seerah_no_results'))}</p>`;
    }
    listEl.innerHTML = html;
  }

  cardHtml(ev) {
    const isRead = this.read.has(ev.id);
    const isOpen = this.expanded.has(ev.id);
    const year = [ev.yearCE, ev.yearAH].filter(Boolean).join(' · ');
    const em = ERA_META[ev.era] || {};
    const battle = SEERAH_BATTLES[ev.id] || null;
    const ayahBtn = (ev.ayah && !battle)
      ? `<button type="button" data-seerah-ayah="${this.esc(ev.ayah)}"
           class="inline-flex items-center gap-1 mt-2 text-xs text-primary hover:underline">
           📖 ${this.esc(this.tt('seerah_open_ayah'))} (${this.esc(ev.ayah)})</button>`
      : '';
    const battleBadge = battle
      ? `<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-red-500/10 text-red-500 text-[0.7rem] font-semibold whitespace-nowrap">${SEERAH_BATTLE_ICON}${this.esc(this.tt('seerah_bt_label'))}</span>`
      : '';
    return `
      <article data-seerah-card="${this.esc(ev.id)}"
        class="relative rounded-xl bg-white dark:bg-gray-800 border ${isRead ? 'border-green-300 dark:border-green-800' : 'border-gray-200 dark:border-gray-700'} shadow-sm">
        <span class="absolute -left-[1.65rem] top-4 w-3 h-3 rounded-full ${isRead ? 'bg-green-500' : (em.dot || 'bg-primary')} ring-4 ring-gray-50 dark:ring-gray-900" aria-hidden="true"></span>
        <button type="button" data-seerah-toggle="${this.esc(ev.id)}"
          class="w-full text-left p-4 flex flex-col gap-1.5">
          <span class="flex items-center gap-2 flex-wrap">
            <span class="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[0.7rem] font-semibold whitespace-nowrap">${this.esc(year)}</span>
            <span class="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300 text-[0.7rem] whitespace-nowrap">📍 ${this.esc(this.pick(ev, 'place'))}</span>
            ${battleBadge}
            ${isRead ? '<span class="text-green-500 text-xs">✓</span>' : ''}
          </span>
          <span class="flex items-start gap-2">
            <span class="flex-1 font-semibold text-gray-800 dark:text-gray-100 leading-snug" dir="auto">${this.esc(this.pick(ev, 'title'))}</span>
            <span class="text-gray-300 dark:text-gray-500 text-sm mt-0.5" data-seerah-caret="${this.esc(ev.id)}">${isOpen ? '▲' : '▼'}</span>
          </span>
        </button>
        <div data-seerah-detail="${this.esc(ev.id)}" class="${isOpen ? '' : 'hidden'} px-4 pb-4 -mt-1">
          <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed" dir="auto">${this.esc(this.pick(ev, 'desc'))}</p>
          <div class="mt-2 p-2.5 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/40">
            <p class="text-xs text-amber-800 dark:text-amber-200 leading-relaxed" dir="auto">
              <span class="font-semibold">💡 ${this.esc(this.tt('seerah_significance'))}:</span> ${this.esc(this.pick(ev, 'lesson'))}
            </p>
          </div>
          ${ayahBtn}
          ${ev.id === 'hijra' ? this.hijraMapHtml() : ''}
          ${battle ? this.battleHtml(ev, battle) : ''}
          <div class="mt-3 flex flex-wrap items-center gap-2">
            <button type="button" data-seerah-read="${this.esc(ev.id)}"
              class="text-xs px-3 py-1.5 rounded-lg font-medium transition-colors
                     ${isRead
                       ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                       : 'bg-primary text-white hover:opacity-90'}">
              ${isRead ? '✓ ' + this.esc(this.tt('seerah_marked_read')) : this.esc(this.tt('seerah_mark_read'))}
            </button>
            <button type="button" data-seerah-share="${this.esc(ev.id)}"
              class="text-xs px-3 py-1.5 rounded-lg font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:border-primary border border-transparent transition-colors">
              🔗 ${this.esc(this.tt('seerah_share'))}
            </button>
            <button type="button" data-seerah-copy="${this.esc(ev.id)}"
              class="text-xs px-3 py-1.5 rounded-lg font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:border-primary border border-transparent transition-colors">
              📋 ${this.esc(this.tt('seerah_copy'))}
            </button>
          </div>
        </div>
      </article>`;
  }

  // Build a short shareable text from an event's existing title/desc/year.
  buildShareText(ev) {
    if (!ev) return '';
    const year = [ev.yearCE, ev.yearAH].filter(Boolean).join(' · ');
    const title = this.pick(ev, 'title');
    const desc = this.pick(ev, 'desc');
    return [title + (year ? ` (${year})` : ''), desc].filter(Boolean).join('\n\n');
  }

  shareEvent(id) {
    const ev = SEERAH_EVENTS.find(x => x.id === id);
    if (!ev) return;
    const text = this.buildShareText(ev);
    const title = this.pick(ev, 'title');
    try {
      if (navigator && typeof navigator.share === 'function') {
        navigator.share({ title: title, text: text }).catch(() => {});
        return;
      }
    } catch (_) { /* fall through to clipboard */ }
    this.copyEvent(id);
  }

  copyEvent(id) {
    const ev = SEERAH_EVENTS.find(x => x.id === id);
    if (!ev) return;
    const text = this.buildShareText(ev);
    const done = () => this.flashCopied(id);
    try {
      if (navigator && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        navigator.clipboard.writeText(text).then(done).catch(() => this.legacyCopy(text, done));
        return;
      }
    } catch (_) { /* fall through */ }
    this.legacyCopy(text, done);
  }

  legacyCopy(text, done) {
    try {
      const ta = document.createElement('textarea');
      ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.focus(); ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      if (typeof done === 'function') done();
    } catch (_) { /* ignore */ }
  }

  // Briefly show "Copied!" on the copy button for this event.
  flashCopied(id) {
    try {
      const btn = this.container.querySelector(`[data-seerah-copy="${CSS && CSS.escape ? CSS.escape(id) : id}"]`);
      if (!btn) return;
      const orig = btn.innerHTML;
      btn.innerHTML = '✓ ' + this.esc(this.tt('seerah_copied'));
      setTimeout(() => { try { btn.innerHTML = orig; } catch (_) { /* ignore */ } }, 1500);
    } catch (_) { /* ignore */ }
  }

  // ── battlefield block ────────────────────────────────────────────────
  bpick(b, field) {
    return this.lc({ en: b[field + 'En'], bn: b[field + 'Bn'] });
  }

  battleHtml(ev, b) {
    if (!b) return '';
    const row = (label, value) => value
      ? `<div class="flex flex-col sm:flex-row sm:gap-2 py-1.5 border-b border-gray-100 dark:border-gray-700/60 last:border-0">
           <span class="w-32 shrink-0 text-[0.7rem] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">${this.esc(label)}</span>
           <span class="flex-1 text-sm text-gray-700 dark:text-gray-200" dir="auto">${value}</span>
         </div>`
      : '';

    const forces = `
      <span class="inline-flex items-center gap-1">
        <span class="w-2.5 h-2.5 rounded-sm bg-green-600 inline-block" aria-hidden="true"></span>
        ${this.esc(this.tt('seerah_bt_muslims'))}: <strong>${this.esc(b.muslims || '—')}</strong>
      </span>
      <span class="mx-1 text-gray-400">·</span>
      <span class="inline-flex items-center gap-1">
        <span class="w-2.5 h-2.5 rounded-sm bg-red-600 inline-block" aria-hidden="true"></span>
        ${this.esc(this.bpick(b, 'opp'))}: <strong>${this.esc(b.opp || '—')}</strong>
      </span>`;

    const cmd = `
      <div><span class="text-green-600 dark:text-green-400 font-medium">${this.esc(this.tt('seerah_bt_muslims'))}:</span> ${this.esc(this.bpick(b, 'cmdM'))}</div>
      <div class="mt-0.5"><span class="text-red-600 dark:text-red-400 font-medium">${this.esc(this.tt('seerah_bt_opponent'))}:</span> ${this.esc(this.bpick(b, 'cmdO'))}</div>`;

    const moments = (b.momEn || b.momBn || []).map((_, mi) => this.lc({ en: (b.momEn || [])[mi], bn: (b.momBn || [])[mi] }));
    const momentsHtml = moments.length
      ? `<ul class="mt-1 space-y-1 list-none">
           ${moments.map(m => `<li class="flex gap-2 text-sm text-gray-700 dark:text-gray-200" dir="auto"><span class="text-primary mt-0.5" aria-hidden="true">▸</span><span class="flex-1">${this.esc(m)}</span></li>`).join('')}
         </ul>`
      : '';

    const verses = Array.isArray(b.verses) ? b.verses : [];
    const versesHtml = verses.length
      ? `<div class="flex flex-wrap gap-1.5 mt-1">
           ${verses.map(v => `<button type="button" data-seerah-ayah="${this.esc(v)}"
             class="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium hover:bg-primary hover:text-white transition-colors">
             📖 ${this.esc(v)}</button>`).join('')}
         </div>`
      : '';

    const diagram = this.battleDiagram(b.diagram);
    const caption = b.diagram ? this.bpick(b.diagram, 'caption') : '';

    return `
      <div class="mt-3 rounded-xl border border-red-100 dark:border-red-900/40 bg-red-50/40 dark:bg-red-900/10 overflow-hidden">
        <div class="flex items-center gap-2 px-3 py-2 bg-red-500/10 text-red-600 dark:text-red-400 font-semibold text-sm">
          <span aria-hidden="true">${SEERAH_BATTLE_ICON}</span>${this.esc(this.tt('seerah_bt_label'))}
        </div>
        <div class="p-3">
          ${row(this.tt('seerah_bt_location'), this.esc(this.bpick(b, 'geo')))}
          ${row(this.tt('seerah_bt_forces'), forces)}
          ${row(this.tt('seerah_bt_commanders'), cmd)}
          ${row(this.tt('seerah_bt_outcome'), this.esc(this.bpick(b, 'out')))}
          ${row(this.tt('seerah_bt_casualties'), this.bpick(b, 'cas') ? this.esc(this.bpick(b, 'cas')) : '')}
          ${momentsHtml ? `<div class="pt-2"><span class="text-[0.7rem] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">${this.esc(this.tt('seerah_bt_moments'))}</span>${momentsHtml}</div>` : ''}
          ${diagram ? `<figure class="mt-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 text-gray-500 dark:text-gray-400">
              <div class="w-full overflow-x-auto">${diagram}</div>
              <figcaption class="mt-1 text-[0.68rem] text-center text-gray-400 dark:text-gray-500" dir="auto">${this.esc(caption)}</figcaption>
            </figure>` : ''}
          ${versesHtml ? `<div class="pt-3"><span class="text-[0.7rem] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">${this.esc(this.tt('seerah_bt_verses'))}</span>${versesHtml}</div>` : ''}
        </div>
      </div>`;
  }

  /**
   * ABSTRACT battle diagram — troop blocks, movement arrows and terrain lines
   * only. No human/animal figures. Muslim side = green, opponent = red, terrain
   * = currentColor (theme-aware). viewBox is fixed; nothing is to scale.
   */
  battleDiagram(d) {
    if (!d) return '';
    const G = '#16a34a', R = '#dc2626';
    const L = this.esc(this.lc({ en: d.leftEn, bn: d.leftBn }));
    const Rt = this.esc(this.lc({ en: d.rightEn, bn: d.rightBn }));
    const feat = this.esc(this.lc({ en: d.featureEn, bn: d.featureBn }));

    const arrow = (x1, y1, x2, y2, c, dash) => {
      const ang = Math.atan2(y2 - y1, x2 - x1), h = 7;
      const ax = (x2 - h * Math.cos(ang - 0.42)).toFixed(1), ay = (y2 - h * Math.sin(ang - 0.42)).toFixed(1);
      const bx = (x2 - h * Math.cos(ang + 0.42)).toFixed(1), by = (y2 - h * Math.sin(ang + 0.42)).toFixed(1);
      return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="2" stroke-linecap="round"${dash ? ' stroke-dasharray="4 3"' : ''}/>` +
             `<polygon points="${x2},${y2} ${ax},${ay} ${bx},${by}" fill="${c}"/>`;
    };
    const block = (x, y, w, h, c, label) =>
      `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="${c}" opacity="0.9"/>` +
      `<text x="${x + w / 2}" y="${y + h / 2 + 3}" text-anchor="middle" font-size="9" fill="#fff" font-weight="600">${label}</text>`;
    const label = (x, y, txt, anchor) =>
      `<text x="${x}" y="${y}" text-anchor="${anchor || 'middle'}" font-size="9" fill="currentColor" opacity="0.85">${txt}</text>`;

    let body = '';
    switch (d.terrain) {
      case 'wells':
        body =
          block(16, 66, 66, 30, G, L) + block(238, 66, 66, 30, R, Rt) +
          '<circle cx="150" cy="66" r="5" fill="none" stroke="currentColor" stroke-width="1.4"/>' +
          '<circle cx="166" cy="86" r="5" fill="none" stroke="currentColor" stroke-width="1.4"/>' +
          '<circle cx="146" cy="98" r="5" fill="none" stroke="currentColor" stroke-width="1.4"/>' +
          label(158, 120, feat) +
          arrow(86, 81, 138, 81, G) + arrow(234, 81, 182, 81, R);
        break;
      case 'hill':
        body =
          '<path d="M96 128 L150 52 L204 128 Z" fill="currentColor" opacity="0.08" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>' +
          block(18, 52, 60, 26, G, L) +
          block(122, 92, 56, 18, G, feat) +
          block(242, 52, 60, 26, R, Rt) +
          arrow(240, 65, 82, 65, R) +
          arrow(252, 122, 112, 134, R);
        break;
      case 'trench':
        body =
          '<polyline points="162,20 150,40 170,60 150,80 170,100 150,120 162,148" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/>' +
          label(160, 14, feat) +
          block(26, 74, 62, 28, G, L) + block(232, 74, 66, 28, R, Rt) +
          arrow(228, 88, 182, 88, R) + arrow(228, 110, 182, 110, R);
        break;
      case 'fortress': {
        const fort = (x, y) =>
          `<rect x="${x}" y="${y + 6}" width="30" height="24" rx="1" fill="currentColor" opacity="0.12" stroke="currentColor" stroke-width="1.3"/>` +
          `<rect x="${x}" y="${y}" width="7" height="8" fill="currentColor" opacity="0.4"/>` +
          `<rect x="${x + 11}" y="${y}" width="7" height="8" fill="currentColor" opacity="0.4"/>` +
          `<rect x="${x + 22}" y="${y}" width="8" height="8" fill="currentColor" opacity="0.4"/>`;
        body =
          block(18, 76, 60, 28, G, L) +
          fort(214, 44) + fort(250, 82) + fort(210, 116) +
          label(250, 30, feat) +
          arrow(80, 84, 208, 60, G) + arrow(80, 92, 244, 96, G) + arrow(80, 100, 204, 128, G);
        break;
      }
      case 'city':
        body =
          '<rect x="126" y="56" width="66" height="60" rx="3" fill="currentColor" opacity="0.06" stroke="currentColor" stroke-width="1" stroke-dasharray="3 3"/>' +
          '<rect x="149" y="76" width="20" height="20" fill="currentColor" opacity="0.85"/>' +
          '<rect x="149" y="82" width="20" height="3" fill="#e5c07b"/>' +
          label(159, 128, feat) + label(159, 50, Rt) +
          arrow(159, 16, 159, 52, G) + arrow(159, 156, 159, 120, G) +
          arrow(18, 86, 122, 86, G) + arrow(300, 86, 196, 86, G) +
          label(14, 30, L, 'start');
        break;
      case 'valley':
        body =
          '<path d="M0 58 L52 20 L96 58 Z" fill="currentColor" opacity="0.09" stroke="currentColor" stroke-width="1"/>' +
          '<path d="M224 58 L276 20 L320 58 Z" fill="currentColor" opacity="0.09" stroke="currentColor" stroke-width="1"/>' +
          block(20, 92, 58, 26, G, L) +
          label(52, 74, Rt) + label(268, 74, Rt) +
          arrow(80, 105, 150, 105, G) +
          arrow(54, 58, 120, 96, R) + arrow(272, 58, 182, 96, R) +
          label(150, 140, feat);
        break;
      case 'expedition':
        body =
          block(128, 122, 64, 26, G, L) +
          '<circle cx="160" cy="34" r="6" fill="none" stroke="currentColor" stroke-width="1.6"/>' +
          label(160, 20, feat) +
          arrow(160, 120, 160, 44, G) +
          '<rect x="214" y="24" width="82" height="24" rx="4" fill="none" stroke="' + R + '" stroke-width="1.4" stroke-dasharray="4 3"/>' +
          `<text x="255" y="39" text-anchor="middle" font-size="8" fill="${R}">${Rt}</text>`;
        break;
      default:
        body = block(20, 70, 70, 30, G, L) + block(230, 70, 70, 30, R, Rt) +
          arrow(92, 85, 150, 85, G) + arrow(228, 85, 170, 85, R);
    }

    return `<svg viewBox="0 0 320 170" width="100%" style="max-width:340px;height:auto;display:block;margin:0 auto" role="img" aria-label="Abstract battle diagram">
      <rect x="0" y="0" width="320" height="170" rx="8" fill="currentColor" opacity="0.04"/>
      ${body}
    </svg>`;
  }

  // ── events ───────────────────────────────────────────────────────────
  bind() {
    if (this._bound) return;
    this._bound = true;

    this.container.addEventListener('click', (e) => {
      try {
        const t2 = e.target.closest ? e.target : e.target.parentElement;
        if (!t2) return;

        const viewBtn = e.target.closest('[data-seerah-view]');
        if (viewBtn) { this.view = viewBtn.getAttribute('data-seerah-view'); this.render(); return; }

        const filterBtn = e.target.closest('[data-seerah-filter]');
        if (filterBtn) { this.filter = filterBtn.getAttribute('data-seerah-filter'); this.render(); return; }

        const toggle = e.target.closest('[data-seerah-toggle]');
        if (toggle) { this.toggle(toggle.getAttribute('data-seerah-toggle')); return; }

        const readBtn = e.target.closest('[data-seerah-read]');
        if (readBtn) { this.toggleRead(readBtn.getAttribute('data-seerah-read')); return; }

        const ayahBtn = e.target.closest('[data-seerah-ayah]');
        if (ayahBtn) { this.openAyah(ayahBtn.getAttribute('data-seerah-ayah')); return; }

        const shareBtn = e.target.closest('[data-seerah-share]');
        if (shareBtn) { this.shareEvent(shareBtn.getAttribute('data-seerah-share')); return; }

        const copyBtn = e.target.closest('[data-seerah-copy]');
        if (copyBtn) { this.copyEvent(copyBtn.getAttribute('data-seerah-copy')); return; }

        const storyNav = e.target.closest('[data-seerah-story-nav]');
        if (storyNav) {
          const dir = storyNav.getAttribute('data-seerah-story-nav');
          const max = SEERAH_ERAS.length - 1;
          if (dir === 'next') this.storyPos = Math.min(max, this.storyPos + 1);
          else if (dir === 'prev') this.storyPos = Math.max(0, this.storyPos - 1);
          this.saveStoryPos();
          this.render();
          try { this.container.scrollIntoView({ behavior: 'smooth', block: 'start' }); } catch (_) { /* ignore */ }
          return;
        }

        const reset = e.target.closest('[data-seerah-reset]');
        if (reset) { this.resetProgress(); return; }

        const qopt = e.target.closest('[data-seerah-quiz-opt]');
        if (qopt && !this.quizSubmitted) {
          const parts = String(qopt.getAttribute('data-seerah-quiz-opt')).split(':');
          const qi = parseInt(parts[0], 10), oi = parseInt(parts[1], 10);
          if (!isNaN(qi) && !isNaN(oi)) { this.quizAnswers[qi] = oi; this.render(); }
          return;
        }
        const qsub = e.target.closest('[data-seerah-quiz-submit]');
        if (qsub) { this.submitQuiz(); return; }
        const qreset = e.target.closest('[data-seerah-quiz-reset]');
        if (qreset) { this.quizAnswers = {}; this.quizSubmitted = false; this.quizScore = 0; this.render(); return; }
      } catch (_) { /* ignore */ }
    });

    this.container.addEventListener('input', (e) => {
      try {
        const search = e.target.closest ? e.target.closest('[data-seerah-search]') : null;
        if (search) { this.query = search.value || ''; this.renderList(); }
      } catch (_) { /* ignore */ }
    });
  }

  toggle(id) {
    if (this.expanded.has(id)) this.expanded.delete(id); else this.expanded.add(id);
    const detail = this.container.querySelector(`[data-seerah-detail="${CSS && CSS.escape ? CSS.escape(id) : id}"]`);
    const caret = this.container.querySelector(`[data-seerah-caret="${CSS && CSS.escape ? CSS.escape(id) : id}"]`);
    if (detail) detail.classList.toggle('hidden');
    if (caret) caret.textContent = this.expanded.has(id) ? '▲' : '▼';
  }

  toggleRead(id) {
    if (this.read.has(id)) this.read.delete(id); else this.read.add(id);
    this.saveRead();
    this.updateProgress();
    // re-render just this card to reflect state
    const card = this.container.querySelector(`[data-seerah-card="${CSS && CSS.escape ? CSS.escape(id) : id}"]`);
    const ev = SEERAH_EVENTS.find(x => x.id === id);
    if (card && ev) {
      const wrap = document.createElement('div');
      wrap.innerHTML = this.cardHtml(ev).trim();
      if (wrap.firstElementChild) card.replaceWith(wrap.firstElementChild);
    }
  }

  updateProgress() {
    const total = SEERAH_EVENTS.length;
    const readCount = SEERAH_EVENTS.filter(ev => this.read.has(ev.id)).length;
    const pct = total ? Math.round((readCount / total) * 100) : 0;
    const countEl = this.container.querySelector('[data-seerah-count]');
    const barEl = this.container.querySelector('[data-seerah-bar]');
    if (countEl) countEl.textContent = `${readCount} / ${total}`;
    if (barEl) barEl.style.width = `${pct}%`;
  }

  resetProgress() {
    this.read = new Set();
    this.saveRead();
    this.render();
  }

  openAyah(ref) {
    try {
      if (typeof ayahModal !== 'undefined' && ayahModal && typeof ayahModal.open === 'function') {
        ayahModal.open(ref);
      }
    } catch (_) { /* ignore */ }
  }
}

let seerahView;
document.addEventListener('DOMContentLoaded', () => { try { seerahView = new SeerahView(); } catch (_) { /* ignore */ } });
