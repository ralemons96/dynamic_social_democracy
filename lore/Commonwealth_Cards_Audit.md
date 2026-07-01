# Commonwealth — Card Audit ("Commonwealthization")

*Content-coherence sweep of the 62 player-facing **cards** (`is-card: true`) for residual real-world
references and naming inconsistencies the token-based second pass missed. Generated 2026-06-30 from a
full read of every card (5 parallel readers + a reviewer pass), cross-referenced against
[Commonwealth_Lore_Compact.md](Commonwealth_Lore_Compact.md),
[Commonwealth_Character_Names.md](Commonwealth_Character_Names.md),
[Commonwealth_Foreign_Powers.md](Commonwealth_Foreign_Powers.md), and
[Commonwealth_Style_Guide.md](Commonwealth_Style_Guide.md).*

**Scope:** the ~62 `is-card` scenes only (government_affairs + party_affairs + the 2 advisor cards).
Events are a **separate follow-up** (see §C). Per the agreed policy: **obvious, canon-grounded fixes
were auto-applied** (§B changelog — review & override freely); **anything needing a coinage, a choice,
or a premise reframe is flagged for you** (§A).

**Result at a glance:** **27 obvious fixes auto-applied across 12 cards** · **~11 card-level decisions
for you (§A)** · **3 game-wide / out-of-scope items (§C)** · **~50 of 62 cards were fully clean.**
Build recompiles clean (LF intact).

---

## §A — Decisions for you (card residuals with no mechanical fix)

These have **no unambiguous canon equivalent** — each needs a coinage, a choice between options, or a
premise reframe. My recommendation is in the third column; jot your call in **✎**.

### A1 · `party_affairs/international_relations`

| Loc | Residual | Recommendation | ✎ Your call |
|---|---|---|---|
| `@scandi` opt L15 + body L49 | "**Scandinavian** / **Nordic** Reformists" — no Scandinavia analogue exists in canon | Your earlier idea **"Nievalian Reformists"** (a new northern realm), *or* generalise to "the reformist governments of the northern realms" (Cinderwall / Highharbor). Needs a coinage either way. |  |
| `@austria` body L38 | "(the **Republican Protection League**)" — literal Schutzbund translation; the Freehold militia is unnamed elsewhere | Coin a Freehold-militia name, **or** drop the parenthetical (the sentence already says "the Freehold Liberty militia") |  |
| intro L11 | "the **Labor and Reformist International**" | Probably **keep** — reads as an in-world coinage paralleling the established "Collectivist International". Confirm, or rename to "the Reformist International". |  |

### A2 · `government_affairs/foreign_policy` (the densest card)

| Loc | Residual | Recommendation | ✎ Your call |
|---|---|---|---|
| `@european_union` + `@european_union_2` (L222–244) | The **entire EU questline** is built on real-world "Europe/European Union" framing: "a **European Free Guild**", "the **Allied States of Europe**", "**European federalism**", "states of Western and **Eastern Europe**", "**Europe** has learned the lessons…" | Coherent reskin pass: the EU = canon **the Regional Concordant**; "Europe" → "the continent" / **Athar**; "Eastern Europe" → **the North**. (Left untouched so the renaming stays consistent across both scenes — it's one decision.) |  |
| `@reduce_reparations` body L149 | "Western president **Hoover**, who has been friendlier… than the **Europeans**" — Hoover is a real figure; also the US-analogue is **the North** (Allied States), not "Western" | Coin an **Allied States president** name; "the Europeans" → "the western powers". (Note the West/North mix-up here.) |  |
| `@schleicher_spd` body L174 | "Ethian Premier **Édouard Herriot**" — real figure | Coin an **Ethian Premier** name (cf. the Validar succession cast in Foreign_Powers) |  |
| `@improve_soviet_eco` body L55 | "the **Great Depression**" (proper-noun real event) · "their **Five-Year Plan**" | "the depression" (lowercase, as used elsewhere) or a coined crash name; a Central Union planning coinage ("their industrial plan") |  |
| `@support_austria` L211 / `_2` L220 | "wage a war of words against **Austrofascism**" (×2) — embeds real-world "Austro-" | "against **Freehold reaction**" or "against the **Wells dictatorship**" (the card's own term for the regime) |  |

### A3 · single-card items

| Card · Loc | Residual | Recommendation | ✎ Your call |
|---|---|---|---|
| `war_guilt` (whole card) | "**War Guilt** Inquiry" investigating "the causes of the **Great War** and **the Commonwealth defeat**" — a Versailles transplant that doesn't fit the lore (the Axton Empire *won* the Great Wars, then *collapsed*; the Commonwealth wasn't defeated in a war) | Reframe the premise: an inquiry into the **Founding / the Empire's collapse** and the Restorationist "stabbed-in-the-back" narrative (which **is** canon per Foreign_Powers — keep that phrase). Needs a small rewrite, not a swap. |  |
| `labor_rights` `@unemployment_insurance` L54 | "With the onset of the **Depression**…" | Same call as the foreign_policy "Great Depression" — pick one game-wide crash term |  |
| `labor_affairs` `@support_labor` L12 | "the industrial **Ironreach** region" — not in the canon locale list | Confirm "Ironreach" is an intended locale; if not, swap to a canon industrial place (the industrial belt / **Abysm** / a Heartland locale) |  |

### A4 · optional consistency notes (low priority)

- **Religious institution naming:** I dropped the real-world "Roma" from "Roma Faithful Church" → in
  `foreign_policy` it became **"the Temple of the Faithful"** (its own dominant term), in the three
  `prussian_affairs` cards **"the Faithful Church"** (matching their local "the Faithful church"). If
  you want it uniform, standardise all to **"the Temple of the Faithful"**. ✎ ______
- **Founding chronology:** the "Revolution of 1918" now reads **4283** (mechanical +2365), but the lore
  compact says the Commonwealth was "born ~13 years ago" (≈ 4280 from 4293). Minor tension, mirrors the
  base game's own loose dating. Reconcile, or leave. ✎ ______

---

## §B — Auto-fixed this pass (review & override freely)

27 obvious, canon-grounded fixes across 12 cards. All are display-text only — **no variable, branch, or
`{! !}` logic touched**; the game recompiles clean.

### `party_affairs/international_relations` (5)
- L11 "parties in **Europe**" → "parties on **the continent**"
- L13 `@fr_uk` "the Ethian **SFIO** and Fulyrian **Labour Party**" → **"the Ethian and Far Western Democratic Movements"** *(your specified wording; the body already names "Ethia and Fulyria" consistently)*
- L14 `@austria` "the **Austrian** Liberty Movement" (red-white-red Austrian-flag coloring) → "the **Freehold Liberty Movement**"
- L16 `@comintern` "**Forget the second international** – embed a spy…" → "Embed a spy…" *(your specified deletion)*
- L38 `@austria` body "the **Austrian** Reformists" → "the **Freehold** Reformists"

### `party_affairs/inter_party_relationships` (1)
- L40 "dating back to **1918 and 1919**" → "**4283 and 4284**"

### `party_affairs/shuffle_leadership` (2)
- L573 "leader of the **AfA-Bund**, the white-collar Free Guild federation" → "leader of the white-collar Free Guild federation" *(dropped the German acronym; the appositive carries the meaning)*
- L625 "a **Great War** veteran" → "a veteran of the **Great Wars**"

### `party_affairs/rally` (2)
- L75 "**Sozialpolitik** – the maintenance and expansion…" → "**Social policy** – …"
- L103 "organizing the **Great War**" → "organizing the **Great Wars**"

### `government_affairs/economic_democracy` (1)
- L33 "the Commonwealth Revolution of **1918**" → "of **4283**"

### `government_affairs/labor_rights` (1)
- L34 "the Commonwealth Revolution in **1918**" → "in **4283**"

### `government_affairs/foreign_policy` (5)
- L40 "peace in **Europe**" → "peace on **the continent**"
- L63 "the secret accord with the Central Union in **1922**" → "in **4287**"
- L117 "the **Etaluxia Treaty**" → "the **Treaty of Etaluxia**" *(normalised to the form used 4× elsewhere in the file)*
- L194 "The **Roma Faithful Church**…" → "The **Temple of the Faithful**…"
- L204 "an Accord between the Commonwealth and the **Roma Faithful Church**" → "…and the **Temple of the Faithful**"

### `government_affairs/military_policy` (1)
- L45 "officers who supported the previous **Kapp putsch**" → "the previous **Avriza putsch**" *(style-guide reskin)*

### `government_affairs/red_general` (1 item / 2 edits)
- L12 "**Kurt Staal**" (×2) → "**Staal**" / "General **Staal**" *(surname-only, the names-doc's preferred form; removes the leaked "Kurt" — see §C1 for the game-wide question)*

### `government_affairs/prussian_affairs`, `_dvp`, `_majority` (6 — 2 each)
- `@prosecute_sa` "the **Storm Troopers**" → "the **Loyalists**" *(the cards' own term for the SA everywhere else)*
- `@sign_concordat` "the **Roma Faithful Church**" → "the **Faithful Church**" *(dropped the real-world "Roma")*

---

## §C — Systematic & out-of-scope (events follow-up worklist)

Found while auditing the cards, but **not card-fixable** — they're game-wide terms or live in events.
Each wants a decision before a sweep.

### C1 · "Kurt Staal" — 35× across 22 files · **DECISION NEEDED**
Staal's first name is **"Kurt"** game-wide (`main`, `status`, `status_right`, `game_over`,
`ending_slides`, `library`, the portrait `img/portraits/StaalKurt.jpg` + its `alt="Kurt Staal"`, and
~16 event files). But `Commonwealth_Character_Names.md` canon is **"Werner"** — "Kurt" is the
un-reskinned Schleicher first name.
→ **Decide:** sweep to **"Werner Staal"** (or surname-only **"Staal"** / "General Staal", as I did in
`red_general`) across all 35 + the portrait alt-text (the art filename is internal/deferred) — *or*
accept "Kurt" as canon and update the names doc. **Recommend Werner / surname-only.**

### C2 · "social democracy / social-democratic" — 35× across 22 files · **DECISION NEEDED**
Appears in core UI (`status`, `status_right`, `library`, `game_over`, `ending_slides`, `main`) and many
events. The setting's creed is **Reformism** (style guide: socialism → Reformism; the SPD → the
Marchers). One card instance survives (`shuffle_leadership` L625, left untouched pending your call).
→ **Decide:** keep "social democracy" as a generic descriptor, or sweep → **"Reformism / Reformist"**.

### C3 · events-only residuals (cards are clean)
- **"Wendell Croft"** — 18× across 9 files (`root`, `main`, `election_1928`, `presidential_election_1932_*`,
  `center_party_conference*`, `marx_iv_collapse`). Your flagged Deepsnow example. Two issues: the first
  name should be **Wilhelm** (canon Croft), **and** in the right-wing-coalition/chancellor context it's
  the wrong character — should be **Chancellor Vance**. *(Vance and Croft are two distinct canon people.)*
- **"Storm Troopers"** — 2× (`nazi_18`, `nazi_19`) → **the Loyalists** (same fix as the card trio).
- *(Check during the events pass: "Roma Faithful Church" appears only in `schleicher_cabinet_11` now;
  the religious-institution naming standardised per §A4.)*

---

## §D — Verified clean (for confidence)

**~50 of 62 cards had zero player-facing residuals**, including every economy/social card
(`economic_policy`, `social_welfare`, `education_science`, `fiscal_policy`, `agricultural_policy`,
`womens_rights`, `homosexual_rights` [reskinned to "Magi Civil Rights"], `constitutional_reform`,
`coalition_affairs`), every security/foreign card except `foreign_policy`/`war_guilt`
(`imperial_relations`, `defense_appropriations`, `police`, `judiciary`, `domestic_enemies`,
`dealing_with_toleration` ×3, `panzerkreuzer` ×2 [the ship reskinned to "war-galleon"]), the street/org
cards (`weimar_rally`, `reichsbanner`, `streetfighting`, `iron_front`, `party_organizations`,
`fundraising`, `crisis_program`, `campaigning`), `ideology`, `neorevisionism`,
`response_to_antisemitism` ["Confronting Blood-Purism"], `confronting_nazis` ["Confronting the
Royalists"], `enemies`, `peoples_party`, `party_disunity`, `media`, `prussian_affairs_left`,
`rubicon_filler`, `shuffle_cabinet`, both advisor cards, and all 12 `blank*` placeholders.

**Deliberately NOT flagged** (verified canon, not residuals): Osric Harlow, Eduard Revane (Bernstein),
Corwin Vael / "Vael and Bell", "social Sovereigntists" (social-fascists), the Collectivist International,
the ReFormist "Voss Renewal Plan" / "Serannus Plan" / "Larkmoor Plan", the Wells dictatorship, "the Red
Spring", the Reikzar Society, "crowns" (currency), "Free State of Heartland" (generic political term),
and all internal lowercase vars / `@ids` / `img` assets / `//` comments / harmless loanwords
(détente, émigré).
