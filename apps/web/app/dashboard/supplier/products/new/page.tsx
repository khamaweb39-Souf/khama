'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import AddProductWizard from '@/components/supplier/AddProductWizard';

export default function NewProductPage() {
  return (
    <div className="space-y-8" dir="rtl">
      {/* ─── Page Header & Breadcrumbs ─── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <nav className="flex items-center gap-2 text-xs text-muted mb-3 font-bold uppercase tracking-wider">
            <Link href="/dashboard/supplier" className="hover:text-gold transition-colors">لوحة التحكم</Link>
            <ChevronRight className="w-3 h-3 rotate-180" />
            <Link href="/dashboard/supplier/products" className="hover:text-gold transition-colors">المنتجات</Link>
            <ChevronRight className="w-3 h-3 rotate-180" />
            <span className="text-gold">إضافة منتج جديد</span>
          </nav>
          <h1 className="text-3xl font-bold text-charcoal tracking-tight">إضافة منتج نسيجي جديد</h1>
          <p className="text-muted text-sm mt-1">أكمل الخطوات التالية لإدراج قماشك في سوق خامة العالمي</p>
        </div>
      </div>

      {/* ─── Wizard Component ─── */}
      <div className="pb-12">
        <AddProductWizard />
      </div>
    </div>
  );
}
