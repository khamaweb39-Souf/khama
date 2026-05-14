'use client';

import React, { useState } from 'react';
import { 
  Truck, Package, MapPin, Printer, 
  ExternalLink, Search, Filter, 
  TrendingUp, Clock, AlertCircle, 
  CheckCircle2, ChevronRight, BarChart3,
  Globe, Settings, Plus, Download,
  ArrowRightLeft, RotateCcw
} from 'lucide-react';

export default function SupplierShippingPage() {
  const [activeTab, setActiveTab] = useState('orders');

  const stats = [
    { label: 'شحنات نشطة', value: '24', sub: 'في الطريق', icon: <Truck />, color: 'text-gold' },
    { label: 'متوسط وقت التوصيل', value: '3.2 أيام', sub: 'تحسن بنسبة 10%', icon: <Clock />, color: 'text-blue-400' },
    { label: 'نسبة المرتجعات', value: '1.5%', sub: 'أقل من المتوسط', icon: <RotateCcw />, color: 'text-red-400' },
    { label: 'مناطق التغطية', value: '58 ولاية', sub: 'تغطية وطنية كاملة', icon: <Globe />, color: 'text-green-400' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-1000 text-right" dir="rtl">
      
      {/* ─── Header ─── */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
         <div className="space-y-2">
            <h1 className="text-4xl font-black text-white tracking-tight">إدارة اللوجستيك والشحن</h1>
            <p className="text-white/40 font-medium">متابعة الشحنات، إدارة شركات التوصيل، ومعالجة المرتجعات.</p>
         </div>
         <div className="flex gap-3">
            <button className="px-6 py-3 bg-white/5 text-white/60 text-[10px] font-black uppercase tracking-widest rounded-xl border border-white/5 hover:text-white transition-all flex items-center gap-3">
               <Settings className="w-4 h-4" /> إعدادات المناطق
            </button>
            <button className="px-8 py-3 bg-gold text-charcoal text-[11px] font-black uppercase tracking-widest rounded-xl shadow-xl shadow-gold/20 hover:scale-105 transition-all flex items-center gap-3">
               <Plus className="w-4 h-4" /> إنشاء شحنة جديدة
            </button>
         </div>
      </header>

      {/* ─── Stats Grid ─── */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-[#1A1917] p-8 rounded-[2.5rem] border border-white/5 hover:border-gold/30 transition-all duration-500 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
            <div className="flex justify-between items-start mb-6">
               <div className={`p-4 bg-white/5 rounded-2xl group-hover:scale-110 transition-transform duration-500 ${stat.color}`}>
                  {stat.icon}
               </div>
            </div>
            <div className="space-y-1">
               <h4 className="text-[11px] font-black text-white/30 uppercase tracking-[0.2em]">{stat.label}</h4>
               <p className="text-2xl font-black text-white tracking-tighter">{stat.value}</p>
               <p className="text-[10px] font-bold text-white/20 uppercase">{stat.sub}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ─── Tabs ─── */}
      <div className="flex bg-white/5 p-1 rounded-2xl w-fit border border-white/5">
         {[
           { id: 'orders', label: 'الشحنات الجارية', count: 24 },
           { id: 'returns', label: 'المرتجعات', count: 3 },
           { id: 'carriers', label: 'شركات الشحن', count: 4 },
           { id: 'zones', label: 'تسعير المناطق', count: 58 },
         ].map(tab => (
           <button 
             key={tab.id}
             onClick={() => setActiveTab(tab.id)}
             className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3 ${activeTab === tab.id ? 'bg-gold text-charcoal shadow-lg' : 'text-white/40 hover:text-white'}`}
           >
              {tab.label}
              <span className={`px-2 py-0.5 rounded-md text-[9px] ${activeTab === tab.id ? 'bg-charcoal/10 text-charcoal' : 'bg-white/5 text-white/20'}`}>{tab.count}</span>
           </button>
         ))}
      </div>

      {/* ─── Content Area ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         
         {/* Main List */}
         <div className="lg:col-span-2 space-y-6">
            
            {activeTab === 'orders' && (
              <div className="bg-[#1A1917] rounded-[3rem] border border-white/5 overflow-hidden">
                 <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
                    <div className="relative flex-1 max-w-md">
                       <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                       <input type="text" placeholder="ابحث برقم التتبع أو العميل..." className="w-full bg-white/5 border border-white/10 rounded-xl p-3 pr-12 text-xs text-white outline-none focus:border-gold/30" />
                    </div>
                    <button className="p-3 bg-white/5 rounded-xl text-white/40 hover:text-white"><Filter className="w-4 h-4" /></button>
                 </div>
                 
                 <div className="divide-y divide-white/5">
                    {[
                      { id: 'SHP-9901', customer: 'أحمد العمراني', carrier: 'Yalidine', status: 'In Transit', date: 'Exp: 16 May', location: 'سطيف' },
                      { id: 'SHP-9855', customer: 'متجر النسيج العربي', carrier: 'EMS', status: 'Preparing', date: 'Exp: 18 May', location: 'وهران' },
                      { id: 'SHP-9840', customer: 'مصنع الأناقة', carrier: 'DHL', status: 'Delivered', date: '12 May', location: 'الجزائر العاصمة' },
                    ].map((shp, idx) => (
                      <div key={idx} className="p-8 flex items-center justify-between hover:bg-white/[0.01] transition-all group">
                         <div className="flex items-center gap-6">
                            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-white/20 group-hover:text-gold transition-colors">
                               <Package className="w-6 h-6" />
                            </div>
                            <div className="space-y-1">
                               <div className="flex items-center gap-2">
                                  <h4 className="font-bold text-white group-hover:text-gold transition-colors">{shp.customer}</h4>
                                  <span className="text-[9px] px-2 py-0.5 bg-white/5 rounded text-white/40 font-black">{shp.carrier}</span>
                               </div>
                               <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">{shp.id} • {shp.location}</p>
                            </div>
                         </div>
                         
                         <div className="flex items-center gap-10">
                            <div className="text-right space-y-1">
                               <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center gap-2 ${
                                 shp.status === 'In Transit' ? 'bg-blue-500/10 text-blue-400' : 
                                 shp.status === 'Preparing' ? 'bg-amber-500/10 text-amber-400' : 
                                 'bg-green-500/10 text-green-400'
                               }`}>
                                  {shp.status}
                               </span>
                               <p className="text-[9px] text-white/20 font-bold">{shp.date}</p>
                            </div>
                            <div className="flex gap-2">
                               <button className="p-3 bg-white/5 rounded-xl text-white/20 hover:text-gold hover:bg-white/10 transition-all shadow-sm" title="طباعة بوليصة الشحن">
                                  <Printer className="w-4 h-4" />
                               </button>
                               <button className="p-3 bg-white/5 rounded-xl text-white/20 hover:text-gold hover:bg-white/10 transition-all shadow-sm">
                                  <ExternalLink className="w-4 h-4" />
                               </button>
                            </div>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
            )}

            {activeTab === 'returns' && (
              <div className="bg-[#1A1917] rounded-[3rem] border border-white/5 p-12 text-center space-y-6">
                 <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center text-red-400 mx-auto">
                    <RotateCcw className="w-10 h-10" />
                 </div>
                 <div className="space-y-2">
                    <h3 className="text-xl font-black text-white">إدارة المرتجعات</h3>
                    <p className="text-sm text-white/40 max-w-sm mx-auto">لديك 3 طلبات إرجاع قيد المراجعة. تأكد من مطابقة سبب الإرجاع لسياسة المنصة قبل الموافقة.</p>
                 </div>
                 <button className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all">
                    عرض كافة المرتجعات
                 </button>
              </div>
            )}

         </div>

         {/* Sidebar Tools */}
         <div className="space-y-8">
            
            {/* Calculator Widget */}
            <div className="bg-gold/5 border border-gold/10 p-8 rounded-[2.5rem] space-y-6">
               <h3 className="text-lg font-black text-white flex items-center gap-3">
                  <BarChart3 className="w-5 h-5 text-gold" /> حاسبة تكلفة الشحن
               </h3>
               <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                     <div className="space-y-2">
                        <label className="text-[9px] font-black text-white/30 uppercase pr-2">الوزن (كغ)</label>
                        <input type="number" defaultValue="5" className="w-full bg-charcoal/50 border border-white/5 rounded-xl p-3 text-xs text-white outline-none focus:border-gold/30" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[9px] font-black text-white/30 uppercase pr-2">المنطقة</label>
                        <select className="w-full bg-charcoal/50 border border-white/5 rounded-xl p-3 text-xs text-white outline-none focus:border-gold/30">
                           <option>الجزائر العاصمة</option>
                           <option>وهران</option>
                           <option>سطيف</option>
                           <option>دولي (EMS)</option>
                        </select>
                     </div>
                  </div>
                  <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                     <p className="text-[10px] font-bold text-white/40">التكلفة التقريبية:</p>
                     <p className="text-lg font-black text-gold">450 دج</p>
                  </div>
               </div>
            </div>

            {/* Carrier Status */}
            <div className="bg-[#1A1917] border border-white/5 p-8 rounded-[2.5rem] space-y-6">
               <h3 className="text-lg font-black text-white flex items-center gap-3">
                  <Globe className="w-5 h-5 text-blue-400" /> حالة الربط مع شركات الشحن
               </h3>
               <div className="space-y-4">
                  {[
                    { name: 'Yalidine Express', status: 'Online', delay: '0ms' },
                    { name: 'EMS Algeria', status: 'Online', delay: '12ms' },
                    { name: 'DHL Global', status: 'Offline', delay: '--' },
                  ].map((c, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-white/[0.02] rounded-2xl border border-white/5">
                       <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${c.status === 'Online' ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-red-500'}`} />
                          <p className="text-xs font-bold text-white/80">{c.name}</p>
                       </div>
                       <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">{c.delay}</span>
                    </div>
                  ))}
               </div>
            </div>

         </div>

      </div>

    </div>
  );
}
