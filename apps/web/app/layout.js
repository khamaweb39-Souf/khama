import { Cairo } from 'next/font/google';
import './globals.css';
import nextDynamic from 'next/dynamic';

const Header = nextDynamic(() => import('../components/Header'), { ssr: false });
const BottomNav = nextDynamic(() => import('../components/BottomNav'), { ssr: false });
const Footer = nextDynamic(() => import('../components/Footer'), { ssr: false });

const cairo = Cairo({ subsets: ['arabic', 'latin'] });

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'خامة - منصة الصناعات النسيجية والجلود',
  description: 'سوق متكامل للأقمشة، الجلود، والآلات الصناعية في الجزائر',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={cairo.className}>
        <Header />
        <main className="min-h-screen bg-gray-50 pt-32">
          {children}
        </main>
        <Footer />
        <BottomNav />
      </body>
    </html>
  );
}
