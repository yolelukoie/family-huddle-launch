import { Mic, Sparkles, Bell, MessagesSquare, FolderOpen, Check } from "lucide-react";
import { useYlcLang } from "@/lib/yourlangcoach/i18n";

const Arrow = () => (
  <span aria-hidden="true" className="text-[hsl(220,12%,45%)] text-sm">
    →
  </span>
);

const YLCStory = () => {
  const { t } = useYlcLang();
  const h = t.home;

  return (
    <>
      {/* Why words are forgotten */}
      <section className="py-20 md:py-24 border-t border-[hsl(220,20%,12%)]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="ylc-eyebrow">{h.forget.eyebrow}</p>
            <h2 className="font-display font-semibold text-3xl md:text-4xl text-[hsl(220,25%,95%)] mt-3 text-balance">
              {h.forget.title}
            </h2>
            <div className="mt-6 space-y-4 text-[hsl(220,15%,72%)] text-base md:text-lg">
              {h.forget.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="ylc-card ylc-card-highlight rounded-2xl px-6 py-5 mt-8 text-[hsl(220,25%,93%)] font-medium">
              {h.forget.highlight}
            </div>
          </div>
        </div>
      </section>

      {/* Capture */}
      <section className="py-20 md:py-24 border-t border-[hsl(220,20%,12%)]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="max-w-2xl">
              <p className="ylc-eyebrow">{h.capture.eyebrow}</p>
              <h2 className="font-display font-semibold text-3xl md:text-4xl text-[hsl(220,25%,95%)] mt-3">
                {h.capture.title}
              </h2>
              <p className="text-[hsl(220,15%,72%)] mt-4 text-lg">{h.capture.subtitle}</p>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {h.capture.sources.map((s) => (
                <span
                  key={s}
                  className="ylc-card rounded-full px-4 py-1.5 text-sm text-[hsl(220,15%,78%)]"
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="ylc-card ylc-card-highlight rounded-2xl px-6 py-5 mt-8 flex flex-wrap items-center gap-3 justify-center">
              {h.capture.flow.map((step, i) => (
                <span key={step} className="flex items-center gap-3">
                  {i > 0 && <Arrow />}
                  <span className="text-[hsl(220,25%,93%)] font-medium">{step}</span>
                </span>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-5 mt-8">
              <div className="ylc-card rounded-2xl p-6">
                <div className="ylc-icon-wrap mb-4">
                  <Mic className="w-5 h-5" strokeWidth={1.6} />
                </div>
                <h3 className="font-display font-semibold text-lg text-[hsl(220,25%,93%)] mb-2">
                  {h.capture.inputTitle}
                </h3>
                <p className="text-sm text-[hsl(220,12%,70%)] leading-relaxed">
                  {h.capture.inputText}
                </p>
                <p className="mt-4 text-sm text-[hsl(220,25%,90%)] font-medium">
                  {h.capture.note}
                </p>
                <p className="mt-2 text-sm text-[hsl(220,12%,62%)]">{h.capture.bulk}</p>
              </div>

              <div className="ylc-card rounded-2xl p-6">
                <div className="ylc-icon-wrap mb-4">
                  <Sparkles className="w-5 h-5" strokeWidth={1.6} />
                </div>
                <h3 className="font-display font-semibold text-lg text-[hsl(220,25%,93%)] mb-3">
                  {h.capture.cardTitle}
                </h3>
                <ul className="space-y-2">
                  {h.capture.cardItems.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check
                        className="w-4 h-4 mt-0.5 shrink-0 text-[hsl(260,60%,70%)]"
                        strokeWidth={2}
                      />
                      <span className="text-sm text-[hsl(220,12%,72%)]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Saving is only the first step */}
      <section className="py-20 md:py-24 border-t border-[hsl(220,20%,12%)]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="ylc-eyebrow">{h.notEnd.eyebrow}</p>
            <h2 className="font-display font-semibold text-3xl md:text-4xl text-[hsl(220,25%,95%)] mt-3 text-balance">
              {h.notEnd.title}
            </h2>

            <div className="grid md:grid-cols-2 gap-5 mt-10 text-start">
              <div className="ylc-card rounded-2xl p-6 opacity-80">
                <p className="text-sm uppercase tracking-wide text-[hsl(220,12%,55%)] mb-4">
                  {h.notEnd.otherTitle}
                </p>
                <div className="flex flex-wrap items-center gap-2.5">
                  {h.notEnd.otherFlow.map((s, i) => (
                    <span key={s} className="flex items-center gap-2.5">
                      {i > 0 && <Arrow />}
                      <span className="text-sm text-[hsl(220,12%,70%)]">{s}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="ylc-card ylc-card-highlight rounded-2xl p-6">
                <p className="text-sm uppercase tracking-wide text-[hsl(260,60%,75%)] mb-4">
                  {h.notEnd.ylcTitle}
                </p>
                <div className="flex flex-wrap items-center gap-2.5">
                  {h.notEnd.ylcFlow.map((s, i) => (
                    <span key={s} className="flex items-center gap-2.5">
                      {i > 0 && <Arrow />}
                      <span className="text-sm font-medium text-[hsl(220,25%,92%)]">{s}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <p className="mt-6 text-[hsl(220,15%,72%)]">{h.notEnd.note}</p>
          </div>
        </div>
      </section>

      {/* Remember */}
      <section className="py-20 md:py-24 border-t border-[hsl(220,20%,12%)]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center">
              <p className="ylc-eyebrow">{h.remember.eyebrow}</p>
              <h2 className="font-display font-semibold text-3xl md:text-4xl text-[hsl(220,25%,95%)] mt-3 text-balance">
                {h.remember.title}
              </h2>
              <p className="text-[hsl(220,15%,72%)] mt-4 text-lg">{h.remember.text}</p>
            </div>

            <div className="ylc-card ylc-card-highlight rounded-2xl px-6 py-5 mt-8 flex items-start gap-3">
              <div className="ylc-icon-wrap shrink-0">
                <Bell className="w-5 h-5" strokeWidth={1.6} />
              </div>
              <p className="text-[hsl(220,25%,93%)] font-medium self-center">
                {h.remember.highlight}
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-5 gap-3">
              {h.remember.timeline.map((point, i) => (
                <div key={point} className="ylc-card rounded-xl p-4 text-center">
                  <div className="text-xs text-[hsl(260,60%,72%)] mb-1">{i + 1}</div>
                  <div className="text-sm text-[hsl(220,15%,82%)]">{point}</div>
                </div>
              ))}
            </div>

            <p className="mt-6 text-sm text-[hsl(220,12%,58%)] text-center">
              {h.remember.caution}
            </p>
          </div>
        </div>
      </section>

      {/* Use */}
      <section className="py-20 md:py-24 border-t border-[hsl(220,20%,12%)]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="max-w-3xl">
              <p className="ylc-eyebrow">{h.use.eyebrow}</p>
              <h2 className="font-display font-semibold text-3xl md:text-4xl text-[hsl(220,25%,95%)] mt-3">
                {h.use.title}
              </h2>
              <p className="text-[hsl(220,15%,76%)] mt-4 text-lg">{h.use.subtitle}</p>
              <p className="text-[hsl(220,12%,66%)] mt-4">{h.use.intro}</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              {h.use.items.map((item) => (
                <div key={item} className="ylc-card rounded-xl px-5 py-4 flex items-start gap-3">
                  <MessagesSquare
                    className="w-4 h-4 mt-1 shrink-0 text-[hsl(260,60%,72%)]"
                    strokeWidth={1.8}
                  />
                  <span className="text-sm text-[hsl(220,13%,76%)]">{item}</span>
                </div>
              ))}
            </div>

            <div className="ylc-card ylc-card-highlight rounded-2xl px-6 py-6 mt-8 text-center">
              <p className="text-lg text-[hsl(220,25%,94%)] font-medium text-balance">
                {h.use.callout}
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                {h.use.flow.map((s, i) => (
                  <span key={s} className="flex items-center gap-3">
                    {i > 0 && <Arrow />}
                    <span className="text-sm text-[hsl(220,15%,80%)]">{s}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Discovery */}
            <div className="ylc-card rounded-2xl p-6 md:p-8 mt-6">
              <h3 className="font-display font-semibold text-xl md:text-2xl text-[hsl(220,25%,93%)]">
                {h.discovery.title}
              </h3>
              <p className="text-[hsl(220,12%,70%)] mt-3">{h.discovery.text}</p>
              <p className="text-sm text-[hsl(260,55%,78%)] mt-4">{h.discovery.note}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Workbook */}
      <section className="py-20 md:py-24 border-t border-[hsl(220,20%,12%)]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center">
              <p className="ylc-eyebrow">{h.workbook.eyebrow}</p>
              <h2 className="font-display font-semibold text-3xl md:text-4xl text-[hsl(220,25%,95%)] mt-3">
                {h.workbook.title}
              </h2>
              <p className="text-[hsl(220,15%,72%)] mt-4 text-lg">{h.workbook.subtitle}</p>
            </div>

            <div className="mt-8 flex flex-wrap gap-2 justify-center">
              {h.workbook.items.map((item) => (
                <span
                  key={item}
                  className="ylc-card rounded-full px-4 py-1.5 text-sm text-[hsl(220,15%,78%)]"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-8">
              {h.workbook.examples.map((ex) => (
                <div key={ex} className="ylc-card rounded-2xl p-5">
                  <div className="ylc-icon-wrap mb-3">
                    <FolderOpen className="w-5 h-5" strokeWidth={1.6} />
                  </div>
                  <p className="text-sm text-[hsl(220,13%,74%)] leading-relaxed">{ex}</p>
                </div>
              ))}
            </div>

            <p className="mt-6 text-center text-[hsl(220,12%,62%)] text-sm">
              {h.workbook.note}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default YLCStory;
