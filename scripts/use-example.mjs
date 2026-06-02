#!/usr/bin/env node
/* use-example.mjs — Aplica um plano de exemplo: copia examples/<nome>/plan/*.js para plan/.
   Uso:
     node scripts/use-example.mjs --list
     node scripts/use-example.mjs salesforce-cta
     npm run use-example -- salesforce-cta
*/
import { readdirSync, existsSync, copyFileSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const EXAMPLES = join(ROOT, 'examples');
const PLAN = join(ROOT, 'plan');
const FILES = ['meta.js', 'phases.js', 'gaps.js', 'mocks.js', 'routine.js', 'costs.js'];

function listExamples() {
  if (!existsSync(EXAMPLES)) return [];
  return readdirSync(EXAMPLES)
    .filter((d) => statSync(join(EXAMPLES, d)).isDirectory() && existsSync(join(EXAMPLES, d, 'plan')))
    .sort();
}

const name = process.argv[2];
const available = listExamples();

if (!name || name === '--list' || name === '-l') {
  console.log('Exemplos disponíveis (use: npm run use-example -- <nome>):\n');
  for (const e of available) console.log('  • ' + e);
  process.exit(name ? 0 : 1);
}

if (!available.includes(name)) {
  console.error(`\n✗ Exemplo "${name}" não encontrado.\nDisponíveis: ${available.join(', ') || '(nenhum)'}\n`);
  process.exit(1);
}

const src = join(EXAMPLES, name, 'plan');
let copied = 0;
for (const f of FILES) {
  const from = join(src, f);
  if (!existsSync(from)) { console.error(`✗ Faltando ${name}/plan/${f}`); process.exit(1); }
  copyFileSync(from, join(PLAN, f));
  copied++;
}
console.log(`\n✓ Plano "${name}" aplicado em plan/ (${copied} arquivos).`);
console.log('  Confira com: npm run serve   ·   valide com: npm test\n');
