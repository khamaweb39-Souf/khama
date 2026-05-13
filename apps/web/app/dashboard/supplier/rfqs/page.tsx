'use client';

import React, { useState } from 'react';
import { 
  Search, Filter, Clock, MapPin, 
  ArrowUpRight, MessageSquare, ChevronRight,
  ShieldCheck, Zap, Download, Info
} from 'lucide-react';

const RFQS = [
  { id: 'RFQ-8821', title: 'توريد قماش بوليستر للزي المدرسي', buyer: 'وزارة التربية والتعليم', quantity: '5000 متر', location: 'الجزائر العاصمة', budget: 'مفتوح', deadline: '3 أيام', category: 'ألياف اصطناعية' },
  { id: 'RFQ-8815', title: 'كتان عضوي 180 GSM لمجموعة صيفية', buyer: 'بوتيك الأناقة', quantity: '200 متر', location: 'وهران', budget: '12-15 €/م', deadline: '5 أيام', category: 'ألياف طبيعية' },
  { id: 'RFQ-8809', title: 'صوف جزائري عالي الجودة للمعاطف', buyer: 'مصنع الألبسة الشتوية', quantity: '1000 متر', location: 'قسنطينة', budget: 'تنافسي', deadline: '24 ساعة', category: 'ألياف طبيعية' },
];

export default function SupplierRFQsPage() {
  
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
         <div className="space-y-1">
            <h1 className="text-3xl font-black text-charcoal">فرص المناقصات (RFQs)</h1>
            <p className="text-muted font-medium">اكتشف أحدث طلبات الشراء من المصانع والمصممين وقدم عروضك الفنية.</p>
         </div>
         <div className="flex gap-3">
            <button className="px-6 py-3 bg-white border border-border text-charcoal font-bold rounded-xl hover:bg-gray-50 transition-all text-sm shadow-sm flex items-center gap-2">
               <Filter className="w-4 h-4" /> تصفية النتائج
            </button>
            <div className="relative group">
               <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted group-focus-within:text-burgundy transition-colors" />
               <input 
                 type="text" 
                 placeholder="ابحث عن مناقصة..."
                 className="pr-12 pl-4 py-3 bg-white border border-border rounded-xl outline-none focus:border-burgundy text-sm w-64 shadow-sm"
               />
            </div>
         </div>
      </div>

      {/* Recommended for You Banner */}
      <div className="bg-gradient-to-r from-burgundy to-charcoal p-8 rounded-[40px] text-white flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-white rounded-full blur-[100px]" />
         </div>
         <div className="space-y-3 relative z-10 text-center md:text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-gold">ذكاء اصطناعي</div>
            <h2 className="text-2xl font-black italic">أفضل تطابق لمنتجاتك اليوم</h2>
            <p className="text-sm text-white/70 max-w-lg">
              بناءً على مخزونك من "الكتان"، وجدنا 3 مناقصات جديدة تبحث عن هذه المواصفات بدقة.
            </p>
         </div>
         <button className="px-10 py-5 bg-gold text-charcoal font-black rounded-2xl shadow-2xl hover:scale-105 transition-all relative z-10">
            شاهد المطابقات الذكية
         </button>
      </div>

      {/* RFQ List */}
      <div className="space-y-4">
         {RFQS.map((rfq) => (
           <div key={rfq.id} className="bg-white p-6 rounded-[32px] border border-border hover:border-gold transition-all shadow-sm hover:shadow-xl group">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                 
                 {/* Title & Info */}
                 <div className="lg:col-span-5 space-y-4">
                    <div className="flex items-center gap-3">
                       <span className="text-[10px] font-bold px-2 py-1 bg-gray-50 text-muted rounded-md border border-border">#{rfq.id}</span>
                       <span className="text-[10px] font-bold px-2 py-1 bg-burgundy/5 text-burgundy rounded-md uppercase tracking-widest">{rfq.category}</span>
                    </div>
                    <h3 className="text-xl font-black text-charcoal group-hover:text-burgundy transition-colors">{rfq.title}</h3>
                    <div className="flex flex-wrap gap-4 text-xs font-medium text-muted">
                       <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {rfq.buyer}</span>
                       <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {rfq.location}</span>
                    </div>
                 </div>

                 {/* Specs */}
                 <div className="lg:col-span-4 grid grid-cols-2 gap-8 py-4 lg:py-0 lg:border-r lg:border-l lg:border-gray-100 lg:px-8">
                    <div>
                       <p className="text-[10px] font-bold text-muted uppercase mb-1">الكمية المطلوبة</p>
                       <p className="font-black text-charcoal">{rfq.quantity}</p>
                    </div>
                    <div>
                       <p className="text-[10px] font-bold text-muted uppercase mb-1">الميزانية</p>
                       <p className="font-black text-accent">{rfq.budget}</p>
                    </div>
                    <div>
                       <p className="text-[10px] font-bold text-muted uppercase mb-1">الموعد النهائي</p>
                       <p className="font-bold text-red-500 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> {rfq.deadline}
                       </p>
                    </div>
                    <div>
                       <p className="text-[10px] font-bold text-muted uppercase mb-1">الردود</p>
                       <p className="font-bold text-charcoal flex items-center gap-1">
                          <MessageSquare className="w-3.5 h-3.5" /> 8 عروض
                       </p>
                    </div>
                 </div>

                 {/* Action */}
                 <div className="lg:col-span-3 flex flex-col gap-2">
                    <button className="w-full py-4 bg-burgundy text-white font-black rounded-2xl shadow-lg shadow-burgundy/20 hover:bg-charcoal transition-all">
                       تقديم عرض سعر (Bid)
                    </button>
                    <button className="w-full py-3 bg-white border border-border text-charcoal text-xs font-bold rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                       تحميل المواصفات <Download className="w-4 h-4" />
                    </button>
                 </div>

              </div>
           </div>
         ))}
      </div>

      {/* Verified Supplier Benefits */}
      <div className="p-8 bg-gold/5 rounded-[40px] border border-gold/20 flex flex-col md:flex-row items-center gap-8">
         <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center shrink-0">
            <ShieldCheck className="w-10 h-10 text-gold" />
         </div>
         <div className="space-y-2 text-center md:text-right">
            <h4 className="text-lg font-black text-gold-dark italic">ميزة المورد الموثوق</h4>
            <p className="text-xs text-gold-dark/70 leading-relaxed max-w-xl">
              بصفتك مورد معتمد (Verified)، تظهر عروضك دائماً في مقدمة القائمة لدى المشترين، مما يزيد من فرص فوزك بالمناقصات بنسبة 40%.
            </p>
         </div>
         <div className="flex-1 flex justify-center md:justify-end">
            <button className="text-xs font-bold text-gold-dark underline flex items-center gap-1">
               تعرف على معايير التوثيق <Info className="w-4 h-4" />
            </button>
         </div>
      </div>

    </div>
  );
}
