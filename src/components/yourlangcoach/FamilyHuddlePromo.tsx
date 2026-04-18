import { Sparkles, ArrowRight } from "lucide-react";
import fhLogo from "@/assets/logo.png";

const FamilyHuddlePromo = () => {
  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-3xl border border-sky-200/60 bg-gradient-to-br from-sky-50 via-cyan-50 to-white p-8 sm:p-12 shadow-xl">
          {/* Soft cyan/sky glow accents matching Family Huddle */}
          <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-cyan-300/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-sky-300/40 blur-3xl" />

          <div className="relative flex flex-col md:flex-row items-center gap-6 md:gap-10 text-center md:text-left">
            <img
              src={fhLogo}
              alt="Family Huddle logo"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover shadow-md shrink-0"
            />

            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 text-sky-700 text-xs font-medium mb-3 border border-sky-200">
                <Sparkles className="w-3.5 h-3.5" />
                Also from our team
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 mb-2 tracking-tight">
                Want to see our other app, the family task hub?
              </h2>
              <p className="text-slate-600 text-base sm:text-lg">
                Meet Family Huddle — shared tasks, goals, and rewards that bring families and friends closer, together.
              </p>
            </div>

            <a
              href="https://familyhuddletasks.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-base font-semibold shrink-0 bg-gradient-to-r from-cyan-500 to-sky-500 text-white shadow-lg shadow-cyan-500/30 hover:from-cyan-600 hover:to-sky-600 transition-all hover:-translate-y-0.5"
            >
              Check it out
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FamilyHuddlePromo;
