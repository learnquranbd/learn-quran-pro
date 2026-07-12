# Learn Quran — Multi-Language Quran Reader & Study App

A modern, multi-language Quran study web app: read, understand word-by-word,
study Arabic grammar, listen with word-timed highlighting, memorize with speech
recognition, and learn Quranic Arabic interactively. Vanilla JS + Tailwind (no
build step) — a spiritual successor to [learn-quran-bd.web.app](https://learn-quran-bd.web.app),
rebuilt for English, Bangla, Arabic, Urdu, Indonesian, Turkish and French.

## Features

- **Reading** — word-by-word Arabic + meaning, transliteration, translation
  (switchable source per language), with per-ayah and global show/hide toggles.
- **Word study** — tap any word for its grammar (corpus-style morphology), root,
  exact-word repetitions and same-root occurrences across the Quran.
- **Tafseer** — multiple sources per language, inline accordions.
- **Grammar** — full morphological breakdown from the Quranic Arabic Corpus.
- **Tajweed** — color-coded recitation rules with a sticky rule guide.
- **Audio** — recitation with word-timed highlighting (multiple reciters).
- **Memorize** — recite and get instant word-by-word feedback via speech
  recognition, per-ayah voice recording, and restart-from-any-ayah.
- **Learn** — kids' Qaida (letters → sounds → reading), Quranic vocabulary
  trainer, 99 Names of Allah, and an interactive Arabic learning hub.
- **Navigation** — full topic/subject/story/dua catalog, searchable surah &
  juz quick-nav, mushaf page view, and an "Ayah to Ponder" daily reflection.
- **Accounts (optional)** — Firebase Google sign-in to sync progress across
  devices. Dormant until configured; see `js/firebase-config.js`.

## Running locally

It's a static site — serve the folder with any web server:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Data sources & credits

- Verse text, translations, tafsir & recitations: [Quran.com API](https://quran.com)
- Morphology & grammar: [Quranic Arabic Corpus](https://corpus.quran.com)
- Curated Bangla topic/tafsir content ported from
  [learn-quran-bd.web.app](https://learn-quran-bd.web.app)

## License

Educational / non-commercial use. Quran text and third-party datasets remain
under their respective licenses.
