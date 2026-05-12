'use client';

import React from 'react';
import { 
  TrendingUp, Users, Package, Clock, 
  ArrowUpRight, ArrowDownRight, 
  ChevronLeft, PlusCircle, ExternalLink
} from 'lucide-react';
import Link from 'next/link';

// ─── Sub-Components ──────────────────────────────────────────────────────────

const StatCard = ({ label, value, change, trend, icon: Icon }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all">
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-ecru/30 rounded-xl text-burgundy">
        <Icon className="w-6 h-6" />
      </div>
      <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full ${trend === 'up' ? 'bg-success/10 text-success' : 'bg-red-500/10 text-red-500'}`}>
        {trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
        {change}
      </div>
    </div>
    <p className="text-label text-muted mb-1">{label}</p>
    <h3 className="text-2xl font-bold text-charcoal">{value}</h3>
  </div>
);

// ─── Main Component ──────────────────────────────────────────────────────────

export default function SupplierDashboardPage() {
  return (
    <div className="flex flex-col gap-8" dir="rtl">
      
      {/* ─── Hero / Quick Actions ─── */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-display !text-3xl mb-2">لوحة التحكم</h1>
          <p className="text-body-small text-muted">إليك ملخص نشاط مصنعك خلال الـ 24 ساعة الماضية.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-border px-5 py-3 rounded-xl text-label flex items-center gap-2 hover:bg-gray-50 transition-all">
             تصدير التقرير
          </button>
          <Link href="/dashboard/supplier/products/new" className="bg-burgundy text-white px-5 py-3 rounded-xl text-label flex items-center gap-2 hover:bg-gold transition-all shadow-lg shadow-burgundy/20">
             <PlusCircle className="w-4 h-4" /> إضافة منتج جديد
          </Link>
        </div>
      </div>

      {/* ─── Stats Grid ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="إجمالي المنتجات" value="124" change="+4" trend="up" icon={Package} />
        <StatCard label="طلبات العينات" value="18" change="+12%" trend="up" icon={Clock} />
        <StatCard label="المبيعات (دج)" value="1.2M" change="-3%" trend="down" icon={TrendingUp} />
        <StatCard label="العملاء النشطون" value="56" change="+8%" trend="up" icon={Users} />
      </div>

      {/* ─── Secondary Content (Recent Orders & Leads) ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Activity Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
          <div className="p-6 border-b border-border flex justify-between items-center">
            <h3 className="text-subheading !text-lg mb-0 font-bold">آخر طلبات العينات</h3>
            <button className="text-[11px] text-burgundy font-bold flex items-center gap-1 hover:text-gold">
              عرض الكل <ChevronLeft className="w-3 h-3" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead className="bg-gray-50 text-label text-muted">
                <tr>
                  <th className="px-6 py-4">المنتج</th>
                  <th className="px-6 py-4">العميل</th>
                  <th className="px-6 py-4">الحالة</th>
                  <th className="px-6 py-4">التاريخ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { id: 1, product: 'Sergé de Soie', client: 'Atelier Paris', status: 'Pending', date: 'منذ ساعتين' },
                  { id: 2, product: 'Lin Normand', client: 'Maison Mode', status: 'Shipped', date: 'منذ 5 ساعات' },
                  { id: 3, product: 'Denim Indigo', client: 'Factory DZ', status: 'Processing', date: 'أمس' },
                ].map((item) => (
                  <tr key={item.id} className="hover:bg-ecru/10 transition-colors">
                    <td className="px-6 py-4 font-bold text-body-small">{item.product}</td>
                    <td className="px-6 py-4 text-body-small text-muted">{item.client}</td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${item.status === 'Shipped' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-caption text-muted">{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Insights / Profile Strength */}
        <div className="bg-burgundy text-white rounded-2xl p-8 flex flex-col justify-between shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-subheading !text-white !text-xl mb-4">قوة ملفك التعريفي</h3>
            <div className="flex items-center gap-4 mb-6">
               <div className="relative w-16 h-16 rounded-full border-4 border-gold flex items-center justify-center font-bold text-xl">
                  85%
               </div>
               <p className="text-body-small text-ecru/70 leading-relaxed">أكمل بيانات الشهادات التقنية لرفع موثوقية مصنعك.</p>
            </div>
            <button className="w-full bg-white text-burgundy py-3 rounded-xl text-label font-bold hover:bg-gold hover:text-white transition-all flex items-center justify-center gap-2">
               تحديث البيانات <ExternalLink className="w-4 h-4" />
            </button>
          </div>
          {/* Abstract Pattern Background */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        </div>

      </div>

    </div>
  );
}
