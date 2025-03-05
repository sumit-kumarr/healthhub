
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dumbbell, Clock, BarChart, ChevronRight } from "lucide-react";
import ExerciseCard from "./ExerciseCard";

interface WorkoutPlansProps {
  goal: string;
  preference: string;
}

// Sample exercise data
const exercises = {
  "weight-loss": {
    bodyweight: [
      { id: 1, name: "Jumping Jacks", sets: 3, reps: "60 seconds", image: "/placeholder.svg", level: "Beginner", description: "A full-body exercise that increases heart rate and burns calories", muscles: ["Full Body"] },
      { id: 2, name: "Burpees", sets: 4, reps: "10", image: "/placeholder.svg", level: "Intermediate", description: "A high-intensity exercise that works multiple muscle groups", muscles: ["Full Body"] },
      { id: 3, name: "Mountain Climbers", sets: 3, reps: "45 seconds", image: "/placeholder.svg", level: "Beginner", description: "A cardio exercise that also works the core muscles", muscles: ["Core", "Shoulders"] },
      { id: 4, name: "Bodyweight Squats", sets: 3, reps: "20", image: "/placeholder.svg", level: "Beginner", description: "A lower body exercise that targets the quads, hamstrings, and glutes", muscles: ["Legs", "Glutes"] },
      { id: 5, name: "Push-ups", sets: 3, reps: "12-15", image: "/placeholder.svg", level: "Intermediate", description: "An upper body exercise that works the chest, shoulders, and triceps", muscles: ["Chest", "Shoulders", "Triceps"] },
    ],
    "gym-equipment": [
      { id: 6, name: "Treadmill Intervals", sets: 1, reps: "20 minutes", image: "/placeholder.svg", level: "All Levels", description: "Alternate between 1 minute of sprinting and 2 minutes of walking", muscles: ["Cardiovascular"] },
      { id: 7, name: "Dumbbell Lunges", sets: 3, reps: "12 each leg", image: "/placeholder.svg", level: "Beginner", description: "A lower body exercise that targets the quads, hamstrings, and glutes", muscles: ["Legs", "Glutes"] },
      { id: 8, name: "Kettlebell Swings", sets: 4, reps: "15", image: "/placeholder.svg", level: "Intermediate", description: "A full-body exercise that targets the posterior chain", muscles: ["Glutes", "Hamstrings", "Back"] },
      { id: 9, name: "Battle Ropes", sets: 3, reps: "30 seconds", image: "/placeholder.svg", level: "Intermediate", description: "A high-intensity exercise that works the upper body and core", muscles: ["Arms", "Shoulders", "Core"] },
      { id: 10, name: "Elliptical Trainer", sets: 1, reps: "25 minutes", image: "/placeholder.svg", level: "All Levels", description: "A low-impact cardio exercise that works the whole body", muscles: ["Full Body"] },
    ],
  },
  "muscle-gain": {
    bodyweight: [
      { id: 11, name: "Pull-ups", sets: 4, reps: "8-10", image: "/placeholder.svg", level: "Advanced", description: "An upper body exercise that targets the back and biceps", muscles: ["Back", "Biceps"] },
      { id: 12, name: "Dips", sets: 3, reps: "10-12", image: "/placeholder.svg", level: "Intermediate", description: "An upper body exercise that targets the chest, shoulders, and triceps", muscles: ["Chest", "Shoulders", "Triceps"] },
      { id: 13, name: "Diamond Push-ups", sets: 3, reps: "12", image: "/placeholder.svg", level: "Intermediate", description: "A variation of push-ups that targets the triceps", muscles: ["Triceps", "Chest"] },
      { id: 14, name: "Pike Push-ups", sets: 3, reps: "10", image: "/placeholder.svg", level: "Intermediate", description: "A shoulder-focused push-up variation", muscles: ["Shoulders", "Triceps"] },
      { id: 15, name: "Pistol Squats", sets: 3, reps: "6-8 each leg", image: "/placeholder.svg", level: "Advanced", description: "A single-leg squat that requires significant strength and balance", muscles: ["Legs", "Glutes", "Core"] },
    ],
    "gym-equipment": [
      { id: 16, name: "Barbell Bench Press", sets: 4, reps: "8-10", image: "/placeholder.svg", level: "Intermediate", description: "A compound exercise that targets the chest, shoulders, and triceps", muscles: ["Chest", "Shoulders", "Triceps"] },
      { id: 17, name: "Deadlifts", sets: 4, reps: "6-8", image: "/placeholder.svg", level: "Intermediate", description: "A compound exercise that targets the posterior chain", muscles: ["Back", "Glutes", "Hamstrings"] },
      { id: 18, name: "Squats", sets: 4, reps: "8-10", image: "/placeholder.svg", level: "Intermediate", description: "A compound exercise that targets the lower body", muscles: ["Quads", "Glutes", "Hamstrings"] },
      { id: 19, name: "Barbell Rows", sets: 4, reps: "8-10", image: "/placeholder.svg", level: "Intermediate", description: "A compound exercise that targets the back and biceps", muscles: ["Back", "Biceps"] },
      { id: 20, name: "Overhead Press", sets: 4, reps: "8-10", image: "/placeholder.svg", level: "Intermediate", description: "A compound exercise that targets the shoulders and triceps", muscles: ["Shoulders", "Triceps"] },
    ],
  },
  "general": {
    bodyweight: [
      { id: 21, name: "Push-ups", sets: 3, reps: "10-15", image: "/placeholder.svg", level: "Beginner", description: "An upper body exercise that works the chest, shoulders, and triceps", muscles: ["Chest", "Shoulders", "Triceps"] },
      { id: 22, name: "Bodyweight Squats", sets: 3, reps: "15-20", image: "/placeholder.svg", level: "Beginner", description: "A lower body exercise that targets the quads, hamstrings, and glutes", muscles: ["Legs", "Glutes"] },
      { id: 23, name: "Plank", sets: 3, reps: "30-45 seconds", image: "/placeholder.svg", level: "Beginner", description: "A core exercise that works the entire midsection", muscles: ["Core", "Shoulders"] },
      { id: 24, name: "Glute Bridges", sets: 3, reps: "15", image: "/placeholder.svg", level: "Beginner", description: "A lower body exercise that targets the glutes and hamstrings", muscles: ["Glutes", "Hamstrings"] },
      { id: 25, name: "Superman", sets: 3, reps: "12", image: "/placeholder.svg", level: "Beginner", description: "A back exercise that targets the lower back and glutes", muscles: ["Lower Back", "Glutes"] },
    ],
    "gym-equipment": [
      { id: 26, name: "Dumbbell Bench Press", sets: 3, reps: "10-12", image: "/placeholder.svg", level: "Beginner", description: "An upper body exercise that targets the chest, shoulders, and triceps", muscles: ["Chest", "Shoulders", "Triceps"] },
      { id: 27, name: "Lat Pulldowns", sets: 3, reps: "10-12", image: "/placeholder.svg", level: "Beginner", description: "An upper body exercise that targets the back and biceps", muscles: ["Back", "Biceps"] },
      { id: 28, name: "Leg Press", sets: 3, reps: "10-12", image: "/placeholder.svg", level: "Beginner", description: "A lower body exercise that targets the quads, hamstrings, and glutes", muscles: ["Legs", "Glutes"] },
      { id: 29, name: "Seated Rows", sets: 3, reps: "10-12", image: "/placeholder.svg", level: "Beginner", description: "An upper body exercise that targets the back and biceps", muscles: ["Back", "Biceps"] },
      { id: 30, name: "Shoulder Press", sets: 3, reps: "10-12", image: "/placeholder.svg", level: "Beginner", description: "An upper body exercise that targets the shoulders and triceps", muscles: ["Shoulders", "Triceps"] },
    ],
  },
};

const WorkoutPlans: React.FC<WorkoutPlansProps> = ({ goal, preference }) => {
  // Default to general if goal not found
  const goalExercises = exercises[goal as keyof typeof exercises] || exercises.general;
  
  // Default to bodyweight if preference not found
  const preferenceExercises = goalExercises[preference as keyof typeof goalExercises] || goalExercises.bodyweight;
  
  const workoutDays = {
    day1: { title: "Day 1: Full Body", exercises: preferenceExercises.slice(0, 3) },
    day2: { title: "Day 2: Rest or Light Cardio", exercises: [] },
    day3: { title: "Day 3: Upper Body Focus", exercises: preferenceExercises.slice(2, 5) },
    day4: { title: "Day 4: Rest or Light Cardio", exercises: [] },
    day5: { title: "Day 5: Lower Body Focus", exercises: [preferenceExercises[3], preferenceExercises[0], preferenceExercises[4]] },
    day6: { title: "Day 6: Active Recovery", exercises: [] },
    day7: { title: "Day 7: Full Rest", exercises: [] },
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Your Personalized Workout Plan</h2>
        <p className="text-muted-foreground mb-4">
          Based on your goal of <span className="font-medium">{goal.replace('-', ' ')}</span> and preference for <span className="font-medium">{preference.replace('-', ' ')} exercises</span>
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline" className="flex items-center gap-1">
            <Dumbbell className="h-3.5 w-3.5" />
            <span>{goal.replace('-', ' ')}</span>
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>45-60 min/session</span>
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <BarChart className="h-3.5 w-3.5" />
            <span>3-5 days/week</span>
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="day1">
        <TabsList className="grid grid-cols-7 mb-6">
          <TabsTrigger value="day1">Day 1</TabsTrigger>
          <TabsTrigger value="day2">Day 2</TabsTrigger>
          <TabsTrigger value="day3">Day 3</TabsTrigger>
          <TabsTrigger value="day4">Day 4</TabsTrigger>
          <TabsTrigger value="day5">Day 5</TabsTrigger>
          <TabsTrigger value="day6">Day 6</TabsTrigger>
          <TabsTrigger value="day7">Day 7</TabsTrigger>
        </TabsList>
        
        {Object.entries(workoutDays).map(([day, { title, exercises }]) => (
          <TabsContent key={day} value={day}>
            <Card>
              <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>
                  {exercises.length > 0 
                    ? `Complete ${exercises.length} exercises with recommended sets and reps` 
                    : "Take it easy today with rest or light activity"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {exercises.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {exercises.map(exercise => (
                      <ExerciseCard key={exercise.id} exercise={exercise} />
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center">
                    <p className="text-muted-foreground">
                      Rest is crucial for muscle recovery and growth. Consider light walking, stretching, or yoga for active recovery.
                    </p>
                  </div>
                )}
              </CardContent>
              {exercises.length > 0 && (
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Start Workout <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              )}
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <div className="mt-8">
        <h3 className="text-xl font-medium mb-4">Recommended Exercise Library</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {preferenceExercises.map(exercise => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkoutPlans;
