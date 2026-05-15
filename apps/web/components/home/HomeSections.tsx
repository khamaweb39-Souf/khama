'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as Icons from 'lucide-react';

const { 
  BarChart, MessageSquare, ArrowRight, 
  Clock, ArrowUpRight, ArrowDownRight
} = Icons;

// ─── Utility: Intersection Observer Hook ──────────────────────────────
function useScrollReveal() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

// ─── Section: Tendances du moment (توجهات الموسم) ─────────────────────
export const TrendsSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section 
      ref={ref}
      className={`py-24 bg-midnight text-ecru overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
    >
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative group overflow-hidden rounded-[3rem] shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1594932224011-042041c6ff9a?q=80&w=800&auto=format&fit=crop" 
            alt="Trends" 
            className="w-full h-[600px] object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-10 right-10 left-10 p-8 glass-morphism rounded-3xl">
             <span className="text-amber text-xs font-black uppercase tracking-widest mb-2 block">إصدار محدود</span>
             <h4 className="text-2xl font-black text-white">نسيج "الأطلس" الفاخر</h4>
             <p className="text-sm text-ecru-muted mt-2">متوفر حصرياً للطلبات المسبقة لموسم AW26</p>
          </div>
        </div>
        
        <div className="space-y-10 text-right">
          <div className="space-y-4">
            <span className="text-amber font-black text-sm tracking-[0.3em] uppercase">اتجاهات 2026</span>
            <h2 className="text-5xl md:text-6xl font-black text-white leading-tight">مجموعة خريف وشتاء <br/><span className="text-amber italic font-medium">الفخامة المستدامة</span></h2>
          </div>
          
          <p className="text-ecru-muted text-lg leading-relaxed max-w-xl mr-auto font-medium">
            نستعرض هذا الموسم تمازج الخامات الطبيعية مع التقنيات الصديقة للبيئة. من الصوف الجزائري الفاخر إلى الجلود النباتية المبتكرة.
          </p>
          
          <div className="flex flex-wrap justify-end gap-3">
            {['تويد', 'مخمل', 'صوف عضوي', 'جلد نباتي'].map(tag => (
              <span key={tag} className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-black text-amber uppercase tracking-widest">{tag}</span>
            ))}
          </div>
          
          <button className="flex items-center gap-4 mr-auto group bg-amber text-midnight px-10 py-5 rounded-2xl font-black shadow-xl shadow-amber/10 hover:bg-amber-light transition-all">
            <span>عرض المجموعة كاملة</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2 rtl:rotate-180" />
          </button>
        </div>
      </div>
    </section>
  );
};

// ─── Section: Market Dashboard (بيانات السوق) ────────────────────────
export const MarketDashboard = () => {
  const { ref, isVisible } = useScrollReveal();
  const data = [
    { label: 'القطن (NY)', price: '$84.50', change: '+2.3%', trend: 'up' },
    { label: 'البوليستر', price: '¥7,210', change: '-0.8%', trend: 'down' },
    { label: 'الصوف (AWEX)', price: 'A$1,142', change: '+1.1%', trend: 'up' },
    { label: 'الحرير الخام', price: '$62.20', change: '0.0%', trend: 'stable' }
  ];

  return (
    <section ref={ref} className="py-24 bg-midnight">
      <div className="max-w-7xl mx-auto px-6">
        <div className="glass-morphism rounded-[3rem] p-10 md:p-16 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-amber" />
          
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8 text-right">
            <p className="text-ecru-muted text-[10px] font-black tracking-[0.3em] uppercase order-2 md:order-1">تحديث مباشر — بيانات البورصة العالمية</p>
            <h2 className="text-4xl font-black text-ecru flex items-center gap-4 order-1 md:order-2">
               <BarChart className="w-10 h-10 text-amber" />
               مؤشرات السوق النسيجي
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {data.map((item, i) => (
              <div key={i} className="p-8 bg-white/5 rounded-3xl border border-white/10 text-right group hover:bg-white/10 transition-all duration-500">
                <p className="text-ecru-muted text-[10px] font-black mb-4 uppercase tracking-widest">{item.label}</p>
                <div className="flex items-baseline justify-end gap-3">
                  <span className="text-3xl font-black text-ecru">{item.price}</span>
                  <span className={`text-xs font-black flex items-center gap-1 ${item.trend === 'up' ? 'text-green-400' : item.trend === 'down' ? 'text-red-400' : 'text-ecru-muted'}`}>
                    {item.change}
                    {item.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  </span>
                </div>
                <div className="mt-6 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                   <div className="h-full bg-amber w-2/3 group-hover:w-full transition-all duration-1000" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Section: Active RFQs (طلبات العروض النشطة) ───────────────────────
export const ActiveRFQs = () => {
  const { ref, isVisible } = useScrollReveal();
  const rfqs = [
    { title: 'مطلوب 5000 متر قماش بوبلين قطني', buyer: 'دار أزياء "س"', qty: '5000 متر', timer: '3 ساعات', urgent: true },
    { title: 'توريد صوف ميرينو عالي الجودة', buyer: 'مصنع "ج" للألبسة', qty: '1200 كغ', timer: 'يومان', urgent: false },
  ];

  return (
    <section ref={ref} className="py-24 bg-midnight text-white overflow-hidden" dir="rtl">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-black text-ecru">طلبات العروض (RFQ) النشطة</h2>
          <div className="h-1.5 w-24 bg-amber mx-auto rounded-full" />
        </div>
        <div className="space-y-6">
          {rfqs.map((rfq, i) => (
            <div 
              key={i}
              className={`group bg-white/5 border border-white/10 p-8 rounded-3xl flex flex-col md:flex-row justify-between items-center gap-8 hover:bg-white/10 transition-all cursor-pointer ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="text-right flex-1 space-y-2">
                <div className="flex items-center gap-4 mb-2">
                  {rfq.urgent && <span className="bg-red-500 text-white text-[10px] px-3 py-1 rounded-full flex items-center gap-1 animate-pulse font-black">عاجل</span>}
                  <span className="text-amber text-xs font-black tracking-widest uppercase">{rfq.timer} متبقي</span>
                </div>
                <h3 className="text-2xl font-black text-white group-hover:text-amber transition-colors"> {rfq.title} </h3>
                <p className="text-ecru-muted text-sm font-medium"> المشتري: {rfq.buyer} | الكمية: {rfq.qty} </p>
              </div>
              <button className="bg-amber text-midnight px-10 py-4 rounded-2xl font-black hover:scale-105 transition-all shrink-0">
                تقديم عرض
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Section: Testimonials (شهادات العملاء) ───────────────────────────
export const Testimonials = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="py-24 bg-midnight" dir="rtl">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-16">
          {[
            { text: "خامة غيرت مفهوم التوريد لدينا. الجودة والسرعة في الوصول للموردين كانت مفاجئة.", name: "ياسين بركاني", role: "مدير المشتريات" },
            { text: "كمصممة، أبحث دائماً عن الخامات الفريدة. خامة هي بوصلتي لاستكشاف كنوز النسيج.", name: "ليلى المنصوري", role: "مصممة أزياء" },
            { text: "منصة احترافية تليق بمستوى التحديات العالمية. لقد فتحت لنا أبواباً للتصدير.", name: "أحمد بن عيسى", role: "الرئيس التنفيذي" }
          ].map((t, i) => (
            <div 
              key={i} 
              className={`text-right space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
              style={{ transitionDelay: `${i * 200}ms` }}
            >
              <MessageSquare className="w-12 h-12 text-amber/20" />
              <p className="text-2xl font-display italic text-ecru leading-relaxed">"{t.text}"</p>
              <div className="pt-6 border-t border-white/5">
                <h4 className="font-black text-amber text-lg">{t.name}</h4>
                <p className="text-[10px] text-ecru-muted font-black uppercase tracking-[0.2em]">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function HomeSections() {
  return (
    <div className="flex flex-col">
      <TrendsSection />
      <MarketDashboard />
      <ActiveRFQs />
      <Testimonials />
    </div>
  );
}
