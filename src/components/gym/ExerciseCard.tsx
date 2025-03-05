
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CalendarPlus, Dumbbell, ChevronRight } from "lucide-react";

interface Exercise {
  id: number;
  name: string;
  sets: number;
  reps: string;
  image: string;
  level: string;
  description: string;
  muscles: string[];
}

interface ExerciseCardProps {
  exercise: Exercise;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise }) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="h-40 overflow-hidden">
        <img 
          src={exercise.image} 
          alt={exercise.name}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{exercise.name}</CardTitle>
            <CardDescription className="line-clamp-2">{exercise.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow">
        <div className="flex flex-wrap gap-2 mb-3">
          {exercise.muscles.map((muscle, i) => (
            <Badge key={i} variant="secondary" className="text-xs">{muscle}</Badge>
          ))}
          <Badge variant="outline" className="text-xs">{exercise.level}</Badge>
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{exercise.sets} sets</span>
          <span>{exercise.reps} reps</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">View Details</Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{exercise.name}</DialogTitle>
              <DialogDescription>{exercise.description}</DialogDescription>
            </DialogHeader>
            <div className="grid md:grid-cols-2 gap-6 py-4">
              <div>
                <img 
                  src={exercise.image} 
                  alt={exercise.name}
                  className="w-full rounded-md h-60 object-cover mb-4"
                />
                <div className="flex flex-wrap gap-2 mb-4">
                  {exercise.muscles.map((muscle, i) => (
                    <Badge key={i} variant="secondary">{muscle}</Badge>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                  <div className="flex flex-col items-center p-2 rounded-md bg-muted">
                    <span className="font-medium">{exercise.sets}</span>
                    <span className="text-xs text-muted-foreground">Sets</span>
                  </div>
                  <div className="flex flex-col items-center p-2 rounded-md bg-muted">
                    <span className="font-medium">{exercise.reps}</span>
                    <span className="text-xs text-muted-foreground">Reps</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-3">How to perform</h4>
                <ul className="space-y-4 text-sm">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 inline-flex items-center justify-center rounded-full bg-primary w-6 h-6 text-primary-foreground text-xs font-medium">
                      1
                    </span>
                    <p>Start with proper form and positioning.</p>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 inline-flex items-center justify-center rounded-full bg-primary w-6 h-6 text-primary-foreground text-xs font-medium">
                      2
                    </span>
                    <p>Perform the movement with control, focusing on the target muscles.</p>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 inline-flex items-center justify-center rounded-full bg-primary w-6 h-6 text-primary-foreground text-xs font-medium">
                      3
                    </span>
                    <p>Maintain proper breathing throughout the exercise.</p>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 inline-flex items-center justify-center rounded-full bg-primary w-6 h-6 text-primary-foreground text-xs font-medium">
                      4
                    </span>
                    <p>Complete the recommended sets and reps with appropriate rest periods.</p>
                  </li>
                </ul>
                <div className="border-t mt-6 pt-6">
                  <h4 className="font-medium mb-2">Expert Tips</h4>
                  <p className="text-sm text-muted-foreground">
                    Focus on form over weight or reps. Keep the movement slow and controlled for maximum muscle engagement.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline">
                <CalendarPlus className="mr-2 h-4 w-4" />
                Add to Schedule
              </Button>
              <Button>
                <Dumbbell className="mr-2 h-4 w-4" />
                Start Exercise
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-muted-foreground"
        >
          Log Exercise
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ExerciseCard;
