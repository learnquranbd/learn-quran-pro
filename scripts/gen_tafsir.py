#!/usr/bin/env python3
"""
Bundle a full tafsir offline: data/tafsir/<id>.json = { "s:a": "<html text>" }
Source: quran.com API v4  GET /tafsirs/<id>/by_chapter/<c>?per_page=300
Usage: python3 scripts/gen_tafsir.py <id> [<id> ...]
Recommended ids: en=169 (Ibn Kathir abridged), ar=16 (al-Muyassar),
                 bn=164 (Ibn Kathir), ur=160 (Ibn Kathir), ru=170 (al-Saʿdi)
"""
import json, os, sys, time, urllib.request

API = "https://api.quran.com/api/v4"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def get(u, tries=4):
    last = None
    for i in range(tries):
        try:
            return json.load(urllib.request.urlopen(
                urllib.request.Request(u, headers={"User-Agent": "lq-tafsir"}), timeout=90))
        except Exception as e:  # noqa
            last = e; time.sleep(2 * (i + 1))
    raise last


def gen(tid):
    out = {}
    for c in range(1, 115):
        page = 1
        while True:
            d = get(f"{API}/tafsirs/{tid}/by_chapter/{c}?per_page=300&page={page}")
            for t in d.get("tafsirs", []):
                k = t.get("verse_key")
                if k:
                    out[k] = t.get("text", "") or ""
            pg = d.get("pagination", {})
            if not pg or pg.get("next_page") in (None, 0):
                break
            page += 1
        time.sleep(0.15)
        if c % 20 == 0:
            print(f"  [tafsir {tid}] chapter {c}/114", flush=True)
    os.makedirs(os.path.join(ROOT, "data", "tafsir"), exist_ok=True)
    p = os.path.join(ROOT, "data", "tafsir", f"{tid}.json")
    json.dump(out, open(p, "w", encoding="utf-8"), ensure_ascii=False, separators=(",", ":"))
    print(f"[tafsir {tid}] wrote {p} ({len(out)} ayat, {os.path.getsize(p)//1024} KB)")


if __name__ == "__main__":
    for tid in sys.argv[1:]:
        gen(tid)
