import { useEffect } from "react";
import TeacherPartnerPage from "@/components/yourlangcoach/TeacherPartnerPage";

const META_DESCRIPTION = "Join the YourLangCoach Teacher Partner Program in Israel and give every student one month of Premium free.";

const TeacherPartner = () => {
  useEffect(() => {
    document.title = "Teacher Partner Program | YourLangCoach";
    const setMeta = (name: string, content: string, attr: "name" | "property" = "name") => {
      let element = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.content = content;
    };
    setMeta("description", META_DESCRIPTION);
    setMeta("og:title", "Teacher Partner Program | YourLangCoach", "property");
    setMeta("og:description", META_DESCRIPTION, "property");
    setMeta("og:type", "website", "property");
    setMeta("twitter:card", "summary");
  }, []);

  return <TeacherPartnerPage />;
};

export default TeacherPartner;
