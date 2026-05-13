import HeroSection from '../components/home/HeroSection';
import QuickCategories from '../components/home/QuickCategories';
import B2BToggle from '../components/home/B2BToggle';
import ProductGrid from '../components/ProductGrid';
import TrustedFactories from '../components/home/TrustedFactories';
import LatestCourses from '../components/home/LatestCourses';
import FilterSidebar from '../components/FilterSidebar';
import dynamic from 'next/dynamic';
import SEOHead, { getHomeSchema } from '../components/SEOHead';
import { WhyKhama, HowItWorks, PartnersMarquee } from '../components/home/HomeSections';
import Newsletter from '../components/home/Newsletter';

export default function HomePage() {
  return (
    <div className="flex flex-col w-full overflow-x-hidden bg-off-white">
      <SEOHead type="WebSite" data={getHomeSchema()} />
      
      {/* Cinematic Hero Section */}
      <HeroSection />
      
      {/* Quick Categories Section */}
      <QuickCategories />
      
      {/* Why Khama? Section */}
      <WhyKhama />
      
      {/* B2B / Wholesale Toggle */}
      <B2BToggle />
      
      {/* How It Works Section */}
      <HowItWorks />
      
      {/* Main Catalog Section with Sidebar */}
      <div className="max-w-7xl mx-auto w-full px-4 flex flex-col lg:flex-row gap-10 py-24">
        <aside className="hidden lg:block w-[320px] shrink-0">
          <FilterSidebar />
        </aside>
        <main className="flex-1 min-w-0">
          <ProductGrid />
        </main>
      </div>
      
      {/* Partners Marquee */}
      <PartnersMarquee />

      {/* Trusted Factories Carousel */}
      <TrustedFactories />
      
      {/* Academy & Courses Section */}
      <LatestCourses />

      {/* Newsletter Subscription */}
      <Newsletter />
    </div>
  );
}
