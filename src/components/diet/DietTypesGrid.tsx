
import React from "react";
import { Salad, Carrot, Apple, Beef, Fish, LucideIcon } from "lucide-react";

interface DietTypeProps {
  icon: LucideIcon;
  name: string;
  description: string;
}

const dietTypes: DietTypeProps[] = [
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

const DietTypesGrid = () => {
  return (
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
  );
};

export default DietTypesGrid;
