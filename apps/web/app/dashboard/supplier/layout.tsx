'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Package, ShoppingBag, 
  MessageSquare, BarChart2, Settings, 
  PlusCircle, LogOut, Bell, User,
  Menu, X, ChevronRight, ChevronLeft,
  Store, ShieldCheck, Globe
} from 'lucide-react';

export default function SupplierDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: 'نظرة عامة', icon: LayoutDashboard, href: '/dashboard/supplier' },
    { name: 'إدارة المنتجات', icon: Package, href: '/dashboard/supplier/products' },
    { name: 'الطلبات والعينات', icon: ShoppingBag, href: '/dashboard/supplier/orders' },
    { name: 'الرسائل والمناقصات', icon: MessageSquare, href: '/dashboard/supplier/rfqs', badge: 5 },
    { name: 'تحليلات الأداء', icon: BarChart2, href: '/dashboard/supplier/analytics' },
    { name: 'المتجر الرقمي', icon: Store, href: '/supplier/tissage-de-lyon' },
    { name: 'إعدادات الحساب', icon: Settings, href: '/dashboard/supplier/settings' },
  ];

  return (
    <div className="flex min-h-screen bg-[#F0F2F5]" dir="rtl">
      
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-charcoal/40 backdrop-blur-sm z-[150] lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed lg:static inset-y-0 right-0 z-[160] bg-burgundy-dark text-white transition-all duration-300 shadow-2xl
          ${isCollapsed ? 'w-20' : 'w-72'}
          ${isMobileOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          
          {/* Header */}
          <div className="h-20 flex items-center justify-between px-6 border-b border-white/5">
             {!isCollapsed && (
               <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gold rounded-lg flex items-center justify-center">
                     <ShieldCheck className="w-5 h-5 text-burgundy-dark" />
                  </div>
                  <span className="text-xl font-black tracking-tight text-white">المورد PRO</span>
               </div>
             )}
             <button 
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex p-2 hover:bg-white/10 rounded-xl transition-colors"
             >
               {isCollapsed ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
             </button>
             <button 
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden p-2 hover:bg-white/10 rounded-xl"
             >
               <X className="w-5 h-5" />
             </button>
          </div>

          {/* Business Summary */}
          <div className={`p-6 border-b border-white/5 ${isCollapsed ? 'items-center' : ''} flex gap-4 transition-all`}>
             <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
                <Store className="w-5 h-5 text-gold" />
             </div>
             {!isCollapsed && (
               <div className="overflow-hidden">
                  <p className="font-bold text-sm truncate">مصنع ليون للنسيج</p>
                  <div className="flex items-center gap-1">
                     <span className="w-2 h-2 bg-green-500 rounded-full" />
                     <p className="text-[10px] text-white/40 uppercase">حساب موثق</p>
                  </div>
               </div>
             )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center gap-4 p-3 rounded-xl transition-all group
                    ${isActive ? 'bg-gold text-burgundy-dark shadow-lg shadow-gold/20' : 'hover:bg-white/5 text-white/60 hover:text-white'}
                  `}
                >
                  <item.icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-burgundy-dark' : 'group-hover:text-gold transition-colors'}`} />
                  {!isCollapsed && (
                    <div className="flex-1 flex justify-between items-center">
                       <span className="text-sm font-bold">{item.name}</span>
                       {item.badge && (
                         <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-burgundy-dark text-gold' : 'bg-gold text-burgundy-dark'}`}>
                           {item.badge}
                         </span>
                       )}
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Footer Actions */}
          <div className="p-4 border-t border-white/5 space-y-2">
             <button className="w-full flex items-center gap-4 p-3 rounded-xl bg-white/5 text-gold font-bold hover:bg-gold hover:text-burgundy-dark transition-all">
                <PlusCircle className="w-5 h-5 shrink-0" />
                {!isCollapsed && <span className="text-sm">إضافة منتج سريع</span>}
             </button>
             <button className="w-full flex items-center gap-4 p-3 rounded-xl text-white/40 hover:text-red-400 hover:bg-red-400/5 transition-all">
                <LogOut className="w-5 h-5 shrink-0" />
                {!isCollapsed && <span className="text-sm font-bold">خروج</span>}
             </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-border flex items-center justify-between px-4 md:px-8 shrink-0 shadow-sm">
           <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsMobileOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-xl"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div>
                 <h2 className="text-lg font-black text-charcoal">إدارة المبيعات</h2>
                 <p className="text-[10px] text-muted font-bold uppercase tracking-widest hidden md:block">لوحة تحكم الموردين المعتمدين</p>
              </div>
           </div>

           <div className="flex items-center gap-2 md:gap-6">
              <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full border border-green-100">
                 <Globe className="w-4 h-4 text-green-600" />
                 <span className="text-[10px] font-bold text-green-600 uppercase">تصدير دولي: متاح</span>
              </div>

              <div className="relative">
                <button className="p-2.5 bg-gray-50 text-charcoal hover:bg-burgundy/10 hover:text-burgundy rounded-xl transition-all">
                   <Bell className="w-5 h-5" />
                   <span className="absolute top-2 right-2 w-2 h-2 bg-gold rounded-full border-2 border-white" />
                </button>
              </div>

              <div className="h-10 w-px bg-border hidden md:block" />

              <div className="flex items-center gap-3">
                 <div className="hidden md:block text-left">
                    <p className="text-xs font-black text-charcoal">Tissage de Lyon</p>
                    <p className="text-[9px] text-muted font-bold uppercase">الجزائر العاصمة</p>
                 </div>
                 <div className="w-10 h-10 rounded-xl bg-ecru border-2 border-white shadow-sm flex items-center justify-center overflow-hidden">
                    <img src="https://ui-avatars.com/api/?name=Lyon+Textile&background=E5E1DA&color=1A1A1A" alt="Avatar" />
                 </div>
              </div>
           </div>
        </header>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 pb-20">
           {children}
        </main>

      </div>

    </div>
  );
}
