'use client';

import React from 'react';

const LOGOS = [
  'GOTS', 'OEKO-TEX', 'ISO 9001', 'REACH', 'BCI COTTON', 'GLOBAL RECYCLED'
];

export default function PartnersMarquee() {
  return (
    <section className="py-16 bg-midnight border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-10 text-center">
         <span className="text-[10px] font-black text-amber uppercase tracking-[0.3em]">الشركاء والشهادات المعتمدة</span>
      </div>
      
      <div className="flex gap-20 animate-marquee whitespace-nowrap">
        {[...LOGOS, ...LOGOS].map((logo, i) => (
          <div key={i} className="flex items-center gap-4 group cursor-default">
             <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center font-black text-ecru-muted group-hover:bg-amber/10 group-hover:text-amber transition-all duration-300">
                {logo[0]}
             </div>
             <span className="text-2xl font-black text-white/10 group-hover:text-amber/50 transition-colors">
                {logo}
             </span>
          </div>
        ))}
      </div>
    </section>
  );
}
