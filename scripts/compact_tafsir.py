#!/usr/bin/env python3
"""
Store grouped tafsirs COMPACTLY: keep a verse's text only where it differs from
the previous verse in the same surah (i.e. at each commentary group's start).
This inverts a forward-fill and keeps files small; the loader forward-fills at
read time. Idempotent. Usage: python3 scripts/compact_tafsir.py [<id> ...]
"""
import json, os, sys, glob

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ref = json.load(open(os.path.join(ROOT, "data", "quran-words.json"), encoding="utf-8"))
ORDER = sorted(ref.keys(), key=lambda k: (int(k.split(":")[0]), int(k.split(":")[1])))


def compact(path):
    d = json.load(open(path, encoding="utf-8"))
    before = len(d)
    out, last = {}, {}
    for key in ORDER:
        s = key.split(":")[0]
        txt = d.get(key, "")
        if txt.strip() and txt != last.get(s):
            out[key] = txt
            last[s] = txt
    json.dump(out, open(path, "w", encoding="utf-8"), ensure_ascii=False, separators=(",", ":"))
    print(f"{os.path.basename(path)}: {before} -> {len(out)} group-keys ({os.path.getsize(path)//1024} KB)")


if __name__ == "__main__":
    ids = sys.argv[1:]
    files = [os.path.join(ROOT, "data", "tafsir", f"{i}.json") for i in ids] if ids \
        else sorted(glob.glob(os.path.join(ROOT, "data", "tafsir", "*.json")))
    for f in files:
        if os.path.exists(f):
            compact(f)
