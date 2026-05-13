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
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-charcoal flex items-center gap-2">
            <Droplets className="w-5 h-5 text-accent" />
            Conditions de Lavage
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-muted uppercase mb-1 block">Composition Principale</label>
              <select 
                value={fiber} 
                onChange={(e) => setFiber(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border focus:border-accent outline-none bg-white font-bold"
              >
                <option value="coton">Coton (100%)</option>
                <option value="lin">Lin (100%)</option>
                <option value="viscose">Viscose / Rayonne</option>
                <option value="polyester">Polyester / Synthétique</option>
                <option value="laine">Laine (Lavage main conseillé)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-muted uppercase mb-1 block">Température de Lavage (°C)</label>
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
              <label className="text-xs font-bold text-muted uppercase mb-1 block">Traitement Pré-rétrécissement</label>
              <select 
                value={treatment} 
                onChange={(e) => setTreatment(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border focus:border-accent outline-none bg-white"
              >
                <option value="aucun">Aucun (Tissu brut)</option>
                <option value="sanforise">Sanforisé (Stabilisé)</option>
                <option value="pre-lave">Pré-lavé en usine</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-6">
           <div className="p-8 bg-red-50 border-2 border-red-100 rounded-3xl text-center space-y-4">
              <ShieldAlert className="w-10 h-10 text-red-500 mx-auto" />
              <div>
                <p className="text-xs font-bold text-red-400 uppercase tracking-widest mb-1">Rétrécissement Estimé</p>
                <p className="text-6xl font-black text-red-600">{shrinkage}%</p>
              </div>
              <p className="text-[10px] text-red-400 leading-relaxed font-bold">
                ATTENTION: Prévoyez une marge de couture supplémentaire pour compenser cette perte dimensionnelle.
              </p>
           </div>

           <div className="p-6 bg-white border border-border rounded-2xl space-y-4">
              <h4 className="text-xs font-bold text-muted uppercase flex items-center gap-2">
                <Ruler className="w-4 h-4" /> Calcul de Coupe
              </h4>
              <div className="flex gap-4">
                 <div className="flex-1">
                    <label className="text-[10px] text-muted mb-1 block">Dimension Cible (cm)</label>
                    <input 
                      type="number" 
                      value={originalLen}
                      onChange={(e) => setOriginalLen(Number(e.target.value))}
                      className="w-full px-3 py-2 border rounded-lg outline-none focus:border-accent" 
                    />
                 </div>
                 <div className="flex-1">
                    <label className="text-[10px] text-muted mb-1 block">Dimension de Coupe</label>
                    <div className="px-3 py-2 bg-gray-50 border border-transparent rounded-lg font-bold text-charcoal">
                       {Math.ceil(originalLen * (1 + shrinkage / 100))} cm
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
