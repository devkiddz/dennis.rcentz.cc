'use client';

import Image from 'next/image';

import { Activity, CheckCircle2, Database, GitBranch, Layers3 } from 'lucide-react';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

import { useEffect, useState } from 'react';

const records = [
  {
    model: 'User',
    command: 'prisma.user.create()',
    detail: 'Identity'
  },
  {
    model: 'Project',
    command: 'prisma.project.update()',
    detail: 'Workflow'
  },
  {
    model: 'Activity',
    command: 'prisma.activity.create()',
    detail: 'Events'
  }
] as const;

const technologies = ['PostgreSQL', 'Prisma ORM', 'Relational Models'] as const;

const pipeline = ['Validate', 'Transform', 'Persist'] as const;

type SchemaAccent = 'blue' | 'teal' | 'green';

function useCyclingIndex(count: number, duration: number, paused = false) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (paused || count <= 1) {
      return;
    }

    const timer = window.setTimeout(() => {
      setIndex(current => (current + 1) % count);
    }, duration);

    return () => {
      window.clearTimeout(timer);
    };
  }, [count, duration, index, paused]);

  return index;
}

export function DatabaseStage() {
  const reduceMotion = Boolean(useReducedMotion());

  const recordIndex = useCyclingIndex(records.length, 2800, reduceMotion);

  const technologyIndex = useCyclingIndex(technologies.length, 2400, reduceMotion);

  const record = records[recordIndex];

  return (
    <div className="relative flex h-full flex-col overflow-hidden px-5 pb-4 pt-5 sm:px-7">
      {/* HEADER */}

      <div className="relative z-30 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Database className="size-[18px] text-brand-cyan" />

          <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs font-semibold uppercase tracking-[0.14em] text-[var(--workspace-text)]">
            Data engine
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="relative flex size-2.5">
            <span className="absolute inset-0 animate-ping rounded-full bg-brand-green opacity-25" />

            <span className="relative size-2.5 rounded-full bg-brand-green" />
          </span>

          <span className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--workspace-muted)]">
            Live
          </span>
        </div>
      </div>

      {/* MAIN VISUAL */}

      <div className="relative flex min-h-0 flex-1 items-center justify-center">
        <div className="relative aspect-[16/9] w-full max-w-2xl">
          {/* TECHNOLOGY */}

          <div className="absolute left-1/2 top-[1%] z-30 -translate-x-1/2">
            <AnimatePresence mode="wait">
              <motion.p
                key={technologies[technologyIndex]}
                initial={{
                  opacity: 0,
                  y: 4
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                exit={{
                  opacity: 0,
                  y: -4
                }}
                transition={{
                  duration: 0.3
                }}
                className="whitespace-nowrap font-[family-name:var(--font-jetbrains-mono)] text-[13px] font-semibold uppercase tracking-[0.16em] text-brand-cyan">
                {technologies[technologyIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* CONNECTION PATHS */}

          <svg
            aria-hidden="true"
            viewBox="0 0 100 60"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 z-10 size-full text-brand-teal">
            {['M25 27 C34 27 38 30 44 31', 'M75 23 C67 24 62 27 56 30', 'M76 43 C67 42 62 39 56 37'].map(
              (path, index) => (
                <motion.path
                  key={path}
                  d={path}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.34"
                  strokeDasharray="1 2"
                  opacity={0.38 - index * 0.03}
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          strokeDashoffset: -12
                        }
                  }
                  transition={{
                    duration: 4 + index * 0.6,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                />
              )
            )}
          </svg>

          {/* USER */}

          <div className="absolute left-[1%] top-[31%] z-30">
            <SchemaNode label="User" meta="Identity" active={record.model === 'User'} accent="blue" />
          </div>

          {/* PROJECT */}

          <div className="absolute right-[1%] top-[21%] z-30">
            <SchemaNode label="Project" meta="Workflow" active={record.model === 'Project'} accent="teal" />
          </div>

          {/* ACTIVITY */}

          <div className="absolute right-[2%] top-[61%] z-30">
            <SchemaNode label="Activity" meta="Events" active={record.model === 'Activity'} accent="green" />
          </div>

          {/* DATABASE */}

          <div className="absolute left-1/2 top-[53%] z-20 w-[44%] min-w-52 max-w-72 -translate-x-1/2 -translate-y-1/2">
            <DatabaseVisual reduceMotion={reduceMotion} />
          </div>
        </div>
      </div>

      {/* BOTTOM FLOW */}

      <div className="relative z-30 mx-auto w-full max-w-3xl">
        <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,0.78fr)] items-center gap-3">
          <MutationCard command={record.command} />

          <Pipeline reduceMotion={reduceMotion} />

          <StatusCard />
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   DATABASE
   ========================================================= */

function DatabaseVisual({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <motion.div
      animate={
        reduceMotion
          ? undefined
          : {
              y: [0, -3, 0]
            }
      }
      transition={{
        duration: 5.5,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
      className="relative aspect-[0.72/1] w-full">
      {/* LOCAL GLOW */}

      <div className="pointer-events-none absolute inset-[18%] rounded-full bg-brand-cyan/5 blur-2xl" />

      {/* =====================================================
          ORBIT SYSTEM
          ===================================================== */}

      <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[52%] w-[128%] -translate-x-1/2 -translate-y-1/2">
        {/* BACK HALF OF RING */}

        <div
          className={[
            'absolute inset-0',
            'rounded-[50%]',
            'border border-brand-cyan/20',
            '[transform:rotateX(67deg)_rotateZ(-8deg)]'
          ].join(' ')}
        />

        {/* MOVING ORBIT TRACK */}

        <motion.div
          animate={
            reduceMotion
              ? undefined
              : {
                  rotate: 360
                }
          }
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'linear'
          }}
          className="absolute inset-0">
          <div
            className={[
              'absolute inset-0',
              'rounded-[50%]',
              'border border-transparent',
              'border-t-brand-cyan/75',
              'border-r-brand-teal/45',
              '[transform:rotateX(67deg)_rotateZ(-8deg)]'
            ].join(' ')}
          />

          {/* ORBIT NODE */}

          <div className="absolute left-1/2 top-0 -translate-x-1/2">
            <span className="block size-2.5 rounded-full bg-brand-cyan shadow-[0_0_1rem_var(--brand-cyan)]" />
          </div>
        </motion.div>

        {/* SECOND SMALLER ORBIT */}

        <motion.div
          animate={
            reduceMotion
              ? undefined
              : {
                  rotate: -360
                }
          }
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: 'linear'
          }}
          className="absolute inset-[14%]">
          <div
            className={[
              'absolute inset-0',
              'rounded-[50%]',
              'border border-brand-blue/15',
              '[transform:rotateX(67deg)_rotateZ(13deg)]'
            ].join(' ')}
          />

          <div className="absolute right-0 top-1/2 -translate-y-1/2">
            <span className="block size-1.5 rounded-full bg-brand-teal shadow-[0_0_0.75rem_var(--brand-teal)]" />
          </div>
        </motion.div>
      </div>

      {/* =====================================================
          DATABASE IMAGE
          ===================================================== */}

      <Image
        src="/illustrations/database-server.png"
        alt="Database server"
        fill
        priority
        sizes="288px"
        className="relative z-10 object-contain"
      />

      {/* =====================================================
          FRONT ORBIT ARC
          Gives the illusion that the ring passes in front
          ===================================================== */}

      <motion.div
        animate={
          reduceMotion
            ? undefined
            : {
                opacity: [0.45, 0.8, 0.45]
              }
        }
        transition={{
          duration: 3.6,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="pointer-events-none absolute left-1/2 top-[57%] z-20 h-[28%] w-[116%] -translate-x-1/2 -translate-y-1/2 overflow-hidden">
        <div
          className={[
            'absolute',
            '-top-[72%]',
            'left-0',
            'h-[200%]',
            'w-full',
            'rounded-[50%]',
            'border',
            'border-b-brand-cyan/55',
            'border-l-transparent',
            'border-r-transparent',
            'border-t-transparent',
            '[transform:rotateX(67deg)_rotateZ(-8deg)]'
          ].join(' ')}
        />
      </motion.div>
    </motion.div>
  );
}

/* =========================================================
   MUTATION CARD
   ========================================================= */

function MutationCard({ command }: { command: string }) {
  return (
    <div className="min-w-0 rounded-2xl border border-brand-cyan/30 bg-[var(--workspace-surface-strong)] px-5 py-4 backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--workspace-muted)]">
            Mutation stream
          </p>

          <AnimatePresence mode="wait">
            <motion.p
              key={command}
              initial={{
                opacity: 0,
                y: 3
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              exit={{
                opacity: 0,
                y: -3
              }}
              transition={{
                duration: 0.25
              }}
              className="mt-2 truncate font-[family-name:var(--font-jetbrains-mono)] text-xs font-semibold text-brand-cyan">
              {command}
            </motion.p>
          </AnimatePresence>
        </div>

        <Activity className="mt-0.5 size-[18px] shrink-0 text-brand-teal" />
      </div>
    </div>
  );
}

/* =========================================================
   PIPELINE
   ========================================================= */

function Pipeline({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div className="flex items-center">
      {pipeline.map((step, index) => (
        <div key={step} className="flex items-center">
          <div className="flex flex-col items-center gap-1.5">
            <span className="flex size-7 items-center justify-center rounded-full border border-brand-teal/40 bg-brand-teal/10">
              <CheckCircle2 className="size-3.5 text-brand-teal" />
            </span>

            <span className="font-[family-name:var(--font-jetbrains-mono)] text-[9px] font-semibold uppercase tracking-[0.055em] text-[var(--workspace-text)]">
              {step}
            </span>
          </div>

          {index < pipeline.length - 1 ? (
            <div className="relative mb-5 w-8 overflow-hidden border-t border-[var(--workspace-divider)]">
              <motion.span
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        x: ['-100%', '100%']
                      }
                }
                transition={{
                  duration: 2.2,
                  delay: index * 0.25,
                  repeat: Infinity,
                  ease: 'linear'
                }}
                className="absolute -top-px block h-px w-1/2 bg-gradient-to-r from-transparent via-brand-cyan to-transparent"
              />
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

/* =========================================================
   STATUS CARD
   ========================================================= */

function StatusCard() {
  return (
    <div className="min-w-0 rounded-2xl border border-brand-green/30 bg-[var(--workspace-surface-strong)] px-5 py-4 backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] font-semibold uppercase tracking-[0.11em] text-[var(--workspace-muted)]">
            Relational system
          </p>

          <p className="mt-2 font-[family-name:var(--font-jetbrains-mono)] text-xs font-semibold uppercase tracking-[0.08em] text-brand-green">
            Persisted
          </p>
        </div>

        <Layers3 className="mt-0.5 size-[18px] shrink-0 text-brand-cyan" />
      </div>
    </div>
  );
}

/* =========================================================
   SCHEMA NODE
   ========================================================= */

function SchemaNode({
  label,
  meta,
  active,
  accent
}: {
  label: string;
  meta: string;
  active: boolean;
  accent: SchemaAccent;
}) {
  const activeStyles: Record<SchemaAccent, string> = {
    blue: 'border-brand-blue/55 bg-brand-blue/12',

    teal: 'border-brand-teal/55 bg-brand-teal/12',

    green: 'border-brand-green/50 bg-brand-green/12'
  };

  const iconStyles: Record<SchemaAccent, string> = {
    blue: 'text-brand-blue',

    teal: 'text-brand-teal',

    green: 'text-brand-green'
  };

  return (
    <motion.div
      animate={{
        opacity: active ? 1 : 0.76,

        scale: active ? 1.035 : 1
      }}
      transition={{
        duration: 0.3
      }}
      className={[
        'min-w-28',
        'rounded-2xl',
        'border',
        'px-4',
        'py-3.5',
        'backdrop-blur-xl',

        active ? activeStyles[accent] : 'border-brand-cyan/20 bg-[var(--workspace-node)]'
      ].join(' ')}>
      <div className="flex items-center gap-2.5">
        <GitBranch
          className={['size-4', active ? iconStyles[accent] : 'text-[var(--workspace-muted)]'].join(' ')}
        />

        <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs font-semibold text-[var(--workspace-text)]">
          {label}
        </span>
      </div>

      <p className="mt-1.5 font-[family-name:var(--font-jetbrains-mono)] text-[10px] font-medium uppercase tracking-[0.09em] text-[var(--workspace-muted)]">
        {meta}
      </p>
    </motion.div>
  );
}
