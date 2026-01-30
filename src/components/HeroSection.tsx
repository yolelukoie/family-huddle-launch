import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const downloadUrl = "https://family-huddle-app.web.app/";
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <section id="home" className="pt-24 pb-16 md:pt-32 md:pb-24">
      {/* Full-width Video */}
      <div className="relative w-full aspect-square bg-muted animate-scale-in">
        <video 
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/promo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Sound Toggle Button */}
        <button
          onClick={toggleSound}
          className="absolute bottom-4 right-4 flex items-center gap-2 bg-background/80 backdrop-blur-sm text-foreground px-4 py-2 rounded-full shadow-soft-lg hover:bg-background/90 transition-all"
          aria-label={isMuted ? "Turn on sound" : "Turn off sound"}
        >
          {isMuted ? (
            <>
              <VolumeX className="w-5 h-5" />
              <span className="text-sm font-medium">Turn on sound</span>
            </>
          ) : (
            <>
              <Volume2 className="w-5 h-5" />
              <span className="text-sm font-medium">Sound on</span>
            </>
          )}
        </button>
      </div>

      {/* Text Content */}
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-6 animate-fade-in-up pt-10 md:pt-12" style={{ animationDelay: "0.2s" }}>
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
