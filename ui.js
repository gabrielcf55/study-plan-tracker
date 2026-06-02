/* =====================================================================
   ui.js — Camada de apresentação (independente do motor app.js):
   hidrata ícones SVG estáticos e controla aparência (modo claro/escuro,
   paleta e favicon) com persistência em localStorage.
   ===================================================================== */
import { hydrateIcons } from './icons.js';

const el = document.documentElement;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

const K_THEME = 'cta_theme';
const K_MODE = 'cta_mode';
const K_FAV = 'cta_favicon';

function store(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
function read(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }

/* ---------- estado atual ---------- */
function curMode() { return el.getAttribute('data-mode') === 'dark' ? 'dark' : 'light'; }
function curTheme() { return el.getAttribute('data-theme') || 'brass'; }
function curFav() { return read(K_FAV) || 'ring'; }

/* ---------- aplicar ---------- */
function setMode(m) {
  el.setAttribute('data-mode', m);
  store(K_MODE, m);
  const tc = $('meta[name="theme-color"]');
  if (tc) tc.setAttribute('content', m === 'dark' ? '#05080f' : '#0C1222');
  syncUI();
}
function setTheme(t) {
  if (t === 'brass') el.removeAttribute('data-theme');
  else el.setAttribute('data-theme', t);
  store(K_THEME, t);
  syncUI();
}
function setFav(f) {
  store(K_FAV, f);
  let link = $('link[rel="icon"]');
  if (link) link.setAttribute('href', 'favicons/' + f + '.svg');
  syncUI();
}

/* ---------- refletir estado nos controles ---------- */
function syncUI() {
  $$('#segMode [data-mode-set]').forEach((b) => b.classList.toggle('on', b.dataset.modeSet === curMode()));
  $$('#swatches [data-theme-set]').forEach((b) => b.classList.toggle('on', b.dataset.themeSet === curTheme()));
  $$('#favRow [data-fav]').forEach((b) => b.classList.toggle('on', b.dataset.fav === curFav()));
}

/* ---------- popover ---------- */
function togglePop(force) {
  const pop = $('#settingsPop');
  const open = force != null ? force : !pop.classList.contains('open');
  pop.classList.toggle('open', open);
}

document.addEventListener('click', (e) => {
  const modeBtn = e.target.closest('[data-mode-set]');
  if (modeBtn) { setMode(modeBtn.dataset.modeSet); return; }
  const themeBtn = e.target.closest('[data-theme-set]');
  if (themeBtn) { setTheme(themeBtn.dataset.themeSet); return; }
  const favBtn = e.target.closest('[data-fav]');
  if (favBtn) { setFav(favBtn.dataset.fav); return; }
  if (e.target.closest('#btnSettings')) { togglePop(); return; }
  if (!e.target.closest('#settingsPop')) togglePop(false);
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') togglePop(false); });

/* ---------- boot ---------- */
hydrateIcons(document);
// garante que favicon salvo apareça também nas miniaturas/estado
if (read(K_FAV)) setFav(read(K_FAV)); else syncUI();
