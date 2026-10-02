'use client';

import type { ReactNode } from 'react';

export function DenokTrigger({ children, className, onOpen }: { children: ReactNode; className?: string; onOpen?: () => void }) {
  return <button type="button" className={className} aria-haspopup="dialog" aria-controls="denok-livechat" onClick={event => { const rect = event.currentTarget.getBoundingClientRect(); onOpen?.(); window.dispatchEvent(new CustomEvent('denok:open', { detail: { anchor: { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom } } })); }}>{children}</button>;
}
