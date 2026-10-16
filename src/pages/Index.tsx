import { useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import ForFamiliesSection from "@/components/ForFamiliesSection";
import FeaturesSection from "@/components/FeaturesSection";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";
import OtherAppPromo from "@/components/OtherAppPromo";

const Index = () => {
  useEffect(() => {
    document.title = "Family Huddle – Small Steps, Big Wins Together";
    const description = "A shared task and goals app for families and friends who want to support each other, build habits, and celebrate progress as a team.";
    for (const [selector, content] of [
      ['meta[name="description"]', description],
      ['meta[property="og:title"]', document.title],
      ['meta[property="og:description"]', description],
      ['meta[property="og:site_name"]', "Family Huddle"],
      ['meta[property="og:url"]', "https://huddle-together-site.lovable.app/"],
      ['meta[name="twitter:title"]', document.title],
      ['meta[name="twitter:description"]', description],
      ['meta[name="application-name"]', "Family Huddle"],
    ]) {
      const meta = document.querySelector<HTMLMetaElement>(selector);
      if (meta) meta.content = content;
    }
    const icon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    const touchIcon = document.querySelector<HTMLLinkElement>('link[rel="apple-touch-icon"]');
    if (icon) icon.href = "/favicon.png";
    if (touchIcon) touchIcon.href = "/favicon.png";
  }, []);

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
