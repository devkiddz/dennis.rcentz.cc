import { SectionButton } from './SectionButton';
import styles from './ScrollCue.module.css';

export function ScrollCue() {
  return (
    <div className={styles.wrap}>
      <SectionButton target="bio" className={styles.button}>
        <span className={styles.label}>Meet Dennis</span>
        <span className={styles.motion} aria-hidden="true">
          <span className={styles.mouse}><span className={styles.dot} /></span>
          <svg width="24" height="16" viewBox="0 0 24 16" fill="none"><path d="m3 3 9 9 9-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
      </SectionButton>
    </div>
  );
}
