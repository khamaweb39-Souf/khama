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
  <div className="h-10 bg-burgundy-dark text-[10px] sm:text-xs text-ecru/80 px-4 flex items-center justify-between border-b border-white/5 relative z-[101]">
    <div className="flex items-center gap-4">
      <span className="font-bold tracking-widest uppercase">{t('platform_v')} <span className="text-gold ml-1">v1.2</span></span>
      <div className="hidden lg:flex items-center gap-2 overflow-hidden border-l border-white/10 pl-4 ml-4">
        <div className="whitespace-nowrap">
          <span>• {t('welcome')} • {t('saved_searches')} • {t('catalogue')}</span>
        </div>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <LanguageSwitcher />
      <span className="cursor-pointer hover:text-white">دج (DZD)</span>
      <div className="h-3 w-px bg-white/10 mx-1" />
      <Link href="/dashboard/buyer" className="hover:text-gold transition-colors flex items-center gap-1">
        <Icons.User className="w-3 h-3" />
        {t('dashboard')}
      </Link>
      <div className="h-3 w-px bg-white/10 mx-1" />
      <Link href="/login" className="hover:text-gold transition-colors">{t('logout')}</Link>
    </div>
  </div>
);

const MegaMenu = ({ isOpen, content }: { isOpen: boolean, content: any }) => (
  <div className={`
    absolute top-full left-0 w-full bg-white border-b border-border shadow-2xl transition-all duration-300 z-40
    ${isOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible pointer-events-none'}
  `}>
    <div className="max-w-7xl mx-auto p-8 grid grid-cols-4 gap-12">
      {content.sections.map((section: any, idx: number) => (
        <div key={idx} className="flex flex-col gap-4">
          <h4 className="text-label text-muted border-b border-ecru pb-2">{section.title}</h4>
          <ul className="flex flex-col gap-2">
            {section.items.map((item: any, i: number) => (
              <li key={i}>
                <Link href={item.link} className="text-body-small hover:text-gold hover:translate-x-1 inline-block transition-all">
                  {item.label}
                  {item.badge && <span className="ml-2 bg-gold/10 text-gold-dark text-[9px] px-1.5 py-0.5 rounded uppercase">{item.badge}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="bg-ecru/30 p-6 rounded-xl border border-ecru">
        <h4 className="text-subheading mb-4 text-burgundy">{content.promo.title}</h4>
        <p className="text-body-small text-muted mb-4">{content.promo.desc}</p>
        <img src={content.promo.image} alt="Featured" className="w-full h-32 object-cover rounded-lg mb-4 shadow-sm" />
        <Button variant="ghost" size="sm" fullWidth rightIcon={<ExternalLink className="w-3 h-3" />}>استكشف الآن</Button>
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
          bg-white transition-all duration-500 relative w-full border-b border-border/50
          ${isScrolled ? 'h-14 shadow-lg' : 'h-20 shadow-sm'}
        `}
        onMouseLeave={() => setActiveMenu(null)}
      >
        <div className="max-w-7xl mx-auto h-full px-4 flex items-center justify-between w-full gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className={`relative overflow-hidden rounded-lg flex items-center justify-center transition-all duration-300 ${isScrolled ? 'w-12 h-12' : 'w-20 h-20'}`}>
               <img src="/images/logo.png" alt="Khama" className="w-full h-full object-contain" />
            </div>
            <span className={`text-display !text-xl text-burgundy transition-all duration-300 font-bold ${isScrolled ? 'scale-90' : 'scale-100'}`}>خامة</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8 h-full">
            <div 
              className="h-full flex items-center cursor-pointer group"
              onMouseEnter={() => setActiveMenu('catalogue')}
            >
              <span className={`text-label transition-colors flex items-center gap-1 ${activeMenu === 'catalogue' ? 'text-gold' : 'text-charcoal group-hover:text-gold'}`}>
                {t('catalogue')} <ChevronDown className={`w-3 h-3 transition-transform ${activeMenu === 'catalogue' ? 'rotate-180' : ''}`} />
              </span>
              <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-gold transition-all duration-300 ${activeMenu === 'catalogue' ? 'scale-x-100' : 'scale-x-0'}`} />
            </div>

            <div 
              className="h-full flex items-center cursor-pointer group"
              onMouseEnter={() => setActiveMenu('marketplace')}
            >
              <span className={`text-label transition-colors flex items-center gap-1 ${activeMenu === 'marketplace' ? 'text-gold' : 'text-charcoal group-hover:text-gold'}`}>
                {t('marketplace')} <ChevronDown className={`w-3 h-3 transition-transform ${activeMenu === 'marketplace' ? 'rotate-180' : ''}`} />
              </span>
              <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-gold transition-all duration-300 ${activeMenu === 'marketplace' ? 'scale-x-100' : 'scale-x-0'}`} />
            </div>

            <Link href="/academy" className="text-label text-charcoal hover:text-gold transition-colors">{t('academy')}</Link>
            <Link href="/tools" className="text-label text-charcoal hover:text-gold transition-colors">{t('tech_tools')}</Link>
            <Link href="/glossary" className="text-label text-charcoal hover:text-gold transition-colors">{t('glossary')}</Link>
          </nav>

          {/* Search Bar Container */}
          <div className="flex-1 max-w-xl hidden md:block">
            <SearchBar />
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-charcoal hover:bg-ecru rounded-full transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-gold rounded-full border-2 border-white" />
            </button>
            <div className="hidden sm:block">
               <Link href="/rfq/create">
                 <Button variant="primary" size="md" leftIcon={<PlusCircle className="w-4 h-4" />}>{t('post_rfq')}</Button>
               </Link>
            </div>
            <button 
              className="lg:hidden p-2 text-burgundy"
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
        fixed top-0 right-0 w-80 h-full bg-white shadow-2xl z-[110] transition-transform duration-500
        ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
         <div className="p-6">
            <div className="flex justify-between items-center mb-8">
               <span className="text-title">القائمة</span>
               <button onClick={() => setIsMobileMenuOpen(false)}><X /></button>
            </div>
            <ul className="flex flex-col gap-6">
               <li><Link href="/fabrics" className="text-subheading">الكتالوج</Link></li>
               <li><Link href="/suppliers" className="text-subheading">الموردين</Link></li>
               <li><Link href="/academy" className="text-subheading">الأكاديمية</Link></li>
               <li><Link href="/tools" className="text-subheading">الأدوات التقنية</Link></li>
               <li><Link href="/glossary" className="text-subheading">القاموس التقني</Link></li>
               <li className="pt-6 border-t"><Button variant="primary" fullWidth>انشر عرضاً</Button></li>
            </ul>
         </div>
      </div>
    </div>
  );
}
