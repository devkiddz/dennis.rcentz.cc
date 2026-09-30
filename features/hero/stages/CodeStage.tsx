'use client';

import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';

import { useReducedMotion } from 'motion/react';

import { useEffect, useState, useSyncExternalStore } from 'react';

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

const subscribe = () => () => {};

type CodeStageProps = {
  onComplete: () => void;
};

export function CodeStage({ onComplete }: CodeStageProps) {
  const reduceMotion = Boolean(useReducedMotion());

  const isClient = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );

  const [blockIndex, setBlockIndex] = useState(0);
  const [visibleLength, setVisibleLength] = useState(0);
  const [started, setStarted] = useState(false);

  const currentBlock = CODE_BLOCKS[blockIndex];

  useEffect(() => {
    if (!isClient || reduceMotion || started) return;

    const timer = window.setTimeout(() => {
      setStarted(true);
    }, INITIAL_WAKE_DELAY);

    return () => {
      window.clearTimeout(timer);
    };
  }, [isClient, reduceMotion, started]);

  useEffect(() => {
    if (!isClient || !started || reduceMotion) return;

    if (visibleLength < currentBlock.code.length) {
      const timer = window.setTimeout(() => {
        setVisibleLength(current => Math.min(current + TYPE_STEP, currentBlock.code.length));
      }, TYPE_SPEED);

      return () => {
        window.clearTimeout(timer);
      };
    }

    if (blockIndex < CODE_BLOCKS.length - 1) {
      const timer = window.setTimeout(() => {
        setBlockIndex(current => current + 1);
        setVisibleLength(0);
      }, FIRST_BLOCK_HOLD);

      return () => {
        window.clearTimeout(timer);
      };
    }

    const timer = window.setTimeout(() => {
      onComplete();
    }, FINAL_BLOCK_HOLD);

    return () => {
      window.clearTimeout(timer);
    };
  }, [blockIndex, currentBlock.code.length, isClient, onComplete, reduceMotion, started, visibleLength]);

  if (!isClient) {
    return <div className="relative h-full" />;
  }

  const codeToRender = reduceMotion ? currentBlock.code : currentBlock.code.slice(0, visibleLength);

  const highlightedCode = Prism.highlight(codeToRender, Prism.languages.typescript, 'typescript');

  const isTyping = !reduceMotion && started && visibleLength < currentBlock.code.length;

  return (
    <div className="relative flex h-full flex-col">
      {/* FILE BAR */}

      <div className="flex min-h-11 items-center border-b border-[var(--workspace-divider)] px-6 sm:px-7">
        <div className="flex items-center space-x-2">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-brand-teal" />

          <span className="text-[12px] font-semibold text-[var(--workspace-muted)]">{currentBlock.file}</span>
        </div>

        <div className="ml-auto flex items-center space-x-2">
          <span className="text-[11px] font-medium text-[var(--workspace-faint)]">TypeScript</span>

          <span aria-hidden="true" className="h-3 w-px bg-[var(--workspace-divider)]" />

          <span className="text-[11px] font-medium text-[var(--workspace-faint)]">
            {isTyping ? 'writing' : 'ready'}
          </span>
        </div>
      </div>

      {/* CODE */}

      <div className="relative flex-1 overflow-hidden px-6 py-6 sm:px-8 sm:py-7">
        <div
          aria-hidden="true"
          className="glow-cyan pointer-events-none absolute -right-20 top-1/2 size-48 -translate-y-1/2 rounded-full opacity-30"
        />

        <pre className="language-typescript relative z-10">
          <code
            className="language-typescript"
            dangerouslySetInnerHTML={{
              __html: highlightedCode
            }}
          />

          {isTyping ? (
            <span
              aria-hidden="true"
              className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[0.12em] animate-pulse bg-brand-cyan"
            />
          ) : null}
        </pre>
      </div>
    </div>
  );
}
