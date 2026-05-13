'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import * as Icons from 'lucide-react';
import Button from './ui/Button';
import SearchBar from './SearchBar';
import LanguageSwitcher from './LanguageSwitcher';

const { 
  Search, Menu, X, Bell, Globe, ChevronDown, 
  TrendingUp, ExternalLink, PlusCircle 
} = Icons;

// ─── Sub-Components ──────────────────────────────────────────────────────────

const TopBar = ({ t }: { t: any }) => (
  <div className="h-10 bg-navy text-[10px] sm:text-xs text-cream/80 px-4 flex items-center justify-between border-b border-white/5 relative z-[101]">
    <div className="flex items-center gap-4">
      <span className="font-bold tracking-widest uppercase">{t('platform_v')} <span className="text-gold ml-1">v2.0</span></span>
      <div className="hidden lg:flex items-center gap-2 overflow-hidden border-l border-white/10 pl-4 ml-4">
        <div className="animate-marquee whitespace-nowrap">
          <span>• {t('welcome')} • {t('saved_searches')} • {t('catalogue')}</span>
        </div>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <LanguageSwitcher />
      <span className="cursor-pointer hover:text-white font-bold">دج (DZD)</span>
      <div className="h-3 w-px bg-white/10 mx-1" />
      <Link href="/dashboard/buyer" className="hover:text-gold transition-all flex items-center gap-1 font-bold">
        <Icons.User className="w-3 h-3" />
        {t('dashboard')}
      </Link>
      <div className="h-3 w-px bg-white/10 mx-1" />
      <Link href="/login" className="hover:text-gold transition-colors font-bold">{t('logout')}</Link>
    </div>
  </div>
);

const MegaMenu = ({ isOpen, content }: { isOpen: boolean, content: any }) => (
  <div className={`
    absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-gold/10 shadow-silk transition-all duration-500 z-40
    ${isOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible pointer-events-none'}
  `}>
    <div className="max-w-7xl mx-auto p-10 grid grid-cols-4 gap-12">
      {content.sections.map((section: any, idx: number) => (
        <div key={idx} className="flex flex-col gap-5">
          <h4 className="text-[11px] font-black text-navy/40 uppercase tracking-[0.2em] border-b border-gold/10 pb-3">{section.title}</h4>
          <ul className="flex flex-col gap-3">
            {section.items.map((item: any, i: number) => (
              <li key={i}>
                <Link href={item.link} className="text-sm font-bold text-navy hover:text-gold hover:translate-x-2 inline-block transition-all duration-300">
                  {item.label}
                  {item.badge && <span className="ml-2 bg-gold/10 text-gold-dark text-[9px] px-2 py-0.5 rounded-full font-black uppercase">{item.badge}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="bg-cream p-8 rounded-3xl border border-gold/10 shadow-silk flex flex-col justify-between">
        <div>
          <h4 className="text-xl font-black text-navy mb-4 leading-tight">{content.promo.title}</h4>
          <p className="text-xs text-navy/60 font-medium mb-6 line-clamp-2">{content.promo.desc}</p>
        </div>
        <div className="relative group/promo overflow-hidden rounded-2xl mb-6">
           <img src={content.promo.image} alt="Featured" className="w-full h-32 object-cover transition-transform duration-700 group-hover/promo:scale-110" />
           <div className="absolute inset-0 bg-navy/20 group-hover/promo:bg-navy/40 transition-colors" />
        </div>
        <Button variant="outline" size="md" fullWidth rightIcon={<ExternalLink className="w-4 h-4" />}>استكشف الآن</Button>
      </div>
    </div>
  </div>
);

// ─── Main Header Component ───────────────────────────────────────────────────

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuData: any = {
    // ... data remains same
    catalogue: {
      sections: [
        { title: 'ألياف طبيعية', items: [
          { label: 'قطن بريميوم', link: '/cat/cotton' },
          { label: 'صوف جزائري', link: '/cat/wool' },
          { label: 'حرير طبيعي', link: '/cat/silk' },
          { label: 'كتان عضوي', link: '/cat/linen', badge: 'BIO' },
          { label: 'كشمير', link: '/cat/cashmere' }
        ]},
        { title: 'ألياف اصطناعية', items: [
          { label: 'بوليستر معاد تدويره', link: '/cat/poly' },
          { label: 'نايلون تقني', link: '/cat/nylon' },
          { label: 'فيسكوز ناعم', link: '/cat/viscose' },
          { label: 'ليكرا سبانديكس', link: '/cat/lycra' }
        ]},
        { title: 'تقنيات النسيج', items: [
          { label: 'جاكارد ملكي', link: '/cat/jacquard' },
          { label: 'ساتان فاخر', link: '/cat/satin' },
          { label: 'غابردين متين', link: '/cat/gabardine' },
          { label: 'مخمل مطرز', link: '/cat/velvet' }
        ]}
      ],
      promo: {
        title: 'مجموعة ربيع 2026',
        desc: 'اكتشف أرقى الخامات المستدامة للموسم القادم.',
        image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=400&auto=format&fit=crop'
      }
    },
    marketplace: {
      sections: [
        { title: 'إدارة المشتريات', items: [
          { label: 'لوحة تحكم المشتري', link: '/dashboard/buyer', badge: 'جديد' },
          { label: 'إنشاء طلب عرض سعر (RFQ)', link: '/rfq/create' },
          { label: 'طلبات عروض الأسعار النشطة', link: '/rfq' },
          { label: 'مقارن الأقمشة الذكي', link: '/dashboard/buyer/compare' }
        ]},
        { title: 'خدمات الموردين', items: [
          { label: 'لوحة تحكم المورد', link: '/dashboard/supplier', badge: 'PRO' },
          { label: 'إضافة منتج جديد', link: '/dashboard/supplier/products/new', badge: 'إدراج' },
          { label: 'إدارة المتجر الرقمي', link: '/dashboard/supplier' },
          { label: 'معرض الموردين (Showroom)', link: '/supplier/tissage-de-lyon' },
          { label: 'الأدوات التقنية للمحترفين', link: '/tools' }
        ]},
        { title: 'الموردون', items: [
          { label: 'موردون جزائريون معتمدون', link: '/suppliers/dz' },
          { label: 'مراكز التوزيع الكبرى', link: '/distributors' },
          { label: 'المتاجر الرسمية', link: '/brands' },
          { label: 'نظام توثيق الموردين', link: '/verification' }
        ]}
      ],
      promo: {
        title: 'شركاء النجاح',
        desc: 'تواصل مباشرة مع كبار المصنعين في الجزائر وقم بإدارة صفقاتك.',
        image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=400&auto=format&fit=crop'
      }
    }
  };

  const { t } = useTranslation();

  return (
    <div className="fixed top-0 left-0 right-0 w-full z-[100] font-body">
      <TopBar t={t} />
      
      <header 
        className={`
          bg-white/90 backdrop-blur-lg transition-all duration-700 relative w-full border-b border-gold/10
          ${isScrolled ? 'h-16 shadow-silk' : 'h-24 shadow-none'}
        `}
        onMouseLeave={() => setActiveMenu(null)}
      >
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between w-full gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4 group shrink-0">
            <div className={`relative overflow-hidden rounded-2xl flex items-center justify-center transition-all duration-700 ${isScrolled ? 'w-12 h-12' : 'w-20 h-20'} shadow-silk border border-gold/10`}>
               <img src="/images/logo.png" alt="Khama" className="w-full h-full object-contain" />
            </div>
            <span className={`text-2xl text-navy transition-all duration-700 font-black tracking-tighter ${isScrolled ? 'opacity-0 -translate-x-4 invisible' : 'opacity-100 translate-x-0'}`}>خامة</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-10 h-full">
            <div 
              className="h-full flex items-center cursor-pointer group relative"
              onMouseEnter={() => setActiveMenu('catalogue')}
            >
              <span className={`text-sm font-bold transition-all duration-300 flex items-center gap-1.5 ${activeMenu === 'catalogue' ? 'text-gold' : 'text-navy/70 group-hover:text-gold'}`}>
                {t('catalogue')} <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-500 ${activeMenu === 'catalogue' ? 'rotate-180' : ''}`} />
              </span>
              <div className={`absolute bottom-0 left-0 w-full h-1 bg-gold transition-all duration-500 ${activeMenu === 'catalogue' ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}`} />
            </div>

            <div 
              className="h-full flex items-center cursor-pointer group relative"
              onMouseEnter={() => setActiveMenu('marketplace')}
            >
              <span className={`text-sm font-bold transition-all duration-300 flex items-center gap-1.5 ${activeMenu === 'marketplace' ? 'text-gold' : 'text-navy/70 group-hover:text-gold'}`}>
                {t('marketplace')} <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-500 ${activeMenu === 'marketplace' ? 'rotate-180' : ''}`} />
              </span>
              <div className={`absolute bottom-0 left-0 w-full h-1 bg-gold transition-all duration-500 ${activeMenu === 'marketplace' ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}`} />
            </div>

            <Link href="/academy" className="text-sm font-bold text-navy/70 hover:text-gold transition-colors">{t('academy')}</Link>
            <Link href="/tools" className="text-sm font-bold text-navy/70 hover:text-gold transition-colors">{t('tech_tools')}</Link>
            <Link href="/glossary" className="text-sm font-bold text-navy/70 hover:text-gold transition-colors">{t('glossary')}</Link>
          </nav>

          {/* Search Bar Container */}
          <div className="flex-1 max-w-xl hidden xl:block">
            <SearchBar />
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-6">
            <button className="relative p-3 text-navy/60 hover:bg-gold/10 hover:text-gold rounded-2xl transition-all duration-300">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-gold rounded-full border-2 border-white shadow-sm" />
            </button>
            <div className="hidden sm:block">
               <Link href="/rfq/create">
                 <Button variant="premium" size="md" leftIcon={<PlusCircle className="w-4 h-4" />}>{t('post_rfq')}</Button>
               </Link>
            </div>
            <button 
              className="lg:hidden p-3 text-navy hover:bg-gold/10 rounded-2xl"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mega Menus Render */}
        <MegaMenu isOpen={activeMenu === 'catalogue'} content={menuData.catalogue} />
        <MegaMenu isOpen={activeMenu === 'marketplace'} content={menuData.marketplace} />
      </header>

      {/* Mobile Drawer (Simplistic version) */}
      <div className={`
        fixed top-0 right-0 w-80 h-full bg-white/95 backdrop-blur-2xl shadow-silk z-[110] transition-all duration-700
        ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      `}>
         <div className="p-8">
            <div className="flex justify-between items-center mb-10">
               <span className="text-2xl font-black text-navy">خامة</span>
               <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-gold/10 rounded-xl"><X /></button>
            </div>
            <ul className="flex flex-col gap-6">
               <li><Link href="/fabrics" className="text-xl font-black text-navy/80 hover:text-gold transition-colors">الكتالوج</Link></li>
               <li><Link href="/suppliers" className="text-xl font-black text-navy/80 hover:text-gold transition-colors">الموردين</Link></li>
               <li><Link href="/academy" className="text-xl font-black text-navy/80 hover:text-gold transition-colors">الأكاديمية</Link></li>
               <li><Link href="/tools" className="text-xl font-black text-navy/80 hover:text-gold transition-colors">الأدوات التقنية</Link></li>
               <li><Link href="/glossary" className="text-xl font-black text-navy/80 hover:text-gold transition-colors">القاموس التقني</Link></li>
               <li className="pt-8 border-t border-gold/10"><Button variant="premium" fullWidth>انشر عرضاً</Button></li>
            </ul>
         </div>
      </div>
    </div>
  );
}
