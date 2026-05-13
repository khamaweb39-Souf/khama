'use client';

import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, SlidersHorizontal, Grid3X3, LayoutGrid, 
  ChevronRight, ChevronLeft, Heart, ShoppingCart, 
  Maximize2, Share2, Star, MapPin, Layers, 
  Wind, Scissors, Package, Shirt, ShieldCheck,
  Zap, Globe, TrendingUp, Sparkles, Clock
} from 'lucide-react';
import Link from 'next/link';
import FilterSidebar from '../../../components/FilterSidebar';

// ─── Mock Data ─────────────────────────────────────────────────────────────
const MOST_WANTED = [
  { id: 1, name: 'حرير ساتان إيطالي', category: 'حرير', price: 4500, rating: 4.9, image: 'https://images.unsplash.com/photo-1606103920295-9a091573f160?q=80&w=800&auto=format&fit=crop', supplier: 'Miras Textiles' },
  { id: 2, name: 'كتان عضوي من نسيج', category: 'كتان', price: 2800, rating: 4.8, image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=800&auto=format&fit=crop', supplier: 'Dz Fabric' },
  { id: 3, name: 'بوليستر تقني للرياضة', category: 'بوليستر', price: 1500, rating: 4.7, image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800&auto=format&fit=crop', supplier: 'EcoTex' },
];

const FABRIC_TYPES = [
  { name: 'قطن', image: 'https://images.unsplash.com/photo-1610444583737-9f13fc3ca893?q=80&w=400&auto=format&fit=crop', count: '1,200+' },
  { name: 'حرير', image: 'https://images.unsplash.com/photo-1574015974293-817f0ebebb74?q=80&w=400&auto=format&fit=crop', count: '450+' },
  { name: 'كتان', image: 'https://images.unsplash.com/photo-1517502474097-f9b30659dadb?q=80&w=400&auto=format&fit=crop', count: '320+' },
  { name: 'جلد', image: 'https://images.unsplash.com/photo-1558444479-c8af50e90c58?q=80&w=400&auto=format&fit=crop', count: '850+' },
  { name: 'صوف', image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=400&auto=format&fit=crop', count: '600+' },
  { name: 'مزخرف', image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=400&auto=format&fit=crop', count: '200+' },
];

const PRODUCTS = [
  { id: 101, name: 'قماش كتان ريفي', price: 3200, gsm: 220, rating: 4.5, image: 'https://images.unsplash.com/photo-1517502474097-f9b30659dadb?q=80&w=600&auto=format&fit=crop', tall: true },
  { id: 102, name: 'ساتان لامع سهرة', price: 5800, gsm: 140, rating: 4.9, image: 'https://images.unsplash.com/photo-1606103920295-9a091573f160?q=80&w=600&auto=format&fit=crop', tall: false },
  { id: 103, name: 'دانتيل فرنسي مطرز', price: 12000, gsm: 110, rating: 5.0, image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=600&auto=format&fit=crop', tall: true },
  { id: 104, name: 'قطن مصري طويل التيلة', price: 4200, gsm: 180, rating: 4.8, image: 'https://images.unsplash.com/photo-1610444583737-9f13fc3ca893?q=80&w=600&auto=format&fit=crop', tall: false },
  { id: 105, name: 'جاكارد كلاسيكي', price: 7500, gsm: 280, rating: 4.6, image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=600&auto=format&fit=crop', tall: true },
  { id: 106, name: 'مخمل ملكي', price: 6900, gsm: 350, rating: 4.7, image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=600&auto=format&fit=crop', tall: false },
];

export default function FabricsCatalogPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [quickViewId, setQuickViewId] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#FDFCFB]" dir="rtl">
      
      {/* ─── 1. Hero Search Section ─── */}
      <section className="relative h-[65vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2000&auto=format&fit=crop" 
            className="w-full h-full object-cover scale-105 animate-slow-zoom"
            alt="Fabrics Background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent" />
        </div>
        
        <div className="relative z-10 w-full max-w-4xl px-4 text-center space-y-8">
           <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight">معرض خامة للأقمشة</h1>
              <p className="text-xl text-white/80 font-medium max-w-2xl mx-auto">
                 اكتشف أكبر مجموعة من الأقمشة الفاخرة والصناعية من موردين معتمدين عالمياً.
              </p>
           </div>

           {/* Large Search Bar */}
           <div className="relative max-w-2xl mx-auto group">
              <div className="absolute -inset-1 bg-gradient-to-r from-gold to-burgundy rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
              <div className="relative bg-white rounded-[2rem] flex items-center p-2 shadow-2xl">
                 <div className="flex-1 flex items-center px-6">
                    <Search className="w-6 h-6 text-muted" />
                    <input 
                      type="text" 
                      placeholder="ابحث عن: حرير، قطن 100%، مورد في الجزائر..."
                      className="w-full py-4 px-4 outline-none text-charcoal font-bold text-lg bg-transparent"
                    />
                 </div>
                 <button className="bg-charcoal text-white px-10 py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:bg-gold transition-all">
                    بحث ذكي
                 </button>
              </div>
           </div>

           {/* Stats Section */}
           <div className="flex flex-wrap justify-center gap-8 lg:gap-16 pt-6">
              {[
                { label: 'قماش متاح', val: '15,000+', icon: <Layers /> },
                { label: 'مورد موثوق', val: '500+', icon: <ShieldCheck /> },
                { label: 'نوع نسج', val: '25+', icon: <Wind /> },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-3 text-white">
                   <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-gold">
                      {stat.icon}
                   </div>
                   <div className="text-right">
                      <p className="text-2xl font-black">{stat.val}</p>
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/60">{stat.label}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* ─── Quick Filter Pills ─── */}
      <div className="sticky top-20 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100 py-4 overflow-hidden">
         <div className="max-w-[1400px] mx-auto px-4 flex items-center gap-4 overflow-x-auto no-scrollbar">
            <button className="flex items-center gap-2 px-6 py-3 bg-charcoal text-white rounded-2xl text-xs font-black shrink-0">
               <SlidersHorizontal className="w-4 h-4" /> فلاتر متقدمة
            </button>
            {['وصل حديثاً', 'الأكثر طلباً', 'قطن 100%', 'حرير طبيعي', 'كتان صيفي', 'جلود صناعية', 'تخفيضات'].map((pill, i) => (
              <button key={i} className="px-6 py-3 bg-gray-50 hover:bg-ecru rounded-2xl text-xs font-bold text-muted whitespace-nowrap transition-all border border-transparent hover:border-gold/30">
                 {pill}
              </button>
            ))}
         </div>
      </div>

      <main className="max-w-[1400px] mx-auto px-4 py-16 space-y-24">
        
        {/* ─── 2. Sections: Most Wanted ─── */}
        <section className="space-y-8">
           <div className="flex justify-between items-end">
              <div className="space-y-2">
                 <div className="flex items-center gap-2 text-gold">
                    <TrendingUp className="w-5 h-5" />
                    <span className="text-[10px] font-black uppercase tracking-widest">الاتجاهات الحالية</span>
                 </div>
                 <h2 className="text-4xl font-black text-charcoal tracking-tighter">الأكثر طلباً هذا الأسبوع</h2>
              </div>
              <Link href="/cat/fabrics?sort=popular" className="text-xs font-black text-muted hover:text-burgundy flex items-center gap-1 uppercase tracking-widest transition-all">
                 عرض الكل <ChevronLeft className="w-4 h-4" />
              </Link>
           </div>

           <div className="grid lg:grid-cols-3 gap-8">
              {MOST_WANTED.map(item => (
                <div key={item.id} className="group relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
                   <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                   <div className="absolute bottom-0 p-10 w-full space-y-4">
                      <div className="flex justify-between items-start">
                         <div className="space-y-1">
                            <span className="px-3 py-1 bg-gold text-charcoal text-[8px] font-black uppercase rounded-full">{item.category}</span>
                            <h3 className="text-2xl font-black text-white">{item.name}</h3>
                         </div>
                         <div className="text-right">
                            <p className="text-gold font-black text-lg">{item.price} DZD</p>
                            <p className="text-white/60 text-[10px] uppercase">لكل متر</p>
                         </div>
                      </div>
                      <button className="w-full py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl font-bold text-xs hover:bg-white hover:text-charcoal transition-all">
                         عرض التفاصيل التقنية
                      </button>
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* ─── 3. Browse by Fabric Type ─── */}
        <section className="space-y-8">
           <div className="text-center space-y-2">
              <div className="flex justify-center items-center gap-2 text-burgundy">
                 <Sparkles className="w-5 h-5" />
                 <span className="text-[10px] font-black uppercase tracking-widest">خامات متنوعة</span>
              </div>
              <h2 className="text-4xl font-black text-charcoal">تصفح حسب نوع القماش</h2>
           </div>

           <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
              {FABRIC_TYPES.map((type, i) => (
                <Link key={i} href={`/cat/fabrics?type=${type.name}`} className="group space-y-4">
                   <div className="aspect-square rounded-[2rem] overflow-hidden bg-gray-100 border border-transparent group-hover:border-gold group-hover:shadow-xl transition-all duration-500">
                      <img src={type.image} alt={type.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
                   </div>
                   <div className="text-center">
                      <p className="font-black text-charcoal">{type.name}</p>
                      <p className="text-[10px] font-black text-muted uppercase">{type.count} منتج</p>
                   </div>
                </Link>
              ))}
           </div>
        </section>

        {/* ─── 4. Main Catalog (Masonry Style Grid) ─── */}
        <section className="pt-16 border-t border-gray-100">
           <div className="flex flex-col lg:flex-row gap-12">
              
              {/* Sidebar Filter Placeholder (assuming FilterSidebar exists) */}
              <aside className="hidden lg:block w-72 space-y-12">
                 <div className="space-y-6">
                    <h4 className="text-sm font-black text-charcoal uppercase tracking-widest">تصفية متقدمة</h4>
                    <FilterSidebar />
                 </div>
              </aside>

              <div className="flex-1 space-y-12">
                 <div className="flex justify-between items-center bg-white p-4 rounded-3xl border border-gray-100">
                    <div className="flex items-center gap-6">
                       <p className="text-xs font-black text-muted uppercase">نتائج البحث: <span className="text-charcoal">1,240 قماش</span></p>
                       <div className="h-4 w-[1px] bg-gray-100" />
                       <div className="flex items-center gap-2">
                          <button className="p-2 bg-charcoal text-white rounded-lg shadow-lg"><Grid3X3 className="w-4 h-4" /></button>
                          <button className="p-2 bg-gray-50 text-muted rounded-lg hover:bg-ecru transition-all"><LayoutGrid className="w-4 h-4" /></button>
                       </div>
                    </div>
                    <select className="bg-transparent text-xs font-black text-charcoal outline-none border-none">
                       <option>الأحدث أولاً</option>
                       <option>السعر: من الأقل للأعلى</option>
                       <option>السعر: من الأعلى للأقل</option>
                       <option>الأكثر تقييماً</option>
                    </select>
                 </div>

                 {/* Product Grid (Masonry effect using column layout) */}
                 <div className="columns-2 lg:columns-3 gap-8 space-y-8">
                    {PRODUCTS.map(product => (
                      <div key={product.id} className="break-inside-avoid group relative bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 hover:shadow-[0_40px_100px_rgba(0,0,0,0.08)] transition-all duration-700">
                         <div className={`relative w-full ${product.tall ? 'h-96' : 'h-72'} overflow-hidden`}>
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                            
                            {/* Actions Overlay */}
                            <div className="absolute top-6 left-6 flex flex-col gap-3 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                               <button className="p-3 bg-white/90 backdrop-blur text-charcoal rounded-2xl shadow-xl hover:bg-burgundy hover:text-white transition-all">
                                  <Heart className="w-4 h-4" />
                               </button>
                               <button 
                                 onClick={() => setQuickViewId(product.id)}
                                 className="p-3 bg-white/90 backdrop-blur text-charcoal rounded-2xl shadow-xl hover:bg-burgundy hover:text-white transition-all"
                               >
                                  <Maximize2 className="w-4 h-4" />
                               </button>
                            </div>

                            <button className="absolute bottom-6 left-1/2 -translate-x-1/2 w-4/5 py-3 bg-charcoal/90 backdrop-blur text-white rounded-2xl text-[10px] font-black uppercase tracking-widest opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 hover:bg-gold">
                               إضافة للمقارنة
                            </button>
                         </div>

                         <div className="p-8 space-y-3">
                            <div className="flex justify-between items-start">
                               <div className="space-y-1">
                                  <h4 className="font-black text-charcoal group-hover:text-burgundy transition-colors">{product.name}</h4>
                                  <p className="text-[10px] font-black text-muted uppercase">{product.gsm} GSM | نسيج سادة</p>
                               </div>
                               <div className="flex items-center gap-1 text-gold">
                                  <Star className="w-3 h-3 fill-current" />
                                  <span className="text-xs font-black">{product.rating}</span>
                               </div>
                            </div>
                            <div className="flex justify-between items-end pt-4 border-t border-gray-50">
                               <div>
                                  <p className="text-sm font-black text-charcoal">{product.price.toLocaleString()} DZD</p>
                                  <p className="text-[8px] font-black text-muted uppercase">لكل متر</p>
                               </div>
                               <button className="flex items-center gap-1 text-[10px] font-black text-burgundy uppercase tracking-widest hover:translate-x-[-4px] transition-transform">
                                  طلب عينة <ChevronLeft className="w-3 h-3" />
                               </button>
                            </div>
                         </div>
                      </div>
                    ))}
                 </div>

                 {/* Load More */}
                 <div className="flex flex-col items-center justify-center pt-12 space-y-4">
                    <div className="w-16 h-16 rounded-full border-4 border-gray-100 border-t-gold animate-spin" />
                    <p className="text-xs font-black text-muted uppercase tracking-[0.2em]">جاري تحميل المزيد من الخامات...</p>
                 </div>
              </div>

           </div>
        </section>

        {/* ─── 5. Browse by Usage ─── */}
        <section className="bg-charcoal p-16 rounded-[4rem] text-white space-y-12">
           <div className="text-center space-y-4">
              <h2 className="text-4xl font-black">ما هو هدفك من البحث؟</h2>
              <p className="text-white/60 text-lg max-w-xl mx-auto">نساعدك في الوصول لأفضل الخامات حسب التخصص النهائي لمنتجك.</p>
           </div>
           
           <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { label: 'أزياء وموضة', icon: <Shirt />, count: '5,000+' },
                { label: 'أثاث وديكور', icon: <Package />, count: '3,000+' },
                { label: 'ملابس مهنية', icon: <Scissors />, count: '1,500+' },
                { label: 'استخدام صناعي', icon: <Zap />, count: '2,000+' },
              ].map((use, i) => (
                <button key={i} className="group bg-white/5 border border-white/10 p-10 rounded-[3rem] flex flex-col items-center text-center space-y-6 hover:bg-gold hover:border-gold hover:text-charcoal transition-all duration-700">
                   <div className="w-20 h-20 rounded-3xl bg-white/10 group-hover:bg-charcoal/10 flex items-center justify-center text-gold group-hover:text-charcoal transition-all">
                      {React.cloneElement(use.icon as React.ReactElement, { className: 'w-10 h-10' })}
                   </div>
                   <div className="space-y-1">
                      <p className="text-xl font-black">{use.label}</p>
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-60">{use.count} خامة</p>
                   </div>
                </button>
              ))}
           </div>
        </section>

        {/* ─── 6. Featured Suppliers ─── */}
        <section className="space-y-12">
           <div className="flex justify-between items-end">
              <div className="space-y-2">
                 <div className="flex items-center gap-2 text-burgundy">
                    <ShieldCheck className="w-5 h-5" />
                    <span className="text-[10px] font-black uppercase tracking-widest">شركاء النجاح</span>
                 </div>
                 <h2 className="text-4xl font-black text-charcoal">موردون مميزون</h2>
              </div>
              <Link href="/suppliers" className="text-xs font-black text-muted hover:text-burgundy flex items-center gap-1 uppercase tracking-widest transition-all">
                 عرض كل الموردين <ChevronLeft className="w-4 h-4" />
              </Link>
           </div>

           <div className="grid lg:grid-cols-2 gap-8">
              {[
                { name: 'Miras Textiles', origin: 'إيطاليا', special: 'حرير ودانتيل فاخر', logo: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=200&auto=format&fit=crop' },
                { name: 'نسيج الجزائر', origin: 'الجزائر', special: 'قطن وكتان محلي عالي الجودة', logo: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=200&auto=format&fit=crop' },
              ].map((supplier, i) => (
                <div key={i} className="bg-white rounded-[3rem] border border-gray-100 p-10 flex flex-col lg:flex-row gap-8 items-center hover:shadow-xl transition-all duration-700">
                   <div className="w-32 h-32 rounded-[2rem] overflow-hidden bg-gray-50 flex items-center justify-center border border-gray-100">
                      <img src={supplier.logo} alt={supplier.name} className="w-20 h-20 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all" />
                   </div>
                   <div className="flex-1 space-y-4 text-center lg:text-right">
                      <div className="space-y-1">
                         <h4 className="text-2xl font-black text-charcoal">{supplier.name}</h4>
                         <div className="flex items-center justify-center lg:justify-start gap-2 text-muted text-xs font-bold">
                            <MapPin className="w-3.5 h-3.5" /> {supplier.origin}
                            <span className="text-gray-200">|</span>
                            <Star className="w-3.5 h-3.5 text-gold fill-current" /> 4.9 (120 تقييم)
                         </div>
                      </div>
                      <p className="text-sm text-muted font-medium italic">متخصص في: {supplier.special}</p>
                      <div className="flex gap-2">
                         <button className="flex-1 py-3 bg-charcoal text-white rounded-xl text-[10px] font-black uppercase tracking-widest">زيارة المتجر</button>
                         <button className="px-5 py-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-all"><Share2 className="w-4 h-4" /></button>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </section>

      </main>

      {/* ─── Footer CTA ─── */}
      <section className="bg-ecru py-24">
         <div className="max-w-4xl mx-auto px-4 text-center space-y-12">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto shadow-2xl text-gold animate-bounce">
               <Globe className="w-12 h-12" />
            </div>
            <div className="space-y-4">
               <h2 className="text-5xl font-black text-charcoal">هل تبحث عن مورد في بلد معين؟</h2>
               <p className="text-xl text-muted font-medium">نمتلك شبكة عالمية من الموردين المعتمدين في أكثر من 30 دولة حول العالم.</p>
            </div>
            <button className="px-12 py-6 bg-burgundy text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-burgundy/40 hover:bg-gold transition-all">
               تصفح الخريطة العالمية للموردين
            </button>
         </div>
      </section>

      {/* Quick View Modal Placeholder */}
      {quickViewId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-charcoal/40 backdrop-blur-md" onClick={() => setQuickViewId(null)} />
           <div className="relative bg-white w-full max-w-5xl rounded-[3rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-500">
              <button onClick={() => setQuickViewId(null)} className="absolute top-8 left-8 z-10 p-2 bg-gray-50 rounded-full hover:bg-red-500 hover:text-white transition-all">
                 <X className="w-6 h-6" />
              </button>
              <div className="grid lg:grid-cols-2">
                 <div className="h-[600px] bg-gray-100">
                    <img src={PRODUCTS.find(p => p.id === quickViewId)?.image} className="w-full h-full object-cover" alt="Product" />
                 </div>
                 <div className="p-16 space-y-8">
                    <div className="space-y-2">
                       <p className="text-xs font-black text-gold uppercase tracking-[0.2em]">عرض سريع</p>
                       <h2 className="text-4xl font-black text-charcoal">{PRODUCTS.find(p => p.id === quickViewId)?.name}</h2>
                    </div>
                    <div className="flex items-center gap-6">
                       <div className="text-3xl font-black text-charcoal">{PRODUCTS.find(p => p.id === quickViewId)?.price.toLocaleString()} DZD</div>
                       <div className="px-4 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase">متوفر في المخزن</div>
                    </div>
                    <p className="text-muted leading-relaxed font-medium">
                       هذا القماش يتميز بجودة عالية ومتانة فائقة، مناسب للاستخدامات الطويلة الأمد. تم اختباره وفق المعايير الدولية للجودة والتحمل.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="p-4 bg-gray-50 rounded-2xl space-y-1">
                          <p className="text-[10px] font-black text-muted uppercase">الوزن</p>
                          <p className="font-bold">{PRODUCTS.find(p => p.id === quickViewId)?.gsm} GSM</p>
                       </div>
                       <div className="p-4 bg-gray-50 rounded-2xl space-y-1">
                          <p className="text-[10px] font-black text-muted uppercase">نوع النسج</p>
                          <p className="font-bold">سادة / Plain</p>
                       </div>
                    </div>
                    <div className="flex gap-4 pt-4">
                       <button className="flex-1 py-5 bg-charcoal text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-burgundy transition-all">إضافة للسلة</button>
                       <button className="flex-1 py-5 border border-gray-100 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-50 transition-all">طلب عرض سعر</button>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}

    </div>
  );
}

function X({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );
}
