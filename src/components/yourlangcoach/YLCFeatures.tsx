import { Sparkles, Route, Brain, FileText, Users } from "lucide-react";
import { FEATURES } from "@/lib/yourlangcoach/content";

const icons = [Sparkles, Route, Brain, FileText, Users];

const YLCFeatures = () => {
  return (
    <section id="features" className="py-20 md:py-24 border-t border-[hsl(220,20%,12%)]">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 md:mb-14">
            <p className="ylc-eyebrow">What makes YourLangCoach different</p>
            <h2 className="font-display font-semibold text-3xl md:text-4xl text-[hsl(220,25%,95%)] mt-3">
              {FEATURES.title}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.items.map((item, i) => {
              const Icon = icons[i];
              return (
                <div key={item.title} className="ylc-card rounded-2xl p-6">
                  <div className="ylc-icon-wrap mb-4">
                    <Icon className="w-5 h-5" strokeWidth={1.6} />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-[hsl(220,25%,93%)] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[hsl(220,12%,68%)] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default YLCFeatures;
