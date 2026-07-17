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
      { en: 'Allah says He raised him to a high and honoured station.', bn: 'আল্লাহ বলেন তিনি তাঁকে উচ্চ ও সম্মানিত স্থানে উন্নীত করেছেন।' },
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
      { en: 'The Ark rested on Mount Judi as the waters receded.', bn: 'পানি নেমে গেলে নৌকা জুদি পাহাড়ে স্থির হয়।' },
    ],
    signEn: 'The great sign was the Ark and the Flood: at Allah’s word the sky poured down and springs gushed from the earth, and only those aboard were saved.',
    signBn: 'বড় নিদর্শন ছিল নৌকা ও মহাপ্লাবন: আল্লাহর আদেশে আকাশ বর্ষিত হয় ও ভূমি থেকে ঝর্ণা উৎসারিত হয়, আর কেবল নৌকায় আরোহীরাই রক্ষা পায়।',
    signRefs: ['11:40-44', '54:11-14'],
    spotlightEn: 'Nuh (AS) is the first of the Ulul-Azm messengers, and the Quran devotes an entire surah to him. He called his people privately and publicly, night and day, for nearly a thousand years all but fifty (29:14), yet they mocked him and stopped their ears. When it was clear none more would believe, Allah revealed the building of the Ark and taught him to load it with pairs and the believers. As the deniers drowned — including a son who thought a mountain would shelter him — the Ark carried the faithful to safety, and through them humanity continued.',
    spotlightBn: 'নূহ (আঃ) উলুল-আযম রাসূলদের প্রথম, আর কুরআন তাঁকে একটি পূর্ণ সূরা উৎসর্গ করেছে। তিনি প্রায় "হাজার বছরের পঞ্চাশ কম" (২৯:১৪) ধরে দিনরাত, গোপনে ও প্রকাশ্যে সম্প্রদায়কে ডাকেন, তবু তারা উপহাস করে ও কান বন্ধ করে রাখে। আর কেউ ঈমান আনবে না নিশ্চিত হলে আল্লাহ নৌকা নির্মাণের ওহি দেন ও তাঁকে জোড়া জোড়া প্রাণী ও মুমিনদের তুলতে শেখান। অস্বীকারকারীরা ডুবে যায় — যাদের মধ্যে এক পুত্রও ছিল যে ভেবেছিল পাহাড় তাকে বাঁচাবে — আর নৌকা মুমিনদের নিরাপত্তায় বহন করে, এবং তাঁদের মাধ্যমেই মানবজাতি টিকে থাকে।',
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
      { en: 'Hud and the believers were saved by Allah’s mercy.', bn: 'হুদ ও মুমিনরা আল্লাহর রহমতে রক্ষা পান।' },
    ],
    signEn: 'The sign for ’Ad was a barren, roaring wind Allah loosed against them for seven nights and eight days, leaving them fallen like hollow palm-trunks.',
    signBn: 'আদের জন্য নিদর্শন ছিল এক বন্ধ্যা গর্জনশীল ঝড়, যা আল্লাহ সাত রাত ও আট দিন তাদের বিরুদ্ধে ছেড়ে দেন, ফলে তারা ফাঁপা খেজুরকাণ্ডের মতো পড়ে থাকে।',
    signRefs: ['69:6-8', '41:15-16'],
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
      { en: 'Salih and the believers were spared the punishment.', bn: 'সালিহ ও মুমিনরা শাস্তি থেকে রক্ষা পান।' },
    ],
    signEn: 'The clear sign was the she-camel (naqat Allah) brought forth by Allah as a test, with an appointed share of water; when they hamstrung her, ruin followed within three days.',
    signBn: 'স্পষ্ট নিদর্শন ছিল আল্লাহর উষ্ট্রী (নাক়াতুল্লাহ), যা পরীক্ষা হিসেবে আনা হয় ও পানির নির্দিষ্ট ভাগ ছিল; তারা সেটিকে হত্যা করলে তিন দিনের মধ্যে ধ্বংস নেমে আসে।',
    signRefs: ['7:73', '11:64-65', '26:155-158'],
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
      { en: 'He asked Allah to show him how He gives life to the dead, and four birds returned to him.', bn: 'তিনি আল্লাহর কাছে মৃতকে জীবিত করার দৃশ্য দেখতে চান, আর চারটি পাখি তাঁর কাছে ফিরে আসে।' },
    ],
    signEn: 'When Ibrahim was cast into the blazing fire, Allah commanded, "O fire, be coolness and peace upon Ibrahim," and it did not harm him — a sign that Allah protects His servants.',
    signBn: 'ইবরাহীমকে জ্বলন্ত আগুনে নিক্ষেপ করা হলে আল্লাহ আদেশ দেন, "হে আগুন, তুমি ইবরাহীমের জন্য শীতল ও শান্তিময় হও," আর তা তাঁর ক্ষতি করেনি — এটি এক নিদর্শন যে আল্লাহ তাঁর বান্দাদের রক্ষা করেন।',
    signRefs: ['21:68-69', '2:260'],
    spotlightEn: 'Ibrahim (AS), the "friend of Allah" (khalil), searched for his Lord and reasoned past the star, the moon, and the sun to the One who created them (6:76-79). He confronted his idol-carving people and their king, was thrown into a fire that Allah made cool, and migrated for the sake of his Lord. His greatest trial came in a dream to sacrifice his son; both father and son submitted, and Allah ransomed the boy with a great sacrifice — commemorated in the Hajj. With Isma’il he raised the Ka’bah and prayed for a messenger to be sent among their descendants — a prayer answered in Muhammad ﷺ.',
    spotlightBn: 'ইবরাহীম (আঃ), "আল্লাহর বন্ধু" (খলীল), তাঁর প্রভুকে খুঁজেন এবং তারকা, চাঁদ ও সূর্য পেরিয়ে তাদের স্রষ্টা একজনের কাছে যুক্তিতে পৌঁছান (৬:৭৬-৭৯)। তিনি মূর্তি-নির্মাতা সম্প্রদায় ও তাদের রাজার মুখোমুখি হন, আগুনে নিক্ষিপ্ত হন যা আল্লাহ শীতল করেন, এবং প্রভুর জন্য হিজরত করেন। তাঁর সবচেয়ে বড় পরীক্ষা আসে স্বপ্নে পুত্র কুরবানির আদেশে; পিতা-পুত্র উভয়ে আত্মসমর্পণ করেন, আর আল্লাহ এক মহান কুরবানিতে বালকটিকে মুক্ত করেন — যা হজে স্মরণ করা হয়। ইসমাঈলকে নিয়ে তিনি কাবা গড়েন ও তাঁদের বংশধরদের মধ্যে এক রাসূল প্রেরণের দোয়া করেন — যে দোয়া মুহাম্মাদ ﷺ-এর মাধ্যমে কবুল হয়।',
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
      { en: 'He enjoined prayer and zakat on his family and was pleasing to his Lord.', bn: 'তিনি পরিবারকে সালাত ও যাকাতের নির্দেশ দিতেন এবং প্রভুর কাছে সন্তোষভাজন ছিলেন।' },
    ],
    signEn: 'The great sacrifice that ransomed Isma’il, and the well of Zamzam that sprang in the barren valley for him and his mother, are lasting signs remembered in the rites of Hajj.',
    signBn: 'যে মহান কুরবানি ইসমাঈলকে মুক্ত করে, এবং শুষ্ক উপত্যকায় তাঁর ও তাঁর মায়ের জন্য উৎসারিত যমযম কূপ, হজের আচারে স্মরণীয় স্থায়ী নিদর্শন।',
    signRefs: ['37:107', '2:127-129'],
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
      { en: 'The Quran counts him among the men of strength and vision.', bn: 'কুরআন তাঁকে শক্তি ও অন্তর্দৃষ্টিসম্পন্ন ব্যক্তিদের মধ্যে গণ্য করে।' },
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
      { en: 'As a boy he saw eleven stars, the sun, and the moon prostrate to him — a true dream fulfilled years later.', bn: 'বালক বয়সে তিনি এগারোটি তারা, সূর্য ও চাঁদকে তাঁকে সিজদা করতে দেখেন — এক সত্য স্বপ্ন যা বছর পরে পূর্ণ হয়।' },
    ],
    signEn: 'Allah taught Yusuf the true interpretation of dreams; from the prisoners’ dreams to the king’s seven cows and ears of grain, his God-given knowledge saved a whole region from famine.',
    signBn: 'আল্লাহ ইউসুফকে স্বপ্নের সঠিক ব্যাখ্যা শেখান; কারাবন্দিদের স্বপ্ন থেকে রাজার সাত গাভি ও শীষের স্বপ্ন পর্যন্ত, তাঁর আল্লাহ-প্রদত্ত জ্ঞান গোটা অঞ্চলকে দুর্ভিক্ষ থেকে রক্ষা করে।',
    signRefs: ['12:36-37', '12:43-49'],
    spotlightEn: 'Sura Yusuf is called by the Quran "the best of stories," and it is the most complete single narrative in the Book. Betrayed by jealous brothers, sold into slavery, tempted and then wrongly imprisoned, Yusuf (AS) never abandoned truthfulness or God-consciousness. Allah raised him from the prison to authority over Egypt’s stores, and when famine drove his brothers to him, he did not take revenge but said, "No blame upon you today; may Allah forgive you." The story shows how Allah’s plan works quietly through hardship toward a merciful end.',
    spotlightBn: 'সূরা ইউসুফকে কুরআন "সর্বোত্তম কাহিনি" বলে, আর এটি কুরআনের সবচেয়ে পূর্ণাঙ্গ একক আখ্যান। হিংসুক ভাইদের বিশ্বাসঘাতকতা, দাসত্বে বিক্রি, প্রলোভন ও পরে অন্যায় কারাবাস — কোনো কিছুতেই ইউসুফ (আঃ) সত্যবাদিতা ও আল্লাহভীরুতা ছাড়েননি। আল্লাহ তাঁকে কারাগার থেকে মিশরের ভাণ্ডারের কর্তৃত্বে উন্নীত করেন, আর দুর্ভিক্ষ যখন ভাইদের তাঁর কাছে টেনে আনে, তিনি প্রতিশোধ নেননি বরং বলেন, "আজ তোমাদের কোনো দোষারোপ নেই; আল্লাহ তোমাদের ক্ষমা করুন।" কাহিনিটি দেখায় কীভাবে আল্লাহর পরিকল্পনা কষ্টের মধ্য দিয়ে নীরবে এক রহমতময় পরিণতির দিকে কাজ করে।',
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
      { en: 'Allah praised him as an excellent servant, ever turning back to Him.', bn: 'আল্লাহ তাঁকে উত্তম বান্দা বলে প্রশংসা করেন, যিনি সর্বদা তাঁর দিকে প্রত্যাবর্তনকারী।' },
    ],
    signEn: 'When Ayyub called on his Lord, Allah told him, "Strike with your foot" — and a cool spring gushed out to wash and drink from, healing him completely.',
    signBn: 'আইয়ুব যখন তাঁর প্রভুকে ডাকেন, আল্লাহ তাঁকে বলেন, "তোমার পা দিয়ে আঘাত করো" — আর এক শীতল ঝর্ণা উৎসারিত হয় গোসল ও পানের জন্য, যা তাঁকে সম্পূর্ণ আরোগ্য দেয়।',
    signRefs: ['38:41-42'],
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
      { en: 'He struck the sea with his staff and it parted into dry paths.', bn: 'তিনি লাঠি দিয়ে সমুদ্রে আঘাত করেন ও তা শুকনো পথে বিভক্ত হয়।' },
      { en: 'He journeyed with Khidr and learned that Allah’s wisdom lies beyond appearances.', bn: 'তিনি খিদিরের সাথে সফর করেন ও শেখেন যে আল্লাহর প্রজ্ঞা বাহ্যিক রূপের বাইরে।' },
    ],
    signEn: 'Musa was given clear signs (ayat): his staff that turned into a moving serpent and swallowed the magicians’ ropes, and his hand that came out radiantly white without harm — and the parting of the sea to save his people.',
    signBn: 'মূসাকে স্পষ্ট নিদর্শন (আয়াত) দেওয়া হয়: তাঁর লাঠি যা চলমান সাপে পরিণত হয় ও জাদুকরদের রশি গিলে ফেলে, এবং তাঁর হাত যা কোনো ক্ষতি ছাড়াই উজ্জ্বল সাদা হয়ে বের হয় — আর সম্প্রদায়কে বাঁচাতে সমুদ্র বিভক্ত হওয়া।',
    signRefs: ['20:17-22', '7:107-108', '26:63'],
    spotlightEn: 'Musa (AS) is mentioned more than any other prophet in the Quran, and his story runs across many surahs. Born when Pharaoh was killing the sons of Israel, he was placed in a basket on the Nile and raised, by Allah’s plan, in Pharaoh’s own palace. At Mount Tur he received prophethood and was told, "Indeed, I am Allah" — then sent with his brother Harun to the tyrant with clear signs. He defeated the magicians (who believed on the spot), led Israel out as the sea parted, received the Tawrah, and patiently bore his people’s hardness of heart.',
    spotlightBn: 'মূসা (আঃ) কুরআনে অন্য যেকোনো নবীর চেয়ে বেশি উল্লিখিত, আর তাঁর কাহিনি বহু সূরায় ছড়িয়ে আছে। ফেরাউন যখন বনী ইসরাঈলের পুত্রদের হত্যা করছিল তখন তিনি জন্মান, আল্লাহর পরিকল্পনায় নীল নদে ঝুড়িতে রাখা হয় ও ফেরাউনের নিজ প্রাসাদে লালিত হন। তূর পর্বতে তিনি নবুয়ত পান ও শোনেন, "নিশ্চয়ই আমিই আল্লাহ" — এরপর ভাই হারুনসহ স্পষ্ট নিদর্শনসহ স্বৈরাচারীর কাছে প্রেরিত হন। তিনি জাদুকরদের পরাস্ত করেন (যারা তৎক্ষণাৎ ঈমান আনে), সমুদ্র বিভক্ত হলে বনী ইসরাঈলকে বের করেন, তাওরাত লাভ করেন এবং সম্প্রদায়ের হৃদয়ের কঠোরতা ধৈর্যে সহ্য করেন।',
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
      { en: 'He entered into Allah’s mercy for his righteousness.', bn: 'তাঁর সৎকর্মের কারণে তিনি আল্লাহর রহমতে প্রবেশ করেন।' },
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
      { en: 'He was taught to fashion coats of mail from the softened iron.', bn: 'নরম করা লোহা থেকে বর্ম তৈরি করা তাঁকে শেখানো হয়।' },
    ],
    signEn: 'Allah gave Dawud a beautiful voice: the mountains and birds echoed his glorification of Allah morning and evening, and iron was made soft in his hands to shape armour.',
    signBn: 'আল্লাহ দাউদকে সুন্দর কণ্ঠ দেন: সকাল-সন্ধ্যায় পাহাড় ও পাখিরা তাঁর আল্লাহর তাসবিহে প্রতিধ্বনি করত, এবং বর্ম গড়তে তাঁর হাতে লোহা নরম করা হতো।',
    signRefs: ['34:10-11', '21:79'],
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
      { en: 'Her throne was brought to him in the blink of an eye by one given knowledge.', bn: 'জ্ঞানপ্রাপ্ত একজনের মাধ্যমে চোখের পলকে তাঁর কাছে রানির সিংহাসন আনা হয়।' },
    ],
    signEn: 'Sulayman was granted authority over the wind, which ran at his command, and over the jinn who built and dived for him; a molten spring of copper flowed for him, and he understood the speech of birds and ants.',
    signBn: 'সুলাইমানকে বাতাসের ওপর কর্তৃত্ব দেওয়া হয়, যা তাঁর আদেশে চলত, এবং জিনদের ওপর যারা তাঁর জন্য নির্মাণ ও ডুব দিত; তাঁর জন্য গলিত তামার ঝর্ণা প্রবাহিত হতো, আর তিনি পাখি ও পিঁপড়ার ভাষা বুঝতেন।',
    signRefs: ['34:12-13', '21:81-82', '27:16-19'],
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
      { en: 'He continued the guidance of the Children of Israel after Ilyas.', bn: 'ইলিয়াসের পর তিনি বনী ইসরাঈলের পথনির্দেশ অব্যাহত রাখেন।' },
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
      { en: 'A gourd plant was made to grow to shelter him after he was cast ashore.', bn: 'তীরে নিক্ষিপ্ত হওয়ার পর তাঁকে ছায়া দিতে এক লাউ-গাছ উৎপন্ন করা হয়।' },
    ],
    signEn: 'The sign of Yunus was his rescue from the belly of the great fish: had he not glorified Allah with "There is no god but You," he would have stayed there until the Day of Resurrection.',
    signBn: 'ইউনুসের নিদর্শন ছিল বিশাল মাছের পেট থেকে তাঁর উদ্ধার: তিনি যদি "তুমি ছাড়া কোনো ইলাহ নেই" বলে আল্লাহর তাসবিহ না পড়তেন, তবে কিয়ামত পর্যন্ত সেখানেই থাকতেন।',
    signRefs: ['37:143-144', '21:87'],
    spotlightEn: 'Yunus (AS), also called Dhun-Nun ("the man of the fish"), was sent to the people of Nineveh. When they rejected him, he departed in anger before Allah gave him leave. Cast from a ship and swallowed by a great fish, in the layered darkness of night, sea, and belly he cried out, "There is no god but You; glory be to You; I have been of the wrongdoers." Allah answered, delivered him, and — uniquely — his entire people believed and their punishment was lifted.',
    spotlightBn: 'ইউনুস (আঃ), যাঁকে যুন-নূন ("মাছের অধিকারী")-ও বলা হয়, নিনেভার অধিবাসীদের কাছে প্রেরিত হন। তারা তাঁকে প্রত্যাখ্যান করলে আল্লাহর অনুমতির আগেই তিনি ক্ষোভে চলে যান। জাহাজ থেকে নিক্ষিপ্ত হয়ে এক বিশাল মাছ তাঁকে গিলে ফেলে, আর রাত, সমুদ্র ও পেটের স্তরে স্তরে অন্ধকারে তিনি ডাকেন, "তুমি ছাড়া কোনো ইলাহ নেই; তুমি পবিত্র; নিশ্চয়ই আমি সীমালঙ্ঘনকারীদের একজন।" আল্লাহ সাড়া দেন, তাঁকে উদ্ধার করেন, এবং — অনন্যভাবে — তাঁর গোটা সম্প্রদায় ঈমান আনে ও তাদের শাস্তি তুলে নেওয়া হয়।',
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
      { en: 'He foretold a messenger to come after him named Ahmad.', bn: 'তিনি তাঁর পরে আহমাদ নামে এক রাসূলের আগমনের সুসংবাদ দেন।' },
    ],
    signEn: 'By Allah’s leave Isa worked clear signs: he spoke as a newborn in the cradle, formed a bird from clay and it flew, healed the blind and the leper, and revived the dead — always "by the permission of Allah."',
    signBn: 'আল্লাহর অনুমতিতে ঈসা স্পষ্ট নিদর্শন দেখান: তিনি দোলনায় নবজাতক অবস্থায় কথা বলেন, মাটি থেকে পাখি বানান ও তা উড়ে যায়, অন্ধ ও কুষ্ঠরোগীকে সুস্থ করেন এবং মৃতকে জীবিত করেন — সর্বদা "আল্লাহর অনুমতিতে"।',
    signRefs: ['3:49', '5:110', '19:29-30'],
    spotlightEn: 'Isa (AS), the Messiah, was created by Allah’s word "Be" — born of the virgin Maryam without a father, a sign for all people. He spoke from the cradle to defend his mother’s honour, was given the Injil, and called the Children of Israel to worship Allah alone, his Lord and theirs. His disciples (al-Hawariyyun) supported him. When his enemies plotted to kill him, Allah foiled them: he was neither killed nor crucified, but raised to Allah. The Quran honours him as a servant and messenger, never as a god or son of God, and teaches that he will return before the Last Day.',
    spotlightBn: 'ঈসা (আঃ), মসীহ, আল্লাহর "হও" বাণীতে সৃষ্ট — পিতা ছাড়াই কুমারী মারইয়ামের গর্ভে জন্ম, সকল মানুষের জন্য এক নিদর্শন। তিনি মায়ের সম্মান রক্ষায় দোলনায় কথা বলেন, তাঁকে ইঞ্জিল দেওয়া হয়, এবং তিনি বনী ইসরাঈলকে তাঁর ও তাদের প্রভু এক আল্লাহর ইবাদতের দিকে ডাকেন। তাঁর শিষ্যরা (হাওয়ারিয়্যূন) তাঁকে সমর্থন করে। শত্রুরা যখন তাঁকে হত্যার ষড়যন্ত্র করে, আল্লাহ তা ব্যর্থ করেন: তাঁকে হত্যাও করা হয়নি, শূলবিদ্ধও করা হয়নি, বরং আল্লাহ তাঁকে তুলে নেন। কুরআন তাঁকে বান্দা ও রাসূল হিসেবে সম্মান দেয়, কখনো ইলাহ বা আল্লাহর পুত্র নয়, এবং শেখায় যে তিনি শেষ দিবসের আগে ফিরে আসবেন।',
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
      { en: 'On the Night Journey (Isra & Mi’raj) he was taken from Mecca to Jerusalem and raised through the heavens.', bn: 'ইসরা ও মিরাজের রাতে তাঁকে মক্কা থেকে জেরুজালেমে নেওয়া হয় ও আকাশের ঊর্ধ্বে উঠানো হয়।' },
    ],
    signEn: 'His greatest and lasting miracle is the Quran itself — a revelation no one could match. Among his signs were the splitting of the moon and the Night Journey (Isra & Mi’raj).',
    signBn: 'তাঁর সবচেয়ে বড় ও স্থায়ী মুজিযা হলো স্বয়ং কুরআন — এমন এক ওহি যার সমতুল্য কেউ আনতে পারেনি। তাঁর নিদর্শনগুলোর মধ্যে ছিল চাঁদ দ্বিখণ্ডিত হওয়া ও রাত্রিভ্রমণ (ইসরা ও মিরাজ)।',
    signRefs: ['54:1-2', '17:1'],
    refs: ['96:1-5', '33:40', '48:1-3', '53:1-11'],
    lessonEn: 'Follow the final messenger ﷺ — his life is the living example of the Quran and mercy to all.',
    lessonBn: 'সর্বশেষ রাসূল ﷺ-কে অনুসরণ করুন — তাঁর জীবনই কুরআনের জীবন্ত আদর্শ ও সবার জন্য রহমত।',
    seerahLink: true,
  },
];

/**
 * Cross-cutting themes shared by all the prophets — the single message of tawhid,
 * patience under trial, the covenant taken from the prophets, and belief in all
 * of them as an article of faith. All refs verified against SURAH_DATA.
 */
const COMMON_THREADS = [
  {
    emoji: '☝️',
    titleEn: 'One message: Tawhid', titleBn: 'একই বার্তা: তাওহিদ',
    bodyEn: 'Every prophet, from Adam to Muhammad ﷺ, brought the same core call: worship Allah alone and shun false gods. "We sent to every nation a messenger, [saying], Worship Allah and avoid false idols."',
    bodyBn: 'আদম থেকে মুহাম্মাদ ﷺ পর্যন্ত প্রত্যেক নবী একই মূল আহ্বান নিয়ে আসেন: কেবল আল্লাহর ইবাদত করো ও মিথ্যা উপাস্য বর্জন করো। "আমি প্রতিটি জাতির কাছে একজন রাসূল পাঠিয়েছি [এই বলে], আল্লাহর ইবাদত করো ও তাগুত থেকে দূরে থাকো।"',
    refs: ['16:36', '21:25'],
  },
  {
    emoji: '⏳',
    titleEn: 'Patience under trial', titleBn: 'পরীক্ষায় ধৈর্য',
    bodyEn: 'The prophets were tested — with rejection, loss, and hardship — and answered with steadfast patience (sabr). "So be patient, as the messengers of firm resolve were patient."',
    bodyBn: 'নবীগণ পরীক্ষিত হয়েছেন — প্রত্যাখ্যান, ক্ষতি ও কষ্টে — এবং অবিচল ধৈর্যে (সবর) সাড়া দিয়েছেন। "সুতরাং ধৈর্য ধরো, যেমন দৃঢ়প্রতিজ্ঞ রাসূলগণ ধৈর্য ধরেছিলেন।"',
    refs: ['46:35', '21:83-85'],
  },
  {
    emoji: '🤝',
    titleEn: 'The covenant of the prophets', titleBn: 'নবীদের অঙ্গীকার',
    bodyEn: 'Allah took a solemn covenant from the prophets — including Nuh, Ibrahim, Musa, and Isa — to convey His message faithfully and to confirm one another.',
    bodyBn: 'আল্লাহ নবীদের কাছ থেকে — নূহ, ইবরাহীম, মূসা ও ঈসাসহ — দৃঢ় অঙ্গীকার নেন যে তাঁরা বিশ্বস্তভাবে তাঁর বার্তা পৌঁছাবেন ও একে অপরকে সত্যায়ন করবেন।',
    refs: ['33:7', '3:81'],
  },
  {
    emoji: '📿',
    titleEn: 'Believing in all the prophets', titleBn: 'সকল নবীতে বিশ্বাস',
    bodyEn: 'A Muslim believes in every one of Allah’s prophets without distinction. "We make no distinction between any of His messengers." Rejecting even one is rejecting the chain of guidance.',
    bodyBn: 'একজন মুসলিম আল্লাহর প্রত্যেক নবীতে কোনো পার্থক্য ছাড়া বিশ্বাস করে। "আমরা তাঁর রাসূলদের কারও মধ্যে পার্থক্য করি না।" একজনকেও অস্বীকার করা হলো পথনির্দেশের ধারাকেই অস্বীকার করা।',
    refs: ['2:285', '2:136'],
  },
];

/**
 * Famous Quranic supplications (duas) of the prophets. Every ref was verified
 * against SURAH_DATA (surah exists AND each ayah in the range <= ayahCount).
 * Glosses are brief translations, not full renderings; no risky Arabic typing.
 */
const PROPHETS_DUAS = [
  { pid: 'adam', ref: '7:23',
    glossEn: '"Our Lord, we have wronged ourselves; if You do not forgive us and have mercy on us, we will surely be among the losers."',
    glossBn: '"হে আমাদের প্রভু, আমরা নিজেদের ওপর জুলুম করেছি; আপনি ক্ষমা ও রহম না করলে আমরা অবশ্যই ক্ষতিগ্রস্তদের অন্তর্ভুক্ত হব।"' },
  { pid: 'nuh', ref: '71:28',
    glossEn: '"My Lord, forgive me and my parents and whoever enters my house a believer, and the believing men and women."',
    glossBn: '"হে আমার প্রভু, আমাকে, আমার পিতামাতাকে, মুমিন হয়ে আমার ঘরে প্রবেশকারীকে এবং মুমিন নর-নারীদের ক্ষমা করুন।"' },
  { pid: 'nuh', ref: '54:10',
    glossEn: '"I am overpowered, so help (me)."',
    glossBn: '"আমি পরাভূত, অতএব আপনি সাহায্য করুন।"' },
  { pid: 'ibrahim', ref: '2:127-129',
    glossEn: '"Our Lord, accept (this) from us… make us in submission to You… and raise among them a messenger."',
    glossBn: '"হে আমাদের প্রভু, আমাদের থেকে কবুল করুন… আমাদের আপনার অনুগত করুন… এবং তাদের মধ্যে এক রাসূল পাঠান।"' },
  { pid: 'ibrahim', ref: '14:40-41',
    glossEn: '"My Lord, make me an establisher of prayer, and from my descendants… forgive me, my parents, and the believers on the Day of Reckoning."',
    glossBn: '"হে আমার প্রভু, আমাকে ও আমার বংশধরদের সালাত প্রতিষ্ঠাকারী করুন… হিসাবের দিনে আমাকে, আমার পিতামাতাকে ও মুমিনদের ক্ষমা করুন।"' },
  { pid: 'ibrahim', ref: '26:83-85',
    glossEn: '"My Lord, grant me wisdom and join me with the righteous, and grant me an honourable mention among later generations."',
    glossBn: '"হে আমার প্রভু, আমাকে প্রজ্ঞা দিন, সৎকর্মশীলদের সাথে মিলিত করুন, এবং পরবর্তীদের মধ্যে আমার সুনাম রাখুন।"' },
  { pid: 'yusuf', ref: '12:101',
    glossEn: '"…Cause me to die a Muslim and join me with the righteous."',
    glossBn: '"…আমাকে মুসলিম অবস্থায় মৃত্যু দিন এবং সৎকর্মশীলদের সাথে মিলিত করুন।"' },
  { pid: 'ayyub', ref: '21:83',
    glossEn: '"Indeed, adversity has touched me, and You are the Most Merciful of the merciful."',
    glossBn: '"নিশ্চয়ই আমাকে দুঃখ-কষ্ট স্পর্শ করেছে, আর আপনি দয়ালুদের মধ্যে সর্বশ্রেষ্ঠ দয়ালু।"' },
  { pid: 'musa', ref: '20:25-28',
    glossEn: '"My Lord, expand for me my chest, ease my task, and untie the knot from my tongue so they may understand my speech."',
    glossBn: '"হে আমার প্রভু, আমার বক্ষ প্রশস্ত করুন, আমার কাজ সহজ করুন, আর আমার জিহ্বার জড়তা দূর করুন যাতে তারা আমার কথা বোঝে।"' },
  { pid: 'musa', ref: '28:16',
    glossEn: '"My Lord, indeed I have wronged myself, so forgive me."',
    glossBn: '"হে আমার প্রভু, নিশ্চয়ই আমি নিজের ওপর জুলুম করেছি, অতএব আমাকে ক্ষমা করুন।"' },
  { pid: 'sulayman', ref: '27:19',
    glossEn: '"My Lord, enable me to be grateful for Your favour… and admit me by Your mercy among Your righteous servants."',
    glossBn: '"হে আমার প্রভু, আপনার নিয়ামতের শোকর আদায়ের সামর্থ্য দিন… এবং আপনার রহমতে আমাকে আপনার সৎ বান্দাদের অন্তর্ভুক্ত করুন।"' },
  { pid: 'yunus', ref: '21:87',
    glossEn: '"There is no god but You; glory be to You; indeed I have been of the wrongdoers." (the dua of Dhun-Nun)',
    glossBn: '"আপনি ছাড়া কোনো ইলাহ নেই; আপনি পবিত্র; নিশ্চয়ই আমি সীমালঙ্ঘনকারীদের অন্তর্ভুক্ত।" (যুন-নূনের দোয়া)' },
  { pid: 'zakariya', ref: '19:4-6',
    glossEn: '"My Lord… I have never been unblessed in my prayer to You — so grant me from Yourself an heir."',
    glossBn: '"হে আমার প্রভু… আপনার কাছে দোয়া করে আমি কখনো বঞ্চিত হইনি — তাই আপনার পক্ষ থেকে আমাকে এক উত্তরাধিকারী দিন।"' },
  { pid: 'zakariya', ref: '21:89',
    glossEn: '"My Lord, do not leave me alone (childless), and You are the best of inheritors."',
    glossBn: '"হে আমার প্রভু, আমাকে একা (নিঃসন্তান) রাখবেন না, আর আপনিই সর্বোত্তম উত্তরাধিকারী।"' },
  { pid: 'muhammad', ref: '20:114',
    glossEn: '"My Lord, increase me in knowledge." (Rabbi zidni ilma)',
    glossBn: '"হে আমার প্রভু, আমার জ্ঞান বৃদ্ধি করুন।" (রব্বি যিদনি ইলমা)' },
];

/**
 * Approximate counts of how often key prophets are mentioned BY NAME in the
 * Quran — commonly-cited figures only, marked approximate in the UI.
 */
const PROPHETS_MENTIONS = [
  { pid: 'musa', n: 136 }, { pid: 'ibrahim', n: 69 }, { pid: 'nuh', n: 43 },
  { pid: 'lut', n: 27 }, { pid: 'yusuf', n: 27 }, { pid: 'adam', n: 25 },
  { pid: 'isa', n: 25 }, { pid: 'harun', n: 20 }, { pid: 'sulayman', n: 17 },
  { pid: 'yaqub', n: 16 }, { pid: 'dawud', n: 16 }, { pid: 'ismail', n: 12 },
  { pid: 'shuayb', n: 11 }, { pid: 'salih', n: 9 }, { pid: 'hud', n: 7 },
  { pid: 'zakariya', n: 7 }, { pid: 'yahya', n: 5 }, { pid: 'yunus', n: 4 },
  { pid: 'muhammad', n: 4,
    noteEn: 'by the name "Muhammad"; also once as "Ahmad" (61:6)',
    noteBn: '"মুহাম্মাদ" নামে; এছাড়া একবার "আহমাদ" নামে (৬১:৬)' },
];

/**
 * Fixed lineage questions for the quiz (traditional, well-known relations).
 * Options are explicit so distractors stay sensible.
 */
const PROPHETS_LINEAGE_QUIZ = [
  { answerId: 'yaqub', optionIds: ['yaqub', 'ishaq', 'ibrahim', 'yusuf'],
    promptEn: 'Who was the father of Yusuf (AS)?', promptBn: 'ইউসুফ (আঃ)-এর পিতা কে ছিলেন?' },
  { answerId: 'sulayman', optionIds: ['sulayman', 'dawud', 'harun', 'zakariya'],
    promptEn: 'Which prophet was the son of Dawud (AS)?', promptBn: 'কোন নবী দাউদ (আঃ)-এর পুত্র ছিলেন?' },
  { answerId: 'ismail', optionIds: ['ismail', 'ishaq', 'yaqub', 'lut'],
    promptEn: 'Muhammad ﷺ descends from which son of Ibrahim (AS)?', promptBn: 'মুহাম্মাদ ﷺ ইবরাহীম (আঃ)-এর কোন পুত্রের বংশধর?' },
  { answerId: 'zakariya', optionIds: ['zakariya', 'yahya', 'isa', 'ilyas'],
    promptEn: 'Who was the father of Yahya (AS)?', promptBn: 'ইয়াহইয়া (আঃ)-এর পিতা কে ছিলেন?' },
];

/**
 * UI chrome fallback dictionary. tt() prefers global t() (so translations.js can
 * override once wired) and falls back here so the module renders under ANY UI
 * language (English fallback for others; Bengali authored inline).
 */
// Broad traditional eras, keyed by prophet `order` ranges (see PROPHETS_DATA).
// Labels resolve through PROPHETS_UI so they stay localizable.
const PROPHETS_ERAS = [
  { id: 'early',    min: 1,  max: 2,  key: 'prophets_era_early',    emoji: '🌱' },
  { id: 'nuh',      min: 3,  max: 5,  key: 'prophets_era_nuh',      emoji: '🌊' },
  { id: 'ibrahim',  min: 6,  max: 13, key: 'prophets_era_ibrahim',  emoji: '🕋' },
  { id: 'bani',     min: 14, max: 24, key: 'prophets_era_bani',     emoji: '📜' },
  { id: 'final',    min: 25, max: 25, key: 'prophets_era_final',    emoji: '☪️' },
];

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
  prophets_label_spotlight: { en: 'Story spotlight', bn: 'কাহিনি স্পটলাইট' },
  prophets_label_sign: { en: 'Miracles & signs', bn: 'মুজিযা ও নিদর্শন' },
  prophets_threads_title: { en: 'Common Threads', bn: 'অভিন্ন সূত্র' },
  prophets_threads_intro: { en: 'What every prophet shared, from Adam to Muhammad ﷺ.', bn: 'আদম থেকে মুহাম্মাদ ﷺ পর্যন্ত প্রত্যেক নবীর মধ্যে যা অভিন্ন ছিল।' },
  prophets_quiz_title: { en: 'Match the Prophet', bn: 'নবী মেলাও' },
  prophets_quiz_intro: { en: 'A light quiz: match each prophet to their people or a key event.', bn: 'হালকা কুইজ: প্রতিটি নবীকে তাঁর সম্প্রদায় বা গুরুত্বপূর্ণ ঘটনার সাথে মেলান।' },
  prophets_quiz_start: { en: 'Start quiz', bn: 'কুইজ শুরু করুন' },
  prophets_quiz_restart: { en: 'Play again', bn: 'আবার খেলুন' },
  prophets_quiz_close: { en: 'Close', bn: 'বন্ধ করুন' },
  prophets_quiz_question: { en: 'Question', bn: 'প্রশ্ন' },
  prophets_quiz_score: { en: 'Score', bn: 'স্কোর' },
  prophets_quiz_best: { en: 'Best', bn: 'সেরা' },
  prophets_quiz_next: { en: 'Next', bn: 'পরবর্তী' },
  prophets_quiz_finish: { en: 'See result', bn: 'ফলাফল দেখুন' },
  prophets_quiz_result: { en: 'Your result', bn: 'আপনার ফলাফল' },
  prophets_quiz_correct: { en: 'Correct!', bn: 'সঠিক!' },
  prophets_quiz_wrong: { en: 'The answer was', bn: 'সঠিক উত্তর ছিল' },
  prophets_quiz_q_nation: { en: 'Which prophet was sent to this people?', bn: 'কোন নবী এই সম্প্রদায়ের কাছে প্রেরিত হন?' },
  prophets_quiz_q_event: { en: 'Which prophet is this about?', bn: 'এটি কোন নবী সম্পর্কে?' },
  prophets_quiz_q_dua: { en: 'Which prophet made this supplication?', bn: 'কোন নবী এই দোয়া করেছিলেন?' },
  prophets_quiz_q_lineage: { en: 'Lineage question', bn: 'বংশধারা প্রশ্ন' },
  prophets_duas_title: { en: 'Duas of the Prophets', bn: 'নবীদের দোয়া' },
  prophets_duas_intro: { en: 'Famous supplications of the prophets recorded in the Quran — tap a reference to open the verse.', bn: 'কুরআনে লিপিবদ্ধ নবীদের বিখ্যাত দোয়া — আয়াত খুলতে রেফারেন্সে ট্যাপ করুন।' },
  prophets_lineage_title: { en: 'Lineage & connections', bn: 'বংশধারা ও সংযোগ' },
  prophets_lineage_intro: { en: 'The traditional broad lines of descent between the prophets.', bn: 'নবীদের মধ্যে ঐতিহ্যগত মূল বংশধারা।' },
  prophets_lineage_arabs: { en: 'the Arabs', bn: 'আরবগণ' },
  prophets_lineage_bani: { en: 'Prophets of Bani Israil', bn: 'বনী ইসরাঈলের নবীগণ' },
  prophets_lineage_israel: { en: 'Israel', bn: 'ইসরাঈল' },
  prophets_lineage_note: { en: 'A simplified overview of the well-known traditional lines — many generations and other prophets lie between these names.', bn: 'সুপরিচিত ঐতিহ্যগত ধারার একটি সরলীকৃত চিত্র — এই নামগুলোর মাঝে বহু প্রজন্ম ও অন্যান্য নবী রয়েছেন।' },
  prophets_mentions_title: { en: 'The prophets in the Quran by mention', bn: 'কুরআনে নবীদের নাম উল্লেখের সংখ্যা' },
  prophets_mentions_intro: { en: 'How often key prophets are mentioned by name in the Quran.', bn: 'কুরআনে প্রধান নবীদের নাম কতবার উল্লেখিত হয়েছে।' },
  prophets_mentions_note: { en: 'Counts are approximate — commonly cited figures for mentions by name; scholarly tallies vary slightly.', bn: 'সংখ্যাগুলো আনুমানিক — নামে উল্লেখের প্রচলিত হিসাব; আলেমদের গণনায় সামান্য তারতম্য আছে।' },
  prophets_mentions_times: { en: 'times', bn: 'বার' },
  prophets_potd_title: { en: 'Prophet of the Day', bn: 'আজকের নবী' },
  prophets_potd_open: { en: 'Read the story', bn: 'কাহিনি পড়ুন' },
  prophets_group_toggle: { en: 'Group by era', bn: 'যুগ অনুসারে' },
  prophets_ululazm_strip_title: { en: "Ulul-'Azm — the five resolute messengers", bn: 'উলুল-আযম — পাঁচ দৃঢ়প্রতিজ্ঞ রাসূল' },
  prophets_era_early: { en: 'Early humanity', bn: 'মানবজাতির সূচনা' },
  prophets_era_nuh: { en: "Age of Nuh & 'Aad–Thamud", bn: 'নূহ ও আদ–সামুদের যুগ' },
  prophets_era_ibrahim: { en: 'Age of Ibrahim & his line', bn: 'ইবরাহিম ও তাঁর বংশধারার যুগ' },
  prophets_era_bani: { en: 'Bani Israil', bn: 'বনী ইসরাঈল' },
  prophets_era_final: { en: 'The Final Messenger', bn: 'সর্বশেষ রাসূল' },
};

class ProphetsView {
  constructor() {
    this.container = document.getElementById('prophets-container');
    if (!this.container) return;
    this.language = (typeof appSettings !== 'undefined' && appSettings) ? appSettings.get('language') : 'en';
    if (!this.language) this.language = 'en';
    this.rendered = false;
    this.view = 'timeline';   // 'timeline' | 'grid'
    this.grouped = false;     // timeline view: group by traditional era
    this.filter = 'all';      // 'all' | 'rasul' | 'ululazm'
    this.query = '';
    this.selected = null;     // prophet id when in detail view
    this.read = this.loadRead();
    this.quizState = null;    // active quiz session, or null
    this.quizBest = this.loadQuizBest();

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
  // Localized content picker: bn → CI18N knowledgebase → en fallback.
  lc(o) {
    if (!o) return '';
    if (this.language === 'bn' && o.bn) return o.bn;
    if (o.en && typeof CI18N !== 'undefined') { const tr = CI18N.tr(this.language, o.en); if (tr) return tr; }
    return o.en || o.bn || '';
  }
  pick(item, field) {
    return this.lc({ en: item[field + 'En'], bn: item[field + 'Bn'] });
  }
  loc(item, base) {
    // for items using suffixed En/Bn fields
    return this.lc({ en: item[base + 'En'], bn: item[base + 'Bn'] });
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

  loadQuizBest() {
    try { const n = parseInt(localStorage.getItem('lq_prophets_quiz_best'), 10); return Number.isFinite(n) ? n : 0; } catch (_) { return 0; }
  }
  saveQuizBest(n) {
    try { localStorage.setItem('lq_prophets_quiz_best', String(n)); } catch (_) { /* ignore */ }
  }

  // Look up a surah name (verified list lives in SURAH_DATA) for a ref label.
  surahName(n) {
    try {
      if (typeof getSurahByNumber === 'function') {
        const s = getSurahByNumber(n);
        if (s && s.names) return this.lc(s.names) || ('Surah ' + n);
        if (s && s.arabicName) return s.arabicName;
      }
      if (typeof SURAH_DATA !== 'undefined' && Array.isArray(SURAH_DATA)) {
        const s = SURAH_DATA.find(x => x.number === n);
        if (s && s.names) return this.lc(s.names) || ('Surah ' + n);
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
    if (this.quizState) { this.renderQuiz(); this.bind(); return; }
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

        ${this.potdHtml()}

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
        <div class="flex flex-wrap items-center gap-2 mb-5">
          ${filters}
          ${this.view === 'timeline' ? `<button type="button" data-prophets-group
            class="px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap border transition-colors
                   ${this.grouped ? 'bg-primary text-white border-primary'
                                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-primary'}">
            <span aria-hidden="true">${this.grouped ? '▣' : '▢'}</span> ${this.esc(this.tt('prophets_group_toggle'))}</button>` : ''}
        </div>

        ${this.ululStripHtml()}

        <div data-prophets-list></div>

        ${this.threadsHtml()}
        ${this.duasHtml()}
        ${this.lineageHtml()}
        ${this.mentionsHtml()}

        <div class="mt-6 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 p-5 text-center">
          <div class="text-2xl mb-1" aria-hidden="true">✦</div>
          <h3 class="font-bold text-gray-800 dark:text-gray-100">${this.esc(this.tt('prophets_quiz_title'))}</h3>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 mb-3" dir="auto">${this.esc(this.tt('prophets_quiz_intro'))}</p>
          <button type="button" data-prophets-quiz-start
            class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white font-semibold hover:opacity-90 transition-opacity">
            ▶ ${this.esc(this.tt('prophets_quiz_start'))}
          </button>
          ${this.quizBest ? `<p class="text-[0.7rem] text-gray-400 dark:text-gray-500 mt-2">🏆 ${this.esc(this.tt('prophets_quiz_best'))}: ${this.quizBest}</p>` : ''}
        </div>

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

  // ── Prophet of the Day (deterministic pick by day-of-year) ───────────
  potd() {
    try {
      const arr = PROPHETS_DATA;
      if (!Array.isArray(arr) || !arr.length) return null;
      const now = new Date();
      const start = new Date(now.getFullYear(), 0, 0);
      const doy = Math.floor((now - start) / 86400000);
      const idx = ((doy % arr.length) + arr.length) % arr.length;
      return arr[idx] || null;
    } catch (_) { return null; }
  }

  potdHtml() {
    const p = this.potd();
    if (!p) return '';
    return `
      <div class="rounded-2xl bg-gradient-to-br from-primary/15 to-transparent border border-primary/25 p-4 mb-4">
        <div class="flex items-center gap-1.5 text-[0.7rem] font-semibold uppercase tracking-wide text-primary mb-2">
          <span aria-hidden="true">✦</span> ${this.esc(this.tt('prophets_potd_title'))}
        </div>
        <div class="flex items-start gap-3">
          <span class="text-3xl font-arabic text-primary shrink-0" dir="rtl" lang="ar">${this.esc(p.ar)}</span>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="font-bold text-gray-800 dark:text-gray-100">${this.esc(p.translit)}</span>
              <span class="text-xs text-gray-400 dark:text-gray-500">${this.esc(this.lc(p))}</span>
            </div>
            <p class="text-xs text-gray-600 dark:text-gray-300 mt-1" dir="auto">${this.esc(this.loc(p, 'era'))}</p>
            <button type="button" data-prophets-open="${this.esc(p.id)}"
              class="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-semibold hover:opacity-90 transition-opacity">
              📖 ${this.esc(this.tt('prophets_potd_open'))} ›
            </button>
          </div>
        </div>
      </div>`;
  }

  // ── Ulul-'Azm spotlight strip (the five resolute messengers) ─────────
  ululStripHtml() {
    const five = PROPHETS_DATA.filter(p => p.ululAzm);
    if (!five.length) return '';
    const chips = five.map(p => `
      <button type="button" data-prophets-open="${this.esc(p.id)}"
        class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-gray-800 border border-amber-300/60 dark:border-amber-700/60 hover:border-amber-500 hover:shadow-sm transition-all whitespace-nowrap">
        <span class="font-arabic text-amber-600 dark:text-amber-300" dir="rtl" lang="ar">${this.esc(p.ar)}</span>
        <span class="text-xs font-semibold text-gray-700 dark:text-gray-200">${this.esc(this.language === 'bn' && p.bn ? p.bn : p.translit)}</span>
      </button>`).join('');
    return `
      <div class="rounded-xl bg-amber-500/5 border border-amber-300/40 dark:border-amber-800/40 p-3 mb-4">
        <div class="flex items-center gap-1.5 text-[0.7rem] font-semibold text-amber-600 dark:text-amber-300 mb-2">
          <span aria-hidden="true">★</span> ${this.esc(this.tt('prophets_ululazm_strip_title'))}
        </div>
        <div class="flex flex-wrap gap-2">${chips}</div>
      </div>`;
  }

  timelineHtml(items) {
    if (!this.grouped) return this.timelineOl(items);
    return PROPHETS_ERAS.map(era => {
      const group = items.filter(p => p.order >= era.min && p.order <= era.max);
      if (!group.length) return '';
      return `
        <div class="flex items-center gap-2 mt-5 mb-2 first:mt-0">
          <span class="text-base" aria-hidden="true">${era.emoji}</span>
          <h4 class="text-sm font-bold text-gray-700 dark:text-gray-200">${this.esc(this.tt(era.key))}</h4>
          <span class="flex-1 h-px bg-gray-200 dark:bg-gray-700"></span>
        </div>
        ${this.timelineOl(group)}`;
    }).join('');
  }

  timelineOl(items) {
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
                    <span class="text-xs text-gray-400 dark:text-gray-500">${this.esc(this.lc(p))}</span>
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
            <div class="text-xs text-gray-400 dark:text-gray-500 mb-2">${this.esc(this.lc(p))}</div>
            <div class="flex flex-wrap gap-1">${this.badges(p, true)}</div>
          </button>`;
        }).join('')}
      </div>`;
  }

  threadsHtml() {
    return `
      <div class="mt-8">
        <h3 class="text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">🧵 ${this.esc(this.tt('prophets_threads_title'))}</h3>
        <p class="text-xs text-gray-400 dark:text-gray-500 mb-3" dir="auto">${this.esc(this.tt('prophets_threads_intro'))}</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          ${COMMON_THREADS.map(th => `
            <div class="rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4">
              <div class="flex items-center gap-2 mb-1.5">
                <span class="text-lg" aria-hidden="true">${th.emoji}</span>
                <span class="font-bold text-gray-800 dark:text-gray-100 text-sm">${this.esc(this.lc({en: th.titleEn, bn: th.titleBn}))}</span>
              </div>
              <p class="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-2" dir="auto">${this.esc(this.lc({en: th.bodyEn, bn: th.bodyBn}))}</p>
              <div class="flex flex-wrap gap-1.5">
                ${(th.refs || []).map(r => `<button type="button" data-prophets-ayah="${this.esc(this.openRef(r))}"
                  class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[0.7rem] font-medium hover:bg-primary hover:text-white transition-colors" dir="auto">📖 ${this.esc(this.refLabel(r))}</button>`).join('')}
              </div>
            </div>`).join('')}
        </div>
      </div>`;
  }

  // Display name (transliteration) for a prophet id; safe fallback.
  pname(pid) {
    // Localized prophet name: Bengali form for the bn UI, transliteration elsewhere.
    const p = PROPHETS_DATA.find(x => x.id === pid);
    if (!p) return String(pid || '');
    return (this.language === 'bn' && p.bn) ? p.bn : p.translit;
  }

  duasHtml() {
    return `
      <div class="mt-8">
        <h3 class="text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">🤲 ${this.esc(this.tt('prophets_duas_title'))}</h3>
        <p class="text-xs text-gray-400 dark:text-gray-500 mb-3" dir="auto">${this.esc(this.tt('prophets_duas_intro'))}</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          ${PROPHETS_DUAS.map(d => `
            <div class="rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 flex flex-col gap-2">
              <div class="flex items-center justify-between gap-2">
                <span class="font-bold text-gray-800 dark:text-gray-100 text-sm">${this.esc(this.pname(d.pid))}</span>
                <button type="button" data-prophets-ayah="${this.esc(this.openRef(d.ref))}"
                  class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[0.7rem] font-medium hover:bg-primary hover:text-white transition-colors" dir="auto">📖 ${this.esc(this.refLabel(d.ref))}</button>
              </div>
              <p class="text-xs text-gray-600 dark:text-gray-300 leading-relaxed italic" dir="auto">${this.esc(this.lc({en: d.glossEn, bn: d.glossBn}))}</p>
            </div>`).join('')}
        </div>
      </div>`;
  }

  // Abstract, text-only lineage tree (names + connective lines; no figures).
  lineageHtml() {
    const node = (label, extra) => `
      <div class="flex items-center gap-2">
        <span class="px-2.5 py-1 rounded-lg bg-primary/10 text-primary text-xs font-semibold whitespace-nowrap">${this.esc(label)}</span>
        ${extra ? `<span class="text-[0.7rem] text-gray-400 dark:text-gray-500" dir="auto">${this.esc(extra)}</span>` : ''}
      </div>`;
    const branch = (inner) => `
      <div class="ms-3 ps-4 border-s-2 border-dashed border-gray-300 dark:border-gray-600 space-y-2 pt-2">${inner}</div>`;
    const baniList = ['yusuf', 'musa', 'harun', 'dawud', 'sulayman', 'zakariya', 'yahya', 'isa']
      .map(id => this.pname(id)).join(' · ');
    return `
      <div class="mt-8">
        <h3 class="text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">🌿 ${this.esc(this.tt('prophets_lineage_title'))}</h3>
        <p class="text-xs text-gray-400 dark:text-gray-500 mb-3" dir="auto">${this.esc(this.tt('prophets_lineage_intro'))}</p>
        <div class="rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 overflow-x-auto">
          <div class="space-y-2 min-w-[16rem]">
            ${node(this.pname('adam') + ' (AS)')}
            ${branch(`
              ${node(this.pname('nuh') + ' (AS)')}
              ${branch(`
                ${node(this.pname('ibrahim') + ' (AS)')}
                ${branch(`
                  ${node(this.pname('ismail') + ' (AS)', '→ ' + this.tt('prophets_lineage_arabs') + ' → ' + this.pname('muhammad') + ' ﷺ')}
                  ${node(this.pname('ishaq') + ' (AS)', '→ ' + this.pname('yaqub') + ' (' + this.tt('prophets_lineage_israel') + ') (AS)')}
                  ${branch(`
                    <div>
                      <div class="text-[0.7rem] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-1">${this.esc(this.tt('prophets_lineage_bani'))}</div>
                      <div class="text-xs text-gray-600 dark:text-gray-300" dir="auto">${this.esc(baniList)} (AS)</div>
                    </div>`)}
                `)}
              `)}
            `)}
          </div>
        </div>
        <p class="text-[0.7rem] text-gray-400 dark:text-gray-500 leading-relaxed mt-2" dir="auto">ℹ️ ${this.esc(this.tt('prophets_lineage_note'))}</p>
      </div>`;
  }

  mentionsHtml() {
    const max = PROPHETS_MENTIONS.reduce((m, x) => Math.max(m, x.n || 0), 1);
    return `
      <div class="mt-8">
        <h3 class="text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">📊 ${this.esc(this.tt('prophets_mentions_title'))}</h3>
        <p class="text-xs text-gray-400 dark:text-gray-500 mb-3" dir="auto">${this.esc(this.tt('prophets_mentions_intro'))}</p>
        <div class="rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 space-y-2">
          ${PROPHETS_MENTIONS.map(m => {
            const pct = Math.max(4, Math.round((m.n / max) * 100));
            const note = this.lc({en: m.noteEn, bn: m.noteBn});
            return `
            <div>
              <div class="flex items-center justify-between gap-2 text-xs">
                <span class="font-medium text-gray-700 dark:text-gray-200">${this.esc(this.pname(m.pid))}</span>
                <span class="text-gray-400 dark:text-gray-500 whitespace-nowrap">~${m.n} ${this.esc(this.tt('prophets_mentions_times'))}</span>
              </div>
              <div class="h-1.5 mt-0.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                <div class="h-full bg-primary/70" style="width:${pct}%"></div>
              </div>
              ${note ? `<p class="text-[0.65rem] text-gray-400 dark:text-gray-500 mt-0.5" dir="auto">${this.esc(note)}</p>` : ''}
            </div>`;
          }).join('')}
        </div>
        <p class="text-[0.7rem] text-gray-400 dark:text-gray-500 leading-relaxed mt-2" dir="auto">ℹ️ ${this.esc(this.tt('prophets_mentions_note'))}</p>
      </div>`;
  }

  // ── quiz ─────────────────────────────────────────────────────────────
  shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t2 = a[i]; a[i] = a[j]; a[j] = t2;
    }
    return a;
  }

  buildQuiz() {
    const baseN = 4;
    const chosen = this.shuffle(PROPHETS_DATA).slice(0, baseN);
    const questions = chosen.map(p => {
      // Prefer an "event" prompt when the prophet has events, else "nation".
      const events = Array.isArray(p.events) ? p.events : [];
      const useEvent = events.length && Math.random() < 0.5;
      let promptText, promptType;
      if (useEvent) {
        const ev = events[Math.floor(Math.random() * events.length)];
        promptText = this.lc(ev);
        promptType = 'event';
      } else {
        promptText = this.loc(p, 'nation');
        promptType = 'nation';
      }
      const distractors = this.shuffle(PROPHETS_DATA.filter(x => x.id !== p.id)).slice(0, 3);
      const options = this.shuffle(distractors.concat(p)).map(o => ({ id: o.id, label: this.pname(o.id) }));
      return { answerId: p.id, promptText, promptType, options };
    });

    // 2 dua questions: "Which prophet made this supplication?"
    try {
      const duas = this.shuffle(PROPHETS_DUAS).slice(0, 2);
      duas.forEach(d => {
        const answer = PROPHETS_DATA.find(x => x.id === d.pid);
        if (!answer) return;
        const distractors = this.shuffle(PROPHETS_DATA.filter(x => x.id !== d.pid)).slice(0, 3);
        const options = this.shuffle(distractors.concat(answer)).map(o => ({ id: o.id, label: this.pname(o.id) }));
        const promptText = this.lc({en: d.glossEn, bn: d.glossBn});
        questions.push({ answerId: d.pid, promptText, promptType: 'dua', options });
      });
    } catch (_) { /* ignore */ }

    // 2 lineage questions with curated options.
    try {
      const lin = this.shuffle(PROPHETS_LINEAGE_QUIZ).slice(0, 2);
      lin.forEach(lq => {
        const options = this.shuffle(lq.optionIds.slice()).map(id => ({ id, label: this.pname(id) }));
        const promptText = this.lc({en: lq.promptEn, bn: lq.promptBn});
        questions.push({ answerId: lq.answerId, promptText, promptType: 'lineage', options });
      });
    } catch (_) { /* ignore */ }

    return { questions: this.shuffle(questions), idx: 0, score: 0, answeredId: null, done: false };
  }

  renderQuiz() {
    const q = this.quizState;
    if (!q) { this.render(); return; }
    const total = q.questions.length;

    if (q.done) {
      const passed = q.score === total;
      this.container.innerHTML = `
        <div class="w-full max-w-md mx-auto py-8 text-center">
          <div class="text-4xl mb-2" aria-hidden="true">${passed ? '🌟' : '✦'}</div>
          <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100 mb-1">${this.esc(this.tt('prophets_quiz_result'))}</h2>
          <p class="text-3xl font-extrabold text-primary my-3">${q.score} / ${total}</p>
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-5">🏆 ${this.esc(this.tt('prophets_quiz_best'))}: ${this.quizBest}</p>
          <div class="flex items-center justify-center gap-2">
            <button type="button" data-prophets-quiz-restart
              class="px-5 py-2.5 rounded-xl bg-primary text-white font-semibold hover:opacity-90 transition-opacity">↻ ${this.esc(this.tt('prophets_quiz_restart'))}</button>
            <button type="button" data-prophets-quiz-close
              class="px-5 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-semibold hover:text-primary transition-colors">${this.esc(this.tt('prophets_quiz_close'))}</button>
          </div>
        </div>`;
      return;
    }

    const cur = q.questions[q.idx];
    const answered = q.answeredId != null;
    const promptLabel = cur.promptType === 'event' ? this.tt('prophets_quiz_q_event')
      : cur.promptType === 'dua' ? this.tt('prophets_quiz_q_dua')
      : cur.promptType === 'lineage' ? this.tt('prophets_quiz_q_lineage')
      : this.tt('prophets_quiz_q_nation');
    const pct = Math.round((q.idx / total) * 100);

    const optsHtml = cur.options.map(o => {
      let cls = 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-primary';
      let mark = '';
      if (answered) {
        if (o.id === cur.answerId) { cls = 'bg-green-50 dark:bg-green-900/30 border-green-400 dark:border-green-700'; mark = '<span class="text-green-500">✓</span>'; }
        else if (o.id === q.answeredId) { cls = 'bg-red-50 dark:bg-red-900/30 border-red-400 dark:border-red-700'; mark = '<span class="text-red-500">✗</span>'; }
        else { cls = 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 opacity-60'; }
      }
      return `<button type="button" ${answered ? 'disabled' : ''} data-prophets-quiz-answer="${this.esc(o.id)}"
        class="w-full flex items-center justify-between gap-2 text-left px-4 py-3 rounded-xl border font-medium text-gray-700 dark:text-gray-200 transition-colors ${cls}">
        <span>${this.esc(o.label)}</span> ${mark}</button>`;
    }).join('');

    const correctName = this.pname(cur.answerId);
    const feedback = answered
      ? (q.answeredId === cur.answerId
          ? `<p class="text-sm font-semibold text-green-600 dark:text-green-400 text-center mt-3">✓ ${this.esc(this.tt('prophets_quiz_correct'))}</p>`
          : `<p class="text-sm font-semibold text-red-500 text-center mt-3">${this.esc(this.tt('prophets_quiz_wrong'))}: ${this.esc(correctName)}</p>`)
      : '';
    const isLast = q.idx === total - 1;

    this.container.innerHTML = `
      <div class="w-full max-w-md mx-auto py-4">
        <div class="flex items-center justify-between mb-2 text-xs text-gray-500 dark:text-gray-400">
          <span>${this.esc(this.tt('prophets_quiz_question'))} ${q.idx + 1} / ${total}</span>
          <span>${this.esc(this.tt('prophets_quiz_score'))}: <strong class="text-primary">${q.score}</strong> · 🏆 ${this.quizBest}</span>
        </div>
        <div class="h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden mb-4">
          <div class="h-full bg-primary transition-all" style="width:${pct}%"></div>
        </div>
        <div class="rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 p-4 mb-4">
          <p class="text-xs text-gray-400 dark:text-gray-500 mb-1">${this.esc(promptLabel)}</p>
          <p class="text-base font-semibold text-gray-800 dark:text-gray-100 leading-relaxed" dir="auto">${this.esc(cur.promptText)}</p>
        </div>
        <div class="space-y-2">${optsHtml}</div>
        ${feedback}
        <div class="mt-4 flex items-center justify-between">
          <button type="button" data-prophets-quiz-close
            class="text-xs text-gray-400 hover:text-red-500 transition-colors">✕ ${this.esc(this.tt('prophets_quiz_close'))}</button>
          ${answered ? `<button type="button" data-prophets-quiz-next
            class="px-5 py-2.5 rounded-xl bg-primary text-white font-semibold hover:opacity-90 transition-opacity">${this.esc(isLast ? this.tt('prophets_quiz_finish') : this.tt('prophets_quiz_next'))} →</button>` : ''}
        </div>
      </div>`;
  }

  quizStart() { this.quizState = this.buildQuiz(); this.render(); this.scrollTop(); }
  quizClose() { this.quizState = null; this.render(); this.scrollTop(); }

  quizAnswer(id) {
    const q = this.quizState;
    if (!q || q.answeredId != null) return;
    const cur = q.questions[q.idx];
    q.answeredId = id;
    if (id === cur.answerId) q.score++;
    this.renderQuiz();
  }

  quizNext() {
    const q = this.quizState;
    if (!q) return;
    if (q.idx < q.questions.length - 1) {
      q.idx++; q.answeredId = null;
      this.renderQuiz();
    } else {
      q.done = true;
      if (q.score > this.quizBest) { this.quizBest = q.score; this.saveQuizBest(q.score); }
      this.renderQuiz();
    }
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
          ${events.map(ev => `<li class="flex gap-2 text-sm text-gray-600 dark:text-gray-300" dir="auto"><span class="text-primary mt-0.5 shrink-0" aria-hidden="true">▸</span><span class="flex-1">${this.esc(this.lc(ev))}</span></li>`).join('')}
        </ul>
      </div>` : '';

    const spotlight = this.loc(p, 'spotlight');
    const spotlightHtml = spotlight ? `
      <div class="mb-4 p-3.5 rounded-xl bg-primary/5 border border-primary/20">
        <h3 class="text-sm font-bold text-primary mb-1.5 flex items-center gap-1.5">✧ ${this.esc(this.tt('prophets_label_spotlight'))}</h3>
        <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed" dir="auto">${this.esc(spotlight)}</p>
      </div>` : '';

    const sign = this.loc(p, 'sign');
    const signRefs = Array.isArray(p.signRefs) ? p.signRefs : [];
    const signHtml = sign ? `
      <div class="mb-4 p-3.5 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-900/40">
        <h3 class="text-sm font-bold text-teal-700 dark:text-teal-300 mb-1.5 flex items-center gap-1.5">✦ ${this.esc(this.tt('prophets_label_sign'))}</h3>
        <p class="text-sm text-teal-800 dark:text-teal-200 leading-relaxed mb-2" dir="auto">${this.esc(sign)}</p>
        ${signRefs.length ? `<div class="flex flex-wrap gap-1.5">${signRefs.map(r => `<button type="button" data-prophets-ayah="${this.esc(this.openRef(r))}"
            class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-teal-500/10 text-teal-700 dark:text-teal-300 text-[0.7rem] font-medium hover:bg-teal-500 hover:text-white transition-colors" dir="auto">📖 ${this.esc(this.refLabel(r))}</button>`).join('')}</div>` : ''}
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
            <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100">${this.esc(p.translit)} <span class="text-gray-400 dark:text-gray-500 font-normal text-base">— ${this.esc(this.lc(p))}</span></h2>
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

            ${spotlightHtml}
            ${eventsHtml}
            ${signHtml}
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

        const groupBtn = e.target.closest('[data-prophets-group]');
        if (groupBtn) { this.grouped = !this.grouped; this.render(); return; }

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

        const quizStart = e.target.closest('[data-prophets-quiz-start], [data-prophets-quiz-restart]');
        if (quizStart) { this.quizStart(); return; }

        const quizClose = e.target.closest('[data-prophets-quiz-close]');
        if (quizClose) { this.quizClose(); return; }

        const quizAnswer = e.target.closest('[data-prophets-quiz-answer]');
        if (quizAnswer) { this.quizAnswer(quizAnswer.getAttribute('data-prophets-quiz-answer')); return; }

        const quizNext = e.target.closest('[data-prophets-quiz-next]');
        if (quizNext) { this.quizNext(); return; }
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
