// Next pass Batch 2: content-stub edits (reichstag_7, papen_joever, harzburg x2, nazi_10/11,
// kpd_ultimatum, groko, cabinet_8 twins, kpd_policy finish-lite). nazis_in_crisis deleted separately.
import { readFileSync, writeFileSync, unlinkSync, existsSync } from 'fs';

function ed(file, pairs) {
  let s = readFileSync(file, 'utf8');
  for (const [from, to] of pairs) {
    const n = s.split(from).length - 1;
    if (n === 0) { console.log(`MISS ${file.split('/').pop()}: ${String(from).slice(0, 55)}`); continue; }
    s = s.split(from).join(to);
  }
  writeFileSync(file, s);
}

// 1. schleicher_reichstag_7
ed('source/scenes/events/schleicher_reichstag_7.scene.dry', [
  ["Let's cut to the chase.",
   'The chamber Staal shuttered has found its way back into session, and it has not returned to thank him. Every bench knows the single item of business; the clerk has scarcely read the motion before the tellers are counting.'],
  ['It succeeds.',
   "It succeeds. The chamber that could agree on nothing else agrees on this: the general's government does not command its confidence. Staal receives the count without expression — and reaches for the instrument he has kept ready since the protests began: dissolution."],
]);

// 2. papen_joever: reaction choices + drop TODO
ed('source/scenes/events/papen_joever.scene.dry', [
  ['\n# TODO',
   `\nHowever it falls out, the fact stands: the *Heartland Coup* was attempted, and it failed. The question is what the republic does with a victory it did not expect to win.

- @rally: Let the country feel it — the republic has won.
- @legal: Demand the courts finish what the crisis began.

@rally
on-arrival: banner_strength += 50; commons_marcher += 2; pro_republic += 2

The Banners march through Axton in good order and better spirits — no triumphalism, the marshals insist, merely a reminder of who held. For once the republic's defenders end a crisis larger than they began it.

@legal
on-arrival: pro_republic += 2; dufour_angry += 5

We petition the courts to rule on the *intervention* itself, not merely its failure — to put on record that the decree was unlawful from its first line. The judges will take their time, and the palace takes our insolence personally. But precedents, unlike cabinets, outlive presidents.`],
]);

// 3. harzburg strategy x2
for (const f of ['source/scenes/events/harzburg_front.scene.dry', 'source/scenes/events/harzburg_front_dnf.scene.dry']) {
  ed(f, [
    ['We do not yet have a coherent strategy for combatting the Sovereigntists. We must develop one as soon as possible.\n\n# TODO',
     'The executive sits late over the reports from Stowford — the rally lists, the paymasters, the seams where Mallin\'s conservatives grind against Gallax\'s marchers. The strategy that emerges is patient rather than bold: watch the fault lines, starve the coalition of shared victories, and be ready on the day it cracks. It is not yet a plan to defeat the Right. It is a plan to know it.'],
  ]);
}

// 4a. nazi_10: second option
ed('source/scenes/events/nazi_10.scene.dry', [
  ['- @nazi_2\n\n@nazi_2\ntitle: Is this the start of something greater?',
   '- @nazi_2\n- @exploit: Court the disillusioned rank and file.\n\n@nazi_2\ntitle: Is this the start of something greater?'],
  ['\n# TODO, more outcomes',
   `\n@exploit
on-arrival: loyalist_strength -= 100; loyalist_militancy -= 0.1; vanguard_strength += 30; disfavored_royalist -= 5; disfavored_collectivist += 2; royalist_explode += 1; commons_marcher += 2; disfavored_marcher += 2; commons_royalist -= 2

The crisis is the same — Tessen's ban defied, the regional commands wavering — but we decline to watch it from the gallery. Party canvassers move quietly through the Loyalist strongholds with a simple message for the disillusioned: the movement that promised them bread has fed them parades. Not many cross over; more simply go home. Every man who hangs up the brown coat, whichever way he goes, is one the Sovereigntists must replace.`],
]);

// 4b. nazi_11: counter-rally option
ed('source/scenes/events/nazi_11.scene.dry', [
  ['- @nazi_2\n\n@nazi_2\ntitle: We are powerless, with the police on their side.',
   '- @nazi_2\n- @counter_rally: Answer them in the streets — with the Vanguard beside us.\n\n@nazi_2\ntitle: We are powerless, with the police on their side.'],
  ['\n# TODO, option to rally against these sa guys with communists... but then again this doesn\'t happen if they\'re weaker than democracy_paramilitary',
   `\n@counter_rally
choose-if: collectivist_relation >= 35
unavailable-subtitle: The <span style="color: #700000;">**Collectivists**</span> will not march beside us.
on-arrival: banner_strength += 50; vanguard_strength += 25; commons_marcher += 2; commons_collectivist += 2; loyalist_militancy += 0.02; strife += 1

The square is not left to them. By evening the Banners and the <span style="color: #8B0000;">**Vanguard**</span> fill the far end of it — a counter-column twice shouted down and twice re-formed, under more flags than the two parties have ever flown together. The police keep the columns apart, barely. No one on either side will remember the day as a defeat, which is itself a kind of victory for the republic: the streets, at least, are still contested.`],
]);

// 5. kpd_ultimatum + groko one-liners
ed('source/scenes/events/kpd_ultimatum.scene.dry', [
  ['We were so kind.',
   'Governing alone at last, we owe the Collectivists nothing — a debt their press remembers differently. From here the record is ours alone to write, and there will be no coalition partner left to blame.'],
]);
ed('source/scenes/events/groko_prussia_collapse.scene.dry', [
  ["- @continuing: It's their loss.", '- @continuing: Their loss — we can hold Heartland without them.'],
  ["- @collapse: It's their loss.", '- @collapse: Their loss — even if it costs us the state government.'],
  ['\nDamn. \n',
   '\nA blow, but not a mortal one: the remaining Unity partners in Heartland hold their nerve, and the state government survives in reduced form. We will not forget who walked away first.\n'],
]);

// 6. cabinet_8 twin bank branches: distinct closings
{
  const f = 'source/scenes/events/schleicher_cabinet_8.scene.dry';
  let s = readFileSync(f, 'utf8');
  const lythClose = "\n\nLytton makes certain the concession bears his signature: the Bank yields, he lets it be known, because prudent men steer floods rather than damming them — and because the Golds will collect the credit when the works employ their voters.";
  const fennClose = "\n\nFenn's assent comes with none of Lytton's theater — only a terse technical circular on credit limits, and a private warning to the Ministry that the Bank's patience, like its gold, is a finite reserve.";
  const iLuth = s.indexOf('@reichsbank_luther');
  const iDrey = s.indexOf('@reichsbank_dreyse');
  const iAfterDrey = s.indexOf('\n@', iDrey + 1);
  // insert before @reichsbank_dreyse (end of luther section) and before the section after dreyse
  s = s.slice(0, iAfterDrey) + fennClose + s.slice(iAfterDrey);
  const iDrey2 = s.indexOf('@reichsbank_dreyse');
  const iBeforeDrey = s.lastIndexOf('\n\n@', iDrey2);
  s = s.slice(0, iBeforeDrey) + lythClose + s.slice(iBeforeDrey);
  writeFileSync(f, s);
  console.log('cabinet_8 twins differentiated');
}

// 8. kpd_policy finish-lite (stays disabled)
ed('source/scenes/events/kpd_policy.scene.dry', [
  ['The <span style="color: #700000;">**Collectivists**</span>-controlled Finance Ministry\n',
   'The <span style="color: #700000;">**Collectivists**</span>-controlled Finance Ministry has drafted a steep new levy on great fortunes and top incomes, presented as the price of the crisis falling, for once, on those who can bear it.\n'],
  ['@finance_support\n\n@finance_oppose',
   `@finance_support
on-arrival: capital_strike_progress += 2; budget += 1; commons_collectivist += 4; commons_marcher += 2*(1-dissent); coalition_dissent += 1; unionist_relation -= 4; gold_relation -= 4

The levy passes. The workers cheer a budget balanced for once on the broad backs of the wealthy; the propertied press calls it confiscation, and the flight of capital quickens.

@finance_oppose
on-arrival: collectivist_coalition_dissent += 1; commons_marcher -= 5; commons_collectivist += 5; collectivist_relation -= 6

We block the levy. The <span style="color: #700000;">**Collectivists**</span> take to their press: the Marchers, they write, would sooner tax bread than fortunes.`],
  ['@foreign_support\n\n@foreign_oppose',
   `@foreign_support
on-arrival: soviet_relation += 10; coalition_dissent += 1; unionist_relation -= 4; commons_collectivist += 3

The aid convoys roll east with the government's blessing. The <span style="color: #750e0e;">Central Union</span> takes note, and so — less warmly — does every chancellery to the west of us.

@foreign_oppose
on-arrival: collectivist_coalition_dissent += 1; commons_marcher -= 5; commons_collectivist += 5; collectivist_relation -= 6

We stop the aid program in committee. The <span style="color: #700000;">**Collectivists**</span> denounce us as errand-boys of the western powers, and their ministers begin conducting foreign policy by press release.`],
  ['- @interior_support: Yes, we support purging the security services.',
   `The <span style="color: #700000;">**Collectivists**</span>-held Interior Ministry has begun removing officers it deems politically unreliable — reactionaries by its lights, professionals by their own. The services are unquestionably hostile to the republic; the question is whether this cure serves the republic or the party administering it.

- @interior_support: Yes, we support purging the security services.`],
  ['@interior_support\n\n@interior_oppose',
   `@interior_support
on-arrival: interior_police_loyalty += 0.1; coalition_dissent += 1; unionist_relation -= 5; gold_relation -= 4; commons_collectivist += 3

The purge proceeds under our cover. The services emerge more loyal to the government — and the government's enemies note, accurately, that "the government" increasingly means the <span style="color: #700000;">**Collectivists**</span>'s appointees.

@interior_oppose
on-arrival: collectivist_coalition_dissent += 1; commons_marcher -= 5; commons_collectivist += 5; collectivist_relation -= 6

We halt the purge at the second list of names. The reactionaries keep their posts, the <span style="color: #700000;">**Collectivists**</span> keep the grievance, and we keep a police force loyal to neither of us.`],
]);

// 9. nazis_in_crisis: delete (disabled dead twin, referenced nowhere)
if (existsSync('source/scenes/events/nazis_in_crisis.scene.dry')) {
  unlinkSync('source/scenes/events/nazis_in_crisis.scene.dry');
  console.log('nazis_in_crisis.scene.dry deleted');
}
console.log('done');
