
import { Users, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface FitnessGroupProps {
  name: string;
  description: string;
  memberCount: number;
  image: string;
  tags: string[];
  isJoined?: boolean;
  onJoin?: () => void;
}

export function FitnessGroup({ 
  name, 
  description, 
  memberCount, 
  image,
  tags,
  isJoined = false,
  onJoin 
}: FitnessGroupProps) {
  return (
    <Card className="flex overflow-hidden">
      <div className="h-auto w-24 md:w-32 overflow-hidden bg-muted">
        <img 
          src={image} 
          alt={name} 
          className="h-full w-full object-cover"
        />
      </div>
      <CardContent className="flex-1 p-4">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-medium text-base md:text-lg">{name}</h3>
              {isJoined && (
                <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/30">
                  Joined
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
            
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
              <Users className="h-3 w-3" />
              <span>{memberCount} members</span>
            </div>
            
            <div className="flex flex-wrap gap-1 mt-2">
              {tags.map((tag, i) => (
                <Badge key={i} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col justify-between gap-2">
            {isJoined ? (
              <Button variant="outline" size="sm" className="whitespace-nowrap gap-1">
                <span>View Group</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button 
                size="sm" 
                className="whitespace-nowrap"
                onClick={onJoin}
              >
                Join Group
              </Button>
            )}
            
            <div className="flex -space-x-2">
              {[1, 2, 3].map((num) => (
                <Avatar key={num} className="h-6 w-6 border-2 border-background">
                  <AvatarImage src={`https://i.pravatar.cc/50?img=${num + 10}`} />
                  <AvatarFallback>U{num}</AvatarFallback>
                </Avatar>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
