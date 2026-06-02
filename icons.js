/* =====================================================================
   icons.js — Conjunto de ícones SVG (linha) que substitui os emojis
   estruturais da interface. Estilo Lucide-like: traço currentColor.
   Uso: import { svg, hydrateIcons } from './icons.js'
   ===================================================================== */

const P = {
  compass: '<circle cx="12" cy="12" r="9"/><path d="m15.6 8.4-2.1 5.1-5.1 2.1 2.1-5.1 5.1-2.1z"/>',
  layers: '<path d="M12 3 3 7.8l9 4.8 9-4.8L12 3z"/><path d="m3 12.5 9 4.8 9-4.8"/><path d="m3 16.8 9 4.8 9-4.8"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2.2"/><path d="M3 9.5h18M8 2.8v3.4M16 2.8v3.4"/>',
  clipboard: '<rect x="4.5" y="4.5" width="15" height="16.5" rx="2.2"/><path d="M9 4.5V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v.5"/><path d="m8.8 13.2 2.1 2.1 4.3-4.6"/>',
  repeat: '<path d="m16.5 3 3.5 3.5L16.5 10"/><path d="M4 11v-.8A3.7 3.7 0 0 1 7.7 6.5H20"/><path d="m7.5 21-3.5-3.5L7.5 14"/><path d="M20 13v.8a3.7 3.7 0 0 1-3.7 3.7H4"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none"/>',
  wallet: '<path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H16v3"/><rect x="3" y="7.5" width="18" height="12.5" rx="2.4"/><path d="M21 12.5h-3.5a2 2 0 0 0 0 4H21"/>',
  download: '<path d="M12 3.5v11"/><path d="m7.5 10.5 4.5 4.5 4.5-4.5"/><path d="M5 20.5h14"/>',
  upload: '<path d="M12 15.5v-11"/><path d="m7.5 8.5 4.5-4.5 4.5 4.5"/><path d="M5 20.5h14"/>',
  reset: '<path d="M4 12a8 8 0 1 0 2.6-5.9L3.5 9"/><path d="M3.5 4v5h5"/>',
  drive: '<rect x="3" y="13" width="18" height="7" rx="2"/><path d="M5.4 13 7.8 5.6h8.4L18.6 13"/><path d="M7 16.5h.01M11 16.5h6"/>',
  cloud: '<path d="M7 19a4.2 4.2 0 0 1-.5-8.4 6 6 0 0 1 11.6 1.3A3.7 3.7 0 0 1 17.5 19H7z"/>',
  cloudCheck: '<path d="M7 19a4.2 4.2 0 0 1-.5-8.4 6 6 0 0 1 11.6 1.3A3.7 3.7 0 0 1 17.5 19H7z"/><path d="m9.3 14.4 1.8 1.8 3.4-3.6"/>',
  cloudOff: '<path d="M7 19a4.2 4.2 0 0 1-.5-8.4M9.5 7.2A6 6 0 0 1 18.1 12 3.7 3.7 0 0 1 17 18.9"/><path d="m3.5 3.5 17 17"/>',
  zap: '<path d="M13 2.5 4.5 13.5H11l-1 8 8.5-11H12l1-8z"/>',
  flag: '<path d="M5.5 21V4"/><path d="M5.5 4.5h11l-2 3.2 2 3.2h-11"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5.2l3.4 2"/>',
  check: '<path d="m5 12.5 4.6 4.6L19 6.8"/>',
  checkCircle: '<circle cx="12" cy="12" r="9"/><path d="m8.4 12 2.5 2.5 4.7-5.2"/>',
  chevron: '<path d="m9.5 5.5 6.5 6.5-6.5 6.5"/>',
  book: '<path d="M5 4.5A2 2 0 0 1 7 2.5h12v15H7a2 2 0 0 0-2 2z"/><path d="M5 19.5a2 2 0 0 1 2-2h12"/>',
  pin: '<path d="M12 21.5s6.8-5.4 6.8-10.8a6.8 6.8 0 1 0-13.6 0c0 5.4 6.8 10.8 6.8 10.8z"/><circle cx="12" cy="10.6" r="2.5"/>',
  sliders: '<path d="M4 7h6.5M14.5 7H20"/><circle cx="12.5" cy="7" r="2.1"/><path d="M4 17h2.5M10.5 17H20"/><circle cx="8.5" cy="17" r="2.1"/><path d="M4 12h9M17 12h3"/><circle cx="15" cy="12" r="2.1"/>',
  sun: '<circle cx="12" cy="12" r="3.8"/><path d="M12 2.5v2.2M12 19.3v2.2M4.2 12H2M22 12h-2.2M5.6 5.6 7.2 7.2M16.8 16.8l1.6 1.6M5.6 18.4 7.2 16.8M16.8 7.2l1.6-1.6"/>',
  moon: '<path d="M20 13.2A8 8 0 1 1 10.8 4 6.2 6.2 0 0 0 20 13.2z"/>',
  palette: '<path d="M12 3.2a8.8 8.8 0 1 0 0 17.6c1.1 0 1.7-.9 1.7-1.8 0-1.3-1-1.6-1-2.7 0-.8.7-1.5 1.5-1.5h1.9A4.1 4.1 0 0 0 21 10.6c0-4.2-4-7.4-9-7.4z"/><circle cx="7.6" cy="11" r="1.1" fill="currentColor" stroke="none"/><circle cx="11" cy="7.4" r="1.1" fill="currentColor" stroke="none"/><circle cx="15.4" cy="9" r="1.1" fill="currentColor" stroke="none"/>',
  x: '<path d="M6 6l12 12M18 6 6 18"/>',
  trophy: '<path d="M7 4h10v3a5 5 0 0 1-10 0V4z"/><path d="M7 5.5H4.5A2 2 0 0 0 6 9M17 5.5h2.5A2 2 0 0 1 18 9"/><path d="M12 12v3.5M9 20h6M9.5 20l.7-4.5h3.6l.7 4.5"/>',
  /* --- biblioteca de conteúdo do plano (referenciada por nome em plan/) --- */
  books: '<path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v15.5H5.5A1.5 1.5 0 0 0 4 21z"/><path d="M11 4h5.5A1.5 1.5 0 0 1 18 5.5V19.5h-7"/><path d="M6.5 8H9M6.5 11H9"/>',
  cards: '<rect x="6.5" y="6.5" width="13" height="9.5" rx="2"/><path d="M4.6 9 4 16.4a2 2 0 0 0 1.8 2.2l9 .8"/>',
  timer: '<circle cx="12" cy="13.5" r="7.5"/><path d="M12 13.5V9.8"/><path d="M9.5 2.8h5M18.8 6.2l1.4-1.4"/>',
  blueprint: '<rect x="3.5" y="4.5" width="17" height="15" rx="2"/><path d="M3.5 9.2h17M8.5 9.2V19.5M8.5 13.5H14"/>',
  chart: '<path d="M4.5 20.5h15"/><rect x="5.8" y="12.5" width="3.4" height="6.6" rx="1"/><rect x="10.8" y="8.5" width="3.4" height="10.6" rx="1"/><rect x="15.8" y="4.5" width="3.4" height="14.6" rx="1"/>',
  note: '<path d="M6.5 3.5h6l5 5V20a.8.8 0 0 1-.8.8H6.5A.8.8 0 0 1 5.7 20V4.3a.8.8 0 0 1 .8-.8z"/><path d="M12.5 3.5V9h5"/><path d="M8.5 13.5h6M8.5 16.5h4"/>',
  pencil: '<path d="m4.5 19.5 1-3.8L16 5.2a1.8 1.8 0 0 1 2.6 0l.2.2a1.8 1.8 0 0 1 0 2.6L8.3 18.5l-3.8 1z"/><path d="m14.3 6.9 2.8 2.8"/>',
  briefcase: '<rect x="3.5" y="7.5" width="17" height="12" rx="2.2"/><path d="M8.5 7.5V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1.5"/><path d="M3.5 12.5h17"/>',
  globe: '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17"/><path d="M12 3.5c2.4 2.3 2.4 14.7 0 17M12 3.5c-2.4 2.3-2.4 14.7 0 17"/>',
  speak: '<path d="M5 5h14a1.2 1.2 0 0 1 1.2 1.2v8.1A1.2 1.2 0 0 1 19 15.5h-5.6l-3.9 3.2v-3.2H5a1.2 1.2 0 0 1-1.2-1.2V6.2A1.2 1.2 0 0 1 5 5z"/>',
  mic: '<rect x="9.3" y="2.8" width="5.4" height="10.4" rx="2.7"/><path d="M6 11.2a6 6 0 0 0 12 0"/><path d="M12 17.2v3.5M9 20.7h6"/>',
  bulb: '<path d="M9.3 17.5h5.4M10.3 20.8h3.4"/><path d="M12 3.2a6 6 0 0 0-3.6 10.8c.7.5 1.1 1.3 1.1 2.1v.4h5v-.4c0-.8.4-1.6 1.1-2.1A6 6 0 0 0 12 3.2z"/>',
  rocket: '<path d="M5 14.2c-1.6 1.5-2 5.3-2 5.3s3.8-.4 5.3-2"/><path d="M11.8 15.2 8.8 12.2c1-4.1 4.2-8 9.4-8.9.9 5.2-2.8 8.4-6.4 9.5z"/><circle cx="14.8" cy="9.2" r="1.5"/>',
  people: '<circle cx="9" cy="8.2" r="3.1"/><path d="M3.4 19a5.6 5.6 0 0 1 11.2 0"/><path d="M16.2 5.6a3 3 0 0 1 0 5.6M16.8 14.2A5.6 5.6 0 0 1 20.6 19"/>',
  dotHigh: '<circle cx="12" cy="12" r="6" fill="#ef4444" stroke="none"/>',
  dotMed: '<circle cx="12" cy="12" r="6" fill="#f59e0b" stroke="none"/>',
  dotLow: '<circle cx="12" cy="12" r="6" fill="#22a559" stroke="none"/>',
  dotInfo: '<circle cx="12" cy="12" r="6" fill="#3b82f6" stroke="none"/>',
};

export function svg(name, opts = {}) {
  const inner = P[name];
  if (!inner) return '';
  const size = opts.size || 18;
  const sw = opts.sw || 1.7;
  const cls = opts.cls ? ' ' + opts.cls : '';
  return `<svg class="ico${cls}" viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;
}

export function hydrateIcons(root = document) {
  root.querySelectorAll('[data-icon]').forEach((el) => {
    const name = el.getAttribute('data-icon');
    const size = el.dataset.size ? Number(el.dataset.size) : undefined;
    const sw = el.dataset.sw ? Number(el.dataset.sw) : undefined;
    el.innerHTML = svg(name, { size, sw });
  });
}

/* =====================================================================
   Resolução de ícones do CONTEÚDO (plan/). O conteúdo referencia um ícone
   por NOME (ex.: 'book', 'timer', 'bulb'); aqui resolvemos para SVG.
   Compatível com versões antigas: emojis ainda funcionam (mapeados quando
   possível) e qualquer texto desconhecido cai como rótulo literal.
   Lista de nomes disponíveis: plan/ICONS.md
   ===================================================================== */

// nomes de ícone válidos para o conteúdo
export const PLAN_ICONS = Object.keys(P);

// apelidos de emojis legados → nome de ícone (migração suave)
const EMOJI_ALIAS = {
  '📘': 'book', '📗': 'book', '📕': 'book', '📙': 'book', '📖': 'book', '📚': 'books',
  '🗂': 'cards', '🗃': 'cards', '🃏': 'cards',
  '🔄': 'review', '♻️': 'review', '♻': 'review', '🔁': 'review',
  '⏱': 'timer', '⏱️': 'timer', '⏲': 'timer', '⏲️': 'timer', '⌛': 'timer', '⏳': 'timer',
  '⏰': 'clock', '🕐': 'clock', '🕒': 'clock',
  '🏗': 'blueprint', '🏗️': 'blueprint', '📐': 'blueprint', '📏': 'blueprint',
  '📊': 'chart', '📈': 'chart', '📉': 'chart',
  '📋': 'clipboard', '☑️': 'clipboard', '✅': 'checkCircle', '✔️': 'check', '✓': 'check',
  '📝': 'note', '🗒': 'note', '🗒️': 'note', '✍️': 'pencil', '✏️': 'pencil', '✏': 'pencil',
  '💼': 'briefcase', '🌐': 'globe', '🌍': 'globe', '🌎': 'globe',
  '💬': 'speak', '🗨️': 'speak', '🗣️': 'speak', '🗣': 'speak', '🎤': 'mic',
  '💡': 'bulb', '🎯': 'target', '🏆': 'trophy', '🚀': 'rocket', '🧭': 'compass',
  '💰': 'wallet', '💵': 'wallet', '💸': 'wallet', '👥': 'people', '🤝': 'people',
  '📆': 'calendar', '📅': 'calendar', '🗓': 'calendar', '🗓️': 'calendar', '🚩': 'flag',
  '🔴': 'dotHigh', '🟥': 'dotHigh', '🟡': 'dotMed', '🟠': 'dotMed', '🟨': 'dotMed',
  '🟢': 'dotLow', '🟩': 'dotLow', '🔵': 'dotInfo', '🟦': 'dotInfo',
};
// apelidos de nome → nome canônico
const NAME_ALIAS = { review: 'repeat', checklist: 'clipboard', idea: 'bulb', flashcards: 'cards', presentation: 'speak', english: 'globe', work: 'briefcase', community: 'people', launch: 'rocket', artifact: 'blueprint', diagram: 'blueprint', stopwatch: 'timer', progress: 'chart', doc: 'note', goal: 'target', win: 'trophy', money: 'wallet' };
// números em emoji → dígito
const NUM_EMOJI = { '1️⃣': '1', '2️⃣': '2', '3️⃣': '3', '4️⃣': '4', '5️⃣': '5', '6️⃣': '6', '7️⃣': '7', '8️⃣': '8', '9️⃣': '9', '①': '1', '②': '2', '③': '3', '④': '4', '⑤': '5', '⑥': '6', '⑦': '7', '⑧': '8', '⑨': '9' };

function numChip(n) { return `<span class="num-chip">${n}</span>`; }
function resolveName(t) { return P[t] ? t : (P[NAME_ALIAS[t]] ? NAME_ALIAS[t] : (EMOJI_ALIAS[t] || null)); }

/* Resolve um marcador único (nome de ícone, emoji legado ou número) → markup. */
export function planIcon(token, opts = {}) {
  if (token == null) return '';
  const t = String(token).trim();
  if (!t) return '';
  const numMatch = t.match(/^n?([1-9])$/);
  if (numMatch) return numChip(numMatch[1]);
  if (NUM_EMOJI[t]) return numChip(NUM_EMOJI[t]);
  const name = resolveName(t);
  if (name) return svg(name, opts);
  return `<span class="emoji">${t}</span>`; // fallback: mostra o texto/emoji como veio
}

/* Para títulos: se a 1ª "palavra" for um ícone (nome ou emoji), troca por SVG. */
export function iconText(str, opts = {}) {
  if (str == null) return '';
  const s = String(str);
  const m = s.match(/^(\S+)\s+([\s\S]+)$/);
  if (m) {
    const first = m[1];
    if (/^n?[1-9]$/.test(first) || NUM_EMOJI[first] || resolveName(first)) {
      return planIcon(first, opts) + m[2];
    }
  }
  return s;
}
