export default function TrustedFactories() {
  return (
    <div className="px-4 py-8 bg-burgundy/5">
      <h3 className="text-xl font-bold mb-6 max-w-7xl mx-auto">مصانع موثوقة</h3>
      <div className="max-w-7xl mx-auto flex gap-4 overflow-x-auto pb-4">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="min-w-[150px] h-20 bg-white rounded-xl shadow-sm border flex items-center justify-center p-4">
             <div className="w-10 h-10 rounded-full bg-gray-100 mr-2" />
             <div className="h-4 w-16 bg-gray-100 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
