'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, Book, Filter, Star, ChevronRight, 
  Printer, Share2, ArrowRight, X, Info, Download
} from 'lucide-react';
import { GLOSSARY_DATA, GlossaryEntry } from '@/data/glossary';

const CATEGORIES = ['Toutes', 'Fibres', 'Armures', 'Finitions', 'Commerce', 'Certifications', 'Machines'];
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function GlossaryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Toutes');
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const [selectedTerm, setSelectedTerm] = useState<GlossaryEntry | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load favorites
  useEffect(() => {
    const saved = localStorage.getItem('khama_glossary_favs');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  const toggleFavorite = (id: string) => {
    const newFavs = favorites.includes(id) 
      ? favorites.filter(f => f !== id) 
      : [...favorites, id];
    setFavorites(newFavs);
    localStorage.setItem('khama_glossary_favs', JSON.stringify(newFavs));
  };

  const filteredTerms = useMemo(() => {
    return GLOSSARY_DATA.filter(term => {
      const matchesSearch = 
        term.termFr.toLowerCase().includes(searchQuery.toLowerCase()) ||
        term.termAr.includes(searchQuery) ||
        term.definition.fr.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = activeCategory === 'Toutes' || term.category === activeCategory;
      const matchesLetter = !activeLetter || term.termFr.toUpperCase().startsWith(activeLetter);

      return matchesSearch && matchesCategory && matchesLetter;
    }).sort((a, b) => a.termFr.localeCompare(b.termFr));
  }, [searchQuery, activeCategory, activeLetter]);

  return (
    <div className="min-h-screen bg-[#FDFCFB] pb-20 pt-10" dir="ltr">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Amiri:wght@400;700&display=swap');
        .font-serif-premium { font-family: 'Cormorant Garamond', serif; }
        .font-arabic-premium { font-family: 'Amiri', serif; }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="mb-16 space-y-4 text-center">
           <h1 className="text-5xl font-black text-burgundy tracking-tight font-serif-premium">Glossaire Textile</h1>
           <p className="text-muted font-medium max-w-2xl mx-auto italic text-lg">
             "Le savoir est le premier pas vers l'excellence." — Explorez plus de 50 termes techniques, fibres et certifications.
           </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar Filters */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Search */}
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted group-focus-within:text-accent transition-colors" />
              <input 
                type="text"
                placeholder="Rechercher un terme..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border border-border rounded-2xl outline-none focus:border-accent shadow-sm transition-all"
              />
            </div>

            {/* Categories */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-border">
              <h3 className="text-xs font-bold text-charcoal uppercase tracking-widest mb-4 flex items-center gap-2">
                <Filter className="w-4 h-4 text-accent" /> Catégories
              </h3>
              <div className="space-y-1">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full text-left px-4 py-2 rounded-xl text-sm transition-all ${
                      activeCategory === cat ? 'bg-accent text-white font-bold' : 'text-muted hover:bg-gray-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Alphabet */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-border">
              <h3 className="text-xs font-bold text-charcoal uppercase tracking-widest mb-4">A - Z</h3>
              <div className="grid grid-cols-6 gap-1">
                {ALPHABET.map(letter => (
                  <button
                    key={letter}
                    onClick={() => setActiveLetter(activeLetter === letter ? null : letter)}
                    className={`aspect-square flex items-center justify-center text-xs font-bold rounded-lg transition-all ${
                      activeLetter === letter ? 'bg-charcoal text-white' : 'text-muted hover:bg-gray-100'
                    }`}
                  >
                    {letter}
                  </button>
                ))}
              </div>
            </div>

            {/* Favorites List */}
            {favorites.length > 0 && (
              <div className="bg-gold/5 rounded-3xl p-6 border border-gold/20">
                <h3 className="text-xs font-bold text-gold-dark uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Star className="w-4 h-4 fill-gold text-gold" /> Mes Favoris
                </h3>
                <div className="space-y-2">
                  {favorites.map(id => {
                    const term = GLOSSARY_DATA.find(t => t.id === id);
                    return term ? (
                      <button 
                        key={id}
                        onClick={() => setSelectedTerm(term)}
                        className="text-xs text-charcoal hover:text-accent font-medium block"
                      >
                        {term.termFr}
                      </button>
                    ) : null;
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Main Content List */}
          <div className="lg:col-span-9">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {filteredTerms.map((term) => (
                 <div 
                  key={term.id}
                  onClick={() => setSelectedTerm(term)}
                  className="group bg-white p-6 rounded-3xl border border-border hover:border-accent hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer relative"
                 >
                    <button 
                      onClick={(e) => { e.stopPropagation(); toggleFavorite(term.id); }}
                      className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-50"
                    >
                      <Star className={`w-4 h-4 ${favorites.includes(term.id) ? 'fill-gold text-gold' : 'text-muted'}`} />
                    </button>

                    <div className="space-y-4">
                       <span className="text-[10px] font-bold text-accent px-2 py-1 bg-accent/5 rounded-lg uppercase tracking-widest">
                         {term.category}
                       </span>
                       <div>
                         <h2 className="text-2xl font-bold text-charcoal font-serif-premium">{term.termFr}</h2>
                         <p className="text-xs text-muted font-medium italic mt-1">{term.termEn}</p>
                       </div>
                       <p className="text-sm text-muted line-clamp-2 leading-relaxed">
                         {term.definition.fr}
                       </p>
                       <div className="flex items-center gap-2 text-accent font-bold text-xs pt-2">
                          Détails <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                       </div>
                    </div>
                 </div>
               ))}

               {filteredTerms.length === 0 && (
                 <div className="col-span-full py-20 text-center space-y-4">
                    <Book className="w-16 h-16 text-gray-200 mx-auto" />
                    <p className="text-muted font-medium">Aucun terme ne correspond à votre recherche.</p>
                 </div>
               )}
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal / Drawer */}
      {selectedTerm && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm" onClick={() => setSelectedTerm(null)} />
           <div className="relative bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[40px] shadow-2xl animate-in zoom-in-95 duration-300">
              
              <div className="sticky top-0 right-0 p-6 flex justify-between items-center bg-white/80 backdrop-blur z-10">
                 <div className="flex gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-full text-muted"><Printer className="w-5 h-5" /></button>
                    <button className="p-2 hover:bg-gray-100 rounded-full text-muted"><Download className="w-5 h-5" /></button>
                    <button className="p-2 hover:bg-gray-100 rounded-full text-muted"><Share2 className="w-5 h-5" /></button>
                 </div>
                 <button onClick={() => setSelectedTerm(null)} className="p-2 hover:bg-gray-100 rounded-full"><X className="w-6 h-6" /></button>
              </div>

              <div className="p-8 md:p-12 space-y-12">
                 
                 {/* Title Section */}
                 <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                    <div className="space-y-4">
                       <span className="text-xs font-bold text-accent uppercase tracking-[0.2em]">{selectedTerm.category}</span>
                       <h2 className="text-6xl font-black text-burgundy font-serif-premium">{selectedTerm.termFr}</h2>
                       <div className="flex items-center gap-3">
                          <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold border border-blue-100">
                            {selectedTerm.termEn}
                          </span>
                       </div>
                    </div>
                    
                    <div className="text-right space-y-2 md:max-w-[300px]">
                       <h3 className="text-4xl font-bold text-charcoal font-arabic-premium leading-relaxed" dir="rtl">
                         {selectedTerm.termAr}
                       </h3>
                       <div className="h-1 w-12 bg-gold ml-auto" />
                    </div>
                 </div>

                 {/* Definitions */}
                 <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                       <h4 className="text-xs font-bold text-muted uppercase tracking-widest border-l-4 border-accent pl-4">Définition (FR)</h4>
                       <p className="text-lg text-charcoal leading-relaxed">
                          {selectedTerm.definition.fr}
                       </p>
                    </div>
                    <div className="space-y-4 text-right">
                       <h4 className="text-xs font-bold text-muted uppercase tracking-widest border-r-4 border-gold pr-4">التعريف (العربية)</h4>
                       <p className="text-xl text-charcoal leading-relaxed font-arabic-premium" dir="rtl">
                          {selectedTerm.definition.ar}
                       </p>
                    </div>
                 </div>

                 {/* Example & Related */}
                 {(selectedTerm.example || selectedTerm.relatedIds) && (
                   <div className="p-8 bg-ecru/30 rounded-3xl border border-ecru space-y-8">
                      {selectedTerm.example && (
                        <div className="flex gap-4">
                           <Info className="w-5 h-5 text-gold shrink-0 mt-1" />
                           <p className="text-sm text-charcoal italic italic-premium">
                             "{selectedTerm.example}"
                           </p>
                        </div>
                      )}

                      {selectedTerm.relatedIds && (
                        <div className="space-y-3">
                           <p className="text-xs font-bold text-muted uppercase">Termes Connexes</p>
                           <div className="flex flex-wrap gap-2">
                              {selectedTerm.relatedIds.map(id => {
                                const related = GLOSSARY_DATA.find(t => t.id === id);
                                return related ? (
                                  <button 
                                    key={id}
                                    onClick={() => setSelectedTerm(related)}
                                    className="px-4 py-2 bg-white border border-border rounded-xl text-xs font-bold hover:border-accent transition-all"
                                  >
                                    {related.termFr}
                                  </button>
                                ) : null;
                              })}
                           </div>
                        </div>
                      )}
                   </div>
                 )}

                 {/* CTA */}
                 <div className="pt-8 border-t border-border flex justify-center">
                    <button className="flex items-center gap-3 bg-burgundy text-white px-10 py-5 rounded-2xl font-bold hover:shadow-2xl hover:scale-105 transition-all">
                       Voir les tissus de ce type <ArrowRight className="w-5 h-5" />
                    </button>
                 </div>
              </div>

           </div>
        </div>
      )}

    </div>
  );
}
