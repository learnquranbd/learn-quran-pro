/**
 * Why Islam? — an educational Da'wah & Aqidah (creed) module presenting the
 * reasoned case for Islam in the mainstream Sunni scholarly tradition, and
 * answering common sincere questions charitably and respectfully.
 *
 * Content is INLINE and bilingual (en + bn per item); other UI languages fall
 * back to English. Renders into #why-islam-container (tab "whyislam"). Tone is
 * calm, academic and respectful: it makes the positive intellectual case for
 * Islam and engages ideas, never demeaning any religion or its followers.
 *
 * Six browsable topics -> detail views: Existence of God, Oneness of God,
 * Prophethood of Muhammad (peace be upon him), The Quran, Common Questions
 * (accordion Q&A), and Further Study (curated reputable links). Includes topic
 * search and per-topic "mark as read" progress (localStorage lq_whyislam_read).
 *
 * Mirrors js/resources.js integration: global whyIslamView on DOMContentLoaded,
 * listens for tabChanged (whyislam) and settingChanged (language). Defensive
 * throughout — guards DOM, localStorage and JSON; never throws.
 */

/* Inline fallback UI strings so the module renders standalone even before the
 * orchestrator wires these keys into translations.js. */
const WHY_ISLAM_I18N = {
  whyislam_subtitle: {
    en: 'A calm, reasoned introduction to the case for Islam — and honest answers to sincere questions.',
    bn: 'ইসলামের যৌক্তিক পরিচিতি — এবং আন্তরিক প্রশ্নের সৎ উত্তর, শান্ত ও পাণ্ডিত্যপূর্ণ ভঙ্গিতে।',
  },
  whyislam_search_placeholder: { en: 'Search topics and questions…', bn: 'বিষয় ও প্রশ্ন খুঁজুন…' },
  whyislam_back: { en: 'All topics', bn: 'সব বিষয়' },
  whyislam_mark_read: { en: 'Mark as read', bn: 'পড়া হয়েছে চিহ্নিত করুন' },
  whyislam_marked_read: { en: 'Read', bn: 'পড়া হয়েছে' },
  whyislam_progress: { en: 'read', bn: 'পড়া হয়েছে' },
  whyislam_no_results: { en: 'No topics match your search.', bn: 'আপনার অনুসন্ধানে কোনো বিষয় মেলেনি।' },
  whyislam_note: {
    en: 'This section explains the Islamic position and its reasoning. It is meant to inform and invite reflection, with respect for everyone.',
    bn: 'এই অংশে ইসলামের অবস্থান ও তার যুক্তি ব্যাখ্যা করা হয়েছে। উদ্দেশ্য জ্ঞান দেওয়া ও চিন্তায় আমন্ত্রণ জানানো, সবার প্রতি শ্রদ্ধা রেখে।',
  },
  whyislam_disclaimer: {
    en: 'Educational overview in the mainstream Sunni tradition. For detailed rulings and study, consult qualified scholars and the further-study resources.',
    bn: 'মূলধারার সুন্নি ঐতিহ্যে একটি শিক্ষামূলক পরিচিতি। বিস্তারিত জানতে যোগ্য আলিম ও নিচের অধ্যয়ন-উৎসের সাহায্য নিন।',
  },
  whyislam_read_more: { en: 'Read topic', bn: 'বিষয়টি পড়ুন' },
  whyislam_open_link: { en: 'Visit', bn: 'দেখুন' },
  whyislam_shahada_label: { en: 'The Testimony of Faith (Shahada)', bn: 'ঈমানের সাক্ষ্য (শাহাদাহ)' },
  whyislam_embrace_welcome: {
    en: 'This is an informational explanation, offered gently and without any pressure. In Islam, becoming a Muslim is a free and personal choice (Quran 2:256 — "There shall be no compulsion in religion"). Take your time to learn and reflect.',
    bn: 'এটি একটি তথ্যমূলক ব্যাখ্যা, কোমলভাবে ও কোনো চাপ ছাড়াই উপস্থাপিত। ইসলামে মুসলিম হওয়া একটি স্বাধীন ও ব্যক্তিগত সিদ্ধান্ত (কুরআন ২:২৫৬—"দ্বীনের ব্যাপারে কোনো জবরদস্তি নেই")। শেখা ও চিন্তার জন্য সময় নিন।',
  },
  whyislam_objections_note: {
    en: 'Each objection is stated fairly first, then answered. The aim is to engage the arguments honestly — never to disparage anyone who holds them.',
    bn: 'প্রতিটি আপত্তি প্রথমে ন্যায্যভাবে উপস্থাপন করা হয়েছে, তারপর উত্তর দেওয়া হয়েছে। উদ্দেশ্য যুক্তির সাথে সৎ সংলাপ—যাঁরা এই আপত্তি রাখেন তাঁদের কাউকে ছোট করা নয়।',
  },
  whyislam_comparative_note: {
    en: 'This compares ideas and concepts of God — describing what Islam affirms and why. It is offered with respect for other faith communities and is not a criticism of any people.',
    bn: 'এটি ধারণা ও ঈশ্বর-কল্পনার তুলনা করে—ইসলাম কী নিশ্চিত করে ও কেন, তা বর্ণনা করে। এটি অন্যান্য ধর্মসম্প্রদায়ের প্রতি শ্রদ্ধা রেখে উপস্থাপিত, কোনো মানুষের সমালোচনা নয়।',
  },
  whyislam_dialogue_note: {
    en: 'Guidance on inviting others with wisdom, gentleness and respect — and without any compulsion.',
    bn: 'প্রজ্ঞা, কোমলতা ও শ্রদ্ধার সাথে—এবং কোনো জবরদস্তি ছাড়াই—অন্যকে আমন্ত্রণ জানানোর নির্দেশনা।',
  },
  whyislam_glossary_note: {
    en: 'Short introductory definitions. Each term carries much more depth in the scholarly tradition.',
    bn: 'সংক্ষিপ্ত পরিচিতিমূলক সংজ্ঞা। প্রতিটি পরিভাষা শাস্ত্রীয় ঐতিহ্যে আরও অনেক গভীরতা বহন করে।',
  },
  whyislam_stories_note: {
    en: 'A general note, shared respectfully — journeys of faith are personal, and no pressure is intended.',
    bn: 'একটি সাধারণ নোট, শ্রদ্ধার সাথে উপস্থাপিত—ঈমানের যাত্রা ব্যক্তিগত, এবং কোনো চাপ উদ্দিষ্ট নয়।',
  },
  whyislam_misconceptions_note: {
    en: 'Each item states a sincere misconception fairly, then clarifies it. The aim is honest understanding — never to mock or blame anyone who holds it.',
    bn: 'প্রতিটি অংশে একটি আন্তরিক ভুল ধারণা প্রথমে ন্যায্যভাবে উপস্থাপন করা হয়েছে, তারপর তা স্পষ্ট করা হয়েছে। উদ্দেশ্য সৎ বোঝাপড়া—যিনি এমন ধারণা রাখেন তাঁকে উপহাস বা দোষারোপ করা কখনোই নয়।',
  },
  whyislam_next_note: {
    en: 'These are gentle suggestions only, offered without any pressure. Go at your own pace, and follow whichever step feels right for you.',
    bn: 'এগুলো কেবল কোমল পরামর্শ, কোনো চাপ ছাড়াই উপস্থাপিত। নিজের গতিতে এগোন, এবং যে পদক্ষেপ আপনার কাছে উপযুক্ত মনে হয় তা-ই অনুসরণ করুন।',
  },
  whyislam_quiz_title:    { en: 'Quiz', bn: 'কুইজ' },
  whyislam_quiz_intro:    { en: 'Test your knowledge of the core topics covered in this module.', bn: 'এই মডিউলের মূল বিষয়গুলি সম্পর্কে আপনার জ্ঞান পরীক্ষা করুন।' },
  whyislam_quiz_score:    { en: 'Your score', bn: 'আপনার স্কোর' },
  whyislam_quiz_best:     { en: 'Best', bn: 'সেরা' },
  whyislam_quiz_submit:   { en: 'Check answers', bn: 'উত্তর দেখুন' },
  whyislam_quiz_retake:   { en: 'Try again', bn: 'আবার চেষ্টা করুন' },
  whyislam_quiz_hint:     { en: 'Answer all questions to submit', bn: 'জমা দিতে সব প্রশ্নের উত্তর দিন' },
};

const WHY_ISLAM_DATA = [
  {
    id: 'existence',
    emoji: '🌌',
    kind: 'article',
    title: { en: 'The Existence of God', bn: 'আল্লাহর অস্তিত্ব' },
    summary: {
      en: 'Four classical lines of reasoning: the innate disposition (fitrah), cause, order and morality.',
      bn: 'চারটি ধ্রুপদী যুক্তি: সহজাত প্রকৃতি (ফিতরাহ), কারণ, শৃঙ্খলা ও নৈতিকতা।',
    },
    points: [
      {
        heading: { en: 'The innate disposition (fitrah)', bn: 'সহজাত প্রকৃতি (ফিতরাহ)' },
        body: {
          en: 'Islam teaches that human beings are created with a natural inclination to recognise their Creator. In times of genuine need or awe, many people instinctively turn to a higher power. The Quran describes this original disposition: "So direct your face toward the religion, inclining to truth — the fitrah of Allah upon which He created people" (Quran 30:30). This is offered not as proof by itself, but as an invitation to notice a deep and widely shared human intuition.',
          bn: 'ইসলাম শেখায় যে মানুষ তার স্রষ্টাকে চেনার এক সহজাত প্রবণতা নিয়ে সৃষ্ট। প্রকৃত প্রয়োজন বা বিস্ময়ের মুহূর্তে বহু মানুষ সহজাতভাবে এক মহাশক্তির দিকে ঝুঁকে পড়ে। কুরআন এই মৌলিক প্রকৃতির কথা বলে: "তুমি একনিষ্ঠভাবে নিজেকে দ্বীনের প্রতি প্রতিষ্ঠিত রাখো—আল্লাহর সেই ফিতরাহ, যার উপর তিনি মানুষকে সৃষ্টি করেছেন" (কুরআন ৩০:৩০)। এটি নিজে কোনো প্রমাণ নয়, বরং এক গভীর ও ব্যাপকভাবে অনুভূত মানবিক অন্তর্দৃষ্টির প্রতি আমন্ত্রণ।',
        },
      },
      {
        heading: { en: 'The argument from a cause (kalam)', bn: 'কারণ থেকে যুক্তি (কালাম)' },
        body: {
          en: 'Classical Muslim theologians (the mutakallimun, e.g. al-Ghazali) argued: whatever begins to exist has a cause; the universe began to exist; therefore the universe has a cause — one that is itself uncaused, powerful and beyond time and space. The Quran points to the same reflection: "Or were they created by nothing, or were they the creators [of themselves]?" (Quran 52:35). The argument does not claim to describe God fully; it reasons that a beginning points beyond itself.',
          bn: 'ধ্রুপদী মুসলিম ধর্মতাত্ত্বিকগণ (মুতাকাল্লিমুন, যেমন ইমাম গাজ্জালি) যুক্তি দিয়েছেন: যা কিছুর সূচনা আছে তার একটি কারণ আছে; বিশ্বজগতের সূচনা আছে; সুতরাং বিশ্বজগতের একটি কারণ আছে—এমন এক কারণ যা নিজে অনাদি, ক্ষমতাবান এবং কাল-স্থানের ঊর্ধ্বে। কুরআন একই চিন্তার দিকে ইঙ্গিত করে: "তারা কি স্রষ্টা ছাড়াই সৃষ্টি হয়েছে, নাকি তারাই স্রষ্টা?" (কুরআন ৫২:৩৫)। এই যুক্তি আল্লাহকে পূর্ণভাবে বর্ণনার দাবি করে না; বরং বলে যে সূচনা নিজের বাইরে কিছুর দিকে ইশারা করে।',
        },
      },
      {
        heading: { en: 'The argument from order and design', bn: 'শৃঙ্খলা ও নকশা থেকে যুক্তি' },
        body: {
          en: 'The universe displays remarkable order and finely balanced conditions that allow life to exist. Islam invites us to read this order as a sign of a wise Designer rather than blind accident: "Who created seven heavens in layers. You do not see in the creation of the Most Merciful any inconsistency. So return your vision — do you see any breaks?" (Quran 67:3). This is presented as reasoned reflection on nature, not as a substitute for science.',
          bn: 'বিশ্বজগতে রয়েছে অসাধারণ শৃঙ্খলা এবং জীবনের অনুকূল সূক্ষ্মভাবে ভারসাম্যপূর্ণ অবস্থা। ইসলাম আমন্ত্রণ জানায় এই শৃঙ্খলাকে অন্ধ দুর্ঘটনা নয়, বরং এক প্রজ্ঞাময় স্রষ্টার নিদর্শন হিসেবে পড়তে: "যিনি স্তরে স্তরে সাত আকাশ সৃষ্টি করেছেন। পরম দয়াময়ের সৃষ্টিতে তুমি কোনো অসামঞ্জস্য দেখবে না। আবার তাকিয়ে দেখো—কোনো ফাটল কি চোখে পড়ে?" (কুরআন ৬৭:৩)। এটি প্রকৃতির উপর যুক্তিসংগত অনুধ্যান, বিজ্ঞানের বিকল্প নয়।',
        },
      },
      {
        heading: { en: 'The moral argument', bn: 'নৈতিক যুক্তি' },
        body: {
          en: 'Most people sense that some things — justice, honesty, compassion — are genuinely good, and cruelty genuinely wrong, not merely as personal opinion. Islam holds that such objective moral truths make most sense if they are grounded in a wise and just Creator who is their source. This does not claim non-believers cannot be moral; it asks where the binding weight of "ought" ultimately comes from.',
          bn: 'অধিকাংশ মানুষ অনুভব করে যে কিছু জিনিস—ন্যায়, সততা, দয়া—প্রকৃতপক্ষেই ভালো, আর নিষ্ঠুরতা প্রকৃতপক্ষেই মন্দ, নিছক ব্যক্তিগত মত হিসেবে নয়। ইসলামের অভিমত, এমন বস্তুনিষ্ঠ নৈতিক সত্য সবচেয়ে ভালোভাবে অর্থবহ হয় যদি তা এক প্রজ্ঞাময় ও ন্যায়বান স্রষ্টায় প্রোথিত থাকে, যিনি এদের উৎস। এতে অবিশ্বাসীরা নৈতিক হতে পারে না—এমন দাবি নেই; বরং প্রশ্ন হলো "উচিত"-এর বাধ্যতামূলক ভার চূড়ান্তভাবে কোথা থেকে আসে।',
        },
      },
    ],
  },
  {
    id: 'tawhid',
    emoji: '☝️',
    kind: 'article',
    title: { en: 'The Oneness of God (Tawhid)', bn: 'আল্লাহর একত্ব (তাওহিদ)' },
    summary: {
      en: 'The single message of every prophet, its three dimensions, and why pure monotheism is coherent.',
      bn: 'প্রত্যেক নবীর একই বার্তা, এর তিনটি দিক, এবং কেন বিশুদ্ধ একত্ববাদ যুক্তিসংগত।',
    },
    points: [
      {
        heading: { en: 'One consistent message', bn: 'একই ধারাবাহিক বার্তা' },
        body: {
          en: 'The Quran presents tawhid — worship of the one God alone — as the shared core of every prophet from Adam to Muhammad (peace be upon them): "And We sent not before you any messenger except that We revealed to him that there is no deity except Me, so worship Me" (Quran 21:25). The declaration of faith, "La ilaha illa Allah" (there is no god but God), captures this centre.',
          bn: 'কুরআন তাওহিদকে—কেবল এক আল্লাহর ইবাদত—আদম থেকে মুহাম্মাদ (তাঁদের প্রতি শান্তি) পর্যন্ত প্রত্যেক নবীর অভিন্ন মূল বার্তা হিসেবে উপস্থাপন করে: "আমি তোমার পূর্বে এমন কোনো রাসুল পাঠাইনি, যাঁর প্রতি আমি এই ওহি করিনি যে, আমি ছাড়া কোনো ইলাহ নেই, সুতরাং আমারই ইবাদত করো" (কুরআন ২১:২৫)। ঈমানের ঘোষণা "লা ইলাহা ইল্লাল্লাহ" (আল্লাহ ছাড়া কোনো উপাস্য নেই) এই কেন্দ্রকেই ধারণ করে।',
        },
      },
      {
        heading: { en: 'Three dimensions of tawhid', bn: 'তাওহিদের তিন দিক' },
        body: {
          en: 'Scholars introduce tawhid in three related aspects: (1) Lordship (rububiyyah) — God alone creates, sustains and governs; (2) Worship (uluhiyyah) — God alone deserves to be worshipped and turned to; and (3) Names and Attributes (asma wa sifat) — God is described only as He described Himself, without likening Him to creation. Together these mean the Creator is utterly unique and alone worthy of devotion.',
          bn: 'আলিমগণ তাওহিদকে তিনটি সম্পর্কিত দিকে পরিচয় করান: (১) রুবুবিয়্যাহ (প্রভুত্ব)—কেবল আল্লাহই সৃষ্টি করেন, রক্ষণাবেক্ষণ করেন ও পরিচালনা করেন; (২) উলুহিয়্যাহ (ইবাদত)—কেবল আল্লাহই ইবাদতের ও আশ্রয়ের যোগ্য; এবং (৩) আসমা ওয়া সিফাত (নাম ও গুণাবলি)—আল্লাহকে কেবল সেভাবেই বর্ণনা করা হয় যেভাবে তিনি নিজেকে বর্ণনা করেছেন, সৃষ্টির সাথে তুলনা ছাড়াই। একত্রে এর অর্থ, স্রষ্টা সম্পূর্ণ অনন্য এবং একমাত্র তিনিই ইবাদতের যোগ্য।',
        },
      },
      {
        heading: { en: 'Why pure monotheism is coherent', bn: 'কেন বিশুদ্ধ একত্ববাদ সুসংগত' },
        body: {
          en: 'The Quran offers a rational reflection on unity: "Had there been within them [the heavens and earth] gods besides Allah, they both would have been ruined" (Quran 21:22). A single, ultimate source gives the universe its consistency and unified laws; competing ultimate powers would introduce conflict. Pure monotheism keeps the object of worship simple, unlimited and free of contradiction — the essence expressed in Surah al-Ikhlas (Quran 112).',
          bn: 'কুরআন একত্ব নিয়ে এক যুক্তিসংগত অনুধ্যান দেয়: "যদি আকাশ ও পৃথিবীতে আল্লাহ ছাড়া আরও উপাস্য থাকত, তবে উভয়ই বিশৃঙ্খল হয়ে যেত" (কুরআন ২১:২২)। একক, চূড়ান্ত উৎস বিশ্বজগতকে দেয় সামঞ্জস্য ও অভিন্ন নিয়ম; প্রতিদ্বন্দ্বী চূড়ান্ত শক্তিরা দ্বন্দ্ব আনত। বিশুদ্ধ একত্ববাদ ইবাদতের লক্ষ্যকে রাখে সরল, অসীম ও দ্বন্দ্বমুক্ত—যার সারকথা সুরা আল-ইখলাসে (কুরআন ১১২)।',
        },
      },
    ],
  },
  {
    id: 'prophethood',
    emoji: '🕌',
    kind: 'article',
    title: { en: 'The Prophethood of Muhammad ﷺ', bn: 'মুহাম্মাদ ﷺ-এর নবুয়ত' },
    summary: {
      en: 'His trusted character, the unlettered messenger, deep reforms, and continuity with earlier prophets.',
      bn: 'তাঁর বিশ্বস্ত চরিত্র, নিরক্ষর রাসুল, গভীর সংস্কার এবং পূর্ববর্তী নবীদের সাথে ধারাবাহিকতা।',
    },
    points: [
      {
        heading: { en: 'A trusted character (al-Amin)', bn: 'বিশ্বস্ত চরিত্র (আল-আমিন)' },
        body: {
          en: 'Even before prophethood, the people of Makkah knew Muhammad (peace be upon him) as al-Amin, "the trustworthy," and al-Sadiq, "the truthful," entrusting him with their valuables. Someone consistently honest with people, who then conveyed a message calling to truth and moral discipline at great personal cost, invites us to weigh his sincerity seriously.',
          bn: 'নবুয়তের আগেও মক্কার মানুষ মুহাম্মাদ (তাঁর প্রতি শান্তি)-কে চিনত আল-আমিন "বিশ্বস্ত" ও আস-সাদিক "সত্যবাদী" নামে, এবং তাঁর কাছে নিজেদের মূল্যবান জিনিস আমানত রাখত। মানুষের সাথে যিনি সর্বদা সৎ ছিলেন, এবং যিনি ব্যক্তিগত বড় মূল্য দিয়েও সত্য ও নৈতিক শৃঙ্খলার আহ্বান পৌঁছে দিয়েছেন—তাঁর আন্তরিকতাকে গুরুত্বসহকারে বিবেচনা করতে এটি আমন্ত্রণ জানায়।',
        },
      },
      {
        heading: { en: 'An unlettered messenger', bn: 'একজন নিরক্ষর রাসুল' },
        body: {
          en: 'Islamic sources describe the Prophet as unlettered (ummi) — he did not read or write: "Those who follow the Messenger, the unlettered prophet…" (Quran 7:157). That a person without formal learning conveyed a text of such linguistic power and coherent teaching is, in the Islamic view, a sign that its source is divine rather than personal authorship.',
          bn: 'ইসলামি উৎস নবীকে বর্ণনা করে নিরক্ষর (উম্মি) হিসেবে—তিনি পড়তে বা লিখতে জানতেন না: "যারা অনুসরণ করে সেই রাসুলের, উম্মি নবীর…" (কুরআন ৭:১৫৭)। প্রাতিষ্ঠানিক শিক্ষা ছাড়া একজন মানুষ এমন ভাষিক শক্তি ও সুসংগত শিক্ষাসম্পন্ন এক গ্রন্থ পৌঁছে দিয়েছেন—ইসলামের দৃষ্টিতে এটি এই ইঙ্গিত দেয় যে এর উৎস ব্যক্তিগত রচনা নয়, বরং ঐশী।',
        },
      },
      {
        heading: { en: 'Deep moral and social reform', bn: 'গভীর নৈতিক ও সামাজিক সংস্কার' },
        body: {
          en: 'In a single generation his message transformed a society: ending the burying of infant girls, curbing tribal vengeance, protecting the rights of the poor, orphans and slaves, and uniting warring tribes under justice and mercy. The scale and speed of this ethical reform is, historically, remarkable and central to his mission.',
          bn: 'এক প্রজন্মের মধ্যেই তাঁর বার্তা একটি সমাজকে বদলে দেয়: কন্যাশিশু জীবন্ত সমাধিস্থ করা বন্ধ, গোত্রীয় প্রতিশোধ নিয়ন্ত্রণ, দরিদ্র-এতিম-দাসের অধিকার রক্ষা, এবং যুদ্ধরত গোত্রগুলোকে ন্যায় ও দয়ার অধীনে ঐক্যবদ্ধ করা। এই নৈতিক সংস্কারের বিস্তার ও গতি ঐতিহাসিকভাবে অসাধারণ এবং তাঁর মিশনের কেন্দ্রবিন্দু।',
        },
      },
      {
        heading: { en: 'Continuity with earlier prophets', bn: 'পূর্ববর্তী নবীদের সাথে ধারাবাহিকতা' },
        body: {
          en: 'Islam sees Muhammad (peace be upon him) not as founding a new religion but as completing the one message brought by Noah, Abraham, Moses and Jesus (peace be upon them): call to the one God, uprightness, and accountability. The Quran honours these prophets and asks believers to make no distinction between them (Quran 2:285). This continuity is presented as a mark of authenticity, not novelty.',
          bn: 'ইসলাম মুহাম্মাদ (তাঁর প্রতি শান্তি)-কে দেখে নতুন কোনো ধর্মের প্রতিষ্ঠাতা হিসেবে নয়, বরং নূহ, ইব্রাহিম, মূসা ও ঈসা (তাঁদের প্রতি শান্তি) আনীত সেই একই বার্তার পূর্ণতাদানকারী হিসেবে: এক আল্লাহর প্রতি আহ্বান, সততা ও জবাবদিহিতা। কুরআন এই নবীদের সম্মান করে এবং বিশ্বাসীদের বলে তাঁদের মধ্যে কোনো পার্থক্য না করতে (কুরআন ২:২৮৫)। এই ধারাবাহিকতাকে উপস্থাপন করা হয় প্রামাণিকতার চিহ্ন হিসেবে, নতুনত্বের নয়।',
        },
      },
    ],
  },
  {
    id: 'quran',
    emoji: '📖',
    kind: 'article',
    title: { en: 'The Quran', bn: 'আল-কুরআন' },
    summary: {
      en: 'Its preservation, its open literary challenge, its internal consistency, and its guidance.',
      bn: 'এর সংরক্ষণ, উন্মুক্ত সাহিত্যিক চ্যালেঞ্জ, অভ্যন্তরীণ সামঞ্জস্য এবং হিদায়াত।',
    },
    points: [
      {
        heading: { en: 'Its preservation', bn: 'এর সংরক্ষণ' },
        body: {
          en: 'From the beginning the Quran has been preserved in two ways together: memorised in full by huge numbers of people (the huffaz) in every generation, and written down and carefully transmitted. The Quran states this care: "Indeed, it is We who sent down the Reminder, and indeed, We will be its guardian" (Quran 15:9). The living oral tradition alongside the manuscript record is a distinctive feature of its transmission.',
          bn: 'শুরু থেকেই কুরআন দুইভাবে একসাথে সংরক্ষিত হয়ে এসেছে: প্রতি প্রজন্মে বিপুলসংখ্যক মানুষের (হাফিজ) দ্বারা সম্পূর্ণ মুখস্থ, এবং লিপিবদ্ধ হয়ে যত্নসহকারে হস্তান্তরিত। কুরআন এই যত্নের কথা বলে: "নিশ্চয়ই আমিই এই উপদেশ (কুরআন) অবতীর্ণ করেছি এবং আমিই এর সংরক্ষক" (কুরআন ১৫:৯)। পাণ্ডুলিপির পাশাপাশি জীবন্ত মৌখিক ধারা এর হস্তান্তরের এক স্বতন্ত্র বৈশিষ্ট্য।',
        },
      },
      {
        heading: { en: 'An open literary challenge (i‘jaz)', bn: 'উন্মুক্ত সাহিত্যিক চ্যালেঞ্জ (ইজাজ)' },
        body: {
          en: 'The Quran issues a standing challenge to those who doubt its source: to produce even a single chapter like it — "And if you are in doubt about what We have sent down… then produce a surah the like thereof" (Quran 2:23). Classical Arab critics, masters of the language, acknowledged its distinctive eloquence. The claim of i‘jaz (inimitability) is a literary and linguistic argument, offered to the reader to weigh, not a coercion.',
          bn: 'যারা এর উৎস নিয়ে সন্দেহ করে, কুরআন তাদের প্রতি এক স্থায়ী চ্যালেঞ্জ রাখে: এর মতো একটিমাত্র সুরা রচনা করে আনতে—"আমি আমার বান্দার প্রতি যা অবতীর্ণ করেছি তাতে যদি তোমরা সন্দেহে থাকো, তবে এর অনুরূপ একটি সুরা রচনা করে আনো" (কুরআন ২:২৩)। ভাষার পারদর্শী ধ্রুপদী আরব সমালোচকগণও এর স্বতন্ত্র অলংকারিত্ব স্বীকার করেছেন। ইজাজ (অননুকরণীয়তা)-র এই দাবি এক সাহিত্যিক ও ভাষিক যুক্তি, পাঠকের বিবেচনার জন্য উপস্থাপিত—কোনো জবরদস্তি নয়।',
        },
      },
      {
        heading: { en: 'Internal consistency', bn: 'অভ্যন্তরীণ সামঞ্জস্য' },
        body: {
          en: 'Revealed piecemeal over about twenty-three years, across changing and difficult circumstances, the Quran maintains a unified message and voice. It draws attention to this itself: "Then do they not reflect upon the Quran? If it had been from other than Allah, they would have found within it much contradiction" (Quran 4:82). Coherence across such a span is presented as a sign worth reflecting on.',
          bn: 'প্রায় তেইশ বছর ধরে, পরিবর্তনশীল ও কঠিন পরিস্থিতির মধ্যে ধাপে ধাপে অবতীর্ণ হয়েও কুরআন এক অভিন্ন বার্তা ও স্বর ধরে রাখে। এটি নিজেই এদিকে দৃষ্টি আকর্ষণ করে: "তবে কি তারা কুরআন নিয়ে চিন্তা করে না? যদি তা আল্লাহ ছাড়া অন্য কারও কাছ থেকে হতো, তবে তারা এতে অনেক অসংগতি পেত" (কুরআন ৪:৮২)। এত দীর্ঘ পরিসরে এই সামঞ্জস্যকে উপস্থাপন করা হয় চিন্তার যোগ্য এক নিদর্শন হিসেবে।',
        },
      },
      {
        heading: { en: 'A book of guidance', bn: 'হিদায়াতের গ্রন্থ' },
        body: {
          en: 'Above all the Quran presents itself as guidance for living — "This is the Book about which there is no doubt, a guidance for those conscious of God" (Quran 2:2). Its main concern is not to catalogue scientific facts but to nurture God-consciousness, justice, gratitude and good character. Muslims are encouraged to read it thoughtfully and let its counsel be tested in a sincere life.',
          bn: 'সর্বোপরি কুরআন নিজেকে উপস্থাপন করে জীবনযাপনের পথনির্দেশ হিসেবে—"এই সেই কিতাব, যাতে কোনো সন্দেহ নেই; মুত্তাকিদের জন্য হিদায়াত" (কুরআন ২:২)। এর মূল উদ্দেশ্য বৈজ্ঞানিক তথ্যের তালিকা নয়, বরং আল্লাহ-সচেতনতা, ন্যায়, কৃতজ্ঞতা ও উত্তম চরিত্র গড়ে তোলা। মুসলিমদের উৎসাহ দেওয়া হয় একে মনোযোগসহ পড়তে এবং এর উপদেশকে আন্তরিক জীবনে যাচাই করতে।',
        },
      },
    ],
  },
  {
    id: 'purpose',
    emoji: '🧭',
    kind: 'article',
    title: { en: 'The Purpose of Life & the Human Condition', bn: 'জীবনের উদ্দেশ্য ও মানব-অবস্থা' },
    summary: {
      en: 'Why we are here, the test of this life, our trust and dignity, and where the heart finds rest.',
      bn: 'আমরা কেন এখানে, এই জীবনের পরীক্ষা, আমাদের আমানত ও মর্যাদা, এবং হৃদয় কোথায় প্রশান্তি পায়।',
    },
    points: [
      {
        heading: { en: 'Why are we here?', bn: 'আমরা কেন এখানে?' },
        body: {
          en: 'Islam answers the question of purpose directly: we exist to know and worship our Creator. "And I did not create the jinn and mankind except to worship Me" (Quran 51:56). Worship here is broader than ritual — it is a whole life lived with awareness of God, in gratitude, honesty and service. Purpose is therefore not something we must invent alone, but a relationship we are invited into.',
          bn: 'ইসলাম উদ্দেশ্যের প্রশ্নের সরাসরি উত্তর দেয়: আমরা আমাদের স্রষ্টাকে জানতে ও তাঁর ইবাদত করতে বিদ্যমান। "আমি জিন ও মানুষকে কেবল আমার ইবাদতের জন্যই সৃষ্টি করেছি" (কুরআন ৫১:৫৬)। এখানে ইবাদত আচার-অনুষ্ঠানের চেয়ে ব্যাপক—এটি আল্লাহ-সচেতনতা, কৃতজ্ঞতা, সততা ও সেবায় ভরা এক সম্পূর্ণ জীবন। তাই উদ্দেশ্য এমন কিছু নয় যা আমাদের একা উদ্ভাবন করতে হবে, বরং এক সম্পর্ক যাতে আমাদের আমন্ত্রণ জানানো হয়েছে।',
        },
      },
      {
        heading: { en: 'This life as a meaningful test', bn: 'এই জীবন এক অর্থবহ পরীক্ষা' },
        body: {
          en: 'Islam frames earthly life as a temporary and meaningful trial: "[He] who created death and life to test which of you is best in deed" (Quran 67:2). Our struggles, choices and responsibilities are not random; they carry weight precisely because they are part of a test whose results matter beyond this world. This gives both hardship and effort a deeper significance.',
          bn: 'ইসলাম পার্থিব জীবনকে উপস্থাপন করে এক অস্থায়ী ও অর্থবহ পরীক্ষা হিসেবে: "যিনি মৃত্যু ও জীবন সৃষ্টি করেছেন, তোমাদের মধ্যে কে কর্মে উত্তম তা পরীক্ষা করতে" (কুরআন ৬৭:২)। আমাদের সংগ্রাম, পছন্দ ও দায়িত্ব এলোমেলো নয়; এগুলো ভার বহন করে ঠিক এ কারণেই যে তা এমন এক পরীক্ষার অংশ, যার ফলাফল এই জগতের বাইরেও গুরুত্বপূর্ণ। এটি কষ্ট ও প্রচেষ্টা—উভয়কেই গভীরতর তাৎপর্য দেয়।',
        },
      },
      {
        heading: { en: 'Dignity, trust and stewardship', bn: 'মর্যাদা, আমানত ও দায়িত্ব' },
        body: {
          en: 'The human being is given honour and a trust (amanah): to act with justice and care on earth as a steward (khalifah) — "Indeed, I will make upon the earth a successive authority" (Quran 2:30). With dignity comes responsibility toward God, other people, and the world. Human weakness is acknowledged honestly, but so is our capacity for good.',
          bn: 'মানুষকে দেওয়া হয়েছে সম্মান ও এক আমানত: পৃথিবীতে ন্যায় ও যত্নের সাথে খলিফা (প্রতিনিধি) হিসেবে কাজ করা—"আমি পৃথিবীতে একজন প্রতিনিধি সৃষ্টি করব" (কুরআন ২:৩০)। মর্যাদার সাথে আসে আল্লাহ, অন্য মানুষ ও পৃথিবীর প্রতি দায়িত্ব। মানুষের দুর্বলতা সততার সাথে স্বীকার করা হয়, তবে আমাদের কল্যাণের সামর্থ্যও।',
        },
      },
      {
        heading: { en: 'Where the heart finds rest', bn: 'হৃদয় কোথায় প্রশান্তি পায়' },
        body: {
          en: 'Islam teaches that lasting contentment comes not only from possessions or status but from connection with God: "Unquestionably, by the remembrance of Allah hearts are assured" (Quran 13:28). Meaning, gratitude and inner peace are presented as fruits of a life oriented toward its Creator and lived in service to others.',
          bn: 'ইসলাম শেখায় যে স্থায়ী প্রশান্তি কেবল সম্পদ বা মর্যাদা থেকে নয়, বরং আল্লাহর সাথে সংযোগ থেকে আসে: "জেনে রাখো, আল্লাহর স্মরণেই হৃদয় প্রশান্তি লাভ করে" (কুরআন ১৩:২৮)। অর্থ, কৃতজ্ঞতা ও অন্তরের শান্তি—এগুলোকে উপস্থাপন করা হয় স্রষ্টার দিকে মুখ করা এবং অন্যের সেবায় যাপিত জীবনের ফল হিসেবে।',
        },
      },
    ],
  },
  {
    id: 'preservation',
    emoji: '📜',
    kind: 'article',
    title: { en: 'Preservation of the Quran', bn: 'কুরআনের সংরক্ষণ' },
    summary: {
      en: 'How memorization and a careful written tradition together preserved the text — at an introductory, defensible level.',
      bn: 'মুখস্থকরণ ও যত্নশীল লিখিত ধারা কীভাবে একসাথে টেক্সট সংরক্ষণ করেছে—পরিচিতিমূলক ও যুক্তিসংগত পর্যায়ে।',
    },
    points: [
      {
        heading: { en: 'A living tradition of memorization', bn: 'মুখস্থকরণের জীবন্ত ঐতিহ্য' },
        body: {
          en: 'From the Prophet’s own lifetime, the Quran was memorised in full by many companions, and this practice has continued unbroken. In every generation since, large numbers of people (the huffaz) have committed the entire Quran to memory. This continuous oral tradition means the text is carried in living minds worldwide, not only on paper.',
          bn: 'নবীর জীবদ্দশা থেকেই বহু সাহাবি সম্পূর্ণ কুরআন মুখস্থ করেছিলেন, এবং এই চর্চা অবিচ্ছিন্নভাবে চলে এসেছে। এরপর প্রতিটি প্রজন্মে বিপুলসংখ্যক মানুষ (হাফিজ) সম্পূর্ণ কুরআন মুখস্থ করেছেন। এই ধারাবাহিক মৌখিক ঐতিহ্যের অর্থ, টেক্সট কেবল কাগজে নয়, বিশ্বজুড়ে জীবন্ত স্মৃতিতেও বহন করা হয়।',
        },
      },
      {
        heading: { en: 'A careful written record', bn: 'যত্নশীল লিখিত নথি' },
        body: {
          en: 'The revelation was also written down during the Prophet’s life by appointed scribes. According to the mainstream account, it was gathered into a single reference during the caliphate of Abu Bakr, and standardised copies were distributed under the caliph Uthman to keep recitation uniform across the expanding community. Memorisation and manuscript thus checked and reinforced one another.',
          bn: 'ওহি নবীর জীবদ্দশায় নিযুক্ত লেখকদের দ্বারা লিপিবদ্ধও করা হয়েছিল। মূলধারার বর্ণনা অনুযায়ী, খলিফা আবু বকরের সময়ে তা একটি একক নথিতে সংকলিত হয়, এবং খলিফা উসমানের সময়ে প্রমিত অনুলিপি বিতরণ করা হয় যাতে বিস্তৃত সম্প্রদায়জুড়ে তিলাওয়াত অভিন্ন থাকে। এভাবে মুখস্থকরণ ও পাণ্ডুলিপি একে অপরকে যাচাই ও দৃঢ় করেছে।',
        },
      },
      {
        heading: { en: 'Manuscript continuity', bn: 'পাণ্ডুলিপির ধারাবাহিকতা' },
        body: {
          en: 'Early Quran manuscripts that survive from the first Islamic centuries show a text that corresponds closely to the Quran recited today. Presented cautiously and without overstatement, the surviving manuscript evidence together with the unbroken chain of memorisation is what Muslims point to when speaking of the Quran’s remarkable preservation.',
          bn: 'ইসলামের প্রথম শতাব্দীগুলো থেকে টিকে থাকা প্রাচীন কুরআন পাণ্ডুলিপিগুলোতে এমন এক টেক্সট দেখা যায়, যা আজ পঠিত কুরআনের সাথে ঘনিষ্ঠভাবে মিলে যায়। সতর্কভাবে ও অতিরঞ্জন ছাড়াই বললে, টিকে থাকা পাণ্ডুলিপির প্রমাণ এবং মুখস্থকরণের অবিচ্ছিন্ন ধারা—এই দুইয়ের দিকেই মুসলিমরা ইঙ্গিত করে যখন কুরআনের অসাধারণ সংরক্ষণের কথা বলা হয়।',
        },
      },
      {
        heading: { en: 'The promise of guardianship', bn: 'সংরক্ষণের প্রতিশ্রুতি' },
        body: {
          en: 'For Muslims this preservation is not accidental but the fulfilment of a promise: "Indeed, it is We who sent down the Reminder, and indeed, We will be its guardian" (Quran 15:9). The claim is offered as something one can examine — comparing copies and reciters across the world — rather than accepted on assertion alone.',
          bn: 'মুসলিমদের কাছে এই সংরক্ষণ আকস্মিক নয়, বরং এক প্রতিশ্রুতির পূরণ: "নিশ্চয়ই আমিই এই উপদেশ (কুরআন) অবতীর্ণ করেছি এবং আমিই এর সংরক্ষক" (কুরআন ১৫:৯)। এই দাবি কেবল কথায় মেনে নেওয়ার জন্য নয়, বরং যাচাই করার জন্য উপস্থাপিত—বিশ্বজুড়ে অনুলিপি ও কারিদের মিলিয়ে দেখে।',
        },
      },
    ],
  },
  {
    id: 'finality',
    emoji: '🏁',
    kind: 'article',
    title: { en: 'The Finality of Prophethood', bn: 'নবুয়তের সমাপ্তি' },
    summary: {
      en: 'Why Islam teaches there is no prophet after Muhammad ﷺ — and what that does and does not mean.',
      bn: 'কেন ইসলাম শেখায় মুহাম্মাদ ﷺ-এর পর আর কোনো নবী নেই—এবং এর অর্থ কী ও কী নয়।',
    },
    points: [
      {
        heading: { en: 'The Seal of the Prophets', bn: 'নবীদের সমাপ্তিকারী' },
        body: {
          en: 'Islam teaches that Muhammad (peace be upon him) is the final prophet: "Muhammad is not the father of any of your men, but he is the Messenger of Allah and the seal (last) of the prophets" (Quran 33:40). Prophethood is understood as a single mission carried by many messengers over time, now brought to completion.',
          bn: 'ইসলাম শেখায় যে মুহাম্মাদ (তাঁর প্রতি শান্তি) সর্বশেষ নবী: "মুহাম্মাদ তোমাদের কোনো পুরুষের পিতা নন, বরং তিনি আল্লাহর রাসুল ও নবীদের সমাপ্তিকারী (শেষ নবী)" (কুরআন ৩৩:৪০)। নবুয়তকে বোঝা হয় বহু রাসুলের মাধ্যমে সময়ের সাথে বাহিত এক অভিন্ন মিশন হিসেবে, যা এখন পূর্ণতায় পৌঁছেছে।',
        },
      },
      {
        heading: { en: 'Because the message is complete', bn: 'কারণ বার্তা পূর্ণ' },
        body: {
          en: 'A further prophet is understood to be unnecessary because the guidance itself is now complete: "This day I have perfected for you your religion" (Quran 5:3). Finality is not a claim that earlier prophets were lesser; rather, the same core message they all taught has reached its final and preserved form.',
          bn: 'আরও কোনো নবীকে অপ্রয়োজনীয় হিসেবে বোঝা হয় কারণ হিদায়াত এখন পূর্ণ: "আজ আমি তোমাদের জন্য তোমাদের দ্বীন পূর্ণ করে দিলাম" (কুরআন ৫:৩)। সমাপ্তি এই দাবি নয় যে পূর্ববর্তী নবীরা কম মর্যাদার ছিলেন; বরং তাঁরা সবাই যে অভিন্ন মূল বার্তা শিখিয়েছেন, তা তার চূড়ান্ত ও সংরক্ষিত রূপে পৌঁছেছে।',
        },
      },
      {
        heading: { en: 'Preservation makes finality workable', bn: 'সংরক্ষণ সমাপ্তিকে কার্যকর করে' },
        body: {
          en: 'A final revelation only makes sense if it remains intact for all later generations. Islam connects finality to preservation: because the Quran is safeguarded, later peoples do not need a new prophet to restore lost guidance — they have access to the same message directly.',
          bn: 'চূড়ান্ত ওহি তখনই অর্থবহ হয় যখন তা পরবর্তী সব প্রজন্মের জন্য অটুট থাকে। ইসলাম সমাপ্তিকে সংরক্ষণের সাথে যুক্ত করে: যেহেতু কুরআন সুরক্ষিত, পরবর্তী মানুষদের হারানো হিদায়াত পুনরুদ্ধারে নতুন নবীর প্রয়োজন নেই—তারা সরাসরি একই বার্তায় পৌঁছাতে পারে।',
        },
      },
      {
        heading: { en: 'Renewal through knowledge, not new prophets', bn: 'নবী নয়, জ্ঞানের মাধ্যমে নবায়ন' },
        body: {
          en: 'Islam still expects each age to be served by sincere scholars and reformers who explain and apply the preserved guidance to new circumstances. This ongoing renewal (of understanding and practice) takes the place of new prophethood, keeping the religion both fixed in its source and responsive in its application.',
          bn: 'ইসলাম এখনও প্রত্যাশা করে যে প্রতিটি যুগ আন্তরিক আলিম ও সংস্কারকদের দ্বারা সেবিত হবে, যাঁরা সংরক্ষিত হিদায়াতকে নতুন পরিস্থিতিতে ব্যাখ্যা ও প্রয়োগ করেন। বোঝাপড়া ও আমলের এই চলমান নবায়ন নতুন নবুয়তের স্থান নেয়, দ্বীনকে উৎসে স্থির রেখে প্রয়োগে সাড়াশীল রাখে।',
        },
      },
    ],
  },
  {
    id: 'mercy',
    emoji: '🤲',
    kind: 'article',
    title: { en: 'Mercy, Justice & Morality in Islam', bn: 'ইসলামে দয়া, ন্যায় ও নৈতিকতা' },
    summary: {
      en: 'God’s encompassing mercy, the call to justice even against oneself, and a balanced view of character.',
      bn: 'আল্লাহর সর্বব্যাপী দয়া, নিজের বিরুদ্ধেও ন্যায়ের আহ্বান, এবং চরিত্রের ভারসাম্যপূর্ণ দৃষ্টিভঙ্গি।',
    },
    points: [
      {
        heading: { en: 'Mercy comes first', bn: 'দয়া সর্বাগ্রে' },
        body: {
          en: 'Almost every chapter of the Quran opens by naming God as the Most Merciful (ar-Rahman, ar-Rahim), and God describes His mercy as all-embracing: "My mercy encompasses all things" (Quran 7:156). In Islam, hope in God’s mercy is meant to outweigh despair, and mercy is the lens through which His other qualities are understood.',
          bn: 'কুরআনের প্রায় প্রতিটি সুরা আল্লাহকে পরম দয়াময় (আর-রহমান, আর-রহিম) নামে উল্লেখ করে শুরু হয়, এবং আল্লাহ তাঁর দয়াকে বর্ণনা করেন সর্বব্যাপী হিসেবে: "আমার দয়া সব কিছুকে পরিব্যাপ্ত করেছে" (কুরআন ৭:১৫৬)। ইসলামে আল্লাহর দয়ার প্রতি আশা হতাশাকে ছাপিয়ে যাওয়ার কথা, এবং দয়াই সেই দৃষ্টিকোণ যার মধ্য দিয়ে তাঁর অন্যান্য গুণ বোঝা হয়।',
        },
      },
      {
        heading: { en: 'A prophet sent as mercy', bn: 'দয়া হিসেবে প্রেরিত এক নবী' },
        body: {
          en: 'The mission of the Prophet is summarised in terms of mercy: "And We have not sent you except as a mercy to the worlds" (Quran 21:107). Gentleness, forgiveness and concern for others — including the vulnerable, animals and the natural world — are held up as central to prophetic character and to Muslim ethics.',
          bn: 'নবীর মিশনকে দয়ার ভাষায় সারসংক্ষেপ করা হয়েছে: "আমি আপনাকে কেবল বিশ্বজগতের জন্য রহমতরূপেই পাঠিয়েছি" (কুরআন ২১:১০৭)। কোমলতা, ক্ষমা ও অন্যের—দুর্বল, প্রাণী ও প্রকৃতিসহ—প্রতি যত্নকে নবীসুলভ চরিত্র ও মুসলিম নৈতিকতার কেন্দ্রবিন্দু হিসেবে তুলে ধরা হয়।',
        },
      },
      {
        heading: { en: 'Justice, even against oneself', bn: 'ন্যায়, এমনকি নিজের বিরুদ্ধেও' },
        body: {
          en: 'Justice is a firm command, binding even when it is inconvenient: "Be persistently standing firm in justice, witnesses for Allah, even if it be against yourselves…" (Quran 4:135), and "do not let hatred of a people prevent you from being just" (Quran 5:8). Fairness is required toward everyone, including those one disagrees with.',
          bn: 'ন্যায় এক দৃঢ় নির্দেশ, অসুবিধাজনক হলেও তা মান্য: "ন্যায়ের উপর দৃঢ়ভাবে প্রতিষ্ঠিত থাকো, আল্লাহর জন্য সাক্ষী হিসেবে, যদিও তা তোমাদের নিজেদের বিরুদ্ধে হয়…" (কুরআন ৪:১৩৫), এবং "কোনো সম্প্রদায়ের প্রতি বিদ্বেষ যেন তোমাদের ন্যায়বিচার থেকে বিরত না রাখে" (কুরআন ৫:৮)। সবার প্রতি—এমনকি যাদের সাথে দ্বিমত, তাদের প্রতিও—ন্যায্যতা আবশ্যক।',
        },
      },
      {
        heading: { en: 'Character as the heart of religion', bn: 'চরিত্র—দ্বীনের মর্মকেন্দ্র' },
        body: {
          en: 'Islamic morality balances rights owed to God (like worship and gratitude) with rights owed to people (honesty, kindness, keeping promises, caring for family and neighbours). Good character (akhlaq) — truthfulness, humility, patience and generosity — is treated not as an optional extra but as a core aim of the faith.',
          bn: 'ইসলামি নৈতিকতা আল্লাহর প্রতি প্রাপ্য অধিকার (যেমন ইবাদত ও কৃতজ্ঞতা) এবং মানুষের প্রতি প্রাপ্য অধিকারের (সততা, দয়া, প্রতিশ্রুতি রক্ষা, পরিবার ও প্রতিবেশীর যত্ন) মধ্যে ভারসাম্য রাখে। উত্তম চরিত্র (আখলাক)—সত্যবাদিতা, বিনয়, ধৈর্য ও উদারতা—কে ঐচ্ছিক সংযোজন নয়, বরং দ্বীনের এক মূল লক্ষ্য হিসেবে গণ্য করা হয়।',
        },
      },
    ],
  },
  {
    id: 'hereafter',
    emoji: '⚖️',
    kind: 'article',
    title: { en: 'The Hereafter & Accountability', bn: 'পরকাল ও জবাবদিহিতা' },
    summary: {
      en: 'Why an afterlife makes life meaningful and just — held in balance between hope and responsibility.',
      bn: 'কেন পরকাল জীবনকে অর্থবহ ও ন্যায়সংগত করে—আশা ও দায়িত্বের ভারসাম্যে ধৃত।',
    },
    points: [
      {
        heading: { en: 'Life is accountable, so it matters', bn: 'জীবন জবাবদিহিতাধীন, তাই তা গুরুত্বপূর্ণ' },
        body: {
          en: 'Islam teaches that nothing we do is finally lost or meaningless: "So whoever does an atom’s weight of good will see it, and whoever does an atom’s weight of evil will see it" (Quran 99:7–8). Belief in the hereafter gives every act moral weight and encourages sincerity even when no one else is watching.',
          bn: 'ইসলাম শেখায় যে আমাদের কোনো কাজই চূড়ান্তভাবে হারিয়ে যায় না বা অর্থহীন নয়: "সুতরাং কেউ অণু পরিমাণ ভালো করলে তা দেখবে, আর কেউ অণু পরিমাণ মন্দ করলে তা-ও দেখবে" (কুরআন ৯৯:৭–৮)। পরকালে বিশ্বাস প্রতিটি কাজকে নৈতিক ভার দেয় এবং কেউ না দেখলেও আন্তরিকতায় উৎসাহিত করে।',
        },
      },
      {
        heading: { en: 'Justice ultimately fulfilled', bn: 'ন্যায় চূড়ান্তভাবে পূর্ণ' },
        body: {
          en: 'Many wrongs in this world are never put right, and much good goes unrewarded. Islam answers this with a just reckoning: the oppressed are vindicated, sincere good is honoured, and no injustice is overlooked by God. The hereafter is presented as the completion of a justice only partly seen now.',
          bn: 'এই জগতে বহু অন্যায় কখনো সংশোধিত হয় না, আর বহু কল্যাণ অপুরস্কৃত থেকে যায়। ইসলাম এর উত্তর দেয় এক ন্যায়সংগত হিসাবের মাধ্যমে: নিপীড়িতরা ন্যায় পায়, আন্তরিক কল্যাণ সম্মানিত হয়, এবং কোনো অবিচার আল্লাহর দৃষ্টির বাইরে থাকে না। পরকালকে উপস্থাপন করা হয় এমন এক ন্যায়ের পূর্ণতা হিসেবে, যা এখন কেবল আংশিকভাবে দেখা যায়।',
        },
      },
      {
        heading: { en: 'Hope alongside responsibility', bn: 'দায়িত্বের পাশে আশা' },
        body: {
          en: 'The Quran holds accountability and mercy together. It warns honestly about consequences, yet repeatedly emphasises God’s forgiveness for those who turn back to Him. The intended attitude is neither reckless nor despairing, but hopeful and responsible — striving to do good while trusting in God’s mercy.',
          bn: 'কুরআন জবাবদিহিতা ও দয়াকে একসাথে ধরে রাখে। এটি পরিণাম সম্পর্কে সততার সাথে সতর্ক করে, তবু বারবার জোর দেয় যে যারা আল্লাহর দিকে ফিরে আসে তাদের জন্য তিনি ক্ষমাশীল। কাঙ্ক্ষিত মনোভাব বেপরোয়াও নয়, হতাশও নয়, বরং আশাবাদী ও দায়িত্বশীল—আল্লাহর দয়ায় ভরসা রেখে কল্যাণের জন্য প্রচেষ্টা।',
        },
      },
    ],
  },
  {
    id: 'qadar',
    emoji: '🌗',
    kind: 'article',
    title: { en: 'Free Will & Divine Decree (Qadar)', bn: 'স্বাধীন ইচ্ছা ও তাকদির (কদর)' },
    summary: {
      en: 'An introductory look at how Islam affirms both God’s knowledge and real human choice.',
      bn: 'ইসলাম কীভাবে আল্লাহর জ্ঞান ও প্রকৃত মানবিক পছন্দ—উভয়কেই নিশ্চিত করে, তার পরিচিতিমূলক দৃষ্টি।',
    },
    points: [
      {
        heading: { en: 'Both together, not one or the other', bn: 'উভয়ই একসাথে, একটি বা অন্যটি নয়' },
        body: {
          en: 'At an introductory level, mainstream Islamic belief affirms two truths together: God has complete knowledge of all that happens and nothing occurs outside His will, and human beings have genuine choice for which they are responsible. These are held as compatible, not contradictory, even where the full "how" lies beyond us.',
          bn: 'পরিচিতিমূলক পর্যায়ে, মূলধারার ইসলামি বিশ্বাস দুটি সত্যকে একসাথে নিশ্চিত করে: যা কিছু ঘটে তার সম্পূর্ণ জ্ঞান আল্লাহর আছে এবং তাঁর ইচ্ছার বাইরে কিছুই ঘটে না, আবার মানুষের রয়েছে প্রকৃত পছন্দ যার জন্য সে দায়ী। এদের সামঞ্জস্যপূর্ণ হিসেবে ধরা হয়, বিরোধী হিসেবে নয়—যদিও পূর্ণ "কীভাবে" আমাদের বোধের বাইরে।',
        },
      },
      {
        heading: { en: 'We are responsible for our effort', bn: 'আমরা আমাদের প্রচেষ্টার জন্য দায়ী' },
        body: {
          en: 'In daily life we plainly experience making real choices, and Islam treats us as accountable for our intentions and efforts — not for outcomes beyond our control. "Allah does not charge a soul except with that within its capacity" (Quran 2:286). Divine knowledge of what we will freely choose does not force the choice upon us.',
          bn: 'দৈনন্দিন জীবনে আমরা স্পষ্টতই প্রকৃত পছন্দ করার অভিজ্ঞতা পাই, এবং ইসলাম আমাদের দায়ী করে আমাদের নিয়ত ও প্রচেষ্টার জন্য—আমাদের নিয়ন্ত্রণের বাইরের ফলাফলের জন্য নয়। "আল্লাহ কোনো ব্যক্তিকে তার সাধ্যের বাইরে দায়িত্ব দেন না" (কুরআন ২:২৮৬)। আমরা স্বাধীনভাবে যা বেছে নেব সে সম্পর্কে আল্লাহর জ্ঞান সেই পছন্দকে আমাদের উপর চাপিয়ে দেয় না।',
        },
      },
      {
        heading: { en: 'Humility before a deep matter', bn: 'এক গভীর বিষয়ে বিনয়' },
        body: {
          en: 'Classical scholars advised approaching qadar with humility, warning against endless speculation about matters that exceed human comprehension. The practical emphasis is on doing one’s duty rather than using "destiny" as an excuse for wrongdoing or inaction.',
          bn: 'ধ্রুপদী আলিমগণ তাকদিরকে বিনয়ের সাথে গ্রহণের পরামর্শ দিয়েছেন, মানবীয় বোধের অতীত বিষয়ে অন্তহীন জল্পনা থেকে সতর্ক করেছেন। ব্যবহারিক জোর হলো নিজের কর্তব্য পালনের উপর, "ভাগ্য"-কে অন্যায় বা নিষ্ক্রিয়তার অজুহাত হিসেবে ব্যবহার নয়।',
        },
      },
      {
        heading: { en: 'Strive, then trust', bn: 'চেষ্টা করো, তারপর ভরসা রাখো' },
        body: {
          en: 'The lived attitude Islam encourages balances two extremes: it rejects fatalism (doing nothing because "it is all decreed") and rejects arrogance (imagining we control everything). Instead the believer takes sincere action and then places trust in God (tawakkul) with the results — active in effort, peaceful in outcome.',
          bn: 'ইসলাম যে জীবনঘনিষ্ঠ মনোভাব উৎসাহিত করে তা দুটি চরমপন্থার মধ্যে ভারসাম্য রাখে: এটি নিয়তিবাদ ("সবই তো নির্ধারিত" বলে নিষ্ক্রিয়তা) প্রত্যাখ্যান করে এবং অহংকার (আমরাই সব নিয়ন্ত্রণ করি ভাবা) প্রত্যাখ্যান করে। বরং বিশ্বাসী আন্তরিক প্রচেষ্টা করে, তারপর ফলাফল আল্লাহর উপর সঁপে দেয় (তাওয়াক্কুল)—প্রচেষ্টায় সক্রিয়, ফলাফলে প্রশান্ত।',
        },
      },
    ],
  },
  {
    id: 'earlier-prophets',
    emoji: '🕯️',
    kind: 'article',
    title: { en: 'Earlier Prophets & Scriptures', bn: 'পূর্ববর্তী নবী ও কিতাবসমূহ' },
    summary: {
      en: 'How Islam honours the prophets before Muhammad ﷺ and the revelations given to them.',
      bn: 'মুহাম্মাদ ﷺ-এর পূর্ববর্তী নবী ও তাঁদের প্রতি অবতীর্ণ ওহিকে ইসলাম কীভাবে সম্মান করে।',
    },
    points: [
      {
        heading: { en: 'Belief in all the prophets', bn: 'সকল নবীর প্রতি ঈমান' },
        body: {
          en: 'A Muslim is required to believe in all of God’s prophets and to make no distinction between them: "We believe in Allah and what was revealed to us and what was revealed to Abraham, Ishmael, Isaac, Jacob… and what was given to Moses and Jesus… we make no distinction between any of them" (Quran 2:136). Rejecting any true prophet is not part of Islam.',
          bn: 'একজন মুসলিমকে আল্লাহর সকল নবীর প্রতি ঈমান আনতে হয় এবং তাঁদের মধ্যে কোনো পার্থক্য না করতে হয়: "আমরা ঈমান আনি আল্লাহর প্রতি এবং আমাদের প্রতি যা অবতীর্ণ হয়েছে, আর ইব্রাহিম, ইসমাইল, ইসহাক, ইয়াকুবের প্রতি যা অবতীর্ণ হয়েছে… এবং মূসা ও ঈসাকে যা দেওয়া হয়েছে… আমরা তাঁদের কারও মধ্যে পার্থক্য করি না" (কুরআন ২:১৩৬)। কোনো সত্য নবীকে প্রত্যাখ্যান করা ইসলামের অংশ নয়।',
        },
      },
      {
        heading: { en: 'Honour for earlier revelation', bn: 'পূর্ববর্তী ওহির প্রতি সম্মান' },
        body: {
          en: 'Islam teaches that God gave revelation before the Quran — such as the scriptures given to Moses and Jesus (peace be upon them) — as genuine guidance in its time. Muslims speak of these prophets and their original message with reverence, seeing themselves as heirs to the same prophetic tradition rather than opponents of it.',
          bn: 'ইসলাম শেখায় যে আল্লাহ কুরআনের আগেও ওহি দিয়েছেন—যেমন মূসা ও ঈসা (তাঁদের প্রতি শান্তি)-কে প্রদত্ত কিতাব—যা তার সময়ে প্রকৃত হিদায়াত ছিল। মুসলিমরা এই নবী ও তাঁদের মূল বার্তার কথা শ্রদ্ধার সাথে বলে, নিজেদের সেই একই নবুয়তি ঐতিহ্যের উত্তরাধিকারী হিসেবে দেখে, বিরোধী হিসেবে নয়।',
        },
      },
      {
        heading: { en: 'The Quran as confirming and final', bn: 'কুরআন—নিশ্চিতকারী ও চূড়ান্ত' },
        body: {
          en: 'The Quran describes itself as confirming the truth of what came before it and as a guardian standard over it: "We have sent down to you the Book in truth, confirming that which preceded it and as a criterion over it" (Quran 5:48). Islam thus presents itself as continuous with earlier faith communities while offering the final, preserved reference point.',
          bn: 'কুরআন নিজেকে বর্ণনা করে পূর্ববর্তী সত্যের নিশ্চিতকারী এবং তার উপর তত্ত্বাবধায়ক মানদণ্ড হিসেবে: "আমি আপনার প্রতি সত্যসহ কিতাব অবতীর্ণ করেছি, যা পূর্ববর্তী কিতাবের সত্যায়নকারী ও তার উপর তত্ত্বাবধায়ক" (কুরআন ৫:৪৮)। এভাবে ইসলাম নিজেকে উপস্থাপন করে পূর্ববর্তী ধর্মসম্প্রদায়ের ধারাবাহিকতায়, একই সাথে চূড়ান্ত ও সংরক্ষিত মানদণ্ড হিসেবে।',
        },
      },
      {
        heading: { en: 'Seeking common ground', bn: 'অভিন্ন ভিত্তি অন্বেষণ' },
        body: {
          en: 'The Quran invites respectful dialogue with the People of the Book on shared principles: "Say: O People of the Scripture, come to a word that is equitable between us and you — that we worship none but God" (Quran 3:64). The tone commended is one of courteous conversation around common values, not hostility.',
          bn: 'কুরআন আহলে কিতাবের সাথে অভিন্ন নীতির ভিত্তিতে শ্রদ্ধাপূর্ণ সংলাপে আমন্ত্রণ জানায়: "বলুন, হে আহলে কিতাব, এসো এমন এক কথায় যা আমাদের ও তোমাদের মধ্যে অভিন্ন—আমরা আল্লাহ ছাড়া কারও ইবাদত করব না" (কুরআন ৩:৬৪)। প্রশংসিত ভঙ্গি হলো অভিন্ন মূল্যবোধ ঘিরে সৌজন্যপূর্ণ কথোপকথন, বৈরিতা নয়।',
        },
      },
    ],
  },
  {
    id: 'history',
    emoji: '🏺',
    kind: 'article',
    title: { en: 'Historical Evidence', bn: 'ঐতিহাসিক প্রমাণ' },
    summary: {
      en: 'Early Quran manuscripts, the mass-transmitted recitation, and early attestations of the Prophet ﷺ — presented carefully.',
      bn: 'প্রাচীন কুরআন পাণ্ডুলিপি, গণ-পরম্পরায় প্রেরিত তিলাওয়াত, এবং নবী ﷺ-এর প্রাথমিক ঐতিহাসিক সাক্ষ্য—সতর্কভাবে উপস্থাপিত।',
    },
    points: [
      {
        heading: { en: 'The Birmingham manuscript', bn: 'বার্মিংহাম পাণ্ডুলিপি' },
        body: {
          en: 'In 2015 the University of Birmingham announced that the parchment of a Quran folio in its Mingana Collection had been radiocarbon-dated, with high probability, to approximately 568–645 CE — a range overlapping the lifetime of the Prophet (peace be upon him) and the first generation. Its text corresponds closely to the Quran read today. Radiocarbon dating tests the animal skin rather than the ink, so scholars discuss the exact writing date carefully — but it stands among the earliest surviving Quranic material, significant precisely because so early a text matches the familiar one.',
          bn: '২০১৫ সালে বার্মিংহাম বিশ্ববিদ্যালয় ঘোষণা করে যে তাদের মিংগানা সংগ্রহের একটি কুরআন পাতার চামড়া রেডিওকার্বন পদ্ধতিতে, উচ্চ সম্ভাবনায়, আনুমানিক ৫৬৮–৬৪৫ খ্রিষ্টাব্দে তারিখায়িত হয়েছে—যে পরিসর নবী (তাঁর প্রতি শান্তি)-এর জীবনকাল ও প্রথম প্রজন্মের সাথে মিলে যায়। এর টেক্সট আজ পঠিত কুরআনের সাথে ঘনিষ্ঠভাবে মেলে। রেডিওকার্বন তারিখায়ন কালি নয়, চামড়া পরীক্ষা করে, তাই লেখার সঠিক তারিখ নিয়ে গবেষকরা সতর্কভাবে আলোচনা করেন—তবে এটি টিকে থাকা প্রাচীনতম কুরআনি উপাদানের অন্যতম, আর তাৎপর্যপূর্ণ ঠিক এ কারণেই যে এত প্রাচীন টেক্সটও পরিচিত টেক্সটের সাথে মিলে যায়।',
        },
      },
      {
        heading: { en: 'Sana‘a, Topkapi and other early codices', bn: 'সানআ, তোপকাপি ও অন্যান্য প্রাচীন কোডেক্স' },
        body: {
          en: 'Other very early witnesses include the Sana‘a manuscripts discovered in Yemen in 1972 — among the oldest known Quranic manuscripts and an important subject of academic study — and large early codices such as the Topkapi manuscript in Istanbul. Studied soberly, this record shows an early text corresponding closely to the Quran recited today, with the kinds of minor scribal features specialists routinely examine in any manuscript tradition. Muslims present this correspondence, without overclaiming, as consistent with the account of an early and careful standardisation.',
          bn: 'অন্যান্য অতি প্রাচীন সাক্ষীর মধ্যে আছে ১৯৭২ সালে ইয়েমেনে আবিষ্কৃত সানআ পাণ্ডুলিপি—জ্ঞাত প্রাচীনতম কুরআনি পাণ্ডুলিপির অন্যতম ও একাডেমিক গবেষণার গুরুত্বপূর্ণ বিষয়—এবং ইস্তাম্বুলের তোপকাপি পাণ্ডুলিপির মতো বৃহৎ প্রাচীন কোডেক্স। সংযতভাবে অধ্যয়ন করলে, এই নথি এমন এক প্রাচীন টেক্সট দেখায় যা আজ পঠিত কুরআনের সাথে ঘনিষ্ঠভাবে মেলে, সাথে সেই ধরনের ক্ষুদ্র লিপিগত বৈশিষ্ট্য যা বিশেষজ্ঞরা যেকোনো পাণ্ডুলিপি-ঐতিহ্যে নিয়মিত পরীক্ষা করেন। মুসলিমরা এই মিলকে, অতিরঞ্জন ছাড়াই, প্রাথমিক ও যত্নশীল প্রমিতকরণের বিবরণের সাথে সঙ্গতিপূর্ণ হিসেবে উপস্থাপন করে।',
        },
      },
      {
        heading: { en: 'Mass transmission (tawatur)', bn: 'গণ-পরম্পরা (তাওয়াতুর)' },
        body: {
          en: 'Alongside manuscripts stands a different kind of evidence: continuous mass transmission. In every generation from the first, the full Quran has been memorised and publicly recited by very large numbers of people across dispersed regions, each learning from many teachers. Scholars call this tawatur — transmission so broad and independent that coordinated error or alteration becomes implausible. It is the same everyday logic by which we trust widely and independently transmitted facts, applied to a recited text that communities have openly checked against one another for fourteen centuries.',
          bn: 'পাণ্ডুলিপির পাশাপাশি আছে ভিন্ন ধরনের প্রমাণ: অবিচ্ছিন্ন গণ-পরম্পরা। প্রথম প্রজন্ম থেকে প্রতিটি প্রজন্মে, ছড়িয়ে থাকা বিভিন্ন অঞ্চলে বিপুলসংখ্যক মানুষ সম্পূর্ণ কুরআন মুখস্থ করেছে ও প্রকাশ্যে তিলাওয়াত করেছে, প্রত্যেকে বহু শিক্ষকের কাছে শিখে। আলিমগণ একে বলেন তাওয়াতুর—এত ব্যাপক ও স্বাধীন পরম্পরা যে সমন্বিত ভুল বা পরিবর্তন অসম্ভাব্য হয়ে পড়ে। এটি সেই একই দৈনন্দিন যুক্তি, যা দিয়ে আমরা ব্যাপক ও স্বাধীনভাবে প্রেরিত তথ্যে আস্থা রাখি—চৌদ্দ শতাব্দী ধরে সম্প্রদায়গুলোর পরস্পরের সাথে প্রকাশ্যে মিলিয়ে দেখা এক পঠিত টেক্সটে প্রযুক্ত।',
        },
      },
      {
        heading: { en: 'Early non-Muslim attestations of the Prophet ﷺ', bn: 'নবী ﷺ সম্পর্কে প্রাথমিক অমুসলিম সাক্ষ্য' },
        body: {
          en: 'The Prophet Muhammad (peace be upon him) is among the most firmly attested figures of late antiquity. Beyond the rich Muslim sources, seventh-century non-Muslim writings — Greek, Syriac and Armenian texts, some composed within years or decades of his lifetime — mention the Arabian prophet and the rapid rise of his community. Academic historians, whatever their view of his message, affirm his historical existence and his preaching of monotheism in Arabia. Islam’s case rests on the character and content of his message, but it begins from an unusually solid historical footing.',
          bn: 'নবী মুহাম্মাদ (তাঁর প্রতি শান্তি) প্রাচীন যুগের শেষ পর্বের সবচেয়ে দৃঢ়ভাবে প্রমাণিত ব্যক্তিত্বদের অন্যতম। সমৃদ্ধ মুসলিম উৎসের বাইরেও, সপ্তম শতকের অমুসলিম রচনা—গ্রিক, সিরিয়াক ও আর্মেনীয় টেক্সট, যার কিছু তাঁর জীবনকালের কয়েক বছর বা দশকের মধ্যে রচিত—আরবের নবী ও তাঁর সম্প্রদায়ের দ্রুত উত্থানের কথা উল্লেখ করে। একাডেমিক ঐতিহাসিকগণ, তাঁর বার্তা সম্পর্কে যা-ই মনে করুন, তাঁর ঐতিহাসিক অস্তিত্ব ও আরবে একত্ববাদ প্রচার নিশ্চিত করেন। ইসলামের যুক্তি দাঁড়িয়ে আছে তাঁর বার্তার চরিত্র ও বিষয়বস্তুর উপর, তবে তার সূচনা এক অস্বাভাবিক দৃঢ় ঐতিহাসিক ভিত্তি থেকে।',
        },
      },
    ],
  },
  {
    id: 'signs-in-creation',
    emoji: '🌠',
    kind: 'article',
    title: { en: 'Signs in Creation', bn: 'সৃষ্টির নিদর্শনসমূহ' },
    summary: {
      en: 'A reflection (tadabbur) on order, balance, conscience and the Quran’s invitation to ponder.',
      bn: 'শৃঙ্খলা, ভারসাম্য, বিবেক ও কুরআনের অনুধ্যান-আমন্ত্রণ নিয়ে এক তাদাব্বুর।',
    },
    points: [
      {
        heading: { en: 'An invitation to reflect', bn: 'অনুধ্যানের আমন্ত্রণ' },
        body: {
          en: 'Again and again the Quran does not demand blind acceptance but invites careful thought about what we already see: "Indeed, in the creation of the heavens and the earth and the alternation of night and day are signs for those of understanding — who remember God standing, sitting and lying on their sides, and reflect upon the creation of the heavens and the earth" (Quran 3:190–191). This is offered as reasoned reflection (tadabbur), not as a scientific proof — an invitation to look at the world with an open and thoughtful heart.',
          bn: 'কুরআন বারবার অন্ধ গ্রহণের দাবি করে না, বরং আমরা যা ইতিমধ্যে দেখি তা নিয়ে গভীর চিন্তায় আমন্ত্রণ জানায়: "নিশ্চয়ই আকাশমণ্ডলী ও পৃথিবীর সৃষ্টিতে এবং রাত ও দিনের পরিবর্তনে জ্ঞানীদের জন্য নিদর্শন রয়েছে—যারা দাঁড়িয়ে, বসে ও শায়িত অবস্থায় আল্লাহকে স্মরণ করে এবং আকাশমণ্ডলী ও পৃথিবীর সৃষ্টি নিয়ে চিন্তা করে" (কুরআন ৩:১৯০–১৯১)। এটি এক যুক্তিসংগত অনুধ্যান (তাদাব্বুর) হিসেবে উপস্থাপিত, কোনো বৈজ্ঞানিক প্রমাণ নয়—উন্মুক্ত ও চিন্তাশীল হৃদয়ে জগৎকে দেখার এক আমন্ত্রণ।',
        },
      },
      {
        heading: { en: 'Order and balance', bn: 'শৃঙ্খলা ও ভারসাম্য' },
        body: {
          en: 'The cosmos runs with a steadiness we depend on without noticing — a settled order that makes life and understanding possible at all. The Quran points to this poise as something to marvel at: "the sun and the moon [move] by precise calculation… and the sky He raised and imposed the balance" (Quran 55:5–7). Rather than making a technical claim, Islam asks us to notice how much depends on a fine, sustained equilibrium, and to read that reliability as a sign of a wise and deliberate Sustainer rather than sheer accident.',
          bn: 'বিশ্বজগৎ এমন এক স্থিরতায় চলে যার উপর আমরা টের না পেয়েই নির্ভর করি—এক সুস্থিত শৃঙ্খলা যা আদৌ জীবন ও উপলব্ধি সম্ভব করে। কুরআন এই ভারসাম্যকে বিস্ময়ের বিষয় হিসেবে দেখায়: "সূর্য ও চন্দ্র সুনির্দিষ্ট হিসাবে চলে… আর আকাশকে তিনি উঁচু করেছেন এবং স্থাপন করেছেন ভারসাম্য" (কুরআন ৫৫:৫–৭)। কোনো কারিগরি দাবি না করে ইসলাম আমাদের বলে লক্ষ করতে যে কতকিছু নির্ভর করে এক সূক্ষ্ম, অব্যাহত সাম্যাবস্থার উপর, এবং সেই নির্ভরযোগ্যতাকে নিছক দুর্ঘটনা নয়, বরং এক প্রজ্ঞাময় ও উদ্দেশ্যপূর্ণ রক্ষণকর্তার নিদর্শন হিসেবে পড়তে।',
        },
      },
      {
        heading: { en: 'Signs within ourselves', bn: 'আমাদের নিজেদের ভেতরের নিদর্শন' },
        body: {
          en: 'The Quran turns our gaze inward as much as outward: "And on the earth are signs for the certain in faith, and in yourselves. Then will you not see?" (Quran 51:20–21). Islam points to the wonder of our own existence and to the moral voice we carry — the inner sense that justice, honesty and compassion are truly good and cruelty truly wrong. This conscience, felt across cultures, is offered as a quiet sign pointing beyond ourselves to the One who placed it there.',
          bn: 'কুরআন বাইরের মতোই আমাদের দৃষ্টি ভেতরের দিকেও ফেরায়: "আর পৃথিবীতে নিশ্চিত বিশ্বাসীদের জন্য নিদর্শন রয়েছে, এবং তোমাদের নিজেদের মধ্যেও। তবু কি তোমরা দেখবে না?" (কুরআন ৫১:২০–২১)। ইসলাম ইঙ্গিত করে আমাদের নিজেদের অস্তিত্বের বিস্ময়ের দিকে এবং আমরা যে নৈতিক কণ্ঠস্বর বহন করি তার দিকে—সেই অন্তর্গত বোধ যে ন্যায়, সততা ও দয়া প্রকৃতই ভালো আর নিষ্ঠুরতা প্রকৃতই মন্দ। সংস্কৃতিভেদে অনুভূত এই বিবেককে উপস্থাপন করা হয় এক নীরব নিদর্শন হিসেবে, যা আমাদের নিজেদের ছাড়িয়ে সেই সত্তার দিকে ইঙ্গিত করে যিনি তা স্থাপন করেছেন।',
        },
      },
      {
        heading: { en: 'Reading the signs with humility', bn: 'বিনয়ের সাথে নিদর্শন পাঠ' },
        body: {
          en: 'The Quran promises that honest reflection will keep revealing meaning: "We will show them Our signs in the horizons and within themselves until it becomes clear to them that it is the truth" (Quran 41:53). Islam treats this as an ongoing invitation, not a closed argument or a set of specific scientific claims to defend. The signs are read with humility: they do not force belief, but they gently draw an open heart toward gratitude and toward the Source of it all.',
          bn: 'কুরআন প্রতিশ্রুতি দেয় যে সৎ অনুধ্যান বারবার অর্থ উন্মোচন করতে থাকবে: "আমি তাদের দেখাব আমার নিদর্শনসমূহ দিগন্তে ও তাদের নিজেদের মধ্যে, যতক্ষণ না তাদের কাছে স্পষ্ট হয় যে এটিই সত্য" (কুরআন ৪১:৫৩)। ইসলাম একে দেখে এক চলমান আমন্ত্রণ হিসেবে, কোনো বদ্ধ যুক্তি বা রক্ষা করার মতো নির্দিষ্ট বৈজ্ঞানিক দাবির সমষ্টি হিসেবে নয়। নিদর্শনগুলো বিনয়ের সাথে পড়া হয়: এগুলো বিশ্বাস চাপিয়ে দেয় না, বরং কোমলভাবে উন্মুক্ত হৃদয়কে কৃতজ্ঞতার দিকে এবং সবকিছুর উৎসের দিকে টানে।',
        },
      },
    ],
  },
  {
    id: 'message-of-all-prophets',
    emoji: '📜',
    kind: 'article',
    title: { en: 'The Message of All Prophets', bn: 'সকল নবীর বার্তা' },
    summary: {
      en: 'One call across every prophet from Adam to Muhammad ﷺ — worship God alone and live justly.',
      bn: 'আদম থেকে মুহাম্মাদ ﷺ পর্যন্ত প্রত্যেক নবীর একই আহ্বান—কেবল আল্লাহর ইবাদত ও ন্যায়সংগত জীবন।',
    },
    points: [
      {
        heading: { en: 'One message, many messengers', bn: 'এক বার্তা, বহু রাসুল' },
        body: {
          en: 'Islam teaches that God did not leave any people without guidance, and that every prophet carried the same essential call: "And We certainly sent into every nation a messenger, [saying]: Worship God and avoid false gods" (Quran 16:36). From Adam to the final Prophet, the core was never a new religion each time but one continuous message — turn to the one true God, and reject worshipping anything besides Him.',
          bn: 'ইসলাম শেখায় যে আল্লাহ কোনো জাতিকে হিদায়াত ছাড়া রাখেননি, এবং প্রত্যেক নবী একই মৌলিক আহ্বান বহন করেছেন: "আর আমি প্রত্যেক জাতির মধ্যে একজন রাসুল পাঠিয়েছি এই [বার্তাসহ]: তোমরা আল্লাহর ইবাদত করো এবং তাগুত (মিথ্যা উপাস্য) বর্জন করো" (কুরআন ১৬:৩৬)। আদম থেকে সর্বশেষ নবী পর্যন্ত মূল কথা প্রতিবার নতুন কোনো ধর্ম ছিল না, বরং এক অবিচ্ছিন্ন বার্তা—এক সত্য আল্লাহর দিকে ফেরা, এবং তাঁকে ছাড়া অন্য কিছুর ইবাদত প্রত্যাখ্যান।',
        },
      },
      {
        heading: { en: 'Worship God alone', bn: 'কেবল আল্লাহর ইবাদত' },
        body: {
          en: 'The Quran makes this unity of purpose explicit: "And We sent not before you any messenger except that We revealed to him that there is no deity except Me, so worship Me" (Quran 21:25). Whatever differences there were in law and practice suited to each time and people, the heart of every prophetic mission — Noah, Abraham, Moses, Jesus and Muhammad (peace be upon them all) — was pure devotion to the one God. Islam presents itself not as breaking from this line but as its completion.',
          bn: 'কুরআন এই উদ্দেশ্যের অভিন্নতা স্পষ্ট করে: "আমি তোমার পূর্বে এমন কোনো রাসুল পাঠাইনি, যাঁর প্রতি আমি এই ওহি করিনি যে, আমি ছাড়া কোনো ইলাহ নেই, সুতরাং আমারই ইবাদত করো" (কুরআন ২১:২৫)। প্রতিটি সময় ও জাতির উপযোগী বিধান ও আমলে যত পার্থক্যই থাকুক, প্রত্যেক নবুয়তি মিশনের—নূহ, ইব্রাহিম, মূসা, ঈসা ও মুহাম্মাদ (তাঁদের সকলের প্রতি শান্তি)—হৃদয় ছিল এক আল্লাহর প্রতি বিশুদ্ধ নিষ্ঠা। ইসলাম নিজেকে উপস্থাপন করে এই ধারা থেকে বিচ্ছিন্নতা হিসেবে নয়, বরং এর পূর্ণতা হিসেবে।',
        },
      },
      {
        heading: { en: 'A brotherhood of prophets', bn: 'নবীদের ভ্রাতৃত্ব' },
        body: {
          en: 'Because the message is one, Islam honours all the prophets and asks believers to make no distinction between them (Quran 2:285). The Prophet Muhammad (peace be upon him) described the prophets as brothers of one family with a single faith. This is why loving and respecting Moses, Jesus and the others (peace be upon them) is not outside Islam but part of it — they are seen as fellow bearers of the same light, each confirming those before him.',
          bn: 'যেহেতু বার্তা এক, ইসলাম সকল নবীকে সম্মান করে এবং বিশ্বাসীদের বলে তাঁদের মধ্যে কোনো পার্থক্য না করতে (কুরআন ২:২৮৫)। নবী মুহাম্মাদ (তাঁর প্রতি শান্তি) নবীদের বর্ণনা করেছেন এক পরিবারের ভাই হিসেবে, যাঁদের ঈমান অভিন্ন। এ কারণেই মূসা, ঈসা ও অন্যান্য নবী (তাঁদের প্রতি শান্তি)-কে ভালোবাসা ও শ্রদ্ধা করা ইসলামের বাইরে নয়, বরং এর অংশ—তাঁদের দেখা হয় একই আলোর সহবাহক হিসেবে, প্রত্যেকে তাঁর পূর্ববর্তীদের সত্যায়নকারী।',
        },
      },
      {
        heading: { en: 'Meeting the prophets', bn: 'নবীদের সাথে পরিচয়' },
        body: {
          en: 'This shared call comes alive in the individual stories of the prophets — their patience, trust and steadfast devotion to God through hardship. The Prophets module of this app introduces many of them and the one message they carried, so that the continuity described here can be seen in the lives that lived it.',
          bn: 'এই অভিন্ন আহ্বান জীবন্ত হয়ে ওঠে নবীদের ব্যক্তিগত কাহিনিতে—কষ্টের মধ্য দিয়েও তাঁদের ধৈর্য, ভরসা ও আল্লাহর প্রতি অবিচল নিষ্ঠায়। এই অ্যাপের নবীগণ (Prophets) অংশটি তাঁদের অনেকের ও তাঁরা যে এক বার্তা বহন করেছেন তার পরিচয় দেয়, যাতে এখানে বর্ণিত ধারাবাহিকতা সেই জীবনগুলোতেই দেখা যায় যাঁরা তা যাপন করেছেন।',
        },
      },
    ],
  },
  {
    id: 'questions',
    emoji: '💬',
    kind: 'qa',
    title: { en: 'Common Questions', bn: 'সাধারণ প্রশ্নাবলি' },
    summary: {
      en: 'Sincere questions answered from the Islamic position — respectfully, without strawmen.',
      bn: 'আন্তরিক প্রশ্নের ইসলামি দৃষ্টিকোণ থেকে উত্তর—শ্রদ্ধার সাথে, কোনো বিকৃতি ছাড়া।',
    },
    qa: [
      {
        q: { en: 'How can I be sure God exists?', bn: 'আমি কীভাবে নিশ্চিত হব যে আল্লাহ আছেন?' },
        a: {
          en: 'Islam does not claim you must reach mathematical certainty before believing. Instead it invites you to weigh several converging pointers together — the fact that the universe began and is finely ordered, the widely shared human sense of a Creator and of objective right and wrong, and reflection on the Quran itself. For many people these build reasonable confidence rather than a forced proof. Sincere reflection, honest questions, and (in the Islamic view) turning to God and asking for guidance are all encouraged as part of the search.',
          bn: 'ইসলাম দাবি করে না যে বিশ্বাসের আগে আপনাকে গাণিতিক নিশ্চয়তায় পৌঁছাতে হবে। বরং এটি আপনাকে আমন্ত্রণ জানায় একাধিক অভিসারী ইঙ্গিতকে একসাথে বিবেচনা করতে—বিশ্বজগতের সূচনা ও সূক্ষ্ম শৃঙ্খলা, স্রষ্টা এবং বস্তুনিষ্ঠ ভালো-মন্দ সম্পর্কে ব্যাপকভাবে অনুভূত মানবিক বোধ, এবং কুরআন নিয়ে অনুধ্যান। বহু মানুষের কাছে এগুলো জবরদস্তিমূলক প্রমাণ নয়, বরং যুক্তিসংগত আস্থা গড়ে তোলে। আন্তরিক চিন্তা, সৎ প্রশ্ন এবং (ইসলামের দৃষ্টিতে) আল্লাহর দিকে ফিরে হিদায়াত চাওয়া—সবই এই অন্বেষণের অংশ হিসেবে উৎসাহিত।',
        },
      },
      {
        q: { en: 'Why is there suffering if God is merciful?', bn: 'আল্লাহ দয়াময় হলে দুঃখ-কষ্ট কেন?' },
        a: {
          en: 'This is one of the most sincere and human of questions, and Islam does not brush it aside. It teaches that this life is a temporary test, not the final destination, and that much suffering flows from the freedom that also makes love and goodness real. Other hardships carry wisdom we may not fully perceive, can draw people toward patience, humility and compassion, and — crucially — are set against a just and merciful hereafter in which wrongs are addressed and hardship borne with faith is not wasted. Islam does not claim to answer every particular "why," but holds that suffering does not contradict a God who is both merciful and just.',
          bn: 'এটি সবচেয়ে আন্তরিক ও মানবিক প্রশ্নগুলোর একটি, এবং ইসলাম একে উপেক্ষা করে না। এটি শেখায় যে এই জীবন এক অস্থায়ী পরীক্ষা, চূড়ান্ত গন্তব্য নয়, এবং অনেক কষ্ট আসে সেই স্বাধীনতা থেকে যা ভালোবাসা ও কল্যাণকেও বাস্তব করে তোলে। অন্যান্য দুর্ভোগ এমন প্রজ্ঞা বহন করে যা আমরা পুরোপুরি বুঝতে না-ও পারি, মানুষকে ধৈর্য, বিনয় ও সহানুভূতির দিকে টানতে পারে, এবং—সবচেয়ে গুরুত্বপূর্ণ—এক ন্যায়বান ও দয়াময় পরকালের প্রেক্ষাপটে স্থাপিত, যেখানে অন্যায়ের সুরাহা হয় এবং ঈমানের সাথে সহ্য করা কষ্ট বৃথা যায় না। ইসলাম প্রতিটি নির্দিষ্ট "কেন"-র উত্তর দেওয়ার দাবি করে না, তবে বলে যে দুঃখ-কষ্ট এমন এক আল্লাহর সাথে সাংঘর্ষিক নয় যিনি একই সাথে দয়াময় ও ন্যায়বান।',
        },
      },
      {
        q: { en: 'Isn’t religion a cause of conflict?', bn: 'ধর্ম কি সংঘাতের কারণ নয়?' },
        a: {
          en: 'Conflicts have many roots — power, land, resources, identity and injustice — and religion is sometimes invoked in them, honestly or as a pretext. Islam distinguishes between its teachings and the misuse of its name: it commands justice even toward those one dislikes (Quran 5:8), forbids compulsion in faith (Quran 2:256), and upholds the sanctity of innocent life. When people act cruelly in religion’s name, the fair response is to ask whether they are following its actual teachings, not to assume the teachings themselves require cruelty. Islam calls its followers to be a source of peace, mercy and justice.',
          bn: 'সংঘাতের বহু মূল আছে—ক্ষমতা, ভূমি, সম্পদ, পরিচয় ও অবিচার—এবং কখনো এতে ধর্মের নাম নেওয়া হয়, সৎভাবে বা অজুহাত হিসেবে। ইসলাম তার শিক্ষা ও তার নামের অপব্যবহারের মধ্যে পার্থক্য করে: এটি অপছন্দের মানুষের প্রতিও ন্যায়ের নির্দেশ দেয় (কুরআন ৫:৮), বিশ্বাসে জবরদস্তি নিষেধ করে (কুরআন ২:২৫৬), এবং নিরপরাধ জীবনের পবিত্রতা সমুন্নত রাখে। যখন মানুষ ধর্মের নামে নিষ্ঠুরতা করে, ন্যায্য প্রতিক্রিয়া হলো প্রশ্ন করা যে তারা কি এর প্রকৃত শিক্ষা অনুসরণ করছে—শিক্ষাটিই নিষ্ঠুরতা দাবি করে বলে ধরে নেওয়া নয়। ইসলাম তার অনুসারীদের শান্তি, দয়া ও ন্যায়ের উৎস হতে আহ্বান জানায়।',
        },
      },
      {
        q: { en: 'Is Islam compatible with reason and science?', bn: 'ইসলাম কি যুক্তি ও বিজ্ঞানের সাথে সঙ্গতিপূর্ণ?' },
        a: {
          en: 'Islam repeatedly urges people to observe the natural world, reflect and reason, and the pursuit of knowledge is highly valued in its tradition. It sees the Quran and the created world as coming from the same source, so genuine truth about nature is not feared. Importantly, Muslims are cautioned against forcing modern scientific claims into scripture or treating the Quran as a science textbook — its purpose is moral and spiritual guidance. On its own terms, science studies how the physical world works, while religion addresses meaning, purpose and morality; Islam regards these as complementary rather than in conflict.',
          bn: 'ইসলাম বারবার মানুষকে প্রকৃতি পর্যবেক্ষণ, অনুধ্যান ও যুক্তি প্রয়োগে তাগিদ দেয়, এবং জ্ঞানার্জন এর ঐতিহ্যে অত্যন্ত মূল্যবান। এটি কুরআন ও সৃষ্ট জগৎকে একই উৎস থেকে আগত হিসেবে দেখে, তাই প্রকৃতি সম্পর্কে সত্যকে ভয় করে না। গুরুত্বপূর্ণভাবে, মুসলিমদের সতর্ক করা হয় আধুনিক বৈজ্ঞানিক দাবিকে শাস্ত্রে জোর করে ঢোকানো বা কুরআনকে বিজ্ঞানের পাঠ্যবই হিসেবে গণ্য করা থেকে—এর উদ্দেশ্য নৈতিক ও আধ্যাত্মিক হিদায়াত। নিজ নিজ পরিসরে, বিজ্ঞান অধ্যয়ন করে ভৌত জগৎ কীভাবে কাজ করে, আর ধর্ম আলোচনা করে অর্থ, উদ্দেশ্য ও নৈতিকতা; ইসলাম এদের সাংঘর্ষিক নয়, বরং পরিপূরক হিসেবে দেখে।',
        },
      },
      {
        q: { en: 'What about people who never heard the message?', bn: 'যারা কখনো এই বার্তা শোনেনি তাদের কী হবে?' },
        a: {
          en: 'Islam teaches that God is perfectly just and never wrongs anyone, and that people are only held responsible according to what genuinely reached them and their capacity to respond (Quran 17:15 — "We would not punish until We had sent a messenger"). The precise fate of those who never received a clear message is treated by scholars as ultimately in the hands of a just and merciful God, who judges each person fairly and knows their circumstances. Muslims are taught to trust in that justice and mercy rather than to pronounce on individuals.',
          bn: 'ইসলাম শেখায় যে আল্লাহ পরিপূর্ণ ন্যায়বান এবং কারও প্রতি অবিচার করেন না, এবং মানুষকে কেবল ততটুকুর জন্যই দায়ী করা হয় যা প্রকৃতপক্ষে তার কাছে পৌঁছেছে ও সাড়া দেওয়ার সামর্থ্য অনুযায়ী (কুরআন ১৭:১৫—"আমি রাসুল না পাঠানো পর্যন্ত শাস্তি দিই না")। যারা কখনো স্পষ্ট বার্তা পায়নি তাদের সুনির্দিষ্ট পরিণতিকে আলিমগণ চূড়ান্তভাবে এক ন্যায়বান ও দয়াময় আল্লাহর হাতে ন্যস্ত হিসেবে দেখেন, যিনি প্রত্যেককে ন্যায্যভাবে বিচার করেন ও তার পরিস্থিতি জানেন। মুসলিমদের শেখানো হয় ব্যক্তিবিশেষ নিয়ে রায় দেওয়ার বদলে সেই ন্যায় ও দয়ায় ভরসা রাখতে।',
        },
      },
      {
        q: { en: 'Why does Islam have laws about daily life?', bn: 'ইসলামে দৈনন্দিন জীবন নিয়ে বিধান কেন?' },
        a: {
          en: 'Islam sees faith as touching all of life, not just private worship, so its guidance covers ethics, family, food, finance and community. Rather than restrictions for their own sake, these are understood as a framework meant to protect what matters — life, dignity, family, property and faith — and to cultivate discipline, gratitude and care for others. Many rulings come with stated purposes and allow for genuine need and ease. The aim is a balanced, meaningful life, and the details are studied with qualified scholars.',
          bn: 'ইসলাম বিশ্বাসকে দেখে সমগ্র জীবনকে স্পর্শকারী হিসেবে, কেবল ব্যক্তিগত ইবাদত নয়; তাই এর হিদায়াত নৈতিকতা, পরিবার, খাদ্য, অর্থ ও সমাজকে অন্তর্ভুক্ত করে। এগুলো নিছক বিধিনিষেধ নয়, বরং এমন এক কাঠামো হিসেবে বোঝা হয় যা গুরুত্বপূর্ণ বিষয়—জীবন, মর্যাদা, পরিবার, সম্পদ ও দ্বীন—রক্ষা করে এবং শৃঙ্খলা, কৃতজ্ঞতা ও অন্যের প্রতি যত্ন গড়ে তোলে। বহু বিধান তার উদ্দেশ্যসহ আসে এবং প্রকৃত প্রয়োজন ও সহজতার অবকাশ রাখে। লক্ষ্য এক ভারসাম্যপূর্ণ, অর্থবহ জীবন, আর বিস্তারিত যোগ্য আলিমদের সাথে অধ্যয়ন করা হয়।',
        },
      },
      {
        q: { en: 'What is the goal of da‘wah — isn’t belief personal?', bn: 'দাওয়াহর লক্ষ্য কী—বিশ্বাস কি ব্যক্তিগত নয়?' },
        a: {
          en: 'Belief is indeed personal, and Islam insists it cannot be forced: "There shall be no compulsion in religion" (Quran 2:256). Da‘wah, at its best, is simply sharing what one finds true and beneficial, and answering questions honestly — much as people share any conviction they value. Its goal is to inform and invite, respectfully and without coercion, leaving the response entirely to the other person. Sincere da‘wah listens as much as it speaks, respects the dignity of the listener, and never demeans anyone for believing differently.',
          bn: 'বিশ্বাস প্রকৃতপক্ষেই ব্যক্তিগত, এবং ইসলাম জোর দেয় যে তা চাপিয়ে দেওয়া যায় না: "দ্বীনের ব্যাপারে কোনো জবরদস্তি নেই" (কুরআন ২:২৫৬)। দাওয়াহ, তার শ্রেষ্ঠ রূপে, নিছক নিজের কাছে সত্য ও কল্যাণকর মনে হওয়া বিষয় ভাগ করে নেওয়া এবং প্রশ্নের সৎ উত্তর দেওয়া—যেমন মানুষ যেকোনো মূল্যবান বিশ্বাস ভাগ করে নেয়। এর লক্ষ্য জানানো ও আমন্ত্রণ জানানো, শ্রদ্ধার সাথে ও জবরদস্তি ছাড়াই, সাড়া দেওয়ার বিষয়টি সম্পূর্ণ অপর ব্যক্তির উপর ছেড়ে। আন্তরিক দাওয়াহ যতটা বলে ততটা শোনে, শ্রোতার মর্যাদাকে সম্মান করে, এবং ভিন্ন বিশ্বাসের জন্য কাউকে কখনো হেয় করে না।',
        },
      },
      {
        q: { en: 'Aren’t all religions basically the same?', bn: 'সব ধর্ম কি মূলত একই নয়?' },
        a: {
          en: 'Religions genuinely share much — a call to compassion, humility and meaning — and Islam honours that common ground and the sincerity of people who seek God. At the same time, they make different claims about the nature of God, the purpose of life and how we are saved, and these differences are real, not trivial. Islam respects the questioner and the shared values, while holding that truth about God matters and that its own account of pure monotheism is the one to weigh carefully.',
          bn: 'ধর্মগুলো প্রকৃতপক্ষে অনেক কিছু ভাগ করে নেয়—দয়া, বিনয় ও অর্থের আহ্বান—এবং ইসলাম এই অভিন্ন ভিত্তি ও আল্লাহ-অন্বেষী মানুষের আন্তরিকতাকে সম্মান করে। একই সঙ্গে, ঈশ্বরের স্বরূপ, জীবনের উদ্দেশ্য ও মুক্তির পথ নিয়ে তারা ভিন্ন দাবি করে, আর এই পার্থক্যগুলো বাস্তব, তুচ্ছ নয়। ইসলাম প্রশ্নকর্তা ও অভিন্ন মূল্যবোধকে সম্মান করে, তবে মনে করে ঈশ্বর সম্পর্কে সত্য গুরুত্বপূর্ণ, এবং তার বিশুদ্ধ একত্ববাদের বিবরণটিই যত্নসহকারে বিবেচনার যোগ্য।',
        },
      },
      {
        q: { en: 'Why does Islam say it is the final and complete religion?', bn: 'ইসলাম কেন বলে যে তা চূড়ান্ত ও পূর্ণাঙ্গ ধর্ম?' },
        a: {
          en: 'Islam teaches that God sent prophets to every people, and that this same guidance was completed and preserved in its final form through Muhammad (peace be upon him): "This day I have perfected for you your religion" (Quran 5:3). "Final" means no further prophet is needed because the core message — worship the one God and live justly — is now complete and safeguarded, not that earlier prophets were false. It is an invitation to a message believed to be intact, offered without compulsion (Quran 2:256).',
          bn: 'ইসলাম শেখায় যে আল্লাহ প্রত্যেক জাতির কাছে নবী পাঠিয়েছেন, এবং এই একই হিদায়াত মুহাম্মাদ (তাঁর প্রতি শান্তি)-এর মাধ্যমে চূড়ান্ত রূপে পূর্ণ ও সংরক্ষিত হয়েছে: "আজ আমি তোমাদের জন্য তোমাদের দ্বীন পূর্ণ করে দিলাম" (কুরআন ৫:৩)। "চূড়ান্ত"-এর অর্থ, আর কোনো নবীর প্রয়োজন নেই কারণ মূল বার্তা—এক আল্লাহর ইবাদত ও ন্যায়সংগত জীবন—এখন পূর্ণ ও সুরক্ষিত; এর অর্থ এই নয় যে পূর্ববর্তী নবীরা মিথ্যা ছিলেন। এটি অটুট বলে বিশ্বাসকৃত এক বার্তার প্রতি আমন্ত্রণ, জবরদস্তি ছাড়াই (কুরআন ২:২৫৬)।',
        },
      },
      {
        q: { en: 'What does Islam say about earlier scriptures and prophets?', bn: 'পূর্ববর্তী কিতাব ও নবীদের সম্পর্কে ইসলাম কী বলে?' },
        a: {
          en: 'Islam requires belief in all of God’s prophets — including Abraham, Moses and Jesus (peace be upon them) — and honours the original revelations given to them, such as the Torah and the Gospel, as having been true guidance from God. Muslims believe the final revelation, the Quran, confirms the core truth those prophets taught and serves as the preserved standard. This is a stance of deep respect for the prophetic tradition, not rejection of it.',
          bn: 'ইসলাম আল্লাহর সকল নবীর প্রতি—ইব্রাহিম, মূসা ও ঈসা (তাঁদের প্রতি শান্তি) সহ—ঈমান আনা আবশ্যক করে, এবং তাঁদের প্রতি অবতীর্ণ মূল ওহি, যেমন তাওরাত ও ইনজিল, আল্লাহর সত্য হিদায়াত হিসেবে সম্মান করে। মুসলিমরা বিশ্বাস করে যে চূড়ান্ত ওহি কুরআন সেই নবীদের শেখানো মূল সত্যকে নিশ্চিত করে এবং সংরক্ষিত মানদণ্ড হিসেবে কাজ করে। এটি নবুয়তি ঐতিহ্যের প্রতি গভীর শ্রদ্ধার অবস্থান, প্রত্যাখ্যানের নয়।',
        },
      },
      {
        q: { en: 'Isn’t faith just blind belief?', bn: 'ঈমান কি নিছক অন্ধ বিশ্বাস নয়?' },
        a: {
          en: 'In Islam faith (iman) is not meant to be blind. The Quran repeatedly appeals to reason, evidence and reflection — inviting people to observe nature, weigh arguments and think ("Do they not reflect…?" recurs throughout). Faith is trust built on grounds one has considered, and it grows through knowledge and sincerity. Certainly it also involves trust beyond what can be fully proven, as most deep human commitments do — but it is invited to begin with honest thinking, not the switching off of the mind.',
          bn: 'ইসলামে ঈমান অন্ধ হওয়ার কথা নয়। কুরআন বারবার যুক্তি, প্রমাণ ও চিন্তার প্রতি আহ্বান জানায়—মানুষকে প্রকৃতি পর্যবেক্ষণ, যুক্তি বিবেচনা ও চিন্তা করতে ডাকে ("তারা কি চিন্তা করে না?"—বারবার আসে)। ঈমান হলো এমন আস্থা যা বিবেচিত ভিত্তির উপর গড়ে ওঠে, এবং জ্ঞান ও আন্তরিকতায় বৃদ্ধি পায়। অবশ্যই এতে সম্পূর্ণ প্রমাণযোগ্যতার বাইরেও আস্থা থাকে, যেমন মানুষের গভীর অঙ্গীকারগুলোতে থাকে—তবে এর সূচনা সৎ চিন্তা দিয়ে, মন বন্ধ করে নয়।',
        },
      },
      {
        q: { en: 'What about free will and the problem of evil?', bn: 'স্বাধীন ইচ্ছা ও মন্দের সমস্যা সম্পর্কে কী?' },
        a: {
          en: 'Islam affirms that God gives human beings real moral choice, and that this life is a meaningful test (Quran 67:2). Much suffering flows from the freedom to do right or wrong, which is what makes goodness meaningful. Other hardships, Islam teaches, carry wisdom we may not fully see, can be a means of growth and mercy, and are set against a just accounting and reward in the hereafter where wrongs are addressed. It does not claim every "why" is answered here, but that evil does not defeat a wise and just God.',
          bn: 'ইসলাম নিশ্চিত করে যে আল্লাহ মানুষকে প্রকৃত নৈতিক পছন্দ দিয়েছেন, এবং এই জীবন এক অর্থবহ পরীক্ষা (কুরআন ৬৭:২)। অনেক কষ্ট আসে ভালো-মন্দ করার স্বাধীনতা থেকে, যা কল্যাণকে অর্থবহ করে তোলে। অন্যান্য দুর্ভোগ, ইসলামের শিক্ষা অনুযায়ী, এমন প্রজ্ঞা বহন করে যা আমরা পুরোপুরি দেখতে না-ও পারি, তা বৃদ্ধি ও রহমতের উপায় হতে পারে, এবং আখিরাতে এক ন্যায়সংগত হিসাব ও প্রতিদানের প্রেক্ষাপটে স্থাপিত যেখানে অন্যায়ের সুরাহা হবে। এটি দাবি করে না যে প্রতিটি "কেন"-র উত্তর এখানেই আছে, বরং বলে যে মন্দ এক প্রজ্ঞাময় ও ন্যায়বান আল্লাহকে পরাস্ত করতে পারে না।',
        },
      },
      {
        q: { en: 'Why the Quran and not another book?', bn: 'অন্য কোনো গ্রন্থ নয়, কুরআন কেন?' },
        a: {
          en: 'Muslims point to a combination of features they invite others to examine together: its remarkable preservation in memory and text, its open and unmet literary challenge, its inner consistency across twenty-three years, its rational and moral coherence, and the character of the unlettered man who conveyed it. No single point is treated as a knock-down proof; rather, taken together they are offered as reasonable grounds to read the Quran seriously and judge for oneself.',
          bn: 'মুসলিমরা এমন কিছু বৈশিষ্ট্যের সমষ্টির দিকে ইঙ্গিত করে, যা তারা অন্যদের একসাথে পরীক্ষা করতে আমন্ত্রণ জানায়: স্মৃতি ও লিখিত রূপে এর অসাধারণ সংরক্ষণ, এর উন্মুক্ত ও অপূরিত সাহিত্যিক চ্যালেঞ্জ, তেইশ বছর জুড়ে এর অভ্যন্তরীণ সামঞ্জস্য, এর যৌক্তিক ও নৈতিক সংগতি, এবং যে নিরক্ষর ব্যক্তি এটি পৌঁছে দিয়েছেন তাঁর চরিত্র। কোনো একটি বিষয়কেই চূড়ান্ত প্রমাণ ধরা হয় না; বরং একত্রে এগুলো কুরআনকে গুরুত্বসহ পড়ে নিজে বিচার করার যুক্তিসংগত ভিত্তি হিসেবে উপস্থাপিত হয়।',
        },
      },
      {
        q: { en: 'Why does God allow disbelief to exist?', bn: 'আল্লাহ অবিশ্বাসের অস্তিত্ব কেন অনুমোদন করেন?' },
        a: {
          en: 'Because, in the Islamic view, God willed a world of genuine choice rather than compelled conformity. Faith has value precisely because it can be freely given: "And say: The truth is from your Lord, so whoever wills — let him believe; and whoever wills — let him disbelieve" (Quran 18:29). The Quran even reminds the Prophet that he cannot force hearts: "Would you then compel the people until they become believers?" (Quran 10:99). God could have created beings without choice, but a freely chosen love of truth is more meaningful than an automatic one. Disbelief existing is thus part of the same freedom that makes belief significant — and judgement on hearts belongs to God alone, not to us.',
          bn: 'কারণ, ইসলামের দৃষ্টিতে, আল্লাহ চেয়েছেন প্রকৃত পছন্দের এক জগৎ, বাধ্যতামূলক আনুগত্যের নয়। ঈমান মূল্যবান ঠিক এ কারণেই যে তা স্বাধীনভাবে দেওয়া যায়: "বলো: সত্য তোমাদের রবের পক্ষ থেকে; সুতরাং যার ইচ্ছা সে ঈমান আনুক, আর যার ইচ্ছা সে অবিশ্বাস করুক" (কুরআন ১৮:২৯)। কুরআন এমনকি নবীকেও স্মরণ করিয়ে দেয় যে তিনি হৃদয়কে বাধ্য করতে পারেন না: "তবে কি তুমি মানুষকে বাধ্য করবে, যতক্ষণ না তারা মুমিন হয়?" (কুরআন ১০:৯৯)। আল্লাহ পছন্দহীন সৃষ্টি বানাতে পারতেন, কিন্তু স্বাধীনভাবে বেছে নেওয়া সত্যপ্রীতি স্বয়ংক্রিয় প্রীতির চেয়ে বেশি অর্থবহ। অবিশ্বাসের অস্তিত্ব তাই সেই একই স্বাধীনতার অংশ যা বিশ্বাসকে তাৎপর্যপূর্ণ করে—আর হৃদয়ের বিচার একমাত্র আল্লাহর, আমাদের নয়।',
        },
      },
      {
        q: { en: 'Do the good deeds of non-Muslims count?', bn: 'অমুসলিমদের ভালো কাজ কি গণ্য হয়?' },
        a: {
          en: 'Islam affirms without hesitation that God is perfectly just and that no good is ever ignored by Him: "whoever does an atom’s weight of good will see it" (Quran 99:7). Scholars explain that sincere kindness, honesty and charity are genuinely good whoever performs them, that God rewards good in ways of His choosing in this world and judges every person with complete fairness — taking into account what truly reached them and their sincerity. The fullest reward of the hereafter is tied, in Islamic teaching, to faith in God; yet Muslims are taught to honour goodness wherever they see it, to leave final judgement of individuals entirely to God, and to trust that "your Lord does not wrong anyone" (Quran 18:49).',
          bn: 'ইসলাম দ্বিধাহীনভাবে নিশ্চিত করে যে আল্লাহ পরিপূর্ণ ন্যায়বান এবং কোনো কল্যাণ তাঁর কাছে কখনো উপেক্ষিত হয় না: "কেউ অণু পরিমাণ ভালো করলে তা দেখবে" (কুরআন ৯৯:৭)। আলিমগণ ব্যাখ্যা করেন যে আন্তরিক দয়া, সততা ও দান যে-ই করুক তা প্রকৃতই ভালো; আল্লাহ এই জগতে তাঁর নিজের পছন্দের উপায়ে কল্যাণের প্রতিদান দেন এবং প্রত্যেক মানুষকে সম্পূর্ণ ন্যায্যতায় বিচার করেন—কার কাছে প্রকৃতপক্ষে কী পৌঁছেছে ও তার আন্তরিকতা বিবেচনায় নিয়ে। ইসলামি শিক্ষায় আখিরাতের পূর্ণতম প্রতিদান আল্লাহতে ঈমানের সাথে যুক্ত; তবু মুসলিমদের শেখানো হয় কল্যাণ যেখানেই দেখুক তাকে সম্মান করতে, ব্যক্তির চূড়ান্ত বিচার সম্পূর্ণ আল্লাহর হাতে ছেড়ে দিতে, এবং ভরসা রাখতে যে "তোমার রব কারও প্রতি অবিচার করেন না" (কুরআন ১৮:৪৯)।',
        },
      },
      {
        q: { en: 'Why Arabic — can I only connect with God in Arabic?', bn: 'আরবি কেন—আমি কি কেবল আরবিতেই আল্লাহর সাথে সংযোগ করতে পারি?' },
        a: {
          en: 'No — God understands every language and every heart, and personal supplication (dua) may be made in any language, at any time. The Quran states that every messenger was sent in his own people’s tongue (Quran 14:4); Arabic is the language the final revelation happened to come in, so it is preserved and recited in its original words rather than only in translation — which is also why one text unites worshippers of every nationality in prayer. Muslims are encouraged to learn the meaning through translations and study in their own language, and new Muslims learn the short Arabic portions of the ritual prayer gradually. The connection of the heart is never restricted to Arabic.',
          bn: 'না—আল্লাহ প্রতিটি ভাষা ও প্রতিটি হৃদয় বোঝেন, এবং ব্যক্তিগত প্রার্থনা (দুআ) যেকোনো ভাষায়, যেকোনো সময় করা যায়। কুরআন বলে যে প্রত্যেক রাসুলকে তাঁর নিজ জাতির ভাষায় পাঠানো হয়েছে (কুরআন ১৪:৪); আরবি সেই ভাষা যাতে চূড়ান্ত ওহি এসেছে, তাই তা কেবল অনুবাদে নয়, মূল শব্দে সংরক্ষিত ও তিলাওয়াত করা হয়—এ কারণেই একটি অভিন্ন টেক্সট সব জাতির উপাসকদের নামাজে ঐক্যবদ্ধ করে। মুসলিমদের উৎসাহ দেওয়া হয় নিজ ভাষায় অনুবাদ ও অধ্যয়নের মাধ্যমে অর্থ শিখতে, আর নতুন মুসলিমরা নামাজের সংক্ষিপ্ত আরবি অংশগুলো ধীরে ধীরে শেখেন। হৃদয়ের সংযোগ কখনোই আরবিতে সীমাবদ্ধ নয়।',
        },
      },
      {
        q: { en: 'Is Islam fatalistic about effort and ambition?', bn: 'প্রচেষ্টা ও উচ্চাকাঙ্ক্ষা নিয়ে ইসলাম কি নিয়তিবাদী?' },
        a: {
          en: 'No. Belief in divine decree (qadar) is often mistaken for fatalism, but mainstream Islam explicitly rejects using destiny as an excuse for passivity. The Quran ties outcomes to striving — "man will only have that for which he strives" (Quran 53:39) — and a famous prophetic teaching counsels a man to tie his camel first and then trust in God. Work, learning, planning, excellence and honest ambition are praised in Islamic teaching; trust in God (tawakkul) comes after one’s best effort, not instead of it. What qadar adds is peace of mind: having genuinely tried, a believer is freed from crushing anxiety over results that were never in their hands.',
          bn: 'না। তাকদিরে (কদর) বিশ্বাসকে প্রায়ই নিয়তিবাদ ভাবা হয়, কিন্তু মূলধারার ইসলাম ভাগ্যকে নিষ্ক্রিয়তার অজুহাত বানানো স্পষ্টভাবে প্রত্যাখ্যান করে। কুরআন ফলাফলকে প্রচেষ্টার সাথে যুক্ত করে—"মানুষ কেবল তা-ই পায় যার জন্য সে চেষ্টা করে" (কুরআন ৫৩:৩৯)—এবং এক প্রসিদ্ধ নবীসুলভ শিক্ষা একজনকে পরামর্শ দেয় আগে উট বেঁধে তারপর আল্লাহর উপর ভরসা রাখতে। কাজ, শেখা, পরিকল্পনা, উৎকর্ষ ও সৎ উচ্চাকাঙ্ক্ষা ইসলামি শিক্ষায় প্রশংসিত; আল্লাহর উপর ভরসা (তাওয়াক্কুল) আসে সর্বোচ্চ প্রচেষ্টার পরে, তার বদলে নয়। কদর যা যোগ করে তা হলো মনের শান্তি: প্রকৃত চেষ্টার পর, বিশ্বাসী সেই ফলাফলের দুর্বিষহ দুশ্চিন্তা থেকে মুক্ত হয় যা কখনোই তার হাতে ছিল না।',
        },
      },
      {
        q: { en: 'If Islam is true, why are some Muslims bad examples?', bn: 'ইসলাম যদি সত্য হয়, তবে কিছু মুসলিম মন্দ উদাহরণ কেন?' },
        a: {
          en: 'This is a fair and painful observation, and Islam asks us to separate the message from the messenger. A teaching is not disproved by those who fail to live up to it, any more than medicine is discredited by a patient who ignores the prescription. The Quran holds each soul responsible for itself (Quran 53:38–39) and repeatedly rebukes those who preach good yet neglect it (Quran 2:44). Muslims are not taught that believers are sinless — only that the standard they fall short of is a true one. The honest test of Islam is what it actually teaches and the example of the Prophet (peace be upon him), not the worst behaviour of some who carry its name. It is also worth meeting the many Muslims whose faith makes them kinder, more just and more generous, before judging the whole by a few.',
          bn: 'এটি এক ন্যায্য ও বেদনাদায়ক পর্যবেক্ষণ, এবং ইসলাম আমাদের বলে বার্তা ও বার্তাবাহককে আলাদা করতে। যে ওষুধের নির্দেশনা রোগী উপেক্ষা করে তাতে যেমন ওষুধ মিথ্যা হয় না, তেমনি যারা কোনো শিক্ষায় উঠতে ব্যর্থ হয় তাদের দিয়ে সেই শিক্ষা খণ্ডিত হয় না। কুরআন প্রত্যেক আত্মাকে নিজের জন্য দায়ী করে (কুরআন ৫৩:৩৮–৩৯) এবং বারবার তাদের ভর্ৎসনা করে যারা ভালোর উপদেশ দেয় অথচ নিজে তা অবহেলা করে (কুরআন ২:৪৪)। মুসলিমদের শেখানো হয় না যে বিশ্বাসীরা নিষ্পাপ—কেবল এটুকু যে তারা যে মানদণ্ডে ঘাটতি রাখে তা সত্য। ইসলামের সৎ পরীক্ষা হলো এটি প্রকৃতপক্ষে কী শেখায় ও নবী (তাঁর প্রতি শান্তি)-এর আদর্শ, কিছু নামধারীর নিকৃষ্টতম আচরণ নয়। গোটাকে অল্প কিছু দিয়ে বিচার করার আগে সেই বহু মুসলিমের সাথেও দেখা করা উচিত যাদের ঈমান তাদের অধিক দয়ালু, ন্যায়পরায়ণ ও উদার করে তোলে।',
        },
      },
      {
        q: { en: 'How do I know which religion — or which sect — is correct?', bn: 'আমি কীভাবে জানব কোন ধর্ম—বা কোন মাযহাব—সঠিক?' },
        a: {
          en: 'Islam invites you to sincerely seek, to reason, and to ask God for guidance rather than to choose blindly. For weighing between religions, it points to examinable questions: which account of God is coherent and free of contradiction, which scripture is preserved intact, and which message reasonably fits the world and the moral sense we find in ourselves. For questions within Islam, the mainstream Sunni approach is to hold to the Quran and the authentic teaching of the Prophet (peace be upon him) as understood by the broad body of Muslims across the generations, rather than to follow narrow or novel factions. Differences of scholarly opinion on the details of practice have long existed within accepted limits and are studied with qualified teachers. Above all, a sincere seeker is encouraged to keep learning, to ask honest questions, and to pray for truth — trusting that God guides the one who genuinely seeks Him.',
          bn: 'ইসলাম আপনাকে আমন্ত্রণ জানায় আন্তরিকভাবে অন্বেষণ করতে, যুক্তি প্রয়োগ করতে, এবং অন্ধভাবে বেছে নেওয়ার বদলে আল্লাহর কাছে হিদায়াত চাইতে। ধর্মগুলোর মধ্যে বিচারের জন্য এটি পরীক্ষণযোগ্য প্রশ্নের দিকে ইঙ্গিত করে: ঈশ্বরের কোন বিবরণ সুসংগত ও দ্বন্দ্বমুক্ত, কোন কিতাব অটুটভাবে সংরক্ষিত, এবং কোন বার্তা জগৎ ও নিজেদের মধ্যে পাওয়া নৈতিক বোধের সাথে যুক্তিসংগতভাবে মেলে। ইসলামের অভ্যন্তরের প্রশ্নে, মূলধারার সুন্নি পন্থা হলো কুরআন এবং নবী (তাঁর প্রতি শান্তি)-এর বিশুদ্ধ শিক্ষাকে ধরে রাখা—প্রজন্ম-পরম্পরায় বিস্তৃত মুসলিম সমাজ যেভাবে তা বুঝেছে সেভাবে—সংকীর্ণ বা নবউদ্ভূত দলাদলির অনুসরণ নয়। আমল-বিষয়ক খুঁটিনাটিতে আলিমদের মতপার্থক্য গ্রহণযোগ্য সীমার মধ্যে বহুকাল ধরে বিদ্যমান এবং যোগ্য শিক্ষকের সাথে অধ্যয়ন করা হয়। সর্বোপরি, আন্তরিক অন্বেষীকে উৎসাহ দেওয়া হয় শেখা চালিয়ে যেতে, সৎ প্রশ্ন করতে, ও সত্যের জন্য প্রার্থনা করতে—এই ভরসায় যে আল্লাহ তাকেই পথ দেখান যে প্রকৃতভাবে তাঁকে অন্বেষণ করে।',
        },
      },
      {
        q: { en: 'Does Islam oppress women?', bn: 'ইসলাম কি নারীকে নিপীড়ন করে?' },
        a: {
          en: 'Islam distinguishes sharply between its teachings and the cultural practices sometimes carried out in its name, which it does not endorse. As teaching, Islam affirms that men and women are equal in their humanity, spiritual worth and accountability before God: "whoever does righteousness, whether male or female, while being a believer — We will surely cause them to live a good life" (Quran 16:97). In its own historical context it established rights that were far-reaching: a woman’s own right to own and inherit property and to keep her wealth after marriage, to consent to her marriage, to seek knowledge (the Prophet said seeking knowledge is an obligation on every Muslim, male and female), to run a business, and to be treated with kindness — "the best of you are the best to their women." Men and women share the same core duties of faith and worship. Islam assigns some complementary roles and responsibilities, which it frames as balanced rather than hierarchical in worth. Where women are genuinely wronged, the fair question is whether the culture or the individual is departing from these teachings — for Islam itself commands honour, justice and gentleness toward women.',
          bn: 'ইসলাম তার শিক্ষা এবং তার নামে কখনো চালানো সাংস্কৃতিক প্রথার মধ্যে স্পষ্ট পার্থক্য করে, যে প্রথাগুলো সে অনুমোদন করে না। শিক্ষা হিসেবে ইসলাম নিশ্চিত করে যে নারী ও পুরুষ তাদের মানবতা, আধ্যাত্মিক মূল্য ও আল্লাহর কাছে জবাবদিহিতায় সমান: "যে সৎকর্ম করে, সে পুরুষ হোক বা নারী, আর সে মুমিন—আমি অবশ্যই তাকে উত্তম জীবন দান করব" (কুরআন ১৬:৯৭)। নিজ ঐতিহাসিক প্রেক্ষাপটে এটি সুদূরপ্রসারী অধিকার প্রতিষ্ঠা করেছিল: নারীর নিজের সম্পত্তির মালিকানা ও উত্তরাধিকারের অধিকার এবং বিবাহের পরও নিজ সম্পদ রাখার অধিকার, বিবাহে সম্মতি দেওয়ার অধিকার, জ্ঞান অন্বেষণের অধিকার (নবী বলেছেন জ্ঞান অন্বেষণ প্রত্যেক মুসলিম নারী-পুরুষের উপর ফরজ), ব্যবসা পরিচালনার অধিকার, এবং সদয় আচরণ পাওয়ার অধিকার—"তোমাদের মধ্যে সেই উত্তম যে তার নারীদের প্রতি উত্তম।" নারী ও পুরুষ ঈমান ও ইবাদতের একই মূল কর্তব্য ভাগ করে নেয়। ইসলাম কিছু পরিপূরক ভূমিকা ও দায়িত্ব নির্ধারণ করে, যা সে মূল্যের দিক থেকে শ্রেণিবিন্যাস নয়, বরং ভারসাম্য হিসেবে উপস্থাপন করে। যেখানে নারীরা প্রকৃতপক্ষে অন্যায়ের শিকার, সেখানে ন্যায্য প্রশ্ন হলো সংস্কৃতি বা ব্যক্তি এই শিক্ষা থেকে সরে যাচ্ছে কি না—কারণ ইসলাম নিজে নারীর প্রতি সম্মান, ন্যায় ও কোমলতার নির্দেশ দেয়।',
        },
      },
      {
        q: { en: 'What happens to someone who sincerely never heard of Islam?', bn: 'যে ব্যক্তি আন্তরিকভাবে কখনো ইসলামের কথা শোনেনি তার কী হবে?' },
        a: {
          en: 'Islam grounds its answer in the perfect justice of God, who "does not wrong anyone" (Quran 18:49) and does not hold people to account for a message that never genuinely reached them: "We would not punish until We had sent a messenger" (Quran 17:15). Scholars discuss such people under the category of ahl al-fatrah — those living without a clear prophetic message — and the widely held view is that their case rests entirely with God, who judges each person with complete fairness according to their sincerity and the light that actually reached them. A common scholarly position is that God will deal with them justly and mercifully, in a manner He knows best. Muslims are therefore taught not to pronounce the fate of any individual, but to trust that no sincere soul is ever wronged by a God who is both perfectly just and boundlessly merciful.',
          bn: 'ইসলাম তার উত্তরের ভিত্তি রাখে আল্লাহর পরিপূর্ণ ন্যায়ের উপর, যিনি "কারও প্রতি অবিচার করেন না" (কুরআন ১৮:৪৯) এবং যে বার্তা প্রকৃতপক্ষে কারও কাছে পৌঁছায়নি তার জন্য তাকে দায়ী করেন না: "আমি রাসুল না পাঠানো পর্যন্ত শাস্তি দিই না" (কুরআন ১৭:১৫)। আলিমগণ এমন মানুষদের আলোচনা করেন আহলুল ফাতরাহ শ্রেণির অধীনে—যারা কোনো স্পষ্ট নবুয়তি বার্তা ছাড়াই জীবন কাটিয়েছে—এবং ব্যাপকভাবে গৃহীত মত হলো, তাদের বিষয়টি সম্পূর্ণ আল্লাহর হাতে ন্যস্ত, যিনি প্রত্যেককে তার আন্তরিকতা ও প্রকৃতপক্ষে তার কাছে পৌঁছানো আলো অনুযায়ী সম্পূর্ণ ন্যায্যতায় বিচার করেন। একটি সাধারণ শাস্ত্রীয় অবস্থান হলো, আল্লাহ তাদের সাথে ন্যায় ও দয়ার সাথে আচরণ করবেন, যেভাবে তিনি সর্বোত্তম জানেন। তাই মুসলিমদের শেখানো হয় কোনো ব্যক্তির পরিণতি ঘোষণা না করতে, বরং ভরসা রাখতে যে পরিপূর্ণ ন্যায়বান ও অসীম দয়াময় আল্লাহর কাছে কোনো আন্তরিক আত্মা কখনো অবিচারিত হয় না।',
        },
      },
    ],
  },
  {
    id: 'objections',
    emoji: '🧩',
    kind: 'qa',
    noteKey: 'whyislam_objections_note',
    qaLabel: { en: 'Objection', bn: 'আপত্তি' },
    title: { en: 'Common Objections & Responses', bn: 'সাধারণ আপত্তি ও জবাব' },
    summary: {
      en: 'Sincere objections stated fairly, then answered with the classical, reasoned Islamic response.',
      bn: 'আন্তরিক আপত্তি ন্যায্যভাবে উপস্থাপন, তারপর ধ্রুপদী ও যুক্তিসংগত ইসলামি জবাব।',
    },
    qa: [
      {
        q: { en: 'Isn’t the Quran just a product of its time and culture?', bn: 'কুরআন কি নিছক তার যুগ ও সংস্কৃতির ফসল নয়?' },
        a: {
          en: 'The objection: the Quran arose in seventh-century Arabia, speaks Arabic, and addresses that society’s concerns, so perhaps it merely reflects its human setting. Response: any message must reach a people in their own language and context — "We did not send any messenger except in the language of his people, to make things clear to them" (Quran 14:4). Speaking within a context is what communication requires; it does not by itself show human authorship. What is notable is that the Quran also challenges its own society (for example condemning female infanticide and tribal pride) and states universal principles and claims — its preservation and open literary challenge — whose force is not tied to that culture. The cultural clothing of a message does not settle the truth of its content; the real question is whether its origin is best explained by its milieu alone, and Muslims argue it is not.',
          bn: 'আপত্তি: কুরআন সপ্তম শতকের আরবে উদ্ভূত, আরবিতে কথা বলে এবং সেই সমাজের বিষয়াদি নিয়ে আলোচনা করে, তাই হয়তো তা কেবল তার মানবিক পরিবেশেরই প্রতিফলন। জবাব: যেকোনো বার্তা মানুষের কাছে তাদের নিজ ভাষা ও প্রেক্ষাপটে পৌঁছাতে হয়—"আমি প্রত্যেক রাসুলকে তার সম্প্রদায়ের ভাষাতেই পাঠিয়েছি, যাতে সে তাদের কাছে স্পষ্ট করে দেয়" (কুরআন ১৪:৪)। প্রেক্ষাপটে কথা বলা যোগাযোগের শর্ত; এটি একাই মানবিক রচনা প্রমাণ করে না। লক্ষণীয় যে কুরআন তার নিজ সমাজকেও চ্যালেঞ্জ করে (যেমন কন্যাশিশু হত্যা ও গোত্রীয় অহংকারের নিন্দা) এবং সর্বজনীন নীতি ও দাবি—এর সংরক্ষণ ও উন্মুক্ত সাহিত্যিক চ্যালেঞ্জ—উপস্থাপন করে, যেগুলোর জোর সেই সংস্কৃতির সাথে বাঁধা নয়। বার্তার সাংস্কৃতিক আবরণ তার বিষয়বস্তুর সত্যতা নির্ধারণ করে না; আসল প্রশ্ন হলো এর উৎস কেবল তার পরিবেশ দিয়েই সবচেয়ে ভালোভাবে ব্যাখ্যা করা যায় কি না, আর মুসলিমরা যুক্তি দেয় যে যায় না।',
        },
      },
      {
        q: { en: 'How do we know the Quran wasn’t changed over time?', bn: 'আমরা কীভাবে জানি কুরআন সময়ের সাথে বদলে যায়নি?' },
        a: {
          en: 'The objection: old texts often get altered, so how can today’s Quran match the original? Response: the Quran was transmitted in two mutually reinforcing ways — mass memorisation by very large numbers in every generation, and a written text standardised early in the community. These two streams constantly check one another: a copyist’s slip is caught by the memorisers, and a memory lapse by the manuscripts. Early surviving manuscripts correspond closely to the text recited today, and the recited Quran is remarkably uniform across the world, which anyone can verify. For Muslims this fulfils the promise, "Indeed, it is We who sent down the Reminder, and indeed, We will be its guardian" (Quran 15:9). The claim is offered as something open to examination rather than mere assertion.',
          bn: 'আপত্তি: পুরনো টেক্সট প্রায়ই পরিবর্তিত হয়, তাহলে আজকের কুরআন মূলের সাথে মিলে কীভাবে নিশ্চিত হব? জবাব: কুরআন দুইটি পরস্পর-দৃঢ়কারী উপায়ে হস্তান্তরিত হয়েছে—প্রতি প্রজন্মে বিপুলসংখ্যক মানুষের মুখস্থকরণ, এবং সম্প্রদায়ে প্রথম দিকেই প্রমিতকৃত লিখিত টেক্সট। এই দুই ধারা সদা একে অপরকে যাচাই করে: লেখকের ভুল ধরা পড়ে মুখস্থকারীদের কাছে, আর স্মৃতির ত্রুটি ধরা পড়ে পাণ্ডুলিপিতে। টিকে থাকা প্রাচীন পাণ্ডুলিপি আজ পঠিত টেক্সটের সাথে ঘনিষ্ঠভাবে মেলে, এবং পঠিত কুরআন বিশ্বজুড়ে বিস্ময়করভাবে অভিন্ন—যা যে কেউ যাচাই করতে পারে। মুসলিমদের কাছে এটি সেই প্রতিশ্রুতির পূরণ, "নিশ্চয়ই আমিই এই উপদেশ অবতীর্ণ করেছি এবং আমিই এর সংরক্ষক" (কুরআন ১৫:৯)। এই দাবি নিছক কথা নয়, বরং যাচাইযোগ্য কিছু হিসেবে উপস্থাপিত।',
        },
      },
      {
        q: { en: 'Why should revelation be needed at all — isn’t reason enough?', bn: 'ওহির প্রয়োজন কেন—যুক্তিই কি যথেষ্ট নয়?' },
        a: {
          en: 'The objection: if God gave us reason, why send prophets and scripture? Response: Islam values reason highly and builds much of its case on it — but it holds that reason has limits. Reason can point toward a Creator and broad moral principles, yet thoughtful people reasonably disagree about the specifics of life’s purpose, how to relate to God, and matters of the unseen such as the afterlife. Revelation is understood not as a replacement for reason but as its complement: reliable guidance on what reason alone cannot settle, and confirmation of what it can. Just as sound judgement still benefits from trustworthy expert knowledge, revelation offers an anchor against human bias and uncertainty. Reason and revelation are presented as partners, not rivals.',
          bn: 'আপত্তি: আল্লাহ যদি আমাদের যুক্তি দিয়েছেন, তবে নবী ও কিতাব পাঠানোর দরকার কী? জবাব: ইসলাম যুক্তিকে অত্যন্ত মূল্য দেয় এবং তার অনেক যুক্তি এর উপরই গড়ে—তবে এটি মনে করে যুক্তির সীমা আছে। যুক্তি এক স্রষ্টা ও ব্যাপক নৈতিক নীতির দিকে ইঙ্গিত করতে পারে, তবু চিন্তাশীল মানুষও জীবনের উদ্দেশ্য, আল্লাহর সাথে সম্পর্ক এবং পরকালের মতো অদৃশ্য বিষয়ের বিশদ নিয়ে যুক্তিসংগতভাবেই দ্বিমত করে। ওহিকে বোঝা হয় যুক্তির বিকল্প নয়, বরং পরিপূরক হিসেবে: যা যুক্তি একা নিষ্পত্তি করতে পারে না তার নির্ভরযোগ্য দিকনির্দেশ, আর যা পারে তার নিশ্চিতকরণ। যেমন সুবিবেচনাও নির্ভরযোগ্য বিশেষজ্ঞ জ্ঞানে উপকৃত হয়, তেমনি ওহি মানবিক পক্ষপাত ও অনিশ্চয়তার বিরুদ্ধে এক অবলম্বন দেয়। যুক্তি ও ওহিকে উপস্থাপন করা হয় সহযোগী হিসেবে, প্রতিদ্বন্দ্বী হিসেবে নয়।',
        },
      },
      {
        q: { en: 'Isn’t morality possible without religion?', bn: 'ধর্ম ছাড়া কি নৈতিকতা সম্ভব নয়?' },
        a: {
          en: 'The objection: many non-religious people are clearly good, so ethics does not require God. Response: Islam fully agrees that people can behave morally without professing a religion — indeed it teaches that the moral sense (fitrah) is God-given and shared by all humans. The classical argument was never "unbelievers cannot be good." It concerns something deeper: the ultimate grounding of moral obligation — what makes justice truly binding and cruelty truly wrong, beyond personal taste or social convention. Islam holds that objective moral facts are best explained and secured if they rest on a wise, just Creator who is their source. So the real question is not who is capable of acting morally, but what best accounts for morality’s authority.',
          bn: 'আপত্তি: বহু ধর্মহীন মানুষ স্পষ্টতই ভালো, তাই নৈতিকতার জন্য আল্লাহর প্রয়োজন নেই। জবাব: ইসলাম পুরোপুরি একমত যে মানুষ কোনো ধর্ম প্রকাশ না করেও নৈতিক আচরণ করতে পারে—বরং এটি শেখায় যে নৈতিক বোধ (ফিতরাহ) আল্লাহ-প্রদত্ত এবং সব মানুষের মাঝে অভিন্ন। ধ্রুপদী যুক্তি কখনোই "অবিশ্বাসীরা ভালো হতে পারে না" ছিল না। এটি আরও গভীর কিছু নিয়ে: নৈতিক দায়বদ্ধতার চূড়ান্ত ভিত্তি—ব্যক্তিগত রুচি বা সামাজিক প্রথার ঊর্ধ্বে ন্যায়কে প্রকৃতপক্ষে বাধ্যতামূলক ও নিষ্ঠুরতাকে প্রকৃতপক্ষে মন্দ কী করে তোলে। ইসলামের অভিমত, বস্তুনিষ্ঠ নৈতিক সত্য সবচেয়ে ভালোভাবে ব্যাখ্যা ও সুরক্ষিত হয় যদি তা এক প্রজ্ঞাময়, ন্যায়বান স্রষ্টায় প্রোথিত থাকে, যিনি এদের উৎস। তাই আসল প্রশ্ন কে নৈতিক আচরণে সক্ষম নয়, বরং নৈতিকতার কর্তৃত্ব কী দিয়ে সবচেয়ে ভালোভাবে ব্যাখ্যা হয়।',
        },
      },
      {
        q: { en: 'What about the contradictions people claim to find?', bn: 'মানুষ যেসব অসঙ্গতির দাবি করে, সেগুলোর কী?' },
        a: {
          en: 'The objection: critics point to verses that appear to conflict. Response: Muslim scholarship has engaged apparent tensions for centuries with careful tools — the surrounding context, the precise Arabic, the circumstances of revelation, and the way general and specific statements relate. Many claimed contradictions dissolve once a verse is read in its full context rather than in isolation. The Quran itself welcomes this scrutiny: "Then do they not reflect upon the Quran? If it had been from other than Allah, they would have found within it much contradiction" (Quran 4:82). This is offered as an invitation to study carefully — ideally with qualified scholars — not as a claim that every reader will instantly resolve every verse unaided.',
          bn: 'আপত্তি: সমালোচকরা এমন আয়াতের দিকে ইঙ্গিত করে যেগুলো সাংঘর্ষিক মনে হয়। জবাব: মুসলিম পণ্ডিতগণ শতাব্দীজুড়ে আপাত টানাপোড়েনকে যত্নশীল উপায়ে বিশ্লেষণ করেছেন—পারিপার্শ্বিক প্রেক্ষাপট, নির্ভুল আরবি, অবতরণের প্রেক্ষাপট, এবং সাধারণ ও নির্দিষ্ট বক্তব্যের পারস্পরিক সম্পর্ক। বিচ্ছিন্নভাবে না পড়ে পূর্ণ প্রেক্ষাপটে পড়লে দাবিকৃত অনেক অসঙ্গতি মিলিয়ে যায়। কুরআন নিজেই এই যাচাইকে স্বাগত জানায়: "তবে কি তারা কুরআন নিয়ে চিন্তা করে না? যদি তা আল্লাহ ছাড়া অন্য কারও কাছ থেকে হতো, তবে তারা এতে অনেক অসঙ্গতি পেত" (কুরআন ৪:৮২)। এটি যত্নসহ অধ্যয়নের—বিশেষত যোগ্য আলিমদের সাথে—আমন্ত্রণ হিসেবে উপস্থাপিত, প্রতিটি পাঠক সহায়তা ছাড়াই তাৎক্ষণিকভাবে প্রতিটি আয়াত সমাধান করবে এমন দাবি হিসেবে নয়।',
        },
      },
      {
        q: { en: 'Why is Islam’s view of God more coherent than the alternatives?', bn: 'বিকল্পগুলোর চেয়ে ইসলামের ঈশ্বর-ধারণা কেন বেশি সুসংগত?' },
        a: {
          en: 'The objection: every religion claims its concept of God is best. Response: Islam offers this as its reasoned case, not as a slight against others. Its concept of God is pure, undivided oneness (tawhid): one eternal Being, unlike creation, not composed of parts, not incarnate, worshipped directly without any intermediary — "There is nothing like unto Him" (Quran 42:11), summarised in Surah al-Ikhlas (Quran 112). Islam argues this is maximally simple and free of internal tension, keeping the Absolute unlimited and non-composite, and it holds transcendence and mercy together. It also reasons that a single ultimate source best explains the unified order of the universe (Quran 21:22). Muslims present this coherence for others to weigh, while honouring the sincerity of those who see God differently.',
          bn: 'আপত্তি: প্রতিটি ধর্মই দাবি করে তার ঈশ্বর-ধারণা শ্রেষ্ঠ। জবাব: ইসলাম এটি তার যুক্তিসংগত অবস্থান হিসেবে উপস্থাপন করে, অন্যদের প্রতি অবজ্ঞা হিসেবে নয়। এর ঈশ্বর-ধারণা বিশুদ্ধ, অবিভক্ত একত্ব (তাওহিদ): এক অনাদি সত্তা, সৃষ্টির অসদৃশ, অংশে গঠিত নন, দেহধারী নন, কোনো মধ্যস্থতাকারী ছাড়াই সরাসরি ইবাদিত—"তাঁর সদৃশ কিছুই নেই" (কুরআন ৪২:১১), যার সারকথা সুরা আল-ইখলাসে (কুরআন ১১২)। ইসলাম যুক্তি দেয় যে এটি সর্বাধিক সরল ও অভ্যন্তরীণ টানাপোড়েনমুক্ত, পরম সত্তাকে অসীম ও অ-যৌগিক রাখে, এবং অতিক্রান্ততা ও দয়াকে একসাথে ধরে। এটি আরও যুক্তি দেয় যে এক চূড়ান্ত উৎসই বিশ্বজগতের অভিন্ন শৃঙ্খলা সবচেয়ে ভালোভাবে ব্যাখ্যা করে (কুরআন ২১:২২)। মুসলিমরা এই সংগতি অন্যদের বিবেচনার জন্য উপস্থাপন করে, একই সাথে যাঁরা ঈশ্বরকে ভিন্নভাবে দেখেন তাঁদের আন্তরিকতাকে সম্মান করে।',
        },
      },
    ],
  },
  {
    id: 'misconceptions',
    emoji: '💡',
    kind: 'qa',
    noteKey: 'whyislam_misconceptions_note',
    qaLabel: { en: 'Misconception', bn: 'ভুল ধারণা' },
    title: { en: 'Common Misconceptions', bn: 'সাধারণ ভুল ধারণা' },
    summary: {
      en: 'Sincere misconceptions clarified fairly and respectfully — with historical nuance, not attacks.',
      bn: 'আন্তরিক ভুল ধারণাগুলো ন্যায্য ও শ্রদ্ধার সাথে স্পষ্টীকরণ—ঐতিহাসিক প্রেক্ষাপটসহ, আক্রমণ নয়।',
    },
    qa: [
      {
        q: { en: '“Islam was spread by the sword.”', bn: '"ইসলাম তরবারির জোরে ছড়িয়েছে।"' },
        a: {
          en: 'The image of Islam forced on people at swordpoint is widespread, but it sits uneasily with both the Quran and the historical record. The Quran states plainly, "There shall be no compulsion in religion" (Quran 2:256), and a faith imposed by force would be hollow in a religion that prizes sincere conviction of the heart. Historians note that in many lands Islam became the majority faith only gradually, over centuries — often long after those regions came under Muslim rule — and some of the largest Muslim populations today, such as in Indonesia and much of South and West Africa, were never conquered by Arab armies at all, but came to Islam largely through trade, scholarship and example. Empires of that era, Muslim and non-Muslim alike, did expand by conquest; but a change of ruler is not a change of heart, and Islam locates real faith in free choice, never coercion.',
          bn: 'তরবারির মুখে মানুষের উপর ইসলাম চাপিয়ে দেওয়ার চিত্র ব্যাপকভাবে প্রচলিত, কিন্তু তা কুরআন ও ঐতিহাসিক নথি—উভয়ের সাথেই খাপ খায় না। কুরআন স্পষ্ট বলে, "দ্বীনের ব্যাপারে কোনো জবরদস্তি নেই" (কুরআন ২:২৫৬), আর হৃদয়ের আন্তরিক প্রত্যয়কে মূল্য দেয় এমন এক ধর্মে জোর করে চাপানো বিশ্বাস অন্তঃসারশূন্য। ঐতিহাসিকরা লক্ষ করেন যে বহু অঞ্চলে ইসলাম কেবল ধীরে ধীরে, শতাব্দীর পর শতাব্দী ধরে সংখ্যাগরিষ্ঠ ধর্মে পরিণত হয়েছে—প্রায়ই সেই অঞ্চল মুসলিম শাসনে আসার বহু পরে—এবং আজকের কিছু বৃহত্তম মুসলিম জনগোষ্ঠী, যেমন ইন্দোনেশিয়া এবং দক্ষিণ ও পশ্চিম আফ্রিকার বড় অংশ, আরব বাহিনীর দ্বারা কখনো বিজিতই হয়নি, বরং মূলত বাণিজ্য, পাণ্ডিত্য ও আদর্শের মাধ্যমে ইসলামে এসেছে। সেই যুগের সাম্রাজ্যগুলো—মুসলিম ও অমুসলিম উভয়ই—বিজয়ের মাধ্যমে বিস্তৃত হয়েছে; কিন্তু শাসক বদল হৃদয়ের বদল নয়, আর ইসলাম প্রকৃত ঈমানকে রাখে স্বাধীন পছন্দে, কখনোই জবরদস্তিতে নয়।',
        },
      },
      {
        q: { en: '“Muslims worship a different god — even a ‘moon god.’”', bn: '"মুসলিমরা ভিন্ন এক ঈশ্বরের—এমনকি এক ‘চাঁদ-দেবতার’—উপাসনা করে।"' },
        a: {
          en: 'Some believe Muslims worship a separate deity, occasionally even a "moon god." In truth, "Allah" is simply the Arabic word for God — the very word Arabic-speaking Jews and Christians use for the God of Abraham. Islam worships the one Creator of Adam, Noah, Abraham, Moses and Jesus (peace be upon them), affirming pure monotheism: "Say, He is Allah, [who is] One" (Quran 112:1). The crescent sometimes seen on mosques is a later cultural emblem, not an object of worship; Islam explicitly forbids worshipping the sun, moon or any created thing: "Do not prostrate to the sun or to the moon, but prostrate to Allah, who created them" (Quran 41:37). The God of Islam is the same one God of the earlier prophets — described without any partner, image or likeness.',
          bn: 'কেউ কেউ মনে করে মুসলিমরা এক পৃথক দেবতার, কখনো এমনকি এক "চাঁদ-দেবতার" উপাসনা করে। প্রকৃতপক্ষে "আল্লাহ" আরবিতে ঈশ্বরেরই শব্দ—আরবিভাষী ইহুদি ও খ্রিষ্টানরাও ইব্রাহিমের ঈশ্বরের জন্য ঠিক এই শব্দই ব্যবহার করেন। ইসলাম আদম, নূহ, ইব্রাহিম, মূসা ও ঈসা (তাঁদের প্রতি শান্তি)-এর সেই এক স্রষ্টার ইবাদত করে, বিশুদ্ধ একত্ববাদ নিশ্চিত করে: "বলো, তিনিই আল্লাহ, এক" (কুরআন ১১২:১)। মসজিদে কখনো দেখা যাওয়া অর্ধচন্দ্র একটি পরবর্তীকালের সাংস্কৃতিক প্রতীক, উপাসনার বস্তু নয়; ইসলাম সূর্য, চাঁদ বা কোনো সৃষ্ট বস্তুর উপাসনা স্পষ্টভাবে নিষেধ করে: "সূর্য ও চাঁদকে সিজদা কোরো না, বরং সিজদা করো আল্লাহকে, যিনি এদের সৃষ্টি করেছেন" (কুরআন ৪১:৩৭)। ইসলামের আল্লাহ পূর্ববর্তী নবীদের সেই একই এক ঈশ্বর—কোনো অংশীদার, প্রতিমা বা সদৃশ ছাড়াই বর্ণিত।',
        },
      },
      {
        q: { en: '“Islam is anti-science and hostile to reason.”', bn: '"ইসলাম বিজ্ঞানবিরোধী ও যুক্তির প্রতি বৈরী।"' },
        a: {
          en: 'Islam is sometimes imagined as opposed to reason and science, yet its scripture repeatedly urges observation and thought, and its history tells a different story. The Quran calls people again and again to reflect on the natural world, and the early Muslim world became a major centre of learning — advancing mathematics, medicine, astronomy and philosophy, and preserving and building upon the knowledge of earlier peoples, in a period often described as a golden age of scholarship. Muslims are cautioned only against two things: treating scripture as a science textbook, and imagining that describing how the world works removes the deeper question of why it exists at all. Islam sees the book of revelation and the book of nature as coming from the same Author, so honest inquiry is welcomed rather than feared.',
          bn: 'ইসলামকে কখনো যুক্তি ও বিজ্ঞানের বিরোধী বলে কল্পনা করা হয়, অথচ এর শাস্ত্র বারবার পর্যবেক্ষণ ও চিন্তার তাগিদ দেয়, আর এর ইতিহাস ভিন্ন কথা বলে। কুরআন মানুষকে বারবার প্রকৃতি নিয়ে অনুধ্যানে ডাকে, এবং প্রাথমিক মুসলিম বিশ্ব হয়ে উঠেছিল জ্ঞানচর্চার এক প্রধান কেন্দ্র—গণিত, চিকিৎসা, জ্যোতির্বিজ্ঞান ও দর্শনে অগ্রগতি এনে এবং পূর্ববর্তী জাতিসমূহের জ্ঞান সংরক্ষণ ও তার উপর গড়ে তুলে, এমন এক যুগে যাকে প্রায়ই পাণ্ডিত্যের স্বর্ণযুগ বলা হয়। মুসলিমদের কেবল দুটি বিষয়ে সতর্ক করা হয়: শাস্ত্রকে বিজ্ঞানের পাঠ্যবই হিসেবে গণ্য করা, এবং জগৎ কীভাবে কাজ করে তা বর্ণনা করলেই তা কেন আদৌ বিদ্যমান—এই গভীরতর প্রশ্নটি মুছে যায় বলে ভাবা। ইসলাম ওহির গ্রন্থ ও প্রকৃতির গ্রন্থকে একই রচয়িতা থেকে আগত হিসেবে দেখে, তাই সৎ অনুসন্ধানকে ভয় নয়, স্বাগত জানানো হয়।',
        },
      },
      {
        q: { en: '“Jihad just means holy war.”', bn: '"জিহাদ মানেই ধর্মযুদ্ধ।"' },
        a: {
          en: 'In popular usage "jihad" is often equated with "holy war," but the Arabic word simply means striving or struggle in the path of God, and its meaning is far broader. It includes the daily inner struggle against one’s own selfishness and wrongdoing — which the tradition stresses as the most important struggle of all — as well as striving through knowledge, patience, charity and just, truthful speech. It does encompass the ethics of legitimate self-defence, but hedged about with strict limits: non-combatants, women, children and the elderly are protected, even crops and trees are not to be needlessly destroyed, treaties must be honoured, and aggression is forbidden — "and do not transgress. Indeed, Allah does not like transgressors" (Quran 2:190). Reducing jihad to "holy war" — still less to terrorism, which Islam condemns — misses both the word’s primary spiritual meaning and the restraint its ethics demand.',
          bn: 'প্রচলিত ব্যবহারে "জিহাদ"-কে প্রায়ই "ধর্মযুদ্ধের" সমার্থক ধরা হয়, কিন্তু আরবি শব্দটির অর্থ কেবল আল্লাহর পথে সাধনা বা সংগ্রাম, আর এর অর্থ অনেক বিস্তৃত। এতে অন্তর্ভুক্ত নিজের স্বার্থপরতা ও পাপের বিরুদ্ধে দৈনন্দিন অন্তর্গত সংগ্রাম—যাকে ঐতিহ্য সবচেয়ে গুরুত্বপূর্ণ সংগ্রাম হিসেবে জোর দেয়—এবং জ্ঞান, ধৈর্য, দান ও ন্যায্য, সত্যনিষ্ঠ কথার মাধ্যমে সাধনা। এতে বৈধ আত্মরক্ষার নীতিও অন্তর্ভুক্ত, তবে কঠোর সীমায় বেষ্টিত: যোদ্ধা-নয় এমন ব্যক্তি, নারী, শিশু ও বৃদ্ধরা সুরক্ষিত, এমনকি ফসল ও গাছ অকারণে ধ্বংস করা যাবে না, চুক্তি রক্ষা করতে হবে, এবং আগ্রাসন নিষিদ্ধ—"এবং সীমা লঙ্ঘন কোরো না। নিশ্চয়ই আল্লাহ সীমালঙ্ঘনকারীদের পছন্দ করেন না" (কুরআন ২:১৯০)। জিহাদকে "ধর্মযুদ্ধে"—আর সন্ত্রাসে তো আরও নয়, যাকে ইসলাম নিন্দা করে—সংকুচিত করলে শব্দটির মূল আধ্যাত্মিক অর্থ এবং এর নীতিমালার আরোপিত সংযম—দুটোই হারিয়ে যায়।',
        },
      },
      {
        q: { en: '“Islam is a monolithic, foreign religion.”', bn: '"ইসলাম একটি অভিন্ন-একরূপ, বিদেশি ধর্ম।"' },
        a: {
          en: 'Islam is sometimes pictured as a single uniform bloc, or as belonging to one region or people. In reality Muslims are extraordinarily diverse — the large majority are not Arab — and the faith is lived across almost every nation, language and culture on earth, from West Africa to Southeast Asia. Within an agreed core of belief there has always been a rich internal tradition of scholarship and reasoned difference over the details of practice, studied with qualified teachers. And far from being foreign to any place, Islam teaches that it is the original message of all the prophets from Adam onward, addressed to all people: "And We have not sent you except as a mercy to the worlds" (Quran 21:107). It is best understood not as one culture’s possession but as a universal message that many cultures have made their own.',
          bn: 'ইসলামকে কখনো একটি অভিন্ন-একরূপ গোষ্ঠী হিসেবে, কিংবা এক অঞ্চল বা এক জাতির সম্পত্তি হিসেবে কল্পনা করা হয়। প্রকৃতপক্ষে মুসলিমরা অসাধারণভাবে বৈচিত্র্যময়—বড় সংখ্যাগরিষ্ঠই আরব নন—এবং এই ধর্ম পশ্চিম আফ্রিকা থেকে দক্ষিণ-পূর্ব এশিয়া পর্যন্ত পৃথিবীর প্রায় প্রতিটি জাতি, ভাষা ও সংস্কৃতিতে যাপিত। বিশ্বাসের একটি স্বীকৃত মূলকেন্দ্রের ভেতরে আমল-বিষয়ক খুঁটিনাটিতে পাণ্ডিত্য ও যুক্তিসংগত মতপার্থক্যের এক সমৃদ্ধ অভ্যন্তরীণ ঐতিহ্য সবসময়ই ছিল, যা যোগ্য শিক্ষকের সাথে অধ্যয়ন করা হয়। আর কোনো স্থানের কাছে বিদেশি হওয়া তো দূরে থাক, ইসলাম শেখায় যে এটি আদম থেকে শুরু করে সকল নবীর মূল বার্তা, সব মানুষের উদ্দেশে: "আমি আপনাকে কেবল বিশ্বজগতের জন্য রহমতরূপেই পাঠিয়েছি" (কুরআন ২১:১০৭)। একে এক সংস্কৃতির সম্পত্তি নয়, বরং এক সর্বজনীন বার্তা হিসেবে বোঝাই শ্রেয়, যাকে বহু সংস্কৃতি নিজের করে নিয়েছে।',
        },
      },
    ],
  },
  {
    id: 'comparative',
    emoji: '🪟',
    kind: 'article',
    noteKey: 'whyislam_comparative_note',
    title: { en: 'Comparative Theology (respectful)', bn: 'তুলনামূলক ধর্মতত্ত্ব (শ্রদ্ধাপূর্ণ)' },
    summary: {
      en: 'What Islam affirms about God, prophets and scripture — and its reasoning — set beside broad alternatives, respectfully.',
      bn: 'ঈশ্বর, নবী ও কিতাব সম্পর্কে ইসলাম কী নিশ্চিত করে—এবং কেন—তা ব্যাপক বিকল্পের পাশে শ্রদ্ধার সাথে উপস্থাপন।',
    },
    points: [
      {
        heading: { en: 'The nature of God', bn: 'ঈশ্বরের স্বরূপ' },
        body: {
          en: 'Islam affirms strict oneness: God is one, without partner, parts or incarnation, and is worshipped directly with no intermediary. Its reasoning is that this preserves God’s uniqueness and transcendence most fully — "There is nothing like unto Him" (Quran 42:11). Many traditions share belief in a single God, which Islam recognises as valuable common ground; its distinctive emphasis is that oneness remains completely undivided and that devotion is offered to God alone.',
          bn: 'ইসলাম কঠোর একত্ব নিশ্চিত করে: আল্লাহ এক, অংশীদার-অংশ-দেহধারণহীন, এবং কোনো মধ্যস্থতাকারী ছাড়াই সরাসরি ইবাদিত। এর যুক্তি হলো এটি আল্লাহর অনন্যতা ও অতিক্রান্ততাকে সবচেয়ে পূর্ণভাবে সংরক্ষণ করে—"তাঁর সদৃশ কিছুই নেই" (কুরআন ৪২:১১)। বহু ঐতিহ্য এক ঈশ্বরে বিশ্বাস ভাগ করে নেয়, যাকে ইসলাম মূল্যবান অভিন্ন ভিত্তি হিসেবে স্বীকার করে; এর স্বতন্ত্র জোর হলো একত্ব সম্পূর্ণ অবিভক্ত থাকে এবং ইবাদত কেবল আল্লাহকেই নিবেদিত হয়।',
        },
      },
      {
        heading: { en: 'The line of prophets', bn: 'নবীদের ধারা' },
        body: {
          en: 'Islam affirms a single, continuous chain of prophets carrying one essential message, and it honours figures also revered in Jewish and Christian tradition — Abraham, Moses and Jesus (peace be upon them). Its reasoning is that this unifies human religious history under one purpose and presents Islam as a continuation and completion rather than a break. On this basis the Quran invites shared principles: "Come to a word that is equitable between us and you" (Quran 3:64).',
          bn: 'ইসলাম নবীদের এক অভিন্ন, অবিচ্ছিন্ন ধারা নিশ্চিত করে যা এক মূল বার্তা বহন করে, এবং ইহুদি ও খ্রিস্টান ঐতিহ্যেও শ্রদ্ধেয় ব্যক্তিত্ব—ইব্রাহিম, মূসা ও ঈসা (তাঁদের প্রতি শান্তি)—কে সম্মান করে। এর যুক্তি হলো এটি মানব ধর্ম-ইতিহাসকে এক উদ্দেশ্যে ঐক্যবদ্ধ করে এবং ইসলামকে বিচ্ছেদ নয়, বরং ধারাবাহিকতা ও পূর্ণতা হিসেবে উপস্থাপন করে। এই ভিত্তিতে কুরআন অভিন্ন নীতির আমন্ত্রণ জানায়: "এসো এমন এক কথায় যা আমাদের ও তোমাদের মধ্যে অভিন্ন" (কুরআন ৩:৬৪)।',
        },
      },
      {
        heading: { en: 'Scripture and revelation', bn: 'কিতাব ও ওহি' },
        body: {
          en: 'Islam affirms that God sent guidance repeatedly through history and that the Quran is the final, preserved reference which confirms the truth of what came before it — "confirming that which preceded it and as a criterion over it" (Quran 5:48). Its reasoning is that this accounts for both continuity with earlier faith and the value of a safeguarded final standard that later generations can rely upon directly.',
          bn: 'ইসলাম নিশ্চিত করে যে আল্লাহ ইতিহাসজুড়ে বারবার হিদায়াত পাঠিয়েছেন এবং কুরআন হলো চূড়ান্ত, সংরক্ষিত মানদণ্ড যা তার পূর্ববর্তী সত্যকে নিশ্চিত করে—"পূর্ববর্তী কিতাবের সত্যায়নকারী ও তার উপর তত্ত্বাবধায়ক" (কুরআন ৫:৪৮)। এর যুক্তি হলো এটি পূর্ববর্তী বিশ্বাসের সাথে ধারাবাহিকতা এবং এমন এক সুরক্ষিত চূড়ান্ত মানদণ্ডের মূল্য—উভয়েরই ব্যাখ্যা দেয়, যার উপর পরবর্তী প্রজন্ম সরাসরি নির্ভর করতে পারে।',
        },
      },
      {
        heading: { en: 'Relationship with God and accountability', bn: 'আল্লাহর সাথে সম্পর্ক ও জবাবদিহিতা' },
        body: {
          en: 'Islam affirms direct accountability to a merciful God: each person is answerable for their own deeds, no one bears inherited guilt, and forgiveness is sought directly through sincere repentance without any required intermediary. Its reasoning is that this keeps both personal responsibility and God’s accessibility fully intact. This is described here as Islam’s own reasoned position, stated factually and without disparaging how others understand these matters.',
          bn: 'ইসলাম এক দয়াময় আল্লাহর কাছে সরাসরি জবাবদিহিতা নিশ্চিত করে: প্রত্যেকে নিজ কর্মের জন্য দায়ী, কেউ উত্তরাধিকারসূত্রে পাপের বোঝা বহন করে না, এবং কোনো আবশ্যক মধ্যস্থতাকারী ছাড়াই আন্তরিক তওবার মাধ্যমে সরাসরি ক্ষমা চাওয়া হয়। এর যুক্তি হলো এটি ব্যক্তিগত দায়িত্ব ও আল্লাহর সহজলভ্যতা—উভয়কেই পূর্ণ অক্ষুণ্ন রাখে। এটি এখানে ইসলামের নিজস্ব যুক্তিসংগত অবস্থান হিসেবে বর্ণিত, তথ্যনিষ্ঠভাবে এবং অন্যরা এসব বিষয় কীভাবে বোঝে তা ছোট না করে।',
        },
      },
      {
        heading: { en: 'A note on respect', bn: 'শ্রদ্ধা সম্পর্কে একটি নোট' },
        body: {
          en: 'These are Islam’s reasoned affirmations, offered for honest comparison of ideas about God — not verdicts about the worth of any people. Islam commands its followers to treat those of other faiths with justice and courtesy (Quran 5:8, 60:8) and to leave belief a free choice (Quran 2:256). Comparing concepts respectfully, and befriending and honouring people across differences, are meant to go together.',
          bn: 'এগুলো ইসলামের যুক্তিসংগত নিশ্চয়ন, ঈশ্বর সম্পর্কে ধারণার সৎ তুলনার জন্য উপস্থাপিত—কোনো মানুষের মূল্য সম্পর্কে রায় নয়। ইসলাম তার অনুসারীদের নির্দেশ দেয় অন্য ধর্মাবলম্বীদের প্রতি ন্যায় ও সৌজন্য প্রদর্শন করতে (কুরআন ৫:৮, ৬০:৮) এবং বিশ্বাসকে স্বাধীন পছন্দ হিসেবে ছেড়ে দিতে (কুরআন ২:২৫৬)। ধারণার শ্রদ্ধাপূর্ণ তুলনা এবং ভিন্নতার মাঝেও মানুষকে সম্মান ও বন্ধুত্ব করা—এই দুই একসাথে চলার কথা।',
        },
      },
    ],
  },
  {
    id: 'dialogue',
    emoji: '🕊️',
    kind: 'article',
    noteKey: 'whyislam_dialogue_note',
    title: { en: 'Principles of Respectful Dialogue (Adab of Da‘wah)', bn: 'শ্রদ্ধাপূর্ণ সংলাপের নীতি (দাওয়াহর আদব)' },
    summary: {
      en: 'How Islam teaches its followers to share and discuss faith — with wisdom, gentleness and no compulsion.',
      bn: 'ইসলাম কীভাবে তার অনুসারীদের বিশ্বাস ভাগ করা ও আলোচনা করতে শেখায়—প্রজ্ঞা, কোমলতা ও জবরদস্তিহীনতায়।',
    },
    points: [
      {
        heading: { en: 'Invite with wisdom and good speech', bn: 'প্রজ্ঞা ও উত্তম কথায় আমন্ত্রণ' },
        body: {
          en: 'The Quran sets the tone for sharing faith: "Invite to the way of your Lord with wisdom and good instruction, and argue with them in a way that is best" (Quran 16:125). Dialogue should be gracious, thoughtful and suited to the listener — persuasion through beauty of character and clarity, never through insult or pressure.',
          bn: 'কুরআন বিশ্বাস ভাগ করে নেওয়ার ভঙ্গি নির্ধারণ করে দেয়: "তোমার রবের পথে আহ্বান করো প্রজ্ঞা ও সদুপদেশের মাধ্যমে, এবং তাদের সাথে বিতর্ক করো উত্তম পন্থায়" (কুরআন ১৬:১২৫)। সংলাপ হবে সৌজন্যপূর্ণ, বিবেচনাশীল ও শ্রোতার উপযোগী—চরিত্রের সৌন্দর্য ও স্পষ্টতার মাধ্যমে অনুপ্রেরণা, কখনো অপমান বা চাপের মাধ্যমে নয়।',
        },
      },
      {
        heading: { en: 'Seek common ground, avoid hostility', bn: 'অভিন্ন ভিত্তি খোঁজো, বৈরিতা এড়াও' },
        body: {
          en: 'When speaking with the People of the Book, the Quran counsels courtesy and shared values: "And do not argue with the People of the Scripture except in a way that is best… and say, We believe in that which was revealed to us and revealed to you; our God and your God is one" (Quran 29:46). Dialogue begins from what is held in common, not from antagonism.',
          bn: 'আহলে কিতাবের সাথে কথা বলার সময় কুরআন সৌজন্য ও অভিন্ন মূল্যবোধের পরামর্শ দেয়: "আহলে কিতাবের সাথে উত্তম পন্থা ছাড়া বিতর্ক করো না… আর বলো, আমরা ঈমান এনেছি আমাদের প্রতি ও তোমাদের প্রতি যা অবতীর্ণ হয়েছে তাতে; আমাদের ইলাহ ও তোমাদের ইলাহ এক" (কুরআন ২৯:৪৬)। সংলাপ শুরু হয় অভিন্নতা থেকে, বৈরিতা থেকে নয়।',
        },
      },
      {
        heading: { en: 'No compulsion — convey, do not coerce', bn: 'জবরদস্তি নয়—পৌঁছে দাও, চাপিয়ে দিয়ো না' },
        body: {
          en: 'A core principle is that faith cannot be forced: "There shall be no compulsion in religion" (Quran 2:256). The purpose of da‘wah is only to convey a message clearly and sincerely; the response belongs entirely to the other person and, ultimately, to God. Pressuring, manipulating or shaming anyone contradicts this principle.',
          bn: 'একটি মূল নীতি হলো ঈমান চাপিয়ে দেওয়া যায় না: "দ্বীনের ব্যাপারে কোনো জবরদস্তি নেই" (কুরআন ২:২৫৬)। দাওয়াহর উদ্দেশ্য কেবল বার্তা স্পষ্ট ও আন্তরিকভাবে পৌঁছে দেওয়া; সাড়া দেওয়ার বিষয়টি সম্পূর্ণ অপর ব্যক্তির এবং চূড়ান্তভাবে আল্লাহর। কাউকে চাপ দেওয়া, প্রভাবিত করা বা লজ্জা দেওয়া এই নীতির পরিপন্থী।',
        },
      },
      {
        heading: { en: 'Gentleness, patience and humility', bn: 'কোমলতা, ধৈর্য ও বিনয়' },
        body: {
          en: 'Character carries the message. The Quran reminds the Prophet that his gentleness drew people in: "And by the mercy of Allah you were lenient with them. Had you been rude and harsh-hearted, they would have dispersed from around you" (Quran 3:159). Sincere dialogue listens as much as it speaks, stays patient under disagreement, keeps good manners, and never mocks or belittles anyone for believing differently.',
          bn: 'চরিত্রই বার্তা বহন করে। কুরআন নবীকে স্মরণ করিয়ে দেয় যে তাঁর কোমলতা মানুষকে কাছে টেনেছিল: "আল্লাহর রহমতেই তুমি তাদের প্রতি কোমল হয়েছিলে। যদি তুমি রূঢ় ও কঠোরহৃদয় হতে, তবে তারা তোমার আশপাশ থেকে সরে যেত" (কুরআন ৩:১৫৯)। আন্তরিক সংলাপ যতটা বলে ততটা শোনে, দ্বিমতে ধৈর্য ধরে, সদাচরণ বজায় রাখে, এবং ভিন্ন বিশ্বাসের জন্য কাউকে কখনো উপহাস বা হেয় করে না।',
        },
      },
    ],
  },
  {
    id: 'stories',
    emoji: '🌟',
    kind: 'article',
    noteKey: 'whyislam_stories_note',
    title: { en: 'Stories of Those Who Embraced Islam', bn: 'যাঁরা ইসলাম গ্রহণ করেছেন তাঁদের কথা' },
    summary: {
      en: 'A general, respectful note on the many people through history who came to Islam after study and reflection.',
      bn: 'ইতিহাসজুড়ে অধ্যয়ন ও চিন্তার পর যাঁরা ইসলামে এসেছেন, তাঁদের নিয়ে একটি সাধারণ, শ্রদ্ধাপূর্ণ নোট।',
    },
    points: [
      {
        heading: { en: 'A long and varied history', bn: 'দীর্ঘ ও বৈচিত্র্যময় ইতিহাস' },
        body: {
          en: 'From the first generation in Makkah to the present day, people of every background — scholars and tradespeople, rulers and travellers, scientists, writers and thinkers — have embraced Islam. Many did so not by upbringing or circumstance but after a period of questioning, reading and honest comparison. Whole societies historically came to Islam gradually, often through the character and dealings of Muslims they encountered as much as through argument.',
          bn: 'মক্কার প্রথম প্রজন্ম থেকে আজ পর্যন্ত, সব পটভূমির মানুষ—আলিম ও ব্যবসায়ী, শাসক ও পরিব্রাজক, বিজ্ঞানী, লেখক ও চিন্তাবিদ—ইসলাম গ্রহণ করেছেন। অনেকে তা করেছেন জন্মসূত্রে বা পরিস্থিতিতে নয়, বরং প্রশ্ন, পাঠ ও সৎ তুলনার এক পর্বের পর। ঐতিহাসিকভাবে সমগ্র সমাজও ধীরে ধীরে ইসলামে এসেছে, প্রায়ই যুক্তির মতোই তাদের দেখা মুসলিমদের চরিত্র ও লেনদেনের মাধ্যমে।',
        },
      },
      {
        heading: { en: 'What draws people, in their own words', bn: 'কী মানুষকে টানে—তাদের নিজেদের ভাষায়' },
        body: {
          en: 'Those who describe their journeys commonly mention a few recurring things: the clarity and simplicity of tawhid — one God, addressed directly; the Quran’s effect on them as readers; the coherence of Islam’s answers about purpose, morality and the hereafter; and the discipline and warmth of Muslim worship and community. These are general patterns rather than claims about any particular individual, and the accounts are best read first-hand.',
          bn: 'যাঁরা নিজেদের যাত্রার বর্ণনা দেন, তাঁরা সাধারণত কিছু পুনরাবৃত্ত বিষয় উল্লেখ করেন: তাওহিদের স্বচ্ছতা ও সরলতা—এক আল্লাহ, যাঁকে সরাসরি ডাকা যায়; পাঠক হিসেবে তাঁদের উপর কুরআনের প্রভাব; উদ্দেশ্য, নৈতিকতা ও পরকাল নিয়ে ইসলামের উত্তরের সংগতি; এবং মুসলিম ইবাদত ও সম্প্রদায়ের শৃঙ্খলা ও উষ্ণতা। এগুলো সাধারণ প্রবণতা, কোনো নির্দিষ্ট ব্যক্তি সম্পর্কে দাবি নয়, আর এসব বিবরণ সরাসরি পড়াই উত্তম।',
        },
      },
      {
        heading: { en: 'Where to read such accounts', bn: 'এমন বিবরণ কোথায় পড়বেন' },
        body: {
          en: 'First-person accounts of embracing Islam — from converts of many nationalities and professions — are published by several of the reputable platforms listed in the Further Study section, such as the da‘wah institutes and new-Muslim support organisations. Reading them directly, in the person’s own words, is more valuable and more reliable than any summary here. Every journey is personal; these stories are shared to inform, never to pressure.',
          bn: 'ইসলাম গ্রহণের প্রথম-পুরুষ বিবরণ—বহু জাতি ও পেশার নওমুসলিমদের—"আরও অধ্যয়ন" অংশে তালিকাভুক্ত একাধিক নির্ভরযোগ্য প্ল্যাটফর্মে প্রকাশিত হয়, যেমন দাওয়াহ প্রতিষ্ঠান ও নওমুসলিম-সহায়তা সংস্থাগুলো। সেগুলো সরাসরি, ব্যক্তির নিজের ভাষায় পড়াই এখানকার যেকোনো সারাংশের চেয়ে বেশি মূল্যবান ও নির্ভরযোগ্য। প্রতিটি যাত্রা ব্যক্তিগত; এই কাহিনিগুলো জানানোর জন্য ভাগ করা হয়, চাপ দেওয়ার জন্য কখনোই নয়।',
        },
      },
    ],
  },
  {
    id: 'glossary',
    emoji: '📔',
    kind: 'glossary',
    noteKey: 'whyislam_glossary_note',
    title: { en: 'Glossary of Key Terms', bn: 'মূল পরিভাষার শব্দকোষ' },
    summary: {
      en: 'One-line introductions to twenty-three key terms of Islamic belief and practice.',
      bn: 'ইসলামি বিশ্বাস ও আমলের তেইশটি মূল পরিভাষার এক-লাইনের পরিচিতি।',
    },
    terms: [
      { term: 'Tawhid', bnTerm: 'তাওহিদ',
        en: 'The oneness of God — that God alone is Lord, alone is worshipped, and is unique in His names and attributes.',
        bn: 'আল্লাহর একত্ব—একমাত্র তিনিই রব, একমাত্র তিনিই ইবাদিত, এবং তাঁর নাম ও গুণাবলিতে তিনি অনন্য।' },
      { term: 'Shirk', bnTerm: 'শিরক',
        en: 'Associating partners with God in worship or His unique attributes — the opposite of tawhid.',
        bn: 'ইবাদতে বা আল্লাহর অনন্য গুণাবলিতে তাঁর সাথে অংশীদার স্থাপন—তাওহিদের বিপরীত।' },
      { term: 'Iman', bnTerm: 'ঈমান',
        en: 'Faith — conviction of the heart, professed by the tongue and expressed in action.',
        bn: 'বিশ্বাস—হৃদয়ের প্রত্যয়, মুখের স্বীকৃতি ও কর্মে প্রকাশ।' },
      { term: 'Islam', bnTerm: 'ইসলাম',
        en: 'Willing submission to the one God — the name of the religion, from the same root as salam (peace).',
        bn: 'এক আল্লাহর প্রতি স্বেচ্ছা আত্মসমর্পণ—দ্বীনের নাম, সালাম (শান্তি)-এর সাথে একই মূল থেকে।' },
      { term: 'Ihsan', bnTerm: 'ইহসান',
        en: 'Excellence in faith — worshipping God as though you see Him, knowing that He sees you.',
        bn: 'ঈমানের উৎকর্ষ—এমনভাবে আল্লাহর ইবাদত করা যেন তুমি তাঁকে দেখছ, জেনে যে তিনি তোমাকে দেখছেন।' },
      { term: 'Fitrah', bnTerm: 'ফিতরাহ',
        en: 'The innate natural disposition upon which every person is created, inclined to recognise the Creator.',
        bn: 'সহজাত স্বাভাবিক প্রকৃতি, যার উপর প্রত্যেক মানুষ সৃষ্ট—স্রষ্টাকে চেনার দিকে প্রবণ।' },
      { term: 'Wahy', bnTerm: 'ওহি',
        en: 'Divine revelation — God’s communication of guidance to His prophets.',
        bn: 'ঐশী প্রত্যাদেশ—নবীদের কাছে আল্লাহর হিদায়াত প্রেরণ।' },
      { term: 'Nubuwwah', bnTerm: 'নবুয়ত',
        en: 'Prophethood — the office of being chosen by God to receive and convey His guidance.',
        bn: 'নবুয়ত—আল্লাহর হিদায়াত গ্রহণ ও পৌঁছে দিতে তাঁর মনোনীত হওয়ার মর্যাদা।' },
      { term: 'Risalah', bnTerm: 'রিসালাত',
        en: 'Messengership — the mission of conveying God’s revealed message to a people.',
        bn: 'রিসালাত—কোনো জাতির কাছে আল্লাহর অবতীর্ণ বার্তা পৌঁছে দেওয়ার মিশন।' },
      { term: 'Qadar', bnTerm: 'কদর',
        en: 'Divine decree — God’s complete knowledge and ordainment of all things, alongside real human choice.',
        bn: 'তাকদির—সব কিছুর উপর আল্লাহর পূর্ণ জ্ঞান ও নির্ধারণ, মানুষের প্রকৃত পছন্দের পাশাপাশি।' },
      { term: 'Akhirah', bnTerm: 'আখিরাত',
        en: 'The hereafter — the everlasting life after death, with just accounting, reward and recompense.',
        bn: 'পরকাল—মৃত্যুর পরের চিরস্থায়ী জীবন, ন্যায্য হিসাব ও প্রতিদানসহ।' },
      { term: 'Shahada', bnTerm: 'শাহাদাহ',
        en: 'The testimony of faith: there is no god but God, and Muhammad is the Messenger of God.',
        bn: 'ঈমানের সাক্ষ্য: আল্লাহ ছাড়া কোনো উপাস্য নেই, এবং মুহাম্মাদ আল্লাহর রাসুল।' },
      { term: 'Sunnah', bnTerm: 'সুন্নাহ',
        en: 'The teachings, practice and example of the Prophet ﷺ, the lived model of the Quran’s guidance.',
        bn: 'নবী ﷺ-এর শিক্ষা, আমল ও আদর্শ—কুরআনের হিদায়াতের জীবন্ত নমুনা।' },
      { term: 'Ummah', bnTerm: 'উম্মাহ',
        en: 'The worldwide community of Muslims, bound by faith across nations and languages.',
        bn: 'বিশ্বব্যাপী মুসলিম সম্প্রদায়, জাতি ও ভাষার সীমা পেরিয়ে ঈমানে আবদ্ধ।' },
      { term: 'Da‘wah', bnTerm: 'দাওয়াহ',
        en: 'Inviting to God’s way — sharing and explaining Islam with wisdom, good speech and no compulsion.',
        bn: 'আল্লাহর পথে আহ্বান—প্রজ্ঞা, উত্তম কথা ও জবরদস্তিহীনতায় ইসলাম ভাগ করা ও ব্যাখ্যা করা।' },
      { term: 'Halal', bnTerm: 'হালাল',
        en: 'Permissible — that which God has allowed in food, earnings and conduct.',
        bn: 'বৈধ—খাদ্য, উপার্জন ও আচরণে আল্লাহ যা অনুমোদন করেছেন।' },
      { term: 'Haram', bnTerm: 'হারাম',
        en: 'Forbidden — that which God has prohibited, avoided out of obedience and care.',
        bn: 'নিষিদ্ধ—আল্লাহ যা নিষেধ করেছেন, আনুগত্য ও সতর্কতাবশত যা বর্জিত।' },
      { term: 'Sabr', bnTerm: 'সবর',
        en: 'Patient perseverance — steadfastness in hardship, in obedience, and against temptation.',
        bn: 'ধৈর্যশীল অবিচলতা—কষ্টে, আনুগত্যে ও প্রলোভনের বিরুদ্ধে দৃঢ়তা।' },
      { term: 'Shukr', bnTerm: 'শুকর',
        en: 'Gratitude — recognising God’s blessings and responding with thanks in heart, word and deed.',
        bn: 'কৃতজ্ঞতা—আল্লাহর নিয়ামত অনুধাবন এবং হৃদয়, কথা ও কর্মে কৃতজ্ঞতা প্রকাশ।' },
      { term: 'Tazkiyah', bnTerm: 'তাযকিয়াহ',
        en: 'Purification of the soul — cultivating good character and cleansing the heart of harmful traits.',
        bn: 'আত্মার পরিশুদ্ধি—উত্তম চরিত্র গঠন ও হৃদয়কে ক্ষতিকর স্বভাব থেকে পরিচ্ছন্ন করা।' },
      { term: 'Barakah', bnTerm: 'বরকত',
        en: 'Divine blessing — a God-given increase and benefit in something, often beyond its outward measure.',
        bn: 'ঐশী কল্যাণ—কোনো কিছুতে আল্লাহ-প্রদত্ত বৃদ্ধি ও উপকার, প্রায়ই তার বাহ্যিক পরিমাণের বাইরে।' },
      { term: 'Rizq', bnTerm: 'রিজিক',
        en: 'Provision — all sustenance that God provides, including wealth, food, knowledge and wellbeing.',
        bn: 'রিজিক—আল্লাহ প্রদত্ত সকল জীবিকা, সম্পদ, খাদ্য, জ্ঞান ও কল্যাণসহ।' },
      { term: 'Amanah', bnTerm: 'আমানত',
        en: 'Trust — a responsibility placed in one’s care, to be honoured faithfully toward God and people.',
        bn: 'আমানত—কারও তত্ত্বাবধানে ন্যস্ত দায়িত্ব, আল্লাহ ও মানুষের প্রতি বিশ্বস্ততার সাথে যা রক্ষণীয়।' },
    ],
  },
  {
    id: 'embrace',
    emoji: '🌷',
    kind: 'embrace',
    title: { en: 'How Does Someone Embrace Islam?', bn: 'কেউ কীভাবে ইসলাম গ্রহণ করে?' },
    summary: {
      en: 'A gentle, informational explanation of the Shahada and what becoming a Muslim involves.',
      bn: 'শাহাদাহ এবং মুসলিম হওয়া কী বোঝায়—তার কোমল, তথ্যমূলক ব্যাখ্যা।',
    },
    shahada: {
      arabic: 'لا إله إلا الله محمد رسول الله',
      translit: 'La ilaha illa Allah, Muhammadun rasul Allah',
      en: 'There is no god but God, and Muhammad is the Messenger of God.',
      bn: 'আল্লাহ ছাড়া কোনো উপাস্য নেই, এবং মুহাম্মাদ আল্লাহর রাসুল।',
    },
    points: [
      {
        heading: { en: 'The testimony of faith (Shahada)', bn: 'ঈমানের সাক্ষ্য (শাহাদাহ)' },
        body: {
          en: 'Entering Islam centres on a simple declaration of faith called the Shahada: bearing witness that there is no god but the one God, and that Muhammad is His Messenger. It is a short statement, but it expresses the heart of Islam — pure monotheism and acceptance of the final prophet — and is said with sincere conviction, not merely as words.',
          bn: 'ইসলামে প্রবেশ কেন্দ্রীভূত এক সরল ঈমানের ঘোষণাকে ঘিরে, যাকে বলা হয় শাহাদাহ: সাক্ষ্য দেওয়া যে এক আল্লাহ ছাড়া কোনো উপাস্য নেই, এবং মুহাম্মাদ তাঁর রাসুল। এটি সংক্ষিপ্ত বাক্য, তবে এটি ইসলামের মর্ম প্রকাশ করে—বিশুদ্ধ একত্ববাদ ও সর্বশেষ নবীকে গ্রহণ—এবং তা নিছক শব্দ হিসেবে নয়, আন্তরিক প্রত্যয়ের সাথে বলা হয়।',
        },
      },
      {
        heading: { en: 'What it means', bn: 'এর অর্থ' },
        body: {
          en: 'To say the Shahada with understanding is to acknowledge one Creator alone as worthy of worship, and to accept the guidance brought by Muhammad (peace be upon him) as continuing the message of all the prophets. It is less a change of label than a turning of the heart toward God — the beginning of a relationship rather than the end of a checklist.',
          bn: 'বোঝাপড়ার সাথে শাহাদাহ বলার অর্থ—এক স্রষ্টাকেই ইবাদতের যোগ্য বলে স্বীকার করা, এবং মুহাম্মাদ (তাঁর প্রতি শান্তি)-এর আনা হিদায়াতকে সকল নবীর বার্তার ধারাবাহিকতা হিসেবে গ্রহণ করা। এটি নামফলক বদলের চেয়ে বরং হৃদয়কে আল্লাহর দিকে ফেরানো—কোনো তালিকা শেষ করা নয়, বরং এক সম্পর্কের সূচনা।',
        },
      },
      {
        heading: { en: 'Sincerity matters more than perfection', bn: 'পূর্ণতার চেয়ে আন্তরিকতা বেশি গুরুত্বপূর্ণ' },
        body: {
          en: 'No one is expected to know everything or to practise perfectly from the first day. What matters is sincere conviction and a willingness to learn and grow. Prayer, character and other aspects of practice can be learned step by step, at a humane pace, ideally with the support of a knowledgeable and welcoming community.',
          bn: 'প্রথম দিন থেকেই সব জানা বা নিখুঁতভাবে আমল করা কারও কাছে প্রত্যাশিত নয়। যা গুরুত্বপূর্ণ তা হলো আন্তরিক প্রত্যয় এবং শেখা ও বেড়ে ওঠার আগ্রহ। নামাজ, চরিত্র ও আমলের অন্যান্য দিক ধাপে ধাপে, মানবিক গতিতে শেখা যায়, বিশেষত জ্ঞানী ও আন্তরিক এক সম্প্রদায়ের সহায়তায়।',
        },
      },
      {
        heading: { en: 'A free and personal choice', bn: 'এক স্বাধীন ও ব্যক্তিগত সিদ্ধান্ত' },
        body: {
          en: 'Islam is clear that faith cannot be forced or rushed: "There shall be no compulsion in religion" (Quran 2:256). This explanation is offered purely for information and reflection. Anyone genuinely exploring these ideas is encouraged to keep learning, ask sincere questions, and consult knowledgeable, trustworthy people — and to decide freely, in their own time.',
          bn: 'ইসলাম স্পষ্ট যে ঈমান চাপিয়ে দেওয়া বা তাড়াহুড়ো করা যায় না: "দ্বীনের ব্যাপারে কোনো জবরদস্তি নেই" (কুরআন ২:২৫৬)। এই ব্যাখ্যা কেবল তথ্য ও চিন্তার জন্য উপস্থাপিত। যিনি আন্তরিকভাবে এই ধারণাগুলো অন্বেষণ করছেন, তাঁকে উৎসাহ দেওয়া হয় শেখা চালিয়ে যেতে, সৎ প্রশ্ন করতে, জ্ঞানী ও বিশ্বস্ত মানুষের পরামর্শ নিতে—এবং নিজের সময়ে, স্বাধীনভাবে সিদ্ধান্ত নিতে।',
        },
      },
    ],
  },
  {
    id: 'next-steps',
    emoji: '🚶',
    kind: 'article',
    noteKey: 'whyislam_next_note',
    title: { en: 'Where to Go From Here', bn: 'এখান থেকে কোথায় যাবেন' },
    summary: {
      en: 'Gentle, pressure-free next steps for anyone who would like to keep exploring.',
      bn: 'অন্বেষণ চালিয়ে যেতে চাইলে—কোমল, চাপহীন কিছু পরবর্তী পদক্ষেপ।',
    },
    points: [
      {
        heading: { en: 'Keep learning at your own pace', bn: 'নিজের গতিতে শেখা চালিয়ে যান' },
        body: {
          en: 'There is no hurry and no pressure. Faith, in Islam, is a free and personal matter — "There shall be no compulsion in religion" (Quran 2:256). Take whatever time you need to read, reflect and ask questions, and let understanding grow gently rather than all at once.',
          bn: 'কোনো তাড়া নেই, কোনো চাপ নেই। ইসলামে ঈমান এক স্বাধীন ও ব্যক্তিগত বিষয়—"দ্বীনের ব্যাপারে কোনো জবরদস্তি নেই" (কুরআন ২:২৫৬)। পড়তে, ভাবতে ও প্রশ্ন করতে যতটুকু সময় দরকার নিন, আর বোঝাপড়াকে একবারে নয়, বরং ধীরে ধীরে বেড়ে উঠতে দিন।',
        },
      },
      {
        heading: { en: 'Read the Quran — its words and its meaning', bn: 'কুরআন পড়ুন—এর শব্দ ও অর্থ' },
        body: {
          en: 'A natural next step is to read the Quran itself. You can begin with a translation in your own language to meet its message directly, and, if you wish, gradually learn to read the Arabic script over time. This app’s Quran module lets you read word by word with translation, so you can start wherever feels comfortable.',
          bn: 'একটি স্বাভাবিক পরবর্তী পদক্ষেপ হলো কুরআন নিজে পড়া। আপনি নিজের ভাষায় একটি অনুবাদ দিয়ে শুরু করতে পারেন যাতে সরাসরি এর বার্তার সাথে পরিচিত হন, এবং চাইলে সময়ের সাথে ধীরে ধীরে আরবি লিপি পড়তেও শিখতে পারেন। এই অ্যাপের কুরআন মডিউল আপনাকে অনুবাদসহ শব্দে-শব্দে পড়তে দেয়, তাই যেখানে স্বস্তি লাগে সেখান থেকেই শুরু করতে পারেন।',
        },
      },
      {
        heading: { en: 'Explore the Prophets and Seerah', bn: 'নবীগণ ও সিরাহ ঘুরে দেখুন' },
        body: {
          en: 'To understand the message, it helps to know the messengers. This app includes a Prophets module on the lives and lessons of the prophets, and a Seerah timeline of the life of Muhammad (peace be upon him). Reading these can bring the ideas in this section to life through real people and events.',
          bn: 'বার্তাকে বুঝতে হলে বার্তাবাহকদের জানা সহায়ক। এই অ্যাপে আছে নবীগণের জীবন ও শিক্ষা নিয়ে একটি Prophets মডিউল, এবং মুহাম্মাদ (তাঁর প্রতি শান্তি)-এর জীবনের একটি সিরাহ টাইমলাইন। এগুলো পড়লে এই অংশের ধারণাগুলো প্রকৃত মানুষ ও ঘটনার মধ্য দিয়ে জীবন্ত হয়ে উঠতে পারে।',
        },
      },
      {
        heading: { en: 'Visit a mosque or meet Muslims', bn: 'মসজিদে যান বা মুসলিমদের সাথে দেখা করুন' },
        body: {
          en: 'Ideas are best met alongside people. Many mosques and Islamic centres warmly welcome visitors and sincere questions, and simply getting to know Muslims in your own community can offer a fuller, kinder picture than reading alone. There is no obligation involved — just an open door if you would like to learn more.',
          bn: 'ধারণাকে সবচেয়ে ভালোভাবে বোঝা যায় মানুষের সাথে মিলিয়ে। বহু মসজিদ ও ইসলামিক সেন্টার দর্শনার্থী ও আন্তরিক প্রশ্নকে সাদরে স্বাগত জানায়, আর নিজের এলাকার মুসলিমদের সাথে পরিচিত হওয়াই কেবল পড়ার চেয়ে অধিক পূর্ণ ও কোমল একটি চিত্র দিতে পারে। এতে কোনো বাধ্যবাধকতা নেই—আরও জানতে চাইলে কেবল একটি খোলা দরজা।',
        },
      },
      {
        heading: { en: 'Ask questions — sincerely and respectfully', bn: 'প্রশ্ন করুন—আন্তরিকভাবে ও শ্রদ্ধার সাথে' },
        body: {
          en: 'Honest questions are welcome, not unwelcome. If something is unclear or troubling, seek it out rather than setting it aside — the Common Questions and Common Objections sections here are a good place to start, and knowledgeable, trustworthy people are glad to help. Sincere seeking, in the Islamic view, is itself part of the path.',
          bn: 'সৎ প্রশ্ন অনাহূত নয়, বরং স্বাগত। কিছু অস্পষ্ট বা পীড়াদায়ক মনে হলে তা সরিয়ে না রেখে খুঁজে দেখুন—এখানকার সাধারণ প্রশ্নাবলি ও সাধারণ আপত্তি অংশগুলো শুরুর ভালো জায়গা, আর জ্ঞানী ও বিশ্বস্ত মানুষ সাহায্য করতে আনন্দিত। ইসলামের দৃষ্টিতে আন্তরিক অন্বেষণ নিজেই পথের অংশ।',
        },
      },
      {
        heading: { en: 'Go deeper with Further Study', bn: 'আরও অধ্যয়নে গভীরে যান' },
        body: {
          en: 'When you are ready for more, the Further Study section of this module lists reputable, mainstream resources — articles, courses, lectures and Q&A from qualified teachers — where you can explore any topic in greater depth, in your own time and on your own terms.',
          bn: 'আরও জানার জন্য প্রস্তুত হলে, এই মডিউলের আরও অধ্যয়ন অংশে নির্ভরযোগ্য মূলধারার উৎস তালিকাভুক্ত আছে—যোগ্য শিক্ষকদের প্রবন্ধ, কোর্স, বক্তৃতা ও প্রশ্নোত্তর—যেখানে আপনি নিজের সময়ে ও নিজের শর্তে যেকোনো বিষয় আরও গভীরে অন্বেষণ করতে পারেন।',
        },
      },
    ],
  },
  {
    id: 'study',
    emoji: '🎓',
    kind: 'resources',
    title: { en: 'Further Study', bn: 'আরও অধ্যয়ন' },
    summary: {
      en: 'A short, curated list of reputable, mainstream da‘wah and aqidah resources.',
      bn: 'নির্ভরযোগ্য মূলধারার দাওয়াহ ও আকিদার সংক্ষিপ্ত বাছাই করা উৎস-তালিকা।',
    },
    resources: [
      { name: 'Yaqeen Institute', url: 'https://yaqeeninstitute.org', emoji: '🔬',
        en: 'Research-based articles and videos on faith, doubts and aqidah', bn: 'ঈমান, সংশয় ও আকিদা নিয়ে গবেষণাভিত্তিক প্রবন্ধ ও ভিডিও' },
      { name: 'Sapience Institute', url: 'https://sapienceinstitute.org', emoji: '💡',
        en: "Da‘wah and the intellectual case for God and Islam", bn: 'দাওয়াহ এবং আল্লাহ ও ইসলামের বৌদ্ধিক যুক্তি' },
      { name: 'WhyIslam (ICNA)', url: 'https://www.whyislam.org', emoji: '🌱',
        en: 'Introductory articles and Q&A for those exploring Islam', bn: 'ইসলাম অন্বেষণকারীদের জন্য পরিচিতিমূলক প্রবন্ধ ও প্রশ্নোত্তর' },
      { name: 'iERA', url: 'https://iera.org', emoji: '🤝',
        en: 'Da‘wah training and accessible material on core beliefs', bn: 'দাওয়াহ প্রশিক্ষণ ও মূল বিশ্বাস নিয়ে সহজবোধ্য উপকরণ' },
      { name: 'SeekersGuidance', url: 'https://seekersguidance.org', emoji: '📚',
        en: 'Free structured courses in aqidah and the Islamic sciences', bn: 'আকিদা ও ইসলামি শাস্ত্রে বিনামূল্যে কাঠামোবদ্ধ কোর্স' },
      { name: 'AlMaghrib Institute', url: 'https://www.almaghrib.org', emoji: '🎓',
        en: 'Seminars and courses on creed, seerah and the Quran', bn: 'আকিদা, সিরাহ ও কুরআন নিয়ে সেমিনার ও কোর্স' },
      { name: 'Qalam Institute', url: 'https://qalam.institute', emoji: '🎙️',
        en: 'Classes, podcasts and tafsir from qualified scholars', bn: 'যোগ্য আলিমদের ক্লাস, পডকাস্ট ও তাফসির' },
      { name: 'IslamQA', url: 'https://islamqa.info/en', emoji: '❓',
        en: 'Referenced answers on belief and practice by scholars', bn: 'আলিমদের রেফারেন্সসহ বিশ্বাস ও আমল বিষয়ক উত্তর' },
      { name: 'Bayyinah Institute', url: 'https://bayyinah.com', emoji: '📗',
        en: 'Quranic Arabic and Quran study courses and reflections', bn: 'কুরআনি আরবি ও কুরআন অধ্যয়নের কোর্স ও অনুধ্যান' },
      { name: 'IslamHouse', url: 'https://islamhouse.com/en/', emoji: '🏠',
        en: 'Free introductory articles, books and audio in many languages', bn: 'বহু ভাষায় বিনামূল্যে পরিচিতিমূলক প্রবন্ধ, বই ও অডিও' },
      { name: 'Muslim Central', url: 'https://muslimcentral.com', emoji: '🎧',
        en: 'Large free audio library of lectures by mainstream scholars', bn: 'মূলধারার আলিমদের বক্তৃতার বিশাল বিনামূল্যে অডিও লাইব্রেরি' },
      { name: 'New Muslim Academy', url: 'https://www.newmuslimacademy.org', emoji: '🤝',
        en: 'Free classes and mentorship for those new to Islam', bn: 'ইসলামে নতুনদের জন্য বিনামূল্যে ক্লাস ও মেন্টরশিপ' },
      { name: 'IslamReligion.com', url: 'https://www.islamreligion.com', emoji: '🌍',
        en: 'Introductory articles and answers for those exploring Islam, in many languages', bn: 'ইসলাম অন্বেষণকারীদের জন্য বহু ভাষায় পরিচিতিমূলক প্রবন্ধ ও উত্তর' },
      { name: 'AboutIslam', url: 'https://aboutislam.net', emoji: '📰',
        en: 'Articles and Q&A on faith, ethics and everyday questions', bn: 'বিশ্বাস, নৈতিকতা ও দৈনন্দিন প্রশ্ন নিয়ে প্রবন্ধ ও প্রশ্নোত্তর' },
      { name: 'GainPeace', url: 'https://www.gainpeace.com', emoji: '☮️',
        en: 'Da‘wah outreach explaining Islam’s core beliefs clearly and calmly', bn: 'ইসলামের মূল বিশ্বাস স্পষ্ট ও শান্তভাবে ব্যাখ্যাকারী দাওয়াহ উদ্যোগ' },
    ],
  },
];

const WHY_ISLAM_QUIZ = [
  { qEn: 'What is the Arabic word for the Oneness of God?', qBn: 'আল্লাহর একত্বের আরবি শব্দ কী?',
    optsEn: ['Tawhid', 'Shirk', 'Taqwa', 'Ihsan'], optsBn: ['তাওহীদ', 'শিরক', 'তাকওয়া', 'ইহসান'], correct: 0 },
  { qEn: 'Which book do Muslims believe was revealed to Prophet Muhammad ﷺ?', qBn: 'মুসলিমরা বিশ্বাস করে কোন গ্রন্থ নবী মুহাম্মাদ ﷺ-এর উপর অবতীর্ণ হয়েছে?',
    optsEn: ['The Torah', 'The Gospel', 'The Quran', 'The Psalms'], optsBn: ['তাওরাত', 'ইঞ্জিল', 'কুরআন', 'যাবুর'], correct: 2 },
  { qEn: 'What does "Islam" literally mean?', qBn: '"ইসলাম" এর আভিধানিক অর্থ কী?',
    optsEn: ['Prayer', 'Submission to God', 'Charity', 'Fasting'], optsBn: ['প্রার্থনা', 'আল্লাহর কাছে আত্মসমর্পণ', 'দান', 'রোজা'], correct: 1 },
  { qEn: 'How many times is the Quran\'s preservation mentioned in the Quran itself?', qBn: 'কুরআনে কুরআনের সংরক্ষণ কতবার উল্লেখ করা হয়েছে?',
    optsEn: ['Once', 'Three times', 'Five times', 'Ten times'], optsBn: ['একবার', 'তিনবার', 'পাঁচবার', 'দশবার'], correct: 2 },
  { qEn: 'Which of these is a purpose of life according to Islam?', qBn: 'ইসলাম মতে জীবনের উদ্দেশ্য কী?',
    optsEn: ['To worship God alone', 'To seek wealth', 'To gain power', 'To enjoy life'], optsBn: ['একমাত্র আল্লাহর ইবাদত করা', 'সম্পদ অর্জন', 'ক্ষমতা লাভ', 'জীবন উপভোগ'], correct: 0 },
  { qEn: 'What is the Final Day called in Arabic?', qBn: 'শেষ দিবসকে আরবিতে কী বলা হয়?',
    optsEn: ['Yawm al-Jumu\'ah', 'Yawm al-Qiyamah', 'Yawm al-Jum\'ah', 'Yawm al-Qadr'], optsBn: ['ইয়াওমুল জুমুয়া', 'ইয়াওমুল কিয়ামাহ', 'ইয়াওমুল জুমআ', 'ইয়াওমুল কদর'], correct: 1 },
  { qEn: 'What does "Qadar" refer to in Islam?', qBn: 'ইসলামে "কদর" বলতে কী বোঝায়?',
    optsEn: ['Divine decree and predestination', 'Night prayer', 'Charity calculation', 'Pilgrimage rite'], optsBn: ['আল্লাহর নির্ধারিত ভাগ্য', 'রাতের নামাজ', 'যাকাত হিসাব', 'হজ্জের রীতি'], correct: 0 },
  { qEn: 'Which Prophet is mentioned most frequently in the Quran?', qBn: 'কুরআনে সবচেয়ে বেশি কোন নবীর নাম এসেছে?',
    optsEn: ['Muhammad ﷺ', 'Musa (Moses)', 'Ibrahim (Abraham)', 'Nuh (Noah)'], optsBn: ['মুহাম্মাদ ﷺ', 'মূসা (আঃ)', 'ইবরাহীম (আঃ)', 'নূহ (আঃ)'], correct: 1 },
  { qEn: 'The Quran has been preserved in which form since its revelation?', qBn: 'কুরআন অবতীর্ণের পর থেকে কীভাবে সংরক্ষিত হয়েছে?',
    optsEn: ['Only orally', 'Both oral and written', 'Only written', 'Only digital'], optsBn: ['শুধু মৌখিক', 'মৌখিক ও লিখিত উভয়ভাবেই', 'শুধু লিখিত', 'শুধু ডিজিটাল'], correct: 1 },
  { qEn: 'What does "Muhammad" mean in Arabic?', qBn: 'আরবিতে "মুহাম্মাদ" অর্থ কী?',
    optsEn: ['The praised one', 'The warrior', 'The messenger', 'The leader'], optsBn: ['প্রশংসিত', 'যোদ্ধা', 'বার্তাবাহক', 'নেতা'], correct: 0 },
  { qEn: 'How many chapters (sūrahs) are in the Quran?', qBn: 'কুরআনে কয়টি সূরা আছে?',
    optsEn: ['86', '114', '99', '25'], optsBn: ['৮৬', '১১৪', '৯৯', '২৫'], correct: 1 },
  { qEn: 'What is the first revelation that came to Prophet Muhammad ﷺ?', qBn: 'নবী মুহাম্মাদ ﷺ-এর উপর প্রথম কী অবতীর্ণ হয়?',
    optsEn: ['Surah al-Fatiha', 'The first 5 verses of Surah al-Alaq', 'Surah al-Ikhlas', 'Surah an-Nas'], optsBn: ['সূরা ফাতিহা', 'সূরা আলাকের প্রথম ৫ আয়াত', 'সূরা ইখলাস', 'সূরা নাস'], correct: 1 },
  { qEn: 'Which city did the Prophet ﷺ migrate to (Hijra)?', qBn: 'নবী ﷺ কোন শহরে হিজরত করেন?',
    optsEn: ['Jerusalem', 'Medina', 'Ta\'if', 'Najran'], optsBn: ['জেরুজালেম', 'মদিনা', 'তায়েফ', 'নাজরান'], correct: 1 },
  { qEn: 'What is the Arabic term for the Islamic creed "There is no god but Allah"?', qBn: '"আল্লাহ ছাড়া কোনো উপাস্য নেই"-এর আরবি পরিভাষা কী?',
    optsEn: ['Takbir', 'Tahlil', 'Tasbih', 'Tahmid'], optsBn: ['তাকবির', 'তাহলিল', 'তাসবিহ', 'তাহমিদ'], correct: 1 },
  { qEn: 'What does "Rahman" mean?', qBn: '"রহমান" অর্থ কী?',
    optsEn: ['The Most Merciful', 'The All-Knowing', 'The All-Powerful', 'The Eternal'], optsBn: ['পরম করুণাময়', 'সর্বজ্ঞ', 'সর্বশক্তিমান', 'চিরন্তন'], correct: 0 },
  { qEn: 'How many names of God are mentioned in the famous "99 Names" tradition?', qBn: 'বিখ্যাত "৯৯ নাম" ঐতিহ্যে আল্লাহর কতটি নাম উল্লেখ আছে?',
    optsEn: ['100', '99', '77', '33'], optsBn: ['১০০', '৯৯', '৭৭', '৩৩'], correct: 1 },
];

class WhyIslamView {
  constructor() {
    this.container = document.getElementById('why-islam-container');
    if (!this.container) return;
    this.language = (typeof appSettings !== 'undefined' && appSettings) ? (appSettings.get('language') || 'en') : 'en';
    this.rendered = false;
    this.currentId = null;
    this.query = '';
    this.readSet = this.loadRead();
    this.quizAnswers = {};
    this.quizSubmitted = false;
    this.quizBest = this.loadQuizBest();

    window.addEventListener('tabChanged', (e) => {
      if (e && e.detail && e.detail.tabId === 'whyislam') this.render();
    });
    window.addEventListener('settingChanged', (e) => {
      if (e && e.detail && e.detail.key === 'language') {
        this.language = e.detail.value || 'en';
        if (this.rendered) this.render();
      }
    });
  }

  /* ---------- helpers ---------- */
  tt(key) {
    try {
      if (typeof t === 'function') {
        const v = t(key, this.language);
        if (v && v !== key) return v; // orchestrator-wired translation wins
      }
    } catch (_) { /* ignore */ }
    const fb = WHY_ISLAM_I18N[key];
    if (fb) return this.language === 'bn' ? (fb.bn || fb.en) : fb.en;
    return key;
  }

  L(obj) {
    if (!obj) return '';
    return this.language === 'bn' ? (obj.bn || obj.en || '') : (obj.en || '');
  }

  /* Content-language resolver: bn from inline data, other non-English
   * languages via the CI18N knowledgebase (keyed by English text),
   * falling back to English. Used for all CONTENT display sites. */
  lc(o) {
    if (!o) return '';
    if (this.language === 'bn' && o.bn) return o.bn;
    if (o.en && typeof CI18N !== 'undefined') { const tr = CI18N.tr(this.language, o.en); if (tr) return tr; }
    return o.en || o.bn || '';
  }

  esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, c => (
      { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
    ));
  }

  loadQuizBest() {
    try { return parseInt(localStorage.getItem('lq_whyislam_quiz_best'), 10) || 0; } catch (_) { return 0; }
  }
  saveQuizBest() {
    try { localStorage.setItem('lq_whyislam_quiz_best', String(this.quizBest)); } catch (_) { }
  }

  loadRead() {
    const s = new Set();
    try {
      const raw = localStorage.getItem('lq_whyislam_read');
      if (raw) {
        const arr = JSON.parse(raw);
        if (Array.isArray(arr)) arr.forEach(id => { if (typeof id === 'string') s.add(id); });
      }
    } catch (_) { }
    return s;
  }

  saveRead() {
    try {
      localStorage.setItem('lq_whyislam_read', JSON.stringify(Array.from(this.readSet)));
    } catch (_) { /* ignore */ }
  }

  topicById(id) { return WHY_ISLAM_DATA.find(t => t.id === id) || null; }

  matches(topic, q) {
    if (!q) return true;
    const parts = [this.L(topic.title), this.L(topic.summary)];
    (topic.points || []).forEach(p => { parts.push(this.L(p.heading), this.L(p.body)); });
    (topic.qa || []).forEach(x => { parts.push(this.L(x.q), this.L(x.a)); });
    (topic.resources || []).forEach(r => { parts.push(r.name, this.L(r)); });
    (topic.terms || []).forEach(x => { parts.push(x.term, x.bnTerm || '', this.L(x)); });
    return parts.join('   ').toLowerCase().indexOf(q) !== -1;
  }

  /* ---------- render dispatch ---------- */
  render() {
    this.rendered = true;
    if (!this.container) return;
    try {
      if (this.currentId === '__quiz__') {
        this.renderQuiz();
      } else if (this.currentId && this.topicById(this.currentId)) {
        this.renderDetail(this.topicById(this.currentId));
      } else {
        this.currentId = null;
        this.renderHome();
      }
    } catch (_) {
      this.container.innerHTML = '';
    }
  }

  /* ---------- quiz view ---------- */
  renderQuiz() {
    const submitted = this.quizSubmitted;
    const total = WHY_ISLAM_QUIZ.length;
    let score = 0;
    const answeredAll = WHY_ISLAM_QUIZ.every((_, i) => this.quizAnswers[i] != null);

    const questions = WHY_ISLAM_QUIZ.map((q, qi) => {
      const sel = this.quizAnswers[qi];
      const opts = q.optsEn.map((_, oi) => ({ en: q.optsEn[oi], bn: q.optsBn[oi] }));
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
        return `<button type="button" ${submitted ? 'disabled' : ''} data-wi-quiz-opt="${qi}:${oi}"
          class="w-full text-left px-3 py-2 rounded-lg border text-sm transition-colors ${cls}" dir="auto">${this.esc(this.lc(o))}${mark}</button>`;
      }).join('');
      return `
        <div class="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
          <p class="font-semibold text-sm text-gray-800 dark:text-gray-100 mb-2" dir="auto">${qi + 1}. ${this.esc(this.lc({ en: q.qEn, bn: q.qBn }))}</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">${optHtml}</div>
        </div>`;
    }).join('');

    const footer = submitted
      ? `<div class="text-center py-6">
           <div class="inline-flex flex-col items-center gap-1 px-6 py-4 rounded-xl bg-primary/5">
             <span class="text-sm text-gray-500 dark:text-gray-400">${this.esc(this.tt('whyislam_quiz_score'))}</span>
             <span class="text-3xl font-bold text-primary">${score} / ${total}</span>
             <span class="text-xs text-gray-500 dark:text-gray-400">${this.esc(this.tt('whyislam_quiz_best'))}: ${Math.max(this.quizBest, score)} / ${total}</span>
           </div>
           <div class="mt-3">
             <button type="button" data-wi-quiz-reset
               class="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:opacity-90">${this.esc(this.tt('whyislam_quiz_retake'))}</button>
           </div>
         </div>`
      : `<div class="text-center pt-4 pb-6">
           <button type="button" data-wi-quiz-submit ${answeredAll ? '' : 'disabled'}
             class="px-5 py-2 rounded-lg text-sm font-medium transition-colors ${answeredAll ? 'bg-primary text-white hover:opacity-90 cursor-pointer' : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'}">${this.esc(this.tt('whyislam_quiz_submit'))}</button>
           ${answeredAll ? '' : `<p class="text-xs text-gray-400 dark:text-gray-500 mt-2">${this.esc(this.tt('whyislam_quiz_hint'))}</p>`}
         </div>`;

    this.container.innerHTML = `
      <div class="w-full max-w-3xl mx-auto">
        <button type="button" id="wi-back"
          class="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-primary mb-5">
          <span aria-hidden="true">←</span><span>${this.esc(this.tt('whyislam_back'))}</span>
        </button>

        <div class="text-center mb-4">
          <h3 class="text-xl font-bold text-gray-800 dark:text-gray-100">🧠 ${this.esc(this.tt('whyislam_quiz_title'))}</h3>
          <p class="text-xs text-gray-400 dark:text-gray-500 mt-1" dir="auto">${this.esc(this.tt('whyislam_quiz_intro'))}
            <span class="ml-2">· ${this.esc(this.tt('whyislam_quiz_best'))}: ${this.quizBest} / ${total}</span></p>
        </div>
        <div class="space-y-3">${questions}</div>
        ${footer}
      </div>`;
    this.wireQuiz();
  }

  wireQuiz() {
    const back = this.container.querySelector('#wi-back');
    if (back) back.addEventListener('click', () => { this.currentId = null; this.quizAnswers = {}; this.quizSubmitted = false; this.renderHome(); });
    this.container.querySelectorAll('[data-wi-quiz-opt]').forEach(el => {
      el.addEventListener('click', () => {
        if (this.quizSubmitted) return;
        const [qi, oi] = el.getAttribute('data-wi-quiz-opt').split(':').map(Number);
        if (!isNaN(qi) && !isNaN(oi)) { this.quizAnswers[qi] = oi; this.renderQuiz(); }
      });
    });
    const subBtn = this.container.querySelector('[data-wi-quiz-submit]');
    if (subBtn) subBtn.addEventListener('click', () => this.submitQuizWI());
    const resetBtn = this.container.querySelector('[data-wi-quiz-reset]');
    if (resetBtn) resetBtn.addEventListener('click', () => { this.quizAnswers = {}; this.quizSubmitted = false; this.renderQuiz(); });
  }

  submitQuizWI() {
    let score = 0;
    WHY_ISLAM_QUIZ.forEach((q, i) => { if (this.quizAnswers[i] === q.correct) score++; });
    if (score > this.quizBest) { this.quizBest = score; this.saveQuizBest(); }
    this.quizSubmitted = true;
    this.renderQuiz();
  }

  /* ---------- home grid ---------- */
  renderHome() {
    const q = (this.query || '').trim().toLowerCase();
    const list = WHY_ISLAM_DATA.filter(topic => this.matches(topic, q));
    const total = WHY_ISLAM_DATA.length;
    const readCount = WHY_ISLAM_DATA.filter(t => this.readSet.has(t.id)).length;
    const pct = total ? Math.round((readCount / total) * 100) : 0;

    const cards = list.map(topic => {
      const isRead = this.readSet.has(topic.id);
      const badge = isRead
        ? `<span class="inline-flex items-center gap-1 text-[0.65rem] font-medium text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded-full">✓ ${this.esc(this.tt('whyislam_marked_read'))}</span>`
        : '';
      return `
        <button type="button" data-topic="${this.esc(topic.id)}"
          class="wi-card group text-start flex flex-col gap-2 p-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
                 hover:border-primary hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all">
          <span class="flex items-center gap-3">
            <span class="text-2xl" aria-hidden="true">${topic.emoji}</span>
            <span class="flex-1 min-w-0 font-bold text-gray-800 dark:text-gray-100" dir="auto">${this.esc(this.lc(topic.title))}</span>
            <span class="text-gray-300 dark:text-gray-600 group-hover:text-primary transition-colors" aria-hidden="true">→</span>
          </span>
          <span class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed" dir="auto">${this.esc(this.lc(topic.summary))}</span>
          <span class="mt-1 flex items-center justify-between">
            <span class="text-xs text-primary dark:text-blue-400 font-medium">${this.esc(this.tt('whyislam_read_more'))}</span>
            ${badge}
          </span>
        </button>`;
    }).join('');

    const grid = list.length
      ? `<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">${cards}</div>`
      : `<p class="text-center text-gray-500 dark:text-gray-400 py-12">${this.esc(this.tt('whyislam_no_results'))}</p>`;

    this.container.innerHTML = `
      <div class="w-full max-w-4xl mx-auto">
        <div class="text-center mb-4">
          <p class="text-gray-500 dark:text-gray-400 text-sm" dir="auto">${this.esc(this.tt('whyislam_subtitle'))}</p>
        </div>
        <p class="text-xs text-gray-400 dark:text-gray-500 text-center mb-5" dir="auto">🕊️ ${this.esc(this.tt('whyislam_note'))}</p>

        <div class="mb-4">
          <input type="search" id="wi-search" value="${this.esc(this.query)}"
            placeholder="${this.esc(this.tt('whyislam_search_placeholder'))}"
            class="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
                   text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/40"
            dir="auto" autocomplete="off" />
        </div>

        <div class="mb-6">
          <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
            <span>${readCount} / ${total} ${this.esc(this.tt('whyislam_progress'))}</span>
            <span>${pct}%</span>
          </div>
          <div class="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
            <div class="h-full rounded-full bg-primary transition-all" style="width:${pct}%"></div>
          </div>
        </div>

        <div class="mt-6 mb-6">
          <button type="button" data-topic="__quiz__"
            class="w-full group text-start flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800 hover:shadow-md transition-all">
            <span class="text-3xl" aria-hidden="true">🧠</span>
            <span class="flex-1 min-w-0">
            <span class="block font-bold text-gray-800 dark:text-gray-100">${this.esc(this.tt('whyislam_quiz_title'))}</span>
            <span class="block text-sm text-gray-500 dark:text-gray-400 leading-relaxed" dir="auto">${this.esc(this.tt('whyislam_quiz_intro'))}</span>
            </span>
            <span class="text-gray-300 dark:text-gray-600 group-hover:text-primary transition-colors" aria-hidden="true">→</span>
          </button>
        </div>

        ${grid}

        <p class="text-xs text-gray-400 dark:text-gray-500 text-center mt-8 mb-8" dir="auto">${this.esc(this.tt('whyislam_disclaimer'))}</p>
      </div>`;

    this.wireHome();
  }

  wireHome() {
    const search = this.container.querySelector('#wi-search');
    if (search) {
      search.addEventListener('input', (e) => {
        this.query = e.target.value || '';
        const pos = search.selectionStart;
        this.renderHome();
        const again = this.container.querySelector('#wi-search');
        if (again) { again.focus(); try { again.setSelectionRange(pos, pos); } catch (_) {} }
      });
    }
    this.container.querySelectorAll('[data-topic]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.currentId = btn.getAttribute('data-topic');
        const topic = this.topicById(this.currentId);
        if (topic) this.renderDetail(topic);
      });
    });
  }

  /* ---------- detail view ---------- */
  renderDetail(topic) {
    const isRead = this.readSet.has(topic.id);
    let body = '';

    if (topic.kind === 'qa') {
      const qlabel = topic.qaLabel ? (this.esc(this.lc(topic.qaLabel)) + '&nbsp;') : 'Q';
      body = `<div class="flex flex-col gap-3">${(topic.qa || []).map((x, i) => `
        <details class="group rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden">
          <summary class="cursor-pointer list-none flex items-center gap-3 p-4 font-semibold text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700/50">
            <span class="text-primary dark:text-blue-400 whitespace-nowrap" aria-hidden="true">${qlabel}${i + 1}</span>
            <span class="flex-1 min-w-0" dir="auto">${this.esc(this.lc(x.q))}</span>
            <span class="text-gray-400 group-open:rotate-180 transition-transform" aria-hidden="true">▾</span>
          </summary>
          <div class="px-4 pb-4 pt-1 text-sm text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-gray-700" dir="auto">${this.esc(this.lc(x.a))}</div>
        </details>`).join('')}</div>`;
    } else if (topic.kind === 'embrace') {
      const sh = topic.shahada || {};
      const shahadaBlock = `
        <div class="mb-6 p-5 rounded-2xl bg-primary/5 dark:bg-blue-900/20 border border-primary/20 dark:border-blue-800 text-center">
          <p class="text-xs uppercase tracking-wide text-primary dark:text-blue-400 font-semibold mb-2">${this.esc(this.tt('whyislam_shahada_label'))}</p>
          ${sh.arabic ? `<p class="text-2xl leading-loose text-gray-800 dark:text-gray-100 mb-2" dir="rtl" lang="ar">${this.esc(sh.arabic)}</p>` : ''}
          ${sh.translit ? `<p class="text-sm italic text-gray-500 dark:text-gray-400 mb-1" dir="ltr">${this.esc(sh.translit)}</p>` : ''}
          <p class="text-sm text-gray-700 dark:text-gray-200" dir="auto">“${this.esc(this.lc(sh))}”</p>
        </div>
        <p class="mb-6 text-sm text-gray-600 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-xl p-4" dir="auto">🕊️ ${this.esc(this.tt('whyislam_embrace_welcome'))}</p>`;
      const pts = `<div class="flex flex-col gap-5">${(topic.points || []).map(p => `
        <section>
          <h4 class="font-bold text-gray-800 dark:text-gray-100 mb-1.5" dir="auto">${this.esc(this.lc(p.heading))}</h4>
          <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed" dir="auto">${this.esc(this.lc(p.body))}</p>
        </section>`).join('')}</div>`;
      body = shahadaBlock + pts;
    } else if (topic.kind === 'glossary') {
      body = `<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">${(topic.terms || []).map(x => `
        <div class="flex flex-col gap-1 p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <span class="font-bold text-gray-800 dark:text-gray-100">
            ${this.esc(this.lc({ en: x.term }))}${x.bnTerm && this.language === 'bn' ? ` <span class="font-normal text-gray-500 dark:text-gray-400">(${this.esc(x.bnTerm)})</span>` : ''}
          </span>
          <span class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed" dir="auto">${this.esc(this.lc(x))}</span>
        </div>`).join('')}</div>`;
    } else if (topic.kind === 'resources') {
      body = `<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">${(topic.resources || []).map(r => `
        <a href="${this.esc(r.url)}" target="_blank" rel="noopener noreferrer"
           class="group flex flex-col gap-1 p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary hover:shadow-md transition-all">
          <span class="flex items-center gap-2 font-semibold text-gray-800 dark:text-gray-100">
            <span class="text-lg" aria-hidden="true">${r.emoji || '🔗'}</span>
            <span class="flex-1 min-w-0 truncate">${this.esc(r.name)}</span>
            <span class="text-gray-300 dark:text-gray-600 group-hover:text-primary transition-colors" aria-hidden="true">↗</span>
          </span>
          <span class="text-xs text-gray-500 dark:text-gray-400 leading-relaxed" dir="auto">${this.esc(this.lc(r))}</span>
          <span class="text-[0.65rem] text-gray-400 dark:text-gray-500 truncate" dir="ltr">${this.esc(String(r.url).replace(/^https?:\/\//, ''))}</span>
        </a>`).join('')}</div>`;
    } else {
      body = `<div class="flex flex-col gap-5">${(topic.points || []).map(p => `
        <section>
          <h4 class="font-bold text-gray-800 dark:text-gray-100 mb-1.5" dir="auto">${this.esc(this.lc(p.heading))}</h4>
          <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed" dir="auto">${this.esc(this.lc(p.body))}</p>
        </section>`).join('')}</div>`;
    }

    const readBtn = `
      <button type="button" id="wi-read"
        class="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors
               ${isRead
                 ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800'
                 : 'bg-primary text-white hover:opacity-90'}">
        <span aria-hidden="true">${isRead ? '✓' : '＋'}</span>
        <span>${this.esc(isRead ? this.tt('whyislam_marked_read') : this.tt('whyislam_mark_read'))}</span>
      </button>`;

    const noteBanner = topic.noteKey
      ? `<p class="mb-5 text-xs text-gray-500 dark:text-gray-400 leading-relaxed bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-xl p-3" dir="auto">🤝 ${this.esc(this.tt(topic.noteKey))}</p>`
      : '';

    this.container.innerHTML = `
      <div class="w-full max-w-3xl mx-auto">
        <button type="button" id="wi-back"
          class="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-primary mb-5">
          <span aria-hidden="true">←</span><span>${this.esc(this.tt('whyislam_back'))}</span>
        </button>

        <div class="flex items-start gap-3 mb-4">
          <span class="text-3xl" aria-hidden="true">${topic.emoji}</span>
          <div class="flex-1 min-w-0">
            <h3 class="text-xl font-bold text-gray-800 dark:text-gray-100" dir="auto">${this.esc(this.lc(topic.title))}</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400" dir="auto">${this.esc(this.lc(topic.summary))}</p>
          </div>
        </div>

        <div class="mb-5">${readBtn}</div>

        ${noteBanner}

        ${body}

        <p class="text-xs text-gray-400 dark:text-gray-500 text-center mt-8 mb-8" dir="auto">${this.esc(this.tt('whyislam_disclaimer'))}</p>
      </div>`;

    this.wireDetail(topic);
  }

  wireDetail(topic) {
    const back = this.container.querySelector('#wi-back');
    if (back) back.addEventListener('click', () => { this.currentId = null; this.renderHome(); });

    const readBtn = this.container.querySelector('#wi-read');
    if (readBtn) {
      readBtn.addEventListener('click', () => {
        if (this.readSet.has(topic.id)) this.readSet.delete(topic.id);
        else this.readSet.add(topic.id);
        this.saveRead();
        this.renderDetail(topic);
      });
    }
  }
}

let whyIslamView;
document.addEventListener('DOMContentLoaded', () => { whyIslamView = new WhyIslamView(); });
