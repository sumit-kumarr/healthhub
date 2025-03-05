
import React from "react";

interface MealProps {
  title: string;
  calories: number;
  proteins: number;
  carbs: number;
  fats: number;
  time: string;
  image: string;
}

const MealItem = ({ title, calories, proteins, carbs, fats, time, image }: MealProps) => (
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

export default MealItem;
