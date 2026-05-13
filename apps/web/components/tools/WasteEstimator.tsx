'use client';

import React, { useState, useEffect } from 'react';
import { Layout, Maximize2, Scissors, Info } from 'lucide-react';

export default function WasteEstimator() {
  const [laize, setLaize] = useState(150); // cm
  const [patternWidth, setPatternWidth] = useState(60); // cm
  const [patternLength, setPatternLength] = useState(80); // cm
  const [layers, setLayers] = useState(1);
  
  const [wastePercent, setWastePercent] = useState(0);
  const [efficiency, setEfficiency] = useState(0);

  const calculateWaste = () => {
    // Basic rectangular efficiency calculation
    const patternArea = (patternWidth * patternLength);
    const fitInWidth = Math.floor(laize / patternWidth);
    
    if (fitInWidth === 0) {
      setWastePercent(100);
      setEfficiency(0);
      return;
    }

    const usedWidth = fitInWidth * patternWidth;
    const eff = (usedWidth / laize) * 100;
    
    setEfficiency(Math.round(eff));
    setWastePercent(100 - Math.round(eff));
  };

  useEffect(() => {
    calculateWaste();
  }, [laize, patternWidth, patternLength]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-charcoal flex items-center gap-2">
            <Maximize2 className="w-5 h-5 text-accent" />
            Dimensions de la Laize & Gabarit
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-muted uppercase mb-1 block">Laize Utile du Tissu (cm)</label>
              <input 
                type="number" 
                value={laize} 
                onChange={(e) => setLaize(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-border focus:border-accent outline-none font-bold"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="text-xs font-bold text-muted uppercase mb-1 block">Largeur Gabarit (cm)</label>
                  <input 
                    type="number" 
                    value={patternWidth} 
                    onChange={(e) => setPatternWidth(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl border border-border focus:border-accent outline-none"
                  />
               </div>
               <div>
                  <label className="text-xs font-bold text-muted uppercase mb-1 block">Longueur Gabarit (cm)</label>
                  <input 
                    type="number" 
                    value={patternLength} 
                    onChange={(e) => setPatternLength(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl border border-border focus:border-accent outline-none"
                  />
               </div>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-start gap-3">
               <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
               <p className="text-[10px] text-blue-600 leading-relaxed">
                 Le placement optimal dépend de l'orientation du droit-fil. Ce calcul suppose un placement rectangulaire simple sans rotation.
               </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
           <div className="p-8 bg-charcoal rounded-3xl text-white space-y-6">
              <div className="flex justify-between items-center">
                 <h4 className="text-xs font-bold text-gold uppercase tracking-widest">Efficacité de Placement</h4>
                 <Scissors className="w-5 h-5 text-gold" />
              </div>
              
              <div className="space-y-2">
                 <div className="flex justify-between items-end">
                    <span className="text-4xl font-black">{efficiency}%</span>
                    <span className="text-xs text-white/60 mb-1">Efficace</span>
                 </div>
                 <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gold transition-all duration-1000" style={{ width: `${efficiency}%` }} />
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                 <div>
                    <p className="text-[10px] text-white/60 uppercase mb-1">Perte (Chute)</p>
                    <p className="text-xl font-bold text-red-400">{wastePercent}%</p>
                 </div>
                 <div>
                    <p className="text-[10px] text-white/60 uppercase mb-1">Pièces par Rang</p>
                    <p className="text-xl font-bold text-white">{Math.floor(laize / patternWidth)} pcs</p>
                 </div>
              </div>
           </div>

           <div className="bg-ecru/30 p-6 rounded-3xl border border-ecru border-dashed flex flex-col items-center justify-center text-center space-y-2">
              <p className="text-xs font-bold text-charcoal">Optimisation Suggérée</p>
              <p className="text-[10px] text-muted leading-relaxed">
                {efficiency < 70 
                  ? "L'efficacité est faible. Essayez de pivoter les pièces ou de choisir une laize plus large (ex: 180cm)." 
                  : "Le placement est optimal pour cette laize."}
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
