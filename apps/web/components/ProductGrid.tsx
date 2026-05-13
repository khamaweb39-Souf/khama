import React from 'react';
import FabricCard from './FabricCard';
import { FabricCardProps } from '../types/fabric';
import { MOCK_PRODUCTS } from '../data/mockDatabase';

const MOCK_FABRICS = MOCK_PRODUCTS.filter(p => p.category === 'fabrics');

const ProductGrid = () => {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4 text-right" dir="rtl">
        <div className="flex flex-col gap-2">
          <span className="text-label text-gold">المجموعة المختارة</span>
          <h2 className="text-headline mb-0">أحدث الخامات التقنية</h2>
        </div>
        <button className="text-label text-burgundy hover:text-gold border-b border-burgundy hover:border-gold pb-1 transition-all">
          عرض الكتالوج الكامل
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 horizontal-scroll-mobile">
        {MOCK_FABRICS.map((fabric) => (
          <div key={fabric.id} className="min-w-[85vw] sm:min-w-0 snap-center">
            <FabricCard {...fabric} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
