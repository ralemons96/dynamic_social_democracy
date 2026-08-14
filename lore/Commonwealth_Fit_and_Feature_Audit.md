# Commonwealth — Name-Fit & Feature Audit

*A fresh-eyes read of the whole corpus — all 380 events, 63 cards, 28 advisors, the backbone files (main / status / library / ending_slides / game_over), and the lore docs — through two lenses. Generated 2026-08-13 by seven parallel readers (~200 characters censused; ~95 place/org/term names; 2,724 written variables cross-referenced against 3,065 reads). Companion to [Commonwealth_Events_Audit.md](Commonwealth_Events_Audit.md).*

**Lens 1 — name & tone fit.** Target aesthetic: vaguely fantasy-medieval; chiefly early/older English names + generic fantasy coinages; French, Germanic, Iberian, Greek accepted in moderation.
**Lens 2 — mechanics health.** Underbaked/neglected/broken features. Difficulty is NOT flagged — total victory *should* be hard.

**How to annotate:** every finding ends with a ✎ line. Write **OK** to approve the suggestion as-is, write your own counter-proposal, or **SKIP**. Nothing is executed until you've marked it up. `[value]` = the name is a logic value (swap must reconcile conditions too); `[canon]` = touching it ripples into locked canon.

**Already fixed while auditing** (it was an approved Batch-5 item my grep missed because the words are span-split): "national **bolshevik(s)**" → "national collectivist(s)" in `local_election_saxony` + `schleicher_22`.

> **★★ EXECUTED per your markup (2026-08-13, commits `bb63a9d`→`1041005`).** Every OK/annotated item is done; five batches: names (`bb63a9d`), §B surgical + §C tone (`5afe6b0`), §D/§E scars (`6a5532d`), §F mechanics (`1041005`). **Verified:** compile + make-html exit 0 throughout; **F1 heartland elections proven live in the engine** (synthetic election: seats 25.3→17.6, votes table populates, change-arrows correct, 0 console errors). Notable execution decisions, for your review:
> - **A5 (your Steunenberg call):** implemented fully — value `"Mann"`→`"Steunenberg"` (incl. the candidate-desc dict key and the literal `Mann_running`/`_votes_disp` refs), candidacy bio now reads *"Godfrey Steunenberg… has long lived in the shadow of the more celebrated novelist Aldric Mann"* (Aldric stays canon as the famous novelist; the "Ambrose Mann" stopgap is retired), and the lone prior "Kelby Steunenberg" (kpd_conference Conciliators) was aligned to Godfrey. NB: "Godfrey" is now shared with Godfrey Radbourne — flag if you want a different first name.
> - **B7 (no LVP name, favor DDP):** implemented as symptom fixes — "Golds or Golds" collapsed, dead same-word conditionals collapsed, the LVP-founding "(Golds)" parenthetical dropped, DDP keeps its "Gold" identity/color. No new party name coined.
> - **F3 heuchelei:** granted on `rohm_gay @persecute_rohm` with the subtitle reframed to *"prosecute Isen Glade under the very Bloodright Statute we ourselves oppose"* (the rainbow-lettered original contradicted the orcish reframe). Max completion is now a true 125/125.
> - **F9b was a FALSE POSITIVE** — the four heartland aggregates ARE read (cvp_formed*, advisors, austrian_customs_union); left untouched.

## ⏳ Deferred backlog — ★ EXECUTED 2026-08-13 per user scoping (commits `5f666bc`→`57de613`+)
1. **F6 `popular_front_dispute` — ✎ WRITTEN (user choice):** full event — framing page + all 8 topic resolutions (ministry-gated where apt), modest relation/dissent effects, re-enabled on its 5-turn recurring timer. Engine-verified firing.
2. **F12 content stubs — ✎ DONE:** reichstag_7 climax written · papen_joever expanded + @rally/@legal choices · harzburg @strategy ×2 written · nazi_10 @exploit + nazi_11 @counter_rally options added · kpd_ultimatum/groko one-liners replaced (and the surviving "It's their loss."×2 labels differentiated) · cabinet_8 bank twins get distinct Lytton/Fenn closings · **kpd_policy finished-lite but KEPT DISABLED** (the base dev's sourced design note — abstentionist Collectivists — is honored; enabling is now a one-line flip) · nazis_in_crisis deleted.
3. **F11 systems depth — ✎ DONE (first tranche):** magi axis now has three movers (the card + Harnfell's new "Advocacy for the magi" advisor action + the new **Circles Petition** event); `bvp_relation` has real consumers (petition trigger/aside + the Avriza majority beat); the new **An Envoy from the North** event narrates empire_posture/reunification/fear bands post-Ivion. Further depth (more Empire beats, dufour_faith surfacing) remains open for a later tranche. ✎ ______
4. **F8a `staal_parliament_trigger` — ✎ BUILT:** new `schleicher_parliament_offer` event (mid-Staal-era, once) sets the trigger in-character; the "backed by parliament" election option is now reachable. Engine-verified.
5. **F3 remainder — ✎ LEAVE INERT (user choice):** the 13 legacy-granted-but-undisplayed ids stay as-is; zero player impact.
6. **F9d remainder — inert, left in place** (not in the tick lists).
7. **NEW — portrait triage ✎ DONE (user: remove/redirect):** all 17 broken `img/portraits/` refs (70 occurrences) redirected to the existing original-name files (DuFour→Hindenburg.jpg, GoodrykeFranz→PapenFranz.jpg, StaalKurt→SchleicherKurt.jpg, AskewHeinrich→BrüningHeinrich.jpg, HalsmarkErnst→ThälmannErnst.jpg, Marsden→Meissner.jpg, Trevannon→Treviranus.jpg, Stratton(Gustav)→Stresemann(Gustav).jpg, Renck→Kaas, Hawkins→Joos, Mallin→Hugenberg, Smitt→Schmidt, Bell→Hilferding, Heath→Severing, WelsRudolf→WelsOtto). 0 missing refs; 0 console 404s on load. (These remain the *historical* photographs — replacing them with original coined-character art stays a user-owned art task.)

**The baseline is good.** The coined-surname register (-moor/-well/-wick/-fax/-fell) plus Anglo-Saxon first names reads as one coherent culture; foreign casts are well-differentiated (Latin Etaluxia, Ethia, the fantasy-imperial court); the moorland toponymy (Dornwich/Stathmore/Barrowdale/Blackmoor + "Lowmoon") is genuinely systematic; instruments cross-reference cleanly (Serannus Plan ×103); and calendar discipline is near-perfect (exactly two stray real years in all display prose, both below). What follows is the residue — concentrated in the **endgame files (game_over / ending_slides), the main.scene.dry news tickers (everything there is duplicated ×2), advisors/, and joke-register scenes**.

---

## §A — Names: People

**A1 · "Halsmark" is two different people — HIGH.** One coined name covers BOTH the Central Union ruler (the Stalin figure: exiles Tarrand, aids rearmament — `wittorf_affair:11`, `schleicher_cabinet_12:362-363`, `_12_alt:92,357-359`, `main:683,705`) AND the Collectivist chairman Ernst Halsmark (the Thälmann figure, who gets arrested). It's literally self-contradictory: `wittorf_affair:27` reads "Halsmark's pressure helps to keep Halsmark from facing… consequences", and in `_12_alt` an arrested man keeps directing a foreign power. *Suggest:* coin a separate Central-Union-ruler name (e.g. **Vessarion** — Iberian/Greek register fits a foreign despot; 0 hits) and fix the wittorf line.
✎ ______OK

**A2 · The Grzesinski block — HIGH [value].** `game_over.scene.dry:263,467-472`: an entire un-reskinned victory ending ("Albert Grzesinski victorious", `president == "Grzesinski"` checks, prose). His canon reskin **Albert Grenshaw** already exists — and because the value was never updated, **the Grenshaw-president ending and its achievement can never fire** (see F3). *Suggest:* Grzesinski → Grenshaw everywhere (value + display).
✎ OK______

**A3 · Dead real-name values in game_over conditions — HIGH [value].** `game_over:407` `chancellor == "Goebbels"` (canon: Standerton) and `:242,247` conditions on "Thiel"/"Glatzel"/"Stolper" (canon: Holt/Vellt/Penn). The setters use the coined names, so these branches are silently dead; the raw names are also one `[+ chancellor +]` interpolation from the screen. *Suggest:* swap all four values to the coined names.
✎ ______OK
**A4 · Un-reskinned real officers/politicians in the main news tickers — HIGH.** All ×2 (duplicated flavour): **Johann Bredt** (`main:983,1019,1113` + dupes — recurring ECP-chairman arc), **Richard Scheringer + the "Scheringer Line"** (`main:979,1043` + dupes), **Hanns Ludin** (`main:979` + dupe). *Suggest:* Bredt → **Johan Bredwell**; Scheringer → **Richard Sherring** / "the Sherring Line"; Ludin → **Halden Ludwell** (all 0-hit checked).
✎ ______OK

**A5 · "Heinrich Mann" stale in the Left-Front ending — HIGH.** `ending_slides:346` renders "Heinrich Mann" — but the canon reskin of Heinrich Mann is **Aldric Mann** (the novelist-candidate; value `"Mann"` is fine and shared). *Suggest:* display → "Aldric Mann"; value untouched.
✎ ______Change to Godfrey Steunenberg, who in canon fits the character of Heinrich Mann.

**A6 · The styled "Ec·ken·er" still renders in the presidential files — HIGH.** The tricolor easter egg spells the real *Eckener* in `presidential_election_1932_campaign:58` (+`_alt:56`), `_candidate:567,1184-1187`, `_round_1:676,717-720`, `_round_2:644` (different markup from the library/status copies already fixed this month). *Suggest:* keep the black-red-gold styling, re-split as **Eck·ha·rt**.
✎ ______OK

**A7 · "Gunther Aveling" — MED.** `presidential_election_1932_campaign:345,351,374,698,704,707,713`: stale real first name (Gereke leftover); canon is **Garren Aveling** (16 hits elsewhere). *Suggest:* Gunther → Garren.
✎ ______OK

**A8 · Julius Curtius — MED [canon][value].** The only remaining cast member carrying a real Weimar politician's exact full name, in the same role (foreign minister). 136 corpus lines; values `foreign_minister`/`gold_leader`/`lvp_leader = "Curtius"`. The A5 pass kept him deliberately. *Suggest if you want him gone:* **Julius Curthose** (genuinely medieval — Robert Curthose).
✎ ______Curthose is good


**A9 · The Freehold cast reads modern-Anglo — MED.** The Austria-subplot principals: **Bertram Wells** (H.G. Wells collision, ~15 hits incl. foreign_policy + main), **Generals Powell and Barrett** (Colin-Powell feel, `austrian_civil_war:16`), **Executor Barker** (plain-modern), and **Colonel Marsh** — who also collides with the Golds' Marsh (she/her, a `lvp_leader` value). *Suggest:* Wells → **Weldon**; Powell/Barrett → **Powle/Barwick**; Barker → **Barwell**; Colonel Marsh → **Marbeck** (fixes the duplicate too). All display-only.
✎ ______OK

**A10 · "Hermes" — MED [canon][value].** Real Weimar politician (Andreas Hermes) AND a Greek-god/brand collision; `agriculture_minister = "Hermes"`. *Suggest:* **Harmes**.
✎ ______OK

**A11 · "Lindner Moribund" achievement — MED.** `game_over:2705,4588,6470` names the real modern politician Christian Lindner — the lone survivor of the joke-achievement reskins. *Suggest:* retitle **"Golds Moribund"**.
✎ ______OK

**A12 · "Dietrich" — decision — MED.** The A5 pass ruled Dietrich an intentional keep (medieval-legit, Dietrich von Bern). But he appears beside all-coined colleagues ("old-line members like Dietrich and Hewes", `schleicher_8:32`, `schleicher_13:15`, `_13_alt:15`; ticker "Albrecht Dietrich" `main ~1035/2331`). Keep the earlier ruling, or coin (e.g. **Deverell**)?
✎ ______Keep earlier ruling

**A13 · Lower-priority real-surname values — LOW [value].** **Prittwitz** (`foreign_minister`, 7 lines) → **Prittwell**; **Moldenhauer** (`finance_minister`, 24 lines) → **Moldren** (also: names-doc first name says "Bernhard" but the corpus says **Damon** — fix the doc row either way).
✎ ______OK

**A14 · Small display-only name polish — LOW.** (a) "Eric Gilby" (`main:1141,1145` + dupes) reads 20th-c British → **Eldred Gilby**; (b) stale alt-text "Hermann Gorrick" (`status:160`) → Ulric, "Hermann Grothmoor" (`status_right:57`) → Gorman; (c) **Siegfried** Strake duplicates Siegfried Auberon (A5c dedup breach) → **Sigebert Strake**; (d) "Carl Slack" — pool-canonical but "Slack" is a modern brand; only worth touching if he's ever promoted (**Sleath**).
✎ ______OK

**A15 · The "Roland" tangle — LOW [value].** Roland Galanides (12 hits) + Roland Ravabelle (9) share a first name, and `finance_minister = "Roland"` appears bare in a surname-slot (`election_1928:3188,3214,4032`) where it reads as a third person. *Suggest:* if the bare value means Galanides, change it to "Galanides"; otherwise give Galanides a new first (Rowan is free).
✎ ______OK

**A16 · Münzenberg compat shims — LOW [value].** The real name persists in winner/president normalization values (`death_of_hindenburg_president:979,984`; `hindenburg_explode_president:470`), invisible but real-world. *Suggest:* collapse to "Munzer".
✎ ______OK

**A17 · Names-doc hygiene — LOW (doc-only).** Stale rows still list Koch-Weser, Külz, Köhler, Schiele, Trendelenburg by their real names (0 corpus hits; reskins exist: Kells/Calder/Trennick). *Suggest:* prune or annotate the rows.
✎ ______OK

**A18 · Lethmoor vs Lenmoor — LOW.** Two near-identical coinages for different people appear in the *same* faction lists (`cvp_party_congress:438-450`, `_president:449-461`). *Suggest:* rename one (e.g. Lenmoor → **Lanmere**) — note Lenmoor is a `concord_leader`/`traditionalist_leader` value.
✎ ______OK

---

## §B — Names: Places, orgs, terms

**B1 · The un-reskinned Soviet-aid ending — HIGH.** `game_over:439` (long-civil-war ending): "The Soviet Union has aided the Communists… **Pol**and and **Czech**oslovakia have sent some assistance against the fascists" — with real-flag-colored spans. *Suggest:* Central Union / Collectivists / "the northern realms… against the Sovereigntists" / reactionaries.
✎ ______Change to the Central Union is flooding aid to the Collectivists, while other northern realms reluctantly send aid in the fight against the reactionaries.

**B2 · "Deported Gallax back to Austria" — HIGH.** `game_over:404`; the deport event itself says the Freehold. *Suggest:* "back to the Freehold".
✎ ______Back to the Freehold works

**B3 · The election_1928 rant labels — HIGH.** `:2318` is a raw un-reskinned internet rant: "oh, so now the **kpd** wants to lecture the **spd**… the **weimar republic**… **ebert**… **freikorps**… **stalin**… handed us over to **hitler**" — the single worst leak in the corpus; `:2119` is its meme twin ("'owning the libs' gone horribly wrong… Hope you're proud."). *Suggest:* replace each with one in-voice line ("We will not be lectured on betrayal by the Collectivists.").
✎ ______"We will not be lectured on betrayal by the Collectivists! The Marchers stood for progress even in the Empire of old. Collectivism wasn't even an idea until the Marchers broke open social and political progress, and now they want to stand against us and obstruct us, calling us worse than the Sovereigntists. We have steadily stood for righteous, fair governance since our founding and they'd rather let Gallax win than form a proper government of the people just to spite us! I hope they're happy."

**B4 · "European Free Guild" — HIGH.** `government_affairs/foreign_policy.scene.dry:111,176` — the EU-analogue leftover; canon is **Regional Concordant** (25 uses).
✎ ______Go with canon

**B5 · "Heidelberg Program… of 1925" — HIGH.** `advisors/hilferding.scene.dry:11` + `game_over:1462,3346,5229` (achievement subtitles). The matching achievement is already "The Exetar Program". *Suggest:* **Exetar Program**; 1925 → **4290**.
✎ ______OK

**B6 · News-ticker geography leftovers — HIGH.** All ×2 dup: **"England's banks"** (`main:1121/2417`, the Fulyria gold-standard story) → "Fulyria's banks"; **"Hessian state Assembly election"** (`main:1131/2427`) → "the **Blackmoor** state Assembly election" (ties to the Blackmoor Documents story); **"the Brandenburg section"** of the Wardens (`main:647/1935`) → "the Blackmoor section"; **"South Tyrol"** (`main:1159/2455`) → "the Perisart hills"; **"Beneduce Report"** (`main:1133/2429`, real Italian banker) → "the **Vessane Report**"; **"the slogan of the Volksrevolution"** (`main:1013/2309`) → "the People's Revolution".
✎ ______OK

**B7 · Three parties all display "Golds" — HIGH (systemic).** The DDP (`ddp_name="Gold"`), the old DVP, and the merged LVP all render "Golds" (only span hex differs). Player-visible symptoms: coalition lists can show "**Golds** + **Golds**", both liberal rows print "Golds: x%" side by side (`library:87,89`; GNU lists in `schleicher_10–17`; `schleicher_22:300,306`; assembly tables; local-election tables), and `game_over:1627` literally reads "becomes leader of the **Golds or Golds**". *Suggest:* give the merged LVP a distinct display name — e.g. **"United Golds"** — via `lvp`-side display strings (the `ddp_name` variable machinery already exists for the DDP side).
✎ ______I do not think there should be an LVP equivalent! There should never be a 'gold plus golds' type of situation, favor the color of the DDP.

**B8 · game_over/ending_slides terminology strays — MED.** (a) '"**Spartakus** Rises Again" ending' (`game_over:2469,4353,6235`) — the ending is actually titled "The Vaelists Rise Again" → say that; (b) "**Communist** victory" title (`:519`) + "communists support Bristol" (`:1657`) → Collectivist(s); (c) "Askew's **reichstag** backing" (`library:106`) → "Assembly backing"; (d) `ending_slides:137` "In **1934** President DuFour announced" → "In 4299" (one of only two stray real years; the other is B10); (e) epilogue acronyms **LDPD/NDPD/LSPD/CSRP/VSPD/SEPD** (`ending_slides:163,176,209,234,238,348,391`) end in real *-Deutschlands* D → re-letter to -C (NDPC/LDPC/…).
✎ ______OK

**B9 · Advisor-file leftovers — MED.** (a) "**AfA-Bund**" (`advisors/aufhauser`) → "the Ledger League" (white-collar Free Guild federation) or drop the proper name; (b) "officers' putsch in **1920**" (`advisors/leber:10`) → "in 4285"; (c) Bell "Originating from **Avriza, the Freehold**" (`advisors/hilferding:11`) — Avriza is a Commonwealth state; he should be from the Freehold → drop "Avriza,".
✎ ______OK

**B10 · Library demographics headers contradict the class canon — MED.** `library:251-257` uses "Working Class / old middle class / new middle class / Rural" while the whole game runs on **Commons / Burghers / Guilds / Landed**. *Suggest:* rename the headers to the canon terms, keep the explanatory glosses.
✎ ______OK

**B11 · Leftover German initialisms on reskinned org names — MED.** **WBWB** ↔ "Purl Farmers' and Winegrowers' Association" (`local_election_1932:1072-1138`, `presidential_round_1:875`) → **PFW**; **"DNV (Commonwealth National Association)"** (`main:1263/2559`) → **CNA**.
✎ ______OK

**B12 · "thousands of Gold" — MED.** `wittorf_affair:11` — currency canon is crowns (missed by the currency sweep). *Suggest:* "thousands of crowns".
✎ ______OK

**B13 · Aldermoor's two home cities — LOW.** "Mayor of **Bradford**" (`cvp_party_congress*:322/330`, `kaiser_party_congress:21`, `death_of_hindenburg_president_rubicon:182`) vs "mayor of **Calbridge**" (`death_of_hindenburg_president:168`, `hindenburg_explode_president:37`) — same man, and Bradford is a real UK city. *Suggest:* standardize on Calbridge.
✎ ______Calbridge works

**B14 · "putsch" — LOW (decision).** German loanword outside the accepted set (détente/façade/coup d'état): `boxheim:33` "collectivist putschists", `civil_war:147` "the officers' putsch in 4285". Keep as flavor, or swap to "plotters"/"the officers' coup"?
✎ ______Putsch is fine in this context

---

## §C — Tone & 4th-wall in display text

**C1 · A raw dev note ships as prose — HIGH.** `cvp_party_congress:497` / `_president:507`: "I actually don't know what to write for this guy, his **WW2** anti-Royalist plots aren't relevant at this time... I guess he supports taming the Royalists I guess?" *Suggest:* one chronicle-voice paragraph for the Goodlake result (fiscal rigor + taming-strategy sympathies).
✎ ______OK

**C2 · The rainbow "Ho-m-ox-se-ua-ls" gag — HIGH.** `center_party_conference_joos:25` — rainbow-lettered AND misspelled, in narrator voice. *Suggest:* plain text, correctly spelled.
✎ ______OK

**C3 · "Modman" easter eggs — HIGH.** Hover tooltips `title="that's me! the modman!"` ×9 (`cvp_party_congress:356,469,483` + `_president:363,479,493`; `kaiser_party_congress:44,59`; `local_election_saxony:512`) and a visible request "(If you can find an image of him… please message the modman.)" (`lvp_party_congress_1928_2_luther:177`). *Suggest:* strip all.
✎ ______OK

**C4 · "You, the player" cluster — HIGH.** "You, the player, now has free will… Spend it wisely." ×4 (`lvp_party_congress_1928_1:285`, `_1928_2_luther:200`, `_1929_1:283`, `_1930_1:283`) + "Actually, you don't. Choose Hewes right now." (`ddp_party_congress:166`) + "Well actually, you, the player, could've done something. Why did you do this?" (`center_right_coalition_reenter:19`) + the joke deadlock exchange in `ddp_dietrich_explode:179-187` ("You are no fun."). *Suggest:* rewrite each in-voice ("With no majority, the choice falls to us.").
✎ ______OK

**C5 · Internet-meme idiom in display prose — HIGH (cluster).** "another day another **banger**" (`main:619/1907`); "**It's joever**..." (`vote_of_no_confidence_joever:11`); "are they **stupid**?" / "It must **suck** for those Collectivists, but they had it coming" (`schleicher_cabinet_12_alt:289`, sibling `_12:292` — the darkest beat in the game); "**e** have been **conned, big time**" (`schleicher_cabinet_10_alt:24` — also lost its W); "**fake news**" ×2 (`schleicher_5:45`, `schleicher_cabinet_14:23`); "**Big brother watches.**" (`schleicher_cabinet_15:30`); "**Nothing ever happens.**" (`center_party_conference_kaas:56`); "be the change he wants to see in the world" (`ddp_dietrich_explode:125`). *Suggest:* rewrite each in period register (per-line proposals are in the reader notes; e.g. "…another quiet victory for the age.", "It is over.", "They brought it on themselves, the government says; cynically, we may profit…", "We have been deceived — thoroughly.", "falsehoods", "Nothing moves unwatched.", "Little is expected to change.").
✎ ______OK

**C6 · The e-commerce campaign menu — MED.** `presidential_election_1932_campaign:213-220` (+`_alt`): "Buy one campaign, get another one completely free of charge!", "Add 1 'Worker' to the cart.", "Checkout your order." *Suggest:* "Commit our organizers to…", "Dispatch the canvassers", "Confirm our plans."
✎ ______OK

**C7 · Flippant one-liners & subtitles — MED (cluster).** subtitle "Crazy stuffs." ×2 (`bourgeois_parliament_collapse:3`, `_formed:2`); "We will be the one to destroy Askew, **screw you**." (`bruning_toleration_right_collapse:23`); "You really screwed us here…" (`cabinet_reshuffled:107`); "With extra racism, of course." (`banking_crisis:23`); "**Screw this!** A civil war is necessary after all." (`schleicher_cabinet_13:295,303`); "Why the hell would DuFour allow this?" family (`election_1928:2068,2254`; `hindenburg_extention_mini:18`; `vote_of_no_confidence:100`; `schleicher_reichstag_2:69`); "Damn you, Staal!" (`lausanne_conference:133`); "Ok then." (`lvp_popfront:32`); "Who cares what coalition forms here?" (`local_election_lippe:532`); "It's their loss."×2 → "Damn." (`groko_prussia_collapse:25-26,32`); "kicks the bucket" (`schleicher_cabinet_22_alt2:13`); "- Trigger game over." / "- Nah." (`1934_end:15-16`, `death_of_hindenburg_normal:29-30`); the Dusterel hand-wave ("out of the kindness of his heart", `round_1:1263`/`round_2:699`); "The Golds also wants in." / "Huh?" (`cvp_merger*:333`). *Suggest:* soften each to the period voice (keep the game's dry irony, lose the modern slang).
✎ ______OK

**C8 · Secret-mode & dataminer meta-text — MED (decision).** The mechanic is intentional; its *voice* is dev-speak: "Secret Mode has been enabled." / "Congrats." / "A new secret candidate has been unlocked." (`election_1928:2459,2463`; `lvp_party_congress_dietrich:170`); greyed subtitles "Secret mode needs to be enabled." (`socchrist_prussia_collapse:136-140` etc.); the dataminer traps ("Please stop."×12, "Cheater.", "ok.", "I didn't even know this was possible." — `local_election_saxony:699,702`, `saxony_1933:820-826`, `local_election_france:522-559`); "The mechanic is disabled." → "Hooray?" (`schleicher_cabinet_17:24,29`); one-word "Yeah."/"Lol." easter-egg bodies (`nazi_17:221-225`, `schleicher_cabinet_13:505-511`); the wacky_weimar triple-quote sarcasm (`election_1928:2015,2025`). *Suggest:* keep every mechanic and egg, but give the player-visible text in-world phrasing ("Stranger paths are now open to us.").
✎ ______OK

**C9 · "Ketchup and Mustard Coalition" — MED.** `library:104` + achievement `game_over:2529`. *Suggest:* **"Crimson-and-Gold Coalition"** (keeps the color joke in-world).
✎ ______OK

**C10 · Modern jargon — LOW.** "clear ecological limits to their continued growth" (`nazi_peak:25`) → "the natural limits of their support"; "best described… as schizophrenic" (`schleicher_cabinet_20:100`) → "incoherent beyond mapping"; "Print a SPDillion dollars." (`advisors/wels:58`, cheat-gated) → "Print a Marchillion crowns."
✎ ______OK

---

## §D — Display-logic slips (the text shows the wrong thing)

**D1 · A boolean prints instead of a name — MED.** `hitler_cabinet_1:32,63`: "[? if concord_formed: **[+ concord_formed +]**?] is personally assured…" renders "1". *Suggest:* use the Concord leader variable.
✎ ______OK

**D2 · Wrong-party / wrong-person slips — MED.** (a) Gesling shown as "formerly of the **Golds**" in DDP color (`hindenburg_explode_president:279,409`; he's ex-`[+ddp_name+]` at :74); (b) "failed to persuade the Golds to back **Bristol**… even with Eckhart at the head of the ticket" in the Eckhart branch (`candidate:1227`, `round_1:764`); (c) @round2_reactionary_2 displays the *primary* reactionary's name when the player picked the secondary (`round_1:1092`); (d) "won the vote to succeed **Lytton**" where the predecessor is Hewes/Coalfax (`lvp_party_congress_heuss:235`, `_dingeldey:235`); (e) `nazi_17:122` says "the usual political violence marked that day" — inverted (the day was eerily calm) — and `:168` "Gallax is **bought** back from the Freehold" (brought).
✎ ______OK

**D3 · The garbled restoration beat — MED.** `hindenburg_explode_referendum:81,106-108` and `schleicher_cabinet_22_alt:147,171`: "So much for nothing." + a broken sentence that also calls Goodryke "the former chancellor" confusingly, + "An **inpatient** DuFour". *Suggest:* rewrite the paragraph ("Goodryke's reasoning is unknowable, but perhaps he hoped that with the Empress's crown restored, the people might rally to the throne…").
✎ ______OK

**D4 · Minor conditional/text slips — LOW.** (a) `kellogg_briand:14×2,26` "bringing the Ethian to consider withdrawing" — missing noun; (b) `cvp_party_congress:257,259` (+_president) Fringe/Marginal thresholds overlap → "Fringe Marginal" can print together; (c) `nazi_14:91-95` + `nazi_16:53,66` — both branches of a `stegerwald_path` conditional emit the identical word "Faithful" (dead conditional).
✎ ______OK

---

## §E — Reskin scars (mechanical sweeps, one approval each)

**E1 · Sentence/heading-initial lowercase "the Commonwealth" / "the Banners" — MED (systemic).** The Germany/Reichsbanner swaps never re-capitalized at sentence starts. ~25 known sites (`hitler_takes_power:32`, `hitler_chancellor:34`, `hitler_cabinet_1:54,145`, `hitler_cabinet_dead:103`, `london_economic_conference:19,20,30`, `papen_lausanne_conference_2:2,51`, `return_to_normalcy:11`, `papen_civil_war:178`, `reichsbanner_unpopularity:1,20`, `papen_cabinet_reichstag_3:148`, `schleicher_19:233`, `schleicher_cabinet_12:572`, `_16:21`, `schleicher_2:26`, `ending_slides:257,285`, `game_over:432,437`, `library:32`, `main:1071,1121`+dupes, `death_of_hindenburg_president:173,934,942`, `cabinet_sacked:14`, `cabinet_sacked_bruning:14`, `civil_war:177`). *Suggest:* one scripted sweep — capitalize after sentence-enders and at heading starts.
✎ ______OK

**E2 · Doubled-article family — MED (systemic).** "a **the** Banners training manual" ×4 (`sa_ban_pre:43,53,66,75`); "a militant/militarized **the** Banners" (`reichsbanner_lvp:26`, `reichsbanner_zentrum:25`, `prussian_coup:27`); "Our **the** Poorman's Pension" ×2 (`unemployment_insurance_weimar:2,14`); "the **the** Arcanists" ×2 (`hindenburg_explode_president:68,399`); "accept the **our** intervention" (`labor_unrest:29`); "rural **the** Commonwealth" ×4 (`cvp_party_congress:342`, `_president:349`, `ddp_party_congress:161`, `dnvp_party_congress_3_lambach:69`); "a fair **the** Commonwealth" ×4 (`cvp_merger*:249`); "a Faithful, democratic, Commonwealth, and social **the Commonwealth**" (`candidate:419`). *Suggest:* fix all listed sites.
✎ ______OK

**E3 · "Name (same Name)" collapsed parentheticals — MED (systemic).** The original German-name/translation pairs now repeat themselves: "*Commonwealth People's Conservative Party* (Commonwealth People's Conservative Party)" (`cvp_merger*:318/321/324/325`; `kaiser_party_congress:29,42,57`; `z_right_party_congress:30,41`); "The Golds (Golds) has officially been founded!" (`lvp_party_congress_1928_0:11`, `_1929_0:11`, `_1930_0:12`); "Commonwealth National Unity Front (Commonwealth National Unity Front, GNU)" (`schleicher_8:19`). *Suggest:* replace the parenthetical with the short form — "(the **Concord**)", "(the **GNU**)" — or drop it.
✎ ______The GNU works

**E4 · Broken-sentence list — MED.** `bruning_joever:65-69` (three broken sentences at the Goodryke beat) + `:13` ("at Vera… at Vera"); `dnf_collapse_center_right_coalition:12` / `dnf_collapse_right_coalition:14` / `_lvp:12` (duplicated "would be highly unpopular" predicate); `emergency_decree_bruning_alt:74,132,196` ("drop the decree!, The group argues"); `emergency_decree_bruning:131`/`_alt:130` (missing "by"); `emergency_act_bruning_alt:14` ("at for the middle class"); `kpd_vote_of_no_confidence:37` + `election_1928:2289` ("launches almost immediately launch"); `saxon_collapse:77` (split sentence before "Red Dornwich is restored!"); `schleicher_cabinet_4:57-59` (draft-grade paragraph); `schleicher_19:24` ("palate" → placate); `lvp_merger_1930_2:53` (unclosed quote); `local_election_saxony_1930:741` (dangling comma); `papen_cabinet_reichstag_4:67` ("defeat to" → defect); `papen_cabinet_reichstag_3:111,144` ("has trick", "but however"); `hoover_moratorium:14` + `lausanne_conference:116` ("accomplishment… accomplishment"). *Suggest:* fix all listed.
✎ ______OK

**E5 · Pure-typo roll-up — LOW.** ~30 one-word typos across the corpus ("renowed", "goverment" ×2, "an Marchers" ×2, "apart of" ×5, "as as candidate", "stanch", "Standerton'", "civl war" ×2, "particulary", "clings on onto", "Perhaps its our time" ×2, "bloc partys" ×2, "we won't have much allies" ×2, "The Golds are themselves are split", "however…however", "impossible-to-forsee", "Staal and Glade goes years back", "an Harlow", "(With Crowde's still…)", "Hopefully he Royalists", double periods, the cosmetic stray "nd" in `campaign:840` — mechanically harmless, dendry recovers it). *Suggest:* one copyedit commit; full site list in the reader notes.
✎ ______OK

---

## §F — Mechanics & features

**F1 · Heartland elections have no mechanical output — HIGH (the biggest fix in this audit).** `events/prussia_election_1928.scene.dry` computes results into dynamic `_prussia` variables (lines 174-263) but every consumer reads `_heartland`: seat shares `marcher_r_heartland` are only ever written once at game start (`root:407`), `marcher_votes_heartland` has **zero writers**, and the results table (lines 775-800) displays the never-written vars — so recurring Heartland elections neither change seat shares nor show core-party results. Two compounding bugs in the same file: the adjustment-factor reads use `_prussia` while writers use `_heartland` (always 1.0), and the per-year swing dicts (lines 47-137) are keyed by **old party ids** (`spd, kpd, nsdap…`) that no longer match `Q.parties` (only `ddp`/`other` still hit). Saxony/Thuringia/Lippe are fine. *Suggest:* add a handoff loop copying `_prussia` → `_heartland` after step 3, align the factor suffix, re-key the three dicts.
✎ ______Do whatever is needed to fix this to properly work, if the suggestion gets the Heartland working then go ahead and fully implement.

**F2 · The magi rework replaced writers but not readers — HIGH.** The card now sets `magi_registry_repealed`/`magi_circles_recognized`/`magi_protected`, but 8 sites still gate on the never-written legacy flags `homosexual_rights`/`repealed_175`/`reformed_183`/`trans_rights`: the Harnfell achievement (`game_over:83`) is **dead**, the advisor-slot bonus (`post_event:1387`) is dead, the kulturkampf go-to (`election_1928:3190,3216`) and the Banners `@homosexual` section (`reichsbanner:64-65`) are unreachable, plus `center_party_conference_joos:3` and `hirschfeld:10`. *Suggest:* set the legacy flags alongside the magi flags in `government_affairs/homosexual_rights.scene.dry` (one-line fix) — or port all 8 readers.
✎ ______set legacy flags

**F3 · Achievements: 5 unobtainable, 12 uncounted — HIGH.** `deport_gallax`, `gallax_tot`, `nach_staal_wir`, `women_banner` are in the 125-entry display array but granted nowhere — the scenes still grant the *old* ids (`deport_hitler`, `hitler_tot`, `nach_schleicher_wir`, `women_reichsbanner`), which are earned but never shown; `heuchelei` has no granter at all (max completion = 120/125). Separately, 12 legacy-granted names (`constitutional_coalition`, `ddp_*`, `dstp_*`, `reichskonkordat`) are earned but not in the array. Also fold in A2: the Grenshaw ending/achievement blocked by the stale "Grzesinski" value. *Suggest:* rename the 4 grant-tags, give `heuchelei` a granter (or drop it), reconcile the 12.
✎ ______OK

**F4 · The Freehold civil-war epilogues can't fire — HIGH.** `ending_slides` branches on `long_war` (:80, :259), `long_war_2` (10 inline-ifs), `force_peace` (5 inline-ifs) — none is ever written; `austrian_civil_war` sets differently-named flags (`austria_civil_war`, `austria_peace`), which are themselves write-only. All Freehold epilogue variants collapse to the default text. *Suggest:* set `long_war`/`long_war_2`/`force_peace` in the corresponding `austrian_civil_war` branches.
✎ ______OK

**F5 · The 1934 new-year event is dead — HIGH.** `1934.scene.dry:6` gates on `year >= 4299` — a display-year pasted into logic (the engine year runs 1929-1934; siblings use `year = 1933` etc.). *Suggest:* `view-if: year >= 1934 and month >= 1`.
✎ ______OK

**F6 · An unwritten event is still wired in — HIGH.** `popular_front_dispute` is blank (8 bare `@` stubs), its `#tags: event` is disabled, but `root.scene.dry:743,769` still references the id. *Suggest:* write it or delete it and purge the root references.
✎ ______Hold for now, check what that event fires on and see if it is needed before we delete.

**F7 · The Convention metrics can go stale — MED.** `stability`, `military_readiness`, `commonwealth_standing`, `reunification_support` are computed **only when the player opens the Status screen** (`status:22,28,34,41`); `ending_slides:54-56` falls back to defaults (33/50/0) — so a player who rarely checks Status reaches the Convention with stale/default values feeding the empire-outcome matrix. *Suggest:* move the four formulas into `post_event` (per-turn) or recompute at the top of `ending_slides`.
✎ ______Per turn works

**F8 · Rename-seam gates that silently disable logic — MED.** (a) `staal_parliament_trigger` (`election_1928:2060`) has **no writer** — the "Staal accepts parliamentary backing" option is permanently greyed with its taunting subtitle; (b) `army_marcher` never written → the WTB army-reaction riders (`economic_policy:104-150`) never fire (likely meant `army_minister_party == "M[[Commonwealth_Fit_and_Feature_Audit]]archer"`); (c) `emergency_decree_mitigate` (`bruning_second_cabinet_alt:4`) is missing its final `d` → the alt collapse fires even when mitigated; (d) `marcher_campaign_1932` (`campaign:562`) never written (near-miss of `marcher_candidate_1932`) → the Westmore-rallies option shows even when the Marchers run their own candidate; (e) `z_drop_out_2` + `unionist_success_marcher` (`round_1:1104,708`) — missed Zentrum renames; (f) `duesterburg_majority` dead go-to (`round_1:670`); (g) the Coalfax comparison `!Q.gold_leader != "Coalfax"` (`saxony_1933:105`, always-true) + `bourgeois_coalition_saxon` typo (`saxony_1933:926`). *Suggest:* fix all — each is a one-line repair.
✎ ______OK

**F9 · Dead knobs (written, never read) — MED.** (a) The four Saxony outcome flags (`saxony_collectivist`/`_soclib`/`_royalist_maj`/`_marcher_splinter`, 17 writes each) have zero downstream consequence — Red Saxony never echoes nationally; (b) `post_event` recomputes four Heartland coalition aggregates every turn (`cordon_sanitaire_heartland` 80w, `right_heartland` 55w, `progressive_coalition_heartland` 40w, `gallax_right_coalition_heartland` 20w) that nothing reads; (c) `mefo_bills` (shadow financing) has no consequence; (d) `bourgeois_merger_timer` + `papen_chancellor_timer` tick with no consumers, while `papenomics_timer` is *gated on but never set* and `papenomics` itself has no inbound path. *Suggest:* (a) wire at least Red-Saxony into a national event or accept as flavor; (b) consume or delete; (c) feed into inflation/an ending clause or drop; (d) delete the dead timers, decide papenomics (re-enable or remove).
✎ ______Red Saxony into national event works. Consume works. Feed mefo bills into inflation I suppose, I am ambivalent on this. Papenomics can be deleted.

**F10 · The deferred Empress-vs-Gallax choice — MED (decision).** Confirmed: no explicit player decision exists in the Rubicon endgame — the Empire linkage runs entirely through the automatic `gallax_empire_end` flag. This was consciously deferred ("C4") during Track-D. Build it, or close it as out of scope?
✎ ______out of scope

**F11 · Shallow axes (depth check) — MED (design decision).** The variable-flow census verdicts: **military axis deep** (army/coup/paramilitary vars: 25-139 writes, 53-206 reads — load-bearing), `empire_posture` + `commonwealth_standing` load-bearing; but **`magi_balance` is moved by exactly one card** yet carries 0.25 weight in `reunification_support`; `bvp_relation` is written only inside the Magi card and read nowhere (cosmetic); `stability`/`military_readiness`/`reunification_support` are endgame-only inputs (see F7); `dufour_faith` and `imperial_collusion` are thin (3-5 reads). *Suggest:* add 1-2 more `magi_balance` movers (an event + an advisor option), either use or drop `bvp_relation`, and consider one mid-game event that *shows* the player their standing with the Empire so the axis is legible before the Convention.
✎ ______We should expand more on this after, make it a larger backlog item.

**F12 · Content stubs & missing outcomes — MED (per-item calls).** (a) `schleicher_reichstag_7:12,38` — a climactic no-confidence vote resolved in two jokey lines ("Let's cut to the chase." → "It succeeds."); (b) `papen_joever` — Goodryke's fall is one paragraph, zero choices, trailing `# TODO`; (c) `harzburg_front(_dnf):19-25` — the @strategy option resolves in two flat lines + TODO; (d) `nazi_10:43` / `nazi_11:39` — TODOs mark genuinely missing sibling outcomes (each has a single forced choice); (e) `kpd_policy:78-111` — half-built (empty sub-scenes), currently disabled — finish or delete; (f) `nazis_in_crisis` — disabled dead twin of `return_to_normalcy`, referenced nowhere — cut; (g) `schleicher_cabinet_12_alt:513,558` — @spd_win/@spd_med can present an **empty choice list** if the Unionists don't break (sibling `_12` has the fallback this file lacks); (h) `kpd_ultimatum:105` "We were so kind." + `groko_prussia_collapse:32` "Damn." — one-word outcome bodies; (i) `schleicher_cabinet_8` — the two Commonwealth-Bank branches have identical bodies (differ only by portrait).
✎ ______

**F13 · Misc low-priority mechanics — LOW.** (a) `warden_paramilitary` written but never displayed (loyalist counterpart is) — display or remove; (b) `rubicon_timers` omits `royalist_decay`/`stegerwald_transformation`/`bourgeois_negotiations_1930(_aftermath)` — mid-flight countdowns freeze forever during Rubicon (confirm intent); (c) the super-secret `heartland_leader = "joavig"` renders verbatim lowercase in Status/Library — capitalize/style if kept; (d) `harzburg_unity` gates are vacuous (mechanic never implemented) — remove or implement; (e) spot-check `is_unity_candidate` (×30 writes) and `panzerkreuzer_b_funded` (×10) — both look like they were meant to matter; (f) ~120 other write-only bookkeeping flags: harmless, ignore.
✎ ______Remove warden paramilitary then. Mid-flight countdowns freezing those seems right. Capitalize heartland. Remove harzburg unity mechanic. We can ignore the unity candidate + panzerkreuzer_b

---

## §G — Verified healthy & known-open

- **Cards:** deck logic sound; all 63 cards reachable; card timers all present in `Q.timers` (incl. the new defense_appropriations / imperial_relations); no stub cards — the thinnest (Defense Appropriations, 2 choices) still has real effects.
- **Advisors:** all 28 load-bearing, 2-8 substantive sections each; no stubs.
- **Crisis cascade** (veran_crash → paralysis → fall_of_ivion): verified — always fires, cannot stall.
- **Achievement count**: the historical off-by-one is resolved (125 array = 125 display gates); the real gap is F3.
- **"Moscow"**: clean (credits + lore doc only). **Calendar**: near-perfect (2 strays, both flagged in §B8/§B9).
- **Known-open, user-owned:** the 1934 election balance knobs (`dufour_endorse_boost = 0.03`, `red_scare`, convince thresholds 55/45/35) — playtest before touching.
- **Deliberate, untouched:** //-comments, #-citations, img/asset filenames, credits/modinfo, internal variable names (however meme-y), loanwords détente/façade/coup d'état, the republic-colors letter motif, the "Cole und Eikenvorst" pun, light in-world achievement humor.
