'use client';
import { useState } from 'react';
import OrderCard from '../../../components/dashboard/OrderCard';
import { ChevronRight, Filter } from 'lucide-react';
import Link from 'next/link';

const statuses = [
  { key: 'all', label: 'الكل' },
  { key: 'PENDING', label: 'جديد' },
  { key: 'PREPARING', label: 'قيد التجهيز' },
  { key: 'SHIPPED', label: 'تم الشحن' },
  { key: 'DELIVERED', label: 'مسلّم' },
];

export default function OrdersPage() {
  const [status, setStatus] = useState('all');
  
  // بيانات وهمية للاختبار
  const mockOrders = [
    { id: '1', orderNumber: 'KH7X2Y', customerName: 'أحمد محمد', total: 12500, status: 'PENDING', address: 'حي 500 مسكن', wilaya: 'الجزائر العاصمة', customerPhone: '0555123456', items: [] },
    { id: '2', orderNumber: 'KH3A9B', customerName: 'سارة بلقاسم', total: 8400, status: 'PREPARING', address: 'شارع الاستقلال', wilaya: 'وهران', customerPhone: '0666987654', items: [] },
  ];

  const filteredOrders = status === 'all' 
    ? mockOrders 
    : mockOrders.filter(o => o.status === status);
  
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 pb-32 space-y-6">
      <header className="flex items-center gap-4">
        <Link href="/dashboard" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronRight className="w-6 h-6" />
        </Link>
        <h1 className="text-2xl font-black text-gray-900">إدارة الطلبات</h1>
      </header>
      
      {/* Tabs / Filter */}
      <div className="sticky top-16 z-30 bg-gray-50/80 backdrop-blur-md py-2 -mx-4 px-4">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {statuses.map(s => (
            <button
              key={s.key}
              onClick={() => setStatus(s.key)}
              className={`px-6 py-2.5 rounded-2xl whitespace-nowrap text-sm font-bold transition-all
                ${status === s.key 
                  ? 'bg-burgundy text-white shadow-lg shadow-burgundy/20' 
                  : 'bg-white text-gray-500 border border-gray-100 hover:border-burgundy/30'}`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Orders List */}
      <div className="space-y-4 pt-4">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
             <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Filter className="w-10 h-10 text-gray-200" />
             </div>
             <p className="text-gray-400 font-medium">لا توجد طلبات في هذا القسم</p>
          </div>
        ) : (
          filteredOrders.map(order => (
            <OrderCard key={order.id} order={order} />
          ))
        )}
      </div>
    </div>
  );
}
