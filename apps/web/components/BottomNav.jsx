'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Grid3X3, ShoppingCart, Heart, User } from 'lucide-react';

const navItems = [
  { href: '/', icon: Home, label: 'الرئيسية' },
  { href: '/categories', icon: Grid3X3, label: 'الأقسام' },
  { href: '/cart', icon: ShoppingCart, label: 'السلة', badge: true },
  { href: '/wishlist', icon: Heart, label: 'المفضلات' },
  { href: '/account', icon: User, label: 'حسابي' },
];

export default function BottomNav() {
  const pathname = usePathname();
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t safe-area-pb md:hidden shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <div className="flex justify-around items-center h-16">
        {navItems.map(item => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-4 py-2 transition-colors
                ${isActive ? 'text-burgundy' : 'text-gray-500 hover:text-burgundy/70'}`}
            >
              <div className="relative">
                <Icon className="w-6 h-6" />
                {item.badge && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gold 
                                   text-[10px] text-white font-bold rounded-full flex items-center justify-center
                                   border-2 border-white shadow-sm">
                    3
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
