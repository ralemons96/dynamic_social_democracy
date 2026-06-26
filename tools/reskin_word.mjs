// LF-safe WORD-BOUNDARY case-sensitive swap across source/scenes/**/*.dry.
// Usage: node tools/reskin_word.mjs "FROM" "TO" ["skipPrefix1,skipPrefix2,..."]
// Replaces only \bFROM\b, so underscore-joined code vars (union_x, x_union, unions_independent)
// and longer words (Unionist) are auto-safe (_ and letters are \w -> no boundary).
// Any match immediately preceded by one of the comma-separated skip-prefixes is left untouched
// (used to protect compounds like "Soviet Union", "Central Union", "customs union").
// Reads/writes utf8 without touching line endings -> preserves LF.
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const FROM = process.argv[2];
const TO = process.argv[3];
const SKIP = (process.argv[4] || '').split(',').filter((x) => x.length > 0);
if (FROM === undefined || TO === undefined) {
  console.error('usage: node tools/reskin_word.mjs "FROM" "TO" ["skipPrefix1,skipPrefix2,..."]');
  process.exit(1);
}

const esc = FROM.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const re = new RegExp(`\\b${esc}\\b`, 'g');

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

let total = 0, files = 0, skipped = 0;
for (const f of walk(ROOT)) {
  const s = readFileSync(f, 'utf8');
  let n = 0;
  const out = s.replace(re, (m, offset, str) => {
    for (const pfx of SKIP) {
      if (offset >= pfx.length && str.substring(offset - pfx.length, offset) === pfx) {
        skipped++;
        return m;
      }
    }
    n++;
    return TO;
  });
  if (n > 0) {
    writeFileSync(f, out);
    total += n;
    files++;
    console.log(`  ${f}: ${n}`);
  }
}
console.log(`Total \\b${FROM}\\b -> "${TO}": ${total} in ${files} files (skipped ${skipped} protected)`);
