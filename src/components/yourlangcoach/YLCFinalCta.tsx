import { ANDROID_URL, IPHONE_URL } from "@/lib/yourlangcoach/content";
import { useYlcLang } from "@/lib/yourlangcoach/i18n";

const YLCFinalCta = () => {
  const { t } = useYlcLang();
  const c = t.home.finalCta;

  return (
    <section className="relative py-20 md:py-24 border-t border-[hsl(220,20%,12%)] overflow-hidden">
      <div className="ylc-glow ylc-glow-2" aria-hidden="true" />
      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display font-semibold text-3xl md:text-4xl text-[hsl(220,25%,95%)] text-balance">
            {c.title}
          </h2>
          <p className="mt-5 text-lg text-[hsl(220,15%,75%)]">{c.subtitle}</p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={ANDROID_URL}
              className="ylc-btn ylc-btn-primary px-7 py-3.5 rounded-xl text-base font-medium"
            >
              {c.primary} — Android
            </a>
            <a
              href={IPHONE_URL}
              className="ylc-btn ylc-btn-primary px-7 py-3.5 rounded-xl text-base font-medium"
            >
              {c.primary} — iPhone
            </a>
            <a
              href="#how-it-works"
              className="ylc-btn ylc-btn-secondary px-7 py-3.5 rounded-xl text-base font-medium"
            >
              {c.secondary}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YLCFinalCta;
