// Events audit Batch 4 (SSD1): people coinages. Ordered split/join swaps, credits excluded.
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap(e =>
    e.isDirectory() ? walk(join(dir, e.name)) : e.name.endsWith('.dry') ? [join(dir, e.name)] : []);
}

// Ordered: longer/more-specific phrases first.
const swaps = [
  ['Alexander Schifrin', 'Alexander Shefford'],
  ['Sergei Chakhotin', 'Serge Chatton'],
  ['Walter Kreiser', 'Walton Kerris'],
  ['Kreiser', 'Kerris'],
  ['August Winnig', 'August Winmore'],
  ['Alfred Mallin', 'Mallin'],
  ['Paul Lowe', 'Pascal Lowe'],
  ['Willi Munzer', 'Willem Munzer'],
  ['Gessler', 'Gresham'],                       // kellogg_briand only (Ethia's FM); Gesling untouched
  ['Eugenio Pacelli, the Papal Nuncio to the Commonwealth', 'a senior envoy of the Conclave'],
  ['Stoltzmann', 'Stoughton'],
  ['Lenmoor-Jung', 'Lenmoor'],                  // value + display, global
  ['Count Alexander zu Dohna', 'Count Alden Marle'],
  ['"zu Dohna-Schlodien"', '"Marle"'],          // gold_leader value (displayed via [+ gold_leader +])
  ['Karnoth-Dohna', 'Karnoth-Marle'],
  ['zu Dohna', 'Marle'],
  ['IG Farben', 'the Vellandt Chemical Combine'],
  ['Erkelenz', 'Arkell'],
  ['brother, Thomas Mann', 'brother, Ambrose Mann'],
  // Eckener tricolor easter egg -> Eckhart split
  ['>Ec</span><span style="color: #DD0000;">ken</span><span style="color: #FFCC00;">er</span>',
   '>Eck</span><span style="color: #DD0000;">ha</span><span style="color: #FFCC00;">rt</span>'],
  // Raymont unification (incl narrow-nbsp U+202F and nb-hyphen U+2011 variants)
  ['Hans von Raymont', 'Harmon Raymont'],
  ['Hans von Raymont', 'Harmon Raymont'],
  ['Hollis Raymont', 'Harmon Raymont'],
  ['"von-Raymont"', '"Raymont"'],               // fkp_leader value (displayed via [+ fkp_leader +])
  ['von‑Raymont', 'Raymont'],
  ['von Raymont', 'Raymont'],
];

const files = walk('source/scenes').filter(f => !/credits/.test(f));
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
for (const [from, to] of swaps) console.log(`${counts.get(from) || 0}  ${from}`);
