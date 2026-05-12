export default function LatestCourses() {
  return (
    <div className="px-4 py-12">
      <div className="max-w-7xl mx-auto bg-gold/10 rounded-3xl p-8 border border-gold/20">
        <h3 className="text-2xl font-bold mb-4 text-gold-dark">أكاديمية خامة للتدريب</h3>
        <p className="text-gray-600 mb-6">احصل على دورات تدريبية متخصصة في صناعة الملابس والجلود</p>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
             <div key={i} className="bg-white p-4 rounded-2xl shadow-sm border border-gold/10 h-32 flex items-center justify-center">
                <span className="text-gold">دورة تدريبية</span>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
}
