'use client';

import React, { useState, useEffect } from 'react';
import { 
  Calculator, Truck, Package, 
  ArrowRight, Info, AlertCircle,
  TrendingDown, Globe, Ruler
} from 'lucide-react';

const FABRIC_TYPES = [
  { id: 'cotton', name: 'قطن', basePrice: 1200, weight: 0.18 },
  { id: 'silk', name: 'حرير', basePrice: 3500, weight: 0.08 },
  { id: 'wool', name: 'صوف', basePrice: 2200, weight: 0.35 },
  { id: 'poly', name: 'بوليستر', basePrice: 850, weight: 0.15 }
];

const SHIPPING_ZONES = [
  { id: 'north', name: 'الشمال (الجزائر/وهران/عنابة)', pricePerKg: 50 },
  { id: 'south', name: 'الجنوب (بشار/تمنراست/أدرار)', pricePerKg: 150 },
  { id: 'international', name: 'دولي (أوروبا/أفريقيا)', pricePerKg: 850 }
];

export default function CalculatorPage() {
  const [meters, setMeters] = useState(100);
  const [fabricId, setFabricId] = useState('cotton');
  const [zoneId, setZoneId] = useState('north');
  const [isBulk, setIsBulk] = useState(false);

  const selectedFabric = FABRIC_TYPES.find(f => f.id === fabricId);
  const selectedZone = SHIPPING_ZONES.find(z => z.id === zoneId);

  const [results, setResults] = useState({
    subtotal: 0,
    shipping: 0,
    discount: 0,
    total: 0,
    totalWeight: 0
  });

  useEffect(() => {
    if (!selectedFabric || !selectedZone) return;

    const baseCost = meters * selectedFabric.basePrice;
    const weight = meters * selectedFabric.weight;
    const shippingCost = weight * selectedZone.pricePerKg;
    
    let discount = 0;
    if (meters >= 1000) discount = baseCost * 0.15;
    else if (meters >= 500) discount = baseCost * 0.10;
    else if (meters >= 200) discount = baseCost * 0.05;

    setResults({
      subtotal: baseCost,
      shipping: shippingCost,
      discount: discount,
      total: baseCost + shippingCost - discount,
      totalWeight: weight
    });

    setIsBulk(meters >= 200);
  }, [meters, fabricId, zoneId]);

  return (
    <div className="min-h-screen bg-[#FDFCFB] pt-32 pb-20" dir="rtl">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-20">
           <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center text-gold mx-auto border-2 border-gold/20 shadow-inner">
              <Calculator className="w-8 h-8" />
           </div>
           <h1 className="text-5xl font-black text-burgundy tracking-tight">حاسبة <span className="text-gold">الطلبات الضخمة</span></h1>
           <p className="text-muted font-medium max-w-2xl mx-auto">أداة تفاعلية لتقدير التكاليف الإجمالية للمشاريع الصناعية الكبرى، تشمل تكاليف الشحن والخصومات الحجمية.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
           
           {/* Controls Section */}
           <div className="lg:col-span-2 space-y-8">
              <div className="bg-white p-10 rounded-[3.5rem] shadow-xl shadow-gray-200/50 border border-ecru space-y-12">
                 
                 {/* Meter Input */}
                 <div className="space-y-6">
                    <div className="flex justify-between items-center">
                       <label className="text-sm font-black text-burgundy uppercase tracking-widest flex items-center gap-2">
                          <Ruler className="w-4 h-4 text-gold" /> الكمية المطلوبة (بالمتر)
                       </label>
                       <span className="text-2xl font-black text-gold">{meters} م</span>
                    </div>
                    <input 
                      type="range" 
                      min="10" 
                      max="5000" 
                      step="10"
                      value={meters}
                      onChange={(e) => setMeters(Number(e.target.value))}
                      className="w-full h-3 bg-ecru rounded-full appearance-none cursor-pointer accent-burgundy"
                    />
                    <div className="flex justify-between text-[10px] font-black text-muted uppercase tracking-[0.2em]">
                       <span>10 م (عينة)</span>
                       <span>5000 م (صناعي)</span>
                    </div>
                 </div>

                 {/* Selection Grid */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                       <label className="text-sm font-black text-burgundy uppercase tracking-widest flex items-center gap-2">
                          <Package className="w-4 h-4 text-gold" /> نوع القماش
                       </label>
                       <div className="grid grid-cols-2 gap-3">
                          {FABRIC_TYPES.map(f => (
                            <button 
                              key={f.id}
                              onClick={() => setFabricId(f.id)}
                              className={`p-4 rounded-2xl border-2 text-xs font-black transition-all ${fabricId === f.id ? 'border-gold bg-gold/5 text-burgundy shadow-lg' : 'border-ecru hover:border-gold/30 text-muted'}`}
                            >
                               {f.name}
                            </button>
                          ))}
                       </div>
                    </div>

                    <div className="space-y-4">
                       <label className="text-sm font-black text-burgundy uppercase tracking-widest flex items-center gap-2">
                          <Truck className="w-4 h-4 text-gold" /> منطقة الشحن
                       </label>
                       <select 
                         value={zoneId}
                         onChange={(e) => setZoneId(e.target.value)}
                         className="w-full bg-ecru/30 border-2 border-ecru py-4 px-6 rounded-2xl outline-none focus:border-gold transition-all text-xs font-black text-charcoal appearance-none"
                       >
                          {SHIPPING_ZONES.map(z => (
                            <option key={z.id} value={z.id}>{z.name}</option>
                          ))}
                       </select>
                    </div>
                 </div>

              </div>

              {/* Bulk Benefits Card */}
              <div className="bg-burgundy rounded-[3rem] p-10 flex items-center gap-10 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5" />
                 <div className="w-20 h-20 bg-gold rounded-[2rem] flex items-center justify-center shrink-0 shadow-2xl group-hover:scale-110 transition-transform">
                    <TrendingDown className="w-10 h-10 text-white" />
                 </div>
                 <div className="space-y-2 relative z-10 text-right">
                    <h3 className="text-xl font-black text-white">وفّر حتى 15% مع الطلبات الصناعية</h3>
                    <p className="text-white/40 text-xs font-medium leading-relaxed">
                       نحن نقدم أسعاراً تفضيلية للكميات التي تتجاوز 1000 متر. السعر الموضح يشمل الخصم التلقائي المطبق.
                    </p>
                 </div>
              </div>
           </div>

           {/* Results Section */}
           <div className="space-y-8">
              <div className="bg-white p-10 rounded-[3.5rem] shadow-2xl shadow-burgundy/5 border-2 border-gold/20 space-y-8 relative overflow-hidden">
                 {/* Results Header */}
                 <div className="flex justify-between items-center pb-6 border-b border-ecru">
                    <h3 className="text-xl font-black text-burgundy">ملخص التقدير</h3>
                    <span className="bg-gold/10 text-gold px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-gold/20">تقديري</span>
                 </div>

                 {/* Calculations */}
                 <div className="space-y-4">
                    <div className="flex justify-between text-sm font-medium text-muted">
                       <span>تكلفة الأقمشة</span>
                       <span className="font-black text-charcoal">{results.subtotal.toLocaleString()} دج</span>
                    </div>
                    <div className="flex justify-between text-sm font-medium text-muted">
                       <span>تكلفة الشحن ({results.totalWeight.toFixed(1)} كجم)</span>
                       <span className="font-black text-charcoal">+{results.shipping.toLocaleString()} دج</span>
                    </div>
                    {results.discount > 0 && (
                      <div className="flex justify-between text-sm font-black text-success">
                         <span>خصم الكمية</span>
                         <span>-{results.discount.toLocaleString()} دج</span>
                      </div>
                    )}
                 </div>

                 {/* Grand Total */}
                 <div className="pt-8 border-t-2 border-dashed border-ecru space-y-2">
                    <span className="text-[10px] font-black text-muted uppercase tracking-[0.3em]">الإجمالي النهائي</span>
                    <div className="flex items-baseline gap-2">
                       <h2 className="text-4xl font-black text-burgundy">{results.total.toLocaleString()}</h2>
                       <span className="text-sm font-black text-muted uppercase">DZD</span>
                    </div>
                 </div>

                 {/* Actions */}
                 <div className="space-y-4 pt-4">
                    <button className="w-full py-5 bg-burgundy text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-burgundy/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3">
                       تحويل إلى طلب رسمي <ArrowRight className="w-4 h-4" />
                    </button>
                    <button className="w-full py-5 border-2 border-ecru text-charcoal rounded-2xl text-[11px] font-black hover:border-gold hover:text-gold transition-all">
                       تحميل ملف التقدير (PDF)
                    </button>
                 </div>

                 {/* Disclaimer */}
                 <div className="flex gap-3 p-4 bg-ecru/30 rounded-2xl border border-ecru/50">
                    <AlertCircle className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    <p className="text-[9px] text-muted font-bold leading-relaxed italic">
                       هذا التقدير مبني على الأسعار الحالية وقد يتغير بناءً على توافر المخزون وتفاصيل الشحن النهائية من المورد.
                    </p>
                 </div>
              </div>

              {/* International Shipping Note */}
              <div className="p-8 bg-white rounded-[2.5rem] border border-ecru flex items-center gap-6">
                 <Globe className="w-10 h-10 text-gold shrink-0" />
                 <p className="text-[10px] font-bold text-muted leading-relaxed">
                    للطلبات الدولية خارج الجزائر، يرجى التواصل مع فريق التخليص الجمركي لدينا للحصول على تفاصيل دقيقة حول الرسوم والضرائب.
                 </p>
              </div>
           </div>

        </div>

      </div>
    </div>
  );
}
