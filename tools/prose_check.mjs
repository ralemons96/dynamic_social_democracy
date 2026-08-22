// Prose-pass guard. Two jobs:
//
//   node tools/prose_check.mjs structure <file.dry> [...]
//     Diffs each file against HEAD and fails if any NON-prose line changed - directives,
//     choice lines, @sections, JS blocks - or if any inline [? if cond: ?] condition or
//     [+ var +] interpolation inside a prose line changed. A prose-only rewrite must leave
//     all of those byte-identical. Exit 1 on any violation.
//
//   node tools/prose_check.mjs metrics <file.dry> [...]
//     Reports the register tics per file and in total: prose words, em-dashes per 1000
//     words, "not X so much as / but Y" openers, "It is" abstract openers, and mean
//     sentence length. Targets for the house style: em-dashes < 1 per 1000, zero of
//     the two constructions.
import { execSync } from 'child_process';
import { readFileSync } from 'fs';

const DIRECTIVE = /^(title|subtitle|view-if|choose-if|on-arrival|on-departure|go-to|max-visits|priority|tags|new-page|is-card|is-pinned-card|card-image|face-image|frequency|unavailable-subtitle|set-bg|audio|signal|order|countdown|game-over):/;

// classify a source line: 'logic' (must not change) or 'prose' (may change)
function classify(line) {
  const t = line.trim();
  if (t === '') return 'blank';
  if (DIRECTIVE.test(t)) {
    // title/subtitle/unavailable-subtitle are player-facing; everything else is logic
    return /^(title|subtitle|unavailable-subtitle):/.test(t) ? 'prose' : 'logic';
  }
  if (t.startsWith('- @')) {
    // the scene reference is logic; the label after the colon is prose
    return 'choice';
  }
  if (t.startsWith('@') || t.startsWith('#')) return 'logic';
  if (t.startsWith('=')) return 'prose';
  return 'prose';
}

// walk a file's lines, tracking {! !} JS blocks which are logic regardless of content
function* lines(text) {
  let inJS = false;
  for (const raw of text.split(/\r?\n/)) {
    const opens = (raw.match(/\{!/g) || []).length, closes = (raw.match(/!\}/g) || []).length;
    const wasJS = inJS;
    if (opens > closes) inJS = true; else if (closes > opens) inJS = false;
    yield { raw, kind: (wasJS || inJS || raw.includes('{!')) ? 'logic' : classify(raw) };
  }
}

// inline logic living inside prose lines: [? if cond: ?] conditions and [+ var +] interpolations.
// The line-level classifier cannot see these, and a hand-rewritten paragraph can silently drop one.
const INLINE = /\[\?\s*(?:if|unless)\s[^:]*:|\[\+[^\]]*\+\]/g;

function logicSignature(text) {
  const out = [];
  for (const { raw, kind } of lines(text)) {
    if (kind === 'logic') out.push(raw.trim());
    else if (kind === 'choice') out.push(raw.trim().replace(/^(- @[A-Za-z0-9_.]+).*$/, '$1'));
    if (kind === 'prose' || kind === 'choice') for (const m of raw.match(INLINE) || []) out.push('inline ' + m.replace(/\s+/g, ' ').trim());
  }
  return out;
}

function prose(text) {
  const out = [];
  for (const { raw, kind } of lines(text)) {
    if (kind === 'prose') {
      let t = raw.replace(/^(title|subtitle|unavailable-subtitle):\s*/, '').replace(/^=\s*/, '');
      t = t.replace(/<[^>]*>/g, '').replace(/\[\?\s*(?:if|unless)[^:]*:/g, '').replace(/\?\]/g, '')
        .replace(/\[\+[^\]]*\+\]/g, ' ').replace(/\*\*/g, '');
      out.push(t);
    } else if (kind === 'choice') {
      const m = raw.trim().match(/^- @[A-Za-z0-9_.]+:\s*(.*)$/);
      if (m) out.push(m[1].replace(/<[^>]*>/g, '').replace(/\*\*/g, ''));
    }
  }
  return out.join('\n');
}

const [mode, ...files] = process.argv.slice(2);
if (!mode || !files.length) { console.error('usage: prose_check.mjs structure|metrics <file> [...]'); process.exit(2); }

if (mode === 'structure') {
  let bad = 0;
  for (const f of files) {
    let head;
    try { head = execSync('git show HEAD:' + f.replace(/\\/g, '/'), { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }); }
    catch (e) { console.log('  ' + f + ': not in HEAD (new file) - skipped'); continue; }
    const a = logicSignature(head), b = logicSignature(readFileSync(f, 'utf8'));
    if (a.length !== b.length || a.some((l, i) => l !== b[i])) {
      bad++;
      console.log('  FAIL ' + f + ': logic lines differ from HEAD');
      const n = Math.max(a.length, b.length);
      for (let i = 0; i < n; i++) if (a[i] !== b[i]) { console.log('     - ' + (a[i] || '(none)').slice(0, 110)); console.log('     + ' + (b[i] || '(none)').slice(0, 110)); break; }
    } else console.log('  ok   ' + f + ' (' + a.length + ' logic lines + inline conditionals unchanged)');
  }
  process.exit(bad ? 1 : 0);
}

if (mode === 'metrics') {
  let TW = 0, TD = 0, TN = 0, TI = 0;
  console.log('file'.padEnd(44) + 'words'.padStart(6) + 'sp—/1k'.padStart(8) + 'notX'.padStart(6) + 'ItIs'.padStart(6) + 'sent'.padStart(6));
  console.log('-'.repeat(76));
  for (const f of files) {
    const p = prose(readFileSync(f, 'utf8'));
    const w = (p.match(/\S+/g) || []).length;
    // spaced em-dashes are the port-era pivot; tight ones are the inherited parenthetical
    const d = (p.match(/ — /g) || []).length;
    const n = (p.match(/\bnot\b[^.!?]{1,40}\b(so much as|but)\b/gi) || []).length;
    const it = (p.match(/(^|[.!?]\s+)It is\b/g) || []).length;
    const sents = p.split(/[.!?]+\s/).filter(s => s.trim().split(/\s+/).length > 2);
    const msl = sents.length ? (w / sents.length) : 0;
    TW += w; TD += d; TN += n; TI += it;
    const short = f.replace(/^.*scenes[\\/]/, '').replace('.scene.dry', '');
    console.log(short.padEnd(44) + String(w).padStart(6) + (w ? (1000 * d / w).toFixed(1) : '-').padStart(8) + String(n).padStart(6) + String(it).padStart(6) + msl.toFixed(1).padStart(6));
  }
  console.log('-'.repeat(76));
  console.log('TOTAL'.padEnd(44) + String(TW).padStart(6) + (TW ? (1000 * TD / TW).toFixed(1) : '-').padStart(8) + String(TN).padStart(6) + String(TI).padStart(6));
}
