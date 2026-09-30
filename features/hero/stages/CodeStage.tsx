'use client';

import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

import { useEffect, useMemo, useState } from 'react';

const CODE_BLOCKS = [
  {
    file: 'dennis.ts',

    code: `const dennis = {
  role: 'Frontend & Product Engineer',
  builds: 'real product systems',
  approach: 'interface + architecture + data',
  priority: 'clarity, security, maintainability',
  mindset: 'Build. Harden. Improve.'
}`
  },

  {
    file: 'product.ts',

    code: `const product = createSystem({
  experience: 'intentional',
  data: 'structured',
  access: 'protected',
  workflows: 'traceable',
  architecture: 'modular',
  growth: 'measured'
})

return product.launch()`
  }
] as const;

const INITIAL_WAKE_DELAY = 700;
const TYPE_STEP = 1;
const TYPE_SPEED = 115;

const FIRST_BLOCK_HOLD = 1100;
const FINAL_BLOCK_HOLD = 1400;

type CodeStageProps = {
  onComplete: () => void;
};

export function CodeStage({ onComplete }: CodeStageProps) {
  const reduceMotion = Boolean(useReducedMotion());

  const [mounted, setMounted] = useState(false);

  const [activeIndex, setActiveIndex] = useState(0);

  const [typedLength, setTypedLength] = useState(0);

  const [awake, setAwake] = useState(false);

  const activeBlock = CODE_BLOCKS[activeIndex];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || reduceMotion) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setAwake(true);
    }, INITIAL_WAKE_DELAY);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [mounted, reduceMotion]);

  useEffect(() => {
    if (!mounted || reduceMotion || !awake || typedLength >= activeBlock.code.length) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setTypedLength(current => Math.min(current + TYPE_STEP, activeBlock.code.length));
    }, TYPE_SPEED);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [activeBlock.code, awake, mounted, reduceMotion, typedLength]);

  useEffect(() => {
    if (!mounted || reduceMotion || !awake || activeIndex !== 0 || typedLength !== activeBlock.code.length) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setTypedLength(0);
      setActiveIndex(1);
    }, FIRST_BLOCK_HOLD);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [activeBlock.code.length, activeIndex, awake, mounted, reduceMotion, typedLength]);

  useEffect(() => {
    if (
      !mounted ||
      reduceMotion ||
      !awake ||
      activeIndex !== CODE_BLOCKS.length - 1 ||
      typedLength !== activeBlock.code.length
    ) {
      return;
    }

    const timeout = window.setTimeout(() => {
      onComplete();
    }, FINAL_BLOCK_HOLD);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [activeBlock.code.length, activeIndex, awake, mounted, onComplete, reduceMotion, typedLength]);

  const visibleLength = reduceMotion ? activeBlock.code.length : typedLength;

  const typedCode = activeBlock.code.slice(0, visibleLength);

  const highlightedCode = useMemo(() => {
    if (!mounted) {
      return '';
    }

    return Prism.highlight(typedCode, Prism.languages.typescript, 'typescript');
  }, [mounted, typedCode]);

  /*
   * Important:
   * server and first client render are
   * intentionally identical.
   *
   * Prism only enters after hydration.
   */
  if (!mounted) {
    return <div className="relative h-full" />;
  }

  return (
    <div className="relative h-full">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={activeIndex}
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 8
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
                  y: -6
                }
          }
          transition={{
            duration: 0.3,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="absolute inset-0 p-8 sm:p-10">
          <div className="mb-6 flex items-center justify-between">
            <span className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] text-[var(--workspace-muted)]">
              {activeBlock.file}
            </span>

            <span className="font-[family-name:var(--font-jetbrains-mono)] text-[8px] uppercase tracking-[0.14em] text-[var(--workspace-faint)]">
              {String(activeIndex + 1).padStart(2, '0')}/{String(CODE_BLOCKS.length).padStart(2, '0')}
            </span>
          </div>

          <pre
            className={[
              'whitespace-pre-wrap',
              'font-[family-name:var(--font-jetbrains-mono)]',
              'text-[14px]',
              'leading-[2]',
              'tracking-[-0.015em]',
              'text-[var(--workspace-text)]',
              'sm:text-[15px]'
            ].join(' ')}>
            <code className="language-typescript">
              <span
                dangerouslySetInnerHTML={{
                  __html: highlightedCode
                }}
              />

              {!reduceMotion && awake && typedLength < activeBlock.code.length ? (
                <motion.span
                  aria-hidden="true"
                  animate={{
                    opacity: [1, 0.15, 1]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] bg-brand-teal"
                />
              ) : null}
            </code>
          </pre>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
