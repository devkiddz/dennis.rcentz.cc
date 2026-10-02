'use client';

import { Pause, Play } from 'lucide-react';
import { useState } from 'react';
import { StackBadge } from './StackBadge';
import styles from './TechTape.module.css';

const technologies = ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Node.js', 'Express', 'Prisma', 'PostgreSQL', 'MongoDB', 'Git', 'GitHub'] as const;

export function TechTape() {
  const [paused, setPaused] = useState(false);
  return (
    <section className={styles.section} aria-labelledby="tech-tape-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-7 lg:px-10">
        <div className={styles.heading}>
          <h2 id="tech-tape-heading">Tools behind the work</h2>
          <button type="button" className={styles.control} aria-label={paused ? 'Resume technology tape' : 'Pause technology tape'} aria-pressed={paused} onClick={() => setPaused(value => !value)}>
            {paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
          </button>
        </div>
        <div className={styles.viewport} data-paused={paused ? 'true' : undefined}>
          <div className={styles.track}>
            <ul className={styles.group} aria-label="Technologies I work with">{technologies.map(name => <li key={name}><StackBadge name={name} /></li>)}</ul>
            <div className={styles.group} aria-hidden="true">{technologies.map(name => <span key={name}><StackBadge name={name} /></span>)}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
