'use client';

import React from 'react';
import Link from 'next/link';
import { 
  CheckCircle2, ShoppingBag, FileText, 
  Download, ArrowRight, Share2, 
  Truck, ShieldCheck, CreditCard,
  ChevronLeft, Smartphone, Clock
} from 'lucide-react';

export default function OrderSuccessPage() {
  
  const orderId = 'ORD-2026-99081';
  const total = '58,600 دج';

  return (
    <div className="min-h-screen bg-[#0D0C0A] text-white flex flex-col items-center justify-center p-6 text-right" dir="rtl">
      
      {/* ─── Success Animation & Header ─── */}
      <div className="space-y-8 max-w-2xl w-full text-center">
         <div className="relative inline-block">
            <div className="w-32 h-32 bg-gold/10 rounded-[3rem] flex items-center justify-center animate-in zoom-in duration-1000">
               <CheckCircle2 className="w-16 h-16 text-gold" />
            </div>
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-gold text-charcoal rounded-2xl flex items-center justify-center shadow-2xl animate-bounce">
               <ShieldCheck className="w-6 h-6" />
            </div>
         </div>

         <div className="space-y-3">
            <h1 className="text-4xl font-black tracking-tight">تم استلام طلبك بنجاح!</h1>
            <p className="text-white/40 font-medium text-lg">شكراً لثقتك في خامة. طلبك رقم <span className="text-white font-black">#{orderId}</span> قيد المعالجة الآن.</p>
         </div>
      </div>

      {/* ─── Escrow Timeline ─── */}
      <div className="mt-16 w-full max-w-4xl bg-[#1A1917] p-10 rounded-[3rem] border border-white/5 space-y-12">
         <div className="flex justify-between items-center border-b border-white/5 pb-6">
            <h3 className="text-xl font-black text-white flex items-center gap-3">
               <ShieldCheck className="w-6 h-6 text-gold" /> نظام حماية المشتري (Escrow)
            </h3>
            <span className="text-[10px] font-black text-gold uppercase tracking-[0.2em] px-4 py-2 bg-gold/5 rounded-full border border-gold/20">Active Protection</span>
         </div>

         <div className="relative px-6">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-white/5 -translate-y-1/2 hidden md:block" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
               {[
                 { label: 'تم الدفع', status: 'Completed', icon: <CreditCard />, desc: 'الأموال محتجزة بأمان', current: false, done: true },
                 { label: 'قيد التحضير', status: 'In Progress', icon: <Clock />, desc: 'المورد يجهز طلبيتك', current: true, done: false },
                 { label: 'تم الشحن', status: 'Pending', icon: <Truck />, desc: 'تتبع الشحنة لحظياً', current: false, done: false },
                 { label: 'تم الاستلام', status: 'Final Step', icon: <CheckCircle2 />, desc: 'تحرير الأموال للمورد', current: false, done: false },
               ].map((step, i) => (
                 <div key={i} className="flex flex-col items-center text-center space-y-4">
                    <div className={`w-16 h-16 rounded-[2rem] flex items-center justify-center transition-all duration-500 border-2 ${
                      step.done ? 'bg-gold border-gold text-charcoal shadow-xl shadow-gold/20' : 
                      step.current ? 'bg-white/5 border-gold animate-pulse text-gold' : 'bg-white/5 border-white/5 text-white/20'
                    }`}>
                       {step.icon}
                    </div>
                    <div className="space-y-1">
                       <p className={`text-xs font-black ${step.done || step.current ? 'text-white' : 'text-white/20'}`}>{step.label}</p>
                       <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest">{step.desc}</p>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </div>

      {/* ─── Actions Grid ─── */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
         
         <div className="bg-white/5 border border-white/5 p-8 rounded-[2.5rem] flex items-center justify-between group hover:bg-white/10 transition-all">
            <div className="flex items-center gap-6">
               <div className="w-14 h-14 bg-gold/10 rounded-2xl flex items-center justify-center text-gold">
                  <FileText className="w-6 h-6" />
               </div>
               <div className="space-y-1 text-right">
                  <p className="text-sm font-black text-white">فاتورة الطلب #{orderId}</p>
                  <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">تلقائية • PDF • Khama Style</p>
               </div>
            </div>
            <button className="p-4 bg-gold text-charcoal rounded-xl shadow-lg hover:scale-110 transition-all">
               <Download className="w-5 h-5" />
            </button>
         </div>

         <div className="bg-white/5 border border-white/5 p-8 rounded-[2.5rem] flex items-center justify-between group hover:bg-white/10 transition-all">
            <div className="flex items-center gap-6">
               <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-400">
                  <Smartphone className="w-6 h-6" />
               </div>
               <div className="space-y-1 text-right">
                  <p className="text-sm font-black text-white">تحميل تطبيق خامة</p>
                  <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">تتبع طلبك من هاتفك</p>
               </div>
            </div>
            <button className="p-4 bg-purple-500 text-white rounded-xl shadow-lg hover:scale-110 transition-all">
               <Share2 className="w-5 h-5" />
            </button>
         </div>

      </div>

      {/* ─── Footer Buttons ─── */}
      <div className="mt-16 flex flex-col md:flex-row gap-6">
         <Link 
           href="/dashboard/buyer/orders" 
           className="px-10 py-4 bg-gold text-charcoal text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl shadow-2xl shadow-gold/20 hover:scale-105 transition-all flex items-center gap-3"
         >
            تتبع الطلبية الآن <Truck className="w-4 h-4" />
         </Link>
         <Link 
           href="/dashboard/buyer" 
           className="px-10 py-4 bg-white/5 text-white/60 text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl border border-white/10 hover:text-white transition-all flex items-center gap-3"
         >
            <ChevronLeft className="w-4 h-4" /> العودة للوحة التحكم
         </Link>
      </div>

    </div>
  );
}
