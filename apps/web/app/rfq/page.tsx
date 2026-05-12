'use client';

import React from 'react';
import Link from 'next/link';
import { Plus, ArrowLeft } from 'lucide-react';
import RFQList from '@/components/rfq/RFQList';

export default function RFQsPage() {
  return (
    <div className="min-h-screen bg-[#FEFCF8] pt-24 pb-20" dir="rtl">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* ─── Header ─── */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-accent mb-4">
              <div className="w-8 h-px bg-accent" />
              سوق المناقصات وطلبات العروض
            </div>
            <h1 className="text-display text-5xl md:text-6xl font-light text-charcoal">الطلبات <br/><span className="italic font-normal text-accent">النشطة حالياً</span></h1>
            <p className="text-muted max-w-lg mt-4 leading-relaxed">
              تصفح أحدث المناقصات وطلبات عروض الأسعار من كبار المشترين والمصانع في المنطقة. قدم عرضك الآن ووسع نطاق أعمالك.
            </p>
          </div>
          
          <Link 
            href="/rfq/create" 
            className="group relative bg-charcoal text-white px-10 py-5 rounded-2xl font-bold flex items-center gap-3 overflow-hidden transition-all hover:pr-14"
          >
            <div className="absolute right-0 top-0 h-full w-12 bg-accent flex items-center justify-center transition-all group-hover:w-full">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <span className="relative z-10">إطلاق طلب عرض سعر</span>
          </Link>
        </div>

        {/* ─── Stats Mini-Bar ─── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
           {[
             { label: 'طلبات نشطة', value: '142' },
             { label: 'عروض مستلمة اليوم', value: '48' },
             { label: 'متوسط وقت الرد', value: '4.5 ساعة' },
             { label: 'إجمالي التداول', value: '1.2M دج' },
           ].map((stat, i) => (
             <div key={i} className="bg-white border border-border p-4 rounded-2xl">
               <p className="text-[10px] font-bold text-muted uppercase mb-1">{stat.label}</p>
               <p className="text-xl font-bold text-charcoal">{stat.value}</p>
             </div>
           ))}
        </div>

        {/* ─── Main List ─── */}
        <RFQList />

      </div>
    </div>
  );
}
