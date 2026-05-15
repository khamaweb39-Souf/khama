'use client';

import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const { 
  Box, Info, ArrowRight, 
  Sparkles, Layers, Wind,
  ChevronLeft, ChevronRight,
  Maximize2, RotateCw, BookOpen
} = Icons;

const WEAVE_TYPES = [
  {
    id: 'plain',
    name: 'النسيج السادة (Plain Weave)',
    desc: 'أبسط أنواع النسيج وأكثرها شيوعاً. يتم تمرير خيوط السداة فوق وتحت خيوط اللحمة بالتناوب.',
    pros: ['متانة عالية', 'مظهر متطابق للوجهين', 'سهولة الطباعة عليه'],
    commonFabrics: ['شاش', 'بوبلين', 'كتان'],
    techDetail: 'تداخل بنسبة 1/1',
    image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'twill',
    name: 'نسيج السرجيل (Twill Weave)',
    desc: 'يتميز بوجود خطوط قطرية (أثلام) على سطح القماش. يتم تمرير خيط اللحمة فوق واحد أو أكثر من خيوط السداة.',
    pros: ['نعومة أكثر من السادة', 'مقاومة للتجعد', 'إخفاء الأوساخ'],
    commonFabrics: ['دينيم (جينز)', 'غابردين', 'دريل'],
    techDetail: 'تداخل بنسبة 2/1 أو 3/1',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'satin',
    name: 'نسيج الساتان (Satin Weave)',
    desc: 'يتميز بسطح ناعم ولامع جداً بسبب وجود خيوط "طافية" طويلة على وجه القماش.',
    pros: ['لمعان فاخر', 'انسدالية رائعة', 'ملمس حريري'],
    commonFabrics: ['ساتان', 'شارموز', 'دوقة'],
    techDetail: 'تداخل بنسبة 4/1 أو أكثر',
    image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=400&auto=format&fit=crop'
  }
];

export default function WeaveExplorerPage() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeWeave = WEAVE_TYPES[activeIdx];

  const nextWeave = () => setActiveIdx((prev) => (prev + 1) % WEAVE_TYPES.length);
  const prevWeave = () => setActiveIdx((prev) => (prev - 1 + WEAVE_TYPES.length) % WEAVE_TYPES.length);

  return (
    <div className="min-h-screen bg-white pt-32 pb-20" dir="rtl">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20">
           <div className="space-y-6 max-w-2xl text-right">
              <div className="inline-flex items-center gap-2 bg-gold/10 text-gold px-4 py-2 rounded-full border border-gold/20">
                 <BookOpen className="w-4 h-4" />
                 <span className="text-[10px] font-black uppercase tracking-widest">الدليل المعرفي</span>
              </div>
              <h1 className="text-6xl font-black text-burgundy tracking-tighter leading-tight">مستكشف <span className="text-gold">تراكيب النسيج</span></h1>
              <p className="text-muted text-xl font-medium leading-relaxed">
                 تعرف على بنية النسج والتقنيات التي تمنح الأقمشة خصائصها الفريدة، من المتانة إلى اللمعان الفاخر.
              </p>
           </div>
           <div className="flex items-center gap-4">
              <button onClick={prevWeave} className="p-4 rounded-full border-2 border-ecru hover:border-gold hover:text-gold transition-all"><ChevronRight className="w-6 h-6" /></button>
              <div className="flex items-center gap-2">
                 {WEAVE_TYPES.map((_, i) => (
                   <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === activeIdx ? 'w-8 bg-gold' : 'w-2 bg-ecru'}`} />
                 ))}
              </div>
              <button onClick={nextWeave} className="p-4 rounded-full border-2 border-ecru hover:border-gold hover:text-gold transition-all"><ChevronLeft className="w-6 h-6" /></button>
           </div>
        </div>

        {/* Main Explorer View */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
           <div className="relative group">
              <div className="absolute inset-0 bg-gold/20 rounded-[4rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative z-10 bg-ecru/30 rounded-[4rem] p-4 border-2 border-ecru group-hover:border-gold transition-colors duration-700 aspect-square overflow-hidden shadow-inner">
                 <Image src={activeWeave.image} fill className="object-cover rounded-[3rem] transition-transform duration-1000 group-hover:scale-105" alt={activeWeave.name} />
                 <div className="absolute bottom-10 right-10 flex gap-4">
                    <button className="p-4 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl hover:bg-gold hover:text-white transition-all"><Maximize2 className="w-5 h-5" /></button>
                    <button className="p-4 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl hover:bg-gold hover:text-white transition-all"><RotateCw className="w-5 h-5" /></button>
                 </div>
                 <div className="absolute top-10 left-10 bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl border border-ecru shadow-lg">
                    <span className="text-[10px] font-black text-muted uppercase tracking-[0.3em]">التركيبة التقنية</span>
                    <p className="text-sm font-black text-burgundy mt-1">{activeWeave.techDetail}</p>
                 </div>
              </div>
           </div>

           <div className="space-y-12">
              <div className="space-y-6">
                 <h2 className="text-4xl font-black text-burgundy">{activeWeave.name}</h2>
                 <p className="text-muted text-lg font-medium leading-relaxed">{activeWeave.desc}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 {activeWeave.pros.map((pro, i) => (
                   <div key={i} className="flex items-center gap-4 p-5 bg-ecru/20 rounded-2xl border border-ecru transition-all hover:bg-white hover:shadow-xl hover:border-gold group">
                      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-white transition-all"><Sparkles className="w-4 h-4" /></div>
                      <span className="text-sm font-black text-charcoal">{pro}</span>
                   </div>
                 ))}
              </div>

              <div className="space-y-6 p-10 bg-burgundy rounded-[3rem] relative overflow-hidden">
                 <div className="relative z-10 flex items-center justify-between">
                    <div className="space-y-2">
                       <h4 className="text-white font-black">أشهر الأقمشة بهذا النسيج</h4>
                       <div className="flex flex-wrap gap-3 mt-4">
                          {activeWeave.commonFabrics.map((fabric, i) => (
                            <span key={i} className="px-4 py-2 bg-white/10 text-white rounded-xl text-xs font-bold border border-white/10">{fabric}</span>
                          ))}
                       </div>
                    </div>
                    <div className="w-16 h-16 bg-gold/20 rounded-2xl flex items-center justify-center text-gold border border-gold/30"><Layers className="w-8 h-8" /></div>
                 </div>
              </div>

              <div className="flex items-center gap-6 pt-8 border-t border-ecru">
                 <button className="px-10 py-5 bg-gold text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl hover:scale-105 transition-all flex items-center gap-3">
                    تصفح أقمشة {activeWeave.id} <ArrowRight className="w-4 h-4" />
                 </button>
                 <Link href="/glossary" className="text-[11px] font-black text-muted hover:text-burgundy transition-colors uppercase tracking-[0.2em] border-b-2 border-ecru pb-1">المزيد في القاموس</Link>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
