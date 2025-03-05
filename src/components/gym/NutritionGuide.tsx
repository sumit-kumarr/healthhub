
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Utensils, Apple, Banana, Fish, Beef, Carrot, Egg, Wheat, XCircle, CheckCircle } from "lucide-react";

const NutritionGuide: React.FC = () => {
  const [selectedMacro, setSelectedMacro] = useState<string>("proteins");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Nutrition Guide</h2>
        <p className="text-muted-foreground mb-6">
          Learn what to eat, what to avoid, and how to optimize your nutrition for your fitness goals
        </p>
      </div>

      <Tabs defaultValue="macros" className="space-y-4">
        <TabsList>
          <TabsTrigger value="macros">Macronutrients</TabsTrigger>
          <TabsTrigger value="meal-timing">Meal Timing</TabsTrigger>
          <TabsTrigger value="foods">Foods List</TabsTrigger>
          <TabsTrigger value="supplements">Supplements</TabsTrigger>
        </TabsList>

        {/* Macronutrients Section */}
        <TabsContent value="macros">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className={`cursor-pointer hover:border-primary ${selectedMacro === "proteins" ? "border-primary" : ""}`} onClick={() => setSelectedMacro("proteins")}>
              <CardHeader className="pb-2">
                <CardTitle>Proteins</CardTitle>
                <CardDescription>Building blocks for muscle</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  <div className="font-medium">1.6-2.2g per kg of bodyweight</div>
                  <div className="text-muted-foreground">For muscle growth</div>
                </div>
              </CardContent>
            </Card>

            <Card className={`cursor-pointer hover:border-primary ${selectedMacro === "carbs" ? "border-primary" : ""}`} onClick={() => setSelectedMacro("carbs")}>
              <CardHeader className="pb-2">
                <CardTitle>Carbohydrates</CardTitle>
                <CardDescription>Primary energy source</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  <div className="font-medium">3-7g per kg of bodyweight</div>
                  <div className="text-muted-foreground">Based on activity level</div>
                </div>
              </CardContent>
            </Card>

            <Card className={`cursor-pointer hover:border-primary ${selectedMacro === "fats" ? "border-primary" : ""}`} onClick={() => setSelectedMacro("fats")}>
              <CardHeader className="pb-2">
                <CardTitle>Healthy Fats</CardTitle>
                <CardDescription>Essential for hormones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  <div className="font-medium">0.5-1g per kg of bodyweight</div>
                  <div className="text-muted-foreground">For optimal health</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>
                {selectedMacro === "proteins" && "Protein Guide"}
                {selectedMacro === "carbs" && "Carbohydrate Guide"}
                {selectedMacro === "fats" && "Healthy Fats Guide"}
              </CardTitle>
              <CardDescription>
                {selectedMacro === "proteins" && "Essential for muscle repair and growth"}
                {selectedMacro === "carbs" && "Fuel for high-intensity workouts"}
                {selectedMacro === "fats" && "Important for hormone production and vitamin absorption"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedMacro === "proteins" && (
                <>
                  <div>
                    <h4 className="font-medium mb-2">Best Sources</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      <Badge variant="outline" className="justify-start">Chicken Breast (31g/100g)</Badge>
                      <Badge variant="outline" className="justify-start">Lean Beef (26g/100g)</Badge>
                      <Badge variant="outline" className="justify-start">Fish (20-25g/100g)</Badge>
                      <Badge variant="outline" className="justify-start">Greek Yogurt (10g/100g)</Badge>
                      <Badge variant="outline" className="justify-start">Eggs (6g per egg)</Badge>
                      <Badge variant="outline" className="justify-start">Tofu (8g/100g)</Badge>
                      <Badge variant="outline" className="justify-start">Lentils (9g/100g)</Badge>
                      <Badge variant="outline" className="justify-start">Whey Protein (80-90g/100g)</Badge>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Timing</h4>
                    <p className="text-sm text-muted-foreground">
                      Distribute protein intake evenly throughout the day, aiming for 20-40g per meal. Consuming protein within 2 hours post-workout can help maximize muscle protein synthesis.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Tips</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Complete proteins contain all essential amino acids (animal products, quinoa, buckwheat)</li>
                      <li>• Combine incomplete proteins (beans + rice) for vegetarian/vegan diets</li>
                      <li>• Consider digestibility - whey is quickly absorbed, casein is slow-releasing</li>
                    </ul>
                  </div>
                </>
              )}

              {selectedMacro === "carbs" && (
                <>
                  <div>
                    <h4 className="font-medium mb-2">Best Sources</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      <Badge variant="outline" className="justify-start">Oats (56g/100g)</Badge>
                      <Badge variant="outline" className="justify-start">Brown Rice (23g/100g)</Badge>
                      <Badge variant="outline" className="justify-start">Sweet Potatoes (20g/100g)</Badge>
                      <Badge variant="outline" className="justify-start">Quinoa (21g/100g)</Badge>
                      <Badge variant="outline" className="justify-start">Fruits (10-25g/100g)</Badge>
                      <Badge variant="outline" className="justify-start">Beans (20g/100g)</Badge>
                      <Badge variant="outline" className="justify-start">Whole Grain Bread (40g/100g)</Badge>
                      <Badge variant="outline" className="justify-start">Vegetables (5-10g/100g)</Badge>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Timing</h4>
                    <p className="text-sm text-muted-foreground">
                      Consume more carbs before and after workouts for energy and recovery. On rest days, you may reduce carb intake or focus on low-glycemic options. Consider carb cycling based on training intensity.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Tips</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Prioritize complex carbs with fiber for sustained energy</li>
                      <li>• Simple carbs are best immediately after workouts for quick glycogen replenishment</li>
                      <li>• For weight loss, reduce carbs in the evening and on rest days</li>
                      <li>• For muscle gain, increase carbs on training days, especially around workouts</li>
                    </ul>
                  </div>
                </>
              )}

              {selectedMacro === "fats" && (
                <>
                  <div>
                    <h4 className="font-medium mb-2">Best Sources</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      <Badge variant="outline" className="justify-start">Avocados (15g/100g)</Badge>
                      <Badge variant="outline" className="justify-start">Olive Oil (100g/100g)</Badge>
                      <Badge variant="outline" className="justify-start">Nuts (50-70g/100g)</Badge>
                      <Badge variant="outline" className="justify-start">Seeds (40-50g/100g)</Badge>
                      <Badge variant="outline" className="justify-start">Fatty Fish (10-20g/100g)</Badge>
                      <Badge variant="outline" className="justify-start">Eggs (11g/100g)</Badge>
                      <Badge variant="outline" className="justify-start">Dark Chocolate (30g/100g)</Badge>
                      <Badge variant="outline" className="justify-start">Coconut Oil (100g/100g)</Badge>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Timing</h4>
                    <p className="text-sm text-muted-foreground">
                      Distribute fats throughout the day. Consider reducing fat intake around workouts as it slows digestion. Higher fat meals are better suited for times further from training sessions.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Tips</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Focus on monounsaturated and polyunsaturated fats</li>
                      <li>• Omega-3 fatty acids from fish, flaxseeds, and walnuts help reduce inflammation</li>
                      <li>• Limit saturated fats from processed foods and fatty meats</li>
                      <li>• Avoid trans fats completely (found in some processed foods)</li>
                      <li>• Don't go below 15% of total calories from fat, as it's essential for hormone production</li>
                    </ul>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Meal Timing Section */}
        <TabsContent value="meal-timing">
          <Card>
            <CardHeader>
              <CardTitle>Optimal Meal Timing</CardTitle>
              <CardDescription>
                Strategic nutrient timing can enhance performance and recovery
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium mb-3">Pre-Workout Nutrition (1-2 hours before)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="font-medium text-sm">Goals:</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Provide energy for the workout</li>
                      <li>• Prevent muscle breakdown</li>
                      <li>• Enhance performance</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <div className="font-medium text-sm">Recommended:</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Moderate protein (20-30g)</li>
                      <li>• Moderate to high carbs (30-60g)</li>
                      <li>• Low fat (less than 10g)</li>
                      <li>• Example: Oatmeal with protein powder and banana</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Intra-Workout Nutrition (during)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="font-medium text-sm">Goals:</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Maintain energy levels</li>
                      <li>• Stay hydrated</li>
                      <li>• For sessions > 60 minutes</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <div className="font-medium text-sm">Recommended:</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Fast-digesting carbs (15-30g per hour)</li>
                      <li>• BCAAs or EAAs (5-10g)</li>
                      <li>• Electrolytes</li>
                      <li>• Example: Sports drink with BCAAs</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Post-Workout Nutrition (within 30-60 min)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="font-medium text-sm">Goals:</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Replenish glycogen stores</li>
                      <li>• Initiate muscle repair</li>
                      <li>• Reduce muscle breakdown</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <div className="font-medium text-sm">Recommended:</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• High-quality protein (20-40g)</li>
                      <li>• Fast-digesting carbs (40-60g)</li>
                      <li>• Low fat</li>
                      <li>• Example: Whey protein shake with banana and honey</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Daily Meal Structure</h4>
                <div className="text-sm text-muted-foreground space-y-3">
                  <p>For optimal results, consider eating 4-6 smaller meals throughout the day rather than 2-3 large ones. This approach helps maintain stable blood sugar levels, provides a steady stream of nutrients, and may help control appetite.</p>
                  
                  <p>Sample meal structure:</p>
                  <ul className="space-y-1">
                    <li>• Breakfast: Protein + complex carbs + fruits</li>
                    <li>• Lunch: Protein + vegetables + complex carbs</li>
                    <li>• Pre-workout snack: Fast-digesting carbs + moderate protein</li>
                    <li>• Post-workout: Fast-digesting protein + fast-digesting carbs</li>
                    <li>• Dinner: Protein + vegetables + fats</li>
                    <li>• Evening snack (optional): Slow-digesting protein + fats</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Foods Section */}
        <TabsContent value="foods">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Foods to Include</span>
                </CardTitle>
                <CardDescription>Prioritize these nutritious foods in your diet</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Proteins</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Chicken breast (lean, high protein)</li>
                      <li>• Turkey (lean, high protein)</li>
                      <li>• Lean beef (iron-rich, high protein)</li>
                      <li>• Fish (omega-3 fatty acids, protein)</li>
                      <li>• Eggs (complete protein, vitamins)</li>
                      <li>• Greek yogurt (protein, probiotics)</li>
                      <li>• Cottage cheese (casein protein)</li>
                      <li>• Tofu and tempeh (plant-based proteins)</li>
                      <li>• Legumes (plant protein, fiber)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Carbohydrates</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Sweet potatoes (complex carbs, vitamins)</li>
                      <li>• Brown rice (fiber, complex carbs)</li>
                      <li>• Quinoa (complete protein, complex carbs)</li>
                      <li>• Oats (fiber, slow-releasing energy)</li>
                      <li>• Fruits (vitamins, minerals, fiber)</li>
                      <li>• Vegetables (micronutrients, fiber)</li>
                      <li>• Whole grain bread (complex carbs)</li>
                      <li>• Beans (protein, fiber, complex carbs)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Healthy Fats</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Avocados (monounsaturated fats)</li>
                      <li>• Nuts (healthy fats, protein)</li>
                      <li>• Seeds (omega-3, minerals)</li>
                      <li>• Olive oil (monounsaturated fats)</li>
                      <li>• Fatty fish (omega-3 fatty acids)</li>
                      <li>• Egg yolks (fat-soluble vitamins)</li>
                      <li>• Natural nut butters (healthy fats, protein)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-red-500" />
                  <span>Foods to Limit or Avoid</span>
                </CardTitle>
                <CardDescription>Minimize these foods for better results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Processed Foods</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Fast food (high calories, poor nutrients)</li>
                      <li>• Processed meats (preservatives, sodium)</li>
                      <li>• Frozen dinners (sodium, additives)</li>
                      <li>• Packaged snacks (refined carbs, oils)</li>
                      <li>• Sugary cereals (simple sugars, additives)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Added Sugars</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Sodas and sugary drinks (empty calories)</li>
                      <li>• Candy and sweets (simple sugars)</li>
                      <li>• Commercial baked goods (trans fats, sugars)</li>
                      <li>• Ice cream (high fat, high sugar)</li>
                      <li>• Flavored yogurts (hidden sugars)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Unhealthy Fats</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Fried foods (trans fats, oxidized oils)</li>
                      <li>• Margarine (trans fats)</li>
                      <li>• Vegetable shortening (trans fats)</li>
                      <li>• Commercial salad dressings (refined oils)</li>
                      <li>• High-fat processed meats (saturated fats)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Other</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Alcohol (empty calories, impairs recovery)</li>
                      <li>• Excessive caffeine (can affect sleep, hydration)</li>
                      <li>• Artificial sweeteners (may increase cravings)</li>
                      <li>• High-sodium foods (water retention)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Supplements Section */}
        <TabsContent value="supplements">
          <Card>
            <CardHeader>
              <CardTitle>Supplements Guide</CardTitle>
              <CardDescription>
                Supplements should complement a balanced diet, not replace it
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Protein Supplements</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="text-sm space-y-1">
                      <div className="font-medium">Types:</div>
                      <ul className="text-muted-foreground space-y-1">
                        <li>• Whey (fast-absorbing)</li>
                        <li>• Casein (slow-absorbing)</li>
                        <li>• Plant-based (pea, rice, hemp)</li>
                      </ul>
                    </div>
                    <div className="text-sm space-y-1">
                      <div className="font-medium">Benefits:</div>
                      <ul className="text-muted-foreground space-y-1">
                        <li>• Convenient protein source</li>
                        <li>• Supports muscle recovery</li>
                        <li>• May help with satiety</li>
                      </ul>
                    </div>
                    <div className="text-sm space-y-1">
                      <div className="font-medium">Recommended Use:</div>
                      <p className="text-muted-foreground">20-40g post-workout or between meals when whole food protein is not available.</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Creatine</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="text-sm space-y-1">
                      <div className="font-medium">Types:</div>
                      <ul className="text-muted-foreground space-y-1">
                        <li>• Creatine Monohydrate (most studied)</li>
                        <li>• Creatine HCL</li>
                        <li>• Buffered Creatine</li>
                      </ul>
                    </div>
                    <div className="text-sm space-y-1">
                      <div className="font-medium">Benefits:</div>
                      <ul className="text-muted-foreground space-y-1">
                        <li>• Increases strength and power</li>
                        <li>• Enhances muscle recovery</li>
                        <li>• Supports muscle growth</li>
                      </ul>
                    </div>
                    <div className="text-sm space-y-1">
                      <div className="font-medium">Recommended Use:</div>
                      <p className="text-muted-foreground">3-5g daily, with or without loading phase. Take consistently for best results.</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Pre-Workout</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="text-sm space-y-1">
                      <div className="font-medium">Key Ingredients:</div>
                      <ul className="text-muted-foreground space-y-1">
                        <li>• Caffeine (energy, focus)</li>
                        <li>• Beta-Alanine (endurance)</li>
                        <li>• Citrulline Malate (pump, blood flow)</li>
                        <li>• BCAAs (muscle protection)</li>
                      </ul>
                    </div>
                    <div className="text-sm space-y-1">
                      <div className="font-medium">Benefits:</div>
                      <ul className="text-muted-foreground space-y-1">
                        <li>• Increased energy and focus</li>
                        <li>• Enhanced endurance</li>
                        <li>• Improved performance</li>
                      </ul>
                    </div>
                    <div className="text-sm space-y-1">
                      <div className="font-medium">Recommended Use:</div>
                      <p className="text-muted-foreground">20-30 minutes before workout. Cycle usage to prevent tolerance.</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">BCAAs</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="text-sm space-y-1">
                      <div className="font-medium">Components:</div>
                      <ul className="text-muted-foreground space-y-1">
                        <li>• Leucine (primary for muscle protein synthesis)</li>
                        <li>• Isoleucine (glucose uptake, energy)</li>
                        <li>• Valine (prevents muscle breakdown)</li>
                      </ul>
                    </div>
                    <div className="text-sm space-y-1">
                      <div className="font-medium">Benefits:</div>
                      <ul className="text-muted-foreground space-y-1">
                        <li>• May reduce muscle soreness</li>
                        <li>• Can prevent muscle breakdown during fasted training</li>
                        <li>• May improve recovery</li>
                      </ul>
                    </div>
                    <div className="text-sm space-y-1">
                      <div className="font-medium">Recommended Use:</div>
                      <p className="text-muted-foreground">5-10g during workouts, especially during fasted training.</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Fish Oil</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="text-sm space-y-1">
                      <div className="font-medium">Components:</div>
                      <ul className="text-muted-foreground space-y-1">
                        <li>• EPA (anti-inflammatory)</li>
                        <li>• DHA (brain health, cell function)</li>
                      </ul>
                    </div>
                    <div className="text-sm space-y-1">
                      <div className="font-medium">Benefits:</div>
                      <ul className="text-muted-foreground space-y-1">
                        <li>• Reduces inflammation</li>
                        <li>• Supports joint health</li>
                        <li>• Improves recovery</li>
                        <li>• Heart and brain health</li>
                      </ul>
                    </div>
                    <div className="text-sm space-y-1">
                      <div className="font-medium">Recommended Use:</div>
                      <p className="text-muted-foreground">1-3g combined EPA and DHA daily with meals.</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Vitamin D</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="text-sm space-y-1">
                      <div className="font-medium">Forms:</div>
                      <ul className="text-muted-foreground space-y-1">
                        <li>• Vitamin D3 (cholecalciferol)</li>
                        <li>• Vitamin D2 (ergocalciferol)</li>
                      </ul>
                    </div>
                    <div className="text-sm space-y-1">
                      <div className="font-medium">Benefits:</div>
                      <ul className="text-muted-foreground space-y-1">
                        <li>• Bone health</li>
                        <li>• Immune function</li>
                        <li>• Hormone regulation</li>
                        <li>• May improve strength</li>
                      </ul>
                    </div>
                    <div className="text-sm space-y-1">
                      <div className="font-medium">Recommended Use:</div>
                      <p className="text-muted-foreground">1,000-5,000 IU daily, ideally with fatty meals for better absorption.</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="p-4 bg-muted rounded-md text-sm">
                <div className="font-medium mb-2">Important Notes on Supplements:</div>
                <ul className="text-muted-foreground space-y-1">
                  <li>• Supplements are not regulated by the FDA like drugs; quality can vary</li>
                  <li>• Look for third-party tested products (NSF, Informed Choice, USP)</li>
                  <li>• Always consult a healthcare professional before starting any supplement</li>
                  <li>• Supplements should complement a balanced diet, not replace it</li>
                  <li>• Individual responses to supplements vary based on genetics, diet, training, etc.</li>
                  <li>• More is not always better - follow recommended dosages</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NutritionGuide;
