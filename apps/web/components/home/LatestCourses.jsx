'use client';

import React from 'react';
import { GraduationCap, BookOpen, Clock, ArrowRight } from 'lucide-react';

const COURSES = [
  { title: 'تقنيات الصباغة الطبيعية', category: 'صناعة النسيج', duration: '4 أسابيع' },
  { title: 'إدارة سلاسل التوريد B2B', category: 'إدارة الأعمال', duration: '6 أسابيع' },
  { title: 'تصميم الباترون الرقمي', category: 'تصميم الأزياء', duration: '8 أسابيع' },
];

export default function LatestCourses() {
  return (
    <section className="py-24 bg-ecru/20" dir="rtl">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-charcoal rounded-[3rem] p-10 md:p-16 relative overflow-hidden shadow-2xl">
           {/* Decorative background circle */}
           <div className="absolute -top-24 -left-24 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
           <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />

           <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8 relative z-10">
              <div className="space-y-4">
                 <div className="flex items-center gap-2 text-gold">
                    <GraduationCap className="w-5 h-5" />
                    <span className="text-xs font-black uppercase tracking-widest">أكاديمية خامة</span>
                 </div>
                 <h2 className="text-4xl font-black text-ecru">طور مهاراتك التقنية</h2>
                 <p className="text-gold-light/40 max-w-xl">دورات تدريبية متخصصة يشرف عليها خبراء الصناعة لتحسين كفاءة إنتاجك وتجارتك.</p>
              </div>
              <button className="bg-gold text-charcoal px-8 py-4 rounded-2xl font-black hover:bg-gold-light transition-all flex items-center gap-2 group">
                 تصفح الأكاديمية
                 <ArrowRight className="w-4 h-4 group-hover:-translate-x-1 transition-transform rtl:rotate-180" />
              </button>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              {COURSES.map((course, i) => (
                <div key={i} className="bg-white/5 border border-white/5 p-8 rounded-[2.5rem] hover:bg-white/10 hover:border-gold/20 transition-all group">
                   <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center mb-6 text-gold group-hover:scale-110 transition-transform">
                      <BookOpen className="w-6 h-6" />
                   </div>
                   <span className="text-[10px] font-black text-gold uppercase mb-2 block">{course.category}</span>
                   <h3 className="text-xl font-black text-ecru mb-6">{course.title}</h3>
                   <div className="flex items-center gap-2 text-xs font-bold text-gold-light/30">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </section>
  );
}
