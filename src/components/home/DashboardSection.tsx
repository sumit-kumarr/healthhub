
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Activity, Brain, Dumbbell, Heart, Pill, Salad, Search, User, ShieldCheck, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";

export function DashboardSection({ user }: { user: any }) {
  const [activityStats, setActivityStats] = useState({
    steps: 6240,
    trend: "up" as "up" | "down" | "neutral",
    trendValue: "12% from yesterday"
  });
  
  const [heartRate, setHeartRate] = useState({
    value: 72,
    trend: "neutral" as "up" | "down" | "neutral",
    trendValue: "Stable"
  });
  
  const [workouts, setWorkouts] = useState({
    value: 3,
    trend: "up" as "up" | "down" | "neutral",
    trendValue: "1 more than last week"
  });
  
  const [mindfulness, setMindfulness] = useState({
    value: 15,
    trend: "down" as "up" | "down" | "neutral",
    trendValue: "5min less than goal"
  });

  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Simulate real-time data updates
  useEffect(() => {
    const updateIntervalId = setInterval(() => {
      // Randomly update step count to simulate real-time changes
      const stepChange = Math.floor(Math.random() * 20) - 5; // -5 to +15 steps
      setActivityStats(prev => ({
        ...prev,
        steps: Math.max(0, prev.steps + stepChange)
      }));
      
      // Occasionally update heart rate
      if (Math.random() > 0.7) {
        const heartRateChange = Math.floor(Math.random() * 3) - 1; // -1 to +1 bpm
        setHeartRate(prev => ({
          ...prev,
          value: prev.value + heartRateChange,
          trendValue: heartRateChange > 0 ? "Slightly elevated" : heartRateChange < 0 ? "Slightly decreased" : "Stable",
          trend: heartRateChange > 0 ? "up" : heartRateChange < 0 ? "down" : "neutral"
        }));
      }
    }, 5000); // Update every 5 seconds
    
    return () => clearInterval(updateIntervalId);
  }, []);
  
  const refreshData = () => {
    setIsRefreshing(true);
    
    // Simulate data refresh
    setTimeout(() => {
      // Update all stats with new "simulated" data
      setActivityStats({
        steps: Math.floor(6000 + Math.random() * 1000),
        trend: Math.random() > 0.5 ? "up" : "down" as "up" | "down" | "neutral",
        trendValue: `${Math.floor(Math.random() * 15)}% from yesterday`
      });
      
      setHeartRate({
        value: Math.floor(70 + Math.random() * 5),
        trend: Math.random() > 0.6 ? "neutral" : Math.random() > 0.5 ? "up" : "down" as "up" | "down" | "neutral",
        trendValue: Math.random() > 0.6 ? "Stable" : "Slightly fluctuating"
      });
      
      setWorkouts({
        value: Math.floor(2 + Math.random() * 3),
        trend: "up" as "up" | "down" | "neutral",
        trendValue: `${Math.floor(Math.random() * 2) + 1} more than last week`
      });
      
      setMindfulness({
        value: Math.floor(10 + Math.random() * 10),
        trend: Math.random() > 0.5 ? "up" : "down" as "up" | "down" | "neutral",
        trendValue: `${Math.floor(Math.random() * 10)}min ${Math.random() > 0.5 ? "more than" : "less than"} goal`
      });
      
      setIsRefreshing(false);
    }, 1000);
  };

  if (!user) {
    return null;
  }

  return (
    <section className="bg-gradient-to-b from-primary/5 to-background py-12 px-4">
      <div className="container mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {user.email?.split('@')[0]}</h1>
            <p className="text-muted-foreground mt-2">
              Your personal health dashboard
            </p>
          </div>
          <Button 
            onClick={refreshData} 
            variant="outline" 
            size="sm"
            className="gap-2"
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} /> 
            {isRefreshing ? 'Updating...' : 'Refresh'}
          </Button>
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
            value={activityStats.steps.toString()}
            description="Steps taken"
            trend={activityStats.trend}
            trendValue={activityStats.trendValue}
            className="animate-pulse-subtle"
          />
          <StatCard
            icon={Heart}
            title="Heart Health"
            value={heartRate.value.toString()}
            description="Resting heart rate (bpm)"
            trend={heartRate.trend}
            trendValue={heartRate.trendValue}
            className="animate-pulse-subtle"
          />
          <StatCard
            icon={Dumbbell}
            title="Workouts"
            value={workouts.value.toString()}
            description="Sessions this week"
            trend={workouts.trend}
            trendValue={workouts.trendValue}
          />
          <StatCard
            icon={Brain}
            title="Mindfulness"
            value={mindfulness.value.toString()}
            description="Minutes today"
            trend={mindfulness.trend}
            trendValue={mindfulness.trendValue}
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
