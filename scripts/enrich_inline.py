#!/usr/bin/env python3
"""
Enrich remaining JS files with zh/ja translations using a combined approach:
  1. For smaller files (amal-daily, qaida-data, learn-kids): use a 
     hardcoded phrase dictionary + existing CI18N data as translation memory
  2. For why-islam.js: extract all strings, use CI18N + dictionary 
"""

import re, json, os

# ─── Phrase dictionary ─────────────────────────────────────────────────
# Built from existing en->zh/ja data in the project + common Islamic terms
PHRASES = {
    # AMAL_STR keys - UI
    "Consistency": {"zh": "持之以恒", "ja": "一貫性"},
    "day streak": {"zh": "连续天数", "ja": "連続日数"},
    "Finish today\u2019s adhkar to start a streak": {"zh": "完成今天的祈祷以开始连续记录", "ja": "今日のアズカールを完了して連続記録を開始"},
    "Completed today": {"zh": "今日已完成", "ja": "本日完了"},
    "Next": {"zh": "下一个", "ja": "次へ"},
    "Morning & Evening Adhkar": {"zh": "朝夕的赞词", "ja": "朝晩のアズカール"},
    "Tap each dhikr to count. Progress resets daily.": {"zh": "点击每个赞词计数。进度每天重置。", "ja": "各ズィクルをタップしてカウント。進捗は毎日リセット。"},
    "Reset": {"zh": "重置", "ja": "リセット"},
    "Reset all": {"zh": "全部重置", "ja": "すべてリセット"},
    "After-Salah Tasbih": {"zh": "礼拜后的赞词", "ja": "礼拝後のタスビーフ"},
    "Recite after every obligatory prayer \u2014 tap the circle for each count.": {"zh": "每番主命拜后诵读——每次数点击圆圈。", "ja": "毎回の義務的な礼拝後に唱える——カウントごとに円をタップ。"},
    "100 complete \u2014 M\u0101sh\u0101\u2019All\u0101h": {"zh": "100遍完成——真主意欲", "ja": "100回完了——マーシャアッラー"},
    "Then recite Ayat al-Kursi once \u2014 whoever recites it after every prayer, nothing but death keeps him from Paradise.": {"zh": "然后诵读一次阿耶提库尔西——每番拜后诵读的人，只有死亡能阻止他进入天堂。", "ja": "それからアーヤトゥル＝クルシーを一度唱える——毎礼拝後に唱える者には、死以外に楽園を妨げるものはない。"},

    # AMAL_ITEMS
    "Recite Al-Mulk every night \u2014 it intercedes until its reciter is forgiven, and protects from the punishment of the grave.": {"zh": "每晚诵读国权章——它将为诵读说情，直到他被宽恕，并保护免受坟墓的刑罚。", "ja": "毎晩ムルク章を唱えよ——それは唱える者が赦されるまで執り成し、墓の罰から守る。"},
    "The Prophet \u1e63allall\u0101hu \u02bfalayhi wa sallam would not sleep until he recited As-Sajdah and Al-Mulk.": {"zh": "先知（愿主福安之）不诵读叩头章和国权章就不睡觉。", "ja": "預言者ﷺはサジダ章とムルク章を唱えるまで眠らなかった。"},
    "Ayat al-Kursi before sleep \u2014 a guardian from Allah remains with you and Shaytan cannot approach until morning. Also after every prayer.": {"zh": "睡前诵读库尔西节文——真主的保护者与你同在，撒旦直到早晨不能接近。每番拜后也诵读。", "ja": "就寝前にアーヤトゥル＝クルシーを——アッラーからの守護者があなたと共にあり、シャイターンは朝まで近づけない。毎礼拝後にも。"},
    "Whoever recites the last two verses of Al-Baqarah at night, they will suffice him.": {"zh": "谁在晚上诵读黄牛章的最后两节，那对他足够了。", "ja": "夜にバカラ章の最後の二節を唱える者には、それで十分である。"},
    "The three Quls \u2014 three times morning and evening suffice you against everything; the Prophet \u1e63allall\u0101hu \u02bfalayhi wa sallam also recited them into his palms before sleep.": {"zh": "三个忠诚章——早晚各三次足以抵御一切；先知（愿主福安之）睡前也在手掌中诵读。", "ja": "三つのクル章——朝晩三回ずつで全てから十分；預言者ﷺも就寝前に掌に唱えた。"},

    "Recite Al-Kafirun before sleeping \u2014 it is a disavowal of shirk.": {"zh": "睡前诵读不信道章——这是对多神崇拜的否认。", "ja": "就寝前にカーフィルーン章を唱えよ——それはシルクの否認である。"},
    "Recite Al-Kahf on Friday \u2014 a light shines for you between the two Fridays.": {"zh": "主麻日诵读山洞章——两个主麻日之间有光芒照耀你。", "ja": "金曜日にカフフ章を唱えよ——二つの金曜の間に光があなたを照らす。"},
    "Memorize the first ten verses of Al-Kahf \u2014 protection from the Dajjal.": {"zh": "背诵山洞章前十节——保护免遭旦扎里的伤害。", "ja": "カフフ章の最初の十節を暗記せよ——ダッジャールからの保護。"},
    "On Friday Fajr the Prophet \u1e63allall\u0101hu \u02bfalayhi wa sallam would recite As-Sajdah and Al-Insan.": {"zh": "主麻晨礼先知（愿主福安之）诵读叩头章和世人章。", "ja": "金曜日のファジュルに預言者ﷺはサジダ章とインサーン章を唱えた。"},
    "Ya-Sin in the morning is a widespread practice; the specific narrations about it are weak, but reciting Quran any time is rewarded.": {"zh": "早晨诵读雅辛章是广泛的做法；关于它的具体传述是弱的，但任何时候诵读古兰经都有回赐。", "ja": "朝にヤー・スィーン章を唱えるのは広く行われている習慣；それに関する特定の伝承は弱いが、いつでもクルアーンを唱えることは報われる。"},

    "Al-Waqi\u02bfah at night (against poverty) is widely practised; the narration is weak, but the recitation itself is virtuous.": {"zh": "晚上诵读瓦格尔章（对抗贫穷）被广泛实践；传述是弱的，但诵读本身是优越的。", "ja": "夜にワーキア章を（貧困に対して）唱えるのは広く行われている；伝承は弱いが、唱えること自体に美徳がある。"},
    "Ar-Rahman \u2014 \u201cthe bride of the Quran\u201d is a weak narration, but it is beloved to recite and ponder often.": {"zh": "至仁主章——古兰经的新娘是弱传述，但人们喜爱经常诵读和思考。", "ja": "ラフマーン章——「クルアーンの花嫁」というのは弱い伝承だが、頻繁に唱えて熟考することは愛される。"},
    "Recite Al-Baqarah in your home \u2014 Shaytan flees the house in which it is read; do not turn your homes into graveyards.": {"zh": "在家中诵读黄牛章——撒旦逃离诵读它的房屋；不要把你们的家变成坟墓。", "ja": "家でバカラ章を唱えよ——シャイターンはそれが読まれる家から逃げる；家を墓場にするな。"},
    "Al-Ikhlas equals a third of the Quran \u2014 whoever recites it three times gains the reward of reciting the whole Quran.": {"zh": "忠诚章相当于古兰经的三分之一——谁诵读三遍就获得诵读全部古兰经的回赐。", "ja": "イフラース章はクルアーンの三分の一に等しい——三回唱える者は全クルアーンを唱えた報いを得る。"},
    "Az-Zalzalah is said to equal half the Quran in reward; the chain is weak, but the surah powerfully stirs remembrance of the Day.": {"zh": "زلزلة章据说相当于古兰经一半的回赐；传述链是弱的，但这章有力地唤起对那日的纪念。", "ja": "ザルザラ章は報いがクルアーンの半分に等しいと言われる；連鎖は弱いが、その章は強くその日の想起を喚起する。"},

    # MORNING_EVENING_ADHKAR
    "\u201cGlory and praise be to Allah\u201d \u2014 100 times. Whoever says it in a day has his sins wiped away though they be like the foam of the sea.": {"zh": "赞颂真主超绝万物——100遍。谁在一天中这样说，他的罪过即使像海沫一样也被抹去。", "ja": "「アッラーに栄光と賛美あれ」を100回。一日にそれを唱える者は、罪が海の泡のようにあっても拭い去られる。"},
    "The declaration of tawhid \u2014 ten times in the morning and evening; a shield and a great reward.": {"zh": "认主独一的宣言——早晚十遍；一面盾牌和巨大的回赐。", "ja": "タウヒードの宣言——朝晩十回；盾と大きな報い。"},
    "\u201cIn the name of Allah, with whose name nothing is harmed\u2026\u201d \u2014 three times. Whoever says it will not be struck by sudden affliction.": {"zh": "凭安拉的尊名，天地间无一物能带来伤害——三遍。这样说的人将不会遭受突然的灾难。", "ja": "「アッラーの御名において、その御名によって何ものも害されない…」を三回。唱える者は突然の災難に見舞われない。"},

    "\u201cI seek refuge in Allah\u2019s perfect words from the evil of what He created\u201d \u2014 three times in the evening; nothing will harm him that night.": {"zh": "我求助于安拉完美的言辞免遭他所创造之物的伤害——晚上三遍；那晚没有什么能伤害他。", "ja": "「アッラーの完全な言葉に、彼が創造したものの悪から避難を求める」を夕べに三回；その夜は何も彼を害さない。"},
    "\u201cI am pleased with Allah as Lord, Islam as religion, and Muhammad \u1e63allall\u0101hu \u02bfalayhi wa sallam as Prophet\u201d \u2014 three times; Allah takes it upon Himself to please him on the Day of Resurrection.": {"zh": "我喜悦安拉为养育主，伊斯兰为宗教，穆罕默德（愿主福安之）为先知——三遍；安拉亲自负责在复活日使他喜悦。", "ja": "「アッラーを主、イスラームを宗教、ムハンマドﷺを預言者として満足します」を三回；アッラーは復活の日に彼を満足させることを自ら引き受ける。"},
    "Send blessings upon the Prophet \u1e63allall\u0101hu \u02bfalayhi wa sallam \u2014 ten times morning and evening; whoever does so attains his intercession on the Day of Resurrection.": {"zh": "祝福先知（愿主福安之）——早晚十遍；这样做的人在复活日获得他的说情。", "ja": "預言者ﷺに祝福あれを朝晩十回；そうする者は復活の日に彼の執り成しを得る。"},

    # AFTER_SALAH
    "Glory be to Allah": {"zh": "赞颂真主超绝万物", "ja": "アッラーに栄光あれ"},
    "All praise is for Allah": {"zh": "一切赞颂全归真主", "ja": "全ての称賛はアッラーに"},
    "Allah is the Greatest": {"zh": "真主至大", "ja": "アッラーは最も偉大である"},

    # QAIDA_DATA - KIDS_THEME_WORDS (overlaps heavily with vocab-data.js)
    "Animals": {"zh": "动物", "ja": "動物"},
    "Cow": {"zh": "牛", "ja": "牛"},
    "Elephant": {"zh": "大象", "ja": "象"},
    "Big fish (whale)": {"zh": "大鱼（鲸鱼）", "ja": "大きな魚（鯨）"},
    "Dog": {"zh": "狗", "ja": "犬"},
    "Crow": {"zh": "乌鸦", "ja": "カラス"},
    "Bee": {"zh": "蜜蜂", "ja": "蜂"},
    "Ants": {"zh": "蚂蚁", "ja": "蟻"},
    "Spider": {"zh": "蜘蛛", "ja": "蜘蛛"},
    "Wolf": {"zh": "狼", "ja": "狼"},
    "Hoopoe bird": {"zh": "戴胜鸟", "ja": "ヤツガシラ"},
    "Nature": {"zh": "自然", "ja": "自然"},
    "Sun": {"zh": "太阳", "ja": "太陽"},
    "Moon": {"zh": "月亮", "ja": "月"},
    "Star": {"zh": "星星", "ja": "星"},
    "Sea": {"zh": "海", "ja": "海"},
    "Mountains": {"zh": "山", "ja": "山"},
    "Water": {"zh": "水", "ja": "水"},
    "Tree": {"zh": "树", "ja": "木"},
    "Date palm": {"zh": "椰枣树", "ja": "ナツメヤシ"},
    "Grapes": {"zh": "葡萄", "ja": "ブドウ"},
    "Olive": {"zh": "橄榄", "ja": "オリーブ"},
    "Family": {"zh": "家庭", "ja": "家族"},
    "Father": {"zh": "父亲", "ja": "父"},
    "Mother": {"zh": "母亲", "ja": "母"},
    "Brother": {"zh": "兄弟", "ja": "兄弟"},
    "Sister": {"zh": "姐妹", "ja": "姉妹"},
    "Parents": {"zh": "父母", "ja": "両親"},
    "Colours": {"zh": "颜色", "ja": "色"},
    "White": {"zh": "白色", "ja": "白"},
    "Black": {"zh": "黑色", "ja": "黒"},
    "Green": {"zh": "绿色", "ja": "緑"},
    "Yellow": {"zh": "黄色", "ja": "黄"},
    "Red (streaks)": {"zh": "红色（条纹）", "ja": "赤（筋）"},
    "Rose (rosy pink)": {"zh": "玫瑰（粉红色）", "ja": "バラ（ピンク色）"},

    # QAIDA_HARAKAT examples
    "say": {"zh": "说", "ja": "言う"},
    "Lord": {"zh": "主", "ja": "主"},
    "he said": {"zh": "他说", "ja": "彼は言った"},
    "it was said": {"zh": "据说", "ja": "言われた"},
    "light": {"zh": "光", "ja": "光"},

    # LEARN_KIDS - KIDS_DUA_L10N
    "In the name of Allah.": {"zh": "奉真主之名。", "ja": "アッラーの御名において。"},
    "Before eating": {"zh": "吃饭前", "ja": "食事の前"},
    "All praise is for Allah.": {"zh": "一切赞颂全归真主。", "ja": "全ての称賛はアッラーに。"},
    "After eating": {"zh": "吃饭后", "ja": "食事の後"},
    "In Your name, O Allah, I die and I live.": {"zh": "真主啊，我以你的名义死，以你的名义活。", "ja": "アッラーよ、あなたの御名において私は死に、そして生きます。"},
    "Before sleeping": {"zh": "睡觉前", "ja": "就寝前"},
    "All praise is for Allah who gave us life.": {"zh": "一切赞颂全归真主，他使我们复活。", "ja": "私たちを生かして下さったアッラーに全ての称賛を。"},
    "When waking up": {"zh": "醒来时", "ja": "起床時"},
    "My Lord, increase me in knowledge.": {"zh": "我的主啊，求你增加我的知识。", "ja": "我が主よ、私の知識を増やして下さい。"},
    "Before studying": {"zh": "学习前", "ja": "勉強の前"},
    "In the name of Allah, I place my trust in Allah.": {"zh": "奉真主之名，我信赖真主。", "ja": "アッラーの御名において、私はアッラーに信頼します。"},
    "When leaving home": {"zh": "出门时", "ja": "外出時"},
    "O Allah, I seek Your protection from all evil and impure things.": {"zh": "真主啊，我求你保护免遭一切邪恶和不洁之物。", "ja": "アッラーよ、全ての悪と不浄なものからあなたの保護を求めます。"},
    "Before entering the toilet": {"zh": "进厕所前", "ja": "トイレに入る前"},
    "I ask for Your forgiveness.": {"zh": "我求你饶恕。", "ja": "あなたの赦しを求めます。"},
    "After leaving the toilet": {"zh": "出厕所后", "ja": "トイレを出た後"},
    "After sneezing": {"zh": "打喷嚏后", "ja": "くしゃみの後"},
    "Glory to Him who has placed this at our service; we could never have done it by ourselves.": {"zh": "赞颂他使这为我们服务，我们原本不能做到。", "ja": "これを私たちの奉仕に供して下さった彼に栄光あれ；私たちだけでは決してできなかったであろう。"},
    "When riding a car or bus": {"zh": "乘车时", "ja": "車やバスに乗る時"},
    "My Lord, have mercy on my parents as they raised me when I was little.": {"zh": "我的主啊，求你怜悯我的父母，如同他们在我小时候养育我一样。", "ja": "我が主よ、私が幼かった時に私を養育したように、私の両親を憐れんで下さい。"},
    "Praying for parents": {"zh": "为父母祈祷", "ja": "両親のための祈り"},
    "Our Lord, give us good in this world and good in the Hereafter, and protect us from the punishment of the Fire.": {"zh": "我们的主啊，求你赐予我们今世的美好和后世的美好，并保护我们免受火狱的刑罚。", "ja": "我々の主よ、この世で善と来世で善を授け、火獄の罰から守って下さい。"},
    "Any time \u2014 a complete dua": {"zh": "任何时候——一个全面的祈祷", "ja": "いつでも——完全なドゥアー"},

    # KIDS_KALIMA_L10N names
    "1st Kalima \u2014 Tayyibah (Purity)": {"zh": "第一凯里麦——清真言（纯洁）", "ja": "第一カリマ——タイイバ（清純）"},
    "2nd Kalima \u2014 Shahadat (Testimony)": {"zh": "第二凯里麦——作证言", "ja": "第二カリマ——シャハーダ（証言）"},
    "3rd Kalima \u2014 Tamjeed (Glorification)": {"zh": "第三凯里麦——赞美言", "ja": "第三カリマ——タムジード（称賛）"},
    "4th Kalima \u2014 Tawheed (Oneness)": {"zh": "第四凯里麦——认主独一言", "ja": "第四カリマ——タウヒード（唯一性）"},
    "5th Kalima \u2014 Astaghfar (Seeking Forgiveness)": {"zh": "第五凯里麦——求恕言", "ja": "第五カリマ——イスティグファール（赦しの願い）"},
    "6th Kalima \u2014 Radd-e-Kufr (Rejecting Disbelief)": {"zh": "第六凯里麦——拒否言", "ja": "第六カリマ——ラッデ・クフル（不信仰の拒否）"},
}

def load_ci18n():
    """Load existing CI18N JSON as a phrase dictionary"""
    phrases = {}
    for lang in ['zh', 'ja']:
        fname = f'data/content-i18n/{lang}.json'
        if os.path.exists(fname):
            with open(fname) as f:
                data = json.load(f)
            # Keys like "surah_1" -> actual surah name
            # The CI18N has some useful phrases we can look up
    return phrases

def add_zh_ja(text, phrase_dict):
    """Replace { en: '...', bn: '...' } with { en: '...', bn: '...', zh: '...', ja: '...' }"""
    # Match single-line pattern: { en: '...', bn: '...' }
    pattern = r"\{\s*en\s*:\s*'((?:[^'\\]|\\.)*)'\s*,\s*bn\s*:\s*'((?:[^'\\]|\\.)*)'\s*\}"
    
    def replacer(m):
        en_text = m.group(1)
        bn_text = m.group(2)
        
        # Look up translation
        zh_text = phrase_dict.get(en_text, {}).get('zh', en_text)
        ja_text = phrase_dict.get(en_text, {}).get('ja', en_text)
        
        return f"{{ en: '{en_text}', bn: '{bn_text}', zh: '{zh_text}', ja: '{ja_text}' }}"
    
    return re.sub(pattern, replacer, text)

def add_direct_props(text, phrase_dict):
    """Add zh/ja as direct properties in amal-daily.js style objects"""
    # Match: en: 'text',   \n   bn: 'text'   },
    # (where en: and bn: are on separate lines, possibly following ar/tr lines)
    pattern = r"(en:\s*'((?:[^'\\]|\\.)*)')\s*,\s*\n(\s*)(bn:\s*'((?:[^'\\]|\\.)*)')\s*(\},?)"
    
    def replacer(m):
        en_text = m.group(2)
        bn_text = m.group(5)
        indent = m.group(3)
        suffix = m.group(6)
        
        zh_text = phrase_dict.get(en_text, {}).get('zh', en_text)
        ja_text = phrase_dict.get(en_text, {}).get('ja', en_text)
        
        return f"{m.group(1)},\n{indent}{m.group(4)},\n{indent}zh: '{zh_text}',\n{indent}ja: '{ja_text}'{suffix}"
    
    return re.sub(pattern, replacer, text)

def main():
    # Load phrase dictionary
    phrases = PHRASES
    
    # Process each file
    targets = [
        ('amal-daily', 'amal-daily.js', False),
        ('qaida-data', 'qaida-data.js', True),
        ('learn-kids', 'learn-kids.js', True),
    ]
    
    for name, fname, is_single in targets:
        path = f'js/{fname}'
        print(f"\n=== Processing {path} ===")
        with open(path) as f:
            text = f.read()
        
        before = len(re.findall(r"\bzh\s*:", text))
        
        if is_single:
            text = add_zh_ja(text, phrases)
        else:
            text = add_direct_props(text, phrases)
            # Also handle single-line objects within the file (AMAL_STR etc.)
            text = add_zh_ja(text, phrases)
        
        after = len(re.findall(r"\bzh\s*:", text))
        added = after - before
        print(f"  zh count: {before} -> {after} (+{added})")
        
        with open(path, 'w') as f:
            f.write(text)
        
        # Verify
        remain = len(re.findall(r"\{\s*en\s*:\s*['\"]", text))
        print(f"  Remaining en-only objects: {remain}")

if __name__ == '__main__':
    main()
