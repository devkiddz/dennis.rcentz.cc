'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Bot, BriefcaseBusiness, FolderKanban, Home, Menu, Moon, Sun, X } from 'lucide-react';

const navItems = [
  {
    label: 'Home',
    href: '#home',
    icon: Home
  },
  {
    label: 'Projects',
    href: '#projects',
    icon: FolderKanban
  },
  {
    label: 'Experience',
    href: '#experience',
    icon: BriefcaseBusiness
  },
  {
    label: 'Ask Dennis',
    href: '#ask-dennis',
    icon: Bot
  }
];

export function SiteHeader() {
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const dark = resolvedTheme === 'dark';

  return (
    <header className="absolute inset-x-0 top-0 z-50 px-4 pt-5 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <a href="#home" className="group flex items-center gap-3" aria-label="Dennis O. Jones home">
          <div className="flex size-10 items-center justify-center rounded-xl border border-border bg-panel/80 text-sm font-bold backdrop-blur-md">
            DO
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold leading-none">Dennis O. Jones</p>

            <p className="mt-1 text-xs text-muted-foreground">Product Engineer</p>
          </div>
        </a>

        <nav className="glass-panel hidden items-center gap-1 rounded-full px-2 py-2 lg:flex">
          {navItems.map(({ label, href, icon: Icon }, index) => (
            <a
              key={label}
              href={href}
              data-active={index === 0 ? 'true' : undefined}
              className="nav-link flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium">
              <Icon size={15} strokeWidth={1.8} />
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setTheme(dark ? 'light' : 'dark')}
            className="glass-panel flex size-10 items-center justify-center rounded-full transition hover:border-brand-cyan/40"
            aria-label="Toggle colour theme">
            {mounted ? dark ? <Sun size={17} /> : <Moon size={17} /> : <span className="size-4" />}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen(value => !value)}
            className="glass-panel flex size-10 items-center justify-center rounded-full lg:hidden"
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}>
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="glass-panel mx-auto mt-3 grid max-w-md gap-1 rounded-2xl p-2 lg:hidden">
          {navItems.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-muted-foreground transition hover:bg-secondary hover:text-foreground">
              <Icon size={16} />
              {label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
