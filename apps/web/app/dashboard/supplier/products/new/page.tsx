'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Package, ArrowRight } from 'lucide-react';
import AddProductWizard from '@/components/supplier/AddProductWizard';

export default function NewProductPage() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-1000 text-right" dir="rtl">
      
      {/* ─── Page Header & Breadcrumbs ─── */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <nav className="flex items-center gap-3 text-[10px] text-white/30 font-black uppercase tracking-[0.2em] mb-4">
            <Link href="/dashboard/supplier" className="hover:text-gold transition-colors">Dashboard</Link>
            <ChevronRight className="w-3 h-3 rotate-180" />
            <Link href="/dashboard/supplier/products" className="hover:text-gold transition-colors">Inventory</Link>
            <ChevronRight className="w-3 h-3 rotate-180" />
            <span className="text-gold">Add Fabric</span>
          </nav>
          <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-4">
             <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center text-gold">
                <Package className="w-6 h-6" />
             </div>
             إضافة منتج نسيجي جديد
          </h1>
          <p className="text-white/40 text-sm font-medium">أكمل الخطوات التالية لإدراج قماشك في سوق خامة العالمي</p>
        </div>
        
        <div className="flex gap-3">
           <button className="px-6 py-3 bg-white/5 text-white/60 text-[10px] font-black uppercase tracking-widest rounded-xl border border-white/5 hover:bg-white/10 transition-all">
              Drafts (2)
           </button>
        </div>
      </header>

      {/* ─── Wizard Component ─── */}
      <section className="bg-[#1A1917] rounded-[3rem] border border-white/5 p-8 md:p-12 shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
         <AddProductWizard />
      </section>

      {/* ─── Footer Support ─── */}
      <footer className="p-8 bg-gold/5 border border-gold/10 rounded-[2.5rem] flex flex-col md:flex-row justify-between items-center gap-6">
         <p className="text-xs text-white/40 font-medium">هل تحتاج للمساعدة؟ تواصل مع خبير تصنيف الأقمشة لدينا.</p>
         <button className="flex items-center gap-2 text-gold text-xs font-black uppercase tracking-widest group">
            اتصل بالدعم <ArrowRight className="w-4 h-4 group-hover:translate-x-[-4px] transition-transform" />
         </button>
      </footer>

    </div>
  );
}
