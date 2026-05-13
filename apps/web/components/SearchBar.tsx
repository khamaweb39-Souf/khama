'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Search, Camera, X, History, TrendingUp, 
  Factory, FileText, Book, ArrowRight, Mic, 
  ShieldCheck, Wind, Layers
} from 'lucide-react';
import { useRouter } from 'next/navigation';

// ─── Mock Data for Autocomplete ──────────────────────────────────────────────
const SMART_SUGGESTIONS = {
  ar: {
    fabrics: [
      { id: 'f1', name: 'قطن عضوي GOTS', type: 'مادة' },
      { id: 'f2', name: 'حرير ساتان طبيعي', type: 'نسيج' },
      { id: 'f3', name: 'كتان مغسول بريميوم', type: 'مادة' },
    ],
    suppliers: [
      { id: 's1', name: 'مجموعة الأطلس للنسيج', location: 'تلمسان' },
      { id: 's2', name: 'مدابغ جيجل الكبرى', location: 'جيجل' },
    ],
    technical: [
      { term: 'نسيج جاكارد', icon: <Layers className="w-3 h-3" /> },
      { term: 'وزن 120 GSM', icon: <Wind className="w-3 h-3" /> },
    ]
  },
  fr: {
    fabrics: [
      { id: 'f1', name: 'Coton Bio GOTS', type: 'Matière' },
      { id: 'f2', name: 'Soie Satin Naturelle', type: 'Tissage' },
      { id: 'f3', name: 'Lin Lavé Premium', type: 'Matière' },
    ],
    suppliers: [
      { id: 's1', name: 'Atlas Textile Group', location: 'Tlemcen' },
      { id: 's2', name: 'Grandes Tanneries de Jijel', location: 'Jijel' },
    ],
    technical: [
      { term: 'Tissage Jacquard', icon: <Layers className="w-3 h-3" /> },
      { term: 'Poids 120 GSM', icon: <Wind className="w-3 h-3" /> },
    ]
  }
};

const TRENDING = [
  { ar: 'جينز مستدام', fr: 'Denim Éco' },
  { ar: 'كتان جزائري', fr: 'Lin Algérien' },
  { ar: 'جلود نباتية', fr: 'Cuir Végan' },
  { ar: 'أقمشة طبية', fr: 'Textiles Médicaux' }
];

export default function SearchBar() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const currentLang = i18n.language === 'ar' ? 'ar' : 'fr';
  
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load History
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

  const handleSearch = (term: string) => {
    if (!term.trim()) return;
    
    // Save to history
    const newHistory = [term, ...history.filter(h => h !== term)].slice(0, 5);
    setHistory(newHistory);
    localStorage.setItem('khama_search_history', JSON.stringify(newHistory));
    
    setIsOpen(false);
    router.push(`/cat/fabrics?search=${encodeURIComponent(term)}`);
  };

  const toggleVoiceSearch = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      // Simulating a voice command
      setQuery(currentLang === 'ar' ? 'حرير طبيعي' : 'Soie naturelle');
    }, 2000);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto z-[100]" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Search Input Container */}
      <div className={`
        relative flex items-center bg-white border-2 transition-all duration-500 rounded-2xl
        ${isOpen ? 'border-gold shadow-[0_20px_50px_rgba(201,168,76,0.15)] scale-[1.02]' : 'border-ecru hover:border-gold/40'}
      `}>
        <div className={`flex items-center justify-center w-14 text-muted ${isOpen ? 'text-gold' : ''}`}>
          <Search className={`w-5 h-5 transition-transform duration-500 ${isOpen ? 'scale-110' : ''}`} />
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
          placeholder={t('search_placeholder_1')}
          className="flex-1 py-4 text-sm outline-none text-charcoal bg-transparent font-medium"
        />

        <div className="flex items-center gap-1 pr-3">
          {query && (
            <button onClick={() => setQuery('')} className="p-2 text-muted hover:text-burgundy transition-colors">
              <X className="w-4 h-4" />
            </button>
          )}
          
          <div className="w-px h-6 bg-ecru/60 mx-1" />
          
          <button 
            onClick={toggleVoiceSearch}
            className={`p-2.5 rounded-xl transition-all ${isListening ? 'bg-red-50 text-red-500 animate-pulse' : 'text-muted hover:text-gold hover:bg-gold/5'}`}
            title={t('voice_search')}
          >
            <Mic className="w-5 h-5" />
          </button>
          
          <button 
            className="p-2.5 text-muted hover:text-burgundy hover:bg-burgundy/5 rounded-xl transition-all group"
            title={t('visual_search')}
          >
            <Camera className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>

      {/* Dropdown Results */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-3 bg-white border border-border shadow-[0_30px_90px_rgba(0,0,0,0.15)] rounded-3xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
          <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
            
            {/* Empty State / Suggestions */}
            {!query ? (
              <div className="p-6 space-y-8">
                {/* History */}
                {history.length > 0 && (
                  <div>
                    <h3 className="text-[10px] font-black text-muted uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                      <History className="w-3 h-3" /> {t('recent_searches')}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {history.map((term, i) => (
                        <button 
                          key={i}
                          onClick={() => handleSearch(term)}
                          className="px-4 py-2 bg-gray-50 hover:bg-ecru rounded-xl text-xs font-bold text-charcoal transition-all border border-transparent hover:border-gold/20"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Trending */}
                <div>
                  <h3 className="text-[10px] font-black text-gold uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    <TrendingUp className="w-3 h-3" /> {t('trending_searches')}
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {TRENDING.map((item, i) => (
                      <button 
                        key={i}
                        onClick={() => handleSearch(item[currentLang])}
                        className="flex items-center gap-3 p-3 rounded-2xl hover:bg-gold/5 border border-transparent hover:border-gold/20 transition-all group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center text-gold font-black text-xs">
                          {i + 1}
                        </div>
                        <span className="text-sm font-bold text-charcoal group-hover:text-gold transition-colors">
                          {item[currentLang]}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Active Search Results */
              <div className="p-2 space-y-2">
                {/* Fabrics Section */}
                <div className="p-4">
                  <h4 className="text-[10px] font-black text-muted uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5" /> {t('fabrics')}
                  </h4>
                  <div className="grid gap-1">
                    {SMART_SUGGESTIONS[currentLang].fabrics.map(f => (
                      <button 
                        key={f.id}
                        onClick={() => handleSearch(f.name)}
                        className="w-full flex items-center justify-between p-3 hover:bg-ecru rounded-xl transition-all group text-right"
                      >
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden group-hover:scale-110 transition-transform">
                              <img src={`https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=100`} alt="" className="w-full h-full object-cover" />
                           </div>
                           <div className="text-right">
                              <p className="text-sm font-bold text-charcoal group-hover:text-gold transition-colors">{f.name}</p>
                              <p className="text-[10px] text-muted">{f.type}</p>
                           </div>
                        </div>
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-gold" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Suppliers Section */}
                <div className="p-4 bg-gray-50/50 rounded-2xl mx-2">
                   <h4 className="text-[10px] font-black text-muted uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Factory className="w-3.5 h-3.5" /> {t('suppliers')}
                  </h4>
                  <div className="grid gap-1">
                    {SMART_SUGGESTIONS[currentLang].suppliers.map(s => (
                      <button 
                        key={s.id}
                        onClick={() => handleSearch(s.name)}
                        className="w-full flex items-center justify-between p-3 hover:bg-white hover:shadow-md rounded-xl transition-all group"
                      >
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 bg-gold/10 rounded-full flex items-center justify-center text-gold">
                              <ShieldCheck className="w-4 h-4" />
                           </div>
                           <div className="text-right">
                              <p className="text-sm font-bold text-charcoal">{s.name}</p>
                              <p className="text-[10px] text-muted">{s.location}</p>
                           </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Technical Terms */}
                <div className="p-4">
                  <h4 className="text-[10px] font-black text-muted uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Book className="w-3.5 h-3.5" /> {t('technical_glossary')}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {SMART_SUGGESTIONS[currentLang].technical.map((t, i) => (
                      <button 
                        key={i}
                        onClick={() => handleSearch(t.term)}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-ecru rounded-xl text-xs font-bold text-charcoal hover:border-gold hover:text-gold transition-all"
                      >
                        {t.icon}
                        {t.term}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Footer Search CTA */}
            {query && (
              <div className="p-4 bg-burgundy text-white flex items-center justify-between cursor-pointer hover:bg-burgundy-dark transition-colors" onClick={() => handleSearch(query)}>
                 <div className="flex items-center gap-3">
                    <Search className="w-5 h-5 opacity-60" />
                    <span className="text-sm font-bold">{t('search_for')} "{query}"</span>
                 </div>
                 <ArrowRight className="w-5 h-5" />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
