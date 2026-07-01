# Commonwealth — Events Spillover Audit

*Follow-up to [Commonwealth_Cards_Audit.md](Commonwealth_Cards_Audit.md): resolving the game-wide "spillover" residuals surfaced during the card pass + the queued event items. Generated 2026-06-30 from the card-audit §C5 plus three targeted reader passes.*

**Scope:** the event + backbone files where the known spillover residuals actually live — **not** a blind reread of all ~380 events (the second pass already reskinned the bulk). Policy: obvious, canon-grounded fixes **applied** (§A); anything needing a coinage/choice/reframe **flagged for you** (§B). Build recompiles clean (LF).

**At a glance:** obvious fixes **DONE** (§A) · **3 decision clusters** for you (§B) · founding-year **confirmed canon** (§C).

---

## §A — Obvious fixes applied this pass (review & override freely)

- **Storm Troopers → Loyalists** (`nazi_18`, `nazi_19`) — the SA reskin the token-sweep missed.
- **Founding year: reverted 4280 → 4283/4284** (the three cards from the §A-run: `economic_democracy`, `labor_rights`, `inter_party_relationships`) to match the library's canon timeline. *(You chose this — and it's confirmed: every 4283/4284 in the events is canon-correct; see §C.)*
- **Wendell Croft → split** (a stale, wrong first name conflating two canon people):
  - **Chancellor Vance** ×5 — the *collapsing initial government*: `marx_iv_collapse` (your Deepsnow "Right-Wing coalition" example), `main` (the Jan-1928 government, ×2 duplicated), `election_1928` ("Since Vance resigned…"), the `root` starting-chancellor comment. *(The internal `chancellor = "Vance"` value already matched — only the display was wrong.)*
  - **Wilhelm Croft** ×14 — the *former-chancellor / repeat presidential-candidate* references: `main` (Aug/Sep-1928 resignation), `center_party_conference`(+`_kaas`), `presidential_election_1932_campaign`/`_candidate`/`_round_1`.
- **"Great Depression" → "the economic calamity"** (21 game-facing, across `bruning_vonc_2`(+`_hergt`/`_kvp`), `cvp_merger`(+3 variants), `economic_recovery`, `emergency_cuts`, `return_to_normalcy`, `presidential_election_1932_candidate`, `main`). The credits bibliography keeps its real "Great Depression" citations (out-of-universe).
  - *Minor ✎:* the `cvp_merger` policy **labels** now read "economic calamity - …" (lowercase) beside capitalized siblings "Labor -"/"Taxation -"/"Welfare -". Capitalize to **"The economic calamity -"**?  ✎ ______

---

## §B — Decisions for you (plain-language · suggestion · ✎)

### B1 · "Temple of the Faithful" — game-wide (13× / 9 files)

Your canon: **the Faithful are people, not a church**; the religious accord is really about reconciling **the God of Magic's church** with the rest of **the Conclave** (the other gods) and guaranteeing **freedom of worship**. There is no single "Temple of the Faithful" institution. The concordat *cards* were already reframed this way — these are the game-wide leftovers, grouped by how each uses the term:

**(a) Concordat / treaty signatory** — reframe like the cards (an accord on freedom of worship, reconciling the God of Magic's church with the Conclave):

| Scene | What it does (plain language) | Current phrasing |
|---|---|---|
| `prussian_concordat` (×3) | The event where the **Heartland** signs its regional religious accord. | "an agreement / concordat / **Accord between the Free State of Heartland and the Temple of the Faithful**" |
| `schleicher_cabinet_10` | Staal dangles a national "Temple Accord" to **lure the Unionists into his cabinet**. | "fast-track a *Temple Accord* with **the Temple of the Faithful**" |
| `schleicher_cabinet_11` | The **national religious accord is signed**. | "the *Temple Accord*… signed between the Commonwealth and the **Roma Faithful Church**" |
| `nazi_17` | In a Royalist-authoritarian ending, a concordat **shields the Faithful from persecution**. | "A concordat with **the Temple of the Faithful** is signed… protecting the millions of Commonwealth Faithful" |
| `center_party_conference_joos` | The Unionist clerical wing **forces a resignation over stalled concordat progress**. | "our lack of progress toward an agreement with **the Temple of the Faithful**" |

→ **Suggestion:** reframe each as an accord on **freedom of worship** (reconciling the God of Magic's church with the Conclave), dropping "Temple of the Faithful"/"Roma Faithful Church" — matching the cards. And rename the "**Temple Accord**" (schleicher_cabinet_10/11) → e.g. the **Concord of Faiths** / the **Worship Accord**?  ✎ ______

**(b) Political / electoral actor** — here it just means the Faithful *as a voting bloc* → "the Faithful":

| Scene | What it does | Current phrasing |
|---|---|---|
| `presidential_election_1932_campaign` (×4) | Whether to court the **religious vote** in DuFour's re-election; notes their support. | "**The Temple of the Faithful** and the dissenting churches have long held political neutrality…"; "the **Temple of the Faithful** is even more united in support of DuFour than it was for Wilhelm Croft in 4290" |

→ **Suggestion:** "The Temple of the Faithful" → "**The Faithful**" (the people/bloc). Straightforward.  ✎ ______

**(c) Descriptive / territorial** — a `main` news-ticker beat grants it a sovereign precinct (treats it as a land-holding institution):

| Scene | What it does | Current phrasing |
|---|---|---|
| `main` (×2, duplicated) | A 1929 news-ticker item: a church-state territorial settlement. | "**The Temple of the Faithful** has been granted a **sovereign precinct** of its own in the south — a church-state settlement long in the making." |

→ **Suggestion:** reframe to the **church of the God of Magic** receiving the precinct (the politically-charged faith winning a sovereign seat fits the royalist tension), or cut the beat.  ✎ ______

### B2 · "Great War" (singular) → "Great Wars" (13×) — + two buried residuals

Canon = the **Two Great Wars** (the Axton Empire won both, then collapsed). These read singular. **I'll apply the clean → "Great Wars" swaps on your OK.** Two sentences hide *deeper* real-world residuals needing a coinage:

| Scene(s) | Current | Suggestion |
|---|---|---|
| `advisors/schumacher`, `advisors/stampfer`, `all_quiet`(+`_oppo`), `death_of_hindenburg_normal`, `death_of_hindenburg_president`(+`_rubicon`), `london_economic_conference`, `nazi_9`, `presidential_election_1932_candidate` (Lethmoor), `main` (the book) | "a **Great War** veteran/hero", "in/through/from the **Great War**", etc. | → "**Great Wars**" (clean swap) |
| `cvp_party_congress`(+`_president`) | "a **Great War war hero** once again" (awkward doubling) | → "a **hero of the Great Wars**" |
| `presidential_election_1932_campaign` (×2) | "DuFour's crushing victory at **Tannenberg** in the Great War" | **Tannenberg** = a real WWI battle → **coin a Commonwealth battle name** (+ "Great Wars").  ✎ ______ |
| `presidential_election_1932_candidate` (Lethmoor) | "his guerrilla campaign in **Commonwealth East Africa** during the Great War" | **"East Africa"** = real-world → **reskin to an Axton frontier/march** (a distant southern or eastern colony?).  ✎ ______ |

*(Already correct plural, untouched: `foreign_policy`, `education_science`, `rally`, `shuffle_leadership`.)*

### B3 · "war guilt clause" → reframe (7×)

The **War Loans** are the predatory price Ethia extracted for its aid at the Founding (the **Treaty of Etaluxia**) — **not** a Versailles "war guilt." The Commonwealth was never guilty of a war (the Axton Empire *won* both Great Wars, then collapsed). "war guilt clause" is a real-world residual.

| Scene(s) | What it does | Current |
|---|---|---|
| `cvp_merger`(+`_lambach`/`_oppo`/`_oppo_lambach`) (×4) | A right-merger policy plank on the War Loans. | "abolition of War Loans and the revocation of the **'war guilt' clause**" |
| `lausanne_conference` | Staal's rearmament + debt-clause negotiation agenda. | "the hated **'war guilt' clause**" |
| `papen_lausanne_conference_1` | Goodryke's push to delete the clause threatens the talks. | "a deletion of the **'war guilt' clause**" |

→ **Suggestion:** drop the "war guilt" framing → the Treaty of Etaluxia's **"blame clause"** / **"national-debt clause"** / **"liability clause"** (the arbitrary clause pinning the cost of Ethian aid on the Commonwealth).  ✎ ______

---

## §C — Verified canon (no change needed)

- **Founding years 4283 / 4284** — the `library` timeline is coherent and authoritative: **4279** Second Great War → **4283 the Fall** (Reikzar assassinated, Commonwealth proclaimed) → **4284** first Constitution + War Loans → **4293** game start. Confirmed consistent across ~10 events (`papen_cabinet_5` "Constitution in 4284", `death_of_hindenburg_president` "revolutions in 4283 and 4284", coalition "since 4284", party-timeline "from 4283", etc.). **Zero residuals** — the cards are now reverted to match.
- **"East Africa" / "Tannenberg"** are the only *new* real-world residuals surfaced (both in the presidential-1932 cluster) — see §B2.
