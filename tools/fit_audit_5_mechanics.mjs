// Fit audit Batch 5: SSF mechanics fixes per user markup.
import { readFileSync, writeFileSync, unlinkSync, existsSync } from 'fs';

function ed(file, pairs, opts = {}) {
  let s = readFileSync(file, 'utf8');
  for (const [from, to, expect] of pairs) {
    const n = s.split(from).length - 1;
    if (n === 0) { console.log(`MISS ${file.split('/').pop()}: ${String(from).slice(0, 60)}`); continue; }
    if (expect && n !== expect) console.log(`[${n}x, expected ${expect}] ${file.split('/').pop()}: ${String(from).slice(0, 50)}`);
    s = s.split(from).join(to);
  }
  if (opts.regex) for (const [re, to] of opts.regex) s = s.replace(re, to);
  writeFileSync(file, s);
}

// ============ F1: heartland election handoff ============
{
  const f = 'source/scenes/events/prussia_election_1928.scene.dry';
  let s = readFileSync(f, 'utf8');
  // 1. seed _r_prussia from live _r_heartland so old_/change math compares against real seats
  const seedAnchor = '// Define adjustment factors';
  const seed = `// Seed the working _prussia values from the live _heartland seat shares so the
// old-value/change math compares against the chamber the player actually has.
for (var party of Q.parties) {
    if (Q[party + '_r_heartland'] !== undefined) Q[party + '_r_prussia'] = Q[party + '_r_heartland'];
    if (Q[party + '_votes_heartland'] !== undefined) Q[party + '_votes_prussia'] = Q[party + '_votes_heartland'];
}

// Define adjustment factors`;
  if (s.split(seedAnchor).length - 1 !== 1) console.log('F1 seed anchor count != 1');
  s = s.replace(seedAnchor, seed);
  // 2. handoff results to the _heartland consumers before the GNU consolidation reads them
  const gnuAnchor = 'if (Q.gnu_formed) {\n    Q.staal_gnu_r_heartland = Q.gnu_r_heartland;';
  const handoff = `// Hand the freshly computed results to the _heartland consumers (seat shares, votes).
for (var party of Q.parties) {
    Q['old_' + party + '_r_heartland'] = Q[party + '_r_heartland'];
    Q[party + '_r_heartland'] = Q[party + '_r_prussia'];
    Q[party + '_votes_heartland'] = Q[party + '_votes_prussia'];
}

` + gnuAnchor;
  if (s.split(gnuAnchor).length - 1 !== 1) console.log('F1 gnu anchor count != 1');
  s = s.replace(gnuAnchor, handoff);
  // 3. hand off the change display strings after they are computed
  const strAnchor = '// Store current votes as previous for the next iteration';
  const strHandoff = `// Hand the change display strings to the _heartland table.
for (var party of Q.parties) {
    Q['str_change_' + party + '_heartland'] = Q['str_change_' + party + '_prussia'];
    Q['str_votes_change_' + party + '_heartland'] = Q['str_votes_change_' + party + '_prussia'];
}

// Store current votes as previous for the next iteration`;
  if (s.split(strAnchor).length - 1 !== 1) console.log('F1 str anchor count != 1');
  s = s.replace(strAnchor, strHandoff);
  // 4. adjustment-factor reads: align suffix with the _heartland writers
  s = s.split("Q['adjustmentFactors_' + party + '_prussia']").join("Q['adjustmentFactors_' + party + '_heartland']");
  // 5. re-key the per-year swing dicts to the coined party ids
  for (const [oldK, newK] of [['spd:', 'marcher:'], ['kpd:', 'collectivist:'], ['z:', 'unionist:'], ['dvp:', 'gold:'], ['dnvp:', 'traditionalist:'], ['nsdap:', 'royalist:']]) {
    s = s.split('        ' + oldK).join('        ' + newK);
  }
  writeFileSync(f, s);
  console.log('F1 heartland handoff installed');
}

// ============ F2: magi card sets legacy flags ============
ed('source/scenes/government_affairs/homosexual_rights.scene.dry', [
  ['on-arrival: magi_registry_repealed = 1;', 'on-arrival: magi_registry_repealed = 1; repealed_175 = 1; homosexual_rights += 1;', 1],
  ['on-arrival: magi_circles_recognized = 1;', 'on-arrival: magi_circles_recognized = 1; reformed_183 = 1; homosexual_rights += 1;', 1],
  ['on-arrival: magi_protected = 1;', 'on-arrival: magi_protected = 1; trans_rights = 1; homosexual_rights += 1;', 1],
]);

// ============ F3: achievement grant renames + heuchelei granter + subtitle ============
ed('source/scenes/events/death_of_hindenburg_president.scene.dry', [
  ['achievement: nach_schleicher_wir', 'achievement: nach_staal_wir', 2],
]);
ed('source/scenes/events/nazi_20.scene.dry', [['achievement: hitler_tot', 'achievement: gallax_tot', 1]]);
ed('source/scenes/government_affairs/deport_hitler.scene.dry', [['achievement: deport_hitler', 'achievement: deport_gallax', 2]]);
ed('source/scenes/party_affairs/reichsbanner.scene.dry', [['achievement: women_reichsbanner', 'achievement: women_banner', 1]]);
ed('source/scenes/events/rohm_gay.scene.dry', [
  ['@persecute_rohm\nunavailable-subtitle:', '@persecute_rohm\nachievement: heuchelei\nunavailable-subtitle:', 1],
]);
ed('source/scenes/game_over.scene.dry', [
  ['persecute Isen Glade for being <span style="color: red;">ho</span><span style="color: orange;">m</span><span style="color: yellow;">o</span><span style="color: green;">se</span><span style="color: blue;">xu</span><span style="color: purple;">al</span>, and then legalize it afterwards.',
   'prosecute Isen Glade under the very Bloodright Statute we ourselves oppose.', 2],
]);

// ============ F4: Freehold epilogue flags ============
ed('source/scenes/events/austrian_civil_war.scene.dry', [
  ['on-arrival: austria_civil_war = 1', 'on-arrival: austria_civil_war = 1; long_war = 1', 1],
  ['on-arrival: austria_peace = 1;', 'on-arrival: austria_peace = 1; force_peace = 1;', 1],
]);
{ // @long_war_2 on-arrival (line ~75) - prefix the section's on-arrival
  const f = 'source/scenes/events/austrian_civil_war.scene.dry';
  let s = readFileSync(f, 'utf8');
  const a = '@long_war_2\n';
  const idx = s.indexOf(a);
  const oa = s.indexOf('on-arrival: ', idx);
  s = s.slice(0, oa) + 'on-arrival: long_war_2 = 1; ' + s.slice(oa + 'on-arrival: '.length);
  writeFileSync(f, s);
  console.log('F4 long_war_2 flag added');
}

// ============ F5: 1934 dead event ============
ed('source/scenes/events/1934.scene.dry', [['view-if: year >= 4299 and month >= 1', 'view-if: year >= 1934 and month >= 1', 1]]);

// ============ F7: per-turn metric recompute in post_event ============
{
  const f = 'source/scenes/post_event.scene.dry';
  let s = readFileSync(f, 'utf8');
  const anchor = '    if (Q.empire_posture === undefined) Q.empire_posture = 50;';
  const block = `    // Recompute the Convention metrics every turn (mirrors the Status-screen formulas)
    // so ending_slides never sees stale or default values.
    var _stab = (Q.pro_republic || 0)
        - 4 * (Q.coup_progress || 0)
        - 3 * (Q.capital_strike_progress || 0)
        - Math.max(0, (Q.disfavored || 0) - 8)
        + Math.max(-5, Math.min(5, (Q.economic_growth || 0)));
    Q.stability = Math.max(0, Math.min(100, Math.round(_stab)));
    var _ready = (Q.army_strength || 0) * (Q.army_militancy || 0) * (Q.army_loyalty || 0)
        + (Q.banner_strength || 0) * (Q.banner_militancy || 0);
    Q.military_readiness = Math.round(_ready);
    var _readyNorm = Math.min(100, Q.military_readiness / 4);
    Q.commonwealth_standing = Math.max(0, Math.min(100, Math.round(
        0.4 * Q.stability + 0.3 * (Q.pro_republic || 0) + 0.3 * _readyNorm)));
    var _reunion = 0.55 * (Q.empire_posture || 0) + 0.3 * (Q.magi_balance || 0)
        + 0.15 * (Q.concord_formed ? 100 : 0);
    Q.reunification_support = Math.max(0, Math.min(100, Math.round(_reunion)));
` + anchor;
  if (s.split(anchor).length - 1 !== 1) console.log('F7 anchor count != 1');
  s = s.replace(anchor, block);
  writeFileSync(f, s);
  console.log('F7 per-turn metrics installed');
}

// ============ F8: rename-seam gates ============
ed('source/scenes/government_affairs/economic_policy.scene.dry', [
  [' if army_marcher', ' if army_minister_party == "Marcher"', 10],
]);
ed('source/scenes/events/bruning_second_cabinet_alt.scene.dry', [
  ['not emergency_decree_mitigate and', 'not emergency_decree_mitigated and', 1],
]);
ed('source/scenes/events/presidential_election_1932_campaign.scene.dry', [
  ['view-if: not marcher_campaign_1932', 'view-if: not marcher_candidate_1932', 2],
]);
ed('source/scenes/events/presidential_election_1932_round_1.scene.dry', [
  ['Q.unionist_success_marcher', 'Q.unionist_support_marcher', 1],
  ['Q.z_drop_out_2', 'Q.unionist_drop_out_2', 1],
  ['duesterburg_wins if duesterburg_majority == 1; ', '', 1],
]);
ed('source/scenes/events/local_election_saxony_1933.scene.dry', [
  ['!Q.gold_leader != "Coalfax"', 'Q.gold_leader != "Coalfax"', 1],
  ['bourgeois_coalition_saxon <', 'bourgeois_coalition_saxony <', 1],
]);
// round_1:1092 second "switched our support" -> secondary candidate
{
  const f = 'source/scenes/events/presidential_election_1932_round_1.scene.dry';
  let s = readFileSync(f, 'utf8');
  const needle = 'We have switched our support to [+ reactionary_candidate_1932 +].';
  const first = s.indexOf(needle);
  const second = s.indexOf(needle, first + 1);
  if (second === -1) console.log('F8 round2 splice: second occurrence not found');
  else {
    s = s.slice(0, second) + 'We have switched our support to [+ secondary_reactionary_candidate_1932 +].' + s.slice(second + needle.length);
    writeFileSync(f, s);
    console.log('F8 round2 secondary splice done');
  }
}

// ============ F9c: mefo bills feed inflation ============
ed('source/scenes/events/schleicher_cabinet_8.scene.dry', [
  ['Q.mefo_bills = 1;', 'Q.mefo_bills = 1;\nQ.inflation += 0.5;', 2],
]);

// ============ F9d: delete papenomics ============
if (existsSync('source/scenes/events/papenomics.scene.dry')) {
  unlinkSync('source/scenes/events/papenomics.scene.dry');
  console.log('papenomics.scene.dry deleted');
}

// ============ F12g: _12_alt fallback ============
{
  const f = 'source/scenes/events/schleicher_cabinet_12_alt.scene.dry';
  let s = readFileSync(f, 'utf8');
  const n = s.split('- @z_break\n').length - 1;
  s = s.split('- @z_break\n').join('- @z_break\n- @schleicher_cabinet_13_pre_pre\n');
  s += `\n@schleicher_cabinet_13_pre_pre
title: Staal's Turn to Play
subtitle: Will the general hold firm?
view-if: not unionist_against_staal
go-to: schleicher_cabinet_13
`;
  writeFileSync(f, s);
  console.log(`F12g fallback added after ${n} z_break options + section appended`);
}

// ============ F13: warden_paramilitary removal, joavig, harzburg gates ============
{
  const f = 'source/scenes/post_event.scene.dry';
  let s = readFileSync(f, 'utf8');
  const oldBlock = `    if (Q.loyalist_force >= Q.warden_force) {
        Q.loyalist_paramilitary = 1;
        Q.warden_paramilitary = 0;
    } else {
        Q.warden_paramilitary = 1;
        Q.loyalist_paramilitary = 0;`;
  const newBlock = `    if (Q.loyalist_force >= Q.warden_force) {
        Q.loyalist_paramilitary = 1;
    } else {
        Q.loyalist_paramilitary = 0;`;
  if (!s.includes(oldBlock)) console.log('F13a warden block MISS');
  s = s.replace(oldBlock, newBlock);
  writeFileSync(f, s);
}
for (const f of ['source/scenes/library.scene.dry', 'source/scenes/status.scene.dry', 'source/scenes/events/weimar_prussia_collapse.scene.dry']) {
  ed(f, [['joavig', 'Joavig']]);
}
{
  const f = 'source/scenes/events/presidential_election_1932_candidate.scene.dry';
  let s = readFileSync(f, 'utf8');
  const n = s.split('view-if: not harzburg_unity\n').length - 1;
  s = s.split('view-if: not harzburg_unity\n').join('');
  writeFileSync(f, s);
  console.log(`F13d harzburg gates removed: ${n}`);
}
console.log('done');
