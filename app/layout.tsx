import type { Metadata } from 'next';

import { ThemeProvider } from '@/components/providers/ThemeProvider';

import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://dennis.rcentz.cc'),

  title: {
    default: 'Dennis O. Jones — Frontend & Product Engineer',
    template: '%s | Dennis O. Jones'
  },

  description:
    'Dennis O. Jones is a Frontend & Product Engineer building modern digital products with React, Next.js, TypeScript and practical full-stack architecture.',

  openGraph: {
    title: 'Dennis O. Jones — Frontend & Product Engineer',
    description: 'Product engineering, frontend systems and practical full-stack development.',
    url: 'https://dennis.rcentz.cc',
    siteName: 'Dennis O. Jones',
    type: 'website'
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background font-sans text-foreground antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
