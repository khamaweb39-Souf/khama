'use client';

import React from 'react';
import { ShieldCheck, MapPin, Package, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const SUPPLIERS = [
  { id: 1, name: 'مجموعة الأطلس للنسيج', country: 'الجزائر', city: 'تلمسان', rating: 4.9, image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=400&auto=format&fit=crop', products: 156, verified: true },
  { id: 2, name: 'مدابغ جيجل الكبرى', country: 'الجزائر', city: 'جيجل', rating: 4.8, image: 'https://images.unsplash.com/photo-1590736962236-455b76662497?q=80&w=400&auto=format&fit=crop', products: 42, verified: true },
  { id: 3, name: 'تجهيزات الشرق للنسيج والآلات', country: 'الجزائر', city: 'سطيف', rating: 4.7, image: 'https://images.unsplash.com/photo-1582142306909-195724d339aa?q=80&w=400&auto=format&fit=crop', products: 28, verified: true },
  { id: 4, name: 'قرطاج للمنسوجات الفاخرة', country: 'تونس', city: 'تونس العاصمة', rating: 5.0, image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=400&auto=format&fit=crop', products: 210, verified: true },
];

export default function SuppliersPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20" dir="rtl">
      <div className="max-w-7xl mx-auto px-4">
        <header className="mb-12">
           <h1 className="text-4xl font-black text-charcoal">دليل الموردين المعتمدين</h1>
           <p className="text-muted mt-2">تواصل مع كبار المصنعين والموزعين في منطقة البحر المتوسط.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {SUPPLIERS.map(sup => (
             <div key={sup.id} className="bg-white rounded-3xl border border-border p-6 hover:shadow-xl transition-all group">
                <div className="flex gap-4 mb-6">
                   <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-border">
                      <img src={sup.image} alt={sup.name} className="w-full h-full object-cover" />
                   </div>
                   <div className="space-y-1">
                      <h3 className="font-bold text-charcoal">{sup.name}</h3>
                      <p className="text-xs text-muted flex items-center gap-1">
                         <MapPin className="w-3 h-3" /> {sup.city}، {sup.country}
                      </p>
                      <div className="flex items-center gap-1 pt-1">
                         <ShieldCheck className="w-4 h-4 text-green-500" />
                         <span className="text-[10px] font-black text-green-600 uppercase">مورد موثق</span>
                      </div>
                   </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                   <div className="bg-gray-50 p-3 rounded-xl text-center">
                      <p className="text-[10px] text-muted font-bold uppercase mb-1">المنتجات</p>
                      <p className="font-black text-burgundy">{sup.products}</p>
                   </div>
                   <div className="bg-gray-50 p-3 rounded-xl text-center">
                      <p className="text-[10px] text-muted font-bold uppercase mb-1">التقييم</p>
                      <p className="font-black text-gold">{sup.rating}</p>
                   </div>
                </div>
                <Link 
                  href={`/supplier/${sup.id}`}
                  className="w-full py-3 bg-charcoal text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-burgundy transition-all"
                >
                  عرض الملف الكامل <ArrowLeft className="w-4 h-4" />
                </Link>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
