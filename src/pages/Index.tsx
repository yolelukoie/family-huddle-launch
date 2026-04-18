import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import ForFamiliesSection from "@/components/ForFamiliesSection";
import FeaturesSection from "@/components/FeaturesSection";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";
import OtherAppPromo from "@/components/OtherAppPromo";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ForFamiliesSection />
        <HowItWorksSection />
        <FeaturesSection />
        <PricingSection />
        <OtherAppPromo />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
