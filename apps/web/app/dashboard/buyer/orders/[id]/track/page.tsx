'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Truck, MapPin, Package, 
  CheckCircle2, Clock, ShieldCheck,
  ChevronRight, ArrowRight, ExternalLink,
  Phone, Smartphone, Info, AlertCircle,
  RotateCcw, Printer, Share2
} from 'lucide-react';

export default function BuyerOrderTrackingPage() {
  
  const orderId = 'ORD-2026-99081';
  const trackingNumber = 'YAL-DZ-4459021';
  const carrier = 'Yalidine Express';
  const expectedDate = '16 ماي 2026';

  const steps = [
    { label: 'تم تأكيد الطلب', date: '14 ماي، 10:00 صباحاً', status: 'completed', icon: <CheckCircle2 /> },
    { label: 'قيد التجهيز في المصنع', date: '14 ماي، 02:45 مساءً', status: 'completed', icon: <Package /> },
    { label: 'تم التسليم لشركة الشحن', date: '15 ماي، 09:30 صباحاً', status: 'current', icon: <Truck /> },
    { label: 'في الطريق إليك', date: 'متوقع غداً', status: 'pending', icon: <Smartphone /> },
    { label: 'تم التوصيل', date: '--', status: 'pending', icon: <CheckCircle2 /> },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-1000 text-right" dir="rtl">
      
      {/* ─── Header ─── */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
         <div className="flex items-center gap-4">
            <Link href="/dashboard/buyer/orders" className="p-3 bg-white/5 rounded-xl hover:bg-gold hover:text-charcoal transition-all">
               <ChevronRight className="w-5 h-5" />
            </Link>
            <div className="space-y-1">
               <h1 className="text-3xl font-black text-white tracking-tight">تتبع الشحنة</h1>
               <p className="text-white/40 font-medium">الطلب <span className="text-white font-black">#{orderId}</span> • عبر {carrier}</p>
            </div>
         </div>
         <div className="flex gap-3">
            <button className="p-4 bg-white/5 rounded-2xl text-white/40 hover:text-white transition-all"><Share2 className="w-5 h-5" /></button>
            <button className="px-8 py-3 bg-white/5 border border-white/10 text-white text-[11px] font-black uppercase tracking-widest rounded-2xl hover:bg-white/10 transition-all flex items-center gap-3">
               <RotateCcw className="w-4 h-4" /> طلب إرجاع
            </button>
         </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         
         {/* ─── Left Column: Timeline ─── */}
         <div className="lg:col-span-8 space-y-10">
            
            {/* Tracking Status Card */}
            <section className="bg-[#1A1917] p-10 rounded-[3rem] border border-white/5 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-white/5 overflow-hidden">
                  <div className="h-full bg-gold w-3/5 animate-pulse" />
               </div>
               
               <div className="flex flex-col md:flex-row justify-between gap-10 mb-16">
                  <div className="space-y-2">
                     <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">رقم التتبع</p>
                     <div className="flex items-center gap-3">
                        <h2 className="text-2xl font-black text-white tracking-tighter">{trackingNumber}</h2>
                        <button className="p-2 bg-white/5 rounded-lg text-gold hover:bg-gold hover:text-charcoal transition-all"><ExternalLink className="w-3 h-3" /></button>
                     </div>
                  </div>
                  <div className="space-y-2 text-right md:text-left">
                     <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">تاريخ الوصول المتوقع</p>
                     <h2 className="text-2xl font-black text-gold tracking-tighter">{expectedDate}</h2>
                  </div>
               </div>

               {/* Visual Vertical Timeline */}
               <div className="relative pr-10 space-y-12">
                  <div className="absolute top-0 bottom-0 right-[2.45rem] w-px bg-white/5" />
                  
                  {steps.map((step, i) => (
                    <div key={i} className="relative flex items-center gap-10 group">
                       <div className={`w-14 h-14 rounded-2xl flex items-center justify-center z-10 transition-all duration-500 border-2 ${
                         step.status === 'completed' ? 'bg-gold border-gold text-charcoal' : 
                         step.status === 'current' ? 'bg-white/5 border-gold text-gold animate-pulse shadow-[0_0_20px_rgba(201,168,76,0.2)]' : 
                         'bg-[#1A1917] border-white/5 text-white/20'
                       }`}>
                          {step.icon}
                       </div>
                       <div className="space-y-1">
                          <h4 className={`text-lg font-black transition-colors ${step.status !== 'pending' ? 'text-white' : 'text-white/20'}`}>{step.label}</h4>
                          <p className="text-xs text-white/40 font-medium">{step.date}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </section>

            {/* Delivery Address & Carrier Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="bg-[#1A1917] p-8 rounded-[2.5rem] border border-white/5 space-y-6">
                  <h3 className="text-lg font-black text-white flex items-center gap-3">
                     <MapPin className="w-5 h-5 text-gold" /> عنوان التوصيل
                  </h3>
                  <div className="space-y-3">
                     <p className="text-sm font-bold text-white/80 leading-relaxed">أحمد العمراني</p>
                     <p className="text-xs text-white/40 leading-relaxed">نهج 05 جويلية، فيلا رقم 12، الدار البيضاء، الجزائر العاصمة.</p>
                     <div className="flex items-center gap-3 text-xs font-black text-gold">
                        <Phone className="w-4 h-4" /> +213 555 44 33 22
                     </div>
                  </div>
               </div>
               
               <div className="bg-[#1A1917] p-8 rounded-[2.5rem] border border-white/5 space-y-6">
                  <h3 className="text-lg font-black text-white flex items-center gap-3">
                     <Truck className="w-5 h-5 text-blue-400" /> شركة الشحن
                  </h3>
                  <div className="space-y-4">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center font-black text-xs text-white/40">YAL</div>
                        <div className="space-y-1">
                           <p className="text-sm font-bold text-white">{carrier}</p>
                           <p className="text-[10px] text-white/30 font-black uppercase tracking-widest">وكالة الدار البيضاء</p>
                        </div>
                     </div>
                     <button className="w-full py-3 bg-white/5 border border-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-white transition-all">تواصل مع الموزع</button>
                  </div>
               </div>
            </div>

         </div>

         {/* ─── Right Column: Security & Help ─── */}
         <div className="lg:col-span-4 space-y-8">
            
            <div className="bg-gold p-8 rounded-[3rem] space-y-6 shadow-2xl shadow-gold/10 relative overflow-hidden group">
               <ShieldCheck className="absolute top-0 left-0 w-32 h-32 text-charcoal/5 -translate-x-1/4 -translate-y-1/4 group-hover:scale-110 transition-transform duration-1000" />
               <div className="w-14 h-14 bg-charcoal rounded-2xl flex items-center justify-center text-gold shadow-lg relative z-10">
                  <ShieldCheck className="w-8 h-8" />
               </div>
               <div className="space-y-3 relative z-10">
                  <h3 className="text-xl font-black text-charcoal">أموالك في أمان</h3>
                  <p className="text-xs text-charcoal/70 font-bold leading-relaxed">نظام Escrow خامة يحتجز المبلغ حتى تؤكد استلام طلبيتك وفحصها. لا تقم بمشاركة رمز الاستلام إلا بعد التأكد من جودة المنتج.</p>
               </div>
               <div className="pt-4 border-t border-charcoal/10 relative z-10">
                  <p className="text-[10px] font-black text-charcoal uppercase tracking-widest">Protected by Khama Guarantee</p>
               </div>
            </div>

            <div className="bg-white/5 border border-white/5 p-8 rounded-[3rem] space-y-6">
               <h3 className="text-lg font-black text-white flex items-center gap-3">
                  <Info className="w-5 h-5 text-white/40" /> هل تحتاج لمساعدة؟
               </h3>
               <div className="space-y-4">
                  <button className="w-full flex items-center justify-between p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all group">
                     <span className="text-xs font-bold text-white/60 group-hover:text-white transition-colors">مشكلة في التوصيل</span>
                     <ChevronRight className="w-4 h-4 text-white/20 rotate-180" />
                  </button>
                  <button className="w-full flex items-center justify-between p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all group">
                     <span className="text-xs font-bold text-white/60 group-hover:text-white transition-colors">سياسة المرتجعات</span>
                     <ChevronRight className="w-4 h-4 text-white/20 rotate-180" />
                  </button>
                  <button className="w-full flex items-center justify-between p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all group">
                     <span className="text-xs font-bold text-white/60 group-hover:text-white transition-colors">التواصل مع المورد</span>
                     <ChevronRight className="w-4 h-4 text-white/20 rotate-180" />
                  </button>
               </div>
            </div>

         </div>

      </div>

    </div>
  );
}
