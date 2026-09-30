'use client';

import { motion, useReducedMotion } from 'motion/react';

type DatabaseIconProps = {
  className?: string;
};

export function DatabaseIcon({ className = '' }: DatabaseIconProps) {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <motion.svg
      viewBox="0 0 320 430"
      role="img"
      aria-label="Database system"
      className={className}
      initial={false}
      animate={
        reduceMotion
          ? undefined
          : {
              y: [0, -2, 0]
            }
      }
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: 'easeInOut'
      }}>
      <defs>
        <linearGradient id="database-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--database-main)" />
          <stop offset="100%" stopColor="var(--database-main-deep)" />
        </linearGradient>

        <linearGradient id="database-top" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--database-top)" />
          <stop offset="100%" stopColor="var(--database-main)" />
        </linearGradient>

        <filter id="database-signal-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />

          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* MAIN CYLINDER */}

      <path
        d="
          M52 104
          C52 72 100 48 160 48
          C220 48 268 72 268 104
          L268 338
          C268 372 220 398 160 398
          C100 398 52 372 52 338
          Z
        "
        fill="url(#database-body)"
        stroke="var(--database-outline)"
        strokeWidth="3"
      />

      {/* TOP FACE */}

      <ellipse
        cx="160"
        cy="104"
        rx="108"
        ry="56"
        fill="url(#database-top)"
        stroke="var(--database-outline)"
        strokeWidth="3"
      />

      {/* VERY SUBTLE RIGHT DEPTH */}

      <path
        d="
          M160 48
          C220 48 268 72 268 104
          L268 338
          C268 372 220 398 160 398
          Z
        "
        fill="var(--database-side-shade)"
      />

      {/* STORAGE DIVIDERS */}

      {[164, 246, 326].map(y => (
        <path
          key={y}
          d={`M52 ${y} C78 ${y + 24} 118 ${y + 34} 160 ${y + 34} C202 ${y + 34} 242 ${y + 24} 268 ${y}`}
          fill="none"
          stroke="var(--database-divider)"
          strokeWidth="12"
          strokeLinecap="round"
        />
      ))}

      {/* SIGNAL ROWS */}

      <SignalRow y={151} delay={0} reduceMotion={reduceMotion} />
      <SignalRow y={233} delay={0.3} reduceMotion={reduceMotion} />
      <SignalRow y={315} delay={0.6} reduceMotion={reduceMotion} />
    </motion.svg>
  );
}

function SignalRow({ y, delay, reduceMotion }: { y: number; delay: number; reduceMotion: boolean }) {
  return (
    <g>
      <motion.circle
        cx="83"
        cy={y}
        r="8"
        fill="var(--database-signal)"
        filter="url(#database-signal-glow)"
        animate={
          reduceMotion
            ? undefined
            : {
                opacity: [0.55, 1, 0.55]
              }
        }
        transition={{
          duration: 2.4,
          delay,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      <motion.circle
        cx="113"
        cy={y + 7}
        r="7"
        fill="var(--database-signal)"
        animate={
          reduceMotion
            ? undefined
            : {
                opacity: [0.4, 0.9, 0.4]
              }
        }
        transition={{
          duration: 2.6,
          delay: delay + 0.12,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      <motion.circle
        cx="141"
        cy={y + 10}
        r="6"
        fill="var(--database-signal)"
        animate={
          reduceMotion
            ? undefined
            : {
                opacity: [0.35, 0.85, 0.35]
              }
        }
        transition={{
          duration: 2.8,
          delay: delay + 0.24,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      <motion.path
        d={`M181 ${y + 10} H239`}
        fill="none"
        stroke="var(--database-signal)"
        strokeWidth="13"
        strokeLinecap="round"
        animate={
          reduceMotion
            ? undefined
            : {
                opacity: [0.35, 1, 0.35]
              }
        }
        transition={{
          duration: 2.7,
          delay: delay + 0.18,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
    </g>
  );
}
