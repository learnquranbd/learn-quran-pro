# Legacy App (understand-quran / learn-quran-bd.web.app) — Analysis Notes

Condensed from two deep analysis passes (2026-07-11). Source of record:
`/var/www/html/learnquranbd/understand-quran/firebase/public` — served to this app
same-origin via `QuranData.legacyBase = '../understand-quran/firebase/public'`.

## Architecture
Static Firebase site: jQuery + Vue 2 (menu binding) + AdminLTE 3/Bootstrap 4 +
select2 + slick + dFlip. Every sidebar item AJAX-loads `/partials/{path}.html`
into the main view (or an XL modal). Topic partials embed
`CayahArray = "2:106, 2:115, ..."` and a `dynamic_data` object
(`subject`, `introHtml`, `videos`, `books`, `articles`, `extrahtml`).

## Menu data (js/app_v9.js)
Arrays: `ALLAH_secctions` (~l.589), `quran_topics` (601), `quran_duas` (617),
`creations` (627–751, ~120 items), `quranic_langs` (753), `stories` (760, 37),
`pillars_of_islam` (801), `other_secctions` (809–1112, ~240 items).
Surah metadata (l.20–31): `bangla_sura_names`, `arabic_sura_names`,
`surah_bangla_meaning`, `ayat_numbers`, `place_revealed`, `revealed_order`,
`en_suras`, `exact_word_rep_surah`, `lemma_word_rep_surah`, `surah_letter_count`.
Sejda ayahs: 7:206, 13:15, 16:50, 17:109, 19:58, 22:18, 25:60, 27:26, 32:15,
38:24, 41:38, 53:62, 84:21, 96:19.

## resources/ flat-file API (all fetch+inject friendly)
| Path | Coverage | Content |
|---|---|---|
| `verses/{s}_{a}.html` | 6,236 | plain Arabic text (no tags), Indopak orthography |
| `tajweed/{s}_{a}.html` | 6,236 + 112 bismillah `{s}_0` | per-word base64 GIF images (color-coded) + English gloss; div attrs s/a/w/jz |
| `quran/{s}/{a}_ayat.html` | 6,236 | WBW blocks: Arabic span[data-audio=verses.quran.com/wbw/SSS_AAA_WWW.mp3] + Bangla meaning |
| `quran/{s}/{a}_translation.html` | 6,236 | `.transliteration` (Bangla) + `.taisirul > p` |
| `quran/{s}/{a}_tafseer.html` | 6,236 | Bootstrap-3 accordion, 7 Bangla tafsir sources |
| `grammer/{s}_{a}.html` | 6,236 | Bangla word-grammar panels; POS spans `w_pos_*`; repeat hashes in `data-dynamicwords` |
| `wbwgrammer/{s}/{s}_{a}_{w}.png` | 77,429 | per-word morphology diagram (~918×260 PNG) |
| `irab/{s}_{a}.html` | **only surahs 1–8 & 59–114** (2,339) | corpus.quran.com treebank tables + `irab/images/{n}.png` (global counter, path inside HTML) |
| `repeat/{words\|lemma\|rootwords}/{md5}.html` | >3-occurrence items only | concordance lists; hash = PHP md5 of raw corpus UTF-8 (non-NFC diacritic order — DO NOT recompute; read `data-dynamicwords` prefixes `w---`/`l---`/`r---`) |
| `json/surah/{n}.json` | 114 | `{index,name,verse:{verse_N:text},count,juz:[...]}` |
| `json/tajweed/{n}.json` | 114 | `{verse:{verse_N:[{rule,start,end}]}}` char offsets into json/surah text; 18 rules, 60,842 annotations |
| `pdf/s{n}.pdf` | 114 | per-surah Arabic grammar books; + 8 full books incl. norani (46MB) |
| `images/tajweed_quran{,_v2}/{page}.jpg` | 604/605 | color mushaf page scans |
| `images/ashraf_ali_thanvi/qp{page}-{part}.png` | 864 | Nurani mushaf tiles |

## Audio sources used by old app
- Per-word: `https://verses.quran.com/wbw/{SSS}_{AAA}_{WWW}.mp3`
- Per-ayah: `https://everyayah.com/data/Abdullaah_3awwaad_Al-Juhaynee_128kbps/{SSS}{AAA}.mp3`
- Whole surah: `https://www.al-hamdoulillah.com/coran/mp3/files/abdellah-juhani/{SSS}.mp3`

## Theme
Fonts (webfonts/): Kalpurush (Bangla), CustomArabic-Regular, kitab.woff2 (mushaf).
Sidebar #343a40; nav headers #cdf7d5; treeview parents #394b5e; accent .cs1 #394b5e;
surah card header #e1e6e7; ayah chip = bg-secondary pill; action chips bg #555 /
text #b9e2a5, radius 10px; WBW meaning color #273E6D, word hover #e3f7fa;
mushaf read-mode `.qtext .page` Kitab 3.7rem bg #f6fbf1 text #093333 border #5bada5.
Tajweed page tip colors: madd-lazim #d70092, madd-wajib #e72929, ikhfa green,
qalqalah #46b1dd.

## Modules inventory (old app)
Reading view (per ayah: arabic-only / tajweed / WBW+word-audio / translit+translation
/ 7-source tafseer accordion / irab modal / word-layout+repetition modal / prev-next),
surah read-mode (tajweed mushaf, Kitab font), surah grammar PDF flipbook, surah
words+repetition stats, 1,855-subject catalog, duas (7 collections), 37 stories,
~120 creations, ~240 misc subjects, 99 names (asmaul-husna card grid), pillars (5,
plus salat extras), tajweed practice (json rules), ayah-memorization quiz
(json/surah), Arabic typing practice, word-meaning quiz, arabic word-form charts,
nahu/sarf intros, word-frequency indexes, PDF book reader (dFlip), videos module
(curated YouTube per topic), articles links, on-screen Arabic keyboard, waqf signs
chart, mic recorder self-test, howto/terms modals.
