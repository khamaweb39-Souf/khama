'use client';

import React from 'react';
import { ShoppingBag, ChevronLeft, ArrowLeft } from 'lucide-react';
import FabricCard from '@/components/FabricCard';

export default function FeaturedSidebar() {
  const bestSellers: any[] = [
    { 
      id: 'b1', 
      name: 'حرير ليون الفاخر', 
      reference: 'SL-2024-01',
      image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=400&auto=format&fit=crop',
      collection: 'SS26',
      certifications: ['GOTS', 'ISO'],
      sustainabilityScore: 5,
      createdAt: new Date().toISOString(),
      supplier: { id: 's1', name: 'Tissage de Lyon', avatar: 'https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?q=80&w=100', isVerified: true },
      origin: { country: 'فرنسا', flag: '🇫🇷' },
      composition: [{ fiber: 'Silk', percentage: 100, color: '#D4AF37' }],
      technicalSpecs: { gsm: 85, width: 140, weave: 'ساتان', colorsAvailable: ['#D4AF37', '#FFF'], totalColors: 12 },
      commercial: { price: 32.00, currency: 'EUR', unit: 'm', moq: 50, stockStatus: 'IN_STOCK' }
    },
    { 
      id: 'b2', 
      name: 'كتان هولندي خام', 
      reference: 'LH-2024-05',
      image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=400&auto=format&fit=crop',
      collection: 'PERMANENT',
      certifications: ['OEKO-TEX'],
      sustainabilityScore: 4,
      createdAt: new Date().toISOString(),
      supplier: { id: 's1', name: 'Tissage de Lyon', avatar: 'https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?q=80&w=100', isVerified: true },
      origin: { country: 'هولندا', flag: '🇳🇱' },
      composition: [{ fiber: 'Linen', percentage: 100, color: '#E3D5CA' }],
      technicalSpecs: { gsm: 220, width: 150, weave: 'سادة', colorsAvailable: ['#E3D5CA'], totalColors: 4 },
      commercial: { price: 21.50, currency: 'EUR', unit: 'm', moq: 100, stockStatus: 'ON_ORDER' }
    },
    { 
      id: 'b3', 
      name: 'صوف ميرينو ملكي', 
      reference: 'WM-2024-09',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=400&auto=format&fit=crop',
      collection: 'FW26',
      certifications: ['ISO'],
      sustainabilityScore: 4,
      createdAt: new Date().toISOString(),
      supplier: { id: 's1', name: 'Tissage de Lyon', avatar: 'https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?q=80&w=100', isVerified: true },
      origin: { country: 'إيطاليا', flag: '🇮🇹' },
      composition: [{ fiber: 'Wool', percentage: 100, color: '#2B2D42' }],
      technicalSpecs: { gsm: 340, width: 155, weave: 'تويل', colorsAvailable: ['#2B2D42'], totalColors: 8 },
      commercial: { price: 55.00, currency: 'EUR', unit: 'm', moq: 20, stockStatus: 'IN_STOCK' }
    },
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
