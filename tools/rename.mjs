// Phase 0b: component-wise identifier rename over source/**/*.dry (spec §1).
//
// Strategy: identifier references live ONLY in code contexts, never in prose, so we
// rename those contexts and leave narrative text untouched:
//   - `Q.<id>`            JS quality refs in {! !} magic (inline or multi-line block)
//   - `[+ <expr> +]`      value inserts (quality + optional qdisplay)
//   - `[? if <expr>: ...` conditional predicates (rename up to the first colon only)
//   - directive values    view-if / choose-if / on-arrival / on-departure / on-display /
//                         go-to conditions / min / max / max-visits / priority / frequency
// renameId() is idempotent over its own outputs, so overlapping passes are harmless.
// Scene ids and option targets are NOT renamed (internal, not player-visible). qdisplay
// FILES are renamed to match their (quality-coupled) ids.
import { readFileSync, writeFileSync, readdirSync, renameSync } from 'node:fs';
import { renameId } from './maps.mjs';

const apply = process.argv.includes('--apply');

// Rename every identifier in a code expression, skipping string literals.
function renameExpr(expr) {
  let out = '', i = 0;
  while (i < expr.length) {
    const c = expr[i];
    if (c === '"' || c === "'") {
      const q = c; let j = i + 1;
      while (j < expr.length && expr[j] !== q) { if (expr[j] === '\\') j++; j++; }
      out += expr.slice(i, Math.min(j + 1, expr.length));
      i = j + 1;
    } else {
      let j = i;
      while (j < expr.length && expr[j] !== '"' && expr[j] !== "'") j++;
      out += expr.slice(i, j).replace(/[A-Za-z_]\w*/g, (m) => renameId(m));
      i = j;
    }
  }
  return out;
}

// go-to: TARGET [if COND][; TARGET2 [if COND2]] ... — rename only the COND parts.
function renameGoto(value) {
  return value.split(';').map((clause) => {
    const m = clause.match(/^(.*?\bif\b)(.*)$/s);
    if (!m) return clause;              // no condition -> bare target, leave it
    return m[1] + renameExpr(m[2]);
  }).join(';');
}

const EXPR_DIRECTIVES = /^(\s*)(view-if|choose-if|on-display|min|max|max-visits|priority|frequency|select-priority):(.*)$/;
const CODE_ONARRIVAL = /^(\s*)(on-arrival|on-departure):(.*)$/;
const GOTO = /^(\s*)(go-to):(.*)$/;

export function transformFile(text) {
  // --- Global code-context passes (operate on the whole file) ---
  text = text.replace(/Q\.([A-Za-z_]\w*)/g, (_, id) => 'Q.' + renameId(id));
  // Bracket access, incl. dynamically-built names like Q['dvp_relation_' + region].
  // renameExpr skips string literals, so handle the leading Q['...'/Q["..." form here.
  text = text.replace(/Q\[(['"])([A-Za-z_]\w*)/g, (_, q, id) => 'Q[' + q + renameId(id));
  text = text.replace(/\[\+([^\]]*?)\+\]/g, (_, e) => '[+' + renameExpr(e) + '+]');
  // `if\b` (not `if\s+`) so `[? if(cond): ...` with no space after `if` is also caught.
  text = text.replace(/(\[\?\s*if\b)(.*?)(:)/g, (_, pre, cond, col) => pre + renameExpr(cond) + col);

  // --- Per-line directive passes (bare expressions; no Q./inserts/predicates) ---
  return text.split('\n').map((line) => {
    let m;
    if ((m = line.match(EXPR_DIRECTIVES))) return m[1] + m[2] + ':' + renameExpr(m[3]);
    if ((m = line.match(GOTO))) return m[1] + m[2] + ':' + renameGoto(m[3]);
    if ((m = line.match(CODE_ONARRIVAL))) {
      // {! !} blocks are covered by the global Q. pass; only rename bare expressions.
      if (m[3].trimStart().startsWith('{!')) return line;
      return m[1] + m[2] + ':' + renameExpr(m[3]);
    }
    return line;
  }).join('\n');
}

// Recursively collect .dry files.
function walk(dir, acc = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = dir + '/' + e.name;
    if (e.isDirectory()) walk(p, acc);
    else if (e.name.endsWith('.dry')) acc.push(p);
  }
  return acc;
}

// Only run the file-mutating main block when invoked directly (not on import).
const isMain = process.argv[1] && process.argv[1].replace(/\\/g, '/').endsWith('tools/rename.mjs');
if (isMain) main();

function main() {
const files = walk('source');
let changedFiles = 0, totalDelta = 0;
const fileRenames = [];
for (const f of files) {
  const orig = readFileSync(f, 'utf8');
  const next = transformFile(orig);
  if (next !== orig) {
    changedFiles++;
    // crude delta: count differing chars regions
    let d = 0; for (let i = 0; i < Math.max(orig.length, next.length); i++) if (orig[i] !== next[i]) d++;
    totalDelta += 1;
    if (apply) writeFileSync(f, next); // already LF; node writes \n verbatim
  }
  // qdisplay file rename (id == filename stem before .qdisplay.dry)
  const qm = f.match(/^(.*\/)([^/]+)\.qdisplay\.dry$/);
  if (qm) {
    const newStem = renameId(qm[2]);
    if (newStem !== qm[2]) {
      fileRenames.push([f, qm[1] + newStem + '.qdisplay.dry']);
      if (apply) renameSync(f, qm[1] + newStem + '.qdisplay.dry');
    }
  }
}

console.log(`content: ${changedFiles}/${files.length} files changed (${apply ? 'APPLIED' : 'dry-run'})`);
console.log(`qdisplay file renames: ${fileRenames.length}`);
for (const [a, b] of fileRenames) console.log(`  ${a.split('/').pop()} -> ${b.split('/').pop()}`);
}
