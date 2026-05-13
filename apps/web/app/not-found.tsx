'use client';

import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-32" dir="rtl">
      <div className="text-center">
        <h1 className="text-9xl font-black text-burgundy/10">404</h1>
        <div className="-mt-16 relative">
          <h2 className="text-3xl font-bold text-charcoal mb-4">عذراً، الصفحة غير موجودة</h2>
          <p className="text-muted mb-8 max-w-md mx-auto">يبدو أن الرابط الذي تحاول الوصول إليه غير صحيح أو تم نقله.</p>
          <Link href="/" className="px-8 py-3 bg-burgundy text-white rounded-xl font-bold hover:bg-gold transition-all">
            العودة للرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}
