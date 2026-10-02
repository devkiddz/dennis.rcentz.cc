'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUp, Home, UserRound, Code2, BriefcaseBusiness, FolderKanban, PanelsTopLeft, Mail } from 'lucide-react';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { scrollToSection } from '@/lib/scrollToSection';
import styles from './SectionNavigator.module.css';

const sections = [
  { target: 'home', label: 'Home', icon: Home },
  { target: 'bio', label: 'Bio', icon: UserRound },
  { target: 'services', label: 'Services', icon: PanelsTopLeft },
  { target: 'skills', label: 'Skills', icon: Code2 },
  { target: 'experience', label: 'Experience', icon: BriefcaseBusiness },
  { target: 'projects', label: 'Portfolio', icon: FolderKanban }
] as const;
const pageLinks = [
  { target: 'home', label: 'Home', icon: Home },
  { target: 'projects', label: 'Portfolio', icon: FolderKanban },
  { target: 'services', label: 'Services', icon: PanelsTopLeft },
  { target: 'contact', label: 'Contact', icon: Mail }
] as const;
const subscribeScroll = (notify: () => void) => {
  window.addEventListener('scroll', notify, { passive: true });
  return () => window.removeEventListener('scroll', notify);
};
const getSnapshot = () => window.scrollY > 300;
const getServerSnapshot = () => false;

export function SectionNavigator({ showMarkers = true }: { showMarkers?: boolean }) {
  const pathname = usePathname();
  const homePage = pathname === '/';
  const mobileItems = homePage ? sections : pageLinks;
  const hrefFor = (target: string) => homePage ? `/#${target}` : target === 'home' ? '/' : `/${target}`;
  const [active, setActive] = useState<string>('home');
  const showTop = useSyncExternalStore(subscribeScroll, getSnapshot, getServerSnapshot);
  useEffect(() => {
    if (!homePage) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      let current: string = 'home';
      for (const item of sections) {
        const node = document.querySelector<HTMLElement>(`[data-section="${item.target}"]`);
        if (node && node.getBoundingClientRect().top <= window.innerHeight * .35) current = item.target;
      }
      setActive(current);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      cancelAnimationFrame(frame);
    };
  }, [homePage]);
  return (
    <>
      {showMarkers ? <nav className={styles.markers} aria-label="Page sections">
        {sections.map(item => (
          <button key={item.target} type="button" aria-label={`Go to ${item.label}`}
            aria-current={active === item.target ? 'location' : undefined}
            onClick={() => scrollToSection(item.target)} className={styles.marker}>
            <span className={styles.tooltip}>{item.label}</span><span className={styles.dot} aria-hidden="true" />
          </button>
        ))}
      </nav> : null}
      <nav className={styles.mobileNavigation} aria-label="Mobile navigation">
        {mobileItems.map(({ target, label, icon: Icon }) => <Link key={target} href={hrefFor(target)} aria-current={homePage && active === target ? 'location' : !homePage && pathname === hrefFor(target) ? 'page' : undefined} onClick={event => { if (pathname === '/' && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey && event.button === 0) { event.preventDefault(); scrollToSection(target); } }}><Icon size={18} aria-hidden="true" /><span>{label}</span></Link>)}
      </nav>
      {showTop ? <button type="button" className={styles.top} aria-label="Scroll to top"
        onClick={() => scrollToSection('home', { offset: 0 })}><span className={styles.topIcon}><ArrowUp size={18} aria-hidden="true" /></span><span className={styles.topLabel} aria-hidden="true">Top</span></button> : null}
    </>
  );
}
