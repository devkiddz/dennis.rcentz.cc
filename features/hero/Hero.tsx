import { HeroEnvironment } from './HeroEnvironment';
import { HeroStage } from './HeroStage';

export function Hero() {
  return (
    <section id="home" className="relative isolate min-h-screen overflow-hidden">
      <HeroEnvironment />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 sm:px-7 lg:px-10">
        <div className="mx-auto grid min-h-screen w-full max-w-[1240px] items-stretch gap-10 pt-24 lg:grid-cols-2 lg:gap-12 lg:pt-20">
          <div className="relative z-20 flex min-h-[560px] w-full flex-col justify-center">
            <div className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-brand-teal" />

              <p className="font-mono text-[9px] font-medium uppercase tracking-[0.19em] text-muted-foreground">
                Frontend · Product · Systems
              </p>
            </div>

            <h1 className="mt-5 text-balance text-[2.8rem] font-semibold leading-[0.95] tracking-[-0.06em] sm:text-[3.8rem] lg:text-[4.8rem]">
              Dennis O.
              <br />
              <span className="gradient-text">Jones</span>
            </h1>

            <p className="mt-4 text-lg font-medium text-foreground sm:text-xl">Frontend & Product Engineer</p>

            <p className="mt-5 max-w-[440px] text-[15px] leading-7 text-muted-foreground">
              I build modern product systems with React, Next.js, TypeScript and practical full-stack
              architecture — from interface behaviour to data, workflows and production-minded application
              structure.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="brand-gradient rounded-full px-5 py-3 text-xs font-semibold text-white transition hover:scale-[1.02]">
                View my work
              </a>

              <a
                href="#ask-dennis"
                className="glass-panel rounded-full px-5 py-3 text-xs font-semibold transition hover:border-brand-cyan/40">
                Ask Dennis AI
              </a>
            </div>
          </div>

          <div className="flex min-h-[560px] w-full items-center">
            <HeroStage />
          </div>
        </div>
      </div>
    </section>
  );
}
