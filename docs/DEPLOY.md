# ☁️ Deploy na Vercel (grátis)

## 1. Subir para o GitHub

Repositório público é ok — não há segredos no código.

```bash
git init
git add .
git commit -m "chore: primeiro commit"
git branch -M main
git remote add origin https://github.com/gabrielcf55/study-plan-tracker.git
git push -u origin main
```

## 2. Importar na Vercel

[vercel.com](https://vercel.com) → **Add New… → Project** → importe o repositório. Framework Preset: **Other**, sem build command. Deploy.

## 3. Sincronização entre dispositivos (Upstash Redis — tier grátis)

1. No projeto na Vercel: **Storage → Create Database → Upstash for Redis** (Marketplace). Plano free.
2. Conecte ao projeto — a Vercel injeta `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` (ou `KV_REST_API_URL` / `KV_REST_API_TOKEN`; o código aceita os dois nomes).
3. **Redeploy.** No app, o badge deve mudar para **Sincronizado**.

Sem este passo o app funciona normalmente em modo local (**Local**), guardando o progresso só no navegador.

## 4. Acesso privado

> ⚠️ **No tier grátis, o Vercel Authentication NÃO deixa a produção privada.** A *Standard Protection* protege apenas os deployments de **preview**. A **produção fica pública** — tanto no domínio `*.vercel.app` de produção **quanto** em qualquer domínio/subdomínio custom (é a opção "Protect all except production Custom Domains"). Não importa o domínio: a produção no plano grátis é aberta.

Para deixar a **produção** privada:

- **Grátis (recomendado):** use o **login por senha embutido** deste template (Basic Auth via Edge Middleware). Funciona em **qualquer** domínio — `*.vercel.app` ou custom — porque roda no Edge, antes de servir a rota. Veja a seção **5** abaixo.
- **Pago:** **Pro + Advanced Deployment Protection** (habilita "All Deployments" / *Password Protection*) ou **Enterprise** — aí a proteção nativa da Vercel passa a cobrir a produção também.

O **demo público** não precisa de nada disso — é aberto por definição.

## 5. Login por senha (Basic Auth) — opcional

O template inclui um Edge Middleware (`middleware.js`) que pede **usuário e senha** antes de servir qualquer rota (app + `/api`). Por rodar no Edge, protege **qualquer domínio — inclusive um domínio/subdomínio custom** (ex.: `study.seudominio.com`), onde o Vercel Authentication gratuito não atua. É a forma de manter sua instância pessoal privada **de graça**, evitando que alguém com a URL veja ou sobrescreva seu progresso.

**Como ativar** (Vercel → **Settings → Environment Variables**):

| Variável | Valor |
|---|---|
| `BASIC_AUTH_ENABLED` | `true` |
| `BASIC_AUTH_USER` | o usuário de login |
| `BASIC_AUTH_PASSWORD` | a senha de login |

Depois, **Redeploy**. O navegador pedirá login ao abrir o app.

- **Desligado por padrão:** sem `BASIC_AUTH_ENABLED=true`, o app fica público — ideal para o demo e para quem não quer login.
- **Seguro sobre HTTPS:** a Vercel força HTTPS, então as credenciais Basic Auth trafegam protegidas.
- **Sem segredos no repositório:** as credenciais vivem só em variáveis de ambiente (veja `.env.example`).
- É um login simples (um par usuário/senha compartilhado), pensado para uso pessoal — não é um sistema multiusuário.

## Rodar localmente

O app usa ES Modules, então precisa de um servidor (não abra via `file://`):

```bash
npm run serve     # estático em http://localhost:3000 (modo local, sem sync)
npm run dev       # com a função /api (requer Vercel CLI + env vars)
npm test          # testes da lógica de progresso + integridade do plano e exemplos
```
