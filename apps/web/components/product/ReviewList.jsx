import { Star, CheckCircle2 } from 'lucide-react';

export default function ReviewList({ reviews = [] }) {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-10 bg-gray-50 rounded-3xl">
        <p className="text-gray-400">لا توجد تقييمات لهذا المنتج بعد.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-gray-900">تقييمات العملاء ({reviews.length})</h3>
      
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-burgundy/5 flex items-center justify-center font-bold text-burgundy">
                  {review.user?.fullName?.[0] || 'م'}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">{review.user?.fullName}</p>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${i < review.rating ? 'fill-gold text-gold' : 'text-gray-200'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <span className="text-[10px] text-gray-400">
                {new Date(review.createdAt).toLocaleDateString('ar-DZ')}
              </span>
            </div>

            {review.isVerified && (
              <div className="flex items-center gap-1 text-[10px] text-green-600 font-bold bg-green-50 w-fit px-2 py-0.5 rounded-full">
                <CheckCircle2 className="w-3 h-3" />
                شراء مؤكد
              </div>
            )}

            <p className="text-sm text-gray-600 leading-relaxed">
              {review.comment}
            </p>

            {review.images && review.images.length > 0 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {review.images.map((img, idx) => (
                  <img key={idx} src={img} alt="" className="w-16 h-16 rounded-xl object-cover border" />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
