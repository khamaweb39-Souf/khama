import StatsCards from '../../components/dashboard/StatsCards';
import { Package, Clock, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

async function getStats() {
  try {
    // في الإنتاج سنستخدم Token حقيقي من الكوكيز أو الجلسة
    const res = await fetch('http://localhost:3005/api/v1/dashboard/stats', {
      headers: { 'Authorization': 'Bearer test-token' },
      cache: 'no-store'
    });
    if (!res.ok) return null;
    return res.json();
  } catch (e) {
    return null;
  }
}

export default async function DashboardPage() {
  const stats = await getStats();
  
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8 pb-32">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900">مرحباً بك، بائع خامة</h1>
          <p className="text-gray-500">إليك نظرة سريعة على أداء متجرك اليوم</p>
        </div>
        <Link href="/dashboard/orders" className="flex items-center gap-2 text-burgundy font-bold hover:underline">
          إدارة الطلبات <ChevronLeft className="w-5 h-5" />
        </Link>
      </header>

      {/* بطاقات الإحصائيات */}
      <StatsCards stats={stats || undefined} />

      {/* قسم الطلبات الأخيرة */}
      <section className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Clock className="w-6 h-6 text-gold" />
            أحدث الطلبات
          </h3>
          <Link href="/dashboard/orders" className="text-sm text-gray-400">عرض الكل</Link>
        </div>

        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-gold/20 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <Package className="w-6 h-6 text-burgundy/40" />
                </div>
                <div>
                  <p className="font-bold text-gray-800">طلب جديد #KHX92B</p>
                  <p className="text-xs text-gray-500">منذ 15 دقيقة • الجزائر العاصمة</p>
                </div>
              </div>
              <div className="text-left">
                <p className="font-black text-burgundy">4,500 دج</p>
                <span className="text-[10px] bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">قيد الانتظار</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
