'use client';

import React from 'react';
import { Play, BookOpen, Clock, Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const COURSES = [
  { id: 1, title: 'أساسيات النسيج التقني', level: 'مبتدئ', duration: '4 ساعات', rating: 4.8, students: 120, image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=800&auto=format&fit=crop' },
  { id: 2, title: 'إدارة الجودة في مصانع الملابس', level: 'متوسط', duration: '6 ساعات', rating: 4.9, students: 85, image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=800&auto=format&fit=crop' },
  { id: 3, title: 'التصدير للأسواق الأوروبية (GOTS)', level: 'متقدم', duration: '8 ساعات', rating: 5.0, students: 45, image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop' },
];

export default function AcademyPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20" dir="rtl">
      <div className="max-w-7xl mx-auto px-4">
        <header className="mb-12 space-y-4">
           <h1 className="text-4xl font-black text-charcoal">أكاديمية خامة للتدريب</h1>
           <p className="text-muted text-lg max-w-2xl">طوّر مهاراتك التقنية والتجارية في صناعة المنسوجات من خلال دورات متخصصة يقدمها خبراء الصناعة.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {COURSES.map(course => (
             <div key={course.id} className="bg-white rounded-3xl border border-border overflow-hidden shadow-sm hover:shadow-xl transition-all group">
                <div className="h-48 relative overflow-hidden">
                   <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                   <div className="absolute inset-0 bg-black/20" />
                   <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black text-burgundy">
                      {course.level}
                   </div>
                </div>
                <div className="p-6 space-y-4">
                   <h3 className="text-xl font-bold text-charcoal leading-tight">{course.title}</h3>
                   <div className="flex items-center gap-4 text-xs text-muted font-medium">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {course.duration}</span>
                      <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-gold fill-gold" /> {course.rating}</span>
                   </div>
                   <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-muted uppercase tracking-widest">{course.students} طالب مسجل</span>
                      <Link href={`/academy/${course.id}`} className="p-2 bg-ecru text-burgundy rounded-lg hover:bg-burgundy hover:text-white transition-all">
                         <ArrowRight className="w-5 h-5 rotate-180" />
                      </Link>
                   </div>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
