import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { ProjectCard } from './ProjectCard';
import { projects } from './projects';
import styles from './Portfolio.module.css';

export function SelectedProjects() {
  return <section id="projects" data-section="projects" aria-labelledby="selected-projects-heading" className={styles.section}>
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-7 lg:px-10">
      <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>04 / Selected work</p><h2 id="selected-projects-heading" className="mt-4 font-heading text-3xl font-bold tracking-tight sm:text-4xl">A few products I’m building.</h2></div><Link href="/projects" className={styles.viewAll}>View full portfolio <ArrowUpRight size={16} aria-hidden="true" /></Link></div>
      <div className={styles.selectedGrid}>{projects.slice(0, 3).map(project => <ProjectCard key={project.slug} project={project} compact />)}</div>
    </div>
  </section>;
}
