# Feature Requests Log — Learn Quran Pro (build session, 2026-07-11/12)

Every request from this session, in order, with status.
✅ = deployed live · 🧩 = built & on disk, pending integration/deploy · ⏳ = queued (not started)

## Foundation & vision
1. ✅ Build a **pro-version multi-language Quran app**: word-by-word meanings, grammar, verse repetition, per-verse study — port the Bangla `learn-quran-bd.web.app` idea to many languages.
2. ✅ Add a **memorization checker** with speech recognition — auto-detect spoken words, green = correct / red = next expected word.
3. ✅ Finish all placeholder modules + add an **interactive Quranic Arabic Learning** section + a **Kids** sub-module for learning to read.
4. ✅ Fix non-working modules; **Quick Navigation should let you pick a surah**; use multi-agent orchestration; keep going without asking; mine `learn-quran-bd.web.app` for modules.
5. ✅ "Don't care about cost — best output"; "think ultra / hyper-expert agents".

## Legacy port (from /understand-quran source)
6. ✅ Recreate the **full old-app UI** and receive as many modules as possible; keep both versions (old = Bangla-only, new = all languages).
7. ✅ **Self-contained** — bundle needed data into the project, no reliance on the sibling `understand-quran` dir (external API allowed).
8. ✅ Full sidebar **subject/topic/story/dua menu tree** (504 items), i'rab, Bangla tafsir, tajweed, mushaf.

## UI / layout fixes
9. ✅ Move **language / font / theme** controls to the **top-right, grouped**.
10. ✅ quranmazid-style **right settings drawer** (translation source, WBW language, toggles, font, theme).
11. ✅ Tajweed rules **float right**; **hover shows the rule details**.
12. ✅ Make the tajweed guide a **sticky right-side panel**, collapsible, hover tooltips.
13. ✅ Remove "Word Grammar (Bangla)" from word modal; **widen** the word-repeat modal; **full-width** main container.
14. ✅ Make legacy modals **90% of the screen**.
15. ✅ Remove **Islamic Books / Help** menu groups + sub-items (was a browser cache issue → added cache-busting).
16. ✅ quranmazid-style **Surah / Juz / Page tabs** in Quick Navigation.
17. ✅ Reading tab: **word-by-word inline under each ayah**; per-ayah + **global show/hide** toolbar (WBW / Tafseer / Grammar / Tajweed).
18. ✅ Word tap → **modal** (exact-word + same-root repetition) that **doesn't lose your place**; grammar from corpus.quran.com style.
19. ✅ Fix legacy **topic intros showing raw HTML tags** (sanitized render).

## Languages
20. ✅ Add more popular languages + **confirm all modules work** in every language (7 → 15).
21. ✅ Add **Japanese**.

## Deployment / accounts
22. ✅ Name a Firebase project → **learn-quran-pro**; prefill `js/firebase-config.js`.
23. ✅ **Deploy to Firebase** (learn-quran-pro.web.app) + push to a **new public GitHub repo** (learnquranbd/learn-quran-pro).
24. ✅ Author commits solely as **learnquranbd** (remove Claude co-author / mining email).
25. ✅ Footer **link to learn-quran-bd.web.app** for Bangla users.
26. 🧩 **Email signup form → Firestore** (built; needs your Firebase config live).

## Enrichment
27. ✅ **Ayah to Ponder** daily card, curated **external resources**, per-ayah **copy**, **editable range** input.
28. ✅ **Word-timed audio highlighting**, **Firebase accounts + sync** scaffold, **Mushaf page view**.
29. ✅ **Mushaf**: clear Prev / Next page buttons in the header.
30. ✅ **Phrase / word-block repetition search** (client-side index, exact + contains).
31. ✅ **PWA** — installable + offline (service worker, icons, install button).
32. ✅ **Bookmarks** (star verses) + **continue reading**.

## Kids module
33. ✅ Enrich Kids module **4×**: guided **short-surah reading**, **Numbers 1–10**, **Duas**, words 12 → 40, **3 new games**.
34. ✅ Fix **kids audio not playing** (bundle 391 real Arabic clips; system-voice fallback).
35. ✅ Kids **Sounds → "Find in Quran"**: every word with a selected letter + fatha/kasra/damma/sukoon…
36. ✅ Expanded **letter card**: close button, play, **example words** at start/middle/end.
37. ✅ Kids: tapping an ayah opens a **modal** (don't switch to the Ayah Reading tab). *(just built)*

## Quiz suite → Quiz Center
38. ✅ **Quiz Center** (live — all 9 types verified & deployed):
    - Ayah-sequence (next/prev) · Guess-the-Surah (multi-correct for repeated ayahs) · Word-meaning · Meaning→Word · Grammar/POS (noun/verb/particle/pronoun) · Complete-the-Ayah · Which-Juz · Tajweed-rule · Same-root.
39. ✅ **[Most-wanted] Word-arrangement memory test** — meanings shown, Arabic hidden, reveal to self-check.

## Memorize / practice
40. ✅ Memorize: **🔊 Original recitation** button beside "Your recitation" to compare. *(built)*
41. ✅ **Typing memorization** — type a surah from memory, checked word-by-word. *(built)*
42. ✅ **Arabic handwriting / tracing** — trace letters/words + reveal perfect form. *(built)*

## Reference / study
43. ✅ Enrich **Waqf (stop) signs** — native, color-coded, all-language (replace hardcoded Bangla image). *(built)*
44. ⏳ **Sarf declension/conjugation charts** — frequent Quranic roots, masc/fem × sing/dual/plural × case, with meanings.
45. ✅ **Word-repetition analysis** — per-surah AND per-ayah, exact (হুবুহু) + root (মৌলিক), with counts.

## Navigation redesign (pending)
46. ✅ **Drill-down sidebar** (primary → children + back arrow).
47. ✅ Keep **"Quranic Ayah by Subject"** group at the very top (current menu tree).
48. ✅ Move **Learn / Memorize / Audio / Mushaf / Quiz** off the tab bar into the sidebar.
49. ✅ Learn's children = **Kids · Vocabulary · 99 Names · Handwriting**; Memorize's children = Speech · Typing.
50. ✅ Add **Quiz** as a main sidebar module.

---
_Sequence to finish: (1) deploy Quiz Center + memorize button + waqf + kids-modal increment → (2) nav redesign + wire typing/handwriting → (3) sarf + word-repetition + word-arrangement waves._

## Topical index
51. ✅ Integrate **quranwbw.com/topics** — bundled 1,857-topic A–Z index (19,111 verse refs) as a Topics module in the sidebar; tap a topic → its verses → load in Reading.
