import { Cairo } from 'next/font/google';
import './globals.css';
import dynamic from 'next/dynamic';

const Header = dynamic(() => import('../components/Header'), { ssr: false });
const BottomNav = dynamic(() => import('../components/BottomNav'), { ssr: false });

const cairo = Cairo({ subsets: ['arabic', 'latin'] });

export const metadata = {
  title: {
    default: 'خامة - منصة الصناعات النسيجية والجلود',
    template: '%s | خامة'
  },
  description: 'سوق متكامل للأقمشة، الجلود، والآلات الصناعية في الجزائر. ابحث عن موردين، قارن الأقمشة، وانشر طلبات الشراء.',
  keywords: ['تنسوجات', 'أقمشة', 'خامة', 'B2B', 'sourcing textile', 'Algeria', 'GOTS', 'OEKO-TEX', 'قماش احترافي', 'موردو المنسوجات'],
  authors: [{ name: 'Khama Team' }],
  creator: 'Khama',
  publisher: 'Khama',
  openGraph: {
    type: 'website',
    locale: 'ar_DZ',
    url: 'https://khama.dz',
    siteName: 'خامة - Khama',
    images: [
      {
        url: 'https://khama.dz/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Khama Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'خامة - منصة الصناعات النسيجية والجلود',
    description: 'سوق متكامل للأقمشة، الجلود، والآلات الصناعية في الجزائر',
    images: ['https://khama.dz/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { I18nProvider } from '../components/I18nProvider';

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={cairo.className}>
        <I18nProvider>
          <Header />
          <main className="min-h-screen bg-gray-50 pt-32 pb-20">
            {children}
          </main>
          <BottomNav />
        </I18nProvider>
      </body>
    </html>
  );
}
