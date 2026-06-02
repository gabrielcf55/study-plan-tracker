/* gaps.js — Pontos fortes e domínios a nivelar.
   `base` = nível inicial estimado (0–100); marcar tópicos sobe a barra a partir dele. */
export const strengths =
  'Architecture / Solution Design · Sales Cloud / Service Cloud · Integration & APIs · DevOps / CI-CD — mantenha com 30 min/semana de revisão para não atrofiar.';

export const gaps = [
  { name:'Security & Identity', badge:'dotHigh Prioridade Alta', bcol:'#fee2e2', btxt:'#991b1b', base:30, color:'#ef4444',
    topics:['OAuth 2.0, SAML, OpenID Connect','Shield Platform Encryption','Named Credentials & Auth Providers','Permission Sets, Groups & sharing','Event Monitoring & Field Audit Trail'],
    res:['Trailhead: Identity & Access Management Architect','Apex Hours: Security Architecture playlist','Salesforce Identity & Access Mgmt Exam Guide'] },
  { name:'Heroku & Platform', badge:'dotHigh Prioridade Alta', bcol:'#fee2e2', btxt:'#991b1b', base:20, color:'#ef4444',
    topics:['Heroku Connect e sincronização de dados','Heroku Private Spaces','Quando usar Heroku vs. Salesforce Platform','Dyno types, scaling e routing','Heroku Kafka & Data Services'],
    res:['Trailhead: Heroku Architecture trail','Heroku Dev Center (devcenter.heroku.com)','Apex Hours: Heroku playlist no YouTube'] },
  { name:'Mobile Architecture', badge:'dotMed Prioridade Média', bcol:'#fef3c7', btxt:'#92400e', base:35, color:'#f59e0b',
    topics:['Salesforce Mobile SDK (iOS & Android)','SmartStore para dados offline','Push notifications e mobile security','Mobile SDK custom vs. App Builder','AppExchange mobile patterns'],
    res:['Trailhead: Mobile SDK Basics','Salesforce Mobile SDK Developer Guide','CTA mock scenarios com requisitos mobile'] },
  { name:'Data Architecture (LDV)', badge:'dotMed Prioridade Média', bcol:'#fef3c7', btxt:'#92400e', base:45, color:'#f59e0b',
    topics:['Large Data Volumes — padrões de design','Account Skew e Lookup Skew','External Objects & Salesforce Connect','Estratégias de data archiving','Skinny Tables e campos indexados'],
    res:['Salesforce LDV Best Practices Guide','Trailhead: Data Management','Architect Ohana: discussões sobre LDV'] },
];
