'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { 
  Phone, Lock, ArrowRight, 
  Loader2, AlertCircle, CheckCircle2,
  ChevronLeft
} from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ phone: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await signIn('credentials', {
        phone: formData.phone,
        password: formData.password,
        redirect: false
      });

      if (res.error) {
        setError(res.error);
      } else {
        router.push('/dashboard');
        router.refresh();
      }
    } catch (err) {
      setError('حدث خطأ غير متوقع. يرجى المحاولة لاحقاً');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0C0A] flex flex-col items-center justify-center p-6 relative overflow-hidden" dir="rtl">
      
      {/* Cinematic Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#5C0029]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#C9A84C]/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
      
      <div className="w-full max-w-[450px] relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
         
         {/* Brand Header */}
         <div className="text-center mb-10 space-y-4">
            <Link href="/" className="inline-block text-4xl font-black text-white tracking-tighter">
               خامة<span className="text-[#C9A84C]">.</span>
            </Link>
            <h1 className="text-2xl font-black text-white">تسجيل الدخول للمنصة</h1>
            <p className="text-white/40 text-sm font-medium">مرحباً بك مجدداً في منظومة "خامة" الاحترافية</p>
         </div>

         {/* Form Card */}
         <div className="bg-[#1A1917] border border-white/5 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden group">
            
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />

            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
               
               {error && (
                 <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-center gap-3 text-red-400 text-xs font-bold animate-in shake duration-500">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                 </div>
               )}

               <div className="space-y-6">
                  {/* Phone Input */}
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mr-2">رقم الهاتف</label>
                     <div className="relative group/input">
                        <Phone className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within/input:text-[#C9A84C] transition-colors" />
                        <input 
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          placeholder="05 / 06 / 07XXXXXXXX"
                          className="w-full bg-white/[0.02] border border-white/5 py-5 pr-14 pl-6 rounded-2xl outline-none focus:border-[#C9A84C]/50 transition-all text-sm font-bold text-white placeholder:text-white/10"
                        />
                     </div>
                  </div>

                  {/* Password Input */}
                  <div className="space-y-2">
                     <div className="flex justify-between items-center mr-2 ml-2">
                        <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">كلمة المرور</label>
                        <Link href="/forgot-password" size="sm" className="text-[10px] font-black text-[#C9A84C] uppercase tracking-widest hover:text-white transition-all">نسيت السر؟</Link>
                     </div>
                     <div className="relative group/input">
                        <Lock className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within/input:text-[#C9A84C] transition-colors" />
                        <input 
                          type="password"
                          required
                          value={formData.password}
                          onChange={(e) => setFormData({...formData, password: e.target.value})}
                          placeholder="••••••••"
                          className="w-full bg-white/[0.02] border border-white/5 py-5 pr-14 pl-6 rounded-2xl outline-none focus:border-[#C9A84C]/50 transition-all text-sm font-bold text-white placeholder:text-white/10"
                        />
                     </div>
                  </div>
               </div>

               {/* Remember Me */}
               <label className="flex items-center gap-3 cursor-pointer group/check">
                  <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${rememberMe ? 'bg-[#C9A84C] border-[#C9A84C]' : 'border-white/10 group-hover/check:border-[#C9A84C]/50'}`}>
                     {rememberMe && <CheckCircle2 className="w-3 h-3 text-charcoal fill-current" />}
                  </div>
                  <input 
                    type="checkbox" 
                    className="hidden" 
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  <span className="text-[11px] font-bold text-white/40 group-hover/check:text-white transition-colors">تذكرني في المرة القادمة</span>
               </label>

               {/* Action Button */}
               <button 
                 disabled={loading}
                 className="w-full py-5 bg-[#C9A84C] text-[#0D0C0A] font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-2xl shadow-[#C9A84C]/20 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100"
               >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>دخول للمنصة <ArrowRight className="w-4 h-4" /></>
                  )}
               </button>

            </form>
         </div>

         {/* Footer Links */}
         <div className="mt-10 text-center space-y-6">
            <p className="text-white/30 text-xs font-medium">
               ليس لديك حساب؟ <Link href="/register" className="text-white font-black hover:text-[#C9A84C] transition-all border-b border-white/10 pb-0.5">أنشئ حساباً جديداً</Link>
            </p>
            
            <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-black text-white/20 uppercase tracking-[0.3em] hover:text-[#C9A84C] transition-all">
               <ChevronLeft className="w-4 h-4" /> العودة للرئيسية
            </Link>
         </div>

      </div>
    </div>
  );
}
