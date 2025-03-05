
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dumbbell, Calendar, ChevronRight, Activity, Utensils, LineChart, Users, Search, BookOpen } from "lucide-react";
import WorkoutPlans from "@/components/gym/WorkoutPlans";
import NutritionPlans from "@/components/gym/NutritionPlans";
import ProgressTracking from "@/components/gym/ProgressTracking";
import GymLog from "@/components/gym/GymLog";
import ExerciseLibrary from "@/components/gym/ExerciseLibrary";
import NutritionGuide from "@/components/gym/NutritionGuide";
import { useToast } from "@/hooks/use-toast";

const GymPage = () => {
  const [userGoal, setUserGoal] = useState("general");
  const [userPreference, setUserPreference] = useState("bodyweight");
  const [dietaryRestriction, setDietaryRestriction] = useState("none");
  const { toast } = useToast();

  const handleProfileSave = () => {
    toast({
      title: "Profile Updated",
      description: "Your fitness profile has been saved successfully.",
    });
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Fitness Journey</h1>
        <p className="text-muted-foreground">
          Track your workouts, nutrition, and progress all in one place
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Dumbbell className="h-5 w-5 text-primary" />
              <span>Workouts</span>
            </CardTitle>
            <CardDescription>Plan and track your exercise routines</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <a href="#workout-plans">View Workouts</a>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Utensils className="h-5 w-5 text-primary" />
              <span>Nutrition</span>
            </CardTitle>
            <CardDescription>Meal plans and nutritional guidance</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <a href="#nutrition-plans">View Meal Plans</a>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <LineChart className="h-5 w-5 text-primary" />
              <span>Progress</span>
            </CardTitle>
            <CardDescription>Track your fitness metrics and goals</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <a href="#progress-tracking">View Progress</a>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Fitness Profile</CardTitle>
          <CardDescription>
            Customize your fitness goals and preferences to get personalized recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="goal">Fitness Goal</Label>
                <Select value={userGoal} onValueChange={setUserGoal}>
                  <SelectTrigger id="goal">
                    <SelectValue placeholder="Select your goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weight-loss">Weight Loss</SelectItem>
                    <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
                    <SelectItem value="general">General Fitness</SelectItem>
                    <SelectItem value="endurance">Endurance</SelectItem>
                    <SelectItem value="strength">Strength</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="preference">Exercise Preference</Label>
                <Select value={userPreference} onValueChange={setUserPreference}>
                  <SelectTrigger id="preference">
                    <SelectValue placeholder="Select your preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bodyweight">Bodyweight Exercises</SelectItem>
                    <SelectItem value="gym-equipment">Gym Equipment</SelectItem>
                    <SelectItem value="cardio">Cardio Focused</SelectItem>
                    <SelectItem value="home">Home Workouts</SelectItem>
                    <SelectItem value="mixed">Mixed Approach</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="dietary">Dietary Restrictions</Label>
                <Select value={dietaryRestriction} onValueChange={setDietaryRestriction}>
                  <SelectTrigger id="dietary">
                    <SelectValue placeholder="Select dietary restrictions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="vegetarian">Vegetarian</SelectItem>
                    <SelectItem value="vegan">Vegan</SelectItem>
                    <SelectItem value="gluten-free">Gluten Free</SelectItem>
                    <SelectItem value="keto">Keto</SelectItem>
                    <SelectItem value="paleo">Paleo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="frequency">Workout Frequency (days/week)</Label>
                <Select defaultValue="3">
                  <SelectTrigger id="frequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2 days</SelectItem>
                    <SelectItem value="3">3 days</SelectItem>
                    <SelectItem value="4">4 days</SelectItem>
                    <SelectItem value="5">5 days</SelectItem>
                    <SelectItem value="6">6 days</SelectItem>
                    <SelectItem value="7">7 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleProfileSave}>Save Profile</Button>
        </CardFooter>
      </Card>

      <Tabs defaultValue="workouts" className="mb-8">
        <TabsList className="grid grid-cols-2 md:grid-cols-6 mb-8">
          <TabsTrigger value="workouts" className="flex items-center gap-2">
            <Dumbbell className="h-4 w-4" />
            <span>Workouts</span>
          </TabsTrigger>
          <TabsTrigger value="nutrition" className="flex items-center gap-2">
            <Utensils className="h-4 w-4" />
            <span>Nutrition</span>
          </TabsTrigger>
          <TabsTrigger value="progress" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            <span>Progress</span>
          </TabsTrigger>
          <TabsTrigger value="schedule" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Schedule</span>
          </TabsTrigger>
          <TabsTrigger value="exercises" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            <span>Exercises</span>
          </TabsTrigger>
          <TabsTrigger value="nutrition-guide" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span>Nutrition Guide</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="workouts" id="workout-plans">
          <WorkoutPlans goal={userGoal} preference={userPreference} />
        </TabsContent>
        
        <TabsContent value="nutrition" id="nutrition-plans">
          <NutritionPlans goal={userGoal} dietaryRestriction={dietaryRestriction} />
        </TabsContent>
        
        <TabsContent value="progress" id="progress-tracking">
          <ProgressTracking />
        </TabsContent>
        
        <TabsContent value="schedule" id="gym-log">
          <GymLog />
        </TabsContent>

        <TabsContent value="exercises" id="exercise-library">
          <ExerciseLibrary />
        </TabsContent>

        <TabsContent value="nutrition-guide" id="nutrition-guide">
          <NutritionGuide />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GymPage;
