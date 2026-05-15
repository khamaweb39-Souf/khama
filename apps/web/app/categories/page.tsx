'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Wind, Layers, ShieldCheck, 
  ArrowRight, Sparkles, TrendingUp,
  Box, Zap, Search
} from 'lucide-react';

const CATEGORIES = [
  {
    id: 'natural',
    title: 'ألياف طبيعية',
    desc: 'الخامات المستمدة مباشرة من الطبيعة، تجمع بين الراحة والاستدامة.',
    image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=800&auto=format&fit=crop',
    items: [
      { label: 'قطن بريميوم', link: '/cat/cotton', icon: <Wind className="w-4 h-4" /> },
      { label: 'صوف جزائري', link: '/cat/wool', icon: <Layers className="w-4 h-4" /> },
      { label: 'حرير طبيعي', link: '/cat/silk', icon: <Sparkles className="w-4 h-4" /> },
      { label: 'كتان عضوي', link: '/cat/linen', icon: <ShieldCheck className="w-4 h-4" /> }
    ]
  },
  {
    id: 'synthetic',
    title: 'ألياف اصطناعية',
    desc: 'تقنيات نسيج متطورة توفر متانة عالية ومقاومة للظروف الصعبة.',
    image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=800&auto=format&fit=crop',
    items: [
      { label: 'بوليستر معاد تدويره', link: '/cat/poly', icon: <Box className="w-4 h-4" /> },
      { label: 'نايلون تقني', link: '/cat/nylon', icon: <Zap className="w-4 h-4" /> },
      { label: 'ليكرا سبانديكس', link: '/cat/lycra', icon: <TrendingUp className="w-4 h-4" /> }
    ]
  },
  {
    id: 'industrial',
    title: 'منسوجات صناعية',
    desc: 'حلول نسيجية مخصصة للمصانع والورش الكبرى، ذات مواصفات قياسية.',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=800&auto=format&fit=crop',
    items: [
      { label: 'جاكارد ملكي', link: '/cat/jacquard', icon: <Layers className="w-4 h-4" /> },
      { label: 'غابردين متين', link: '/cat/gabardine', icon: <ShieldCheck className="w-4 h-4" /> },
      { label: 'ساتان فاخر', link: '/cat/satin', icon: <Sparkles className="w-4 h-4" /> }
    ]
  }
];

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-20" dir="rtl">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="space-y-4 max-w-2xl">
            <h1 className="text-5xl font-black text-burgundy tracking-tight leading-tight">
              استكشف عالم <br />
              <span className="text-gold">المنسوجات والجلود</span>
            </h1>
            <p className="text-muted text-lg leading-relaxed font-medium">
              دليل "خامة" الشامل لكافة أنواع الألياف والمنسوجات، مصنف وفق المعايير العالمية لصناعة النسيج.
            </p>
          </div>
          
          <div className="flex gap-4">
            <div className="relative group">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted group-focus-within:text-gold transition-colors" />
              <input 
                type="text" 
                placeholder="ابحث عن نوع نسيج..."
                className="bg-ecru/30 border border-ecru py-4 pr-12 pl-6 rounded-2xl outline-none focus:border-gold transition-all text-sm font-bold w-64"
              />
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 gap-20">
          {CATEGORIES.map((category, idx) => (
            <section key={category.id} className={`flex flex-col lg:flex-row gap-12 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              
              {/* Visual Side */}
              <div className="w-full lg:w-1/2 relative group overflow-hidden rounded-[3rem] aspect-[16/10] shadow-2xl">
                <img 
                  src={category.image} 
                  alt={category.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-burgundy/80 via-burgundy/20 to-transparent" />
                <div className="absolute bottom-10 right-10 left-10">
                   <h2 className="text-4xl font-black text-white mb-2">{category.title}</h2>
                   <p className="text-white/70 font-medium text-sm max-w-md">{category.desc}</p>
                </div>
              </div>

              {/* Items Side */}
              <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                 {category.items.map((item) => (
                   <Link 
                     key={item.label} 
                     href={item.link}
                     className="group flex items-center justify-between p-6 bg-white border-2 border-ecru rounded-[2rem] hover:border-gold hover:shadow-xl transition-all duration-300"
                   >
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-ecru/30 rounded-2xl flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-white transition-all">
                            {item.icon}
                         </div>
                         <span className="text-sm font-black text-charcoal">{item.label}</span>
                      </div>
                      <ArrowRight className="w-5 h-5 text-ecru group-hover:text-gold transition-colors" />
                   </Link>
                 ))}
                 
                 {/* Discover More Card */}
                 <div className="sm:col-span-2 p-8 bg-burgundy rounded-[2rem] flex items-center justify-between group cursor-pointer hover:bg-burgundy-dark transition-colors">
                    <div className="flex items-center gap-6">
                       <div className="w-14 h-14 bg-gold rounded-2xl flex items-center justify-center shadow-lg">
                          <TrendingUp className="w-6 h-6 text-white" />
                       </div>
                       <div className="text-right">
                          <h4 className="text-white font-black">أحدث اتجاهات الـ {category.title}</h4>
                          <p className="text-white/40 text-xs font-bold mt-1 uppercase tracking-widest">موسم ربيع/صيف 2026</p>
                       </div>
                    </div>
                    <button className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                       عرض التقرير
                    </button>
                 </div>
              </div>

            </section>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-32 p-12 bg-ecru/30 rounded-[4rem] border-2 border-dashed border-ecru flex flex-col items-center text-center gap-8">
           <div className="space-y-4">
              <h3 className="text-3xl font-black text-burgundy">لم تجد النوع الذي تبحث عنه؟</h3>
              <p className="text-muted font-medium max-w-xl mx-auto">
                 يمكنك التواصل مع فريق الدعم الفني لدينا لمساعدتك في إيجاد أفضل خامة تناسب احتياجات مشروعك الصناعي.
              </p>
           </div>
           <div className="flex gap-4">
              <Link href="/contact" className="px-10 py-5 bg-burgundy text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl hover:scale-105 transition-all">
                 اتصل بنا
              </Link>
              <Link href="/rfq/create" className="px-10 py-5 bg-gold text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl hover:scale-105 transition-all">
                 اطلب عرض سعر (RFQ)
              </Link>
           </div>
        </div>

      </div>
    </div>
  );
}
