import { ServiceExplorer } from './ServiceExplorer';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import styles from './Services.module.css';
export function ServicesIntro() {
  return <section id="services" data-section="services" aria-labelledby="services-heading" className={styles.section}><div className={styles.container}>
    <header className={styles.heading}><p className={styles.eyebrow}>What I can build for you</p><h2 id="services-heading" className={styles.title}>Your business.<br /><span className="gradient-text">Built for the digital world.</span></h2><p className={styles.description}>I build business websites, web applications and mobile apps — from a professional online presence to the systems your customers and team use every day.</p></header>
    <ServiceExplorer />
    <div className={styles.actions}><Link href="/services" className={styles.button}>View all services <ArrowUpRight size={16} aria-hidden="true" /></Link><Link href="/contact" className={styles.button}>Discuss your project</Link><Link href="/website-development" className={styles.button}>Website development in Nigeria</Link><Link href="/remote-website-development" className={styles.button}>Remote development</Link></div>
  </div></section>;
}
