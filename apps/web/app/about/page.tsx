'use client';

import React from 'react';
import { 
  Target, Eye, Heart, 
  Users, Globe, Zap, 
  Award, Briefcase 
} from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white pb-32 pt-32" dir="rtl">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
           <div className="space-y-8">
              <span className="text-[10px] font-black text-gold uppercase tracking-[0.3em]">قصة خامة</span>
              <h1 className="text-6xl font-black text-burgundy tracking-tighter leading-tight">نعيد صياغة <br />مستقبل المنسوجات</h1>
              <p className="text-xl text-charcoal/60 leading-relaxed font-medium">
                 بدأت "خامة" كفكرة طموحة لسد الفجوة الرقمية في صناعة المنسوجات والجلود في أفريقيا. نحن نؤمن أن التكنولوجيا هي الخيط الذي سيربط بين الموردين المحليين والأسواق العالمية بذكاء واستدامة.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-ecru">
                 <div className="space-y-2">
                    <h4 className="text-4xl font-black text-burgundy">2024</h4>
                    <p className="text-xs font-bold text-muted uppercase tracking-widest">تأسيس المنصة</p>
                 </div>
                 <div className="space-y-2">
                    <h4 className="text-4xl font-black text-burgundy">500+</h4>
                    <p className="text-xs font-bold text-muted uppercase tracking-widest">مورد معتمد</p>
                 </div>
              </div>
           </div>
           <div className="relative">
              <div className="absolute inset-0 bg-gold/10 rounded-[4rem] -rotate-3" />
              <img 
                src="https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=800&auto=format&fit=crop" 
                className="relative z-10 rounded-[4rem] shadow-2xl object-cover aspect-square"
                alt="Khama Vision"
              />
           </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-32">
           <div className="p-16 bg-burgundy rounded-[4rem] text-white space-y-6 relative overflow-hidden">
              <Target className="w-12 h-12 text-gold relative z-10" />
              <h2 className="text-3xl font-black relative z-10">مهمتنا</h2>
              <p className="text-white/60 text-lg leading-relaxed font-medium relative z-10">
                 تمكين كافة أطراف صناعة النسيج في المنطقة من خلال توفير منصة رقمية متطورة تضمن الشفافية، الجودة، وسهولة الوصول للخامات المتميزة.
              </p>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
           </div>
           <div className="p-16 bg-[#FAF9F6] rounded-[4rem] border border-ecru space-y-6 group">
              <Eye className="w-12 h-12 text-gold transition-transform group-hover:scale-110" />
              <h2 className="text-3xl font-black text-burgundy">رؤيتنا</h2>
              <p className="text-charcoal/60 text-lg leading-relaxed font-medium">
                 أن نصبح المحرك الرقمي الأول لصناعة الأزياء والمنسوجات في أفريقيا، ونحولها إلى قطاع منافس عالمياً يعتمد على الابتكار والاستدامة.
              </p>
           </div>
        </div>

        {/* Values */}
        <div className="space-y-16">
           <div className="text-center space-y-4">
              <h2 className="text-4xl font-black text-burgundy">قيمنا الجوهرية</h2>
              <div className="h-1.5 w-24 bg-gold mx-auto rounded-full" />
           </div>

           <div className="grid md:grid-cols-4 gap-8">
              {[
                { title: 'الشفافية', icon: <Zap className="w-6 h-6" />, desc: 'وضوح تام في الأسعار والمواصفات.' },
                { title: 'الجودة', icon: <Award className="w-6 h-6" />, desc: 'لا تنازل عن المعايير التقنية.' },
                { title: 'الابتكار', icon: <Globe className="w-6 h-6" />, desc: 'استخدام أحدث تقنيات الجرافيك والـ 3D.' },
                { title: 'المجتمع', icon: <Users className="w-6 h-6" />, desc: 'بناء شبكة علاقات مهنية قوية.' }
              ].map((val, i) => (
                <div key={i} className="text-center space-y-4 p-8 hover:bg-ecru/30 rounded-3xl transition-all">
                   <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center text-gold mx-auto">
                      {val.icon}
                   </div>
                   <h4 className="text-xl font-black text-charcoal">{val.title}</h4>
                   <p className="text-xs text-muted font-bold leading-relaxed">{val.desc}</p>
                </div>
              ))}
           </div>
        </div>

        {/* Team / Join CTA */}
        <div className="mt-40 bg-charcoal rounded-[4rem] p-20 text-center space-y-10 relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent pointer-events-none" />
           <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto text-gold mb-4 rotate-12">
              <Briefcase className="w-10 h-10" />
           </div>
           <h2 className="text-5xl font-black text-white tracking-tighter">هل تود المساهمة في <br />تغيير الصناعة؟</h2>
           <p className="text-white/40 text-lg font-medium max-w-2xl mx-auto">
              نحن نبحث دائماً عن المبدعين والمطورين وخبراء النسيج للانضمام لفريقنا المتنامي في الجزائر.
           </p>
           <div className="flex items-center justify-center gap-6 pt-6">
              <Link href="/careers" className="bg-gold text-charcoal px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all">انضم إلينا</Link>
              <Link href="/contact" className="text-white font-black hover:text-gold transition-colors underline underline-offset-8">تواصل معنا</Link>
           </div>
        </div>

      </div>
    </div>
  );
}
