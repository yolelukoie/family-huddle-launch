import { Check, ChevronDown } from "lucide-react";
import { PRICING, ANDROID_URL, IPHONE_URL } from "@/lib/yourlangcoach/content";
import { useYlcLang } from "@/lib/yourlangcoach/i18n";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const YLCPricing = () => {
  const { t } = useYlcLang();

  return (
    <section
      id="pricing"
      className="relative py-20 md:py-24 border-t border-[hsl(220,20%,12%)] overflow-hidden"
    >
      <div className="ylc-glow ylc-glow-3" aria-hidden="true" />

      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 md:mb-14">
            <p className="ylc-eyebrow">{t.pricing.eyebrow}</p>
            <h2 className="font-display font-semibold text-3xl md:text-4xl text-[hsl(220,25%,95%)] mt-3">
              {t.pricing.title}
            </h2>
            <p className="text-[hsl(220,15%,72%)] mt-4 max-w-2xl mx-auto">
              {t.pricing.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {PRICING.plans.map((plan, index) => {
              const copy = t.pricing.plans[index];
              return (
                <div
                  key={plan.name}
                  className={`ylc-card rounded-2xl p-7 flex flex-col relative ${
                    plan.highlight ? "ylc-card-highlight" : ""
                  }`}
                >
                  {plan.highlight && (
                    <span className="ylc-badge absolute -top-3 left-1/2 -translate-x-1/2">
                      {t.pricing.bestValue}
                    </span>
                  )}
                  {plan.fairUse && (
                    <span className="ylc-badge-soft absolute -top-3 left-1/2 -translate-x-1/2">
                      {t.pricing.fairUseBadge}
                    </span>
                  )}

                  <h3 className="font-display font-semibold text-lg text-[hsl(220,25%,93%)]">
                    {copy.name}
                  </h3>

                  <div className="mt-4 flex items-baseline gap-1" dir="ltr">
                    <span className="font-display font-bold text-4xl text-[hsl(220,25%,96%)]">
                      {plan.price}
                    </span>
                    <span className="text-[hsl(220,12%,60%)] text-sm">
                      {plan.period.includes("year") ? t.pricing.perYear : t.pricing.perMonth}
                    </span>
                  </div>

                  <p className="mt-3 text-sm text-[hsl(220,12%,68%)] leading-relaxed min-h-[3rem]">
                    {copy.tagline}
                  </p>

                  {plan.fairUse && (
                    <p className="mt-2 text-xs text-[hsl(220,12%,55%)]">{t.pricing.fairUseNote}</p>
                  )}

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        className={`mt-6 ylc-btn ${
                          plan.highlight ? "ylc-btn-primary" : "ylc-btn-secondary"
                        } px-5 py-3 rounded-xl text-sm font-medium text-center inline-flex items-center justify-center gap-1.5 w-full`}
                      >
                        {t.pricing.getStarted}
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="min-w-[10rem] bg-[hsl(222,30%,8%)] border-[hsl(220,20%,13%)] text-[hsl(220,20%,92%)]">
                      <DropdownMenuItem asChild>
                        <a
                          href={ANDROID_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cursor-pointer focus:bg-[hsl(235,60%,18%)] focus:text-[hsl(235,90%,78%)]"
                        >
                          {t.nav.android}
                        </a>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <a
                          href={IPHONE_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cursor-pointer focus:bg-[hsl(235,60%,18%)] focus:text-[hsl(235,90%,78%)]"
                        >
                          {t.nav.ios}
                        </a>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <ul className="mt-6 space-y-2.5">
                    <li className="flex items-start gap-2 text-sm text-[hsl(220,12%,72%)]">
                      <Check className="w-4 h-4 mt-0.5 text-[hsl(235,80%,72%)] flex-shrink-0" />
                      <span>{t.pricing.cancelAnytime}</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-[hsl(220,12%,72%)]">
                      <Check className="w-4 h-4 mt-0.5 text-[hsl(235,80%,72%)] flex-shrink-0" />
                      <span>{t.pricing.autoRenew}</span>
                    </li>
                  </ul>
                </div>
              );
            })}
          </div>

          <p className="mt-10 text-center text-xs text-[hsl(220,12%,55%)] max-w-2xl mx-auto">
            {t.pricing.smallPrint}
          </p>
        </div>
      </div>
    </section>
  );
};

export default YLCPricing;
