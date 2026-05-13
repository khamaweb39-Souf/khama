'use client';

import React from 'react';
import { Heart, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function WishlistPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20 flex flex-col items-center justify-center text-center px-4" dir="rtl">
      <div className="w-24 h-24 bg-ecru rounded-full flex items-center justify-center mb-6">
         <Heart className="w-10 h-10 text-burgundy" />
      </div>
      <h1 className="text-2xl font-black text-charcoal mb-2">قائمة المفضلات فارغة</h1>
      <p className="text-muted mb-8">احفظ الأقمشة التي تعجبك هنا للرجوع إليها لاحقاً.</p>
      <Link href="/fabrics" className="px-8 py-3 bg-burgundy text-white rounded-xl font-bold hover:bg-gold transition-all">
         استكشف الأقمشة
      </Link>
    </div>
  );
}
