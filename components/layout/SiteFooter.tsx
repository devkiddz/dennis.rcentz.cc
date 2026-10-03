import Link from 'next/link';
import { DenokTrigger } from '@/features/denok/DenokTrigger';
import { BrandMark } from '@/components/brand/BrandMark';
import { ArrowUpRight, Mail } from 'lucide-react';
import { stackBrands } from '@/features/skills/stack-brands';
import { SectionButton } from '@/components/navigation/SectionButton';
import styles from './SiteFooter.module.css';

export function SiteFooter() {
  return (
    <footer className={styles.footer} aria-labelledby="footer-heading">
      <div className={styles.surface}>
        <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-7 xl:pb-4 lg:px-10">
          <div className={styles.pattern} aria-hidden="true"><span /><span /><span /><span /></div>
          <div className={styles.inner}>
            <div className={styles.invitation}>
              <p className={styles.eyebrow}>Have something worth building?</p>
              <h2 id="footer-heading">Let’s make it <span className="gradient-text">work beautifully.</span></h2>
              <p className={styles.description}>Thoughtful interfaces. Dependable workflows. Practical product engineering.</p>
              <a className={styles.contact} href="mailto:denngodfirst@gmail.com"><Mail size={17} aria-hidden="true" /> denngodfirst@gmail.com <ArrowUpRight size={17} aria-hidden="true" /></a>
            </div>
            <div className={styles.links}>
              <nav aria-label="Footer navigation"><p className={styles.label}>Explore</p>
                <SectionButton target="bio">About Dennis</SectionButton>
                <SectionButton target="skills">Capabilities</SectionButton>
                <Link href="/projects">Portfolio</Link>
                <Link href="/services">Services</Link>
                <Link href="/website-development">Website development in Nigeria</Link>
                <Link href="/remote-website-development">Remote website development</Link>
                <Link href="/contact">Contact Dennis</Link>
                <DenokTrigger>Ask Denok</DenokTrigger>
              </nav>
              <div><p className={styles.label}>Connect</p>
                <a href="https://github.com/devkiddz" target="_blank" rel="noopener noreferrer"><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={stackBrands.GitHub.path} /></svg> GitHub <ArrowUpRight size={14} aria-hidden="true" /></a>
                <a href="mailto:denngodfirst@gmail.com"><Mail size={15} aria-hidden="true" /> Email Dennis <ArrowUpRight size={14} aria-hidden="true" /></a>
              </div>
            </div>
          </div>
          <div className={styles.bottom}>
            <div className={styles.identity}><Link href="/#home" aria-label="Dennis O. Jones home" className={styles.brandLink}><BrandMark /></Link><div><p className={styles.name}>Dennis Okaro Jones</p><p className={styles.position}>Software Developer</p></div></div>
            <p className={styles.principles}>Build <span aria-hidden="true">·</span> Harden <span aria-hidden="true">·</span> Improve</p>
            <p className={styles.copyright}>© {new Date().getFullYear()} Dennis O. Jones</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
