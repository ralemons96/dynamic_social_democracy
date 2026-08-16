// Full attribution of commons_marcher deltas: which scenes/mechanisms drain the
// Marcher working-class base, bucketed pre/post Veran Crash. No threshold — every
// per-step delta is accounted, so buckets sum to (final - initial).
// Usage: node tools/sim/trace_drain.mjs [--runs 20] [--seed 7] [--profile strategy]
import { loadGame, makeSimUI, makeEngine, seededRandom } from './headless.mjs';

const args = Object.fromEntries(process.argv.slice(2).map((a, i, arr) =>
  a.startsWith('--') ? [a.slice(2), arr[i + 1]] : null).filter(Boolean));
const RUNS = parseInt(args.runs || '20', 10);
const SEED = parseInt(args.seed || '7', 10);
const PROFILE = args.profile || 'strategy';
const QUALITY = args.quality || 'commons_marcher';
const CAP = 4000;

// strategy scorer copied from run_sims.mjs (kept in sync manually)
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
  [8, /tolerate|toleration/i],
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
  [2, /rally/i],
  [1, /party affairs|government affairs/i],
];
function stratScore(c) {
  const t = (String(c.title) + ' ' + String(c.subtitle || '')).replace(/<[^>]*>/g, '');
  let sc = 0;
  for (const [w, re] of STRAT_RULES) if (re.test(t)) sc += w;
  return sc;
}
function pickChoice(choices, rnd, loopy) {
  const avail = choices.map((c, i) => ({ c, i })).filter(x => x.c.canChoose);
  if (!avail.length) return -1;
  if (PROFILE === 'strategy' && !loopy) {
    let best = -Infinity, bestIdx = [];
    for (const x of avail) {
      const sc = stratScore(x.c);
      if (sc > best) { best = sc; bestIdx = [x.i]; }
      else if (sc === best) bestIdx.push(x.i);
    }
    return bestIdx[Math.floor(rnd() * bestIdx.length)];
  }
  return avail[Math.floor(rnd() * avail.length)].i;
}

// bucket: era(pre|post crash) / source
const buckets = new Map(); // key -> {sum, hits}
function add(key, delta) {
  const b = buckets.get(key) || { sum: 0, hits: 0 };
  b.sum += delta; b.hits += 1;
  buckets.set(key, b);
}
let totalDelta = 0, burdenFails = 0, burdenFailsPre = 0, govMonthsPre = 0, monthsPre = 0;
const electionVotes = []; // {t, marcher_votes} at each election scene entry
const origLog = console.log;

for (let run = 0; run < RUNS; run++) {
  const runSeed = SEED * 100000 + run;
  const rnd = seededRandom(runSeed);
  const origRandom = Math.random;
  Math.random = seededRandom(runSeed ^ 0x9e3779b9);
  console.log = () => {};
  const game = await loadGame();
  const ui = makeSimUI();
  const eng = makeEngine(ui, game);
  const seen = new Map();
  // Per-scene attribution: shadow __changeScene to sample commons_marcher at every
  // scene entry in a go-to chain, so month-advance drift (post_event) separates
  // cleanly from the card/event that routed through it.
  const chain = [];
  const origCS = eng.__changeScene.bind(eng);
  eng.__changeScene = function (id) {
    chain.push({ id: String(id).split('.')[0], v: eng.state.qualities[QUALITY], f: eng.state.qualities.gov_burden_fail || 0 });
    origCS(id);
  };
  try {
    eng.beginGame([runSeed]);
    let prevFail = 0, prevTime = -1, startVal;
    chain.length = 0; // discard init chain (root init sets commons from undefined)
    startVal = eng.state.qualities[QUALITY];
    for (let step = 0; step < CAP; step++) {
      if (eng.isGameOver()) break;
      const q = eng.state.qualities;
      const sid = String(eng.state.sceneId || '');
      const top = sid.split('.')[0];
      seen.set(sid, (seen.get(sid) || 0) + 1);
      // month bookkeeping (pre-crash government exposure)
      if ((q.time || 0) !== prevTime) {
        prevTime = q.time || 0;
        if (!q.veran_crash_seen) { monthsPre++; if (q.marcher_in_government) govMonthsPre++; }
      }
      if (/^(election_1928|prussia_election_1928)$/.test(top) && seen.get(sid) === 1)
        electionVotes.push({ t: q.time || 0, votes: Math.round((q.marcher_votes || 0) * 10) / 10, run });
      const choices = eng.getCurrentChoices();
      if (!choices || !choices.length) break;
      const idx = pickChoice(choices, rnd, seen.get(sid) > 5);
      if (idx < 0) break;
      chain.length = 0;
      eng.choose(idx);
      const q2 = eng.state.qualities;
      const now = q2[QUALITY];
      const era = q2.veran_crash_seen ? 'POST' : 'PRE ';
      if (typeof startVal !== 'number' && typeof now === 'number') { startVal = now; prevFail = q2.gov_burden_fail || 0; continue; }
      // walk the chain: segment i's effect = value at next entry (or final) - value at entry i
      for (let i = 0; i < chain.length; i++) {
        const a = chain[i], b = i + 1 < chain.length ? chain[i + 1] : { v: now, f: q2.gov_burden_fail || 0 };
        if (typeof a.v !== 'number' || typeof b.v !== 'number') continue;
        const delta = b.v - a.v;
        const fail = b.f > a.f;
        if (fail) { burdenFails++; if (!q2.veran_crash_seen) burdenFailsPre++; }
        if (delta === 0) continue;
        let src = a.id;
        if (fail) src = 'BURDEN-FAIL(in ' + a.id + ')';
        else if (/^(election_1928|prussia_election_1928)$/.test(a.id)) src = 'election:' + a.id;
        add(era + ' | ' + src, delta);
        totalDelta += delta;
      }
      prevFail = q2.gov_burden_fail || 0;
    }
    const fin = eng.state.qualities[QUALITY];
    if (typeof startVal === 'number' && typeof fin === 'number' && run < 3)
      origLog(`  [recon] run ${run}: start ${startVal.toFixed(1)} -> final ${fin.toFixed(1)} (net ${(fin - startVal).toFixed(1)})`);
  } catch (e) { /* run aborted; keep partial attribution */ }
  finally { Math.random = origRandom; console.log = origLog; }
}

console.log(`\n=== ${QUALITY} delta attribution — ${RUNS} ${PROFILE} runs (seed ${SEED}) ===`);
console.log(`total net ${QUALITY} change (all runs): ${totalDelta.toFixed(1)}  (avg ${(totalDelta / RUNS).toFixed(1)}/run)`);
console.log(`burden-fail firings: ${burdenFails} total, ${burdenFailsPre} pre-crash  |  pre-crash months in govt: ${govMonthsPre}/${monthsPre} (${(100 * govMonthsPre / Math.max(1, monthsPre)).toFixed(0)}%)`);
const rows = [...buckets.entries()].sort((a, b) => a[1].sum - b[1].sum);
console.log('\nbucket'.padEnd(46) + 'net'.padStart(9) + 'hits'.padStart(7) + 'avg/hit'.padStart(9));
for (const [k, v] of rows) {
  if (Math.abs(v.sum) < 2) continue;
  console.log(k.padEnd(45) + v.sum.toFixed(1).padStart(9) + String(v.hits).padStart(7) + (v.sum / v.hits).toFixed(2).padStart(9));
}
const early = electionVotes.filter(e => e.t <= 24), late = electionVotes.filter(e => e.t > 24);
console.log(`\nelections entered: ${electionVotes.length} (${(electionVotes.length / RUNS).toFixed(1)}/run) | mean marcher_votes at election: early(t<=24) ${(early.reduce((s, e) => s + e.votes, 0) / Math.max(1, early.length)).toFixed(1)} (n=${early.length}), late ${(late.reduce((s, e) => s + e.votes, 0) / Math.max(1, late.length)).toFixed(1)} (n=${late.length})`);
