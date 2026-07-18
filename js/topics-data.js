/**
 * Topics Data Module
 * Pure data: famous Rabbana duas and verses grouped by subject.
 * All display names are localized inline for: en, bn, ar, ur, id, tr, fr.
 * refs use the app's hash range format: "2:201", "3:191-194", or comma-joined lists.
 */

const RABBANA_DUAS = [
  {
    refs: '2:127-128',
    names: {
      en: 'Acceptance of good deeds',
      bn: 'নেক আমল কবুলের দুআ',
      ar: 'تقبل الأعمال الصالحة',
      ur: 'نیک اعمال کی قبولیت',
      id: 'Diterimanya amal saleh',
      tr: 'Salih amellerin kabulü',
      fr: 'Acceptation des bonnes œuvres'
    , zh: '善功的接受', ja: '善行の受入れ'}
  },
  {
    refs: '2:201',
    names: {
      en: 'Good in this world and the next',
      bn: 'দুনিয়া ও আখিরাতের কল্যাণ',
      ar: 'خيري الدنيا والآخرة',
      ur: 'دنیا اور آخرت کی بھلائی',
      id: 'Kebaikan dunia dan akhirat',
      tr: 'Dünya ve ahiret iyiliği',
      fr: "Le bien d'ici-bas et de l'au-delà"
    , zh: '今世与后世的福祉', ja: '現世と来世の善'}
  },
  {
    refs: '2:250',
    names: {
      en: 'Patience and victory',
      bn: 'ধৈর্য ও বিজয়',
      ar: 'الصبر والنصر',
      ur: 'صبر اور فتح',
      id: 'Kesabaran dan kemenangan',
      tr: 'Sabır ve zafer',
      fr: 'Patience et victoire'
    , zh: '忍耐与胜利', ja: '忍耐と勝利'}
  },
  {
    refs: '2:286',
    names: {
      en: 'Do not burden us beyond our capacity',
      bn: 'সাধ্যের অতিরিক্ত বোঝা না দেওয়ার দুআ',
      ar: 'لا تحملنا ما لا طاقة لنا به',
      ur: 'طاقت سے زیادہ بوجھ نہ ڈالنے کی دعا',
      id: 'Jangan bebani kami di luar kemampuan',
      tr: 'Gücümüzün üstünde yük yükleme',
      fr: 'Ne nous charge pas au-delà de nos forces'
    , zh: '不要使我们负担过重', ja: '力を超える負担をかけないでください'}
  },
  {
    refs: '3:8',
    names: {
      en: 'Steadfast hearts',
      bn: 'অন্তরের দৃঢ়তার দুআ',
      ar: 'ثبات القلوب',
      ur: 'دلوں کی ثابت قدمی',
      id: 'Keteguhan hati',
      tr: 'Kalplerin sebatı',
      fr: 'Fermeté des cœurs'
    , zh: '坚定之心', ja: '心の堅固'}
  },
  {
    refs: '3:16',
    names: {
      en: 'Forgiveness and protection from the Fire',
      bn: 'ক্ষমা ও জাহান্নাম থেকে রক্ষা',
      ar: 'المغفرة والوقاية من النار',
      ur: 'مغفرت اور جہنم سے حفاظت',
      id: 'Ampunan dan perlindungan dari neraka',
      tr: 'Bağışlanma ve ateşten korunma',
      fr: 'Pardon et protection contre le Feu'
    , zh: '恕饶与火狱的庇护', ja: '赦しと火獄からの保護'}
  },
  {
    refs: '3:38',
    names: {
      en: 'Righteous offspring',
      bn: 'নেক সন্তানের দুআ',
      ar: 'الذرية الطيبة',
      ur: 'نیک اولاد کی دعا',
      id: 'Keturunan yang saleh',
      tr: 'Hayırlı evlat duası',
      fr: 'Une descendance pieuse'
    , zh: '善良的后代', ja: '敬虔な子孫'}
  },
  {
    refs: '3:147',
    names: {
      en: 'Forgiveness of sins and excesses',
      bn: 'গুনাহ ও সীমালঙ্ঘনের ক্ষমা',
      ar: 'غفران الذنوب والإسراف',
      ur: 'گناہوں اور زیادتیوں کی معافی',
      id: 'Ampunan atas dosa dan kelalaian',
      tr: 'Günahların ve aşırılıkların affı',
      fr: 'Pardon des péchés et des excès'
    , zh: '饶恕罪过和过分', ja: '罪と放埓の赦し'}
  },
  {
    refs: '3:191-194',
    names: {
      en: 'Dua of those who reflect',
      bn: 'চিন্তাশীলদের দুআ',
      ar: 'دعاء أولي الألباب',
      ur: 'اہلِ فکر کی دعا',
      id: 'Doa orang-orang yang berpikir',
      tr: 'Akıl sahiplerinin duası',
      fr: "Invocation des doués d'intelligence"
    , zh: '深思者的祈祷', ja: '思慮深い人々の祈り'}
  },
  {
    refs: '14:40-41',
    names: {
      en: 'Constancy in prayer and forgiveness for parents',
      bn: 'নামাজে অবিচলতা ও পিতামাতার জন্য ক্ষমা',
      ar: 'إقامة الصلاة والمغفرة للوالدين',
      ur: 'نماز کی پابندی اور والدین کی مغفرت',
      id: 'Tetap mendirikan salat dan ampunan bagi orang tua',
      tr: 'Namazda devamlılık ve ana babaya mağfiret',
      fr: 'Constance dans la prière et pardon pour les parents'
    , zh: '坚守拜功与为父母求饶', ja: '礼拝の堅持と両親の赦し'}
  },
  {
    refs: '23:109',
    names: {
      en: 'We believe, so forgive us and have mercy',
      bn: 'আমরা ঈমান এনেছি, আমাদের ক্ষমা করুন',
      ar: 'آمنا فاغفر لنا وارحمنا',
      ur: 'ہم ایمان لائے، ہمیں بخش دے اور رحم فرما',
      id: 'Kami beriman, maka ampunilah kami',
      tr: 'İman ettik, bizi bağışla ve merhamet et',
      fr: 'Nous croyons, pardonne-nous et fais-nous miséricorde'
    , zh: '我们已信道，求你饶恕我们', ja: '私たちは信じました、お赦しください'}
  },
  {
    refs: '25:74',
    names: {
      en: 'Comfort in spouses and children',
      bn: 'স্ত্রী-সন্তানে চোখের শীতলতা',
      ar: 'قرة أعين من الأزواج والذرية',
      ur: 'بیوی بچوں سے آنکھوں کی ٹھنڈک',
      id: 'Penyejuk mata dari pasangan dan keturunan',
      tr: 'Eş ve çocuklardan göz aydınlığı',
      fr: 'Réconfort dans nos épouses et nos enfants'
    , zh: '配偶和子女的欣慰', ja: '配偶者と子孫の慰め'}
  },
  {
    refs: '59:10',
    names: {
      en: 'Forgiveness for us and the believers before us',
      bn: 'আমাদের ও পূর্ববর্তী মুমিনদের ক্ষমা',
      ar: 'المغفرة لنا ولإخواننا الذين سبقونا',
      ur: 'ہماری اور پہلے مومنوں کی مغفرت',
      id: 'Ampunan bagi kami dan saudara seiman terdahulu',
      tr: 'Bize ve bizden önceki müminlere mağfiret',
      fr: 'Pardon pour nous et les croyants qui nous ont précédés'
    , zh: '饶恕我们和前辈的信士', ja: '私たちと先人信者の赦し'}
  },
  {
    refs: '66:8',
    names: {
      en: 'Perfect our light and forgive us',
      bn: 'আমাদের নূর পূর্ণ করুন এবং ক্ষমা করুন',
      ar: 'أتمم لنا نورنا واغفر لنا',
      ur: 'ہمارا نور مکمل فرما اور ہمیں بخش دے',
      id: 'Sempurnakanlah cahaya kami dan ampunilah kami',
      tr: 'Nurumuzu tamamla ve bizi bağışla',
      fr: 'Parachève notre lumière et pardonne-nous'
    , zh: '完善我们的光明并饶恕我们', ja: '私たちの光を完成させ赦してください'}
  }
];

const TOPIC_GROUPS = [
  {
    id: 'patience',
    emoji: '⏳',
    names: {
      en: 'Patience',
      bn: 'ধৈর্য',
      ar: 'الصبر',
      ur: 'صبر',
      id: 'Kesabaran',
      tr: 'Sabır',
      fr: 'Patience'
    , zh: '忍耐', ja: '忍耐'},
    refs: ['2:153', '2:155-157', '3:200', '39:10', '94:5-6']
  },
  {
    id: 'gratitude',
    emoji: '🌻',
    names: {
      en: 'Gratitude',
      bn: 'কৃতজ্ঞতা',
      ar: 'الشكر',
      ur: 'شکر گزاری',
      id: 'Rasa Syukur',
      tr: 'Şükür',
      fr: 'Gratitude'
    , zh: '感恩', ja: '感謝'},
    refs: ['2:152', '14:7', '16:18', '31:12', '55:13']
  },
  {
    id: 'forgiveness',
    emoji: '💚',
    names: {
      en: 'Forgiveness',
      bn: 'ক্ষমা',
      ar: 'المغفرة',
      ur: 'مغفرت',
      id: 'Ampunan',
      tr: 'Bağışlanma',
      fr: 'Pardon'
    , zh: '饶恕', ja: '赦し'},
    refs: ['39:53', '3:135', '4:110', '24:22', '42:25']
  },
  {
    id: 'prayer',
    emoji: '🕌',
    names: {
      en: 'Prayer',
      bn: 'নামাজ',
      ar: 'الصلاة',
      ur: 'نماز',
      id: 'Salat',
      tr: 'Namaz',
      fr: 'Prière'
    , zh: '礼拜', ja: '礼拝'},
    refs: ['2:45', '29:45', '20:14', '17:78', '23:1-2']
  },
  {
    id: 'parents',
    emoji: '👪',
    names: {
      en: 'Parents',
      bn: 'পিতামাতা',
      ar: 'الوالدان',
      ur: 'والدین',
      id: 'Orang Tua',
      tr: 'Anne Baba',
      fr: 'Parents'
    , zh: '父母', ja: '両親'},
    refs: ['17:23-24', '31:14', '46:15', '29:8']
  },
  {
    id: 'knowledge',
    emoji: '📚',
    names: {
      en: 'Knowledge',
      bn: 'জ্ঞান',
      ar: 'العلم',
      ur: 'علم',
      id: 'Ilmu',
      tr: 'İlim',
      fr: 'Savoir'
    , zh: '知识', ja: '知識'},
    refs: ['96:1-5', '20:114', '58:11', '39:9', '35:28']
  },
  {
    id: 'charity',
    emoji: '🤲',
    names: {
      en: 'Charity',
      bn: 'দান-সদকা',
      ar: 'الصدقة',
      ur: 'صدقہ و خیرات',
      id: 'Sedekah',
      tr: 'Sadaka',
      fr: 'Charité'
    , zh: '施舍', ja: '施し'},
    refs: ['2:261', '2:274', '57:18', '3:92', '76:8-9']
  },
  {
    id: 'paradise',
    emoji: '🌴',
    names: {
      en: 'Paradise',
      bn: 'জান্নাত',
      ar: 'الجنة',
      ur: 'جنت',
      id: 'Surga',
      tr: 'Cennet',
      fr: 'Paradis'
    , zh: '天堂', ja: '楽園'},
    refs: ['2:25', '3:133', '13:23-24', '55:46', '76:12-22']
  },
  {
    id: 'justice',
    emoji: '⚖️',
    names: {
      en: 'Justice',
      bn: 'ন্যায়বিচার',
      ar: 'العدل',
      ur: 'انصاف',
      id: 'Keadilan',
      tr: 'Adalet',
      fr: 'Justice'
    , zh: '公正', ja: '正義'},
    refs: ['4:135', '5:8', '16:90', '49:9']
  },
  {
    id: 'creation',
    emoji: '🌌',
    names: {
      en: 'Creation & the Universe',
      bn: 'সৃষ্টি ও মহাবিশ্ব',
      ar: 'الخلق والكون',
      ur: 'تخلیق اور کائنات',
      id: 'Penciptaan dan Alam Semesta',
      tr: 'Yaratılış ve Evren',
      fr: 'Création et Univers'
    , zh: '创造与宇宙', ja: '創造と宇宙'},
    refs: ['21:30', '41:53', '51:47', '67:3-4', '3:190']
  }
];

/**
 * Curated thematic collections surfaced at the top of the Topics browser.
 * Each verse reference below was verified to exist in data/quran-tokens.json,
 * and — for the "Names of…" sets — the named place was confirmed to appear in
 * the verse's Arabic text (data/quran-json). Same schema as TOPIC_GROUPS.
 */
const TOPIC_COLLECTIONS = [
  {
    id: 'tawakkul',
    emoji: '🌿',
    names: {
      en: 'Reliance on Allah',
      bn: 'আল্লাহর ওপর ভরসা',
      ar: 'التوكل على الله',
      ur: 'اللہ پر بھروسہ',
      id: 'Tawakal kepada Allah',
      tr: "Allah'a tevekkül",
      fr: 'Confiance en Allah'
    , zh: '托靠真主', ja: 'アッラーへの信頼'},
    refs: ['3:159', '8:2', '25:58', '65:3', '14:11-12']
  },
  {
    id: 'repentance',
    emoji: '🔄',
    names: {
      en: 'Repentance',
      bn: 'তাওবা',
      ar: 'التوبة',
      ur: 'توبہ',
      id: 'Tobat',
      tr: 'Tevbe',
      fr: 'Repentir'
    , zh: '忏悔', ja: '悔悟'},
    refs: ['2:222', '4:17', '9:104', '24:31', '66:8']
  },
  {
    id: 'dhikr',
    emoji: '📿',
    names: {
      en: 'Remembrance of Allah',
      bn: 'আল্লাহর জিকির',
      ar: 'ذكر الله',
      ur: 'اللہ کا ذکر',
      id: 'Zikir kepada Allah',
      tr: "Allah'ı anmak",
      fr: "Rappel d'Allah"
    , zh: '记念真主', ja: 'アッラーの唱念'},
    refs: ['2:152', '13:28', '33:41-42', '62:10', '8:45']
  },
  {
    id: 'hereafter',
    emoji: '⏳',
    names: {
      en: 'The Hereafter',
      bn: 'আখিরাত',
      ar: 'الآخرة',
      ur: 'آخرت',
      id: 'Akhirat',
      tr: 'Ahiret',
      fr: "L'au-delà"
    , zh: '后世', ja: '来世'},
    refs: ['3:185', '21:35', '50:19', '56:83-87', '62:8']
  },
  {
    id: 'jannah_names',
    emoji: '🌷',
    names: {
      en: 'Names of Paradise',
      bn: 'জান্নাতের নামসমূহ',
      ar: 'أسماء الجنة',
      ur: 'جنت کے نام',
      id: 'Nama-nama Surga',
      tr: 'Cennetin isimleri',
      fr: 'Les noms du Paradis'
    , zh: '天堂的名称', ja: '楽園の名'},
    refs: ['18:107', '9:72', '32:19', '6:127', '56:89']
  },
  {
    id: 'jahannam_names',
    emoji: '🔥',
    names: {
      en: 'Names of the Fire',
      bn: 'জাহান্নামের নামসমূহ',
      ar: 'أسماء النار',
      ur: 'جہنم کے نام',
      id: 'Nama-nama Neraka',
      tr: 'Cehennemin isimleri',
      fr: "Les noms de l'Enfer"
    , zh: '火狱的名称', ja: '火獄の名'},
    refs: ['74:26-27', '70:15', '104:4-5', '101:9', '79:39']
  }
];

/**
 * Famous du'as attributed to the prophets mentioned in the Quran.
 * Each entry cites the exact Quranic locus of the supplication.
 */
const PROPHET_DUAS = [
  {
    refs: '7:23',
    names: {
      en: "Adam's repentance after the fall",
      bn: 'আদম ও হাওয়ার তাওবার দুআ',
      ar: 'دعاء آدم وحواء في التوبة',
      ur: 'آدم اور حوا کی توبہ کی دعا',
      id: 'Doa tobat Adam dan Hawa',
      tr: "Âdem'in tövbe duası",
      fr: "La repentance d'Adam et Ève",
      zh: '亚当和夏娃的悔过祈祷',
      ja: 'アーダムの悔悟の祈り'
    }
  },
  {
    refs: '71:26-28',
    names: {
      en: "Nūḥ's du'a for the believers",
      bn: 'নূহের মুমিনদের জন্য দুআ',
      ar: 'دعاء نوح للمؤمنين',
      ur: 'نوح کی مومنوں کے لیے دعا',
      id: 'Doa Nuh untuk kaum beriman',
      tr: "Nuh'un müminler için duası",
      fr: "La du'a de Noé pour les croyants",
      zh: '努哈为信士的祈祷',
      ja: 'ヌーフの信者のための祈り'
    }
  },
  {
    refs: '23:26',
    names: {
      en: "Nūḥ's plea for help against the deniers",
      bn: 'নূহের অস্বীকারকারীদের বিরুদ্ধে সাহায্যের দুআ',
      ar: 'استنصار نوح ضد المكذبين',
      ur: 'نوح کی منکرین کے خلاف مدد کی دعا',
      id: 'Permohonan Nuh melawan para pendustanya',
      tr: "Nuh'un inkârcılara karşı yardım duası",
      fr: 'Appel de Noé contre les démenteurs',
      zh: '努哈对否认者的求助祈祷',
      ja: 'ヌーフの否定者に対する助けの祈り'
    }
  },
  {
    refs: '26:118',
    names: {
      en: "Nūḥ's prayer for judgment and salvation",
      bn: 'নূহের বিচার ও মুক্তির দুআ',
      ar: 'دعاء نوح بالفصل والنجاة',
      ur: 'نوح کی فیصلے اور نجات کی دعا',
      id: 'Doa Nuh untuk keadilan dan keselamatan',
      tr: "Nuh'un hüküm ve kurtuluş duası",
      fr: 'Prière de Noé pour le jugement et le salut',
      zh: '努哈寻求裁决与拯救的祈祷',
      ja: 'ヌーフの審判と救済の祈り'
    }
  },
  {
    refs: '11:45-47',
    names: {
      en: "Nūḥ seeks refuge from ignorance",
      bn: 'নূহের অজ্ঞতা থেকে আশ্রয়ের দুআ',
      ar: 'استعاذة نوح من الجهل',
      ur: 'نوح کی جہالت سے پناہ کی دعا',
      id: 'Nuh berlindung dari kebodohan',
      tr: "Nuh'un cahillikten sığınma duası",
      fr: "Noé cherche refuge contre l'ignorance",
      zh: '努哈求庇护于无知',
      ja: 'ヌーフの無知からの庇護の祈り'
    }
  },
  {
    refs: '14:35-41',
    names: {
      en: "Ibrāhīm's comprehensive du'a in Makkah",
      bn: 'ইবরাহিমের মক্কায় ব্যাপক দুআ',
      ar: 'دعاء إبراهيم الجامع في مكة',
      ur: 'ابراہیم کی مکہ میں جامع دعا',
      id: "Doa komprehensif Ibrahim di Makkah",
      tr: "İbrahim'in Mekke'deki kapsamlı duası",
      fr: "La du'a globale d'Ibrahim à La Mecque",
      zh: '易卜拉欣在麦加的综合祈祷',
      ja: 'イブラーヒームのマッカでの包括的な祈り'
    }
  },
  {
    refs: '26:83-87',
    names: {
      en: "Ibrāhīm's prayer for wisdom and righteousness",
      bn: 'ইবরাহিমের জ্ঞান ও নেককারদের সাথে যোগ দেওয়ার দুআ',
      ar: 'دعاء إبراهيم بالحكمة والصلاح',
      ur: 'ابراہیم کی حکمت اور نیکوکاروں کی دعا',
      id: 'Doa Ibrahim untuk hikmah dan kebenaran',
      tr: "İbrahim'in hikmet ve sâlihlerle birleşme duası",
      fr: "Prière d'Ibrahim pour la sagesse et la droiture",
      zh: '易卜拉欣为智慧与义人祈祷',
      ja: 'イブラーヒームの知恵と正義の祈り'
    }
  },
  {
    refs: '37:100',
    names: {
      en: "Ibrāhīm's prayer for a righteous child",
      bn: 'ইবরাহিমের নেক সন্তানের দুআ',
      ar: 'دعاء إبراهيم بولد صالح',
      ur: 'ابراہیم کی نیک اولاد کی دعا',
      id: 'Doa Ibrahim meminta keturunan yang saleh',
      tr: "İbrahim'in salih evlat duası",
      fr: "Prière d'Ibrahim pour un enfant vertueux",
      zh: '易卜拉欣为正直子嗣的祈祷',
      ja: 'イブラーヒームの善い子孫のための祈り'
    }
  },
  {
    refs: '60:4-5',
    names: {
      en: "Ibrāhīm's declaration of reliance and protection",
      bn: 'ইবরাহিমের তাওয়াক্কুল ও হেফাজতের দুআ',
      ar: 'تبرؤ إبراهيم وتوكله ودعاؤه بالحماية',
      ur: 'ابراہیم کا توکل اور حفاظت کی دعا',
      id: 'Pernyataan tawakal Ibrahim dan doa perlindungan',
      tr: "İbrahim'in tevekkül ve korunma duası",
      fr: "Déclaration de confiance d'Ibrahim et protection",
      zh: '易卜拉欣的信赖宣言与保护祈祷',
      ja: 'イブラーヒームの信頼宣言と保護の祈り'
    }
  },
  {
    refs: '29:30',
    names: {
      en: "Lūṭ's prayer against those who spread corruption",
      bn: 'লুতের ফাসাদকারীদের বিরুদ্ধে দুআ',
      ar: 'دعاء لوط ضد المفسدين',
      ur: 'لوط کی فساد پھیلانے والوں کے خلاف دعا',
      id: 'Doa Luth melawan perusak',
      tr: "Lût'un fesatçılara karşı duası",
      fr: 'Prière de Lot contre les corrompus',
      zh: '鲁特对腐败者的祈祷',
      ja: 'ルートの腐敗者に対する祈り'
    }
  },
  {
    refs: '7:89',
    names: {
      en: "Shu'ayb's prayer for righteous judgment",
      bn: 'শুআইবের ন্যায়সঙ্গত বিচারের দুআ',
      ar: 'دعاء شعيب بالفتح والقضاء الحق',
      ur: 'شعیب کی حق فیصلے کی دعا',
      id: "Doa Syuaib meminta keputusan yang benar",
      tr: "Şuayb'ın adil hüküm duası",
      fr: 'Prière de Chouaïb pour le jugement juste',
      zh: '舒阿卜寻求公正裁决的祈祷',
      ja: 'シュアイブの正義の審判の祈り'
    }
  },
  {
    refs: '12:101',
    names: {
      en: "Yūsuf's prayer of gratitude and a righteous death",
      bn: 'ইউসুফের কৃতজ্ঞতা ও নেক মৃত্যুর দুআ',
      ar: 'دعاء يوسف بالشكر وحسن الخاتمة',
      ur: 'یوسف کی شکرگزاری اور حسن خاتمہ کی دعا',
      id: 'Doa Yusuf atas rasa syukur dan akhir yang baik',
      tr: "Yusuf'un şükran ve güzel akibet duası",
      fr: "Du'a de Joseph de gratitude et d'une belle fin",
      zh: '优素福的感恩与善终祈祷',
      ja: 'ユースフの感謝と善い終わりの祈り'
    }
  },
  {
    refs: '20:25-28',
    names: {
      en: "Mūsā's prayer for an open heart and ease",
      bn: 'মূসার বুকের প্রশস্ততা ও সহজতার দুআ',
      ar: 'دعاء موسى بشرح الصدر والتيسير',
      ur: 'موسی کی سینہ کھلنے اور آسانی کی دعا',
      id: 'Doa Musa untuk kelapangan dada dan kemudahan',
      tr: "Mûsâ'nın genişlik ve kolaylık duası",
      fr: "Prière de Moïse pour l'ouverture du cœur et la facilité",
      zh: '穆萨为开胸与便易的祈祷',
      ja: 'ムーサーの心の開示と容易さの祈り'
    }
  },
  {
    refs: '28:16',
    names: {
      en: "Mūsā's repentance and prayer for forgiveness",
      bn: 'মূসার তাওবা ও মাফ চাওয়ার দুআ',
      ar: 'توبة موسى ودعاؤه بالمغفرة',
      ur: 'موسی کی توبہ اور مغفرت کی دعا',
      id: 'Tobat Musa dan doa meminta ampunan',
      tr: "Mûsâ'nın tevbesi ve bağışlanma duası",
      fr: 'Repentance de Moïse et prière pour le pardon',
      zh: '穆萨的忏悔与求饶祈祷',
      ja: 'ムーサーの悔悟と赦しの祈り'
    }
  },
  {
    refs: '7:151',
    names: {
      en: "Mūsā's prayer for forgiveness for himself and Hārūn",
      bn: 'মূসার নিজের ও হারুনের জন্য ক্ষমার দুআ',
      ar: 'دعاء موسى بالمغفرة لنفسه وهارون',
      ur: 'موسی کی اپنے اور ہارون کے لیے مغفرت کی دعا',
      id: 'Doa Musa untuk pengampunan dirinya dan Harun',
      tr: "Mûsâ'nın kendisi ve Hârûn için bağışlanma duası",
      fr: "Prière de Moïse pour son pardon et celui d'Aaron",
      zh: '穆萨为自己和哈伦的宽恕祈祷',
      ja: 'ムーサーの自身とハールーンへの赦しの祈り'
    }
  },
  {
    refs: '7:155-156',
    names: {
      en: "Mūsā's prayer for mercy after his people's sin",
      bn: 'মূসার কওমের গুনাহের পরে রহমতের দুআ',
      ar: 'دعاء موسى بالرحمة بعد ذنب قومه',
      ur: 'موسی کی اپنی قوم کے گناہ کے بعد رحمت کی دعا',
      id: 'Doa Musa memohon rahmat setelah dosa kaumnya',
      tr: "Mûsâ'nın kavminin günahından sonra rahmet duası",
      fr: 'Prière de Moïse pour la miséricorde après la faute de son peuple',
      zh: '穆萨在族人犯罪后求慈悯的祈祷',
      ja: 'ムーサーの民の罪の後の慈悲の祈り'
    }
  },
  {
    refs: '19:4-6',
    names: {
      en: "Zakariyyā's prayer for an heir",
      bn: 'জাকারিয়ার উত্তরাধিকারীর দুআ',
      ar: 'دعاء زكريا بالولد الوارث',
      ur: 'زکریا کی وارث اولاد کی دعا',
      id: 'Doa Zakaria meminta pewaris',
      tr: "Zekeriyya'nın varis duası",
      fr: 'Prière de Zacharie pour un héritier',
      zh: '宰凯里雅为继承人的祈祷',
      ja: 'ザカリーヤーの後継者のための祈り'
    }
  },
  {
    refs: '21:89',
    names: {
      en: "Zakariyyā's prayer not to be left without an heir",
      bn: 'জাকারিয়ার নিঃসন্তান না থাকার দুআ',
      ar: 'دعاء زكريا بألا يذر وحيداً',
      ur: 'زکریا کی بے اولاد نہ رہنے کی دعا',
      id: 'Doa Zakaria agar tidak ditinggalkan tanpa ahli waris',
      tr: "Zekeriyya'nın yalnız bırakılmama duası",
      fr: 'Prière de Zacharie pour ne pas rester sans héritier',
      zh: '宰凯里雅不让他孤独的祈祷',
      ja: 'ザカリーヤーの相続人なしで残されないための祈り'
    }
  },
  {
    refs: '21:83',
    names: {
      en: "Ayyūb's prayer for relief from adversity",
      bn: 'আইউবের কষ্ট থেকে মুক্তির দুআ',
      ar: 'دعاء أيوب بكشف الضر',
      ur: 'ایوب کی تکلیف دور ہونے کی دعا',
      id: 'Doa Ayub memohon kelapangan dari penderitaan',
      tr: "Eyyûb'un sıkıntıdan kurtuluş duası",
      fr: "Prière d'Ayoub pour la délivrance de l'adversité",
      zh: '阿尤布为消除苦难的祈祷',
      ja: 'アイユーブの苦難からの解放の祈り'
    }
  },
  {
    refs: '21:87',
    names: {
      en: "Yūnus's tasbīḥ in the belly of the whale",
      bn: 'ইউনুসের মাছের পেটে তাসবিহ ও দুআ',
      ar: 'تسبيح يونس في بطن الحوت',
      ur: 'یونس کی مچھلی کے پیٹ میں تسبیح',
      id: 'Tasbih Yunus dalam perut ikan',
      tr: "Yunus'un balığın karnında tesbihi",
      fr: 'La glorification de Jonas dans le ventre de la baleine',
      zh: '优努斯在鱼腹中的赞念',
      ja: 'ユーヌスの魚の腹での賛美'
    }
  },
  {
    refs: '27:19',
    names: {
      en: "Sulaymān's prayer of gratitude for blessings",
      bn: 'সুলায়মানের নিআমতের শুকরিয়ার দুআ',
      ar: 'دعاء سليمان بالشكر على النعم',
      ur: 'سلیمان کی نعمتوں پر شکر کی دعا',
      id: 'Doa Sulaiman bersyukur atas nikmat',
      tr: "Süleyman'ın nimetlere şükran duası",
      fr: 'Prière de Salomon de gratitude pour les bienfaits',
      zh: '苏莱曼为恩典感恩的祈祷',
      ja: 'スライマーンの恩恵に対する感謝の祈り'
    }
  },
  {
    refs: '38:35',
    names: {
      en: "Sulaymān's prayer for forgiveness and a unique kingdom",
      bn: 'সুলায়মানের ক্ষমা ও অনন্য রাজত্বের দুআ',
      ar: 'دعاء سليمان بالمغفرة والملك العظيم',
      ur: 'سلیمان کی مغفرت اور بے نظیر سلطنت کی دعا',
      id: 'Doa Sulaiman untuk ampunan dan kerajaan yang unik',
      tr: "Süleyman'ın bağışlanma ve eşsiz krallık duası",
      fr: "Prière de Salomon pour le pardon et un règne unique",
      zh: '苏莱曼为宽恕与独特王国的祈祷',
      ja: 'スライマーンの赦しと唯一の王国の祈り'
    }
  },
  {
    refs: '5:114',
    names: {
      en: "ʿĪsā's prayer for a table spread from heaven",
      bn: 'ঈসার আসমান থেকে দস্তরখানের দুআ',
      ar: 'دعاء عيسى بالمائدة من السماء',
      ur: 'عیسی کی آسمان سے دسترخوان کی دعا',
      id: 'Doa Isa meminta hidangan dari langit',
      tr: "İsa'nın gökten sofra duası",
      fr: 'Prière de Jésus pour une table descendue du ciel',
      zh: '尔萨为天降餐桌的祈祷',
      ja: 'イーサーの天からの食卓の祈り'
    }
  },
  {
    refs: '17:80',
    names: {
      en: "The Prophet's prayer for a sound entrance and exit",
      bn: 'নবীর সুষ্ঠু প্রবেশ ও প্রস্থানের দুআ',
      ar: 'دعاء النبي ﷺ بالمدخل والمخرج الصادق',
      ur: 'نبی ﷺ کی درست داخلہ اور خروج کی دعا',
      id: 'Doa Nabi untuk masuk dan keluar dengan benar',
      tr: 'Peygamberin doğru giriş ve çıkış duası',
      fr: 'Prière du Prophète pour une entrée et sortie sincères',
      zh: '先知为诚实入出的祈祷',
      ja: '預言者の誠実な入出の祈り'
    }
  },
  {
    refs: '20:114',
    names: {
      en: "The Prophet's prayer for increase in knowledge",
      bn: 'নবীর জ্ঞান বৃদ্ধির দুআ',
      ar: 'دعاء النبي ﷺ بزيادة العلم',
      ur: 'نبی ﷺ کی علم میں اضافے کی دعا',
      id: 'Doa Nabi untuk menambah ilmu',
      tr: 'Peygamberin ilim artırma duası',
      fr: 'Prière du Prophète pour accroître la connaissance',
      zh: '先知为增加知识的祈祷',
      ja: '預言者の知識増加の祈り'
    }
  },
  {
    refs: '23:97-98',
    names: {
      en: "The Prophet's prayer for protection from Shayṭān",
      bn: 'নবীর শয়তানের প্ররোচনা থেকে আশ্রয়ের দুআ',
      ar: 'استعاذة النبي ﷺ من وساوس الشيطان',
      ur: 'نبی ﷺ کی شیطان کی وسوسوں سے پناہ کی دعا',
      id: 'Doa Nabi berlindung dari bisikan setan',
      tr: 'Peygamberin şeytan vesveselerinden sığınma duası',
      fr: 'Prière du Prophète pour la protection contre Satan',
      zh: '先知为防护撒旦低语的祈祷',
      ja: '預言者のシャイターンの囁きからの庇護の祈り'
    }
  }
];

/**
 * Quranic du'as focused on protection — from enemies, oppressors,
 * hellfire, hypocrisy, evil suggestions, and the unseen harm.
 */
const PROTECTION_DUAS = [
  {
    refs: '2:250-251',
    names: {
      en: "Du'a for patience and victory over oppressors",
      bn: 'অত্যাচারীদের বিরুদ্ধে ধৈর্য ও বিজয়ের দুআ',
      ar: 'الدعاء بالصبر والنصر على الظالمين',
      ur: 'ظالموں کے خلاف صبر اور نصرت کی دعا',
      id: 'Doa kesabaran dan kemenangan atas penindas',
      tr: 'Zalimlere karşı sabır ve zafer duası',
      fr: "Du'a de patience et victoire contre les oppresseurs",
      zh: '对抗压迫者的忍耐与胜利的祈祷',
      ja: '圧制者に対する忍耐と勝利の祈り'
    }
  },
  {
    refs: '3:16-17',
    names: {
      en: "Protection from the punishment of the Fire",
      bn: 'জাহান্নামের শাস্তি থেকে রক্ষার দুআ',
      ar: 'الوقاية من عذاب النار',
      ur: 'جہنم کے عذاب سے حفاظت کی دعا',
      id: 'Perlindungan dari azab neraka',
      tr: 'Cehennem azabından korunma duası',
      fr: 'Protection contre le châtiment du Feu',
      zh: '免受火狱惩罚的保护祈祷',
      ja: '火獄の刑罰からの保護の祈り'
    }
  },
  {
    refs: '3:53',
    names: {
      en: "Disciples' prayer to be among the witnesses",
      bn: 'শিষ্যদের সাক্ষীদের মধ্যে গণ্য হওয়ার দুআ',
      ar: 'دعاء الحواريين بأن يُكتبوا مع الشاهدين',
      ur: 'حواریین کی شاہدین میں شامل ہونے کی دعا',
      id: 'Doa para hawari untuk dicatat bersama para saksi',
      tr: 'Havarilerin şahitler arasına yazılma duası',
      fr: 'Prière des disciples pour être comptés parmi les témoins',
      zh: '门徒成为见证者的祈祷',
      ja: '弟子たちの証人の中に数えられる祈り'
    }
  },
  {
    refs: '3:147',
    names: {
      en: "Forgiveness and firmness against disbelievers",
      bn: 'গুনাহ মাফ ও কাফিরদের বিরুদ্ধে দৃঢ়তার দুআ',
      ar: 'المغفرة والثبات ضد الكافرين',
      ur: 'گناہوں کی معافی اور کافروں کے خلاف ثابت قدمی',
      id: 'Ampunan dan keteguhan melawan orang kafir',
      tr: 'Bağışlanma ve kâfirlere karşı sebat',
      fr: 'Pardon et fermeté contre les incroyants',
      zh: '宽恕与对不信道者的坚定祈祷',
      ja: '赦しと不信者に対する堅固さの祈り'
    }
  },
  {
    refs: '3:191-194',
    names: {
      en: "Du'a of those endowed with wisdom",
      bn: 'জ্ঞানীদের দুআ',
      ar: 'دعاء أولي الألباب',
      ur: 'اہلِ عقل کی دعا',
      id: 'Doa orang-orang yang memiliki akal',
      tr: 'Akıl sahiplerinin duası',
      fr: "Du'a des doués de raison",
      zh: '具有智慧者的祈祷',
      ja: '知恵ある者の祈り'
    }
  },
  {
    refs: '7:47',
    names: {
      en: "Prayer not to be placed with the wrongdoers",
      bn: 'জালিমদের সাথে না রাখার দুআ',
      ar: 'الدعاء بعدم الجمع مع القوم الظالمين',
      ur: 'ظالموں کے ساتھ نہ رکھنے کی دعا',
      id: 'Doa agar tidak dimasukkan bersama orang zalim',
      tr: 'Zalimlerle bir araya getirilmeme duası',
      fr: 'Prière pour ne pas être mis avec les injustes',
      zh: '不被置于不义者中的祈祷',
      ja: '不正義者とともに置かれないための祈り'
    }
  },
  {
    refs: '10:85-86',
    names: {
      en: "Trust in Allah and rescue from the disbelievers",
      bn: 'আল্লাহর ওপর ভরসা ও কাফিরদের হাত থেকে মুক্তির দুআ',
      ar: 'التوكل على الله والنجاة من القوم الكافرين',
      ur: 'اللہ پر توکل اور کافروں سے نجات کی دعا',
      id: 'Tawakal kepada Allah dan keselamatan dari orang kafir',
      tr: "Allah'a tevekkül ve kâfirlerden kurtuluş",
      fr: 'Confiance en Allah et délivrance des incroyants',
      zh: '托靠真主并从不信道者中获救的祈祷',
      ja: 'アッラーへの信頼と不信者からの救済の祈り'
    }
  },
  {
    refs: '11:47',
    names: {
      en: "Seeking refuge from ignorance",
      bn: 'অজ্ঞতা থেকে আশ্রয়ের দুআ',
      ar: 'الاستعاذة من الجهل',
      ur: 'جہالت سے پناہ کی دعا',
      id: 'Berlindung dari kebodohan',
      tr: 'Cahillikten sığınma duası',
      fr: "Chercher refuge contre l'ignorance",
      zh: '寻求庇护于无知',
      ja: '無知からの庇護を求める祈り'
    }
  },
  {
    refs: '21:112',
    names: {
      en: "Prayer for righteous judgment",
      bn: 'ন্যায়সঙ্গত বিচারের দুআ',
      ar: 'الدعاء بالقضاء الحق',
      ur: 'حق فیصلے کی دعا',
      id: 'Doa untuk keputusan yang benar',
      tr: 'Adil hüküm duası',
      fr: 'Prière pour un jugement juste',
      zh: '为公正裁决的祈祷',
      ja: '正義の審判のための祈り'
    }
  },
  {
    refs: '23:94',
    names: {
      en: "Prayer not to be placed among the wrongdoers",
      bn: 'জালিমদের দলভুক্ত না করার দুআ',
      ar: 'الدعاء بعدم الجعل في القوم الظالمين',
      ur: 'ظالم قوم میں شامل نہ کرنے کی دعا',
      id: 'Doa agar tidak dijadikan bagian kaum yang zalim',
      tr: 'Zalim topluluk içine konulmama duası',
      fr: 'Prière pour ne pas être parmi les injustes',
      zh: '不被置于不义者之列的祈祷',
      ja: '不正義者の中に置かれないための祈り'
    }
  },
  {
    refs: '23:97-98',
    names: {
      en: "Seeking refuge from the incitements of Shayṭān",
      bn: 'শয়তানের প্ররোচনা থেকে আশ্রয়ের দুআ',
      ar: 'الاستعاذة من همزات الشياطين',
      ur: 'شیطان کے وساوس سے پناہ کی دعا',
      id: 'Berlindung dari bisikan setan',
      tr: 'Şeytan vesveselerinden sığınma',
      fr: "Chercher refuge contre les incitations de Satan",
      zh: '寻求庇护于撒旦的诱惑',
      ja: 'シャイターンの唆しからの庇護'
    }
  },
  {
    refs: '40:7-9',
    names: {
      en: "Angels' du'a for believers and protection from Hellfire",
      bn: 'ফেরেশতাদের মুমিনদের জন্য ও জাহান্নাম থেকে রক্ষার দুআ',
      ar: 'دعاء الملائكة للمؤمنين ووقايتهم من النار',
      ur: 'فرشتوں کی مومنوں کے لیے اور جہنم سے حفاظت کی دعا',
      id: 'Doa para malaikat untuk kaum beriman dari api neraka',
      tr: 'Meleklerin müminler için ateşten korunma duası',
      fr: "Du'a des anges pour les croyants et protection du Feu",
      zh: '天使为信士们免受火狱的祈祷',
      ja: '天使の信者たちへの火獄からの保護の祈り'
    }
  },
  {
    refs: '41:36',
    names: {
      en: "Seeking refuge from Satan's evil suggestions",
      bn: 'শয়তানের মন্দ প্ররোচনা থেকে আশ্রয় নেওয়া',
      ar: 'الاستعاذة من نزغ الشيطان',
      ur: 'شیطان کی برائی سے پناہ مانگنا',
      id: 'Berlindung dari godaan jahat setan',
      tr: 'Şeytanın kötü vesveselerinden sığınma',
      fr: "Chercher refuge contre les tentations de Satan",
      zh: '寻求庇护于撒旦的邪恶诱惑',
      ja: 'シャイターンの悪の唆しからの庇護'
    }
  },
  {
    refs: '60:4-5',
    names: {
      en: "Du'a not to be a trial for the disbelievers",
      bn: 'কাফিরদের জন্য ফিতনা না হওয়ার দুআ',
      ar: 'الدعاء بألا يكونوا فتنة للكافرين',
      ur: 'کافروں کے لیے فتنہ نہ بننے کی دعا',
      id: 'Doa agar tidak menjadi fitnah bagi orang kafir',
      tr: 'Kâfirlere fitne olmama duası',
      fr: 'Prière pour ne pas être une épreuve pour les incroyants',
      zh: '不成为不信道者试验的祈祷',
      ja: '不信者への試練とならないための祈り'
    }
  },
  {
    refs: '66:11',
    names: {
      en: "Du'a for paradise and deliverance from evil",
      bn: 'জান্নাত ও মন্দ আমল থেকে মুক্তির দুআ',
      ar: 'الدعاء بالجنة والنجاة من أعمال السوء',
      ur: 'جنت اور برے اعمال سے نجات کی دعا',
      id: 'Doa untuk surga dan keselamatan dari amal buruk',
      tr: 'Cennet ve kötü amellerden kurtuluş duası',
      fr: "Du'a pour le Paradis et la délivrance des mauvaises actions",
      zh: '为天堂与从罪行中解脱的祈祷',
      ja: '天国と悪行からの解放の祈り'
    }
  },
  {
    refs: '113:1-5',
    names: {
      en: "Seeking refuge in the Lord of Daybreak",
      bn: 'ভোরের রবের কাছে আশ্রয়ের দুআ',
      ar: 'الاستعاذة برب الفلق',
      ur: 'رب الفلق سے پناہ کی دعا',
      id: 'Berlindung kepada Tuhan Subuh',
      tr: 'Sabahın Rabbine sığınma',
      fr: "Chercher refuge auprès du Seigneur de l'aube",
      zh: '求庇护于晨曦之主',
      ja: '夜明けの主への庇護を求める祈り'
    }
  },
  {
    refs: '114:1-6',
    names: {
      en: "Seeking refuge in the Lord of Mankind",
      bn: 'মানুষের রবের কাছে আশ্রয়ের দুআ',
      ar: 'الاستعاذة برب الناس',
      ur: 'رب الناس سے پناہ کی دعا',
      id: 'Berlindung kepada Tuhan manusia',
      tr: 'İnsanların Rabbine sığınma',
      fr: "Chercher refuge auprès du Seigneur des hommes",
      zh: '求庇护于人类之主',
      ja: '人々の主への庇護を求める祈り'
    }
  }
];

/**
 * Quranic du'as and verses of shukr (gratitude) and ḥamd (praise),
 * including prophets' thanksgivings and the believers' expressions of praise.
 */
const GRATITUDE_DUAS = [
  {
    refs: '1:1-7',
    names: {
      en: "Al-Fātiḥah — the du'a of praise and guidance",
      bn: 'আল-ফাতিহা — প্রশংসা ও হেদায়েতের দুআ',
      ar: 'الفاتحة — دعاء الحمد والهداية',
      ur: 'سورہ فاتحہ — حمد اور ہدایت کی دعا',
      id: "Al-Fatihah — doa pujian dan petunjuk",
      tr: 'El-Fatiha — övgü ve hidayet duası',
      fr: "Al-Fātiḥah — la du'a de louange et de guidée",
      zh: '开端章 — 赞颂与引导的祈祷',
      ja: 'アル=ファーティハ — 讃美と導きの祈り'
    }
  },
  {
    refs: '6:1',
    names: {
      en: "Praise for the creation of the heavens and earth",
      bn: 'আসমান-জমিন সৃষ্টির জন্য আল্লাহর প্রশংসা',
      ar: 'الحمد على خلق السماوات والأرض',
      ur: 'آسمانوں اور زمین کی تخلیق پر حمد',
      id: 'Pujian atas penciptaan langit dan bumi',
      tr: 'Göklerin ve yerin yaratılışına övgü',
      fr: 'Louange pour la création des cieux et de la terre',
      zh: '赞颂创造天地',
      ja: '天地の創造への讃美'
    }
  },
  {
    refs: '7:43',
    names: {
      en: "Gratitude for divine guidance",
      bn: 'আল্লাহর হেদায়েতের জন্য কৃতজ্ঞতা',
      ar: 'الحمد على هداية الله',
      ur: 'اللہ کی ہدایت پر شکر',
      id: 'Syukur atas petunjuk Allah',
      tr: "Allah'ın hidayetine şükür",
      fr: 'Gratitude pour la guidance divine',
      zh: '为真主引导的感恩',
      ja: 'アッラーの導きへの感謝'
    }
  },
  {
    refs: '10:10',
    names: {
      en: "The call of praise in Paradise",
      bn: 'জান্নাতে প্রশংসার ধ্বনি',
      ar: 'نداء الحمد في الجنة',
      ur: 'جنت میں حمد کی پکار',
      id: 'Seruan pujian di surga',
      tr: 'Cennetteki hamd nidası',
      fr: 'L\'appel de louange au Paradis',
      zh: '天堂中的赞颂之声',
      ja: '楽園での讃美の呼びかけ'
    }
  },
  {
    refs: '14:39-41',
    names: {
      en: "Ibrāhīm's praise for offspring and prayer for constancy",
      bn: 'ইবরাহিমের সন্তানের জন্য প্রশংসা ও অবিচলতার দুআ',
      ar: 'حمد إبراهيم على الذرية ودعاء الثبات',
      ur: 'ابراہیم کی اولاد پر حمد اور ثابت قدمی کی دعا',
      id: 'Pujian Ibrahim atas keturunan dan doa ketetapan',
      tr: "İbrahim'in çocuk için hamd ve sebat duası",
      fr: "Louange d'Ibrahim pour la descendance et prière pour la constance",
      zh: '易卜拉欣为子嗣赞美并为坚定祈祷',
      ja: 'イブラーヒームの子孫への讃美と堅固さの祈り'
    }
  },
  {
    refs: '17:111',
    names: {
      en: "Glorifying Allah without partner or offspring",
      bn: 'অংশীদার ও সন্তান ছাড়া আল্লাহর তাসবিহ',
      ar: 'تنزيه الله عن الشريك والولد',
      ur: 'اللہ کی شرکاء اور اولاد سے پاکی کا اعلان',
      id: 'Mengagungkan Allah tanpa sekutu atau anak',
      tr: 'Ortak ve evlat edinmeksizin Allah\'ı tenzih etme',
      fr: 'Glorification d\'Allah sans associé ni enfant',
      zh: '赞颂真主无伴侣无子嗣',
      ja: '相棒も子もなくアッラーを称える'
    }
  },
  {
    refs: '18:1-3',
    names: {
      en: "Praise for the straight, unwavering Book",
      bn: 'সরল অটল কিতাবের জন্য প্রশংসা',
      ar: 'الحمد على الكتاب المستقيم القيّم',
      ur: 'سیدھی اٹل کتاب پر حمد',
      id: 'Pujian atas Kitab yang lurus dan tegak',
      tr: 'Doğru ve sağlam Kitap için hamd',
      fr: 'Louange pour le Livre droit et impeccable',
      zh: '赞颂笔直无偏的典经',
      ja: '直く揺るぎない啓典への讃美'
    }
  },
  {
    refs: '23:28-29',
    names: {
      en: "Nūḥ's gratitude prayer on the ark",
      bn: 'নূহের জাহাজে উঠে কৃতজ্ঞতার দুআ',
      ar: 'دعاء نوح بالشكر عند ركوب السفينة',
      ur: 'نوح کی کشتی پر سوار ہونے کے وقت شکر کی دعا',
      id: 'Doa syukur Nuh saat menaiki bahtera',
      tr: "Nuh'un gemiye binerken şükür duası",
      fr: 'Prière de gratitude de Noé sur l\'arche',
      zh: '努哈登船时的感恩祈祷',
      ja: 'ヌーフの方舟での感謝の祈り'
    }
  },
  {
    refs: '27:15',
    names: {
      en: "Dāwūd and Sulaymān's praise for divine favour",
      bn: 'দাউদ ও সুলায়মানের ঐশ্বরিক অনুগ্রহের প্রশংসা',
      ar: 'حمد داوود وسليمان على الفضل الإلهي',
      ur: 'داؤد اور سلیمان کی الہی فضل پر حمد',
      id: 'Pujian Dawud dan Sulaiman atas karunia ilahi',
      tr: "Dâvûd ve Süleyman'ın ilahi lütfa şükrü",
      fr: 'Louange de David et Salomon pour la faveur divine',
      zh: '达乌德与苏莱曼为神恩赞美',
      ja: 'ダーウードとスライマーンの神の恵みへの讃美'
    }
  },
  {
    refs: '27:19',
    names: {
      en: "Sulaymān's du'a of gratitude for blessings",
      bn: 'সুলায়মানের নিআমতের শুকরিয়ার দুআ',
      ar: 'دعاء سليمان بالشكر على النعم',
      ur: 'سلیمان کی نعمتوں پر شکر کی دعا',
      id: 'Doa syukur Sulaiman atas nikmat',
      tr: "Süleyman'ın nimetlere şükran duası",
      fr: 'Prière de Salomon de gratitude pour les bienfaits',
      zh: '苏莱曼为恩典感恩的祈祷',
      ja: 'スライマーンの恩恵への感謝の祈り'
    }
  },
  {
    refs: '27:59',
    names: {
      en: "Praise and peace upon Allah's chosen servants",
      bn: 'আল্লাহর মনোনীত বান্দাদের প্রতি প্রশংসা ও শান্তি',
      ar: 'الحمد لله وسلام على عباده المصطفين',
      ur: 'اللہ کی حمد اور اس کے چنے ہوئے بندوں پر سلام',
      id: 'Pujian kepada Allah dan salam untuk hamba-hamba pilihan-Nya',
      tr: "Allah'a hamd ve seçkin kullarına selam",
      fr: "Louange à Allah et paix sur Ses serviteurs élus",
      zh: '赞颂真主并向其选仆致平安',
      ja: 'アッラーへの讃美と選ばれた僕への平和'
    }
  },
  {
    refs: '34:1',
    names: {
      en: "Praise to Allah for all in the heavens and earth",
      bn: 'আসমান ও জমিনের সবকিছুর জন্য আল্লাহর প্রশংসা',
      ar: 'الحمد لله على كل ما في السماوات والأرض',
      ur: 'آسمانوں اور زمین کی ہر چیز پر اللہ کی حمد',
      id: 'Pujian kepada Allah atas semua yang ada di langit dan bumi',
      tr: 'Göklerdeki ve yerdeki her şey için Allah\'a hamd',
      fr: "Louange à Allah pour tout ce qui est dans les cieux et la terre",
      zh: '为天地间一切赞颂真主',
      ja: '天地すべてのためのアッラーへの讃美'
    }
  },
  {
    refs: '35:34-35',
    names: {
      en: "Paradise dwellers' gratitude for all sorrow removed",
      bn: 'জান্নাতবাসীদের দুঃখ দূর হওয়ায় কৃতজ্ঞতা',
      ar: 'حمد أهل الجنة على إزالة الحزن',
      ur: 'جنتیوں کی غم دور ہونے پر شکرگزاری',
      id: 'Rasa syukur penghuni surga atas dihilangkannya kesedihan',
      tr: 'Cennet ehlinin kederin giderilmesine şükrü',
      fr: 'Gratitude des habitants du Paradis pour la tristesse effacée',
      zh: '天堂居民为忧愁消除的感恩',
      ja: '悲しみが取り除かれた楽園の住人の感謝'
    }
  },
  {
    refs: '37:182',
    names: {
      en: "Closing praise to the Lord of all the worlds",
      bn: 'সব জগতের রবের প্রশংসার সমাপনী',
      ar: 'ختام الحمد لرب العالمين',
      ur: 'تمام جہانوں کے پروردگار کی حمد کا اختتام',
      id: 'Penutup pujian untuk Tuhan semesta alam',
      tr: 'Âlemlerin Rabbine kapanış hamd',
      fr: 'Louange finale au Seigneur des mondes',
      zh: '对众世界之主的终末赞颂',
      ja: '全世界の主への締め括りの讃美'
    }
  },
  {
    refs: '39:74',
    names: {
      en: "Gratitude in Paradise for Allah's fulfilled promise",
      bn: 'জান্নাতে আল্লাহর প্রতিশ্রুতি পূরণে কৃতজ্ঞতা',
      ar: 'الحمد في الجنة على وفاء وعد الله',
      ur: 'جنت میں اللہ کے وعدے کی تکمیل پر شکر',
      id: "Rasa syukur di surga atas janji Allah yang terpenuhi",
      tr: "Cennette Allah'ın vaadinin gerçekleşmesine şükür",
      fr: "Gratitude au Paradis pour la promesse d'Allah tenue",
      zh: '在天堂中为真主应许实现的感恩',
      ja: '楽園でのアッラーの約束成就への感謝'
    }
  },
  {
    refs: '46:15',
    names: {
      en: "Gratitude for parental blessings and righteous deeds",
      bn: 'পিতামাতার নিআমত ও নেক আমলের কৃতজ্ঞতার দুআ',
      ar: 'الشكر على نعمة الوالدين والعمل الصالح',
      ur: 'والدین کی نعمت اور نیک عمل پر شکر کی دعا',
      id: 'Syukur atas nikmat orang tua dan amal saleh',
      tr: 'Ebeveyn nimeti ve salih amel için şükür duası',
      fr: 'Gratitude pour les bienfaits parentaux et les bonnes œuvres',
      zh: '为父母恩典与善功的感恩祈祷',
      ja: '両親の恵みと善行への感謝の祈り'
    }
  }
];

const HARDSHIP_DUAS = [
  {
    refs: '2:250',
    names: {
      en: "Talūt's army: patience and victory against Goliath",
      bn: 'তালূতের বাহিনীর সবর ও বিজয়ের দুআ',
      ar: 'دعاء جند طالوت بالصبر والنصر على جالوت',
      ur: 'طالوت کے لشکر کی صبر اور فتح کی دعا',
      id: 'Doa tentara Talut memohon sabar dan kemenangan',
      tr: 'Talut ordusunun sabır ve zafer duası',
      fr: "Du'a de l'armée de Tâlût: patience et victoire",
      zh: '塔鲁特军队求忍耐和胜利的祈祷',
      ja: 'タールートの軍の忍耐と勝利の祈り'
    }
  },
  {
    refs: '3:16-17',
    names: {
      en: "Believers' plea for forgiveness and deliverance from the Fire",
      bn: 'মুমিনদের ক্ষমা ও জাহান্নাম থেকে মুক্তির দুআ',
      ar: 'دعاء المؤمنين بالمغفرة والنجاة من النار',
      ur: 'مؤمنوں کی مغفرت اور جہنم سے نجات کی دعا',
      id: 'Doa orang beriman memohon ampunan dan selamat dari neraka',
      tr: "Müminlerin bağışlanma ve ateşten kurtuluş duası",
      fr: 'Supplication des croyants pour le pardon et la délivrance du Feu',
      zh: '信士们求饶恕和免受火刑的祈祷',
      ja: '信者の赦しと火獄からの救出の祈り'
    }
  },
  {
    refs: '3:173',
    names: {
      en: "Uhud aftermath: Allah suffices us, He is the best Guardian",
      bn: 'উহুদের পর: হাসবুনাল্লাহ ওয়া নিআমাল ওয়াকীল',
      ar: 'بعد أُحُد: حسبنا الله ونعم الوكيل',
      ur: 'احد کے بعد: حسبنا اللہ ونعم الوکیل',
      id: 'Pasca Uhud: Cukuplah Allah, Dia sebaik-baik pelindung',
      tr: "Uhud sonrası: Allah bize yeter, O ne güzel vekildir",
      fr: "Après Uhud: Allah nous suffit et Il est le meilleur Garant",
      zh: '欧侯德战役后：真主足矣，祂是最好的保护者',
      ja: 'ウフド後：アッラーで十分、最善の保護者'
    }
  },
  {
    refs: '6:64',
    names: {
      en: "Allah rescues from every distress — assurance in hardship",
      bn: 'আল্লাহ প্রতিটি বিপদ থেকে উদ্ধার করেন — বিপদে প্রতিশ্রুতি',
      ar: 'الله ينجي من كل كرب — طمأنينة في الشدة',
      ur: 'اللہ ہر تکلیف سے نجات دیتا ہے — مصیبت میں یقین',
      id: 'Allah menyelamatkan dari setiap kesusahan — jaminan dalam kesulitan',
      tr: "Allah her sıkıntıdan kurtarır — zorlukta güvence",
      fr: "Allah délivre de toute détresse — assurance dans l'épreuve",
      zh: '真主从每个苦难中拯救——困境中的保证',
      ja: 'アッラーはあらゆる苦難から救う — 困難における確信'
    }
  },
  {
    refs: '10:98',
    names: {
      en: "The people of Yūnus: repentance that saved a whole community",
      bn: 'ইউনুসের কওম: তওবা যা পুরো সম্প্রদায়কে বাঁচিয়েছিল',
      ar: 'توبة قوم يونس التي أنقذت مجتمعاً بأكمله',
      ur: 'یونس کی قوم: توبہ جس نے پوری آبادی کو بچایا',
      id: 'Kaum Yunus: pertobatan yang menyelamatkan seluruh umat',
      tr: "Yunus'un kavmi: tüm bir toplumu kurtaran tevbe",
      fr: "Le peuple de Yūnus: la repentance qui sauva toute une communauté",
      zh: '尤努斯的民族：拯救整个社区的悔悟',
      ja: 'ユーヌスの民：共同体全体を救った悔悟'
    }
  },
  {
    refs: '12:83',
    names: {
      en: "Ya'qūb's resolve: beautiful patience and trust in Allah",
      bn: 'ইয়াকুবের দৃঢ়তা: সুন্দর সবর ও আল্লাহর উপর ভরসা',
      ar: 'ثبات يعقوب: الصبر الجميل والتوكل على الله',
      ur: 'یعقوب کا عزم: صبر جمیل اور اللہ پر توکل',
      id: "Tekad Ya'qub: sabar yang indah dan tawakal kepada Allah",
      tr: "Yakup'un kararlılığı: güzel sabır ve Allah'a tevekkül",
      fr: "La résolution de Ya'qūb: belle patience et confiance en Allah",
      zh: '雅古布的决心：美好的忍耐与对真主的信任',
      ja: 'ヤアクーブの決意：美しい忍耐とアッラーへの委託'
    }
  },
  {
    refs: '12:87',
    names: {
      en: "Do not despair of Allah's mercy — Ya'qūb's counsel in grief",
      bn: 'আল্লাহর রহমত থেকে নিরাশ হয়ো না — বিষাদে ইয়াকুবের উপদেশ',
      ar: "لا تيأسوا من روح الله — وصية يعقوب في الحزن",
      ur: 'اللہ کی رحمت سے نا امید مت ہو — غم میں یعقوب کی نصیحت',
      id: "Jangan putus asa dari rahmat Allah — nasihat Ya'qub dalam kesedihan",
      tr: "Allah'ın rahmetinden ümit kesme — Yakup'un keder içindeki öğüdü",
      fr: "Ne désespérez pas de la miséricorde d'Allah — conseil de Ya'qūb dans le chagrin",
      zh: '不要对真主的慈悲绝望——雅古布悲伤中的忠告',
      ja: 'アッラーの慈悲を諦めるな — 悲しみの中でのヤアクーブの訓戒'
    }
  },
  {
    refs: '12:100',
    names: {
      en: "Yūsuf's reunion: Allah's subtle plan works through every trial",
      bn: 'ইউসুফের পুনর্মিলন: প্রতিটি পরীক্ষায় আল্লাহর সূক্ষ্ম পরিকল্পনা',
      ar: 'لقاء يوسف بأهله: إن ربي لطيف لما يشاء',
      ur: 'یوسف کا اپنے خاندان سے ملاپ: یقیناً میرا رب لطیف ہے',
      id: 'Reunian Yusuf: rencana Allah yang halus dalam setiap cobaan',
      tr: "Yusuf'un yeniden kavuşması: Allah'ın incelikli planı",
      fr: "Les retrouvailles de Yūsuf: le plan subtil d'Allah à travers toute épreuve",
      zh: '优素福的重逢：真主通过每次考验运作的微妙计划',
      ja: 'ユースフの再会：すべての試練を通じたアッラーの巧みな計画'
    }
  },
  {
    refs: '17:80',
    names: {
      en: "Enter and exit in truth — du'a for righteous transitions",
      bn: 'সত্যের সাথে প্রবেশ ও নির্গমনের দুআ',
      ar: 'أدخلني مدخل صدق وأخرجني مخرج صدق',
      ur: 'سچائی کے ساتھ داخل اور نکلنے کی دعا',
      id: 'Doa masuk dan keluar dalam kebenaran',
      tr: 'Doğrulukla giriş ve çıkış duası',
      fr: "Entrer et sortir dans la vérité — du'a pour des transitions droites",
      zh: '以诚实进入和离开的祈祷',
      ja: '真実をもって入り出る祈り'
    }
  },
  {
    refs: '20:114',
    names: {
      en: "My Lord, increase me in knowledge — trust in divine wisdom",
      bn: 'হে আমার প্রভু, আমার জ্ঞান বাড়িয়ে দাও',
      ar: 'رب زدني علماً',
      ur: 'رب زدنی علماً — علم میں اضافے کی دعا',
      id: 'Ya Tuhanku, tambahkanlah ilmuku',
      tr: "Rabbim, ilmimi artır",
      fr: "Mon Seigneur, accroîs mon savoir — confiance en la sagesse divine",
      zh: '主啊，增加我的知识',
      ja: '主よ、私の知識を増やしてください'
    }
  },
  {
    refs: '21:83',
    names: {
      en: "Ayyūb's du'a: adversity has touched me, You are Most Merciful",
      bn: 'আইয়ুবের দুআ: আমাকে কষ্ট স্পর্শ করেছে, তুমি সর্বাধিক দয়ালু',
      ar: 'دعاء أيوب: مسّني الضر وأنت أرحم الراحمين',
      ur: 'ایوب کی دعا: مجھے تکلیف پہنچی ہے، آپ سب سے زیادہ رحم کرنے والے ہیں',
      id: 'Doa Ayyub: kesengsaraan menimpaku, Engkau Maha Penyayang',
      tr: "Eyyûb'un duası: bana zorluk dokundu, Sen en merhametlisin",
      fr: "Du'a d'Ayyūb: l'épreuve m'a touché, Tu es le plus Miséricordieux",
      zh: '艾尤布的祈祷：苦难降临我身，您是最仁慈的',
      ja: 'アイユーブの祈り：苦難が私に触れた、あなたは最も慈悲深い'
    }
  },
  {
    refs: '21:87',
    names: {
      en: "Yūnus in the whale's belly: no god but You, glory be to You",
      bn: 'মাছের পেটে ইউনুস: তুমি ছাড়া কোনো ইলাহ নেই',
      ar: 'يونس في بطن الحوت: لا إله إلا أنت سبحانك إني كنت من الظالمين',
      ur: 'مچھلی کے پیٹ میں یونس: لا الہ الا انت سبحانک',
      id: 'Yunus dalam perut ikan: tiada Tuhan selain Engkau, Maha Suci Engkau',
      tr: "Balığın karnındaki Yunus: Senden başka ilah yoktur, Seni tenzih ederim",
      fr: "Yūnus dans le ventre de la baleine: nul dieu sauf Toi, gloire à Toi",
      zh: '在鲸鱼腹中的尤努斯：没有神灵只有您，赞美您',
      ja: '鯨の腹のユーヌス：あなたのほか神はいない、あなたに栄光あれ'
    }
  },
  {
    refs: '21:112',
    names: {
      en: "My Lord, judge with truth — cry for justice under oppression",
      bn: 'হে আমার প্রভু, সত্য দিয়ে ফয়সালা করুন — নিপীড়নে ন্যায়বিচারের আবেদন',
      ar: 'رب احكم بالحق — نداء العدل تحت الظلم',
      ur: 'رب احکم بالحق — ظلم کے خلاف انصاف کی دعا',
      id: 'Ya Tuhanku, berikanlah keputusan dengan benar — seruan keadilan',
      tr: 'Rabbim, hak ile hükmet — zulüm altında adalet çığlığı',
      fr: "Mon Seigneur, juge avec vérité — cri de justice sous l'oppression",
      zh: '主啊，以真理裁判——压迫下对正义的呼唤',
      ja: '主よ、真実をもって裁いてください — 抑圧下での正義の叫び'
    }
  },
  {
    refs: '26:83-87',
    names: {
      en: "Ibrāhīm's du'a: wisdom, righteous company, and honourable mention",
      bn: 'ইবরাহিমের দুআ: প্রজ্ঞা, সৎ সঙ্গ ও সুন্দর স্মরণ',
      ar: 'دعاء إبراهيم: الحكمة والصحبة الصالحة والذكر الحسن',
      ur: 'ابراہیم کی دعا: حکمت، نیک صحبت اور اچھی یاد',
      id: 'Doa Ibrahim: hikmah, teman saleh, dan sebutan yang baik',
      tr: "İbrahim'in duası: hikmet, salih arkadaşlık ve güzel anılma",
      fr: "Du'a d'Ibrāhīm: sagesse, compagnie vertueuse et bonne mention",
      zh: '易卜拉欣的祈祷：智慧、义人的陪伴与良好的称颂',
      ja: 'イブラーヒームの祈り：知恵、義人との交わり、栄誉ある記念'
    }
  },
  {
    refs: '28:24',
    names: {
      en: "Mūsā in Madyan: my Lord, I am in need of any good You send",
      bn: 'মাদইয়ানে মূসার দুআ: হে প্রভু, আপনি যে কল্যাণ পাঠাবেন আমি সে মুখাপেক্ষী',
      ar: 'دعاء موسى في مدين: رب إني لما أنزلت إلي من خير فقير',
      ur: 'مدین میں موسیٰ کی دعا: رب إني لما أنزلت إلي من خير فقير',
      id: 'Doa Musa di Madyan: ya Tuhanku, aku fakir terhadap kebaikan yang Engkau turunkan',
      tr: "Medyen'deki Musa'nın duası: Rabbim, indireceklerin hayra muhtacım",
      fr: "Du'a de Mūsā à Madyan: mon Seigneur, je suis dans le besoin de tout bien que Tu envoies",
      zh: '穆萨在马德彦的祈祷：主啊，我确实需要您降给我的任何恩惠',
      ja: 'マデャンでのムーサーの祈り：主よ、あなたが下さる善に私は必要としています'
    }
  },
  {
    refs: '39:53',
    names: {
      en: "Do not despair of Allah's mercy — hope for the overburdened soul",
      bn: 'আল্লাহর রহমত থেকে নিরাশ হয়ো না — ভারাক্রান্ত আত্মার আশা',
      ar: 'لا تقنطوا من رحمة الله — أمل النفس المثقلة',
      ur: 'اللہ کی رحمت سے مایوس مت ہو — بوجھل روح کی امید',
      id: 'Jangan berputus asa dari rahmat Allah — harapan bagi jiwa yang terbebani',
      tr: "Allah'ın rahmetinden umudunu kesme — bunalmış ruh için umut",
      fr: "Ne désespérez pas de la miséricorde d'Allah — espoir pour l'âme accablée",
      zh: '不要对真主的慈悲绝望——为不堪重负的灵魂带来希望',
      ja: 'アッラーの慈悲を諦めるな — 重荷を負う魂への希望'
    }
  },
  {
    refs: '40:44-45',
    names: {
      en: "I entrust my affairs to Allah — the believer's steadfast reliance",
      bn: 'আমি আমার বিষয় আল্লাহর কাছে সোপর্দ করি — মুমিনের দৃঢ় তাওয়াক্কুল',
      ar: 'أفوض أمري إلى الله — توكل المؤمن الراسخ',
      ur: 'میں اپنا معاملہ اللہ کے سپرد کرتا ہوں — مؤمن کا پختہ توکل',
      id: "Aku menyerahkan urusanku kepada Allah — keteguhan tawakal seorang mukmin",
      tr: "İşimi Allah'a havale ediyorum — müminin sarsılmaz tevekkülü",
      fr: "Je confie mes affaires à Allah — ferme confiance du croyant",
      zh: '我将我的事情托付给真主——信士坚定的依靠',
      ja: '私の事柄をアッラーに委ねる — 信者の揺るぎない依託'
    }
  },
  {
    refs: '71:26-28',
    names: {
      en: "Nūḥ's perseverance: prayer for believers amid generations of rejection",
      bn: 'নূহের অধ্যবসায়: প্রজন্মের অস্বীকারের মধ্যে মুমিনদের জন্য দুআ',
      ar: 'صبر نوح: الدعاء للمؤمنين وسط أجيال من الإنكار',
      ur: 'نوح کی استقامت: نسل در نسل انکار کے بیچ مومنوں کے لیے دعا',
      id: 'Keteguhan Nuh: doa untuk kaum beriman di tengah penolakan berbagai generasi',
      tr: "Nuh'un sabrı: nesiller boyu inkâr içinde müminler için dua",
      fr: "La persévérance de Nūḥ: prière pour les croyants au milieu du rejet générationnel",
      zh: '努哈的坚毅：在世代否认中为信士们祈祷',
      ja: 'ヌーフの忍耐：世代を超えた拒絶の中での信者のための祈り'
    }
  },
  {
    refs: '94:5-6',
    names: {
      en: "With hardship comes ease — divine promise repeated twice",
      bn: 'কঠিনের সাথে অবশ্যই সহজ আছে — দুইবার পুনরাবৃত্তি ঐশী প্রতিশ্রুতি',
      ar: 'مع العسر يسر — وعد إلهي مكرر مرتين',
      ur: 'بے شک مشکل کے ساتھ آسانی ہے — دو بار دہرایا گیا وعدہ الہٰی',
      id: 'Bersama kesulitan ada kemudahan — janji ilahi yang diulang dua kali',
      tr: "Zorlukla birlikte kolaylık var — iki kez tekrarlanan ilahi söz",
      fr: "Avec la difficulté vient l'aisance — promesse divine répétée deux fois",
      zh: '与困难同在的是容易——两次重复的神圣承诺',
      ja: '困難と共に安らぎがある — 二度繰り返された神の約束'
    }
  }
];

const TRAVEL_DUAS = [
  {
    refs: '6:63',
    names: {
      en: "Calling out in the darkness of land and sea",
      bn: 'স্থলে ও সমুদ্রের অন্ধকারে আল্লাহকে ডাকা',
      ar: 'النداء في ظلمات البر والبحر',
      ur: 'خشکی اور سمندر کی تاریکیوں میں اللہ کو پکارنا',
      id: 'Berseru kepada Allah dalam kegelapan darat dan laut',
      tr: "Karanın ve denizin karanlığında Allah'a sesleniş",
      fr: 'Appel à Allah dans les ténèbres de la terre et de la mer',
      zh: '在陆地与海洋黑暗中呼唤真主',
      ja: '陸と海の暗闇でのアッラーへの呼びかけ'
    }
  },
  {
    refs: '10:22',
    names: {
      en: "Du'a during the sea-storm: sincere devotion in mortal danger",
      bn: 'সমুদ্রঝড়ে দুআ: মারাত্মক বিপদে আন্তরিক উপাসনা',
      ar: 'الدعاء في العاصفة البحرية: الإخلاص في خطر الموت',
      ur: 'سمندری طوفان میں دعا: موت کے خطرے میں اخلاص',
      id: 'Doa di tengah badai laut: ketulusan dalam bahaya maut',
      tr: 'Deniz fırtınasında dua: ölüm tehlikesinde samimi kulluk',
      fr: "Du'a lors de la tempête en mer: dévotion sincère en danger mortel",
      zh: '海上风暴中的祈祷：生死危难中的至诚崇拜',
      ja: '海の嵐の中での祈り：命の危険における誠実な礼拝'
    }
  },
  {
    refs: '17:80',
    names: {
      en: "Enter in truth and exit in truth — du'a for safe and righteous passage",
      bn: 'সত্যের সাথে প্রবেশ ও নির্গমনের দুআ — যাত্রার জন্য দুআ',
      ar: 'أدخلني مدخل صدق وأخرجني مخرج صدق — دعاء المسافر',
      ur: 'سچائی کے ساتھ داخل اور خارج ہونے کی دعا — مسافر کی دعا',
      id: 'Doa masuk dan keluar dalam kebenaran — doa perjalanan',
      tr: 'Doğrulukla giriş ve çıkış duası — yolcu için dua',
      fr: "Entrer et sortir dans la vérité — du'a de voyage pour un passage sûr",
      zh: '以诚实进出的祈祷——旅途中的祈祷',
      ja: '真実をもって入り出る祈り — 安全な旅の祈り'
    }
  },
  {
    refs: '23:29',
    names: {
      en: "Land me in a blessed landing — Nūḥ's embarkation prayer",
      bn: 'আমাকে বরকতময় স্থানে অবতরণ করাও — নূহের যাত্রার দুআ',
      ar: 'أنزلني منزلاً مباركاً — دعاء نوح عند الإبحار',
      ur: 'مجھے بابرکت جگہ اتارو — نوح کی سفر کی دعا',
      id: 'Turunkan aku di tempat yang diberkahi — doa Nuh saat berlayar',
      tr: "Beni mübarek bir yere indir — Nuh'un yola çıkış duası",
      fr: "Fais-moi aborder en un lieu béni — prière de Nūḥ à l'embarquement",
      zh: '让我在吉祥之处登陆——努哈出发时的祈祷',
      ja: '祝福された場所に降ろしてください — ヌーフの出発の祈り'
    }
  },
  {
    refs: '27:16',
    names: {
      en: "Sulaymān's gratitude for gifts granting extraordinary reach",
      bn: 'সুলাইমানের অসাধারণ দান ও সামর্থ্যের জন্য কৃতজ্ঞতা',
      ar: 'شكر سليمان على النعم التي منحته قدرة استثنائية',
      ur: 'سلیمان کی غیر معمولی صلاحیتوں پر شکرگزاری',
      id: 'Rasa syukur Sulaiman atas karunia yang memberinya kemampuan luar biasa',
      tr: "Süleyman'ın olağanüstü yetkinlikler için şükrü",
      fr: "Gratitude de Sulaymān pour les dons accordant une portée extraordinaire",
      zh: '苏莱曼对赋予其非凡能力的恩赐的感恩',
      ja: 'スライマーンの並外れた能力への感謝'
    }
  },
  {
    refs: '27:40',
    names: {
      en: "The throne in an eye-blink: marvelling at Allah's power to transport",
      bn: 'চোখের পলকে সিংহাসন: যাতায়াতে আল্লাহর শক্তির প্রতি বিস্ময়',
      ar: 'العرش في طرفة عين: التعجب من قدرة الله في النقل',
      ur: 'ایک پل میں تخت: سفر میں اللہ کی قدرت پر حیرانی',
      id: 'Singgasana dalam sekejap mata: takjub atas kekuasaan Allah dalam memindahkan',
      tr: "Gözün kırpmasında taht: Allah'ın taşıma gücüne hayret",
      fr: "Le trône en un clin d'œil: émerveillement devant le pouvoir de transport d'Allah",
      zh: '眨眼间的宝座：对真主运输能力的惊叹',
      ja: '瞬きの間の玉座：移送するアッラーの力への驚嘆'
    }
  },
  {
    refs: '39:6',
    names: {
      en: "Allah's provision of cattle — means of sustenance and journey",
      bn: 'আল্লাহর পশু সম্পদ দান — জীবিকা ও যাত্রার উপকরণ',
      ar: 'إنزال الأنعام — وسائل الرزق والسفر',
      ur: 'اللہ کا مویشی عطا کرنا — روزی اور سفر کے ذرائع',
      id: 'Pemberian Allah atas ternak — sarana penghidupan dan perjalanan',
      tr: "Allah'ın hayvan bağışı — geçim ve yolculuk araçları",
      fr: "La provision de bétail par Allah — moyens de subsistance et de voyage",
      zh: '真主赐予的牲畜——维生与旅行的手段',
      ja: 'アッラーの家畜の贈り物 — 生計と旅の手段'
    }
  },
  {
    refs: '43:13',
    names: {
      en: "Glory to Him who subjected this — du'a upon mounting any conveyance",
      bn: 'পবিত্র তিনি যিনি এটি বশ করেছেন — যানে আরোহণের দুআ',
      ar: 'سبحان الذي سخّر لنا هذا — دعاء ركوب المركوب',
      ur: 'پاک ہے وہ جس نے اسے مسخر کیا — سواری پر سوار ہونے کی دعا',
      id: 'Maha Suci yang menundukkan ini — doa saat menaiki kendaraan',
      tr: 'Bunu bize boyun eğdiren ne yücedir — bineğe binerken dua',
      fr: "Gloire à Celui qui a soumis cela — du'a au moment de monter tout véhicule",
      zh: '赞颂使这服从我们的主——乘坐任何交通工具时的祈祷',
      ja: 'これを従わせてくださった御方に栄光 — 乗り物に乗る際の祈り'
    }
  }
];

const FAMILY_DUAS = [
  {
    refs: '2:128',
    names: {
      en: "Ibrāhīm and Ismā'īl: raise from our descendants a Muslim nation",
      bn: 'ইবরাহিম ও ইসমাইল: আমাদের বংশধরদের মধ্যে মুসলিম উম্মাহ তৈরির দুআ',
      ar: 'إبراهيم وإسماعيل: أخرج من ذريتنا أمة مسلمة لك',
      ur: 'ابراہیم اور اسماعیل: ہماری اولاد میں سے مسلم امت بنانے کی دعا',
      id: "Doa Ibrahim dan Ismail: jadikan dari keturunan kami umat yang tunduk kepada-Mu",
      tr: "İbrahim ve İsmail'in duası: soyumuzdan Müslüman bir ümmet çıkar",
      fr: "Ibrāhīm et Ismā'īl: fais surgir parmi nos descendants une nation soumise",
      zh: '易卜拉欣和伊斯玛仪：使我们的后代成为顺从您的民族',
      ja: 'イブラーヒームとイスマーイール：子孫からムスリムの民族を'
    }
  },
  {
    refs: '3:35',
    names: {
      en: "The wife of Imrān: dedicating the child in the womb to Allah",
      bn: 'ইমরানের স্ত্রী: গর্ভের শিশুকে আল্লাহর উদ্দেশ্যে উৎসর্গের দুআ',
      ar: "امرأة عمران: نذر الجنين لله عز وجل",
      ur: 'عمران کی بیوی: رحم کے بچے کو اللہ کے لیے نذر کرنے کی دعا',
      id: 'Istri Imran: mendedikasikan janin dalam kandungan untuk Allah',
      tr: "İmran'ın eşi: rahimdeki çocuğu Allah'a adamak",
      fr: "L'épouse d'Imrân: dédier l'enfant dans le sein à Allah",
      zh: '伊姆兰的妻子：将腹中胎儿献给真主',
      ja: 'イムラーンの妻：胎内の子をアッラーに捧げる'
    }
  },
  {
    refs: '3:38',
    names: {
      en: "Zakariyyā's plea: my Lord, grant me a pure offspring from Yourself",
      bn: 'জাকারিয়ার দুআ: হে প্রভু, নিজ থেকে আমাকে পবিত্র বংশধর দান করুন',
      ar: 'دعاء زكريا: رب هب لي من لدنك ذرية طيبة',
      ur: 'زکریا کی دعا: رب ہب لی من لدنک ذریۃ طیبۃ',
      id: 'Doa Zakariya: ya Tuhanku, karuniakan kepadaku keturunan yang baik',
      tr: "Zekeriya'nın duası: Rabbim, katından bana temiz bir nesil ver",
      fr: "Supplication de Zakariyyā: mon Seigneur, accorde-moi de Toi une pure descendance",
      zh: '扎卡利亚的祈祷：主啊，请赐给我来自您的纯洁后代',
      ja: 'ザカリッヤーの祈り：主よ、あなたからの清い子孫を授けてください'
    }
  },
  {
    refs: '14:37',
    names: {
      en: "Ibrāhīm's prayer for his family settled near the Sacred House",
      bn: 'ইবরাহিমের পবিত্র ঘরের কাছে বসতি স্থাপনকারী পরিবারের জন্য দুআ',
      ar: 'دعاء إبراهيم لأهله في الوادي غير ذي زرع عند بيتك',
      ur: 'ابراہیم کی اپنے گھرانے کے لیے بیت اللہ کے قریب دعا',
      id: "Doa Ibrahim untuk keluarganya yang menetap dekat Rumah Suci",
      tr: "İbrahim'in Kutsal Ev'in yanına yerleşen ailesi için duası",
      fr: "Prière d'Ibrāhīm pour sa famille établie près de la Maison Sacrée",
      zh: '易卜拉欣为定居在神圣天房附近的家人祈祷',
      ja: '聖なる家の近くに定住した家族へのイブラーヒームの祈り'
    }
  },
  {
    refs: '14:40-41',
    names: {
      en: "Ibrāhīm: make me and my offspring steadfast in prayer; forgive us",
      bn: 'ইবরাহিম: আমাকে ও আমার বংশকে নামাজে অবিচল রাখো; আমাদের ক্ষমা করো',
      ar: 'إبراهيم: اجعلني وذريتي مقيمي الصلاة وتقبل دعاءنا واغفر لنا',
      ur: 'ابراہیم: مجھے اور میری اولاد کو نماز قائم کرنے والا بناؤ اور ہماری دعا قبول کرو',
      id: 'Ibrahim: jadikan aku dan keturunanku mendirikan shalat; terimalah doa kami',
      tr: "İbrahim: beni ve neslimi namaz kılanlardan et; duamızı kabul et",
      fr: "Ibrāhīm: rends-moi et ma descendance assidus à la prière; pardonne-nous",
      zh: '易卜拉欣：使我和我的后代坚守礼拜；饶恕我们',
      ja: 'イブラーヒーム：私と子孫を礼拝に堅固にしてください；私たちを赦してください'
    }
  },
  {
    refs: '17:24',
    names: {
      en: "Mercy on my parents as they raised me when I was small",
      bn: 'আমার পিতামাতার প্রতি দয়া করুন যেমন তারা শিশুকালে আমাকে লালন করেছেন',
      ar: 'رب ارحمهما كما ربياني صغيراً',
      ur: 'رب ارحمھما کما ربیانی صغیرا',
      id: 'Kasihilah kedua orang tuaku sebagaimana mereka mendidikku waktu kecil',
      tr: "Rabbim, küçüklüğümde beni terbiye ettikleri gibi onlara rahmet et",
      fr: "Que la miséricorde soit sur mes parents comme ils m'ont élevé enfant",
      zh: '怜悯我的父母，就像他们在我幼小时养育我一样',
      ja: '幼少期に育ててくださった両親に慈悲を'
    }
  },
  {
    refs: '19:5-6',
    names: {
      en: "Zakariyyā's plea for a pious heir who carries on prophethood",
      bn: 'জাকারিয়ার দুআ: নবুয়তের ধারা বহন করবে এমন নেক উত্তরসূরি',
      ar: 'دعاء زكريا بوليّ صالح يرث النبوة',
      ur: 'زکریا کی دعا: ایک صالح وارث کے لیے جو نبوت کو آگے بڑھائے',
      id: 'Doa Zakariya untuk pewaris saleh yang meneruskan kenabian',
      tr: "Zekeriya'nın peygamberliği sürdürecek salih bir varis için duası",
      fr: "Supplication de Zakariyyā pour un héritier pieux poursuivant la prophétie",
      zh: '扎卡利亚为能传承先知精神的虔诚继承人祈祷',
      ja: 'ザカリッヤーの預言者職を引き継ぐ敬虔な後継者への祈り'
    }
  },
  {
    refs: '25:74',
    names: {
      en: "Grant us comfort in spouses and children — make us leaders of the righteous",
      bn: 'আমাদের স্বামী-স্ত্রী ও সন্তানদের মধ্যে চোখের শীতলতা দান করুন',
      ar: 'ربنا هب لنا من أزواجنا وذرياتنا قرة أعين واجعلنا للمتقين إماماً',
      ur: 'ربنا ہب لنا من ازواجنا وذریاتنا قرۃ اعین واجعلنا للمتقین اماما',
      id: 'Anugerahkan kepada kami penyejuk hati dari pasangan dan anak-anak kami',
      tr: "Bize eşlerimizden ve çocuklarımızdan göz nuru ihsan et, bizi muttakilere imam kıl",
      fr: "Accorde-nous la joie des yeux en nos époux et descendants; fais de nous des imams",
      zh: '赐给我们配偶和子女的眼睛清凉——使我们成为虔诚者的领袖',
      ja: '配偶者と子孫による目の涼しさを授けてください — 義人のイマームに'
    }
  },
  {
    refs: '37:100',
    names: {
      en: "Ibrāhīm's brief plea: my Lord, grant me a righteous child",
      bn: 'ইবরাহিমের সংক্ষিপ্ত দুআ: হে প্রভু, আমাকে একজন নেক সন্তান দান করুন',
      ar: 'دعاء إبراهيم المختصر: رب هب لي من الصالحين',
      ur: 'ابراہیم کی مختصر دعا: رب ہب لی من الصالحین',
      id: 'Doa singkat Ibrahim: ya Tuhanku, karuniakan kepadaku anak yang saleh',
      tr: "İbrahim'in kısa duası: Rabbim, bana salihlerden evlat ver",
      fr: "Brève supplication d'Ibrāhīm: mon Seigneur, accorde-moi un enfant vertueux",
      zh: '易卜拉欣简短的祈祷：主啊，赐给我虔诚的孩子',
      ja: 'イブラーヒームの短い祈り：主よ、義人の子を授けてください'
    }
  },
  {
    refs: '46:15',
    names: {
      en: "Gratitude for parents and prayer for righteous deeds to please Allah",
      bn: 'পিতামাতার প্রতি কৃতজ্ঞতা ও আল্লাহকে সন্তুষ্ট করার জন্য নেক আমলের দুআ',
      ar: 'الشكر للوالدين والدعاء بصالح الأعمال التي ترضي الله',
      ur: 'والدین کا شکر اور اللہ کو راضی کرنے والے نیک اعمال کی دعا',
      id: 'Syukur kepada orang tua dan doa untuk amal saleh yang menyenangkan Allah',
      tr: "Ebeveynlere şükran ve Allah'ı razı edecek salih amel duası",
      fr: "Gratitude envers les parents et prière pour des bonnes œuvres agréant à Allah",
      zh: '对父母的感恩及为取悦真主的善功而祈祷',
      ja: '親への感謝とアッラーを喜ばせる善行への祈り'
    }
  },
  {
    refs: '66:11',
    names: {
      en: "Āsiyah's du'a: build me a house near You in Paradise and save me",
      bn: 'আসিয়ার দুআ: জান্নাতে তোমার কাছে একটি ঘর তৈরি করো এবং আমাকে রক্ষা করো',
      ar: "دعاء آسية: رب ابن لي عندك بيتاً في الجنة ونجني من فرعون",
      ur: "آسیہ کی دعا: رب ابن لی عندک بیتاً فی الجنۃ ونجنی من فرعون",
      id: 'Doa Asiyah: bangunkan bagiku rumah di sisi-Mu di surga dan selamatkan aku',
      tr: "Asiye'nin duası: Rabbim, yanında cennette bana bir ev yap ve beni kurtar",
      fr: "Du'a d'Āsiyah: construis-moi une maison près de Toi au Paradis et sauve-moi",
      zh: '阿西娅的祈祷：在天堂为我建造一座靠近您的房子，拯救我',
      ja: 'アースィヤの祈り：楽園のあなたのそばに家を建てて、私を救ってください'
    }
  },
  {
    refs: '71:28',
    names: {
      en: "Nūḥ's prayer: forgive me, my parents, and all believing men and women",
      bn: 'নূহের দুআ: আমাকে, আমার পিতামাতাকে এবং সকল মুমিন নারী-পুরুষকে ক্ষমা করো',
      ar: 'دعاء نوح: اغفر لي ولوالديّ وللمؤمنين والمؤمنات',
      ur: 'نوح کی دعا: مجھے، میرے والدین اور تمام مومن مرد اور عورتوں کو بخش دے',
      id: 'Doa Nuh: ampunilah aku, kedua orang tuaku, dan semua mukmin laki-laki dan perempuan',
      tr: "Nuh'un duası: beni, ebeveynlerimi ve tüm mümin erkek ve kadınları bağışla",
      fr: "Du'a de Nūḥ: pardonne-moi, mes parents, et tous les croyants et croyantes",
      zh: '努哈的祈祷：饶恕我、我的父母以及所有信男信女',
      ja: 'ヌーフの祈り：私と両親と全ての信者の男女を赦してください'
    }
  }
];

const KNOWLEDGE_DUAS = [
  {
    refs: '20:114',
    names: {
      en: 'Rabbi zidni ilma — My Lord, increase me in knowledge',
      bn: 'রাব্বি যিদনি ইলমা — হে আমার রব, আমার জ্ঞান বৃদ্ধি করুন',
      ar: 'رب زدني علماً',
      ur: 'رب زدنی علماً — میرے رب، مجھے علم میں اضافہ فرما',
      id: 'Rabbi zidni ilma — Ya Tuhanku, tambahkanlah ilmuku',
      tr: 'Rabbi zidni ilma — Rabbim, ilmimi artır',
      fr: 'Rabbi zidni ilma — Mon Seigneur, augmente-moi en savoir',
      zh: '我的主啊，增加我的知识',
      ja: 'ラッビー・ズィドニー・イルマー — 主よ、私の知識を増やしてください'
    }
  },
  {
    refs: '20:25-28',
    names: {
      en: "Mūsā's prayer: expand my breast, ease my task, and untie my tongue",
      bn: 'মুসার দুআ: আমার বুক প্রশস্ত করো, কাজ সহজ করো এবং জিহ্বার জড়তা দূর করো',
      ar: 'دعاء موسى: اشرح لي صدري ويسّر لي أمري واحلل عقدة من لساني',
      ur: 'موسیٰ کی دعا: میرا سینہ کھول دے، میرا کام آسان کر اور میری زبان کی گرہ کھول دے',
      id: 'Doa Musa: lapangkan dadaku, mudahkan urusanku, dan lepaskan kekakuan lidahku',
      tr: "Musa'nın duası: göğsümü genişlet, işimi kolaylaştır ve dilimin bağını çöz",
      fr: "Du'a de Mūsā: dilate ma poitrine, facilite ma tâche, dénoue le nœud de ma langue",
      zh: '穆萨的祈祷：扩展我的胸怀，简化我的事务，解开我舌头上的束缚',
      ja: 'ムーサーの祈り：胸を広げ、仕事を楽にし、舌の縛りを解いてください'
    }
  },
  {
    refs: '2:32',
    names: {
      en: 'Angels declare: no knowledge except what You have taught us',
      bn: 'ফেরেশতাদের ঘোষণা: তুমি যা শিখিয়েছ তা ছাড়া আমাদের কোনো জ্ঞান নেই',
      ar: 'قول الملائكة: لا علم لنا إلا ما علمتنا',
      ur: 'فرشتوں کا اقرار: ہمیں تیری سکھائی ہوئی باتوں کے سوا کوئی علم نہیں',
      id: 'Para malaikat mengakui: tidak ada ilmu bagi kami kecuali yang telah Engkau ajarkan',
      tr: 'Meleklerin beyanı: bize öğrettiklerinden başka bilgimiz yoktur',
      fr: "Les anges déclarent: nous n'avons de savoir que ce que Tu nous as enseigné",
      zh: '天使们宣告：除了您所教给我们的，我们没有任何知识',
      ja: '天使たちの宣言：あなたが教えてくださったこと以外に知識はありません'
    }
  },
  {
    refs: '2:129',
    names: {
      en: 'Ibrāhīm: send a Messenger to teach our descendants the Book and wisdom',
      bn: 'ইবরাহিমের দুআ: আমাদের বংশধরদের মধ্যে রসূল পাঠাও যে তাদের কিতাব ও হিকমত শেখাবে',
      ar: 'دعاء إبراهيم: ابعث فيهم رسولاً يتلو عليهم آياتك ويعلمهم الكتاب والحكمة',
      ur: 'ابراہیم کی دعا: ان میں رسول بھیج جو انہیں کتاب اور حکمت سکھائے',
      id: 'Doa Ibrahim: utuslah seorang rasul di antara mereka untuk mengajarkan Kitab dan hikmah',
      tr: "İbrahim'in duası: onlara kitabı ve hikmeti öğretecek bir elçi gönder",
      fr: "Du'a d'Ibrāhīm: envoie parmi notre descendance un Messager pour enseigner le Livre et la sagesse",
      zh: '易卜拉欣的祈祷：向我们的后代派遣一位使者，传授经典和智慧',
      ja: 'イブラーヒームの祈り：子孫に使者を遣わして、聖典と知恵を教えてください'
    }
  },
  {
    refs: '3:8-9',
    names: {
      en: 'Our Lord, do not cause our hearts to deviate after You have guided us',
      bn: 'হে আমাদের রব, হিদায়াতের পর আমাদের অন্তর বিচ্যুত করো না',
      ar: 'ربنا لا تزغ قلوبنا بعد إذ هديتنا وهب لنا من لدنك رحمة',
      ur: 'ربنا لا تزغ قلوبنا بعد اذ ہدیتنا وہب لنا من لدنک رحمۃ',
      id: 'Ya Tuhan kami, janganlah condongkan hati kami setelah Engkau memberi petunjuk kepada kami',
      tr: 'Rabbimiz, bize hidayet verdikten sonra kalplerimizi saptırma',
      fr: 'Notre Seigneur, ne laisse pas nos cœurs se détourner après que Tu nous as guidés',
      zh: '我们的主啊，在您引导我们之后，不要让我们的心偏斜',
      ja: '私たちの主よ、あなたが私たちを導いた後に、心を迷わせないでください'
    }
  },
  {
    refs: '3:191-194',
    names: {
      en: "People of understanding: reflect on creation and beseech Allah's mercy",
      bn: 'জ্ঞানীরা: সৃষ্টি নিয়ে চিন্তা করে এবং আল্লাহর রহমত প্রার্থনা করে',
      ar: 'أولو الألباب: يتفكرون في الخلق ويستغفرون ربهم',
      ur: 'عقل والے: خلقت پر غور کرتے اور رب سے مغفرت مانگتے ہیں',
      id: 'Ulul albab: merenungkan ciptaan dan memohon rahmat Allah',
      tr: "Derin düşünce sahipleri: yaratılışı tefekkür eder ve Allah'tan rahmet diler",
      fr: "Les gens doués d'intelligence: méditent sur la création et implorent la miséricorde d'Allah",
      zh: '有理智的人：思考创造，恳求真主的仁慈',
      ja: '理智ある人たち：創造を深く考え、アッラーの慈悲を懇願する'
    }
  },
  {
    refs: '12:37',
    names: {
      en: 'Yūsuf: what I interpret has been taught to me by my Lord',
      bn: 'ইউসুফ: আমি যা ব্যাখ্যা করি তা আমার রব আমাকে শিখিয়েছেন',
      ar: 'يوسف: ذلك مما علمني ربي',
      ur: 'یوسف: یہ وہی علم ہے جو میرے رب نے مجھے سکھایا',
      id: 'Yusuf: apa yang aku tafsirkan adalah yang diajarkan Tuhanku kepadaku',
      tr: 'Yusuf: yorumladığım şeyler Rabbimin bana öğrettiklerindendir',
      fr: "Yūsuf: ce que j'interprète m'a été enseigné par mon Seigneur",
      zh: '优素福：我所解释的是我的主教给我的',
      ja: 'ユースフ：私が解釈することは、主が私に教えてくださったことです'
    }
  },
  {
    refs: '18:65-66',
    names: {
      en: 'Mūsā with Khiḍr: may I follow you to learn right conduct you were taught?',
      bn: 'মুসা ও খিযিরের সাক্ষাৎ: তোমাকে যা শেখানো হয়েছে তা থেকে শেখার জন্য তোমাকে অনুসরণ করতে পারি?',
      ar: 'موسى مع الخضر: هل أتبعك على أن تعلمني مما علمت رشداً',
      ur: 'موسیٰ اور خضر: کیا میں آپ کے ساتھ اس لیے رہ سکتا ہوں کہ آپ مجھے رشد سکھائیں',
      id: 'Musa dengan Khidr: bolehkah aku mengikutimu agar kamu mengajarku petunjuk?',
      tr: 'Musa ve Hızır: sana öğretilenden bana da öğretmen için seni takip edebilir miyim?',
      fr: "Mūsā avec Khiḍr: puis-je te suivre pour que tu m'apprennes la juste conduite qui t'a été enseignée?",
      zh: '穆萨与赫德尔：我可以跟随您，以便学习您所传授的正确行为吗？',
      ja: 'ムーサーとヒドル：あなたに教えられた正しい行いを学ぶために従ってもよいですか'
    }
  },
  {
    refs: '27:15',
    names: {
      en: 'Dāwūd and Sulaymān: praise Allah who granted us knowledge above many believers',
      bn: 'দাউদ ও সুলাইমান: আল্লাহর প্রশংসা যিনি আমাদের অনেক মুমিনের উপরে জ্ঞান দিয়েছেন',
      ar: 'داود وسليمان: الحمد لله الذي فضلنا على كثير من عباده المؤمنين',
      ur: 'داود اور سلیمان: شکر ہے اللہ کا جس نے ہمیں بہت سے مؤمنوں پر فضیلت دی',
      id: 'Dawud dan Sulaiman: Alhamdulillah yang menganugerahi kami ilmu melebihi banyak hamba-Nya',
      tr: "Davud ve Süleyman: bizi pek çok mümin kulundan üstün kılan Allah'a hamd olsun",
      fr: 'Dāwūd et Sulaymān: louange à Allah qui nous a accordé un savoir surpassant beaucoup de Ses serviteurs',
      zh: '达乌德和苏莱曼：赞美真主，祂赐予我们超越许多信士的知识',
      ja: 'ダーウードとスライマーン：多くの信者を上回る知識を授けてくれたアッラーへの賛美'
    }
  },
  {
    refs: '27:40',
    names: {
      en: 'One with knowledge of the Scripture: a demonstration of divine knowledge',
      bn: 'কিতাবের জ্ঞানসম্পন্ন ব্যক্তি: ঐশ্বরিক জ্ঞানের প্রমাণ',
      ar: 'الذي عنده علم من الكتاب: آية من علم الله المُسخَّر للعباد',
      ur: 'جس کے پاس کتاب کا علم تھا: الہی علم کا مظاہرہ',
      id: 'Orang yang memiliki ilmu dari Kitab: demonstrasi ilmu ilahi',
      tr: 'Kitaptan ilmi olan kişi: ilahi bilginin bir tezahürü',
      fr: 'Celui qui avait la science du Livre: manifestation de la connaissance divine',
      zh: '拥有经典知识的人：神圣知识的展示',
      ja: '聖典の知識を持つ者：神の知識の証明'
    }
  },
  {
    refs: '28:14',
    names: {
      en: 'Mūsā at maturity: Allah bestowed on him judgement and knowledge',
      bn: 'মুসা যৌবনে পৌঁছলে: আল্লাহ তাকে বিচারশক্তি ও জ্ঞান দান করেন',
      ar: 'موسى حين بلغ أشده: آتيناه حكماً وعلماً',
      ur: 'موسیٰ جوانی کو پہنچے: اللہ نے انہیں حکم اور علم عطا فرمایا',
      id: 'Musa saat mencapai kedewasaan: Allah menganugerahinya hikmah dan ilmu',
      tr: 'Musa olgunluğa erişince: Allah ona hikmet ve ilim verdi',
      fr: 'Mūsā à sa maturité: Allah lui accorda le jugement et la connaissance',
      zh: '穆萨成熟时：真主赐予他智慧和知识',
      ja: 'ムーサーが成熟したとき：アッラーが判断力と知識を授けた'
    }
  },
  {
    refs: '46:15',
    names: {
      en: "Rabbi awzi'ni: enable me to be grateful and to work righteousness You approve",
      bn: "রাব্বি আওযি'নি: আমাকে কৃতজ্ঞ করো এবং পছন্দনীয় সৎকর্মের তৌফিক দাও",
      ar: 'دعاء البر بالوالدين: رب أوزعني أن أشكر نعمتك وأن أعمل صالحاً ترضاه',
      ur: 'ربی اوزعنی: مجھے شکرگزار بناؤ اور ایسے نیک عمل کی توفیق دو جو تجھے پسند ہوں',
      id: "Rabbi awzi'ni: jadikan aku bersyukur dan beramal saleh yang Engkau ridai",
      tr: "Rabbi awzi'ni: şükredip razı olduğun salih ameli işlememi nasip eyle",
      fr: "Rabbi awzi'nī: permets-moi d'être reconnaissant et d'accomplir les bonnes œuvres qui T'agréent",
      zh: '主啊，使我能够感激您并做您喜悦的善事',
      ja: 'ラッビー・アウジィーニー：感謝し、あなたの喜ぶ善行をする力を与えてください'
    }
  },
  {
    refs: '55:1-4',
    names: {
      en: 'Ar-Raḥmān: taught the Qurʾān, created man, taught him eloquent speech',
      bn: 'আর-রাহমান: কুরআন শিখিয়েছেন, মানুষ সৃষ্টি করেছেন, বাক্য শেখালেন',
      ar: 'الرحمن: علّم القرآن، خلق الإنسان، علّمه البيان',
      ur: 'الرحمن: قرآن سکھایا، انسان بنایا، بیان سکھایا',
      id: 'Ar-Rahman: mengajarkan Al-Quran, menciptakan manusia, mengajarkan bayan',
      tr: "Ar-Rahman: Kuran'ı öğretti, insanı yarattı, ona beyanı öğretti",
      fr: "Ar-Raḥmān: a enseigné le Coran, créé l'homme, lui a appris l'éloquence",
      zh: '至仁主：传授了《古兰经》，创造了人，教给了他表达能力',
      ja: 'アッラフマーン：クルアーンを教え、人間を創り、雄弁さを教えた'
    }
  },
  {
    refs: '18:10',
    names: {
      en: 'Companions of the Cave: Our Lord, grant us mercy and right guidance in our affair',
      bn: 'গুহার সঙ্গীরা: হে আমাদের রব, আমাদের রহমত দাও এবং আমাদের কাজে সঠিক পথ দেখাও',
      ar: 'أصحاب الكهف: ربنا آتنا من لدنك رحمة وهيئ لنا من أمرنا رشداً',
      ur: 'اصحاب کہف: ربنا آتنا من لدنک رحمۃ وہیئ لنا من امرنا رشدا',
      id: 'Pemuda Gua: Ya Tuhan kami, berikan kami rahmat dari sisi-Mu dan aturkan bagi kami petunjuk dalam urusan kami',
      tr: 'Mağara Arkadaşları: Rabbimiz, katından bize rahmet ver ve işimizde bize doğruyu kolaylaştır',
      fr: 'Les Compagnons de la Caverne: Notre Seigneur, accorde-nous une miséricorde de Toi et dispose pour nous une juste conduite',
      zh: '洞穴的同伴们：我们的主啊，赐予我们您的仁慈，并在我们的事务中给予我们正确的引导',
      ja: '洞窟の仲間たち：私たちの主よ、あなたから慈悲を与え、私たちの事に正しい導きを与えてください'
    }
  },
  {
    refs: '12:101',
    names: {
      en: "Yūsuf's final prayer: You gave me kingdom and taught me interpretation of dreams",
      bn: 'ইউসুফের চূড়ান্ত দুআ: তুমি আমাকে রাজত্ব ও স্বপ্নের ব্যাখ্যা শিখিয়েছ',
      ar: 'دعاء يوسف الختامي: رب قد آتيتني من الملك وعلمتني من تأويل الأحاديث',
      ur: 'یوسف کی آخری دعا: تو نے مجھے بادشاہی دی اور خوابوں کی تعبیر سکھائی',
      id: 'Doa terakhir Yusuf: Engkau telah memberi kerajaan dan mengajariku tafsir mimpi',
      tr: "Yusuf'un son duası: bana hükümdarlık verdin ve rüya tabirini öğrettin",
      fr: "La supplication finale de Yūsuf: Tu m'as donné du royaume et m'as appris l'interprétation des songes",
      zh: '优素福的最终祈祷：您赐给我王权并教给我梦的解释',
      ja: 'ユースフの最後の祈り：あなたは王国を与え、夢の解釈を教えてくださいました'
    }
  },
  {
    refs: '96:1-5',
    names: {
      en: 'Iqraʾ — Read: Allah taught by the pen and taught man what he knew not',
      bn: 'ইকরা — পড়: আল্লাহ কলমের দ্বারা শিক্ষা দিয়েছেন এবং মানুষকে অজানা জিনিস শিখিয়েছেন',
      ar: 'اقرأ: علّم بالقلم وعلّم الإنسان ما لم يعلم',
      ur: 'اقرا: قلم سے سکھایا اور انسان کو وہ سکھایا جو وہ نہیں جانتا تھا',
      id: 'Iqra: Allah mengajarkan dengan pena dan mengajarkan manusia apa yang tidak diketahui',
      tr: 'İkra: kalemle öğretti ve insana bilmediğini öğretti',
      fr: "Iqraʾ — Lis: Allah a enseigné par le calame et a appris à l'homme ce qu'il ne savait pas",
      zh: '伊克拉——宣读：真主用笔传授知识，教导人类他所不知道的',
      ja: 'イクラー：ペンで教え、知らなかったことを人間に教えた'
    }
  }
];

const WEALTH_DUAS = [
  {
    refs: '26:83-85',
    names: {
      en: 'Ibrāhīm: rabbi hab li ḥukman — grant me wisdom and join me with the righteous',
      bn: 'ইবরাহিমের দুআ: রাব্বি হাবলি হুকমান — আমাকে প্রজ্ঞা দাও এবং নেক্কারদের সাথে মেলাও',
      ar: 'إبراهيم: رب هب لي حكماً وألحقني بالصالحين',
      ur: 'ابراہیم: رب ہب لی حکماً والحقنی بالصالحین',
      id: 'Ibrahim: rabbi hab li hukman — karuniakan hikmah dan masukkan aku bersama orang-orang saleh',
      tr: 'Ibrahim: rabbi hab li hukmen — bana hikmet ver ve salihler arasına kat',
      fr: 'Ibrāhīm: rabbi hab li ḥukman — accorde-moi la sagesse et réunis-moi avec les justes',
      zh: '易卜拉欣：主啊，赐给我智慧，使我与义人同在',
      ja: 'イブラーヒーム：主よ、知恵を与え、義人たちに加えてください'
    }
  },
  {
    refs: '2:201',
    names: {
      en: 'Rabbana atina: good in this world and the next, and save us from the Fire',
      bn: 'রাব্বানা আতিনা: দুনিয়া ও আখিরাতে কল্যাণ দাও এবং জাহান্নাম থেকে রক্ষা করো',
      ar: 'ربنا آتنا في الدنيا حسنة وفي الآخرة حسنة وقنا عذاب النار',
      ur: 'ربنا آتنا فی الدنیا حسنۃ وفی الآخرۃ حسنۃ وقنا عذاب النار',
      id: 'Rabbana atina: kebaikan di dunia dan akhirat, dan lindungi kami dari siksa neraka',
      tr: 'Rabbena atina: dünyada ve ahirette iyilik ver ve cehennem azabından koru',
      fr: "Rabbana atina: le bien ici-bas et dans l'au-delà, et préserve-nous du supplice du Feu",
      zh: '我们的主啊，在今世和后世赐给我们美好，并保护我们免受火刑',
      ja: 'ラッバナー・アーティナー：現世と来世に善を与え、火獄の懲罰から守ってください'
    }
  },
  {
    refs: '3:26-27',
    names: {
      en: 'Owner of Sovereignty: give dominion to whom You will and provide without limit',
      bn: 'সার্বভৌমত্বের মালিক: যাকে ইচ্ছা ক্ষমতা দাও এবং সীমাহীনভাবে রিযিক দাও',
      ar: 'قل اللهم مالك الملك تؤتي الملك من تشاء وترزق من تشاء بغير حساب',
      ur: 'قل اللہم مالک الملک توتی الملک من تشاء وترزق من تشاء بغیر حساب',
      id: 'Penguasa kerajaan: berikan kekuasaan kepada siapa yang Engkau kehendaki dan rezeki tanpa batas',
      tr: 'Mülkün sahibi: dilediğine mülk ver ve hesapsız rızıklandır',
      fr: 'Maître de la souveraineté: accorde le pouvoir à qui Tu veux et pourvois sans mesure',
      zh: '王权的主宰：赐给您所愿的人权力，并无限制地供给',
      ja: '主権の持ち主：望む者に支配を与え、無制限に糧をお与えください'
    }
  },
  {
    refs: '3:38',
    names: {
      en: 'Zakariyyā: My Lord, grant me from Yourself a good and pure offspring',
      bn: 'জাকারিয়ার দুআ: হে আমার রব, নিজ থেকে আমাকে পবিত্র সন্তান দান করুন',
      ar: 'دعاء زكريا: رب هب لي من لدنك ذرية طيبة',
      ur: 'زکریا کی دعا: رب ہب لی من لدنک ذریۃ طیبۃ',
      id: 'Doa Zakariya: Ya Tuhanku, karuniakan kepadaku dari sisi-Mu keturunan yang baik',
      tr: "Zekeriya'nın duası: Rabbim, katından bana hayırlı bir nesil ver",
      fr: 'Zakariyyā: Mon Seigneur, accorde-moi de Toi une pure et bonne descendance',
      zh: '扎卡利亚：主啊，请从您那里赐给我良好和纯洁的后代',
      ja: 'ザカリッヤー：主よ、あなたから清く良い子孫を授けてください'
    }
  },
  {
    refs: '7:155-156',
    names: {
      en: 'Mūsā after the earthquake: forgive us and have mercy — You are the best of forgivers',
      bn: 'ভূমিকম্পের পর মুসা: আমাদের ক্ষমা করুন ও দয়া করুন — আপনি সর্বোত্তম ক্ষমাকারী',
      ar: 'موسى بعد الرجفة: اغفر لنا وارحمنا وأنت خير الغافرين',
      ur: 'زلزلے کے بعد موسیٰ: ہمیں بخش دے اور رحم کر، تو بہترین بخشنے والا ہے',
      id: 'Musa setelah gempa: ampunilah kami dan kasihilah kami, Engkau sebaik-baik pengampun',
      tr: 'Zelzele sonrası Musa: bizi bağışla ve merhamet et, bağışlayanların en hayırlısısın',
      fr: 'Mūsā après le tremblement de terre: pardonne-nous et aie pitié, Tu es le meilleur des Pardonneurs',
      zh: '地震后穆萨的祈祷：原谅我们并怜悯我们，您是最好的宽恕者',
      ja: '地震の後のムーサー：私たちを赦し、慈悲をかけてください — あなたは最善の赦す方です'
    }
  },
  {
    refs: '11:41',
    names: {
      en: "Nūḥ embarks the ark: in the name of Allah is its sailing and its anchorage",
      bn: 'নূহ নৌকায় আরোহণ করেন: আল্লাহর নামে এর চলা ও থামা',
      ar: 'نوح يركب السفينة: بسم الله مجريها ومرساها',
      ur: 'نوح کشتی پر سوار ہوئے: بسم اللہ مجریہا ومرسیہا',
      id: 'Nuh menaiki bahtera: dengan nama Allah berlayar dan berlabuhnya',
      tr: "Nuh gemiye bindi: Allah'ın adıyla akması ve demirlemesi",
      fr: "Nūḥ monte sur l'arche: au nom d'Allah est sa course et son ancrage",
      zh: '努哈登上方舟：以真主之名启航和停靠',
      ja: 'ヌーフが箱舟に乗る：アッラーの御名において、航行と停泊がある'
    }
  },
  {
    refs: '25:74',
    names: {
      en: 'Ibād al-Raḥmān: grant us spouses and offspring as comfort to our eyes; make us leaders of the righteous',
      bn: 'ইবাদুর রাহমান: আমাদের স্ত্রী ও সন্তানকে আমাদের চোখের শীতলতা বানাও এবং আমাদের মুত্তাকিদের নেতা করো',
      ar: 'عباد الرحمن: ربنا هب لنا من أزواجنا وذرياتنا قرة أعين واجعلنا للمتقين إماماً',
      ur: 'عباد الرحمن: ربنا ہب لنا من ازواجنا وذریاتنا قرۃ اعین واجعلنا للمتقین اماما',
      id: 'Ibad ar-Rahman: anugerahi kami istri dan keturunan yang menjadi penyejuk mata, jadikan kami pemimpin orang bertakwa',
      tr: "İbadurrahman: bize gözümüzün nuru eşler ve nesil ver, bizi takvaya erenlere önder kıl",
      fr: 'Ibād al-Raḥmān: accorde-nous de nos épouses et descendants la fraîcheur des yeux; fais-nous chefs des pieux',
      zh: '至仁主的仆人：赐给我们使我们眼睛愉悦的配偶和后代，并使我们成为敬畏者的领袖',
      ja: 'ラフマーンの僕たち：妻と子孫を目の冷却として与え、敬虔な者たちの指導者にしてください'
    }
  },
  {
    refs: '62:10',
    names: {
      en: "After Jumu'ah: disperse and seek from the bounty of Allah upon the earth",
      bn: "জুমার পর: জমিনে ছড়িয়ে পড়ো এবং আল্লাহর অনুগ্রহ অনুসন্ধান করো",
      ar: 'بعد الجمعة: فانتشروا في الأرض وابتغوا من فضل الله',
      ur: 'جمعہ کے بعد: زمین میں پھیل جاؤ اور اللہ کا فضل تلاش کرو',
      id: "Setelah Jumu'ah: bertebaranlah di bumi dan carilah karunia Allah",
      tr: "Cuma sonrası: yeryüzüne dağılın ve Allah'ın lütfundan nasip arayın",
      fr: "Après le Vendredi: répandez-vous sur la terre et cherchez la grâce d'Allah",
      zh: '主麻日后：分散在大地上，寻求真主的恩典',
      ja: 'ジュムア後：地に散らばり、アッラーの恵みを求めなさい'
    }
  },
  {
    refs: '65:2-3',
    names: {
      en: 'Whoever fears Allah: He makes a way out and provides from unexpected sources',
      bn: 'যে আল্লাহকে ভয় করে: তিনি তার জন্য পথ বের করেন এবং অপ্রত্যাশিত উৎস থেকে রিযিক দেন',
      ar: 'من يتق الله يجعل له مخرجاً ويرزقه من حيث لا يحتسب',
      ur: 'جو اللہ سے ڈرتا ہے اللہ اسے راستہ نکال دیتا ہے اور وہاں سے رزق دیتا ہے جہاں سے خیال نہ ہو',
      id: 'Barang siapa bertakwa: Allah memberi jalan keluar dan rezeki dari arah yang tidak disangka',
      tr: "Allah'tan kim korkarsa: Allah ona bir çıkış yolu açar ve hesap etmediği yerden rızık verir",
      fr: 'Quiconque craint Allah: Il lui prépare une issue et lui accorde Sa subsistance de sources inattendues',
      zh: '凡敬畏真主的人：祂为他开辟出路，从意想不到的地方供给他',
      ja: 'アッラーを恐れる者：アッラーは道を開き、思いがけない所から糧を与えられる'
    }
  },
  {
    refs: '71:10-12',
    names: {
      en: 'Nūḥ: seek forgiveness — He will send rain, increase your wealth, children, and gardens',
      bn: 'নূহের উপদেশ: ক্ষমা চাও — তিনি বৃষ্টি পাঠাবেন, সম্পদ ও সন্তান বাড়াবেন',
      ar: 'دعوة نوح: استغفروا ربكم يرسل السماء عليكم مدراراً ويمددكم بأموال وبنين وجنات',
      ur: 'نوح کی نصیحت: اپنے رب سے مغفرت مانگو، وہ بارش بھیجے گا، مال اور اولاد بڑھائے گا',
      id: 'Nuh menasehati: mintakan ampun kepada Tuhanmu, Dia menurunkan hujan dan menambah harta, anak, serta kebun',
      tr: "Nuh'un öğüdü: Rabbinizden bağışlanma dileyin, bol yağmur göndersin, malları ve oğulları çoğaltsın",
      fr: 'Nūḥ exhorte: demandez pardon à votre Seigneur, Il vous enverra la pluie, augmentera vos biens, enfants et jardins',
      zh: '努哈的劝导：向你的主求恕，祂将降下雨水，增加财富、子孙和花园',
      ja: 'ヌーフの勧め：主に赦しを求めなさい — 雨を送り、財産・子供・庭園を増やしてくださいます'
    }
  },
  {
    refs: '14:37',
    names: {
      en: 'Ibrāhīm: make hearts incline toward my family near the Sacred House and provide them with fruits',
      bn: 'ইবরাহিম: পবিত্র ঘরের কাছে আমার পরিবারের প্রতি মানুষের মন আকৃষ্ট করো এবং তাদের ফলমূল দাও',
      ar: 'إبراهيم: اجعل أفئدة من الناس تهوي إليهم وارزقهم من الثمرات',
      ur: 'ابراہیم: لوگوں کے دلوں کو ان کی طرف مائل کر اور انہیں پھلوں سے رزق دے',
      id: 'Ibrahim: condongkan hati manusia kepada keluargaku dekat Rumah Suci dan beri mereka rezeki buah-buahan',
      tr: "İbrahim: insanların kalplerini onlara meylettir ve onları meyvelerle rızıklandır",
      fr: 'Ibrāhīm: incline les cœurs des gens vers ma famille près de la Maison Sacrée et pourvois-les en fruits',
      zh: '易卜拉欣：使人们的心向往圣所附近我的家人，并以果实供给他们',
      ja: 'イブラーヒーム：聖なる家の近くの家族に人々の心を向けさせ、果物を与えてください'
    }
  },
  {
    refs: '28:24',
    names: {
      en: 'Mūsā by the well: My Lord, I am truly in need of whatever good You send down to me',
      bn: 'কূপের ধারে মুসা: হে আমার রব, তুমি যে কল্যাণই পাঠাও আমি তার মুখাপেক্ষী',
      ar: 'موسى عند البئر: رب إني لما أنزلت إلي من خير فقير',
      ur: 'کنویں کے پاس موسیٰ: رب انی لما انزلت الی من خیر فقیر',
      id: 'Musa di tepi sumur: ya Tuhanku, sesungguhnya aku sangat memerlukan kebaikan apapun yang Engkau turunkan',
      tr: 'Kuyu başında Musa: Rabbim, bana indireceğin her hayra muhtacım',
      fr: 'Mūsā au puits: Mon Seigneur, je suis dans le besoin de tout bien que Tu feras descendre sur moi',
      zh: '在井边的穆萨：我的主啊，对于您降给我的任何善事，我确实是需要的',
      ja: '井戸のそばのムーサー：主よ、あなたが降ろしてくださるどんな善にも、私は確かに必要です'
    }
  }
];

const MORNING_EVENING_QURANIC_DUAS = [
  {
    refs: '3:16-17',
    names: {
      en: 'Rabbana innana amanna: believers who persevere and seek forgiveness at dawn',
      bn: 'রাব্বানা ইন্নানা আমান্না: মুমিন যারা ধৈর্যশীল এবং ভোরে ক্ষমাপ্রার্থী',
      ar: 'ربنا إننا آمنا فاغفر لنا ذنوبنا — وصف المستغفرين بالأسحار',
      ur: 'ربنا اننا آمنا فاغفر لنا ذنوبنا — رات کے آخری حصے میں توبہ کرنے والے',
      id: 'Rabbana innana amanna: orang beriman yang sabar dan beristighfar di waktu subuh',
      tr: 'Rabbena innena amenna: sabredenler ve seher vakti istiğfar edenler',
      fr: "Rabbana innana amanna: croyants qui persévèrent et implorent le pardon à l'aurore",
      zh: '我们的主，我们确已信道：坚忍并在黎明时分求恕的信士',
      ja: 'ラッバナー・インナナー・アーマンナー：忍耐し、夜明けに赦しを求める信者たち'
    }
  },
  {
    refs: '3:26-27',
    names: {
      en: 'O Allah, Master of Sovereignty: You give and withhold dominion, and provide without account',
      bn: 'হে আল্লাহ, ক্ষমতার মালিক: তুমি ক্ষমতা দান ও প্রত্যাহার করো এবং হিসাবহীন রিযিক দাও',
      ar: 'اللهم مالك الملك تؤتي الملك من تشاء وتنزع الملك ممن تشاء',
      ur: 'اللہم مالک الملک توتی الملک من تشاء وتنزع الملک ممن تشاء',
      id: 'Ya Allah, pemilik kerajaan: Engkau berikan dan cabut kekuasaan, serta memberi rezeki tanpa batas',
      tr: 'Ey Allah, mülkün sahibi: dilediğine mülk verir, dilediğinden alırsın',
      fr: "Ô Allah, Maître de la souveraineté: Tu donnes et retires le pouvoir, Tu pourvois sans limite",
      zh: '主啊，王权的主宰：您赐予并剥夺权力，无限供给',
      ja: 'アッラーよ、主権の持ち主：望む者に与え、望む者から取り、無限に糧をお与えです'
    }
  },
  {
    refs: '3:53',
    names: {
      en: 'Ḥawariyyūn: Our Lord, we believe in what You revealed; make us witnesses',
      bn: 'হাওয়ারিয়্যুন: হে আমাদের রব, তুমি যা অবতীর্ণ করেছ তাতে আমরা ঈমান এনেছি; আমাদের সাক্ষী বানাও',
      ar: 'الحواريون: ربنا آمنا بما أنزلت واتبعنا الرسول فاكتبنا مع الشاهدين',
      ur: 'حواریین: ربنا آمنا بما انزلت واتبعنا الرسول فاکتبنا مع الشاہدین',
      id: 'Hawariyyun: Ya Tuhan, kami beriman pada wahyu-Mu dan mengikuti Rasul; jadikan kami saksi-saksi',
      tr: 'Havariler: Rabbimiz, indirdiğine inandık ve Resule uyduk; bizi şahitler arasına yaz',
      fr: 'Ḥawariyyūn: Notre Seigneur, nous croyons en ce que Tu as révélé; inscris-nous parmi les témoins',
      zh: '门徒们：我们的主啊，我们信仰了您所降示的，并遵循了使者；请将我们列为见证人',
      ja: 'ハワーリーユーン：私たちの主よ、あなたが啓示されたものを信じ、使者に従いました；証人の中に加えてください'
    }
  },
  {
    refs: '3:190-194',
    names: {
      en: 'Reflection at dawn and dusk: those who remember Allah standing, sitting, and on their sides',
      bn: 'ভোর ও সন্ধ্যায় চিন্তাভাবনা: যারা দাঁড়িয়ে, বসে ও শুয়ে আল্লাহকে স্মরণ করে',
      ar: 'التفكر عند الفجر والغروب: الذين يذكرون الله قياماً وقعوداً وعلى جنوبهم',
      ur: 'فجر اور غروب پر غور: جو کھڑے بیٹھے اور لیٹے اللہ کو یاد کرتے ہیں',
      id: 'Renungan saat fajar dan senja: mereka yang berzikir kepada Allah sambil berdiri, duduk, dan berbaring',
      tr: "Şafak ve akşam tefekkürü: ayakta, otururken ve yan yatarken Allah'ı zikredenler",
      fr: "Réflexion à l'aurore et au crépuscule: ceux qui invoquent Allah debout, assis et couchés",
      zh: '黎明和黄昏时的沉思：站着、坐着和侧卧时铭记真主的人们',
      ja: '夜明けと夕暮れの黙想：立ちながら、座りながら、横になりながらアッラーを記念する人々'
    }
  },
  {
    refs: '40:7-9',
    names: {
      en: 'Angels pray for believers: forgive them, admit them to the Garden, protect them from the Fire',
      bn: 'ফেরেশতারা মুমিনদের জন্য দুআ করে: তাদের ক্ষমা করো, জান্নাতে প্রবেশ করাও, জাহান্নাম থেকে রক্ষা করো',
      ar: 'الملائكة يدعون للمؤمنين: اغفر لهم وأدخلهم جنات عدن وقهم السيئات',
      ur: 'فرشتے مؤمنوں کے لیے دعا کرتے ہیں: انہیں بخش دے، جنت میں داخل کر، برائیوں سے بچا',
      id: 'Malaikat mendoakan orang beriman: ampunilah mereka, masukkan ke surga Adn, lindungi dari kejahatan',
      tr: 'Melekler müminler için dua eder: onları bağışla, Adn cennetine koy, kötülüklerden koru',
      fr: 'Les anges prient pour les croyants: pardonne-leur, fais-les entrer au Jardin, préserve-les des maux',
      zh: '天使为信士祈祷：饶恕他们，使他们进入永居乐园，保护他们免受恶事',
      ja: '天使が信者のために祈る：彼らを赦し、楽園に入れ、悪から守ってください'
    }
  },
  {
    refs: '59:22-24',
    names: {
      en: "Beautiful Names of Allah: closing verses of al-Ḥashr, recited morning and evening",
      bn: 'আল্লাহর সুন্দর নামসমূহ: সূরা হাশরের শেষ আয়াত, সকাল-সন্ধ্যায় পাঠযোগ্য',
      ar: 'أسماء الله الحسنى: خواتيم سورة الحشر المستحب قراءتها صباحاً ومساءً',
      ur: 'اللہ کے اسماء حسنی: سورۃ حشر کی آخری آیات جو صبح و شام پڑھنا مستحب ہے',
      id: 'Asmaul Husna: penutup surah Al-Hasyr yang dianjurkan dibaca pagi dan petang',
      tr: "Allah'ın güzel isimleri: Haşr suresinin sabah ve akşam okunması tavsiye edilen son ayetleri",
      fr: "Les Beaux Noms d'Allah: versets finaux de al-Ḥashr, récités le matin et le soir",
      zh: '真主的美名：《聚集章》结尾经文，早晚诵读',
      ja: 'アッラーの美名：スーラ・ハシュルの末尾の節、朝夕に唱えること'
    }
  },
  {
    refs: '2:255',
    names: {
      en: "Āyat al-Kursī: the Throne Verse — recited morning and evening for comprehensive protection",
      bn: 'আয়াতুল কুরসি: সকাল-সন্ধ্যায় সার্বিক সুরক্ষার জন্য পাঠ করা হয়',
      ar: 'آية الكرسي: تُقرأ صباحاً ومساءً لحفظ الله الشامل',
      ur: 'آیت الکرسی: صبح و شام پڑھنا اللہ کی جامع حفاظت کے لیے',
      id: 'Ayat Kursi: dibaca pagi dan petang untuk perlindungan menyeluruh dari Allah',
      tr: "Ayetü'l-Kürsî: sabah ve akşam Allah'ın tam koruması için okunur",
      fr: "Āyat al-Kursī: le Verset du Trône — récité matin et soir pour une protection globale",
      zh: '宝座节：早晚诵读以获得真主全面的保护',
      ja: 'クルスィー節：朝夕に唱えることで全面的な守護を得る'
    }
  },
  {
    refs: '76:25-26',
    names: {
      en: 'Remember the name of your Lord morning and evening, and at night prostrate to Him',
      bn: 'সকাল-সন্ধ্যায় তোমার রবের নাম স্মরণ করো এবং রাতে তাঁকে সিজদা করো',
      ar: 'واذكر اسم ربك بكرة وأصيلاً — ومن الليل فاسجد له',
      ur: 'اور اپنے رب کا نام صبح و شام یاد کرو اور رات کو اسے سجدہ کرو',
      id: 'Sebutlah nama Tuhanmu pagi dan petang, dan sujudlah kepada-Nya di malam hari',
      tr: "Sabah akşam Rabbinin adını an, gece O'na secde et",
      fr: 'Rappelle le nom de ton Seigneur matin et soir, et la nuit, prosterne-toi devant Lui',
      zh: '早晚记念你的主的名字，夜间向祂叩首',
      ja: '朝夕に主の御名を唱え、夜には主にサジダしなさい'
    }
  },
  {
    refs: '2:285-286',
    names: {
      en: "Āmanar-Rasūl: the last two verses of al-Baqarah — recited every evening",
      bn: 'আমানার রাসূল: সূরা বাকারার শেষ দুটি আয়াত — প্রতি সন্ধ্যায় পাঠ করুন',
      ar: 'آمن الرسول: آخر آيتي البقرة المستحب قراءتهما كل ليلة',
      ur: 'آمن الرسول: سورۃ البقرہ کی آخری دو آیات جو ہر رات پڑھنا مستحب ہے',
      id: "Amanar-Rasul: dua ayat terakhir Al-Baqarah yang dianjurkan dibaca setiap malam",
      tr: "Amener'r-Resul: her gece okunması tavsiye edilen Bakara'nın son iki ayeti",
      fr: "Āmanar-Rasūl: les deux derniers versets d'al-Baqarah — récités chaque soir",
      zh: '使者已信仰：《黄牛章》最后两节，每晚诵读',
      ja: 'アーマナッ・ラスール：バカラ章の末尾2節、毎晩唱えること'
    }
  },
  {
    refs: '112:1-4',
    names: {
      en: 'Sūrat al-Ikhlāṣ: say He is Allah, One — recited three times morning and evening',
      bn: 'সূরা ইখলাস: বলো তিনিই আল্লাহ, এক — সকাল-সন্ধ্যায় তিনবার পাঠ করুন',
      ar: 'سورة الإخلاص: قل هو الله أحد — تُقرأ ثلاث مرات صباحاً ومساءً',
      ur: 'سورۃ اخلاص: قل ہو اللہ احد — صبح و شام تین بار پڑھنا مستحب',
      id: 'Surah Al-Ikhlas: katakanlah Dialah Allah Yang Maha Esa — dibaca tiga kali pagi dan petang',
      tr: 'Sûre-i İhlâs: de ki O Allah birdir — sabah ve akşam üç kez okunur',
      fr: "Sūrat al-Ikhlāṣ: dis Il est Allah, l'Unique — récitée trois fois le matin et le soir",
      zh: '忠诚章：说祂是真主，是独一的——早晚各诵读三遍',
      ja: 'スーラ・イフラース：言いなさい、彼はアッラーで唯一 — 朝夕に3回唱えること'
    }
  },
  {
    refs: '113:1-5',
    names: {
      en: 'Sūrat al-Falaq: I seek refuge in the Lord of the dawn — recited morning and evening',
      bn: 'সূরা ফালাক: আমি আশ্রয় চাই ভোরের রবের কাছে — সকাল-সন্ধ্যায় পাঠ করুন',
      ar: 'سورة الفلق: أعوذ برب الفلق — تُقرأ صباحاً ومساءً',
      ur: 'سورۃ الفلق: اعوذ برب الفلق — صبح و شام پڑھنا مستحب',
      id: 'Surah Al-Falaq: aku berlindung kepada Tuhan yang menguasai fajar — dibaca pagi dan petang',
      tr: 'Sûre-i Felak: şafağın Rabbine sığınırım — sabah ve akşam okunur',
      fr: "Sūrat al-Falaq: je cherche refuge auprès du Seigneur de l'aurore — récitée matin et soir",
      zh: '曙光章：我求救于晨光的主——早晚诵读',
      ja: 'スーラ・ファラク：夜明けの主に庇護を求めます — 朝夕に唱えること'
    }
  },
  {
    refs: '114:1-6',
    names: {
      en: 'Sūrat al-Nās: I seek refuge in the Lord of mankind — recited morning and evening',
      bn: 'সূরা নাস: আমি মানুষের রবের কাছে আশ্রয় চাই — সকাল-সন্ধ্যায় পাঠ করুন',
      ar: 'سورة الناس: أعوذ برب الناس — تُقرأ صباحاً ومساءً',
      ur: 'سورۃ الناس: اعوذ برب الناس — صبح و شام پڑھنا مستحب',
      id: 'Surah An-Nas: aku berlindung kepada Tuhan manusia — dibaca pagi dan petang',
      tr: 'Sûre-i Nâs: insanların Rabbine sığınırım — sabah ve akşam okunur',
      fr: 'Sūrat al-Nās: je cherche refuge auprès du Seigneur des hommes — récitée matin et soir',
      zh: '人类章：我求救于人类的主——早晚诵读',
      ja: 'スーラ・ナース：人々の主に庇護を求めます — 朝夕に唱えること'
    }
  },
  {
    refs: '17:78-79',
    names: {
      en: 'Establish prayer from the decline of the sun to the darkness of night; recite at Fajr',
      bn: 'সূর্য ঢলার পর থেকে রাতের অন্ধকার পর্যন্ত নামাজ কায়েম করো; ফজরে কুরআন পাঠ করো',
      ar: 'أقم الصلاة لدلوك الشمس إلى غسق الليل وقرآن الفجر',
      ur: 'سورج ڈھلنے سے رات کی تاریکی تک نماز قائم کرو اور فجر کا قرآن پڑھو',
      id: 'Dirikanlah shalat dari tergelincirnya matahari hingga kegelapan malam dan bacaan Fajr',
      tr: "Güneşin zevalinden gecenin karanlığına kadar namaz kıl ve Sabah Kuran'ını oku",
      fr: "Établis la prière depuis le déclin du soleil jusqu'à l'obscurité de la nuit; récite le Coran à l'aurore",
      zh: '从太阳偏斜到夜幕降临，坚持礼拜；诵读晨礼的古兰经',
      ja: '太陽の傾きから夜の暗闇まで礼拝を確立し、ファジルに誦読しなさい'
    }
  }
];

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { RABBANA_DUAS, TOPIC_GROUPS, TOPIC_COLLECTIONS, PROPHET_DUAS, PROTECTION_DUAS, GRATITUDE_DUAS, HARDSHIP_DUAS, TRAVEL_DUAS, FAMILY_DUAS, KNOWLEDGE_DUAS, WEALTH_DUAS, MORNING_EVENING_QURANIC_DUAS };
}
