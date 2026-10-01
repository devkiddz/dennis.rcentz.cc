import { ChevronDown } from 'lucide-react';
import styles from './Experience.module.css';

const products = [
  { name: 'Waffi Market', category: 'Multi-vendor commerce', points: ['Developing vendor storefronts, catalogues, categories, discovery and shopping workflows.', 'Built reusable structures for vendors, products and storefronts, with database-backed functionality using Prisma and clear application boundaries.'] },
  { name: 'JobRcentz', category: 'Jobs & services', points: ['Built job management, applications, candidates, interviews, invitations, notifications and dashboards.', 'Implemented Prisma and PostgreSQL CRUD operations, authenticated workflows with Better Auth, and interview scheduling and lifecycle state validation.'] },
  { name: 'Rcentz Digital Platform', category: 'Modular business platform', points: ['Developing a modular platform presenting products, services, systems and shared application capabilities.', 'Built data-driven product presentation and reusable structures, with application and data boundaries designed for maintainability.'] },
  { name: 'Multi-Asset Fintech Platform', category: 'Contribution to an existing platform', points: ['Contributed to development and modernization across investment, portfolio, trading, administration and customer workflows in an existing PHP/Laravel platform.', 'Worked through unfamiliar code using terminal inspection, debugging, runtime validation and controlled Git workflows; participated in permissions, transaction and security validation.'] }
] as const;

const roles = [
  { title: 'Graphics Designer & Imagery', company: 'Rc Enterprize', location: 'Warri', date: 'June 2015 — Present', points: ['Design graphics and visual materials for print and digital applications.', 'Produce branded promotional materials and commercial imagery; retouch and prepare images for digital and print use.'] },
  { title: 'Graphics Designer & Imagery', company: '5d Imagery / Proart', location: 'Lagos', date: 'August 2018 — June 2019', points: ['Designed and prepared digital and print graphics for commercial use.', 'Produced and retouched imagery for client projects.'] },
  { title: 'Web Development Instructor', company: 'HIIT', location: 'Lagos', date: 'June 2016 — December 2017', points: ['Taught HTML, CSS, JavaScript and PHP fundamentals, alongside WordPress, SEO and digital marketing.', 'Delivered practical lessons and supported learners through web development exercises.'] },
  { title: 'Technicians Supervisor', company: 'Xpression', location: 'Lagos', date: 'January 2010 — August 2012', points: ['Supervised technical personnel and daily operations, monitoring equipment, productivity and operational standards.', 'Coordinated technical activities and supported issue resolution.'] }
] as const;

export function Experience() {
  return (
    <section data-section="experience" aria-labelledby="experience-heading" className={styles.section}>
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-7 sm:py-28 lg:px-10">
        <div className={styles.heading}>
          <p className={styles.eyebrow}>03 / Experience <span aria-hidden="true" /></p>
          <h2 id="experience-heading" className="mt-4 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">Experience behind<br /><span className="gradient-text">the work I do.</span></h2>
          <p className={styles.intro}>Software development, visual communication and practical technical leadership.</p>
        </div>
        <div className={styles.timeline}>
          <article className={styles.entry}>
            <div className={styles.meta}><p>December 2025 — Present</p><span>Warri, Delta State</span></div>
            <div className={styles.content}>
              <p className={styles.company}>Independent Product Development</p>
              <h3 className={styles.role}>Software Developer</h3>
              <p className={styles.summary}>Develop and evolve web applications and digital products across marketplaces, job platforms, business systems and financial technology.</p>
              <div className={styles.products}>
                {products.map(product => <details key={product.name} className={styles.product}>
                  <summary><span><span className={styles.productName}>{product.name}</span><span className={styles.category}>{product.category}</span></span><ChevronDown size={18} aria-hidden="true" /></summary>
                  <ul className={styles.points}>{product.points.map(point => <li key={point}>{point}</li>)}</ul>
                </details>)}
              </div>
              <p className={styles.responsibilities}>React &amp; Next.js interfaces · Prisma &amp; PostgreSQL workflows · Authentication &amp; authorization · Debugging &amp; validation · Git &amp; GitHub · Vercel deployment</p>
            </div>
          </article>
          {roles.map(role => <article key={role.company} className={styles.entry}>
            <div className={styles.meta}><p>{role.date}</p><span>{role.location}</span></div>
            <div className={styles.content}><p className={styles.company}>{role.company}</p><h3 className={styles.role}>{role.title}</h3><ul className={styles.points}>{role.points.map(point => <li key={point}>{point}</li>)}</ul></div>
          </article>)}
        </div>
      </div>
    </section>
  );
}
