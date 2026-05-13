'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as Icons from 'lucide-react';

const { 
  TrendingUp, Users, Grid, BarChart, MessageSquare, 
  ArrowRight, Globe, Shield, Mail, Clock, ArrowUpRight, ArrowDownRight
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
              <BarChart className="w-8 h-8 text-[#C9A84C]" />
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
                <svg className="w-5 h-5 hover:text-[#C9A84C] cursor-pointer fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                <svg className="w-5 h-5 hover:text-[#C9A84C] cursor-pointer fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                <svg className="w-5 h-5 hover:text-[#C9A84C] cursor-pointer fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
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
