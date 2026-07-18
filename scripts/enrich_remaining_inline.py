#!/usr/bin/env python3
"""Add zh/ja to remaining files with same-line en: '...', bn: '...' pattern"""

import re

PHRASES = {
    "Your progress": {"zh": "你的进度", "ja": "あなたの進捗"},
    "Search modules…": {"zh": "搜索模块…", "ja": "モジュールを検索…"},
    "modules started": {"zh": "已开始的模块", "ja": "開始したモジュール"},
    "{n} practiced": {"zh": "已练习{n}个", "ja": "{n}練習済み"},
    "Lessons learned": {"zh": "已学课程", "ja": "学習済みレッスン"},
    "Review": {"zh": "复习", "ja": "復習"},
    "Review missed": {"zh": "复习错误的", "ja": "間違えたものを復習"},
    "Search words…": {"zh": "搜索单词…", "ja": "単語を検索…"},
    "{count} due": {"zh": "待复习{count}个", "ja": "{count}が期限"},
    "Word of the day": {"zh": "每日一词", "ja": "今日の単語"},
    "Written": {"zh": "已写", "ja": "書きました"},
    "Typed": {"zh": "已打", "ja": "タイプしました"},
    "Tajweed (colour-coded)": {"zh": " tajweed（彩色标记）", "ja": "タジュウィード（色分け）"},
    "Hafs (plain Uthmani)": {"zh": "哈夫斯（标准奥斯曼体）", "ja": "ハフス（標準ウスマーン字体）"},
    "Warsh (Warsh ʿan Nāfiʿ)": {"zh": "瓦尔什（瓦尔什·安·纳菲）", "ja": "ワルシュ（ワルシュ・アン・ナーフィ）"},
    "Mercy & Forgiveness": {"zh": "慈悯与宽恕", "ja": "慈愛と赦し"},
    "The Hereafter": {"zh": "后世", "ja": "来世"},
    "Trust in God": {"zh": "信赖真主", "ja": "アッラーへの信頼"},
    "Prophets": {"zh": "先知", "ja": "預言者"},
    "Gratitude": {"zh": "感恩", "ja": "感謝"},
    "Repentance": {"zh": "忏悔", "ja": "悔悟"},
    "Trials": {"zh": "考验", "ja": "試練"},
    "Patience": {"zh": "坚忍", "ja": "忍耐"},
    "Hereafter": {"zh": "后世", "ja": "来世"},
    "3 points": {"zh": "3点", "ja": "3ポイント"},
    "4 points": {"zh": "4点", "ja": "4ポイント"},
    "6 points": {"zh": "6点", "ja": "6ポイント"},
    "Random": {"zh": "随机", "ja": "ランダム"},
    "A–Z": {"zh": "A–Z", "ja": "A–Z"},
    "Verses": {"zh": "节文", "ja": "節"},
    "Remove from favourites": {"zh": "从收藏中移除", "ja": "お気に入りから削除"},
    "Add to favourites": {"zh": "加入收藏", "ja": "お気に入りに追加"},
    "Nothing here yet": {"zh": "这里还没有内容", "ja": "まだ何もありません"},
    "english": {"zh": "英语", "ja": "英語"},
}

files_config = {
    'learn.js': 'same-line',
    'learn-vocab.js': 'same-line',
    'mushaf.js': 'same-line',
    'ponder.js': 'same-line',
    'topics-browser.js': 'same-line',
    'settings-drawer.js': 'same-line',
}

for fname, mode in files_config.items():
    path = f'js/{fname}'
    with open(path) as f:
        text = f.read()
    
    before = len(re.findall(r"\bzh\s*:", text))
    
    if mode == 'same-line':
        # Pattern: en: 'text', bn: 'text' } or en: 'text', bn: 'text' },
        # (not wrapped in { })
        pattern = r"en:\s*'((?:[^'\\]|\\.)*)'\s*,\s*bn:\s*'((?:[^'\\]|\\.)*)'\s*(\},?)"
        
        def replacer(m):
            en_text = m.group(1)
            bn_text = m.group(2)
            suffix = m.group(3)
            zh = PHRASES.get(en_text, {}).get('zh', en_text)
            ja = PHRASES.get(en_text, {}).get('ja', en_text)
            return f"en: '{en_text}', bn: '{bn_text}', zh: '{zh}', ja: '{ja}'{suffix}"
        
        text = re.sub(pattern, replacer, text)
    
    after = len(re.findall(r"\bzh\s*:", text))
    added = after - before
    print(f"{fname}: added {added} zh/ja")
    
    with open(path, 'w') as f:
        f.write(text)

print("\nDone!")
PYEOF
