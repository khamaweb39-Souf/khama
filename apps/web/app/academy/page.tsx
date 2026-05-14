'use client';

import React from 'react';
import { 
  BookOpen, Users, Award, 
  Search, Filter, Sparkles,
  ArrowRight, PlayCircle, Globe,
  ShieldCheck, Zap, Newspaper
} from 'lucide-react';
import CourseCard from '@/components/academy/CourseCard';

const CATEGORIES = [
  { name: 'أساسيات الأقمشة', count: 12, icon: <BookOpen className="w-5 h-5" /> },
  { name: 'تقنيات النسج', count: 8, icon: <Zap className="w-5 h-5" /> },
  { name: 'مراقبة الجودة', count: 5, icon: <ShieldCheck className="w-5 h-5" /> },
  { name: 'التجارة الدولية', count: 6, icon: <Globe className="w-5 h-5" /> },
];

const MOCK_COURSES = [
  {
    id: 1,
    title: 'دليل المحترفين في تمييز جودة خيوط القطن',
    instructor: 'د. يوسف منصوري',
    image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800',
    level: 'متوسط' as const,
    duration: '4 ساعات',
    lessons: 24,
    rating: 4.9,
    students: 1240,
    price: '4500',
  },
  {
    id: 2,
    title: 'أساسيات النسيج المستدام والمعايير البيئية GOTS',
    instructor: 'م. سارة آيت',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800',
    level: 'مبتدئ' as const,
    duration: '6 ساعات',
    lessons: 32,
    rating: 4.8,
    students: 850,
    price: 'free' as const,
  },
  {
    id: 3,
    title: 'تقنيات الـ Jacquard المتقدمة في المصانع الحديثة',
    instructor: 'الخبير برنارد لوران',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800',
    level: 'متقدم' as const,
    duration: '12 ساعة',
    lessons: 48,
    rating: 5.0,
    students: 420,
    price: '12500',
  }
];

export default function AcademyPage() {
  return (
    <div className="min-h-screen bg-[#0D0C0A] text-white pt-24 pb-20" dir="rtl">
      
      {/* ─── Hero Section ─── */}
      <section className="relative px-6 py-20 lg:py-32 overflow-hidden">
         {/* Animated Background Elements */}
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
         <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-burgundy/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

         <div className="max-w-7xl mx-auto relative z-10 text-center space-y-10">
            <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/5 border border-white/10 rounded-full animate-bounce">
               <Sparkles className="w-4 h-4 text-gold" />
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">مركز التميز المعرفي للنسيج</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-black leading-tight tracking-tighter">
               احترف صناعة <span className="text-gold">الأنسجة</span> <br /> 
               بقيادة خبراء الصناعة العالمية
            </h1>
            
            <p className="text-lg text-white/40 max-w-2xl mx-auto font-medium leading-relaxed">
               أول منصة تعليمية متخصصة في سلاسل إمداد النسيج، مراقبة الجودة، والابتكار المستدام في منطقة المغرب العربي.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
               <button className="px-10 py-5 bg-gold text-charcoal font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-2xl shadow-gold/20 flex items-center gap-3 hover:scale-105 transition-all">
                  استكشف الدورات <ArrowRight className="w-4 h-4" />
               </button>
               <button className="px-10 py-5 bg-white/5 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl border border-white/10 flex items-center gap-3 hover:bg-white/10 transition-all">
                  شاهد العرض التعريفي <PlayCircle className="w-5 h-5 text-gold" />
               </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-20 max-w-4xl mx-auto">
               {[
                 { label: 'دورة متخصصة', value: '45+', icon: <BookOpen className="w-5 h-5" /> },
                 { label: 'متعلم نشط', value: '12K+', icon: <Users className="w-5 h-5" /> },
                 { label: 'شهادة معتمدة', value: '8K+', icon: <Award className="w-5 h-5" /> },
                 { label: 'خبير دولي', value: '15+', icon: <Sparkles className="w-5 h-5" /> },
               ].map((stat, i) => (
                 <div key={i} className="space-y-1">
                    <div className="text-3xl font-black text-gold">{stat.value}</div>
                    <div className="text-[10px] font-black text-white/30 uppercase tracking-widest">{stat.label}</div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* ─── Search & Categories ─── */}
      <section className="px-6 py-12 max-w-7xl mx-auto">
         <div className="bg-[#1A1917] border border-white/5 p-8 rounded-[3rem] shadow-2xl space-y-10">
            <div className="flex flex-col lg:flex-row items-center gap-8">
               <div className="relative flex-1 group w-full">
                  <Search className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-gold transition-colors" />
                  <input 
                    type="text" 
                    placeholder="ابحث عن مهارة، خامة، أو خبير..."
                    className="w-full bg-white/[0.02] border border-white/5 py-5 pr-14 pl-6 rounded-2xl outline-none focus:border-gold/50 transition-all text-sm"
                  />
               </div>
               <div className="flex items-center gap-4 w-full lg:w-auto">
                  <button className="flex-1 lg:flex-none px-6 py-5 bg-white/5 rounded-2xl border border-white/10 text-xs font-black flex items-center gap-3 hover:bg-white/10 transition-all">
                     <Filter className="w-4 h-4 text-gold" /> تصفية النتائج
                  </button>
               </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
               <span className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-4">التصنيفات الرائجة:</span>
               {CATEGORIES.map((cat, i) => (
                 <button key={i} className="flex items-center gap-3 px-5 py-3 bg-white/5 border border-white/5 rounded-xl hover:border-gold/30 hover:bg-gold/5 transition-all group">
                    <span className="text-white/40 group-hover:text-gold transition-colors">{cat.icon}</span>
                    <span className="text-xs font-bold">{cat.name}</span>
                    <span className="px-2 py-0.5 bg-white/5 rounded text-[9px] text-white/20">{cat.count}</span>
                 </button>
               ))}
            </div>
         </div>
      </section>

      {/* ─── Featured Courses ─── */}
      <section className="px-6 py-20 max-w-7xl mx-auto space-y-12">
         <div className="flex items-end justify-between border-b border-white/5 pb-8">
            <div className="space-y-2">
               <h2 className="text-3xl font-black">أحدث الدورات التدريبية</h2>
               <p className="text-white/40 text-sm">استكشف برامجنا التعليمية المصممة لرفع كفاءة سلاسل الإمداد.</p>
            </div>
            <button className="px-6 py-3 bg-white/5 rounded-xl text-xs font-black hover:text-gold transition-all flex items-center gap-3">
               مشاهدة الكل <ArrowRight className="w-4 h-4" />
            </button>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {MOCK_COURSES.map(course => (
              <CourseCard key={course.id} {...course} />
            ))}
         </div>
      </section>

      {/* ─── Blog & News ─── */}
      <section className="px-6 py-20 max-w-7xl mx-auto space-y-12 bg-white/[0.01] rounded-[4rem] border border-white/5">
         <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-burgundy/10 border border-burgundy/20 rounded-full">
               <Newspaper className="w-3.5 h-3.5 text-burgundy" />
               <span className="text-[9px] font-black uppercase tracking-widest text-burgundy">مدونة النسيج</span>
            </div>
            <h2 className="text-4xl font-black">أخبار واتجاهات الصناعة</h2>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Featured Post */}
            <div className="group relative aspect-[16/9] rounded-[3rem] overflow-hidden border border-white/10">
               <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1000" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
               <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent p-10 flex flex-col justify-end gap-4">
                  <div className="flex items-center gap-4">
                     <span className="text-[10px] font-black text-gold uppercase tracking-widest">تحليلات السوق</span>
                     <span className="text-[10px] text-white/40 font-bold">14 ماي 2026</span>
                  </div>
                  <h3 className="text-3xl font-black text-white group-hover:text-gold transition-colors">مستقبل الأقمشة الذكية في السوق الجزائري 2026</h3>
                  <p className="text-white/60 text-sm max-w-lg">كيف تؤثر تقنيات النانو في تغيير خريطة إنتاج الملابس الرياضية والطبية...</p>
               </div>
            </div>

            {/* List Posts */}
            <div className="space-y-6">
               {[
                 { title: 'مقابلة مع مدير مصنع "تيسيج دي ليون" حول الاستدامة', cat: 'مقابلات', date: '12 ماي' },
                 { title: 'أهم 5 معايير لجودة الأقطان العضوية المعتمدة', cat: 'تقني', date: '10 ماي' },
                 { title: 'دليل المشاركة في معرض النسيج الدولي بباريس', cat: 'فعاليات', date: '08 ماي' },
               ].map((post, i) => (
                 <div key={i} className="flex items-center gap-6 p-6 bg-white/5 rounded-3xl border border-transparent hover:border-white/10 hover:bg-white/10 transition-all group cursor-pointer">
                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex flex-col items-center justify-center text-white/20 group-hover:text-gold transition-colors">
                       <span className="text-lg font-black">{i+1}</span>
                    </div>
                    <div className="flex-1 space-y-1">
                       <div className="flex items-center gap-3">
                          <span className="text-[9px] font-black text-gold uppercase tracking-widest">{post.cat}</span>
                          <span className="text-[9px] text-white/20">{post.date}</span>
                       </div>
                       <h4 className="text-lg font-bold text-white group-hover:text-gold transition-all">{post.title}</h4>
                    </div>
                    <ArrowRight className="w-5 h-5 text-white/10 group-hover:text-gold -translate-x-4 group-hover:translate-x-0 transition-all" />
                 </div>
               ))}
            </div>
         </div>
      </section>

    </div>
  );
}
