'use client';

import React, { useState } from 'react';
import { 
  Heart, ShieldCheck, MapPin, Wind, 
  Layers, Package, Calendar, Plus, 
  ChevronDown, ArrowRight, Star, Rotate3D
} from 'lucide-react';
import { FabricCardProps } from '../types/fabric';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const Fabric3DViewer = dynamic(() => import('./product/Fabric3DViewer'), { ssr: false });

export default function FabricCard(props: FabricCardProps) {
  const { 
    name, image, collection, certifications, 
    supplier, origin, composition, technicalSpecs, 
    commercial 
  } = props;

  const [isExpanded, setIsExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [is3DOpen, setIs3DOpen] = useState(false);

  // GSM scale helper
  const getGsmLevel = (gsm: number) => {
    if (gsm < 100) return { label: 'خفيف جداً', width: '20%' };
    if (gsm < 200) return { label: 'خفيف', width: '40%' };
    if (gsm < 300) return { label: 'متوسط', width: '60%' };
    if (gsm < 450) return { label: 'ثقيل', width: '80%' };
    return { label: 'ثقيل جداً', width: '100%' };
  };

  const gsmLevel = getGsmLevel(technicalSpecs.gsm);

  return (
    <div 
      className={`
        group relative flex flex-col bg-white rounded-[2rem] border-2 border-burgundy/5 overflow-hidden transition-all duration-500
        ${isHovered ? 'shadow-[0_20px_50px_rgba(201,168,76,0.15)] -translate-y-2 border-gold/20' : 'shadow-sm'}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      dir="rtl"
    >
      {/* Schema.org Product Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": name,
            "image": image,
            "description": `${name} - ${technicalSpecs.weave} fabric from ${supplier.name}`,
            "brand": {
              "@type": "Brand",
              "name": supplier.name
            },
            "offers": {
              "@type": "Offer",
              "priceCurrency": "DZD",
              "price": commercial.price,
              "availability": commercial.stockStatus === 'IN_STOCK' ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
            }
          })
        }}
      />

      {/* ─── Visual Section (60%) ─── */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-ecru">
        <Image 
          src={image} 
          alt={name} 
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-cover transition-transform duration-1000 ${isHovered ? 'scale-110' : 'scale-100'}`}
          loading="lazy"
        />
        
        {/* Top Badges */}
        <div className="absolute top-5 right-5 flex flex-col gap-2 z-10">
          <div className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg">
            {collection}
          </div>
          <div className="bg-gold text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1 animate-pulse">
            جديد <Star className="w-3 h-3 fill-white" />
          </div>
        </div>

        {/* Wishlist Button */}
        <button 
          onClick={(e) => { e.stopPropagation(); setIsLiked(!isLiked); }}
          className={`
            absolute top-5 left-5 p-3 rounded-full backdrop-blur-md transition-all duration-300 z-10
            ${isLiked ? 'bg-burgundy text-white scale-110' : 'bg-white/20 text-white border border-white/30 hover:bg-white hover:text-burgundy'}
          `}
        >
          <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
        </button>

        {/* 3D View Button (Center Overlay) */}
        <div className={`absolute inset-0 flex items-center justify-center z-20 transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
           <button 
             onClick={() => setIs3DOpen(true)}
             className="px-6 py-3 bg-white text-charcoal rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-2xl hover:bg-gold hover:text-white transition-all transform hover:scale-110 flex items-center gap-3"
           >
              معاينة 3D <Rotate3D className="w-4 h-4" />
           </button>
        </div>

        {/* Bottom Certifications (Glassmorphism) */}
        <div className="absolute bottom-5 left-5 right-5 flex gap-2">
          {certifications.map(cert => (
            <div key={cert} className="flex items-center gap-1 bg-white/10 backdrop-blur-xl border border-white/20 px-3 py-1.5 rounded-xl shadow-inner">
               <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
               <span className="text-[10px] font-black text-white uppercase tracking-wider">{cert}</span>
            </div>
          ))}
        </div>

        {/* Glass Overlay on Hover */}
        <div className={`absolute inset-0 bg-burgundy/10 backdrop-blur-[1px] transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
      </div>

      {/* ─── Content Section ─── */}
      <div className="p-6 flex flex-col flex-1 gap-5 bg-white relative">
        {/* Product Identity */}
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-black text-charcoal group-hover:text-gold transition-colors leading-tight">
              {name}
              <span className="block text-xs font-medium text-muted mt-1 opacity-60">Sergé de Soie Lyonnaise</span>
            </h3>
            <div className="flex flex-col items-end gap-1">
               <div className="flex items-center gap-1.5 bg-ecru/50 px-2 py-1 rounded-lg">
                  <Wind className="w-3.5 h-3.5 text-gold" />
                  <span className="text-[10px] font-bold text-charcoal">{technicalSpecs.weave}</span>
               </div>
            </div>
          </div>

          {/* Supplier Info */}
          <div className="flex items-center gap-3 py-2 border-b border-gray-50">
             <div className="relative w-8 h-8 rounded-full border-2 border-ecru overflow-hidden shadow-sm bg-gray-100 flex items-center justify-center">
                {supplier.avatar?.startsWith('http') || supplier.avatar?.startsWith('/') ? (
                  <img src={supplier.avatar} alt={supplier.name} className="object-cover w-full h-full" />
                ) : (
                  <span className="text-lg">{supplier.avatar || '🏢'}</span>
                )}
             </div>
             <div className="flex flex-col">
                <span className="text-[11px] font-black text-charcoal flex items-center gap-1">
                   {supplier.name} {origin.flag}
                </span>
                <span className="text-[9px] text-muted font-bold flex items-center gap-1">
                   <MapPin className="w-2.5 h-2.5" /> {origin.country}
                </span>
             </div>
          </div>
        </div>

        {/* Composition Bars */}
        <div className="space-y-1.5">
           <div className="flex h-2 w-full bg-gray-100 rounded-full overflow-hidden shadow-inner">
              {composition.map((comp, i) => (
                <div 
                  key={i} 
                  style={{ width: `${comp.percentage}%`, backgroundColor: comp.color }} 
                  className="h-full first:rounded-r-full last:rounded-l-full transition-all duration-1000"
                />
              ))}
           </div>
           <div className="flex flex-wrap gap-x-4 gap-y-1">
              {composition.map((comp, i) => (
                <span key={i} className="text-[10px] font-black text-muted flex items-center gap-1">
                   <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: comp.color }} />
                   {comp.percentage}% {comp.fiber}
                </span>
              ))}
           </div>
        </div>

        {/* Expandable Technical Specs */}
        <div className="bg-gray-50/50 rounded-2xl overflow-hidden transition-all duration-500">
           <button 
             onClick={() => setIsExpanded(!isExpanded)}
             className="w-full flex items-center justify-between p-4 hover:bg-ecru/30 transition-colors"
           >
              <div className="flex items-center gap-2">
                 <Layers className="w-4 h-4 text-gold" />
                 <span className="text-[11px] font-black text-charcoal">المواصفات التقنية</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-muted transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`} />
           </button>
           
           <div className={`transition-all duration-500 ${isExpanded ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="p-4 pt-0 space-y-4">
                 {/* GSM Scale */}
                 <div className="space-y-2">
                    <div className="flex justify-between text-[9px] font-black text-muted uppercase tracking-widest">
                       <span>الوزن: {technicalSpecs.gsm} GSM</span>
                       <span>{gsmLevel.label}</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                       <div 
                         className="h-full bg-gold rounded-full transition-all duration-1000 delay-300" 
                         style={{ width: isExpanded ? gsmLevel.width : '0%' }} 
                       />
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-white rounded-xl border border-ecru/50">
                       <p className="text-[9px] text-muted font-black uppercase mb-1">العرض (Laize)</p>
                       <p className="text-xs font-black text-charcoal">{technicalSpecs.width} سم</p>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-ecru/50">
                       <p className="text-[9px] text-muted font-black uppercase mb-1">الألوان المتاحة</p>
                       <div className="flex items-center gap-1.5 mt-1">
                          {technicalSpecs.colorsAvailable.slice(0, 3).map((c, i) => (
                            <div key={i} className="w-3.5 h-3.5 rounded-full ring-1 ring-gray-200" style={{ backgroundColor: c }} />
                          ))}
                          <span className="text-[9px] font-black text-gold">+{technicalSpecs.totalColors - 3}</span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Commercial Section */}
        <div className="pt-4 border-t border-dashed border-ecru space-y-5">
           <div className="flex items-end justify-between">
              <div className="space-y-1">
                 <span className="text-[9px] text-muted font-black uppercase tracking-widest">سعر المتر التقريبي</span>
                 <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-black text-burgundy">{commercial.price}</span>
                    <span className="text-xs font-black text-muted">DZD / م</span>
                 </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                 <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-ecru shadow-sm">
                    <Package className="w-3.5 h-3.5 text-gold" />
                    <span className="text-[10px] font-black text-charcoal">MOQ: {commercial.moq}م</span>
                 </div>
                 {/* Delivery Timeline Indicator */}
                 <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3 text-muted" />
                    <div className="w-16 h-1 bg-gray-100 rounded-full overflow-hidden">
                       <div className="h-full bg-success/40 w-2/3" />
                    </div>
                    <span className="text-[9px] font-black text-muted whitespace-nowrap">~ {commercial.leadTimeWeeks || 2} أسابيع</span>
                 </div>
              </div>
           </div>

           <div className="flex gap-3">
              <button className="flex-1 bg-gold text-white py-4 rounded-2xl text-[11px] font-black shadow-[0_10px_20px_rgba(201,168,76,0.2)] hover:bg-gold-dark hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                 طلب عينة
                 <Plus className="w-4 h-4" />
              </button>
              <button className="px-5 border-2 border-ecru text-charcoal rounded-2xl text-[11px] font-black hover:border-gold hover:text-gold transition-all flex items-center justify-center">
                 مقارنة
              </button>
           </div>
        </div>
      </div>

      {/* Stock Status Line */}
      <div className={`
        absolute bottom-0 left-0 w-full h-1.5
        ${commercial.stockStatus === 'IN_STOCK' ? 'bg-green-500' : 'bg-gold'}
      `} />

      {/* 3D Viewer Modal */}
      <Fabric3DViewer 
        isOpen={is3DOpen} 
        onClose={() => setIs3DOpen(false)} 
        fabricName={name}
        initialColor={technicalSpecs.colorsAvailable[0]}
      />
    </div>
  );
}
