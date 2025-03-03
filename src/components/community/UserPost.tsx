
import { useState } from "react";
import { Heart, MessageCircle, Share2, Flag, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserPostProps {
  user: {
    name: string;
    avatar: string;
    badge?: string;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  time: string;
  tags?: string[];
}

export function UserPost({ 
  user, 
  content, 
  image, 
  likes, 
  comments, 
  time,
  tags = []
}: UserPostProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  
  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };
  
  return (
    <Card className="overflow-hidden">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium">{user.name}</span>
                {user.badge && (
                  <Badge variant="outline" className="text-xs font-normal">
                    {user.badge}
                  </Badge>
                )}
              </div>
              <div className="text-xs text-muted-foreground">{time}</div>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Save Post</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <Flag className="h-4 w-4 mr-2" />
                Report Post
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="mt-3">
          <p className="text-sm whitespace-pre-line">{content}</p>
          
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {tags.map((tag, i) => (
                <Badge key={i} variant="secondary" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {image && (
        <div className="relative aspect-video">
          <img 
            src={image} 
            alt="Post" 
            className="w-full object-cover max-h-96" 
          />
        </div>
      )}
      
      <CardFooter className="flex justify-between p-4 pt-2 border-t">
        <Button 
          variant="ghost" 
          size="sm" 
          className={`gap-1 ${liked ? 'text-red-500' : ''}`}
          onClick={handleLike}
        >
          <Heart className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
          <span>{likeCount}</span>
        </Button>
        <Button variant="ghost" size="sm" className="gap-1">
          <MessageCircle className="h-4 w-4" />
          <span>{comments}</span>
        </Button>
        <Button variant="ghost" size="sm" className="gap-1">
          <Share2 className="h-4 w-4" />
          <span>Share</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
