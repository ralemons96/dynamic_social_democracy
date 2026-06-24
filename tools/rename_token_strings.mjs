// Fix a rename gap: identifier-component TOKEN STRINGS (party/bloc/faction tokens used as JS
// object keys, array elements like Q.parties/Q.factions/Q.timers, comparison values, and
// timer names) were skipped by the variable rename (renameExpr skips string literals), so the
// dynamic party system builds names like Q['spd'+'_votes'] = spd_votes while the renamed
// variables/display use marcher_votes. Rename those lowercase token strings via renameId.
//
// EXCLUDE CSS class/id attributes (e.g. class="dnvp") — those are presentation hooks that pair
// with game.css, not gameplay identifiers, and renaming them would break styling.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { renameId } from './maps.mjs';

const apply = process.argv.includes('--apply');

// quoted lowercase identifier-style token, NOT immediately preceded by class=/id=
const RE = /(?<!class=)(?<!id=)(['"])([a-z][a-z0-9_]*)\1/g;

const seen = {};
function transform(text) {
  return text.replace(RE, (m, q, tok) => {
    const r = renameId(tok);
    if (r === tok) return m;
    seen[tok] = (seen[tok] || 0) + 1;
    return q + r + q;
  });
}

function walk(dir, acc = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = dir + '/' + e.name;
    if (e.isDirectory()) walk(p, acc); else if (e.name.endsWith('.dry')) acc.push(p);
  }
  return acc;
}

let changed = 0;
for (const f of walk('source')) {
  const o = readFileSync(f, 'utf8'); const t = transform(o);
  if (t !== o) { changed++; if (apply) writeFileSync(f, t); }
}
console.log(`token-string rename: ${changed} files (${apply ? 'APPLIED' : 'dry-run'})`);
console.log('  distinct tokens renamed:', JSON.stringify(seen));
