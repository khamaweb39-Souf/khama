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
    <div className="py-20 bg-midnight border-y border-white/5 overflow-hidden" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 mb-10 flex items-end justify-between">
         <div className="space-y-2">
            <span className="text-[10px] font-black text-amber uppercase tracking-[0.3em]">الشركاء الاستراتيجيون</span>
            <h3 className="text-3xl font-black text-ecru">مصانع موثوقة عالمياً</h3>
         </div>
         <button className="text-[10px] font-black text-amber border-b-2 border-amber pb-1 hover:text-amber-light hover:border-amber-light transition-all">
            عرض كافة المصانع
         </button>
      </div>

      <div className="flex gap-8 animate-marquee-slow hover:pause whitespace-nowrap">
        {[...FACTORIES, ...FACTORIES].map((f, i) => (
          <div key={i} className="inline-flex items-center gap-4 bg-white/5 border border-white/10 p-6 rounded-[2rem] hover:shadow-xl hover:border-amber/20 transition-all group min-w-[320px]">
             <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center font-black text-amber text-2xl group-hover:scale-110 transition-transform">
                {f.name[0]}
             </div>
             <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                   <span className="font-black text-ecru">{f.name}</span>
                   <ShieldCheck className="w-4 h-4 text-amber" />
                </div>
                <div className="flex items-center gap-3 text-[10px] font-bold text-ecru-muted">
                   <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {f.location}</span>
                   <span className="bg-amber/10 text-amber px-2 py-0.5 rounded">★ {f.rating}</span>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
