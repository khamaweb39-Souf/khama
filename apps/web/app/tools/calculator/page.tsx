'use client';

import React, { useState, useEffect } from 'react';
import { 
  Calculator, Package, Truck, 
  ChevronRight, Info, AlertCircle,
  FileText, ArrowRight
} from 'lucide-react';
import Link from 'next/link';

export default function BulkCalculator() {
  const [quantity, setQuantity] = useState(100);
  const [pricePerUnit, setPricePerUnit] = useState(45);
  const [shippingMethod, setShippingMethod] = useState('express'); // standard, express, sea
  const [insurance, setInsurance] = useState(false);
  
  const [results, setResults] = useState({
    subtotal: 0,
    shippingCost: 0,
    insuranceCost: 0,
    total: 0,
    discount: 0
  });

  useEffect(() => {
    // Basic calculation logic
    let sub = quantity * pricePerUnit;
    let disc = 0;
    
    // Tiered discount simulation
    if (quantity >= 1000) disc = sub * 0.15;
    else if (quantity >= 500) disc = sub * 0.10;
    else if (quantity >= 100) disc = sub * 0.05;

    let ship = 0;
    if (shippingMethod === 'express') ship = quantity * 2.5;
    else if (shippingMethod === 'standard') ship = quantity * 1.2;
    else ship = quantity * 0.5;

    let ins = insurance ? sub * 0.01 : 0;

    setResults({
      subtotal: sub,
      discount: disc,
      shippingCost: ship,
      insuranceCost: ins,
      total: sub - disc + ship + ins
    });
  }, [quantity, pricePerUnit, shippingMethod, insurance]);

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-32 pt-32" dir="rtl">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-3 text-[10px] font-black text-muted uppercase tracking-widest mb-12">
           <Link href="/" className="hover:text-gold transition-colors">الرئيسية</Link>
           <ChevronRight className="w-3 h-3" />
           <Link href="/tools" className="hover:text-gold transition-colors">الأدوات</Link>
           <ChevronRight className="w-3 h-3" />
           <span className="text-charcoal">حاسبة طلبات الجملة</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-16">
           
           {/* Inputs Column */}
           <div className="space-y-12">
              <div className="space-y-4">
                 <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center text-gold">
                    <Calculator className="w-8 h-8" />
                 </div>
                 <h1 className="text-5xl font-black text-burgundy tracking-tighter">حاسبة الطلبات <br />واللوجستيك</h1>
                 <p className="text-muted font-medium leading-relaxed max-w-md">قدر التكاليف الإجمالية لطلباتك الضخمة بما في ذلك الشحن والتأمين وخصومات الكمية قبل البدء في التفاوض.</p>
              </div>

              <div className="space-y-8 bg-white p-10 rounded-[3rem] border border-ecru shadow-sm">
                 {/* Quantity Input */}
                 <div className="space-y-4">
                    <div className="flex justify-between">
                       <label className="text-[11px] font-black text-charcoal uppercase tracking-widest">الكمية الإجمالية (متر)</label>
                       <span className="text-xs font-bold text-gold">{quantity.toLocaleString()} م</span>
                    </div>
                    <input 
                      type="range" 
                      min="10" 
                      max="10000" 
                      step="10"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                      className="w-full h-2 bg-ecru rounded-full appearance-none cursor-pointer accent-gold"
                    />
                    <div className="flex justify-between text-[9px] font-black text-muted uppercase">
                       <span>Min: 10م</span>
                       <span>Max: 10,000م</span>
                    </div>
                 </div>

                 {/* Price Per Unit */}
                 <div className="space-y-2">
                    <label className="text-[11px] font-black text-charcoal uppercase tracking-widest mr-2">سعر المتر المتوقع (DZD)</label>
                    <div className="relative">
                       <input 
                         type="number" 
                         value={pricePerUnit}
                         onChange={(e) => setPricePerUnit(parseFloat(e.target.value) || 0)}
                         className="w-full bg-off-white border-2 border-ecru py-5 pr-6 pl-16 rounded-2xl outline-none focus:border-gold/50 transition-all font-black text-lg"
                       />
                       <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-muted">DZD</span>
                    </div>
                 </div>

                 {/* Shipping Method */}
                 <div className="space-y-4">
                    <label className="text-[11px] font-black text-charcoal uppercase tracking-widest mr-2">طريقة الشحن والسرعة</label>
                    <div className="grid grid-cols-3 gap-4">
                       {[
                         { id: 'sea', label: 'بحري', icon: <Globe className="w-4 h-4" /> },
                         { id: 'standard', label: 'بري', icon: <Truck className="w-4 h-4" /> },
                         { id: 'express', label: 'جوي', icon: <Package className="w-4 h-4" /> }
                       ].map((method) => (
                         <button 
                           key={method.id}
                           onClick={() => setShippingMethod(method.id)}
                           className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${shippingMethod === method.id ? 'border-gold bg-gold/5 text-gold' : 'border-ecru text-muted hover:border-gold/30'}`}
                         >
                            {method.icon}
                            <span className="text-[10px] font-black uppercase">{method.label}</span>
                         </button>
                       ))}
                    </div>
                 </div>

                 {/* Extra Options */}
                 <div className="pt-4 space-y-4">
                    <label className="flex items-center gap-3 cursor-pointer group">
                       <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${insurance ? 'bg-gold border-gold' : 'border-ecru'}`}>
                          {insurance && <FileText className="w-3.5 h-3.5 text-white" />}
                       </div>
                       <input type="checkbox" className="hidden" checked={insurance} onChange={() => setInsurance(!insurance)} />
                       <span className="text-xs font-bold text-charcoal group-hover:text-gold transition-colors">إضافة تأمين الشحن (1% من القيمة)</span>
                    </label>
                 </div>
              </div>
           </div>

           {/* Summary Column */}
           <div className="relative">
              <div className="sticky top-40 bg-burgundy rounded-[3rem] p-10 md:p-16 text-white shadow-2xl overflow-hidden">
                 {/* Design Accents */}
                 <div className="absolute top-0 left-0 w-full h-2 bg-gold" />
                 <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />

                 <h3 className="text-2xl font-black mb-10 pb-6 border-b border-white/10 flex items-center justify-between">
                    ملخص التقدير
                    <span className="text-[10px] font-black text-gold uppercase tracking-widest bg-gold/10 px-3 py-1 rounded-full">B2B Estimate</span>
                 </h3>

                 <div className="space-y-6">
                    <div className="flex justify-between items-center">
                       <span className="text-white/60 font-medium">سعر الطلبية الأساسي</span>
                       <span className="font-black text-xl">{results.subtotal.toLocaleString()} DZD</span>
                    </div>
                    <div className="flex justify-between items-center text-green-400">
                       <span className="font-medium">خصم الكمية المتوقع</span>
                       <span className="font-black">- {results.discount.toLocaleString()} DZD</span>
                    </div>
                    <div className="flex justify-between items-center">
                       <span className="text-white/60 font-medium">تكاليف اللوجستيك ({shippingMethod})</span>
                       <span className="font-black">{results.shippingCost.toLocaleString()} DZD</span>
                    </div>
                    <div className="flex justify-between items-center">
                       <span className="text-white/60 font-medium">خدمات إضافية وتأمين</span>
                       <span className="font-black">{results.insuranceCost.toLocaleString()} DZD</span>
                    </div>

                    <div className="pt-10 mt-10 border-t border-white/20">
                       <div className="flex justify-between items-end">
                          <div>
                             <p className="text-[10px] font-black text-gold uppercase tracking-widest mb-2">الإجمالي التقديري</p>
                             <p className="text-5xl font-black">{results.total.toLocaleString()} <span className="text-lg">DZD</span></p>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                             <span className="text-[9px] font-bold text-white/40">تطبق الشروط والأحكام</span>
                             <span className="bg-white/10 px-2 py-1 rounded-lg text-[9px] font-black text-white/60">السعر غير شامل للضريبة</span>
                          </div>
                       </div>
                    </div>
                 </div>

                 <div className="mt-12 space-y-4">
                    <button className="w-full py-6 bg-gold text-charcoal font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-gold/10 hover:scale-[1.02] transition-all flex items-center justify-center gap-3">
                       تصدير عرض السعر (PDF) <FileText className="w-4 h-4" />
                    </button>
                    <Link href="/rfq/create" className="w-full py-6 bg-white/5 border border-white/10 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                       نشر طلب رسمي للموردين <ArrowRight className="w-4 h-4" />
                    </Link>
                 </div>

                 <div className="mt-8 p-6 bg-burgundy-dark/50 rounded-2xl border border-white/5 flex gap-4">
                    <AlertCircle className="w-5 h-5 text-gold shrink-0" />
                    <p className="text-[10px] text-white/40 leading-relaxed font-medium">هذه الحاسبة توفر تقديراً أولياً فقط. قد تختلف الأسعار النهائية بناءً على توافر المخزون، تقلبات العملة، والاتفاقيات المباشرة مع الموردين.</p>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
