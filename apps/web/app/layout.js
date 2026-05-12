import { Cairo } from 'next/font/google';
import './globals.css';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';

const cairo = Cairo({ subsets: ['arabic', 'latin'] });

export const metadata = {
  title: 'خامة - منصة الصناعات النسيجية والجلود',
  description: 'سوق متكامل للأقمشة، الجلود، والآلات الصناعية في الجزائر',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={cairo.className}>
        <Header />
        <main className="min-h-screen bg-gray-50 pb-20">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
