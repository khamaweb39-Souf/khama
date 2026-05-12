'use client';
import Link from 'next/link';
import { CheckCircle, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function OrderSuccessPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
        <CheckCircle className="w-12 h-12 text-green-600" />
      </div>
      
      <h1 className="text-3xl font-black text-gray-900 mb-2">تم استلام طلبك بنجاح!</h1>
      <p className="text-gray-500 max-w-xs mb-10">
        شكراً لك على ثقتك في خامة. سيقوم البائع بمراجعة طلبك والاتصال بك قريباً لتأكيد الشحن.
      </p>
      
      <div className="w-full max-w-sm space-y-4">
        <Link 
          href="/account/orders"
          className="flex items-center justify-center gap-2 w-full py-4 bg-burgundy text-white font-bold rounded-2xl shadow-lg hover:bg-burgundy-dark transition-all"
        >
          <ShoppingBag className="w-5 h-5" />
          تتبع طلباتي
        </Link>
        
        <Link 
          href="/"
          className="flex items-center justify-center gap-2 w-full py-4 bg-gray-100 text-gray-700 font-bold rounded-2xl hover:bg-gray-200 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          العودة للتسوق
        </Link>
      </div>
    </div>
  );
}
