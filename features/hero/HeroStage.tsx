'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

import { useCallback, useEffect, useState } from 'react';

import { CodeStage } from './stages/CodeStage';
import { DatabaseStage } from './stages/DatabaseStage';

type HeroPhase = 'code' | 'database';

/*
 * The database is the payoff after the
 * two typing sequences.
 *
 * Give it enough time to be understood
 * before returning to code.
 */
const DATABASE_RUNTIME = 9000;

const TRANSITION_DURATION = 0.38;

export function HeroStage() {
  const reduceMotion = Boolean(useReducedMotion());

  const [phase, setPhase] = useState<HeroPhase>('code');

  const handleCodeComplete = useCallback(() => {
    if (reduceMotion) {
      return;
    }

    setPhase('database');
  }, [reduceMotion]);

  /*
   * DATABASE → CODE
   */
  useEffect(() => {
    if (reduceMotion || phase !== 'database') {
      return;
    }

    const timer = window.setTimeout(() => {
      setPhase('code');
    }, DATABASE_RUNTIME);

    return () => {
      window.clearTimeout(timer);
    };
  }, [phase, reduceMotion]);

  return (
    <div className="relative w-full">
      {/* AMBIENT LIGHT */}

      <div className="glow-cyan absolute left-1/2 top-1/2 -z-10 size-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70" />

      {/* WORKSPACE */}

      <div className="workspace-window overflow-hidden rounded-[1.3rem]">
        {/* HEADER */}

        <div className="workspace-header flex h-14 items-center px-5">
          <div className="flex items-center gap-2.5">
            <span className="size-3 rounded-full bg-red-500" />

            <span className="size-3 rounded-full bg-amber-400" />

            <span className="size-3 rounded-full bg-emerald-400" />
          </div>

          <span className="ml-7 font-[family-name:var(--font-jetbrains-mono)] text-[11px] text-[var(--workspace-text)]">
            dennis.ts
          </span>

          {/* STATE CONTROLS */}

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setPhase('code');
              }}
              aria-label="Show code state"
              aria-pressed={phase === 'code'}
              className="group flex h-5 items-center">
              <motion.span
                animate={{
                  width: phase === 'code' ? 24 : 7,

                  opacity: phase === 'code' ? 1 : 0.35
                }}
                transition={{
                  duration: 0.25,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="h-1.5 rounded-full bg-brand-teal transition-opacity group-hover:opacity-100"
              />
            </button>

            <button
              type="button"
              onClick={() => {
                setPhase('database');
              }}
              aria-label="Show database state"
              aria-pressed={phase === 'database'}
              className="group flex h-5 items-center">
              <motion.span
                animate={{
                  width: phase === 'database' ? 24 : 7,

                  opacity: phase === 'database' ? 1 : 0.35
                }}
                transition={{
                  duration: 0.25,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="h-1.5 rounded-full bg-brand-teal transition-opacity group-hover:opacity-100"
              />
            </button>
          </div>
        </div>

        {/* CONTINUOUS STAGE */}

        <div className="relative h-[400px] overflow-hidden">
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

        {/* FOOTER */}

        <div className="workspace-footer flex h-11 items-center justify-between px-5">
          <div className="flex items-center gap-2">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-teal opacity-25" />

              <span className="relative inline-flex size-1.5 rounded-full bg-brand-teal" />
            </span>

            <span className="font-[family-name:var(--font-jetbrains-mono)] text-[8px] uppercase tracking-[0.15em] text-[var(--workspace-muted)]">
              Dennis workspace
            </span>
          </div>

          <span className="font-[family-name:var(--font-jetbrains-mono)] text-[8px] uppercase tracking-[0.14em] text-[var(--workspace-faint)]">
            {phase === 'code' ? 'Building' : 'Running'}
          </span>
        </div>
      </div>
    </div>
  );
}
