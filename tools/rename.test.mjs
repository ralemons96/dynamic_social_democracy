// TDD for the source transformer: rename code contexts, leave prose/scene-ids/strings alone.
import { transformFile } from './rename.mjs';

let pass = 0, fail = 0;
function eq(input, expected, name) {
  const got = transformFile(input);
  if (got === expected) { pass++; }
  else { fail++; console.log(`  FAIL ${name}\n    in:  ${JSON.stringify(input)}\n    got: ${JSON.stringify(got)}\n    exp: ${JSON.stringify(expected)}`); }
}

// Q. magic refs
eq('{! Q.spd_workers = 1; Q.new_middle_ddp += 2 !}',
   '{! Q.marcher_commons = 1; Q.burgher_ddp += 2 !}', 'Q. refs');

// bare on-arrival expression
eq('on-arrival: advisor_action_timer = 6; new_middle_spd += 6*(1-dissent);',
   'on-arrival: advisor_action_timer = 6; burgher_marcher += 6*(1-dissent);', 'bare on-arrival');

// on-arrival {! block line is left to the global Q. pass (no double-processing)
eq('on-arrival: {!', 'on-arrival: {!', 'on-arrival {! opener untouched at line level');

// view-if expression with string literal preserved
eq('view-if: black_thursday_seen == 1 and president != "Braun"',
   'view-if: veran_crash_seen == 1 and president != "Braun"', 'view-if + string preserved');

// choose-if
eq('choose-if: nationalization_adopted == 0 and prussia_leader = "Braun"',
   'choose-if: nationalization_adopted == 0 and heartland_leader = "Braun"', 'choose-if');

// go-to: rename conditions, NOT scene targets (even token-bearing ones)
eq('go-to: prussian_affairs if in_spd_majority_prussia; other_scene if dnef_formed',
   'go-to: prussian_affairs if in_marcher_majority_heartland; other_scene if gnu_formed', 'go-to conditions only');

// inline insert with qdisplay
eq('Seats: [+ new_middle_dvp_display : relationships +]%',
   'Seats: [+ burgher_gold_display : relationships +]%', 'inline insert');

// inline conditional predicate renamed, body prose untouched
eq('[? if dnef_formed: the workers rallied with the SPD ?]',
   '[? if gnu_formed: the workers rallied with the SPD ?]', 'inline predicate, body prose untouched');

// PROSE must be untouched: "workers" and "SPD" in narrative stay
eq('The workers of the SPD met the rural voters.',
   'The workers of the SPD met the rural voters.', 'prose untouched');

// scene header untouched
eq('@spd_congress_1928', '@spd_congress_1928', 'scene header untouched');

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
