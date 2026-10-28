'use client';

import type { ReactNode } from 'react';

type Props = {
  href: string;
  destination: 'live' | 'github';
  children: ReactNode;
  title: string;
  'aria-label': string;
};

export function TrackedProjectLink({
  href,
  destination,
  children,
  title,
  'aria-label': ariaLabel
}: Props) {
  function recordClick() {
    if (
      navigator.doNotTrack === '1' ||
      (navigator as Navigator & {
        globalPrivacyControl?: boolean;
      }).globalPrivacyControl
    ) return;

    try {
      const payload = JSON.stringify({ destination });

      if (navigator.sendBeacon) {
        navigator.sendBeacon(
          '/api/intelligence/portfolio-click',
          new Blob([payload], {
            type: 'application/json'
          })
        );
      }
    } catch {
      // Telemetry must not interrupt navigation.
    }
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={title}
      aria-label={ariaLabel}
      onClick={recordClick}
    >
      {children}
    </a>
  );
}
