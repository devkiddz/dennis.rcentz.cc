import { SectionNavigator } from '@/components/navigation/SectionNavigator';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { Bio } from '@/features/bio/Bio';
import { Hero } from '@/features/hero/Hero';
import { Experience } from '@/features/experience/Experience';
import { Skills } from '@/features/skills/Skills';

export default function HomePage() {
  return (
    <main>
      <SiteHeader />
      <Hero />
      <Bio />
      <Skills />
      <Experience />
      <SectionNavigator />
    </main>
  );
}
