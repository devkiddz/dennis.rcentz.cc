import Image from 'next/image';
import { ArrowUpRight, Code2 } from 'lucide-react';
import { StackBadge } from '@/features/skills/StackBadge';
import { projects } from './projects';
import styles from './Portfolio.module.css';
import { stackBrands } from '@/features/skills/stack-brands';

const screenshots: Record<string, string> = { fintech: '/images/projects/fintech-v18.webp', rcentz: '/images/projects/rcentz-v18.webp', waffi: '/images/projects/waffi-v17.webp', jobrcentz: '/images/projects/jobrcentz-v17.webp', novashad: '/images/projects/novashad-v17.webp', ajlojik: '/images/projects/ajlojik-v17.webp' };

export function ProjectCard({ project, compact = false }: { project: (typeof projects)[number]; compact?: boolean }) {
  const screenshot = screenshots[project.slug];
  return (
    <article id={project.slug} className={styles.card} data-project={project.slug}>
      <div className={styles.media}>
        {screenshot ? <Image src={screenshot} alt={`${project.name} desktop screenshot`} width={1365} height={928} sizes={compact ? '(min-width: 1024px) 33vw, 100vw' : '(min-width: 640px) 50vw, 100vw'} className={styles.screenshotImage} /> : <div className={styles.cover} aria-hidden="true"><Code2 size={28} strokeWidth={1.5} /><span>{project.category}</span><strong>{project.name}</strong><div className={styles.coverLine} /></div>}
        <div className={styles.mediaOverlay} aria-hidden="true" />
        <div className={styles.mediaActions}>
          {project.live ? <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.name} live`} title="Live project"><ArrowUpRight size={24} aria-hidden="true" /></a> : null}
          <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.name} on GitHub`} title="GitHub"><svg width="23" height="23" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={stackBrands.GitHub.path} /></svg></a>
        </div>
      </div>
      <div className={styles.body}>
        <p className={styles.type}>{project.type}</p>
        <h3>{project.name}</h3>
        <p className={styles.description}>{project.description}</p>
        {!compact ? <><p className={styles.label}>My contribution</p><ul className={styles.contributions}>{project.contributions.map(point => <li key={point}>{point}</li>)}</ul>
          {project.stack.length > 0 ? <ul className={styles.stack} aria-label={`${project.name} technologies`}>{project.stack.map(name => <li key={name}><StackBadge name={name} /></li>)}</ul> : null}</> : null}
      </div>
    </article>
  );
}
