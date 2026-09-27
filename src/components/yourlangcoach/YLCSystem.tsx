import { useYlcLang } from "@/lib/yourlangcoach/i18n";

const YLCSystem = () => {
  const { t } = useYlcLang();
  const h = t.home;

  return (
      <section id="how-it-works" className="py-20 md:py-24 border-t border-[hsl(220,20%,12%)] scroll-mt-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10 md:mb-12">
              <h2 className="font-display font-semibold text-3xl md:text-4xl text-[hsl(220,25%,95%)] mt-3 text-balance">
                {h.system.eyebrow}
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">{h.example.title}</p>
            </div>

            <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {h.example.steps.map((step, i) => (
                <li key={step.label} className={`ylc-card rounded-xl p-5 md:p-6 border-t-2 ${i === 4 ? "border-t-primary ylc-card-highlight sm:col-span-2 lg:col-span-1" : "border-t-primary/50"}`}>
                  <span className="text-xs font-semibold text-primary">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{step.label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
  );
};

export default YLCSystem;
