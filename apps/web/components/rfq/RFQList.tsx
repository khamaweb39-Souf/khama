'use client';

import React, { useEffect, useState } from 'react';
import { 
  Clock, MapPin, Layers, Briefcase, 
  ChevronLeft, Filter, Search, MoreHorizontal, Loader2
} from 'lucide-react';
import { getActiveRFQs } from '@/lib/actions';
import { formatDistanceToNow } from 'date-fns';
import { ar } from 'date-fns/locale';

/* ─── Mock Data ──────────────────────────────────────────────────────── */
const MOCK_RFQS = [
  {
    id: 'RFQ-2026-001',
    title: 'مطلوب 5000 متر قماش بوبلين قطني ناعم',
    buyer: 'شركة أزياء الرياض',
    category: 'قطن',
    quantity: '5000 متر',
    location: 'السعودية، الرياض',
    deadline: '3 ساعات',
    responses: 12,
    urgent: true,
    composition: '100% قطن',
    gsm: '120 GSM'
  },
  {
    id: 'RFQ-2026-002',
    title: 'توريد صوف ميرينو لصناعة المعاطف الشتوية',
    buyer: 'مصنع المنسوجات الجزائرية',
    category: 'صوف',
    quantity: '1200 كغ',
    location: 'الجزائر، سطيف',
    deadline: 'يومان',
    responses: 8,
    urgent: false,
    composition: '100% صوف ميرينو',
    gsm: '350 GSM'
  },
  {
    id: 'RFQ-2026-003',
    title: 'خيوط بوليستر عالية المتانة للحقائب',
    buyer: 'مؤسسة التجهيزات الحديثة',
    category: 'بوليستر',
    quantity: '3000 بكرة',
    location: 'الإمارات، دبي',
    deadline: '5 ساعات',
    responses: 4,
    urgent: true,
    composition: '100% بوليستر',
    gsm: 'N/A'
  }
];

export default function RFQList() {
  const [rfqs, setRfqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const data = await getActiveRFQs();
      if (data && data.length > 0) {
        setRfqs(data);
      } else {
        setRfqs(MOCK_RFQS); // Fallback to mock data if empty
      }
      setLoading(false);
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-accent" />
        <p className="text-muted text-sm font-bold tracking-widest">جاري تحميل طلبات العروض...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6" dir="rtl">
      {/* ─── Filters & Search ─── */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-border shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input 
            type="text" 
            placeholder="البحث في طلبات العروض..." 
            className="w-full pr-11 pl-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-1 focus:ring-accent outline-none"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-border rounded-xl text-xs font-bold hover:bg-gray-50 transition-all">
            <Filter className="w-4 h-4" />
            تصفية النتائج
          </button>
          <button className="px-6 py-3 bg-accent text-white rounded-xl text-xs font-bold hover:bg-opacity-90 transition-all">
            بحث متقدم
          </button>
        </div>
      </div>

      {/* ─── List of RFQs ─── */}
      <div className="grid gap-6">
        {rfqs.map((rfq) => (
          <div 
            key={rfq.id}
            className="group bg-white border border-border rounded-3xl p-6 md:p-8 hover:border-accent transition-all hover:shadow-xl hover:shadow-accent/5 cursor-pointer relative overflow-hidden"
          >
            {/* Urgency Gradient Decor */}
            {rfq.urgency === 'URGENT' && <div className="absolute top-0 right-0 w-2 h-full bg-red-500/80" />}

            <div className="flex flex-col md:flex-row justify-between gap-6">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold text-accent uppercase tracking-widest bg-accent/5 px-2 py-1 rounded">
                    {rfq.id.substring(0, 8)}
                  </span>
                  {rfq.urgency === 'URGENT' && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-red-500 bg-red-50 px-2 py-1 rounded animate-pulse">
                      <Clock className="w-3 h-3" /> تنتهي قريباً
                    </span>
                  )}
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-charcoal group-hover:text-accent transition-colors leading-tight mb-2">
                    {rfq.productType || rfq.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-xs text-muted font-medium">
                    <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" /> {rfq.buyer?.fullName || rfq.buyer}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {rfq.location || 'الجزائر'}</span>
                    <span className="flex items-center gap-1"><Layers className="w-3.5 h-3.5" /> {rfq.category?.name?.ar || rfq.category}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-100">
                   <div>
                     <p className="text-[10px] text-muted uppercase mb-1">الكمية</p>
                     <p className="text-sm font-bold text-charcoal">{rfq.quantity} {rfq.unit || 'متر'}</p>
                   </div>
                   <div>
                     <p className="text-[10px] text-muted uppercase mb-1">التركيب</p>
                     <p className="text-sm font-bold text-charcoal">{rfq.specifications?.composition || rfq.composition}</p>
                   </div>
                   <div>
                     <p className="text-[10px] text-muted uppercase mb-1">الوزن</p>
                     <p className="text-sm font-bold text-charcoal">{rfq.specifications?.gsm || rfq.gsm} GSM</p>
                   </div>
                   <div>
                     <p className="text-[10px] text-muted uppercase mb-1">العروض المستلمة</p>
                     <p className="text-sm font-bold text-accent">{rfq.responses?.length || rfq.responses || 0} عروض</p>
                   </div>
                </div>
              </div>

              <div className="flex flex-col justify-between items-end gap-6 md:min-w-[180px]">
                <div className="text-left">
                  <p className="text-[10px] text-muted uppercase mb-1">تاريخ النشر</p>
                  <p className="text-lg font-bold text-charcoal">
                    {rfq.createdAt ? formatDistanceToNow(new Date(rfq.createdAt), { addSuffix: true, locale: ar }) : rfq.deadline}
                  </p>
                </div>
                <button className="w-full md:w-auto bg-charcoal text-white px-8 py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 group-hover:bg-accent transition-all group-hover:-translate-y-1">
                  تقديم عرض سعر
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* ─── Pagination ─── */}
      <div className="flex justify-center pt-8">
        <button className="flex items-center gap-2 text-xs font-bold text-muted hover:text-accent transition-colors">
          شاهد المزيد من طلبات العروض <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
