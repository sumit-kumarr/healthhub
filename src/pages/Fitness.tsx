
import { 
  Dumbbell, 
  Heart, 
  Clock, 
  Calendar, 
  BarChart, 
  ChevronRight, 
  Trophy,
  Flame
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ExerciseProps {
  name: string;
  duration: string;
  calories: number;
  image: string;
}

const Exercise = ({ name, duration, calories, image }: ExerciseProps) => (
  <div className="flex items-center gap-4 p-4 border rounded-lg hover:border-primary/50 cursor-pointer transition-colors">
    <img
      src={image}
      alt={name}
      className="w-16 h-16 rounded-lg object-cover"
    />
    <div className="flex-1">
      <h3 className="font-medium">{name}</h3>
      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>{duration}</span>
        </div>
        <div className="flex items-center gap-1">
          <Flame className="h-4 w-4" />
          <span>{calories} cal</span>
        </div>
      </div>
    </div>
    <Button variant="ghost" size="icon">
      <ChevronRight className="h-5 w-5" />
    </Button>
  </div>
);

const FitnessPage = () => {
  const exercises = [
    {
      name: "Morning Yoga",
      duration: "20 min",
      calories: 120,
      image: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&w=240&q=80"
    },
    {
      name: "HIIT Workout",
      duration: "30 min",
      calories: 350,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=240&q=80"
    },
    {
      name: "Strength Training",
      duration: "45 min",
      calories: 280,
      image: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&w=240&q=80"
    },
    {
      name: "Evening Run",
      duration: "25 min",
      calories: 240,
      image: "https://images.unsplash.com/photo-1486218119243-13883505764c?auto=format&fit=crop&w=240&q=80"
    }
  ];

  return (
    <div className="container px-4 py-8">
      <SectionHeader
        title="Fitness Tracker"
        description="Track your workouts, set goals, and improve your fitness level"
        align="left"
      />
      
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="workouts" className="space-y-6">
            <TabsList>
              <TabsTrigger value="workouts">Workouts</TabsTrigger>
              <TabsTrigger value="programs">Programs</TabsTrigger>
              <TabsTrigger value="goals">Goals</TabsTrigger>
            </TabsList>
            
            <TabsContent value="workouts" className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Recent Workouts</h2>
                <Button variant="outline" size="sm">View All</Button>
              </div>
              
              <div className="space-y-3">
                {exercises.map((exercise, i) => (
                  <Exercise key={i} {...exercise} />
                ))}
              </div>
              
              <Button className="w-full">
                Start New Workout
              </Button>
            </TabsContent>
            
            <TabsContent value="programs" className="animate-fade-in">
              <div className="grid gap-4 sm:grid-cols-2">
                <Card className="p-6 flex flex-col items-center text-center">
                  <div className="bg-primary/10 p-3 rounded-full mb-4">
                    <Dumbbell className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">7-Day Strength Challenge</h3>
                  <p className="text-muted-foreground mb-4">Build muscle and increase strength with this 7-day program</p>
                  <Button className="mt-auto">Start Program</Button>
                </Card>
                
                <Card className="p-6 flex flex-col items-center text-center">
                  <div className="bg-primary/10 p-3 rounded-full mb-4">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Cardio Boost</h3>
                  <p className="text-muted-foreground mb-4">Improve endurance and heart health with targeted cardio</p>
                  <Button className="mt-auto">Start Program</Button>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="goals" className="animate-fade-in">
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Weekly Workout Goal</h3>
                    <span className="text-sm font-medium">3/5 days</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Monthly Running Distance</h3>
                    <span className="text-sm font-medium">12/20 km</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
                
                <Button variant="outline" className="w-full">
                  Set New Goal
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-lg">Today's Activity</h3>
              <Button variant="ghost" size="sm" className="gap-1">
                Week <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Flame className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="font-medium">Calories Burned</span>
                    <span className="font-medium">420</span>
                  </div>
                  <Progress value={42} className="h-1 mt-2" />
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="font-medium">Active Time</span>
                    <span className="font-medium">45 min</span>
                  </div>
                  <Progress value={37.5} className="h-1 mt-2" />
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <BarChart className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="font-medium">Heart Rate (avg)</span>
                    <span className="font-medium">118 bpm</span>
                  </div>
                  <Progress value={55} className="h-1 mt-2" />
                </div>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Trophy className="h-5 w-5 text-amber-500" />
              <h3 className="font-medium text-lg">Achievements</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="font-medium">5-Day Streak</div>
                  <div className="text-sm text-muted-foreground">Keep going!</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Flame className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="font-medium">1000 Calories Burned</div>
                  <div className="text-sm text-muted-foreground">This week</div>
                </div>
              </div>
            </div>
            
            <Button variant="ghost" className="w-full mt-4">
              View All Achievements
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FitnessPage;
