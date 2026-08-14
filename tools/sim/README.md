# Commonwealth sim harness

Headless Monte-Carlo playtesting for balance work. Runs the real dendrynexus engine
against `out/game.json` (recompile first if you changed scenes: `npx dendrynexus compile -f`).

## Run a batch

```bash
node tools/sim/run_sims.mjs --runs 100 --seed 7 --profile random
```

- `--profile random|first|passive` — uniform random / always-first-choice / prefers do-nothing options
- `--seed N` — fully deterministic (engine RNG + Math.random both seeded per run)
- `--cap 4000` — step cap per run
- `--out path.jsonl` — default `tools/sim/out/<profile>-s<seed>-r<runs>.jsonl`

## Read the report

```bash
node tools/sim/report.mjs tools/sim/out/random-s7-r100.jsonl
```

Sections: ending distribution + survival · per-year metric trajectories · event
coverage (never-fired = dead-content candidates) · hardness signals (locked-choice
rates, time in government, achievements) · engine errors + softlocks.

## A/B a balance change

```bash
node tools/sim/run_sims.mjs --runs 100 --seed 7 --out tools/sim/out/base.jsonl
# ...edit balance, recompile...
node tools/sim/run_sims.mjs --runs 100 --seed 7 --out tools/sim/out/tweak.jsonl
node tools/sim/report.mjs tools/sim/out/base.jsonl tools/sim/out/tweak.jsonl
```

Same seed ⇒ identical decision streams, so differences are your change's effect.

## Caveats

Random play is a *floor*, not a player model: win rates near 0% are expected in a
hard game. The harness's real value: crash/softlock detection at scale, event and
ending reachability, metric drift curves, and seeded A/B comparison. Never-fired
events include legitimately deep-gated content (secret modes, alt-variants) —
read the list with judgment.
