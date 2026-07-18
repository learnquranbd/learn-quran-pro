/**
 * Surah Data with Multi-Language Support
 * Contains all 114 Surahs with their names in multiple languages
 */

const SURAH_DATA = [
  { number: 1, ayahCount: 7, arabicName: "الفاتحة", names: { en: "Al-Fatiha", bn: "আল-ফাতিহা", ur: "الفاتحہ", id: "Al-Fatihah", tr: "Fatiha", zh: "开端章", ja: "開端" }, revelationType: "Meccan" },
  { number: 2, ayahCount: 286, arabicName: "البقرة", names: { en: "Al-Baqarah", bn: "আল-বাকারা", ur: "البقرہ", id: "Al-Baqarah", tr: "Bakara", zh: "黄牛", ja: "雌牛" }, revelationType: "Medinan" },
  { number: 3, ayahCount: 200, arabicName: "آل عمران", names: { en: "Ali 'Imran", bn: "আলে ইমরান", ur: "آل عمران", id: "Ali 'Imran", tr: "Al-i İmran", zh: "仪姆兰的家属", ja: "イムラーン家" }, revelationType: "Medinan" },
  { number: 4, ayahCount: 176, arabicName: "النساء", names: { en: "An-Nisa", bn: "আন-নিসা", ur: "النساء", id: "An-Nisa'", tr: "Nisa", zh: "妇女", ja: "婦人" }, revelationType: "Medinan" },
  { number: 5, ayahCount: 120, arabicName: "المائدة", names: { en: "Al-Ma'idah", bn: "আল-মায়িদাহ", ur: "المائدہ", id: "Al-Ma'idah", tr: "Maide", zh: "筵席", ja: "食卓" }, revelationType: "Medinan" },
  { number: 6, ayahCount: 165, arabicName: "الأنعام", names: { en: "Al-An'am", bn: "আল-আনআম", ur: "الانعام", id: "Al-An'am", tr: "En'am", zh: "牲畜", ja: "家畜" }, revelationType: "Meccan" },
  { number: 7, ayahCount: 206, arabicName: "الأعراف", names: { en: "Al-A'raf", bn: "আল-আরাফ", ur: "الاعراف", id: "Al-A'raf", tr: "A'raf", zh: "高处", ja: "高壁" }, revelationType: "Meccan" },
  { number: 8, ayahCount: 75, arabicName: "الأنفال", names: { en: "Al-Anfal", bn: "আল-আনফাল", ur: "الانفال", id: "Al-Anfal", tr: "Enfal", zh: "战利品", ja: "戦利品" }, revelationType: "Medinan" },
  { number: 9, ayahCount: 129, arabicName: "التوبة", names: { en: "At-Tawbah", bn: "আত-তাওবাহ", ur: "التوبہ", id: "At-Taubah", tr: "Tevbe", zh: "忏悔", ja: "悔悟" }, revelationType: "Medinan" },
  { number: 10, ayahCount: 109, arabicName: "يونس", names: { en: "Yunus", bn: "ইউনুস", ur: "یونس", id: "Yunus", tr: "Yunus", zh: "优努斯", ja: "ユーヌス" }, revelationType: "Meccan" },
  { number: 11, ayahCount: 123, arabicName: "هود", names: { en: "Hud", bn: "হুদ", ur: "ہود", id: "Hud", tr: "Hud", zh: "呼德", ja: "フード" }, revelationType: "Meccan" },
  { number: 12, ayahCount: 111, arabicName: "يوسف", names: { en: "Yusuf", bn: "ইউসুফ", ur: "یوسف", id: "Yusuf", tr: "Yusuf", zh: "优素福", ja: "ユースフ" }, revelationType: "Meccan" },
  { number: 13, ayahCount: 43, arabicName: "الرعد", names: { en: "Ar-Ra'd", bn: "আর-রাদ", ur: "الرعد", id: "Ar-Ra'd", tr: "Ra'd", zh: "雷霆", ja: "雷電" }, revelationType: "Medinan" },
  { number: 14, ayahCount: 52, arabicName: "إبراهيم", names: { en: "Ibrahim", bn: "ইবরাহীম", ur: "ابراہیم", id: "Ibrahim", tr: "İbrahim", zh: "易卜拉欣", ja: "イブラーヒーム" }, revelationType: "Meccan" },
  { number: 15, ayahCount: 99, arabicName: "الحجر", names: { en: "Al-Hijr", bn: "আল-হিজর", ur: "الحجر", id: "Al-Hijr", tr: "Hicr", zh: "石谷", ja: "アル・ヒジュル" }, revelationType: "Meccan" },
  { number: 16, ayahCount: 128, arabicName: "النحل", names: { en: "An-Nahl", bn: "আন-নাহল", ur: "النحل", id: "An-Nahl", tr: "Nahl", zh: "蜜蜂", ja: "蜜蜂" }, revelationType: "Meccan" },
  { number: 17, ayahCount: 111, arabicName: "الإسراء", names: { en: "Al-Isra", bn: "বনী-ইসরাঈল", ur: "بنی اسرائیل", id: "Al-Isra'", tr: "İsra", zh: "夜行", ja: "夜の旅" }, revelationType: "Meccan" },
  { number: 18, ayahCount: 110, arabicName: "الكهف", names: { en: "Al-Kahf", bn: "আল-কাহফ", ur: "الکہف", id: "Al-Kahf", tr: "Kehf", zh: "山洞", ja: "洞窟" }, revelationType: "Meccan" },
  { number: 19, ayahCount: 98, arabicName: "مريم", names: { en: "Maryam", bn: "মারইয়াম", ur: "مریم", id: "Maryam", tr: "Meryem", zh: "麦尔彦", ja: "マルヤム" }, revelationType: "Meccan" },
  { number: 20, ayahCount: 135, arabicName: "طه", names: { en: "Taha", bn: "তা-হা", ur: "طہ", id: "Taha", tr: "Taha", zh: "塔哈", ja: "ター・ハー" }, revelationType: "Meccan" },
  { number: 21, ayahCount: 112, arabicName: "الأنبياء", names: { en: "Al-Anbiya", bn: "আল-আম্বিয়া", ur: "الانبیاء", id: "Al-Anbiya'", tr: "Enbiya", zh: "众先知", ja: "預言者" }, revelationType: "Meccan" },
  { number: 22, ayahCount: 78, arabicName: "الحج", names: { en: "Al-Hajj", bn: "আল-হজ্জ", ur: "الحج", id: "Al-Hajj", tr: "Hac", zh: "朝觐", ja: "巡礼" }, revelationType: "Medinan" },
  { number: 23, ayahCount: 118, arabicName: "المؤمنون", names: { en: "Al-Mu'minun", bn: "আল-মুমিনুন", ur: "المؤمنون", id: "Al-Mu'minun", tr: "Mü'minun", zh: "信士", ja: "信者たち" }, revelationType: "Meccan" },
  { number: 24, ayahCount: 64, arabicName: "النور", names: { en: "An-Nur", bn: "আন-নূর", ur: "النور", id: "An-Nur", tr: "Nur", zh: "光明", ja: "御光" }, revelationType: "Medinan" },
  { number: 25, ayahCount: 77, arabicName: "الفرقان", names: { en: "Al-Furqan", bn: "আল-ফুরকান", ur: "الفرقان", id: "Al-Furqan", tr: "Furkan", zh: "准则", ja: "識別" }, revelationType: "Meccan" },
  { number: 26, ayahCount: 227, arabicName: "الشعراء", names: { en: "Ash-Shu'ara", bn: "আশ-শুআরা", ur: "الشعراء", id: "Asy-Syu'ara'", tr: "Şuara", zh: "众诗人", ja: "詩人たち" }, revelationType: "Meccan" },
  { number: 27, ayahCount: 93, arabicName: "النمل", names: { en: "An-Naml", bn: "আন-নামল", ur: "النمل", id: "An-Naml", tr: "Neml", zh: "蚂蚁", ja: "蟻" }, revelationType: "Meccan" },
  { number: 28, ayahCount: 88, arabicName: "القصص", names: { en: "Al-Qasas", bn: "আল-কাসাস", ur: "القصص", id: "Al-Qasas", tr: "Kasas", zh: "故事", ja: "物語" }, revelationType: "Meccan" },
  { number: 29, ayahCount: 69, arabicName: "العنكبوت", names: { en: "Al-Ankabut", bn: "আল-আনকাবুত", ur: "العنکبوت", id: "Al-'Ankabut", tr: "Ankebut", zh: "蜘蛛", ja: "蜘蛛" }, revelationType: "Meccan" },
  { number: 30, ayahCount: 60, arabicName: "الروم", names: { en: "Ar-Rum", bn: "আর-রুম", ur: "الروم", id: "Ar-Rum", tr: "Rum", zh: "罗马人", ja: "ビザンチン" }, revelationType: "Meccan" },
  { number: 31, ayahCount: 34, arabicName: "لقمان", names: { en: "Luqman", bn: "লুকমান", ur: "لقمان", id: "Luqman", tr: "Lokman", zh: "鲁格曼", ja: "ルクマーン" }, revelationType: "Meccan" },
  { number: 32, ayahCount: 30, arabicName: "السجدة", names: { en: "As-Sajdah", bn: "আস-সাজদাহ", ur: "السجدہ", id: "As-Sajdah", tr: "Secde", zh: "叩头", ja: "アッ・サジダ" }, revelationType: "Meccan" },
  { number: 33, ayahCount: 73, arabicName: "الأحزاب", names: { en: "Al-Ahzab", bn: "আল-আহযাব", ur: "الاحزاب", id: "Al-Ahzab", tr: "Ahzab", zh: "同盟军", ja: "部族連合" }, revelationType: "Medinan" },
  { number: 34, ayahCount: 54, arabicName: "سبأ", names: { en: "Saba", bn: "সাবা", ur: "سبا", id: "Saba'", tr: "Sebe", zh: "赛伯邑", ja: "サバア" }, revelationType: "Meccan" },
  { number: 35, ayahCount: 45, arabicName: "فاطر", names: { en: "Fatir", bn: "ফাতির", ur: "فاطر", id: "Fatir", tr: "Fatır", zh: "创造者", ja: "創造者" }, revelationType: "Meccan" },
  { number: 36, ayahCount: 83, arabicName: "يس", names: { en: "Ya-Sin", bn: "ইয়াসীন", ur: "یس", id: "Ya Sin", tr: "Yasin", zh: "雅辛", ja: "ヤー・スィーン" }, revelationType: "Meccan" },
  { number: 37, ayahCount: 182, arabicName: "الصافات", names: { en: "As-Saffat", bn: "আস-সাফফাত", ur: "الصافات", id: "As-Saffat", tr: "Saffat", zh: "列班者", ja: "整列者" }, revelationType: "Meccan" },
  { number: 38, ayahCount: 88, arabicName: "ص", names: { en: "Sad", bn: "সোয়াদ", ur: "ص", id: "Sad", tr: "Sad", zh: "萨德", ja: "サード" }, revelationType: "Meccan" },
  { number: 39, ayahCount: 75, arabicName: "الزمر", names: { en: "Az-Zumar", bn: "আয-যুমার", ur: "الزمر", id: "Az-Zumar", tr: "Zümer", zh: "队伍", ja: "集団" }, revelationType: "Meccan" },
  { number: 40, ayahCount: 85, arabicName: "غافر", names: { en: "Ghafir", bn: "গাফির", ur: "غافر", id: "Gafir", tr: "Mü'min", zh: "赦宥者", ja: "ガーフィル" }, revelationType: "Meccan" },
  { number: 41, ayahCount: 54, arabicName: "فصلت", names: { en: "Fussilat", bn: "ফুসসিলাত", ur: "فصلت", id: "Fussilat", tr: "Fussilet", zh: "奉绥来特", ja: "フッスィラ" }, revelationType: "Meccan" },
  { number: 42, ayahCount: 53, arabicName: "الشورى", names: { en: "Ash-Shuraa", bn: "আশ-শূরা", ur: "الشوری", id: "Asy-Syura", tr: "Şura", zh: "协商", ja: "相談" }, revelationType: "Meccan" },
  { number: 43, ayahCount: 89, arabicName: "الزخرف", names: { en: "Az-Zukhruf", bn: "আয-যুখরুফ", ur: "الزخرف", id: "Az-Zukhruf", tr: "Zuhruf", zh: "金饰", ja: "金の装飾" }, revelationType: "Meccan" },
  { number: 44, ayahCount: 59, arabicName: "الدخان", names: { en: "Ad-Dukhan", bn: "আদ-দুখান", ur: "الدخان", id: "Ad-Dukhan", tr: "Duhan", zh: "烟雾", ja: "煙霧" }, revelationType: "Meccan" },
  { number: 45, ayahCount: 37, arabicName: "الجاثية", names: { en: "Al-Jathiyah", bn: "আল-জাসিয়াহ", ur: "الجاثیہ", id: "Al-Jasiyah", tr: "Casiye", zh: "屈膝", ja: "跪く時" }, revelationType: "Meccan" },
  { number: 46, ayahCount: 35, arabicName: "الأحقاف", names: { en: "Al-Ahqaf", bn: "আল-আহক্বাফ", ur: "الاحقاف", id: "Al-Ahqaf", tr: "Ahkaf", zh: "沙丘", ja: "砂丘" }, revelationType: "Meccan" },
  { number: 47, ayahCount: 38, arabicName: "محمد", names: { en: "Muhammad", bn: "মুহাম্মাদ", ur: "محمد", id: "Muhammad", tr: "Muhammed", zh: "穆罕默德", ja: "ムハンマド" }, revelationType: "Medinan" },
  { number: 48, ayahCount: 29, arabicName: "الفتح", names: { en: "Al-Fath", bn: "আল-ফাতহ", ur: "الفتح", id: "Al-Fath", tr: "Fetih", zh: "胜利", ja: "勝利" }, revelationType: "Medinan" },
  { number: 49, ayahCount: 18, arabicName: "الحجرات", names: { en: "Al-Hujurat", bn: "আল-হুজুরাত", ur: "الحجرات", id: "Al-Hujurat", tr: "Hucurat", zh: "寝室", ja: "部屋" }, revelationType: "Medinan" },
  { number: 50, ayahCount: 45, arabicName: "ق", names: { en: "Qaf", bn: "কাফ", ur: "ق", id: "Qaf", tr: "Kaf", zh: "戛弗", ja: "カーフ" }, revelationType: "Meccan" },
  { number: 51, ayahCount: 60, arabicName: "الذاريات", names: { en: "Adh-Dhariyat", bn: "আয-যারিয়াত", ur: "الذاریات", id: "Az-Zariyat", tr: "Zariyat", zh: "播种者", ja: "撒き散らすもの" }, revelationType: "Meccan" },
  { number: 52, ayahCount: 49, arabicName: "الطور", names: { en: "At-Tur", bn: "আত-তূর", ur: "الطور", id: "At-Tur", tr: "Tur", zh: "山岳", ja: "山" }, revelationType: "Meccan" },
  { number: 53, ayahCount: 62, arabicName: "النجم", names: { en: "An-Najm", bn: "আন-নাজম", ur: "النجم", id: "An-Najm", tr: "Necm", zh: "星宿", ja: "星" }, revelationType: "Meccan" },
  { number: 54, ayahCount: 55, arabicName: "القمر", names: { en: "Al-Qamar", bn: "আল-ক্বামার", ur: "القمر", id: "Al-Qamar", tr: "Kamer", zh: "月亮", ja: "月" }, revelationType: "Meccan" },
  { number: 55, ayahCount: 78, arabicName: "الرحمن", names: { en: "Ar-Rahman", bn: "আর-রহমান", ur: "الرحمن", id: "Ar-Rahman", tr: "Rahman", zh: "至仁主", ja: "慈悲あまねく御方" }, revelationType: "Medinan" },
  { number: 56, ayahCount: 96, arabicName: "الواقعة", names: { en: "Al-Waqi'ah", bn: "আল-ওয়াকিআহ", ur: "الواقعہ", id: "Al-Waqi'ah", tr: "Vakıa", zh: "大事", ja: "出来事" }, revelationType: "Meccan" },
  { number: 57, ayahCount: 29, arabicName: "الحديد", names: { en: "Al-Hadid", bn: "আল-হাদীদ", ur: "الحدید", id: "Al-Hadid", tr: "Hadid", zh: "铁", ja: "鉄" }, revelationType: "Medinan" },
  { number: 58, ayahCount: 22, arabicName: "المجادلة", names: { en: "Al-Mujadila", bn: "আল-মুজাদালাহ", ur: "المجادلہ", id: "Al-Mujadalah", tr: "Mücadele", zh: "辩诉者", ja: "抗弁する女" }, revelationType: "Medinan" },
  { number: 59, ayahCount: 24, arabicName: "الحشر", names: { en: "Al-Hashr", bn: "আল-হাশর", ur: "الحشر", id: "Al-Hasyr", tr: "Haşr", zh: "放逐", ja: "集合" }, revelationType: "Medinan" },
  { number: 60, ayahCount: 13, arabicName: "الممتحنة", names: { en: "Al-Mumtahanah", bn: "আল-মুমতাহিনাহ", ur: "الممتحنہ", id: "Al-Mumtahanah", tr: "Mümtehine", zh: "受考验的妇人", ja: "試問される女" }, revelationType: "Medinan" },
  { number: 61, ayahCount: 14, arabicName: "الصف", names: { en: "As-Saf", bn: "আস-সাফ", ur: "الصف", id: "As-Saff", tr: "Saf", zh: "列阵", ja: "戦列" }, revelationType: "Medinan" },
  { number: 62, ayahCount: 11, arabicName: "الجمعة", names: { en: "Al-Jumu'ah", bn: "আল-জুমুআহ", ur: "الجمعہ", id: "Al-Jumu'ah", tr: "Cuma", zh: "聚礼", ja: "合同礼拝" }, revelationType: "Medinan" },
  { number: 63, ayahCount: 11, arabicName: "المنافقون", names: { en: "Al-Munafiqun", bn: "আল-মুনাফিকুন", ur: "المنافقون", id: "Al-Munafiqun", tr: "Münafikun", zh: "伪信者", ja: "偽信者たち" }, revelationType: "Medinan" },
  { number: 64, ayahCount: 18, arabicName: "التغابن", names: { en: "At-Taghabun", bn: "আত-তাগাবুন", ur: "التغابن", id: "At-Tagabun", tr: "Tegabün", zh: "相欺", ja: "騙し合い" }, revelationType: "Medinan" },
  { number: 65, ayahCount: 12, arabicName: "الطلاق", names: { en: "At-Talaq", bn: "আত-তালাক", ur: "الطلاق", id: "At-Talaq", tr: "Talak", zh: "离婚", ja: "離婚" }, revelationType: "Medinan" },
  { number: 66, ayahCount: 12, arabicName: "التحريم", names: { en: "At-Tahrim", bn: "আত-তাহরীম", ur: "التحریم", id: "At-Tahrim", tr: "Tahrim", zh: "禁戒", ja: "禁止" }, revelationType: "Medinan" },
  { number: 67, ayahCount: 30, arabicName: "الملك", names: { en: "Al-Mulk", bn: "আল-মুলক", ur: "الملک", id: "Al-Mulk", tr: "Mülk", zh: "国权", ja: "大権" }, revelationType: "Meccan" },
  { number: 68, ayahCount: 52, arabicName: "القلم", names: { en: "Al-Qalam", bn: "আল-কলম", ur: "القلم", id: "Al-Qalam", tr: "Kalem", zh: "笔", ja: "筆" }, revelationType: "Meccan" },
  { number: 69, ayahCount: 52, arabicName: "الحاقة", names: { en: "Al-Haqqah", bn: "আল-হাক্কাহ", ur: "الحاقہ", id: "Al-Haqqah", tr: "Hakka", zh: "真灾", ja: "真実" }, revelationType: "Meccan" },
  { number: 70, ayahCount: 44, arabicName: "المعارج", names: { en: "Al-Ma'arij", bn: "আল-মাআরিজ", ur: "المعارج", id: "Al-Ma'arij", tr: "Mearic", zh: "天梯", ja: "階段" }, revelationType: "Meccan" },
  { number: 71, ayahCount: 28, arabicName: "نوح", names: { en: "Nuh", bn: "নূহ", ur: "نوح", id: "Nuh", tr: "Nuh", zh: "努哈", ja: "ヌーフ" }, revelationType: "Meccan" },
  { number: 72, ayahCount: 28, arabicName: "الجن", names: { en: "Al-Jinn", bn: "আল-জিন", ur: "الجن", id: "Al-Jinn", tr: "Cin", zh: "精灵", ja: "ジン" }, revelationType: "Meccan" },
  { number: 73, ayahCount: 20, arabicName: "المزمل", names: { en: "Al-Muzzammil", bn: "আল-মুযযাম্মিল", ur: "المزمل", id: "Al-Muzzammil", tr: "Müzzemmil", zh: "披衣的人", ja: "衣を纏う者" }, revelationType: "Meccan" },
  { number: 74, ayahCount: 56, arabicName: "المدثر", names: { en: "Al-Muddathir", bn: "আল-মুদ্দাসসির", ur: "المدثر", id: "Al-Muddassir", tr: "Müddessir", zh: "盖被的人", ja: "包まる者" }, revelationType: "Meccan" },
  { number: 75, ayahCount: 40, arabicName: "القيامة", names: { en: "Al-Qiyamah", bn: "আল-কিয়ামাহ", ur: "القیامہ", id: "Al-Qiyamah", tr: "Kıyame", zh: "复活", ja: "復活" }, revelationType: "Meccan" },
  { number: 76, ayahCount: 31, arabicName: "الإنسان", names: { en: "Al-Insan", bn: "আল-ইনসান", ur: "الانسان", id: "Al-Insan", tr: "İnsan", zh: "人", ja: "人間" }, revelationType: "Medinan" },
  { number: 77, ayahCount: 50, arabicName: "المرسلات", names: { en: "Al-Mursalat", bn: "আল-মুরসালাত", ur: "المرسلات", id: "Al-Mursalat", tr: "Mürselat", zh: "天使", ja: "送られるもの" }, revelationType: "Meccan" },
  { number: 78, ayahCount: 40, arabicName: "النبأ", names: { en: "An-Naba", bn: "আন-নাবা", ur: "النبا", id: "An-Naba'", tr: "Nebe", zh: "消息", ja: "知らせ" }, revelationType: "Meccan" },
  { number: 79, ayahCount: 46, arabicName: "النازعات", names: { en: "An-Nazi'at", bn: "আন-নাযিআত", ur: "النازعات", id: "An-Nazi'at", tr: "Naziat", zh: "急掣的", ja: "引き抜く者" }, revelationType: "Meccan" },
  { number: 80, ayahCount: 42, arabicName: "عبس", names: { en: "Abasa", bn: "আবাসা", ur: "عبس", id: "'Abasa", tr: "Abese", zh: "皱眉", ja: "眉をひそめて" }, revelationType: "Meccan" },
  { number: 81, ayahCount: 29, arabicName: "التكوير", names: { en: "At-Takwir", bn: "আত-তাকবীর", ur: "التکویر", id: "At-Takwir", tr: "Tekvir", zh: "黯黮", ja: "巻き上げる" }, revelationType: "Meccan" },
  { number: 82, ayahCount: 19, arabicName: "الانفطار", names: { en: "Al-Infitar", bn: "আল-ইনফিতার", ur: "الانفطار", id: "Al-Infitar", tr: "İnfitar", zh: "破裂", ja: "裂ける" }, revelationType: "Meccan" },
  { number: 83, ayahCount: 36, arabicName: "المطففين", names: { en: "Al-Mutaffifin", bn: "আল-মুতাফফিফীন", ur: "المطففین", id: "Al-Mutaffifin", tr: "Mutaffifin", zh: "称量不公", ja: "量を減らす者" }, revelationType: "Meccan" },
  { number: 84, ayahCount: 25, arabicName: "الانشقاق", names: { en: "Al-Inshiqaq", bn: "আল-ইনশিকাক", ur: "الانشقاق", id: "Al-Insyiqaq", tr: "İnşikak", zh: "绽裂", ja: "割れる" }, revelationType: "Meccan" },
  { number: 85, ayahCount: 22, arabicName: "البروج", names: { en: "Al-Buruj", bn: "আল-বুরুজ", ur: "البروج", id: "Al-Buruj", tr: "Büruc", zh: "十二宫", ja: "星座" }, revelationType: "Meccan" },
  { number: 86, ayahCount: 17, arabicName: "الطارق", names: { en: "At-Tariq", bn: "আত-তারিক", ur: "الطارق", id: "At-Tariq", tr: "Tarık", zh: "启明星", ja: "夜訪ねる者" }, revelationType: "Meccan" },
  { number: 87, ayahCount: 19, arabicName: "الأعلى", names: { en: "Al-A'la", bn: "আল-আলা", ur: "الاعلی", id: "Al-A'la", tr: "A'la", zh: "至尊", ja: "至高" }, revelationType: "Meccan" },
  { number: 88, ayahCount: 26, arabicName: "الغاشية", names: { en: "Al-Ghashiyah", bn: "আল-গাশিয়াহ", ur: "الغاشیہ", id: "Al-Gasiyah", tr: "Gaşiye", zh: "大灾", ja: "覆いかぶさるもの" }, revelationType: "Meccan" },
  { number: 89, ayahCount: 30, arabicName: "الفجر", names: { en: "Al-Fajr", bn: "আল-ফাজর", ur: "الفجر", id: "Al-Fajr", tr: "Fecr", zh: "黎明", ja: "暁" }, revelationType: "Meccan" },
  { number: 90, ayahCount: 20, arabicName: "البلد", names: { en: "Al-Balad", bn: "আল-বালাদ", ur: "البلد", id: "Al-Balad", tr: "Beled", zh: "地方", ja: "町" }, revelationType: "Meccan" },
  { number: 91, ayahCount: 15, arabicName: "الشمس", names: { en: "Ash-Shams", bn: "আশ-শামস", ur: "الشمس", id: "Asy-Syams", tr: "Şems", zh: "太阳", ja: "太陽" }, revelationType: "Meccan" },
  { number: 92, ayahCount: 21, arabicName: "الليل", names: { en: "Al-Layl", bn: "আল-লাইল", ur: "اللیل", id: "Al-Lail", tr: "Leyl", zh: "黑夜", ja: "夜" }, revelationType: "Meccan" },
  { number: 93, ayahCount: 11, arabicName: "الضحى", names: { en: "Ad-Duhaa", bn: "আদ-দুহা", ur: "الضحی", id: "Ad-Duha", tr: "Duha", zh: "上午", ja: "朝" }, revelationType: "Meccan" },
  { number: 94, ayahCount: 8, arabicName: "الشرح", names: { en: "Ash-Sharh", bn: "আশ-শারহ", ur: "الشرح", id: "Asy-Syarh", tr: "İnşirah", zh: "开拓", ja: "胸を広げる" }, revelationType: "Meccan" },
  { number: 95, ayahCount: 8, arabicName: "التين", names: { en: "At-Tin", bn: "আত-তীন", ur: "التین", id: "At-Tin", tr: "Tin", zh: "无花果", ja: "無花果" }, revelationType: "Meccan" },
  { number: 96, ayahCount: 19, arabicName: "العلق", names: { en: "Al-Alaq", bn: "আল-আলাক", ur: "العلق", id: "Al-'Alaq", tr: "Alak", zh: "血块", ja: "凝血" }, revelationType: "Meccan" },
  { number: 97, ayahCount: 5, arabicName: "القدر", names: { en: "Al-Qadr", bn: "আল-ক্বদর", ur: "القدر", id: "Al-Qadr", tr: "Kadir", zh: "高贵", ja: "天命" }, revelationType: "Meccan" },
  { number: 98, ayahCount: 8, arabicName: "البينة", names: { en: "Al-Bayyinah", bn: "আল-বাইয়্যিনাহ", ur: "البینہ", id: "Al-Bayyinah", tr: "Beyyine", zh: "明证", ja: "明証" }, revelationType: "Medinan" },
  { number: 99, ayahCount: 8, arabicName: "الزلزلة", names: { en: "Az-Zalzalah", bn: "আয-যালযালাহ", ur: "الزلزال", id: "Az-Zalzalah", tr: "Zilzal", zh: "地震", ja: "地震" }, revelationType: "Medinan" },
  { number: 100, ayahCount: 11, arabicName: "العاديات", names: { en: "Al-Adiyat", bn: "আল-আদিয়াত", ur: "العادیات", id: "Al-'Adiyat", tr: "Adiyat", zh: "奔驰的马队", ja: "進撃する馬" }, revelationType: "Meccan" },
  { number: 101, ayahCount: 11, arabicName: "القارعة", names: { en: "Al-Qari'ah", bn: "আল-ক্বারিআহ", ur: "القارعہ", id: "Al-Qari'ah", tr: "Karia", zh: "大难", ja: "大打撃" }, revelationType: "Meccan" },
  { number: 102, ayahCount: 8, arabicName: "التكاثر", names: { en: "At-Takathur", bn: "আত-তাকাসুর", ur: "التکاثر", id: "At-Takasur", tr: "Tekasür", zh: "竞赛富遮", ja: "数の競い合い" }, revelationType: "Meccan" },
  { number: 103, ayahCount: 3, arabicName: "العصر", names: { en: "Al-Asr", bn: "আল-আসর", ur: "العصر", id: "Al-'Asr", tr: "Asr", zh: "时光", ja: "時間" }, revelationType: "Meccan" },
  { number: 104, ayahCount: 9, arabicName: "الهمزة", names: { en: "Al-Humazah", bn: "আল-হুমাযাহ", ur: "الھمزہ", id: "Al-Humazah", tr: "Hümeze", zh: "诽谤者", ja: "中傷する者" }, revelationType: "Meccan" },
  { number: 105, ayahCount: 5, arabicName: "الفيل", names: { en: "Al-Fil", bn: "আল-ফীল", ur: "الفیل", id: "Al-Fil", tr: "Fil", zh: "象", ja: "象" }, revelationType: "Meccan" },
  { number: 106, ayahCount: 4, arabicName: "قريش", names: { en: "Quraysh", bn: "কুরাইশ", ur: "قریش", id: "Quraisy", tr: "Kureyş", zh: "古来氏", ja: "クライシュ族" }, revelationType: "Meccan" },
  { number: 107, ayahCount: 7, arabicName: "الماعون", names: { en: "Al-Ma'un", bn: "আল-মাউন", ur: "الماعون", id: "Al-Ma'un", tr: "Maun", zh: "什物", ja: "慈善" }, revelationType: "Meccan" },
  { number: 108, ayahCount: 3, arabicName: "الكوثر", names: { en: "Al-Kawthar", bn: "আল-কাওসার", ur: "الکوثر", id: "Al-Kausar", tr: "Kevser", zh: "多福", ja: "豊潤" }, revelationType: "Meccan" },
  { number: 109, ayahCount: 6, arabicName: "الكافرون", names: { en: "Al-Kafirun", bn: "আল-কাফিরুন", ur: "الکافرون", id: "Al-Kafirun", tr: "Kafirun", zh: "不信道的人们", ja: "背信者たち" }, revelationType: "Meccan" },
  { number: 110, ayahCount: 3, arabicName: "النصر", names: { en: "An-Nasr", bn: "আন-নাসর", ur: "النصر", id: "An-Nasr", tr: "Nasr", zh: "援助", ja: "援助" }, revelationType: "Medinan" },
  { number: 111, ayahCount: 5, arabicName: "المسد", names: { en: "Al-Masad", bn: "আল-মাসাদ", ur: "المسد", id: "Al-Lahab", tr: "Tebbet", zh: "火焰", ja: "棕櫚" }, revelationType: "Meccan" },
  { number: 112, ayahCount: 4, arabicName: "الإخلاص", names: { en: "Al-Ikhlas", bn: "আল-ইখলাস", ur: "الاخلاص", id: "Al-Ikhlas", tr: "İhlas", zh: "忠诚", ja: "純正" }, revelationType: "Meccan" },
  { number: 113, ayahCount: 5, arabicName: "الفلق", names: { en: "Al-Falaq", bn: "আল-ফালাক", ur: "الفلق", id: "Al-Falaq", tr: "Felak", zh: "曙光", ja: "黎明" }, revelationType: "Meccan" },
  { number: 114, ayahCount: 6, arabicName: "الناس", names: { en: "An-Nas", bn: "আন-নাস", ur: "الناس", id: "An-Nas", tr: "Nas", zh: "世人", ja: "人々" }, revelationType: "Meccan" }
];

// Juz (Para) Data
const JUZ_DATA = [
  { number: 1, startSurah: 1, startAyah: 1, endSurah: 2, endAyah: 141 },
  { number: 2, startSurah: 2, startAyah: 142, endSurah: 2, endAyah: 252 },
  { number: 3, startSurah: 2, startAyah: 253, endSurah: 3, endAyah: 92 },
  { number: 4, startSurah: 3, startAyah: 93, endSurah: 4, endAyah: 23 },
  { number: 5, startSurah: 4, startAyah: 24, endSurah: 4, endAyah: 147 },
  { number: 6, startSurah: 4, startAyah: 148, endSurah: 5, endAyah: 81 },
  { number: 7, startSurah: 5, startAyah: 82, endSurah: 6, endAyah: 110 },
  { number: 8, startSurah: 6, startAyah: 111, endSurah: 7, endAyah: 87 },
  { number: 9, startSurah: 7, startAyah: 88, endSurah: 8, endAyah: 40 },
  { number: 10, startSurah: 8, startAyah: 41, endSurah: 9, endAyah: 92 },
  { number: 11, startSurah: 9, startAyah: 93, endSurah: 11, endAyah: 5 },
  { number: 12, startSurah: 11, startAyah: 6, endSurah: 12, endAyah: 52 },
  { number: 13, startSurah: 12, startAyah: 53, endSurah: 14, endAyah: 52 },
  { number: 14, startSurah: 15, startAyah: 1, endSurah: 16, endAyah: 128 },
  { number: 15, startSurah: 17, startAyah: 1, endSurah: 18, endAyah: 74 },
  { number: 16, startSurah: 18, startAyah: 75, endSurah: 20, endAyah: 135 },
  { number: 17, startSurah: 21, startAyah: 1, endSurah: 22, endAyah: 78 },
  { number: 18, startSurah: 23, startAyah: 1, endSurah: 25, endAyah: 20 },
  { number: 19, startSurah: 25, startAyah: 21, endSurah: 27, endAyah: 55 },
  { number: 20, startSurah: 27, startAyah: 56, endSurah: 29, endAyah: 45 },
  { number: 21, startSurah: 29, startAyah: 46, endSurah: 33, endAyah: 30 },
  { number: 22, startSurah: 33, startAyah: 31, endSurah: 36, endAyah: 27 },
  { number: 23, startSurah: 36, startAyah: 28, endSurah: 39, endAyah: 31 },
  { number: 24, startSurah: 39, startAyah: 32, endSurah: 41, endAyah: 46 },
  { number: 25, startSurah: 41, startAyah: 47, endSurah: 45, endAyah: 37 },
  { number: 26, startSurah: 46, startAyah: 1, endSurah: 51, endAyah: 30 },
  { number: 27, startSurah: 51, startAyah: 31, endSurah: 57, endAyah: 29 },
  { number: 28, startSurah: 58, startAyah: 1, endSurah: 66, endAyah: 12 },
  { number: 29, startSurah: 67, startAyah: 1, endSurah: 77, endAyah: 50 },
  { number: 30, startSurah: 78, startAyah: 1, endSurah: 114, endAyah: 6 }
];

/**
 * Get Surah by number
 * @param {number} surahNumber
 * @returns {object|null}
 */
function getSurahByNumber(surahNumber) {
  return SURAH_DATA.find(s => s.number === surahNumber) || null;
}

/**
 * Get Surah name in specific language
 * @param {number} surahNumber
 * @param {string} lang
 * @returns {string}
 */
function getSurahName(surahNumber, lang = 'en') {
  const surah = getSurahByNumber(surahNumber);
  if (!surah) return '';
  return surah.names[lang] || surah.names.en;
}

/**
 * Get formatted Surah option text
 * @param {object} surah
 * @param {string} lang
 * @returns {string}
 */
function formatSurahOption(surah, lang = 'en') {
  const name = surah.names[lang] || surah.names.en;
  return `${surah.number}. ${name} (${surah.arabicName}) : ${surah.ayahCount} Ayahs`;
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SURAH_DATA, JUZ_DATA, getSurahByNumber, getSurahName, formatSurahOption };
}
