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

> **§A EXECUTED 2026-06-30** — all your annotated decisions applied (prose-only across 11 cards, compile exit 0). Two committed §B fixes were also **corrected** per your canon notes: the Founding now reads **4280** (not 4283), and the four concordat cards dropped **"Temple of the Faithful"** (reframed to freedom of worship + the God of Magic's church vs. the Conclave). Execution surfaced new game-wide inconsistencies → **§C5**.

---

## §A — Decisions for you (card residuals with no mechanical fix)

These have **no unambiguous canon equivalent** — each needs a coinage, a choice between options, or a
premise reframe. My recommendation is in the third column; jot your call in **✎**.

### A1 · `party_affairs/international_relations`

| Loc                          | Residual                                                                                                             | Recommendation                                                                                                                                                                                    | ✎ Your call                                                                                                                                                                                                             |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@scandi` opt L15 + body L49 | "**Scandinavian** / **Nordic** Reformists" — no Scandinavia analogue exists in canon                                 | Your earlier idea **"Nievalian Reformists"** (a new northern realm), *or* generalise to "the reformist governments of the northern realms" (Cinderwall / Highharbor). Needs a coinage either way. | Nievalian will work, the Nievalians are a Kingdom that was close allies of the Empire (and they remain so) but their care for average civilians and welfare state is notable and keeps democratic movements there calm. |
| `@austria` body L38          | "(the **Republican Protection League**)" — literal Schutzbund translation; the Freehold militia is unnamed elsewhere | Coin a Freehold-militia name, **or** drop the parenthetical (the sentence already says "the Freehold Liberty militia")                                                                            | Republican Protection League is good                                                                                                                                                                                    |
| intro L11                    | "the **Labor and Reformist International**"                                                                          | Probably **keep** — reads as an in-world coinage paralleling the established "Collectivist International". Confirm, or rename to "the Reformist International".                                   | The Collectivist International is good, it's a smaller group but Collectivists are broadly allied with eachother.                                                                                                       |

### A2 · `government_affairs/foreign_policy` (the densest card)

| Loc                                                | Residual                                                                                                                                                                                                                                                         | Recommendation                                                                                                                                                                                                                        | ✎ Your call                                                                                                                                                                                                                             |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@european_union` + `@european_union_2` (L222–244) | The **entire EU questline** is built on real-world "Europe/European Union" framing: "a **European Free Guild**", "the **Allied States of Europe**", "**European federalism**", "states of Western and **Eastern Europe**", "**Europe** has learned the lessons…" | Coherent reskin pass: the EU = canon **the Regional Concordant**; "Europe" → "the continent" / **Athar**; "Eastern Europe" → **the North**. (Left untouched so the renaming stays consistent across both scenes — it's one decision.) | Europe is the continent or The Region, Athar is the name of the world (like Earth). Eastern Europe is indeed the North. The European Union can be The Regional Concordant.                                                              |
| `@reduce_reparations` body L149                    | "Western president **Hoover**, who has been friendlier… than the **Europeans**" — Hoover is a real figure; also the US-analogue is **the North** (Allied States), not "Western"                                                                                  | Coin an **Allied States president** name; "the Europeans" → "the western powers". (Note the West/North mix-up here.)                                                                                                                  |                                                                                                                                                                                                                                         |
| `@schleicher_spd` body L174                        | "Ethian Premier **Édouard Herriot**" — real figure                                                                                                                                                                                                               | Coin an **Ethian Premier** name (cf. the Validar succession cast in Foreign_Powers)                                                                                                                                                   | There shouldn't be an Ethian Premier, they have no such figure, Ethia is a vast, decentralized empire that is ruled by an Emperor with advisory dukes who rule their own realms as near-independent lords. It should just be noted that |
| `@improve_soviet_eco` body L55                     | "the **Great Depression**" (proper-noun real event) · "their **Five-Year Plan**"                                                                                                                                                                                 | "the depression" (lowercase, as used elsewhere) or a coined crash name; a Central Union planning coinage ("their industrial plan")                                                                                                    | This is a medieval-renaissance-fantasy setting, so the depression can be the economic calamity. The Central Union does not have five-year plans, but we can say they employ their famed "Economic Command Schedule" as a subsistute.    |
| `@support_austria` L211 / `_2` L220                | "wage a war of words against **Austrofascism**" (×2) — embeds real-world "Austro-"                                                                                                                                                                               | "against **Freehold reaction**" or "against the **Wells dictatorship**" (the card's own term for the regime)                                                                                                                          | Wells dictatorship is better                                                                                                                                                                                                            |

### A3 · single-card items

| Card · Loc                                   | Residual                                                                                                                                                                                                                                                         | Recommendation                                                                                                                                                                                                                      | ✎ Your call                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `war_guilt` (whole card)                     | "**War Guilt** Inquiry" investigating "the causes of the **Great War** and **the Commonwealth defeat**" — a Versailles transplant that doesn't fit the lore (the Axton Empire *won* the Great Wars, then *collapsed*; the Commonwealth wasn't defeated in a war) | Reframe the premise: an inquiry into the **Founding / the Empire's collapse** and the Restorationist "stabbed-in-the-back" narrative (which **is** canon per Foreign_Powers — keep that phrase). Ne Yes there was no Great War that the Commonwealth fought, the Commonwealth's imperial predecessor won both great wars, with the second being a romping. The fury of restorationists and many people nostalgic over the Empire is that when the Emperor died, in the chaos if the democrats had firmly backed the new Empress they theoretically could have beaten back the warlords, radical collectivists, and foreign enemies.  t  t  t  t  t  t  t  t  t  t  t  t  t  t  t  t  t  |
| `labor_rights` `@unemployment_insurance` L54 | "With the onset of the **Depression**…"                                                                                                                                                                                                                          | Same call as the foreign_policy "Great Depression" — pick one game-wide crash term                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `labor_affairs` `@support_labor` L12         | "the industrial **Ironreach** region" — not in the canon locale list                                                                                                                                                                                             | Confirm "Ironreach" is an intended locale; if not, swap to a canon industrial place (the industrial belt / **Abysm** / a Heartland locale)                                                                                          | Swap to Abysm, and change industrial to industri                                                                                                                                                                                                                                                                                                                                                                                                  |

### A4 · optional consistency notes (low priority)

- **Religious institution naming:** I dropped the real-world "Roma" from "Roma Faithful Church" → in
  `foreign_policy` it became **"the Temple of the Faithful"** (its own dominant term), in the three
  `prussian_affairs` cards **"the Faithful Church"** (matching their local "the Faithful church"). If
  you want it uniform, standardise all to **"the Temple of the Faithful"**. ✎ 
	- The Faithful is not an actual church or religion, it's a blanket term for highly religious individuals. Don't use Temple of the Faithful at all, the religious concordant that the Unionists want is reconciling the God of Magic's church which is very politically charged and the rest of the Conclave (a term for the other gods). The Faithful usually want this religious harmony, but the Faithful themselves are a group of people not some sort of religious denomination.  There is no 'Rome' or Catholic-Protestant divide.
- **Founding chronology:** the "Revolution of 1918" now reads **4283** (mechanical +2365), but the lore
  compact says the Commonwealth was "born ~13 years ago" (≈ 4280 from 4293). Minor tension, mirrors the
  base game's own loose dating. Reconcile, or leave. ✎ 
	- Fix it to 4280 then, the Commonwealth is indeed 13 years old at game start. It had a similar course as the weimar republic, born out of chaos, it survived warlords in its first year, then repelled an invasion from the Axton Empire with heavy Ethian aid and moderate military intervention (which starts the war debts), then after a few years of chaos the economy begins to slowly stabilize. By the start of the game, the Commonwealth is seemingly recovered and on the course for stability, until naturally the Veran market crash, the fall of Ivion, and increasing foreign pressure test its strength which is the actual game.

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
	-  This is correct. The First Great War saw the Archduchy of Axton rise to become the Axton Empire, it crushed and annex Etaluxia, it fought the Ethians to a stalemate in the west, and after rapidly overwhelming neighbors in the east and north, the frightened northern states banded together into the Allied States and were able to eventually stalemate the war near Cinderwall. The settled peace saw the Axton Empire annex a huge amount of land and 'get away with it'. The Second Great War was only a little over 20 years ago, the Axton Empire fought against Ethia but utterly humiliated them. Vera was besieged after a year of fighting, the Emperor Edwyn Validar of Ethia was captured and surrendered. It was seen as an enormous victory for Axton who became the continental hegemon.

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

### C1 · "Kurt Staal" → "Werner Staal" — swept 36× / 22 files · **DONE (2026-06-30)**
Staal's first name was **"Kurt"** game-wide (core UI, the portrait `alt` text, ~18 event files) — the
un-reskinned Schleicher first name; `Commonwealth_Character_Names.md` canon = **Werner**.
→ **Swept "Kurt Staal" → "Werner Staal"** (36 occ / 22 files, `reskin_swap.mjs`, LF-safe, compile
exit 0); 0 stale remain. The portrait alt-text now reads "Werner Staal"; the art filename
`img/portraits/StaalKurt.jpg` stays (internal/deferred). `red_general` keeps surname-only
"Staal"/"General Staal" (both canon-valid). **"Kurt Shackley" (Schumacher) is a separate canon
character** and was untouched.

### C2 · "social-democratic" → "Reformist" — 1 instance · **DONE (2026-06-30)**
**Correction:** the earlier "35× / 22 files" figure was a mislabeled grep — that file list was
actually the Kurt Staal set (C1). In reality "social democracy / social-democratic" is only **one
player-facing instance** — `shuffle_leadership` L625, now **"the Reformist cause"** — plus **2
out-of-universe credits citations** (Smaldone / Winkler bibliography), which stay per the
credits-are-real-world rule.

### C3 · events-only residuals (cards are clean)
- **"Wendell Croft"** — 18× across 9 files (`root`, `main`, `election_1928`, `presidential_election_1932_*`,
  `center_party_conference*`, `marx_iv_collapse`). Your flagged Deepsnow example. Two issues: the first
  name should be **Wilhelm** (canon Croft), **and** in the right-wing-coalition/chancellor context it's
  the wrong character — should be **Chancellor Vance**. *(Vance and Croft are two distinct canon people.)*
- **"Storm Troopers"** — 2× (`nazi_18`, `nazi_19`) → **the Loyalists** (same fix as the card trio).
- *(Check during the events pass: "Roma Faithful Church" appears only in `schleicher_cabinet_11` now;
  the religious-institution naming standardised per §A4.)*

### C4 · "Kurt Hammerton" / "Kurt Hammerton-Equord" → Gideon Hammerton · **FLAG (awaiting OK)**
Same leaked-"Kurt" class, different character — surfaced while sweeping C1. The GNU president
**Hammerton** shows as "Kurt Hammerton-Equord" (`status_right` alt-text; `death_of_hindenburg_president_rubicon`
L434) and "General Kurt Hammerton" (`schleicher_cabinet_6` L24). Canon (names doc) = **Gideon
Hammerton**, surname-only — and the real-world "-Equord" suffix should drop too. Recommend the same
fix as Staal; say the word and I'll sweep it (the `hammerstein.jpg` art filename stays).

---

## §C5 — Spillover inconsistencies surfaced at execution (need a call / events pass)

Applying the card decisions created cards-vs-rest inconsistencies (same "cards now, flag the rest" pattern):
- **"Ironreach" — RESOLVED (kept Ironreach):** it turned out to be an established coined industrial-heartland (Ruhr-analogue) used coherently in events (`labor_unrest`, `dvp_party_congress_3_luther`), not a real-world residual. The `labor_affairs` card was **reverted to "the industrial Ironreach region"**; no game-wide change. (Abysm remains its own distinct western locale.)
- **"Great Depression"** persists in ~10 event files (`cvp_merger*`, `bruning_vonc_2*`, `emergency_cuts`, `economic_recovery`, `return_to_normalcy`, …); the cards now say "the economic calamity." A game-wide sweep → "the economic calamity" belongs to the events pass. (The credits bibliography keeps "Great Depression" — out-of-universe.)
- **Founding year 4283/4284** persists in events/library — `death_of_hindenburg_president` ("revolutions in 4283 and 4284"), `lvp_party_congress_1928_2_luther` ("council in 4283"), `library`; the cards now say 4280/4281. NB a deeper chronology tension: `library` dates the Second Great War to **4279**, which sits oddly against "the Commonwealth is 13 years old" (→ Founding 4280). Needs a game-wide founding-year + timeline reconciliation.

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
