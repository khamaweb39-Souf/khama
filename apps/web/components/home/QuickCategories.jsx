import Link from 'next/link';

const categories = [
  { icon: '🧵', label: 'أقمشة', href: '/categories/fabrics', color: 'bg-blue-50 text-blue-600' },
  { icon: '👜', label: 'جلود', href: '/categories/leather', color: 'bg-orange-50 text-orange-600' },
  { icon: '⚙️', label: 'آلات', href: '/categories/machines', color: 'bg-gray-50 text-gray-600' },
  { icon: '📐', label: 'باترونات', href: '/categories/patterns', color: 'bg-purple-50 text-purple-600' },
  { icon: '🎓', label: 'أكاديمية', href: '/academy', color: 'bg-green-50 text-green-600' },
  { icon: '💼', label: 'وظائف', href: '/jobs', color: 'bg-indigo-50 text-indigo-600' },
  { icon: '🏭', label: 'مصانع', href: '/factories', color: 'bg-amber-50 text-amber-600' },
  { icon: '🛍️', label: 'تجزئة', href: '/retail', color: 'bg-rose-50 text-rose-600' },
];

export default function QuickCategories() {
  return (
    <section className="px-4 py-8 bg-white border-b">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-lg font-bold mb-6 text-gray-800 pr-2 border-r-4 border-gold">الأقسام السريعة</h3>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-4">
          {categories.map(cat => (
            <Link
              key={cat.href}
              href={cat.href}
              className="group flex flex-col items-center gap-2"
            >
              <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl ${cat.color} 
                               flex items-center justify-center text-3xl shadow-sm 
                               group-hover:shadow-md group-hover:-translate-y-1 transition-all duration-300`}>
                {cat.icon}
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-gray-600 group-hover:text-burgundy transition-colors">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
