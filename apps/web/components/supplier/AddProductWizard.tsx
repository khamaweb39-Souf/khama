'use client';

import React, { useState } from 'react';
import { 
  Check, ChevronLeft, ChevronRight, Upload, 
  Info, Package, Settings as SettingsIcon, 
  Truck, Eye, Save, X, Loader2
} from 'lucide-react';
import { addProduct } from '@/lib/actions';
import { useRouter } from 'next/navigation';

/* ─── Types ──────────────────────────────────────────────────────────── */
type Step = 1 | 2 | 3 | 4;

/* ─── Main Component ─────────────────────────────────────────────────── */
export default function AddProductWizard() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    ref: '',
    category: '',
    description: '',
    composition: '',
    gsm: '',
    width: '',
    weave: '',
    moq: '',
    price: '',
    leadTime: '',
    certifications: [] as string[],
  });

  const steps = [
    { id: 1, name: 'المعلومات الأساسية', icon: Package },
    { id: 2, name: 'المواصفات الفنية', icon: SettingsIcon },
    { id: 3, name: 'التجارة واللوجستيات', icon: Truck },
    { id: 4, name: 'الوسائط والمعاينة', icon: Eye },
  ];

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep((prev) => (prev + 1) as Step);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep((prev) => (prev - 1) as Step);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const result = await addProduct(formData);
    setIsSubmitting(false);
    
    if (result.success) {
      alert("تمت إضافة المنتج بنجاح!");
      router.push('/dashboard/supplier/products');
    } else {
      alert("حدث خطأ أثناء إضافة المنتج: " + result.error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto" dir="rtl">
      {/* ─── Stepper Header ─── */}
      <div className="mb-12">
        <div className="flex items-center justify-between relative">
          {/* Progress Line */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2 z-0" />
          <div 
            className="absolute top-1/2 right-0 h-0.5 bg-gold -translate-y-1/2 z-0 transition-all duration-500" 
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />

          {steps.map((step) => (
            <div key={step.id} className="relative z-10 flex flex-col items-center">
              <div 
                className={`w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-300 ${
                  currentStep >= step.id 
                    ? 'bg-gold border-gold text-white shadow-lg shadow-gold/20' 
                    : 'bg-white border-gray-200 text-gray-400'
                }`}
              >
                {currentStep > step.id ? <Check className="w-6 h-6" /> : <step.icon className="w-5 h-5" />}
              </div>
              <span className={`mt-3 text-xs font-bold uppercase tracking-wider ${currentStep >= step.id ? 'text-charcoal' : 'text-muted'}`}>
                {step.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Step Content Container ─── */}
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-border min-h-[500px] flex flex-col">
        
        <div className="flex-1">
          {currentStep === 1 && <Step1Data data={formData} setData={setFormData} />}
          {currentStep === 2 && <Step2Data data={formData} setData={setFormData} />}
          {currentStep === 3 && <Step3Data data={formData} setData={setFormData} />}
          {currentStep === 4 && <Step4Data data={formData} />}
        </div>

        {/* ─── Navigation Buttons ─── */}
        <div className="mt-12 pt-8 border-t border-border flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentStep === 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
              currentStep === 1 ? 'opacity-0 pointer-events-none' : 'text-charcoal hover:bg-ecru'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
            السابق
          </button>

          {currentStep < 4 ? (
            <button
              onClick={handleNext}
              className="bg-gold text-white px-10 py-4 rounded-xl font-bold flex items-center gap-3 hover:bg-gold-dark shadow-lg shadow-gold/20 transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              المتابعة
              <ChevronLeft className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-charcoal text-white px-10 py-4 rounded-xl font-bold flex items-center gap-3 hover:bg-obsidian shadow-lg transition-all hover:-translate-y-0.5 disabled:opacity-50"
            >
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              نشر المنتج
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Step 1: Basic Information ─── */
function Step1Data({ data, setData }: any) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center text-gold">
          <Package className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-charcoal">المعلومات الأساسية</h3>
          <p className="text-sm text-muted">ابدأ بتعريف المشتري بمنتجك النسيجي الفريد</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-charcoal">اسم المنتج</label>
          <input 
            type="text" 
            placeholder="مثلاً: قماش بوبلين قطني ناعم"
            className="w-full px-4 py-3 rounded-xl border border-border focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-charcoal">المرجع (SKU / Ref)</label>
          <input 
            type="text" 
            placeholder="مثلاً: KH-COT-001"
            className="w-full px-4 py-3 rounded-xl border border-border focus:border-gold outline-none"
            value={data.ref}
            onChange={(e) => setData({ ...data, ref: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-charcoal">التصنيف</label>
          <select 
            className="w-full px-4 py-3 rounded-xl border border-border focus:border-gold outline-none bg-white"
            value={data.category}
            onChange={(e) => setData({ ...data, category: e.target.value })}
          >
            <option value="">اختر التصنيف...</option>
            <option value="cotton">قطن</option>
            <option value="wool">صوف</option>
            <option value="silk">حرير</option>
            <option value="linen">كتان</option>
            <option value="synthetic">ألياف اصطناعية</option>
          </select>
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-bold text-charcoal">وصف المنتج</label>
          <textarea 
            rows={4}
            placeholder="اكتب وصفاً جذاباً للمنتج، سلط الضوء على الجودة والاستخدامات..."
            className="w-full px-4 py-3 rounded-xl border border-border focus:border-gold outline-none"
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}

/* ─── Step 2: Technical Specifications ─── */
function Step2Data({ data, setData }: any) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center text-gold">
          <SettingsIcon className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-charcoal">المواصفات الفنية</h3>
          <p className="text-sm text-muted">التفاصيل التي تهم المتخصصين والشركات الكبرى</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-charcoal">التركيب (Composition %)</label>
          <input 
            type="text" 
            placeholder="مثلاً: 100% قطن عضوي"
            className="w-full px-4 py-3 rounded-xl border border-border focus:border-gold outline-none"
            value={data.composition}
            onChange={(e) => setData({ ...data, composition: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-charcoal">الوزن (GSM)</label>
          <input 
            type="number" 
            placeholder="مثلاً: 180"
            className="w-full px-4 py-3 rounded-xl border border-border focus:border-gold outline-none"
            value={data.gsm}
            onChange={(e) => setData({ ...data, gsm: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-charcoal">العرض (Width / Laize)</label>
          <input 
            type="text" 
            placeholder="مثلاً: 150 سم"
            className="w-full px-4 py-3 rounded-xl border border-border focus:border-gold outline-none"
            value={data.width}
            onChange={(e) => setData({ ...data, width: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-charcoal">نوع النسج (Weave)</label>
          <select 
            className="w-full px-4 py-3 rounded-xl border border-border focus:border-gold outline-none bg-white"
            value={data.weave}
            onChange={(e) => setData({ ...data, weave: e.target.value })}
          >
            <option value="">اختر النوع...</option>
            <option value="plain">نسج سادة (Plain)</option>
            <option value="twill">مبرد (Twill)</option>
            <option value="satin">ساتان (Satin)</option>
            <option value="jacquard">جاكارد (Jacquard)</option>
          </select>
        </div>
      </div>
    </div>
  );
}

/* ─── Step 3: Commercial & Logistics ─── */
function Step3Data({ data, setData }: any) {
  const certifications = ['GOTS', 'ISO 9001', 'OEKO-TEX', 'GRS', 'Fair Trade'];

  const toggleCert = (cert: string) => {
    const current = data.certifications;
    if (current.includes(cert)) {
      setData({ ...data, certifications: current.filter((c: string) => c !== cert) });
    } else {
      setData({ ...data, certifications: [...current, cert] });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center text-gold">
          <Truck className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-charcoal">التجارة واللوجستيات</h3>
          <p className="text-sm text-muted">حدد شروط البيع والخدمات المتاحة</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-charcoal">أقل كمية للطلب (MOQ)</label>
          <input 
            type="text" 
            placeholder="مثلاً: 500 متر"
            className="w-full px-4 py-3 rounded-xl border border-border focus:border-gold outline-none"
            value={data.moq}
            onChange={(e) => setData({ ...data, moq: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-charcoal">السعر التقديري (DZD)</label>
          <input 
            type="text" 
            placeholder="مثلاً: 450 دج / متر"
            className="w-full px-4 py-3 rounded-xl border border-border focus:border-gold outline-none"
            value={data.price}
            onChange={(e) => setData({ ...data, price: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-charcoal">مهلة التوصيل (Lead Time)</label>
          <input 
            type="text" 
            placeholder="مثلاً: 15-20 يوم"
            className="w-full px-4 py-3 rounded-xl border border-border focus:border-gold outline-none"
            value={data.leadTime}
            onChange={(e) => setData({ ...data, leadTime: e.target.value })}
          />
        </div>
        
        <div className="space-y-4 md:col-span-2">
          <label className="text-sm font-bold text-charcoal">الشهادات والاعتمادات</label>
          <div className="flex flex-wrap gap-3">
            {certifications.map((cert) => (
              <button
                key={cert}
                onClick={() => toggleCert(cert)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                  data.certifications.includes(cert)
                    ? 'bg-gold border-gold text-white shadow-md shadow-gold/20'
                    : 'bg-white border-border text-muted hover:border-gold'
                }`}
              >
                {cert}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Step 4: Media & Preview ─── */
function Step4Data({ data }: any) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center text-gold">
          <Upload className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-charcoal">الوسائط والمعاينة</h3>
          <p className="text-sm text-muted">ارفع صوراً عالية الجودة تبرز جمال ملمس القماش</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="border-2 border-dashed border-gray-200 rounded-3xl h-64 flex flex-col items-center justify-center gap-4 bg-gray-50/50 hover:bg-ecru/30 transition-all cursor-pointer group">
            <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-muted group-hover:text-gold transition-colors">
              <Upload className="w-6 h-6" />
            </div>
            <p className="text-xs font-bold text-muted">اضغط لرفع الصور</p>
            <p className="text-[10px] text-gray-400">JPG, PNG (أقصى حجم 5MB)</p>
          </div>
        </div>

        <div className="md:col-span-2 bg-gray-50 rounded-3xl p-6 border border-border">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
             <h4 className="font-bold text-charcoal">ملخص المنتج</h4>
             <div className="flex gap-2">
                <span className="text-[10px] bg-gold/10 text-gold px-2 py-1 rounded-full font-bold uppercase">مسودة</span>
             </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-xs text-muted">اسم المنتج:</span>
              <span className="text-xs font-bold text-charcoal">{data.name || '---'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-muted">التركيب الفني:</span>
              <span className="text-xs font-bold text-charcoal">{data.composition || '---'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-muted">الوزن:</span>
              <span className="text-xs font-bold text-charcoal">{data.gsm ? `${data.gsm} GSM` : '---'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-muted">أقل كمية طلب:</span>
              <span className="text-xs font-bold text-charcoal">{data.moq || '---'}</span>
            </div>
          </div>

          <div className="mt-8 bg-gold/5 border border-gold/10 p-4 rounded-2xl flex items-start gap-3">
            <Info className="w-4 h-4 text-gold shrink-0 mt-0.5" />
            <p className="text-[10px] text-gold-dark leading-relaxed font-medium">
              سيتم عرض منتجك في كتالوج خامة العام وسيصل إشعار للمشترين المهتمين بتصنيف {data.category || 'هذا المنتج'}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
