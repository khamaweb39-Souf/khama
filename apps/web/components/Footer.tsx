'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Camera, Send, Briefcase, Globe, 
  Mail, Phone, MapPin, ExternalLink,
  ChevronLeft
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0D0C0A] pt-24 pb-12 text-white overflow-hidden" dir="rtl">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          {/* Column 1: About */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gold flex items-center justify-center rounded-xl rotate-3 group hover:rotate-0 transition-transform">
                <span className="text-2xl font-black text-charcoal">خ</span>
              </div>
              <span className="text-3xl font-black tracking-tighter">خـامـة</span>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm">
              أول منصة رقمية في الجزائر متخصصة في سلاسل إمداد الصناعات النسيجية والجلود. نربط بين المبدعين، المصنعين والموردين لخلق قيمة مضافة للإنتاج الوطني.
            </p>
            <div className="flex gap-4">
              {[Camera, Send, Briefcase, Globe].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-gold hover:text-charcoal transition-all">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-8">
            <h4 className="text-lg font-black text-gold">روابط سريعة</h4>
            <ul className="space-y-4">
              {['كتالوج الأقمشة', 'الموردين المعتمدين', 'أكاديمية خامة', 'المناقصات الحالية', 'قاموس المنسوجات'].map((link, i) => (
                <li key={i}>
                  <Link href="#" className="text-gray-400 hover:text-white hover:translate-x-[-8px] transition-all flex items-center gap-2 group">
                    <ChevronLeft className="w-3 h-3 text-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: For Suppliers */}
          <div className="space-y-8">
            <h4 className="text-lg font-black text-gold">للموردين والمصانع</h4>
            <ul className="space-y-4">
              {['تسجيل كمورد', 'خدمات التوثيق', 'الوصول للأسواق', 'حلول الدفع', 'الدعم اللوجستي'].map((link, i) => (
                <li key={i}>
                  <Link href="#" className="text-gray-400 hover:text-white hover:translate-x-[-8px] transition-all flex items-center gap-2 group">
                    <ChevronLeft className="w-3 h-3 text-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="space-y-8">
            <h4 className="text-lg font-black text-gold">تواصل معنا</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4 text-gray-400">
                <MapPin className="w-5 h-5 text-gold shrink-0" />
                <p className="text-sm">حي الأعمال، باب الزوار، الجزائر العاصمة</p>
              </div>
              <div className="flex items-start gap-4 text-gray-400">
                <Phone className="w-5 h-5 text-gold shrink-0" />
                <p className="text-sm ltr-force">+213 (0) 23 45 67 89</p>
              </div>
              <div className="flex items-start gap-4 text-gray-400">
                <Mail className="w-5 h-5 text-gold shrink-0" />
                <p className="text-sm">contact@khama.dz</p>
              </div>
            </div>
            {/* Mini Map Visualization */}
            <div className="h-24 w-full bg-white/5 rounded-2xl border border-white/10 overflow-hidden relative">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/az-subtle.png')] opacity-20" />
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-3 h-3 bg-gold rounded-full animate-ping" />
                  <div className="w-3 h-3 bg-gold rounded-full absolute top-0" />
               </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-gray-500 text-xs flex items-center gap-4">
             <span>© {currentYear} منصة خامة. جميع الحقوق محفوظة.</span>
             <Link href="#" className="hover:text-white transition-colors">سياسة الخصوصية</Link>
             <Link href="#" className="hover:text-white transition-colors">اتفاقية الاستخدام</Link>
          </div>
          <div className="flex items-center gap-2">
             <span className="text-gray-500 text-xs uppercase tracking-widest font-black">صنع بكل فخر في الجزائر</span>
             <span className="text-lg">🇩🇿</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
