'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown } from 'lucide-react';

const languages = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ar', name: 'العربية', flag: '🇩🇿' },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const currentLanguage = languages.find((l) => l.code === i18n.language) || languages[0];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/10 transition-all text-white/90 text-[10px] md:text-xs font-black border border-white/10 bg-white/5">
        <Globe className="w-3.5 h-3.5 text-gold" />
        <span className="hidden sm:inline uppercase tracking-wider">{currentLanguage.code}</span>
        <span className="text-sm">{currentLanguage.flag}</span>
        <ChevronDown className="w-3 h-3 opacity-50 group-hover:rotate-180 transition-transform" />
      </button>

      {/* Dropdown */}
      <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[100] overflow-hidden">
        <div className="p-2 bg-gray-50 border-b border-border">
          <p className="text-[10px] font-black text-muted uppercase tracking-widest px-2">اختر اللغة</p>
        </div>
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={`
              w-full flex items-center justify-between px-4 py-3 text-xs font-bold transition-all
              ${i18n.language === lang.code ? 'bg-gold/10 text-gold' : 'text-charcoal hover:bg-gray-50'}
            `}
          >
            <div className="flex items-center gap-3">
               <span className="text-base">{lang.flag}</span>
               <span>{lang.name}</span>
            </div>
            {i18n.language === lang.code && <div className="w-1.5 h-1.5 bg-gold rounded-full" />}
          </button>
        ))}
      </div>
    </div>
  );
}
