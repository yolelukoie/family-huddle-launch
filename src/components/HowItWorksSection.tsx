import { Users, Target, ListTodo, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: Users,
    title: "Create your huddle",
    description: "Invite your family members or friends and build a shared space for your goals, routines, and projects.",
    iconBg: "bg-[hsl(180,70%,92%)]",
    iconColor: "text-icon-turquoise",
  },
  {
    icon: Target,
    title: "Set goals and rewards",
    description: "Decide what you're working toward – a clean house, exam success, fitness streak, a trip – and plan a reward you'll enjoy together when you reach it.",
    iconBg: "bg-[hsl(15,80%,92%)]",
    iconColor: "text-icon-coral",
  },
  {
    icon: ListTodo,
    title: "Assign tasks to each other",
    description: "Everyone in the group can create, assign, accept, or decline tasks. Kids can ask parents for help, parents can delegate chores, friends can challenge each other – it's fully egalitarian.",
    iconBg: "bg-[hsl(270,60%,92%)]",
    iconColor: "text-icon-purple",
  },
  {
    icon: TrendingUp,
    title: "Do small steps every day",
    description: "Complete tasks, keep your streaks alive, and watch your character and your group progress grow over time.",
    iconBg: "bg-[hsl(145,60%,90%)]",
    iconColor: "text-icon-green",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-16 md:py-24 section-alt">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-foreground mb-4">
              Turn everyday tasks into shared victories
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
              Family Huddle helps you turn big dreams into tiny daily actions. Create a group with your family or friends, set shared goals, and break them down into small tasks that anyone can take on. Check off tasks, collect points, and see your progress grow together.
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="relative bg-card rounded-2xl p-6 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1 card-accent"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Step Number */}
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center shadow-soft">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl ${step.iconBg} flex items-center justify-center mb-4`}>
                  <step.icon className={`w-6 h-6 ${step.iconColor}`} />
                </div>

                {/* Content */}
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
