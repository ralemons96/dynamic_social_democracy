// Phase 0c: string-literal VALUE pass (spec §1). Logic-token strings are always exact
// quoted literals (e.g. `chancellor_party == "SPD"`), while display labels are unquoted
// prose/markup (`**SPD**`, `the SPD`). Matching a quote + EXACT token + same quote renames
// every set/check in lockstep without touching display text. Figure display names other
// than Braun/Rosenfeld are handled as display in Phase 1, per spec.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';

const apply = process.argv.includes('--apply');

const STRINGS = {
  SPD: 'Marcher', KPD: 'Collectivist', NSDAP: 'Royalist', DNVP: 'Traditionalist',
  DVP: 'Gold', DDP: 'Gold', Z: 'Unionist', CVP: 'Concord', DNEF: 'GNU',
  Braun: 'Bristol', Rosenfeld: 'Pendrigon',
};
const RE = new RegExp("(['\"])(" + Object.keys(STRINGS).join('|') + ")\\1", 'g');

function transform(text) {
  return text.replace(RE, (_, q, tok) => q + STRINGS[tok] + q);
}

function walk(dir, acc = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = dir + '/' + e.name;
    if (e.isDirectory()) walk(p, acc);
    else if (e.name.endsWith('.dry')) acc.push(p);
  }
  return acc;
}

if (process.argv[1] && process.argv[1].replace(/\\/g, '/').endsWith('tools/rename_strings.mjs')) {
  let changed = 0, count = 0;
  for (const f of walk('source')) {
    const orig = readFileSync(f, 'utf8');
    const matches = orig.match(RE);
    if (matches) count += matches.length;
    const next = transform(orig);
    if (next !== orig) { changed++; if (apply) writeFileSync(f, next); }
  }
  console.log(`string-literal pass: ${count} quoted tokens in ${changed} files (${apply ? 'APPLIED' : 'dry-run'})`);
}

export { transform as transformStrings };
