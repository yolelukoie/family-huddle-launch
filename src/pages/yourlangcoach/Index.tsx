import { useEffect, useLayoutEffect } from "react";
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
  "Yuston turns the words you meet in real life into language you can actually use: save a word in one tap, review it with spaced repetition, and practice it with AI.";

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
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    const frame = window.requestAnimationFrame(() => window.scrollTo(0, 0));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    document.title = "Yuston — Learn words. Use them in conversation.";
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
    setMeta("og:title", document.title, "property");
    setMeta("og:description", META_DESCRIPTION, "property");
    setMeta("og:type", "website", "property");
    setMeta("og:site_name", "Yuston", "property");
    setMeta("og:url", "https://huddle-together-site.lovable.app/yourlangcoach", "property");
    setMeta("twitter:title", document.title);
    setMeta("twitter:description", META_DESCRIPTION);
    const icon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    const touchIcon = document.querySelector<HTMLLinkElement>('link[rel="apple-touch-icon"]');
    if (icon) icon.href = "/yourlangcoach/favicon.png";
    if (touchIcon) touchIcon.href = "/yourlangcoach/apple-touch-icon.png";
  }, []);

  return (
    <YlcLangProvider>
      <YourLangCoachContent />
    </YlcLangProvider>
  );
};

export default YourLangCoachIndex;
