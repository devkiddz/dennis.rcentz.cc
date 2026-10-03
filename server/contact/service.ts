import 'server-only';
import { createHmac } from 'node:crypto';
import { validateContact } from './validation';

const response = (status: number, message: string) => Response.json({ message }, { status, headers: { 'Cache-Control': 'no-store' } });
export function publicContactConfig() {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? '';
  const enabled = Boolean(siteKey && process.env.TURNSTILE_SECRET_KEY && process.env.RESEND_API_KEY && process.env.CONTACT_FROM_EMAIL && process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN && (process.env.CONTACT_RATE_LIMIT_SECRET?.length ?? 0) >= 32);
  return { enabled, siteKey: enabled ? siteKey : '' };
}
function allowedOrigins() {
  return (process.env.CONTACT_ALLOWED_ORIGINS ?? 'https://dennis.rcentz.cc').split(',').map(value => value.trim()).filter(Boolean);
}
async function boundedJson(request: Request) {
  const limit = 16384;
  if (Number(request.headers.get('content-length')) > limit) throw new Error('size');
  const reader = request.body?.getReader();
  if (!reader) throw new Error('body');
  const chunks: Uint8Array[] = [];
  let length = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.length;
      if (length > limit) { await reader.cancel(); throw new Error('size'); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const bytes = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
  return JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes)) as unknown;
}
const rateScript = "local allowed=1; for i,k in ipairs(KEYS) do local n=redis.call('INCR',k); if n==1 then redis.call('EXPIRE',k,tonumber(ARGV[i*2])); end; if n>tonumber(ARGV[i*2-1]) then allowed=0; end; end; return allowed";
async function rateLimit(items: { key: string; count: number; ttl: number }[]) {
  const result = await fetch(process.env.UPSTASH_REDIS_REST_URL!, { method: 'POST', headers: { Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`, 'Content-Type': 'application/json' }, body: JSON.stringify(['EVAL', rateScript, items.length, ...items.map(item => item.key), ...items.flatMap(item => [item.count, item.ttl])]), signal: AbortSignal.timeout(5000), cache: 'no-store' });
  if (!result.ok) throw new Error('rate service');
  const data = await result.json() as { result?: number; error?: string };
  if (data.error || typeof data.result !== 'number') throw new Error('rate response');
  return data.result === 1;
}
const digest = (text: string) => createHmac('sha256', process.env.CONTACT_RATE_LIMIT_SECRET!).update(text).digest('hex');

export async function handleContact(request: Request) {
  const origin = request.headers.get('origin');
  if (!origin || !allowedOrigins().includes(origin) || request.headers.get('sec-fetch-site') === 'cross-site') return response(403, 'This request could not be accepted.');
  if (request.headers.get('content-type')?.split(';')[0].trim() !== 'application/json') return response(415, 'Use the contact form to send your message.');
  if (!publicContactConfig().enabled) return response(503, 'The contact form is unavailable. Please email denngodfirst@gmail.com.');
  try {
    // Vercel overwrites forwarding headers. Email and global limits bound attempts independently of IP.
    const ip = (request.headers.get('x-vercel-forwarded-for') ?? request.headers.get('x-forwarded-for') ?? 'unknown').split(',')[0].trim();
    if (!await rateLimit([{ key: `dennis:contact:ip:${digest(ip)}`, count: 5, ttl: 3600 }, { key: 'dennis:contact:global', count: 100, ttl: 86400 }])) return response(429, 'Too many attempts. Please try later or email Dennis.');
    let raw: unknown;
    try { raw = await boundedJson(request); } catch { return response(400, 'The message is invalid or too large.'); }
    if (raw && typeof raw === 'object' && 'website' in raw && (raw as { website?: unknown }).website) return response(400, 'This request could not be accepted.');
    const input = validateContact(raw);
    if (!input) return response(400, 'Check all fields and complete verification before sending.');
    if (!await rateLimit([{ key: `dennis:contact:email:${digest(input.email.toLowerCase())}`, count: 3, ttl: 3600 }])) return response(429, 'Too many attempts for this email. Please try later.');
    const verified = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ secret: process.env.TURNSTILE_SECRET_KEY, response: input.token }), signal: AbortSignal.timeout(8000), cache: 'no-store' });
    if (!verified.ok) return response(503, 'Verification is unavailable. Please try again later.');
    const verification = await verified.json() as { success?: boolean; hostname?: string; action?: string };
    const hostnames = allowedOrigins().map(value => new URL(value).hostname);
    if (!verification.success || !verification.hostname || !hostnames.includes(verification.hostname) || verification.action !== 'contact') return response(400, 'Verification expired or failed. Please verify again.');
    const from = process.env.CONTACT_FROM_EMAIL!;
    if (/[\r\n]/.test(from)) return response(503, 'The contact form is unavailable. Please email Dennis.');
    const sent = await fetch('https://api.resend.com/emails', { method: 'POST', headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json', 'Idempotency-Key': `contact/${digest(JSON.stringify([input.requestId, input.name, input.email, input.company, input.subject, input.message]))}` }, body: JSON.stringify({ from, to: ['denngodfirst@gmail.com'], reply_to: input.email, subject: `Portfolio enquiry: ${input.subject}`, text: `Name: ${input.name}\nEmail: ${input.email}\nCompany: ${input.company || 'Not supplied'}\nSubject: ${input.subject}\n\n${input.message}` }), signal: AbortSignal.timeout(10000), cache: 'no-store' });
    if (!sent.ok) return response(502, 'Your message could not be sent. Please try again or email Dennis directly.');
    const delivery = await sent.json() as { id?: string };
    if (!delivery.id) return response(502, 'Your message could not be confirmed. Please email Dennis directly.');
    return response(200, 'Your message was accepted for delivery to Dennis. Thank you.');
  } catch { return response(503, 'The contact form is temporarily unavailable. Please email denngodfirst@gmail.com.'); }
}
