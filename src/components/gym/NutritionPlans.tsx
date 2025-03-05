
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Utensils, Salad, Coffee, ChevronRight } from "lucide-react";
import RecipeCard from "../diet/RecipeCard";

interface NutritionPlansProps {
  goal: string;
  dietaryRestriction: string;
}

const nutritionPlans = {
  "weight-loss": {
    dailyCalories: 1800,
    macros: { protein: "30%", carbs: "40%", fats: "30%" },
    meals: [
      {
        id: "breakfast",
        title: "Breakfast",
        recipes: [
          {
            id: "1",
            title: "Protein Oatmeal",
            description: "Oatmeal with protein powder, berries, and nuts",
            image: "/placeholder.svg",
            prepTime: "5 min",
            cookTime: "5 min",
            calories: 350,
            servings: 1,
            difficulty: "Easy",
            tags: ["High-Protein", "Low-Sugar", "Breakfast"],
            ingredients: [
              "1/2 cup oats",
              "1 scoop protein powder",
              "1 cup almond milk",
              "1/4 cup mixed berries",
              "1 tbsp chopped nuts",
              "1 tsp honey (optional)"
            ],
            instructions: [
              "Cook oats with almond milk according to package instructions",
              "Stir in protein powder once cooked",
              "Top with berries and nuts"
            ]
          },
          {
            id: "2",
            title: "Veggie Egg White Omelet",
            description: "Fluffy egg whites with spinach, tomatoes, and feta cheese",
            image: "/placeholder.svg",
            prepTime: "5 min",
            cookTime: "10 min",
            calories: 250,
            servings: 1,
            difficulty: "Easy",
            tags: ["High-Protein", "Low-Carb", "Breakfast"],
            ingredients: [
              "4 egg whites",
              "1 cup spinach",
              "1/4 cup diced tomatoes",
              "2 tbsp feta cheese",
              "Salt and pepper to taste",
              "Cooking spray"
            ],
            instructions: [
              "Whisk egg whites with salt and pepper",
              "Spray pan with cooking spray and heat over medium heat",
              "Add egg whites, then top with vegetables and cheese",
              "Cook until set, then fold in half"
            ]
          }
        ]
      },
      {
        id: "lunch",
        title: "Lunch",
        recipes: [
          {
            id: "3",
            title: "Chicken and Quinoa Bowl",
            description: "Protein-packed bowl with lean chicken, quinoa, and roasted vegetables",
            image: "/placeholder.svg",
            prepTime: "10 min",
            cookTime: "20 min",
            calories: 450,
            servings: 1,
            difficulty: "Medium",
            tags: ["High-Protein", "Meal Prep", "Lunch"],
            ingredients: [
              "4 oz grilled chicken breast",
              "1/2 cup cooked quinoa",
              "1 cup roasted vegetables (bell peppers, zucchini, onions)",
              "1 tbsp olive oil",
              "1 tsp Italian herbs",
              "Salt and pepper to taste"
            ],
            instructions: [
              "Season chicken with herbs, salt, and pepper",
              "Grill chicken until cooked through",
              "Toss vegetables in olive oil and roast at 400°F for 20 minutes",
              "Serve chicken over quinoa with vegetables on the side"
            ]
          }
        ]
      },
      {
        id: "dinner",
        title: "Dinner",
        recipes: [
          {
            id: "4",
            title: "Baked Salmon with Asparagus",
            description: "Omega-3 rich salmon with roasted asparagus and lemon",
            image: "/placeholder.svg",
            prepTime: "5 min",
            cookTime: "15 min",
            calories: 400,
            servings: 1,
            difficulty: "Easy",
            tags: ["High-Protein", "Low-Carb", "Dinner"],
            ingredients: [
              "5 oz salmon fillet",
              "1 bunch asparagus",
              "1 tbsp olive oil",
              "1 lemon",
              "2 cloves garlic, minced",
              "Salt and pepper to taste"
            ],
            instructions: [
              "Preheat oven to 425°F",
              "Season salmon with salt, pepper, and garlic",
              "Toss asparagus in olive oil, salt, and pepper",
              "Place salmon and asparagus on a baking sheet",
              "Bake for 12-15 minutes until salmon is cooked through",
              "Squeeze fresh lemon over everything before serving"
            ]
          }
        ]
      },
      {
        id: "snacks",
        title: "Snacks",
        recipes: [
          {
            id: "5",
            title: "Greek Yogurt Parfait",
            description: "Protein-rich yogurt with berries and a touch of honey",
            image: "/placeholder.svg",
            prepTime: "5 min",
            cookTime: "0 min",
            calories: 200,
            servings: 1,
            difficulty: "Easy",
            tags: ["High-Protein", "Snack", "Quick"],
            ingredients: [
              "1 cup Greek yogurt",
              "1/4 cup mixed berries",
              "1 tbsp honey",
              "1 tbsp chopped nuts"
            ],
            instructions: [
              "Layer yogurt and berries in a glass",
              "Drizzle with honey and top with nuts"
            ]
          },
          {
            id: "6",
            title: "Protein Shake",
            description: "Quick and easy protein shake for post-workout recovery",
            image: "/placeholder.svg",
            prepTime: "2 min",
            cookTime: "0 min",
            calories: 150,
            servings: 1,
            difficulty: "Easy",
            tags: ["High-Protein", "Post-Workout", "Quick"],
            ingredients: [
              "1 scoop protein powder",
              "1 cup almond milk",
              "1/2 banana",
              "Ice cubes"
            ],
            instructions: [
              "Blend all ingredients until smooth"
            ]
          }
        ]
      }
    ]
  },
  "muscle-gain": {
    dailyCalories: 2800,
    macros: { protein: "35%", carbs: "45%", fats: "20%" },
    meals: [
      {
        id: "breakfast",
        title: "Breakfast",
        recipes: [
          {
            id: "7",
            title: "Protein Pancakes",
            description: "High-protein pancakes with banana and protein powder",
            image: "/placeholder.svg",
            prepTime: "10 min",
            cookTime: "10 min",
            calories: 550,
            servings: 1,
            difficulty: "Medium",
            tags: ["High-Protein", "Breakfast", "Muscle Building"],
            ingredients: [
              "1 ripe banana",
              "2 whole eggs",
              "1 scoop protein powder",
              "1/4 cup oats",
              "1 tbsp peanut butter for topping",
              "Sugar-free syrup (optional)"
            ],
            instructions: [
              "Blend banana, eggs, protein powder, and oats until smooth",
              "Cook pancakes on a non-stick pan over medium heat",
              "Top with peanut butter and sugar-free syrup if desired"
            ]
          }
        ]
      },
      {
        id: "lunch",
        title: "Lunch",
        recipes: [
          {
            id: "8",
            title: "Steak and Sweet Potato",
            description: "Lean steak with sweet potato and steamed broccoli",
            image: "/placeholder.svg",
            prepTime: "10 min",
            cookTime: "20 min",
            calories: 650,
            servings: 1,
            difficulty: "Medium",
            tags: ["High-Protein", "Muscle Building", "Lunch"],
            ingredients: [
              "6 oz lean steak",
              "1 medium sweet potato",
              "1 cup broccoli florets",
              "2 tbsp olive oil",
              "Salt, pepper, and garlic powder to taste"
            ],
            instructions: [
              "Season steak with salt, pepper, and garlic powder",
              "Grill or pan-sear steak to desired doneness",
              "Bake sweet potato at 400°F for 45 minutes or microwave for 5-8 minutes",
              "Steam broccoli until tender but still crisp"
            ]
          }
        ]
      },
      {
        id: "dinner",
        title: "Dinner",
        recipes: [
          {
            id: "9",
            title: "Turkey Chili",
            description: "Protein-rich turkey chili with beans and vegetables",
            image: "/placeholder.svg",
            prepTime: "15 min",
            cookTime: "30 min",
            calories: 550,
            servings: 1,
            difficulty: "Medium",
            tags: ["High-Protein", "Meal Prep", "Dinner"],
            ingredients: [
              "6 oz ground turkey",
              "1/2 cup kidney beans",
              "1/2 cup black beans",
              "1/2 cup diced tomatoes",
              "1/4 cup diced onion",
              "1/4 cup diced bell pepper",
              "Chili seasoning to taste"
            ],
            instructions: [
              "Brown turkey in a large pot",
              "Add all other ingredients and simmer for 30 minutes",
              "Serve hot, optionally topped with Greek yogurt or cheese"
            ]
          }
        ]
      },
      {
        id: "snacks",
        title: "Snacks",
        recipes: [
          {
            id: "10",
            title: "Protein Smoothie",
            description: "Calorie-dense smoothie with protein, fruit, and nut butter",
            image: "/placeholder.svg",
            prepTime: "5 min",
            cookTime: "0 min",
            calories: 350,
            servings: 1,
            difficulty: "Easy",
            tags: ["High-Protein", "High-Calorie", "Snack"],
            ingredients: [
              "1 scoop protein powder",
              "1 cup whole milk",
              "1 banana",
              "1 tbsp peanut butter",
              "1 tbsp honey",
              "1/4 cup oats"
            ],
            instructions: [
              "Blend all ingredients until smooth and creamy"
            ]
          },
          {
            id: "11",
            title: "Trail Mix",
            description: "Energy-dense mix of nuts, seeds, and dried fruit",
            image: "/placeholder.svg",
            prepTime: "2 min",
            cookTime: "0 min",
            calories: 300,
            servings: 1,
            difficulty: "Easy",
            tags: ["High-Calorie", "Snack", "Quick"],
            ingredients: [
              "1/4 cup mixed nuts",
              "1 tbsp sunflower seeds",
              "1 tbsp dried cranberries",
              "1 tbsp dark chocolate chips"
            ],
            instructions: [
              "Mix all ingredients together and store in a small container"
            ]
          }
        ]
      }
    ]
  },
  "general": {
    dailyCalories: 2200,
    macros: { protein: "25%", carbs: "50%", fats: "25%" },
    meals: [
      {
        id: "breakfast",
        title: "Breakfast",
        recipes: [
          {
            id: "12",
            title: "Avocado Toast with Eggs",
            description: "Whole grain toast with avocado and poached eggs",
            image: "/placeholder.svg",
            prepTime: "5 min",
            cookTime: "10 min",
            calories: 400,
            servings: 1,
            difficulty: "Easy",
            tags: ["Balanced", "Breakfast", "Healthy Fats"],
            ingredients: [
              "2 slices whole grain bread",
              "1/2 ripe avocado",
              "2 eggs",
              "Salt and pepper to taste",
              "Red pepper flakes (optional)",
              "Lemon juice (optional)"
            ],
            instructions: [
              "Toast bread until golden brown",
              "Mash avocado and spread on toast",
              "Poach or fry eggs as preferred",
              "Top toast with eggs and season with salt, pepper, and optional toppings"
            ]
          }
        ]
      },
      {
        id: "lunch",
        title: "Lunch",
        recipes: [
          {
            id: "13",
            title: "Mediterranean Salad",
            description: "Fresh salad with grilled chicken, feta, and olives",
            image: "/placeholder.svg",
            prepTime: "15 min",
            cookTime: "10 min",
            calories: 450,
            servings: 1,
            difficulty: "Easy",
            tags: ["Balanced", "Mediterranean", "Lunch"],
            ingredients: [
              "2 cups mixed greens",
              "4 oz grilled chicken breast",
              "1/4 cup cherry tomatoes",
              "1/4 cup cucumber",
              "2 tbsp feta cheese",
              "5 kalamata olives",
              "2 tbsp olive oil and lemon dressing"
            ],
            instructions: [
              "Grill chicken breast with olive oil, salt, and pepper",
              "Chop vegetables and combine with greens",
              "Top with sliced chicken, feta, and olives",
              "Drizzle with dressing and serve"
            ]
          }
        ]
      },
      {
        id: "dinner",
        title: "Dinner",
        recipes: [
          {
            id: "14",
            title: "Grilled Fish Tacos",
            description: "Soft corn tortillas with grilled fish and fresh salsa",
            image: "/placeholder.svg",
            prepTime: "15 min",
            cookTime: "10 min",
            calories: 500,
            servings: 1,
            difficulty: "Medium",
            tags: ["Balanced", "Dinner", "Healthy"],
            ingredients: [
              "5 oz white fish (tilapia, cod, or mahi-mahi)",
              "2 corn tortillas",
              "1/4 cup diced tomatoes",
              "1/4 cup diced onion",
              "1/4 cup shredded cabbage",
              "1/4 avocado, sliced",
              "Lime juice",
              "Cilantro",
              "Spices: cumin, chili powder, salt, pepper"
            ],
            instructions: [
              "Season fish with spices and grill until flaky",
              "Warm tortillas on the grill or in a pan",
              "Combine tomatoes, onion, lime juice, and cilantro for salsa",
              "Assemble tacos with fish, salsa, cabbage, and avocado"
            ]
          }
        ]
      },
      {
        id: "snacks",
        title: "Snacks",
        recipes: [
          {
            id: "15",
            title: "Hummus and Veggies",
            description: "Protein-rich hummus with fresh vegetable sticks",
            image: "/placeholder.svg",
            prepTime: "5 min",
            cookTime: "0 min",
            calories: 200,
            servings: 1,
            difficulty: "Easy",
            tags: ["Balanced", "Vegetarian", "Snack"],
            ingredients: [
              "1/4 cup hummus",
              "1 cup mixed vegetable sticks (carrots, celery, bell peppers)",
              "1 tbsp olive oil (optional drizzle)",
              "Paprika for garnish (optional)"
            ],
            instructions: [
              "Arrange vegetables on a plate with hummus in the center",
              "Optionally drizzle with olive oil and sprinkle with paprika"
            ]
          },
          {
            id: "16",
            title: "Fruit and Nut Butter",
            description: "Fresh apple slices with almond butter",
            image: "/placeholder.svg",
            prepTime: "2 min",
            cookTime: "0 min",
            calories: 250,
            servings: 1,
            difficulty: "Easy",
            tags: ["Balanced", "Quick", "Snack"],
            ingredients: [
              "1 medium apple",
              "1 tbsp almond butter",
              "Cinnamon (optional)"
            ],
            instructions: [
              "Slice apple and serve with almond butter for dipping",
              "Sprinkle with cinnamon if desired"
            ]
          }
        ]
      }
    ]
  }
};

const NutritionPlans: React.FC<NutritionPlansProps> = ({ goal, dietaryRestriction }) => {
  const [selectedMeal, setSelectedMeal] = useState("breakfast");
  
  // Default to general if goal not found
  const goalNutrition = nutritionPlans[goal as keyof typeof nutritionPlans] || nutritionPlans.general;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Your Nutrition Plan</h2>
        <p className="text-muted-foreground mb-4">
          Based on your goal of <span className="font-medium">{goal.replace('-', ' ')}</span>
          {dietaryRestriction !== "none" && ` with ${dietaryRestriction.replace('-', ' ')} dietary preferences`}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Utensils className="h-5 w-5 text-primary" />
                <span>Daily Calories</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{goalNutrition.dailyCalories}</p>
              <p className="text-sm text-muted-foreground">calories per day</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Salad className="h-5 w-5 text-primary" />
                <span>Macronutrients</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-sm">
                <div>
                  <p className="font-bold text-primary">{goalNutrition.macros.protein}</p>
                  <p className="text-muted-foreground">Protein</p>
                </div>
                <div>
                  <p className="font-bold text-blue-500">{goalNutrition.macros.carbs}</p>
                  <p className="text-muted-foreground">Carbs</p>
                </div>
                <div>
                  <p className="font-bold text-yellow-500">{goalNutrition.macros.fats}</p>
                  <p className="text-muted-foreground">Fats</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Coffee className="h-5 w-5 text-primary" />
                <span>Meal Frequency</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">4-5</p>
              <p className="text-sm text-muted-foreground">meals per day</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mb-8">
        <Tabs defaultValue="breakfast" onValueChange={setSelectedMeal}>
          <TabsList className="mb-6">
            <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
            <TabsTrigger value="lunch">Lunch</TabsTrigger>
            <TabsTrigger value="dinner">Dinner</TabsTrigger>
            <TabsTrigger value="snacks">Snacks</TabsTrigger>
          </TabsList>
          
          {goalNutrition.meals.map(meal => (
            <TabsContent key={meal.id} value={meal.id}>
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-medium">{meal.title} Options</h3>
                  <Button variant="outline" size="sm">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    Plan Your Meals
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {meal.recipes.map(recipe => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                  ))}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Nutrition Tips</CardTitle>
          <CardDescription>
            Follow these tips to maximize your {goal.replace('-', ' ')} results
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {goal === "weight-loss" && (
              <>
                <li className="flex gap-2">
                  <Badge variant="outline" className="flex-shrink-0 mt-0.5">1</Badge>
                  <span>Focus on protein with every meal to promote satiety and preserve muscle mass</span>
                </li>
                <li className="flex gap-2">
                  <Badge variant="outline" className="flex-shrink-0 mt-0.5">2</Badge>
                  <span>Eat plenty of fiber-rich vegetables to feel fuller on fewer calories</span>
                </li>
                <li className="flex gap-2">
                  <Badge variant="outline" className="flex-shrink-0 mt-0.5">3</Badge>
                  <span>Stay hydrated - sometimes thirst can be mistaken for hunger</span>
                </li>
                <li className="flex gap-2">
                  <Badge variant="outline" className="flex-shrink-0 mt-0.5">4</Badge>
                  <span>Limit processed foods and focus on whole, nutrient-dense options</span>
                </li>
              </>
            )}
            
            {goal === "muscle-gain" && (
              <>
                <li className="flex gap-2">
                  <Badge variant="outline" className="flex-shrink-0 mt-0.5">1</Badge>
                  <span>Eat in a caloric surplus of 300-500 calories above maintenance</span>
                </li>
                <li className="flex gap-2">
                  <Badge variant="outline" className="flex-shrink-0 mt-0.5">2</Badge>
                  <span>Consume 1.6-2.2g of protein per kg of bodyweight for optimal muscle growth</span>
                </li>
                <li className="flex gap-2">
                  <Badge variant="outline" className="flex-shrink-0 mt-0.5">3</Badge>
                  <span>Time protein intake around workouts for better recovery</span>
                </li>
                <li className="flex gap-2">
                  <Badge variant="outline" className="flex-shrink-0 mt-0.5">4</Badge>
                  <span>Don't neglect carbohydrates - they fuel intense training and recovery</span>
                </li>
              </>
            )}
            
            {goal === "general" && (
              <>
                <li className="flex gap-2">
                  <Badge variant="outline" className="flex-shrink-0 mt-0.5">1</Badge>
                  <span>Focus on whole, unprocessed foods most of the time</span>
                </li>
                <li className="flex gap-2">
                  <Badge variant="outline" className="flex-shrink-0 mt-0.5">2</Badge>
                  <span>Aim for a balanced plate with protein, complex carbs, healthy fats, and vegetables</span>
                </li>
                <li className="flex gap-2">
                  <Badge variant="outline" className="flex-shrink-0 mt-0.5">3</Badge>
                  <span>Stay hydrated throughout the day with water as your primary beverage</span>
                </li>
                <li className="flex gap-2">
                  <Badge variant="outline" className="flex-shrink-0 mt-0.5">4</Badge>
                  <span>Practice mindful eating by paying attention to hunger and fullness cues</span>
                </li>
              </>
            )}
          </ul>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            View Complete Nutrition Guide <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NutritionPlans;
