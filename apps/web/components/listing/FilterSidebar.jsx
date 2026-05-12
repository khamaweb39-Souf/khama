'use client';
import { useState } from 'react';
import { Filter, X, Check } from 'lucide-react';

const WILAYAS = ['الجزائر', 'وهران', 'قسنطينة', 'بجاية', 'سطيف', 'تلمسان'];

export default function FilterSidebar({ currentFilters, onFilterChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFilter = (key, value) => {
    const newFilters = { ...currentFilters };
    if (newFilters[key] === value) {
      delete newFilters[key];
    } else {
      newFilters[key] = value;
    }
    onFilterChange(newFilters);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border rounded-xl font-bold text-sm shadow-sm active:scale-95 transition-all"
      >
        <Filter className="w-4 h-4" /> تصفية النتائج
      </button>

      {/* Sidebar Content */}
      <div className={`
        fixed inset-0 z-[100] lg:relative lg:z-0 lg:block
        ${isOpen ? 'block' : 'hidden'}
      `}>
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/50 lg:hidden" onClick={() => setIsOpen(false)} />
        
        <div className="absolute left-0 top-0 bottom-0 w-80 bg-white lg:bg-transparent lg:w-full p-6 lg:p-0 overflow-y-auto">
          <div className="flex items-center justify-between lg:hidden mb-6">
             <h3 className="text-xl font-black">الفلاتر</h3>
             <button onClick={() => setIsOpen(false)}><X className="w-6 h-6" /></button>
          </div>

          <div className="space-y-8 bg-white lg:p-6 lg:rounded-3xl lg:border lg:border-gray-100">
            {/* Made in Algeria */}
            <div className="space-y-3">
              <h4 className="font-bold text-gray-900 border-r-4 border-burgundy pr-2">المنشأ</h4>
              <button 
                onClick={() => toggleFilter('madeInAlgeria', 'true')}
                className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all
                  ${currentFilters.madeInAlgeria === 'true' ? 'border-burgundy bg-burgundy/5' : 'bg-gray-50 border-transparent'}`}
              >
                <span className="text-sm font-bold flex items-center gap-2">🇩🇿 صنع في الجزائر</span>
                {currentFilters.madeInAlgeria === 'true' && <Check className="w-4 h-4 text-burgundy" />}
              </button>
            </div>

            {/* Price Range */}
            <div className="space-y-4">
              <h4 className="font-bold text-gray-900 border-r-4 border-gold pr-2">نطاق السعر</h4>
              <div className="grid grid-cols-2 gap-2">
                 <input 
                   type="number" 
                   placeholder="أقل" 
                   className="p-2.5 bg-gray-50 rounded-lg text-sm outline-none border border-transparent focus:border-gold" 
                   onChange={(e) => onFilterChange({...currentFilters, minPrice: e.target.value})}
                 />
                 <input 
                   type="number" 
                   placeholder="أقصى" 
                   className="p-2.5 bg-gray-50 rounded-lg text-sm outline-none border border-transparent focus:border-gold"
                   onChange={(e) => onFilterChange({...currentFilters, maxPrice: e.target.value})}
                 />
              </div>
            </div>

            {/* Wilaya Filter */}
            <div className="space-y-3">
              <h4 className="font-bold text-gray-900 border-r-4 border-burgundy pr-2">الولاية</h4>
              <div className="grid grid-cols-2 gap-2">
                {WILAYAS.map(w => (
                  <button 
                    key={w}
                    onClick={() => toggleFilter('wilaya', w)}
                    className={`p-2 rounded-lg text-xs font-medium border transition-all
                      ${currentFilters.wilaya === w ? 'border-burgundy bg-burgundy/5 text-burgundy' : 'bg-gray-50 border-transparent text-gray-500'}`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>

            {/* Store Type */}
            <div className="space-y-3">
              <h4 className="font-bold text-gray-900 border-r-4 border-gold pr-2">نوع المورد</h4>
              <div className="space-y-2">
                {[
                  { id: 'FACTORY', label: 'مصانع مباشرة' },
                  { id: 'IMPORTER', label: 'مستوردين' },
                  { id: 'SELLER', label: 'تجار تجزئة' },
                ].map(type => (
                  <label key={type.id} className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="userType" 
                      className="w-4 h-4 accent-burgundy" 
                      onChange={() => onFilterChange({...currentFilters, userType: type.id})}
                    />
                    <span className="text-sm text-gray-600 group-hover:text-burgundy transition-colors">{type.label}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <button 
              onClick={() => onFilterChange({})}
              className="w-full py-3 text-xs font-bold text-gray-400 hover:text-red-500 transition-colors border-t mt-4"
            >
              إعادة تعيين الكل
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
