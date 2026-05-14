'use client';

import React, { useState } from 'react';
import { 
  ShoppingBag, Clock, Package, Truck, 
  CheckCircle2, Search, Filter, Printer, 
  ChevronRight, MoreHorizontal, Calendar,
  User, MapPin, CreditCard, ArrowRight,
  X, ExternalLink, Download
} from 'lucide-react';

// ─── Mock Data ─────────────────────────────────────────────────────────────
const INITIAL_ORDERS = [
  { id: 'ORD-101', buyer: 'أزياء العاصمة', items: 3, amount: 8400, status: 'New', date: '10:30 AM', city: 'الجزائر' },
  { id: 'ORD-102', buyer: 'ورشة الخياطة', items: 1, amount: 2500, status: 'New', date: '09:15 AM', city: 'وهران' },
  { id: 'ORD-103', buyer: 'تجار قسنطينة', items: 12, amount: 45000, status: 'Confirmed', date: 'Yesterday', city: 'قسنطينة' },
  { id: 'ORD-104', buyer: 'نادي رياضي', items: 5, amount: 12000, status: 'Preparing', date: 'Yesterday', city: 'سطيف' },
  { id: 'ORD-105', buyer: 'مركز التوزيع', items: 25, amount: 125000, status: 'Shipped', date: '2 days ago', city: 'الجزائر' },
  { id: 'ORD-106', buyer: 'بوتيك مودرن', items: 2, amount: 6800, status: 'Completed', date: '3 days ago', city: 'باتنة' },
];

const COLUMNS = [
  { id: 'New', label: 'طلبات جديدة', icon: <ShoppingBag className="w-4 h-4" />, color: 'bg-gold' },
  { id: 'Confirmed', label: 'تم التأكيد', icon: <Clock className="w-4 h-4" />, color: 'bg-blue-400' },
  { id: 'Preparing', label: 'قيد التحضير', icon: <Package className="w-4 h-4" />, color: 'bg-amber-400' },
  { id: 'Shipped', label: 'تم الشحن', icon: <Truck className="w-4 h-4" />, color: 'bg-purple-400' },
  { id: 'Completed', label: 'مكتمل', icon: <CheckCircle2 className="w-4 h-4" />, color: 'bg-green-400' },
];

export default function SupplierOrdersPage() {
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const getOrdersByStatus = (status: string) => orders.filter(o => o.status === status);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-1000 text-right" dir="rtl">
      
      {/* ─── Header ─── */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
         <div className="space-y-1">
            <h1 className="text-3xl font-black text-white tracking-tight">إدارة الطلبيات</h1>
            <p className="text-white/40 font-medium">تتبع مسار شحن منتجاتك لعملائك في الجزائر وخارجها.</p>
         </div>
         <div className="flex gap-3">
            <button className="flex items-center gap-2 px-5 py-3 bg-white/5 text-white/60 hover:text-white rounded-xl border border-white/5 transition-all text-xs font-black uppercase tracking-widest">
               <Calendar className="w-4 h-4" /> تصفية بالتاريخ
            </button>
            <button className="flex items-center gap-2 px-5 py-3 bg-white/5 text-white/60 hover:text-white rounded-xl border border-white/5 transition-all text-xs font-black uppercase tracking-widest">
               <Printer className="w-4 h-4" /> طباعة ملخص اليوم
            </button>
         </div>
      </header>

      {/* ─── Kanban Board ─── */}
      <section className="flex gap-6 overflow-x-auto pb-8 no-scrollbar min-h-[70vh]">
         {COLUMNS.map(col => (
           <div key={col.id} className="flex-shrink-0 w-80 space-y-6 group">
              {/* Column Header */}
              <div className="flex items-center justify-between px-2">
                 <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${col.color} text-charcoal`}>
                       {col.icon}
                    </div>
                    <h3 className="text-sm font-black text-white group-hover:text-gold transition-colors">{col.label}</h3>
                    <span className="text-[10px] font-black text-white/20 bg-white/5 px-2 py-0.5 rounded-full">
                       {getOrdersByStatus(col.id).length}
                    </span>
                 </div>
                 <button className="p-1.5 hover:bg-white/5 rounded-lg text-white/20">
                    <MoreHorizontal className="w-4 h-4" />
                 </button>
              </div>

              {/* Cards Container */}
              <div className="space-y-4">
                 {getOrdersByStatus(col.id).map(order => (
                   <div 
                     key={order.id} 
                     onClick={() => setSelectedOrder(order.id)}
                     className="bg-[#1A1917] p-6 rounded-3xl border border-white/5 hover:border-gold/30 transition-all cursor-pointer group/card relative"
                   >
                      <div className="flex justify-between items-start mb-4">
                         <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">{order.id}</span>
                         <span className="text-[10px] font-black text-white/40">{order.date}</span>
                      </div>
                      
                      <div className="space-y-3">
                         <h4 className="text-sm font-bold text-white group-hover/card:text-gold transition-colors">{order.buyer}</h4>
                         <div className="flex items-center gap-2 text-[10px] text-white/40">
                            <MapPin className="w-3 h-3" /> {order.city}
                         </div>
                         
                         <div className="flex justify-between items-end pt-4 border-t border-white/5">
                            <div className="space-y-1">
                               <p className="text-[10px] text-white/20 font-black uppercase tracking-widest">قيمة الطلب</p>
                               <p className="text-sm font-black text-white">{order.amount.toLocaleString()} دج</p>
                            </div>
                            <div className="flex -space-x-2 rtl:space-x-reverse">
                               {[1,2].map(i => (
                                 <div key={i} className="w-8 h-8 rounded-full border-2 border-charcoal bg-white/5" />
                               ))}
                               {order.items > 2 && (
                                 <div className="w-8 h-8 rounded-full border-2 border-charcoal bg-gold/10 text-gold flex items-center justify-center text-[8px] font-black">
                                    +{order.items - 2}
                                 </div>
                               )}
                            </div>
                         </div>
                      </div>

                      {/* Quick Actions Hidden by default */}
                      <div className="absolute inset-x-4 bottom-4 flex gap-2 opacity-0 group-hover/card:opacity-100 transition-all translate-y-2 group-hover/card:translate-y-0">
                         <button className="flex-1 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-[9px] font-black text-white/60 uppercase transition-all">طباعة بوليصة</button>
                         <button className="flex-1 py-2 bg-gold/10 hover:bg-gold rounded-xl text-[9px] font-black text-gold hover:text-charcoal uppercase transition-all">تحديث الحالة</button>
                      </div>
                   </div>
                 ))}

                 {/* Drop Zone / Empty Column */}
                 {getOrdersByStatus(col.id).length === 0 && (
                   <div className="h-32 rounded-3xl border-2 border-dashed border-white/5 flex items-center justify-center text-white/10 text-xs font-bold italic">
                      لا توجد طلبات هنا
                   </div>
                 )}
              </div>
           </div>
         ))}
      </section>

      {/* ─── Order Detail Drawer (Simulated) ─── */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[200] flex items-center justify-end">
           <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedOrder(null)} />
           <div className="relative w-full max-w-2xl h-full bg-[#1A1917] border-r border-white/5 shadow-2xl animate-in slide-in-from-left duration-500 overflow-y-auto no-scrollbar">
              
              {/* Header */}
              <div className="p-10 border-b border-white/5 flex justify-between items-center bg-[#0D0C0A]">
                 <div className="space-y-1">
                    <p className="text-[10px] font-black text-gold uppercase tracking-[0.2em]">تفاصيل الطلبية</p>
                    <h2 className="text-3xl font-black text-white">{selectedOrder}</h2>
                 </div>
                 <button onClick={() => setSelectedOrder(null)} className="p-3 bg-white/5 rounded-2xl hover:bg-red-500 hover:text-white transition-all">
                    <X className="w-6 h-6" />
                 </button>
              </div>

              <div className="p-10 space-y-10">
                 {/* Buyer Info */}
                 <section className="space-y-6">
                    <h3 className="text-xs font-black text-white/30 uppercase tracking-widest border-b border-white/5 pb-4">معلومات العميل</h3>
                    <div className="grid grid-cols-2 gap-8">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-gold"><User /></div>
                          <div>
                             <p className="text-[10px] text-white/30 font-black uppercase">اسم العميل</p>
                             <p className="text-sm font-bold text-white">أزياء العاصمة</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-gold"><MapPin /></div>
                          <div>
                             <p className="text-[10px] text-white/30 font-black uppercase">العنوان</p>
                             <p className="text-sm font-bold text-white">حي الموز، الدار البيضاء، الجزائر</p>
                          </div>
                       </div>
                    </div>
                 </section>

                 {/* Status Progress */}
                 <section className="space-y-6">
                    <h3 className="text-xs font-black text-white/30 uppercase tracking-widest border-b border-white/5 pb-4">تتبع الحالة</h3>
                    <div className="relative flex justify-between">
                       <div className="absolute top-5 inset-x-0 h-0.5 bg-white/5 z-0" />
                       {['New', 'Confirmed', 'Preparing', 'Shipped'].map((s, i) => (
                         <div key={s} className="relative z-10 flex flex-col items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-charcoal ${
                              i < 2 ? 'bg-gold text-charcoal' : 'bg-white/5 text-white/20'
                            }`}>
                               {i < 1 ? <CheckCircle2 className="w-5 h-5" /> : <div className="text-[10px] font-black">{i+1}</div>}
                            </div>
                            <span className={`text-[9px] font-black uppercase ${i < 2 ? 'text-gold' : 'text-white/20'}`}>{s}</span>
                         </div>
                       ))}
                    </div>
                 </section>

                 {/* Products Table */}
                 <section className="space-y-6">
                    <h3 className="text-xs font-black text-white/30 uppercase tracking-widest border-b border-white/5 pb-4">المنتجات (3)</h3>
                    <div className="space-y-4">
                       {[1,2,3].map(i => (
                         <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                            <div className="flex items-center gap-4">
                               <div className="w-12 h-12 bg-white/5 rounded-xl" />
                               <div>
                                  <p className="text-sm font-bold text-white">كتان عضوي بريميوم</p>
                                  <p className="text-[10px] text-white/30">12 متر | رمادي فاتح</p>
                               </div>
                            </div>
                            <p className="text-sm font-black text-white">4,800 دج</p>
                         </div>
                       ))}
                    </div>
                 </section>

                 {/* Payment Summary */}
                 <section className="p-8 bg-gold/5 rounded-3xl border border-gold/10 space-y-4">
                    <div className="flex justify-between items-center text-xs font-bold">
                       <span className="text-white/40">المجموع الفرعي</span>
                       <span className="text-white">8,400 دج</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-bold">
                       <span className="text-white/40">تكلفة الشحن (Yalidine)</span>
                       <span className="text-white">600 دج</span>
                    </div>
                    <div className="h-px bg-white/5 my-2" />
                    <div className="flex justify-between items-center">
                       <span className="text-sm font-black text-gold uppercase tracking-widest">الإجمالي</span>
                       <span className="text-2xl font-black text-white">9,000 دج</span>
                    </div>
                 </section>

                 {/* Actions */}
                 <div className="flex gap-4 pt-6">
                    <button className="flex-1 py-5 bg-gold text-charcoal rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-gold/20 hover:scale-[1.02] transition-all">
                       تحديث إلى "قيد التحضير"
                    </button>
                    <button className="p-5 bg-white/5 rounded-2xl text-white hover:bg-white/10 transition-all">
                       <Printer className="w-6 h-6" />
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}

    </div>
  );
}
