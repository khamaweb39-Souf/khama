'use client';

import React, { useState } from 'react';
import { 
  Eye, Heart, FileText, Share2, 
  CheckCircle, Globe, Star, Info,
  ChevronDown, ChevronUp, Clock, Package,
  TrendingUp, Award, Layers, Ruler, Palette,
  Plus, Minus, ArrowLeftRight
} from 'lucide-react';
import { FabricCardProps } from '../types/fabric';

export default function FabricCard(props: FabricCardProps) {
  const { 
    name, image, collection, certifications, sustainabilityScore, 
    createdAt, supplier, origin, composition, technicalSpecs, 
    commercial, viewVariant = 'grid' 
  } = props;

  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Helper for "New" badge logic (within 30 days)
  const isNew = (new Date().getTime() - new Date(createdAt).getTime()) < (30 * 24 * 60 * 60 * 1000);

  return (
    <div 
      className={`
        group relative bg-white border border-ecru/50 transition-all duration-500 overflow-hidden
        ${viewVariant === 'grid' ? 'rounded-[2rem] flex flex-col' : 'rounded-2xl flex flex-row h-[450px]'}
        hover:shadow-[0_20px_50px_rgba(201,168,76,0.15)] hover:border-gold/30 hover:-translate-y-2
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ─── 1. IMAGE SECTION (60%) ─── */}
      <div className={`relative overflow-hidden bg-ecru ${viewVariant === 'grid' ? 'h-[280px] w-full' : 'w-2/5 h-full'}`}>
        <img 
          src={image} 
          alt={name} 
          className={`w-full h-full object-cover transition-transform duration-[1.5s] ease-out ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
        
        {/* Glassmorphism Badges (Top Left) */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          <div className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-xl uppercase tracking-widest">
            {collection}
          </div>
          {isNew && (
            <div className="bg-gold/90 backdrop-blur-md text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 animate-pulse">
              <Star className="w-3 h-3 fill-white" /> NEW
            </div>
          )}
        </div>

        {/* Favorite Button (Top Right) */}
        <button 
          onClick={(e) => { e.stopPropagation(); setIsFavorite(!isFavorite); }}
          className={`
            absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md border transition-all z-10
            ${isFavorite ? 'bg-gold border-gold text-white scale-110 shadow-lg shadow-gold/30' : 'bg-white/20 border-white/30 text-white hover:bg-white hover:text-burgundy'}
          `}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''} transition-transform active:scale-125`} />
        </button>

        {/* Certifications (Bottom on Image) */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end z-10">
          <div className="flex gap-1.5">
            {certifications.map(cert => (
              <div key={cert} className="bg-white/10 backdrop-blur-md border border-white/20 p-1.5 rounded-lg shadow-lg group/cert hover:bg-white/30 transition-all">
                <div className="flex items-center gap-1">
                   <Award className="w-3 h-3 text-white" />
                   <span className="text-[8px] font-black text-white uppercase hidden group-hover/cert:block">{cert}</span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Sustainability Dot Indicator */}
          <div className="flex gap-1 mb-1">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i} 
                className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${i < sustainabilityScore ? 'bg-gold shadow-[0_0_8px_var(--gold)] scale-110' : 'bg-white/30'}`} 
              />
            ))}
          </div>
        </div>

        {/* Image Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-60 pointer-events-none" />
      </div>

      {/* ─── 2. CONTENT SECTION ─── */}
      <div className={`p-6 flex flex-col flex-1 bg-white relative`}>
        
        {/* Fabric Title & Origin */}
        <div className="mb-4">
          <div className="flex items-start justify-between gap-4 mb-2">
            <h3 className="text-xl font-black text-charcoal leading-tight group-hover:text-gold transition-colors line-clamp-2">
              {name}
              <span className="block text-[10px] text-muted font-normal mt-1 italic">Sergé de Soie Lyonnaise</span>
            </h3>
            <div className="flex flex-col items-end shrink-0">
               <span className="text-lg" title={origin.country}>{origin.flag}</span>
               <div className="flex items-center gap-1 mt-1">
                  <Layers className="w-3 h-3 text-gold" />
                  <span className="text-[10px] font-black text-muted uppercase tracking-tighter">{technicalSpecs.weave}</span>
               </div>
            </div>
          </div>

          {/* Supplier Info */}
          <div className="flex items-center gap-2 py-3 border-y border-ecru/30">
            <div className="relative w-7 h-7 rounded-full overflow-hidden border border-gold/20 shadow-sm">
              <img src={supplier.avatar} alt={supplier.name} className="object-cover w-full h-full" />
            </div>
            <span className="text-[11px] font-bold text-charcoal flex items-center gap-1">
              {supplier.name} {supplier.isVerified && <CheckCircle className="w-3 h-3 text-success fill-success/10" />}
            </span>
          </div>
        </div>

        {/* Composition Proportional Bars */}
        <div className="mb-6">
          <p className="text-[9px] font-black text-muted uppercase tracking-widest mb-2 flex justify-between">
            <span>التركيبة الأساسية</span>
            <span>{composition[0].percentage}% {composition[0].fiber}</span>
          </p>
          <div className="h-1.5 w-full bg-ecru/30 rounded-full flex overflow-hidden">
            {composition.map((comp, idx) => (
              <div 
                key={idx} 
                style={{ width: `${comp.percentage}%`, backgroundColor: comp.color }}
                className="h-full transition-all duration-1000 group-hover:brightness-110"
              />
            ))}
          </div>
        </div>

        {/* ─── 3. TECHNICAL SPECS (Expandable) ─── */}
        <div className={`mb-6 transition-all duration-500 overflow-hidden ${isExpanded ? 'max-h-60' : 'max-h-0'}`}>
          <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-2xl border border-ecru/50">
             <div className="space-y-1">
                <p className="text-[9px] text-muted font-black uppercase">الوزن (GSM)</p>
                <div className="flex items-center gap-2">
                   <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-burgundy rounded-full" style={{ width: `${(technicalSpecs.gsm / 400) * 100}%` }} />
                   </div>
                   <span className="text-xs font-bold text-charcoal">{technicalSpecs.gsm}</span>
                </div>
             </div>
             <div className="space-y-1">
                <p className="text-[9px] text-muted font-black uppercase">العرض (Laize)</p>
                <div className="flex items-center gap-1 text-xs font-bold text-charcoal">
                   <Ruler className="w-3 h-3 text-gold" /> {technicalSpecs.width} cm
                </div>
             </div>
             <div className="col-span-2 space-y-1 pt-2 border-t border-gray-200/50">
                <p className="text-[9px] text-muted font-black uppercase">الألوان المتاحة</p>
                <div className="flex items-center gap-1.5">
                   {technicalSpecs.colorsAvailable.slice(0, 6).map((c, i) => (
                     <div key={i} className="w-4 h-4 rounded-full border border-white shadow-sm ring-1 ring-ecru" style={{ backgroundColor: c }} />
                   ))}
                   {technicalSpecs.totalColors > 6 && (
                     <span className="text-[10px] font-black text-muted ml-1">+{technicalSpecs.totalColors - 6} ألوان</span>
                   )}
                </div>
             </div>
          </div>
        </div>
        
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-center gap-1 w-full text-[9px] font-black text-gold uppercase tracking-[0.2em] mb-4 hover:opacity-70 transition-opacity"
        >
          {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          {isExpanded ? 'إغلاق التفاصيل' : 'المواصفات التقنية'}
        </button>

        {/* ─── 4. COMMERCIAL SECTION ─── */}
        <div className="mt-auto pt-4 border-t border-ecru/30">
          <div className="flex items-end justify-between mb-5">
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-black text-burgundy">{typeof commercial.price === 'number' ? commercial.price.toFixed(2) : '---'}</span>
                <span className="text-xs font-bold text-muted uppercase">{commercial.currency} / {commercial.unit}</span>
              </div>
              <p className="text-[10px] text-muted font-bold mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-success" /> متوسط سعر السوق المحلي
              </p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-1 text-[11px] font-bold text-charcoal bg-ecru/30 px-3 py-1 rounded-full border border-ecru/50">
                <Package className="w-3 h-3 text-gold" /> {commercial.moq} {commercial.unit}
              </div>
              <div className="flex items-center gap-1 text-[9px] text-muted mt-1">
                <Clock className="w-3 h-3" /> 2-4 أسابيع
              </div>
            </div>
          </div>

          <div className="flex gap-2.5">
            <button className="flex-1 bg-burgundy text-white py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-gold transition-all shadow-xl shadow-burgundy/10 active:scale-95">
              طلب عينة فنية
            </button>
            <button className="w-14 h-14 border-2 border-ecru rounded-2xl flex items-center justify-center text-charcoal hover:bg-ecru transition-all active:scale-90" title="إضافة للمقارنة">
              <ArrowLeftRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Vertical Stock Status Strip */}
        <div className={`
          absolute top-0 right-0 w-1 h-full
          ${commercial.stockStatus === 'IN_STOCK' ? 'bg-success' : 'bg-warning'}
        `} />
      </div>
    </div>
  );
}

export function FabricCardSkeleton() {
  return (
    <div className="bg-white rounded-[2rem] border border-ecru/50 overflow-hidden flex flex-col h-[600px] animate-pulse">
       <div className="h-[280px] bg-gray-200" />
       <div className="p-6 flex-1 space-y-6">
          <div className="space-y-2">
             <div className="h-6 bg-gray-200 rounded-full w-3/4" />
             <div className="h-4 bg-gray-100 rounded-full w-1/2" />
          </div>
          <div className="h-10 bg-gray-100 rounded-2xl" />
          <div className="space-y-2">
             <div className="h-1.5 bg-gray-200 rounded-full" />
             <div className="h-3 bg-gray-100 rounded-full w-1/4" />
          </div>
          <div className="mt-auto pt-4 border-t border-ecru/30 flex justify-between items-end">
             <div className="h-10 bg-gray-200 rounded-xl w-32" />
             <div className="h-10 bg-gray-100 rounded-xl w-24" />
          </div>
       </div>
    </div>
  );
}
