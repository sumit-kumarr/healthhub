import { Link } from "react-router-dom";
import { Activity, Brain, Dumbbell, Heart, Pill, Salad, Search, User, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";

export function DashboardSection({ user }: { user: any }) {
  if (!user) {
    return null;
  }

  return (
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
  );
}
