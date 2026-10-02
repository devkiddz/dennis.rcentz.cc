import type { Metadata } from 'next';
export const siteUrl = 'https://dennis.rcentz.cc';
export const siteName = 'Dennis Okaro Jones';
export const previewDeployment = Boolean(process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production');
export function pageMetadata(path: string, title: string, description: string, image: string): Metadata {
  return { title, description, alternates: { canonical: path }, openGraph: { type: 'website', locale: 'en_NG', url: path, siteName, title, description, images: [{ url: `/images/seo/${image}.png`, width: 1200, height: 630, alt: `${title} — Dennis Okaro Jones` }] }, twitter: { card: 'summary_large_image', title, description, images: [`/images/seo/${image}.png`] } };
}
export const personSchema = {
  '@type': 'Person', '@id': `${siteUrl}/#dennis`, name: siteName, alternateName: 'Dennis O. Jones', url: siteUrl, jobTitle: 'Software Developer', email: 'mailto:dennis@rcentz.cc', sameAs: ['https://github.com/devkiddz'], knowsAbout: ['Frontend engineering', 'React', 'Next.js', 'TypeScript', 'Web application development', 'Business systems', 'Prisma', 'PostgreSQL']
};
export const websiteSchema = { '@type': 'WebSite', '@id': `${siteUrl}/#website`, url: siteUrl, name: `${siteName} — Software Developer`, inLanguage: 'en', publisher: { '@id': personSchema['@id'] } };
export function webPageSchema(path: string, name: string, type = 'WebPage') {
  return { '@type': type, '@id': `${siteUrl}${path}#page`, url: `${siteUrl}${path}`, name, isPartOf: { '@id': websiteSchema['@id'] }, about: { '@id': personSchema['@id'] }, inLanguage: 'en' };
}
export function breadcrumbs(path: string, name: string) {
  return { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl }, { '@type': 'ListItem', position: 2, name, item: `${siteUrl}${path}` }] };
}
