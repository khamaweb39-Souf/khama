'use client';

import React from 'react';
import { 
  Mail, Phone, MapPin, 
  Send, MessageSquare, Globe, 
  ArrowRight, CheckCircle 
} from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#FDFCFB] pb-32 pt-32" dir="rtl">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid lg:grid-cols-2 gap-24 items-start">
           
           {/* Left: Contact Info */}
           <div className="space-y-16">
              <div className="space-y-6">
                 <span className="text-[10px] font-black text-gold uppercase tracking-[0.3em]">تواصل معنا</span>
                 <h1 className="text-6xl font-black text-burgundy tracking-tighter">نحن هنا لدعم <br />نشاطك التجاري</h1>
                 <p className="text-xl text-charcoal/60 leading-relaxed font-medium">سواء كنت موردًا يتطلع للتوسع أو مصنعاً يبحث عن خامات متميزة، فريقنا التقني مستعد للرد على استفساراتك.</p>
              </div>

              <div className="space-y-8">
                 {[
                   { title: 'البريد الإلكتروني', value: 'contact@khama.dz', icon: <Mail className="w-6 h-6" /> },
                   { title: 'رقم الهاتف', value: '+213 (0) 23 45 67 89', icon: <Phone className="w-6 h-6" /> },
                   { title: 'المقر الرئيسي', value: 'حي الأعمال، الجزائر العاصمة، الجزائر', icon: <MapPin className="w-6 h-6" /> }
                 ].map((item, i) => (
                   <div key={i} className="flex gap-6 group">
                      <div className="w-14 h-14 bg-white rounded-2xl border border-ecru flex items-center justify-center text-gold shadow-sm group-hover:bg-gold group-hover:text-white transition-all">
                         {item.icon}
                      </div>
                      <div className="space-y-1">
                         <h4 className="text-[10px] font-black text-muted uppercase tracking-widest">{item.title}</h4>
                         <p className="text-lg font-black text-charcoal">{item.value}</p>
                      </div>
                   </div>
                 ))}
              </div>

              {/* Business Hours */}
              <div className="p-10 bg-burgundy rounded-[3rem] text-white space-y-6 relative overflow-hidden">
                 <div className="relative z-10 space-y-4">
                    <h3 className="text-xl font-black">ساعات العمل</h3>
                    <div className="space-y-2 text-white/60 font-medium">
                       <p className="flex justify-between border-b border-white/5 pb-2"><span>الأحد - الخميس</span> <span>08:00 - 17:00</span></p>
                       <p className="flex justify-between"><span>الجمعة - السبت</span> <span>مغلق</span></p>
                    </div>
                 </div>
                 <div className="absolute bottom-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-2xl" />
              </div>
           </div>

           {/* Right: Contact Form */}
           <div className="bg-white p-12 md:p-16 rounded-[4rem] border-2 border-ecru shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-full h-2 bg-gold" />
              
              <form className="space-y-8 relative z-10" onSubmit={(e) => e.preventDefault()}>
                 <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-muted uppercase tracking-widest mr-2">الاسم الكامل</label>
                       <input 
                         type="text" 
                         placeholder="أدخل اسمك"
                         className="w-full bg-off-white border-2 border-ecru/50 py-4 px-6 rounded-2xl focus:border-gold outline-none transition-all font-bold"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-muted uppercase tracking-widest mr-2">اسم الشركة</label>
                       <input 
                         type="text" 
                         placeholder="اختياري"
                         className="w-full bg-off-white border-2 border-ecru/50 py-4 px-6 rounded-2xl focus:border-gold outline-none transition-all font-bold"
                       />
                    </div>
                 </div>

                 <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-muted uppercase tracking-widest mr-2">البريد الإلكتروني</label>
                       <input 
                         type="email" 
                         placeholder="example@mail.com"
                         className="w-full bg-off-white border-2 border-ecru/50 py-4 px-6 rounded-2xl focus:border-gold outline-none transition-all font-bold"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-muted uppercase tracking-widest mr-2">رقم الهاتف</label>
                       <input 
                         type="tel" 
                         placeholder="0XXXXXXXXX"
                         className="w-full bg-off-white border-2 border-ecru/50 py-4 px-6 rounded-2xl focus:border-gold outline-none transition-all font-bold"
                       />
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-muted uppercase tracking-widest mr-2">الموضوع</label>
                    <select className="w-full bg-off-white border-2 border-ecru/50 py-4 px-6 rounded-2xl focus:border-gold outline-none transition-all font-bold appearance-none">
                       <option>استفسار عام</option>
                       <option>شراكة موردين</option>
                       <option>دعم فني</option>
                       <option>طلب عرض سعر خاص</option>
                    </select>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-muted uppercase tracking-widest mr-2">رسالتك</label>
                    <textarea 
                      rows={5}
                      placeholder="كيف يمكننا مساعدتك؟"
                      className="w-full bg-off-white border-2 border-ecru/50 py-4 px-6 rounded-2xl focus:border-gold outline-none transition-all font-bold resize-none"
                    />
                 </div>

                 <button className="w-full py-6 bg-burgundy text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-burgundy-dark hover:scale-[1.02] transition-all flex items-center justify-center gap-4 group">
                    إرسال الرسالة <Send className="w-4 h-4 group-hover:translate-x-[-4px] transition-transform" />
                 </button>
              </form>

              {/* Trust Badges in Form */}
              <div className="mt-12 pt-8 border-t border-ecru flex items-center justify-center gap-8 opacity-40 grayscale">
                 <CheckCircle className="w-8 h-8" />
                 <MessageSquare className="w-8 h-8" />
                 <Globe className="w-8 h-8" />
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
