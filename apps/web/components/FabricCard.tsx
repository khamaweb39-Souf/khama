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
        group relative bg-white border border-border transition-all duration-500 overflow-hidden
        ${viewVariant === 'grid' ? 'rounded-2xl flex flex-col' : 'rounded-xl flex flex-row h-72'}
        hover:shadow-2xl hover:border-gold/30
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ─── VISUAL HEADER (IMAGE) ─── */}
      <div className={`relative overflow-hidden bg-ecru ${viewVariant === 'grid' ? 'aspect-[4/3] w-full' : 'w-80 h-full'}`}>
        <img 
          src={image} 
          alt={name} 
          className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
        
        {/* Badges & Ribbons */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <span className="bg-charcoal text-white text-[10px] font-bold px-3 py-1 rounded-full backdrop-blur-md bg-opacity-70">
            {collection}
          </span>
          {isNew && (
            <div className="bg-gold text-white text-[10px] font-bold px-3 py-1 rounded-r-lg shadow-lg -ml-4 flex items-center">
              NEW <Star className="w-3 h-3 ml-1 fill-white" />
            </div>
          )}
        </div>

        <div className="absolute top-4 right-4 flex flex-wrap justify-end gap-1 max-w-[50%]">
          {certifications.slice(0, 2).map(cert => (
            <span key={cert} className="bg-white/90 border border-success/30 text-success text-[9px] px-2 py-0.5 rounded font-bold">
              {cert}
            </span>
          ))}
        </div>

        {/* Sustainability Stars */}
        <div className="absolute bottom-4 left-4 flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i} 
              className={`w-2.5 h-2.5 rounded-full ${i < sustainabilityScore ? 'bg-success shadow-[0_0_8px_rgba(74,124,89,0.5)]' : 'bg-gray-300'}`} 
            />
          ))}
        </div>

        {/* Hover Overlay */}
        <div className={`
          absolute inset-0 bg-burgundy/20 backdrop-blur-[2px] transition-opacity duration-300 flex items-center justify-center gap-3
          ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}>
          <button className="p-3 bg-white text-burgundy rounded-full hover:bg-gold hover:text-white transition-all transform hover:scale-110 shadow-xl">
            <Eye className="w-5 h-5" />
          </button>
          <button className="p-3 bg-white text-burgundy rounded-full hover:bg-gold hover:text-white transition-all transform hover:scale-110 shadow-xl">
            <FileText className="w-5 h-5" />
          </button>
          <button className="p-3 bg-white text-burgundy rounded-full hover:bg-gold hover:text-white transition-all transform hover:scale-110 shadow-xl">
            <Heart className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ─── BODY & CONTENT ─── */}
      <div className={`p-5 flex flex-col flex-1 ${viewVariant === 'list' ? 'justify-between' : ''}`}>
        
        {/* Top Info */}
        <div className="mb-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-subheading !text-lg text-charcoal hover:text-gold cursor-pointer transition-colors line-clamp-1">
              {name}
            </h3>
            <span className="font-mono text-[10px] bg-ecru px-2 py-0.5 rounded border border-border/50 text-muted">
              {technicalSpecs.weave}
            </span>
          </div>
          
          <div className="flex items-center gap-2 mb-3">
            <div className="relative w-5 h-5 rounded-full overflow-hidden border border-border">
              <img src={supplier.avatar} alt={supplier.name} className="object-cover" />
            </div>
            <span className="text-[11px] text-muted flex items-center gap-1">
              {supplier.name} {supplier.isVerified && <CheckCircle className="w-3 h-3 text-success" />}
            </span>
            <span className="text-[11px] text-muted ml-auto flex items-center gap-1">
              {origin.flag} {origin.country}
            </span>
          </div>

          {/* Composition Bar */}
          <div className="relative h-1.5 w-full bg-gray-100 rounded-full overflow-hidden flex mb-1">
            {composition.map((comp, idx) => (
              <div 
                key={idx} 
                style={{ width: `${comp.percentage}%`, backgroundColor: comp.color }}
                className="h-full first:rounded-l-full last:rounded-r-full"
                title={`${comp.fiber}: ${comp.percentage}%`}
              />
            ))}
          </div>
          <div className="flex justify-between text-[9px] text-muted uppercase font-bold tracking-tighter">
            {composition.slice(0, 3).map((comp, i) => (
              <span key={i}>{comp.percentage}% {comp.fiber}</span>
            ))}
          </div>
        </div>

        {/* Technical Grid */}
        <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-6 py-4 border-y border-ecru/50">
          <div className="flex flex-col">
            <span className="text-[9px] text-muted uppercase tracking-widest font-bold">Poids (GSM)</span>
            <span className="text-body-small font-bold text-charcoal">{technicalSpecs.gsm} g/m²</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] text-muted uppercase tracking-widest font-bold">Largeur</span>
            <span className="text-body-small font-bold text-charcoal">{technicalSpecs.width} cm</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] text-muted uppercase tracking-widest font-bold">Armure</span>
            <span className="text-body-small font-bold text-charcoal">{technicalSpecs.weave}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] text-muted uppercase tracking-widest font-bold">Couleurs</span>
            <div className="flex items-center gap-1 mt-1">
              {technicalSpecs.colorsAvailable.slice(0, 4).map((c, i) => (
                <div key={i} className="w-3 h-3 rounded-full border border-border/50" style={{ backgroundColor: c }} />
              ))}
              {technicalSpecs.totalColors > 4 && (
                <span className="text-[9px] text-muted font-bold ml-1">+{technicalSpecs.totalColors - 4}</span>
              )}
            </div>
          </div>
        </div>

        {/* ─── FOOTER & COMMERCIAL ─── */}
        <div className="mt-auto">
          <div className="flex items-end justify-between mb-4">
            <div className="flex flex-col">
              <span className="text-[10px] text-muted font-bold mb-1">PRIX INDICATIF</span>
              <div className="flex items-baseline gap-1">
                {typeof commercial.price === 'number' ? (
                  <>
                    <span className="text-title !text-xl text-gold font-bold">{commercial.price.toFixed(2)}</span>
                    <span className="text-[12px] text-muted uppercase">{commercial.currency}/{commercial.unit}</span>
                  </>
                ) : (
                  <span className="text-body-large text-gold font-bold">Sur devis</span>
                )}
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-muted font-bold mb-1">MOQ</span>
              <span className="text-body-small font-bold text-charcoal">Min. {commercial.moq}{commercial.unit}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="flex-1 bg-burgundy text-white py-3 rounded-xl text-label hover:bg-gold transition-colors flex items-center justify-center gap-2 group/btn shadow-lg shadow-burgundy/10">
              Demander un devis
              <ChevronRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-1" />
            </button>
            <button className="w-12 h-12 border border-border rounded-xl flex items-center justify-center text-muted hover:text-gold hover:border-gold transition-all">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Stock Status Badge */}
        <div className={`
          absolute top-0 right-0 w-1.5 h-full
          ${commercial.stockStatus === 'IN_STOCK' ? 'bg-success' : commercial.stockStatus === 'ON_ORDER' ? 'bg-warning' : 'bg-gold'}
        `} />
      </div>
    </div>
  );
}
