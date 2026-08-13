// Fit audit Batch 4: SSD display-logic slips + SSE reskin scars/typos. Credits/modinfo excluded.
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';
function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap(e =>
    e.isDirectory() ? walk(join(dir, e.name)) : e.name.endsWith('.dry') ? [join(dir, e.name)] : []);
}
const swaps = [
  // D1 boolean-prints
  ['[? if concord_formed: [+ concord_formed +]?]', '[? if concord_formed: [+ concord_leader +]?]'],
  // D2a Gesling ex-DDP
  ["independent formerly of the <span style='color: #D3C24D; font-weight: bold;'>Golds</span>", "independent formerly of the <span style='color: #D3C24D; font-weight: bold;'>Gold</span>"],
  // D2b Eckhart branch wrong name
  ['to back <span style="color: #c00000;">Bristol</span>, due to their deep antipathy', 'to back <span style="color: #c00000;">Eckhart</span>, due to their deep antipathy'],
  // D2d predecessors (file-scoped)
  ['succeed Lytton', 'succeed Hewes', 'lvp_party_congress_heuss'],
  ['succeed Lytton', 'succeed Coalfax', 'lvp_party_congress_dingeldey'],
  // D2e nazi_17
  ["to everyone's surprise, the usual political violence marked that day", "to everyone's surprise, no unusual political violence marked the day"],
  ['bought back from the Freehold', 'brought back from the Freehold'],
  // D3
  ['So much for nothing.', 'So much effort, for nothing.'],
  ["It's unknown of the former chancellor's reasoning behind such a pick, but perhaps he would've hoped that restoring the Empress’s crown, the people might rally to the throne as they once rallied around DuFour.",
   "Goodryke's reasoning behind such a pick is unknowable—but perhaps he hoped that, with the Empress’s crown restored, the people might rally to the throne as they once rallied around DuFour."],
  ['An inpatient DuFour', 'An impatient DuFour'],
  // D4a kellogg missing noun
  ['Ethian</span> to consider withdrawing', 'Ethian</span> government to consider withdrawing'],
  // D4c stegerwald dead conditional
  ['[? if not stegerwald_path: Faithful?][? if stegerwald_path: Faithful?]', 'Faithful'],
  // E4 broken sentences
  ['unknown, only whose political experience', 'unknown, whose political experience'],
  ["Goodryke's decision to take the chancellorship, despite [+ unionist_leader +]'s urging and Goodryke's promise not to, DuFour has used",
   "Despite [+ unionist_leader +]'s urging and Goodryke's own promise to refuse, DuFour has used"],
  ['proceedings and against him', 'proceedings against him'],
  ["the Commonwealth's rearmament at Vera", "the Commonwealth's rearmament"],
  ['It would be extremely unpopular within our party to support a government that has the participation of the', 'Supporting a government that includes the'],
  ['drop the decree!, The group argues', 'drop the decree! The group argues'],
  ['effects ending our association', 'effects by ending our association'],
  ['at for the middle class', 'at least for the middle class'],
  ['launches almost immediately launch', 'almost immediately launch'],
  ['were to form. <span style="color: #c00000;">Red</span> Dornwich', 'were to form, <span style="color: #c00000;">Red</span> Dornwich'],
  ['Staal requests for a decree', 'Staal requests a decree'],
  ['pointing out the chamber in all likelihood approve a no-confidence motion at the end in the next reconvocation', 'pointing out that the chamber will in all likelihood approve a no-confidence motion at its next reconvocation'],
  ['there have been little personal contact', 'there has been little personal contact'],
  ['Staal advocating for the same course of action that he himself opposed when it was advocated by Goodryke.', 'Now Staal advocates the very course of action he himself opposed when Goodryke proposed it.'],
  ['palate the guild-masters', 'placate the guild-masters'],
  ['Many radicalized the Banners and party officials defeat to the', 'Many radicalized Banners men and party officials defect to the'],
  ['has trick up his sleeve', 'has a trick up his sleeve'],
  ['but however,', 'however,'],
  ['eager to take credit for this accomplishment', 'eager to take credit for it'],
  ['But if we were to look closer. The', 'But if we were to look closer, the'],
  ["**</span>'s suffers a crushing", '**</span> suffers a crushing'],
  // E3 parentheticals
  [" (Commonwealth People's Conservative Party)", ' (the Concord)'],
  [' (Golds) has officially', ' has officially'],
  ['Commonwealth National Unity Front (Commonwealth National Unity Front, GNU)', 'Commonwealth National Unity Front (the GNU)'],
  // E2 doubled articles
  ['a the Banners', 'a Banners'],
  ['militant the Banners', 'militant Banners'],
  ['militarized the Banners', 'militarized Banners'],
  ["Our the Poorman's", "Our Poorman's"],
  ["our the Poorman's", "our Poorman's"],
  ['the the Arcanists', 'the Arcanists'],
  ['accept the our intervention', 'accept our intervention'],
  ['rural the Commonwealth', 'the rural Commonwealth'],
  ['a fair the Commonwealth', 'a fair Commonwealth'],
  ['and social the Commonwealth', 'and social Commonwealth'],
  // E5 typos
  ['renowed', 'renowned'],
  ['goverment', 'government'],
  ['an Marchers', 'a Marchers'],
  ['apart of', 'a part of'],
  ['as as candidate', 'as a candidate'],
  ['stanch support', 'staunch support'],
  ["Standerton' efforts", "Standerton's efforts"],
  ['civl war', 'civil war'],
  ['particulary', 'particularly'],
  ['clings on onto', 'clings onto'],
  ['Perhaps its our time', "Perhaps it's our time"],
  ['bloc partys', 'bloc parties'],
  ['much allies', 'many allies'],
  ['The Golds are themselves are split', 'The Golds themselves are split'],
  ['impossible-to-forsee', 'impossible-to-foresee'],
  ['Staal and Glade goes years back', 'Staal and Glade go years back'],
  ['an Harlow', 'a Harlow'],
  ["(With Crowde's still", '(With Crowde still'],
  ['Hopefully he Royalists', 'Hopefully the Royalists'],
  [' and nd (', ' and ('],
  ['>Vaelist</span> and Capitalism', '>Vaelism</span> and Capitalism'],
  ['bought up the topic', 'brought up the topic'],
  ['have to suspended', 'have to be suspended'],
  ['selected as appointed chancellor', 'appointed as chancellor'],
  ['As aw staunch', 'As a staunch'],
  ['We await the decision the Collectivists', 'We await the decision of the Collectivists'],
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
  // E5 regex specials
  out = out.replace(/the public conscious\b(?!ness)/g, () => { counts.set('public conscious', (counts.get('public conscious') || 0) + 1); return 'the public consciousness'; });
  // E1 capitalization sweep: after sentence-enders (not ellipses), line starts, headings, titles
  out = out.replace(/(^|[^.])([.!?] +)the (Commonwealth|Banners)\b/g, (m, a, b, c) => { counts.set('E1 mid', (counts.get('E1 mid') || 0) + 1); return `${a}${b}The ${c}`; });
  out = out.replace(/^the (Commonwealth|Banners)\b/gm, (m, c) => { counts.set('E1 linestart', (counts.get('E1 linestart') || 0) + 1); return `The ${c}`; });
  out = out.replace(/^(= |title: )the (Commonwealth|Banners)\b/gm, (m, p, c) => { counts.set('E1 heading', (counts.get('E1 heading') || 0) + 1); return `${p}The ${c}`; });
  if (out !== src) writeFileSync(f, out);
}
for (const k of counts.keys()) console.log(`${counts.get(k)}  ${k.slice(0, 65).replace(/\n/g, '\\n')}`);
console.log('--- misses:');
for (const [from, , scope] of swaps) {
  const key = scope ? `${from} [${scope}]` : from;
  if (!counts.has(key)) console.log(`MISS  ${key.slice(0, 70)}`);
}
