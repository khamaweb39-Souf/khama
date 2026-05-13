'use client';

import React from 'react';
import FilterSidebar from '@/components/FilterSidebar';
import ProductGrid from '@/components/ProductGrid';

export default function FabricsCataloguePage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20" dir="rtl">
      <div className="max-w-7xl mx-auto px-4">
        <header className="mb-12">
           <h1 className="text-4xl font-black text-charcoal">كتالوج الأقمشة الاحترافي</h1>
           <p className="text-muted mt-2">استعرض آلاف الأقمشة من أفضل الموردين المعتمدين.</p>
        </header>

        <div className="flex flex-col lg:flex-row gap-10">
          <aside className="hidden lg:block w-[300px] shrink-0">
             <FilterSidebar />
          </aside>
          <main className="flex-1">
             <ProductGrid />
          </main>
        </div>
      </div>
    </div>
  );
}
