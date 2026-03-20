import HeroSection from "@/components/home/HeroSection";
import TrendingSection from "@/components/home/TrendingSection";
import CategorySection from "@/components/home/CategorySection";
import BrandStory from "@/components/home/BrandStory";
import CTABanner from "@/components/home/CTABanner";
import ReviewsSection from "@/components/home/ReviewsSection";

const Index = () => {
  return (
    <div className="w-full">
      <HeroSection />
      <TrendingSection />
      <CategorySection />
      <BrandStory />
      <CTABanner />
      <ReviewsSection />
    </div>
  );
};

export default Index;
