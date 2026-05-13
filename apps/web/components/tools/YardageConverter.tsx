'use client';

import React, { useState, useEffect } from 'react';
import { Ruler, Repeat, ShoppingCart } from 'lucide-react';

export default function YardageConverter() {
  const [meters, setMeters] = useState(100);
  const [width, setWidth] = useState(150); // cm
  const [gsm, setGsm] = useState(200);
  const [pricePerMeter, setPricePerMeter] = useState(15);
  
  const [yards, setYards] = useState(0);
  const [totalWeight, setTotalWeight] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setYards(Number((meters * 1.09361).toFixed(2)));
    // (Meters * Width in m * GSM) / 1000 = kg
    const weight = (meters * (width / 100) * gsm) / 1000;
    setTotalWeight(Number(weight.toFixed(2)));
    setTotalPrice(meters * pricePerMeter);
  }, [meters, width, gsm, pricePerMeter]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500" dir="rtl">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-charcoal flex items-center gap-2">
            <Ruler className="w-5 h-5 text-accent" />
            إدخال المقاسات
          </h3>
          
          <div className="space-y-4 text-right">
            <div>
              <label className="text-xs font-bold text-muted uppercase mb-1 block">الكمية (أمتار)</label>
              <input 
                type="number" 
                value={meters} 
                onChange={(e) => setMeters(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-border focus:border-accent outline-none font-bold"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-muted uppercase mb-1 block">العرض / لايز (سم)</label>
                <input 
                  type="number" 
                  value={width} 
                  onChange={(e) => setWidth(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-border focus:border-accent outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-muted uppercase mb-1 block">الجراماج (GSM)</label>
                <input 
                  type="number" 
                  value={gsm} 
                  onChange={(e) => setGsm(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-border focus:border-accent outline-none"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-muted uppercase mb-1 block">السعر لكل متر (€)</label>
              <input 
                type="number" 
                value={pricePerMeter} 
                onChange={(e) => setPricePerMeter(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-border focus:border-accent outline-none text-accent"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="p-6 bg-white border border-border rounded-2xl flex items-center justify-between">
            <div className="p-3 bg-gray-50 rounded-xl text-muted">
              <Repeat className="w-5 h-5" />
            </div>
            <div className="space-y-1 text-left">
              <p className="text-[10px] text-muted uppercase font-bold text-right">تحويل الياردات</p>
              <p className="text-2xl font-black text-charcoal">{yards} <span className="text-sm font-normal">ياردة</span></p>
            </div>
          </div>

          <div className="p-6 bg-white border border-border rounded-2xl flex items-center justify-between">
            <div className="p-3 bg-gray-50 rounded-xl text-muted">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <div className="space-y-1 text-left">
              <p className="text-[10px] text-muted uppercase font-bold text-right">الوزن الإجمالي للطلب</p>
              <p className="text-2xl font-black text-charcoal">{totalWeight} <span className="text-sm font-normal">كجم</span></p>
            </div>
          </div>

          <div className="p-8 bg-charcoal rounded-3xl text-white flex flex-col justify-center text-right">
            <p className="text-[10px] text-gold uppercase font-bold tracking-widest mb-1">المبلغ الإجمالي المقدر</p>
            <p className="text-4xl font-black">{totalPrice.toLocaleString()} €</p>
            <div className="mt-4 pt-4 border-t border-white/10 flex justify-between text-xs text-white/60">
               <span className="font-bold text-white">~{Math.ceil(totalWeight * 1.2)} كجم</span>
               <span>الوزن الحجمي:</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
