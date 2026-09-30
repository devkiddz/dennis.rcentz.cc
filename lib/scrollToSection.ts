export function scrollToSection(
  target: string,
  options?: {
    offset?: number;
    duration?: number;
  }
) {
  const section = document.querySelector<HTMLElement>(
    `[data-section="${target}"]`
  );

  if (!section) return;

  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  const offset = options?.offset ?? 24;
  const duration = options?.duration ?? 900;

  const startY = window.scrollY;

  const targetY =
    section.getBoundingClientRect().top +
    window.scrollY -
    offset;

  const distance = targetY - startY;

  if (reduceMotion) {
    window.scrollTo({
      top: targetY,
      left: 0
    });

    return;
  }

  let startTime: number | null = null;

  const easeInOutCubic = (progress: number) => {
    return progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;
  };

  const animate = (timestamp: number) => {
    if (startTime === null) {
      startTime = timestamp;
    }

    const elapsed = timestamp - startTime;

    const progress = Math.min(
      elapsed / duration,
      1
    );

    const easedProgress = easeInOutCubic(progress);

    window.scrollTo({
      top: startY + distance * easedProgress,
      left: 0
    });

    if (progress < 1) {
      window.requestAnimationFrame(animate);
    }
  };

  window.requestAnimationFrame(animate);
}