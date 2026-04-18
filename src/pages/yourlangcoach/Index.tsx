import { useEffect } from "react";
import YLCHeader from "@/components/yourlangcoach/YLCHeader";
import YLCFooter from "@/components/yourlangcoach/YLCFooter";
import YLCHero from "@/components/yourlangcoach/YLCHero";
import YLCHowItWorks from "@/components/yourlangcoach/YLCHowItWorks";
import YLCFeatures from "@/components/yourlangcoach/YLCFeatures";
import YLCPricing from "@/components/yourlangcoach/YLCPricing";
import FamilyHuddlePromo from "@/components/yourlangcoach/FamilyHuddlePromo";

const META_DESCRIPTION =
  "YourLangCoach is a language-learning app created by a language coach, with AI-guided practice, spaced repetition, a personal dictionary, and a workbook for flexible self-learning.";

const YourLangCoachIndex = () => {
  useEffect(() => {
    document.title = "YourLangCoach — Learn a language your way";
    const setMeta = (name: string, content: string, attr: "name" | "property" = "name") => {
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.content = content;
    };
    setMeta("description", META_DESCRIPTION);
    setMeta("og:title", "YourLangCoach — Learn a language your way", "property");
    setMeta("og:description", META_DESCRIPTION, "property");
    setMeta("og:type", "website", "property");
  }, []);

  return (
    <div className="ylc-theme min-h-screen flex flex-col">
      <YLCHeader />
      <main className="flex-1">
        <YLCHero />
        <YLCHowItWorks />
        <YLCFeatures />
        <YLCPricing />
        <FamilyHuddlePromo />
      </main>
      <YLCFooter />
    </div>
  );
};

export default YourLangCoachIndex;
