import styles from './BrandMark.module.css';

export function BrandMark() {
  return <span className={styles.mark} aria-hidden="true"><span>DO</span><span className={styles.dot} /></span>;
}
