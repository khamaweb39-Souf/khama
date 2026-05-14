'use client';

import React, { useState } from 'react';
import { 
  CreditCard, FileText, Download, 
  ArrowUpRight, ShoppingBag, ShieldCheck, 
  Clock, CheckCircle2, AlertCircle, 
  Filter, Search, ExternalLink,
  Wallet, RefreshCw, BarChart2
} from 'lucide-react';

export default function BuyerFinancePage() {
  
  const stats = [
    { label: 'إجمالي المشتريات', value: '450,600 دج', sub: 'هذا الشهر', trend: 'up', icon: <ShoppingBag />, color: 'text-gold' },
    { label: 'أموال في الضمان (Escrow)', value: '58,600 دج', sub: '2 طلبات نشطة', trend: 'neutral', icon: <ShieldCheck />, color: 'text-blue-400' },
    { label: 'مسترجع (Refunded)', value: '4,200 دج', sub: 'آخر 30 يوم', trend: 'down', icon: <RefreshCw />, color: 'text-green-400' },
    { label: 'الفواتير الضريبية', value: '12', sub: 'جاهزة للتحميل', trend: 'neutral', icon: <FileText />, color: 'text-purple-400' },
  ];

  const invoices = [
    { id: 'INV-2026-001', order: 'ORD-552', amount: '12,400 دج', date: '14 May 2026', status: 'Paid' },
    { id: 'INV-2026-002', order: 'ORD-548', amount: '45,000 دج', date: '13 May 2026', status: 'Paid' },
    { id: 'INV-2025-099', order: 'ORD-530', amount: '2,500 دج', date: '10 May 2026', status: 'Paid' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-1000 text-right" dir="rtl">
      
      {/* ─── Header ─── */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
         <div className="space-y-2">
            <h1 className="text-4xl font-black text-white tracking-tight">السجل المالي والمحاسبي</h1>
            <p className="text-white/40 font-medium">تتبع مدفوعاتك، تحميل الفواتير الرسمية، ومراقبة أموالك في نظام الضمان.</p>
         </div>
         <div className="flex gap-3">
            <button className="px-8 py-3 bg-white/5 text-white/60 text-[10px] font-black uppercase tracking-widest rounded-xl border border-white/5 hover:text-white transition-all flex items-center gap-3">
               <Download className="w-4 h-4" /> تحميل كشف سنوي
            </button>
         </div>
      </header>

      {/* ─── Stats Grid ─── */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-[#1A1917] p-8 rounded-[2.5rem] border border-white/5 hover:border-gold/30 transition-all duration-500 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-gold/10 transition-all" />
            <div className="flex justify-between items-start mb-6">
               <div className={`p-4 bg-white/5 rounded-2xl group-hover:scale-110 transition-transform duration-500 ${stat.color}`}>
                  {stat.icon}
               </div>
               <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">{stat.sub}</span>
            </div>
            <div className="space-y-1">
               <h4 className="text-[11px] font-black text-white/30 uppercase tracking-[0.2em]">{stat.label}</h4>
               <p className="text-2xl font-black text-white tracking-tighter">{stat.value}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ─── Invoices & Tax Center ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         
         {/* Invoices Table */}
         <div className="lg:col-span-2 bg-[#1A1917] rounded-[3rem] border border-white/5 overflow-hidden">
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
               <h3 className="text-xl font-black text-white">الفواتير الرسمية</h3>
               <div className="flex gap-4">
                  <div className="relative">
                     <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                     <input type="text" placeholder="رقم الفاتورة..." className="bg-white/5 border border-white/10 rounded-xl p-2.5 pr-10 text-[10px] text-white outline-none focus:border-gold/30" />
                  </div>
               </div>
            </div>
            <div className="overflow-x-auto no-scrollbar">
               <table className="w-full text-right border-collapse">
                  <thead>
                     <tr className="border-b border-white/5 bg-white/[0.01]">
                        <th className="p-6 text-[10px] font-black text-white/30 uppercase tracking-widest">رقم الفاتورة</th>
                        <th className="p-6 text-[10px] font-black text-white/30 uppercase tracking-widest">الطلب المرتبط</th>
                        <th className="p-6 text-[10px] font-black text-white/30 uppercase tracking-widest">التاريخ</th>
                        <th className="p-6 text-[10px] font-black text-white/30 uppercase tracking-widest">المبلغ</th>
                        <th className="p-6 text-[10px] font-black text-white/30 uppercase tracking-widest">الحالة</th>
                        <th className="p-6 text-[10px] font-black text-white/30 uppercase tracking-widest text-center">تحميل</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                     {invoices.map((inv) => (
                       <tr key={inv.id} className="hover:bg-white/[0.01] transition-colors group">
                          <td className="p-6">
                             <span className="text-sm font-black text-white">{inv.id}</span>
                          </td>
                          <td className="p-6 text-xs font-bold text-white/40">{inv.order}</td>
                          <td className="p-6 text-xs text-white/40">{inv.date}</td>
                          <td className="p-6 text-sm font-black text-white">{inv.amount}</td>
                          <td className="p-6">
                             <span className="px-3 py-1 bg-green-500/10 text-green-400 text-[9px] font-black rounded-lg uppercase tracking-widest border border-green-500/20">
                                {inv.status}
                             </span>
                          </td>
                          <td className="p-6">
                             <button className="mx-auto w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-white/20 hover:text-gold hover:bg-white/10 transition-all">
                                <Download className="w-4 h-4" />
                             </button>
                          </td>
                       </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>

         {/* Escrow Status Summary for Buyer */}
         <div className="bg-gold/5 border border-gold/10 p-10 rounded-[3rem] flex flex-col justify-between space-y-8">
            <div className="space-y-6">
               <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black text-white">حماية المشتري</h3>
                  <ShieldCheck className="w-6 h-6 text-gold" />
               </div>
               
               <div className="space-y-4">
                  {[
                    { order: 'ORD-552', status: 'Pending Delivery', amount: '12,400 دج' },
                    { order: 'ORD-548', status: 'Shipped', amount: '45,000 دج' },
                  ].map((item, i) => (
                    <div key={i} className="p-5 bg-charcoal/50 rounded-2xl border border-white/5 space-y-3">
                       <div className="flex justify-between items-center">
                          <span className="text-xs font-black text-white">#{item.order}</span>
                          <span className="text-xs font-black text-gold">{item.amount}</span>
                       </div>
                       <div className="flex items-center gap-2">
                          <div className="h-1 flex-1 bg-white/5 rounded-full overflow-hidden">
                             <div className={`h-full bg-gold ${i === 1 ? 'w-2/3' : 'w-1/3'}`} />
                          </div>
                          <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest">{item.status}</span>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="p-6 bg-charcoal rounded-3xl border border-white/5 space-y-4 relative overflow-hidden">
               <AlertCircle className="absolute top-0 right-0 w-16 h-16 text-white/5 -translate-y-1/2 translate-x-1/2" />
               <p className="text-[10px] text-white/60 leading-relaxed font-medium">لا تقم بتحرير الأموال للمورد حتى تتأكد من سلامة وجودة الأقمشة المستلمة. نظام Escrow يحميك تلقائياً.</p>
               <button className="w-full py-4 bg-white/5 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all">
                  سياسة استرداد الأموال
               </button>
            </div>
         </div>
      </div>

    </div>
  );
}
