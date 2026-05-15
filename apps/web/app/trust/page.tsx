'use client';

import React from 'react';
import { 
  ShieldCheck, CheckCircle, Lock, 
  Search, Users, Award, FileText, 
  Globe 
} from 'lucide-react';
import Link from 'next/link';

export default function TrustPage() {
  return (
    <div className="min-h-screen bg-white pb-32 pt-32" dir="rtl">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto space-y-8 mb-24">
           <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto text-gold animate-pulse">
              <ShieldCheck className="w-10 h-10" />
           </div>
           <h1 className="text-6xl font-black text-burgundy tracking-tighter leading-tight">مركز الثقة والتوثيق <br /><span className="text-gold">خامة الموثوقة</span></h1>
           <p className="text-xl text-charcoal/60 leading-relaxed font-medium">في "خامة"، الأمان ليس مجرد ميزة، بل هو حجر الزاوية في كل معاملة تجارية نقوم بها. نحن نبني جسور الثقة بين كبار المصنعين والمشترين المحترفين.</p>
        </div>

        {/* Verification Steps */}
        <div className="grid lg:grid-cols-3 gap-12 mb-32">
           {[
             {
               title: 'التدقيق القانوني',
               desc: 'نتحقق يدوياً من السجل التجاري، الرقم الضريبي، وهوية الممثل القانوني لكل شركة قبل تفعيل حساب المورد.',
               icon: <FileText className="w-8 h-8" />
             },
             {
               title: 'فحص الجودة',
               desc: 'نقوم بزيارات ميدانية عشوائية للمصانع والورش المسجلة للتأكد من مطابقة المعايير التقنية المعلنة.',
               icon: <Search className="w-8 h-8" />
             },
             {
               title: 'نظام التقييم الصارم',
               desc: 'نعتمد على تقييمات حقيقية من مشترين محترفين، ولا يتم التلاعب بالتقييمات أو حذفها.',
               icon: <Award className="w-8 h-8" />
             }
           ].map((item, i) => (
             <div key={i} className="p-12 bg-[#FAF9F6] rounded-[3rem] border border-ecru space-y-6 hover:shadow-xl transition-all group">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-gold shadow-sm group-hover:bg-gold group-hover:text-white transition-all">
                   {item.icon}
                </div>
                <h3 className="text-2xl font-black text-charcoal">{item.title}</h3>
                <p className="text-muted font-medium leading-relaxed">{item.desc}</p>
             </div>
           ))}
        </div>

        {/* Badges Section */}
        <div className="bg-charcoal rounded-[4rem] p-16 md:p-24 relative overflow-hidden text-white">
           <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
           
           <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-8">
                 <h2 className="text-4xl font-black leading-tight">شارة "المورد الموثق" <br />علامة التميز في خامة</h2>
                 <p className="text-white/60 text-lg leading-relaxed">
                    عندما ترى شارة الدرع الذهبية بجانب اسم المورد، فهذا يعني أن هذا المورد قد اجتاز كافة مراحل التدقيق والتحقق الميداني من قبل فريق خامة التقني.
                 </p>
                 <ul className="space-y-4">
                    {[
                      'التزام كامل بمواعيد التسليم المعلنة',
                      'توفير شهادات المطابقة التقنية (GOTS, OEKO-TEX)',
                      'سياسة استرجاع واضحة وعادلة',
                      'سجل مالي خالٍ من النزاعات'
                    ].map((point, i) => (
                      <li key={i} className="flex items-center gap-4 text-sm font-bold text-white/80">
                         <CheckCircle className="w-5 h-5 text-gold flex-shrink-0" />
                         {point}
                      </li>
                    ))}
                 </ul>
              </div>
              <div className="flex items-center justify-center">
                 <div className="relative group">
                    <div className="absolute inset-0 bg-gold blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity" />
                    <div className="relative bg-white/5 border border-white/10 backdrop-blur-xl p-16 rounded-[4rem] flex flex-col items-center gap-6 shadow-2xl">
                       <ShieldCheck className="w-32 h-32 text-gold" />
                       <div className="text-center">
                          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gold-light/40">Verified by Khama</span>
                          <h4 className="text-3xl font-black mt-2">توثيق 2026</h4>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Security Info */}
        <div className="mt-32 grid md:grid-cols-2 gap-16">
           <div className="space-y-6">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-burgundy/5 rounded-xl flex items-center justify-center text-burgundy">
                    <Lock className="w-6 h-6" />
                 </div>
                 <h3 className="text-2xl font-black text-charcoal">المدفوعات الآمنة</h3>
              </div>
              <p className="text-muted font-medium leading-relaxed">
                 نحن نستخدم بروتوكولات تشفير متقدمة لحماية كافة المعاملات المالية. يتم حجز مبالغ صفقات الجملة في حساب وسيط حتى تأكيد الاستلام لضمان حقوق الطرفين.
              </p>
           </div>
           <div className="space-y-6">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-burgundy/5 rounded-xl flex items-center justify-center text-burgundy">
                    <Globe className="w-6 h-6" />
                 </div>
                 <h3 className="text-2xl font-black text-charcoal">دعم العملاء VIP</h3>
              </div>
              <p className="text-muted font-medium leading-relaxed">
                 لمشتركي الباقات الاحترافية والموردين المعتمدين، نوفر مدير حساب مخصص يتحدث العربية والفرنسية والإنجليزية لحل أي إشكالات تقنية أو لوجستية فوراً.
              </p>
           </div>
        </div>

        {/* Final CTA */}
        <div className="mt-32 text-center p-20 bg-ecru/30 rounded-[3rem] border border-dashed border-gold/30">
           <h2 className="text-3xl font-black text-burgundy mb-8">هل أنت مستعد للانضمام للموردين المعتمدين؟</h2>
           <div className="flex items-center justify-center gap-6">
              <Link href="/register?type=supplier" className="bg-burgundy text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all">سجل كمورد</Link>
              <Link href="/contact" className="bg-white border-2 border-burgundy text-burgundy px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-burgundy hover:text-white transition-all">تواصل مع فريق التدقيق</Link>
           </div>
        </div>

      </div>
    </div>
  );
}
