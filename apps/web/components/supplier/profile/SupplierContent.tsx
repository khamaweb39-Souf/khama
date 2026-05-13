'use client';

import React, { useState } from 'react';
import { 
  Info, Grid, Image as ImageIcon, MessageSquare, 
  Star, ChevronLeft, ArrowLeft, History, 
  Settings, Award, Globe, Clock, CheckCircle2
} from 'lucide-react';
import FabricCard from '@/components/FabricCard';

type TabType = 'about' | 'catalogue' | 'portfolio' | 'contact' | 'reviews';

export default function SupplierContent() {
  const [activeTab, setActiveTab] = useState<TabType>('about');
  const [langTab, setLangTab] = useState<'ar' | 'fr' | 'en'>('ar');

  const tabs = [
    { id: 'about', label: 'عن الشركة', icon: Info },
    { id: 'catalogue', label: 'الكتالوج', icon: Grid },
    { id: 'portfolio', label: 'سابقة الأعمال', icon: ImageIcon },
    { id: 'contact', label: 'طلب تسعيرة', icon: MessageSquare },
    { id: 'reviews', label: 'التقييمات', icon: Star },
  ];

  return (
    <div className="w-full" dir="rtl">
      {/* ─── Tabs Navigation ─── */}
      <div className="flex border-b border-gray-200 overflow-x-auto no-scrollbar mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabType)}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all border-b-2 whitespace-nowrap ${
              activeTab === tab.id 
                ? 'border-accent text-accent' 
                : 'border-transparent text-muted hover:text-charcoal'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* ─── Tab Content ─── */}
      <div className="min-h-[500px]">
        {activeTab === 'about' && <AboutTab lang={langTab} setLang={setLangTab} />}
        {activeTab === 'catalogue' && <CatalogueTab />}
        {activeTab === 'portfolio' && <PortfolioTab />}
        {activeTab === 'contact' && <ContactTab />}
        {activeTab === 'reviews' && <ReviewsTab />}
      </div>
    </div>
  );
}

/* ─── About Tab Component ─── */
function AboutTab({ lang, setLang }: { lang: string, setLang: any }) {
  const descriptions = {
    ar: "نحن مصنع ليون للنسيج، رواد في صناعة الأقمشة الفاخرة منذ عام 2008. تخصصنا في إنتاج الحرير الطبيعي والأقمشة التقنية عالية الجودة المخصصة لدور الأزياء العالمية. نعتمد على أحدث التقنيات الأوروبية مع الحفاظ على لمسة الحرفية التقليدية.",
    fr: "Tissage de Lyon est un leader dans la fabrication de tissus de luxe depuis 2008. Nous sommes spécialisés dans la soie naturelle et les textiles techniques de haute qualité pour les maisons de couture mondiales. Nous utilisons les dernières technologies européennes tout en préservant le savoir-faire traditionnel.",
    en: "Tissage de Lyon is a leader in luxury textile manufacturing since 2008. We specialize in natural silk and high-quality technical textiles for global fashion houses. We combine modern European technology with traditional craftsmanship."
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid md:grid-cols-3 gap-12">
        {/* Bio & Description */}
        <div className="md:col-span-2 space-y-6">
          <div className="flex gap-2">
            {['ar', 'fr', 'en'].map(l => (
              <button 
                key={l}
                onClick={() => setLang(l)}
                className={`px-3 py-1 text-[10px] font-bold rounded-lg border uppercase transition-all ${lang === l ? 'bg-charcoal text-white border-charcoal' : 'text-muted border-border hover:bg-gray-50'}`}
              >
                {l}
              </button>
            ))}
          </div>
          <p className="text-body text-charcoal leading-relaxed text-lg font-light italic">
            "{descriptions[lang as keyof typeof descriptions]}"
          </p>
          
          <div className="grid grid-cols-2 gap-4">
             <div className="p-4 bg-ecru/30 rounded-2xl border border-ecru">
                <History className="w-5 h-5 text-gold mb-2" />
                <h4 className="font-bold text-sm mb-1 text-charcoal">خبرة عريقة</h4>
                <p className="text-xs text-muted">أكثر من 15 عاماً من التميز في الأسواق العالمية.</p>
             </div>
             <div className="p-4 bg-ecru/30 rounded-2xl border border-ecru">
                <Settings className="w-5 h-5 text-gold mb-2" />
                <h4 className="font-bold text-sm mb-1 text-charcoal">طاقة إنتاجية ضخمة</h4>
                <p className="text-xs text-muted">تصل إلى 150,000 متر من القماش شهرياً.</p>
             </div>
          </div>
        </div>

        {/* Certifications & Skills */}
        <div className="space-y-8">
           <div>
             <h4 className="text-xs font-bold text-muted uppercase tracking-widest mb-4">الشهادات والاعتمادات</h4>
             <div className="space-y-3">
                {['GOTS Certified 2025', 'ISO 9001 Compliance', 'OEKO-TEX Standard 100'].map((cert, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-white border border-border rounded-xl">
                    <Award className="w-5 h-5 text-gold" />
                    <span className="text-xs font-bold text-charcoal">{cert}</span>
                  </div>
                ))}
             </div>
           </div>
           
           <div>
             <h4 className="text-xs font-bold text-muted uppercase tracking-widest mb-4">الأسواق المستهدفة</h4>
             <div className="flex flex-wrap gap-2">
                {['أوروبا', 'الولايات المتحدة', 'الشرق الأوسط', 'آسيا'].map(market => (
                  <span key={market} className="px-3 py-1.5 bg-gray-100 text-[10px] font-bold text-charcoal rounded-lg">
                    {market}
                  </span>
                ))}
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Catalogue Tab Component ─── */
function CatalogueTab() {
  const mockProducts = [
    { id: '1', title: 'حرير ساتان لامع', price: 24.50, category: 'حرير', image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=600&auto=format&fit=crop' },
    { id: '2', title: 'صوف كشمير ناعم', price: 45.00, category: 'صوف', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=600&auto=format&fit=crop' },
    { id: '3', title: 'كتان عضوي منقوش', price: 18.00, category: 'كتان', image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=600&auto=format&fit=crop' },
    { id: '4', title: 'بوليستر تقني مقاوم للماء', price: 12.50, category: 'صناعي', image: 'https://images.unsplash.com/photo-1574634534894-89d7576c8259?q=80&w=600&auto=format&fit=crop' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-charcoal tracking-tight">المنتجات المتوفرة (142)</h3>
        <button className="text-xs font-bold text-accent border-b border-accent pb-1">مشاهدة المجموعة الكاملة</button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProducts.map((p: any) => (
          <FabricCard key={p.id} {...p} />
        ))}
      </div>
    </div>
  );
}

/* ─── Portfolio Tab Component ─── */
function PortfolioTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in zoom-in-95 duration-500">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="group relative rounded-3xl overflow-hidden aspect-[16/10] bg-ecru">
          <img 
            src={`https://images.unsplash.com/photo-${1500000000000 + i}?auto=format&fit=crop&w=800&q=80`} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            alt="Portfolio"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-8">
             <h4 className="text-lg font-bold mb-2">مجموعة ربيع وصيف 2024</h4>
             <p className="text-xs text-white/80 text-center leading-relaxed">تعاون خاص مع دار أزياء باريسية لإنتاج أقمشة الحرير المنقوشة يدوياً.</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Contact Tab Component ─── */
function ContactTab() {
  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold text-charcoal">أرسل استفسارك مباشرة</h3>
        <p className="text-sm text-muted">متوسط وقت الرد: <span className="text-green-600 font-bold">أقل من 4 ساعات</span></p>
      </div>
      
      <form className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
           <input type="text" placeholder="الاسم الكامل" className="w-full px-4 py-3 rounded-xl border border-border focus:border-accent outline-none" />
           <input type="email" placeholder="البريد الإلكتروني" className="w-full px-4 py-3 rounded-xl border border-border focus:border-accent outline-none" />
        </div>
        <select className="w-full px-4 py-3 rounded-xl border border-border focus:border-accent outline-none bg-white">
          <option>نوع الاستفسار...</option>
          <option>طلب عرض سعر (RFQ)</option>
          <option>طلب عينات</option>
          <option>زيارة المصنع</option>
          <option>أخرى</option>
        </select>
        <textarea rows={4} placeholder="اكتب رسالتك هنا..." className="w-full px-4 py-3 rounded-xl border border-border focus:border-accent outline-none" />
        <button className="w-full bg-charcoal text-white py-4 rounded-xl font-bold hover:bg-accent transition-all shadow-lg">إرسال الرسالة</button>
      </form>
    </div>
  );
}

/* ─── Reviews Tab Component ─── */
function ReviewsTab() {
  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <div className="grid md:grid-cols-3 gap-8 items-center bg-gray-50 p-8 rounded-3xl border border-border/50">
        <div className="text-center space-y-2">
           <p className="text-5xl font-bold text-charcoal">4.8</p>
           <div className="flex justify-center text-gold"><Star className="fill-gold w-5 h-5" /><Star className="fill-gold w-5 h-5" /><Star className="fill-gold w-5 h-5" /><Star className="fill-gold w-5 h-5" /><Star className="fill-gold w-5 h-5 text-gold/20" /></div>
           <p className="text-xs text-muted font-bold">بناءً على 47 تقييم موثق</p>
        </div>
        <div className="md:col-span-2 space-y-2">
           {[5,4,3,2,1].map(s => (
             <div key={s} className="flex items-center gap-3">
               <span className="text-[10px] font-bold text-muted w-4">{s}</span>
               <div className="flex-1 h-1.5 bg-white rounded-full overflow-hidden border border-border">
                 <div className="h-full bg-gold" style={{ width: `${s === 5 ? 80 : s === 4 ? 15 : 5}%` }} />
               </div>
             </div>
           ))}
        </div>
      </div>
      
      <div className="space-y-6">
        {[1, 2].map(i => (
          <div key={i} className="p-6 bg-white border border-border rounded-2xl space-y-3">
            <div className="flex justify-between items-start">
               <div>
                  <p className="text-sm font-bold text-charcoal">مصنع الأمل للملابس</p>
                  <p className="text-[10px] text-muted">قبل 3 أيام • مشترٍ موثق ✅</p>
               </div>
               <div className="flex text-gold"><Star className="fill-gold w-3 h-3" /><Star className="fill-gold w-3 h-3" /><Star className="fill-gold w-3 h-3" /><Star className="fill-gold w-3 h-3" /><Star className="fill-gold w-3 h-3" /></div>
            </div>
            <p className="text-sm text-charcoal leading-relaxed">جودة الحرير استثنائية، والتواصل مع الفريق كان سريعاً واحترافياً جداً. سنعتمد عليهم في جميع مجموعاتنا القادمة.</p>
            <div className="bg-ecru/20 p-4 rounded-xl border border-ecru/30 text-xs">
               <p className="font-bold text-gold-dark mb-1">رد المورد:</p>
               <p className="text-muted">نشكركم على ثقتكم الغالية، يسعدنا دائماً تقديم الأفضل لكم ولعملائكم.</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
