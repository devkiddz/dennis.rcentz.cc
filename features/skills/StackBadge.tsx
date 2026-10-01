import type { CSSProperties } from 'react';
import { stackBrands } from './stack-brands';
import styles from './Skills.module.css';

export function StackBadge({ name }: { name: string }) {
  const brand = stackBrands[name];
  if (!brand) return <span className={styles.chip}>{name}</span>;
  return (
    <span className={styles.stackBadge} style={{ '--stack-color': brand.color } as CSSProperties}>
      <span className={styles.stackLogo} data-monochrome={['Next.js', 'Express', 'GitHub', 'Prisma', 'shadcn/ui'].includes(name) ? 'true' : undefined}>
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d={brand.path} /></svg>
      </span>
      <span>{name}</span>
    </span>
  );
}
