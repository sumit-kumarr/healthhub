
import { Calendar, Clock, Users, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface ExpertSessionProps {
  expert: {
    name: string;
    title: string;
    avatar: string;
    specialty?: string;
  };
  topic: string;
  date: string;
  time: string;
  attendees: number;
  isFull?: boolean;
  isLive?: boolean;
  recording?: string;
}

export function ExpertSession({
  expert,
  topic,
  date,
  time,
  attendees,
  isFull = false,
  isLive = false,
  recording
}: ExpertSessionProps) {
  return (
    <Card className={isLive ? "border-primary" : ""}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={expert.avatar} alt={expert.name} />
              <AvatarFallback>{expert.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{expert.name}</CardTitle>
              <CardDescription>{expert.title}</CardDescription>
              {expert.specialty && (
                <Badge variant="outline" className="mt-1">
                  {expert.specialty}
                </Badge>
              )}
            </div>
          </div>
          {isLive && (
            <Badge className="bg-red-500 animate-pulse">
              LIVE NOW
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <h3 className="font-medium text-lg">{topic}</h3>
        
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{attendees} attendees</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {recording ? (
          <Button variant="outline" className="w-full gap-2">
            <ExternalLink className="h-4 w-4" />
            Watch Recording
          </Button>
        ) : isLive ? (
          <Button className="w-full">Join Session Now</Button>
        ) : isFull ? (
          <Button disabled className="w-full">Session Full</Button>
        ) : (
          <Button variant="outline" className="w-full">Reserve Spot</Button>
        )}
      </CardFooter>
    </Card>
  );
}
