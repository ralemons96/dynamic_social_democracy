# Commonwealth — Staal Spine Audit (Track-D D3)

**Purpose:** an annotatable map of the Staal/GNU questline so you can mark up notes/ideas/changes **before** any prose is written. Mark the **✎** column (or inline). Nothing here is built yet — this is for planning.

**Scope:** the Staal chancellorship arc — Goodryke→Staal handoff, Staal's GNU-building, the authoritarian escalation, the central fork, and the three outcomes. The Gallax branch (outcome B) is **already built** (Part C, `@gate_opened`); it's included here only as the branch endpoint.

---

## 0. The one big thing to decide first

**The Staal path currently tells the opposite of the reunification canon.** As written, Staal consolidates power by devouring every party into the **GNU** (Grand National Union), co-opts the Marchers via the `staal_marcher_influence` track, and the "win" lands on **`@dnef_win` "The Perfect Dictatorship"** — a *domestic, independent, belligerent* corporatist great power that throws off Etaluxia, rearms, and is drawn into a multipolar **war against its neighbors**. The Axton Empire and reunification appear **nowhere** in it.

The canon wants the GNU to be a **reunification-negotiation vehicle**: Staal consolidates the realm *so it can return to the Empire as a realm, not a prize*. So the reframe is a **purpose-swap**, not a tint:

| | Current meaning | Reframed meaning (canon) |
|---|---|---|
| **Why build the GNU?** | Forge an independent authoritarian great power | Unify/order the realm to negotiate a *dignified* reunification with Empress Jacqueline |
| **Rearmament / "great power"** | Aimed at neighbors (revanchism) | Leverage at the bargaining table + the price the Empire pays (re-militarizes vs. Ethia) |
| **The GNU "win" (`hammerstein_win`)** | `@dnef_win` domestic dictatorship → multipolar war | **Redirect → `@reunification`** (the reserved hook from Part C: `empire_outcome="reunification"`) |

**★ DECISION 1 — what happens to `@dnef_win`?** (see §5). Options: **(a)** repurpose it *as* the reunification ending (rewrite its future-history); **(b)** redirect `hammerstein_win` to the existing `@reunification` slide and retire `@dnef_win`; **(c)** keep `@dnef_win` as a distinct "Staal stayed independent" outcome *and* add reunification as a separate fork (breaks the 3-outcome canon — 4 outcomes). My lean: **(a)** — least plumbing, the GNU build-up already reads as consolidation; we re-point the *ending* it pays off into. ✎ ______

---

## 1. Canon recap (do not re-litigate — from `just-did-an-audit-harmonic-graham.md`)

- **The arc:** DuFour loses faith in parliament → believes reunification with the **Axton Empire** is inevitable/preferable → the Convention → **Staal** appointed to negotiate a "dignified" return (order, strength, blame the Collectivists, prevent civil war).
- **Three outcomes:**
  - **A — Staal wins** → negotiated **fair reunification** (decent terms, amnesty, **Marchers spared, Collectivists exiled, Assembly → rump advisory**, Empire re-militarizes vs. Ethia). → should land on **`@reunification`**.
  - **B — Staal rejects the "Frick" equivalent** → DuFour appoints **Gallax** → civil war or bad-terms submission. → **`@gate_opened`** (BUILT, Part C).
  - **C — Staal accepts but the Marchers resist** → Staal falls ill → **Godwin Trevannon** caretaker → **DuFour resigns** (the "1934" beat). → reunification **averted**; republic limps on.
- **Empress Jacqueline Scilos** = sole Axton monarch; **gender-progressive Empire** (a pull-factor — many women / reform-minded parties favor return; Unionists/Traditionalists/many Golds tepid-to-hostile).
- **DuFour** = clear-eyed, not delusional (per the Part C revision — he *knows* he's trading the realm away).

---

## 2. Branch map (the skeleton)

```
rubicon_crossed (Convention; DuFour's choice)
   └─ Goodryke caretaker → papen_cabinet_11 → chancellor = "Staal"
        │
        ▼
   STAAL GOVERNS  (schleicher_1–7 courtship; schleicher_8 = GNU founded)
        │  builds the GNU by absorbing parties (schleicher_10–17)
        │  + co-opts the Marchers via staal_marcher_influence (6 / 8 / 10)
        │  + authoritarian escalation (cabinet_12 Collectivist ban, 14/15/16)
        │
        ├─► [B]  staal_explode (schleicher_cabinet_4/5/6) → nazi_12–17 / hitler_cabinet_1
        │         → Gallax → @gate_opened   ★ BUILT (Part C)
        │
        ├─► FORK at schleicher_cabinet_13 (@schemes sets staal_pause)
        │         │
        │         ├─ staal_pause = 0 (default) ─► [A] cabinet_18 (Staal ill)
        │         │      → cabinet_19 (Goodlake/Bredon successor) → cabinet_20 (GNU stability)
        │         │      → schleicher_21 (influence ≥10 → hammerstein_win) → @dnef_win
        │         │      ★ REWIRE → @reunification
        │         │
        │         └─ staal_pause = 1 ─────────► [C] cabinet_19_alt (Staal resigns)
        │                → chancellor = "Trevannon" → cabinet_20_alt (GNU dissolves)
        │                → cabinet_21_alt / 22_alt (1933) / 22_alt2 (1934)
        │                → Collectivists un-banned, DuFour recall/resign → republic endures
        │                ★ frame as reunification AVERTED
```

---

## 3. Event list — Phase by phase

Columns: **Scene** · **What it does (mechanics)** · **Current framing → Reunification beat it SHOULD carry** · **✎**

### Phase 0 — Setup: DuFour's motive + Staal's courtship
| Scene                                            | What it does                                                                                                  | Current → Should carry                                                                        | ✎User Notes                                                                                                                                                                                                                              |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `rubicon_crossed`                                | Convention begins; `rubicon=1`. **Already reskinned + Part B.**                                               | Convention/Empire framing present → REUSE; ensure it plants "Staal will negotiate the return" |                                                                                                                                                                                                                                          |
| `papen_cabinet_11`                               | Goodryke resigns → `chancellor="Staal"`. **Part B done.**                                                     | "reach for the soldier" → add: the soldier's job is *the Empire question*                     |                                                                                                                                                                                                                                          |
| `schleicher_1`                                   | `red_general_unlock`; Army–Royalist secret meeting surfaces.                                                  | Staal as schemer → seed: he's already thinking reunification/order                            |                                                                                                                                                                                                                                          |
| `schleicher_2` / `schleicher_4`                  | Youth Corps; Banners militarization (`staal_marcher_support`).                                                | Militarization for its own sake → "strength to bargain, not to conquer"                       |                                                                                                                                                                                                                                          |
| `schleicher_3` / `schleicher_5` / `schleicher_7` | Staal courts the Free Guilds; promises public works, to rescind decrees; seeks election-postponement backing. | Domestic deal-making → his pitch: order now buys *terms* later                                | Staal will say given the Commonwealth Convention being called, he desires election postponement backing in order to give the state a chance to breath and stabilize things, Staal promises to step down once the Commonwealth is stable. |
| `schleicher_6`                                   | Bristol meets Staal; Staal refuses an anti-Royalist crusade.                                                  | Staal non-committal → he won't fight the return                                               | Make it clear that Staal is not just scheming around wargames, Staal genuinely hates the idea of a civil war, he would only consider it if he thinks a Collectivist uprising is coming (it's not)                                        |

### Phase 1 — The GNU as the reunification vehicle  ★ the heart of the reframe
| Scene                                       | What it does                                                                                        | Current → Should carry                                                                                   | ✎User Notes                                                                                                                                                                                                                                                                                             |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `schleicher_8` → `dnef_formed`              | **`gnu_formed=1`**, `chancellor_party="GNU"`. Founds the GNU as a supra-party mass movement.        | "rise above partisan divides" → **THE pivot**: the GNU exists to present a *united realm* to the Empress | When Staal forms the GNU, he says it's meant again for just stability, the Commonwealth is too weak right now, poverty too rampant, and foreign threats too great. He keeps the wording ambiguous, he wants to use the taming strategy on Royalists so he mostly frames this with no specifying things. |
| `schleicher_cabinet_5_alt` / `8_alt` / `9`  | Public works + 8-hr day + welfare → popularity, `staal_marcher_influence`.                          | Domestic miracle → the order/prosperity that makes reunification palatable                               |                                                                                                                                                                                                                                                                                                         |
| `schleicher_10–14`                          | Golds, **CPP** (`kvp_leader="Trevannon"`), Unionists, DDP(→CSP), Traditionalists absorbed into GNU. | Party cannibalism → assembling the "one realm, one voice" that can treat with Axton                      | These events read as Staal emphasizing that he is running a national movement, he is not ending the parties but he is bringing the country together in a time of struggle.                                                                                                                              |
| `schleicher_15` / `schleicher_16` (cabinet) | Loyalists (NPF) + industrialists fold in; `army_loyalty`, funding.                                  | Power-grab → binding the old Royalist/Loyalist right *into* the reunion bloc                             |                                                                                                                                                                                                                                                                                                         |
| `schleicher_23`                             | **Social Patriotism** faction (Ardwin); `staal_marcher_influence ±1`.                               | "worker-nation reconciliation" → the *ideology* of return: the nation reunited under the Crown           |                                                                                                                                                                                                                                                                                                         |
| `schleicher_influence_unlock`               | Awareness alert at influence ≥2.                                                                    | "Staal is consolidating" → frame as the Marchers realizing where the GNU leads (the Empire)              | The Marchers are getting too involved, they realize that Staal's power consolidation is likely going to indeed lead to the Empire, and Staal isn't championing democracy he's mostly making the country as materially and militarily powerful as he can, he's preparing for reunification.              |

### Phase 2 — Authoritarian escalation + the Marcher-influence track
| Scene                                     | What it does                                                                                    | Current → Should carry                                                                                                   | ✎User Notes                                                                                                                                                                                                                                                                                                                                     |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `schleicher_9`                            | Election rigging (`staal_rig`); expose vs. deny (influence ±).                                  | Domestic fraud → managing the realm toward the settlement                                                                |                                                                                                                                                                                                                                                                                                                                                 |
| `schleicher_cabinet_12/12_alt`            | **Collectivists banned** (`collectivist_explode`). The canon's "blame/exile the Collectivists." | Domestic purge → **canon beat**: Collectivists are the price/scapegoat of the fair-terms deal (they flee into exile)     |                                                                                                                                                                                                                                                                                                                                                 |
| `schleicher_cabinet_14/15/16`             | Press censorship; secret police; Banners banned.                                                | Authoritarian peak → the cost of "order"; the Marchers' shrinking room                                                   |                                                                                                                                                                                                                                                                                                                                                 |
| `schleicher_18/19`                        | Labor front (**CLF**); Greater Worker's Guild absorbed; influence 6/8 gates.                    | State-corporatist labor → labor folded into the national-community-that-returns                                          |                                                                                                                                                                                                                                                                                                                                                 |
| `schleicher_20` (numbered)                | Wardens integrated into Army.                                                                   | —                                                                                                                        |                                                                                                                                                                                                                                                                                                                                                 |
| `schleicher_cabinet_22` / `schleicher_22` | CSG breaks with Staal (used up).                                                                | —                                                                                                                        |                                                                                                                                                                                                                                                                                                                                                 |
| **`schleicher_21`**                       | **influence ≥10 → `marcher_gnu=1`, `hammerstein_win=1`** → ends questline.                      | "Marchers Slip Away" (absorbed) → the Marchers' autonomy is gone; the realm speaks with one voice → the reunion proceeds | Make it note that the Marchers have joined formally, Staal does not keep them in a national opposition he has no issue with the Marchers joining directly. A few Marchers are appointed to some middling-level ministries to legitimize this partnership and are encouraged to take national leadership from their democratically-minded peers. |

### Phase 3 — The fork
| Scene | What it does | Current → Should carry | ✎ |
|---|---|---|---|
| **`schleicher_cabinet_13`** (`@schemes`) | Post-Collectivist-ban negotiation. `@schemes` → **`staal_pause=1`** (locks Collectivists un-banned, unlocks path C). Other choices (`@reichstag_reconvene`/`@rights`) = lesser concessions. | "Staal's Turn to Play" → **the decision point**: accept the settlement (A) vs. resist it into collapse (C) | |

### Phase 4A — Staal wins → fair reunification  ★ rewire to `@reunification`
| Scene | What it does | Current → Should carry | ✎ |
|---|---|---|---|
| `schleicher_cabinet_18` | `year≥1934` → Staal's health fails (`staal_dead`); names successor. | Tragic-pragmatist exit → he dies having secured the terms | |
| `schleicher_cabinet_19` | `chancellor="Goodlake"` (nationalist) or `"Bredon"` (military) per `nationalists_staal`. | Succession → the successor signs/ratifies the reunification | |
| `schleicher_cabinet_20` | GNU stability check (`gnu_collapse_points`) → survive/split/collapse. | Will the bloc hold? → does the reunion hold together | |
| **endpoint** `schleicher_21` / election → `hammerstein_win` → **`@dnef_win`** | The GNU/Hammerton victory. | **REWIRE**: `empire_outcome="reunification"` → `@reunification` (Assembly→rump, Marchers spared, Collectivists exiled, Empire re-militarizes vs Ethia). | |

### Phase 4B — Staal rejects → Gallax  ★ BUILT (Part C)
| Scene | What it does | ✎ |
|---|---|---|
| `schleicher_cabinet_4/5/6` (`staal_explode`) → `nazi_12–17` / `hitler_chancellor` / `hitler_cabinet_1` → `@gate_opened` | The forced/violent submission. Already carries the Empire linkage + `gallax_empire_end`. | Confirm the hand-off reads as "Staal's negotiated path *failed*, so DuFour reached for the man who'd do it by force." | |

### Phase 4C — Marchers resist → Trevannon → DuFour resigns  ★ frame as reunification AVERTED
| Scene | What it does | Current → Should carry | ✎ |
|---|---|---|---|
| `schleicher_cabinet_19_alt` | `staal_pause` → Staal resigns; Kuno Westmore → **`chancellor="Trevannon"`** caretaker. | Caretaker installed → the settlement loses its strongman | |
| `schleicher_cabinet_20_alt` | GNU dissolves (`gnu_formed=0`); parties re-independent; `pro_republic+=15`. | GNU falls apart → the one-voice realm fractures → no partner to reunify | |
| `schleicher_cabinet_21_alt` / `22_alt` (1933) / `22_alt2` (1934) | Trevannon coalition; Collectivists **un-banned**; DuFour recall/impeach; `dufour_explode`. | Parliamentary return → **the reunion is called off**; the republic endures, diminished, DuFour gone | |
| **endpoint** | Republic survives → a `weimar_win`-family ending. | Confirm it lands on `@weimar_win` ("Unity Republic limps forward") with reunification-averted framing, NOT a triumph. | |

---

## 4. Threads / mechanics that may need touching (not just prose)

- **`hammerstein_win` → ending redirect** (DECISION 1). The reserved hook is at `ending_slides.scene.dry:51-80` ("RESERVED (Staal-aware)… `empire_outcome="reunification"`"). The current gate `@dnef_win: view-if hammerstein_win and not civil_war_seen` and `@reunification: view-if empire_outcome=="reunification"` (currently inside `if(weimar_win)` only). Rewiring means: compute `empire_outcome="reunification"` for the Staal win **and** loosen `@reunification`'s gate so it fires when `chancellor`/`president` is the GNU (not `weimar_win`). ✎ ______
- **`@dnef_win` content** — multipolar-war/independent-power future-history contradicts reunification. Rewrite or retire (DECISION 1). ✎ ______
- **`@spd_victorious_2`** (`game_over`, `staal_marcher and wtb_implemented`) — "Marchers cut a deal with Staal, abandoned pacifism." Reframe as accepting the reunification bargain. ✎ ______
- **Outcome C ending** — confirm/route to `@weimar_win` with "reunification averted" framing. Does C deserve its **own** short slide (the realm that *refused* the Crown)? ✎ ______
- **`staal_marcher_concession ≥ 2`** achievement (`abgrundlaufer`, "Abyss Runner") — already themed as compromising with Staal; re-tint to the reunification bargain. ✎ ______
- **Gender-equality thread** — where to surface it as a *pull* toward reunification (the Empire empowers women; the left/women weigh the return). Phase-1 GNU scenes? The `@reunification` payoff? ✎ 
	- Largely ignore this. The gender-equality thread is more of a broad note.

---

## 5. Endings touched — summary

| Ending | Current trigger | Current meaning | Reframe |
|---|---|---|---|
| `@dnef_win` "The Perfect Dictatorship" | `hammerstein_win and not civil_war_seen` | Independent GNU dictatorship → multipolar war | **→ becomes / redirects to reunification** (DECISION 1) |
| `@reunification` "The Reunion" | `empire_outcome=="reunification"` (weimar_win only) | Upright treaty return — *already written, in-voice* | Wire the Staal win into it; loosen the gate | |
| `@gate_opened` "The Gate Opened" | `empire_outcome=="submission"` | Forced/violent submission (Gallax) | DONE (Part C) — outcome B | |
| `@weimar_win` "Unity Republic Limps Forward" | `weimar_win`, no civil war | Republic endures | Outcome C lands here (reunification averted) | |
| `@spd_victorious_2` | `staal_marcher and wtb_implemented` | Marchers deal with Staal | Re-tint to the reunification bargain | |

---

## 6. Variable glossary (the levers)

| Var                                                                                   | Meaning                                                                      | Key set / read                                                                                                                          |
| ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `staal_time`                                                                          | Staal chancellorship phase                                                   | set `papen_cabinet_11:70` (=0); gates most `schleicher_*`                                                                               |
| `staal_marcher_influence`                                                             | Staal's penetration of the Marchers (0–10+)                                  | thresholds **6** (loses negotiating room), **8** (CLF forced submission, `schleicher_19`), **10** (`schleicher_21` → `hammerstein_win`) |
| `staal_explode`                                                                       | Staal's govt in crisis → the Gallax cascade                                  | set `schleicher_reichstag_3:52`; read `nazi_12–17:3` (→ outcome B)                                                                      |
| `staal_pause`                                                                         | Settlement blocked → path C                                                  | set **`schleicher_cabinet_13:423`** (`@schemes`); read `schleicher_cabinet_19_alt`/`19`                                                 |
| `gnu_formed`                                                                          | GNU exists                                                                   | set `dnef_formed` / `schleicher_8`; gates Phase-1/2                                                                                     |
| `hammerstein_win`                                                                     | GNU/Hammerton victory                                                        | set `schleicher_21:10`; read `@dnef_win` (← rewire target)                                                                              |
| `marcher_gnu`                                                                         | Marchers absorbed into GNU                                                   | set `schleicher_21:9`                                                                                                                   |
| `staal_marcher_concession`                                                            | major concessions to Staal                                                   | `+=` in `election_1928`; read `game_over` (`abgrundlaufer`)                                                                             |
| `commons_staal` / `nationalists_staal` / `industrialists_staal` / `republicans_staal` | class/faction support for Staal → gates mergers + successor choice           | `post_event` calc; gate `schleicher_11–16`, `cabinet_19`                                                                                |
| `chancellor` values                                                                   | `"Staal"` → `"Goodlake"`/`"Bredon"` (A) · `"Trevannon"` (C) · `"Gallax"` (B) | `cabinet_19` / `19_alt` / `nazi_17`                                                                                                     |

---

## 7. Open questions (mark up before build)

1. **DECISION 1 (the big one):** `@dnef_win` → repurpose as reunification / redirect to `@reunification` & retire / keep as a 4th independent-dictatorship outcome? (§0, §5)
	1. DNEF/Hammerstein wins ending should be rewired. Normally in Red Autumn, if Schleicher is in power and the DNEF are going for presidential elections after Hindenburg's death, Hammerstein can win and create the Perfect Dictatorship ending. What we should do is it if hits 1934 and the 'DuFour retires' window hits (which substitutes Hindenburg's natural death) we should have DuFour announce his support for the GNU in the next election, then he retires after the elections. It should have a note that Staal is annoyed at DuFour's premature retirement, viewing it is sacrificing the nation for his individual familial concerns, and that DuFour risks allowing a democratic party to win. DuFour seems to be doing this partially as a plebiscite to see if Staal's path is truly what the people 'want' as at that point Staal has had adequate time to try to build a national consensus, if a democratic party wins then Staal genuinely lacks a mandate. That said, it should route to the Reunion ending, as indeed if Staal and the GNU win the presidency, then we should see the Commonwealth enter the Empire under fair terms, as Staal genuinely has strengthened the Commonwealth at the cost of political repression and neutering democracy. 
2. **Staal's ideology — one umbrella name?** "Social Patriotism" / "national community" / corporatism are scattered. Coin one (e.g. "Commonwealth Solidarism", "the Unity Movement") or keep separate? 
	1. "Commonwealth Solidarism" is a good name for it. Staal has little actual ideology, he tries to avoid particularly divisive politics while consolidating power. 
3. **Gender thread — where + how heavy?** A pull-factor toward reunification (Empire empowers women); reversal on the Gallax branch? Which scenes carry it?
	1. There shouldn't be that much, it should actually be more in the earlier cards around gender equality, where it is noted that the Marchers would find support from the royalists in pushing for gender equality. In the Staal and Gallax routes, it is noted that many women seem more comfortable with the idea of a stable Imperial government than a more reactionary feudal one that someone like Trevannon would bring.
4. **"Fair reunification" terms — confirm/extend** the package (decent terms, amnesty, Marchers spared, Collectivists exiled, Assembly→rump, Empire re-militarizes vs Ethia). Add the Faithful's status? the magi / beast-blooded? the *imported* gender reforms as a named term?
	1. The Faithful largely just see the God of Magic made as a the most important god, there is no political repression. The Magi are largely happy as any who swear loyalty to the Empire find themselves rapidly elevated in social status. The beast-blooded are allowed to sell their lands or homes, then leave in exile after a few months.
5. **DuFour's tone** in the Staal scenes — principled-tragic vs cynical-defeatist? (Part C settled on clear-eyed realist — keep consistent.)
		1. Clear-eyed realistic. DuFour appoints Staal as the man most likely to stabilize the Commonwealth long enough and in a way that transcends party politics and will bring about the best possible terms for annexation into the Axton Empire. He isn't that wrong, at that low stability that DuFour crosses the Rubicon, it is likely that Staal actually is the best option for Imperial annexation as he isn't the sort of 'mindless loyalist' that Gallax is towards the Empire. Staal sees the Empire as the best option at that point, but Staal does not want bad terms, he wants to strengthen the Commonwealth quickly and legitimize himself so that the Commonwealth can go out 'gracefully'. It should be noted that Staal and DuFour are more concerned with the people, they have both lost faith in popular democracy but they very much do not want to see their own people killed or senselessly surrendered. The Staal 'victorious' ending is definitely not a 'horrible' ending but it does neuter democracy.
6. **Staal's tone/fate** — how sympathetic is the tragic pragmatist? And **Goodryke's** role (schemer who brings Staal in, then undermines him toward Gallax).
	1. Staal is more of a pragmatist, he isn't that sympathetic in that Staal genuinely does not particularly care for democracy, he is somewhat loathe to involve himself until he thinks it necessary. Staal's lack of any parliamentary loyalties or convictions is what allows him to start building a big tent. Staal isn't necessary some terrible villain though, he hates the Collectivists as he views them as dangerous, misguided radicals who are going to doom the Commonwealth's people, but he is willing to work with Marchers.
7. **Outcome C** — does "reunification averted" get its own ending slide, or fold into `@weimar_win`? Is C a *good* ending (republic saved) or bittersweet (saved but leaderless, Depression grinds on)?
	1. Let's make it similar to the Weimar Republic Limps On ending, but make it clear that with DuFour retired post-Commonwealth Convention and inviting in generals to rule that a dangerous precedence has been set, the Empire-in-Exile is likely to prey on their next instance of weakness, and the Commonwealth is still not stable. It should be clear that the future is ambiguous, and while democracy has survived this potential catastrophe, it will take hard work to get it stable enough to survive the next crisis. Remember when drafting these ending slides, they should be devoid of most flowery language, it is largely factual and without any especially charged language or poetic prose, it reads like a textbook. 
8. **Coherence check** — the reframed spine must tell ONE story with the Convention trigger, the Part-C Gallax branch (`@gate_opened`), and the existing `@reunification`/`empire_outcome` machinery. Any contradictions to flag?
	1. the Von Papen route (which leads to a monarchy in Red Autumn SPD, it's called the Imperfect Dictatorship where Papen gets Crown Prince Wilhelm crowned) is largely gone. I don't think this raises issues, but let me know if it's showing up. Also ensure that the options for the Marchers to begin a civil war to prevent either Staal or Gallax from winning is an option. Staal when he tries to bans the Collectivists can trigger a civil war, and Gallax preparing to open the gates by being named Chancellor can allow the Marchers to also start a civil war to try to save the Commonwealth. In those cases, as with regular Red Autumn SPD, it's possible to get the Golds (who are likelier to support the Marchers) and Unionists (less likely, still possible) to support them. The Unionists are the group that Staal really wants to try to sway, so as with regular red autumn SPD if the Unionists join the GNU then the Marchers are in trouble.

---

*Build note (for execution): D3 must ADD prose to existing scenes and only rewire the ending payoff — never alter branch logic / `staal_*` vars (all three outcomes must stay reachable). LF-only; commit `B-D3c…`. See `commonwealth-second-pass-status` memory + the plan file `just-did-an-audit-harmonic-graham.md`.*
