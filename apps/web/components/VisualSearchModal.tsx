'use client';

import React, { useState, useCallback, useRef } from 'react';
import { 
  X, Camera, Upload, Image as ImageIcon, 
  RefreshCw, Layers, Palette, Wind, 
  CheckCircle2, AlertCircle, ArrowRight,
  ShieldCheck, Search, FileText
} from 'lucide-react';

interface VisualSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VisualSearchModal({ isOpen, onClose }: VisualSearchModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      processFile(selectedFile);
    }
  };

  const processFile = (selectedFile: File) => {
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
      startAnalysis();
    };
    reader.readAsDataURL(selectedFile);
  };

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
    
    // Simulating AI Analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisResult({
        fabricType: 'قطن ساتان (Cotton Satin)',
        weave: 'ساتان (Satin Weave)',
        colors: [
          { name: 'أزرق ملكي', hex: '#002366', percentage: 70 },
          { name: 'كحلي', hex: '#000080', percentage: 30 }
        ],
        weight: '140 - 160 GSM',
        matchRate: 94,
        reasoning: 'تم تحديد نوع النسج السطحي اللامع المميز للساتان مع كثافة خيوط متوسطة.'
      });
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6" dir="rtl">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-charcoal/95 backdrop-blur-md animate-in fade-in duration-500" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-4xl bg-[#1A1917] rounded-[3rem] border border-white/10 shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-10 duration-700">
        
        {/* Header */}
        <div className="p-8 flex items-center justify-between border-b border-white/5 bg-white/[0.01]">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center text-gold">
                <Camera className="w-6 h-6" />
             </div>
             <div>
                <h2 className="text-xl font-black text-white">البحث البصري الذكي</h2>
                <p className="text-xs text-white/40 font-bold uppercase tracking-widest mt-1">مدعوم بالذكاء الاصطناعي • Visual AI v2.0</p>
             </div>
          </div>
          <button 
            onClick={onClose}
            className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all text-white/40 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8 md:p-12">
           {!preview ? (
             /* Upload Area */
             <div 
               className="border-2 border-dashed border-white/10 rounded-[2.5rem] p-16 text-center space-y-8 hover:border-gold/30 hover:bg-gold/[0.02] transition-all group cursor-pointer"
               onClick={() => fileInputRef.current?.click()}
             >
                <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-500">
                   <Upload className="w-10 h-10 text-white/20 group-hover:text-gold" />
                </div>
                <div className="space-y-3">
                   <h3 className="text-2xl font-black text-white">ارفع صورة القماش أو اسحبها هنا</h3>
                   <p className="text-sm text-white/30 max-w-sm mx-auto">التقط صورة واضحة لنسيج القماش تحت إضاءة جيدة للحصول على أفضل نتائج المطابقة.</p>
                </div>
                <div className="flex justify-center gap-4">
                   <button className="px-8 py-3 bg-gold text-charcoal text-[11px] font-black uppercase tracking-widest rounded-xl shadow-xl shadow-gold/20 flex items-center gap-3">
                      <ImageIcon className="w-4 h-4" /> اختر من الجهاز
                   </button>
                   <button className="px-8 py-3 bg-white/5 text-white text-[11px] font-black uppercase tracking-widest rounded-xl border border-white/10 flex items-center gap-3">
                      <Camera className="w-4 h-4" /> استخدام الكاميرا
                   </button>
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept="image/*" 
                  className="hidden" 
                />
             </div>
           ) : (
             /* Preview & Analysis Area */
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                
                {/* Image Preview */}
                <div className="space-y-6">
                   <div className="relative aspect-square rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl group">
                      <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                      {isAnalyzing && (
                        <div className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm flex flex-col items-center justify-center space-y-6">
                           <div className="relative">
                              <RefreshCw className="w-16 h-16 text-gold animate-spin" />
                              <div className="absolute inset-0 border-4 border-gold/20 rounded-full animate-ping" />
                           </div>
                           <div className="text-center space-y-2">
                              <p className="text-lg font-black text-white animate-pulse">جاري تحليل النسيج...</p>
                              <p className="text-[10px] text-gold font-bold uppercase tracking-[0.3em]">AI Image Processing</p>
                           </div>
                        </div>
                      )}
                      {!isAnalyzing && (
                        <button 
                          onClick={() => { setPreview(null); setAnalysisResult(null); }}
                          className="absolute bottom-6 right-6 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl text-xs font-bold text-white hover:bg-white/20 transition-all"
                        >
                           تغيير الصورة
                        </button>
                      )}
                   </div>
                </div>

                {/* Analysis Results */}
                <div className="space-y-8">
                   {isAnalyzing ? (
                     <div className="space-y-6">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="h-20 bg-white/5 rounded-2xl animate-pulse" />
                        ))}
                     </div>
                   ) : analysisResult ? (
                     <div className="space-y-8 animate-in fade-in slide-in-from-left-6 duration-700">
                        
                        <div className="flex items-center justify-between">
                           <div className="space-y-1">
                              <h3 className="text-2xl font-black text-white">نتائج التحليل</h3>
                              <p className="text-xs text-white/40 font-bold uppercase tracking-widest">تطابق بنسبة {analysisResult.matchRate}%</p>
                           </div>
                           <div className="w-20 h-20 bg-gold/10 rounded-full border border-gold/20 flex items-center justify-center text-gold font-black text-xl">
                              {analysisResult.matchRate}%
                           </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                           <div className="p-5 bg-white/5 rounded-2xl border border-white/5 space-y-2">
                              <div className="flex items-center gap-2 text-white/30">
                                 <Layers className="w-4 h-4" />
                                 <span className="text-[10px] font-black uppercase tracking-widest">نوع القماش</span>
                              </div>
                              <p className="text-sm font-bold text-white">{analysisResult.fabricType}</p>
                           </div>
                           <div className="p-5 bg-white/5 rounded-2xl border border-white/5 space-y-2">
                              <div className="flex items-center gap-2 text-white/30">
                                 <Wind className="w-4 h-4" />
                                 <span className="text-[10px] font-black uppercase tracking-widest">نوع النسج</span>
                              </div>
                              <p className="text-sm font-bold text-white">{analysisResult.weave}</p>
                           </div>
                        </div>

                        <div className="p-6 bg-white/5 rounded-2xl border border-white/5 space-y-4">
                           <div className="flex items-center gap-2 text-white/30">
                              <Palette className="w-4 h-4" />
                              <span className="text-[10px] font-black uppercase tracking-widest">لوحة الألوان المكتشفة</span>
                           </div>
                           <div className="flex items-center gap-3">
                              {analysisResult.colors.map((c: any, i: number) => (
                                <div key={i} className="flex items-center gap-3 bg-charcoal/50 p-2 pl-4 rounded-xl border border-white/5">
                                   <div className="w-6 h-6 rounded-lg border border-white/10" style={{ backgroundColor: c.hex }} />
                                   <span className="text-xs font-bold text-white/80">{c.name} {c.percentage}%</span>
                                </div>
                              ))}
                           </div>
                        </div>

                        <div className="p-6 bg-gold/5 border border-gold/10 rounded-2xl flex items-start gap-4">
                           <Info className="w-5 h-5 text-gold shrink-0 mt-1" />
                           <p className="text-xs text-white/70 leading-relaxed font-medium">
                              <span className="text-gold font-bold">لماذا هذا التطابق؟</span> {analysisResult.reasoning}
                           </p>
                        </div>

                        <div className="flex flex-col gap-3">
                           <button className="w-full py-4 bg-gold text-charcoal font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-gold/20 flex items-center justify-center gap-3 hover:scale-[1.02] transition-all">
                              عرض النتائج المشابهة <Search className="w-4 h-4" />
                           </button>
                           <button className="w-full py-4 bg-white/5 text-white/60 font-black text-xs uppercase tracking-[0.2em] rounded-2xl border border-white/5 flex items-center justify-center gap-3 hover:bg-white/10 hover:text-white transition-all">
                              أطلق مناقصة بهذه الصورة <FileText className="w-4 h-4" />
                           </button>
                        </div>

                     </div>
                   ) : null}
                </div>

             </div>
           )}
        </div>

        {/* Footer Guarantee */}
        <div className="p-6 border-t border-white/5 bg-white/[0.01] flex items-center justify-center gap-3">
           <ShieldCheck className="w-4 h-4 text-white/20" />
           <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Khama Visual Recognition Engine • No Data Saved Unnecessarily</p>
        </div>

      </div>
    </div>
  );
}
