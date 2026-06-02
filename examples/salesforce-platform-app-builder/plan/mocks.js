/* mocks.js — Sessões de simulado. `tier` deve casar com um filtro de `mockFilters`.
   Cada mock tem cenário, o que treina e onde encontrar o material. */
export const mocksLead =
  'Os simulados são o seu sensor de prontidão. Comece pelos de <strong>revisão por domínio</strong> para mapear lacunas específicas, depois avance para os <strong>simulados completos</strong> que replicam o exame real (65 questões, 105 min). Meta antes de agendar o exame: acertar ≥ 70% de forma consistente.';

export const mockFilters = [
  { f:'all', label:'Todos' },
  { f:'topic', label:'Revisão por Domínio (30–40 min)' },
  { f:'full', label:'Simulado Completo (105 min)' },
];

export const mockTierLabels = { topic:'Revisão por Domínio', full:'Simulado Completo' };

export const mocks = [
  { tier:'topic', title:'Business Logic & Automação — Revisão Focada', time:'30–40 min · Por Domínio',
    scenario:'O maior domínio (28%). Questões apresentam cenários onde você deve escolher o tipo de Flow correto (Record-Triggered? Screen? Scheduled?) ou identificar quando Approval Process é mais adequado. Para iniciantes, é o domínio que mais pega de surpresa.',
    reqs:[
      'Identificar o tipo de Flow correto: Record-Triggered, Screen ou Scheduled',
      'Decidir entre Flow vs. Approval Process vs. Validation Rule no cenário dado',
      'Escrever condições de Validation Rules com ISBLANK, ISCHANGED, AND, OR',
      'Reconhecer os limites de cada ferramenta (quando a resposta certa é Apex)',
    ],
    eval:'Meta: ≥ 70% de acerto neste domínio. Revise os tópicos errados nos módulos Trailhead correspondentes.',
    res:[
      '<a href="https://www.salesforceben.com/free-salesforce-platform-app-builder-practice-exam-with-answers/" target="_blank" rel="noopener">Salesforce Ben — 60 questões gratuitas com respostas explicadas</a> (Grátis)',
      '<a href="https://www.examtopics.com/exams/salesforce/certified-platform-app-builder/" target="_blank" rel="noopener">ExamTopics — banco de questões gratuito</a> (Grátis · filtre por Process Automation)',
      'Trailhead: Trailmix oficial — seção de Business Logic (trailhead.salesforce.com)',
    ]},
  { tier:'topic', title:'Data Modeling & Fundamentos — Revisão Focada', time:'30–40 min · Por Domínio',
    scenario:'Dois domínios que juntos somam 45% do exame. Questões cobrem escolha de tipo de relacionamento, quando criar objeto customizado, segurança de dados (quem vê o quê) e ferramentas de importação/exportação.',
    reqs:[
      'Escolher entre Lookup e Master-Detail no cenário correto (e entender as consequências)',
      'Aplicar a regra de segurança: OWD restritivo + sharing rules abertas, não o inverso',
      'Identificar quando usar Import Wizard vs. Data Loader (volume, formato, automação)',
      'Diferenciar Perfis, Permission Sets e Papéis — o que cada um controla',
    ],
    eval:'Meta: ≥ 70% de acerto combinado. Data Modeling costuma ser mais fácil — use para ganhar confiança.',
    res:[
      '<a href="https://www.examtopics.com/exams/salesforce/certified-platform-app-builder/" target="_blank" rel="noopener">ExamTopics — banco gratuito</a> (Grátis · filtre por Data Modeling e Fundamentals)',
      '<a href="https://www.simplilearn.com/salesforce-app-builder-exam-free-practice-test" target="_blank" rel="noopener">Simplilearn — 60 questões gratuitas</a> (Grátis)',
      'Trailmix oficial: revisar módulos de Data Modeling e User Management',
    ]},
  { tier:'topic', title:'User Interface & App Deployment — Revisão Focada', time:'20–30 min · Por Domínio',
    scenario:'Os dois domínios menores (27% combinados). UI cobre o que é possível no Lightning App Builder sem código; Deployment cobre a mecânica de mover customizações entre ambientes. Questões são objetivas e diretas — não deixe pontos aqui na mesa.',
    reqs:[
      'Diferenciar o que é configurado em Page Layout vs. em Record Page (App Builder)',
      'Identificar os 4 tipos de Sandbox e seus casos de uso',
      'Listar componentes que PODEM e NÃO PODEM ir em Change Sets',
      'Diferenciar Managed e Unmanaged Packages — proteção de código e licenciamento',
    ],
    eval:'Meta: ≥ 75% de acerto. São os domínios mais diretos do exame.',
    res:[
      '<a href="https://practicetestgeeks.com/salesforce-certification-salesforce-platform-app-builder-practice-test" target="_blank" rel="noopener">Practice Test Geeks — 1.259 questões gratuitas</a> (Grátis)',
      '<a href="https://www.salesforceexams.com/Platform-App-Builder-Practice-Questions" target="_blank" rel="noopener">SalesforceExams.com — banco de questões gratuito</a> (Grátis)',
    ]},
  { tier:'full', title:'Simulado Completo #1 — Salesforce Ben (Gratuito)', time:'105 min · Simulado Completo',
    scenario:'Primeiro simulado completo no formato do exame real. 60 questões do Salesforce Ben com cronômetro de 105 min. Faz-se ao início da Semana 8, após completar todas as fases de conteúdo. Objetivo: mapear lacunas, não passar.',
    reqs:[
      'Condições reais: sem pausas, sem consulta ao Trailhead, em local silencioso',
      'Registrar o percentual de acerto por domínio ao final (não só o total)',
      'Identificar os 2–3 domínios com pior desempenho para revisão focada',
    ],
    eval:'≥ 70%: caminho certo. 60–70%: intensifique revisão nos domínios fracos. < 60%: estenda o preparo 1 semana e refaça os módulos Trailhead dos erros.',
    res:[
      '<a href="https://www.salesforceben.com/free-salesforce-platform-app-builder-practice-exam-with-answers/" target="_blank" rel="noopener">Salesforce Ben — 60 questões gratuitas com respostas explicadas</a> (Grátis)',
      '<a href="https://www.examtopics.com/exams/salesforce/certified-platform-app-builder/" target="_blank" rel="noopener">ExamTopics — banco alternativo gratuito</a> (Grátis)',
    ]},
  { tier:'full', title:'Simulado Completo #2 — ExamTopics / Practice Test Geeks (Gratuito)', time:'105 min · Simulado Completo',
    scenario:'Segundo simulado usando banco diferente para evitar memorização. Use ExamTopics ou Practice Test Geeks para 60 questões novas. Faz-se no meio da Semana 8, após revisar os erros do Simulado #1.',
    reqs:[
      'Banco diferente do Simulado #1 — evitar viés de memória das mesmas questões',
      'Cronometrar: máximo 105 min',
      'Focar nos domínios que ficaram abaixo de 60% no Simulado #1',
      'Comparar a evolução percentual entre os dois simulados',
    ],
    eval:'Meta: ≥ 70%. Se ainda abaixo, identifique se é falta de conteúdo (→ Trailhead) ou de vocabulário do exame (→ mais simulados).',
    res:[
      '<a href="https://practicetestgeeks.com/salesforce-certification-salesforce-platform-app-builder-practice-test" target="_blank" rel="noopener">Practice Test Geeks — 1.259 questões, acesso gratuito</a> (Grátis)',
      '<a href="https://www.simplilearn.com/salesforce-app-builder-exam-free-practice-test" target="_blank" rel="noopener">Simplilearn — 60 questões gratuitas</a> (Grátis)',
      '<a href="https://examsland.com/free-practice-test/platform-app-builder" target="_blank" rel="noopener">ExamsLand — simulado gratuito sem login</a> (Grátis)',
    ]},
  { tier:'full', title:'Simulado Completo #3 — Udemy ou Certification Practice', time:'105 min · Simulado Completo',
    scenario:'Terceiro simulado usando banco premium para questões mais próximas do padrão atual do exame. Udemy em promoção sai em ~R$ 30–80 e geralmente inclui múltiplos simulados. Faz-se 2–3 dias antes do exame real.',
    reqs:[
      'Usar banco premium para maior diversidade e atualização de questões',
      'Fechar com nota ≥ 70% para entrar no exame com confiança',
      'Não memorizar respostas — entender o raciocínio por trás de cada questão',
    ],
    eval:'≥ 70%: agende o exame com confiança. < 70%: mais 1 semana de revisão antes de agendar.',
    res:[
      '<a href="https://www.udemy.com/course/salesforce-platform-app-builder-practice-exams-2025/" target="_blank" rel="noopener">Udemy — Simulados Platform App Builder 2025</a> (Pago · ~R$ 30–80 em promoção)',
      '<a href="https://certificationpractice.com/practice-exams/salesforce-platform-app-builder" target="_blank" rel="noopener">Certification Practice — 6 simulados completos de 65 questões</a> (Pago · ~US$ 50)',
      '<a href="https://focusonforce.com/salesforce-certifications/platform-app-builder/" target="_blank" rel="noopener">Focus on Force — guia de estudo + simulados</a> (Pago · ~US$ 40–80)',
    ]},
];

export const mockPresentation = {
  title:'clipboard Como aproveitar cada simulado ao máximo',
  items:[
    ['1','<strong>Condições reais</strong> — sem pausas, sem consulta ao Trailhead, cronômetro ligado nos 105 min.'],
    ['2','<strong>Por domínio</strong> — ao final, calcule seu percentual por área (não só o total geral).'],
    ['3','<strong>Revisão imediata</strong> — leia a explicação de CADA questão errada antes de prosseguir.'],
    ['4','<strong>Padrão de erro</strong> — é falta de conteúdo (→ refaça o módulo Trailhead) ou vocabulário do exame (→ mais simulados)?'],
    ['5','<strong>Meta graduada</strong> — Simulado 1: diagnóstico → Simulado 2: evolução → Simulado 3: confirmação de aprovação.'],
  ],
};
