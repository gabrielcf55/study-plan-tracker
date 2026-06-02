/* mocks.js — Sessões de simulado/prática. `tier` deve casar com um filtro de `mockFilters`.
   TEMPLATE: o campo `res` é onde você aponta ONDE encontrar simulados prontos. */
export const mocksLead =
  'Use esta aba para registrar suas sessões de prática. Comece pelos simulados <strong>por domínio</strong> para mapear lacunas e avance para os <strong>completos</strong>, no formato do exame real.';

export const mockFilters = [
  { f:'all', label:'Todos' },
  { f:'topic', label:'Por Domínio' },
  { f:'full', label:'Simulado Completo' },
];

export const mockTierLabels = { topic:'Por Domínio', full:'Simulado Completo' };

export const mocks = [
  { tier:'topic', title:'Revisão por Domínio (substitua)', time:'~30 min · Por Domínio',
    scenario:'Descreva o recorte: qual domínio, por que ele costuma derrubar candidatos, e o que observar.',
    reqs:[
      'Pergunta/checagem 1 que você precisa dominar',
      'Pergunta/checagem 2',
      'Pergunta/checagem 3'],
    eval:'Defina a meta de acerto (ex.: ≥ 75%) e o que fazer se ficar abaixo.',
    res:[
      'Onde encontrar simulados deste domínio — nome + link (diga se é grátis ou pago)',
      'Banco de questões alternativo — com link'] },
  { tier:'full', title:'Simulado Completo (substitua)', time:'Tempo real do exame · Completo',
    scenario:'Simulado no formato do exame real, com cronômetro e sem consulta. Objetivo: diagnosticar prontidão.',
    reqs:[
      'Condições reais: sem pausas, sem consulta',
      'Registrar o acerto por domínio, não só o total',
      'Listar os domínios mais fracos para revisão'],
    eval:'≥ meta de corte com margem = pronto. Abaixo: revise os domínios fracos e refaça.',
    res:[
      'Provedor de simulado completo nº 1 — com link (grátis/pago)',
      'Provedor nº 2 (use um banco diferente no 2º simulado) — com link'] },
];

export const mockPresentation = {
  title:'bulb Dicas para a prática',
  items:[
    ['1','<strong>Cronometre sempre</strong> — o ritmo é parte do que se treina.'],
    ['2','<strong>Anote o domínio dos erros</strong>, não só a questão — é o que guia a revisão.'],
    ['3','<strong>Use bancos diferentes</strong> entre simulados para não decorar respostas.'],
  ],
};
