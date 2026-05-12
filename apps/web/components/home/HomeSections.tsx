'use client';

import React, { useEffect, useRef } from 'react';
import { 
  TrendingUp, ArrowRight, ArrowUpRight, ArrowDownRight, 
  Clock, CheckCircle, Quote, Mail, Linkedin, Instagram, Twitter,
  Zap, Package, Globe, BarChart, Factory
} from 'lucide-react';

// ─── Sub-Components & Data ──────────────────────────────────────────────────

const SectionTitle = ({ title, subtitle, light = false }: any) => (
  <div className={`mb-12 ${light ? 'text-white' : 'text-charcoal'}`} dir="rtl">
    <h2 className="text-display !text-3xl md:text-4xl mb-3">{title}</h2>
    <p className={`text-body-small opacity-70 max-w-2xl ${light ? 'text-ecru' : 'text-muted'}`}>{subtitle}</p>
  </div>
);

// ─── 1. Editorial Trends Section ────────────────────────────────────────────
const EditorialTrends = () => (
  <section className="bg-charcoal py-24 overflow-hidden" dir="rtl">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className="relative group overflow-hidden rounded-3xl aspect-[16/9] lg:aspect-square shadow-2xl">
        <img 
          src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1200&auto=format&fit=crop" 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          alt="Trends 2026"
        />
        <div className="absolute inset-0 bg-burgundy/20" />
      </div>
      <div className="flex flex-col gap-8 pr-0 lg:pr-12">
        <span className="text-gold text-label tracking-[0.3em] uppercase">تغطية خاصة • خريف وشتاء 2026</span>
        <h2 className="text-display !text-5xl text-white leading-tight">سحر الصوف والنسيج المستدام</h2>
        <p className="text-body text-ecru/70 leading-relaxed max-w-lg">
          نشهد هذا الموسم عودة قوية للألياف الطبيعية الكثيفة. التويد والويل يعيدان تعريف الأناقة البسيطة، مع التركيز على التقنيات الصديقة للبيئة في الصباغة. اكتشف مجموعتنا المختارة من المنسوجات التي تجمع بين الدفء التقليدي واللمسات العصرية الفاخرة.
        </p>
        <div className="flex flex-wrap gap-3">
          {['تويد', 'مخمل', 'صوف بكر', 'جلد نباتي'].map(t => (
            <span key={t} className="px-4 py-1 border border-white/20 text-white text-[11px] rounded-full hover:bg-gold hover:border-gold transition-all cursor-pointer">
              # {t}
            </span>
          ))}
        </div>
        <button className="flex items-center gap-3 text-gold font-bold hover:gap-5 transition-all text-label mt-4">
          اكتشف اتجاهات الموسم <ArrowRight className="w-4 h-4 rotate-180" />
        </button>
      </div>
    </div>
  </section>
);

// ─── 2. Market Dashboard Section ───────────────────────────────────────────
const MarketDashboard = () => (
  <section className="py-20 bg-gray-50 border-y border-border" dir="rtl">
    <div className="max-w-7xl mx-auto px-4">
      <SectionTitle title="لوحة بيانات السوق" subtitle="أسعار المواد الخام والمؤشرات العالمية المحدثة يومياً." />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'القطن (NY Cash)', price: '82.40', unit: 'USD/lb', trend: '+2.3%', dir: 'up' },
          { label: 'البوليستر (PTA)', price: '124.5', unit: 'USD/MT', trend: '-0.8%', dir: 'down' },
          { label: 'الصوف الأسترالي', price: '1,420', unit: 'AUD/kg', trend: '+1.1%', dir: 'up' },
          { label: 'الحرير الخام', price: '480', unit: 'CNY/kg', trend: '+0.5%', dir: 'up' },
        ].map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-border shadow-sm flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span className="text-body-small font-bold text-charcoal">{item.label}</span>
              <BarChart className="w-4 h-4 text-muted" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-burgundy">{item.price}</span>
              <span className="text-[10px] text-muted">{item.unit}</span>
            </div>
            <div className={`flex items-center gap-1 text-[10px] font-bold ${item.dir === 'up' ? 'text-success' : 'text-red-500'}`}>
              {item.dir === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              {item.trend}
            </div>
          </div>
        ))}
      </div>
      <p className="text-center text-[10px] text-muted mt-8 uppercase tracking-widest italic">
        بيانات استرشادية — تحديث يومي من البورصات العالمية
      </p>
    </div>
  </section>
);

// ─── 3. RFQs Section ───────────────────────────────────────────────────────
const ActiveRFQs = () => (
  <section className="py-24 bg-white" dir="rtl">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12">
        <SectionTitle title="طلبات عروض الأسعار النشطة" subtitle="فرص تجارية فورية من كبار المشترين والمصانع." />
        <button className="bg-burgundy text-white px-6 py-3 rounded-xl text-label mb-12 hover:bg-gold transition-all">
          عرض جميع الطلبات
        </button>
      </div>
      <div className="space-y-4">
        {[
          { buyer: 'مجموعة أزياء فرنسية', qty: '5,000m', item: 'صوف كشمير ناعم', time: '3 ساعات', urgent: true },
          { buyer: 'مصنع ملابس جاهزة (DZ)', qty: '12,000m', item: 'قطن بوبلين 120 GSM', time: 'يومان', urgent: false },
          { buyer: 'مشغل تصميم (IT)', qty: '450m', item: 'حرير جاكارد مطرز', time: '5 أيام', urgent: false },
        ].map((rfq, i) => (
          <div key={i} className="flex flex-col md:flex-row items-center gap-6 p-6 border border-border rounded-2xl hover:border-gold transition-all group">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${rfq.urgent ? 'bg-red-50 text-red-500' : 'bg-gold/10 text-gold'}`}>
              <Zap className="w-6 h-6" />
            </div>
            <div className="flex-1 text-center md:text-right">
              <h4 className="text-body font-bold text-charcoal">{rfq.item}</h4>
              <p className="text-body-small text-muted">{rfq.buyer} • الكمية: {rfq.qty}</p>
            </div>
            <div className="flex flex-col items-center md:items-end gap-2">
              <span className={`text-[10px] font-bold flex items-center gap-1 ${rfq.urgent ? 'text-red-500' : 'text-gold'}`}>
                <Clock className="w-3 h-3" /> تنتهي خلال: {rfq.time}
              </span>
              <button className="text-label text-burgundy font-bold group-hover:text-gold transition-colors">
                أرسل عرضك الآن ←
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─── 4. Testimonials Section ──────────────────────────────────────────────
const Testimonials = () => (
  <section className="py-24 bg-ecru/20" dir="rtl">
    <div className="max-w-7xl mx-auto px-4">
      <SectionTitle title="قالوا عن خامة" subtitle="شهادات من قادة الصناعة والمبدعين الذين يثقون بمنصتنا." />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {[
          { name: 'أحمد مولين', role: 'مدير مصنع نسيج', quote: 'خامة غيرت الطريقة التي نتواصل بها مع الموردين. الآن نصل لأجود الخامات بضغطة زر.' },
          { name: 'ليلى بن حاج', role: 'مصممة أزياء', quote: 'التفاصيل التقنية المتوفرة في الكتالوج مذهلة وتوفر علي الكثير من الوقت في اختيار الأقمشة.' },
          { name: 'جان فيليب', role: 'مكتب مشتريات (ليون)', quote: 'سرعة الاستجابة لطلبات عروض الأسعار هي ما جعلنا نعتمد خامة كشريك أساسي.' }
        ].map((t, i) => (
          <div key={i} className="flex flex-col gap-6 p-8 bg-white rounded-3xl shadow-sm border border-border/50">
            <Quote className="w-10 h-10 text-gold opacity-20" />
            <p className="text-body-small italic leading-relaxed text-charcoal">"{t.quote}"</p>
            <div className="flex items-center gap-3 mt-4 border-t border-ecru pt-4">
              <div className="w-10 h-10 bg-ecru rounded-full" />
              <div>
                <p className="text-[11px] font-bold text-charcoal">{t.name}</p>
                <p className="text-[9px] text-muted">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─── 5. Footer Section ────────────────────────────────────────────────────
export const Footer = () => (
  <footer className="bg-charcoal pt-20 pb-10 text-white" dir="rtl">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-white/5 pb-16">
      <div className="flex flex-col gap-6">
        <h2 className="text-display !text-3xl text-gold">خامة</h2>
        <p className="text-body-small text-ecru/60 leading-relaxed">
          المنصة الأولى المتخصصة في تجارة الأقمشة والمنسوجات في إفريقيا والشرق الأوسط. نصل بين الإبداع والصناعة.
        </p>
        <div className="flex gap-4">
          <Linkedin className="w-5 h-5 text-ecru hover:text-gold transition-colors cursor-pointer" />
          <Instagram className="w-5 h-5 text-ecru hover:text-gold transition-colors cursor-pointer" />
          <Twitter className="w-5 h-5 text-ecru hover:text-gold transition-colors cursor-pointer" />
        </div>
      </div>
      <div>
        <h4 className="text-label text-white mb-6 uppercase tracking-widest">المنصة</h4>
        <ul className="flex flex-col gap-4 text-body-small text-ecru/60">
          <li className="hover:text-gold cursor-pointer transition-colors">كتالوج المنتجات</li>
          <li className="hover:text-gold cursor-pointer transition-colors">سوق الموردين</li>
          <li className="hover:text-gold cursor-pointer transition-colors">طلبات عروض الأسعار</li>
          <li className="hover:text-gold cursor-pointer transition-colors">أكاديمية خامة</li>
        </ul>
      </div>
      <div>
        <h4 className="text-label text-white mb-6 uppercase tracking-widest">الموارد</h4>
        <ul className="flex flex-col gap-4 text-body-small text-ecru/60">
          <li className="hover:text-gold cursor-pointer transition-colors">مدونة المنسوجات</li>
          <li className="hover:text-gold cursor-pointer transition-colors">دليل الشهادات</li>
          <li className="hover:text-gold cursor-pointer transition-colors">المساعدة والدعم</li>
          <li className="hover:text-gold cursor-pointer transition-colors">سياسة الخصوصية</li>
        </ul>
      </div>
      <div className="flex flex-col gap-6">
        <h4 className="text-label text-white mb-2 uppercase tracking-widest">النشرة الإخبارية</h4>
        <p className="text-body-small text-ecru/60 leading-relaxed">احصل على آخر اتجاهات الموضة والمنسوجات أسبوعياً.</p>
        <div className="relative">
          <input 
            type="email" 
            placeholder="بريدك الإلكتروني" 
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-gold transition-all text-body-small"
          />
          <button className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-gold text-white rounded-lg">
            <Mail className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-ecru/40 uppercase tracking-[0.2em]">
       <p>© 2026 KHAMA TEXTILE PRO. جميع الحقوق محفوظة.</p>
       <div className="flex gap-6">
          <span>ISO 9001:2015</span>
          <span>OEKO-TEX CERTIFIED</span>
          <span>MADE IN AFRICA ✦</span>
       </div>
    </div>
  </footer>
);

// ─── Main Component Assembly ─────────────────────────────────────────────────
export default function HomeSections() {
  return (
    <>
      <EditorialTrends />
      <MarketDashboard />
      <ActiveRFQs />
      <Testimonials />
      <Footer />
    </>
  );
}
