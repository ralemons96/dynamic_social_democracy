// Component-wise identifier rename for the Commonwealth port (spec §1).
// Identifiers are split on `_`; multi-token phrases are matched first, then single
// components are mapped. Unknown components pass through untouched. NEVER do a blind
// substring replace — single-letter (`z`) and overlapping (`dvp`/`ddp`) tokens would
// corrupt unrelated identifiers, so all mapping is component-wise.

// Two-token (or more) phrases, applied before single-component mapping.
// Needed where a multi-word base token maps to a different multi-word token, or
// where two tokens collapse to one (new_middle -> burgher).
const PHRASES = [
  [['new', 'middle'], ['burgher']],
  [['old', 'middle'], ['guild']],
  [['black', 'thursday'], ['veran', 'crash']],
];

// Single-component map. Tokens NOT present here pass through unchanged — this is how
// inert/deferred parties (ddp, lvp, kvp, dnf, bvp), the catch-all (other), splinters
// (sapd, dsu, nvf, rdp, dstp, fkp), and `loyalty` are preserved.
const SINGLE = {
  // parties (player + rivals)
  spd: 'marcher', kpd: 'collectivist', nsdap: 'royalist', dnvp: 'traditionalist',
  dvp: 'gold', z: 'unionist', cvp: 'concord', dnef: 'gnu',
  // voter blocs
  workers: 'commons', catholics: 'faithful', rural: 'landed', unemployed: 'disfavored',
  // figures / factions / subsystems / flags
  nazi: 'royalist', prussia: 'heartland', prussian: 'heartland', schleicher: 'staal',
  hindenburg: 'dufour', hitler: 'gallax', reichsbanner: 'banner', neorevisionist: 'knight',
  // the national army (Phase 2): reichswehr_* -> army_* (loyalty/strength/militancy/...)
  reichswehr: 'army',
};

function applyPhrases(parts) {
  const out = [];
  let i = 0;
  outer: while (i < parts.length) {
    for (const [key, val] of PHRASES) {
      if (i + key.length <= parts.length && key.every((k, j) => parts[i + j] === k)) {
        out.push(...val);
        i += key.length;
        continue outer;
      }
    }
    out.push(parts[i]);
    i++;
  }
  return out;
}

export function renameId(id) {
  if (id.indexOf('_') === -1) return SINGLE[id] || id;
  let parts = id.split('_');
  parts = applyPhrases(parts);
  parts = parts.map((p) => SINGLE[p] || p);
  return parts.join('_');
}

// True if renaming would change the identifier (used to skip no-op work / detect targets).
export function changes(id) {
  return renameId(id) !== id;
}
