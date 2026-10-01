'use client';

import { ArrowUp } from 'lucide-react';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { scrollToSection } from '@/lib/scrollToSection';
import styles from './SectionNavigator.module.css';

const sections = [
  { target: 'home', label: 'Home' },
  { target: 'bio', label: 'About Dennis' },
  { target: 'skills', label: 'Skills' },
  { target: 'experience', label: 'Experience' }
] as const;
const subscribeScroll = (notify: () => void) => {
  window.addEventListener('scroll', notify, { passive: true });
  return () => window.removeEventListener('scroll', notify);
};
const getSnapshot = () => window.scrollY > 300;
const getServerSnapshot = () => false;

export function SectionNavigator() {
  const [active, setActive] = useState<string>('home');
  const showTop = useSyncExternalStore(subscribeScroll, getSnapshot, getServerSnapshot);
  useEffect(() => {
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
  }, []);
  return (
    <>
      <nav className={styles.markers} aria-label="Page sections">
        {sections.map(item => (
          <button key={item.target} type="button" aria-label={`Go to ${item.label}`}
            aria-current={active === item.target ? 'location' : undefined}
            onClick={() => scrollToSection(item.target)} className={styles.marker}>
            <span className={styles.tooltip}>{item.label}</span><span className={styles.dot} aria-hidden="true" />
          </button>
        ))}
      </nav>
      {showTop ? <button type="button" className={styles.top} aria-label="Scroll to top"
        onClick={() => scrollToSection('home', { offset: 0 })}><span className={styles.topIcon}><ArrowUp size={18} aria-hidden="true" /></span><span className={styles.topLabel} aria-hidden="true">Top</span></button> : null}
    </>
  );
}
