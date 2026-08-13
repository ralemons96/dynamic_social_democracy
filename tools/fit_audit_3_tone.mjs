// Fit audit Batch 3: SSC tone & 4th-wall rewrites. Ordered global swaps, credits/modinfo excluded. MISS-reported.
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';
function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap(e =>
    e.isDirectory() ? walk(join(dir, e.name)) : e.name.endsWith('.dry') ? [join(dir, e.name)] : []);
}
const swaps = [
  // C1 Goodlake dev note (x2 files)
  ["I actually don't know what to write for this guy, his WW2 anti-Royalist plots aren't relevant at this time since he viewed Gallax as an enlightened dictator at this time. I guess he supports taming the Royalists I guess?",
   "In truth, his instincts are those of a careful administrator: sound budgets, quiet diplomacy between the factions, and a wary sympathy for the strategy of taming the Royalists through the harness of office."],
  // C2 rainbow gag
  ['<span style="color: red;">Ho</span><span style="color: orange;">m</span><span style="color: yellow;">ox</span><span style="color: green;">se</span><span style="color: blue;">ua</span><span style="color: purple;">ls</span>', 'homosexuals'],
  // C3 modman
  ['<span class="tooltip-text" title="that\'s me! the modman!">origin</span>', 'origin'],
  ['\n(If you can find an image of him taken around this period of time, please message the modman.)\n', '\n'],
  // C4 player address (longer ddp variant FIRST)
  ['You, the player, now has free will to choose a compromise candidate. Spend it wisely. Actually, you don\'t. Choose Hewes right now.',
   'With no path to a majority, the party must rally to a compromise — and all eyes turn to Hewes.'],
  ['You, the player, now has free will to choose a compromise candidate. Spend it wisely.',
   'With no path to a majority, the choice of a compromise candidate falls to us.'],
  ['There is nothing we can do. Well actually, you, the player, could\'ve done something. Why did you do this?',
   'There is nothing more to be done. The chance to shape this outcome has passed us by.'],
  ['everyone has unanimously agreed to dissolve the party, because no one wants to deal with this',
   'the exhausted delegates vote to dissolve the party altogether'],
  ['title: Very funny, please revert the changes.', 'title: This cannot stand. The party must be reconstituted.'],
  ['You are no fun. Tinsmore is eventually chosen', 'Cooler heads prevail. Tinsmore is eventually chosen'],
  // C5 meme cluster
  [', another day another banger.', '—another quiet victory for the age.'],
  ["our coalition is no more! It's joever...", 'our coalition is no more! It is finished...'],
  ['They should’ve simply not burned down the Assembly. What were they thinking—are they stupid? Cynically, we might even benefit',
   'They brought this upon themselves, the government insists—whatever the truth of it. Cynically, we might even benefit'],
  ['It must suck for those <span style="color: #700000;">**Collectivists**</span>, but they had it coming for them. Cynically, we could benefit',
   'There is little sympathy to spare for the <span style="color: #700000;">**Collectivists**</span>—they courted this storm for years. Cynically, we could benefit'],
  ['e have been conned, big time.', 'We have been deceived — thoroughly.'],
  ['deny the fake news', 'deny the falsehoods'],
  ['biases and fake news', 'biases and slanders'],
  ['title: Big brother watches.', 'title: Nothing moves unwatched.'],
  ['Nothing ever happens.', 'Little is expected to change.'],
  ['be the change he wants to see in the world', 'take matters into his own hands at last'],
  // C6 e-commerce
  ['Buy one campaign, get another one completely free of charge!', 'Every crown must work twice; our organizers will stretch them as far as they go.'],
  ['Add 1 "Worker" to the cart.', 'Commit our organizers to the workers.'],
  ['Checkout your order.', 'Confirm our plans.'],
  // C7 flippant cluster
  ['subtitle: Crazy stuffs.', 'subtitle: The propertied bloc shifts again.'],
  ['We will be the one to destroy Askew, screw you.', 'If anyone brings Askew down, it will be us.'],
  ['You really screwed us here with your reforms, you know that?', 'Our own reforms have stripped us of that power.'],
  ['With extra racism, of course.', 'With a fresh scapegoat, of course.'],
  ["Screw this! A civil war is necessary after all.", 'Enough. If it must be war, let it be war.'],
  ['Why the hell would DuFour allow this?', 'DuFour would never permit it.'],
  ['Why the hell would we do this?', 'Out of the question.'],
  ['why in hell would we lift a finger', 'why would we lift a finger'],
  ['Damn you, Staal!', 'Staal has played us false!'],
  ['- @popular_front_lives: Ok then.', '- @popular_front_lives: So be it.'],
  ['Who cares what coalition forms here?', 'A small state, of small consequence.'],
  ['kicks the bucket', 'passes on'],
  ['- @root: Trigger game over.', '- @root: Bring the era to a close.'],
  ['Trigger game over.', 'Bring the era to a close.'],
  ['- @root: Nah.', '- @root: Play on.'],
  ['Dusterel is too ashamed to accept the Presidency, and out of the kindness of his heart, has given it to Lyle Bristol.',
   'Dusterel, unwilling to claim a mandate he does not believe in, stands aside; the office passes to Lyle Bristol as caretaker.'],
  [' also wants in.', ' also wish to join.'],
  ['subtitle: Huh?', 'subtitle: An unexpected third suitor.'],
  // C8 secret-mode metatext (mechanics kept)
  ['Secret Mode has been enabled.', 'Stranger paths are now open to us.'],
  ['subtitle: Congrats.', 'subtitle: A rare feat.'],
  ['A new secret candidate has been unlocked.', 'A stranger path has opened before us.'],
  ['Secret mode needs to be enabled.', 'Only on stranger paths.'],
  ['The mechanic is disabled.', 'The days of the street armies are behind us.'],
  ['Hooray?', 'So be it.'],
  ['Please stop.', 'This cannot go on.'],
  ['subtitle: I-\n', 'subtitle: Beyond all expectation.\n'],
  ['I didn\'t even know this was possible.', 'None thought such a thing possible.'],
  ['You know what that means...', 'And all know what follows.'],
  ['subtitle: Cheater.', 'subtitle: This should not be possible.'],
  ['\nok.\n', '\nIt is done.\n'],
  ['\nYeah.\n', '\nSo it is decided.\n'],
  ['\nLol.\n', '\nAgainst all expectation, the demand is heard.\n'],
  ['"""constitutional"""', 'so-called "constitutional"'],
  ['Hooray!', 'A triumph, of sorts.'],
  // C10 jargon
  ['clear ecological limits to their continued growth', 'clear natural limits of their support'],
  ['as schizophrenic', 'as incoherent beyond mapping'],
  ['SPDillion dollars.', 'Marchillion crowns.'],
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
for (const [from] of swaps) console.log(`${counts.get(from) || 0}  ${from.slice(0, 60).replace(/\n/g, '\\n')}`);
