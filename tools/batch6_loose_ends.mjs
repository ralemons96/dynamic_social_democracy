// Events audit Batch 6 (SSD3 + spillover leftovers). Ordered swaps, credits/modinfo excluded.
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap(e =>
    e.isDirectory() ? walk(join(dir, e.name)) : e.name.endsWith('.dry') ? [join(dir, e.name)] : []);
}

const swaps = [
  ['Vaelist</span> Uprising', 'Vaelist</span> Rising'],
  ['*Blutmai*, "Bloody May"', '*the Red Spring*'],
  // Altona district rename: intro phrase first (keeps "of Abysm" = the city), then the rest
  ['a march through Abysm, a working-class neighborhood of Abysm known for its high working-class population. Abysm is a',
   'a march through Tarrow, a working-class district of Abysm. Tarrow is a'],
  ['When the march arrives in Abysm', 'When the march arrives in Tarrow'],
  ['March in Abysm', 'March in Tarrow'],
  ['Abysm Bloody Sunday', 'Tarrow Bloody Sunday'],
  ['the Western Allies', 'the western powers'],
  ['<span style="color: #0A3161;">Western</span> <span style="color: #C8102E;">Allies</span>',
   '<span style="color: #0A3161;">western</span> <span style="color: #C8102E;">powers</span>'],
  ['the gravity of the potential Allied response', 'the gravity of the potential response from the western powers'],
  ['a rightward turn from Vael', 'a rightward turn from Croft'],
  ['Commissar for Marchland Relief', 'Commissioner for Marchland Relief'],
  ['"Ephialtes of the', '"great betrayer of the'],
  ['The economic calamity - ', 'Economic calamity - '],
];

const files = walk('source/scenes').filter(f => !/credits|modinfo/.test(f));
const counts = new Map();
for (const f of files) {
  const src = readFileSync(f, 'utf8');
  let out = src;
  for (const [from, to] of swaps) {
    const n = out.split(from).length - 1;
    if (n) { counts.set(from, (counts.get(from) || 0) + n); out = out.split(from).join(to); }
  }
  if (out !== src) writeFileSync(f, out);
}
for (const [from] of swaps) console.log(`${counts.get(from) || 0}  ${from.slice(0, 70)}`);
