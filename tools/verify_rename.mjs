// Phase 0d: verify the compiled game.json contains no residual base quality tokens
// in Q-reference contexts (Q['name'] in predicates, Q.name in onArrival code), and
// that the new Commonwealth tokens are present.
import { readFileSync } from 'node:fs';

const g = readFileSync('out/game.json', 'utf8');

// Base quality tokens that MUST be gone from Q[...] / Q. contexts after the rename.
const gone = ['spd','kpd','nsdap','dnvp','dvp','cvp','dnef','workers','catholics',
  'new_middle','old_middle','rural','unemployed','nazi','prussia','prussian','schleicher',
  'hindenburg','hitler','reichsbanner','neorevisionist','black_thursday','z'];

// Intentionally retained internal tokens (DVP/DDP merge keeps ddp; deferred/cut/minor).
const kept = ['ddp','lvp','kvp','dnf','bvp','other','sapd','dsu','nvf','rdp','dstp','fkp','loyalty'];

function countQ(tok) {
  // Q['tok...  or  Q.tok...  with a non-lowercase-letter boundary after the token
  // (so `z` matches z_votes but not e.g. `zeal`; `spd` matches spd_votes but not `spd`+letter).
  const re = new RegExp("Q\\['" + tok + "(?![a-z])|Q\\." + tok + "(?![a-z])", 'g');
  return (g.match(re) || []).length;
}

console.log('=== RESIDUAL base tokens in Q[...] / Q. contexts (must all be 0) ===');
let bad = 0;
for (const t of gone) { const c = countQ(t); if (c > 0) { console.log(`  RESIDUAL ${t} = ${c}`); bad += c; } }
console.log(bad === 0 ? '  ✅ CLEAN — no residual base quality tokens' : `  ❌ TOTAL RESIDUAL ${bad}`);

console.log('=== new Commonwealth tokens present (sanity) ===');
const newToks = ['marcher','commons','collectivist','royalist','traditionalist','gold','unionist',
  'concord','gnu','burgher','guild','landed','disfavored','heartland','staal','dufour','gallax','banner','knight','veran_crash'];
console.log('  ' + newToks.map((t) => `${t}:${countQ(t)}`).join('  '));

console.log('=== retained tokens (expected nonzero, OK) ===');
console.log('  ' + kept.map((t) => `${t}:${countQ(t)}`).join('  '));

process.exit(bad === 0 ? 0 : 1);
