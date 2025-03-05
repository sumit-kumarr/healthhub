
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CalendarPlus, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const GymLog = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
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
    },
    {
      id: 2,
      date: "Yesterday",
      name: "Cardio & Core",
      duration: "30 min",
      completed: true,
    },
    {
      id: 3,
      date: "March 3, 2025",
      name: "Lower Body Focus",
      duration: "50 min",
      completed: true,
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
    },
    {
      id: 5,
      date: "March 7, 2025",
      name: "Active Recovery",
      duration: "30 min",
      time: "06:30 AM",
    },
    {
      id: 6,
      date: "March 8, 2025",
      name: "Upper Body Strength",
      duration: "45 min",
      time: "07:30 AM",
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
    toast({
      title: "Workout Logged",
      description: "Your workout has been successfully logged!",
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default GymLog;
