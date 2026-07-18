#!/usr/bin/env python3
"""Add zh and ja translations to js/topics-data.js."""

import re, os

PAIRS = {
    'Acceptance of good deeds': ('善功的接受', '善行の受入れ'),
    'Good in this world and the next': ('今世与后世的福祉', '現世と来世の善'),
    'Patience and victory': ('忍耐与胜利', '忍耐と勝利'),
    'Do not burden us beyond our capacity': ('不要使我们负担过重', '力を超える負担をかけないでください'),
    'Steadfast hearts': ('坚定之心', '心の堅固'),
    'Forgiveness and protection from the Fire': ('恕饶与火狱的庇护', '赦しと火獄からの保護'),
    'Righteous offspring': ('善良的后代', '敬虔な子孫'),
    'Forgiveness of sins and excesses': ('饶恕罪过和过分', '罪と放埓の赦し'),
    'Dua of those who reflect': ('深思者的祈祷', '思慮深い人々の祈り'),
    'Constancy in prayer and forgiveness for parents': ('坚守拜功与为父母求饶', '礼拝の堅持と両親の赦し'),
    'We believe, so forgive us and have mercy': ('我们已信道，求你饶恕我们', '私たちは信じました、お赦しください'),
    'Comfort in spouses and children': ('配偶和子女的欣慰', '配偶者と子孫の慰め'),
    'Forgiveness for us and the believers before us': ('饶恕我们和前辈的信士', '私たちと先人信者の赦し'),
    'Perfect our light and forgive us': ('完善我们的光明并饶恕我们', '私たちの光を完成させ赦してください'),
    'Patience': ('忍耐', '忍耐'),
    'Gratitude': ('感恩', '感謝'),
    'Forgiveness': ('饶恕', '赦し'),
    'Prayer': ('礼拜', '礼拝'),
    'Parents': ('父母', '両親'),
    'Knowledge': ('知识', '知識'),
    'Charity': ('施舍', '施し'),
    'Paradise': ('天堂', '楽園'),
    'Justice': ('公正', '正義'),
    'Creation & the Universe': ('创造与宇宙', '創造と宇宙'),
    'Reliance on Allah': ('托靠真主', 'アッラーへの信頼'),
    'Repentance': ('忏悔', '悔悟'),
    'Remembrance of Allah': ('记念真主', 'アッラーの唱念'),
    'The Hereafter': ('后世', '来世'),
    'Names of Paradise': ('天堂的名称', '楽園の名'),
    'Names of the Fire': ('火狱的名称', '火獄の名'),
}

def enrich(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        text = f.read()

    pat = re.compile(r'(names:\s*\{)([^}]*?)(\}\s*)')
    matches = list(pat.finditer(text))
    count = 0

    for m in reversed(matches):
        body = m.group(2)
        if 'zh:' in body or 'ja:' in body:
            continue
        en_m = re.search(r"en:\s*'([^']+)'", body)
        if not en_m:
            continue
        en_text = en_m.group(1)
        pair = PAIRS.get(en_text)
        if not pair:
            print(f'  WARN: no translation for "{en_text}"')
            continue
        zh_val, ja_val = pair
        new = m.group(1) + m.group(2) + f', zh: {zh_val!r}, ja: {ja_val!r}' + m.group(3)
        text = text[:m.start()] + new + text[m.end():]
        count += 1

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(text)
    print(f'✅  Updated {filepath} ({count} entries)')

if __name__ == '__main__':
    base = os.path.join(os.path.dirname(__file__), '..')
    enrich(os.path.join(base, 'js', 'topics-data.js'))
