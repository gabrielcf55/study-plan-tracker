/* theme-init.js — aplica tema/modo salvos ANTES da pintura (sem flash).
   Carregado como <script src> síncrono no <head> (compatível com CSP script-src 'self'). */
(function () {
  var el = document.documentElement;
  try {
    var qs = new URLSearchParams(location.search);
    var qTheme = qs.get('theme');
    var qMode = qs.get('mode');
    if (qTheme || qMode) {
      // Modo "preview" (ex.: vitrine de direções): aplica sem persistir.
      if (qTheme && qTheme !== 'brass') el.setAttribute('data-theme', qTheme);
      el.setAttribute('data-mode', qMode === 'dark' ? 'dark' : 'light');
      if (qs.get('chrome') === 'off') el.setAttribute('data-chrome', 'off');
      return;
    }
    var t = localStorage.getItem('cta_theme');
    var m = localStorage.getItem('cta_mode');
    if (t && t !== 'brass') el.setAttribute('data-theme', t);
    el.setAttribute('data-mode', m === 'dark' ? 'dark' : 'light');
    var f = localStorage.getItem('cta_favicon');
    if (f) {
      var link = document.querySelector('link[rel="icon"]');
      if (link) link.setAttribute('href', 'favicons/' + f + '.svg');
    }
  } catch (e) {
    el.setAttribute('data-mode', 'light');
  }
})();
