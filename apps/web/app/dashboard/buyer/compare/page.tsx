'use client';

import React, { useState } from 'react';
import { 
  Maximize2, X, Plus, ArrowRight, ShoppingCart, 
  Layers, Check, Ruler, Info, Download, Share2,
  Clock
} from 'lucide-react';

const MOCK_FABRICS = [
  { id: 1, name: 'كتان عضوي بريميوم', supplier: 'نسيج الجزائر', price: '12.50 €', gsm: '180', width: '150cm', composition: '100% Lin', moq: '50m', leadTime: '2 weeks' },
  { id: 2, name: 'بوليستر معاد تدويره', supplier: 'إيكو تيكس', price: '8.20 €', gsm: '140', width: '160cm', composition: '100% rPet', moq: '100m', leadTime: '1 week' },
  { id: 3, name: 'جاكارد ملكي مطرز', supplier: 'قصر المنسوجات', price: '24.00 €', gsm: '220', width: '140cm', composition: 'Soie/Coton', moq: '20m', leadTime: '4 weeks' },
];

export default function ComparePage() {
  const [selectedIds, setSelectedIds] = useState<number[]>([1, 2, 3]);

  const removeFabric = (id: number) => {
    setSelectedIds(selectedIds.filter(i => i !== id));
  };

  const selectedFabrics = MOCK_FABRICS.filter(f => selectedIds.includes(f.id));

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
         <div className="space-y-1 text-right">
            <h1 className="text-3xl font-black text-charcoal">مقارن الأقمشة الذكي</h1>
            <p className="text-muted font-medium">قارن المواصفات التقنية والأسعار حتى 5 أنواع أقمشة جنباً إلى جنب.</p>
         </div>
         <div className="flex gap-2">
            <button className="p-3 bg-white border border-border rounded-xl text-muted hover:text-accent transition-all shadow-sm">
               <Share2 className="w-5 h-5" />
            </button>
            <button className="p-3 bg-white border border-border rounded-xl text-muted hover:text-accent transition-all shadow-sm">
               <Download className="w-5 h-5" />
            </button>
            <button className="px-6 py-3 bg-accent text-white font-bold rounded-xl shadow-lg shadow-accent/20 flex items-center gap-2 text-sm">
               <Plus className="w-4 h-4" /> إضافة قماش للمقارنة
            </button>
         </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-white rounded-[40px] border border-border shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="p-8 text-right border-b border-l border-border w-64 bg-white sticky right-0 z-10">
                   <span className="text-xs font-black text-muted uppercase tracking-widest">المواصفات</span>
                </th>
                {selectedFabrics.map((fabric) => (
                  <th key={fabric.id} className="p-8 border-b border-border min-w-[280px] relative group">
                    <button 
                      onClick={() => removeFabric(fabric.id)}
                      className="absolute top-4 left-4 p-1.5 bg-red-50 text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"
                    >
                      <X className="w-3 h-3" />
                    </button>
                    <div className="space-y-4 text-center">
                       <div className="w-full h-40 bg-ecru rounded-2xl overflow-hidden shadow-inner">
                          <img 
                            src={`https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=200&auto=format&fit=crop&sig=${fabric.id}`} 
                            alt={fabric.name}
                            className="w-full h-full object-cover"
                          />
                       </div>
                       <div>
                          <h4 className="font-black text-charcoal">{fabric.name}</h4>
                          <p className="text-[10px] text-accent font-bold">{fabric.supplier}</p>
                       </div>
                    </div>
                  </th>
                ))}
                {selectedFabrics.length < 5 && (
                  <th className="p-8 border-b border-border min-w-[280px]">
                     <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-border rounded-3xl p-12 text-muted hover:border-accent hover:text-accent cursor-pointer transition-all">
                        <Plus className="w-8 h-8 mb-2" />
                        <span className="text-xs font-bold">إضافة قماش</span>
                     </div>
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {[
                { label: 'السعر التقديري', key: 'price', icon: <Layers className="w-4 h-4" /> },
                { label: 'الجراماج (GSM)', key: 'gsm', icon: <Maximize2 className="w-4 h-4" /> },
                { label: 'العرض (Laize)', key: 'width', icon: <Ruler className="w-4 h-4" /> },
                { label: 'التركيبة', key: 'composition', icon: <Info className="w-4 h-4" /> },
                { label: 'أقل كمية (MOQ)', key: 'moq', icon: <ShoppingCart className="w-4 h-4" /> },
                { label: 'مدة التوريد', key: 'leadTime', icon: <Clock className="w-4 h-4" /> },
              ].map((row, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/20'}>
                  <td className="p-6 border-l border-border bg-inherit sticky right-0 z-10 font-bold text-sm text-charcoal flex items-center gap-3">
                     <span className="p-2 bg-white rounded-lg shadow-sm">{row.icon}</span>
                     {row.label}
                  </td>
                  {selectedFabrics.map((fabric: any) => (
                    <td key={fabric.id} className="p-6 text-center border-border">
                       <span className={`
                         text-sm font-bold
                         ${row.key === 'price' ? 'text-accent text-lg' : 'text-charcoal'}
                       `}>
                         {fabric[row.key]}
                       </span>
                    </td>
                  ))}
                  {selectedFabrics.length < 5 && <td className="p-6 border-border" />}
                </tr>
              ))}
              <tr>
                 <td className="p-8 border-l border-border bg-white sticky right-0 z-10" />
                 {selectedFabrics.map((fabric) => (
                   <td key={fabric.id} className="p-8 text-center border-border">
                      <button className="w-full py-4 bg-charcoal text-white rounded-2xl font-bold hover:bg-burgundy transition-all flex items-center justify-center gap-2 group">
                        طلب عرض سعر <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                   </td>
                 ))}
                 {selectedFabrics.length < 5 && <td className="p-8 border-border" />}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Pro Tip */}
      <div className="bg-gold/5 border border-gold/20 p-6 rounded-3xl flex items-start gap-4">
         <div className="p-3 bg-gold/10 rounded-2xl">
            <Check className="w-6 h-6 text-gold" />
         </div>
         <div className="space-y-1">
            <h4 className="font-bold text-gold-dark">نصيحة الخبراء</h4>
            <p className="text-xs text-gold-dark/70 leading-relaxed">
              عند اختيار الأقمشة الفاخرة مثل الجاكارد، يفضل دائماً طلب عينة (Sample) قبل إتمام الطلب الكبير للتأكد من الملمس الحقيقي وانعكاس الضوء.
            </p>
         </div>
      </div>

    </div>
  );
}
