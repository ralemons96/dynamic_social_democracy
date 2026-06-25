// Event-audit catalog generator for the Commonwealth port.
// Parses the built game.json and emits lore/Commonwealth_Event_Audit.md — every `event`-tagged
// scene grouped by questline cluster, with premise / trigger / requires / sets / real-world flag /
// a PRE-FILLED suggested disposition + an empty Notes column for the user to annotate.
// Re-runnable: `node tools/event_audit.mjs` (rebuild game.json first if events changed).
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const JSON_PATH = existsSync('out/game.json') ? 'out/game.json' : 'out/html/game.json';
const g = JSON.parse(readFileSync(JSON_PATH, 'utf8'));
const scenes = g.scenes || {};

// ---- helpers -------------------------------------------------------------
const stripTags = (s) => (typeof s === 'string' ? s : contentText(s) || '')
  .replace(/<[^>]+>/g, '')
  .replace(/\[\?[^?]*?:/g, '').replace(/\?\]/g, '')   // inline [? if x: …?] -> keep body, drop syntax
  .replace(/\[\+\s*([a-z_]+)[^\]]*\+\]/gi, '{$1}')     // [+ var : disp +] -> {var}
  .replace(/[*_`]/g, '')
  .replace(/\s+/g, ' ').replace(/\s+([.,;:!?])/g, '$1').trim();

function contentText(c) {
  if (!c) return '';
  if (typeof c === 'string') return c;
  if (Array.isArray(c)) return c.map(contentText).join(' ');
  if (c.content !== undefined) return contentText(c.content);
  return '';
}
function firstHeadingAndParagraph(scene) {
  let blocks = scene.content && scene.content.content;
  if (!Array.isArray(blocks)) blocks = Array.isArray(scene.content) ? scene.content : [];
  let heading = '', para = '';
  for (const b of blocks) {
    if (!b || typeof b !== 'object') continue;
    if (!heading && b.type === 'heading') heading = stripTags(contentText(b.content));
    else if (!para && b.type === 'paragraph') para = stripTags(contentText(b.content));
    if (heading && para) break;
  }
  return { heading, para };
}

const code = (x) => !x ? '' : (typeof x === 'string' ? x : (x.$code || ''));
const arrCode = (a) => (Array.isArray(a) ? a : a ? [a] : []).map(code).join(' ; ');

function parseTrigger(vif) {
  const c = code(vif);
  if (!c) return { text: 'always', sort: -1 };
  const year = c.match(/year'\][^=<>]*?[><=]=*\s*(\d{4})/);   // tolerate the compiled `(Q['year'] || 0)===1929`
  const month = c.match(/month'\][^=<>]*?[><=]=*\s*(\d{1,2})/);
  const timer = c.match(/(\w+_time)'\][^=<>]*?[><=]=*\s*(\d+)/);
  if (year) {
    const disp = parseInt(year[1]) + 2365;
    const mm = month ? '-' + String(month[1]).padStart(2, '0') : '';
    return { text: `spine ${disp}${mm}`, sort: parseInt(year[1]) * 100 + (month ? parseInt(month[1]) : 0) };
  }
  if (timer) return { text: `timer ${timer[1]}=${timer[2]}`, sort: 500000 + parseInt(timer[2]) };
  return { text: 'flags', sort: 900000 };
}
function parseRequires(vif) {
  const c = code(vif);
  if (!c) return '';
  const out = new Set();
  let m;
  const reCmp = /Q\['(chancellor|president|gold_leader|unionist_leader|heartland_leader|marcher_candidate|traditionalist_ideology|concord_ideology)'\]\s*[=!]+=?\s*"([^"]+)"/g;
  while ((m = reCmp.exec(c))) out.add(`${m[1].replace(/_leader|_candidate|_ideology/, '')}=${m[2]}`);
  const reFlag = /Q\['(\w+)'\]/g;
  while ((m = reFlag.exec(c))) {
    const v = m[1];
    if (/^(year|month|week|time|turn)$/.test(v) || /_time$/.test(v) || /^(chancellor|president|gold_leader|unionist_leader|heartland_leader|marcher_candidate|traditionalist_ideology|concord_ideology)$/.test(v)) continue;
    out.add(v);
  }
  return [...out].slice(0, 5).join(', ');
}
function parseSets(onArrival) {
  const c = arrCode(onArrival);
  if (!c) return '';
  const out = new Set();
  let m;
  const re = /Q\.(\w+)\s*=(?!=)/g; // assignment, not ==
  while ((m = re.exec(c))) {
    const v = m[1];
    if (/^(time|week|month|year|turn|resources|month_actions)$/.test(v)) continue;
    out.add(v);
  }
  return [...out].slice(0, 6).join(', ');
}

// ---- cluster + disposition rules ----------------------------------------
const PREMISE = /^(young_plan|lausanne|austrian|hoover|kellogg|london_economic|prussian_concordat)|france/;
const KEEP_IDS = /^(veran_crash|paralysis|fall_of_ivion|rubicon|ivion|imperial_relations)/;
const RW_KEYWORDS = /\b(referendum|moratorium|customs union|reparations|the Plan|Left Cartel|Cartel|League of Nations|disarmament conference)\b/i;

function clusterOf(id) {
  if (KEEP_IDS.test(id)) return 'Spine / crisis (Commonwealth-native)';
  if (/^(1928|1929|1930|1931|1932|1933|1934|new_year)/.test(id)) return 'Spine / crisis (Commonwealth-native)';
  if (PREMISE.test(id)) return 'Diplomacy & foreign (premise events)';
  if (/^schleicher/.test(id)) return 'Staal / GNU arc (→ Track D)';
  if (/^nazi/.test(id)) return 'Far-right (Royalist) arc';
  if (/^papen/.test(id)) return 'Cabinet — Goodryke / Papen arc';
  if (/^bruning/.test(id)) return 'Cabinet — Askew / Brüning arc';
  if (/congress|merger|_split|triumvirate|dnvp|dvp|lvp|cvp|kaiser_party/.test(id)) return 'Party congresses & mergers';
  if (/election|landtag|referendum|vonc|no_confidence/.test(id)) return 'Elections & confidence votes';
  if (/unemployment|banking|wage|tax|economic|capital_strike|labor|deflation|public_works|austerity|tariff|wtb|inflation/.test(id)) return 'Economy & labour';
  return 'Flavor / misc';
}

function dispositionOf(id, cluster, rw) {
  if (cluster.startsWith('Spine / crisis')) return 'KEEP';
  if (cluster.startsWith('Staal')) return '→ Track D';
  if (cluster.startsWith('Diplomacy') || rw) return 'REWRITE';
  return 'LIGHT-REFLAVOR';
}

// ---- build catalog -------------------------------------------------------
const events = [];
for (const [id, s] of Object.entries(scenes)) {
  if (!(s.tags || []).includes('event')) continue;
  if (/^(ending_slides|game_over|credits)\b/.test(id)) continue;
  const { heading, para } = firstHeadingAndParagraph(s);
  let title = stripTags(s.title);
  if (!title || /^[\d\s]+$/.test(title)) title = heading || title; // generic numeric title -> use heading
  const subtitle = stripTags(s.subtitle);
  let premise = title + (subtitle && subtitle.toLowerCase() !== title.toLowerCase() ? ` — ${subtitle}` : '');
  if (!premise.trim()) premise = (heading || para || id).slice(0, 80);
  const trig = parseTrigger(s.viewIf);
  const cluster = clusterOf(id);
  const vifText = code(s.viewIf);
  const rw = PREMISE.test(id);  // REWRITE = the real-world-premise filename cluster; flavor with RW refs stays LIGHT-REFLAVOR
  events.push({
    id, cluster, premise: premise.slice(0, 110),
    fires: trig.text, sort: trig.sort,
    requires: parseRequires(s.viewIf), sets: parseSets(s.onArrival),
    rw: rw ? '⚠️' : '', disp: dispositionOf(id, cluster, rw),
    priority: s.priority ?? '',
  });
}

// ---- emit markdown -------------------------------------------------------
const CLUSTER_ORDER = [
  'Spine / crisis (Commonwealth-native)',
  'Diplomacy & foreign (premise events)',
  'Cabinet — Askew / Brüning arc',
  'Cabinet — Goodryke / Papen arc',
  'Staal / GNU arc (→ Track D)',
  'Far-right (Royalist) arc',
  'Party congresses & mergers',
  'Elections & confidence votes',
  'Economy & labour',
  'Flavor / misc',
];
const byCluster = {};
for (const e of events) (byCluster[e.cluster] ||= []).push(e);
for (const k in byCluster) byCluster[k].sort((a, b) => a.sort - b.sort || a.id.localeCompare(b.id));

const dispCounts = {};
for (const e of events) dispCounts[e.disp] = (dispCounts[e.disp] || 0) + 1;

const esc = (s) => (s || '').replace(/\|/g, '\\|');
let md = `# Commonwealth — Event Audit (${events.length} events)

*Generated by \`tools/event_audit.mjs\` from \`${JSON_PATH}\`. Re-run after rebuilding to refresh.*

**How to use:** skim each cluster, then set the **Disposition** (a suggestion is pre-filled — override it) and
jot a **Notes** line on what the rewrite/reflavor should do. \`⚠️\` = the premise still leans on real-world
history (most are the diplomacy cluster). "Fires when": \`spine YYYY-MM\` = calendar-gated backbone;
\`timer x=N\` = questline step (chancellor-tenure timer); \`flags\` = state-gated. **Requires** = prerequisite
flags in its \`view-if\`; **Sets** = flags it writes (the downstream unlocks). Events chain by these flags, not by \`go-to\`.

**Disposition key:** \`KEEP\` (already Commonwealth-native) · \`LIGHT-REFLAVOR\` (setting-neutral; voice only) ·
\`REWRITE\` (real-world premise → new Commonwealth premise) · \`SCRAP\` (cut) · \`→ Track D\` (the Staal arc, deferred).

**Suggested-disposition tally:** ${CLUSTER_ORDER.length ? Object.entries(dispCounts).map(([k, v]) => `${k} ${v}`).join(' · ') : ''}

`;

for (const cluster of CLUSTER_ORDER) {
  const rows = byCluster[cluster];
  if (!rows || !rows.length) continue;
  md += `\n## ${cluster}  (${rows.length})\n\n`;
  md += `| Event | Premise | Fires when | Requires | Sets | RW | Disposition | Notes |\n`;
  md += `|---|---|---|---|---|:--:|---|---|\n`;
  for (const e of rows) {
    md += `| \`${e.id}\` | ${esc(e.premise)} | ${e.fires} | ${esc(e.requires)} | ${esc(e.sets)} | ${e.rw} | ${e.disp} |  |\n`;
  }
}

md += `

## Proposed ADDITIONS (Track-B new content — seed list, extend freely)
| New event(s) | Replaces / extends | What it is |
|---|---|---|
| **The Ethian succession crisis** | rewrites \`local_election_france\` | the Ethian Ducal Council elevates a Validar (Edwyn II = sympathiser / Martyn II = centre-right / the "impossible" Quintis Ticinius or Servius Validar); the outcome gates whether the **War Loans** can be settled (the Regional-Concordant path). |
| **The Freehold civil war** | rewrites \`austrian_parliament\`/\`austrian_civil_war\` | the Freehold's monarchists move on the republican **Liberty Movement**; a cautionary parallel the Commonwealth can support. |
| **The customs union with the Freehold** | reskins \`austrian_customs_union\` | the West objects; strains the War-Loan settlement. |
| **The War-Loan conferences** | reskins \`young_plan_*\` / \`lausanne_*\` | renegotiation + nationalist backlash; the final settlement conference. |
| **Central Union aid / accord** | new (uses \`soviet_relation\`) | trade + covert rearmament; pleases the Collectivists (can bring **Falconne** forward), angers the rest. |
| **The Regional Concordant path** | new (the integration endgame) | needs good West+North relations + the War Loans settled. |

*(Add your own: magi-arc beats, Empire-reunification negotiations, Faithful/Temple events, etc.)*
`;

writeFileSync('lore/Commonwealth_Event_Audit.md', md);
// console summary
const clusterCounts = CLUSTER_ORDER.map(c => `${c.split(' ')[0]}:${(byCluster[c] || []).length}`).join('  ');
console.log(`wrote lore/Commonwealth_Event_Audit.md — ${events.length} events`);
console.log('by disposition:', JSON.stringify(dispCounts));
console.log('clusters:', clusterCounts);
