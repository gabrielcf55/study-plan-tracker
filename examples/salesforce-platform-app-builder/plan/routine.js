/* routine.js — Rotina de estudo recomendada e dicas. `items` = [emoji, texto]. */
export const routineLead =
  'Com 1 hora por dia e 8 semanas, você tem ~56 horas de estudo — suficiente para um iniciante passar no Platform App Builder se o tempo for <strong>focado e prático</strong>. Trailhead + Developer Org é a combinação vencedora: teoria e prática juntas, sem custo.';

export const routine = [
  { title:'Segunda → Quinta', sub:'Horário fixo de sua escolha', badge:'1h/dia · Conteúdo', badgeBg:'#dbeafe', badgeColor:'#1e40af',
    items:[ ['book','45 min — 1 módulo ou seção no Trailhead (meta: completar 1 badge por sessão)'], ['pencil','10 min — praticar na Developer Org o que foi estudado (criar 1 campo, 1 regra, 1 Flow)'], ['note','5 min — anotar 2–3 pontos que você erraria no exame sobre o tópico do dia'] ] },
  { title:'Sexta', sub:'Sessão de revisão semanal', badge:'1h · Revisão', badgeBg:'#fef3c7', badgeColor:'#854d0e',
    items:[ ['repeat','30 min — rever as anotações da semana e consolidar o que ficou confuso'], ['clipboard','30 min — resolver 15–20 questões do ExamTopics ou Salesforce Ben sobre os tópicos da semana'] ] },
  { title:'Fim de semana', sub:'Flexível — use pelo menos 1 dia', badge:'1–2h · Prática extra', badgeBg:'#dcfce7', badgeColor:'#166534',
    items:[ ['blueprint','60–90 min — construir algo na Developer Org: mini-app com Flow + objetos + UI customizada'], ['chart','15 min — abrir o painel "Onde estou" e checar progresso vs. cronograma'] ] },
];

export const routineTips = {
  title:'bulb O que realmente faz diferença',
  items:[
    ['pencil','<strong>A Developer Org é obrigatória.</strong> Questões do exame descrevem comportamentos da plataforma — quem praticou na org reconhece, quem só leu fica em dúvida. Crie objetos, Flows e regras com as mãos.'],
    ['target','<strong>Complete a Trailmix oficial</strong> em trailhead.salesforce.com (buscar "Prepare for Your Salesforce Platform App Builder Credential"). Foi montada pela Salesforce para cobrir exatamente o que cai.'],
    ['blueprint','<strong>Flow é o coração do exame (28%).</strong> Crie pelo menos 5 Flows diferentes na org — Record-Triggered, Screen e Scheduled — antes de fazer o simulado final. Prática aqui compensa horas de leitura.'],
  ],
};
