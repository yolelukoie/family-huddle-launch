import { Link } from "react-router-dom";
import { ANDROID_URL } from "@/lib/yourlangcoach/content";

const YLCHeader = () => {
  return (
    <header className="ylc-header sticky top-0 z-50 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/yourlangcoach" className="flex items-center gap-2.5 group">
          {/* TODO: replace logo with real asset (e.g. <img src="/yourlangcoach-logo.svg" />) */}
          <span className="ylc-logo-mark w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold">
            Y
          </span>
          <span className="font-display font-semibold text-base tracking-tight text-[hsl(220,20%,92%)]">
            YourLangCoach
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm text-[hsl(220,12%,65%)]">
          <a href="#how-it-works" className="hover:text-[hsl(220,20%,92%)] transition-colors">
            How it works
          </a>
          <a href="#features" className="hover:text-[hsl(220,20%,92%)] transition-colors">
            Features
          </a>
          <a href="#pricing" className="hover:text-[hsl(220,20%,92%)] transition-colors">
            Pricing
          </a>
        </nav>

        <a
          href={ANDROID_URL}
          className="ylc-btn ylc-btn-primary text-sm px-4 py-2 rounded-lg"
        >
          Download
        </a>
      </div>
    </header>
  );
};

export default YLCHeader;
