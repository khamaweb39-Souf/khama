'use client';

import React from 'react';
import { 
  Play, Users, Star, Clock, 
  BarChart, Award, ChevronRight,
  Bookmark
} from 'lucide-react';

interface CourseCardProps {
  title: string;
  instructor: string;
  image: string;
  level: 'مبتدئ' | 'متوسط' | 'متقدم';
  duration: string;
  lessons: number;
  rating: number;
  students: number;
  price: string | 'free';
  progress?: number;
}

export default function CourseCard({
  title, instructor, image, level, 
  duration, lessons, rating, students, 
  price, progress
}: CourseCardProps) {
  return (
    <div className="group relative bg-[#1A1917] border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-gold/30 transition-all duration-500 hover:-translate-y-2 shadow-2xl" dir="rtl">
      
      {/* Cover Image */}
      <div className="relative aspect-video overflow-hidden">
         <img 
           src={image} 
           alt={title} 
           className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-[#1A1917] via-transparent to-transparent opacity-60" />
         
         {/* Level Badge */}
         <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full">
            <span className="text-[9px] font-black text-white uppercase tracking-widest">{level}</span>
         </div>

         {/* Bookmark */}
         <button className="absolute top-4 left-4 p-2.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl text-white/40 hover:text-gold transition-all">
            <Bookmark className="w-4 h-4" />
         </button>

         {/* Play Overlay */}
         <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="w-14 h-14 bg-gold rounded-full flex items-center justify-center text-charcoal shadow-2xl shadow-gold/40 scale-75 group-hover:scale-100 transition-transform duration-500">
               <Play className="w-6 h-6 fill-current" />
            </div>
         </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-5">
         <div className="space-y-2">
            <h3 className="text-lg font-black text-white leading-tight group-hover:text-gold transition-colors">
               {title}
            </h3>
            <p className="text-xs text-white/40 font-medium">بإشراف الخبير: {instructor}</p>
         </div>

         {/* Stats Grid */}
         <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/5">
            <div className="flex items-center gap-2">
               <Clock className="w-3.5 h-3.5 text-gold" />
               <span className="text-[10px] font-bold text-white/60">{duration}</span>
            </div>
            <div className="flex items-center gap-2">
               <BarChart className="w-3.5 h-3.5 text-gold" />
               <span className="text-[10px] font-bold text-white/60">{lessons} درس</span>
            </div>
            <div className="flex items-center gap-2">
               <Star className="w-3.5 h-3.5 text-gold fill-gold/20" />
               <span className="text-[10px] font-bold text-white/60">{rating} (200+)</span>
            </div>
            <div className="flex items-center gap-2">
               <Users className="w-3.5 h-3.5 text-gold" />
               <span className="text-[10px] font-bold text-white/60">{students} طالب</span>
            </div>
         </div>

         {/* Progress Bar (Optional) */}
         {progress !== undefined && (
           <div className="space-y-2">
              <div className="flex justify-between text-[9px] font-black text-white/40 uppercase">
                 <span>تقدمك</span>
                 <span>{progress}%</span>
              </div>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                 <div className="h-full bg-gold rounded-full transition-all duration-1000" style={{ width: `${progress}%` }} />
              </div>
           </div>
         )}

         {/* Footer */}
         <div className="flex items-center justify-between pt-2">
            <div className="flex items-baseline gap-1">
               {price === 'free' ? (
                 <span className="text-sm font-black text-green-400">مجاني</span>
               ) : (
                 <>
                   <span className="text-xl font-black text-white">{price}</span>
                   <span className="text-[10px] font-bold text-white/30">DZD</span>
                 </>
               )}
            </div>
            <button className="flex items-center gap-2 text-[10px] font-black text-gold uppercase tracking-widest hover:gap-3 transition-all">
               ابدأ الآن <ChevronRight className="w-4 h-4" />
            </button>
         </div>
      </div>

    </div>
  );
}
