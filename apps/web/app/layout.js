import { Cairo } from 'next/font/google';
import './globals.css';
import dynamic from 'next/dynamic';

const Header = dynamic(() => import('../components/Header'), { ssr: false });
const BottomNav = dynamic(() => import('../components/BottomNav'), { ssr: false });

const cairo = Cairo({ subsets: ['arabic', 'latin'] });

export const metadata = {
  title: 'خامة - منصة الصناعات النسيجية والجلود',
  description: 'سوق متكامل للأقمشة، الجلود، والآلات الصناعية في الجزائر',
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
