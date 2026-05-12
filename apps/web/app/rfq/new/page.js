'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Package, ClipboardList, Calendar, CheckCircle2, ChevronLeft, ChevronRight, Upload } from 'lucide-react';

export default function NewRFQPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    categoryId: '',
    productType: '',
    specifications: {},
    quantity: '',
    unit: 'متر',
    description: '',
    deliveryDate: '',
    urgency: 'NORMAL',
    referenceImages: []
  });
  
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:3005/api/v1/rfq', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });
      
      if (res.ok) {
        router.push('/rfq/success');
      } else {
        alert('حدث خطأ أثناء إرسال الطلب');
      }
    } catch (e) {
      alert('خطأ في الاتصال بالخادم');
    }
  };
  
  return (
    <div className="max-w-2xl mx-auto p-4 pb-32">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 mb-2">طلب عرض سعر خاص</h1>
        <p className="text-gray-500">أخبرنا بما تحتاجه، وسيقوم أفضل المصنعين بتقديم عروضهم لك.</p>
      </header>
      
      {/* Progress Stepper */}
      <div className="flex items-center gap-4 mb-10">
        {[
          { id: 1, label: 'المنتج', icon: Package },
          { id: 2, label: 'المواصفات', icon: ClipboardList },
          { id: 3, label: 'التسليم', icon: Calendar },
        ].map((s, idx) => (
          <div key={s.id} className="flex-1 flex items-center gap-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all
              ${step >= s.id ? 'bg-burgundy text-white shadow-lg' : 'bg-gray-100 text-gray-400'}`}>
              {step > s.id ? <CheckCircle2 className="w-6 h-6" /> : <s.icon className="w-5 h-5" />}
            </div>
            <div className="hidden sm:block">
              <p className={`text-xs font-bold ${step >= s.id ? 'text-burgundy' : 'text-gray-400'}`}>{s.label}</p>
            </div>
            {idx < 2 && <div className={`flex-1 h-1 rounded-full ${step > s.id ? 'bg-burgundy' : 'bg-gray-100'}`} />}
          </div>
        ))}
      </div>
      
      {/* Form Content */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 min-h-[400px] flex flex-col">
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-left-4">
            <h2 className="text-xl font-bold text-gray-800">ما هو المنتج الذي تبحث عنه؟</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-2">نوع المنتج</label>
                <input
                  type="text"
                  placeholder="مثال: قماش بوليستر، جلود طبيعية..."
                  value={form.productType}
                  onChange={e => setForm({...form, productType: e.target.value})}
                  className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl outline-none focus:border-gold transition-all"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-2">الكمية المطلوبة</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={form.quantity}
                    onChange={e => setForm({...form, quantity: e.target.value})}
                    className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-2">الوحدة</label>
                  <select
                    value={form.unit}
                    onChange={e => setForm({...form, unit: e.target.value})}
                    className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl outline-none focus:border-gold"
                  >
                    <option value="متر">متر (m)</option>
                    <option value="كيلو">كيلو (kg)</option>
                    <option value="قطعة">قطعة (pcs)</option>
                    <option value="رول">رول (roll)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-left-4">
            <h2 className="text-xl font-bold text-gray-800">حدد المواصفات الفنية</h2>
            
            <textarea
              placeholder="اكتب تفاصيل إضافية مثل: الوزن، السماكة، اللون، أو أي شروط خاصة..."
              value={form.description}
              onChange={e => setForm({...form, description: e.target.value})}
              className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl outline-none focus:border-gold min-h-[150px]"
            />
            
            <div className="p-6 border-2 border-dashed border-gray-200 rounded-3xl text-center hover:border-gold transition-all cursor-pointer group">
               <Upload className="w-10 h-10 text-gray-300 mx-auto mb-2 group-hover:text-gold" />
               <p className="text-sm text-gray-400 group-hover:text-gray-600">ارفق صوراً أو ملفات للمواصفات (PDF, Images)</p>
               <input type="file" className="hidden" />
            </div>
          </div>
        )}
        
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-left-4">
            <h2 className="text-xl font-bold text-gray-800">متى تحتاج الطلبية؟</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-2">تاريخ التسليم المطلوب</label>
                <input
                  type="date"
                  value={form.deliveryDate}
                  onChange={e => setForm({...form, deliveryDate: e.target.value})}
                  className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl outline-none focus:border-gold"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-2">درجة الاستعجال</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'FLEXIBLE', label: 'مرن' },
                    { id: 'NORMAL', label: 'عادي' },
                    { id: 'URGENT', label: 'عاجل جداً' },
                  ].map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => setForm({...form, urgency: opt.id})}
                      className={`p-4 rounded-2xl border-2 font-bold text-sm transition-all
                        ${form.urgency === opt.id ? 'border-burgundy bg-burgundy/5 text-burgundy' : 'border-gray-50 bg-gray-50 text-gray-400'}`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-auto pt-10 flex gap-4">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex-1 py-4 border-2 border-gray-100 rounded-2xl font-bold text-gray-500 hover:bg-gray-50 flex items-center justify-center gap-2"
            >
              <ChevronRight className="w-5 h-5" /> السابق
            </button>
          )}
          
          <button
            onClick={step === 3 ? handleSubmit : () => setStep(step + 1)}
            className="flex-[2] py-4 bg-burgundy text-white rounded-2xl font-bold shadow-xl shadow-burgundy/20 hover:bg-burgundy-dark flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            {step === 3 ? 'إرسال الطلب للموردين' : 'التالي'}
            {step < 3 && <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
