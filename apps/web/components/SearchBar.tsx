'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, Camera, X, History, TrendingUp, Factory, FileText, Book, ArrowRight } from 'lucide-react';

// ─── Mock Data ──────────────────────────────────────────────────────────────
const MOCK_SUGGESTIONS = {
  fabrics: [
    { id: 'f1', name: 'Sergé de laine 300g/m²', category: 'Tissus' },
    { id: 'f2', name: 'Coton Bio GOTS Certifié', category: 'Tissus' },
    { id: 'f3', name: 'Lin Lavé Premium', category: 'Tissus' },
  ],
  suppliers: [
    { id: 's1', name: 'Tissage de Lyon', type: 'Mill' },
    { id: 's2', name: 'Algeria Textiles Factory', type: 'Fabricant' },
  ],
  rfqs: [
    { id: 'r1', name: 'Demande : 5000m Denim Indigo', status: 'Actif' },
    { id: 'r2', name: 'Besoin : Soie Lyonnaise Blanche', status: 'Urgent' },
  ],
  glossary: [
    { term: 'GSM', definition: 'Grammes par mètre carré (densité)' },
    { term: 'GOTS', definition: 'Global Organic Textile Standard' },
  ]
};

const PLACEHOLDERS = [
  "Rechercher par type de tissu... ex: Sergé de laine",
  "Chercher par matière... ex: Coton bio GOTS",
  "Trouver par code couleur... ex: Pantone 19-4052",
  "Filtrer par densité... ex: Tissu léger 120g/m²"
];

// ─── Component ──────────────────────────────────────────────────────────────
export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [history, setHistory] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Dynamic Placeholder Rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Load History from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('khama_search_history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  // Handle Outside Click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const saveToHistory = (term: string) => {
    const newHistory = [term, ...history.filter(h => h !== term)].slice(0, 5);
    setHistory(newHistory);
    localStorage.setItem('khama_search_history', JSON.stringify(newHistory));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') setIsOpen(false);
    if (e.key === 'Enter' && query) {
      saveToHistory(query);
      setIsOpen(false);
      // Logic for actual search redirect here
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-[600px] mx-auto z-50 font-body">
      {/* Search Input Container */}
      <div className={`
        relative flex items-center bg-white border-2 transition-all duration-200 rounded-full
        ${isOpen ? 'border-gold shadow-lg ring-4 ring-gold/10' : 'border-ecru hover:border-gold/50'}
      `}>
        <div className="pl-5 text-muted">
          <Search className="w-5 h-5" />
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder={PLACEHOLDERS[placeholderIndex]}
          className="w-full py-3 px-4 outline-none text-charcoal bg-transparent placeholder:transition-opacity placeholder:duration-500"
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-autocomplete="list"
        />

        <div className="flex items-center gap-2 pr-2">
          {query && (
            <button onClick={() => setQuery('')} className="p-2 text-muted hover:text-charcoal transition-colors">
              <X className="w-4 h-4" />
            </button>
          )}
          <div className="w-px h-6 bg-ecru mx-1" />
          <button 
            title="Recherche par image"
            className="p-3 text-burgundy hover:bg-ecru rounded-full transition-all group"
          >
            <Camera className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>

      {/* Quick Filter Chips */}
      <div className="flex gap-2 mt-3 px-2 overflow-x-auto no-scrollbar">
        {['Nouveautés', 'En stock', 'Certifié GOTS', 'Premium', 'Europe'].map((chip) => (
          <button 
            key={chip}
            className="whitespace-nowrap px-4 py-1.5 rounded-full bg-white border border-ecru text-caption text-charcoal hover:border-gold hover:text-gold transition-all"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Suggestions Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-border shadow-2xl rounded-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="max-h-[450px] overflow-y-auto custom-scrollbar p-2">
            
            {/* Last Researches */}
            {!query && history.length > 0 && (
              <div className="mb-4">
                <h3 className="px-3 py-2 text-label text-muted flex items-center gap-2">
                  <History className="w-3 h-3" /> Vos dernières recherches
                </h3>
                {history.map((term, i) => (
                  <button 
                    key={i}
                    onClick={() => setQuery(term)}
                    className="w-full flex items-center justify-between px-4 py-2 text-body-small text-charcoal hover:bg-ecru transition-colors rounded-lg group"
                  >
                    {term}
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                  </button>
                ))}
              </div>
            )}

            {/* Smart Suggestions Categories */}
            {query.length >= 2 ? (
              <div className="grid gap-4 p-2">
                {/* Tissus */}
                <div>
                  <h3 className="px-2 py-1 text-label text-gold flex items-center gap-2 mb-1">
                    <TrendingUp className="w-3 h-3" /> Tissus & Matières
                  </h3>
                  {MOCK_SUGGESTIONS.fabrics.map(f => (
                    <div key={f.id} className="flex items-center justify-between px-3 py-2 hover:bg-ecru rounded-lg cursor-pointer group">
                      <span className="text-body-small text-charcoal">{f.name}</span>
                      <span className="text-[10px] bg-ecru px-2 py-0.5 rounded uppercase text-muted group-hover:bg-gold/20 group-hover:text-gold transition-colors">Pro</span>
                    </div>
                  ))}
                </div>

                {/* Suppliers */}
                <div>
                  <h3 className="px-2 py-1 text-label text-burgundy flex items-center gap-2 mb-1">
                    <Factory className="w-3 h-3" /> Fournisseurs & Mills
                  </h3>
                  {MOCK_SUGGESTIONS.suppliers.map(s => (
                    <div key={s.id} className="flex items-center justify-between px-3 py-2 hover:bg-ecru rounded-lg cursor-pointer">
                      <span className="text-body-small text-charcoal">{s.name}</span>
                      <span className="text-[10px] text-muted italic">{s.type}</span>
                    </div>
                  ))}
                </div>

                {/* RFQs */}
                <div>
                  <h3 className="px-2 py-1 text-label text-green-600 flex items-center gap-2 mb-1">
                    <FileText className="w-3 h-3" /> Appels d'offres
                  </h3>
                  {MOCK_SUGGESTIONS.rfqs.map(r => (
                    <div key={r.id} className="flex items-center justify-between px-3 py-2 hover:bg-ecru rounded-lg cursor-pointer">
                      <span className="text-body-small text-charcoal">{r.name}</span>
                      <span className="text-[10px] font-bold text-green-600 uppercase">{r.status}</span>
                    </div>
                  ))}
                </div>

                {/* Glossary */}
                <div className="bg-ecru/30 rounded-xl p-3 border border-ecru/50">
                  <h3 className="text-label text-muted flex items-center gap-2 mb-2">
                    <Book className="w-3 h-3" /> Glossaire Technique
                  </h3>
                  {MOCK_SUGGESTIONS.glossary.map((g, i) => (
                    <div key={i} className="mb-2 last:mb-0">
                      <span className="text-xs font-bold text-burgundy block">{g.term}</span>
                      <p className="text-[11px] text-muted leading-tight">{g.definition}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-8 text-center">
                <TrendingUp className="w-10 h-10 text-ecru mx-auto mb-3" />
                <p className="text-body-small text-muted italic">Commencez à taper pour voir les suggestions intelligentes...</p>
              </div>
            )}

            {/* Trends Section Footer */}
            {!query && (
              <div className="mt-4 pt-4 border-t border-ecru">
                <h3 className="px-3 text-label text-muted mb-2 uppercase">Tendances du marché</h3>
                <div className="flex flex-wrap gap-2 px-3 pb-2">
                  {['Denim Recyclé', 'Soie Vegan', 'Lin Algérien', 'Pantone 2026'].map(t => (
                    <span key={t} className="text-[11px] text-burgundy bg-burgundy/5 px-3 py-1 rounded-full cursor-pointer hover:bg-burgundy/10 transition-colors">
                      # {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
