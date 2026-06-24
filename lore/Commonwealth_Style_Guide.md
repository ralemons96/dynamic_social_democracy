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
| Communists / the KPD / Marxists | the Collectivists |
| fascists / Nazis / the far right | the Royalists / the Restorationists |
| reactionary monarchists / the DNVP | the Traditionalists |
| "class struggle" | the struggle of the Commons against the merchant-barons, reactionary generals, and old elites (avoid bare Marxist framing) |
| reparations / the war debt | the War Loans (owed to Ethia) |
| Versailles / the Diktat / the peace terms | the settlement imposed after the Great Wars |
| the World War / the Great War | the Two Great Wars (Axton vs Ethia & the Allied States) |
| the army / the Reichswehr / the General Staff | the Commonwealth Army / the General Staff (Wright, Staal, Ravabelle) |
| revolution of 1918 / the founding | the Founding (the Commonwealth's birth from the Empire's collapse) |

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
