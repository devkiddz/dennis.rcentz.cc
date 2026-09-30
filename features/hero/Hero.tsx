import { HeroEnvironment } from './HeroEnvironment';
import { HeroProjectRotator } from './HeroProjectRotator';
import { HeroStage } from './HeroStage';

export function Hero() {
  return (
    <section id="home" className="relative isolate min-h-screen overflow-hidden">
      <HeroEnvironment />

      <div className="relative z-10 mx-auto w-full max-w-[1480px] px-4 sm:px-7 lg:px-10">
        <div className="mx-auto grid min-h-screen w-full max-w-[1320px] items-center gap-10 pb-12 pt-24 sm:pt-28 lg:grid-cols-[1.04fr_0.96fr] lg:gap-8 lg:pb-0 lg:pt-24">
          {/* =================================================
              IDENTITY
              ================================================= */}

          <div className="relative z-20 flex w-full min-w-0 flex-col justify-center lg:pr-1">
            {/* EYEBROW + PROJECT ROTATOR */}

            <div className="flex w-full min-w-0 flex-col items-start gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
              <div className="hero-eyebrow max-w-full">
                <span aria-hidden="true" className="hero-eyebrow__dot" />

                <span className="whitespace-nowrap">Frontend · Product · Systems</span>
              </div>

              <div className="max-w-full sm:max-w-none">
                <HeroProjectRotator />
              </div>
            </div>

            {/* NAME */}

            <h1 className="mt-5 flex items-center space-x-2 Justify-start font-heading text-[3.15rem] font-extrabold sm:text-[4rem] md:text-[4.35rem] lg:whitespace-nowrap lg:text-[4.8rem] xl:text-[5.2rem]">
              <span className="sm:inline">Dennis O.</span>

              <span className="gradient-text sm:ml-[0.12em] sm:inline">Jones</span>
            </h1>

            {/* ROLE */}

            <p className="mt-5 text-[17px] font-semibold text-foreground sm:mt-6 sm:text-[18px]">
              Frontend & Product Engineer
            </p>

            {/* DESCRIPTION */}

            <p className="mt-4 max-w-[590px] text-[14px] font-medium leading-6 text-muted-foreground sm:text-[15px] sm:leading-7">
              I build modern product systems with React, Next.js, TypeScript and practical full-stack
              architecture — from interface behaviour to data, workflows and production-minded application
              structure.
            </p>

            {/* ACTIONS */}

            <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-9 sm:gap-4">
              <a href="#projects" className="gradient-outline-button">
                <span className="gradient-outline-button__inner">View my work</span>
              </a>

              <a href="#ask-dennis" className="quiet-outline-button">
                <span className="quiet-outline-button__inner">Ask Dennis AI</span>
              </a>
            </div>
          </div>

          {/* =================================================
              INTERACTIVE WORKSPACE
              ================================================= */}

          <div className="flex w-full min-w-0 items-center justify-center lg:justify-end">
            <HeroStage />
          </div>
        </div>
      </div>
    </section>
  );
}
