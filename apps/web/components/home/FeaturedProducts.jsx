export default function FeaturedProducts() {
  return (
    <div className="px-4 py-8">
      <h3 className="text-xl font-bold mb-6 max-w-7xl mx-auto">منتجات مميزة</h3>
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="aspect-square bg-white rounded-2xl shadow-sm border animate-pulse flex items-center justify-center">
            <span className="text-gray-300">منتج مميز</span>
          </div>
        ))}
      </div>
    </div>
  );
}
