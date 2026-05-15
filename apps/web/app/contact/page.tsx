'use client';

import React from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-20" dir="rtl">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
           <div className="space-y-8">
              <h1 className="text-5xl font-black text-burgundy tracking-tight">تواصل مع <br /><span className="text-gold">فريق خامة</span></h1>
              <p className="text-muted text-lg font-medium">نحن هنا لمساعدتك في بناء رحلتك في عالم النسيج. سواء كنت مشترياً أو مورداً، فريقنا جاهز للرد على استفساراتك.</p>
              
              <div className="space-y-6 pt-10">
                 <div className="flex gap-6 items-center">
                    <div className="w-12 h-12 bg-ecru/30 rounded-2xl flex items-center justify-center text-gold"><Phone /></div>
                    <div className="space-y-1">
                       <p className="text-[10px] font-black uppercase text-muted">الهاتف</p>
                       <p className="font-black text-burgundy">+213 (0) 23 45 67 89</p>
                    </div>
                 </div>
                 <div className="flex gap-6 items-center">
                    <div className="w-12 h-12 bg-ecru/30 rounded-2xl flex items-center justify-center text-gold"><Mail /></div>
                    <div className="space-y-1">
                       <p className="text-[10px] font-black uppercase text-muted">البريد الإلكتروني</p>
                       <p className="font-black text-burgundy">contact@khama.dz</p>
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-ecru/20 p-12 rounded-[3rem] border border-ecru space-y-8">
              <h3 className="text-2xl font-black text-burgundy">أرسل لنا رسالة</h3>
              <form className="space-y-6">
                 <div className="grid grid-cols-2 gap-6">
                    <input type="text" placeholder="الاسم" className="bg-white p-5 rounded-2xl outline-none focus:border-gold border border-ecru w-full text-sm font-bold" />
                    <input type="email" placeholder="البريد" className="bg-white p-5 rounded-2xl outline-none focus:border-gold border border-ecru w-full text-sm font-bold" />
                 </div>
                 <textarea placeholder="رسالتك..." rows={5} className="bg-white p-5 rounded-2xl outline-none focus:border-gold border border-ecru w-full text-sm font-bold resize-none"></textarea>
                 <button className="w-full py-5 bg-burgundy text-white font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-burgundy-dark transition-all">
                    إرسال <Send className="w-4 h-4" />
                 </button>
              </form>
           </div>
        </div>
      </div>
    </div>
  );
}
