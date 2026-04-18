import { Link } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";
import fhLogo from "@/assets/logo.png";

const FamilyHuddlePromo = () => {
  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-3xl border border-[hsl(220,20%,15%)] bg-gradient-to-br from-[hsl(222,30%,8%)] via-[hsl(222,32%,6%)] to-[hsl(235,30%,10%)] p-8 sm:p-12 shadow-2xl">
          {/* Soft glow accents matching YLC theme */}
          <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[hsl(190,80%,55%)]/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-[hsl(45,90%,60%)]/10 blur-3xl" />

          <div className="relative flex flex-col md:flex-row items-center gap-6 md:gap-10 text-center md:text-left">
            <img
              src={fhLogo}
              alt="Family Huddle logo"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover shadow-lg shrink-0"
            />

            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[hsl(220,20%,90%)] text-xs font-medium mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                Also from our team
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-semibold text-[hsl(220,20%,95%)] mb-2 tracking-tight">
                Want to see our other app, the family task hub?
              </h2>
              <p className="text-[hsl(220,12%,70%)] text-base sm:text-lg">
                Meet Family Huddle — shared tasks, goals, and rewards that bring families and friends closer, together.
              </p>
            </div>

            <a
              href="https://familyhuddletasks.com"
              className="ylc-btn ylc-btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl text-base font-medium shrink-0"
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
