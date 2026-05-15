'use client';

import React, { useReducer, useState, useEffect } from 'react';
import { 
  ChevronDown, ChevronUp, X, Filter, Save, Share2, 
  ShieldCheck, Map, Palette, Wind, Layers, Tag, 
  Calendar, CheckCircle2, RotateCcw
} from 'lucide-react';

// ─── 1. Types & State ────────────────────────────────────────────────────────
type FilterState = {
  fiberTypes: string[];
  weaves: string[];
  gsm: [number, number];
  width: [number, number];
  colors: string[];
  usages: string[];
  certifications: string[];
  origins: string[];
  price: [number, number];
  moq: [number, number];
  seasons: string[];
  verifiedOnly: boolean;
};

type Action = 
  | { type: 'TOGGLE_ARRAY'; field: keyof FilterState; value: string }
  | { type: 'SET_RANGE'; field: 'gsm' | 'width' | 'price' | 'moq'; value: [number, number] }
  | { type: 'SET_VERIFIED'; value: boolean }
  | { type: 'CLEAR_ALL' };

const initialState: FilterState = {
  fiberTypes: [],
  weaves: [],
  gsm: [50, 600],
  width: [90, 300],
  colors: [],
  usages: [],
  certifications: [],
  origins: [],
  price: [0, 5000],
  moq: [0, 1000],
  seasons: [],
  verifiedOnly: false,
};

function filterReducer(state: FilterState, action: Action): FilterState {
  switch (action.type) {
    case 'TOGGLE_ARRAY':
      const currentArray = state[action.field] as string[];
      return {
        ...state,
        [action.field]: currentArray.includes(action.value)
          ? currentArray.filter((v) => v !== action.value)
          : [...currentArray, action.value]
      };
    case 'SET_RANGE':
      return { ...state, [action.field]: action.value };
    case 'SET_VERIFIED':
      return { ...state, verifiedOnly: action.value };
    case 'CLEAR_ALL':
      return initialState;
    default:
      return state;
  }
}

// ─── 2. Data Definitions ─────────────────────────────────────────────────────
const FIBER_TYPES = ['قطن', 'حرير', 'كتان', 'صوف', 'بوليستر', 'نايلون', 'جلد'];
const WEAVES = [
  { id: 'plain', label: 'سادة (Plain)', img: '🧵' },
  { id: 'twill', label: 'سرجيل (Twill)', img: '🧬' },
  { id: 'satin', label: 'ساتان (Satin)', img: '✨' },
  { id: 'jacquard', label: 'جاكارد (Jacquard)', img: '🖼️' },
];
const COLORS = [
  { name: 'أبيض', hex: '#FFFFFF' },
  { name: 'أسود', hex: '#000000' },
  { name: 'كحلي', hex: '#1A1A2E' },
  { name: 'ذهبي', hex: '#C9A84C' },
  { name: 'خمري', hex: '#4A0E0E' },
  { name: 'زيتي', hex: '#4A7C59' },
];
const USAGES = ['ملابس جاهزة', 'أثاث', 'ستائر', 'صناعي', 'رياضي'];
const CERTIFICATIONS = [
  { id: 'GOTS', label: 'GOTS', badge: 'BIO' },
  { id: 'OEKO-TEX', label: 'OEKO-TEX', badge: 'SAFE' },
  { id: 'REACH', label: 'REACH', badge: 'EU' },
];
const SEASONS = ['SS26', 'AW26', 'Permanent'];

// ─── 3. Sub-components ───────────────────────────────────────────────────────
const Section = ({ title, icon, children, badge }: { title: string, icon: any, children: React.ReactNode, badge?: string | number }) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="border-b border-white/5 py-6 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex w-full items-center justify-between group mb-4"
      >
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl transition-colors ${isOpen ? 'bg-amber/10 text-amber' : 'bg-white/5 text-ecru-muted'}`}>
            {React.cloneElement(icon as React.ReactElement, { className: 'w-4 h-4' })}
          </div>
          <span className="font-black text-ecru group-hover:text-amber transition-colors text-sm uppercase tracking-wider">{title}</span>
        </div>
        <div className="flex items-center gap-3">
          {badge && <span className="text-[10px] font-black text-amber bg-amber/5 px-2 py-0.5 rounded-full">{badge}</span>}
          {isOpen ? <ChevronUp className="w-4 h-4 text-ecru-muted" /> : <ChevronDown className="w-4 h-4 text-ecru-muted" />}
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
        {children}
      </div>
    </div>
  );
};

// ─── 4. Main Component ───────────────────────────────────────────────────────
export default function FilterSidebar() {
  const [state, dispatch] = useReducer(filterReducer, initialState);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const getActiveCount = () => {
    let count = 0;
    count += state.fiberTypes.length + state.weaves.length + state.colors.length + state.usages.length + state.certifications.length + state.seasons.length;
    if (state.verifiedOnly) count++;
    return count;
  };

  return (
    <>
      {/* Mobile Floating Button */}
      <button 
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed bottom-8 left-8 z-[60] bg-charcoal text-white p-4 rounded-full shadow-2xl flex items-center gap-2 hover:bg-burgundy transition-all active:scale-95"
      >
        <Filter className="w-5 h-5" />
        <span className="text-xs font-black uppercase tracking-widest">{getActiveCount() > 0 ? getActiveCount() : ''} تصفية</span>
      </button>

      {/* Background Overlay Mobile */}
      {isMobileOpen && (
        <div className="fixed inset-0 bg-charcoal/40 backdrop-blur-sm z-[70] lg:hidden" onClick={() => setIsMobileOpen(false)} />
      )}

      <aside className={`
        fixed inset-y-0 right-0 w-[340px] glass-morphism z-[80] shadow-2xl transform transition-transform duration-500 lg:static lg:w-full lg:shadow-none lg:translate-x-0 lg:z-0
        ${isMobileOpen ? 'translate-x-0' : 'translate-x-full'}
        font-body border-r border-white/5 flex flex-col h-screen lg:h-auto lg:sticky lg:top-24 lg:rounded-[2.5rem] lg:border
      `} dir="rtl">
        
        {/* Header */}
        <div className="p-8 border-b border-white/5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-ecru mb-1">فلاتر الخبراء</h2>
            <p className="text-[10px] text-ecru-muted font-bold uppercase tracking-widest">تصفية دقيقة للأقمشة</p>
          </div>
          {isMobileOpen && <button onClick={() => setIsMobileOpen(false)} className="p-2 hover:bg-white/5 rounded-full"><X className="w-5 h-5 text-ecru" /></button>}
        </div>

        {/* Live Status Bar */}
        <div className="px-8 py-3 bg-amber/5 flex items-center justify-between border-b border-white/5">
           <span className="text-[10px] font-black text-amber uppercase tracking-widest">الموردون الموثوقون فقط</span>
           <button 
             onClick={() => dispatch({ type: 'SET_VERIFIED', value: !state.verifiedOnly })}
             className={`w-10 h-5 rounded-full transition-all relative ${state.verifiedOnly ? 'bg-amber' : 'bg-white/10'}`}
           >
             <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${state.verifiedOnly ? 'left-1' : 'left-6'}`} />
           </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-8 custom-scrollbar pb-32">
          
          {/* Fiber Types */}
          <Section title="نوع الألياف" icon={<Wind />} badge={state.fiberTypes.length}>
             <div className="grid grid-cols-2 gap-2">
                {FIBER_TYPES.map(fiber => (
                  <button 
                    key={fiber}
                    onClick={() => dispatch({ type: 'TOGGLE_ARRAY', field: 'fiberTypes', value: fiber })}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border
                      ${state.fiberTypes.includes(fiber) ? 'bg-midnight text-amber border-amber shadow-lg shadow-amber/20' : 'bg-white/5 border-white/10 text-ecru-muted hover:border-amber'}`}
                  >
                    {fiber}
                  </button>
                ))}
             </div>
          </Section>

          {/* Weave Type */}
          <Section title="نوع النسج / الأرضية" icon={<Layers />} badge={state.weaves.length}>
             <div className="grid grid-cols-2 gap-3">
                {WEAVES.map(weave => (
                  <button 
                    key={weave.id}
                    onClick={() => dispatch({ type: 'TOGGLE_ARRAY', field: 'weaves', value: weave.id })}
                    className={`flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all
                      ${state.weaves.includes(weave.id) ? 'bg-amber/10 border-amber text-amber shadow-lg shadow-amber/10' : 'bg-white/5 border-white/10 text-ecru-muted hover:border-amber/30'}`}
                  >
                    <span className="text-2xl filter grayscale group-hover:grayscale-0 transition-all">{weave.img}</span>
                    <span className="text-[10px] font-black uppercase whitespace-nowrap">{weave.label.split(' ')[0]}</span>
                  </button>
                ))}
             </div>
          </Section>

          {/* GSM Weight Slider */}
          <Section title="الوزن (GSM)" icon={<Tag />}>
             <div className="space-y-6 pt-2">
                <div className="flex justify-between text-[10px] font-black text-muted uppercase tracking-widest">
                   <span>خفيف جداً</span>
                   <span className="text-gold bg-gold/5 px-2 py-0.5 rounded-full">{state.gsm[1]} g/m²</span>
                   <span>ثقيل جداً</span>
                </div>
                <div className="relative h-2 bg-white/10 rounded-full">
                   <div 
                     className="absolute h-full bg-amber rounded-full" 
                     style={{ left: '0', right: `${100 - (state.gsm[1] / 600) * 100}%` }} 
                   />
                   <input 
                     type="range" min="50" max="600" step="10"
                     value={state.gsm[1]}
                     onChange={(e) => dispatch({ type: 'SET_RANGE', field: 'gsm', value: [50, parseInt(e.target.value)] })}
                     className="absolute inset-0 w-full opacity-0 cursor-pointer"
                   />
                </div>
             </div>
          </Section>

          {/* Color Palette */}
          <Section title="اللون" icon={<Palette />} badge={state.colors.length}>
             <div className="flex flex-wrap gap-3">
                {COLORS.map(color => (
                  <button 
                    key={color.name}
                    onClick={() => dispatch({ type: 'TOGGLE_ARRAY', field: 'colors', value: color.name })}
                    className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center
                      ${state.colors.includes(color.name) ? 'border-gold scale-125 shadow-lg' : 'border-transparent hover:scale-110'}`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  >
                    {state.colors.includes(color.name) && <CheckCircle2 className={`w-4 h-4 ${color.name === 'أبيض' ? 'text-midnight' : 'text-white'}`} />}
                  </button>
                ))}
             </div>
          </Section>

          {/* Usage */}
          <Section title="الاستخدام" icon={<CheckCircle2 />} badge={state.usages.length}>
             <div className="flex flex-col gap-2">
                {USAGES.map(usage => (
                  <button 
                    key={usage}
                    onClick={() => dispatch({ type: 'TOGGLE_ARRAY', field: 'usages', value: usage })}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 group transition-all"
                  >
                    <span className={`text-xs font-bold transition-colors ${state.usages.includes(usage) ? 'text-amber' : 'text-ecru-muted'}`}>{usage}</span>
                    <div className={`w-4 h-4 rounded-full border-2 transition-all ${state.usages.includes(usage) ? 'bg-amber border-amber' : 'border-white/10 group-hover:border-amber'}`} />
                  </button>
                ))}
             </div>
          </Section>

          {/* Certifications */}
          <Section title="الشهادات" icon={<ShieldCheck />} badge={state.certifications.length}>
             <div className="grid gap-2">
                {CERTIFICATIONS.map(cert => (
                  <button 
                    key={cert.id}
                    onClick={() => dispatch({ type: 'TOGGLE_ARRAY', field: 'certifications', value: cert.id })}
                    className={`flex items-center justify-between p-3 rounded-2xl border transition-all
                      ${state.certifications.includes(cert.id) ? 'bg-amber/10 border-amber' : 'bg-white/5 border-white/10 hover:border-amber/30'}`}
                  >
                    <div className="flex items-center gap-3">
                       <ShieldCheck className={`w-4 h-4 ${state.certifications.includes(cert.id) ? 'text-amber' : 'text-ecru-muted'}`} />
                       <span className="text-xs font-black text-ecru">{cert.label}</span>
                    </div>
                    <span className="text-[9px] font-black text-amber bg-amber/10 px-2 py-0.5 rounded-full">{cert.badge}</span>
                  </button>
                ))}
             </div>
          </Section>

          {/* Seasons */}
          <Section title="الموسم" icon={<Calendar />} badge={state.seasons.length}>
             <div className="flex flex-wrap gap-2">
                {SEASONS.map(s => (
                  <button 
                    key={s}
                    onClick={() => dispatch({ type: 'TOGGLE_ARRAY', field: 'seasons', value: s })}
                    className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all border
                      ${state.seasons.includes(s) ? 'bg-amber text-midnight border-amber' : 'bg-white/5 border-white/10 text-ecru-muted'}`}
                  >
                    {s}
                  </button>
                ))}
             </div>
          </Section>
        </div>

        {/* Footer Actions */}
         <div className="p-8 border-t border-white/5 bg-midnight/50 lg:rounded-b-[2.5rem]">
            <div className="flex gap-3 mb-4">
               <button 
                 onClick={() => dispatch({ type: 'CLEAR_ALL' })}
                 className="flex-1 py-4 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-ecru-muted hover:text-red-400 hover:border-red-400/20 transition-all flex items-center justify-center gap-2"
               >
                 <RotateCcw className="w-3.5 h-3.5" /> مسح الكل
               </button>
               <button className="flex-1 py-4 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-ecru-muted hover:text-amber hover:border-amber transition-all flex items-center justify-center gap-2">
                 <Save className="w-3.5 h-3.5" /> حفظ البحث
               </button>
            </div>
            <button className="w-full py-5 bg-amber text-midnight rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-amber/30 hover:bg-amber-light hover:shadow-amber/50 hover:-translate-y-1 transition-all active:scale-[0.98]">
               عرض {getActiveCount() > 0 ? 'النتائج المفلترة' : 'الكل'}
            </button>
         </div>
      </aside>
    </>
  );
}
