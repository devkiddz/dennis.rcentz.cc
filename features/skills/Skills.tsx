import Image from 'next/image';

import { Boxes, Code2, Database, GitBranch, Layers3, ShieldCheck } from 'lucide-react';

const capabilityCards = [
  {
    title: 'Frontend Engineering',
    icon: Code2,
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Responsive UI']
  },
  {
    title: 'Backend & Data',
    icon: Database,
    skills: ['Node.js', 'Express', 'Prisma', 'PostgreSQL', 'MongoDB', 'API Design']
  },
  {
    title: 'Product Systems',
    icon: Boxes,
    skills: ['Marketplaces', 'Dashboards', 'Discovery', 'Workflows', 'Architecture', 'Design Systems']
  },
  {
    title: 'Engineering Practice',
    icon: ShieldCheck,
    skills: ['Git', 'GitHub', 'Security', 'Debugging', 'Deployment', 'Hardening']
  }
] as const;

const proofItems = [
  {
    title: 'Frontend-led',
    description: 'Strongest depth'
  },
  {
    title: 'Full-stack capable',
    description: 'Product aware'
  },
  {
    title: 'Security-minded',
    description: 'Built deliberately'
  },
  {
    title: 'Production-focused',
    description: 'Beyond prototypes'
  }
] as const;

export function Skills() {
  return (
    <section data-section="skills" className="skills-showcase relative isolate overflow-hidden">
      {/* =====================================================
          ENVIRONMENT
          ===================================================== */}

      <div aria-hidden="true" className="skills-showcase__grid pointer-events-none absolute inset-0 -z-30" />

      <div
        aria-hidden="true"
        className="skills-showcase__ambient pointer-events-none absolute left-1/2 top-[24%] -z-20"
      />

      <div className="mx-auto w-full max-w-[1480px] px-4 py-20 sm:px-7 sm:py-24 lg:px-10 lg:py-28">
        <div className="mx-auto w-full max-w-[1320px]">
          {/* =================================================
              SECTION HEADING
              ================================================= */}

          <div className="mx-auto max-w-[820px] text-center">
            <div className="skills-showcase__eyebrow">
              <span>02</span>

              <span aria-hidden="true" className="skills-showcase__eyebrow-line" />

              <span>Capabilities</span>
            </div>

            <h2 className="mt-5 font-heading text-[2.45rem] font-extrabold leading-[0.98] tracking-[-0.045em] text-foreground sm:text-[3.25rem] lg:text-[4rem]">
              The stack behind the
              <span className="gradient-text ml-[0.22em]">products I build</span>
            </h2>

            <p className="mx-auto mt-5 max-w-[680px] text-[14px] font-medium leading-7 text-muted-foreground sm:text-[15px]">
              From interface systems and product engineering to data, workflows and deployment-minded
              architecture, these are the technologies and practices I work with most.
            </p>
          </div>

          {/* =================================================
              SKILLS HERO STAGE
              ================================================= */}

          <div className="skills-hero-stage relative mt-12 overflow-hidden rounded-[1.8rem] sm:mt-14">
            <div aria-hidden="true" className="skills-hero-stage__grid absolute inset-0" />

            <div aria-hidden="true" className="skills-hero-stage__glow absolute" />

            <div className="relative z-10 grid min-h-[500px] items-end lg:grid-cols-[0.92fr_1.08fr]">
              {/* =============================================
                  LEFT CONTENT
                  ============================================= */}

              <div className="relative z-20 flex h-full flex-col justify-center px-6 py-10 sm:px-9 lg:px-12 lg:py-14">
                <div className="skills-stack-label">
                  <Layers3 size={15} strokeWidth={2} />

                  <span>Engineering Stack</span>
                </div>

                <h3 className="mt-6 max-w-[520px] font-heading text-[2rem] font-extrabold leading-[1.04] tracking-[-0.04em] text-foreground sm:text-[2.6rem] lg:text-[3rem]">
                  Frontend-first.
                  <br />
                  System-aware.
                  <br />
                  <span className="gradient-text">Full-stack capable.</span>
                </h3>

                <p className="mt-5 max-w-[510px] text-[13px] font-medium leading-6 text-muted-foreground sm:text-[14px] sm:leading-7">
                  I work closest to the product interface, but I design with the data model, workflows,
                  security boundaries and long-term application structure in mind.
                </p>

                <div className="mt-7 flex flex-wrap gap-2">
                  {['React', 'Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Tailwind CSS'].map(skill => (
                    <span key={skill} className="skills-hero-chip">
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex items-center gap-3">
                  <GitBranch size={15} strokeWidth={2} className="text-brand-cyan" />

                  <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    Build · Harden · Improve
                  </span>
                </div>
              </div>

              {/* =============================================
                  PORTRAIT
                  ============================================= */}

              <div className="skills-portrait relative min-h-[390px] self-end lg:min-h-[500px]">
                <div aria-hidden="true" className="skills-portrait__halo absolute left-1/2 top-1/2" />

                <div className="absolute inset-x-0 bottom-0 top-4">
                  <Image
                    src="/images/dennis-skills.png"
                    alt="Dennis O. Jones"
                    fill
                    sizes="(max-width: 1024px) 100vw, 52vw"
                    className="object-contain object-bottom"
                  />
                </div>

                <div
                  aria-hidden="true"
                  className="skills-portrait__fade absolute inset-x-0 bottom-0 h-[35%]"
                />
              </div>
            </div>
          </div>

          {/* =================================================
              CAPABILITY CARDS
              ================================================= */}

          <div className="relative z-20 -mt-5 grid gap-3 sm:grid-cols-2 lg:-mt-8 lg:grid-cols-4">
            {capabilityCards.map(({ title, icon: Icon, skills }) => (
              <article key={title} className="skills-capability-card">
                <div className="skills-capability-card__icon">
                  <Icon size={18} strokeWidth={1.9} />
                </div>

                <h3 className="mt-4 text-[15px] font-bold tracking-[-0.02em] text-foreground">{title}</h3>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {skills.map(skill => (
                    <span key={skill} className="skills-mini-chip">
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          {/* =================================================
              PROOF STRIP
              ================================================= */}

          <div className="skills-proof-strip mt-5">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4">
              {proofItems.map((item, index) => (
                <div
                  key={item.title}
                  className={[
                    'skills-proof-item',
                    index !== proofItems.length - 1 ? 'lg:border-r lg:border-[var(--border)]' : ''
                  ].join(' ')}>
                  <span className="skills-proof-item__signal" />

                  <div>
                    <p className="text-[13px] font-bold text-foreground">{item.title}</p>

                    <p className="mt-0.5 text-[11px] font-medium text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
