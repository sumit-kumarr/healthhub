
import { useState } from "react";
import { Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

const WaterTracker = () => {
  const [waterIntake, setWaterIntake] = useState(3);
  const waterGoal = 8;
  const { toast } = useToast();
  
  const handleWaterUpdate = (change: number) => {
    const newValue = Math.max(0, Math.min(waterGoal, waterIntake + change));
    setWaterIntake(newValue);
    
    if (change > 0) {
      toast({
        title: "Water intake updated",
        description: `You've added a glass of water! ${newValue}/${waterGoal} glasses today.`,
      });
    }
  };
  
  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Droplets className="h-5 w-5 text-blue-500" />
          <h3 className="font-medium">Water Intake</h3>
        </div>
        <span className="text-sm font-medium">{waterIntake} / {waterGoal} glasses</span>
      </div>
      
      <Progress value={(waterIntake / waterGoal) * 100} className="h-2 mb-4 bg-blue-100">
        <div className="h-full bg-blue-500" style={{ width: `${(waterIntake / waterGoal) * 100}%` }} />
      </Progress>
      
      <div className="flex justify-between items-center">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => handleWaterUpdate(-1)}
          disabled={waterIntake <= 0}
        >
          -
        </Button>
        <div className="flex gap-1">
          {Array.from({ length: waterGoal }).map((_, i) => (
            <div 
              key={i} 
              className={`h-8 w-4 rounded-full transition-colors ${
                i < waterIntake ? 'bg-blue-500' : 'bg-muted'
              }`}
            />
          ))}
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => handleWaterUpdate(1)}
          disabled={waterIntake >= waterGoal}
        >
          +
        </Button>
      </div>
    </div>
  );
};

export default WaterTracker;
