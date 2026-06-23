// Phase 1a: mechanical display-label reskin (spec §§2-8). Internal variables are already
// Commonwealth (Phase 0); this changes what the PLAYER sees in structured display.
// Conservative + dictionary-driven — leaves judgment-heavy prose to Phase 1b.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';

const apply = process.argv.includes('--apply');

// Party display names — applied to the **CODE** / **CODE:** bold-label form only
// (the abbreviations shown in the status panel, Reichstag composition, election tables).
const PARTY = {
  SPD: 'Marchers', KPD: 'Collectivists', NSDAP: 'Royalists', DNVP: 'Traditionalists',
  DVP: 'Golds', DDP: 'Golds', Z: 'Unionists', CVP: 'Concord', DNEF: 'GNU', BVP: 'Arcanists',
};

// Voter-bloc names — applied to the demographic table <th> headers.
const TH = {
  'Workers': 'Commons', 'New Middle Class': 'Burghers', 'Old Middle Class': 'Guilds',
  'Rural': 'Landed', 'Unemployed': 'Disfavored', 'Catholics': 'Faithful',
};

// Figures — distinctive proper nouns, replaced everywhere (prose AND "quoted" string tokens,
// keeping set/check in lockstep). Braun/Rosenfeld were done in Phase 0c.
const FIGURE = {
  'Hindenburg': 'DuFour', 'Hitler': 'Gallax', 'Schleicher': 'Staal', 'Müller': 'Sarrow',
  'Papen': 'Goodryke', 'Brüning': 'Askew', 'Thälmann': 'Halsmark', 'Mierendorff': 'Marrow',
  'Groener': 'Ravabelle',
  // Braun/Rosenfeld: 0c renamed only the quoted string token; catch the unquoted display
  // text (e.g. <span>Braun</span>) here too so logic and display stay consistent.
  'Braun': 'Bristol', 'Rosenfeld': 'Pendrigon',
};

// Place names — Prussia subsystem reflavored wholesale (spec §6).
const PLACE = { 'Prussia': 'Heartland', 'Prussian': 'Heartland' };

// Coined Commonwealth surnames for figures with no spec mapping (user: "coin in-style").
// Style matches the established set (Bristol, Pendrigon, Vance, Sarrow, Goodryke, Askew…).
// Applied as word-boundary replacements (prose + quoted string tokens, in lockstep).
const FIGURE2 = {
  // Canonical names from the lore doc take precedence over in-style coining.
  'Wels': 'Vesh', 'Breitscheid': 'Yardley', 'Hilferding': 'Bell', 'Severing': 'Heath',
  'Levi': 'Tarrand', 'Pfülf': 'Vellath', 'Hugenberg': 'Mallin', 'Strasser': 'Crowde',
  // In-style coined names for the remaining (no canonical entry).
  'Stegerwald': 'Sedgewick', 'Luther': 'Lytton', 'Westarp': 'Westmore',
  'Adenauer': 'Aldermoor', 'Heuss': 'Hewes', 'Stresemann': 'Stratton',
  'Goerdeler': 'Goodlake', 'Eckener': 'Eckhart', 'Gessler': 'Gesling', 'Göring': 'Gorrick',
  'Wirth': 'Werth', 'Schumacher': 'Shackley',
  'Jarres': 'Jarrow', 'Juchacz': 'Jessamy', 'Frick': 'Frask', 'Seldte': 'Selden',
  'Woytinsky': 'Voss', 'Baade': 'Bayle', 'Münzenberg': 'Munzer',
  'Hammerstein': 'Hammerton', 'Radbruch': 'Radbourne', 'Wissell': 'Wistle', 'Leber': 'Lebbon',
  'Hirschfeld': 'Harnfell', 'Leipart': 'Leighart', 'Duesterberg': 'Dusterel',
  'Bredow': 'Bredon', 'Sender': 'Sennet', 'Stampfer': 'Stamper', 'Aufhäuser': 'Auberon',
  'Seydewitz': 'Seyton', 'Siemsen': 'Siemen', 'Brauns': 'Brennan',
  'Lettow-Vorbeck': 'Lethmoor', 'Hergt': 'Hargen', 'Treviranus': 'Trevannon', 'Ossietzky': 'Ostwick',
  'Seeckt': 'Seckard', 'Bruning': 'Askew', // Bruning = Brüning without the umlaut (residual)
};

// Residual Weimar-specific terms (user decisions): the realm, the army, the cause, the debt.
// Ordered so compounds resolve before the bare "Reich". War Loans are owed to Ethia.
const TERMS = [
  ['Reichswehr', 'Commonwealth Army'], ['Reichspräsident', 'President'], ['Reichskanzler', 'Chancellor'],
  ['Reichsbanner', 'the Banners'], ['Reichsbank', 'Commonwealth Bank'], ['Reichsrat', 'Commonwealth Council'],
  ['Reich', 'Commonwealth'],
  ['Social Democracy', 'Reformism'], ['Social Democratic', 'Reformist'], ['Social Democrat', 'Reformist'],
  // NOTE: 'reparations' is ALSO a quality variable AND a scene id (@reparations), so it can't
  // be word-boundary replaced (breaks `reparations == -2` and `- @reparations`). Handling the
  // War Loans / Ethia flavor needs a proper identifier rename of the variable + scene; deferred.
];

// Currency — only the unambiguous compound forms; bare "Mark"/"marks" (verb!) is left to 1b.
const CURRENCY = { 'Reichsmarks': 'Gold', 'Reichsmark': 'Gold', 'Goldmarks': 'Gold', 'Goldmark': 'Gold' };

// Institutions — the parliament (spec calls it the Assembly).
const INSTITUTION = { 'Reichstag': 'Assembly' };

// Nation / place (user decisions). Ordered: multi-word phrases must win before bare words.
// `German`/`Germans` (people) and odd sentence-start capitalization are left to Phase 1b.
const NATION = [
  ['Weimar Coalition', 'Unity Coalition'],
  ['Weimar Republic', 'the Commonwealth'],
  ['Weimar', 'Commonwealth'],
  ['Germany', 'the Commonwealth'],
  ['German', 'Commonwealth'],
  ['Berlin', 'Axton'],
];

function esc(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

const counts = {};
function bump(cat, n) { counts[cat] = (counts[cat] || 0) + n; }

function transform(text) {
  // Party bold labels: **CODE** and **CODE:**
  for (const [code, name] of Object.entries(PARTY)) {
    const re = new RegExp('\\*\\*' + code + '(:?)\\*\\*', 'g');
    text = text.replace(re, (_, colon) => { bump('party', 1); return '**' + name + colon + '**'; });
  }
  // Demographic <th> headers (longest first so "Old Middle Class" wins before "Middle")
  for (const [from, to] of Object.entries(TH).sort((a, b) => b[0].length - a[0].length)) {
    const re = new RegExp('<th>' + esc(from) + '</th>', 'g');
    text = text.replace(re, () => { bump('bloc', 1); return '<th>' + to + '</th>'; });
  }
  // Figures (word-boundary, prose + quoted tokens)
  for (const [from, to] of Object.entries({ ...FIGURE, ...FIGURE2 })) {
    const re = new RegExp('\\b' + esc(from) + '\\b', 'g');
    text = text.replace(re, () => { bump('figure', 1); return to; });
  }
  // Marx -> Vance only as a quoted string token (avoid Karl Marx / Marxism in prose)
  text = text.replace(/(['"])Marx\1/g, (_, q) => { bump('figure', 1); return q + 'Vance' + q; });
  // Places
  for (const [from, to] of Object.entries(PLACE)) {
    const re = new RegExp('\\b' + from + '\\b', 'g');
    text = text.replace(re, () => { bump('place', 1); return to; });
  }
  // Currency (longest first)
  for (const [from, to] of Object.entries(CURRENCY).sort((a, b) => b[0].length - a[0].length)) {
    const re = new RegExp('\\b' + from + '\\b', 'g');
    text = text.replace(re, () => { bump('currency', 1); return to; });
  }
  // Institutions
  for (const [from, to] of Object.entries(INSTITUTION)) {
    const re = new RegExp('\\b' + from + '\\b', 'g');
    text = text.replace(re, () => { bump('institution', 1); return to; });
  }
  // Nation / place (ordered)
  for (const [from, to] of NATION) {
    const re = new RegExp('\\b' + esc(from) + '\\b', 'g');
    text = text.replace(re, () => { bump('nation', 1); return to; });
  }
  // The Royalist movement (NSDAP/Nazi). Phrase first.
  for (const [from, to] of [['Nazi Party', 'Royalist Party'], ['Nazis', 'Royalists'], ['Nazi', 'Royalist']]) {
    const re = new RegExp('\\b' + esc(from) + '\\b', 'g');
    text = text.replace(re, () => { bump('movement', 1); return to; });
  }
  // Residual Weimar-specific terms (ordered: compounds before bare Reich)
  for (const [from, to] of TERMS) {
    const re = new RegExp('\\b' + esc(from) + '\\b', 'g');
    text = text.replace(re, () => { bump('terms', 1); return to; });
  }
  // 1b tail: the Z party's prose name (Zentrum -> Unionists), but ONLY the black color-span
  // form, so political-position "center-right" and "Catholic Center" are not touched.
  for (const [from, to] of [['>Center Party</span>', '>Unionist Party</span>'], ['>Center</span>', '>Unionists</span>'], ['Catholic Center', 'the Unionists']]) {
    const parts = text.split(from); if (parts.length > 1) { bump('center', parts.length - 1); text = parts.join(to); }
  }
  // 1b tail: paramilitaries (spec §7) + residual German/imperial terms (word-boundary).
  for (const [from, to] of [
    ['Stahlhelm', 'Wardens'], ['Iron Front', 'Iron Banner'],
    ['Kaiserreich', 'old Empire'], ['Kaiser', 'Emperor'],
    ['Landtag', 'state Assembly'], ['Reichsexekution', 'Commonwealth intervention'],
    ['Stresemannites', 'Strattonites'], ['Stresemannite', 'Strattonite'],
    ['Center Party', 'Unionist Party'], ['Junkers', 'nobles'], ['Junker', 'noble'],
  ]) {
    const re = new RegExp('\\b' + esc(from) + '\\b', 'g');
    text = text.replace(re, () => { bump('tail', 1); return to; });
  }
  // Bare party-code display references not in **bold** form (e.g. <span color>SPD</span>,
  // table labels " SPD: "). Lookbehind/lookahead exclude filename/path contexts so image
  // refs like SPD-1919.png and Reichstagsfraktion_der_SPD.jpg are never touched.
  for (const [code, name] of Object.entries(PARTY)) {
    if (code === 'Z') continue; // single letter — too risky to match bare
    const re = new RegExp('(?<![A-Za-z0-9_/-])' + code + '(?![A-Za-z0-9_./-])', 'g');
    text = text.replace(re, () => { bump('bareparty', 1); return name; });
  }
  // Stylized flag-color "Weimar" (rendered as per-letter black/red/gold spans, so no
  // contiguous "Weimar" string exists for the word-boundary passes to catch) -> "Unity"
  // (fits "Unity Coalition" / "Unity Bloc", the pro-republic groupings).
  {
    const styled = '<span style="color: #000000;">We</span><span style="color: #DD0000;">im</span><span style="color: #FFCC00;">ar</span>';
    const parts = text.split(styled);
    if (parts.length > 1) { bump('stylized', parts.length - 1); text = parts.join('Unity'); }
  }
  // Clean up article duplication introduced by Germany -> "the Commonwealth".
  text = text.replace(/\bthe the Commonwealth\b/g, () => { bump('cleanup', 1); return 'the Commonwealth'; })
             .replace(/\blate the Commonwealth\b/g, () => { bump('cleanup', 1); return 'late Commonwealth'; });
  return text;
}

function walk(dir, acc = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = dir + '/' + e.name;
    if (e.isDirectory()) walk(p, acc);
    else if (e.name.endsWith('.dry')) acc.push(p);
  }
  return acc;
}

let changed = 0;
for (const f of walk('source')) {
  const orig = readFileSync(f, 'utf8');
  const next = transform(orig);
  if (next !== orig) { changed++; if (apply) writeFileSync(f, next); }
}
console.log(`label reskin: ${changed} files (${apply ? 'APPLIED' : 'dry-run'})`);
console.log('  replacements by category:', JSON.stringify(counts));

export { transform as transformLabels };
