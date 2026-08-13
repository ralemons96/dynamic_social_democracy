// C5: lowercase "depression" -> "calamity" in prose. Skips @depression ids,
// *_depression identifiers (no \b after _), greatdepression.jpg (one word),
// //- and #-comment lines, and modinfo/credits by file.
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap(e =>
    e.isDirectory() ? walk(join(dir, e.name)) : e.name.endsWith('.dry') ? [join(dir, e.name)] : []);
}
const re = /(?<!@)\bdepression\b/g;
let total = 0;
for (const f of walk('source/scenes')) {
  if (/modinfo|credits/.test(f)) continue;
  const src = readFileSync(f, 'utf8');
  if (!re.test(src)) continue;
  const lines = src.split('\n');
  let n = 0;
  const out = lines.map(line => {
    const t = line.trimStart();
    if (t.startsWith('//') || t.startsWith('#')) return line;
    return line.replace(re, () => { n++; return 'calamity'; });
  }).join('\n');
  if (n) { writeFileSync(f, out); total += n; console.log(`${f}: ${n}`); }
}
console.log(`TOTAL: ${total}`);
