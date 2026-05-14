'use client';

import React, { useState } from 'react';
import { 
  Plus, Search, Filter, Download, Upload, 
  MoreVertical, Edit2, Trash2, Copy, EyeOff,
  ChevronDown, ArrowUpDown, Package, Layers,
  ExternalLink, CheckCircle2, AlertCircle, X,
  FileText, Columns
} from 'lucide-react';
import Link from 'next/link';

// ─── Mock Data ─────────────────────────────────────────────────────────────
const INITIAL_PRODUCTS = [
  { id: 1, name: 'كتان عضوي بريميوم', category: 'أقمشة طبيعية', price: 3200, stock: 450, status: 'Active', image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=200' },
  { id: 2, name: 'حرير إيطالي ناعم', category: 'أقمشة فاخرة', price: 8500, stock: 120, status: 'Active', image: 'https://images.unsplash.com/photo-1606103920295-9a091573f160?q=80&w=200' },
  { id: 3, name: 'بوليستر تقني رياضي', category: 'أقمشة صناعية', price: 1200, stock: 1500, status: 'Active', image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=200' },
  { id: 4, name: 'قطن مصري مطرز', category: 'أقمشة طبيعية', price: 4200, stock: 15, status: 'Low Stock', image: 'https://images.unsplash.com/photo-1610444583737-9f13fc3ca893?q=80&w=200' },
  { id: 5, name: 'صوف كشمير شتوي', category: 'أقمشة شتوية', price: 12000, stock: 0, status: 'Out of Stock', image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=200' },
];

export default function SupplierProductsPage() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

  const toggleSelect = (id: number) => {
    setSelectedProducts(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map(p => p.id));
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-1000 text-right" dir="rtl">
      
      {/* ─── Header & Actions ─── */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
         <div className="space-y-1">
            <h1 className="text-3xl font-black text-white tracking-tight">إدارة المنتجات</h1>
            <p className="text-white/40 font-medium">لديك {products.length} منتج نشط في متجرك حالياً.</p>
         </div>
         <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2 px-5 py-3 bg-white/5 text-white/60 hover:text-white rounded-xl border border-white/5 transition-all text-xs font-black uppercase tracking-widest">
               <Upload className="w-4 h-4" /> استيراد CSV
            </button>
            <button className="flex items-center gap-2 px-5 py-3 bg-white/5 text-white/60 hover:text-white rounded-xl border border-white/5 transition-all text-xs font-black uppercase tracking-widest">
               <Download className="w-4 h-4" /> تصدير البيانات
            </button>
            <Link href="/dashboard/supplier/products/new" className="flex items-center gap-2 px-6 py-3 bg-gold text-charcoal rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-gold/20">
               <Plus className="w-4 h-4" /> إضافة منتج جديد
            </Link>
         </div>
      </header>

      {/* ─── Filter Bar ─── */}
      <section className="bg-[#1A1917] p-4 rounded-[2rem] border border-white/5 flex flex-col lg:flex-row justify-between items-center gap-4">
         <div className="w-full lg:w-96 relative group">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-gold transition-colors" />
            <input 
              type="text" 
              placeholder="البحث بالاسم، الكود، أو الصنف..."
              className="w-full bg-white/5 border border-white/5 rounded-2xl py-3 pr-12 pl-4 text-sm text-white outline-none focus:border-gold/50 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
         </div>
         
         <div className="flex items-center gap-3 w-full lg:w-auto">
            <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-3 bg-white/5 text-white/60 rounded-xl text-xs font-bold border border-white/5 hover:border-white/20 transition-all">
               <Filter className="w-4 h-4" /> تصفية
            </button>
            <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-3 bg-white/5 text-white/60 rounded-xl text-xs font-bold border border-white/5 hover:border-white/20 transition-all">
               <Columns className="w-4 h-4" /> تخصيص الأعمدة
            </button>
            <div className="h-8 w-px bg-white/5 hidden lg:block" />
            <select className="flex-1 lg:flex-none bg-white/5 text-white/60 text-xs font-bold py-3 px-4 rounded-xl border border-white/5 outline-none">
               <option>الأحدث أولاً</option>
               <option>السعر: من الأقل للأعلى</option>
               <option>المخزون: من الأقل للأعلى</option>
            </select>
         </div>
      </section>

      {/* ─── Products DataTable ─── */}
      <section className="bg-[#1A1917] rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl relative">
         
         {/* Bulk Actions Toolbar */}
         {selectedProducts.length > 0 && (
           <div className="absolute top-0 inset-x-0 h-16 bg-gold flex items-center justify-between px-8 z-20 animate-in slide-in-from-top duration-300">
              <div className="flex items-center gap-4 text-charcoal">
                 <span className="text-sm font-black tracking-tight">{selectedProducts.length} منتجات مختارة</span>
                 <div className="h-6 w-px bg-charcoal/20" />
                 <div className="flex gap-2">
                    <button className="p-2 hover:bg-black/10 rounded-lg transition-colors"><Edit2 className="w-4 h-4" /></button>
                    <button className="p-2 hover:bg-black/10 rounded-lg transition-colors"><EyeOff className="w-4 h-4" /></button>
                    <button className="p-2 hover:bg-black/10 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                 </div>
              </div>
              <button 
                onClick={() => setSelectedProducts([])}
                className="p-2 hover:bg-black/10 rounded-lg text-charcoal"
              >
                 <X className="w-5 h-5" />
              </button>
           </div>
         )}

         <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-right">
               <thead className="bg-white/[0.02] border-b border-white/5">
                  <tr className="text-white/30 text-[10px] font-black uppercase tracking-[0.2em]">
                     <th className="p-6 w-12 text-center">
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 rounded border-white/10 bg-white/5 accent-gold"
                          checked={selectedProducts.length === products.length}
                          onChange={toggleSelectAll}
                        />
                     </th>
                     <th className="p-6">المنتج</th>
                     <th className="p-6">التصنيف</th>
                     <th className="p-6">السعر (دج) <ArrowUpDown className="w-3 h-3 inline-block ml-1" /></th>
                     <th className="p-6">المخزون <ArrowUpDown className="w-3 h-3 inline-block ml-1" /></th>
                     <th className="p-6">الحالة</th>
                     <th className="p-6 text-center">إجراءات</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                  {products.map((product) => (
                    <tr key={product.id} className={`hover:bg-white/[0.02] transition-colors group ${selectedProducts.includes(product.id) ? 'bg-gold/5' : ''}`}>
                       <td className="p-6 text-center">
                          <input 
                            type="checkbox" 
                            className="w-4 h-4 rounded border-white/10 bg-white/5 accent-gold"
                            checked={selectedProducts.includes(product.id)}
                            onChange={() => toggleSelect(id)} // Fix: product.id
                          />
                       </td>
                       <td className="p-6">
                          <div className="flex items-center gap-4">
                             <div className="w-12 h-12 rounded-xl bg-white/5 overflow-hidden border border-white/5 group-hover:border-gold transition-colors">
                                <img src={product.image} className="w-full h-full object-cover" alt="Product" />
                             </div>
                             <div>
                                <p className="text-sm font-bold text-white group-hover:text-gold transition-colors">{product.name}</p>
                                <p className="text-[10px] text-white/30 font-medium tracking-tight">ID: SKU-{1000 + product.id}</p>
                             </div>
                          </div>
                       </td>
                       <td className="p-6">
                          <span className="text-xs font-bold text-white/60 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                             {product.category}
                          </span>
                       </td>
                       <td className="p-6 font-black text-sm text-white">
                          {product.price.toLocaleString()}
                       </td>
                       <td className="p-6">
                          <div className="space-y-1">
                             <p className="text-sm font-bold text-white">{product.stock.toLocaleString()} <span className="text-[10px] text-white/30 font-medium">متر</span></p>
                             <div className="w-24 h-1 bg-white/5 rounded-full overflow-hidden">
                                <div className={`h-full ${product.stock < 50 ? 'bg-red-500' : 'bg-gold'} transition-all`} style={{ width: `${Math.min(100, (product.stock / 1000) * 100)}%` }} />
                             </div>
                          </div>
                       </td>
                       <td className="p-6">
                          <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                            product.status === 'Active' ? 'bg-green-500/10 text-green-400 border border-green-500/10' :
                            product.status === 'Low Stock' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/10' : 'bg-red-500/10 text-red-400 border border-red-500/10'
                          }`}>
                             {product.status === 'Active' ? 'نشط' : product.status === 'Low Stock' ? 'مخزون منخفض' : 'نفذ'}
                          </span>
                       </td>
                       <td className="p-6">
                          <div className="flex justify-center gap-2">
                             <button className="p-2.5 bg-white/5 text-white/40 hover:text-gold hover:bg-gold/10 rounded-xl transition-all border border-white/5 hover:border-gold/20">
                                <Edit2 className="w-4 h-4" />
                             </button>
                             <div className="relative group/menu">
                                <button className="p-2.5 bg-white/5 text-white/40 hover:text-white hover:bg-white/10 rounded-xl transition-all border border-white/5">
                                   <MoreVertical className="w-4 h-4" />
                                </button>
                                <div className="absolute left-0 bottom-full mb-2 w-48 bg-[#1A1917] border border-white/5 rounded-2xl shadow-2xl p-2 hidden group-hover/menu:block z-50">
                                   <button className="w-full text-right p-3 rounded-xl hover:bg-white/5 flex items-center justify-between text-xs font-bold text-white/60 hover:text-white transition-all">
                                      نسخ المنتج <Copy className="w-4 h-4" />
                                   </button>
                                   <button className="w-full text-right p-3 rounded-xl hover:bg-white/5 flex items-center justify-between text-xs font-bold text-white/60 hover:text-white transition-all text-amber-400">
                                      تعطيل البيع <EyeOff className="w-4 h-4" />
                                   </button>
                                   <div className="h-px bg-white/5 my-1" />
                                   <button className="w-full text-right p-3 rounded-xl hover:bg-red-500/10 flex items-center justify-between text-xs font-bold text-red-400 transition-all">
                                      حذف المنتج <Trash2 className="w-4 h-4" />
                                   </button>
                                </div>
                             </div>
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>

         {/* Pagination Footer */}
         <div className="p-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
            <p className="text-xs font-bold text-white/30 uppercase tracking-widest">Showing 1 to 5 of 124 products</p>
            <div className="flex items-center gap-2">
               <button className="px-4 py-2 bg-white/5 text-white/40 rounded-xl text-xs font-black border border-white/5 disabled:opacity-30" disabled>السابق</button>
               <button className="w-10 h-10 bg-gold text-charcoal rounded-xl text-xs font-black shadow-lg shadow-gold/20">1</button>
               <button className="w-10 h-10 bg-white/5 text-white rounded-xl text-xs font-black hover:bg-white/10 transition-all">2</button>
               <button className="w-10 h-10 bg-white/5 text-white rounded-xl text-xs font-black hover:bg-white/10 transition-all">3</button>
               <button className="px-4 py-2 bg-white/5 text-white rounded-xl text-xs font-black border border-white/5 hover:bg-white/10 transition-all">التالي</button>
            </div>
         </div>

      </section>

      {/* ─── Quick Stats Footer ─── */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-[#1A1917] p-6 rounded-[2rem] border border-white/5 flex items-center gap-4">
            <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center text-gold">
               <Package className="w-6 h-6" />
            </div>
            <div>
               <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">إجمالي المخزون</p>
               <p className="text-xl font-black text-white">45,200 م</p>
            </div>
         </div>
         <div className="bg-[#1A1917] p-6 rounded-[2rem] border border-white/5 flex items-center gap-4">
            <div className="w-12 h-12 bg-burgundy/10 rounded-xl flex items-center justify-center text-burgundy">
               <AlertCircle className="w-6 h-6" />
            </div>
            <div>
               <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">مخزون منخفض</p>
               <p className="text-xl font-black text-white">12 منتج</p>
            </div>
         </div>
         <div className="bg-[#1A1917] p-6 rounded-[2rem] border border-white/5 flex items-center gap-4">
            <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-500">
               <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
               <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">إجمالي المبيعات</p>
               <p className="text-xl font-black text-white">840 طلب</p>
            </div>
         </div>
      </section>

    </div>
  );
}
