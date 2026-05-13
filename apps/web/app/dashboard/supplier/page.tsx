'use client';

import React from 'react';
import { 
  TrendingUp, Users, ShoppingBag, MessageSquare, 
  ArrowUpRight, ArrowDownRight, Package, Calendar,
  ExternalLink, ChevronRight, Zap, Target
} from 'lucide-react';

export default function SupplierDashboardPage() {
  
  const kpis = [
    { label: 'إجمالي المبيعات', value: '42,500 دج', change: '+12.5%', trend: 'up', sub: 'هذا الشهر' },
    { label: 'مشاهدات المتجر', value: '1,280', change: '+24%', trend: 'up', sub: 'آخر 30 يوم' },
    { label: 'طلبات RFQ جديدة', value: '15', change: '+5', trend: 'up', sub: 'فرص تجارية' },
    { label: 'معدل التحويل', value: '3.8%', change: '-0.2%', trend: 'down', sub: 'من المشاهدات' },
  ];

  const recentOrders = [
    { id: '#ORD-992', buyer: 'أزياء العاصمة', amount: '8,400 دج', status: 'قيد التجهيز', date: 'اليوم' },
    { id: '#ORD-988', buyer: 'ورشة الخياطة الجزائرية', amount: '12,000 دج', status: 'تم الشحن', date: 'أمس' },
    { id: '#ORD-985', buyer: 'مركز التوزيع الغربي', amount: '25,500 دج', status: 'مكتمل', date: '2 أيام' },
  ];

  const opportunities = [
    { title: 'مطلوب كتان عضوي 500 متر', buyer: 'شركة تصدير فرنسية', budget: 'عالي', time: 'ينتهي في 12 ساعة' },
    { title: 'بوليستر ريسايكل للرياضة', buyer: 'نادي محلي', budget: 'متوسط', time: 'ينتهي في 2 أيام' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Welcome & Quick Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-8 rounded-[32px] border border-border shadow-sm">
         <div className="space-y-1">
            <h1 className="text-3xl font-black text-charcoal">مرحباً، Tissage de Lyon 👋</h1>
            <p className="text-muted font-medium">متجرك الرقمي يحقق أداءً جيداً اليوم. هناك 5 مناقصات جديدة تطابق منتجاتك.</p>
         </div>
         <div className="flex gap-3">
            <button className="px-6 py-3 bg-gray-50 text-charcoal font-bold rounded-xl border border-border hover:bg-gray-100 transition-all text-sm">
              تقرير المبيعات
            </button>
            <button className="px-6 py-3 bg-burgundy text-white font-bold rounded-xl shadow-lg shadow-burgundy/20 hover:scale-105 transition-all text-sm flex items-center gap-2">
              <PlusCircle className="w-4 h-4" /> إضافة منتج جديد
            </button>
         </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl border border-border shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-4">
               <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-burgundy/10 transition-colors">
                  <Target className="w-5 h-5 text-burgundy" />
               </div>
               <span className={`text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 ${
                 kpi.trend === 'up' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
               }`}>
                  {kpi.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {kpi.change}
               </span>
            </div>
            <p className="text-2xl font-black text-charcoal mb-1 tracking-tight">{kpi.value}</p>
            <p className="text-xs font-bold text-muted uppercase tracking-wider">{kpi.label}</p>
            <p className="text-[10px] text-muted mt-2">{kpi.sub}</p>
          </div>
        ))}
      </div>

      {/* Main Grid: Orders & RFQs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Orders */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
             <h3 className="text-xl font-black text-charcoal flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-burgundy" /> آخر الطلبيات
             </h3>
             <button className="text-xs font-bold text-burgundy hover:underline">عرض الكل</button>
          </div>
          
          <div className="bg-white rounded-[32px] border border-border shadow-sm overflow-hidden">
             <table className="w-full text-right text-sm">
                <thead className="bg-gray-50 border-b border-border">
                   <tr>
                      <th className="p-4 font-bold text-muted uppercase text-[10px]">رقم الطلب</th>
                      <th className="p-4 font-bold text-muted uppercase text-[10px]">المشتري</th>
                      <th className="p-4 font-bold text-muted uppercase text-[10px]">القيمة</th>
                      <th className="p-4 font-bold text-muted uppercase text-[10px]">الحالة</th>
                      <th className="p-4 font-bold text-muted uppercase text-[10px]"></th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-border">
                   {recentOrders.map((order, idx) => (
                     <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                        <td className="p-4 font-black text-charcoal">{order.id}</td>
                        <td className="p-4 text-muted font-medium">{order.buyer}</td>
                        <td className="p-4 font-bold text-charcoal">{order.amount}</td>
                        <td className="p-4">
                           <span className={`px-2 py-1 rounded-lg text-[10px] font-bold ${
                             order.status === 'قيد التجهيز' ? 'bg-amber-50 text-amber-600' :
                             order.status === 'تم الشحن' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'
                           }`}>
                              {order.status}
                           </span>
                        </td>
                        <td className="p-4">
                           <button className="p-2 hover:bg-gray-100 rounded-lg text-muted">
                              <ChevronRight className="w-4 h-4" />
                           </button>
                        </td>
                     </tr>
                   ))}
                </tbody>
             </table>
          </div>
        </div>

        {/* Opportunities (RFQs) */}
        <div className="space-y-6">
           <h3 className="text-xl font-black text-charcoal flex items-center gap-2">
              <Zap className="w-5 h-5 text-gold" /> فرص بيع جديدة
           </h3>
           <div className="space-y-4">
              {opportunities.map((opp, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-border hover:border-gold transition-all group">
                   <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-sm text-charcoal leading-relaxed">{opp.title}</h4>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                        opp.budget === 'عالي' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
                      }`}>ميزانية {opp.budget}</span>
                   </div>
                   <p className="text-[10px] text-muted mb-4">{opp.buyer}</p>
                   <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                      <span className="text-[10px] text-red-500 font-bold flex items-center gap-1">
                         <Clock className="w-3 h-3" /> {opp.time}
                      </span>
                      <button className="text-xs font-bold text-burgundy flex items-center gap-1 group-hover:gap-2 transition-all">
                         قدم عرضك <ArrowUpRight className="w-3 h-3" />
                      </button>
                   </div>
                </div>
              ))}
           </div>

           {/* Inventory Alert */}
           <div className="bg-amber-50 border border-amber-200 p-6 rounded-3xl space-y-4">
              <div className="flex items-center gap-3">
                 <Package className="w-5 h-5 text-amber-600" />
                 <h4 className="font-bold text-sm text-amber-800">تنبيه المخزون</h4>
              </div>
              <p className="text-xs text-amber-700 leading-relaxed">
                 منتج "كتان أبيض بريميوم" وصل للحد الأدنى (10 أمتار). يرجى تحديث المخزون لتجنب خسارة الطلبات.
              </p>
              <button className="w-full py-3 bg-white border border-amber-200 rounded-xl text-xs font-bold text-amber-700 hover:bg-amber-100 transition-all">
                 تحديث المخزون الآن
              </button>
           </div>
        </div>

      </div>

      {/* Analytics Shortcut */}
      <div className="bg-charcoal p-8 rounded-[40px] text-white overflow-hidden relative group cursor-pointer">
         <div className="absolute top-0 right-0 w-64 h-64 bg-burgundy rounded-full -translate-y-1/2 translate-x-1/2 opacity-20 group-hover:scale-110 transition-transform duration-700" />
         <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="space-y-2 text-center md:text-right">
               <h3 className="text-2xl font-black">تحليلات الأداء المتقدمة</h3>
               <p className="text-sm text-white/60 max-w-md">
                 اكتشف المنتجات الأكثر طلباً في السوق الجزائري وقم بتحسين استراتيجية التسعير الخاصة بك.
               </p>
            </div>
            <button className="px-8 py-4 bg-gold text-charcoal font-black rounded-2xl hover:scale-105 transition-all flex items-center gap-2">
               فتح مركز التحليلات <BarChart2 className="w-5 h-5" />
            </button>
         </div>
      </div>

    </div>
  );
}
