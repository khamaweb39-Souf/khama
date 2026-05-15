'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ChevronLeft, Layers, Wind, 
  Palette, ShieldCheck, TrendingUp 
} from 'lucide-react';

const CATEGORIES = [
  { 
    id: 'natural', 
    title: 'ألياف طبيعية', 
    desc: 'أقمشة مستخرجة من الطبيعة (قطن، صوف، حرير)',
    icon: <Wind className="w-8 h-8" />,
    items: [
      { name: 'قطن بريميوم', slug: 'cotton', count: 142 },
      { name: 'صوف جزائري', slug: 'wool', count: 85 },
      { name: 'حرير طبيعي', slug: 'silk', count: 64 },
      { name: 'كتان عضوي', slug: 'linen', count: 42 }
    ]
  },
  { 
    id: 'synthetic', 
    title: 'ألياف اصطناعية', 
    desc: 'حلول نسيجية تقنية ومعاد تدويرها',
    icon: <Layers className="w-8 h-8" />,
    items: [
      { name: 'بوليستر معاد تدويره', slug: 'poly', count: 210 },
      { name: 'نايلون تقني', slug: 'nylon', count: 95 },
      { name: 'ليكرا سبانديكس', slug: 'lycra', count: 76 }
    ]
  },
  { 
    id: 'luxury', 
    title: 'خامات فاخرة', 
    desc: 'للمناسبات الراقية والأزياء المخصصة',
    icon: <Palette className="w-8 h-8" />,
    items: [
      { name: 'جاكارد ملكي', slug: 'jacquard', count: 34 },
      { name: 'ساتان فاخر', slug: 'satin', count: 56 },
      { name: 'مخمل مطرز', slug: 'velvet', count: 28 }
    ]
  }
];

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-[#FDFCFB] pb-20 pt-32" dir="rtl">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="max-w-3xl mb-20 space-y-6">
           <span className="text-[10px] font-black text-gold uppercase tracking-[0.3em]">دليل الخامات</span>
           <h1 className="text-6xl font-black text-burgundy tracking-tighter">استكشف عالم <br />الأقمشة الرقمي</h1>
           <p className="text-lg text-charcoal/60 leading-relaxed font-medium">تصفح أكبر قاعدة بيانات للأقمشة في المنطقة، مصنفة حسب المنشأ، التركيبة، والاستخدام التقني.</p>
        </div>

        {/* Categories Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
           {CATEGORIES.map((cat) => (
             <div key={cat.id} className="bg-white rounded-[3rem] p-10 border-2 border-burgundy/5 shadow-sm hover:shadow-2xl transition-all duration-500 group">
                <div className="w-16 h-16 bg-burgundy/5 rounded-2xl flex items-center justify-center text-burgundy mb-8 group-hover:scale-110 group-hover:bg-gold group-hover:text-white transition-all duration-500">
                   {cat.icon}
                </div>
                <h2 className="text-2xl font-black text-charcoal mb-4">{cat.title}</h2>
                <p className="text-sm text-charcoal/40 mb-8 font-medium leading-relaxed">{cat.desc}</p>
                
                <div className="space-y-4">
                   {cat.items.map((item) => (
                     <Link 
                       key={item.slug} 
                       href={`/cat/${item.slug}`}
                       className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gold/10 transition-colors group/item"
                     >
                        <div className="flex items-center gap-3">
                           <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                           <span className="text-sm font-black text-charcoal group-hover/item:text-gold transition-colors">{item.name}</span>
                        </div>
                        <span className="text-[10px] font-black text-charcoal/20">{item.count} منتج</span>
                     </Link>
                   ))}
                </div>

                <Link 
                  href="/fabrics" 
                  className="mt-10 flex items-center gap-3 text-xs font-black text-gold uppercase tracking-widest hover:translate-x-[-8px] transition-all"
                >
                   عرض الكل <ChevronLeft className="w-4 h-4" />
                </Link>
             </div>
           ))}
        </div>

        {/* Featured Section */}
        <div className="mt-24 bg-burgundy rounded-[4rem] p-16 relative overflow-hidden text-white">
           <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
           <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="space-y-6 max-w-xl">
                 <h2 className="text-4xl font-black">تبحث عن خامة مخصصة؟</h2>
                 <p className="text-white/60 text-lg leading-relaxed font-medium">يمكنك إرسال طلب عرض سعر (RFQ) للموردين وتحديد المواصفات التقنية الدقيقة التي تحتاجها لمشروعك القادم.</p>
                 <Link href="/rfq/create" className="inline-block bg-gold text-charcoal px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all">ابدأ الآن</Link>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                 <div className="p-6 bg-white/5 rounded-3xl border border-white/10 space-y-3">
                    <ShieldCheck className="w-8 h-8 text-gold" />
                    <h4 className="font-black">موردون موثوقون</h4>
                    <p className="text-[10px] text-white/40 leading-relaxed font-medium">نتحقق من السجلات التجارية وجودة المصانع.</p>
                 </div>
                 <div className="p-6 bg-white/5 rounded-3xl border border-white/10 space-y-3">
                    <TrendingUp className="w-8 h-8 text-gold" />
                    <h4 className="font-black">أسعار تنافسية</h4>
                    <p className="text-[10px] text-white/40 leading-relaxed font-medium">احصل على أفضل الأسعار لطلبات الجملة.</p>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
