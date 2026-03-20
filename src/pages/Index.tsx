import HeroSection from "@/components/home/HeroSection";
import TrendingSection from "@/components/home/TrendingSection";
import CategorySection from "@/components/home/CategorySection";
import BrandStory from "@/components/home/BrandStory";
import CTABanner from "@/components/home/CTABanner";
import ReviewsSection from "@/components/home/ReviewsSection";
import SEO from "@/components/SEO";

const Index = () => {
  return (
    <div className="w-full">
      <SEO 
        title="FRYDAY — Burgers & Fries"
        description="Indulge in bold flavors at FRYDAY. From smash beef burgers to loaded Korean fries, we bring you the ultimate street food experience."
        keywords="best burgers, loaded fries, smash burger, Korean street food, food delivery near me"
      />
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
