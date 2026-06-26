// LF-safe case-sensitive global token swap across source/scenes/**/*.dry.
// Usage: node tools/reskin_swap.mjs "FROM" "TO"
// Reads utf8, split/join (no regex, no line-ending touch) -> preserves LF.
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const FROM = process.argv[2];
const TO = process.argv[3];
if (FROM === undefined || TO === undefined) {
  console.error('usage: node tools/reskin_swap.mjs "FROM" "TO"');
  process.exit(1);
}

const ROOT = 'source/scenes';
function walk(dir) {
  let out = [];
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) out = out.concat(walk(p));
    else if (p.endsWith('.dry')) out.push(p);
  }
  return out;
}

let total = 0, files = 0;
for (const f of walk(ROOT)) {
  const s = readFileSync(f, 'utf8');
  if (!s.includes(FROM)) continue;
  const n = s.split(FROM).length - 1;
  writeFileSync(f, s.split(FROM).join(TO));
  total += n; files++;
  console.log(`  ${f}: ${n}`);
}
console.log(`Total "${FROM}" -> "${TO}": ${total} in ${files} files`);
