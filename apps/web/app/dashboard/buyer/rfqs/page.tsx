'use client';

import React, { useState } from 'react';
import { 
  FileText, Plus, Search, Filter, 
  ChevronRight, Clock, Users, ArrowUpRight,
  MoreHorizontal, CheckCircle2, AlertCircle,
  BarChart2, Zap, LayoutGrid, List, X, 
  ExternalLink, MessageSquare, ShieldCheck
} from 'lucide-react';

const MOCK_RFQS = [
  { id: 'RFQ-882', category: 'كتان عضوي بريميوم', quantity: '500 متر', date: '12 May 2026', offers: 5, status: 'Active', deadline: '24h left' },
  { id: 'RFQ-879', category: 'حرير طبيعي مطرز', quantity: '100 متر', date: '10 May 2026', offers: 12, status: 'Active', deadline: '3 days left' },
  { id: 'RFQ-845', category: 'بوليستر تقني رياضي', quantity: '2000 متر', date: '01 May 2026', offers: 3, status: 'Closed', deadline: 'Completed' },
];

export default function BuyerRFQsPage() {
  const [activeView, setActiveView] = useState<'grid' | 'list'>('list');
  const [selectedRFQ, setSelectedRFQ] = useState<string | null>(null);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-1000 text-right" dir="rtl">
      
      {/* Header */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
         <div className="space-y-1">
            <h1 className="text-3xl font-black text-white tracking-tight">طلبات العروض (RFQs)</h1>
            <p className="text-white/40 font-medium">أرسل مواصفاتك للموردين وقارن بين أفضل العروض التقنية والمالية.</p>
         </div>
         <div className="flex gap-3">
            <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
               <button onClick={() => setActiveView('list')} className={`p-2 rounded-lg transition-all ${activeView === 'list' ? 'bg-gold text-charcoal' : 'text-white/20 hover:text-white'}`}><List className="w-4 h-4" /></button>
               <button onClick={() => setActiveView('grid')} className={`p-2 rounded-lg transition-all ${activeView === 'grid' ? 'bg-gold text-charcoal' : 'text-white/20 hover:text-white'}`}><LayoutGrid className="w-4 h-4" /></button>
            </div>
            <button className="px-6 py-3 bg-gold text-charcoal text-[11px] font-black uppercase tracking-widest rounded-xl shadow-xl shadow-gold/20 hover:scale-105 transition-all flex items-center gap-3">
               <Plus className="w-4 h-4" /> إنشاء طلب عرض جديد
            </button>
         </div>
      </header>

      {/* Tabs / Filters */}
      <nav className="flex gap-6 border-b border-white/5 pb-4">
         {['الكل', 'نشطة', 'قيد التفاوض', 'مكتملة', 'مسودات'].map((tab, i) => (
           <button key={i} className={`text-xs font-black uppercase tracking-widest transition-all ${i === 0 ? 'text-gold border-b-2 border-gold pb-4' : 'text-white/20 hover:text-white pb-4'}`}>
              {tab}
           </button>
         ))}
      </nav>

      {/* RFQs List */}
      <section className="space-y-4">
         {MOCK_RFQS.map((rfq) => (
           <div key={rfq.id} className="bg-[#1A1917] p-8 rounded-[2.5rem] border border-white/5 hover:border-gold/30 transition-all group relative overflow-hidden">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
                 
                 <div className="flex items-center gap-8 flex-1">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-gold transition-colors duration-500 ${rfq.status === 'Closed' ? 'bg-white/5 text-white/20' : 'bg-gold/10 text-gold'}`}>
                       <FileText className="w-8 h-8" />
                    </div>
                    <div className="space-y-2">
                       <div className="flex items-center gap-3">
                          <h3 className="text-xl font-black text-white group-hover:text-gold transition-colors">{rfq.category}</h3>
                          <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${rfq.status === 'Active' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-white/5 text-white/30 border border-white/10'}`}>
                             {rfq.status}
                          </span>
                       </div>
                       <div className="flex items-center gap-6">
                          <div className="flex items-center gap-2 text-[10px] font-black text-white/30 uppercase tracking-widest">
                             <LayoutGrid className="w-3 h-3" /> الكمية: {rfq.quantity}
                          </div>
                          <div className="flex items-center gap-2 text-[10px] font-black text-white/30 uppercase tracking-widest">
                             <Clock className="w-3 h-3" /> التاريخ: {rfq.date}
                          </div>
                          <div className="flex items-center gap-2 text-[10px] font-black text-amber-400 uppercase tracking-widest">
                             <AlertCircle className="w-3 h-3" /> الموعد: {rfq.deadline}
                          </div>
                       </div>
                    </div>
                 </div>

                 <div className="flex items-center gap-8 lg:pr-8 lg:border-r border-white/5">
                    <div className="text-center space-y-1">
                       <p className="text-2xl font-black text-white">{rfq.offers}</p>
                       <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">عرض مستلم</p>
                    </div>
                    <div className="flex flex-col gap-2">
                       <button 
                         onClick={() => setSelectedRFQ(rfq.id)}
                         className="px-8 py-3 bg-white/5 hover:bg-gold text-white/60 hover:text-charcoal text-[11px] font-black uppercase tracking-widest rounded-xl transition-all flex items-center gap-2"
                       >
                          مقارنة العروض <Zap className="w-3 h-3" />
                       </button>
                       <button className="text-[10px] font-black text-white/20 hover:text-white transition-colors">تعديل المواصفات</button>
                    </div>
                 </div>

              </div>
              
              {/* Offers Preview Avatars */}
              <div className="absolute bottom-6 right-8 flex -space-x-3 rtl:space-x-reverse opacity-40 group-hover:opacity-100 transition-opacity">
                 {[1,2,3].map(i => (
                   <div key={i} className="w-8 h-8 rounded-full border-2 border-[#1A1917] bg-white/10 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i+20}`} alt="Supplier" />
                   </div>
                 ))}
                 {rfq.offers > 3 && (
                   <div className="w-8 h-8 rounded-full border-2 border-[#1A1917] bg-gold/20 flex items-center justify-center text-[8px] font-black text-gold">
                      +{rfq.offers - 3}
                   </div>
                 )}
              </div>
           </div>
         ))}
      </section>

      {/* ─── Offers Comparison Drawer (Simulated) ─── */}
      {selectedRFQ && (
        <div className="fixed inset-0 z-[200] flex items-center justify-end">
           <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setSelectedRFQ(null)} />
           <div className="relative w-full max-w-4xl h-full bg-[#1A1917] border-r border-white/5 shadow-2xl animate-in slide-in-from-left duration-500 overflow-y-auto no-scrollbar">
              
              <div className="p-10 border-b border-white/5 flex justify-between items-center bg-[#0D0C0A]">
                 <div className="space-y-1 text-right">
                    <p className="text-[10px] font-black text-gold uppercase tracking-[0.2em]">مقارنة العروض المستلمة</p>
                    <h2 className="text-3xl font-black text-white">تحليل عروض: {selectedRFQ}</h2>
                 </div>
                 <button onClick={() => setSelectedRFQ(null)} className="p-3 bg-white/5 rounded-2xl hover:bg-red-500 hover:text-white transition-all">
                    <X className="w-6 h-6" />
                 </button>
              </div>

              <div className="p-10 space-y-12 text-right">
                 
                 {/* Comparison Grid */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                      { supplier: 'نسيج الشرق', price: '450 دج', delivery: '5 أيام', score: 9.2, certified: true },
                      { supplier: 'مصنع تلمسان الحديث', price: '420 دج', delivery: '12 يوم', score: 8.5, certified: true },
                    ].map((offer, i) => (
                      <div key={i} className={`p-8 rounded-[3rem] border border-white/5 space-y-8 relative overflow-hidden transition-all hover:border-gold/30 ${i === 0 ? 'bg-gold/5 border-gold/20 shadow-2xl shadow-gold/5' : 'bg-white/[0.02]'}`}>
                         {i === 0 && (
                           <div className="absolute top-6 left-6 px-3 py-1 bg-gold text-charcoal text-[9px] font-black rounded-lg uppercase">أفضل خيار</div>
                         )}
                         
                         <div className="flex items-center gap-6">
                            <div className="w-16 h-16 rounded-2xl bg-white/5 overflow-hidden border border-white/10">
                               <img src={`https://ui-avatars.com/api/?name=${offer.supplier}&background=C9A84C&color=0D0C0A&bold=true`} alt="Logo" />
                            </div>
                            <div className="space-y-1">
                               <h4 className="text-lg font-black text-white">{offer.supplier}</h4>
                               <div className="flex items-center gap-2">
                                  <ShieldCheck className="w-3 h-3 text-gold" />
                                  <span className="text-[9px] font-black text-gold uppercase tracking-widest">مورد موثق</span>
                               </div>
                            </div>
                         </div>

                         <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/5">
                            <div className="space-y-1">
                               <p className="text-[10px] text-white/30 font-black uppercase">السعر / متر</p>
                               <p className="text-xl font-black text-white">{offer.price}</p>
                            </div>
                            <div className="space-y-1">
                               <p className="text-[10px] text-white/30 font-black uppercase">التسليم المتوقع</p>
                               <p className="text-xl font-black text-white">{offer.delivery}</p>
                            </div>
                         </div>

                         <div className="space-y-4">
                            <div className="flex justify-between items-center text-[10px] font-black uppercase text-white/40">
                               <span>تقييم العرض</span>
                               <span>{offer.score}/10</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                               <div className="h-full bg-gold" style={{ width: `${offer.score * 10}%` }} />
                            </div>
                         </div>

                         <div className="flex gap-3">
                            <button className="flex-1 py-4 bg-gold text-charcoal rounded-xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-gold/20">قبول العرض</button>
                            <button className="p-4 bg-white/5 rounded-xl text-white hover:bg-white/10 transition-all"><MessageSquare className="w-5 h-5" /></button>
                         </div>
                      </div>
                    ))}
                 </div>

              </div>
           </div>
        </div>
      )}

    </div>
  );
}
