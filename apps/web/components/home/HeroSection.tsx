'use client';

import React, { useEffect, useState } from 'react';
import { ArrowRight, Play, ChevronDown, Sparkles, Globe, Factory, Users, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

// ─── Sub-Components ──────────────────────────────────────────────────────────

const StatCounter = ({ endValue, label, icon: Icon }: { endValue: string, label: string, icon: any }) => {
  return (
    <div className="flex flex-col items-center md:items-start group">
      <div className="flex items-center gap-2 mb-1">
        <Icon className="w-4 h-4 text-gold group-hover:scale-110 transition-transform" />
        <span className="text-2xl md:text-3xl font-bold text-white tracking-tighter">
          {endValue}
        </span>
      </div>
      <p className="text-[10px] md:text-xs text-ecru/60 uppercase tracking-widest font-medium">
        {label}
      </p>
    </div>
  );
};

// ─── Main Component ──────────────────────────────────────────────────────────

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-[100vh] w-full overflow-hidden bg-charcoal flex flex-col justify-center font-body">
      
      {/* ─── Background & Video Layer ─── */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/80 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent z-10" />
        
        {/* Placeholder Image (Fallback) */}
        <img 
          src="https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=2000&auto=format&fit=crop"
          alt="Textile background"
          className="w-full h-full object-cover opacity-40 scale-105 animate-slow-zoom"
        />
        
        {/* CSS Fiber Particles Simulation */}
        <div className="absolute inset-0 z-20 pointer-events-none opacity-30">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute bg-gold/40 rounded-full animate-fiber-float"
              style={{
                width: Math.random() * 2 + 1 + 'px',
                height: Math.random() * 100 + 50 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animationDelay: Math.random() * 5 + 's',
                animationDuration: Math.random() * 10 + 15 + 's'
              }}
            />
          ))}
        </div>
      </div>

      {/* ─── Content Layer ─── */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 w-full pt-20">
        <div className="max-w-3xl text-right md:text-left flex flex-col items-center md:items-start" dir="rtl">
          
          {/* Badge */}
          <div className={`
            inline-flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-8
            transition-all duration-1000 transform
            ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}>
            <Sparkles className="w-3 h-3 text-gold animate-pulse" />
            <span className="text-[10px] md:text-xs text-ecru font-bold tracking-widest uppercase">
              ✦ المنصة الأولى للنسيج في المغرب العربي وإفريقيا
            </span>
          </div>

          {/* Headline */}
          <h1 className={`
            text-display !text-4xl md:text-7xl text-white mb-6 leading-[1.1]
            transition-all duration-1000 delay-300
            ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}
          `}>
            التميز النسيجي، <br />
            <span className="text-gold italic font-light">بنقرة واحدة.</span>
          </h1>

          {/* Subtitle */}
          <p className={`
            text-body md:text-xl text-ecru/80 mb-10 max-w-xl leading-relaxed
            transition-all duration-1000 delay-500
            ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}>
            خامة تصل بين رواد صناعة النسيج: <br />
            مشترون، موردون، ومصممون في بيئة عمل احترافية متكاملة.
          </p>

          {/* CTAs */}
          <div className={`
            flex flex-col sm:flex-row gap-4 w-full sm:w-auto
            transition-all duration-1000 delay-700
            ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}>
            <Link href="/cat" className="bg-gold text-white px-8 py-4 rounded-xl text-label flex items-center justify-center gap-3 hover:bg-white hover:text-charcoal transition-all group shadow-2xl shadow-gold/20">
              استكشف الكتالوج <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <button className="bg-white/5 border border-white/20 backdrop-blur-md text-white px-8 py-4 rounded-xl text-label flex items-center justify-center gap-3 hover:bg-white/10 transition-all">
              نشر عرض جديد
            </button>
            <button className="flex items-center justify-center gap-2 text-ecru hover:text-gold transition-colors text-label">
              اكتشف خامة برو <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Stats Row */}
          <div className={`
            grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 border-t border-white/10 pt-10 w-full
            transition-all duration-1000 delay-1000
            ${isLoaded ? 'opacity-100' : 'opacity-0'}
          `}>
            <StatCounter endValue="12,400+" label="خامة ومنسوجات" icon={ShoppingBag} />
            <StatCounter endValue="850+" label="مورد معتمد" icon={Factory} />
            <StatCounter endValue="47" label="دولة مغطاة" icon={Globe} />
            <StatCounter endValue="98%" label="رضا العملاء" icon={Users} />
          </div>

        </div>
      </div>

      {/* ─── Scroll Indicator ─── */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 animate-bounce hidden md:block">
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-gold rounded-full" />
        </div>
      </div>

      {/* ─── CSS Animations ─── */}
      <style jsx global>{`
        @keyframes fiber-float {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-100px) rotate(180deg); opacity: 0.1; }
        }
        @keyframes slow-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s ease-in-out infinite alternate;
        }
        .animate-fiber-float {
          animation: fiber-float linear infinite;
        }
      `}</style>

    </section>
  );
}
