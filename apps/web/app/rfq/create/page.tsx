'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, ArrowRight } from 'lucide-react';
import CreateRFQWizard from '@/components/rfq/CreateRFQWizard';

export default function CreateRFQPage() {
  return (
    <div className="min-h-screen bg-[#FEFCF8] pt-24 pb-20 px-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* ─── Breadcrumbs ─── */}
        <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted mb-8">
          <Link href="/" className="hover:text-accent transition-colors">الرئيسية</Link>
          <ChevronRight className="w-3 h-3 rotate-180" />
          <Link href="/rfq" className="hover:text-accent transition-colors">طلبات العروض</Link>
          <ChevronRight className="w-3 h-3 rotate-180" />
          <span className="text-accent">إنشاء طلب جديد</span>
        </nav>

        {/* ─── Header Section ─── */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div className="space-y-2">
            <h1 className="text-display text-5xl font-light text-charcoal">إطلاق طلب عرض <br/><span className="italic font-normal">أسعار جديد</span></h1>
            <p className="text-muted max-w-lg">خامة تضع طلبك بين يدي آلاف الموردين المعتمدين حول العالم لضمان أفضل سعر وأعلى جودة.</p>
          </div>
          <Link href="/rfq" className="text-xs font-bold text-charcoal hover:text-accent flex items-center gap-2 border-b border-charcoal/20 pb-1">
            شاهد جميع الطلبات النشطة <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* ─── Wizard ─── */}
        <div className="mt-8">
          <CreateRFQWizard />
        </div>
      </div>
    </div>
  );
}
