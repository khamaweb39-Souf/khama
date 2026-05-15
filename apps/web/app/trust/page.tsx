'use client';

import React from 'react';
import { 
  ShieldCheck, Lock, Fingerprint, 
  Server, BadgeCheck, UserCheck,
  CheckCircle2, AlertTriangle, Key,
  ShieldAlert, Database, History
} from 'lucide-react';

export default function TrustPage() {
  return (
    <div className="min-h-screen bg-[#FDFCFB] pt-32 pb-20" dir="rtl">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Security Hero */}
        <div className="flex flex-col items-center text-center gap-8 mb-24 max-w-4xl mx-auto">
           <div className="w-24 h-24 bg-gold/10 rounded-full flex items-center justify-center text-gold border-2 border-gold/20 shadow-inner">
              <ShieldCheck className="w-12 h-12" />
           </div>
           <div className="space-y-4">
              <h1 className="text-6xl font-black text-burgundy tracking-tighter leading-tight">مركز الثقة <span className="text-gold">والأمان الرقمي</span></h1>
              <p className="text-muted text-xl font-medium leading-relaxed">
                 في "خامة"، نضع أمان بياناتك وسلامة معاملاتك التجارية في مقدمة أولوياتنا. نحن نبني منظومة تجارية قائمة على الشفافية والتوثيق الرقمي المتقدم.
              </p>
           </div>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-32">
           <div className="bg-white p-10 rounded-[3rem] shadow-xl shadow-gray-200/50 border border-ecru space-y-8 group hover:border-gold transition-all duration-500">
              <div className="w-14 h-14 bg-ecru/30 rounded-2xl flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-white transition-all">
                 <UserCheck className="w-7 h-7" />
              </div>
              <div className="space-y-4">
                 <h3 className="text-2xl font-black text-burgundy tracking-tight">توثيق الهوية التجارية</h3>
                 <p className="text-muted text-sm font-medium leading-relaxed">
                    يخضع كل مورد لعملية فحص KYC (تعرف على عميلك) شاملة تشمل السجل التجاري، البطاقة الضريبية، ومقر النشاط الفعلي.
                 </p>
              </div>
              <ul className="space-y-3 pt-6 border-t border-ecru">
                 <li className="flex items-center gap-2 text-[11px] font-bold text-muted"><CheckCircle2 className="w-4 h-4 text-green-500" /> فحص السجل التجاري</li>
                 <li className="flex items-center gap-2 text-[11px] font-bold text-muted"><CheckCircle2 className="w-4 h-4 text-green-500" /> التحقق من المقر الميداني</li>
                 <li className="flex items-center gap-2 text-[11px] font-bold text-muted"><CheckCircle2 className="w-4 h-4 text-green-500" /> مطابقة البيانات البنكية</li>
              </ul>
           </div>

           <div className="bg-white p-10 rounded-[3rem] shadow-xl shadow-gray-200/50 border border-ecru space-y-8 group hover:border-gold transition-all duration-500">
              <div className="w-14 h-14 bg-ecru/30 rounded-2xl flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-white transition-all">
                 <Lock className="w-7 h-7" />
              </div>
              <div className="space-y-4">
                 <h3 className="text-2xl font-black text-burgundy tracking-tight">حماية المعاملات والبيانات</h3>
                 <p className="text-muted text-sm font-medium leading-relaxed">
                    نستخدم تقنيات تشفير متطورة (AES-256) لحماية مراسلاتك وبياناتك المالية، مع ضمان سرية تامة لكافة عروض الأسعار.
                 </p>
              </div>
              <ul className="space-y-3 pt-6 border-t border-ecru">
                 <li className="flex items-center gap-2 text-[11px] font-bold text-muted"><CheckCircle2 className="w-4 h-4 text-green-500" /> تشفير البيانات الحساسة</li>
                 <li className="flex items-center gap-2 text-[11px] font-bold text-muted"><CheckCircle2 className="w-4 h-4 text-green-500" /> حماية ضد هجمات DDoS</li>
                 <li className="flex items-center gap-2 text-[11px] font-bold text-muted"><CheckCircle2 className="w-4 h-4 text-green-500" /> نظام النسخ الاحتياطي اليومي</li>
              </ul>
           </div>

           <div className="bg-white p-10 rounded-[3rem] shadow-xl shadow-gray-200/50 border border-ecru space-y-8 group hover:border-gold transition-all duration-500">
              <div className="w-14 h-14 bg-ecru/30 rounded-2xl flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-white transition-all">
                 <BadgeCheck className="w-7 h-7" />
              </div>
              <div className="space-y-4">
                 <h3 className="text-2xl font-black text-burgundy tracking-tight">نظام النزاهة والتقييم</h3>
                 <p className="text-muted text-sm font-medium leading-relaxed">
                    نظام تقييم شفاف ومبني على معاملات حقيقية فقط، يضمن استبعاد الأطراف غير الملتزمة وحماية سمعة المحترفين.
                 </p>
              </div>
              <ul className="space-y-3 pt-6 border-t border-ecru">
                 <li className="flex items-center gap-2 text-[11px] font-bold text-muted"><CheckCircle2 className="w-4 h-4 text-green-500" /> تقييمات موثقة (Verified Only)</li>
                 <li className="flex items-center gap-2 text-[11px] font-bold text-muted"><CheckCircle2 className="w-4 h-4 text-green-500" /> فض النزاعات عبر خبراء نسيج</li>
                 <li className="flex items-center gap-2 text-[11px] font-bold text-muted"><CheckCircle2 className="w-4 h-4 text-green-500" /> مراقبة أداء الموردين</li>
              </ul>
           </div>
        </div>

        {/* Technical Stack (Cinematic Section) */}
        <div className="bg-charcoal rounded-[4rem] p-16 overflow-hidden relative mb-32">
           <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
           <div className="relative z-10 flex flex-col lg:flex-row items-center gap-20">
              <div className="w-full lg:w-1/2 space-y-8">
                 <h2 className="text-4xl font-black text-white leading-tight">بنية تحتية رقمية <br /><span className="text-gold">بمعايير عالمية</span></h2>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex gap-4 items-start">
                       <Server className="w-6 h-6 text-gold shrink-0" />
                       <div className="space-y-1">
                          <h4 className="text-white font-black text-sm">استضافة سحابية آمنة</h4>
                          <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">مراكز بيانات في أوروبا (Render/AWS)</p>
                       </div>
                    </div>
                    <div className="flex gap-4 items-start">
                       <Fingerprint className="w-6 h-6 text-gold shrink-0" />
                       <div className="space-y-1">
                          <h4 className="text-white font-black text-sm">دخول محمي (MFA)</h4>
                          <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">مصادقة ثنائية لكافة الحسابات</p>
                       </div>
                    </div>
                    <div className="flex gap-4 items-start">
                       <Database className="w-6 h-6 text-gold shrink-0" />
                       <div className="space-y-1">
                          <h4 className="text-white font-black text-sm">سرية قواعد البيانات</h4>
                          <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">عزل تام لبيانات المشتركين</p>
                       </div>
                    </div>
                    <div className="flex gap-4 items-start">
                       <History className="w-6 h-6 text-gold shrink-0" />
                       <div className="space-y-1">
                          <h4 className="text-white font-black text-sm">سجل تدقيق كامل</h4>
                          <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">تتبع كافة التغييرات على النظام</p>
                       </div>
                    </div>
                 </div>
              </div>
              <div className="w-full lg:w-1/2 flex items-center justify-center">
                 <div className="relative w-80 h-80">
                    <div className="absolute inset-0 bg-gold/20 rounded-full animate-pulse" />
                    <div className="absolute inset-10 border-2 border-gold/30 rounded-full animate-[spin_10s_linear_infinite]" />
                    <div className="absolute inset-20 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-full flex items-center justify-center">
                       <Key className="w-20 h-20 text-gold" />
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Report Vulnerability CTA */}
        <div className="bg-ecru/30 rounded-[3rem] p-12 flex flex-col md:flex-row items-center justify-between gap-12 border-2 border-dashed border-ecru">
           <div className="flex items-center gap-8 text-right">
              <ShieldAlert className="w-16 h-16 text-burgundy shrink-0" />
              <div className="space-y-2">
                 <h3 className="text-2xl font-black text-burgundy">هل اكتشفت ثغرة أمنية؟</h3>
                 <p className="text-muted font-medium text-sm max-w-lg leading-relaxed">
                    نحن نقدر مجتمع الباحثين الأمنيين. يرجى إبلاغنا عن أي ثغرة أو تهديد عبر قنواتنا الرسمية للمساعدة في الحفاظ على أمان "خامة".
                 </p>
              </div>
           </div>
           <button className="px-10 py-5 bg-burgundy text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-burgundy-dark transition-all">
              إبلاغ عن ثغرة
           </button>
        </div>

      </div>
    </div>
  );
}
