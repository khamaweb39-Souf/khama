'use client';

import React from 'react';
import Link from 'next/link';
import * as Icons from 'lucide-react';
import Image from 'next/image';

const { 
  Target, Eye, Heart, 
  History, Users, Globe,
  ArrowRight, Sparkles, Building,
  Factory, Zap, Palette, ShieldCheck
} = Icons;

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white" dir="rtl">
      
      {/* Cinematic Hero */}
      <section className="relative h-[80vh] flex items-center overflow-hidden bg-charcoal">
         <div className="absolute inset-0">
            <Image 
              src="https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1920&auto=format&fit=crop" 
              fill
              className="object-cover opacity-30 grayscale" 
              alt="Khama Story"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent" />
         </div>
         <div className="max-w-7xl mx-auto px-4 relative z-10 w-full">
            <div className="max-w-3xl space-y-8 text-right">
               <div className="inline-flex items-center gap-2 bg-gold/20 text-gold px-4 py-2 rounded-full border border-gold/30 backdrop-blur-md">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">قصتنا وتوجهنا</span>
               </div>
               <h1 className="text-7xl font-black text-white tracking-tighter leading-[1.1]">
                  خامة: الرؤية <br />
                  <span className="text-gold">الرقمية للنسيج</span>
               </h1>
               <p className="text-white/60 text-xl font-medium leading-relaxed max-w-2xl">
                  نحن لسنا مجرد منصة تجارية، بل نحن جسر تكنولوجي يربط بين إرث النسيج العريق في شمال أفريقيا ومستقبل الصناعة الرقمي العالمي.
               </p>
            </div>
         </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-32">
         
         {/* Stats Section */}
         <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 mb-32">
            {[
              { label: 'مورد معتمد', value: '+500', Icon: Building },
              { label: 'نوع نسيج', value: '+2,000', Icon: Palette },
              { label: 'طلبات ناجحة', value: '+10k', Icon: Zap },
              { label: 'دول أفريقية', value: '12', Icon: Globe }
            ].map((stat, i) => (
              <div key={i} className="space-y-4 text-center group">
                 <div className="w-16 h-16 bg-ecru/30 rounded-[1.5rem] flex items-center justify-center text-gold mx-auto group-hover:bg-gold group-hover:text-white transition-all duration-500 transform group-hover:scale-110">
                    <stat.Icon />
                 </div>
                 <div className="space-y-1">
                    <h3 className="text-4xl font-black text-burgundy">{stat.value}</h3>
                    <p className="text-[10px] font-black text-muted uppercase tracking-[0.2em]">{stat.label}</p>
                 </div>
              </div>
            ))}
         </div>

         {/* Mission & Vision */}
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-40">
            <div className="space-y-10 p-16 bg-burgundy rounded-[4rem] text-right relative overflow-hidden group">
               <Target className="w-16 h-16 text-gold relative z-10" />
               <div className="space-y-6 relative z-10">
                  <h2 className="text-4xl font-black text-white">مهمتنا</h2>
                  <p className="text-white/60 text-lg leading-relaxed font-medium">
                     تمكين الحرفيين والمصانع من الوصول إلى أجود الخامات بأفضل الأسعار، عبر أتمتة سلاسل الإمداد وتقليل الوسطاء، لضمان نمو مستدام للصناعة الوطنية.
                  </p>
               </div>
            </div>
            <div className="space-y-10 p-16 bg-ecru/30 rounded-[4rem] text-right group hover:bg-gold transition-all duration-700">
               <Eye className="w-16 h-16 text-burgundy group-hover:text-white transition-colors" />
               <div className="space-y-6">
                  <h2 className="text-4xl font-black text-burgundy group-hover:text-white transition-colors">رؤيتنا</h2>
                  <p className="text-muted text-lg leading-relaxed font-medium group-hover:text-white/80 transition-colors">
                     أن نكون المركز الرقمي الأول للمنسوجات والجلود في أفريقيا بحلول عام 2030، ومحركاً أساسياً في دفع عجلة التحول الصناعي الذكي في المنطقة.
                  </p>
               </div>
            </div>
         </div>

         {/* Values */}
         <div className="text-center space-y-4 mb-20">
            <h2 className="text-4xl font-black text-burgundy">قيمنا الجوهرية</h2>
            <p className="text-muted font-medium">المبادئ التي تقود كل قرار نتخذه في "خامة"</p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-40">
            {[
              { title: 'الابتكار المستمر', desc: 'تطوير أدوات ذكاء اصطناعي ومعاينة 3D لتسهيل عملية التصميم والإنتاج.', Icon: Zap, color: 'text-gold' },
              { title: 'الاحترافية المطلقة', desc: 'نظام صارم لتوثيق الموردين وضمان جودة المنتجات المتاحة على المنصة.', Icon: ShieldCheck, color: 'text-burgundy' },
              { title: 'التركيز على العميل', desc: 'بناء علاقات طويلة الأمد قائمة على النجاح المشترك والنمو المتبادل.', Icon: Users, color: 'text-gold' }
            ].map((value, i) => (
              <div key={i} className="text-right space-y-6 p-8 border-2 border-ecru rounded-[2.5rem] hover:border-gold transition-all">
                 <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center">
                    <value.Icon className={value.color} />
                 </div>
                 <h4 className="text-xl font-black text-burgundy">{value.title}</h4>
                 <p className="text-muted text-sm font-medium leading-relaxed">{value.desc}</p>
              </div>
            ))}
         </div>

         {/* Partners CTA */}
         <div className="bg-ecru/20 rounded-[5rem] p-20 flex flex-col items-center text-center gap-12 border-2 border-dashed border-ecru">
            <div className="space-y-4">
               <h2 className="text-4xl font-black text-burgundy">انضم إلى مستقبل النسيج</h2>
               <p className="text-muted text-lg font-medium max-w-2xl">
                  سواء كنت مصنعاً يبحث عن عملاء جدد، أو مصمماً يبحث عن خامات نادرة، "خامة" هي المكان الذي تبدأ فيه رحلة نجاحك.
               </p>
            </div>
            <div className="flex gap-6">
               <Link href="/register" className="px-12 py-6 bg-burgundy text-white font-black text-xs uppercase tracking-[0.2em] rounded-[2rem] shadow-2xl hover:scale-105 transition-all">
                  ابدأ الآن مجاناً
               </Link>
               <Link href="/contact" className="px-12 py-6 bg-white border-2 border-ecru text-charcoal font-black text-xs uppercase tracking-[0.2em] rounded-[2rem] hover:border-gold transition-all">
                  تحدث مع فريقنا
               </Link>
            </div>
         </div>

      </div>
    </div>
  );
}
