// Strip dev-joke tooltips: <span class="tooltip-text" title="good mod|good game">X</span> -> X
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap(e =>
    e.isDirectory() ? walk(join(dir, e.name)) : e.name.endsWith('.dry') ? [join(dir, e.name)] : []);
}
const files = walk('source/scenes');
const re = /<span class="tooltip-text" title="good (?:mod|game)">(.*?)<\/span>/g;
let total = 0;
for (const f of files) {
  const src = readFileSync(f, 'utf8');
  const matches = [...src.matchAll(re)];
  if (!matches.length) continue;
  total += matches.length;
  writeFileSync(f, src.replace(re, '$1'));
  console.log(`${f}: ${matches.length}`);
}
console.log(`TOTAL: ${total}`);
