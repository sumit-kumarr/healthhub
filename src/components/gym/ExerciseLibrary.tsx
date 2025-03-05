
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import ExerciseCard from "./ExerciseCard";

// Sample exercise data organized by muscle group
const exercisesByMuscleGroup = {
  chest: [
    { id: 101, name: "Barbell Bench Press", sets: 4, reps: "8-12", image: "/placeholder.svg", level: "Intermediate", description: "A compound exercise that targets the chest, shoulders, and triceps", muscles: ["Chest", "Shoulders", "Triceps"] },
    { id: 102, name: "Incline Dumbbell Press", sets: 3, reps: "10-12", image: "/placeholder.svg", level: "Intermediate", description: "An upper chest focused press that also works the shoulders", muscles: ["Upper Chest", "Shoulders"] },
    { id: 103, name: "Decline Push-ups", sets: 3, reps: "12-15", image: "/placeholder.svg", level: "Beginner", description: "A lower chest focused push-up variation", muscles: ["Lower Chest", "Triceps"] },
    { id: 104, name: "Cable Flyes", sets: 3, reps: "12-15", image: "/placeholder.svg", level: "Intermediate", description: "An isolation exercise for the chest", muscles: ["Chest"] },
    { id: 105, name: "Dips", sets: 3, reps: "10-12", image: "/placeholder.svg", level: "Intermediate", description: "A compound exercise that targets the lower chest and triceps", muscles: ["Lower Chest", "Triceps"] },
  ],
  back: [
    { id: 201, name: "Pull-ups", sets: 4, reps: "8-10", image: "/placeholder.svg", level: "Advanced", description: "A compound exercise that targets the back and biceps", muscles: ["Lats", "Biceps"] },
    { id: 202, name: "Barbell Rows", sets: 4, reps: "8-10", image: "/placeholder.svg", level: "Intermediate", description: "A compound exercise that targets the middle back", muscles: ["Middle Back", "Lats", "Biceps"] },
    { id: 203, name: "Lat Pulldowns", sets: 3, reps: "10-12", image: "/placeholder.svg", level: "Beginner", description: "A machine exercise that targets the lats", muscles: ["Lats", "Biceps"] },
    { id: 204, name: "T-Bar Rows", sets: 3, reps: "8-10", image: "/placeholder.svg", level: "Intermediate", description: "A compound exercise that targets the middle back", muscles: ["Middle Back", "Lats"] },
    { id: 205, name: "Face Pulls", sets: 3, reps: "12-15", image: "/placeholder.svg", level: "Beginner", description: "An exercise that targets the rear delts and upper back", muscles: ["Rear Delts", "Upper Back"] },
  ],
  legs: [
    { id: 301, name: "Barbell Squats", sets: 4, reps: "8-10", image: "/placeholder.svg", level: "Intermediate", description: "A compound exercise that targets the entire lower body", muscles: ["Quads", "Glutes", "Hamstrings"] },
    { id: 302, name: "Romanian Deadlifts", sets: 4, reps: "8-10", image: "/placeholder.svg", level: "Intermediate", description: "A hip-hinge exercise that targets the posterior chain", muscles: ["Hamstrings", "Glutes", "Lower Back"] },
    { id: 303, name: "Leg Press", sets: 3, reps: "10-12", image: "/placeholder.svg", level: "Beginner", description: "A machine exercise that targets the quads and glutes", muscles: ["Quads", "Glutes"] },
    { id: 304, name: "Walking Lunges", sets: 3, reps: "10-12 per leg", image: "/placeholder.svg", level: "Intermediate", description: "A unilateral exercise that targets the quads, glutes, and hamstrings", muscles: ["Quads", "Glutes", "Hamstrings"] },
    { id: 305, name: "Calf Raises", sets: 4, reps: "15-20", image: "/placeholder.svg", level: "Beginner", description: "An isolation exercise for the calves", muscles: ["Calves"] },
  ],
  shoulders: [
    { id: 401, name: "Overhead Press", sets: 4, reps: "8-10", image: "/placeholder.svg", level: "Intermediate", description: "A compound exercise that targets the shoulders and triceps", muscles: ["Shoulders", "Triceps"] },
    { id: 402, name: "Lateral Raises", sets: 3, reps: "12-15", image: "/placeholder.svg", level: "Beginner", description: "An isolation exercise for the side delts", muscles: ["Side Delts"] },
    { id: 403, name: "Front Raises", sets: 3, reps: "12-15", image: "/placeholder.svg", level: "Beginner", description: "An isolation exercise for the front delts", muscles: ["Front Delts"] },
    { id: 404, name: "Reverse Flyes", sets: 3, reps: "12-15", image: "/placeholder.svg", level: "Beginner", description: "An isolation exercise for the rear delts", muscles: ["Rear Delts"] },
    { id: 405, name: "Arnold Press", sets: 3, reps: "10-12", image: "/placeholder.svg", level: "Intermediate", description: "A variation of the shoulder press that targets all three deltoid heads", muscles: ["Shoulders"] },
  ],
  arms: [
    { id: 501, name: "Barbell Curls", sets: 3, reps: "10-12", image: "/placeholder.svg", level: "Beginner", description: "An isolation exercise for the biceps", muscles: ["Biceps"] },
    { id: 502, name: "Skull Crushers", sets: 3, reps: "10-12", image: "/placeholder.svg", level: "Intermediate", description: "An isolation exercise for the triceps", muscles: ["Triceps"] },
    { id: 503, name: "Hammer Curls", sets: 3, reps: "10-12", image: "/placeholder.svg", level: "Beginner", description: "An isolation exercise for the biceps and brachialis", muscles: ["Biceps", "Brachialis"] },
    { id: 504, name: "Tricep Pushdowns", sets: 3, reps: "12-15", image: "/placeholder.svg", level: "Beginner", description: "An isolation exercise for the triceps", muscles: ["Triceps"] },
    { id: 505, name: "Preacher Curls", sets: 3, reps: "10-12", image: "/placeholder.svg", level: "Intermediate", description: "An isolation exercise for the biceps", muscles: ["Biceps"] },
  ],
  core: [
    { id: 601, name: "Planks", sets: 3, reps: "30-60 seconds", image: "/placeholder.svg", level: "Beginner", description: "An isometric exercise that targets the entire core", muscles: ["Abs", "Obliques", "Lower Back"] },
    { id: 602, name: "Russian Twists", sets: 3, reps: "12-15 per side", image: "/placeholder.svg", level: "Beginner", description: "A rotational exercise that targets the obliques", muscles: ["Obliques"] },
    { id: 603, name: "Hanging Leg Raises", sets: 3, reps: "10-12", image: "/placeholder.svg", level: "Intermediate", description: "A dynamic exercise that targets the lower abs", muscles: ["Lower Abs"] },
    { id: 604, name: "Ab Rollouts", sets: 3, reps: "8-10", image: "/placeholder.svg", level: "Advanced", description: "A dynamic exercise that targets the entire core", muscles: ["Abs", "Obliques"] },
    { id: 605, name: "Reverse Crunches", sets: 3, reps: "12-15", image: "/placeholder.svg", level: "Beginner", description: "A dynamic exercise that targets the lower abs", muscles: ["Lower Abs"] },
  ],
  cardio: [
    { id: 701, name: "Running", sets: 1, reps: "20-30 minutes", image: "/placeholder.svg", level: "All Levels", description: "A cardiovascular exercise that can be performed at various intensities", muscles: ["Cardiovascular System", "Legs"] },
    { id: 702, name: "Cycling", sets: 1, reps: "20-30 minutes", image: "/placeholder.svg", level: "All Levels", description: "A low-impact cardiovascular exercise", muscles: ["Cardiovascular System", "Legs"] },
    { id: 703, name: "Rowing", sets: 1, reps: "15-20 minutes", image: "/placeholder.svg", level: "All Levels", description: "A full-body cardiovascular exercise", muscles: ["Cardiovascular System", "Back", "Arms", "Legs"] },
    { id: 704, name: "Jump Rope", sets: 3, reps: "2-3 minutes", image: "/placeholder.svg", level: "Beginner to Intermediate", description: "A high-intensity cardiovascular exercise", muscles: ["Cardiovascular System", "Calves", "Shoulders"] },
    { id: 705, name: "Stair Climber", sets: 1, reps: "15-20 minutes", image: "/placeholder.svg", level: "All Levels", description: "A cardiovascular exercise that targets the legs", muscles: ["Cardiovascular System", "Legs", "Glutes"] },
  ],
};

const ExerciseLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [difficulty, setDifficulty] = useState("all");
  const [muscleGroup, setMuscleGroup] = useState("chest");

  const filterExercises = (exercises: any[]) => {
    return exercises.filter(ex => {
      const matchesSearch = ex.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          ex.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          ex.muscles.some((m: string) => m.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesDifficulty = difficulty === "all" || ex.level.toLowerCase() === difficulty.toLowerCase();
      
      return matchesSearch && matchesDifficulty;
    });
  };

  const currentExercises = exercisesByMuscleGroup[muscleGroup as keyof typeof exercisesByMuscleGroup] || [];
  const filteredExercises = filterExercises(currentExercises);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search exercises..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="w-full md:w-48">
          <Select value={difficulty} onValueChange={setDifficulty}>
            <SelectTrigger>
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Tabs value={muscleGroup} onValueChange={setMuscleGroup}>
          <TabsList className="mb-6 flex flex-wrap h-auto">
            <TabsTrigger value="chest">Chest</TabsTrigger>
            <TabsTrigger value="back">Back</TabsTrigger>
            <TabsTrigger value="legs">Legs</TabsTrigger>
            <TabsTrigger value="shoulders">Shoulders</TabsTrigger>
            <TabsTrigger value="arms">Arms</TabsTrigger>
            <TabsTrigger value="core">Core</TabsTrigger>
            <TabsTrigger value="cardio">Cardio</TabsTrigger>
          </TabsList>

          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">
              {muscleGroup.charAt(0).toUpperCase() + muscleGroup.slice(1)} Exercises
            </h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {Array.from(new Set(currentExercises.flatMap(ex => ex.muscles))).map((muscle, idx) => (
                <Badge key={idx} variant="outline">{muscle}</Badge>
              ))}
            </div>
          </div>

          {Object.keys(exercisesByMuscleGroup).map((group) => (
            <TabsContent key={group} value={group}>
              {filteredExercises.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredExercises.map((exercise) => (
                    <ExerciseCard key={exercise.id} exercise={exercise} />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="pt-6 pb-6 text-center">
                    <p>No exercises found matching your criteria. Try adjusting your search.</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default ExerciseLibrary;
