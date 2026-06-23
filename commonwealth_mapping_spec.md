# End of Autumn: The Commonwealth — Port Mapping Spec & Build Contract

*Working title: **\[End of Autumn: The Commonwealth\]** — your call. Placeholders below: "the Commonwealth."*

A fork of **Dynamic Social Democracy** (Autumn Chen, modded by originn0) on **dendrynexus**, re-skinned from the Weimar Republic to the post-imperial Commonwealth of Athar. This document is the contract the Phase-1 port is built against. Status tags: **\[confirmed\]**, **\[stub — rename freely\]**, **\[deferred — later pass\]**.

---

## 0\. Architecture decision (locked)

**Rename the internal namespace early, as a scripted \+ build-verified pass, before adding Commonwealth systems.** One namespace for engine *and* content; display labels layered on top of the renamed base. The build runs in-environment, so each step is verified by rebuild \+ clean token-diff of `game.json`.

**Phase plan**

- **Phase 0 — Toolchain & rename.** (a) Confirm build \[done\]. (b) Apply the component-wise identifier rename \+ string-literal pass below. (c) Verify: rebuild succeeds and `game.json` differs only by expected tokens.  
- **Phase 1 — Content swap.** Display labels, scene text, portraits, party/figure names. Mechanics untouched. Game plays start-to-finish in Commonwealth dress.  
- **Phase 2 — Crisis reskin.** Black Thursday → Veran Crash (turn 22), \+ paralysis interstitial (turn 23), \+ Ivion security shock (turn 24).  
- **Phase 3+ — Divergent systems**, in dependency order: master metrics → military balance & army loyalty → magi axis (`magi_balance`) → Empire-faction lever (Foreign Ministry) → the Convention endgame & outcome matrix.

---

## 1\. Variable rename rules (the engineering core)

Identifiers are **structured**: `{bloc}_{party}[_form]` (forms: raw, `_display`, `_normalized`). The rename script **splits on `_` and maps known components**, leaving unknowns intact. **Never** do a blind global string-replace — single-letter and overlapping tokens (`z`, `dvp`/`ddp`) would corrupt unrelated identifiers.

### Party tokens

| Base | → New | Note |
| :---- | :---- | :---- |
| `spd` | `marcher` | player party |
| `kpd` | `collectivist` |  |
| `nsdap` | `royalist` |  |
| `dnvp` | `traditionalist` |  |
| `dvp` | `gold` | clean rename |
| `ddp` | `gold` | **MERGE, not rename** — see ⚠️ below |
| `z` | `unionist` | ⚠️ single letter; component-wise only |
| `cvp` | `concord` | the moderated-Restorationist successor |
| `dnef` | `gnu` | Staal's surrender bloc (endgame) |
| `other` | `other` | keep (catch-all) |
| `lvp` | — | **cut**; leave variables inert |
| `kvp`, `dnf` | — | **deferred** splinters; leave inert for now |

⚠️ **DVP+DDP → Golds is a merge.** Renaming both to `gold` collides (`new_middle_dvp` and `new_middle_ddp` would both become `new_middle_gold`). Safe handling for v1: rename `dvp`→`gold`; keep `ddp` as a distinct *internal* token that **displays** as "Golds" and is **summed** in seat/vote totals. (DDP is already near-defunct in the base, so this is light.) Revisit a true data-merge in a later pass.

### Bloc tokens

| Base | → New |
| :---- | :---- |
| `workers` | `commons` |
| `catholics` | `faithful` |
| `new_middle` | `burgher` |
| `old_middle` | `guild` |
| `rural` | `landed` |
| `unemployed` | `disfavored` |

### Standalone flags / prefixes

| Base | → New |
| :---- | :---- |
| `black_thursday*` | `veran_crash*` |
| `nazi_*` (`nazi_funds`, `nazi_urgency`) | `royalist_*` |
| `prussia_*` (incl. `prussia_leader`, `prussia_coup_win/lose`) | `heartland_*` |
| `schleicher_*` | `staal_*` |
| `hindenburg_*` | `dufour_*` |
| `hindenburg_hitler` | `dufour_gallax` |
| `cvp_dnvp_balance` | `concord_traditionalist_balance` |
| `reichsbanner*` | `banner*` |
| `neorevisionist_strength` | `knight_strength` |

`magi_balance` is a **new** variable cloned from the `concord_traditionalist_balance` pattern — not a rename. `loyalty` (army loyalty) may stay as-is or → `army_loyalty`; pick one and be consistent.

### String-literal VALUES (separate lockstep pass)

Quoted values scattered through conditions/assignments must change wherever **set or checked**: `"SPD"`→`"Marcher"`, `"KPD"`→`"Collectivist"`, `"NSDAP"`→`"Royalist"`, `"DNVP"`→`"Traditionalist"`, `"DVP"`/`"DDP"`→`"Gold"`, `"Z"`→`"Unionist"`, `"Braun"`→`"Bristol"`, `"Rosenfeld"`→`"Pendrigon"` **\[stub\]**, plus any party-name display strings.

---

## 2\. Parties

| Code party | → Commonwealth | Movement | Status |
| :---- | :---- | :---- | :---- |
| SPD | **Marchers** | Reformist Block | \[confirmed\] |
| (neorevisionism faction) | **Knights** (tendency, not a seat party) | Reformist Block | \[confirmed\] |
| DVP \+ DDP | **Golds** | Unity Front | \[confirmed\] |
| Z | **Unionists** | Unity Front | \[confirmed\] |
| BVP | **Arcanists/Eternals** (minor mage-circle party) | Restorationist | confirm |
| CVP | **the Concord** (moderated Restorationists; reconciliation path) | Restorationist→ | \[stub\] |
| DNVP | **Traditionalists** | Restorationist | \[confirmed\] |
| NSDAP | **Royalists** | Restorationist | \[confirmed\] |
| KPD | **Collectivists** | Collectivist | \[confirmed\] |
| DNEF | **GNU bloc** (Staal's Govt. of National Salvation, endgame) | — | \[confirmed\] |
| KVP / DNF | hardliner / reversed splinters | — | \[deferred\] |
| LVP | — | — | cut |

**Movements** (coalition-logic grouping): Reformist Block (Marchers, Knights) and Unity Front (Golds, Unionists) want the Republic to endure; Restorationists (Arcanists/Eternals, Concord, Traditionalists, Royalists) and Collectivists want it to fall.

---

## 3\. Voter blocs

| Code | → Commonwealth | Start share | Notes |
| :---- | :---- | :---- | :---- |
| workers | **the Commons** | \~40–50% | hit hardest by crisis; first to become Disfavored |
| new\_middle | **the Burghers** | \~10–15% | base for centrist liberalism (Golds) |
| catholics | **the Faithful** | \~20–30% | wary of the God-of-Magic cult; Unionists→Golds, but reachable |
| rural | **the Landed** | \~20–30% | nobility \+ large farmers; Traditionalist base |
| old\_middle | **the Guilds** | \~10–15% | craft/armament houses; pro-order, drift Restorationist as things worsen |
| unemployed | **the Disfavored** | \~5% → 15–25% | impoverished \+ distrusted magi caste; explodes after the crash |

---

## 4\. Ministries (7; one merge)

| Commonwealth ministry | Base flag(s) | Note |
| :---- | :---- | :---- |
| **Economic** | `labor_minister` \+ economics gating | **merged**: one flag unlocks both labor *and* economic card sets |
| **Treasury** | `finance_minister` | rename |
| **Justice** | `justice_minister` |  |
| **Interior** | `interior_minister` |  |
| **War** | (held by General Staff) | costs more to obtain; defense-spending cards available even when GS holds it |
| **Foreign** | `foreign_minister` | the Empire-moderation lever (see §9) |
| **Rural** | `agriculture_minister` | rename |

---

## 5\. Key figures

| Weimar | → Commonwealth | Role / variable home |
| :---- | :---- | :---- |
| Hindenburg | **President DuFour** | head of state; `dufour_*` attitude trackers |
| Wilhelm Marx | **Chancellor Vance** | Unionist; starting chancellor, falls early (reskinned as a budget/tax crisis) |
| Hermann Müller | **Felicity Sarrow** | first Marcher PM; ails \~¾ through |
| Brüning | **Askew** | Unionist |
| Papen | **Goodryke** | Unionist; enacts the Seizure of the Heartland |
| Schleicher | **General Staal** | coup-prone GS; the GNU/surrender endgame; `staal_*` |
| Otto Braun | **Lyle Bristol** | Steward of the Heartland; `"Braun"`→`"Bristol"` |
| Rosenfeld (left alt) | **Pendrigon** \[stub\] | left-Marcher Heartland premier alt |
| Hitler | **Gallax** | Royalist PM/President candidate — charismatic, **less deranged**, not a pure villain |
| Thälmann | **Halsmark** | Collectivist leader; tightly controls the party |
| (conciliators) | **Falconne** | can oust Halsmark if Collectivists moderate late |
| Mierendorff | **Marrow** | Knights/neorevisionism figurehead |
| Groener (GS as War Min.) | **Ravabelle** | opportunist GS; usually becomes War Minister |
| (loyal general) | **Wright** | loyalist GS |

The world's backstory figures have **no** Weimar analogue: **Reikzar Scilos** (dead God-Emperor, ascended God of Magic) and **Empress Jacqueline Scilos** (moderate Empire-in-Exile ruler, favors crowned-constituent-realm reunification).

---

## 6\. The Heartland (the Prussia subsystem)

Prussia was the SPD "red bulwark" — its largest, continuously-governed state, with its own police and the target of Papen's 1932 coup. It's a **heavyweight subsystem** (`prussia_leader` alone has 400+ references), so we **reflavor wholesale, not stub**.

- **The Heartland** — the Marchers' dominant home province in the old imperial core; absorbs the lore place-names (Exetar as its large secondary city, plus High Cross, Hollyhead, Ilot, etc.).  
- **Steward of the Heartland** — premier title; **Lyle Bristol** holds it (Braun); **Pendrigon** \[stub\] is the left-Marcher alternative.  
- **The Seizure of the Heartland** (`prussian_coup` → `heartland_coup`) — a presidential/emergency seizure stripping the Marchers of their bulwark. **Major beat on the runway to the Convention.**

---

## 7\. Paramilitaries (stubs — rename freely)

| Weimar | → Commonwealth | Affiliation |
| :---- | :---- | :---- |
| Reichsbanner | **the Banners** | republican / Marcher \[confirmed\] |
| Iron Front | **the Iron Banner** | broad anti-Royalist united front \[confirmed\] |
| SA | **the Loyalists** | Royalist street force \[confirmed\] |
| Rotfront (RFB) | **the Vanguard** \[stub\] | Collectivist |
| Stahlhelm | **the Wardens** \[stub\] | Traditionalist veterans |

**Streetfighting** stays the existing mechanic. Per design: keeping the streets from tilting to the Restorationists (Banners/Iron Banner vs Crownsworn) is one of the two pillars warding off invasion.

---

## 8\. Currency & calendar

- **Currency:** Mark → **Gold**. (Reichsmark/Goldmark → just "Gold.")  
- **Calendar:** numeric `month`/`year` unchanged; only display labels change. Start **Year 4293** (= 1928). Span inherits the base (\~6.5 years, to \~Cinder 4299 \= the DuFour's-death endgame window).

| \# | Real | Commonwealth |
| :---- | :---- | :---- |
| 1 | Jan | Frostpoint |
| 2 | Feb | Deepsnow |
| 3 | Mar | Winterwane |
| 4 | Apr | Rainage |
| 5 | May | Whitesun |
| 6 | Jun | Highsun |
| 7 | Jul | Firereign |
| 8 | Aug | Cinder |
| 9 | Sep | Summerwane |
| 10 | Oct | Redfall |
| 11 | Nov | Snowmoot |
| 12 | Dec | Lowmoon |

---

## 9\. The magi & races axis (civil-rights cluster reflavor)

| Base card | → Commonwealth | Type |
| :---- | :---- | :---- |
| `womens_rights` | **Women's Rights** (kept) | progressive social reform |
| `labor_rights` | **Guild/Labor Rights** (reflavored, renaissance idiom) | progressive social reform |
| `homosexual_rights` | **Magi Civil Rights** | proactive — **polarity inverted** ⚠️ |
| `response_to_antisemitism` | **Defense of the Monstrous Races** | reactive (orcs/goblins fear Restoration stripping citizenship) |

⚠️ **Magi Civil Rights is not a cosmetic reskin.** Granting magi rights **pleases the Restorationists** (Arcanists/Eternals/magi are their constituency — and it pulls them "off the ledge," de-radicalizing toward the Concord) while **infuriating the order-loving centrist coalition** (Unity Front / Faithful). When porting, **rewrite the card's faction-relation effects to invert direction.**

**New variable:** `magi_balance`, cloned from the `concord_traditionalist_balance` pattern — rights push magi toward the republic; persecution pushes them toward Restoration.

---

## 10\. The crisis timeline (Phase 2\)

A two-stage pivot — the crash makes people *poor*; Ivion makes them *afraid*:

- **Turn 22 (Redfall 4294\) — the Veran Market Crash.** Reskin of `black_thursday` **verbatim mechanically** (sets `veran_crash_seen`; bloc-shifts toward Collectivists/Royalists; hits budget, inflation, growth, unemployment).  
- **Turn 23 (Snowmoot 4294\) — Paralysis.** New set event: economy paralyzed, urgent action needed to avert catastrophe.  
- **Turn 24 (Lowmoon 4294\) — The Fall of Ivion.** New **security** shock (distinct dials from the crash): hits `army_loyalty`, military balance, `royalist_funds`, and Faithful fear. The Empire is awake again.

---

## 11\. The endgame: the Convention

- **The Commonwealth Convention** \= reflavored Rubicon (`rubicon_filler` / `constitutional_reform`). **Trigger:** late game **and** extremists strong **and** DuFour reelected **and** DuFour has lost confidence in the centrist/reformer parties **and** war seen as likely.  
- **Staal's GNU** \= the `schleicher_10`…`schleicher_20+` arc \+ the DNEF bloc — an emergency head of government building parliamentary support to **surrender**. Staal wants to avoid civil war at all costs, plays every side, but lacks DuFour's full ear.  
- **Outcome matrix** (resolved by stability \+ military balance \+ army loyalty \+ paramilitary strength/loyalty \+ Empire-faction balance \+ reunification-support among parties):  
  - **Deter → Cold War.** High stability \+ strong/loyal military \+ extremists weak \+ reunification unsupported. The Empire eventually accepts coexistence.  
  - **Reunification (peaceful).** High stability \+ enough parties support reunification (Empire moderated via Foreign-Ministry events \+ a moderated Concord / less-radical reformer-mercantile parties).  
  - **Provoke → War.** Resolved by military+loyalty+paramilitary: **repel** (an "ok" ending that dooms the Restorationists) / **bloody stalemate** / **conquest** (democracy ends). If military *and* stability are both high enough, the Empire simply never invades → Cold War.

---

## 12\. The Empire-faction lever (one signal, double duty)

Tie **both** the Royalist→Concord moderation **and** the Empire's Hardliner↔Empress balance to the **same Commonwealth-popularity/strength signal**: strength makes peace credible, weakness invites war. The Foreign Ministry drives it, via choices like —

- **Mutual disarmament** (needs War Ministry): scale back shipbuilding; de-escalates.  
- **Extradite the anti-Imperial exiles** (needs Justice): pleases the Empire, **angers your base/coalition**.  
- **Reconciliation for budget** (Foreign card option): unpopular short-term, lowers the temperature.  
- **Saber-rattling**: popular in the moment, raises Commonwealth standing in a way that can favor the Empire's moderates — or provoke.

---

## 13\. Deferred / later-pass

KVP & DNF splinters · true DVP/DDP data-merge · reunification depth (peaceful-ending content) · races as a *mechanical* bloc (flavor only in v1) · full economic-plan system audit · Ethia as a diplomatic actor · Eternal wealth as Restorationist funding · Knights promoted to a seat-holding party · turn-count trim (\~80 → \~70).

---

## 14\. Open stubs to redline

1. **Game title** — your call.  
2. Party/place/paramilitary **stub names**: Concord, Vanguard, Wardens, Pendrigon, Iron Banner.  
3. Confirm **BVP → Arcanists/Eternals** \[confirmed by user\]  
4. Steward vs another title (you picked Steward — confirm it sticks for the coup/seizure framing too).

---

## 15\. Build & verification notes

- Build: `npm install` → `npm run dendrynexus make-html -- --pretty` → `cp out/game.json out/html/`. Confirmed working in a clean sandbox. Deploy via GitHub Pages action.  
- Dependencies: `dendrynexus` (engine fork) \+ `parliament-svg` (the **Assembly seating chart**, already wired with `d3-parliament.js`).  
- Rename verification: rebuild must succeed **and** `game.json` must diff only by mapped tokens (no orphaned/merged/split variables). Run after the identifier pass *and* after the string-literal pass.  
- Licensing: engine \+ base are MIT (Autumn Chen). Phase-1+ replaces base prose with original Commonwealth writing; keep the existing credits files intact.

