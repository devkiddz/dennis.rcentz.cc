import { StructuredData } from '@/components/seo/StructuredData';
import { pageMetadata, personSchema, websiteSchema, webPageSchema, breadcrumbs } from '@/lib/seo';
import { Mail } from 'lucide-react';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SectionNavigator } from '@/components/navigation/SectionNavigator';
import { ContactForm } from '@/features/contact/ContactForm';
import styles from '@/features/contact/Contact.module.css';
export const metadata = pageMetadata('/contact', "Contact Dennis \u2014 Projects & Engineering Roles", "Contact Dennis Okaro Jones about website development, application projects, software engineering roles and professional collaboration.", 'contact');
export default function ContactPage() {
  return <><StructuredData data={{ '@context': 'https://schema.org', '@graph': [personSchema, websiteSchema, webPageSchema('/contact', 'Contact Dennis — Projects & Engineering Roles', 'ContactPage'), breadcrumbs('/contact', 'Contact')] }} /><SiteHeader /><main id="main-content" tabIndex={-1} className={styles.page}><div className="mx-auto max-w-7xl px-4 pt-44 pb-20 sm:px-7 sm:pt-48 lg:px-10"><div className={styles.layout}><header className={styles.intro}><p className={styles.eyebrow}>Contact / Dennis Okaro Jones</p><h1>Let’s start<br /><span className="gradient-text">a conversation.</span></h1><p className={styles.description}>Have a role, a product challenge or something worth building? Share the context and what you have in mind.</p><a className={styles.direct} href="mailto:dennis@rcentz.cc"><Mail size={18} aria-hidden="true" /> dennis@rcentz.cc</a><p className={styles.topics}>Frontend &amp; product engineering<br />Websites, web &amp; mobile applications<br />Professional opportunities &amp; collaboration</p></header><ContactForm /></div></div></main><SiteFooter /><SectionNavigator showMarkers={false} /></>;
}
