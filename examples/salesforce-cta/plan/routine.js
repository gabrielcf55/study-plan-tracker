/* routine.js — Rotina de estudo recomendada e dicas. `items` = [emoji, texto]. */
export const routineLead =
  'Com filhos e trabalho integral, <strong>consistência vale mais que intensidade</strong>. 45 minutos focados por dia superam horas desordenadas no fim de semana.';

export const routine = [
  { title:'Segunda → sexta', sub:'Após os filhos dormirem ou antes de acordar', badge:'45 min/dia', badgeBg:'#dbeafe', badgeColor:'#1e40af',
    items:[ ['book','30 min — 1 tópico no Trailhead (1 badge/dia) ou capítulo do Exam Guide'], ['cards','10 min — registrar 3–5 pontos-chave em flashcards Anki'], ['repeat','5 min — revisão rápida dos flashcards do dia anterior'] ] },
  { title:'Sábado', sub:'Manhã — filhos em atividade ou dormindo', badge:'2h deep dive', badgeBg:'#dcfce7', badgeColor:'#166534',
    items:[ ['timer','60–75 min — mock scenario com cronômetro real, sem pausas'], ['blueprint','45 min — criar ou refinar 1 artefato (integração, data model, system landscape)'] ] },
  { title:'Domingo', sub:'Horário flexível', badge:'1h revisão', badgeBg:'#fef9c3', badgeColor:'#854d0e',
    items:[ ['cards','30 min — revisão de todos os flashcards Anki da semana'], ['chart','15 min — abrir o painel "Onde estou" e avaliar progresso vs. cronograma'], ['clipboard','15 min — definir o foco da semana seguinte'] ] },
];

export const routineTips = {
  title:'bulb Dois pontos que fazem diferença real',
  items:[
    ['briefcase','Use o trabalho como laboratório. Em projetos com Security, Integration ou Mobile, <strong>documente decisões como se explicasse para a banca</strong>. Trabalho vira preparo sem custar minuto extra.'],
    ['globe','<strong>O Review Board é 100% em inglês.</strong> Defender soluções complexas em inglês sob pressão é skill separada — treine nos mocks desde a Fase 2, sem exceção.'],
  ],
};
