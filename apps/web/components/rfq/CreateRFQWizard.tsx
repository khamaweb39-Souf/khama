'use client';

import React, { useState } from 'react';
import { 
  Check, ChevronLeft, ChevronRight, FileText, 
  DollarSign, Target, Send, ShieldCheck, 
  Globe, Info, Clock, AlertCircle
} from 'lucide-react';

/* ─── Types ──────────────────────────────────────────────────────────── */
type Step = 1 | 2 | 3 | 4;

/* ─── Main Component ─────────────────────────────────────────────────── */
export default function CreateRFQWizard() {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [formData, setFormData] = useState({
    fabricType: '',
    composition: '',
    gsm: '',
    width: '',
    certifications: [] as string[],
    quantity: '',
    budget: '',
    deadline: '',
    incoterm: '',
    destination: '',
    targetRegions: [] as string[],
    visibility: 'all',
  });

  const steps = [
    { id: 1, name: 'المواصفات الفنية', icon: FileText },
    { id: 2, name: 'الشروط التجارية', icon: DollarSign },
    { id: 3, name: 'استهداف الموردين', icon: Target },
    { id: 4, name: 'المراجعة والنشر', icon: Send },
  ];

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep((prev) => (prev + 1) as Step);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep((prev) => (prev - 1) as Step);
  };

  return (
    <div className="max-w-4xl mx-auto" dir="rtl">
      {/* ─── Stepper Header ─── */}
      <div className="mb-12">
        <div className="flex items-center justify-between relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2 z-0" />
          <div 
            className="absolute top-1/2 right-0 h-0.5 bg-accent -translate-y-1/2 z-0 transition-all duration-500" 
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />

          {steps.map((step) => (
            <div key={step.id} className="relative z-10 flex flex-col items-center">
              <div 
                className={`w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-300 ${
                  currentStep >= step.id 
                    ? 'bg-accent border-accent text-white shadow-lg shadow-accent/20' 
                    : 'bg-white border-gray-200 text-gray-400'
                }`}
              >
                {currentStep > step.id ? <Check className="w-6 h-6" /> : <step.icon className="w-5 h-5" />}
              </div>
              <span className={`mt-3 text-[10px] font-bold uppercase tracking-widest ${currentStep >= step.id ? 'text-charcoal' : 'text-muted'}`}>
                {step.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Step Content Container ─── */}
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-border min-h-[550px] flex flex-col">
        
        <div className="flex-1">
          {currentStep === 1 && <Step1Technical data={formData} setData={setFormData} />}
          {currentStep === 2 && <Step2Commercial data={formData} setData={setFormData} />}
          {currentStep === 3 && <Step3Targeting data={formData} setData={setFormData} />}
          {currentStep === 4 && <Step4Review data={formData} />}
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
              className="bg-accent text-white px-10 py-4 rounded-xl font-bold flex items-center gap-3 hover:bg-[#1A1A2E]/90 shadow-lg shadow-accent/20 transition-all hover:-translate-y-0.5"
            >
              المتابعة
              <ChevronLeft className="w-5 h-5" />
            </button>
          ) : (
            <button
              className="bg-gold text-white px-10 py-4 rounded-xl font-bold flex items-center gap-3 hover:bg-gold-dark shadow-lg shadow-gold/20 transition-all hover:-translate-y-0.5"
            >
              نشر طلب العرض الآن
              <Send className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Step 1: Technical Specs ─── */
function Step1Technical({ data, setData }: any) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center text-accent">
          <FileText className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-charcoal">المواصفات الفنية المطلوبة</h3>
          <p className="text-sm text-muted">حدد بدقة القماش الذي تبحث عنه ليتمكن الموردون من تقديم عروض دقيقة</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-charcoal">نوع القماش</label>
          <select 
            className="w-full px-4 py-3 rounded-xl border border-border focus:border-accent outline-none bg-white"
            value={data.fabricType}
            onChange={(e) => setData({ ...data, fabricType: e.target.value })}
          >
            <option value="">اختر النوع...</option>
            <option value="cotton">قطن بوبلين</option>
            <option value="jersey">جيرسي</option>
            <option value="denim">دينيم (جينز)</option>
            <option value="silk">حرير طبيعي</option>
            <option value="technical">أقمشة تقنية</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-charcoal">التركيب المطلوب (%)</label>
          <input 
            type="text" 
            placeholder="مثلاً: 95% قطن، 5% ليكرا"
            className="w-full px-4 py-3 rounded-xl border border-border focus:border-accent outline-none"
            value={data.composition}
            onChange={(e) => setData({ ...data, composition: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-charcoal">الوزن المستهدف (GSM)</label>
          <input 
            type="text" 
            placeholder="مثلاً: 180 ± 5"
            className="w-full px-4 py-3 rounded-xl border border-border focus:border-accent outline-none"
            value={data.gsm}
            onChange={(e) => setData({ ...data, gsm: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-charcoal">العرض المطلوب (Width)</label>
          <input 
            type="text" 
            placeholder="مثلاً: 160 سم"
            className="w-full px-4 py-3 rounded-xl border border-border focus:border-accent outline-none"
            value={data.width}
            onChange={(e) => setData({ ...data, width: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}

/* ─── Step 2: Commercial Terms ─── */
function Step2Commercial({ data, setData }: any) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center text-accent">
          <DollarSign className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-charcoal">الشروط التجارية والميزانية</h3>
          <p className="text-sm text-muted">حدد الكميات والمواعيد النهائية لتوريد الطلبية</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-charcoal">الكمية الإجمالية (متر / كغ)</label>
          <input 
            type="text" 
            placeholder="مثلاً: 2500 متر"
            className="w-full px-4 py-3 rounded-xl border border-border focus:border-accent outline-none"
            value={data.quantity}
            onChange={(e) => setData({ ...data, quantity: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-charcoal">الميزانية المستهدفة (اختياري)</label>
          <input 
            type="text" 
            placeholder="مثلاً: 3.5 $ / متر"
            className="w-full px-4 py-3 rounded-xl border border-border focus:border-accent outline-none"
            value={data.budget}
            onChange={(e) => setData({ ...data, budget: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-charcoal">الموعد النهائي للتسليم</label>
          <input 
            type="date" 
            className="w-full px-4 py-3 rounded-xl border border-border focus:border-accent outline-none bg-white"
            value={data.deadline}
            onChange={(e) => setData({ ...data, deadline: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-charcoal">شرط الشحن (INCOTERM)</label>
          <select 
            className="w-full px-4 py-3 rounded-xl border border-border focus:border-accent outline-none bg-white"
            value={data.incoterm}
            onChange={(e) => setData({ ...data, incoterm: e.target.value })}
          >
            <option value="">اختر...</option>
            <option value="EXW">EXW - أرض المصنع</option>
            <option value="FOB">FOB - على ظهر السفينة</option>
            <option value="CIF">CIF - التكلفة والتأمين والشحن</option>
            <option value="DDP">DDP - واصل مع الرسوم</option>
          </select>
        </div>
      </div>
    </div>
  );
}

/* ─── Step 3: Targeting ─── */
function Step3Targeting({ data, setData }: any) {
  const regions = ['الجزائر', 'المغرب', 'تونس', 'مصر', 'تركيا', 'أوروبا', 'آسيا'];

  const toggleRegion = (region: string) => {
    const current = data.targetRegions;
    if (current.includes(region)) {
      setData({ ...data, targetRegions: current.filter((r: string) => r !== region) });
    } else {
      setData({ ...data, targetRegions: [...current, region] });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center text-accent">
          <Target className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-charcoal">استهداف الموردين</h3>
          <p className="text-sm text-muted">اختر المناطق الجغرافية ونوعية الموردين المفضلين</p>
        </div>
      </div>

      <div className="space-y-4">
        <label className="text-sm font-bold text-charcoal block">المناطق المفضلة</label>
        <div className="flex flex-wrap gap-3">
          {regions.map((region) => (
            <button
              key={region}
              onClick={() => toggleRegion(region)}
              className={`px-6 py-3 rounded-xl text-xs font-bold transition-all border ${
                data.targetRegions.includes(region)
                  ? 'bg-accent border-accent text-white shadow-md shadow-accent/20'
                  : 'bg-white border-border text-muted hover:border-accent'
              }`}
            >
              {region}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <label className="text-sm font-bold text-charcoal block">رؤية طلب العرض</label>
        <div className="grid md:grid-cols-3 gap-4">
          <button 
            onClick={() => setData({ ...data, visibility: 'all' })}
            className={`p-4 rounded-2xl border text-right transition-all ${data.visibility === 'all' ? 'border-accent bg-accent/5 ring-1 ring-accent' : 'border-border hover:border-accent/50'}`}
          >
            <div className="font-bold text-sm mb-1">الكل</div>
            <div className="text-[10px] text-muted leading-tight">متاح لجميع الموردين المسجلين في خامة</div>
          </button>
          <button 
            onClick={() => setData({ ...data, visibility: 'verified' })}
            className={`p-4 rounded-2xl border text-right transition-all ${data.visibility === 'verified' ? 'border-accent bg-accent/5 ring-1 ring-accent' : 'border-border hover:border-accent/50'}`}
          >
            <div className="font-bold text-sm mb-1 flex items-center gap-1">الموردون المعتمدون <ShieldCheck className="w-3 h-3 text-gold" /></div>
            <div className="text-[10px] text-muted leading-tight">فقط الموردين الذين تم التحقق من مصانعهم</div>
          </button>
          <button 
            onClick={() => setData({ ...data, visibility: 'private' })}
            className={`p-4 rounded-2xl border text-right transition-all ${data.visibility === 'private' ? 'border-accent bg-accent/5 ring-1 ring-accent' : 'border-border hover:border-accent/50'}`}
          >
            <div className="font-bold text-sm mb-1">دعوات خاصة</div>
            <div className="text-[10px] text-muted leading-tight">لا يظهر علناً، متاح فقط للموردين الذين تدعوهم</div>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Step 4: Review ─── */
function Step4Review({ data }: any) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center text-accent">
          <Send className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-charcoal">مراجعة ونشر طلب العرض</h3>
          <p className="text-sm text-muted">تأكد من التفاصيل قبل إرسال طلبك لآلاف الموردين</p>
        </div>
      </div>

      <div className="bg-gray-50 border border-border rounded-3xl p-8 space-y-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-accent uppercase tracking-widest border-b border-accent/10 pb-2">التفاصيل الفنية</h4>
            <div className="space-y-2">
               <div className="flex justify-between text-xs"><span className="text-muted">المادة:</span> <span className="font-bold text-charcoal">{data.fabricType || '---'}</span></div>
               <div className="flex justify-between text-xs"><span className="text-muted">التركيب:</span> <span className="font-bold text-charcoal">{data.composition || '---'}</span></div>
               <div className="flex justify-between text-xs"><span className="text-muted">الوزن:</span> <span className="font-bold text-charcoal">{data.gsm || '---'} GSM</span></div>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-accent uppercase tracking-widest border-b border-accent/10 pb-2">التفاصيل التجارية</h4>
            <div className="space-y-2">
               <div className="flex justify-between text-xs"><span className="text-muted">الكمية:</span> <span className="font-bold text-gold">{data.quantity || '---'}</span></div>
               <div className="flex justify-between text-xs"><span className="text-muted">الموعد:</span> <span className="font-bold text-charcoal">{data.deadline || '---'}</span></div>
               <div className="flex justify-between text-xs"><span className="text-muted">الاستهداف:</span> <span className="font-bold text-charcoal">{data.targetRegions.join('، ') || 'الكل'}</span></div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 flex items-start gap-4">
          <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center text-gold shrink-0">
             <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-bold text-charcoal mb-1">صلاحية طلب العرض</p>
            <p className="text-xs text-muted leading-relaxed">بمجرد النشر، سيظل هذا العرض نشطاً لمدة 14 يوماً. ستتلقى إشعارات فورية عند تقديم أي مورد لعرض سعر جديد.</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 text-red-500 bg-red-50 p-4 rounded-xl text-xs font-medium border border-red-100">
         <AlertCircle className="w-4 h-4" />
         تأكد من مراجعة المواصفات الفنية جيداً، حيث لا يمكن تعديلها بعد استلام أول عرض سعر.
      </div>
    </div>
  );
}
