'use client';

import React from 'react';
import { useCompare } from '../context/CompareContext';
import { X, ArrowRight, Layers, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function CompareFloatingBar() {
  const { compareList, removeFromCompare, clearCompare } = useCompare();

  if (compareList.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-full max-w-4xl px-4 animate-in slide-in-from-bottom-10 duration-500">
      <div className="bg-charcoal/95 backdrop-blur-xl border border-white/10 rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.4)] p-4 flex items-center justify-between gap-6">
        
        {/* Active Items */}
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
          {compareList.map((product) => (
            <div key={product.id} className="relative group shrink-0">
              <div className="w-14 h-14 rounded-2xl border-2 border-white/10 overflow-hidden bg-white/5 group-hover:border-gold transition-all">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <button 
                onClick={() => removeFromCompare(product.id)}
                className="absolute -top-2 -left-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
          
          {/* Empty slots placeholders */}
          {Array.from({ length: 4 - compareList.length }).map((_, i) => (
            <div key={i} className="w-14 h-14 rounded-2xl border-2 border-dashed border-white/5 bg-white/[0.02] flex items-center justify-center text-white/10">
              <Plus className="w-4 h-4" />
            </div>
          ))}
        </div>

        {/* Stats & Actions */}
        <div className="flex items-center gap-6 shrink-0" dir="rtl">
          <div className="hidden md:block">
            <div className="flex items-center gap-2 text-gold">
              <Layers className="w-4 h-4" />
              <span className="text-sm font-black">{compareList.length} / 4</span>
            </div>
            <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">أقمشة في المقارنة</p>
          </div>

          <div className="h-10 w-px bg-white/10" />

          <div className="flex items-center gap-3">
             <button 
               onClick={clearCompare}
               className="p-3 text-white/40 hover:text-red-400 transition-colors"
               title="مسح الكل"
             >
               <Trash2 className="w-5 h-5" />
             </button>
             
             <Link 
               href="/dashboard/buyer/compare"
               className="bg-gold text-charcoal px-8 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:bg-white hover:scale-105 transition-all active:scale-95 shadow-xl shadow-gold/20"
             >
               قارن الآن
               <ArrowRight className="w-4 h-4" />
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Plus({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
    </svg>
  );
}
