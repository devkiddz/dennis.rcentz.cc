import { SectionButton } from '@/components/navigation/SectionButton';

import { HeroEnvironment } from './HeroEnvironment';
import { HeroProjectRotator } from './HeroProjectRotator';
import { HeroStage } from './HeroStage';

export function Hero() {
  return (
    <section data-section="home" className="relative isolate min-h-screen overflow-hidden">
      <HeroEnvironment />

      <div className="relative z-10 mx-auto w-full max-w-[1480px] px-4 sm:px-7 lg:px-10">
        <div className="mx-auto grid min-h-screen w-full max-w-[1320px] items-center gap-10 pb-12 pt-24 sm:pt-28 lg:grid-cols-[1.04fr_0.96fr] lg:gap-8 lg:pb-0 lg:pt-24">
          {/* =================================================
              IDENTITY
              ================================================= */}

          <div className="relative z-20 flex w-full min-w-0 flex-col justify-center lg:pr-1">
            {/* =================================================
                EYEBROW + PROJECT ROTATOR
                ================================================= */}

            <div className="flex w-full min-w-0 flex-col items-start gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
              <div className="hero-eyebrow max-w-full">
                <span aria-hidden="true" className="hero-eyebrow__dot" />

                <span className="whitespace-nowrap">Frontend · Product · Systems</span>
              </div>

              <div className="max-w-full sm:max-w-none">
                <HeroProjectRotator />
              </div>
            </div>

            {/* =================================================
                GREETING + NAME
                ================================================= */}

            <div>
              <p className="gradient-text inline-flex translate-y-5 items-center text-[2.65rem] font-heading font-extrabold sm:text-[2.35rem] md:text-[3.8rem] lg:translate-y-8 lg:text-[3.65rem] xl:text-[4rem]">
                <span>Hello I&apos;m</span>
              </p>

              <h1 className="whitespace-nowrap font-heading text-[2.65rem] font-extrabold sm:text-[3.45rem] md:text-[3.8rem] lg:text-[4.25rem] xl:text-[4.55rem]">
                <span>Dennis O. </span>

                <span className="gradient-text pr-[0.04em]">Jones</span>
              </h1>
            </div>

            {/* =================================================
                ROLE
                ================================================= */}

            <p className="mt-5 text-[17px] font-semibold text-foreground sm:mt-6 sm:text-[18px]">
              Frontend & Product Engineer
            </p>

            {/* =================================================
                DESCRIPTION
                ================================================= */}

            <p className="mt-4 max-w-[590px] text-[14px] font-medium leading-6 text-muted-foreground sm:text-[15px] sm:leading-7">
              I build modern product systems with React, Next.js, TypeScript and practical full-stack
              architecture — from interface behaviour to data, workflows and production-minded application
              structure.
            </p>

            {/* =================================================
                ACTIONS
                ================================================= */}

            <div className="mt-8 flex w-full flex-col gap-3 sm:mt-9 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
              <SectionButton target="projects" className="hero-action hero-action--primary w-full sm:w-auto">
                <span className="hero-action__inner">View my work</span>
              </SectionButton>

              <SectionButton target="denok" className="hero-action hero-action--secondary w-full sm:w-auto">
                <span className="hero-action__inner">Ask Denok</span>
              </SectionButton>
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
