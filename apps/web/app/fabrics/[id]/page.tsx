'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ChevronRight, Star, ShieldCheck, Info, 
  ShoppingCart, MessageSquare, FileText, 
  Share2, Mail, Link as LinkIcon, ExternalLink,
  MapPin, Globe, ArrowLeft, ZoomIn, Maximize2
} from 'lucide-react';
import { FabricDetail } from '@/types/fabric';

// Mock Data for the Fabric
const MOCK_DETAIL: FabricDetail = {
  id: 'f1',
  nameAr: 'حرير ساتان ملكي - كريمي',
  nameFr: 'Satin de Soie Royal - Crème',
  reference: 'SK-2024-001',
  description: 'قماش حرير ساتان فاخر بلمعة لؤلؤية، مثالي لفساتين السهرة الراقية والأزياء الفاخرة.',
  longDescription: 'يعتبر هذا الحرير من أفخم الأنواع المتوفرة في السوق، حيث يتميز بكثافة خيوط عالية ووزن مثالي يمنحه انسيابية استثنائية. تمت معالجته بتقنيات صديقة للبيئة لضمان ثبات اللون ونعومة الملمس.',
  images: [
    'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1571513722275-4b41940f54b8?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1524230572899-a752b3835840?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1584290867415-527a8475726d?q=80&w=800&auto=format&fit=crop'
  ],
  collection: 'SS26',
  certifications: [
    { type: 'GOTS', name: 'GOTS Certified', description: 'المعيار العالمي للمنسوجات العضوية يضمن بيئة إنتاج مستدامة.', image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=100&auto=format&fit=crop' },
    { type: 'OEKO-TEX', name: 'OEKO-TEX Standard 100', description: 'يضمن خلو المنتج من المواد الكيميائية الضارة بالصحة.', image: 'https://images.unsplash.com/photo-1571513722275-4b41940f54b8?q=80&w=100&auto=format&fit=crop' }
  ],
  sustainabilityScore: 4.8,
  createdAt: '2024-01-15',
  supplier: {
    id: 's1',
    name: 'مجموعة الأطلس للنسيج',
    avatar: 'https://i.pravatar.cc/150?u=atlas',
    isVerified: true,
    rating: 4.9,
    totalProducts: 142,
    location: 'سطيف، الجزائر',
    country: 'Algeria',
    flag: '🇩🇿',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=200&auto=format&fit=crop'
  },
  composition: [
    { fiber: 'حرير طبيعي', percentage: 95, color: '#C9A84C' },
    { fiber: 'إيلاستين', percentage: 5, color: '#9E8E7E' }
  ],
  technicalSpecs: {
    gsm: 120,
    width: 145,
    weave: 'Satin (ساتان)',
    weaveImage: 'https://images.unsplash.com/photo-1524230572899-a752b3835840?q=80&w=200&auto=format&fit=crop',
    density: '80 خيط/سم',
    shrinkage: '1-2%',
    martindale: 25000,
    colorFastness: '4-5 (ممتاز)',
    colorsAvailable: [
      { hex: '#F5F0E8', name: 'كريمي' },
      { hex: '#0D0C0A', name: 'أسود' },
      { hex: '#8B6914', name: 'ذهبي' },
      { hex: '#2D3561', name: 'كحلي' }
    ]
  },
  commercial: {
    price: 45.00,
    currency: 'USD',
    unit: 'متر',
    moq: 10,
    stockStatus: 'IN_STOCK',
    leadTimeWeeks: 2,
    pricingTiers: [
      { minQuantity: 10, price: 45.00 },
      { minQuantity: 50, price: 42.50 },
      { minQuantity: 100, price: 38.00 },
      { minQuantity: 500, price: 32.00 }
    ]
  }
};

export default function FabricDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(MOCK_DETAIL.commercial.moq);

  return (
    <div className="min-h-screen bg-off-white pb-20 overflow-x-hidden" dir="rtl">
      {/* ── Breadcrumb ───────────────────────────────────────────── */}
      <div className="bg-white border-b border-ecru py-4 px-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center gap-3 text-xs font-bold text-muted uppercase tracking-widest overflow-x-auto no-scrollbar">
          <Link href="/" className="hover:text-gold transition-colors">الرئيسية</Link>
          <ChevronRight className="w-3 h-3 flex-shrink-0" />
          <Link href="/fabrics" className="hover:text-gold transition-colors">الأقمشة</Link>
          <ChevronRight className="w-3 h-3 flex-shrink-0" />
          <Link href="#" className="hover:text-gold transition-colors">حرير</Link>
          <ChevronRight className="w-3 h-3 flex-shrink-0" />
          <span className="text-charcoal truncate">{MOCK_DETAIL.nameAr}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* ── Left Column: Gallery ─────────────────────────────── */}
          <div className="space-y-6">
            <div className="relative group rounded-[2.5rem] overflow-hidden bg-white shadow-2xl aspect-[4/5] md:aspect-square">
               <img 
                 src={MOCK_DETAIL.images[selectedImage]} 
                 alt={MOCK_DETAIL.nameAr} 
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 cursor-zoom-in"
               />
               <div className="absolute top-6 left-6 flex flex-col gap-3">
                  <button className="p-3 bg-white/90 backdrop-blur rounded-2xl shadow-xl hover:bg-gold hover:text-white transition-all">
                     <Maximize2 className="w-5 h-5" />
                  </button>
                  <button className="p-3 bg-white/90 backdrop-blur rounded-2xl shadow-xl hover:bg-gold hover:text-white transition-all">
                     <ZoomIn className="w-5 h-5" />
                  </button>
               </div>
               <div className="absolute bottom-6 right-6">
                  <span className="px-4 py-2 bg-charcoal/80 backdrop-blur text-white text-[10px] font-black rounded-full uppercase tracking-widest">
                    360° View
                  </span>
               </div>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
               {MOCK_DETAIL.images.map((img, i) => (
                 <button 
                   key={i} 
                   onClick={() => setSelectedImage(i)}
                   className={`relative w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden border-2 transition-all ${selectedImage === i ? 'border-gold shadow-lg scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
                 >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                 </button>
               ))}
            </div>
          </div>

          {/* ── Right Column: Info & Buy ─────────────────────────── */}
          <div className="flex flex-col gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                 <span className="px-3 py-1 bg-gold/10 text-gold text-[10px] font-black rounded-full uppercase tracking-[0.2em]">{MOCK_DETAIL.collection}</span>
                 <span className="text-muted text-xs font-bold">{MOCK_DETAIL.reference}</span>
              </div>
              <h1 className="text-4xl font-black text-charcoal leading-tight">{MOCK_DETAIL.nameAr}</h1>
              <p className="text-xl font-medium text-muted/60 font-body">{MOCK_DETAIL.nameFr}</p>
              
              <div className="flex items-center gap-6 py-4 border-y border-ecru">
                 <div className="flex items-center gap-3 group cursor-pointer">
                    <img src={MOCK_DETAIL.supplier.avatar} className="w-10 h-10 rounded-full border border-ecru" />
                    <div>
                       <div className="flex items-center gap-1">
                          <span className="font-black text-charcoal group-hover:text-gold transition-colors">{MOCK_DETAIL.supplier.name}</span>
                          {MOCK_DETAIL.supplier.isVerified && <ShieldCheck className="w-4 h-4 text-green-500" />}
                       </div>
                       <div className="flex items-center gap-2 text-[10px] font-bold text-muted">
                          <span>{MOCK_DETAIL.supplier.flag} {MOCK_DETAIL.supplier.location}</span>
                          <div className="flex items-center gap-0.5 text-gold">
                             <Star className="w-3 h-3 fill-current" />
                             <span>{MOCK_DETAIL.supplier.rating}</span>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
            </div>

            <div className="space-y-6">
               <div className="flex items-baseline gap-4">
                  <span className="text-5xl font-black text-gold">${MOCK_DETAIL.commercial.price}</span>
                  <span className="text-xl font-bold text-muted">/ {MOCK_DETAIL.commercial.unit}</span>
                  <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-[10px] font-black">الأسعار تنازلية</span>
               </div>

               <div className="bg-white rounded-3xl p-6 border border-ecru shadow-sm space-y-4">
                  <h4 className="text-xs font-black text-charcoal uppercase tracking-widest">جدول الكميات والأسعار</h4>
                  <div className="grid grid-cols-4 gap-2">
                     {MOCK_DETAIL.commercial.pricingTiers.map((tier, i) => (
                       <div key={i} className="text-center p-3 rounded-2xl bg-off-white border border-ecru hover:border-gold/30 transition-all">
                          <p className="text-[10px] font-black text-muted mb-1">{tier.minQuantity}+ {MOCK_DETAIL.commercial.unit}</p>
                          <p className="text-sm font-black text-charcoal">${tier.price}</p>
                       </div>
                     ))}
                  </div>
               </div>
            </div>

            <div className="space-y-6">
               <div className="space-y-3">
                  <h4 className="text-xs font-black text-charcoal uppercase tracking-widest">الألوان المتاحة</h4>
                  <div className="flex gap-4">
                     {MOCK_DETAIL.technicalSpecs.colorsAvailable.map((color, i) => (
                       <button 
                         key={i} 
                         onClick={() => setSelectedColor(i)}
                         className={`group relative flex flex-col items-center gap-2`}
                       >
                          <div 
                            className={`w-12 h-12 rounded-full border-2 transition-all ${selectedColor === i ? 'border-gold p-1 scale-110 shadow-lg' : 'border-transparent'}`}
                          >
                             <div className="w-full h-full rounded-full border border-black/5" style={{ backgroundColor: color.hex }} />
                          </div>
                          <span className={`text-[10px] font-bold transition-colors ${selectedColor === i ? 'text-gold' : 'text-muted'}`}>{color.name}</span>
                       </button>
                     ))}
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                     <label className="text-[10px] font-black text-muted uppercase">الكمية</label>
                     <div className="flex items-center border-2 border-ecru rounded-2xl p-2 bg-white">
                        <button onClick={() => setQuantity(q => Math.max(MOCK_DETAIL.commercial.moq, q - 1))} className="w-10 h-10 flex items-center justify-center font-black text-xl hover:text-gold transition-colors">-</button>
                        <input 
                          type="number" 
                          value={quantity} 
                          onChange={(e) => setQuantity(parseInt(e.target.value) || MOCK_DETAIL.commercial.moq)}
                          className="flex-1 text-center font-black text-charcoal focus:outline-none" 
                        />
                        <button onClick={() => setQuantity(q => q + 1)} className="w-10 h-10 flex items-center justify-center font-black text-xl hover:text-gold transition-colors">+</button>
                     </div>
                  </div>
                  <div className="flex flex-col gap-2">
                     <label className="text-[10px] font-black text-muted uppercase">الإجمالي التقريبي</label>
                     <div className="h-14 flex items-center justify-center font-black text-2xl text-charcoal bg-ecru/30 rounded-2xl">
                        ${(quantity * MOCK_DETAIL.commercial.price).toLocaleString()}
                     </div>
                  </div>
               </div>

               <div className="flex flex-col sm:flex-row gap-4">
                  <button className="flex-1 bg-gold text-charcoal h-16 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-gold-light transition-all shadow-xl shadow-gold/20">
                     <ShoppingCart className="w-6 h-6" />
                     إضافة للسلة
                  </button>
                  <button className="flex-1 bg-charcoal text-white h-16 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-charcoal/90 transition-all">
                     <FileText className="w-6 h-6" />
                     طلب عينة
                  </button>
               </div>

               <button className="w-full border-2 border-charcoal text-charcoal h-16 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-charcoal hover:text-white transition-all group">
                  <MessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  طلب عرض سعر (RFQ)
               </button>
            </div>

            <div className="flex items-center justify-between py-6 border-t border-ecru">
               <div className="flex gap-4">
                  <button className="p-3 bg-ecru/30 rounded-xl hover:bg-gold hover:text-white transition-all"><Share2 className="w-5 h-5" /></button>
                  <button className="p-3 bg-ecru/30 rounded-xl hover:bg-gold hover:text-white transition-all"><Mail className="w-5 h-5" /></button>
                  <button className="p-3 bg-ecru/30 rounded-xl hover:bg-gold hover:text-white transition-all"><LinkIcon className="w-5 h-5" /></button>
               </div>
               <div className="flex items-center gap-2 text-xs font-bold text-muted">
                  <span>المشاركة عبر الواتساب</span>
                  <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform">
                     <Globe className="w-5 h-5" />
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* ── Tabs / Sections ─────────────────────────────────────── */}
        <div className="mt-24 space-y-24">
          
          {/* ── Technical Specs ──────────────────────────────────── */}
          <section className="space-y-12">
             <div className="text-center space-y-4">
                <h2 className="text-4xl font-black text-charcoal">المواصفات التقنية</h2>
                <div className="h-1.5 w-24 bg-gold mx-auto rounded-full" />
             </div>

             <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-ecru">
                   <table className="w-full text-right border-collapse">
                      <tbody>
                         {[
                           { label: 'التركيبة النسيجية', value: MOCK_DETAIL.composition.map(c => `${c.fiber} ${c.percentage}%`).join(' / '), visual: true },
                           { label: 'الوزن (GSM)', value: `${MOCK_DETAIL.technicalSpecs.gsm} جم/م²`, bar: 120/500 * 100 },
                           { label: 'العرض (Laize)', value: `${MOCK_DETAIL.technicalSpecs.width} سم` },
                           { label: 'نوع النسج', value: MOCK_DETAIL.technicalSpecs.weave },
                           { label: 'الكثافة', value: MOCK_DETAIL.technicalSpecs.density },
                           { label: 'الانكماش', value: MOCK_DETAIL.technicalSpecs.shrinkage },
                           { label: 'مقاومة الاحتكاك', value: `${MOCK_DETAIL.technicalSpecs.martindale.toLocaleString()} دورة (Martindale)` },
                           { label: 'ثبات اللون', value: MOCK_DETAIL.technicalSpecs.colorFastness },
                         ].map((spec, i) => (
                           <tr key={i} className={`group hover:bg-ecru/20 transition-colors ${i % 2 === 0 ? 'bg-off-white/50' : 'bg-white'}`}>
                              <td className="p-6 font-bold text-muted text-sm border-l border-ecru flex items-center justify-between">
                                 {spec.label}
                                 <Info className="w-4 h-4 opacity-20 group-hover:opacity-100 transition-opacity cursor-help" />
                              </td>
                              <td className="p-6 font-black text-charcoal text-base">
                                 {spec.visual ? (
                                   <div className="flex flex-col gap-2">
                                      <span>{spec.value}</span>
                                      <div className="flex h-1.5 rounded-full overflow-hidden bg-ecru">
                                         {MOCK_DETAIL.composition.map((c, j) => (
                                           <div key={j} style={{ width: `${c.percentage}%`, backgroundColor: c.color }} />
                                         ))}
                                      </div>
                                   </div>
                                 ) : spec.bar ? (
                                    <div className="flex flex-col gap-2">
                                      <span>{spec.value}</span>
                                      <div className="h-1.5 rounded-full bg-ecru overflow-hidden">
                                         <div className="h-full bg-gold" style={{ width: `${spec.bar}%` }} />
                                      </div>
                                   </div>
                                 ) : (
                                   spec.value
                                 )}
                              </td>
                           </tr>
                         ))}
                      </tbody>
                   </table>
                </div>

                <div className="space-y-8">
                   <div className="relative rounded-[3rem] overflow-hidden aspect-video shadow-2xl group">
                      <img src={MOCK_DETAIL.technicalSpecs.weaveImage} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent flex items-end p-8">
                         <div className="text-white space-y-2">
                            <span className="text-[10px] font-black text-gold uppercase tracking-widest">Micro-Shot</span>
                            <h4 className="text-2xl font-black">رؤية مكبرة للنسيج</h4>
                            <p className="text-white/60 text-sm">يوضح هذا التصوير المجهري دقة النسج وانتظام الخيوط.</p>
                         </div>
                      </div>
                   </div>
                   
                   <div className="grid grid-cols-2 gap-6">
                      <div className="bg-white p-6 rounded-3xl border border-ecru shadow-sm space-y-3">
                         <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center text-gold">
                            <Star className="w-5 h-5 fill-current" />
                         </div>
                         <h5 className="font-black text-charcoal text-sm">Martindale</h5>
                         <p className="text-[10px] text-muted font-bold leading-relaxed">تحمل عالٍ للاحتكاك يضمن بقاء المنتج لفترات طويلة.</p>
                      </div>
                      <div className="bg-white p-6 rounded-3xl border border-ecru shadow-sm space-y-3">
                         <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center text-gold">
                            <ShieldCheck className="w-5 h-5" />
                         </div>
                         <h5 className="font-black text-charcoal text-sm">Color Fastness</h5>
                         <p className="text-[10px] text-muted font-bold leading-relaxed">ثبات ألوان فائق حتى بعد الغسيل المتكرر أو التعرض للضوء.</p>
                      </div>
                   </div>
                </div>
             </div>
          </section>

          {/* ── Certifications ───────────────────────────────────── */}
          <section className="space-y-12">
             <div className="text-center space-y-4">
                <h2 className="text-4xl font-black text-charcoal">الشهادات والمعايير</h2>
                <div className="h-1.5 w-24 bg-gold mx-auto rounded-full" />
             </div>

             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {MOCK_DETAIL.certifications.map((cert, i) => (
                  <div key={i} className="bg-white p-10 rounded-[3rem] border border-ecru shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all group text-center space-y-6">
                     <div className="w-24 h-24 bg-ecru rounded-full mx-auto flex items-center justify-center overflow-hidden grayscale group-hover:grayscale-0 transition-all">
                        <img src={cert.image} className="w-full h-full object-cover" />
                     </div>
                     <h4 className="text-xl font-black text-charcoal">{cert.name}</h4>
                     <p className="text-xs text-muted font-bold leading-relaxed">{cert.description}</p>
                     <button className="text-[10px] font-black text-gold border-b border-gold pb-1 uppercase tracking-widest">عرض الوثيقة</button>
                  </div>
                ))}
             </div>
          </section>

          {/* ── Supplier Profile ─────────────────────────────────── */}
          <section className="bg-charcoal rounded-[4rem] p-12 md:p-20 relative overflow-hidden text-white">
             <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
             
             <div className="grid lg:grid-cols-2 gap-16 relative z-10 items-center">
                <div className="space-y-8">
                   <div className="flex items-center gap-6">
                      <div className="w-24 h-24 bg-white rounded-3xl p-4 flex items-center justify-center shadow-2xl">
                         <img src={MOCK_DETAIL.supplier.logo} className="max-w-full" />
                      </div>
                      <div className="space-y-2">
                         <div className="flex items-center gap-2">
                            <h2 className="text-3xl font-black">{MOCK_DETAIL.supplier.name}</h2>
                            <ShieldCheck className="w-6 h-6 text-green-500" />
                         </div>
                         <div className="flex items-center gap-4 text-gold-light/40 font-bold text-sm">
                            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {MOCK_DETAIL.supplier.location}</span>
                            <span className="bg-white/5 px-3 py-1 rounded-full">{MOCK_DETAIL.supplier.totalProducts} منتج</span>
                         </div>
                      </div>
                   </div>

                   <p className="text-lg text-white/60 leading-relaxed max-w-xl">
                     تعد مجموعة الأطلس من الرواد في صناعة النسيج الفاخر في شمال أفريقيا، بخبرة تمتد لأكثر من 30 عاماً في توريد أجود أنواع الحرير والقطن للماركات العالمية.
                   </p>

                   <div className="flex gap-4">
                      <button className="bg-gold text-charcoal px-8 py-4 rounded-2xl font-black hover:bg-gold-light transition-all">زيارة المتجر</button>
                      <button className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-2xl font-black hover:bg-white/10 transition-all flex items-center gap-2">
                         <MessageSquare className="w-5 h-5" />
                         تواصل مباشر
                      </button>
                   </div>
                </div>

                <div className="relative rounded-[3rem] overflow-hidden aspect-video shadow-2xl border border-white/5">
                   {/* Simplified Map representation */}
                   <div className="absolute inset-0 bg-ecru/10 flex items-center justify-center">
                      <div className="flex flex-col items-center gap-4">
                         <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center animate-pulse">
                            <MapPin className="w-8 h-8 text-gold" />
                         </div>
                         <span className="text-xs font-black tracking-widest uppercase text-gold">موقع المورد على الخارطة</span>
                      </div>
                   </div>
                   <img src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover opacity-30" />
                </div>
             </div>
          </section>

          {/* ── Similar Products ─────────────────────────────────── */}
          <section className="space-y-12">
             <div className="flex items-end justify-between">
                <div className="space-y-2 text-right">
                   <span className="text-[10px] font-black text-gold uppercase tracking-[0.3em]">اكتشف المزيد</span>
                   <h2 className="text-4xl font-black text-charcoal">منتجات مشابهة قد تنال إعجابك</h2>
                </div>
                <div className="flex gap-3">
                   <button className="p-4 bg-white border border-ecru rounded-2xl hover:bg-gold hover:text-white transition-all shadow-sm"><ArrowLeft className="w-5 h-5 rtl:rotate-180" /></button>
                   <button className="p-4 bg-white border border-ecru rounded-2xl hover:bg-gold hover:text-white transition-all shadow-sm"><ArrowLeft className="w-5 h-5" /></button>
                </div>
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="bg-white rounded-[2.5rem] overflow-hidden border border-ecru group hover:shadow-2xl transition-all">
                     <div className="relative aspect-square overflow-hidden">
                        <img src={`https://images.unsplash.com/photo-1594932224011-042041c6ff9a?q=80&w=400&auto=format&fit=crop&sig=${i}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute top-4 right-4 px-3 py-1 bg-charcoal/80 text-white text-[10px] font-black rounded-full">New</div>
                     </div>
                     <div className="p-6 space-y-4">
                        <div className="flex justify-between items-center">
                           <span className="text-[10px] font-black text-gold uppercase tracking-widest">حرير ساتان</span>
                           <div className="flex items-center gap-1 text-[10px] font-bold text-muted">
                              <Star className="w-3 h-3 fill-current text-gold" />
                              <span>4.9</span>
                           </div>
                        </div>
                        <h4 className="font-black text-charcoal">حرير ساتان إيطالي - أزرق</h4>
                        <div className="flex items-center justify-between border-t border-ecru pt-4">
                           <span className="text-lg font-black text-charcoal">$38.00</span>
                           <button className="p-2 bg-ecru/30 rounded-xl hover:bg-gold hover:text-white transition-all"><ShoppingCart className="w-4 h-4" /></button>
                        </div>
                     </div>
                  </div>
                ))}
             </div>
          </section>

        </div>
      </div>
    </div>
  );
}
