// TDD for the component-wise rename function (spec §1).
import { renameId } from './maps.mjs';

let pass = 0, fail = 0;
function eq(input, expected) {
  const got = renameId(input);
  if (got === expected) { pass++; }
  else { fail++; console.log(`  FAIL renameId(${JSON.stringify(input)}) = ${JSON.stringify(got)}, expected ${JSON.stringify(expected)}`); }
}

// Party tokens
eq('spd_workers', 'marcher_commons');
eq('workers_spd', 'commons_marcher');
eq('kpd_votes', 'collectivist_votes');
eq('nsdap_r', 'royalist_r');
eq('dnvp_votes', 'traditionalist_votes');
eq('dnef_votes', 'gnu_votes');
eq('z_votes', 'unionist_votes');
eq('z_minus_bvp_votes', 'unionist_minus_bvp_votes');
eq('industrial_z_backing', 'industrial_unionist_backing');

// Bloc tokens (incl. two-token phrases)
eq('new_middle_dvp', 'burgher_gold');
eq('old_middle_dnvp', 'guild_traditionalist');
eq('unemployed_kpd', 'disfavored_collectivist');
eq('catholics_spd', 'faithful_marcher');
eq('rural_dnvp_display', 'landed_traditionalist_display');

// DVP/DDP merge special-case: dvp->gold, ddp kept distinct
eq('new_middle_ddp', 'burgher_ddp');
eq('ddp_name', 'ddp_name');
eq('ddp_votes', 'ddp_votes');
eq('dvp_exist', 'gold_exist');

// Standalone flags / prefixes
eq('nazi_funds', 'royalist_funds');
eq('nazi_urgency', 'royalist_urgency');
eq('prussia_leader', 'heartland_leader');
eq('prussia_coup_win', 'heartland_coup_win');
eq('prussian_coup', 'heartland_coup');
eq('schleicher_10', 'staal_10');
eq('schleicher_dnef', 'staal_gnu');
eq('hindenburg_hitler', 'dufour_gallax');
eq('hindenburg_angry', 'dufour_angry');
eq('nsdap_hitler_votes', 'royalist_gallax_votes');
eq('cvp_dnvp_balance', 'concord_traditionalist_balance');
eq('reichsbanner_strength', 'banner_strength');
eq('neorevisionist_strength', 'knight_strength');
eq('black_thursday_seen', 'veran_crash_seen');

// Inert / deferred / catch-all — unchanged
eq('lvp_formed', 'lvp_formed');
eq('kvp_votes', 'kvp_votes');
eq('dnf_votes', 'dnf_votes');
eq('bvp_votes', 'bvp_votes');
eq('other_votes', 'other_votes');
eq('sapd_votes', 'sapd_votes');
eq('loyalty', 'loyalty');

// Non-quality words must pass through untouched
eq('started', 'started');
eq('economic_growth', 'economic_growth');
eq('advisor_action_timer', 'advisor_action_timer');
eq('month', 'month');

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
