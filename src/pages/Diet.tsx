
import { useState } from "react";
import { 
  Salad, 
  Apple, 
  Beef, 
  Fish, 
  Carrot, 
  Search, 
  Plus,
  ChevronDown,
  BarChart3,
  ArrowRight,
  Droplets
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionHeader } from "@/components/ui/section-header";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MealProps {
  title: string;
  calories: number;
  proteins: number;
  carbs: number;
  fats: number;
  time: string;
  image: string;
}

const Meal = ({ title, calories, proteins, carbs, fats, time, image }: MealProps) => (
  <div className="flex items-center gap-4 p-4 rounded-lg border hover:border-primary/50 cursor-pointer transition-colors">
    <img
      src={image}
      alt={title}
      className="h-16 w-16 rounded-lg object-cover"
    />
    <div className="flex-1">
      <div className="flex justify-between">
        <h3 className="font-medium">{title}</h3>
        <span className="text-sm text-muted-foreground">{time}</span>
      </div>
      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
        <span>{calories} cal</span>
        <span>P: {proteins}g</span>
        <span>C: {carbs}g</span>
        <span>F: {fats}g</span>
      </div>
    </div>
  </div>
);

const WaterTracker = () => {
  const [waterIntake, setWaterIntake] = useState(3);
  const waterGoal = 8;
  
  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Droplets className="h-5 w-5 text-health-500" />
          <h3 className="font-medium">Water Intake</h3>
        </div>
        <span className="text-sm font-medium">{waterIntake} / {waterGoal} glasses</span>
      </div>
      
      <Progress value={(waterIntake / waterGoal) * 100} className="h-2 mb-4" />
      
      <div className="flex justify-between items-center">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setWaterIntake(Math.max(0, waterIntake - 1))}
          disabled={waterIntake <= 0}
        >
          -
        </Button>
        <div className="flex gap-1">
          {Array.from({ length: waterGoal }).map((_, i) => (
            <div 
              key={i} 
              className={`h-8 w-4 rounded-full transition-colors ${i < waterIntake ? 'bg-health-500' : 'bg-muted'}`}
            />
          ))}
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setWaterIntake(Math.min(waterGoal, waterIntake + 1))}
          disabled={waterIntake >= waterGoal}
        >
          +
        </Button>
      </div>
    </div>
  );
};

const NutritionChart = () => (
  <div className="rounded-lg border p-4">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <BarChart3 className="h-5 w-5 text-primary" />
        <h3 className="font-medium">Nutrition Summary</h3>
      </div>
      <Button variant="ghost" size="sm" className="gap-1">
        Today <ChevronDown className="h-4 w-4" />
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
        <Progress value={70.8} className="h-2 bg-muted" indicatorClassName="bg-blue-500" />
      </div>
      
      <div>
        <div className="flex justify-between mb-1">
          <span className="text-sm">Carbs</span>
          <span className="text-sm font-medium">120 / 200 g</span>
        </div>
        <Progress value={60} className="h-2 bg-muted" indicatorClassName="bg-green-500" />
      </div>
      
      <div>
        <div className="flex justify-between mb-1">
          <span className="text-sm">Fat</span>
          <span className="text-sm font-medium">45 / 65 g</span>
        </div>
        <Progress value={69.2} className="h-2 bg-muted" indicatorClassName="bg-yellow-500" />
      </div>
    </div>
  </div>
);

const DietPage = () => {
  const meals = [
    {
      title: "Greek Yogurt & Berries",
      calories: 220,
      proteins: 18,
      carbs: 24,
      fats: 5,
      time: "7:30 AM",
      image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=240&q=80",
    },
    {
      title: "Chicken Salad",
      calories: 380,
      proteins: 32,
      carbs: 15,
      fats: 22,
      time: "12:15 PM",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=240&q=80",
    },
    {
      title: "Protein Smoothie",
      calories: 230,
      proteins: 25,
      carbs: 20,
      fats: 6,
      time: "3:30 PM",
      image: "https://images.unsplash.com/photo-1553530666-ba11a90a0c3b?auto=format&fit=crop&w=240&q=80",
    },
    {
      title: "Salmon & Veggies",
      calories: 420,
      proteins: 38,
      carbs: 12,
      fats: 25,
      time: "7:00 PM",
      image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=240&q=80",
    },
  ];
  
  const dietTypes = [
    {
      icon: Salad,
      name: "Balanced",
      description: "A well-rounded diet with all food groups"
    },
    {
      icon: Carrot,
      name: "Vegetarian",
      description: "Plant-based diet excluding meat"
    },
    {
      icon: Apple,
      name: "Vegan",
      description: "Plant-based diet excluding all animal products"
    },
    {
      icon: Beef,
      name: "Keto",
      description: "High-fat, low-carb diet for ketosis"
    },
    {
      icon: Fish,
      name: "Mediterranean",
      description: "Based on traditional foods from Mediterranean countries"
    },
  ];

  return (
    <div className="container px-4 py-8">
      <SectionHeader
        title="Diet & Nutrition"
        description="Track your meals, plan your diet, and reach your nutritional goals"
        align="left"
      />
      
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search for foods..." 
                className="pl-9"
              />
            </div>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Meal
            </Button>
          </div>
          
          <Tabs defaultValue="today" className="space-y-6">
            <TabsList>
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="meals">Meal Plans</TabsTrigger>
              <TabsTrigger value="recipes">Recipes</TabsTrigger>
            </TabsList>
            
            <TabsContent value="today" className="space-y-6 animate-fade-in">
              <div className="space-y-2">
                <h3 className="font-medium text-lg">Today's Meals</h3>
                <div className="space-y-3">
                  {meals.map((meal, i) => (
                    <Meal key={i} {...meal} />
                  ))}
                </div>
              </div>
              
              <Button className="w-full">
                Add Another Meal <Plus className="ml-2 h-4 w-4" />
              </Button>
            </TabsContent>
            
            <TabsContent value="meals" className="animate-fade-in">
              <div className="space-y-6">
                <h3 className="font-medium text-lg">Choose Your Diet Type</h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {dietTypes.map((diet, i) => (
                    <div key={i} className="flex flex-col items-center p-4 border rounded-lg text-center hover:border-primary/50 cursor-pointer transition-colors">
                      <div className="p-3 bg-primary/10 rounded-full mb-3">
                        <diet.icon className="h-5 w-5 text-primary" />
                      </div>
                      <h4 className="font-medium mb-1">{diet.name}</h4>
                      <p className="text-sm text-muted-foreground">{diet.description}</p>
                    </div>
                  ))}
                </div>
                
                <Button className="w-full">
                  Generate Meal Plan <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="recipes" className="animate-fade-in">
              <div className="text-center py-10">
                <Salad className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                <h3 className="text-lg font-medium mb-2">Recipe Collection Coming Soon</h3>
                <p className="text-muted-foreground mb-6">We're working on a delicious collection of healthy recipes.</p>
                <Button variant="outline">Notify Me When Available</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="space-y-6">
          <NutritionChart />
          <WaterTracker />
        </div>
      </div>
    </div>
  );
};

export default DietPage;
