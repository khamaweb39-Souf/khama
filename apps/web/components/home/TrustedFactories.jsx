'use client';

import React from 'react';
import { ShieldCheck, MapPin } from 'lucide-react';

const FACTORIES = [
  { name: 'مصنع الأطلس للنسيج', location: 'سطيف، الجزائر', rating: 4.8 },
  { name: 'Tissage de Lyon', location: 'Lyon, France', rating: 4.9 },
  { name: 'مجمع سيفيتال للصناعة', location: 'بجاية، الجزائر', rating: 4.7 },
  { name: 'Textile Artisans', location: 'Kairouan, Tunisia', rating: 5.0 },
  { name: 'Oran Fashion Hub', location: 'وهران، الجزائر', rating: 4.6 },
];

export default function TrustedFactories() {
  return (
    <div className="py-20 bg-white border-y border-ecru overflow-hidden" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 mb-10 flex items-end justify-between">
         <div className="space-y-2">
            <span className="text-[10px] font-black text-gold uppercase tracking-[0.3em]">الشركاء الاستراتيجيون</span>
            <h3 className="text-3xl font-black text-charcoal">مصانع موثوقة عالمياً</h3>
         </div>
         <button className="text-[10px] font-black text-burgundy border-b-2 border-burgundy pb-1 hover:text-gold hover:border-gold transition-all">
            عرض كافة المصانع
         </button>
      </div>

      <div className="flex gap-8 animate-marquee-slow hover:pause whitespace-nowrap">
        {[...FACTORIES, ...FACTORIES].map((f, i) => (
          <div key={i} className="inline-flex items-center gap-4 bg-off-white border border-ecru p-6 rounded-[2rem] hover:shadow-xl hover:border-gold/20 transition-all group min-w-[320px]">
             <div className="w-16 h-16 bg-ecru rounded-2xl flex items-center justify-center font-black text-gold text-2xl group-hover:scale-110 transition-transform">
                {f.name[0]}
             </div>
             <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                   <span className="font-black text-charcoal">{f.name}</span>
                   <ShieldCheck className="w-4 h-4 text-green-500" />
                </div>
                <div className="flex items-center gap-3 text-[10px] font-bold text-muted">
                   <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {f.location}</span>
                   <span className="bg-gold/10 text-gold px-2 py-0.5 rounded">★ {f.rating}</span>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
