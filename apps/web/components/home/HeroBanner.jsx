'use client';
import { useState, useEffect } from 'react';

const banners = [
  { id: 1, title: 'عروض الموسم', subtitle: 'خصومات تصل إلى 40%', color: 'from-burgundy to-burgundy-dark', link: '/offers' },
  { id: 2, title: 'كتالوج العينات', subtitle: 'اطلب عيناتك الآن مجاناً', color: 'from-gold-dark to-gold', link: '/catalog' },
  { id: 3, title: 'المصانع الذهبية', subtitle: 'شركاء النجاح الموثوقين', color: 'from-gray-700 to-gray-900', link: '/factories' },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="relative h-48 sm:h-64 md:h-96 overflow-hidden bg-gray-100">
      {banners.map((banner, i) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out transform
            ${i === current ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
        >
          <div className={`w-full h-full bg-gradient-to-br ${banner.color} flex items-center px-8 sm:px-16`}>
             <div className="text-white space-y-2 sm:space-y-4">
                <h2 className="text-2xl sm:text-4xl font-bold leading-tight">{banner.title}</h2>
                <p className="text-white/80 text-sm sm:text-lg">{banner.subtitle}</p>
                <button className="bg-gold hover:bg-gold-dark text-white px-6 py-2 rounded-xl text-sm font-bold transition-all transform hover:scale-105">
                  اكتشف المزيد
                </button>
             </div>
          </div>
        </div>
      ))}
      
      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300
              ${i === current ? 'bg-white w-8 shadow-sm' : 'bg-white/40 w-2 hover:bg-white/60'}`}
          />
        ))}
      </div>
    </div>
  );
}
