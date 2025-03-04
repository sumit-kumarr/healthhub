
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { DashboardSection } from "@/components/home/DashboardSection";
import { useAuth } from "@/contexts/auth";
import { ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const HomePage = () => {
  const { user } = useAuth();
  
  return (
    <div className="flex flex-col">
      <HeroSection isAuthenticated={!!user} />
      
      {!user && (
        <>
          <FeaturesSection />
          
          {/* How It Works Section */}
          <section className="bg-secondary/50 section-padding">
            <div className="container px-4">
              <h2 className="text-3xl font-bold text-center mb-8">How HealthHub Works</h2>
              
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
              <h2 className="text-3xl font-bold text-center mb-8">What Our Users Say</h2>
              
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
        </>
      )}
      
      <DashboardSection user={user} />
    </div>
  );
};

export default HomePage;
