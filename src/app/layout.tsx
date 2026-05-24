import type { Metadata, Viewport } from 'next';
import { Analytics } from "@vercel/analytics/next"
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#10b981',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: 'جاري | صدقة جارية وأذكار',
    template: '%s | جاري'
  },
  description: 'تطبيق جاري للأذكار والمسبحة، صدقة جارية تحتوي على أذكار الصباح والمساء ومسبحة إلكترونية بتصميم مريح للعين.',
  keywords: ['أذكار', 'صدقة جارية', 'أذكار الصباح', 'أذكار المساء', 'مسبحة إلكترونية', 'تسبيح', 'إسلام', 'دعاء'],
  authors: [{ name: 'فاعل خير' }],
  creator: 'فاعل خير',
  publisher: 'جاري',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    url: 'https://jari-app.vercel.app', // Update with actual domain later
    siteName: 'جاري',
    title: 'جاري | صدقة جارية وأذكار',
    description: 'تطبيق جاري للأذكار والمسبحة، صدقة جارية تحتوي على أذكار الصباح والمساء ومسبحة إلكترونية بتصميم مريح للعين.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'جاري | صدقة جارية وأذكار',
    description: 'تطبيق جاري للأذكار والمسبحة، صدقة جارية.',
  },
};

import ThemeHeader from '../components/ThemeHeader';
import ClientProvider from '../components/ClientProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="ar" dir="rtl" suppressHydrationWarning>
        <body>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              (function() {
                try {
                  var savedTheme = localStorage.getItem('theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch (e) {}
              })();
            `,
            }}
          />
          <ClientProvider>
            <div className="container">
              <ThemeHeader />
              <main className="main-content">
                {children}
              </main>
            </div>
          </ClientProvider>
        </body>
      </html>
      <Analytics />
    </>
  );
}
