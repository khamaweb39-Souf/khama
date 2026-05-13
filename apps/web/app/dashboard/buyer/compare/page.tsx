'use client';

import React, { useState, useMemo } from 'react';
import { useCompare } from '../../../../context/CompareContext';
import { 
  X, Plus, ArrowRight, ShoppingCart, 
  Layers, Check, Ruler, Info, Download, Share2,
  Clock, ShieldCheck, Star, MapPin, Palette,
  Zap, AlertTriangle, FileText, Wind
} from 'lucide-react';
import Link from 'next/link';

// ─── Helper: Radar Chart Component ──────────────────────────────────────────
const RadarChart = ({ data, size = 150 }: { data: any[], size?: number }) => {
  const center = size / 2;
  const radius = size * 0.4;
  const points = data.map((d: any, i: number) => {
    const angle = (i * 2 * Math.PI) / data.length - Math.PI / 2;
    const x = center + radius * d.value * Math.cos(angle);
    const y = center + radius * d.value * Math.sin(angle);
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={size} height={size} className="mx-auto overflow-visible">
      {/* Grid */}
      {[0.2, 0.4, 0.6, 0.8, 1].map((r, i) => (
        <circle key={i} cx={center} cy={center} r={radius * r} fill="none" stroke="rgba(201,168,76,0.1)" strokeWidth="1" />
      ))}
      {/* Axis */}
      {data.map((_, i) => {
        const angle = (i * 2 * Math.PI) / data.length - Math.PI / 2;
        return <line key={i} x1={center} y1={center} x2={center + radius * Math.cos(angle)} y2={center + radius * Math.sin(angle)} stroke="rgba(201,168,76,0.1)" />;
      })}
      {/* Polygon */}
      <polygon points={points} fill="rgba(201,168,76,0.2)" stroke="#C9A84C" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
};

export default function ComparePage() {
  const { compareList, removeFromCompare, clearCompare } = useCompare();
  const [useCase, setUseCase] = useState<string>('');

  // ─── Highlighting Logic ────────────────────────────────────────────────────
  const highlights = useMemo(() => {
    if (compareList.length < 2) return {};
    
    const getBest = (key: string, type: 'min' | 'max') => {
      const values = compareList.map((p: any) => {
        const val = (p as any)[key] || (p as any).commercial?.[key] || (p as any).technicalSpecs?.[key];
        return typeof val === 'number' ? val : parseFloat(val);
      }).filter((v: any) => !isNaN(v));
      
      if (values.length === 0) return null;
      return type === 'min' ? Math.min(...values) : Math.max(...values);
    };

    return {
      price: getBest('price', 'min'),
      gsm: getBest('gsm', 'max'),
      rating: getBest('rating', 'max'),
      moq: getBest('moq', 'min'),
    };
  }, [compareList]);

  if (compareList.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8 space-y-6">
         <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-gray-200">
            <Layers className="w-12 h-12" />
         </div>
         <div className="space-y-2">
            <h2 className="text-2xl font-black text-charcoal">قائمة المقارنة فارغة</h2>
            <p className="text-muted max-w-md">أضف بعض الأقمشة من الكتالوج لتبدأ المقارنة الفنية والتحليل السعري.</p>
         </div>
         <Link href="/cat/fabrics" className="px-8 py-4 bg-burgundy text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gold transition-all shadow-xl shadow-burgundy/20">
            ابدأ التصفح الآن
         </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700" dir="rtl">
      
      {/* Header Section */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 px-4">
         <div className="space-y-3">
            <div className="flex items-center gap-2 text-gold">
               <Zap className="w-5 h-5 fill-current" />
               <span className="text-xs font-black uppercase tracking-[0.2em]">ذكاء خامة للمقارنة</span>
            </div>
            <h1 className="text-4xl font-black text-charcoal">محلل الأقمشة الاحترافي</h1>
            <p className="text-muted font-bold max-w-2xl leading-relaxed">
               نظام تحليل البيانات التقنية لضمان اختيار الخامة الأمثل لمشروعك القادم. 
               نقوم بتحليل الوزن، السعر، والتقييم لمساعدتك في اتخاذ القرار.
            </p>
         </div>
         
         <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-100 rounded-2xl text-xs font-bold text-muted hover:text-burgundy transition-all shadow-sm">
               <Share2 className="w-4 h-4" /> مشاركة
            </button>
            <button className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-100 rounded-2xl text-xs font-bold text-muted hover:text-burgundy transition-all shadow-sm">
               <FileText className="w-4 h-4" /> تصدير PDF
            </button>
            <button 
              onClick={clearCompare}
              className="px-5 py-3 bg-red-50 text-red-500 rounded-2xl text-xs font-bold hover:bg-red-500 hover:text-white transition-all"
            >
               مسح الكل
            </button>
         </div>
      </header>

      {/* Main Table Interface */}
      <div className="relative bg-white rounded-[3rem] border border-gray-100 shadow-[0_40px_100px_rgba(0,0,0,0.05)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="p-8 text-right border-b border-l border-gray-100 w-72 bg-white sticky right-0 z-20">
                   <div className="space-y-1">
                      <span className="text-[10px] font-black text-muted uppercase tracking-widest block">المواصفات التقنية</span>
                      <p className="text-sm font-black text-charcoal">تحليل المقارنة</p>
                   </div>
                </th>
                {compareList.map((product: any) => (
                  <th key={product.id} className="p-8 border-b border-gray-100 min-w-[320px] relative group">
                    <button 
                      onClick={() => removeFromCompare(product.id)}
                      className="absolute top-4 left-4 p-2 bg-white text-red-500 rounded-xl shadow-md opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white z-10"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    
                    <div className="space-y-6">
                       <div className="aspect-[4/3] w-full rounded-[2rem] overflow-hidden shadow-2xl shadow-charcoal/10 bg-ecru">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                       </div>
                       <div className="text-center space-y-2">
                          <h4 className="text-lg font-black text-charcoal line-clamp-1">{product.name}</h4>
                          <div className="flex items-center justify-center gap-2">
                             <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center">
                                <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                             </div>
                             <span className="text-[11px] font-black text-muted uppercase tracking-wider">{product.supplier?.name || product.category}</span>
                          </div>
                       </div>

                       {/* Visual Balance (Radar) */}
                       <div className="pt-4 border-t border-dashed border-gray-100">
                          <RadarChart data={[
                            { label: 'Price', value: 0.8 },
                            { label: 'Quality', value: 0.9 },
                            { label: 'Delivery', value: 0.7 },
                            { label: 'Stock', value: 0.6 },
                            { label: 'Rating', value: 0.95 },
                          ]} />
                          <p className="text-[9px] font-black text-muted uppercase tracking-widest mt-2">توازن القيمة السعرية</p>
                       </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            
            <tbody className="divide-y divide-gray-50">
              {/* Numeric Specs Rows */}
              {[
                { label: 'السعر التقديري (DZD)', key: 'price', icon: <Layers />, best: 'min' },
                { label: 'الجراماج (GSM)', key: 'gsm', icon: <Wind />, best: 'max' },
                { label: 'أقل كمية (MOQ)', key: 'moq', icon: <ShoppingCart />, best: 'min' },
                { label: 'تقييم الجودة', key: 'rating', icon: <Star />, best: 'max' },
              ].map((row, idx) => (
                <tr key={idx} className="group hover:bg-gold/5 transition-colors">
                  <td className="p-8 border-l border-gray-100 bg-white sticky right-0 z-10 font-bold text-sm text-charcoal flex items-center gap-4">
                     <div className="p-3 bg-gray-50 rounded-2xl group-hover:bg-gold/20 group-hover:text-gold transition-all">
                        {React.cloneElement(row.icon as React.ReactElement, { className: 'w-5 h-5' })}
                     </div>
                     {row.label}
                  </td>
                  {compareList.map((product: any) => {
                    const val = product[row.key] || product.technicalSpecs?.[row.key] || product.commercial?.[row.key] || 0;
                    const isBest = val === (highlights as any)[row.key];
                    
                    return (
                      <td key={product.id} className="p-8 text-center">
                         <div className="space-y-3">
                            <span className={`
                              text-xl font-black transition-all
                              ${isBest ? 'text-green-600 scale-110' : 'text-charcoal'}
                            `}>
                              {val.toLocaleString()}
                              {isBest && <Check className="w-4 h-4 inline-block mr-2" />}
                            </span>
                            
                            {/* Visual Bar for GSM */}
                            {row.key === 'gsm' && (
                              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden max-w-[120px] mx-auto">
                                 <div className="h-full bg-gold transition-all duration-1000" style={{ width: `${(val / 600) * 100}%` }} />
                              </div>
                            )}
                         </div>
                      </td>
                    );
                  })}
                </tr>
              ))}

              {/* Categorical Rows */}
              {[
                { label: 'بلد المنشأ', key: 'origin', subKey: 'country', icon: <MapPin /> },
                { label: 'نوع النسج', key: 'technicalSpecs', subKey: 'weave', icon: <Layers /> },
                { label: 'الألوان المتاحة', key: 'technicalSpecs', subKey: 'colorsAvailable', icon: <Palette />, type: 'colors' },
              ].map((row, idx) => (
                <tr key={idx} className="group hover:bg-gold/5 transition-colors">
                   <td className="p-8 border-l border-gray-100 bg-white sticky right-0 z-10 font-bold text-sm text-charcoal flex items-center gap-4">
                     <div className="p-3 bg-gray-50 rounded-2xl group-hover:bg-gold/20 group-hover:text-gold transition-all">
                        {React.cloneElement(row.icon as React.ReactElement, { className: 'w-5 h-5' })}
                     </div>
                     {row.label}
                  </td>
                  {compareList.map((product: any) => {
                    const val = product[row.key]?.[row.subKey as string] || product[row.subKey as string] || 'N/A';
                    return (
                      <td key={product.id} className="p-8 text-center">
                         {row.type === 'colors' && Array.isArray(val) ? (
                           <div className="flex justify-center gap-1">
                             {val.slice(0, 4).map((c, i) => (
                               <div key={i} className="w-4 h-4 rounded-full border border-gray-100 shadow-sm" style={{ backgroundColor: c }} />
                             ))}
                             {val.length > 4 && <span className="text-[8px] font-bold">+{val.length - 4}</span>}
                           </div>
                         ) : (
                           <span className="text-sm font-black text-charcoal">{val}</span>
                         )}
                      </td>
                    );
                  })}
                </tr>
              ))}

              {/* Footer CTA Row */}
              <tr>
                 <td className="p-8 border-l border-gray-100 bg-white sticky right-0 z-10" />
                 {compareList.map((product) => (
                   <td key={product.id} className="p-8">
                      <button className="w-full py-5 bg-charcoal text-white rounded-3xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-burgundy transition-all hover:-translate-y-1 flex items-center justify-center gap-2">
                        طلب عينة <ShoppingCart className="w-4 h-4" />
                      </button>
                   </td>
                 ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Decision Support Widget */}
      <div className="grid lg:grid-cols-2 gap-8 px-4">
         <div className="bg-charcoal text-white p-10 rounded-[3rem] space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
               <Layers className="w-full h-full -translate-x-1/2 translate-y-1/2 scale-150" />
            </div>
            <div className="relative">
               <h3 className="text-2xl font-black mb-4">أداة "أيهما أفضل لـ..."</h3>
               <p className="text-white/60 text-sm mb-8">اختر طبيعة مشروعك وسنقوم بترشيح القماش الأنسب بناءً على المواصفات الفنية.</p>
               
               <div className="grid grid-cols-2 gap-3">
                  {['أزياء صيفية', 'ملابس عمل', 'أثاث فاخر', 'حقائب وإكسسوارات'].map(item => (
                    <button 
                      key={item}
                      onClick={() => setUseCase(item)}
                      className={`px-6 py-4 rounded-2xl text-xs font-bold transition-all border ${useCase === item ? 'bg-gold border-gold text-charcoal' : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'}`}
                    >
                      {item}
                    </button>
                  ))}
               </div>
               
               {useCase && (
                 <div className="mt-8 p-6 bg-gold/10 border border-gold/20 rounded-2xl animate-in zoom-in-95 duration-500">
                    <div className="flex items-center gap-3 text-gold mb-2">
                       <Check className="w-5 h-5" />
                       <span className="font-bold">ترشيح خامة:</span>
                    </div>
                    <p className="text-sm">بناءً على اختيارك لـ <span className="text-gold font-bold">{useCase}</span>، نوصي بـ <span className="font-black text-white">{compareList[0]?.name}</span> نظراً لوزنه المناسب ومتانته العالية.</p>
                 </div>
               )}
            </div>
         </div>

         <div className="bg-gold/5 border border-gold/20 p-10 rounded-[3rem] flex flex-col justify-center space-y-4">
            <div className="w-16 h-16 bg-gold/10 rounded-[1.5rem] flex items-center justify-center">
               <AlertTriangle className="w-8 h-8 text-gold" />
            </div>
            <h3 className="text-2xl font-black text-gold-dark">هل تريد استشارة خبير؟</h3>
            <p className="text-gold-dark/70 text-sm leading-relaxed">
               إذا كنت محتاراً بين هذه الخيارات، يمكنك حجز مكالمة استشارية سريعة مع أحد خبراء النسيج لدينا لمساعدتك في اختيار الخامة التي ترفع من جودة منتجك النهائي وتوفر في تكاليف الإنتاج.
            </p>
            <button className="flex items-center gap-3 text-gold-dark font-black text-sm hover:translate-x-[-8px] transition-transform">
               تحدث مع خبير نسيج الآن <ArrowRight className="w-4 h-4" />
            </button>
         </div>
      </div>

    </div>
  );
    </div>
  );
}
