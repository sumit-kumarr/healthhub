
import { Award, Heart, MessageCircle, MessageSquare, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export function CommunitySidebar() {
  // Sample challenges
  const challenges = [
    {
      title: "30-Day Core Challenge",
      participants: 234,
      progress: 40,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=150&q=80"
    },
    {
      title: "10K Steps Challenge",
      participants: 567,
      progress: 75,
      image: "https://images.unsplash.com/photo-1486218119243-13883505764c?auto=format&fit=crop&w=150&q=80"
    }
  ];
  
  return (
    <div className="space-y-6">
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Award className="h-5 w-5 text-primary" />
          <h3 className="font-medium">Active Challenges</h3>
        </div>
        
        <div className="space-y-4">
          {challenges.map((challenge, i) => (
            <div key={i} className="flex items-center gap-3">
              <img
                src={challenge.image}
                alt={challenge.title}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h4 className="text-sm font-medium">{challenge.title}</h4>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-muted-foreground">{challenge.participants} participants</span>
                  <span className="text-xs font-medium">{challenge.progress}% complete</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <Link to="/challenges">
          <Button variant="outline" className="w-full mt-4">
            View All Challenges
          </Button>
        </Link>
      </Card>
      
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Users className="h-5 w-5 text-primary" />
          <h3 className="font-medium">Suggested Connections</h3>
        </div>
        
        <div className="space-y-4">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={`https://i.pravatar.cc/150?img=${i + 10}`} />
                <AvatarFallback>U{i}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="text-sm font-medium">User {i + 1}</div>
                <div className="text-xs text-muted-foreground">12 mutual connections</div>
              </div>
              <Button variant="outline" size="sm">Connect</Button>
            </div>
          ))}
        </div>
      </Card>
      
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="h-5 w-5 text-primary" />
          <h3 className="font-medium">Recent Discussions</h3>
        </div>
        
        <div className="space-y-3">
          {["Healthy meal prep ideas for busy professionals", "Best apps for tracking workouts?", "Tips for staying motivated"].map((topic, i) => (
            <div key={i} className="group flex items-center gap-2 cursor-pointer">
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm group-hover:text-primary transition-colors">{topic}</p>
            </div>
          ))}
        </div>
        
        <Separator className="my-4" />
        
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-3">
            Share your health journey and connect with others
          </p>
          <Button variant="outline" size="sm" className="gap-1">
            <Heart className="h-4 w-4" />
            Community Guidelines
          </Button>
        </div>
      </Card>
    </div>
  );
}
