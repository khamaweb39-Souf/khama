'use client';

import React, { useState, useEffect } from 'react';
import { Palette, Search, Copy, RefreshCw } from 'lucide-react';

const PANTONE_DB: Record<string, string> = {
  "19-4052": "#0F4C81", // Classic Blue
  "17-5104": "#939597", // Ultimate Gray
  "13-0647": "#F5DF4D", // Illuminating
  "18-1750": "#E03C31", // Viva Magenta (approx)
  "16-1546": "#FF6F61", // Living Coral
  "18-3838": "#5F4B8B", // Ultra Violet
  "15-0343": "#88B04B", // Greenery
  "13-1520": "#F7CAC9", // Rose Quartz
  "15-3919": "#92A8D1", // Serenity
  "18-1438": "#955251", // Marsala
  "18-3224": "#B163A3", // Radiant Orchid
  "17-5641": "#009473", // Emerald
  "17-1463": "#E2583E", // Tangerine Tango
  "18-2120": "#D94F70", // Honeysuckle
  "15-5519": "#45B1AC", // Turquoise
};

export default function ColorConverter() {
  const [query, setQuery] = useState("19-4052");
  const [hex, setHex] = useState("#0F4C81");
  const [rgb, setRgb] = useState("15, 76, 129");
  
  const handleSearch = (code: string) => {
    setQuery(code);
    const found = PANTONE_DB[code];
    if (found) {
      setHex(found);
      updateRgb(found);
    }
  };

  const updateRgb = (hexValue: string) => {
    const r = parseInt(hexValue.slice(1, 3), 16);
    const g = parseInt(hexValue.slice(3, 5), 16);
    const b = parseInt(hexValue.slice(5, 7), 16);
    setRgb(`${r}, ${g}, ${b}`);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-charcoal flex items-center gap-2">
            <Palette className="w-5 h-5 text-accent" />
            Recherche Pantone Textile (TCX/TPX)
          </h3>
          
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
            <input 
              type="text" 
              placeholder="Ex: 19-4052..." 
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-border focus:border-accent outline-none font-bold text-lg"
            />
          </div>

          <div className="space-y-3">
             <p className="text-xs font-bold text-muted uppercase tracking-widest">Couleurs Populaires</p>
             <div className="flex flex-wrap gap-2">
                {Object.keys(PANTONE_DB).map(code => (
                  <button 
                    key={code}
                    onClick={() => handleSearch(code)}
                    className={`w-10 h-10 rounded-lg border-2 transition-all ${query === code ? 'border-accent scale-110 shadow-lg' : 'border-transparent'}`}
                    style={{ backgroundColor: PANTONE_DB[code] }}
                    title={code}
                  />
                ))}
             </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
           {/* Color Preview */}
           <div className="h-48 rounded-3xl shadow-2xl border-4 border-white overflow-hidden relative group">
              <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110" style={{ backgroundColor: hex }} />
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-xl">
                 <p className="text-[10px] font-bold text-muted uppercase">Aperçu Réel</p>
                 <p className="text-sm font-black text-charcoal">PANTONE {query}</p>
              </div>
           </div>

           <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white border border-border rounded-2xl space-y-1">
                 <p className="text-[10px] text-muted font-bold uppercase">HEX Code</p>
                 <div className="flex justify-between items-center">
                    <span className="text-lg font-black text-charcoal">{hex}</span>
                    <button onClick={() => navigator.clipboard.writeText(hex)} className="text-muted hover:text-accent"><Copy className="w-4 h-4" /></button>
                 </div>
              </div>
              <div className="p-4 bg-white border border-border rounded-2xl space-y-1">
                 <p className="text-[10px] text-muted font-bold uppercase">RGB Values</p>
                 <div className="flex justify-between items-center">
                    <span className="text-lg font-black text-charcoal">{rgb}</span>
                    <button onClick={() => navigator.clipboard.writeText(rgb)} className="text-muted hover:text-accent"><Copy className="w-4 h-4" /></button>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
