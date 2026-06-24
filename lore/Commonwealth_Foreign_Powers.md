# Commonwealth — Foreign Powers & Places (canon)

The world beyond the Commonwealth, for the A3 (places) reskin and the Track-B foreign events.
The relation **variables stay internal** (`west_relation`, `east_relation`, `soviet_relation`);
only the player-facing NAMES change. See [Commonwealth_Lore_Compact.md](Commonwealth_Lore_Compact.md)
and [Commonwealth_Style_Guide.md](Commonwealth_Style_Guide.md).

## The West (`west_relation`)
- **The Ethian Empire** — capital **Vera** (the continental financial centre); holds the
  Commonwealth's **War Loans**. The great western power; a frenemy (shares fear of Axton, but may
  prey on a weakened Commonwealth). The France analogue.
- Other western realms: the **Kingdom of Etaluxia**, the **Vegrean Kingdom**, the **Kingdom of Fulyria**.

## The North (`east_relation` — the old "East", renamed "the North")
- The **Allied States** (scattered, weakened republics; can be made friendlier through negotiation),
  the **Kingdom of Cinderwall**, the **Republic of Highharbor**, the **State of Vohz**, **The Citadel**.
- NOTE: the **Empire-in-Exile** also lies to the north (beyond Stathmore) but is the existential
  threat tracked by `empire_posture` / `imperial_fear` — NOT `east_relation`. "The North" as a
  diplomatic partner = the Allied States and the northern realms; "the Empire" = the threat.

## The Central Union (`soviet_relation`)
- A radical state ruled by the equivalent of radical Collectivists. **A middling, politically
  isolated power — NOT a Soviet-scale superpower.** It is an *example* to the Commonwealth's
  Collectivists, never their patron: the Collectivists are politically **allied but independent**
  of the Central Union's ruling government, and the Union does not dictate terms to them.
- Mechanics (the old Soviet ones): trade/exports + covert **rearmament** (the old "Rapallo"
  accord). Being friendly with / sending aid to the Central Union **pleases the Collectivists**
  (and can help bring their Conciliator, **Falconne**, forward) but **angers the rest**. Keeps the
  `soviet_relation` variable + its small endgame-score input.

## The Republic of the Freehold (the Austria analogue)
- A **southern republic** bordering the Commonwealth. Gets the **customs union** (the Track-B
  `austrian_customs_union` reskin). Brewing a late-game **civil war**: its **monarchists** (the
  Austrofascist-equivalent) move to overthrow its republican movement, the **Liberty Movement**
  (the SDAPÖ-equivalent). A cautionary parallel to the Commonwealth; the player can support the
  Liberty Movement.

## The Treaty of Etaluxia (Versailles)
- At the Founding, the nascent Commonwealth and some neighbours were saved from collapse — the
  **Axton Empire** invading from the north, **warlords in the east**, and general economic ruin —
  by the **Ethian Empire**, which imposed a massive, predatory **War-Loan** system in return. Deeply
  unpopular. **Restorationists call it a betrayal**: had the Commonwealth sided with its kin in the
  Axton Empire, they say, none of it would have happened — the root of the "stabbed-in-the-back"
  and "national slavery" narratives.

## The Regional Concordant (the EU / integration path)
- Requires good relations with **the West and the North**, and the **War Loans settled**. The War
  Loans cannot be settled until the **Ethian Empire** resolves its **succession crisis** (replaces
  the France-election event). The **Ethian Ducal Council** elevates one of:
  - **Edwyn Validar II** — a known Commonwealth sympathiser (the Left-Cartel result).
  - **Martyn Validar II** — centre-right (PRS + PRRRS + AD); friendlier to the Empire-in-Exile but
    will still allow the War Loans to be cancelled.
  - **Quintis Ticinius** — *"impossible"*: a great friend of the Commonwealth who advocates
    partnership, but intolerable to most Validar loyalists (should never happen).
  - **Servius Validar** — *"impossible"*: a friend of Empress Jacqueline; a disaster, and the
    Ethian Dukes would never tolerate an Axton-supporter.

## Dropped / folded
- **The United States** (Hoover, Roosevelt, the London conference) — **dropped**; fold mentions
  into the **Allied States**.
- **The Vatican / Concordat** → the **Temple of the Faithful** (begun in A2d).

## Flavour-place mappings (A3b)
| Real | Commonwealth |
|---|---|
| Rhineland (Ethian-occupied border) | an occupied western march — **Exetar** |
| the Ruhr (industry) | a Commonwealth industrial belt |
| Altona / Hamburg (working-class port) | **Abysm** (western port) |
| Vienna | the Freehold's capital |
| Paris | **Vera** (Ethia) |
| London | a western capital (**Etaluxia**) |
| Rome / Italy, Spain, Yugoslavia, Greece | drop / generalise |
| Geneva / Lausanne | an Athar summit |
| Moscow | the Central Union's capital |
| Boxheim (documents) | "leaked coup documents" |

## Regional states (done in v1; internal vars stay `saxony_*` etc.)
Prussia → **Heartland** · Saxony → **Dornwich** · Thuringia → **Stathmore** · Lippe → **High Cross**
· Bavaria → **Avriza** · Württemberg → **Purl**.
