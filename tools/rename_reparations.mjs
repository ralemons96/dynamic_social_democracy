// reparations -> war_loans (identifier: variable + @section id) in all code contexts, and
// -> "War Loans" in prose (the debt the Commonwealth owes Ethia). reparations is a quality
// AND a section id AND a prose word, so it needs the same code/prose separation as Phase 0.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
const apply = process.argv.includes('--apply');

function transform(text) {
  // 1. {! !} magic blocks (inline + multi-line): bare/Q reparations -> war_loans
  text = text.replace(/\{![\s\S]*?!\}/g, (b) => b.replace(/\breparations\b/g, 'war_loans'));
  // 2. JS quality refs outside magic
  text = text.replace(/Q\.reparations\b/g, 'Q.war_loans').replace(/Q\[(['"])reparations\1/g, (_, q) => 'Q[' + q + 'war_loans' + q);
  // 3. section / scene id refs: @reparations (headers, options, links, go-to/call targets)
  text = text.replace(/@reparations\b/g, '@war_loans');
  // 4. directive/go-to/call lines: bare reparations -> war_loans (targets AND conditions)
  text = text.split('\n').map((line) =>
    /^\s*(view-if|choose-if|on-arrival|on-departure|on-display|go-to|call|set-jump|min|max|max-visits|priority|frequency):/.test(line)
      ? line.replace(/\breparations\b/g, 'war_loans') : line
  ).join('\n');
  // 5. inline inserts and conditional predicates
  text = text.replace(/\[\+([^\]]*?)\+\]/g, (_, e) => '[+' + e.replace(/\breparations\b/g, 'war_loans') + '+]');
  text = text.replace(/(\[\?\s*if\b)(.*?)(:)/g, (_, pre, cond, col) => pre + cond.replace(/\breparations\b/g, 'war_loans') + col);
  // 6. everything left is prose -> "War Loans"
  text = text.replace(/\breparations\b/g, 'War Loans');
  return text;
}

function walk(dir, acc = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = dir + '/' + e.name;
    if (e.isDirectory()) walk(p, acc); else if (e.name.endsWith('.dry')) acc.push(p);
  }
  return acc;
}
let n = 0;
for (const f of walk('source')) {
  const o = readFileSync(f, 'utf8'); const t = transform(o);
  if (t !== o) { n++; if (apply) writeFileSync(f, t); }
}
console.log(`reparations -> war_loans / War Loans: ${n} files (${apply ? 'APPLIED' : 'dry-run'})`);
