/* costs.js — Aba financeira. `rows[].req` = obrigatório (true) ou opcional (false). */
export default {
  summary:[
    { label:'Mínimo obrigatório', amount:'US$ 200', sub:'≈ R$ 1.100 · Só a taxa do exame', bg:'#f0fdf4', border:'#bbf7d0', color:'#166534' },
    { label:'Cenário recomendado', amount:'US$ 200 + ~R$ 60', sub:'Exame + 1 curso Udemy em promoção', bg:'#fffbeb', border:'#fde68a', color:'#92400e' },
  ],
  rows:[
    { req:true,  name:'Taxa do exame Platform App Builder', usd:'US$ 200', brl:'≈ R$ 1.100', highlight:true },
    { req:false, name:'Retake (se necessário)', usd:'US$ 100', brl:'≈ R$ 550', highlight:false },
    { req:false, name:'Curso Udemy (em promoção) + simulados inclusos', usd:'~US$ 15–30', brl:'≈ R$ 30–80', highlight:false },
    { req:false, name:'Certification Practice — 6 simulados completos', usd:'~US$ 50', brl:'≈ R$ 275', highlight:false },
    { req:false, name:'Focus on Force — guia de estudo + simulados', usd:'US$ 40–80', brl:'≈ R$ 220–440', highlight:false },
  ],
  rowsNote:'Câmbio aproximado R$ 5,50/US$. Trailhead, Salesforce Ben, ExamTopics, Simplilearn e Practice Test Geeks são 100% gratuitos — a maioria dos candidatos passa só com eles. Udemy faz promoções regulares (80–90% off); nunca compre pelo preço cheio.',
  strategyTitle:'bulb Estratégia de custo para orçamento até R$ 150',
  strategy:[
    'Comece <strong>100% gratuito</strong>: Trailhead (conteúdo completo) + Salesforce Ben + ExamTopics. A maioria dos candidatos passa só com isso.',
    'Se quiser reforço, compre 1 curso Udemy em promoção (~R$ 30–80) — geralmente inclui vídeos + simulados integrados numa compra só.',
    'Focus on Force (~US$ 40–80) tem reputação forte em qualidade; vale se o orçamento permitir um pouco acima do limite.',
    'Reserve o valor do retake (US$ 100 ≈ R$ 550) <strong>antes</strong> de agendar o exame — entrar sem esse fundo cria pressão psicológica desnecessária.',
    'Verifique se seu empregador subsidia certificações Salesforce — muitas empresas cobrem a taxa do exame integralmente.',
  ],
  note:'Taxa do exame e formato conferidos em jun/2026 (trailhead.salesforce.com/credentials/platformappbuilder). Confirme no site oficial antes de se inscrever — valores e formato podem mudar.',
};
