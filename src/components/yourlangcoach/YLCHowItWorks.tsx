import { MessageCircle, BookMarked, Repeat, NotebookPen } from "lucide-react";
import { HOW_IT_WORKS, FLEX_SECTION } from "@/lib/yourlangcoach/content";

const icons = [MessageCircle, BookMarked, Repeat, NotebookPen];

const YLCHowItWorks = () => {
  return (
    <>
      {/* Flexible self-learning */}
      <section className="py-20 md:py-24 border-t border-[hsl(220,20%,12%)]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="ylc-eyebrow">Built for flexible self-learning</p>
            <h2 className="font-display font-semibold text-3xl md:text-4xl text-[hsl(220,25%,95%)] mt-3">
              {FLEX_SECTION.title}
            </h2>
            <p className="text-[hsl(220,15%,70%)] mt-4">{FLEX_SECTION.intro}</p>

            <ul className="mt-8 grid gap-3 max-w-xl mx-auto text-left">
              {FLEX_SECTION.bullets.map((b) => (
                <li
                  key={b}
                  className="ylc-card flex items-start gap-3 px-4 py-3 rounded-xl"
                >
                  <span className="ylc-bullet-dot mt-2" />
                  <span className="text-[hsl(220,15%,82%)] text-sm md:text-base">
                    {b}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 md:py-24 border-t border-[hsl(220,20%,12%)]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 md:mb-14">
              <p className="ylc-eyebrow">How it works</p>
              <h2 className="font-display font-semibold text-3xl md:text-4xl text-[hsl(220,25%,95%)] mt-3">
                {HOW_IT_WORKS.title}
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {HOW_IT_WORKS.steps.map((step, i) => {
                const Icon = icons[i];
                return (
                  <div key={step.title} className="ylc-card rounded-2xl p-6 relative">
                    <div className="ylc-step-number">{i + 1}</div>
                    <div className="ylc-icon-wrap mb-4">
                      <Icon className="w-5 h-5" strokeWidth={1.6} />
                    </div>
                    <h3 className="font-display font-semibold text-lg text-[hsl(220,25%,93%)] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-[hsl(220,12%,68%)] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default YLCHowItWorks;
