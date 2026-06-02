/* gaps.js — Pontos fortes e domínios a nivelar.
   `base` = nível inicial estimado (0–100); marcar tópicos sobe a barra a partir dele.
   `topics[]` viram checkboxes que contam no progresso. */
export const strengths =
  'Por ser iniciante, você parte sem vícios de abordagem — vai aprender direto os padrões que o exame avalia. A Developer Org gratuita + Trailhead cobre todo o conteúdo necessário sem custo extra.';

export const gaps = [
  { name:'Business Logic & Process Automation', badge:'dotHigh Maior Peso — 28%', bcol:'#fee2e2', btxt:'#991b1b', base:0, color:'#ef4444',
    topics:[
      'Flow: Record-Triggered, Screen Flow e Scheduled Flow — quando usar cada tipo',
      'Approval Processes: submissão, aprovação, rejeição e recall',
      'Validation Rules com funções de fórmula (AND, OR, ISBLANK, ISCHANGED)',
      'Formula Fields: CASE, IF, TEXT, DATE, DATEVALUE e funções de texto',
      'Quando usar Flow vs. Apex — regra: declarativo primeiro, código só quando necessário',
      'Debug de Flows com o Flow Debugger nativo na org',
    ],
    res:[
      'Trailhead: "Flow Basics" — módulo gratuito (trailhead.salesforce.com)',
      'Trailhead: "Approval Processes" — módulo gratuito',
      'Trailhead: "Formulas and Validations" — módulo gratuito',
      'Simulados gratuitos: Salesforce Ben (salesforceben.com/free-practice-exam) e ExamTopics (examtopics.com)',
    ]},
  { name:'Salesforce Fundamentals', badge:'dotMed Segundo Maior — 23%', bcol:'#fef3c7', btxt:'#92400e', base:5, color:'#f59e0b',
    topics:[
      'Arquitetura da plataforma: objetos, campos, registros e navegação Lightning',
      'Segurança: OWD (Organization-Wide Defaults), sharing rules, field-level security',
      'Perfis vs. Permission Sets vs. Papéis (Roles) — diferenças e quando usar cada',
      'Sales Cloud vs. Service Cloud vs. Platform — sobreposições e diferenças',
      'Reports, Dashboards e Report Types customizados',
      'Funcionalidades mobile e Lightning Experience',
    ],
    res:[
      'Trailhead: "Salesforce Platform Basics" — módulo gratuito (trailhead.salesforce.com)',
      'Trailhead: "User Management" e "Data Security" — módulos gratuitos',
      'Trailmix oficial: buscar "Prepare for Your Salesforce Platform App Builder Credential" no Trailhead',
    ]},
  { name:'Data Modeling & Management', badge:'dotMed Terceiro Maior — 22%', bcol:'#fef3c7', btxt:'#92400e', base:0, color:'#f59e0b',
    topics:[
      'Objetos standard vs. custom — quando criar um objeto customizado',
      'Tipos de campos e quando usar cada (Text, Number, Formula, Picklist, Lookup, etc.)',
      'Relacionamentos: Lookup, Master-Detail, Many-to-Many com Junction Object',
      'Record Types e combinação com Page Layouts',
      'Import Wizard vs. Data Loader — qual usar em cada cenário',
      'Roll-Up Summary Fields: o que é possível e quais são as limitações',
    ],
    res:[
      'Trailhead: "Data Modeling" — módulo gratuito (trailhead.salesforce.com)',
      'Trailhead: "Data Management" — módulo gratuito',
      'Prática obrigatória: criar objetos, campos e relacionamentos na Developer Org gratuita',
    ]},
  { name:'User Interface', badge:'dotLow Quarto Maior — 17%', bcol:'#dcfce7', btxt:'#166534', base:0, color:'#16a34a',
    topics:[
      'Lightning App Builder: Record Pages, Home Pages e App Pages — diferenças',
      'Visibility Rules para componentes dinâmicos em Record Pages',
      'Quick Actions: Object-Level vs. Global Actions — quando usar cada',
      'Page Layouts vs. Record Pages (App Builder) — diferença e quando usar',
      'AppExchange: instalação de pacotes e diferença entre Managed e Unmanaged',
      'Compact Layouts e List Views customizadas',
    ],
    res:[
      'Trailhead: "Lightning App Builder" — módulo gratuito (trailhead.salesforce.com)',
      'Trailhead: "Lightning Experience Customization" — módulo gratuito',
      'Prática: criar e customizar apps e páginas na Developer Org',
    ]},
  { name:'App Deployment', badge:'dotInfo Menor Peso — 10%', bcol:'#dbeafe', btxt:'#1e40af', base:0, color:'#2563eb',
    topics:[
      'Change Sets: outbound e inbound, como conectar orgs via Deployment Connection',
      'O que PODE e o que NÃO PODE ser incluído num Change Set',
      'Tipos de Sandbox: Developer, Developer Pro, Partial Copy, Full — usos e limites',
      'Managed vs. Unmanaged Packages — proteção de código e distribuição via AppExchange',
    ],
    res:[
      'Trailhead: "Change Sets and Deployment" — módulo gratuito (trailhead.salesforce.com)',
      'Documentação oficial: "Sandbox Overview" em help.salesforce.com',
    ]},
];
