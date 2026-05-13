'use client';

import React from 'react';
import Link from 'next/link';
import { Globe, Share2, MessageSquare, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white pt-24 pb-12 border-t border-white/5" dir="rtl">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          {/* Brand Column */}
          <div className="space-y-8 text-right">
            <div className="space-y-2">
              <h2 className="text-4xl font-black text-gold tracking-tighter">خامة</h2>
              <p className="text-xs font-bold text-gold-light/40 uppercase tracking-widest">التكنولوجيا في خدمة النسيج</p>
            </div>
            <p className="text-muted leading-relaxed max-w-xs">
              أول منصة رقمية متكاملة في المغرب العربي وأفريقيا لربط محترفي صناعة النسيج والأزياء بذكاء واحترافية.
            </p>
            <div className="flex gap-4">
               <a href="#" className="p-3 bg-white/5 rounded-xl hover:bg-gold hover:text-charcoal transition-all"><Globe className="w-5 h-5" /></a>
               <a href="#" className="p-3 bg-white/5 rounded-xl hover:bg-gold hover:text-charcoal transition-all"><Share2 className="w-5 h-5" /></a>
               <a href="#" className="p-3 bg-white/5 rounded-xl hover:bg-gold hover:text-charcoal transition-all"><MessageSquare className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-8">
            <h3 className="text-xl font-black text-white">روابط سريعة</h3>
            <ul className="space-y-4">
               <li><Link href="/fabrics" className="text-muted hover:text-gold transition-colors">كتالوج الأقمشة</Link></li>
               <li><Link href="/suppliers" className="text-muted hover:text-gold transition-colors">دليل الموردين</Link></li>
               <li><Link href="/academy" className="text-muted hover:text-gold transition-colors">أكاديمية خامة</Link></li>
               <li><Link href="/rfq" className="text-muted hover:text-gold transition-colors">طلبات العروض</Link></li>
            </ul>
          </div>

          {/* For Suppliers */}
          <div className="space-y-8">
            <h3 className="text-xl font-black text-white">للموردين</h3>
            <ul className="space-y-4">
               <li><Link href="/dashboard/supplier" className="text-muted hover:text-gold transition-colors">لوحة التحكم</Link></li>
               <li><Link href="/tools" className="text-muted hover:text-gold transition-colors">أدوات القياس</Link></li>
               <li><Link href="/glossary" className="text-muted hover:text-gold transition-colors">القاموس التقني</Link></li>
               <li><Link href="/contact" className="text-muted hover:text-gold transition-colors">انضم كمورد</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <h3 className="text-xl font-black text-white">تواصل معنا</h3>
            <ul className="space-y-6">
               <li className="flex gap-4">
                  <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center shrink-0">
                     <MapPin className="w-5 h-5 text-gold" />
                  </div>
                  <span className="text-muted leading-tight">حي الأعمال، الجزائر العاصمة، الجزائر 🇩🇿</span>
               </li>
               <li className="flex gap-4">
                  <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center shrink-0">
                     <Phone className="w-5 h-5 text-gold" />
                  </div>
                  <span className="text-muted ltr-force">+213 (0) 23 45 67 89</span>
               </li>
               <li className="flex gap-4">
                  <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center shrink-0">
                     <Mail className="w-5 h-5 text-gold" />
                  </div>
                  <span className="text-muted">contact@khama.dz</span>
               </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="flex flex-wrap gap-8 justify-center">
              <Link href="/terms" className="text-[10px] font-bold text-muted hover:text-white uppercase tracking-widest transition-colors">الشروط والأحكام</Link>
              <Link href="/privacy" className="text-[10px] font-bold text-muted hover:text-white uppercase tracking-widest transition-colors">سياسة الخصوصية</Link>
              <Link href="/cookies" className="text-[10px] font-bold text-muted hover:text-white uppercase tracking-widest transition-colors">ملفات تعريف الارتباط</Link>
           </div>
           
           <p className="text-[10px] font-bold text-muted/60 uppercase tracking-widest">
              © {new Date().getFullYear()} خامة. صنع بحب في الجزائر 🇩🇿
           </p>
        </div>
      </div>
    </footer>
  );
}
