# Enrichment wave — 2026-07-16 (v86 → v87)

Multi-agent enrichment pass. 6 agents, disjoint file ownership; orchestrator merged
i18n keys, resources, and version bump.

## Module enrichments
- **ponder.js** — reflection pool 58→84 ayahs; Share/copy button (native share + clipboard fallback).
- **amal-daily.js** — +3 daily deeds (Al-Baqarah at home, Al-Ikhlas ⅓ Quran, Az-Zalzalah) with graded citations; +2 morning/evening adhkar (Raditu billahi ×3, salawat ×10).
- **khatmah.js** — finish-by-date picker (auto-computes daily portion), one-tap Ramadan 30-day preset, SVG progress ring.
- **bookmarks.js** — recently-read history (chips), jump-to-ayah input (s:a). Storage keys backward-compatible.
- **tafseer.js** — per-ayah bookmarks (restores tafsir source), Share button, unified copy/share/bookmark action cluster.
- **topics-browser.js** — A–Z / verse-count sort toggle (persisted), copy verse references.
- **handwriting.js** — ink color palette (6), brush size (4), Save-as-PNG (flattened w/ guide glyph). Persisted brush prefs.
- **qaida-data.js** — additive `example` field on all 11 harakat entries (voweled demo word + translit + en/bn meaning). Schema unchanged.
- **search.js** — recent-search history (localStorage, deduped, capped 12), Enter-to-record, clear.
- **mushaf.js** — fullscreen reading toggle (Fullscreen API + `f` shortcut + sync). Existing swipe/zoom/sepia/bookmarks preserved.

## New resources (Resources hub, +18 verified live 2025/26)
- Study: Quran 12-21, QuranReflect
- Tafsir: Parallel Quran, QuranV, English Quran, Yaqeen 30-for-30
- Audio: Quran Explorer, Recite Quran, House of Quran
- Arabic: Learn Quran Roots, QuranExcel, Iqra Quranic Words, TajweedMate
- New category **Memorization & Hifz**: Hafiz Quran, Retain Quran
- New category **For Kids**: Kids Land (Farhat Hashmi), Quran Stories 4 Kids
- (Excluded: Tanzil, Al Quran Cloud, Corpus Coranicum — already listed under dev.)

## i18n
19 new keys added to `en` + `bn` (fallback covers other 14 languages) + 2 new category titles.
Duplicate-key scan: 0 dupes across all language blocks. All 12 touched JS files pass `node --check`.
