#!/usr/bin/env python3
"""
Add missing CI18N translations for tajweed-learn.js (54) and learn-quranic-arabic.js (6).
"""

import re, json

# ─── Tajweed terms ─────────────────────────────────────────────────
TAJWEED_ZH = {
    "Al-Halq — the throat": "咽喉——喉咙",
    "Al-Jawf — the empty space of the mouth and throat": "口腔——口腔和喉咙的空腔",
    "Al-Khayshum — the nasal cavity": "鼻腔——鼻腔",
    "Al-Lisan — the tongue": "舌头——舌",
    "Ash-Shafatan — the two lips": "双唇——两片嘴唇",
    "Before all remaining letters pronounce the meem clearly — take special care with و and ف so it is not hidden.": "在其余字母前清晰发音米姆——特别注意و和ف以免被隐藏。",
    "Before another م the two meems merge into one doubled meem, held with ghunnah.": "在另一个م前两个米姆合并为一个叠音米姆，带鼻音。",
    "Before the remaining 15 letters, hide the noon lightly between izhar and idghaam, with ghunnah (~2 counts).": "在其余15个字母前，在清晰和合并之间轻隐努恩，带鼻音（约2拍）。",
    "Before the six throat letters, pronounce the noon/tanween clearly with no extra ghunnah or merging.": "在六个喉音字母前清晰发音努恩/双鼻音，不带额外鼻音或合并。",
    "Before ب the meem sakinah is lightly hidden on the lips, held with ghunnah.": "在ب前静符米姆在嘴唇上轻隐，带鼻音。",
    "Before ب the noon/tanween turns into a hidden meem sound, held with ghunnah.": "在ب前努恩/双鼻音转为隐藏的米姆音，带鼻音。",
    "Connected madd: madd letter and hamza in the SAME word — stretch 4–5 counts (obligatory).": "连接性长音：长音字母和哈姆扎在同一词中——延长4-5拍（必须）。",
    "Connecting hamza: pronounced only when you START at it; silent when you continue through.": "连接性哈姆扎：仅当从它开始时发音；连续读时不发音。",
    "Conversion: noon sakinah/tanween before ب converts to a hidden meem sound with ghunnah.": "转换：ب前的静符努恩/双鼻音转换为隐藏的米姆音，带鼻音。",
    "Deepest part of the throat (nearest the chest).": "喉咙最深处（靠近胸部）。",
    "Deepest part of the tongue with the soft palate above it.": "舌根与上颚相对处。",
    "Echo/bounce: the letters ق ط ب ج د get a slight bounce when bearing sukoon (strongest when stopping).": "回弹：字母ق ط ب ج د在带有静符时有轻微回弹（停顿时最强）。",
    "Flexible madd (e.g. when stopping): may be stretched 2, 4 or 6 counts.": "弹性长音（如停顿时）：可延长2、4或6拍。",
    "Hiding: noon sakinah/tanween before these 15 letters is pronounced lightly hidden with ghunnah.": "隐藏：在这15个字母前的静符努恩/双鼻音轻隐发音，带鼻音。",
    "Idghaam Shafawi — labial merging": "唇合并——唇部合并",
    "Idghaam — merging": "合并——合并",
    "Ikhfa Shafawi — labial hiding": "唇隐藏——唇部隐藏",
    "Ikhfa — hiding": "隐藏——隐藏",
    "Inside of the lower lip with the tips of the upper front teeth.": "下唇内侧与上前牙尖端。",
    "Iqlab — conversion": "转换——转换",
    "Izhar Halqi — clear": "喉部清晰——清晰",
    "Izhar Shafawi — clear": "唇部清晰——清晰",
    "Labial hiding: meem sakinah before ب is lightly hidden with ghunnah on the lips.": "唇部隐藏：ب前的静符米姆在嘴唇上带鼻音轻隐。",
    "Labial merging: meem sakinah merges into a following م with ghunnah.": "唇部合并：静符米姆与后面的م合并，带鼻音。",
    "Madd Lazim: the heaviest madd — always stretch 6 counts.": "必须长音：最重的长音——总是延长6拍。",
    "Merge into the letters of يرملون: with ghunnah in ي ن م و (ينمو), without ghunnah in ل ر.": "合并到يرملون的字母中：在ينمو（ي ن م و）中带鼻音，在ل ر中不带鼻音。",
    "Merging of two letters sharing the same articulation point but differing in attributes (e.g. ت into ط).": "两个发音部位相同但属性不同的字母合并（如ت和ط）。",
    "Merging of two letters with CLOSE articulation points (e.g. ق into ك).": "两个发音部位相近的字母合并（如ق和ك）。",
    "Merging with ghunnah: noon sakinah/tanween merges into ي ن م و, keeping the nasal sound.": "带鼻音合并：静符努恩/双鼻音合并到ي ن م و中，保持鼻音。",
    "Merging without ghunnah: noon sakinah/tanween merges completely into ل or ر.": "不带鼻音合并：静符努恩/双鼻音完全合并到ل或ر中。",
    "Middle of the throat.": "喉咙中部。",
    "Middle of the tongue with the roof of the mouth.": "舌中部与上颚相对。",
    "Nasalisation: hold a nasal sound for 2 counts on a doubled noon or meem (نّ / مّ).": "鼻化：在叠音努恩或米姆（نّ / مّ）上保持鼻音2拍。",
    "Natural prolongation: stretch the madd letter exactly 2 counts.": "自然延长：长音字母准确延长2拍。",
    "Nearest edge of the tongue with the upper gums.": "舌边缘与上牙龈相对。",
    "Separated madd: madd letter ends a word and hamza starts the next — stretch 4–5 counts.": "分离性长音：长音字母结束一个词，哈姆扎开始下一个——延长4-5拍。",
    "Side(s) of the tongue against the upper molars.": "舌侧与上臼齿相对。",
    "Silent letter: written in the script but not pronounced.": "静音字母：文字中书写但不发音。",
    "Slightly forward of ق — back of the tongue with the palate.": "在ق稍前——舌后与上颚。",
    "Source of the ghunnah — in doubled ن/م, ikhfa, iqlab and idgham with ghunnah.": "鼻音来源——在叠音ن/م、隐藏、转换和带鼻音合并中。",
    "Sun lam: the ل of ال is silent and assimilates into the following \"sun letter\" (which doubles).": "太阳字母的لام：ال中的ل不发音并与后面的太阳字母同化（该字母重叠）。",
    "The three madd letters — the sound flows from the open cavity and ends with the breath.": "三个长音字母——声音从口腔流出，以气结束。",
    "The two lips together — closed for ب and م, slightly rounded open for و.": "双唇合拢——ب和م时闭合，و时微圆。",
    "Tip of the tongue (with its back) near the point of ن.": "舌尖（及其背面）靠近ن的发音点。",
    "Tip of the tongue close to the lower front teeth, leaving a small gap.": "舌尖靠近下前牙，留有小缝隙。",
    "Tip of the tongue with the base of the upper front teeth.": "舌尖与上前牙根部。",
    "Tip of the tongue with the edges of the upper front teeth.": "舌尖与上前牙边缘。",
    "Tip of the tongue with the upper gums, just below the point of ل.": "舌尖与上牙龈，就在ل的发音点下方。",
    "Top of the throat (nearest the mouth).": "喉咙顶部（靠近口腔）。",
}

TAJWEED_JA = {
    "Al-Halq — the throat": "アル＝ハルク — 喉",
    "Al-Jawf — the empty space of the mouth and throat": "アル＝ジャウフ — 口腔と喉の空洞",
    "Al-Khayshum — the nasal cavity": "アル＝ハイシューム — 鼻腔",
    "Al-Lisan — the tongue": "アル＝リサーン — 舌",
    "Ash-Shafatan — the two lips": "アッ＝シャファターン — 両唇",
    "Before all remaining letters pronounce the meem clearly — take special care with و and ف so it is not hidden.": "残りの全ての文字の前ではミームを明瞭に発音する — 特にوとفでは隠れないよう注意。",
    "Before another م the two meems merge into one doubled meem, held with ghunnah.": "別のمの前では二つのミームが一つの重ねミームに融合し、グンナを伴う。",
    "Before the remaining 15 letters, hide the noon lightly between izhar and idghaam, with ghunnah (~2 counts).": "残りの15文字の前では、イズハールとイドガームの中間でヌーンを軽く隠し、グンナを伴う（約2拍）。",
    "Before the six throat letters, pronounce the noon/tanween clearly with no extra ghunnah or merging.": "六つの喉文字の前では、ヌーン/タンウィーンを余分なグンナや融合なしに明瞭に発音する。",
    "Before ب the meem sakinah is lightly hidden on the lips, held with ghunnah.": "بの前ではサキーナのミームが唇で軽く隠され、グンナを伴う。",
    "Before ب the noon/tanween turns into a hidden meem sound, held with ghunnah.": "بの前ではヌーン/タンウィーンが隠れたミーム音に変わり、グンナを伴う。",
    "Connected madd: madd letter and hamza in the SAME word — stretch 4–5 counts (obligatory).": "接続マッド：同一語内のマッド文字とハムザ — 4-5拍伸ばす（義務）。",
    "Connecting hamza: pronounced only when you START at it; silent when you continue through.": "接続ハムザ：そこから始める時のみ発音；続けて読む時は無音。",
    "Conversion: noon sakinah/tanween before ب converts to a hidden meem sound with ghunnah.": "変換：ب前のサキーナのヌーン/タンウィーンが隠れたミーム音に変わりグンナを伴う。",
    "Deepest part of the throat (nearest the chest).": "喉の最も深い部分（胸に近い方）。",
    "Deepest part of the tongue with the soft palate above it.": "舌の最も奥の部分とその上の軟口蓋。",
    "Echo/bounce: the letters ق ط ب ج د get a slight bounce when bearing sukoon (strongest when stopping).": "反跳：ق ط ب ج دの文字はスクーンを持つ時わずかに反跳する（停止時が最も強い）。",
    "Flexible madd (e.g. when stopping): may be stretched 2, 4 or 6 counts.": "柔軟マッド（例：停止時）：2、4、6拍伸ばせる。",
    "Hiding: noon sakinah/tanween before these 15 letters is pronounced lightly hidden with ghunnah.": "隠し：これら15文字前のサキーナのヌーン/タンウィーンはグンナを伴い軽く隠して発音する。",
    "Idghaam Shafawi — labial merging": "イドガーム・シャファウィー — 唇での融合",
    "Idghaam — merging": "イドガーム — 融合",
    "Ikhfa Shafawi — labial hiding": "イフファー・シャファウィー — 唇での隠し",
    "Ikhfa — hiding": "イフファー — 隠し",
    "Inside of the lower lip with the tips of the upper front teeth.": "下唇の内側と上前歯の先端。",
    "Iqlab — conversion": "イクラーブ — 変換",
    "Izhar Halqi — clear": "イズハール・ハルキー — 喉での明示",
    "Izhar Shafawi — clear": "イズハール・シャファウィー — 唇での明示",
    "Labial hiding: meem sakinah before ب is lightly hidden with ghunnah on the lips.": "唇での隠し：ب前のサキーナのミームが唇でグンナを伴い軽く隠される。",
    "Labial merging: meem sakinah merges into a following م with ghunnah.": "唇での融合：サキーナのミームが後続のمにグンナを伴い融合する。",
    "Madd Lazim: the heaviest madd — always stretch 6 counts.": "マッド・ラージム：最も重いマッド — 常に6拍伸ばす。",
    "Merge into the letters of يرملون: with ghunnah in ي ن م و (ينمو), without ghunnah in ل ر.": "يرملونの文字に融合：ينمو（ي ن م و）ではグンナを伴い、ل رではグンナなし。",
    "Merging of two letters sharing the same articulation point but differing in attributes (e.g. ت into ط).": "同じ調音点を共有するが属性が異なる二文字の融合（例：تとط）。",
    "Merging of two letters with CLOSE articulation points (e.g. ق into ك).": "近い調音点を持つ二文字の融合（例：قとك）。",
    "Merging with ghunnah: noon sakinah/tanween merges into ي ن م و, keeping the nasal sound.": "グンナを伴う融合：サキーナのヌーン/タンウィーンがي ن م وに融合し鼻音を保つ。",
    "Merging without ghunnah: noon sakinah/tanween merges completely into ل or ر.": "グンナなしの融合：サキーナのヌーン/タンウィーンが完全にلまたはرに融合する。",
    "Middle of the throat.": "喉の中部。",
    "Middle of the tongue with the roof of the mouth.": "舌の中部と口蓋。",
    "Nasalisation: hold a nasal sound for 2 counts on a doubled noon or meem (نّ / مّ).": "鼻音化：重ねヌーンまたはミーム（نّ / مّ）で鼻音を2拍保持。",
    "Natural prolongation: stretch the madd letter exactly 2 counts.": "自然延長：マッド文字を正確に2拍伸ばす。",
    "Nearest edge of the tongue with the upper gums.": "舌の最も近い縁と上歯茎。",
    "Separated madd: madd letter ends a word and hamza starts the next — stretch 4–5 counts.": "分離マッド：マッド文字が語を終えハムザが次を始める — 4-5拍伸ばす。",
    "Side(s) of the tongue against the upper molars.": "舌の側面と上臼歯。",
    "Silent letter: written in the script but not pronounced.": "無音文字：文字には書かれるが発音されない。",
    "Slightly forward of ق — back of the tongue with the palate.": "قよりやや前方 — 舌の奥と口蓋。",
    "Source of the ghunnah — in doubled ن/م, ikhfa, iqlab and idgham with ghunnah.": "グンナの源 — 重ねن/م、イフファー、イクラーブ、グンナを伴うイドガームにおいて。",
    "Sun lam: the ل of ال is silent and assimilates into the following \"sun letter\" (which doubles).": "太陽ラーム：الのلは無音で、後続の「太陽文字」に同化する（その文字は重ねられる）。",
    "The three madd letters — the sound flows from the open cavity and ends with the breath.": "三つのマッド文字 — 音は口腔から流れ、息で終わる。",
    "The two lips together — closed for ب and م, slightly rounded open for و.": "両唇を合わせる — بとمでは閉じ、وではやや丸く開く。",
    "Tip of the tongue (with its back) near the point of ن.": "舌尖（とその背）をنの調音点近くに。",
    "Tip of the tongue close to the lower front teeth, leaving a small gap.": "舌尖を下前歯に近づけ、小さな隙間を残す。",
    "Tip of the tongue with the base of the upper front teeth.": "舌尖と上前歯の根元。",
    "Tip of the tongue with the edges of the upper front teeth.": "舌尖と上前歯の縁。",
    "Tip of the tongue with the upper gums, just below the point of ل.": "舌尖と上歯茎、لの調音点のすぐ下。",
    "Top of the throat (nearest the mouth).": "喉の上部（口に近い方）。",
}

# ─── Learn Quranic Arabic missing strings ────────────────────────
QA_ZH = {
    "A small set of nouns carries a huge share of the Quran's text. Learning them first builds confidence and recognition quickly.": "一小部分名词承载了古兰经文本的很大比例。先学习它们能快速建立信心和识别能力。",
    "And whoever does an atom's weight of evil will see it.": "谁做了一粒尘埃重的恶事，他将看到它。",
    "So whoever does an atom's weight of good will see it.": "谁做了一粒尘埃重的善事，他将看到它。",
    "Every Arabic word is one of three types: an <b>ism</b> (اسم — a noun/name: a person, place, thing, quality or concept), a <b>fi'l</b> (فعل — a verb: an action or event), or a <b>harf</b> (حرف — a particle: everything else — prepositions, conjunctions, interrogatives, etc.).": "每个阿拉伯语词都是三种类型之一：<b>名词</b>（اسم — 名/名称：人、地点、事物、性质或概念），<b>动词</b>（فعل — 动作或事件），或 <b>虚词</b>（حرف — 其他所有——介词、连词、疑问词等）。",
    "Case inflection — the change of a word's ending to show its role.": "格变化——词尾变化以显示其语法作用。",
    "The Quran's most frequent verbs revolve around saying, knowing, creating, being, doing, willing, and faith & speech.": "古兰经中最常见的动词围绕说、知道、创造、存在、做、意欲以及信仰与言辞。",
}

QA_JA = {
    "A small set of nouns carries a huge share of the Quran's text. Learning them first builds confidence and recognition quickly.": "少数の名詞がクルアーンの文章の大部分を占めています。それらを最初に学ぶことで、素早く自信と認識力を築けます。",
    "And whoever does an atom's weight of evil will see it.": "原子一粒分の悪を行う者も、それを見るであろう。",
    "So whoever does an atom's weight of good will see it.": "原子一粒分の善を行う者も、それを見るであろう。",
    "Every Arabic word is one of three types: an <b>ism</b> (اسم — a noun/name: a person, place, thing, quality or concept), a <b>fi'l</b> (فعل — a verb: an action or event), or a <b>harf</b> (حرف — a particle: everything else — prepositions, conjunctions, interrogatives, etc.).": "全てのアラビア語の単語は三種のいずれかです：<b>イスム</b>（اسم — 名詞/名称：人、場所、物、性質、概念）、<b>フィイル</b>（فعل — 動詞：行為や出来事）、または <b>ハルフ</b>（حرف — 助詞：その他全て——前置詞、接続詞、疑問詞など）。",
    "Case inflection — the change of a word's ending to show its role.": "格変化——語尾を変えてその文法上の役割を示すこと。",
    "The Quran's most frequent verbs revolve around saying, knowing, creating, being, doing, willing, and faith & speech.": "クルアーンで最も頻出する動詞は、言う、知る、創造する、存在する、行う、欲する、信仰と話すことに関するものです。",
}

def main():
    for lang, translations in [('zh', {**TAJWEED_ZH, **QA_ZH}), ('ja', {**TAJWEED_JA, **QA_JA})]:
        fname = f'data/content-i18n/{lang}.json'
        with open(fname) as f:
            data = json.load(f)
        
        count_added = 0
        for key, val in translations.items():
            if key not in data:
                data[key] = val
                count_added += 1
        
        with open(fname, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        
        print(f"Added {count_added} keys to {fname}, total: {len(data)} keys")

if __name__ == '__main__':
    main()
