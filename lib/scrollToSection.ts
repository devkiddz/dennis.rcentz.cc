let cancelActiveScroll: (() => void) | undefined;

export function scrollToSection(target: string, options?: { offset?: number; duration?: number }) {
  const section = document.querySelector<HTMLElement>(`[data-section="${target}"]`)
    ?? (target === 'home' ? document.documentElement : null);
  if (!section) return;
  cancelActiveScroll?.();

  const anchor = section.querySelector<HTMLElement>('[data-scroll-anchor]') ?? section;
  const headerBottom = document.querySelector<HTMLElement>('header')?.getBoundingClientRect().bottom ?? 64;
  const offset = options?.offset === 0 ? 0 : Math.max(headerBottom + 40, options?.offset ?? 128);
  const startY = window.scrollY;
  const maxY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  const targetY = Math.min(maxY, Math.max(0, anchor.getBoundingClientRect().top + startY - offset));
  const duration = options?.duration ?? 900;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || duration <= 0 || Math.abs(targetY - startY) < 1) {
    window.scrollTo({ top: targetY, left: 0, behavior: 'instant' });
    return;
  }

  let frame = 0;
  let startTime: number | undefined;
  const cancel = () => {
    window.cancelAnimationFrame(frame);
    window.removeEventListener('wheel', cancel);
    window.removeEventListener('touchstart', cancel);
    window.removeEventListener('keydown', onKeyDown);
    if (cancelActiveScroll === cancel) cancelActiveScroll = undefined;
  };
  const onKeyDown = (event: KeyboardEvent) => {
    if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) cancel();
  };
  const animate = (timestamp: number) => {
    startTime ??= timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const eased = progress < .5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2;
    window.scrollTo({ top: startY + (targetY - startY) * eased, left: 0, behavior: 'instant' });
    if (progress < 1) frame = window.requestAnimationFrame(animate);
    else cancel();
  };
  cancelActiveScroll = cancel;
  window.addEventListener('wheel', cancel, { passive: true });
  window.addEventListener('touchstart', cancel, { passive: true });
  window.addEventListener('keydown', onKeyDown);
  frame = window.requestAnimationFrame(animate);
}
