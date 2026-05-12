import React from 'react';
import ProductCard from './ui/ProductCard';

const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'قماش كتان بلجيكي فاخر',
    category: 'أقمشة طبيعية',
    price: '2,400 دج',
    unit: 'متر',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop',
    badges: ['GOTS', 'PREMIUM'] as any,
    composition: [{ name: 'كتان', percentage: 100 }],
    isNew: true
  },
  {
    id: '2',
    name: 'حرير ساتان لامع - مجموعة ربيع',
    category: 'أقمشة فاخرة',
    price: '4,500 دج',
    unit: 'متر',
    image: 'https://images.unsplash.com/photo-1584290867415-527a8475726d?q=80&w=800&auto=format&fit=crop',
    badges: ['PREMIUM'] as any,
    composition: [{ name: 'حرير', percentage: 95 }, { name: 'ليكرا', percentage: 5 }]
  },
  {
    id: '3',
    name: 'قماش صوف إنجليزي للبدلات',
    category: 'ألياف طبيعية',
    price: '8,900 دج',
    unit: 'متر',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop',
    badges: ['OEKO-TEX'] as any,
    composition: [{ name: 'صوف', percentage: 100 }]
  },
  {
    id: '4',
    name: 'بوليستر تقني مقاوم للماء',
    category: 'ألياف اصطناعية',
    price: '1,200 دج',
    unit: 'متر',
    image: 'https://images.unsplash.com/photo-1574634534894-89d7576c8259?q=80&w=800&auto=format&fit=crop',
    badges: ['ISO', 'VERIFIED'] as any,
    composition: [{ name: 'بوليستر', percentage: 100 }]
  }
];

const ProductGrid = () => {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
        <div className="flex flex-col gap-2">
          <span className="text-label text-gold">المجموعة المختارة</span>
          <h2 className="text-headline mb-0">أحدث الخامات المتوفرة</h2>
        </div>
        <button className="text-label text-burgundy hover:text-gold border-b border-burgundy hover:border-gold pb-1 transition-all">
          عرض الكتالوج الكامل
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {MOCK_PRODUCTS.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
