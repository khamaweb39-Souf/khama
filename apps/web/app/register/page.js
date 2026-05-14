'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  User, Store, Factory, Palette, 
  GraduationCap, Phone, Mail, Lock, 
  MapPin, Check, ArrowRight, ArrowLeft,
  Loader2, Sparkles, Building2
} from 'lucide-react';
import Link from 'next/link';

const USER_TYPES = [
  { id: 'CONSUMER', label: 'مستهلك', desc: 'شراء الأقمشة بالتجزئة', icon: <User className="w-6 h-6" />, color: 'blue' },
  { id: 'SELLER', label: 'بائع / ورشة', desc: 'تجارة الجملة أو التجزئة', icon: <Store className="w-6 h-6" />, color: 'gold' },
  { id: 'FACTORY', label: 'مصنع / مستورد', desc: 'إنتاج أو استيراد الخام', icon: <Factory className="w-6 h-6" />, color: 'burgundy' },
  { id: 'DESIGNER', label: 'مصمم', desc: 'عرض تصاميم وابتكار', icon: <Palette className="w-6 h-6" />, color: 'purple' },
  { id: 'TRAINER', label: 'مدرب نسيج', desc: 'تقديم دورات في الأكاديمية', icon: <GraduationCap className="w-6 h-6" />, color: 'green' },
  { id: 'AGENT', label: 'وكيل لوجستيك', desc: 'خدمات شحن وتخليص', icon: <Building2 className="w-6 h-6" />, color: 'orange' },
];

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    userType: '',
    fullName: '',
    phone: '',
    email: '',
    password: '',
    wilaya: '',
    storeName: '',
    specialization: []
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulated registration logic
    setTimeout(() => {
      setLoading(false);
      router.push('/login?registered=true');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#0D0C0A] text-white p-6 relative overflow-hidden" dir="rtl">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-[#5C0029]/10 rounded-full blur-[150px] -translate-y-1/2 -translate-x-1/2" />
      
      <div className="max-w-4xl mx-auto pt-10 pb-20 relative z-10">
         
         {/* Top Header */}
         <div className="flex justify-between items-center mb-12">
            <Link href="/" className="text-3xl font-black tracking-tighter">
               خامة<span className="text-[#C9A84C]">.</span>
            </Link>
            <div className="flex items-center gap-4">
               <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">لديك حساب بالفعل؟</span>
               <Link href="/login" className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">دخول</Link>
            </div>
         </div>

         {/* Step Indicator */}
         <div className="flex items-center gap-4 mb-16 max-w-xs">
            {[1, 2].map((s) => (
              <div key={s} className="flex-1 space-y-3">
                 <div className={`h-1.5 rounded-full transition-all duration-700 ${step >= s ? 'bg-[#C9A84C]' : 'bg-white/5'}`} />
                 <span className={`text-[9px] font-black uppercase tracking-widest block text-center ${step >= s ? 'text-[#C9A84C]' : 'text-white/20'}`}>
                    {s === 1 ? 'نوع الحساب' : 'البيانات الشخصية'}
                 </span>
              </div>
            ))}
         </div>

         {step === 1 ? (
           <div className="space-y-12 animate-in fade-in slide-in-from-left-8 duration-700">
              <div className="space-y-4">
                 <h1 className="text-5xl font-black tracking-tight leading-tight">ابدأ رحلتك في عالم <br /><span className="text-[#C9A84C]">المنسوجات والجلود</span></h1>
                 <p className="text-white/40 text-lg font-medium">اختر النوع الذي يصف نشاطك بدقة للانضمام للمنظومة</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {USER_TYPES.map((type) => (
                   <button 
                     key={type.id}
                     onClick={() => setFormData({...formData, userType: type.id})}
                     className={`group relative p-8 rounded-[2.5rem] border-2 text-right transition-all duration-500 overflow-hidden ${formData.userType === type.id ? 'border-[#C9A84C] bg-[#C9A84C]/5 shadow-2xl shadow-[#C9A84C]/10' : 'border-white/5 bg-white/[0.02] hover:border-white/20'}`}
                   >
                      {/* Selection Mark */}
                      {formData.userType === type.id && (
                        <div className="absolute top-6 left-6 w-6 h-6 bg-[#C9A84C] rounded-full flex items-center justify-center animate-in zoom-in">
                           <Check className="w-4 h-4 text-charcoal" />
                        </div>
                      )}

                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 ${formData.userType === type.id ? 'bg-[#C9A84C] text-charcoal' : 'bg-white/5 text-white/40'}`}>
                         {type.icon}
                      </div>
                      <h3 className="text-xl font-black mb-2">{type.label}</h3>
                      <p className="text-white/40 text-xs font-medium leading-relaxed">{type.desc}</p>
                   </button>
                 ))}
              </div>

              <div className="pt-8">
                 <button 
                   disabled={!formData.userType}
                   onClick={() => setStep(2)}
                   className="px-10 py-5 bg-[#C9A84C] text-charcoal font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-2xl shadow-[#C9A84C]/20 flex items-center gap-4 hover:scale-105 transition-all disabled:opacity-50 disabled:scale-100"
                 >
                    الخطوة التالية <ArrowLeft className="w-4 h-4" />
                 </button>
              </div>
           </div>
         ) : (
           <form onSubmit={handleRegister} className="space-y-12 animate-in fade-in slide-in-from-right-8 duration-700">
              <div className="space-y-4">
                 <button onClick={() => setStep(1)} className="flex items-center gap-2 text-[10px] font-black text-white/40 uppercase tracking-widest hover:text-[#C9A84C] transition-all">
                    <ArrowRight className="w-4 h-4" /> العودة لاختيار النوع
                 </button>
                 <h2 className="text-4xl font-black">أكمل بياناتك <span className="text-[#C9A84C]">الشخصية</span></h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                 <div className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-white/40 uppercase tracking-widest mr-2">الاسم الكامل</label>
                       <div className="relative group">
                          <User className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/10 group-focus-within:text-[#C9A84C] transition-colors" />
                          <input 
                            type="text" 
                            required
                            placeholder="الاسم واللقب"
                            value={formData.fullName}
                            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                            className="w-full bg-white/[0.02] border border-white/5 py-5 pr-14 pl-6 rounded-2xl outline-none focus:border-[#C9A84C]/50 transition-all text-sm font-bold text-white"
                          />
                       </div>
                    </div>

                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-white/40 uppercase tracking-widest mr-2">رقم الهاتف</label>
                       <div className="relative group">
                          <Phone className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/10 group-focus-within:text-[#C9A84C] transition-colors" />
                          <input 
                            type="tel" 
                            required
                            placeholder="0XXXXXXXXX"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            className="w-full bg-white/[0.02] border border-white/5 py-5 pr-14 pl-6 rounded-2xl outline-none focus:border-[#C9A84C]/50 transition-all text-sm font-bold text-white"
                          />
                       </div>
                    </div>

                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-white/40 uppercase tracking-widest mr-2">البريد الإلكتروني</label>
                       <div className="relative group">
                          <Mail className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/10 group-focus-within:text-[#C9A84C] transition-colors" />
                          <input 
                            type="email" 
                            required
                            placeholder="example@mail.com"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full bg-white/[0.02] border border-white/5 py-5 pr-14 pl-6 rounded-2xl outline-none focus:border-[#C9A84C]/50 transition-all text-sm font-bold text-white"
                          />
                       </div>
                    </div>
                 </div>

                 <div className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-white/40 uppercase tracking-widest mr-2">الولاية (58 ولاية)</label>
                       <div className="relative group">
                          <MapPin className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/10 group-focus-within:text-[#C9A84C] transition-colors" />
                          <select 
                            required
                            value={formData.wilaya}
                            onChange={(e) => setFormData({...formData, wilaya: e.target.value})}
                            className="w-full bg-white/[0.02] border border-white/5 py-5 pr-14 pl-6 rounded-2xl outline-none focus:border-[#C9A84C]/50 transition-all text-sm font-bold text-white appearance-none"
                          >
                             <option value="" className="bg-charcoal text-white">اختر الولاية</option>
                             <option value="01" className="bg-charcoal text-white">01 - أدرار</option>
                             <option value="16" className="bg-charcoal text-white">16 - الجزائر</option>
                             <option value="31" className="bg-charcoal text-white">31 - وهران</option>
                             {/* ... more wilayas */}
                          </select>
                       </div>
                    </div>

                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-white/40 uppercase tracking-widest mr-2">كلمة المرور</label>
                       <div className="relative group">
                          <Lock className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/10 group-focus-within:text-[#C9A84C] transition-colors" />
                          <input 
                            type="password" 
                            required
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            className="w-full bg-white/[0.02] border border-white/5 py-5 pr-14 pl-6 rounded-2xl outline-none focus:border-[#C9A84C]/50 transition-all text-sm font-bold text-white"
                          />
                       </div>
                    </div>

                    <div className="pt-6">
                       <div className="p-6 bg-white/[0.02] border border-dashed border-white/10 rounded-2xl flex items-center gap-4">
                          <div className="w-12 h-12 bg-[#C9A84C]/10 rounded-xl flex items-center justify-center">
                             <Sparkles className="w-6 h-6 text-[#C9A84C]" />
                          </div>
                          <div className="space-y-0.5">
                             <p className="text-[10px] font-black uppercase text-white/60">حماية البيانات</p>
                             <p className="text-[9px] text-white/30 leading-relaxed font-bold">بياناتك مشفرة ومحمية وفق معايير الأمان العالمية (SOC2 Ready).</p>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-8 pt-6 border-t border-white/5">
                 <button 
                   type="submit"
                   disabled={loading}
                   className="w-full md:w-auto px-16 py-5 bg-[#C9A84C] text-charcoal font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-2xl shadow-[#C9A84C]/20 flex items-center justify-center gap-4 hover:scale-[1.02] transition-all disabled:opacity-50"
                 >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'إكمال التسجيل'}
                 </button>
                 <p className="text-[9px] text-white/20 font-medium max-w-sm text-center md:text-right">
                    بالنقر على إكمال التسجيل، فإنك توافق على <Link href="/terms" className="text-[#C9A84C] underline">شروط الخدمة</Link> و <Link href="/privacy" className="text-[#C9A84C] underline">سياسة الخصوصية</Link> لمنصة خامة.
                 </p>
              </div>
           </form>
         )}

      </div>
    </div>
  );
}
