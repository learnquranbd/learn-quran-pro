/**
 * Mutashabihat — DATA MODULE
 * Extracted from js/mutashabihat.js.
 * Global: MUTASHABIHAT_GROUPS (curated groups of similar verses).
 * Loaded BEFORE js/mutashabihat.js in index.html.
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
  },

  // ── Wave 4 — 8 additional curated groups ─────────────────────────────────

  {
    id: 'ghafil-amma-tamalun',
    nameEn: '"Allah Is Not Unaware of What You Do" — taʿmalūn vs yaʿmalūn',
    nameAr: 'وَمَا ٱللَّهُ بِغَٰفِلٍ عَمَّا تَعْمَلُونَ / يَعْمَلُونَ',
    descEn: 'The verse-closing warning "wa-mā llāhu bi-ghāfilin ʿammā taʿmalūn" (…of what YOU do) recurs identically at 2:74, 2:85, 2:140, 2:149 and 3:99. But at 2:144 the pronoun shifts to third person — "…ʿammā yaʿmalūn" (of what THEY do) — and at 27:93 the subject changes to "wa-mā rabbuka" (your Lord) instead of "wa-mā llāhu". Al-Kirmānī flags the taʿmalūn/yaʿmalūn switch as one of the most substituted single-letter distinctions in ḥifẓ, since five near-neighbours in al-Baqarah use "taʿmalūn" while 2:144 alone breaks the pattern.',
    descBn: 'আয়াতের শেষে সতর্কবাণী "ওয়া মা-ল্লাহু বিগাফিলিন আম্মা তা\'মালূন" (তোমরা যা কর তা থেকে আল্লাহ গাফিল নন) হুবহু একই রূপে আসে ২:৭৪, ২:৮৫, ২:১৪০, ২:১৪৯ ও ৩:৯৯-এ। কিন্তু ২:১৪৪-এ সর্বনাম বদলে তৃতীয় পুরুষ হয়ে যায় — "আম্মা ইয়া\'মালূন" (তারা যা করে) — আর ২৭:৯৩-এ কর্তা বদলে "ওয়া মা রাব্বুকা" (তোমার রব) হয়। আল-বাকারার পাঁচটি কাছাকাছি আয়াতে "তা\'মালূন" থাকায় একমাত্র ব্যতিক্রম ২:১৪৪ হিফযে বহুল বিভ্রান্তির কারণ।',
    verses: ['2:74', '2:85', '2:140', '2:144', '2:149', '3:99', '27:93']
  },
  {
    id: 'sami-alim-endings',
    nameEn: 'As-Samīʿ al-ʿAlīm — The "Hearing, Knowing" Verse-Endings',
    nameAr: 'ٱلسَّمِيعُ ٱلْعَلِيمُ — خواتيم الآيات',
    descEn: 'Dozens of verses close with the divine-name pair "as-Samīʿ al-ʿAlīm" (the All-Hearing, All-Knowing), but the lead-in phrase rotates: "wa-huwa s-Samīʿu l-ʿAlīm" (2:137), "inna llāha samīʿun ʿalīm" (2:181), and "innahu huwa s-Samīʿu l-ʿAlīm" (8:61, 26:220, 41:36, 44:6). Al-Kirmānī notes that the same closing pair with four different introductory formulas — plus the risk of substituting it for "al-ʿAzīz al-Ḥakīm" or "al-ʿAlīm al-Ḥakīm" — makes this one of the densest colophon-confusion sets in the Quran.',
    descBn: 'বহু আয়াত শেষ হয় "আস-সামী\' আল-আলীম" (সর্বশ্রোতা, সর্বজ্ঞ) নাম-জোড়ায়, তবে এর পূর্ববর্তী বাক্যাংশ বদলায়: "ওয়া হুওয়াস-সামী\'উল-আলীম" (২:১৩৭), "ইন্নাল্লাহা সামী\'উন আলীম" (২:১৮১), এবং "ইন্নাহু হুওয়াস-সামী\'উল-আলীম" (৮:৬১, ২৬:২২০, ৪১:৩৬, ৪৪:৬)। একই সমাপ্তি-জোড়ার চারটি ভিন্ন সূচনা, সেই সঙ্গে একে "আল-আযীয আল-হাকীম" বা "আল-আলীম আল-হাকীম"-এর সঙ্গে গুলিয়ে ফেলার ঝুঁকি — এটি কুরআনের অন্যতম ঘন বিভ্রান্তিকর সমাপ্তি-গুচ্ছ।',
    verses: ['2:137', '2:181', '8:61', '26:220', '41:36', '44:6']
  },
  {
    id: 'tughni-nudhur',
    nameEn: '"Warnings Avail Nothing" — Fa-mā Tughni n-Nudhur',
    nameAr: 'فَمَا تُغْنِ ٱلنُّذُرُ / وَمَا تُغْنِى ٱلْـَٔايَٰتُ وَٱلنُّذُرُ',
    descEn: 'Two verses hinge on the root gh-n-y (to avail) with "an-nudhur" (the warnings/warners). Sūrat al-Qamar 54:5 reads tersely "ḥikmatun bālighatun fa-mā tughni n-nudhur" (…so what use are the warners?), while Yūnus 10:101 expands it: "wa-mā tughnī l-āyātu wa-n-nudhuru ʿan qawmin lā yuʾminūn" (neither signs nor warners avail a people who will not believe). The near-identical "tughni…an-nudhur" core with one adding "al-āyāt" and a full clause is a classic close-pair that reciters conflate.',
    descBn: 'দুটি আয়াত গ-ন-ইয়া (উপকারে আসা) মূল ও "আন-নুযুর" (সতর্ককারী) নিয়ে গঠিত। সূরা আল-কামার ৫৪:৫ সংক্ষেপে বলে "হিকমাতুন বালিগাতুন ফামা তুগনিন-নুযুর" (…তবে সতর্ককারীরা কী কাজে আসে?), আর ইউনুস ১০:১০১ তা বিস্তৃত করে: "ওয়ামা তুগনিল-আয়াতু ওয়ান-নুযুরু আন কাওমিন লা ইউ\'মিনূন" (যারা ঈমান আনবে না তাদের জন্য নিদর্শন ও সতর্ককারী কোনো কাজে আসে না)। প্রায় একই "তুগনি…আন-নুযুর" কেন্দ্র থাকায় তিলাওয়াতকারীরা এদুটি গুলিয়ে ফেলেন।',
    verses: ['10:101', '54:5']
  },
  {
    id: 'bani-israil-baqarah',
    nameEn: 'The Banū Isrāʾīl Reminders in al-Baqarah',
    nameAr: 'نداءات بني إسرائيل في سورة البقرة',
    descEn: 'Three verses open the Israelite address with the identical call "yā banī Isrāʾīla dhkurū niʿmatiya llatī anʿamtu ʿalaykum" (O Children of Israel, remember My favour upon you). At 2:40 the continuation is unique — "wa-awfū bi-ʿahdī ūfi bi-ʿahdikum wa-iyyāya fa-rhabūn" (fulfil My covenant…). But 2:47 and 2:122 are word-for-word identical, both continuing "wa-annī faḍḍaltukum ʿalā l-ʿālamīn" (and that I favoured you above the worlds). Al-Kirmānī cites this trio as a textbook trap: one shared opening, two verses fully identical, one diverging.',
    descBn: 'তিনটি আয়াত ইসরাঈল-সন্তানদের প্রতি একই আহ্বানে শুরু হয় "ইয়া বানী ইসরাঈলাযকুরূ নি\'মাতিয়াল্লাতী আন\'আমতু আলাইকুম" (হে বনী ইসরাঈল, আমার নিয়ামত স্মরণ কর)। ২:৪০-এ ধারাবাহিকতা অনন্য — "ওয়া আওফূ বিআহদী ঊফি বিআহদিকুম ওয়া ইয়্যায়া ফারহাবূন" (আমার অঙ্গীকার পূরণ কর…)। কিন্তু ২:৪৭ ও ২:১২২ হুবহু একই, উভয়ই বলে "ওয়া আন্নী ফাদ্দালতুকুম আলাল-আলামীন" (আমি তোমাদের সৃষ্টিকুলের ওপর শ্রেষ্ঠত্ব দিয়েছি)। একটি অভিন্ন সূচনা, দুটি সম্পূর্ণ অভিন্ন, একটি ভিন্ন — শাস্ত্রীয় ফাঁদ।',
    verses: ['2:40', '2:47', '2:122']
  },
  {
    id: 'innaka-anta-closings',
    nameEn: '"Indeed You, You Are…" — The Innaka Anta Supplication Closings',
    nameAr: 'إِنَّكَ أَنتَ — خواتيم الأدعية',
    descEn: 'Prophetic supplications frequently close with "innaka anta…" (indeed You, You are…) followed by different divine-name pairs: "al-ʿAlīm al-Ḥakīm" (Ibrāhīm & Ismāʿīl, 2:32 is the angels\' — Ibrāhīm at 2:129 "al-ʿAzīz al-Ḥakīm"); "at-Tawwāb ar-Raḥīm" (2:128); "al-Wahhāb" (3:8); "ʿAllām al-Ghuyūb" (5:116); and "al-ʿAzīz al-Ḥakīm" (5:118). Al-Kirmānī highlights that memorisers, primed by the identical "innaka anta" frame, routinely attach the wrong attribute-pair to the wrong prayer.',
    descBn: 'নবীগণের দোয়া প্রায়ই "ইন্নাকা আনতা…" (নিশ্চয় আপনি, আপনিই…) দিয়ে শেষ হয়, এরপর ভিন্ন নাম-জোড়া: "আল-আলীম আল-হাকীম" (২:৩২ ফেরেশতাদের বাণী), "আত-তাওওয়াব আর-রাহীম" (২:১২৮), "আল-ওয়াহহাব" (৩:৮), "আল্লাম আল-গুয়ূব" (৫:১১৬), এবং "আল-আযীয আল-হাকীম" (৫:১১৮)। অভিন্ন "ইন্নাকা আনতা" কাঠামোর কারণে হাফিযগণ প্রায়ই ভুল দোয়ার সঙ্গে ভুল গুণ-জোড়া যুক্ত করে ফেলেন বলে আল-কিরমানী উল্লেখ করেন।',
    verses: ['2:32', '2:128', '3:8', '5:116', '5:118']
  },
  {
    id: 'aqim-salata-atu-zakata',
    nameEn: '"Establish Prayer and Give Zakāh" — The Twin Command',
    nameAr: 'وَأَقِيمُوا۟ ٱلصَّلَوٰةَ وَءَاتُوا۟ ٱلزَّكَوٰةَ',
    descEn: 'The paired command "wa-aqīmū ṣ-ṣalāta wa-ātū z-zakāta" (establish the prayer and give the zakāh) recurs in dozens of verses, always with a different continuation. At 2:43 it closes "wa-rkaʿū maʿa r-rākiʿīn" (…and bow with those who bow); at 2:110 "wa-mā tuqaddimū li-anfusikum…" (whatever good you send forth…); at 24:56 "wa-aṭīʿū r-rasūla laʿallakum turḥamūn" (…and obey the Messenger); within the covenant of 2:83; and among the night-prayer rulings of 73:20. Ibn az-Zubayr al-Gharnāṭī treats the varying tail clause attached to the identical command as the defining challenge.',
    descBn: 'যুগল আদেশ "ওয়া আকীমুস-সালাতা ওয়া আতুয-যাকাতা" (নামায কায়েম কর ও যাকাত দাও) বহু আয়াতে আসে, প্রতিবার ভিন্ন ধারাবাহিকতায়। ২:৪৩-এ শেষ হয় "ওয়ারকাঊ মা\'আর-রাকিঈন" (রুকুকারীদের সঙ্গে রুকু কর); ২:১১০-এ "ওয়ামা তুকাদ্দিমূ লিআনফুসিকুম…" (যে কল্যাণ আগে পাঠাবে…); ২৪:৫৬-এ "ওয়া আতীঊর-রাসূলা লা\'আল্লাকুম তুরহামূন" (রাসূলের আনুগত্য কর); ২:৮৩-এর অঙ্গীকারে; এবং ৭৩:২০-এর রাত্রি-নামাযের বিধানে। অভিন্ন আদেশের সঙ্গে যুক্ত ভিন্ন অংশটিই মুখ্য চ্যালেঞ্জ।',
    verses: ['2:43', '2:83', '2:110', '24:56', '73:20']
  },
  {
    id: 'laallakum-clause-endings',
    nameEn: '"Thus Allah Makes Clear His Signs" — taʿqilūn / tatafakkarūn / yatadhakkarūn',
    nameAr: 'كَذَٰلِكَ يُبَيِّنُ ٱللَّهُ — لَعَلَّكُمْ تَعْقِلُونَ / تَتَفَكَّرُونَ',
    descEn: 'The clarification formula "kadhālika yubayyinu llāhu lakum…" (thus Allah makes clear to you His signs) closes with a rotating purpose-verb. At 2:219 and 2:266 it is "laʿallakum tatafakkarūn" (that you may reflect); at 2:242 "laʿallakum taʿqilūn" (that you may reason); and at 2:221 the pronoun and verb shift to "li-n-nāsi laʿallahum yatadhakkarūn" (…for the people, that they may take heed). Al-Kirmānī notes that the taʿqilūn/tatafakkarūn/yatadhakkarūn ending is among the most frequently transposed verse-closings, especially with two occurrences (2:219, 2:266) sharing the identical "tatafakkarūn".',
    descBn: 'স্পষ্টীকরণ সূত্র "কাযালিকা ইউবাইয়িনুল্লাহু লাকুম…" (এভাবে আল্লাহ তোমাদের জন্য তাঁর নিদর্শন স্পষ্ট করেন) ঘূর্ণায়মান উদ্দেশ্য-ক্রিয়ায় শেষ হয়। ২:২১৯ ও ২:২৬৬-এ "লা\'আল্লাকুম তাতাফাক্কারূন" (যাতে তোমরা চিন্তা কর); ২:২৪২-এ "লা\'আল্লাকুম তা\'কিলূন" (যাতে তোমরা বোঝ); আর ২:২২১-এ সর্বনাম ও ক্রিয়া বদলে "লিন-নাসি লা\'আল্লাহুম ইয়াতাযাক্কারূন" (মানুষের জন্য, যাতে তারা উপদেশ নেয়)। বিশেষত দুটি আয়াত (২:২১৯, ২:২৬৬) একই "তাতাফাক্কারূন" ভাগ করায় এই সমাপ্তি বহুল বিভ্রান্তিকর।',
    verses: ['2:219', '2:221', '2:242', '2:266']
  },
  {
    id: 'wama-arsalnaka-illa',
    nameEn: '"We Sent You Only As…" — Wa-mā Arsalnāka Illā',
    nameAr: 'وَمَآ أَرْسَلْنَٰكَ إِلَّا',
    descEn: 'The restrictive statement of the Prophet\'s mission "wa-mā arsalnāka illā…" (We have not sent you except as…) appears with four different predicates: "mubashshiran wa-nadhīran" (a bringer of glad tidings and a warner — 17:105 and 25:56, word-for-word identical); "raḥmatan li-l-ʿālamīn" (a mercy to the worlds — 21:107); and "kāffatan li-n-nāsi bashīran wa-nadhīran" (to all mankind, a bearer of glad tidings and a warner — 34:28). The shared "wa-mā arsalnāka illā" opening with a rotating description — two of them near-identical — is a classic substitution set.',
    descBn: 'নবীর দায়িত্ব সীমিতকারী বাক্য "ওয়ামা আরসালনাকা ইল্লা…" (আমি তোমাকে কেবল … রূপেই পাঠিয়েছি) চারটি ভিন্ন বিশেষণে আসে: "মুবাশশিরান ওয়া নাযীরা" (সুসংবাদদাতা ও সতর্ককারী — ১৭:১০৫ ও ২৫:৫৬ হুবহু অভিন্ন); "রাহমাতান লিল-আলামীন" (বিশ্বজগতের জন্য রহমত — ২১:১০৭); এবং "কাফফাতান লিন-নাসি বাশীরান ওয়া নাযীরা" (সমগ্র মানবজাতির জন্য সুসংবাদদাতা ও সতর্ককারী — ৩৪:২৮)। অভিন্ন সূচনার সঙ্গে ঘূর্ণায়মান বর্ণনা — যার দুটি প্রায় একই — শাস্ত্রীয় বিভ্রান্তি-গুচ্ছ।',
    verses: ['17:105', '21:107', '25:56', '34:28']
  },

  // ── Wave 5 — 8 additional curated groups ─────────────────────────────────

  {
    id: 'wa-la-takunu-ka',
    nameEn: '"Do Not Be Like Those Who…" — Wa-lā Takūnū ka-lladhīna',
    nameAr: 'وَلَا تَكُونُوا۟ كَٱلَّذِينَ',
    descEn: 'The prohibition "(wa-)lā takūnū ka-lladhīna…" (do not be like those who…) recurs with a different failing each time: "who split and differed after clear proofs came to them" (3:105), "who said \'we hear\' while they hear not" (8:21), "who harmed Mūsā" (33:69), and "who forgot Allah so He made them forget themselves" (59:19). The identical frame followed by a distinct community-failing is a classic substitution trap; note 33:69 opens "yā ayyuhā lladhīna āmanū lā takūnū" while the others begin "wa-lā takūnū".',
    descBn: 'নিষেধ "(ওয়া-)লা তাকূনূ কাল্লাযীনা…" (তাদের মতো হয়ো না যারা…) প্রতিবার ভিন্ন ত্রুটিসহ আসে: "যারা স্পষ্ট প্রমাণ আসার পর বিভক্ত ও মতভেদ করেছে" (৩:১০৫), "যারা বলল \'শুনলাম\' অথচ শোনে না" (৮:২১), "যারা মূসাকে কষ্ট দিয়েছিল" (৩৩:৬৯), এবং "যারা আল্লাহকে ভুলে গেছে, ফলে তিনি তাদের নিজেদেরই ভুলিয়ে দিয়েছেন" (৫৯:১৯)। অভিন্ন কাঠামোর পর ভিন্ন জাতির ব্যর্থতা — বিভ্রান্তির ফাঁদ; লক্ষণীয়, ৩৩:৬৯ শুরু হয় "ইয়া আইয়ুহাল্লাযীনা আমানূ লা তাকূনূ" দিয়ে, বাকিগুলো "ওয়া-লা তাকূনূ" দিয়ে।',
    verses: ['3:105', '8:21', '33:69', '59:19']
  },
  {
    id: 'lahum-ajruhum-inda-rabbihim',
    nameEn: '"Their Reward Is with Their Lord" — Lahum Ajruhum ʿinda Rabbihim',
    nameAr: 'لَهُمْ أَجْرُهُمْ عِندَ رَبِّهِمْ',
    descEn: 'The reward formula "(fa-)lahum ajruhum ʿinda rabbihim wa-lā khawfun ʿalayhim wa-lā hum yaḥzanūn" recurs with subtle shifts. 2:262 drops the "fa-"; 2:112 switches to the SINGULAR "fa-lahu ajruhu ʿinda rabbihi" (his reward, his Lord) though the following clause stays plural; 3:199 keeps "ulāʾika lahum ajruhum ʿinda rabbihim" but ends "inna llāha sarīʿu l-ḥisāb" with no khawf-clause; and 5:69 — the deceptive near-twin of 2:62 — OMITS the reward clause entirely, reading only "fa-lā khawfun ʿalayhim…". Singular-vs-plural and the presence or absence of the ajr-clause are top ḥifẓ traps.',
    descBn: 'পুরস্কার-সূত্র "(ফা-)লাহুম আজরুহুম ইনদা রাব্বিহিম ওয়া লা খাওফুন আলাইহিম ওয়া লা হুম ইয়াহযানূন" সূক্ষ্ম পরিবর্তনে ফিরে আসে। ২:২৬২-এ "ফা-" বাদ পড়ে; ২:১১২-এ একবচন হয়ে যায় "ফালাহু আজরুহু ইনদা রাব্বিহি" (তার পুরস্কার, তার রব) যদিও পরের অংশ বহুবচন থাকে; ৩:১৯৯-এ "উলাইকা লাহুম আজরুহুম ইনদা রাব্বিহিম" থাকে কিন্তু শেষ হয় "ইন্নাল্লাহা সারীউল-হিসাব" দিয়ে, কোনো খাওফ-অংশ নেই; আর ৫:৬৯ — ২:৬২-এর প্রতারক যমজ — পুরস্কার-অংশ সম্পূর্ণ বাদ দিয়ে শুধু "ফালা খাওফুন আলাইহিম…" পড়ে। একবচন/বহুবচন ও আজর-অংশের উপস্থিতি/অনুপস্থিতি হিফযের বড় ফাঁদ।',
    verses: ['2:62', '2:112', '2:262', '2:274', '3:199', '5:69']
  },
  {
    id: 'sujud-li-adam-openings',
    nameEn: '"Prostrate to Adam" — The Sujūd Command Openings',
    nameAr: 'وَإِذْ قُلْنَا لِلْمَلَٰٓئِكَةِ ٱسْجُدُوا۟ لِـَٔادَمَ',
    descEn: 'The command "wa-idh qulnā li-l-malāʾikati sjudū li-ādama fa-sajadū illā iblīs" opens the prostration scene identically in 2:34, 17:61, 18:50 and 20:116 — but each continuation differs: "abā wa-stakbara wa-kāna mina l-kāfirīn" (2:34), "qāla a-asjudu li-man khalaqta ṭīnan" (17:61), "kāna mina l-jinni fa-fasaqa ʿan amri rabbih" (18:50), and the terse "abā" alone (20:116). 7:11 breaks the frame, opening "wa-laqad khalaqnākum thumma ṣawwarnākum thumma qulnā…" and closing "lam yakun mina s-sājidīn". Matching each opening to its distinct tail is a core mutashābihāt drill.',
    descBn: 'আদেশ "ওয়া ইয কুলনা লিল-মালাইকাতিসজুদূ লিআদামা ফাসাজাদূ ইল্লা ইবলীস" — প্রণাম-দৃশ্য ২:৩৪, ১৭:৬১, ১৮:৫০ ও ২০:১১৬-এ হুবহু একইভাবে শুরু হয়, কিন্তু প্রতিটির ধারাবাহিকতা ভিন্ন: "আবা ওয়াসতাকবারা ওয়া কানা মিনাল-কাফিরীন" (২:৩৪), "কালা আআসজুদু লিমান খালাকতা তীনা" (১৭:৬১), "কানা মিনাল-জিন্নি ফাফাসাকা আন আমরি রাব্বিহ" (১৮:৫০), এবং শুধু সংক্ষিপ্ত "আবা" (২০:১১৬)। ৭:১১ কাঠামো ভেঙে শুরু হয় "ওয়া লাকাদ খালাকনাকুম ছুম্মা সাওওয়ারনাকুম ছুম্মা কুলনা…" দিয়ে ও শেষ হয় "লাম ইয়াকুম মিনাস-সাজিদীন" দিয়ে। প্রতিটি সূচনাকে তার ভিন্ন সমাপ্তির সঙ্গে মেলানো মূল অনুশীলন।',
    verses: ['2:34', '7:11', '17:61', '18:50', '20:116']
  },
  {
    id: 'inna-anzalnahu-quranan',
    nameEn: '"We Sent It Down as an Arabic Quran" — Anzalnāhu vs Jaʿalnāhu',
    nameAr: 'إِنَّآ أَنزَلْنَٰهُ قُرْءَٰنًا عَرَبِيًّا',
    descEn: 'The revelation-opening "innā anzalnāhu qurʾānan ʿarabiyyan laʿallakum taʿqilūn" (12:2) is echoed almost verbatim in 43:3 — except the verb changes: "innā JAʿALnāhu qurʾānan ʿarabiyyan…" (We MADE it) instead of "anzalnāhu" (We sent it down). 20:113 shares "qurʾānan ʿarabiyyan" but opens "wa-kadhālika anzalnāhu…" and continues "wa-ṣarrafnā fīhi mina l-waʿīd". And 97:1 reuses the "innā anzalnāhu" opening — but for the Night of Decree, not the Arabic Quran: "innā anzalnāhu fī laylati l-qadr". The anzalnāhu/jaʿalnāhu swap at 12:2 / 43:3 is a celebrated single-word trap.',
    descBn: 'অবতরণ-সূচনা "ইন্না আনযালনাহু কুরআনান আরাবিয়্যান লাআল্লাকুম তা‘কিলূন" (১২:২) প্রায় হুবহু ৪৩:৩-এ প্রতিধ্বনিত হয় — কেবল ক্রিয়া বদলে যায়: "ইন্না জাআলনাহু কুরআনান আরাবিয়্যান…" (আমি তা বানিয়েছি) — "আনযালনাহু" (নাযিল করেছি)-এর বদলে। ২০:১১৩-এ "কুরআনান আরাবিয়্যান" থাকে কিন্তু শুরু হয় "ওয়া কাযালিকা আনযালনাহু…" দিয়ে ও চলে "ওয়া সাররাফনা ফীহি মিনাল-ওয়াঈদ" দিয়ে। আর ৯৭:১ একই "ইন্না আনযালনাহু" সূচনা পুনর্ব্যবহার করে — তবে আরবি কুরআনের নয়, বরং কদরের রাতের জন্য: "ইন্না আনযালনাহু ফী লাইলাতিল-কাদর"। ১২:২ / ৪৩:৩-এ আনযালনাহু/জাআলনাহু অদলবদল একটি প্রসিদ্ধ এক-শব্দের ফাঁদ।',
    verses: ['12:2', '20:113', '43:3', '97:1']
  },
  {
    id: 'kadhalika-najzi',
    nameEn: '"Thus We Recompense…" — Kadhālika Najzī',
    nameAr: 'وَكَذَٰلِكَ نَجْزِى',
    descEn: 'The recompense formula "wa-kadhālika najzī…" (thus We recompense…) closes many verses with a rotating object. For the doers of good it is "al-muḥsinīn": "wa-kadhālika najzī l-muḥsinīn" (6:84, 12:22, 28:14) and, with an added emphatic, "innā kadhālika najzī l-muḥsinīn" (37:80). For transgressors the object flips: "najzī l-mujrimīn" (the criminals — 7:40) and "najzī ẓ-ẓālimīn" (the wrongdoers — 12:75, 21:29). The identical verb-frame with muḥsinīn / mujrimīn / ẓālimīn as the swappable ending is a classic colophon-confusion set.',
    descBn: 'প্রতিদান-সূত্র "ওয়া কাযালিকা নাজযী…" (এভাবে আমি প্রতিদান দিই…) বহু আয়াত শেষ করে ঘূর্ণায়মান কর্মপদসহ। সৎকর্মশীলদের জন্য তা "আল-মুহসিনীন": "ওয়া কাযালিকা নাজযিল-মুহসিনীন" (৬:৮৪, ১২:২২, ২৮:১৪) এবং জোরদার সংযোজনে "ইন্না কাযালিকা নাজযিল-মুহসিনীন" (৩৭:৮০)। সীমালঙ্ঘনকারীদের জন্য কর্মপদ বদলে যায়: "নাজযিল-মুজরিমীন" (অপরাধীদের — ৭:৪০) ও "নাজযিয-যালিমীন" (যালিমদের — ১২:৭৫, ২১:২৯)। অভিন্ন ক্রিয়া-কাঠামোর সঙ্গে মুহসিনীন / মুজরিমীন / যালিমীন — বদলযোগ্য সমাপ্তি হিসেবে — শাস্ত্রীয় বিভ্রান্তি-গুচ্ছ।',
    verses: ['6:84', '7:40', '12:22', '12:75', '21:29', '28:14', '37:80']
  },
  {
    id: 'fa-kayfa-kana-adhabi',
    nameEn: '"How Were My Punishment and Warnings" — Al-Qamar\'s ʿAdhābī wa-Nudhur',
    nameAr: 'فَكَيْفَ كَانَ عَذَابِى وَنُذُرِ',
    descEn: 'Sūrat al-Qamar drives home each destroyed people with a near-refrain built on "ʿadhābī wa-nudhur" (My punishment and My warnings). Four times it is the rhetorical "fa-kayfa kāna ʿadhābī wa-nudhur" (so how were My punishment and warnings! — 54:16, 54:18, 54:21, 54:30); twice it becomes the imperative "fa-dhūqū ʿadhābī wa-nudhur" (so taste My punishment and warnings — 54:37, 54:39). Both share the "ʿadhābī wa-nudhur" tail; recalling which opening — fa-kayfa kāna vs fa-dhūqū — attaches to which scene is the drill. (Distinct from the surah\'s other refrain, "yassarnā l-Qurʾāna".)',
    descBn: 'সূরা আল-কামার প্রতিটি ধ্বংসপ্রাপ্ত জাতিকে "আযাবী ওয়া নুযুর" (আমার শাস্তি ও আমার সতর্কবাণী)-ভিত্তিক প্রায়-পুনরাবৃত্তি দিয়ে দৃঢ় করে। চারবার তা অলংকারিক "ফাকাইফা কানা আযাবী ওয়া নুযুর" (তবে আমার শাস্তি ও সতর্কবাণী কেমন ছিল! — ৫৪:১৬, ৫৪:১৮, ৫৪:২১, ৫৪:৩০); দুইবার তা আদেশাত্মক "ফাযূকূ আযাবী ওয়া নুযুর" (অতএব আমার শাস্তি ও সতর্কবাণী আস্বাদন কর — ৫৪:৩৭, ৫৪:৩৯)। উভয়ই "আযাবী ওয়া নুযুর" সমাপ্তি ভাগ করে; কোন সূচনা — ফাকাইফা কানা না ফাযূকূ — কোন দৃশ্যের সঙ্গে যুক্ত তা মনে রাখাই অনুশীলন। (সূরার অপর পুনরাবৃত্তি "ইয়াসসারনাল-কুরআন" থেকে ভিন্ন।)',
    verses: ['54:16', '54:18', '54:21', '54:30', '54:37', '54:39']
  },
  {
    id: 'qul-audhu-openings',
    nameEn: 'The Four "Qul" Sūrahs — and the Muʿawwidhatān Twin',
    nameAr: 'سور "قل" الأربع والمعوذتان',
    descEn: 'The four "Qul" sūrahs each open with the imperative "Qul" (Say). Al-Kāfirūn begins "qul yā ayyuhā l-kāfirūn" (109:1) and al-Ikhlāṣ "qul huwa llāhu aḥad" (112:1). The muʿawwidhatān form a near-twin pair: "qul aʿūdhu bi-rabbi l-FALAQ" (Lord of the daybreak — 113:1) versus "qul aʿūdhu bi-rabbi n-NĀS" (Lord of mankind — 114:1) — identical but for the final word, after which 114 uniquely continues "maliki n-nās, ilāhi n-nās". Learners routinely blend the openings of these short, adjacent sūrahs.',
    descBn: 'চারটি "কুল" সূরা প্রতিটি "কুল" (বলো) আদেশ দিয়ে শুরু হয়। আল-কাফিরূন শুরু হয় "কুল ইয়া আইয়ুহাল-কাফিরূন" (১০৯:১), আল-ইখলাস "কুল হুওয়াল্লাহু আহাদ" (১১২:১)। মুআওবিযাতাইন প্রায়-যমজ জোড়া গঠন করে: "কুল আঊযু বিরাব্বিল-ফালাক" (ভোরের রব — ১১৩:১) বনাম "কুল আঊযু বিরাব্বিন-নাস" (মানুষের রব — ১১৪:১) — কেবল শেষ শব্দে ভিন্ন, এরপর ১১৪ অনন্যভাবে চলে "মালিকিন-নাস, ইলাহিন-নাস" দিয়ে। শিক্ষার্থীরা এই সংক্ষিপ্ত, পাশাপাশি সূরাগুলোর সূচনা প্রায়ই গুলিয়ে ফেলে।',
    verses: ['109:1', '112:1', '113:1', '114:1']
  },
  {
    id: 'ittaqu-llaha-openings',
    nameEn: '"O You Who Believe, Fear Allah…" — Ittaqū llāha Openings',
    nameAr: 'يَٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوا۟ ٱتَّقُوا۟ ٱللَّهَ',
    descEn: 'The address "yā ayyuhā lladhīna āmanū ttaqū llāha…" (O you who believe, fear Allah…) opens many verses with a different command attached: "wa-dharū mā baqiya mina r-ribā" (2:278), "ḥaqqa tuqātihi" (3:102), "wa-btaghū ilayhi l-wasīla" (5:35), "wa-kūnū maʿa ṣ-ṣādiqīn" (9:119), "wa-qūlū qawlan sadīdā" (33:70), "wa-āminū bi-rasūlih" (57:28), and "wa-ltanẓur nafsun mā qaddamat li-ghad" (59:18). The identical opening with a rotating follow-on command is a prime sequential-memorisation challenge.',
    descBn: 'সম্বোধন "ইয়া আইয়ুহাল্লাযীনা আমানুত্তাকুল্লাহা…" (হে ঈমানদারগণ, আল্লাহকে ভয় কর…) বহু আয়াত শুরু করে ভিন্ন আদেশসহ: "ওয়া যারূ মা বাকিয়া মিনার-রিবা" (২:২৭৮), "হাক্কা তুকাতিহি" (৩:১০২), "ওয়াবতাগূ ইলাইহিল-ওয়াসীলা" (৫:৩৫), "ওয়া কূনূ মাআস-সাদিকীন" (৯:১১৯), "ওয়া কূলূ কাওলান সাদীদা" (৩৩:৭০), "ওয়া আমিনূ বিরাসূলিহ" (৫৭:২৮), এবং "ওয়ালতানযুর নাফসুম মা কাদ্দামাত লিগাদ" (৫৯:১৮)। অভিন্ন সূচনার সঙ্গে ঘূর্ণায়মান অনুবর্তী আদেশ — একটি প্রধান ধারাবাহিক-মুখস্থকরণ চ্যালেঞ্জ।',
    verses: ['2:278', '3:102', '5:35', '9:119', '33:70', '57:28', '59:18']
  }
];
