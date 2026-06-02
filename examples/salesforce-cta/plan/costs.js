/* costs.js — Aba financeira. `rows[].req` = obrigatório (true) ou opcional (false). */
export default {
  summary:[
    { label:'Mínimo obrigatório', amount:'US$ 6.000', sub:'≈ R$ 33.000 · Evaluation + Review Board', bg:'#f0fdf4', border:'#bbf7d0', color:'#166534' },
    { label:'Cenário completo', amount:'US$ 9.000', sub:'Com workshop + retakes de contingência', bg:'#fffbeb', border:'#fde68a', color:'#92400e' },
  ],
  rows:[
    { req:true,  name:'Architect Review Board Evaluation (Etapa 1)', usd:'US$ 1.500', brl:'≈ R$ 8.250', highlight:false },
    { req:true,  name:'Architect Review Board Exam (Etapa 2)', usd:'US$ 4.500', brl:'≈ R$ 24.750', highlight:true },
    { req:false, name:'Retake da Evaluation (US$ 750)', usd:'US$ 750', brl:'≈ R$ 4.125', highlight:false },
    { req:false, name:'CTA Workshop oficial CTA601', usd:'~US$ 750', brl:'≈ R$ 4.125', highlight:false },
    { req:false, name:'Retake do Review Board Exam', usd:'US$ 2.250', brl:'≈ R$ 12.375', highlight:false },
  ],
  rowsNote:'Pré-requisitos (System Architect + Application Architect) somam ~8 exames a US$ 200 cada, caso ainda falte algum. Câmbio aproximado R$ 5,50.',
  strategyTitle:'bulb Estratégia financeira recomendada',
  strategy:[
    'Negocie com seu empregador — muitas empresas Salesforce custeiam o CTA como investimento estratégico em arquitetura.',
    'Reserve o fundo de retake <strong>antes</strong> de se inscrever — entrar no exame sem esse fundo cria pressão psicológica desnecessária.',
    'O ROI do CTA em salário e projetos costuma recuperar o investimento total em 6–12 meses para consultores sênior.',
    'Verifique se sua empresa tem acordo com a Salesforce com desconto em certificações e workshops oficiais.',
  ],
  note:'Custos e formato do exame conferidos em jun/2026 (Trailhead / Salesforce Ben). Confirme sempre no site oficial antes de se inscrever — preços e formato podem mudar.',
};
