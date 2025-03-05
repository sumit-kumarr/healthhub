
import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface DietPlan {
  name: string;
  description: string;
  benefits: string;
  foods: string[];
}

const dietPlans: DietPlan[] = [
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

const DietPlansGrid = () => {
  return (
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
  );
};

export default DietPlansGrid;
