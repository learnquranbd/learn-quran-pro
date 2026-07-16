#!/usr/bin/env python3
"""
Some tafsirs (Ibn Kathir, Muyassar) group several ayat under one commentary keyed
at the group's FIRST verse. quran.com's by_ayah returns that group text for every
verse in the range, but our by_chapter bulk pull only captured the group-start
keys — so mid-group verses would miss offline. This forward-fills each grouped
tafsir within every surah so all 6236 verses resolve locally. Idempotent for
already-per-verse tafsirs. Usage: python3 scripts/expand_tafsir.py [<id> ...]
"""
import json, os, sys, glob

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Ordered verse keys from the canonical word list.
ref = json.load(open(os.path.join(ROOT, "data", "quran-words.json"), encoding="utf-8"))
ORDER = sorted(ref.keys(), key=lambda k: (int(k.split(":")[0]), int(k.split(":")[1])))


def expand(path):
    d = json.load(open(path, encoding="utf-8"))
    before = len(d)
    out, cur_surah, carry = {}, None, ""
    for key in ORDER:
        s = key.split(":")[0]
        if s != cur_surah:
            cur_surah, carry = s, ""      # reset carry at each surah boundary
        if d.get(key, "").strip():
            carry = d[key]
        if carry.strip():
            out[key] = carry
    json.dump(out, open(path, "w", encoding="utf-8"), ensure_ascii=False, separators=(",", ":"))
    print(f"{os.path.basename(path)}: {before} -> {len(out)} ayat ({os.path.getsize(path)//1024} KB)")


if __name__ == "__main__":
    ids = sys.argv[1:]
    files = [os.path.join(ROOT, "data", "tafsir", f"{i}.json") for i in ids] if ids \
        else sorted(glob.glob(os.path.join(ROOT, "data", "tafsir", "*.json")))
    for f in files:
        if os.path.exists(f):
            expand(f)
