import { StructuredData } from '@/components/seo/StructuredData';
import { pageMetadata, personSchema, websiteSchema, webPageSchema } from '@/lib/seo';
import { ServicesIntro } from '@/features/services/ServicesIntro';
import { SelectedProjects } from '@/features/portfolio/SelectedProjects';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { TechTape } from '@/features/skills/TechTape';
import { SectionNavigator } from '@/components/navigation/SectionNavigator';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { Bio } from '@/features/bio/Bio';
import { Hero } from '@/features/hero/Hero';
import { Experience } from '@/features/experience/Experience';
import { Skills } from '@/features/skills/Skills';

export const metadata = pageMetadata('/', 'Dennis Okaro Jones — Software Developer & Product Engineer', 'Meet Dennis Okaro Jones: software developer building business websites, React and Next.js applications, marketplaces and database-backed product systems.', 'home');

export default function HomePage() {
  return (
    <>
      <StructuredData data={{ '@context': 'https://schema.org', '@graph': [personSchema, websiteSchema, { ...webPageSchema('/', 'Dennis Okaro Jones — Software Developer', 'ProfilePage'), mainEntity: { '@id': personSchema['@id'] } }] }} />
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
      <Hero />
      <Bio />
      <ServicesIntro />
      <Skills />
      <Experience />
      <SelectedProjects />
      <TechTape />
      </main>
      <SiteFooter />
      <SectionNavigator />
    </>
  );
}
