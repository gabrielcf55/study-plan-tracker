/* costs.js — Aba financeira. `rows[].req` = obrigatório (true) ou opcional (false). */
export default {
  summary:[
    { label:'Mínimo obrigatório', amount:'—', sub:'Substitua pela taxa do seu exame', bg:'#f0fdf4', border:'#bbf7d0', color:'#166534' },
    { label:'Cenário completo', amount:'—', sub:'Com cursos/simulados opcionais', bg:'#fffbeb', border:'#fde68a', color:'#92400e' },
  ],
  rows:[
    { req:true,  name:'Taxa do exame (substitua)', usd:'—', brl:'—', highlight:true },
    { req:false, name:'Curso/material opcional', usd:'—', brl:'—', highlight:false },
    { req:false, name:'Simulados pagos (opcional)', usd:'—', brl:'—', highlight:false },
  ],
  rowsNote:'Liste aqui o que é gratuito (ex.: materiais oficiais) vs. pago. Inclua a moeda e o câmbio usado.',
  strategyTitle:'bulb Estratégia financeira',
  strategy:[
    'Comece pelos recursos gratuitos; pague só pelo que realmente acelerar seu progresso.',
    'Reserve o valor de um retake <strong>antes</strong> de agendar — reduz a pressão no dia.',
    'Verifique se seu empregador subsidia a certificação/curso.',
  ],
  note:'Confirme valores e formato na fonte oficial antes de se inscrever — preços mudam.',
};
