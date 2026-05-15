'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, Star, MapPin, 
  CheckCircle2, TrendingUp, Info,
  Filter, Search, ArrowUpRight,
  Truck, Award, Building2
} from 'lucide-react';

const VERIFIED_SUPPLIERS = [
  {
    id: 'tissage-lyon',
    name: 'نسيج ليون - الجزائر',
    type: 'مصنع متكامل',
    rating: 4.9,
    reviews: 124,
    location: 'المنطقة الصناعية، وهران',
    specialty: 'حرير، ساتان، جاكارد',
    badges: ['GOTS', 'OEKO-TEX'],
    stats: { delivery: '98%', quality: '100%', capacity: '50k متر/شهر' },
    image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'cotton-dz',
    name: 'الشركة الوطنية للقطن',
    type: 'مورد مواد خام',
    rating: 4.7,
    reviews: 89,
    location: 'سطيف، الجزائر',
    specialty: 'قطن عضوي، كتان',
    badges: ['BIO', 'ISO 9001'],
    stats: { delivery: '95%', quality: '98%', capacity: '120k متر/شهر' },
    image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'leather-master',
    name: 'ورشة فنون الجلود',
    type: 'مدبغة وتصنيع',
    rating: 4.8,
    reviews: 56,
    location: 'المدية، الجزائر',
    specialty: 'جلود طبيعية، مخمل',
    badges: ['LWG Gold'],
    stats: { delivery: '100%', quality: '97%', capacity: '10k قطعة/شهر' },
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=400&auto=format&fit=crop'
  }
];

export default function VerifiedSuppliersPage() {
  return (
    <div className="min-h-screen bg-[#FDFCFB] pt-32 pb-20" dir="rtl">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Verification Hero */}
        <div className="bg-burgundy rounded-[3rem] p-12 mb-16 relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="space-y-6 max-w-xl text-right">
                 <div className="inline-flex items-center gap-2 bg-gold/20 text-gold px-4 py-2 rounded-full border border-gold/30">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">موردون موثوقون</span>
                 </div>
                 <h1 className="text-5xl font-black text-white leading-tight">دليل الموردين <br /><span className="text-gold">المعتمدين في خامة</span></h1>
                 <p className="text-white/60 font-medium text-lg leading-relaxed">
                    نحن نطبق معايير صارمة للتحقق من جودة المصانع والورش. كل مورد يحمل علامة التوثيق الذهبية قد اجتاز فحصاً ميدانياً شاملاً.
                 </p>
                 <Link href="/trust" className="inline-flex items-center gap-3 text-gold font-black text-xs uppercase tracking-[0.2em] hover:text-white transition-colors group">
                    كيف نتحقق من الموردين؟ <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                 </Link>
              </div>
              <div className="hidden lg:grid grid-cols-2 gap-4">
                 <div className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl text-center space-y-2 w-40">
                    <Award className="w-8 h-8 text-gold mx-auto" />
                    <p className="text-white font-black text-xs">جودة مضمونة</p>
                 </div>
                 <div className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl text-center space-y-2 w-40 mt-8">
                    <Truck className="w-8 h-8 text-gold mx-auto" />
                    <p className="text-white font-black text-xs">شحن آمن</p>
                 </div>
              </div>
           </div>
        </div>

        {/* Filters & Tools */}
        <div className="flex flex-wrap items-center justify-between gap-6 mb-12">
           <div className="flex gap-4">
              <div className="relative group">
                 <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                 <input 
                   type="text" 
                   placeholder="بحث عن مورد..."
                   className="bg-white border border-ecru py-3 pr-10 pl-6 rounded-xl outline-none focus:border-gold transition-all text-xs font-bold w-64 shadow-sm"
                 />
              </div>
              <button className="flex items-center gap-2 bg-white border border-ecru px-6 py-3 rounded-xl text-xs font-black text-charcoal hover:bg-ecru/30 transition-all shadow-sm">
                 <Filter className="w-4 h-4 text-gold" /> تصفية النتائج
              </button>
           </div>
           <div className="flex items-center gap-6">
              <div className="flex -space-x-3 rtl:space-x-reverse">
                 {[1,2,3,4].map(i => (
                   <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-ecru" />
                 ))}
                 <div className="w-10 h-10 rounded-full border-2 border-white bg-gold text-white flex items-center justify-center text-[10px] font-black">
                    +42
                 </div>
              </div>
              <span className="text-[10px] font-black text-muted uppercase tracking-widest">مورد بانتظار التوثيق</span>
           </div>
        </div>

        {/* Suppliers List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {VERIFIED_SUPPLIERS.map((supplier) => (
             <div key={supplier.id} className="group bg-white rounded-[2.5rem] border-2 border-ecru overflow-hidden hover:border-gold hover:shadow-2xl transition-all duration-500">
                
                {/* Supplier Cover */}
                <div className="relative h-48 overflow-hidden">
                   <img src={supplier.image} alt={supplier.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                   <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-black px-3 py-1 rounded-full">
                      {supplier.type}
                   </div>
                   <div className="absolute bottom-4 right-4 flex items-center gap-2">
                      <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center shadow-lg">
                         <ShieldCheck className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-white font-black text-sm drop-shadow-md">Verified Pro</span>
                   </div>
                </div>

                {/* Supplier Content */}
                <div className="p-8 space-y-6">
                   <div className="flex justify-between items-start">
                      <div className="space-y-1">
                         <h3 className="text-xl font-black text-charcoal group-hover:text-gold transition-colors">{supplier.name}</h3>
                         <div className="flex items-center gap-1.5 text-muted">
                            <MapPin className="w-3 h-3" />
                            <span className="text-[11px] font-bold">{supplier.location}</span>
                         </div>
                      </div>
                      <div className="flex flex-col items-end">
                         <div className="flex items-center gap-1 text-gold">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="text-sm font-black">{supplier.rating}</span>
                         </div>
                         <span className="text-[9px] text-muted font-bold">{supplier.reviews} تقييم</span>
                      </div>
                   </div>

                   <div className="flex flex-wrap gap-2">
                      {supplier.badges.map(badge => (
                        <span key={badge} className="bg-ecru/50 text-gold-dark text-[10px] font-black px-3 py-1 rounded-lg border border-ecru">
                           {badge}
                        </span>
                      ))}
                   </div>

                   {/* Stats Grid */}
                   <div className="grid grid-cols-3 gap-4 py-4 border-y border-ecru/50">
                      <div className="text-center">
                         <p className="text-[9px] text-muted font-black uppercase mb-1">التسليم</p>
                         <p className="text-xs font-black text-success">{supplier.stats.delivery}</p>
                      </div>
                      <div className="text-center border-x border-ecru/50">
                         <p className="text-[9px] text-muted font-black uppercase mb-1">الجودة</p>
                         <p className="text-xs font-black text-gold">{supplier.stats.quality}</p>
                      </div>
                      <div className="text-center">
                         <p className="text-[9px] text-muted font-black uppercase mb-1">القدرة</p>
                         <p className="text-xs font-black text-charcoal">{supplier.stats.capacity.split(' ')[0]}</p>
                      </div>
                   </div>

                   <div className="flex gap-3">
                      <Link 
                        href={`/suppliers/${supplier.id}`}
                        className="flex-1 bg-ecru/30 text-charcoal py-4 rounded-2xl text-[11px] font-black hover:bg-gold hover:text-white transition-all text-center"
                      >
                         عرض المتجر
                      </Link>
                      <Link 
                        href="/rfq/create"
                        className="flex-1 bg-burgundy text-white py-4 rounded-2xl text-[11px] font-black shadow-xl shadow-burgundy/20 hover:scale-[1.02] transition-all text-center"
                      >
                         اطلب عرضاً
                      </Link>
                   </div>
                </div>

             </div>
           ))}
        </div>

        {/* Trust Badge CTA */}
        <div className="mt-24 p-12 bg-white rounded-[4rem] border-2 border-ecru shadow-xl flex flex-col lg:flex-row items-center gap-12 text-right">
           <div className="w-32 h-32 bg-gold/10 rounded-[2.5rem] flex items-center justify-center shrink-0 border-2 border-gold/20">
              <Building2 className="w-16 h-16 text-gold" />
           </div>
           <div className="space-y-4 flex-1">
              <h2 className="text-3xl font-black text-burgundy">هل أنت مورد محترف؟</h2>
              <p className="text-muted font-medium text-lg leading-relaxed">
                 انضم إلى نخبة الموردين في "خامة" واحصل على شارة التوثيق الذهبية لرفع حجم مبيعاتك والوصول إلى كبار المشترين والمصانع في المنطقة.
              </p>
           </div>
           <Link href="/register?type=supplier" className="px-12 py-6 bg-gold text-white font-black text-xs uppercase tracking-[0.2em] rounded-[2rem] shadow-2xl hover:scale-105 transition-all whitespace-nowrap">
              سجل كمورد الآن
           </Link>
        </div>

      </div>
    </div>
  );
}
