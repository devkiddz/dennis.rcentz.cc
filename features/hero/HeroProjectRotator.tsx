'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

import { useEffect, useState } from 'react';

const PROJECTS = ['Waffi Market', 'Rcentz', 'JobRcentz', 'NovaShad', 'Multi-Asset Fintech'] as const;

const ROTATION_INTERVAL = 3200;

export function HeroProjectRotator() {
  const reduceMotion = Boolean(useReducedMotion());
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;

    const timer = window.setInterval(() => {
      setIndex(current => (current + 1) % PROJECTS.length);
    }, ROTATION_INTERVAL);

    return () => {
      window.clearInterval(timer);
    };
  }, [reduceMotion]);

  return (
    <div className="hero-project-rotator">
      <span className="hero-project-rotator__label">Worked across</span>

      <span className="hero-project-rotator__viewport">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={PROJECTS[index]}
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 8,
                    filter: 'blur(5px)'
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
              filter: 'blur(0px)'
            }}
            exit={
              reduceMotion
                ? undefined
                : {
                    opacity: 0,
                    y: -8,
                    filter: 'blur(5px)'
                  }
            }
            transition={{
              duration: 0.34,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="hero-project-rotator__project">
            {PROJECTS[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </div>
  );
}
