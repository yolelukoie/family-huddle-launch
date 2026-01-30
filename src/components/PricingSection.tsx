import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  "Full access to all features",
  "Unlimited families and friend groups",
  "Unlimited goals and tasks",
  "Character growth and customization",
  "Multi-language support",
  "No ads",
];

const PricingSection = () => {
  const downloadUrl = "https://family-huddle-app.web.app/";

  return (
    <section id="pricing" className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-foreground">
              One simple price
            </h2>
          </div>

          {/* Pricing Card */}
          <div className="bg-card rounded-3xl p-8 md:p-10 shadow-soft-xl border border-border max-w-md mx-auto">
            <div className="text-center mb-8">
              <h3 className="font-display font-bold text-xl text-foreground mb-2">
                Family Huddle Premium
              </h3>
              <div className="flex items-baseline justify-center gap-1">
                <span className="font-display font-bold text-5xl text-primary">
                  US$3.99
                </span>
              </div>
              <p className="text-muted-foreground mt-1">per month</p>
            </div>

            {/* Benefits List */}
            <ul className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary-foreground" />
                  </div>
                  <span className="text-foreground text-sm">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <Button
              asChild
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-base py-6 rounded-xl shadow-soft-lg hover:shadow-soft-xl transition-all hover:-translate-y-0.5"
            >
              <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
                Start using Family Huddle
              </a>
            </Button>
          </div>

          {/* Additional Download Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="font-medium text-base px-8 py-6 rounded-xl border-2 hover:bg-muted"
            >
              <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
                Download for Android
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="font-medium text-base px-8 py-6 rounded-xl border-2 hover:bg-muted"
            >
              <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
                Download for iPhone
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
