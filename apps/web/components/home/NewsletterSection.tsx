'use client';

import React from 'react';
import { Send } from 'lucide-react';

export default function NewsletterSection() {
  return (
    <section className="py-24 px-4" dir="rtl">
      <div className="max-w-5xl mx-auto rounded-[3rem] bg-gradient-to-br from-charcoal to-burgundy p-12 lg:p-20 relative overflow-hidden shadow-2xl">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

        <div className="relative z-10 flex flex-col items-center text-center space-y-8">
           <div className="w-20 h-20 bg-gold/20 rounded-3xl flex items-center justify-center rotate-12">
              <Send className="w-10 h-10 text-gold" />
           </div>
           <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-black text-white">ابقَ على اطلاع دائم</h2>
              <p className="text-gold-light/60 text-lg">اشترك في نشرتنا البريدية لتصلك أحدث الخامات والتحليلات السوقية حصرياً.</p>
           </div>
           
           <form className="w-full max-w-md flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="بريدك الإلكتروني"
                className="flex-1 bg-white/10 border-2 border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-gold transition-all"
              />
              <button className="bg-gold text-charcoal px-8 py-4 rounded-2xl font-black hover:bg-gold-light transition-all transform active:scale-95 shadow-lg shadow-gold/20">
                 اشترك الآن
              </button>
           </form>
        </div>
      </div>
    </section>
  );
}
