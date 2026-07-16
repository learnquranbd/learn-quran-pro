#!/usr/bin/env python3
"""
Generate offline, per-language static data for the Quran reader so word-by-word
meanings and ayah translations work fully offline in every language (no live
quran.com call, no silent English fallback).

For each language it can emit:
  data/translations/<lang>.json  = { "s:a": "full ayah translation" }
  data/wbw/<lang>.json           = { "s:a": ["w1 meaning", "w2 meaning", ...] }
                                    aligned 1:1 to data/quran-words.json word arrays.

Source: quran.com API v4 (the same source the app already uses live). WBW is only
emitted for languages quran.com actually has word translations for; other languages
reuse en.json for glosses but still get their native ayah translation.

Usage:  python3 scripts/gen_offline_lang.py <lang> [--no-wbw] [--no-tr]
"""
import json, sys, os, re, time, urllib.request, urllib.error

API = "https://api.quran.com/api/v4"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# UI lang -> quran.com verse-translation resource id (mirrors TRANSLATION_IDS in js/quran-data.js)
TRANSLATION_IDS = {
    "en": 20, "bn": 161, "fr": 31, "id": 33, "ur": 234, "tr": 77,
    "es": 83, "ru": 45, "fa": 29, "hi": 122, "de": 27, "ms": 39,
    "zh": 56, "ja": 35,
}
# Languages quran.com has real word-by-word translations for.
WBW_LANGS = {"en", "bn", "ur", "id", "tr", "fa", "ru", "de", "ta", "ml", "hi"}

TAG_RE = re.compile(r"<[^>]+>")
FOOT_RE = re.compile(r"\s*\[\[.*?\]\]\s*")  # occasional footnote markers


def clean(txt):
    if not txt:
        return ""
    txt = TAG_RE.sub("", txt)          # strip <sup>, <i> footnote markup
    txt = FOOT_RE.sub(" ", txt)
    return " ".join(txt.split()).strip()


def fetch_json(url, tries=4):
    last = None
    for i in range(tries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "lq-offline-gen"})
            with urllib.request.urlopen(req, timeout=60) as r:
                return json.load(r)
        except Exception as e:  # noqa
            last = e
            time.sleep(1.5 * (i + 1))
    raise last


def gen(lang, do_wbw=True, do_tr=True):
    words_ref = json.load(open(os.path.join(ROOT, "data", "quran-words.json"), encoding="utf-8"))
    tr_id = TRANSLATION_IDS.get(lang)
    wbw_lang = lang if lang in WBW_LANGS else "en"
    emit_wbw = do_wbw and (lang in WBW_LANGS or lang == "en")

    translations, wbw = {}, {}
    mismatches = 0
    for c in range(1, 115):
        page = 1
        while True:
            params = (f"words=true&language={wbw_lang}&word_fields=text_uthmani"
                      f"&fields=text_uthmani&per_page=50&page={page}")
            if do_tr and tr_id:
                params += f"&translations={tr_id}"
            data = fetch_json(f"{API}/verses/by_chapter/{c}?{params}")
            for v in data.get("verses", []):
                key = v["verse_key"]
                if do_tr and tr_id:
                    tl = v.get("translations") or []
                    translations[key] = clean(tl[0]["text"]) if tl else ""
                if emit_wbw:
                    glosses = [clean((w.get("translation") or {}).get("text", ""))
                               for w in v.get("words", [])
                               if w.get("char_type_name") == "word"]
                    ref_n = len(words_ref.get(key, []))
                    if ref_n and len(glosses) != ref_n:
                        mismatches += 1
                        # align conservatively: pad/truncate to the reference length
                        glosses = (glosses + [""] * ref_n)[:ref_n]
                    wbw[key] = glosses
            pg = data.get("pagination", {})
            if not pg or pg.get("next_page") in (None, 0):
                break
            page += 1
        time.sleep(0.15)
        if c % 20 == 0:
            print(f"  [{lang}] chapter {c}/114", flush=True)

    os.makedirs(os.path.join(ROOT, "data", "translations"), exist_ok=True)
    os.makedirs(os.path.join(ROOT, "data", "wbw"), exist_ok=True)
    if do_tr and tr_id:
        p = os.path.join(ROOT, "data", "translations", f"{lang}.json")
        json.dump(translations, open(p, "w", encoding="utf-8"), ensure_ascii=False, separators=(",", ":"))
        print(f"[{lang}] wrote {p} ({len(translations)} ayat, {os.path.getsize(p)//1024} KB)")
    if emit_wbw:
        p = os.path.join(ROOT, "data", "wbw", f"{lang}.json")
        json.dump(wbw, open(p, "w", encoding="utf-8"), ensure_ascii=False, separators=(",", ":"))
        print(f"[{lang}] wrote {p} ({len(wbw)} ayat, {os.path.getsize(p)//1024} KB, {mismatches} length-adjusted)")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(__doc__); sys.exit(1)
    lang = sys.argv[1]
    gen(lang, do_wbw="--no-wbw" not in sys.argv, do_tr="--no-tr" not in sys.argv)
