import { useYlcLang } from "@/lib/yourlangcoach/i18n";

const YLCFeatures = () => {
  const { t } = useYlcLang();
  const h = t.home;

  return (
      <section id="features" className="py-20 md:py-24 border-t border-[hsl(220,20%,12%)] scroll-mt-16">
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
  );
};

export default YLCFeatures;
