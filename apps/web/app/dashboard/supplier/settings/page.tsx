'use client';

import React, { useState } from 'react';
import { 
  Store, ShieldCheck, MapPin, CreditCard, 
  Truck, FileText, Globe, Save, Camera,
  Lock, Bell, Users, ChevronRight, Check
} from 'lucide-react';

export default function SupplierSettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'ملف المتجر', icon: <Store className="w-4 h-4" /> },
    { id: 'shipping', label: 'إعدادات الشحن', icon: <Truck className="w-4 h-4" /> },
    { id: 'payment', label: 'الدفع والفوترة', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'security', label: 'الأمان', icon: <Lock className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-1000 text-right" dir="rtl">
      
      {/* Header */}
      <header className="space-y-1">
         <h1 className="text-3xl font-black text-white tracking-tight">إعدادات المتجر</h1>
         <p className="text-white/40 font-medium">قم بتخصيص ظهور متجرك الرقمي وإدارة خيارات الشحن والدفع.</p>
      </header>

      <div className="flex flex-col lg:flex-row gap-10">
         
         {/* Navigation Tabs */}
         <aside className="lg:w-64 space-y-2">
            {tabs.map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 group
                  ${activeTab === tab.id ? 'bg-gold text-charcoal font-black shadow-lg shadow-gold/20' : 'hover:bg-white/5 text-white/40 hover:text-white'}
                `}
              >
                 <div className="flex items-center gap-3">
                    {tab.icon}
                    <span className="text-sm tracking-tight">{tab.label}</span>
                 </div>
                 {activeTab === tab.id && <Check className="w-4 h-4" />}
              </button>
            ))}
         </aside>

         {/* Settings Form Area */}
         <main className="flex-1 space-y-8">
            
            {activeTab === 'profile' && (
              <div className="bg-[#1A1917] rounded-[3rem] border border-white/5 overflow-hidden">
                 <div className="p-10 border-b border-white/5 bg-white/[0.01]">
                    <h3 className="text-xl font-black text-white">معلومات العلامة التجارية</h3>
                 </div>
                 <div className="p-10 space-y-10">
                    
                    {/* Logo Upload */}
                    <div className="flex flex-col md:flex-row items-center gap-8">
                       <div className="relative group cursor-pointer">
                          <div className="w-32 h-32 rounded-3xl bg-white/5 border-2 border-dashed border-white/10 flex items-center justify-center group-hover:border-gold transition-all overflow-hidden">
                             <img src="https://ui-avatars.com/api/?name=Lyon+Textile&background=C9A84C&color=0D0C0A&bold=true" className="w-full h-full object-cover" alt="Logo" />
                             <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Camera className="w-8 h-8 text-white" />
                             </div>
                          </div>
                          <p className="text-[10px] font-black text-center mt-3 text-white/20 uppercase tracking-widest">تغيير الشعار</p>
                       </div>
                       <div className="flex-1 space-y-2 text-center md:text-right">
                          <h4 className="text-white font-bold">اسم المتجر العلني</h4>
                          <p className="text-xs text-white/30 leading-relaxed max-w-md">هذا الاسم سيظهر للعملاء في صفحة الكتالوج والمنتجات. يفضل استخدام الاسم التجاري الرسمي.</p>
                       </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-3">
                          <label className="text-[10px] font-black text-white/30 uppercase tracking-widest">اسم الشركة</label>
                          <input type="text" defaultValue="Tissage de Lyon" className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-sm text-white outline-none focus:border-gold/50 transition-all" />
                       </div>
                       <div className="space-y-3">
                          <label className="text-[10px] font-black text-white/30 uppercase tracking-widest">التخصص الرئيسي</label>
                          <input type="text" defaultValue="الأقمشة الفاخرة والحرير" className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-sm text-white outline-none focus:border-gold/50 transition-all" />
                       </div>
                       <div className="md:col-span-2 space-y-3">
                          <label className="text-[10px] font-black text-white/30 uppercase tracking-widest">وصف المتجر (عن الشركة)</label>
                          <textarea rows={4} className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-sm text-white outline-none focus:border-gold/50 transition-all resize-none" defaultValue="نحن مصنع عريق متخصص في إنتاج أرقى أنواع الحرير والكتان الإيطالي، نجمع بين التراث والحداثة لتوفير خامات استثنائية لصناع الموضة." />
                       </div>
                    </div>

                    <div className="pt-10 border-t border-white/5 flex justify-end">
                       <button className="flex items-center gap-2 px-10 py-4 bg-gold text-charcoal rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-gold/20">
                          <Save className="w-4 h-4" /> حفظ التغييرات
                       </button>
                    </div>
                 </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="bg-[#1A1917] rounded-[3rem] border border-white/5 p-10 space-y-8">
                 <div className="flex justify-between items-center border-b border-white/5 pb-8">
                    <div className="space-y-1">
                       <h3 className="text-xl font-black text-white">إعدادات الشحن والتوصيل</h3>
                       <p className="text-xs text-white/40">تحكم في مناطق التوصيل والأسعار المتفق عليها.</p>
                    </div>
                    <button className="px-5 py-2.5 bg-white/5 text-gold text-[10px] font-black rounded-xl border border-gold/20">إضافة منطقة جديدة</button>
                 </div>
                 
                 <div className="space-y-4">
                    {[
                      { region: 'الجزائر العاصمة', partner: 'Yalidine', price: '600 دج', status: 'Active' },
                      { region: 'وهران / الغرب', partner: 'Kazi Tour', price: '800 دج', status: 'Active' },
                      { region: 'تمنراست / الجنوب', partner: 'Logistics Pro', price: '1500 دج', status: 'Pending' },
                    ].map((ship, i) => (
                      <div key={i} className="p-6 bg-white/[0.02] border border-white/5 rounded-[2rem] flex items-center justify-between group hover:border-gold/30 transition-all">
                         <div className="flex items-center gap-6">
                            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-gold"><Truck className="w-6 h-6" /></div>
                            <div>
                               <p className="text-sm font-bold text-white group-hover:text-gold transition-colors">{ship.region}</p>
                               <p className="text-[10px] text-white/30 font-medium">الشريك: {ship.partner}</p>
                            </div>
                         </div>
                         <div className="text-left space-y-1">
                            <p className="text-sm font-black text-white">{ship.price}</p>
                            <span className={`text-[9px] font-black uppercase tracking-widest ${ship.status === 'Active' ? 'text-green-400' : 'text-amber-400'}`}>{ship.status}</span>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
            )}

         </main>

      </div>

    </div>
  );
}
