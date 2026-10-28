'use client';

export type DenokTelemetryEvent =
  | 'opened'
  | 'question_submitted'
  | 'answer_matched'
  | 'answer_unmatched'
  | 'clarification_offered'
  | 'contact_opened';

export function trackDenok(
  event: DenokTelemetryEvent,
  durationMs?: number
): void {
  if (typeof navigator === 'undefined') return;

  if (
    navigator.doNotTrack === '1' ||
    (navigator as Navigator & { globalPrivacyControl?: boolean })
      .globalPrivacyControl
  ) return;

  const payload = JSON.stringify({
    event,
    ...(durationMs !== undefined ? { durationMs } : {})
  });

  try {
    if (navigator.sendBeacon) {
      navigator.sendBeacon(
        '/api/intelligence/denok',
        new Blob([payload], { type: 'application/json' })
      );
    }
  } catch {
    // Telemetry never prevents Denok from operating.
  }
}
