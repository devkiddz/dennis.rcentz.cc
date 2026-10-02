import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { SectionButton } from '@/components/navigation/SectionButton';
import styles from './Bio.module.css';

const contributions = [
  {
    label: 'Commerce & discovery',
    project: 'Waffi Market',
    description: 'Developing marketplace interfaces that connect products, shops and the customer journey.'
  },
  {
    label: 'Reusable interface systems',
    project: 'NovaShad',
    description: 'Building with React and shadcn/ui, bringing consistency to components, layouts and interaction.'
  },
  {
    label: 'Long-term engineering',
    project: 'Build · Harden · Improve',
    description: 'A deliberate focus on improving chosen products through maintainability, clear workflows and security.'
  }
] as const;

export function Bio() {
  return (
    <section id="bio" data-section="bio" aria-labelledby="bio-heading" className={styles.section}>
      <div className="mx-auto max-w-7xl px-4 pt-40 pb-24 sm:px-7 sm:pt-48 sm:pb-28 lg:px-10 lg:pt-56">
        <div className={styles.layout} data-scroll-anchor="bio">
          <figure className={styles.portrait}>
            <Image src="/images/dennis-office-v13.webp" alt="Dennis O. Jones in a Rcentz-branded office" width={1254} height={1254} sizes="(min-width: 1024px) 40vw, 100vw" className={styles.portraitImage} />
            <figcaption>Dennis O. Jones <span>Software Developer</span></figcaption>
          </figure>
          <div>
            <p className={styles.eyebrow}><span>About Dennis</span><span className={styles.eyebrowLine} aria-hidden="true" /></p>
            <h2 id="bio-heading" className="mt-5 max-w-xl font-heading text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-4xl">
              Thoughtful interfaces.<br />
              <span className="gradient-text">Practical product systems.</span>
            </h2>
            <p className={styles.introduction}>
              I’m Dennis O. Jones, a Software Developer with 2+ years of combined web development experience,
              building web applications, business systems, marketplaces, job platforms and database-driven products.
            </p>
            <p className={styles.story}>
              I work across frontend and backend features, developing responsive interfaces and implementing application workflows.
              With React, Next.js and TypeScript, I connect clear user experiences to practical product architecture.
            </p>
            <p className={styles.story}>
              My approach is grounded in problem-solving: build something useful, understand how it works,
              then keep improving its reliability, maintainability and security.
            </p>
            <div className={styles.actions}>
              <SectionButton target="skills" className={styles.primaryAction}>
                Explore my capabilities <ArrowDown size={16} aria-hidden="true" />
              </SectionButton>
              <Link href="/contact" className={styles.contactAction}>
                Let’s connect <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
          <div className={styles.contributions}>
            <div className={styles.contributionRail}>
            {contributions.map((item, index) => (
              <article key={item.label} className={styles.contribution}>
                <span className={styles.number} aria-hidden="true">0{index + 1}</span>
                <div>
                  <p className={styles.project}>{item.project}</p>
                  <h3 className="mt-2 text-lg font-bold tracking-tight">{item.label}</h3>
                  <p className={styles.description}>{item.description}</p>
                </div>
              </article>
            ))}
            </div>
          </div>
      </div>
    </section>
  );
}
