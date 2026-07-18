# OpenCode Session Skills & Project Map

## Project: `all-language-quran`
Multi-language Quran Reader with Tafseer, Word by Word, Grammar, Audio and Video lectures.

**Repo**: `https://github.com/learnquranbd/all-language-quran`
**Stack**: Vanilla JS, Tailwind CSS, Firebase, Service Worker (PWA)
**License**: MIT

---

## Architecture Overview

### Key Files & Their Roles

| File | Purpose |
|------|---------|
| `index.html` | Single-page app shell; loads all JS via `<script>` tags with cache-busting `?v=NNN` |
| `js/translations.js` | Central `TRANSLATIONS` object: `{ en: { key: val }, bn: { key: val }, ... }` for 15 languages |
| `js/content-i18n.js` | `CI18N.tr(lang, enText)` — lazily fetches `data/content-i18n/<lang>.json` for module content text |
| `js/learn.js` | `LearnHub` class — `LEARN_CARDS` registry, progress tracking, dashboard rendering |
| `js/tabs.js` | `TAB_META` tab registry + `tabSystem.switchTab()` |
| `js/app-nav.js` | `APP_NAV_PRIMARY` sidebar nav tree |
| `js/settings.js` | `appSettings` object for language/theme/etc |
| `sw.js` | Service worker for offline caching |
| `data/content-i18n/<lang>.json` | Content translation dictionaries (en→target) |

### All Modules (Learn Hub)

Registered in `LEARN_CARDS` array in `js/learn.js`:

```js
{ module: 'kids',         emoji: '🧒', grad: 'from-amber-400 to-orange-500',  title: 'learn_kids_title',     desc: 'learn_kids_desc',      level: 'learn_level_beginner' }
{ module: 'vocab',        emoji: '📚', grad: 'from-sky-400 to-blue-600',      title: 'learn_vocab_title',    desc: 'learn_vocab_desc',     level: 'learn_level_beginner' }
{ module: 'names',        emoji: '✨', grad: 'from-violet-400 to-purple-600',  title: 'learn_names_title',    desc: 'learn_names_desc',     level: 'learn_level_intermediate' }
{ module: 'handwriting',  emoji: '✍️', grad: 'from-rose-400 to-pink-600',     title: 'hw_title',             desc: 'hw_subtitle',          level: 'learn_level_beginner' }
{ module: 'memorize',     emoji: '🎙️', grad: 'from-emerald-400 to-green-600', title: 'learn_memorize_title', desc: 'learn_memorize_desc',  level: 'learn_level_advanced' }
{ module: 'tajweedlearn', emoji: '🎨', grad: 'from-cyan-400 to-teal-600',     title: 'tj_learn_title',       desc: 'tj_learn_subtitle',    level: 'learn_level_intermediate' }
```

**To add a module**, you need changes in:
1. `LEARN_CARDS` in `js/learn.js`
2. `this.roots` map in `LearnHub` constructor
3. `moduleProgress()` switch statement
4. DOM element in `index.html` (`#learn-{name}-root`)
5. `js/learn-{name}.js` — class with `learnModuleSelected` event listener
6. `js/app-nav.js` (sidebar entry)
7. `<script>` tag in `index.html`

### Tab-Based Modules (full UI panels)

| Tab ID | JS File | TAB_META key |
|--------|---------|--------------|
| `tajweedlearn` | `js/learn-names.js` | `tj_learn_title` |
| `memorize` | `js/memorize.js` | `memorize` |
| `quranicarabic` | `js/learn-quranic-arabic.js` | `qa_title` |
| `seerah` | `js/seerah-timeline.js` | `seerah_title` |
| `nuzul` | `js/nuzul-timeline.js` | `nuzul_title` |
| `prophets` | `js/prophets.js` | `prophets_title` |
| `whyislam` | `js/why-islam.js` | `whyislam_title` |

### i18n Patterns

1. **Translations.js**: `t(key, lang)` — primary lookup in `TRANSLATIONS[lang]`
2. **Fallback objects**: Each module defines its own `*_I18N_FALLBACK` for unmerged keys:
   - `LEARN_I18N_FALLBACK` in `learn.js`
   - `VOCAB_I18N_FALLBACK` in `learn-vocab.js`
   - `SEERAH_UI` in `seerah-timeline.js`
   - etc.
3. **Content i18n**: Module content items use `*En`/`*Bn` suffix pairs + `CI18N.tr()` for other languages
4. **Supported languages**: `en`, `bn`, `ar`, `ur`, `id`, `tr`, `fr`, `es`, `de`, `ru`, `hi`, `fa`, `ms`, `zh`, `ja`

### Module Content Loading Strategies

**A. Inline in JS** (seerah, qarabic, names, kids) — all data in `const` arrays
**B. JSON data files loaded via manifest** (seerah, nuzul, qarabic) — `data/<module>/manifest.json`
**C. Separate data JS file** (vocab-data.js, names-data.js, qaida-data.js)

### Module Registration Checklist

1. `LEARN_CARDS` array entry
2. Root div in `index.html`
3. Root in `LearnHub.roots` map
4. Case in `moduleProgress()`
5. Module JS file with class + event listeners
6. Script tag in `index.html`
7. Sidebar entry in `app-nav.js`

### localStorage Progress Keys

| Module | Keys |
|--------|------|
| kids | `kidsQuizBest`, `kidsWordMatchBest`, `kidsStreakCount`, `kidsStreakDate` |
| vocab | `vocabKnown`, `vocabReview`, `vocabQuizBest`, `lq_vocab_fav` |
| names | `namesLearned`, `lq_names_favorites`, `namesQuizBest` |
| handwriting | `hw_progress` |
| memorize | `memorizeStats` |
| tajweedlearn | `tajweedLearned` |
| seerah | `lq_seerah_read`, `lq_seerah_story_pos`, `lq_seerah_quiz_best` |
| learn hub | `learnLastModule`, `lq_learn_pins` |

### Seerah Module (`js/seerah-timeline.js`)

- ~2022 lines, single monolithic file
- 7 views: timeline, story, topics, quiz (with filter: before/meccan/medinan/farewell)
- Data: `SEERAH_ERAS`, `SEERAH_EVENTS`, `SEERAH_BATTLES`, `SEERAH_TOPICS`, `SEERAH_PLACES`, `SEERAH_COMPANIONS`, `SEERAH_ASHARA`, `SEERAH_LESSONS`, `SEERAH_MECCAN_MEDINAN`
- Content inline in JS with `*En`/`*Bn` fields
- Supplemental content loader merges from `data/seerah/*.json` files
- Translation keys in `SEERAH_UI` object (30+ keys)

### Current Work: v103

- Adding zh/ja translations to all i18n fallback objects
- Modified files: `amal-daily.js`, `learn-kids.js`, `learn-vocab.js`, `learn.js`, `mushaf.js`, `ponder.js`, `qaida-data.js`, `quran-data.js`, `resources.js`, `surah-data.js`, `tafseer.js`, `tajweed-learn.js`, `topics-browser.js`, `topics-data.js`, `vocab-data.js`, `names-data.js`
- Cache bust from `?v=102` to `?v=103`
- All 24 modified files in git working tree

### Session 2026-07-17: Seerah Resource Enrichment

**Changes made to `js/seerah-timeline.js`:**
- Added `SEERAH_RESOURCES` array (15 items across 4 categories): 5 books, 5 websites, 3 video series, 2 podcasts
- Each resource item has `type` (book/web/video/podcast), `emoji`, `nameEn/Bn`, `authorEn/Bn`, `descEn/Bn`
- Added 10 new translation keys to `SEERAH_UI` for resources view UI
- Added `SEERAH_RESOURCES_ICON` SVG (stacked rectangles motif)
- Added Resources button to view toggle (5th view: timeline/story/topics/quiz/resources)
- Added `resourcesHtml()` method — renders resource cards in a 2-column grid with type badge
- Added `this.view === 'resources'` routing in `render()` method
- Added `SEERAH_RESOURCES` support in `mergeSeerahData()` for supplemental content
- File grew from 2022 to 2222 lines (+200 lines)

**Session commands:**
```bash
# Validate JS syntax
node -c js/seerah-timeline.js

# Check resource view integration
grep -c "vbtn.*resources" js/seerah-timeline.js
grep -c "resourcesHtml" js/seerah-timeline.js
```

### Session 2026-07-17: Batch #2 — Three-Module Enrichment Wave

#### 1. Salah Module Enrichment (`js/learn-salah.js` 441→800 lines)

**Added 5-tab view toggle system** (Guide | Wudu | Times | Quiz | Resources):

- **Guide** (default) — info, steps, duas, tasbeeh (existing content)
- **Wudu & Ghusl** — `SALAH_WUDU` (9 steps with emoji+number), ghusl conditions card
- **Salah Times** — `SALAH_TIMINGS` (5 prayers: time window, rakat breakdown)
- **Quiz** — `SALAH_QUIZ` (16 questions, bilingual, best score in `salahQuizBest` localStorage)
- **Resources** — `SALAH_RESOURCES` (13 items: 4 books, 4 websites, 3 videos, 2 apps)
- View toggle: `vbtn()` helper, `data-salah-view` click delegation
- Quiz engine: `quizAnswers{}`, `submitQuiz()`, retake, score tracking

#### 2. Nuzul Module Enrichment (`js/nuzul-timeline.js` 376→660 lines)

**Added:**
- `NUZUL_I18N` — centralized 16-key bilingual i18n fallback (replaces inline `lc({en,bn})` calls)
- `NUZUL_QUIZ` — 16 questions (revelation order, Makki/Madani, asbab, first/last revelations)
- `NUZUL_RESOURCES` — 12 items (5 books, 4 websites, 3 videos)
- 3-tab sub-view toggle (Sūrahs | Quiz | Resources) via `data-nuzul-sub` delegation
- Quiz state: `quizAnswers{}`, `quizSubmitted`, `quizBest` in `lq_nuzul_quiz_best` localStorage
- No conflict with existing detail navigation — `selected` takes priority over `subView`

#### 3. Why Islam Module Enrichment (`js/why-islam.js` 1547→1697 lines)

**Added:**
- `WHY_ISLAM_QUIZ` — 16 questions (tawhid, Quran, prophethood, purpose of life, hereafter, etc.)
- Quiz access: amber-colored quiz card added to home grid (after progress bar, before topic grid)
- Quiz view renders via `currentId === '__quiz__'` special route with back-to-home button
- Quiz state: `quizAnswers{}`, `quizSubmitted`, `quizBest` in `lq_whyislam_quiz_best` localStorage
- 7 new i18n keys: `whyislam_quiz_title/intro/score/best/submit/retake/hint`
- `renderQuiz()` + `wireQuiz()` + `submitQuizWI()` methods following established quiz engine pattern

### Session 2026-07-17: Salah Module (Learn Hub) — Batch #2 Enrichment

**File:** `js/learn-salah.js` (441→800 lines)

**New views added with 5-tab toggle system** (Guide | Wudu | Times | Quiz | Resources):

1. **Guide** (default) — same content as before (info, steps, duas, tasbeeh)
2. **Wudu & Ghusl** — `SALAH_WUDU` (9 steps with emoji, numbered), ghusl conditions card
3. **Salah Times** — `SALAH_TIMINGS` (5 prayers: time window + rakat breakdown in emerald badges)
4. **Quiz** — `SALAH_QUIZ` (16 questions with en/bn bilingual text, 4 options each, score tracking, localStorage `salahQuizBest` persistence, retake support)
5. **Resources** — `SALAH_RESOURCES` (13 items: 4 books, 4 websites, 3 videos, 2 apps with type badge + author line)

**Architecture:**
- `this.view` state management (`'guide'|'wudu'|'timings'|'quiz'|'resources'`)
- View toggle: `vbtn()` helper inside `toggleHtml()`, `data-salah-view` click delegation
- Quiz: `quizAnswers{}`, `quizSubmitted`, `quizBest`, `submitQuiz()` exactly matching seerah pattern
- No initial render delay — uses `setTimeout(() => this.render(), 0)` on first load
- Event delegation via `this.root.addEventListener('click')` — no per-item binders

### Session 2026-07-17: Salah Module (Learn Hub)

**New file:** `js/learn-salah.js` (~390 lines)
- `SALAH_I18N_FALLBACK` — 15 translation keys across all languages
- `SALAH_STEPS` — 11 prayer steps (niyyah → tasleem) with emoji, title, desc
- `SALAH_DUAS` — 11 duas/adhkar (thana, fatiha, ruku tasbeeh, sami'a allahu, rabbana lakal hamd, sujud tasbeeh, jalsah dua, tashahhud, durood, after-tashahhud rabbana, salam) with Arabic, transliteration, meaning (en/bn), reference, optional count
- `SALAH_TASBEEH` — 10 after-salah dhikr items (astaghfirullah, allahumma antassalam, subhanallah×33, alhamdulillah×33, allahu akbar×33, tahlil, ayatul kursi, quls×3, la ilaha illallah, subhanallah wa bihamdih×100) with Arabic, transliteration, meaning, reference, count
- `SALAH_INFO` — conditions (8), pillars (13), wajibat (6), sunnah (10)
- `SalahModule` class — listens to `learnModuleSelected` and `settingChanged`, renders sections in emerald-green themed card UI with `<details>` expandable duas, dir="rtl" for Arabic, count badges, reference footnotes

**Registration changes:**
- `js/learn.js`: Added `salah` to `LEARN_CARDS`, `LEARN_I18N_FALLBACK` (title/desc), `this.roots`, `moduleProgress()` case (tracks `salahDuasLearned` localStorage)
- `index.html`: Added `#learn-salah-root` div, `<script src="js/learn-salah.js?v=103">`
- `js/app-nav.js`: Added `{ module: 'salah', emoji: '🕌', label: 'learn_salah_title' }` under Learn children

### Session Commands

```bash
# Build CSS
npm run build:css

# Dev server
npm run dev

# Build
npm run build
```
