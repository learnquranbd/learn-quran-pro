/**
 * Islam → Nafl (Voluntary Acts) module.
 *
 * Nafl acts are voluntary — the Prophet ﷺ said "My servant continues drawing
 * near to Me with nawāfil until I love him." (Bukhari). This module covers
 * major categories: sunnah rawātib prayers, night prayers (tahajjud & witr),
 * duha, voluntary fasts, extra charity, dhikr, umrah, and general good deeds.
 */

const NAFL_I18N = {
  islam_nafl_title:    { en: 'Nafl (Voluntary)', bn: 'নফল (ঐচ্ছিক)', zh: '副功 (Nafl)', ja: '任意行為（ナフル）', ar: 'النافلة', ur: 'نفل', hi: 'नफ़्ल (ऐच्छिक)', fa: 'نفل (مستحب)', id: 'Nafl (Sunah)', ms: 'Nafl (Sunat)', tr: 'Nafile (Gönüllü)', fr: 'Nafl (Surérogatoire)', es: 'Nafl (Voluntario)', de: 'Nafl (Freiwillig)', ru: 'Нафль (добровольное)' },
  islam_nafl_subtitle: { en: 'Voluntary acts of worship — not obligatory, but a means of drawing closer to Allah and earning great reward. The Prophet ﷺ said: "My servant continues drawing near to Me with voluntary deeds until I love him." (Bukhari)', bn: 'ঐচ্ছিক ইবাদত — ফরজ নয়, তবে আল্লাহর নিকটবর্তী হওয়ার ও মহা সওয়াব অর্জনের মাধ্যম। নবী ﷺ বলেছেন: "আমার বান্দা নফল ইবাদতের মাধ্যমে আমার নিকটবর্তী হতে থাকে যতক্ষণ না আমি তাকে ভালোবাসি।" (বুখারি)' },
};

const NAFL_ITEMS = [
  { emoji: '🕌',
    titleEn: 'Sunnah Rawātib (Confirmed Sunnah Prayers)', titleBn: 'সুন্নাতে রাওয়াতিব (মুয়াক্কাদা সুন্নাত)',
    descEn: '12 rak\'ahs a day the Prophet ﷺ never omitted: 2 before Fajr, 4 before + 2 after Dhuhr, 2 after Maghrib, 2 after Isha. Whoever prays them gets a house in Paradise. (Muslim)',
    descBn: 'নবী ﷺ যে ১২ রাকাত কখনো ছাড়েননি: ফজরের আগে ২, যোহরের আগে ৪ + পরে ২, মাগরিবের পরে ২, ইশার পরে ২। যে পড়ে তার জন্য জান্নাতে একটি ঘর। (মুসলিম)',
    ref: 'Muslim 728',
  },
  { emoji: '🌙',
    titleEn: 'Tahajjud (Qiyām al-Layl)', titleBn: 'তাহাজ্জুদ (কিয়ামুল লাইল)',
    descEn: 'Night prayer performed after sleeping some part of the night. "The best prayer after the obligatory ones is the night prayer." (Muslim) Allah descends to the lowest heaven in the last third of the night.',
    descBn: 'রাতে কিছু সময় ঘুমানোর পর আদায়কৃত নামাজ। "ফরজের পর সর্বোত্তম নামাজ রাতের নামাজ।" (মুসলিম) রাতের শেষ তৃতীয়াংশে আল্লাহ নিকটবর্তী আসমানে অবতরণ করেন।',
    ref: '17:79, 73:1-6',
  },
  { emoji: '🌤️',
    titleEn: 'Ṣalāt al-Ḍuḥā (Forenoon Prayer)', titleBn: 'সালাতুদ দুহা (চাশত)',
    descEn: '2–12 rak\'ahs from ~20 min after sunrise until ~15 min before Dhuhr. Suffices as sadaqah for every joint of the body. (Muslim)',
    descBn: 'সূর্যোদয়ের ~২০ মিনিট পর থেকে যোহরের ~১৫ মিনিট আগ পর্যন্ত ২-১২ রাকাত। শরীরের প্রতিটি জোড়ার সদকা হিসেবে যথেষ্ট। (মুসলিম)',
    ref: 'Muslim 720',
  },
  { emoji: '🌅',
    titleEn: 'Voluntary Fasts', titleBn: 'নফল রোজা',
    descEn: 'Mondays & Thursdays, White Days (13-15 lunar), 6 of Shawwal, Day of Arafah (9 Dhul-Hijjah), Ashura (9-10 Muharram), Fast of Dāwūd (alternate days).',
    descBn: 'সোম-বৃহস্পতি, আইয়্যামে বীজ (১৩-১৫ চান্দ্র), শাওয়ালের ৬, আরাফা (৯ জিলহজ), আশুরা (৯-১০ মহররম), দাউদ (আঃ)-এর রোজা।',
    ref: 'Bukhari 1979, Muslim 1162',
  },
  { emoji: '📿',
    titleEn: 'Dhikr & Adhkār', titleBn: 'যিকির ও আজকার',
    descEn: 'Morning & evening remembrances, 33× SubhanAllah + 33× Alhamdulillah + 34× Allahu Akbar after every prayer, Ayatul Kursi after every fard prayer (protects until next), Surahs al-Ikhlas + Falaq + Nas × 3 morning and evening.',
    descBn: 'সকাল-সন্ধ্যার আজকার, প্রতি নামাজের পর ৩৩ সুবহানাল্লাহ + ৩৩ আলহামদুলিল্লাহ + ৩৪ আল্লাহু আকবার, প্রতি ফরজের পর আয়াতুল কুরসী (পরবর্তী পর্যন্ত রক্ষা), সকাল-সন্ধ্যায় সূরা ইখলাস+ফালাক+নাস তিনবার।',
    ref: '33:41-42, 3:191',
  },
  { emoji: '🕋',
    titleEn: '\'Umrah (Lesser Pilgrimage)', titleBn: 'উমরা',
    descEn: 'Voluntary pilgrimage that can be performed any time of year (Ḥanafī/Mālikī: strong sunnah; Shāfiʿī/Ḥanbalī: obligatory once). "\'Umrah in Ramadan equals a Hajj." (Bukhari)',
    descBn: 'বছরের যেকোনো সময় করা যায় (হানাফি/মালিকী: প্রবল সুন্নাত; শাফিয়ী/হাম্বলী: জীবনে একবার ওয়াজিব)। "রমজানের উমরা হজের সমান।" (বুখারি)',
    ref: 'Bukhari 1782',
  },
  { emoji: '💚',
    titleEn: 'Ṣadaqah (Voluntary Charity)', titleBn: 'সদকা',
    descEn: 'Beyond zakat — any spending in Allah\'s path. Best given secretly (2:271). "Charity does not decrease wealth." (Muslim) Even a smile is charity.',
    descBn: 'যাকাতের বাইরে — আল্লাহর পথে যেকোনো ব্যয়। গোপনে দেওয়া উত্তম (২:২৭১)। "সদকা সম্পদ কমায় না।" (মুসলিম) হাসিও সদকা।',
    ref: '2:261-274, 57:18',
  },
  { emoji: '📖',
    titleEn: 'Reciting the Quran', titleBn: 'কুরআন তিলাওয়াত',
    descEn: '"Whoever reads a letter from the Book of Allah, he will have a good deed multiplied by ten." (Tirmidhi) Recite daily even if a page — the Prophet ﷺ used to recite one juz\' per day.',
    descBn: '"যে আল্লাহর কিতাব থেকে একটি হরফ পড়বে, তার একটি নেকী হবে যা দশগুণ করা হবে।" (তিরমিযি) প্রতিদিন এক পাতা হলেও তিলাওয়াত করুন — নবী ﷺ প্রতিদিন এক পারা তিলাওয়াত করতেন।',
    ref: '35:29-30, 17:78',
  },
  { emoji: '🚶',
    titleEn: 'Ṣalāt al-Ishrāq & Ṣalāt at-Tawbah', titleBn: 'ইশরাক ও তাওবার নামাজ',
    descEn: 'Ishrāq: 2 rak\'ahs after sunrise for one who stayed for Fajr dhikr — reward of Hajj + Umrah. Tawbah: 2 rak\'ahs of repentance after any sin, seeking Allah\'s forgiveness.',
    descBn: 'ইশরাক: ফজরের পর যিকিরে বসে সূর্যোদয়ের পর ২ রাকাত — সওয়াব হজ + উমরার সমান। তাওবা: যেকোনো পাপের পর ২ রাকাত তাওবার নামাজ ও আল্লাহর কাছে ক্ষমা প্রার্থনা।',
    ref: 'Tirmidhi 586, Abu Dawud 1521',
  },
  { emoji: '🤝',
    titleEn: 'Silat ar-Raḥim (Kinship Ties)', titleBn: 'সিলাতুর রাহিম (আত্মীয়তা রক্ষা)',
    descEn: 'Visiting relatives, staying in touch, helping them — one of the most beloved deeds. "Whoever wishes for his provisions to be increased and his lifespan extended, let him maintain ties of kinship." (Bukhari)',
    descBn: 'আত্মীয়দের সাথে দেখা, যোগাযোগ, সাহায্য — সর্বাধিক প্রিয় আমলগুলোর একটি। "যে চায় তার রিযিক বৃদ্ধি পাক ও আয়ু দীর্ঘ হোক, সে যেন আত্মীয়তা রক্ষা করে।" (বুখারি)',
    ref: '4:1, 13:21',
  },
  { emoji: '🌱',
    titleEn: 'ʿIlm (Beneficial Knowledge)', titleBn: 'উপকারী ইলম',
    descEn: 'Studying Islam beyond obligations, teaching others — sadaqah jāriyah (ongoing charity). "The best of you is he who learns the Quran and teaches it." (Bukhari)',
    descBn: 'ফরজের বাইরে ইসলাম অধ্যয়ন, অপরকে শেখানো — সদকায়ে জারিয়া। "তোমাদের মধ্যে সেই উত্তম যে কুরআন শেখে ও শেখায়।" (বুখারি)',
    ref: '20:114, 39:9',
  },
  { emoji: '🌸',
    titleEn: 'Duʿā (Personal Supplication)', titleBn: 'দোয়া',
    descEn: 'Beyond the fixed du\'as — asking Allah for anything, anytime, in your own language. "Du\'a is the essence of worship." (Tirmidhi) Best times: last third of night, between adhan & iqamah, during sujud, before iftar.',
    descBn: 'নির্ধারিত দোয়ার বাইরে — যেকোনো সময় নিজের ভাষায় আল্লাহর কাছে চাওয়া। "দোয়াই ইবাদতের মূল।" (তিরমিযি) সর্বোত্তম সময়: রাতের শেষ তৃতীয়াংশ, আজান-ইকামতের মাঝে, সিজদায়, ইফতারের আগে।',
    ref: '40:60, 2:186',
  },
  { emoji: '🌛',
    titleEn: 'Ṣalāt al-Witr', titleBn: 'সালাতুল বিতর',
    descEn: 'Odd-numbered prayer (1, 3, 5…) sealing the night prayers, prayed between Isha and Fajr. Wājib per the Ḥanafī school, sunnah muʾakkadah per the others. "Make the last of your night prayer witr." (Bukhari 998, Muslim 749) "Allah is Witr (One) and loves the witr." (Tirmidhi 453)',
    descBn: 'বিজোড় রাকাত (১, ৩, ৫…) যা রাতের নামাজের সমাপ্তি টানে, ইশা ও ফজরের মাঝে পড়া হয়। হানাফি মাযহাবে ওয়াজিব, অন্যদের মতে সুন্নাতে মুয়াক্কাদা। "তোমাদের রাতের নামাজের শেষটি বিতর কর।" (বুখারি ৯৯৮, মুসলিম ৭৪৯) "আল্লাহ বিতর (এক) এবং তিনি বিতর ভালোবাসেন।" (তিরমিযি ৪৫৩)',
    ref: 'Bukhari 998, Muslim 749',
  },
  { emoji: '🧭',
    titleEn: 'Ṣalāt al-Istikhārah (Prayer of Guidance)', titleBn: 'সালাতুল ইস্তিখারা (পরামর্শ প্রার্থনার নামাজ)',
    descEn: '2 rak\'ahs then the istikhārah du\'a when deciding on a permissible matter — asking Allah to choose the better outcome. The Prophet ﷺ taught it as he taught a chapter of the Quran. (Bukhari 1162) Not for choosing between ḥalāl and ḥarām.',
    descBn: 'কোনো বৈধ বিষয়ে সিদ্ধান্ত নেওয়ার সময় ২ রাকাত পড়ে ইস্তিখারার দোয়া — আল্লাহর কাছে উত্তম পরিণাম বেছে দেওয়ার প্রার্থনা। নবী ﷺ এটি কুরআনের সূরার মতো করে শেখাতেন। (বুখারি ১১৬২) হালাল-হারামের মাঝে বাছাইয়ের জন্য নয়।',
    ref: 'Bukhari 1162',
  },
  { emoji: '🚪',
    titleEn: 'Taḥiyyat al-Masjid (Greeting the Mosque)', titleBn: 'তাহিয়্যাতুল মাসজিদ (মসজিদের সালাম)',
    descEn: '2 rak\'ahs on entering a mosque before sitting down, honouring the house of Allah. "When one of you enters the mosque, let him not sit until he prays two rak\'ahs." (Bukhari 444, Muslim 714)',
    descBn: 'মসজিদে প্রবেশ করে বসার আগে ২ রাকাত, আল্লাহর ঘরের প্রতি সম্মান। "তোমাদের কেউ মসজিদে প্রবেশ করলে দুই রাকাত না পড়ে যেন না বসে।" (বুখারি ৪৪৪, মুসলিম ৭১৪)',
    ref: 'Bukhari 444, Muslim 714',
  },
  { emoji: '🕯️',
    titleEn: 'Tarāwīḥ (Qiyām Ramaḍān)', titleBn: 'তারাবিহ (কিয়ামু রমজান)',
    descEn: 'Night prayer in congregation throughout Ramadan, a sunnah muʾakkadah. "Whoever stands (in prayer) in Ramadan out of faith and seeking reward, his previous sins are forgiven." (Bukhari 37, Muslim 759) ʿUmar RA revived it in congregation.',
    descBn: 'রমজানজুড়ে জামাতে রাতের নামাজ, সুন্নাতে মুয়াক্কাদা। "যে ঈমান ও সওয়াবের আশায় রমজানে (নামাজে) দাঁড়ায়, তার পূর্বের গুনাহ মাফ করা হয়।" (বুখারি ৩৭, মুসলিম ৭৫৯) উমর রাঃ এটি জামাতে পুনঃপ্রবর্তন করেন।',
    ref: 'Bukhari 37, Muslim 759',
  },
  { emoji: '📜',
    titleEn: 'Reciting Sūrah al-Kahf on Friday', titleBn: 'জুমার দিনে সূরা কাহফ তিলাওয়াত',
    descEn: 'Reading Sūrah al-Kahf (18) on Friday (from Thursday sunset to Friday sunset). "Whoever reads Sūrah al-Kahf on the day of Jumuʿah, a light will shine for him between the two Fridays." (al-Ḥākim; authenticated by al-Albānī)',
    descBn: 'জুমার দিনে (বৃহস্পতিবার সূর্যাস্ত থেকে শুক্রবার সূর্যাস্ত পর্যন্ত) সূরা কাহফ (১৮) পড়া। "যে জুমার দিনে সূরা কাহফ পড়ে, তার জন্য দুই জুমার মাঝে একটি নূর উজ্জ্বল হয়।" (হাকিম; আলবানি কর্তৃক সহিহ সাব্যস্ত)',
    ref: '18:1-10',
  },
  { emoji: '🏠',
    titleEn: 'Iʿtikāf (Spiritual Retreat)', titleBn: 'ইতিকাফ (আধ্যাত্মিক নির্জনবাস)',
    descEn: 'Secluding oneself in the mosque for worship, especially the last ten nights of Ramadan seeking Laylat al-Qadr. "The Prophet ﷺ used to observe iʿtikāf in the last ten days of Ramadan until Allah took him." (Bukhari 2025, Muslim 1172)',
    descBn: 'ইবাদতের জন্য মসজিদে নিজেকে নিবদ্ধ রাখা, বিশেষত রমজানের শেষ দশ রাতে লাইলাতুল কদরের অন্বেষণে। "নবী ﷺ রমজানের শেষ দশ দিন ইতিকাফ করতেন, যতক্ষণ না আল্লাহ তাঁকে তুলে নেন।" (বুখারি ২০২৫, মুসলিম ১১৭২)',
    ref: '2:187',
  },
  { emoji: '🌹',
    titleEn: 'Ṣalawāt upon the Prophet ﷺ', titleBn: 'নবী ﷺ-এর প্রতি দরুদ',
    descEn: 'Sending blessings on the Prophet ﷺ — an act Allah Himself performs (33:56). "Whoever sends one blessing upon me, Allah sends ten blessings upon him." (Muslim 408) Increase it especially on Fridays.',
    descBn: 'নবী ﷺ-এর প্রতি দরুদ পাঠ — যা স্বয়ং আল্লাহও করেন (৩৩:৫৬)। "যে আমার প্রতি একবার দরুদ পাঠায়, আল্লাহ তার প্রতি দশবার রহমত পাঠান।" (মুসলিম ৪০৮) বিশেষত জুমাবারে বেশি পড়ুন।',
    ref: '33:56',
  },
  { emoji: '💧',
    titleEn: 'Two Rak\'ahs after Wuḍūʾ', titleBn: 'অজুর পর দুই রাকাত',
    descEn: 'Praying 2 rak\'ahs with full presence of heart after performing wuḍūʾ. The Prophet ﷺ told Bilāl RA he heard his footsteps in Paradise because of this practice. (Bukhari 1149, Muslim 2458)',
    descBn: 'অজু করার পর একাগ্র মনে ২ রাকাত পড়া। নবী ﷺ বিলাল রাঃ-কে বলেছিলেন যে এই আমলের কারণে তিনি জান্নাতে তাঁর পায়ের শব্দ শুনেছেন। (বুখারি ১১৪৯, মুসলিম ২৪৫৮)',
    ref: 'Bukhari 1149, Muslim 2458',
  },
  { emoji: '🤲',
    titleEn: 'Ṣalāt al-Ḥājah (Prayer of Need)', titleBn: 'সালাতুল হাজাত (প্রয়োজনের নামাজ)',
    descEn: '2 rak\'ahs followed by praising Allah, sending ṣalawāt on the Prophet ﷺ, and asking for one\'s need — turning to Allah in times of difficulty. (Tirmidhi 479; scholars note the specific narration is weak, but praying and supplicating in need rests on sound general evidence such as 2:45.)',
    descBn: '২ রাকাত পড়ে আল্লাহর প্রশংসা, নবী ﷺ-এর প্রতি দরুদ ও নিজের প্রয়োজন চাওয়া — কষ্টের সময় আল্লাহর দিকে ফেরা। (তিরমিযি ৪৭৯; আলেমরা উল্লেখ করেন এই নির্দিষ্ট বর্ণনাটি দুর্বল, তবে প্রয়োজনে নামাজ ও দোয়া করা ২:৪৫-এর মতো সহিহ সাধারণ দলিলের উপর প্রতিষ্ঠিত।)',
    ref: '2:45',
  },
  { emoji: '🔢',
    titleEn: 'Ṣalāt al-Tasbīḥ', titleBn: 'সালাতুত তাসবিহ',
    descEn: '4 rak\'ahs in which the tasbīḥ "SubḥānAllāh wal-ḥamdu lillāh wa lā ilāha illā-llāh wa-llāhu akbar" is repeated 75× per rak\'ah (300 total). Reported from Ibn ʿAbbās RA. (Abu Dawud 1297 — its authenticity is debated among scholars; some grade it ḥasan, others weak.)',
    descBn: '৪ রাকাত নামাজ যাতে প্রতি রাকাতে "সুবহানাল্লাহ ওয়াল হামদুলিল্লাহ ওয়া লা ইলাহা ইল্লাল্লাহ ওয়াল্লাহু আকবার" তাসবিহ ৭৫ বার (মোট ৩০০ বার) পড়া হয়। ইবনে আব্বাস রাঃ থেকে বর্ণিত। (আবু দাউদ ১২৯৭ — এর সহিহ হওয়া নিয়ে আলেমদের মতভেদ; কেউ হাসান, কেউ দুর্বল বলেছেন।)',
    ref: 'Abu Dawud 1297',
  },
  { emoji: '🪥',
    titleEn: 'Siwāk (Miswāk)', titleBn: 'মিসওয়াক (সিওয়াক)',
    descEn: 'Cleaning the mouth with the tooth-stick — a purity of the mouth and a cause of Allah\'s pleasure, and a stressed sunnah before wuḍūʾ, prayer, Quran recitation, waking and entering the home. "Were it not that I would burden my Ummah, I would have ordered them to use the siwāk at every prayer." (Bukhari 887, Muslim 252)',
    descBn: 'মিসওয়াক দিয়ে মুখ পরিষ্কার করা — মুখের পবিত্রতা ও আল্লাহর সন্তুষ্টির কারণ, এবং অজু, নামাজ, কুরআন তিলাওয়াত, ঘুম থেকে ওঠা ও ঘরে প্রবেশের আগে প্রবল সুন্নাত। "যদি আমার উম্মতের কষ্ট হওয়ার আশঙ্কা না থাকত, তবে আমি তাদের প্রতি নামাজের সময় মিসওয়াকের নির্দেশ দিতাম।" (বুখারি ৮৮৭, মুসলিম ২৫২)',
    ref: 'Bukhari 887',
  },
  { emoji: '💦',
    titleEn: 'Sunnah Acts of Wuḍūʾ', titleBn: 'অজুর সুন্নাত সমূহ',
    descEn: 'Beyond the four farḍ acts, the recommended (sunnah) acts of wuḍūʾ include: saying Bismillāh, washing the hands to the wrists first, rinsing the mouth (maḍmaḍah) and nose (istinshāq), wiping the ears, beginning with the right, washing each limb three times, and the du\'a after. "Whoever performs wuḍūʾ well, his sins leave his body, even from under his nails." (Muslim 245)',
    descBn: 'চারটি ফরজ ছাড়াও অজুর সুন্নাত আমল: বিসমিল্লাহ বলা, প্রথমে কব্জি পর্যন্ত হাত ধোয়া, কুলি করা (মাদমাদা) ও নাকে পানি দেওয়া (ইস্তিনশাক), কান মাসাহ, ডান দিক থেকে শুরু, প্রতিটি অঙ্গ তিনবার ধোয়া এবং পরে দোয়া পড়া। "যে সুন্দরভাবে অজু করে, তার গুনাহ শরীর থেকে বের হয়ে যায়, এমনকি নখের নিচ থেকেও।" (মুসলিম ২৪৫)',
    ref: '5:6',
  },
  { emoji: '🕰️',
    titleEn: 'Sunnah Ghayr Muʾakkadah (Extra Rawātib)', titleBn: 'সুন্নাতে গায়রে মুয়াক্কাদা (অতিরিক্ত রাওয়াতিব)',
    descEn: 'Optional confirmed-adjacent prayers beyond the 12 rawātib: 4 rak\'ahs before ʿAṣr, 2 (or 4) before Maghrib, and 2 before ʿIshāʾ. "May Allah have mercy on a man who prays four rak\'ahs before ʿAṣr." (Abu Dawud 1271, Tirmidhi 430 — ḥasan) "Pray before Maghrib" — he said it thrice. (Bukhari 1183)',
    descBn: '১২ রাওয়াতিবের অতিরিক্ত ঐচ্ছিক সুন্নাত: আসরের আগে ৪ রাকাত, মাগরিবের আগে ২ (বা ৪), এবং ইশার আগে ২ রাকাত। "আল্লাহ সেই ব্যক্তির প্রতি রহম করুন যে আসরের আগে চার রাকাত পড়ে।" (আবু দাউদ ১২৭১, তিরমিযি ৪৩০ — হাসান) "মাগরিবের আগে নামাজ পড়" — তিনি তিনবার বললেন। (বুখারি ১১৮৩)',
    ref: 'Bukhari 1183',
  },
  { emoji: '🏡',
    titleEn: 'Praying Nawāfil at Home', titleBn: 'ঘরে নফল নামাজ পড়া',
    descEn: 'Performing voluntary prayers at home rather than the mosque brings light and blessing to the household and guards against ostentation. "The best prayer of a person is in his house, except the obligatory prayers." (Bukhari 731, Muslim 781) "Do not make your houses graves." (Muslim 780)',
    descBn: 'মসজিদের বদলে ঘরে নফল নামাজ পড়া ঘরে নূর ও বরকত আনে এবং রিয়া থেকে রক্ষা করে। "মানুষের সর্বোত্তম নামাজ তার ঘরে, ফরজ নামাজ ছাড়া।" (বুখারি ৭৩১, মুসলিম ৭৮১) "তোমাদের ঘরগুলোকে কবরে পরিণত করো না।" (মুসলিম ৭৮০)',
    ref: 'Bukhari 731',
  },
  { emoji: '📣',
    titleEn: 'Responding to the Adhān & Duʿāʾ After It', titleBn: 'আজানের জবাব ও পরবর্তী দোয়া',
    descEn: 'Repeating the words of the muʾadhdhin, then sending ṣalāh on the Prophet ﷺ and reciting the du\'a of the waṣīlah. "Whoever says, when he hears the call: \'O Allah, Lord of this perfect call and established prayer, grant Muhammad the waṣīlah and virtue...\', my intercession will be permitted for him on the Day of Resurrection." (Bukhari 614)',
    descBn: 'মুয়াজ্জিনের শব্দগুলো পুনরাবৃত্তি করা, তারপর নবী ﷺ-এর প্রতি দরুদ ও ওয়াসিলার দোয়া পড়া। "যে আজান শুনে বলে: \'হে আল্লাহ, এই পূর্ণাঙ্গ আহবান ও প্রতিষ্ঠিত নামাজের রব, মুহাম্মদ ﷺ-কে ওয়াসিলা ও ফযিলত দান করুন...\', কিয়ামতের দিন তার জন্য আমার শাফায়াত অবধারিত হবে।" (বুখারি ৬১৪)',
    ref: 'Bukhari 614',
  },
];

const NAFL_QUR = [
  { ref: '17:79', en: '"And from [part of] the night, pray with it as additional [worship] for you; it is expected that your Lord will resurrect you to a praised station."', bn: '"রাতের কিছু অংশে তাহাজ্জুদ নামাজ পড় — এটা তোমার জন্য অতিরিক্ত। আশা করা যায় তোমার রব তোমাকে প্রশংসিত মাকামে উঠাবেন।"' },
  { ref: '3:135', en: '"And those who, when they commit an immorality or wrong themselves, remember Allah and seek forgiveness for their sins — and who can forgive sins except Allah? — and who do not persist in what they have done while they know."', bn: '"যারা কোনো অশ্লীল কাজ করে বা নিজের প্রতি অন্যায় করে, তখন আল্লাহকে স্মরণ করে ও তাদের গুনাহের জন্য ক্ষমা প্রার্থনা করে — আর আল্লাহ ছাড়া কে গুনাহ মাফ করতে পারে? — আর তারা জেনে-শুনে যা করেছে তাতে অটল থাকে না।"' },
  { ref: '2:261', en: '"The example of those who spend their wealth in the way of Allah is like that of a grain which grows seven ears; in every ear there are a hundred grains. And Allah multiplies for whom He wills."', bn: '"যারা আল্লাহর পথে তাদের সম্পদ ব্যয় করে তাদের উদাহরণ একটি বীজের মতো, যা সাতটি শীষ উৎপন্ন করে; প্রতিটি শীষে একশটি দানা। আর আল্লাহ যাকে ইচ্ছা বহুগুণ বৃদ্ধি করেন।"' },
  { ref: '33:41-42', en: '"O you who believe, remember Allah with much remembrance, and exalt Him morning and afternoon."', bn: '"হে ঈমানদারগণ! তোমরা আল্লাহকে অধিক স্মরণ কর, এবং সকাল-বিকাল তাঁর তাসবীহ পাঠ কর।"' },
  { ref: '3:114', en: '"They believe in Allah and the Last Day, and they enjoin what is right and forbid what is wrong and hasten to good deeds. And those are among the righteous."', bn: '"তারা আল্লাহ ও শেষ দিবসে বিশ্বাস স্থাপন করে, ভালো কাজের আদেশ দেয় ও মন্দ থেকে নিষেধ করে এবং কল্যাণকর কাজে ধাবিত হয়। তারাই সৎকর্মশীলদের অন্তর্ভুক্ত।"' },
  { ref: '51:17-18', en: '"They used to sleep but little of the night, and in the hours before dawn they would ask forgiveness."', bn: '"তারা রাতের খুব সামান্যই ঘুমাত এবং ভোরের আগের সময়ে ক্ষমা প্রার্থনা করত।"' },
  { ref: '73:1-4', en: '"O you who wraps himself [in clothing] — arise [to pray] the night, except for a little: half of it or subtract from it a little, or add to it; and recite the Quran with measured recitation."', bn: '"হে বস্ত্রাবৃত! রাতে নামাজে দাঁড়াও — অল্প সময় বাদে — অর্ধেক রাত বা তার চেয়ে কম, অথবা বেশি; এবং কুরআন সুন্দরভাবে তিলাওয়াত কর।"' },
  { ref: '57:18', en: '"Indeed, the men who practice charity and the women who practice it and who have loaned Allah a goodly loan — it will be multiplied for them, and they will have a noble reward."', bn: '"নিশ্চয়ই সদকাকারী পুরুষ ও সদকাকারী নারী এবং যারা আল্লাহকে উত্তম ঋণ দিয়েছে — তাদের জন্য তা বহুগুণ বৃদ্ধি করা হবে এবং তাদের জন্য রয়েছে সম্মানজনক প্রতিদান।"' },
  { ref: '20:130', en: '"So be patient over what they say and exalt [Allah] with praise of your Lord before the rising of the sun and before its setting; and exalt Him during the night and at the ends of the day."', bn: '"সুতরাং তারা যা বলে তাতে ধৈর্য ধর এবং সূর্যোদয়ের আগে ও সূর্যাস্তের আগে তোমার রবের প্রশংসাসহ তাসবিহ পাঠ কর; রাতের বেলাও তাসবিহ পাঠ কর এবং দিনের দুই প্রান্তে।"' },
  { ref: '76:25-26', en: '"And remember the name of your Lord morning and evening. And during the night prostrate to Him and exalt Him a long [part of the] night."', bn: '"তোমার রবের নাম সকাল-সন্ধ্যায় স্মরণ কর। আর রাতের বেলায় তাঁকে সিজদা কর এবং দীর্ঘ রাতব্যাপী তাঁর তাসবিহ পাঠ কর।"' },
  { ref: '35:29-30', en: '"Indeed, those who recite the Book of Allah and establish prayer and spend out of what We have provided them, secretly and publicly, can expect a profit that will never perish."', bn: '"নিশ্চয়ই যারা আল্লাহর কিতাব তিলাওয়াত করে, নামাজ কায়েম রাখে এবং আমি যা দিয়েছি তা থেকে গোপনে ও প্রকাশ্যে ব্যয় করে — তারা এমন ব্যবসার প্রত্যাশা রাখতে পারে যা কখনো ক্ষতিগ্রস্ত হবে না।"' },
  { ref: '32:16', en: '"Their sides part from [their] beds; they call upon their Lord in fear and hope, and out of what We have provided them, they spend."', bn: '"তাদের পার্শ্বদেশ বিছানা থেকে আলাদা হয়ে যায়; তারা ভয় ও আশা নিয়ে তাদের রবকে ডাকে, এবং আমি তাদের যা দিয়েছি তা থেকে ব্যয় করে।"' },
  { ref: '33:56', en: '"Indeed, Allah confers blessing upon the Prophet, and His angels [ask Him to do so]. O you who have believed, ask [Allah to confer] blessing upon him and ask [Allah to grant him] peace."', bn: '"নিশ্চয়ই আল্লাহ নবীর প্রতি রহমত প্রেরণ করেন এবং তাঁর ফেরেশতারাও (তা প্রার্থনা করে)। হে ঈমানদারগণ! তোমরাও তাঁর প্রতি দরুদ পাঠাও এবং যথাযথভাবে সালাম পেশ কর।"' },
];

const NAFL_HADITH = [
  { textEn: '"Whoever prays 12 voluntary rak\'ahs in a day and night, a house will be built for him in Paradise."', textBn: '"যে দিন-রাতে ১২ রাকাত (মুয়াক্কাদা সুন্নাত) নামাজ পড়ে, তার জন্য জান্নাতে একটি ঘর নির্মাণ করা হয়।"', srcEn: 'Muslim 728', srcBn: 'মুসলিম ৭২৮' },
  { textEn: '"My servant continues drawing near to Me with voluntary deeds until I love him. When I love him I become his hearing with which he hears, his sight with which he sees, his hand with which he grasps, and his foot with which he walks."', textBn: '"আমার বান্দা নফল আমলের মাধ্যমে আমার নিকটবর্তী হতে থাকে যতক্ষণ না আমি তাকে ভালোবাসি। যখন আমি তাকে ভালোবাসি, আমি হয়ে যাই তার কান — যা দিয়ে সে শোনে, তার চোখ — যা দিয়ে সে দেখে, তার হাত — যা দিয়ে সে ধরে, তার পা — যা দিয়ে সে চলে।"', srcEn: 'Bukhari 6502', srcBn: 'বুখারি ৬৫০২' },
  { textEn: '"The best of deeds are those that are consistent, even if small."', textBn: '"সর্বোত্তম আমল সেটি যা নিয়মিত, যদিও তা ছোট হয়।"', srcEn: 'Bukhari 6464, Muslim 782', srcBn: 'বুখারি ৬৪৬৪, মুসলিম ৭৮২' },
  { textEn: '"Two rak\'ahs of the Fajr (sunnah prayer) are better than the world and all that it contains."', textBn: '"ফজরের দুই রাকাত (সুন্নাত) দুনিয়া ও তার মধ্যে যা কিছু আছে তার চেয়ে উত্তম।"', srcEn: 'Muslim 725', srcBn: 'মুসলিম ৭২৫' },
  { textEn: '"Whoever fasts Ramadan then follows it with six days of Shawwal, it is as if he has fasted the entire year."', textBn: '"যে রমজান রোজা রাখল, তারপর শাওয়ালের ছয় দিন রোজা রাখল — সে যেন পুরো বছর রোজা রাখল।"', srcEn: 'Muslim 1164', srcBn: 'মুসলিম ১১৬৪' },
  { textEn: '"The best fasting after Ramadan is fasting in Allah\'s sacred month of Muharram."', textBn: '"রমজানের পর সর্বোত্তম রোজা হলো আল্লাহর পবিত্র মাস মহররমের রোজা।"', srcEn: 'Muslim 1163', srcBn: 'মুসলিম ১১৬৩' },
  { textEn: '"In the morning, ṣadaqah is due on behalf of every bone (joint) of the body of each of you. Every tasbīḥ is a ṣadaqah, every taḥmīd is a ṣadaqah… and two rak\'ahs of Ḍuḥā suffice for all of that."', textBn: '"প্রতি সকালে তোমাদের শরীরের প্রতিটি জোড়ার পক্ষ থেকে সদকা করতে হয়। প্রতিটি তাসবিহ সদকা, প্রতিটি তাহমিদ সদকা… এবং দুই রাকাত দুহার নামাজ এ সবের পক্ষ থেকে যথেষ্ট।"', srcEn: 'Muslim 720', srcBn: 'মুসলিম ৭২০' },
  { textEn: '"Sadaqah does not decrease wealth, and Allah increases the honour of one who pardons, and no one humbles himself before Allah except that Allah raises him."', textBn: '"সদকা সম্পদ কমায় না; ক্ষমাকারীর মর্যাদা আল্লাহ বাড়িয়ে দেন; আর যে আল্লাহর জন্য বিনয়ী হয় আল্লাহ তাকে উন্নত করেন।"', srcEn: 'Muslim 2588', srcBn: 'মুসলিম ২৫৮৮' },
  { textEn: '"\'Umrah during Ramadan is equivalent to (the reward of) Ḥajj — or Ḥajj with me."', textBn: '"রমজানে উমরা হজের সমতুল্য — অথবা আমার সাথে হজের সমতুল্য।"', srcEn: 'Bukhari 1782, Muslim 1256', srcBn: 'বুখারি ১৭৮২, মুসলিম ১২৫৬' },
  { textEn: '"Whoever reads a letter from the Book of Allah will have a ḥasanah (good deed) for it, and the ḥasanah is multiplied by ten."', textBn: '"যে আল্লাহর কিতাব থেকে একটি হরফ পড়বে তার একটি নেকি হবে এবং সেই নেকি দশগুণ করা হবে।"', srcEn: 'Tirmidhi 2910 — sahih', srcBn: 'তিরমিযি ২৯১০ — সহিহ' },
  { textEn: '"Whoever sends a single blessing (ṣalāh) upon me, Allah will send ten blessings upon him, erase ten of his sins, and raise him ten degrees."', textBn: '"যে আমার প্রতি একবার দরুদ পাঠায়, আল্লাহ তার প্রতি দশবার রহমত পাঠান, তার দশটি গুনাহ মুছে দেন এবং তাকে দশ মর্যাদায় উন্নীত করেন।"', srcEn: 'al-Nasāʾī 1297 — sahih', srcBn: 'নাসাই ১২৯৭ — সহিহ' },
  { textEn: '"The Prophet ﷺ used to teach us the istikhārah for all matters as he would teach us a chapter of the Quran, saying: When one of you intends to do something, let him pray two rak\'ahs other than the obligatory prayer, then say the du\'a."', textBn: '"নবী ﷺ আমাদের সকল বিষয়ে ইস্তিখারা শেখাতেন যেমন কুরআনের সূরা শেখাতেন, বলতেন: তোমাদের কেউ কোনো কাজের ইচ্ছা করলে সে যেন ফরজ ছাড়া দুই রাকাত পড়ে, তারপর এই দোয়া পড়ে।"', srcEn: 'Bukhari 1162', srcBn: 'বুখারি ১১৬২' },
  { textEn: '"Whoever stands (in night prayer) during Ramadan out of faith and seeking reward, his previous sins will be forgiven."', textBn: '"যে ব্যক্তি ঈমান ও সওয়াবের আশায় রমজানে (রাতের নামাজে) দাঁড়ায়, তার পূর্বের গুনাহ মাফ করে দেওয়া হয়।"', srcEn: 'Bukhari 37, Muslim 759', srcBn: 'বুখারি ৩৭, মুসলিম ৭৫৯' },
];

class NaflModule {
  constructor() {
    this.root = document.getElementById('nafl-container');
    if (!this.root) return;
    this.language = (typeof appSettings !== 'undefined' && appSettings) ? appSettings.get('language') : 'en';
    this.rendered = false;
    window.addEventListener('tabChanged', (e) => { try { if (e && e.detail && e.detail.tabId === 'nafl') this.render(); } catch (_) {} });
    window.addEventListener('settingChanged', (e) => {
      try { if (e && e.detail && e.detail.key === 'language') { this.language = e.detail.value || 'en'; if (this.rendered) this.render(); } } catch (_) {}
    });
    this.root.addEventListener('click', (e) => this.handleClick(e));
  }
  tt(key) {
    const fb = NAFL_I18N[key];
    if (fb) {
      if (this.language && fb[this.language]) return fb[this.language];
      if (this.language === 'bn') return fb.bn || fb.en;
      if (this.language && this.language !== 'en' && typeof CI18N !== 'undefined') { const tr = CI18N.tr(this.language, fb.en); if (tr) return tr; }
      return fb.en;
    }
    return (typeof t === 'function') ? t(key, this.language) : key;
  }
  lc(o) {
    if (!o) return '';
    const lang = this.language;
    if (lang && o[lang]) return o[lang];
    if (lang === 'bn') return o.bn || o.en || '';
    if (lang && lang !== 'en' && typeof CI18N !== 'undefined' && o.en) { const tr = CI18N.tr(lang, o.en); if (tr) return tr; }
    return o.en || o.bn || '';
  }
  esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
  render() {
    this.rendered = true;
    const L = (o) => this.esc(this.lc(o));
    this.root.innerHTML = `
      <div class="max-w-3xl mx-auto space-y-6 py-4">
        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div class="p-6 bg-gradient-to-br from-amber-50 to-transparent dark:from-amber-900/10">
            <div class="text-4xl mb-2" aria-hidden="true">✨</div>
            <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100">${this.esc(this.tt('islam_nafl_title'))}</h2>
            <p class="text-gray-500 dark:text-gray-400 mt-2 text-sm leading-relaxed" dir="auto">${this.esc(this.tt('islam_nafl_subtitle'))}</p>
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">🌟 ${L({ en: 'Categories of Nafl Acts', bn: 'নফল আমলের প্রকারভেদ' })}</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            ${NAFL_ITEMS.map(n => `
              <div class="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/40">
                <div class="text-sm font-semibold text-amber-800 dark:text-amber-200"><span aria-hidden="true">${n.emoji}</span> ${L({ en: n.titleEn, bn: n.titleBn })}</div>
                <p class="text-xs text-amber-700 dark:text-amber-300 mt-1 leading-relaxed" dir="auto">${L({ en: n.descEn, bn: n.descBn })}</p>
                <button type="button" data-nafl-ayah="${this.esc(n.ref.split(',')[0].trim())}" class="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-300 text-[0.65rem] font-medium hover:bg-amber-500 hover:text-white transition-colors">📖 ${this.esc(n.ref)}</button>
              </div>`).join('')}
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">💬 ${L({ en: 'Hadith on Nawāfil', bn: 'নফল সম্পর্কে হাদিস' })}</h3>
          <div class="space-y-3">
            ${NAFL_HADITH.map(h => `
              <div class="p-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/40">
                <p class="text-sm text-green-800 dark:text-green-200 leading-relaxed" dir="auto">${L({ en: h.textEn, bn: h.textBn })}</p>
                <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">— ${L({ en: h.srcEn, bn: h.srcBn })}</p>
              </div>`).join('')}
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">📖 ${L({ en: 'Quranic References on Nafl', bn: 'নফল সম্পর্কে কুরআনি রেফারেন্স' })}</h3>
          <div class="space-y-3">
            ${NAFL_QUR.map(q => `
              <div class="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/40">
                <p class="text-sm text-amber-800 dark:text-amber-200 leading-relaxed" dir="auto">${L({ en: q.en, bn: q.bn })}</p>
                <button type="button" data-nafl-ayah="${this.esc(q.ref)}" class="mt-2 inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs font-medium hover:bg-amber-500 hover:text-white transition-colors">📖 ${this.esc(q.ref)} ${L({ en: 'Read', bn: 'পড়ুন' })}</button>
              </div>`).join('')}
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-amber-200 dark:border-amber-900/40 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-1 flex items-center gap-2">🌱 ${L({ en: 'Building Consistency — A Starter Routine', bn: 'ধারাবাহিকতা গড়া — একটি সূচনা রুটিন' })}</h3>
          <p class="text-xs text-gray-500 dark:text-gray-400 mb-3 leading-relaxed" dir="auto">${L({ en: '"The most beloved deed to Allah is the most regular and constant, even if it were little." (Bukhari 6464) Start with these five anchors and grow gradually.', bn: '"আল্লাহর কাছে সর্বাধিক প্রিয় আমল সেটি যা নিয়মিত, যদিও তা অল্প।" (বুখারি ৬৪৬৪) এই পাঁচটি ভিত্তি দিয়ে শুরু করুন এবং ধীরে ধীরে বাড়ান।' })}</p>
          <div class="space-y-3">
            ${[
              {
                emoji: '🌙',
                time: { en: 'Night — minimum 2 rak\'ahs Tahajjud', bn: 'রাতে — ন্যূনতম ২ রাকাত তাহাজ্জুদ' },
                acts: { en: 'Set an alarm 15 min before Fajr adhan. Pray 2 rak\'ahs, make du\'a. "The Lord descends to the lowest heaven in the last third of the night." (Bukhari 1145) Also recite Surah al-Mulk (67) before sleep — it intercedes on the Day of Judgment (Tirmidhi 2891).', bn: 'ফজরের আজানের ১৫ মিনিট আগে অ্যালার্ম দিন। ২ রাকাত পড়ুন, দোয়া করুন। "রাতের শেষ তৃতীয়াংশে রব নিকটবর্তী আসমানে অবতরণ করেন।" (বুখারি ১১৪৫) ঘুমানোর আগে সূরা মুলকও পড়ুন — কিয়ামতে এটি শাফায়াত করবে (তিরমিযি ২৮৯১)।' }
              },
              {
                emoji: '🌅',
                time: { en: 'Morning — adhkār + 2 rak\'ahs Ishrāq', bn: 'সকালে — আজকার + ২ রাকাত ইশরাক' },
                acts: { en: 'After Fajr, remain seated for morning adhkār (10 min) — Ayat al-Kursi, Surahs al-Ikhlāṣ + al-Falaq + al-Nās × 3. Then after sunrise pray 2 rak\'ahs Ishrāq — reward equals a complete Hajj + \'Umrah (Tirmidhi 586).', bn: 'ফজরের পর সকালের আজকারের জন্য বসুন (১০ মিনিট) — আয়াতুল কুরসী, সূরা ইখলাস + ফালাক + নাস তিনবার। তারপর সূর্যোদয়ের পরে ২ রাকাত ইশরাক পড়ুন — সওয়াব পূর্ণ হজ + উমরার সমান (তিরমিযি ৫৮৬)।' }
              },
              {
                emoji: '🤲',
                time: { en: 'After every fard — 1 dhikr set', bn: 'প্রতি ফরজের পরে — ১টি যিকির সেট' },
                acts: { en: '33× SubḥānAllāh + 33× Alḥamdulillāh + 34× Allāhu Akbar, then Āyat al-Kursī. This takes under 2 minutes and protects until the next prayer. "Whoever recites Āyat al-Kursī after every obligatory prayer, nothing stands between him and Paradise except death." (al-Nasāʾī, authenticated by al-Albānī)', bn: '৩৩ বার সুবহানআল্লাহ + ৩৩ বার আলহামদুলিল্লাহ + ৩৪ বার আল্লাহু আকবার, তারপর আয়াতুল কুরসী। এতে ২ মিনিটেরও কম লাগে এবং পরবর্তী নামাজ পর্যন্ত সুরক্ষা দেয়। "যে প্রতি ফরজের পরে আয়াতুল কুরসী পড়ে, মৃত্যু ছাড়া জান্নাতের মাঝে আর কিছু নেই।" (নাসাই, আলবানি কর্তৃক সহিহ সাব্যস্ত)' }
              },
              {
                emoji: '💚',
                time: { en: 'Daily sadaqah — any form', bn: 'প্রতিদিন সদকা — যেকোনো রূপে' },
                acts: { en: '"Sadaqah does not decrease wealth." (Muslim 2588) Even a smile counts (Bukhari 6126). Options: give food, help a neighbour, remove something harmful from a path, share useful knowledge, make du\'a for a fellow Muslim — all are sadaqah that compound silently.', bn: '"সদকা সম্পদ কমায় না।" (মুসলিম ২৫৮৮) হাসিও গণ্য হয় (বুখারি ৬১২৬)। বিকল্প: খাবার দেওয়া, প্রতিবেশীকে সাহায্য, পথের কষ্টদায়ক কিছু সরানো, উপকারী ইলম শেয়ার, কোনো মুসলিমের জন্য দোয়া — সবই নীরবে জমতে থাকা সদকা।' }
              },
              {
                emoji: '📖',
                time: { en: 'Daily Quran — minimum 1 page', bn: 'প্রতিদিন কুরআন — ন্যূনতম ১ পাতা' },
                acts: { en: '"Whoever reads a letter from the Book of Allah gets one good deed multiplied by ten." (Tirmidhi 2910) One page (~15 lines) is the minimum target; one juz\' (para) is the classical daily standard. Use recitation with tajwīd even if slow — quality over speed.', bn: '"যে আল্লাহর কিতাব থেকে একটি হরফ পড়বে তার একটি নেকি হবে যা দশগুণ।" (তিরমিযি ২৯১০) এক পাতা (~১৫ লাইন) ন্যূনতম লক্ষ্য; এক পারা ক্লাসিক্যাল দৈনিক মান। তাজবিদসহ পড়ুন যদিও ধীরে — গতির চেয়ে মান গুরুত্বপূর্ণ।' }
              },
            ].map(s => `
              <div class="flex gap-3 p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/40">
                <span class="text-2xl shrink-0 mt-0.5" aria-hidden="true">${s.emoji}</span>
                <div class="min-w-0">
                  <div class="text-xs font-bold text-amber-700 dark:text-amber-300 mb-1" dir="auto">${L(s.time)}</div>
                  <p class="text-xs text-amber-800 dark:text-amber-200 leading-relaxed" dir="auto">${L(s.acts)}</p>
                </div>
              </div>`).join('')}
          </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">🧠 ${L({ en: 'Self-check', bn: 'নিজেই যাচাই' })}</h3>
          <div class="space-y-2">
            ${[
              { q: { en: 'Are nafl acts required?', bn: 'নফল আমল কি আবশ্যক?' }, a: { en: 'No — they are voluntary. However, they compensate for deficiencies in fard acts on the Day of Judgment and are the means of gaining Allah\'s love (Bukhari 6502).', bn: 'না — এগুলো ঐচ্ছিক। তবে কিয়ামতের দিন ফরজের ত্রুটি এগুলো দিয়ে পূরণ হয় এবং এগুলোই আল্লাহর ভালোবাসা লাভের মাধ্যম (বুখারি ৬৫০২)।' } },
              { q: { en: 'What are the 12 sunnah rawātib?', bn: '১২ রাকাত সুন্নাতে রাওয়াতিব কী কী?' }, a: { en: '2 before Fajr, 4 before + 2 after Dhuhr, 2 after Maghrib, 2 after Isha. Whoever prays them daily gets a house in Paradise (Muslim 728).', bn: 'ফজরের আগে ২, যোহরের আগে ৪ + পরে ২, মাগরিবের পরে ২, ইশার পরে ২। যে প্রতিদিন পড়ে তার জন্য জান্নাতে একটি ঘর (মুসলিম ৭২৮)।' } },
              { q: { en: 'Best time for Tahajjud?', bn: 'তাহাজ্জুদের সর্বোত্তম সময়?' }, a: { en: 'The last third of the night — when Allah descends to the lowest heaven asking, "Who is calling upon Me so I may answer him?" (Bukhari 1145, Muslim 758)', bn: 'রাতের শেষ তৃতীয়াংশ — যখন আল্লাহ নিকটবর্তী আসমানে অবতরণ করে বলেন, "কে আমাকে ডাকছে যাতে আমি সাড়া দিই?" (বুখারি ১১৪৫, মুসলিম ৭৫৮)' } },
              { q: { en: 'Is Ḍuḥā prayer the same as Ishrāq?', bn: 'দুহা ও ইশরাক কি একই?' }, a: { en: 'Ishrāq is the earliest form of Ḍuḥā — 2 rak\'ahs right after sunrise (for one who stayed in dhikr after Fajr). Ḍuḥā proper is later, from mid-morning until 15 min before Dhuhr, up to 12 rak\'ahs.', bn: 'ইশরাক দুহার সবচেয়ে আগের রূপ — সূর্যোদয়ের পরপরই ২ রাকাত (ফজরের পর যিকিরে বসে থাকা ব্যক্তির জন্য)। মূল দুহা পরে, সকাল-দুপুরের মাঝামাঝি থেকে যোহরের ১৫ মিনিট আগ পর্যন্ত ১২ রাকাত পর্যন্ত।' } },
              { q: { en: 'Which small deed is emphasized more: quantity or consistency?', bn: 'ছোট আমলে কী বেশি গুরুত্বপূর্ণ: পরিমাণ না নিয়মিত?' }, a: { en: 'Consistency. "The most beloved deed to Allah is the one done consistently, even if small." (Bukhari 6464, Muslim 782) A small daily habit outweighs occasional bursts.', bn: 'নিয়মিত। "আল্লাহর কাছে সর্বাধিক প্রিয় সেই আমল যা নিয়মিত, যদিও তা ছোট।" (বুখারি ৬৪৬৪, মুসলিম ৭৮২) ছোট প্রতিদিনের অভ্যাস মাঝেমধ্যে বড় প্রচেষ্টার চেয়ে উত্তম।' } },
              { q: { en: 'What are the "White Days" (Ayyām al-Bīḍ) and why are they recommended?', bn: '"আইয়্যামে বীজ" কী এবং কেন এগুলোতে রোজা রাখার সুপারিশ?' }, a: { en: 'The 13th, 14th and 15th of every lunar month, when the full moon is bright. "O Abu Dharr, if you fast three days a month, fast the 13th, 14th and 15th." (Nasāʾī 2424, Tirmidhi 761) Fasting these three days equals fasting the whole month.', bn: 'প্রতি চান্দ্র মাসের ১৩, ১৪ ও ১৫ তারিখ, যখন পূর্ণিমার চাঁদ উজ্জ্বল। "হে আবু যার, যদি তুমি প্রতি মাসে তিন দিন রোজা রাখো, ১৩, ১৪ ও ১৫ তারিখে রাখো।" (নাসাই ২৪২৪, তিরমিযি ৭৬১) এই তিন দিন রোজা পুরো মাস রোজার সমতুল্য।' } },
              { q: { en: 'What is the difference between sunnah muʾakkadah and ghayru muʾakkadah?', bn: 'সুন্নাতে মুয়াক্কাদা ও গায়রে মুয়াক্কাদার পার্থক্য কী?' }, a: { en: 'Muʾakkadah (confirmed): acts the Prophet ﷺ performed consistently and rarely omitted (e.g., the 12 daily rak\'ahs, Eid prayer per non-Ḥanafī). Habitual omission is blameworthy. Ghayru muʾakkadah (recommended): practised sometimes — omitting them carries no blame, but they earn additional reward.', bn: 'মুয়াক্কাদা (নিশ্চিত): নবী ﷺ ধারাবাহিকভাবে পালন করেছেন এবং কদাচিৎ ছাড়েছেন (যেমন দৈনিক ১২ রাকাত, হানাফি বাদে অন্যদের মতে ঈদের নামাজ)। অভ্যাসগতভাবে ছাড়া নিন্দনীয়। গায়রে মুয়াক্কাদা: কখনো কখনো পালন করেছেন — ছাড়লে নিন্দা নেই, তবে পড়লে অতিরিক্ত সওয়াব।' } },
              { q: { en: 'Can missed sunnah rawātib prayers be made up?', bn: 'সুন্নাতে রাওয়াতিব ছুটে গেলে কি কাযা পড়া যায়?' }, a: { en: 'Yes — specifically, the 2 rak\'ahs of Fajr sunnah can be made up after Fajr or mid-morning if missed (Abu Dawud 1267, Tirmidhi 423). For other rawātib, making them up is permitted though scholars differ on it being recommended versus merely permissible.', bn: 'হ্যাঁ — বিশেষত ফজরের ২ রাকাত সুন্নাত ফজরের পরে বা চাশতের সময় কাযা পড়া যায় (আবু দাউদ ১২৬৭, তিরমিযি ৪২৩)। অন্য রাওয়াতিবের কাযা জায়েয, যদিও আলেমরা এটি মুস্তাহাব না শুধু জায়েয সে বিষয়ে মতভেদ করেন।' } },
              { q: { en: 'What is the ruling on breaking a voluntary fast intentionally?', bn: 'ইচ্ছাকৃতভাবে নফল রোজা ভাঙার হুকুম কী?' }, a: { en: 'Ḥanafī: making it up (qaḍāʾ) on another day is wājib — you must complete it. Shāfiʿī/Mālikī/Ḥanbalī: making it up is recommended (mustaḥabb), not obligatory. All agree it is better to complete the fast once started, and to ask Allah\'s forgiveness if one breaks it.', bn: 'হানাফি: অন্য দিন কাযা ওয়াজিব — পূরণ করতে হবে। শাফিয়ী/মালিকী/হাম্বলী: কাযা মুস্তাহাব (পছন্দনীয়), ওয়াজিব নয়। সবাই একমত: শুরু করলে রোজা পূরণ করা ভালো এবং ভেঙে ফেললে আল্লাহর কাছে ক্ষমা চাওয়া উচিত।' } },
              { q: { en: 'What times are best for personal du\'a (supplication)?', bn: 'ব্যক্তিগত দোয়ার সর্বোত্তম সময় কী কী?' }, a: { en: '(1) Last third of the night — "Who calls upon Me so I may answer him?" (Bukhari 1145). (2) Between adhān and iqāmah (Tirmidhi 212). (3) During sujūd — "The servant is closest to his Lord in sujūd." (Muslim 482). (4) The hour on Friday between \'Asr and Maghrib (Bukhari 935). (5) After obligatory prayers. (6) Before breakfast (ifṭār) when fasting (Tirmidhi 3499).', bn: '(১) রাতের শেষ তৃতীয়াংশ — "কে আমাকে ডাকছে?" (বুখারি ১১৪৫)। (২) আজান ও ইকামতের মাঝে (তিরমিযি ২১২)। (৩) সিজদায় — "সিজদায় বান্দা রবের সবচেয়ে নিকটে।" (মুসলিম ৪৮২)। (৪) শুক্রবারে আসর ও মাগরিবের মাঝের সময় (বুখারি ৯৩৫)। (৫) ফরজ নামাজের পর। (৬) রোজাদারের ইফতারের আগে (তিরমিযি ৩৪৯৯)।' } },
            ].map(item => `
              <details class="rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/40 overflow-hidden">
                <summary class="flex items-center gap-2 p-3 cursor-pointer list-none hover:bg-amber-100/50 dark:hover:bg-amber-900/30">
                  <span class="text-amber-600 dark:text-amber-400 text-sm">❓</span>
                  <span class="flex-1 text-sm font-medium text-gray-800 dark:text-gray-100" dir="auto">${L(item.q)}</span>
                  <span class="text-amber-500 text-xs">▼</span>
                </summary>
                <div class="px-4 pb-3 pt-1 text-xs text-gray-700 dark:text-gray-200 leading-relaxed border-t border-amber-100 dark:border-amber-900/40" dir="auto">✅ ${L(item.a)}</div>
              </details>`).join('')}
          </div>
        </div>
      </div>`;
  }
  handleClick(e) {
    const ayah = e.target.closest('[data-nafl-ayah]');
    if (ayah) { try { if (typeof ayahModal !== 'undefined' && ayahModal && ayahModal.open) ayahModal.open(ayah.getAttribute('data-nafl-ayah')); } catch (_) {} }
  }
}

let naflModule;
document.addEventListener('DOMContentLoaded', () => { naflModule = new NaflModule(); });
