'use client';

import { scrollToSection } from '@/lib/scrollToSection';

type SectionButtonProps = {
  target: string;
  className?: string;
  children: React.ReactNode;
};

export function SectionButton({ target, className, children }: SectionButtonProps) {
  return (
    <button
      type="button"
      onClick={() =>
        scrollToSection(target, {
          duration: 900,
          offset: 24
        })
      }
      className={className}>
      {children}
    </button>
  );
}
