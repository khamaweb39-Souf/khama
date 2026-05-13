import Link from 'next/link';

const categories = [
  { icon: '🧵', label: 'أقمشة', href: '/fabrics', color: 'text-gold' },
  { icon: '👜', label: 'جلود', href: '/fabrics', color: 'text-copper' },
  { icon: '⚙️', label: 'آلات', href: '/categories', color: 'text-navy' },
  { icon: '📐', label: 'باترونات', href: '/fabrics', color: 'text-emerald' },
  { icon: '🎓', label: 'أكاديمية', href: '/academy', color: 'text-burgundy' },
  { icon: '💼', label: 'وظائف', href: '/dashboard/buyer', color: 'text-navy' },
  { icon: '🏭', label: 'مصانع', href: '/suppliers', color: 'text-gold' },
  { icon: '🛍️', label: 'تجزئة', href: '/fabrics', color: 'text-copper' },
];

export default function QuickCategories() {
  return (
    <section className="px-6 py-12 bg-cream/50">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-xl font-black mb-10 text-navy border-r-4 border-gold pr-4">الأقسام السريعة</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6">
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              href={cat.href}
              className="group flex flex-col items-center gap-4"
            >
              <div className={`w-20 h-20 rounded-3xl glass-card flex items-center justify-center text-4xl shadow-silk 
                               group-hover:shadow-gold-glow group-hover:-translate-y-2 transition-all duration-500`}>
                <span className={cat.color}>{cat.icon}</span>
              </div>
              <span className="text-xs font-black text-navy/60 group-hover:text-gold transition-colors uppercase tracking-widest">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
