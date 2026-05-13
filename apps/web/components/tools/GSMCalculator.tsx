'use client';

import React, { useState, useEffect } from 'react';
import { Info, Calculator, Copy, RefreshCw } from 'lucide-react';

export default function GSMCalculator() {
  const [warpDensity, setWarpDensity] = useState(40); // fils/cm
  const [weftDensity, setWeftDensity] = useState(30); // duites/cm
  const [warpCount, setWarpCount] = useState(20); // Nm or Ne
  const [weftCount, setWeftCount] = useState(20);
  const [unit, setUnit] = useState<'Nm' | 'Ne'>('Nm');
  const [result, setResult] = useState<number | null>(null);

  const calculateGSM = () => {
    let wCount = warpCount;
    let fCount = weftCount;

    // Convert Ne to Nm if needed (Ne * 1.693 = Nm for cotton)
    if (unit === 'Ne') {
      wCount = warpCount * 1.693;
      fCount = weftCount * 1.693;
    }

    // Formula: (Density / Count) * 10 = g/m2 (simplified for Nm)
    const warpGSM = (warpDensity / wCount) * 10;
    const weftGSM = (weftDensity / fCount) * 10;
    
    // Add 5% for crimp/weave take-up
    const total = (warpGSM + weftGSM) * 1.05;
    setResult(Math.round(total));
  };

  useEffect(() => {
    calculateGSM();
  }, [warpDensity, weftDensity, warpCount, weftCount, unit]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500" dir="rtl">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-charcoal flex items-center gap-2">
            <Calculator className="w-5 h-5 text-accent" />
            إعدادات النسيج
          </h3>
          
          <div className="space-y-3 text-right">
            <div>
              <label className="text-xs font-bold text-muted uppercase mb-1 block">كثافة السداء (fils/cm)</label>
              <input 
                type="number" 
                value={warpDensity} 
                onChange={(e) => setWarpDensity(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-border focus:border-accent outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-muted uppercase mb-1 block">كثافة اللحمة (duites/cm)</label>
              <input 
                type="number" 
                value={weftDensity} 
                onChange={(e) => setWeftDensity(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-border focus:border-accent outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-muted uppercase mb-1 block">نمرة السداء</label>
                <input 
                  type="number" 
                  value={warpCount} 
                  onChange={(e) => setWarpCount(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-border focus:border-accent outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-muted uppercase mb-1 block">نمرة اللحمة</label>
                <input 
                  type="number" 
                  value={weftCount} 
                  onChange={(e) => setWeftCount(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-border focus:border-accent outline-none"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-muted uppercase mb-1 block">نظام الترقيم</label>
              <select 
                value={unit} 
                onChange={(e) => setUnit(e.target.value as any)}
                className="w-full px-4 py-3 rounded-xl border border-border focus:border-accent outline-none bg-white"
              >
                <option value="Nm">Nm (ترقيم متري)</option>
                <option value="Ne">Ne (ترقيم إنجليزي - قطن)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-ecru/30 rounded-3xl p-8 border border-ecru flex flex-col items-center justify-center text-center space-y-6">
          <div>
            <p className="text-xs font-bold text-muted uppercase tracking-widest mb-2">الجراماج النظري المقدر</p>
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-6xl font-black text-charcoal">{result}</span>
              <span className="text-xl font-bold text-muted">جم/م²</span>
            </div>
            <p className="text-[10px] text-muted mt-4 max-w-[200px] mx-auto">
              *تقدير بناءً على متوسط انكماش 5%. قد تختلف النتيجة الفعلية حسب نوع النسيج.
            </p>
          </div>

          <div className="w-full pt-6 border-t border-ecru space-y-3">
             <div className="flex justify-between text-xs">
                <span className="font-bold text-charcoal">{Math.round((result || 0) * 0.6)} جم/م²</span>
                <span className="text-muted">:وزن السداء</span>
             </div>
             <div className="flex justify-between text-xs">
                <span className="font-bold text-charcoal">{Math.round((result || 0) * 0.4)} جم/م²</span>
                <span className="text-muted">:وزن اللحمة</span>
             </div>
          </div>

          <button 
            onClick={() => navigator.clipboard.writeText(`${result} g/m2`)}
            className="w-full bg-white border border-border py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-all"
          >
            <Copy className="w-4 h-4" /> نسخ النتيجة
          </button>
        </div>
      </div>
    </div>
  );
}
