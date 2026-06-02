/* routine.js — Rotina de estudo recomendada e dicas. `items` = [emoji, texto]. */
export const routineLead =
  'Ajuste a rotina ao seu tempo disponível. <strong>Consistência diária vence maratonas de fim de semana.</strong>';

export const routine = [
  { title:'Dias de semana', sub:'No melhor horário para você', badge:'X min/dia', badgeBg:'#dbeafe', badgeColor:'#1e40af',
    items:[ ['book','Estudar conteúdo novo (substitua pela sua meta diária)'], ['cards','Registrar pontos-chave em flashcards'] ] },
  { title:'Fim de semana', sub:'Sessão mais longa', badge:'Revisão + prática', badgeBg:'#dcfce7', badgeColor:'#166534',
    items:[ ['repeat','Revisar os flashcards da semana'], ['chart','Abrir o painel "Onde estou" e checar o progresso'] ] },
];

export const routineTips = {
  title:'bulb O que faz diferença',
  items:[
    ['target','<strong>Pratique, não só leia</strong> — aplicar o conteúdo fixa muito mais do que reler.'],
    ['calendar','<strong>Revisão espaçada</strong> — revisar o conteúdo em intervalos crescentes consolida a memória.'],
  ],
};
