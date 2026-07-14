# Word-by-word audio audit & fix — 2026-07-14
Reported issue: **Al-Isra 17:69 — the last word (تَبِيعًۭا) does not play, and some words play the wrong / no audio.**
## Root cause
The app plays per-word audio from quran.com's CDN (`https://audio.qurancdn.com/wbw/{surah}_{ayah}_{index}.mp3`). It used to take the file URL straight from the API's per-word `audio_url` field. For many ayahs that field is **misnumbered**: quran.com's word metadata skips one or more file indices, so from the first skip onward every word points at the *next* word's clip, and the **last word points at a file index that does not exist → HTTP 404 → silence**.
The CDN itself is always numbered **sequentially, one file per real word** (`001…N`). So the reliable source is the word's running index among the verse's real words, not the API's `audio_url`.
### Worked example — 17:69 (the reported ayah), word by word
22 real words → CDN files `017_069_001.mp3 … _022.mp3` all exist. The API skips index `016`, so every word from #16 on plays the *next* word's clip, and the last word points at `_023.mp3`, which doesn't exist:

| Word # | Word | Was playing | Should play | Result |
|---|---|---|---|---|
| 16 | ثُمَّ | `017.mp3` | `016.mp3` | wrong clip |
| 17 | لَا | `018.mp3` | `017.mp3` | wrong clip |
| 18 | تَجِدُوا۟ | `019.mp3` | `018.mp3` | wrong clip |
| 19 | لَكُمْ | `020.mp3` | `019.mp3` | wrong clip |
| 20 | عَلَيْنَا | `021.mp3` | `020.mp3` | wrong clip |
| 21 | بِهِۦ | `022.mp3` | `021.mp3` | wrong clip |
| 22 | تَبِيعًۭا | `023.mp3` | `022.mp3` | 🔇 silent (404) |

Words 1–15 were already correct. This fix reassigns 16→16 … 22→22.
## Fix
`js/quran-data.js` → `normalizeVerse()` now derives each word's audio URL from its 1-based running index via the new `wordAudioUrl(surah, ayah, idx)` helper, instead of trusting `audio_url`. Correct ayahs are unchanged; misnumbered ones are repaired.
## Verification (spot-checked against the live CDN)
| Ayah | Last word: fixed file | Old API file |
|---|---|---|
| 2:2 | 007 → 200 ✅ | 009 → 404 ❌ |
| 3:4 | 018 → 200 ✅ | 020 → 404 ❌ |
| 4:1 | 028 → 200 ✅ | 030 → 404 ❌ |
| 6:1 | 014 → 200 ✅ | 015 → 404 ❌ |
| 8:1 | 018 → 200 ✅ | 021 → 404 ❌ |
| 9:2 | 014 → 200 ✅ | 015 → 404 ❌ |
| 17:69 | 022 → 200 ✅ | 023 → 404 ❌ |
| 2:255 | 050 → 200 ✅ | 058 → 404 ❌ |

## Scope (full Quran scan via the quran.com API)
- Ayahs scanned: **6,236**
- Real words scanned: **77,429**
- **Affected ayahs (misnumbered): 2,705** — every one had a silent (404) last word before this fix.
- Words with a missing (`null`) `audio_url` from the API: **1** → 36:52 word 7 (هَـٰذَا); its CDN file exists, so the index-based URL also recovers it.

Two machine-readable lists sit next to this file:
- **`word-audio-issues.csv`** — one row per affected ayah (first wrong word, last-word wrong/correct file, count of shifted words).
- **`word-audio-issues-per-word.csv`** — one row per affected *word*: exactly which clip it *was* playing, which it *should* play, and whether it was silent (404).

### Affected ayahs per surah
| Surah | Affected ayahs |
|---|---|
| 2 | 212 |
| 3 | 126 |
| 4 | 132 |
| 5 | 98 |
| 6 | 130 |
| 7 | 118 |
| 8 | 50 |
| 9 | 100 |
| 10 | 73 |
| 11 | 87 |
| 12 | 63 |
| 13 | 33 |
| 14 | 37 |
| 15 | 8 |
| 16 | 84 |
| 17 | 62 |
| 18 | 45 |
| 19 | 34 |
| 20 | 42 |
| 21 | 47 |
| 22 | 45 |
| 23 | 29 |
| 24 | 44 |
| 25 | 30 |
| 26 | 29 |
| 27 | 37 |
| 28 | 53 |
| 29 | 50 |
| 30 | 37 |
| 31 | 25 |
| 32 | 14 |
| 33 | 50 |
| 34 | 33 |
| 35 | 36 |
| 36 | 21 |
| 37 | 15 |
| 38 | 29 |
| 39 | 46 |
| 40 | 45 |
| 41 | 27 |
| 42 | 38 |
| 43 | 26 |
| 44 | 17 |
| 45 | 19 |
| 46 | 20 |
| 47 | 17 |
| 48 | 20 |
| 49 | 15 |
| 50 | 14 |
| 51 | 10 |
| 52 | 12 |
| 53 | 6 |
| 54 | 8 |
| 55 | 3 |
| 56 | 1 |
| 57 | 26 |
| 58 | 20 |
| 59 | 20 |
| 60 | 11 |
| 61 | 8 |
| 62 | 7 |
| 63 | 8 |
| 64 | 16 |
| 65 | 9 |
| 66 | 8 |
| 67 | 13 |
| 68 | 6 |
| 69 | 3 |
| 70 | 5 |
| 71 | 2 |
| 72 | 7 |
| 73 | 3 |
| 74 | 4 |
| 75 | 1 |
| 76 | 7 |
| 77 | 1 |
| 78 | 3 |
| 79 | 1 |
| 82 | 1 |
| 83 | 2 |
| 85 | 2 |
| 87 | 1 |
| 89 | 2 |
| 98 | 3 |
| 100 | 1 |
| 104 | 1 |
| 110 | 1 |

## How to regenerate
`scratchpad/scan_word_audio.py` re-scans the API; `scratchpad/gen_report.py` rebuilds this report and the CSV from the scan JSON.
