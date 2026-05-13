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
      <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/10 transition-all text-white/80 hover:text-white text-xs font-bold border border-white/10">
        <Globe className="w-4 h-4 text-gold" />
        <span className="hidden md:inline">{currentLanguage.name}</span>
        <span>{currentLanguage.flag}</span>
        <ChevronDown className="w-3 h-3 opacity-50 group-hover:rotate-180 transition-transform" />
      </button>

      {/* Dropdown */}
      <div className="absolute top-full left-0 mt-2 w-40 bg-white rounded-xl shadow-2xl border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={`
              w-full flex items-center justify-between px-4 py-3 text-xs font-bold transition-all
              ${i18n.language === lang.code ? 'bg-gold/10 text-gold' : 'text-charcoal hover:bg-gray-50'}
            `}
          >
            <span>{lang.name}</span>
            <span>{lang.flag}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
