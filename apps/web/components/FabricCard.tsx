'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Eye, Heart, FileText, Share2, 
  CheckCircle, Globe, Star, Info,
  ChevronRight, ArrowUpRight
} from 'lucide-react';
import { FabricCardProps } from '../types/fabric';

export default function FabricCard(props: FabricCardProps) {
  const { 
    name, image, collection, certifications, sustainabilityScore, 
    createdAt, supplier, origin, composition, technicalSpecs, 
    commercial, viewVariant = 'grid' 
  } = props;

  const [isHovered, setIsHovered] = useState(false);

  // Helper for "New" badge logic (within 30 days)
  const isNew = (new Date().getTime() - new Date(createdAt).getTime()) < (30 * 24 * 60 * 60 * 1000);

  if (viewVariant === 'compact') {
    return (
      <div className="flex items-center gap-3 p-2 bg-white border border-border rounded-lg hover:shadow-md transition-all cursor-pointer group">
        <div className="relative w-12 h-12 rounded overflow-hidden">
          <img src={image} alt={name} className="object-cover w-full h-full" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-body-small font-bold text-charcoal truncate">{name}</h4>
          <p className="text-[10px] text-muted">{technicalSpecs.gsm}g/m² • {origin.country}</p>
        </div>
        <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-gold transition-colors" />
      </div>
    );
  }

  return (
    <div 
      className={`
        group relative bg-white transition-all duration-700 overflow-hidden shadow-silk
        ${viewVariant === 'grid' ? 'rounded-[2rem] flex flex-col' : 'rounded-3xl flex flex-row h-72'}
        hover:shadow-gold-glow hover:-translate-y-2 border border-border-light
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ─── VISUAL HEADER (IMAGE) ─── */}
      <div className={`relative overflow-hidden bg-cream ${viewVariant === 'grid' ? 'aspect-[4/3] w-full' : 'w-80 h-full'}`}>
        <img 
          src={image} 
          alt={name} 
          className={`w-full h-full object-cover transition-transform duration-[1.5s] ease-out ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
        
        {/* Badges & Ribbons */}
        <div className="absolute top-5 left-5 flex flex-col gap-2">
          <span className="glass-card text-navy text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
            {collection}
          </span>
          {isNew && (
            <div className="bg-gold text-white text-[10px] font-black px-4 py-1.5 rounded-r-full shadow-lg -ml-5 flex items-center">
              NEW <Star className="w-3 h-3 ml-1 fill-white" />
            </div>
          )}
        </div>

        <div className="absolute top-5 right-5 flex flex-wrap justify-end gap-1.5 max-w-[50%]">
          {certifications.slice(0, 2).map(cert => (
            <span key={cert} className="glass-card border border-emerald/20 text-emerald text-[9px] px-3 py-1 rounded-full font-black uppercase">
              {cert}
            </span>
          ))}
        </div>

        {/* Hover Overlay - Luxury Glass */}
        <div className={`
          absolute inset-0 bg-navy/40 backdrop-blur-md transition-all duration-500 flex items-center justify-center gap-4
          ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-110 pointer-events-none'}
        `}>
          <button className="w-12 h-12 bg-white text-navy rounded-full hover:bg-gold hover:text-white transition-all transform hover:scale-110 shadow-gold-glow flex items-center justify-center">
            <Eye className="w-5 h-5" />
          </button>
          <button className="w-12 h-12 bg-white text-navy rounded-full hover:bg-gold hover:text-white transition-all transform hover:scale-110 shadow-gold-glow flex items-center justify-center">
            <Heart className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ─── BODY & CONTENT ─── */}
      <div className={`p-7 flex flex-col flex-1 ${viewVariant === 'list' ? 'justify-between' : ''}`}>
        
        {/* Top Info */}
        <div className="mb-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-black text-navy group-hover:text-gold cursor-pointer transition-colors line-clamp-1">
              {name}
            </h3>
            <span className="text-[10px] font-black text-gold border border-gold/30 px-3 py-1 rounded-full uppercase tracking-tighter">
              {technicalSpecs.weave}
            </span>
          </div>
          
          <div className="flex items-center gap-2 mb-4">
            <div className="relative w-6 h-6 rounded-full overflow-hidden border-2 border-gold/20">
              <img src={supplier.avatar} alt={supplier.name} className="object-cover" />
            </div>
            <span className="text-xs font-bold text-navy/70 flex items-center gap-1">
              {supplier.name} {supplier.isVerified && <CheckCircle className="w-3.5 h-3.5 text-emerald" />}
            </span>
            <span className="text-[11px] font-medium text-navy/50 ml-auto flex items-center gap-1">
              {origin.flag} {origin.country}
            </span>
          </div>

          {/* Composition Display - Premium Tints */}
          <div className="space-y-2">
            <div className="relative h-2 w-full bg-cream rounded-full overflow-hidden flex">
              {composition.map((comp, idx) => (
                <div 
                  key={idx} 
                  style={{ width: `${comp.percentage}%`, backgroundColor: comp.color }}
                  className="h-full"
                  title={`${comp.fiber}: ${comp.percentage}%`}
                />
              ))}
            </div>
            <div className="flex justify-between text-[10px] text-navy/40 font-black uppercase tracking-tighter">
              {composition.slice(0, 3).map((comp, i) => (
                <span key={i}>{comp.percentage}% {comp.fiber}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Technical Grid - Refined */}
        <div className="grid grid-cols-2 gap-4 py-5 border-y border-gold/10 my-4">
          <div className="flex flex-col">
            <span className="text-[9px] text-navy/40 uppercase tracking-widest font-black">Grammage</span>
            <span className="text-sm font-black text-navy">{technicalSpecs.gsm} g/m²</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] text-navy/40 uppercase tracking-widest font-black">Largeur</span>
            <span className="text-sm font-black text-navy">{technicalSpecs.width} cm</span>
          </div>
        </div>

        {/* ─── FOOTER & COMMERCIAL ─── */}
        <div className="mt-auto">
          <div className="flex items-end justify-between mb-5">
            <div className="flex flex-col">
              <span className="text-[10px] text-navy/40 font-black mb-1 uppercase tracking-widest">Prix indicatif</span>
              <div className="flex items-baseline gap-1">
                {typeof commercial.price === 'number' ? (
                  <>
                    <span className="text-2xl text-navy font-black">{commercial.price.toFixed(2)}</span>
                    <span className="text-xs font-bold text-gold uppercase">{commercial.currency} / {commercial.unit}</span>
                  </>
                ) : (
                  <span className="text-xl text-gold font-black">SUR DEVIS</span>
                )}
              </div>
            </div>
            <div className="bg-cream px-3 py-1.5 rounded-xl border border-gold/10">
              <span className="text-[10px] font-black text-navy/60">MOQ: {commercial.moq}{commercial.unit}</span>
            </div>
          </div>

          <button className="w-full btn-premium py-4 flex items-center justify-center gap-3 group/btn">
            طلب عرض سعر
            <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
          </button>
        </div>

        {/* Stock Status Indicator */}
        <div className={`
          absolute top-0 right-0 w-2 h-full
          ${commercial.stockStatus === 'IN_STOCK' ? 'bg-emerald' : commercial.stockStatus === 'ON_ORDER' ? 'bg-copper' : 'bg-gold'}
        `} />
      </div>
    </div>
  );
}
