import { after } from 'next/server';
import { recordIntelligence } from '@/server/intelligence/client';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const requestOrigin = new URL(request.url).origin;
  const origin = request.headers.get('origin');

  if (
    origin !== requestOrigin ||
    request.headers.get('sec-fetch-site') === 'cross-site'
  ) {
    return new Response(null, { status: 403 });
  }

  if (
    request.headers.get('content-type')?.split(';')[0].trim() !==
    'application/json'
  ) {
    return new Response(null, { status: 415 });
  }

  const declaredSize = Number(
    request.headers.get('content-length') ?? 0
  );

  if (
    !Number.isFinite(declaredSize) ||
    declaredSize < 0 ||
    declaredSize > 256
  ) {
    return new Response(null, { status: 413 });
  }

  let payload: unknown;

  try {
    const body = await request.text();

    if (Buffer.byteLength(body, 'utf8') > 256) {
      return new Response(null, { status: 413 });
    }

    payload = JSON.parse(body);
  } catch {
    return new Response(null, { status: 400 });
  }

  if (
    !payload ||
    typeof payload !== 'object' ||
    Array.isArray(payload)
  ) {
    return new Response(null, { status: 400 });
  }

  const event = payload as Record<string, unknown>;

  if (
    Object.keys(event).length !== 1 ||
    (event.destination !== 'live' &&
      event.destination !== 'github')
  ) {
    return new Response(null, { status: 400 });
  }

  const destination = event.destination;

  after(async () => {
    await recordIntelligence(({ features }) => {
      features.use(
        'portfolio.projects',
        'portfolio.projects.link_clicked',
        {
          route: '/projects',
          category: destination
        }
      );
    });
  });

  return new Response(null, {
    status: 202,
    headers: { 'Cache-Control': 'no-store' }
  });
}
