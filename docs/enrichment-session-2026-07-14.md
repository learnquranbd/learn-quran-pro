# Enrichment session — 2026-07-14

Multi-agent deep-enrichment sweep across the app. Each wave = parallel agents on
disjoint files; the orchestrator merged i18n keys (English + Bengali), ran
`node --check` on every touched file, checked for duplicate keys, and bumped the
PWA cache version so each wave shipped as one consistent build.

Cache-busting convention: bump every `?v=NN` in `index.html` **and** the matching
`?v=NN` + `const CACHE = 'lq-vNN'` in `sw.js`. Users must hard-reload once for the
new service worker to swap caches. i18n: `t(key,lang)` falls back en → key, so a
key present only in `en` still renders (untranslated) in all 16 languages.

## Bug fix (earlier this session)
- **Word audio misnumbering** — quran.com API's per-word `audio_url` is shifted for
  2,705 ayahs (last word 404 → silent). Fixed in `js/quran-data.js` by deriving the
  CDN URL from the word's sequential index. Reports: `word-audio-audit-2026-07-14.md`,
  `word-audio-issues.csv`, `word-audio-issues-per-word.csv`.

## Feature waves

### v73 — Learning/Quiz enrichment (6 modules)
- **Kids**: 6 Kalimas, duas 6→12 (all cited), 3 new games (Sound/Number/Surah Match)
- **Vocab**: 48 thematic words, spaced-repetition Review mode, root-family quiz
- **99 Names**: 25 Prophets (repo-verified counts), Memorize mode, 2-way quiz
- **Tajweed Learn**: learning path, 17 Makharij, rule-ID drill, common mistakes
- **Quiz Center**: +5 quiz types (9→14): revelation, ayah-count, root-family, word-freq, juz-start
- **Handwriting**: letter forms, guided strokes, pixel-coverage accuracy, progress
- Plus: Word-Arrange 🌶️ Hard mode (decoy words) + font-alignment fix

### v74 — Reading-mode audio + tajweed tap
- Per-ayah play/pause + global "play all" on the **Tajweed** and **Word-by-Word** tabs
  (shared `AudioPlayer`, new `isPlaying`/`currentKey`/`togglePlayAll` + `audioStateChanged`)
- Tap a colored tajweed letter → inline rule name + description

### v75 — Wave 2 (6 modules)
- **Tafseer**: source comparison, ayah outline, reading-width, cross-nav, retry
- **Memorize (speech)**: lifetime stats + streak, compounding drill, keyboard fallback
- **Type-Memorize**: live per-word feedback, first-letter hints, tashkeel toggle, stats
- **Mushaf**: juz jump, page bookmarks, progress, sepia/night filter, extra keys
- **Topics**: 6 verse-verified collections, favourites, recently-viewed, random
- **Ponder**: reflection journal (localStorage), 16 tadabbur prompts, streak

### v76 — Wave 3 (6 modules)
- **Amal**: morning/evening adhkar checklist + after-salah tasbih counter (all hadith-cited), streak
- **Khatmah**: pace presets + pages/day calc, catch-up, streak, projected finish, mushaf jump
- **Grammar**: POS legend + highlight filter, per-ayah summary, root→Sarf, corpus links
- **Bookmarks**: named collections, search, sort, JSON backup/import
- **Learn hub**: progress dashboard (reads each module's localStorage), continue-learning, goals
- **Sarf**: root search, summary header, prev/next, practice quiz, last-root memory

### v77 — Wave 4 (4 modules)
- **Word-Repetition**: sort/min-count/text filters, copy list, top-words bar chart, overview stats, Search deep-link
- **Ayah modal**: prev/next word + ayah nav, per-word grammar snippet + root→Sarf, full-ayah play/pause, copy verse, keyboard
- **Quick Navigation**: go-to-verse input, recent ranges, continue, random surah/juz, Meccan/Medinan badges
- **Settings drawer**: translation size, Arabic line-spacing, reciter mirror, reset-to-defaults, sectioned

## Notes
- All content constrained to verifiable material: counts derived from bundled data,
  hadith only well-known sahih with citations, no invented tafsir/references.
- Everything is on disk and **uncommitted** — ready to commit to a branch on request.
</content>
