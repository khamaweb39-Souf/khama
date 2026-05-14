'use client';

import React, { useState } from 'react';
import { 
  Heart, Bookmark, Search, Filter, 
  ChevronRight, Star, ShoppingBag, 
  Trash2, ArrowUpRight, Grid, List,
  ShieldCheck, MapPin, Zap, ExternalLink
} from 'lucide-react';

const MOCK_FAVORITES = [
  { id: 1, type: 'product', name: 'كتان مغسول إيطالي', supplier: 'نسيج الشرق', price: '890 دج', img: 'https://images.unsplash.com/photo-1590736962236-49a888a719d3?auto=format&fit=crop&q=80&w=300' },
  { id: 2, type: 'product', name: 'بوليستر تقني رياضي', supplier: 'تجار قسنطينة', price: '450 دج', img: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=300' },
  { id: 3, type: 'supplier', name: 'مصنع تلمسان الحديث', category: 'أقطان وحرير', location: 'تلمسان، الجزائر', rating: 4.9, img: 'https://ui-avatars.com/api/?name=Tlemcen+Factory&background=C9A84C&color=0D0C0A&bold=true' },
];

export default function BuyerFavoritesPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'products' | 'suppliers'>('all');

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-1000 text-right" dir="rtl">
      
      {/* Header */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
         <div className="space-y-1">
            <h1 className="text-3xl font-black text-white tracking-tight">المفضلات والمحفوظات</h1>
            <p className="text-white/40 font-medium">مجموعتك المنسقة من أفضل الخامات والموردين الذين تتابعهم.</p>
         </div>
         <div className="flex gap-3">
            <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
               <button onClick={() => setActiveTab('all')} className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'all' ? 'bg-gold text-charcoal' : 'text-white/20 hover:text-white'}`}>الكل</button>
               <button onClick={() => setActiveTab('products')} className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'products' ? 'bg-gold text-charcoal' : 'text-white/20 hover:text-white'}`}>المنتجات</button>
               <button onClick={() => setActiveTab('suppliers')} className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'suppliers' ? 'bg-gold text-charcoal' : 'text-white/20 hover:text-white'}`}>الموردين</button>
            </div>
         </div>
      </header>

      {/* Favorites Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         {MOCK_FAVORITES.map((item) => (
           <div key={item.id} className="group bg-[#1A1917] rounded-[3rem] border border-white/5 hover:border-gold/30 transition-all duration-500 overflow-hidden relative">
              
              {item.type === 'product' ? (
                <>
                  <div className="h-56 relative overflow-hidden">
                     <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.name} />
                     <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                        <button className="p-3 bg-white/5 backdrop-blur-md rounded-xl text-white hover:bg-gold hover:text-charcoal transition-all"><Search className="w-5 h-5" /></button>
                        <button className="p-3 bg-white/5 backdrop-blur-md rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-all"><Trash2 className="w-5 h-5" /></button>
                     </div>
                  </div>
                  <div className="p-8 space-y-4">
                     <div className="space-y-1">
                        <h3 className="text-lg font-black text-white group-hover:text-gold transition-colors">{item.name}</h3>
                        <p className="text-xs text-white/40">المورد: {item.supplier}</p>
                     </div>
                     <div className="flex justify-between items-center">
                        <span className="text-xl font-black text-white">{item.price}</span>
                        <button className="px-5 py-2 bg-gold/10 text-gold text-[10px] font-black rounded-lg uppercase tracking-widest border border-gold/20 hover:bg-gold hover:text-charcoal transition-all">طلب عرض</button>
                     </div>
                  </div>
                </>
              ) : (
                <div className="p-8 space-y-6">
                   <div className="flex justify-between items-start">
                      <div className="w-20 h-20 rounded-[2rem] bg-white/5 overflow-hidden border border-white/10 group-hover:border-gold transition-colors duration-500">
                         <img src={item.img} className="w-full h-full object-cover" alt={item.name} />
                      </div>
                      <button className="p-3 bg-white/5 rounded-xl text-red-500/40 hover:text-red-500 transition-all"><Heart className="w-5 h-5 fill-current" /></button>
                   </div>
                   <div className="space-y-1">
                      <div className="flex items-center gap-2">
                         <h3 className="text-xl font-black text-white">{item.name}</h3>
                         <ShieldCheck className="w-4 h-4 text-gold" />
                      </div>
                      <p className="text-xs text-white/40">{item.category}</p>
                   </div>
                   <div className="flex items-center gap-3 text-[10px] font-black text-white/30 uppercase tracking-widest">
                      <MapPin className="w-3 h-3 text-gold" /> {item.location}
                   </div>
                   <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                         <Star className="w-3 h-3 text-gold fill-current" />
                         <span className="text-xs font-black text-gold">{item.rating}</span>
                      </div>
                      <button className="flex items-center gap-2 text-[10px] font-black text-white/40 uppercase tracking-widest hover:text-gold transition-colors">
                         عرض المتجر <ArrowUpRight className="w-3 h-3" />
                      </button>
                   </div>
                </div>
              )}
              
              {/* Glow */}
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-gold/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
           </div>
         ))}

         {/* Empty State Mockup (if needed) */}
         <div className="bg-white/5 border-2 border-dashed border-white/5 rounded-[3rem] p-10 flex flex-col items-center justify-center text-center space-y-6 opacity-40 group hover:opacity-100 transition-all cursor-pointer">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center text-white/20">
               <Bookmark className="w-10 h-10" />
            </div>
            <div className="space-y-1">
               <h4 className="text-lg font-black text-white">أضف مفضلات جديدة</h4>
               <p className="text-[10px] text-white/40 font-medium">استخدم أيقونة القلب أثناء التصفح لحفظ الخامات.</p>
            </div>
         </div>
      </section>

    </div>
  );
}
