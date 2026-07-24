/**
 * Sahaba (Companions of the Prophet ﷺ) — DATA MODULE
 *
 * Exposes globals: SAHABA_ERAS, SAHABA_DATA, SAHABA_UI.
 * Loaded via <script> BEFORE js/sahaba.js in index.html.
 *
 * Each companion entry:
 *   { id, order, init, color, ar, translit, en, bn,
 *     era,                       // one of SAHABA_ERAS ids (timeline grouping)
 *     ashara, caliph, ansar, woman,   // booleans → badges + filters
 *     roleEn/roleBn, yearEn,
 *     highlightEn/highlightBn,   // one-line highlight
 *     summaryEn/summaryBn,       // story
 *     events: [{en,bn}],         // key highlights
 *     refs: [ "surah:ayah" ],    // connected Quran refs (tappable)
 *     lessonEn/lessonBn }
 *
 * Content is mainstream Sunni and was adversarially fact-checked. Only en/bn are
 * authored; the other UI languages fall back through SAHABA_UI + CI18N.
 */

/* eslint-disable no-unused-vars */

// Timeline eras, in chronological order.
const SAHABA_ERAS = [
  { id: 'first',       key: 'sahaba_era_first',       emoji: '🌅' },
  { id: 'persecution', key: 'sahaba_era_persecution', emoji: '🔥' },
  { id: 'hijra',       key: 'sahaba_era_hijra',       emoji: '🌿' },
  { id: 'battles',     key: 'sahaba_era_battles',     emoji: '⚔️' },
  { id: 'conquest',    key: 'sahaba_era_conquest',    emoji: '🕌' },
  { id: 'knowledge',   key: 'sahaba_era_knowledge',   emoji: '📚' },
];

// Populated from the verified content wave (see build history). Placeholder kept
// empty here; the real array is assembled below.
const SAHABA_DATA = [
  {
    "id": "abu_bakr_as_siddiq",
    "order": 1,
    "init": "AS",
    "color": "bg-amber-500",
    "ar": "أَبُو بَكْرٍ الصِّدِّيق",
    "translit": "Abu Bakr as-Siddiq",
    "en": "Abu Bakr as-Siddiq (RA)",
    "bn": "আবু বকর আস-সিদ্দিক (রাঃ)",
    "era": "first",
    "ashara": true,
    "caliph": true,
    "ansar": false,
    "woman": false,
    "roleEn": "The First Caliph",
    "roleBn": "প্রথম খলিফা",
    "yearEn": "c. 573-634 CE",
    "highlightEn": "The Prophet's companion in the cave; the first Caliph.",
    "highlightBn": "গুহায় নবীজির সঙ্গী; প্রথম খলিফা।",
    "summaryEn": "Abu Bakr was the closest friend and companion of the Prophet Muhammad (peace be upon him) and the first adult free man to embrace Islam. A respected merchant known for his honesty, he freed many persecuted slaves including Bilal, and accompanied the Prophet on the Hijra, hiding with him in the cave of Thawr. Upon the Prophet's passing he was chosen as the first Caliph, steadying the community and crushing the wars of apostasy (Ridda). He is titled as-Siddiq (the Truthful) for immediately affirming the Night Journey.",
    "summaryBn": "আবু বকর (রাঃ) ছিলেন নবী মুহাম্মাদ (সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম)-এর সবচেয়ে ঘনিষ্ঠ বন্ধু ও সঙ্গী এবং প্রাপ্তবয়স্ক স্বাধীন পুরুষদের মধ্যে প্রথম ইসলাম গ্রহণকারী। সততার জন্য খ্যাত একজন সম্মানিত ব্যবসায়ী হিসেবে তিনি বিলালসহ বহু নির্যাতিত দাসকে মুক্ত করেন এবং হিজরতে নবীজির সঙ্গী হয়ে সাওর গুহায় আশ্রয় নেন। নবীজির ইন্তেকালের পর তিনি প্রথম খলিফা নির্বাচিত হন, উম্মাহকে স্থিতিশীল করেন ও রিদ্দার যুদ্ধসমূহ দমন করেন। মিরাজের ঘটনা বিনা দ্বিধায় সত্যায়ন করায় তাঁকে 'আস-সিদ্দিক' (সত্যবাদী) উপাধি দেওয়া হয়।",
    "events": [
      {
        "en": "First free adult man to accept Islam",
        "bn": "প্রাপ্তবয়স্ক স্বাধীন পুরুষদের মধ্যে প্রথম ইসলাম গ্রহণ"
      },
      {
        "en": "Freed Bilal and other persecuted slaves",
        "bn": "বিলালসহ নির্যাতিত দাসদের মুক্ত করেন"
      },
      {
        "en": "Accompanied the Prophet in the cave of Thawr during the Hijra",
        "bn": "হিজরতে সাওর গুহায় নবীজির সঙ্গী হন"
      },
      {
        "en": "Chosen as the first Rightly-Guided Caliph",
        "bn": "প্রথম খুলাফায়ে রাশিদীন হিসেবে নির্বাচিত হন"
      },
      {
        "en": "Led the community through the Ridda (apostasy) wars",
        "bn": "রিদ্দার যুদ্ধে উম্মাহর নেতৃত্ব দেন"
      }
    ],
    "refs": [
      "9:40"
    ],
    "lessonEn": "True friendship in faith means standing firm beside the truth without hesitation.",
    "lessonBn": "ঈমানের প্রকৃত বন্ধুত্ব মানে দ্বিধাহীনভাবে সত্যের পাশে অবিচল থাকা।"
  },
  {
    "id": "talha_ibn_ubaydillah",
    "order": 2,
    "init": "TU",
    "color": "bg-rose-500",
    "ar": "طلحة بن عبيد الله",
    "translit": "Talha ibn Ubaydillah",
    "en": "Talha ibn Ubaydillah (RA)",
    "bn": "তালহা ইবনে উবাইদুল্লাহ (রাঃ)",
    "era": "first",
    "ashara": true,
    "caliph": false,
    "ansar": false,
    "woman": false,
    "roleEn": "The Living Martyr of Uhud",
    "roleBn": "উহুদের জীবিত শহীদ",
    "yearEn": "c. 594-656 CE",
    "highlightEn": "He shielded the Prophet at Uhud until his hand was paralysed.",
    "highlightBn": "উহুদে হাত অবশ হওয়া পর্যন্ত নবীজিকে আড়াল করেছিলেন।",
    "summaryEn": "Talha ibn Ubaydillah (RA) was a wealthy merchant of the Quraysh and among the first eight people to embrace Islam, brought to faith by Abu Bakr (RA). He is best remembered for the Battle of Uhud, where he shielded the Prophet Muhammad (peace be upon him) with his own body, catching enemy arrows and blows until his hand was permanently paralysed. For his devotion that day the Prophet (peace be upon him) called him a martyr still walking upon the earth. He was renowned for boundless generosity, earning the titles Talha the Good and Talha the Generous, and was one of the Ten Promised Paradise.",
    "summaryBn": "তালহা ইবনে উবাইদুল্লাহ (রাঃ) ছিলেন কুরাইশের একজন ধনী ব্যবসায়ী এবং আবু বকর (রাঃ)-এর মাধ্যমে ইসলাম গ্রহণকারী প্রথম আট ব্যক্তির একজন। উহুদের যুদ্ধে তিনি নিজ দেহ দিয়ে রাসূলুল্লাহ (সাল্লাল্লাহু আলাইহি ওয়া সাল্লাম)-কে আড়াল করেন, শত্রুর তীর ও আঘাত নিজের হাতে গ্রহণ করেন, যাতে তাঁর হাত চিরতরে অবশ হয়ে যায়। সেই দিনের আত্মত্যাগের জন্য নবীজি (সাল্লাল্লাহু আলাইহি ওয়া সাল্লাম) তাঁকে 'জমিনে চলাফেরাকারী শহীদ' বলে আখ্যায়িত করেন। অসীম দানশীলতার জন্য তিনি 'তালহা আল-খাইর' ও 'তালহা আল-জুদ' নামে পরিচিত ছিলেন এবং তিনি জান্নাতের সুসংবাদপ্রাপ্ত দশজনের একজন।",
    "events": [
      {
        "en": "Among the first eight to accept Islam through Abu Bakr",
        "bn": "আবু বকরের মাধ্যমে ইসলাম গ্রহণকারী প্রথম আটজনের একজন"
      },
      {
        "en": "Shielded the Prophet (peace be upon him) at Uhud, his hand paralysed",
        "bn": "উহুদে নবীজিকে আড়াল করেন, তাঁর হাত অবশ হয়ে যায়"
      },
      {
        "en": "Called by the Prophet a martyr walking on the earth",
        "bn": "নবীজি তাঁকে জমিনে চলা শহীদ বলে আখ্যায়িত করেন"
      },
      {
        "en": "Famed for lavish generosity to the poor",
        "bn": "দরিদ্রদের প্রতি ব্যাপক দানশীলতার জন্য খ্যাত"
      },
      {
        "en": "Killed at the Battle of the Camel in 36 AH",
        "bn": "৩৬ হিজরিতে জামালের যুদ্ধে নিহত হন"
      }
    ],
    "refs": [
      "33:23"
    ],
    "lessonEn": "True love for the Prophet is proven by sacrifice, not merely words.",
    "lessonBn": "নবীর প্রতি প্রকৃত ভালোবাসা কেবল কথায় নয়, ত্যাগের মাধ্যমে প্রমাণিত হয়।"
  },
  {
    "id": "az_zubayr_ibn_al_awwam",
    "order": 3,
    "init": "ZA",
    "color": "bg-emerald-500",
    "ar": "الزبير بن العوام",
    "translit": "Az-Zubayr ibn al-Awwam",
    "en": "Az-Zubayr ibn al-Awwam (RA)",
    "bn": "যুবাইর ইবনুল আওয়াম (রাঃ)",
    "era": "first",
    "ashara": true,
    "caliph": false,
    "ansar": false,
    "woman": false,
    "roleEn": "The Disciple of the Prophet",
    "roleBn": "নবীর হাওয়ারি",
    "yearEn": "c. 594-656 CE",
    "highlightEn": "The first man to draw a sword for Islam.",
    "highlightBn": "ইসলামের পথে সর্বপ্রথম তরবারি উত্তোলনকারী।",
    "summaryEn": "Az-Zubayr ibn al-Awwam (RA) was a cousin of the Prophet Muhammad (peace be upon him), being the son of the Prophet's aunt Safiyyah bint Abd al-Muttalib, and accepted Islam as a youth among the earliest believers. He is remembered as the first man to draw his sword in the cause of Islam, and he migrated first to Abyssinia and then to Madinah. The Prophet (peace be upon him) called him his hawari, his devoted disciple, and he fought valiantly at Badr, Uhud and the later campaigns. He was one of the Ten Promised Paradise and among the six-man council appointed by Umar (RA) to choose the next caliph. He was killed in the aftermath of the Battle of the Camel in 36 AH.",
    "summaryBn": "যুবাইর ইবনুল আওয়াম (রাঃ) ছিলেন রাসূলুল্লাহ (সাল্লাল্লাহু আলাইহি ওয়া সাল্লাম)-এর ফুফাতো ভাই, কেননা তিনি নবীজির ফুফু সাফিয়্যা বিনতে আবদুল মুত্তালিবের পুত্র; অল্প বয়সেই প্রথম মুসলিমদের মধ্যে ইসলাম গ্রহণ করেন। ইসলামের পথে সর্বপ্রথম তরবারি উত্তোলনকারী হিসেবে তিনি স্মরণীয়; তিনি প্রথমে আবিসিনিয়ায় ও পরে মদিনায় হিজরত করেন। নবীজি (সাল্লাল্লাহু আলাইহি ওয়া সাল্লাম) তাঁকে 'আমার হাওয়ারি' তথা নিবেদিত সহচর বলে ডাকতেন; বদর, উহুদসহ পরবর্তী অভিযানে তিনি বীরত্বের সাথে লড়েছেন। তিনি জান্নাতের সুসংবাদপ্রাপ্ত দশজনের একজন এবং উমর (রাঃ) কর্তৃক নির্বাচিত ছয় সদস্যের শূরা পরিষদের সদস্য ছিলেন। ৩৬ হিজরিতে জামালের যুদ্ধের পর তিনি নিহত হন।",
    "events": [
      {
        "en": "Cousin of the Prophet and among the earliest believers",
        "bn": "নবীজির ফুফাতো ভাই ও প্রথম মুসলিমদের একজন"
      },
      {
        "en": "First to draw his sword in defence of Islam",
        "bn": "ইসলাম রক্ষায় সর্বপ্রথম তরবারি উত্তোলনকারী"
      },
      {
        "en": "Migrated to Abyssinia and then to Madinah",
        "bn": "আবিসিনিয়া ও পরে মদিনায় হিজরত করেন"
      },
      {
        "en": "Called the Prophet's hawari (devoted disciple)",
        "bn": "নবীজি তাঁকে 'হাওয়ারি' বলে আখ্যা দেন"
      },
      {
        "en": "Member of Umar's six-man council; killed after the Battle of the Camel",
        "bn": "উমরের ছয় সদস্যের শূরার সদস্য; জামালের যুদ্ধের পর নিহত হন"
      }
    ],
    "refs": [
      "3:172"
    ],
    "lessonEn": "Courage in Allah's cause means being first to act when others hesitate.",
    "lessonBn": "আল্লাহর পথে সাহস মানে অন্যরা দ্বিধা করলেও সবার আগে এগিয়ে আসা।"
  },
  {
    "id": "abdur_rahman_ibn_awf",
    "order": 4,
    "init": "AA",
    "color": "bg-indigo-500",
    "ar": "عبد الرحمن بن عوف",
    "translit": "Abdur-Rahman ibn Awf",
    "en": "Abdur-Rahman ibn Awf (RA)",
    "bn": "আবদুর রহমান ইবনে আওফ (রাঃ)",
    "era": "first",
    "ashara": true,
    "caliph": false,
    "ansar": false,
    "woman": false,
    "roleEn": "The Generous Merchant",
    "roleBn": "দানশীল ব্যবসায়ী",
    "yearEn": "c. 580-652 CE",
    "highlightEn": "He gave a caravan of 700 laden camels in charity at once.",
    "highlightBn": "একসাথে মালবোঝাই সাতশো উটের কাফেলা দান করে দেন।",
    "summaryEn": "Abdur-Rahman ibn Awf (RA) was one of the first eight to accept Islam and a gifted merchant whose trade Allah blessed abundantly. When he migrated to Madinah, he declined his Ansari brother's offer of half his wealth, asking only to be shown the marketplace, and soon prospered through honest trade. He became famous for staggering acts of charity, once giving an entire caravan of seven hundred camels with their loads in the path of Allah. He fought at Badr and the major battles, was one of the Ten Promised Paradise, and served on the six-man council that chose Uthman (RA) as caliph.",
    "summaryBn": "আবদুর রহমান ইবনে আওফ (রাঃ) ছিলেন ইসলাম গ্রহণকারী প্রথম আট ব্যক্তির একজন এবং একজন দক্ষ ব্যবসায়ী, যাঁর ব্যবসায় আল্লাহ প্রচুর বরকত দিয়েছিলেন। মদিনায় হিজরতের সময় তিনি তাঁর আনসারি ভাইয়ের অর্ধেক সম্পদের প্রস্তাব ফিরিয়ে দিয়ে কেবল বাজারের পথ দেখিয়ে দিতে বলেন এবং সৎ ব্যবসায় দ্রুত সমৃদ্ধ হন। তিনি বিস্ময়কর দানশীলতার জন্য বিখ্যাত ছিলেন; একবার সাতশো উটের একটি সম্পূর্ণ কাফেলা তার মালামালসহ আল্লাহর পথে দান করে দেন। তিনি বদরসহ বড় বড় যুদ্ধে অংশ নেন, জান্নাতের সুসংবাদপ্রাপ্ত দশজনের একজন ছিলেন এবং উসমান (রাঃ)-কে খলিফা নির্বাচনকারী ছয় সদস্যের শূরার সদস্য ছিলেন।",
    "events": [
      {
        "en": "Among the first eight to accept Islam",
        "bn": "ইসলাম গ্রহণকারী প্রথম আটজনের একজন"
      },
      {
        "en": "Declined half his Ansari brother's wealth, asking only for the market",
        "bn": "আনসারি ভাইয়ের অর্ধেক সম্পদ প্রত্যাখ্যান করে কেবল বাজার চান"
      },
      {
        "en": "Prospered through honest trade and gave vast charity",
        "bn": "সৎ ব্যবসায় সমৃদ্ধ হন ও বিপুল দান করেন"
      },
      {
        "en": "Fought at Badr and the major battles",
        "bn": "বদরসহ বড় যুদ্ধগুলোতে অংশ নেন"
      },
      {
        "en": "Served on the council that chose Uthman as caliph",
        "bn": "উসমানকে খলিফা নির্বাচনকারী শূরায় ছিলেন"
      }
    ],
    "refs": [],
    "lessonEn": "Wealth is a trust to be spent generously in Allah's cause, not hoarded.",
    "lessonBn": "সম্পদ একটি আমানত, যা কুক্ষিগত না করে আল্লাহর পথে উদারভাবে ব্যয় করার জন্য।"
  },
  {
    "id": "said_ibn_zayd",
    "order": 5,
    "init": "SZ",
    "color": "bg-pink-500",
    "ar": "سعيد بن زيد",
    "translit": "Said ibn Zayd",
    "en": "Said ibn Zayd (RA)",
    "bn": "সাঈদ ইবনে যায়িদ (রাঃ)",
    "era": "first",
    "ashara": true,
    "caliph": false,
    "ansar": false,
    "woman": false,
    "roleEn": "Early Believer of Quraysh",
    "roleBn": "কুরাইশের অগ্রবর্তী মুমিন",
    "yearEn": "c. 593-671 CE",
    "highlightEn": "Umar embraced Islam after finding his sister Fatimah and her husband Said reciting Quran.",
    "highlightBn": "নিজ বোন ফাতিমা ও তাঁর স্বামী সাঈদকে কুরআন পাঠরত পেয়ে উমর ইসলাম গ্রহণ করেন।",
    "summaryEn": "Said ibn Zayd (RA) was among the earliest to embrace Islam, the son of Zayd ibn Amr, a seeker of pure monotheism who had rejected idolatry even before the Prophet's mission. Said and his wife Fatimah bint al-Khattab endured persecution for their faith, and it was while striking his own sister that Umar ibn al-Khattab (RA) found them reading the Quran, an encounter that led to Umar's own conversion. Said fought at Uhud and the later battles and served in the conquest of Syria. He was one of the Ten Promised Paradise, known for his humility and his caution against wronging others.",
    "summaryBn": "সাঈদ ইবনে যায়িদ (রাঃ) ছিলেন ইসলামের অগ্রবর্তী গ্রহণকারীদের একজন; তিনি ছিলেন যায়িদ ইবনে আমরের পুত্র, যিনি নবীজির নবুয়তের আগেই মূর্তিপূজা প্রত্যাখ্যান করে বিশুদ্ধ একত্ববাদের অন্বেষক ছিলেন। সাঈদ ও তাঁর স্ত্রী ফাতিমা বিনতে আল-খাত্তাব ঈমানের জন্য নির্যাতন সহ্য করেন; নিজ বোনকে আঘাত করতে গিয়ে উমর ইবনুল খাত্তাব (রাঃ) তাঁদের কুরআন পাঠরত অবস্থায় পান, যে ঘটনা উমরের ইসলাম গ্রহণের পথ খুলে দেয়। সাঈদ উহুদসহ পরবর্তী যুদ্ধে এবং সিরিয়া বিজয়ে অংশ নেন। তিনি জান্নাতের সুসংবাদপ্রাপ্ত দশজনের একজন, যিনি বিনয় ও অন্যের প্রতি জুলুম থেকে সতর্কতার জন্য পরিচিত।",
    "events": [
      {
        "en": "Son of Zayd ibn Amr, a monotheist before Islam's mission",
        "bn": "নবুয়তের আগেই একত্ববাদী যায়িদ ইবনে আমরের পুত্র"
      },
      {
        "en": "Among the earliest believers, with his wife Fatimah",
        "bn": "স্ত্রী ফাতিমাসহ প্রথম মুমিনদের একজন"
      },
      {
        "en": "His household was the setting for Umar's conversion",
        "bn": "তাঁর গৃহেই উমরের ইসলাম গ্রহণের সূচনা"
      },
      {
        "en": "Fought at Uhud and the later battles",
        "bn": "উহুদসহ পরবর্তী যুদ্ধে অংশ নেন"
      },
      {
        "en": "Took part in the conquest of Syria",
        "bn": "সিরিয়া বিজয়ে অংশগ্রহণ করেন"
      }
    ],
    "refs": [],
    "lessonEn": "Steadfast faith in a home can guide even the fiercest opponent to guidance.",
    "lessonBn": "একটি ঘরের অবিচল ঈমান কঠোরতম বিরোধীকেও হেদায়েতের পথে আনতে পারে।"
  },
  {
    "id": "zayd_ibn_harithah",
    "order": 6,
    "init": "ZH",
    "color": "bg-sky-600",
    "ar": "زَيْد بن حَارِثَة",
    "translit": "Zayd ibn Harithah",
    "en": "Zayd ibn Harithah (RA)",
    "bn": "যায়েদ ইবনে হারিসা (রাঃ)",
    "era": "first",
    "ashara": false,
    "caliph": false,
    "ansar": false,
    "woman": false,
    "roleEn": "The Beloved Freedman",
    "roleBn": "নবীর প্রিয় মুক্তদাস ও শহীদ",
    "yearEn": "c. 581–629 CE",
    "highlightEn": "The only companion named in the Quran itself.",
    "highlightBn": "একমাত্র সাহাবি যাঁর নাম কুরআনে উল্লেখিত।",
    "summaryEn": "Zayd ibn Harithah (RA) was captured as a boy and sold into slavery, ending up in the household of the Prophet Muhammad ﷺ, who freed him and loved him deeply. When his birth family found him, Zayd chose to remain with the Prophet ﷺ over returning home, and he became one of the very first to embrace Islam. So close was their bond that people called him \"Zayd ibn Muhammad\" until the Quran restored the practice of naming sons after their true fathers. He is the only companion mentioned by name in the Quran, in the verse concerning his marriage to Zaynab. He was appointed commander at the Battle of Mutah, where he was martyred in 8 AH.",
    "summaryBn": "যায়েদ ইবনে হারিসা (রাঃ)-কে বালক বয়সে বন্দি করে দাস হিসেবে বিক্রি করা হয়, এবং শেষ পর্যন্ত তিনি নবী মুহাম্মদ ﷺ-এর গৃহে আসেন, যিনি তাঁকে মুক্ত করেন ও গভীরভাবে ভালোবাসতেন। তাঁর জন্মপরিবার যখন তাঁকে খুঁজে পায়, তখন যায়েদ ঘরে ফেরার বদলে নবী ﷺ-এর সঙ্গেই থেকে যাওয়া বেছে নেন এবং সবচেয়ে প্রথম ইসলাম গ্রহণকারীদের একজন হন। তাঁদের বন্ধন এত গভীর ছিল যে লোকে তাঁকে \"যায়েদ ইবনে মুহাম্মদ\" বলে ডাকত, যতক্ষণ না কুরআন প্রকৃত পিতার নামে পুত্রকে ডাকার বিধান পুনঃপ্রতিষ্ঠা করে। তিনিই একমাত্র সাহাবি যাঁর নাম কুরআনে সরাসরি উল্লেখিত হয়েছে, যায়নাব (রাঃ)-এর সঙ্গে তাঁর বিবাহ-সংক্রান্ত আয়াতে। মুতার যুদ্ধে তাঁকে সেনাপতি নিযুক্ত করা হয় এবং ৮ হিজরিতে সেখানেই তিনি শহীদ হন।",
    "events": [
      {
        "en": "Captured as a boy and freed by the Prophet ﷺ, who adopted him as a son",
        "bn": "বালক বয়সে বন্দি হন, নবী ﷺ তাঁকে মুক্ত করে পুত্র হিসেবে গ্রহণ করেন"
      },
      {
        "en": "Chose to remain with the Prophet ﷺ over returning to his own family",
        "bn": "নিজ পরিবারে ফেরার বদলে নবী ﷺ-এর সঙ্গে থাকা বেছে নেন"
      },
      {
        "en": "Among the very first to accept Islam",
        "bn": "সবার আগে ইসলাম গ্রহণকারীদের একজন"
      },
      {
        "en": "Named in the Quran regarding his marriage to Zaynab bint Jahsh (RA)",
        "bn": "যায়নাব বিনতে জাহশ (রাঃ)-এর সঙ্গে বিবাহ প্রসঙ্গে কুরআনে তাঁর নাম উল্লেখিত"
      },
      {
        "en": "Commanded the Muslim army and was martyred at the Battle of Mutah (8 AH)",
        "bn": "মুতার যুদ্ধে মুসলিম বাহিনীর সেনাপতি ছিলেন এবং শহীদ হন (৮ হিজরি)"
      }
    ],
    "refs": [
      "33:37",
      "33:5"
    ],
    "lessonEn": "True belonging is chosen through faith and love, not merely inherited by blood.",
    "lessonBn": "প্রকৃত আত্মীয়তা রক্তে নয়, বরং ঈমান ও ভালোবাসায় বেছে নেওয়া হয়।"
  },
  {
    "id": "suhayb_ar_rumi",
    "order": 7,
    "init": "SR",
    "color": "bg-teal-600",
    "ar": "صُهَيْب الرُّومِي",
    "translit": "Suhayb ar-Rumi",
    "en": "Suhayb ar-Rumi (RA)",
    "bn": "সুহাইব আর-রূমি (রাঃ)",
    "era": "first",
    "ashara": false,
    "caliph": false,
    "ansar": false,
    "woman": false,
    "roleEn": "The Roman Who Profited",
    "roleBn": "রোমক সাহাবি, যিনি লাভবান হলেন",
    "yearEn": "c. 587–659 CE",
    "highlightEn": "He traded all his wealth for faith — \"Suhayb has profited!\"",
    "highlightBn": "ঈমানের বিনিময়ে সব সম্পদ দিলেন—\"সুহাইব লাভবান হয়েছে!\"",
    "summaryEn": "Suhayb ar-Rumi (RA) was of Arab descent but was captured by the Byzantines as a child and raised among the Romans, which is why he was nicknamed \"the Roman.\" He became a prosperous merchant in Mecca and was among the early believers. When he set out to migrate to Madinah, the Quraysh tried to stop him, so he surrendered his entire fortune to them in exchange for his freedom to leave. The Prophet ﷺ, on hearing this, said, \"Suhayb has profited, Suhayb has profited.\" Tradition connects to him the verse praising the one who sells his very self seeking the pleasure of Allah.",
    "summaryBn": "সুহাইব আর-রূমি (রাঃ) ছিলেন আরব বংশোদ্ভূত, কিন্তু শৈশবে বাইজেন্টাইনরা তাঁকে বন্দি করে, ফলে তিনি রোমকদের মধ্যে বড় হন—এ কারণেই তাঁর ডাকনাম হয় \"আর-রূমি\" (রোমক)। তিনি মক্কায় একজন সমৃদ্ধ ব্যবসায়ী হন এবং আগের ঈমানদারদের একজন ছিলেন। মদিনায় হিজরতের জন্য রওনা হলে কুরাইশরা তাঁকে বাধা দেয়, তখন তিনি চলে যাওয়ার স্বাধীনতার বিনিময়ে নিজের গোটা সম্পদ তাদের হাতে তুলে দেন। এ কথা শুনে নবী ﷺ বলেন, \"সুহাইব লাভবান হয়েছে, সুহাইব লাভবান হয়েছে।\" বর্ণনায় তাঁর সঙ্গে সেই আয়াত সংযুক্ত করা হয়, যা আল্লাহর সন্তুষ্টির জন্য নিজেকে বিকিয়ে দেওয়া ব্যক্তির প্রশংসা করে।",
    "events": [
      {
        "en": "Arab by birth, raised among the Byzantines after being captured",
        "bn": "জন্মসূত্রে আরব, বন্দি হয়ে বাইজেন্টাইনদের মধ্যে লালিত"
      },
      {
        "en": "A wealthy Meccan merchant among the early believers",
        "bn": "আগের ঈমানদারদের একজন, মক্কার ধনী ব্যবসায়ী"
      },
      {
        "en": "Gave up his entire fortune to migrate to Madinah",
        "bn": "মদিনায় হিজরতের জন্য নিজের গোটা সম্পদ ছেড়ে দেন"
      },
      {
        "en": "The Prophet ﷺ said, \"Suhayb has profited\"",
        "bn": "নবী ﷺ বলেন, \"সুহাইব লাভবান হয়েছে\""
      },
      {
        "en": "Umar (RA) chose him to lead the prayers during the caliphal interregnum",
        "bn": "উমর (রাঃ) তাঁকে খিলাফতের অন্তর্বর্তী সময়ে নামাজের ইমামতির দায়িত্ব দেন"
      }
    ],
    "refs": [
      "2:207"
    ],
    "lessonEn": "Whoever gives up the world for Allah has made the most profitable trade.",
    "lessonBn": "যে আল্লাহর জন্য দুনিয়া ছেড়ে দেয়, সে-ই সবচেয়ে লাভজনক বাণিজ্য করে।"
  },
  {
    "id": "abu_dharr_al_ghifari",
    "order": 8,
    "init": "AG",
    "color": "bg-violet-500",
    "ar": "أَبُو ذَرّ الغِفَارِي",
    "translit": "Abu Dharr al-Ghifari",
    "en": "Abu Dharr al-Ghifari (RA)",
    "bn": "আবু যর আল-গিফারি (রাঃ)",
    "era": "first",
    "ashara": false,
    "caliph": false,
    "ansar": false,
    "woman": false,
    "roleEn": "The Truthful Ascetic",
    "roleBn": "সত্যবাদী বৈরাগী সাহাবি",
    "yearEn": "d. 32 AH / 653 CE",
    "highlightEn": "None under the sky was more truthful than Abu Dharr.",
    "highlightBn": "আসমানের নিচে আবু যরের চেয়ে সত্যবাদী কেউ ছিল না।",
    "summaryEn": "Abu Dharr al-Ghifari (RA), whose name was Jundub ibn Junadah, came from the Ghifar tribe and was among the very first to accept Islam — by some accounts the fourth or fifth believer. Bold and fearless, he went to the Ka'bah and openly proclaimed his faith before the Quraysh, who beat him severely for it, yet he repeated his declaration the next day. He was renowned for his piety, plain living, and unflinching truthfulness, and the Prophet ﷺ said that no one under the sky was more truthful than Abu Dharr. In his later years he lived in ascetic simplicity at Rabadha, where he died in 32 AH.",
    "summaryBn": "আবু যর আল-গিফারি (রাঃ), যাঁর নাম ছিল জুনদুব ইবনে জুনাদা, গিফার গোত্র থেকে এসেছিলেন এবং সবার আগে ইসলাম গ্রহণকারীদের একজন ছিলেন—কোনো কোনো বর্ণনায় চতুর্থ বা পঞ্চম ঈমানদার। সাহসী ও নির্ভীক এই মানুষটি কাবায় গিয়ে কুরাইশদের সামনে প্রকাশ্যে নিজের ঈমান ঘোষণা করেন, যার জন্য তারা তাঁকে নির্মমভাবে মারধর করে, তবু পরদিন তিনি আবার একই ঘোষণা দেন। তিনি তাঁর তাকওয়া, সাদাসিধা জীবন ও আপসহীন সত্যবাদিতার জন্য বিখ্যাত ছিলেন; নবী ﷺ বলেছেন, আসমানের নিচে আবু যরের চেয়ে সত্যবাদী কেউ নেই। জীবনের শেষভাগে তিনি রাবাযায় বৈরাগ্যপূর্ণ সরলতায় জীবন কাটান এবং ৩২ হিজরিতে সেখানেই ইন্তেকাল করেন।",
    "events": [
      {
        "en": "Among the first four or five people to accept Islam",
        "bn": "প্রথম চার-পাঁচজন ইসলাম গ্রহণকারীর একজন"
      },
      {
        "en": "Openly proclaimed Islam at the Ka'bah and was beaten for it",
        "bn": "কাবায় প্রকাশ্যে ইসলাম ঘোষণা করেন ও এর জন্য প্রহৃত হন"
      },
      {
        "en": "Praised by the Prophet ﷺ as the most truthful of people",
        "bn": "নবী ﷺ তাঁকে সবচেয়ে সত্যবাদী বলে প্রশংসা করেন"
      },
      {
        "en": "Known for asceticism and stern warnings against hoarding wealth",
        "bn": "বৈরাগ্য ও সম্পদ পুঞ্জীভূত করার বিরুদ্ধে কঠোর সতর্কতার জন্য পরিচিত"
      },
      {
        "en": "Died in simple solitude at Rabadha (32 AH)",
        "bn": "রাবাযায় সরল নিঃসঙ্গতায় ইন্তেকাল করেন (৩২ হিজরি)"
      }
    ],
    "refs": [],
    "lessonEn": "Speak the truth fearlessly and let your wealth never own your heart.",
    "lessonBn": "নির্ভয়ে সত্য বলো, আর সম্পদ যেন কখনো তোমার হৃদয়ের মালিক না হয়।"
  },
  {
    "id": "khadijah_bint_khuwaylid",
    "order": 9,
    "init": "KK",
    "color": "bg-cyan-600",
    "ar": "خديجة بنت خويلد",
    "translit": "Khadijah bint Khuwaylid",
    "en": "Khadijah bint Khuwaylid (RA)",
    "bn": "খাদিজা বিনতে খুওয়াইলিদ (রাঃ)",
    "era": "first",
    "ashara": false,
    "caliph": false,
    "ansar": false,
    "woman": true,
    "roleEn": "The First Believer",
    "roleBn": "সর্বপ্রথম ঈমান আনয়নকারী",
    "yearEn": "c. 555-619 CE",
    "highlightEn": "First to believe; she comforted the Prophet after the first revelation.",
    "highlightBn": "প্রথম ঈমান আনয়নকারী; প্রথম ওহির পর নবীকে সান্ত্বনা দিয়েছিলেন।",
    "summaryEn": "Khadijah (RA) was the Prophet Muhammad's (peace be upon him) first wife and the first person to accept Islam. A respected and wealthy merchant of Makkah, she employed Muhammad for his honesty before proposing marriage to him. When he received the first revelation and returned trembling, she comforted him, believed in him instantly, and reassured him that God would never disgrace him. For twenty-five years she was his devoted partner, sacrificing her wealth for Islam through the harsh boycott, and the Prophet honoured her memory for the rest of his life.",
    "summaryBn": "খাদিজা (রাঃ) ছিলেন নবী মুহাম্মদ (সাঃ)-এর প্রথম স্ত্রী এবং ইসলাম গ্রহণকারী প্রথম ব্যক্তি। মক্কার একজন সম্মানিতা ও সম্পদশালী ব্যবসায়ী হিসেবে তিনি মুহাম্মদের সততায় মুগ্ধ হয়ে তাঁকে বিবাহের প্রস্তাব দেন। প্রথম ওহি লাভের পর নবী যখন কম্পিত অবস্থায় ফিরে আসেন, তখন তিনি তাঁকে সান্ত্বনা দেন, তৎক্ষণাৎ বিশ্বাস স্থাপন করেন এবং আশ্বাস দেন যে আল্লাহ কখনো তাঁকে অপমানিত করবেন না। পঁচিশ বছর তিনি নবীর নিবেদিতপ্রাণ সঙ্গিনী ছিলেন, কঠোর সামাজিক বয়কটের সময় নিজের সমস্ত সম্পদ ইসলামের জন্য উৎসর্গ করেন, আর নবী আজীবন তাঁর স্মৃতিকে সম্মান করেছেন।",
    "events": [
      {
        "en": "Married the Prophet (peace be upon him) after admiring his honesty in her trade",
        "bn": "তাঁর ব্যবসায় নবীর (সাঃ) সততায় মুগ্ধ হয়ে তাঁকে বিবাহ করেন"
      },
      {
        "en": "First person, man or woman, to embrace Islam",
        "bn": "নারী-পুরুষ নির্বিশেষে ইসলাম গ্রহণকারী সর্বপ্রথম ব্যক্তি"
      },
      {
        "en": "Comforted the Prophet after the first revelation in the Cave of Hira",
        "bn": "হেরা গুহায় প্রথম ওহির পর নবীকে সান্ত্বনা দেন"
      },
      {
        "en": "Spent her wealth to sustain the Muslims through the boycott of the Banu Hashim",
        "bn": "বনু হাশিমের বয়কটকালে মুসলিমদের টিকিয়ে রাখতে সম্পদ ব্যয় করেন"
      },
      {
        "en": "Died in the 'Year of Sorrow' before the Hijra",
        "bn": "হিজরতের পূর্বে 'শোকের বছরে' ইন্তিকাল করেন"
      }
    ],
    "refs": [],
    "lessonEn": "True faith often begins with one person's unwavering trust and sacrifice.",
    "lessonBn": "প্রকৃত ঈমানের সূচনা প্রায়ই হয় একজন মানুষের অটল আস্থা ও ত্যাগ দিয়ে।"
  },
  {
    "id": "bilal_ibn_rabah",
    "order": 10,
    "init": "BR",
    "color": "bg-lime-600",
    "ar": "بِلَال بن رَبَاح",
    "translit": "Bilal ibn Rabah",
    "en": "Bilal ibn Rabah (RA)",
    "bn": "বিলাল ইবনে রাবাহ (রাঃ)",
    "era": "persecution",
    "ashara": false,
    "caliph": false,
    "ansar": false,
    "woman": false,
    "roleEn": "The First Muezzin of Islam",
    "roleBn": "ইসলামের প্রথম মুয়াজ্জিন",
    "yearEn": "c. 580–640 CE",
    "highlightEn": "Under torture he cried only \"Ahad, Ahad\" — One, One.",
    "highlightBn": "নির্যাতনের নিচেও শুধু বলতেন \"আহাদ, আহাদ\"—এক, এক।",
    "summaryEn": "Bilal ibn Rabah (RA) was an Abyssinian slave in Mecca who embraced Islam among the earliest believers. His master Umayyah ibn Khalaf tortured him savagely, pinning him under a heavy rock on the burning sand to force him to renounce his faith, yet Bilal only repeated \"Ahad, Ahad\" — \"One, One.\" Abu Bakr (RA) bought his freedom, and Bilal rose to become the Prophet ﷺ's own muezzin, the first to call the adhan in Islam. His voice rang out over Madinah for years, and after the conquest of Mecca he climbed atop the Ka'bah to proclaim the call to prayer.",
    "summaryBn": "বিলাল ইবনে রাবাহ (রাঃ) ছিলেন মক্কার একজন হাবশি দাস, যিনি সবচেয়ে আগের ঈমানদারদের মধ্যে ইসলাম গ্রহণ করেন। তাঁর মনিব উমাইয়া ইবনে খালাফ তাঁকে নির্মমভাবে নির্যাতন করত—তপ্ত বালির ওপর শুইয়ে বুকে ভারী পাথর চাপিয়ে ঈমান ত্যাগ করতে বাধ্য করার চেষ্টা করত, তবু বিলাল কেবল বলতেন \"আহাদ, আহাদ\"—\"এক, এক।\" আবু বকর (রাঃ) তাঁকে মুক্ত করেন, এবং বিলাল হন নবী ﷺ-এর মুয়াজ্জিন, ইসলামে প্রথম আজানদাতা। বছরের পর বছর তাঁর কণ্ঠ মদিনার আকাশে ধ্বনিত হয়েছে, এবং মক্কা বিজয়ের পর তিনি কাবার ছাদে উঠে আজান দেন।",
    "events": [
      {
        "en": "Embraced Islam early while enslaved in Mecca",
        "bn": "মক্কায় দাসত্বের মধ্যেই আগেভাগে ইসলাম গ্রহণ করেন"
      },
      {
        "en": "Tortured under a heavy rock yet held to his faith",
        "bn": "ভারী পাথরের নিচে নির্যাতিত হয়েও ঈমানে অবিচল থাকেন"
      },
      {
        "en": "Freed by Abu Bakr (RA), who purchased his liberty",
        "bn": "আবু বকর (রাঃ) অর্থ দিয়ে তাঁকে মুক্ত করেন"
      },
      {
        "en": "Became the first muezzin, calling the adhan for the Prophet ﷺ",
        "bn": "প্রথম মুয়াজ্জিন হন, নবী ﷺ-এর জন্য আজান দিতেন"
      },
      {
        "en": "Gave the adhan atop the Ka'bah after the conquest of Mecca",
        "bn": "মক্কা বিজয়ের পর কাবার ছাদে দাঁড়িয়ে আজান দেন"
      }
    ],
    "refs": [],
    "lessonEn": "No chains and no torment can enslave a heart devoted to the One God.",
    "lessonBn": "এক আল্লাহর প্রতি নিবেদিত হৃদয়কে কোনো শিকল বা নির্যাতন দাস বানাতে পারে না।"
  },
  {
    "id": "khabbab_ibn_al_aratt",
    "order": 11,
    "init": "KA",
    "color": "bg-fuchsia-500",
    "ar": "خَبَّاب بن الأَرَتّ",
    "translit": "Khabbab ibn al-Aratt",
    "en": "Khabbab ibn al-Aratt (RA)",
    "bn": "খাব্বাব ইবনুল আরাত (রাঃ)",
    "era": "persecution",
    "ashara": false,
    "caliph": false,
    "ansar": false,
    "woman": false,
    "roleEn": "The Tortured Blacksmith",
    "roleBn": "নির্যাতিত কর্মকার সাহাবি",
    "yearEn": "c. 585–657 CE",
    "highlightEn": "The fire of his tormentors could not melt his faith.",
    "highlightBn": "নির্যাতকদের আগুন তাঁর ঈমান গলাতে পারেনি।",
    "summaryEn": "Khabbab ibn al-Aratt (RA) was a blacksmith and among the first handful to embrace Islam in Mecca. Having no clan to protect him, he suffered brutal torture — his tormentors pressed him against burning coals until the fire seared his back. It was he and his companions who once came to the Prophet ﷺ complaining of their suffering, and were told the timeless promise that Allah would surely complete this religion. He lived to see Islam triumph, took part in the battles, and died in Kufa in 37 AH.",
    "summaryBn": "খাব্বাব ইবনুল আরাত (রাঃ) ছিলেন একজন কর্মকার এবং মক্কায় প্রথম মুষ্টিমেয় ইসলাম গ্রহণকারীদের একজন। তাঁকে রক্ষা করার মতো কোনো গোত্র না থাকায় তিনি ভয়াবহ নির্যাতনের শিকার হন—নির্যাতনকারীরা তাঁকে জ্বলন্ত অঙ্গারের ওপর চেপে ধরত, যতক্ষণ না আগুন তাঁর পিঠ ঝলসে দিত। তিনি ও তাঁর সঙ্গীরাই একদিন নবী ﷺ-এর কাছে তাঁদের কষ্টের অভিযোগ নিয়ে আসেন এবং সেই চিরন্তন প্রতিশ্রুতি শোনেন যে আল্লাহ অবশ্যই এই দ্বীনকে পূর্ণতা দেবেন। তিনি ইসলামের বিজয় দেখে যেতে পেরেছিলেন, যুদ্ধে অংশ নেন এবং ৩৭ হিজরিতে কুফায় ইন্তেকাল করেন।",
    "events": [
      {
        "en": "One of the first ten or so to accept Islam",
        "bn": "প্রথম দশজনের মতো ইসলাম গ্রহণকারীদের একজন"
      },
      {
        "en": "A blacksmith tortured over burning coals for his faith",
        "bn": "ঈমানের কারণে জ্বলন্ত অঙ্গারের ওপর নির্যাতিত কর্মকার"
      },
      {
        "en": "Complained of persecution and heard the Prophet ﷺ's promise of victory",
        "bn": "নির্যাতনের অভিযোগ জানিয়ে নবী ﷺ-এর বিজয়ের প্রতিশ্রুতি শোনেন"
      },
      {
        "en": "A debtor who owed him money mocked his faith, occasioning a Quranic rebuke",
        "bn": "তাঁর কাছে ঋণী এক ব্যক্তি তাঁর ঈমান নিয়ে ঠাট্টা করলে কুরআনে তার তিরস্কার নাজিল হয়"
      },
      {
        "en": "Fought in the battles and died in Kufa (37 AH)",
        "bn": "যুদ্ধে অংশ নেন এবং কুফায় ইন্তেকাল করেন (৩৭ হিজরি)"
      }
    ],
    "refs": [
      "19:77"
    ],
    "lessonEn": "The believer endures the fire of today trusting the promised dawn of tomorrow.",
    "lessonBn": "মুমিন আজকের আগুন সয়ে যায় আগামীর প্রতিশ্রুত ভোরের ভরসায়।"
  },
  {
    "id": "ammar_ibn_yasir",
    "order": 12,
    "init": "AY",
    "color": "bg-orange-500",
    "ar": "عَمَّار بن يَاسِر",
    "translit": "Ammar ibn Yasir",
    "en": "Ammar ibn Yasir (RA)",
    "bn": "আম্মার ইবনে ইয়াসির (রাঃ)",
    "era": "persecution",
    "ashara": false,
    "caliph": false,
    "ansar": false,
    "woman": false,
    "roleEn": "Son of the Martyred Family",
    "roleBn": "শহীদ পরিবারের সন্তান",
    "yearEn": "c. 570–657 CE",
    "highlightEn": "His whole family paid for faith — his mother the first martyr.",
    "highlightBn": "গোটা পরিবার ঈমানের মূল্য দিয়েছে—তাঁর মা প্রথম শহীদ।",
    "summaryEn": "Ammar ibn Yasir (RA) embraced Islam early alongside his father Yasir and mother Sumayyah (RA), and the whole family was tortured savagely in the sands of Mecca. His mother Sumayyah became the first martyr of Islam, and his father too died under the persecution. Ammar himself was tortured so severely that he was once forced to utter words of disbelief; grieving, he came to the Prophet ﷺ, and Allah revealed the verse excusing one compelled while his heart rests firm in faith. He lived a long life and was killed at the Battle of Siffin in 37 AH, fulfilling the Prophet ﷺ's foretelling that a transgressing party would slay him.",
    "summaryBn": "আম্মার ইবনে ইয়াসির (রাঃ) তাঁর পিতা ইয়াসির ও মাতা সুমাইয়া (রাঃ)-এর সঙ্গে আগেভাগেই ইসলাম গ্রহণ করেন, এবং গোটা পরিবারকে মক্কার বালিতে নির্মমভাবে নির্যাতন করা হয়। তাঁর মা সুমাইয়া (রাঃ) হন ইসলামের প্রথম শহীদ, এবং তাঁর পিতাও নির্যাতনের মধ্যে শহীদ হন। আম্মারকে এত কঠিনভাবে নির্যাতন করা হয় যে একবার তিনি বাধ্য হয়ে কুফরি বাক্য উচ্চারণ করে ফেলেন; ব্যথিত হয়ে তিনি নবী ﷺ-এর কাছে আসেন, তখন আল্লাহ সেই আয়াত নাজিল করেন যা ঈমানে অবিচল হৃদয় নিয়ে বাধ্য-অবস্থায় থাকা ব্যক্তিকে ক্ষমা করে। তিনি দীর্ঘ জীবন লাভ করেন এবং ৩৭ হিজরিতে সিফফিনের যুদ্ধে নিহত হন, যা নবী ﷺ-এর সেই ভবিষ্যদ্বাণী সত্য করে যে এক বিদ্রোহী দল তাঁকে হত্যা করবে।",
    "events": [
      {
        "en": "Accepted Islam early with his parents Yasir and Sumayyah (RA)",
        "bn": "পিতা ইয়াসির ও মাতা সুমাইয়া (রাঃ)-এর সঙ্গে আগেভাগে ইসলাম গ্রহণ"
      },
      {
        "en": "His mother Sumayyah (RA) became the first martyr of Islam",
        "bn": "তাঁর মা সুমাইয়া (রাঃ) ইসলামের প্রথম শহীদ হন"
      },
      {
        "en": "Forced under torture to utter disbelief; a verse excused him",
        "bn": "নির্যাতনে বাধ্য হয়ে কুফরি বলেন; আয়াত নাজিল হয়ে তাঁকে ক্ষমা করে"
      },
      {
        "en": "The Prophet ﷺ foretold a transgressing party would kill him",
        "bn": "নবী ﷺ ভবিষ্যদ্বাণী করেন যে এক বিদ্রোহী দল তাঁকে হত্যা করবে"
      },
      {
        "en": "Killed at the Battle of Siffin at about ninety years of age (37 AH)",
        "bn": "প্রায় নব্বই বছর বয়সে সিফফিনের যুদ্ধে নিহত হন (৩৭ হিজরি)"
      }
    ],
    "refs": [
      "16:106"
    ],
    "lessonEn": "Allah judges the steadfast heart, not words wrung out by unbearable force.",
    "lessonBn": "আল্লাহ অবিচল হৃদয়ের বিচার করেন, অসহনীয় চাপে বেরিয়ে আসা কথার নয়।"
  },
  {
    "id": "jafar_ibn_abi_talib",
    "order": 13,
    "init": "JT",
    "color": "bg-red-600",
    "ar": "جعفر بن أبي طالب",
    "translit": "Jafar ibn Abi Talib",
    "en": "Jafar ibn Abi Talib (RA)",
    "bn": "জাফর ইবনে আবি তালিব (রাঃ)",
    "era": "persecution",
    "ashara": false,
    "caliph": false,
    "ansar": false,
    "woman": false,
    "roleEn": "Leader of the Abyssinia Hijra",
    "roleBn": "আবিসিনিয়া হিজরতের নেতা",
    "yearEn": "c. 590-629 CE",
    "highlightEn": "Given two wings in Paradise for arms lost at Mutah.",
    "highlightBn": "মুতায় হারানো দুই হাতের বদলে জান্নাতে পেলেন দুটি ডানা।",
    "summaryEn": "He was a cousin of the Prophet Muhammad (peace be upon him) and the elder brother of Ali (RA), resembling the Prophet in both looks and character. He led the second emigration of Muslims to Abyssinia and defended Islam before the Negus, the Christian king, by reciting Surah Maryam. Returning to Madinah after the conquest of Khaybar, the Prophet said he did not know which delighted him more, Khaybar's victory or Jafar's arrival. At the Battle of Mutah (8 AH) he carried the banner until both his arms were severed and he was martyred; the Prophet said Allah had given him two wings in Paradise, earning him the names 'at-Tayyar' (the Flyer) and 'Dhul-Janahayn'.",
    "summaryBn": "তিনি ছিলেন নবী মুহাম্মদ (সাঃ)-এর চাচাতো ভাই এবং আলী (রাঃ)-এর বড় ভাই; চেহারা ও চরিত্রে তিনি নবীজির সাথে সাদৃশ্যপূর্ণ ছিলেন। তিনি আবিসিনিয়ায় দ্বিতীয় হিজরতের নেতৃত্ব দেন এবং খ্রিস্টান বাদশাহ নাজ্জাশির দরবারে সূরা মারইয়াম তিলাওয়াত করে ইসলামের পক্ষে অসাধারণ বক্তব্য রাখেন। খায়বার বিজয়ের পর তিনি মদিনায় ফিরে আসেন, আর নবীজি বলেন তিনি বুঝতে পারছেন না—খায়বার বিজয়ে বেশি খুশি, নাকি জাফরের আগমনে। মুতার যুদ্ধে (৮ হিজরি) পতাকা বহন করতে গিয়ে তাঁর দুই হাত কাটা পড়ে ও তিনি শহীদ হন; নবীজি জানান আল্লাহ তাঁকে জান্নাতে দুটি ডানা দিয়েছেন, তাই তাঁকে বলা হয় 'আত-তাইয়ার' (উড়ন্ত) ও 'জুল-জানাহাইন'।",
    "events": [
      {
        "en": "Led the second emigration of Muslims to Abyssinia",
        "bn": "মুসলিমদের দ্বিতীয় দল নিয়ে আবিসিনিয়ায় হিজরত করেন"
      },
      {
        "en": "Defended Islam before the Negus, reciting Surah Maryam",
        "bn": "নাজ্জাশির দরবারে সূরা মারইয়াম পড়ে ইসলামের পক্ষে দাঁড়ান"
      },
      {
        "en": "Returned to Madinah after the conquest of Khaybar",
        "bn": "খায়বার বিজয়ের পর মদিনায় ফিরে আসেন"
      },
      {
        "en": "Carried the banner and was martyred at the Battle of Mutah",
        "bn": "মুতার যুদ্ধে পতাকা বহন করে শহীদ হন"
      }
    ],
    "refs": [],
    "lessonEn": "Stand for the truth with wisdom, even before kings.",
    "lessonBn": "প্রজ্ঞার সাথে সত্যের পক্ষে দাঁড়াও, বাদশাহদের সামনেও।"
  },
  {
    "id": "sumayyah_bint_khayyat",
    "order": 14,
    "init": "SK",
    "color": "bg-blue-600",
    "ar": "سمية بنت خياط",
    "translit": "Sumayyah bint Khayyat",
    "en": "Sumayyah bint Khayyat (RA)",
    "bn": "সুমাইয়া বিনতে খাইয়াত (রাঃ)",
    "era": "persecution",
    "ashara": false,
    "caliph": false,
    "ansar": false,
    "woman": true,
    "roleEn": "First Martyr of Islam",
    "roleBn": "ইসলামের প্রথম শহীদ",
    "yearEn": "d. c. 615 CE",
    "highlightEn": "The first person to be martyred for Islam.",
    "highlightBn": "ইসলামের পথে প্রথম শাহাদাতবরণকারী।",
    "summaryEn": "Sumayyah bint Khayyat (RA) was among the earliest to accept Islam and among the most oppressed, for she was a vulnerable freed slave without a powerful clan to protect her. Together with her husband Yasir and son Ammar, she was tortured mercilessly in the scorching heat of Makkah to force her to renounce her faith, yet she refused. Passing by, the Prophet (peace be upon him) comforted the family, promising them Paradise. Sumayyah was killed by Abu Jahl for her steadfastness, becoming the first martyr in the history of Islam.",
    "summaryBn": "সুমাইয়া বিনতে খাইয়াত (রাঃ) ছিলেন ইসলাম গ্রহণকারী সর্বপ্রথমদের একজন এবং সবচেয়ে নির্যাতিতদের অন্যতম, কেননা তিনি ছিলেন এক অসহায় মুক্ত-দাসী, যাঁকে রক্ষা করার মতো কোনো শক্তিশালী গোত্র ছিল না। স্বামী ইয়াসির ও পুত্র আম্মারের সাথে মক্কার প্রখর রোদে তাঁকে নির্মমভাবে নির্যাতন করা হতো যেন তিনি ঈমান ত্যাগ করেন, কিন্তু তিনি অস্বীকার করেন। পথ দিয়ে যাওয়ার সময় নবী (সাঃ) এই পরিবারকে সান্ত্বনা দেন এবং জান্নাতের সুসংবাদ দেন। নিজের অবিচলতার জন্য সুমাইয়া আবু জাহলের হাতে নিহত হন এবং ইসলামের ইতিহাসে প্রথম শহীদে পরিণত হন।",
    "events": [
      {
        "en": "Among the first believers, a freed slave without tribal protection",
        "bn": "প্রথম ঈমানদারদের একজন, গোত্রীয় আশ্রয়হীন এক মুক্ত-দাসী"
      },
      {
        "en": "Tortured with her family in the heat of Makkah to force apostasy",
        "bn": "ঈমান ত্যাগে বাধ্য করতে পরিবারসহ মক্কার রোদে নির্যাতিতা হন"
      },
      {
        "en": "Comforted by the Prophet with the promise of Paradise",
        "bn": "নবী কর্তৃক জান্নাতের প্রতিশ্রুতিতে সান্ত্বনা লাভ করেন"
      },
      {
        "en": "Refused to renounce her faith despite the torment",
        "bn": "নির্যাতন সত্ত্বেও ঈমান ত্যাগ করতে অস্বীকার করেন"
      },
      {
        "en": "Killed by Abu Jahl, becoming Islam's first martyr",
        "bn": "আবু জাহলের হাতে নিহত হয়ে ইসলামের প্রথম শহীদ হন"
      }
    ],
    "refs": [],
    "lessonEn": "Some souls purchase eternity with the price of unbroken faith.",
    "lessonBn": "কিছু আত্মা অটল ঈমানের বিনিময়ে চিরস্থায়ী জান্নাত ক্রয় করে নেয়।"
  },
  {
    "id": "musab_ibn_umayr",
    "order": 15,
    "init": "MU",
    "color": "bg-green-600",
    "ar": "مُصْعَب بن عُمَيْر",
    "translit": "Musab ibn Umayr",
    "en": "Musab ibn Umayr (RA)",
    "bn": "মুসআব ইবনে উমাইর (রাঃ)",
    "era": "hijra",
    "ashara": false,
    "caliph": false,
    "ansar": false,
    "woman": false,
    "roleEn": "The First Ambassador of Islam",
    "roleBn": "ইসলামের প্রথম দূত ও শহীদ",
    "yearEn": "d. 3 AH / 625 CE",
    "highlightEn": "The pampered noble whose shroud could not cover him.",
    "highlightBn": "সেই আদুরে অভিজাত, যাঁর কাফনও দেহ ঢাকতে পারেনি।",
    "summaryEn": "Musab ibn Umayr (RA) was a pampered young noble of Mecca, famed for his fine clothes and comfort, until he embraced Islam and his family cut him off, leaving him to endure hardship for his faith. The Prophet ﷺ chose him as the first teacher and ambassador of Islam, sending him to Madinah after the first Pledge of Aqaba, where through his gentle wisdom the leaders and people of the city entered Islam in numbers. He carried the banner of the Muslims at the Battle of Uhud and was martyred defending the Prophet ﷺ. So poor had he become that when he died there was not enough cloth to fully shroud his body — a striking sign of all he had given up for Allah.",
    "summaryBn": "মুসআব ইবনে উমাইর (রাঃ) ছিলেন মক্কার একজন আদুরে অভিজাত যুবক, তাঁর দামি পোশাক ও বিলাসিতার জন্য বিখ্যাত—যতক্ষণ না তিনি ইসলাম গ্রহণ করেন এবং তাঁর পরিবার তাঁকে ত্যাগ করে, ফলে তিনি ঈমানের জন্য কষ্ট বরণ করেন। নবী ﷺ তাঁকে ইসলামের প্রথম শিক্ষক ও দূত হিসেবে বেছে নেন এবং প্রথম আকাবার শপথের পর মদিনায় পাঠান, যেখানে তাঁর কোমল প্রজ্ঞায় শহরের নেতা ও জনগণ দলে দলে ইসলামে প্রবেশ করে। উহুদের যুদ্ধে তিনি মুসলিমদের পতাকা বহন করেন এবং নবী ﷺ-কে রক্ষা করতে গিয়ে শহীদ হন। তিনি এতটাই নিঃস্ব হয়ে গিয়েছিলেন যে মৃত্যুর সময় তাঁর দেহ পুরোপুরি ঢাকার মতো কাপড়ও ছিল না—আল্লাহর পথে তাঁর সব বিসর্জনের এক মর্মস্পর্শী নিদর্শন।",
    "events": [
      {
        "en": "A luxury-loving Meccan youth who gave it all up for Islam",
        "bn": "বিলাসপ্রিয় মক্কি যুবক, যিনি ইসলামের জন্য সব ছেড়ে দেন"
      },
      {
        "en": "Disowned and made to suffer by his own family for his faith",
        "bn": "ঈমানের কারণে নিজ পরিবার কর্তৃক পরিত্যক্ত ও নির্যাতিত হন"
      },
      {
        "en": "Sent as Islam's first teacher and envoy to Madinah",
        "bn": "ইসলামের প্রথম শিক্ষক ও দূত হিসেবে মদিনায় প্রেরিত হন"
      },
      {
        "en": "Led many of Madinah's leaders and people to Islam",
        "bn": "মদিনার বহু নেতা ও জনগণকে ইসলামের দিকে পরিচালিত করেন"
      },
      {
        "en": "Carried the banner and was martyred at the Battle of Uhud (3 AH)",
        "bn": "উহুদের যুদ্ধে পতাকা বহন করেন এবং শহীদ হন (৩ হিজরি)"
      }
    ],
    "refs": [],
    "lessonEn": "Sincere faith can turn a pampered youth into a giant of da'wah and sacrifice.",
    "lessonBn": "আন্তরিক ঈমান একজন আদুরে যুবককে দাওয়াত ও ত্যাগের মহানায়কে পরিণত করতে পারে।"
  },
  {
    "id": "sad_ibn_ubadah",
    "order": 16,
    "init": "SU",
    "color": "bg-purple-600",
    "ar": "سعد بن عبادة",
    "translit": "Sad ibn Ubadah",
    "en": "Sa'd ibn 'Ubadah (RA)",
    "bn": "সাদ ইবনে উবাদা (রাঃ)",
    "era": "hijra",
    "ashara": false,
    "caliph": false,
    "ansar": true,
    "woman": false,
    "roleEn": "Chief of the Khazraj",
    "roleBn": "খাযরাজ গোত্রের প্রধান",
    "yearEn": "d. c. 14 AH / 635 CE",
    "highlightEn": "The generous chief of Khazraj, feeding hundreds daily.",
    "highlightBn": "খাযরাজের দানবীর প্রধান, প্রতিদিন শত শত মানুষকে খাওয়াতেন।",
    "summaryEn": "Sa'd ibn 'Ubadah (RA) was the chief of the Khazraj tribe and one of the twelve naqibs (representatives) who pledged allegiance at al-Aqabah. He was renowned for extraordinary generosity, feeding great numbers of people continuously. He carried the banner of the Ansar in the campaigns. After the Prophet ﷺ passed away, his name was raised for leadership at Saqifat Bani Sa'ida, but the community united behind Abu Bakr (RA). He later died in the region of Hawran in Syria.",
    "summaryBn": "সাদ ইবনে উবাদা (রাঃ) ছিলেন খাযরাজ গোত্রের প্রধান এবং আকাবার শপথে অংশ নেওয়া বারো জন নকীবের একজন। তিনি ছিলেন অসাধারণ দানশীল—অগণিত মানুষকে নিয়মিত খাওয়াতেন। যুদ্ধাভিযানে তিনি আনসারদের পতাকা বহন করতেন। নবীজি ﷺ-এর ইন্তেকালের পর সাকীফায় তাঁকে নেতৃত্বের জন্য প্রস্তাব করা হলেও উম্মত আবু বকর (রাঃ)-এর হাতে ঐক্যবদ্ধ হয়। পরে তিনি সিরিয়ার হাওরান অঞ্চলে ইন্তেকাল করেন।",
    "events": [
      {
        "en": "One of the twelve naqibs pledging at al-Aqabah",
        "bn": "আকাবায় শপথ নেওয়া বারো জন নকীবের একজন"
      },
      {
        "en": "Renowned for boundless hospitality and generosity",
        "bn": "অসীম আতিথেয়তা ও দানশীলতার জন্য প্রসিদ্ধ"
      },
      {
        "en": "Bore the banner of the Ansar in the campaigns",
        "bn": "যুদ্ধাভিযানে আনসারদের পতাকা বহন করেন"
      },
      {
        "en": "His name raised for leadership at Saqifat Bani Sa'ida",
        "bn": "সাকীফায় নেতৃত্বের জন্য তাঁর নাম প্রস্তাব করা হয়"
      },
      {
        "en": "Died in the region of Hawran in Syria",
        "bn": "সিরিয়ার হাওরান অঞ্চলে ইন্তেকাল করেন"
      }
    ],
    "refs": [],
    "lessonEn": "Generosity and sincerity outshine the pursuit of power.",
    "lessonBn": "ক্ষমতার পেছনে ছোটার চেয়ে দানশীলতা ও নিষ্ঠা অনেক বড়।"
  },
  {
    "id": "abu_ayyub_al_ansari",
    "order": 17,
    "init": "AA",
    "color": "bg-amber-600",
    "ar": "أبو أيوب الأنصاري",
    "translit": "Abu Ayyub al-Ansari",
    "en": "Abu Ayyub al-Ansari (RA)",
    "bn": "আবু আইয়ুব আল-আনসারি (রাঃ)",
    "era": "hijra",
    "ashara": false,
    "caliph": false,
    "ansar": true,
    "woman": false,
    "roleEn": "Host of the Prophet ﷺ",
    "roleBn": "নবীজি ﷺ-এর মেজবান",
    "yearEn": "d. c. 52 AH / 672 CE",
    "highlightEn": "The Prophet's ﷺ camel chose his home in Madinah.",
    "highlightBn": "নবীজি ﷺ-এর উটনি মদিনায় তাঁরই ঘর বেছে নিয়েছিল।",
    "summaryEn": "Abu Ayyub al-Ansari (RA), whose name was Khalid ibn Zayd, was of the Khazraj. When the Prophet ﷺ arrived in Madinah, his camel came to rest at Abu Ayyub's house, and he hosted the Prophet ﷺ in his home for about seven months. He took part in Badr, Uhud, and the later battles and narrated hadith. In his old age he joined the Muslim campaign toward Constantinople and died during its siege, being buried beside the city's walls.",
    "summaryBn": "আবু আইয়ুব আল-আনসারি (রাঃ)—যাঁর নাম খালিদ ইবনে যায়িদ—ছিলেন খাযরাজ গোত্রের। নবীজি ﷺ মদিনায় পৌঁছালে তাঁর উটনি আবু আইয়ুবের বাড়ির সামনে থামে, আর তিনি প্রায় সাত মাস নবীজি ﷺ-কে আপন গৃহে আতিথ্য দেন। তিনি বদর, উহুদসহ পরবর্তী যুদ্ধগুলোতে অংশ নেন ও হাদিস বর্ণনা করেন। বৃদ্ধ বয়সে তিনি কনস্টান্টিনোপল অভিযানে যোগ দেন এবং সেখানকার অবরোধকালে ইন্তেকাল করেন ও নগরপ্রাচীরের পাশে সমাহিত হন।",
    "events": [
      {
        "en": "Hosted the Prophet ﷺ in his home upon the Hijra",
        "bn": "হিজরতের সময় নবীজি ﷺ-কে আপন গৃহে আতিথ্য দেন"
      },
      {
        "en": "Took part in Badr, Uhud, and the later battles",
        "bn": "বদর, উহুদ ও পরবর্তী যুদ্ধে অংশ নেন"
      },
      {
        "en": "Narrated hadith from the Prophet ﷺ",
        "bn": "নবীজি ﷺ থেকে হাদিস বর্ণনা করেন"
      },
      {
        "en": "Joined the campaign toward Constantinople in old age",
        "bn": "বৃদ্ধ বয়সে কনস্টান্টিনোপল অভিযানে যোগ দেন"
      },
      {
        "en": "Died during the siege and was buried by the city walls",
        "bn": "অবরোধকালে ইন্তেকাল করেন ও নগরপ্রাচীরের পাশে সমাহিত হন"
      }
    ],
    "refs": [],
    "lessonEn": "Serve the truth at every age, from youth to your final days.",
    "lessonBn": "যৌবন থেকে জীবনের শেষ দিন পর্যন্ত সত্যের সেবা করে যাও।"
  },
  {
    "id": "ubadah_ibn_as_samit",
    "order": 18,
    "init": "US",
    "color": "bg-rose-600",
    "ar": "عبادة بن الصامت",
    "translit": "Ubadah ibn as-Samit",
    "en": "Ubadah ibn as-Samit (RA)",
    "bn": "উবাদা ইবনে সামিত (রাঃ)",
    "era": "hijra",
    "ashara": false,
    "caliph": false,
    "ansar": true,
    "woman": false,
    "roleEn": "Naqib and Teacher of Quran",
    "roleBn": "নকীব ও কুরআনের শিক্ষক",
    "yearEn": "d. c. 34 AH / 654 CE",
    "highlightEn": "Pledged to speak truth, fearing the blame of none.",
    "highlightBn": "কারও নিন্দার ভয় না করে সত্য বলার শপথ নিয়েছিলেন।",
    "summaryEn": "Ubadah ibn as-Samit (RA) was of the Khazraj and one of the twelve naqibs who pledged at al-Aqabah. He fought at Badr and the major battles that followed. He was firm in truth, having pledged to obey and to speak the truth fearing no one's blame. Umar (RA) sent him to Syria and Palestine as a teacher of the Quran and a judge, and he narrated hadith and taught the next generation.",
    "summaryBn": "উবাদা ইবনে সামিত (রাঃ) ছিলেন খাযরাজ গোত্রের এবং আকাবায় শপথ নেওয়া বারো জন নকীবের একজন। তিনি বদর ও পরবর্তী বড় বড় যুদ্ধে অংশ নেন। সত্যের ব্যাপারে তিনি ছিলেন অটল—কোনো নিন্দুকের নিন্দার ভয় না করে আনুগত্য ও সত্য বলার শপথ নিয়েছিলেন। উমার (রাঃ) তাঁকে সিরিয়া ও ফিলিস্তিনে কুরআনের শিক্ষক ও বিচারক হিসেবে পাঠান; তিনি হাদিস বর্ণনা করেন ও পরবর্তী প্রজন্মকে শিক্ষা দেন।",
    "events": [
      {
        "en": "One of the twelve naqibs at the pledge of al-Aqabah",
        "bn": "আকাবার শপথে বারো জন নকীবের একজন"
      },
      {
        "en": "Fought at Badr and the subsequent battles",
        "bn": "বদর ও পরবর্তী যুদ্ধগুলোতে অংশ নেন"
      },
      {
        "en": "Pledged to obey and speak truth without fearing blame",
        "bn": "নিন্দার ভয় না করে আনুগত্য ও সত্য বলার শপথ নেন"
      },
      {
        "en": "Sent by Umar to teach the Quran in Syria and Palestine",
        "bn": "উমার (রাঃ) তাঁকে সিরিয়া ও ফিলিস্তিনে কুরআন শেখাতে পাঠান"
      },
      {
        "en": "Served as a judge and narrated hadith",
        "bn": "বিচারক হিসেবে দায়িত্ব পালন করেন ও হাদিস বর্ণনা করেন"
      }
    ],
    "refs": [],
    "lessonEn": "Stand firm on the truth without fear of anyone's blame.",
    "lessonBn": "কারও নিন্দার পরোয়া না করে সত্যের উপর অবিচল থাকো।"
  },
  {
    "id": "fatimah_az_zahra",
    "order": 19,
    "init": "FZ",
    "color": "bg-amber-500",
    "ar": "فاطمة الزهراء",
    "translit": "Fatimah az-Zahra",
    "en": "Fatimah az-Zahra (RA)",
    "bn": "ফাতিমা আয-যাহরা (রাঃ)",
    "era": "hijra",
    "ashara": false,
    "caliph": false,
    "ansar": false,
    "woman": true,
    "roleEn": "Daughter of the Prophet",
    "roleBn": "নবীকন্যা, জান্নাতি নারীদের নেত্রী",
    "yearEn": "c. 605-632 CE",
    "highlightEn": "\"The leader of the women of Paradise,\" said her father the Prophet.",
    "highlightBn": "নবী বলেছেন: \"সে জান্নাতের নারীদের নেত্রী।\"",
    "summaryEn": "Fatimah (RA) was the youngest and most beloved daughter of the Prophet Muhammad (peace be upon him) and his wife Khadijah. She grew up amid the persecution of Makkah, once rushing to clean filth thrown on her prostrating father by the Quraysh. She married Ali ibn Abi Talib and lived a humble, hardworking life, and their sons Hasan and Husayn became the Prophet's cherished grandsons. The Prophet said she was the leader of the women of Paradise, and she was the first of his family to be reunited with him, passing away only months after him.",
    "summaryBn": "ফাতিমা (রাঃ) ছিলেন নবী মুহাম্মদ (সাঃ) ও খাদিজা (রাঃ)-এর সর্বকনিষ্ঠ ও সবচেয়ে প্রিয় কন্যা। মক্কার নির্যাতনের মধ্যে বেড়ে ওঠা এই কন্যা একবার সিজদারত পিতার উপর কুরাইশদের নিক্ষিপ্ত ময়লা দৌড়ে গিয়ে পরিষ্কার করেছিলেন। তিনি আলী ইবনে আবি তালিবের সাথে বিবাহবন্ধনে আবদ্ধ হন এবং বিনয়ী ও পরিশ্রমী জীবন যাপন করেন; তাঁদের পুত্র হাসান ও হুসাইন নবীর প্রিয় দৌহিত্রে পরিণত হন। নবী বলেছেন তিনি জান্নাতের নারীদের নেত্রী, এবং নবীর ইন্তিকালের কয়েক মাস পরই পরিবারের মধ্যে সর্বপ্রথম তিনি তাঁর সাথে মিলিত হন।",
    "events": [
      {
        "en": "Cleaned filth off her father as he prayed at the Kaaba",
        "bn": "কাবার নিকট নামাজরত পিতার উপর থেকে ময়লা পরিষ্কার করেন"
      },
      {
        "en": "Migrated to Madinah and married Ali ibn Abi Talib",
        "bn": "মদিনায় হিজরত করেন এবং আলী ইবনে আবি তালিবকে বিবাহ করেন"
      },
      {
        "en": "Mother of Hasan and Husayn, the Prophet's beloved grandsons",
        "bn": "নবীর প্রিয় দৌহিত্র হাসান ও হুসাইনের জননী"
      },
      {
        "en": "Included in the 'People of the House' (Ahl al-Bayt)",
        "bn": "'আহলে বাইতের' অন্তর্ভুক্ত"
      },
      {
        "en": "First of the Prophet's household to join him after his death",
        "bn": "নবীর ইন্তিকালের পর পরিবারে সর্বপ্রথম তাঁর সাথে মিলিত হন"
      }
    ],
    "refs": [
      "33:33"
    ],
    "lessonEn": "Nearness to the Prophet is measured by character, humility, and faith.",
    "lessonBn": "নবীর নৈকট্য পরিমাপ হয় চরিত্র, বিনয় ও ঈমান দিয়ে।"
  },
  {
    "id": "asma_bint_abi_bakr",
    "order": 20,
    "init": "AB",
    "color": "bg-rose-500",
    "ar": "أسماء بنت أبي بكر",
    "translit": "Asma bint Abi Bakr",
    "en": "Asma bint Abi Bakr (RA)",
    "bn": "আসমা বিনতে আবু বকর (রাঃ)",
    "era": "hijra",
    "ashara": false,
    "caliph": false,
    "ansar": false,
    "woman": true,
    "roleEn": "Dhat an-Nitaqayn (Two Belts)",
    "roleBn": "যাতুন নিতাকাইন (দুই কোমরবন্ধের অধিকারিণী)",
    "yearEn": "c. 595-692 CE",
    "highlightEn": "She tore her belt in two to provision the Hijra.",
    "highlightBn": "হিজরতে রসদ জোগাতে নিজের কোমরবন্ধ দুই ভাগে ছিঁড়েছিলেন।",
    "summaryEn": "Asma (RA), the elder daughter of Abu Bakr, played a courageous role in the Hijra by secretly carrying food to the Prophet (peace be upon him) and her father hiding in the Cave of Thawr. She tore her waistband in two to tie the provisions, earning from the Prophet the title 'Dhat an-Nitaqayn' — 'She of the Two Belts.' Though heavily pregnant, she migrated to Madinah, where she gave birth to Abdullah ibn az-Zubayr, the first child born to the Muhajirun. Strong and steadfast to the end, she lived about a hundred years, dying shortly after the martyrdom of her son.",
    "summaryBn": "আসমা (রাঃ), আবু বকরের বড় কন্যা, হিজরতে সাহসী ভূমিকা পালন করেন; সাওর গুহায় লুকিয়ে থাকা নবী (সাঃ) ও তাঁর পিতার কাছে গোপনে খাবার পৌঁছে দিতেন। খাদ্যসামগ্রী বাঁধতে তিনি নিজের কোমরবন্ধ দুই ভাগ করে ছিঁড়ে ফেলেন, যার জন্য নবী তাঁকে 'যাতুন নিতাকাইন'—'দুই কোমরবন্ধের অধিকারিণী' উপাধি দেন। অন্তঃসত্ত্বা অবস্থাতেও তিনি মদিনায় হিজরত করেন এবং সেখানে জন্ম দেন আবদুল্লাহ ইবনুয যুবাইরকে, যিনি মুহাজিরদের মধ্যে জন্ম নেওয়া প্রথম সন্তান। শেষ পর্যন্ত দৃঢ় ও অবিচল এই নারী প্রায় একশো বছর জীবিত ছিলেন এবং পুত্রের শাহাদাতের অল্প পরেই ইন্তিকাল করেন।",
    "events": [
      {
        "en": "Secretly carried food to the Prophet and Abu Bakr in the Cave of Thawr",
        "bn": "সাওর গুহায় নবী ও আবু বকরের কাছে গোপনে খাবার পৌঁছে দেন"
      },
      {
        "en": "Named 'Dhat an-Nitaqayn' for tearing her belt in two",
        "bn": "কোমরবন্ধ দুই ভাগ করায় 'যাতুন নিতাকাইন' উপাধি পান"
      },
      {
        "en": "Migrated while pregnant and bore Abdullah ibn az-Zubayr in Madinah",
        "bn": "অন্তঃসত্ত্বা অবস্থায় হিজরত করে মদিনায় আবদুল্লাহ ইবনুয যুবাইরকে জন্ম দেন"
      },
      {
        "en": "Kind to her non-Muslim mother, prompting a verse of the Quran",
        "bn": "অমুসলিম মাতার প্রতি সদয় আচরণ, যা কুরআনের আয়াত নাজিলের উপলক্ষ হয়"
      },
      {
        "en": "Comforted her son Abdullah with courage before his martyrdom",
        "bn": "পুত্র আবদুল্লাহকে তাঁর শাহাদাতের পূর্বে সাহসের সাথে সান্ত্বনা দেন"
      }
    ],
    "refs": [
      "60:8"
    ],
    "lessonEn": "Courage and quiet service can shape the destiny of a whole community.",
    "lessonBn": "সাহস ও নীরব সেবা একটি গোটা সমাজের ভাগ্য গড়ে দিতে পারে।"
  },
  {
    "id": "ali_ibn_abi_talib",
    "order": 21,
    "init": "AT",
    "color": "bg-emerald-500",
    "ar": "عَلِيُّ بْنُ أَبِي طَالِب",
    "translit": "Ali ibn Abi Talib",
    "en": "Ali ibn Abi Talib (RA)",
    "bn": "আলী ইবনে আবি তালিব (রাঃ)",
    "era": "battles",
    "ashara": true,
    "caliph": true,
    "ansar": false,
    "woman": false,
    "roleEn": "The Fourth Caliph",
    "roleBn": "চতুর্থ খলিফা",
    "yearEn": "c. 600-661 CE",
    "highlightEn": "He slept in the Prophet's bed on the Hijra night.",
    "highlightBn": "হিজরতের রাতে তিনি নবীজির বিছানায় শয়ন করেন।",
    "summaryEn": "Ali was the cousin of the Prophet (peace be upon him), raised in his household, and the first among the young to embrace Islam. Renowned for his courage, deep knowledge, and eloquence, he slept in the Prophet's bed on the night of the Hijra to protect him. He married the Prophet's daughter Fatimah and was the father of al-Hasan and al-Husayn. He fought valiantly at Badr and Uhud, and at Khaybar the Prophet gave him the standard and God granted victory at his hands. As the fourth Caliph he led the community through a period of great trial before being martyred in Kufa.",
    "summaryBn": "আলী (রাঃ) ছিলেন নবী (সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম)-এর চাচাতো ভাই, তাঁর গৃহে প্রতিপালিত এবং কিশোরদের মধ্যে প্রথম ইসলাম গ্রহণকারী। সাহসিকতা, গভীর জ্ঞান ও বাগ্মিতার জন্য খ্যাত তিনি হিজরতের রাতে নবীজিকে রক্ষা করতে তাঁর বিছানায় শয়ন করেন। তিনি নবীজির কন্যা ফাতিমাকে বিয়ে করেন এবং হাসান ও হুসাইনের পিতা ছিলেন। বদর ও উহুদে বীরত্বের সাথে যুদ্ধ করেন এবং খায়বারে নবীজি তাঁকে পতাকা প্রদান করেন, আর তাঁরই হাতে আল্লাহ বিজয় দান করেন। চতুর্থ খলিফা হিসেবে তিনি এক কঠিন পরীক্ষার সময়ে উম্মাহর নেতৃত্ব দেন, অতঃপর কুফায় শহীদ হন।",
    "events": [
      {
        "en": "First among the young to embrace Islam, raised by the Prophet",
        "bn": "কিশোরদের মধ্যে প্রথম ইসলাম গ্রহণ, নবীজি কর্তৃক প্রতিপালিত"
      },
      {
        "en": "Slept in the Prophet's bed on the night of the Hijra",
        "bn": "হিজরতের রাতে নবীজির বিছানায় শয়ন করেন"
      },
      {
        "en": "Married Fatimah; father of al-Hasan and al-Husayn",
        "bn": "ফাতিমাকে বিয়ে করেন; হাসান ও হুসাইনের পিতা"
      },
      {
        "en": "Fought at Badr and Uhud; bore the standard at Khaybar",
        "bn": "বদর ও উহুদে যুদ্ধ করেন; খায়বারে পতাকা বহন করেন"
      },
      {
        "en": "Became the fourth Rightly-Guided Caliph",
        "bn": "চতুর্থ খুলাফায়ে রাশিদীন হন"
      }
    ],
    "refs": [],
    "lessonEn": "Knowledge and courage together make a servant of God truly great.",
    "lessonBn": "জ্ঞান ও সাহস একত্রে আল্লাহর একজন বান্দাকে সত্যিকার মহান করে তোলে।"
  },
  {
    "id": "hamza_ibn_abd_al_muttalib",
    "order": 22,
    "init": "HM",
    "color": "bg-indigo-500",
    "ar": "حَمْزَةُ بْنُ عَبْدِ الْمُطَّلِب",
    "translit": "Hamza ibn Abd al-Muttalib",
    "en": "Hamza ibn Abd al-Muttalib (RA)",
    "bn": "হামজা ইবনে আব্দুল মুত্তালিব (রাঃ)",
    "era": "battles",
    "ashara": false,
    "caliph": false,
    "ansar": false,
    "woman": false,
    "roleEn": "Lion of God, Chief of Martyrs",
    "roleBn": "আল্লাহর সিংহ, শহীদদের সরদার",
    "yearEn": "d. 625 CE (3 AH)",
    "highlightEn": "The Lion of God, martyred at Uhud.",
    "highlightBn": "আল্লাহর সিংহ, উহুদে শহীদ।",
    "summaryEn": "Hamza was the paternal uncle and foster-brother of the Prophet (peace be upon him), a strong and noble warrior of Quraysh. When he embraced Islam, his conversion gave great strength and honor to the persecuted Muslims of Mecca. He fought heroically at the Battle of Badr and was known for his fearless courage. He was martyred at the Battle of Uhud by Wahshi, and the Prophet mourned him deeply, honoring him with the titles 'Lion of God' and 'Chief of the Martyrs.'",
    "summaryBn": "হামজা (রাঃ) ছিলেন নবী (সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম)-এর চাচা ও দুধভাই, কুরাইশের একজন শক্তিশালী ও অভিজাত যোদ্ধা। তিনি ইসলাম গ্রহণ করলে তাঁর এই গ্রহণ মক্কার নির্যাতিত মুসলিমদের বিরাট শক্তি ও সম্মান এনে দেয়। তিনি বদরের যুদ্ধে বীরত্বের সাথে লড়েন এবং নির্ভীক সাহসিকতার জন্য পরিচিত ছিলেন। উহুদের যুদ্ধে ওয়াহশির হাতে তিনি শহীদ হন, এবং নবীজি গভীরভাবে শোকাহত হয়ে তাঁকে 'আল্লাহর সিংহ' ও 'শহীদদের সরদার' উপাধিতে সম্মানিত করেন।",
    "events": [
      {
        "en": "Uncle and foster-brother of the Prophet",
        "bn": "নবীজির চাচা ও দুধভাই"
      },
      {
        "en": "His embrace of Islam strengthened the early Muslims",
        "bn": "তাঁর ইসলাম গ্রহণ প্রাথমিক মুসলিমদের শক্তিশালী করে"
      },
      {
        "en": "Fought heroically at the Battle of Badr",
        "bn": "বদরের যুদ্ধে বীরত্বের সাথে লড়েন"
      },
      {
        "en": "Martyred at the Battle of Uhud",
        "bn": "উহুদের যুদ্ধে শহীদ হন"
      },
      {
        "en": "Honored as 'Lion of God' and 'Chief of the Martyrs'",
        "bn": "'আল্লাহর সিংহ' ও 'শহীদদের সরদার' হিসেবে সম্মানিত"
      }
    ],
    "refs": [],
    "lessonEn": "Courage in defending the truth earns an honored place with God.",
    "lessonBn": "সত্যের প্রতিরক্ষায় সাহসিকতা আল্লাহর কাছে সম্মানের স্থান এনে দেয়।"
  },
  {
    "id": "salman_al_farsi",
    "order": 23,
    "init": "SF",
    "color": "bg-pink-500",
    "ar": "سلمان الفارسي",
    "translit": "Salman al-Farsi",
    "en": "Salman al-Farsi (RA)",
    "bn": "সালমান আল-ফারসি (রাঃ)",
    "era": "battles",
    "ashara": false,
    "caliph": false,
    "ansar": false,
    "woman": false,
    "roleEn": "The Persian Seeker of Truth",
    "roleBn": "সত্যান্বেষী পারস্যবাসী",
    "yearEn": "d. 35 AH / 656 CE",
    "highlightEn": "Proposed the trench that saved Madinah at al-Khandaq.",
    "highlightBn": "খন্দকে পরিখা খননের পরামর্শ দিয়ে মদিনাকে রক্ষা করেন।",
    "summaryEn": "A Persian from near Isfahan, he left Zoroastrianism in search of the true religion, serving Christian monks across many lands until he was betrayed into slavery and brought to Madinah. There he recognized the signs of the awaited Prophet, embraced Islam, and the Prophet helped him win his freedom. At the Battle of the Trench he proposed digging a defensive ditch around Madinah, a strategy that saved the city, and the Prophet said, 'Salman is one of us, the People of the House.' He later served as an ascetic governor of Mada'in in Persia.",
    "summaryBn": "ইস্পাহানের কাছের এক পারস্যবাসী, যিনি সত্য ধর্মের সন্ধানে অগ্নিপূজা ত্যাগ করে বিভিন্ন দেশে খ্রিস্টান সন্ন্যাসীদের সেবা করেন, অবশেষে বিশ্বাসঘাতকতার শিকার হয়ে দাস হিসেবে মদিনায় নীত হন। সেখানে তিনি প্রতীক্ষিত নবীর নিদর্শনগুলো চিনে ইসলাম গ্রহণ করেন এবং নবীজি তাঁকে মুক্ত করতে সাহায্য করেন। খন্দকের যুদ্ধে তিনি মদিনার চারপাশে পরিখা খননের পরামর্শ দেন, যে কৌশল শহরটিকে রক্ষা করে; নবীজি বলেন, 'সালমান আমাদেরই একজন, আহলে বাইতের অন্তর্ভুক্ত।' পরে তিনি পারস্যের মাদায়েনে সংযমী গভর্নর হিসেবে দায়িত্ব পালন করেন।",
    "events": [
      {
        "en": "Left Persia and journeyed for years seeking the true faith",
        "bn": "পারস্য ছেড়ে বছরের পর বছর সত্য ধর্মের সন্ধানে ঘোরেন"
      },
      {
        "en": "Sold into slavery and brought to Madinah, then freed",
        "bn": "দাস হিসেবে বিক্রি হয়ে মদিনায় আসেন, পরে মুক্ত হন"
      },
      {
        "en": "Proposed digging the trench at the Battle of al-Khandaq",
        "bn": "খন্দকের যুদ্ধে পরিখা খননের পরামর্শ দেন"
      },
      {
        "en": "Served as an ascetic governor of Mada'in in Persia",
        "bn": "পারস্যের মাদায়েনে সংযমী গভর্নর হিসেবে দায়িত্ব পালন করেন"
      }
    ],
    "refs": [
      "62:3"
    ],
    "lessonEn": "Sincere seekers of truth are guided, whatever their origin.",
    "lessonBn": "সত্যের আন্তরিক অন্বেষীকে আল্লাহ পথ দেখান, উৎপত্তি যেখানেই হোক।"
  },
  {
    "id": "sad_ibn_muadh",
    "order": 24,
    "init": "SM",
    "color": "bg-sky-600",
    "ar": "سعد بن معاذ",
    "translit": "Sad ibn Muadh",
    "en": "Sa'd ibn Mu'adh (RA)",
    "bn": "সাদ ইবনে মুআয (রাঃ)",
    "era": "battles",
    "ashara": false,
    "caliph": false,
    "ansar": true,
    "woman": false,
    "roleEn": "Chief of the Aws",
    "roleBn": "আওস গোত্রের প্রধান",
    "yearEn": "d. 5 AH / 627 CE",
    "highlightEn": "The Throne of the Most Merciful shook at his death.",
    "highlightBn": "তাঁর মৃত্যুতে দয়াময়ের আরশ কেঁপে উঠেছিল।",
    "summaryEn": "Sa'd ibn Mu'adh (RA) was the chief of the Aws tribe of Madinah. He embraced Islam through Musab ibn Umayr (RA) before the Hijra and brought his entire tribe to the faith. He fought bravely at Badr and Uhud and was wounded by an arrow at the Battle of the Trench (Khandaq). He pronounced the judgment concerning Banu Qurayza, and when he later died of his wound, it is reported that the Throne of the Most Merciful shook and a great host of angels attended his funeral.",
    "summaryBn": "সাদ ইবনে মুআয (রাঃ) ছিলেন মদিনার আওস গোত্রের প্রধান। হিজরতের আগে মুসআব ইবনে উমাইর (রাঃ)-এর মাধ্যমে ইসলাম গ্রহণ করে তিনি তাঁর গোটা গোত্রকে ইসলামের পথে নিয়ে আসেন। তিনি বদর ও উহুদে বীরত্বের সাথে লড়েন এবং খন্দকের যুদ্ধে তীরবিদ্ধ হন। বনু কুরাইজা সম্পর্কে তিনি ফয়সালা প্রদান করেন, আর পরে সেই আঘাতে ইন্তেকাল করলে বর্ণিত আছে যে দয়াময়ের আরশ কেঁপে ওঠে এবং অসংখ্য ফেরেশতা তাঁর জানাযায় অংশ নেন।",
    "events": [
      {
        "en": "Embraced Islam through Musab ibn Umayr, bringing the Aws with him",
        "bn": "মুসআব ইবনে উমাইর (রাঃ)-এর মাধ্যমে ইসলাম গ্রহণ করে আওস গোত্রকে সঙ্গে আনেন"
      },
      {
        "en": "Fought as a protector of the Prophet ﷺ at Badr and Uhud",
        "bn": "নবীজি ﷺ-এর রক্ষক হিসেবে বদর ও উহুদে যুদ্ধ করেন"
      },
      {
        "en": "Wounded by an arrow at the Battle of the Trench (Khandaq)",
        "bn": "খন্দকের যুদ্ধে তীরবিদ্ধ হন"
      },
      {
        "en": "Pronounced the judgment concerning Banu Qurayza",
        "bn": "বনু কুরাইজা সম্পর্কে ফয়সালা প্রদান করেন"
      },
      {
        "en": "Died of his wound as a martyr; the Throne shook at his passing",
        "bn": "সেই আঘাতে শহীদ হন; তাঁর ইন্তেকালে আরশ কেঁপে ওঠে"
      }
    ],
    "refs": [],
    "lessonEn": "True leadership is using your influence to guide your people to truth.",
    "lessonBn": "প্রকৃত নেতৃত্ব হলো নিজের প্রভাব কাজে লাগিয়ে জাতিকে সত্যের পথে আনা।"
  },
  {
    "id": "abdullah_ibn_rawahah",
    "order": 25,
    "init": "AR",
    "color": "bg-teal-600",
    "ar": "عبد الله بن رواحة",
    "translit": "Abdullah ibn Rawahah",
    "en": "Abdullah ibn Rawahah (RA)",
    "bn": "আবদুল্লাহ ইবনে রাওয়াহা (রাঃ)",
    "era": "battles",
    "ashara": false,
    "caliph": false,
    "ansar": true,
    "woman": false,
    "roleEn": "Poet and Martyr of Mutah",
    "roleBn": "কবি ও মুতার শহীদ",
    "yearEn": "d. 8 AH / 629 CE",
    "highlightEn": "Third to seize the banner at Mutah, and martyred.",
    "highlightBn": "মুতায় তৃতীয় হয়ে পতাকা তুলে নিয়ে শহীদ হন।",
    "summaryEn": "Abdullah ibn Rawahah (RA) was a poet of the Ansar and one of the naqibs who pledged at al-Aqabah. He used his poetry in defense of Islam. At the Battle of Mutah he was appointed the third commander, and when Zayd ibn Harithah (RA) and Ja'far ibn Abi Talib (RA) fell, he took up the banner and was martyred there. He was known for his sincerity and his habit of holding himself to account.",
    "summaryBn": "আবদুল্লাহ ইবনে রাওয়াহা (রাঃ) ছিলেন আনসারদের কবি এবং আকাবায় শপথ নেওয়া নকীবদের একজন। তিনি তাঁর কবিতা দিয়ে ইসলামের পক্ষ সমর্থন করতেন। মুতার যুদ্ধে তাঁকে তৃতীয় সেনাপতি নিযুক্ত করা হয়, আর যায়িদ ইবনে হারিসা (রাঃ) ও জাফর ইবনে আবি তালিব (রাঃ) শহীদ হওয়ার পর তিনি পতাকা তুলে নেন এবং সেখানেই শাহাদাত বরণ করেন। একনিষ্ঠতা ও আত্মসমালোচনার জন্য তিনি পরিচিত ছিলেন।",
    "events": [
      {
        "en": "One of the naqibs pledging at al-Aqabah",
        "bn": "আকাবায় শপথ নেওয়া নকীবদের একজন"
      },
      {
        "en": "A poet who defended Islam with his verse",
        "bn": "কবিতা দিয়ে ইসলামের প্রতিরক্ষায় লড়েন"
      },
      {
        "en": "Appointed third commander at the Battle of Mutah",
        "bn": "মুতার যুদ্ধে তৃতীয় সেনাপতি নিযুক্ত হন"
      },
      {
        "en": "Took the banner after Zayd and Ja'far were martyred",
        "bn": "যায়িদ ও জাফর (রাঃ) শহীদ হওয়ার পর পতাকা তুলে নেন"
      },
      {
        "en": "Martyred at the Battle of Mutah",
        "bn": "মুতার যুদ্ধে শাহাদাত বরণ করেন"
      }
    ],
    "refs": [],
    "lessonEn": "Courage means stepping forward when others have fallen.",
    "lessonBn": "সাহস মানে অন্যরা পড়ে গেলেও সামনে এগিয়ে যাওয়া।"
  },
  {
    "id": "hassan_ibn_thabit",
    "order": 26,
    "init": "HT",
    "color": "bg-violet-500",
    "ar": "حسان بن ثابت",
    "translit": "Hassan ibn Thabit",
    "en": "Hassan ibn Thabit (RA)",
    "bn": "হাসসান ইবনে সাবিত (রাঃ)",
    "era": "battles",
    "ashara": false,
    "caliph": false,
    "ansar": true,
    "woman": false,
    "roleEn": "Poet of the Prophet ﷺ",
    "roleBn": "নবীজি ﷺ-এর কবি",
    "yearEn": "d. c. 54 AH / 674 CE",
    "highlightEn": "The Prophet ﷺ said Jibril supports you as you defend.",
    "highlightBn": "নবীজি ﷺ বললেন: দ্বীনের প্রতিরক্ষায় জিবরাইল তোমার সাথে।",
    "summaryEn": "Hassan ibn Thabit (RA) was of the Khazraj and the foremost poet of the Ansar. The Prophet ﷺ had a pulpit set up for him in the mosque and directed him to answer the Quraysh in verse, telling him that Jibril supports him as he defends the faith. His poetry stood against the poets of the disbelievers in defense of the Prophet ﷺ and Islam. He lived to an old age.",
    "summaryBn": "হাসসান ইবনে সাবিত (রাঃ) ছিলেন খাযরাজ গোত্রের এবং আনসারদের শ্রেষ্ঠ কবি। নবীজি ﷺ মসজিদে তাঁর জন্য একটি মিম্বর স্থাপন করান এবং কুরাইশদের জবাব কবিতায় দিতে বলেন, আর বলেন যে দ্বীনের প্রতিরক্ষায় জিবরাইল তাঁকে সমর্থন করছেন। তাঁর কবিতা কাফির কবিদের বিরুদ্ধে নবীজি ﷺ ও ইসলামের পক্ষে দাঁড়ায়। তিনি দীর্ঘ জীবন লাভ করেন।",
    "events": [
      {
        "en": "The Prophet's ﷺ poet, defending Islam in verse",
        "bn": "নবীজি ﷺ-এর কবি, কবিতায় ইসলামের প্রতিরক্ষা করেন"
      },
      {
        "en": "Given a pulpit in the mosque to recite his poetry",
        "bn": "মসজিদে কবিতা আবৃত্তির জন্য তাঁকে মিম্বর দেওয়া হয়"
      },
      {
        "en": "Told by the Prophet ﷺ that Jibril supports him while he responds",
        "bn": "নবীজি ﷺ জানান জবাব দেওয়ার সময় জিবরাইল তাঁকে সমর্থন করেন"
      },
      {
        "en": "Answered the poets of Quraysh in defense of the faith",
        "bn": "দ্বীনের পক্ষে কুরাইশ কবিদের জবাব দেন"
      },
      {
        "en": "Lived to an old age",
        "bn": "দীর্ঘ জীবন লাভ করেন"
      }
    ],
    "refs": [],
    "lessonEn": "Every talent, even words, can serve the cause of truth.",
    "lessonBn": "প্রতিটি প্রতিভা, এমনকি কথা-কবিতাও সত্যের সেবায় লাগানো যায়।"
  },
  {
    "id": "al_miqdad_ibn_amr",
    "order": 27,
    "init": "MA",
    "color": "bg-cyan-600",
    "ar": "المقداد بن عمرو",
    "translit": "Al-Miqdad ibn Amr",
    "en": "Al-Miqdad ibn Amr (RA)",
    "bn": "আল-মিকদাদ ইবনে আমর (রাঃ)",
    "era": "battles",
    "ashara": false,
    "caliph": false,
    "ansar": false,
    "woman": false,
    "roleEn": "Horseman of Badr",
    "roleBn": "বদরের অশ্বারোহী",
    "yearEn": "d. c. 33 AH / 653 CE",
    "highlightEn": "We fight before you and behind you, Messenger of Allah.",
    "highlightBn": "হে আল্লাহর রাসূল, আমরা আপনার সামনে ও পেছনে থেকে লড়ব।",
    "summaryEn": "Al-Miqdad ibn Amr, also known as al-Miqdad ibn al-Aswad, was among the earliest to embrace Islam and endured the persecution of Mecca. He is remembered as one of the first Muslims to fight on horseback. On the eve of Badr, when the Prophet (peace be upon him) sought his companions' counsel, Miqdad rose and pledged: 'We will not say as the people of Musa said, \"Go, you and your Lord, and fight\" — rather we will fight on your right and your left, before you and behind you.' His words gladdened the Prophet and strengthened the Muslims' resolve, and he fought bravely at Badr, Uhud, and beyond.",
    "summaryBn": "আল-মিকদাদ ইবনে আমর, যিনি আল-মিকদাদ ইবনুল আসওয়াদ নামেও পরিচিত, ছিলেন সর্বপ্রথম ইসলাম গ্রহণকারীদের একজন এবং মক্কার নির্যাতন সহ্য করেছিলেন। তিনি অশ্বারোহী হয়ে যুদ্ধকারী প্রথম মুসলিমদের একজন হিসেবে স্মরণীয়। বদরের প্রাক্কালে নবী (সাল্লাল্লাহু আলাইহি ওয়া সাল্লাম) যখন সাহাবিদের পরামর্শ চান, মিকদাদ দাঁড়িয়ে অঙ্গীকার করেন: 'আমরা মূসার সম্প্রদায়ের মতো বলব না যে, \"তুমি ও তোমার রব গিয়ে যুদ্ধ করো\"—বরং আমরা আপনার ডানে-বামে, সামনে ও পেছনে থেকে লড়াই করব।' তাঁর এই কথায় নবী আনন্দিত হন এবং মুসলিমদের সংকল্প দৃঢ় হয়; তিনি বদর, উহুদ ও পরবর্তী যুদ্ধে বীরত্বের সাথে লড়েন।",
    "events": [
      {
        "en": "Among the earliest converts, endured Meccan persecution",
        "bn": "সর্বপ্রথম মুসলিমদের একজন, মক্কার নির্যাতন সহ্য করেন"
      },
      {
        "en": "One of the first Muslims to fight on horseback",
        "bn": "অশ্বারোহী হয়ে যুদ্ধকারী প্রথম মুসলিমদের একজন"
      },
      {
        "en": "Made his famous pledge of loyalty before Badr",
        "bn": "বদরের আগে তাঁর বিখ্যাত আনুগত্যের অঙ্গীকার করেন"
      },
      {
        "en": "Fought at Badr, Uhud, and later battles",
        "bn": "বদর, উহুদ ও পরবর্তী যুদ্ধসমূহে অংশ নেন"
      }
    ],
    "refs": [],
    "lessonEn": "True loyalty stands firm beside the truth in the hardest hour.",
    "lessonBn": "প্রকৃত আনুগত্য কঠিনতম মুহূর্তেও সত্যের পাশে অটল থাকে।"
  },
  {
    "id": "nusaybah_bint_kab_umm_umarah",
    "order": 28,
    "init": "NU",
    "color": "bg-lime-600",
    "ar": "نسيبة بنت كعب (أم عمارة)",
    "translit": "Nusaybah bint Kab Umm Umarah",
    "en": "Nusaybah bint Kab, Umm Umarah (RA)",
    "bn": "নুসাইবা বিনতে কাব, উম্মে উমারা (রাঃ)",
    "era": "battles",
    "ashara": false,
    "caliph": false,
    "ansar": true,
    "woman": true,
    "roleEn": "Warrior-Defender at Uhud",
    "roleBn": "উহুদের বীর রক্ষাকারিণী",
    "yearEn": "d. c. 634 CE",
    "highlightEn": "She shielded the Prophet with her own body at Uhud.",
    "highlightBn": "উহুদে নিজ দেহ দিয়ে নবীকে আড়াল করেছিলেন।",
    "summaryEn": "Nusaybah bint Kab (RA), known as Umm Umarah, was a woman of the Ansar who pledged allegiance to the Prophet (peace be upon him) at the second pledge of Aqabah. At the Battle of Uhud, when the Muslim lines broke and the Prophet was exposed, she threw herself into the fighting — shielding him with her body, wielding a sword, and taking multiple wounds. The Prophet praised her, saying he saw her defending him on every side. She continued to serve Islam, later fighting at the battle of Yamamah against Musaylima, where she lost her hand.",
    "summaryBn": "নুসাইবা বিনতে কাব (রাঃ), যিনি উম্মে উমারা নামে পরিচিত, ছিলেন আনসারদের একজন নারী, যিনি দ্বিতীয় আকাবার শপথে নবীর (সাঃ) হাতে বাইআত করেন। উহুদের যুদ্ধে মুসলিম সারি যখন ভেঙে পড়ে এবং নবী অরক্ষিত হয়ে পড়েন, তখন তিনি যুদ্ধে ঝাঁপিয়ে পড়েন—নিজ দেহ দিয়ে নবীকে আড়াল করেন, তরবারি চালান এবং একাধিক আঘাত সহ্য করেন। নবী তাঁর প্রশংসা করে বলেন, তিনি দেখেছেন এই নারী প্রতিটি দিক থেকে তাঁকে রক্ষা করছেন। তিনি ইসলামের সেবা অব্যাহত রাখেন এবং পরবর্তীতে মুসাইলিমার বিরুদ্ধে ইয়ামামার যুদ্ধে অংশ নিয়ে নিজের হাত হারান।",
    "events": [
      {
        "en": "Pledged allegiance to the Prophet at the second pledge of Aqabah",
        "bn": "দ্বিতীয় আকাবার শপথে নবীর হাতে বাইআত করেন"
      },
      {
        "en": "Fought and was wounded defending the Prophet at Uhud",
        "bn": "উহুদে নবীকে রক্ষা করতে গিয়ে যুদ্ধ করেন ও আহত হন"
      },
      {
        "en": "Praised by the Prophet for her bravery on the battlefield",
        "bn": "রণাঙ্গনে বীরত্বের জন্য নবী কর্তৃক প্রশংসিতা হন"
      },
      {
        "en": "Fought at the battle of Yamamah against Musaylima the Liar",
        "bn": "মিথ্যাবাদী মুসাইলিমার বিরুদ্ধে ইয়ামামার যুদ্ধে লড়েন"
      },
      {
        "en": "Lost her hand in the service of Islam at Yamamah",
        "bn": "ইয়ামামায় ইসলামের সেবায় নিজের হাত হারান"
      }
    ],
    "refs": [],
    "lessonEn": "Faith can turn ordinary courage into extraordinary sacrifice.",
    "lessonBn": "ঈমান সাধারণ সাহসকে অসাধারণ ত্যাগে রূপান্তরিত করতে পারে।"
  },
  {
    "id": "umar_ibn_al_khattab",
    "order": 29,
    "init": "UK",
    "color": "bg-fuchsia-500",
    "ar": "عُمَرُ بْنُ الْخَطَّاب",
    "translit": "Umar ibn al-Khattab",
    "en": "Umar ibn al-Khattab (RA)",
    "bn": "উমর ইবনুল খাত্তাব (রাঃ)",
    "era": "conquest",
    "ashara": true,
    "caliph": true,
    "ansar": false,
    "woman": false,
    "roleEn": "The Second Caliph, al-Faruq",
    "roleBn": "দ্বিতীয় খলিফা, আল-ফারুক",
    "yearEn": "c. 584-644 CE",
    "highlightEn": "The just Caliph whose fairness became legendary.",
    "highlightBn": "যাঁর ন্যায়বিচার কিংবদন্তিতে পরিণত হয়েছিল।",
    "summaryEn": "Umar was a strong and feared leader of Quraysh who initially opposed Islam, then embraced it and became one of its mightiest defenders. As the second Caliph he presided over a vast expansion of the Muslim state, yet lived with famed simplicity and justice, walking the streets to check on his people. He established the Islamic (Hijri) calendar, organized the treasury and administration, and was known as al-Faruq, the one who distinguishes truth from falsehood. He was assassinated while leading the dawn prayer.",
    "summaryBn": "উমর (রাঃ) ছিলেন কুরাইশের এক শক্তিশালী ও ভীতিজাগানো নেতা, যিনি প্রথমে ইসলামের বিরোধিতা করলেও পরে তা গ্রহণ করে অন্যতম শক্তিশালী রক্ষকে পরিণত হন। দ্বিতীয় খলিফা হিসেবে তিনি মুসলিম রাষ্ট্রের বিশাল সম্প্রসারণের নেতৃত্ব দেন, তথাপি বিখ্যাত সাদাসিধা ও ন্যায়পরায়ণতায় জীবন যাপন করতেন এবং প্রজাদের খোঁজ নিতে রাতে পথে পথে ঘুরতেন। তিনি হিজরি ক্যালেন্ডার প্রবর্তন করেন, রাষ্ট্রীয় কোষাগার ও প্রশাসন গঠন করেন এবং সত্য-মিথ্যার পার্থক্যকারী হিসেবে 'আল-ফারুক' নামে পরিচিত হন। ফজরের নামাজে ইমামতিরত অবস্থায় তিনি শহীদ হন।",
    "events": [
      {
        "en": "Embraced Islam and strengthened the early community",
        "bn": "ইসলাম গ্রহণ করে প্রাথমিক উম্মাহকে শক্তিশালী করেন"
      },
      {
        "en": "Became the second Rightly-Guided Caliph",
        "bn": "দ্বিতীয় খুলাফায়ে রাশিদীন হন"
      },
      {
        "en": "Established the Islamic Hijri calendar",
        "bn": "ইসলামি হিজরি ক্যালেন্ডার প্রবর্তন করেন"
      },
      {
        "en": "Oversaw the great expansion and organized state administration",
        "bn": "বিশাল সম্প্রসারণ ও রাষ্ট্রীয় প্রশাসন গঠনের তত্ত্বাবধান করেন"
      },
      {
        "en": "Martyred while leading the Fajr prayer",
        "bn": "ফজরের নামাজে ইমামতিরত অবস্থায় শহীদ হন"
      }
    ],
    "refs": [],
    "lessonEn": "Real strength is power joined to humility and unwavering justice.",
    "lessonBn": "প্রকৃত শক্তি হলো ক্ষমতার সাথে বিনয় ও অবিচল ন্যায়বিচারের সমন্বয়।"
  },
  {
    "id": "uthman_ibn_affan",
    "order": 30,
    "init": "UA",
    "color": "bg-orange-500",
    "ar": "عُثْمَانُ بْنُ عَفَّان",
    "translit": "Uthman ibn Affan",
    "en": "Uthman ibn Affan (RA)",
    "bn": "উসমান ইবনে আফফান (রাঃ)",
    "era": "conquest",
    "ashara": true,
    "caliph": true,
    "ansar": false,
    "woman": false,
    "roleEn": "The Third Caliph, Dhun-Nurayn",
    "roleBn": "তৃতীয় খলিফা, জুন-নূরাইন",
    "yearEn": "c. 576-656 CE",
    "highlightEn": "He unified the Quran into one standard text.",
    "highlightBn": "তিনি কুরআনকে একটি প্রমিত গ্রন্থে একত্র করেন।",
    "summaryEn": "Uthman was an early convert, a wealthy and exceptionally generous merchant renowned for his modesty and gentleness. He married two daughters of the Prophet (peace be upon him) in succession, earning the title Dhun-Nurayn, 'Possessor of the Two Lights.' His generosity funded the expedition of Tabuk and he purchased the well of Rumah to give Muslims free water. As the third Caliph he undertook the momentous task of compiling and standardizing the Quran into a single authoritative text, before being martyred by rebels in his home.",
    "summaryBn": "উসমান (রাঃ) ছিলেন একজন প্রাথমিক মুসলিম, বিত্তবান ও অসাধারণ দানশীল ব্যবসায়ী, যিনি তাঁর লজ্জাশীলতা ও কোমলতার জন্য প্রসিদ্ধ ছিলেন। তিনি নবী (সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম)-এর দুই কন্যাকে পর্যায়ক্রমে বিয়ে করেন, যার ফলে তাঁকে 'জুন-নূরাইন' (দুই জ্যোতির অধিকারী) উপাধি দেওয়া হয়। তাঁর দানশীলতায় তাবুক অভিযান পরিচালিত হয় এবং তিনি মুসলিমদের বিনামূল্যে পানি দিতে রুমা কূপ ক্রয় করেন। তৃতীয় খলিফা হিসেবে তিনি সমগ্র কুরআনকে একটি একক নির্ভরযোগ্য গ্রন্থে সংকলন ও প্রমিতকরণের গুরুদায়িত্ব পালন করেন, অতঃপর বিদ্রোহীদের হাতে নিজ গৃহে শহীদ হন।",
    "events": [
      {
        "en": "Early convert who married two daughters of the Prophet",
        "bn": "প্রাথমিক মুসলিম, নবীজির দুই কন্যাকে বিয়ে করেন"
      },
      {
        "en": "Funded the army of Tabuk and bought the well of Rumah",
        "bn": "তাবুকের সেনাবাহিনী অর্থায়ন করেন ও রুমা কূপ ক্রয় করেন"
      },
      {
        "en": "Became the third Rightly-Guided Caliph",
        "bn": "তৃতীয় খুলাফায়ে রাশিদীন হন"
      },
      {
        "en": "Compiled and standardized the Quran into one text",
        "bn": "কুরআনকে একটি একক প্রমিত গ্রন্থে সংকলন করেন"
      },
      {
        "en": "Martyred by rebels while reciting the Quran",
        "bn": "কুরআন তিলাওয়াতরত অবস্থায় বিদ্রোহীদের হাতে শহীদ হন"
      }
    ],
    "refs": [],
    "lessonEn": "Generosity and gentleness are strengths, not weaknesses, in a leader.",
    "lessonBn": "দানশীলতা ও কোমলতা নেতার দুর্বলতা নয়, বরং শক্তি।"
  },
  {
    "id": "al_abbas_ibn_abd_al_muttalib",
    "order": 31,
    "init": "AM",
    "color": "bg-red-600",
    "ar": "الْعَبَّاسُ بْنُ عَبْدِ الْمُطَّلِب",
    "translit": "al-Abbas ibn Abd al-Muttalib",
    "en": "Al-Abbas ibn Abd al-Muttalib (RA)",
    "bn": "আল-আব্বাস ইবনে আব্দুল মুত্তালিব (রাঃ)",
    "era": "conquest",
    "ashara": false,
    "caliph": false,
    "ansar": false,
    "woman": false,
    "roleEn": "Uncle of the Prophet",
    "roleBn": "নবীজির চাচা",
    "yearEn": "c. 568-653 CE",
    "highlightEn": "The Prophet's uncle and keeper of the pilgrims' water.",
    "highlightBn": "নবীজির চাচা ও হাজিদের পানির রক্ষক।",
    "summaryEn": "Al-Abbas was a paternal uncle of the Prophet (peace be upon him) and custodian of the water-giving service (siqayah) for pilgrims at the Kaaba. Though he embraced Islam publicly only later, around the time of the conquest of Mecca, he had long protected and supported his nephew, including facilitating the Pledge of Aqabah. After his conversion he was a devoted Muslim, and the Prophet held him in great honor. His descendants later founded the Abbasid dynasty.",
    "summaryBn": "আল-আব্বাস (রাঃ) ছিলেন নবী (সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম)-এর চাচা এবং কাবায় হাজিদের পানি সরবরাহের (সিকায়াহ) দায়িত্বপ্রাপ্ত। যদিও তিনি প্রকাশ্যে ইসলাম গ্রহণ করেন পরে, মক্কা বিজয়ের সময়ের কাছাকাছি, তথাপি তিনি দীর্ঘকাল তাঁর ভাতিজাকে রক্ষা ও সমর্থন করেছেন, আকাবার শপথ সহজ করতেও সহায়তা করেন। ইসলাম গ্রহণের পর তিনি একনিষ্ঠ মুসলিম ছিলেন এবং নবীজি তাঁকে অত্যন্ত সম্মান করতেন। তাঁর বংশধরগণ পরবর্তীতে আব্বাসীয় খিলাফত প্রতিষ্ঠা করেন।",
    "events": [
      {
        "en": "Paternal uncle of the Prophet",
        "bn": "নবীজির চাচা"
      },
      {
        "en": "Custodian of the siqayah, providing water to pilgrims",
        "bn": "সিকায়াহর দায়িত্বপ্রাপ্ত, হাজিদের পানি সরবরাহকারী"
      },
      {
        "en": "Helped facilitate the Pledge of Aqabah",
        "bn": "আকাবার শপথ সহজ করতে সহায়তা করেন"
      },
      {
        "en": "Embraced Islam openly around the conquest of Mecca",
        "bn": "মক্কা বিজয়ের সময়ের কাছাকাছি প্রকাশ্যে ইসলাম গ্রহণ করেন"
      },
      {
        "en": "Ancestor of the later Abbasid dynasty",
        "bn": "পরবর্তী আব্বাসীয় বংশের পূর্বপুরুষ"
      }
    ],
    "refs": [],
    "lessonEn": "Loyalty to kin and faith can bear fruit across generations.",
    "lessonBn": "আত্মীয়তা ও ঈমানের প্রতি আনুগত্য প্রজন্মান্তরে ফল দিতে পারে।"
  },
  {
    "id": "sad_ibn_abi_waqqas",
    "order": 32,
    "init": "SW",
    "color": "bg-blue-600",
    "ar": "سعد بن أبي وقاص",
    "translit": "Sad ibn Abi Waqqas",
    "en": "Sad ibn Abi Waqqas (RA)",
    "bn": "সাদ ইবনে আবি ওয়াক্কাস (রাঃ)",
    "era": "conquest",
    "ashara": true,
    "caliph": false,
    "ansar": false,
    "woman": false,
    "roleEn": "Conqueror of Persia",
    "roleBn": "পারস্য বিজেতা",
    "yearEn": "c. 595-674 CE",
    "highlightEn": "He led the Muslims to victory over Persia at al-Qadisiyyah.",
    "highlightBn": "কাদিসিয়্যায় পারস্যের বিরুদ্ধে মুসলিমদের বিজয়ী করেন।",
    "summaryEn": "Sad ibn Abi Waqqas (RA) accepted Islam at about seventeen and was among the earliest believers, cherished by the Prophet Muhammad (peace be upon him), who once said of him, \"This is my maternal uncle.\" He was the first Muslim to shoot an arrow in defence of the faith, and when his mother tried to starve herself to force him back to idolatry, Allah revealed verses affirming kindness to parents yet forbidding obedience to them in disbelief. As a commander he led the Muslim army to the decisive victory at al-Qadisiyyah against the Persian Empire and founded the city of Kufa. He was one of the Ten Promised Paradise and among the last of them to pass away.",
    "summaryBn": "সাদ ইবনে আবি ওয়াক্কাস (রাঃ) প্রায় সতেরো বছর বয়সে ইসলাম গ্রহণ করেন এবং প্রথম মুসলিমদের একজন ছিলেন; রাসূলুল্লাহ (সাল্লাল্লাহু আলাইহি ওয়া সাল্লাম) তাঁকে ভালোবাসতেন এবং একবার তাঁর সম্পর্কে বলেন, 'এ আমার মামা।' তিনি ইসলামের প্রতিরক্ষায় সর্বপ্রথম তীর নিক্ষেপকারী মুসলিম; যখন তাঁর মা তাঁকে শিরকে ফিরিয়ে নিতে অনশন শুরু করেন, তখন আল্লাহ পিতামাতার প্রতি সদাচরণ অথচ কুফরিতে তাদের আনুগত্য নিষিদ্ধ করে আয়াত নাযিল করেন। সেনাপতি হিসেবে তিনি কাদিসিয়্যার নির্ণায়ক যুদ্ধে পারস্য সাম্রাজ্যের বিরুদ্ধে মুসলিম বাহিনীকে বিজয় এনে দেন এবং কুফা নগরী প্রতিষ্ঠা করেন। তিনি জান্নাতের সুসংবাদপ্রাপ্ত দশজনের একজন এবং তাঁদের মধ্যে সর্বশেষ প্রয়াতদের একজন।",
    "events": [
      {
        "en": "Accepted Islam as a youth among the earliest believers",
        "bn": "অল্প বয়সে প্রথম মুসলিমদের একজন হিসেবে ইসলাম গ্রহণ করেন"
      },
      {
        "en": "First Muslim to shoot an arrow in defence of Islam",
        "bn": "ইসলামের প্রতিরক্ষায় সর্বপ্রথম তীর নিক্ষেপকারী মুসলিম"
      },
      {
        "en": "Verses revealed on obeying Allah over parents in matters of faith",
        "bn": "ঈমানের প্রশ্নে পিতামাতার আগে আল্লাহর আনুগত্য নিয়ে আয়াত নাযিল হয়"
      },
      {
        "en": "Commanded the victory at al-Qadisiyyah against Persia",
        "bn": "পারস্যের বিরুদ্ধে কাদিসিয়্যার যুদ্ধে বিজয়ের নেতৃত্ব দেন"
      },
      {
        "en": "Founded the city of Kufa",
        "bn": "কুফা নগরী প্রতিষ্ঠা করেন"
      }
    ],
    "refs": [
      "29:8",
      "31:14"
    ],
    "lessonEn": "Obey and honour your parents, but never disobey Allah to please anyone.",
    "lessonBn": "পিতামাতাকে সম্মান করো ও মানো, তবে কাউকে খুশি করতে আল্লাহর অবাধ্য হয়ো না।"
  },
  {
    "id": "abu_ubaydah_ibn_al_jarrah",
    "order": 33,
    "init": "AJ",
    "color": "bg-green-600",
    "ar": "أبو عبيدة بن الجراح",
    "translit": "Abu Ubaydah ibn al-Jarrah",
    "en": "Abu Ubaydah ibn al-Jarrah (RA)",
    "bn": "আবু উবাইদা ইবনুল জাররাহ (রাঃ)",
    "era": "conquest",
    "ashara": true,
    "caliph": false,
    "ansar": false,
    "woman": false,
    "roleEn": "Trustee of this Ummah",
    "roleBn": "উম্মাহর আমিন",
    "yearEn": "c. 583-639 CE",
    "highlightEn": "The Prophet named him the Trustworthy One of this Nation.",
    "highlightBn": "নবীজি তাঁকে 'এই উম্মাহর আমিন' উপাধি দেন।",
    "summaryEn": "Abu Ubaydah ibn al-Jarrah (RA) was among the earliest converts to Islam and was given by the Prophet Muhammad (peace be upon him) the noble title Amin al-Ummah, the Trustworthy One of this Nation. He migrated to Abyssinia and then to Madinah, and fought at Badr and Uhud; at Uhud he drew with his teeth the two helmet rings that had pierced the Prophet's (peace be upon him) cheek, losing two of his own front teeth. During the caliphate of Umar (RA) he became supreme commander of the Muslim armies in Syria, leading the conquest of Damascus and other cities with wisdom and humility. He was one of the Ten Promised Paradise and died in the plague of Amwas in 18 AH, refusing to flee from the decree of Allah.",
    "summaryBn": "আবু উবাইদা ইবনুল জাররাহ (রাঃ) ছিলেন ইসলামের অগ্রবর্তী গ্রহণকারীদের একজন এবং রাসূলুল্লাহ (সাল্লাল্লাহু আলাইহি ওয়া সাল্লাম) তাঁকে 'আমিনুল উম্মাহ' তথা 'এই উম্মাহর বিশ্বস্তজন' উপাধি দেন। তিনি আবিসিনিয়া ও পরে মদিনায় হিজরত করেন এবং বদর ও উহুদে অংশ নেন; উহুদের ময়দানে নবীজির গালে বিদ্ধ শিরস্ত্রাণের কড়া তিনি দাঁত দিয়ে টেনে বের করেন এবং নিজের সামনের দুটি দাঁত হারান। উমর (রাঃ)-এর খিলাফতকালে তিনি সিরিয়ায় মুসলিম বাহিনীর প্রধান সেনাপতি হন এবং প্রজ্ঞা ও বিনয়ের সাথে দামেস্কসহ বহু নগরী বিজয়ের নেতৃত্ব দেন। তিনি জান্নাতের সুসংবাদপ্রাপ্ত দশজনের একজন এবং ১৮ হিজরিতে আমওয়াসের মহামারিতে, আল্লাহর ফয়সালা থেকে পলায়ন প্রত্যাখ্যান করে ইন্তেকাল করেন।",
    "events": [
      {
        "en": "Given the title Amin al-Ummah by the Prophet",
        "bn": "নবীজি কর্তৃক 'আমিনুল উম্মাহ' উপাধিপ্রাপ্ত"
      },
      {
        "en": "Migrated to Abyssinia and then to Madinah",
        "bn": "আবিসিনিয়া ও পরে মদিনায় হিজরত করেন"
      },
      {
        "en": "Fought at Badr and Uhud; at Uhud drew the pierced helmet rings from the Prophet's cheek, losing two teeth",
        "bn": "বদর ও উহুদে লড়েন; উহুদে নবীজির গালে বিদ্ধ শিরস্ত্রাণের কড়া টেনে বের করে দুটি দাঁত হারান"
      },
      {
        "en": "Supreme commander in the conquest of Syria and Damascus",
        "bn": "সিরিয়া ও দামেস্ক বিজয়ে প্রধান সেনাপতি"
      },
      {
        "en": "Died in the plague of Amwas in 18 AH",
        "bn": "১৮ হিজরিতে আমওয়াসের মহামারিতে ইন্তেকাল করেন"
      }
    ],
    "refs": [],
    "lessonEn": "The one Allah's Messenger called the Trustee of the Ummah shows that true honor lies in being trustworthy before Allah.",
    "lessonBn": "যাঁকে আল্লাহর রাসূল উম্মাহর আমিন বলেছেন, তিনি দেখান—প্রকৃত মর্যাদা আল্লাহর কাছে বিশ্বস্ত হওয়ার মধ্যেই।"
  },
  {
    "id": "abu_musa_al_ashari",
    "order": 34,
    "init": "AA",
    "color": "bg-purple-600",
    "ar": "أبو موسى الأشعري",
    "translit": "Abu Musa al-Ashari",
    "en": "Abu Musa al-Ashari (RA)",
    "bn": "আবু মুসা আল-আশআরি (রাঃ)",
    "era": "conquest",
    "ashara": false,
    "caliph": false,
    "ansar": false,
    "woman": false,
    "roleEn": "Governor and Beautiful Reciter",
    "roleBn": "শাসক ও সুকণ্ঠ কারি",
    "yearEn": "d. c. 44 AH / 664 CE",
    "highlightEn": "Given 'a flute from the flutes of David' in recitation.",
    "highlightBn": "তিলাওয়াতে পেয়েছিলেন 'দাউদ পরিবারের বাঁশিগুলোর একটি বাঁশি'।",
    "summaryEn": "Abdullah ibn Qays of the Ash'ar tribe of Yemen, he came to the Prophet and embraced Islam. He was blessed with a beautiful voice in reciting the Quran, and the Prophet said he had been given 'a flute from the flutes of the family of David.' Under Umar and Uthman he served as a commander and as governor of Basra and later Kufa, leading conquests in Persia. He narrated many hadith and was counted among the noted jurists of the companions.",
    "summaryBn": "ইয়েমেনের আশআর গোত্রের আবদুল্লাহ ইবনে কায়স, যিনি নবীজির কাছে এসে ইসলাম গ্রহণ করেন। কুরআন তিলাওয়াতে তাঁকে অপূর্ব সুকণ্ঠ দান করা হয়েছিল; নবীজি বলেন তাঁকে 'দাউদ পরিবারের বাঁশিগুলোর একটি বাঁশি' দেওয়া হয়েছে। উমার ও উসমানের আমলে তিনি সেনাপতি এবং বসরা ও পরে কুফার গভর্নর হিসেবে পারস্যে বিভিন্ন বিজয় অভিযান পরিচালনা করেন। তিনি বহু হাদিস বর্ণনা করেন এবং সাহাবিদের মধ্যে প্রখ্যাত ফকিহদের অন্যতম ছিলেন।",
    "events": [
      {
        "en": "Came from Yemen and embraced Islam with his tribe",
        "bn": "ইয়েমেন থেকে এসে গোত্রসহ ইসলাম গ্রহণ করেন"
      },
      {
        "en": "Famed for his beautiful, moving Quran recitation",
        "bn": "অপূর্ব ও হৃদয়স্পর্শী কুরআন তিলাওয়াতের জন্য বিখ্যাত"
      },
      {
        "en": "Governed Basra and Kufa and led conquests in Persia",
        "bn": "বসরা ও কুফার গভর্নর হয়ে পারস্যে বিজয় পরিচালনা করেন"
      },
      {
        "en": "Narrated many hadith and taught the Quran",
        "bn": "বহু হাদিস বর্ণনা করেন ও কুরআন শিক্ষা দেন"
      }
    ],
    "refs": [],
    "lessonEn": "A beautiful recitation can soften hearts toward the Quran.",
    "lessonBn": "সুন্দর তিলাওয়াত হৃদয়কে কুরআনের দিকে কোমল করে তোলে।"
  },
  {
    "id": "khalid_ibn_al_walid",
    "order": 35,
    "init": "KW",
    "color": "bg-amber-600",
    "ar": "خالد بن الوليد",
    "translit": "Khalid ibn al-Walid",
    "en": "Khalid ibn al-Walid (RA)",
    "bn": "খালিদ ইবনুল ওয়ালিদ (রাঃ)",
    "era": "conquest",
    "ashara": false,
    "caliph": false,
    "ansar": false,
    "woman": false,
    "roleEn": "The Drawn Sword of Allah",
    "roleBn": "সাইফুল্লাহ (আল্লাহর তলোয়ার)",
    "yearEn": "d. 21 AH / 642 CE",
    "highlightEn": "The Sword of Allah — never defeated in battle.",
    "highlightBn": "আল্লাহর তলোয়ার—কোনো যুদ্ধে পরাজিত হননি।",
    "summaryEn": "Khalid ibn al-Walid was among the greatest military commanders in history. Before Islam he led the Quraysh cavalry and turned the tide against the Muslims at Uhud, but he embraced Islam before the conquest of Mecca, and the Prophet (peace be upon him) named him 'Sayf Allah' — the Sword of Allah. When the three appointed commanders fell at Mutah, he took command and saved the army. He later won decisive victories in the Ridda wars and the conquests of Iraq and Syria, crowned by the great Battle of Yarmuk, and died on his bed in Homs never having lost a battle.",
    "summaryBn": "খালিদ ইবনুল ওয়ালিদ ইতিহাসের অন্যতম শ্রেষ্ঠ সেনাপতি। ইসলাম গ্রহণের আগে তিনি কুরাইশ অশ্বারোহী বাহিনীর নেতৃত্ব দিয়ে উহুদে মুসলিমদের বিরুদ্ধে যুদ্ধের মোড় ঘুরিয়ে দিয়েছিলেন, কিন্তু মক্কা বিজয়ের আগেই তিনি ইসলাম গ্রহণ করেন এবং নবী (সাল্লাল্লাহু আলাইহি ওয়া সাল্লাম) তাঁকে 'সাইফুল্লাহ'—আল্লাহর তলোয়ার—উপাধি দেন। মুতার যুদ্ধে নিযুক্ত তিন সেনাপতি শহীদ হলে তিনি নেতৃত্ব নিয়ে বাহিনীকে রক্ষা করেন। পরে রিদ্দার যুদ্ধ এবং ইরাক ও সিরিয়া বিজয়ে, বিশেষত মহান ইয়ারমুকের যুদ্ধে, তিনি নিষ্পত্তিমূলক বিজয় অর্জন করেন এবং কোনো যুদ্ধে পরাজিত না হয়েই হিমসে নিজ শয্যায় ইন্তেকাল করেন।",
    "events": [
      {
        "en": "Commanded the Quraysh cavalry against the Muslims at Uhud",
        "bn": "উহুদে মুসলিমদের বিরুদ্ধে কুরাইশ অশ্বারোহী বাহিনীর নেতৃত্ব দেন"
      },
      {
        "en": "Embraced Islam before the conquest of Mecca (8 AH)",
        "bn": "মক্কা বিজয়ের (৮ হিজরি) আগে ইসলাম গ্রহণ করেন"
      },
      {
        "en": "Took command at Mutah after three commanders fell, saving the army",
        "bn": "মুতায় তিন সেনাপতি শহীদ হলে নেতৃত্ব নিয়ে বাহিনীকে রক্ষা করেন"
      },
      {
        "en": "Led decisive victories in the Ridda wars",
        "bn": "রিদ্দার যুদ্ধে নিষ্পত্তিমূলক বিজয় অর্জন করেন"
      },
      {
        "en": "Commanded the Muslims to victory at Yarmuk against the Byzantines",
        "bn": "ইয়ারমুকে বাইজেন্টাইনদের বিরুদ্ধে মুসলিমদের বিজয়ে নেতৃত্ব দেন"
      }
    ],
    "refs": [],
    "lessonEn": "God can turn a former enemy into Islam's greatest champion.",
    "lessonBn": "আল্লাহ একজন সাবেক শত্রুকেও ইসলামের শ্রেষ্ঠ সেনানীতে পরিণত করতে পারেন।"
  },
  {
    "id": "amr_ibn_al_as",
    "order": 36,
    "init": "AA",
    "color": "bg-rose-600",
    "ar": "عمرو بن العاص",
    "translit": "Amr ibn al-As",
    "en": "Amr ibn al-As (RA)",
    "bn": "আমর ইবনুল আস (রাঃ)",
    "era": "conquest",
    "ashara": false,
    "caliph": false,
    "ansar": false,
    "woman": false,
    "roleEn": "Conqueror of Egypt",
    "roleBn": "মিসর বিজয়ী",
    "yearEn": "d. c. 43 AH / 664 CE",
    "highlightEn": "The commander who opened Egypt to Islam.",
    "highlightBn": "যিনি মিসরকে ইসলামের জন্য উন্মুক্ত করেছিলেন।",
    "summaryEn": "Amr ibn al-As was a shrewd Qurayshi statesman and commander who embraced Islam shortly before the conquest of Mecca. The Prophet (peace be upon him) recognized his ability and entrusted him with leading expeditions and administration. He is best remembered for conquering Egypt during the caliphate of Umar ibn al-Khattab and founding the garrison city of Fustat, near modern Cairo. Renowned for his intelligence and eloquence, he served for years as governor of Egypt.",
    "summaryBn": "আমর ইবনুল আস ছিলেন একজন প্রখর বুদ্ধিসম্পন্ন কুরাইশ রাষ্ট্রনায়ক ও সেনাপতি, যিনি মক্কা বিজয়ের কিছু আগে ইসলাম গ্রহণ করেন। নবী (সাল্লাল্লাহু আলাইহি ওয়া সাল্লাম) তাঁর যোগ্যতা চিনে তাঁকে অভিযান পরিচালনা ও প্রশাসনের দায়িত্ব দেন। উমর ইবনুল খাত্তাবের খিলাফতকালে মিসর বিজয় এবং বর্তমান কায়রোর নিকটবর্তী ফুসতাত নগরী প্রতিষ্ঠার জন্য তিনি সবচেয়ে বেশি স্মরণীয়। তীক্ষ্ণ বুদ্ধি ও বাগ্মিতার জন্য খ্যাত এই সাহাবি বহু বছর মিসরের গভর্নর ছিলেন।",
    "events": [
      {
        "en": "Embraced Islam shortly before the conquest of Mecca",
        "bn": "মক্কা বিজয়ের কিছু আগে ইসলাম গ্রহণ করেন"
      },
      {
        "en": "Led the expedition of Dhat as-Salasil",
        "bn": "যাতুস সালাসিলের অভিযানে নেতৃত্ব দেন"
      },
      {
        "en": "Conquered Egypt during the caliphate of Umar",
        "bn": "উমরের খিলাফতকালে মিসর বিজয় করেন"
      },
      {
        "en": "Founded the garrison city of Fustat",
        "bn": "সেনানিবাস নগরী ফুসতাত প্রতিষ্ঠা করেন"
      },
      {
        "en": "Served for years as governor of Egypt",
        "bn": "বহু বছর মিসরের গভর্নর হিসেবে দায়িত্ব পালন করেন"
      }
    ],
    "refs": [],
    "lessonEn": "Worldly skill and wisdom, offered to God, become tools of great good.",
    "lessonBn": "পার্থিব দক্ষতা ও প্রজ্ঞা আল্লাহর পথে নিবেদিত হলে তা মহাকল্যাণের হাতিয়ার হয়।"
  },
  {
    "id": "usama_ibn_zayd",
    "order": 37,
    "init": "UZ",
    "color": "bg-amber-500",
    "ar": "أسامة بن زيد",
    "translit": "Usama ibn Zayd",
    "en": "Usama ibn Zayd (RA)",
    "bn": "উসামা ইবনে যায়েদ (রাঃ)",
    "era": "conquest",
    "ashara": false,
    "caliph": false,
    "ansar": false,
    "woman": false,
    "roleEn": "The Young Commander",
    "roleBn": "তরুণ সেনাপতি",
    "yearEn": "c. 612-674 CE",
    "highlightEn": "Made an army commander while still a teenager.",
    "highlightBn": "কিশোর বয়সেই তাঁকে বাহিনীর সেনাপতি করা হয়েছিল।",
    "summaryEn": "Usama ibn Zayd was the son of Zayd ibn Haritha and Umm Ayman, and was dearly loved by the Prophet (peace be upon him), who called him and his father 'the beloved and the son of the beloved.' In one battle Usama killed a man who had just uttered the testimony of faith, and the Prophet rebuked him sharply, teaching that we judge only outward deeds, not what lies in hearts. Just before his death the Prophet appointed the young Usama — around eighteen — to command an army against the Byzantines, and Abu Bakr insisted on dispatching it despite the surrounding turmoil. He lived a long life and kept himself out of the later civil strife.",
    "summaryBn": "উসামা ইবনে যায়েদ ছিলেন যায়েদ ইবনে হারিসা ও উম্মে আইমানের পুত্র, এবং নবী (সাল্লাল্লাহু আলাইহি ওয়া সাল্লাম) তাঁকে অত্যন্ত ভালোবাসতেন—তিনি উসামা ও তাঁর পিতাকে 'প্রিয় ও প্রিয়জনের পুত্র' বলে অভিহিত করতেন। এক যুদ্ধে উসামা এমন এক ব্যক্তিকে হত্যা করেন যে সবেমাত্র কালিমা উচ্চারণ করেছিল; নবী তাঁকে কঠোরভাবে তিরস্কার করে শেখান যে আমরা কেবল প্রকাশ্য আমল দেখে বিচার করি, অন্তরের খবর নয়। ইন্তেকালের কিছু আগে নবী প্রায় আঠারো বছর বয়সী তরুণ উসামাকে বাইজেন্টাইনদের বিরুদ্ধে বাহিনীর সেনাপতি নিযুক্ত করেন, এবং চারপাশের বিশৃঙ্খলা সত্ত্বেও আবু বকর তা প্রেরণে অটল থাকেন। তিনি দীর্ঘজীবী হন এবং পরবর্তী গৃহবিবাদ থেকে নিজেকে দূরে রাখেন।",
    "events": [
      {
        "en": "Son of Zayd ibn Haritha, deeply loved by the Prophet",
        "bn": "যায়েদ ইবনে হারিসার পুত্র, নবীর অত্যন্ত প্রিয়"
      },
      {
        "en": "Rebuked for killing a man who had said the shahada",
        "bn": "কালিমা পড়া ব্যক্তিকে হত্যার জন্য তিরস্কৃত হন"
      },
      {
        "en": "Appointed commander of the Syrian expedition near the Prophet's death",
        "bn": "নবীর ইন্তেকালের কাছাকাছি সময়ে সিরিয়া অভিযানের সেনাপতি নিযুক্ত হন"
      },
      {
        "en": "Abu Bakr dispatched his army despite the Ridda turmoil",
        "bn": "রিদ্দার অস্থিরতা সত্ত্বেও আবু বকর তাঁর বাহিনী প্রেরণ করেন"
      },
      {
        "en": "Withdrew from fighting during the later civil strife",
        "bn": "পরবর্তী গৃহবিবাদে যুদ্ধ থেকে বিরত থাকেন"
      }
    ],
    "refs": [],
    "lessonEn": "Judge people by their open deeds, for hearts belong to God alone.",
    "lessonBn": "মানুষকে তার প্রকাশ্য আমল দিয়ে বিচার করো, কারণ অন্তর কেবল আল্লাহরই জানা।"
  },
  {
    "id": "abdullah_ibn_hudhafah_as_sahmi",
    "order": 38,
    "init": "AS",
    "color": "bg-rose-500",
    "ar": "عبد الله بن حذافة السهمي",
    "translit": "Abdullah ibn Hudhafah as-Sahmi",
    "en": "Abdullah ibn Hudhafah as-Sahmi (RA)",
    "bn": "আব্দুল্লাহ ইবনে হুযাফা আস-সাহমি (রাঃ)",
    "era": "conquest",
    "ashara": false,
    "caliph": false,
    "ansar": false,
    "woman": false,
    "roleEn": "The Prophet's Envoy to Persia",
    "roleBn": "পারস্যে নবীর দূত",
    "yearEn": "d. c. 34 AH / 655 CE",
    "highlightEn": "He wished for as many lives as the hairs on his body to give for Islam.",
    "highlightBn": "দেহের প্রতিটি লোমের বদলে একটি করে প্রাণ থাকলে সবই ইসলামের জন্য বিলিয়ে দিতেন তিনি।",
    "summaryEn": "Abdullah ibn Hudhafah as-Sahmi was an early Muslim who migrated to Abyssinia. The Prophet (peace be upon him) chose him to carry the letter inviting Khosrau (Kisra), emperor of Persia, to Islam — a letter the arrogant king tore to pieces. Years later, during the wars with Byzantium, he was taken captive, and the Roman emperor tried to make him abandon his faith with offers of wealth and the threat of being cast into a cauldron of boiling oil. Abdullah wept — not from fear, but wishing he had as many lives as the hairs on his body to sacrifice for Islam. Unable to break him, the emperor offered to free him if he would kiss his head; Abdullah agreed only on the condition that all the Muslim captives be freed as well. He kissed the emperor's head, and about eighty Muslim prisoners were released along with him. When he returned, Caliph Umar (RA) honoured him by kissing his head.",
    "summaryBn": "আব্দুল্লাহ ইবনে হুযাফা আস-সাহমি ছিলেন একজন প্রাথমিক যুগের মুসলিম, যিনি আবিসিনিয়ায় হিজরত করেছিলেন। নবী (সাল্লাল্লাহু আলাইহি ওয়া সাল্লাম) তাঁকে পারস্য সম্রাট খসরু (কিসরা)-র কাছে ইসলামের দাওয়াতপত্র পৌঁছানোর জন্য নির্বাচন করেন—যে পত্রটি অহংকারী সম্রাট ছিঁড়ে ফেলেন। বছর কয়েক পর বাইজেন্টাইনদের সাথে যুদ্ধে তিনি বন্দি হন, এবং রোমান সম্রাট ধন-সম্পদের প্রলোভন ও ফুটন্ত তেলের কড়াইয়ে নিক্ষেপের ভয় দেখিয়ে তাঁকে দ্বীন ত্যাগ করাতে চান। আব্দুল্লাহ কাঁদলেন—ভয়ে নয়, বরং এই আক্ষেপে যে তাঁর দেহে যত লোম আছে তত প্রাণ থাকলে সবই তিনি ইসলামের জন্য উৎসর্গ করতেন। তাঁকে টলাতে না পেরে সম্রাট প্রস্তাব দেন, তাঁর মাথায় চুমু দিলে মুক্তি দেবেন; আব্দুল্লাহ শর্ত দেন—সকল মুসলিম বন্দিকেও মুক্তি দিতে হবে। তিনি সম্রাটের মাথায় চুমু দেন, আর তাঁর সঙ্গে প্রায় আশিজন মুসলিম বন্দিকে মুক্তি দেওয়া হয়। ফিরে আসার পর খলিফা উমর (রাঃ) তাঁর মাথায় চুমু দিয়ে তাঁকে সম্মানিত করেন।",
    "events": [
      {
        "en": "Early Muslim who migrated to Abyssinia",
        "bn": "প্রাথমিক যুগের মুসলিম, আবিসিনিয়ায় হিজরত করেন"
      },
      {
        "en": "Carried the Prophet's letter to Khosrau of Persia",
        "bn": "পারস্যের খসরুর কাছে নবীর পত্র পৌঁছে দেন"
      },
      {
        "en": "Taken captive by the Byzantines and pressured to apostatize",
        "bn": "বাইজেন্টাইনদের হাতে বন্দি হন ও ধর্মত্যাগে চাপপ্রাপ্ত হন"
      },
      {
        "en": "Refused every offer and threat, ready to die for his faith",
        "bn": "সকল প্রলোভন ও হুমকি প্রত্যাখ্যান করে দ্বীনের জন্য মৃত্যুতে প্রস্তুত থাকেন"
      },
      {
        "en": "Won the release of some eighty Muslim captives, then was honoured by Caliph Umar",
        "bn": "প্রায় আশিজন মুসলিম বন্দির মুক্তি নিশ্চিত করেন, পরে খলিফা উমর তাঁকে সম্মানিত করেন"
      }
    ],
    "refs": [],
    "lessonEn": "A believer values faith above life itself.",
    "lessonBn": "একজন মুমিন নিজের জীবনের চেয়েও ঈমানকে বেশি মূল্য দেয়।"
  },
  {
    "id": "an_numan_ibn_muqarrin",
    "order": 39,
    "init": "NM",
    "color": "bg-emerald-500",
    "ar": "النعمان بن مقرن",
    "translit": "an-Numan ibn Muqarrin",
    "en": "An-Numan ibn Muqarrin (RA)",
    "bn": "নুমান ইবনে মুকাররিন (রাঃ)",
    "era": "conquest",
    "ashara": false,
    "caliph": false,
    "ansar": false,
    "woman": false,
    "roleEn": "Martyr-Commander of Nahavand",
    "roleBn": "নাহাওয়ান্দের শহীদ সেনাপতি",
    "yearEn": "d. 21 AH / 642 CE",
    "highlightEn": "Fell as a martyr at the Victory of Victories.",
    "highlightBn": "বিজয়সমূহের বিজয়ে শহীদ হন তিনি।",
    "summaryEn": "An-Numan ibn Muqarrin was a noble companion of the Muzayna tribe who came with his brothers to accept Islam and pledged his people's loyalty. During the caliphate of Umar ibn al-Khattab, he was appointed to command the Muslim army against the massed Persian forces at Nahavand. Before the battle he raised his hands and prayed for victory for the Muslims and for his own martyrdom. He led a decisive triumph remembered as the 'Victory of Victories' (Fath al-Futuh), which broke the power of the Sasanian empire — and he was martyred in the very hour of victory.",
    "summaryBn": "নুমান ইবনে মুকাররিন ছিলেন মুযায়না গোত্রের একজন সম্ভ্রান্ত সাহাবি, যিনি তাঁর ভাইদের সাথে এসে ইসলাম গ্রহণ করেন এবং স্বগোত্রের আনুগত্যের অঙ্গীকার করেন। উমর ইবনুল খাত্তাবের খিলাফতকালে নাহাওয়ান্দে সমবেত বিশাল পারস্য বাহিনীর বিরুদ্ধে মুসলিম সেনাদলের সেনাপতি হিসেবে তিনি নিযুক্ত হন। যুদ্ধের আগে তিনি হাত তুলে মুসলিমদের বিজয় এবং নিজের শাহাদাতের জন্য দোয়া করেন। তিনি 'ফাতহুল ফুতুহ' (বিজয়সমূহের বিজয়) নামে স্মরণীয় নিষ্পত্তিমূলক এক জয়ের নেতৃত্ব দেন, যা সাসানি সাম্রাজ্যের শক্তি ভেঙে দেয়—আর বিজয়ের সেই মুহূর্তেই তিনি শহীদ হন।",
    "events": [
      {
        "en": "Came with his tribe of Muzayna to embrace Islam",
        "bn": "স্বগোত্র মুযায়নাকে নিয়ে ইসলাম গ্রহণ করেন"
      },
      {
        "en": "Appointed by Umar to command at Nahavand",
        "bn": "উমর কর্তৃক নাহাওয়ান্দে সেনাপতি নিযুক্ত হন"
      },
      {
        "en": "Prayed for victory and martyrdom before the battle",
        "bn": "যুদ্ধের আগে বিজয় ও শাহাদাতের জন্য দোয়া করেন"
      },
      {
        "en": "Led the decisive 'Victory of Victories' over the Persians",
        "bn": "পারসিকদের বিরুদ্ধে নিষ্পত্তিমূলক 'ফাতহুল ফুতুহে' নেতৃত্ব দেন"
      },
      {
        "en": "Martyred at the moment of triumph",
        "bn": "বিজয়ের মুহূর্তেই শহীদ হন"
      }
    ],
    "refs": [],
    "lessonEn": "The truest leaders long for victory over their own survival.",
    "lessonBn": "প্রকৃত নেতা নিজের বেঁচে থাকার চেয়ে বিজয়কেই বেশি কামনা করেন।"
  },
  {
    "id": "abdullah_ibn_masud",
    "order": 40,
    "init": "AM",
    "color": "bg-indigo-500",
    "ar": "عبد الله بن مسعود",
    "translit": "Abdullah ibn Masud",
    "en": "Abdullah ibn Masud (RA)",
    "bn": "আবদুল্লাহ ইবনে মাসউদ (রাঃ)",
    "era": "knowledge",
    "ashara": false,
    "caliph": false,
    "ansar": false,
    "woman": false,
    "roleEn": "Expert Reciter of the Quran",
    "roleBn": "কুরআনের বিশেষজ্ঞ পাঠক",
    "yearEn": "d. 32 AH / c. 653 CE",
    "highlightEn": "First to recite the Quran aloud at the Ka'bah.",
    "highlightBn": "কাবার সামনে প্রকাশ্যে উচ্চস্বরে কুরআন পড়া প্রথম ব্যক্তি।",
    "summaryEn": "He was among the very earliest to accept Islam, often counted as the sixth. A shepherd boy who became the Prophet's ﷺ close attendant, keeping his sandals, tooth-stick, and cushion, he was the first to recite the Quran aloud publicly at the Ka'bah, enduring a beating for it. He grew into a foremost scholar and reciter, and the Prophet ﷺ said, 'Take the Quran from four,' naming him first among them. He later taught and oversaw the treasury in Kufa, leaving a lasting school of learning.",
    "summaryBn": "তিনি ছিলেন ইসলাম গ্রহণকারী একেবারে প্রথম দিকের একজন, অনেকের মতে ষষ্ঠ ব্যক্তি। এক রাখাল বালক থেকে তিনি হয়ে ওঠেন নবীজি ﷺ-এর ঘনিষ্ঠ খাদেম, যিনি তাঁর জুতা, মিসওয়াক ও বালিশের দেখাশোনা করতেন; মক্কায় কাবার সামনে প্রকাশ্যে উচ্চস্বরে কুরআন তিলাওয়াতকারী তিনিই প্রথম, যার জন্য তাঁকে মারধরও সহ্য করতে হয়। তিনি ছিলেন অগ্রগণ্য আলিম ও কারি; নবীজি ﷺ বলেছেন, 'চারজনের কাছ থেকে কুরআন শেখো,' যাদের মধ্যে প্রথমেই তাঁর নাম আসে। পরবর্তীতে তিনি কুফায় শিক্ষকতা ও বাইতুল মালের দায়িত্ব পালন করেন এবং জ্ঞানের এক স্থায়ী ধারা রেখে যান।",
    "events": [
      {
        "en": "Among the first to embrace Islam in Mecca",
        "bn": "মক্কায় সর্বপ্রথম ইসলাম গ্রহণকারীদের একজন"
      },
      {
        "en": "First to publicly recite the Quran aloud at the Ka'bah",
        "bn": "কাবার সামনে প্রকাশ্যে উচ্চস্বরে কুরআন তিলাওয়াতকারী প্রথম ব্যক্তি"
      },
      {
        "en": "Served closely as the Prophet's ﷺ personal attendant",
        "bn": "নবীজি ﷺ-এর ব্যক্তিগত খাদেম হিসেবে নিবিড়ভাবে সেবা করেন"
      },
      {
        "en": "Fought at Badr and dispatched the mortally wounded Abu Jahl",
        "bn": "বদর যুদ্ধে অংশ নেন এবং মরণাপন্ন আহত আবু জাহলকে শেষ করে দেন"
      },
      {
        "en": "Became a leading teacher of Quran and fiqh in Kufa",
        "bn": "কুফায় কুরআন ও ফিকহের একজন প্রধান শিক্ষক হন"
      }
    ],
    "refs": [],
    "lessonEn": "Deep knowledge of the Quran raises the humblest to greatness.",
    "lessonBn": "কুরআনের গভীর জ্ঞান নম্রতম মানুষকেও মর্যাদায় উন্নীত করে।"
  },
  {
    "id": "ubayy_ibn_kab",
    "order": 41,
    "init": "UK",
    "color": "bg-pink-500",
    "ar": "أبي بن كعب",
    "translit": "Ubayy ibn Kab",
    "en": "Ubayy ibn Kab (RA)",
    "bn": "উবাই ইবনে কাব (রাঃ)",
    "era": "knowledge",
    "ashara": false,
    "caliph": false,
    "ansar": true,
    "woman": false,
    "roleEn": "Master of the Reciters",
    "roleBn": "কারিদের সর্দার (সাইয়িদুল কুররা)",
    "yearEn": "d. c. 30 AH / 650 CE",
    "highlightEn": "The Prophet was commanded to recite the Quran to him.",
    "highlightBn": "আল্লাহর আদেশে নবীজি তাঁকে কুরআন তিলাওয়াত করে শোনান।",
    "summaryEn": "An Ansari of the Khazraj tribe, he was a scribe of the revelation both before and after the Hijra. Renowned as the foremost reciter of the Quran, he was titled 'Sayyid al-Qurra' (Master of the Reciters). The Prophet told him that Allah had commanded him to recite Surah al-Bayyinah to him, at which Ubayy wept with joy. Umar (RA) called him a leader among the Muslims, and his readings of the Quran were held in great honor.",
    "summaryBn": "খাযরাজ গোত্রের একজন আনসারি এবং হিজরতের আগে ও পরে ওহি লেখক। তিনি কুরআনের সর্বশ্রেষ্ঠ পাঠক হিসেবে খ্যাত ছিলেন এবং তাঁকে 'সাইয়িদুল কুররা' (কারিদের সর্দার) উপাধি দেওয়া হয়। নবীজি তাঁকে জানান যে আল্লাহ তাঁকে উবাইয়ের কাছে সূরা আল-বাইয়িনাহ তিলাওয়াত করার আদেশ দিয়েছেন, এতে উবাই আনন্দে কেঁদে ফেলেন। উমার (রাঃ) তাঁকে মুসলিমদের অন্যতম নেতা বলে অভিহিত করেন এবং তাঁর কিরাআত অত্যন্ত সম্মানিত ছিল।",
    "events": [
      {
        "en": "Served as a scribe recording the revelation",
        "bn": "ওহি লেখক হিসেবে কুরআন লিপিবদ্ধ করেন"
      },
      {
        "en": "Recognized as the foremost reciter, 'Master of the Reciters'",
        "bn": "সর্বশ্রেষ্ঠ পাঠক 'কারিদের সর্দার' হিসেবে স্বীকৃত হন"
      },
      {
        "en": "The Prophet recited Surah al-Bayyinah to him by Allah's command",
        "bn": "আল্লাহর আদেশে নবীজি তাঁকে সূরা আল-বাইয়িনাহ শোনান"
      },
      {
        "en": "A trusted counselor on the Quran during Umar's caliphate",
        "bn": "উমারের খিলাফতকালে কুরআনের একজন নির্ভরযোগ্য পরামর্শদাতা"
      }
    ],
    "refs": [
      "98:1"
    ],
    "lessonEn": "Honor the Quran by mastering and living its recitation.",
    "lessonBn": "কুরআনকে আয়ত্ত করে ও তার তিলাওয়াত বাস্তবায়ন করে সম্মান দাও।"
  },
  {
    "id": "zayd_ibn_thabit",
    "order": 42,
    "init": "ZT",
    "color": "bg-sky-600",
    "ar": "زيد بن ثابت",
    "translit": "Zayd ibn Thabit",
    "en": "Zayd ibn Thabit (RA)",
    "bn": "যায়েদ ইবনে সাবিত (রাঃ)",
    "era": "knowledge",
    "ashara": false,
    "caliph": false,
    "ansar": true,
    "woman": false,
    "roleEn": "Compiler of the Quran",
    "roleBn": "কুরআন সংকলনকারী",
    "yearEn": "c. 611-665 CE",
    "highlightEn": "Entrusted to gather the whole Quran into one book.",
    "highlightBn": "গোটা কুরআনকে এক গ্রন্থে একত্র করার দায়িত্ব পান।",
    "summaryEn": "An Ansari youth of the Khazraj, too young to fight at Badr, he became the Prophet's leading scribe of revelation. At the Prophet's instruction he learned Hebrew (and Syriac) to handle foreign correspondence. After the Prophet's death, Abu Bakr (RA) entrusted him with gathering the entire Quran into a single manuscript, and Uthman (RA) later appointed him to lead the standard compilation. He was also the community's foremost authority on the laws of inheritance (fara'id).",
    "summaryBn": "খাযরাজ গোত্রের এক আনসারি কিশোর, বদরের যুদ্ধে অংশ নেওয়ার জন্য যিনি ছিলেন খুবই অল্পবয়সী, পরে হয়ে ওঠেন নবীজির প্রধান ওহি লেখক। নবীজির নির্দেশে তিনি বিদেশি চিঠিপত্র সামলাতে হিব্রু ও সিরীয় ভাষা শেখেন। নবীজির ইন্তেকালের পর আবু বকর (রাঃ) তাঁকে গোটা কুরআন এক মুসহাফে একত্র করার দায়িত্ব দেন, আর পরে উসমান (রাঃ) তাঁকে মানসম্মত সংকলনের নেতৃত্বে নিযুক্ত করেন। তিনি উত্তরাধিকার আইনে (ফারায়েজ) উম্মতের সর্বাধিক পারদর্শী ছিলেন।",
    "events": [
      {
        "en": "Became the Prophet's chief scribe of revelation",
        "bn": "নবীজির প্রধান ওহি লেখক হন"
      },
      {
        "en": "Learned Hebrew and Syriac to write the Prophet's letters",
        "bn": "নবীজির চিঠিপত্রের জন্য হিব্রু ও সিরীয় ভাষা শেখেন"
      },
      {
        "en": "Compiled the Quran into one manuscript under Abu Bakr",
        "bn": "আবু বকরের সময়ে কুরআন এক মুসহাফে সংকলন করেন"
      },
      {
        "en": "Led the standard Uthmanic compilation of the Quran",
        "bn": "উসমানের সময়ে মানসম্মত কুরআন সংকলনের নেতৃত্ব দেন"
      },
      {
        "en": "The leading authority on the laws of inheritance",
        "bn": "উত্তরাধিকার আইনের সর্বাধিক পারদর্শী পণ্ডিত"
      }
    ],
    "refs": [],
    "lessonEn": "Careful, trustworthy service can preserve truth for all generations.",
    "lessonBn": "যত্নশীল ও বিশ্বস্ত সেবা প্রজন্মের পর প্রজন্মের জন্য সত্য সংরক্ষণ করে।"
  },
  {
    "id": "muadh_ibn_jabal",
    "order": 43,
    "init": "MJ",
    "color": "bg-teal-600",
    "ar": "معاذ بن جبل",
    "translit": "Muadh ibn Jabal",
    "en": "Muadh ibn Jabal (RA)",
    "bn": "মুয়াজ ইবনে জাবাল (রাঃ)",
    "era": "knowledge",
    "ashara": false,
    "caliph": false,
    "ansar": true,
    "woman": false,
    "roleEn": "Most Learned in Lawful and Unlawful",
    "roleBn": "হালাল-হারামে সর্বাধিক জ্ঞানী",
    "yearEn": "c. 603-639 CE",
    "highlightEn": "The most learned of the ummah in lawful and unlawful.",
    "highlightBn": "হালাল-হারাম জ্ঞানে উম্মতের সবচেয়ে পণ্ডিত ব্যক্তি।",
    "summaryEn": "A young Ansari of the Khazraj, he accepted Islam at the Pledge of Aqabah and fought at Badr. The Prophet praised him as the most knowledgeable of the community in what is lawful and unlawful. He was sent to Yemen as a teacher and judge, and the Prophet, who declared his love for him, taught him a supplication to say after every prayer. He died young in the plague of Amwas in Syria.",
    "summaryBn": "খাযরাজ গোত্রের এক তরুণ আনসারি, যিনি আকাবার শপথে ইসলাম গ্রহণ করেন ও বদরে যুদ্ধ করেন। নবীজি তাঁকে উম্মতের মধ্যে হালাল-হারাম বিষয়ে সর্বাধিক জ্ঞানী বলে প্রশংসা করেন। তাঁকে ইয়েমেনে শিক্ষক ও বিচারক হিসেবে পাঠানো হয়, আর নবীজি তাঁর প্রতি ভালোবাসা প্রকাশ করে প্রতি নামাজের পর পড়ার একটি দোয়া শিখিয়ে দেন। অল্প বয়সেই তিনি সিরিয়ায় আমওয়াসের মহামারিতে ইন্তেকাল করেন।",
    "events": [
      {
        "en": "Pledged at Aqabah and fought at the Battle of Badr",
        "bn": "আকাবার শপথে অংশ নেন ও বদরের যুদ্ধে লড়েন"
      },
      {
        "en": "Sent to Yemen as a teacher, judge, and governor",
        "bn": "ইয়েমেনে শিক্ষক, বিচারক ও গভর্নর হিসেবে প্রেরিত হন"
      },
      {
        "en": "Praised as most knowledgeable of the lawful and unlawful",
        "bn": "হালাল-হারামে সর্বাধিক জ্ঞানী বলে প্রশংসিত হন"
      },
      {
        "en": "Died in the plague of Amwas in Syria",
        "bn": "সিরিয়ায় আমওয়াসের মহামারিতে ইন্তেকাল করেন"
      }
    ],
    "refs": [],
    "lessonEn": "Teach knowledge with sincerity and carry it to distant lands.",
    "lessonBn": "জ্ঞানকে আন্তরিকতার সাথে শেখাও এবং দূর দেশেও পৌঁছে দাও।"
  },
  {
    "id": "anas_ibn_malik",
    "order": 44,
    "init": "AM",
    "color": "bg-violet-500",
    "ar": "أنس بن مالك",
    "translit": "Anas ibn Malik",
    "en": "Anas ibn Malik (RA)",
    "bn": "আনাস ইবনে মালিক (রাঃ)",
    "era": "knowledge",
    "ashara": false,
    "caliph": false,
    "ansar": true,
    "woman": false,
    "roleEn": "Servant of the Prophet ﷺ",
    "roleBn": "নবীজি ﷺ-এর খাদেম",
    "yearEn": "c. 612-712 CE",
    "highlightEn": "Ten years serving the Prophet ﷺ, never once rebuked.",
    "highlightBn": "দশ বছর নবীজি ﷺ-এর খেদমত, একবারও তিরস্কার শোনেননি।",
    "summaryEn": "Anas ibn Malik (RA) was given by his mother Umm Sulaym (RA) to serve the Prophet ﷺ at the age of ten, and he served him for ten years. The Prophet ﷺ prayed for him to be blessed with long life, abundant wealth, and many children — and all of it was fulfilled. He grew to become one of the most prolific narrators of hadith, transmitting some 2,286 narrations. He settled in Basra, taught the next generation, and was among the last of the companions to pass away.",
    "summaryBn": "আনাস ইবনে মালিক (রাঃ)-কে তাঁর মা উম্মে সুলাইম (রাঃ) দশ বছর বয়সে নবীজি ﷺ-এর খেদমতে সমর্পণ করেন, আর তিনি দীর্ঘ দশ বছর তাঁর খেদমত করেন। নবীজি ﷺ তাঁর জন্য দীর্ঘ হায়াত, প্রচুর সম্পদ ও অনেক সন্তানের দোয়া করেন—সবই পূর্ণ হয়। তিনি হাদিসের অন্যতম প্রধান বর্ণনাকারী হয়ে ওঠেন, প্রায় ২,২৮৬টি হাদিস বর্ণনা করেন। বসরায় বসতি গড়ে পরবর্তী প্রজন্মকে শিক্ষা দেন এবং সবশেষে ইন্তেকাল করা সাহাবিদের একজন ছিলেন।",
    "events": [
      {
        "en": "Entered the Prophet's ﷺ service as a boy of ten",
        "bn": "দশ বছর বয়সে নবীজি ﷺ-এর খেদমতে প্রবেশ করেন"
      },
      {
        "en": "Received the Prophet's ﷺ dua for long life, wealth, and offspring",
        "bn": "দীর্ঘ হায়াত, সম্পদ ও সন্তানের জন্য নবীজি ﷺ-এর দোয়া পান"
      },
      {
        "en": "Became one of the most prolific narrators of hadith",
        "bn": "হাদিসের অন্যতম প্রধান বর্ণনাকারী হন"
      },
      {
        "en": "Settled in Basra and taught the next generation",
        "bn": "বসরায় বসতি গড়ে পরবর্তী প্রজন্মকে শিক্ষা দেন"
      },
      {
        "en": "Among the last of the companions to pass away",
        "bn": "সবশেষে ইন্তেকাল করা সাহাবিদের একজন"
      },
      {
        "en": "Umm Sulaym asked the Prophet ﷺ to pray for him; he said, 'O Allah, increase his wealth and children and bless him'",
        "bn": "উম্মে সুলাইম নবীজি ﷺ-কে তাঁর জন্য দোয়ার অনুরোধ করেন; তিনি বলেন, 'হে আল্লাহ, তার সম্পদ ও সন্তান বাড়িয়ে দিন এবং বরকত দিন'"
      },
      {
        "en": "He later said his land bore fruit twice a year and he had buried over a hundred of his descendants — the du'a fulfilled",
        "bn": "পরে তিনি জানান, তাঁর জমি বছরে দুবার ফল দিত এবং তিনি নিজের একশোরও বেশি বংশধরকে দাফন করেছেন—দোয়া পূর্ণ হয়েছিল"
      }
    ],
    "refs": [],
    "lessonEn": "Faithful service in youth yields blessings for a lifetime.",
    "lessonBn": "শৈশবে নিষ্ঠাভরে সেবা সারা জীবনের বরকত বয়ে আনে।"
  },
  {
    "id": "abu_hurayrah",
    "order": 45,
    "init": "AH",
    "color": "bg-cyan-600",
    "ar": "أبو هريرة",
    "translit": "Abu Hurayrah",
    "en": "Abu Hurayrah (RA)",
    "bn": "আবু হুরায়রা (রাঃ)",
    "era": "knowledge",
    "ashara": false,
    "caliph": false,
    "ansar": false,
    "woman": false,
    "roleEn": "Most Prolific Hadith Narrator",
    "roleBn": "সর্বাধিক হাদিস বর্ণনাকারী",
    "yearEn": "d. 59 AH / 678 CE",
    "highlightEn": "He narrated more hadith than any other companion — some 5,374 in all.",
    "highlightBn": "তিনি অন্য যেকোনো সাহাবির চেয়ে বেশি হাদিস বর্ণনা করেছেন—প্রায় ৫,৩৭৪টি।",
    "summaryEn": "Abd al-Rahman ibn Sakhr of the Daws tribe embraced Islam in 7 AH and devoted the remainder of the Prophet's ﷺ life to his company. Poor and without a home, he lived among the Ahl as-Suffah in the mosque so he could hear and memorize every word. When he complained of forgetting, the Prophet ﷺ prayed for his memory, and he became the single most prolific narrator in Islam, preserving over five thousand hadith. Later generations of scholars drew heavily on what he transmitted.",
    "summaryBn": "দাউস গোত্রের আব্দুর রহমান ইবনে সাখর ৭ হিজরিতে ইসলাম গ্রহণ করে নবীজি ﷺ-এর জীবনের বাকি সময়টা তাঁর সান্নিধ্যে কাটিয়ে দেন। দরিদ্র ও আশ্রয়হীন হয়ে তিনি মসজিদের আহলে সুফফার সঙ্গে থাকতেন, যাতে নবীজির প্রতিটি কথা শুনতে ও মুখস্থ করতে পারেন। ভুলে যাওয়ার অভিযোগ করলে নবীজি ﷺ তাঁর স্মৃতির জন্য দোয়া করেন, আর তিনি হয়ে ওঠেন ইসলামের ইতিহাসে সর্বাধিক হাদিস বর্ণনাকারী—পাঁচ হাজারেরও বেশি হাদিস তিনি সংরক্ষণ করেন। পরবর্তী যুগের আলেমগণ তাঁর বর্ণিত জ্ঞানের ওপর ব্যাপকভাবে নির্ভর করেছেন।",
    "events": [
      {
        "en": "Embraced Islam in 7 AH around the time of Khaybar",
        "bn": "খায়বারের সময়কালে ৭ হিজরিতে ইসলাম গ্রহণ করেন"
      },
      {
        "en": "Lived among the Ahl as-Suffah, the poor devotees of the mosque",
        "bn": "মসজিদের দরিদ্র সাধকদল আহলে সুফফার সঙ্গে বসবাস করেন"
      },
      {
        "en": "The Prophet ﷺ prayed to strengthen his memory",
        "bn": "নবীজি ﷺ তাঁর স্মৃতিশক্তি দৃঢ় করার জন্য দোয়া করেন"
      },
      {
        "en": "Preserved over 5,000 hadith of the Prophet ﷺ",
        "bn": "নবীজি ﷺ-এর পাঁচ হাজারেরও বেশি হাদিস সংরক্ষণ করেন"
      },
      {
        "en": "Served as a teacher and later governor over Madinah",
        "bn": "শিক্ষক এবং পরবর্তীতে মদিনার শাসক হিসেবে দায়িত্ব পালন করেন"
      },
      {
        "en": "Spread his garment as the Prophet ﷺ spoke, and never forgot a hadith after that day",
        "bn": "নবীজি ﷺ কথা বলার সময় নিজের চাদর বিছিয়ে দেন, আর সেদিনের পর কোনো হাদিস কখনো ভোলেননি"
      },
      {
        "en": "Said he had preserved two vessels of knowledge from the Prophet ﷺ",
        "bn": "নবীজি ﷺ থেকে দুই ভাণ্ডার জ্ঞান সংরক্ষণ করেছেন বলে জানান"
      }
    ],
    "refs": [],
    "lessonEn": "Sincere devotion and careful listening can preserve knowledge for all generations.",
    "lessonBn": "আন্তরিক নিষ্ঠা ও মনোযোগী শ্রবণ যুগ যুগ ধরে জ্ঞান সংরক্ষণ করতে পারে।"
  },
  {
    "id": "abdullah_ibn_abbas",
    "order": 46,
    "init": "AA",
    "color": "bg-lime-600",
    "ar": "عبد الله بن عباس",
    "translit": "Abdullah ibn Abbas",
    "en": "Abdullah ibn Abbas (RA)",
    "bn": "আব্দুল্লাহ ইবনে আব্বাস (রাঃ)",
    "era": "knowledge",
    "ashara": false,
    "caliph": false,
    "ansar": false,
    "woman": false,
    "roleEn": "Scholar of the Ummah",
    "roleBn": "উম্মাহর মহাপণ্ডিত",
    "yearEn": "c. 619-687 CE",
    "highlightEn": "The Prophet ﷺ prayed he be given understanding of the Quran.",
    "highlightBn": "নবীজি ﷺ দোয়া করেছিলেন যেন তাঁকে কুরআনের গভীর জ্ঞান দান করা হয়।",
    "summaryEn": "The cousin of the Prophet ﷺ from the Banu Hashim, Abdullah ibn Abbas was a young boy when the Prophet ﷺ embraced him and prayed, 'O Allah, give him understanding of the religion and teach him interpretation.' Though only about thirteen when the Prophet ﷺ passed away, he grew into the foremost interpreter of the Quran, earning the titles Habr al-Ummah (Scholar of the Nation) and Tarjuman al-Quran (Interpreter of the Quran). Caliph Umar would seat him among the senior companions in his councils for his sharp insight. He narrated about 1,660 hadith, and his explanations of the Quran remain a foundation of tafsir to this day.",
    "summaryBn": "বনু হাশিমের সন্তান, নবীজি ﷺ-এর চাচাতো ভাই আব্দুল্লাহ ইবনে আব্বাস ছোট বালক থাকতেই নবীজি ﷺ তাঁকে বুকে জড়িয়ে দোয়া করেন, 'হে আল্লাহ, তাকে দ্বীনের গভীর জ্ঞান দান করুন এবং কুরআনের ব্যাখ্যা শিক্ষা দিন।' নবীজি ﷺ-এর ইন্তেকালের সময় তাঁর বয়স ছিল মাত্র প্রায় তেরো, তবু তিনি হয়ে ওঠেন কুরআনের শ্রেষ্ঠ ব্যাখ্যাকারী এবং লাভ করেন 'হাবরুল উম্মাহ' ও 'তারজুমানুল কুরআন' উপাধি। খলিফা উমর (রাঃ) তাঁর প্রখর অন্তর্দৃষ্টির জন্য পরামর্শসভায় প্রবীণ সাহাবিদের সঙ্গে তাঁকে বসাতেন। তিনি প্রায় ১,৬৬০টি হাদিস বর্ণনা করেন, আর তাঁর কুরআন-ব্যাখ্যা আজও তাফসিরের ভিত্তি হিসেবে বিবেচিত।",
    "events": [
      {
        "en": "The Prophet ﷺ embraced him and prayed for his understanding of the religion",
        "bn": "নবীজি ﷺ তাঁকে জড়িয়ে দ্বীনের জ্ঞানের জন্য দোয়া করেন"
      },
      {
        "en": "Was about thirteen at the Prophet's ﷺ passing",
        "bn": "নবীজি ﷺ-এর ইন্তেকালের সময় তাঁর বয়স ছিল প্রায় তেরো"
      },
      {
        "en": "Became the foremost authority on Quranic interpretation",
        "bn": "কুরআনের ব্যাখ্যায় সর্বোচ্চ কর্তৃত্বসম্পন্ন ব্যক্তিতে পরিণত হন"
      },
      {
        "en": "Seated by Umar among the senior companions in council",
        "bn": "উমর (রাঃ) পরামর্শসভায় প্রবীণ সাহাবিদের সঙ্গে তাঁকে বসাতেন"
      },
      {
        "en": "Passed away in Ta'if in 68 AH",
        "bn": "৬৮ হিজরিতে তায়েফে ইন্তেকাল করেন"
      },
      {
        "en": "One night he readied water for the Prophet's ﷺ ablution; the Prophet ﷺ then prayed, 'O Allah, teach him the Book'",
        "bn": "এক রাতে তিনি নবীজি ﷺ-এর অজুর পানি প্রস্তুত করেন; তখন নবীজি ﷺ দোয়া করেন, 'হে আল্লাহ, তাকে কিতাবের জ্ঞান দিন'"
      },
      {
        "en": "Grew to be honoured as Tarjuman al-Qur'an — the Interpreter of the Qur'an",
        "bn": "'তারজুমানুল কুরআন'—কুরআনের ব্যাখ্যাকার—উপাধিতে সম্মানিত হন"
      }
    ],
    "refs": [],
    "lessonEn": "A childhood turned toward knowledge can shape the understanding of an entire ummah.",
    "lessonBn": "জ্ঞানের পথে চালিত একটি শৈশব গোটা উম্মাহর বোঝাপড়াকে গড়ে দিতে পারে।"
  },
  {
    "id": "abdullah_ibn_umar",
    "order": 47,
    "init": "AU",
    "color": "bg-fuchsia-500",
    "ar": "عبد الله بن عمر",
    "translit": "Abdullah ibn Umar",
    "en": "Abdullah ibn Umar (RA)",
    "bn": "আব্দুল্লাহ ইবনে উমর (রাঃ)",
    "era": "knowledge",
    "ashara": false,
    "caliph": false,
    "ansar": false,
    "woman": false,
    "roleEn": "Devoted Follower of the Sunnah",
    "roleBn": "সুন্নাহর একনিষ্ঠ অনুসারী",
    "yearEn": "c. 610-693 CE",
    "highlightEn": "He followed the Prophet's ﷺ every step with meticulous love.",
    "highlightBn": "তিনি অতিযত্নে নবীজি ﷺ-এর প্রতিটি পদক্ষেপ অনুসরণ করতেন।",
    "summaryEn": "The son of Caliph Umar ibn al-Khattab, Abdullah migrated to Madinah as a youth and grew up entirely within the Prophet's ﷺ community. He was famous for imitating the Prophet's ﷺ every practice with the utmost precision, even retracing his footsteps and resting places on journeys. A major narrator of hadith with some 2,630 narrations, he was known for scrupulous piety and for refusing to take sides in the civil strife that later divided the Muslims. He avoided political power and lived a long life as a quiet reference point for the Sunnah.",
    "summaryBn": "খলিফা উমর ইবনুল খাত্তাব (রাঃ)-এর পুত্র আব্দুল্লাহ কিশোর বয়সে মদিনায় হিজরত করেন এবং পুরোপুরি নবীজি ﷺ-এর সমাজে বেড়ে ওঠেন। তিনি নবীজি ﷺ-এর প্রতিটি আমল অত্যন্ত সূক্ষ্মভাবে অনুসরণ করার জন্য বিখ্যাত ছিলেন—সফরে নবীজির বিশ্রামস্থল ও পদচিহ্ন পর্যন্ত অনুসরণ করতেন। প্রায় ২,৬৩০টি হাদিসের বর্ণনাকারী এই সাহাবি তাঁর কঠোর তাকওয়া এবং পরবর্তী মুসলিম গৃহবিবাদে কোনো পক্ষ অবলম্বন না করার জন্য পরিচিত ছিলেন। তিনি রাজনৈতিক ক্ষমতা এড়িয়ে চলেন এবং দীর্ঘ জীবন সুন্নাহর এক নীরব আশ্রয়স্থল হয়ে কাটান।",
    "events": [
      {
        "en": "Migrated to Madinah as a youth with his father Umar",
        "bn": "কিশোর বয়সে পিতা উমরের সঙ্গে মদিনায় হিজরত করেন"
      },
      {
        "en": "Too young to fight at Badr and Uhud; first battle was Khandaq",
        "bn": "বদর ও উহুদে অংশ নিতে অল্পবয়সী ছিলেন; প্রথম যুদ্ধ খন্দক"
      },
      {
        "en": "Meticulously imitated the Prophet's ﷺ every action",
        "bn": "নবীজি ﷺ-এর প্রতিটি কাজ সূক্ষ্মভাবে অনুকরণ করতেন"
      },
      {
        "en": "Refused to take sides during the fitna among Muslims",
        "bn": "মুসলিমদের অন্তর্দ্বন্দ্বে কোনো পক্ষ অবলম্বন করেননি"
      },
      {
        "en": "Became one of the great narrators and jurists of Madinah",
        "bn": "মদিনার অন্যতম প্রধান বর্ণনাকারী ও ফকিহে পরিণত হন"
      },
      {
        "en": "On journeys he would halt to pray at the very spots where he had seen the Prophet ﷺ pray",
        "bn": "সফরে যেসব স্থানে নবীজি ﷺ-কে নামাজ পড়তে দেখেছেন, ঠিক সেসব স্থানে থেমে নামাজ পড়তেন"
      },
      {
        "en": "So devoted to the Sunnah that he retraced the Prophet's ﷺ every step and resting place",
        "bn": "সুন্নাহর প্রতি এমন নিষ্ঠাবান ছিলেন যে নবীজি ﷺ-এর প্রতিটি পদচিহ্ন ও বিশ্রামস্থল অনুসরণ করতেন"
      }
    ],
    "refs": [],
    "lessonEn": "True love of the Prophet ﷺ shows itself in carefully following his example.",
    "lessonBn": "নবীজি ﷺ-এর প্রতি সত্যিকারের ভালোবাসা প্রকাশ পায় যত্নের সঙ্গে তাঁর আদর্শ অনুসরণে।"
  },
  {
    "id": "abdullah_ibn_amr_ibn_al_as",
    "order": 48,
    "init": "AA",
    "color": "bg-orange-500",
    "ar": "عبد الله بن عمرو بن العاص",
    "translit": "Abdullah ibn Amr ibn al-As",
    "en": "Abdullah ibn Amr ibn al-As (RA)",
    "bn": "আব্দুল্লাহ ইবনে আমর ইবনুল আস (রাঃ)",
    "era": "knowledge",
    "ashara": false,
    "caliph": false,
    "ansar": false,
    "woman": false,
    "roleEn": "Recorder of Prophetic Hadith",
    "roleBn": "হাদিস লিপিবদ্ধকারী",
    "yearEn": "d. c. 65 AH / 684 CE",
    "highlightEn": "He wrote down the Prophet's ﷺ words with his own hand.",
    "highlightBn": "তিনি নিজ হাতে নবীজি ﷺ-এর বাণী লিখে রাখতেন।",
    "summaryEn": "The son of Amr ibn al-As, Abdullah embraced Islam before his father and was known for intense worship, fasting and long night prayers that the Prophet ﷺ gently moderated for him. He asked the Prophet's ﷺ permission to write down everything he heard, and compiled a written collection known as as-Sahifa as-Sadiqa (the Truthful Scroll). Because he recorded hadith in writing, he preserved many narrations with great accuracy, and Abu Hurayrah noted that Abdullah knew things he himself did not because he wrote while Abu Hurayrah did not. He was a learned, devout worshipper who also had some knowledge of earlier scriptures.",
    "summaryBn": "আমর ইবনুল আসের পুত্র আব্দুল্লাহ তাঁর পিতার আগেই ইসলাম গ্রহণ করেন এবং তীব্র ইবাদত, রোজা ও দীর্ঘ রাত্রি-জাগরণের জন্য পরিচিত ছিলেন, যা নবীজি ﷺ কোমলভাবে তাঁর জন্য পরিমিত করে দেন। তিনি নবীজি ﷺ-এর অনুমতি নিয়ে যা শুনতেন তা লিখে রাখতেন এবং 'আস-সহিফা আস-সাদিকা' (সত্যনিষ্ঠ পুস্তিকা) নামে একটি লিখিত সংকলন তৈরি করেন। লিখে রাখার কারণে তিনি বহু হাদিস অত্যন্ত নির্ভুলভাবে সংরক্ষণ করেন; আবু হুরায়রা (রাঃ) বলতেন, আব্দুল্লাহ এমন কিছু জানতেন যা তিনি জানতেন না, কারণ আব্দুল্লাহ লিখতেন আর তিনি লিখতেন না। তিনি ছিলেন এক জ্ঞানী, নিষ্ঠাবান ইবাদতগুজার সাহাবি, যাঁর পূর্ববর্তী কিতাব সম্পর্কেও কিছু জ্ঞান ছিল।",
    "events": [
      {
        "en": "Embraced Islam before his father Amr ibn al-As",
        "bn": "পিতা আমর ইবনুল আসের আগেই ইসলাম গ্রহণ করেন"
      },
      {
        "en": "Received the Prophet's ﷺ permission to write down hadith",
        "bn": "হাদিস লিখে রাখার জন্য নবীজি ﷺ-এর অনুমতি লাভ করেন"
      },
      {
        "en": "Compiled the written collection as-Sahifa as-Sadiqa",
        "bn": "'আস-সহিফা আস-সাদিকা' লিখিত সংকলন তৈরি করেন"
      },
      {
        "en": "The Prophet ﷺ moderated his intense fasting and night prayer",
        "bn": "নবীজি ﷺ তাঁর তীব্র রোজা ও রাত্রি-ইবাদত পরিমিত করে দেন"
      },
      {
        "en": "Preserved many narrations with written accuracy",
        "bn": "লিখে রাখার মাধ্যমে বহু হাদিস নির্ভুলভাবে সংরক্ষণ করেন"
      }
    ],
    "refs": [],
    "lessonEn": "Writing down knowledge preserves it faithfully for those who come after.",
    "lessonBn": "জ্ঞান লিখে রাখলে তা পরবর্তীদের জন্য বিশ্বস্তভাবে সংরক্ষিত থাকে।"
  },
  {
    "id": "jabir_ibn_abdullah",
    "order": 49,
    "init": "JA",
    "color": "bg-red-600",
    "ar": "جابر بن عبد الله",
    "translit": "Jabir ibn Abdullah",
    "en": "Jabir ibn Abdullah (RA)",
    "bn": "জাবির ইবনে আব্দুল্লাহ (রাঃ)",
    "era": "knowledge",
    "ashara": false,
    "caliph": false,
    "ansar": true,
    "woman": false,
    "roleEn": "Ansari Narrator of Madinah",
    "roleBn": "মদিনার আনসারি বর্ণনাকারী",
    "yearEn": "c. 607-697 CE",
    "highlightEn": "He gave the fullest account of the Farewell Hajj.",
    "highlightBn": "তিনি বিদায় হজ্জের সবচেয়ে পূর্ণাঙ্গ বর্ণনা দিয়েছেন।",
    "summaryEn": "A young man of the Khazraj of Madinah, Jabir attended the second Pledge of Aqaba alongside his father. His father Abdullah was martyred at the Battle of Uhud, leaving Jabir with a large family to care for. He became one of the great narrators of hadith, with some 1,540 narrations, and gave the most detailed description of the Prophet's ﷺ Farewell Hajj that later scholars relied upon. In his old age he held teaching circles in the Prophet's Mosque and was among the last of the companions to pass away in Madinah.",
    "summaryBn": "মদিনার খাযরাজ গোত্রের তরুণ জাবির তাঁর পিতার সঙ্গে দ্বিতীয় আকাবার শপথে উপস্থিত ছিলেন। তাঁর পিতা আব্দুল্লাহ উহুদের যুদ্ধে শহিদ হন, ফলে বড় একটি পরিবারের দায়িত্ব তরুণ জাবিরের কাঁধে এসে পড়ে। তিনি হয়ে ওঠেন অন্যতম প্রধান হাদিস বর্ণনাকারী (প্রায় ১,৫৪০টি হাদিস) এবং নবীজি ﷺ-এর বিদায় হজ্জের সবচেয়ে বিস্তারিত বর্ণনা দেন, যার ওপর পরবর্তী আলেমগণ নির্ভর করেছেন। বৃদ্ধ বয়সে তিনি মসজিদে নববীতে শিক্ষার হালকা পরিচালনা করতেন এবং মদিনায় সর্বশেষ ইন্তেকালকারী সাহাবিদের একজন ছিলেন।",
    "events": [
      {
        "en": "Attended the second Pledge of Aqaba with his father",
        "bn": "পিতার সঙ্গে দ্বিতীয় আকাবার শপথে উপস্থিত ছিলেন"
      },
      {
        "en": "His father Abdullah was martyred at the Battle of Uhud",
        "bn": "তাঁর পিতা আব্দুল্লাহ উহুদের যুদ্ধে শহিদ হন"
      },
      {
        "en": "Narrated the Prophet's ﷺ Farewell Hajj in rich detail",
        "bn": "নবীজি ﷺ-এর বিদায় হজ্জ বিস্তারিতভাবে বর্ণনা করেন"
      },
      {
        "en": "Held teaching circles in the Prophet's Mosque",
        "bn": "মসজিদে নববীতে শিক্ষার হালকা পরিচালনা করতেন"
      },
      {
        "en": "Among the last companions to die in Madinah",
        "bn": "মদিনায় সর্বশেষ ইন্তেকালকারী সাহাবিদের একজন"
      },
      {
        "en": "On a journey the Prophet ﷺ bought his weary camel, then returned to him both the camel and its price",
        "bn": "এক সফরে নবীজি ﷺ তাঁর ক্লান্ত উটটি কিনে নেন, পরে উট ও তার মূল্য দুটোই তাঁকে ফিরিয়ে দেন"
      }
    ],
    "refs": [
      "4:176"
    ],
    "lessonEn": "Bearing hardship with patience while spreading knowledge blesses a whole community.",
    "lessonBn": "কষ্ট ধৈর্যের সঙ্গে সয়ে জ্ঞান ছড়িয়ে দিলে গোটা সমাজ বরকতপ্রাপ্ত হয়।"
  },
  {
    "id": "abu_said_al_khudri",
    "order": 50,
    "init": "AK",
    "color": "bg-blue-600",
    "ar": "أبو سعيد الخدري",
    "translit": "Abu Said al-Khudri",
    "en": "Abu Said al-Khudri (RA)",
    "bn": "আবু সাঈদ আল-খুদরি (রাঃ)",
    "era": "knowledge",
    "ashara": false,
    "caliph": false,
    "ansar": true,
    "woman": false,
    "roleEn": "Ansari Hadith Narrator",
    "roleBn": "আনসারি হাদিস বর্ণনাকারী",
    "yearEn": "c. 612-693 CE",
    "highlightEn": "Turned away from Uhud as a boy, he became a great scholar.",
    "highlightBn": "বালক বয়সে উহুদ থেকে ফিরে এসে তিনি হন এক মহাপণ্ডিত।",
    "summaryEn": "Sa'd ibn Malik, known as Abu Said al-Khudri, was an Ansari youth of the Khazraj who presented himself for the Battle of Uhud but was turned back for being too young to fight. His father Malik ibn Sinan was martyred at Uhud, and Abu Said grew up amid the trials of the early Madinan community. He matured into one of the leading jurists and most prolific narrators among the Ansar, transmitting some 1,170 hadith. In later life he taught in Madinah and was a trusted authority whom students and scholars sought out.",
    "summaryBn": "সা'দ ইবনে মালিক, যিনি আবু সাঈদ আল-খুদরি নামে পরিচিত, ছিলেন খাযরাজ গোত্রের এক আনসারি তরুণ, যিনি উহুদের যুদ্ধে অংশ নিতে এলে অল্পবয়সী বলে তাঁকে ফিরিয়ে দেওয়া হয়। তাঁর পিতা মালিক ইবনে সিনান উহুদে শহিদ হন, আর আবু সাঈদ মদিনার প্রথম যুগের কঠিন পরীক্ষার মধ্য দিয়ে বেড়ে ওঠেন। তিনি আনসারদের মধ্যে অন্যতম প্রধান ফকিহ ও সর্বাধিক হাদিস বর্ণনাকারীতে পরিণত হন এবং প্রায় ১,১৭০টি হাদিস বর্ণনা করেন। শেষ জীবনে তিনি মদিনায় শিক্ষা দিতেন এবং ছাত্র ও আলেমদের কাছে ছিলেন এক নির্ভরযোগ্য প্রামাণিক ব্যক্তিত্ব।",
    "events": [
      {
        "en": "Turned back from the Battle of Uhud for being too young",
        "bn": "অল্পবয়সী হওয়ায় উহুদের যুদ্ধ থেকে ফিরিয়ে দেওয়া হয়"
      },
      {
        "en": "His father Malik ibn Sinan was martyred at Uhud",
        "bn": "তাঁর পিতা মালিক ইবনে সিনান উহুদে শহিদ হন"
      },
      {
        "en": "Grew into a leading Ansari jurist and narrator",
        "bn": "অগ্রণী আনসারি ফকিহ ও বর্ণনাকারীতে পরিণত হন"
      },
      {
        "en": "Transmitted a large number of the Prophet's ﷺ hadith",
        "bn": "নবীজি ﷺ-এর বিপুল সংখ্যক হাদিস বর্ণনা করেন"
      },
      {
        "en": "Taught students and scholars in Madinah in his later years",
        "bn": "শেষ বয়সে মদিনায় ছাত্র ও আলেমদের শিক্ষা দিতেন"
      },
      {
        "en": "When some Ansar asked out of need, the Prophet ﷺ taught him, 'Whoever seeks to be content, Allah makes him content'",
        "bn": "কিছু আনসার অভাবে চাইলে নবীজি ﷺ তাঁকে শেখান, 'যে অভাবমুক্ত থাকতে চায়, আল্লাহ তাকে অভাবমুক্ত করেন'"
      }
    ],
    "refs": [],
    "lessonEn": "Being kept from the battlefield can open the path to the field of knowledge.",
    "lessonBn": "রণাঙ্গন থেকে ফিরিয়ে দেওয়া হলেও তা জ্ঞানের ময়দানের পথ খুলে দিতে পারে।"
  },
  {
    "id": "aishah_bint_abi_bakr",
    "order": 51,
    "init": "AB",
    "color": "bg-green-600",
    "ar": "عائشة بنت أبي بكر",
    "translit": "Aishah bint Abi Bakr",
    "en": "Aishah bint Abi Bakr (RA)",
    "bn": "আয়িশা বিনতে আবু বকর (রাঃ)",
    "era": "knowledge",
    "ashara": false,
    "caliph": false,
    "ansar": false,
    "woman": true,
    "roleEn": "Mother of the Believers, Scholar",
    "roleBn": "উম্মুল মুমিনীন, মহাজ্ঞানী",
    "yearEn": "c. 614-678 CE",
    "highlightEn": "Her innocence was declared from above the seven heavens in the Quran.",
    "highlightBn": "সাত আসমানের উপর থেকে কুরআনে তাঁর নির্দোষিতা ঘোষিত হয়।",
    "summaryEn": "Aishah (RA), daughter of Abu Bakr as-Siddiq, was the beloved wife of the Prophet (peace be upon him) and one of the greatest scholars of early Islam. Sharp-minded and eloquent, she narrated over two thousand hadith (some 2,210) and became a leading authority on the Quran, jurisprudence, poetry, and medicine, teaching senior Companions who came to her with questions. When slanderers falsely accused her, God Himself declared her innocence in verses of the Quran. She lived for decades after the Prophet's passing, preserving and transmitting his teachings to the community.",
    "summaryBn": "আয়িশা (রাঃ), আবু বকর সিদ্দিকের কন্যা, ছিলেন নবী (সাঃ)-এর প্রিয়তমা স্ত্রী এবং ইসলামের প্রাথমিক যুগের অন্যতম শ্রেষ্ঠ জ্ঞানী। তীক্ষ্ণবুদ্ধি ও বাগ্মী এই নারী দুই হাজারেরও বেশি (প্রায় ২,২১০টি) হাদিস বর্ণনা করেন এবং কুরআন, ফিকহ, কাব্য ও চিকিৎসাশাস্ত্রে অগ্রণী কর্তৃপক্ষে পরিণত হন; বড় বড় সাহাবিগণও তাঁর কাছে প্রশ্ন নিয়ে আসতেন। অপবাদকারীরা যখন তাঁর বিরুদ্ধে মিথ্যা অভিযোগ তোলে, তখন স্বয়ং আল্লাহ কুরআনের আয়াতে তাঁর নির্দোষিতা ঘোষণা করেন। নবীর ইন্তিকালের পর তিনি বহু দশক জীবিত থেকে তাঁর শিক্ষা সংরক্ষণ ও প্রচার করেন।",
    "events": [
      {
        "en": "Married the Prophet (peace be upon him) and became closest of his wives to him",
        "bn": "নবীকে (সাঃ) বিবাহ করেন এবং তাঁর স্ত্রীদের মধ্যে সবচেয়ে নিকটজন হন"
      },
      {
        "en": "Falsely slandered, then exonerated by revelation in Surah an-Nur",
        "bn": "মিথ্যা অপবাদের শিকার হন, অতঃপর সূরা আন-নূরের ওহিতে নির্দোষ ঘোষিত হন"
      },
      {
        "en": "Narrated over 2,000 hadith and taught leading Companions",
        "bn": "দুই হাজারেরও বেশি হাদিস বর্ণনা করেন এবং প্রধান সাহাবিদের শিক্ষা দেন"
      },
      {
        "en": "The Prophet passed away and was buried in her chamber",
        "bn": "নবী তাঁর কক্ষেই ইন্তিকাল করেন এবং সেখানেই সমাধিস্থ হন"
      },
      {
        "en": "Became a foremost jurist and teacher for the next generation",
        "bn": "পরবর্তী প্রজন্মের জন্য অগ্রগণ্য ফকিহ ও শিক্ষিকা হন"
      },
      {
        "en": "Abu Musa al-Ashari said the Companions never faced a puzzling matter but found its knowledge with Aishah",
        "bn": "আবু মুসা আল-আশআরি বলতেন, সাহাবিরা কোনো জটিল বিষয়ে আটকে গেলে আয়িশার কাছে তার সমাধান পেতেন"
      },
      {
        "en": "Scholars observed that a great share of Islamic rulings rests upon what she transmitted",
        "bn": "আলেমগণ লক্ষ করেছেন, ইসলামি বিধিবিধানের এক বড় অংশ তাঁর বর্ণিত জ্ঞানের ওপর নির্ভরশীল"
      }
    ],
    "refs": [
      "24:11"
    ],
    "lessonEn": "God defends the honour of the sincere, and knowledge outlives its teacher.",
    "lessonBn": "আল্লাহ সত্যনিষ্ঠদের সম্মান রক্ষা করেন, আর জ্ঞান তার শিক্ষকের চেয়েও দীর্ঘজীবী হয়।"
  },
  {
    "id": "hafsa_bint_umar",
    "order": 52,
    "init": "HU",
    "color": "bg-purple-600",
    "ar": "حفصة بنت عمر",
    "translit": "Hafsa bint Umar",
    "en": "Hafsa bint Umar (RA)",
    "bn": "হাফসা বিনতে উমর (রাঃ)",
    "era": "knowledge",
    "ashara": false,
    "caliph": false,
    "ansar": false,
    "woman": true,
    "roleEn": "Keeper of the Quran Manuscript",
    "roleBn": "কুরআনের পাণ্ডুলিপির রক্ষক",
    "yearEn": "c. 605-665 CE",
    "highlightEn": "The compiled Quran manuscript was entrusted to her care.",
    "highlightBn": "সংকলিত কুরআনের পাণ্ডুলিপি তাঁর হেফাজতে অর্পিত হয়।",
    "summaryEn": "Hafsa (RA), daughter of Umar ibn al-Khattab, was a Mother of the Believers known for her devotion, learning, and love of fasting and prayer. After her first husband, Khunays ibn Hudhafa (RA), died in Medina from wounds he had sustained in battle, the Prophet (peace be upon him) married her. She was literate at a time when few women were, and after the Quran was first compiled under Abu Bakr, the collected sheets (suhuf) eventually passed into her safekeeping. It was from these that Uthman later standardised the written Quran for the whole ummah.",
    "summaryBn": "হাফসা (রাঃ), উমর ইবনুল খাত্তাবের কন্যা, ছিলেন একজন উম্মুল মুমিনীন, যিনি ইবাদত, জ্ঞান এবং রোজা ও নামাজের প্রতি ভালোবাসার জন্য পরিচিত ছিলেন। তাঁর প্রথম স্বামী খুনায়স ইবনে হুযাফা (রাঃ) যুদ্ধে আহত হয়ে মদিনায় ইন্তেকাল করলে নবী (সাঃ) তাঁকে বিবাহ করেন। এমন এক যুগে তিনি লেখাপড়া জানতেন যখন খুব কম নারীই তা জানতেন; আবু বকরের সময় কুরআন প্রথম সংকলিত হলে সংকলিত পৃষ্ঠাগুলো (সুহুফ) পরে তাঁর হেফাজতে আসে। পরবর্তীতে উসমান এগুলো থেকেই সমগ্র উম্মাহর জন্য লিখিত কুরআনকে প্রমিতরূপ দেন।",
    "events": [
      {
        "en": "Daughter of Umar ibn al-Khattab; widowed when her first husband died of wounds sustained in battle",
        "bn": "উমর ইবনুল খাত্তাবের কন্যা; প্রথম স্বামী যুদ্ধে আহত হয়ে মারা গেলে বিধবা হন"
      },
      {
        "en": "Married the Prophet (peace be upon him) and became a Mother of the Believers",
        "bn": "নবীকে (সাঃ) বিবাহ করেন এবং উম্মুল মুমিনীন হন"
      },
      {
        "en": "Literate and devoted to fasting and night prayer",
        "bn": "শিক্ষিতা এবং রোজা ও রাতের নামাজে নিবেদিতা"
      },
      {
        "en": "Entrusted with the collected sheets (suhuf) of the Quran after Umar",
        "bn": "উমরের পর কুরআনের সংকলিত পৃষ্ঠাগুলো (সুহুফ) তাঁর হেফাজতে অর্পিত হয়"
      },
      {
        "en": "Uthman's standard Quran was copied from the sheets in her keeping",
        "bn": "উসমানের প্রমিত কুরআন তাঁর হেফাজতে থাকা পৃষ্ঠাগুলো থেকেই অনুলিপি করা হয়"
      }
    ],
    "refs": [
      "66:1"
    ],
    "lessonEn": "God preserves His Book through the trustworthy hands He chooses.",
    "lessonBn": "আল্লাহ তাঁর নির্বাচিত বিশ্বস্ত হাতের মাধ্যমে তাঁর কিতাব সংরক্ষণ করেন।"
  },
  {
    "id": "umm_salamah",
    "order": 53,
    "init": "US",
    "color": "bg-amber-600",
    "ar": "أم سلمة",
    "translit": "Umm Salamah",
    "en": "Umm Salamah (RA)",
    "bn": "উম্মে সালামা (রাঃ)",
    "era": "knowledge",
    "ashara": false,
    "caliph": false,
    "ansar": false,
    "woman": true,
    "roleEn": "Mother of the Believers, Wise Counsel",
    "roleBn": "উম্মুল মুমিনীন, প্রজ্ঞাময়ী পরামর্শদাত্রী",
    "yearEn": "c. 596-680 CE",
    "highlightEn": "Her wise counsel steadied the Muslims at Hudaybiyyah.",
    "highlightBn": "হুদাইবিয়ায় তাঁর প্রজ্ঞাময় পরামর্শ মুসলিমদের স্থির রাখে।",
    "summaryEn": "Umm Salamah (RA), whose name was Hind bint Abi Umayyah, endured great hardship for her faith, migrating first to Abyssinia and then to Madinah, temporarily separated by force from her husband and child. After her husband Abu Salamah died of wounds from Uhud, the Prophet (peace be upon him) married her. She was intelligent and known for sound judgement; at the treaty of Hudaybiyyah her wise advice helped the Muslims through a tense moment. A noted narrator of hadith, she was the longest-lived of the Mothers of the Believers.",
    "summaryBn": "উম্মে সালামা (রাঃ), যাঁর নাম ছিল হিন্দ বিনতে আবি উমাইয়া, ঈমানের জন্য বহু কষ্ট সহ্য করেছেন; প্রথমে আবিসিনিয়া ও পরে মদিনায় হিজরত করেন এবং জোরপূর্বক কিছুকাল স্বামী-সন্তান থেকে বিচ্ছিন্ন থাকেন। উহুদের আঘাতে তাঁর স্বামী আবু সালামা মারা গেলে নবী (সাঃ) তাঁকে বিবাহ করেন। তিনি ছিলেন বুদ্ধিমতী ও সুবিবেচনার জন্য খ্যাত; হুদাইবিয়ার সন্ধির সংকটময় মুহূর্তে তাঁর প্রজ্ঞাপূর্ণ পরামর্শ মুসলিমদের পথ দেখায়। একজন প্রসিদ্ধ হাদিস বর্ণনাকারিণী হিসেবে তিনি উম্মুল মুমিনীনদের মধ্যে সবচেয়ে দীর্ঘজীবী ছিলেন।",
    "events": [
      {
        "en": "Migrated to Abyssinia, then endured a painful separation during the Hijra to Madinah",
        "bn": "আবিসিনিয়ায় হিজরত করেন, অতঃপর মদিনায় হিজরতকালে বেদনাদায়ক বিচ্ছেদ সহ্য করেন"
      },
      {
        "en": "Widowed when Abu Salamah died of his Uhud wounds",
        "bn": "উহুদের আঘাতে আবু সালামা মারা গেলে বিধবা হন"
      },
      {
        "en": "Married the Prophet (peace be upon him) and became a Mother of the Believers",
        "bn": "নবীকে (সাঃ) বিবাহ করেন এবং উম্মুল মুমিনীন হন"
      },
      {
        "en": "Gave decisive advice to the Prophet at Hudaybiyyah",
        "bn": "হুদাইবিয়ায় নবীকে সিদ্ধান্তমূলক পরামর্শ দেন"
      },
      {
        "en": "Longest-lived Mother of the Believers and a noted hadith narrator",
        "bn": "উম্মুল মুমিনীনদের মধ্যে সর্বাধিক দীর্ঘজীবী ও প্রসিদ্ধ হাদিস বর্ণনাকারিণী"
      }
    ],
    "refs": [
      "3:195",
      "33:35"
    ],
    "lessonEn": "Patience under trial and wisdom in counsel are both marks of faith.",
    "lessonBn": "বিপদে ধৈর্য ও পরামর্শে প্রজ্ঞা—উভয়ই ঈমানের নিদর্শন।"
  },
  {
    "id": "umm_ayman_barakah",
    "order": 54,
    "init": "UA",
    "color": "bg-pink-600",
    "ar": "أُمُّ أَيْمَن بَرَكَة",
    "translit": "Umm Ayman (Barakah)",
    "en": "Umm Ayman (Barakah) (RA)",
    "bn": "উম্মে আইমান (বারাকা) (রাঃ)",
    "era": "first",
    "ashara": false,
    "caliph": false,
    "ansar": false,
    "woman": true,
    "roleEn": "The Prophet's Nursemaid",
    "roleBn": "নবীজির ধাত্রী মা",
    "yearEn": "d. c. 650 CE",
    "highlightEn": "The Prophet called her 'my mother after my mother.'",
    "highlightBn": "নবীজি তাঁকে 'আমার মায়ের পরে আমার মা' বলে ডাকতেন।",
    "summaryEn": "Barakah, known as Umm Ayman, was a freed Abyssinian woman who cared for the Prophet Muhammad (peace be upon him) from his infancy, having served his mother Aminah. He loved her deeply and called her 'my mother after my mother.' She was among the earliest to embrace Islam and migrated both to Abyssinia and to Madinah. She married Zayd ibn Harithah and became the mother of Usama ibn Zayd, beloved of the Prophet. She lived to witness the Prophet's passing, weeping not only for him but for the ceasing of revelation from the heavens.",
    "summaryBn": "বারাকা, যিনি উম্মে আইমান নামে পরিচিত, ছিলেন একজন মুক্ত হাবশি নারী যিনি শৈশব থেকেই নবী মুহাম্মাদ (সাল্লাল্লাহু আলাইহি ওয়া সাল্লাম)-এর দেখাশোনা করতেন; তিনি নবীজির মাতা আমিনার খিদমতে ছিলেন। নবীজি তাঁকে গভীরভাবে ভালোবাসতেন ও 'আমার মায়ের পরে আমার মা' বলে ডাকতেন। তিনি ছিলেন প্রথম দিকের মুসলিমদের একজন এবং আবিসিনিয়া ও মদিনা—উভয় স্থানে হিজরত করেন। তিনি যায়েদ ইবনে হারিসাকে বিবাহ করেন ও নবীজির প্রিয় উসামা ইবনে যায়েদের মা হন। তিনি নবীজির ইন্তেকাল পর্যন্ত জীবিত ছিলেন এবং শুধু তাঁর জন্য নয়, আকাশ থেকে ওহি বন্ধ হয়ে যাওয়ার জন্যও কাঁদতেন।",
    "events": [
      {
        "en": "Cared for the Prophet (peace be upon him) from his infancy",
        "bn": "শৈশব থেকেই নবীজির দেখাশোনা করেন"
      },
      {
        "en": "Among the earliest Muslims; migrated to Abyssinia and Madinah",
        "bn": "প্রথম দিকের মুসলিম; আবিসিনিয়া ও মদিনায় হিজরত করেন"
      },
      {
        "en": "Mother of Usama ibn Zayd, beloved of the Prophet",
        "bn": "নবীজির প্রিয় উসামা ইবনে যায়েদের মা"
      },
      {
        "en": "Wept for the ceasing of revelation after the Prophet's passing",
        "bn": "নবীজির ইন্তেকালের পর ওহি বন্ধ হওয়ায় ক্রন্দন করেন"
      }
    ],
    "refs": [],
    "lessonEn": "Faithful love and service are never forgotten in the sight of Allah and His Messenger.",
    "lessonBn": "বিশ্বস্ত ভালোবাসা ও খিদমত আল্লাহ ও তাঁর রাসূলের কাছে কখনো বিস্মৃত হয় না।"
  },
  {
    "id": "safiyyah_bint_abd_al_muttalib",
    "order": 55,
    "init": "SM",
    "color": "bg-fuchsia-600",
    "ar": "صَفِيَّة بِنْت عَبْد الْمُطَّلِب",
    "translit": "Safiyyah bint Abd al-Muttalib",
    "en": "Safiyyah bint Abd al-Muttalib (RA)",
    "bn": "সাফিয়্যা বিনতে আবদুল মুত্তালিব (রাঃ)",
    "era": "battles",
    "ashara": false,
    "caliph": false,
    "ansar": false,
    "woman": true,
    "roleEn": "The Prophet's Aunt, Defender of the Women's Fort",
    "roleBn": "নবীজির ফুফু, নারীদের দুর্গের রক্ষক",
    "yearEn": "c. 566-640 CE",
    "highlightEn": "She struck down an enemy spy threatening the women's fort at the Battle of the Trench.",
    "highlightBn": "খন্দকের যুদ্ধে নারীদের দুর্গের প্রতি হুমকি এক শত্রু গুপ্তচরকে তিনি আঘাত করে হত্যা করেন।",
    "summaryEn": "Safiyyah bint Abd al-Muttalib was the paternal aunt of the Prophet Muhammad (peace be upon him), the full sister of Hamzah, and the mother of the great companion Zubayr ibn al-Awwam. She embraced Islam and migrated to Madinah. During the Battle of the Trench, while the women and children sheltered in the fort of Hassan ibn Thabit, she confronted an enemy spy scouting their defences and struck him down with a tent pole, protecting the vulnerable when no man was present to defend them. She bore the martyrdom of her brother Hamzah at Uhud with remarkable patience, submitting to Allah's decree.",
    "summaryBn": "সাফিয়্যা বিনতে আবদুল মুত্তালিব ছিলেন নবী মুহাম্মাদ (সাল্লাল্লাহু আলাইহি ওয়া সাল্লাম)-এর ফুফু, হামজার সহোদরা বোন এবং মহান সাহাবি যুবাইর ইবনুল আওয়ামের মা। তিনি ইসলাম গ্রহণ করেন ও মদিনায় হিজরত করেন। খন্দকের যুদ্ধে যখন নারী ও শিশুরা হাসসান ইবনে সাবিতের দুর্গে আশ্রয় নিয়েছিল, তখন তিনি তাদের প্রতিরক্ষা পর্যবেক্ষণকারী এক শত্রু গুপ্তচরের মুখোমুখি হন এবং তাঁবুর খুঁটি দিয়ে তাকে আঘাত করে হত্যা করেন—কোনো পুরুষ রক্ষক না থাকায় অসহায়দের রক্ষা করেন। উহুদে ভাই হামজার শাহাদাত তিনি অসাধারণ ধৈর্যে ও আল্লাহর ফয়সালায় সন্তুষ্ট থেকে সহ্য করেন।",
    "events": [
      {
        "en": "Sister of Hamzah and mother of Zubayr ibn al-Awwam",
        "bn": "হামজার বোন ও যুবাইর ইবনুল আওয়ামের মা"
      },
      {
        "en": "Embraced Islam and migrated to Madinah",
        "bn": "ইসলাম গ্রহণ করেন ও মদিনায় হিজরত করেন"
      },
      {
        "en": "Killed an enemy spy at the Battle of the Trench",
        "bn": "খন্দকের যুদ্ধে এক শত্রু গুপ্তচরকে হত্যা করেন"
      },
      {
        "en": "Bore her brother Hamzah's martyrdom with patience",
        "bn": "ভাই হামজার শাহাদাত ধৈর্যের সাথে সহ্য করেন"
      }
    ],
    "refs": [],
    "lessonEn": "Courage in faith is not confined to men; a believer defends the truth wherever they stand.",
    "lessonBn": "ঈমানের সাহস কেবল পুরুষের নয়; মুমিন যেখানেই থাকুক সত্যকে রক্ষা করে।"
  },
  {
    "id": "julaybib",
    "order": 56,
    "init": "JU",
    "color": "bg-lime-600",
    "ar": "جُلَيْبِيب",
    "translit": "Julaybib",
    "en": "Julaybib (RA)",
    "bn": "জুলাইবিব (রাঃ)",
    "era": "battles",
    "ashara": false,
    "caliph": false,
    "ansar": true,
    "woman": false,
    "roleEn": "The Beloved Poor Companion",
    "roleBn": "প্রিয় দরিদ্র সাহাবি",
    "yearEn": "d. c. 627 CE",
    "highlightEn": "'He is of me and I am of him,' said the Prophet, finding him martyred beside seven he had slain.",
    "highlightBn": "নবীজি বলেন, 'সে আমার থেকে এবং আমি তার থেকে'—তাঁকে সাত শত্রুকে হত্যা করার পর শহীদ অবস্থায় পান।",
    "summaryEn": "Julaybib was a poor companion of humble appearance and unknown lineage, often overlooked by people, yet dearly loved by the Prophet Muhammad (peace be upon him). The Prophet personally sought a marriage for him, and the righteous Ansari parents consented after their daughter reminded them that whatever the Prophet chose could only be good. In a later expedition Julaybib was found martyred on the battlefield, having first slain seven of the enemy around him. The Prophet lifted him upon his own forearms to bury him, declaring, 'He is of me and I am of him,' and supplicated for him.",
    "summaryBn": "জুলাইবিব ছিলেন সাধারণ চেহারা ও অজ্ঞাত বংশের এক দরিদ্র সাহাবি, যাঁকে মানুষ প্রায়ই উপেক্ষা করত, কিন্তু নবী মুহাম্মাদ (সাল্লাল্লাহু আলাইহি ওয়া সাল্লাম) তাঁকে অত্যন্ত ভালোবাসতেন। নবীজি নিজে তাঁর জন্য বিবাহের ব্যবস্থা করেন, এবং এক নেককার আনসারি দম্পতি রাজি হন যখন তাঁদের কন্যা মনে করিয়ে দেন যে নবীজি যা মনোনীত করেছেন তা কল্যাণকরই হবে। পরবর্তী এক অভিযানে জুলাইবিবকে যুদ্ধক্ষেত্রে শহীদ অবস্থায় পাওয়া যায়, তিনি নিজের চারপাশে সাত শত্রুকে হত্যা করেছিলেন। নবীজি তাঁকে নিজ বাহুতে তুলে দাফন করেন এবং বলেন, 'সে আমার থেকে এবং আমি তার থেকে,' আর তাঁর জন্য দোয়া করেন।",
    "events": [
      {
        "en": "Overlooked by society yet loved by the Prophet",
        "bn": "সমাজে উপেক্ষিত তবু নবীজির প্রিয়"
      },
      {
        "en": "The Prophet arranged his marriage to a righteous Ansari woman",
        "bn": "নবীজি এক নেককার আনসারি নারীর সাথে তাঁর বিবাহ দেন"
      },
      {
        "en": "Martyred after slaying seven of the enemy",
        "bn": "সাত শত্রুকে হত্যা করার পর শহীদ হন"
      },
      {
        "en": "The Prophet buried him with his own hands",
        "bn": "নবীজি নিজ হাতে তাঁকে দাফন করেন"
      }
    ],
    "refs": [],
    "lessonEn": "A person's worth before Allah is measured by faith, not by wealth or status.",
    "lessonBn": "আল্লাহর কাছে মানুষের মূল্য নির্ধারিত হয় ঈমান দিয়ে, ধন বা মর্যাদা দিয়ে নয়।"
  },
  {
    "id": "hudhayfah_ibn_al_yaman",
    "order": 57,
    "init": "HY",
    "color": "bg-slate-600",
    "ar": "حُذَيْفَة بْن الْيَمَان",
    "translit": "Hudhayfah ibn al-Yaman",
    "en": "Hudhayfah ibn al-Yaman (RA)",
    "bn": "হুযাইফা ইবনুল ইয়ামান (রাঃ)",
    "era": "battles",
    "ashara": false,
    "caliph": false,
    "ansar": false,
    "woman": false,
    "roleEn": "Keeper of the Prophet's Secret",
    "roleBn": "নবীজির গোপন রহস্যের রক্ষক",
    "yearEn": "d. c. 656 CE",
    "highlightEn": "The Prophet confided to him the names of the hidden hypocrites.",
    "highlightBn": "নবীজি তাঁকে গোপন মুনাফিকদের নাম জানিয়ে রেখেছিলেন।",
    "summaryEn": "Hudhayfah ibn al-Yaman was entrusted by the Prophet Muhammad (peace be upon him) with the names of the hidden hypocrites of Madinah, earning the title 'Keeper of the Secret.' On the bitterly cold, storm-lashed night of the Battle of the Trench, the Prophet sent him alone to scout the camp of Abu Sufyan, and he returned with vital intelligence that the enemy was breaking up. Deeply concerned with sincerity, he often asked the Prophet about coming evil so that he might avoid it. He later served as a commander in the conquest of Persia and as a just governor of Mada'in, dying shortly after the caliph Uthman.",
    "summaryBn": "নবী মুহাম্মাদ (সাল্লাল্লাহু আলাইহি ওয়া সাল্লাম) হুযাইফা ইবনুল ইয়ামানকে মদিনার গোপন মুনাফিকদের নাম জানিয়ে রেখেছিলেন, যার জন্য তাঁকে 'গোপন রহস্যের রক্ষক' বলা হয়। খন্দকের যুদ্ধের প্রচণ্ড শীত ও ঝড়ের রাতে নবীজি তাঁকে একাকী আবু সুফিয়ানের শিবির পর্যবেক্ষণে পাঠান, আর তিনি শত্রুবাহিনী ছত্রভঙ্গ হয়ে পড়ার গুরুত্বপূর্ণ সংবাদ নিয়ে ফিরে আসেন। ইখলাসের ব্যাপারে গভীর সচেতন হয়ে তিনি প্রায়ই নবীজিকে আসন্ন ফিতনা সম্পর্কে জিজ্ঞেস করতেন যাতে তা এড়াতে পারেন। পরে তিনি পারস্য বিজয়ে সেনাপতি ও মাদায়েনের ন্যায়পরায়ণ গভর্নর হিসেবে দায়িত্ব পালন করেন এবং খলিফা উসমানের কিছু পরে ইন্তেকাল করেন।",
    "events": [
      {
        "en": "Entrusted with the names of the hypocrites",
        "bn": "মুনাফিকদের নামের গোপন দায়িত্বপ্রাপ্ত"
      },
      {
        "en": "Scouted the enemy alone on the cold night of the Trench",
        "bn": "খন্দকের শীতল রাতে একাকী শত্রু শিবির পর্যবেক্ষণ করেন"
      },
      {
        "en": "Often asked the Prophet about evil to avoid it",
        "bn": "ফিতনা এড়াতে প্রায়ই নবীজিকে অনিষ্ট সম্পর্কে জিজ্ঞেস করতেন"
      },
      {
        "en": "Commander in the conquest of Persia and governor of Mada'in",
        "bn": "পারস্য বিজয়ের সেনাপতি ও মাদায়েনের গভর্নর"
      }
    ],
    "refs": [],
    "lessonEn": "Guard the trusts placed in you, and stay ever watchful against hypocrisy in the heart.",
    "lessonBn": "তোমার উপর অর্পিত আমানত রক্ষা করো এবং অন্তরের মুনাফিকির ব্যাপারে সদা সতর্ক থাকো।"
  },
  {
    "id": "abu_talha_al_ansari",
    "order": 58,
    "init": "AT",
    "color": "bg-emerald-600",
    "ar": "أَبُو طَلْحَة الْأَنْصَارِي",
    "translit": "Abu Talha al-Ansari",
    "en": "Abu Talha al-Ansari (RA)",
    "bn": "আবু তালহা আল-আনসারি (রাঃ)",
    "era": "battles",
    "ashara": false,
    "caliph": false,
    "ansar": true,
    "woman": false,
    "roleEn": "The Archer who Shielded the Prophet at Uhud",
    "roleBn": "উহুদে নবীজিকে আড়ালকারী তীরন্দাজ",
    "yearEn": "c. 590-654 CE",
    "highlightEn": "At Uhud he shielded the Prophet, saying, 'My chest before yours, O Messenger of Allah.'",
    "highlightBn": "উহুদে তিনি নবীজিকে আড়াল করে বলেন, 'হে আল্লাহর রাসূল, আপনার বুকের আগে আমার বুক।'",
    "summaryEn": "Abu Talha, Zayd ibn Sahl, was a leading Ansari of the Khazraj and a formidable archer. His acceptance of Islam was itself his marriage gift to Umm Sulaym, who accepted his faith as her only dowry. At the Battle of Uhud he stood before the Prophet Muhammad (peace be upon him), shielding him with his body and loosing arrow after arrow, declaring, 'My chest before yours, O Messenger of Allah.' When the verse on charity was revealed, he gave his most beloved garden, Bayruha, in the way of Allah. He was known for frequent fasting and lifelong devotion.",
    "summaryBn": "আবু তালহা, যায়েদ ইবনে সাহল, ছিলেন খাযরাজ গোত্রের একজন শীর্ষস্থানীয় আনসার ও দুর্ধর্ষ তীরন্দাজ। তাঁর ইসলাম গ্রহণই ছিল উম্মে সুলাইমের প্রতি তাঁর মোহর, যিনি কেবল তাঁর ঈমানকেই দেনমোহর হিসেবে গ্রহণ করেন। উহুদের যুদ্ধে তিনি নবী মুহাম্মাদ (সাল্লাল্লাহু আলাইহি ওয়া সাল্লাম)-এর সামনে দাঁড়িয়ে নিজ দেহ দিয়ে তাঁকে আড়াল করেন ও একের পর এক তীর ছোঁড়েন, বলেন, 'হে আল্লাহর রাসূল, আপনার বুকের আগে আমার বুক।' দানের আয়াত নাযিল হলে তিনি নিজের সবচেয়ে প্রিয় বাগান 'বাইরুহা' আল্লাহর পথে দান করেন। তিনি অধিক রোযা ও আজীবন ইবাদতের জন্য পরিচিত ছিলেন।",
    "events": [
      {
        "en": "Umm Sulaym accepted his Islam as her only dowry",
        "bn": "উম্মে সুলাইম তাঁর ইসলামকেই একমাত্র মোহর হিসেবে গ্রহণ করেন"
      },
      {
        "en": "Shielded the Prophet with his body at Uhud",
        "bn": "উহুদে নিজ দেহ দিয়ে নবীজিকে আড়াল করেন"
      },
      {
        "en": "Gave his beloved garden Bayruha in charity",
        "bn": "প্রিয় বাগান বাইরুহা সদকা করেন"
      },
      {
        "en": "Renowned for frequent fasting and worship",
        "bn": "অধিক রোযা ও ইবাদতের জন্য খ্যাত"
      }
    ],
    "refs": [
      "3:92"
    ],
    "lessonEn": "True righteousness is reached by giving away what we love most for Allah's sake.",
    "lessonBn": "যা সবচেয়ে প্রিয় তা আল্লাহর জন্য দান করেই প্রকৃত নেকি অর্জিত হয়।"
  },
  {
    "id": "umm_sulaym_bint_milhan",
    "order": 59,
    "init": "US",
    "color": "bg-rose-500",
    "ar": "أُمُّ سُلَيْم بِنْت مِلْحَان",
    "translit": "Umm Sulaym bint Milhan",
    "en": "Umm Sulaym bint Milhan (RA)",
    "bn": "উম্মে সুলাইম বিনতে মিলহান (রাঃ)",
    "era": "battles",
    "ashara": false,
    "caliph": false,
    "ansar": true,
    "woman": true,
    "roleEn": "The Ansari Mother who Made Faith her Dowry",
    "roleBn": "ঈমানকে দেনমোহর করা আনসারি মা",
    "yearEn": "d. c. 650 CE",
    "highlightEn": "She accepted Islam as her only dowry from Abu Talha.",
    "highlightBn": "তিনি আবু তালহার কাছ থেকে ইসলামকেই একমাত্র মোহর হিসেবে গ্রহণ করেন।",
    "summaryEn": "Umm Sulaym was a wise and resolute Ansari woman, the mother of Anas ibn Malik whom she gave to serve the Prophet Muhammad (peace be upon him). When Abu Talha proposed to her while still an idolater, she agreed to marry him only if he accepted Islam, making his faith her entire dowry, a marriage praised for its blessing. She showed extraordinary patience when her young son died, waiting to inform her husband gently after the night had passed. She accompanied the Muslims at Uhud and Hunayn, carrying a dagger and tending the wounded, and the Prophet gave her glad tidings of Paradise.",
    "summaryBn": "উম্মে সুলাইম ছিলেন একজন প্রজ্ঞাময়ী ও দৃঢ়চেতা আনসারি নারী, আনাস ইবনে মালিকের মা, যাঁকে তিনি নবী মুহাম্মাদ (সাল্লাল্লাহু আলাইহি ওয়া সাল্লাম)-এর খিদমতে দিয়ে দেন। আবু তালহা মুশরিক অবস্থায় তাঁকে বিবাহের প্রস্তাব দিলে তিনি কেবল এই শর্তে রাজি হন যে তিনি ইসলাম গ্রহণ করবেন, আর তাঁর ঈমানকেই পূর্ণ দেনমোহর করেন—এই বিবাহ তার বরকতের জন্য প্রশংসিত হয়। শিশু পুত্রের মৃত্যুতে তিনি অসাধারণ ধৈর্য দেখান, রাত পার হওয়ার পর কোমলভাবে স্বামীকে সংবাদ দেন। তিনি উহুদ ও হুনাইনে মুসলিমদের সাথে ছিলেন, ছোরা বহন করতেন ও আহতদের সেবা করতেন; নবীজি তাঁকে জান্নাতের সুসংবাদ দেন।",
    "events": [
      {
        "en": "Made Abu Talha's Islam her only dowry",
        "bn": "আবু তালহার ইসলামকেই একমাত্র মোহর করেন"
      },
      {
        "en": "Gave her son Anas to serve the Prophet",
        "bn": "পুত্র আনাসকে নবীজির খিদমতে দেন"
      },
      {
        "en": "Bore her son's death with remarkable patience",
        "bn": "পুত্রের মৃত্যু অসাধারণ ধৈর্যে সহ্য করেন"
      },
      {
        "en": "Tended the wounded at Uhud and Hunayn",
        "bn": "উহুদ ও হুনাইনে আহতদের সেবা করেন"
      }
    ],
    "refs": [],
    "lessonEn": "Placing faith above every worldly gain brings blessing into a whole household.",
    "lessonBn": "প্রতিটি পার্থিব লাভের ঊর্ধ্বে ঈমানকে স্থান দিলে গোটা পরিবারে বরকত আসে।"
  },
  {
    "id": "abdullah_ibn_salam",
    "order": 60,
    "init": "IS",
    "color": "bg-teal-600",
    "ar": "عَبْد اللَّه بْن سَلَام",
    "translit": "Abdullah ibn Salam",
    "en": "Abdullah ibn Salam (RA)",
    "bn": "আবদুল্লাহ ইবনে সালাম (রাঃ)",
    "era": "knowledge",
    "ashara": false,
    "caliph": false,
    "ansar": false,
    "woman": false,
    "roleEn": "The Rabbi who Recognised the Truth",
    "roleBn": "সত্যকে চিনে নেওয়া রাব্বি",
    "yearEn": "d. c. 663 CE",
    "highlightEn": "A learned rabbi who embraced Islam on meeting the Prophet, given glad tidings of Paradise.",
    "highlightBn": "একজন জ্ঞানী রাব্বি, নবীজির সাক্ষাতে ইসলাম গ্রহণ করেন ও জান্নাতের সুসংবাদপ্রাপ্ত হন।",
    "summaryEn": "Abdullah ibn Salam was a respected Jewish rabbi of Madinah, deeply learned in the Torah. When the Prophet Muhammad (peace be upon him) arrived on the Hijra, he came to test him with questions only a true prophet could answer, and on hearing the replies he embraced Islam at once with his household. He first kept his conversion hidden to test how his people would speak of him, then declared it openly and bore their hostility. He was among the companions given glad tidings of Paradise in their lifetime, and counselled patience and unity during the later trials among the Muslims.",
    "summaryBn": "আবদুল্লাহ ইবনে সালাম ছিলেন মদিনার একজন সম্মানিত ইহুদি রাব্বি, তাওরাতে গভীর জ্ঞানসম্পন্ন। নবী মুহাম্মাদ (সাল্লাল্লাহু আলাইহি ওয়া সাল্লাম) হিজরত করে এলে তিনি এমন প্রশ্ন নিয়ে তাঁকে পরীক্ষা করতে আসেন যার উত্তর কেবল সত্য নবীই জানেন, আর উত্তর শুনে তিনি তৎক্ষণাৎ পরিবারসহ ইসলাম গ্রহণ করেন। প্রথমে তিনি তাঁর সম্প্রদায় তাঁর সম্পর্কে কী বলে তা যাচাই করতে ইসলাম গোপন রাখেন, পরে প্রকাশ্যে ঘোষণা দেন ও তাদের বিরোধিতা সহ্য করেন। তিনি জীবদ্দশায় জান্নাতের সুসংবাদপ্রাপ্তদের একজন এবং পরবর্তী ফিতনার সময় ধৈর্য ও ঐক্যের পরামর্শ দিতেন।",
    "events": [
      {
        "en": "Tested and then embraced Islam on the Prophet's arrival",
        "bn": "নবীজির আগমনে পরীক্ষা করে ইসলাম গ্রহণ করেন"
      },
      {
        "en": "Concealed his conversion to test his people's honesty",
        "bn": "সম্প্রদায়ের সততা যাচাইয়ে ইসলাম গোপন রাখেন"
      },
      {
        "en": "Given glad tidings of Paradise in his lifetime",
        "bn": "জীবদ্দশায় জান্নাতের সুসংবাদপ্রাপ্ত হন"
      },
      {
        "en": "Urged patience and unity during later trials",
        "bn": "পরবর্তী ফিতনায় ধৈর্য ও ঐক্যের আহ্বান জানান"
      }
    ],
    "refs": [
      "46:10"
    ],
    "lessonEn": "A sincere heart recognises the truth and follows it, whatever the cost.",
    "lessonBn": "আন্তরিক হৃদয় সত্যকে চিনে নেয় ও যেকোনো মূল্যে তা অনুসরণ করে।"
  },
  {
    "id": "abu_qatadah_al_ansari",
    "order": 61,
    "init": "AQ",
    "color": "bg-orange-500",
    "ar": "أَبُو قَتَادَة الْأَنْصَارِي",
    "translit": "Abu Qatadah al-Ansari",
    "en": "Abu Qatadah al-Ansari (RA)",
    "bn": "আবু কাতাদা আল-আনসারি (রাঃ)",
    "era": "battles",
    "ashara": false,
    "caliph": false,
    "ansar": true,
    "woman": false,
    "roleEn": "The Knight of the Messenger of Allah",
    "roleBn": "আল্লাহর রাসূলের অশ্বারোহী বীর",
    "yearEn": "c. 600-654 CE",
    "highlightEn": "The Prophet called him the best of our horsemen.",
    "highlightBn": "নবীজি তাঁকে 'আমাদের শ্রেষ্ঠ অশ্বারোহী' বলে আখ্যায়িত করেন।",
    "summaryEn": "Abu Qatadah al-Harith ibn Rib'i was a courageous Ansari cavalryman whom the Prophet Muhammad (peace be upon him) praised as the best of horsemen. He fought at Uhud and the campaigns that followed, distinguishing himself in combat and being honoured by the Prophet's supplication. On one journey he guarded the sleeping Prophet through the night and shared in the miracle of the water that sufficed a thirsty army. He narrated many hadith and was celebrated for his reliability and generosity, remaining an active companion until his death during the caliphate of Ali (RA).",
    "summaryBn": "আবু কাতাদা আল-হারিস ইবনে রিবয়ি ছিলেন একজন সাহসী আনসারি অশ্বারোহী, যাঁকে নবী মুহাম্মাদ (সাল্লাল্লাহু আলাইহি ওয়া সাল্লাম) শ্রেষ্ঠ অশ্বারোহী বলে প্রশংসা করেন। তিনি উহুদ ও পরবর্তী অভিযানসমূহে যুদ্ধ করেন, বীরত্ব দেখান এবং নবীজির দোয়ায় সম্মানিত হন। এক সফরে তিনি রাতভর ঘুমন্ত নবীজিকে পাহারা দেন এবং তৃষ্ণার্ত বাহিনীর জন্য যথেষ্ট হওয়া পানির মুজিযায় শরিক হন। তিনি বহু হাদিস বর্ণনা করেন এবং তাঁর নির্ভরযোগ্যতা ও দানশীলতার জন্য প্রসিদ্ধ ছিলেন, আলি (রাঃ)-এর খিলাফতকাল পর্যন্ত সক্রিয় সাহাবি হিসেবে জীবিত ছিলেন।",
    "events": [
      {
        "en": "Praised by the Prophet as the best of horsemen",
        "bn": "নবীজি কর্তৃক শ্রেষ্ঠ অশ্বারোহী হিসেবে প্রশংসিত"
      },
      {
        "en": "Fought bravely at Uhud and later campaigns",
        "bn": "উহুদ ও পরবর্তী অভিযানে বীরত্বের সাথে যুদ্ধ করেন"
      },
      {
        "en": "Guarded the sleeping Prophet through the night on a journey",
        "bn": "সফরে রাতভর ঘুমন্ত নবীজিকে পাহারা দেন"
      },
      {
        "en": "A trusted narrator of many hadith",
        "bn": "বহু হাদিসের নির্ভরযোগ্য বর্ণনাকারী"
      }
    ],
    "refs": [],
    "lessonEn": "Bravery and steady service in the cause of Allah earn the love of His Messenger.",
    "lessonBn": "আল্লাহর পথে সাহস ও নিষ্ঠাবান খিদমত তাঁর রাসূলের ভালোবাসা অর্জন করায়।"
  },
  {
    "id": "abdullah_ibn_az_zubayr",
    "order": 62,
    "init": "IZ",
    "color": "bg-indigo-600",
    "ar": "عَبْد اللَّه بْن الزُّبَيْر",
    "translit": "Abdullah ibn az-Zubayr",
    "en": "Abdullah ibn az-Zubayr (RA)",
    "bn": "আবদুল্লাহ ইবনুয যুবাইর (রাঃ)",
    "era": "knowledge",
    "ashara": false,
    "caliph": false,
    "ansar": false,
    "woman": false,
    "roleEn": "First Child Born to the Emigrants in Madinah",
    "roleBn": "মদিনায় মুহাজিরদের প্রথম জন্মগ্রহণকারী শিশু",
    "yearEn": "c. 624-692 CE",
    "highlightEn": "His birth was the first among the Emigrants in Madinah, greeted with joyous takbir.",
    "highlightBn": "মদিনায় মুহাজিরদের মধ্যে প্রথম জন্ম তাঁরই, যা আনন্দের তাকবিরে বরণ করা হয়।",
    "summaryEn": "Abdullah ibn az-Zubayr was the son of Zubayr ibn al-Awwam and Asma bint Abi Bakr, and grandson of Abu Bakr as-Siddiq. He was the first child born among the Muhajirun after the Hijra, and the Muslims raised the takbir in joy at his birth, for the enemy had claimed they were cursed with barrenness. He grew into a devout worshipper renowned for long night prayers, extensive fasting, and fearless courage. A narrator of hadith and deeply attached to the Sacred Mosque, he later rebuilt the Ka'bah upon the foundations of Ibrahim. At the end of his life his mother Asma famously urged him to stand firm upon the truth.",
    "summaryBn": "আবদুল্লাহ ইবনুয যুবাইর ছিলেন যুবাইর ইবনুল আওয়াম ও আসমা বিনতে আবি বকরের পুত্র এবং আবু বকর আস-সিদ্দিকের নাতি। হিজরতের পর মুহাজিরদের মধ্যে তিনিই প্রথম জন্মগ্রহণকারী শিশু, আর তাঁর জন্মে মুসলিমরা আনন্দে তাকবির ধ্বনি তোলেন, কারণ শত্রুরা দাবি করেছিল যে তাদের বন্ধ্যাত্বের অভিশাপ দেওয়া হয়েছে। তিনি বড় হয়ে দীর্ঘ রাত্রি-নামায, অধিক রোযা ও নির্ভীক সাহসের জন্য খ্যাত এক নিষ্ঠাবান ইবাদতকারী হন। তিনি হাদিস বর্ণনাকারী ও কাবার প্রতি গভীরভাবে অনুরক্ত ছিলেন এবং পরে ইবরাহিমের ভিত্তির উপর কাবা পুনর্নির্মাণ করেন। জীবনের শেষে তাঁর মা আসমা তাঁকে সত্যের উপর অবিচল থাকার আহ্বান জানান।",
    "events": [
      {
        "en": "First child born to the Emigrants in Madinah",
        "bn": "মদিনায় মুহাজিরদের প্রথম জন্মগ্রহণকারী শিশু"
      },
      {
        "en": "Renowned for long night prayer and much fasting",
        "bn": "দীর্ঘ রাত্রি-নামায ও অধিক রোযার জন্য খ্যাত"
      },
      {
        "en": "Rebuilt the Ka'bah upon the foundations of Ibrahim",
        "bn": "ইবরাহিমের ভিত্তির উপর কাবা পুনর্নির্মাণ করেন"
      },
      {
        "en": "Counselled by his mother Asma to stand firm on truth",
        "bn": "মা আসমা কর্তৃক সত্যে অবিচল থাকার পরামর্শপ্রাপ্ত"
      }
    ],
    "refs": [],
    "lessonEn": "Devotion in worship and firmness in principle mark a life lived for Allah.",
    "lessonBn": "ইবাদতে নিষ্ঠা ও নীতিতে দৃঢ়তা আল্লাহর জন্য যাপিত জীবনের নিদর্শন।"
  },
  {
    "id": "jarir_ibn_abdullah_al_bajali",
    "order": 63,
    "init": "JB",
    "color": "bg-cyan-600",
    "ar": "جَرِير بْن عَبْد اللَّه الْبَجَلِي",
    "translit": "Jarir ibn Abdullah al-Bajali",
    "en": "Jarir ibn Abdullah al-Bajali (RA)",
    "bn": "জারীর ইবনে আবদুল্লাহ আল-বাজালি (রাঃ)",
    "era": "conquest",
    "ashara": false,
    "caliph": false,
    "ansar": false,
    "woman": false,
    "roleEn": "Chieftain of Bajila, the 'Joseph of this Nation'",
    "roleBn": "বাজিলার সরদার, 'এই উম্মতের ইউসুফ'",
    "yearEn": "d. c. 671 CE",
    "highlightEn": "For his handsome bearing the Prophet likened him to Yusuf.",
    "highlightBn": "সুদর্শন চেহারার জন্য নবীজি তাঁকে ইউসুফের সাথে তুলনা করেন।",
    "summaryEn": "Jarir ibn Abdullah was the noble chieftain of the tribe of Bajila from Yemen, who came to Madinah and embraced Islam near the end of the Prophet's life. Tall and strikingly handsome, he was likened by the Prophet Muhammad (peace be upon him) to the Prophet Yusuf, and honoured so that the Prophet spread his cloak for him to sit upon. He pledged to sincerely advise every Muslim, a covenant he upheld. At the Prophet's command he led men to destroy the idol Dhul-Khalasa. He afterwards played a leading role in the conquest of Iraq and Persia, fighting notably at the Battle of Qadisiyyah.",
    "summaryBn": "জারীর ইবনে আবদুল্লাহ ছিলেন ইয়েমেনের বাজিলা গোত্রের সম্ভ্রান্ত সরদার, যিনি মদিনায় এসে নবীজির জীবনের শেষভাগে ইসলাম গ্রহণ করেন। দীর্ঘদেহী ও অসাধারণ সুদর্শন হওয়ায় নবী মুহাম্মাদ (সাল্লাল্লাহু আলাইহি ওয়া সাল্লাম) তাঁকে নবী ইউসুফের সাথে তুলনা করেন এবং এতটা সম্মান দেন যে বসতে নিজের চাদর বিছিয়ে দেন। তিনি প্রত্যেক মুসলিমের প্রতি আন্তরিক কল্যাণকামিতার অঙ্গীকার করেন ও তা রক্ষা করেন। নবীজির নির্দেশে তিনি যুল-খালাসা মূর্তি ধ্বংস করতে দল নিয়ে যান। পরে তিনি ইরাক ও পারস্য বিজয়ে অগ্রণী ভূমিকা রাখেন, বিশেষত কাদিসিয়ার যুদ্ধে।",
    "events": [
      {
        "en": "Chieftain of Bajila who embraced Islam late in the Prophet's life",
        "bn": "বাজিলার সরদার, নবীজির শেষজীবনে ইসলাম গ্রহণ করেন"
      },
      {
        "en": "Likened by the Prophet to the Prophet Yusuf",
        "bn": "নবীজি তাঁকে নবী ইউসুফের সাথে তুলনা করেন"
      },
      {
        "en": "Pledged sincere counsel to every Muslim",
        "bn": "প্রত্যেক মুসলিমের প্রতি আন্তরিক কল্যাণকামিতার অঙ্গীকার করেন"
      },
      {
        "en": "Fought in the conquest of Iraq at Qadisiyyah",
        "bn": "কাদিসিয়ায় ইরাক বিজয়ে যুদ্ধ করেন"
      }
    ],
    "refs": [],
    "lessonEn": "Sincere goodwill and honest counsel to others lie at the heart of the religion.",
    "lessonBn": "অন্যের প্রতি আন্তরিক শুভকামনা ও সৎ পরামর্শই দ্বীনের মর্মকথা।"
  },
  {
    "id": "zaynab_bint_jahsh",
    "order": 64,
    "init": "ZJ",
    "color": "bg-violet-600",
    "ar": "زَيْنَب بِنْت جَحْش",
    "translit": "Zaynab bint Jahsh",
    "en": "Zaynab bint Jahsh (RA)",
    "bn": "যয়নব বিনতে জাহশ (রাঃ)",
    "era": "knowledge",
    "ashara": false,
    "caliph": false,
    "ansar": false,
    "woman": true,
    "roleEn": "Mother of the Believers, Married by Command from Above",
    "roleBn": "উম্মুল মুমিনীন, ঊর্ধ্বাকাশের নির্দেশে বিবাহিতা",
    "yearEn": "c. 590-641 CE",
    "highlightEn": "Her marriage to the Prophet was ordained in the Qur'an itself.",
    "highlightBn": "নবীজির সাথে তাঁর বিবাহ স্বয়ং কুরআনে নির্ধারিত হয়।",
    "summaryEn": "Zaynab bint Jahsh was a cousin of the Prophet Muhammad (peace be upon him), a woman of noble descent and deep piety. She was first married to Zayd ibn Harithah, the Prophet's freed slave and formerly adopted son, but the marriage did not endure. When it ended, Allah revealed that the Prophet should marry her, abolishing the pre-Islamic custom that forbade marrying the former wives of adopted sons. She would proudly say her marriage was arranged by Allah above the seven heavens. Generous and God-conscious, she worked with her hands and gave all in charity to the poor.",
    "summaryBn": "যয়নব বিনতে জাহশ ছিলেন নবী মুহাম্মাদ (সাল্লাল্লাহু আলাইহি ওয়া সাল্লাম)-এর ফুফাতো বোন, সম্ভ্রান্ত বংশ ও গভীর তাকওয়ার অধিকারিণী। প্রথমে তিনি নবীজির মুক্ত দাস ও পূর্বে পালকপুত্র যায়েদ ইবনে হারিসার সাথে বিবাহিত ছিলেন, কিন্তু সে বিবাহ টেকেনি। তা শেষ হলে আল্লাহ নির্দেশ দেন যে নবীজি তাঁকে বিবাহ করবেন, যা পালকপুত্রের প্রাক্তন স্ত্রীকে বিবাহ নিষিদ্ধকারী জাহেলি প্রথা রহিত করে। তিনি গর্ব করে বলতেন যে তাঁর বিবাহ সপ্ত আকাশের ঊর্ধ্বে আল্লাহ নিজেই সম্পন্ন করেছেন। দানশীল ও আল্লাহভীরু এই নারী নিজ হাতে কাজ করতেন ও সবকিছু দরিদ্রদের দান করতেন।",
    "events": [
      {
        "en": "First married to Zayd ibn Harithah",
        "bn": "প্রথমে যায়েদ ইবনে হারিসার সাথে বিবাহিত"
      },
      {
        "en": "Her marriage to the Prophet revealed in the Qur'an",
        "bn": "নবীজির সাথে তাঁর বিবাহ কুরআনে নাযিল হয়"
      },
      {
        "en": "The verse of hijab was revealed at her wedding feast",
        "bn": "তাঁর ওলিমায় হিজাবের আয়াত নাযিল হয়"
      },
      {
        "en": "Worked with her hands and gave everything to the poor",
        "bn": "নিজ হাতে কাজ করে সব দরিদ্রদের দান করতেন"
      }
    ],
    "refs": [
      "33:37",
      "33:53"
    ],
    "lessonEn": "Submission to Allah's command outweighs every inherited social custom.",
    "lessonBn": "আল্লাহর নির্দেশের কাছে আত্মসমর্পণ উত্তরাধিকারসূত্রে পাওয়া সব সামাজিক প্রথার ঊর্ধ্বে।"
  },
  {
    "id": "uqbah_ibn_amir_al_juhani",
    "order": 65,
    "init": "UA",
    "color": "bg-sky-600",
    "ar": "عُقْبَة بْن عَامِر الْجُهَنِي",
    "translit": "Uqbah ibn Amir al-Juhani",
    "en": "Uqbah ibn Amir al-Juhani (RA)",
    "bn": "উকবা ইবনে আমির আল-জুহানি (রাঃ)",
    "era": "knowledge",
    "ashara": false,
    "caliph": false,
    "ansar": false,
    "woman": false,
    "roleEn": "Reciter, Jurist and Companion of the Prophet's Journeys",
    "roleBn": "ক্বারী, ফকিহ ও নবীজির সফরসঙ্গী",
    "yearEn": "d. c. 678 CE",
    "highlightEn": "A gifted reciter of the Qur'an whom the Prophet loved to hear.",
    "highlightBn": "কুরআনের একজন সুকণ্ঠ ক্বারী, যাঁর তিলাওয়াত নবীজি শুনতে ভালোবাসতেন।",
    "summaryEn": "Uqbah ibn Amir al-Juhani was a devoted companion celebrated for his beautiful recitation of the Qur'an, his grasp of jurisprudence and inheritance law, and his skill in archery. He would lead the Prophet Muhammad's (peace be upon him) she-camel and served him closely on his journeys, receiving direct teaching from him, including the virtues of the last two surahs of the Qur'an. He narrated many hadith and was among those who preserved and taught the Book of Allah. He later served as a governor of Egypt and took part in its campaigns, leaving behind a Qur'an he had written in his own hand.",
    "summaryBn": "উকবা ইবনে আমির আল-জুহানি ছিলেন একজন নিষ্ঠাবান সাহাবি, কুরআনের সুমধুর তিলাওয়াত, ফিকহ ও মিরাসের জ্ঞান এবং তীরন্দাজিতে দক্ষতার জন্য প্রসিদ্ধ। তিনি নবী মুহাম্মাদ (সাল্লাল্লাহু আলাইহি ওয়া সাল্লাম)-এর উষ্ট্রী চালাতেন ও সফরে ঘনিষ্ঠভাবে খিদমত করতেন, নবীজির কাছ থেকে সরাসরি শিক্ষা পান—কুরআনের শেষ দুই সূরার ফযিলতসহ। তিনি বহু হাদিস বর্ণনা করেন এবং আল্লাহর কিতাব সংরক্ষণ ও শিক্ষাদানকারীদের একজন ছিলেন। পরে তিনি মিশরের গভর্নর হিসেবে দায়িত্ব পালন করেন ও এর অভিযানে অংশ নেন, নিজ হাতে লেখা একটি কুরআন রেখে যান।",
    "events": [
      {
        "en": "Renowned for his beautiful Qur'an recitation",
        "bn": "সুমধুর কুরআন তিলাওয়াতের জন্য খ্যাত"
      },
      {
        "en": "Led the Prophet's she-camel and served him on journeys",
        "bn": "নবীজির উষ্ট্রী চালাতেন ও সফরে খিদমত করতেন"
      },
      {
        "en": "Taught the virtues of the last two surahs by the Prophet",
        "bn": "নবীজি তাঁকে শেষ দুই সূরার ফযিলত শেখান"
      },
      {
        "en": "Served as a governor of Egypt",
        "bn": "মিশরের গভর্নর হিসেবে দায়িত্ব পালন করেন"
      }
    ],
    "refs": [],
    "lessonEn": "Honour comes to those who learn the Qur'an, live by it, and pass it on.",
    "lessonBn": "যারা কুরআন শেখে, তা অনুযায়ী জীবন যাপন করে ও অপরকে শেখায়, সম্মান তাদেরই।"
  },
  {
    "id": "al_bara_ibn_azib",
    "order": 66,
    "init": "BA",
    "color": "bg-teal-600",
    "ar": "الْبَرَاءُ بْنُ عَازِبٍ",
    "translit": "al-Bara ibn Azib",
    "en": "al-Bara ibn Azib (RA)",
    "bn": "আল-বারা ইবনে আযিব (রাঃ)",
    "era": "battles",
    "ashara": false,
    "caliph": false,
    "ansar": true,
    "woman": false,
    "roleEn": "Ansari Companion & Hadith Narrator",
    "roleBn": "আনসারি সাহাবি ও হাদিস বর্ণনাকারী",
    "yearEn": "d. c. 71 AH / 690 CE",
    "highlightEn": "A young Ansari who narrated the change of the qibla and about 300 hadith.",
    "highlightBn": "একজন তরুণ আনসারি, যিনি কিবলা পরিবর্তন ও প্রায় ৩০০টি হাদিস বর্ণনা করেন।",
    "summaryEn": "al-Bara ibn Azib (RA) was an Ansari of the Aws in Madinah who, like Abdullah ibn Umar, was judged too young to fight at Badr and Uhud; his first campaign was the Battle of the Trench. He took part in many later expeditions and, in the age of the conquests, led operations in the region of Rayy. He settled in Kufa, where he taught its people and became a prolific narrator, transmitting roughly 300 hadith — among them the well-known report of the changing of the qibla from Jerusalem to the Ka'ba. He is counted among the Companions who carefully preserved and passed on the Prophet's ﷺ sunnah.",
    "summaryBn": "আল-বারা ইবনে আযিব (রাঃ) ছিলেন মদিনার আওস গোত্রের একজন আনসারি, যাঁকে আব্দুল্লাহ ইবনে উমরের মতোই বদর ও উহুদে অংশ নিতে অল্পবয়সী গণ্য করা হয়; তাঁর প্রথম অভিযান ছিল খন্দকের যুদ্ধ। তিনি পরবর্তী বহু অভিযানে অংশ নেন এবং বিজয়ের যুগে রায় অঞ্চলের অভিযান পরিচালনা করেন। তিনি কুফায় বসতি গড়ে সেখানকার মানুষকে শিক্ষা দেন এবং প্রায় ৩০০টি হাদিসের বর্ণনাকারী হয়ে ওঠেন—যার মধ্যে রয়েছে বায়তুল মুকাদ্দাস থেকে কাবার দিকে কিবলা পরিবর্তনের সুপরিচিত বর্ণনাটি। নবীজি ﷺ-এর সুন্নাহ যত্নসহকারে সংরক্ষণ ও প্রচারকারী সাহাবিদের মধ্যে তিনি গণ্য।",
    "events": [
      {
        "en": "Judged too young for Badr and Uhud; his first battle was the Trench (Khandaq)",
        "bn": "বদর ও উহুদে অল্পবয়সী গণ্য হন; তাঁর প্রথম যুদ্ধ ছিল খন্দক"
      },
      {
        "en": "Narrated the hadith of the change of the qibla toward the Ka'ba",
        "bn": "কাবার দিকে কিবলা পরিবর্তনের হাদিস বর্ণনা করেন"
      },
      {
        "en": "Took part in the later conquests and led operations around Rayy",
        "bn": "পরবর্তী বিজয় অভিযানে অংশ নেন ও রায় অঞ্চলে অভিযান পরিচালনা করেন"
      },
      {
        "en": "Settled in Kufa and taught its people, narrating about 300 hadith",
        "bn": "কুফায় বসতি গড়ে সেখানকার মানুষকে শিক্ষা দেন, প্রায় ৩০০টি হাদিস বর্ণনা করেন"
      }
    ],
    "refs": [
      "2:144"
    ],
    "lessonEn": "Those kept from the front line in youth can become guardians of the Prophet's ﷺ words.",
    "lessonBn": "শৈশবে রণাঙ্গন থেকে দূরে রাখা ব্যক্তিও নবীজি ﷺ-এর বাণীর রক্ষক হয়ে উঠতে পারেন।"
  },
  {
    "id": "imran_ibn_husayn",
    "order": 67,
    "init": "IH",
    "color": "bg-sky-600",
    "ar": "عِمْرَانُ بْنُ حُصَيْنٍ",
    "translit": "Imran ibn Husayn",
    "en": "Imran ibn Husayn (RA)",
    "bn": "ইমরান ইবনে হুসাইন (রাঃ)",
    "era": "knowledge",
    "ashara": false,
    "caliph": false,
    "ansar": false,
    "woman": false,
    "roleEn": "Companion, Judge & Hadith Narrator",
    "roleBn": "সাহাবি, বিচারক ও হাদিস বর্ণনাকারী",
    "yearEn": "d. 52 AH / 672 CE",
    "highlightEn": "So patient in illness that the angels would greet him with salam.",
    "highlightBn": "অসুস্থতায় এতটাই ধৈর্যশীল যে ফেরেশতারা তাঁকে সালাম দিতেন।",
    "summaryEn": "Imran ibn Husayn al-Khuza'i (RA) embraced Islam in the year of Khaybar and became a devoted narrator and jurist. Umar ibn al-Khattab sent him to Basra to teach the people fiqh, and he later served there as a judge. In his final years he was afflicted by a painful, drawn-out illness which he bore with remarkable patience; it is reported that the angels would greet him with salam, a comfort that paused when he consented to be cauterized and returned when he left the treatment. He narrated around 130 hadith and was esteemed for his knowledge and forbearance.",
    "summaryBn": "ইমরান ইবনে হুসাইন আল-খুযাঈ (রাঃ) খায়বারের বছরে ইসলাম গ্রহণ করেন এবং একজন নিষ্ঠাবান বর্ণনাকারী ও ফকিহে পরিণত হন। উমর ইবনুল খাত্তাব (রাঃ) তাঁকে বসরার মানুষকে ফিকহ শেখাতে পাঠান এবং পরে তিনি সেখানে বিচারকের দায়িত্ব পালন করেন। জীবনের শেষ বছরগুলোতে তিনি এক যন্ত্রণাদায়ক দীর্ঘ রোগে আক্রান্ত হন, যা তিনি অসাধারণ ধৈর্যের সঙ্গে সহ্য করেন; বর্ণিত আছে, ফেরেশতারা তাঁকে সালাম দিতেন—এই সান্ত্বনা তখন থেমে যায় যখন তিনি দাগ দিয়ে চিকিৎসায় সম্মত হন, আর চিকিৎসা ছেড়ে দিলে তা ফিরে আসে। তিনি প্রায় ১৩০টি হাদিস বর্ণনা করেন এবং জ্ঞান ও সহনশীলতার জন্য সম্মানিত ছিলেন।",
    "events": [
      {
        "en": "Embraced Islam in the year of Khaybar (7 AH)",
        "bn": "খায়বারের বছরে (৭ হিজরি) ইসলাম গ্রহণ করেন"
      },
      {
        "en": "Sent by Umar to teach fiqh to the people of Basra, and served as its judge",
        "bn": "উমর (রাঃ) তাঁকে বসরার মানুষকে ফিকহ শেখাতে পাঠান, সেখানে বিচারক হন"
      },
      {
        "en": "Bore a long illness with patience; the angels would greet him with salam",
        "bn": "দীর্ঘ রোগ ধৈর্যের সঙ্গে সহ্য করেন; ফেরেশতারা তাঁকে সালাম দিতেন"
      },
      {
        "en": "Narrated about 130 hadith of the Prophet ﷺ",
        "bn": "নবীজি ﷺ-এর প্রায় ১৩০টি হাদিস বর্ণনা করেন"
      }
    ],
    "refs": [],
    "lessonEn": "Patience in hidden suffering can raise a believer to the company of angels.",
    "lessonBn": "গোপন কষ্টে ধৈর্য একজন মুমিনকে ফেরেশতাদের সান্নিধ্যে পৌঁছে দিতে পারে।"
  },
  {
    "id": "sahl_ibn_sad",
    "order": 68,
    "init": "SS",
    "color": "bg-emerald-600",
    "ar": "سَهْلُ بْنُ سَعْدٍ السَّاعِدِيّ",
    "translit": "Sahl ibn Sa'd as-Sa'idi",
    "en": "Sahl ibn Sa'd (RA)",
    "bn": "সাহল ইবনে সা'দ (রাঃ)",
    "era": "knowledge",
    "ashara": false,
    "caliph": false,
    "ansar": true,
    "woman": false,
    "roleEn": "Ansari Companion & Hadith Narrator",
    "roleBn": "আনসারি সাহাবি ও হাদিস বর্ণনাকারী",
    "yearEn": "d. c. 91 AH / 710 CE",
    "highlightEn": "Among the very last Companions to die in Madinah.",
    "highlightBn": "মদিনায় সর্বশেষ ইন্তেকালকারী সাহাবিদের একজন।",
    "summaryEn": "Sahl ibn Sa'd as-Sa'idi (RA) was a young Ansari of the Khazraj who lived in Madinah during the Prophet's ﷺ lifetime; his father died when he was small. His original name was Hazn, and the Prophet ﷺ renamed him Sahl. He became a prolific narrator, transmitting about 188 hadith, including his description of the Prophet's ﷺ Pond (al-Hawd) and details of daily life in Madinah. He lived nearly a hundred years and was among the very last of the Companions to pass away in the Prophet's city, teaching the generation of the Followers to the end.",
    "summaryBn": "সাহল ইবনে সা'দ আস-সাঈদি (রাঃ) ছিলেন খাযরাজ গোত্রের এক তরুণ আনসারি, যিনি নবীজি ﷺ-এর জীবদ্দশায় মদিনায় বসবাস করতেন; ছোটবেলায়ই তাঁর পিতা মারা যান। তাঁর আসল নাম ছিল 'হাযন', নবীজি ﷺ তাঁর নাম বদলে রাখেন 'সাহল'। তিনি প্রায় ১৮৮টি হাদিসের বর্ণনাকারী হন—যার মধ্যে রয়েছে নবীজি ﷺ-এর হাউজের (আল-হাউদ) বর্ণনা ও মদিনার দৈনন্দিন জীবনের নানা বিবরণ। তিনি প্রায় একশো বছর জীবিত থাকেন এবং নবীজির শহরে সর্বশেষ ইন্তেকালকারী সাহাবিদের একজন ছিলেন, শেষ পর্যন্ত তাবিঈদের শিক্ষা দিয়ে যান।",
    "events": [
      {
        "en": "A young Ansari boy in Madinah during the Prophet's ﷺ lifetime",
        "bn": "নবীজি ﷺ-এর জীবদ্দশায় মদিনায় এক তরুণ আনসারি বালক"
      },
      {
        "en": "The Prophet ﷺ changed his name from Hazn to Sahl",
        "bn": "নবীজি ﷺ তাঁর নাম 'হাযন' থেকে বদলে 'সাহল' রাখেন"
      },
      {
        "en": "Narrated about 188 hadith, including the description of the Prophet's ﷺ Pond",
        "bn": "প্রায় ১৮৮টি হাদিস বর্ণনা করেন, যার মধ্যে নবীজি ﷺ-এর হাউজের বর্ণনাও আছে"
      },
      {
        "en": "Lived nearly a century and was among the last Companions to die in Madinah",
        "bn": "প্রায় একশো বছর বাঁচেন এবং মদিনায় সর্বশেষ ইন্তেকালকারী সাহাবিদের একজন"
      }
    ],
    "refs": [],
    "lessonEn": "A long life spent teaching keeps the Prophet's ﷺ words alive for new generations.",
    "lessonBn": "শিক্ষাদানে কাটানো দীর্ঘ জীবন নতুন প্রজন্মের জন্য নবীজি ﷺ-এর বাণী জীবন্ত রাখে।"
  },
  {
    "id": "abu_umamah_al_bahili",
    "order": 69,
    "init": "AU",
    "color": "bg-amber-600",
    "ar": "أَبُو أُمَامَةَ الْبَاهِلِيّ",
    "translit": "Abu Umamah al-Bahili",
    "en": "Abu Umamah al-Bahili (RA)",
    "bn": "আবু উমামা আল-বাহিলি (রাঃ)",
    "era": "knowledge",
    "ashara": false,
    "caliph": false,
    "ansar": false,
    "woman": false,
    "roleEn": "Syrian Companion & Hadith Narrator",
    "roleBn": "সিরিয়ার সাহাবি ও হাদিস বর্ণনাকারী",
    "yearEn": "d. c. 86 AH / 705 CE",
    "highlightEn": "The last Companion to pass away in Syria; a prolific narrator.",
    "highlightBn": "সিরিয়ায় সর্বশেষ ইন্তেকালকারী সাহাবি; একজন বিপুল বর্ণনাকারী।",
    "summaryEn": "Abu Umamah al-Bahili (RA), whose name was Suday ibn Ajlan, was a Companion of the Bahila tribe who settled in Syria and taught in Hims. He devoted himself to worship and the transmission of knowledge, narrating around 250 hadith of the Prophet ﷺ. Among his well-known reports is the encouragement to recite Surah al-Baqarah for the blessing it brings. He was one of the long-lived Companions and is remembered as the last of them to pass away in the land of Syria, having taught many of the Followers there.",
    "summaryBn": "আবু উমামা আল-বাহিলি (রাঃ), যাঁর নাম ছিল সুদাই ইবনে আজলান, ছিলেন বাহিলা গোত্রের একজন সাহাবি, যিনি সিরিয়ায় বসতি গড়েন ও হিমসে শিক্ষা দেন। তিনি ইবাদত ও জ্ঞান প্রচারে নিজেকে উৎসর্গ করেন এবং নবীজি ﷺ-এর প্রায় ২৫০টি হাদিস বর্ণনা করেন। তাঁর সুপরিচিত বর্ণনাগুলোর মধ্যে রয়েছে সূরা আল-বাকারার বরকতের জন্য তা তিলাওয়াতের উৎসাহ। তিনি ছিলেন দীর্ঘজীবী সাহাবিদের একজন এবং সিরিয়ার ভূমিতে সর্বশেষ ইন্তেকালকারী সাহাবি হিসেবে স্মরণীয়, যিনি সেখানকার বহু তাবিঈকে শিক্ষা দিয়েছেন।",
    "events": [
      {
        "en": "Of the Bahila tribe; settled in Syria and taught in Hims",
        "bn": "বাহিলা গোত্রের; সিরিয়ায় বসতি গড়ে হিমসে শিক্ষা দেন"
      },
      {
        "en": "Devoted himself to worship and the spreading of knowledge",
        "bn": "নিজেকে ইবাদত ও জ্ঞান প্রচারে উৎসর্গ করেন"
      },
      {
        "en": "Narrated around 250 hadith of the Prophet ﷺ",
        "bn": "নবীজি ﷺ-এর প্রায় ২৫০টি হাদিস বর্ণনা করেন"
      },
      {
        "en": "Remembered as the last of the Companions to die in Syria",
        "bn": "সিরিয়ায় সর্বশেষ ইন্তেকালকারী সাহাবি হিসেবে স্মরণীয়"
      }
    ],
    "refs": [],
    "lessonEn": "A life given to worship and teaching leaves light in the lands it touches.",
    "lessonBn": "ইবাদত ও শিক্ষাদানে নিবেদিত জীবন যেসব ভূমি স্পর্শ করে, সেখানে আলো রেখে যায়।"
  },
  {
    "id": "al_mughirah_ibn_shubah",
    "order": 70,
    "init": "MS",
    "color": "bg-slate-600",
    "ar": "الْمُغِيرَةُ بْنُ شُعْبَةَ",
    "translit": "al-Mughira ibn Shu'ba",
    "en": "al-Mughira ibn Shu'ba (RA)",
    "bn": "আল-মুগিরা ইবনে শুবা (রাঃ)",
    "era": "conquest",
    "ashara": false,
    "caliph": false,
    "ansar": false,
    "woman": false,
    "roleEn": "Statesman, Governor & Hadith Narrator",
    "roleBn": "রাষ্ট্রনায়ক, গভর্নর ও হাদিস বর্ণনাকারী",
    "yearEn": "d. 50 AH / 670 CE",
    "highlightEn": "A shrewd statesman who narrated the hadith of wiping over the socks.",
    "highlightBn": "একজন বিচক্ষণ রাষ্ট্রনায়ক, যিনি মোজার ওপর মাসেহের হাদিস বর্ণনা করেন।",
    "summaryEn": "al-Mughira ibn Shu'ba ath-Thaqafi (RA) of Ta'if embraced Islam and emigrated shortly before the treaty of Hudaybiyya. Counted among the shrewdest political minds of the Arabs, he lost an eye at the Battle of Yarmuk during the conquests. He served as governor of Basra and later of Kufa under Umar and Mu'awiya. He narrated about 130 hadith, most famously his eyewitness report of the Prophet ﷺ wiping over his leather socks (khuff) in ablution — a foundational proof for that practice in Islamic law.",
    "summaryBn": "তায়েফের আল-মুগিরা ইবনে শুবা আস-সাকাফি (রাঃ) হুদায়বিয়ার সন্ধির কিছু আগে ইসলাম গ্রহণ করে হিজরত করেন। আরবের সবচেয়ে বিচক্ষণ রাজনৈতিক মেধাবীদের একজন গণ্য এই সাহাবি বিজয় অভিযানের সময় ইয়ারমুকের যুদ্ধে এক চোখ হারান। তিনি উমর ও মুয়াবিয়ার আমলে বসরা ও পরে কুফার গভর্নর হিসেবে দায়িত্ব পালন করেন। তিনি প্রায় ১৩০টি হাদিস বর্ণনা করেন, যার মধ্যে সবচেয়ে বিখ্যাত হলো অজুতে নবীজি ﷺ-এর মোজার (খুফ) ওপর মাসেহ করার প্রত্যক্ষদর্শী বর্ণনা—যা ইসলামি বিধানে এই আমলের অন্যতম ভিত্তি।",
    "events": [
      {
        "en": "Embraced Islam and emigrated shortly before Hudaybiyya",
        "bn": "হুদায়বিয়ার কিছু আগে ইসলাম গ্রহণ করে হিজরত করেন"
      },
      {
        "en": "One of the shrewdest statesmen of the Arabs; lost an eye at Yarmuk",
        "bn": "আরবের অন্যতম বিচক্ষণ রাষ্ট্রনায়ক; ইয়ারমুকে এক চোখ হারান"
      },
      {
        "en": "Served as governor of Basra and then Kufa",
        "bn": "বসরা ও পরে কুফার গভর্নর হিসেবে দায়িত্ব পালন করেন"
      },
      {
        "en": "Narrated the hadith of wiping over the leather socks (khuff) in wudu",
        "bn": "অজুতে মোজার (খুফ) ওপর মাসেহের হাদিস বর্ণনা করেন"
      }
    ],
    "refs": [],
    "lessonEn": "Worldly shrewdness is best crowned by faithfully carrying the Prophet's ﷺ sunnah.",
    "lessonBn": "পার্থিব বিচক্ষণতার শ্রেষ্ঠ মুকুট হলো নবীজি ﷺ-এর সুন্নাহ বিশ্বস্তভাবে বহন করা।"
  },
  {
    "id": "an_numan_ibn_bashir",
    "order": 71,
    "init": "NB",
    "color": "bg-indigo-600",
    "ar": "النُّعْمَانُ بْنُ بَشِيرٍ",
    "translit": "an-Nu'man ibn Bashir",
    "en": "an-Nu'man ibn Bashir (RA)",
    "bn": "আন-নুমান ইবনে বাশির (রাঃ)",
    "era": "knowledge",
    "ashara": false,
    "caliph": false,
    "ansar": true,
    "woman": false,
    "roleEn": "First Ansari Child of the Hijra & Narrator",
    "roleBn": "হিজরতের পর প্রথম আনসারি সন্তান ও বর্ণনাকারী",
    "yearEn": "d. 65 AH / 684 CE",
    "highlightEn": "Narrated 'the lawful is clear and the unlawful is clear.'",
    "highlightBn": "'হালাল স্পষ্ট আর হারামও স্পষ্ট'—এই হাদিস বর্ণনা করেন।",
    "summaryEn": "an-Nu'man ibn Bashir (RA), of the Khazraj, is said to be the first child born to the Ansar in Madinah after the Hijra. His mother was Amra bint Rawaha, sister of Abdullah ibn Rawaha. As a boy his father Bashir wished to single him out with a gift, and the Prophet ﷺ instructed him to treat all his children equally, saying, 'Fear Allah and be just among your children.' an-Nu'man narrated about 124 hadith, most famously, 'The lawful is clear and the unlawful is clear, and between them are doubtful matters.' He later held governorships under the Umayyads.",
    "summaryBn": "খাযরাজ গোত্রের আন-নুমান ইবনে বাশির (রাঃ) সম্পর্কে বলা হয়, তিনিই হিজরতের পর মদিনায় আনসারদের ঘরে জন্ম নেওয়া প্রথম সন্তান। তাঁর মা ছিলেন আমরা বিনতে রাওয়াহা, আব্দুল্লাহ ইবনে রাওয়াহার বোন। বালক বয়সে তাঁর পিতা বাশির তাঁকে বিশেষ একটি উপহার দিতে চাইলে নবীজি ﷺ সব সন্তানের সঙ্গে সমান আচরণের নির্দেশ দিয়ে বলেন, 'আল্লাহকে ভয় করো এবং সন্তানদের মধ্যে ন্যায়বিচার করো।' আন-নুমান প্রায় ১২৪টি হাদিস বর্ণনা করেন, যার সবচেয়ে বিখ্যাত হলো, 'হালাল স্পষ্ট, হারামও স্পষ্ট, আর এ দুইয়ের মাঝে রয়েছে সন্দেহজনক বিষয়।' পরে তিনি উমাইয়া আমলে গভর্নরের দায়িত্ব পালন করেন।",
    "events": [
      {
        "en": "Said to be the first child born to the Ansar after the Hijra",
        "bn": "হিজরতের পর আনসারদের ঘরে জন্ম নেওয়া প্রথম সন্তান বলে কথিত"
      },
      {
        "en": "The Prophet ﷺ told his father to treat all his children equally in gifts",
        "bn": "নবীজি ﷺ তাঁর পিতাকে সব সন্তানকে উপহারে সমান রাখতে বলেন"
      },
      {
        "en": "Narrated 'the lawful is clear and the unlawful is clear' hadith",
        "bn": "'হালাল স্পষ্ট, হারামও স্পষ্ট' হাদিসটি বর্ণনা করেন"
      },
      {
        "en": "Narrated about 124 hadith and later served as a governor",
        "bn": "প্রায় ১২৪টি হাদিস বর্ণনা করেন এবং পরে গভর্নর হন"
      }
    ],
    "refs": [],
    "lessonEn": "Justice begins at home, in treating one's own children with fairness.",
    "lessonBn": "ন্যায়বিচারের শুরু ঘর থেকেই—নিজের সন্তানদের সঙ্গে ইনসাফ দিয়ে।"
  },
  {
    "id": "maymunah_bint_al_harith",
    "order": 72,
    "init": "MH",
    "color": "bg-pink-600",
    "ar": "مَيْمُونَةُ بِنْتُ الْحَارِثِ",
    "translit": "Maymunah bint al-Harith",
    "en": "Maymunah bint al-Harith (RA)",
    "bn": "মাইমুনা বিনতে আল-হারিস (রাঃ)",
    "era": "knowledge",
    "ashara": false,
    "caliph": false,
    "ansar": false,
    "woman": true,
    "roleEn": "Mother of the Believers & Hadith Narrator",
    "roleBn": "উম্মুল মুমিনীন ও হাদিস বর্ণনাকারী",
    "yearEn": "d. c. 51 AH / 671 CE",
    "highlightEn": "The last woman the Prophet ﷺ married; known for piety and kinship.",
    "highlightBn": "নবীজি ﷺ সর্বশেষ যাঁকে বিবাহ করেন; তাকওয়া ও আত্মীয়তার জন্য পরিচিত।",
    "summaryEn": "Maymunah bint al-Harith (RA) was the last woman the Prophet ﷺ married, in 7 AH during the compensatory Umrah, and thus one of the Mothers of the Believers. She was the maternal aunt of Abdullah ibn Abbas and Khalid ibn al-Walid. Aishah (RA) praised her as among the most God-fearing of the wives and the most mindful of the ties of kinship. She narrated about 76 hadith of the Prophet ﷺ. Fittingly, she passed away at Sarif, the very place near Makkah where her marriage had taken place.",
    "summaryBn": "মাইমুনা বিনতে আল-হারিস (রাঃ) ছিলেন নবীজি ﷺ সর্বশেষ যাঁকে বিবাহ করেন—৭ হিজরিতে উমরাতুল কাযার সময়—আর তাই তিনি উম্মুল মুমিনীনদের একজন। তিনি ছিলেন আব্দুল্লাহ ইবনে আব্বাস ও খালিদ ইবনুল ওয়ালিদের খালা। আয়িশা (রাঃ) তাঁকে নবীপত্নীদের মধ্যে সবচেয়ে বেশি আল্লাহভীরু ও আত্মীয়তার বন্ধন রক্ষাকারী বলে প্রশংসা করেন। তিনি নবীজি ﷺ-এর প্রায় ৭৬টি হাদিস বর্ণনা করেন। যথার্থভাবেই, তিনি মক্কার নিকটবর্তী সেই 'সারিফ' স্থানেই ইন্তেকাল করেন, যেখানে তাঁর বিবাহ সম্পন্ন হয়েছিল।",
    "events": [
      {
        "en": "The last woman the Prophet ﷺ married, in 7 AH during the compensatory Umrah",
        "bn": "৭ হিজরিতে উমরাতুল কাযার সময় নবীজি ﷺ সর্বশেষ যাঁকে বিবাহ করেন"
      },
      {
        "en": "Maternal aunt of Abdullah ibn Abbas and Khalid ibn al-Walid",
        "bn": "আব্দুল্লাহ ইবনে আব্বাস ও খালিদ ইবনুল ওয়ালিদের খালা"
      },
      {
        "en": "Aishah described her as most God-fearing and mindful of kinship ties",
        "bn": "আয়িশা তাঁকে সবচেয়ে আল্লাহভীরু ও আত্মীয়তা রক্ষাকারী বলে বর্ণনা করেন"
      },
      {
        "en": "Narrated about 76 hadith and passed away at Sarif, where she had wed",
        "bn": "প্রায় ৭৬টি হাদিস বর্ণনা করেন এবং যেখানে বিবাহ হয়েছিল সেই সারিফেই ইন্তেকাল করেন"
      }
    ],
    "refs": [
      "33:6"
    ],
    "lessonEn": "Nearness to the Prophet ﷺ was matched by God-consciousness and care for kin.",
    "lessonBn": "নবীজি ﷺ-এর নৈকট্যের সঙ্গে মিলে ছিল আল্লাহভীতি ও আত্মীয়তার যত্ন।"
  },
  {
    "id": "abu_bakrah_ath_thaqafi",
    "order": 73,
    "init": "AB",
    "color": "bg-rose-600",
    "ar": "أَبُو بَكْرَةَ الثَّقَفِيّ",
    "translit": "Abu Bakra ath-Thaqafi",
    "en": "Abu Bakra ath-Thaqafi (RA)",
    "bn": "আবু বাকরা আস-সাকাফি (রাঃ)",
    "era": "conquest",
    "ashara": false,
    "caliph": false,
    "ansar": false,
    "woman": false,
    "roleEn": "Companion of Ta'if & Hadith Narrator",
    "roleBn": "তায়েফের সাহাবি ও হাদিস বর্ণনাকারী",
    "yearEn": "d. c. 52 AH / 672 CE",
    "highlightEn": "He descended the wall of Ta'if on a pulley to embrace Islam.",
    "highlightBn": "কপিকলের সাহায্যে তায়েফের প্রাচীর বেয়ে নেমে ইসলাম গ্রহণ করেন।",
    "summaryEn": "Abu Bakra (RA), whose name was Nufay ibn al-Harith ath-Thaqafi, earned his kunya during the siege of Ta'if when he descended the town's wall on a pulley (bakra) to reach the Prophet ﷺ and accept Islam. He was freed by the Prophet ﷺ and settled in Basra, where he devoted himself to worship and consistently declined posts of authority. He became a prolific narrator, transmitting about 132 hadith, among them the report of the eclipse prayer and warnings against injustice. He is remembered for his scrupulous piety and independence from worldly power.",
    "summaryBn": "আবু বাকরা (রাঃ), যাঁর নাম ছিল নুফাই ইবনুল হারিস আস-সাকাফি, তায়েফ অবরোধের সময় শহরের প্রাচীর বেয়ে এক কপিকলের (বাকরা) সাহায্যে নেমে নবীজি ﷺ-এর কাছে এসে ইসলাম গ্রহণ করেন—এখান থেকেই তাঁর উপনাম আসে। নবীজি ﷺ তাঁকে মুক্ত করেন এবং তিনি বসরায় বসতি গড়েন, যেখানে ইবাদতে নিমগ্ন থেকে বারবার ক্ষমতার পদ প্রত্যাখ্যান করেন। তিনি একজন বিপুল বর্ণনাকারী হন, প্রায় ১৩২টি হাদিস বর্ণনা করেন—যার মধ্যে রয়েছে সূর্যগ্রহণের নামাজের বর্ণনা ও অন্যায়ের বিরুদ্ধে সতর্কবাণী। তিনি কঠোর তাকওয়া ও পার্থিব ক্ষমতা থেকে দূরত্বের জন্য স্মরণীয়।",
    "events": [
      {
        "en": "Descended the wall of Ta'if on a pulley (bakra) to embrace Islam, earning his name",
        "bn": "কপিকলের (বাকরা) সাহায্যে তায়েফের প্রাচীর বেয়ে নেমে ইসলাম গ্রহণ করেন, এ থেকেই নাম"
      },
      {
        "en": "Freed by the Prophet ﷺ and settled in Basra",
        "bn": "নবীজি ﷺ তাঁকে মুক্ত করেন এবং তিনি বসরায় বসতি গড়েন"
      },
      {
        "en": "Devoted himself to worship and declined posts of authority",
        "bn": "ইবাদতে নিমগ্ন থাকেন এবং ক্ষমতার পদ প্রত্যাখ্যান করেন"
      },
      {
        "en": "Narrated about 132 hadith of the Prophet ﷺ",
        "bn": "নবীজি ﷺ-এর প্রায় ১৩২টি হাদিস বর্ণনা করেন"
      }
    ],
    "refs": [],
    "lessonEn": "One bold step toward the truth can define an entire life of devotion.",
    "lessonBn": "সত্যের দিকে একটি সাহসী পদক্ষেপ গোটা একটি নিবেদিত জীবনকে রূপ দিতে পারে।"
  },
  {
    "id": "abu_dujana_simak_ibn_kharashah",
    "order": 74,
    "init": "AD",
    "color": "bg-teal-600",
    "ar": "أَبُو دُجَانَة سِمَاك بْن خَرَشَة",
    "translit": "Abu Dujana Simak ibn Kharashah",
    "en": "Abu Dujana Simak ibn Kharashah (RA)",
    "bn": "আবু দুজানা সিমাক ইবনে খারাশা (রাঃ)",
    "era": "battles",
    "ashara": false,
    "caliph": false,
    "ansar": true,
    "woman": false,
    "roleEn": "The Warrior of the Red Headband",
    "roleBn": "লাল পট্টির যোদ্ধা",
    "yearEn": "d. 633 CE",
    "highlightEn": "He took the Prophet's ﷺ sword at Uhud and gave it its due.",
    "highlightBn": "উহুদে নবীজি ﷺ-এর তরবারি নিয়ে তার হক আদায় করেন।",
    "summaryEn": "Abu Dujana Simak ibn Kharashah (RA) was a courageous warrior of the Ansar from the tribe of Khazraj in Madinah. At the Battle of Uhud the Prophet Muhammad (peace be upon him) held out his sword and asked who would take it and give it its right; Abu Dujana asked what its right was, and when told it was to strike the enemy until it bent, he took it. He tied on his famous red headband, a sign he wore only when he meant to fight to the death, and walked proudly between the ranks. He fought fiercely that day and was among those who guarded the Prophet when the Muslims were scattered. He later attained martyrdom at the Battle of Yamama against Musaylimah the Liar.",
    "summaryBn": "আবু দুজানা সিমাক ইবনে খারাশা (রাঃ) ছিলেন মদিনার খাযরাজ গোত্রের একজন সাহসী আনসার যোদ্ধা। উহুদের যুদ্ধে রাসূলুল্লাহ (সাল্লাল্লাহু আলাইহি ওয়া সাল্লাম) তাঁর তরবারি বাড়িয়ে জিজ্ঞাসা করেন কে এটি নিয়ে এর হক আদায় করবে; আবু দুজানা এর হক জানতে চাইলে তাঁকে বলা হয় বাঁকা হওয়া পর্যন্ত শত্রুকে আঘাত করা, আর তিনি তা গ্রহণ করেন। তিনি তাঁর বিখ্যাত লাল পট্টি বাঁধেন, যা তিনি কেবল মৃত্যুপণ যুদ্ধের সংকল্প করলেই পরতেন, এবং সারিগুলোর মাঝে গর্বভরে চলেন। সেদিন তিনি প্রচণ্ড লড়াই করেন এবং মুসলিমরা ছত্রভঙ্গ হলে যারা নবীজিকে পাহারা দেন তাদের একজন ছিলেন। পরে ইয়ামামার যুদ্ধে মুসায়লিমা কাযযাবের বিরুদ্ধে তিনি শাহাদাত বরণ করেন।",
    "events": [
      {
        "en": "Took the Prophet's ﷺ sword at Uhud and pledged its right",
        "bn": "উহুদে নবীজি ﷺ-এর তরবারি নিয়ে এর হক আদায়ের অঙ্গীকার করেন"
      },
      {
        "en": "Wore his red headband, his mark of fighting to the death",
        "bn": "মৃত্যুপণ যুদ্ধের চিহ্ন লাল পট্টি বাঁধেন"
      },
      {
        "en": "Among those who defended the Prophet ﷺ when ranks broke at Uhud",
        "bn": "উহুদে সারি ভেঙে গেলে নবীজি ﷺ-কে রক্ষাকারীদের একজন"
      },
      {
        "en": "Attained martyrdom at the Battle of Yamama",
        "bn": "ইয়ামামার যুদ্ধে শাহাদাত বরণ করেন"
      }
    ],
    "refs": [],
    "lessonEn": "Courage is not boasting; it is taking up a trust and giving it its full due.",
    "lessonBn": "সাহস মানে বড়াই নয়; বরং একটি আমানত গ্রহণ করে তার পূর্ণ হক আদায় করা।"
  },
  {
    "id": "hanzala_ibn_abi_amir",
    "order": 75,
    "init": "HA",
    "color": "bg-sky-600",
    "ar": "حَنْظَلَة بْن أَبِي عَامِر",
    "translit": "Hanzala ibn Abi Amir",
    "en": "Hanzala ibn Abi Amir (RA)",
    "bn": "হানযালা ইবনে আবি আমির (রাঃ)",
    "era": "battles",
    "ashara": false,
    "caliph": false,
    "ansar": true,
    "woman": false,
    "roleEn": "The One Washed by the Angels",
    "roleBn": "ফেরেশতাদের গোসল দেওয়া শহীদ",
    "yearEn": "d. 625 CE",
    "highlightEn": "Angels washed his body, so he is called Ghasil al-Mala'ika.",
    "highlightBn": "ফেরেশতারা তাঁর দেহ গোসল দেন, তাই তিনি 'গাসিলুল মালাইকা'।",
    "summaryEn": "Hanzala ibn Abi Amir (RA) was a young companion of the Ansar whose father, in tragic contrast, had rejected Islam and fought against the Muslims. Hanzala married on the very night before the Battle of Uhud, and when the call to arms came at dawn he hurried out to join the fighting without having performed the ritual bath (ghusl). He fought bravely and was martyred that day. The Prophet Muhammad (peace be upon him) told the companions that he had seen the angels washing Hanzala between the sky and the earth, so he became known as Ghasil al-Mala'ika, the one washed by the angels. His story shows that Allah honours the sincere believer even in the smallest details of their devotion.",
    "summaryBn": "হানযালা ইবনে আবি আমির (রাঃ) ছিলেন আনসারের একজন তরুণ সাহাবি, যাঁর পিতা করুণভাবে ইসলাম প্রত্যাখ্যান করে মুসলিমদের বিরুদ্ধে যুদ্ধ করেছিলেন। উহুদের যুদ্ধের ঠিক আগের রাতে হানযালা বিবাহ করেন, আর ভোরে যুদ্ধের ডাক এলে তিনি ফরজ গোসল না করেই লড়াইয়ে ছুটে যান। সেদিন তিনি সাহসিকতার সাথে লড়ে শহীদ হন। রাসূলুল্লাহ (সাল্লাল্লাহু আলাইহি ওয়া সাল্লাম) সাহাবিদের জানান যে তিনি আকাশ ও জমিনের মাঝে ফেরেশতাদের হানযালাকে গোসল দিতে দেখেছেন, তাই তিনি 'গাসিলুল মালাইকা' নামে পরিচিত হন। তাঁর কাহিনি দেখায় যে আল্লাহ আন্তরিক মুমিনকে তার ইবাদতের ক্ষুদ্রতম বিষয়েও সম্মানিত করেন।",
    "events": [
      {
        "en": "Married on the night before Uhud",
        "bn": "উহুদের আগের রাতে বিবাহ করেন"
      },
      {
        "en": "Rushed to battle at dawn without performing ghusl",
        "bn": "ভোরে গোসল না করেই যুদ্ধে ছুটে যান"
      },
      {
        "en": "Martyred at the Battle of Uhud",
        "bn": "উহুদের যুদ্ধে শহীদ হন"
      },
      {
        "en": "The Prophet ﷺ saw angels washing his body between sky and earth",
        "bn": "নবীজি ﷺ আকাশ-জমিনের মাঝে ফেরেশতাদের তাঁকে গোসল দিতে দেখেন"
      }
    ],
    "refs": [],
    "lessonEn": "Sincere haste toward Allah's call can earn an honour no worldly deed could buy.",
    "lessonBn": "আল্লাহর ডাকে আন্তরিক তাড়া এমন সম্মান এনে দিতে পারে যা কোনো দুনিয়াবি আমল কিনতে পারে না।"
  },
  {
    "id": "amr_ibn_al_jamuh",
    "order": 76,
    "init": "AJ",
    "color": "bg-lime-600",
    "ar": "عَمْرو بْن الْجَمُوح",
    "translit": "Amr ibn al-Jamuh",
    "en": "Amr ibn al-Jamuh (RA)",
    "bn": "আমর ইবনুল জামুহ (রাঃ)",
    "era": "battles",
    "ansar": true,
    "ashara": false,
    "caliph": false,
    "woman": false,
    "roleEn": "The Lame Man Who Sought Paradise",
    "roleBn": "জান্নাতপ্রত্যাশী পঙ্গু সাহাবি",
    "yearEn": "d. 625 CE",
    "highlightEn": "Old and lame, he insisted on marching to Uhud to seek martyrdom.",
    "highlightBn": "বৃদ্ধ ও খোঁড়া হয়েও শাহাদাতের জন্য উহুদে যাওয়ার জেদ ধরেন।",
    "summaryEn": "Amr ibn al-Jamuh (RA) was an elderly leader of the Ansar of Madinah who walked with a pronounced limp. Before Islam he had honoured an idol in his home, until his sons secretly threw it into a pit again and again, teaching him that a helpless idol could bring no good; he then embraced Islam wholeheartedly. When Uhud came his sons urged him to stay behind because of his lameness and his excuse before Allah, but he refused, saying he longed to tread Paradise with his limping foot. The Prophet Muhammad (peace be upon him) permitted him to go, and he charged into battle and was martyred. The Prophet said he saw him walking sound and whole in Paradise.",
    "summaryBn": "আমর ইবনুল জামুহ (রাঃ) ছিলেন মদিনার আনসারের একজন বয়োবৃদ্ধ নেতা, যিনি স্পষ্ট খোঁড়া পায়ে হাঁটতেন। ইসলামের আগে তিনি ঘরে একটি মূর্তিকে সম্মান করতেন, শেষে তাঁর ছেলেরা বারবার গোপনে সেটি গর্তে ফেলে দিলে তিনি বুঝতে পারেন অসহায় মূর্তি কোনো কল্যাণ আনতে পারে না; এরপর তিনি অন্তর থেকে ইসলাম গ্রহণ করেন। উহুদের সময় ছেলেরা তাঁকে খোঁড়া পায়ের ওজরের কারণে থেকে যেতে বলেন, কিন্তু তিনি অস্বীকার করে বলেন তিনি এই খোঁড়া পা নিয়েই জান্নাতে হাঁটতে চান। রাসূলুল্লাহ (সাল্লাল্লাহু আলাইহি ওয়া সাল্লাম) তাঁকে অনুমতি দেন, আর তিনি যুদ্ধে ঝাঁপিয়ে পড়ে শহীদ হন। নবীজি বলেন তিনি তাঁকে সুস্থ পায়ে জান্নাতে হাঁটতে দেখেছেন।",
    "events": [
      {
        "en": "Abandoned his household idol after his sons exposed its helplessness",
        "bn": "ছেলেরা মূর্তির অসহায়তা দেখানোর পর তা পরিত্যাগ করেন"
      },
      {
        "en": "Insisted on joining Uhud despite his lameness and valid excuse",
        "bn": "খোঁড়া পা ও বৈধ ওজর সত্ত্বেও উহুদে যাওয়ার জেদ ধরেন"
      },
      {
        "en": "Martyred at Uhud alongside his son Khallad",
        "bn": "পুত্র খাল্লাদসহ উহুদে শহীদ হন"
      },
      {
        "en": "The Prophet ﷺ said he saw him walking whole in Paradise",
        "bn": "নবীজি ﷺ বলেন তিনি তাঁকে সুস্থ পায়ে জান্নাতে হাঁটতে দেখেছেন"
      }
    ],
    "refs": [],
    "lessonEn": "A sincere heart turns even its weaknesses into a means of drawing near to Allah.",
    "lessonBn": "আন্তরিক অন্তর নিজের দুর্বলতাকেও আল্লাহর নৈকট্যের মাধ্যম বানিয়ে নেয়।"
  },
  {
    "id": "abdullah_ibn_amr_ibn_haram",
    "order": 77,
    "init": "AH",
    "color": "bg-emerald-600",
    "ar": "عَبْد اللّٰه بْن عَمْرو بْن حَرَام",
    "translit": "Abdullah ibn Amr ibn Haram",
    "en": "Abdullah ibn Amr ibn Haram (RA)",
    "bn": "আবদুল্লাহ ইবনে আমর ইবনে হারাম (রাঃ)",
    "era": "battles",
    "ansar": true,
    "ashara": false,
    "caliph": false,
    "woman": false,
    "roleEn": "The Martyr Whom Allah Addressed",
    "roleBn": "যাঁর সাথে আল্লাহ কথা বলেছেন",
    "yearEn": "d. 625 CE",
    "highlightEn": "Father of Jabir; Allah spoke to him directly after his martyrdom at Uhud.",
    "highlightBn": "জাবিরের পিতা; উহুদে শাহাদাতের পর আল্লাহ তাঁর সাথে সরাসরি কথা বলেন।",
    "summaryEn": "Abdullah ibn Amr ibn Haram (RA) was a noble of the Ansar and one of the leaders (naqib) chosen at the Pledge of Aqaba, and the father of the famous companion Jabir ibn Abdullah. On the eve of Uhud he sensed he would be martyred, so he gathered his son and instructed him to care for his sisters and settle his debts. He was among the first to fall at Uhud, and his body was mutilated by the enemy. The Prophet Muhammad (peace be upon him) later told Jabir that Allah had spoken to his father face to face, asking what he wished; Abdullah asked only to be returned to the world to be killed again in Allah's cause. This is linked to the verse forbidding us to think the martyrs are dead.",
    "summaryBn": "আবদুল্লাহ ইবনে আমর ইবনে হারাম (রাঃ) ছিলেন আনসারের একজন সম্ভ্রান্ত ব্যক্তি এবং আকাবার শপথে নির্বাচিত নেতাদের (নকিব) একজন, আর বিখ্যাত সাহাবি জাবির ইবনে আবদুল্লাহর পিতা। উহুদের প্রাক্কালে তিনি আন্দাজ করেন যে তিনি শহীদ হবেন, তাই ছেলেকে ডেকে বোনদের দেখাশোনা ও ঋণ পরিশোধের নির্দেশ দেন। উহুদে প্রথম শহীদদের একজন ছিলেন তিনি, আর শত্রুরা তাঁর দেহ বিকৃত করে। পরে রাসূলুল্লাহ (সাল্লাল্লাহু আলাইহি ওয়া সাল্লাম) জাবিরকে জানান যে আল্লাহ তাঁর পিতার সাথে সরাসরি কথা বলে তাঁর ইচ্ছা জানতে চেয়েছেন; আবদুল্লাহ কেবল দুনিয়ায় ফিরে আল্লাহর পথে পুনরায় নিহত হওয়ার আকাঙ্ক্ষা করেন। এটি শহীদদের মৃত মনে করতে নিষেধকারী আয়াতের সাথে সংশ্লিষ্ট।",
    "events": [
      {
        "en": "A naqib (leader) chosen at the Pledge of Aqaba",
        "bn": "আকাবার শপথে নির্বাচিত একজন নকিব (নেতা)"
      },
      {
        "en": "Foretold his own martyrdom and instructed his son Jabir",
        "bn": "নিজ শাহাদাতের আভাস দিয়ে ছেলে জাবিরকে নির্দেশ দেন"
      },
      {
        "en": "Among the first martyrs of Uhud",
        "bn": "উহুদের প্রথম শহীদদের একজন"
      },
      {
        "en": "Allah addressed him directly and he wished to return to be martyred again",
        "bn": "আল্লাহ সরাসরি তাঁর সাথে কথা বলেন, তিনি পুনরায় শহীদ হতে চান"
      }
    ],
    "refs": [
      "3:169"
    ],
    "lessonEn": "The martyrs live on with their Lord; death in His path is a doorway, not an end.",
    "lessonBn": "শহীদগণ তাঁদের প্রভুর কাছে জীবিত; তাঁর পথে মৃত্যু শেষ নয়, বরং এক দরজা।"
  },
  {
    "id": "al_bara_ibn_malik_al_ansari",
    "order": 78,
    "init": "BM",
    "color": "bg-orange-500",
    "ar": "الْبَرَاء بْن مَالِك الْأَنْصَارِي",
    "translit": "al-Bara ibn Malik al-Ansari",
    "en": "al-Bara ibn Malik al-Ansari (RA)",
    "bn": "আল-বারা ইবনে মালিক আল-আনসারি (রাঃ)",
    "era": "battles",
    "ansar": true,
    "ashara": false,
    "caliph": false,
    "woman": false,
    "roleEn": "The Hero of Yamama",
    "roleBn": "ইয়ামামার বীর",
    "yearEn": "d. 641 CE",
    "highlightEn": "Thrown over the wall of Musaylimah's garden to open the gate for the Muslims.",
    "highlightBn": "মুসায়লিমার বাগানের দেয়াল টপকে ভেতরে গিয়ে দরজা খুলে দেন।",
    "summaryEn": "Al-Bara ibn Malik al-Ansari (RA) was the brother of the Prophet's servant Anas ibn Malik and one of the bravest warriors of the Ansar. He was a man whose prayers Allah answered, and the companions would sometimes ask him to swear an oath upon Allah in the heat of battle, confident it would be fulfilled. At the Battle of Yamama against Musaylimah the Liar, the enemy retreated into a walled garden; al-Bara had himself lifted on shields and thrown over the wall, where he fought alone until he opened the gate for the Muslim army, though he was wounded many times. He continued to fight in later campaigns in Persia and finally attained the martyrdom he had long sought.",
    "summaryBn": "আল-বারা ইবনে মালিক আল-আনসারি (রাঃ) ছিলেন নবীজির খাদেম আনাস ইবনে মালিকের ভাই এবং আনসারের অন্যতম সাহসী যোদ্ধা। তিনি ছিলেন এমন ব্যক্তি যাঁর দোয়া আল্লাহ কবুল করতেন, আর যুদ্ধের উত্তাপে সাহাবিরা কখনো তাঁকে আল্লাহর নামে শপথ করতে বলতেন এই আস্থায় যে তা পূর্ণ হবে। মুসায়লিমা কাযযাবের বিরুদ্ধে ইয়ামামার যুদ্ধে শত্রুরা একটি প্রাচীরঘেরা বাগানে আশ্রয় নিলে, বারাকে ঢালের ওপর তুলে দেয়ালের ওপারে ফেলে দেওয়া হয়, যেখানে তিনি একাই লড়ে মুসলিম বাহিনীর জন্য দরজা খুলে দেন, যদিও বহুবার আহত হন। পরবর্তীতে পারস্যের অভিযানেও তিনি লড়ে যান এবং শেষে দীর্ঘদিনের কাঙ্ক্ষিত শাহাদাত লাভ করেন।",
    "events": [
      {
        "en": "Brother of Anas ibn Malik and a man whose prayers were answered",
        "bn": "আনাস ইবনে মালিকের ভাই ও যাঁর দোয়া কবুল হতো"
      },
      {
        "en": "Thrown over the wall at Yamama to open the garden gate",
        "bn": "ইয়ামামায় বাগানের দরজা খুলতে দেয়াল টপকে ফেলা হয়"
      },
      {
        "en": "Fought on in the conquests of Persia",
        "bn": "পারস্য বিজয়েও লড়াই চালিয়ে যান"
      },
      {
        "en": "Attained the martyrdom he had long yearned for",
        "bn": "দীর্ঘদিনের কাঙ্ক্ষিত শাহাদাত লাভ করেন"
      }
    ],
    "refs": [],
    "lessonEn": "Nearness to Allah gives a believer a courage the world cannot understand.",
    "lessonBn": "আল্লাহর নৈকট্য মুমিনকে এমন সাহস দেয় যা দুনিয়া বুঝতে পারে না।"
  },
  {
    "id": "abu_sufyan_ibn_al_harith",
    "order": 79,
    "init": "SH",
    "color": "bg-slate-600",
    "ar": "أَبُو سُفْيَان بْن الْحَارِث",
    "translit": "Abu Sufyan ibn al-Harith",
    "en": "Abu Sufyan ibn al-Harith (RA)",
    "bn": "আবু সুফিয়ান ইবনুল হারিস (রাঃ)",
    "era": "conquest",
    "ansar": false,
    "ashara": false,
    "caliph": false,
    "woman": false,
    "roleEn": "The Cousin Who Returned",
    "roleBn": "ফিরে আসা চাচাতো ভাই",
    "yearEn": "d. 639 CE",
    "highlightEn": "The Prophet's ﷺ cousin and foster-brother who embraced Islam before the conquest of Makkah.",
    "highlightBn": "নবীজি ﷺ-এর চাচাতো ভাই ও দুধভাই, মক্কা বিজয়ের আগে ইসলাম গ্রহণ করেন।",
    "summaryEn": "Abu Sufyan ibn al-Harith (RA) was a cousin of the Prophet Muhammad (peace be upon him) and his foster-brother, having been nursed by the same woman, and in youth a close friend. Yet after the mission began he opposed the Prophet for years and composed poetry mocking him. As the Muslims marched to conquer Makkah, he came with his son, repented sincerely, and embraced Islam; the Prophet forgave him warmly. He then fought valiantly at the Battle of Hunayn, standing firm beside the Prophet when many fled, holding the reins of his mule. So complete was his transformation that the Prophet said he hoped Abu Sufyan would be a substitute for Hamza. He lived a life of deep humility and worship until his death.",
    "summaryBn": "আবু সুফিয়ান ইবনুল হারিস (রাঃ) ছিলেন নবী মুহাম্মাদ (সাল্লাল্লাহু আলাইহি ওয়া সাল্লাম)-এর চাচাতো ভাই ও দুধভাই, কারণ একই নারীর দুধ পান করেছিলেন, আর যৌবনে ঘনিষ্ঠ বন্ধু। তবু নবুয়তের পর তিনি বছরের পর বছর নবীজির বিরোধিতা করেন এবং তাঁকে বিদ্রূপ করে কবিতা রচনা করেন। মুসলিমরা মক্কা বিজয়ের পথে রওনা হলে তিনি ছেলেসহ এসে আন্তরিকভাবে তওবা করে ইসলাম গ্রহণ করেন; নবীজি উষ্ণভাবে তাঁকে ক্ষমা করেন। এরপর হুনায়নের যুদ্ধে তিনি বীরত্বের সাথে লড়েন, অনেকে পালিয়ে গেলেও নবীজির খচ্চরের লাগাম ধরে পাশে অবিচল থাকেন। তাঁর পরিবর্তন এতটাই পূর্ণ ছিল যে নবীজি আশা করেন তিনি যেন হামজার স্থলাভিষিক্ত হন। মৃত্যু পর্যন্ত তিনি গভীর বিনয় ও ইবাদতের জীবন যাপন করেন।",
    "events": [
      {
        "en": "Cousin and foster-brother of the Prophet ﷺ, once his opponent",
        "bn": "নবীজি ﷺ-এর চাচাতো ও দুধভাই, একসময় বিরোধী ছিলেন"
      },
      {
        "en": "Embraced Islam sincerely on the march to conquer Makkah",
        "bn": "মক্কা বিজয়ের পথে আন্তরিকভাবে ইসলাম গ্রহণ করেন"
      },
      {
        "en": "Stood firm beside the Prophet ﷺ at Hunayn when others fled",
        "bn": "হুনায়নে অন্যরা পালালেও নবীজি ﷺ-এর পাশে অবিচল থাকেন"
      },
      {
        "en": "Lived out his years in humility, digging his own grave before death",
        "bn": "বিনয়ের সাথে জীবন কাটান, মৃত্যুর আগে নিজ কবর খনন করেন"
      }
    ],
    "refs": [],
    "lessonEn": "No past enmity is too great for sincere repentance to wash away.",
    "lessonBn": "আন্তরিক তওবার সামনে কোনো অতীত শত্রুতাই মুছে ফেলার অসাধ্য নয়।"
  },
  {
    "id": "thabit_ibn_qays_ibn_shammas",
    "order": 80,
    "init": "TQ",
    "color": "bg-fuchsia-600",
    "ar": "ثَابِت بْن قَيْس بْن شَمَّاس",
    "translit": "Thabit ibn Qays ibn Shammas",
    "en": "Thabit ibn Qays ibn Shammas (RA)",
    "bn": "সাবিত ইবনে কায়স ইবনে শাম্মাস (রাঃ)",
    "era": "battles",
    "ansar": true,
    "ashara": false,
    "caliph": false,
    "woman": false,
    "roleEn": "The Orator of the Ansar",
    "roleBn": "আনসারের বাগ্মী",
    "yearEn": "d. 633 CE",
    "highlightEn": "The Prophet's ﷺ spokesman; given glad tidings of Paradise while alive.",
    "highlightBn": "নবীজি ﷺ-এর মুখপাত্র; জীবদ্দশায় জান্নাতের সুসংবাদপ্রাপ্ত।",
    "summaryEn": "Thabit ibn Qays ibn Shammas (RA) was the eloquent orator and spokesman of the Ansar, who would reply on behalf of the Prophet Muhammad (peace be upon him) to visiting delegations just as the poet Hassan answered in verse. He had a naturally loud voice, and when the verse was revealed forbidding the believers from raising their voices above the Prophet's, he feared his deeds were ruined and shut himself in his home grieving. The Prophet reassured him that he was not of the people of the Fire but of the people of Paradise. Years later Thabit had a true dream foretelling his martyrdom and even the settlement of his estate; he was killed at the Battle of Yamama, and his final bequest was carried out exactly as he had seen.",
    "summaryBn": "সাবিত ইবনে কায়স ইবনে শাম্মাস (রাঃ) ছিলেন আনসারের বাগ্মী ও মুখপাত্র, যিনি আগত প্রতিনিধিদলের সামনে রাসূলুল্লাহ (সাল্লাল্লাহু আলাইহি ওয়া সাল্লাম)-এর পক্ষ থেকে জবাব দিতেন, যেমন কবি হাসসান কবিতায় জবাব দিতেন। তাঁর কণ্ঠস্বর ছিল স্বভাবতই উঁচু, আর যখন নবীজির স্বরের ওপর কণ্ঠ না তোলার আয়াত নাজিল হয়, তিনি নিজের আমল বরবাদ হওয়ার আশঙ্কায় ঘরে বন্দি হয়ে শোক করেন। নবীজি তাঁকে আশ্বস্ত করেন যে তিনি জাহান্নামি নন বরং জান্নাতিদের একজন। বছর কয়েক পরে সাবিত এক সত্য স্বপ্নে নিজ শাহাদাত ও এমনকি সম্পত্তির ফয়সালার আভাস পান; ইয়ামামার যুদ্ধে তিনি শহীদ হন, আর তাঁর শেষ অসিয়ত হুবহু তাঁর দেখা মতোই বাস্তবায়িত হয়।",
    "events": [
      {
        "en": "Spokesman of the Ansar before delegations",
        "bn": "প্রতিনিধিদলের সামনে আনসারের মুখপাত্র"
      },
      {
        "en": "Feared ruin at the verse on lowering voices, then reassured of Paradise",
        "bn": "কণ্ঠ নত করার আয়াতে ভয় পান, পরে জান্নাতের আশ্বাস পান"
      },
      {
        "en": "Foretold his martyrdom and estate in a true dream",
        "bn": "সত্য স্বপ্নে নিজ শাহাদাত ও সম্পত্তির আভাস পান"
      },
      {
        "en": "Martyred at the Battle of Yamama",
        "bn": "ইয়ামামার যুদ্ধে শহীদ হন"
      }
    ],
    "refs": [
      "49:2"
    ],
    "lessonEn": "Guard the manners of reverence, and Allah will guard your good deeds.",
    "lessonBn": "সম্মানের আদব রক্ষা করো, আল্লাহ তোমার নেক আমল রক্ষা করবেন।"
  },
  {
    "id": "salamah_ibn_al_akwa",
    "order": 81,
    "init": "SA",
    "color": "bg-cyan-600",
    "ar": "سَلَمَة بْن الْأَكْوَع",
    "translit": "Salamah ibn al-Akwa",
    "en": "Salamah ibn al-Akwa (RA)",
    "bn": "সালামা ইবনুল আকওয়া (রাঃ)",
    "era": "battles",
    "ansar": false,
    "ashara": false,
    "caliph": false,
    "woman": false,
    "roleEn": "The Swift Warrior on Foot",
    "roleBn": "পদাতিক দ্রুতগামী যোদ্ধা",
    "yearEn": "d. 693 CE",
    "highlightEn": "He single-handedly recovered the Prophet's ﷺ camels from raiders.",
    "highlightBn": "একাই লুটেরাদের কাছ থেকে নবীজি ﷺ-এর উট উদ্ধার করেন।",
    "summaryEn": "Salamah ibn al-Akwa (RA) was a companion famed for his speed on foot, said to be able to outrun a galloping horse, and for his skill as an archer and warrior. He gave the pledge of Ridwan to the Prophet Muhammad (peace be upon him) under the tree at Hudaybiyyah three times, being singled out as among the best of the people that day. When raiders from Ghatafan stole the Prophet's grazing camels, Salamah pursued them alone, shooting arrows and shouting battle cries until he recovered every animal and held the enemy off until reinforcements arrived. The Prophet praised him as the best of the foot-soldiers that day. He narrated many hadith and later withdrew to a simple life, dying in Madinah.",
    "summaryBn": "সালামা ইবনুল আকওয়া (রাঃ) ছিলেন পায়ে দৌড়ে অসাধারণ দ্রুতগতির জন্য খ্যাত এক সাহাবি, বলা হয় তিনি ছুটন্ত ঘোড়াকেও পেছনে ফেলতে পারতেন, আর তিনি ছিলেন দক্ষ তীরন্দাজ ও যোদ্ধা। হুদায়বিয়ায় গাছের নিচে তিনি তিনবার রাসূলুল্লাহ (সাল্লাল্লাহু আলাইহি ওয়া সাল্লাম)-এর হাতে রিদওয়ানের বাইআত করেন এবং সেদিনের শ্রেষ্ঠ ব্যক্তিদের একজন হিসেবে বিশেষভাবে উল্লেখিত হন। গাতাফানের লুটেরারা নবীজির চারণরত উট লুট করলে সালামা একাই তাদের পিছু নেন, তীর ছুঁড়ে ও রণহুংকার দিয়ে প্রতিটি পশু উদ্ধার করেন এবং সাহায্য না আসা পর্যন্ত শত্রুকে ঠেকিয়ে রাখেন। নবীজি তাঁকে সেদিনের শ্রেষ্ঠ পদাতিক বলে প্রশংসা করেন। তিনি বহু হাদিস বর্ণনা করেন এবং পরে সাধারণ জীবনে ফিরে মদিনায় ইন্তেকাল করেন।",
    "events": [
      {
        "en": "Gave the Pledge of Ridwan three times at Hudaybiyyah",
        "bn": "হুদায়বিয়ায় তিনবার রিদওয়ানের বাইআত করেন"
      },
      {
        "en": "Alone recovered the Prophet's ﷺ raided camels from Ghatafan",
        "bn": "একাই গাতাফানের কাছ থেকে নবীজি ﷺ-এর লুট হওয়া উট উদ্ধার করেন"
      },
      {
        "en": "Praised by the Prophet ﷺ as the best foot-soldier that day",
        "bn": "নবীজি ﷺ তাঁকে সেদিনের শ্রেষ্ঠ পদাতিক বলে প্রশংসা করেন"
      },
      {
        "en": "Narrated many hadith of the Prophet ﷺ",
        "bn": "নবীজি ﷺ-এর বহু হাদিস বর্ণনা করেন"
      }
    ],
    "refs": [
      "48:18"
    ],
    "lessonEn": "Whatever talent Allah gives you, spend it fearlessly in service of the truth.",
    "lessonBn": "আল্লাহ তোমাকে যে প্রতিভা দিয়েছেন, তা সত্যের সেবায় নির্ভয়ে ব্যয় করো।"
  },
  {
    "id": "abbad_ibn_bishr",
    "order": 82,
    "init": "AB",
    "color": "bg-violet-600",
    "ar": "عَبَّاد بْن بِشْر",
    "translit": "Abbad ibn Bishr",
    "en": "Abbad ibn Bishr (RA)",
    "bn": "আব্বাদ ইবনে বিশর (রাঃ)",
    "era": "battles",
    "ansar": true,
    "ashara": false,
    "caliph": false,
    "woman": false,
    "roleEn": "The Devoted Guardian of the Night",
    "roleBn": "রাতের নিবেদিত প্রহরী",
    "yearEn": "d. 633 CE",
    "highlightEn": "Shot with arrows while praying on guard duty, he refused to break his prayer.",
    "highlightBn": "পাহারায় নামাজরত অবস্থায় তীরবিদ্ধ হয়েও নামাজ ভাঙেননি।",
    "summaryEn": "Abbad ibn Bishr (RA) was a young Ansari companion who embraced Islam at the hands of Musab ibn Umayr before the Hijra, and became known for his devotion, his beautiful recitation, and his night prayer. On one expedition he and Ammar ibn Yasir took turns guarding the camp; Abbad stood in voluntary prayer during his watch, and when an enemy shot him with three arrows he pulled each one out and continued his prayer rather than cut it short, only then waking his companion. The Prophet Muhammad (peace be upon him) once heard his recitation at night and praised it. He was one of the trusted men entrusted to break the idols after the conquest, and he was martyred at the Battle of Yamama, fighting to rally the Ansar.",
    "summaryBn": "আব্বাদ ইবনে বিশর (রাঃ) ছিলেন একজন তরুণ আনসারি সাহাবি, যিনি হিজরতের আগে মুসআব ইবনে উমায়েরের হাতে ইসলাম গ্রহণ করেন এবং তাঁর নিষ্ঠা, সুন্দর তিলাওয়াত ও রাতের নামাজের জন্য পরিচিত হন। এক অভিযানে তিনি ও আম্মার ইবনে ইয়াসির পালা করে শিবির পাহারা দেন; আব্বাদ তাঁর পালায় নফল নামাজে দাঁড়ান, আর শত্রু তাঁকে তিনটি তীর মারলে তিনি প্রতিটি তীর খুলে ফেলে নামাজ সংক্ষিপ্ত না করে চালিয়ে যান, তারপরই সঙ্গীকে জাগান। রাসূলুল্লাহ (সাল্লাল্লাহু আলাইহি ওয়া সাল্লাম) একবার রাতে তাঁর তিলাওয়াত শুনে প্রশংসা করেন। বিজয়ের পর মূর্তি ভাঙার জন্য নিয়োজিত বিশ্বস্তদের একজন ছিলেন তিনি, আর ইয়ামামার যুদ্ধে আনসারকে সমবেত করতে লড়াই করে শহীদ হন।",
    "events": [
      {
        "en": "Embraced Islam through Musab ibn Umayr in Madinah",
        "bn": "মদিনায় মুসআব ইবনে উমায়েরের মাধ্যমে ইসলাম গ্রহণ করেন"
      },
      {
        "en": "Pierced by three arrows on guard, he finished his prayer first",
        "bn": "পাহারায় তিন তীরবিদ্ধ হয়েও আগে নামাজ শেষ করেন"
      },
      {
        "en": "His night recitation was praised by the Prophet ﷺ",
        "bn": "তাঁর রাতের তিলাওয়াত নবীজি ﷺ প্রশংসা করেন"
      },
      {
        "en": "Martyred at Yamama rallying the Ansar",
        "bn": "ইয়ামামায় আনসারকে সমবেত করতে গিয়ে শহীদ হন"
      }
    ],
    "refs": [],
    "lessonEn": "The love of standing before Allah can make even pain feel small.",
    "lessonBn": "আল্লাহর সামনে দাঁড়ানোর ভালোবাসা যন্ত্রণাকেও তুচ্ছ করে দিতে পারে।"
  },
  {
    "id": "usayd_ibn_hudayr",
    "order": 83,
    "init": "UH",
    "color": "bg-indigo-600",
    "ar": "أُسَيْد بْن حُضَيْر",
    "translit": "Usayd ibn Hudayr",
    "en": "Usayd ibn Hudayr (RA)",
    "bn": "উসাইদ ইবনে হুদাইর (রাঃ)",
    "era": "hijra",
    "ansar": true,
    "ashara": false,
    "caliph": false,
    "woman": false,
    "roleEn": "The Chief Whom the Angels Drew Near",
    "roleBn": "যাঁর কাছে ফেরেশতারা নেমেছিলেন",
    "yearEn": "d. 641 CE",
    "highlightEn": "Angels descended to listen as he recited the Quran at night.",
    "highlightBn": "রাতে কুরআন তিলাওয়াতের সময় ফেরেশতারা শুনতে নেমে এসেছিলেন।",
    "summaryEn": "Usayd ibn Hudayr (RA) was a noble chief of the Aws tribe in Madinah, wise, dignified, and skilled in warfare. He came to argue against Musab ibn Umayr, who was teaching Islam before the Hijra, but was so moved by the Quran that he embraced Islam and helped bring his people to faith. One night as he recited Surah al-Baqarah near his tethered horse, the animal grew restless; looking up, he saw a canopy of light with what seemed like lamps, which the Prophet Muhammad (peace be upon him) explained were angels drawing near to listen to his recitation. He was one of the leaders of the Ansar, firm in supporting Abu Bakr's succession, and known for his justice and generosity until his death in Madinah.",
    "summaryBn": "উসাইদ ইবনে হুদাইর (রাঃ) ছিলেন মদিনার আওস গোত্রের একজন সম্ভ্রান্ত নেতা—জ্ঞানী, মর্যাদাবান ও যুদ্ধবিদ্যায় দক্ষ। হিজরতের আগে ইসলাম শিক্ষাদানকারী মুসআব ইবনে উমায়েরের সাথে তর্ক করতে এসে তিনি কুরআনে এতটাই অভিভূত হন যে ইসলাম গ্রহণ করেন এবং নিজ গোত্রকে ঈমানে আনতে সাহায্য করেন। এক রাতে বাঁধা ঘোড়ার কাছে সূরা বাকারা তিলাওয়াতের সময় ঘোড়াটি অস্থির হয়ে ওঠে; উপরে তাকিয়ে তিনি প্রদীপসদৃশ আলোর ছাউনি দেখেন, যা সম্পর্কে রাসূলুল্লাহ (সাল্লাল্লাহু আলাইহি ওয়া সাল্লাম) বলেন সেগুলো ছিল তাঁর তিলাওয়াত শুনতে নেমে আসা ফেরেশতা। তিনি ছিলেন আনসারের একজন নেতা, আবু বকরের খিলাফত সমর্থনে অবিচল, আর মৃত্যু পর্যন্ত ন্যায়পরায়ণতা ও দানশীলতার জন্য পরিচিত।",
    "events": [
      {
        "en": "Came to oppose Musab ibn Umayr but embraced Islam on hearing the Quran",
        "bn": "মুসআবের বিরোধিতা করতে এসে কুরআন শুনে ইসলাম গ্রহণ করেন"
      },
      {
        "en": "Angels descended to listen to his night recitation",
        "bn": "তাঁর রাতের তিলাওয়াত শুনতে ফেরেশতারা নেমে আসেন"
      },
      {
        "en": "A leading chief of the Aws and pillar of the Ansar",
        "bn": "আওসের প্রধান নেতা ও আনসারের স্তম্ভ"
      },
      {
        "en": "Firmly supported the succession of Abu Bakr (RA)",
        "bn": "আবু বকর (রাঃ)-এর খিলাফতে দৃঢ় সমর্থন দেন"
      }
    ],
    "refs": [],
    "lessonEn": "An open heart can turn a moment of argument into a lifetime of guidance.",
    "lessonBn": "একটি উন্মুক্ত অন্তর তর্কের মুহূর্তকেও সারাজীবনের হিদায়াতে রূপান্তর করতে পারে।"
  },
  {
    "id": "khalid_ibn_said_ibn_al_as",
    "order": 84,
    "init": "KS",
    "color": "bg-sky-600",
    "ar": "خالد بن سعيد بن العاص",
    "translit": "Khalid ibn Sa'id ibn al-As",
    "en": "Khalid ibn Sa'id ibn al-As (RA)",
    "bn": "খালিদ ইবনে সাঈদ ইবনুল আস (রাঃ)",
    "era": "first",
    "ashara": false,
    "caliph": false,
    "ansar": false,
    "woman": false,
    "roleEn": "One of the Earliest to Believe",
    "roleBn": "সর্বপ্রথম ঈমান আনয়নকারীদের একজন",
    "yearEn": "d. c. 634 CE",
    "highlightEn": "A dream led him to Islam among its very first converts.",
    "highlightBn": "একটি স্বপ্ন তাঁকে ইসলামের প্রথম দিকের ঈমানদারদের কাতারে নিয়ে আসে।",
    "summaryEn": "Khalid ibn Sa'id ibn al-As (RA) belonged to the powerful Umayyad clan of Quraysh, yet he was among the earliest people to accept Islam, often counted among the first four or five believers. He related that a dream of fire and the Prophet Muhammad (peace be upon him) pulling him back from its edge drew him to faith, and Abu Bakr (RA) encouraged him. His own father raged and beat him for leaving the idols, so he migrated to Abyssinia and stayed there for years. On returning he served the Prophet faithfully, and after the Prophet's passing he fought in the campaigns for Syria, where he was martyred at the battle of Marj as-Suffar. His steadfastness against his own clan marks him among the pioneers of Islam.",
    "summaryBn": "খালিদ ইবনে সাঈদ ইবনুল আস (রাঃ) ছিলেন কুরাইশের শক্তিশালী উমাইয়া গোত্রের সদস্য, তবুও তিনি সর্বপ্রথম ইসলাম গ্রহণকারীদের একজন—প্রায়ই প্রথম চার-পাঁচজন ঈমানদারের অন্তর্ভুক্ত গণ্য হন। তিনি বর্ণনা করেন যে আগুনের এক স্বপ্ন এবং রাসূলুল্লাহ (সাল্লাল্লাহু আলাইহি ওয়া সাল্লাম)-এর তাঁকে সেই আগুনের কিনারা থেকে টেনে সরানোর দৃশ্য তাঁকে ঈমানের দিকে টানে, আর আবু বকর (রাঃ) তাঁকে উৎসাহ দেন। মূর্তি ত্যাগ করায় তাঁর নিজ পিতা ক্ষুব্ধ হয়ে তাঁকে প্রহার করেন, তাই তিনি আবিসিনিয়ায় হিজরত করেন ও বহু বছর সেখানে থাকেন। ফিরে এসে তিনি নবীজির বিশ্বস্ত খেদমত করেন এবং নবীজির ইন্তেকালের পর সিরিয়া অভিযানে অংশ নিয়ে মারজ আস-সুফফারের যুদ্ধে শহীদ হন। নিজ গোত্রের বিরুদ্ধে তাঁর অবিচলতা তাঁকে ইসলামের অগ্রপথিকদের কাতারে স্থান দেয়।",
    "events": [
      {
        "en": "Among the first handful of people to accept Islam",
        "bn": "সর্বপ্রথম ইসলাম গ্রহণকারী মুষ্টিমেয় ব্যক্তিদের একজন"
      },
      {
        "en": "Beaten and disowned by his father for his faith",
        "bn": "ঈমানের কারণে পিতা কর্তৃক প্রহৃত ও ত্যাজ্য"
      },
      {
        "en": "Migrated to Abyssinia to escape persecution",
        "bn": "নির্যাতন থেকে বাঁচতে আবিসিনিয়ায় হিজরত করেন"
      },
      {
        "en": "Martyred fighting in the conquest of Syria",
        "bn": "সিরিয়া বিজয়ের যুদ্ধে শহীদ হন"
      }
    ],
    "refs": [],
    "lessonEn": "The first to answer the truth often pay the highest price, and earn the greatest honour.",
    "lessonBn": "সত্যের ডাকে প্রথম সাড়াদানকারীরা প্রায়ই সর্বোচ্চ মূল্য দেন এবং সর্বোচ্চ মর্যাদা অর্জন করেন।"
  },
  {
    "id": "abdullah_ibn_zayd_al_ansari",
    "order": 85,
    "init": "AZ",
    "color": "bg-teal-600",
    "ar": "عبد الله بن زيد الأنصاري",
    "translit": "Abdullah ibn Zayd al-Ansari",
    "en": "Abdullah ibn Zayd al-Ansari (RA)",
    "bn": "আবদুল্লাহ ইবনে জায়েদ আল-আনসারি (রাঃ)",
    "era": "hijra",
    "ashara": false,
    "caliph": false,
    "ansar": true,
    "woman": false,
    "roleEn": "He Who Saw the Adhan in a Dream",
    "roleBn": "যিনি স্বপ্নে আজান দেখেছিলেন",
    "yearEn": "d. c. 652 CE",
    "highlightEn": "Allah showed him the words of the call to prayer in a dream.",
    "highlightBn": "আল্লাহ তাঁকে স্বপ্নে নামাজের আহ্বানের শব্দগুলো দেখিয়েছিলেন।",
    "summaryEn": "Abdullah ibn Zayd ibn Abd Rabbih (RA) was a companion of the Ansar in Madinah. When the Muslims sought a way to call people to the congregational prayer, opinions differed over a bell, a horn, or a fire. Abdullah then saw a vision in which a man taught him the wording of the adhan, and he came to the Prophet Muhammad (peace be upon him), who confirmed it as a true vision and had Bilal (RA) call it out because of his beautiful, far-reaching voice. Umar ibn al-Khattab (RA) reported having seen the same dream. Abdullah took part in the battles alongside the Prophet and lived on into the caliphate of Uthman (RA), remembered forever for the words the Muslims still call out five times a day.",
    "summaryBn": "আবদুল্লাহ ইবনে জায়েদ ইবনে আবদে রাব্বিহি (রাঃ) ছিলেন মদিনার আনসার সাহাবিদের একজন। মুসলিমরা যখন জামাতে নামাজের জন্য আহ্বানের উপায় খুঁজছিলেন, তখন ঘণ্টা, শিঙা নাকি আগুন—এ নিয়ে মতভেদ দেখা দেয়। এমন সময় আবদুল্লাহ স্বপ্নে দেখেন এক ব্যক্তি তাঁকে আজানের শব্দগুলো শিক্ষা দিচ্ছেন; তিনি রাসূলুল্লাহ (সাল্লাল্লাহু আলাইহি ওয়া সাল্লাম)-এর কাছে এলে নবীজি একে সত্য স্বপ্ন বলে নিশ্চিত করেন এবং বিলাল (রাঃ)-কে তাঁর সুন্দর ও সুদূরপ্রসারী কণ্ঠের কারণে তা ঘোষণা করার নির্দেশ দেন। উমর ইবনুল খাত্তাব (রাঃ)-ও একই স্বপ্ন দেখেছিলেন বলে জানান। আবদুল্লাহ নবীজির সাথে যুদ্ধে অংশ নেন এবং উসমান (রাঃ)-এর খিলাফতকাল পর্যন্ত জীবিত ছিলেন; মুসলিমরা দিনে পাঁচবার যে শব্দ উচ্চারণ করে, তার জন্য তিনি চিরস্মরণীয়।",
    "events": [
      {
        "en": "Saw the words of the adhan taught to him in a true dream",
        "bn": "সত্য স্বপ্নে আজানের শব্দ শেখানো হতে দেখেন"
      },
      {
        "en": "The Prophet confirmed the vision and adopted the call to prayer",
        "bn": "নবীজি স্বপ্নটি সত্যায়ন করেন ও আজান গ্রহণ করেন"
      },
      {
        "en": "Bilal (RA) was chosen to call it aloud",
        "bn": "বিলাল (রাঃ)-কে উচ্চস্বরে আজান দেওয়ার জন্য বেছে নেওয়া হয়"
      },
      {
        "en": "Fought in the battles beside the Prophet (peace be upon him)",
        "bn": "নবীজির সাথে যুদ্ধসমূহে অংশ নেন"
      }
    ],
    "refs": [],
    "lessonEn": "Allah honours the sincere seeker, sometimes granting guidance through the gentlest of means.",
    "lessonBn": "আল্লাহ আন্তরিক অন্বেষণকারীকে সম্মানিত করেন, কখনও সবচেয়ে কোমল উপায়েও হিদায়াত দান করেন।"
  },
  {
    "id": "kab_ibn_malik_al_ansari",
    "order": 86,
    "init": "KM",
    "color": "bg-emerald-600",
    "ar": "كعب بن مالك الأنصاري",
    "translit": "Ka'b ibn Malik al-Ansari",
    "en": "Ka'b ibn Malik al-Ansari (RA)",
    "bn": "কাব ইবনে মালিক আল-আনসারি (রাঃ)",
    "era": "battles",
    "ashara": false,
    "caliph": false,
    "ansar": true,
    "woman": false,
    "roleEn": "The Poet Whose Repentance Allah Accepted",
    "roleBn": "যাঁর তওবা আল্লাহ কবুল করেছিলেন সেই কবি",
    "yearEn": "d. c. 670 CE",
    "highlightEn": "One of the three whose sincere repentance the Quran records.",
    "highlightBn": "কুরআনে যাঁদের আন্তরিক তওবা লিপিবদ্ধ, সেই তিনজনের একজন।",
    "summaryEn": "Ka'b ibn Malik (RA) was one of the poets of the Ansar who defended Islam with his verse, and he pledged allegiance at al-Aqabah before the Hijra. Though he fought in most battles, he stayed behind from the expedition to Tabuk without excuse, out of hesitation rather than hypocrisy. When the army returned, he refused to lie to the Prophet Muhammad (peace be upon him) and told the truth; he and two others were boycotted by the whole community for fifty days as their test. Then Allah revealed the acceptance of their repentance in Surah at-Tawbah, and Ka'b called it the greatest day of his life. He remained a truthful, grateful believer and a guardian of the Prophet's memory.",
    "summaryBn": "কাব ইবনে মালিক (রাঃ) ছিলেন আনসারের একজন কবি, যিনি নিজ কবিতা দিয়ে ইসলামের পক্ষে লড়েছেন এবং হিজরতের পূর্বে আকাবায় বায়আত করেছিলেন। যদিও তিনি অধিকাংশ যুদ্ধে অংশ নেন, তাবুক অভিযানে তিনি মুনাফিকির কারণে নয় বরং গড়িমসির কারণে বিনা ওজরে পিছিয়ে থাকেন। সেনাবাহিনী ফিরে এলে তিনি রাসূলুল্লাহ (সাল্লাল্লাহু আলাইহি ওয়া সাল্লাম)-এর কাছে মিথ্যা বলতে অস্বীকার করে সত্য বলেন; পরীক্ষা হিসেবে তাঁকে ও আরও দুজনকে গোটা সমাজ পঞ্চাশ দিন বয়কট করে। অতঃপর আল্লাহ সূরা তওবায় তাঁদের তওবা কবুলের ঘোষণা নাজিল করেন, আর কাব একে নিজ জীবনের শ্রেষ্ঠ দিন বলে অভিহিত করেন। তিনি আজীবন সত্যবাদী, কৃতজ্ঞ মুমিন ও নবীজির স্মৃতির রক্ষক ছিলেন।",
    "events": [
      {
        "en": "Pledged allegiance to the Prophet at al-Aqabah",
        "bn": "আকাবায় নবীজির হাতে বায়আত করেন"
      },
      {
        "en": "Defended Islam with his poetry",
        "bn": "নিজ কবিতা দিয়ে ইসলামের পক্ষে লড়েন"
      },
      {
        "en": "Told the truth about staying back from Tabuk",
        "bn": "তাবুক থেকে পিছিয়ে থাকার ব্যাপারে সত্য বলেন"
      },
      {
        "en": "Boycotted fifty days, then his repentance accepted in the Quran",
        "bn": "পঞ্চাশ দিন বয়কট, অতঃপর কুরআনে তওবা কবুল হয়"
      }
    ],
    "refs": [
      "9:118"
    ],
    "lessonEn": "Honesty in your worst moment is dearer to Allah than a comfortable lie.",
    "lessonBn": "নিজের সবচেয়ে কঠিন মুহূর্তে সততা আল্লাহর কাছে আরামদায়ক মিথ্যার চেয়ে অধিক প্রিয়।"
  },
  {
    "id": "dihyah_al_kalbi",
    "order": 87,
    "init": "DK",
    "color": "bg-indigo-600",
    "ar": "دحية الكلبي",
    "translit": "Dihyah al-Kalbi",
    "en": "Dihyah al-Kalbi (RA)",
    "bn": "দিহইয়া আল-কালবি (রাঃ)",
    "era": "battles",
    "ashara": false,
    "caliph": false,
    "ansar": false,
    "woman": false,
    "roleEn": "The Envoy Whose Form Jibril Took",
    "roleBn": "যাঁর রূপে জিবরাইল আসতেন সেই দূত",
    "yearEn": "d. c. 670 CE",
    "highlightEn": "So handsome that the angel Jibril would appear in his likeness.",
    "highlightBn": "এত সুদর্শন যে ফেরেশতা জিবরাইল তাঁর রূপে আসতেন।",
    "summaryEn": "Dihyah ibn Khalifah al-Kalbi (RA) was a Companion famed for his striking beauty, and it is reported that the angel Jibril would sometimes come to the Prophet Muhammad (peace be upon him) in his form. A trusted man of standing, he was chosen by the Prophet to carry the letter inviting Heraclius, the emperor of Byzantium, to Islam, a mission he fulfilled with dignity. He took part in the battles and lived to serve in the later conquests of Syria, settling near Damascus. His life shows how the Prophet entrusted grave responsibilities to Companions of wisdom and bearing.",
    "summaryBn": "দিহইয়া ইবনে খালিফা আল-কালবি (রাঃ) ছিলেন অসাধারণ সৌন্দর্যের জন্য খ্যাত একজন সাহাবি, আর বর্ণিত আছে যে ফেরেশতা জিবরাইল কখনও কখনও তাঁর রূপে রাসূলুল্লাহ (সাল্লাল্লাহু আলাইহি ওয়া সাল্লাম)-এর কাছে আসতেন। মর্যাদাবান ও বিশ্বস্ত ব্যক্তি হিসেবে নবীজি তাঁকে বাইজেন্টাইন সম্রাট হিরাক্লিয়াসকে ইসলামের দাওয়াত দিয়ে চিঠি পৌঁছানোর জন্য মনোনীত করেন, যে দায়িত্ব তিনি মর্যাদার সাথে পালন করেন। তিনি যুদ্ধসমূহে অংশ নেন এবং পরবর্তীতে সিরিয়া বিজয়ে খেদমত করেন ও দামেস্কের নিকট বসতি গড়েন। তাঁর জীবন দেখায় নবীজি কীভাবে জ্ঞানী ও মর্যাদাবান সাহাবিদের হাতে গুরুদায়িত্ব অর্পণ করতেন।",
    "events": [
      {
        "en": "Jibril would at times appear in his likeness",
        "bn": "জিবরাইল কখনও তাঁর রূপে আসতেন"
      },
      {
        "en": "Carried the Prophet's letter to Emperor Heraclius",
        "bn": "সম্রাট হিরাক্লিয়াসের কাছে নবীজির চিঠি পৌঁছান"
      },
      {
        "en": "Fought in the battles of Islam",
        "bn": "ইসলামের যুদ্ধসমূহে অংশ নেন"
      },
      {
        "en": "Served in the conquest of Syria and settled near Damascus",
        "bn": "সিরিয়া বিজয়ে খেদমত করেন ও দামেস্কের নিকট বসতি গড়েন"
      }
    ],
    "refs": [],
    "lessonEn": "Great trust is placed in those whose character matches their calling.",
    "lessonBn": "যাঁদের চরিত্র তাঁদের দায়িত্বের সাথে মানানসই, তাঁদের হাতেই বড় আমানত অর্পিত হয়।"
  },
  {
    "id": "utbah_ibn_ghazwan",
    "order": 88,
    "init": "UG",
    "color": "bg-cyan-600",
    "ar": "عتبة بن غزوان",
    "translit": "Utbah ibn Ghazwan",
    "en": "Utbah ibn Ghazwan (RA)",
    "bn": "উতবা ইবনে গাযওয়ান (রাঃ)",
    "era": "first",
    "ashara": false,
    "caliph": false,
    "ansar": false,
    "woman": false,
    "roleEn": "Early Believer and Founder of Basra",
    "roleBn": "প্রথম যুগের মুমিন ও বসরার প্রতিষ্ঠাতা",
    "yearEn": "d. c. 638 CE",
    "highlightEn": "An early convert who founded the great city of Basra.",
    "highlightBn": "একজন প্রথম যুগের মুসলিম, যিনি বসরা নগরী প্রতিষ্ঠা করেন।",
    "summaryEn": "Utbah ibn Ghazwan (RA) was among the earliest to embrace Islam, often counted as the seventh believer, and he migrated first to Abyssinia and then to Madinah. He fought at Badr and in the campaigns that followed, a humble man who disliked worldly rank. Under the caliph Umar ibn al-Khattab (RA) he was sent to Iraq, where he led the founding of the garrison city of Basra, laying out its mosque and settlements. In a famous sermon there he warned against the deceptions of a fleeting world and reminded people that leadership had never suited the arrogant. He died soon after, remembered for piety and simplicity.",
    "summaryBn": "উতবা ইবনে গাযওয়ান (রাঃ) ছিলেন সর্বপ্রথম ইসলাম গ্রহণকারীদের একজন—প্রায়ই সপ্তম মুমিন হিসেবে গণ্য—এবং তিনি প্রথমে আবিসিনিয়ায় ও পরে মদিনায় হিজরত করেন। তিনি বদর ও পরবর্তী অভিযানসমূহে অংশ নেন; দুনিয়াবি পদমর্যাদা অপছন্দকারী একজন বিনয়ী মানুষ ছিলেন। খলিফা উমর ইবনুল খাত্তাব (রাঃ)-এর অধীনে তিনি ইরাকে প্রেরিত হন, যেখানে তিনি সেনানগরী বসরা প্রতিষ্ঠার নেতৃত্ব দেন এবং এর মসজিদ ও বসতি স্থাপন করেন। সেখানে এক বিখ্যাত খুতবায় তিনি ক্ষণস্থায়ী দুনিয়ার ধোঁকা সম্পর্কে সতর্ক করেন ও স্মরণ করান যে নেতৃত্ব কখনও অহংকারীর জন্য শোভনীয় নয়। এর অল্প পরেই তিনি ইন্তেকাল করেন; তাকওয়া ও সরলতার জন্য তিনি স্মরণীয়।",
    "events": [
      {
        "en": "Among the earliest to accept Islam",
        "bn": "সর্বপ্রথম ইসলাম গ্রহণকারীদের একজন"
      },
      {
        "en": "Migrated to Abyssinia and fought at Badr",
        "bn": "আবিসিনিয়ায় হিজরত করেন ও বদরে অংশ নেন"
      },
      {
        "en": "Founded the garrison city of Basra under Umar (RA)",
        "bn": "উমর (রাঃ)-এর অধীনে বসরা নগরী প্রতিষ্ঠা করেন"
      },
      {
        "en": "Warned against pride and the deceptions of the world",
        "bn": "অহংকার ও দুনিয়ার ধোঁকা সম্পর্কে সতর্ক করেন"
      }
    ],
    "refs": [],
    "lessonEn": "Build great things for the sake of God, yet keep your heart free of the world.",
    "lessonBn": "আল্লাহর সন্তুষ্টির জন্য মহৎ কিছু গড়ুন, তবে অন্তরকে দুনিয়ামুক্ত রাখুন।"
  },
  {
    "id": "said_ibn_amir_al_jumahi",
    "order": 89,
    "init": "SA",
    "color": "bg-violet-600",
    "ar": "سعيد بن عامر الجمحي",
    "translit": "Sa'id ibn Amir al-Jumahi",
    "en": "Sa'id ibn Amir al-Jumahi (RA)",
    "bn": "সাঈদ ইবনে আমির আল-জুমাহি (রাঃ)",
    "era": "conquest",
    "ashara": false,
    "caliph": false,
    "ansar": false,
    "woman": false,
    "roleEn": "The Ascetic Governor of Homs",
    "roleBn": "হিমসের দরবেশ গভর্নর",
    "yearEn": "d. c. 641 CE",
    "highlightEn": "A governor so pious he gave his salary away and lived poor.",
    "highlightBn": "এমন এক গভর্নর, যিনি বেতন দান করে দরিদ্র জীবন যাপন করতেন।",
    "summaryEn": "Sa'id ibn Amir al-Jumahi (RA) embraced Islam around the time of Khaybar and became known for his deep piety and detachment from wealth. When the caliph Umar ibn al-Khattab (RA) appointed him governor of Homs in Syria, he gave away most of his stipend in charity and lived so simply that people complained he was too poor and unavailable. Investigating, Umar found that Sa'id spent his money on the needy, worked for the hereafter, and delayed only to serve his household and worship. Umar wept and affirmed his trust in him. Sa'id remained a model of a ruler who feared Allah more than he desired the comforts of office.",
    "summaryBn": "সাঈদ ইবনে আমির আল-জুমাহি (রাঃ) খাইবারের সময়কালে ইসলাম গ্রহণ করেন এবং গভীর তাকওয়া ও সম্পদ-বিমুখতার জন্য পরিচিত হন। খলিফা উমর ইবনুল খাত্তাব (রাঃ) যখন তাঁকে সিরিয়ার হিমস শহরের গভর্নর নিযুক্ত করেন, তখন তিনি তাঁর বেতনের অধিকাংশ সদকা করে দিতেন ও এত সাদাসিধা জীবন যাপন করতেন যে লোকেরা অভিযোগ করত তিনি অতি দরিদ্র ও সহজলভ্য নন। তদন্ত করে উমর দেখেন সাঈদ তাঁর অর্থ অভাবীদের পেছনে ব্যয় করেন, আখিরাতের জন্য কাজ করেন এবং কেবল পরিবার ও ইবাদতের কারণে বিলম্ব করেন। উমর কেঁদে ফেলেন ও তাঁর প্রতি আস্থা দৃঢ় করেন। সাঈদ এমন এক শাসকের আদর্শ ছিলেন, যিনি পদের আরামের চেয়ে আল্লাহকে অধিক ভয় করতেন।",
    "events": [
      {
        "en": "Accepted Islam around the time of Khaybar",
        "bn": "খাইবারের সময়কালে ইসলাম গ্রহণ করেন"
      },
      {
        "en": "Appointed governor of Homs by Umar (RA)",
        "bn": "উমর (রাঃ) কর্তৃক হিমসের গভর্নর নিযুক্ত হন"
      },
      {
        "en": "Gave away his salary and lived in simplicity",
        "bn": "নিজ বেতন দান করে সরল জীবন যাপন করতেন"
      },
      {
        "en": "Praised by Umar as a truly trustworthy ruler",
        "bn": "উমর কর্তৃক প্রকৃত বিশ্বস্ত শাসক হিসেবে প্রশংসিত"
      }
    ],
    "refs": [],
    "lessonEn": "The best leaders spend on others what lesser hearts hoard for themselves.",
    "lessonBn": "শ্রেষ্ঠ নেতারা অন্যের জন্য তা-ই ব্যয় করেন, যা নীচু অন্তর নিজের জন্য জমা রাখে।"
  },
  {
    "id": "al_ala_ibn_al_hadrami",
    "order": 90,
    "init": "AH",
    "color": "bg-orange-500",
    "ar": "العلاء بن الحضرمي",
    "translit": "al-Ala ibn al-Hadrami",
    "en": "al-Ala ibn al-Hadrami (RA)",
    "bn": "আল-আলা ইবনুল হাদরামি (রাঃ)",
    "era": "conquest",
    "ashara": false,
    "caliph": false,
    "ansar": false,
    "woman": false,
    "roleEn": "The Governor of Bahrain",
    "roleBn": "বাহরাইনের গভর্নর",
    "yearEn": "d. c. 641 CE",
    "highlightEn": "The Prophet's envoy to Bahrain who held the region firm.",
    "highlightBn": "বাহরাইনে নবীজির দূত, যিনি অঞ্চলটিকে দৃঢ় রাখেন।",
    "summaryEn": "Al-Ala ibn al-Hadrami (RA) was sent by the Prophet Muhammad (peace be upon him) as his envoy and governor to Bahrain in eastern Arabia, where he invited its people, both Arabs and others, to Islam and collected its dues. After the Prophet's death, when many tribes there wavered in the Ridda, al-Ala stood firm and led the believers to victory, restoring the region to the faith. He was known as a man of earnest supplication, and reports describe striking answers to his prayers during his campaigns. He continued to serve under Abu Bakr and Umar (may Allah be pleased with them) until his death, a steadfast frontier governor of the young Muslim state.",
    "summaryBn": "আল-আলা ইবনুল হাদরামি (রাঃ)-কে রাসূলুল্লাহ (সাল্লাল্লাহু আলাইহি ওয়া সাল্লাম) পূর্ব আরবের বাহরাইনে নিজ দূত ও গভর্নর হিসেবে প্রেরণ করেন, যেখানে তিনি আরব ও অন্যান্য অধিবাসীদের ইসলামের দাওয়াত দেন ও রাজস্ব সংগ্রহ করেন। নবীজির ইন্তেকালের পর সেখানকার বহু গোত্র যখন রিদ্দায় টলে যায়, তখন আল-আলা দৃঢ় থেকে মুমিনদের বিজয়ের দিকে নেতৃত্ব দেন ও অঞ্চলটিকে ঈমানে ফিরিয়ে আনেন। তিনি ছিলেন আন্তরিক দোয়াকারী এক ব্যক্তি, আর বর্ণনায় তাঁর অভিযানকালে দোয়ার বিস্ময়কর কবুলিয়াতের কথা এসেছে। তিনি মৃত্যু পর্যন্ত আবু বকর ও উমর (রাঃ)-এর অধীনে খেদমত করেন—নবীন মুসলিম রাষ্ট্রের এক অবিচল সীমান্ত গভর্নর।",
    "events": [
      {
        "en": "Sent by the Prophet as governor of Bahrain",
        "bn": "নবীজি কর্তৃক বাহরাইনের গভর্নর নিযুক্ত হন"
      },
      {
        "en": "Held the region firm during the Ridda wars",
        "bn": "রিদ্দার যুদ্ধকালে অঞ্চলটিকে দৃঢ় রাখেন"
      },
      {
        "en": "Known for earnest, answered supplications",
        "bn": "আন্তরিক ও কবুলকৃত দোয়ার জন্য পরিচিত"
      },
      {
        "en": "Served under Abu Bakr and Umar (RA)",
        "bn": "আবু বকর ও উমর (রাঃ)-এর অধীনে খেদমত করেন"
      }
    ],
    "refs": [],
    "lessonEn": "Firmness in a time of confusion can hold a whole people to the truth.",
    "lessonBn": "বিভ্রান্তির সময়ে অবিচলতা একটি গোটা জাতিকে সত্যের উপর ধরে রাখতে পারে।"
  },
  {
    "id": "fayruz_ad_daylami",
    "order": 91,
    "init": "FD",
    "color": "bg-slate-600",
    "ar": "فيروز الديلمي",
    "translit": "Fayruz ad-Daylami",
    "en": "Fayruz ad-Daylami (RA)",
    "bn": "ফাইরুয আদ-দাইলামি (রাঃ)",
    "era": "conquest",
    "ashara": false,
    "caliph": false,
    "ansar": false,
    "woman": false,
    "roleEn": "Slayer of the False Prophet of Yemen",
    "roleBn": "ইয়েমেনের ভণ্ড নবীর হন্তা",
    "yearEn": "1st century AH",
    "highlightEn": "He killed al-Aswad al-Ansi, the false prophet, restoring Yemen.",
    "highlightBn": "ভণ্ড নবী আল-আসওয়াদ আল-আনসিকে হত্যা করে ইয়েমেন উদ্ধার করেন।",
    "summaryEn": "Fayruz ad-Daylami (RA) was a Yemeni of Persian descent, from the community known as the Abna, who accepted Islam when the message of the Prophet Muhammad (peace be upon him) reached Yemen. When al-Aswad al-Ansi rose there claiming prophethood and seizing power by force, Fayruz joined a small band of believers who plotted to end his tyranny, and it was Fayruz who struck him down, freeing Yemen and returning it to Islam. The Prophet received news of the victory near the time of his own passing and praised the believer who accomplished it. Fayruz lived on as a respected figure in Yemen, an example of courage against imposture.",
    "summaryBn": "ফাইরুয আদ-দাইলামি (রাঃ) ছিলেন পারস্য বংশোদ্ভূত একজন ইয়েমেনি, 'আবনা' নামে পরিচিত সম্প্রদায়ের সদস্য, যিনি রাসূলুল্লাহ (সাল্লাল্লাহু আলাইহি ওয়া সাল্লাম)-এর বার্তা ইয়েমেনে পৌঁছালে ইসলাম গ্রহণ করেন। আল-আসওয়াদ আল-আনসি যখন সেখানে নবুয়তের দাবি করে বলপ্রয়োগে ক্ষমতা দখল করে, তখন ফাইরুয মুষ্টিমেয় মুমিনের এক দলে যোগ দেন যারা তার অত্যাচার অবসানের পরিকল্পনা করেন; আর ফাইরুযই তাকে হত্যা করে ইয়েমেনকে মুক্ত করেন ও ইসলামে ফিরিয়ে আনেন। নবীজি নিজ ইন্তেকালের কাছাকাছি সময়ে এই বিজয়ের সংবাদ পান ও এর কৃতী মুমিনের প্রশংসা করেন। ফাইরুয ইয়েমেনে একজন সম্মানিত ব্যক্তি হিসেবে জীবন কাটান—ভণ্ডামির বিরুদ্ধে সাহসের এক দৃষ্টান্ত।",
    "events": [
      {
        "en": "A Yemeni of Persian descent who accepted Islam",
        "bn": "পারস্য বংশোদ্ভূত ইয়েমেনি, যিনি ইসলাম গ্রহণ করেন"
      },
      {
        "en": "Slew the false prophet al-Aswad al-Ansi",
        "bn": "ভণ্ড নবী আল-আসওয়াদ আল-আনসিকে হত্যা করেন"
      },
      {
        "en": "Restored Yemen to Islam and order",
        "bn": "ইয়েমেনকে ইসলাম ও শৃঙ্খলায় ফিরিয়ে আনেন"
      },
      {
        "en": "Praised in the report the Prophet received of the victory",
        "bn": "নবীজির কাছে পৌঁছানো বিজয়সংবাদে প্রশংসিত হন"
      }
    ],
    "refs": [],
    "lessonEn": "A few sincere believers can topple a great falsehood when they trust in Allah.",
    "lessonBn": "আল্লাহর উপর ভরসা রাখলে অল্প কয়েকজন আন্তরিক মুমিনও বিশাল মিথ্যাকে ধসিয়ে দিতে পারেন।"
  },
  {
    "id": "wahshi_ibn_harb",
    "order": 92,
    "init": "WH",
    "color": "bg-red-600",
    "ar": "وحشي بن حرب",
    "translit": "Wahshi ibn Harb",
    "en": "Wahshi ibn Harb (RA)",
    "bn": "ওয়াহশি ইবনে হারব (রাঃ)",
    "era": "battles",
    "ashara": false,
    "caliph": false,
    "ansar": false,
    "woman": false,
    "roleEn": "From Slaying Hamza to Slaying the Liar",
    "roleBn": "হামযার হত্যাকারী থেকে ভণ্ড নবীর হন্তা",
    "yearEn": "1st century AH",
    "highlightEn": "The mercy verse gave him hope, and he embraced Islam.",
    "highlightBn": "রহমতের আয়াত তাঁকে আশা দেয়, আর তিনি ইসলাম গ্রহণ করেন।",
    "summaryEn": "Wahshi ibn Harb (RA) was an Abyssinian slave in Makkah who killed the Prophet's uncle Hamza (RA) at the Battle of Uhud with his spear, promised freedom for the deed. He carried the weight of that act for years, feeling his sin too great for forgiveness. When he learned of the verse promising that Allah forgives all sins for those who turn to Him in repentance, hope revived in him, and he came to Madinah and embraced Islam. He later fought in the Ridda wars and killed Musaylima the liar at the Battle of Yamama, saying he had killed the best of men in ignorance and the worst of men in faith. His story is a lasting sign that no sinner is beyond Allah's mercy.",
    "summaryBn": "ওয়াহশি ইবনে হারব (রাঃ) ছিলেন মক্কায় একজন আবিসিনীয় ক্রীতদাস, যিনি মুক্তির প্রতিশ্রুতিতে উহুদের যুদ্ধে নিজ বর্শা দিয়ে নবীজির চাচা হামযা (রাঃ)-কে হত্যা করেন। বহু বছর ধরে তিনি সেই কাজের বোঝা বহন করেন, নিজ পাপকে ক্ষমার অযোগ্য বলে অনুভব করতেন। যখন তিনি জানতে পারেন এমন এক আয়াতের কথা, যাতে আল্লাহ তাওবাকারীদের সকল পাপ ক্ষমার প্রতিশ্রুতি দিয়েছেন, তখন তাঁর অন্তরে আশা ফিরে আসে; তিনি মদিনায় এসে ইসলাম গ্রহণ করেন। পরে তিনি রিদ্দার যুদ্ধে অংশ নিয়ে ইয়ামামার যুদ্ধে ভণ্ড নবী মুসাইলিমাকে হত্যা করেন এবং বলেন, তিনি অজ্ঞতাবস্থায় শ্রেষ্ঠ মানুষকে ও ঈমান অবস্থায় নিকৃষ্ট মানুষকে হত্যা করেছেন। তাঁর কাহিনি চিরকালীন এক নিদর্শন যে কোনো পাপীই আল্লাহর রহমতের বাইরে নয়।",
    "events": [
      {
        "en": "Killed Hamza (RA) at Uhud before accepting Islam",
        "bn": "ইসলাম গ্রহণের আগে উহুদে হামযা (রাঃ)-কে হত্যা করেন"
      },
      {
        "en": "The verse of Allah's vast mercy renewed his hope",
        "bn": "আল্লাহর বিশাল রহমতের আয়াত তাঁর আশা জাগায়"
      },
      {
        "en": "Came to Madinah and embraced Islam",
        "bn": "মদিনায় এসে ইসলাম গ্রহণ করেন"
      },
      {
        "en": "Killed Musaylima the liar at the Battle of Yamama",
        "bn": "ইয়ামামার যুদ্ধে ভণ্ড নবী মুসাইলিমাকে হত্যা করেন"
      }
    ],
    "refs": [
      "39:53"
    ],
    "lessonEn": "No sin is so great that sincere repentance cannot reach Allah's boundless mercy.",
    "lessonBn": "কোনো পাপ এত বড় নয় যে আন্তরিক তওবা আল্লাহর অসীম রহমতে পৌঁছাতে পারে না।"
  },
  {
    "id": "umm_haram_bint_milhan",
    "order": 93,
    "init": "UH",
    "color": "bg-pink-500",
    "ar": "أم حرام بنت ملحان",
    "translit": "Umm Haram bint Milhan",
    "en": "Umm Haram bint Milhan (RA)",
    "bn": "উম্মে হারাম বিনতে মিলহান (রাঃ)",
    "era": "conquest",
    "ashara": false,
    "caliph": false,
    "ansar": true,
    "woman": true,
    "roleEn": "The First Martyr at Sea",
    "roleBn": "সমুদ্রের প্রথম শহীদ",
    "yearEn": "d. c. 649 CE",
    "highlightEn": "The Prophet foretold she would sail the sea in the path of Allah.",
    "highlightBn": "নবীজি ভবিষ্যদ্বাণী করেছিলেন যে তিনি আল্লাহর পথে সমুদ্রযাত্রা করবেন।",
    "summaryEn": "Umm Haram bint Milhan (RA) was a noble woman of the Ansar in Madinah and a maternal relative of the Prophet Muhammad (peace be upon him), who would visit her home and rest there. One day he awoke smiling and told her he had seen believers riding the sea like kings on thrones in the path of Allah, and he prayed that she be among them. She asked him to pray she be of the first, and he did. Years later, during the caliphate of Uthman (RA), she crossed the sea with the first Muslim naval expedition to Cyprus. There she fell from her mount and was martyred, and was buried on the island, her Prophet's words fulfilled exactly as he had foretold.",
    "summaryBn": "উম্মে হারাম বিনতে মিলহান (রাঃ) ছিলেন মদিনার আনসারের একজন সম্ভ্রান্ত নারী ও রাসূলুল্লাহ (সাল্লাল্লাহু আলাইহি ওয়া সাল্লাম)-এর মাতৃকুলের আত্মীয়া, যাঁর বাড়িতে নবীজি যেতেন ও বিশ্রাম নিতেন। একদিন তিনি হাসিমুখে জেগে উঠে তাঁকে বলেন যে তিনি স্বপ্নে দেখেছেন মুমিনরা আল্লাহর পথে সিংহাসনে বসা রাজাদের মতো সমুদ্র পাড়ি দিচ্ছে, আর তিনি দোয়া করেন যেন উম্মে হারাম তাঁদের অন্তর্ভুক্ত হন। তিনি নবীজিকে দোয়া করতে বলেন যেন তিনি প্রথম দলের হন, নবীজি তা-ই করেন। বহু বছর পর উসমান (রাঃ)-এর খিলাফতকালে তিনি সাইপ্রাসের উদ্দেশ্যে প্রথম মুসলিম নৌ-অভিযানে সমুদ্র পাড়ি দেন। সেখানে তিনি নিজ বাহন থেকে পড়ে শহীদ হন ও দ্বীপে সমাহিত হন—নবীজির কথা হুবহু সত্য হয়ে ওঠে।",
    "events": [
      {
        "en": "A relative of the Prophet who hosted him in her home",
        "bn": "নবীজির আত্মীয়া, যিনি নিজ বাড়িতে তাঁকে আপ্যায়ন করতেন"
      },
      {
        "en": "The Prophet foretold she would ride the sea for Allah",
        "bn": "নবীজি ভবিষ্যদ্বাণী করেন যে তিনি আল্লাহর পথে সমুদ্রযাত্রা করবেন"
      },
      {
        "en": "Sailed with the first naval expedition to Cyprus",
        "bn": "সাইপ্রাসের প্রথম নৌ-অভিযানে যোগ দেন"
      },
      {
        "en": "Martyred and buried on the island of Cyprus",
        "bn": "সাইপ্রাস দ্বীপে শহীদ হন ও সমাহিত হন"
      }
    ],
    "refs": [],
    "lessonEn": "A sincere longing for God's path can carry a believer to honours beyond the horizon.",
    "lessonBn": "আল্লাহর পথের আন্তরিক আকাঙ্ক্ষা একজন মুমিনকে দিগন্তের ওপারের মর্যাদায় পৌঁছে দিতে পারে।"
  }
];

const SAHABA_UI = {
  sahaba_title: { en: 'Companions (Sahaba)', bn: 'সাহাবিগণ', zh: '圣门弟子（萨哈巴）', ja: '教友（サハーバ）' },
  sahaba_subtitle: { en: 'The Companions of the Prophet Muhammad ﷺ', bn: 'নবী মুহাম্মদ ﷺ-এর সাহাবিগণ', zh: '先知穆罕默德ﷺ的门弟子', ja: '預言者ムハンマドﷺの教友たち' },
  sahaba_intro: { en: 'Explore the Companions along a timeline of the early community. Tap any name to read their role, story, key highlights, connected verses, and a lesson.', bn: 'প্রাথমিক মুসলিম সমাজের টাইমলাইন ধরে সাহাবিদের জানুন। ভূমিকা, কাহিনি, গুরুত্বপূর্ণ মুহূর্ত, সংশ্লিষ্ট আয়াত ও শিক্ষা পড়তে যেকোনো নামে ট্যাপ করুন।', zh: '沿着早期社群的时间线探索圣门弟子。点击任何名字，阅读其角色、故事、重要事迹、相关经文和教训。', ja: '初期共同体の時系列に沿って教友たちを探求。名前をタップして、その役割、物語、主要な功績、関連する節、教訓を読む。' },
  sahaba_note: { en: 'Content follows mainstream Sunni sources. Honorific (RA) — may Allah be pleased with them — is intended after every Companion\'s name.', bn: 'বিষয়বস্তু মূলধারার সুন্নি সূত্র অনুসরণ করে। প্রতিটি সাহাবির নামের পর (রাঃ) — আল্লাহ তাঁদের প্রতি সন্তুষ্ট হোন — উদ্দিষ্ট।', zh: '内容遵循主流逊尼派资料。每位门弟子名字后均含敬语（愿主喜悦之）。', ja: '内容は主流スンニ派の資料に準拠。各教友の名の後には敬称（アッラーが彼らに満足されますように）が意図されています。' },
  sahaba_view_timeline: { en: 'Timeline', bn: 'টাইমলাইন', zh: '时间线', ja: 'タイムライン' },
  sahaba_view_grid: { en: 'Grid', bn: 'গ্রিড', zh: '网格', ja: 'グリッド' },
  sahaba_group_toggle: { en: 'Group by era', bn: 'যুগ অনুসারে', zh: '按时代分组', ja: '時代別' },
  sahaba_filter_all: { en: 'All', bn: 'সব', zh: '全部', ja: 'すべて' },
  sahaba_filter_caliph: { en: 'Rightly-Guided Caliphs', bn: 'খুলাফায়ে রাশিদীন', zh: '正统哈里发', ja: '正統カリフ' },
  sahaba_filter_ashara: { en: 'Ten Promised Paradise', bn: 'আশারা মুবাশশারা', zh: '十位报喜乐园者', ja: '楽園を約束された十人' },
  sahaba_filter_ansar: { en: 'Ansar', bn: 'আনসার', zh: '辅士（安萨尔）', ja: 'アンサール' },
  sahaba_filter_women: { en: 'Women', bn: 'নারী সাহাবি', zh: '女性', ja: '女性' },
  sahaba_search_placeholder: { en: 'Search by name or role…', bn: 'নাম বা ভূমিকা দিয়ে খুঁজুন…', zh: '按名字或角色搜索…', ja: '名前や役割で検索…' },
  sahaba_no_results: { en: 'No companions match your search.', bn: 'আপনার অনুসন্ধানের সাথে কোনো সাহাবি মেলেনি।', zh: '没有匹配的门弟子。', ja: '検索に一致する教友はいません。' },
  sahaba_progress: { en: 'Your progress', bn: 'আপনার অগ্রগতি', zh: '你的进度', ja: 'あなたの進捗' },
  sahaba_of: { en: 'of', bn: 'এর মধ্যে', zh: '/', ja: '/' },
  sahaba_reset: { en: 'Reset', bn: 'রিসেট', zh: '重置', ja: 'リセット' },
  sahaba_cotd_title: { en: 'Companion of the day', bn: 'আজকের সাহাবি', zh: '每日门弟子', ja: '今日の教友' },
  sahaba_cotd_open: { en: 'Read their story', bn: 'কাহিনি পড়ুন', zh: '阅读其故事', ja: '物語を読む' },
  sahaba_ashara_strip_title: { en: 'The Ten Promised Paradise (al-Ashara al-Mubashara)', bn: 'জান্নাতের সুসংবাদপ্রাপ্ত দশজন (আশারা মুবাশশারা)', zh: '十位生前得报乐园者', ja: '生前に楽園を約束された十人' },
  sahaba_badge_caliph: { en: 'Caliph', bn: 'খলিফা', zh: '哈里发', ja: 'カリフ' },
  sahaba_badge_ashara: { en: 'Ten Promised', bn: 'আশারা মুবাশশারা', zh: '十报喜者', ja: '約束の十人' },
  sahaba_badge_ansar: { en: 'Ansar', bn: 'আনসার', zh: '辅士', ja: 'アンサール' },
  sahaba_badge_woman: { en: 'Woman companion', bn: 'নারী সাহাবি', zh: '女门弟子', ja: '女性教友' },
  sahaba_label_story: { en: 'Story & role', bn: 'কাহিনি ও ভূমিকা', zh: '故事与角色', ja: '物語と役割' },
  sahaba_label_highlights: { en: 'Key highlights', bn: 'গুরুত্বপূর্ণ মুহূর্ত', zh: '重要事迹', ja: '主要な功績' },
  sahaba_label_refs: { en: 'Connected verses', bn: 'সংশ্লিষ্ট আয়াত', zh: '相关经文', ja: '関連する節' },
  sahaba_ref_hint: { en: 'Tap a reference to open the verse', bn: 'আয়াত খুলতে রেফারেন্সে ট্যাপ করুন', zh: '点击参考打开经文', ja: '参照をタップして節を開く' },
  sahaba_label_lesson: { en: 'Lesson', bn: 'শিক্ষা', zh: '教训', ja: '教訓' },
  sahaba_mark_read: { en: 'Mark as read', bn: 'পঠিত চিহ্নিত করুন', zh: '标记为已读', ja: '既読にする' },
  sahaba_marked_read: { en: 'Read', bn: 'পঠিত', zh: '已读', ja: '既読' },
  sahaba_era_first: { en: 'The First Believers', bn: 'প্রথম মুমিনগণ', zh: '最初的信士', ja: '最初の信者たち' },
  sahaba_era_persecution: { en: 'Trial & Migration to Abyssinia', bn: 'নির্যাতন ও আবিসিনিয়ায় হিজরত', zh: '受迫害与迁徙阿比西尼亚', ja: '迫害とアビシニアへの移住' },
  sahaba_era_hijra: { en: 'The Hijra & Madinah', bn: 'হিজরত ও মদিনা', zh: '希吉拉与麦地那', ja: 'ヒジュラとマディーナ' },
  sahaba_era_battles: { en: 'The Battles & Defence', bn: 'যুদ্ধ ও প্রতিরক্ষা', zh: '战役与保卫', ja: '戦いと防衛' },
  sahaba_era_conquest: { en: 'Conquests & the Spread of Islam', bn: 'বিজয় ও ইসলামের বিস্তার', zh: '开拓与伊斯兰的传播', ja: '征服とイスラームの広がり' },
  sahaba_era_knowledge: { en: 'Preservers of Knowledge', bn: 'জ্ঞানের সংরক্ষকগণ', zh: '知识的传承者', ja: '知識の守り手' },
};
