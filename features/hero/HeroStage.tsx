'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

import { useCallback, useEffect, useState } from 'react';

import { CodeStage } from './stages/CodeStage';
import { DatabaseStage } from './stages/DatabaseStage';

type HeroPhase = 'code' | 'database';

const DATABASE_RUNTIME = 9000;
const TRANSITION_DURATION = 0.38;

export function HeroStage() {
  const reduceMotion = Boolean(useReducedMotion());

  const [phase, setPhase] = useState<HeroPhase>('code');

  const handleCodeComplete = useCallback(() => {
    if (reduceMotion) return;

    setPhase('database');
  }, [reduceMotion]);

  /*
   * Database remains visible long enough
   * to actually be read before returning
   * to the code sequence.
   */
  useEffect(() => {
    if (reduceMotion || phase !== 'database') return;

    const timer = window.setTimeout(() => {
      setPhase('code');
    }, DATABASE_RUNTIME);

    return () => {
      window.clearTimeout(timer);
    };
  }, [phase, reduceMotion]);

  return (
    <div className="workspace-stage-shell relative w-full max-w-[620px]">
      {/* =====================================================
          AMBIENT LIGHT
          ===================================================== */}

      <div className="glow-cyan pointer-events-none absolute left-1/2 top-1/2 -z-20 size-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50" />

      {/* =====================================================
          CONTACT SHADOW
          Gives the workspace physical weight.
          ===================================================== */}

      <div
        aria-hidden="true"
        className="workspace-contact-shadow pointer-events-none absolute left-1/2 top-[calc(100%-4px)] -z-10 -translate-x-1/2"
      />

      {/* =====================================================
          WORKSPACE
          ===================================================== */}

      <div className="workspace-window relative isolate rounded-[1.4rem]">
        {/* TOP EDGE SHEEN */}

        <div
          aria-hidden="true"
          className="workspace-top-sheen pointer-events-none absolute inset-x-8 top-0 z-40 h-px"
        />

        {/* SCREEN DEPTH OVERLAY */}

        <div
          aria-hidden="true"
          className="workspace-screen-depth pointer-events-none absolute inset-0 z-40 rounded-[inherit]"
        />

        {/* ===================================================
            WORKSPACE HEADER
            =================================================== */}

        <div className="workspace-header relative z-20 flex h-[54px] items-center px-5 sm:px-6">
          {/* WINDOW CONTROLS */}

          <div aria-hidden="true" className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-red-400/90" />
            <span className="size-2.5 rounded-full bg-amber-400/90" />
            <span className="size-2.5 rounded-full bg-emerald-400/90" />
          </div>

          {/* WORKSPACE TITLE */}

          <div className="ml-6 flex min-w-0 items-center gap-2">
            <span aria-hidden="true" className="workspace-identity-dot size-1.5 shrink-0 rounded-full" />

            <span className="truncate text-xs font-semibold tracking-[-0.01em] text-[var(--workspace-title)]">
              dennis.workspace
            </span>
          </div>

          {/* STATE CONTROLS */}

          <div className="ml-auto flex items-center gap-2.5">
            <StageControl active={phase === 'code'} label="Show code" onClick={() => setPhase('code')} />

            <StageControl
              active={phase === 'database'}
              label="Show database"
              onClick={() => setPhase('database')}
            />
          </div>
        </div>

        {/* ===================================================
            CONTINUOUS STAGE
            =================================================== */}

        <div className="workspace-stage relative h-[420px] overflow-hidden">
          <AnimatePresence initial={false} mode="sync">
            {phase === 'code' ? (
              <motion.div
                key="code"
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0
                      }
                }
                animate={{
                  opacity: 1
                }}
                exit={
                  reduceMotion
                    ? undefined
                    : {
                        opacity: 0
                      }
                }
                transition={{
                  duration: TRANSITION_DURATION,
                  ease: 'easeOut'
                }}
                className="absolute inset-0">
                <CodeStage onComplete={handleCodeComplete} />
              </motion.div>
            ) : (
              <motion.div
                key="database"
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0
                      }
                }
                animate={{
                  opacity: 1
                }}
                exit={
                  reduceMotion
                    ? undefined
                    : {
                        opacity: 0
                      }
                }
                transition={{
                  duration: TRANSITION_DURATION,
                  ease: 'easeOut'
                }}
                className="absolute inset-0">
                <DatabaseStage />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* LOWER INNER REFLECTION */}

        <div
          aria-hidden="true"
          className="workspace-inner-reflection pointer-events-none absolute inset-x-[8%] bottom-0 z-30 h-14"
        />
      </div>

      {/* =====================================================
          SURFACE REFLECTION
          Sits outside the workspace.
          ===================================================== */}

      <div
        aria-hidden="true"
        className="workspace-surface-reflection pointer-events-none absolute left-1/2 top-[calc(100%+8px)] -z-10 -translate-x-1/2">
        <div className="workspace-surface-reflection__core" />
      </div>
    </div>
  );
}

/* =========================================================
   STATE CONTROL
   ========================================================= */

function StageControl({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className="group flex h-6 items-center">
      <motion.span
        animate={{
          width: active ? 24 : 7,
          opacity: active ? 1 : 0.32
        }}
        transition={{
          duration: 0.24,
          ease: [0.22, 1, 0.36, 1]
        }}
        className="h-1.5 rounded-full bg-brand-teal transition-opacity group-hover:opacity-100"
      />
    </button>
  );
}
