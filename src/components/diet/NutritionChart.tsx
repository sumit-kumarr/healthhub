
import { useState } from "react";
import { BarChart3, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const NutritionChart = () => {
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }));
  
  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          <h3 className="font-medium">Nutrition Summary</h3>
        </div>
        <Button variant="ghost" size="sm" className="gap-1">
          {currentDate} <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm">Calories</span>
            <span className="text-sm font-medium">1,450 / 2,000 kcal</span>
          </div>
          <Progress value={72.5} className="h-2" />
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm">Protein</span>
            <span className="text-sm font-medium">85 / 120 g</span>
          </div>
          <Progress value={70.8} className="h-2 bg-muted" />
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm">Carbs</span>
            <span className="text-sm font-medium">120 / 200 g</span>
          </div>
          <Progress value={60} className="h-2 bg-muted" />
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm">Fat</span>
            <span className="text-sm font-medium">45 / 65 g</span>
          </div>
          <Progress value={69.2} className="h-2 bg-muted" />
        </div>
      </div>
    </div>
  );
};

export default NutritionChart;
