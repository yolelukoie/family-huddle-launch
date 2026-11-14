import { ANDROID_URL, IPHONE_URL } from "@/lib/yourlangcoach/content";
import { useYlcLang } from "@/lib/yourlangcoach/i18n";

const YLCHero = () => {
  const { t, dir } = useYlcLang();
  const h = t.home.hero;
  const arrow = dir === "rtl" ? "←" : "→";

  return (
    <section className="ylc-hero relative overflow-hidden pt-20 md:pt-28 pb-16 md:pb-24">
      <div className="ylc-glow ylc-glow-1" aria-hidden="true" />
      <div className="ylc-glow ylc-glow-2" aria-hidden="true" />

      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl leading-[1.1] tracking-tight text-foreground text-balance">
            {h.titleA}
            <span className="ylc-text-gradient">{h.titleB}</span>
            {h.titleC}
          </h1>

          <p className="mt-6 text-lg md:text-xl text-[hsl(var(--ylc-ink-2))] text-balance whitespace-pre-line">
            {h.subtitle}
          </p>

          <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={ANDROID_URL}
              className="ylc-btn ylc-btn-primary px-7 py-3.5 rounded-xl text-base font-medium"
            >
              {h.downloadAndroid}
            </a>
            <a
              href={IPHONE_URL}
              className="ylc-btn ylc-btn-primary px-7 py-3.5 rounded-xl text-base font-medium"
            >
              {h.downloadIphone}
            </a>
            <a
              href="#how-it-works"
              className="ylc-btn ylc-btn-secondary px-7 py-3.5 rounded-xl text-base font-medium"
            >
              {h.seeHow}
            </a>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">{h.note}</p>

          <div
            className="mt-10 mx-auto max-w-3xl flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-y-1.5 sm:gap-x-2.5 sm:gap-y-2"
            aria-label={h.cycle.steps.join(", ")}
          >
            {h.cycle.steps.map((step) => (
              <span key={step} className="contents">
                <span className="max-w-full px-4 py-2 rounded-full text-center text-[0.95rem] text-foreground bg-card border border-border">
                  {step}
                </span>
                <span className="font-semibold text-primary" aria-hidden="true">
                  <span className="sm:hidden">↓</span>
                  <span className="hidden sm:inline">{arrow}</span>
                </span>
              </span>
            ))}
            <span className="text-center text-[0.95rem] text-muted-foreground">{h.cycle.tail}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YLCHero;
