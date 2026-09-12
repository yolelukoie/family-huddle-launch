import { useEffect } from "react";
import YLCHeader from "@/components/yourlangcoach/YLCHeader";
import YLCFooter from "@/components/yourlangcoach/YLCFooter";
import YLCHero from "@/components/yourlangcoach/YLCHero";
import YLCHowItWorks from "@/components/yourlangcoach/YLCHowItWorks";
import YLCFeatures from "@/components/yourlangcoach/YLCFeatures";
import YLCPricing from "@/components/yourlangcoach/YLCPricing";
import FamilyHuddlePromo from "@/components/yourlangcoach/FamilyHuddlePromo";
import TeacherPartnerPromo from "@/components/yourlangcoach/TeacherPartnerPromo";
import { YlcLangProvider, useYlcLang } from "@/lib/yourlangcoach/i18n";

const META_DESCRIPTION =
  "YourLangCoach is a language-learning app created by a language coach, with AI-guided practice, spaced repetition, a personal dictionary, and a workbook for flexible self-learning.";

const YourLangCoachContent = () => {
  const { dir } = useYlcLang();

  return (
    <div dir={dir} className="ylc-theme min-h-screen flex flex-col">
      <YLCHeader />
      <main className="flex-1">
        <YLCHero />
        <YLCHowItWorks />
        <YLCFeatures />
        <TeacherPartnerPromo />
        <YLCPricing />
        <FamilyHuddlePromo />
      </main>
      <YLCFooter />
    </div>
  );
};

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
    <YlcLangProvider>
      <YourLangCoachContent />
    </YlcLangProvider>
  );
};

export default YourLangCoachIndex;
