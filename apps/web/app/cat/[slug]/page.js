'use client';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ProductCard from '../../../components/listing/ProductCard';
import FilterSidebar from '../../../components/listing/FilterSidebar';
import { Search, LayoutGrid, List, ChevronDown, AlertCircle } from 'lucide-react';
import { MOCK_PRODUCTS } from '../../../data/mockDatabase';

export default function CategoryListingPage({ params }) {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ category: params.slug });
  const [sortBy, setSortBy] = useState('createdAt');

  const categoryTitle = t(`categories.${params.slug}`, { defaultValue: params.slug });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        ...filters,
        sort: sortBy,
        category: params.slug // التأكد من الفلترة حسب القسم
      }).toString();

      const res = await fetch(`http://localhost:3005/api/v1/products?${queryParams}`);
      const data = await res.json();
      
      let fetchedProducts = data.products || [];
      
      // FALLBACK: If backend is empty or fails, use MOCK_PRODUCTS filtered by category or subcategory
      if (fetchedProducts.length === 0) {
        fetchedProducts = MOCK_PRODUCTS.filter(p => 
          p.category === params.slug || p.subcategory === params.slug
        );
      }

      setProducts(fetchedProducts);
    } catch (e) {
      console.error('Fetch error:', e);
      // FALLBACK on error
      setProducts(MOCK_PRODUCTS.filter(p => 
        p.category === params.slug || p.subcategory === params.slug
      ));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filters, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pb-32">
      {/* Header & Breadcrumbs */}
      <header className="mb-8" dir="rtl">
        <div className="text-xs text-gray-400 mb-2 flex items-center gap-2">
           <span>الرئيسية</span> <span>/</span> <span className="text-burgundy font-bold">{categoryTitle}</span>
        </div>
        <h1 className="text-3xl font-black text-gray-900">{categoryTitle}</h1>
        <p className="text-gray-500 text-sm mt-1">اكتشف أفضل الخامات والمنتجات في هذا القسم</p>
      </header>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="lg:w-72 flex-shrink-0">
          <FilterSidebar 
            currentFilters={filters} 
            onFilterChange={setFilters} 
          />
        </aside>

        {/* Main Content */}
        <main className="flex-1 space-y-6">
          {/* Controls Bar */}
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-gray-800">{products.length} منتج</span>
              <div className="hidden sm:flex items-center gap-2 border-r pr-4">
                 <button className="p-1.5 bg-gray-50 rounded-lg text-burgundy"><LayoutGrid className="w-4 h-4" /></button>
                 <button className="p-1.5 text-gray-400 hover:bg-gray-50 rounded-lg"><List className="w-4 h-4" /></button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-xs text-gray-400">ترتيب حسب:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs font-bold bg-transparent border-none outline-none cursor-pointer text-burgundy"
              >
                <option value="createdAt">الأحدث أولاً</option>
                <option value="price_asc">السعر: من الأقل</option>
                <option value="price_desc">السعر: من الأعلى</option>
                <option value="rating">الأعلى تقييماً</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 animate-pulse">
               {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                 <div key={i} className="h-80 bg-gray-100 rounded-3xl" />
               ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-32 bg-white rounded-[40px] border-2 border-dashed border-gray-100">
               <Search className="w-16 h-16 text-gray-200 mx-auto mb-4" />
               <h3 className="text-xl font-bold text-gray-800">لا توجد نتائج مطابقة</h3>
               <p className="text-gray-400 text-sm mt-2">حاول تغيير الفلاتر أو البحث عن شيء آخر</p>
            </div>
          ) : (
            <>
              {/* Demo Mode Badge */}
              <div className="bg-gold/5 border border-gold/20 p-4 rounded-2xl mb-6 flex items-center gap-3">
                 <AlertCircle className="w-5 h-5 text-gold" />
                 <p className="text-xs font-bold text-gold-dark">يتم عرض بيانات تجريبية (Demo Mode) لمحاكاة العرض النهائي.</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                 {products.map(product => (
                   <ProductCard key={product.id} product={product} />
                 ))}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
