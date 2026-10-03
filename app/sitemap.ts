import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/seo';
export default function sitemap(): MetadataRoute.Sitemap {
  return ['', '/services', '/website-development', '/remote-website-development', '/projects', '/contact'].map(path => ({ url: `${siteUrl}${path}` }));
}
