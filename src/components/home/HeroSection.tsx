
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection({ isAuthenticated }: { isAuthenticated: boolean }) {
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    setHeroLoaded(true);
  }, []);

  if (isAuthenticated) {
    return null;
  }

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        <img 
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80"
          alt="Wellness background" 
          className="h-full w-full object-cover opacity-20"
          onLoad={() => setHeroLoaded(true)}
        />
      </div>
      
      <div className="container relative z-10 px-4 py-20 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center rounded-full border bg-background/80 backdrop-blur px-3 py-1 text-sm font-medium">
            <span className="flex h-2 w-2 rounded-full bg-primary"></span>
            <span className="ml-2">Your complete health companion</span>
          </div>
          
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 ${heroLoaded ? 'animate-slide-in' : 'opacity-0'}`}>
            Transform Your Health Journey
          </h1>
          
          <p className={`mb-8 text-lg text-muted-foreground ${heroLoaded ? 'animate-slide-in animation-delay-200' : 'opacity-0'}`}>
            Access personalized health advice, fitness plans, nutrition guidance, mental wellness resources, and a comprehensive medicine database all in one place.
          </p>
          
          <div className={`flex flex-col sm:flex-row justify-center gap-4 ${heroLoaded ? 'animate-slide-in animation-delay-300' : 'opacity-0'}`}>
            <Button asChild size="lg" className="rounded-full">
              <Link to="/auth">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <a href="#features">Learn More</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
