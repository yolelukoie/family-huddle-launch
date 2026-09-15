import { ANDROID_URL, IPHONE_URL } from "@/lib/yourlangcoach/content";
import { useYlcLang } from "@/lib/yourlangcoach/i18n";

const YLCHero = () => {
  const { t } = useYlcLang();
  const h = t.home.hero;

  return (
    <section className="ylc-hero relative overflow-hidden pt-20 md:pt-28 pb-16 md:pb-24">
      <div className="ylc-glow ylc-glow-1" aria-hidden="true" />
      <div className="ylc-glow ylc-glow-2" aria-hidden="true" />

      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl leading-[1.1] tracking-tight text-[hsl(220,25%,95%)] text-balance">
            {h.titleA}
            <span className="ylc-text-gradient">{h.titleB}</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-[hsl(220,15%,78%)] text-balance">
            {h.subtitle}
          </p>

          <p className="mt-5 text-base text-[hsl(220,14%,68%)] max-w-2xl mx-auto">
            {h.supporting}
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

          <p className="mt-9 text-sm font-medium tracking-wide text-[hsl(220,14%,62%)]">
            {h.shortLine}
          </p>
        </div>
      </div>
    </section>
  );
};

export default YLCHero;
