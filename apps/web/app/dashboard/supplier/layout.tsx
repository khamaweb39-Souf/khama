'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Package, ShoppingBag, 
  MessageSquare, BarChart2, Settings, 
  PlusCircle, LogOut, Bell, User,
  Menu, X, ChevronRight, ChevronLeft,
  Store, ShieldCheck, Globe, Search, Truck, Wallet
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
    { name: 'الشحن واللوجستيك', icon: Truck, href: '/dashboard/supplier/shipping' },
    { name: 'المركز المالي', icon: Wallet, href: '/dashboard/supplier/finance' },
    { name: 'تحليلات الأداء', icon: BarChart2, href: '/dashboard/supplier/analytics' },
    { name: 'المتجر الرقمي', icon: Store, href: '/supplier/tissage-de-lyon' },
    { name: 'إعدادات الحساب', icon: Settings, href: '/dashboard/supplier/settings' },
  ];

  return (
    <div className="flex min-h-screen bg-[#0D0C0A] text-white selection:bg-gold selection:text-charcoal" dir="rtl">
      
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-[150] lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed lg:static inset-y-0 right-0 z-[160] bg-[#1A1917] border-l border-white/5 transition-all duration-500 ease-in-out
          ${isCollapsed ? 'w-20' : 'w-72'}
          ${isMobileOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          
          {/* Header */}
          <div className="h-20 flex items-center justify-between px-6 border-b border-white/5">
             {!isCollapsed && (
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center shadow-lg shadow-gold/20">
                     <ShieldCheck className="w-6 h-6 text-charcoal" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-black tracking-widest text-white uppercase">KHAMA</span>
                    <span className="text-[10px] font-bold text-gold uppercase tracking-widest">Supplier Pro</span>
                  </div>
               </div>
             )}
             <button 
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex p-2 hover:bg-white/5 rounded-xl transition-all border border-transparent hover:border-white/10"
             >
               {isCollapsed ? <ChevronLeft className="w-5 h-5 text-gold" /> : <ChevronRight className="w-5 h-5 text-gold" />}
             </button>
             <button 
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden p-2 hover:bg-white/5 rounded-xl"
             >
               <X className="w-5 h-5" />
             </button>
          </div>

          {/* Business Summary */}
          <div className={`p-6 border-b border-white/5 ${isCollapsed ? 'justify-center' : ''} flex gap-4 transition-all hover:bg-white/[0.02] cursor-pointer group`}>
             <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:border-gold transition-colors duration-500">
                <Store className="w-6 h-6 text-gold" />
             </div>
             {!isCollapsed && (
               <div className="overflow-hidden py-1">
                  <p className="font-black text-sm truncate text-white group-hover:text-gold transition-colors">Tissage de Lyon</p>
                  <div className="flex items-center gap-2 mt-1">
                     <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                     <p className="text-[9px] text-white/40 font-black uppercase tracking-widest">Verified Seller</p>
                  </div>
               </div>
             )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-8 px-4 space-y-2 no-scrollbar">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center gap-4 p-3.5 rounded-2xl transition-all duration-300 group relative
                    ${isActive ? 'bg-gold text-charcoal shadow-2xl shadow-gold/20 font-black' : 'hover:bg-white/5 text-white/40 hover:text-white'}
                  `}
                >
                  <item.icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-charcoal' : 'group-hover:text-gold transition-colors'}`} />
                  {!isCollapsed && (
                    <div className="flex-1 flex justify-between items-center">
                       <span className="text-[13px] tracking-tight">{item.name}</span>
                       {item.badge && (
                         <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${isActive ? 'bg-charcoal text-gold' : 'bg-gold text-charcoal shadow-lg shadow-gold/30'}`}>
                           {item.badge}
                         </span>
                       )}
                    </div>
                  )}
                  {isActive && !isCollapsed && <div className="absolute left-3 w-1.5 h-1.5 bg-charcoal rounded-full" />}
                </Link>
              );
            })}
          </nav>

          {/* Footer Actions */}
          <div className="p-4 border-t border-white/5 space-y-3">
             <button className="w-full flex items-center gap-4 p-4 rounded-2xl bg-gold/10 text-gold font-black hover:bg-gold hover:text-charcoal transition-all duration-500 border border-gold/20">
                <PlusCircle className="w-6 h-6 shrink-0" />
                {!isCollapsed && <span className="text-xs tracking-widest uppercase">Quick Add Product</span>}
             </button>
             <button className="w-full flex items-center gap-4 p-4 rounded-2xl text-white/20 hover:text-red-400 hover:bg-red-400/5 transition-all duration-300">
                <LogOut className="w-6 h-6 shrink-0" />
                {!isCollapsed && <span className="text-xs font-black uppercase tracking-widest">Logout</span>}
             </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Aesthetic Background Accents */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-burgundy/5 rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/2" />
        
        {/* Top Header */}
        <header className="h-20 bg-[#1A1917]/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-6 md:px-10 shrink-0 z-50">
           <div className="flex items-center gap-6">
              <button 
                onClick={() => setIsMobileOpen(true)}
                className="lg:hidden p-2.5 bg-white/5 hover:bg-white/10 rounded-xl transition-all"
              >
                <Menu className="w-6 h-6 text-gold" />
              </button>
              <div className="hidden md:flex items-center gap-4 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl group focus-within:border-gold transition-all duration-500">
                 <Search className="w-4 h-4 text-white/30 group-focus-within:text-gold" />
                 <input 
                   type="text" 
                   placeholder="Search orders, products..." 
                   className="bg-transparent border-none outline-none text-xs text-white placeholder:text-white/20 w-64"
                 />
              </div>
           </div>

           <div className="flex items-center gap-4 md:gap-8">
              <div className="hidden lg:flex items-center gap-2.5 px-4 py-2 bg-gold/5 rounded-xl border border-gold/10">
                 <Globe className="w-4 h-4 text-gold" />
                 <span className="text-[10px] font-black text-gold uppercase tracking-[0.2em]">Global Export Active</span>
              </div>

              <div className="relative group">
                <button className="p-3 bg-white/5 text-white/40 hover:bg-gold/10 hover:text-gold rounded-2xl transition-all duration-500 border border-white/5 hover:border-gold/20">
                   <Bell className="w-5 h-5" />
                   <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-gold rounded-full border-2 border-[#1A1917] shadow-lg shadow-gold/20" />
                </button>
              </div>

              <div className="h-8 w-px bg-white/5 hidden md:block" />

              <div className="flex items-center gap-4 group cursor-pointer">
                 <div className="hidden md:block text-left text-right">
                    <p className="text-xs font-black text-white group-hover:text-gold transition-colors tracking-tight">Tissage de Lyon</p>
                    <p className="text-[9px] text-white/30 font-black uppercase tracking-widest mt-0.5">Algiers, DZ</p>
                 </div>
                 <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 p-1 group-hover:border-gold transition-all duration-500 relative">
                    <img 
                      src="https://ui-avatars.com/api/?name=Lyon+Textile&background=C9A84C&color=0D0C0A&bold=true" 
                      alt="Avatar" 
                      className="w-full h-full object-cover rounded-xl"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-charcoal rounded-full" />
                 </div>
              </div>
           </div>
        </header>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10 space-y-10 z-10 no-scrollbar">
           {children}
        </main>

      </div>

    </div>
  );
}
