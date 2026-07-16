# v92 → v93 — Offline per-language reading data, Prophets module, back-button, nav

## Offline word-by-word + translation (the big one)
Previously ayah text, word-by-word glosses, and translations were fetched live from
quran.com at read time — so non-WBW languages (fr, es, ms, zh, ja, de, ru) silently
showed **English** word glosses, and everything broke offline. Now bundled static:

- `data/verse-base.json` — language-neutral: `{ "s:a": { t:uthmani, j:juz, p:page, tr:[translit] } }`.
- `data/translations/<lang>.json` — native ayah translation for **all 14** translatable
  UI languages (en, bn, ur, id, tr, fa, ru, de, hi, fr, es, ms, zh, ja). ~18 MB total.
- `data/wbw/<lang>.json` — native word glosses for the **7** languages quran.com actually
  has them (en, bn, ur, id, tr, fa, hi). Other languages reuse `en.json` glosses but now
  get their **native ayah translation**. ~11 MB total.

`js/quran-data.js` `fetchRange()` now builds each range **offline-first** from these files
(`buildLocalRange`), falling back to the quran.com API only when a file/range is missing.
Corrected `WBW_LANGS` to the 7 genuinely-native languages (de/ru were English fallbacks on
quran.com — removed their mislabeled files). Verified: bn→Bengali gloss+translation,
ur→Urdu, zh→Chinese translation+English gloss, ar→no translation line, all with correct
transliteration/juz/page. Generators: `scripts/gen_offline_lang.py`, `gen_verse_base.py`.
Primary languages (en, bn) + base are precached; others cache on demand.

## New module: Prophets & Messengers (tab `prophets`)
All 25 prophets named in the Quran (11 Rasul, 5 Ulul-'Azm), timeline + grid views,
per-prophet story/events/verified refs/lesson, search + filters, mark-as-read.
Muhammad ﷺ links into the existing Seerah timeline. Grouped in the sidebar under a new
**Nabi & Rasul** section (with the Seerah timeline). Refs verified against SURAH_DATA;
aniconic (no figurative depictions).

## Browser Back button support
`js/tabs.js` now integrates with the History API: each tab switch pushes a `{lqTab}`
state entry and `popstate` restores the tab — so browser Back returns to the previous
module instead of leaving the app. Uses history STATE, not the hash (the hash is already
used for ayah deep-links), so it doesn't collide with ayah routing.

## Sidebar changes
- Pinned **Similar Verses** and **Memorize** to the top of the sidebar (per request).
- New **Nabi & Rasul** group (Prophets + Seerah). Generalized the app-nav drill-down state
  machine to track the active group id (was hardcoded to the single "learn" group).

## Enrichments folded in
- Seerah: **Major Topics** view (character, family, companions/caliphs, worship, signs &
  miracles, mercy, Farewell Sermon) + battlefield SVGs from earlier.
- Why Islam: expanded to **14 topics + 13 Q&A** + "how to embrace Islam" info card.

## Pending (next)
- **Offline tafsir**: generated bn (Ibn Kathir, 24.8 MB) + en (11 MB) into `data/tafsir/`
  but NOT yet committed/wired — needs a size-conscious lazy loader in tafseer.js. quran.com
  has tafsir for en/ar/bn/ur/ru; QUL (Mukhtasar) covers id/tr/fa/hi/fr/es/zh/ja; de/ms have none.
- WBW gaps (es, ms, de, ru, ja, zh): no authentic dataset exists (fr recoverable from QUL id 95).

Cache v92 → v93. All 54 JS pass `node --check`; 0 duplicate keys; offline loader + Prophets
module runtime-smoke-tested (en/bn/fr).
