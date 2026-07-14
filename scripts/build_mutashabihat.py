#!/usr/bin/env python3
"""Build data/mutashabihat.json — for each verse, the OTHER verses across the
Quran that share a long identical phrase (the 'similar verses' huffaz confuse).

Computed only from the repo's own data/quran-tokens.json (normalized per-verse
word lists). Output per verse: [[ref, phraseLen, startIdxInThisVerse], ...]
(top N by phrase length). Nothing is copied from any third party."""
import json, collections, os

ROOT = "/var/www/html/learnquranbd/all-language-quran"
MIN_LEN = 4          # minimum shared phrase length (in normalized words)
NGRAM = 4            # seed n-gram length for candidate generation
MAX_CAND = 60        # cap candidates examined per verse (by shared-seed count)
TOP_PER_VERSE = 12   # keep this many similar verses per verse

tokens = json.load(open(os.path.join(ROOT, "data/quran-tokens.json"), encoding="utf-8"))
keys = list(tokens.keys())

# --- seed inverted index: NGRAM -> set of verse keys ---
inv = collections.defaultdict(set)
for k, toks in tokens.items():
    for i in range(len(toks) - NGRAM + 1):
        inv[tuple(toks[i:i + NGRAM])].add(k)
# drop unique seeds (no sharing) to save memory
inv = {g: vs for g, vs in inv.items() if len(vs) > 1}

def longest_common_run(a, b):
    """Longest common CONTIGUOUS token run; returns (length, start_in_a)."""
    n, m = len(a), len(b)
    if n == 0 or m == 0:
        return 0, 0
    prev = [0] * (m + 1)
    best_len = best_end_a = 0
    for i in range(1, n + 1):
        cur = [0] * (m + 1)
        ai = a[i - 1]
        for j in range(1, m + 1):
            if ai == b[j - 1]:
                v = prev[j - 1] + 1
                cur[j] = v
                if v > best_len:
                    best_len = v; best_end_a = i
        prev = cur
    return best_len, best_end_a - best_len   # start index in a

result = {}
verses_with_matches = 0
total_pairs = 0
for k in keys:
    toks = tokens[k]
    if len(toks) < MIN_LEN:
        continue
    # gather candidates sharing seed n-grams, ranked by shared-seed count
    cand = collections.Counter()
    for i in range(len(toks) - NGRAM + 1):
        g = tuple(toks[i:i + NGRAM])
        vs = inv.get(g)
        if not vs:
            continue
        for other in vs:
            if other != k:
                cand[other] += 1
    if not cand:
        continue
    sims = []
    for other, _ in cand.most_common(MAX_CAND):
        ln, start = longest_common_run(toks, tokens[other])
        if ln >= MIN_LEN:
            sims.append((other, ln, start))
    if not sims:
        continue
    # sort by phrase length desc, then by reference order; keep top N
    sims.sort(key=lambda x: (-x[1], x[0]))
    sims = sims[:TOP_PER_VERSE]
    result[k] = [[r, ln, st] for (r, ln, st) in sims]
    verses_with_matches += 1
    total_pairs += len(sims)

out_path = os.path.join(ROOT, "data/mutashabihat.json")
json.dump(result, open(out_path, "w", encoding="utf-8"), ensure_ascii=False, separators=(",", ":"))
size = os.path.getsize(out_path)
print(f"verses with similar-verse matches: {verses_with_matches}")
print(f"total stored pairs: {total_pairs}")
print(f"file: {out_path}  ({size/1024:.0f} KB)")
# quick sanity samples
for s in ("1:1", "2:2", "2:255", "26:109"):
    print(s, "->", result.get(s, [])[:3])
