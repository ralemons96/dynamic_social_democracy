// Probe: when do toleration options appear, what does the bot pick, and does
// marcher_toleration ever stick? 20 strategy runs, same seeds as the batch.
import { loadGame, makeSimUI, makeEngine, seededRandom } from './headless.mjs';

const RUNS = 20, SEED = 7;
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
const origLog = console.log;
for (let run = 0; run < RUNS; run++) {
  const runSeed = SEED * 100000 + run;
  const rnd = seededRandom(runSeed);
  const origRandom = Math.random;
  Math.random = seededRandom(runSeed ^ 0x9e3779b9);
  console.log = () => {};
  const game = await loadGame();
  const eng = makeEngine(makeSimUI(), game);
  const seen = new Map();
  const events = [];
  try {
    eng.beginGame([runSeed]);
    let prevTol = 0;
    for (let step = 0; step < 4000; step++) {
      if (eng.isGameOver()) break;
      const q = eng.state.qualities;
      const sid = String(eng.state.sceneId || '');
      seen.set(sid, (seen.get(sid) || 0) + 1);
      const choices = eng.getCurrentChoices();
      if (!choices || !choices.length) break;
      const tolIdx = choices.findIndex(c => /tolerat/i.test(String(c.title)));
      // pick (same logic as strategy profile)
      const avail = choices.map((c, i) => ({ c, i })).filter(x => x.c.canChoose);
      if (!avail.length) break;
      let idx;
      if (seen.get(sid) > 5) idx = avail[Math.floor(rnd() * avail.length)].i;
      else {
        let best = -Infinity, bestIdx = [];
        for (const x of avail) {
          const sc = stratScore(x.c);
          if (sc > best) { best = sc; bestIdx = [x.i]; }
          else if (sc === best) bestIdx.push(x.i);
        }
        idx = bestIdx[Math.floor(rnd() * bestIdx.length)];
      }
      if (tolIdx >= 0 && !/dealing_with_toleration|against_toleration/.test(sid)) {
        events.push(`t${q.time} ${sid} [bc=${Math.round(q.bruning_coalition || 0)}] :: ` + choices.map((c, i) =>
          `${i === idx ? '>>' : '  '}${c.canChoose ? '' : 'X '}${String(c.title).replace(/<[^>]*>/g, '').slice(0, 48)}`).join(' | '));
      }
      eng.choose(idx);
      const tol = eng.state.qualities.marcher_toleration || 0;
      if (tol !== prevTol) { events.push(`t${eng.state.qualities.time} *** marcher_toleration ${prevTol} -> ${tol} (scene ${sid})`); prevTol = tol; }
    }
  } catch (e) { events.push('ERR ' + e.message); }
  finally { Math.random = origRandom; console.log = origLog; }
  if (events.length) origLog(`--- run ${run}:\n` + events.join('\n'));
}
