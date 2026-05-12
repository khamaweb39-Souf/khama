'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Search, Bell, MapPin, Globe, Camera } from 'lucide-react';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative w-10 h-10 overflow-hidden rounded-xl bg-gray-50 group-hover:bg-gray-100 transition-colors">
            <img 
              src="/images/logo.png" 
              alt="Khama Logo" 
              className="w-full h-full object-contain p-1"
            />
          </div>
          <span className="hidden sm:block text-xl font-black text-burgundy">خامة</span>
        </Link>
        
        {/* Search Bar */}
        <div className="flex-1 max-w-xl relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث في خامة..."
            className="w-full h-10 pr-10 pl-12 rounded-xl border border-gray-200 
                       focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all"
          />
          {/* زر البحث بالصورة */}
          <button className="absolute left-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-50 rounded-lg">
            <Camera className="w-5 h-5 text-gray-400 hover:text-gold transition-colors" />
          </button>
        </div>
        
        {/* Actions */}
        <div className="hidden md:flex items-center gap-3">
          <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
          </button>
          
          <button className="flex items-center gap-1 px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-50 transition-colors">
            <MapPin className="w-4 h-4 text-burgundy" />
            <span>الجزائر</span>
          </button>
          
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Globe className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  );
}
