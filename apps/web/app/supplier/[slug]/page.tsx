'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import SupplierHero from '@/components/supplier/profile/SupplierHero';
import SupplierContent from '@/components/supplier/profile/SupplierContent';
import FeaturedSidebar from '@/components/supplier/profile/FeaturedSidebar';
import SEOHead, { getSupplierSchema } from '@/components/SEOHead';

// ─── Mock Data for Demo ───────────────────────────────────────────────────
const MOCK_SUPPLIER = {
  name: "مصنع ليون للنسيج والموضة ذ.م.م",
  tradeName: "Tissage de Lyon",
  logo: "https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?q=80&w=200&auto=format&fit=crop",
  cover: "https://images.unsplash.com/photo-1558444479-c8af50e90c58?q=80&w=1200&auto=format&fit=crop",
  location: { city: "ليون", region: "أوفرن-رون ألب", country: "فرنسا", flag: "🇫🇷" },
  badges: ["مورد معتمد ✓", "ISO 9001", "GOTS Premium"],
  stats: { founded: "2008", employees: "340+", exportCount: 28 }
};

export default function SupplierProfilePage({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen bg-[#FEFCF8]" dir="rtl">
      <SEOHead type="LocalBusiness" data={getSupplierSchema(MOCK_SUPPLIER)} />
      
      {/* ─── Breadcrumbs ─── */}
      <nav className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
        <Link href="/" className="hover:text-accent transition-colors">الرئيسية</Link>
        <ChevronRight className="w-3 h-3 rotate-180" />
        <Link href="/suppliers" className="hover:text-accent transition-colors">الموردين</Link>
        <ChevronRight className="w-3 h-3 rotate-180" />
        <span className="text-accent">{MOCK_SUPPLIER.tradeName}</span>
      </nav>

      {/* ─── Hero Section ─── */}
      <SupplierHero supplier={MOCK_SUPPLIER} />

      {/* ─── Main Content Grid ─── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Tabs Area */}
          <div className="lg:col-span-8">
            <SupplierContent />
          </div>

          {/* Featured Sticky Sidebar */}
          <div className="lg:col-span-4 hidden lg:block">
            <FeaturedSidebar />
          </div>

        </div>
      </div>

    </div>
  );
}
