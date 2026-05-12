'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as Icons from 'lucide-react';

const { 
  TrendingUp, Users, Grid, BarChart2, MessageSquare, 
  ArrowRight, Globe, ShieldCheck, Mail, Linkedin, 
  Instagram, Twitter, Clock, ArrowUpRight, ArrowDownRight
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
const TrendsSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section 
      ref={ref}
      className={`py-24 bg-[#0D0C0A] text-[#F5F0E8] overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
    >
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div className="relative group overflow-hidden rounded-2xl">
          <img 
            src="https://images.unsplash.com/photo-1594932224011-042041c6ff9a?q=80&w=800&auto=format&fit=crop" 
            alt="Trends" 
            className="w-full h-[600px] object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0C0A] via-transparent to-transparent opacity-60" />
        </div>
        
        <div className="space-y-8 text-right">
          <span className="text-[#C9A84C] font-body text-sm tracking-[0.2em] uppercase">اتجاهات 2026</span>
          <h2 className="text-display text-5xl md:text-6xl font-light leading-tight">مجموعة خريف وشتاء <br/><span className="italic font-normal">الفخامة المستدامة</span></h2>
          <p className="text-[#F5F0E8]/70 text-lg leading-relaxed max-w-xl mr-auto">
            نستعرض هذا الموسم تمازج الخامات الطبيعية مع التقنيات الصديقة للبيئة. من الصوف الجزائري الفاخر إلى الجلود النباتية المبتكرة، نقدم لكم رؤية جديدة للأناقة التي تحترم الطبيعة وتلبي معايير الجودة العالمية.
          </p>
          <div className="flex flex-wrap justify-end gap-3">
            {['تويد', 'مخمل', 'صوف عضوي', 'جلد نباتي'].map(tag => (
              <span key={tag} className="px-4 py-1.5 border border-[#C9A84C]/30 rounded-full text-xs text-[#C9A84C]">{tag}</span>
            ))}
          </div>
          <button className="flex items-center gap-3 mr-auto group text-[#C9A84C] border-b border-[#C9A84C]/40 pb-2 hover:border-[#C9A84C] transition-all">
            <span className="font-body text-sm uppercase tracking-widest">عرض المجموعة كاملة</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
          </button>
        </div>
      </div>
    </section>
  );
};

// ─── Section: Nouveaux Fournisseurs (الموردون الجدد) ───────────────────
const NewSuppliers = () => {
  const { ref, isVisible } = useScrollReveal();
  const suppliers = [
    { name: 'مجموعة الأطلس للنسيج', country: 'الجزائر', specialty: 'صوف وحرير', logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=100&auto=format&fit=crop' },
    { name: 'تيكستايل المغرب', country: 'المغرب', specialty: 'قطن عضوي', logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=100&auto=format&fit=crop' },
    { name: 'قرطاج للألياف', country: 'تونس', specialty: 'أقمشة تقنية', logo: 'https://images.unsplash.com/photo-1542744094-3a31f1f9cff4?q=80&w=100&auto=format&fit=crop' },
    { name: 'النيل للمنسوجات', country: 'مصر', specialty: 'قطن طويل التيلة', logo: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=100&auto=format&fit=crop' },
    { name: 'سيرتا للصوف', country: 'الجزائر', specialty: 'صوف تقليدي', logo: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=100&auto=format&fit=crop' },
    { name: 'فينيكس مود', country: 'الإمارات', specialty: 'تصميم نسيجي', logo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=100&auto=format&fit=crop' }
  ];

  return (
    <section ref={ref} className="py-24 bg-[#FEFCF8]">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`flex justify-between items-end mb-16 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex gap-2">
             <button className="p-3 border border-[#E8E2D9] rounded-full hover:bg-[#F5F0E8] transition-colors"><Icons.ChevronLeft className="w-5 h-5"/></button>
             <button className="p-3 border border-[#E8E2D9] rounded-full hover:bg-[#F5F0E8] transition-colors"><Icons.ChevronRight className="w-5 h-5"/></button>
          </div>
          <div className="text-right">
            <h2 className="text-display text-4xl font-semibold text-[#1A1A2E]">شركاء جدد تم التحقق منهم</h2>
            <p className="text-[#9E8E7E] mt-2">انضموا إلينا لتقديم أفضل خامات النسيج في المنطقة</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {suppliers.map((s, i) => (
            <div 
              key={i}
              className={`group bg-white border border-[#E8E2D9] p-6 rounded-2xl hover:border-[#C9A84C] transition-all duration-500 hover:shadow-xl text-center flex flex-col items-center space-y-4 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="relative">
                <img src={s.logo} className="w-16 h-16 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all" alt={s.name} />
                <span className="absolute -top-1 -right-1 text-[10px] bg-[#C9A84C] text-white px-1.5 py-0.5 rounded-full">✦</span>
              </div>
              <div>
                <h4 className="font-bold text-[#1A1A2E] text-sm">{s.name}</h4>
                <p className="text-[10px] text-[#9E8E7E] uppercase tracking-wider">{s.country}</p>
              </div>
              <span className="text-[10px] bg-[#F5F0E8] text-[#9E8E7E] px-2 py-1 rounded">{s.specialty}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Section: Market Dashboard (بيانات السوق) ────────────────────────
const MarketDashboard = () => {
  const { ref, isVisible } = useScrollReveal();
  const data = [
    { label: 'القطن (NY)', price: '$84.50', change: '+2.3%', trend: 'up' },
    { label: 'البوليستر (PTA)', price: '¥7,210', change: '-0.8%', trend: 'down' },
    { label: 'الصوف (AWEX)', price: 'A$1,142', change: '+1.1%', trend: 'up' },
    { label: 'الحرير الخام', price: '$62.20', change: '0.0%', trend: 'stable' }
  ];

  return (
    <section ref={ref} className="py-24 bg-[#F5F0E8]/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-[#E8E2D9]">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
            <p className="text-[#9E8E7E] text-xs font-body tracking-widest uppercase">بيانات استرشادية — تحديث يومي</p>
            <h2 className="text-display text-4xl text-[#1A1A2E] flex items-center gap-3">
              <BarChart2 className="w-8 h-8 text-[#C9A84C]" />
              لوحة بيانات السوق العالمي
            </h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {data.map((item, i) => (
              <div key={i} className="p-6 border-r border-[#E8E2D9] last:border-0 text-right">
                <p className="text-[#9E8E7E] text-xs font-bold mb-2 uppercase">{item.label}</p>
                <div className="flex items-baseline justify-end gap-2">
                  <span className="text-2xl font-bold text-[#1A1A2E]">{item.price}</span>
                  <span className={`text-xs flex items-center gap-1 ${item.trend === 'up' ? 'text-green-600' : item.trend === 'down' ? 'text-red-600' : 'text-gray-500'}`}>
                    {item.change}
                    {item.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  </span>
                </div>
                <div className="mt-4 h-8 w-full bg-[#F5F0E8] rounded opacity-40 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Section: Active RFQs (طلبات العروض النشطة) ───────────────────────
const ActiveRFQs = () => {
  const { ref, isVisible } = useScrollReveal();
  const rfqs = [
    { title: 'مطلوب 5000 متر قماش بوبلين قطني', buyer: 'دار أزياء "س"', qty: '5000 متر', timer: '3 ساعات', urgent: true },
    { title: 'توريد صوف ميرينو عالي الجودة', buyer: 'مصنع "ج" للألبسة', qty: '1200 كغ', timer: 'يومان', urgent: false },
    { title: 'خيوط بوليستر معالج للحقائب', buyer: 'شركة "م" للتجهيزات', qty: '3000 بكرة', timer: '5 ساعات', urgent: true }
  ];

  return (
    <section ref={ref} className="py-24 bg-[#1A1A2E] text-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-display text-4xl mb-4 italic">طلبات العروض النشطة</h2>
          <div className="w-24 h-1 bg-[#C9A84C] mx-auto rounded-full" />
        </div>

        <div className="space-y-6">
          {rfqs.map((rfq, i) => (
            <div 
              key={i}
              className={`group bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6 hover:bg-white/10 transition-all cursor-pointer ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="text-right flex-1">
                <div className="flex items-center justify-end gap-3 mb-2">
                  {rfq.urgent && <span className="bg-red-500/20 text-red-500 text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 animate-pulse"><Clock className="w-3 h-3"/> تنتهي قريباً</span>}
                  <span className="text-[#C9A84C] text-[10px] font-bold tracking-widest uppercase">{rfq.timer} متبقي</span>
                </div>
                <h3 className="text-xl font-semibold mb-1">{rfq.title}</h3>
                <p className="text-white/50 text-sm">المشتري: {rfq.buyer} | الكمية: {rfq.qty}</p>
              </div>
              <button className="bg-[#C9A84C] text-[#0D0C0A] px-8 py-3 rounded-full font-bold text-sm hover:scale-105 transition-transform shrink-0">
                الرد على العرض
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Section: Testimonials (شهادات العملاء) ───────────────────────────
const Testimonials = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="py-24 bg-[#FEFCF8]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-16">
          {[
            { text: "خامة غيرت مفهوم التوريد لدينا. الجودة والسرعة في الوصول للموردين المعتمدين كانت مفاجئة.", name: "ياسين بركاني", role: "مدير المشتريات، زارا (شمال أفريقيا)" },
            { text: "كمصممة، أبحث دائماً عن الخامات الفريدة. خامة هي بوصلتي لاستكشاف كنوز النسيج في منطقتنا.", name: "ليلى المنصوري", role: "مصممة أزياء، هيرميس (مستشارة)" },
            { text: "منصة احترافية تليق بمستوى التحديات العالمية. لقد فتحت لنا أبواباً للتصدير لم نكن نتخيلها.", name: "أحمد بن عيسى", role: "الرئيس التنفيذي، مطاحن أحمد" }
          ].map((t, i) => (
            <div 
              key={i} 
              className={`text-right space-y-6 transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
              style={{ transitionDelay: `${i * 200}ms` }}
            >
              <MessageSquare className="w-10 h-10 text-[#C9A84C]/20 ml-auto" />
              <p className="text-2xl font-display italic text-[#1A1A2E] leading-relaxed">"{t.text}"</p>
              <div>
                <h4 className="font-bold text-[#C9A84C]">{t.name}</h4>
                <p className="text-xs text-[#9E8E7E] uppercase tracking-wider">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Footer Premium ──────────────────────────────────────────────────
const Footer = () => {
  return (
    <footer className="bg-[#0D0C0A] text-[#F5F0E8] pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-16 mb-24 text-right">
          <div className="space-y-6">
             <div className="flex justify-end gap-2 items-center">
                <span className="text-3xl font-display font-bold tracking-tighter text-[#C9A84C]">خامة</span>
                <div className="w-8 h-8 border-2 border-[#C9A84C] flex items-center justify-center font-bold text-xs text-[#C9A84C]">KH</div>
             </div>
             <p className="text-[#F5F0E8]/40 text-sm leading-relaxed">
               المنصة المتكاملة لإدارة سلاسل التوريد والابتكار في عالم المنسوجات والأزياء الراقية.
             </p>
             <div className="flex justify-end gap-4 text-[#F5F0E8]/40">
                <Linkedin className="w-5 h-5 hover:text-[#C9A84C] cursor-pointer" />
                <Instagram className="w-5 h-5 hover:text-[#C9A84C] cursor-pointer" />
                <Twitter className="w-5 h-5 hover:text-[#C9A84C] cursor-pointer" />
             </div>
          </div>

          {[
            { title: 'المنصة', links: ['الكتالوج', 'سوق الموردين', 'طلبات العروض', 'حلول الأعمال'] },
            { title: 'المصادر', links: ['أكاديمية خامة', 'تقارير السوق', 'دليل المنسوجات', 'الفعاليات'] },
            { title: 'قانوني', links: ['الشروط والأحكام', 'سياسة الخصوصية', 'حقوق الملكية', 'اتصل بنا'] }
          ].map((col, i) => (
            <div key={i} className="space-y-6">
              <h4 className="font-bold text-[#C9A84C] uppercase tracking-[0.2em] text-xs">{col.title}</h4>
              <ul className="space-y-4">
                {col.links.map(link => (
                  <li key={link} className="text-sm text-[#F5F0E8]/50 hover:text-[#C9A84C] transition-colors cursor-pointer">{link}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-8 text-[#F5F0E8]/30 text-[10px] tracking-widest uppercase">
          <div className="flex gap-8">
             <span>ISO 9001:2015 CERTIFIED</span>
             <span>GOTS COMPLIANT</span>
          </div>
          <p>© 2026 خامة للمنسوجات. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

// ─── Final HomeSections Assembler ────────────────────────────────────
export default function HomeSections() {
  return (
    <div className="bg-[#FEFCF8]">
      <TrendsSection />
      <NewSuppliers />
      <MarketDashboard />
      <ActiveRFQs />
      <Testimonials />
      <Footer />
    </div>
  );
}
