'use client';

import React from 'react';
import { Send } from 'lucide-react';

export default function Newsletter() {
  return (
    <section className="py-24 px-6 relative overflow-hidden bg-charcoal">
      {/* Abstract Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-burgundy via-charcoal to-black opacity-90" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-burgundy/20 rounded-full blur-[120px] -ml-64 -mb-64" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[3rem] p-8 md:p-16 text-center shadow-2xl">
          <span className="inline-block p-3 rounded-2xl bg-gold/10 text-gold mb-6">
            <Send className="w-6 h-6" />
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">انضم إلى مجتمع خبراء المنسوجات</h2>
          <p className="text-gray-400 mb-10 text-lg">ابقَ على اطلاع بأحدث الخامات العالمية، تقارير السوق، وأفضل عروض المناقصات الحصرية.</p>
          
          <form className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="بريدك الإلكتروني المهني" 
              className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-gold/50 transition-all text-right"
              dir="rtl"
            />
            <button className="bg-gold text-charcoal px-10 py-5 rounded-2xl font-black hover:bg-white hover:scale-105 transition-all shadow-xl shadow-gold/20">
              اشترك الآن
            </button>
          </form>
          <p className="mt-6 text-[10px] text-gray-500 uppercase tracking-widest">نحن نحترم خصوصيتك. يمكنك إلغاء الاشتراك في أي وقت.</p>
        </div>
      </div>
    </section>
  );
}
