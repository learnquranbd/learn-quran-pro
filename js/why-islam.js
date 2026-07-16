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
    ],
  },
];

class WhyIslamView {
  constructor() {
    this.container = document.getElementById('why-islam-container');
    if (!this.container) return;
    this.language = (typeof appSettings !== 'undefined' && appSettings) ? (appSettings.get('language') || 'en') : 'en';
    this.rendered = false;
    this.currentId = null; // null => home grid; otherwise topic detail
    this.query = '';
    this.readSet = this.loadRead();

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

  esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, c => (
      { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
    ));
  }

  loadRead() {
    const s = new Set();
    try {
      const raw = localStorage.getItem('lq_whyislam_read');
      if (raw) {
        const arr = JSON.parse(raw);
        if (Array.isArray(arr)) arr.forEach(id => { if (typeof id === 'string') s.add(id); });
      }
    } catch (_) { /* ignore */ }
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
    return parts.join('   ').toLowerCase().indexOf(q) !== -1;
  }

  /* ---------- render dispatch ---------- */
  render() {
    this.rendered = true;
    if (!this.container) return;
    try {
      if (this.currentId && this.topicById(this.currentId)) {
        this.renderDetail(this.topicById(this.currentId));
      } else {
        this.currentId = null;
        this.renderHome();
      }
    } catch (_) {
      // Never throw into the app shell.
      this.container.innerHTML = '';
    }
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
            <span class="flex-1 min-w-0 font-bold text-gray-800 dark:text-gray-100" dir="auto">${this.esc(this.L(topic.title))}</span>
            <span class="text-gray-300 dark:text-gray-600 group-hover:text-primary transition-colors" aria-hidden="true">→</span>
          </span>
          <span class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed" dir="auto">${this.esc(this.L(topic.summary))}</span>
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
      body = `<div class="flex flex-col gap-3">${(topic.qa || []).map((x, i) => `
        <details class="group rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden">
          <summary class="cursor-pointer list-none flex items-center gap-3 p-4 font-semibold text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700/50">
            <span class="text-primary dark:text-blue-400" aria-hidden="true">Q${i + 1}</span>
            <span class="flex-1 min-w-0" dir="auto">${this.esc(this.L(x.q))}</span>
            <span class="text-gray-400 group-open:rotate-180 transition-transform" aria-hidden="true">▾</span>
          </summary>
          <div class="px-4 pb-4 pt-1 text-sm text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-gray-700" dir="auto">${this.esc(this.L(x.a))}</div>
        </details>`).join('')}</div>`;
    } else if (topic.kind === 'embrace') {
      const sh = topic.shahada || {};
      const shahadaBlock = `
        <div class="mb-6 p-5 rounded-2xl bg-primary/5 dark:bg-blue-900/20 border border-primary/20 dark:border-blue-800 text-center">
          <p class="text-xs uppercase tracking-wide text-primary dark:text-blue-400 font-semibold mb-2">${this.esc(this.tt('whyislam_shahada_label'))}</p>
          ${sh.arabic ? `<p class="text-2xl leading-loose text-gray-800 dark:text-gray-100 mb-2" dir="rtl" lang="ar">${this.esc(sh.arabic)}</p>` : ''}
          ${sh.translit ? `<p class="text-sm italic text-gray-500 dark:text-gray-400 mb-1" dir="ltr">${this.esc(sh.translit)}</p>` : ''}
          <p class="text-sm text-gray-700 dark:text-gray-200" dir="auto">“${this.esc(this.L(sh))}”</p>
        </div>
        <p class="mb-6 text-sm text-gray-600 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-xl p-4" dir="auto">🕊️ ${this.esc(this.tt('whyislam_embrace_welcome'))}</p>`;
      const pts = `<div class="flex flex-col gap-5">${(topic.points || []).map(p => `
        <section>
          <h4 class="font-bold text-gray-800 dark:text-gray-100 mb-1.5" dir="auto">${this.esc(this.L(p.heading))}</h4>
          <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed" dir="auto">${this.esc(this.L(p.body))}</p>
        </section>`).join('')}</div>`;
      body = shahadaBlock + pts;
    } else if (topic.kind === 'resources') {
      body = `<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">${(topic.resources || []).map(r => `
        <a href="${this.esc(r.url)}" target="_blank" rel="noopener noreferrer"
           class="group flex flex-col gap-1 p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary hover:shadow-md transition-all">
          <span class="flex items-center gap-2 font-semibold text-gray-800 dark:text-gray-100">
            <span class="text-lg" aria-hidden="true">${r.emoji || '🔗'}</span>
            <span class="flex-1 min-w-0 truncate">${this.esc(r.name)}</span>
            <span class="text-gray-300 dark:text-gray-600 group-hover:text-primary transition-colors" aria-hidden="true">↗</span>
          </span>
          <span class="text-xs text-gray-500 dark:text-gray-400 leading-relaxed" dir="auto">${this.esc(this.L(r))}</span>
          <span class="text-[0.65rem] text-gray-400 dark:text-gray-500 truncate" dir="ltr">${this.esc(String(r.url).replace(/^https?:\/\//, ''))}</span>
        </a>`).join('')}</div>`;
    } else {
      body = `<div class="flex flex-col gap-5">${(topic.points || []).map(p => `
        <section>
          <h4 class="font-bold text-gray-800 dark:text-gray-100 mb-1.5" dir="auto">${this.esc(this.L(p.heading))}</h4>
          <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed" dir="auto">${this.esc(this.L(p.body))}</p>
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

    this.container.innerHTML = `
      <div class="w-full max-w-3xl mx-auto">
        <button type="button" id="wi-back"
          class="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-primary mb-5">
          <span aria-hidden="true">←</span><span>${this.esc(this.tt('whyislam_back'))}</span>
        </button>

        <div class="flex items-start gap-3 mb-4">
          <span class="text-3xl" aria-hidden="true">${topic.emoji}</span>
          <div class="flex-1 min-w-0">
            <h3 class="text-xl font-bold text-gray-800 dark:text-gray-100" dir="auto">${this.esc(this.L(topic.title))}</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400" dir="auto">${this.esc(this.L(topic.summary))}</p>
          </div>
        </div>

        <div class="mb-5">${readBtn}</div>

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
