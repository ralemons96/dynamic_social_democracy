// Fit audit Batch 1: SSA people + SSB simple globals. Ordered split/join, credits/modinfo excluded.
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap(e =>
    e.isDirectory() ? walk(join(dir, e.name)) : e.name.endsWith('.dry') ? [join(dir, e.name)] : []);
}

// [from, to, optional file-substring filter]
const swaps = [
  // A1 Halsmark split: CU-ruler -> Vessarion (color-keyed + 3 plain-text CU sites)
  ['#8B0000;">Halsmark</span>', '#8B0000;">Vessarion</span>'],
  ['this, Halsmark has adhered', 'this, Vessarion has adhered'],
  ["the conflict is Halsmark's doing", "the conflict is Vessarion's doing"],
  // A2 Grzesinski
  ['Grzesinski', 'Grenshaw'],
  // A3 dead values (quoted only)
  ['"Goebbels"', '"Standerton"'],
  ['"Thiel"', '"Holt"'],
  ['"Glatzel"', '"Vellt"'],
  ['"Stolper"', '"Penn"'],
  // A4 ticker officers
  ['Johann Bredt', 'Johan Bredwell'],
  ['Bredt', 'Bredwell'],
  ['Scheringer', 'Sherring'],
  ['Hanns Ludin', 'Halden Ludwell'],
  ['Ludin', 'Ludwell'],
  // A5 Steunenberg rename (value + displays; prose edits done separately)
  ['"Mann"', '"Steunenberg"'],
  ['Kelby Steunenberg', 'Godfrey Steunenberg'],
  // A6 Eckener bold tricolor
  ['>**Ec**</span><span style="color: #DD0000;">**ken**</span><span style="color: #FFCC00;">**er**</span>',
   '>**Eck**</span><span style="color: #DD0000;">**ha**</span><span style="color: #FFCC00;">**rt**</span>'],
  ['>Ec</span><span style="color: #DD0000;">ken</span><span style="color: #FFCC00;">er</span>',
   '>Eck</span><span style="color: #DD0000;">ha</span><span style="color: #FFCC00;">rt</span>'],
  // A7, A8, A10, A11, A13, A14, A15, A16, A18
  ['Gunther', 'Garren'],
  ['Curtius', 'Curthose'],
  ['Hermes', 'Harmes'],
  ['Lindner Moribund', 'Golds Moribund'],
  ['Prittwitz', 'Prittwell'],
  ['Moldenhauer', 'Moldren'],
  ['Eric Gilby', 'Eldred Gilby'],
  ['Hermann Gorrick', 'Ulric Gorrick'],
  ['Hermann Grothmoor', 'Gorman Grothmoor'],
  ['Siegfried Strake', 'Sigebert Strake'],
  ['finance_minister = "Roland"', 'finance_minister = "Galanides"'],
  ['"Munzenberg"', '"Munzer"'],
  ['Lenmoor', 'Lanmere'],
  // A9 Freehold cast (file-scoped)
  ['Wells', 'Weldon', 'austrian_'], ['Wells', 'Weldon', 'foreign_policy'], ['Wells', 'Weldon', 'main.scene'],
  ['Powell', 'Powle', 'austrian_'],
  ['Barrett', 'Barwick', 'austrian_'],
  ['Barker', 'Barwell', 'austrian_'], ['Barker', 'Barwell', 'main.scene'],
  ['Marsh', 'Marbeck', 'austrian_'],
  // B section globals
  ['back to Austria', 'back to the Freehold'],
  ['European Free Guild', 'Regional Concordant'],
  ['Heidelberg Program', 'Exetar Program'],
  ['Heidelberg programm', 'Exetar programm'],
  ["England's banks", "Fulyria's banks"],
  ['Hessian state Assembly election', 'Blackmoor state Assembly election'],
  ['the Brandenburg section', 'the Blackmoor section'],
  ['South Tyrol', 'the Perisart hills'],
  ['Beneduce', 'Vessane'],
  ['Volksrevolution', "People's Revolution"],
  ['Spartakus Rises Again', 'The Vaelists Rise Again'],
  ['reichstag backing', 'Assembly backing'],
  ['LDPD', 'LDPC'], ['NDPD', 'NDPC'], ['LSPD', 'LSPC'], ['VSPD', 'VSPC'], ['SEPD', 'SEPC'], ['CSRP', 'CSCP'],
  ["officers' putsch in 1920", "officers' putsch in 4285"],
  ['Originating from Avriza, the Freehold', 'Originating from the Freehold'],
  ['WBWB', 'PFW'],
  ['DNV (', 'CNA ('],
  ['thousands of Gold', 'thousands of crowns'],
  ['Bradford', 'Calbridge'],
  ['Ketchup and Mustard', 'Crimson-and-Gold'],
];

const files = walk('source/scenes').filter(f => !/credits|modinfo/.test(f));
const counts = new Map();
for (const f of files) {
  const src = readFileSync(f, 'utf8');
  let out = src;
  for (const [from, to, scope] of swaps) {
    if (scope && !f.includes(scope)) continue;
    const key = scope ? `${from} [${scope}]` : from;
    const n = out.split(from).length - 1;
    if (n) { counts.set(key, (counts.get(key) || 0) + n); out = out.split(from).join(to); }
  }
  if (out !== src) writeFileSync(f, out);
}
for (const [from, to, scope] of swaps) {
  const key = scope ? `${from} [${scope}]` : from;
  console.log(`${counts.get(key) || 0}  ${key.slice(0, 75)}`);
}
