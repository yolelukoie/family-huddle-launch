import { Link } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";
import ylcLogo from "@/assets/yourlangcoach-logo.png";

const OtherAppPromo = () => {
  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-violet-950 p-8 sm:p-12 shadow-2xl">
          {/* Soft glow accents */}
          <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-violet-500/20 blur-3xl" />

          <div className="relative flex flex-col md:flex-row items-center gap-6 md:gap-10 text-center md:text-left">
            <img
              src={ylcLogo}
              alt="YourLangCoach logo"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover shadow-lg shrink-0"
            />

            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-medium mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                Also from our team
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Want to see our other app, your personal language coach?
              </h2>
              <p className="text-white/70 text-base sm:text-lg">
                Meet YourLangCoach — AI-guided practice, spaced repetition, and a personal dictionary to help you learn a language your way.
              </p>
            </div>

            <Link
              to="/yourlangcoach"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-slate-900 font-semibold hover:bg-white/90 transition-colors shadow-lg shrink-0"
            >
              Check it out
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OtherAppPromo;
