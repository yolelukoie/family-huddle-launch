import { ReactNode, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import YLCHeader from "./YLCHeader";
import YLCFooter from "./YLCFooter";

interface Props {
  title: string;
  description: string;
  children: ReactNode;
}

const YLCLegalLayout = ({ title, description, children }: Props) => {
  useEffect(() => {
    document.title = `${title} — YourLangCoach`;
    const setMeta = (name: string, content: string, attr: "name" | "property" = "name") => {
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.content = content;
    };
    setMeta("description", description);
    setMeta("og:title", `${title} — YourLangCoach`, "property");
    setMeta("og:description", description, "property");
  }, [title, description]);

  return (
    <div className="ylc-theme min-h-screen flex flex-col">
      <YLCHeader />
      <main className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 py-12 md:py-16">
          <Link
            to="/yourlangcoach"
            className="inline-flex items-center gap-2 text-sm text-[hsl(220,12%,65%)] hover:text-[hsl(220,20%,92%)] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to YourLangCoach
          </Link>

          <article className="ylc-prose max-w-3xl mx-auto">{children}</article>
        </div>
      </main>
      <YLCFooter />
    </div>
  );
};

export default YLCLegalLayout;
