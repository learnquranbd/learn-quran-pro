#!/usr/bin/env node
/**
 * Next Tadabbur targets for a cloud session (no local round11/budget.js).
 *
 *   node tools/tadabbur-queue.js [count]
 *
 * tools/tadabbur-targets.json is a snapshot (generated 2026-09-05) and drifts
 * as verses ship, so this checks live coverage against js/ponder.js
 * (PONDER_REFS) instead of trusting the snapshot's "have" counts. A target
 * is skipped if any ayah in its range is already covered by an existing
 * PONDER_REFS entry, even one added as part of a wider range since the
 * snapshot was taken.
 */
const { load, get } = require('../tests/lib.js');
const targets = require('./tadabbur-targets.json');

const pool = get(load('js/ponder.js'), 'PONDER_REFS') || [];
const covered = new Set();
for (const r of pool) {
  const [s, a] = r.split(':');
  const [x, y] = a.split('-').map(Number);
  for (let i = x; i <= (y || x); i++) covered.add(`${s}:${i}`);
}

const next = [];
for (const [, obj] of Object.entries(targets.surahs)) {
  for (const ref of obj.new) {
    const [s, a] = ref.split(':');
    const [x, y] = a.split('-').map(Number);
    let any = false;
    for (let i = x; i <= (y || x); i++) if (covered.has(`${s}:${i}`)) any = true;
    if (!any) next.push(ref);
  }
}

const n = parseInt(process.argv[2], 10) || 10;
console.log(`pool: ${pool.length} refs covered. ${next.length} snapshot targets still genuinely uncovered.`);
console.log(next.slice(0, n).join(', '));
