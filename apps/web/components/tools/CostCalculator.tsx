'use client';

import React, { useState, useEffect } from 'react';
import { DollarSign, Truck, ShieldCheck, TrendingUp } from 'lucide-react';

export default function CostCalculator() {
  const [unitPrice, setUnitPrice] = useState(10);
  const [quantity, setQuantity] = useState(1000);
  const [shipping, setShipping] = useState(500);
  const [customs, setCustoms] = useState(15); // %
  const [waste, setWaste] = useState(5); // %
  
  const [totalCost, setTotalCost] = useState(0);
  const [costPerMeter, setCostPerMeter] = useState(0);

  useEffect(() => {
    const rawTotal = unitPrice * quantity;
    const customsValue = (rawTotal + shipping) * (customs / 100);
    const total = rawTotal + shipping + customsValue;
    
    // Effective usable meters after waste
    const usableMeters = quantity * (1 - waste / 100);
    
    setTotalCost(total);
    setCostPerMeter(total / usableMeters);
  }, [unitPrice, quantity, shipping, customs, waste]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500" dir="rtl">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-charcoal flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-accent" />
            التكاليف الأساسية (EXW/FOB)
          </h3>
          
          <div className="space-y-4 text-right">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-muted uppercase mb-1 block">السعر المرجعي (€/م)</label>
                <input 
                  type="number" 
                  value={unitPrice} 
                  onChange={(e) => setUnitPrice(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-border focus:border-accent outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-muted uppercase mb-1 block">الكمية (م)</label>
                <input 
                  type="number" 
                  value={quantity} 
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-border focus:border-accent outline-none"
                />
              </div>
            </div>

            <h3 className="text-lg font-bold text-charcoal pt-4 border-t border-gray-100 flex items-center gap-2">
              <Truck className="w-5 h-5 text-accent" />
              اللوجستيات والجمارك
            </h3>

            <div>
              <label className="text-xs font-bold text-muted uppercase mb-1 block">تكاليف الشحن (€)</label>
              <input 
                type="number" 
                value={shipping} 
                onChange={(e) => setShipping(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-border focus:border-accent outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-muted uppercase mb-1 block">رسوم الجمارك (%)</label>
                <input 
                  type="number" 
                  value={customs} 
                  onChange={(e) => setCustoms(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-border focus:border-accent outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-muted uppercase mb-1 block">نسبة الهالك (%)</label>
                <input 
                  type="number" 
                  value={waste} 
                  onChange={(e) => setWaste(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-border focus:border-accent outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border-2 border-accent rounded-3xl p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between text-right">
           <div className="absolute top-0 right-0 p-8 opacity-5">
              <TrendingUp className="w-40 h-40" />
           </div>

           <div className="space-y-8 relative z-10">
              <div>
                <p className="text-xs font-bold text-muted uppercase tracking-widest mb-2">التكلفة الحقيقية للمتر الواصل</p>
                <div className="flex items-baseline justify-start gap-2">
                   <span className="text-6xl font-black text-accent">{costPerMeter.toFixed(2)}</span>
                   <span className="text-xl font-bold text-muted">€ / م</span>
                </div>
                <div className="flex items-center justify-start gap-2 mt-2">
                   <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${costPerMeter > unitPrice ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                      +{Math.round(((costPerMeter - unitPrice) / unitPrice) * 100)}% مقارنة بالسعر الأصلي
                   </span>
                </div>
              </div>

              <div className="space-y-4 pt-8 border-t border-gray-100">
                 <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-charcoal">{totalCost.toLocaleString()} €</span>
                    <span className="text-sm text-muted">إجمالي الاستثمار</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-charcoal">{Math.round((unitPrice * quantity + shipping) * (customs / 100)).toLocaleString()} €</span>
                    <span className="text-sm text-muted">رسوم الجمارك</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-red-500">-{Math.round(quantity * (waste / 100))} م</span>
                    <span className="text-sm text-muted">فقد المادة (الهالك)</span>
                 </div>
              </div>

              <button className="w-full bg-accent text-white py-4 rounded-xl font-bold hover:bg-opacity-90 transition-all shadow-lg shadow-accent/20">
                 تصدير التحليل بصيغة PDF
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
