'use client';
import { useState } from 'react';
import { Package, Printer, ChevronDown, Phone, MapPin } from 'lucide-react';

const statusColors = {
  PENDING: 'bg-yellow-100 text-yellow-700',
  PREPARING: 'bg-blue-100 text-blue-700',
  SHIPPED: 'bg-purple-100 text-purple-700',
  DELIVERED: 'bg-green-100 text-green-700',
};

const statusLabels = {
  PENDING: 'جديد',
  PREPARING: 'قيد التجهيز',
  SHIPPED: 'تم الشحن',
  DELIVERED: 'تم التسليم',
};

export default function OrderCard({ order }) {
  const [expanded, setExpanded] = useState(false);
  
  const updateStatus = async (newStatus) => {
    // سيتم تنفيذ الأكشن وتحديث البيانات
    console.log('Update status to:', newStatus);
    alert(`تم تحديث حالة الطلب إلى: ${statusLabels[newStatus]}`);
  };
  
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md">
      {/* Header */}
      <div className="p-5 flex items-center justify-between bg-gray-50/50">
        <div>
          <p className="font-mono text-xs text-gray-400 mb-1">#{order.orderNumber || 'KH12345'}</p>
          <p className="font-bold text-gray-900">{order.customerName}</p>
        </div>
        <span className={`px-4 py-1.5 rounded-xl text-xs font-bold ${statusColors[order.status || 'PENDING']}`}>
          {statusLabels[order.status || 'PENDING']}
        </span>
      </div>
      
      {/* Content Preview */}
      <div className="p-5 flex items-end justify-between">
        <div className="flex -space-x-3">
          {[1, 2].map(i => (
            <div key={i} className="w-14 h-14 rounded-2xl bg-gray-100 border-4 border-white flex items-center justify-center overflow-hidden">
               <Package className="w-6 h-6 text-gray-300" />
            </div>
          ))}
        </div>
        <div className="text-left">
          <p className="text-sm text-gray-400">الإجمالي</p>
          <p className="text-2xl font-black text-burgundy">{(order.total || 0).toLocaleString()} <span className="text-sm">دج</span></p>
        </div>
      </div>
      
      {/* Actions */}
      <div className="border-t p-4 flex gap-3">
        {(!order.status || order.status === 'PENDING') && (
          <button
            onClick={() => updateStatus('PREPARING')}
            className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-2xl text-sm transition-all hover:bg-blue-700 active:scale-95"
          >
            بدء التجهيز
          </button>
        )}
        {order.status === 'PREPARING' && (
          <button
            onClick={() => updateStatus('SHIPPED')}
            className="flex-1 py-3 bg-purple-600 text-white font-bold rounded-2xl text-sm transition-all hover:bg-purple-700 active:scale-95"
          >
            تم الشحن
          </button>
        )}
        
        <button
          onClick={() => setExpanded(!expanded)}
          className={`p-3 rounded-2xl bg-gray-100 text-gray-500 transition-all ${expanded ? 'bg-gold/10 text-gold-dark rotate-180' : ''}`}
        >
          <ChevronDown className="w-6 h-6" />
        </button>
      </div>
      
      {/* Expanded Details */}
      {expanded && (
        <div className="border-t p-6 bg-gray-50/50 space-y-6 animate-in slide-in-from-top-4 duration-300">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <p className="text-xs text-gray-400 flex items-center gap-1"><MapPin className="w-3 h-3" /> العنوان</p>
              <p className="text-sm font-medium">{order.address}, {order.wilaya}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-gray-400 flex items-center gap-1"><Phone className="w-3 h-3" /> الهاتف</p>
              <p className="text-sm font-medium">{order.customerPhone}</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">تفاصيل المنتجات</p>
            {(order.items || [1]).map((item, i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                <span className="text-sm text-gray-700 font-medium">منتج تجريبي × 2</span>
                <span className="text-sm font-bold text-gray-900">3,000 دج</span>
              </div>
            ))}
          </div>

          <button className="w-full py-3 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 text-sm font-bold flex items-center justify-center gap-2 hover:border-gold hover:text-gold transition-all">
            <Printer className="w-4 h-4" />
            طباعة ملصق الشحن (PDF)
          </button>
        </div>
      )}
    </div>
  );
}
