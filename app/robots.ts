import type { MetadataRoute } from 'next';
import { previewDeployment, siteUrl } from '@/lib/seo';
export default function robots(): MetadataRoute.Robots {
  return { rules: previewDeployment ? { userAgent: '*', disallow: '/' } : { userAgent: '*', allow: '/', disallow: '/api/' }, sitemap: `${siteUrl}/sitemap.xml` };
}
