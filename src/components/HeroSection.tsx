import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const downloadUrl = "https://family-huddle-app.web.app/";

  return (
    <section id="home" className="pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Video Placeholder */}
          <div className="relative mb-10 md:mb-12 rounded-2xl overflow-hidden shadow-soft-xl bg-muted aspect-video max-w-3xl mx-auto animate-scale-in">
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
              <button
                className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary/90 hover:bg-primary text-primary-foreground flex items-center justify-center transition-all hover:scale-105 shadow-soft-lg"
                aria-label="Play video"
              >
                <Play className="w-8 h-8 md:w-10 md:h-10 ml-1" fill="currentColor" />
              </button>
            </div>
            {/* Placeholder text */}
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <p className="text-xs text-muted-foreground bg-background/80 backdrop-blur-sm rounded-lg py-2 px-4 inline-block">
                Video placeholder – replace with your promo video
              </p>
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight text-balance">
              Family Huddle – small steps,{" "}
              <span className="text-primary">big wins together</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              A shared task and goals app for families and friends who want to support each other, build habits, and celebrate progress as a team.
            </p>

            <p className="text-base text-muted-foreground max-w-xl mx-auto">
              Create shared goals, assign tasks to each other, and watch your characters grow with every small step you take.
            </p>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-base px-8 py-6 rounded-xl shadow-soft-lg hover:shadow-soft-xl transition-all hover:-translate-y-0.5"
              >
                <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
                  Download for Android
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base px-8 py-6 rounded-xl shadow-soft-lg hover:shadow-soft-xl transition-all hover:-translate-y-0.5"
              >
                <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
                  Download for iPhone
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
