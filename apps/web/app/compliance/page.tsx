'use client';

import React from 'react';
import { 
  Leaf, ShieldCheck, Globe, 
  Award, FileText, CheckCircle,
  ArrowUpRight
} from 'lucide-react';
import Link from 'next/link';

export default function CompliancePage() {
  return (
    <div className="min-h-screen bg-[#FDFCFB] pb-32 pt-32" dir="rtl">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="max-w-4xl space-y-8 mb-24">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
                 <Leaf className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black text-green-600 uppercase tracking-[0.3em]">الاستدامة والامتثال</span>
           </div>
           <h1 className="text-6xl font-black text-burgundy tracking-tighter">معايير خامة <br />للنسيج المستدام</h1>
           <p className="text-xl text-charcoal/60 leading-relaxed font-medium">نحن نؤمن أن مستقبل النسيج يكمن في المسؤولية البيئية. تلتزم "خامة" بدعم الموردين الذين يتبنون معايير الاستدامة العالمية ويطبقون ممارسات أخلاقية في الإنتاج.</p>
        </div>

        {/* Standards Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-32">
           {[
             {
               title: 'GOTS (Global Organic Textile Standard)',
               desc: 'المعيار الرائد عالمياً لمعالجة المنسوجات من الألياف العضوية، بما في ذلك المعايير البيئية والاجتماعية.',
               badge: 'عضوي 100%'
             },
             {
               title: 'OEKO-TEX® Standard 100',
               desc: 'نظام فحص واعتماد عالمي مستقل للمنسوجات الخام وشبه المصنعة والنهائية في جميع مراحل الإنتاج.',
               badge: 'آمن صحياً'
             },
             {
               title: 'GRS (Global Recycled Standard)',
               desc: 'يحدد متطلبات اعتماد الطرف الثالث للمحتوى المعاد تدويره، وسلسلة العهدة، والممارسات الاجتماعية والبيئية.',
               badge: 'معاد تدويره'
             },
             {
               title: 'Fair Trade Certified',
               desc: 'يضمن أن المنتجات تم إنتاجها وفقاً لمعايير التجارة العادلة التي تدعم المنتجين في البلدان النامية.',
               badge: 'تجارة عادلة'
             }
           ].map((std, i) => (
             <div key={i} className="bg-white p-12 rounded-[3rem] border-2 border-burgundy/5 hover:border-gold/30 shadow-sm transition-all group">
                <div className="flex justify-between items-start mb-6">
                   <div className="w-14 h-14 bg-ecru rounded-2xl flex items-center justify-center text-burgundy group-hover:bg-gold group-hover:text-white transition-all">
                      <ShieldCheck className="w-8 h-8" />
                   </div>
                   <span className="bg-green-50 text-green-600 text-[9px] font-black px-3 py-1 rounded-full uppercase">{std.badge}</span>
                </div>
                <h3 className="text-2xl font-black text-charcoal mb-4">{std.title}</h3>
                <p className="text-muted font-medium leading-relaxed mb-8">{std.desc}</p>
                <button className="flex items-center gap-2 text-[10px] font-black text-gold uppercase tracking-widest hover:translate-x-[-4px] transition-all">
                   عرض التفاصيل التقنية <ArrowUpRight className="w-4 h-4" />
                </button>
             </div>
           ))}
        </div>

        {/* Roadmap */}
        <div className="bg-charcoal rounded-[4rem] p-16 md:p-24 text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-green-500/10 to-transparent pointer-events-none" />
           <div className="max-w-2xl space-y-12 relative z-10">
              <h2 className="text-4xl font-black leading-tight">خارطة طريق الاستدامة <br />خامة 2030</h2>
              <div className="space-y-8">
                 {[
                   { year: '2025', goal: 'تحويل 40% من الموردين لتبني شهادات الاستدامة.' },
                   { year: '2026', goal: 'إطلاق نظام تتبع أثر الكربون لكل طلبية شحن.' },
                   { year: '2028', goal: 'دعم كامل لمنظومة الاقتصاد الدائري في النسيج الجزائري.' }
                 ].map((milestone, i) => (
                   <div key={i} className="flex gap-8 group">
                      <span className="text-3xl font-black text-gold/20 group-hover:text-gold transition-colors">{milestone.year}</span>
                      <div className="pt-2 border-t border-white/10 flex-1">
                         <p className="text-lg font-medium text-white/80">{milestone.goal}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* CTA */}
        <div className="mt-32 text-center p-20 bg-[#FAF9F6] rounded-[3rem] border border-ecru">
           <h2 className="text-3xl font-black text-burgundy mb-8">هل منتجاتك صديقة للبيئة؟</h2>
           <div className="flex items-center justify-center gap-6">
              <Link href="/contact" className="bg-burgundy text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all">تواصل للتوثيق الأخضر</Link>
           </div>
        </div>

      </div>
    </div>
  );
}
