import Link from 'next/link';
import { Star, MapPin, ShieldCheck } from 'lucide-react';

export default function ProductCard({ product }) {
  const title = product.title?.ar || product.name || 'منتج بدون اسم';
  const mainImage = product.images?.[0] || product.image || 'https://via.placeholder.com/400';
  const categoryName = product.category?.name?.ar || product.category || 'تصنيف';
  const price = product.price || product.commercial?.price || 0;

  return (
    <Link 
      href={`/products/${product.id}`}
      className="group bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-burgundy/5 transition-all duration-500 flex flex-col"
    >
      {/* صورة المنتج */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={mainImage}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {(product.badges?.includes('MADE_IN_ALGERIA') || product.origin?.country === 'الجزائر') && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 shadow-sm border border-green-100">
            🇩🇿 الجزائر
          </div>
        )}
      </div>

      {/* تفاصيل المنتج */}
      <div className="p-4 flex-1 flex flex-col space-y-2">
        <div className="flex items-center justify-between text-[10px] text-gray-400">
          <span className="bg-gray-50 px-2 py-0.5 rounded-full">{categoryName}</span>
          <div className="flex items-center gap-1">
             <MapPin className="w-3 h-3" />
             <span>{product.origin?.country || 'الجزائر'}</span>
          </div>
        </div>

        <h3 className="font-bold text-gray-800 text-sm line-clamp-2 leading-snug group-hover:text-burgundy transition-colors">
          {title}
        </h3>

        <div className="flex items-center gap-1">
           <Star className="w-3 h-3 fill-gold text-gold" />
           <span className="text-xs font-bold text-gray-700">{product.rating || '4.5'}</span>
           {(product.store?.isVerified || product.supplier?.isVerified) && <ShieldCheck className="w-3 h-3 text-blue-500" />}
        </div>

        <div className="mt-auto pt-2 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-lg font-black text-burgundy leading-none">
              {price.toLocaleString()} <span className="text-[10px]">دج</span>
            </span>
            {(product.pricingType === 'TIERED' || product.commercial?.pricingTiers) && (
              <span className="text-[8px] text-gold-dark font-bold uppercase">سعر الجملة</span>
            )}
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-burgundy border border-gray-100 group-hover:bg-burgundy group-hover:text-white transition-all">
             +
          </div>
        </div>
      </div>
    </Link>
  );
}
