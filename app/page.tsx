import { SiteHeader } from '@/components/layout/SiteHeader';
import { Hero } from '@/features/hero/Hero';
import { Skills } from '@/features/skills/Skills';

export default function HomePage() {
  return (
    <main>
      <SiteHeader />
      <Hero />
      <Skills />
    </main>
  );
}
