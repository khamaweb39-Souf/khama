'use client';

import React, { useState } from 'react';
import { 
  Package, Search, Filter, ChevronRight, 
  Truck, CheckCircle2, Clock, MapPin, 
  MoreHorizontal, Printer, RefreshCw, X,
  ExternalLink, Download, FileText
} from 'lucide-react';

const INITIAL_ORDERS = [
  { id: 'ORD-552', supplier: 'نسيج الشرق', items: 3, amount: '12,400 دج', status: 'Preparing', date: '14 May 2026', type: 'Normal' },
  { id: 'ORD-548', supplier: 'مصنع تلمسان الحديث', items: 12, amount: '45,000 دج', status: 'Shipped', date: '13 May 2026', type: 'Bulk' },
  { id: 'ORD-530', supplier: 'حرير باتنة الفاخر', items: 1, amount: '2,500 دج', status: 'Completed', date: '10 May 2026', type: 'Normal' },
];

export default function BuyerOrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-1000 text-right" dir="rtl">
      
      {/* Header */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
         <div className="space-y-1">
            <h1 className="text-3xl font-black text-white tracking-tight">طلباتي</h1>
            <p className="text-white/40 font-medium">تتبع حالة مشترياتك وطلباتك الجارية والمكتملة.</p>
         </div>
         <div className="flex gap-3">
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-xl focus-within:border-gold transition-all">
               <Search className="w-4 h-4 text-white/30" />
               <input type="text" placeholder="بحث برقم الطلب أو المورد..." className="bg-transparent border-none outline-none text-xs text-white placeholder:text-white/20 w-48" />
            </div>
            <button className="p-3 bg-white/5 border border-white/5 rounded-xl text-white/40 hover:text-white transition-all">
               <Filter className="w-5 h-5" />
            </button>
         </div>
      </header>

      {/* Orders List */}
      <section className="bg-[#1A1917] rounded-[3rem] border border-white/5 overflow-hidden">
         <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-right border-collapse">
               <thead>
                  <tr className="border-b border-white/5 bg-white/[0.01]">
                     <th className="p-6 text-[10px] font-black text-white/30 uppercase tracking-widest">رقم الطلب</th>
                     <th className="p-6 text-[10px] font-black text-white/30 uppercase tracking-widest">المورد</th>
                     <th className="p-6 text-[10px] font-black text-white/30 uppercase tracking-widest">التاريخ</th>
                     <th className="p-6 text-[10px] font-black text-white/30 uppercase tracking-widest">القيمة</th>
                     <th className="p-6 text-[10px] font-black text-white/30 uppercase tracking-widest">الحالة</th>
                     <th className="p-6 text-[10px] font-black text-white/30 uppercase tracking-widest text-center">الإجراءات</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                  {INITIAL_ORDERS.map((order) => (
                    <tr key={order.id} className="hover:bg-white/[0.02] transition-colors group">
                       <td className="p-6">
                          <span className="text-sm font-black text-white">{order.id}</span>
                       </td>
                       <td className="p-6">
                          <p className="text-sm font-bold text-white group-hover:text-gold transition-colors">{order.supplier}</p>
                          <span className="text-[10px] text-white/30 font-black uppercase tracking-widest">{order.type} Order</span>
                       </td>
                       <td className="p-6">
                          <span className="text-xs text-white/40">{order.date}</span>
                       </td>
                       <td className="p-6">
                          <span className="text-sm font-black text-white">{order.amount}</span>
                       </td>
                       <td className="p-6">
                          <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 w-fit ${
                            order.status === 'Preparing' ? 'bg-gold/10 text-gold border border-gold/20' :
                            order.status === 'Shipped' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-green-500/10 text-green-400 border border-green-500/20'
                          }`}>
                             {order.status === 'Preparing' && <Clock className="w-3 h-3" />}
                             {order.status === 'Shipped' && <Truck className="w-3 h-3" />}
                             {order.status === 'Completed' && <CheckCircle2 className="w-3 h-3" />}
                             {order.status}
                          </span>
                       </td>
                       <td className="p-6 text-center">
                          <div className="flex items-center justify-center gap-2">
                             <button 
                               onClick={() => setSelectedOrder(order.id)}
                               className="px-4 py-2 bg-white/5 hover:bg-gold text-white/40 hover:text-charcoal text-[10px] font-black rounded-lg transition-all"
                             >
                                التفاصيل
                             </button>
                             <button className="p-2 hover:bg-white/5 rounded-lg text-white/20">
                                <MoreHorizontal className="w-4 h-4" />
                             </button>
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </section>

      {/* ─── Order Detail Drawer (Simulated) ─── */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[200] flex items-center justify-end">
           <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setSelectedOrder(null)} />
           <div className="relative w-full max-w-2xl h-full bg-[#1A1917] border-r border-white/5 shadow-2xl animate-in slide-in-from-left duration-500 overflow-y-auto no-scrollbar">
              
              {/* Header */}
              <div className="p-10 border-b border-white/5 flex justify-between items-center bg-[#0D0C0A]">
                 <div className="space-y-1 text-right">
                    <p className="text-[10px] font-black text-gold uppercase tracking-[0.2em]">تفاصيل المشتريات</p>
                    <h2 className="text-3xl font-black text-white">{selectedOrder}</h2>
                 </div>
                 <button onClick={() => setSelectedOrder(null)} className="p-3 bg-white/5 rounded-2xl hover:bg-red-500 hover:text-white transition-all">
                    <X className="w-6 h-6" />
                 </button>
              </div>

              <div className="p-10 space-y-12 text-right">
                 {/* Visual Timeline */}
                 <section className="space-y-8">
                    <h3 className="text-xs font-black text-white/30 uppercase tracking-widest border-b border-white/5 pb-4">تتبع الطلب</h3>
                    <div className="relative flex flex-col gap-8 pr-6">
                       <div className="absolute top-0 bottom-0 right-3 w-px bg-white/5" />
                       {[
                         { status: 'تم استلام الطلب', date: '14 May, 09:00 AM', active: true, done: true },
                         { status: 'قيد التحضير في المستودع', date: '14 May, 02:00 PM', active: true, done: false },
                         { status: 'تم التسليم لشركة الشحن', date: 'Expected Tomorrow', active: false, done: false },
                         { status: 'تم الاستلام', date: '---', active: false, done: false },
                       ].map((step, i) => (
                         <div key={i} className="relative flex items-center gap-6">
                            <div className={`w-6 h-6 rounded-full border-4 border-[#1A1917] relative z-10 ${
                              step.done ? 'bg-green-500' : step.active ? 'bg-gold animate-pulse' : 'bg-white/5'
                            }`} />
                            <div>
                               <p className={`text-sm font-bold ${step.active ? 'text-white' : 'text-white/20'}`}>{step.status}</p>
                               <p className="text-[10px] text-white/30 font-medium">{step.date}</p>
                            </div>
                         </div>
                       ))}
                    </div>
                 </section>

                 {/* Products Summary */}
                 <section className="space-y-6">
                    <h3 className="text-xs font-black text-white/30 uppercase tracking-widest border-b border-white/5 pb-4">المنتجات</h3>
                    <div className="space-y-4">
                       {[1,2].map(i => (
                         <div key={i} className="flex items-center justify-between p-5 bg-white/5 rounded-3xl border border-white/5">
                            <div className="flex items-center gap-5">
                               <div className="w-16 h-16 bg-white/10 rounded-2xl" />
                               <div className="space-y-1">
                                  <p className="text-sm font-bold text-white">كتان عضوي أبيض</p>
                                  <p className="text-[10px] text-white/40 font-medium">15 متر | الوزن: 220 GSM</p>
                               </div>
                            </div>
                            <p className="text-sm font-black text-white">4,200 دج</p>
                         </div>
                       ))}
                    </div>
                 </section>

                 {/* Actions Footer */}
                 <div className="flex gap-4 pt-6">
                    <button className="flex-1 py-5 bg-gold text-charcoal rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-gold/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-3">
                       <RefreshCw className="w-4 h-4" /> إعادة الطلب بنقرة واحدة
                    </button>
                    <button className="p-5 bg-white/5 rounded-2xl text-white hover:bg-white/10 transition-all border border-white/10">
                       <Download className="w-6 h-6" />
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}

    </div>
  );
}
