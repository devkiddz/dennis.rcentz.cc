import Script from 'next/script';
import type { Metadata } from 'next';
import { siteUrl, previewDeployment } from '@/lib/seo';

import { DenokWidget } from '@/features/denok/DenokWidget';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

import './globals.css';
import './polish.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Dennis Okaro Jones — Software Developer', template: '%s | Dennis O. Jones' },
  description: 'Dennis Okaro Jones builds business websites, web applications and practical product systems with React, Next.js and TypeScript.',
  applicationName: 'Dennis Okaro Jones Portfolio',
  authors: [{ name: 'Dennis Okaro Jones', url: siteUrl }],
  creator: 'Dennis Okaro Jones',
  robots: previewDeployment ? { index: false, follow: false } : { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
  verification: process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : undefined
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background font-sans text-foreground antialiased">
        <Script src="/rcentz-analytics.js" strategy="afterInteractive" data-collector="https://systems.rcentz.cc" data-site="https://dennis.rcentz.cc" />
        <ThemeProvider><a href="#main-content" className="skip-link">Skip to content</a>{children}<DenokWidget /></ThemeProvider>
      </body>
    </html>
  );
}
