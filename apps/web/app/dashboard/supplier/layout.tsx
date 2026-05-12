'use client';

import React from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, Package, ShoppingBag, 
  MessageSquare, BarChart, Settings, 
  PlusCircle, LogOut, Bell, User
} from 'lucide-react';

export default function SupplierDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex font-body">
      
      {/* ─── Sidebar ─── */}
      <aside className="w-64 bg-burgundy-dark text-white hidden lg:flex flex-col fixed inset-y-0 right-0 z-50 shadow-2xl" dir="rtl">
        <div className="p-6 border-b border-white/5">
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gold rounded-lg" />
              <span className="text-xl font-bold tracking-tight">لوحة المورد</span>
           </div>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-2 mt-4">
          {[
            { label: 'نظرة عامة', icon: LayoutDashboard, href: '/dashboard/supplier', active: true },
            { label: 'إدارة المنتجات', icon: Package, href: '/dashboard/supplier/products' },
            { label: 'الطلبات والعينات', icon: ShoppingBag, href: '/dashboard/supplier/orders' },
            { label: 'الرسائل والـ RFQ', icon: MessageSquare, href: '/dashboard/supplier/messages' },
            { label: 'التحليلات', icon: BarChart, href: '/dashboard/supplier/analytics' },
          ].map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${item.active ? 'bg-gold text-white shadow-lg shadow-gold/20' : 'hover:bg-white/5 text-ecru/60 hover:text-white'}`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5 flex flex-col gap-2">
          <Link href="/dashboard/supplier/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-ecru/60 hover:text-white transition-all">
            <Settings className="w-5 h-5" />
            <span>الإعدادات</span>
          </Link>
          <button className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 text-red-400 transition-all text-right">
            <LogOut className="w-5 h-5" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      {/* ─── Main Content Area ─── */}
      <main className="flex-1 lg:mr-64 flex flex-col min-h-screen">
        
        {/* Header Section */}
        <header className="h-16 bg-white border-b border-border flex items-center justify-between px-8 sticky top-0 z-40" dir="rtl">
          <div className="flex items-center gap-4">
             <h2 className="text-body font-bold text-charcoal">مرحباً، مصنع ليون للنسيج 👋</h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-muted hover:bg-ecru rounded-full relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-gold rounded-full" />
            </button>
            <div className="w-px h-6 bg-border mx-2" />
            <Link href="/dashboard/supplier/profile" className="flex items-center gap-3 group">
               <div className="text-left hidden sm:block">
                  <p className="text-[11px] font-bold text-charcoal group-hover:text-gold transition-colors">Tissage de Lyon</p>
                  <p className="text-[9px] text-muted">حساب مصنع معتمد</p>
               </div>
               <User className="w-8 h-8 text-muted group-hover:text-gold transition-colors" />
            </Link>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="p-8 overflow-y-auto">
          {children}
        </div>

      </main>
    </div>
  );
}
