import { Home, Users, Check } from "lucide-react";

const familyBullets = [
  { text: "Share responsibility for chores, homework, and routines.", bold: false },
  { text: "Let kids and teens take ownership by assigning tasks too, not just receiving them.", bold: true },
  { text: "Turn \"Did you do it?\" into \"Let's check it off together.\"", bold: false },
];

const friendsBullets = [
  { text: "Support each other with fitness, study, or creative goals.", bold: false },
  { text: "Create shared challenges with small daily tasks.", bold: false },
  { text: "Keep each other accountable in a friendly, playful way.", bold: false },
];

const ForFamiliesSection = () => {
  return (
    <section id="for-families" className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-foreground">
              Built for real families and real friend groups
            </h2>
          </div>

          {/* Two Columns */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Families Card */}
            <div className="bg-card rounded-2xl p-6 md:p-8 shadow-soft hover:shadow-soft-lg transition-all duration-300 border border-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-feature-icon-bg flex items-center justify-center">
                  <Home className="w-6 h-6 text-feature-icon-color" />
                </div>
                <h3 className="font-display font-bold text-xl text-foreground">
                  For families
                </h3>
              </div>
              <ul className="space-y-4">
                {familyBullets.map((bullet, index) => (
                  <li key={index} className="flex gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-muted-foreground text-sm leading-relaxed">
                      {bullet.bold ? <strong className="text-foreground">{bullet.text}</strong> : bullet.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Friends Card */}
            <div className="bg-card rounded-2xl p-6 md:p-8 shadow-soft hover:shadow-soft-lg transition-all duration-300 border border-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-feature-icon-bg flex items-center justify-center">
                  <Users className="w-6 h-6 text-feature-icon-color" />
                </div>
                <h3 className="font-display font-bold text-xl text-foreground">
                  For friends
                </h3>
              </div>
              <ul className="space-y-4">
                {friendsBullets.map((bullet, index) => (
                  <li key={index} className="flex gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-muted-foreground text-sm leading-relaxed">
                      {bullet.bold ? <strong className="text-foreground">{bullet.text}</strong> : bullet.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForFamiliesSection;
