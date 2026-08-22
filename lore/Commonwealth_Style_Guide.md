# Commonwealth Style Guide — the prose-voice keystone

The reference that makes the second-pass batches consistent and partly scriptable. Grounded in
[Commonwealth_Lore_Compact.md](Commonwealth_Lore_Compact.md); names in
[Commonwealth_Character_Names.md](Commonwealth_Character_Names.md). When reskinning any event,
translate the vocabulary, weave in the lore hooks where natural, and purge everything on the
blacklist.

## The world in one breath
Athar, a generation after the Axton Empire fell at Ebongate (its God-Emperor **Reikzar Scilos**
assassinated, ascending as the **God of Magic**). The **Commonwealth** is the republic in the old
imperial core (capital **Axton**) — larger and richer than the rump **Empire-in-Exile** to the
north beyond **Stathmore**, where **Empress Jacqueline Scilos** waits, rearming, her court split
between her own reconciliation faction and the Hardliners who want conquest. **Ethia** (capital
**Vera**, the continental financial centre) is the western frenemy who holds the Commonwealth's
**War Loans**. The republic was **born ~13 years ago** from a power vacuum, so its legitimacy is
contested. Two of the four movements want it to endure (Reformist, Unity Front), two want it to
fall (Restorationist, Collectivist).

## Vocabulary map (Weimar → Athar)
| Weimar term | Athar term |
|---|---|
| Germany / the Reich / the nation | the Commonwealth |
| the Weimar Republic / the republic | the Commonwealth (or "the republic" — fine, generic) |
| the Reichstag / parliament | the Assembly |
| workers / the proletariat | the Commons |
| the new middle class / petit-bourgeois | the Burghers |
| the old middle class / artisans-shopkeepers | the Guilds |
| Catholics / the pious | the Faithful |
| Junkers / aristocratic estates / the rural nobility | the Landed / the great landed houses |
| the unemployed / the destitute | the Disfavored |
| bourgeois parties / the propertied right | the Unity Front (Golds + Unionists) / the propertied parties |
| Social Democrats / the SPD | the Marchers |
| the left-revisionists / neorevisionists | the Knights |
| Communists / the KPD | the Collectivists |
| fascists / Nazis / the far right | the Royalists / the Restorationists |
| reactionary monarchists / the DNVP | the Traditionalists |
| "class struggle" | the struggle of the Commons against the merchant-barons, reactionary generals, and old elites (avoid bare Marxist framing) |
| reparations / the war debt | the War Loans (owed to Ethia) |
| Versailles / the Diktat / the peace terms | the settlement imposed after the Great Wars |
| the World War / the Great War | the Two Great Wars (Axton vs Ethia & the Allied States) |
| the army / the Reichswehr / the General Staff | the Commonwealth Army / the General Staff (Wright, Staal, Ravabelle) |
| revolution of 1918 / the founding | the Founding (the Commonwealth's birth from the Empire's collapse) |

## Ideology / creed taxonomy (A4 — the in-world -isms)
The real-world ideologies map to Commonwealth **creeds** (the party names are separate, above —
these are what parties and characters *profess*):
| Real-world -ism | Commonwealth creed | Notes |
|---|---|---|
| socialism / socialist | **Reformism / Reformist** | the broad-left creed — a more classless society *via* democracy. The Marchers are its party; the Golds & Unionists have moderate-Reformist (left-liberal) wings. |
| communism / communist | **Collectivism / Collectivist** | "radical, often violent Reformism" — the Collectivists' creed. |
| Marxism / Marxist / Marx | **Vaelism / Vaelist / Vael** | after **Corwin Vael**, the founding theorist; "**Vael and Bell**" = the theorists (ex-Marx & Engels). The *person* "Wilhelm Marx" is unrelated → renamed **Wilhelm Croft**. |
| fascism / Nazism / National Socialism | **Imperial Sovereigntism** (adj. **Sovereigntist**) | the Royalists' creed: restore the absolute-Emperor Axton system — power devolved paternalistically to weak advisory assemblies, appointed bureaucrats, and loyal feudal subjects. |
| (Traditionalist creed) | **Aristocratic Nationalism** | → **Paternal / National Democracy** if they moderate into a parliamentary party; → **Feudal Nationalism** if they hardline. |
| (Collectivists under the Conciliators) | **Radical Reformism** | drops the violent aspects of true Collectivism. |
| democracy / democratic; Liberal / Conservative | *(unchanged)* | the Golds & Unionists are "the democratic parties"; Liberal/Conservative = real-world left/right slant (esp. the Golds' wings). |

**Collision fix:** the broad creed is now "Reformism", so the Marchers' moderate internal **faction**
was renamed **Reformists → Revisionists** (Bernsteinian; pairs with the existing Neorevisionists).
The `reformist_strength`/`_dissent` variables stay internal.

## Other A4 vocabulary (variables unchanged — display only)
- **Paramilitary labels**: **SA → the Loyalists**, **RFB → the Vanguard** (`loyalist_strength`/`vanguard_strength` vars stay; Banners/Wardens already done).
- **State / church terms**: Reichsexekution → **Commonwealth Intervention**; Reichskommissar → **Commonwealth Commissioner**; Reichskonkordat → **Temple Concordat**; the Vatican → **the Temple of the Faithful**.
- **bourgeois / bourgeoisie** → **propertied** (adj.) / **the Burghers** (the propertied order); `bourgeois_coalition` var stays.
- **German loanwords**: Volksgemeinschaft → "national community"; Mittelstand → "middle class"; Gleichschaltung → "consolidation"; the Kapp / Beer-Hall Putsch → the officers' / Avriza putsch.
- **Library**: the German party-name italics (*Sozialdemokratische Partei…* etc.) are cut, keeping the English formal name.

## Lore hooks (weave in where natural — don't force)
- **The magi** — a distrusted caste among the Disfavored; great workings invoke the dead God-Emperor, so open spellcraft reads as royalist. **Arcanists** (mage-circles) and **Eternals** (wealthy undead) lean monarchist; ordinary magi are apolitical. (Mechanics: `magi_balance`.)
- **The Empire-in-Exile** — Empress Jacqueline (moderate, wants reunion-by-treaty) vs her Hardliners (want conquest); undead legions; rearming. (Mechanics: `empire_posture`, `reunification_support`.)
- **The God of Magic / Reikzar** — the ascended God-Emperor; his cult radicalises; the Faithful fear it.
- **The Faithful** — order-loving temple-goers, wary of the magic-cult.
- **Ethia & the War Loans** — Vera's banks; a frenemy that may prey on a weak Commonwealth (feeds `west_relation`).
- **Omen** — the Commonwealth's anti-Axton intelligence service.
- **Geography** — Axton (capital), Ivion (contested isle), Stathmore (northern frontier), Vera (Ethia). Generic locales: Bradford, Hollyhead, High Cross, Ilot (near capital); Purl, Dianoia, Myserta (north); Exetar, Abysm (west); Avriza, Sonoran (east); Dornwich, Lomlyn, Perisart (south).

## Real-world blacklist (purge in Track A)
- **People**: Hitler, Mussolini, Stalin, Lenin, Trotsky, Hess, Liebknecht, Luxemburg, Bebel, Kautsky, Noske, Röhm, Goering, Hoover, Roosevelt, Churchill, Franco, Victor Emmanuel, Kiesinger, Stoecker, Schacht, and every other historical figure → cut or rename per the names doc.
- **Places / polities**: Germany, the Reich, Versailles, Danzig, the Polish Corridor, the Rhineland, the Saar, Anschluss, Austria, France, Britain/England, Poland, Italy, Spain, the Soviet Union/USSR/Russia, the Kuomintang, Geneva, Lausanne, London, Paris, Moscow → Athar equivalents or cut.
- **Events**: WWI/WWII, the Spanish Civil War, the Cold War, the Young Plan (→ War-Loan renegotiation), Kellogg-Briand, the Cartel des Gauches/"Left Cartel", the Lateran/Concordat.
- **Years**: any real-world year (1919, 1933, 1936, "the 1950s", …) → the Commonwealth calendar (`year_display = year + 2365`, so 1928→4293; the Founding ≈ 4280) or vaguer phrasing ("within a decade", "a generation on").

## Premise-event dispositions
See the plan file's Track B table (`local_election_france`→Ethia election; `austrian_*`→neighbouring sister-republic or cut; `young_plan_*`/`lausanne_*`→War-Loan talks; `hoover_moratorium`/`kellogg_briand`→reskin-or-cut; `prussian_concordat`→Heartland–Faithful accord; `london_economic_conference`→generic).

## Character names
Canonical names live in [Commonwealth_Character_Names.md](Commonwealth_Character_Names.md).
**OPEN ITEM:** the lore compact specifies first names for several leads (Felicity Sarrow, Joran
Vesh, Calbert Yardley, Vendrin Bell, Joshua Heath, Erric Tarrand, Lyle Bristol) — and a gender
(Felicity Sarrow is a woman) — that diverge from the Fix-2 names. Pending the user's decision on
whether to adopt the lore-compact names (and the pronoun work that implies), this section will be
reconciled before the Track A2/A5 name sweeps.

## Register — how the prose sounds

The house voice is a **briefing, not a scene.** It reports what happened, who did it, and what it
means for the party, in plain declarative sentences. Most of the inherited game is already in this
register; the drift came from port-era additions written in a more literary voice. This section
exists so there is a rule to check against.

The reference is the owner's rewrite of `events/collectivist_memo.scene.dry`. The same paragraph,
before and after:

> **Drift:** *It is not a leak so much as a document that stopped being kept carefully. Someone in
> the Collectivist apparatus let a circular reach a friendly printer, and from there it reached us:
> an internal statement of the line, set out at more length than the party press would ever print.*
>
> **House style:** *With the call for fresh elections, someone in the Collectivist apparatus let a
> circular reach some of our friends in our Left.*

Seven rules, each of which that pair demonstrates:

1. **Report. Don't narrate.** State the event and its consequence. No literary present tense, no
   "it begins with a banker, then a shipping family."
2. **Anchor to the game, not to atmosphere.** "With the call for fresh elections" ties the event to
   something the player just saw. "A friendly printer" ties it to nothing. Prefer the concrete
   cause, the named faction, the named person.
3. **Kill the rhetorical constructions:** "not X so much as Y" / "not X but Y" openers; paragraphs
   opening "It is" + abstract noun; tricolons; the closing aphorism; and the **spaced em-dash used
   as a rhetorical pivot** (`depends, in no small part, on us — for a Commonwealth that...`).
   Measured: the inherited game does use em-dashes, about 5 per thousand words, but tight-set and
   for plain parentheticals (`credit for the achievement—much to the detriment of`). The drift is
   the spaced pivot: 28 of the 30 spaced em-dashes on this branch are port-era. Prefer commas and
   full stops; a tight parenthetical em-dash is acceptable where the original author would use one.
4. **Name the mechanism.** Say *the Conciliators*, *Halsmark*, *electoral abstentionism*, not
   "a wing of that party, not small and not new." Using the game's names teaches the system.
5. **Say what the effect is.** A response's prose should make clear what moved and why. Plain prose
   can carry the mechanic; literary prose hides it.
6. **Choice titles are imperatives; outcome titles are plain statements.** *Ban the demonstrations.*
   *Take action to stabilize the economy!* Not *"Then we go to Cainholde together."* or
   *"It is hard to forget the past."*
7. **Length is fine; texture is not.** The register is about sentence shape, not word count. Do not
   compress a four-option event into two lines to hit the style.

`tools/prose_check.mjs metrics <files>` reports em-dash density and the named constructions per
file; `tools/prose_check.mjs structure <files>` confirms a rewrite changed no logic line.
