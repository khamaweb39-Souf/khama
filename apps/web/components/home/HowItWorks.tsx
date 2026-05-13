'use client';

import React from 'react';
import { UserPlus, Search, FileText, CheckCircle2 } from 'lucide-react';

const STEPS = [
  { icon: UserPlus, title: 'إنشاء حساب', desc: 'سجل كمشتري أو مورد معتمد في دقائق.' },
  { icon: Search, title: 'استكشاف الأقمشة', desc: 'تصفح آلاف الخامات أو انشر طلب عرضك.' },
  { icon: FileText, title: 'طلب عينات', desc: 'اطلب عينات ملموسة لضمان الجودة قبل التنفيذ.' },
  { icon: CheckCircle2, title: 'إتمام الصفقة', desc: 'توقيع العقود رقمياً وترتيب التوصيل اللوجستي.' },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-charcoal border-y border-white/5" dir="rtl">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-black text-ecru mb-4">كيف تعمل المنصة؟</h2>
          <p className="text-gold-light/40">أربعة خطوات بسيطة لبدء تجارتك العالمية في النسيج.</p>
        </div>

        <div className="relative">
          {/* Animated Golden Line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-white/5 hidden lg:block overflow-hidden -translate-y-1/2 rounded-full">
            <div className="h-full bg-gold animate-marquee-slow w-1/2 opacity-30" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative">
            {STEPS.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                <div className="w-20 h-20 bg-obsidian border-4 border-charcoal rounded-full flex items-center justify-center mb-6 z-10 group-hover:border-gold transition-all duration-500 shadow-2xl group-hover:scale-110">
                   <step.icon className="w-8 h-8 text-gold-light/40 group-hover:text-gold transition-colors" />
                   <span className="absolute -top-2 -right-2 w-8 h-8 bg-gold text-charcoal text-xs font-black rounded-full flex items-center justify-center border-4 border-obsidian">
                      {i + 1}
                   </span>
                </div>
                <h3 className="text-xl font-black text-ecru mb-3 group-hover:text-gold transition-colors">{step.title}</h3>
                <p className="text-sm text-gold-light/30 max-w-[200px] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
