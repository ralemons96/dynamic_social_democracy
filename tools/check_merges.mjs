// Verify no variable MERGES or SPLITS: every distinct baseline quality identifier must
// map to a distinct renamed identifier (except the intentional DVP/DDP design where dvp
// and ddp stay separate). A merge (two base ids -> one new id) would silently change
// game behavior, so the spec requires checking for it.
import { readFileSync } from 'node:fs';
import { renameId } from './maps.mjs';

const base = readFileSync('out/game.json.baseline', 'utf8');
const ids = new Set();
for (const m of base.matchAll(/Q\['([A-Za-z_]\w*)'\]/g)) ids.add(m[1]);
for (const m of base.matchAll(/Q\["([A-Za-z_]\w*)"\]/g)) ids.add(m[1]);
for (const m of base.matchAll(/Q\.([A-Za-z_]\w*)/g)) ids.add(m[1]);

console.log('distinct baseline quality identifiers:', ids.size);

const byNew = new Map();
for (const id of ids) {
  const n = renameId(id);
  if (!byNew.has(n)) byNew.set(n, []);
  byNew.get(n).push(id);
}
const merges = [...byNew.entries()].filter(([, olds]) => olds.length > 1);
console.log('=== MERGES (multiple base ids -> same new id) ===');
if (!merges.length) console.log('  ✅ none — rename is injective (no merges/splits)');
for (const [n, olds] of merges) console.log('  ' + n + '  <=  ' + olds.join(', '));
process.exit(merges.length ? 1 : 0);
