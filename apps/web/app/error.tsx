'use client';

import React from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-32" dir="rtl">
      <div className="text-center">
        <h1 className="text-9xl font-black text-burgundy/10">500</h1>
        <div className="-mt-16 relative">
          <h2 className="text-3xl font-bold text-charcoal mb-4">حدث خطأ تقني</h2>
          <p className="text-muted mb-8 max-w-md mx-auto">نعتذر عن هذا الإزعاج، فريقنا التقني يعمل على حل المشكلة.</p>
          <button 
            onClick={() => reset()}
            className="px-8 py-3 bg-burgundy text-white rounded-xl font-bold hover:bg-gold transition-all"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    </div>
  );
}
