'use client';

import React, { useState, useEffect } from 'react';
import { Droplets, Thermometer, ShieldAlert, Ruler } from 'lucide-react';

export default function ShrinkageCalculator() {
  const [fiber, setFiber] = useState('coton');
  const [temp, setTemp] = useState(40);
  const [treatment, setTreatment] = useState('aucun');
  
  const [shrinkage, setShrinkage] = useState(0);
  const [originalLen, setOriginalLen] = useState(100);

  const calculateShrinkage = () => {
    let base = 0;
    if (fiber === 'coton') base = 3;
    else if (fiber === 'lin') base = 5;
    else if (fiber === 'viscose') base = 7;
    else if (fiber === 'polyester') base = 0.5;
    else if (fiber === 'laine') base = 8;

    // Heat factor
    const heatFactor = (temp - 30) / 10 * 0.5;
    
    // Treatment factor
    const treatFactor = treatment === 'sanforise' ? -2.5 : 0;

    const result = Math.max(0.1, base + heatFactor + treatFactor);
    setShrinkage(Number(result.toFixed(1)));
  };

  useEffect(() => {
    calculateShrinkage();
  }, [fiber, temp, treatment]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500" dir="rtl">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-charcoal flex items-center gap-2">
            <Droplets className="w-5 h-5 text-accent" />
            ظروف الغسيل والمعالجة
          </h3>
          
          <div className="space-y-4 text-right">
            <div>
              <label className="text-xs font-bold text-muted uppercase mb-1 block">التركيبة الرئيسية للألياف</label>
              <select 
                value={fiber} 
                onChange={(e) => setFiber(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border focus:border-accent outline-none bg-white font-bold"
              >
                <option value="coton">قطن (100%)</option>
                <option value="lin">كتان (100%)</option>
                <option value="viscose">فيسكوز / رايون</option>
                <option value="polyester">بوليستر / صناعي</option>
                <option value="laine">صوف (غسيل يدوي)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-muted uppercase mb-1 block">درجة حرارة الغسيل (°م)</label>
              <div className="flex gap-2">
                {[30, 40, 60, 90].map(t => (
                  <button 
                    key={t}
                    onClick={() => setTemp(t)}
                    className={`flex-1 py-3 rounded-xl border-2 font-bold transition-all ${temp === t ? 'border-accent bg-accent/5 text-accent' : 'border-border text-muted hover:bg-gray-50'}`}
                  >
                    {t}°
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-muted uppercase mb-1 block">معالجة مسبقة ضد الانكماش</label>
              <select 
                value={treatment} 
                onChange={(e) => setTreatment(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border focus:border-accent outline-none bg-white"
              >
                <option value="aucun">بدون (قماش خام)</option>
                <option value="sanforise">Sanforized (مثبت)</option>
                <option value="pre-lave">مغسول مسبقاً في المصنع</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-6">
           <div className="p-8 bg-red-50 border-2 border-red-100 rounded-3xl text-center space-y-4">
              <ShieldAlert className="w-10 h-10 text-red-500 mx-auto" />
              <div>
                <p className="text-xs font-bold text-red-400 uppercase tracking-widest mb-1">الانكماش المتوقع</p>
                <p className="text-6xl font-black text-red-600">{shrinkage}%</p>
              </div>
              <p className="text-[10px] text-red-400 leading-relaxed font-bold">
                تنبيه: يرجى إضافة هامش خياطة إضافي لتعويض هذا الفقد في الأبعاد.
              </p>
           </div>

           <div className="p-6 bg-white border border-border rounded-2xl space-y-4 text-right">
              <h4 className="text-xs font-bold text-muted uppercase flex items-center justify-end gap-2">
                حساب القص <Ruler className="w-4 h-4" />
              </h4>
              <div className="flex gap-4">
                 <div className="flex-1">
                    <label className="text-[10px] text-muted mb-1 block">المقاس المستهدف (سم)</label>
                    <input 
                      type="number" 
                      value={originalLen}
                      onChange={(e) => setOriginalLen(Number(e.target.value))}
                      className="w-full px-3 py-2 border rounded-lg outline-none focus:border-accent text-right" 
                    />
                 </div>
                 <div className="flex-1">
                    <label className="text-[10px] text-muted mb-1 block">مقاس القص المطلوب</label>
                    <div className="px-3 py-2 bg-gray-50 border border-transparent rounded-lg font-bold text-charcoal text-center">
                       {Math.ceil(originalLen * (1 + shrinkage / 100))} سم
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
