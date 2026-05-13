'use client';

import React, { useState, useEffect } from 'react';
import { 
  Download, Share2, Heart, Star, MapPin, 
  Wind, Droplets, Shield, Thermometer,
  ChevronRight, ArrowLeft, MessageSquare, 
  Calendar, Package, Info, CheckCircle
} from 'lucide-react';
import Link from 'next/link';
import SEOHead, { getProductSchema } from '@/components/SEOHead';

// ─── Sub-Components & Sections ──────────────────────────────────────────────

const TabButton = ({ active, label, onClick }: { active: boolean, label: string, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`pb-4 px-2 text-label transition-all relative ${active ? 'text-gold border-b-2 border-gold' : 'text-muted hover:text-charcoal'}`}
  >
    {label}
  </button>
);

const TechItem = ({ label, value, icon: Icon }: { label: string, value: string, icon: any }) => (
  <div className="flex items-center gap-4 p-4 bg-ecru/20 rounded-xl border border-ecru/50">
    <div className="p-2 bg-white rounded-lg text-burgundy shadow-sm">
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <p className="text-[10px] text-muted uppercase font-bold tracking-widest">{label}</p>
      <p className="text-body font-bold text-charcoal">{value}</p>
    </div>
  </div>
);

// ─── Main Page Component ───────────────────────────────────────────────────

export default function FabricDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState('tech');
  const [quantity, setQuantity] = useState(500);
  const [mainImage, setMainImage] = useState('https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=1200&auto=format&fit=crop');

  const fabricData = {
    id: params.id,
    name: 'Sergé de Soie Lyonnaise',
    price: '24.50',
    image: mainImage,
    supplier: 'نسيج ليون - Lyon Textiles',
    composition: '100% Soie Naturelle',
    gsm: '120'
  };

  return (
    <div className="min-h-screen bg-white font-body pt-24 pb-20">
      <SEOHead type="Product" data={getProductSchema(fabricData)} />
      
      {/* ─── Breadcrumb ─── */}
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-2 text-caption text-muted" dir="rtl">
        <Link href="/" className="hover:text-gold transition-colors">الرئيسية</Link>
        <ChevronRight className="w-3 h-3 rotate-180" />
        <Link href="/cat" className="hover:text-gold transition-colors">كتالوج الأقمشة</Link>
        <ChevronRight className="w-3 h-3 rotate-180" />
        <span className="text-charcoal font-medium">Sergé de Soie Lyonnaise</span>
      </nav>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* ─── Section 1: Visual Gallery (Col 7) ─── */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-ecru group cursor-crosshair">
            <img 
              src={mainImage} 
              alt="Fabric focus" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-150"
            />
            <div className="absolute top-6 left-6 flex flex-col gap-3">
              <button className="p-3 bg-white/90 backdrop-blur rounded-full shadow-xl text-burgundy hover:bg-burgundy hover:text-white transition-all">
                <Download className="w-5 h-5" />
              </button>
              <button className="p-3 bg-white/90 backdrop-blur rounded-full shadow-xl text-burgundy hover:bg-burgundy hover:text-white transition-all">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
            <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-lg text-[10px] font-bold uppercase tracking-widest text-charcoal">
               Zoom Loupe Actif
            </div>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
            {[1,2,3,4].map(i => (
              <button 
                key={i}
                className="w-24 h-24 rounded-xl overflow-hidden border-2 border-transparent hover:border-gold transition-all shrink-0"
                onClick={() => setMainImage(`https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=800&auto=format&fit=crop&idx=${i}`)}
              >
                <img src={`https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=200&auto=format&fit=crop&idx=${i}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* ─── Section 2 & 4: Info & Commercial (Col 5) ─── */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          
          <div dir="rtl">
            <span className="text-label text-gold mb-2 block tracking-widest uppercase">مجموعة ربيع 2026 • SS26</span>
            <h1 className="text-display !text-4xl mb-2">Sergé de Soie Lyonnaise</h1>
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-ecru px-3 py-1 rounded-md font-mono text-[10px] text-muted border border-border/50">REF: SL-2026-001</span>
              <div className="flex items-center gap-1 text-gold">
                <Star className="w-4 h-4 fill-gold" />
                <span className="text-body-small font-bold">4.8</span>
                <span className="text-[11px] text-muted">(47 تقييم)</span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl border border-border/40">
               <div className="w-10 h-10 rounded-full bg-ecru flex items-center justify-center text-burgundy font-bold">TL</div>
               <div>
                  <p className="text-body-small font-bold text-charcoal">Tissage de Lyon <CheckCircle className="w-3 h-3 inline text-success" /></p>
                  <p className="text-[10px] text-muted flex items-center gap-1"><MapPin className="w-3 h-3" /> Lyon, France</p>
               </div>
               <button className="mr-auto text-label text-burgundy underline">ملف المورد</button>
            </div>
          </div>

          {/* Pricing & Order Block */}
          <div className="bg-white border-2 border-burgundy/10 rounded-3xl p-6 shadow-sm" dir="rtl">
            <div className="flex justify-between items-end mb-6">
              <div>
                <p className="text-label text-muted mb-1">السعر للمتر</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-display !text-3xl text-burgundy">{pricePerMeter.toFixed(2)}</span>
                  <span className="text-body-small text-muted font-bold">€ / متر</span>
                </div>
              </div>
              <div className="text-left">
                <span className="bg-success/10 text-success text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                  في المخزن (3,200م)
                </span>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="text-label text-charcoal block mb-2">الكمية المطلوبة (أمتار)</label>
                <input 
                  type="number" 
                  value={quantity} 
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="w-full bg-ecru/30 border-2 border-ecru rounded-xl px-4 py-3 outline-none focus:border-gold transition-all font-bold"
                />
              </div>
              <div className="flex justify-between p-3 bg-ecru/20 rounded-xl">
                 <span className="text-body-small text-muted">الإجمالي التقديري</span>
                 <span className="text-body font-bold text-charcoal">{(quantity * pricePerMeter).toLocaleString()} €</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
               <button className="bg-burgundy text-white py-4 rounded-xl text-label hover:bg-gold transition-all shadow-lg shadow-burgundy/20">
                  طلب عينات (Free)
               </button>
               <button className="bg-white border-2 border-burgundy text-burgundy py-4 rounded-xl text-label hover:bg-burgundy hover:text-white transition-all">
                  إضافة للبحث
               </button>
            </div>
            
            <button className="w-full bg-gold text-white py-4 rounded-xl text-label font-bold flex items-center justify-center gap-3 hover:bg-charcoal transition-all">
               <MessageSquare className="w-5 h-5" /> تواصل مع المورد للتفاوض
            </button>
          </div>

        </div>
      </div>

      {/* ─── Section 3: Technical Tabs ─── */}
      <div className="max-w-7xl mx-auto px-4 mt-16 border-t border-border pt-12">
        <div className="flex gap-8 border-b border-border mb-10 overflow-x-auto no-scrollbar" dir="rtl">
          <TabButton active={activeTab === 'tech'} label="المواصفات الفيزيائية" onClick={() => setActiveTab('tech')} />
          <TabButton active={activeTab === 'comp'} label="التركيبة والهيكل" onClick={() => setActiveTab('comp')} />
          <TabButton active={activeTab === 'eco'} label="الاستدامة والمنشأ" onClick={() => setActiveTab('eco')} />
          <TabButton active={activeTab === 'care'} label="تعليمات العناية" onClick={() => setActiveTab('care')} />
        </div>

        <div className="min-h-[400px]">
          {activeTab === 'tech' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <TechItem label="الجراماج (GSM)" value="285 g/m² (±5%)" icon={Wind} />
              <TechItem label="العرض (Laize)" value="150 cm" icon={ArrowLeft} />
              <TechItem label="السماكة" value="0.85 mm" icon={Shield} />
              <TechItem label="تقلص الغسيل" value="< 2.0%" icon={Droplets} />
              <TechItem label="مقاومة الشد" value="450 N / 5cm" icon={Thermometer} />
              <TechItem label="ثبات اللون" value="4.5 / 5.0" icon={Info} />
            </div>
          )}

          {activeTab === 'comp' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" dir="rtl">
              <div className="flex flex-col gap-8">
                <h3 className="text-subheading">توزيع الألياف</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-body-small font-bold">حرير طبيعي (Soie)</span>
                      <span className="text-gold font-bold">95%</span>
                    </div>
                    <div className="h-2 w-full bg-ecru rounded-full overflow-hidden">
                      <div className="h-full bg-gold w-[95%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-body-small font-bold">ليكرا (Élasthanne)</span>
                      <span className="text-burgundy font-bold">5%</span>
                    </div>
                    <div className="h-2 w-full bg-ecru rounded-full overflow-hidden">
                      <div className="h-full bg-burgundy w-[5%]" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-ecru/30 p-8 rounded-3xl border border-ecru flex flex-col items-center text-center">
                <div className="w-32 h-32 mb-6 border-4 border-gold rounded-xl flex items-center justify-center text-gold">
                   {/* Placeholder for Armure SVG */}
                   <span className="text-[10px] font-bold">SCHEMA<br/>ARMURE</span>
                </div>
                <h4 className="font-bold text-charcoal mb-2">نوع النسيج: سرجيه (Sergé 2/1)</h4>
                <p className="text-body-small text-muted">نسيج قطني طويل يتميز بخطوط قطرية تمنحه القوة والمرونة الفائقة.</p>
              </div>
            </div>
          )}

          {activeTab === 'eco' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8" dir="rtl">
               <div className="p-6 bg-success/5 rounded-2xl border border-success/20">
                  <h4 className="text-success font-bold mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5" /> الشهادات المعتمدة
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {['GOTS (2025)', 'OEKO-TEX Std 100', 'ISO 9001'].map(c => (
                      <span key={c} className="bg-white px-3 py-1.5 rounded-lg text-[10px] font-bold text-success border border-success/10">{c}</span>
                    ))}
                  </div>
               </div>
               <div className="p-6 bg-ecru/30 rounded-2xl border border-ecru">
                  <h4 className="text-charcoal font-bold mb-4">الأثر الكربوني التقديري</h4>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-charcoal">4.2</span>
                    <span className="text-caption text-muted">kg CO₂e / m</span>
                  </div>
                  <p className="text-[10px] text-muted mt-2">محسوب بناءً على معايير النقل المباشر من ليون.</p>
               </div>
               <div className="p-6 bg-ecru/30 rounded-2xl border border-ecru">
                  <h4 className="text-charcoal font-bold mb-4">تتبع المنشأ</h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-gold" />
                      <p className="text-body-small font-medium">زراعة الألياف: <span className="text-muted">الهند</span></p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-gold" />
                      <p className="text-body-small font-medium">الغزل والنسيج: <span className="text-muted">فرنسا</span></p>
                    </div>
                  </div>
               </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
