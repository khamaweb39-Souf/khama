'use client';
import { useState, useEffect } from 'react';
import { Award, Download, Share2, ShieldCheck, Printer } from 'lucide-react';

export default function CertificatePage({ params }) {
  const [certData, setCertData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`http://localhost:3005/api/v1/courses/${params.id}/certificate`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => {
      setCertData(data);
      setLoading(false);
    });
  }, [params.id]);

  if (loading) return <div className="p-20 text-center font-bold">جاري استخراج الشهادة...</div>;
  if (certData.error) return <div className="p-20 text-center text-red-500 font-bold">{certData.error}</div>;

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-10 space-y-10">
      <header className="text-center space-y-4">
        <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto">
          <Award className="w-10 h-10 text-gold" />
        </div>
        <h1 className="text-3xl font-black text-gray-900">تهانينا! لقد أنجزت المهمة</h1>
        <p className="text-gray-500">هذه الشهادة هي برهان على مهاراتك الجديدة في مجال النسيج والخياطة.</p>
      </header>

      {/* Certificate Visual Section */}
      <div className="relative bg-[#fcfcfc] border-[12px] border-double border-gold/30 p-1 md:p-4 shadow-2xl rounded-sm overflow-hidden group">
        {/* Decorative Corners */}
        <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-gold opacity-50" />
        <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-gold opacity-50" />
        
        <div className="bg-white border border-gold/10 p-10 md:p-20 flex flex-col items-center text-center space-y-10 relative overflow-hidden">
          {/* Watermark Logo */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none grayscale">
             <h1 className="text-[15rem] font-black rotate-[-30deg]">KHAMA</h1>
          </div>

          <div className="space-y-4 relative z-10">
            <h2 className="text-2xl font-black text-burgundy tracking-widest uppercase">شهادة إتمام دورة تدريبية</h2>
            <div className="w-24 h-1 bg-gold mx-auto rounded-full" />
          </div>

          <div className="space-y-4 relative z-10">
            <p className="text-gray-400 font-medium">تمنح منصة خامة هذه الشهادة بكل فخر للمبدع(ة):</p>
            <h3 className="text-4xl md:text-5xl font-black text-gray-900 font-cairo">
              {certData.studentName}
            </h3>
          </div>

          <div className="space-y-4 relative z-10 max-w-2xl">
            <p className="text-gray-500">وذلك لمشاركته الفعالة وإتمامه بنجاح لمتطلبات الدورة التدريبية:</p>
            <h4 className="text-2xl font-bold text-burgundy">{certData.courseTitle}</h4>
          </div>

          <div className="grid grid-cols-2 gap-20 pt-10 w-full relative z-10">
             <div className="text-center space-y-1">
                <p className="text-[10px] text-gray-400 font-bold uppercase">تاريخ التخرج</p>
                <p className="font-bold text-gray-800">{new Date(certData.completionDate).toLocaleDateString('ar-DZ')}</p>
             </div>
             <div className="text-center space-y-1">
                <p className="text-[10px] text-gray-400 font-bold uppercase">رقم الشهادة</p>
                <p className="font-bold text-gray-800">{certData.certificateId}</p>
             </div>
          </div>

          <div className="flex flex-col items-center gap-2 pt-10 relative z-10">
             <div className="w-20 h-20 bg-gray-50 rounded-full border-2 border-gold/20 flex items-center justify-center">
                <ShieldCheck className="w-10 h-10 text-gold" />
             </div>
             <p className="text-[8px] font-black text-gold-dark uppercase tracking-[0.2em]">Khama Verified Academy</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-4 pb-20">
        <button className="flex items-center gap-2 px-8 py-4 bg-burgundy text-white rounded-2xl font-bold shadow-xl shadow-burgundy/20 hover:scale-105 active:scale-95 transition-all">
          <Download className="w-5 h-5" /> تحميل بصيغة PDF
        </button>
        <button className="flex items-center gap-2 px-8 py-4 bg-white border-2 border-gray-100 text-gray-600 rounded-2xl font-bold hover:bg-gray-50 transition-all">
          <Printer className="w-5 h-5" /> طباعة
        </button>
        <button className="flex items-center gap-2 px-8 py-4 bg-blue-50 text-blue-600 rounded-2xl font-bold hover:bg-blue-100 transition-all">
          <Share2 className="w-5 h-5" /> مشاركة على LinkedIn
        </button>
      </div>
    </div>
  );
}
