
import { useState } from "react";
import { Frown, Meh, Smile, Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function MedicineRatingForm() {
  const [rating, setRating] = useState<number | null>(null);
  const [review, setReview] = useState("");
  const [condition, setCondition] = useState("");
  const [duration, setDuration] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit logic here
    console.log({ rating, review, condition, duration });
    
    // Reset form
    setRating(null);
    setReview("");
    setCondition("");
    setDuration("");
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Share Your Experience</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>How would you rate this medicine?</Label>
            <div className="flex justify-center gap-6 py-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <Button
                  key={value}
                  type="button"
                  variant="ghost"
                  className={`rounded-full h-12 w-12 ${
                    rating === value ? 'bg-primary/10 text-primary' : ''
                  }`}
                  onClick={() => setRating(value)}
                >
                  {value <= 2 ? (
                    <Frown className={`h-6 w-6 ${rating === value ? 'text-primary' : ''}`} />
                  ) : value === 3 ? (
                    <Meh className={`h-6 w-6 ${rating === value ? 'text-primary' : ''}`} />
                  ) : (
                    <Smile className={`h-6 w-6 ${rating === value ? 'text-primary' : ''}`} />
                  )}
                </Button>
              ))}
            </div>
            <div className="flex justify-center text-sm text-muted-foreground">
              {rating ? (
                rating <= 2 
                  ? "Not effective" 
                  : rating === 3 
                    ? "Moderately effective" 
                    : "Very effective"
              ) : "Select a rating"}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="condition">Condition Treated</Label>
              <Select
                value={condition}
                onValueChange={setCondition}
              >
                <SelectTrigger id="condition">
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pain">Pain</SelectItem>
                  <SelectItem value="fever">Fever</SelectItem>
                  <SelectItem value="allergy">Allergy</SelectItem>
                  <SelectItem value="infection">Infection</SelectItem>
                  <SelectItem value="hypertension">Hypertension</SelectItem>
                  <SelectItem value="diabetes">Diabetes</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="duration">How Long Used</Label>
              <Select
                value={duration}
                onValueChange={setDuration}
              >
                <SelectTrigger id="duration">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="less-than-week">Less than a week</SelectItem>
                  <SelectItem value="1-4-weeks">1-4 weeks</SelectItem>
                  <SelectItem value="1-6-months">1-6 months</SelectItem>
                  <SelectItem value="6-12-months">6-12 months</SelectItem>
                  <SelectItem value="over-1-year">Over 1 year</SelectItem>
                  <SelectItem value="over-5-years">Over 5 years</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="review">Your Review</Label>
            <Textarea
              id="review"
              placeholder="Share your experience with this medicine..."
              className="min-h-[100px]"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
          </div>
        </CardContent>
        
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full gap-2"
            disabled={!rating || !review}
          >
            <Send className="h-4 w-4" />
            Submit Review
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
