import { StructuredData } from '@/components/seo/StructuredData';
import { pageMetadata, personSchema, websiteSchema, webPageSchema, breadcrumbs } from '@/lib/seo';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SectionNavigator } from '@/components/navigation/SectionNavigator';
import { TechTape } from '@/features/skills/TechTape';
import { ProjectCard } from '@/features/portfolio/ProjectCard';
import { projects } from '@/features/portfolio/projects';
import styles from '@/features/portfolio/Portfolio.module.css';

export const metadata = pageMetadata('/projects', "Software Development Portfolio", "Explore Dennis O. Jones\u2019s work on Waffi Market, JobRcentz, React interface systems and fintech contributions, with live demos and GitHub repositories.", 'portfolio');

export default function PortfolioPage() {
  return <><StructuredData data={{ '@context': 'https://schema.org', '@graph': [personSchema, websiteSchema, webPageSchema('/projects', 'Software Development Portfolio', 'CollectionPage'), breadcrumbs('/projects', 'Portfolio'), { '@type': 'ItemList', name: 'Selected software development work', itemListElement: projects.map((project,index) => ({ '@type': 'ListItem', position: index + 1, name: project.name, url: `https://dennis.rcentz.cc/projects#${project.slug}` })) }] }} /><SiteHeader /><main id="main-content" tabIndex={-1} className={styles.section}>
    <div className="mx-auto max-w-7xl px-4 pt-44 pb-20 sm:px-7 sm:pt-48 lg:px-10">
      <header className={styles.pageHeading}><p className={styles.eyebrow}>Portfolio / Selected work</p><h1>Products, interfaces<br />and <span className="gradient-text">practical systems.</span></h1><p>A selection of independent development work and contributions to existing platforms, with the responsibilities and technologies behind each project.</p></header>
      <div className={styles.grid}>{projects.map(project => <ProjectCard key={project.slug} project={project} />)}</div>
    </div>
  </main><TechTape /><SiteFooter /><SectionNavigator showMarkers={false} /></>;
}
