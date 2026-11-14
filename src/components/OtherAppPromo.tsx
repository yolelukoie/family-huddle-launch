import { Link } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";
import ylcLogo from "@/assets/yuston-icon.png";

const OtherAppPromo = () => {
  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="container mx-auto max-w-4xl">
        {/* Yuston's own look ("paper and ink", the app's design): paper, ink, Yuston green; no gradients or glow */}
        <div className="relative overflow-hidden rounded-3xl border border-[#E6E3DC] bg-[#FBFAF6] p-8 sm:p-12 shadow-[0_24px_48px_-32px_rgba(28,27,24,0.35)]">

          <div className="relative flex flex-col md:flex-row items-center gap-6 md:gap-10 text-center md:text-left">
            <img
              src={ylcLogo}
              alt="Yuston logo"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover shrink-0"
            />

            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E3EEE8] text-[#1F5A43] text-xs font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                Also from our team
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1B18] mb-2 tracking-tight" style={{ fontFamily: "'Bricolage Grotesque', Inter, sans-serif" }}>
                Want to see our other app, your personal language coach?
              </h2>
              <p className="text-[#6E6B64] text-base sm:text-lg">
                Meet Yuston — AI-guided practice, spaced repetition, and a personal dictionary to help you learn a language your way.
              </p>
            </div>

            <Link
              to="/yourlangcoach"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1F5A43] text-white font-semibold hover:brightness-110 transition shrink-0"
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
