'use client';

import React from 'react';
import Link from 'next/link';
import { 
  FileText, MessageCircle, MoreVertical, 
  Plus, CheckCircle2, Clock, AlertCircle
} from 'lucide-react';

export default function BuyerRFQDashboard() {
  const myRfqs = [
    { id: 'RFQ-001', title: 'بوبلين قطني 5000م', status: 'active', bids: 12, date: '2026-05-10' },
    { id: 'RFQ-002', title: 'صوف ميرينو 1200كغ', status: 'pending', bids: 0, date: '2026-05-12' },
    { id: 'RFQ-003', title: 'حرير طبيعي 200م', status: 'completed', bids: 5, date: '2026-04-20' },
  ];

  return (
    <div className="space-y-8" dir="rtl">
      {/* ─── Header ─── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-charcoal">إدارة طلبات العروض</h1>
          <p className="text-muted text-sm mt-1">تابع مناقصاتك النشطة وقارن عروض الموردين</p>
        </div>
        <Link href="/rfq/create" className="bg-gold text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-gold-dark transition-all">
          <Plus className="w-4 h-4" />
          طلب عرض جديد
        </Link>
      </div>

      {/* ─── Stats ─── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex items-center gap-4">
           <div className="w-12 h-12 bg-accent/5 text-accent rounded-xl flex items-center justify-center font-bold">08</div>
           <div>
             <p className="text-xs text-muted font-bold uppercase">طلبات نشطة</p>
             <p className="text-xs text-accent mt-1">تصلك عروض جديدة الآن</p>
           </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex items-center gap-4">
           <div className="w-12 h-12 bg-gold/5 text-gold rounded-xl flex items-center justify-center font-bold">24</div>
           <div>
             <p className="text-xs text-muted font-bold uppercase">إجمالي العروض</p>
             <p className="text-xs text-gold mt-1">متوسط 4 عروض لكل طلب</p>
           </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex items-center gap-4">
           <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center font-bold">15</div>
           <div>
             <p className="text-xs text-muted font-bold uppercase">صفقات مكتملة</p>
             <p className="text-xs text-green-600 mt-1">خلال آخر 30 يوم</p>
           </div>
        </div>
      </div>

      {/* ─── RFQ Table ─── */}
      <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
        <table className="w-full text-right">
          <thead>
            <tr className="bg-gray-50 border-b border-border">
              <th className="px-6 py-4 text-xs font-bold text-muted uppercase">معرف الطلب</th>
              <th className="px-6 py-4 text-xs font-bold text-muted uppercase">العنوان</th>
              <th className="px-6 py-4 text-xs font-bold text-muted uppercase">الحالة</th>
              <th className="px-6 py-4 text-xs font-bold text-muted uppercase">العروض</th>
              <th className="px-6 py-4 text-xs font-bold text-muted uppercase">التاريخ</th>
              <th className="px-6 py-4 text-xs font-bold text-muted"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {myRfqs.map((rfq) => (
              <tr key={rfq.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 text-xs font-bold text-accent">{rfq.id}</td>
                <td className="px-6 py-4">
                  <div className="font-bold text-sm text-charcoal">{rfq.title}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                    rfq.status === 'active' ? 'bg-green-50 text-green-600' : 
                    rfq.status === 'pending' ? 'bg-yellow-50 text-yellow-600' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {rfq.status === 'active' ? <Clock className="w-3 h-3" /> : rfq.status === 'completed' ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                    {rfq.status === 'active' ? 'نشط' : rfq.status === 'pending' ? 'بانتظار المراجعة' : 'مكتمل'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-bold text-charcoal">{rfq.bids} عروض</td>
                <td className="px-6 py-4 text-xs text-muted">{rfq.date}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 hover:bg-ecru rounded-lg text-muted transition-colors"><MessageCircle className="w-4 h-4" /></button>
                    <button className="p-2 hover:bg-ecru rounded-lg text-muted transition-colors"><MoreVertical className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
