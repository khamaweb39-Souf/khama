import HeroBanner from '../components/home/HeroBanner';
import QuickCategories from '../components/home/QuickCategories';
import B2BToggle from '../components/home/B2BToggle';
import FeaturedProducts from '../components/home/FeaturedProducts';
import TrustedFactories from '../components/home/TrustedFactories';
import LatestCourses from '../components/home/LatestCourses';

export default function HomePage() {
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      {/* Hero Banner (Slider) */}
      <HeroBanner />
      
      {/* Quick Categories Section */}
      <QuickCategories />
      
      {/* B2B / Wholesale Toggle */}
      <B2BToggle />
      
      {/* Featured Products Grid */}
      <FeaturedProducts />
      
      {/* Trusted Factories Carousel */}
      <TrustedFactories />
      
      {/* Academy & Courses Section */}
      <LatestCourses />
    </div>
  );
}
