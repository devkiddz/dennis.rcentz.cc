import { after } from 'next/server';
import { recordIntelligence } from '@/server/intelligence/client';

export const runtime = 'nodejs';

const allowed = new Set([
  'opened',
  'question_submitted',
  'answer_matched',
  'answer_unmatched',
  'clarification_offered',
  'contact_opened'
]);

export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  const expectedOrigin = new URL(request.url).origin;

  if (
    origin !== expectedOrigin ||
    request.headers.get('sec-fetch-site') === 'cross-site'
  ) return new Response(null, { status: 403 });

  if (
    request.headers.get('content-type')?.split(';')[0].trim()
    !== 'application/json'
  ) return new Response(null, { status: 415 });

  const declared = Number(request.headers.get('content-length') ?? 0);
  if (!Number.isSafeInteger(declared) || declared < 0 || declared > 256) {
    return new Response(null, { status: 413 });
  }

  let payload: unknown;
  try {
    const raw = await request.text();
    if (Buffer.byteLength(raw, 'utf8') > 256) {
      return new Response(null, { status: 413 });
    }
    payload = JSON.parse(raw);
  } catch {
    return new Response(null, { status: 400 });
  }

  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return new Response(null, { status: 400 });
  }

  const data = payload as Record<string, unknown>;
  const keys = Object.keys(data);

  if (
    keys.some(key => !['event', 'durationMs'].includes(key)) ||
    !allowed.has(String(data.event)) ||
    (data.durationMs !== undefined && (
      data.event !== 'answer_matched' &&
      data.event !== 'answer_unmatched' &&
      data.event !== 'clarification_offered'
    ))
  ) return new Response(null, { status: 400 });

  const eventName = data.event as string;
  const duration = data.durationMs;

  if (
    duration !== undefined &&
    (typeof duration !== 'number' ||
      !Number.isFinite(duration) ||
      duration < 0 ||
      duration > 120000)
  ) return new Response(null, { status: 400 });

  after(async () => {
    await recordIntelligence(({ features, performance }) => {
      if (eventName === 'answer_matched' || eventName === 'contact_opened') {
        features.success('portfolio.denok', 'portfolio.denok.' + eventName, {
          category: 'client_reported'
        });
      } else {
        features.use('portfolio.denok', 'portfolio.denok.' + eventName, {
          category: 'client_reported'
        });
      }

      if (typeof duration === 'number') {
        performance.serverTiming(
          'client_reported.portfolio.denok.response_wait',
          duration
        );
      }
    });
  });

  return new Response(null, {
    status: 202,
    headers: { 'Cache-Control': 'no-store' }
  });
}
