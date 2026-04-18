import { Check } from "lucide-react";
import { PRICING, ANDROID_URL } from "@/lib/yourlangcoach/content";

const YLCPricing = () => {
  return (
    <section
      id="pricing"
      className="relative py-20 md:py-24 border-t border-[hsl(220,20%,12%)] overflow-hidden"
    >
      <div className="ylc-glow ylc-glow-3" aria-hidden="true" />

      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 md:mb-14">
            <p className="ylc-eyebrow">Pricing</p>
            <h2 className="font-display font-semibold text-3xl md:text-4xl text-[hsl(220,25%,95%)] mt-3">
              {PRICING.title}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {PRICING.plans.map((plan) => (
              <div
                key={plan.name}
                className={`ylc-card rounded-2xl p-7 flex flex-col relative ${
                  plan.highlight ? "ylc-card-highlight" : ""
                }`}
              >
                {plan.highlight && (
                  <span className="ylc-badge absolute -top-3 left-1/2 -translate-x-1/2">
                    Best value
                  </span>
                )}
                {plan.fairUse && (
                  <span className="ylc-badge-soft absolute -top-3 left-1/2 -translate-x-1/2">
                    Subject to fair use
                  </span>
                )}

                <h3 className="font-display font-semibold text-lg text-[hsl(220,25%,93%)]">
                  {plan.name}
                </h3>

                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-display font-bold text-4xl text-[hsl(220,25%,96%)]">
                    {plan.price}
                  </span>
                  <span className="text-[hsl(220,12%,60%)] text-sm">{plan.period}</span>
                </div>

                <p className="mt-3 text-sm text-[hsl(220,12%,68%)] leading-relaxed min-h-[3rem]">
                  {plan.tagline}
                </p>

                {plan.fairUse && (
                  <p className="mt-2 text-xs text-[hsl(220,12%,55%)]">
                    Voice usage is subject to fair use limits to maintain service quality.
                  </p>
                )}

                <a
                  href={ANDROID_URL}
                  className={`mt-6 ylc-btn ${
                    plan.highlight ? "ylc-btn-primary" : "ylc-btn-secondary"
                  } px-5 py-3 rounded-xl text-sm font-medium text-center`}
                >
                  Get started
                </a>

                <ul className="mt-6 space-y-2.5">
                  <li className="flex items-start gap-2 text-sm text-[hsl(220,12%,72%)]">
                    <Check className="w-4 h-4 mt-0.5 text-[hsl(235,80%,72%)] flex-shrink-0" />
                    <span>Cancel anytime in store</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-[hsl(220,12%,72%)]">
                    <Check className="w-4 h-4 mt-0.5 text-[hsl(235,80%,72%)] flex-shrink-0" />
                    <span>Auto-renews until canceled</span>
                  </li>
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-10 text-center text-xs text-[hsl(220,12%,55%)] max-w-2xl mx-auto">
            {PRICING.smallPrint}
          </p>
        </div>
      </div>
    </section>
  );
};

export default YLCPricing;
