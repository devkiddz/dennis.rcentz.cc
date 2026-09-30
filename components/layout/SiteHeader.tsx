'use client';

import {
  Bot,
  BriefcaseBusiness,
  Code2,
  FolderKanban,
  GraduationCap,
  Home,
  Menu,
  Moon,
  Sun,
  X
} from 'lucide-react';

import { useTheme } from 'next-themes';

import { useState, useSyncExternalStore } from 'react';

const navItems = [
  {
    label: 'Home',
    href: '#home',
    icon: Home
  },
  {
    label: 'Skills',
    href: '#skills',
    icon: Code2
  },
  {
    label: 'Experience',
    href: '#experience',
    icon: BriefcaseBusiness
  },
  {
    label: 'Education',
    href: '#education',
    icon: GraduationCap
  },
  {
    label: 'Projects',
    href: '#projects',
    icon: FolderKanban
  },
  {
    label: 'Ask Denok',
    href: '#denok',
    icon: Bot
  }
] as const;

const subscribe = () => () => {};

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const { resolvedTheme, setTheme } = useTheme();

  const isClient = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );

  const dark = resolvedTheme === 'dark';

  const toggleTheme = () => {
    setTheme(dark ? 'light' : 'dark');
  };

  return (
    <header className="absolute inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-5 lg:px-8">
      <div className="mx-auto w-full max-w-[1240px]">
        {/* ===================================================
            DESKTOP
            =================================================== */}

        <div className="hidden justify-center lg:flex">
          <div className="portfolio-nav-shell">
            <div className="portfolio-nav-inner gap-0.5 p-1">
              {navItems.map(({ label, href, icon: Icon }, index) => (
                <a
                  key={label}
                  href={href}
                  data-active={index === 0 ? 'true' : undefined}
                  className="nav-link h-8 px-3 text-[12px]">
                  <Icon size={14} strokeWidth={2} />

                  <span>{label}</span>
                </a>
              ))}

              <div className="ml-1 border-l border-border/50 pl-2">
                <ThemeSwitch isClient={isClient} dark={dark} onToggle={toggleTheme} compact />
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================
            MOBILE / TABLET
            =================================================== */}

        <div className="flex w-full items-center justify-between lg:hidden">
          <a href="#home" aria-label="Dennis O. Jones home" className="flex min-w-0 items-center gap-3">
            <div className="portfolio-nav-shell shrink-0">
              <div className="portfolio-nav-inner flex size-10 items-center justify-center">
                <span className="text-xs font-bold">DO</span>
              </div>
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">Dennis O. Jones</p>

              <p className="mt-0.5 truncate text-[11px] text-muted-foreground sm:text-xs">
                Frontend & Product Engineer
              </p>
            </div>
          </a>

          <div className="ml-3 flex shrink-0 items-center gap-2">
            <ThemeSwitch isClient={isClient} dark={dark} onToggle={toggleTheme} />

            <button
              type="button"
              onClick={() => setMobileOpen(value => !value)}
              aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
              aria-expanded={mobileOpen}
              className="glass-panel flex size-10 shrink-0 items-center justify-center rounded-full transition hover:border-brand-cyan/40">
              {mobileOpen ? <X size={17} strokeWidth={2} /> : <Menu size={17} strokeWidth={2} />}
            </button>
          </div>
        </div>

        {/* ===================================================
            MOBILE MENU
            =================================================== */}

        {mobileOpen ? (
          <div className="mt-4 w-full lg:hidden">
            <nav className="mobile-nav-panel w-full">
              <div className="flex w-full flex-col space-y-1">
                {navItems.map(({ label, href, icon: Icon }, index) => (
                  <a
                    key={label}
                    href={href}
                    data-active={index === 0 ? 'true' : undefined}
                    onClick={() => setMobileOpen(false)}
                    className="nav-link min-h-11 w-full px-4">
                    <span className="mr-auto flex items-center space-x-3">
                      <Icon size={17} strokeWidth={2} className="shrink-0" />

                      <span>{label}</span>
                    </span>
                  </a>
                ))}
              </div>
            </nav>
          </div>
        ) : null}
      </div>
    </header>
  );
}

/* =========================================================
   THEME SWITCH
   ========================================================= */

function ThemeSwitch({
  isClient,
  dark,
  onToggle,
  compact = false
}: {
  isClient: boolean;
  dark: boolean;
  onToggle: () => void;
  compact?: boolean;
}) {
  const dimensions = compact
    ? {
        shell: 'h-7 w-[52px]',
        thumb: 'size-5',
        sun: 'left-[7px]',
        moon: 'right-[7px]',
        translate: 'translate-x-6'
      }
    : {
        shell: 'h-8 w-[60px]',
        thumb: 'size-6',
        sun: 'left-2',
        moon: 'right-2',
        translate: 'translate-x-7'
      };

  if (!isClient) {
    return (
      <div
        aria-hidden="true"
        className={[
          'relative shrink-0 rounded-full border border-border/70 bg-background/55 p-1',
          dimensions.shell
        ].join(' ')}>
        <span
          className={[
            'absolute left-1 top-1 rounded-full border border-border/80 bg-card',
            dimensions.thumb
          ].join(' ')}
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={dark}
      className={[
        'group relative flex shrink-0 items-center rounded-full border border-border/70 bg-background/55 p-1 shadow-inner backdrop-blur-xl transition hover:border-brand-cyan/50',
        dimensions.shell
      ].join(' ')}>
      <span
        className={[
          'absolute z-10 flex size-4 items-center justify-center transition-colors',
          dimensions.sun,
          dark ? 'text-[var(--workspace-faint)]' : 'text-brand-gold'
        ].join(' ')}>
        <Sun size={compact ? 11 : 12} strokeWidth={2.2} />
      </span>

      <span
        className={[
          'absolute z-10 flex size-4 items-center justify-center transition-colors',
          dimensions.moon,
          dark ? 'text-brand-cyan' : 'text-[var(--workspace-faint)]'
        ].join(' ')}>
        <Moon size={compact ? 11 : 12} strokeWidth={2.2} />
      </span>

      <span
        className={[
          'absolute left-1 top-1 rounded-full border border-border/80 bg-card transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
          dimensions.thumb,
          dark ? dimensions.translate : 'translate-x-0'
        ].join(' ')}
      />
    </button>
  );
}
