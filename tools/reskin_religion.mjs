// LF-safe ordered religious-terminology sweep across source/scenes/**/*.dry.
// Christian/Catholic -> the Faithful; Protestant -> generalized "dissenting"/"dissenters"
// (no named second confession). Ordered specific->general; plurals before singulars
// (so "Christians"->"Faithful", never "Faithfuls"). Case-sensitive split/join (display
// terms are all capitalized; lowercase faithful_* vars + @catholics ids are untouched).
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const PAIRS = [
  // --- Christian: party / faction / ideology names first ---
  ["Christian People's Party", "Faithful People's Party"],
  ["Christian People", "Faithful People"],
  ["Christian Socials", "Faithful Socials"],
  ["Christian Social", "Faithful Social"],
  ["Christian Left", "Faithful Left"],
  ["Christian Corporatism", "Faithful Corporatism"],
  ["Christian Conservatism", "Faithful Conservatism"],
  ["Christian Reformism", "Faithful Reformism"],
  ["Christian Democratic", "Faithful Democratic"],
  ["Christian Democracy", "Faithful Democracy"],
  ["Christian democrats", "Faithful democrats"],
  ["Christian Trade", "Faithful Trade"],
  ["Christian Free", "Faithful Free"],
  ["Christian Labor", "Faithful Labor"],
  ["Christian labor", "Faithful labor"],
  ["Christian faith", "Faith"],
  ["un-Christian", "ungodly"],
  ["Christians", "Faithful"],
  ["Christian", "Faithful"],
  // --- Catholic (guard -ism forms first) ---
  ["anti-Catholicism", "hostility toward the Faithful"],
  ["Catholicism", "the Faith"],
  ["Catholics", "Faithful"],
  ["Catholic", "Faithful"],
  // --- Protestant: generalized away ---
  ["Protestant Right", "dissenting Right"],
  ["Far-Right Protestants", "Far-Right dissenters"],
  ["Protestants", "dissenters"],
  ["Protestant", "dissenting"],
  // --- confessional ---
  ["interconfessional", "interfaith"],
  ["confessional", "religious"],
];

function walk(dir) {
  let out = [];
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) out = out.concat(walk(p));
    else if (p.endsWith('.dry')) out.push(p);
  }
  return out;
}

let grand = 0, touched = 0;
for (const f of walk('source/scenes')) {
  let s = readFileSync(f, 'utf8');
  const before = s;
  let n = 0;
  for (const [from, to] of PAIRS) {
    const c = s.split(from).length - 1;
    if (c) { s = s.split(from).join(to); n += c; }
  }
  if (s !== before) { writeFileSync(f, s); grand += n; touched++; }
}
console.log(`Religious sweep: ${grand} replacements across ${touched} files`);
