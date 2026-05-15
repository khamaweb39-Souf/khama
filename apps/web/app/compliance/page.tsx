'use client';

import React from 'react';
import { 
  ShieldCheck, Leaf, Globe, 
  RotateCcw, Scale, FileCheck,
  CheckCircle2, AlertCircle, Info,
  ExternalLink, Download
} from 'lucide-react';

const STANDARDS = [
  {
    id: 'gots',
    name: 'GOTS',
    fullName: 'Global Organic Textile Standard',
    desc: 'المعيار العالمي للمنسوجات العضوية، يضمن تتبع الألياف من المزرعة إلى المنتج النهائي.',
    color: 'green'
  },
  {
    id: 'oeko',
    name: 'OEKO-TEX®',
    fullName: 'Standard 100',
    desc: 'شهادة تضمن خلو الأقمشة من المواد الضارة بصحة الإنسان والبيئة.',
    color: 'blue'
  },
  {
    id: 'grs',
    name: 'GRS',
    fullName: 'Global Recycled Standard',
    desc: 'معيار التحقق من المحتوى المعاد تدويره في الألياف والمنسوجات.',
    color: 'orange'
  }
];

export default function CompliancePage() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-20" dir="rtl">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Hero Section */}
        <div className="max-w-3xl mb-24 space-y-8">
           <div className="inline-flex items-center gap-3 bg-ecru/50 px-4 py-2 rounded-full border border-ecru">
              <Leaf className="w-4 h-4 text-green-600" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-charcoal">الاستدامة والامتثال</span>
           </div>
           <h1 className="text-6xl font-black text-burgundy tracking-tighter leading-tight">
              معايير الجودة <br />
              <span className="text-gold">والمسؤولية البيئية</span>
           </h1>
           <p className="text-muted text-xl font-medium leading-relaxed">
              في "خامة"، نؤمن أن مستقبل النسيج يكمن في التوازن بين الإنتاج الصناعي وحماية البيئة. نحن ندعم الموردين الذين يلتزمون بأعلى معايير الاستدامة العالمية.
           </p>
        </div>

        {/* Core Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
           <div className="space-y-6 p-10 bg-ecru/20 rounded-[3rem] border border-ecru transition-all hover:shadow-xl group">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-green-600 shadow-sm group-hover:bg-green-600 group-hover:text-white transition-all">
                 <Globe className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-burgundy">بصمة بيئية أقل</h3>
              <p className="text-muted font-medium text-sm leading-relaxed">نعمل مع الموردين لتقليل استهلاك المياه والطاقة في عمليات الصباغة والتجهيز.</p>
           </div>
           <div className="space-y-6 p-10 bg-ecru/20 rounded-[3rem] border border-ecru transition-all hover:shadow-xl group">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
                 <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-burgundy">شفافية سلاسل الإمداد</h3>
              <p className="text-muted font-medium text-sm leading-relaxed">نوفر أدوات لتتبع مصدر المواد الخام وضمان توافقها مع القوانين الدولية والمحلية.</p>
           </div>
           <div className="space-y-6 p-10 bg-ecru/20 rounded-[3rem] border border-ecru transition-all hover:shadow-xl group">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-orange-600 shadow-sm group-hover:bg-orange-600 group-hover:text-white transition-all">
                 <RotateCcw className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-burgundy">دعم الاقتصاد الدائري</h3>
              <p className="text-muted font-medium text-sm leading-relaxed">نشجع على استخدام الألياف المعاد تدويرها وتقنيات الإنتاج التي تقلل من الهدر النسيجي.</p>
           </div>
        </div>

        {/* Standards Section */}
        <div className="space-y-16 mb-32">
           <div className="text-center space-y-4">
              <h2 className="text-4xl font-black text-burgundy tracking-tight">الشهادات المعتمدة في المنصة</h2>
              <p className="text-muted font-medium max-w-2xl mx-auto">نصنف المنتجات بناءً على شهادات الامتثال الدولية المعترف بها لتسهيل اتخاذ قرار الشراء الواعي.</p>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {STANDARDS.map(standard => (
                <div key={standard.id} className="bg-white border-2 border-ecru rounded-[2.5rem] p-10 flex flex-col gap-8 hover:border-gold transition-all duration-500 shadow-sm hover:shadow-2xl">
                   <div className="flex justify-between items-start">
                      <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center text-3xl font-black text-charcoal">
                         {standard.name}
                      </div>
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                   </div>
                   <div className="space-y-3">
                      <h4 className="text-xl font-black text-burgundy">{standard.fullName}</h4>
                      <p className="text-muted text-sm font-medium leading-relaxed">{standard.desc}</p>
                   </div>
                   <div className="pt-6 border-t border-ecru flex items-center justify-between">
                      <button className="text-[10px] font-black uppercase tracking-widest text-gold hover:text-burgundy transition-colors flex items-center gap-2">
                         دليل المعايير <ExternalLink className="w-3 h-3" />
                      </button>
                      <button className="p-2 bg-ecru/30 rounded-lg text-muted hover:bg-gold hover:text-white transition-all">
                         <Download className="w-4 h-4" />
                      </button>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Verification Process */}
        <div className="bg-burgundy rounded-[4rem] p-16 flex flex-col lg:flex-row items-center gap-16 overflow-hidden relative">
           <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
           
           <div className="w-full lg:w-1/2 space-y-8 relative z-10 text-right">
              <h2 className="text-4xl font-black text-white leading-tight">كيف نتحقق من <br /><span className="text-gold">شهادات الموردين؟</span></h2>
              <ul className="space-y-6">
                 {[
                   'التدقيق الرقمي في قاعدة بيانات الجهات المانحة للشهادات.',
                   'الفحص الميداني العشوائي للمصانع والورش المسجلة.',
                   'مراجعة فواتير الشراء للمواد الخام العضوية/المعاد تدويرها.',
                   'تحديث سنوي إلزامي لكافة الشهادات المرفوعة على المنصة.'
                 ].map((step, i) => (
                   <li key={i} className="flex gap-4 items-start">
                      <div className="w-6 h-6 bg-gold rounded-full flex items-center justify-center shrink-0 mt-1">
                         <span className="text-[10px] font-black text-charcoal">{i+1}</span>
                      </div>
                      <p className="text-white/70 font-medium">{step}</p>
                   </li>
                 ))}
              </ul>
           </div>

           <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4 relative z-10">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] space-y-4">
                 <FileCheck className="w-10 h-10 text-gold" />
                 <h4 className="text-white font-black">95%</h4>
                 <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest leading-relaxed">دقة التحقق من الوثائق الرسمية</p>
              </div>
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] space-y-4 mt-8">
                 <Scale className="w-10 h-10 text-gold" />
                 <h4 className="text-white font-black">100%</h4>
                 <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest leading-relaxed">امتثال للقوانين البيئية المحلية</p>
              </div>
           </div>
        </div>

        {/* Footer Alert */}
        <div className="mt-20 flex items-center gap-6 p-8 bg-ecru/20 rounded-[2rem] border border-gold/20">
           <AlertCircle className="w-10 h-10 text-gold shrink-0" />
           <div className="space-y-1">
              <h4 className="text-sm font-black text-burgundy tracking-tight">ملاحظة هامة للمشترين الدوليين</h4>
              <p className="text-xs text-muted font-medium">نحن نلتزم بالمعايير الجزائرية والدولية. إذا كنت تحتاج إلى شهادات محددة لسوق معين (مثل EU Ecolabel)، يرجى التواصل مع فريق الامتثال لدينا.</p>
           </div>
        </div>

      </div>
    </div>
  );
}
