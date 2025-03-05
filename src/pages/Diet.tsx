import { useState, useEffect } from "react";
import { Search, Plus, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionHeader } from "@/components/ui/section-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import MealItem from "@/components/diet/MealItem";
import FoodCard from "@/components/diet/FoodCard";
import WaterTracker from "@/components/diet/WaterTracker";
import NutritionChart from "@/components/diet/NutritionChart";
import DietTypesGrid from "@/components/diet/DietTypesGrid";
import DietPlansGrid from "@/components/diet/DietPlansGrid";

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

const fruits = [
  {
    name: "Apple",
    category: "Fruit",
    image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?auto=format&fit=crop&w=800&q=80",
    benefits: "Rich in fiber, vitamin C, and antioxidants. May help lower risk of heart disease and improve gut health.",
    calories: 95
  },
  {
    name: "Banana",
    category: "Fruit",
    image: "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80",
    benefits: "High in potassium and vitamin B6. Supports heart health and aids in digestion.",
    calories: 105
  },
  {
    name: "Blueberries",
    category: "Berries",
    image: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80",
    benefits: "Packed with antioxidants. May improve brain function and reduce DNA damage.",
    calories: 84
  },
  {
    name: "Avocado",
    category: "Fruit",
    image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80",
    benefits: "Rich in healthy fats, fiber, and potassium. Supports heart health and weight management.",
    calories: 160
  },
  {
    name: "Spinach",
    category: "Leafy Green",
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=80",
    benefits: "High in vitamins A, C, K, and iron. Supports bone health and immune function.",
    calories: 23
  },
  {
    name: "Salmon",
    category: "Protein",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80",
    benefits: "Excellent source of omega-3 fatty acids and protein. Supports heart and brain health.",
    calories: 206
  },
  {
    name: "Quinoa",
    category: "Grain",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e8ac?auto=format&fit=crop&w=800&q=80",
    benefits: "Complete protein with all nine essential amino acids. High in fiber and minerals.",
    calories: 120
  },
  {
    name: "Almonds",
    category: "Nuts",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=800&q=80",
    benefits: "Rich in vitamin E, magnesium, and healthy fats. May help lower cholesterol and blood pressure.",
    calories: 164
  }
];

const DietPage = () => {
  const [activeTab, setActiveTab] = useState("today");
  const { toast } = useToast();

  useEffect(() => {
    const checkMealTimes = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      
      if (currentHour === 12 && currentMinute === 0) {
        toast({
          title: "Lunch Time!",
          description: "It's time for your scheduled lunch. Don't forget to log your meal!",
        });
      }
    };
    
    const intervalId = setInterval(checkMealTimes, 60000);
    return () => clearInterval(intervalId);
  }, [toast]);

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
          
          <Tabs defaultValue="today" className="space-y-6" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="foods">Foods & Nutrition</TabsTrigger>
              <TabsTrigger value="plans">Diet Plans</TabsTrigger>
              <TabsTrigger value="recipes">Recipes</TabsTrigger>
            </TabsList>
            
            <TabsContent value="today" className="space-y-6 animate-fade-in">
              <div className="space-y-2">
                <h3 className="font-medium text-lg">Today's Meals</h3>
                <div className="space-y-3">
                  {meals.map((meal, i) => (
                    <MealItem key={i} {...meal} />
                  ))}
                </div>
              </div>
              
              <Button className="w-full">
                Add Another Meal <Plus className="ml-2 h-4 w-4" />
              </Button>
            </TabsContent>

            <TabsContent value="foods" className="animate-fade-in">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-lg">Nutritious Foods</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      Sort
                    </Button>
                  </div>
                </div>
                
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                  {fruits.map((fruit, i) => (
                    <FoodCard key={i} {...fruit} />
                  ))}
                </div>
                
                <Accordion type="single" collapsible>
                  <AccordionItem value="nutrition-facts">
                    <AccordionTrigger className="font-medium">
                      <div className="flex items-center gap-2">
                        <Info className="h-4 w-4" />
                        Nutrition Facts & Benefits
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-sm space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Understanding Nutrition Labels</h4>
                        <p className="text-muted-foreground">
                          Nutrition labels provide essential information about the nutrient content of foods. Key elements to focus on include:
                        </p>
                        <ul className="list-disc list-inside mt-2 text-muted-foreground">
                          <li>Serving size and calories per serving</li>
                          <li>Macronutrients (protein, carbs, fat)</li>
                          <li>Fiber content</li>
                          <li>Added sugars</li>
                          <li>Sodium content</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Color Guide to Fruits and Vegetables</h4>
                        <p className="text-muted-foreground">
                          The color of fruits and vegetables often indicates their specific nutrient content:
                        </p>
                        <ul className="list-disc list-inside mt-2 text-muted-foreground">
                          <li><span className="text-red-500 font-medium">Red</span>: Lycopene, anthocyanins (tomatoes, strawberries)</li>
                          <li><span className="text-orange-500 font-medium">Orange/Yellow</span>: Beta-carotene, vitamin C (oranges, carrots)</li>
                          <li><span className="text-green-500 font-medium">Green</span>: Chlorophyll, folate, lutein (spinach, broccoli)</li>
                          <li><span className="text-purple-500 font-medium">Purple/Blue</span>: Anthocyanins, resveratrol (blueberries, eggplant)</li>
                          <li><span className="text-white font-medium">White</span>: Allicin, quercetin (garlic, onions)</li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </TabsContent>
            
            <TabsContent value="plans" className="animate-fade-in">
              <div className="space-y-6">
                <h3 className="font-medium text-lg">Choose Your Diet Type</h3>
                <DietTypesGrid />
                
                <div className="mt-8 space-y-6">
                  <h3 className="font-medium text-lg">Popular Diet Plans</h3>
                  <DietPlansGrid />
                </div>
                
                <Button className="w-full">
                  Generate Custom Meal Plan <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="recipes" className="animate-fade-in">
              <div className="text-center py-10">
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
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Nutrition Tips</CardTitle>
              <CardDescription>Personalized recommendations for your goals</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <ThumbsUp className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">Increase Protein Intake</p>
                  <p className="text-xs text-muted-foreground">For your muscle building goal, aim for 1.6-2g of protein per kg of body weight.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Heart className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">Choose Whole Foods</p>
                  <p className="text-xs text-muted-foreground">Focus on unprocessed foods for better nutrient absorption and overall health.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Droplets className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">Stay Hydrated</p>
                  <p className="text-xs text-muted-foreground">Your current water intake is below target. Try to reach 8 glasses daily.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DietPage;
