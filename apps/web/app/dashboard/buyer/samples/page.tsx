'use client';

import React, { useState } from 'react';
import { 
  Truck, Star, Search, Filter, 
  ChevronRight, MapPin, Package, 
  ExternalLink, CheckCircle2, Clock, 
  AlertCircle, MessageSquare, Plus,
  LayoutGrid, List, X, ShieldCheck,
  RefreshCw, MousePointer2
} from 'lucide-react';

const MOCK_SAMPLES = [
  { id: 'SMP-101', name: 'كتان مغسول إيطالي', supplier: 'نسيج الشرق', date: '14 May 2026', status: 'In Transit', tracker: 'DZ-8821', rating: null },
  { id: 'SMP-098', name: 'ساتان لامع سهرة', supplier: 'مصنع تلمسان الحديث', date: '10 May 2026', status: 'Delivered', tracker: 'DZ-7761', rating: 4.8 },
  { id: 'SMP-095', name: 'بوليستر تقني رياضي', supplier: 'تجار قسنطينة', date: '05 May 2026', status: 'Evaluated', tracker: 'DZ-6652', rating: 3.5 },
];

export default function BuyerSamplesPage() {
  const [selectedSample, setSelectedSample] = useState<string | null>(null);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-1000 text-right" dir="rtl">
      
      {/* Header */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
         <div className="space-y-1">
            <h1 className="text-3xl font-black text-white tracking-tight">عيناتي</h1>
            <p className="text-white/40 font-medium">تتبع جودة الخامات قبل الاعتماد النهائي. اطلب عيناتك وقيمها هنا.</p>
         </div>
         <div className="flex gap-3">
            <button className="px-6 py-3 bg-white/5 text-white/60 text-[10px] font-black uppercase tracking-widest rounded-xl border border-white/5 hover:text-white transition-all flex items-center gap-2">
               <RefreshCw className="w-4 h-4" /> تحديث الحالات
            </button>
            <button className="px-6 py-3 bg-gold text-charcoal text-[11px] font-black uppercase tracking-widest rounded-xl shadow-xl shadow-gold/20 hover:scale-105 transition-all flex items-center gap-2">
               <Plus className="w-4 h-4" /> طلب عينة جديدة
            </button>
         </div>
      </header>

      {/* Grid of Samples */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         {MOCK_SAMPLES.map((sample) => (
           <div key={sample.id} className="group bg-[#1A1917] rounded-[3rem] border border-white/5 hover:border-gold/30 transition-all duration-500 overflow-hidden relative">
              
              {/* Image / Status Overlay */}
              <div className="h-48 bg-white/5 relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1A1917]" />
                 <div className="absolute top-6 right-6">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                      sample.status === 'In Transit' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                      sample.status === 'Delivered' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-green-500/10 text-green-400 border-green-500/20'
                    }`}>
                       {sample.status}
                    </span>
                 </div>
                 {sample.tracker && (
                   <div className="absolute bottom-6 right-8 flex items-center gap-2 text-[10px] font-black text-white/40 uppercase tracking-widest">
                      <Truck className="w-4 h-4 text-gold" /> {sample.tracker}
                   </div>
                 )}
              </div>

              {/* Content */}
              <div className="p-10 space-y-6">
                 <div className="space-y-1">
                    <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">{sample.id}</p>
                    <h3 className="text-xl font-black text-white group-hover:text-gold transition-colors">{sample.name}</h3>
                    <p className="text-xs text-white/40 font-medium">المورد: {sample.supplier}</p>
                 </div>

                 {sample.rating ? (
                   <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                         {[1,2,3,4,5].map(i => (
                           <Star key={i} className={`w-3 h-3 ${i <= Math.floor(sample.rating!) ? 'text-gold fill-current' : 'text-white/10'}`} />
                         ))}
                      </div>
                      <span className="text-[10px] font-black text-gold uppercase tracking-widest">{sample.rating}</span>
                   </div>
                 ) : (
                   <button className="w-full py-3 bg-white/5 border border-white/5 rounded-xl text-[10px] font-black text-white/40 uppercase tracking-widest hover:bg-gold hover:text-charcoal transition-all">
                      تقييم العينة المستلمة
                   </button>
                 )}

                 <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                    <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">{sample.date}</span>
                    <button onClick={() => setSelectedSample(sample.id)} className="p-2 bg-white/5 rounded-lg text-gold hover:bg-gold hover:text-charcoal transition-all">
                       <ArrowRight className="w-4 h-4" />
                    </button>
                 </div>
              </div>

              {/* Hover Glow */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gold/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
           </div>
         ))}

         {/* Request More Card */}
         <div className="bg-dashed border-2 border-dashed border-white/10 rounded-[3rem] p-10 flex flex-col items-center justify-center text-center space-y-6 group hover:border-gold/30 transition-all cursor-pointer">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center text-white/20 group-hover:text-gold transition-colors">
               <Package className="w-10 h-10" />
            </div>
            <div className="space-y-2">
               <h4 className="text-lg font-black text-white/40 group-hover:text-white transition-colors">اطلب عينة جديدة</h4>
               <p className="text-[10px] text-white/20 font-medium max-w-[180px]">يمكنك طلب ما يصل إلى 10 عينات مجانية شهرياً بحسب باقتك.</p>
            </div>
         </div>
      </section>

      {/* ─── Sample Evaluation Detail (Simulated) ─── */}
      {selectedSample && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
           <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setSelectedSample(null)} />
           <div className="relative w-full max-w-2xl bg-[#1A1917] rounded-[3rem] border border-white/10 shadow-2xl animate-in zoom-in duration-500 overflow-hidden">
              
              <div className="p-10 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
                 <div className="space-y-1">
                    <p className="text-[10px] font-black text-gold uppercase tracking-[0.2em]">تقييم الجودة</p>
                    <h2 className="text-2xl font-black text-white">عينة: {selectedSample}</h2>
                 </div>
                 <button onClick={() => setSelectedSample(null)} className="p-3 bg-white/5 rounded-2xl hover:bg-red-500 hover:text-white transition-all">
                    <X className="w-6 h-6" />
                 </button>
              </div>

              <div className="p-12 space-y-10">
                 <div className="grid grid-cols-2 gap-8">
                    {[
                      { label: 'نعومة الملمس', score: 4 },
                      { label: 'ثبات اللون', score: 5 },
                      { label: 'الوزن (GSM)', score: 3 },
                      { label: 'المطابقة للمواصفات', score: 4 },
                    ].map((crit, idx) => (
                      <div key={idx} className="space-y-4">
                         <div className="flex justify-between items-center">
                            <span className="text-[11px] font-black text-white/40 uppercase">{crit.label}</span>
                            <span className="text-gold text-xs font-black">{crit.score}/5</span>
                         </div>
                         <div className="flex gap-2">
                            {[1,2,3,4,5].map(i => (
                              <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= crit.score ? 'bg-gold' : 'bg-white/5'}`} />
                            ))}
                         </div>
                      </div>
                    ))}
                 </div>

                 <div className="space-y-4">
                    <label className="text-[11px] font-black text-white/40 uppercase tracking-widest">ملاحظات تقنية إضافية</label>
                    <textarea 
                      rows={4} 
                      placeholder="صف تجربتك مع الخامة، هل هناك عيوب في النسج؟"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-sm text-white outline-none focus:border-gold transition-all resize-none"
                    />
                 </div>

                 <button className="w-full py-5 bg-gold text-charcoal rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-gold/20 hover:scale-[1.02] transition-all">
                    اعتماد التقييم وحفظه
                 </button>
              </div>
           </div>
        </div>
      )}

    </div>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 12h14"></path>
      <path d="m12 5 7 7-7 7"></path>
    </svg>
  );
}
