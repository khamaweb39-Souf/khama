'use client';

import React, { useState } from 'react';
import { 
  BarChart2, Trash2, ArrowUpRight, 
  Search, Filter, Plus, Zap, 
  CheckCircle2, X, AlertCircle, 
  LayoutGrid, List, ShieldCheck, ShoppingBag
} from 'lucide-react';

export default function BuyerComparePage() {
  const [activeTab, setActiveTab] = useState('saved');

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-1000 text-right" dir="rtl">
      
      {/* Header */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
         <div className="space-y-1">
            <h1 className="text-3xl font-black text-white tracking-tight">أداة مقارنة الأقمشة</h1>
            <p className="text-white/40 font-medium">قارن المواصفات التقنية والأسعار بين عيناتك المختارة بدقة عالية.</p>
         </div>
         <div className="flex gap-3">
            <button className="px-8 py-3 bg-gold text-charcoal text-[11px] font-black uppercase tracking-widest rounded-xl shadow-xl shadow-gold/20 hover:scale-105 transition-all flex items-center gap-3">
               <Plus className="w-4 h-4" /> مقارنة جديدة
            </button>
         </div>
      </header>

      {/* Main Content Area */}
      <div className="bg-[#1A1917] rounded-[3rem] border border-white/5 overflow-hidden min-h-[60vh] flex flex-col items-center justify-center text-center p-12 space-y-8 relative">
         {/* Aesthetic background accent */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold/5 rounded-full blur-[100px] pointer-events-none" />
         
         <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center text-white/20">
            <BarChart2 className="w-12 h-12" />
         </div>
         
         <div className="space-y-3 max-w-md relative z-10">
            <h2 className="text-2xl font-black text-white">لا توجد مقارنات نشطة حالياً</h2>
            <p className="text-sm text-white/40 leading-relaxed">استخدم أداة "الإضافة للمقارنة" أثناء تصفح الكتالوج لعرض الأقمشة جنباً إلى جنب هنا وتحليل الفروقات التقنية.</p>
         </div>

         <div className="flex gap-4 relative z-10">
            <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-xs font-black text-white uppercase tracking-widest hover:bg-white/10 transition-all">تصفح الكتالوج</button>
            <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-xs font-black text-white/40 uppercase tracking-widest cursor-not-allowed">عرض المقارنات المحفوظة</button>
         </div>
      </div>

    </div>
  );
}
