import { HERO, ANDROID_URL, IPHONE_URL } from "@/lib/yourlangcoach/content";

const YLCHero = () => {
  return (
    <section className="ylc-hero relative overflow-hidden pt-20 md:pt-28 pb-20 md:pb-28">
      <div className="ylc-glow ylc-glow-1" aria-hidden="true" />
      <div className="ylc-glow ylc-glow-2" aria-hidden="true" />

      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl leading-[1.1] tracking-tight text-[hsl(220,25%,95%)] text-balance">
            {HERO.title.split("—")[0]}—
            <span className="ylc-text-gradient">
              {HERO.title.split("—")[1]}
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-[hsl(220,15%,75%)] text-balance">
            {HERO.subtitle}
          </p>

          <p className="mt-4 text-base text-[hsl(220,12%,60%)] max-w-2xl mx-auto">
            {HERO.supporting}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={ANDROID_URL}
              className="ylc-btn ylc-btn-primary px-7 py-3.5 rounded-xl text-base font-medium"
            >
              Download for Android
            </a>
            <a
              href={IPHONE_URL}
              className="ylc-btn ylc-btn-secondary px-7 py-3.5 rounded-xl text-base font-medium"
            >
              Download for iPhone
            </a>
          </div>

          <p className="mt-8 text-sm text-[hsl(220,12%,55%)]">
            {HERO.shortLine}
          </p>
        </div>
      </div>
    </section>
  );
};

export default YLCHero;
