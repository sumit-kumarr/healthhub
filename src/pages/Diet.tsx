
import { useState, useEffect } from "react";
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
  Droplets,
  Info,
  Utensils,
  Heart,
  ThumbsUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionHeader } from "@/components/ui/section-header";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

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

const FoodCard = ({ name, category, image, benefits, calories }) => {
  return (
    <Card className="overflow-hidden">
      <div className="h-40 overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{name}</CardTitle>
            <CardDescription>{calories} calories per serving</CardDescription>
          </div>
          <Badge variant="outline">{category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-muted-foreground line-clamp-2">{benefits}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">Learn More</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{name}</DialogTitle>
              <DialogDescription>{category} • {calories} calories per serving</DialogDescription>
            </DialogHeader>
            <div className="mt-4 space-y-4">
              <img 
                src={image} 
                alt={name}
                className="w-full h-48 object-cover rounded-md"
              />
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <ThumbsUp className="h-4 w-4 text-green-500" /> Benefits
                </h4>
                <p className="text-sm text-muted-foreground">{benefits}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Heart className="h-4 w-4 text-red-500" /> Nutrition Facts
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Calories: {calories} per serving</li>
                  <li>Vitamins: A, C, E</li>
                  <li>Minerals: Potassium, Magnesium</li>
                  <li>Fiber: High</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Utensils className="h-4 w-4 text-blue-500" /> Serving Suggestions
                </h4>
                <p className="text-sm text-muted-foreground">
                  Enjoy fresh, in smoothies, as a topping, or incorporate into various recipes for added nutrition and flavor.
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        <Button variant="ghost" size="sm" className="text-primary">
          Add to Plan
        </Button>
      </CardFooter>
    </Card>
  );
};

const WaterTracker = () => {
  const [waterIntake, setWaterIntake] = useState(3);
  const waterGoal = 8;
  const { toast } = useToast();
  
  const handleWaterUpdate = (change) => {
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

const DietPage = () => {
  const [activeTab, setActiveTab] = useState("today");
  const { toast } = useToast();
  
  const handleChangeTab = (value) => {
    setActiveTab(value);
  };
  
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
  
  const dietPlans = [
    {
      name: "Mediterranean Diet",
      description: "Based on traditional foods from Mediterranean countries, emphasizing plant foods, healthy fats, and moderate protein.",
      benefits: "Heart health, longevity, weight management",
      foods: ["Olive oil", "Fish", "Whole grains", "Vegetables", "Fruits", "Nuts"]
    },
    {
      name: "DASH Diet",
      description: "Dietary Approaches to Stop Hypertension focuses on fruits, vegetables, whole grains, and lean proteins.",
      benefits: "Lower blood pressure, heart health",
      foods: ["Fruits", "Vegetables", "Whole grains", "Lean proteins", "Low-fat dairy"]
    },
    {
      name: "Plant-Based Diet",
      description: "Focuses primarily on plant foods while minimizing or excluding animal products.",
      benefits: "Environmental sustainability, heart health, cancer prevention",
      foods: ["Fruits", "Vegetables", "Legumes", "Whole grains", "Nuts", "Seeds"]
    },
    {
      name: "Keto Diet",
      description: "Very low in carbohydrates and high in fat, designed to put your body into a state of ketosis.",
      benefits: "Weight loss, improved mental focus",
      foods: ["Avocados", "Eggs", "Fatty fish", "Nuts", "Butter", "Cheese"]
    }
  ];

  useEffect(() => {
    // Set up real-time notifications for meal times
    const checkMealTimes = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      
      // Example of meal time notifications (simplified for demo)
      if (currentHour === 12 && currentMinute === 0) {
        toast({
          title: "Lunch Time!",
          description: "It's time for your scheduled lunch. Don't forget to log your meal!",
        });
      }
    };
    
    // Check every minute
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
          
          <Tabs defaultValue="today" className="space-y-6" onValueChange={handleChangeTab}>
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
                    <Meal key={i} {...meal} />
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
                
                <div className="mt-8 space-y-6">
                  <h3 className="font-medium text-lg">Popular Diet Plans</h3>
                  <div className="grid gap-6 md:grid-cols-2">
                    {dietPlans.map((plan, i) => (
                      <Card key={i}>
                        <CardHeader>
                          <CardTitle>{plan.name}</CardTitle>
                          <CardDescription>{plan.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <p className="text-sm font-medium">Benefits:</p>
                            <p className="text-sm text-muted-foreground">{plan.benefits}</p>
                            
                            <p className="text-sm font-medium mt-3">Key Foods:</p>
                            <div className="flex flex-wrap gap-2">
                              {plan.foods.map((food, j) => (
                                <Badge key={j} variant="outline">{food}</Badge>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full">
                            View Complete Plan
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <Button className="w-full">
                  Generate Custom Meal Plan <ArrowRight className="ml-2 h-4 w-4" />
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
