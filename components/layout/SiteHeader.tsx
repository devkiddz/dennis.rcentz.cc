'use client';

import {
  BriefcaseBusiness,
  Code2,
  FolderKanban,
  Home,
  Menu,
  Mail,
  Moon,
  Sun,
  UserRound,
  X
} from 'lucide-react';

import Link from 'next/link';
import { BrandMark } from '@/components/brand/BrandMark';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';

import { useEffect, useState, useSyncExternalStore } from 'react';

import { scrollToSection } from '@/lib/scrollToSection';
import styles from './SiteHeader.module.css';

const navItems = [
  // {
  //   label: 'Home',
  //   target: 'home',
  //   icon: Home
  // },
  {
    label: 'Bio',
    target: 'bio',
    icon: UserRound
  },
  { label: 'Services', target: 'services', icon: BriefcaseBusiness },
  {
    label: 'Skills',
    target: 'skills',
    icon: Code2
  },
  {
    label: 'Experience',
    target: 'experience',
    icon: BriefcaseBusiness
  },
  {
    label: 'Portfolio',
    target: 'projects',
    icon: FolderKanban
  },
  {
    label: 'Contact',
    target: 'contact',
    icon: Mail
  }
] as const;

const pageNavItems = [
  { label: 'Home', target: 'home', icon: Home },
  { label: 'Portfolio', target: 'projects', icon: FolderKanban },
  { label: 'Services', target: 'services', icon: BriefcaseBusiness },
  { label: 'Contact', target: 'contact', icon: Mail }
] as const;

const subscribe = () => () => {};
const subscribeScroll = (onChange: () => void) => {
  window.addEventListener('scroll', onChange, { passive: true });
  return () => window.removeEventListener('scroll', onChange);
};
const getScrollSnapshot = () => window.scrollY > 48;
const getServerScrollSnapshot = () => false;

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const homePage = pathname === '/';
  const visibleItems = homePage ? navItems : pageNavItems;
  const navigationHref = (target: string) =>
    homePage && target !== 'contact' ? `/#${target}` : target === 'home' ? '/' : `/${target}`;
  const currentNavigation = (target: string): 'location' | 'page' | undefined =>
    homePage && target !== 'contact'
      ? activeSection === target
        ? 'location'
        : undefined
      : pathname === navigationHref(target)
        ? 'page'
        : undefined;
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrolled = useSyncExternalStore(subscribeScroll, getScrollSnapshot, getServerScrollSnapshot);

  const [activeSection, setActiveSection] = useState<string>('home');

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

  const handleNavigation = (target: string) => {
    setActiveSection(target);

    scrollToSection(target, {
      duration: 900,
      offset: 104
    });

    setMobileOpen(false);
  };

  /* =========================================================
     ACTIVE SECTION TRACKING
     Keeps navbar state in sync when scrolling manually.
     ========================================================= */

  useEffect(() => {
    if (pathname !== '/') return;
    const sections = navItems
      .map(item => document.querySelector<HTMLElement>(`[data-section="${item.target}"]`))
      .filter((section): section is HTMLElement => section !== null);
    let frame = 0;
    const update = () => {
      frame = 0;
      const readingLine = window.innerHeight * 0.35;
      let current = sections[0];
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= readingLine) current = section;
      }
      const target = current?.dataset.section;
      if (target) setActiveSection(target);
    };
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    const hash = window.location.hash.slice(1);
    if (pathname === '/' && hash) scrollToSection(hash, { duration: 1 });
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return (
    <header
      className={styles.header}
      data-scrolled={scrolled ? 'true' : undefined}
      onKeyDown={event => {
        if (event.key === 'Escape') setMobileOpen(false);
      }}>
      <div className={styles.container}>
        {/* ===================================================
            DESKTOP
            =================================================== */}

        <div className={`hidden lg:flex ${styles.desktopBar}`}>
          <div className={`portfolio-nav-shell ${styles.desktopShell}`}>
            <nav
              aria-label="Main navigation"
              className={`portfolio-nav-inner gap-0.5 p-1 ${styles.desktopInner}`}>
              <Link
                href={homePage ? '/#home' : '/'}
                aria-label="Dennis O. Jones home"
                className={styles.brandLink}
                onClick={event => {
                  if (
                    pathname === '/' &&
                    !event.metaKey &&
                    !event.ctrlKey &&
                    !event.shiftKey &&
                    !event.altKey &&
                    event.button === 0
                  ) {
                    event.preventDefault();
                    handleNavigation('home');
                  }
                }}>
                <BrandMark />
              </Link>
              {visibleItems
                .filter(item => item.target !== 'services')
                .map(({ label, target, icon: Icon }) => (
                  <Link
                    key={label}
                    href={navigationHref(target)}
                    onClick={event => {
                      setMobileOpen(false);
                      if (
                        target !== 'contact' &&
                        pathname === '/' &&
                        !event.metaKey &&
                        !event.ctrlKey &&
                        !event.shiftKey &&
                        !event.altKey &&
                        event.button === 0
                      ) {
                        event.preventDefault();
                        handleNavigation(target);
                      }
                    }}
                    aria-current={currentNavigation(target)}
                    data-active={currentNavigation(target) ? 'true' : undefined}
                    className={`nav-link ${styles.navButton}`}>
                    <Icon size={14} strokeWidth={2} />

                    <span>{label}</span>
                  </Link>
                ))}

              <div className={styles.endActions}>
                <Link
                  href={navigationHref('services')}
                  className={styles.servicesButton}
                  aria-current={currentNavigation('services')}
                  onClick={event => {
                    if (
                      pathname === '/' &&
                      !event.metaKey &&
                      !event.ctrlKey &&
                      !event.shiftKey &&
                      !event.altKey &&
                      event.button === 0
                    ) {
                      event.preventDefault();
                      handleNavigation('services');
                    }
                  }}>
                  Services
                </Link>
                <ThemeSwitch isClient={isClient} dark={dark} onToggle={toggleTheme} compact />
              </div>
            </nav>
          </div>
        </div>

        {/* ===================================================
            MOBILE / TABLET
            =================================================== */}

        <div className={`${styles.mobileBar} flex w-full items-center justify-between lg:hidden`}>
          <button
            type="button"
            onClick={() => {
              if (pathname !== '/') router.push('/');
              else handleNavigation('home');
            }}
            aria-label="Dennis O. Jones home"
            className="flex min-w-0 items-center gap-3 text-left">
            <span className={styles.mobileLogo}>
              <BrandMark />
            </span>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">Dennis O. Jones</p>

              <p
                className={`${styles.subtitle} mt-0.5 truncate text-[11px] text-muted-foreground sm:text-xs`}>
                Frontend & Product Engineer
              </p>
            </div>
          </button>

          <div className="ml-3 flex shrink-0 items-center gap-2">
            <ThemeSwitch isClient={isClient} dark={dark} onToggle={toggleTheme} />

            <button
              type="button"
              onClick={() => setMobileOpen(value => !value)}
              aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
              aria-expanded={mobileOpen}
              aria-controls="portfolio-mobile-navigation"
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
            <nav
              id="portfolio-mobile-navigation"
              aria-label="Main navigation"
              className={`mobile-nav-panel w-full ${styles.mobileMenu}`}>
              <div className="flex w-full flex-col space-y-1">
                {visibleItems.map(({ label, target, icon: Icon }) => (
                  <Link
                    key={label}
                    href={navigationHref(target)}
                    onClick={event => {
                      setMobileOpen(false);
                      if (
                        target !== 'contact' &&
                        pathname === '/' &&
                        !event.metaKey &&
                        !event.ctrlKey &&
                        !event.shiftKey &&
                        !event.altKey &&
                        event.button === 0
                      ) {
                        event.preventDefault();
                        handleNavigation(target);
                      }
                    }}
                    aria-current={currentNavigation(target)}
                    data-active={currentNavigation(target) ? 'true' : undefined}
                    className={`nav-link min-h-11 w-full px-4 ${styles.mobileButton}`}>
                    <span className="mr-auto flex items-center space-x-3">
                      <Icon size={17} strokeWidth={2} className="shrink-0" />

                      <span>{label}</span>
                    </span>
                  </Link>
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
