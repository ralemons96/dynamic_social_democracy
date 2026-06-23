// Accurate player-facing Weimar-residual scan of compiled game.json: counts each term as a
// standalone word NOT inside an image filename / asset path (preceded/followed by / _ - .).
import { readFileSync } from 'node:fs';
const g = readFileSync('out/html/game.json', 'utf8');
const terms = ['SPD','KPD','NSDAP','DNVP','DVP','DDP','CVP','Hindenburg','Schleicher','Brüning',
  'Hugenberg','Stresemann','Stegerwald','Weimar','Prussia','Prussian','Reichstag','Reich','Nazi',
  'Junker','Bavaria','Saxony','Kaiser','Center Party','Stahlhelm','Landtag','reparations','Ethia'];
for (const t of terms) {
  const re = new RegExp('(?<![A-Za-z0-9_/-])' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?![A-Za-z0-9_./-])', 'g');
  const n = (g.match(re) || []).length;
  if (n > 0) console.log(`  ${t}: ${n}`);
}
