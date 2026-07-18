#!/usr/bin/env python3
"""
Enrich offline data files with Chinese (zh) and Japanese (ja) translations.

Processes:
  - js/names-data.js   → NAMES_99 + PROPHETS_25
  - js/vocab-data.js   → VOCAB_WORDS + VOCAB_THEMES
"""

import re, os, sys

sys.path.insert(0, os.path.dirname(__file__))
from extracted_names import ZH_NAMES_99, JA_NAMES_99, ZH_PROPHETS, JA_PROPHETS

# ──────────────────────────────────────────────
# Helper
# ──────────────────────────────────────────────

def insert_lang_in_obj(text, lang_code, value):
    """Insert `, lang_code: "..."` before the last `}` of a JS object on one line."""
    # Match the closing ` }` or `},` and insert before it
    # We need to find the innermost object boundary for `meanings: { ... }`
    m = re.search(r'(\})\s*(,?\s*)$', text)
    if m:
        insert = f', {lang_code}: {value!r}'
        return text[:m.start(1)] + insert + m.group(1) + m.group(2)
    return text

def insert_lang_in_meanings(line, lang_code, value):
    """Insert zh/ja into a `meanings: { ... }` inline object."""
    # Match patterns like: meanings: { en: "...", bn: "...", ... }
    # We want to add inside the {} before the closing }
    m = re.search(r'(meanings:\s*\{[^}]*?)(\}\s*[},]\s*)$', line)
    if m:
        return line[:m.start(2)] + f', {lang_code}: {value!r}' + m.group(2)
    return line

def insert_lang_in_names(line, lang_code, value):
    """Insert zh/ja into a `names: { ... }` inline object (prophet names)."""
    m = re.search(r'(names:\s*\{[^}]*?)(\}\s*[},]\s*)$', line)
    if m:
        return line[:m.start(2)] + f', {lang_code}: {value!r}' + m.group(2)
    return line

# ──────────────────────────────────────────────
# 1. names-data.js
# ──────────────────────────────────────────────

# More straightforward approach: read file, make edits using exact string replacement
def enrich_names_data(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        text = f.read()

    # Process NAMES_99 entries
    # Each entry is one line like:
    #   { n: 1, ar: "الرَّحْمَٰنُ", translit: "Ar-Raḥmān", meanings: { en: "...", bn: "...", ... } },
    for n in range(1, 100):
        zh = ZH_NAMES_99.get(n)
        ja = JA_NAMES_99.get(n)
        if not zh or not ja:
            print(f"⚠️  Missing translation for name #{n}")
            continue

        # Use `.format()` to avoid f-string brace escaping issues
        pat = r'(\{\s*n:\s*{n},\s*ar:\s*"[^"]*",\s*translit:\s*"[^"]*",\s*meanings:\s*\{)([^}]*?)(\}\s*\})'
        pattern = pat.replace('{n}', str(n))

        def replacer_99(m):
            prefix = m.group(1)
            body = m.group(2)
            suffix = m.group(3)
            if 'zh:' not in body:
                body += ', zh: ' + repr(zh)
            if 'ja:' not in body:
                body += ', ja: ' + repr(ja)
            return prefix + body + suffix

        text = re.sub(pattern, replacer_99, text, count=1)

    # Process PROPHETS_25 entries
    for ar_key in ZH_PROPHETS:
        zh = ZH_PROPHETS[ar_key]
        ja = JA_PROPHETS[ar_key]
        escaped_ar = re.escape(ar_key)
        pat = r'(\{\s*n:\s*\d+,\s*ar:\s*"' + escaped_ar + r'",[^}]*?names:\s*\{)([^}]*?)(\}\s*[,\}\]])'

        def replacer_prop(m, zh_val=zh, ja_val=ja):
            prefix = m.group(1)
            body = m.group(2)
            suffix = m.group(3)
            if 'zh:' not in body:
                body += ', zh: ' + repr(zh_val)
            if 'ja:' not in body:
                body += ', ja: ' + repr(ja_val)
            return prefix + body + suffix

        text = re.sub(pat, replacer_prop, text, count=1)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(text)
    print(f"✅  Updated {filepath}")


# ──────────────────────────────────────────────
# 2. vocab-data.js
# ──────────────────────────────────────────────

# Chinese (zh) translations for vocab entries (ordered to match VOCAB_WORDS)
ZH_VOCAB_WORDS = {
    'مِنْ': '从，来自',
    'مَا': '什么；不',
    'لَا': '不，非',
    'فِي': '在…里',
    'إِنَّ': '确实，的确',
    'عَلَىٰ': '在…上',
    'الَّذِينَ': '那些人',
    'إِلَىٰ': '到，向',
    'إِنْ': '如果',
    'ذَٰلِكَ': '那个',
    'هُوَ': '他，它',
    'إِذَا': '当…时',
    'كُلُّ': '每个，所有',
    'ثُمَّ': '然后',
    'أَوْ': '或者',
    'بَيْنَ': '之间',
    'قَبْلَ': '之前',
    'عِنْدَ': '在…跟前',
    'بَعْدَ': '之后',
    'غَيْرُ': '除…之外',
    'قَالَ': '他说',
    'كَانَ': '他是',
    'عَلِمَ': '他知道',
    'آمَنَ': '他归信',
    'كَفَرَ': '他不信',
    'عَمِلَ': '他做（善功）',
    'جَاءَ': '他来了',
    'خَلَقَ': '他创造',
    'أَنْزَلَ': '他降示',
    'سَمِعَ': '他听见',
    'اللَّهُ': '安拉，真主',
    'رَبٌّ': '主，养育者',
    'أَرْضٌ': '大地',
    'يَوْمٌ': '日子，天',
    'قَوْمٌ': '民族，宗族',
    'آيَةٌ': '迹象，节文',
    'رَسُولٌ': '使者',
    'عَذَابٌ': '惩罚',
    'سَمَاءٌ': '天空，天',
    'نَفْسٌ': '灵魂，自我',
    'حَقٌّ': '真理，权利',
    'شَيْءٌ': '事物',
    'عَبْدٌ': '仆人，奴仆',
    'كِتَابٌ': '经典，天经',
    'خَيْرٌ': '好，善',
    'جَنَّةٌ': '天园，乐园',
    'نَارٌ': '火狱',
    'قَلْبٌ': '心',
    'رَحْمَةٌ': '慈悯',
    'صَلَاةٌ': '拜功，礼拜',
    # Theme words
    'وَجْهٌ': '脸，面容',
    'يَدٌ': '手',
    'عَيْنٌ': '眼；泉源',
    'لِسَانٌ': '舌头，语言',
    'صَدْرٌ': '胸，心扉',
    'بَطْنٌ': '腹，子宫',
    'رَأْسٌ': '头',
    'أُذُنٌ': '耳朵',
    'أَبٌ': '父亲',
    'أُمٌّ': '母亲',
    'اِبْنٌ': '儿子',
    'أَخٌ': '兄弟',
    'أُخْتٌ': '姐妹',
    'زَوْجٌ': '配偶；对',
    'وَلَدٌ': '孩子，儿女',
    'أَهْلٌ': '家属，族人',
    'شَمْسٌ': '太阳',
    'قَمَرٌ': '月亮',
    'نَجْمٌ': '星星',
    'جَبَلٌ': '山',
    'بَحْرٌ': '海',
    'نَهَرٌ': '河流',
    'شَجَرَةٌ': '树',
    'مَاءٌ': '水',
    'بَقَرَةٌ': '牛',
    'كَلْبٌ': '狗',
    'حُوتٌ': '鱼，鲸',
    'ذِئْبٌ': '狼',
    'نَمْلَةٌ': '蚂蚁',
    'نَحْلٌ': '蜜蜂',
    'عَنكَبُوتٌ': '蜘蛛',
    'طَيْرٌ': '鸟',
    'وَاحِدٌ': '一',
    'اِثْنَانِ': '二',
    'ثَلَاثَةٌ': '三',
    'أَرْبَعَةٌ': '四',
    'سِتَّةٌ': '六',
    'سَبْعَةٌ': '七',
    'مِائَةٌ': '百',
    'أَلْفٌ': '千',
    'لَيْلٌ': '夜',
    'نَهَارٌ': '昼',
    'سَاعَةٌ': '时刻，复活时',
    'شَهْرٌ': '月',
    'سَنَةٌ': '年',
    'فَجْرٌ': '黎明，晨礼',
    'صُبْحٌ': '早晨',
    'غَدٌ': '明天',
    'حَيَاةٌ': '生活，生命',
    'مَوْتٌ': '死亡',
    'نُورٌ': '光，光明',
    'ظُلُمَاتٌ': '黑暗',
    'دُنْيَا': '今世',
    'آخِرَةٌ': '后世',
    'هُدًى': '引导，正道',
    'ضَلَالٌ': '迷误',
    'زَكَاةٌ': '天课',
    'صِيَامٌ': '斋戒',
    'حَجٌّ': '朝觐',
    'دُعَاءٌ': '祈祷，杜阿',
    'ذِكْرٌ': '记念，提醒',
    'سَجَدَ': '他叩头',
    'تَقْوَىٰ': '敬畏',
    'مَسْجِدٌ': '清真寺',
    'قِيَامَةٌ': '复活',
    'بَعَثَ': '他复活，派遣',
    'حِسَابٌ': '清算',
    'مِيزَانٌ': '天平，秤',
    'أَجْرٌ': '报酬',
    'جَهَنَّمُ': '火狱，哲汗南',
    'فِرْدَوْسٌ': '费尔道斯',
    'خَالِدِينَ': '永居者',
}

# Japanese (ja) translations
JA_VOCAB_WORDS = {
    'مِنْ': 'から、より',
    'مَا': '何；ない',
    'لَا': 'いいえ、ない',
    'فِي': '〜の中に',
    'إِنَّ': '本当に、確かに',
    'عَلَىٰ': '〜の上に',
    'الَّذِينَ': '〜する者たち',
    'إِلَىٰ': '〜へ、〜の方へ',
    'إِنْ': 'もし',
    'ذَٰلِكَ': 'それ、その',
    'هُوَ': '彼、それ',
    'إِذَا': '〜の時',
    'كُلُّ': '全ての',
    'ثُمَّ': 'それから',
    'أَوْ': 'または',
    'بَيْنَ': '間',
    'قَبْلَ': '前',
    'عِنْدَ': '〜のそばに',
    'بَعْدَ': '後',
    'غَيْرُ': '以外',
    'قَالَ': '彼は言った',
    'كَانَ': '彼はいた',
    'عَلِمَ': '彼は知った',
    'آمَنَ': '彼は信じた',
    'كَفَرَ': '彼は不信仰になった',
    'عَمِلَ': '彼は行った',
    'جَاءَ': '彼は来た',
    'خَلَقَ': '彼は創造した',
    'أَنْزَلَ': '彼は下した',
    'سَمِعَ': '彼は聞いた',
    'اللَّهُ': 'アッラー',
    'رَبٌّ': '主、養育者',
    'أَرْضٌ': '大地',
    'يَوْمٌ': '日、日曜',
    'قَوْمٌ': '民、民族',
    'آيَةٌ': '印、節',
    'رَسُولٌ': '使徒、使者',
    'عَذَابٌ': '懲罰',
    'سَمَاءٌ': '天',
    'نَفْسٌ': '魂、自己',
    'حَقٌّ': '真理、権利',
    'شَيْءٌ': '物事',
    'عَبْدٌ': '僕、奴隷',
    'كِتَابٌ': '書物、啓典',
    'خَيْرٌ': '善、良い',
    'جَنَّةٌ': '楽園、天園',
    'نَارٌ': '火獄',
    'قَلْبٌ': '心',
    'رَحْمَةٌ': '慈悲、慈愛',
    'صَلَاةٌ': '礼拝、サラート',
    # Theme words
    'وَجْهٌ': '顔、面',
    'يَدٌ': '手',
    'عَيْنٌ': '目；泉',
    'لِسَانٌ': '舌、言葉',
    'صَدْرٌ': '胸',
    'بَطْنٌ': '腹',
    'رَأْسٌ': '頭',
    'أُذُنٌ': '耳',
    'أَبٌ': '父',
    'أُمٌّ': '母',
    'اِبْنٌ': '息子',
    'أَخٌ': '兄弟',
    'أُخْتٌ': '姉妹',
    'زَوْجٌ': '配偶者；対',
    'وَلَدٌ': '子供',
    'أَهْلٌ': '家族、一族',
    'شَمْسٌ': '太陽',
    'قَمَرٌ': '月',
    'نَجْمٌ': '星',
    'جَبَلٌ': '山',
    'بَحْرٌ': '海',
    'نَهَرٌ': '川',
    'شَجَرَةٌ': '木',
    'مَاءٌ': '水',
    'بَقَرَةٌ': '雌牛',
    'كَلْبٌ': '犬',
    'حُوتٌ': '魚、鯨',
    'ذِئْبٌ': '狼',
    'نَمْلَةٌ': '蟻',
    'نَحْلٌ': '蜜蜂',
    'عَنكَبُوتٌ': '蜘蛛',
    'طَيْرٌ': '鳥',
    'وَاحِدٌ': '一',
    'اِثْنَانِ': '二',
    'ثَلَاثَةٌ': '三',
    'أَرْبَعَةٌ': '四',
    'سِتَّةٌ': '六',
    'سَبْعَةٌ': '七',
    'مِائَةٌ': '百',
    'أَلْفٌ': '千',
    'لَيْلٌ': '夜',
    'نَهَارٌ': '昼間',
    'سَاعَةٌ': '時、時節',
    'شَهْرٌ': '月（暦）',
    'سَنَةٌ': '年',
    'فَجْرٌ': '暁、ファジュル',
    'صُبْحٌ': '朝',
    'غَدٌ': '明日',
    'حَيَاةٌ': '生活、生',
    'مَوْتٌ': '死',
    'نُورٌ': '光',
    'ظُلُمَاتٌ': '闇',
    'دُنْيَا': '現世',
    'آخِرَةٌ': '来世',
    'هُدًى': '導き',
    'ضَلَالٌ': '迷い',
    'زَكَاةٌ': 'ザカート',
    'صِيَامٌ': '断食',
    'حَجٌّ': 'ハッジ巡礼',
    'دُعَاءٌ': '祈り、ドゥアー',
    'ذِكْرٌ': '念唱、教訓',
    'سَجَدَ': '彼はサジダした',
    'تَقْوَىٰ': 'タクワー',
    'مَسْجِدٌ': 'モスク、マスジド',
    'قِيَامَةٌ': '復活',
    'بَعَثَ': '彼は復活させ派遣した',
    'حِسَابٌ': '清算',
    'مِيزَانٌ': '天秤',
    'أَجْرٌ': '報酬',
    'جَهَنَّمُ': 'ジャハンナム',
    'فِرْدَوْسٌ': 'フィルダウス',
    'خَالِدِينَ': '永遠に留まる者',
}


def enrich_vocab_data(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        text = f.read()

    def insert_zh_ja_in_meanings(match):
        """Given a regex match of a vocab entry, insert zh/ja into meanings."""
        full = match.group(0)
        # Extract just the Arabic text from `arabic: '...'` -> `...`
        arabic_m = re.search(r"'([^']*)'", match.group(1))
        arabic = arabic_m.group(1) if arabic_m else ''
        
        # Get zh/ja translations
        zh = ZH_VOCAB_WORDS.get(arabic)
        ja = JA_VOCAB_WORDS.get(arabic)
        if not zh and not ja:
            return full  # skip unknown
        
        # Find the meanings object boundaries
        # Group1: 'meanings: {', Group2: inner content, Group3: '}' + ws + comma/close
        meanings_m = re.search(r'(meanings:\s*\{)([^}]*?)(\}\s*[,\}\]])', full)
        if not meanings_m:
            return full
        
        prefix = meanings_m.group(1)
        body = meanings_m.group(2)
        suffix = meanings_m.group(3)
        
        if 'zh:' not in body and zh:
            body += ', zh: ' + repr(zh)
        if 'ja:' not in body and ja:
            body += ', ja: ' + repr(ja)
        
        return full[:meanings_m.start()] + prefix + body + suffix + full[meanings_m.end():]

    # Process VOCAB_WORDS entries
    # Pattern: match arabic: '...' followed by the full entry
    pattern = r"(\{\s*arabic:\s*'[^']*'[^}]*?meanings:\s*\{[^}]*?\}\s*[,\}])"
    text = re.sub(pattern, insert_zh_ja_in_meanings, text)

    # Process VOCAB_THEMES nested word entries (they have arabic: '...' too)
    text = re.sub(pattern, insert_zh_ja_in_meanings, text)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(text)
    print(f"✅  Updated {filepath}")


# ──────────────────────────────────────────────
# Main
# ──────────────────────────────────────────────

if __name__ == '__main__':
    base = os.path.join(os.path.dirname(__file__), '..')
    
    enrich_names_data(os.path.join(base, 'js', 'names-data.js'))
    enrich_vocab_data(os.path.join(base, 'js', 'vocab-data.js'))
    
    print("🎉  Done! Files enriched with zh and ja translations.")
