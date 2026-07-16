/**
 * Prophets & Messengers (Anbiya wa Rusul) — the 25 prophets named in the Quran,
 * in traditional chronological order, with a vertical Timeline view, a Grid view,
 * and a per-prophet detail page (story, key events, verified Quran references as
 * tappable pills, and a lesson). Bilingual en/bn content is authored INLINE on
 * each prophet; UI chrome falls back through PROPHETS_UI so the module renders
 * under any UI language. Per-prophet "read" progress is kept in localStorage
 * under `lq_prophets_read`.
 *
 * Renders into #prophets-container (tab "prophets"). Everything is defensive —
 * it never throws (guards DOM / localStorage / JSON / ayahModal / tabSystem /
 * t / appSettings).
 *
 * ACCURACY: content follows the mainstream Quran-based account (Quran +
 * authentic hadith + standard Qasas al-Anbiya, e.g. Ibn Kathir). Exact dates for
 * early prophets are NOT established in Islamic sources, so only RELATIVE order
 * is presented. Every surah number/name in `refs` was verified against
 * SURAH_DATA (js/surah-data.js). No figurative depiction of any prophet appears
 * anywhere — accents are purely geometric/typographic (aniconic).
 */

/* eslint-disable no-unused-vars */

const PROPHETS_DATA = [
  {
    id: 'adam', order: 1, ar: 'آدم', translit: 'Adam', en: 'Adam', bn: 'আদম',
    rank: 'nabi', ululAzm: false,
    eraEn: 'The first human being', eraBn: 'প্রথম মানুষ',
    nationEn: 'Humanity — his own descendants', nationBn: 'মানবজাতি — তাঁর নিজ বংশধর',
    summaryEn: 'Adam (AS) was the first human and the first prophet. Allah created him with His own hands, taught him the names of all things, and commanded the angels to prostrate to him — Iblis refused out of pride. After Adam and his wife Hawwa (Eve) ate from the forbidden tree, they were sent down to earth; they repented and Allah accepted their repentance, appointing Adam a guide for his children.',
    summaryBn: 'আদম (আঃ) ছিলেন প্রথম মানুষ ও প্রথম নবী। আল্লাহ নিজ হাতে তাঁকে সৃষ্টি করেন, তাঁকে সব কিছুর নাম শেখান এবং ফেরেশতাদের তাঁকে সিজদা করতে আদেশ দেন — অহংকারবশত ইবলিস অস্বীকার করে। নিষিদ্ধ গাছের ফল খাওয়ার পর আদম ও তাঁর স্ত্রী হাওয়াকে পৃথিবীতে নামানো হয়; তাঁরা তওবা করেন এবং আল্লাহ তা কবুল করেন ও আদমকে তাঁর সন্তানদের পথপ্রদর্শক করেন।',
    events: [
      { en: 'Allah taught Adam the names of all things, showing his honour over the angels.', bn: 'আল্লাহ আদমকে সব কিছুর নাম শেখান, যা ফেরেশতাদের ওপর তাঁর মর্যাদা প্রকাশ করে।' },
      { en: 'The angels prostrated; Iblis refused out of arrogance and was cast out.', bn: 'ফেরেশতারা সিজদা করে; অহংকারে ইবলিস অস্বীকার করে ও বিতাড়িত হয়।' },
      { en: 'Adam and Hawwa slipped, were sent to earth, then sincerely repented.', bn: 'আদম ও হাওয়া ভুল করেন, পৃথিবীতে নামানো হয়, পরে আন্তরিকভাবে তওবা করেন।' },
    ],
    refs: ['2:30-37', '7:11-25', '20:115-123'],
    lessonEn: 'Sincere repentance (tawbah) restores us; pride, the sin of Iblis, is the root of ruin.',
    lessonBn: 'আন্তরিক তওবা আমাদের ফিরিয়ে আনে; ইবলিসের পাপ অহংকারই ধ্বংসের মূল।',
  },
  {
    id: 'idris', order: 2, ar: 'إدريس', translit: 'Idris', en: 'Idris (Enoch)', bn: 'ইদরিস',
    rank: 'nabi', ululAzm: false,
    eraEn: 'Early generations after Adam', eraBn: 'আদমের পরবর্তী প্রাথমিক প্রজন্ম',
    nationEn: 'His people (early mankind)', nationBn: 'তাঁর সম্প্রদায় (প্রাথমিক মানবজাতি)',
    summaryEn: 'Idris (AS) is described in the Quran as a man of truth, a prophet, and one who was patient and steadfast. Allah says He "raised him to a high station." Islamic tradition remembers him as an early teacher of knowledge; the Quran itself keeps the details brief.',
    summaryBn: 'কুরআনে ইদরিস (আঃ)-কে সত্যবাদী, নবী এবং ধৈর্যশীল ও অবিচল ব্যক্তি হিসেবে বর্ণনা করা হয়েছে। আল্লাহ বলেন, তিনি তাঁকে "উচ্চ মর্যাদায় উন্নীত করেছেন।" ইসলামি ঐতিহ্যে তাঁকে জ্ঞানের একজন প্রাথমিক শিক্ষক হিসেবে স্মরণ করা হয়; কুরআন বিস্তারিত সংক্ষিপ্ত রেখেছে।',
    events: [
      { en: 'The Quran praises him as truthful (siddiq) and a prophet.', bn: 'কুরআন তাঁকে সত্যবাদী (সিদ্দীক) ও নবী বলে প্রশংসা করে।' },
      { en: 'He is counted among the patient and the righteous.', bn: 'তাঁকে ধৈর্যশীল ও সৎকর্মশীলদের অন্তর্ভুক্ত গণ্য করা হয়।' },
    ],
    refs: ['19:56-57', '21:85-86'],
    lessonEn: 'Truthfulness and patient perseverance raise a person to lasting honour with Allah.',
    lessonBn: 'সত্যবাদিতা ও ধৈর্যশীল অধ্যবসায় মানুষকে আল্লাহর কাছে স্থায়ী মর্যাদায় উন্নীত করে।',
  },
  {
    id: 'nuh', order: 3, ar: 'نوح', translit: 'Nuh', en: 'Nuh (Noah)', bn: 'নূহ',
    rank: 'rasul', ululAzm: true,
    eraEn: 'Ancient — long before recorded history', eraBn: 'অতি প্রাচীন — লিপিবদ্ধ ইতিহাসের বহু আগে',
    nationEn: "His own people (Noah's nation)", nationBn: 'তাঁর নিজ সম্প্রদায় (নূহের জাতি)',
    summaryEn: 'Nuh (AS) — a messenger and one of the five Ulul-Azm — called his people to worship Allah alone for a very long time, yet only a few believed. When they persisted in rejection and idolatry, Allah commanded him to build the Ark. The Flood destroyed the deniers, and the believers with him were saved; humanity continued through his line.',
    summaryBn: 'নূহ (আঃ) — একজন রাসূল ও পাঁচজন উলুল-আযমের একজন — দীর্ঘকাল ধরে তাঁর সম্প্রদায়কে কেবল আল্লাহর ইবাদতের দিকে ডাকেন, তবু অল্পসংখ্যকই ঈমান আনে। তারা অস্বীকার ও মূর্তিপূজায় অটল থাকলে আল্লাহ তাঁকে নৌকা তৈরির আদেশ দেন। মহাপ্লাবন অস্বীকারকারীদের ধ্বংস করে, আর তাঁর সঙ্গী মুমিনরা রক্ষা পায়; তাঁরই বংশধারায় মানবজাতি টিকে থাকে।',
    events: [
      { en: 'He preached day and night, openly and secretly, for centuries.', bn: 'তিনি দিনরাত, প্রকাশ্যে ও গোপনে, শত শত বছর দাওয়াত দেন।' },
      { en: 'By Allah’s command he built the Ark while his people mocked him.', bn: 'আল্লাহর আদেশে তিনি নৌকা বানান, আর তাঁর সম্প্রদায় উপহাস করে।' },
      { en: 'The Flood came; even his own son who refused to believe was drowned.', bn: 'প্লাবন আসে; ঈমান আনতে অস্বীকারকারী তাঁর নিজ পুত্রও ডুবে যায়।' },
    ],
    refs: ['71:1-28', '11:25-48', '23:23-30'],
    lessonEn: 'Keep calling to the truth with patience — success is measured by faithfulness, not numbers.',
    lessonBn: 'ধৈর্যের সাথে সত্যের দিকে ডাকতে থাকুন — সাফল্য মাপা হয় বিশ্বস্ততায়, সংখ্যায় নয়।',
  },
  {
    id: 'hud', order: 4, ar: 'هود', translit: 'Hud', en: 'Hud', bn: 'হুদ',
    rank: 'rasul', ululAzm: false,
    eraEn: 'After the Flood (ancient Arabia)', eraBn: 'প্লাবনের পর (প্রাচীন আরব)',
    nationEn: "The people of 'Ad", nationBn: 'আদ জাতি',
    summaryEn: 'Hud (AS) was sent to the powerful people of ’Ad, who built lofty monuments and were mighty in strength but arrogant and idolatrous. He called them to worship Allah alone and to be grateful. When they denied him, a furious barren wind destroyed them over several days, sparing Hud and the believers.',
    summaryBn: 'হুদ (আঃ)-কে শক্তিশালী আদ জাতির কাছে পাঠানো হয়, যারা সুউচ্চ স্থাপনা গড়ত ও শক্তিতে পরাক্রমশালী ছিল কিন্তু অহংকারী ও মূর্তিপূজারী। তিনি তাদের কেবল আল্লাহর ইবাদত ও কৃতজ্ঞতার দিকে ডাকেন। তারা অস্বীকার করলে কয়েক দিন ধরে এক প্রচণ্ড ঝড় তাদের ধ্বংস করে, আর হুদ ও মুমিনরা রক্ষা পায়।',
    events: [
      { en: 'He warned ’Ad against pride in their strength and buildings.', bn: 'তিনি আদকে তাদের শক্তি ও স্থাপনার অহংকার থেকে সতর্ক করেন।' },
      { en: 'They mocked him and clung to their idols.', bn: 'তারা তাঁকে উপহাস করে ও মূর্তি আঁকড়ে থাকে।' },
      { en: 'A destroying wind was sent against them for their arrogance.', bn: 'তাদের অহংকারের কারণে এক ধ্বংসকারী ঝড় পাঠানো হয়।' },
    ],
    refs: ['7:65-72', '11:50-60', '26:123-140'],
    lessonEn: 'Strength and wealth are gifts to be used with gratitude, never idols to be proud of.',
    lessonBn: 'শক্তি ও সম্পদ কৃতজ্ঞতার সাথে ব্যবহারের নিয়ামত, কখনোই গর্ব করার মূর্তি নয়।',
  },
  {
    id: 'salih', order: 5, ar: 'صالح', translit: 'Salih', en: 'Salih', bn: 'সালিহ',
    rank: 'rasul', ululAzm: false,
    eraEn: 'After ’Ad (ancient Arabia)', eraBn: 'আদের পর (প্রাচীন আরব)',
    nationEn: 'The people of Thamud', nationBn: 'সামুদ জাতি',
    summaryEn: 'Salih (AS) was sent to Thamud, skilled people who carved homes in the mountains. As a sign, Allah brought forth a she-camel from the rock and told them to let it graze and drink freely. They hamstrung and killed her in defiance, so a mighty blast seized them, and only Salih and the believers survived.',
    summaryBn: 'সালিহ (আঃ)-কে সামুদ জাতির কাছে পাঠানো হয়, যারা পাহাড় কেটে ঘর বানাত। নিদর্শন হিসেবে আল্লাহ পাথর থেকে এক উষ্ট্রী বের করেন ও তাদের বলেন সেটিকে অবাধে চরতে ও পানি পান করতে দিতে। অবাধ্যতায় তারা উষ্ট্রীটিকে হত্যা করে, ফলে এক প্রচণ্ড গর্জন তাদের গ্রাস করে, আর কেবল সালিহ ও মুমিনরা বেঁচে যায়।',
    events: [
      { en: 'The she-camel was given as a clear sign and a test.', bn: 'উষ্ট্রীটি স্পষ্ট নিদর্শন ও পরীক্ষা হিসেবে দেওয়া হয়।' },
      { en: 'The wrongdoers killed her, defying Allah’s command.', bn: 'অপরাধীরা আল্লাহর আদেশ অমান্য করে সেটিকে হত্যা করে।' },
      { en: 'A thunderous blast destroyed the people of Thamud.', bn: 'এক বজ্রধ্বনি সামুদ জাতিকে ধ্বংস করে।' },
    ],
    refs: ['7:73-79', '11:61-68', '26:141-158'],
    lessonEn: 'Defying a clear sign from Allah brings ruin; obedience and gratitude bring life.',
    lessonBn: 'আল্লাহর স্পষ্ট নিদর্শন অমান্য করা ধ্বংস আনে; আনুগত্য ও কৃতজ্ঞতা জীবন আনে।',
  },
  {
    id: 'ibrahim', order: 6, ar: 'إبراهيم', translit: 'Ibrahim', en: 'Ibrahim (Abraham)', bn: 'ইবরাহীম',
    rank: 'rasul', ululAzm: true,
    eraEn: 'Ancient Mesopotamia, then the Levant & Arabia', eraBn: 'প্রাচীন মেসোপটেমিয়া, পরে লেভান্ট ও আরব',
    nationEn: 'His people & king (Babylon), and beyond', nationBn: 'তাঁর সম্প্রদায় ও রাজা (ব্যাবিলন) ও তার বাইরে',
    summaryEn: 'Ibrahim (AS) — a messenger, one of the Ulul-Azm, and "Khalilullah" (the intimate friend of Allah) — rejected the idols of his people and reasoned his way to the One God. He was cast into a fire that Allah made cool and safe. He passed the greatest test when commanded to sacrifice his son, and with Isma’il he raised the foundations of the Ka’bah.',
    summaryBn: 'ইবরাহীম (আঃ) — একজন রাসূল, উলুল-আযমের একজন ও "খলীলুল্লাহ" (আল্লাহর অন্তরঙ্গ বন্ধু) — তাঁর সম্প্রদায়ের মূর্তি প্রত্যাখ্যান করেন এবং যুক্তির মাধ্যমে এক আল্লাহর দিকে পৌঁছান। তাঁকে আগুনে নিক্ষেপ করা হয়, যা আল্লাহ শীতল ও নিরাপদ করে দেন। পুত্র কুরবানির আদেশ পেয়ে তিনি সর্বশ্রেষ্ঠ পরীক্ষায় উত্তীর্ণ হন, এবং ইসমাঈলকে সাথে নিয়ে কাবার ভিত্তি স্থাপন করেন।',
    events: [
      { en: 'He argued against idolatry and broke his people’s idols.', bn: 'তিনি মূর্তিপূজার বিরুদ্ধে যুক্তি দেন ও সম্প্রদায়ের মূর্তি ভাঙেন।' },
      { en: 'Cast into the fire, he was saved as Allah made it cool and peaceful.', bn: 'আগুনে নিক্ষিপ্ত হলে আল্লাহ তা শীতল ও শান্তিময় করায় তিনি রক্ষা পান।' },
      { en: 'He was tested with the command to sacrifice his son, and submitted.', bn: 'পুত্র কুরবানির আদেশে তাঁকে পরীক্ষা করা হয় এবং তিনি আত্মসমর্পণ করেন।' },
      { en: 'With Isma’il he raised the foundations of the Ka’bah and prayed for its people.', bn: 'ইসমাঈলকে সাথে নিয়ে তিনি কাবার ভিত্তি গড়েন ও এর অধিবাসীদের জন্য দোয়া করেন।' },
    ],
    refs: ['6:74-83', '21:51-70', '37:99-113', '2:124-129'],
    lessonEn: 'True faith reasons toward the One God and submits completely, even when it costs the most.',
    lessonBn: 'প্রকৃত ঈমান এক আল্লাহর দিকে যুক্তি দেয় ও সবচেয়ে বড় মূল্যেও সম্পূর্ণ আত্মসমর্পণ করে।',
  },
  {
    id: 'lut', order: 7, ar: 'لوط', translit: 'Lut', en: 'Lut (Lot)', bn: 'লূত',
    rank: 'rasul', ululAzm: false,
    eraEn: 'Time of Ibrahim (the Levant)', eraBn: 'ইবরাহীমের সময় (লেভান্ট)',
    nationEn: 'The people of Sodom', nationBn: 'সদোম নগরের অধিবাসী',
    summaryEn: 'Lut (AS), a nephew of Ibrahim, was sent to a people who committed open indecency never seen before — approaching men instead of women. He called them to purity and warned them, but they threatened him. Angels came as guests to Ibrahim with the news, then to Lut; his town was overturned and destroyed, while Lut and the believers were saved (his wife stayed behind and perished).',
    summaryBn: 'লূত (আঃ), ইবরাহীমের ভাতিজা, এমন এক জাতির কাছে প্রেরিত হন যারা পূর্বে অদেখা প্রকাশ্য অশ্লীলতা করত — নারীর বদলে পুরুষে উপগত হতো। তিনি তাদের পবিত্রতার দিকে ডাকেন ও সতর্ক করেন, কিন্তু তারা তাঁকে হুমকি দেয়। ফেরেশতারা অতিথিরূপে প্রথমে ইবরাহীমের কাছে সংবাদ নিয়ে, পরে লূতের কাছে আসেন; তাঁর নগরী উল্টে ধ্বংস হয়, আর লূত ও মুমিনরা রক্ষা পান (তাঁর স্ত্রী পিছনে থেকে ধ্বংস হয়)।',
    events: [
      { en: 'He forbade the open indecency of his people.', bn: 'তিনি তাঁর সম্প্রদায়ের প্রকাশ্য অশ্লীলতা নিষেধ করেন।' },
      { en: 'Angelic guests came to warn him of the coming punishment.', bn: 'ফেরেশতা অতিথিরা আসন্ন শাস্তির সতর্কবার্তা নিয়ে আসেন।' },
      { en: 'The town was overturned; Lut and the believers were rescued.', bn: 'নগরী উল্টে দেওয়া হয়; লূত ও মুমিনরা উদ্ধার পান।' },
    ],
    refs: ['7:80-84', '11:77-83', '15:57-77'],
    lessonEn: 'Stand for purity and truth even when a whole society turns against you.',
    lessonBn: 'গোটা সমাজ বিরুদ্ধে গেলেও পবিত্রতা ও সত্যের পক্ষে দাঁড়ান।',
  },
  {
    id: 'ismail', order: 8, ar: 'إسماعيل', translit: "Isma'il", en: "Isma'il (Ishmael)", bn: 'ইসমাঈল',
    rank: 'rasul', ululAzm: false,
    eraEn: 'Son of Ibrahim (Arabia / Mecca)', eraBn: 'ইবরাহীমের পুত্র (আরব / মক্কা)',
    nationEn: 'The people of Mecca (the Arabs)', nationBn: 'মক্কার অধিবাসী (আরবগণ)',
    summaryEn: "Isma’il (AS), the elder son of Ibrahim, was the patient son ready to be sacrificed until Allah ransomed him with a great sacrifice. He and his mother Hajar were settled in the barren valley of Mecca, where the well of Zamzam sprang forth. He helped his father raise the Ka’bah and was true to his promise, a messenger who enjoined prayer and zakat on his household.",
    summaryBn: 'ইসমাঈল (আঃ), ইবরাহীমের বড় পুত্র, ছিলেন সেই ধৈর্যশীল পুত্র যিনি কুরবানির জন্য প্রস্তুত ছিলেন, যতক্ষণ না আল্লাহ এক মহান কুরবানির বিনিময়ে তাঁকে মুক্ত করেন। তিনি ও তাঁর মা হাজেরা মক্কার শুষ্ক উপত্যকায় বসতি স্থাপন করেন, যেখানে যমযম কূপ উৎসারিত হয়। তিনি পিতাকে কাবা নির্মাণে সাহায্য করেন, প্রতিশ্রুতিতে সত্যবাদী ছিলেন এবং একজন রাসূল হিসেবে পরিবারকে সালাত ও যাকাতের নির্দেশ দিতেন।',
    events: [
      { en: 'As a boy he willingly submitted to the command of sacrifice.', bn: 'বালক বয়সে তিনি স্বেচ্ছায় কুরবানির আদেশে আত্মসমর্পণ করেন।' },
      { en: 'Allah ransomed him with a great sacrifice.', bn: 'আল্লাহ এক মহান কুরবানির বিনিময়ে তাঁকে মুক্ত করেন।' },
      { en: 'He and Ibrahim built the Ka’bah together.', bn: 'তিনি ও ইবরাহীম একসাথে কাবা নির্মাণ করেন।' },
    ],
    refs: ['37:99-113', '2:125-127', '19:54-55'],
    lessonEn: 'Trusting obedience to Allah, even in hardship, is honoured and rewarded.',
    lessonBn: 'কষ্টের মধ্যেও আল্লাহর প্রতি আস্থাশীল আনুগত্য সম্মানিত ও পুরস্কৃত হয়।',
  },
  {
    id: 'ishaq', order: 9, ar: 'إسحاق', translit: 'Ishaq', en: 'Ishaq (Isaac)', bn: 'ইসহাক',
    rank: 'nabi', ululAzm: false,
    eraEn: 'Son of Ibrahim (the Levant)', eraBn: 'ইবরাহীমের পুত্র (লেভান্ট)',
    nationEn: 'The Children of Israel (his line)', nationBn: 'বনী ইসরাঈল (তাঁর বংশ)',
    summaryEn: 'Ishaq (AS) was the second son of Ibrahim, given as glad tidings to Ibrahim and his wife Sarah in their old age — a sign of Allah’s power. He was a righteous prophet, and Allah placed prophethood and scripture in his descendants, including his son Ya’qub. The Quran honours him among the chosen and the good.',
    summaryBn: 'ইসহাক (আঃ) ছিলেন ইবরাহীমের দ্বিতীয় পুত্র, বৃদ্ধ বয়সে ইবরাহীম ও তাঁর স্ত্রী সারার কাছে সুসংবাদরূপে দেওয়া — আল্লাহর কুদরতের এক নিদর্শন। তিনি ছিলেন একজন সৎকর্মশীল নবী, এবং আল্লাহ তাঁর বংশধরদের মধ্যে নবুয়ত ও কিতাব রাখেন, তাঁর পুত্র ইয়াকুবসহ। কুরআন তাঁকে মনোনীত ও উত্তমদের মধ্যে সম্মানিত করে।',
    events: [
      { en: 'His birth was foretold to Ibrahim and Sarah in their old age.', bn: 'বৃদ্ধ বয়সে ইবরাহীম ও সারাকে তাঁর জন্মের সুসংবাদ দেওয়া হয়।' },
      { en: 'Allah blessed his offspring with prophethood.', bn: 'আল্লাহ তাঁর বংশধরদের নবুয়ত দিয়ে বরকতময় করেন।' },
    ],
    refs: ['11:71-73', '37:112-113', '19:49-50'],
    lessonEn: 'Allah’s promises are fulfilled in His time; nothing is beyond His power.',
    lessonBn: 'আল্লাহর প্রতিশ্রুতি তাঁর নির্ধারিত সময়ে পূর্ণ হয়; কিছুই তাঁর কুদরতের বাইরে নয়।',
  },
  {
    id: 'yaqub', order: 10, ar: 'يعقوب', translit: "Ya'qub", en: "Ya'qub (Jacob), Israel", bn: 'ইয়াকুব',
    rank: 'nabi', ululAzm: false,
    eraEn: 'Son of Ishaq (the Levant / Egypt)', eraBn: 'ইসহাকের পুত্র (লেভান্ট / মিশর)',
    nationEn: 'His household — the Children of Israel', nationBn: 'তাঁর পরিবার — বনী ইসরাঈল',
    summaryEn: 'Ya’qub (AS), also called Israel, was the son of Ishaq and father of the twelve tribes, including Yusuf. He was a patient prophet who lost his beloved son Yusuf for years yet held to "beautiful patience," trusting in Allah’s mercy. On his deathbed he charged his sons to worship none but Allah.',
    summaryBn: 'ইয়াকুব (আঃ), যাঁকে ইসরাঈলও বলা হয়, ছিলেন ইসহাকের পুত্র ও বারো গোত্রের পিতা, ইউসুফসহ। তিনি ছিলেন এক ধৈর্যশীল নবী, যিনি বছরের পর বছর প্রিয় পুত্র ইউসুফকে হারিয়েও "সুন্দর ধৈর্য" ধরে রাখেন, আল্লাহর রহমতে আস্থা রেখে। মৃত্যুশয্যায় তিনি পুত্রদের কেবল আল্লাহর ইবাদতের ওসিয়ত করেন।',
    events: [
      { en: 'He grieved for lost Yusuf yet kept "beautiful patience."', bn: 'হারানো ইউসুফের জন্য শোক করলেও তিনি "সুন্দর ধৈর্য" ধরে রাখেন।' },
      { en: 'He was reunited with Yusuf in Egypt after long years.', bn: 'দীর্ঘ বছর পর মিশরে ইউসুফের সাথে তাঁর পুনর্মিলন হয়।' },
      { en: 'He charged his sons to worship Allah alone before he died.', bn: 'মৃত্যুর আগে তিনি পুত্রদের কেবল আল্লাহর ইবাদতের নির্দেশ দেন।' },
    ],
    refs: ['12:83-87', '2:132-133', '19:49'],
    lessonEn: 'Grief with "beautiful patience" and trust in Allah never despairs of His mercy.',
    lessonBn: '"সুন্দর ধৈর্য" ও আল্লাহর প্রতি আস্থাসহ শোক কখনো তাঁর রহমত থেকে নিরাশ হয় না।',
  },
  {
    id: 'yusuf', order: 11, ar: 'يوسف', translit: 'Yusuf', en: 'Yusuf (Joseph)', bn: 'ইউসুফ',
    rank: 'nabi', ululAzm: false,
    eraEn: 'Son of Ya’qub (Canaan & Egypt)', eraBn: 'ইয়াকুবের পুত্র (কেনান ও মিশর)',
    nationEn: 'Egypt (as a prophet and minister)', nationBn: 'মিশর (নবী ও মন্ত্রী হিসেবে)',
    summaryEn: 'Yusuf (AS), whose story the Quran calls "the best of stories," was thrown into a well by his jealous brothers, sold as a slave, wrongly imprisoned, yet stayed patient and God-conscious. Allah gave him the interpretation of dreams; he rose to govern Egypt’s treasuries and saved the region from famine. In the end he forgave his brothers and was reunited with his family.',
    summaryBn: 'ইউসুফ (আঃ), যাঁর কাহিনিকে কুরআন "সর্বোত্তম কাহিনি" বলে, হিংসুক ভাইদের হাতে কূপে নিক্ষিপ্ত হন, দাস হিসেবে বিক্রি হন, অন্যায়ভাবে কারাবন্দি হন, তবু ধৈর্যশীল ও আল্লাহভীরু থাকেন। আল্লাহ তাঁকে স্বপ্নের ব্যাখ্যা দান করেন; তিনি মিশরের ধনভাণ্ডারের দায়িত্বে উন্নীত হন ও দুর্ভিক্ষ থেকে অঞ্চল রক্ষা করেন। শেষে তিনি ভাইদের ক্ষমা করেন ও পরিবারের সাথে পুনর্মিলিত হন।',
    events: [
      { en: 'His brothers cast him into a well; he was sold into slavery in Egypt.', bn: 'ভাইয়েরা তাঁকে কূপে ফেলে; মিশরে দাস হিসেবে বিক্রি হন।' },
      { en: 'He resisted temptation and was jailed, yet kept calling to Allah.', bn: 'তিনি প্রলোভন প্রতিহত করেন ও কারারুদ্ধ হন, তবু আল্লাহর দিকে ডাকতে থাকেন।' },
      { en: 'He interpreted the king’s dream and was made a trusted minister.', bn: 'তিনি রাজার স্বপ্নের ব্যাখ্যা করেন ও বিশ্বস্ত মন্ত্রী হন।' },
      { en: 'He forgave his brothers and reunited with his father Ya’qub.', bn: 'তিনি ভাইদের ক্ষমা করেন ও পিতা ইয়াকুবের সাথে পুনর্মিলিত হন।' },
    ],
    refs: ['12:3-6', '12:23-24', '12:54-57', '12:90-92'],
    lessonEn: 'Patience, chastity, and forgiveness turn injustice into a source of good by Allah’s plan.',
    lessonBn: 'ধৈর্য, সতীত্ব ও ক্ষমা আল্লাহর পরিকল্পনায় অবিচারকে কল্যাণের উৎসে পরিণত করে।',
  },
  {
    id: 'ayyub', order: 12, ar: 'أيوب', translit: 'Ayyub', en: 'Ayyub (Job)', bn: 'আইয়ুব',
    rank: 'nabi', ululAzm: false,
    eraEn: 'Ancient (the Levant)', eraBn: 'প্রাচীন (লেভান্ট)',
    nationEn: 'His own people', nationBn: 'তাঁর নিজ সম্প্রদায়',
    summaryEn: 'Ayyub (AS) was a wealthy, healthy prophet whom Allah tested by taking his property, children, and health over long years. He bore it with remarkable patience and never complained against his Lord, only turning to Him in prayer. Allah then healed him with a cool spring, restored his family, and doubled his blessings.',
    summaryBn: 'আইয়ুব (আঃ) ছিলেন এক ধনী, সুস্থ নবী, যাঁকে আল্লাহ দীর্ঘ বছর ধরে সম্পদ, সন্তান ও স্বাস্থ্য কেড়ে নিয়ে পরীক্ষা করেন। তিনি তা অসাধারণ ধৈর্যে সহ্য করেন এবং প্রভুর বিরুদ্ধে কখনো অভিযোগ করেননি, কেবল দোয়ায় তাঁর দিকে ফেরেন। এরপর আল্লাহ এক শীতল ঝর্ণায় তাঁকে আরোগ্য দেন, পরিবার ফিরিয়ে দেন ও নিয়ামত দ্বিগুণ করেন।',
    events: [
      { en: 'He lost wealth, children, and health as a test.', bn: 'পরীক্ষা হিসেবে তিনি সম্পদ, সন্তান ও স্বাস্থ্য হারান।' },
      { en: 'He remained patient and prayed, "harm has touched me."', bn: 'তিনি ধৈর্যশীল থাকেন ও দোয়া করেন, "আমাকে কষ্ট স্পর্শ করেছে।"' },
      { en: 'Allah healed him and restored double what he had lost.', bn: 'আল্লাহ তাঁকে আরোগ্য দেন ও হারানোর দ্বিগুণ ফিরিয়ে দেন।' },
    ],
    refs: ['21:83-84', '38:41-44'],
    lessonEn: 'Patience in suffering, without complaint against Allah, is met with healing and reward.',
    lessonBn: 'আল্লাহর বিরুদ্ধে অভিযোগ ছাড়া কষ্টে ধৈর্য আরোগ্য ও পুরস্কার এনে দেয়।',
  },
  {
    id: 'shuayb', order: 13, ar: 'شعيب', translit: "Shu'ayb", en: "Shu'ayb (Jethro)", bn: 'শুআইব',
    rank: 'rasul', ululAzm: false,
    eraEn: 'Ancient (northwest Arabia)', eraBn: 'প্রাচীন (উত্তর-পশ্চিম আরব)',
    nationEn: 'The people of Madyan (and Aykah)', nationBn: 'মাদইয়ান (ও আইকা) সম্প্রদায়',
    summaryEn: 'Shu’ayb (AS) was sent to the people of Madyan, traders who cheated in weights and measures and spread corruption. He called them to worship Allah and to deal justly in business. When they mocked and threatened him, a punishment of a dreadful day seized them, and Shu’ayb with the believers was saved.',
    summaryBn: 'শুআইব (আঃ)-কে মাদইয়ানের অধিবাসীদের কাছে পাঠানো হয়, যারা ওজন ও মাপে প্রতারণা করত ও ফাসাদ ছড়াত। তিনি তাদের আল্লাহর ইবাদত ও ব্যবসায় ন্যায়পরায়ণতার দিকে ডাকেন। তারা উপহাস ও হুমকি দিলে এক ভয়াবহ দিনের শাস্তি তাদের গ্রাস করে, আর শুআইব ও মুমিনরা রক্ষা পান।',
    events: [
      { en: 'He commanded honest weights, measures, and fair trade.', bn: 'তিনি সৎ ওজন, মাপ ও ন্যায্য ব্যবসার নির্দেশ দেন।' },
      { en: 'The people rejected reform and threatened the believers.', bn: 'সম্প্রদায় সংস্কার প্রত্যাখ্যান করে ও মুমিনদের হুমকি দেয়।' },
      { en: 'Punishment of a dreadful day destroyed the wrongdoers.', bn: 'এক ভয়াবহ দিনের শাস্তি অপরাধীদের ধ্বংস করে।' },
    ],
    refs: ['7:85-93', '11:84-95', '26:176-190'],
    lessonEn: 'Faith is inseparable from honesty in trade and justice in dealings.',
    lessonBn: 'ঈমান ব্যবসায় সততা ও লেনদেনে ন্যায় থেকে অবিচ্ছেদ্য।',
  },
  {
    id: 'musa', order: 14, ar: 'موسى', translit: 'Musa', en: 'Musa (Moses)', bn: 'মূসা',
    rank: 'rasul', ululAzm: true,
    eraEn: 'Egypt & Sinai (approx. commonly cited era)', eraBn: 'মিশর ও সিনাই (আনুমানিক প্রচলিত যুগ)',
    nationEn: 'Pharaoh’s Egypt & the Children of Israel', nationBn: 'ফেরাউনের মিশর ও বনী ইসরাঈল',
    summaryEn: 'Musa (AS) — a messenger and Ulul-Azm, the prophet most mentioned in the Quran — was raised in Pharaoh’s palace, then received revelation at Mount Tur. Sent to Pharaoh with clear signs, he confronted the tyrant, defeated the magicians, and led the Children of Israel out of bondage as the sea parted. Allah spoke to him directly and gave him the Tawrah (Torah).',
    summaryBn: 'মূসা (আঃ) — একজন রাসূল ও উলুল-আযম, কুরআনে সর্বাধিক উল্লিখিত নবী — ফেরাউনের প্রাসাদে বড় হন, পরে তূর পর্বতে ওহি লাভ করেন। স্পষ্ট নিদর্শনসহ ফেরাউনের কাছে প্রেরিত হয়ে তিনি স্বৈরাচারীর মুখোমুখি হন, জাদুকরদের পরাস্ত করেন এবং সমুদ্র বিভক্ত হলে বনী ইসরাঈলকে দাসত্ব থেকে বের করে আনেন। আল্লাহ তাঁর সাথে সরাসরি কথা বলেন ও তাঁকে তাওরাত দান করেন।',
    events: [
      { en: 'Raised in Pharaoh’s house, he later received the call at Mount Tur.', bn: 'ফেরাউনের ঘরে লালিত হয়ে পরে তূর পর্বতে তিনি আহ্বান পান।' },
      { en: 'With clear signs he confronted Pharaoh; the magicians believed.', bn: 'স্পষ্ট নিদর্শনসহ তিনি ফেরাউনের মুখোমুখি হন; জাদুকররা ঈমান আনে।' },
      { en: 'The sea parted; Israel was saved and Pharaoh drowned.', bn: 'সমুদ্র বিভক্ত হয়; বনী ইসরাঈল রক্ষা পায় ও ফেরাউন ডুবে যায়।' },
      { en: 'Allah spoke to him and gave him the Tawrah on the mountain.', bn: 'আল্লাহ তাঁর সাথে কথা বলেন ও পাহাড়ে তাঁকে তাওরাত দেন।' },
    ],
    refs: ['28:3-13', '20:9-24', '7:103-126', '2:49-53'],
    lessonEn: 'Trust in Allah gives courage to stand against tyranny; deliverance comes from Him alone.',
    lessonBn: 'আল্লাহর ওপর আস্থা স্বৈরাচারের বিরুদ্ধে দাঁড়ানোর সাহস দেয়; মুক্তি কেবল তাঁর কাছ থেকে।',
  },
  {
    id: 'harun', order: 15, ar: 'هارون', translit: 'Harun', en: 'Harun (Aaron)', bn: 'হারুন',
    rank: 'nabi', ululAzm: false,
    eraEn: 'Brother of Musa (Egypt & Sinai)', eraBn: 'মূসার ভাই (মিশর ও সিনাই)',
    nationEn: 'The Children of Israel', nationBn: 'বনী ইসরাঈল',
    summaryEn: 'Harun (AS) was the elder brother of Musa, given to him as a helper and a fellow prophet because he was more eloquent of speech. He stood beside Musa before Pharaoh and shared the mission. While Musa was at the mountain, Harun tried to stop the people from worshipping the golden calf, holding firm to the truth.',
    summaryBn: 'হারুন (আঃ) ছিলেন মূসার বড় ভাই, যাঁকে সহকারী ও সহনবী হিসেবে তাঁকে দেওয়া হয় কারণ তিনি বাকপটু ছিলেন। তিনি ফেরাউনের সামনে মূসার পাশে দাঁড়ান ও দায়িত্ব ভাগ করে নেন। মূসা যখন পাহাড়ে ছিলেন, হারুন সম্প্রদায়কে স্বর্ণবাছুর পূজা থেকে বিরত রাখার চেষ্টা করেন, সত্যে অটল থেকে।',
    events: [
      { en: 'Appointed as Musa’s helper and spokesman at Musa’s request.', bn: 'মূসার অনুরোধে তাঁর সহকারী ও মুখপাত্র নিযুক্ত হন।' },
      { en: 'He stood with Musa before Pharaoh.', bn: 'তিনি ফেরাউনের সামনে মূসার সাথে দাঁড়ান।' },
      { en: 'He tried to hold the people back from the golden calf.', bn: 'তিনি সম্প্রদায়কে স্বর্ণবাছুর থেকে ফেরানোর চেষ্টা করেন।' },
    ],
    refs: ['20:29-36', '28:34-35', '7:142'],
    lessonEn: 'Support and unity between the sincere strengthen the call to truth.',
    lessonBn: 'সৎ ব্যক্তিদের মধ্যে সহযোগিতা ও ঐক্য সত্যের আহ্বানকে শক্তিশালী করে।',
  },
  {
    id: 'dhulkifl', order: 16, ar: 'ذو الكفل', translit: 'Dhul-Kifl', en: 'Dhul-Kifl', bn: 'যুলকিফল',
    rank: 'nabi', ululAzm: false,
    eraEn: 'Ancient (details brief in the Quran)', eraBn: 'প্রাচীন (কুরআনে বিবরণ সংক্ষিপ্ত)',
    nationEn: 'His own people', nationBn: 'তাঁর নিজ সম্প্রদায়',
    summaryEn: 'Dhul-Kifl (AS) is named briefly in the Quran among the patient and the righteous, alongside Isma’il and Idris. He is honoured as one of "the good" (al-akhyar). The Quran keeps his account short, and scholars caution against attributing unverified details to him.',
    summaryBn: 'যুলকিফল (আঃ)-এর নাম কুরআনে সংক্ষেপে ধৈর্যশীল ও সৎকর্মশীলদের মধ্যে, ইসমাঈল ও ইদরিসের সাথে উল্লিখিত হয়েছে। তাঁকে "উত্তমদের" (আল-আখইয়ার) একজন হিসেবে সম্মান দেওয়া হয়। কুরআন তাঁর বিবরণ সংক্ষিপ্ত রেখেছে, এবং আলেমগণ তাঁর সম্পর্কে যাচাই-না-করা বিবরণ আরোপে সতর্ক করেন।',
    events: [
      { en: 'Counted among the patient and steadfast in the Quran.', bn: 'কুরআনে ধৈর্যশীল ও অবিচলদের মধ্যে গণ্য।' },
      { en: 'Named among "the good" (al-akhyar).', bn: '"উত্তমদের" (আল-আখইয়ার) মধ্যে নামোল্লেখ।' },
    ],
    refs: ['21:85-86', '38:48'],
    lessonEn: 'Steadfast patience earns lasting honour, even when a life’s details are unknown to us.',
    lessonBn: 'অবিচল ধৈর্য স্থায়ী সম্মান এনে দেয়, জীবনের বিবরণ আমাদের অজানা হলেও।',
  },
  {
    id: 'dawud', order: 17, ar: 'داود', translit: 'Dawud', en: 'Dawud (David)', bn: 'দাউদ',
    rank: 'nabi', ululAzm: false,
    eraEn: 'Kingdom of Israel (approx. commonly cited era)', eraBn: 'ইসরাঈল রাজ্য (আনুমানিক প্রচলিত যুগ)',
    nationEn: 'The Children of Israel', nationBn: 'বনী ইসরাঈল',
    summaryEn: 'Dawud (AS) was both a prophet and a just king, given the Zabur (Psalms). As a young man he slew the tyrant Jalut (Goliath). Allah made iron soft in his hands and the mountains and birds glorified Allah with him. He judged with wisdom and devoted himself to worship and gratitude.',
    summaryBn: 'দাউদ (আঃ) ছিলেন একাধারে একজন নবী ও ন্যায়পরায়ণ রাজা, যাঁকে যাবুর (গীতসংহিতা) দেওয়া হয়। তরুণ বয়সে তিনি স্বৈরাচারী জালুতকে (গোলিয়াথ) বধ করেন। আল্লাহ তাঁর হাতে লোহাকে নরম করেন এবং পাহাড় ও পাখিরা তাঁর সাথে আল্লাহর তাসবিহ পড়ত। তিনি প্রজ্ঞার সাথে বিচার করতেন এবং ইবাদত ও কৃতজ্ঞতায় নিমগ্ন থাকতেন।',
    events: [
      { en: 'As a youth he defeated the tyrant Jalut (Goliath).', bn: 'তরুণ বয়সে তিনি স্বৈরাচারী জালুতকে (গোলিয়াথ) পরাস্ত করেন।' },
      { en: 'He was given the Zabur and iron was made soft for him.', bn: 'তাঁকে যাবুর দেওয়া হয় ও লোহা তাঁর জন্য নরম করা হয়।' },
      { en: 'Mountains and birds glorified Allah along with him.', bn: 'পাহাড় ও পাখিরা তাঁর সাথে আল্লাহর তাসবিহ পড়ত।' },
    ],
    refs: ['2:251', '38:17-26', '21:78-80', '34:10-11'],
    lessonEn: 'Power and skill are trusts from Allah, to be used for justice and constant gratitude.',
    lessonBn: 'ক্ষমতা ও দক্ষতা আল্লাহর আমানত, ন্যায় ও অবিরাম কৃতজ্ঞতায় ব্যবহারের জন্য।',
  },
  {
    id: 'sulayman', order: 18, ar: 'سليمان', translit: 'Sulayman', en: 'Sulayman (Solomon)', bn: 'সুলাইমান',
    rank: 'nabi', ululAzm: false,
    eraEn: 'Son of Dawud (approx. commonly cited era)', eraBn: 'দাউদের পুত্র (আনুমানিক প্রচলিত যুগ)',
    nationEn: 'The Children of Israel (a vast kingdom)', nationBn: 'বনী ইসরাঈল (এক বিশাল রাজ্য)',
    summaryEn: 'Sulayman (AS), son of Dawud, was a prophet-king granted a kingdom unlike any other: he understood the speech of birds and ants, commanded the wind and the jinn, and ruled with wisdom and justice. He invited the Queen of Sheba (Saba) to worship Allah alone. Despite his power, he remained humble and grateful, asking Allah to keep him thankful.',
    summaryBn: 'সুলাইমান (আঃ), দাউদের পুত্র, ছিলেন একজন নবী-রাজা, যাঁকে এমন এক রাজত্ব দেওয়া হয় যার তুলনা নেই: তিনি পাখি ও পিঁপড়ার ভাষা বুঝতেন, বাতাস ও জিনদের নির্দেশ দিতেন এবং প্রজ্ঞা ও ন্যায়ে শাসন করতেন। তিনি সাবার রানিকে কেবল আল্লাহর ইবাদতের দিকে আহ্বান করেন। ক্ষমতা সত্ত্বেও তিনি বিনয়ী ও কৃতজ্ঞ থাকেন, আল্লাহর কাছে কৃতজ্ঞ রাখার দোয়া করেন।',
    events: [
      { en: 'He understood the speech of birds and ants.', bn: 'তিনি পাখি ও পিঁপড়ার ভাষা বুঝতেন।' },
      { en: 'The wind and the jinn were made subject to him.', bn: 'বাতাস ও জিনদের তাঁর অধীন করা হয়।' },
      { en: 'He guided the Queen of Sheba to submit to Allah.', bn: 'তিনি সাবার রানিকে আল্লাহর কাছে আত্মসমর্পণে পথ দেখান।' },
    ],
    refs: ['27:15-44', '38:30-40', '21:81-82', '34:12-14'],
    lessonEn: 'The greatest kingdom is still a trust; true greatness is gratitude and humility before Allah.',
    lessonBn: 'সবচেয়ে বড় রাজত্বও একটি আমানত; প্রকৃত মহত্ত্ব হলো আল্লাহর সামনে কৃতজ্ঞতা ও বিনয়।',
  },
  {
    id: 'ilyas', order: 19, ar: 'إلياس', translit: 'Ilyas', en: 'Ilyas (Elijah)', bn: 'ইলিয়াস',
    rank: 'nabi', ululAzm: false,
    eraEn: 'Children of Israel (ancient)', eraBn: 'বনী ইসরাঈল (প্রাচীন)',
    nationEn: 'His people who worshipped Ba’l', nationBn: 'বাল দেবতার পূজারি তাঁর সম্প্রদায়',
    summaryEn: 'Ilyas (AS) was a prophet of the Children of Israel sent to a people who worshipped an idol called Ba’l. He called them to worship Allah, the Best of Creators, and to abandon their false god. Most denied him, but Allah preserved his good name among later generations.',
    summaryBn: 'ইলিয়াস (আঃ) ছিলেন বনী ইসরাঈলের একজন নবী, যাঁকে বাল নামের এক মূর্তির পূজারি সম্প্রদায়ের কাছে পাঠানো হয়। তিনি তাদের সর্বশ্রেষ্ঠ স্রষ্টা আল্লাহর ইবাদত ও মিথ্যা উপাস্য ত্যাগের দিকে ডাকেন। অধিকাংশ তাঁকে অস্বীকার করে, তবু আল্লাহ পরবর্তী প্রজন্মে তাঁর সুনাম সংরক্ষিত রাখেন।',
    events: [
      { en: 'He called his people away from the idol Ba’l.', bn: 'তিনি সম্প্রদায়কে বাল মূর্তি থেকে ফেরার আহ্বান করেন।' },
      { en: 'He proclaimed Allah as "the Best of Creators."', bn: 'তিনি আল্লাহকে "সর্বশ্রেষ্ঠ স্রষ্টা" বলে ঘোষণা করেন।' },
      { en: 'Allah left an honourable remembrance of him.', bn: 'আল্লাহ তাঁর সম্মানজনক স্মৃতি রেখে দেন।' },
    ],
    refs: ['37:123-132', '6:85'],
    lessonEn: 'Call people to their Creator and leave the outcome, and your name, with Allah.',
    lessonBn: 'মানুষকে তাদের স্রষ্টার দিকে ডাকুন এবং ফল ও নিজের নাম আল্লাহর হাতে ছেড়ে দিন।',
  },
  {
    id: 'alyasa', order: 20, ar: 'اليسع', translit: "Al-Yasa'", en: "Al-Yasa' (Elisha)", bn: 'আল-ইয়াসা',
    rank: 'nabi', ululAzm: false,
    eraEn: 'Children of Israel (ancient)', eraBn: 'বনী ইসরাঈল (প্রাচীন)',
    nationEn: 'The Children of Israel', nationBn: 'বনী ইসরাঈল',
    summaryEn: 'Al-Yasa’ (AS) is named in the Quran among the prophets favoured above the worlds and among "the good." He continued the guidance of the Children of Israel. As with several prophets, the Quran mentions him with honour but keeps the narrative brief.',
    summaryBn: 'আল-ইয়াসা (আঃ)-এর নাম কুরআনে সৃষ্টিকুলের ওপর মর্যাদাপ্রাপ্ত নবীদের মধ্যে ও "উত্তমদের" মধ্যে উল্লিখিত। তিনি বনী ইসরাঈলের পথনির্দেশ অব্যাহত রাখেন। কয়েকজন নবীর মতো কুরআন তাঁকে সম্মানের সাথে উল্লেখ করলেও বিবরণ সংক্ষিপ্ত রাখে।',
    events: [
      { en: 'Named among prophets favoured above the worlds.', bn: 'সৃষ্টিকুলের ওপর মর্যাদাপ্রাপ্ত নবীদের মধ্যে নামোল্লেখ।' },
      { en: 'Counted among "the good" (al-akhyar).', bn: '"উত্তমদের" (আল-আখইয়ার) মধ্যে গণ্য।' },
    ],
    refs: ['6:86', '38:48'],
    lessonEn: 'Every prophet, named at length or in brief, calls to the same worship of the One God.',
    lessonBn: 'প্রত্যেক নবী, বিস্তারিত হোক বা সংক্ষিপ্ত, একই এক আল্লাহর ইবাদতের দিকেই ডাকেন।',
  },
  {
    id: 'yunus', order: 21, ar: 'يونس', translit: 'Yunus', en: 'Yunus (Jonah), Dhun-Nun', bn: 'ইউনুস',
    rank: 'rasul', ululAzm: false,
    eraEn: 'Nineveh (ancient)', eraBn: 'নিনেভা (প্রাচীন)',
    nationEn: 'The people of Nineveh', nationBn: 'নিনেভার অধিবাসী',
    summaryEn: 'Yunus (AS), also called Dhun-Nun, was sent to the people of Nineveh. When they refused to believe, he left in frustration before Allah’s leave; at sea he was cast overboard and swallowed by a great fish. In the darkness he cried out, "There is no god but You; glory be to You; I have been of the wrongdoers," and Allah saved him. Remarkably, his whole people then believed and were spared.',
    summaryBn: 'ইউনুস (আঃ), যাঁকে যুন-নূনও বলা হয়, নিনেভার অধিবাসীদের কাছে প্রেরিত হন। তারা ঈমান আনতে অস্বীকার করলে তিনি আল্লাহর অনুমতির আগেই ক্ষোভে চলে যান; সমুদ্রে তাঁকে ফেলে দেওয়া হয় ও এক বিশাল মাছ তাঁকে গিলে ফেলে। অন্ধকারে তিনি ডাকেন, "তুমি ছাড়া কোনো ইলাহ নেই; তুমি পবিত্র; নিশ্চয়ই আমি সীমালঙ্ঘনকারীদের অন্তর্ভুক্ত," আর আল্লাহ তাঁকে রক্ষা করেন। উল্লেখযোগ্যভাবে তখন তাঁর গোটা সম্প্রদায় ঈমান আনে ও রক্ষা পায়।',
    events: [
      { en: 'He left his people before Allah’s permission.', bn: 'তিনি আল্লাহর অনুমতির আগেই সম্প্রদায় ত্যাগ করেন।' },
      { en: 'He was swallowed by a great fish and prayed in the darkness.', bn: 'এক বিশাল মাছ তাঁকে গিলে ফেলে ও তিনি অন্ধকারে দোয়া করেন।' },
      { en: 'Allah delivered him; his people believed and were spared.', bn: 'আল্লাহ তাঁকে উদ্ধার করেন; তাঁর সম্প্রদায় ঈমান আনে ও রক্ষা পায়।' },
    ],
    refs: ['21:87-88', '37:139-148', '10:98', '68:48-50'],
    lessonEn: 'No darkness is beyond Allah’s rescue when we turn back to Him and admit our fault.',
    lessonBn: 'যখন আমরা আল্লাহর দিকে ফিরি ও ভুল স্বীকার করি, কোনো অন্ধকারই তাঁর উদ্ধারের বাইরে নয়।',
  },
  {
    id: 'zakariya', order: 22, ar: 'زكريا', translit: 'Zakariya', en: 'Zakariya (Zachariah)', bn: 'যাকারিয়া',
    rank: 'nabi', ululAzm: false,
    eraEn: 'Before Isa (Jerusalem)', eraBn: 'ঈসার পূর্বে (জেরুজালেম)',
    nationEn: 'The Children of Israel', nationBn: 'বনী ইসরাঈল',
    summaryEn: 'Zakariya (AS) was a devoted prophet and the guardian of Maryam (Mary). Seeing Allah’s provision for Maryam, and though old and his wife barren, he prayed for a righteous heir. Allah answered with the glad tidings of a son, Yahya, and gave him a sign: he would not speak to people for three days except by gesture.',
    summaryBn: 'যাকারিয়া (আঃ) ছিলেন একজন নিবেদিত নবী ও মারইয়ামের (মেরি) অভিভাবক। মারইয়ামের জন্য আল্লাহর রিজিক দেখে, বৃদ্ধ ও স্ত্রী বন্ধ্যা হওয়া সত্ত্বেও, তিনি এক সৎ উত্তরাধিকারীর জন্য দোয়া করেন। আল্লাহ ইয়াহইয়া নামে এক পুত্রের সুসংবাদ দিয়ে সাড়া দেন ও এক নিদর্শন দেন: তিনি তিন দিন ইশারা ছাড়া মানুষের সাথে কথা বলবেন না।',
    events: [
      { en: 'He cared for Maryam and saw Allah’s provision for her.', bn: 'তিনি মারইয়ামের দেখাশোনা করেন ও তাঁর জন্য আল্লাহর রিজিক দেখেন।' },
      { en: 'In old age he prayed for a righteous heir.', bn: 'বৃদ্ধ বয়সে তিনি এক সৎ উত্তরাধিকারীর জন্য দোয়া করেন।' },
      { en: 'He was given the glad tidings of his son Yahya.', bn: 'তাঁকে পুত্র ইয়াহইয়ার সুসংবাদ দেওয়া হয়।' },
    ],
    refs: ['19:2-11', '3:37-41', '21:89-90'],
    lessonEn: 'Never stop making du’a; Allah answers in ways beyond our expectation.',
    lessonBn: 'দোয়া করা কখনো থামাবেন না; আল্লাহ আমাদের প্রত্যাশার বাইরে সাড়া দেন।',
  },
  {
    id: 'yahya', order: 23, ar: 'يحيى', translit: 'Yahya', en: 'Yahya (John)', bn: 'ইয়াহইয়া',
    rank: 'nabi', ululAzm: false,
    eraEn: 'Cousin & forerunner of Isa (Jerusalem)', eraBn: 'ঈসার চাচাতো ভাই ও অগ্রদূত (জেরুজালেম)',
    nationEn: 'The Children of Israel', nationBn: 'বনী ইসরাঈল',
    summaryEn: 'Yahya (AS), son of Zakariya, was granted wisdom while still a child and was pure, dutiful to his parents, and never arrogant or disobedient. He confirmed the word of Allah and lived a life of devotion and truth. The Quran sends peace upon him at his birth, his death, and his resurrection.',
    summaryBn: 'ইয়াহইয়া (আঃ), যাকারিয়ার পুত্র, শিশু অবস্থাতেই প্রজ্ঞা লাভ করেন এবং ছিলেন পবিত্র, পিতামাতার প্রতি অনুগত এবং কখনো অহংকারী বা অবাধ্য নন। তিনি আল্লাহর বাণী সত্যায়ন করেন ও নিষ্ঠা ও সত্যের জীবন যাপন করেন। কুরআন তাঁর জন্মে, মৃত্যুতে ও পুনরুত্থানে তাঁর প্রতি শান্তি বর্ষণ করে।',
    events: [
      { en: 'He was given wisdom and knowledge as a child.', bn: 'শিশু অবস্থায় তাঁকে প্রজ্ঞা ও জ্ঞান দেওয়া হয়।' },
      { en: 'He was pure, God-fearing, and devoted to his parents.', bn: 'তিনি ছিলেন পবিত্র, আল্লাহভীরু ও পিতামাতার প্রতি নিবেদিত।' },
      { en: 'He confirmed the truth sent by Allah.', bn: 'তিনি আল্লাহর পাঠানো সত্য সত্যায়ন করেন।' },
    ],
    refs: ['19:12-15', '3:39', '6:85'],
    lessonEn: 'Purity, dutifulness to parents, and humility are the marks of a beloved servant.',
    lessonBn: 'পবিত্রতা, পিতামাতার প্রতি কর্তব্যনিষ্ঠা ও বিনয় একজন প্রিয় বান্দার পরিচয়।',
  },
  {
    id: 'isa', order: 24, ar: 'عيسى', translit: 'Isa', en: 'Isa (Jesus), al-Masih', bn: 'ঈসা',
    rank: 'rasul', ululAzm: true,
    eraEn: 'Near the start of the Common Era (Jerusalem)', eraBn: 'খ্রিস্টাব্দের সূচনার কাছাকাছি (জেরুজালেম)',
    nationEn: 'The Children of Israel', nationBn: 'বনী ইসরাঈল',
    summaryEn: 'Isa (AS) — a messenger and one of the Ulul-Azm, called al-Masih (the Messiah) — was born miraculously to the virgin Maryam by Allah’s command "Be." He spoke from the cradle, was given the Injil (Gospel), and by Allah’s permission healed the sick and gave life. He called Israel to worship the One God; the Quran teaches he was not killed or crucified, but Allah raised him to Himself, and he will return.',
    summaryBn: 'ঈসা (আঃ) — একজন রাসূল ও উলুল-আযমের একজন, যাঁকে আল-মাসীহ (মসীহ) বলা হয় — আল্লাহর "হও" বাণীতে কুমারী মারইয়ামের কাছে অলৌকিকভাবে জন্মগ্রহণ করেন। তিনি দোলনায় কথা বলেন, তাঁকে ইঞ্জিল দেওয়া হয় এবং আল্লাহর অনুমতিতে তিনি রোগীকে সুস্থ করতেন ও প্রাণ দিতেন। তিনি বনী ইসরাঈলকে এক আল্লাহর ইবাদতের দিকে ডাকেন; কুরআন শেখায় যে তাঁকে হত্যা বা শূলবিদ্ধ করা হয়নি, বরং আল্লাহ তাঁকে নিজের কাছে তুলে নেন, এবং তিনি ফিরে আসবেন।',
    events: [
      { en: 'He was born miraculously to Maryam and spoke from the cradle.', bn: 'তিনি মারইয়ামের কাছে অলৌকিকভাবে জন্মান ও দোলনায় কথা বলেন।' },
      { en: 'He was given the Injil and, by Allah’s leave, worked signs.', bn: 'তাঁকে ইঞ্জিল দেওয়া হয় ও আল্লাহর অনুমতিতে তিনি নিদর্শন দেখান।' },
      { en: 'He called Israel to worship the One God, his and their Lord.', bn: 'তিনি বনী ইসরাঈলকে তাঁর ও তাদের প্রভু এক আল্লাহর ইবাদতের দিকে ডাকেন।' },
      { en: 'He was not killed; Allah raised him up, and he will return.', bn: 'তাঁকে হত্যা করা হয়নি; আল্লাহ তাঁকে তুলে নেন, এবং তিনি ফিরে আসবেন।' },
    ],
    refs: ['3:45-51', '19:16-34', '5:110-116', '4:157-158'],
    lessonEn: 'The Messiah was a noble servant and messenger of Allah, calling to the worship of the One God.',
    lessonBn: 'মসীহ ছিলেন আল্লাহর এক মহান বান্দা ও রাসূল, যিনি এক আল্লাহর ইবাদতের দিকে ডাকতেন।',
  },
  {
    id: 'muhammad', order: 25, ar: 'محمد ﷺ', translit: 'Muhammad', en: 'Muhammad ﷺ', bn: 'মুহাম্মাদ ﷺ',
    rank: 'rasul', ululAzm: true, final: true,
    eraEn: 'c. 570–632 CE (Mecca & Medina)', eraBn: 'আনু. ৫৭০–৬৩২ খ্রি. (মক্কা ও মদিনা)',
    nationEn: 'All humanity — the final messenger', nationBn: 'সমগ্র মানবজাতি — সর্বশেষ রাসূল',
    summaryEn: 'Muhammad ﷺ — a messenger, one of the Ulul-Azm, and the Seal of the Prophets — was born in Mecca and received the first revelation of the Quran through the angel Jibril at about age forty. Over 23 years he conveyed the complete message, established the religion, and was sent as a mercy to all the worlds. He is the last prophet; no prophet comes after him.',
    summaryBn: 'মুহাম্মাদ ﷺ — একজন রাসূল, উলুল-আযমের একজন ও শেষ নবী (খাতামুন-নাবিয়্যীন) — মক্কায় জন্মগ্রহণ করেন এবং প্রায় চল্লিশ বছর বয়সে ফেরেশতা জিবরীলের মাধ্যমে কুরআনের প্রথম ওহি লাভ করেন। ২৩ বছরে তিনি পূর্ণ বার্তা পৌঁছান, দ্বীন প্রতিষ্ঠা করেন এবং সমগ্র জগতের জন্য রহমতরূপে প্রেরিত হন। তিনি সর্বশেষ নবী; তাঁর পরে আর কোনো নবী আসবেন না।',
    events: [
      { en: 'The first revelation came in the Cave of Hira: "Read!"', bn: 'হেরা গুহায় প্রথম ওহি আসে: "পড়ো!"' },
      { en: 'He called to tawhid in Mecca amid persecution, then made the Hijra to Medina.', bn: 'তিনি নির্যাতনের মধ্যে মক্কায় তাওহিদের দাওয়াত দেন, পরে মদিনায় হিজরত করেন।' },
      { en: 'He established the Muslim community and completed the message.', bn: 'তিনি মুসলিম সমাজ প্রতিষ্ঠা করেন ও বার্তা পূর্ণ করেন।' },
      { en: 'He is the Seal of the Prophets — a mercy to all the worlds.', bn: 'তিনি শেষ নবী — সমগ্র জগতের জন্য রহমত।' },
    ],
    refs: ['96:1-5', '33:40', '48:1-3', '53:1-11'],
    lessonEn: 'Follow the final messenger ﷺ — his life is the living example of the Quran and mercy to all.',
    lessonBn: 'সর্বশেষ রাসূল ﷺ-কে অনুসরণ করুন — তাঁর জীবনই কুরআনের জীবন্ত আদর্শ ও সবার জন্য রহমত।',
    seerahLink: true,
  },
];

/**
 * UI chrome fallback dictionary. tt() prefers global t() (so translations.js can
 * override once wired) and falls back here so the module renders under ANY UI
 * language (English fallback for others; Bengali authored inline).
 */
const PROPHETS_UI = {
  prophets_title: { en: 'Prophets & Messengers', bn: 'নবী ও রাসূলগণ' },
  prophets_subtitle: { en: 'The 25 prophets named in the Quran (Anbiya wa Rusul)', bn: 'কুরআনে নামোল্লেখিত ২৫ জন নবী (আম্বিয়া ওয়া রুসুল)' },
  prophets_intro: { en: 'Explore the prophets named in the Quran in traditional order. Tap any name to read the story, key events, verses, and a lesson.', bn: 'ঐতিহ্যগত ক্রমে কুরআনে নামোল্লেখিত নবীদের জানুন। কাহিনি, গুরুত্বপূর্ণ ঘটনা, আয়াত ও শিক্ষা পড়তে যেকোনো নামে ট্যাপ করুন।' },
  prophets_view_timeline: { en: 'Timeline', bn: 'টাইমলাইন' },
  prophets_view_grid: { en: 'Grid', bn: 'গ্রিড' },
  prophets_search_placeholder: { en: 'Search by name (Arabic / English)…', bn: 'নাম দিয়ে খুঁজুন (আরবি / ইংরেজি)…' },
  prophets_filter_all: { en: 'All', bn: 'সব' },
  prophets_filter_rasul: { en: 'Messengers (Rasul)', bn: 'রাসূলগণ' },
  prophets_filter_ululazm: { en: "Ulul-'Azm", bn: 'উলুল-আযম' },
  prophets_badge_nabi: { en: 'Nabi (Prophet)', bn: 'নবী' },
  prophets_badge_rasul: { en: 'Rasul (Messenger)', bn: 'রাসূল' },
  prophets_badge_ululazm: { en: "Ulul-'Azm", bn: 'উলুল-আযম' },
  prophets_badge_final: { en: 'Final Prophet', bn: 'সর্বশেষ নবী' },
  prophets_label_nation: { en: 'Sent to', bn: 'যাদের কাছে প্রেরিত' },
  prophets_label_era: { en: 'Era', bn: 'যুগ' },
  prophets_label_events: { en: 'Key events', bn: 'গুরুত্বপূর্ণ ঘটনা' },
  prophets_label_refs: { en: 'Quran references', bn: 'কুরআন রেফারেন্স' },
  prophets_label_lesson: { en: 'Lesson', bn: 'শিক্ষা' },
  prophets_label_story: { en: 'Story & mission', bn: 'কাহিনি ও মিশন' },
  prophets_mark_read: { en: 'Mark as read', bn: 'পঠিত চিহ্নিত করুন' },
  prophets_marked_read: { en: 'Read', bn: 'পঠিত' },
  prophets_back: { en: 'Back', bn: 'ফিরে যান' },
  prophets_progress: { en: 'Your progress', bn: 'আপনার অগ্রগতি' },
  prophets_reset: { en: 'Reset', bn: 'রিসেট' },
  prophets_no_results: { en: 'No prophets match your search.', bn: 'আপনার অনুসন্ধানের সাথে কোনো নবী মেলেনি।' },
  prophets_ref_hint: { en: 'Tap a reference to open the verse', bn: 'আয়াত খুলতে রেফারেন্সে ট্যাপ করুন' },
  prophets_seerah_btn: { en: 'View full Seerah timeline', bn: 'সম্পূর্ণ সিরাত টাইমলাইন দেখুন' },
  prophets_tap_detail: { en: 'Tap to read more', bn: 'বিস্তারিত পড়তে ট্যাপ করুন' },
  prophets_date_note: { en: 'Note: exact dates for the early prophets are not established in Islamic sources — only the traditional relative order is shown. Later eras marked "approx." reflect commonly-cited estimates.', bn: 'নোট: প্রাথমিক নবীদের সঠিক তারিখ ইসলামি সূত্রে প্রতিষ্ঠিত নয় — কেবল ঐতিহ্যগত আপেক্ষিক ক্রম দেখানো হয়েছে। পরবর্তী "আনুমানিক" যুগগুলো প্রচলিত অনুমান নির্দেশ করে।' },
  prophets_many_note: { en: 'Islam teaches that Allah sent many prophets to every nation; a well-known narration mentions a very large number, but only these 25 are named in the Quran.', bn: 'ইসলাম শেখায় আল্লাহ প্রতিটি জাতির কাছে বহু নবী পাঠিয়েছেন; একটি সুপরিচিত বর্ণনায় বিশাল সংখ্যার উল্লেখ আছে, তবে কুরআনে কেবল এই ২৫ জনের নাম আছে।' },
  prophets_of: { en: 'of', bn: 'এর মধ্যে' },
};

class ProphetsView {
  constructor() {
    this.container = document.getElementById('prophets-container');
    if (!this.container) return;
    this.language = (typeof appSettings !== 'undefined' && appSettings) ? appSettings.get('language') : 'en';
    if (!this.language) this.language = 'en';
    this.rendered = false;
    this.view = 'timeline';   // 'timeline' | 'grid'
    this.filter = 'all';      // 'all' | 'rasul' | 'ululazm'
    this.query = '';
    this.selected = null;     // prophet id when in detail view
    this.read = this.loadRead();

    window.addEventListener('tabChanged', (e) => {
      try { if (e && e.detail && e.detail.tabId === 'prophets') this.render(); } catch (_) { /* ignore */ }
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
    const e = PROPHETS_UI[key];
    if (e) return this.language === 'bn' ? (e.bn || e.en) : e.en;
    return key;
  }
  esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
  pick(item, field) {
    const bn = item[field + 'Bn'];
    const en = item[field + 'En'];
    return this.language === 'bn' ? (bn || en) : en;
  }
  loc(item, base) {
    // for items using {en, bn} object fields
    return this.language === 'bn' ? (item[base + 'Bn'] || item[base + 'En']) : item[base + 'En'];
  }

  loadRead() {
    try {
      const raw = localStorage.getItem('lq_prophets_read');
      if (!raw) return new Set();
      const arr = JSON.parse(raw);
      return new Set(Array.isArray(arr) ? arr : []);
    } catch (_) { return new Set(); }
  }
  saveRead() {
    try { localStorage.setItem('lq_prophets_read', JSON.stringify([...this.read])); } catch (_) { /* ignore */ }
  }

  // Look up a surah name (verified list lives in SURAH_DATA) for a ref label.
  surahName(n) {
    try {
      if (typeof getSurahByNumber === 'function') {
        const s = getSurahByNumber(n);
        if (s && s.names) return (this.language === 'bn' ? (s.names.bn || s.names.en) : s.names.en) || ('Surah ' + n);
        if (s && s.arabicName) return s.arabicName;
      }
      if (typeof SURAH_DATA !== 'undefined' && Array.isArray(SURAH_DATA)) {
        const s = SURAH_DATA.find(x => x.number === n);
        if (s && s.names) return (this.language === 'bn' ? (s.names.bn || s.names.en) : s.names.en) || ('Surah ' + n);
      }
    } catch (_) { /* ignore */ }
    return 'Surah ' + n;
  }

  // Convert a display ref ("7:11-25" or "12") to an openable "surah:ayah".
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

  matches(p) {
    if (this.filter === 'rasul' && p.rank !== 'rasul') return false;
    if (this.filter === 'ululazm' && !p.ululAzm) return false;
    const q = this.query.trim().toLowerCase();
    if (!q) return true;
    const hay = [p.ar, p.translit, p.en, p.bn, this.loc(p, 'nation')].join(' ').toLowerCase();
    return hay.indexOf(q) !== -1;
  }

  // ── SVG accent (abstract, geometric — NO figurative imagery) ─────────
  starAccent(cls) {
    return `<svg viewBox="0 0 40 40" class="${cls}" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.2">
      <polygon points="20,3 24,16 37,20 24,24 20,37 16,24 3,20 16,16" opacity="0.9"/>
      <circle cx="20" cy="20" r="6" opacity="0.5"/>
    </svg>`;
  }

  // ── rendering ────────────────────────────────────────────────────────
  render() {
    if (!this.container) return;
    this.rendered = true;
    if (this.selected) { this.renderDetail(); this.bind(); return; }

    const total = PROPHETS_DATA.length;
    const readCount = PROPHETS_DATA.filter(p => this.read.has(p.id)).length;
    const pct = total ? Math.round((readCount / total) * 100) : 0;

    const viewToggle = ['timeline', 'grid'].map(v => {
      const active = this.view === v;
      const label = v === 'timeline' ? this.tt('prophets_view_timeline') : this.tt('prophets_view_grid');
      const icon = v === 'timeline' ? '🕰️' : '▦';
      return `<button type="button" data-prophets-view="${v}"
        class="px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors
               ${active ? 'bg-primary text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-primary'}">
        <span aria-hidden="true">${icon}</span> ${this.esc(label)}</button>`;
    }).join('');

    const filters = [
      { id: 'all', key: 'prophets_filter_all', emoji: '✦' },
      { id: 'rasul', key: 'prophets_filter_rasul', emoji: '📜' },
      { id: 'ululazm', key: 'prophets_filter_ululazm', emoji: '★' },
    ].map(c => {
      const active = this.filter === c.id;
      return `<button type="button" data-prophets-filter="${c.id}"
        class="px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap border transition-colors
               ${active ? 'bg-primary text-white border-primary'
                        : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-primary'}">
        <span aria-hidden="true">${c.emoji}</span> ${this.esc(this.tt(c.key))}</button>`;
    }).join('');

    this.container.innerHTML = `
      <div class="w-full max-w-4xl mx-auto pb-10">
        <div class="text-center mb-2">
          <p class="text-gray-500 dark:text-gray-400 text-sm">${this.esc(this.tt('prophets_subtitle'))}</p>
        </div>
        <p class="text-xs text-gray-400 dark:text-gray-500 text-center mb-4" dir="auto">${this.esc(this.tt('prophets_intro'))}</p>

        <div class="rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3 mb-4">
          <div class="flex items-center justify-between gap-2 mb-1.5">
            <span class="text-xs font-medium text-gray-500 dark:text-gray-400">${this.esc(this.tt('prophets_progress'))}</span>
            <span class="text-xs font-semibold text-primary" data-prophets-count>${readCount} ${this.esc(this.tt('prophets_of'))} ${total}</span>
          </div>
          <div class="h-2 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
            <div class="h-full bg-primary transition-all" style="width:${pct}%" data-prophets-bar></div>
          </div>
          <div class="text-right mt-1">
            <button type="button" data-prophets-reset class="text-[0.7rem] text-gray-400 hover:text-red-500 transition-colors">↺ ${this.esc(this.tt('prophets_reset'))}</button>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
          <div class="inline-flex gap-1 p-1 rounded-xl bg-gray-100 dark:bg-gray-800 w-max">${viewToggle}</div>
          <input type="text" data-prophets-search value="${this.esc(this.query)}"
            placeholder="${this.esc(this.tt('prophets_search_placeholder'))}"
            class="flex-1 px-3 py-2 rounded-lg text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none" dir="auto" />
        </div>
        <div class="flex flex-wrap gap-2 mb-5">${filters}</div>

        <div data-prophets-list></div>

        <div class="mt-6 space-y-2">
          <p class="text-[0.7rem] text-gray-400 dark:text-gray-500 leading-relaxed p-3 rounded-lg bg-gray-50 dark:bg-gray-800/60" dir="auto">🗓️ ${this.esc(this.tt('prophets_date_note'))}</p>
          <p class="text-[0.7rem] text-gray-400 dark:text-gray-500 leading-relaxed p-3 rounded-lg bg-gray-50 dark:bg-gray-800/60" dir="auto">✦ ${this.esc(this.tt('prophets_many_note'))}</p>
        </div>
      </div>`;

    this.renderList();
    this.bind();
  }

  renderList() {
    const listEl = this.container.querySelector('[data-prophets-list]');
    if (!listEl) return;
    const items = PROPHETS_DATA.filter(p => this.matches(p));
    if (!items.length) {
      listEl.innerHTML = `<p class="text-center text-gray-400 dark:text-gray-500 text-sm py-10">${this.esc(this.tt('prophets_no_results'))}</p>`;
      return;
    }
    listEl.innerHTML = this.view === 'timeline' ? this.timelineHtml(items) : this.gridHtml(items);
  }

  badges(p, compact) {
    const rankBadge = p.rank === 'rasul'
      ? `<span class="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-300 text-[0.65rem] font-semibold whitespace-nowrap">${this.esc(this.tt('prophets_badge_rasul'))}</span>`
      : `<span class="px-1.5 py-0.5 rounded bg-gray-500/10 text-gray-500 dark:text-gray-300 text-[0.65rem] font-semibold whitespace-nowrap">${this.esc(this.tt('prophets_badge_nabi'))}</span>`;
    const ululBadge = p.ululAzm
      ? `<span class="px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-600 dark:text-amber-300 text-[0.65rem] font-semibold whitespace-nowrap">★ ${this.esc(this.tt('prophets_badge_ululazm'))}</span>`
      : '';
    const finalBadge = p.final
      ? `<span class="px-1.5 py-0.5 rounded bg-green-500/15 text-green-600 dark:text-green-300 text-[0.65rem] font-semibold whitespace-nowrap">${this.esc(this.tt('prophets_badge_final'))}</span>`
      : '';
    return rankBadge + ululBadge + finalBadge;
  }

  timelineHtml(items) {
    return `
      <ol class="relative border-s-2 border-gray-200 dark:border-gray-700 ms-4 space-y-4">
        ${items.map(p => {
          const isRead = this.read.has(p.id);
          return `
          <li class="ms-6">
            <span class="absolute -start-[0.72rem] flex items-center justify-center w-6 h-6 rounded-full ${isRead ? 'bg-green-500 text-white' : 'bg-primary/15 text-primary'} ring-4 ring-gray-50 dark:ring-gray-900 text-[0.7rem] font-bold" aria-hidden="true">${p.order}</span>
            <button type="button" data-prophets-open="${this.esc(p.id)}"
              class="w-full text-left rounded-xl bg-white dark:bg-gray-800 border ${isRead ? 'border-green-300 dark:border-green-800' : 'border-gray-200 dark:border-gray-700'} p-4 hover:border-primary hover:shadow-md transition-all">
              <div class="flex items-start gap-3">
                <span class="text-2xl font-arabic text-primary shrink-0" dir="rtl" lang="ar">${this.esc(p.ar)}</span>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2 flex-wrap">
                    <span class="font-bold text-gray-800 dark:text-gray-100">${this.esc(p.translit)}</span>
                    <span class="text-xs text-gray-400 dark:text-gray-500">${this.esc(this.language === 'bn' ? p.bn : p.en)}</span>
                    ${isRead ? '<span class="text-green-500 text-xs">✓</span>' : ''}
                  </div>
                  <div class="flex flex-wrap gap-1 mt-1.5">${this.badges(p, true)}</div>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1.5" dir="auto">
                    <span class="opacity-70">${this.esc(this.tt('prophets_label_nation'))}:</span> ${this.esc(this.loc(p, 'nation'))}
                  </p>
                </div>
                <span class="text-gray-300 dark:text-gray-600 shrink-0" aria-hidden="true">›</span>
              </div>
            </button>
          </li>`;
        }).join('')}
      </ol>`;
  }

  gridHtml(items) {
    return `
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        ${items.map(p => {
          const isRead = this.read.has(p.id);
          return `
          <button type="button" data-prophets-open="${this.esc(p.id)}"
            class="group text-left relative rounded-xl bg-white dark:bg-gray-800 border ${isRead ? 'border-green-300 dark:border-green-800' : 'border-gray-200 dark:border-gray-700'} p-4 hover:border-primary hover:shadow-md transition-all overflow-hidden">
            <span class="absolute top-2 end-2 text-primary/15 group-hover:text-primary/30 transition-colors">${this.starAccent('w-8 h-8')}</span>
            <span class="inline-flex items-center justify-center w-7 h-7 rounded-full ${isRead ? 'bg-green-500 text-white' : 'bg-primary/10 text-primary'} text-xs font-bold mb-2" aria-hidden="true">${p.order}</span>
            <div class="text-2xl font-arabic text-primary mb-1" dir="rtl" lang="ar">${this.esc(p.ar)}</div>
            <div class="font-bold text-gray-800 dark:text-gray-100">${this.esc(p.translit)} ${isRead ? '<span class="text-green-500 text-xs align-middle">✓</span>' : ''}</div>
            <div class="text-xs text-gray-400 dark:text-gray-500 mb-2">${this.esc(this.language === 'bn' ? p.bn : p.en)}</div>
            <div class="flex flex-wrap gap-1">${this.badges(p, true)}</div>
          </button>`;
        }).join('')}
      </div>`;
  }

  renderDetail() {
    const p = PROPHETS_DATA.find(x => x.id === this.selected);
    if (!p) { this.selected = null; this.render(); return; }
    const isRead = this.read.has(p.id);

    const events = Array.isArray(p.events) ? p.events : [];
    const eventsHtml = events.length ? `
      <div class="mb-4">
        <h3 class="text-sm font-bold text-gray-700 dark:text-gray-200 mb-2 flex items-center gap-1.5">◆ ${this.esc(this.tt('prophets_label_events'))}</h3>
        <ul class="space-y-1.5">
          ${events.map(ev => `<li class="flex gap-2 text-sm text-gray-600 dark:text-gray-300" dir="auto"><span class="text-primary mt-0.5 shrink-0" aria-hidden="true">▸</span><span class="flex-1">${this.esc(this.language === 'bn' ? (ev.bn || ev.en) : ev.en)}</span></li>`).join('')}
        </ul>
      </div>` : '';

    const refs = Array.isArray(p.refs) ? p.refs : [];
    const refsHtml = refs.length ? `
      <div class="mb-4">
        <h3 class="text-sm font-bold text-gray-700 dark:text-gray-200 mb-1 flex items-center gap-1.5">📖 ${this.esc(this.tt('prophets_label_refs'))}</h3>
        <p class="text-[0.7rem] text-gray-400 dark:text-gray-500 mb-2">${this.esc(this.tt('prophets_ref_hint'))}</p>
        <div class="flex flex-wrap gap-1.5">
          ${refs.map(r => `<button type="button" data-prophets-ayah="${this.esc(this.openRef(r))}"
            class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium hover:bg-primary hover:text-white transition-colors" dir="auto">
            📖 ${this.esc(this.refLabel(r))}</button>`).join('')}
        </div>
      </div>` : '';

    const seerahBtn = p.seerahLink ? `
      <button type="button" data-prophets-seerah
        class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 mb-4 rounded-xl bg-primary text-white font-semibold hover:opacity-90 transition-opacity">
        🌙 ${this.esc(this.tt('prophets_seerah_btn'))} <span aria-hidden="true">→</span>
      </button>` : '';

    this.container.innerHTML = `
      <div class="w-full max-w-2xl mx-auto pb-10">
        <button type="button" data-prophets-back
          class="inline-flex items-center gap-1.5 mb-4 text-sm text-gray-500 dark:text-gray-400 hover:text-primary transition-colors">
          <span aria-hidden="true">←</span> ${this.esc(this.tt('prophets_back'))}
        </button>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div class="relative p-5 bg-gradient-to-br from-primary/10 to-transparent">
            <span class="absolute top-3 end-3 text-primary/20">${this.starAccent('w-12 h-12')}</span>
            <div class="flex items-center gap-2 mb-1">
              <span class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/15 text-primary text-xs font-bold" aria-hidden="true">${p.order}</span>
              <span class="text-xs text-gray-400 dark:text-gray-500">#${p.order} ${this.esc(this.tt('prophets_of'))} ${PROPHETS_DATA.length}</span>
            </div>
            <div class="text-4xl font-arabic text-primary mb-1" dir="rtl" lang="ar">${this.esc(p.ar)}</div>
            <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100">${this.esc(p.translit)} <span class="text-gray-400 dark:text-gray-500 font-normal text-base">— ${this.esc(this.language === 'bn' ? p.bn : p.en)}</span></h2>
            <div class="flex flex-wrap gap-1.5 mt-2">${this.badges(p, false)}</div>
          </div>

          <div class="p-5">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
              <div class="p-2.5 rounded-lg bg-gray-50 dark:bg-gray-900/40">
                <div class="text-[0.65rem] uppercase tracking-wide text-gray-400 dark:text-gray-500 font-semibold">${this.esc(this.tt('prophets_label_nation'))}</div>
                <div class="text-sm text-gray-700 dark:text-gray-200" dir="auto">${this.esc(this.loc(p, 'nation'))}</div>
              </div>
              <div class="p-2.5 rounded-lg bg-gray-50 dark:bg-gray-900/40">
                <div class="text-[0.65rem] uppercase tracking-wide text-gray-400 dark:text-gray-500 font-semibold">${this.esc(this.tt('prophets_label_era'))}</div>
                <div class="text-sm text-gray-700 dark:text-gray-200" dir="auto">${this.esc(this.loc(p, 'era'))}</div>
              </div>
            </div>

            <div class="mb-4">
              <h3 class="text-sm font-bold text-gray-700 dark:text-gray-200 mb-2 flex items-center gap-1.5">✦ ${this.esc(this.tt('prophets_label_story'))}</h3>
              <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed" dir="auto">${this.esc(this.loc(p, 'summary'))}</p>
            </div>

            ${eventsHtml}
            ${refsHtml}

            <div class="mb-4 p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/40">
              <div class="text-xs font-bold text-amber-700 dark:text-amber-300 mb-1">💡 ${this.esc(this.tt('prophets_label_lesson'))}</div>
              <p class="text-sm text-amber-800 dark:text-amber-200 leading-relaxed" dir="auto">${this.esc(this.loc(p, 'lesson'))}</p>
            </div>

            ${seerahBtn}

            <button type="button" data-prophets-read="${this.esc(p.id)}"
              class="w-full sm:w-auto text-sm px-4 py-2.5 rounded-xl font-medium transition-colors
                     ${isRead ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' : 'bg-primary text-white hover:opacity-90'}">
              ${isRead ? '✓ ' + this.esc(this.tt('prophets_marked_read')) : this.esc(this.tt('prophets_mark_read'))}
            </button>
          </div>
        </div>
      </div>`;
  }

  // ── events ───────────────────────────────────────────────────────────
  bind() {
    if (this._bound) return;
    this._bound = true;

    this.container.addEventListener('click', (e) => {
      try {
        const back = e.target.closest('[data-prophets-back]');
        if (back) { this.selected = null; this.render(); return; }

        const open = e.target.closest('[data-prophets-open]');
        if (open) { this.selected = open.getAttribute('data-prophets-open'); this.render(); this.scrollTop(); return; }

        const viewBtn = e.target.closest('[data-prophets-view]');
        if (viewBtn) { this.view = viewBtn.getAttribute('data-prophets-view'); this.render(); return; }

        const filterBtn = e.target.closest('[data-prophets-filter]');
        if (filterBtn) { this.filter = filterBtn.getAttribute('data-prophets-filter'); this.render(); return; }

        const readBtn = e.target.closest('[data-prophets-read]');
        if (readBtn) { this.toggleRead(readBtn.getAttribute('data-prophets-read')); return; }

        const ayahBtn = e.target.closest('[data-prophets-ayah]');
        if (ayahBtn) { this.openAyah(ayahBtn.getAttribute('data-prophets-ayah')); return; }

        const seerah = e.target.closest('[data-prophets-seerah]');
        if (seerah) { this.openSeerah(); return; }

        const reset = e.target.closest('[data-prophets-reset]');
        if (reset) { this.resetProgress(); return; }
      } catch (_) { /* ignore */ }
    });

    this.container.addEventListener('input', (e) => {
      try {
        const search = e.target.closest ? e.target.closest('[data-prophets-search]') : null;
        if (search) { this.query = search.value || ''; this.renderList(); }
      } catch (_) { /* ignore */ }
    });
  }

  scrollTop() {
    try { if (this.container && this.container.scrollIntoView) this.container.scrollIntoView({ block: 'start' }); } catch (_) { /* ignore */ }
  }

  toggleRead(id) {
    if (this.read.has(id)) this.read.delete(id); else this.read.add(id);
    this.saveRead();
    if (this.selected === id) { this.renderDetail(); }
    else { this.renderList(); this.updateProgress(); }
  }

  updateProgress() {
    const total = PROPHETS_DATA.length;
    const readCount = PROPHETS_DATA.filter(p => this.read.has(p.id)).length;
    const pct = total ? Math.round((readCount / total) * 100) : 0;
    const countEl = this.container.querySelector('[data-prophets-count]');
    const barEl = this.container.querySelector('[data-prophets-bar]');
    if (countEl) countEl.textContent = `${readCount} ${this.tt('prophets_of')} ${total}`;
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

  openSeerah() {
    try {
      if (typeof tabSystem !== 'undefined' && tabSystem && typeof tabSystem.switchTab === 'function') {
        tabSystem.switchTab('seerah');
      }
    } catch (_) { /* ignore */ }
  }
}

let prophetsView;
document.addEventListener('DOMContentLoaded', () => { try { prophetsView = new ProphetsView(); } catch (_) { /* ignore */ } });
