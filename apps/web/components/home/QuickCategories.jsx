'use client';

import Link from 'next/link';

const categories = [
  { icon: '🧵', label: 'أقمشة', href: '/categories/fabrics', color: 'bg-gold/10 text-gold' },
  { icon: '👜', label: 'جلود', href: '/categories/leather', color: 'bg-gold/10 text-gold' },
  { icon: '⚙️', label: 'آلات', href: '/categories/machinery', color: 'bg-gold/10 text-gold' },
  { icon: '📐', label: 'باترونات', href: '/categories/fabrics', color: 'bg-gold/10 text-gold' },
  { icon: '🎓', label: 'أكاديمية', href: '/academy', color: 'bg-gold/10 text-gold' },
  { icon: '💼', label: 'وظائف', href: '/dashboard', color: 'bg-gold/10 text-gold' },
  { icon: '🏭', label: 'مصانع', href: '/suppliers', color: 'bg-gold/10 text-gold' },
  { icon: '🛍️', label: 'تجزئة', href: '/fabrics', color: 'bg-gold/10 text-gold' },
];

export default function QuickCategories() {
  return (
    <section className="px-4 py-12 bg-charcoal border-b border-white/5 relative overflow-hidden">
      {/* Subtle Gradient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-30" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex items-center gap-4 mb-8">
           <h3 className="text-xs font-black text-gold uppercase tracking-[0.2em]">الأقسام السريعة</h3>
           <div className="h-px bg-white/10 flex-1" />
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-8 gap-6 md:gap-8">
          {categories.map(cat => (
            <Link
              key={cat.href}
              href={cat.href}
              className="group flex flex-col items-center gap-3"
            >
              <div className={`w-14 h-14 sm:w-20 sm:h-20 rounded-3xl ${cat.color} 
                               flex items-center justify-center text-3xl shadow-2xl border border-white/5
                               group-hover:border-gold/30 group-hover:-translate-y-2 transition-all duration-500`}>
                <span className="filter grayscale group-hover:grayscale-0 transition-all duration-500">{cat.icon}</span>
              </div>
              <span className="text-[10px] sm:text-[11px] font-black text-ecru/40 group-hover:text-gold uppercase tracking-widest transition-all">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
