// Events audit Batch 5 (SSD2): org/term coinages + D3 cvp_merger garble fix. Ordered swaps, credits/modinfo excluded.
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap(e =>
    e.isDirectory() ? walk(join(dir, e.name)) : e.name.endsWith('.dry') ? [join(dir, e.name)] : []);
}

const swaps = [
  ["own SS as well", "own Crownguard as well"],
  ["KPO", "CPO"],                                        // case-sensitive; kpo_* vars safe
  ["the Dornish Reichrat delegation", "the Dornish delegation to the Council of Provinces"],
  ["<i>Rechtsblock</i>", "Right Bloc"],
  ['<span class="tooltip-text" title="Lebensraum">living space</span>', "living space"],
  ["National Federation of Commonwealth Industry (RDI)", "National Federation of Commonwealth Industry (FCI)"],
  ["Pan-Commonwealth League (ADV)", "Pan-Commonwealth League (PCL)"],
  ["United Patriotic Leagues (VVVD)", "United Patriotic Leagues (UPL)"],
  ["GNU-VLB", "GNU-FL"],
  ["Volksocialism", "People's Socialism"],
  [">swastika</span>", ">crowned sunburst</span>"],
  ["military advisory mission in China", "military advisory mission in the eastern empire"],
  ["push for an *Free Guild*, referendum for Eupen-Malmedy", "push for accession of the Freehold, referendum for the contested border marches"],
  ["referendum for Eupen-Malmedy", "referendum for the contested border marches"],
  ["west of the Elbe River", "west of the Averlin River"],
  ["Baden", "Barrowdale"],                               // case-sensitive; the state
  ["Golden Twenties", "golden years"],
  ["revolutions of 1848", "revolutions of 4213"],
  ["Katastrophenpolitik", "catastrophe politics"],
  [", Herr Geheimrat,", ", Councillor,"],
  ["November criminals", "traitors of the Founding"],
  ["Tory Democratic", "One-Realm Democratic"],
  ["Tory Democracy", "One-Realm Democracy"],
  ["Fulyrian Tories", "Fulyrian crown conservatives"],
  ["Commonwealth-Hanoverian Party", "Commonwealth-Harlow Party"],
  [" 🙏🙏🙏", ""],
  ["the Keynesian belief", "the deficit-spending school's belief"],
  ["concessions to the Keynesians", "concessions to the deficit-spending school"],
  ["not being a Keynesian", "being no disciple of the deficit-spending school"],
  ["the Vanguard League", "the Red Vanguard"],
  ["advocating for the primacy of interdenominational schools and seeking to limit the church's influence",
   "advocating for the primacy of secular common schools and seeking to limit the influence of the faiths"],
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
for (const [from] of swaps) console.log(`${counts.get(from) || 0}  ${from}`);
