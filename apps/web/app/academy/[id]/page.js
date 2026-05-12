import Image from 'next/image';
import { Play, Clock, Users, Star, ChevronLeft, Lock } from 'lucide-react';
import Link from 'next/link';

async function getCourse(id) {
  try {
    const res = await fetch(`http://localhost:3005/api/v1/courses/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch (e) { return null; }
}

export default async function CoursePage({ params }) {
  const course = await getCourse(params.id);
  if (!course) return <div className="p-20 text-center">الدورة غير موجودة</div>;

  const totalDuration = course.chapters.reduce(
    (sum, ch) => sum + ch.lessons.reduce((s, l) => s + (l.duration || 0), 0),
    0
  );

  return (
    <div className="max-w-5xl mx-auto pb-32">
      {/* Course Hero / Preview */}
      <div className="relative aspect-video w-full bg-gray-900 overflow-hidden sm:rounded-[40px] mt-4 shadow-2xl">
        <Image
          src={course.thumbnail || 'https://via.placeholder.com/1280x720'}
          alt={course.title.ar}
          fill
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <button className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl transform transition-transform hover:scale-110 active:scale-95 group">
            <Play className="w-10 h-10 text-burgundy fill-burgundy group-hover:text-gold group-hover:fill-gold transition-colors" />
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mt-10 px-4">
        {/* Left Side: Info & Curriculum */}
        <div className="lg:col-span-2 space-y-10">
          <header className="space-y-4">
            <div className="flex gap-2">
               <span className="bg-gold/10 text-gold-dark px-3 py-1 rounded-full text-[10px] font-bold uppercase">{course.category}</span>
               <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-[10px] font-bold uppercase">{course.level}</span>
            </div>
            <h1 className="text-4xl font-black text-gray-900 leading-tight">{course.title.ar}</h1>
            
            <div className="flex items-center gap-6 text-sm text-gray-400 font-medium">
              <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> {course.enrollmentCount} طالب</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {Math.round(totalDuration / 60)} دقيقة</span>
              <span className="flex items-center gap-1.5 text-gold"><Star className="w-4 h-4 fill-gold" /> {course.rating}</span>
            </div>
          </header>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">وصف الدورة</h2>
            <p className="text-gray-600 leading-relaxed bg-white p-6 rounded-3xl border border-gray-100 italic">
               "{course.description}"
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">محتوى الدورة التعليمي</h2>
            <div className="space-y-4">
              {course.chapters.map((chapter, i) => (
                <div key={chapter.id} className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
                  <div className="p-5 bg-gray-50/50 flex items-center justify-between">
                    <h3 className="font-bold text-gray-800 flex items-center gap-3">
                      <span className="w-8 h-8 bg-burgundy text-white rounded-lg flex items-center justify-center text-xs">{i + 1}</span>
                      {chapter.title}
                    </h3>
                    <span className="text-xs text-gray-400 font-bold">{chapter.lessons.length} دروس</span>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {chapter.lessons.map((lesson) => (
                      <div key={lesson.id} className="p-4 px-6 flex justify-between items-center group hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-4">
                           {lesson.isFree ? <Play className="w-4 h-4 text-burgundy" /> : <Lock className="w-4 h-4 text-gray-300" />}
                           <span className="text-sm font-medium text-gray-700">{lesson.title}</span>
                           {lesson.isFree && <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">عرض مجاني</span>}
                        </div>
                        <span className="text-[10px] text-gray-400 font-bold">{Math.round((lesson.duration || 0) / 60)} دقيقة</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Side: Instructor & Pricing */}
        <aside className="space-y-6">
           <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-xl space-y-6 sticky top-24">
              <div className="text-center space-y-4">
                 <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">سعر الدورة</p>
                 <div className="flex items-center justify-center gap-3">
                    <span className="text-4xl font-black text-burgundy">{course.discountPrice || course.price} <span className="text-sm">دج</span></span>
                    {course.discountPrice && <span className="text-lg text-gray-300 line-through">{course.price}</span>}
                 </div>
              </div>

              <button className="w-full py-5 bg-burgundy text-white rounded-2xl font-black shadow-lg shadow-burgundy/20 hover:scale-[1.02] active:scale-95 transition-all">
                 اشترك في الدورة الآن
              </button>

              <div className="pt-6 border-t space-y-4">
                 <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden">
                       <img src={course.trainer.avatar || 'https://via.placeholder.com/100'} className="w-full h-full object-cover" />
                    </div>
                    <div>
                       <p className="font-bold text-gray-800 text-sm">{course.trainer.fullName}</p>
                       <p className="text-[10px] text-gray-400 font-bold">مدرّب معتمد في خامة</p>
                    </div>
                 </div>
              </div>

              <ul className="space-y-3 pt-4">
                 {['وصول مدى الحياة', 'شهادة إتمام معتمدة', 'دعم مباشر من المدرب', 'محتوى عالي الجودة'].map(feat => (
                   <li key={feat} className="flex items-center gap-2 text-xs font-bold text-gray-500">
                      <ChevronLeft className="w-4 h-4 text-gold" /> {feat}
                   </li>
                 ))}
              </ul>
           </div>
        </aside>
      </div>
    </div>
  );
}
