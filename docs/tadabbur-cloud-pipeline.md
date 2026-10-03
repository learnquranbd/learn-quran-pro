# Tadabbur enrichment — cloud-session notes (2026-10-03)

The `.claude/skills/tadabbur-enrich/SKILL.md` pipeline (`tools/wip/round11/`,
`CLAUDE-LOG.md`, the personal plan-usage budget gate) is local-machine-only —
all three are gitignored and do not exist in a fresh clone. This file is the
git-tracked substitute for a cloud session: state plus the network recipe
that actually works here, so the next session doesn't have to rediscover it.

## Network: what's reachable from a cloud session

The egress proxy blocks the sites the original pipeline relied on for
tafsir/hadith sourcing: `api.quran.com`, `quran.com`, `quranx.com`,
`alim.org` all return `EGRESS_BLOCKED`. `WebSearch` works (different
backend) but only returns paraphrased snippets — not verbatim, so not good
enough for the "nothing from memory / no secondhand quoting" rule.

**What works:** `raw.githubusercontent.com` (GitHub is allowed). The
`spa5k/tafsir_api` dataset mirrors quran.com's tafsir resources as plain
JSON, fetchable with `WebFetch`:

```
https://raw.githubusercontent.com/spa5k/tafsir_api/main/tafsir/<slug>/<surah>/<ayah>.json
```

Slugs confirmed working for English text: `en-tafisr-ibn-kathir` (note the
dataset's own typo, "tafisr" not "tafsir"), `en-tafsir-ibn-abbas` (Tanwir
al-Miqbas — attribute it as "the tafsir attributed to Ibn 'Abbas", not as
his direct words), `en-tafsir-maarif-ul-quran`.

**Caution:** `en-tafsir-maarif-ul-quran` returned content for the wrong
ayah once (asked for 38:85, got commentary on 38:75) — the dataset groups
some passage commentary under one ayah number. Always check the fetched
text actually discusses the target verse before quoting it; discard and
don't patch over a mismatch.

If a future session needs a domain this one couldn't reach, the fix is
widening the environment's network allowlist (Edit → Network access in the
environment settings), not working around the block.

## Live queue state

`tools/tadabbur-targets.json` is a snapshot (generated 2026-09-05) and
drifts as verses ship — its own `have` counts undercount. Use
`node tools/tadabbur-queue.js [n]` instead of trusting the file directly:
it recomputes live coverage from `js/ponder.js` (`PONDER_REFS`) so a target
already folded into a wider existing range (e.g. `2:15` inside an existing
`2:14-16` card) isn't offered again.

As of this session: pool at 804 refs (was 803 at session start).
**Last shipped: `38:85`** (card + 8-section, 1,561-word deep article).
Next in queue: `39:12, 39:27, 39:29, 39:46-47, 39:60, 39:67, 39:73, 40:8,
40:15, 40:24, …`

## Per-ayah pipeline (cloud-compatible)

1. `node tools/tadabbur-queue.js` — pick the next ref.
2. Gather: `data/translations/en.json` + `bn.json` for the verse and ~10
   neighbours; `data/quran-tokens.json` for a verified Arabic word count;
   `data/nuzul/` for an asbab file if one exists for the surah; existing
   neighbour cards/articles (`tests/lib.js`'s `loadTadabburArticles()`) so
   the new one doesn't contradict them.
3. Tafsir/hadith: `WebFetch` the raw.githubusercontent.com slugs above for
   2-4 named commentators. If none of them attach a hadith to the verse,
   say so in the article rather than inventing one.
4. Draft the card (`TADABBUR_NOTES` shape) and the article (7-9 sections,
   1,400-1,800 English words) per `tools/TADABBUR-SPEC.md`,
   `tools/TADABBUR-DRAFTER-BRIEF.md` and `tools/BANGLA-STYLE.md`. Write
   Bengali from the idea, not a calque; match the honorific convention
   already used in the target surah's shard file (this surah's shard uses
   `(আঃ)`, not `(আ)`, for prophets — check the specific shard, it has
   varied historically).
5. Validate before merging:
   `node tools/merge-tadabbur-notes.js <notes.js>` (dry run, then `--write`)
   `node tools/merge-articles.js <articles.js> js/tadabbur-articles TADABBUR_ARTICLES js/tadabbur-data.js TADABBUR_NOTES --band 1200-2000` (dry run, then `--write`)
   `node tools/build-article-index.js`
   `node tests/run.js`
6. Commit. Update this file's "Live queue state" section.

No firebase deploy and no push to a second "pro" remote in this session —
only `origin` is configured here. Deploys remain a separate, explicit step
for whoever has that access.
