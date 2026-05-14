'use client';

import React from 'react';
import { 
  ShoppingBag, FileText, Truck, Heart, 
  ArrowUpRight, ArrowDownRight, Clock, 
  Bell, Zap, ChevronRight, Star, Search,
  CheckCircle2, AlertCircle, Sparkles, Filter,
  ExternalLink, MousePointer2, TrendingUp, Package
} from 'lucide-react';

export default function BuyerDashboardPage() {
  
  const stats = [
    { label: 'طلبات نشطة', value: '04', change: '+1', trend: 'up', icon: <ShoppingBag />, color: 'text-gold' },
    { label: 'RFQ مفتوحة', value: '12', change: '+3', trend: 'up', icon: <FileText />, color: 'text-blue-400' },
    { label: 'عينات قيد الشحن', value: '07', change: '-2', trend: 'down', icon: <Truck />, color: 'text-purple-400' },
    { label: 'المفضلات', value: '156', change: '+24', trend: 'up', icon: <Heart />, color: 'text-red-400' },
  ];

  const activeRFQs = [
    { id: 'RFQ-882', category: 'كتان عضوي بريميوم', offers: 5, time: '24h left', status: 'Active' },
    { id: 'RFQ-879', category: 'حرير طبيعي مطرز', offers: 12, time: '3 days left', status: 'Active' },
  ];

  const recentOrders = [
    { id: 'ORD-552', supplier: 'نسيج الشرق', amount: '12,400 دج', status: 'Preparing', date: 'Today' },
    { id: 'ORD-548', supplier: 'مصنع تلمسان الحديث', amount: '45,000 دج', status: 'Shipped', date: 'Yesterday' },
  ];

  const suggestions = [
    { id: 1, name: 'بوليستر تقني رياضي', price: '450 دج/متر', img: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=200', tag: 'Trend' },
    { id: 2, name: 'كتان مغسول إيطالي', price: '890 دج/متر', img: 'https://images.unsplash.com/photo-1590736962236-49a888a719d3?auto=format&fit=crop&q=80&w=200', tag: 'Eco' },
    { id: 3, name: 'ساتان لامع سهرة', price: '1,200 دج/متر', img: 'https://images.unsplash.com/photo-1574169208507-84376144848b?auto=format&fit=crop&q=80&w=200', tag: 'New' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-1000 text-right" dir="rtl">
      
      {/* ─── 1. Welcome Header ─── */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
         <div className="space-y-2">
            <h1 className="text-4xl font-black text-white tracking-tight">مرحباً بك، <span className="text-gold">أحمد العمراني</span> 👋</h1>
            <p className="text-white/40 font-medium">إليك نظرة سريعة على عمليات الشراء والطلبات النشطة اليوم.</p>
         </div>
         <div className="flex gap-3">
            <button className="px-6 py-3 bg-white/5 text-white/60 text-[10px] font-black uppercase tracking-widest rounded-xl border border-white/5 hover:text-white transition-all">
               تقارير المشتريات
            </button>
            <button className="px-8 py-3 bg-gold text-charcoal text-[11px] font-black uppercase tracking-widest rounded-xl shadow-xl shadow-gold/20 hover:scale-105 transition-all flex items-center gap-3">
               <Zap className="w-4 h-4 fill-current" /> بدء مناقصة جديدة (RFQ)
            </button>
         </div>
      </header>

      {/* ─── 2. Stats Grid ─── */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-[#1A1917] p-8 rounded-[2.5rem] border border-white/5 hover:border-gold/30 transition-all duration-500 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-gold/10 transition-all" />
            
            <div className="flex justify-between items-start mb-6">
               <div className={`p-4 bg-white/5 rounded-2xl group-hover:scale-110 transition-transform duration-500 ${stat.color}`}>
                  {React.cloneElement(stat.icon as React.ReactElement<any>, { className: 'w-6 h-6' })}
               </div>
               <div className={`flex items-center gap-1 text-[10px] font-black px-3 py-1 rounded-full ${
                 stat.trend === 'up' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
               }`}>
                  {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.change}
               </div>
            </div>
            
            <div className="space-y-1">
               <h4 className="text-[11px] font-black text-white/30 uppercase tracking-[0.2em]">{stat.label}</h4>
               <p className="text-3xl font-black text-white tracking-tighter">{stat.value}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ─── 3. Main Operational Grid ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         
         {/* Active RFQs Monitoring */}
         <div className="lg:col-span-2 bg-[#1A1917] p-10 rounded-[3rem] border border-white/5 space-y-8 relative overflow-hidden">
            <div className="flex justify-between items-end">
               <div className="space-y-1">
                  <h3 className="text-xl font-black text-white">مناقصاتي النشطة (RFQs)</h3>
                  <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold">متابعة العروض الواردة لحظياً</p>
               </div>
               <button className="text-[10px] font-black text-gold uppercase tracking-[0.2em] hover:underline">مركز المناقصات</button>
            </div>

            <div className="space-y-4">
               {activeRFQs.map((rfq, idx) => (
                 <div key={idx} className="p-6 bg-white/[0.02] border border-white/5 rounded-[2rem] flex items-center justify-between group hover:border-gold/30 transition-all">
                    <div className="flex items-center gap-6">
                       <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-gold relative">
                          <FileText className="w-6 h-6" />
                          <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-charcoal text-[10px] font-black rounded-full flex items-center justify-center border-2 border-[#1A1917]">
                             {rfq.offers}
                          </span>
                       </div>
                       <div>
                          <p className="text-sm font-bold text-white group-hover:text-gold transition-colors">{rfq.category}</p>
                          <div className="flex items-center gap-3 mt-1">
                             <span className="text-[10px] text-white/30 font-black uppercase tracking-widest">{rfq.id}</span>
                             <span className="w-1 h-1 bg-white/10 rounded-full" />
                             <span className="text-[10px] text-amber-400 font-bold flex items-center gap-1">
                                <Clock className="w-3 h-3" /> {rfq.time}
                             </span>
                          </div>
                       </div>
                    </div>
                    <button className="px-6 py-2.5 bg-white/5 hover:bg-gold text-white/60 hover:text-charcoal text-[10px] font-black rounded-xl transition-all">
                       مقارنة {rfq.offers} عروض
                    </button>
                 </div>
               ))}
            </div>

            {/* Simulated RFQ Progress Visual */}
            <div className="pt-6 border-t border-white/5">
               <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">إجمالي استجابة الموردين</span>
                  <span className="text-[10px] font-black text-gold">84%</span>
               </div>
               <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-l from-gold to-burgundy w-[84%] shadow-[0_0_10px_rgba(201,168,76,0.5)]" />
               </div>
            </div>
         </div>

         {/* Smart Notifications & Alerts */}
         <div className="bg-gold/5 border border-gold/10 p-10 rounded-[3rem] flex flex-col justify-between space-y-8">
            <div className="space-y-6">
               <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black text-white">تنبيهات هامة</h3>
                  <Bell className="w-5 h-5 text-gold animate-bounce" />
               </div>
               
               <div className="space-y-4">
                  {[
                    { title: 'تحديث سعر السوق', desc: 'انخفاض أسعار الكتان بنسبة 3% اليوم.', type: 'info' },
                    { title: 'تأخر عينة', desc: 'العينة DZ-889 قد تتأخر يومين إضافيين.', type: 'warn' },
                  ].map((alert, i) => (
                    <div key={i} className="p-5 bg-[#1A1917]/50 rounded-2xl border-r-4 border-gold space-y-1">
                       <h4 className="text-xs font-black text-white">{alert.title}</h4>
                       <p className="text-[10px] text-white/40 leading-relaxed">{alert.desc}</p>
                    </div>
                  ))}
               </div>
            </div>

            {/* Price Tracker Small Card */}
            <div className="p-6 bg-charcoal rounded-3xl border border-white/5 space-y-4 relative overflow-hidden">
               <TrendingUp className="absolute top-0 right-0 w-16 h-16 text-white/5 -translate-y-1/2 translate-x-1/2" />
               <div className="space-y-1">
                  <p className="text-[9px] font-black text-gold uppercase tracking-widest">مؤشر السوق</p>
                  <p className="text-xs font-bold text-white">سعر القطن العالمي</p>
               </div>
               <div className="flex items-center gap-2">
                  <span className="text-2xl font-black text-white">78.45</span>
                  <span className="text-[10px] text-green-400 font-bold">+1.2%</span>
               </div>
            </div>
         </div>
      </div>

      {/* ─── 4. Orders & AI Suggestions ─── */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         
         {/* Recent Orders Progress */}
         <div className="bg-[#1A1917] rounded-[3rem] border border-white/5 overflow-hidden">
            <div className="p-8 border-b border-white/5 flex justify-between items-center">
               <h3 className="text-xl font-black text-white flex items-center gap-3">
                  <Package className="w-6 h-6 text-gold" /> طلبياتي الأخيرة
               </h3>
               <button className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] hover:text-white transition-colors">عرض الكل</button>
            </div>
            <div className="divide-y divide-white/5">
               {recentOrders.map((order, idx) => (
                 <div key={idx} className="p-8 flex items-center justify-between hover:bg-white/[0.02] transition-colors group">
                    <div className="flex items-center gap-6">
                       <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center font-black text-xs text-white/20 group-hover:text-gold transition-colors">
                          #{order.id.split('-')[1]}
                       </div>
                       <div className="space-y-1">
                          <p className="font-bold text-white group-hover:text-gold transition-colors">{order.supplier}</p>
                          <p className="text-[10px] text-white/30 font-medium tracking-widest uppercase">{order.id} | {order.date}</p>
                       </div>
                    </div>
                    <div className="text-left space-y-2">
                       <p className="text-sm font-black text-white">{order.amount}</p>
                       <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                         order.status === 'Preparing' ? 'bg-gold/10 text-gold border border-gold/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                       }`}>
                          {order.status}
                       </span>
                    </div>
                 </div>
               ))}
            </div>
         </div>

         {/* AI Product Suggestions (Masonry Style) */}
         <div className="space-y-8">
            <div className="flex justify-between items-center">
               <h3 className="text-xl font-black text-white flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-purple-400" /> اقتراحات ذكية لك
               </h3>
               <button className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">تخصيص التفضيلات</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               {suggestions.map((item, i) => (
                 <div key={i} className="group bg-[#1A1917] rounded-3xl border border-white/5 overflow-hidden hover:border-gold/50 transition-all duration-500">
                    <div className="h-40 relative">
                       <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.name} />
                       <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button className="p-3 bg-gold text-charcoal rounded-xl shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform">
                             <Search className="w-5 h-5" />
                          </button>
                       </div>
                       <span className="absolute top-4 right-4 px-3 py-1 bg-gold text-charcoal text-[9px] font-black rounded-lg uppercase">{item.tag}</span>
                    </div>
                    <div className="p-6 space-y-1">
                       <h4 className="text-sm font-bold text-white group-hover:text-gold transition-colors">{item.name}</h4>
                       <p className="text-xs text-white/40">{item.price}</p>
                    </div>
                 </div>
               ))}
               
               {/* Discovery Card */}
               <div className="bg-gradient-to-br from-gold/10 to-transparent rounded-3xl border border-gold/10 p-8 flex flex-col justify-center items-center text-center space-y-4 cursor-pointer group hover:bg-gold/20 transition-all">
                  <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center text-gold group-hover:scale-110 transition-transform">
                     <MousePointer2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                     <p className="text-sm font-black text-white uppercase tracking-widest">اكتشف المزيد</p>
                     <p className="text-[10px] text-white/40">تصفح أحدث الخامات المتطورة</p>
                  </div>
               </div>
            </div>
         </div>

      </section>

    </div>
  );
}
