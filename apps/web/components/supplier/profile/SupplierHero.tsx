'use client';

import React from 'react';
import { MapPin, ShieldCheck, Award, Globe, Users, Calendar, Share2, Heart, Flag } from 'lucide-react';

interface SupplierHeroProps {
  supplier: {
    name: string;
    tradeName: string;
    logo: string;
    cover: string;
    location: { city: string; region: string; country: string; flag: string };
    badges: string[];
    stats: { founded: string; employees: string; exportCount: number };
  };
}

export default function SupplierHero({ supplier }: SupplierHeroProps) {
  return (
    <div className="relative" dir="rtl">
      {/* ─── Cover Image ─── */}
      <div className="h-64 md:h-80 w-full relative overflow-hidden">
        <img 
          src={supplier.cover} 
          alt={supplier.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Action Buttons */}
        <div className="absolute top-6 left-6 flex gap-3">
          <button className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-charcoal transition-all">
            <Share2 className="w-5 h-5" />
          </button>
          <button className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-red-500 hover:text-white transition-all">
            <Heart className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ─── Profile Info ─── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative -mt-20">
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-white/20 backdrop-blur-sm flex flex-col md:flex-row items-start md:items-end gap-6">
          
          {/* Logo */}
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-white p-2 shadow-xl border-4 border-white overflow-hidden -mt-16 md:-mt-24 z-10 shrink-0">
             <img src={supplier.logo} alt={supplier.name} className="w-full h-full object-contain rounded-2xl" />
          </div>

          {/* Main Identity */}
          <div className="flex-1 space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl md:text-4xl font-bold text-charcoal">{supplier.tradeName}</h1>
              <div className="flex gap-2">
                {supplier.badges.map((badge, i) => (
                  <span key={i} className="flex items-center gap-1 px-3 py-1 bg-gold/10 text-gold-dark text-[10px] font-bold rounded-full border border-gold/20">
                    <ShieldCheck className="w-3 h-3" /> {badge}
                  </span>
                ))}
              </div>
            </div>
            
            <p className="text-muted text-sm font-medium">{supplier.name}</p>
            
            <div className="flex flex-wrap gap-4 text-xs font-bold text-muted">
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-accent" /> {supplier.location.city}, {supplier.location.region} {supplier.location.flag}</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-accent" /> تأسست عام {supplier.stats.founded}</span>
              <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-accent" /> {supplier.stats.employees} موظف</span>
              <span className="flex items-center gap-1.5"><Globe className="w-4 h-4 text-accent" /> تصدير لـ {supplier.stats.exportCount} دولة</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none bg-accent text-white px-8 py-4 rounded-2xl font-bold text-sm shadow-lg shadow-accent/20 hover:bg-opacity-90 transition-all hover:-translate-y-1">
              تواصل الآن
            </button>
            <button className="flex-1 md:flex-none bg-white border-2 border-accent/10 text-accent px-8 py-4 rounded-2xl font-bold text-sm hover:bg-accent/5 transition-all">
              طلب الكتالوج
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
