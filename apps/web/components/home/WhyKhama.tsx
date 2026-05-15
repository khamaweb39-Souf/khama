'use client';

import React from 'react';
import { Search, ShieldCheck, Handshake, Truck } from 'lucide-react';

const FEATURES = [
  {
    icon: Search,
    title: 'بحث ذكي بالمواصفات',
    desc: 'فلترة دقيقة بناءً على الوزن، العرض، والتركيبة النسيجية.',
    color: 'bg-gold/10'
  },
  {
    icon: ShieldCheck,
    title: 'موردون معتمدون',
    desc: 'فحص دوري للمصانع والتحقق من الشهادات العالمية.',
    color: 'bg-burgundy/5'
  },
  {
    icon: Handshake,
    title: 'مناقصات B2B شفافة',
    desc: 'نظام طلب عروض أسعار متطور يضمن أفضل قيمة لصفقتك.',
    color: 'bg-gold/10'
  },
  {
    icon: Truck,
    title: 'لوجستيك متكامل',
    desc: 'تتبع الشحنات من المصنع إلى باب مستودعك مباشرة.',
    color: 'bg-burgundy/5'
  }
];

export default function WhyKhama() {
  return (
    <section className="py-24 bg-obsidian relative overflow-hidden" dir="rtl">
      {/* Texture Background */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(var(--gold) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black text-ecru">لماذا منصة خامة؟</h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-gold-dark via-gold to-gold-light mx-auto rounded-full" />
          <p className="text-gold-light/40 max-w-2xl mx-auto text-lg">نحن نعيد تعريف سلاسل التوريد في صناعة النسيج عبر دمج التكنولوجيا بالخبرة الصناعية.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((item, i) => (
            <div 
              key={i}
              className="group p-8 rounded-[2.5rem] bg-charcoal border border-white/5 hover:border-gold/30 hover:shadow-2xl hover:shadow-gold/10 transition-all duration-500 text-right relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-gold/10 transition-all" />
              
              <div className={`w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500`}>
                <item.icon className="w-8 h-8 text-gold" />
              </div>
              <h3 className="text-xl font-black text-ecru mb-4 group-hover:text-gold transition-colors">{item.title}</h3>
              <p className="text-sm text-gold-light/40 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
