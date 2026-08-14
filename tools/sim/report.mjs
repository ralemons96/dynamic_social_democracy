// Aggregate sim batches into a balance report. Compare mode with 2+ files.
// Usage: node tools/sim/report.mjs out/a.jsonl [out/b.jsonl ...]
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const files = process.argv.slice(2);
if (!files.length) { console.error('usage: node report.mjs <batch.jsonl> [batch2.jsonl ...]'); process.exit(1); }

// Event roster from the compiled game (top-level scenes tagged 'event')
const gameJson = JSON.parse(readFileSync(join(root, 'out', 'game.json'), 'utf8'));
const eventScenes = Object.values(gameJson.scenes)
  .filter(s => s.tags && s.tags.includes('event') && !s.id.includes('.'))
  .map(s => ({ id: s.id, title: String(s.title || s.id).replace(/<[^>]*>/g, '').slice(0, 48) }));
const NEW_CONTENT = ['naval_action_stathmore', 'imperial_envoy', 'magi_petition', 'popular_front_dispute',
  'saxony_aftermath', 'schleicher_parliament_offer'];

function loadBatch(f) {
  const ls = readFileSync(f, 'utf8').trim().split('\n').map(l => JSON.parse(l));
  return { config: ls[0].config, runs: ls.slice(1), name: f.split(/[\\/]/).pop() };
}
const pct = (n, d) => d ? (100 * n / d).toFixed(0) + '%' : '-';
const quant = (arr, p) => { if (!arr.length) return NaN; const a = [...arr].sort((x, y) => x - y); return a[Math.min(a.length - 1, Math.floor(p * a.length))]; };

function classifyEnding(r) {
  if (r.error) return 'ENGINE ERROR';
  const f = r.endFlags || {};
  if (!r.gameOver) {
    if (r.softlock) return `softlock:${r.softlock.kind}`;
    return 'cap-reached (still alive)';
  }
  if (f.weimar_win) return f.empire_outcome ? `republic survives → ${f.empire_outcome}` : 'republic survives';
  if (f.empire_outcome === 'submission') return 'the Gate Opened (Gallax→Empire)';
  if (f.dnef_win) return 'Negotiated Return (Staal reunion)';
  if (f.civil_war_seen) return 'civil war era';
  const ch = f.chancellor;
  if (ch === 'Gallax') return 'fell to Gallax' + (f.rubicon ? ' (Rubicon)' : '');
  if (ch === 'Staal') return 'ended under Staal' + (f.rubicon ? ' (Rubicon)' : '');
  const fs = String(r.finalScene || '');
  if (/kpd|collectivist|left_win/.test(fs)) return 'Collectivist outcome';
  if (/game_over/.test(fs)) return `ended under ${ch || 'unknown'}`;
  return `other: ${fs.slice(0, 30)}`;
}

function report(batch) {
  const R = batch.runs, N = R.length;
  const out = [];
  out.push(`\n## Batch: ${batch.name} — profile=${batch.config.profile}, runs=${N}, seed=${batch.config.seed}`);

  // 1. Outcomes
  const endings = {};
  for (const r of R) { const e = classifyEnding(r); endings[e] = (endings[e] || 0) + 1; }
  out.push(`\n### Outcomes`);
  for (const [e, n] of Object.entries(endings).sort((a, b) => b[1] - a[1])) out.push(`- ${e}: ${n} (${pct(n, N)})`);
  const times = R.map(r => (r.final && r.final.time) || 0);
  const years = R.map(r => (r.final && r.final.year) || 1928);
  out.push(`- survival (game months): median ${quant(times, 0.5)}, p10 ${quant(times, 0.1)}, p90 ${quant(times, 0.9)}`);
  for (const y of [1929, 1930, 1931, 1932, 1933, 1934]) out.push(`- reached ${y + 2365}: ${pct(years.filter(v => v >= y).length, N)}`);

  // 2. Trajectories (by year)
  const KEY = ['pro_republic', 'stability', 'military_readiness', 'marcher_votes', 'royalist_votes',
    'collectivist_votes', 'empire_posture', 'magi_balance', 'reunification_support', 'disfavored', 'coup_progress'];
  out.push(`\n### Metric trajectories (mean [p10–p90] by year)`);
  out.push('| metric | ' + [1928, 1929, 1930, 1931, 1932, 1933, 1934].map(y => y + 2365).join(' | ') + ' |');
  out.push('|---|' + '---|'.repeat(7));
  for (const m of KEY) {
    const row = [m];
    for (const y of [1928, 1929, 1930, 1931, 1932, 1933, 1934]) {
      const vals = [];
      for (const r of R) for (const s of (r.traj || [])) if (s.year === y && typeof s[m] === 'number') vals.push(s[m]);
      row.push(vals.length ? `${(vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(0)} [${quant(vals, 0.1).toFixed(0)}–${quant(vals, 0.9).toFixed(0)}]` : '·');
    }
    out.push('| ' + row.join(' | ') + ' |');
  }

  // 3. Coverage
  const fired = {};
  for (const r of R) for (const v of (r.visited || [])) { const top = v.split('.')[0]; fired[top] = (fired[top] || 0) + 1; }
  const never = eventScenes.filter(e => !fired[e.id]);
  const rare = eventScenes.filter(e => fired[e.id] && fired[e.id] / N < 0.1);
  out.push(`\n### Event coverage (${eventScenes.length} event scenes)`);
  out.push(`- fired in ≥1 run: ${eventScenes.length - never.length} · never fired: ${never.length} · rare (<10% of runs): ${rare.length}`);
  out.push(`- NEW content: ` + NEW_CONTENT.map(id => `${id} ${pct(fired[id] || 0, N)}`).join(' · '));
  if (never.length) out.push(`- never fired: ${never.map(e => e.id).join(', ')}`);

  // 4. Hardness signals
  out.push(`\n### Hardness signals`);
  const inGov = [];
  for (const r of R) { const t = (r.traj || []); if (t.length) inGov.push(t.filter(s => s.marcher_in_government).length / t.length); }
  out.push(`- avg fraction of sampled turns in government: ${(100 * inGov.reduce((a, b) => a + b, 0) / (inGov.length || 1)).toFixed(0)}%`);
  const chanc = {};
  for (const r of R) { const c = r.endFlags && r.endFlags.chancellor; if (c) chanc[c] = (chanc[c] || 0) + 1; }
  out.push(`- final chancellor: ` + Object.entries(chanc).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([k, v]) => `${k} ${pct(v, N)}`).join(' · '));
  const lock = new Map();
  for (const r of R) for (const [t, seen, locked] of (r.lockouts || [])) {
    const rec = lock.get(t) || { seen: 0, locked: 0 }; rec.seen += seen; rec.locked += locked; lock.set(t, rec);
  }
  const topLock = [...lock.entries()].filter(([, v]) => v.seen >= N).sort((a, b) => b[1].locked / b[1].seen - a[1].locked / a[1].seen).slice(0, 10);
  out.push(`- most-locked recurring choices:`);
  for (const [t, v] of topLock) out.push(`    ${pct(v.locked, v.seen)} locked — ${t}`);
  const ach = {};
  for (const r of R) for (const a of (r.achievements || [])) ach[a] = (ach[a] || 0) + 1;
  const achN = Object.keys(ach).length;
  out.push(`- distinct achievements earned across batch: ${achN}; avg per run: ${(R.reduce((a, r) => a + (r.achievements || []).length, 0) / N).toFixed(1)}`);

  // 5. Errors & softlocks
  const errs = R.filter(r => r.error), locks = R.filter(r => r.softlock);
  out.push(`\n### Errors & softlocks`);
  out.push(`- engine errors: ${errs.length}` + (errs.length ? ` → ` + [...new Set(errs.map(r => `${r.error.scene}: ${r.error.msg.slice(0, 90)}`))].slice(0, 6).join(' | ') : ''));
  out.push(`- softlocks: ${locks.length}` + (locks.length ? ` → ` + [...new Set(locks.map(r => `${r.softlock.scene} (${r.softlock.kind})`))].slice(0, 6).join(' | ') : ''));
  return out.join('\n');
}

let md = `# Commonwealth sim report — ${files.length} batch(es)\n`;
const batches = files.map(loadBatch);
for (const b of batches) md += report(b) + '\n';
if (batches.length > 1) {
  md += `\n## Quick compare (ending distribution)\n`;
  for (const b of batches) {
    const endings = {};
    for (const r of b.runs) { const e = classifyEnding(r); endings[e] = (endings[e] || 0) + 1; }
    md += `- **${b.name}**: ` + Object.entries(endings).sort((x, y) => y[1] - x[1]).map(([e, n]) => `${e} ${pct(n, b.runs.length)}`).join(' · ') + '\n';
  }
}
console.log(md);
const outPath = files[0].replace(/\.jsonl$/, '') + '-report.md';
writeFileSync(outPath, md);
console.log(`\n(saved ${outPath})`);
