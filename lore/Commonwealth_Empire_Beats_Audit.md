# The Empire Beats — audit & gap analysis

Reference for balancing the Empire/reunification thread and scoping tranche 2.
Measured from 60 random runs (fire times) and 400 strategy runs (survival), current build.

Annotate with ✎ under each item.

---

## 1. What exists today

The whole thread is **one fixed chain** hung off `crisis_start_time`, which is stamped by the Veran Crash. Because the Crash itself is calendar-locked (`year = 1929 and month >= 10`), every beat lands on the *same month in every run* — the measured range for each was zero.

| # | Beat | Trigger | Fires (measured) | Player agency | Empire content? |
|---|---|---|---|---|---|
| 1 | **The Veran Crash** | `year = 1929 and month >= 10` — sets `crisis_start_time` | Autumn 4294 (m22) | 2 options | No — economic |
| 2 | **Paralysis** | `crisis_start_time + 1` | Winterturn 4294 (m23) | 2 options, see §2 | **No — economic** |
| 3 | **The Fall of Ivion** | `crisis_start_time + 2` | Yearsend 4294 (m24) | 3 options | **Yes** — the Empire seizes the isle |
| 4 | **An Envoy from the North** | `crisis_start_time + 4` | Springtide 4295 (m26) | **0 options** — pure read-out | Yes — reports posture/fear/reunification |
| 5 | **Naval Action off Stathmore** | `crisis_start_time + 9` | Summerwane 4295 (m31) | 3 options + bands | Yes — fleet action |
| 6 | **The Empire Question** | `year = 1934, months 3–6` | Spring 4299 (m75) | 7 options across two branches | Yes — the framing choice |

**Recurring, not a beat:** the **Imperial Relations** card (needs government + the Foreign Ministry, 8-month cooldown). Fired in only **23 of 60 runs** — most players never hold Foreign.

**Adjacent systems that feed the ending but read as domestic:** the magi axis (`magi_balance`, 30% of `reunification_support`), military spending → `military_readiness` → `commonwealth_standing` → `empire_posture` drift (15%/turn).

✎

---

## 2. The Paralysis problem

Three things make it read oddly:

1. **It has no Empire in it.** Title, prose, and effects are purely economic — idle workshops, deadlocked Assembly, `economic_growth −1`, `budget −1`, `dues −1`, `disfavored +2`. It sits in the Empire chain only because it occupies slot +1 between the Crash and Ivion. It is really *Veran Crash, part two*.
2. **Its choice is not a choice.** `@emergency` grants `crisis_urgency += 1`; `@hold` grants **literally nothing** — no cost, no benefit, no flag. Since `crisis_urgency` feeds `wtb_points_gain`, taking emergency measures is strictly better unless you actively don't want the economic plan.
3. **The damage is unconditional.** All the harm lands in the scene's own `on-arrival`, before either option — so the "decision" cannot mitigate what just happened.

Options: rewrite it as a genuine Empire beat (the Empire reacts to the Commonwealth's paralysis), give `@hold` a real payoff (e.g. budget/inflation relief against slower recovery), or fold it into the Crash and free the slot.

✎

---

## 3. The gap — this is the headline

**Everything is front-loaded into a 9-month window.** Beats 1–5 all fire between month 22 and month 31 (Autumn 4294 → Summerwane 4295). Then:

> **Months 31 → 75. A 44-month silence.** From Summerwane 4295 to Spring 4299 there is *no Empire beat at all* unless you hold the Foreign Ministry and play the Imperial Relations card.

In 60 traced runs, **46 had their single longest quiet stretch running from Naval Action to the end of the run.** The second-worst gap is the 5-month stretch from the Envoy to Naval Action, which is fine.

And players *are* alive for that silence:

| month | in-world | still playing |
|---|---|---|
| 31 (last beat) | Summerwane 4295 | 100% |
| 42 | Ripening 4296 | 76% |
| 48 | Yearsend 4296 | 64% |
| 54 | Ripening 4297 | 43% |
| 60 | Yearsend 4297 | 32% |
| 66 | Ripening 4298 | 25% |
| 75 (next beat) | Spring 4299 | **7%** |

So the Empire Question is written for an audience of roughly one player in fourteen, and the reunification arc it opens is effectively unreachable content for everyone else. **The years 4296–4298 are the hole.**

✎

---

## 4. Candidate beats for tranche 2

Slots chosen to break the 44-month silence at roughly 8–12 month intervals, weighted to where players actually still are (4296–4297).

| Slot | Suggested month | Concept | Notes |
|---|---|---|---|
| A | ~m38 (Ripening 4296) | **The Imperial Note** — the Empire formally states its terms; first real posture fork after Ivion | Fills the worst part of the gap; reachable by ~80% of runs |
| B | ~m46 (Autumn 4296) | **The Exiles' Question** — Restorationist émigrés and the Empire's patronage of them; ties `royalist_urgency` to the Empire | Gives the Royalist thread an Empire face |
| C | ~m54 (Ripening 4297) | **Trade and the Blockade** — economic leverage across the border; a budget/posture tradeoff | ~43% reach it |
| D | conditional | **Answer to the Committee** — the Empire responds to a seated Reconciliation Committee | Currently the Committee has *no* downstream beat at all |
| E | conditional | **Naval aftermath** — `naval_action_seen` is set but read by nothing; the battle never echoes | Cheap: reuse an existing flag |

✎ (which of these, and any of your own)

---

## 5. Smaller notes

- **The Envoy has zero options** — it is a pure status read-out. Fine as a legibility beat, but it means the 4295 stretch has only two interactive Empire moments.
- **The chain is perfectly deterministic** — same months every run. Some jitter (±1–2 months) would make replays feel less scripted, if wanted.
- **`naval_action_seen`** is set and never read (see slot E).
- **Imperial Relations is the only recurring Empire lever**, and it is locked behind a ministry most runs never hold. Worth considering a weaker out-of-government version.

✎
