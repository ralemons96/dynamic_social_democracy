// C2: unionist chart legend "Center" -> dynamic Q.unionist_party_name; "Z:" table rows -> [+ unionist_party_name +]:
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap(e =>
    e.isDirectory() ? walk(join(dir, e.name)) : e.name.endsWith('.dry') ? [join(dir, e.name)] : []);
}
const reLegend = /("legend": )"Center",(\s*)("name": )"Center",/g;
const zRow = '!} Z: {!';
const zNew = '!} [+ unionist_party_name +]: {!';
let legends = 0, rows = 0;
for (const f of walk('source/scenes')) {
  const src = readFileSync(f, 'utf8');
  let out = src.replace(reLegend, (m, a, ws, b) => { legends++; return `${a}Q.unionist_party_name,${ws}${b}Q.unionist_party_name,`; });
  const n = out.split(zRow).length - 1;
  if (n) { rows += n; out = out.split(zRow).join(zNew); }
  if (out !== src) { writeFileSync(f, out); console.log(f); }
}
console.log(`legend pairs: ${legends}, Z rows: ${rows}`);
