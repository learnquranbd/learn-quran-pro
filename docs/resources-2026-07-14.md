# Curated external resources — 2026-07-14

Surfaced in the app's new **Resources** tab (`js/resources.js`, `RESOURCES_DATA`).
Found via a 6-agent web-research sweep; **every URL was fetched/verified live and
vetted for reputability** before inclusion. Religious content, so low-quality,
sectarian-polarizing, or unverifiable sites were deliberately excluded.

## Read & Study
Quran.com · QuranWBW · Greentech Al Quran (gtaf.org) · Quranflash · Al-Quran.info · KSU Ayat (quran.ksu.edu.sa)

## Tafsir & Translation
AlTafsir.com (Royal Aal al-Bayt Institute) · Alim.org · IslamAwakened · Quranx.com · QuranEnc (Rowwad/King Fahd Complex)

## Recitation & Memorization
EveryAyah · QuranicAudio · MP3Quran · Assabile · Tarteel AI

## Arabic, Grammar & Lexicons
Quranic Arabic Corpus (Univ. of Leeds) · Arabic Almanac (ejtaal.net) · The Arabic Lexicon (Hawramani) · Madinah Arabic · Bayyinah TV · Al-Dirassa (tajweed)

## APIs, Data & Research
Quran Foundation API · Al Quran Cloud API · Tanzil · Quranic Universal Library (qul.tarteel.ai) · KFGQPC Fonts (fonts.qurancomplex.gov.sa) · Corpus Coranicum (BBAW)

## Bengali Resources
Al Quran Digital / Islamic Foundation (quran.gov.bd) · Hadithbd · iHadis (IRD Foundation) · Quraner Alo · Quran.com (Bengali)

## Notability / neutrality notes
- IslamAwakened aggregates 70+ translations (incl. some idiosyncratic ones) — included for breadth of *comparison*, not endorsement.
- al-islam.org (excellent, but explicitly Shia) and quranbrowser.org / any Rashad-Khalifa-defaulting aggregators were **excluded** to keep the default set mainstream/neutral.
- Several sites (altafsir, hadithbd, mp3quran, islamawakened, qurancentral) return HTTP 403 to bots but are confirmed live and reputable via independent corroboration.

## Integration
New `resources` tab: sidebar entry (`app-nav.js`), `TAB_META` (`tabs.js`), panel + script (`index.html`), precache (`sw.js`). Descriptions bilingual (en + bn) inline in `RESOURCES_DATA`; other UI languages fall back to English. Links open in a new tab (`rel="noopener noreferrer"`).
