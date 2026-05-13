'use client';

import React from 'react';
import { 
  Search, ShieldCheck, Handshake, Truck, 
  UserPlus, UploadCloud, FileText, CheckCircle2,
  ChevronLeft
} from 'lucide-react';

export function WhyKhama() {
  const features = [
    {
      title: 'بحث ذكي بالمواصفات',
      desc: 'محرك بحث متطور يتيح لك الفلترة حسب الوزن، العرض، التركيبة والمنشأ بدقة متناهية.',
      icon: <Search className="w-8 h-8 text-gold" />,
      animation: 'hover:scale-110 transition-transform duration-500'
    },
    {
      title: 'موردون معتمدون',
      desc: 'نقوم بفحص الموردين ميدانياً لضمان جودة الأقمشة وموثوقية التعاملات التجارية.',
      icon: <ShieldCheck className="w-8 h-8 text-gold" />,
      animation: 'hover:rotate-[360deg] transition-transform duration-1000'
    },
    {
      title: 'مناقصات B2B شفافة',
      desc: 'أطلق طلبات الشراء الخاصة بك واستقبل عروضاً تنافسية من أفضل المصانع والموردين.',
      icon: <Handshake className="w-8 h-8 text-gold" />,
      animation: 'hover:translate-y-[-10px] transition-transform duration-500'
    },
    {
      title: 'لوجستيك متكامل',
      desc: 'تتبع شحناتك من المصنع إلى باب ورشتك مع خدمات التأمين والشحن المتكاملة.',
      icon: <Truck className="w-8 h-8 text-gold" />,
      animation: 'hover:translate-x-[-10px] transition-transform duration-500'
    }
  ];

  return (
    <section className="py-24 bg-[#0D0C0A] relative overflow-hidden">
      {/* Texture Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <span className="text-gold text-sm font-black uppercase tracking-[0.3em] mb-4 block">لماذا تختار منصتنا؟</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">قوة التكنولوجيا في خدمة النسيج</h2>
          <div className="w-24 h-1 bg-gold mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div key={i} className="group p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 hover:border-gold/50 transition-all duration-500 hover:bg-white/[0.05] hover:shadow-[0_20px_50px_rgba(201,168,76,0.1)]">
              <div className={`mb-6 p-4 rounded-2xl bg-gold/10 w-fit ${f.animation}`}>
                {f.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-gold transition-colors">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  const steps = [
    { title: 'إنشاء حساب', desc: 'سجل كمشتري أو مورد مع توثيق الهوية المهنية', icon: <UserPlus className="w-6 h-6" /> },
    { title: 'استكشاف ونشر', desc: 'تصفح الآلاف من الأقمشة أو انشر كتالوج منتجاتك', icon: <UploadCloud className="w-6 h-6" /> },
    { title: 'طلب عينات', desc: 'اطلب عينات تقنية أو أطلق مناقصة للشراء بالجملة', icon: <FileText className="w-6 h-6" /> },
    { title: 'إتمام الصفقة', desc: 'اتفاق نهائي، دفع آمن، وتوصيل حتى المستودع', icon: <CheckCircle2 className="w-6 h-6" /> }
  ];

  return (
    <section className="py-24 bg-[#0D0C0A] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-20 gap-8">
          <div className="text-right md:text-right">
             <h2 className="text-4xl font-black mb-4">كيف تعمل خامة؟</h2>
             <p className="text-gray-400 max-w-lg">خطوات بسيطة تنقلك من البحث إلى استلام أجود المنسوجات والجلود العالمية</p>
          </div>
          <button className="px-8 py-4 bg-gold text-charcoal font-black rounded-2xl hover:scale-105 transition-all shadow-xl shadow-gold/20">
            ابدأ رحلتك الآن
          </button>
        </div>

        <div className="relative">
          {/* Animated Gold Line */}
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 bg-white/10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold to-transparent animate-marquee w-[200%]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {steps.map((s, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-[#1A1917] border-4 border-white/5 flex items-center justify-center mb-8 group hover:border-gold transition-all duration-500 shadow-2xl">
                  <div className="text-gold group-hover:scale-125 transition-transform">
                    {s.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gold text-charcoal font-black flex items-center justify-center text-xs">
                    {i + 1}
                  </div>
                </div>
                <h4 className="text-xl font-bold mb-3">{s.title}</h4>
                <p className="text-gray-400 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function PartnersMarquee() {
  const partners = [
    { name: 'GOTS', logo: 'https://cdn.worldvectorlogo.com/logos/gots-global-organic-textile-standard.svg' },
    { name: 'OEKO-TEX', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Oeko-tex_logo.svg' },
    { name: 'ALGERIA TEXTILE', logo: 'https://images.unsplash.com/photo-1574634534894-89d7576c8259?q=80&w=100&auto=format&fit=crop' },
    { name: 'LYON SILK', logo: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=100&auto=format&fit=crop' },
    { name: 'BCI', logo: 'https://bettercotton.org/wp-content/uploads/2021/04/BCI-Logo-Green.png' }
  ];

  return (
    <section className="py-16 bg-[#0D0C0A] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <p className="text-xs font-black text-gold uppercase tracking-[0.4em]">شركاء الجودة والاعتماد</p>
      </div>
      <div className="flex overflow-hidden relative group">
        <div className="flex animate-marquee whitespace-nowrap py-4 items-center">
          {[...partners, ...partners, ...partners].map((p, i) => (
            <div key={i} className="mx-12 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer flex items-center gap-3">
              <img src={p.logo} alt={p.name} className="h-12 object-contain" />
              <span className="text-white/20 font-black text-xl tracking-tighter">{p.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
