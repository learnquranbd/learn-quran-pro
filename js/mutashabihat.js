/**
 * Mutashabihat (متشابهات) — Similar Verses.
 *
 * The near-identical verses scattered across the Quran that huffaz most often
 * confuse. For a chosen surah, every ayah that shares a long identical phrase
 * (>= 4 words) with verses elsewhere is listed, the shared phrase highlighted,
 * with one-tap links to the look-alike verses.
 *
 * Built ENTIRELY from the app's own bundled data/quran-tokens.json (see
 * scripts) — data/mutashabihat.json maps "s:a" -> [[ref, phraseLen, startIdx]].
 * Display Arabic comes from data/quran-words.json. Renders into
 * #mutashabihat-container (tab "mutashabihat").
 *
 * Enrichments: browse search + sort, "random pair" jump, mark verses as
 * "tricky" (localStorage) with a review view, copy-a-pair, and a "distinguish"
 * practice quiz (which reference is this verse?) with a persisted best streak.
 *
 * Curated Groups: 15 famous clusters hand-picked from classical scholarship
 * (al-Kirmānī's Al-Burhān fī Mutashābih al-Qur'ān) and contemporary works on
 * Quranic patterns. Groups are static — the browse tab uses algorithmic data.
 */

/**
 * 15 curated groups of famous mutashabihat — well-known clusters that
 * huffaz and students of Quran most often study or confuse.
 * Each entry: { id, nameEn, nameAr, descEn, verses: ["s:a", …] }
 */
const MUTASHABIHAT_GROUPS = [
  {
    id: 'musabbihat',
    nameEn: 'Musabbihāt Openings',
    nameAr: 'سور المسبّحات',
    descEn: 'Six surahs open with "Sabbaḥa / Yusabbiḥu lillāhi mā fī-s-samāwāti wa-l-arḍ…", differing only in verb form (past/present) and closing attributes. Huffaz frequently confuse which surah uses which form.',
    verses: ['57:1', '59:1', '61:1', '62:1', '64:1']
  },
  {
    id: 'hayy-qayyum',
    nameEn: 'Al-Ḥayy al-Qayyūm — The Ever-Living',
    nameAr: 'الحي القيوم',
    descEn: 'The divine names "al-Ḥayyu l-Qayyūm" appear three times: in Āyat al-Kursī, at the opening of Āl ʿImrān, and in Ṭāhā 20:111. The surrounding context differs significantly, making these three a classic memorisation challenge.',
    verses: ['2:255', '3:2', '20:111']
  },
  {
    id: 'iblis-sajda',
    nameEn: 'Iblīs Refuses to Bow',
    nameAr: 'امتناع إبليس عن السجود',
    descEn: 'The command to the angels to prostrate before Adam, and Iblīs\'s refusal, is narrated in seven places. Each retelling adjusts phrasing, emphasis, or Iblīs\'s excuse, making this the most-studied group of narrative mutashabihat.',
    verses: ['2:34', '7:11', '15:29', '17:61', '18:50', '20:116', '38:72']
  },
  {
    id: 'kullu-nafsin',
    nameEn: 'Every Soul Shall Taste Death',
    nameAr: 'كُلُّ نَفْسٍ ذَائِقَةُ الْمَوْتِ',
    descEn: 'This identical phrase appears in three verses (3:185, 21:35, 29:57), each followed by a different continuation. Al-Kirmānī notes that the surrounding verses differ in focus: recompense, trial, and migration respectively.',
    verses: ['3:185', '21:35', '29:57']
  },
  {
    id: 'wa-ma-adraka',
    nameEn: '"What Will Make You Know…" (Wa-mā Adrāka Mā)',
    nameAr: 'وما أدراك ما',
    descEn: 'This rhetorical formula — "And what will make you perceive what [X] is?" — is used ~13 times to heighten the drama of cosmic or eschatological events. The formula is identical each time; only the subject differs.',
    verses: ['69:3', '74:27', '77:14', '82:18', '83:8', '83:19', '86:2', '90:12', '97:2', '101:3', '101:10', '104:5']
  },
  {
    id: 'waylun-yawmaidhin',
    nameEn: '"Woe That Day to the Deniers" — Refrain of al-Mursalāt',
    nameAr: 'وَيْلٌ يَوْمَئِذٍ لِّلْمُكَذِّبِينَ',
    descEn: 'Surat al-Mursalāt (77) repeats this thundering refrain ten times after successive cosmic and eschatological scenes. The phrase is lexically identical in all ten occurrences — a deliberate Quranic refrain (lāzima).',
    verses: ['77:15', '77:19', '77:24', '77:28', '77:34', '77:37', '77:40', '77:45', '77:47', '77:49']
  },
  {
    id: 'fabi-ayyi',
    nameEn: '"Which of Your Lord\'s Favours Will You Deny?" — Refrain of al-Raḥmān',
    nameAr: 'فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ',
    descEn: 'The celebrated refrain of Surat al-Raḥmān is repeated 31 times. These representative verses span the surah\'s main themes: creation, the two heavenly gardens, and divine mercy.',
    verses: ['55:13', '55:16', '55:18', '55:21', '55:23', '55:25', '55:28', '55:30', '55:32', '55:34', '55:36', '55:38', '55:40', '55:42', '55:45']
  },
  {
    id: 'aziz-hakim',
    nameEn: 'Divine Epithets at Verse-End — Al-ʿAzīz al-Ḥakīm / Al-ʿAlīm al-Ḥakīm',
    nameAr: 'العزيز الحكيم / العليم الحكيم',
    descEn: 'Dozens of verses close with divine name pairs ending in "al-Ḥakīm". The pairing varies: "al-ʿAzīzu l-Ḥakīm" vs "al-ʿAlīmu l-Ḥakīm" vs "al-Ghafūru l-Ḥakīm". Confusing which closing belongs where is a classic recitation error.',
    verses: ['2:129', '2:209', '2:220', '2:228', '3:6', '3:18', '4:56', '5:38', '8:49', '8:63', '8:67', '8:71', '9:40', '46:2', '60:5', '66:2']
  },
  {
    id: 'alif-lam-mim',
    nameEn: 'Alif-Lām-Mīm Openings',
    nameAr: 'سور الم',
    descEn: 'Six surahs open with the identical detached letters "Alif-Lām-Mīm". Within these, 2:1–2 and 31:1–3 share additional phrasing about "the guidance for the God-fearing" with subtle lexical shifts.',
    verses: ['2:1', '3:1', '29:1', '30:1', '31:1', '32:1']
  },
  {
    id: 'musa-firawn',
    nameEn: 'Moses Before Pharaoh — The Exodus Narrative',
    nameAr: 'موسى وفرعون',
    descEn: 'The encounter of Moses and Pharaoh is retold in seven surahs. Each account emphasises a different aspect of the story; the "framing" verse opening each account is a classic mutashabihat set.',
    verses: ['7:103', '10:75', '11:96', '17:101', '20:49', '26:10', '28:3']
  },
  {
    id: 'fastaqim',
    nameEn: '"Be Steadfast as You Were Commanded" — Fa-ṣṭaqim Kamā Umirta',
    nameAr: 'فَاسْتَقِمْ كَمَا أُمِرْتَ',
    descEn: 'Two verses (11:112 and 42:15) contain almost identical commands to the Prophet to remain steadfast. The first uses plural "wa-man tāba maʿak"; the second addresses him alone — a subtle but meaningful difference.',
    verses: ['11:112', '42:15']
  },
  {
    id: 'mithaq-jabal',
    nameEn: 'The Mountain Raised — Covenant with the Israelites',
    nameAr: 'رفع الطور وأخذ الميثاق',
    descEn: 'Three verses describe God raising the mountain (al-Ṭūr / al-Jabal) over the Israelites as a covenant witness. The phrasing is nearly identical; the placement and continuation differ.',
    verses: ['2:63', '2:93', '7:171']
  },
  {
    id: 'amanu-amilu',
    nameEn: '"Those Who Believe and Do Righteous Deeds"',
    nameAr: 'الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ',
    descEn: 'This formula for the believers appears in over 50 verses, nearly always followed by a promise of Gardens. The variation lies in what follows: some promise rivers, some mention specific divine attributes, some differ in the garden descriptions.',
    verses: ['2:82', '2:277', '3:57', '4:57', '4:122', '5:9', '7:42', '10:9', '18:30', '18:107', '29:7', '29:58', '31:8', '47:2', '85:11']
  },
  {
    id: 'noah-ark',
    nameEn: 'Noah\'s Ark — Divine Command to Build',
    nameAr: 'أمر نوح ببناء السفينة',
    descEn: 'The divine instruction to Nūḥ to build the ark appears three times. 11:37 and 23:27 are especially close; 26:116–118 varies more. Scholars note that 23:27 adds "bi-aʿyuninā" (under Our eyes) as a nuance absent in Hūd.',
    verses: ['11:37', '23:27', '26:116']
  },
  {
    id: 'quran-3-7-cluster',
    nameEn: 'Quran 3:7 — The Defining Verse on Mutashabihat',
    nameAr: 'آية المتشابهات',
    descEn: 'Surat Āl ʿImrān 3:7 is the Quran\'s own statement distinguishing muḥkamāt from mutashābihāt. Its echo in 2:269 shares the phrase "wa-mā yadhdhakkaru illā ulu l-albāb". These two represent the "meta-layer" of the phenomenon.',
    verses: ['3:7', '2:269']
  },

  // ── Wave 2 — 17 additional curated groups ────────────────────────────────

  {
    id: 'al-kahf-stories',
    nameEn: 'Al-Kahf — Four Narrative Opening Frames',
    nameAr: 'مطالع قصص سورة الكهف الأربع',
    descEn: 'Al-Kahf\'s four famous stories (Cave Youth, Two Garden Owners, Moses & Khiḍr, Dhul-Qarnayn) each open with a distinct rhetorical frame at 18:9, 18:32, 18:60, and 18:83. Ibn az-Zubayr al-Gharnāṭī notes that each frame mirrors the others in structure — a command/question introducing the narrative — making them a set of parallel narrative formulas that huffaz regularly conflate.',
    verses: ['18:9', '18:32', '18:60', '18:83']
  },
  {
    id: 'hawamim',
    nameEn: 'The Seven Ḥāʾ-Mīm Sūrahs',
    nameAr: 'الحواميم السبع',
    descEn: 'Sūrahs 40–46 all open with the detached letters "Ḥāʾ Mīm", and six of them immediately follow with "Tanzīl…" or a close variant. The closing divine-attribute pairs ("al-ʿAzīz al-ʿAlīm", "al-ʿAzīz al-Ḥakīm") rotate across these sūrahs, producing one of the densest clusters of mutashābihāt openings in the Quran.',
    verses: ['40:1', '41:1', '42:1', '43:1', '44:1', '45:1', '46:1']
  },
  {
    id: 'kadhālika-naqussu',
    nameEn: '"Thus We Narrate to You" — The Retelling Formula',
    nameAr: 'كَذَٰلِكَ نَقُصُّ عَلَيْكَ',
    descEn: 'Several verses use the formula "naḥnu naquṣṣu ʿalayka / kadhālika naquṣṣu ʿalayk" to frame the retelling of prophetic narratives. Al-Kirmānī lists this pattern as a key transition device: 7:101 and 11:100 are especially close, both referencing "the news of the towns"; 12:3 and 18:13 introduce individual stories; 20:99 closes a long narrative. Distinguishing which closing matches which story is a classic review exercise.',
    verses: ['7:101', '11:100', '12:3', '18:13', '20:99']
  },
  {
    id: 'opening-oaths',
    nameEn: 'The Short-Sūrah Opening Oath Cluster',
    nameAr: 'أقسام أوائل السور القصيرة',
    descEn: 'Five late-Makkan sūrahs open with single-object oaths by cosmic phenomena — dawn (89), sun (91), night (92), forenoon (93), fig (95) — each followed by a contrasting or complementary pair. The oaths share identical syntactic structure "wa-X" but differ in subject, making the sequence a memorisation challenge where students confuse which cosmic image belongs to which sūrah.',
    verses: ['89:1', '91:1', '92:1', '93:1', '95:1']
  },
  {
    id: 'yunus-dua',
    nameEn: 'Prophetic Supplications in Sūrat al-Anbiyāʾ',
    nameAr: 'أدعية الأنبياء في سورة الأنبياء',
    descEn: 'Three consecutive prophetic supplications appear in al-Anbiyāʾ (21:83–89): Ayyūb\'s cry of distress (21:83), Yūnus\'s tasbīḥ from the whale\'s belly — "lā ilāha illā anta subḥānaka innī kuntu mina ẓ-ẓālimīn" (21:87) — and Zakariyyā\'s whispered plea (21:89). The near-identical framing "wa-Dhā n-Nūn / wa-Zakariyyā idh nādā rabbahu" makes the trio a famous memorisation cluster; 21:87 also echoes 68:48.',
    verses: ['21:83', '21:87', '21:89', '68:48']
  },
  {
    id: 'wujuhun-yawmaidhin',
    nameEn: 'Hell & Paradise Twin Openings — Sūrahs 56, 78, 88',
    nameAr: 'ازدواج وصف الجنة والنار في سور الواقعة والنبأ والغاشية',
    descEn: 'Three eschatological sūrahs describe Hell and Paradise in back-to-back passages of mirrored structure. Sūrat al-Wāqiʿa pairs "aṣḥābu l-yamīni" (56:27) with "aṣḥābu sh-shimāli" (56:41); al-Ghāshiya pairs "wujūhun yawma\'idhin khāshiʿa" (88:2) with "wujūhun yawma\'idhin nāʿima" (88:8), differing only in the adjective; an-Nabaʾ contrasts "inna jahannama kānat mirṣādā" (78:21) with "inna li-l-muttaqīna mafāzā" (78:31). Each pair is structurally identical — a classic tool for teaching the Day of Judgement passages.',
    verses: ['56:27', '56:41', '78:21', '78:31', '88:2', '88:8']
  },
  {
    id: 'wa-ma-tafarraqu',
    nameEn: '"They Did Not Divide Except After Knowledge Came" — Splitting Verses',
    nameAr: 'وَمَا تَفَرَّقُوا إِلَّا مِنۢ بَعْدِ مَا جَآءَهُمُ الْعِلْمُ',
    descEn: 'Three verses warn that communities split only after clear knowledge reached them: 3:105, 30:32, and 42:14 share nearly the same phrasing. Ibn az-Zubayr al-Gharnāṭī contrasts these with 42:13, which introduces the divine command for unity, noting the contextual shift — unity commanded, then violated — as a deliberate rhetorical pair that students consistently confuse.',
    verses: ['3:105', '30:32', '42:13', '42:14']
  },
  {
    id: 'kafa-billahi',
    nameEn: '"Allah Suffices as…" — The Affirmation Closing Formula',
    nameAr: 'وَكَفَىٰ بِٱللَّهِ',
    descEn: 'The phrase "wa-kafā bi-llāhi X" (Allah suffices as witness / guardian / disposer) closes dozens of verses with slightly different objects: "shahīdā" (witness), "wakīlā" (guardian/disposer), "naṣīrā" (helper), "waliyyā" (protector). Al-Kirmānī dedicates a section to these colophon variants, noting that confusing "shahīdā" with "wakīlā" at verse-end is one of the most frequent recitation errors. Representative instances span four sūrahs.',
    verses: ['4:45', '4:79', '4:132', '4:166', '33:3', '33:48', '48:28']
  },
  {
    id: 'la-yaghfiru-shirk',
    nameEn: '"Allah Does Not Forgive Shirk" — The Twin Verses of 4:48 & 4:116',
    nameAr: 'إِنَّ ٱللَّهَ لَا يَغۡفِرُ أَن يُشۡرَكَ بِهِۦ',
    descEn: 'Verses 4:48 and 4:116 are among the most famous word-for-word repetitions in the Quran: "inna llāha lā yaghfiru an yushraka bihi wa-yaghfiru mā dūna dhālika li-man yashāʾ" — with only the surrounding context differing. Al-Kirmānī notes they were revealed in identical wording to underscore the absolute nature of the ruling, while the distinct contexts (general warning vs. specific reaffirmation) give each its own communicative force.',
    verses: ['4:48', '4:116']
  },
  {
    id: 'yasal-unaka',
    nameEn: '"They Ask You About…" — The Rhetorical Question Series',
    nameAr: 'يَسْأَلُونَكَ عَنِ',
    descEn: 'The formula "yasʾalūnaka ʿan…" appears eight or more times, each time introducing a question put to the Prophet and the divine answer. Seven cluster in al-Baqarah and al-Aʿrāf; lone instances appear in al-Anfāl (8:1), al-Isrāʾ (17:85), and al-Nāziʿāt (79:42). The identical opening and varied subjects — new moons, spending, sacred months, wine, orphans, war spoils, the spirit, the Hour — make this a key series for sequential-memorisation drills.',
    verses: ['2:189', '2:215', '2:217', '2:219', '2:222', '8:1', '17:85', '79:42']
  },
  {
    id: 'sab-a-samawat',
    nameEn: 'The Seven Heavens — Numeric Parallelism',
    nameAr: 'السماوات السبع',
    descEn: 'The phrase "sabʿa samāwāt" (seven heavens) appears in seven verses across the Quran. Each occurrence has a slightly different syntactic environment — some add "ṭibāqā" (layered), some follow creation of the earth, some precede glorification — making the set a textbook example of numeric parallelism. Al-Kirmānī notes that students memorising each surah\'s cosmological passage often import the wording from another occurrence.',
    verses: ['2:29', '17:44', '23:17', '41:12', '65:12', '67:3', '71:15']
  },
  {
    id: 'iblis-vow',
    nameEn: 'Iblīs\'s Sworn Vows to Mislead Humanity',
    nameAr: 'أقسام إبليس على الإغواء',
    descEn: 'Satan\'s vow to mislead humanity is recorded three times, each using a first-person oath with a different opening formula: "fa-bi-mā aghwaytanī la-aqʿudanna lahum" (7:16), "la-uzayyinanna lahum fī l-arḍi" (15:39), and "fa-bi-ʿizzatika la-ughwiyannahum ajmaʿīn" (38:82). The vows escalate in scope — ambush on the path, beautification of the earth, total seduction — and students reciting the Iblīs narrative across these three sūrahs routinely conflate the wording.',
    verses: ['7:16', '15:39', '38:82']
  },
  {
    id: 'nur-istidhna',
    nameEn: 'Permission-Seeking Verses — Al-Nūr\'s Repeated Protocol',
    nameAr: 'آيات الاستئذان في سورة النور',
    descEn: 'Sūrat al-Nūr legislates the protocol for entering homes in two near-parallel pairs: 24:27–28 addresses seeking permission before entering others\' homes; 24:58–59 addresses the permission required of children/servants at three specific times. The two pairs share nearly identical grammatical structure and several shared phrases, creating a legislative parallelism that al-Kirmānī highlights as an example of legal mutashābihāt.',
    verses: ['24:27', '24:28', '24:58', '24:59']
  },
  {
    id: 'mu-minun-maarij',
    nameEn: 'Believers\' Traits — Al-Muʾminūn & Al-Maʿārij Parallels',
    nameAr: 'صفات المؤمنين بين المؤمنون والمعارج',
    descEn: 'The opening of al-Muʾminūn (23:1–9) and a central passage of al-Maʿārij (70:22–35) enumerate almost the same list of believers\' characteristics — humility in prayer, giving zakāh, guarding chastity, keeping covenants — in nearly identical phrasing. Ibn az-Zubayr al-Gharnāṭī identifies this cross-sūrah repetition as deliberate structural reinforcement. The near-identical verse pairs (23:2/70:23, 23:5/70:29, 23:8/70:32) are a staple of advanced ḥifẓ review.',
    verses: ['23:2', '23:5', '23:8', '70:23', '70:29', '70:32']
  },
  {
    id: 'rasul-ila-kull-umma',
    nameEn: '"To Every Nation a Messenger" — Universal Prophethood Variants',
    nameAr: 'لكل أمة رسول',
    descEn: 'Four verses state the principle of universal divine guidance with slightly different wording: "wa-likulli ummatin rasūl" (10:47), "wa-likulli qawmin hād" (13:7), "wa-laqad baʿathnā fī kulli ummatin rasūlan" (16:36), and "wa-in min ummatin illā khalā fīhā nadhīr" (35:24). Al-Kirmānī treats these as near-synonymous restatements whose subtle lexical differences (rasūl / hād / nadhīr; umma / qawm) carry distinct theological emphasis — and whose similarity makes them a target for substitution errors.',
    verses: ['10:47', '13:7', '16:36', '35:24']
  },
  {
    id: 'wa-ittaqu-yawman',
    nameEn: '"Fear a Day When No Soul Can Avail Another" — Identical Warning Verses',
    nameAr: 'وَٱتَّقُواْ يَوۡمًا لَّا تَجۡزِي نَفۡسٌ عَن نَّفۡسٍ شَيۡـًٔا',
    descEn: 'Verses 2:48 and 2:123 are word-for-word identical within the same sūrah, both warning: "wa-ttaqū yawman lā tajzī nafsun ʿan nafsin shay\'an wa-lā yuqbalu minhā shafāʿatun…" — one of the Quran\'s clearest deliberate repetitions for emphasis. A third closely related verse (2:281) uses "wa-ttaqū yawman turjaʿūna fīhi ilā llāh", completing the triad of Day-of-Judgement warnings in al-Baqarah.',
    verses: ['2:48', '2:123', '2:281']
  },
  {
    id: 'ibrahim-mecca-dua',
    nameEn: 'Ibrāhīm\'s Supplication for Mecca — The Subtle Twin',
    nameAr: 'دعاء إبراهيم لمكة بين البقرة وإبراهيم',
    descEn: 'Two verses record Ibrāhīm\'s prayer for Mecca in almost identical wording: 2:126 reads "rabbi-jʿal hādhā baladan āminā" (indefinite — "make this a safe land") while 14:35 reads "rabbi-jʿal hādhā l-balada āminā" (definite — "make this, the land, safe"). Al-Kirmānī identifies the tanwīn/definite-article distinction as one of the subtlest single-word mutashābihāt in the Quran, corresponding to two different moments in Ibrāhīm\'s life. Students at every level routinely substitute one for the other.',
    verses: ['2:126', '2:127', '14:35', '14:37']
  },

  // ── Wave 3 — 22 additional curated groups ────────────────────────────────

  {
    id: 'baqarah-cow-story',
    nameEn: 'Al-Baqarah — The Cow Command Sequence',
    nameAr: 'قصة البقرة في سورة البقرة',
    descEn: 'The divine command to slaughter a cow (2:67–71) unfolds as a progressive series of five clarifications, each verse answering a further objection with near-identical framing ("qāla innahu yaqūlu…"). Al-Kirmānī notes that this internal sequential repetition — identical framing, escalating specificity — is itself a form of intra-sūrah mutashābihāt that students memorising al-Baqarah consistently scramble, since no external landmark distinguishes the five "which cow?" exchanges from one another.',
    verses: ['2:67', '2:68', '2:69', '2:70', '2:71']
  },
  {
    id: 'calf-worship',
    nameEn: 'The Golden Calf — Three Sūrah Accounts',
    nameAr: 'عبادة العجل في ثلاثة مواضع',
    descEn: 'The Israelites\' worship of the golden calf is narrated in three sūrahs: 2:51 (brief), 7:148–150 (extended, with the people\'s grief), and 20:85–97 (dialogue with Mūsā and al-Sāmirī). The key phrase "ʿijlan jasadan" echoes between 7:148 and 20:88. Ibn az-Zubayr al-Gharnāṭī contrasts all three accounts: each foregrounds a different dimension — the sin (al-Baqarah), the communal grief (al-Aʿrāf), and the instigator al-Sāmirī (Ṭāhā) — while sharing enough phrasing that cross-sūrah substitution is extremely common.',
    verses: ['2:51', '7:148', '7:150', '20:85', '20:88', '20:97']
  },
  {
    id: 'twelve-springs',
    nameEn: 'Twelve Springs from the Rock',
    nameAr: 'انبجاس الاثنتي عشرة عيناً من الحجر',
    descEn: 'Two verses record the miracle of water gushing from the struck rock for the twelve tribes: 2:60 ("fa-nfajarat minhu thnātā ʿashrata ʿaynan") and 7:160 ("wa-qāṭaʿnāhumu thnataʿy ʿashrata asbāṭan… an-iḍrib bi-ʿaṣāka l-ḥajar"). Al-Kirmānī highlights the lexical shift between "infajarat" (burst forth, 2:60) and "inbajasa" (welled up, 7:160) as a one-word difference that students routinely transpose, since both verses describe the same event and share the same numeric "twelve".',
    verses: ['2:60', '7:160']
  },
  {
    id: 'zakariyya-dua',
    nameEn: 'Zakariyyā\'s Prayer for a Son — Āl ʿImrān & Maryam',
    nameAr: 'دعاء زكريا بين آل عمران ومريم',
    descEn: 'Zakariyyā\'s prayer for a righteous heir is recounted in 3:38–41 and 19:2–11. In Āl ʿImrān the prayer follows his witnessing of Maryam\'s miraculous provision; in Maryam it is introduced as a "dhikru raḥmati rabbika" and elaborated with Zakariyyā\'s own fears about succession (19:5). The three-day sign of silence appears in both sūrahs — 3:41 and 19:10 — in near-identical wording, making it one of the most tested cross-sūrah verse pairs in advanced ḥifẓ review.',
    verses: ['3:38', '3:41', '19:3', '19:7', '19:10']
  },
  {
    id: 'maryam-provision',
    nameEn: 'Maryam\'s Miraculous Provision — Two Scenes',
    nameAr: 'رزق مريم في آل عمران ومريم',
    descEn: 'Maryam receives divine provision in two distinct scenes: 3:37 describes food found by Zakariyyā in her prayer niche ("wajada ʿindahā rizqan"), while 19:25–26 records the angel\'s command at the palm tree to eat fresh dates and drink from a stream. Al-Kirmānī groups these as a structural pair — two divine provisions at different life-moments — noting that student memorisers conflate them because both feature miraculous food and a divine address to Maryam alone.',
    verses: ['3:37', '19:25', '19:26']
  },
  {
    id: 'isa-miracles',
    nameEn: 'ʿĪsā\'s Miracles — Two Canonical Listings',
    nameAr: 'معجزات عيسى في آل عمران والمائدة',
    descEn: 'The miracles of ʿĪsā are listed twice: 3:49 (in ʿĪsā\'s own speech — predictive: "I create… I heal… I raise the dead") and 5:110 (divine address on Judgement Day — "when I taught you…"). Both enumerate the clay bird, healing the blind and the leper, and raising the dead in the same order; 5:110 appends "bi-idhnī" (by My leave) after each miracle. Al-Kirmānī identifies the "bi-idhnī" addition as one of the most tested single-phrase distinctions in advanced ḥifẓ revision.',
    verses: ['3:49', '5:110']
  },
  {
    id: 'ibrahim-stars-moon',
    nameEn: 'Ibrāhīm\'s Contemplation of Stars, Moon and Sun',
    nameAr: 'مشهد إبراهيم والنجم والقمر والشمس في الأنعام',
    descEn: 'Sūrat al-Anʿām 6:74–83 presents a sequential monotheism argument unique in the Quran: Ibrāhīm observes a star, then the moon, then the sun — each time declaring "hādhā rabbī" followed by "lā uḥibbu l-āfilīn" when it sets. This three-stage elimination is structurally echoed in 21:57–67 and 37:88–98. Ibn az-Zubayr al-Gharnāṭī notes that the internal repetition of the "hādhā rabbī" pattern within al-Anʿām is itself the key memorisation challenge, as students compress or expand the three stages into each other.',
    verses: ['6:74', '6:76', '6:77', '6:78', '6:79', '6:83']
  },
  {
    id: 'araf-prophet-cycle',
    nameEn: 'Al-Aʿrāf\'s Serial Prophet Cycle — Parallel Opening Frames',
    nameAr: 'فاتحة قصص الأنبياء في الأعراف',
    descEn: 'Al-Aʿrāf presents six consecutive prophet stories (Nūḥ, Hūd, Ṣāliḥ, Lūṭ, Shuʿayb, Mūsā) each introduced by a near-identical formula: "laqad arsalnā Nūḥan" (7:59), "wa-ilā ʿĀdin akhāhum Hūdan" (7:65), "wa-ilā Thamūda akhāhum Ṣāliḥan" (7:73), "wa-ilā Madyana akhāhum Shuʿayban" (7:85). Each story follows the same arc: prophet calls "yā qawmi", people refuse, punishment descends. Al-Kirmānī identifies this as the most complex intra-sūrah chain of mutashābihāt in the middle-Makkan sūrahs, directly paralleled by Sūrat Hūd.',
    verses: ['7:59', '7:65', '7:73', '7:85', '7:103']
  },
  {
    id: 'hud-prophet-cycle',
    nameEn: 'Sūrat Hūd\'s Prophet Cycle — Twin of Al-Aʿrāf',
    nameAr: 'قصص الأنبياء في سورة هود وتوازيها مع الأعراف',
    descEn: 'Sūrat Hūd retells five of the same prophet stories as al-Aʿrāf (Nūḥ: 11:25, Hūd: 11:50, Ṣāliḥ: 11:61, Lūṭ: 11:77, Shuʿayb: 11:84), using near-identical internal framing ("qāla yā qawmi ʿbudū llāha mā lakum min ilāhin ghayruh"). Scholars call the two sūrahs the "twin prophet cycles": each Hūd account nearly mirrors its al-Aʿrāf counterpart yet adds distinctive dialogue absent in al-Aʿrāf. Ibn az-Zubayr al-Gharnāṭī notes that cross-sūrah substitution between the two cycles is the most common advanced ḥifẓ error in these narratives.',
    verses: ['11:25', '11:50', '11:61', '11:77', '11:84']
  },
  {
    id: 'shuara-kadhdhaba',
    nameEn: 'Ash-Shuʿarāʾ — "They Denied the Messengers" Refrain',
    nameAr: 'لازمة كَذَّبَتْ في سورة الشعراء',
    descEn: 'Sūrat ash-Shuʿarāʾ (26) opens six consecutive prophet narratives with the formula "kadhdhabat qawmu Nūḥin l-mursalīn… kadhdhabat ʿĀdun l-mursalīn… kadhdhabat Thamūdu l-mursalīn…" (26:105, 26:123, 26:141, 26:160, 26:176, 26:189). After each narrative, two identical lines close it as a refrain: "wa-inna rabbaka la-huwa l-ʿAzīzu r-Raḥīm". Al-Kirmānī calls this the clearest example of the lāzima (refrain) device in the Quran — the six openings are lexically interchangeable except for the name of the people, making them a supreme sequential-memorisation test.',
    verses: ['26:105', '26:123', '26:141', '26:160', '26:176', '26:189']
  },
  {
    id: 'qamar-yassarna',
    nameEn: 'Al-Qamar — "We Have Made the Quran Easy" Fourfold Refrain',
    nameAr: 'لازمة وَلَقَدۡ يَسَّرۡنَا ٱلۡقُرۡءَانَ لِلذِّكۡرِ في القمر',
    descEn: '"Wa-laqad yassarnā l-Qurʾāna li-dh-dhikri fa-hal min muddakir?" is repeated verbatim four times in Sūrat al-Qamar: 54:17, 54:22, 54:32, and 54:40, each following a narrative of a destroyed people (Nūḥ, ʿĀd, Thamūd, Lūṭ). Unlike ar-Raḥmān\'s refrain, the verse itself never changes — the challenge is recalling which destroyed nation precedes which repetition, since the four instances differ only in their surrounding context. This makes it a classic sequential-order drill for ḥifẓ review.',
    verses: ['54:17', '54:22', '54:32', '54:40']
  },
  {
    id: 'hijr-destroyed-towns',
    nameEn: 'Al-Ḥijr — "Companions of the Towns" Destruction Pattern',
    nameAr: 'أصحاب الأيكة وأصحاب الحجر في الحجر والشعراء وغيرهما',
    descEn: '"Aṣḥābu l-Ayka" (companions of the thicket = people of Shuʿayb) appears identically in 15:78, 26:176, 38:13, and 50:14. "Aṣḥābu l-ḥijr" (stone-dwellers = Thamūd) appears only in 15:80. Al-Kirmānī notes that the near-identical construct "aṣḥābu l-…" — followed in each case by a brief destruction notice — creates a memorisation trap: students conflate which designation refers to which people, and which sūrah provides what detail about their fate.',
    verses: ['15:78', '15:80', '26:176', '38:13', '50:14']
  },
  {
    id: 'isra-commandments',
    nameEn: 'Al-Isrāʾ — The Ethical Code Sequence (17:22–39)',
    nameAr: 'وصايا سورة الإسراء الأخلاقية',
    descEn: 'Verses 17:22–39 form the Quran\'s most structured ethical sequence: thirteen prohibitions and commands covering monotheism, parents, relatives, the poor, wastefulness, infanticide, adultery, unjust killing, orphan wealth, weights and measures, knowledge, and arrogance. Each command employs a parallel "wa-lā taʿbud / wa-lā taqtul / wa-lā taqrab" frame. Al-Kirmānī identifies the sequence as "parallel legislative mutashābihāt" — internally consistent in syntax — making the correct ordering of the thirteen commands a classic memorisation drill.',
    verses: ['17:22', '17:23', '17:31', '17:32', '17:33', '17:36', '17:37']
  },
  {
    id: 'inna-anzalna',
    nameEn: '"Indeed We Sent It Down" — The Revelation Descent Cluster',
    nameAr: 'إِنَّآ أَنزَلۡنَٰهُ — مواضع نزول القرآن',
    descEn: '"Innā anzalnāhu" and its near variants introduce divine revelation in a cluster of verses. Sūrat al-Qadr (97:1) reads "innā anzalnāhu fī laylati l-qadr"; its parallel 44:3 reads "innā anzalnāhu fī laylatin mubārakah" — two verses describing the same Blessed Night in almost identical openings. Further parallels include 4:105 ("innā anzalnā ilayka l-kitāba bi-l-ḥaqq") and 2:4 (reference to what was sent down before and after). Al-Kirmānī lists the 97:1/44:3 pair as a celebrated source of confusion between "laylatu l-qadr" and "laylatun mubārakah".',
    verses: ['2:4', '4:105', '44:3', '97:1']
  },
  {
    id: 'wamma-jaa-musa',
    nameEn: '"And When He Came" — The Arrival Formula in Moses Narratives',
    nameAr: 'وَلَمَّا جَآءَ في قصص موسى',
    descEn: 'The phrase "wa-lammā jāʾa Mūsā / wa-lammā jāʾahu" appears at pivotal moments across Mosaic narratives: 7:143 (Mūsā arrives at the appointed time and asks to see God), 20:83 (God asks why Mūsā came ahead of his people), 28:29 (Mūsā arrives at the sacred fire), and 28:44 (narrator note on the western side). Each use of the identical formula introduces a different extraordinary encounter. Ibn az-Zubayr al-Gharnāṭī identifies these as deliberate narrative callbacks; students must pair each "arrival" with its correct context.',
    verses: ['7:143', '20:83', '28:29', '28:44']
  },
  {
    id: 'yawma-yaqumu',
    nameEn: '"The Day People Stand" — Resurrection Standing Formulas',
    nameAr: 'يَوْمَ يَقُومُ النَّاسُ لِرَبِّ الْعَالَمِينَ',
    descEn: '"Yawma yaqūmu n-nāsu li-rabbi l-ʿālamīn" (83:6) is the starkest Resurrection-standing formula. Parallel expressions include "wa-yawma taqūmu s-sāʿatu yublafu l-mujrimūna" (30:12), "yawma hum bārizūna lā yakhfā ʿalā llāhi minhum shayʾun" (40:16), and "wa-stundhirhum yawma l-āzifati idhi l-qulūbu laday l-ḥanājiri" (40:18). Al-Kirmānī notes that all four describe the same moment yet vary in emphasising the crowd, the criminals, divine omniscience, or human terror — and compositing resurrection passages from multiple sūrahs is a common advanced memorisation error.',
    verses: ['30:12', '40:16', '40:18', '83:6']
  },
  {
    id: 'fa-amma-man-conditional',
    nameEn: '"As for the One Who…" — The Mirror Conditional Pair in al-Nāziʿāt',
    nameAr: 'فَأَمَّا مَن طَغَىٰ / وَأَمَّا مَنۡ خَافَ في النازعات',
    descEn: 'Sūrat an-Nāziʿāt (79) presents the sharpest "fa-ammā / wa-ammā" conditional pair in the Quran: "fa-ammā man ṭaghā wa-āthara l-ḥayāta d-dunyā fa-inna l-jaḥīma hiya l-maʾwā" (79:37–39) versus "wa-ammā man khāfa maqāma rabbihi wa-nahan-nafsa ʿani l-hawā fa-inna l-jannata hiya l-maʾwā" (79:40–41). Both halves close with the same frame "fa-inna l-[abode] hiya l-maʾwā". Al-Kirmānī places this pair as the paradigm of ʿaksi l-mutashābihāt (inverted similar verses): identical syntactic frame, antithetical content.',
    verses: ['79:37', '79:38', '79:39', '79:40', '79:41']
  },
  {
    id: 'ala-hudan',
    nameEn: '"Those Are on Guidance from Their Lord" — The Sealant Formula',
    nameAr: 'أُوْلَٰٓئِكَ عَلَىٰ هُدًى مِّن رَّبِّهِمۡ وَأُوْلَٰٓئِكَ هُمُ الۡمُفۡلِحُونَ',
    descEn: '"Ūlāʾika ʿalā hudan min rabbihim wa-ūlāʾika humu l-mufliḥūn" closes the description of the God-fearing in 2:5, then reappears word-for-word in 31:5 to close an almost identical portrait of the Muhsinīn. The formula also echoes partially in 6:82 ("ūlāʾika lahumu l-amnu wa-hum muhtadūn"). Al-Kirmānī highlights the 2:5/31:5 pair as the Quran\'s clearest instance of a "sealant formula" (khātima) transplanted from one sūrah to another in identical form — one of the most elegant cross-sūrah mutashābihāt.',
    verses: ['2:5', '6:82', '31:5']
  },
  {
    id: 'in-tutiu-obedience',
    nameEn: '"Obey Allah and the Messenger" — The Repeated Obedience Command',
    nameAr: 'أَطِيعُواْ ٱللَّهَ وَأَطِيعُواْ ٱلرَّسُولَ',
    descEn: 'The imperative "aṭīʿū llāha wa-aṭīʿū r-rasūla" appears in 4:59, 5:92, 8:20, 24:54, 47:33, and 64:12 with near-identical wording. Each occurrence is followed or preceded by a different condition — consequences of disobedience, the call to unity in struggle, or a warning about pure conveyance — while the core command remains constant. Ibn az-Zubayr al-Gharnāṭī identifies the varying follow-up clause paired to each identical command as the hallmark challenge: students must associate the correct consequence with the correct sūrah.',
    verses: ['4:59', '5:92', '8:20', '24:54', '47:33', '64:12']
  },
  {
    id: 'maidah-halal-haram',
    nameEn: 'The Forbidden Foods List — Four Near-Identical Occurrences',
    nameAr: 'قائمة المحرمات الغذائية في البقرة والمائدة والأنعام والنحل',
    descEn: 'The same forbidden-food list (carrion, blood, pork, and what is dedicated to other than God) appears at 2:173, 5:3, 6:145, and 16:115. The core four items are identical in all four; 6:145 adds "aw fisqan uhilla li-ghayri llāhi bih" and uses "rijzun" (impurity); 5:3 extends the list with animals killed by strangling or goring. Al-Kirmānī treats the quartet as the Quran\'s premier example of legislative repetition-with-expansion, noting that 2:173 and 16:115 are nearly word-for-word and constitute a standard ḥifẓ examination topic.',
    verses: ['2:173', '5:3', '6:145', '16:115']
  },
  {
    id: 'nisa-inheritance',
    nameEn: 'Al-Nisāʾ — Inheritance Legislation and Its Closing Epithets',
    nameAr: 'آيات المواريث في النساء',
    descEn: 'The inheritance legislation spans three passages: 4:11 (children\'s shares, closing "ʿalīman ḥakīman"), 4:12 (spouses\' and siblings\' shares, closing "ʿalīmun ḥakīm"), and 4:176 (the kalāla clause, closing "ʿalīmun bi-kulli shayʾin"). Al-Kirmānī identifies the near-identical arithmetic structure of 4:11 and 4:12 — each parsing male-to-female ratios then appending conditions — as the paradigm of legislative mutashābihāt. Students regularly import fractions or conditions from one verse into the other, making this trio a staple of advanced fiqh-and-ḥifẓ review.',
    verses: ['4:11', '4:12', '4:176']
  },
  {
    id: 'fa-man-athlam',
    nameEn: '"Who Is More Unjust Than One Who…" — The Rhetorical Indictment Formula',
    nameAr: 'فَمَنۡ أَظۡلَمُ مِمَّنۡ — التقريع البلاغي',
    descEn: 'The rhetorical formula "fa-man aẓlamu mim-man…" (who is more unjust than one who…) appears nine times across six sūrahs, each introducing a specific category of supreme transgression: fabricating lies against God (6:21, 6:93, 7:37, 10:17, 11:18, 29:68, 39:32) or concealing divine testimony (2:140). Al-Kirmānī devotes an extended section in al-Burhān to this group, noting that the question is always rhetorical — no one is more unjust — yet the offence named varies each time, and students memorising these sūrahs routinely transpose the specific crime from one occurrence to another.',
    verses: ['2:140', '6:21', '6:93', '7:37', '10:17', '11:18', '29:68', '39:32']
  }
];


class Mutashabihat {
  constructor() {
    this.container = document.getElementById('mutashabihat-container');
    if (!this.container) return;
    this.language = (typeof appSettings !== 'undefined' && appSettings) ? appSettings.get('language') : 'en';
    this.surah = 2;
    this.index = null;    // { "s:a": [[ref,len,start],...] }
    this.words = null;    // { "s:a": [diacritized words] }
    this.loaded = false;

    this.mode = 'browse'; // 'browse' | 'tricky' | 'practice' | 'groups'
    this.query = '';
    this.sort = 'ayah';   // 'ayah' | 'most'
    this.flashKey = null;
    this.quiz = null;
    this.streak = 0;
    this.tricky = this.loadTricky();
    this.best = this.loadBest();
    this.introHidden = this.loadIntroHidden();

    window.addEventListener('tabChanged', (e) => { if (e.detail.tabId === 'mutashabihat') this.ensureLoaded(); });
    window.addEventListener('settingChanged', (e) => {
      if (e.detail.key === 'language') { this.language = e.detail.value; if (this.loaded) this.render(); }
    });
  }

  tt(key) { return t(key, this.language); }
  esc(s) { return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }

  /* ---------- persistence ---------- */
  loadTricky() {
    try { const a = JSON.parse(localStorage.getItem('mutashabihat:tricky') || '[]'); return new Set(Array.isArray(a) ? a : []); }
    catch (e) { return new Set(); }
  }
  saveTricky() {
    try { localStorage.setItem('mutashabihat:tricky', JSON.stringify([...this.tricky])); } catch (e) { /* ignore */ }
  }
  isTricky(key) { return this.tricky.has(key); }
  toggleTricky(key) {
    if (this.tricky.has(key)) this.tricky.delete(key); else this.tricky.add(key);
    this.saveTricky();
  }
  loadBest() {
    try { return parseInt(localStorage.getItem('mutashabihat:bestStreak') || '0') || 0; } catch (e) { return 0; }
  }
  saveBest() {
    try { localStorage.setItem('mutashabihat:bestStreak', String(this.best)); } catch (e) { /* ignore */ }
  }
  loadIntroHidden() {
    try { return localStorage.getItem('mutashabihat:introHidden') === '1'; } catch (e) { return false; }
  }
  saveIntroHidden() {
    try { localStorage.setItem('mutashabihat:introHidden', this.introHidden ? '1' : '0'); } catch (e) { /* ignore */ }
  }

  /* ---------- data load ---------- */
  async ensureLoaded() {
    if (this.loaded) { this.render(); return; }
    this.container.innerHTML = `<div class="text-center py-16 text-gray-400">${this.tt('loading')}</div>`;
    try {
      const [idx, wd] = await Promise.all([
        fetch('data/mutashabihat.json').then(r => r.json()),
        (typeof QuranData !== 'undefined' && QuranData.getQuranWords) ? QuranData.getQuranWords()
          : fetch('data/quran-words.json').then(r => r.json())
      ]);
      this.index = idx; this.words = wd;
    } catch (e) {
      this.container.innerHTML = `<div class="text-center py-16 text-red-500">${this.tt('topics_load_error')}</div>`;
      return;
    }
    this.loaded = true;
    this.bindOnce();
    this.render();
  }

  bindOnce() {
    if (this._bound) return;
    this._bound = true;
    this.container.addEventListener('change', (e) => {
      if (e.target.id === 'mt-surah') {
        this.surah = parseInt(e.target.value); this.query = '';
        const sb = this.container.querySelector('#mt-search'); if (sb) sb.value = '';
        this.updateResults();
      }
      else if (e.target.id === 'mt-sort') { this.sort = e.target.value; this.updateResults(); }
    });
    this.container.addEventListener('input', (e) => {
      if (e.target.id === 'mt-search') { this.query = e.target.value; this.updateResults(); }
    });
    this.container.addEventListener('click', (e) => {
      if (e.target.closest('[data-mt-toggle-intro]')) {
        this.introHidden = !this.introHidden;
        this.saveIntroHidden();
        this.render();
        return;
      }

      const chip = e.target.closest('[data-mt-ref]');
      if (chip && typeof ayahModal !== 'undefined' && ayahModal) {
        const phrase = chip.getAttribute('data-mt-phrase');
        ayahModal.open(chip.getAttribute('data-mt-ref'), phrase ? { phrase } : undefined);
        return;
      }
      const open = e.target.closest('[data-mt-open]');
      if (open) { window.location.hash = open.getAttribute('data-mt-open'); return; }

      const modeBtn = e.target.closest('[data-mt-mode]');
      if (modeBtn) { this.setMode(modeBtn.getAttribute('data-mt-mode')); return; }

      if (e.target.closest('[data-mt-random]')) { this.randomPair(); return; }

      const tri = e.target.closest('[data-mt-tricky]');
      if (tri) { this.toggleTricky(tri.getAttribute('data-mt-tricky')); this.render(); return; }

      const cp = e.target.closest('[data-mt-copy]');
      if (cp) { this.copyPair(cp.getAttribute('data-mt-copy'), cp); return; }

      const choice = e.target.closest('[data-mt-choice]');
      if (choice) { this.answerQuiz(choice.getAttribute('data-mt-choice')); return; }
      if (e.target.closest('[data-mt-next]')) { this.quiz = null; this.buildQuiz(); this.updateResults(); return; }
    });
  }

  setMode(mode) {
    this.mode = mode;
    if (mode === 'practice' && !this.quiz) this.buildQuiz();
    this.render();
  }

  /* ---------- helpers ---------- */
  shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

  surahName(sNum, short) {
    if (short) {
      const info = (typeof getSurahByNumber === 'function') ? getSurahByNumber(parseInt(sNum)) : null;
      return info ? info.arabicName : String(sNum);
    }
    return (typeof getSurahName === 'function') ? getSurahName(parseInt(sNum), this.language) : String(sNum);
  }
  shortName(s) { return this.surahName(s, true); }

  /** Verses of the current surah that have similar verses, in ayah order. */
  surahVerses() {
    const prefix = this.surah + ':';
    return Object.keys(this.index)
      .filter(k => k.startsWith(prefix))
      .sort((a, b) => parseInt(a.split(':')[1]) - parseInt(b.split(':')[1]));
  }

  matchesQuery(key, q) {
    if (!q) return true;
    const [s, a] = key.split(':');
    if (`${s}:${a}`.includes(q) || a.startsWith(q)) return true;
    const nm = this.surahName(s).toLowerCase();
    if (nm.includes(q)) return true;
    return (this.index[key] || []).some(([ref]) => {
      if (ref.includes(q)) return true;
      return this.surahName(ref.split(':')[0]).toLowerCase().includes(q);
    });
  }

  /** Diacritized verse HTML with the shared phrase [start, start+len) highlighted. */
  verseHtml(key, start, len) {
    const w = this.words[key] || [];
    return w.map((word, i) => {
      const on = i >= start && i < start + len;
      return on
        ? `<span class="bg-amber-200 dark:bg-amber-500/30 rounded px-0.5">${this.esc(word)}</span>`
        : this.esc(word);
    }).join(' ');
  }

  randomPair() {
    const keys = Object.keys(this.index || {}).filter(k => (this.words[k] || []).length);
    if (!keys.length) return;
    const key = keys[Math.floor(Math.random() * keys.length)];
    this.mode = 'browse';
    this.query = '';
    this.surah = parseInt(key.split(':')[0]);
    this.flashKey = key;
    this.render();
  }

  copyPair(key, btn) {
    const words = (this.words[key] || []).join(' ');
    const [s] = key.split(':');
    const sims = (this.index[key] || []).map(x => x[0]).join('، ');
    const text = `${this.surahName(s)} ${key}\n${words}\n${this.tt('mutashabihat_similar')}: ${sims}`;
    const done = () => {
      if (!btn) return;
      const prev = btn.getAttribute('data-label') || btn.textContent;
      btn.textContent = '✓ ' + this.tt('copied');
      setTimeout(() => { btn.textContent = prev; }, 1400);
    };
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, () => {});
      else {
        const ta = document.createElement('textarea');
        ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); done(); } catch (e) { /* ignore */ }
        document.body.removeChild(ta);
      }
    } catch (e) { /* ignore */ }
  }

  /* ---------- intro card ---------- */
  introHtml() {
    if (this.introHidden) {
      return `<div class="flex justify-end mb-3">
        <button data-mt-toggle-intro class="text-xs text-primary underline underline-offset-2 hover:opacity-75 focus:outline-none">
          ${this.tt('mt_intro_show')} ▸
        </button>
      </div>`;
    }
    return `
      <div class="bg-gradient-to-br from-amber-50 to-amber-100/60 dark:from-amber-950/40 dark:to-amber-900/20 border border-amber-200 dark:border-amber-700/50 rounded-xl p-4 mb-4">
        <div class="flex items-start justify-between gap-2 mb-2">
          <h3 class="font-semibold text-amber-900 dark:text-amber-200 text-sm">${this.tt('mt_intro_title')}</h3>
          <button data-mt-toggle-intro class="text-[0.7rem] text-amber-700 dark:text-amber-400 underline underline-offset-2 hover:opacity-75 focus:outline-none shrink-0">
            ${this.tt('mt_intro_hide')}
          </button>
        </div>
        <div class="ayah-arabic !text-xl !leading-[2.2] !border-b-0 !pb-0 text-amber-900 dark:text-amber-100 mb-2" dir="rtl">
          ${this.esc(this.tt('mt_intro_verse'))}
        </div>
        <p class="text-xs text-amber-800 dark:text-amber-300 font-medium mb-2 italic">${this.tt('mt_intro_ref')} — the Quran's own distinction</p>
        <p class="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">${this.tt('mt_intro_body')}</p>
      </div>`;
  }

  /* ---------- curated groups ---------- */
  curatedGroupsHtml() {
    const cards = MUTASHABIHAT_GROUPS.map(g => {
      const chips = g.verses.map(ref => {
        const [s] = ref.split(':');
        return `<button data-mt-ref="${ref}" title="${this.tt('mt_group_open_verse')} ${ref}"
          class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-gray-200 dark:border-gray-700 text-xs hover:border-primary hover:bg-primary/5 dark:hover:bg-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          <span class="ayah-arabic !text-sm !mb-0 !pb-0 !border-b-0 !leading-none">${this.esc(this.shortName(s))}</span>
          <span class="text-gray-500 dark:text-gray-400">${ref}</span>
        </button>`;
      }).join('');
      return `
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
          <div class="flex items-start gap-2 mb-1">
            <div class="flex-1 min-w-0">
              <div class="font-semibold text-sm text-gray-800 dark:text-gray-100">${this.esc(g.nameEn)}</div>
              <div class="ayah-arabic !text-base !leading-snug !border-b-0 !pb-0 text-gray-500 dark:text-gray-400 mt-0.5" dir="rtl">${this.esc(g.nameAr)}</div>
            </div>
            <span class="shrink-0 px-2 py-0.5 rounded-full bg-primary/10 text-primary dark:bg-primary/20 text-[0.65rem] font-medium">${g.verses.length} ${this.tt('mt_group_verses_label')}</span>
          </div>
          <p class="text-xs text-gray-500 dark:text-gray-400 mb-3 leading-relaxed">${this.esc(g.descEn)}</p>
          <div class="flex flex-wrap gap-1.5">${chips}</div>
        </div>`;
    }).join('');
    return `
      <div class="mb-3 text-center">
        <p class="text-xs text-gray-400 dark:text-gray-500">${this.tt('mt_groups_desc')}</p>
      </div>
      <div class="space-y-3">${cards}</div>`;
  }

  /* ---------- quiz ---------- */
  buildQuiz() {
    if (!this.index || !this.words) { this.quiz = null; return; }
    const usable = k => (this.words[k] || []).length && (this.index[k] || []).length;
    const all = Object.keys(this.index).filter(usable);
    const rich = all.filter(k => this.index[k].length >= 2);
    const pool = rich.length ? rich : all;
    if (!pool.length) { this.quiz = null; return; }
    const key = pool[Math.floor(Math.random() * pool.length)];
    const sims = [...new Set(this.index[key].map(x => x[0]).filter(r => r !== key))];
    const distractors = this.shuffle(sims.slice()).slice(0, 3);
    const options = this.shuffle([key, ...distractors]);
    const [, len, start] = this.index[key][0];
    this.quiz = { key, options, answer: key, start, len, answered: null };
  }

  answerQuiz(ref) {
    if (!this.quiz || this.quiz.answered) return;
    this.quiz.answered = ref;
    if (ref === this.quiz.answer) {
      this.streak += 1;
      if (this.streak > this.best) { this.best = this.streak; this.saveBest(); }
    } else {
      this.streak = 0;
    }
    this.updateResults();
  }

  practiceHtml() {
    if (!this.quiz) this.buildQuiz();
    if (!this.quiz) return `<div class="text-center py-10 text-gray-400">${this.tt('mt_not_enough')}</div>`;
    const q = this.quiz;
    const answered = !!q.answered;
    const options = q.options.map(ref => {
      const [s] = ref.split(':');
      const label = `${this.esc(this.surahName(s))} <span class="opacity-60">${ref}</span>`;
      let cls = 'border-gray-200 dark:border-gray-700 hover:border-primary hover:bg-primary/5 dark:hover:bg-primary/10';
      let mark = '';
      if (answered) {
        if (ref === q.answer) { cls = 'border-green-500 bg-green-50 dark:bg-green-500/15 text-green-700 dark:text-green-300'; mark = ' ✓'; }
        else if (ref === q.answered) { cls = 'border-red-400 bg-red-50 dark:bg-red-500/15 text-red-600 dark:text-red-300'; mark = ' ✕'; }
        else cls = 'border-gray-200 dark:border-gray-700 opacity-60';
      }
      return `<button ${answered ? 'disabled' : ''} data-mt-choice="${ref}"
                class="w-full text-start px-3 py-2.5 rounded-lg border text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${cls}">
                ${label}${mark}</button>`;
    }).join('');
    const verdict = answered
      ? (q.answered === q.answer
          ? `<span class="text-green-600 dark:text-green-400 font-semibold">✓ ${this.tt('mt_correct')}</span>`
          : `<span class="text-red-500 dark:text-red-400 font-semibold">✕ ${this.tt('mt_wrong')}</span>`)
      : '';
    return `
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-4 max-w-2xl mx-auto">
        <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
          <span>🎯 ${this.tt('mt_practice_q')}</span>
          <span>${this.tt('mt_streak')}: <b class="text-primary">${this.streak}</b> · ${this.tt('best_score')}: <b>${this.best}</b></span>
        </div>
        <div class="ayah-arabic !text-2xl !leading-[2.4] mb-4" dir="rtl">${this.verseHtml(q.key, q.start, q.len)}</div>
        <div class="space-y-2">${options}</div>
        <div class="flex items-center justify-between mt-4 min-h-[2.25rem]">
          <div>${verdict}</div>
          ${answered ? `<button data-mt-next class="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">${this.tt('mt_new_question')} →</button>` : ''}
        </div>
      </div>`;
  }

  /* ---------- browse / tricky results ---------- */
  resultsHtml() {
    if (this.mode === 'practice') return this.practiceHtml();
    if (this.mode === 'groups') return this.curatedGroupsHtml();
    if (this.mode === 'tricky') {
      const keys = [...this.tricky].filter(k => (this.index || {})[k])
        .sort((a, b) => a.split(':').map(Number)[0] - b.split(':').map(Number)[0] || a.split(':').map(Number)[1] - b.split(':').map(Number)[1]);
      return keys.length ? keys.map(k => this.cardHtml(k)).join('')
        : `<div class="text-center py-10 text-gray-400">${this.tt('mt_no_tricky')}</div>`;
    }
    // browse
    let verses = this.surahVerses();
    const q = (this.query || '').trim().toLowerCase();
    if (q) verses = verses.filter(k => this.matchesQuery(k, q));
    if (this.sort === 'most') {
      verses = verses.slice().sort((a, b) =>
        (this.index[b].length - this.index[a].length) ||
        (parseInt(a.split(':')[1]) - parseInt(b.split(':')[1])));
    }
    if (!verses.length) {
      return `<div class="text-center py-10 text-gray-400">${q ? this.tt('mt_no_match') : this.tt('mutashabihat_none')}</div>`;
    }
    return verses.map(k => this.cardHtml(k)).join('');
  }

  updateResults() {
    const el = this.container.querySelector('#mt-results');
    if (el) el.innerHTML = this.resultsHtml();
  }

  render() {
    const lang = this.language;
    const trickyN = [...this.tricky].filter(k => (this.index || {})[k]).length;
    const tab = (mode, label, badge) => `
      <button data-mt-mode="${mode}" class="px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${this.mode === mode ? 'bg-primary text-white border-primary' : 'border-gray-200 dark:border-gray-700 hover:border-primary'}">${label}${badge ? ` <span class="ms-0.5 px-1.5 rounded-full text-[0.65rem] ${this.mode === mode ? 'bg-white/25' : 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300'}">${badge}</span>` : ''}</button>`;

    const browseTools = this.mode === 'browse' ? `
      <div class="flex flex-wrap items-center justify-center gap-2 mb-3">
        <select id="mt-surah" aria-label="${this.tt('select_surah')}" class="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm">
          ${SURAH_DATA.map(s => {
            const n = Object.keys(this.index || {}).filter(k => k.startsWith(s.number + ':')).length;
            return `<option value="${s.number}" ${s.number === this.surah ? 'selected' : ''}>${this.esc(formatSurahOption(s, lang))}${n ? ` · ${n}` : ''}</option>`;
          }).join('')}
        </select>
        <input id="mt-search" type="search" value="${this.esc(this.query)}" placeholder="${this.tt('mt_search_ph')}" aria-label="${this.tt('search')}"
          class="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm w-40">
        <select id="mt-sort" aria-label="${this.tt('mt_sort')}" class="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm">
          <option value="ayah" ${this.sort === 'ayah' ? 'selected' : ''}>${this.tt('mt_sort_ayah')}</option>
          <option value="most" ${this.sort === 'most' ? 'selected' : ''}>${this.tt('mt_sort_most')}</option>
        </select>
        <button data-mt-random class="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm hover:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">🎲 ${this.tt('mt_random')}</button>
      </div>` : '';

    this.container.innerHTML = `
      <div class="w-full max-w-4xl mx-auto">
        <div class="text-center mb-4">
          <h2 class="text-2xl font-bold mb-1">🪞 ${this.tt('mutashabihat_title')}</h2>
          <p class="text-gray-500 dark:text-gray-400 text-sm">${this.tt('mutashabihat_subtitle')}</p>
        </div>
        ${this.introHtml()}
        <div class="flex flex-wrap items-center justify-center gap-2 mb-3">
          ${tab('browse', this.tt('mt_browse'))}
          ${tab('groups', '📚 ' + this.tt('mt_groups'))}
          ${tab('practice', '🎯 ' + this.tt('mt_practice'))}
          ${tab('tricky', '⭐ ' + this.tt('mt_review_tricky'), trickyN || '')}
        </div>
        ${browseTools}
        ${this.mode === 'browse' ? `<p class="text-xs text-gray-400 dark:text-gray-500 text-center mb-4">${this.tt('mutashabihat_hint')}</p>` : ''}
        <div id="mt-results" class="space-y-3">${this.resultsHtml()}</div>
      </div>`;

    if (this.flashKey) this.flashCard(this.flashKey);
    this.flashKey = null;
  }

  flashCard(key) {
    const id = 'mt-card-' + key.replace(':', '-');
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (!el) return;
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('ring-2', 'ring-primary');
      setTimeout(() => el.classList.remove('ring-2', 'ring-primary'), 1600);
    });
  }

  cardHtml(key) {
    const sims = this.index[key] || [];
    if (!sims.length) return '';
    const [sNum, ayah] = key.split(':');
    const [, topLen, topStart] = sims[0];
    const tricky = this.isTricky(key);
    const chips = sims.map(([ref, len, start]) => {
      const [s] = ref.split(':');
      const st = start || 0;
      const phrase = (this.words[key] || []).slice(st, st + len).join(' ');
      return `<button data-mt-ref="${ref}" data-mt-phrase="${this.esc(phrase)}" title="${this.tt('mutashabihat_shared')}: ${len} ${this.tt('mt_words')}"
                class="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-xs hover:border-primary hover:bg-primary/5 dark:hover:bg-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                <span class="ayah-arabic !text-sm !mb-0 !pb-0 !border-b-0 !leading-none">${this.esc(this.shortName(s))}</span>
                <span class="text-gray-500 dark:text-gray-400">${ref}</span>
                <span class="text-[0.65rem] text-amber-600 dark:text-amber-400">${len} ${this.tt('mt_words')}</span>
              </button>`;
    }).join('');
    return `
      <div id="mt-card-${key.replace(':', '-')}" class="bg-white dark:bg-gray-800 rounded-xl shadow p-4 transition-shadow">
        <div class="flex items-center gap-2 mb-2 text-sm text-gray-500 dark:text-gray-400">
          <span class="ayah-number">${ayah}</span>
          <span>${this.esc(this.surahName(sNum))} · ${this.tt('ayah')} ${ayah}</span>
          <div class="ms-auto flex items-center gap-1">
            <button data-mt-tricky="${key}" title="${this.tt('mt_tricky')}" aria-pressed="${tricky}"
              class="px-2 py-1.5 rounded-lg text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${tricky ? 'text-amber-500' : 'text-gray-300 dark:text-gray-600 hover:text-amber-400'}">${tricky ? '★' : '☆'}</button>
            <button data-mt-copy="${key}" data-label="⧉" title="${this.tt('copy')}"
              class="px-2 py-1.5 rounded-lg text-xs text-gray-400 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">⧉</button>
            <button data-mt-open="${key}" class="px-2 py-1.5 -me-2 rounded-lg text-xs text-primary dark:text-blue-400 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">${this.tt('preview')} ↗</button>
          </div>
        </div>
        <div class="ayah-arabic !text-2xl !leading-[2.4] mb-3" dir="rtl">${this.verseHtml(key, topStart, topLen)}</div>
        <div class="text-xs text-gray-400 dark:text-gray-500 mb-1.5">${this.tt('mutashabihat_similar')} (${sims.length})</div>
        <div class="flex flex-wrap gap-2">${chips}</div>
      </div>`;
  }
}

let mutashabihat;
document.addEventListener('DOMContentLoaded', () => { mutashabihat = new Mutashabihat(); });
