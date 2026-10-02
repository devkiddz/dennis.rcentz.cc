import { ArrowUpRight } from 'lucide-react';

import { StackBadge } from './StackBadge';
import styles from './Skills.module.css';

const capabilityCards = [
  {
    title: 'Frontend Engineering',
    detail: 'Reusable components, accessible interaction and layouts that hold together across screen sizes.',
    description: 'Responsive interfaces with reusable components and deliberate interaction.',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Responsive UI']
  },
  {
    title: 'Backend & Data',
    detail: 'Data models, validation and clear boundaries between the interface and server responsibilities.',
    description: 'Structured data, clear API contracts and dependable application workflows.',
    skills: ['Node.js', 'Express', 'Prisma', 'PostgreSQL', 'MongoDB', 'API Design']
  },
  {
    title: 'Product Systems',
    detail: 'Discovery, dashboards and workflows designed to feel like parts of the same product.',
    description: 'Connected experiences that carry users from discovery to action.',
    skills: ['Marketplaces', 'Dashboards', 'Discovery', 'Workflows', 'Architecture', 'Design Systems']
  },
  {
    title: 'Engineering Practice',
    detail: 'Changes reviewed for reliability, maintainability and the protection of application boundaries.',
    description: 'Maintainable systems, careful debugging and security-minded delivery.',
    skills: ['Git', 'GitHub', 'Security', 'Debugging', 'Deployment', 'Hardening']
  }
] as const;

export function Skills() {
  return (
    <section id="skills" data-section="skills" aria-labelledby="skills-heading" className={styles.section}>
      <div className="pb-20 pt-28 sm:pb-24 sm:pt-36 lg:pt-40">
        <div
          className={`${styles.heading} mx-auto max-w-7xl px-4 text-left! sm:px-7 sm:text-center! lg:px-10`}>
          <p className={styles.eyebrow}>02 / Capabilities</p>

          <h2
            id="skills-heading"
            className="mt-4 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            The stack behind the
            <br className="hidden sm:block" /> <span className="gradient-text">products I build</span>
          </h2>

          <p className="mx-0! mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:mx-auto! sm:text-base">
            Interfaces, data and workflows â€” connected through thoughtful product engineering.
          </p>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-7 lg:px-10">
          <div className={styles.cards}>
            {capabilityCards.map(({ title, description, detail, skills }, index) => (
              <article key={title} className={`${styles.card} text-left`} data-tone={index}>
                <div className={styles.stars} aria-hidden="true">
                  {Array.from({ length: 8 }, (_, star) => (
                    <span key={star} />
                  ))}
                </div>

                <div className={styles.cardBody}>
                  <h3 className="text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
                    {title}
                  </h3>

                  <p className={styles.cardDescription}>{description}</p>

                  <ul className="mt-3 flex flex-wrap justify-start gap-2" aria-label={`${title} skills`}>
                    {skills.map(skill => (
                      <li key={skill}>
                        <StackBadge name={skill} />
                      </li>
                    ))}
                  </ul>

                  <details className={styles.detail}>
                    <summary>
                      <span>How I approach this</span>

                      <span className={styles.arrow}>
                        <ArrowUpRight size={22} aria-hidden="true" />
                      </span>
                    </summary>

                    <p>{detail}</p>
                  </details>
                </div>
              </article>
            ))}
          </div>

          <p className={`${styles.principles} justify-start! text-left sm:justify-center! sm:text-center`}>
            Build <span aria-hidden="true">Â·</span> Harden
            <span aria-hidden="true">Â·</span> Improve
          </p>
        </div>
      </div>
    </section>
  );
}
