'use client';

import React from 'react';
import { 
  TrendingUp, TrendingDown, Clock, AlertTriangle, 
  ChevronRight, ArrowUpRight, Search, Zap, 
  Filter, Calendar, ExternalLink, Bell
} from 'lucide-react';

export default function BuyerDashboardPage() {
  
  const kpis = [
    { label: 'عروض أسعار مستلمة', value: '12', change: '+3', trend: 'up', sub: 'هذا الأسبوع' },
    { label: 'مناقصات (RFQ) نشطة', value: '5', change: '0', trend: 'neutral', sub: 'قيد المراجعة' },
    { label: 'موردون متصلون', value: '23', change: '+2', trend: 'up', sub: 'قائمة التواصل' },
    { label: 'عينات قيد الشحن', value: '8', change: '-1', trend: 'down', sub: 'في الطريق' },
  ];

  const activities = [
    { type: 'quote', title: 'تم استلام عرض سعر جديد', desc: 'من شركة "نسيج الشرق" لطلب قماش الكتان.', time: 'منذ ساعتين' },
    { type: 'message', title: 'رسالة جديدة من المورد', desc: 'سفيان من مصنع تلمسان يسأل عن مواصفات الوزن.', time: 'منذ 4 ساعات' },
    { type: 'rfq', title: 'انتهت صلاحية مناقصة', desc: 'طلب بوليستر 300 متر - لم يتم اختيار عرض.', time: 'منذ يوم واحد' },
    { type: 'sample', title: 'تم تأكيد إرسال عينة', desc: 'قماش الجاكارد الملكي - رقم التتبع: DZ-889', time: 'منذ يومين' },
  ];

  const alerts = [
    { title: 'مناقصات تقترب من الانتهاء', desc: 'هناك 2 RFQ ستنتهي صلاحيتها خلال 48 ساعة.', type: 'danger' },
    { title: 'مورد جديد مطابق لاهتماماتك', desc: 'مصنع "خيوط المستقبل" أضاف مجموعة كتان عضوي.', type: 'info' },
    { title: 'تحديث سعر القطن العالمي', desc: 'انخفاض بنسبة 3.2% في تداولات هذا الأسبوع.', type: 'warning' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-8 rounded-[32px] border border-border shadow-sm">
         <div className="space-y-1">
            <h1 className="text-3xl font-black text-charcoal">مرحباً، أحمد 👋</h1>
            <p className="text-muted font-medium">إليك ملخص نشاطك التجاري اليوم في سوق خامة.</p>
         </div>
         <div className="flex gap-3">
            <button className="px-6 py-3 bg-gray-50 text-charcoal font-bold rounded-xl border border-border hover:bg-gray-100 transition-all text-sm">
              تحميل التقرير الشهري
            </button>
            <button className="px-6 py-3 bg-accent text-white font-bold rounded-xl shadow-lg shadow-accent/20 hover:scale-105 transition-all text-sm">
              بدء مناقصة جديدة (RFQ)
            </button>
         </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl border border-border shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-4">
               <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-gold/10 transition-colors">
                  <Zap className="w-5 h-5 text-gold" />
               </div>
               <span className={`text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 ${
                 kpi.trend === 'up' ? 'bg-green-50 text-green-600' : 
                 kpi.trend === 'down' ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-muted'
               }`}>
                  {kpi.trend === 'up' && <ArrowUpRight className="w-3 h-3" />}
                  {kpi.change !== '0' && kpi.change}
               </span>
            </div>
            <p className="text-4xl font-black text-charcoal mb-1">{kpi.value}</p>
            <p className="text-xs font-bold text-muted uppercase tracking-wider">{kpi.label}</p>
            <p className="text-[10px] text-muted mt-2">{kpi.sub}</p>
          </div>
        ))}
      </div>

      {/* Activity & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
             <h3 className="text-xl font-black text-charcoal flex items-center gap-2">
                <Clock className="w-5 h-5 text-accent" /> النشاطات الأخيرة
             </h3>
             <div className="flex gap-2">
                <button className="px-3 py-1 bg-white border border-border rounded-lg text-[10px] font-bold text-muted hover:text-accent">الكل</button>
                <button className="px-3 py-1 bg-white border border-border rounded-lg text-[10px] font-bold text-muted hover:text-accent">العروض</button>
             </div>
          </div>
          
          <div className="space-y-4">
             {activities.map((act, idx) => (
               <div key={idx} className="bg-white p-5 rounded-2xl border border-border flex items-start gap-4 hover:border-accent transition-all">
                  <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                    act.type === 'quote' ? 'bg-blue-500' : 
                    act.type === 'message' ? 'bg-green-500' : 
                    act.type === 'rfq' ? 'bg-red-500' : 'bg-gold'
                  }`} />
                  <div className="flex-1 space-y-1">
                     <div className="flex justify-between items-center">
                        <h4 className="font-bold text-sm text-charcoal">{act.title}</h4>
                        <span className="text-[10px] text-muted">{act.time}</span>
                     </div>
                     <p className="text-xs text-muted leading-relaxed">{act.desc}</p>
                  </div>
                  <button className="p-2 text-muted hover:text-accent">
                     <ChevronRight className="w-4 h-4" />
                  </button>
               </div>
             ))}
          </div>

          <button className="w-full py-4 bg-white border border-dashed border-border rounded-2xl text-xs font-bold text-muted hover:text-accent hover:border-accent transition-all">
            عرض كافة النشاطات
          </button>
        </div>

        {/* Alerts & Price Tracker */}
        <div className="space-y-6">
          <h3 className="text-xl font-black text-charcoal flex items-center gap-2">
             <Bell className="w-5 h-5 text-gold" /> تنبيهات ذكية
          </h3>
          
          <div className="space-y-4">
             {alerts.map((alert, idx) => (
               <div key={idx} className={`p-5 rounded-2xl border-r-4 shadow-sm space-y-2 ${
                 alert.type === 'danger' ? 'bg-red-50 border-red-500' :
                 alert.type === 'warning' ? 'bg-amber-50 border-amber-500' : 'bg-blue-50 border-blue-500'
               }`}>
                  <h4 className={`text-xs font-black ${
                    alert.type === 'danger' ? 'text-red-700' :
                    alert.type === 'warning' ? 'text-amber-700' : 'text-blue-700'
                  }`}>{alert.title}</h4>
                  <p className="text-[10px] leading-relaxed text-charcoal/70">{alert.desc}</p>
                  <button className="text-[9px] font-bold underline flex items-center gap-1">
                     اتخاذ إجراء <ExternalLink className="w-2 h-2" />
                  </button>
               </div>
             ))}
          </div>

          {/* Price Tracker Card */}
          <div className="bg-charcoal p-6 rounded-3xl text-white space-y-6 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
                <TrendingUp className="w-20 h-20" />
             </div>
             <div className="space-y-1 relative z-10">
                <p className="text-[10px] font-bold text-gold uppercase tracking-widest">مؤشر السوق</p>
                <h4 className="text-lg font-bold">سعر القطن (Cotton No. 2)</h4>
             </div>
             <div className="flex items-baseline gap-2 relative z-10">
                <span className="text-3xl font-black">78.45</span>
                <span className="text-xs text-red-400 font-bold flex items-center gap-1">
                   <TrendingDown className="w-3 h-3" /> -3.2%
                </span>
             </div>
             <div className="pt-4 border-t border-white/10 relative z-10">
                <p className="text-[9px] text-white/40 leading-relaxed">
                   تحديث تلقائي من مؤشرات البورصة العالمية. قد يؤثر هذا التغيير على أسعار التوريد القادمة.
                </p>
             </div>
          </div>
        </div>

      </div>

      {/* Saved Searches & Comparator Shortcut */}
      <div className="bg-white p-8 rounded-[32px] border border-border shadow-sm space-y-6">
         <div className="flex justify-between items-center">
            <h3 className="text-xl font-black text-charcoal flex items-center gap-2">
               <Search className="w-5 h-5 text-accent" /> أبحاثك المحفوظة
            </h3>
            <button className="text-xs font-bold text-accent hover:underline">إدارة الأبحاث</button>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { query: 'كتان عضوي أبيض', results: '15 نتيجة جديدة', date: 'تحديث اليوم' },
              { query: 'بوليستر ريسايكل 150 GSM', results: '3 نتائج جديدة', date: 'تحديث أمس' },
              { query: 'جاكارد ملكي مطرز', results: '0 نتائج جديدة', date: 'منذ أسبوع' },
            ].map((search, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-accent hover:bg-white transition-all cursor-pointer group">
                 <div className="flex justify-between items-start mb-2">
                    <p className="font-bold text-sm text-charcoal">{search.query}</p>
                    <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-accent transition-colors" />
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-accent">{search.results}</span>
                    <span className="text-[9px] text-muted">{search.date}</span>
                 </div>
              </div>
            ))}
         </div>
      </div>

    </div>
  );
}
