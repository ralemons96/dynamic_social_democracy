// Align already-applied coined figure names to the lore doc's canonical names, and apply
// the user-provided Commonwealth region names. Word-boundary; source already LF.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
const apply = process.argv.includes('--apply');

// my earlier in-style coin -> lore-canonical
const REMAP = {
  'Welles': 'Vesh', 'Brightwood': 'Yardley', 'Hallveld': 'Bell', 'Sevren': 'Heath',
  'Levas': 'Tarrand', 'Pellew': 'Vellath', 'Hargrove': 'Mallin', 'Strake': 'Crowde',
};
// regions (ordered: phrases before bare words)
const REGION = [
  ["Bavarian People's Party", 'the Arcanists'],
  ['Saxony', 'Dornwich'], ['Bavaria', 'Avriza'], ['Bavarian', 'Avrizan'],
  ['Thuringia', 'Stathmore'], ['Württemberg', 'Purl'], ['Wurttemberg', 'Purl'],
  ['Lippe', 'High Cross'], ['France', 'Ethia'], ['French', 'Ethian'], ['Saxon', 'Dornish'],
];
function esc(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
function transform(text) {
  for (const [from, to] of Object.entries(REMAP)) text = text.replace(new RegExp('\\b' + from + '\\b', 'g'), to);
  for (const [from, to] of REGION) text = text.replace(new RegExp('\\b' + esc(from) + '\\b', 'g'), to);
  return text;
}
function walk(dir, acc = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = dir + '/' + e.name;
    if (e.isDirectory()) walk(p, acc); else if (e.name.endsWith('.dry')) acc.push(p);
  }
  return acc;
}
let n = 0;
for (const f of walk('source')) {
  const o = readFileSync(f, 'utf8'); const t = transform(o);
  if (t !== o) { n++; if (apply) writeFileSync(f, t); }
}
console.log(`figure remap + regions: ${n} files (${apply ? 'APPLIED' : 'dry-run'})`);
