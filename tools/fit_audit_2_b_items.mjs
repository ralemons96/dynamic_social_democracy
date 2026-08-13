// Fit audit Batch 2: surgical SSB items (B1/B3 user texts, B7 collapses, B10 headers, B9a).
import { readFileSync, writeFileSync } from 'fs';

function ed(file, pairs) {
  let s = readFileSync(file, 'utf8');
  for (const [from, to] of pairs) {
    const n = s.split(from).length - 1;
    if (n !== 1 && !(n >= 1 && from.length > 120)) console.log(`  [${n}x] ${file.split('/').pop()}: ${from.slice(0, 60)}`);
    if (n) s = s.split(from).join(to);
    else console.log(`  MISS ${file.split('/').pop()}: ${from.slice(0, 70)}`);
  }
  writeFileSync(file, s);
}

// B1 - game_over Soviet-aid ending (user text)
ed('source/scenes/game_over.scene.dry', [
  ['The <span style="color: #750e0e;">Soviet Union</span> has aided the <span style="color: #700000;">Communists</span>, but not the <span style="color: #c00000;">socialists</span> and <span style="color: #D3C24D;">democrats</span>, in an attempt to shape the Commonwealth\'s future government.',
   'The <span style="color: #750e0e;">Central Union</span> is flooding aid to the <span style="color: #700000;">Collectivists</span>, in an attempt to shape the Commonwealth\'s future government.'],
  ['<span style="color: #DC143C;">Pol</span><span style="color: #FFFFFF;">and</span> and <span style="color: #11457E;">Czech</span><span style="color: #FFFFFF;">oslo</span><span style="color: #D7141A;">vakia</span> have sent some assistance against the fascists.',
   'Other northern realms reluctantly send aid in the fight against the reactionaries.'],
  // B8b - Communist victory title + communists support
  ['<span style="color: #700000;">**Communist**</span> victory', '<span style="color: #700000;">**Collectivist**</span> victory'],
  ['<span style="color: #700000;">communists</span> support Bristol', '<span style="color: #700000;">collectivists</span> support Bristol'],
  // B7 - "Golds or Golds"
  ['leader of the <span style="color: #C0A054; font-weight: bold;">Golds</span> or <span style="color: #C0A054; font-weight: bold;">Golds</span>.',
   'leader of the <span style="color: #C0A054; font-weight: bold;">Golds</span>.'],
]);

// B3 - election_1928 rant labels (user text at :2318; condensed twin at :2119)
{
  const f = 'source/scenes/events/election_1928.scene.dry';
  const s = readFileSync(f, 'utf8');
  const lines = s.split('\n');
  const userText = "We will not be lectured on betrayal by the Collectivists! The Marchers stood for progress even in the Empire of old. Collectivism wasn't even an idea until the Marchers broke open social and political progress, and now they want to stand against us and obstruct us, calling us worse than the Sovereigntists. We have steadily stood for righteous, fair governance since our founding and they'd rather let Gallax win than form a proper government of the people just to spite us! I hope they're happy.";
  const condensed = "We will not be lectured on betrayal by the self-proclaimed “vanguard of the proletariat.” While we defended the republic, they attacked Reformists as “class traitors”—and they would sooner let Gallax win than see a government of the people succeed.";
  let done = 0;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('- @coalition_menu: oh, so now the kpd')) { lines[i] = '- @coalition_menu: ' + userText; done++; }
    else if (lines[i].startsWith('- @coalition_menu: Oh, you think the Marchers betrayed')) { lines[i] = '- @coalition_menu: ' + condensed; done++; }
  }
  console.log(`rants replaced: ${done} (want 2)`);
  writeFileSync(f, lines.join('\n'));
}

// B10 - library demographics headers -> canon classes
ed('source/scenes/library.scene.dry', [
  ['**Working Class**: The urban working class', '**The Commons**: The urban working class'],
  ['**old middle class**: The old middle class consists', '**The Burghers**: The old middle class consists'],
  ['**new middle class**: The new middle class consists', '**The Guilds**: The new middle class consists'],
  ['**Rural**: Small and large farmers', '**The Landed**: Small and large farmers'],
]);

// B9a - AfA-Bund -> Ledger League
ed('source/scenes/advisors/aufhauser.scene.dry', [
  ['Auberon is a leader of the AfA-Bund, the federation of', 'Auberon is a leader of the Ledger League, the federation of'],
]);

// B7 - dead same-word conditionals (Golds/Golds) collapse
ed('source/scenes/events/saxon_collapse.scene.dry', [
  ['[? if not lvp_formed: <span style="color: #C0A054;">Golds</span>?][? if lvp_formed: <span style="color: #C0A054;">Golds</span>?]',
   '<span style="color: #C0A054;">Golds</span>'],
]);
ed('source/scenes/events/unemployment_insurance_weimar.scene.dry', [
  ['[? if not lvp_formed: <span style="color: #C0A054;">**Golds**</span>?][? if lvp_formed: <span style="color: #C0A054;">**Golds**</span>?]',
   '<span style="color: #C0A054;">**Golds**</span>'],
]);
console.log('done');
