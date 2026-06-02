/* =====================================================================
   middleware.js — Login opcional por usuário/senha (HTTP Basic Auth).

   Roda no Edge da Vercel ANTES de servir qualquer rota (app + /api),
   então protege inclusive domínios custom — onde o "Vercel Authentication"
   gratuito não chega. Útil para manter sua instância pessoal privada e
   evitar que alguém com a URL veja/sobrescreva seu progresso.

   Ative definindo estas variáveis de ambiente na Vercel (Settings → Environment Variables):
     BASIC_AUTH_ENABLED  = true
     BASIC_AUTH_USER     = seu_usuario
     BASIC_AUTH_PASSWORD  = sua_senha
   Depois, Redeploy.

   Padrão: SEM BASIC_AUTH_ENABLED=true o app fica PÚBLICO (ideal para o demo
   e para forks que não querem login). Veja docs/DEPLOY.md.
   ===================================================================== */

export default function middleware(request) {
  // Desligado por padrão → segue direto (app público).
  if (process.env.BASIC_AUTH_ENABLED !== 'true') return;

  const user = process.env.BASIC_AUTH_USER;
  const pass = process.env.BASIC_AUTH_PASSWORD;

  // Habilitado mas mal configurado: falha clara em vez de travar silenciosamente.
  if (!user || !pass) {
    return new Response(
      'Basic Auth habilitado, mas BASIC_AUTH_USER / BASIC_AUTH_PASSWORD não foram definidos.',
      { status: 500 }
    );
  }

  const header = request.headers.get('authorization') || '';
  if (header.startsWith('Basic ')) {
    let decoded = '';
    try { decoded = atob(header.slice(6)); } catch { decoded = ''; }
    const sep = decoded.indexOf(':');
    const u = sep >= 0 ? decoded.slice(0, sep) : '';
    const p = sep >= 0 ? decoded.slice(sep + 1) : '';
    if (u === user && p === pass) return; // credenciais corretas → segue
  }

  // Sem credenciais (ou erradas) → pede login. Sobre HTTPS, o Basic Auth é seguro.
  return new Response('Autenticação necessária.', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Plano de Estudo", charset="UTF-8"' },
  });
}
