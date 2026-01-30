import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";

const HeroSection = () => {
  const downloadUrl = "https://family-huddle-app.web.app/";
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section id="home" className="pt-24 md:pt-32">
      {/* Full-width Video Container */}
      <div className="relative w-full animate-scale-in lg:max-h-[85vh]">
        <video 
          ref={videoRef}
          className="w-full h-full object-contain lg:max-h-[85vh]"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/promo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Sound Toggle Button */}
        <Button
          onClick={toggleSound}
          size="sm"
          variant="secondary"
          className="absolute bottom-2 right-4 md:bottom-4 bg-background/80 backdrop-blur-sm hover:bg-background/90 shadow-soft-lg"
        >
          {isMuted ? (
            <>
              <VolumeX className="w-4 h-4 mr-2" />
              Turn on sound
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 mr-2" />
              Mute
            </>
          )}
        </Button>
      </div>

      {/* Text Content */}
      <div className="container mx-auto px-4 sm:px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight text-balance">
              Family Huddle – small steps,{" "}
              <span className="text-primary">big wins together</span>
            </h1>

            <p className="text-lg md:text-xl max-w-2xl mx-auto text-balance">
              <strong className="text-foreground">An equal space where kids, teens, and adults set goals and support each other's routines.</strong>
            </p>

            <p className="text-base text-muted-foreground max-w-xl mx-auto">
              Everyone can create tasks, accept or decline them, and celebrate small steps together.
            </p>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                asChild
                size="lg"
                variant="gradient"
                className="font-semibold text-base px-8 py-6 rounded-xl"
              >
                <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
                  Download for Android
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="gradientAlt"
                className="font-semibold text-base px-8 py-6 rounded-xl"
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
