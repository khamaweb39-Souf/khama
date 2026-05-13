import HeroSection from '../components/home/HeroSection';
import QuickCategories from '../components/home/QuickCategories';
import B2BToggle from '../components/home/B2BToggle';
import ProductGrid from '../components/ProductGrid';
import TrustedFactories from '../components/home/TrustedFactories';
import LatestCourses from '../components/home/LatestCourses';
import FilterSidebar from '../components/FilterSidebar';
import dynamic from 'next/dynamic';
import WhyKhama from '../components/home/WhyKhama';
import HowItWorks from '../components/home/HowItWorks';
import PartnersMarquee from '../components/home/PartnersMarquee';
import NewsletterSection from '../components/home/NewsletterSection';
import SEOHead, { getHomeSchema } from '../components/SEOHead';

const HomeSections = dynamic(() => import('../components/home/HomeSections'), { ssr: false });

export default function HomePage() {
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <SEOHead type="WebSite" data={getHomeSchema()} />
      {/* Cinematic Hero Section */}
      <HeroSection />
      
      {/* Quick Categories Section */}
      <QuickCategories />
      
      {/* B2B / Wholesale Toggle */}
      <B2BToggle />
      
      {/* Main Catalog Section with Sidebar */}
      <div className="max-w-7xl mx-auto w-full px-4 flex flex-col lg:flex-row gap-10 py-16">
        <aside className="hidden lg:block w-[320px] shrink-0">
          <FilterSidebar />
        </aside>
        <main className="flex-1 min-w-0">
          <ProductGrid />
        </main>
      </div>
      
      {/* Why Khama? */}
      <WhyKhama />

      {/* How it Works? */}
      <HowItWorks />

      {/* Trusted Factories Carousel */}
      <TrustedFactories />

      {/* Partners & Certifications */}
      <PartnersMarquee />
      
      {/* Academy & Courses Section */}
      <LatestCourses />

      {/* Advanced Editorial & Market Sections */}
      <HomeSections />

      {/* Newsletter */}
      <NewsletterSection />
    </div>
  );
}
