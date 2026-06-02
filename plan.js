/* =====================================================================
   plan.js — Agregador. Compõe o objeto PLAN a partir dos módulos em plan/.
   NÃO edite este arquivo para mudar conteúdo — edite os arquivos em plan/.
   Schema de cada campo: plan/SCHEMA.md
   ===================================================================== */
import meta from './plan/meta.js';
import phases from './plan/phases.js';
import { strengths, gaps } from './plan/gaps.js';
import { mocksLead, mockFilters, mockTierLabels, mocks, mockPresentation } from './plan/mocks.js';
import { routineLead, routine, routineTips } from './plan/routine.js';
import costs from './plan/costs.js';

const PLAN = {
  meta,
  phases,
  strengths,
  gaps,
  mocksLead,
  mockFilters,
  mockTierLabels,
  mocks,
  mockPresentation,
  routineLead,
  routine,
  routineTips,
  costs,
};

export default PLAN;
