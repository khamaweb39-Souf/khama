import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Star, BadgeCheck, ShieldCheck, MapPin, MessageSquareText } from 'lucide-react';
import AddToCartButton from '../../../components/product/AddToCartButton';
import ReviewList from '../../../components/product/ReviewList';

// دالة جلب البيانات من الـ API
async function getProduct(id) {
  try {
    const res = await fetch(`http://localhost:3005/api/v1/products/${id}`, {
      next: { revalidate: 60 } // تحديث البيانات كل دقيقة
    });
    if (!res.ok) return null;
    return res.json();
  } catch (e) {
    return null;
  }
}

export default async function ProductPage({ params }) {
  const product = await getProduct(params.id);
  
  if (!product) notFound();
  
  return (
    <div className="pb-32 bg-white min-h-screen">
      {/* قسم الصور */}
      <div className="relative h-[400px] w-full bg-gray-100">
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.title.ar}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">لا توجد صورة</div>
        )}
        
        {product.badges?.includes('MADE_IN_ALGERIA') && (
          <span className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
            🇩🇿 صنع في الجزائر
          </span>
        )}
      </div>
      
      {/* تفاصيل المنتج */}
      <div className="max-w-3xl mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 leading-tight">
            {product.title.ar}
          </h1>
          <div className="flex items-center gap-2 mt-3">
             <div className="flex items-center text-gold">
               <Star className="w-4 h-4 fill-current" />
               <span className="text-sm font-bold mr-1">{product.rating || '4.5'}</span>
             </div>
             <span className="text-gray-400 text-sm">({product.reviewCount || 0} تقييم)</span>
          </div>
        </div>

        <div className="bg-burgundy/5 p-4 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1">السعر الحالي</p>
            <span className="text-3xl font-black text-burgundy">
              {product.price?.toLocaleString()} <span className="text-sm">دج</span>
            </span>
          </div>
          {product.pricingType === 'TIERED' && (
            <div className="bg-gold/20 text-gold-dark px-3 py-1 rounded-lg text-xs font-bold">
              أسعار بالجملة متوفرة
            </div>
          )}
        </div>

        {/* المتجر */}
        <Link href={`/stores/${product.store.slug}`} 
              className="flex items-center justify-between p-4 border rounded-2xl hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gray-200 border-2 border-white shadow-sm overflow-hidden">
               {product.store.logo && <img src={product.store.logo} alt="" />}
            </div>
            <div>
              <div className="flex items-center gap-1">
                <p className="font-bold text-gray-800">{product.store.name}</p>
                {product.store.isVerified && <BadgeCheck className="w-4 h-4 text-blue-500" />}
              </div>
              <p className="text-xs text-gray-500">متجر موثوق في خامة</p>
            </div>
          </div>
          <div className="text-burgundy text-sm font-bold">زيارة المتجر ←</div>
        </Link>

        {/* الوصف */}
        <div className="space-y-3">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-gold" />
            وصف المنتج
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* ميزات إضافية */}
        <div className="grid grid-cols-2 gap-4 pt-4">
           <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="text-xs text-gray-600">متوفر في جميع الولايات</span>
           </div>
           {product.acceptsCustom && (
             <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
                <Star className="w-4 h-4 text-gold" />
                <span className="text-xs text-gray-600">يدعم التصميم الخاص</span>
             </div>
           )}
        </div>

        {/* التقييمات */}
        <div className="pt-8 border-t">
           <div className="flex items-center gap-2 mb-6">
              <MessageSquareText className="w-6 h-6 text-burgundy" />
              <h3 className="text-xl font-bold">آراء المشترين</h3>
           </div>
           <ReviewList reviews={product.reviews || []} />
        </div>
      </div>

      {/* شريط الشراء الثابت للسعر */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-40 md:relative md:border-none md:shadow-none">
        <div className="max-w-3xl mx-auto">
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
