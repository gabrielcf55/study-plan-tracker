/* Testes unitários da lógica pura de progresso + integridade do plano raiz e dos exemplos.
   Roda com: npm test  (node --test, sem dependências externas). */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, existsSync, statSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';
import PLAN from '../plan.js';
import {
  emptyStore, normalizeStore, taskId, gapId,
  computeTotals, phasePct, gapPct, currentPhase, estWeek,
} from '../progress.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const imp = (p) => import(pathToFileURL(p).href);

/* Monta um objeto PLAN a partir dos 6 módulos de um diretório plan/. */
async function loadPlan(planDir) {
  const meta = (await imp(join(planDir, 'meta.js'))).default;
  const phases = (await imp(join(planDir, 'phases.js'))).default;
  const g = await imp(join(planDir, 'gaps.js'));
  const m = await imp(join(planDir, 'mocks.js'));
  return { meta, phases, strengths: g.strengths, gaps: g.gaps, mockFilters: m.mockFilters, mocks: m.mocks };
}

/* Regras de integridade válidas para QUALQUER plano. */
function validatePlan(plan, label) {
  assert.ok(plan.meta && plan.meta.title && plan.meta.timelineWeeks > 0, `${label}: meta válida`);
  assert.ok(Array.isArray(plan.phases) && plan.phases.length > 0, `${label}: tem fases`);
  let maxEnd = 0;
  for (const p of plan.phases) {
    assert.ok(p.name && p.color && Array.isArray(p.tasks), `${label}: fase com name/color/tasks`);
    assert.ok(p.start <= p.end, `${label}: fase "${p.name}" start<=end`);
    maxEnd = Math.max(maxEnd, p.end);
  }
  assert.ok(plan.meta.timelineWeeks >= maxEnd, `${label}: timelineWeeks >= maior end`);

  const validTiers = new Set(plan.mockFilters.filter((f) => f.f !== 'all').map((f) => f.f));
  for (const mk of plan.mocks) {
    assert.ok(validTiers.has(mk.tier), `${label}: tier "${mk.tier}" casa com mockFilters`);
    assert.ok(Array.isArray(mk.reqs) && mk.reqs.length > 0, `${label}: mock com reqs`);
  }
  for (const gp of plan.gaps) {
    assert.ok(gp.base >= 0 && gp.base <= 100, `${label}: gap base em 0..100`);
    assert.ok(Array.isArray(gp.topics) && gp.topics.length > 0, `${label}: gap com topics`);
  }
}

/* ---------- Lógica pura ---------- */
test('emptyStore tem o shape esperado', () => {
  assert.deepEqual(emptyStore(), { checked: {}, mocks: {}, scores: {}, updated: 0 });
});

test('normalizeStore higieniza entradas inválidas', () => {
  assert.deepEqual(normalizeStore(null), emptyStore());
  assert.deepEqual(normalizeStore({ foo: 1 }), emptyStore());
  const ok = normalizeStore({ checked: { a: 1 }, updated: 5 });
  assert.equal(ok.checked.a, 1);
  assert.equal(ok.updated, 5);
  assert.deepEqual(ok.mocks, {});
});

test('computeTotals: 0% num store vazio', () => {
  const t = computeTotals(PLAN, emptyStore());
  assert.equal(t.done, 0);
  assert.equal(t.pct, 0);
  assert.ok(t.total > 0);
});

test('phasePct sobe ao marcar tarefas', () => {
  const s = emptyStore();
  assert.equal(phasePct(PLAN, s, 0), 0);
  s.checked[taskId(0, 0)] = 1;
  assert.ok(phasePct(PLAN, s, 0) > 0);
});

test('gapPct parte do nível-base e cresce com tópicos marcados', () => {
  const s = emptyStore();
  const base = PLAN.gaps[0].base;
  assert.equal(gapPct(PLAN, s, 0), base);
  s.checked[gapId(0, 0)] = 1;
  assert.ok(gapPct(PLAN, s, 0) >= base);
});

test('currentPhase aponta para a primeira fase incompleta', () => {
  const s = emptyStore();
  assert.equal(currentPhase(PLAN, s), 0);
  PLAN.phases[0].tasks.forEach((_, i) => { s.checked[taskId(0, i)] = 1; });
  assert.equal(currentPhase(PLAN, s), 1);
});

test('estWeek fica dentro do intervalo da fase atual', () => {
  const w = estWeek(PLAN, emptyStore());
  assert.ok(w >= PLAN.phases[0].start && w <= PLAN.phases[0].end);
});

/* ---------- Integridade do plano raiz (template) ---------- */
test('integridade do plano raiz (plan/)', () => {
  validatePlan(PLAN, 'plan/');
});

/* ---------- Integridade de TODOS os exemplos ---------- */
test('integridade de cada plano em examples/', async () => {
  const examplesDir = join(ROOT, 'examples');
  if (!existsSync(examplesDir)) return; // sem exemplos, nada a validar
  const dirs = readdirSync(examplesDir).filter(
    (d) => statSync(join(examplesDir, d)).isDirectory() && existsSync(join(examplesDir, d, 'plan'))
  );
  assert.ok(dirs.length > 0, 'há pelo menos um exemplo');
  for (const d of dirs) {
    const plan = await loadPlan(join(examplesDir, d, 'plan'));
    validatePlan(plan, `examples/${d}`);
  }
});
