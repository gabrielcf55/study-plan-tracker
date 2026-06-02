/* mocks.js — Cenários de simulado. `tier` deve casar com um filtro de `mockFilters`.
   Cada mock tem cenário, requisitos a arquitetar, o que a banca avalia e onde praticar (res). */
export const mocksLead =
  'Os mocks são o coração da preparação. Comece pelos de <strong>Evaluation</strong> (60 min, cenário focado) e avance para os de <strong>Review Board</strong> (180 min, empresa completa). Pratique em inglês, com cronômetro real, defendendo cada decisão em voz alta.';

export const mockFilters = [
  { f:'all', label:'Todos' },
  { f:'eval', label:'Evaluation (60 min)' },
  { f:'rb', label:'Review Board (180 min)' },
];

export const mockTierLabels = { eval:'Evaluation', rb:'Review Board' };

const REVIEW_RES = [
  'Mock reviews ao vivo — <a href="https://www.architectohana.com/" target="_blank" rel="noopener">Architect Ohana</a> e o grupo CTA Gang of Four fazem sessões com feedback de CTAs (grátis)',
  '<a href="https://www.apexhours.com/" target="_blank" rel="noopener">Apex Hours</a> — playlists de CTA Review Board e walkthroughs de cenários (grátis)',
  '<a href="https://www.salesforceben.com/salesforce-cta/" target="_blank" rel="noopener">Salesforce Ben</a> — guia do CTA e exemplos de mock scenarios',
];

export const mocks = [
  { tier:'eval', title:'GlobalRetail Co — Loyalty & Service', time:'60 min · Evaluation',
    scenario:'A GlobalRetail opera 400 lojas e e-commerce em 6 países. Quer unificar atendimento (call center + chat) e lançar um programa de fidelidade com pontos em tempo real. CRM atual fragmentado por país; dados de cliente duplicados.',
    reqs:['Modelar Customer 360 unificando contas dos 6 países sem duplicidade','Service Cloud para call center + chat com roteamento por idioma','Programa de fidelidade com saldo de pontos em tempo real no app mobile','Integrar com o ERP de estoque (REST, near real-time)','LGPD/GDPR: consentimento e direito ao esquecimento'],
    eval:'Avaliam se você escolhe corretamente entre Person Accounts vs. Contacts, justifica a estratégia de dedup/MDM, define o padrão de integração certo (e não "tudo síncrono"), e trata privacidade como requisito de arquitetura — não como detalhe.',
    res:REVIEW_RES },
  { tier:'eval', title:'MedAssist Health — Patient Engagement', time:'60 min · Evaluation',
    scenario:'Rede de clínicas quer um portal de pacientes (agendamento, resultados de exames, mensagens com médicos) sobre Salesforce. Dados de saúde sensíveis, requisitos de auditoria rígidos, integração com sistema hospitalar legado (SOAP).',
    reqs:['Portal externo de pacientes com login seguro (Experience Cloud)','Compartilhamento: paciente vê só seus dados; médico vê só seus pacientes','Criptografia de dados clínicos sensíveis em repouso','Auditoria completa de quem acessou cada registro','Integração com HIS legado via SOAP, com dados quase em tempo real'],
    eval:'Foco em Security & Sharing (sharing sets em Experience Cloud, Shield Encryption, Field Audit Trail) e em escolher o mecanismo de identidade correto para usuários externos. Espere perguntas sobre por que NÃO usar certas abordagens.',
    res:REVIEW_RES },
  { tier:'eval', title:'FinServe Bank — Wealth Management', time:'60 min · Evaluation',
    scenario:'Banco de investimento quer dar a 2.000 consultores uma visão 360 de clientes de alto patrimônio, com recomendações e compliance. Volume alto: 50M de contas, 500M de transações históricas.',
    reqs:['Visão 360 do cliente com histórico de transações (LDV)','Acesso restrito por hierarquia de consultores e segregação regulatória','Recomendações de produtos integradas a um motor externo','Mobile offline para consultores em visita a clientes','Trilha de auditoria para reguladores'],
    eval:'É um cenário de LDV + Security. Avaliam skinny tables/indexação, estratégia de sharing em escala (evitando recálculos massivos), Salesforce Connect vs. replicação para histórico, e arquitetura mobile offline com Mobile SDK + SmartStore.',
    res:REVIEW_RES },
  { tier:'rb', title:'AutoNova — Global Automotive Manufacturer', time:'180 min · Review Board',
    scenario:'Montadora global (vendas diretas + rede de concessionárias em 12 países) quer transformar a relação com o cliente: configurador de veículos online, jornada de compra, pós-venda, agendamento de serviço nas concessionárias e um app mobile para donos de veículos. Múltiplos sistemas legados (SAP, DMS das concessionárias, telemetria IoT dos carros).',
    reqs:['Org strategy: single vs. multi-org para fábrica + concessionárias independentes','Configurador de produto (CPQ) integrado ao catálogo SAP','Jornada de marketing + e-commerce de acessórios','Service para agendamento nas concessionárias (Field Service)','App mobile para donos: status do veículo, agendamento, telemetria IoT','Integração IoT em alto volume (telemetria) — qual padrão?','Identidade: clientes finais, funcionários da fábrica, usuários das concessionárias','LDV: histórico de veículos e eventos de telemetria','Governança de deploy entre 12 países'],
    eval:'Cenário "kitchen sink". A banca quer ver org strategy bem justificada, separação de identidade por persona, padrão de integração correto por caso (IoT ≠ CPQ ≠ SAP), Field Service bem aplicado, e uma estratégia de governança/dev lifecycle multi-país. Trade-offs explícitos valem mais que a solução "perfeita".',
    res:REVIEW_RES },
  { tier:'rb', title:'EduWorld — International Education Platform', time:'180 min · Review Board',
    scenario:'Plataforma de educação com universidades parceiras, alunos e empregadores. Quer gerir o ciclo de vida do aluno (inscrição → curso → certificação → emprego), portais distintos para cada persona, marketplace de cursos e analytics de empregabilidade. Picos sazonais enormes nas matrículas.',
    reqs:['3 portais Experience Cloud: aluno, universidade, empregador','Modelo de dados do ciclo de vida do aluno entre instituições','Marketplace de cursos com pagamentos (gateway externo)','Picos sazonais de matrícula — escalabilidade e LDV','Recomendação de vagas a alunos (motor de IA externo)','Identidade federada: SSO com sistemas das universidades','Analytics de empregabilidade (CRM Analytics / data platform)','Estratégia de archiving para coortes antigas'],
    eval:'Avaliam sharing complexo entre 3 personas, identidade federada (SAML/OIDC por universidade), arquitetura para picos sazonais (async, bulkification, governor limits), e a fronteira entre Salesforce e plataformas externas de analytics/IA. Cuidado para não sobre-engenheirar.',
    res:REVIEW_RES },
  { tier:'rb', title:'PowerGrid Utilities — Field Service Transformation', time:'180 min · Review Board',
    scenario:'Concessionária de energia com 5M de clientes residenciais/comerciais quer modernizar atendimento, faturamento e operações de campo (técnicos em rede elétrica). Inclui medição inteligente (smart meters gerando dados massivos), portal de autoatendimento e despacho de técnicos com app offline.',
    reqs:['Atendimento omnichannel + portal de autoatendimento (5M clientes)','Field Service: despacho, otimização de rotas, app mobile offline','Ingestão de dados de smart meters (altíssimo volume) — onde processar?','Faturamento integrado a sistema de billing legado','Sharing: clientes, técnicos terceirizados, parceiros','Resiliência e disaster recovery para serviço essencial','Estratégia de dados: o que fica no core vs. Heroku/data lake','Compliance regulatório do setor de energia'],
    eval:'Cenário ideal para mostrar Heroku/Data Cloud para alto volume de IoT (smart meters), Field Service Lightning offline, e decisões de "o que NÃO colocar no Salesforce core". Esperam discussão de DR/resiliência e uma fronteira de dados bem desenhada entre plataformas.',
    res:REVIEW_RES },
];

export const mockPresentation = {
  title:'mic Estrutura de apresentação que a banca espera',
  items:[
    ['1','<strong>Premissas & escopo</strong> — o que você assumiu e por quê (1–2 min).'],
    ['2','<strong>System landscape</strong> — visão geral dos sistemas e fluxos de dados.'],
    ['3','<strong>Por requisito</strong> — solução, alternativas descartadas e justificativa.'],
    ['4','<strong>Data model · Integração · Security/Sharing · LDV · Dev lifecycle</strong>.'],
    ['5','<strong>Riscos & trade-offs</strong> — mostre que você enxerga o que pode dar errado.'],
  ],
};
