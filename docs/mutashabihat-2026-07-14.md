# Mutashabihat (Similar Verses) — 2026-07-14

New **🪞 Similar Verses** tab: for a chosen surah, lists every ayah that shares a
long identical phrase (≥ 4 normalized words) with verses elsewhere in the Quran —
the *mutashabihat* huffaz most often confuse. The shared phrase is highlighted and
each look-alike verse is one tap away (opens the ayah modal).

## Data provenance (important)
`data/mutashabihat.json` is computed **entirely from the app's own bundled
`data/quran-tokens.json`** by `scripts/build_mutashabihat.py` — NOT copied from any
third-party app or dataset. Method: seed 4-gram inverted index → candidate verse
pairs → longest common contiguous token run per pair → keep phrases ≥ 4 words →
store top 12 similar verses per verse as `[ref, phraseLen, startIdxInThisVerse]`.
Result: 2,800 verses with matches, 12,455 pairs, ~198 KB. Display Arabic comes from
`data/quran-words.json` (1:1 aligned with the tokens).

Spot-checks: 1:1→27:30 (basmala in Sulayman's letter); 26:109→26:127/145/164
(the 11-word repeated refrain in Ash-Shu'ara); 2:255→20:110 (8-word match).

## Files
`js/mutashabihat.js` (module), `data/mutashabihat.json` (index),
`scripts/build_mutashabihat.py` (regenerator). Wired as tab `mutashabihat`:
`index.html` panel + script, `tabs.js` TAB_META, `app-nav.js` sidebar, `sw.js`
precache (script + json). i18n keys `mutashabihat_*` / `mt_words` (en + bn).
