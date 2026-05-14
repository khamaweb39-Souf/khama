'use client';

import React, { useState } from 'react';
import { 
  TrendingUp, Users, ShoppingBag, MessageSquare, 
  ArrowUpRight, ArrowDownRight, Package, Calendar,
  ExternalLink, ChevronRight, Zap, Target,
  PlusCircle, Clock, BarChart2, Star,
  Eye, MousePointer2, AlertCircle, CheckCircle2
} from 'lucide-react';

export default function SupplierDashboardPage() {
  
  const kpis = [
    { label: 'إجمالي المبيعات', value: '142,500 دج', change: '+12.5%', trend: 'up', icon: <Target />, color: 'text-gold' },
    { label: 'الطلبات الجديدة', value: '28', change: '+4', trend: 'up', icon: <ShoppingBag />, color: 'text-blue-400' },
    { label: 'مشاهدات المتجر', value: '1,280', change: '+24%', trend: 'up', icon: <Eye />, color: 'text-purple-400' },
    { label: 'طلبات العينات', value: '12', change: '+2', trend: 'up', icon: <Sparkles />, color: 'text-green-400' },
  ];

  const recentOrders = [
    { id: '#ORD-992', buyer: 'أزياء العاصمة', amount: '8,400 دج', status: 'In Prep', date: '10:45 AM' },
    { id: '#ORD-988', buyer: 'ورشة الخياطة الجزائرية', amount: '12,000 دج', status: 'Shipped', date: 'Yesterday' },
    { id: '#ORD-985', buyer: 'مركز التوزيع الغربي', amount: '25,500 دج', status: 'Completed', date: '2 days ago' },
  ];

  const topProducts = [
    { name: 'كتان عضوي بريميوم', sales: 45, views: 1200, growth: '+15%' },
    { name: 'ساتان لامع سهرة', sales: 32, views: 850, growth: '+8%' },
    { name: 'بوليستر تقني رياضي', sales: 28, views: 600, growth: '+22%' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-1000 text-right" dir="rtl">
      
      {/* ─── 1. Welcome & Quick Stats ─── */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
         <div className="space-y-2">
            <h1 className="text-4xl font-black text-white tracking-tight">لوحة تحكم المورد <span className="text-gold">PRO</span></h1>
            <p className="text-white/40 font-medium">أهلاً بك مجدداً. متجرك الرقمي يحقق نمواً بنسبة 14% هذا الأسبوع.</p>
         </div>
         <div className="flex items-center gap-4 bg-white/5 p-2 rounded-2xl border border-white/5 backdrop-blur-sm">
            <div className="flex -space-x-3 rtl:space-x-reverse items-center px-4">
               {[1,2,3,4].map(i => (
                 <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0D0C0A] bg-charcoal overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Buyer" />
                 </div>
               ))}
               <div className="w-8 h-8 rounded-full border-2 border-[#0D0C0A] bg-gold flex items-center justify-center text-[10px] font-black text-charcoal">
                  +12
               </div>
            </div>
            <div className="h-8 w-px bg-white/5" />
            <div className="px-4 text-right">
               <p className="text-[10px] font-black text-gold uppercase tracking-widest">مشترون نشطون</p>
               <p className="text-sm font-bold text-white">45 شركة مهتمة</p>
            </div>
         </div>
      </header>

      {/* ─── 2. KPI Grid ─── */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="bg-[#1A1917] p-8 rounded-[2.5rem] border border-white/5 hover:border-gold/30 transition-all duration-500 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-gold/10 transition-all" />
            
            <div className="flex justify-between items-start mb-6">
               <div className={`p-4 bg-white/5 rounded-2xl group-hover:scale-110 transition-transform duration-500 ${kpi.color}`}>
                  {React.cloneElement(kpi.icon as React.ReactElement<any>, { className: 'w-6 h-6' })}
               </div>
               <div className={`flex items-center gap-1 text-[10px] font-black px-3 py-1 rounded-full ${
                 kpi.trend === 'up' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
               }`}>
                  {kpi.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {kpi.change}
               </div>
            </div>
            
            <div className="space-y-1 text-right">
               <h4 className="text-[11px] font-black text-white/30 uppercase tracking-[0.2em]">{kpi.label}</h4>
               <p className="text-3xl font-black text-white tracking-tighter">{kpi.value}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ─── 3. Charts Section ─── */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         
         {/* Main Sales Chart (SVG Simulation) */}
         <div className="lg:col-span-2 bg-[#1A1917] p-10 rounded-[3rem] border border-white/5 space-y-8 relative overflow-hidden">
            <div className="flex justify-between items-end">
               <div className="space-y-1 text-right">
                  <h3 className="text-xl font-black text-white">منحنى المبيعات والنمو</h3>
                  <p className="text-xs text-white/30 uppercase tracking-widest font-bold">آخر 6 أشهر - دج</p>
               </div>
               <div className="flex gap-2">
                  <button className="px-4 py-2 bg-white/5 text-[10px] font-black rounded-xl text-white/60 hover:bg-gold hover:text-charcoal transition-all">Yearly</button>
                  <button className="px-4 py-2 bg-gold text-charcoal text-[10px] font-black rounded-xl shadow-lg shadow-gold/20">Monthly</button>
               </div>
            </div>

            {/* Visual SVG Chart Placeholder */}
            <div className="h-64 w-full relative group">
               <svg viewBox="0 0 1000 300" className="w-full h-full">
                  <defs>
                     <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#C9A84C', stopOpacity: 0.3 }} />
                        <stop offset="100%" style={{ stopColor: '#C9A84C', stopOpacity: 0 }} />
                     </linearGradient>
                  </defs>
                  {/* Grid Lines */}
                  {[0, 50, 100, 150, 200, 250].map(y => (
                    <line key={y} x1="0" y1={y} x2="1000" y2={y} stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  ))}
                  {/* Area */}
                  <path d="M0,250 Q150,180 300,200 Q450,220 600,100 Q750,80 900,40 L900,250 L0,250 Z" fill="url(#grad)" />
                  {/* Line */}
                  <path d="M0,250 Q150,180 300,200 Q450,220 600,100 Q750,80 900,40" fill="none" stroke="#C9A84C" strokeWidth="4" strokeLinecap="round" className="animate-draw" />
                  {/* Dots */}
                  <circle cx="300" cy="200" r="6" fill="#C9A84C" className="hover:scale-150 transition-transform" />
                  <circle cx="600" cy="100" r="6" fill="#C9A84C" />
                  <circle cx="900" cy="40" r="8" fill="#C9A84C" />
               </svg>
               <div className="absolute top-10 right-10 p-3 bg-gold text-charcoal rounded-xl shadow-2xl animate-bounce">
                  <p className="text-[9px] font-black uppercase">Current</p>
                  <p className="text-xs font-black">42.5K</p>
               </div>
            </div>
            
            <div className="flex justify-between px-2">
               {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map(m => (
                 <span key={m} className="text-[10px] font-black text-white/20 uppercase tracking-widest">{m}</span>
               ))}
            </div>
         </div>

         {/* Store Health / Conversion */}
         <div className="bg-gold/5 border border-gold/10 p-10 rounded-[3rem] flex flex-col justify-between">
            <div className="space-y-6 text-right">
               <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center text-gold mr-auto lg:mr-0">
                  <Star className="w-8 h-8 fill-current" />
               </div>
               <div className="space-y-2">
                  <h3 className="text-2xl font-black text-white">تقييم المتجر</h3>
                  <div className="flex items-center gap-2 justify-end lg:justify-start">
                     <span className="text-4xl font-black text-gold">4.9</span>
                     <div className="flex gap-1">
                        {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 text-gold fill-current" />)}
                     </div>
                  </div>
                  <p className="text-xs text-white/40 font-medium leading-relaxed">أنت ضمن أفضل 5% من الموردين في فئة "الأقمشة الفاخرة". استمر في الأداء المتميز!</p>
               </div>
            </div>
            
            <div className="pt-8 border-t border-white/5 space-y-4">
               <div className="flex justify-between items-center text-xs">
                  <span className="text-white/40 font-bold uppercase">Store Completion</span>
                  <span className="text-gold font-black">92%</span>
               </div>
               <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gold w-[92%] shadow-[0_0_10px_rgba(201,168,76,0.5)]" />
               </div>
            </div>
         </div>
      </section>

      {/* ─── 4. Orders & Inventory ─── */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         
         {/* Recent Orders List */}
         <div className="bg-[#1A1917] rounded-[3rem] border border-white/5 overflow-hidden">
            <div className="p-8 border-b border-white/5 flex justify-between items-center">
               <h3 className="text-xl font-black text-white flex items-center gap-3">
                  <ShoppingBag className="w-6 h-6 text-gold" /> آخر الطلبات
               </h3>
               <button className="text-[10px] font-black text-gold uppercase tracking-[0.2em] hover:underline">View All Orders</button>
            </div>
            <div className="divide-y divide-white/5">
               {recentOrders.map((order, idx) => (
                 <div key={idx} className="p-8 flex items-center justify-between hover:bg-white/[0.02] transition-colors group">
                    <div className="flex items-center gap-6">
                       <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center font-black text-xs text-white/40 group-hover:text-gold transition-colors">
                          {order.id.split('-')[1]}
                       </div>
                       <div className="space-y-1 text-right">
                          <p className="font-bold text-white group-hover:text-gold transition-colors">{order.buyer}</p>
                          <p className="text-[10px] text-white/30 font-medium tracking-widest uppercase">{order.id} | {order.date}</p>
                       </div>
                    </div>
                    <div className="text-left space-y-2">
                       <p className="text-sm font-black text-white">{order.amount}</p>
                       <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                         order.status === 'In Prep' ? 'bg-gold/10 text-gold border border-gold/20' :
                         order.status === 'Shipped' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-green-500/10 text-green-400 border border-green-500/20'
                       }`}>
                          {order.status}
                       </span>
                    </div>
                 </div>
               ))}
            </div>
         </div>

         {/* Product Performance / Analytics Grid */}
         <div className="bg-[#1A1917] rounded-[3rem] border border-white/5 p-10 space-y-8">
            <div className="flex justify-between items-center">
               <h3 className="text-xl font-black text-white flex items-center gap-3">
                  <BarChart2 className="w-6 h-6 text-burgundy" /> أداء المنتجات
               </h3>
               <button className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Live Insights</button>
            </div>
            
            <div className="space-y-6">
               {topProducts.map((p, i) => (
                 <div key={i} className="space-y-3 text-right">
                    <div className="flex justify-between items-end">
                       <div className="text-right">
                          <p className="text-sm font-bold text-white">{p.name}</p>
                          <p className="text-[10px] text-white/30 font-medium">{p.views.toLocaleString()} Views | {p.sales} Sales</p>
                       </div>
                       <div className="text-green-400 text-xs font-black">{p.growth}</div>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                       <div 
                         className="h-full bg-gradient-to-r from-burgundy to-gold transition-all duration-1000" 
                         style={{ width: `${(p.sales / 50) * 100}%` }} 
                       />
                    </div>
                 </div>
               ))}
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6">
               <div className="p-6 bg-white/5 rounded-[2rem] border border-white/5 text-center space-y-1 group hover:border-gold transition-all">
                  <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Conversion</p>
                  <p className="text-2xl font-black text-white group-hover:text-gold transition-colors">4.2%</p>
               </div>
               <div className="p-6 bg-white/5 rounded-[2rem] border border-white/5 text-center space-y-1 group hover:border-gold transition-all">
                  <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Returns</p>
                  <p className="text-2xl font-black text-white group-hover:text-gold transition-colors">0.8%</p>
               </div>
            </div>
         </div>

      </section>

      {/* ─── 5. Critical Alerts Footer ─── */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="bg-red-500/10 border border-red-500/20 p-8 rounded-[2.5rem] flex items-center gap-6 group hover:bg-red-500/20 transition-all cursor-pointer">
            <div className="w-14 h-14 bg-red-500/20 rounded-2xl flex items-center justify-center text-red-500 animate-pulse">
               <AlertCircle className="w-8 h-8" />
            </div>
            <div className="flex-1 space-y-1 text-right">
               <h4 className="text-sm font-black text-red-400">تنبيه المخزون</h4>
               <p className="text-xs text-red-400/60 font-medium">هناك 3 منتجات وصلت للحد الأدنى للمخزون.</p>
            </div>
            <ChevronRight className="w-5 h-5 text-red-500 group-hover:translate-x-[-4px] transition-transform rtl:rotate-180" />
         </div>

         <div className="bg-gold/10 border border-gold/20 p-8 rounded-[2.5rem] flex items-center gap-6 group hover:bg-gold/20 transition-all cursor-pointer">
            <div className="w-14 h-14 bg-gold/20 rounded-2xl flex items-center justify-center text-gold">
               <Zap className="w-8 h-8" />
            </div>
            <div className="flex-1 space-y-1 text-right">
               <h4 className="text-sm font-black text-gold">مناقصات جديدة</h4>
               <p className="text-xs text-gold/60 font-medium">لديك 5 طلبات عروض أسعار (RFQ) جديدة تطابق منتجاتك.</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gold group-hover:translate-x-[-4px] transition-transform rtl:rotate-180" />
         </div>

         <div className="bg-green-500/10 border border-green-500/20 p-8 rounded-[2.5rem] flex items-center gap-6 group hover:bg-green-500/20 transition-all cursor-pointer">
            <div className="w-14 h-14 bg-green-500/20 rounded-2xl flex items-center justify-center text-green-500">
               <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="flex-1 space-y-1 text-right">
               <h4 className="text-sm font-black text-green-400">التقييمات</h4>
               <p className="text-xs text-green-400/60 font-medium">استلمت 12 تقييماً جديداً بمتوسط 5 نجوم هذا الأسبوع.</p>
            </div>
            <ChevronRight className="w-5 h-5 text-green-500 group-hover:translate-x-[-4px] transition-transform rtl:rotate-180" />
         </div>
      </section>

    </div>
  );
}

function Sparkles({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
      <path d="M5 3v4"></path>
      <path d="M19 17v4"></path>
      <path d="M3 5h4"></path>
      <path d="M17 19h4"></path>
    </svg>
  );
}
