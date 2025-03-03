
import { useState } from "react";
import { Star, MessageCircle, ThumbsUp, Flag } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface MedicineReviewProps {
  user: {
    name: string;
    avatar?: string;
    verified?: boolean;
  };
  rating: number;
  date: string;
  content: string;
  helpfulCount: number;
  condition?: string;
  duration?: string;
}

export function MedicineReview({
  user,
  rating,
  date,
  content,
  helpfulCount,
  condition,
  duration
}: MedicineReviewProps) {
  const [isHelpful, setIsHelpful] = useState(false);
  const [helpfulCounter, setHelpfulCounter] = useState(helpfulCount);
  
  const handleHelpful = () => {
    if (isHelpful) {
      setHelpfulCounter(helpfulCounter - 1);
    } else {
      setHelpfulCounter(helpfulCounter + 1);
    }
    setIsHelpful(!isHelpful);
  };
  
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-medium">{user.name}</span>
                {user.verified && (
                  <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                    Verified
                  </Badge>
                )}
              </div>
              <div className="text-xs text-muted-foreground">{date}</div>
            </div>
          </div>
          
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-muted'}`}
              />
            ))}
          </div>
        </div>
        
        {(condition || duration) && (
          <div className="flex gap-4 mt-3 text-xs">
            {condition && (
              <div className="bg-muted px-2 py-1 rounded">
                <span className="text-muted-foreground">Condition: </span>
                <span className="font-medium">{condition}</span>
              </div>
            )}
            {duration && (
              <div className="bg-muted px-2 py-1 rounded">
                <span className="text-muted-foreground">Taking for: </span>
                <span className="font-medium">{duration}</span>
              </div>
            )}
          </div>
        )}
        
        <p className="mt-3 text-sm">{content}</p>
      </CardContent>
      
      <Separator />
      
      <CardFooter className="flex justify-between py-3">
        <Button
          variant="ghost"
          size="sm"
          className={`gap-2 ${isHelpful ? 'text-primary' : ''}`}
          onClick={handleHelpful}
        >
          <ThumbsUp className="h-4 w-4" />
          <span>Helpful ({helpfulCounter})</span>
        </Button>
        
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="gap-2">
            <MessageCircle className="h-4 w-4" />
            <span>Comment</span>
          </Button>
          <Button variant="ghost" size="sm" className="gap-2">
            <Flag className="h-4 w-4" />
            <span>Report</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
