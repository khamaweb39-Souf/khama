'use client';

import React, { useState } from 'react';
import { 
  Calculator, Ruler, DollarSign, Palette, 
  Droplets, Maximize2, ChevronRight, History, 
  Info, Share2, Download
} from 'lucide-react';
import GSMCalculator from '@/components/tools/GSMCalculator';
import YardageConverter from '@/components/tools/YardageConverter';
import CostCalculator from '@/components/tools/CostCalculator';
import ColorConverter from '@/components/tools/ColorConverter';
import ShrinkageCalculator from '@/components/tools/ShrinkageCalculator';
import WasteEstimator from '@/components/tools/WasteEstimator';

type ToolId = 'gsm' | 'yardage' | 'cost' | 'color' | 'shrinkage' | 'waste';

export default function ToolsPage() {
  const [activeTool, setActiveTool] = useState<ToolId>('gsm');

  const tools = [
    { id: 'gsm', label: 'Calculateur GSM', icon: Calculator, description: 'Estimer le grammage théorique selon le tissage.' },
    { id: 'yardage', label: 'Convertisseur Métrage', icon: Ruler, description: 'Mètres, yards et poids de commande.' },
    { id: 'cost', label: 'Coût de Revient', icon: DollarSign, description: 'Calculer le prix réel au mètre livré.' },
    { id: 'color', label: 'Pantone / Couleur', icon: Palette, description: 'Convertir les codes Pantone en HEX/RGB.' },
    { id: 'shrinkage', label: 'Lavage & Retrait', icon: Droplets, description: 'Estimer le rétrécissement après lavage.' },
    { id: 'waste', label: 'Économie Matière', icon: Maximize2, description: 'Optimiser le placement et réduire les chutes.' },
  ];

  const ActiveToolComponent = {
    gsm: GSMCalculator,
    yardage: YardageConverter,
    cost: CostCalculator,
    color: ColorConverter,
    shrinkage: ShrinkageCalculator,
    waste: WasteEstimator,
  }[activeTool];

  return (
    <div className="min-h-screen bg-[#F9F9F9] pb-20 pt-10" dir="ltr">
      
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="mb-12 space-y-2">
           <h1 className="text-4xl font-black text-charcoal tracking-tight">Outils Textiles Professionnels</h1>
           <p className="text-muted font-medium">Calculatrices techniques et convertisseurs pour les experts de la mode.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Navigation Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-3xl p-4 shadow-sm border border-border">
              {tools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => setActiveTool(tool.id as ToolId)}
                  className={`w-full flex items-start gap-4 p-4 rounded-2xl transition-all text-left ${
                    activeTool === tool.id 
                      ? 'bg-accent text-white shadow-lg shadow-accent/20' 
                      : 'hover:bg-gray-50 text-muted'
                  }`}
                >
                  <div className={`p-2 rounded-xl ${activeTool === tool.id ? 'bg-white/20' : 'bg-gray-100 text-accent'}`}>
                    <tool.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className={`font-bold text-sm ${activeTool === tool.id ? 'text-white' : 'text-charcoal'}`}>{tool.label}</p>
                    <p className={`text-[10px] leading-tight mt-1 ${activeTool === tool.id ? 'text-white/70' : 'text-muted'}`}>{tool.description}</p>
                  </div>
                  <ChevronRight className={`w-4 h-4 ml-auto mt-1 transition-transform ${activeTool === tool.id ? 'translate-x-1' : 'opacity-0'}`} />
                </button>
              ))}
            </div>

            <div className="p-6 bg-ecru/30 rounded-3xl border border-ecru flex items-start gap-3">
               <Info className="w-5 h-5 text-gold shrink-0 mt-0.5" />
               <p className="text-[10px] text-muted leading-relaxed">
                 Ces outils sont fournis à titre indicatif. Les résultats peuvent varier selon les tolérances industrielles (±5%).
               </p>
            </div>

            <div className="p-6 bg-white border border-border rounded-3xl space-y-4 shadow-sm">
               <h4 className="text-xs font-bold text-charcoal flex items-center gap-2">
                  <History className="w-4 h-4 text-accent" /> Historique Récent
               </h4>
               <div className="space-y-2">
                  <p className="text-[10px] text-muted italic">Aucun calcul récent trouvé.</p>
               </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-sm border border-border min-h-[600px] flex flex-col">
               <div className="flex justify-between items-center mb-12">
                  <div>
                    <h2 className="text-2xl font-black text-charcoal">{tools.find(t => t.id === activeTool)?.label}</h2>
                    <p className="text-xs text-muted font-bold tracking-widest uppercase mt-1">Version 1.0 • Expert Suite</p>
                  </div>
                  <div className="flex gap-2">
                     <button className="p-3 bg-gray-50 rounded-xl text-muted hover:text-accent transition-colors"><Share2 className="w-5 h-5" /></button>
                     <button className="p-3 bg-gray-50 rounded-xl text-muted hover:text-accent transition-colors"><Download className="w-5 h-5" /></button>
                  </div>
               </div>

               <div className="flex-1">
                  <ActiveToolComponent />
               </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
