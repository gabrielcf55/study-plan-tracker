/* phases.js — As fases do plano. Cada `tasks[]` vira checkbox que conta no progresso.
   TEMPLATE: troque por suas fases. `start`/`end` = semanas; `start <= end`. */
export default [
  { tag:'Setup', name:'Orientação', weeks:'Sem 1', color:'#64748b', bg:'#f8fafc', start:1, end:1,
    goal:'Entender o objetivo e montar a base de estudo',
    desc:'Antes de mergulhar no conteúdo, defina o alvo (guia oficial, pesos dos tópicos) e prepare ferramentas e rotina. 1 hora aqui economiza várias depois.',
    tasks:[
      'Ler o guia oficial do exame/objetivo e anotar os pesos de cada tópico',
      'Listar os recursos que vai usar (oficiais grátis + pagos, se houver)',
      'Definir a rotina semanal e bloquear o tempo no calendário',
      'Montar ferramenta de flashcards e ambiente de prática'] },
  { tag:'Fundamentos', name:'Fundamentos', weeks:'Sem 2–5', color:'#dc2626', bg:'#fff5f5', start:2, end:5,
    goal:'Cobrir a base do conteúdo',
    desc:'Construa o alicerce. Estude os domínios fundamentais e pratique cada conceito assim que aprender.',
    tasks:[
      'Estudar o domínio fundamental nº 1 (substitua pelo seu)',
      'Estudar o domínio fundamental nº 2',
      'Praticar cada conceito num ambiente real assim que aprender',
      'Registrar pontos-chave em flashcards'] },
  { tag:'Aprofundamento', name:'Aprofundamento', weeks:'Sem 6–9', color:'#d97706', bg:'#fffbeb', start:6, end:9,
    goal:'Dominar os tópicos de maior peso',
    desc:'Foque nos domínios que mais caem e nos que você sente mais dificuldade (veja a aba Gaps).',
    tasks:[
      'Estudar o domínio de maior peso a fundo',
      'Fazer exercícios práticos dos tópicos difíceis',
      'Revisar os flashcards das semanas anteriores'] },
  { tag:'Revisão', name:'Revisão & Simulados', weeks:'Sem 10–11', color:'#16a34a', bg:'#f0fdf4', start:10, end:11,
    goal:'Consolidar e treinar no formato real',
    desc:'Sem conteúdo novo: revise, identifique lacunas com simulados e treine o ritmo do exame.',
    tasks:[
      'Fazer os simulados por domínio (aba Mocks) e mapear gaps',
      'Fazer 1–2 simulados completos com cronômetro',
      'Revisar os tópicos com pior desempenho'] },
  { tag:'Exame', name:'Exame', weeks:'Sem 12', color:'#2563eb', bg:'#eff6ff', start:12, end:12,
    goal:'Realizar o exame e conquistar o objetivo',
    desc:'Logística conferida, descanso na véspera, e foco no dia.',
    tasks:[
      'Conferir logística (documento, horário, plataforma)',
      'Revisão leve na véspera — só flashcards, zero conteúdo novo',
      'Fazer o exame'] },
];
