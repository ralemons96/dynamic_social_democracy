// Monte-Carlo playtest runner for End of Autumn: The Commonwealth.
// Usage: node tools/sim/run_sims.mjs [--runs 50] [--seed 1] [--profile random|first|passive] [--cap 4000] [--out path.jsonl]
import { loadGame, makeSimUI, makeEngine, seededRandom } from './headless.mjs';
import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const args = Object.fromEntries(process.argv.slice(2).map((a, i, arr) =>
  a.startsWith('--') ? [a.slice(2), arr[i + 1]] : null).filter(Boolean));
const RUNS = parseInt(args.runs || '50', 10);
const SEED = parseInt(args.seed || '1', 10);
const PROFILE = args.profile || 'random';
const CAP = parseInt(args.cap || '4000', 10);
const here = dirname(fileURLToPath(import.meta.url));
const TRACE = args.trace !== undefined ? parseInt(args.trace, 10) : -1;
const OUT = args.out || join(here, 'out', `${PROFILE}-s${SEED}-r${RUNS}.jsonl`);

const METRICS = ['year', 'month', 'time', 'pro_republic', 'stability', 'military_readiness',
  'commonwealth_standing', 'reunification_support', 'empire_posture', 'magi_balance', 'imperial_fear',
  'budget', 'resources', 'disfavored', 'inflation', 'marcher_votes', 'royalist_votes',
  'collectivist_votes', 'gold_votes', 'marcher_in_government', 'coalition_dissent',
  'gold_left', 'gold_right', 'lvp_left', 'lvp_right', 'banner_strength', 'loyalist_strength',
  'vanguard_strength', 'coup_progress',
  'commons_marcher', 'burgher_marcher', 'guild_marcher', 'landed_marcher', 'disfavored_marcher', 'faithful_marcher', 'bruning_coalition', 'weimar_coalition', 'dissent',
  'lvp_relation', 'lvp_left', 'lvp_right'];
const ENDING_FLAGS = ['weimar_win', 'empire_outcome', 'gallax_empire_end', 'dnef_win',
  'civil_war_seen', 'republic_victory', 'long_war', 'chancellor', 'president', 'rubicon',
  'wtb_adopted', 'works_program', 'war_loans', 'marcher_toleration', 'gold_relation', 'unionist_relation', 'lvp_relation', 'lvp_ideology', 'lvp_formed'];
const STRAT_RULES = [
  [-12, /civil war|revolt|insurrection|uprising|fight on the streets|general strike/i],
  [-8, /break toleration|end the toleration|tired of austerity/i],
  [-8, /support the vote of no confidence|call a vote of no confidence|voting against this government/i],
  [-7, /repairing relationships with the collectivist|support from the collectivists|popular front|left front/i],
  [-6, /support the left view|simply a bandage|class struggle|nationaliz|socializ|expropriat/i],
  [-5, /support the centrist view|nothing can be done|false hope|retain our current policy|wait it out/i],
  [-4, /stand alone/i],
  [-5, /mod info|credits/i],
  [9, /begin (dynamic mode)/i],
  [8, /tolerate|toleration/i],
  [8, /action is needed|craft a formal plan|voss renewal|renewal plan|widespread support for the voss|force the party to accept the plan/i],
  [7, /support the labor view|support the reformist view/i],
  [7, /an active economic policy|without deficit spending/i],
  [6, /war loans|moratorium|lausanne/i],
  [6, /oppose any votes of no confidence|voting for the government|join the .{0,20}coalition|enter the .{0,20}coalition/i],
  [6, /strengthen our bonds|reconcile with the/i],
  [5, /ban the |persecute|crack down|confronting/i],
  [5, /campaign|canvass/i],
  [4, /compromise|mediate|concession/i],
  [3, /iron banner/i],
  [2, /rally/i],
  [1, /party affairs|government affairs/i],
];
function stratScore(c) {
  const t = (String(c.title) + ' ' + String(c.subtitle || '')).replace(/<[^>]*>/g, '');
  let sc = 0;
  for (const [w, re] of STRAT_RULES) if (re.test(t)) sc += w;
  return sc;
}
const PASSIVE_RE = /no change|do not|do nothing|stand alone|hold our|hold the line|take no action|watch, and|next week|continue|return to|we await|nothing to do/i;

function snapshot(q) {
  const s = {};
  for (const m of METRICS) s[m] = typeof q[m] === 'number' ? Math.round(q[m] * 10) / 10 : q[m];
  return s;
}

function pickChoice(choices, rnd, profile, loopy) {
  const avail = choices.map((c, i) => ({ c, i })).filter(x => x.c.canChoose);
  if (!avail.length) return -1;
  if (profile === 'first' && !loopy) return avail[0].i;
  if (profile === 'strategy' && !loopy) {
    let best = -Infinity, bestIdx = [];
    for (const x of avail) {
      const sc = stratScore(x.c);
      if (sc > best) { best = sc; bestIdx = [x.i]; }
      else if (sc === best) bestIdx.push(x.i);
    }
    return bestIdx[Math.floor(rnd() * bestIdx.length)];
  }
  if (profile === 'passive') {
    const pas = avail.filter(x => PASSIVE_RE.test(String(x.c.title)));
    if (pas.length && rnd() < 0.8) return pas[Math.floor(rnd() * pas.length)].i;
  }
  return avail[Math.floor(rnd() * avail.length)].i;
}

// Load a FRESH game object per run - the engine mutates the shared game object
// (deck caches etc.), which contaminated later runs in a batch.
mkdirSync(dirname(OUT), { recursive: true });
const lines = [JSON.stringify({ config: { runs: RUNS, seed: SEED, profile: PROFILE, cap: CAP, date: '(fixed-seed batch)' } })];
const t0 = Date.now();

for (let run = 0; run < RUNS; run++) {
  const runSeed = SEED * 100000 + run;
  const rnd = seededRandom(runSeed);
  const origRandom = Math.random;
  Math.random = seededRandom(runSeed ^ 0x9e3779b9);
  const origLog = console.log;
  console.log = () => {}; // silence in-game debug prints during the run
  const game = await loadGame();
  const ui = makeSimUI();
  const eng = makeEngine(ui, game);
  const rec = { run, seed: runSeed, error: null, softlock: null, steps: 0 };
  const traj = [];
  const seen = new Map(); // own scene-visit counter (state.visits only tracks max-visits scenes)
  let lastSnapTime = -99;
  try {
    eng.beginGame([runSeed]);
    for (let step = 0; step < CAP; step++) {
      rec.steps = step;
      if (eng.isGameOver()) break;
      const q = eng.state.qualities;
      if ((q.time || 0) - lastSnapTime >= 3) { lastSnapTime = q.time || 0; traj.push(snapshot(q)); }
      const choices = eng.getCurrentChoices();
      if (!choices || !choices.length) { rec.softlock = { scene: eng.state.sceneId, kind: 'no-choices' }; break; }
      const sid = String(eng.state.sceneId || '');
      seen.set(sid, (seen.get(sid) || 0) + 1);
      const topNow = sid.split('.')[0];
      if (/^(election_1928|prussia_election_1928)$/.test(topNow) && rec._lastTop !== topNow) rec.elections = (rec.elections || 0) + 1;
      rec._lastTop = topNow;
      const loopy = seen.get(sid) > 5; // break deterministic menu loops
      const idx = pickChoice(choices, rnd, PROFILE, loopy);
      if (run === TRACE) {
        rec._ring = rec._ring || []; rec._lastT = rec._lastT === undefined ? -1 : rec._lastT; rec._lastTs = rec._lastTs || 0;
        if ((q.time || 0) !== rec._lastT) { rec._lastT = q.time || 0; rec._lastTs = step; }
        rec._ring.push(sid + ' -> ' + (idx >= 0 ? String(choices[idx].title).replace(/<[^>]*>/g, '').slice(0, 60) : 'NONE'));
        if (rec._ring.length > 5000) rec._ring.shift();
        if (step - rec._lastTs === 400) {
          process.stderr.write('FROZEN time=' + rec._lastT + ' y' + q.year + 'm' + q.month + ' war_choices=' + q.war_choices + ' long_war=' + q.long_war + ' resist_coup=' + q.resist_coup + ' total_defeat=' + q.total_defeat + ' republic_victory=' + q.republic_victory + '\n' + rec._ring.join('\n') + '\n');
        }
      }

      if (idx < 0) { rec.softlock = { scene: eng.state.sceneId, kind: 'all-locked', titles: choices.map(c => String(c.title).slice(0, 40)) }; break; }
      eng.choose(idx);
    }
    const q = eng.state.qualities;
    traj.push(snapshot(q));
    rec.gameOver = eng.isGameOver();
    rec.finalScene = eng.state.sceneId;
    rec.final = snapshot(q);
    rec.endFlags = {};
    for (const f of ENDING_FLAGS) rec.endFlags[f] = q[f];
    rec.achievements = Object.keys(eng.state.achievements || {});
    rec.visited = [...new Set([...seen.keys()].map(k => k.split('.')[0]))];
    rec.lockouts = [...ui.lockouts.entries()].filter(([, v]) => v.locked > 0)
      .map(([k, v]) => [k, v.seen, v.locked]);
    rec.traj = traj;
  } catch (err) {
    rec.error = { scene: eng.state && eng.state.sceneId, msg: String(err.message).slice(0, 200) };
    rec.final = eng.state ? snapshot(eng.state.qualities) : {};
    rec.visited = [...new Set([...seen.keys()].map(k => k.split('.')[0]))];
    rec.traj = traj;
  } finally {
    Math.random = origRandom;
    console.log = origLog;
  }
  lines.push(JSON.stringify(rec));
  if ((run + 1) % 10 === 0) console.log(`  ${run + 1}/${RUNS} runs (${((Date.now() - t0) / 1000).toFixed(1)}s)`);
}
writeFileSync(OUT, lines.join('\n') + '\n');
const errs = lines.filter(l => l.includes('"error":{')).length;
console.log(`Wrote ${OUT} — ${RUNS} runs, ${errs} engine errors, ${((Date.now() - t0) / 1000).toFixed(1)}s`);
