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
  },
  {
    refs: '3:9',
    names: {
      en: 'You will gather all mankind',
      bn: 'আপনি সব মানুষকে একত্র করবেন',
      ar: 'إنك جامع الناس ليوم لا ريب فيه',
      ur: 'تو سب لوگوں کو جمع کرنے والا ہے',
      id: 'Engkau mengumpulkan seluruh manusia',
      tr: 'İnsanları toplayacak olan Sensin',
      fr: 'Tu rassembleras tous les hommes'
    , zh: '你必集合世人', ja: 'あなたは全人類を集められる'}
  },
  {
    refs: '5:83',
    names: {
      en: 'Record us among the witnesses',
      bn: 'আমাদের সাক্ষীদের অন্তর্ভুক্ত করুন',
      ar: 'فاكتبنا مع الشاهدين',
      ur: 'ہمیں گواہوں میں لکھ لے',
      id: 'Catatlah kami bersama para saksi',
      tr: 'Bizi şahitlerle beraber yaz',
      fr: 'Inscris-nous parmi les témoins'
    , zh: '求你使我们与作证者同列', ja: '私たちを証人たちと共に記してください'}
  },
  {
    refs: '7:23',
    names: {
      en: 'We have wronged ourselves (dua of Adam)',
      bn: 'আমরা নিজেদের প্রতি জুলুম করেছি (আদম আঃ-এর দুআ)',
      ar: 'ربنا ظلمنا أنفسنا',
      ur: 'ہم نے اپنے آپ پر ظلم کیا (آدم علیہ السلام کی دعا)',
      id: 'Kami telah menzalimi diri kami (doa Adam)',
      tr: 'Kendimize zulmettik (Âdem’in duası)',
      fr: 'Nous nous sommes fait du tort (invocation d’Adam)'
    , zh: '我们自欺了（阿丹的祈祷）', ja: '私たちは自らを損ないました（アーダムの祈り）'}
  },
  {
    refs: '7:47',
    names: {
      en: 'Place us not with the wrongdoing people',
      bn: 'আমাদের জালিমদের সাথে রাখবেন না',
      ar: 'لا تجعلنا مع القوم الظالمين',
      ur: 'ہمیں ظالم قوم کے ساتھ نہ کر',
      id: 'Jangan tempatkan kami bersama kaum yang zalim',
      tr: 'Bizi zalim toplulukla beraber kılma',
      fr: 'Ne nous place pas avec les injustes'
    , zh: '求你不要使我们与不义者同列', ja: '不義の民と共にしないでください'}
  },
  {
    refs: '7:89',
    names: {
      en: 'Decide between us and our people in truth',
      bn: 'আমাদের ও আমাদের জাতির মাঝে সত্যের ফয়সালা করুন',
      ar: 'ربنا افتح بيننا وبين قومنا بالحق',
      ur: 'ہمارے اور ہماری قوم کے درمیان حق کے ساتھ فیصلہ فرما',
      id: 'Berilah keputusan yang benar antara kami dan kaum kami',
      tr: 'Bizimle kavmimiz arasında hak ile hüküm ver',
      fr: 'Tranche en toute vérité entre nous et notre peuple'
    , zh: '求你在我们和我们的宗族之间依真理而判决', ja: '私たちと民の間を真理で裁いてください'}
  },
  {
    refs: '7:126',
    names: {
      en: 'Pour patience upon us and let us die as Muslims',
      bn: 'আমাদের ধৈর্য দিন ও মুসলিম হিসেবে মৃত্যু দিন',
      ar: 'ربنا أفرغ علينا صبرا وتوفنا مسلمين',
      ur: 'ہم پر صبر انڈیل دے اور ہمیں مسلمان کر کے موت دے',
      id: 'Limpahkanlah kesabaran dan wafatkanlah kami sebagai muslim',
      tr: 'Üzerimize sabır yağdır ve bizi müslüman olarak öldür',
      fr: 'Déverse sur nous la patience et fais-nous mourir soumis'
    , zh: '求你把坚忍倾注于我们，并使我们作为归顺者而死', ja: '忍耐を注ぎ、ムスリムとして死なせてください'}
  },
  {
    refs: '10:85-86',
    names: {
      en: 'Make us not a trial; save us from the disbelievers',
      bn: 'আমাদের ফিতনা বানাবেন না; কাফিরদের থেকে রক্ষা করুন',
      ar: 'لا تجعلنا فتنة ونجنا من القوم الكافرين',
      ur: 'ہمیں آزمائش نہ بنا اور کافروں سے نجات دے',
      id: 'Jangan jadikan kami sasaran fitnah; selamatkan kami dari kaum kafir',
      tr: 'Bizi bir fitne kılma; kâfir topluluktan bizi kurtar',
      fr: 'Ne fais pas de nous une épreuve; sauve-nous des mécréants'
    , zh: '求你不要使我们受迫害，求你拯救我们脱离不信道的民众', ja: '私たちを試練とせず、不信者から救ってください'}
  },
  {
    refs: '18:10',
    names: {
      en: 'Grant us mercy and guidance (People of the Cave)',
      bn: 'আমাদের রহমত ও হেদায়েত দিন (আসহাবে কাহফ)',
      ar: 'آتنا من لدنك رحمة وهيئ لنا من أمرنا رشدا',
      ur: 'ہمیں اپنے پاس سے رحمت دے اور ہمارے کام میں رہنمائی فرما',
      id: 'Berikanlah rahmat dan petunjuk bagi urusan kami (Ashabul Kahfi)',
      tr: 'Bize katından rahmet ver ve işimizde bize doğruyu kolaylaştır',
      fr: 'Accorde-nous miséricorde et guide-nous en notre affaire'
    , zh: '求你把你那里的恩惠赏赐我们，求你使我们的事业完全端正', ja: '御許から慈悲を授け、私たちの事を正しく導いてください'}
  },
  {
    refs: '25:65-66',
    names: {
      en: 'Avert from us the punishment of Hell',
      bn: 'জাহান্নামের শাস্তি আমাদের থেকে দূর করুন',
      ar: 'اصرف عنا عذاب جهنم',
      ur: 'ہم سے جہنم کا عذاب ٹال دے',
      id: 'Jauhkanlah azab Jahanam dari kami',
      tr: 'Cehennem azabını bizden savuştur',
      fr: 'Écarte de nous le châtiment de l’Enfer'
    , zh: '求你使我们得免于火狱的刑罚', ja: '地獄の懲罰を私たちから遠ざけてください'}
  },
  {
    refs: '60:4-5',
    names: {
      en: 'Upon You we rely; make us not a trial (dua of Ibrahim)',
      bn: 'আপনার উপরই ভরসা করি; আমাদের ফিতনা বানাবেন না (ইবরাহীম আঃ-এর দুআ)',
      ar: 'عليك توكلنا ولا تجعلنا فتنة للذين كفروا',
      ur: 'ہم نے تجھ پر بھروسہ کیا؛ ہمیں کافروں کے لیے آزمائش نہ بنا (ابراہیم علیہ السلام کی دعا)',
      id: 'Kepada-Mu kami bertawakal; jangan jadikan kami fitnah bagi orang kafir (doa Ibrahim)',
      tr: 'Sana tevekkül ettik; bizi inkârcılara fitne kılma (İbrahim’in duası)',
      fr: 'C’est à Toi que nous nous confions; ne fais pas de nous une épreuve (invocation d’Ibrahim)'
    , zh: '我们只信托你；求你不要使我们成为不信道者的考验（易卜拉欣的祈祷）', ja: 'あなたに委ねます、私たちを不信者への試練とされないでください（イブラーヒームの祈り）'}
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

/**
 * Quranic du'as focused on protection — from enemies, oppressors,
 * hellfire, hypocrisy, evil suggestions, and the unseen harm.
 */

/**
 * Quranic du'as and verses of shukr (gratitude) and ḥamd (praise),
 * including prophets' thanksgivings and the believers' expressions of praise.
 */







// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { RABBANA_DUAS, TOPIC_GROUPS, TOPIC_COLLECTIONS };
}
