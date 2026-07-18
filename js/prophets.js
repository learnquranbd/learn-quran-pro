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
 * Per-prophet depth data: key trials, land/region, scripture (where given),
 * and spotlight/sign content for prophets that lack it in PROPHETS_DATA.
 * Keyed by prophet id.  Rendering in renderDetailInline() falls back here.
 * Sources: Quran only + Sahih Bukhari/Muslim.  No Isra\u02beiliyyat.
 */
const PROPHETS_DEPTH = {
  adam: {
    spotlightEn: 'Adam (AS), the first human and first prophet, was fashioned by Allah\u2019s own hands and taught the names of all things \u2014 an honour shown when the angels could not answer and Adam could. Commanded to \u201cgo down\u201d after the test in the Garden, he and Hawwa called out with the du\u02bca that became the model of repentance: \u201cOur Lord, we have wronged ourselves; if You do not forgive us we shall be among the losers.\u201d Allah accepted it. His story sets the pattern for all humanity: sin, sincere return, and mercy.',
    spotlightBn: '\u0986\u09a6\u09ae (আঃ), প্রথম মানুষ ও প্রথম নবী, আল্লাহর নিজ হাতে নির্মিত ও সব কিছুর নাম শেখানো — যা ফেরেশতারা পারেননি সেটি আদম পেরেছেন। বাগান থেকে নামানোর পর তিনি ও হাওয়া তওবার আদর্শ দোয়া করেন: "হে আমাদের প্রভু, আমরা নিজেদের ওপর জুলুম করেছি।" আল্লাহ তা কবুল করেন। তাঁর কাহিনি সমগ্র মানবজাতির প্যাটার্ন: পাপ, আন্তরিক প্রত্যাবর্তন ও রহমত।',
    signEn: 'The sign of Adam was Allah\u2019s direct creation of him, the command to the angels to prostrate (which they obeyed), and Iblis\u2019s arrogant refusal — a lesson that Allah honours the human and that pride is the root of eternal ruin.',
    signBn: 'আদমের নিদর্শন ছিল আল্লাহর সরাসরি সৃষ্টি, ফেরেশতাদের সিজদার আদেশ (যা তারা মানে) এবং ইবলিসের অহংকারী অস্বীকৃতি — শিক্ষা: আল্লাহ মানুষকে সম্মান দেন, আর অহংকার চিরন্তন ধ্বংসের মূল।',
    signRefs: ['2:30-33', '7:11-12'],
    trials: [
      { en: 'The test of the forbidden tree — a single prohibition to teach obedience.', bn: 'নিষিদ্ধ গাছের পরীক্ষা — আনুগত্য শেখাতে একটি মাত্র নিষেধাজ্ঞা।' },
      { en: 'Iblis declared as a sworn enemy — Adam was warned to beware.', bn: 'ইবলিস ঘোষিত শত্রু — আদমকে সতর্ক করা হয়।' },
      { en: 'Being sent down to earth, bearing responsibility for himself and his children.', bn: 'পৃথিবীতে নামানো, নিজের ও সন্তানদের দায়িত্ব বহন।' },
    ],
    landEn: 'The Garden (al-Jannah), then earth broadly — father of all humanity',
    landBn: 'জান্নাত, পরে পৃথিবী — সমগ্র মানবজাতির পিতা',
  },
  idris: {
    spotlightEn: 'Idris (AS) is praised in the Quran for three qualities: truthfulness (siddiq), prophethood, and patient steadfastness. The greatest statement the Quran makes about him is that Allah \u201craised him to a high and exalted station.\u201d The Quran keeps his story brief, and that brevity is instructive: it is enough that Allah praises someone for truth, patience, and honour.',
    spotlightBn: 'ইদরিস (আঃ)-কে কুরআনে তিনটি গুণে প্রশংসা করা হয়েছে: সত্যবাদিতা (সিদ্দীক), নবুয়ত ও ধৈর্যশীল অবিচলতা। কুরআনের সবচেয়ে বড় বক্তব্য হলো আল্লাহ তাঁকে "উচ্চ ও সম্মানিত স্থানে উন্নীত করেছেন।" সংক্ষিপ্ততাই শিক্ষণীয়: আল্লাহর প্রশংসাই যথেষ্ট।',
    signEn: 'The sign of Idris was his elevation: Allah raised him to a high and exalted station (makan \u02bfaliyyan, 19:57). No detail of how is given — the dignity of the statement is itself the sign.',
    signBn: 'ইদরিসের নিদর্শন ছিল তাঁর উন্নয়ন: আল্লাহ তাঁকে উচ্চ ও মহান স্থানে উন্নীত করেন (১৯:৫৭)। কীভাবে তা বলা হয়নি — বক্তব্যের মর্যাদাই নিদর্শন।',
    signRefs: ['19:56-57'],
    trials: [
      { en: 'Calling to truth in the early generations after Adam.', bn: 'আদমের পরবর্তী প্রাথমিক প্রজন্মে সত্যের দিকে আহ্বান।' },
      { en: 'Remaining patient and steadfast while most ignored the message.', bn: 'অধিকাংশ বার্তা উপেক্ষা করলেও ধৈর্যশীল ও অবিচল থাকা।' },
    ],
    landEn: 'Ancient land (early generations of humanity)',
    landBn: 'প্রাচীন ভূমি (মানবজাতির প্রাথমিক প্রজন্ম)',
  },
  nuh: {
    trials: [
      { en: 'Nearly a thousand years of rejection by his own people.', bn: 'প্রায় হাজার বছর ধরে নিজ সম্প্রদায়ের প্রত্যাখ্যান।' },
      { en: 'His own son\u2019s refusal to board the Ark and his drowning.', bn: 'নিজ পুত্রের নৌকায় ওঠতে অস্বীকার ও তার ডুবে মরা।' },
      { en: 'Being mocked while building the Ark on dry land.', bn: 'শুকনো জমিতে নৌকা বানাতে গিয়ে উপহাসের শিকার হওয়া।' },
    ],
    landEn: 'Ancient Mesopotamia (Iraq region)',
    landBn: 'প্রাচীন মেসোপটেমিয়া (ইরাক অঞ্চল)',
  },
  hud: {
    spotlightEn: 'Hud (AS) stood alone before the most powerful nation of his time. The people of \u02bfAd boasted, \u201cWho is mightier than us?\u201d piling up lofty monuments as proof of their greatness. Hud reminded them of their true Benefactor and called them to gratitude and tawhid. They accused him of foolishness; he replied calmly: \u201cI call Allah to witness, and you witness, that I am free of what you associate with Him.\u201d When the wind came — what they mistook for rain — it left them like hollow palm-trunks. Hud and the believers were saved.',
    spotlightBn: 'হুদ (আঃ) তাঁর সময়ের সবচেয়ে শক্তিশালী জাতির সামনে একা দাঁড়িয়েছিলেন। আদ জাতি অহংকার করত: "আমাদের চেয়ে শক্তিশালী কে?" তারা সুউচ্চ স্থাপনা গড়ে মহত্ত্ব প্রমাণ করতে চাইত। হুদ তাদের প্রকৃত অনুগ্রহকর্তার কথা স্মরণ করিয়ে দেন। তারা তাঁকে নির্বোধ বললে তিনি শান্তভাবে জবাব দেন: "আল্লাহকে সাক্ষী রাখছি, আমি তোমরা যা শরিক কর তা থেকে মুক্ত।" যখন ঝড় এলো — তারা ভেবেছিল বৃষ্টি — তা তাদের ফাঁপা খেজুরকাণ্ডের মতো ফেলে গেল।',
    trials: [
      { en: 'Standing alone against a physically superior, arrogant civilization.', bn: 'শারীরিকভাবে শ্রেষ্ঠ, অহংকারী সভ্যতার বিরুদ্ধে একা দাঁড়ানো।' },
      { en: 'Being accused of foolishness and having no divine proof.', bn: 'নির্বোধ আখ্যায়িত করা ও কোনো দৈব প্রমাণ না থাকার অভিযোগ।' },
    ],
    landEn: 'Al-Ahqaf / southern Arabia (ancient Yemen region)',
    landBn: 'আল-আহকাফ / দক্ষিণ আরব (প্রাচীন ইয়েমেন অঞ্চল)',
  },
  salih: {
    spotlightEn: 'Salih (AS) was sent to Thamud, who carved homes from mountains and were given every blessing. The she-camel — brought forth as a divine sign — was their test: \u201cShe is Allah\u2019s she-camel; leave her to graze and harm her not, lest a painful punishment seize you.\u201d They were warned three days in advance. The most wicked among them hamstrung her in defiance, and Salih told them: \u201cEnjoy your lives three days; that is a promise not to be denied.\u201d On the fourth day, the mighty blast came.',
    spotlightBn: 'সালিহ (আঃ)-কে সামুদ জাতির কাছে পাঠানো হয়, যারা পাহাড় কেটে ঘর বানাত ও প্রতিটি নিয়ামত ভোগ করত। উষ্ট্রী ছিল তাদের পরীক্ষা: "এটি আল্লাহর উষ্ট্রী; এটিকে অবাধে চরতে দাও, ক্ষতি করো না।" তাদের তিন দিন আগেই সতর্ক করা হয়। তাদের মধ্যে সবচেয়ে দুষ্ট ব্যক্তি সেটিকে হত্যা করে। সালিহ বললেন: "তিন দিন জীবন উপভোগ করো; এ প্রতিশ্রুতি অপ্রমাণ্য নয়।" চতুর্থ দিনে প্রচণ্ড বিস্ফোরণ এলো।',
    trials: [
      { en: 'Calling to tawhid a people convinced of their own civilizational superiority.', bn: 'নিজেদের সভ্যতার শ্রেষ্ঠত্বে বিশ্বাসী জাতিকে তাওহিদের দিকে ডাকা।' },
      { en: 'Watching the divine test (the she-camel) be defied and destroyed.', bn: 'দৈব পরীক্ষা (উষ্ট্রী) অমান্য ও ধ্বংস করতে দেখা।' },
    ],
    landEn: 'Al-Hijr / Madain Salih (northwest Arabia)',
    landBn: 'আল-হিজর / মাদাইন সালিহ (উত্তর-পশ্চিম আরব)',
  },
  ibrahim: {
    trials: [
      { en: 'Confronting idol-worshipping people including his own father.', bn: 'মূর্তিপূজারি সম্প্রদায় — এমনকি নিজের পিতার — মুখোমুখি হওয়া।' },
      { en: 'Being cast into a blazing fire.', bn: 'জ্বলন্ত আগুনে নিক্ষিপ্ত হওয়া।' },
      { en: 'Leaving his wife and infant son in a barren valley with nothing.', bn: 'স্ত্রী ও শিশুপুত্রকে শুষ্ক উপত্যকায় একা ছেড়ে যাওয়া।' },
      { en: 'The command to sacrifice his son — the greatest test.', bn: 'পুত্র কুরবানির আদেশ — সর্বশ্রেষ্ঠ পরীক্ষা।' },
    ],
    landEn: 'Ur of Chaldees (Iraq), then Canaan and Mecca',
    landBn: 'উর অফ চ্যালডিজ (ইরাক), পরে কেনান ও মক্কা',
    bookEn: 'The Suhuf (Scrolls of Ibrahim) — given divine scriptures (87:18-19)',
    bookBn: 'সুহুফ (ইবরাহীমের পাতা) — দৈব কিতাব প্রাপ্ত (৮৭:১৮-১৯)',
  },
  lut: {
    spotlightEn: 'Lut (AS), nephew of Ibrahim, faced a community that had abandoned all restraint. He called them to purity and warned of punishment, but they threatened him with exile. When angels came to his home as guests in human form, his people rushed to his door demanding his guests. Lut was distressed: \u201cThese are my guests \u2014 do not shame me.\u201d The angels told him: \u201cDo not fear — we are messengers of your Lord.\u201d Lut left with his family at night, and at dawn the town was overturned, with baked-clay stones raining down. It remains a clear sign for those who look.',
    spotlightBn: 'লূত (আঃ), ইবরাহীমের ভাতিজা, এমন এক সম্প্রদায়ের মুখোমুখি হন যারা সমস্ত সীমা অতিক্রম করেছিল। তিনি তাদের পবিত্রতার দিকে ডাকেন ও শাস্তির সতর্কতা দেন, কিন্তু তারা নির্বাসনের হুমকি দেয়। ফেরেশতারা মানব রূপে অতিথি হিসেবে আসলে সম্প্রদায় তাঁর দরজায় আসে। লূত বিচলিত হলে ফেরেশতারা বলেন: "ভয় পেয়ো না।" রাতে লূত পরিবারসহ চলে যান, আর ভোরে নগরী উল্টে যায়।',
    signEn: 'The sign of Lut was the destruction of Sodom: the town was overturned by the angels, and stones of baked clay rained down on the people. Lut and his believing family were saved; his wife, who stayed behind, perished. The ruins remain a clear sign for those who pass by.',
    signBn: 'লূতের নিদর্শন ছিল সদোম ধ্বংস: ফেরেশতারা নগরী উল্টে দেন ও পোড়া মাটির পাথর বর্ষণ হয়। লূত ও মুমিন পরিবার রক্ষা পান; পিছনে থাকা স্ত্রী ধ্বংস হন। ধ্বংসাবশেষ পথিকদের জন্য স্পষ্ট নিদর্শন।',
    signRefs: ['11:81-82', '15:73-77'],
    trials: [
      { en: 'Calling to purity in a city committed to the worst of sins.', bn: 'সবচেয়ে জঘন্য পাপে আসক্ত নগরে পবিত্রতার আহ্বান।' },
      { en: 'Protecting his guests from a mob.', bn: 'জনতার হাত থেকে অতিথিদের রক্ষা করা।' },
      { en: 'His wife remaining behind and perishing.', bn: 'স্ত্রীর পিছনে থেকে ধ্বংস হওয়া।' },
    ],
    landEn: 'Sodom (Levant / Dead Sea region)',
    landBn: 'সদোম (লেভান্ট / মৃত সাগর অঞ্চল)',
  },
  ismail: {
    spotlightEn: 'Isma\u02beīl (AS), elder son of Ibrahim, is the Quran\u2019s supreme example of willing submission. When Ibrahim told him of the dream-command to sacrifice him, Isma\u02beīl replied: \u201cFather, do what you are commanded; you will find me, if Allah wills, among the patient.\u201d That single reply earned him the Quran\u2019s title \u201ctrue to his promise\u201d (sadiq al-wa\u02bfd). The Ka\u02bbah he raised with his father still stands; the Zamzam he was brought to still flows; and through his descendants came the Final Messenger ﷺ — the fulfilment of the very du\u02bca he and Ibrahim made.',
    spotlightBn: 'ইসমাঈল (আঃ), ইবরাহীমের বড় পুত্র, স্বেচ্ছায় আত্মসমর্পণের কুরআনের সর্বোচ্চ উদাহরণ। ইবরাহীম স্বপ্নের আদেশ জানালে তিনি বললেন: "পিতা, আপনাকে যা আদেশ করা হয়েছে তা করুন; আল্লাহ চাইলে আমাকে ধৈর্যশীলদের মধ্যে পাবেন।" এই একটি বাক্যই তাঁকে "প্রতিশ্রুতিতে সত্যবাদী" (সাদিক আল-ওয়াদ) উপাধি দেয়। তিনি ও ইবরাহীমের নির্মিত কাবা এখনও দাঁড়িয়ে, যমযম এখনও প্রবাহিত এবং তাঁদের বংশ থেকেই এলেন সর্বশেষ রাসূল ﷺ।',
    trials: [
      { en: 'Left as an infant with his mother in a barren, waterless valley.', bn: 'শিশু বয়সে মায়ের সাথে শুষ্ক, জলহীন উপত্যকায় ছেড়ে যাওয়া।' },
      { en: 'Commanded as a sacrifice — willingly submitted.', bn: 'কুরবানির আদেশ — স্বেচ্ছায় আত্মসমর্পণ।' },
    ],
    landEn: 'Mecca (Hijaz, Arabia)',
    landBn: 'মক্কা (হিজায, আরব)',
  },
  ishaq: {
    spotlightEn: 'Ishaq (AS) was the second son of Ibrahim, announced by angels to Ibrahim and his wife Sarah in their very old age. When Sarah heard the news, she said in astonishment: \u201cShall I give birth while I am an old woman and this my husband is an old man?\u201d They replied: \u201cSo has Allah willed; He is the All-Knowing, All-Wise.\u201d His birth was itself a sign. Through his son Ya\u02bfqub and Ya\u02bfqub\u2019s twelve sons, prophethood and scripture continued among the Children of Israel for centuries, fulfilling Allah\u2019s promise to Ibrahim.',
    spotlightBn: 'ইসহাক (আঃ) ছিলেন ইবরাহীমের দ্বিতীয় পুত্র, ফেরেশতাদের মাধ্যমে ইবরাহীম ও বৃদ্ধা স্ত্রী সারাকে ঘোষণা করা হয়। সারা বিস্ময়ে বললেন: "আমি বৃদ্ধা হয়ে সন্তান জন্ম দেব?" ফেরেশতারা জবাব দেন: "এমনই আল্লাহর ইচ্ছা।" তাঁর জন্মই ছিল এক নিদর্শন। তাঁর পুত্র ইয়াকুব ও তাঁর বারো পুত্রের মাধ্যমে শতাব্দীর পর শতাব্দী বনী ইসরাঈলে নবুয়ত ও কিতাব অব্যাহত থাকে।',
    signEn: 'The sign of Ishaq was his miraculous birth to very old Ibrahim and his barren wife Sarah — announced by angels, fulfilling the divine promise and proving that nothing is impossible for Allah.',
    signBn: 'ইসহাকের নিদর্শন ছিল বৃদ্ধ ইবরাহীম ও বন্ধ্যা স্ত্রী সারার কাছে তাঁর অলৌকিক জন্ম — ফেরেশতাদের দ্বারা ঘোষিত, প্রমাণ করে যে আল্লাহর কাছে কিছুই অসম্ভব নয়।',
    signRefs: ['11:71-73', '51:28-30'],
    trials: [
      { en: 'Being born as a divine sign — the weight of carrying prophetic lineage.', bn: 'দৈব নিদর্শন হিসেবে জন্ম — নবুয়তের বংশধারা বহনের ভার।' },
    ],
    landEn: 'Canaan (Levant / modern Israel-Palestine)',
    landBn: 'কেনান (লেভান্ট / আধুনিক ইসরাইল-ফিলিস্তিন)',
  },
  yaqub: {
    spotlightEn: 'Ya\u02bfqub (AS), also called Israel, is the patient father whose sons became the twelve tribes. When Yusuf was taken, he did not despair; he said: \u201cBeautiful patience \u2014 and Allah is the one whose help is sought.\u201d He kept his grief private, weeping until he lost his sight, yet told his sons: \u201cDo not despair of the mercy of Allah.\u201d On his deathbed, surrounded by his sons, he asked: \u201cWhat will you worship after me?\u201d They replied with the testimony of tawhid. This became the testament of the Children of Israel — passed on by a broken, patient father who never stopped trusting his Lord.',
    spotlightBn: 'ইয়াকুব (আঃ), যাঁকে ইসরাঈলও বলা হয়, ছিলেন সেই ধৈর্যশীল পিতা যাঁর পুত্ররা বারো গোত্রে পরিণত হয়। ইউসুফ নেওয়া হলে তিনি হতাশ হননি; বললেন: "সুন্দর ধৈর্যই শ্রেয়।" দুঃখে অন্ধ হয়ে গেলেও পুত্রদের বললেন: "আল্লাহর রহমত থেকে নিরাশ হয়ো না।" মৃত্যুশয্যায় পুত্রদের জিজ্ঞেস করলেন: "আমার পরে কার ইবাদত করবে?" তারা তাওহিদের সাক্ষ্য দিল।',
    signEn: 'The sign given through Ya\u02bfqub was the restoration of his sight: Yusuf sent his shirt from Egypt, and when it was cast over his blind father\u2019s face, his eyesight returned — confirming the dream of long ago and proving that Allah\u2019s promises are certain.',
    signBn: 'ইয়াকুবের মাধ্যমে দেওয়া নিদর্শন ছিল তাঁর দৃষ্টিশক্তি ফিরে আসা: ইউসুফ মিশর থেকে জামা পাঠান, আর তা অন্ধ পিতার মুখে দেওয়া হলে দৃষ্টি ফিরে আসে — পুরনো স্বপ্ন সত্য হয়।',
    signRefs: ['12:93-96'],
    trials: [
      { en: 'Years of separation from his beloved son Yusuf.', bn: 'প্রিয় পুত্র ইউসুফ থেকে দীর্ঘ বিচ্ছেদ।' },
      { en: 'Grief so deep it blinded him — yet he never despaired of Allah\u2019s mercy.', bn: 'এত গভীর শোক যা তাঁকে অন্ধ করে দেয় — তবু আল্লাহর রহমত থেকে নিরাশ হননি।' },
      { en: 'His sons\u2019 deception regarding Yusuf.', bn: 'পুত্রদের ইউসুফ সম্পর্কে প্রতারণা।' },
    ],
    landEn: 'Canaan (Levant), then Egypt',
    landBn: 'কেনান (লেভান্ট), পরে মিশর',
  },
  yusuf: {
    trials: [
      { en: 'Betrayal by his own brothers — thrown into a well.', bn: 'সহোদর ভাইদের বিশ্বাসঘাতকতা — কূপে নিক্ষেপ।' },
      { en: 'Sold into slavery in Egypt.', bn: 'মিশরে দাস হিসেবে বিক্রি।' },
      { en: 'False accusation and years of unjust imprisonment.', bn: 'মিথ্যা অভিযোগ ও বছরের পর বছর অন্যায় কারাবাস।' },
      { en: 'The temptation of the minister\u2019s wife — he chose Allah over desire.', bn: 'মন্ত্রীর স্ত্রীর প্রলোভন — তিনি কামনার বদলে আল্লাহকে বেছে নেন।' },
    ],
    landEn: 'Canaan (Levant) and Egypt',
    landBn: 'কেনান (লেভান্ট) ও মিশর',
  },
  ayyub: {
    spotlightEn: 'Ayyub (AS) is the Quran\u2019s supreme example of patient endurance under affliction. Stripped of wealth, children, and health over long years, he did not complain against his Lord — he only prayed: \u201cHarm has touched me, and You are the Most Merciful of the merciful.\u201d Allah declared him \u201can excellent servant \u2014 always returning\u201d to his Lord. The cool spring that gushed at his foot restored him completely; his family was returned and doubled in blessings. The Quran calls on every believer to remember him when patience is tested.',
    spotlightBn: 'আইয়ুব (আঃ) যন্ত্রণার মধ্যে ধৈর্যশীল সহনশীলতার কুরআনের সর্বোচ্চ উদাহরণ। দীর্ঘ বছর ধরে সম্পদ, সন্তান ও স্বাস্থ্য হারিয়েও প্রভুর বিরুদ্ধে অভিযোগ করেননি — শুধু দোয়া করলেন: "আমাকে কষ্ট স্পর্শ করেছে, আর আপনি দয়ালুদের মধ্যে সর্বশ্রেষ্ঠ।" আল্লাহ তাঁকে "উত্তম বান্দা — সর্বদা প্রত্যাবর্তনকারী" বললেন। শীতল ঝর্ণায় আরোগ্য, পরিবার দ্বিগুণ হলো।',
    trials: [
      { en: 'Loss of wealth, children, and health over years of suffering.', bn: 'দীর্ঘ কষ্টের বছরে সম্পদ, সন্তান ও স্বাস্থ্য হারানো।' },
      { en: 'Enduring severe illness without losing gratitude or faith.', bn: 'কৃতজ্ঞতা ও ঈমান না হারিয়ে গুরুতর অসুস্থতা সহ্য করা।' },
    ],
    landEn: 'Ancient Levant (al-Sham / Syria-Palestine region)',
    landBn: 'প্রাচীন লেভান্ট (আল-শাম / সিরিয়া-ফিলিস্তিন অঞ্চল)',
  },
  shuayb: {
    spotlightEn: 'Shu\u02beayb (AS) is sometimes called \u201cthe preacher of the prophets\u201d for the clarity of his arguments. Sent to Madyan — a mercantile people who gave short measures and spread corruption — he called for tawhid and honest dealing as a single message: \u201cGive full measure and weight in justice.\u201d His people said: \u201cYour prayer would have us abandon what our fathers worshipped.\u201d He replied: \u201cMy success is only through Allah; I have placed my trust in Him.\u201d The punishment of a dreadful day took those who refused.',
    spotlightBn: 'শুআইব (আঃ)-কে কখনো "নবীদের বক্তা" বলা হয় তাঁর যুক্তির স্বচ্ছতার জন্য। মাদইয়ানের ব্যবসায়ী সম্প্রদায়কে — যারা মাপে কম দিত ও ফাসাদ ছড়াত — তাওহিদ ও সৎ ব্যবসার একই বার্তায় ডাকেন: "পূর্ণ মাপ ও ওজন দাও।" সম্প্রদায় বলল: "তোমার নামাজ কি আমাদের পূর্বপুরুষের পথ ছাড়তে বলে?" তিনি জবাব দিলেন: "আমার সাফল্য কেবল আল্লাহর মাধ্যমে।" ভয়াবহ দিনের শাস্তি অস্বীকারকারীদের নিল।',
    signEn: 'Shu\u02beayb\u2019s sign was the compelling hujja (proof) of his clear argument — and, for those who rejected, the punishment of the loud cry (sayhah) on the day of the great shadow that came over them.',
    signBn: 'শুআইবের নিদর্শন ছিল তাঁর স্পষ্ট হুজ্জাহ (প্রমাণ) — আর অস্বীকারকারীদের জন্য, ভয়াবহ ছায়া যেদিন ছেয়ে গেল সেদিনের প্রচণ্ড গর্জনের শাস্তি।',
    signRefs: ['11:94', '26:189'],
    trials: [
      { en: 'Calling to honest trade when dishonesty was the norm.', bn: 'অসততা যখন স্বাভাবিক তখন সৎ ব্যবসার আহ্বান।' },
      { en: 'Being mocked and threatened with exile by powerful merchants.', bn: 'ক্ষমতাবান ব্যবসায়ীদের উপহাস ও নির্বাসনের হুমকি।' },
    ],
    landEn: 'Madyan (northwest Arabia / Sinai region)',
    landBn: 'মাদইয়ান (উত্তর-পশ্চিম আরব / সিনাই অঞ্চল)',
  },
  musa: {
    trials: [
      { en: 'Born when Pharaoh was killing Israelite boys; raised in the palace of the enemy.', bn: 'যখন ফেরাউন ইসরাঈলি পুত্রদের হত্যা করছিল তখন জন্ম; শত্রুর প্রাসাদে প্রতিপালন।' },
      { en: 'Accidentally killing a man and fleeing to Madyan for years.', bn: 'অনিচ্ছায় এক ব্যক্তিকে হত্যা ও বছরের পর বছর মাদইয়ানে পালিয়ে থাকা।' },
      { en: 'Standing before Pharaoh — the greatest tyrant of the age.', bn: 'ফেরাউনের সামনে দাঁড়ানো — যুগের সবচেয়ে বড় স্বৈরাচার।' },
      { en: 'His people\u2019s hardness of heart in the wilderness for forty years.', bn: 'প্রান্তরে চল্লিশ বছর ধরে সম্প্রদায়ের হৃদয়ের কঠোরতা।' },
    ],
    landEn: 'Egypt and the Sinai / Levant',
    landBn: 'মিশর ও সিনাই / লেভান্ট',
    bookEn: 'The Tawrah (Torah) — given on Mount Sinai (5:44)',
    bookBn: 'তাওরাত — সিনাই পর্বতে প্রদত্ত (৫:৪৪)',
  },
  harun: {
    spotlightEn: 'Harun (AS), elder brother and companion of Musa, was given to him as a helper in response to Musa\u2019s heartfelt du\u02bca: \u201cAppoint for me a helper from my family \u2014 my brother Harun.\u201d Together they confronted Pharaoh and delivered the message. When Musa went to the mountain to receive the Tawrah, Harun was left in charge. He tried to hold the people back from the golden calf but feared that forcibly stopping them would cause division and bloodshed. He is a model of sincere brotherly support and loyalty to the truth.',
    spotlightBn: 'হারুন (আঃ), মূসার বড় ভাই ও সঙ্গী, মূসার আন্তরিক দোয়ার জবাবে সহকারী হিসেবে দেওয়া হয়: "আমার পরিবার থেকে আমার ভাই হারুনকে সহকারী করুন।" একসাথে তারা ফেরাউনের মুখোমুখি হন। মূসা পাহাড়ে তাওরাত নিতে গেলে হারুন দায়িত্বপ্রাপ্ত হন। তিনি স্বর্ণবাছুর থেকে সম্প্রদায়কে ফেরাতে চেষ্টা করেন কিন্তু বিভাজনের ভয়ে শক্তি প্রয়োগ করেননি। তিনি সত্যের প্রতি আন্তরিক ভ্রাতৃত্ব ও আনুগত্যের আদর্শ।',
    signEn: 'Harun\u2019s sign was his appointment as a prophet alongside Musa — his fluency of tongue granted as a direct answer to Musa\u2019s prayer — so that together they could carry the clear message to Pharaoh without hesitation.',
    signBn: 'হারুনের নিদর্শন ছিল মূসার পাশে নবী হিসেবে নিয়োগ — মূসার দোয়ার সরাসরি জবাবে তাঁর বাগ্মিতা — যাতে একসাথে দ্বিধামুক্তভাবে ফেরাউনের কাছে বার্তা পৌঁছানো যায়।',
    signRefs: ['20:29-36', '28:34-35'],
    trials: [
      { en: 'Jointly facing the greatest tyrant of his time alongside Musa.', bn: 'মূসার পাশে যুগের সবচেয়ে বড় স্বৈরাচারের মুখোমুখি হওয়া।' },
      { en: 'Managing his people alone while Musa received the Tawrah.', bn: 'মূসা তাওরাত গ্রহণে থাকাকালীন একা সম্প্রদায় পরিচালনা।' },
      { en: 'The trial of the golden calf — striving to prevent it without causing bloodshed.', bn: 'স্বর্ণবাছুরের পরীক্ষা — রক্তপাত ছাড়াই এটি প্রতিরোধের চেষ্টা।' },
    ],
    landEn: 'Egypt and the Sinai',
    landBn: 'মিশর ও সিনাই',
  },
  dhulkifl: {
    spotlightEn: 'Dhul-Kifl (AS) is named twice in the Quran — alongside Isma\u02beīl, Idris, and Ayyub — as one of \u201cthe patient\u201d and one of \u201cthe good.\u201d The Quran gives him no extended narrative beyond this profound praise. Scholars consistently advise caution about attributing unverified details to him. That restraint is itself a lesson: a prophet\u2019s honour before Allah is not measured by how much we know of their story, but by their true character.',
    spotlightBn: 'যুলকিফল (আঃ)-এর নাম কুরআনে দুবার আসে — ইসমাঈল, ইদরিস ও আইয়ুবের সাথে — "ধৈর্যশীলদের" ও "উত্তমদের" মধ্যে। কুরআন এই গভীর প্রশংসার বাইরে তাঁর কোনো বিস্তারিত বিবরণ দেয়নি। আলেমগণ তাঁর সম্পর্কে যাচাই-না-করা বিবরণ আরোপে সতর্ক করেন। এই সংযম নিজেই শিক্ষণীয়।',
    signEn: 'No specific miraculous sign is narrated for Dhul-Kifl in the Quran. His honour is the praise itself: named among \u201cthe good\u201d and \u201cthe patient,\u201d entered into Allah\u2019s mercy.',
    signBn: 'কুরআনে যুলকিফলের কোনো নির্দিষ্ট অলৌকিক নিদর্শন বর্ণিত হয়নি। তাঁর সম্মানই প্রশংসা: "উত্তমদের" ও "ধৈর্যশীলদের" মধ্যে নামোল্লেখ, আল্লাহর রহমতে প্রবেশ।',
    signRefs: ['21:85-86', '38:48'],
    trials: [
      { en: 'Steadfast patience in calling to the truth — praised specifically for this quality.', bn: 'সত্যের দিকে আহ্বানে অবিচল ধৈর্য — বিশেষভাবে এই গুণে প্রশংসিত।' },
    ],
    landEn: 'Ancient land (details brief in the Quran)',
    landBn: 'প্রাচীন ভূমি (কুরআনে বিবরণ সংক্ষিপ্ত)',
  },
  dawud: {
    spotlightEn: 'Dawud (AS) — shepherd, warrior, king, and prophet — was given talents that no one before him received together: a voice that caused mountains and birds to join in glorifying Allah, iron made soft in his hands to fashion armour, the gift of just judgment, and the Zabur. As a young man he killed the tyrant Jalut with a single stone from a sling, and Allah gave him kingship and wisdom. When he erred in a judgment and realised it, he fell prostrate and wept. The Quran says: \u201cWe forgave him that; and he has a high station with Us and a fine place of return.\u201d',
    spotlightBn: 'দাউদ (আঃ) — রাখাল, যোদ্ধা, রাজা ও নবী — এমন প্রতিভা পেয়েছিলেন যা আগে কেউ একসাথে পায়নি: এমন কণ্ঠস্বর যাতে পাহাড় ও পাখিরা আল্লাহর তাসবিহে যোগ দিত, বর্ম গড়তে হাতে লোহা নরম, ন্যায়বিচারের মেধা ও যাবুর। তরুণ বয়সে তিনি একটি পাথরে জালুতকে বধ করেন, আল্লাহ তাঁকে রাজত্ব ও প্রজ্ঞা দেন। এক বিচারে ভুল করলে তিনি সাষ্টাঙ্গে পড়েন ও কাঁদেন। কুরআন বলে: "আমি তাঁকে ক্ষমা করি এবং তাঁর আমাদের কাছে উচ্চ মর্যাদা আছে।"',
    trials: [
      { en: 'Facing the tyrant Jalut as a young shepherd with only a sling.', bn: 'কেবল একটি গুলতি নিয়ে স্বৈরাচারী জালুতের মুখোমুখি হওয়া।' },
      { en: 'The weight of just kingship — the heaviest trust Allah gives.', bn: 'ন্যায়বিচারের রাজত্বের ভার — আল্লাহর দেওয়া সবচেয়ে ভারী আমানত।' },
      { en: 'An error in judgment and the deep repentance that followed.', bn: 'বিচারে একটি ভুল ও তার পরে গভীর তওবা।' },
    ],
    landEn: 'Kingdom of Israel (Jerusalem / Hebron, Levant)',
    landBn: 'ইসরাঈল রাজ্য (জেরুজালেম / হেবরন, লেভান্ট)',
    bookEn: 'The Zabur (Psalms) — given as scripture (4:163; 17:55)',
    bookBn: 'যাবুর — কিতাব হিসেবে প্রদত্ত (৪:১৬৩; ১৭:৫৫)',
  },
  sulayman: {
    spotlightEn: 'Sulayman (AS), son of Dawud, was given by Allah what no one before or after him received: command over the wind, the jinn, and the birds; understanding of animal speech; and the submission of distant kingdoms. When the hoopoe brought news of the Queen of Sheba\u2019s people worshipping the sun, Sulayman wrote her a letter opening with \u201cBismillah.\u201d She came, saw the mirrored palace floor she mistook for water, and submitted to Allah. Yet Sulayman\u2019s own prayer shows his inner life: \u201cMy Lord, enable me to be grateful for Your favour — and admit me by Your mercy among Your righteous servants.\u201d',
    spotlightBn: 'সুলাইমান (আঃ), দাউদের পুত্র, আল্লাহর কাছ থেকে যা পেয়েছিলেন তা আগে কেউ পায়নি, পরেও পাবে না: বাতাস, জিন ও পাখিদের ওপর আধিপত্য; পশু-পাখির ভাষা বোঝা; দূর রাজ্যের আনুগত্য। হুদহুদ সাবার রানির খবর আনলে তিনি "বিসমিল্লাহ" দিয়ে শুরু করে চিঠি লেখেন। রানি এসে কাচের মেঝেকে পানি ভেবে কাপড় তুলে নেন, পরে আল্লাহর কাছে আত্মসমর্পণ করেন। তবু সুলাইমানের নিজের দোয়া তাঁর অন্তরের পরিচয় দেয়: "হে প্রভু, আপনার নিয়ামতে কৃতজ্ঞ রাখুন।"',
    trials: [
      { en: 'Managing the greatest kingdom given to any prophet with consistent humility.', bn: 'যেকোনো নবীকে দেওয়া সর্বশ্রেষ্ঠ রাজত্ব ধারাবাহিক বিনয়ের সাথে পরিচালনা।' },
      { en: 'Remaining grateful and God-conscious despite unparalleled power.', bn: 'অতুলনীয় ক্ষমতা সত্ত্বেও কৃতজ্ঞ ও আল্লাহভীরু থাকা।' },
    ],
    landEn: 'Jerusalem and beyond (Levant, vast kingdom)',
    landBn: 'জেরুজালেম ও তার বাইরে (লেভান্ট, বিশাল রাজত্ব)',
  },
  ilyas: {
    spotlightEn: 'Ilyas (AS) was a prophet among the Children of Israel who called his people away from the worship of Ba\u02bfl — a false deity they had adopted. He confronted them: \u201cDo you call upon Ba\u02bfl and leave the Best of Creators, Allah, your Lord and the Lord of your forefathers?\u201d Most rejected him. Yet Allah declared: \u201cWe left for him a fine mention among later generations: peace upon Il-Yasin.\u201d His story is brief but the Quran\u2019s endorsement of him — preserving his name forever — is its own profound miracle.',
    spotlightBn: 'ইলিয়াস (আঃ) ছিলেন বনী ইসরাঈলের একজন নবী যিনি তাঁর সম্প্রদায়কে বাল দেবতার পূজা থেকে ফেরাতে ডাকেন। তিনি চ্যালেঞ্জ করলেন: "তোমরা কি বালকে ডাকো আর সর্বশ্রেষ্ঠ স্রষ্টা আল্লাহকে ছেড়ে দাও?" বেশিরভাগ তাঁকে প্রত্যাখ্যান করে। তবু আল্লাহ ঘোষণা করেন: "পরবর্তীদের মধ্যে আমি তাঁর সুনাম রেখে দিয়েছি: ইল-ইয়াসিনের প্রতি শান্তি।"',
    signEn: 'Ilyas\u2019s sign was the divine preservation of his remembrance: while the worshippers of Ba\u02bfl perished, Allah declared \u201cPeace upon Il-Yasin\u201d — keeping his name honoured among later generations. The survival of truth is the ultimate sign.',
    signBn: 'ইলিয়াসের নিদর্শন ছিল তাঁর স্মৃতির দৈব সংরক্ষণ: বালের পূজারিরা ধ্বংস হলেও আল্লাহ "ইল-ইয়াসিনের প্রতি শান্তি" ঘোষণা করেন — পরবর্তীদের মধ্যে তাঁর নাম সম্মানিত রাখেন। সত্যের টিকে থাকাই চূড়ান্ত নিদর্শন।',
    signRefs: ['37:129-130'],
    trials: [
      { en: 'Standing alone against idol-worship entrenched in his entire community.', bn: 'পুরো সম্প্রদায়ে শিকড় গেড়ে বসা মূর্তিপূজার বিরুদ্ধে একা দাঁড়ানো।' },
      { en: 'Most of his people rejecting his message.', bn: 'অধিকাংশ সম্প্রদায় তাঁর বার্তা প্রত্যাখ্যান করা।' },
    ],
    landEn: 'Ancient Israel (Samaria region, Levant)',
    landBn: 'প্রাচীন ইসরাঈল (সামারিয়া অঞ্চল, লেভান্ট)',
  },
  alyasa: {
    spotlightEn: 'Al-Yasa\u02be (AS) is honoured in the Quran among the prophets \u201cfavoured above the worlds\u201d and counted among \u201cthe good.\u201d He continued the guidance after Ilyas. Though the Quran gives him no extended narrative, his placement in the company of the greatest prophets speaks for itself. Every true caller to Allah, whether their story fills volumes or a single line, is remembered and honoured before the One who misses nothing.',
    spotlightBn: 'আল-ইয়াসা (আঃ) কুরআনে "সৃষ্টিকুলের ওপর মর্যাদাপ্রাপ্ত" নবীদের মধ্যে ও "উত্তমদের" মধ্যে সম্মানিত। ইলিয়াসের পরে তিনি পথনির্দেশ অব্যাহত রাখেন। কুরআন তাঁকে বিস্তারিত বিবরণ না দিলেও শ্রেষ্ঠ নবীদের সাথে তাঁর স্থানই সবকিছু বলে দেয়।',
    signEn: 'No specific miraculous sign is narrated for Al-Yasa\u02be in the Quran. His sign is his honour: placed among the prophets favoured above all worlds (6:86) and counted among \u201cthe good\u201d (38:48) by Allah Himself.',
    signBn: 'কুরআনে আল-ইয়াসার কোনো নির্দিষ্ট অলৌকিক নিদর্শন বর্ণিত হয়নি। তাঁর নিদর্শন তাঁর সম্মান: সৃষ্টিকুলের ওপর মর্যাদাপ্রাপ্ত নবীদের মধ্যে (৬:৮৬) ও "উত্তমদের" মধ্যে (৩৮:৪৮) আল্লাহর নিজের স্থানায়ন।',
    signRefs: ['6:86', '38:48'],
    trials: [
      { en: 'Continuing the prophetic mission after Ilyas — carrying a heavy inheritance.', bn: 'ইলিয়াসের পরে নবুয়তি দায়িত্ব চালিয়ে যাওয়া — ভারী উত্তরাধিকার বহন।' },
    ],
    landEn: 'Ancient Israel (Levant)',
    landBn: 'প্রাচীন ইসরাঈল (লেভান্ট)',
  },
  yunus: {
    trials: [
      { en: 'Leaving his people before Allah\u2019s command — impatience that led to the fish.', bn: 'আল্লাহর আদেশের আগে সম্প্রদায় ত্যাগ — অধৈর্য যা মাছের পেটে নিয়ে গেল।' },
      { en: 'Being in the belly of the great fish in layered darkness.', bn: 'স্তরে স্তরে অন্ধকারে বিশাল মাছের পেটে থাকা।' },
    ],
    landEn: 'Nineveh (ancient Assyria / modern Iraq)',
    landBn: 'নিনেভা (প্রাচীন অ্যাসিরিয়া / আধুনিক ইরাক)',
  },
  zakariya: {
    spotlightEn: 'Zakariya (AS) was a devoted prophet, keeper of the sanctuary, and guardian of Maryam. Watching Allah provide for Maryam from beyond human means, he was moved to pray privately — old, with a wife who was barren — for a righteous heir. The Quran records his intimate prayer of hope: \u201cI have never been unblessed in my prayer to You, my Lord.\u201d Allah answered with Yahya — a name never before given — and confirmed it with a sign: three days of silence from speech to people while still able to glorify Allah. His life shows that du\u02bca reaches its fullness at exactly the moment Allah has chosen.',
    spotlightBn: 'যাকারিয়া (আঃ) ছিলেন নিবেদিত নবী, পবিত্র স্থানের রক্ষক ও মারইয়ামের অভিভাবক। মারইয়ামের জন্য আল্লাহর অসাধারণ রিজিক দেখে বৃদ্ধ ও বন্ধ্যা স্ত্রীকে নিয়ে গোপনে দোয়া করলেন: "হে আমার প্রভু, আপনার কাছে দোয়া করে আমি কখনো বঞ্চিত হইনি।" আল্লাহ ইয়াহইয়া নামে সাড়া দিলেন — আগে কেউ এই নাম পায়নি — এবং তিন দিনের নীরবতার নিদর্শন দিলেন। তাঁর জীবন দেখায়: দোয়া ঠিক সেই মুহূর্তে পূর্ণ হয় যা আল্লাহ বেছে রাখেন।',
    signEn: 'The sign given to Zakariya was three days of inability to speak to people — except by gesture — while retaining full ability to glorify Allah. This was the divine confirmation that Yahya would be born.',
    signBn: 'যাকারিয়াকে দেওয়া নিদর্শন ছিল তিন দিন মানুষের সাথে কথা বলতে না পারা — কেবল ইশারায় — তবু আল্লাহর তাসবিহ পূর্ণভাবে করতে পারা। এটি ছিল ইয়াহইয়ার জন্মের ঐশ্বরিক নিশ্চিতকরণ।',
    signRefs: ['3:41', '19:10'],
    trials: [
      { en: 'Old age and childlessness — a deep longing for a righteous heir.', bn: 'বার্ধক্য ও নিঃসন্তানতা — এক সৎ উত্তরাধিকারীর গভীর আকাঙ্ক্ষা।' },
      { en: 'His wife was barren — a seemingly impossible prayer.', bn: 'স্ত্রী বন্ধ্যা — আপাতদৃষ্টে অসম্ভব দোয়া।' },
    ],
    landEn: 'Jerusalem (Levant)',
    landBn: 'জেরুজালেম (লেভান্ট)',
  },
  yahya: {
    spotlightEn: 'Yahya (AS), son of Zakariya, was given wisdom by Allah while still a child — the Quran states it simply: \u201cO Yahya, take the Scripture with determination.\u201d And so he did. He was pure, dutiful to his parents, never arrogant or disobedient. He confirmed the word of Allah — that is, he believed in Isa (AS) — and lived in devoted purity. The Quran\u2019s benediction for him is unique: \u201cPeace on him the day he was born, the day he will die, and the day he will be raised alive.\u201d Three stations — birth, death, resurrection — sealed with peace.',
    spotlightBn: 'ইয়াহইয়া (আঃ), যাকারিয়ার পুত্র, শিশু অবস্থায় আল্লাহর দেওয়া প্রজ্ঞা পেলেন। কুরআন সরলভাবে বলে: "হে ইয়াহইয়া, কিতাব দৃঢ়ভাবে ধারণ করো।" তিনি তাই করলেন। পবিত্র, পিতামাতার অনুগত, কখনো অহংকারী বা অবাধ্য নন। তিনি আল্লাহর বাণী — অর্থাৎ ঈসা (আঃ) — সত্যায়ন করেন। কুরআনের তাঁর প্রতি বন্দনা অনন্য: "তাঁর জন্মে, মৃত্যুতে ও পুনরুত্থানে শান্তি।" তিনটি স্থান — শান্তিতে মুদ্রিত।',
    signEn: 'The sign of Yahya was wisdom granted to him as a child (19:12) — a spiritual miracle: a child equipped by Allah with the knowledge, devotion, and maturity of a scholar-prophet, confirming that Allah\u2019s gifts are not bound by age.',
    signBn: 'ইয়াহইয়ার নিদর্শন ছিল শিশু অবস্থায় তাঁকে দেওয়া প্রজ্ঞা (১৯:১২) — আধ্যাত্মিক মুজিযা: আল্লাহ একটি শিশুকে আলেম-নবীর জ্ঞান, নিষ্ঠা ও পরিপক্বতা দিলেন, প্রমাণ করে আল্লাহর দান বয়সে সীমাবদ্ধ নয়।',
    signRefs: ['19:12', '3:39'],
    trials: [
      { en: 'Calling to righteousness in a corrupt society.', bn: 'দুর্নীতিগ্রস্ত সমাজে সততার দিকে আহ্বান।' },
      { en: 'Ultimately martyred for standing firm on truth.', bn: 'সত্যে অবিচলের জন্য শেষ পর্যন্ত শাহাদাত।' },
    ],
    landEn: 'Jerusalem (Levant)',
    landBn: 'জেরুজালেম (লেভান্ট)',
  },
  isa: {
    trials: [
      { en: 'Born without a father — his mother faced slander from her own people.', bn: 'পিতা ছাড়া জন্ম — মায়ের নিজ সম্প্রদায়ের কুৎসার শিকার।' },
      { en: 'His people\u2019s persistent rejection and the plot to kill him.', bn: 'সম্প্রদায়ের অবিরাম প্রত্যাখ্যান ও তাঁকে হত্যার ষড়যন্ত্র।' },
      { en: 'The Quran teaches he was raised to Allah — not killed — but misunderstood by many.', bn: 'কুরআন শেখায় তাঁকে হত্যা করা হয়নি, আল্লাহ তুলে নিয়েছেন — কিন্তু বহুজন ভুল বুঝেছে।' },
    ],
    landEn: 'Galilee, Jerusalem and the Levant',
    landBn: 'গ্যালিলি, জেরুজালেম ও লেভান্ট',
    bookEn: 'The Injil (Gospel) — revealed guidance (5:46)',
    bookBn: 'ইঞ্জিল — ওহিকৃত পথনির্দেশ (৫:৪৬)',
  },
  muhammad: {
    spotlightEn: 'Muhammad ﷺ — the Seal of the Prophets, mercy to all the worlds — was born an orphan in Mecca and raised in the faith of Ibrahim. At forty, in the Cave of Hira, Jibril came with the first revelation: \u201cRead!\u201d Over 23 years he received the complete Quran, called to tawhid under persecution, led the Hijra to Medina, established a just community, and completed the message. He was taken on the Night Journey (Isra & Mi\u02bfraj) through the heavens and met his brother prophets. His abiding miracle is the Quran itself: \u201cWe have not sent you except as a mercy to all the worlds\u201d (21:107).',
    spotlightBn: 'মুহাম্মাদ ﷺ — শেষ নবী, সমগ্র জগতের রহমত — মক্কায় এতিম হিসেবে জন্মগ্রহণ ও ইবরাহীমের বিশ্বাসে লালিত। চল্লিশে হেরা গুহায় জিবরীল প্রথম ওহি নিয়ে আসেন: "পড়ো!" ২৩ বছরে পূর্ণ কুরআন অবতীর্ণ হয়, নির্যাতনের মধ্যে তাওহিদের দাওয়াত, মদিনায় হিজরত, ন্যায় সমাজ প্রতিষ্ঠা ও বার্তা পূর্ণ। ইসরা ও মিরাজে ভ্রাতৃ নবীদের সাথে সাক্ষাৎ। তাঁর স্থায়ী মুজিযা স্বয়ং কুরআন: "তোমাকে সমগ্র জগতের জন্য রহমত হিসেবে পাঠিয়েছি।"',
    trials: [
      { en: 'Orphaned young and raised in poverty.', bn: 'ছোটবেলায় এতিম ও দারিদ্র্যে প্রতিপালন।' },
      { en: 'Thirteen years of persecution in Mecca.', bn: 'মক্কায় তেরো বছরের নির্যাতন।' },
      { en: 'The Hijra — leaving his homeland for the sake of Allah.', bn: 'হিজরত — আল্লাহর জন্য মাতৃভূমি ত্যাগ।' },
      { en: 'Bearing the responsibility of conveying guidance to all humanity.', bn: 'সমগ্র মানবজাতির কাছে পথনির্দেশ পৌঁছানোর দায়িত্ব বহন।' },
    ],
    landEn: 'Mecca and Medina (Hijaz, Arabia)',
    landBn: 'মক্কা ও মদিনা (হিজায, আরব)',
    bookEn: 'The Quran — the final and preserved revelation (2:185)',
    bookBn: 'কুরআন — চূড়ান্ত ও সংরক্ষিত ওহি (২:১৮৫)',
  },
};

/**
 * Seven cross-cutting theological themes visible across every prophet\u2019s story,
 * from Adam to Muhammad \ufdfa. Each theme lists relevant prophet ids and key refs.
 */
const PROPHETS_THEMES = [
  {
    emoji: '\u{1f4d6}',
    titleEn: 'Tawhid — the one universal message',
    titleBn: 'তাওহিদ — এক সার্বজনীন বার্তা',
    bodyEn: 'Every prophet, without exception, brought the same core call: \u201cWorship Allah alone.\u201d From Adam\u2019s first instruction to Muhammad\u2019s ﷺ final message, tawhid is the thread that binds them all. No prophet was sent to found a new religion — each renewed the one deen.',
    bodyBn: 'ব্যতিক্রম ছাড়াই প্রত্যেক নবী একই মূল আহ্বান নিয়ে আসেন: "কেবল আল্লাহর ইবাদত করো।" আদমের প্রথম নির্দেশনা থেকে মুহাম্মাদ ﷺ-এর সর্বশেষ বার্তা পর্যন্ত তাওহিদই সকলকে একসূত্রে বাঁধে। কোনো নবীই নতুন ধর্ম প্রতিষ্ঠায় আসেননি — প্রত্যেকে একই দ্বীন নবায়ন করেছেন।',
    refs: ['16:36', '21:25', '2:136'],
    prophetIds: ['adam', 'nuh', 'hud', 'salih', 'ibrahim', 'lut', 'musa', 'isa', 'muhammad'],
  },
  {
    emoji: '\u{1f54b}',
    titleEn: 'Prophets as mercy — not punishment',
    titleBn: 'নবীরা রহমত — শাস্তি নয়',
    bodyEn: 'Prophets were sent as a mercy and a guide before any punishment fell. \u201cWe never punish until We send a messenger.\u201d The mission was always to rescue people from darkness into light, not to condemn them.',
    bodyBn: 'শাস্তি নাজিলের আগেই নবীদের রহমত ও পথনির্দেশ হিসেবে পাঠানো হতো। "আমরা রাসূল না পাঠানো পর্যন্ত শাস্তি দিই না।" মিশন সবসময় মানুষকে অন্ধকার থেকে আলোতে বের করা, দণ্ড দেওয়া নয়।',
    refs: ['17:15', '21:107', '14:1'],
    prophetIds: ['nuh', 'hud', 'salih', 'shuayb', 'musa', 'muhammad'],
  },
  {
    emoji: '\u{23f3}',
    titleEn: 'Sabr — patience as the prophets\u2019 weapon',
    titleBn: 'সবর — নবীদের অস্ত্র হিসেবে ধৈর্য',
    bodyEn: 'The Quran specifically honours the Ulul-\u02bfAzm for their \u201cfirm resolve,\u201d and every prophet is praised for sabr. Patience in the Quran is not passive endurance — it is active, purposeful faithfulness in the face of hardship.',
    bodyBn: 'কুরআন বিশেষভাবে উলুল-আযমকে "দৃঢ়সংকল্পের" জন্য সম্মান দেয়, এবং প্রত্যেক নবীকে সবরের জন্য প্রশংসা করা হয়। কুরআনে ধৈর্য নিষ্ক্রিয় সহ্য নয় — কষ্টের মুখে সক্রিয়, উদ্দেশ্যমূলক বিশ্বস্ততা।',
    refs: ['46:35', '21:83-85', '39:10'],
    prophetIds: ['nuh', 'yaqub', 'ayyub', 'yunus', 'musa', 'isa', 'muhammad'],
  },
  {
    emoji: '\u{1f6aa}',
    titleEn: 'Tawbah — the open door of repentance',
    titleBn: 'তওবা — অনুশোচনার খোলা দরজা',
    bodyEn: 'From Adam\u2019s prayer in the Garden to Yunus\u2019s cry in the fish, prophetic stories model sincere repentance as the path back to Allah. \u201cAnd He is the Ever-Relenting, the Most Merciful.\u201d No matter how far one falls, the door is never closed.',
    bodyBn: 'বাগানে আদমের দোয়া থেকে মাছের পেটে ইউনুসের আহাজারি পর্যন্ত নবীদের কাহিনিগুলো সত্যিকারের তওবাকে আল্লাহর কাছে ফেরার পথ হিসেবে দেখায়। "তিনি সর্বদা ক্ষমাশীল, পরম দয়ালু।" যত দূরেই পড়ে যাও, দরজা কখনো বন্ধ হয় না।',
    refs: ['7:23', '21:87', '28:16', '2:37'],
    prophetIds: ['adam', 'nuh', 'yunus', 'musa', 'dawud'],
  },
  {
    emoji: '\u2728',
    titleEn: 'Miracles as divine proof — not magic',
    titleBn: 'মুজিযা — দৈব প্রমাণ, যাদু নয়',
    bodyEn: 'Every prophetic miracle was given by Allah, at Allah\u2019s command, as a sign (aya) for the people of that time and place. They were not tricks or performances — they confirmed the messenger\u2019s truthfulness. \u201cAnd We sent not a messenger except with clear proofs.\u201d',
    bodyBn: 'প্রতিটি নবুয়তি মুজিযা আল্লাহর দেওয়া, আল্লাহর আদেশে, সেই সময় ও স্থানের মানুষের জন্য নিদর্শন (আয়াত)। এগুলো কৌশল বা প্রদর্শনী ছিল না — রাসূলের সত্যবাদিতা নিশ্চিত করত। "আমি স্পষ্ট প্রমাণ ছাড়া কোনো রাসূল পাঠাইনি।"',
    refs: ['17:59', '3:49', '40:78'],
    prophetIds: ['musa', 'isa', 'salih', 'nuh', 'ibrahim', 'sulayman'],
  },
  {
    emoji: '\u{1f6ab}',
    titleEn: 'The pattern of opposition',
    titleBn: 'প্রতিরোধের প্যাটার্ন',
    bodyEn: 'In every era the same pattern emerged: the powerful and the wealthy led the rejection; the humble and the poor were first to believe. The opponents always said: \u201cYou are only a man like us.\u201d Yet the truth always outlasted every palace.',
    bodyBn: 'প্রতিটি যুগে একই প্যাটার্ন দেখা যায়: ক্ষমতাবান ও ধনীরা প্রত্যাখ্যান নেতৃত্ব দিত; বিনয়ী ও দরিদ্ররা প্রথম ঈমান আনত। বিরোধীরা সবসময় বলত: "তুমি আমাদের মতো একজন মানুষ মাত্র।" তবু সত্য সব প্রাসাদকে টিকিয়ে রেখেছে।',
    refs: ['11:27', '7:75-76', '36:15'],
    prophetIds: ['nuh', 'hud', 'salih', 'ibrahim', 'shuayb', 'musa', 'isa', 'muhammad'],
  },
  {
    emoji: '\u{1f468}\u200d\u{1f469}\u200d\u{1f466}',
    titleEn: 'Family trials — prophets as human beings',
    titleBn: 'পারিবারিক পরীক্ষা — মানব হিসেবে নবীগণ',
    bodyEn: 'Prophets were human, and their closest trials came through family. Nuh\u2019s son refused the Ark; Ibrahim\u2019s father rejected him; Lut\u2019s wife stayed behind; Ya\u02bfqub\u2019s sons deceived him. Proximity to a prophet does not guarantee guidance — only faith does.',
    bodyBn: 'নবীরা মানুষ ছিলেন, আর তাঁদের ঘনিষ্ঠতম পরীক্ষা পরিবারের মাধ্যমে এসেছে। নূহের পুত্র নৌকায় উঠতে অস্বীকার করে; ইবরাহীমের পিতা তাঁকে প্রত্যাখ্যান করেন; লূতের স্ত্রী পিছনে থাকেন; ইয়াকুবের পুত্ররা তাঁকে প্রতারণা করে। নবীর নিকটে থাকা পথনির্দেশের নিশ্চয়তা দেয় না — কেবল ঈমানই দেয়।',
    refs: ['11:45-46', '60:4', '12:8', '66:10'],
    prophetIds: ['nuh', 'ibrahim', 'lut', 'yaqub', 'yusuf'],
  },
];

/**
 * Authentic hadith in which the Prophet \ufdfa spoke of his brother prophets.
 * Sources: Sahih al-Bukhari and Sahih Muslim only.
 * All translations are paraphrased glosses, not full renderings.
 */
const PROPHETS_HADITH = [
  {
    pid: 'ibrahim',
    sourceEn: 'Sahih al-Bukhari 3394',
    sourceBn: 'সহিহ বুখারি ৩৩৯৪',
    glossEn: 'On the Night Journey, the Prophet \ufdfa said: \u201cI saw Ibrahim and of all people he looks most like me.\u201d',
    glossBn: 'মিরাজের রাতে নবী \ufdfa বললেন: "আমি ইবরাহীমকে দেখলাম, সব মানুষের মধ্যে সে আমার মতো দেখতে।"',
  },
  {
    pid: 'isa',
    sourceEn: 'Sahih al-Bukhari 3442',
    sourceBn: 'সহিহ বুখারি ৩৪৪২',
    glossEn: '\u201cI am the nearest of all people to Isa son of Maryam in this world and the Hereafter. The prophets are brothers from different mothers; their religion is one.\u201d',
    glossBn: '"আমি ইহকাল ও পরকালে সকল মানুষের মধ্যে মারইয়ামের পুত্র ঈসার সবচেয়ে নিকটবর্তী। নবীরা একই মায়ের ভিন্ন পুত্রের মতো ভাই; তাঁদের দ্বীন এক।"',
  },
  {
    pid: 'musa',
    sourceEn: 'Sahih Muslim 2375',
    sourceBn: 'সহিহ মুসলিম ২৩৭৫',
    glossEn: 'The Prophet \ufdfa said: \u201cI passed by Musa on the Night of the Journey, and he was standing praying in his grave.\u201d',
    glossBn: 'নবী \ufdfa বললেন: "মিরাজের রাতে আমি মূসার পাশ দিয়ে গেলাম, তিনি তাঁর কবরে দাঁড়িয়ে নামাজ পড়ছিলেন।"',
  },
  {
    pid: 'yusuf',
    sourceEn: 'Sahih Muslim 162',
    sourceBn: 'সহিহ মুসলিম ১৬২',
    glossEn: 'On the Night Journey, the Prophet \ufdfa said of Yusuf: \u201cHe was given half of [all] beauty.\u201d',
    glossBn: 'মিরাজের রাতে নবী \ufdfa ইউসুফ সম্পর্কে বললেন: "তাকে [সকল] সৌন্দর্যের অর্ধেক দেওয়া হয়েছে।"',
  },
  {
    pid: 'dawud',
    sourceEn: 'Sahih al-Bukhari 1131',
    sourceBn: 'সহিহ বুখারি ১১৩১',
    glossEn: '\u201cThe most beloved fasting to Allah is the fasting of Dawud: he fasted every other day. The most beloved night prayer to Allah is the prayer of Dawud: he slept half the night, prayed a third, then slept a sixth.\u201d',
    glossBn: '"আল্লাহর কাছে সবচেয়ে প্রিয় রোজা হলো দাউদের রোজা: তিনি একদিন পর পর রোজা রাখতেন। আল্লাহর কাছে সবচেয়ে প্রিয় রাত্রির নামাজ হলো দাউদের নামাজ: তিনি অর্ধরাত ঘুমাতেন, এক-তৃতীয়াংশ নামাজ পড়তেন, পরে এক-ষষ্ঠাংশ ঘুমাতেন।"',
  },
  {
    pid: 'sulayman',
    sourceEn: 'Sahih al-Bukhari 1189',
    sourceBn: 'সহিহ বুখারি ১১৮৯',
    glossEn: 'The Prophet \ufdfa mentioned Sulayman\u2019s du\u02bca for a kingdom granted to no one after him, saying: \u201cSulayman asked for three things; he was granted two and I hope [the third] was also granted.\u201d',
    glossBn: 'নবী \ufdfa সুলাইমানের সেই দোয়ার কথা উল্লেখ করেন যেখানে তিনি অতুলনীয় রাজত্ব চেয়েছিলেন। বললেন: "সুলাইমান তিনটি জিনিস চেয়েছিলেন; দুটি পেয়েছিলেন এবং আশা করি [তৃতীয়টিও] পেয়েছিলেন।"',
  },
  {
    pid: 'nuh',
    sourceEn: 'Sahih al-Bukhari 4712',
    sourceBn: 'সহিহ বুখারি ৪৭১২',
    glossEn: 'In the hadith of intercession, Nuh is described as the first rasul Allah sent to the people of the earth — and on the Day of Judgment people will come to him seeking his intercession.',
    glossBn: 'শাফাআতের হাদিসে নূহকে আল্লাহর পাঠানো পৃথিবীর প্রথম রাসূল হিসেবে বর্ণনা করা হয় — কিয়ামতের দিন মানুষ তাঁর কাছে শাফাআত চাইতে আসবে।',
  },
  {
    pid: 'ayyub',
    sourceEn: 'Sahih al-Bukhari 5645',
    sourceBn: 'সহিহ বুখারি ৫৬৪৫',
    glossEn: '\u201cThe most severely tested of people are the prophets, then those most like them, then the next.\u201d (Ayyub\u2019s trial is cited as the supreme example of patient endurance.)',
    glossBn: '"মানুষের মধ্যে সবচেয়ে কঠিন পরীক্ষায় পড়েন নবীরা, তারপর যারা তাদের মতো, তারপর পরের স্তর।" (আইয়ুবের পরীক্ষা ধৈর্যশীল সহনশীলতার সর্বোচ্চ উদাহরণ হিসেবে উদ্ধৃত।)',
  },
  {
    pid: 'yunus',
    sourceEn: 'Sunan al-Tirmidhi 3505 (hasan sahih)',
    sourceBn: 'সুনান আত-তিরমিযি ৩৫০৫ (হাসান সহিহ)',
    glossEn: '\u201cWhoever is afflicted with grief or sorrow and says [the du\u02bca of Yunus: La ilaha illa anta, subhanaka, inni kuntu min al-zalimin], Allah will relieve him of his grief and sorrow.\u201d',
    glossBn: '"যে ব্যক্তি দুঃখ বা কষ্টে পড়ে [ইউনুসের দোয়া: লা ইলাহা ইল্লা আনতা সুবহানাকা ইন্নি কুনতু মিনায-যালিমিন] পড়ে, আল্লাহ তার দুঃখ ও কষ্ট দূর করবেন।"',
  },
  {
    pid: 'adam',
    sourceEn: 'Sahih al-Bukhari 6227',
    sourceBn: 'সহিহ বুখারি ৬২২৭',
    glossEn: '\u201cAllah created Adam sixty cubits [in height]. Whoever enters Paradise will be in the form of Adam.\u201d (A reminder of the honour Allah placed in the human form from its very first creation.)',
    glossBn: '"আল্লাহ আদমকে সৃষ্টি করেছেন ষাট হাত উচ্চতায়। যে জান্নাতে প্রবেশ করবে সে আদমের আকৃতিতে থাকবে।" (আল্লাহ প্রথম সৃষ্টি থেকেই মানব রূপে যে সম্মান রেখেছেন তার স্মারক।)',
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
  {
    emoji: '\u{1f6ab}',
    titleEn: 'The pattern of rejection', titleBn: 'প্রত্যাখ্যানের প্যাটার্ন',
    bodyEn: 'In every era, the powerful and wealthy led the rejection while the humble were first to believe. The opponents always said: "You are only a man like us; if Allah had willed He would have sent an angel." Truth always outlasted the palaces of those who denied it.',
    bodyBn: 'প্রতিটি যুগে ক্ষমতাবান ও ধনীরা প্রত্যাখ্যানের নেতৃত্ব দিত, আর বিনয়ীরা প্রথম ঈমান আনত। বিরোধীরা সবসময় বলত: "তুমি আমাদের মতো মানুষ মাত্র।" সত্য সব প্রাসাদকে টিকিয়ে রেখেছে।',
    refs: ['11:27', '7:75-76'],
  },
  {
    emoji: '\u{1f468}\u200d\u{1f469}\u200d\u{1f466}',
    titleEn: 'Family trials of the prophets', titleBn: 'নবীদের পারিবারিক পরীক্ষা',
    bodyEn: 'Even the closest family members of prophets were tested. Nuh\u02bcs son refused the Ark; Ibrahim\u02bcs father rejected him; Lut\u02bcs wife stayed behind; Ya\u02bfqub lost Yusuf to his sons\u02bc jealousy. Nearness to a prophet does not guarantee guidance — only faith does.',
    bodyBn: 'নবীদের ঘনিষ্ঠ পরিজনও পরীক্ষিত হয়েছেন। নূহের পুত্র নৌকায় উঠতে অস্বীকার করে; ইবরাহীমের পিতা তাঁকে প্রত্যাখ্যান করেন; লূতের স্ত্রী পিছনে থাকেন; ইয়াকুব পুত্রদের ঈর্ষায় ইউসুফকে হারান। নবীর নিকটে থাকা পথনির্দেশের নিশ্চয়তা দেয় না।',
    refs: ['11:45-46', '60:4'],
  },
  {
    emoji: '\u2705',
    titleEn: 'The victory of truth', titleBn: 'সত্যের বিজয়',
    bodyEn: 'In every prophetic story, truth ultimately prevails. The lofty palaces of those who denied are gone; the names of the prophets are still recited in prayer and praise until this day. "Allah will surely help those who help His cause; indeed Allah is Powerful and Mighty." (22:40)',
    bodyBn: 'প্রতিটি নবুয়তি কাহিনিতে সত্য শেষ পর্যন্ত জয়ী হয়। অস্বীকারকারীদের সুউচ্চ প্রাসাদ অদৃশ্য; নবীদের নাম আজও দোয়া ও প্রশংসায় উচ্চারিত। "আল্লাহ অবশ্যই তাদের সাহায্য করবেন যারা তাঁর পথে সাহায্য করে; নিশ্চয়ই আল্লাহ শক্তিশালী ও পরাক্রমশালী।" (২২:৪০)',
    refs: ['22:40', '40:51'],
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
  { pid: 'lut', ref: '26:169',
    glossEn: '"My Lord, save me and my family from what they do."',
    glossBn: '"হে আমার প্রভু, আমাকে ও আমার পরিবারকে তারা যা করে তা থেকে রক্ষা করুন।"' },
  { pid: 'ibrahim', ref: '14:35',
    glossEn: '"My Lord, make this city secure and keep me and my sons from worshipping idols."',
    glossBn: '"হে আমার প্রভু, এই শহরকে নিরাপদ করুন এবং আমাকে ও আমার পুত্রদের মূর্তিপূজা থেকে দূরে রাখুন।"' },
  { pid: 'musa', ref: '7:155',
    glossEn: '"My Lord, if You had willed, You could have destroyed them before and me as well. Will You destroy us for what the foolish among us have done? This is only Your trial: You misguide by it whom You will and guide whom You will. You are our Protector, so forgive us and have mercy on us — You are the best of forgivers."',
    glossBn: '"হে আমার প্রভু, ইচ্ছা করলে আপনি আগেই তাদের ও আমাকে ধ্বংস করতে পারতেন। আমাদের মধ্যকার নির্বোধদের কাজের জন্য কি আপনি আমাদের ধ্বংস করবেন? এটি কেবল আপনার পরীক্ষা। আপনিই আমাদের অভিভাবক — ক্ষমা করুন ও রহম করুন, আপনিই সর্বোত্তম ক্ষমাকারী।"' },
  { pid: 'dawud', ref: '38:24',
    glossEn: '"My Lord, forgive me." (Dawud\u02bcs repentance after recognising the parable in the dispute brought to him.)',
    glossBn: '"হে আমার প্রভু, আমাকে ক্ষমা করুন।" (তাঁর কাছে উপস্থাপিত বিবাদে দৃষ্টান্ত বুঝতে পেরে দাউদের তওবা।)' },
  { pid: 'isa', ref: '5:114',
    glossEn: '"O Allah, our Lord, send down to us a table [spread with food] from the sky to be a festival for us — for the first and last of us — and a sign from You. Provide for us; You are the best of providers."',
    glossBn: '"হে আল্লাহ, আমাদের প্রভু, আমাদের জন্য আকাশ থেকে একটি দস্তরখান নাযিল করুন যা আমাদের — আমাদের আগের ও পরের সবার — জন্য উৎসব হবে এবং আপনার পক্ষ থেকে নিদর্শন। আমাদের রিজিক দিন, আপনিই সর্বোত্তম রিজিকদাতা।"' },
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
  prophets_lineage_view_list: { en: 'List', bn: 'তালিকা' },
  prophets_lineage_view_tree: { en: 'Tree', bn: 'বৃক্ষ' },
  prophets_where_title: { en: 'Where in the Quran', bn: 'কুরআনে কোথায়' },
  prophets_where_hint: { en: 'Surahs most associated with this prophet — tap to open.', bn: 'এই নবীর সাথে সর্বাধিক সম্পর্কিত সূরা — খুলতে ট্যাপ করুন।' },
  prophets_where_passages: { en: 'passages', bn: 'অংশ' },
  prophets_compare_title: { en: 'Compare two prophets', bn: 'দুই নবীর তুলনা' },
  prophets_compare_intro: { en: 'Pick any two prophets to compare their rank, people, and era side by side.', bn: 'যেকোনো দুই নবী বেছে নিয়ে তাঁদের মর্যাদা, সম্প্রদায় ও যুগ পাশাপাশি তুলনা করুন।' },
  prophets_compare_rank: { en: 'Rank', bn: 'মর্যাদা' },
  prophets_compare_swap: { en: 'Swap', bn: 'অদলবদল' },
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
  prophets_label_trials: { en: 'Key Trials', bn: 'গুরুত্বপূর্ণ পরীক্ষাসমূহ' },
  prophets_label_land: { en: 'Land & Region', bn: 'ভূমি ও অঞ্চল' },
  prophets_label_book: { en: 'Scripture Given', bn: 'প্রদত্ত কিতাব' },
  prophets_themes_title: { en: 'Cross-Prophet Themes', bn: 'নবীদের অনুসরণে বিষয়াবলি' },
  prophets_themes_intro: { en: 'Seven recurring threads that run through every prophet’s story, from Adam to Muhammad ﷺ.', bn: 'আদম থেকে মুহাম্মাদ ࿟a-এর প্রত্যেক নবীর কাহিনিতে সাতটি পুনরাবৃত্তিমূলক সূত্র।' },
  prophets_hadith_title: { en: 'The Prophets in Hadith', bn: 'হাদিসে নবীগণ' },
  prophets_hadith_intro: { en: 'Authentic reports in which the Prophet ﷺ spoke of his brother prophets — from Sahih al-Bukhari and Sahih Muslim.', bn: 'বিশুদ্ধ বর্ণনা যেখানে নবী ࿟a ভ্রাতৃ নবীদের সম্পর্কে কথা বলেছেন — সহিহ বুখারি ও সহিহ মুসলিম থেকে।' },
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
    this.treeView = 'list';   // lineage panel: 'list' | 'tree' (aniconic box tree)
    this.cmpA = 'musa';       // compare mini-view: left prophet id
    this.cmpB = 'ibrahim';    // compare mini-view: right prophet id

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
    if (e) {
      if (this.language && e[this.language]) return e[this.language];
      if (this.language === 'bn') return e.bn || e.en;
      if (this.language && this.language !== 'en' && typeof CI18N !== 'undefined' && e.en) {
        const tr = CI18N.tr(this.language, e.en); if (tr) return tr;
      }
      return e.en;
    }
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
        ${this.prophetsThemesHtml()}
        ${this.hadithHtml()}
        ${this.lineageHtml()}
        ${this.compareHtml()}
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
    if (this.selected) this.renderDetailInline();
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
          </li>
          <div class="prophet-detail-${this.esc(p.id)} mx-6"></div>`;
        }).join('')}
      </ol>`;
  }

  gridHtml(items) {
    return `
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        ${items.map(p => {
          const isRead = this.read.has(p.id);
          return `
          <div class="contents">
          <button type="button" data-prophets-open="${this.esc(p.id)}"
            class="group text-left relative rounded-xl bg-white dark:bg-gray-800 border ${isRead ? 'border-green-300 dark:border-green-800' : 'border-gray-200 dark:border-gray-700'} p-4 hover:border-primary hover:shadow-md transition-all overflow-hidden">
            <span class="absolute top-2 end-2 text-primary/15 group-hover:text-primary/30 transition-colors">${this.starAccent('w-8 h-8')}</span>
            <span class="inline-flex items-center justify-center w-7 h-7 rounded-full ${isRead ? 'bg-green-500 text-white' : 'bg-primary/10 text-primary'} text-xs font-bold mb-2" aria-hidden="true">${p.order}</span>
            <div class="text-2xl font-arabic text-primary mb-1" dir="rtl" lang="ar">${this.esc(p.ar)}</div>
            <div class="font-bold text-gray-800 dark:text-gray-100">${this.esc(p.translit)} ${isRead ? '<span class="text-green-500 text-xs align-middle">✓</span>' : ''}</div>
            <div class="text-xs text-gray-400 dark:text-gray-500 mb-2">${this.esc(this.lc(p))}</div>
            <div class="flex flex-wrap gap-1">${this.badges(p, true)}</div>
          </button>
          <div class="prophet-detail-${this.esc(p.id)} col-span-full"></div>
          </div>`;
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

  // Localized rank label (Nabi / Rasul, plus Ulul-'Azm) from existing data.
  rankLabel(p) {
    const base = p.rank === 'rasul' ? this.tt('prophets_badge_rasul') : this.tt('prophets_badge_nabi');
    return p.ululAzm ? base + ' · ' + this.tt('prophets_badge_ululazm') : base;
  }

  // Compare two prophets side by side — rank, people, era — all from existing
  // data. Reuses the two <select> dropdowns; no new content strings.
  compareHtml() {
    const opts = (sel) => PROPHETS_DATA.map(p =>
      `<option value="${this.esc(p.id)}" ${p.id === sel ? 'selected' : ''}>${this.esc(this.pname(p.id))}</option>`).join('');
    const a = PROPHETS_DATA.find(x => x.id === this.cmpA) || PROPHETS_DATA[0];
    const b = PROPHETS_DATA.find(x => x.id === this.cmpB) || PROPHETS_DATA[1];
    const rowLabel = (txt) => `<div class="text-[0.65rem] uppercase tracking-wide text-gray-400 dark:text-gray-500 font-semibold text-center py-1">${this.esc(txt)}</div>`;
    const cellPair = (va, vb) => `
      <div class="text-sm text-gray-700 dark:text-gray-200 text-center px-2 py-1.5 rounded-lg bg-gray-50 dark:bg-gray-900/40" dir="auto">${this.esc(va)}</div>
      <div class="text-sm text-gray-700 dark:text-gray-200 text-center px-2 py-1.5 rounded-lg bg-gray-50 dark:bg-gray-900/40" dir="auto">${this.esc(vb)}</div>`;
    const head = (p) => `
      <div class="text-center">
        <div class="text-2xl font-arabic text-primary" dir="rtl" lang="ar">${this.esc(p.ar)}</div>
        <div class="font-bold text-gray-800 dark:text-gray-100 text-sm">${this.esc(this.pname(p.id))}</div>
      </div>`;
    return `
      <div class="mt-8">
        <h3 class="text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">⚖️ ${this.esc(this.tt('prophets_compare_title'))}</h3>
        <p class="text-xs text-gray-400 dark:text-gray-500 mb-3" dir="auto">${this.esc(this.tt('prophets_compare_intro'))}</p>
        <div class="rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4">
          <div class="grid grid-cols-2 gap-2 mb-3">
            <select data-prophets-cmp="a" class="w-full text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 px-2 py-2">${opts(this.cmpA)}</select>
            <select data-prophets-cmp="b" class="w-full text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 px-2 py-2">${opts(this.cmpB)}</select>
          </div>
          <div class="flex justify-center mb-3">
            <button type="button" data-prophets-cmp-swap class="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-primary transition-colors">⇄ ${this.esc(this.tt('prophets_compare_swap'))}</button>
          </div>
          <div class="grid grid-cols-2 gap-2 mb-2">${head(a)}${head(b)}</div>
          ${rowLabel(this.tt('prophets_compare_rank'))}
          <div class="grid grid-cols-2 gap-2 mb-1">${cellPair(this.rankLabel(a), this.rankLabel(b))}</div>
          ${rowLabel(this.tt('prophets_label_nation'))}
          <div class="grid grid-cols-2 gap-2 mb-1">${cellPair(this.loc(a, 'nation'), this.loc(b, 'nation'))}</div>
          ${rowLabel(this.tt('prophets_label_era'))}
          <div class="grid grid-cols-2 gap-2">${cellPair(this.loc(a, 'era'), this.loc(b, 'era'))}</div>
        </div>
      </div>`;
  }

  // Abstract, text-only lineage tree (names + connective lines; no figures).
  lineageListHtml() {
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
      </div>`;
  }

  // Aniconic geometric family tree: boxes + connector lines only, NO figures.
  // Adam → Nuh → Ibrahim → (Isma'il → the Arabs → Muhammad ﷺ | Ishaq → Ya'qub
  // → the Bani-Israil prophets). Pure text/box/line — reuses existing name data.
  lineageTreeHtml() {
    const box = (label, tone) => {
      const cls = tone === 'final'
        ? 'border-green-500/50 bg-green-500/10 text-green-700 dark:text-green-300'
        : tone === 'muted'
          ? 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/40 text-gray-500 dark:text-gray-400'
          : 'border-primary/40 bg-primary/5 text-primary';
      return `<div class="inline-flex items-center px-3 py-1.5 rounded-lg border-2 ${cls} text-xs font-semibold whitespace-nowrap" dir="auto">${this.esc(label)}</div>`;
    };
    const vline = () => `<div class="w-0.5 h-4 bg-gray-300 dark:bg-gray-600" aria-hidden="true"></div>`;
    const branchCol = (inner) => `<div class="flex flex-col items-center gap-1">${inner}</div>`;
    const baniIds = ['yusuf', 'musa', 'harun', 'dawud', 'sulayman', 'zakariya', 'yahya', 'isa'];
    const baniBoxes = baniIds.map(id => `<div class="inline-flex items-center px-2 py-1 rounded-md border border-primary/30 bg-white dark:bg-gray-800 text-primary text-[0.7rem] font-medium whitespace-nowrap" dir="auto">${this.esc(this.pname(id))}</div>`).join('');
    return `
      <div class="flex flex-col items-center gap-1 text-center min-w-[20rem] py-2">
        ${box(this.pname('adam') + ' (AS)')}
        ${vline()}
        ${box(this.pname('nuh') + ' (AS)')}
        ${vline()}
        ${box(this.pname('ibrahim') + ' (AS)')}
        <div class="relative w-full pt-4 mt-1">
          <div class="absolute top-0 left-1/4 right-1/4 h-0.5 bg-gray-300 dark:bg-gray-600" aria-hidden="true"></div>
          <div class="absolute top-0 left-1/4 -ml-px w-0.5 h-4 bg-gray-300 dark:bg-gray-600" aria-hidden="true"></div>
          <div class="absolute top-0 right-1/4 -mr-px w-0.5 h-4 bg-gray-300 dark:bg-gray-600" aria-hidden="true"></div>
          <div class="grid grid-cols-2 gap-3">
            ${branchCol(`
              ${box(this.pname('ismail') + ' (AS)')}
              ${vline()}
              ${box(this.tt('prophets_lineage_arabs'), 'muted')}
              ${vline()}
              ${box(this.pname('muhammad') + ' ﷺ', 'final')}
            `)}
            ${branchCol(`
              ${box(this.pname('ishaq') + ' (AS)')}
              ${vline()}
              ${box(this.pname('yaqub') + ' · ' + this.tt('prophets_lineage_israel') + ' (AS)')}
              ${vline()}
              <div class="text-[0.65rem] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">${this.esc(this.tt('prophets_lineage_bani'))}</div>
              <div class="flex flex-wrap justify-center gap-1">${baniBoxes}</div>
            `)}
          </div>
        </div>
      </div>`;
  }

  lineageHtml() {
    const toggle = ['list', 'tree'].map(v => {
      const active = this.treeView === v;
      const label = v === 'list' ? this.tt('prophets_lineage_view_list') : this.tt('prophets_lineage_view_tree');
      const icon = v === 'list' ? '☰' : '🌳';
      return `<button type="button" data-prophets-tree="${v}"
        class="px-3 py-1 rounded-lg text-xs font-medium transition-colors ${active
          ? 'bg-primary text-white'
          : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-primary'}">
        <span aria-hidden="true">${icon}</span> ${this.esc(label)}</button>`;
    }).join('');
    return `
      <div class="mt-8">
        <div class="flex items-center justify-between gap-2 flex-wrap mb-1">
          <h3 class="text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">🌿 ${this.esc(this.tt('prophets_lineage_title'))}</h3>
          <div class="flex items-center gap-1">${toggle}</div>
        </div>
        <p class="text-xs text-gray-400 dark:text-gray-500 mb-3" dir="auto">${this.esc(this.tt('prophets_lineage_intro'))}</p>
        <div class="rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 overflow-x-auto">
          ${this.treeView === 'tree' ? this.lineageTreeHtml() : this.lineageListHtml()}
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

  // "Where in the Quran" — group a prophet's EXISTING verified refs by surah,
  // show the surah name + how many of his passages fall there, as tappable pills
  // that open the first ayah. No new refs — reuses p.refs only.
  whereHtml(p) {
    const refs = Array.isArray(p.refs) ? p.refs : [];
    if (!refs.length) return '';
    const bySurah = [];
    const idx = {};
    refs.forEach(r => {
      const surah = parseInt(String(r).split(':')[0], 10);
      if (!Number.isFinite(surah)) return;
      if (idx[surah] == null) {
        idx[surah] = bySurah.length;
        bySurah.push({ surah, count: 0, firstRef: r });
      }
      bySurah[idx[surah]].count++;
    });
    if (!bySurah.length) return '';
    // Most-associated first (by passage count), keeping stable order otherwise.
    bySurah.sort((a, b) => b.count - a.count);
    const pills = bySurah.map(g => `<button type="button" data-prophets-ayah="${this.esc(this.openRef(g.firstRef))}"
        class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 text-xs font-medium hover:bg-indigo-500 hover:text-white transition-colors" dir="auto">
        📍 ${this.esc(this.surahName(g.surah))} <span class="opacity-70">(${g.surah})</span>
        <span class="px-1 rounded bg-indigo-500/15 text-[0.65rem]">${g.count} ${this.esc(this.tt('prophets_where_passages'))}</span></button>`).join('');
    return `
      <div class="mb-4">
        <h3 class="text-sm font-bold text-gray-700 dark:text-gray-200 mb-1 flex items-center gap-1.5">📍 ${this.esc(this.tt('prophets_where_title'))}</h3>
        <p class="text-[0.7rem] text-gray-400 dark:text-gray-500 mb-2" dir="auto">${this.esc(this.tt('prophets_where_hint'))}</p>
        <div class="flex flex-wrap gap-1.5">${pills}</div>
      </div>`;
  }

  renderDetailInline() {
    const p = PROPHETS_DATA.find(x => x.id === this.selected);
    if (!p) return;
    const isRead = this.read.has(p.id);
    const el = this.container ? this.container.querySelector('.prophet-detail-' + p.id) : null;
    if (!el) return;
    const _depth = (typeof PROPHETS_DEPTH !== 'undefined' && PROPHETS_DEPTH) ? (PROPHETS_DEPTH[p.id] || {}) : {};

    const events = Array.isArray(p.events) ? p.events : [];
    const eventsHtml = events.length ? `
      <div class="mb-4">
        <h3 class="text-sm font-bold text-gray-700 dark:text-gray-200 mb-2 flex items-center gap-1.5">◆ ${this.esc(this.tt('prophets_label_events'))}</h3>
        <ul class="space-y-1.5">
          ${events.map(ev => `<li class="flex gap-2 text-sm text-gray-600 dark:text-gray-300" dir="auto"><span class="text-primary mt-0.5 shrink-0" aria-hidden="true">▸</span><span class="flex-1">${this.esc(this.lc(ev))}</span></li>`).join('')}
        </ul>
      </div>` : '';


    const _trials = Array.isArray(_depth.trials) ? _depth.trials : [];
    const trialsHtml = _trials.length ? `
      <div class="mb-4">
        <h3 class="text-sm font-bold text-gray-700 dark:text-gray-200 mb-2 flex items-center gap-1.5">\u2696\ufe0f ${this.esc(this.tt('prophets_label_trials'))}</h3>
        <ul class="space-y-1.5">
          ${_trials.map(tr => `<li class="flex gap-2 text-sm text-gray-600 dark:text-gray-300" dir="auto"><span class="text-amber-500 mt-0.5 shrink-0" aria-hidden="true">\u25b8</span><span class="flex-1">${this.esc(this.lc(tr))}</span></li>`).join('')}
        </ul>
      </div>` : '';

    const _land = this.lc({en: _depth.landEn, bn: _depth.landBn});
    const _book = this.lc({en: _depth.bookEn, bn: _depth.bookBn});
    const landCellHtml = _land ? `<div class="p-2.5 rounded-lg bg-gray-50 dark:bg-gray-900/40"><div class="text-[0.65rem] uppercase tracking-wide text-gray-400 dark:text-gray-500 font-semibold">${this.esc(this.tt('prophets_label_land'))}</div><div class="text-sm text-gray-700 dark:text-gray-200" dir="auto">${this.esc(_land)}</div></div>` : '';
    const bookCellHtml = _book ? `<div class="p-2.5 rounded-lg bg-gray-50 dark:bg-gray-900/40"><div class="text-[0.65rem] uppercase tracking-wide text-gray-400 dark:text-gray-500 font-semibold">${this.esc(this.tt('prophets_label_book'))}</div><div class="text-sm text-gray-700 dark:text-gray-200" dir="auto">${this.esc(_book)}</div></div>` : '';
    const spotlight = this.loc(p, 'spotlight') || this.lc({en: _depth.spotlightEn, bn: _depth.spotlightBn});
    const spotlightHtml = spotlight ? `
      <div class="mb-4 p-3.5 rounded-xl bg-primary/5 border border-primary/20">
        <h3 class="text-sm font-bold text-primary mb-1.5 flex items-center gap-1.5">✧ ${this.esc(this.tt('prophets_label_spotlight'))}</h3>
        <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed" dir="auto">${this.esc(spotlight)}</p>
      </div>` : '';

    const sign = this.loc(p, 'sign') || this.lc({en: _depth.signEn, bn: _depth.signBn});
    const signRefs = (Array.isArray(p.signRefs) && p.signRefs.length) ? p.signRefs : (Array.isArray(_depth.signRefs) ? _depth.signRefs : []);
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

    el.innerHTML = `
      <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden mb-4">
        <div class="relative p-5 bg-gradient-to-br from-primary/10 to-transparent">
          <button type="button" data-prophets-close="${this.esc(p.id)}"
            class="absolute top-3 end-3 inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-500 hover:text-primary hover:bg-white dark:hover:bg-gray-700 shadow-sm transition-colors z-10" title="Close">
            ✕
          </button>
          <div class="flex items-center gap-2">
            <span class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/15 text-primary text-xs font-bold" aria-hidden="true">${p.order}</span>
            <span class="text-xs text-gray-400 dark:text-gray-500">#${p.order} ${this.esc(this.tt('prophets_of'))} ${PROPHETS_DATA.length}</span>
          </div>
        </div>

        <div class="p-5">
          <div class="mb-4 p-2.5 rounded-lg bg-gray-50 dark:bg-gray-900/40 inline-block">
            <div class="text-[0.65rem] uppercase tracking-wide text-gray-400 dark:text-gray-500 font-semibold">${this.esc(this.tt('prophets_label_era'))}</div>
            <div class="text-sm text-gray-700 dark:text-gray-200" dir="auto">${this.esc(this.loc(p, 'era'))}</div>
          </div>

          <div class="mb-4">
            <h3 class="text-sm font-bold text-gray-700 dark:text-gray-200 mb-2 flex items-center gap-1.5">✦ ${this.esc(this.tt('prophets_label_story'))}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed" dir="auto">${this.esc(this.loc(p, 'summary'))}</p>
          </div>

          ${spotlightHtml}
          ${eventsHtml}
          ${trialsHtml}
          ${_land || _book ? `<div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">${landCellHtml}${bookCellHtml}</div>` : ''}
          ${signHtml}
          ${refsHtml}
          ${this.whereHtml(p)}

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
      </div>`;

    try { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); } catch (_) { /* ignore */ }
  }

  // ── events ───────────────────────────────────────────────────────────
  bind() {
    if (this._bound) return;
    this._bound = true;

    this.container.addEventListener('click', (e) => {
      try {
        const back = e.target.closest('[data-prophets-back]');
        if (back) {
          this.selected = null;
          try { this.container.querySelector('[data-prophets-list]')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); } catch (_) {}
          return;
        }

        const close = e.target.closest('[data-prophets-close]');
        if (close) { this.selected = null; this.render(); return; }

        const open = e.target.closest('[data-prophets-open]');
        if (open) { this.selected = open.getAttribute('data-prophets-open'); this.render(); return; }

        const viewBtn = e.target.closest('[data-prophets-view]');
        if (viewBtn) { this.view = viewBtn.getAttribute('data-prophets-view'); this.render(); return; }

        const groupBtn = e.target.closest('[data-prophets-group]');
        if (groupBtn) { this.grouped = !this.grouped; this.render(); return; }

        const treeBtn = e.target.closest('[data-prophets-tree]');
        if (treeBtn) { this.treeView = treeBtn.getAttribute('data-prophets-tree'); this.render(); return; }

        const cmpSwap = e.target.closest('[data-prophets-cmp-swap]');
        if (cmpSwap) { const tmp = this.cmpA; this.cmpA = this.cmpB; this.cmpB = tmp; this.render(); return; }

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

    this.container.addEventListener('change', (e) => {
      try {
        const cmp = e.target.closest ? e.target.closest('[data-prophets-cmp]') : null;
        if (cmp) {
          const which = cmp.getAttribute('data-prophets-cmp');
          if (which === 'a') this.cmpA = cmp.value; else this.cmpB = cmp.value;
          this.render();
        }
      } catch (_) { /* ignore */ }
    });
  }

  scrollTop() {
    try { if (this.container && this.container.scrollIntoView) this.container.scrollIntoView({ block: 'start' }); } catch (_) { /* ignore */ }
  }

  toggleRead(id) {
    if (this.read.has(id)) this.read.delete(id); else this.read.add(id);
    this.saveRead();
    if (this.selected === id) { this.renderDetailInline(); }
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

  prophetsThemesHtml() {
    if (typeof PROPHETS_THEMES === 'undefined' || !PROPHETS_THEMES || !PROPHETS_THEMES.length) return '';
    return `
      <div class="mt-8">
        <h3 class="text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">\u{1f9f5} ${this.esc(this.tt('prophets_themes_title'))}</h3>
        <p class="text-xs text-gray-400 dark:text-gray-500 mb-3" dir="auto">${this.esc(this.tt('prophets_themes_intro'))}</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          ${PROPHETS_THEMES.map(th => `
            <div class="rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4">
              <div class="flex items-center gap-2 mb-1.5">
                <span class="text-lg" aria-hidden="true">${th.emoji}</span>
                <span class="font-bold text-gray-800 dark:text-gray-100 text-sm">${this.esc(this.lc({en: th.titleEn, bn: th.titleBn}))}</span>
              </div>
              <p class="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-2" dir="auto">${this.esc(this.lc({en: th.bodyEn, bn: th.bodyBn}))}</p>
              <div class="flex flex-wrap gap-1.5">
                ${(th.refs || []).map(r => `<button type="button" data-prophets-ayah="${this.esc(this.openRef(r))}"
                  class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[0.7rem] font-medium hover:bg-primary hover:text-white transition-colors" dir="auto">\u{1f4d6} ${this.esc(this.refLabel(r))}</button>`).join('')}
              </div>
              ${(th.prophetIds || []).length ? `<div class="flex flex-wrap gap-1 mt-2">${(th.prophetIds).map(id => `<span class="px-1.5 py-0.5 rounded bg-primary/10 text-primary text-[0.6rem] font-medium">${this.esc(this.pname(id))}</span>`).join('')}</div>` : ''}
            </div>`).join('')}
        </div>
      </div>`;
  }

  hadithHtml() {
    if (typeof PROPHETS_HADITH === 'undefined' || !PROPHETS_HADITH || !PROPHETS_HADITH.length) return '';
    return `
      <div class="mt-8">
        <h3 class="text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">\u{1f4dc} ${this.esc(this.tt('prophets_hadith_title'))}</h3>
        <p class="text-xs text-gray-400 dark:text-gray-500 mb-3" dir="auto">${this.esc(this.tt('prophets_hadith_intro'))}</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          ${PROPHETS_HADITH.map(h => `
            <div class="rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 flex flex-col gap-2">
              <div class="flex items-center justify-between gap-2">
                <span class="font-bold text-gray-800 dark:text-gray-100 text-sm">${this.esc(this.pname(h.pid))}</span>
                <span class="text-[0.65rem] text-gray-400 dark:text-gray-500 whitespace-nowrap" dir="auto">${this.esc(this.lc({en: h.sourceEn, bn: h.sourceBn}))}</span>
              </div>
              <p class="text-xs text-gray-600 dark:text-gray-300 leading-relaxed italic" dir="auto">${this.esc(this.lc({en: h.glossEn, bn: h.glossBn}))}</p>
            </div>`).join('')}
        </div>
      </div>`;
  }
}

let prophetsView;
document.addEventListener('DOMContentLoaded', () => { try { prophetsView = new ProphetsView(); } catch (_) { /* ignore */ } });
