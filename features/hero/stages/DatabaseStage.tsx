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
    if (paused || count <= 1) return;

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
      {/* =====================================================
          HEADER
          ===================================================== */}

      <div className="relative z-30 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Database className="size-[17px] text-brand-cyan" />

          <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--workspace-text)]">
            Data engine
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="relative flex size-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-status-success opacity-20" />

            <span className="relative size-2 rounded-full bg-status-success" />
          </span>

          <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--workspace-muted)]">
            Live
          </span>
        </div>
      </div>

      {/* =====================================================
          MAIN VISUAL
          ===================================================== */}

      <div className="relative flex min-h-0 flex-1 items-center justify-center">
        <div className="relative aspect-[16/9] w-full max-w-2xl">
          {/* TECHNOLOGY */}

          <div className="absolute left-1/2 top-[1%] z-30 -translate-x-1/2">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={technologies[technologyIndex]}
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 4
                      }
                }
                animate={{
                  opacity: 1,
                  y: 0
                }}
                exit={
                  reduceMotion
                    ? undefined
                    : {
                        opacity: 0,
                        y: -4
                      }
                }
                transition={{
                  duration: 0.28,
                  ease: 'easeOut'
                }}
                className="whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.1em] text-brand-cyan">
                {technologies[technologyIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* =================================================
              CONNECTION PATHS
              ================================================= */}

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

          {/* =================================================
              SCHEMA NODES
              ================================================= */}

          <div className="absolute left-[1%] top-[31%] z-30">
            <SchemaNode label="User" meta="Identity" active={record.model === 'User'} accent="blue" />
          </div>

          <div className="absolute right-[1%] top-[21%] z-30">
            <SchemaNode label="Project" meta="Workflow" active={record.model === 'Project'} accent="teal" />
          </div>

          <div className="absolute right-[2%] top-[61%] z-30">
            <SchemaNode label="Activity" meta="Events" active={record.model === 'Activity'} accent="green" />
          </div>

          {/* =================================================
              DATABASE
              Keep approved scale/composition.
              ================================================= */}

          <div className="absolute left-1/2 top-[53%] z-20 w-[44%] min-w-52 max-w-72 -translate-x-1/2 -translate-y-1/2">
            <DatabaseVisual reduceMotion={reduceMotion} />
          </div>
        </div>
      </div>

      {/* =====================================================
          BOTTOM FLOW
          ===================================================== */}

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
   DATABASE VISUAL
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
        {/* BACK ORBIT */}

        <div
          className={[
            'absolute inset-0',
            'rounded-[50%]',
            'border border-brand-cyan/20',
            '[transform:rotateX(67deg)_rotateZ(-8deg)]'
          ].join(' ')}
        />

        {/* PRIMARY MOVING ORBIT */}

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

          <div className="absolute left-1/2 top-0 -translate-x-1/2">
            <span className="block size-2.5 rounded-full bg-brand-cyan shadow-[0_0_1rem_var(--brand-cyan)]" />
          </div>
        </motion.div>

        {/* SECONDARY ORBIT */}

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

      <div
        className="protected-asset absolute inset-0 z-10"
        onContextMenu={event => event.preventDefault()}
        onDragStart={event => event.preventDefault()}>
        <Image
          src="/illustrations/database-server.png"
          alt="Database server"
          fill
          priority
          draggable={false}
          sizes="288px"
          className="protected-asset pointer-events-none object-contain"
        />
      </div>

      {/* =====================================================
          FRONT ORBIT ARC
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
    <div className="min-w-0 rounded-2xl border border-brand-cyan/25 bg-[var(--workspace-surface-strong)] px-4 py-3.5 backdrop-blur-xl sm:px-5">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[var(--workspace-muted)]">
            Mutation stream
          </p>

          <AnimatePresence mode="wait" initial={false}>
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
                duration: 0.24,
                ease: 'easeOut'
              }}
              className="mt-1.5 truncate text-[12px] font-semibold text-brand-cyan">
              {command}
            </motion.p>
          </AnimatePresence>
        </div>

        <Activity className="size-[17px] shrink-0 text-brand-teal" />
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
            <span className="flex size-7 items-center justify-center rounded-full border border-brand-teal/35 bg-brand-teal/10">
              <CheckCircle2 className="size-3.5 text-brand-teal" />
            </span>

            <span className="text-[10px] font-semibold uppercase tracking-[0.04em] text-[var(--workspace-muted)]">
              {step}
            </span>
          </div>

          {index < pipeline.length - 1 ? (
            <div className="relative mb-5 w-7 overflow-hidden border-t border-[var(--workspace-divider)] sm:w-8">
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
    <div className="min-w-0 rounded-2xl border border-status-success/25 bg-[var(--workspace-surface-strong)] px-4 py-3.5 backdrop-blur-xl sm:px-5">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[var(--workspace-muted)]">
            Relational system
          </p>

          <p className="mt-1.5 text-[12px] font-semibold text-status-success">Persisted</p>
        </div>

        <Layers3 className="size-[17px] shrink-0 text-brand-cyan" />
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
    blue: 'border-brand-blue/45 bg-brand-blue/10',

    teal: 'border-brand-teal/45 bg-brand-teal/10',

    green: 'border-brand-green/45 bg-brand-green/10'
  };

  const iconStyles: Record<SchemaAccent, string> = {
    blue: 'text-brand-blue',
    teal: 'text-brand-teal',
    green: 'text-brand-green'
  };

  return (
    <motion.div
      animate={{
        opacity: active ? 1 : 0.72,
        scale: active ? 1.025 : 1
      }}
      transition={{
        duration: 0.3,
        ease: 'easeOut'
      }}
      className={[
        'min-w-28',
        'rounded-2xl',
        'border',
        'px-4',
        'py-3',
        'backdrop-blur-xl',
        active ? activeStyles[accent] : 'border-[var(--workspace-divider)] bg-[var(--workspace-node)]'
      ].join(' ')}>
      <div className="flex items-center gap-2.5">
        <GitBranch
          className={['size-4 shrink-0', active ? iconStyles[accent] : 'text-[var(--workspace-muted)]'].join(
            ' '
          )}
        />

        <span className="text-[12px] font-semibold text-[var(--workspace-text)]">{label}</span>
      </div>

      <p className="mt-1.5 text-[11px] font-medium text-[var(--workspace-muted)]">{meta}</p>
    </motion.div>
  );
}
