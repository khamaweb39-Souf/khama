'use client';

import React from 'react';
import { Shirt, Scissors, HardHat, Cog, Package } from 'lucide-react';
import Link from 'next/link';

const CATEGORIES = [
  { id: 'fabrics', name: 'أقمشة ملابس', icon: Shirt, count: 1240, image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=400&auto=format&fit=crop' },
  { id: 'leather', name: 'جلود طبيعية', icon: Scissors, count: 450, image: 'https://images.unsplash.com/photo-1558444479-c8af50e90c58?q=80&w=400&auto=format&fit=crop' },
  { id: 'machinery', name: 'آلات ومعدات', icon: Cog, count: 180, image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=400&auto=format&fit=crop' },
  { id: 'workwear', name: 'ملابس مهنية', icon: HardHat, count: 320, image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=400&auto=format&fit=crop' },
];

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20" dir="rtl">
      <div className="max-w-7xl mx-auto px-4">
        <header className="mb-12">
           <h1 className="text-4xl font-black text-charcoal">الأقسام والقطاعات</h1>
           <p className="text-muted mt-2">تصفح المنتجات حسب التخصص الصناعي.</p>
        </header>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
           {CATEGORIES.map(cat => (
             <Link 
               key={cat.id} 
               href={`/categories/${cat.id}`}
               className="group bg-white rounded-3xl overflow-hidden border border-border hover:shadow-xl transition-all"
             >
                <div className="h-40 relative">
                   <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                   <div className="absolute inset-0 bg-burgundy/20 group-hover:bg-burgundy/40 transition-colors" />
                   <div className="absolute inset-0 flex items-center justify-center">
                      <cat.icon className="w-12 h-12 text-white" />
                   </div>
                </div>
                <div className="p-4 text-center">
                   <h3 className="font-bold text-charcoal group-hover:text-burgundy transition-colors">{cat.name}</h3>
                   <p className="text-[10px] font-black text-muted uppercase mt-1">{cat.count} منتج</p>
                </div>
             </Link>
           ))}
        </div>
      </div>
    </div>
  );
}
