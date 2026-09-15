import { useEffect } from "react";
import YLCHeader from "@/components/yourlangcoach/YLCHeader";
import YLCFooter from "@/components/yourlangcoach/YLCFooter";
import YLCHero from "@/components/yourlangcoach/YLCHero";
import YLCStory from "@/components/yourlangcoach/YLCStory";
import YLCSystem from "@/components/yourlangcoach/YLCSystem";
import YLCFinalCta from "@/components/yourlangcoach/YLCFinalCta";
import YLCFeatures from "@/components/yourlangcoach/YLCFeatures";
import YLCPricing from "@/components/yourlangcoach/YLCPricing";
import FamilyHuddlePromo from "@/components/yourlangcoach/FamilyHuddlePromo";
import TeacherPartnerPromo from "@/components/yourlangcoach/TeacherPartnerPromo";
import { YlcLangProvider, useYlcLang } from "@/lib/yourlangcoach/i18n";

const META_DESCRIPTION =
  "YourLangCoach turns the words you meet in real life into language you can actually use: save a word in one tap, review it with spaced repetition, and practice it with AI.";

const YourLangCoachContent = () => {
  const { dir } = useYlcLang();

  return (
    <div dir={dir} className="ylc-theme min-h-screen flex flex-col">
      <YLCHeader />
      <main className="flex-1">
        <YLCHero />
        <YLCStory />
        <YLCSystem />
        <YLCFeatures />
        <TeacherPartnerPromo />
        <YLCPricing />
        <YLCFinalCta />
        <FamilyHuddlePromo />
      </main>
      <YLCFooter />
    </div>
  );
};

const YourLangCoachIndex = () => {
  useEffect(() => {
    document.title = "YourLangCoach — Turn the words you meet into words you use";
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
    setMeta("og:title", "YourLangCoach — Turn the words you meet into words you use", "property");
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
