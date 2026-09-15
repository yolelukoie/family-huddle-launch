import { useYlcLang } from "@/lib/yourlangcoach/i18n";
import reviewDashboard from "@/assets/ylc-review-dashboard.jpeg";
import workbookGrid from "@/assets/ylc-workbook-grid.jpeg";

const YLCSystem = () => {
  const { t } = useYlcLang();
  const h = t.home;

  return (
    <>
      {/* The whole loop */}
      <section id="how-it-works" className="py-20 md:py-24 border-t border-[hsl(220,20%,12%)]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10 md:mb-12">
              <p className="ylc-eyebrow">{h.system.eyebrow}</p>
              <h2 className="font-display font-semibold text-3xl md:text-4xl text-[hsl(220,25%,95%)] mt-3 text-balance">
                {h.system.title}
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-min">
              {h.system.steps.map((step) => (
                <div key={step.num} className="ylc-card rounded-2xl p-5">
                  <div className="text-xs font-semibold tracking-[0.2em] text-[hsl(260,60%,72%)]">
                    {step.num}
                  </div>
                  <h3 className="font-display font-semibold text-lg text-[hsl(220,25%,93%)] mt-2">
                    {step.label}
                  </h3>
                  <p className="text-sm text-[hsl(260,45%,78%)] mt-1">{step.flow}</p>
                  <p className="text-sm text-[hsl(220,12%,68%)] leading-relaxed mt-3">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-8 text-center text-[hsl(220,15%,78%)] text-lg text-balance">
              {h.system.footer}
            </p>
          </div>
        </div>
      </section>

      {/* Differentiation */}
      <section className="py-20 md:py-24 border-t border-[hsl(220,20%,12%)]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <p className="ylc-eyebrow">{h.different.eyebrow}</p>
              <h2 className="font-display font-semibold text-3xl md:text-4xl text-[hsl(220,25%,95%)] mt-3 text-balance">
                {h.different.title}
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {h.different.columns.map((c) => (
                <div key={c.title} className="ylc-card rounded-2xl p-6 opacity-85">
                  <h3 className="font-display font-semibold text-base text-[hsl(220,20%,88%)]">
                    {c.title}
                  </h3>
                  <p className="text-sm text-[hsl(220,12%,65%)] mt-2 leading-relaxed">{c.text}</p>
                </div>
              ))}
            </div>

            <div className="ylc-card ylc-card-highlight rounded-2xl p-6 md:p-8 mt-4">
              <h3 className="font-display font-semibold text-xl text-[hsl(220,25%,94%)]">
                {h.different.ylcTitle}
              </h3>
              <p className="text-[hsl(220,15%,80%)] mt-2 text-base md:text-lg">
                {h.different.ylcText}
              </p>
            </div>

            <p className="mt-6 text-center text-[hsl(220,13%,70%)]">{h.different.footer}</p>
          </div>
        </div>
      </section>

      {/* Real-life example */}
      <section className="py-20 md:py-24 border-t border-[hsl(220,20%,12%)]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <p className="ylc-eyebrow">{h.example.eyebrow}</p>
              <h2 className="font-display font-semibold text-3xl md:text-4xl text-[hsl(220,25%,95%)] mt-3 text-balance">
                {h.example.title}
              </h2>
              <p className="text-[hsl(220,15%,72%)] mt-4 text-lg">{h.example.intro}</p>
            </div>

            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
              <ol className="space-y-3">
                {h.example.steps.map((step, i) => (
                  <li key={step.label} className="ylc-card rounded-xl px-5 py-4 flex gap-4">
                    <span className="text-sm font-semibold text-[hsl(260,60%,72%)] mt-0.5">
                      0{i + 1}
                    </span>
                    <span>
                      <span className="block text-[hsl(220,25%,92%)] font-medium">
                        {step.label}
                      </span>
                      <span className="block text-sm text-[hsl(220,12%,68%)] mt-1">
                        {step.text}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>

              <div className="grid grid-cols-2 gap-4">
                <img
                  src={reviewDashboard}
                  alt="YourLangCoach review reminders on a phone"
                  loading="lazy"
                  className="w-full rounded-2xl border border-[hsl(220,20%,16%)]"
                />
                <img
                  src={workbookGrid}
                  alt="YourLangCoach workbook with saved learning materials"
                  loading="lazy"
                  className="w-full rounded-2xl border border-[hsl(220,20%,16%)]"
                />
                <p className="col-span-2 text-xs text-center text-[hsl(220,12%,55%)]">
                  {h.example.caption}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default YLCSystem;
