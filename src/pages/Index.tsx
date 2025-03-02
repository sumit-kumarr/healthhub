
import { useState, useEffect } from "react";
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
  Activity,
  Search,
  User,
  ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import { FeatureCard } from "@/components/ui/feature-card";
import { StatCard } from "@/components/ui/stat-card";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const HomePage = () => {
  const { user } = useAuth();
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    setHeroLoaded(true);
  }, []);

  if (!user) {
    return (
      <div className="flex flex-col">
        {/* Hero Section for non-authenticated users */}
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

        {/* Key Features Section */}
        <section id="features" className="section-padding">
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
                title="Medication Database"
                description="Comprehensive information about medicines, side effects, and usage guidelines."
              />
              <FeatureCard 
                icon={Users}
                title="Supportive Community"
                description="Connect with others on similar health journeys and share experiences."
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-secondary/50 section-padding">
          <div className="container px-4">
            <SectionHeader 
              title="How HealthHub Works"
              description="Simple steps to take control of your health journey"
            />
            
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="relative">
                <div className="absolute top-0 left-6 h-full border-l-2 border-dashed border-primary lg:hidden"></div>
                <div className="flex flex-col items-start relative">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground mb-4 z-10">
                    1
                  </div>
                  <h3 className="text-xl font-bold mb-2">Create Your Account</h3>
                  <p className="text-muted-foreground mb-6">
                    Sign up and complete your health profile with your goals and preferences.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute top-0 left-6 h-full border-l-2 border-dashed border-primary lg:hidden"></div>
                <div className="flex flex-col items-start relative">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground mb-4 z-10">
                    2
                  </div>
                  <h3 className="text-xl font-bold mb-2">Explore Resources</h3>
                  <p className="text-muted-foreground mb-6">
                    Access our comprehensive database of health resources, including medicines and workout plans.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="flex flex-col items-start relative">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground mb-4 z-10">
                    3
                  </div>
                  <h3 className="text-xl font-bold mb-2">Track Your Progress</h3>
                  <p className="text-muted-foreground mb-6">
                    Monitor your health metrics, medication schedule, and wellness journey over time.
                  </p>
                </div>
              </div>
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
                <Link to="/auth">
                  Create Account <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="section-padding">
          <div className="container px-4">
            <SectionHeader 
              title="What Our Users Say"
              description="Hear from people who have improved their health with HealthHub"
            />
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">John S.</CardTitle>
                      <CardDescription>Fitness Enthusiast</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    "The medicine database has been incredibly helpful for managing my health condition. I love being able to look up information quickly and easily."
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>LT</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">Lisa T.</CardTitle>
                      <CardDescription>Health Blogger</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    "As someone who writes about health topics, I find HealthHub's comprehensive database incredibly valuable for research and reference."
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>MR</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">Mark R.</CardTitle>
                      <CardDescription>Healthcare Professional</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    "I recommend HealthHub to my patients as a reliable source of health information and medication details that they can access anytime."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Dashboard for authenticated users
  return (
    <div className="flex flex-col">
      {/* Dashboard Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-12 px-4">
        <div className="container mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Welcome back, {user.email?.split('@')[0]}</h1>
            <p className="text-muted-foreground mt-2">
              Your personal health dashboard
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium mb-1">Medicine Search</h3>
                <p className="text-xs text-muted-foreground mb-4">
                  Find information about medications
                </p>
                <Button asChild variant="outline" size="sm" className="w-full mt-auto">
                  <Link to="/medicine-search">Search Now</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="bg-blue-500/10 p-3 rounded-full mb-4">
                  <Dumbbell className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="font-medium mb-1">Fitness</h3>
                <p className="text-xs text-muted-foreground mb-4">
                  View your workout plans
                </p>
                <Button asChild variant="outline" size="sm" className="w-full mt-auto">
                  <Link to="/fitness">View Plans</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="bg-green-500/10 p-3 rounded-full mb-4">
                  <Salad className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="font-medium mb-1">Diet</h3>
                <p className="text-xs text-muted-foreground mb-4">
                  Track your nutrition
                </p>
                <Button asChild variant="outline" size="sm" className="w-full mt-auto">
                  <Link to="/diet">View Diet</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="bg-purple-500/10 p-3 rounded-full mb-4">
                  <User className="h-6 w-6 text-purple-500" />
                </div>
                <h3 className="font-medium mb-1">Profile</h3>
                <p className="text-xs text-muted-foreground mb-4">
                  Update your information
                </p>
                <Button asChild variant="outline" size="sm" className="w-full mt-auto">
                  <Link to="/profile">View Profile</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Health Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
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

          {/* Recent Searches & Health Tips */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Recent Medicine Searches</CardTitle>
                <CardDescription>Your recently viewed medications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Pill className="h-5 w-5 mt-0.5 text-primary" />
                  <div>
                    <p className="font-medium">Ibuprofen</p>
                    <p className="text-sm text-muted-foreground">Pain reliever, NSAIDs category</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Pill className="h-5 w-5 mt-0.5 text-primary" />
                  <div>
                    <p className="font-medium">Amoxicillin</p>
                    <p className="text-sm text-muted-foreground">Antibiotic, Penicillin category</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Pill className="h-5 w-5 mt-0.5 text-primary" />
                  <div>
                    <p className="font-medium">Loratadine</p>
                    <p className="text-sm text-muted-foreground">Antihistamine, Allergy medication</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/medicine-search">View All Medicines</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Health Tips</CardTitle>
                <CardDescription>Recommendations for you</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="h-5 w-5 mt-0.5 text-green-500" />
                  <div>
                    <p className="font-medium">Stay Hydrated</p>
                    <p className="text-sm text-muted-foreground">Aim for 8 glasses of water daily for optimal health.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheck className="h-5 w-5 mt-0.5 text-green-500" />
                  <div>
                    <p className="font-medium">Regular Exercise</p>
                    <p className="text-sm text-muted-foreground">At least 30 minutes of moderate activity 5 times a week.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheck className="h-5 w-5 mt-0.5 text-green-500" />
                  <div>
                    <p className="font-medium">Balanced Diet</p>
                    <p className="text-sm text-muted-foreground">Include fruits, vegetables, whole grains, and lean proteins.</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/health-conditions">More Health Tips</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
