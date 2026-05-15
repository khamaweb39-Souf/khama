'use client';

import React from 'react';
import { Shield, FileText, Lock, Globe } from 'lucide-react';

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-white pb-32 pt-32" dir="rtl">
      <div className="max-w-4xl mx-auto px-6">
        
        <div className="text-center space-y-6 mb-20">
           <div className="w-16 h-16 bg-burgundy/5 rounded-2xl flex items-center justify-center text-burgundy mx-auto">
              <Shield className="w-8 h-8" />
           </div>
           <h1 className="text-5xl font-black text-burgundy tracking-tighter">الشروط، الأحكام وسياسة الخصوصية</h1>
           <p className="text-muted font-medium">آخر تحديث: 15 ماي 2026</p>
        </div>

        <div className="space-y-16">
           <section className="space-y-6">
              <h2 className="text-2xl font-black text-charcoal flex items-center gap-4">
                 <FileText className="w-6 h-6 text-gold" /> شروط الاستخدام
              </h2>
              <div className="prose prose-burgundy max-w-none text-charcoal/70 leading-relaxed font-medium space-y-4">
                 <p>باستخدامك لمنصة "خامة"، فإنك توافق على الالتزام بكافة الشروط والأحكام المذكورة هنا. المنصة مخصصة لربط الموردين والمشترين في قطاع المنسوجات والجلود.</p>
                 <ul className="list-disc pr-6 space-y-2">
                    <li>يجب أن تكون كافة البيانات التجارية المقدمة دقيقة ومحدثة.</li>
                    <li>يُحظر استخدام المنصة لأغراض غير قانونية أو التلاعب في التقييمات.</li>
                    <li>تعتبر "خامة" وسيطاً تقنياً، ولا تتحمل مسؤولية مباشرة عن جودة البضائع إلا في حالات التوثيق الميداني المعتمد.</li>
                 </ul>
              </div>
           </section>

           <section className="space-y-6">
              <h2 className="text-2xl font-black text-charcoal flex items-center gap-4">
                 <Lock className="w-6 h-6 text-gold" /> سياسة الخصوصية
              </h2>
              <div className="prose prose-burgundy max-w-none text-charcoal/70 leading-relaxed font-medium space-y-4">
                 <p>نحن نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية والتجارية وفقاً لأعلى المعايير.</p>
                 <ul className="list-disc pr-6 space-y-2">
                    <li>يتم تشفير كافة البيانات المالية باستخدام بروتوكولات SSL/TLS.</li>
                    <li>لا نقوم ببيع بياناتك لأطراف خارجية لأغراض تسويقية.</li>
                    <li>يتم جمع البيانات فقط لتحسين تجربة المستخدم وإتمام الصفقات التجارية.</li>
                 </ul>
              </div>
           </section>

           <section className="space-y-6">
              <h2 className="text-2xl font-black text-charcoal flex items-center gap-4">
                 <Globe className="w-6 h-6 text-gold" /> ملفات تعريف الارتباط (Cookies)
              </h2>
              <div className="prose prose-burgundy max-w-none text-charcoal/70 leading-relaxed font-medium">
                 <p>نستخدم ملفات تعريف الارتباط لتحسين أداء المنصة وتخصيص المحتوى حسب تفضيلاتك المهنية. يمكنك إدارة إعدادات الكوكيز من خلال متصفحك في أي وقت.</p>
              </div>
           </section>
        </div>

        <div className="mt-32 p-12 bg-ecru/30 rounded-[3rem] text-center border border-dashed border-gold/30">
           <h3 className="text-xl font-black text-burgundy mb-4">هل لديك استفسار قانوني؟</h3>
           <p className="text-sm text-charcoal/60 mb-8 font-medium">يمكنك التواصل مع القسم القانوني مباشرة عبر البريد:</p>
           <a href="mailto:legal@khama.dz" className="text-lg font-black text-gold underline underline-offset-8">legal@khama.dz</a>
        </div>

      </div>
    </div>
  );
}
