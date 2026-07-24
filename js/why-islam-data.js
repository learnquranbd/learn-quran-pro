/**
 * Why Islam — DATA MODULE
 * Extracted from js/why-islam.js.
 * Globals: WHY_ISLAM_I18N, WHY_ISLAM_DATA, WHY_ISLAM_QUIZ, plus any additional consts.
 * Loaded BEFORE js/why-islam.js in index.html.
 */

const WHY_ISLAM_I18N = {
  whyislam_subtitle: {
    en: 'A calm, reasoned introduction to the case for Islam — and honest answers to sincere questions.',
    bn: 'ইসলামের যৌক্তিক পরিচিতি — এবং আন্তরিক প্রশ্নের সৎ উত্তর, শান্ত ও পাণ্ডিত্যপূর্ণ ভঙ্গিতে।',
    zh: '对伊斯兰教的冷静、理性介绍——以及对真诚问题的诚实回答。',
    ja: 'イスラームへの穏やかで合理的な入門——誠実な問いへの正直な回答。',
  },
  whyislam_search_placeholder: { en: 'Search topics and questions…', bn: 'বিষয় ও প্রশ্ন খুঁজুন…', zh: '搜索主题和问题…', ja: 'トピックや質問を検索…' },
  whyislam_back: { en: 'All topics', bn: 'সব বিষয়', zh: '所有主题', ja: 'すべてのトピック' },
  whyislam_mark_read: { en: 'Mark as read', bn: 'পড়া হয়েছে চিহ্নিত করুন', zh: '标记为已读', ja: '既読にする' },
  whyislam_marked_read: { en: 'Read', bn: 'পড়া হয়েছে', zh: '已读', ja: '既読' },
  whyislam_progress: { en: 'read', bn: 'পড়া হয়েছে', zh: '已读', ja: '既読' },
  whyislam_no_results: { en: 'No topics match your search.', bn: 'আপনার অনুসন্ধানে কোনো বিষয় মেলেনি।', zh: '没有与搜索匹配的主题。', ja: '検索に一致するトピックはありません。' },
  whyislam_note: {
    en: 'This section explains the Islamic position and its reasoning. It is meant to inform and invite reflection, with respect for everyone.',
    bn: 'এই অংশে ইসলামের অবস্থান ও তার যুক্তি ব্যাখ্যা করা হয়েছে। উদ্দেশ্য জ্ঞান দেওয়া ও চিন্তায় আমন্ত্রণ জানানো, সবার প্রতি শ্রদ্ধা রেখে।',
    zh: '本节解释伊斯兰教的立场及其推理。旨在提供信息和引发思考，尊重每一个人。',
    ja: 'このセクションでは、イスラームの立場とその論理を説明します。すべての人への敬意をもって、情報提供と内省への招待を目的としています。',
  },
  whyislam_disclaimer: {
    en: 'Educational overview in the mainstream Sunni tradition. For detailed rulings and study, consult qualified scholars and the further-study resources.',
    bn: 'মূলধারার সুন্নি ঐতিহ্যে একটি শিক্ষামূলক পরিচিতি। বিস্তারিত জানতে শুধুমাত্র ইসলামিক জ্ঞানসম্পন্ন আলিমের কাছে জানুন।',
    zh: '基于主流逊尼派传统的教育性概述。如需详细裁决和学习，请咨询合格的学者和进一步学习资源。',
    ja: '主流スンナ派の伝統に基づく教育的概要。詳細な判断や学習については、資格のある学者や追加の学習リソースを参照してください。',
  },
  whyislam_read_more: { en: 'Read topic', bn: 'বিষয়টি পড়ুন', zh: '阅读主题', ja: 'トピックを読む' },
  whyislam_open_link: { en: 'Visit', bn: 'দেখুন', zh: '访问', ja: '訪問' },
  whyislam_shahada_label: { en: 'The Testimony of Faith (Shahada)', bn: 'ঈমানের সাক্ষ্য (শাহাদাহ)', zh: '信仰的见证（作证言）', ja: '信仰の証言（シャハーダ）' },
  whyislam_embrace_welcome: {
    en: 'This is an informational explanation, offered gently and without any pressure. In Islam, becoming a Muslim is a free and personal choice (Quran 2:256 — "There shall be no compulsion in religion"). Take your time to learn and reflect.',
    bn: 'এটি একটি তথ্যমূলক ব্যাখ্যা, কোমলভাবে ও কোনো চাপ ছাড়াই উপস্থাপিত। ইসলামে মুসলিম হওয়া একটি স্বাধীন ও ব্যক্তিগত সিদ্ধান্ত (কুরআন ২:২৫৬—"দ্বীনের ব্যাপারে কোনো জবরদস্তি নেই")। শেখা ও চিন্তার জন্য সময় নিন।',
    zh: '这是一份信息性的说明，温和且无任何压力地呈现。在伊斯兰教中，成为穆斯林是一个自由和个人选择（古兰经 2:256——"宗教中无强迫"）。请花时间学习和思考。',
    ja: 'これは情報提供のための説明であり、穏やかに、強制なく提供されます。イスラームでは、ムスリムになることは自由で個人的な選択です（クルアーン 2:256 —「宗教に強制はありません」）。学び、熟考するために時間をかけてください。',
  },
  whyislam_objections_note: {
    en: 'Each objection is stated fairly first, then answered. The aim is to engage the arguments honestly — never to disparage anyone who holds them.',
    bn: 'প্রতিটি আপত্তি প্রথমে ন্যায্যভাবে উপস্থাপন করা হয়েছে, তারপর উত্তর দেওয়া হয়েছে। উদ্দেশ্য যুক্তির সাথে সৎ সংলাপ—যাঁরা এই আপত্তি রাখেন তাঁদের কাউকে ছোট করা নয়।',
    zh: '每个反对意见首先被公平陈述，然后予以回答。目的是诚实地参与论证——绝不贬低持有这些意见的人。',
    ja: '各反論はまず公平に述べられ、その後に回答されます。目的は議論に誠実に関わることであり、それを保持する人を決して貶めることではありません。',
  },
  whyislam_comparative_note: {
    en: 'This compares ideas and concepts of God — describing what Islam affirms and why. It is offered with respect for other faith communities and is not a criticism of any people.',
    bn: 'এটি ধারণা ও ঈশ্বর-কল্পনার তুলনা করে—ইসলাম কী নিশ্চিত করে ও কেন, তা বর্ণনা করে। এটি অন্যান্য ধর্মসম্প্রদায়ের প্রতি শ্রদ্ধা রেখে উপস্থাপিত, কোনো মানুষের সমালোচনা নয়।',
    zh: '这部分比较关于神的观念和概念——描述伊斯兰教所肯定的内容及其原因。这是对其他信仰群体尊重的呈现，而非对任何人的批评。',
    ja: 'これは神についての考えや概念を比較し、イスラームが何をなぜ肯定するかを説明します。他の信仰共同体への敬意をもって提供され、どの人々への批判でもありません。',
  },
  whyislam_dialogue_note: {
    en: 'Guidance on inviting others with wisdom, gentleness and respect — and without any compulsion.',
    bn: 'প্রজ্ঞা, কোমলতা ও শ্রদ্ধার সাথে—এবং কোনো জবরদস্তি ছাড়াই—অন্যকে আমন্ত্রণ জানানোর নির্দেশনা।',
    zh: '以智慧、温和和尊重——且没有任何强迫——邀请他人的指导。',
    ja: '知恵、優しさ、敬意をもって——強制することなく——他者を招くためのガイダンス。',
  },
  whyislam_glossary_note: {
    en: 'Short introductory definitions. Each term carries much more depth in the scholarly tradition.',
    bn: 'সংক্ষিপ্ত পরিচিতিমূলক সংজ্ঞা। প্রতিটি পরিভাষা শাস্ত্রীয় ঐতিহ্যে আরও অনেক গভীরতা বহন করে।',
    zh: '简短介绍性定义。每个术语在学术传统中都承载着更深的含义。',
    ja: '簡潔な入門的定義。各用語は学術的伝統の中ではるかに深い意味を持っています。',
  },
  whyislam_stories_note: {
    en: 'A general note, shared respectfully — journeys of faith are personal, and no pressure is intended.',
    bn: 'একটি সাধারণ নোট, শ্রদ্ধার সাথে উপস্থাপিত—ঈমানের যাত্রা ব্যক্তিগত, এবং কোনো চাপ উদ্দিষ্ট নয়।',
    zh: '一个一般性说明，怀着尊重分享——信仰之旅是个人的，并无意施加任何压力。',
    ja: '一般的な注意事項を敬意をもって共有します——信仰の旅は個人的なものであり、圧力をかける意図はありません。',
  },
  whyislam_misconceptions_note: {
    en: 'Each item states a sincere misconception fairly, then clarifies it. The aim is honest understanding — never to mock or blame anyone who holds it.',
    bn: 'প্রতিটি অংশে একটি আন্তরিক ভুল ধারণা প্রথমে ন্যায্যভাবে উপস্থাপন করা হয়েছে, তারপর তা স্পষ্ট করা হয়েছে। উদ্দেশ্য সৎ বোঝাপড়া—যিনি এমন ধারণা রাখেন তাঁকে উপহাস বা দোষারোপ করা কখনোই নয়।',
    zh: '每条都公平地陈述一个真诚的误解，然后予以澄清。目的是诚实的理解——绝不嘲笑或责怪持有该误解的人。',
    ja: '各項目は誠実な誤解を公平に述べた上で、それを明確にします。目的は正直な理解であり、それを抱く人を決して嘲ったり非難したりすることではありません。',
  },
  whyislam_next_note: {
    en: 'These are gentle suggestions only, offered without any pressure. Go at your own pace, and follow whichever step feels right for you.',
    bn: 'এগুলো কেবল কোমল পরামর্শ, কোনো চাপ ছাড়াই উপস্থাপিত। নিজের গতিতে এগোন, এবং যে পদক্ষেপ আপনার কাছে উপযুক্ত মনে হয় তা-ই অনুসরণ করুন।',
    zh: '这些仅是温和的建议，没有任何压力。按照自己的节奏前进，跟随你觉得合适的任何步骤。',
    ja: 'これらは穏やかな提案であり、強制ではありません。ご自身のペースで進め、あなたにとって正しいと感じるステップに従ってください。',
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
  /* ── NEW: Misconceptions & Comparative Topics ─────────────────────────── */
  {
    id: 'misconceptions-women',
    emoji: '👩',
    kind: 'article',
    noteKey: 'whyislam_misconceptions_note',
    title: { en: 'Misconceptions: Women in Islam', bn: 'ভুল ধারণা: ইসলামে নারী' },
    summary: {
      en: 'Four common misconceptions about women\'s status, rights and role in Islam — stated fairly, then clarified.',
      bn: 'ইসলামে নারীর মর্যাদা, অধিকার ও ভূমিকা সম্পর্কে চারটি সাধারণ ভুল ধারণা—ন্যায্যভাবে উপস্থাপন, তারপর স্পষ্টীকরণ।',
    },
    points: [
      {
        heading: { en: '"Islam forbids women from education or work"', bn: '"ইসলাম নারীকে শিক্ষা বা কাজ থেকে নিষেধ করে"' },
        body: {
          en: 'The misconception: women in Islam are confined to domesticity, barred from learning and public life. The clarification: the Prophet (peace be upon him) stated explicitly, "Seeking knowledge is an obligation upon every Muslim" — a hadith applying equally to women and men. Early Islamic history is filled with women scholars; Aisha (may God be pleased with her) was among the foremost scholars of her generation, from whom thousands of hadith were transmitted and to whom senior companions referred their questions. Nothing in the primary sources prohibits women from education, scholarship, running a business, or professional work. Restrictions on women found in various Muslim-majority societies are cultural practices, not Quranic obligations.',
          bn: 'ভুল ধারণা: ইসলামে নারীরা গৃহজীবনে আবদ্ধ, শিক্ষা ও সার্বজনীন জীবন থেকে বঞ্চিত। স্পষ্টীকরণ: নবী (তাঁর প্রতি শান্তি) স্পষ্টভাবে বলেছেন, "জ্ঞান অন্বেষণ প্রত্যেক মুসলিমের উপর ফরজ"—এই হাদিস নারী ও পুরুষ উভয়ের ক্ষেত্রেই সমানভাবে প্রযোজ্য। ইসলামের প্রাথমিক ইতিহাস নারী আলিমদের দ্বারা পরিপূর্ণ; নবীর স্ত্রী আয়িশা (আল্লাহ তাঁর প্রতি সন্তুষ্ট হোন) তাঁর প্রজন্মের শীর্ষ আলিমদের একজন ছিলেন, যাঁর কাছ থেকে হাজার হাদিস বর্ণিত হয়েছে এবং যাঁর কাছে জ্যেষ্ঠ সাহাবিরাও প্রশ্ন নিয়ে আসতেন। প্রাথমিক উৎসে এমন কিছু নেই যা নারীকে শিক্ষা, গবেষণা, ব্যবসা বা পেশাদার কাজ থেকে বিরত রাখে। মুসলিম-সংখ্যাগরিষ্ঠ সমাজে নারীর উপর নানা বিধিনিষেধ সাংস্কৃতিক প্রথা, কুরআনিক বাধ্যবাধকতা নয়।',
        },
      },
      {
        heading: { en: '"The hijab is forced oppression"', bn: '"হিজাব জবরদস্তিমূলক নিপীড়ন"' },
        body: {
          en: 'The misconception: modesty covering in Islam is an imposition that oppresses women and denies them identity. The clarification: Muslim women who practice hijab overwhelmingly describe it as an expression of faith and identity — a personal choice from conviction, not coercion. Islam teaches that a person\'s worth lies in character and piety, not physical appearance (Quran 49:13), and modesty is an ideal commended to both men and women. The Quran first instructs men to lower their gaze (Quran 24:30) before addressing women\'s dress (Quran 24:31). Compulsion in faith is forbidden (Quran 2:256). Where covering is physically forced upon a woman against her will, that is a cultural or political imposition that Islamic ethics itself does not sanction.',
          bn: 'ভুল ধারণা: ইসলামে শালীনতার পোশাক এমন এক চাপিয়ে দেওয়া বিষয় যা নারীকে নিপীড়িত করে এবং তার পরিচয় অস্বীকার করে। স্পষ্টীকরণ: যে মুসলিম নারীরা হিজাব পালন করেন তাঁদের অধিকাংশই এটিকে বর্ণনা করেন ঈমান ও পরিচয়ের প্রকাশ হিসেবে—জবরদস্তি নয়, প্রত্যয় থেকে নেওয়া ব্যক্তিগত সিদ্ধান্ত। ইসলাম শেখায় মানুষের মূল্য নিহিত তার চরিত্র ও তাকওয়ায়, শারীরিক চেহারায় নয় (কুরআন ৪৯:১৩), এবং শালীনতা নারী ও পুরুষ উভয়ের জন্যই প্রশংসিত আদর্শ। কুরআন প্রথমে পুরুষদের দৃষ্টি নিচু রাখার নির্দেশ দেয় (কুরআন ২৪:৩০), তারপর নারীর পোশাকের বিষয়ে (কুরআন ২৪:৩১)। ঈমানে জবরদস্তি নিষিদ্ধ (কুরআন ২:২৫৬)। যেখানে কোনো নারীকে শারীরিকভাবে তার ইচ্ছার বিরুদ্ধে পোশাক পরতে বাধ্য করা হয়, তা একটি সাংস্কৃতিক বা রাজনৈতিক আরোপণ যা ইসলামি নৈতিকতা নিজেও অনুমোদন করে না।',
        },
      },
      {
        heading: { en: '"Women\'s testimony counts half of a man\'s"', bn: '"নারীর সাক্ষ্য পুরুষের অর্ধেক মাত্র"' },
        body: {
          en: 'The misconception: a Quranic instruction about two female witnesses in one financial contract proves Islam regards women as half as reliable or intelligent as men. The clarification: the verse (Quran 2:282) addresses one specific type of written commercial contract. Classical scholars explain the context as a practical arrangement for a society where women were less frequently involved in certain financial dealings — so that one could remind the other if needed. Elsewhere the Quran uses "witnesses" without gender qualification (Quran 65:2). Women\'s testimony is accepted without restriction in numerous legal contexts; Aisha\'s narrations alone form a large part of the entire hadith corpus. The verse describes a context-specific arrangement, not a statement about women\'s general worth or intellectual capacity.',
          bn: 'ভুল ধারণা: এক বিশেষ আর্থিক লেনদেনে দুই নারী সাক্ষীর বিষয়ে কুরআনের একটি নির্দেশ প্রমাণ করে যে নারীকে পুরুষের অর্ধেক বিশ্বাসযোগ্য বা বুদ্ধিমান গণ্য করা হয়। স্পষ্টীকরণ: সংশ্লিষ্ট আয়াতটি (কুরআন ২:২৮২) এক বিশেষ ধরনের লিখিত বাণিজ্যিক চুক্তির কথা বলে। ধ্রুপদী আলিমগণ প্রসঙ্গটি ব্যাখ্যা করেন এমন এক সমাজের ব্যবহারিক ব্যবস্থা হিসেবে যেখানে নারীরা কিছু আর্থিক লেনদেনে কম যুক্ত ছিল—যাতে প্রয়োজনে একজন অন্যজনকে স্মরণ করিয়ে দিতে পারে। অন্যত্র কুরআন "সাক্ষী" শব্দ লিঙ্গ-উল্লেখ ছাড়াই ব্যবহার করে (কুরআন ৬৫:২)। অসংখ্য বিচারিক প্রেক্ষাপটে নারীর সাক্ষ্য বিনা বিধিনিষেধে গৃহীত হয়; আয়িশার বর্ণনাসমূহ একাই সমগ্র হাদিস সংকলনের এক বড় অংশ। আয়াতটি প্রসঙ্গ-নির্দিষ্ট একটি ব্যবস্থার বর্ণনা দেয়, নারীর সাধারণ মূল্য বা বৌদ্ধিক সামর্থ্য সম্পর্কে কোনো বিবৃতি নয়।',
        },
      },
      {
        heading: { en: '"Islamic inheritance is unfair to women"', bn: '"ইসলামি উত্তরাধিকার আইন নারীর প্রতি অন্যায্য"' },
        body: {
          en: 'The misconception: because the Quran in many cases gives a daughter half the share of a son, Islam treats women as lesser. The clarification: Islamic inheritance law cannot be read in isolation. A man carries the full financial obligation to maintain his wife and children; a woman has no such mandatory obligation — her inheritance remains entirely her own. When these complementary duties are factored in, scholars note the total financial provision for a woman in an Islamic family system can be greater than her male counterpart\'s once all obligations are calculated. The system is designed as complementary in function, not hierarchical in worth. Muslim scholars continue to discuss how these principles apply in modern contexts where economic roles have changed.',
          bn: 'ভুল ধারণা: কুরআন যেহেতু অনেক ক্ষেত্রে কন্যাকে পুত্রের অর্ধেক অংশ দেয়, তাই ইসলাম নারীকে হীনতর মনে করে। স্পষ্টীকরণ: ইসলামি উত্তরাধিকার আইন বিচ্ছিন্নভাবে পড়া যায় না। স্ত্রী ও সন্তান ভরণ-পোষণের সম্পূর্ণ আর্থিক দায়িত্ব পুরুষের; নারীর এমন কোনো বাধ্যতামূলক আর্থিক দায়িত্ব নেই—তার উত্তরাধিকার সম্পূর্ণ তার নিজের। এই পরিপূরক বাধ্যবাধকতাগুলো হিসাব করলে আলিমগণ উল্লেখ করেন যে ইসলামি পারিবারিক ব্যবস্থায় নারীর মোট আর্থিক সংস্থান প্রায়ই পুরুষ সমকক্ষের চেয়ে বেশি হয়। ব্যবস্থাটি কার্যক্ষেত্রে পরিপূরক হিসেবে পরিকল্পিত, মূল্যের দিক থেকে শ্রেণিবিন্যাসগত নয়। মুসলিম আলিমগণ আধুনিক প্রেক্ষাপটে—যেখানে অর্থনৈতিক ভূমিকা পরিবর্তিত হয়েছে—এই নীতিগুলোর প্রয়োগ নিয়ে আলোচনা অব্যাহত রাখেন।',
        },
      },
    ],
  },
  {
    id: 'misconceptions-jihad',
    emoji: '⚔️',
    kind: 'article',
    noteKey: 'whyislam_misconceptions_note',
    title: { en: 'Misconceptions: The Meaning of Jihad', bn: 'ভুল ধারণা: জিহাদের প্রকৃত অর্থ' },
    summary: {
      en: 'What jihad actually means in Islamic teaching — internal, communal and defensive — and what it does not mean.',
      bn: 'ইসলামি শিক্ষায় জিহাদ প্রকৃতপক্ষে কী অর্থ রাখে—আধ্যাত্মিক, সামাজিক ও প্রতিরক্ষামূলক—এবং কী অর্থ রাখে না।',
    },
    points: [
      {
        heading: { en: 'The word "jihad" means striving, not "holy war"', bn: '"জিহাদ" শব্দের অর্থ প্রচেষ্টা, "ধর্মযুদ্ধ" নয়' },
        body: {
          en: 'The Arabic word jihad means earnest striving or exertion toward a good goal. In Islamic literature it encompasses the internal struggle against sin and moral failure (called the "greater jihad" in a widely cited hadith tradition), the effort to be a just and upright person, the work of building a just community, and — in very specific regulated circumstances — lawful defense. The common reduction of jihad to "holy war" represents one narrow historical application while overlooking its broad and primary meanings in Islamic teaching.',
          bn: 'আরবি শব্দ জিহাদ মানে একটি ভালো লক্ষ্যের দিকে আন্তরিক সংগ্রাম বা প্রচেষ্টা। ইসলামি সাহিত্যে এটি অন্তর্ভুক্ত করে পাপ ও নৈতিক ব্যর্থতার বিরুদ্ধে অভ্যন্তরীণ সংগ্রাম (বহুল-উদ্ধৃত হাদিস ঐতিহ্যে "বৃহত্তর জিহাদ"), একজন ন্যায়নিষ্ঠ ও সৎ মানুষ হওয়ার প্রচেষ্টা, একটি ন্যায়সংগত সমাজ গড়ার কাজ, এবং—অত্যন্ত নির্দিষ্ট, নিয়ন্ত্রিত পরিস্থিতিতে—বৈধ প্রতিরক্ষা। জিহাদকে "ধর্মযুদ্ধ"-এ পরিণত করার প্রচলিত ধারা একটি সংকীর্ণ ঐতিহাসিক প্রয়োগকে প্রতিনিধিত্ব করে, ইসলামি শিক্ষায় এর ব্যাপক ও প্রাথমিক অর্থগুলো উপেক্ষা করে।',
        },
      },
      {
        heading: { en: 'Islam forbids targeting civilians and aggression', bn: 'ইসলাম বেসামরিক নাগরিকদের লক্ষ্যবস্তু বানানো ও আগ্রাসন নিষিদ্ধ করে' },
        body: {
          en: 'The Quran places strict limits on any use of force: "Fight in the way of God those who fight you, but do not transgress — indeed, God does not love transgressors" (Quran 2:190). Islamic law forbids killing civilians, destroying crops and places of worship, or harming those who seek peace. Targeting non-combatants is explicitly prohibited in the primary sources. Those who invoke Islam to justify terrorism are condemned by the overwhelming majority of mainstream Muslim scholars worldwide, who affirm that such acts violate the foundational principles of Islamic law. The religion\'s own sources do not support what violent extremists claim in its name.',
          bn: 'কুরআন শক্তি প্রয়োগে কঠোর সীমা আরোপ করে: "আল্লাহর পথে তাদের বিরুদ্ধে লড়াই করো যারা তোমাদের বিরুদ্ধে লড়াই করে, কিন্তু সীমা অতিক্রম করো না—নিশ্চয়ই আল্লাহ সীমা লঙ্ঘনকারীদের ভালোবাসেন না" (কুরআন ২:১৯০)। ইসলামি আইন বেসামরিক মানুষ হত্যা, ফসল ও উপাসনালয় ধ্বংস করা বা শান্তিপ্রত্যাশীদের ক্ষতি করা নিষিদ্ধ করে। অযোদ্ধাদের লক্ষ্য বানানো মূল উৎসে সুস্পষ্টভাবে নিষিদ্ধ। সন্ত্রাসকে ন্যায্যতা দিতে ইসলামের নাম নেওয়া ব্যক্তিদের বিশ্বব্যাপী মূলধারার মুসলিম আলিমদের বিপুল সংখ্যাগরিষ্ঠতা নিন্দা করে এবং নিশ্চিত করে যে এই কাজগুলো ইসলামি আইনের মূলনীতি লঙ্ঘন করে।',
        },
      },
      {
        heading: { en: 'Defensive military jihad has precise conditions', bn: 'প্রতিরক্ষামূলক সামরিক জিহাদের সুনির্দিষ্ট শর্ত রয়েছে' },
        body: {
          en: 'Classical Islamic scholars set strict conditions for armed defense: it must be authorised by a legitimate authority, pursued only against active combatants, and conducted within clear ethical limits. Extensive rules in classical fiqh (jurisprudence) protect civilians, prisoners and the environment. The early Makkan period — when the Prophet and companions endured severe persecution without fighting back — shows that even grave injustice was met first with patience, migration and dialogue.',
          bn: 'ধ্রুপদী ইসলামি আলিমগণ সশস্ত্র প্রতিরক্ষায় কঠোর শর্ত নির্ধারণ করেছেন: এটি অবশ্যই বৈধ কর্তৃপক্ষের অনুমোদনে হতে হবে, কেবল সক্রিয় যোদ্ধাদের বিরুদ্ধে পরিচালিত হবে, এবং স্পষ্ট নৈতিক সীমার মধ্যে পরিচালিত হবে। ধ্রুপদী ফিকহে (আইনশাস্ত্র) বিস্তারিত বিধি বেসামরিক, বন্দী ও পরিবেশের সুরক্ষা নিশ্চিত করে। প্রাথমিক মক্কার কাল—যে সময় নবী ও সাহাবিরা পাল্টা না লড়েই নির্যাতন সহ্য করেছিলেন—দেখায় যে তীব্র অন্যায়কেও প্রথমে মোকাবেলা করা হয়েছিল ধৈর্য, হিজরত ও সংলাপের মাধ্যমে।',
        },
      },
      {
        heading: { en: 'The greater jihad is the inner struggle', bn: 'বৃহত্তর জিহাদ হলো অভ্যন্তরীণ সংগ্রাম' },
        body: {
          en: 'A hadith attributed to the Prophet on returning from a battle spoke of moving from the "lesser jihad" of armed defense to the "greater jihad" — the struggle against one\'s own lower self (nafs). This internal jihad — against arrogance, dishonesty, anger and selfishness — sits at the heart of Islam\'s spiritual tradition. Persisting in worship when it is hard, resisting temptation, standing against injustice with calm words, or working honestly for knowledge — all of this is jihad in the Islamic sense.',
          bn: 'একটি যুদ্ধ থেকে ফেরার পর নবীর কাছে আরোপিত এক হাদিস "ক্ষুদ্রতর জিহাদ" (সশস্ত্র প্রতিরক্ষা) থেকে "বৃহত্তর জিহাদে" যাওয়ার কথা বলে—নিজের নফসের বিরুদ্ধে সংগ্রাম। এই অভ্যন্তরীণ জিহাদ—অহংকার, অসততা, ক্রোধ ও স্বার্থপরতার বিরুদ্ধে—ইসলামের আধ্যাত্মিক ঐতিহ্যের মর্মকেন্দ্রে বিদ্যমান। কঠিন হলেও ইবাদতে অবিচল থাকা, প্রলোভন প্রতিরোধ করা, শান্ত কথায় অন্যায়ের বিরুদ্ধে দাঁড়ানো, বা সৎভাবে জ্ঞানের জন্য পরিশ্রম করা—এই সবই ইসলামি অর্থে জিহাদ।',
        },
      },
    ],
  },
  {
    id: 'misconceptions-apostasy-slavery',
    emoji: '🔓',
    kind: 'article',
    noteKey: 'whyislam_misconceptions_note',
    title: { en: 'Misconceptions: Apostasy & Slavery in Islamic History', bn: 'ভুল ধারণা: ধর্মত্যাগ ও ইসলামের ইতিহাসে দাসপ্রথা' },
    summary: {
      en: 'Careful, honest engagement with two frequently raised issues — presented with nuance and mainstream scholarly context.',
      bn: 'দুটি সাধারণ উত্থাপিত বিষয়ে সতর্ক, সৎ আলোচনা—সূক্ষ্মতা ও মূলধারার শাস্ত্রীয় প্রেক্ষাপটসহ।',
    },
    points: [
      {
        heading: { en: 'Does the Quran prescribe death for leaving Islam?', bn: 'কুরআন কি ইসলাম ছেড়ে যাওয়ার জন্য মৃত্যুদণ্ড নির্ধারণ করে?' },
        body: {
          en: 'This is genuinely contested within Islamic jurisprudence and deserves honest engagement. The Quran itself does not prescribe a worldly death penalty for apostasy; its treatment focuses on spiritual accountability and divine judgment: "Whoever disbelieves in God after having believed… upon them is wrath from God" (Quran 16:106). The verse speaks of divine consequence, not a court sentence. The hadith often cited for a death penalty was understood by many classical scholars in its historical context as addressing treasonous rebellion against the Muslim state — not private change of belief. A respected body of contemporary scholars argues there is no Quranic basis for executing someone solely for peacefully leaving the faith. The foundational Quranic principle stands: "There is no compulsion in religion" (Quran 2:256). This is presented honestly as an area of genuine scholarly discussion.',
          bn: 'এটি ইসলামি ফিকহের মধ্যে প্রকৃতপক্ষেই বিতর্কিত একটি বিষয় এবং সৎ আলোচনার দাবি রাখে। কুরআন নিজে ধর্মত্যাগের জন্য পার্থিব মৃত্যুদণ্ড নির্ধারণ করে না; এর আলোচনা আধ্যাত্মিক জবাবদিহিতা ও ঐশী বিচারের উপর কেন্দ্রীভূত: "যে কেউ বিশ্বাসী হওয়ার পর আল্লাহকে অস্বীকার করে… তাদের উপর আল্লাহর ক্রোধ" (কুরআন ১৬:১০৬)। আয়াতটি ঐশী পরিণতির কথা বলে, আদালতের দণ্ডাদেশ নয়। প্রায়ই উদ্ধৃত হাদিসটিকে বহু ধ্রুপদী আলিম তার ঐতিহাসিক প্রেক্ষাপটে বুঝেছেন মুসলিম রাষ্ট্রের বিরুদ্ধে বিশ্বাসঘাতকতামূলক বিদ্রোহ হিসেবে—নিছক ব্যক্তিগত বিশ্বাস পরিবর্তন নয়। সম্মানিত সমকালীন আলিমদের একটি উল্লেখযোগ্য দল যুক্তি দেন যে শান্তিপূর্ণভাবে ধর্ম ত্যাগের জন্য মৃত্যুদণ্ডের কোনো কুরআনিক ভিত্তি নেই। মৌলিক কুরআনিক নীতি অপরিবর্তিত: "দ্বীনের ব্যাপারে কোনো জবরদস্তি নেই" (কুরআন ২:২৫৬)।',
        },
      },
      {
        heading: { en: 'Freedom of conscience in Islamic teaching', bn: 'ইসলামি শিক্ষায় বিবেকের স্বাধীনতা' },
        body: {
          en: 'The Quran is unambiguous: "There shall be no compulsion in religion — the right course has become distinct from wrong" (Quran 2:256). Scholars universally interpret this as affirming that faith must be freely chosen, not forced. The Prophet\'s mission is described as conveying, not compelling: "Your duty is only to convey the message" (Quran 3:20). In Medina the Prophet signed agreements guaranteeing religious freedom for different communities. The Quran explicitly accepts that some will not believe despite the message, and that God alone judges hearts (Quran 10:99). Islam holds that God values genuine faith born of free conviction — which by definition cannot be coerced.',
          bn: 'কুরআন দ্ব্যর্থহীন: "দ্বীনের ব্যাপারে কোনো জবরদস্তি নেই—সঠিক পথ ভুল পথ থেকে স্পষ্ট হয়ে গেছে" (কুরআন ২:২৫৬)। আলিমগণ সর্বসম্মতভাবে এটিকে ব্যাখ্যা করেন যে ঈমান অবশ্যই স্বাধীনভাবে বেছে নিতে হবে, জোর করা যাবে না। নবীর মিশনকে পৌঁছানো হিসেবে বর্ণনা করা হয়, চাপিয়ে দেওয়া নয়: "তোমার কর্তব্য কেবল বার্তা পৌঁছানো" (কুরআন ৩:২০)। মদিনায় নবী বিভিন্ন সম্প্রদায়ের জন্য ধর্মীয় স্বাধীনতার নিশ্চয়তাসহ চুক্তি স্বাক্ষর করেছিলেন। কুরআন স্বীকার করে যে কেউ কেউ বার্তা সত্ত্বেও বিশ্বাস করবে না, এবং কেবল আল্লাহই হৃদয় বিচার করেন (কুরআন ১০:৯৯)।',
        },
      },
      {
        heading: { en: 'Slavery in Islamic history: the honest picture', bn: 'ইসলামের ইতিহাসে দাসপ্রথা: সৎ চিত্র' },
        body: {
          en: 'Islam did not abolish slavery by immediate decree in 7th-century Arabia — a fact sometimes raised as an objection. The honest response is that Islam took a structured approach to a practice that was universal and deeply embedded. It imposed strict moral obligations on how enslaved people must be treated; declared freeing enslaved persons one of the highest acts and an expiation for sins; placed legal limits on enslavement; and gave enslaved people rights and dignity unknown in contemporaneous societies. The Prophet (peace be upon him) freed enslaved people and commended their freedom repeatedly. The direction of Islamic teaching pointed strongly toward abolition. Historical Muslim societies often fell short of these ideals — and that failure is criticised from within Islamic ethics itself. The institution was wrong; Islam\'s contribution was to push conditions toward justice within its historical constraints and create the moral principles that later Muslim abolitionists drew upon.',
          bn: 'ইসলাম ৭ম শতকের আরবে তাৎক্ষণিক ডিক্রি দিয়ে দাসপ্রথা বিলুপ্ত করেনি—এই সত্য কখনো কখনো আপত্তি হিসেবে উত্থাপিত হয়। সৎ উত্তর হলো, ইসলাম সে সমাজে সার্বজনীন ও গভীরভাবে গেঁথে থাকা এক প্রথার সাথে কাঠামোবদ্ধ উপায়ে আচরণ করেছিল। এটি দাসকৃত মানুষদের সাথে আচরণে কঠোর নৈতিক বাধ্যবাধকতা আরোপ করেছিল; দাসমুক্তিকে সর্বোচ্চ নৈতিক কাজ ও পাপের কাফফারা ঘোষণা করেছিল; দাসত্বে আইনগত সীমা নির্ধারণ করেছিল; এবং সমকালীন সমাজে অজানা অধিকার ও মর্যাদা দিয়েছিল। নবী (তাঁর প্রতি শান্তি) দাস মুক্ত করেছেন এবং বারবার মুক্তির সুপারিশ করেছেন। ইসলামি শিক্ষার গতিমুখ দৃঢ়ভাবে বিলুপ্তির দিকে ছিল। ঐতিহাসিক মুসলিম সমাজ প্রায়ই এই আদর্শের নিচে পড়ে গেছে—আর সেই ব্যর্থতার সমালোচনা ইসলামি নৈতিকতার ভেতর থেকেই হয়।',
        },
      },
      {
        heading: { en: 'The Islamic abolition case', bn: 'ইসলামের বিলোপ-যুক্তি' },
        body: {
          en: 'Within Islamic thought, the strongest arguments against slavery draw from its own principles: all human beings are created equal in dignity (Quran 49:13); the Quran praises freeing enslaved people as one of the highest acts of charity (Quran 90:13); the Prophet warned that God will be the adversary of anyone who wrongs those in their authority; and the maqasid al-shari\'a (objectives of Islamic law) include the protection of human dignity and life. When 19th-century Muslim reformers argued for abolition, they drew on these very principles. Today, the overwhelming global consensus among Muslim scholars is that all forms of slavery and human trafficking are absolutely prohibited in Islam.',
          bn: 'ইসলামি চিন্তায় দাসপ্রথার বিরুদ্ধে সবচেয়ে শক্তিশালী যুক্তিগুলো নিজস্ব নীতি থেকে আসে: সমস্ত মানুষ মর্যাদায় সমানভাবে সৃষ্ট (কুরআন ৪৯:১৩); কুরআন দাস মুক্তিকে সর্বোচ্চ দাতব্য কাজের একটি হিসেবে প্রশংসা করে (কুরআন ৯০:১৩); নবী সতর্ক করেছেন যে আল্লাহ তার প্রতিপক্ষ হবেন যে তার অধীনস্থদের সাথে অন্যায় করে; এবং মাকাসিদ আল-শরিয়া (ইসলামি আইনের উদ্দেশ্য) মানব মর্যাদা ও জীবন রক্ষা অন্তর্ভুক্ত করে। ১৯শ শতকের মুসলিম সংস্কারকরা বিলুপ্তির পক্ষে এই নীতিগুলোই ব্যবহার করেছিলেন। আজ বিশ্বব্যাপী মুসলিম আলিমদের মধ্যে অপ্রতিরোধ্য ঐকমত্য হলো, সমস্ত ধরনের দাসত্ব ও মানব পাচার ইসলামে সম্পূর্ণ নিষিদ্ধ।',
        },
      },
    ],
  },
  {
    id: 'misconceptions-science',
    emoji: '🔭',
    kind: 'article',
    noteKey: 'whyislam_misconceptions_note',
    title: { en: 'Misconceptions: Islam and Science', bn: 'ভুল ধারণা: ইসলাম ও বিজ্ঞান' },
    summary: {
      en: 'Does Islam oppose science? What is the Islamic view of rational inquiry — and what occurred in the Islamic Golden Age?',
      bn: 'ইসলাম কি বিজ্ঞানের বিরোধী? যুক্তিসংগত অনুসন্ধান সম্পর্কে ইসলামের দৃষ্টিভঙ্গি কী—এবং ইসলামের স্বর্ণযুগে কী ঘটেছিল?',
    },
    points: [
      {
        heading: { en: 'The Quran commands knowledge-seeking', bn: 'কুরআন জ্ঞান-অন্বেষণের নির্দেশ দেয়' },
        body: {
          en: 'The very first word of revelation was "Read" (Quran 96:1). The Quran invites investigation of the natural world repeatedly: "Do they not look into the realm of the heavens and the earth and everything that God has created?" (Quran 7:185). The Prophet declared seeking knowledge an obligation on every Muslim and taught "wisdom is the lost property of the believer — wherever they find it, they take it." In Islamic epistemology, the book of nature and the Book of God are complementary: studying creation is an act of recognising the Creator\'s signs.',
          bn: 'ওহির প্রথম শব্দই ছিল "পড়ো" (কুরআন ৯৬:১)। কুরআন বারবার প্রাকৃতিক জগৎ অনুসন্ধানে আমন্ত্রণ জানায়: "তারা কি আকাশ ও পৃথিবীর রাজত্বে এবং আল্লাহর সৃষ্ট সব কিছুতে দৃষ্টি দেয় না?" (কুরআন ৭:১৮৫)। নবী জ্ঞান অন্বেষণকে প্রত্যেক মুসলিমের উপর ফরজ ঘোষণা করেছেন এবং শিক্ষা দিয়েছেন "জ্ঞান হলো মুমিনের হারানো সম্পদ—যেখানেই পায়, তুলে নেয়।" ইসলামি জ্ঞানতত্ত্বে প্রকৃতির গ্রন্থ ও আল্লাহর কিতাব পরিপূরক: সৃষ্টি অধ্যয়ন স্রষ্টার নিদর্শন চেনার এক কাজ।',
        },
      },
      {
        heading: { en: 'The Islamic Golden Age of science', bn: 'বিজ্ঞানের ইসলামিক স্বর্ণযুগ' },
        body: {
          en: 'Between approximately the 8th and 13th centuries, Muslim scholars produced foundational contributions across mathematics, astronomy, optics, medicine, chemistry and geography. Al-Khwarizmi gave algebra to the world (the word "algorithm" derives from his name). Ibn al-Haytham developed experimental optics and early forms of the scientific method. Ibn Sina (Avicenna) wrote the Canon of Medicine, used in European universities for centuries. Al-Biruni calculated the Earth\'s circumference with remarkable accuracy. These scholars worked explicitly within an Islamic framework that considered knowledge of the natural world an act of worship — refuting any claim that Islamic faith is inherently anti-intellectual.',
          bn: 'প্রায় ৮ম থেকে ১৩শ শতকের মধ্যে, মুসলিম আলিমগণ গণিত, জ্যোতির্বিদ্যা, আলোকবিজ্ঞান, চিকিৎসা, রসায়ন ও ভূগোলে মৌলিক অবদান রেখেছেন। আল-খোয়ারিজমি বিশ্বকে বীজগণিত উপহার দিয়েছেন ("অ্যালগরিদম" শব্দটি তাঁর নাম থেকে উদ্ভূত)। ইবনুল হাইসাম পরীক্ষামূলক আলোকবিজ্ঞান ও বৈজ্ঞানিক পদ্ধতির প্রাথমিক রূপ বিকশিত করেছেন। ইবনে সিনা "আল-কানুন" রচনা করেছেন, যা শতাব্দীর পর শতাব্দী ইউরোপীয় বিশ্ববিদ্যালয়ে ব্যবহৃত হয়েছে। আল-বিরুনি অসাধারণ নির্ভুলতায় পৃথিবীর পরিধি গণনা করেছিলেন। এই আলিমগণ কাজ করেছেন সুস্পষ্টভাবে এমন ইসলামি কাঠামোর মধ্যে যা প্রাকৃতিক জগতের জ্ঞানকে ইবাদতের কাজ বলে মনে করত।',
        },
      },
      {
        heading: { en: 'Islam does not conflict with established science', bn: 'ইসলাম প্রতিষ্ঠিত বিজ্ঞানের সাথে দ্বন্দ্ব করে না' },
        body: {
          en: 'Islam has no institutional history of opposing scientific investigation — no equivalent of the Galileo affair. The Quran does not claim to be a science textbook; it is guidance for moral and spiritual life. When science establishes findings about the natural world, the mainstream scholarly position in Islam is that empirical investigation belongs to the domain the Quran encourages. Apparent tensions between Quranic verses and science usually dissolve on careful reading, since the Quran is primarily addressing spiritual and ethical matters, not technical cosmology. Where a scholar finds a specific passage challenging, the tradition has extensive tools: context, metaphor, and apparent vs. intended meaning.',
          bn: 'ইসলামে বৈজ্ঞানিক অনুসন্ধানে বিরোধিতার কোনো প্রাতিষ্ঠানিক ইতিহাস নেই—গ্যালিলিও-ঘটনার সমতুল্য কিছু নেই। কুরআন বিজ্ঞানের পাঠ্যপুস্তক হওয়ার দাবি করে না; এটি নৈতিক ও আধ্যাত্মিক জীবনের জন্য হিদায়াত। বিজ্ঞান যখন প্রাকৃতিক জগৎ সম্পর্কে ফলাফল প্রতিষ্ঠা করে, ইসলামের মূলধারার শাস্ত্রীয় অবস্থান হলো অভিজ্ঞতামূলক অনুসন্ধান সেই ক্ষেত্রের অন্তর্ভুক্ত যা কুরআন উৎসাহিত করে। কুরআনের আয়াত ও বিজ্ঞানের মধ্যে বাহ্যিক দ্বন্দ্বগুলো সাধারণত সতর্ক পাঠে গলে যায়, যেহেতু কুরআন প্রাথমিকভাবে আধ্যাত্মিক ও নৈতিক বিষয় সম্বোধন করছে। একজন আলিম কোনো নির্দিষ্ট অনুচ্ছেদ চ্যালেঞ্জিং মনে করলে, ঐতিহ্যে ব্যাখ্যার ব্যাপক সরঞ্জাম আছে: প্রসঙ্গ, রূপক এবং আপাত বনাম অভিপ্রেত অর্থ।',
        },
      },
      {
        heading: { en: 'A caution on "Quran and science" claims', bn: '"কুরআন ও বিজ্ঞান" দাবি সম্পর্কে একটি সতর্কতা' },
        body: {
          en: 'Some popular presentations claim the Quran predicted specific modern scientific discoveries. These claims warrant care. The Quran does use rich descriptions of creation that resonate with a thoughtful reader. However, responsible Muslim scholarship cautions against forcing modern scientific terminology onto Quranic verses that the first audience understood differently, or making claims dependent entirely on a particular modern translation. The stronger argument is not "the Quran predicted science X" but that the Quran consistently commends observation, reflection on creation, and the pursuit of knowledge — and that this orientation produced a civilisation that led global science for centuries.',
          bn: 'কিছু জনপ্রিয় উপস্থাপনা দাবি করে যে কুরআন নির্দিষ্ট আধুনিক বৈজ্ঞানিক আবিষ্কার পূর্বাভাস দিয়েছে। এই দাবিগুলো সতর্কতার দাবি রাখে। কুরআন সত্যিই সৃষ্টির সমৃদ্ধ বর্ণনা ব্যবহার করে যা চিন্তাশীল পাঠকের সাথে অনুরণিত হয়। তবে দায়িত্বশীল মুসলিম বৃত্তি সতর্ক করে আধুনিক বৈজ্ঞানিক পরিভাষা এমন আয়াতে জোরপূর্বক না চাপাতে যা প্রথম দর্শকরা ভিন্নভাবে বুঝেছিলেন। আরও শক্তিশালী যুক্তি হলো কুরআন ধারাবাহিকভাবে পর্যবেক্ষণ, সৃষ্টিতে প্রতিফলন ও জ্ঞান-অনুসন্ধানের প্রশংসা করে—এবং এই অভিমুখীতাই এমন এক সভ্যতা তৈরি করেছিল যা শতাব্দীর পর শতাব্দী বৈশ্বিক বিজ্ঞানে নেতৃত্ব দিয়েছে।',
        },
      },
    ],
  },
  {
    id: 'rational-tawhid',
    emoji: '🧠',
    kind: 'article',
    title: { en: 'Rational Arguments for Tawhid', bn: 'তাওহিদের যুক্তিসংগত প্রমাণ' },
    summary: {
      en: 'The kalam cosmological argument, fine-tuning, the moral argument, and the unity of natural law — each a reasoned pointer, not a coercive proof.',
      bn: 'কালাম সৃষ্টিতাত্ত্বিক যুক্তি, সূক্ষ্ম-সমন্বয়, নৈতিক যুক্তি এবং প্রাকৃতিক নিয়মের ঐক্য—প্রতিটি একটি যুক্তিসংগত ইঙ্গিত, বাধ্যকারী প্রমাণ নয়।',
    },
    points: [
      {
        heading: { en: 'The Kalam cosmological argument', bn: 'কালাম সৃষ্টিতাত্ত্বিক যুক্তি' },
        body: {
          en: 'Formulated by Muslim theologians (mutakallimun) such as al-Ghazali: (1) Whatever begins to exist has a cause; (2) the universe began to exist; (3) therefore the universe has a cause. That cause must itself be uncaused (to avoid an infinite regress that explains nothing), immensely powerful, and timeless and spaceless — existing outside the universe it produced. The Quran voices the same reflection: "Were they created by nothing? Or were they themselves the creators?" (Quran 52:35). The argument points toward a first cause; tawhid makes the further claim that this cause is one and unique, on the grounds of coherence and the unity of natural law.',
          bn: 'ইমাম গাজ্জালির মতো মুসলিম ধর্মতাত্ত্বিকদের (মুতাকাল্লিমুন) দ্বারা প্রণীত: (১) যার অস্তিত্বের সূচনা আছে তার একটি কারণ আছে; (২) মহাবিশ্বের সূচনা আছে; (৩) সুতরাং মহাবিশ্বের একটি কারণ আছে। সেই কারণটি নিজে অকারণ (কিছুই ব্যাখ্যা না করা অসীম পশ্চাদ্গামিতা এড়াতে), অপরিসীম ক্ষমতাসম্পন্ন, এবং কাল ও স্থানের বাইরে হতে হবে। কুরআন একই প্রতিফলন ব্যক্ত করে: "তারা কি স্রষ্টা ছাড়াই সৃষ্টি হয়েছে? নাকি তারাই স্রষ্টা?" (কুরআন ৫২:৩৫)। যুক্তিটি একটি প্রথম কারণের দিকে ইঙ্গিত করে; তাওহিদ আরও দাবি করে এই কারণ এক ও অনন্য, সংগতি ও প্রাকৃতিক নিয়মের ঐক্যের ভিত্তিতে।',
        },
      },
      {
        heading: { en: 'Fine-tuning and the teleological argument', bn: 'সূক্ষ্ম-সমন্বয় ও উদ্দেশ্যমূলক যুক্তি' },
        body: {
          en: 'The universe shows remarkable fine-tuning: the values of fundamental constants — gravitational force, the strong nuclear force, the cosmological constant — are set within a narrow range within which stars, chemistry and life are possible. A tiny change in any of them would produce a universe in which atoms cannot form or stars cannot burn. Muslim scholars point to this as a sign of intentional precision rather than blind chance. The Quran invites this reflection: "And on the earth are signs for those who are certain — and in yourselves. Do you not see?" (Quran 51:20–21). This is a philosophical pointer, not a substitute for scientific inquiry; careful thinkers treat it as raising the prior probability of a Designer.',
          bn: 'মহাবিশ্ব আশ্চর্যজনক সূক্ষ্ম-সমন্বয় দেখায়: মৌলিক ধ্রুবকগুলোর মান—মহাকর্ষ বল, শক্তিশালী নিউক্লিয়ার বল, মহাজাগতিক ধ্রুবক—এমন সংকীর্ণ পরিসরে নির্ধারিত যেখানে তারা, রসায়ন ও জীবন সম্ভব। যেকোনো একটিতে সামান্য পরিবর্তন এমন মহাবিশ্ব তৈরি করত যেখানে পরমাণু গঠিত হতে পারে না। মুসলিম আলিমগণ এটিকে অন্ধ সুযোগ নয়, ইচ্ছাকৃত নির্ভুলতার নিদর্শন হিসেবে উল্লেখ করেন। কুরআন এই প্রতিফলনে আমন্ত্রণ জানায়: "পৃথিবীতে নিশ্চিত বিশ্বাসীদের জন্য নিদর্শন আছে—এবং তোমাদের নিজেদের মধ্যেও। তবে কি তোমরা দেখবে না?" (কুরআন ৫১:২০–২১)।',
        },
      },
      {
        heading: { en: 'The moral argument', bn: 'নৈতিক যুক্তি' },
        body: {
          en: 'Most people share the deep conviction that some acts — cruelty to innocents, betrayal, injustice — are not merely disliked but genuinely wrong, independent of what any society decides. If objective moral facts exist, they seem to require grounding: a universe of purely physical processes has no mechanism to generate binding moral obligations. Islamic thought holds that objective moral truths are grounded in the character and will of the one God, who is perfectly just, and who embedded this moral knowledge in the fitrah (human nature). This argument does not deny that non-believers can be moral; it asks where the binding force of "you ought not" ultimately comes from.',
          bn: 'অধিকাংশ মানুষ গভীর প্রত্যয় ধারণ করে যে কিছু কাজ—নিরীহদের প্রতি নিষ্ঠুরতা, বিশ্বাসঘাতকতা, অন্যায়—কেবল অপছন্দের নয়, প্রকৃতপক্ষেই ভুল, যেকোনো সমাজ যা সিদ্ধান্ত নেয় তার নিরপেক্ষে। বস্তুনিষ্ঠ নৈতিক তথ্য যদি বিদ্যমান থাকে, তাহলে মনে হয় তার একটি ভিত্তি দরকার: সম্পূর্ণ ভৌত প্রক্রিয়ার একটি মহাবিশ্বে বাধ্যকারী নৈতিক বাধ্যবাধকতা তৈরির কোনো প্রক্রিয়া নেই। ইসলামি চিন্তা মনে করে বস্তুনিষ্ঠ নৈতিক সত্য ভিত্তিপ্রাপ্ত এক আল্লাহর চরিত্র ও ইচ্ছায়, এবং এই নৈতিক জ্ঞান ফিতরাহ (মানব প্রকৃতি)-তে গেঁথে দেওয়া হয়েছে। এই যুক্তি অস্বীকার করে না যে অবিশ্বাসীরা নৈতিক হতে পারে; এটি জিজ্ঞেস করে নৈতিকতার বাধ্যকারী শক্তি চূড়ান্তভাবে কোথা থেকে আসে।',
        },
      },
      {
        heading: { en: 'The unity of natural law points to one Lawgiver', bn: 'প্রাকৃতিক নিয়মের ঐক্য এক বিধানদাতার দিকে ইঙ্গিত করে' },
        body: {
          en: 'Scientists work on the verified assumption that the universe obeys a single consistent set of laws from one galaxy to the next, from a particle to a star. This mathematical unity of nature is, philosophically, remarkable: why should the universe be comprehensible at all? Einstein expressed wonder at "the comprehensibility of the universe." Islamic theology offers an answer: "Had there been within the heavens and the earth gods besides God, they both would have been corrupted" (Quran 21:22). One lawgiver produces one consistent law-system. The remarkable coherence of nature is precisely what one would expect under a single omnipotent Creator, and not what one would expect from competing powers or from pure chance.',
          bn: 'বিজ্ঞানীরা যাচাইকৃত এই অনুমানের ভিত্তিতে কাজ করেন যে মহাবিশ্ব এক গ্যালাক্সি থেকে অন্যটিতে, একটি কণা থেকে একটি তারা পর্যন্ত একটি একক, সামঞ্জস্যপূর্ণ নিয়মের সেট মেনে চলে। প্রকৃতির এই গাণিতিক ঐক্য দার্শনিকভাবে উল্লেখযোগ্য: মহাবিশ্ব আদৌ বোধগম্য কেন হবে? আইনস্টাইন "মহাবিশ্বের বোধগম্যতা" নিয়ে বিস্ময় প্রকাশ করেছিলেন। ইসলামি ধর্মতত্ত্ব একটি উত্তর দেয়: "আকাশ ও পৃথিবীতে যদি আল্লাহ ছাড়া আরও উপাস্য থাকত, তবে উভয়ই বিশৃঙ্খল হয়ে যেত" (কুরআন ২১:২২)। এক বিধানদাতা এক সামঞ্জস্যপূর্ণ বিধি-ব্যবস্থা তৈরি করেন। প্রকৃতির অসাধারণ সংগতি ঠিক তা-ই যা এক সর্বশক্তিমান স্রষ্টার কাছ থেকে প্রত্যাশিত।',
        },
      },
    ],
  },
  {
    id: 'proofs-prophethood',
    emoji: '📣',
    kind: 'article',
    title: { en: 'Evidences of Prophethood', bn: 'নবুয়তের প্রমাণসমূহ' },
    summary: {
      en: 'Fulfilled prophecies, the unlettered messenger, the civilisational transformation, and why the Prophet sought no worldly gain.',
      bn: 'পূর্ণ হওয়া ভবিষ্যদ্বাণী, নিরক্ষর রাসুল, সভ্যতার রূপান্তর এবং কেন নবী কোনো পার্থিব স্বার্থ চাননি।',
    },
    points: [
      {
        heading: { en: 'Fulfilled prophecies in the Quran and Sunnah', bn: 'কুরআন ও সুন্নাহতে পূর্ণ হওয়া ভবিষ্যদ্বাণী' },
        body: {
          en: 'Several statements made during the Prophet\'s lifetime can be historically verified. The Quran predicted that the Byzantine Empire, which had just suffered a major defeat by the Persians, would recover and be victorious within a few years (Quran 30:2–4) — which occurred within the stated timeframe. The Quran declared that the body of Pharaoh would be preserved as a sign for later generations (Quran 10:92); mummified Egyptian rulers are indeed preserved today. The Prophet foretold the conquest of Persia and Byzantine territories, and specific social developments that companions witnessed and recorded. Muslim scholars present these as evidence alongside the honest caveat that historical claims require careful scholarship and not every popular prophecy claim carries equal weight.',
          bn: 'নবীর জীবদ্দশায় করা বেশ কিছু বক্তব্য ঐতিহাসিকভাবে যাচাইযোগ্য। কুরআন ভবিষ্যদ্বাণী করেছিল যে বাইজেন্টাইন সাম্রাজ্য, যা পারসিকদের হাতে বড় পরাজয়ের সম্মুখীন হয়েছিল, কয়েক বছরের মধ্যে পুনরুদ্ধার হবে ও জয়ী হবে (কুরআন ৩০:২–৪)—যা নির্ধারিত সময়সীমার মধ্যে ঘটেছিল। কুরআন ঘোষণা করেছিল যে ফেরাউনের শরীর পরবর্তী প্রজন্মের নিদর্শন হিসেবে সংরক্ষিত থাকবে (কুরআন ১০:৯২); মিশরীয় মমিকৃত শাসকরা আজও সংরক্ষিত। নবী পারস্য ও বাইজেন্টাইন ভূখণ্ড জয় এবং নির্দিষ্ট সামাজিক উন্নয়নের ভবিষ্যদ্বাণী করেছিলেন যা সাহাবিরা প্রত্যক্ষ করেছিলেন ও নথিভুক্ত করেছিলেন।',
        },
      },
      {
        heading: { en: 'The unlettered prophet and an inimitable text', bn: 'নিরক্ষর নবী ও অতুলনীয় গ্রন্থ' },
        body: {
          en: 'The Prophet (peace be upon him) is described as ummi — unable to read or write (Quran 7:157). He had no access to earlier scripture and received no rabbinical or scholarly education, yet he conveyed a text of remarkable literary mastery, thematic depth and internal coherence. His Arab contemporaries — master poets who had every reason to want to disprove it — acknowledged that the Quran did not fit any existing literary category. Their response was not "this is ordinary" but "this is either sorcery or divine." The Islamic argument: the content of the Quran cannot be explained by its carrier\'s natural resources.',
          bn: 'নবী (তাঁর প্রতি শান্তি) উম্মি হিসেবে বর্ণিত—পড়তে বা লিখতে অসমর্থ (কুরআন ৭:১৫৭)। পূর্ববর্তী কিতাবে তাঁর প্রবেশাধিকার ছিল না এবং তিনি কোনো রব্বানিক বা শাস্ত্রীয় শিক্ষা পাননি, তবুও তিনি অসাধারণ সাহিত্যিক পাণ্ডিত্য, বিষয়গত গভীরতা ও অভ্যন্তরীণ সংগতির এক গ্রন্থ পৌঁছে দিয়েছেন। তাঁর আরবি সমসাময়িকরা—শীর্ষ কবি যাদের দাবিটি খণ্ডন করার প্রতিটি কারণ ছিল—স্বীকার করেছেন যে কুরআন বিদ্যমান কোনো সাহিত্যিক শ্রেণিতে পড়ে না। ইসলামি যুক্তি: কুরআনের বিষয়বস্তু তার বাহকের প্রাকৃতিক সম্পদ দিয়ে ব্যাখ্যা করা যায় না।',
        },
      },
      {
        heading: { en: 'The transformation of a civilisation', bn: 'এক সভ্যতার রূপান্তর' },
        body: {
          en: 'In approximately twenty-three years, beginning from a single person declaring his message, the Arabian peninsula was transformed: from fragmented warring tribes practising infanticide and extreme inequality, into a unified community whose legal and ethical system placed justice, knowledge and mercy at its centre. His earliest followers — educated, self-aware and entirely free to reject the message — gave up wealth, status and safety for a conviction they found compelling. Non-Muslim historians and modern academics alike acknowledge this social transformation as historically extraordinary. The scale and speed of this change are part of the Islamic case for the authenticity of his mission.',
          bn: 'প্রায় তেইশ বছরে, একক ব্যক্তির বার্তা ঘোষণা থেকে শুরু করে, আরব উপদ্বীপ রূপান্তরিত হয়েছিল: খণ্ডবিখণ্ড, যুদ্ধরত গোত্র এবং কন্যাশিশু হত্যার সমাজ থেকে এমন এক ঐক্যবদ্ধ সম্প্রদায়ে যার আইনি ও নৈতিক ব্যবস্থায় ন্যায়, জ্ঞান ও দয়া কেন্দ্রীয় স্থান পেয়েছিল। তাঁর প্রথম অনুসারীরা—শিক্ষিত, আত্মসচেতন ও বার্তা প্রত্যাখ্যানে সম্পূর্ণ স্বাধীন—সম্পদ, মর্যাদা ও নিরাপত্তা ত্যাগ করেছিলেন এমন এক প্রত্যয়ের জন্য যা তাদের কাছে বাধ্যকারী মনে হয়েছিল। অমুসলিম ঐতিহাসিক ও আধুনিক একাডেমিক উভয়েই এই সামাজিক রূপান্তরকে ঐতিহাসিকভাবে অসাধারণ হিসেবে স্বীকার করেন।',
        },
      },
      {
        heading: { en: 'He sought no worldly gain', bn: 'তিনি কোনো পার্থিব স্বার্থ চাননি' },
        body: {
          en: 'A sincere question when evaluating any claim is: what did the claimant gain from it? The Prophet (peace be upon him) endured thirteen years of persecution, boycott, exile and the deaths of loved ones before any worldly success arrived. When tribal leaders offered him wealth, kingship and status in exchange for withdrawing his message, he refused: "By God, if they placed the sun in my right hand and the moon in my left to make me abandon this matter, I would not abandon it until God makes it prevail or I perish in seeking it." The Quran also corrects the Prophet when needed (Quran 80:1–4, Quran 9:43) — something a self-serving author would not include. A person pursuing deception for personal gain does not typically sustain it at this cost.',
          bn: 'যেকোনো দাবি মূল্যায়নের সময় একটি আন্তরিক প্রশ্ন: দাবিকারী এ থেকে কী অর্জন করেছেন? নবী (তাঁর প্রতি শান্তি) কোনো পার্থিব সাফল্য আসার আগে তেরো বছর নির্যাতন, বয়কট, নির্বাসন ও প্রিয়জনদের মৃত্যু সহ্য করেছিলেন। গোত্রীয় নেতারা যখন বার্তা প্রত্যাহারের বিনিময়ে তাঁকে সম্পদ ও রাজত্বের প্রস্তাব দিয়েছিল, তিনি প্রত্যাখ্যান করেছিলেন: "আল্লাহর শপথ, তারা যদি আমার ডান হাতে সূর্য ও বাম হাতে চাঁদ রাখে এই বিষয় ছেড়ে দিতে, আমি ছেড়ে দেব না যতক্ষণ না আল্লাহ এটি বিজয়ী করেন বা আমি এতে মারা যাই।" কুরআন নিজেই প্রয়োজনে নবীকে সংশোধন করে (কুরআন ৮০:১–৪, কুরআন ৯:৪৩)—যা কোনো স্বার্থান্বেষী রচয়িতা অন্তর্ভুক্ত করতেন না।',
        },
      },
    ],
  },
  {
    id: 'quran-divine-origin',
    emoji: '✨',
    kind: 'article',
    title: { en: "Evidences of the Quran's Divine Origin", bn: 'কুরআনের ঐশী উৎসের প্রমাণসমূহ' },
    summary: {
      en: 'Four mutually reinforcing evidences: linguistic inimitability (i\'jaz), preservation, internal consistency, and the standing challenge.',
      bn: 'পরস্পর-পরিপূরক চারটি প্রমাণ: ভাষাগত অতুলনীয়তা (ইজাজ), সংরক্ষণ, অভ্যন্তরীণ সামঞ্জস্য এবং উন্মুক্ত চ্যালেঞ্জ।',
    },
    points: [
      {
        heading: { en: "Linguistic inimitability (i'jaz al-Quran)", bn: 'ভাষাগত অতুলনীয়তা (ইজাজুল কুরআন)' },
        body: {
          en: 'The Quran\'s Arabic occupies a unique place in Arabic literary tradition. Classical Arab critics and poets — many of whom were not Muslim and had every reason to want to disprove it — acknowledged its singular quality: it does not fit the known categories of poetry (it lacks the metrical patterns of Arab verse), nor of ordinary prose, nor of rhymed prose — its structural depth exceeds all these. The theologian al-Baqillani devoted substantial scholarly analysis to this; Ibn Khaldun noted it in his Muqaddimah. The term i\'jaz al-Quran refers to this inimitability — a level of expression not equalled in fourteen centuries despite many motivated attempts. This argument is offered to scholars of Arabic; translation-readers can appreciate its reputation but cannot fully assess the claim firsthand.',
          bn: 'কুরআনের আরবি ভাষা আরবি সাহিত্য ঐতিহ্যে এক অনন্য স্থান অধিকার করে। ধ্রুপদী আরবি সমালোচক ও কবিগণ—যাদের অনেকে মুসলিম ছিলেন না এবং এটি খণ্ডন করার যথেষ্ট কারণ ছিল—এর অসাধারণ গুণ স্বীকার করেছেন: এটি আরবি কবিতার শ্রেণিতে পড়ে না (এতে আরবি কাব্যের ছন্দমাত্রিক ধরন নেই), না সাধারণ গদ্যে, না তুকবন্দী গদ্যে—এর কাঠামোগত গভীরতা সব ধারা ছাড়িয়ে যায়। ধর্মতাত্ত্বিক আল-বাকিল্লানি এ বিষয়ে গভীর শাস্ত্রীয় বিশ্লেষণ করেছেন; ইবনে খালদুন তাঁর মুকাদ্দিমায় এর উল্লেখ করেছেন। "ইজাজুল কুরআন" পরিভাষাটি এই অতুলনীয়তাকে নির্দেশ করে—চৌদ্দ শতাব্দীতে অনেক প্রেরণাযুক্ত প্রচেষ্টা সত্ত্বেও যে অভিব্যক্তির স্তর তুলনীয় হয়নি।',
        },
      },
      {
        heading: { en: 'Internal consistency across twenty-three years', bn: 'তেইশ বছর জুড়ে অভ্যন্তরীণ সামঞ্জস্য' },
        body: {
          en: 'The Quran was revealed over approximately twenty-three years in widely varying circumstances — times of hardship and ease, war and peace, personal joy and grief. Despite this, it forms a thematically coherent whole: its theology, ethical commands, accounts of earlier prophets and legal principles are internally consistent. The Quran itself invites this test: "Do they not reflect upon the Quran? If it had been from other than God, they would have found within it much contradiction" (Quran 4:82). For a text produced under such varied human conditions to exhibit this level of coherence is offered as evidence of unified authorship beyond ordinary human capacity.',
          bn: 'কুরআন প্রায় তেইশ বছর ধরে ব্যাপকভাবে ভিন্ন পরিস্থিতিতে অবতীর্ণ হয়েছে—কষ্ট ও স্বাচ্ছন্দ্য, যুদ্ধ ও শান্তি, ব্যক্তিগত আনন্দ ও দুঃখের সময়ে। তবুও এটি বিষয়গতভাবে একটি সুসংগত পূর্ণতা তৈরি করে: এর ধর্মতত্ত্ব, নৈতিক আদেশ, পূর্ববর্তী নবীদের বিবরণ ও বিধিগত নীতিগুলো অভ্যন্তরীণভাবে সামঞ্জস্যপূর্ণ। কুরআন নিজেই এই পরীক্ষায় আমন্ত্রণ জানায়: "তারা কি কুরআন নিয়ে গভীরভাবে চিন্তা করে না? যদি এটি আল্লাহ ছাড়া কারো কাছ থেকে হতো, তবে তারা এতে অনেক বৈপরীত্য খুঁজে পেত" (কুরআন ৪:৮২)। এত বৈচিত্র্যময় মানবিক পরিস্থিতিতে উৎপাদিত একটি গ্রন্থ এই মাত্রার সংগতি দেখায়—এটি সাধারণ মানবিক সামর্থ্যের বাইরে ঐক্যবদ্ধ রচয়িতার প্রমাণ হিসেবে উপস্থাপিত।',
        },
      },
      {
        heading: { en: 'Dual preservation: memorisation and manuscript', bn: 'দ্বৈত সংরক্ষণ: মুখস্থকরণ ও পাণ্ডুলিপি' },
        body: {
          en: 'No other scripture in history has been preserved simultaneously in two independent ways: a continuous unbroken chain of memorisation by millions in every generation, and a written manuscript tradition. The two methods check each other — a single forger cannot corrupt both simultaneously across a worldwide, unconnected community. Early manuscripts — the Sana\'a parchments, the Topkapi codex, the Birmingham leaf — correspond closely to the text recited worldwide today. The Quran treats this as a divine guarantee: "Indeed, it is We who sent down the Reminder, and indeed, We will be its guardian" (Quran 15:9) — offered as an examinable claim, not mere assertion.',
          bn: 'ইতিহাসে অন্য কোনো কিতাব দুটি স্বাধীন উপায়ে একই সাথে সংরক্ষিত হয়নি: প্রতিটি প্রজন্মে লক্ষ লক্ষ মানুষের অবিচ্ছিন্ন মুখস্থকরণের ধারা, এবং লিখিত পাণ্ডুলিপি ঐতিহ্য। দুটি পদ্ধতি একে অপরকে যাচাই করে—একজন জালিয়াৎ বিশ্বব্যাপী, বিচ্ছিন্ন সম্প্রদায়জুড়ে একই সাথে উভয়কে বিকৃত করতে পারে না। প্রাথমিক পাণ্ডুলিপি—সানআর চর্মপত্র, তোপকাপি কোডেক্স, বার্মিংহাম পাতা—আজ বিশ্বব্যাপী পঠিত টেক্সটের সাথে ঘনিষ্ঠভাবে মেলে। কুরআন এটিকে ঐশী গ্যারান্টি হিসেবে বিবেচনা করে: "নিশ্চয়ই আমিই এই উপদেশ অবতীর্ণ করেছি এবং আমিই এর সংরক্ষক" (কুরআন ১৫:৯)—এটি নিছক দাবি নয়, পরীক্ষণযোগ্য দাবি হিসেবে উপস্থাপিত।',
        },
      },
      {
        heading: { en: 'The open challenge and fourteen centuries of silence', bn: 'উন্মুক্ত চ্যালেঞ্জ ও চৌদ্দ শতাব্দীর নীরবতা' },
        body: {
          en: 'The Quran issues a unique, open and unretracted challenge to produce a surah comparable in quality: "And if you are in doubt about what We have sent down upon Our Servant, then produce a surah the like thereof and call upon your witnesses other than God, if you should be truthful" (Quran 2:23). This challenge was issued to master poets and orators who had every motive to answer it. It was not met in the Prophet\'s lifetime. It has not been credibly met in fourteen centuries, despite many attempts. The challenge remains open. No one is compelled to accept this reasoning — but the absence of a successful response after fourteen centuries of motivated effort forms part of the cumulative case for the Quran\'s divine origin.',
          bn: 'কুরআন তুলনীয় মানের একটি সুরা তৈরির এক অনন্য, উন্মুক্ত ও প্রত্যাহার না করা চ্যালেঞ্জ করে: "আমি আমার বান্দার প্রতি যা অবতীর্ণ করেছি তাতে যদি তোমরা সন্দেহে থাকো, তবে এর মতো একটি সুরা নিয়ে এসো এবং আল্লাহ ছাড়া তোমাদের সাক্ষীদের ডাকো" (কুরআন ২:২৩)। এই চ্যালেঞ্জ শীর্ষ কবি ও বক্তাদের সামনে করা হয়েছিল যাদের এর উত্তর দেওয়ার প্রতিটি প্রেরণা ছিল। নবীর জীবদ্দশায় এটি পূরণ হয়নি। চৌদ্দ শতাব্দীতে অনেক প্রচেষ্টা সত্ত্বেও বিশ্বাসযোগ্যভাবে পূরণ হয়নি। চ্যালেঞ্জটি উন্মুক্ত থাকে। কাউকে এই যুক্তি মানতে বাধ্য করা হচ্ছে না—তবে চৌদ্দ শতাব্দীর প্রেরণাযুক্ত প্রচেষ্টার পরেও সফল সাড়ার অনুপস্থিতি কুরআনের ঐশী উৎসের পক্ষে ক্রমযোজিত যুক্তির অংশ।',
        },
      },
    ],
  },
  {
    id: 'knowledge-check',
    emoji: '📝',
    kind: 'qa',
    qaLabel: { en: 'Q', bn: 'প্র' },
    title: { en: 'Knowledge Check: Aqidah & Misconceptions', bn: 'জ্ঞান যাচাই: আকিদা ও ভুল ধারণা' },
    summary: {
      en: 'Eight questions reviewing key points from this module — expand each to reveal the answer.',
      bn: 'এই মডিউলের মূল বিষয় পর্যালোচনার জন্য আটটি প্রশ্ন—উত্তর দেখতে প্রতিটি প্রশ্ন প্রসারিত করুন।',
    },
    qa: [
      {
        q: { en: 'What are the three dimensions of tawhid?', bn: 'তাওহিদের তিনটি দিক কী কী?' },
        a: {
          en: 'The three dimensions are: (1) Rububiyyah — God alone creates, sustains and governs all things; (2) Uluhiyyah — God alone deserves worship and devotion; and (3) Asma wa Sifat — God\'s names and attributes are affirmed exactly as He described Himself, without likening Him to any created being. Together they mean there is no partner, rival or equal to God in any respect.',
          bn: 'তিনটি দিক হলো: (১) রুবুবিয়্যাহ—কেবল আল্লাহই সৃষ্টি করেন, পালন করেন ও পরিচালনা করেন; (২) উলুহিয়্যাহ—কেবল আল্লাহই ইবাদত ও আনুগত্যের যোগ্য; এবং (৩) আসমা ওয়া সিফাত—আল্লাহর নাম ও গুণাবলি সেভাবেই নিশ্চিত করা হয় যেভাবে তিনি নিজেকে বর্ণনা করেছেন, সৃষ্টির সাথে তুলনা ছাড়াই। একত্রে এর অর্থ, কোনো দিক থেকেই আল্লাহর কোনো অংশীদার, প্রতিদ্বন্দ্বী বা সমতুল্য নেই।',
        },
      },
      {
        q: { en: 'What does the word "jihad" primarily mean in Islamic teaching — and what does it not mean?', bn: 'ইসলামি শিক্ষায় "জিহাদ" শব্দটি প্রাথমিকভাবে কী অর্থ বহন করে—এবং কী অর্থ বহন করে না?' },
        a: {
          en: 'Jihad means earnest striving toward a good goal. In its broadest sense it includes the internal struggle against moral failings (the "greater jihad"), effort to be an upright person, and work to build a just community. It does not primarily mean "holy war." Any use of defensive force in Islam is tightly conditioned, requires legitimate authority, and absolutely forbids targeting civilians. The overwhelming majority of Muslim scholars worldwide condemn terrorism as a violation of Islamic law.',
          bn: 'জিহাদ মানে একটি ভালো লক্ষ্যের দিকে আন্তরিক সংগ্রাম। বৃহত্তম অর্থে এটি নৈতিক ব্যর্থতার বিরুদ্ধে অভ্যন্তরীণ সংগ্রাম ("বৃহত্তর জিহাদ"), সৎ মানুষ হওয়ার প্রচেষ্টা এবং ন্যায়সংগত সম্প্রদায় গড়ার কাজ অন্তর্ভুক্ত করে। এর প্রাথমিক অর্থ "ধর্মযুদ্ধ" নয়। ইসলামে যেকোনো প্রতিরক্ষামূলক শক্তি প্রয়োগ কঠোরভাবে শর্তযুক্ত, বৈধ কর্তৃপক্ষ প্রয়োজন এবং বেসামরিকদের লক্ষ্য বানানো সম্পূর্ণ নিষিদ্ধ।',
        },
      },
      {
        q: { en: 'What is the Kalam cosmological argument and how does the Quran relate to it?', bn: 'কালাম সৃষ্টিতাত্ত্বিক যুক্তি কী এবং কুরআন এর সাথে কীভাবে সম্পর্কিত?' },
        a: {
          en: 'The Kalam argument: (1) Whatever begins to exist has a cause; (2) the universe began to exist; (3) therefore the universe has a cause — one that is itself uncaused, immensely powerful, and beyond time and space. The Quran voices the same reflection conversationally: "Were they created by nothing? Or were they themselves the creators?" (Quran 52:35). The argument points toward a first cause outside the universe; tawhid adds that this cause is one, not many.',
          bn: 'কালাম যুক্তি: (১) যার অস্তিত্বের সূচনা আছে তার একটি কারণ আছে; (২) মহাবিশ্বের সূচনা আছে; (৩) সুতরাং মহাবিশ্বের একটি কারণ আছে—যা নিজে অকারণ, অপরিসীম ক্ষমতাসম্পন্ন, কাল ও স্থানের বাইরে। কুরআন একই প্রতিফলন কথ্য ভাষায় ব্যক্ত করে: "তারা কি স্রষ্টা ছাড়াই সৃষ্টি হয়েছে? নাকি তারাই স্রষ্টা?" (কুরআন ৫২:৩৫)। যুক্তিটি মহাবিশ্বের বাইরে একটি প্রথম কারণের দিকে ইঙ্গিত করে; তাওহিদ যোগ করে এই কারণ এক, একাধিক নয়।',
        },
      },
      {
        q: { en: 'Does the Quran conflict with modern science? What is the mainstream Islamic scholarly position?', bn: 'কুরআন কি আধুনিক বিজ্ঞানের সাথে দ্বন্দ্ব করে? মূলধারার ইসলামি শাস্ত্রীয় অবস্থান কী?' },
        a: {
          en: 'The mainstream Islamic scholarly position is that the Quran and science address different domains: the Quran is guidance for moral and spiritual life, not a science textbook. Islam has no institutional history of opposing scientific inquiry — the Islamic Golden Age produced foundational advances across multiple sciences. Apparent tensions usually dissolve on careful reading since the Quran addresses spiritual matters, not technical cosmology. Responsible scholarship also cautions against overclaiming specific "scientific predictions" in the Quran.',
          bn: 'মূলধারার ইসলামি শাস্ত্রীয় অবস্থান হলো কুরআন ও বিজ্ঞান ভিন্ন ক্ষেত্র সম্বোধন করে: কুরআন নৈতিক ও আধ্যাত্মিক জীবনের হিদায়াত, বিজ্ঞানের পাঠ্যপুস্তক নয়। বৈজ্ঞানিক অনুসন্ধানে বিরোধিতার ইসলামের কোনো প্রাতিষ্ঠানিক ইতিহাস নেই—ইসলামের স্বর্ণযুগ একাধিক বিজ্ঞানে মৌলিক অগ্রগতি উৎপাদন করেছিল। কুরআন আধ্যাত্মিক বিষয় সম্বোধন করে বলে বাহ্যিক দ্বন্দ্বগুলো সতর্ক পাঠে সাধারণত গলে যায়। দায়িত্বশীল বৃত্তি কুরআনে নির্দিষ্ট "বৈজ্ঞানিক ভবিষ্যদ্বাণী"র অতিরিক্ত দাবি থেকেও সতর্ক করে।',
        },
      },
      {
        q: { en: 'What does i\'jaz al-Quran mean and why is it significant?', bn: '"ইজাজুল কুরআন" কী অর্থ বহন করে এবং এটি কেন গুরুত্বপূর্ণ?' },
        a: {
          en: 'I\'jaz al-Quran means the inimitability of the Quran — the claim that its Arabic is linguistically unique and has never been equalled. The Quran issues an open challenge to produce a comparable surah (Quran 2:23). Classical Arab literary experts, who had every reason to disprove it, acknowledged that the Quran does not fit existing literary categories. This challenge has not been credibly met in fourteen centuries. It forms one line of evidence for the Quran\'s divine origin, directed particularly to scholars of the Arabic language.',
          bn: '"ইজাজুল কুরআন" মানে কুরআনের অতুলনীয়তা—এই দাবি যে এর আরবি ভাষাগতভাবে অনন্য এবং কখনো তুলনীয় হয়নি। কুরআন তুলনীয় একটি সুরা তৈরির উন্মুক্ত চ্যালেঞ্জ করে (কুরআন ২:২৩)। ধ্রুপদী আরবি সাহিত্য-বিশেষজ্ঞরা, যাদের দাবিটি খণ্ডন করার প্রতিটি কারণ ছিল, স্বীকার করেছেন যে কুরআন বিদ্যমান সাহিত্যিক শ্রেণিতে পড়ে না। চৌদ্দ শতাব্দীতে এই চ্যালেঞ্জ বিশ্বাসযোগ্যভাবে পূরণ হয়নি। এটি কুরআনের ঐশী উৎসের প্রমাণের একটি ধারা গঠন করে।',
        },
      },
      {
        q: { en: 'What is the Islamic teaching on freedom of belief and conscience?', bn: 'বিশ্বাস ও বিবেকের স্বাধীনতা নিয়ে ইসলামের শিক্ষা কী?' },
        a: {
          en: 'The Quran is unambiguous: "There is no compulsion in religion" (Quran 2:256). The Prophet\'s role is described as conveying the message, not compelling belief: "Your duty is only to convey" (Quran 3:20). The Quran accepts that some will not believe and that God alone judges hearts (Quran 10:99). In Medina the Prophet signed agreements guaranteeing religious freedom for different communities. Islam holds that genuine faith must be freely chosen — by its very nature it cannot be coerced.',
          bn: 'কুরআন দ্ব্যর্থহীন: "দ্বীনের ব্যাপারে কোনো জবরদস্তি নেই" (কুরআন ২:২৫৬)। নবীর ভূমিকাকে বার্তা পৌঁছানো হিসেবে বর্ণনা করা হয়েছে, বিশ্বাস চাপিয়ে দেওয়া নয়: "তোমার কর্তব্য কেবল পৌঁছানো" (কুরআন ৩:২০)। কুরআন স্বীকার করে যে কেউ কেউ বিশ্বাস করবে না এবং কেবল আল্লাহই হৃদয় বিচার করেন (কুরআন ১০:৯৯)। মদিনায় নবী বিভিন্ন সম্প্রদায়ের ধর্মীয় স্বাধীনতা নিশ্চিতকারী চুক্তি স্বাক্ষর করেছিলেন। ইসলাম মনে করে প্রকৃত ঈমান অবশ্যই স্বাধীনভাবে বেছে নিতে হবে—তার স্বভাবেই তা জবরদস্তিমূলক হতে পারে না।',
        },
      },
      {
        q: { en: 'Why did the Islamic Golden Age produce so much scientific progress?', bn: 'কেন ইসলামের স্বর্ণযুগে এত বৈজ্ঞানিক অগ্রগতি হয়েছিল?' },
        a: {
          en: 'Because the Islamic intellectual tradition treated the study of the natural world as a religious obligation. The Quran repeatedly commands observation and reflection on creation. The Prophet declared seeking knowledge a duty on every Muslim. This produced a civilisation of scholars — al-Khwarizmi (algebra), Ibn al-Haytham (optics), Ibn Sina (medicine), al-Biruni (geography) — who worked explicitly within a faith framework that regarded understanding God\'s creation as an act of worship. The Golden Age demonstrates that Islam and rigorous intellectual inquiry are not only compatible but historically produced each other.',
          bn: 'কারণ ইসলামি বুদ্ধিবৃত্তিক ঐতিহ্য প্রাকৃতিক জগতের অধ্যয়নকে ধর্মীয় বাধ্যবাধকতা হিসেবে বিবেচনা করেছিল। কুরআন বারবার সৃষ্টিতে পর্যবেক্ষণ ও প্রতিফলনের নির্দেশ দেয়। নবী জ্ঞান অন্বেষণকে প্রত্যেক মুসলিমের কর্তব্য ঘোষণা করেছেন। এটি এমন এক আলিম সভ্যতা তৈরি করেছিল—আল-খোয়ারিজমি (বীজগণিত), ইবনুল হাইসাম (আলোকবিজ্ঞান), ইবনে সিনা (চিকিৎসা), আল-বিরুনি (ভূগোল)—যাঁরা কাজ করেছেন এমন ঈমানি কাঠামোর মধ্যে যা আল্লাহর সৃষ্টি বোঝাকে ইবাদতের কাজ গণ্য করত।',
        },
      },
      {
        q: { en: 'What does Islam teach about the status of slavery today?', bn: 'আজকের দিনে দাসপ্রথার বিষয়ে ইসলাম কী শেখায়?' },
        a: {
          en: 'The overwhelming global consensus among Muslim scholars today is that all forms of slavery and human trafficking are absolutely prohibited in Islam. This conclusion is drawn from core Islamic principles: the Quran affirms the equal dignity of all human beings (Quran 49:13), praises freeing enslaved people as among the highest acts of charity (Quran 90:13), and the objectives of Islamic law (maqasid al-shari\'a) include the protection of human life and dignity. Though Islamic law in 7th-century Arabia did not abolish slavery by immediate decree, its moral trajectory pointed clearly toward abolition — and that trajectory is what modern Muslim scholars invoke.',
          bn: 'আজ বিশ্বব্যাপী মুসলিম আলিমদের মধ্যে অপ্রতিরোধ্য ঐকমত্য হলো, সমস্ত ধরনের দাসত্ব ও মানব পাচার ইসলামে সম্পূর্ণ নিষিদ্ধ। এই সিদ্ধান্ত ইসলামের মূল নীতি থেকে আসে: কুরআন সমস্ত মানুষের সমান মর্যাদা নিশ্চিত করে (কুরআন ৪৯:১৩), দাস মুক্তিকে সর্বোচ্চ দাতব্য কাজের একটি হিসেবে প্রশংসা করে (কুরআন ৯০:১৩), এবং মাকাসিদ আল-শরিয়া (ইসলামি আইনের উদ্দেশ্য) মানব জীবন ও মর্যাদা রক্ষা অন্তর্ভুক্ত করে।',
        },
      },
    ],
  },
  /* ── WAVE 2: Deeper Topics ──────────────────────────────────────────────── */
  {
    id: 'meaning-of-life',
    emoji: '🌱',
    kind: 'article',
    title: { en: 'The Meaning and Purpose of Life', bn: 'জীবনের অর্থ ও উদ্দেশ্য' },
    summary: {
      en: 'What Islam teaches about why we exist — rooted in the Quran and contrasted with secular alternatives.',
      bn: 'কেন আমরা বিদ্যমান — কুরআনের ভিত্তিতে ইসলাম কী শেখায় এবং ধর্মনিরপেক্ষ বিকল্পের সাথে তুলনা।',
    },
    points: [
      {
        heading: { en: 'The Quranic answer: worship and stewardship', bn: 'কুরআনের উত্তর: ইবাদত ও খিলাফত' },
        body: {
          en: 'The Quran states the purpose plainly: "I did not create jinn and humankind except to worship Me" (51:56). In Arabic, \'ibadah (worship) is far broader than the English word — it encompasses every conscious action done with awareness of God, not merely rituals. Alongside this, humans are called God\'s khalifah (vicegerent) on earth (2:30), entrusted with building it justly. Purpose is therefore both devotional and ethical: to orient the self toward God and to serve creation well.',
          bn: 'কুরআন উদ্দেশ্য সরাসরি বলে দেয়: "আমি জিন ও মানবজাতিকে কেবল আমার ইবাদতের জন্যই সৃষ্টি করেছি" (৫১:৫৬)। আরবিতে \'ইবাদাহ\' ইংরেজি \'worship\'-এর চেয়ে অনেক ব্যাপক — এটি আল্লাহর সচেতনতায় করা প্রতিটি কাজকে অন্তর্ভুক্ত করে, কেবল আচার নয়। পাশাপাশি, মানুষকে পৃথিবীতে আল্লাহর খলিফা (প্রতিনিধি) বলা হয়েছে (২:৩০)। উদ্দেশ্য তাই উভয়ই — আধ্যাত্মিক ও নৈতিক।',
        },
      },
      {
        heading: { en: 'A test with moral weight', bn: 'নৈতিক গুরুত্বসম্পন্ন পরীক্ষা' },
        body: {
          en: 'The Quran frames worldly life as a purposeful examination: "He who created death and life to test you as to which of you is best in deed" (67:2). Choices matter; actions carry weight. Surah al-Insan (76:2) describes humanity as created from a mixed drop and placed in trial — difficulty is not accidental but woven into the human story. This gives moral seriousness to every decision, however small.',
          bn: 'কুরআন পার্থিব জীবনকে উদ্দেশ্যমূলক পরীক্ষা হিসেবে বর্ণনা করে: "যিনি মৃত্যু ও জীবন সৃষ্টি করেছেন তোমাদের পরীক্ষা করতে — তোমাদের মধ্যে কর্মে কে উত্তম" (৬৭:২)। পছন্দ গুরুত্বপূর্ণ; কর্মের ওজন আছে। সূরা আল-ইনসান (৭৬:২) মানুষকে পরীক্ষায় স্থাপিত হিসেবে বর্ণনা করে — কষ্ট আকস্মিক নয়, মানব কাহিনিতে বোনা।',
        },
      },
      {
        heading: { en: 'Contrasting the nihilist answer', bn: 'শূন্যবাদী উত্তরের সাথে তুলনা' },
        body: {
          en: 'Some secular philosophies conclude that life has no inherent meaning — we are products of blind evolutionary processes, and any purpose we adopt is self-constructed. Islam engages this honestly: on a purely materialist premise, meaninglessness does follow logically. Its counter is a theistic argument: if a wise Creator made the universe and human consciousness, then meaning is built into existence, not invented. The Quran invites reflection rather than mere assertion: "Will you not then reason?" (67:10).',
          bn: 'কিছু ধর্মনিরপেক্ষ দর্শন সিদ্ধান্তে পৌঁছায় যে জীবনের কোনো অন্তর্নিহিত অর্থ নেই। ইসলাম এটি সৎভাবে মোকাবেলা করে: বিশুদ্ধ বস্তুবাদী ভিত্তিতে অর্থহীনতার উপসংহার যৌক্তিকভাবে অনুসরণ করে। এর পাল্টা যুক্তি: যদি একজন জ্ঞানী স্রষ্টা মহাবিশ্ব ও মানব চেতনা তৈরি করেন, তাহলে অর্থ আবিষ্কৃত নয়, বরং অস্তিত্বের মধ্যেই নির্মিত। কুরআন জিজ্ঞেস করে: "তোমরা কি তবু চিন্তা করবে না?" (৬৭:১০)।',
        },
      },
      {
        heading: { en: 'Purpose made practical', bn: 'উদ্দেশ্যকে বাস্তবে রূপান্তর' },
        body: {
          en: 'Islamic purpose is not abstract — it is expressed in daily life: prayer that anchors the self five times a day, honest work done as worship, kindness to neighbours as religious duty, and the pursuit of knowledge as an obligation. The Prophet ﷺ said: "A good word is charity." Purpose is not found by searching elsewhere but by acting well wherever one already stands.',
          bn: 'ইসলামের উদ্দেশ্য বিমূর্ত নয় — এটি দৈনন্দিন জীবনে প্রকাশ পায়: দিনে পাঁচবার নামাজ, সৎ কাজ যা ইবাদত, প্রতিবেশীর প্রতি দয়া যা ধর্মীয় কর্তব্য, এবং জ্ঞান অন্বেষণ যা বাধ্যতামূলক। নবী ﷺ বলেছেন: "একটি ভালো কথা সদকা।" উদ্দেশ্য অন্য কোথাও খোঁজার বিষয় নয়, যেখানে আছেন সেখানে ভালো করার মধ্যেই।',
        },
      },
    ],
  },
  {
    id: 'morality-without-god',
    emoji: '⚖️',
    kind: 'article',
    title: { en: 'Morality and Its Foundation', bn: 'নৈতিকতা ও তার ভিত্তি' },
    summary: {
      en: 'Can objective morality exist without God? Islam\'s answer and how tawhid grounds ethical life.',
      bn: 'আল্লাহ ছাড়া কি বস্তুনিষ্ঠ নৈতিকতা থাকতে পারে? ইসলামের উত্তর এবং তাওহিদ কীভাবে নৈতিক জীবনের ভিত্তি।',
    },
    points: [
      {
        heading: { en: 'The grounding problem', bn: 'ভিত্তির সমস্যা' },
        body: {
          en: 'Moral philosophy has long wrestled with a key question: if there is no God, what makes any action objectively right or wrong rather than merely preferred by custom? Secular answers — evolutionary pressure, social contract, utilitarian calculation — explain why humans develop moral codes, but face difficulty grounding those codes as genuinely binding beyond convention. Islam does not deny that non-believers can act with integrity; it raises the philosophical question of where, ultimately, the obligation to do so comes from.',
          bn: 'নৈতিক দর্শন দীর্ঘদিন ধরে একটি মূল প্রশ্নের সাথে লড়াই করছে: আল্লাহ না থাকলে, কোনো কাজকে বস্তুনিষ্ঠভাবে সঠিক বা ভুল কী করে? ধর্মনিরপেক্ষ উত্তরগুলো — বিবর্তনীয় চাপ, সামাজিক চুক্তি, উপযোগবাদী গণনা — ব্যাখ্যা করে কেন মানুষ নৈতিক বিধি তৈরি করে, কিন্তু সেই বিধিগুলোকে প্রথার বাইরে বাধ্যকর হিসেবে প্রতিষ্ঠিত করতে অসুবিধায় পড়ে।',
        },
      },
      {
        heading: { en: 'Tawhid as the moral foundation', bn: 'তাওহিদ নৈতিক ভিত্তি হিসেবে' },
        body: {
          en: 'Islam grounds morality in tawhid: God is one, and He is just, merciful and wise by nature — not arbitrarily. Because moral qualities are attributes of the one Creator, they are not cultural inventions but realities woven into existence. Humans were created with a fitra (natural constitution) that recognises justice and kindness as good, and cruelty and deception as wrong. This is why, Islamic thinkers note, moral intuitions tend to converge across cultures — they reflect a shared human nature made by one Maker.',
          bn: 'ইসলাম নৈতিকতার ভিত্তি তাওহিদে স্থাপন করে: আল্লাহ এক, এবং তিনি স্বভাবতই ন্যায়বান, দয়ালু ও জ্ঞানী। যেহেতু নৈতিক গুণাবলি এক স্রষ্টার বৈশিষ্ট্য, সেগুলো সাংস্কৃতিক আবিষ্কার নয়, বরং অস্তিত্বের মধ্যে বোনা বাস্তবতা। মানুষ ফিতরা সহ সৃষ্ট যা ন্যায় ও দয়াকে ভালো এবং নিষ্ঠুরতাকে ভুল বলে চেনে। এ কারণেই নৈতিক অন্তর্দৃষ্টি সংস্কৃতিজুড়ে একত্রিত হতে থাকে।',
        },
      },
      {
        heading: { en: 'Akhlaq: character as worship', bn: 'আখলাক: চরিত্র ইবাদত হিসেবে' },
        body: {
          en: 'In Islamic ethics, akhlaq (noble character) is inseparable from iman (faith). The Prophet ﷺ said: "The most complete of believers in faith are those with the best character." Generosity, honesty, patience and compassion are not merely social duties but expressions of one\'s inner relationship with God. One who truly internalises tawhid is naturally moved toward humility, gratitude and fair treatment of others — ethics becomes an expression of theology, not a separate compartment.',
          bn: 'ইসলামি নীতিশাস্ত্রে আখলাক (মহৎ চরিত্র) ঈমান থেকে অবিচ্ছেদ্য। নবী ﷺ বলেছেন: "সবচেয়ে পরিপূর্ণ মুমিন সেই যার চরিত্র সর্বোত্তম।" উদারতা, সততা, ধৈর্য ও সহানুভূতি বাহ্যিক দায়িত্ব নয়, বরং আল্লাহর সাথে ব্যক্তির অভ্যন্তরীণ সম্পর্কের প্রকাশ। যে ব্যক্তি সত্যিকারে তাওহিদ আত্মস্থ করেছে সে স্বাভাবিকভাবেই বিনম্রতা ও ন্যায়ের দিকে পরিচালিত হয়।',
        },
      },
      {
        heading: { en: 'Accountability gives morality its teeth', bn: 'জবাবদিহিতা নৈতিকতাকে কার্যকর করে' },
        body: {
          en: 'A distinctive feature of Islamic ethics is the link between morality and accountability before God. It is not only that one should be honest — it is that one will be asked about one\'s honesty. In a world where the powerful often escape human consequences, Islam teaches that no action, however hidden, escapes divine record (99:7-8). This is not a fearful ethic but a deeply motivating one: integrity matters absolutely, not merely when others are watching.',
          bn: 'ইসলামি নীতিশাস্ত্রের একটি বৈশিষ্ট্য হলো নৈতিকতা ও আল্লাহর কাছে জবাবদিহিতার সংযোগ। কেবল সৎ হওয়া উচিত নয় — সততা সম্পর্কে জিজ্ঞাসা করা হবে। ক্ষমতাবানরা প্রায়ই মানবিক পরিণতি এড়িয়ে যায়, কিন্তু ইসলাম শেখায় কোনো কাজ, যতই লুকানো হোক, ঐশী নথি থেকে পালাতে পারে না (৯৯:৭-৮)। সততা নিরঙ্কুশভাবে গুরুত্বপূর্ণ, কেবল অন্যরা দেখছে তখন নয়।',
        },
      },
    ],
  },
  {
    id: 'comparative-religion',
    emoji: '🕊️',
    kind: 'article',
    title: { en: 'Islam Among the Abrahamic Traditions', bn: 'আব্রাহামিক ঐতিহ্যগুলোর মধ্যে ইসলাম' },
    summary: {
      en: 'Shared roots with Judaism and Christianity, where Islam agrees, where it diverges, and why — respectfully presented.',
      bn: 'ইহুদি ধর্ম ও খ্রিস্টানিটির সাথে ভাগ করা মূল, ইসলাম কোথায় একমত, কোথায় ভিন্ন এবং কেন — শ্রদ্ধার সাথে।',
    },
    points: [
      {
        heading: { en: 'Shared Abrahamic ground', bn: 'অভিন্ন আব্রাহামিক ভিত্তি' },
        body: {
          en: 'Islam, Judaism and Christianity share foundational commitments: monotheism, the authority of divine revelation, moral accountability, the reality of an afterlife, and the importance of Abraham (Ibrahim) as a patriarch of faith. The Quran honours the Torah and Gospel as divine guidance sent for their times and treats Moses and Jesus as major prophets worthy of deep respect. Islam regards itself as the restoration and completion of the same message these traditions preserve — a claim it offers openly for examination.',
          bn: 'ইসলাম, ইহুদি ধর্ম ও খ্রিস্টানিটি মৌলিক প্রতিশ্রুতির একটি পরিবার ভাগ করে: একেশ্বরবাদ, ঐশী প্রকাশের কর্তৃত্ব, নৈতিক জবাবদিহিতা, পরকালের বাস্তবতা, এবং ইব্রাহিম (আ.) কে বিশ্বাসের পিতৃপুরুষ হিসেবে গুরুত্ব। কুরআন তাওরাত ও ইঞ্জিলকে তাদের সময়ের জন্য প্রেরিত ঐশী হিদায়াত হিসেবে সম্মান করে এবং মূসা ও ঈসা (আ.) কে শ্রদ্ধার যোগ্য প্রধান নবী হিসেবে বিবেচনা করে।',
        },
      },
      {
        heading: { en: 'Islam and Judaism: significant alignment', bn: 'ইসলাম ও ইহুদি ধর্ম: উল্লেখযোগ্য মিল' },
        body: {
          en: 'Of the three traditions, Islam and Judaism share some of the closest theological ground. Both affirm an undivided, non-incarnate God; both have a framework of religious law governing daily life (halakha and sharia); both observe ritual purity and dietary rules; and both emphasise direct, personal repentance to God without a priestly intermediary. Classical Muslim scholars regularly noted these convergences as evidence that both traditions drew from the same prophetic wellspring.',
          bn: 'তিনটি ঐতিহ্যের মধ্যে ইসলাম ও ইহুদি ধর্ম নিকটতম ধর্মতাত্ত্বিক ভূমি ভাগ করে। উভয়ই অবিভক্ত, অ-অবতার আল্লাহকে নিশ্চিত করে; উভয়েরই দৈনন্দিন জীবন নিয়ন্ত্রণকারী ধর্মীয় আইনের কাঠামো রয়েছে; উভয়ই আচারগত পবিত্রতা ও খাদ্যবিধি মেনে চলে; এবং উভয়ই পুরোহিত মধ্যস্থতাকারী ছাড়াই আল্লাহর কাছে সরাসরি তওবার উপর জোর দেয়।',
        },
      },
      {
        heading: { en: 'Islam and Christianity: shared love, key divergences', bn: 'ইসলাম ও খ্রিস্টানিটি: ভাগ করা ভালোবাসা, মূল পার্থক্য' },
        body: {
          en: 'Both Islam and Christianity revere Jesus (peace be upon him) deeply. The Quran affirms his virgin birth (3:47), his miracles, and his titles "Spirit of God" and "Word of God" (4:171). The divergence is on his nature: Christianity developed the doctrines of the Trinity and divine incarnation; Islam affirms Jesus as one of the greatest prophets but maintains that God does not become human and has no partners (112:1-4). Islamic scholarship sees this not as a rejection of Jesus but as preserving strict tawhid — the consistent message of all prophets including Jesus himself.',
          bn: 'ইসলাম ও খ্রিস্টানিটি উভয়ই ঈসা (আ.) কে গভীরভাবে সম্মান করে। কুরআন তাঁর কুমারী জন্ম (৩:৪৭), তাঁর মু\'জিজা, এবং "রূহুল্লাহ" ও "কালিমাতুল্লাহ" উপাধি (৪:১৭১) নিশ্চিত করে। পার্থক্য তাঁর প্রকৃতিতে: খ্রিস্টানিটি ত্রিত্ব ও ঐশী অবতার মতবাদ বিকশিত করেছে; ইসলাম ঈসা (আ.) কে সর্বশ্রেষ্ঠ নবীদের একজন বলে এবং মনে করে আল্লাহর কোনো অংশীদার নেই (১১২:১-৪)।',
        },
      },
      {
        heading: { en: 'Continuation, not rejection', bn: 'প্রত্যাখ্যান নয়, ধারাবাহিকতা' },
        body: {
          en: 'Islam\'s self-understanding is that it does not abolish earlier revelation but fulfils and completes it: "confirming that which preceded it" (5:48). Muslims are asked to hold the prophets of the Torah and Gospels in honour — "We make no distinction between any of His messengers" (2:285). An encounter with Islam need not feel like a repudiation of one\'s entire religious heritage, but a deepening of it — following Abraham\'s path of pure monotheism wherever it leads.',
          bn: 'ইসলামের আত্ম-বোধ হলো এটি পূর্ববর্তী প্রকাশকে বিলুপ্ত করে না, বরং পরিপূর্ণ ও সম্পূর্ণ করে: "পূর্ববর্তী কিতাবের সত্যায়নকারী" (৫:৪৮)। মুসলিমদের তাওরাত ও ইঞ্জিলের নবীদের সম্মানে ধারণ করতে বলা হয় — "আমরা তাঁর রাসূলদের মধ্যে কোনো পার্থক্য করি না" (২:২৮৫)। ইসলামের সাথে সাক্ষাৎ নিজের সম্পূর্ণ ধর্মীয় ঐতিহ্যের প্রত্যাখ্যান নয়, বরং তার গভীরতা।',
        },
      },
    ],
  },
  {
    id: 'spread-of-islam',
    emoji: '🌍',
    kind: 'article',
    title: { en: 'How and Why Islam Spread', bn: 'ইসলাম কীভাবে ও কেন ছড়িয়েছিল' },
    summary: {
      en: 'A balanced account of the theological, social and historical factors behind Islam\'s rapid and sustained spread.',
      bn: 'ইসলামের দ্রুত ও টেকসই বিস্তারের পেছনে ধর্মতাত্ত্বিক, সামাজিক ও ঐতিহাসিক কারণগুলোর একটি ভারসাম্যপূর্ণ বিবরণ।',
    },
    points: [
      {
        heading: { en: 'The theological appeal of clarity', bn: 'স্পষ্টতার ধর্মতাত্ত্বিক আকর্ষণ' },
        body: {
          en: 'Islam offered a theology of unusual clarity: one God, no intermediaries, no complex doctrinal hierarchy required for salvation, and a direct relationship between the worshipper and the Divine. In the 7th century this was striking in a region where polytheism offered little comfort and where Christianity\'s councils had produced sharp internal debates about the nature of Christ. Many early converts in Arabia, Persia, Syria and Egypt noted the simplicity and directness of the message as decisive in their acceptance.',
          bn: 'ইসলাম অসাধারণ স্পষ্টতার ধর্মতত্ত্ব উপস্থাপন করেছিল: এক আল্লাহ, কোনো মধ্যস্থতাকারী নেই, মুক্তির জন্য কোনো জটিল মতবাদগত শ্রেণিবিন্যাস নেই। ৭ম শতাব্দীতে এটি বিশেষভাবে আকর্ষণীয় ছিল এমন একটি অঞ্চলে যেখানে বহুদেবতাবাদ সামান্য সান্ত্বনা দিত এবং যেখানে খ্রিস্টানিটির কাউন্সিলগুলো তীব্র অভ্যন্তরীণ বিতর্ক তৈরি করেছিল।',
        },
      },
      {
        heading: { en: 'Social justice and radical egalitarianism', bn: 'সামাজিক ন্যায়বিচার ও মৌলিক সাম্যবাদ' },
        body: {
          en: 'Islam\'s insistence on human equality was revolutionary in stratified societies. The Quran declared that no Arab has superiority over a non-Arab except in God-consciousness (49:13). Bilal, an Ethiopian former slave, became the first muezzin — a position of profound honour. Zakat institutionalised wealth redistribution as a pillar of faith, not optional charity. Freed slaves, poor merchants and tribal outcasts were among the earliest converts precisely because Islam offered them genuine equality, not merely the promise of it.',
          bn: 'স্তরবিভক্ত সমাজে মানব সমতার উপর ইসলামের জোর ছিল বৈপ্লবিক। কুরআন ঘোষণা করেছিল কোনো আরবের অনারবের উপর শ্রেষ্ঠত্ব নেই তাকওয়া ছাড়া (৪৯:১৩)। ইথিওপিয়ান প্রাক্তন দাস বিলাল ইসলামের প্রথম মুয়াজ্জিন হয়েছিলেন। যাকাত সম্পদ পুনর্বণ্টন প্রাতিষ্ঠানিক করেছিল। মুক্তিপ্রাপ্ত দাস ও দরিদ্র বণিকরা প্রথম দিকের অনেক ধর্মান্তরিতের মধ্যে ছিলেন কারণ ইসলাম তাদের প্রকৃত সমতার সম্প্রদায় দিয়েছিল।',
        },
      },
      {
        heading: { en: 'Trade, scholarship and cultural vitality', bn: 'বাণিজ্য, পাণ্ডিত্য ও সাংস্কৃতিক প্রাণশক্তি' },
        body: {
          en: 'Islam spread along trade routes as much as through military campaigns — merchants from Mecca and Yemen carried the faith to East Africa, South and Southeast Asia, and sub-Saharan Africa centuries before any armies arrived there. The Islamic Golden Age (roughly 8th–13th centuries) produced breakthroughs in mathematics, medicine, astronomy and philosophy. The faith\'s emphasis on reading and intellectual inquiry made its centres of learning attractive to converts who valued scholarship.',
          bn: 'ইসলাম সামরিক প্রচারণার মতো বাণিজ্য পথ ধরেও ছড়িয়েছিল — মক্কা ও ইয়েমেনের বণিকরা পূর্ব আফ্রিকা, দক্ষিণ ও দক্ষিণ-পূর্ব এশিয়ায় কোনো সেনাবাহিনী পৌঁছানোর শতাব্দী আগে বিশ্বাস বহন করেছিলেন। ইসলামিক স্বর্ণযুগ (৮ম-১৩শ শতাব্দী) গণিত, চিকিৎসা ও জ্যোতির্বিদ্যায় অগ্রগতি তৈরি করেছিল এবং বিশ্বাসের পাঠ ও বুদ্ধিবৃত্তিক অনুসন্ধানের জোর শিক্ষার কেন্দ্রগুলোকে আকর্ষণীয় করেছিল।',
        },
      },
      {
        heading: { en: 'A balanced assessment', bn: 'একটি ভারসাম্যপূর্ণ মূল্যায়ন' },
        body: {
          en: 'Honest scholarship acknowledges that military conquest played a role in expanding early Islamic state frontiers, and that conversion under political rule was not always purely voluntary. At the same time, the historical record shows large-scale conversion happening over generations in places where no Islamic government existed — Indonesia, sub-Saharan West Africa, parts of China. The persistence of large non-Muslim communities within historic Islamic empires demonstrates that mass forced conversion was not the primary mechanism. Islam\'s spread was driven by a combination of spiritual appeal, social justice, intellectual culture and political conditions.',
          bn: 'সৎ পাণ্ডিত্য স্বীকার করে যে সামরিক বিজয় প্রাথমিক ইসলামি রাষ্ট্রের সীমানা সম্প্রসারণে ভূমিকা পালন করেছিল। একই সময়ে, ঐতিহাসিক নথি দেখায় বড় আকারের ধর্মান্তর ইন্দোনেশিয়া, পশ্চিম আফ্রিকা, চীনের কিছু অংশে — যেখানে কোনো ইসলামি সরকার ছিল না। ঐতিহাসিক ইসলামি সাম্রাজ্যের মধ্যে বড় অমুসলিম সম্প্রদায়ের অব্যাহততা প্রমাণ করে গণ জোরপূর্বক ধর্মান্তর প্রাথমিক প্রক্রিয়া ছিল না।',
        },
      },
    ],
  },
  {
    id: 'first-muslims',
    emoji: '⭐',
    kind: 'article',
    title: { en: 'The First Muslims: Diversity from the Start', bn: 'প্রথম মুসলিমরা: শুরু থেকে বৈচিত্র্য' },
    summary: {
      en: 'The stories of Bilal, Sumayyah, Suhayb and Salman — a freed slave, a martyred woman, a Byzantine merchant and a Persian seeker.',
      bn: 'বিলাল, সুমাইয়া, সুহাইব ও সালমানের গল্প — একজন মুক্তিপ্রাপ্ত দাস, একজন শহীদ নারী, একজন বাইজান্টাইন বণিক ও একজন পার্সিয়ান সন্ধানকারী।',
    },
    points: [
      {
        heading: { en: 'Bilal ibn Rabah: dignity beyond origin', bn: 'বিলাল ইবন রাবাহ: উৎপত্তির বাইরে মর্যাদা' },
        body: {
          en: 'Bilal was an enslaved Abyssinian man whose master tortured him publicly — placing a boulder on his chest in the desert heat — to force him to recant Islam. His response, "Ahad, Ahad" (One, One), became one of the most celebrated testimonies of faith in Islamic history. Abu Bakr purchased and freed him. After the conquest of Mecca, the Prophet ﷺ personally asked Bilal to climb the Ka\'bah and give the call to prayer — a man once enslaved, now standing on Islam\'s holiest site calling all humanity to God. His story embodies Islam\'s claim that faith transcends origin.',
          bn: 'বিলাল ছিলেন একজন ক্রীতদাস আবিসিনিয়ান মানুষ যাঁর মালিক তাঁকে ত্যাগ করাতে প্রকাশ্যে নির্যাতন করত। তাঁর প্রতিক্রিয়া — "আহাদ, আহাদ" — ইসলামি ইতিহাসে বিশ্বাসের সবচেয়ে উদযাপিত সাক্ষ্য। আবু বকর (রা.) তাঁকে কিনে মুক্ত করেছিলেন। মক্কা বিজয়ের পর নবী ﷺ ব্যক্তিগতভাবে বিলালকে কা\'বার উপরে উঠে আজান দিতে বলেছিলেন — একসময়ে দাস, এখন ইসলামের পবিত্রতম স্থানে দাঁড়িয়ে সমস্ত মানবজাতিকে আল্লাহর দিকে ডাকছেন।',
        },
      },
      {
        heading: { en: 'Sumayyah bint Khayyat: the first martyr', bn: 'সুমাইয়া বিনত খাব্বাত: প্রথম শহীদ' },
        body: {
          en: 'Sumayyah was an elderly enslaved woman among the earliest converts in Mecca. Along with her husband Yasir and son Ammar, she endured severe torture at the hands of Abu Jahl for refusing to recant her faith. Traditional accounts record that she became Islam\'s first martyr. Her name was preserved with honour by the companions and has been invoked across fourteen centuries as a symbol of steadfastness — a reminder that the foundations of Islam were laid not only by nobles and scholars but by those whom society had most marginalised.',
          bn: 'সুমাইয়া ছিলেন মক্কায় ইসলামের প্রথম দিকের ধর্মান্তরিতদের মধ্যে একজন বৃদ্ধ দাসী। তাঁর স্বামী ইয়াসির ও পুত্র আম্মারের সাথে তিনি বিশ্বাস ত্যাগ করতে অস্বীকার করার কারণে আবু জাহলের হাতে তীব্র নির্যাতন সহ্য করেছিলেন। ঐতিহ্যগত বিবরণ নথিভুক্ত করে তিনি ইসলামের প্রথম শহীদ হয়েছিলেন। চৌদ্দ শতাব্দী ধরে তাঁর নাম অবিচলতার প্রতীক হিসেবে উদ্ধৃত হয়েছে।',
        },
      },
      {
        heading: { en: 'Suhayb ar-Rumi: the Roman who gave everything', bn: 'সুহাইব আর-রুমি: যিনি সবকিছু দিয়েছিলেন' },
        body: {
          en: 'Suhayb ibn Sinan, called "ar-Rumi" (the Roman/Byzantine), was enslaved as a child in Byzantine territory, later gained freedom and became a wealthy merchant in Mecca. When he sought to emigrate to Medina, the Quraysh demanded he leave behind all his earned wealth. He offered them everything in exchange for his freedom to follow his faith. When the Prophet ﷺ heard this, he greeted Suhayb warmly, expressing that his exchange was most profitable. His story illustrates that from the very beginning, Islam attracted converts from across ethnic and geographic boundaries.',
          bn: 'সুহাইব ইবন সিনান, যাঁকে "আর-রুমি" বলা হত, বাইজান্টাইন অঞ্চলে শিশু বয়সে দাসত্বে পড়েছিলেন, পরে স্বাধীনতা অর্জন করেন এবং মক্কায় ধনী বণিক হয়ে ওঠেন। মদিনায় হিজরত করতে চাইলে কুরাইশরা তাঁর সম্পদ দাবি করে। তিনি বিশ্বাস অনুসরণের স্বাধীনতার বিনিময়ে সবকিছু দিতে রাজি হন। নবী ﷺ শুনে উষ্ণভাবে তাঁকে অভ্যর্থনা জানালেন এবং বললেন তাঁর বিনিময় লাভজনক।',
        },
      },
      {
        heading: { en: 'Salman al-Farisi: the long journey to truth', bn: 'সালমান আল-ফারিসি: সত্যের দীর্ঘ যাত্রা' },
        body: {
          en: 'Salman was born in Persia to a Zoroastrian family. His spiritual restlessness led him first to Christianity, where he served various priests and bishops across Persia, Iraq and Syria seeking the signs of the final prophet. A dying bishop directed him toward Arabia. He eventually reached Medina, recognised Muhammad ﷺ as the prophet he had been seeking, and became a close companion. He is credited with the strategic suggestion to dig a trench at the Battle of the Trench, drawing on Persian military tradition. The Prophet ﷺ described him as belonging to his own household — the deepest mark of spiritual kinship. Salman\'s journey is a timeless account of sincere seeking finding its destination.',
          bn: 'সালমান পারস্যে একটি জরথুস্ট্রীয় পরিবারে জন্মগ্রহণ করেছিলেন। তাঁর আধ্যাত্মিক অস্থিরতা তাঁকে খ্রিস্টানিটিতে নিয়ে যায়, যেখানে তিনি চূড়ান্ত নবীর নিদর্শন খুঁজে পারস্য, ইরাক ও সিরিয়া জুড়ে বিভিন্ন পাদরির সেবা করেছিলেন। একজন মৃত্যুপথযাত্রী বিশপ তাঁকে আরবের দিকে ইঙ্গিত করেছিলেন। তিনি মদিনায় পৌঁছান, মুহাম্মাদ ﷺ কে চিহ্নিত করেন এবং ঘনিষ্ঠ সাহাবি হন। নবী ﷺ তাঁকে নিজের পরিবারের অন্তর্ভুক্ত বলে বর্ণনা করেছিলেন — গভীরতম আধ্যাত্মিক আত্মীয়তার চিহ্ন।',
        },
      },
    ],
  },
  {
    id: 'slavery-in-islamic-history',
    emoji: '⛓️',
    kind: 'article',
    title: { en: 'Slavery in Islamic History: Context and Reform', bn: 'ইসলামি ইতিহাসে দাসত্ব: প্রেক্ষাপট ও সংস্কার' },
    summary: {
      en: 'The 7th-century context, the legal paths Islam created toward freedom, its dignity provisions, and the modern scholarly consensus.',
      bn: '৭ম শতাব্দীর প্রেক্ষাপট, ইসলাম মুক্তির জন্য যে আইনি পথ তৈরি করেছিল, মর্যাদার বিধান এবং আধুনিক পণ্ডিত ঐকমত্য।',
    },
    points: [
      {
        heading: { en: 'The world Islam was born into', bn: 'ইসলামের জন্মের বিশ্ব' },
        body: {
          en: 'When the Quran was revealed in the 7th century, slavery was a global institution embedded in the economies of every major civilisation — Roman, Persian, Byzantine, Indian and Chinese. Immediate total abolition would have been unenforceable and would have left enslaved people without economic infrastructure to survive. This context does not excuse every feature of the historical practice, but it explains why Islam worked through the institution rather than instantly outlawing it — using law, incentive and moral re-framing to dismantle it systematically.',
          bn: '৭ম শতাব্দীতে কুরআন নাজিল হওয়ার সময় দাসত্ব ছিল একটি বৈশ্বিক প্রতিষ্ঠান যা রোমান, পার্সিয়ান, বাইজান্টাইন সহ প্রতিটি প্রধান সভ্যতার অর্থনীতিতে প্রোথিত ছিল। তাৎক্ষণিক সম্পূর্ণ বিলুপ্তি প্রয়োগযোগ্য হত না। এই প্রেক্ষাপট ঐতিহাসিক অনুশীলনের প্রতিটি বৈশিষ্ট্যকে ক্ষমা করে না, কিন্তু ব্যাখ্যা করে কেন ইসলাম তাৎক্ষণিক নিষিদ্ধের পরিবর্তে আইন, প্রণোদনা ও নৈতিক পুনর্বিন্যাস ব্যবহার করে পদ্ধতিগতভাবে ভেঙে দিতে কাজ করেছিল।',
        },
      },
      {
        heading: { en: 'Legal paths to freedom: kaffarah and mukataba', bn: 'মুক্তির আইনি পথ: কাফফারা ও মুকাতাবা' },
        body: {
          en: 'Islam created multiple legal mechanisms to reduce slavery. Kaffarah (expiation for sins such as breaking oaths or fasts) frequently required the freeing of a slave — making liberation a form of worship. Mukataba allowed an enslaved person to negotiate a written contract with their owner to purchase their own freedom in instalments, with the Quran directing owners not to withhold this opportunity (24:33). The Quran itself ranked freeing a slave among the highest acts of charity (90:13), and the Prophet ﷺ strongly encouraged manumission and practised it himself.',
          bn: 'ইসলাম দাসত্ব হ্রাসের জন্য একাধিক আইনি প্রক্রিয়া তৈরি করেছিল। কাফফারা (পাপের প্রায়শ্চিত্ত) প্রায়ই একজন দাসকে মুক্ত করতে হত — মুক্তিকে ইবাদতের রূপ করে তুলল। মুকাতাবা একজন দাসকে কিস্তিতে নিজেদের স্বাধীনতা কেনার জন্য মালিকের সাথে লিখিত চুক্তি করার অনুমতি দিত, কুরআন মালিকদের এই সুযোগ না দেওয়ার নির্দেশ দিয়েছিল (২৪:৩৩)। কুরআন দাস মুক্তিকে সর্বোচ্চ দাতব্য কাজের মধ্যে স্থান দিয়েছে (৯০:১৩)।',
        },
      },
      {
        heading: { en: 'Dignity provisions within the law', bn: 'আইনের মধ্যে মর্যাদার বিধান' },
        body: {
          en: 'Islamic law placed significant restrictions on the treatment of enslaved people. An owner who physically harmed a slave was required to free that person. Enslaved persons had legal rights — their marriages were valid, their children free, their testimony heard in certain cases. The Quran and hadith repeatedly framed the enslaved as full human beings equal before God, entitled to food, clothing and rest comparable to their owner\'s. This was a marked departure from Roman law which classified slaves as property with no rights at all.',
          bn: 'ইসলামি আইন দাস ব্যক্তিদের সাথে আচরণের উপর উল্লেখযোগ্য বিধিনিষেধ আরোপ করেছিল। যে মালিক শারীরিকভাবে দাসকে আঘাত করতেন তাঁকে সেই ব্যক্তিকে মুক্ত করতে হত। দাস ব্যক্তিদের আইনি অধিকার ছিল — তাদের বিবাহ বৈধ, সন্তানরা মুক্ত। কুরআন ও হাদিস বারবার দাসকে আল্লাহর সামনে সমান মর্যাদাসম্পন্ন পূর্ণ মানুষ হিসেবে বর্ণনা করেছে। এটি রোমান আইনের অবস্থান থেকে উল্লেখযোগ্যভাবে আলাদা যেখানে দাসরা কোনো অধিকারহীন সম্পত্তি।',
        },
      },
      {
        heading: { en: 'The modern consensus: absolute prohibition', bn: 'আধুনিক ঐকমত্য: সম্পূর্ণ নিষেধ' },
        body: {
          en: 'Contemporary Muslim scholars and institutions — from Al-Azhar to independent researchers — have reached a consensus that slavery in all its forms is impermissible in Islam today. The reasoning draws on maqasid al-shariah (the higher objectives of Islamic law): protecting human life, dignity, intellect and lineage. The internal Quranic and Prophetic trajectory of restricting and incentivising abolition is treated as pointing unambiguously to full prohibition. Major Islamic bodies have issued formal statements to this effect. This is not a revision of Islam but the fulfilment of its own internal logic.',
          bn: 'আল-আজহার থেকে স্বাধীন গবেষকরা — সমসাময়িক মুসলিম পণ্ডিত ও প্রতিষ্ঠানগুলো ঐকমত্যে পৌঁছেছে যে সমস্ত রূপে দাসত্ব আজ ইসলামে অপ্রচলিত। যুক্তি মাকাসিদ আল-শরিয়া থেকে আসে: মানব জীবন, মর্যাদা, বুদ্ধি ও বংশ রক্ষা। ইসলামের অভ্যন্তরীণ কুরআনিক ও নবীসুলভ গতিপথ সম্পূর্ণ নিষেধের দিকে নির্দেশ করে। এটি ইসলামের সংশোধন নয়, বরং এর অভ্যন্তরীণ যুক্তির পরিপূর্ণতা।',
        },
      },
    ],
  },
  {
    id: 'treatment-of-women',
    emoji: '🌸',
    kind: 'article',
    title: { en: 'Women in Islam: Elevation, Rights and Legacy', bn: 'ইসলামে নারী: উন্নতি, অধিকার ও উত্তরাধিকার' },
    summary: {
      en: 'The Quranic elevation of women, their legal and spiritual rights, and the scholarly legacy of companions like Aisha and Umm Salamah.',
      bn: 'নারীদের কুরআনিক উন্নতি, তাদের আইনি ও আধ্যাত্মিক অধিকার, এবং আইশা ও উম্মে সালামার মতো সাহাবিদের পাণ্ডিত্যপূর্ণ উত্তরাধিকার।',
    },
    points: [
      {
        heading: { en: 'Spiritual equality and full personhood', bn: 'আধ্যাত্মিক সমতা ও পূর্ণ ব্যক্তিত্ব' },
        body: {
          en: 'The Quran affirmed women\'s full spiritual equality at a time when this was contested across cultures. "Muslim men and Muslim women, believing men and believing women… for them God has prepared forgiveness and a mighty reward" (33:35) — identical spiritual categories for both sexes. The Quran also states that each soul is accountable individually (6:164), that there is no inherited guilt by gender, and that Paradise is attained by deeds and sincerity. This was a significant doctrinal departure from traditions that placed women\'s spiritual status beneath men\'s.',
          bn: 'কুরআন এমন একটি সময়ে নারীদের পুরুষের সাথে পূর্ণ আধ্যাত্মিক সমতা নিশ্চিত করেছিল যখন এটি সংস্কৃতিজুড়ে বিতর্কিত ছিল। "মুসলমান পুরুষ ও মুসলমান নারী... তাদের জন্য আল্লাহ ক্ষমা ও মহান পুরস্কার প্রস্তুত করেছেন" (৩৩:৩৫) — উভয় লিঙ্গের জন্য অভিন্ন আধ্যাত্মিক বিভাগ। কুরআন আরো বলে প্রতিটি আত্মা স্বতন্ত্রভাবে জবাবদিহি করে (৬:১৬৪) এবং জান্নাত কর্ম ও আন্তরিকতা দ্বারা অর্জিত হয়, লিঙ্গ দ্বারা নয়।',
        },
      },
      {
        heading: { en: 'Legal and economic rights established early', bn: 'প্রাথমিকভাবে প্রতিষ্ঠিত আইনি ও অর্থনৈতিক অধিকার' },
        body: {
          en: 'The Quran established women\'s rights to own property independently (4:32), to inherit (4:11-12), to retain their full mahr (dower) as personal property with no obligation to spend it on household expenses, and to initiate divorce through khul\' (4:128-130). These were legally codified rights at a time when European women would not have comparable property rights for over a millennium. The Prophet ﷺ said: "The best of you are those who are best to their wives."',
          bn: 'কুরআন নারীদের স্বাধীনভাবে সম্পত্তির মালিক হওয়ার অধিকার (৪:৩২), উত্তরাধিকার (৪:১১-১২), গৃহস্থালি ব্যয়ে খরচ করার বাধ্যবাধকতা ছাড়া তাদের সম্পূর্ণ মহর ব্যক্তিগত সম্পত্তি হিসেবে রাখার অধিকার, এবং খুল\' এর মাধ্যমে তালাক শুরু করার অধিকার (৪:১২৮-১৩০) প্রতিষ্ঠা করেছিল। এগুলো আইনত কোডিফাইড অধিকার যখন ইউরোপীয় নারীদের তুলনীয় অধিকার ছিল না। নবী ﷺ বলেছেন: "তোমাদের মধ্যে সর্বোত্তম যে তার স্ত্রীর কাছে সর্বোত্তম।"',
        },
      },
      {
        heading: { en: 'Aisha and Umm Salamah: scholarship from the start', bn: 'আইশা ও উম্মে সালামা: শুরু থেকে পাণ্ডিত্য' },
        body: {
          en: 'Aisha bint Abi Bakr is among the most prolific transmitters of hadith in Islamic history — thousands of narrations trace to her, and she corrected senior male companions on points of jurisprudence. After the Prophet\'s death ﷺ she was sought from across the Islamic world as an authority on his practice. Umm Salamah challenged the Prophet ﷺ directly on whether Quranic address included women — her concern contributed to the revelation of 33:35, which explicitly names women. Both demonstrate that scholarship, critical inquiry and religious authority were available to Muslim women at the very origins of the tradition.',
          bn: 'আইশা বিনত আবি বকর ইসলামি ইতিহাসে হাদিসের অন্যতম বিপুল বর্ণনাকারী — হাজার হাজার বর্ণনা তাঁর কাছে সনদযুক্ত, এবং তিনি প্রবীণ পুরুষ সাহাবিদের ফিকহের বিষয়ে সংশোধন করেছিলেন। উম্মে সালামা কুরআনিক সম্বোধন নারীদের অন্তর্ভুক্ত করে কিনা তা নিয়ে নবী ﷺ কে সরাসরি প্রশ্ন করেছিলেন — তাঁর উদ্বেগ ৩৩:৩৫ এর ওহির দিকে অবদান রেখেছিল। উভয়েই দেখান ঐতিহ্যের উৎসেই মুসলিম নারীদের পাণ্ডিত্য ও ধর্মীয় কর্তৃত্ব ছিল।',
        },
      },
      {
        heading: { en: 'Contextualising witness and inheritance', bn: 'সাক্ষ্য ও উত্তরাধিকারের প্রেক্ষাপট' },
        body: {
          en: 'Verses on financial witness (2:282) and inheritance differentials (4:11) are frequently cited without context. On witness: the verse addresses commercial contracts in a society where most women did not participate in financial transactions; scholars note it permits a single woman\'s testimony as sufficient in contexts where she has relevant expertise. On inheritance: Islamic law grants women full personal ownership of their share while the male heir in the same scenario typically bears legal financial obligations to the family — the differential reflects assigned duties, not assigned worth. These remain areas of ongoing scholarly discussion.',
          bn: 'আর্থিক সাক্ষ্য (২:২৮২) ও উত্তরাধিকার পার্থক্যের (৪:১১) আয়াতগুলো প্রায়ই প্রেক্ষাপটের বাইরে উদ্ধৃত হয়। সাক্ষ্যের বিষয়ে: আয়াতটি এমন সমাজে বাণিজ্যিক চুক্তি নিয়ে আলোচনা করে যেখানে বেশিরভাগ নারী আর্থিক লেনদেনে অংশ নিত না। উত্তরাধিকারের বিষয়ে: ইসলামি আইন নারীদের তাদের অংশের সম্পূর্ণ ব্যক্তিগত মালিকানা দেয় যখন পুরুষ উত্তরাধিকারী পরিবারের প্রতি আইনগত আর্থিক বাধ্যবাধকতা বহন করে — পার্থক্য মূল্য নয়, নির্ধারিত দায়িত্ব প্রতিফলিত করে।',
        },
      },
    ],
  },
  {
    id: 'treatment-of-children',
    emoji: '👶',
    kind: 'article',
    title: { en: 'Children\'s Rights in Islam', bn: 'ইসলামে শিশু অধিকার' },
    summary: {
      en: 'From the prohibition of infanticide to Islamic duties of care, naming, education and equal treatment of all children.',
      bn: 'শিশুহত্যা নিষেধ থেকে যত্ন, নামকরণ, শিক্ষা ও সকল শিশুর প্রতি সমান আচরণের ইসলামি কর্তব্য পর্যন্ত।',
    },
    points: [
      {
        heading: { en: 'The abolition of infanticide', bn: 'শিশুহত্যা বিলুপ্তি' },
        body: {
          en: 'Pre-Islamic Arabia practised the burial of infant girls alive — a custom rooted in economic fear and tribal shame. The Quran addressed this with stark directness: "And when the girl [who was] buried alive is asked — for what sin she was killed" (81:8-9) and "Do not kill your children out of fear of poverty" (17:31). This was among Islam\'s earliest moral reforms — a civilisational declaration that a child\'s life has absolute value regardless of sex. The same principle extends to a general prohibition of taking innocent life for economic reasons.',
          bn: 'ইসলাম-পূর্ব আরবে শিশু কন্যাদের জীবন্ত সমাহিত করার প্রথা ছিল। কুরআন এটি তীক্ষ্ণভাবে সম্বোধন করেছিল: "এবং যখন জীবন্ত সমাহিত কন্যাকে জিজ্ঞাসা করা হবে — কোন পাপে সে নিহত হয়েছিল" (৮১:৮-৯) এবং "দারিদ্র্যের ভয়ে তোমার সন্তানকে হত্যা করো না" (১৭:৩১)। এটি ইসলামের প্রথম নৈতিক সংস্কারগুলোর মধ্যে অন্যতম — একটি সভ্যতামূলক ঘোষণা যে একটি শিশুর জীবনের লিঙ্গ নির্বিশেষে পরম মূল্য রয়েছে।',
        },
      },
      {
        heading: { en: 'Rights at birth and in childhood', bn: 'জন্মে ও শৈশবে অধিকার' },
        body: {
          en: 'Islamic fiqh recognises rights that attach to a child from birth: the right to a good name (the Prophet ﷺ encouraged names of good meaning and discouraged names of poor association), the right to adequate nutrition and care, and the right to have their lineage acknowledged. The adhan is traditionally whispered in a newborn\'s ear — symbolically introducing the child to the divine presence from their first moments. These practices reflect a theology in which childhood is not a lesser state to be managed but a sacred stage of human development.',
          bn: 'ইসলামি ফিকহ জন্ম থেকে শিশুর অধিকার স্বীকার করে: একটি ভালো নামের অধিকার (নবী ﷺ ভালো অর্থের নাম রাখার পরামর্শ দিতেন), পর্যাপ্ত পুষ্টি ও যত্নের অধিকার, এবং বংশ স্বীকৃত হওয়ার অধিকার। আজান ঐতিহ্যগতভাবে নবজাতকের কানে ফিসফিস করে বলা হয় — শিশুকে তাদের প্রথম মুহূর্ত থেকে ঐশী উপস্থিতির সাথে পরিচয় করিয়ে দেওয়ার প্রতীকী অর্থে।',
        },
      },
      {
        heading: { en: 'Education and nurture as obligations', bn: 'শিক্ষা ও লালনপালন দায়িত্ব হিসেবে' },
        body: {
          en: 'Providing children with education is an Islamic obligation, not an option. The first word revealed to the Prophet ﷺ was "Read" (Iqra — 96:1). Classical scholars emphasised that this obligation extended to daughters as much as sons — a historically significant stance. The Prophet ﷺ said: "It is obligatory for every Muslim to seek knowledge." Hadith literature also records the importance of play in childhood and warns against overburdening children. Good parenting is treated as an amanah (trust) for which the parent is accountable.',
          bn: 'শিশুদের শিক্ষা প্রদান ইসলামি বাধ্যবাধকতা, ঐচ্ছিক নয়। নবী ﷺ এর কাছে প্রথম প্রকাশিত শব্দ ছিল "পড়ো" (ইকরা — ৯৬:১)। ক্লাসিক্যাল পণ্ডিতরা জোর দিয়েছিলেন এই বাধ্যবাধকতা পুত্রের মতো কন্যাদের ক্ষেত্রেও প্রযোজ্য। নবী ﷺ বলেছেন: "প্রতিটি মুসলমানের জন্য জ্ঞান অন্বেষণ করা ফরজ।" হাদিস সাহিত্য শৈশবে খেলার গুরুত্বও নথিভুক্ত করে। ভালো পিতামাতা হওয়া একটি আমানত যার জন্য জবাবদিহি করতে হবে।',
        },
      },
      {
        heading: { en: 'Fairness among children', bn: 'শিশুদের মধ্যে ন্যায্যতা' },
        body: {
          en: 'The Prophet ﷺ instructed parents to treat all their children with fairness and equal affection. A hadith records a companion who gifted one son a sum of money and sought the Prophet\'s witness to the act. The Prophet ﷺ refused to witness it unless the same was given to all the children — a direct ruling against financial favouritism. The Prophet ﷺ is also recorded as kissing and showing tenderness to children publicly, demonstrating that warmth toward children is a prophetic virtue, not a weakness.',
          bn: 'নবী ﷺ পিতামাতাকে সন্তানদের সাথে ন্যায্যতা ও সমান স্নেহ দিয়ে আচরণ করার নির্দেশ দিয়েছিলেন। একটি হাদিস নথিভুক্ত করে একজন সাহাবি এক পুত্রকে অর্থ উপহার দিয়ে নবীর সাক্ষ্য চেয়েছিলেন। নবী ﷺ তা না দিলে সাক্ষী হতে অস্বীকার করেছিলেন — বস্তুগত পক্ষপাতিত্বের বিরুদ্ধে সরাসরি রুলিং। নবী ﷺ প্রকাশ্যে শিশুদের চুম্বন ও স্নেহ দেখাতেন, প্রমাণ করে শিশুদের প্রতি উষ্ণতা নবীসুলভ গুণ।',
        },
      },
    ],
  },
  {
    id: 'treatment-of-non-muslims',
    emoji: '🤝',
    kind: 'article',
    title: { en: 'Non-Muslims in Islamic Society', bn: 'ইসলামি সমাজে অমুসলিমরা' },
    summary: {
      en: 'Quranic commands of justice for all, the Medina Constitution, the dhimmi framework in context, and modern scholarly positions.',
      bn: 'সকলের জন্য ন্যায়বিচারের কুরআনিক আদেশ, মদিনা সনদ, প্রেক্ষাপটে জিম্মি কাঠামো এবং আধুনিক পাণ্ডিত্যপূর্ণ অবস্থান।',
    },
    points: [
      {
        heading: { en: 'Quranic justice without exception', bn: 'ব্যতিক্রম ছাড়া কুরআনিক ন্যায়বিচার' },
        body: {
          en: 'The Quran commands justice toward all people without qualification: "Let not the hatred of a people prevent you from being just. Be just — that is nearer to righteousness" (5:8). It explicitly permits friendship and kindness toward those who do not fight Muslims (60:8) and declares belief a matter of free conscience: "There is no compulsion in religion" (2:256). The Prophet ﷺ warned that he would argue against any Muslim who mistreated a non-Muslim under his protection on the Day of Judgement.',
          bn: 'কুরআন সমস্ত মানুষের প্রতি যোগ্যতা ছাড়াই ন্যায়বিচারের আদেশ দেয়: "কোনো জাতির প্রতি শত্রুতা তোমাদের ন্যায়বিচার থেকে বিরত না রাখুক। ন্যায়বিচার করো — এটি তাকওয়ার নিকটতর" (৫:৮)। এটি মুসলিমদের সাথে যুদ্ধ না করে এমনদের প্রতি বন্ধুত্ব ও সদয়তার অনুমতি দেয় (৬০:৮) এবং ঘোষণা করে "ধর্মে কোনো জবরদস্তি নেই" (২:২৫৬)।',
        },
      },
      {
        heading: { en: 'The Medina Constitution: a founding document', bn: 'মদিনা সনদ: একটি প্রতিষ্ঠাতা দলিল' },
        body: {
          en: 'Shortly after the Prophet\'s ﷺ migration to Medina, he established a written agreement — the "Constitution of Medina" — among Muslims, pagan Arabs and the Jewish tribes of the city. It recognised them all as one community for purposes of mutual defence, affirmed each group\'s right to its own religious practice and laws, and established that disputes would be resolved through justice and without favouritism. Historians regard this as one of the earliest written constitutional agreements in recorded history and evidence that the Prophetic model of governance was principled pluralism.',
          bn: 'নবী ﷺ এর মদিনায় হিজরতের কিছু পরে তিনি মুসলিম, পৌত্তলিক আরব ও শহরের ইহুদি উপজাতিগুলোর মধ্যে "মদিনার সংবিধান" প্রতিষ্ঠা করেছিলেন। এটি তাদের সকলকে পারস্পরিক প্রতিরক্ষার জন্য একটি সম্প্রদায় হিসেবে স্বীকার করেছিল, প্রতিটি গোষ্ঠীর নিজস্ব ধর্মীয় অনুশীলনের অধিকার নিশ্চিত করেছিল। ঐতিহাসিকরা এটিকে নথিভুক্ত ইতিহাসের প্রাচীনতম লিখিত সাংবিধানিক চুক্তিগুলোর একটি হিসেবে বিবেচনা করেন।',
        },
      },
      {
        heading: { en: 'The dhimmi framework: historical and contextual', bn: 'জিম্মি কাঠামো: ঐতিহাসিক ও প্রাসঙ্গিক' },
        body: {
          en: 'In pre-modern Islamic states, non-Muslim permanent residents (dhimmis) paid a jizya (protection tax) in exchange for exemption from military service and the right to govern their own communities by their own religious law. Evaluated in historical context, this offered Jews and Christians protections and legal autonomy they typically lacked in contemporaneous European kingdoms. Medieval fiqh did impose some public limitations that modern scholarship critiques, and many contemporary scholars hold that those conditions no longer apply in modern states with constitutional equality.',
          bn: 'প্রাক-আধুনিক ইসলামি রাষ্ট্রগুলোতে অমুসলিম স্থায়ী বাসিন্দারা (জিম্মি) সামরিক সেবা থেকে অব্যাহতি ও নিজেদের ধর্মীয় আইন দ্বারা নিজেদের সম্প্রদায় পরিচালনার বিনিময়ে জিজিয়া প্রদান করত। ঐতিহাসিক প্রেক্ষাপটে এটি ইহুদি ও খ্রিস্টানদের সুরক্ষা ও আইনি স্বায়ত্তশাসন দিয়েছিল যা তারা সাধারণত সমসাময়িক ইউরোপীয় রাজ্যগুলোতে পাত না। অনেক সমসাময়িক পণ্ডিত মনে করেন সেই শর্তগুলো আধুনিক সাংবিধানিক রাষ্ট্রগুলোতে আর প্রযোজ্য নয়।',
        },
      },
      {
        heading: { en: 'The guest and the covenant of protection', bn: 'অতিথি ও সুরক্ষার অঙ্গীকার' },
        body: {
          en: 'The Prophet ﷺ said: "Whoever harms a person under treaty has harmed me." Islamic hospitality traditions emphasise welcoming guests without religious precondition, and Islamic law recognises that a non-Muslim under guarantee of safety is owed full protection of life, property and honour. The mistreatment of religious minorities is not a minor offence in Islamic ethics but a grave violation of prophetic instruction — the honour of the Muslim community is bound to how it treats its non-Muslim neighbours and guests.',
          bn: 'নবী ﷺ বলেছেন: "যে চুক্তিবদ্ধ কাউকে কষ্ট দেয় সে আমাকে কষ্ট দেয়।" ইসলামি আতিথেয়তার ঐতিহ্য ধর্মীয় শর্ত ছাড়াই অতিথিদের স্বাগত জানানোর উপর জোর দেয়। ইসলামি আইন স্বীকার করে নিরাপত্তার নিশ্চয়তার অধীনে অমুসলিমকে জীবন, সম্পত্তি ও সম্মানের সম্পূর্ণ সুরক্ষা দেওয়া হয়। ধর্মীয় সংখ্যালঘুদের দুর্ব্যবহার ইসলামি নীতিশাস্ত্রে নবীসুলভ নির্দেশের গুরুতর লঙ্ঘন।',
        },
      },
    ],
  },
  {
    id: 'wisdom-of-tests',
    emoji: '🌊',
    kind: 'article',
    title: { en: 'The Wisdom Behind Trials and Hardship', bn: 'পরীক্ষা ও কষ্টের পেছনের প্রজ্ঞা' },
    summary: {
      en: 'How Islam understands suffering — as purposeful test, as growth and as mercy — drawing on key Quranic verses and prophetic tradition.',
      bn: 'ইসলাম কীভাবে কষ্টকে বোঝে — উদ্দেশ্যমূলক পরীক্ষা, বিকাশ ও রহমত হিসেবে — মূল কুরআনিক আয়াত ও নবীসুলভ ঐতিহ্য থেকে।',
    },
    points: [
      {
        heading: { en: 'Trials are part of the design', bn: 'পরীক্ষা নকশার অংশ' },
        body: {
          en: 'The Quran presents trials not as accidents but as a constitutive element of existence: "He who created death and life to test you as to which of you is best in deed" (67:2). Human moral quality cannot be revealed without real choices under real conditions — ease without difficulty reveals neither character nor resolve. Surah al-Ankabut opens: "Do people think they will be left to say \'we believe\' without being tested?" (29:2-3), and 21:35 states: "We test you with evil and good as trial." Hardship is built into the human story.',
          bn: 'কুরআন পরীক্ষাকে দুর্ঘটনা নয়, বরং অস্তিত্বের মূল উপাদান হিসেবে উপস্থাপন করে: "যিনি মৃত্যু ও জীবন সৃষ্টি করেছেন তোমাদের পরীক্ষা করতে — তোমাদের মধ্যে কর্মে কে উত্তম" (৬৭:২)। অসুবিধা ছাড়া সহজতা চরিত্র বা দৃঢ়তা প্রকাশ করে না। সূরা আল-আনকাবুত শুরু হয়: "মানুষ কি মনে করে \'আমরা বিশ্বাস করি\' বললেই পরীক্ষা ছাড়া ছেড়ে দেওয়া হবে?" (২৯:২-৩), এবং ২১:৩৫ বলে: "আমরা তোমাদের মন্দ ও ভালো দিয়ে পরীক্ষা করি।"',
        },
      },
      {
        heading: { en: 'The response: sabr and gratitude', bn: 'প্রতিক্রিয়া: সবর ও কৃতজ্ঞতা' },
        body: {
          en: 'Islam prescribes a specific response to trials: sabr (patient perseverance) combined with trust in God\'s wisdom. "And give good news to the patient — those who, when disaster strikes them, say: Indeed, we belong to God and to Him we shall return. Those are the ones upon whom are blessings from their Lord and mercy" (2:155-157). Sabr is not passive resignation but an active, spiritually engaged endurance. The Prophet ﷺ said that the entire affair of the believer is remarkable — if good comes, they are grateful; if hardship, they are patient — and both are good for them.',
          bn: 'ইসলাম পরীক্ষার জন্য একটি নির্দিষ্ট প্রতিক্রিয়া নির্ধারণ করে: সবর (ধৈর্যশীল অধ্যবসায়) আল্লাহর প্রজ্ঞায় বিশ্বাসের সাথে মিলিত। "এবং ধৈর্যশীলদের সুসংবাদ দাও — যারা বিপদ আঘাত করলে বলে: নিশ্চয়ই আমরা আল্লাহর এবং তাঁর কাছে ফিরব। এরাই তারা যাদের উপর তাদের রবের পক্ষ থেকে রহমত ও দয়া আছে" (২:১৫৫-১৫৭)। সবর নিষ্ক্রিয় পদত্যাগ নয়, সক্রিয় আধ্যাত্মিক সহ্য।',
        },
      },
      {
        heading: { en: 'Hardship as purification and elevation', bn: 'পবিত্রতা ও উন্নতি হিসেবে কষ্ট' },
        body: {
          en: 'The Prophet ﷺ taught that suffering can be a means of expiation and spiritual elevation. He is reported to have said that even the prick of a thorn can occasion forgiveness of sins for a patient believer, and that the most severely tested were the prophets, then those nearest to them in faith. This contextualises the apparent disparity of who suffers: righteous people enduring intense hardship is not evidence of God\'s absence but of their elevated rank. The hereafter provides the full accounting where every grief finds its compensation.',
          bn: 'নবী ﷺ শিখিয়েছিলেন কষ্ট প্রায়শ্চিত্ত ও আধ্যাত্মিক উন্নতির মাধ্যম হতে পারে। তিনি বলেছিলেন কাঁটার ফোঁড়াও ধৈর্যশীল বিশ্বাসীর পাপ ক্ষমার উপলক্ষ হতে পারে, এবং সবচেয়ে তীব্রভাবে পরীক্ষিত হয়েছিলেন নবীরা, তারপর তাদের নিকটতম। ন্যায়বান মানুষদের তীব্র কষ্ট আল্লাহর অনুপস্থিতির প্রমাণ নয়, তাদের উন্নত মর্যাদার প্রমাণ। পরকালে প্রতিটি দুঃখের ক্ষতিপূরণ হবে।',
        },
      },
      {
        heading: { en: 'The promise of ease with every hardship', bn: 'প্রতিটি কষ্টের সাথে সহজতার প্রতিশ্রুতি' },
        body: {
          en: 'Surah al-Insan (76:2) describes humanity as placed in trial from its very origins — difficulty is not an anomaly. But Islamic theology pairs this with robust hope: "With hardship comes ease — indeed, with hardship comes ease" (94:5-6). Classical scholars noted that in Arabic, the word for "hardship" appears with the definite article both times, referring to the same hardship, while "ease" appears in indefinite form twice — meaning one hardship carries at least two eases alongside it. Difficulty is not the last word.',
          bn: 'সূরা আল-ইনসান (৭৬:২) মানুষকে পরীক্ষায় স্থাপিত হিসেবে বর্ণনা করে — কষ্ট অসঙ্গতি নয়। কিন্তু ইসলামি ধর্মতত্ত্ব এটিকে শক্তিশালী আশার সাথে যুক্ত করে: "কষ্টের সাথে সহজতা আছে — নিশ্চয়ই কষ্টের সাথে সহজতা আছে" (৯৪:৫-৬)। ক্লাসিক্যাল পণ্ডিতরা লক্ষ্য করেছিলেন আরবিতে "কষ্ট" সুনির্দিষ্ট নিবন্ধসহ উভয়বার একই কষ্ট বোঝায়, যখন "সহজতা" দুবার অনির্দিষ্ট — মানে এক কষ্টের সাথে কমপক্ষে দুটি সহজতা আসে। কষ্ট শেষ কথা নয়।',
        },
      },
    ],
  },
  {
    id: 'preservation-of-quran',
    emoji: '📜',
    kind: 'article',
    title: { en: 'How the Quran Was Preserved: A Deeper Look', bn: 'কুরআন কীভাবে সংরক্ষিত হয়েছিল: গভীর দৃষ্টি' },
    summary: {
      en: 'The mechanics of hafiz transmission, the Uthmanic compilation, how oral and written traditions checked each other, and what comparative manuscript evidence shows.',
      bn: 'হাফিজ ধারার কার্যপদ্ধতি, উসমানি সংকলন, মৌখিক ও লিখিত ঐতিহ্য কীভাবে পরস্পর যাচাই করেছে এবং তুলনামূলক পাণ্ডুলিপির প্রমাণ কী দেখায়।',
    },
    points: [
      {
        heading: { en: 'The hafiz chain: controlled oral transmission', bn: 'হাফিজ ধারা: নিয়ন্ত্রিত মৌখিক সংক্রমণ' },
        body: {
          en: 'Memorisation of the Quran was systematised from the Prophet\'s ﷺ own lifetime. He received revelation, taught it to companions, and verified each person\'s recitation under his direct correction. After his death, the tradition of recitation with an unbroken authorisation chain (ijazah) developed rigorously: no student could recite the Quran in a formal teaching context without having memorised it under a certified teacher, who had in turn memorised it under one, ultimately tracing back to the Prophet ﷺ. This is not oral tradition in the folk sense — it is a precisely documented transmission chain.',
          bn: 'কুরআন মুখস্থকরণ নবী ﷺ এর জীবদ্দশায় পদ্ধতিগত করা হয়েছিল। তিনি ওহি পেতেন, সাহাবিদের শেখাতেন এবং প্রতিটি ব্যক্তির তিলাওয়াত তাঁর সরাসরি সংশোধনের অধীনে যাচাই করতেন। তাঁর মৃত্যুর পর অনুমোদনের ধারা সহ তিলাওয়াতের ঐতিহ্য (ইজাজাহ) কঠোরভাবে বিকশিত হয়: কোনো ছাত্র একজন প্রত্যয়িত শিক্ষকের অধীনে মুখস্থ না করে আনুষ্ঠানিকভাবে কুরআন তিলাওয়াত করতে পারত না, শেষ পর্যন্ত নবী ﷺ পর্যন্ত সনদযুক্ত। এটি লোক অর্থে মৌখিক ঐতিহ্য নয় — নির্ভুলভাবে নথিভুক্ত সংক্রমণ ধারা।',
        },
      },
      {
        heading: { en: 'The Uthmanic compilation: method and care', bn: 'উসমানি সংকলন: পদ্ধতি ও যত্ন' },
        body: {
          en: 'The first complete written compilation was ordered by Caliph Abu Bakr (r.a.) after the Battle of Yamama (633 CE), when many huffaz were martyred. Zayd ibn Thabit — the Prophet\'s ﷺ chief scribe — led the task with rigorous standards: he accepted no written piece without two independent witnesses who had heard it directly from the Prophet ﷺ, and cross-checked everything against the living memory of companions. The compiled manuscript was later held by Hafsa bint Umar. Caliph Uthman (r.a.) commissioned standardised copies from this manuscript and asked that differing private copies be retired to prevent regional variation — a process documented in multiple hadith chains with named participants.',
          bn: 'প্রথম সম্পূর্ণ লিখিত সংকলন খলিফা আবু বকর (রা.) কর্তৃক ইয়ামামার যুদ্ধের (৬৩৩ খ্রি.) পর আদেশ করা হয়েছিল যখন অনেক হাফিজ শহীদ হয়েছিলেন। যায়িদ ইবন সাবিত — নবী ﷺ এর প্রধান লেখক — কঠোর মান নিয়ে এই কাজ পরিচালনা করেছিলেন: নবী ﷺ থেকে সরাসরি শোনার দুজন স্বাধীন সাক্ষী ছাড়া কোনো লিখিত অংশ গ্রহণ করেননি। সংকলিত পাণ্ডুলিপি পরে হাফসা বিনত উমরের কাছে রাখা হয়েছিল। খলিফা উসমান (রা.) এই পাণ্ডুলিপি থেকে প্রমিত অনুলিপি তৈরি করিয়েছিলেন।',
        },
      },
      {
        heading: { en: 'Oral and written as mutual checks', bn: 'পরস্পর যাচাই হিসেবে মৌখিক ও লিখিত' },
        body: {
          en: 'The dual preservation system — oral hafiz tradition alongside written manuscripts — provided cross-verification unique in the ancient world. If a manuscript was corrupted or destroyed, the living hafiz tradition would expose the discrepancy. If a memoriser\'s recitation deviated, the written record and other hafiz would correct it. Each medium constrained the other. Today, millions of people have memorised the Quran, and their unanimous agreement across every dialect and nationality is itself a form of evidence for textual stability.',
          bn: 'দ্বৈত সংরক্ষণ ব্যবস্থা — মৌখিক হাফিজ ঐতিহ্য ও লিখিত পাণ্ডুলিপি — প্রাচীন বিশ্বে অনন্য পারস্পরিক যাচাই প্রদান করেছিল। যদি পাণ্ডুলিপি নষ্ট হত, জীবন্ত হাফিজ ঐতিহ্য অসঙ্গতি প্রকাশ করত। যদি কোনো হাফিজের তিলাওয়াত বিচ্যুত হত, লিখিত নথি ও অন্য হাফিজরা সংশোধন করত। আজ লক্ষ লক্ষ মানুষ কুরআন মুখস্থ করেছেন এবং প্রতিটি উপভাষা ও জাতীয়তা জুড়ে তাদের সর্বসম্মত চুক্তি নিজেই পাঠ্য স্থিতিশীলতার প্রমাণ।',
        },
      },
      {
        heading: { en: 'Manuscript evidence and comparative context', bn: 'পাণ্ডুলিপির প্রমাণ ও তুলনামূলক প্রেক্ষাপট' },
        body: {
          en: 'Early Quran manuscripts — including the Sana\'a manuscripts discovered in Yemen in 1972 and the Birmingham Quran manuscript carbon-dated to within the Prophet\'s lifetime — show a text that corresponds closely to the Quran recited today. This stands in contrast to the textual history of other major scriptures, where manuscript traditions show more variation over time and the original oral transmitters are less clearly documented. Muslims point to this combination of unbroken hafiz chain and early manuscript agreement as the fulfilment of the Quran\'s own promise: "Indeed, it is We who sent down the Reminder, and indeed, We will be its guardian" (15:9).',
          bn: 'প্রাচীন কুরআন পাণ্ডুলিপি — ১৯৭২ সালে ইয়েমেনে আবিষ্কৃত সানআ পাণ্ডুলিপি এবং নবীর জীবদ্দশায় কার্বন-ডেটিংকৃত বার্মিংহাম কুরআন পাণ্ডুলিপি সহ — আজ পঠিত কুরআনের সাথে ঘনিষ্ঠভাবে মিলে যায়। এটি অন্যান্য প্রধান ধর্মগ্রন্থের পাণ্ডুলিপির ইতিহাসের বিপরীতে দাঁড়ায়, যেখানে বেশি পরিবর্তন দেখা যায়। মুসলিমরা অবিচ্ছিন্ন হাফিজ ধারা ও প্রাচীন পাণ্ডুলিপির মিলকে কুরআনের নিজস্ব প্রতিশ্রুতির পূরণ হিসেবে নির্দেশ করেন: "নিশ্চয়ই আমিই এই উপদেশ অবতীর্ণ করেছি এবং আমিই এর সংরক্ষক" (১৫:৯)।',
        },
      },
    ],
  },
  {
    id: 'hadith-methodology',
    emoji: '🔍',
    kind: 'article',
    title: { en: 'Hadith: Methodology and Scholarship', bn: 'হাদিস: পদ্ধতি ও পাণ্ডিত্য' },
    summary: {
      en: 'What hadith are, how the isnad system works, the grading scale (sahih to mawdu\'), and the science of rijal criticism.',
      bn: 'হাদিস কী, ইসনাদ পদ্ধতি কীভাবে কাজ করে, গ্রেডিং স্কেল (সহিহ থেকে মওজু) এবং রিজাল সমালোচনার বিজ্ঞান।',
    },
    points: [
      {
        heading: { en: 'What is hadith?', bn: 'হাদিস কী?' },
        body: {
          en: 'Hadith (plural: ahadith) are recorded reports of the words, actions, approvals and characteristics of the Prophet Muhammad ﷺ. They form the second major source of Islamic guidance after the Quran and are essential for understanding how the Quran\'s principles were applied in practice. A hadith typically has two parts: the isnad (chain of narrators tracing the report back to its source) and the matn (the actual content of the report). The science of hadith developed to evaluate these two parts rigorously and independently.',
          bn: 'হাদিস (বহুবচন: আহাদিস) হলো নবী মুহাম্মাদ ﷺ এর বাণী, কার্যাবলি, অনুমোদন ও বৈশিষ্ট্যের নথিভুক্ত বিবরণ। এগুলো কুরআনের পরে ইসলামি হিদায়াতের দ্বিতীয় প্রধান উৎস এবং কুরআনের নীতিগুলো ব্যবহারিক জীবনে কীভাবে প্রয়োগ হয়েছিল তা বোঝার জন্য অপরিহার্য। একটি হাদিসের সাধারণত দুটি অংশ থাকে: ইসনাদ (বর্ণনাকারীদের ধারা যা রিপোর্টটিকে উৎসে ফিরিয়ে নিয়ে যায়) এবং মতন (রিপোর্টের প্রকৃত বিষয়বস্তু)।',
        },
      },
      {
        heading: { en: 'The isnad: a chain of named witnesses', bn: 'ইসনাদ: নামধারী সাক্ষীদের ধারা' },
        body: {
          en: 'Every classical hadith is transmitted through a named chain: "A told me that B told him that C said he heard the Prophet ﷺ say…" Each link in the chain is a historically identified individual whose biography was studied. Muslim scholars developed the science of \'ilm al-rijal (knowledge of narrators) — examining each narrator\'s memory, character, consistency, and whether they could have met the person they claimed to transmit from. This created one of the most extensive biographical databases in pre-modern scholarship, documenting tens of thousands of narrators.',
          bn: 'প্রতিটি ক্লাসিক্যাল হাদিস একটি নামধারী ধারার মাধ্যমে সংক্রমিত হয়: "আমাকে ক বলেছেন যে খ তাঁকে বলেছেন যে গ বলেছেন তিনি নবী ﷺ কে বলতে শুনেছেন..." ধারার প্রতিটি সংযোগ ঐতিহাসিকভাবে চিহ্নিত ব্যক্তি যার জীবনী অধ্যয়ন করা হয়েছিল। মুসলিম পণ্ডিতরা \'ইলমুল রিজাল (বর্ণনাকারীদের জ্ঞান) বিজ্ঞান বিকশিত করেছিলেন — প্রতিটি বর্ণনাকারীর স্মৃতি, চরিত্র, সামঞ্জস্য পরীক্ষা করে। এটি প্রাক-আধুনিক পাণ্ডিত্যে সবচেয়ে বিস্তৃত জীবনীগত ডেটাবেসগুলোর একটি তৈরি করেছিল।',
        },
      },
      {
        heading: { en: 'Grading: sahih, hasan, da\'if and mawdu\'', bn: 'গ্রেডিং: সহিহ, হাসান, দঈফ ও মওজু' },
        body: {
          en: 'After evaluating the isnad and cross-checking the matn, scholars assigned grades. Sahih (sound): every narrator in the chain is reliable and met the next, the chain is unbroken, and the content does not contradict stronger reports. Hasan (good): slightly weaker in chain but still acceptable. Da\'if (weak): one or more narrators are problematic, and the report requires corroboration before action. Mawdu\' (fabricated): the report is assessed as invented — sometimes this was done to settle political disputes or promote sectarian views, and identifying forgeries was a major task of hadith scholars. A hadith\'s grade is not concealed but documented openly for scholars to assess.',
          bn: 'ইসনাদ মূল্যায়ন ও মতন যাচাইয়ের পর পণ্ডিতরা গ্রেড নির্ধারণ করতেন। সহিহ (সুষ্ঠু): ধারার প্রতিটি বর্ণনাকারী নির্ভরযোগ্য, ধারা অবিচ্ছিন্ন, এবং বিষয়বস্তু শক্তিশালী রিপোর্টের বিরুদ্ধে নয়। হাসান (ভালো): ধারায় সামান্য দুর্বল কিন্তু গ্রহণযোগ্য। দঈফ (দুর্বল): এক বা একাধিক বর্ণনাকারী সমস্যাযুক্ত; সমর্থন প্রয়োজন। মওজু (বানোয়াট): আবিষ্কৃত বলে মূল্যায়িত — কখনো রাজনৈতিক বিরোধ মীমাংসা বা সাম্প্রদায়িক দৃষ্টিভঙ্গি প্রচারের জন্য তৈরি। জালিয়াতি চিহ্নিত করা হাদিস পণ্ডিতদের প্রধান কাজ ছিল।',
        },
      },
      {
        heading: { en: 'The great hadith scholars', bn: 'মহান হাদিস পণ্ডিতরা' },
        body: {
          en: 'The primary hadith collections recognised by Sunni scholarship were compiled in the 9th century. Imam al-Bukhari (d. 870 CE) is reported to have examined over 600,000 narrations and accepted roughly 7,275 as meeting his strict sahih criteria — including his habit of performing ablution and praying before assessing each narrator. Imam Muslim (d. 875 CE) produced a complementary collection. These two — together known as the Sahihayn — along with four other major collections (the Sunan of Abu Dawud, al-Tirmidhi, al-Nasa\'i and Ibn Majah) form the core reference corpus. The rigour these scholars applied represents a systematic approach to historical criticism that has no direct parallel in ancient scholarship.',
          bn: 'সুন্নি পাণ্ডিত্যে স্বীকৃত প্রাথমিক হাদিস সংকলনগুলো ৯ম শতাব্দীতে সংকলিত হয়েছিল। ইমাম আল-বুখারি (৮৭০ খ্রি.) ৬ লক্ষেরও বেশি বর্ণনা পরীক্ষা করেছেন বলে জানা যায় এবং প্রায় ৭,২৭৫টি তাঁর কঠোর সহিহ মানদণ্ড পূরণ করেছে বলে গ্রহণ করেছেন। ইমাম মুসলিম (৮৭৫ খ্রি.) একটি পরিপূরক সংকলন তৈরি করেছিলেন। এই দুটি — সহীহাইন নামে পরিচিত — আবু দাউদ, আল-তিরমিযি, আল-নাসাই ও ইবনে মাজার সুনানসহ মূল রেফারেন্স কর্পাস গঠন করে।',
        },
      },
    ],
  },
  {
    id: 'pillars-of-islam',
    emoji: '🕌',
    kind: 'article',
    title: { en: 'The Five Pillars of Islam', bn: 'ইসলামের পাঁচ স্তম্ভ' },
    summary: {
      en: 'The five acts of worship that form the practical framework of a Muslim’s life: testimony, prayer, charity, fasting and pilgrimage.',
      bn: 'পাঁচটি ইবাদত যা একজন মুসলিমের জীবনের ব্যবহারিক কাঠামো গঠন করে: সাক্ষ্য, নামাজ, দান, রোজা ও হজ।',
    },
    points: [
      {
        heading: { en: 'A structure built on five', bn: 'পাঁচের উপর নির্মিত কাঠামো' },
        body: {
          en: 'In a well-known hadith reported by al-Bukhari and Muslim, the Prophet ﷺ said: "Islam is built upon five: to testify that there is no god but God and that Muhammad is the Messenger of God, to establish prayer, to give zakat, to fast Ramadan, and to make pilgrimage to the House for whoever is able." These pillars are not the whole of the religion, but its supporting framework — acts that translate inner faith into a rhythm of daily and yearly worship.',
          bn: 'আল-বুখারি ও মুসলিমে বর্ণিত একটি প্রসিদ্ধ হাদিসে নবী ﷺ বলেছেন: "ইসলাম পাঁচটি বিষয়ের উপর প্রতিষ্ঠিত: সাক্ষ্য দেওয়া যে আল্লাহ ছাড়া কোনো উপাস্য নেই ও মুহাম্মাদ আল্লাহর রাসুল, নামাজ কায়েম করা, যাকাত দেওয়া, রমজানের রোজা রাখা এবং সামর্থ্যবানের জন্য বাইতুল্লাহর হজ করা।" এই স্তম্ভগুলো গোটা দ্বীন নয়, বরং এর ধারক কাঠামো — এমন আমল যা অন্তরের ঈমানকে প্রতিদিনের ও বার্ষিক ইবাদতের ছন্দে রূপ দেয়।',
        },
      },
      {
        heading: { en: 'Testimony and prayer', bn: 'সাক্ষ্য ও নামাজ' },
        body: {
          en: 'The first pillar is the shahada — sincerely bearing witness that God alone deserves worship and that Muhammad ﷺ is His messenger. It is the doorway to Islam and the meaning behind every other act. The second is salah, the five daily prayers, which anchor the day around remembrance of God. The Quran describes its purpose: "Indeed, prayer prohibits immorality and wrongdoing, and the remembrance of God is greater" (29:45). Prayer is a direct, repeated connection between the worshipper and the Creator.',
          bn: 'প্রথম স্তম্ভ শাহাদাহ — আন্তরিকভাবে সাক্ষ্য দেওয়া যে কেবল আল্লাহই ইবাদতের যোগ্য এবং মুহাম্মাদ ﷺ তাঁর রাসুল। এটি ইসলামের প্রবেশদ্বার এবং অন্য প্রতিটি আমলের অন্তর্নিহিত অর্থ। দ্বিতীয়টি সালাত, পাঁচ ওয়াক্ত নামাজ, যা দিনকে আল্লাহর স্মরণের চারপাশে গেঁথে রাখে। কুরআন এর উদ্দেশ্য বর্ণনা করে: "নিশ্চয়ই নামাজ অশ্লীলতা ও মন্দ কাজ থেকে বিরত রাখে, আর আল্লাহর স্মরণ সর্বশ্রেষ্ঠ" (২৯:৪৫)। নামাজ বান্দা ও স্রষ্টার মধ্যে সরাসরি, পুনরাবৃত্ত সংযোগ।',
        },
      },
      {
        heading: { en: 'Charity, fasting and pilgrimage', bn: 'দান, রোজা ও হজ' },
        body: {
          en: 'Zakat is an obligatory annual charity — a fixed small portion of accumulated wealth given to the poor and other eligible recipients, purifying wealth and binding the community: "Take from their wealth a charity by which you purify them" (9:103). Sawm, fasting the month of Ramadan from dawn to sunset, trains self-restraint and God-consciousness (2:183). Hajj, the pilgrimage to Mecca, is obligatory once in a lifetime for those with the physical and financial means (3:97). Together the pillars engage the tongue, body, wealth, appetite and a lifetime’s journey.',
          bn: 'যাকাত একটি বাধ্যতামূলক বার্ষিক দান — সঞ্চিত সম্পদের একটি নির্দিষ্ট ক্ষুদ্র অংশ দরিদ্র ও অন্যান্য যোগ্য প্রাপকদের দেওয়া, যা সম্পদকে পবিত্র করে ও সমাজকে বাঁধে: "তাদের সম্পদ থেকে দান গ্রহণ করো যার দ্বারা তুমি তাদের পবিত্র করবে" (৯:১০৩)। সাওম, রমজান মাসে ভোর থেকে সূর্যাস্ত পর্যন্ত রোজা, আত্মসংযম ও আল্লাহভীতি শেখায় (২:১৮৩)। হজ, মক্কার তীর্থযাত্রা, সামর্থ্যবানদের জন্য জীবনে একবার ফরজ (৩:৯৭)। একত্রে স্তম্ভগুলো জিহ্বা, দেহ, সম্পদ, ক্ষুধা ও জীবনের যাত্রাকে যুক্ত করে।',
        },
      },
    ],
  },
  {
    id: 'articles-of-faith',
    emoji: '🕋',
    kind: 'article',
    title: { en: 'The Six Articles of Faith (Iman)', bn: 'ঈমানের ছয় স্তম্ভ' },
    summary: {
      en: 'The six beliefs at the heart of a Muslim’s creed: God, His angels, His books, His messengers, the Last Day, and divine decree.',
      bn: 'একজন মুসলিমের আকিদার কেন্দ্রে থাকা ছয়টি বিশ্বাস: আল্লাহ, তাঁর ফেরেশতা, তাঁর কিতাব, তাঁর রাসুলগণ, শেষ দিবস ও তাকদির।',
    },
    points: [
      {
        heading: { en: 'What iman includes', bn: 'ঈমান যা যা অন্তর্ভুক্ত করে' },
        body: {
          en: 'While the pillars of Islam describe outward practice, the articles of iman describe inner belief. The Quran lists them together: "The Messenger believes in what was revealed to him from his Lord, and so do the believers. Each one believes in God, His angels, His books and His messengers" (2:285); and: "Believe in God, His messengers, His books, His angels and the Last Day" (4:136). To these five, the prophetic teaching adds belief in the divine decree (qadar), completing the six.',
          bn: 'ইসলামের স্তম্ভগুলো যেখানে বাহ্যিক আমল বর্ণনা করে, ঈমানের স্তম্ভগুলো সেখানে অন্তরের বিশ্বাস বর্ণনা করে। কুরআন এগুলো একসাথে উল্লেখ করে: "রাসুল তাঁর রবের পক্ষ থেকে অবতীর্ণ বিষয়ে বিশ্বাস করেন, এবং মুমিনরাও। প্রত্যেকে বিশ্বাস করে আল্লাহ, তাঁর ফেরেশতা, তাঁর কিতাব ও তাঁর রাসুলগণে" (২:২৮৫); এবং: "আল্লাহ, তাঁর রাসুলগণ, তাঁর কিতাবসমূহ, তাঁর ফেরেশতা ও শেষ দিবসে বিশ্বাস করো" (৪:১৩৬)। এই পাঁচটির সাথে নবীর শিক্ষা তাকদিরে বিশ্বাস যোগ করে ছয় পূর্ণ করে।',
        },
      },
      {
        heading: { en: 'One unified worldview', bn: 'একটি সংহত বিশ্বদৃষ্টি' },
        body: {
          en: 'The six articles fit together into a coherent picture. Belief in one God (tawhid) is the foundation; the angels are His unseen servants; the books are His guidance revealed across history (the scrolls of Abraham, the Torah, Psalms, Gospel and finally the Quran); the messengers are the humans He chose to deliver that guidance; the Last Day is the accounting where justice is completed; and qadar is the recognition that all of this unfolds within God’s knowledge and will. Each belief supports and explains the others.',
          bn: 'ছয়টি স্তম্ভ একত্রে একটি সুসংগত চিত্র গঠন করে। এক আল্লাহে বিশ্বাস (তাওহিদ) ভিত্তি; ফেরেশতারা তাঁর অদৃশ্য দাস; কিতাবসমূহ ইতিহাসজুড়ে অবতীর্ণ তাঁর হিদায়াত (ইবরাহিমের সহিফা, তাওরাত, যাবুর, ইঞ্জিল ও সবশেষে কুরআন); রাসুলগণ সেই হিদায়াত পৌঁছাতে তাঁর মনোনীত মানুষ; শেষ দিবস সেই হিসাব যেখানে ন্যায় পূর্ণ হয়; এবং তাকদির এই স্বীকৃতি যে এ সবকিছু আল্লাহর জ্ঞান ও ইচ্ছার মধ্যেই ঘটে। প্রতিটি বিশ্বাস অন্যগুলোকে সমর্থন ও ব্যাখ্যা করে।',
        },
      },
      {
        heading: { en: 'Belief that shapes character', bn: 'যে বিশ্বাস চরিত্র গড়ে' },
        body: {
          en: 'These are not abstract propositions but convictions meant to shape how a person lives. Belief in the angels who record deeds encourages honesty in private; belief in the messengers gives a moral pattern to follow; belief in the Last Day frames every choice within a longer horizon of accountability and hope; and belief in qadar brings calm trust in times of both blessing and hardship. In the famous hadith of Gabriel, the Prophet ﷺ defined faith precisely by these articles — belief that then flowers into worship and good character.',
          bn: 'এগুলো বিমূর্ত ধারণা নয়, বরং এমন প্রত্যয় যা মানুষের জীবনযাপনকে গড়ে তোলার কথা। আমল লিপিবদ্ধকারী ফেরেশতায় বিশ্বাস নির্জনে সততায় উৎসাহ দেয়; রাসুলগণে বিশ্বাস অনুসরণের নৈতিক আদর্শ দেয়; শেষ দিবসে বিশ্বাস প্রতিটি সিদ্ধান্তকে জবাবদিহি ও আশার দীর্ঘতর দিগন্তে স্থাপন করে; আর তাকদিরে বিশ্বাস নেয়ামত ও কষ্ট উভয় সময়ে প্রশান্ত ভরসা আনে। জিবরিলের প্রসিদ্ধ হাদিসে নবী ﷺ ঠিক এই স্তম্ভগুলো দিয়েই ঈমানের সংজ্ঞা দিয়েছেন — যে বিশ্বাস পরে ইবাদত ও সৎ চরিত্রে প্রস্ফুটিত হয়।',
        },
      },
    ],
  },
  {
    id: 'jesus-in-islam',
    emoji: '🕊️',
    kind: 'article',
    title: { en: 'Jesus (Isa) in Islam', bn: 'ইসলামে ঈসা (যিশু)' },
    summary: {
      en: 'The honoured place of Jesus as a mighty prophet and Messiah in Islam — what Muslims affirm about him, and where the Islamic view differs.',
      bn: 'ইসলামে একজন মহান নবী ও মসিহ হিসেবে ঈসার সম্মানিত অবস্থান — মুসলিমরা তাঁর সম্পর্কে যা নিশ্চিত করেন এবং যেখানে ইসলামি দৃষ্টিভঙ্গি ভিন্ন।',
    },
    points: [
      {
        heading: { en: 'A deeply honoured prophet', bn: 'গভীরভাবে সম্মানিত এক নবী' },
        body: {
          en: 'Jesus — Isa ibn Maryam — holds a place of great honour in Islam. He is named the Messiah (al-Masih), a "word" from God and a spirit from Him, and one of the mightiest of the messengers. The Quran affirms his miraculous birth to the Virgin Mary without a father: "the angels said: O Mary, God gives you good tidings of a word from Him, whose name will be the Messiah, Jesus, son of Mary, distinguished in this world and the Hereafter" (3:45). Mary herself is honoured as the greatest of women, with an entire chapter of the Quran named after her.',
          bn: 'ঈসা — ঈসা ইবন মারইয়াম — ইসলামে অত্যন্ত সম্মানের অধিকারী। তাঁকে মসিহ (আল-মাসিহ), আল্লাহর পক্ষ থেকে একটি "কালিমা" ও তাঁর কাছ থেকে একটি রুহ এবং শ্রেষ্ঠ রাসুলদের একজন বলা হয়েছে। কুরআন পিতা ছাড়া কুমারী মারইয়ামের গর্ভে তাঁর অলৌকিক জন্ম নিশ্চিত করে: "ফেরেশতারা বলল: হে মারইয়াম, আল্লাহ তোমাকে তাঁর পক্ষ থেকে একটি কালিমার সুসংবাদ দিচ্ছেন, যাঁর নাম হবে মসিহ, মারইয়ামের পুত্র ঈসা, দুনিয়া ও আখিরাতে সম্মানিত" (৩:৪৫)। মারইয়াম নিজে নারীদের মধ্যে শ্রেষ্ঠ হিসেবে সম্মানিত, কুরআনের একটি সম্পূর্ণ সুরা তাঁর নামে।',
        },
      },
      {
        heading: { en: 'A servant and messenger, not divine', bn: 'দাস ও রাসুল, উপাস্য নন' },
        body: {
          en: 'Where the Islamic view differs from Christian doctrine is on the nature of Jesus. Islam holds that he was a human prophet — a servant of God raised to deliver God’s message — not God, nor the son of God. The Quran presents his own words as an infant: "Indeed, I am the servant of God. He has given me the Scripture and made me a prophet" (19:30). And it draws a direct comparison to Adam, who had no parents at all: "The example of Jesus before God is like that of Adam. He created him from dust, then said to him, Be, and he was" (3:59). A miraculous birth, Islam teaches, points to God’s power, not to divinity in the created being.',
          bn: 'যেখানে ইসলামি দৃষ্টিভঙ্গি খ্রিস্টীয় মতবাদ থেকে ভিন্ন তা হলো ঈসার প্রকৃতি নিয়ে। ইসলামের অভিমত, তিনি ছিলেন একজন মানব নবী — আল্লাহর বার্তা পৌঁছাতে প্রেরিত তাঁর এক দাস — আল্লাহ নন, আল্লাহর পুত্রও নন। কুরআন শিশু অবস্থায় তাঁর নিজের কথা উপস্থাপন করে: "নিশ্চয়ই আমি আল্লাহর দাস। তিনি আমাকে কিতাব দিয়েছেন ও নবী করেছেন" (১৯:৩০)। আর এটি আদমের সাথে সরাসরি তুলনা টানে, যাঁর কোনো পিতামাতাই ছিল না: "আল্লাহর কাছে ঈসার দৃষ্টান্ত আদমের মতো। তিনি তাঁকে মাটি থেকে সৃষ্টি করলেন, তারপর বললেন, হও, আর সে হয়ে গেল" (৩:৫৯)। অলৌকিক জন্ম আল্লাহর ক্ষমতার দিকে ইশারা করে, সৃষ্ট সত্তার ঐশত্বের দিকে নয়।',
        },
      },
      {
        heading: { en: 'Common ground and continuity', bn: 'অভিন্ন ভিত্তি ও ধারাবাহিকতা' },
        body: {
          en: 'For Muslims, Jesus is not a rival figure but a beloved brother in the single chain of prophets carrying one message: worship God alone. He performed miracles by God’s permission, was given a scripture (the Injil/Gospel), and called his people to righteousness. Islam holds that he was not crucified but raised by God, and Islamic tradition speaks of his return before the end of time. To believe in Jesus — truly and rightly — is in fact a requirement of being Muslim. This shared reverence is often a meaningful bridge in conversation between Muslims and Christians.',
          bn: 'মুসলিমদের কাছে ঈসা কোনো প্রতিদ্বন্দ্বী নন, বরং এক বার্তা বহনকারী নবীদের অভিন্ন ধারায় এক প্রিয় ভাই: কেবল আল্লাহর ইবাদত করো। তিনি আল্লাহর অনুমতিতে মুজিজা দেখিয়েছেন, তাঁকে একটি কিতাব (ইঞ্জিল) দেওয়া হয়েছিল, এবং তিনি তাঁর জাতিকে সৎকর্মের দিকে ডেকেছিলেন। ইসলামের অভিমত, তাঁকে ক্রুশবিদ্ধ করা হয়নি বরং আল্লাহ তাঁকে তুলে নিয়েছেন, এবং ইসলামি ঐতিহ্য সময়ের শেষে তাঁর প্রত্যাবর্তনের কথা বলে। ঈসায় সঠিকভাবে বিশ্বাস করা প্রকৃতপক্ষে মুসলিম হওয়ার একটি শর্ত। এই অভিন্ন শ্রদ্ধা প্রায়ই মুসলিম ও খ্রিস্টানদের সংলাপে অর্থবহ সেতু হয়।',
        },
      },
    ],
  },
  {
    id: 'angels-in-islam',
    emoji: '🕊',
    kind: 'article',
    title: { en: 'Belief in the Angels', bn: 'ফেরেশতায় বিশ্বাস' },
    summary: {
      en: 'Who the angels are in Islam, what they do, and why belief in the unseen is part of a coherent worldview.',
      bn: 'ইসলামে ফেরেশতারা কারা, তারা কী করে এবং কেন অদৃশ্যে বিশ্বাস একটি সুসংগত বিশ্বদৃষ্টির অংশ।',
    },
    points: [
      {
        heading: { en: 'Beings of light and pure obedience', bn: 'নূরের সৃষ্টি ও বিশুদ্ধ আনুগত্য' },
        body: {
          en: 'Angels (mala’ika) are a class of beings created by God from light, existing in the unseen realm. Unlike humans, they have no free will to disobey; they act only as God commands: "They do not disobey God in what He commands them, and they do what they are commanded" (66:6). They are not gods, nor God’s children, nor objects of worship — they are honoured servants. The Quran describes them with varying forms and powers: "Praise be to God, Originator of the heavens and earth, who made the angels messengers with wings — two, three or four" (35:1).',
          bn: 'ফেরেশতারা (মালাইকা) আল্লাহর নূর থেকে সৃষ্ট এক শ্রেণির সত্তা, অদৃশ্য জগতে বিদ্যমান। মানুষের বিপরীতে তাদের অবাধ্য হওয়ার স্বাধীন ইচ্ছা নেই; তারা কেবল আল্লাহর আদেশমতো কাজ করে: "আল্লাহ তাদের যা আদেশ করেন তারা তাতে অবাধ্য হয় না, এবং যা আদিষ্ট হয় তা-ই করে" (৬৬:৬)। তারা উপাস্য নয়, আল্লাহর সন্তান নয়, ইবাদতের বস্তুও নয় — তারা সম্মানিত দাস। কুরআন তাদের বিভিন্ন রূপ ও ক্ষমতায় বর্ণনা করে: "সমস্ত প্রশংসা আল্লাহর, আসমান ও জমিনের স্রষ্টা, যিনি ফেরেশতাদের বার্তাবাহক করেছেন দুই, তিন ও চার পাখাবিশিষ্ট" (৩৫:১)।',
        },
      },
      {
        heading: { en: 'Their roles in creation', bn: 'সৃষ্টিতে তাদের ভূমিকা' },
        body: {
          en: 'The Quran and authentic tradition describe angels carrying out many appointed tasks: Gabriel (Jibril) conveyed revelation to the prophets; angels record every human deed; some are entrusted with natural phenomena by God’s command; others will be present at death and at the resurrection. Belief in the angels reminds a person that the seen world is not the whole of reality, and that our lives unfold within a larger order of purpose and accountability that we do not fully perceive.',
          bn: 'কুরআন ও বিশুদ্ধ ঐতিহ্য বর্ণনা করে ফেরেশতারা বহু নির্ধারিত কাজ সম্পাদন করে: জিবরিল নবীদের কাছে ওহি পৌঁছাতেন; ফেরেশতারা মানুষের প্রতিটি আমল লিপিবদ্ধ করে; কেউ কেউ আল্লাহর আদেশে প্রাকৃতিক ঘটনার দায়িত্বপ্রাপ্ত; অন্যরা মৃত্যুকালে ও পুনরুত্থানে উপস্থিত থাকবে। ফেরেশতায় বিশ্বাস মানুষকে স্মরণ করায় যে দৃশ্যমান জগতই বাস্তবতার সবটুকু নয়, এবং আমাদের জীবন এমন এক বৃহত্তর উদ্দেশ্য ও জবাবদিহির শৃঙ্খলার মধ্যে ঘটে যা আমরা পুরোপুরি অনুভব করি না।',
        },
      },
      {
        heading: { en: 'Believing in the unseen', bn: 'অদৃশ্যে বিশ্বাস' },
        body: {
          en: 'A modern reader may ask why one should accept beings that cannot be observed. Islam’s answer is that belief in the angels is part of trusting a truthful source — the revelation whose overall case one has reason to accept — rather than a leap in the dark. It is also reasonable in principle: a Creator of the vast unseen dimensions of the universe may well have created orders of life beyond human sight. What Islam asks is intellectual humility about a reality larger than the visible, not blind credulity.',
          bn: 'একজন আধুনিক পাঠক প্রশ্ন করতে পারেন, যা পর্যবেক্ষণযোগ্য নয় তা কেন মেনে নেব। ইসলামের উত্তর: ফেরেশতায় বিশ্বাস অন্ধকারে ঝাঁপ নয়, বরং এক সত্যনিষ্ঠ উৎসে আস্থার অংশ — সেই ওহি যার সামগ্রিক দাবি গ্রহণের যুক্তিসংগত কারণ রয়েছে। এটি নীতিগতভাবেও যুক্তিসংগত: যিনি বিশ্বজগতের বিশাল অদৃশ্য মাত্রার স্রষ্টা, তিনি মানুষের দৃষ্টির বাইরে প্রাণের শ্রেণিও সৃষ্টি করতে পারেন। ইসলাম দৃশ্যমানের চেয়ে বৃহত্তর বাস্তবতা সম্পর্কে বৌদ্ধিক বিনয় চায়, অন্ধ বিশ্বাস নয়।',
        },
      },
    ],
  },
  {
    id: 'meaning-of-worship',
    emoji: '🤲',
    kind: 'article',
    title: { en: 'What Worship (Ibadah) Really Means', bn: 'ইবাদত আসলে কী' },
    summary: {
      en: 'Why Islam frames the purpose of life as worship — and how that word means far more than ritual alone.',
      bn: 'কেন ইসলাম জীবনের উদ্দেশ্যকে ইবাদত হিসেবে দেখে — এবং কীভাবে এই শব্দ কেবল আনুষ্ঠানিকতার চেয়ে অনেক বেশি বোঝায়।',
    },
    points: [
      {
        heading: { en: 'The stated purpose of creation', bn: 'সৃষ্টির ঘোষিত উদ্দেশ্য' },
        body: {
          en: 'The Quran states the purpose of human existence directly: "I did not create the jinn and mankind except to worship Me" (51:56). At first hearing this can sound narrow — as if life were only rituals. But the Arabic word ‘ibadah is far wider than ceremony. Its root carries the sense of loving devotion, humble service and willing submission to the One who deserves it. To be created "for worship" is to be created for a relationship of grateful, purposeful living oriented toward God.',
          bn: 'কুরআন মানব অস্তিত্বের উদ্দেশ্য সরাসরি বলে: "আমি জিন ও মানুষকে কেবল আমার ইবাদতের জন্যই সৃষ্টি করেছি" (৫১:৫৬)। প্রথম শোনায় এটি সংকীর্ণ মনে হতে পারে — যেন জীবন কেবল আনুষ্ঠানিকতা। কিন্তু আরবি শব্দ ইবাদত অনুষ্ঠানের চেয়ে অনেক ব্যাপক। এর মূলে রয়েছে প্রেমময় ভক্তি, বিনম্র সেবা ও যিনি যোগ্য তাঁর কাছে স্বেচ্ছা আত্মসমর্পণ। "ইবাদতের জন্য" সৃষ্ট হওয়া মানে আল্লাহমুখী কৃতজ্ঞ, উদ্দেশ্যপূর্ণ জীবনযাপনের সম্পর্কের জন্য সৃষ্ট হওয়া।',
        },
      },
      {
        heading: { en: 'All of life as worship', bn: 'গোটা জীবনই ইবাদত' },
        body: {
          en: 'In Islam, formal acts like prayer and fasting are the core of worship, but they are not its limit. Any permissible act done sincerely for God’s sake becomes worship: honest work, kindness to parents, a smile, removing harm from a road, seeking knowledge, feeding one’s family. The Prophet ﷺ taught that even the morsel of food a person places in their spouse’s mouth is rewarded. The believer is invited to make the whole of ordinary life meaningful by orienting its intention toward God: "Say, my prayer, my rites, my living and my dying are for God, Lord of the worlds" (6:162).',
          bn: 'ইসলামে নামাজ ও রোজার মতো আনুষ্ঠানিক আমল ইবাদতের মূল, কিন্তু এর সীমা নয়। আল্লাহর সন্তুষ্টির জন্য আন্তরিকভাবে করা যেকোনো বৈধ কাজই ইবাদত হয়ে ওঠে: সৎ কর্ম, পিতামাতার প্রতি সদয়তা, এক টুকরো হাসি, রাস্তা থেকে কষ্টদায়ক বস্তু সরানো, জ্ঞান অন্বেষণ, পরিবারকে খাওয়ানো। নবী ﷺ শিখিয়েছেন এমনকি স্ত্রীর মুখে তুলে দেওয়া খাবারের লোকমারও প্রতিদান আছে। মুমিনকে আমন্ত্রণ জানানো হয় সাধারণ জীবনের নিয়তকে আল্লাহমুখী করে গোটা জীবনকে অর্থবহ করতে: "বলো, আমার নামাজ, আমার কুরবানি, আমার জীবন ও আমার মৃত্যু জগতসমূহের রব আল্লাহরই জন্য" (৬:১৬২)।',
        },
      },
      {
        heading: { en: 'Freedom in serving God alone', bn: 'কেবল আল্লাহর দাসত্বে স্বাধীনতা' },
        body: {
          en: 'Islam presents worship of God not as bondage but as liberation. Every human being serves something — wealth, status, desire, the opinions of others, an ideology. Islam teaches that to consciously serve the Creator alone is to be freed from servitude to all these lesser masters, each of which is unstable and ultimately unsatisfying. In the daily prayer the believer says, "You alone we worship, and You alone we ask for help" (1:5) — a declaration that anchors dignity and freedom in devotion to the One rather than the many.',
          bn: 'ইসলাম আল্লাহর ইবাদতকে দাসত্ব নয়, বরং মুক্তি হিসেবে উপস্থাপন করে। প্রত্যেক মানুষ কিছু-না-কিছুর সেবা করে — সম্পদ, মর্যাদা, প্রবৃত্তি, অন্যের মতামত, কোনো মতাদর্শ। ইসলাম শেখায়, সচেতনভাবে কেবল স্রষ্টার দাসত্ব করা মানে এই সব ছোট প্রভুর দাসত্ব থেকে মুক্ত হওয়া, যাদের প্রত্যেকটি অস্থির ও পরিণামে অতৃপ্তিকর। দৈনিক নামাজে মুমিন বলে, "কেবল তোমারই ইবাদত করি ও কেবল তোমারই কাছে সাহায্য চাই" (১:৫) — এমন এক ঘোষণা যা মর্যাদা ও স্বাধীনতাকে বহুর নয়, একের প্রতি ভক্তিতে গেঁথে দেয়।',
        },
      },
    ],
  },
  {
    id: 'sin-and-repentance',
    emoji: '🪷',
    kind: 'article',
    title: { en: 'Sin, Mercy and Repentance (Tawbah)', bn: 'পাপ, রহমত ও তওবা' },
    summary: {
      en: 'How Islam understands sin, why there is no despair, and the direct path of returning to God without any intermediary.',
      bn: 'ইসলাম কীভাবে পাপকে বোঝে, কেন কোনো হতাশা নেই, এবং কোনো মধ্যস্থতাকারী ছাড়াই আল্লাহর দিকে ফেরার সরাসরি পথ।',
    },
    points: [
      {
        heading: { en: 'No inherited sin', bn: 'উত্তরাধিকারসূত্রে পাপ নেই' },
        body: {
          en: 'Islam teaches that every person is born in a state of natural purity (fitrah), not carrying the guilt of anyone else’s sin. Adam and Eve’s lapse in the garden was their own, they repented, and God forgave them; it is not inherited by their descendants. "No bearer of burdens shall bear the burden of another" (the Quran repeats this principle in several places). Sin, in Islam, is a real wrong that harms the soul, but it is something a person does — not a condition they are born condemned in. This shapes a hopeful view of the human being.',
          bn: 'ইসলাম শেখায় প্রত্যেক মানুষ স্বাভাবিক পবিত্রতার (ফিতরাহ) অবস্থায় জন্মে, অন্য কারও পাপের বোঝা বহন করে না। জান্নাতে আদম ও হাওয়ার ভুল ছিল তাঁদেরই, তাঁরা তওবা করেছিলেন, আর আল্লাহ তাঁদের ক্ষমা করেছিলেন; তা বংশধরদের উত্তরাধিকারসূত্রে বর্তায় না। "কোনো বোঝা বহনকারী অন্যের বোঝা বহন করবে না" (কুরআন এই নীতি একাধিক স্থানে পুনরাবৃত্তি করে)। ইসলামে পাপ এক বাস্তব অন্যায় যা আত্মার ক্ষতি করে, কিন্তু তা মানুষের কৃত কাজ — জন্মগত অভিশপ্ত অবস্থা নয়। এটি মানুষ সম্পর্কে এক আশাব্যঞ্জক দৃষ্টি গড়ে।',
        },
      },
      {
        heading: { en: 'The door of mercy never closes', bn: 'রহমতের দরজা কখনো বন্ধ হয় না' },
        body: {
          en: 'The Quran’s message to the sinner is overwhelmingly one of hope. "Say: O My servants who have transgressed against themselves, do not despair of the mercy of God. Indeed, God forgives all sins. He is the Forgiving, the Merciful" (39:53). God is described as loving those who turn back to Him: "Indeed, God loves those who are constantly repentant" (2:222). Sincere repentance — tawbah — has recognised conditions: to stop the wrong, to feel genuine regret, to resolve not to return, and, where a person was wronged, to make it right. God’s mercy, the Quran insists, outweighs His wrath.',
          bn: 'পাপীর প্রতি কুরআনের বার্তা অপরিসীমভাবে আশার। "বলো: হে আমার বান্দারা, যারা নিজেদের উপর সীমালঙ্ঘন করেছ, আল্লাহর রহমত থেকে নিরাশ হয়ো না। নিশ্চয়ই আল্লাহ সকল পাপ ক্ষমা করেন। তিনি ক্ষমাশীল, পরম দয়ালু" (৩৯:৫৩)। আল্লাহকে তাঁর দিকে প্রত্যাবর্তনকারীদের ভালোবাসা হিসেবে বর্ণনা করা হয়: "নিশ্চয়ই আল্লাহ অধিক তওবাকারীদের ভালোবাসেন" (২:২২২)। আন্তরিক তওবার স্বীকৃত শর্ত আছে: অন্যায় বন্ধ করা, প্রকৃত অনুশোচনা, ফিরে না যাওয়ার সংকল্প, এবং কারও প্রতি অন্যায় হলে তা সংশোধন করা। কুরআন জোর দেয়, আল্লাহর রহমত তাঁর ক্রোধকে ছাপিয়ে যায়।',
        },
      },
      {
        heading: { en: 'A direct return, no intermediary', bn: 'সরাসরি প্রত্যাবর্তন, কোনো মধ্যস্থতা নয়' },
        body: {
          en: 'In Islam a person repents to God directly. There is no priest to confess to, no ritual of absolution required, and no need for anyone to bear the punishment on one’s behalf. At any moment — in prayer, in private, in a whisper of the heart — a person can turn back to God and ask forgiveness. "And whoever does a wrong or wrongs himself but then seeks forgiveness of God will find God Forgiving and Merciful" (4:110). This directness reflects tawhid itself: the same One who is worshipped without intermediary is also the One who forgives without intermediary.',
          bn: 'ইসলামে মানুষ সরাসরি আল্লাহর কাছে তওবা করে। স্বীকারোক্তির জন্য কোনো পুরোহিত নেই, ক্ষমার কোনো আনুষ্ঠানিকতা প্রয়োজন নেই, এবং কারও পক্ষে শাস্তি বহনের প্রয়োজন নেই। যেকোনো মুহূর্তে — নামাজে, নির্জনে, অন্তরের ফিসফিসানিতে — মানুষ আল্লাহর দিকে ফিরে ক্ষমা চাইতে পারে। "আর যে মন্দ কাজ করে বা নিজের উপর জুলুম করে, অতঃপর আল্লাহর কাছে ক্ষমা চায়, সে আল্লাহকে ক্ষমাশীল ও দয়ালু পাবে" (৪:১১০)। এই সরাসরি সম্পর্ক তাওহিদেরই প্রতিফলন: যিনি মধ্যস্থতা ছাড়াই উপাসিত, তিনিই মধ্যস্থতা ছাড়াই ক্ষমা করেন।',
        },
      },
    ],
  },
  {
    id: 'salah-prayer',
    emoji: '🧎',
    kind: 'article',
    title: { en: 'Prayer (Salah) in Islam', bn: 'ইসলামে নামাজ (সালাত)' },
    summary: {
      en: 'The meaning of the five daily prayers, what they involve, and the inner purpose behind the outward form.',
      bn: 'পাঁচ ওয়াক্ত নামাজের অর্থ, এতে কী থাকে এবং বাহ্যিক রূপের পেছনের অন্তর্নিহিত উদ্দেশ্য।',
    },
    points: [
      {
        heading: { en: 'A rhythm of remembrance', bn: 'স্মরণের এক ছন্দ' },
        body: {
          en: 'Salah is the formal prayer performed five times a day — at dawn, midday, afternoon, sunset and night. Rather than a single weekly service, Islam distributes worship across the whole day, so that a person never drifts far from the remembrance of God before returning to it. The Quran ties prayer to God’s own instruction to Moses: "Indeed, I am God. There is no deity except Me, so worship Me and establish prayer for My remembrance" (20:14). It is the first act a Muslim will be asked about on the Day of Judgment.',
          bn: 'সালাত হলো দিনে পাঁচবার আদায়কৃত আনুষ্ঠানিক নামাজ — ভোর, দুপুর, বিকাল, সূর্যাস্ত ও রাতে। সপ্তাহে একটি মাত্র উপাসনার বদলে ইসলাম গোটা দিনজুড়ে ইবাদত ছড়িয়ে দেয়, যাতে মানুষ আল্লাহর স্মরণে ফেরার আগে কখনো বেশি দূরে সরে না যায়। কুরআন নামাজকে মুসার প্রতি আল্লাহর নির্দেশের সাথে যুক্ত করে: "নিশ্চয়ই আমিই আল্লাহ। আমি ছাড়া কোনো উপাস্য নেই, সুতরাং আমার ইবাদত করো এবং আমার স্মরণে নামাজ কায়েম করো" (২০:১৪)। কিয়ামতের দিন মুসলিমকে সর্বপ্রথম নামাজ সম্পর্কেই জিজ্ঞেস করা হবে।',
        },
      },
      {
        heading: { en: 'What the prayer involves', bn: 'নামাজে কী থাকে' },
        body: {
          en: 'A Muslim prepares for prayer with wudu (a simple washing) and faces the Kaaba in Mecca, uniting worshippers worldwide toward a single point. The prayer weaves together standing, bowing and prostrating — postures of humility — with recitation of the Quran, glorification and supplication. The lowest posture, prostration with the forehead on the ground, expresses the heart of worship: the created being at its most humble before the Creator. The whole body, the tongue and the mind are engaged together, so that worship is not merely felt but enacted.',
          bn: 'মুসলিম ওজু (সহজ ধৌতকরণ) দিয়ে নামাজের প্রস্তুতি নেয় এবং মক্কার কাবার দিকে মুখ করে, বিশ্বজুড়ে মুসল্লিদের একটি বিন্দুতে একত্র করে। নামাজে দাঁড়ানো, রুকু ও সিজদা — বিনয়ের ভঙ্গি — কুরআন তিলাওয়াত, তাসবিহ ও দোয়ার সাথে গাঁথা। সর্বনিম্ন ভঙ্গি, কপাল মাটিতে রেখে সিজদা, ইবাদতের অন্তঃসার প্রকাশ করে: স্রষ্টার সামনে সৃষ্ট সত্তা তার সবচেয়ে বিনম্র অবস্থায়। দেহ, জিহ্বা ও মন একসাথে যুক্ত হয়, যাতে ইবাদত কেবল অনুভূত নয় বরং সম্পাদিত হয়।',
        },
      },
      {
        heading: { en: 'Form serving the heart', bn: 'অন্তরের সেবায় রূপ' },
        body: {
          en: 'Some ask why worship needs a fixed form at all. Islam’s answer is that the outward discipline is meant to cultivate an inner state, and to protect worship from being reduced to fleeting moods. Done with presence of heart, prayer is meant to restrain a person from wrongdoing: "Establish prayer; indeed, prayer prohibits immorality and wrongdoing" (29:45). It is not a favour done to God, who needs nothing, but a gift to the worshipper — a daily reset of perspective, humility and connection that steadies the soul amid the pressures of life.',
          bn: 'কেউ প্রশ্ন করেন, ইবাদতের আদৌ কেন একটি নির্দিষ্ট রূপ দরকার। ইসলামের উত্তর: বাহ্যিক শৃঙ্খলা এক অন্তর্গত অবস্থা গড়তে এবং ইবাদতকে ক্ষণস্থায়ী মেজাজে পরিণত হওয়া থেকে রক্ষা করতে। অন্তরের উপস্থিতি নিয়ে আদায় করা নামাজ মানুষকে অন্যায় থেকে বিরত রাখার কথা: "নামাজ কায়েম করো; নিশ্চয়ই নামাজ অশ্লীলতা ও মন্দ কাজ থেকে বিরত রাখে" (২৯:৪৫)। এটি আল্লাহর প্রতি কোনো অনুগ্রহ নয়, যিনি কিছুরই মুখাপেক্ষী নন, বরং মুসল্লির জন্য এক উপহার — দৃষ্টিভঙ্গি, বিনয় ও সংযোগের দৈনিক পুনঃস্থাপন যা জীবনের চাপে আত্মাকে স্থির রাখে।',
        },
      },
    ],
  },
  {
    id: 'sawm-fasting',
    emoji: '🌙',
    kind: 'article',
    title: { en: 'Fasting and Ramadan (Sawm)', bn: 'রোজা ও রমজান (সাওম)' },
    summary: {
      en: 'Why Muslims fast the month of Ramadan, what the fast involves, and the spiritual and social purposes behind it.',
      bn: 'কেন মুসলিমরা রমজান মাসে রোজা রাখে, রোজায় কী থাকে এবং এর পেছনের আধ্যাত্মিক ও সামাজিক উদ্দেশ্য।',
    },
    points: [
      {
        heading: { en: 'An ancient act of devotion', bn: 'ভক্তির এক প্রাচীন আমল' },
        body: {
          en: 'Fasting is one of the oldest forms of worship, practised in many faith traditions. The Quran presents it as a continuation of that heritage: "O you who believe, fasting is prescribed for you as it was prescribed for those before you, that you may become God-conscious" (2:183). During Ramadan — the month in which the Quran began to be revealed — Muslims abstain from food, drink and marital relations from dawn until sunset, then break the fast each evening, often in the company of family and community.',
          bn: 'রোজা ইবাদতের প্রাচীনতম রূপগুলোর একটি, বহু ধর্মীয় ঐতিহ্যে পালিত। কুরআন এটিকে সেই ঐতিহ্যের ধারাবাহিকতা হিসেবে উপস্থাপন করে: "হে ঈমানদারগণ, তোমাদের উপর রোজা ফরজ করা হয়েছে যেমন ফরজ করা হয়েছিল তোমাদের পূর্ববর্তীদের উপর, যাতে তোমরা আল্লাহভীরু হও" (২:১৮৩)। রমজানে — যে মাসে কুরআন অবতীর্ণ হতে শুরু করে — মুসলিমরা ভোর থেকে সূর্যাস্ত পর্যন্ত খাদ্য, পানীয় ও দাম্পত্য সম্পর্ক থেকে বিরত থাকে, তারপর প্রতি সন্ধ্যায়, প্রায়ই পরিবার ও সমাজের সঙ্গে, রোজা ভাঙে।',
        },
      },
      {
        heading: { en: 'Training the soul', bn: 'আত্মার প্রশিক্ষণ' },
        body: {
          en: 'The stated aim of fasting is taqwa — God-consciousness and self-restraint. By voluntarily setting aside even lawful food and drink for God’s sake, a person strengthens their will over their appetites and learns that they are more than their desires. Fasting is not only of the stomach: the tradition teaches that a fasting person should also guard the tongue, the eyes and the temper. In this way Ramadan becomes an annual month of intensive spiritual training — more prayer, more Quran, more charity — that aims to reset a person’s character for the year ahead.',
          bn: 'রোজার ঘোষিত লক্ষ্য তাকওয়া — আল্লাহভীতি ও আত্মসংযম। আল্লাহর সন্তুষ্টির জন্য স্বেচ্ছায় বৈধ খাদ্য-পানীয়ও ত্যাগ করে মানুষ তার প্রবৃত্তির উপর ইচ্ছাশক্তিকে দৃঢ় করে এবং শেখে যে সে তার কামনার চেয়েও বেশি কিছু। রোজা কেবল পেটের নয়: ঐতিহ্য শেখায় রোজাদারকে জিহ্বা, চোখ ও রাগও সংযত রাখতে হবে। এভাবে রমজান হয়ে ওঠে নিবিড় আধ্যাত্মিক প্রশিক্ষণের এক বার্ষিক মাস — বেশি নামাজ, বেশি কুরআন, বেশি দান — যা আগামী বছরের জন্য মানুষের চরিত্র পুনর্গঠনের লক্ষ্য রাখে।',
        },
      },
      {
        heading: { en: 'Empathy and community', bn: 'সহানুভূতি ও সমাজ' },
        body: {
          en: 'Fasting also has a deeply social dimension. Feeling genuine hunger and thirst awakens empathy for the poor who face them without choice, prompting increased generosity — Ramadan is the year’s peak season of charity for many Muslims. Because the whole community fasts together and gathers to break the fast and pray at night, the month strengthens bonds of family and neighbourhood. Islam does not command harm to the body: the sick, travellers, the pregnant, the elderly and others are exempted (2:185), for the goal is devotion and mercy, not hardship for its own sake.',
          bn: 'রোজার এক গভীর সামাজিক মাত্রাও আছে। প্রকৃত ক্ষুধা-তৃষ্ণা অনুভব করা সেই দরিদ্রদের প্রতি সহানুভূতি জাগায় যারা তা নিরুপায় হয়ে সহ্য করে, ফলে দানশীলতা বাড়ে — বহু মুসলিমের কাছে রমজান বছরের সর্বোচ্চ দানের মৌসুম। যেহেতু গোটা সমাজ একসাথে রোজা রাখে এবং ইফতার ও রাতের নামাজে জড়ো হয়, মাসটি পরিবার ও প্রতিবেশীর বন্ধন দৃঢ় করে। ইসলাম দেহের ক্ষতির আদেশ দেয় না: অসুস্থ, মুসাফির, গর্ভবতী, বৃদ্ধ ও অন্যরা অব্যাহতিপ্রাপ্ত (২:১৮৫), কারণ লক্ষ্য ভক্তি ও রহমত, নিছক কষ্ট নয়।',
        },
      },
    ],
  },
  {
    id: 'quran-and-earlier-scriptures',
    emoji: '📖',
    kind: 'article',
    title: { en: 'The Quran and Earlier Scriptures', bn: 'কুরআন ও পূর্ববর্তী কিতাবসমূহ' },
    summary: {
      en: 'How Islam relates the Quran to the Torah, Psalms and Gospel — affirming their divine origin while explaining the Quran’s distinct role.',
      bn: 'ইসলাম কীভাবে কুরআনকে তাওরাত, যাবুর ও ইঞ্জিলের সাথে সম্পর্কিত করে — এদের ঐশী উৎস স্বীকার করে অথচ কুরআনের স্বতন্ত্র ভূমিকা ব্যাখ্যা করে।',
    },
    points: [
      {
        heading: { en: 'Belief in the revealed books', bn: 'অবতীর্ণ কিতাবে বিশ্বাস' },
        body: {
          en: 'A Muslim is required to believe not only in the Quran but in the earlier scriptures God revealed: the scrolls of Abraham, the Torah (Tawrat) given to Moses, the Psalms (Zabur) given to David, and the Gospel (Injil) given to Jesus. The Quran speaks of them with reverence as light and guidance in their time: "Indeed, We sent down the Torah, in which was guidance and light" (5:44), and describes the Gospel likewise (5:46). Rejecting these earlier revelations is not the Islamic position; honouring them is part of the faith.',
          bn: 'একজন মুসলিমকে কেবল কুরআনে নয়, বরং আল্লাহর অবতীর্ণ পূর্ববর্তী কিতাবগুলোতেও বিশ্বাস করতে হয়: ইবরাহিমের সহিফা, মুসাকে দেওয়া তাওরাত, দাউদকে দেওয়া যাবুর এবং ঈসাকে দেওয়া ইঞ্জিল। কুরআন এগুলোকে তাদের সময়ের আলো ও হিদায়াত হিসেবে শ্রদ্ধার সাথে উল্লেখ করে: "নিশ্চয়ই আমি তাওরাত অবতীর্ণ করেছি, যাতে ছিল হিদায়াত ও আলো" (৫:৪৪), এবং ইঞ্জিলকেও অনুরূপ বর্ণনা করে (৫:৪৬)। এই পূর্ববর্তী ওহি প্রত্যাখ্যান করা ইসলামের অবস্থান নয়; এগুলোকে সম্মান করা ঈমানের অংশ।',
        },
      },
      {
        heading: { en: 'Confirming and guarding', bn: 'সত্যায়ন ও সংরক্ষণ' },
        body: {
          en: 'The Quran describes itself as both confirming the truth in earlier scriptures and serving as a criterion over them: "And We revealed to you the Book in truth, confirming that which preceded it of the Scripture and as a guardian over it" (5:48). On this view the essential message — worship the one God, live justly, prepare for the hereafter — is one continuous truth across all the prophets. Where later human transmission introduced additions or alterations, the Quran comes to restore and settle the original message, not to abolish it.',
          bn: 'কুরআন নিজেকে পূর্ববর্তী কিতাবের সত্য সত্যায়নকারী এবং সেগুলোর উপর মানদণ্ড উভয়ই হিসেবে বর্ণনা করে: "আর আমি তোমার প্রতি সত্যসহ কিতাব অবতীর্ণ করেছি, পূর্ববর্তী কিতাবের সত্যায়নকারী এবং তার উপর তত্ত্বাবধায়করূপে" (৫:৪৮)। এই দৃষ্টিতে মূল বার্তা — এক আল্লাহর ইবাদত করো, ন্যায়ে জীবন কাটাও, পরকালের প্রস্তুতি নাও — সকল নবীর মধ্য দিয়ে এক অবিচ্ছিন্ন সত্য। যেখানে পরবর্তী মানবিক সংক্রমণে সংযোজন বা পরিবর্তন এসেছে, সেখানে কুরআন মূল বার্তাকে পুনঃপ্রতিষ্ঠা ও চূড়ান্ত করতে আসে, বাতিল করতে নয়।',
        },
      },
      {
        heading: { en: 'One family of faith', bn: 'বিশ্বাসের এক পরিবার' },
        body: {
          en: 'Because of this shared lineage, Muslims are taught to address the People of the Book — Jews and Christians — with a recognition of common roots. The Quran instructs the believers to say: "We believe in what has been revealed to us and revealed to you; our God and your God is one, and to Him we submit" (a principle expressed in 29:46). Belief in "no distinction between any of His messengers" (2:285) means a Muslim reveres Moses and Jesus alongside Muhammad ﷺ. The Quran, in this framing, is not a new religion but the final chapter of a very old one.',
          bn: 'এই অভিন্ন বংশধারার কারণে মুসলিমদের শেখানো হয় আহলে কিতাব — ইহুদি ও খ্রিস্টান — এর সাথে অভিন্ন শিকড়ের স্বীকৃতি নিয়ে কথা বলতে। কুরআন মুমিনদের বলতে নির্দেশ দেয়: "আমরা বিশ্বাস করি আমাদের প্রতি ও তোমাদের প্রতি যা অবতীর্ণ হয়েছে; আমাদের ইলাহ ও তোমাদের ইলাহ এক, এবং আমরা তাঁরই কাছে আত্মসমর্পিত" (২৯:৪৬-এ প্রকাশিত নীতি)। "তাঁর রাসুলদের কারও মধ্যে পার্থক্য না করা" (২:২৮৫) মানে একজন মুসলিম মুহাম্মাদ ﷺ এর পাশাপাশি মুসা ও ঈসাকেও শ্রদ্ধা করে। এই কাঠামোয় কুরআন কোনো নতুন ধর্ম নয়, বরং এক অতি প্রাচীন ধর্মের চূড়ান্ত অধ্যায়।',
        },
      },
    ],
  },
  /* ─────────────────────────────────────────────────────────────────────── */
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
