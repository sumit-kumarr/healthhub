
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LineChart, BarChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { CalendarCheck, ArrowRight, ArrowUp, ArrowDown, LineChart as LineChartIcon, Scale, RulerIcon, Dumbbell, Activity } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample data for charts
const weightData = [
  { date: "Jan 1", weight: 185 },
  { date: "Jan 8", weight: 183 },
  { date: "Jan 15", weight: 182 },
  { date: "Jan 22", weight: 180 },
  { date: "Jan 29", weight: 178 },
  { date: "Feb 5", weight: 176 },
  { date: "Feb 12", weight: 175 },
  { date: "Feb 19", weight: 174 },
  { date: "Feb 26", weight: 173 },
  { date: "Mar 5", weight: 172 },
];

const strengthData = [
  { exercise: "Bench Press", previous: 155, current: 175 },
  { exercise: "Squat", previous: 185, current: 205 },
  { exercise: "Deadlift", previous: 225, current: 255 },
  { exercise: "Shoulder Press", previous: 95, current: 115 },
  { exercise: "Pull-up", previous: 8, current: 12 },
];

const bodyMeasurements = [
  { part: "Chest", previous: 42, current: 43 },
  { part: "Waist", previous: 34, current: 32 },
  { part: "Hips", previous: 38, current: 37 },
  { part: "Arms", previous: 14, current: 15 },
  { part: "Thighs", previous: 23, current: 24 },
];

const ProgressTracking: React.FC = () => {
  const [weight, setWeight] = useState("");
  const [bodyFat, setBodyFat] = useState("");
  const { toast } = useToast();

  const handleAddMeasurement = () => {
    if (!weight) {
      toast({
        title: "Missing information",
        description: "Please enter at least your weight.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Progress Updated",
      description: "Your new measurements have been saved.",
    });

    // Reset form
    setWeight("");
    setBodyFat("");
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Track Your Progress</h2>
        <p className="text-muted-foreground mb-4">
          Monitor your fitness journey with detailed tracking tools
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scale className="h-5 w-5 text-primary" />
              <span>Log Today's Measurements</span>
            </CardTitle>
            <CardDescription>
              Keep track of your metrics to visualize progress over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight</Label>
                  <div className="flex">
                    <Input 
                      id="weight"
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder="0.0"
                    />
                    <span className="ml-2 flex items-center text-muted-foreground">lbs</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bodyFat">Body Fat %</Label>
                  <div className="flex">
                    <Input 
                      id="bodyFat"
                      type="number"
                      value={bodyFat}
                      onChange={(e) => setBodyFat(e.target.value)}
                      placeholder="0.0"
                    />
                    <span className="ml-2 flex items-center text-muted-foreground">%</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="chest">Chest</Label>
                  <div className="flex">
                    <Input id="chest" type="number" placeholder="0.0" />
                    <span className="ml-2 flex items-center text-muted-foreground">in</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="waist">Waist</Label>
                  <div className="flex">
                    <Input id="waist" type="number" placeholder="0.0" />
                    <span className="ml-2 flex items-center text-muted-foreground">in</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="arms">Arms</Label>
                  <div className="flex">
                    <Input id="arms" type="number" placeholder="0.0" />
                    <span className="ml-2 flex items-center text-muted-foreground">in</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="thighs">Thighs</Label>
                  <div className="flex">
                    <Input id="thighs" type="number" placeholder="0.0" />
                    <span className="ml-2 flex items-center text-muted-foreground">in</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleAddMeasurement} className="w-full">
              <CalendarCheck className="mr-2 h-4 w-4" />
              Save Today's Measurements
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Dumbbell className="h-5 w-5 text-primary" />
              <span>Strength Progress</span>
            </CardTitle>
            <CardDescription>
              Track your lifting progress on key exercises
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {strengthData.map((exercise, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{exercise.exercise}</p>
                    <div className="flex items-center gap-1 text-sm">
                      <span className="text-muted-foreground">{exercise.previous} lbs</span>
                      <ArrowRight className="h-3 w-3 text-muted-foreground" />
                      <span>{exercise.current} lbs</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium text-green-500">+{exercise.current - exercise.previous}</span>
                    <ArrowUp className="ml-1 h-4 w-4 text-green-500" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Log New Strength Record
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Tabs defaultValue="weight" className="mb-8">
        <TabsList className="grid grid-cols-1 md:grid-cols-3 mb-6">
          <TabsTrigger value="weight" className="flex items-center gap-2">
            <Scale className="h-4 w-4" />
            <span>Weight History</span>
          </TabsTrigger>
          <TabsTrigger value="body" className="flex items-center gap-2">
            <RulerIcon className="h-4 w-4" />
            <span>Body Measurements</span>
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            <span>Performance Metrics</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="weight">
          <Card>
            <CardHeader>
              <CardTitle>Weight Trend</CardTitle>
              <CardDescription>
                Track your weight changes over time
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={weightData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="weight"
                    stroke="#3b82f6"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="body">
          <Card>
            <CardHeader>
              <CardTitle>Body Measurements</CardTitle>
              <CardDescription>
                Compare your current and previous measurements
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={bodyMeasurements}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="part" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="previous" name="Previous" fill="#9ca3af" />
                  <Bar dataKey="current" name="Current" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Strength Progress</CardTitle>
              <CardDescription>
                Track your lifting improvements over time
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={strengthData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="exercise" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="previous" name="Previous" fill="#9ca3af" />
                  <Bar dataKey="current" name="Current" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Progress Photos</CardTitle>
          <CardDescription>
            Visualize your physical changes with progress photos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="border rounded-md p-2 text-center">
              <p className="font-medium mb-2">Front View</p>
              <div className="aspect-square bg-muted rounded-md flex items-center justify-center">
                <p className="text-muted-foreground text-sm">No photo yet</p>
              </div>
            </div>
            <div className="border rounded-md p-2 text-center">
              <p className="font-medium mb-2">Side View</p>
              <div className="aspect-square bg-muted rounded-md flex items-center justify-center">
                <p className="text-muted-foreground text-sm">No photo yet</p>
              </div>
            </div>
            <div className="border rounded-md p-2 text-center">
              <p className="font-medium mb-2">Back View</p>
              <div className="aspect-square bg-muted rounded-md flex items-center justify-center">
                <p className="text-muted-foreground text-sm">No photo yet</p>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Take photos in consistent lighting and poses for best comparison
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            Upload Progress Photos
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProgressTracking;
