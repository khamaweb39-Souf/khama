'use client';

import React from 'react';

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-20" dir="rtl">
      <div className="max-w-3xl mx-auto px-4 space-y-8">
         <h1 className="text-4xl font-black text-burgundy">سياسة ملفات تعريف الارتباط (Cookies)</h1>
         <div className="prose prose-burgundy max-w-none text-muted font-medium leading-relaxed">
            <p>نحن نستخدم ملفات تعريف الارتباط لتحسين تجربتك على منصة خامة. تساعدنا هذه الملفات في فهم كيفية تفاعلك مع الموقع وتخصيص المحتوى المناسب لك.</p>
            <h3 className="text-xl font-black text-charcoal mt-8 mb-4">ما هي ملفات تعريف الارتباط؟</h3>
            <p>هي ملفات نصية صغيرة يتم تخزينها على جهازك عند زيارة الموقع. وهي ضرورية لعمل بعض الميزات مثل سلة المشتريات واللغة المفضلة.</p>
         </div>
      </div>
    </div>
  );
}
