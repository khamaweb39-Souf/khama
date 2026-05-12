import { Users, Store, ShoppingBag, DollarSign, ShieldCheck, Clock } from 'lucide-react';
import Link from 'next/link';

async function getAdminStats() {
  try {
    const res = await fetch('http://localhost:3005/api/v1/admin/stats', {
      headers: { 'Authorization': 'Bearer admin-token' }, // سنحتاج لـ Token حقيقي
      cache: 'no-store'
    });
    return res.json();
  } catch (e) {
    return { users: 0, stores: 0, orders: 0, revenue: 0 };
  }
}

export default async function AdminDashboard() {
  const stats = await getAdminStats();

  const cards = [
    { title: 'إجمالي المستخدمين', value: stats.users, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'المتاجر المسجلة', value: stats.stores, icon: Store, color: 'text-purple-600', bg: 'bg-purple-50' },
    { title: 'إجمالي الطلبات', value: stats.orders, icon: ShoppingBag, color: 'text-green-600', bg: 'bg-green-50' },
    { title: 'حجم التداول', value: `${stats.revenue.toLocaleString()} دج`, icon: DollarSign, color: 'text-burgundy', bg: 'bg-burgundy/5' },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-10 space-y-10 pb-32">
      <header>
        <h1 className="text-3xl font-black text-gray-900">لوحة تحكم الإدارة</h1>
        <p className="text-gray-500">مرحباً بك مجدداً في مركز التحكم في خامة</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <div key={i} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-all">
            <div className={`w-14 h-14 rounded-2xl ${card.bg} flex items-center justify-center`}>
              <card.icon className={`w-7 h-7 ${card.color}`} />
            </div>
            <div>
              <p className="text-2xl font-black text-gray-900">{card.value}</p>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{card.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Quick Actions / Verification Section */}
        <section className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-blue-500" />
              طلبات توثيق المتاجر
            </h3>
            <Link href="/admin/verifications" className="text-sm text-blue-600 font-bold hover:underline">عرض الكل</Link>
          </div>
          
          <div className="space-y-4">
            {[1, 2].map(i => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl group hover:bg-white hover:shadow-sm border border-transparent hover:border-blue-100 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-lg shadow-sm font-bold text-gray-300">🏪</div>
                  <div>
                    <p className="font-bold text-gray-800">متجر الأقمشة الراقية</p>
                    <p className="text-[10px] text-gray-400 font-medium">سجل تجاري: 22/00-1234567</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all">
                  توثيق الآن
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Pending Products */}
        <section className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Clock className="w-6 h-6 text-gold" />
              منتجات بانتظار المراجعة
            </h3>
            <Link href="/admin/products" className="text-sm text-gold-dark font-bold hover:underline">المراجعة</Link>
          </div>
          
          <div className="space-y-4">
            {[1, 2].map(i => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl group hover:bg-white hover:shadow-sm border border-transparent hover:border-gold/10 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-lg shadow-sm">🧵</div>
                  <div>
                    <p className="font-bold text-gray-800">قماش حرير إيطالي</p>
                    <p className="text-[10px] text-gray-400 font-medium">بواسطة: بائع الذهب</p>
                  </div>
                </div>
                <div className="flex gap-2">
                   <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">✕</button>
                   <button className="p-2 text-gray-400 hover:text-green-500 transition-colors">✓</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
