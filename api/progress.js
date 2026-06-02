/**
 * Função serverless da Vercel — lê e grava o progresso do plano num Upstash Redis.
 * Credenciais vêm SEMPRE de variáveis de ambiente (nunca do repositório).
 *
 * Boas práticas aplicadas:
 *  - Validação de método e de payload (shape + tamanho).
 *  - Erros internos são logados no servidor, mas a resposta ao cliente é genérica.
 *  - Degrada graciosamente (503) se o storage não estiver configurado → app cai em modo local.
 */
import { Redis } from '@upstash/redis';

const STORE_KEY = 'cta_progress';
const EMPTY = { checked: {}, mocks: {}, scores: {}, updated: 0 };
const MAX_BYTES = 64 * 1024; // teto defensivo para o blob de progresso

const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
const redis = url && token ? new Redis({ url, token }) : null;

function isValidProgress(body) {
  return (
    body && typeof body === 'object' &&
    body.checked && typeof body.checked === 'object' &&
    (body.mocks === undefined || typeof body.mocks === 'object') &&
    (body.scores === undefined || typeof body.scores === 'object')
  );
}

export default async function handler(req, res) {
  if (!redis) return res.status(503).json({ error: 'storage_not_configured' });

  try {
    if (req.method === 'GET') {
      const data = (await redis.get(STORE_KEY)) || EMPTY;
      res.setHeader('Cache-Control', 'no-store');
      return res.status(200).json(data);
    }

    if (req.method === 'POST') {
      const raw = typeof req.body === 'string' ? req.body : JSON.stringify(req.body ?? '');
      if (Buffer.byteLength(raw, 'utf8') > MAX_BYTES) {
        return res.status(413).json({ error: 'payload_too_large' });
      }
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      if (!isValidProgress(body)) return res.status(400).json({ error: 'invalid_payload' });

      await redis.set(STORE_KEY, body);
      return res.status(200).json({ ok: true, updated: body.updated || Date.now() });
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'method_not_allowed' });
  } catch (err) {
    console.error('[api/progress]', err); // log no servidor
    return res.status(500).json({ error: 'internal_error' }); // resposta genérica ao cliente
  }
}
