
import React from "react";
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
} from "@/components/ui/dialog";
import { ThumbsUp, Heart, Utensils } from "lucide-react";

interface FoodCardProps {
  name: string;
  category: string;
  image: string;
  benefits: string;
  calories: number;
}

const FoodCard = ({ name, category, image, benefits, calories }: FoodCardProps) => {
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

export default FoodCard;
