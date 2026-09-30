'use client';

import { motion, useReducedMotion } from 'motion/react';

const nodes = [
  { top: '18%', left: '9%', delay: 0 },
  { top: '25%', left: '81%', delay: 0.8 },
  { top: '67%', left: '14%', delay: 1.4 },
  { top: '76%', left: '76%', delay: 2 },
  { top: '48%', left: '93%', delay: 2.5 }
];

export function HeroEnvironment() {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-background" />

      <div className="portfolio-grid absolute inset-0 opacity-80" />

      <div className="glow-cyan absolute left-1/2 top-[42%] h-[440px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full" />

      {nodes.map((node, index) => (
        <motion.span
          key={index}
          style={{
            top: node.top,
            left: node.left
          }}
          animate={
            reduceMotion
              ? undefined
              : {
                  opacity: [0.12, 0.75, 0.12],
                  scale: [0.7, 1.35, 0.7]
                }
          }
          transition={{
            duration: 5,
            delay: node.delay,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute size-1 rounded-full bg-brand-teal"
        />
      ))}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_38%,var(--background)_98%)]" />
    </div>
  );
}
