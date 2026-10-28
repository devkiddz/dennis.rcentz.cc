import 'server-only';

import {
  IntelligenceQueue,
  defineFeatures,
  type EventDraft,
} from '@rcentz/intelligence';

import {
  createFeatureTracker,
  createPerformanceTracker,
  createObservabilityTracker,
} from '@rcentz/intelligence/modules';

import {
  createIntelligenceTransport,
} from '@rcentz/intelligence/transport';

const registry = defineFeatures({
  'portfolio.denok': {
    name: 'Denok Portfolio Assistant',
    purpose: 'Help visitors find relevant portfolio information',
    successEvents: [
      'portfolio.denok.answer_matched',
      'portfolio.denok.contact_opened'
    ],
  },
  'portfolio.projects': {
    name: 'Portfolio Project Discovery',
    purpose: 'Help visitors explore completed and ongoing work',
    successEvents: ['portfolio.projects.destination_opened'],
  },
});

export async function recordIntelligence(
  operation: (
    sdk: {
      features: ReturnType<typeof createFeatureTracker>;
      performance: ReturnType<typeof createPerformanceTracker>;
      runtime: ReturnType<typeof createObservabilityTracker>;
    }
  ) => void
): Promise<void> {
  const endpoint = process.env.RCENTZ_INTELLIGENCE_API_URL;
  const sourceId = process.env.RCENTZ_INTELLIGENCE_SOURCE_ID;
  const sourceToken = process.env.RCENTZ_INTELLIGENCE_SOURCE_TOKEN;

  if (!endpoint || !sourceId || !sourceToken) return;

  try {
    const queue = new IntelligenceQueue({
      registry,
      transport: createIntelligenceTransport({
        endpoint,
        sourceId,
        sourceToken,
      }),
    });

    const environment: EventDraft['environment'] =
      process.env.VERCEL_ENV === 'production'
        ? 'production'
        : process.env.VERCEL_ENV === 'preview'
          ? 'preview'
          : 'development';

    const track = (event: EventDraft) => queue.track(event);

    operation({
      features: createFeatureTracker({ track, environment }, registry),
      performance: createPerformanceTracker({ track, environment }),
      runtime: createObservabilityTracker({ track, environment }),
    });

    await queue.flush();
  } catch {
    // Telemetry must not interrupt application operations.
  }
}
