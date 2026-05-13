'use client';

import React, { useState } from 'react';
import { 
  Folder, Plus, Grid, List, 
  MoreVertical, Share2, Download, 
  Search, Heart, ExternalLink
} from 'lucide-react';

const COLLECTIONS = [
  { id: 1, name: 'مجموعة ربيع 2026', count: 12, cover: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=400&auto=format&fit=crop' },
  { id: 2, name: 'مشروع المنسوجات المنزلية', count: 5, cover: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400&auto=format&fit=crop' },
  { id: 3, name: 'أقمشة تقنية للرياضة', count: 8, cover: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=400&auto=format&fit=crop' },
];

const FAVORITES = [
  { id: 1, name: 'كتان أبيض 180g', supplier: 'نسيج الشرق', price: '12€', img: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=200&auto=format&fit=crop' },
  { id: 2, name: 'جاكارد ملكي أزرق', supplier: 'قصر تلمسان', price: '45€', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=200&auto=format&fit=crop' },
  { id: 3, name: 'حرير طبيعي خام', supplier: 'حرير الجزائر', price: '60€', img: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=200&auto=format&fit=crop' },
  { id: 4, name: 'دينيم مطاطي 12oz', supplier: 'جينز تك', price: '9€', img: 'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=200&auto=format&fit=crop' },
];

export default function FavoritesPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid');

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
         <div className="space-y-1">
            <h1 className="text-3xl font-black text-charcoal">مكتبتي الخاصة</h1>
            <p className="text-muted font-medium">نظم أقمشتك المفضلة في مجموعات حسب مشاريعك القادمة.</p>
         </div>
         <div className="flex gap-3">
            <button className="px-6 py-3 bg-white border border-border text-charcoal font-bold rounded-xl hover:bg-gray-50 transition-all flex items-center gap-2 text-sm shadow-sm">
               <Share2 className="w-4 h-4" /> مشاركة المكتبة
            </button>
            <button className="px-6 py-3 bg-accent text-white font-bold rounded-xl shadow-lg shadow-accent/20 flex items-center gap-2 text-sm hover:scale-105 transition-all">
               <Plus className="w-4 h-4" /> إنشاء مجموعة جديدة
            </button>
         </div>
      </div>

      {/* Collections Row */}
      <div className="space-y-6">
         <h3 className="text-xl font-black text-charcoal flex items-center gap-2">
            <Folder className="w-5 h-5 text-gold" /> المجموعات (Collections)
         </h3>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {COLLECTIONS.map((col) => (
              <div key={col.id} className="group bg-white rounded-3xl border border-border overflow-hidden hover:shadow-xl transition-all cursor-pointer relative">
                 <div className="h-40 overflow-hidden relative">
                    <img src={col.cover} alt={col.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />
                    <div className="absolute bottom-4 right-4 left-4 flex justify-between items-end">
                       <div className="text-white">
                          <p className="text-xs font-bold opacity-60">{col.count} أقمشة</p>
                          <h4 className="font-bold text-sm">{col.name}</h4>
                       </div>
                       <button className="p-2 bg-white/10 backdrop-blur-md rounded-lg hover:bg-white/20">
                          <ExternalLink className="w-4 h-4 text-white" />
                       </button>
                    </div>
                 </div>
              </div>
            ))}
            <div className="border-2 border-dashed border-border rounded-3xl flex flex-col items-center justify-center p-8 hover:border-accent hover:text-accent transition-all cursor-pointer text-muted min-h-[160px]">
               <Plus className="w-8 h-8 mb-2" />
               <p className="text-xs font-bold">إضافة مجموعة</p>
            </div>
         </div>
      </div>

      {/* All Favorites Grid */}
      <div className="space-y-6">
         <div className="flex justify-between items-center">
            <h3 className="text-xl font-black text-charcoal flex items-center gap-2">
               <Heart className="w-5 h-5 text-red-500 fill-red-500" /> كافة المفضلة
            </h3>
            <div className="flex items-center gap-4 bg-white p-1 rounded-xl border border-border shadow-sm">
               <button onClick={() => setView('grid')} className={`p-2 rounded-lg ${view === 'grid' ? 'bg-accent text-white shadow-md' : 'text-muted hover:bg-gray-50'}`}>
                  <Grid className="w-4 h-4" />
               </button>
               <button onClick={() => setView('list')} className={`p-2 rounded-lg ${view === 'list' ? 'bg-accent text-white shadow-md' : 'text-muted hover:bg-gray-50'}`}>
                  <List className="w-4 h-4" />
               </button>
            </div>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FAVORITES.map((fab) => (
              <div key={fab.id} className="bg-white rounded-3xl border border-border overflow-hidden hover:shadow-xl transition-all group relative">
                 <div className="h-48 overflow-hidden relative">
                    <img src={fab.img} alt={fab.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <button className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur rounded-full text-red-500 shadow-sm hover:bg-red-500 hover:text-white transition-all">
                       <Heart className="w-4 h-4 fill-current" />
                    </button>
                 </div>
                 <div className="p-6 space-y-4">
                    <div>
                       <h4 className="font-black text-charcoal">{fab.name}</h4>
                       <p className="text-[10px] text-muted font-bold uppercase tracking-wider">{fab.supplier}</p>
                    </div>
                    <div className="flex justify-between items-center">
                       <p className="text-lg font-black text-accent">{fab.price}</p>
                       <div className="flex gap-2">
                          <button className="p-2 hover:bg-gray-50 rounded-lg text-muted"><Download className="w-4 h-4" /></button>
                          <button className="p-2 hover:bg-gray-50 rounded-lg text-muted"><MoreVertical className="w-4 h-4" /></button>
                       </div>
                    </div>
                    <button className="w-full py-3 bg-gray-50 border border-border rounded-xl text-xs font-bold text-charcoal hover:bg-accent hover:text-white hover:border-accent transition-all">
                       التفاصيل الفنية
                    </button>
                 </div>
              </div>
            ))}
         </div>
      </div>

    </div>
  );
}
