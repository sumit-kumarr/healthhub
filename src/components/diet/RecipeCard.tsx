
import React, { useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Clock, Flame, UtensilsCrossed, Users } from "lucide-react";

interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  prepTime: string;
  cookTime: string;
  calories: number;
  servings: number;
  difficulty: string;
  tags: string[];
  ingredients: string[];
  instructions: string[];
}

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="h-48 overflow-hidden">
        <img 
          src={recipe.image} 
          alt={recipe.title}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{recipe.title}</CardTitle>
            <CardDescription className="line-clamp-2">{recipe.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow">
        <div className="flex flex-wrap gap-2 mb-3">
          {recipe.tags.slice(0, 3).map((tag, i) => (
            <Badge key={i} variant="secondary" className="text-xs">{tag}</Badge>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>{recipe.prepTime} prep</span>
          </div>
          <div className="flex items-center gap-1">
            <UtensilsCrossed className="h-3.5 w-3.5" />
            <span>{recipe.cookTime} cook</span>
          </div>
          <div className="flex items-center gap-1">
            <Flame className="h-3.5 w-3.5" />
            <span>{recipe.calories} cal</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            <span>Serves {recipe.servings}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">View Recipe</Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{recipe.title}</DialogTitle>
              <DialogDescription>{recipe.description}</DialogDescription>
            </DialogHeader>
            <div className="grid md:grid-cols-2 gap-6 py-4">
              <div>
                <img 
                  src={recipe.image} 
                  alt={recipe.title}
                  className="w-full rounded-md h-60 object-cover mb-4"
                />
                <div className="flex flex-wrap gap-2 mb-4">
                  {recipe.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary">{tag}</Badge>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                  <div className="flex flex-col items-center p-2 rounded-md bg-muted">
                    <Clock className="h-5 w-5 mb-1 text-muted-foreground" />
                    <span className="font-medium">{recipe.prepTime}</span>
                    <span className="text-xs text-muted-foreground">Prep Time</span>
                  </div>
                  <div className="flex flex-col items-center p-2 rounded-md bg-muted">
                    <UtensilsCrossed className="h-5 w-5 mb-1 text-muted-foreground" />
                    <span className="font-medium">{recipe.cookTime}</span>
                    <span className="text-xs text-muted-foreground">Cook Time</span>
                  </div>
                  <div className="flex flex-col items-center p-2 rounded-md bg-muted">
                    <Flame className="h-5 w-5 mb-1 text-muted-foreground" />
                    <span className="font-medium">{recipe.calories}</span>
                    <span className="text-xs text-muted-foreground">Calories</span>
                  </div>
                  <div className="flex flex-col items-center p-2 rounded-md bg-muted">
                    <Users className="h-5 w-5 mb-1 text-muted-foreground" />
                    <span className="font-medium">{recipe.servings}</span>
                    <span className="text-xs text-muted-foreground">Servings</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Ingredients</h4>
                  <ul className="space-y-1 text-sm">
                    {recipe.ingredients.map((ingredient, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="block rounded-full bg-primary/10 w-5 h-5 flex-shrink-0 flex items-center justify-center text-primary text-xs">✓</span>
                        <span>{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-3">Instructions</h4>
                <ol className="space-y-4 text-sm">
                  {recipe.instructions.map((instruction, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="flex-shrink-0 inline-flex items-center justify-center rounded-full bg-primary w-6 h-6 text-primary-foreground text-xs font-medium">
                        {i + 1}
                      </span>
                      <p>{instruction}</p>
                    </li>
                  ))}
                </ol>
                <div className="border-t mt-6 pt-6">
                  <h4 className="font-medium mb-2">Nutrition Tips</h4>
                  <p className="text-sm text-muted-foreground">
                    This recipe is {recipe.tags.includes("High-Protein") ? "high in protein, " : ""}
                    {recipe.tags.includes("Low-Carb") ? "low in carbohydrates, " : ""}
                    and contains essential nutrients for a balanced diet. 
                    {recipe.calories < 300 ? " It's a great low-calorie option." : ""}
                  </p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant={isSaved ? "outline" : "default"} 
                onClick={() => setIsSaved(!isSaved)}
              >
                {isSaved ? "Saved to Favorites" : "Save to Favorites"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Button 
          variant="ghost" 
          size="sm" 
          className={isSaved ? "text-primary" : "text-muted-foreground"}
          onClick={() => setIsSaved(!isSaved)}
        >
          {isSaved ? "Saved" : "Save"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecipeCard;
