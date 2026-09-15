import { BookMarked, Repeat, Brain, MessageCircle, Sparkles, NotebookPen } from "lucide-react";
import { useYlcLang } from "@/lib/yourlangcoach/i18n";

const icons = [BookMarked, Repeat, Brain, MessageCircle, Sparkles, NotebookPen];

const YLCFeatures = () => {
  const { t } = useYlcLang();
  const h = t.home;

  return (
    <>
      {/* Learning styles */}
      <section className="py-20 md:py-24 border-t border-[hsl(220,20%,12%)]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="ylc-eyebrow">{h.styles.eyebrow}</p>
            <h2 className="font-display font-semibold text-3xl md:text-4xl text-[hsl(220,25%,95%)] mt-3">
              {h.styles.title}
            </h2>

            <ul className="mt-8 grid sm:grid-cols-2 gap-3 text-start">
              {h.styles.items.map((item) => (
                <li key={item} className="ylc-card flex items-start gap-3 px-4 py-3 rounded-xl">
                  <span className="ylc-bullet-dot mt-2" />
                  <span className="text-[hsl(220,15%,82%)] text-sm md:text-base">{item}</span>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-[hsl(220,13%,68%)]">{h.styles.note}</p>
          </div>
        </div>
      </section>

      {/* Why YourLangCoach */}
      <section id="features" className="py-20 md:py-24 border-t border-[hsl(220,20%,12%)]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 md:mb-14">
              <p className="ylc-eyebrow">{h.why.eyebrow}</p>
              <h2 className="font-display font-semibold text-3xl md:text-4xl text-[hsl(220,25%,95%)] mt-3 text-balance">
                {h.why.title}
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {h.why.items.map((item, i) => {
                const Icon = icons[i] ?? Sparkles;
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

      {/* Outcome */}
      <section className="py-20 md:py-24 border-t border-[hsl(220,20%,12%)]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display font-semibold text-3xl md:text-4xl text-[hsl(220,25%,95%)] text-balance">
              {h.outcome.title}
            </h2>
            <p className="text-[hsl(220,15%,74%)] mt-5 text-lg">{h.outcome.text}</p>
            <div className="mt-6 space-y-1.5 text-[hsl(220,13%,70%)]">
              {h.outcome.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default YLCFeatures;
