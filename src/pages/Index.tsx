
import { useState } from "react";
import { Link } from "react-router-dom"; 
import { 
  ArrowRight, 
  Heart, 
  Brain, 
  Dumbbell, 
  Salad, 
  Pill, 
  Users,
  ChevronRight,
  Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import { FeatureCard } from "@/components/ui/feature-card";
import { StatCard } from "@/components/ui/stat-card";
import { useTheme } from "@/components/ThemeProvider";

const HomePage = () => {
  const { theme } = useTheme();
  const [heroLoaded, setHeroLoaded] = useState(false);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
          <img 
            src={`https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80`}
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
              Access personalized health advice, fitness plans, nutrition guidance, and mental wellness resources all in one place.
            </p>
            
            <div className={`flex flex-col sm:flex-row justify-center gap-4 ${heroLoaded ? 'animate-slide-in animation-delay-300' : 'opacity-0'}`}>
              <Button asChild size="lg" className="rounded-full">
                <Link to="/fitness">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <Link to="/health-conditions">Explore Health Conditions</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="section-padding">
        <div className="container px-4">
          <SectionHeader 
            title="Your Complete Wellness Solution"
            description="HealthHub provides a comprehensive approach to health, bringing together all aspects of physical and mental wellbeing."
          />
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard 
              icon={Dumbbell}
              title="Personalized Fitness"
              description="Customized workout plans tailored to your goals, fitness level, and preferences."
            />
            <FeatureCard 
              icon={Salad}
              title="Nutrition Guidance"
              description="Balanced meal plans and dietary advice based on your health needs and lifestyle."
            />
            <FeatureCard 
              icon={Brain}
              title="Mental Wellness"
              description="Meditation guides, stress management, and tools to improve mental health."
            />
            <FeatureCard 
              icon={Heart}
              title="Health Condition Support"
              description="Specialized guidance for managing chronic conditions and improving overall health."
            />
            <FeatureCard 
              icon={Pill}
              title="Medication Management"
              description="Keep track of your medications with reminders and detailed information."
            />
            <FeatureCard 
              icon={Users}
              title="Supportive Community"
              description="Connect with others on similar health journeys and share experiences."
            />
          </div>
        </div>
      </section>

      {/* Health Stats Section */}
      <section className="bg-secondary/50 section-padding">
        <div className="container px-4">
          <SectionHeader 
            title="Track Your Progress"
            description="Monitor your health metrics and see improvements over time."
          />
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              icon={Activity}
              title="Today's Activity"
              value="6,240"
              description="Steps taken"
              trend="up"
              trendValue="12% from yesterday"
            />
            <StatCard
              icon={Heart}
              title="Heart Health"
              value="72"
              description="Resting heart rate (bpm)"
              trend="neutral"
              trendValue="Stable"
            />
            <StatCard
              icon={Dumbbell}
              title="Workouts"
              value="3"
              description="Sessions this week"
              trend="up"
              trendValue="1 more than last week"
            />
            <StatCard
              icon={Brain}
              title="Mindfulness"
              value="15"
              description="Minutes today"
              trend="down"
              trendValue="5min less than goal"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Ready to Begin Your Health Journey?
            </h2>
            <p className="mb-8 text-lg opacity-90">
              Join thousands of users who have transformed their lives through our comprehensive health platform.
            </p>
            <Button asChild size="lg" variant="outline" className="bg-transparent text-primary-foreground hover:bg-primary-foreground/10 border-primary-foreground rounded-full">
              <Link to="/fitness">
                Start Now <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
