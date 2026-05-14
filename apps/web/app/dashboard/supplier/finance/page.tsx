'use client';

import React, { useState } from 'react';
import { 
  CreditCard, TrendingUp, Clock, 
  ArrowUpRight, ArrowDownRight, 
  DollarSign, Landmark, Download,
  Filter, Calendar, ExternalLink,
  ShieldCheck, AlertCircle, RefreshCw,
  Wallet, PieChart, BarChart2, Smartphone, CheckCircle2
} from 'lucide-react';

export default function SupplierFinancePage() {
  
  const stats = [
    { label: 'إجمالي المبيعات', value: '1,240,000 دج', change: '+12%', trend: 'up', icon: <TrendingUp />, color: 'text-gold' },
    { label: 'أرباح معلقة (Escrow)', value: '345,000 دج', change: '8 طلبات', trend: 'neutral', icon: <Clock />, color: 'text-blue-400' },
    { label: 'متاح للسحب', value: '850,000 دج', change: 'جاهز الآن', trend: 'up', icon: <Wallet />, color: 'text-green-400' },
    { label: 'إجمالي المسحوبات', value: '45,000 دج', change: 'آخر سحب: أمس', trend: 'down', icon: <Landmark />, color: 'text-purple-400' },
  ];

  const transactions = [
    { id: 'TXN-8821', buyer: 'أحمد العمراني', amount: '+12,400 دج', status: 'In Escrow', date: 'Today, 02:45 PM' },
    { id: 'TXN-8790', buyer: 'متجر التلمساني', amount: '+45,000 دج', status: 'Released', date: 'Yesterday' },
    { id: 'TXN-8755', buyer: 'سارة للمنسوجات', amount: '+2,500 دج', status: 'Completed', date: '12 May 2026' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-1000 text-right" dir="rtl">
      
      {/* ─── Header ─── */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
         <div className="space-y-2">
            <h1 className="text-4xl font-black text-white tracking-tight">المركز المالي</h1>
            <p className="text-white/40 font-medium">إدارة أرباحك، تتبع دفعات Escrow، وطلب السحوبات البنكية.</p>
         </div>
         <div className="flex gap-3">
            <button className="px-6 py-3 bg-white/5 text-white/60 text-[10px] font-black uppercase tracking-widest rounded-xl border border-white/5 hover:text-white transition-all flex items-center gap-3">
               <Download className="w-4 h-4" /> تحميل كشف حساب
            </button>
            <button className="px-8 py-3 bg-gold text-charcoal text-[11px] font-black uppercase tracking-widest rounded-xl shadow-xl shadow-gold/20 hover:scale-105 transition-all flex items-center gap-3">
               <DollarSign className="w-4 h-4" /> طلب سحب أموال
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
               <div className={`flex items-center gap-1 text-[10px] font-black px-3 py-1 rounded-full ${
                 stat.trend === 'up' ? 'bg-green-500/10 text-green-400' : stat.trend === 'down' ? 'bg-red-500/10 text-red-400' : 'bg-white/5 text-white/40'
               }`}>
                  {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : stat.trend === 'down' ? <ArrowDownRight className="w-3 h-3" /> : null}
                  {stat.change}
               </div>
            </div>
            
            <div className="space-y-1">
               <h4 className="text-[11px] font-black text-white/30 uppercase tracking-[0.2em]">{stat.label}</h4>
               <p className="text-2xl font-black text-white tracking-tighter">{stat.value}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ─── Charts & Wallet ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         
         {/* Sales Chart Mockup */}
         <div className="lg:col-span-2 bg-[#1A1917] p-10 rounded-[3rem] border border-white/5 space-y-8 relative overflow-hidden">
            <div className="flex justify-between items-end">
               <div className="space-y-1">
                  <h3 className="text-xl font-black text-white">تحليل الإيرادات</h3>
                  <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold">آخر 6 أشهر من المبيعات</p>
               </div>
               <div className="flex gap-2">
                  <button className="px-3 py-1 bg-gold text-charcoal text-[10px] font-black rounded-lg">شهري</button>
                  <button className="px-3 py-1 bg-white/5 text-white/40 text-[10px] font-black rounded-lg hover:text-white transition-all">أسبوعي</button>
               </div>
            </div>

            {/* SVG Chart Placeholder */}
            <div className="h-64 w-full flex items-end gap-4 px-2">
               {[40, 70, 45, 90, 65, 85].map((h, i) => (
                 <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                    <div className="w-full bg-white/5 rounded-t-2xl relative overflow-hidden flex items-end transition-all duration-500 group-hover:bg-white/10" style={{ height: '100%' }}>
                       <div 
                         className="w-full bg-gradient-to-t from-gold/5 to-gold rounded-t-2xl animate-in slide-in-from-bottom duration-1000 shadow-[0_0_20px_rgba(201,168,76,0.3)]" 
                         style={{ height: `${h}%` }} 
                       />
                       <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full group-hover:translate-y-[-10px] opacity-0 group-hover:opacity-100 transition-all bg-gold text-charcoal text-[9px] font-black px-2 py-1 rounded-md">
                          {h*120}دج
                       </div>
                    </div>
                    <span className="text-[9px] font-black text-white/20 uppercase">M-{i+1}</span>
                 </div>
               ))}
            </div>
         </div>

         {/* Withdrawal Wallet info */}
         <div className="bg-gold/5 border border-gold/10 p-10 rounded-[3rem] flex flex-col justify-between space-y-8 relative overflow-hidden">
            <div className="space-y-6">
               <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black text-white">إعدادات الدفع</h3>
                  <ShieldCheck className="w-6 h-6 text-gold" />
               </div>
               
               <div className="p-6 bg-charcoal/50 rounded-2xl border border-gold/20 space-y-4">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center">
                        <Landmark className="w-5 h-5 text-gold" />
                     </div>
                     <div className="space-y-1">
                        <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">البنك المرتبط</p>
                        <p className="text-xs font-bold text-white">BNA - البنك الوطني الجزائري</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center">
                        <Smartphone className="w-5 h-5 text-gold" />
                     </div>
                     <div className="space-y-1">
                        <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">بريدي موب</p>
                        <p className="text-xs font-bold text-white">RIP: 00799999000123456789</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="space-y-4">
               <div className="flex justify-between items-center text-[10px] font-black text-white/30 uppercase tracking-widest">
                  <span>حد السحب اليومي</span>
                  <span>75% مستخدم</span>
               </div>
               <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gold w-[75%]" />
               </div>
               <button className="w-full py-4 border border-gold/30 text-gold text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-gold hover:text-charcoal transition-all">
                  تغيير بيانات السحب
               </button>
            </div>
         </div>
      </div>

      {/* ─── Transactions List ─── */}
      <section className="bg-[#1A1917] rounded-[3rem] border border-white/5 overflow-hidden">
         <div className="p-8 border-b border-white/5 flex justify-between items-center">
            <h3 className="text-xl font-black text-white flex items-center gap-3">
               <RefreshCw className="w-6 h-6 text-gold" /> آخر المعاملات المالية
            </h3>
            <div className="flex gap-4">
               <button className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl transition-all text-white/40 hover:text-white">
                  <Filter className="w-4 h-4" />
               </button>
               <button className="px-6 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl transition-all text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white">عرض الكل</button>
            </div>
         </div>
         <div className="divide-y divide-white/5">
            {transactions.map((txn, idx) => (
              <div key={idx} className="p-8 flex flex-col md:flex-row items-center justify-between hover:bg-white/[0.01] transition-colors group">
                 <div className="flex items-center gap-8 mb-4 md:mb-0">
                    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center font-black text-xs text-white/20 group-hover:text-gold transition-colors">
                       #{txn.id.split('-')[1]}
                    </div>
                    <div className="space-y-1">
                       <p className="font-bold text-white group-hover:text-gold transition-colors">{txn.buyer}</p>
                       <p className="text-[10px] text-white/30 font-medium tracking-widest uppercase">{txn.id} | {txn.date}</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-10">
                    <div className="text-right space-y-1">
                       <p className="text-sm font-black text-green-400">{txn.amount}</p>
                       <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center gap-2 ${
                         txn.status === 'In Escrow' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 
                         txn.status === 'Released' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 
                         'bg-green-500/10 text-green-400 border border-green-500/20'
                       }`}>
                          {txn.status === 'In Escrow' && <Clock className="w-3 h-3" />}
                          {txn.status === 'Released' && <RefreshCw className="w-3 h-3" />}
                          {txn.status === 'Completed' && <CheckCircle2 className="w-3 h-3" />}
                          {txn.status}
                       </span>
                    </div>
                    <button className="p-4 bg-white/5 rounded-xl text-white/20 hover:text-gold hover:bg-white/10 transition-all">
                       <ExternalLink className="w-5 h-5" />
                    </button>
                 </div>
              </div>
            ))}
         </div>
      </section>

      {/* ─── Safety Warning ─── */}
      <div className="p-8 bg-burgundy/10 border border-burgundy/20 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-6">
         <div className="w-16 h-16 bg-burgundy/20 rounded-2xl flex items-center justify-center text-burgundy shrink-0">
            <AlertCircle className="w-8 h-8" />
         </div>
         <div className="space-y-2 text-center md:text-right">
            <h4 className="text-lg font-black text-white">تذكير بالأمان المالي</h4>
            <p className="text-xs text-white/60 leading-relaxed font-medium">سيتم تحويل الأموال إلى حسابك البنكي تلقائياً بعد مرور 48 ساعة من تأكيد المشتري لاستلام الطلبية. في حال وجود نزاع (Dispute)، سيتم احتجاز المبلغ حتى الفصل فيه من قبل فريق وساطة "خامة".</p>
         </div>
         <button className="px-8 py-3 bg-burgundy text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-all mr-auto">قراءة شروط الضمان</button>
      </div>

    </div>
  );
}
