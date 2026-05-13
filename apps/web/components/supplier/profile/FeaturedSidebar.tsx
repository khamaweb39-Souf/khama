'use client';

import React from 'react';
import { ShoppingBag, ChevronLeft, ArrowLeft } from 'lucide-react';
import FabricCard from '@/components/FabricCard';

export default function FeaturedSidebar() {
  const bestSellers = [
    { id: 'b1', title: 'حرير ليون الفاخر', price: 32.00, category: 'حرير', image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=400&auto=format&fit=crop' },
    { id: 'b2', title: 'كتان هولندي خام', price: 21.50, category: 'كتان', image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=400&auto=format&fit=crop' },
    { id: 'b3', title: 'صوف ميرينو ملكي', price: 55.00, category: 'صوف', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=400&auto=format&fit=crop' },
  ];

  return (
    <div className="sticky top-32 space-y-8" dir="rtl">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-charcoal flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-accent" />
            الأكثر مبيعاً
          </h3>
          <span className="w-8 h-px bg-border" />
        </div>
        
        <div className="space-y-6">
          {bestSellers.map((product) => (
            <div key={product.id} className="transform hover:scale-[1.02] transition-transform duration-300">
              <FabricCard {...product} />
            </div>
          ))}
        </div>
      </div>

      <button className="w-full bg-ecru/30 text-charcoal py-4 rounded-2xl text-xs font-bold border-2 border-ecru hover:bg-accent hover:text-white hover:border-accent transition-all flex items-center justify-center gap-2 group">
        مشاهدة الكتالوج الكامل
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
      </button>

      <div className="p-6 bg-charcoal rounded-3xl text-white space-y-4">
         <p className="text-xs font-bold text-gold uppercase tracking-widest">تنبيه المجموعات</p>
         <h4 className="text-lg font-bold leading-tight">اشترك لتصلك أحدث تصاميمنا الحصرية.</h4>
         <div className="flex gap-2">
            <input type="email" placeholder="بريدك..." className="flex-1 bg-white/10 border-none rounded-xl px-3 py-2 text-xs outline-none" />
            <button className="bg-gold text-charcoal p-2 rounded-xl"><ChevronLeft className="w-4 h-4" /></button>
         </div>
      </div>
    </div>
  );
}
