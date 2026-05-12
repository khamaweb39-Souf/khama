'use client';
import { ShoppingCart } from 'lucide-react';

export default function AddToCartButton({ product }) {
  const handleAdd = () => {
    // سيتم ربطه بـ Context السلة لاحقاً
    console.log('Added to cart:', product.id);
    alert('تمت الإضافة إلى السلة');
  };

  return (
    <button
      onClick={handleAdd}
      className="w-full bg-burgundy hover:bg-burgundy-dark text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95"
    >
      <ShoppingCart className="w-5 h-5" />
      <span>أضف إلى السلة</span>
    </button>
  );
}
