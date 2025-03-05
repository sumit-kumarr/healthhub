
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarPlus, CheckCircle, XCircle, Clock, Dumbbell, BarChart2, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import NutritionChart from "@/components/diet/NutritionChart";

const GymLog = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [showWorkoutForm, setShowWorkoutForm] = useState(false);
  const [workoutType, setWorkoutType] = useState("strength");
  const [duration, setDuration] = useState("30");
  const { toast } = useToast();

  // Sample workout data for the calendar
  const workoutDays = [
    new Date(new Date().setDate(new Date().getDate() - 4)),
    new Date(new Date().setDate(new Date().getDate() - 2)),
    new Date(new Date().setDate(new Date().getDate() - 1)),
  ];

  // Example completed workout sessions
  const completedWorkouts = [
    {
      id: 1,
      date: "Today",
      name: "Upper Body Strength",
      duration: "45 min",
      completed: true,
      exercises: [
        { name: "Bench Press", sets: "4", reps: "8", weight: "135 lbs" },
        { name: "Shoulder Press", sets: "3", reps: "10", weight: "95 lbs" },
        { name: "Lat Pulldowns", sets: "3", reps: "12", weight: "120 lbs" },
      ]
    },
    {
      id: 2,
      date: "Yesterday",
      name: "Cardio & Core",
      duration: "30 min",
      completed: true,
      exercises: [
        { name: "Treadmill", sets: "1", reps: "20 min", weight: "N/A" },
        { name: "Planks", sets: "3", reps: "60 sec", weight: "N/A" },
        { name: "Russian Twists", sets: "3", reps: "20", weight: "15 lbs" },
      ]
    },
    {
      id: 3,
      date: "March 3, 2025",
      name: "Lower Body Focus",
      duration: "50 min",
      completed: true,
      exercises: [
        { name: "Squats", sets: "4", reps: "10", weight: "185 lbs" },
        { name: "Leg Press", sets: "3", reps: "12", weight: "230 lbs" },
        { name: "Lunges", sets: "3", reps: "10 each", weight: "40 lbs" },
      ]
    },
  ];

  // Example upcoming workout sessions
  const upcomingWorkouts = [
    {
      id: 4,
      date: "Tomorrow",
      name: "Full Body HIIT",
      duration: "40 min",
      time: "07:00 AM",
      exercises: [
        { name: "Burpees", sets: "4", reps: "15" },
        { name: "Mountain Climbers", sets: "3", reps: "30 sec" },
        { name: "Kettlebell Swings", sets: "3", reps: "15" },
      ]
    },
    {
      id: 5,
      date: "March 7, 2025",
      name: "Active Recovery",
      duration: "30 min",
      time: "06:30 AM",
      exercises: [
        { name: "Light Jogging", sets: "1", reps: "15 min" },
        { name: "Stretching Routine", sets: "1", reps: "10 min" },
        { name: "Foam Rolling", sets: "1", reps: "5 min" },
      ]
    },
    {
      id: 6,
      date: "March 8, 2025",
      name: "Upper Body Strength",
      duration: "45 min",
      time: "07:30 AM",
      exercises: [
        { name: "Pull-ups", sets: "4", reps: "8" },
        { name: "Dumbbell Rows", sets: "3", reps: "12" },
        { name: "Push-ups", sets: "3", reps: "15" },
      ]
    },
  ];

  const handleDateSelect = (date: Date | undefined) => {
    setDate(date);
    toast({
      title: "Date Selected",
      description: `You selected ${date?.toLocaleDateString()}`,
    });
  };

  const handleLogWorkout = () => {
    setShowWorkoutForm(true);
  };

  const handleWorkoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Workout Logged",
      description: `Your ${workoutType} workout of ${duration} minutes has been logged!`,
    });
    setShowWorkoutForm(false);
  };

  const renderWorkoutDetails = (workout: any) => (
    <div className="mt-3 pl-4 border-l-2 border-muted">
      {workout.exercises?.map((exercise: any, index: number) => (
        <div key={index} className="text-sm mt-2">
          <div className="font-medium">{exercise.name}</div>
          <div className="text-muted-foreground flex gap-3">
            <span>{exercise.sets} sets</span>
            <span>{exercise.reps} reps</span>
            {exercise.weight && <span>{exercise.weight}</span>}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Workout Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                className="mx-auto"
                modifiers={{
                  workout: workoutDays,
                }}
                modifiersStyles={{
                  workout: {
                    backgroundColor: "hsl(var(--primary) / 0.1)",
                    borderRadius: "100%",
                  }
                }}
              />
              <div className="flex justify-center mt-4">
                <Button onClick={handleLogWorkout}>
                  <CalendarPlus className="mr-2 h-4 w-4" />
                  Log Workout
                </Button>
              </div>
            </CardContent>
          </Card>

          {showWorkoutForm && (
            <Card>
              <CardHeader>
                <CardTitle>Log Your Workout</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleWorkoutSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="workout-type">Workout Type</Label>
                    <Select 
                      value={workoutType} 
                      onValueChange={setWorkoutType}
                    >
                      <SelectTrigger id="workout-type">
                        <SelectValue placeholder="Select workout type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="strength">Strength Training</SelectItem>
                        <SelectItem value="cardio">Cardio</SelectItem>
                        <SelectItem value="hiit">HIIT</SelectItem>
                        <SelectItem value="yoga">Yoga</SelectItem>
                        <SelectItem value="flexibility">Flexibility</SelectItem>
                        <SelectItem value="sports">Sports</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Input 
                      id="duration" 
                      type="number" 
                      value={duration} 
                      onChange={(e) => setDuration(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setShowWorkoutForm(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Save Workout</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          <NutritionChart />
        </div>

        <div className="space-y-6">
          <Tabs defaultValue="upcoming">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming" className="space-y-4">
              {upcomingWorkouts.map((workout) => (
                <Card key={workout.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">{workout.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{workout.date}</span>
                          <span>•</span>
                          <span>{workout.time}</span>
                          <span>•</span>
                          <span>{workout.duration}</span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">Start</Button>
                    </div>
                    {renderWorkoutDetails(workout)}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="completed" className="space-y-4">
              {completedWorkouts.map((workout) => (
                <Card key={workout.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">{workout.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{workout.date}</span>
                          <span>•</span>
                          <span>{workout.duration}</span>
                        </div>
                      </div>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        <span>Completed</span>
                      </Badge>
                    </div>
                    {renderWorkoutDetails(workout)}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>

          <Card>
            <CardHeader>
              <CardTitle>Weekly Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Total Time</div>
                    <div className="font-semibold">3 hours 45 minutes</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Dumbbell className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Workouts</div>
                    <div className="font-semibold">5 completed</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <BarChart2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Consistency</div>
                    <div className="font-semibold">85% of goal</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GymLog;
