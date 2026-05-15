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
import { TrendsSection, MarketDashboard, ActiveRFQs, Testimonials } from '../components/home/HomeSections';

export default function HomePage() {
  return (
    <div className="flex flex-col w-full overflow-x-hidden bg-midnight">
      <SEOHead type="WebSite" data={getHomeSchema()} />
      {/* Cinematic Hero Section */}
      <HeroSection />
      
      <div className="relative z-10 -mt-20">
      
      {/* Quick Categories Section */}
      <QuickCategories />
      
      {/* Why Khama? (Dark Luxury) */}
      <WhyKhama />

      {/* How it Works? (Dark Luxury) */}
      <HowItWorks />

      {/* Trends Section (Editorial Dark) */}
      <TrendsSection />

      <section className="bg-midnight py-16" id="catalog">
        <div className="max-w-7xl mx-auto w-full px-6 flex flex-col lg:flex-row gap-12">
          <aside className="hidden lg:block w-[320px] shrink-0">
            <div className="sticky top-32">
              <FilterSidebar />
            </div>
          </aside>
          <main className="flex-1 min-w-0">
            <ProductGrid />
          </main>
        </div>
      </section>

      {/* Market Intelligence Dashboard */}
      <MarketDashboard />

      {/* Active RFQs Section */}
      <ActiveRFQs />

      {/* Trusted Factories Carousel */}
      <TrustedFactories />

      {/* Partners & Certifications */}
      <PartnersMarquee />
      
      {/* Academy & Courses Section */}
      <LatestCourses />

      {/* Social Proof: Testimonials */}
      <Testimonials />

      {/* Newsletter */}
      <NewsletterSection />
      </div>
    </div>
  );
}
