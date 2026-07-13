# Commonwealth — Events Full-Read Audit

*The complete read of all **380 event files** (`source/scenes/events/`), covered in 9 contiguous alphabetical slices so nothing was skipped. Generated 2026-07-13. Companion to [Commonwealth_Cards_Audit.md](Commonwealth_Cards_Audit.md) and [Commonwealth_Events_Spillover_Audit.md](Commonwealth_Events_Spillover_Audit.md).*

**Policy (same as before):** obvious, canon-grounded fixes **applied** (§A); anything needing a coinage/choice/ruling **flagged for you** (§B–§E) with plain-language "what it does" + a suggestion + a ✎ blank. All applied changes are **prose/display-text only** — verified no `view-if`/`on-arrival`/`go-to`/`choose-if`/`achievement` logic touched, no branch-key desync. Build recompiles clean (exit 0, LF intact).

**At a glance:** ~55 obvious fixes **DONE** (§A) · **§B** 4 high-priority/player-facing calls · **§C** 7 systemic rulings · **§D** the coinage list (people/orgs/terms) · **§E** verified-correct + one code bug.

> **The Ferris/Franz trap (resolved):** every reader flagged "Ferris Goodryke" as wrong per the names doc — but the grep is decisive: **0 "Franz Goodryke" in prose, "Ferris" everywhere.** Ferris is the D3 canon; the doc was stale. I corrected `Commonwealth_Character_Names.md` (Goodryke→Ferris, Trevannon→Godwin, Frask→Bram) so this stops recurring. **Do not reintroduce Franz.**

---

## §A — Applied this pass (review & override freely)

**Names → canon** (verified against the names doc):
- **Kuno Westmore → Edgar Westmore** — 20× across 14 files (incl. `main`, both presidential-election clusters, all the `dnvp_party_congress*`). "Kuno" was von Westarp's real first name.
- **Paul Lethmoor → Cedric Lethmoor** — 13× across 6 files (incl. the `_disp` display vars). "Paul" collided with President DuFour + was Lettow-Vorbeck's real name. *(Lethmoor stays a war hero — that's canon; only the first name was wrong.)*
- **Gregor Stasser → Garrick Crowde** (`local_election_saxony_1933`); **Gerrick → Gorrick** typo (`presidential_election_1932_hindenburg`); **Hugo → Mardle** (`dvp_party_congress_3_luther`, matching its own "Perrin Mardle" intro); **Die Brocksby → The Brocksby** (`rohm_gay`).

**Vocab / currency → canon:**
- **reparation payments → War Loan payments** — 17× across 7 files (incl. `main`, `economic_policy`, `foreign_policy`). *(Only the prose phrase; the `reparations_*` variables are untouched.)*
- **"a billion dollars"/"billion-dollar"/"dollars in bonds" → Gold** (`bruning_deflation`, `bruning_public_works_real`, `bruning_public_works_act_real`).
- **RFKB → the Vanguard** (`blutmai`; the `on-arrival` sets `vanguard_banned`, confirming identity); **Stalhelm → the Wardens** (`saxony_`/`thuringia_reichsexekution_popular`); **Staatsschutzamt → State Security Office** (`schleicher_cabinet_15`, the English gloss was already inline).

**Geography / orgs → canon:**
- **"United States President Herbert Hoover" → the Allied States** — 5× across `emergency_act_bruning` + `emergency_decree_bruning` (dropped the US-flag-styled real president).
- **European Free Guild → Regional Concordant** (`spd_governmental_burden_peoples`); **"all of Europe" → "the whole continent"** (`papen_civil_war`); **"Customs Free Guild" → customs union** ×2 (`austrian_customs_union` — a customs union isn't a trade guild).

**Bad-replaces / reskin scars:**
- **"under Vael" → "under Croft"** — 2 cabinet-minister spots (`dnvp_party_congress_4_westarp`, `goerdeler_cabinet_1`); a global Marx→Vael swap had wrongly caught Chancellor *Marx* (→ Croft) instead of the theorist. *(The 3 `center_party_conference*` "rightward turn from Vael" spots are left for you — see §D3, it's a genuine semantic call.)*
- **"new the Commonwealth" → "new Commonwealth"** (4×); **"the the Allied States" → "the Allied States"** (5×, `london_economic_conference`); **`understanding_enemy`** scars ("modern the Commonwealth", "Panik im middle class"→"Panic in the middle class", "the Depression"→"the economic calamity", "petty-propertiedie"→"petty propertied", "the the"/"new Marrow" cleanup); **`nazi_3`** "northern the southern realms"→"the southern realms".

**Doc correction:** fixed 3 stale `Commonwealth_Character_Names.md` rows (Goodryke→**Ferris**, Trevannon→**Godwin**, Frask→**Bram**) that had been causing every reader to mis-flag live canon.

---

## §B — High-priority / player-facing (need a call)

### B1 · Live **Holocaust Wikipedia iframe** — `game_over.scene.dry` L368  🔴
An `on-display` block embeds a live external iframe to **`en.wikipedia.org/wiki/The_Holocaust`** on a game-over screen. This is a real-world atrocity link, player-facing, and an external-host dependency inside the reskin. It lives in JS (not prose), so I did not auto-touch it.
→ **Suggestion:** remove the iframe (or replace with an in-world ending image/text). ✎ ______

### B2 · External **meme image** — `goerdeler_cabinet_1.scene.dry` L104  🔴
`@goerdeler_3`'s `on-display` loads `https://en.meming.world/…/Shocked_Black_Guy.jpg` — a placeholder meme from an external host, player-facing.
→ **Suggestion:** replace with a proper in-world portrait/asset, or cut the image. ✎ ______

### B3 · Unfinished / placeholder bodies that render to players
| Scene | What the player sees now |
|---|---|
| `election_1928` `@schleicher_left_coalition` L2053 / `@schleicher_right_coalition` L2063 | the body is literally the word **"Placeholder"** |
| `election_1928` `@taming_abandoned` L2474 | *"i'm too lazy to implement this right now, anyway [chancellor] is ousted and replaced by good ol bruning"* (also `bruning`→**Askew**) |
| `local_election_1932` L1129 | *"Damn that's crazy. Look dude I don't know what to write for this."* |
| `kpd_ultimatum_prussia` L49 | *"modman is lazy and doesn't want to code this"* |
| `nazi_16` L1 (title) | **"The Decision 2010"** (meme title vs. the serious "Negotiations, Pt. 3" subtitle) |
→ **Suggestion:** write real prose for each (or cut the branch). These are the ones most likely to break immersion. ✎ ______

### B4 · Leaked dev / debug / 4th-wall text (renders inline or on hover)
- **Dev tooltips** `title="good mod"` / `title="good game"` (visible on hover): `dvp_party_congress_2`, `dvp_party_congress_3_luther`, `election_1928` L3834, `goerdeler_cabinet_2_alt`.
- **"Secret mode is on."** — `dnf_collapse_right_coalition_lvp`.
- **"report to the dev if you got this"** — `weimar_referendum` L21.
- **"Shoutout to 'joavig'… April 29, 2025"** — `weimar_prussia_collapse` L127 (real date + handle).
- **"All my homies hate the Collectivists"** — `landtag_referendum_results` L40.
- **4th-wall "Red Autumn"** (names the base game) — `cabinet_sacked` L18, `cabinet_sacked_bruning`.
→ **Suggestion:** strip/replace. Most are one-liners. ✎ ______

---

## §C — Systemic rulings (game-wide; some are non-prose)

### C1 · The **19xx election-year display bug**  ⚙️
`root` sets `year = 1928` and `year_display = year + 2365` (→ 4293). The status clock uses `year_display` (correct), but `next_election_year` / `next_reichstag_year` / `next_election_year_heartland` are assigned the **raw** `year` and interpolated with **no** `+2365`. So a player sees *"elections in May **1930**"* next to a *"May **4295**"* clock. Game-wide: ~16 event files + `status.scene.dry` (L125/173-175). **Not a prose fix** — needs a display formatter (e.g. a `next_election_year_display = next_election_year + 2365`, or offset at each interpolation).
→ **Suggestion:** add the offset display var and swap the ~20 `[+ next_election_year +]` sites to it. Want me to do this as its own pass? ✎ ______

### C2 · Zentrum **"Center" / "Z:"** chart labels
The Unionist party's parliament-chart legend is hardcoded **`"Center"`** (echoes Zentrum) in many files' `on-display` chart JSON, and local-election result tables print **`Z:`** — while the same files use `[+ unionist_party_name +]` (Unionist/Concord) elsewhere. Files incl. `election_1928` L1453, `schleicher_21/22`, `cabinet_12/13/20`, `local_election_saxony*` (×3) + `local_election_thuringia`, `local_election_lippe`.
→ **Suggestion:** replace the hardcoded "Center"/"Z:" with the party name/abbrev. ✎ ______

### C3 · **crowns vs Gold** currency split
The *same* public-works event reads "500 million **Gold**" in one variant and "half a billion **crowns**" in another (`schleicher_cabinet_5` vs `_5_alt`, `_8_alt`); the presidential campaign mixes "five million **Gold**" and "seven million **crowns**" (`presidential_election_1932_campaign`); `schleicher_16` uses crowns. Note: "Gold" also collides with the **Golds** party name.
→ **Suggestion:** pick one canonical unit (Gold is dominant game-wide) and standardize, or define crowns as a sub-denomination. ✎ ______

### C4 · **"proletariat" / "proletarian" → the Commons?**
The style guide maps *the proletariat → the Commons*, but it may be intentional register in Collectivist/Vaelist mouths. Spots: `economic_sanctions` L11, `banking_crisis` L15, `blutmai` `@join` L79, `understanding_enemy` L15 (×2), `election_1928` `@popular_front_prussia`.
→ **Suggestion:** map narrator-voice uses to "the Commons"; keep in-character Collectivist speech as-is? Or a blanket rule. ✎ ______

### C5 · lowercase **"the depression" / "economic depression"**
Canon proper noun is **"the economic calamity"** (applied correctly for the capitalized cases). ~10 generic-lowercase echoes remain: `weimar_referendum`, `young_plan_campaign`, `young_plan_referendum`, `wtb_conceptualized`, `wtb_proposed`, `hunger_chancellor`, `local_election_1932`, `papen_cabinet_7`, `presidential_election_1932_candidate`.
→ **Suggestion:** standardize to "the economic calamity"/"the calamity", or accept lowercase generics as fine. ✎ ______

### C6 · **"capitalism / capitalist"** in narrator prose
Style guide steers against bare Marxist framing. Narrator-voice spots: `presidential_election_1932_round_2` L646, `return_to_normalcy` L13, `schleicher_16` L25 (also `understanding_enemy` "anti-capitalist"/"top capitalists").
→ **Suggestion:** consistency ruling — keep (generic English) or soften ("business/monied interests")? ✎ ______

### C7 · **"Central Union the Commonwealth"** (botched, 3×)
`election_1928` L2287, `kpd_vote_of_no_confidence` L35, `schleicher_cabinet_12` L24 — a domestic Collectivist takeover ("consolidating power in the Collectivists, purging state institutions…") is mislabeled with the **foreign USSR-analogue** name (Central Union), and it's missing a word.
→ **Suggestion:** coin the domestic-Collectivist project name — e.g. "a **Collectivist Commonwealth**" / "a **Commonwealth Commune**" / "the **Second Republic**"? ✎ ______

---

## §D — Coinages needed (real-world residuals)

### D1 · People — coin a Commonwealth name (or drop to surname)
| Scene | Current | Who it really is | ✎ suggestion |
|---|---|---|---|
| `understanding_enemy` L17 | Alexander Schifrin | real SPD theorist | ______ |
| `understanding_enemy` L52 | Sergei Chakhotin | real propagandist | ______ |
| `weltbuhne`, `weltbuhne_2` | Walter Kreiser | real Weltbühne journalist (editor Ossietzky→"Ostwick" already reskinned) | ______ |
| `local_election_saxony` | August Winnig | real | ______ |
| `presidential_election_1932_candidate` | **Alfred** Mallin | "Alfred" = Hugenberg's real first name; doc gives Mallin no first name | drop to "Mallin" / coin ______ |
| `papen_cabinet_reichstag_1`/`_3` | **Paul** Lowe | "Paul" collides w/ DuFour | coin a first name ______ |
| `local_election_saxony_1933` (+ slice 2) | president value **"Munzer"** / "Willi Munzer" | echoes Thomas Müntzer; not in names doc | coin a Collectivist name ______ |
| `kellogg_briand` | Ethia's FM **"Gessler"** | collides w/ mod's Gesling; not Ethian-style | ______ |
| slice 2 | "Eugenio Pacelli, the Papal Nuncio" | real | coin a Faithful cleric ______ |
| `dnvp_party_congress_3_lambach` L59 | Edric **Stoltzmann** | German "-mann" (Stoecker reskin) | confirm/anglicize ______ |
| `dnvp_party_congress_4_westarp` | Edras **Lenmoor-Jung** | "-Jung" German remnant (Lejeune→Lenmoor done) | drop "-Jung" ______ |
| `dvp_party_congress_3_dingeldey` | Count Alexander **zu Dohna**(-Schlodien) | German aristo + "zu" | coin ______ |
| `presidential_election_1932_campaign` | Carl Slack **of IG Farben** | IG Farben = real concern | coin the concern ______ |
| slice 2 | Anton Erkelenz; **Thomas** Mann; "Willi" Munzer | real first names | ______ |
| `presidential_election_1932_candidate`/`campaign` | styled **Ec·ken·er** easter-egg | leaks real Hugo Eckener; canon `disp = "Hugo Eckhart"` | render "Eckhart" ______ |
| `dnvp_dvp_merger_new` | "Hans von Raymont" / "von Raymont" | option L184 uses "Hollis Raymont"; drop "von" + reconcile first name (Hollis collides w/ Lindell) | ______ |

### D2 · Orgs / abbreviations / terms
| Scene | Current | Issue | ✎ suggestion |
|---|---|---|---|
| `nazi_10` | the Royalists' **"SS"** | real Schutzstaffel; no SS-analogue in canon | coin an elite-guard name ______ |
| `local_election_saxony`(×3) + `_thuringia` | **"KPO"** | real KPD-Opposition; every peer party was reskinned | coin an abbrev ______ |
| `local_election_saxony_1930` | **"Reichrat"** delegation | real Reichsrat (federal chamber) | coin a chamber name ______ |
| `schleicher_17` (×2) | **"Rechtsblock"** | untranslated German | "Right Bloc" ______ |
| `dvp_party_congress_2`, `_3_luther`, `lvp_party_congress_curtius` | `title="Lebensraum"` hover on "living space" | real Nazi term surfaces on hover | drop/translate the `title=` ______ |
| `presidential_election_1932_campaign` | **RDI / ADV / VVVD** abbrevs (Federation/Pan-Commonwealth League/Patriotic Leagues) | German-derived acronyms on already-English names | re-abbrev or drop ______ |
| `schleicher_cabinet_20` | **"GNU-VLB"** | acronym doesn't match its English name | align ______ |
| `schleicher_cabinet_20`/`_alt` | **"Volksocialism"** | German "Volk-" | Anglicize ______ |
| `landtag_referendum_results` | **"swastika"** | real Nazi symbol; Royalists are monarchists, not Nazis | coin a Royalist/Imperial emblem ______ |
| `hindenburg_explode_president` | "military advisory mission in **China**" | real-world | coin an eastern realm ______ |
| slice 2 | **Eupen-Malmedy**; the **Elbe** River | real border/river | coin ______ |
| `prussia_v_reich` (+ "Baden-Purl" in `main`) | **Baden** | real German state (Bavaria beside it → Avriza already) | coin an Athar region ______ |
| `bruning_toleration_right_collapse` | "the **Golden Twenties**" | ties to the real 1920s (calendar is +2365) | era name not tied to the real decade ______ |
| `schleicher_13_alt` | "the **revolutions of 1848**" | real 1848 | Commonwealth-calendar (~4213) / reframe ______ |
| `dnvp_party_congress`/`_2` (×3) | "**Katastrophenpolitik**" | German | translate ("catastrophe politics") ______ |
| `goerdeler_cabinet_1` | "**Herr Geheimrat**" | German honorific | translate ______ |
| `election_1928` (×2) | "**November criminals**" | real *Novemberverbrecher* / stab-in-back | reskin to a Founding-era epithet ______ |
| `dnvp_party_congress_3_treviranus`, `_2_hergt` | "**Tory Democracy**" / "**Fulyrian Tories**" | British | confirm intended or reskin ______ |
| `election_1928` | "Commonwealth-**Hanoverian** Party" | real DHP | coin a particularist-party name ______ |
| `bruning_deflation` | "**Keynesian** / Keynesians" | real eponym | reword ("deficit-spending school") / coin ______ |
| `local_election_saxony`, `schleicher_22` | "**national bolshevik(s)**" | real term (canon: communism→Collectivism) | "national Collectivist" ______ |
| `marx_iv_collapse` | "**interdenominational schools**", limiting "**the church's influence**" | confessional-school framing; canon Unionists are non-confessional | reframe to the Faithful ______ |
| `wittorf_affair`, `streetfighting_unlock` | "**Vanguard League**" / "**Red Vanguard**" | canon paramilitary = "the Vanguard" | "the Vanguard" or confirm flavor ______ |
| (achievements) | German achievement **IDs** are internal (fine) — but **verify the achievement-definition file** has English player-facing titles/descriptions | slice 3 flag | check ______ |

### D3 · Lower-stakes naming / consistency
- **"Vaelist Uprising"** (`blutmai` L12) vs **"Vaelist Rising" / "Red Spring"** elsewhere — pick one canonical name for the founding-era leftist revolt. ✎ ______
- **"Blutmai, 'Bloody May'"** (`blutmai` L36) — drop the German (it self-glosses) → "Bloody May", or coin an Athar term. ✎ ______
- **doubled "Abysm, a working-class neighborhood of Abysm"** (`altona_clashes`, `papen_altona_clashes`) — the reskin collapsed Altona (suburb) + Hamburg (city) both into "Abysm"; give the district its own name. ✎ ______
- **"Western Allies" / "Allied response"** (`economic_sanctions`, `schleicher_9`, `austrian_customs_union` `@end_coalition`, `main`) — reads WWI-Entente and collides with the canon **Allied States** polity. → "the western powers" / "the West"? ✎ ______
- **"the 3 `center_party_conference*` 'rightward turn from Vael'"** — is this the theorist (turning *away from* Vaelism) or Chancellor Croft's era? Genuinely ambiguous; slice 2 read it as **Croft**. Confirm and I'll swap. ✎ ______
- **"Commissar for Marchland Relief"** (`agrarian_bolshevism`) — style guide maps Reichskommissar → **Commissioner** ("Commissar" reads Soviet). ✎ ______
- **"Free Guild" garbled Anschluss** in `cvp_merger` (×4, slice 2) — reader flagged a botched merger phrasing; worth a look. ✎ ______
- **"the Camarilla"** (`schleicher_reichstag_4`, `death_of_hindenburg_president`, `presidential_election_1932_*`) — generic court-cabal loanword; purge the Weimar-historiography echo or keep? ✎ ______
- **"Ephialtes of the Unionist Party"** (`bruning_joever`) — classical byword for a traitor; keep as rhetoric or reword? ✎ ______

---

## §E — Verified correct / not flagged + one code bug

- **Names that are already canon** (readers mis-flagged against a stale doc; now corrected): **Ferris Goodryke**, **Godwin Trevannon**, **Bram Frask**, **Emeric Cheaping**, **Hugo Eckhart**, **Perrin Mardle**, **Garrick/Corin Crowde**.
- **Deferred by policy** (unchanged): internal `@ids`, variable names, and asset filenames retaining German (`Kuno_von_Westarp.jpg`, `GoodrykeFranz.jpg`, `StaalKurt.jpg`, `hitler_dead.jpg`, `img/stahlhelm_3.jpg`, achievement id strings, music paths); `//`-comments and `#`-citation lines (e.g. `understanding_enemy`'s "# Harsch p.106"); loanwords already accepted (détente/façade); the "Harzburg Front" filename/vars (player-facing text already = "The Stowford Front").
- **Established, do not "fix"**: "Unity Constitution"/"Unity Republic", "GNU"/"Commonwealth National Unity Front", "the Forward" (Vorwärts), "Great Wars" (plural), "Serannus Plan"/"Voss Renewal Plan", "the Exetar", "Treaty of Etaluxia", "Veran Crash", founding years 4283/4284.

**Code bug (out of audit scope, but likely crashes that branch):** `local_election_saxony_1933.scene.dry` L116 — `saxony_adjustment.factors.nsdap` should almost certainly be `saxony_adjustment_factors.nsdap` (underscore, not dot-chain). ✎ want this fixed?
