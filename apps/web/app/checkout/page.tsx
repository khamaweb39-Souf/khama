'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  CreditCard, Truck, MapPin, Phone, User as UserIcon, 
  ShieldCheck, Smartphone, Landmark, Banknote, 
  ChevronRight, ShoppingBag, Tag, Lock, CheckCircle2,
  AlertCircle, Info, ChevronLeft, Package, Zap
} from 'lucide-react';

// Mock cart store hook (assuming it exists in the workspace)
// In a real scenario, I'd import from '../../stores/cartStore'
const useCartStoreMock = () => ({
  items: [
    { productId: '1', name: 'كتان عضوي بريميوم', price: 12400, quantity: 1, img: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=100' },
    { productId: '2', name: 'حرير طبيعي مطرز', price: 45000, quantity: 1, img: 'https://images.unsplash.com/photo-1590736962236-49a888a719d3?auto=format&fit=crop&q=80&w=100' }
  ],
  getTotal: () => 57400,
  clearCart: () => {},
});

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCartStoreMock(); // Switching to real store if available
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  const [form, setForm] = useState({
    customerName: 'أحمد العمراني',
    customerPhone: '+213 555 44 33 22',
    wilaya: '16',
    commune: 'الدار البيضاء',
    address: 'نهج 05 جويلية، فيلا رقم 12',
    paymentMethod: 'BARIDIMOB',
    shippingMethod: 'STANDARD'
  });

  const subtotal = getTotal();
  const shippingCost = form.shippingMethod === 'EXPRESS' ? 800 : 400;
  const tax = Math.round(subtotal * 0.05); // 5% tax mockup
  const total = subtotal + shippingCost + tax - appliedDiscount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      router.push('/checkout/success');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#0D0C0A] text-white selection:bg-gold selection:text-charcoal" dir="rtl">
      
      {/* ─── Header ─── */}
      <header className="h-20 bg-[#1A1917]/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-6 md:px-10 sticky top-0 z-50">
         <div className="flex items-center gap-4">
            <button onClick={() => router.back()} className="p-2 hover:bg-white/5 rounded-xl transition-all">
               <ChevronRight className="w-6 h-6 text-gold" />
            </button>
            <h1 className="text-xl font-black tracking-tight">إتمام عملية الشراء الآمنة</h1>
         </div>
         <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-gold" />
            <span className="text-[10px] font-black uppercase tracking-widest text-gold/80">Secure Checkout</span>
         </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 md:p-10">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* ─── Left Column: Forms ─── */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Step 1: Shipping Info */}
            <section className="bg-[#1A1917] p-8 md:p-10 rounded-[2.5rem] border border-white/5 space-y-8 relative overflow-hidden">
               <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                  <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center text-gold">
                     <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                     <h2 className="text-xl font-black">عنوان الشحن والتسليم</h2>
                     <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold">Shipping Destination</p>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                     <label className="text-[10px] font-black text-white/30 uppercase tracking-widest pr-4">الاسم الكامل</label>
                     <div className="relative">
                        <UserIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                        <input
                          type="text"
                          value={form.customerName}
                          onChange={e => setForm({...form, customerName: e.target.value})}
                          className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 pr-12 text-sm text-white outline-none focus:border-gold/50 transition-all"
                          required
                        />
                     </div>
                  </div>
                  
                  <div className="space-y-3">
                     <label className="text-[10px] font-black text-white/30 uppercase tracking-widest pr-4">رقم الهاتف</label>
                     <div className="relative">
                        <Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                        <input
                          type="tel"
                          value={form.customerPhone}
                          onChange={e => setForm({...form, customerPhone: e.target.value})}
                          className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 pr-12 text-sm text-white outline-none focus:border-gold/50 transition-all font-mono"
                          required
                        />
                     </div>
                  </div>

                  <div className="space-y-3">
                     <label className="text-[10px] font-black text-white/30 uppercase tracking-widest pr-4">الولاية</label>
                     <select
                       value={form.wilaya}
                       onChange={e => setForm({...form, wilaya: e.target.value})}
                       className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-sm text-white outline-none focus:border-gold/50 transition-all appearance-none"
                       required
                     >
                        <option value="16">16 - الجزائر العاصمة</option>
                        <option value="31">31 - وهران</option>
                        <option value="19">19 - سطيف</option>
                        <option value="25">25 - قسنطينة</option>
                     </select>
                  </div>

                  <div className="space-y-3">
                     <label className="text-[10px] font-black text-white/30 uppercase tracking-widest pr-4">البلدية</label>
                     <input
                       type="text"
                       value={form.commune}
                       onChange={e => setForm({...form, commune: e.target.value})}
                       className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-sm text-white outline-none focus:border-gold/50 transition-all"
                       required
                     />
                  </div>

                  <div className="md:col-span-2 space-y-3">
                     <label className="text-[10px] font-black text-white/30 uppercase tracking-widest pr-4">العنوان بالتفصيل</label>
                     <textarea
                       value={form.address}
                       onChange={e => setForm({...form, address: e.target.value})}
                       className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-sm text-white outline-none focus:border-gold/50 transition-all h-24 resize-none"
                       required
                     />
                  </div>
               </div>
            </section>

            {/* Step 2: Shipping Method */}
            <section className="bg-[#1A1917] p-8 md:p-10 rounded-[2.5rem] border border-white/5 space-y-8">
               <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                  <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center text-gold">
                     <Truck className="w-6 h-6" />
                  </div>
                  <div>
                     <h2 className="text-xl font-black">خيارات الشحن</h2>
                     <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold">Delivery Speed</p>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { id: 'STANDARD', label: 'شحن قياسي (Yalidine)', time: '3-5 أيام', price: '400 دج', icon: <Package /> },
                    { id: 'EXPRESS', label: 'شحن سريع (Express)', time: '24-48 ساعة', price: '800 دج', icon: <Zap className="text-gold" /> },
                  ].map(method => (
                    <label key={method.id} className={`flex items-center justify-between p-6 rounded-[2rem] border-2 cursor-pointer transition-all duration-300 ${form.shippingMethod === method.id ? 'border-gold bg-gold/5 shadow-2xl shadow-gold/5' : 'border-white/5 bg-white/[0.01] hover:border-white/10'}`}>
                       <div className="flex items-center gap-4">
                          <input type="radio" name="shipping" checked={form.shippingMethod === method.id} onChange={() => setForm({...form, shippingMethod: method.id})} className="accent-gold w-4 h-4" />
                          <div className="space-y-1">
                             <p className="text-sm font-black text-white">{method.label}</p>
                             <p className="text-[10px] text-white/30 font-bold uppercase">{method.time}</p>
                          </div>
                       </div>
                       <span className="text-sm font-black text-white">{method.price}</span>
                    </label>
                  ))}
               </div>
            </section>

            {/* Step 3: Payment Method */}
            <section className="bg-[#1A1917] p-8 md:p-10 rounded-[2.5rem] border border-white/5 space-y-8">
               <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                  <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center text-gold">
                     <CreditCard className="w-6 h-6" />
                  </div>
                  <div>
                     <h2 className="text-xl font-black">طريقة الدفع الآمنة</h2>
                     <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold">Payment Gateway</p>
                  </div>
               </div>

               <div className="space-y-3">
                  {[
                    { id: 'BARIDIMOB', label: 'بريدي موب (BaridiMob)', sub: 'تحويل مباشر من التطبيق', icon: <Smartphone className="text-gold" />, secure: true },
                    { id: 'CIB', label: 'البطاقة البنكية / الذهبية', sub: 'دفع إلكتروني آمن 100%', icon: <CreditCard />, secure: true },
                    { id: 'TRANSFER', label: 'تحويل بنكي / CCP', sub: 'تأكيد يدوي بعد التحويل', icon: <Landmark />, secure: false },
                    { id: 'COD', label: 'الدفع عند الاستلام', sub: 'متوفر للولايات الشمالية فقط', icon: <Banknote className="text-green-500" />, secure: false },
                  ].map(method => (
                    <label key={method.id} className={`flex items-center justify-between p-6 rounded-[2rem] border-2 cursor-pointer transition-all duration-500 ${form.paymentMethod === method.id ? 'border-gold bg-gold/5' : 'border-white/5 bg-white/[0.01] hover:border-white/10'}`}>
                       <div className="flex items-center gap-6">
                          <input type="radio" name="payment" checked={form.paymentMethod === method.id} onChange={() => setForm({...form, paymentMethod: method.id})} className="accent-gold w-5 h-5" />
                          <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center">
                             {method.icon}
                          </div>
                          <div className="space-y-1">
                             <p className="text-sm font-black text-white">{method.label}</p>
                             <p className="text-[10px] text-white/30 font-bold uppercase">{method.sub}</p>
                          </div>
                       </div>
                       {method.secure && <ShieldCheck className="w-5 h-5 text-green-500 opacity-40" />}
                    </label>
                  ))}
               </div>

               {/* Integrated Payment Info Alert */}
               {form.paymentMethod === 'BARIDIMOB' && (
                 <div className="p-6 bg-gold/5 border border-gold/10 rounded-2xl flex gap-4 animate-in fade-in zoom-in duration-500">
                    <Info className="w-6 h-6 text-gold shrink-0" />
                    <div className="space-y-2">
                       <p className="text-xs font-black text-white">تعليمات بريدي موب:</p>
                       <p className="text-[10px] text-white/60 leading-relaxed font-medium">يرجى تحويل المبلغ الإجمالي إلى الحساب الجاري الموضح بعد التأكيد. سيتم احتجاز الأموال في نظام **Escrow خامة** حتى تستلم طلبيتك وتؤكد مطابقتها للمواصفات.</p>
                    </div>
                 </div>
               )}
            </section>
          </div>

          {/* ─── Right Column: Summary ─── */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-[#1A1917] rounded-[2.5rem] border border-white/5 overflow-hidden sticky top-32">
               
               {/* Order Summary */}
               <div className="p-8 space-y-6">
                  <h3 className="text-lg font-black text-white border-b border-white/5 pb-4">ملخص السلة</h3>
                  
                  <div className="space-y-4">
                     {items.map((item, idx) => (
                       <div key={idx} className="flex gap-4">
                          <div className="w-16 h-16 bg-white/5 rounded-xl overflow-hidden border border-white/5">
                             <img src={item.img} className="w-full h-full object-cover" alt={item.name} />
                          </div>
                          <div className="flex-1 space-y-1">
                             <p className="text-[11px] font-bold text-white leading-tight">{item.name}</p>
                             <div className="flex justify-between items-center">
                                <span className="text-[10px] text-white/30 font-black">X{item.quantity}</span>
                                <span className="text-[11px] font-black text-gold">{item.price.toLocaleString()} دج</span>
                             </div>
                          </div>
                       </div>
                     ))}
                  </div>

                  {/* Promo Code */}
                  <div className="pt-6 border-t border-white/5 space-y-3">
                     <div className="flex gap-2">
                        <div className="flex-1 relative">
                           <Tag className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                           <input
                             type="text"
                             placeholder="رمز الخصم"
                             value={discountCode}
                             onChange={e => setDiscountCode(e.target.value)}
                             className="w-full bg-white/5 border border-white/5 rounded-xl p-3 pr-10 text-[10px] text-white outline-none focus:border-gold/50"
                           />
                        </div>
                        <button type="button" className="px-4 py-3 bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-all">تطبيق</button>
                     </div>
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="pt-6 border-t border-white/5 space-y-4">
                     <div className="flex justify-between text-[11px] font-medium text-white/40">
                        <span>المجموع الفرعي</span>
                        <span>{subtotal.toLocaleString()} دج</span>
                     </div>
                     <div className="flex justify-between text-[11px] font-medium text-white/40">
                        <span>مصاريف الشحن</span>
                        <span>{shippingCost.toLocaleString()} دج</span>
                     </div>
                     <div className="flex justify-between text-[11px] font-medium text-white/40">
                        <span>ضريبة القيمة المضافة (5%)</span>
                        <span>{tax.toLocaleString()} دج</span>
                     </div>
                     {appliedDiscount > 0 && (
                       <div className="flex justify-between text-[11px] font-black text-green-400">
                          <span>الخصم</span>
                          <span>-{appliedDiscount.toLocaleString()} دج</span>
                       </div>
                     )}
                     <div className="flex justify-between text-xl font-black text-white pt-4 border-t border-white/5">
                        <span className="tracking-tight">الإجمالي</span>
                        <span className="text-gold tracking-tighter">{total.toLocaleString()} دج</span>
                     </div>
                  </div>

                  {/* Confirm Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-5 bg-gold text-charcoal text-xs font-black rounded-2xl shadow-2xl shadow-gold/20 hover:scale-[1.02] active:scale-95 transition-all mt-8 uppercase tracking-[0.2em] flex items-center justify-center gap-3"
                  >
                    {loading ? (
                      <RefreshCw className="w-5 h-5 animate-spin" />
                    ) : (
                      <>تأكيد الطلب وشراء الآن <CheckCircle2 className="w-5 h-5" /></>
                    )}
                  </button>
                  
                  <div className="mt-6 flex flex-col items-center gap-3">
                     <div className="flex items-center gap-2 text-[9px] font-black text-white/20 uppercase tracking-widest">
                        <Lock className="w-3 h-3" /> All transactions are encrypted
                     </div>
                     <div className="flex gap-4 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4" alt="Visa" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-4" alt="Mastercard" />
                        <span className="text-[10px] font-black text-white border border-white/20 px-2 rounded-md">CIB</span>
                        <span className="text-[10px] font-black text-gold border border-gold/20 px-2 rounded-md">BaridiMob</span>
                     </div>
                  </div>
               </div>

               {/* Escrow Badge */}
               <div className="bg-gold p-6 flex items-center gap-4">
                  <div className="w-12 h-12 bg-charcoal rounded-xl flex items-center justify-center text-gold shadow-lg">
                     <ShieldCheck className="w-8 h-8" />
                  </div>
                  <div className="space-y-0.5">
                     <p className="text-[10px] font-black text-charcoal uppercase tracking-widest">Khama Escrow Security</p>
                     <p className="text-[9px] text-charcoal/70 leading-tight font-bold">أموالك محمية حتى تؤكد استلام طلبيتك بسلامة.</p>
                  </div>
               </div>

            </div>

         </div>

        </form>
      </main>

    </div>
  );
}

function RefreshCw({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
      <path d="M21 3v5h-5"></path>
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
      <path d="M3 21v-5h5"></path>
    </svg>
  );
}
