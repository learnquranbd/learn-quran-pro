#!/usr/bin/env python3
"""
Generate the language-NEUTRAL base file the offline reader needs, once:
  data/verse-base.json = { "s:a": { "t": <uthmani ayah text>,
                                     "j": <juz>, "p": <page>,
                                     "tr": [<per-word transliteration>, ...] } }
Transliteration, juz, page and the joined ayah text never change with UI language,
so they are shared by every language. Word Arabic itself already lives in
data/quran-words.json (this file's "tr" aligns 1:1 to those word arrays).

Source: quran.com API v4. Usage: python3 scripts/gen_verse_base.py
"""
import json, os, time, urllib.request

API = "https://api.quran.com/api/v4"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def get(u, tries=4):
    last = None
    for i in range(tries):
        try:
            return json.load(urllib.request.urlopen(
                urllib.request.Request(u, headers={"User-Agent": "lq-base"}), timeout=60))
        except Exception as e:  # noqa
            last = e; time.sleep(1.5 * (i + 1))
    raise last


def main():
    ref = json.load(open(os.path.join(ROOT, "data", "quran-words.json"), encoding="utf-8"))
    base = {}
    adj = 0
    for c in range(1, 115):
        page = 1
        while True:
            d = get(f"{API}/verses/by_chapter/{c}?words=true&language=en"
                    f"&word_fields=text_uthmani,transliteration"
                    f"&fields=text_uthmani,juz_number,page_number&per_page=50&page={page}")
            for v in d.get("verses", []):
                key = v["verse_key"]
                tr = [((w.get("transliteration") or {}).get("text") or "")
                      for w in v.get("words", []) if w.get("char_type_name") == "word"]
                n = len(ref.get(key, []))
                if n and len(tr) != n:
                    adj += 1
                    tr = (tr + [""] * n)[:n]
                base[key] = {"t": v.get("text_uthmani", ""),
                             "j": v.get("juz_number", 0),
                             "p": v.get("page_number", 0),
                             "tr": tr}
            pg = d.get("pagination", {})
            if not pg or pg.get("next_page") in (None, 0):
                break
            page += 1
        time.sleep(0.15)
        if c % 20 == 0:
            print(f"  base chapter {c}/114", flush=True)

    p = os.path.join(ROOT, "data", "verse-base.json")
    json.dump(base, open(p, "w", encoding="utf-8"), ensure_ascii=False, separators=(",", ":"))
    print(f"wrote {p} ({len(base)} ayat, {os.path.getsize(p)//1024} KB, {adj} translit-adjusted)")


if __name__ == "__main__":
    main()
