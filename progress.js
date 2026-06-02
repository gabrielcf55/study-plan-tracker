/* =====================================================================
   progress.js — Lógica pura do progresso. Sem DOM, sem efeitos colaterais.
   Mantida separada de app.js para ser testável de forma isolada (node --test).
   ===================================================================== */

/** Estado vazio de progresso. */
export function emptyStore() {
  return { checked: {}, mocks: {}, scores: {}, updated: 0 };
}

/** IDs estáveis dos itens marcáveis. */
export const taskId = (phaseIdx, itemIdx) => `p${phaseIdx}t${itemIdx}`;
export const gapId = (gapIdx, itemIdx) => `g${gapIdx}t${itemIdx}`;

/** Normaliza um objeto vindo da nuvem/arquivo num store válido. */
export function normalizeStore(raw) {
  if (!raw || typeof raw !== 'object' || !raw.checked) return emptyStore();
  return {
    checked: { ...raw.checked },
    mocks: { ...(raw.mocks || {}) },
    scores: { ...(raw.scores || {}) },
    updated: Number(raw.updated) || 0,
  };
}

/** Totais gerais: tarefas + tópicos de gaps. */
export function computeTotals(plan, store) {
  let total = 0;
  let done = 0;
  plan.phases.forEach((p, pi) =>
    p.tasks.forEach((_, i) => {
      total++;
      if (store.checked[taskId(pi, i)]) done++;
    })
  );
  plan.gaps.forEach((g, gi) =>
    g.topics.forEach((_, i) => {
      total++;
      if (store.checked[gapId(gi, i)]) done++;
    })
  );
  const mocksDone = plan.mocks.filter((_, i) => store.mocks[i]).length;
  return { total, done, pct: total ? Math.round((done / total) * 100) : 0, mocksDone };
}

/** Percentual de conclusão de uma fase. */
export function phasePct(plan, store, phaseIdx) {
  const tasks = plan.phases[phaseIdx].tasks;
  if (!tasks.length) return 0;
  const done = tasks.reduce((n, _, i) => n + (store.checked[taskId(phaseIdx, i)] ? 1 : 0), 0);
  return Math.round((done / tasks.length) * 100);
}

/** Nível estimado de um domínio (base + progresso dos tópicos marcados). */
export function gapPct(plan, store, gapIdx) {
  const g = plan.gaps[gapIdx];
  const n = g.topics.length;
  if (!n) return g.base;
  const done = g.topics.reduce((acc, _, i) => acc + (store.checked[gapId(gapIdx, i)] ? 1 : 0), 0);
  return Math.round(g.base + ((100 - g.base) * done) / n);
}

/** Primeira fase ainda não 100% concluída (= "onde você está"). */
export function currentPhase(plan, store) {
  for (let i = 0; i < plan.phases.length; i++) {
    if (phasePct(plan, store, i) < 100) return i;
  }
  return plan.phases.length - 1;
}

/** Semana estimada do cronograma, interpolando dentro da fase atual. */
export function estWeek(plan, store) {
  const cp = currentPhase(plan, store);
  const p = plan.phases[cp];
  const frac = phasePct(plan, store, cp) / 100;
  return Math.round(p.start + (p.end - p.start) * frac);
}
