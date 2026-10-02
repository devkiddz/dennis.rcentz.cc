'use client';

import { useRouter } from 'next/navigation';
import { scrollToSection } from '@/lib/scrollToSection';

type SectionButtonProps = {
  target: string;
  className?: string;
  children: React.ReactNode;
};

export function SectionButton({ target, className, children }: SectionButtonProps) {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => {
        if (!document.querySelector(`[data-section="${target}"]`)) { router.push(`/#${target}`); return; }
        scrollToSection(target, {
          duration: 900,
          offset: 104
        });
      }}
      className={className}>
      {children}
    </button>
  );
}
