/* gaps.js — Pontos fortes e domínios a nivelar.
   TEMPLATE: liste seus domínios. `base` = nível inicial estimado (0–100). */
export const strengths =
  'Liste aqui o que você já domina, para manter com revisão leve. Ex.: "Fundamentos da plataforma · Lógica de negócio".';

export const gaps = [
  { name:'Domínio de maior peso (substitua)', badge:'dotHigh Prioridade Alta', bcol:'#fee2e2', btxt:'#991b1b', base:10, color:'#ef4444',
    topics:[
      'Tópico-chave 1 deste domínio',
      'Tópico-chave 2',
      'Tópico-chave 3'],
    res:[
      'Recurso oficial gratuito (ex.: módulo/trilha) — com link',
      'Banco de questões / material complementar — com link'] },
  { name:'Segundo domínio (substitua)', badge:'dotMed Prioridade Média', bcol:'#fef3c7', btxt:'#92400e', base:25, color:'#f59e0b',
    topics:[
      'Tópico-chave 1',
      'Tópico-chave 2'],
    res:[
      'Recurso de estudo deste domínio — com link'] },
];
