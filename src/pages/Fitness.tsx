
import { useState } from "react";
import { 
  Dumbbell, 
  Home as HomeIcon, 
  Target, 
  Calendar, 
  Play, 
  Clock, 
  ChevronRight,
  Fire
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface WorkoutCardProps {
  title: string;
  duration: string;
  calories: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  image: string;
  onClick?: () => void;
}

const WorkoutCard = ({ title, duration, calories, level, image, onClick }: WorkoutCardProps) => (
  <div 
    className="group cursor-pointer rounded-lg overflow-hidden border bg-card shadow-sm hover:shadow-md transition-all"
    onClick={onClick}
  >
    <div className="aspect-video w-full relative overflow-hidden">
      <img
        src={image}
        alt={title}
        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
      <div className="absolute bottom-3 left-3 px-2 py-1 rounded-full text-xs font-medium bg-primary/20 backdrop-blur-sm text-primary">
        {level}
      </div>
    </div>
    <div className="p-4">
      <h3 className="font-medium mb-2">{title}</h3>
      <div className="flex items-center text-sm text-muted-foreground gap-4">
        <div className="flex items-center">
          <Clock className="h-3.5 w-3.5 mr-1" />
          {duration}
        </div>
        <div className="flex items-center">
          <Fire className="h-3.5 w-3.5 mr-1" />
          {calories}
        </div>
      </div>
    </div>
  </div>
);

const FitnessPage = () => {
  const [selectedWorkout, setSelectedWorkout] = useState<WorkoutCardProps | null>(null);
  
  const workoutData = {
    home: [
      {
        title: "Full Body HIIT",
        duration: "30 min",
        calories: "300 cal",
        level: "Intermediate" as const,
        image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Morning Yoga Flow",
        duration: "20 min",
        calories: "150 cal",
        level: "Beginner" as const,
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Core Crusher",
        duration: "15 min",
        calories: "120 cal",
        level: "Beginner" as const,
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Bodyweight Strength",
        duration: "40 min",
        calories: "280 cal",
        level: "Advanced" as const,
        image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80",
      },
    ],
    gym: [
      {
        title: "Upper Body Push",
        duration: "45 min",
        calories: "350 cal",
        level: "Intermediate" as const,
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Lower Body Focus",
        duration: "50 min",
        calories: "400 cal",
        level: "Advanced" as const,
        image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Full Body Strength",
        duration: "60 min",
        calories: "450 cal",
        level: "Advanced" as const,
        image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Cardio Conditioning",
        duration: "30 min",
        calories: "320 cal",
        level: "Intermediate" as const,
        image: "https://images.unsplash.com/photo-1590487988256-9ed24133863e?auto=format&fit=crop&w=800&q=80",
      },
    ],
  };

  const handleWorkoutClick = (workout: WorkoutCardProps) => {
    setSelectedWorkout(workout);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container px-4 py-8">
      <SectionHeader
        title="Fitness & Workouts"
        description="Discover workouts tailored to your fitness level and goals"
        align="left"
      />

      {selectedWorkout ? (
        <div className="animate-fade-in">
          <Button
            variant="ghost"
            className="mb-4"
            onClick={() => setSelectedWorkout(null)}
          >
            <ChevronRight className="h-4 w-4 mr-1 rotate-180" />
            Back to workouts
          </Button>
          
          <div className="bg-card rounded-lg overflow-hidden border shadow-sm">
            <div className="aspect-video w-full relative">
              <img
                src={selectedWorkout.image}
                alt={selectedWorkout.title}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
              <Button
                size="icon"
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full h-16 w-16"
              >
                <Play className="h-6 w-6" />
              </Button>
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">{selectedWorkout.title}</h1>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary">
                  {selectedWorkout.level}
                </span>
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{selectedWorkout.duration}</span>
                </div>
                <div className="flex items-center">
                  <Fire className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{selectedWorkout.calories}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Schedule</span>
                </div>
              </div>
              
              <h2 className="text-lg font-medium mb-3">Description</h2>
              <p className="text-muted-foreground mb-6">
                This workout is designed to target multiple muscle groups and improve overall fitness. 
                Follow along with the video instructions and perform each exercise with proper form.
              </p>
              
              <h2 className="text-lg font-medium mb-3">Exercises</h2>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center p-3 rounded-lg border">
                    <div className="bg-primary/10 p-2 rounded-md mr-3">
                      <Dumbbell className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Exercise {i}</h3>
                      <p className="text-sm text-muted-foreground">3 sets × 12 reps</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button className="w-full mt-6 rounded-full">
                Start Workout <Play className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <Tabs defaultValue="home" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="home" className="gap-2">
              <HomeIcon className="h-4 w-4" />
              Home Workouts
            </TabsTrigger>
            <TabsTrigger value="gym" className="gap-2">
              <Dumbbell className="h-4 w-4" />
              Gym Workouts
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="home" className="animate-fade-in">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {workoutData.home.map((workout, index) => (
                <WorkoutCard 
                  key={index} 
                  {...workout} 
                  onClick={() => handleWorkoutClick(workout)}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="gym" className="animate-fade-in">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {workoutData.gym.map((workout, index) => (
                <WorkoutCard 
                  key={index} 
                  {...workout} 
                  onClick={() => handleWorkoutClick(workout)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default FitnessPage;
