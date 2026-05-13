'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as Icons from 'lucide-react';
import Link from 'next/link';
import Button from '../ui/Button';

const { 
  TrendingUp, Users, Grid, BarChart, MessageSquare, 
  ArrowRight, Globe, Shield, Mail, Clock, ArrowUpRight, ArrowDownRight,
  ChevronLeft, ChevronRight, ExternalLink
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
      className={`py-32 bg-navy text-cream overflow-hidden transition-all duration-1000 pattern-silk ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
    >
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div className="relative group overflow-hidden rounded-3xl shadow-silk border border-gold/10">
          <img 
            src="https://images.unsplash.com/photo-1594932224011-042041c6ff9a?q=80&w=800&auto=format&fit=crop" 
            alt="Trends" 
            className="w-full h-[600px] object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent opacity-80" />
          <div className="absolute bottom-8 right-8 p-6 glass-card rounded-2xl border-gold/20">
             <span className="text-gold font-black text-xs uppercase tracking-[0.3em]">تحفة الموسم</span>
             <h4 className="text-2xl font-black mt-2">نسيج الأطلس الملكي</h4>
          </div>
        </div>
        
        <div className="space-y-10 text-right">
          <div className="inline-block px-4 py-1.5 glass-card border-gold/30 rounded-full">
            <span className="text-gold font-black text-[10px] uppercase tracking-[0.2em]">اتجاهات 2026</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black leading-tight text-white">مجموعة خريف وشتاء <br/><span className="text-gold italic font-medium">الفخامة المستدامة</span></h2>
          <p className="text-cream/70 text-xl leading-relaxed max-w-xl mr-auto font-medium">
            نستعرض هذا الموسم تمازج الخامات الطبيعية مع التقنيات الصديقة للبيئة. من الصوف الجزائري الفاخر إلى الجلود النباتية المبتكرة، نقدم لكم رؤية جديدة للأناقة.
          </p>
          <div className="flex flex-wrap justify-end gap-3">
            {['تويد', 'مخمل', 'صوف عضوي', 'جلد نباتي'].map(tag => (
              <span key={tag} className="px-5 py-2 glass-card border-white/10 rounded-full text-[10px] font-black text-cream uppercase tracking-widest">{tag}</span>
            ))}
          </div>
          <div className="pt-6">
            <Button variant="premium" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
              عرض المجموعة كاملة
            </Button>
          </div>
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
    <section ref={ref} className="py-32 bg-white pattern-jacquard">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`flex flex-col md:flex-row justify-between items-end mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex gap-4 order-2 md:order-1 mt-8 md:mt-0">
             <button className="p-4 glass-card border-gold/20 rounded-2xl hover:bg-gold/10 transition-all shadow-silk"><ChevronLeft className="w-6 h-6 text-navy"/></button>
             <button className="p-4 glass-card border-gold/20 rounded-2xl hover:bg-gold/10 transition-all shadow-silk"><ChevronRight className="w-6 h-6 text-navy"/></button>
          </div>
          <div className="text-right order-1 md:order-2">
            <span className="text-gold font-black text-xs uppercase tracking-[0.3em]">التميز الإقليمي</span>
            <h2 className="text-5xl font-black text-navy mt-4">شركاء جدد تم التحقق منهم</h2>
            <p className="text-navy/50 mt-4 text-lg font-medium">نخبة المصنعين والموردين في شمال أفريقيا والشرق الأوسط</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {suppliers.map((s, i) => (
            <div 
              key={i}
              className={`group glass-card border-gold/10 p-8 rounded-[2rem] hover:border-gold/30 transition-all duration-700 hover:shadow-gold-glow text-center flex flex-col items-center space-y-6 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="relative">
                <div className="w-20 h-20 rounded-full border-2 border-gold/20 p-1 group-hover:border-gold transition-colors duration-500">
                  <img src={s.logo} className="w-full h-full rounded-full object-cover transition-all duration-700 group-hover:scale-110" alt={s.name} />
                </div>
                <span className="absolute -top-1 -right-1 text-xs bg-gold text-navy w-6 h-6 flex items-center justify-center rounded-full shadow-lg border-2 border-white animate-pulse">✦</span>
              </div>
              <div>
                <h4 className="font-black text-navy text-base leading-tight group-hover:text-gold transition-colors">{s.name}</h4>
                <p className="text-[10px] text-navy/40 uppercase tracking-widest mt-2 font-black">{s.country}</p>
              </div>
              <span className="text-[10px] bg-gold/5 text-gold border border-gold/10 px-3 py-1.5 rounded-full font-black uppercase tracking-tighter">{s.specialty}</span>
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
    <section ref={ref} className="py-32 bg-cream/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="glass-card rounded-[3rem] p-10 md:p-20 shadow-silk border-gold/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8 relative z-10">
            <div className="flex flex-col items-center md:items-start gap-2">
              <span className="text-gold font-black text-[10px] uppercase tracking-[0.3em] bg-gold/10 px-3 py-1 rounded-full">تحديث مباشر</span>
              <h2 className="text-4xl md:text-5xl font-black text-navy flex items-center gap-4">
                <BarChart className="w-10 h-10 text-gold" />
                بورصة المنسوجات العالمية
              </h2>
            </div>
            <p className="text-navy/40 text-sm font-black text-center md:text-right max-w-xs leading-relaxed uppercase tracking-widest">مؤشرات الأسعار العالمية للخامات الأساسية يومياً</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 relative z-10">
            {data.map((item, i) => (
              <div key={i} className="p-8 border-r border-gold/10 last:border-0 text-right group hover:bg-gold/5 transition-all duration-500 rounded-3xl">
                <p className="text-navy/40 text-[10px] font-black mb-4 uppercase tracking-[0.2em]">{item.label}</p>
                <div className="flex items-baseline justify-end gap-3">
                  <span className="text-3xl font-black text-navy group-hover:text-gold transition-colors">{item.price}</span>
                  <span className={`text-xs font-black flex items-center gap-1 ${item.trend === 'up' ? 'text-emerald' : item.trend === 'down' ? 'text-burgundy' : 'text-navy/40'}`}>
                    {item.change}
                    {item.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  </span>
                </div>
                <div className="mt-6 h-1 w-full bg-navy/5 rounded-full overflow-hidden">
                   <div className={`h-full transition-all duration-1000 ${item.trend === 'up' ? 'bg-emerald w-2/3' : item.trend === 'down' ? 'bg-burgundy w-1/3' : 'bg-gold w-1/2'}`} />
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
const ActiveRFQs = () => {
  const { ref, isVisible } = useScrollReveal();
  const rfqs = [
    { title: 'مطلوب 5000 متر قماش بوبلين قطني', buyer: 'دار أزياء "س"', qty: '5000 متر', timer: '3 ساعات', urgent: true },
    { title: 'توريد صوف ميرينو عالي الجودة', buyer: 'مصنع "ج" للألبسة', qty: '1200 كغ', timer: 'يومان', urgent: false },
    { title: 'خيوط بوليستر معالج للحقائب', buyer: 'شركة "م" للتجهيزات', qty: '3000 بكرة', timer: '5 ساعات', urgent: true }
  ];

  return (
    <section ref={ref} className="py-32 bg-navy text-white overflow-hidden relative">
      <div className="absolute inset-0 pattern-silk opacity-10" />
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <span className="text-gold font-black text-xs uppercase tracking-[0.4em] mb-4 block">سوق الفرص</span>
          <h2 className="text-5xl md:text-6xl font-black mb-8 italic">عروض حصرية نشطة</h2>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto rounded-full" />
        </div>

        <div className="space-y-8">
          {rfqs.map((rfq, i) => (
            <div 
              key={i}
              className={`group glass-card border-white/5 p-8 rounded-[2.5rem] flex flex-col md:flex-row justify-between items-center gap-10 hover:bg-white/10 transition-all duration-700 cursor-pointer ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="text-right flex-1">
                <div className="flex items-center justify-end gap-4 mb-4">
                  {rfq.urgent && <span className="bg-burgundy/20 text-burgundy text-[10px] px-3 py-1 rounded-full flex items-center gap-1.5 animate-pulse font-black uppercase tracking-widest"><Clock className="w-3.5 h-3.5"/> تنتهي قريباً</span>}
                  <span className="text-gold text-[10px] font-black tracking-[0.2em] uppercase bg-gold/10 px-3 py-1 rounded-full">{rfq.timer} متبقي</span>
                </div>
                <h3 className="text-2xl font-black mb-3 group-hover:text-gold transition-colors">{rfq.title}</h3>
                <div className="flex items-center justify-end gap-6 text-white/40 text-xs font-bold">
                   <span className="flex items-center gap-2"><Users className="w-4 h-4" /> {rfq.buyer}</span>
                   <span className="flex items-center gap-2"><Grid className="w-4 h-4" /> {rfq.qty}</span>
                </div>
              </div>
              <Button variant="premium" size="lg">الرد على العرض</Button>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
           <Link href="/rfq" className="text-gold hover:text-gold-light transition-all font-black text-sm uppercase tracking-widest border-b-2 border-gold/20 pb-2 hover:border-gold">عرض كافة الطلبات ↗</Link>
        </div>
      </div>
    </section>
  );
};

// ─── Section: Testimonials (شهادات العملاء) ───────────────────────────
const Testimonials = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-20">
          {[
            { text: "خامة غيرت مفهوم التوريد لدينا. الجودة والسرعة في الوصول للموردين المعتمدين كانت مفاجئة.", name: "ياسين بركاني", role: "مدير المشتريات، زارا (شمال أفريقيا)" },
            { text: "كمصممة، أبحث دائماً عن الخامات الفريدة. خامة هي بوصلتي لاستكشاف كنوز النسيج في منطقتنا.", name: "ليلى المنصوري", role: "مصممة أزياء، هيرميس (مستشارة)" },
            { text: "منصة احترافية تليق بمستوى التحديات العالمية. لقد فتحت لنا أبواباً للتصدير لم نكن نتخيلها.", name: "أحمد بن عيسى", role: "الرئيس التنفيذي، مطاحن أحمد" }
          ].map((t, i) => (
            <div 
              key={i} 
              className={`text-right space-y-10 transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
              style={{ transitionDelay: `${i * 200}ms` }}
            >
              <div className="relative">
                <MessageSquare className="w-16 h-16 text-gold/10 ml-auto" />
                <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 text-4xl text-gold font-serif opacity-30">“</div>
              </div>
              <p className="text-3xl font-black italic text-navy leading-tight">"{t.text}"</p>
              <div className="pt-4 border-r-4 border-gold pr-6">
                <h4 className="font-black text-gold text-lg">{t.name}</h4>
                <p className="text-[10px] text-navy/40 uppercase tracking-[0.2em] mt-2 font-black">{t.role}</p>
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
    <footer className="bg-navy text-cream pt-32 pb-16 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-30" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-20 mb-32 text-right">
          <div className="space-y-8">
             <div className="flex justify-end gap-4 items-center">
                <span className="text-4xl font-black tracking-tighter text-gold">خامة</span>
                <div className="w-10 h-10 border-2 border-gold flex items-center justify-center font-black text-sm text-gold rounded-xl">KH</div>
             </div>
             <p className="text-cream/40 text-base leading-relaxed font-medium">
               المنصة المتكاملة لإدارة سلاسل التوريد والابتكار في عالم المنسوجات والأزياء الراقية في أفريقيا.
             </p>
             <div className="flex justify-end gap-6 text-gold/60">
                {['Linkedin', 'Instagram', 'Twitter'].map(social => (
                   <span key={social} className="hover:text-gold cursor-pointer transition-colors font-black text-[10px] uppercase tracking-widest">{social}</span>
                ))}
             </div>
          </div>

          {[
            { title: 'المنصة', links: ['الكتالوج', 'سوق الموردين', 'طلبات العروض', 'حلول الأعمال'] },
            { title: 'المصادر', links: ['أكاديمية خامة', 'تقارير السوق', 'دليل المنسوجات', 'الفعاليات'] },
            { title: 'قانوني', links: ['الشروط والأحكام', 'سياسة الخصوصية', 'حقوق الملكية', 'اتصل بنا'] }
          ].map((col, i) => (
            <div key={i} className="space-y-8">
              <h4 className="font-black text-gold uppercase tracking-[0.3em] text-xs">{col.title}</h4>
              <ul className="space-y-5">
                {col.links.map(link => (
                  <li key={link} className="text-sm text-cream/40 hover:text-gold transition-colors cursor-pointer font-black">{link}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-16 flex flex-col md:flex-row justify-between items-center gap-10 text-white/30 text-[10px] font-black tracking-[0.3em] uppercase">
          <div className="flex gap-12">
             <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-gold"/> ISO 9001:2015 CERTIFIED</span>
             <span className="flex items-center gap-2"><Globe className="w-4 h-4 text-gold"/> GOTS COMPLIANT</span>
          </div>
          <p>© 2026 خامة للمنسوجات. صمم للتميز.</p>
        </div>
      </div>
    </footer>
  );
};

// ─── Final HomeSections Assembler ────────────────────────────────────
export default function HomeSections() {
  return (
    <div className="bg-cream">
      <TrendsSection />
      <NewSuppliers />
      <MarketDashboard />
      <ActiveRFQs />
      <Testimonials />
      <Footer />
    </div>
  );
}
