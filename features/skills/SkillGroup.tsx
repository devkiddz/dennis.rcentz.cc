import type { LucideIcon } from 'lucide-react';

type SkillGroupProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  skills: readonly string[];
  emphasis?: boolean;
};

export function SkillGroup({ icon: Icon, title, description, skills, emphasis = false }: SkillGroupProps) {
  return (
    <article
      className={[
        'skills-card group relative overflow-hidden rounded-[1.35rem]',
        emphasis ? 'skills-card--emphasis' : ''
      ].join(' ')}>
      <div className="relative z-10 flex h-full flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-5">
          <div className="flex min-w-0 items-center gap-3">
            <div className="skills-card__icon flex size-9 shrink-0 items-center justify-center rounded-xl">
              <Icon size={17} strokeWidth={1.9} />
            </div>

            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Capability
              </p>

              <h3 className="mt-1 text-[17px] font-bold tracking-[-0.02em] text-foreground sm:text-[18px]">
                {title}
              </h3>
            </div>
          </div>

          <span aria-hidden="true" className="skills-card__signal mt-1 size-2 shrink-0 rounded-full" />
        </div>

        <p className="mt-5 max-w-[46rem] text-[13px] font-medium leading-6 text-muted-foreground sm:text-[14px]">
          {description}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {skills.map(skill => (
            <span key={skill} className="skills-chip">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
