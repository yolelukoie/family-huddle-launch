import { 
  Users2, 
  Trophy, 
  Footprints, 
  Sparkles, 
  Palette, 
  Globe, 
  Wallet 
} from "lucide-react";

const features = [
  {
    icon: Users2,
    title: "Equal roles for everyone",
    description: "Every member can assign tasks, accept or decline them, and create goals – no 'admin only' control. It's truly collaborative and egalitarian.",
    iconBg: "bg-[hsl(180,70%,92%)]",
    iconColor: "text-icon-turquoise",
  },
  {
    icon: Trophy,
    title: "Goals with planned rewards",
    description: "Set clear goals and decide in advance how you'll celebrate. Knowing the reward helps you stay motivated through the small daily steps.",
    iconBg: "bg-[hsl(45,95%,90%)]",
    iconColor: "text-icon-yellow",
  },
  {
    icon: Footprints,
    title: "Habit-building through small steps",
    description: "Break big goals into tiny, realistic actions. Family Huddle helps you focus on what you can do today, not just on the distant result.",
    iconBg: "bg-[hsl(145,60%,90%)]",
    iconColor: "text-icon-green",
  },
  {
    icon: Sparkles,
    title: "A character that grows with you",
    description: "Each member has a character that levels up as they complete tasks. As your habits grow, your character grows too.",
    iconBg: "bg-[hsl(270,60%,92%)]",
    iconColor: "text-icon-purple",
  },
  {
    icon: Palette,
    title: "Personalized avatars",
    description: "Customize your character's look so everyone in the group feels seen and represented.",
    iconBg: "bg-[hsl(340,75%,92%)]",
    iconColor: "text-icon-pink",
  },
  {
    icon: Globe,
    title: "Multi-language support",
    description: "Family Huddle currently supports multiple languages, so each person can comfortably use the app in their own language.",
    iconBg: "bg-[hsl(210,80%,92%)]",
    iconColor: "text-icon-blue",
  },
  {
    icon: Wallet,
    title: "Simple, transparent pricing",
    description: "All features for one low price – no ads, no hidden extras.",
    iconBg: "bg-[hsl(15,80%,92%)]",
    iconColor: "text-icon-coral",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-16 md:py-24 section-alt">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-foreground mb-4">
              What makes Family Huddle different
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
              Family Huddle isn't just another to-do list. It's designed for shared responsibility, motivation, and fun.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-card rounded-2xl p-6 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1 border border-border"
              >
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl ${feature.iconBg} flex items-center justify-center mb-4`}>
                  <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                </div>

                {/* Content */}
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
