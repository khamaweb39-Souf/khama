'use client';

import React, { useState } from 'react';
import { 
  Building, MapPin, Bell, Globe, 
  CreditCard, Shield, User, Camera, 
  Plus, Save, CheckCircle2, ChevronRight,
  ShieldCheck, Smartphone, Mail, Lock
} from 'lucide-react';

export default function BuyerSettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'ملف المشتري', icon: <User className="w-4 h-4" /> },
    { id: 'addresses', label: 'عناوين الشحن', icon: <MapPin className="w-4 h-4" /> },
    { id: 'security', label: 'الأمان والخصوصية', icon: <Lock className="w-4 h-4" /> },
    { id: 'notifications', label: 'الإشعارات', icon: <Bell className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-1000 text-right" dir="rtl">
      
      {/* Header */}
      <header className="space-y-1">
         <h1 className="text-3xl font-black text-white tracking-tight">إعدادات الحساب المتقدمة</h1>
         <p className="text-white/40 font-medium">إدارة معلومات شركتك، مواقع الاستلام، وتفضيلات النظام.</p>
      </header>

      <div className="flex flex-col lg:flex-row gap-10">
         
         {/* Navigation Sidebar */}
         <aside className="lg:w-72 space-y-2">
            {tabs.map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 group
                  ${activeTab === tab.id ? 'bg-gold text-charcoal font-black shadow-xl shadow-gold/20' : 'hover:bg-white/5 text-white/40 hover:text-white'}
                `}
              >
                 <div className="flex items-center gap-4">
                    {tab.icon}
                    <span className="text-xs tracking-tight uppercase">{tab.label}</span>
                 </div>
                 {activeTab === tab.id && <ChevronRight className="w-4 h-4 rotate-180" />}
              </button>
            ))}
         </aside>

         {/* Content Area */}
         <main className="flex-1 space-y-8">
            
            {activeTab === 'profile' && (
              <div className="bg-[#1A1917] rounded-[3rem] border border-white/5 overflow-hidden">
                 <div className="p-10 border-b border-white/5 bg-white/[0.01]">
                    <h3 className="text-xl font-black text-white">معلومات الشركة والمشتري</h3>
                 </div>
                 <div className="p-10 space-y-12">
                    {/* Profile Header */}
                    <div className="flex flex-col md:flex-row items-center gap-10">
                       <div className="relative group cursor-pointer">
                          <div className="w-32 h-32 rounded-[2.5rem] bg-white/5 border-2 border-dashed border-white/10 flex items-center justify-center group-hover:border-gold transition-all overflow-hidden relative">
                             <img src="https://ui-avatars.com/api/?name=Ahmed+Omrani&background=C9A84C&color=0D0C0A&bold=true" className="w-full h-full object-cover" alt="User" />
                             <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Camera className="w-8 h-8 text-white" />
                             </div>
                          </div>
                          <p className="text-[10px] font-black text-center mt-3 text-white/20 uppercase tracking-widest">تغيير الصورة</p>
                       </div>
                       <div className="space-y-4 text-center md:text-right flex-1">
                          <div className="flex items-center justify-center md:justify-start gap-3">
                             <h4 className="text-2xl font-black text-white tracking-tight">أحمد العمراني</h4>
                             <ShieldCheck className="w-5 h-5 text-gold" />
                          </div>
                          <p className="text-xs text-white/30 leading-relaxed max-w-md font-medium uppercase tracking-widest">مدير مشتريات نسيجية في "شركة الأناقة للمنسوجات"</p>
                       </div>
                    </div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-3">
                          <label className="text-[10px] font-black text-white/30 uppercase tracking-widest pr-4">اسم الشركة</label>
                          <input type="text" defaultValue="شركة الأناقة للمنسوجات" className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-sm text-white outline-none focus:border-gold/50 transition-all" />
                       </div>
                       <div className="space-y-3">
                          <label className="text-[10px] font-black text-white/30 uppercase tracking-widest pr-4">رقم السجل التجاري</label>
                          <input type="text" defaultValue="RC-2026-9908" className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-sm text-white outline-none focus:border-gold/50 transition-all font-mono" />
                       </div>
                       <div className="space-y-3">
                          <label className="text-[10px] font-black text-white/30 uppercase tracking-widest pr-4">البريد الإلكتروني المهني</label>
                          <input type="email" defaultValue="ahmed@anaka.dz" className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-sm text-white outline-none focus:border-gold/50 transition-all font-mono" />
                       </div>
                       <div className="space-y-3">
                          <label className="text-[10px] font-black text-white/30 uppercase tracking-widest pr-4">رقم الهاتف</label>
                          <input type="text" defaultValue="+213 555 44 33 22" className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-sm text-white outline-none focus:border-gold/50 transition-all font-mono" />
                       </div>
                    </div>

                    <div className="pt-10 border-t border-white/5 flex justify-end">
                       <button className="flex items-center gap-3 px-10 py-4 bg-gold text-charcoal rounded-2xl font-black text-[11px] uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-gold/20">
                          <Save className="w-4 h-4" /> حفظ التغييرات الأساسية
                       </button>
                    </div>
                 </div>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="bg-[#1A1917] rounded-[3rem] border border-white/5 p-12 space-y-10">
                 <div className="flex justify-between items-center border-b border-white/5 pb-8">
                    <div className="space-y-2">
                       <h3 className="text-xl font-black text-white">عناوين الشحن والتسليم</h3>
                       <p className="text-xs text-white/40 font-medium">أضف مواقع المصانع أو المستودعات الخاصة بك.</p>
                    </div>
                    <button className="px-6 py-3 bg-white/5 text-gold text-[10px] font-black rounded-xl border border-gold/20 hover:bg-gold hover:text-charcoal transition-all uppercase tracking-widest">إضافة عنوان جديد</button>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { type: 'مقر الشركة الرئيسي', city: 'الجزائر العاصمة', address: 'حي الموز، الدار البيضاء', isDefault: true },
                      { type: 'مستودع المنطقة الصناعية', city: 'سطيف', address: 'المنطقة الصناعية، بلوك 44', isDefault: false },
                    ].map((loc, i) => (
                      <div key={i} className={`p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem] space-y-4 group hover:border-gold/30 transition-all relative ${loc.isDefault ? 'ring-1 ring-gold/20' : ''}`}>
                         <div className="flex justify-between items-start">
                            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-gold"><MapPin className="w-6 h-6" /></div>
                            {loc.isDefault && <span className="text-[9px] font-black text-gold uppercase tracking-widest border border-gold/20 px-3 py-1 rounded-full">Default</span>}
                         </div>
                         <div className="space-y-1">
                            <h4 className="text-sm font-bold text-white group-hover:text-gold transition-colors">{loc.type}</h4>
                            <p className="text-[11px] text-white/40 leading-relaxed">{loc.address}، {loc.city}</p>
                         </div>
                         <div className="pt-4 flex gap-4">
                            <button className="text-[9px] font-black text-white/20 uppercase tracking-widest hover:text-white transition-colors">تعديل</button>
                            {!loc.isDefault && <button className="text-[9px] font-black text-white/20 uppercase tracking-widest hover:text-gold transition-colors">تعيين كافتراضي</button>}
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
