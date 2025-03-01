
import { useState } from "react";
import { 
  Users, 
  MessageSquare, 
  Heart, 
  Award, 
  Calendar, 
  Search,
  Plus,
  Share2,
  ThumbsUp,
  MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/ui/section-header";

interface PostProps {
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
}

const Post = ({ user, content, image, likes, comments, time }: PostProps) => (
  <Card className="p-4 space-y-4">
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarImage src={user.avatar} />
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
    
    <div>
      <p className="text-sm">{content}</p>
      {image && (
        <img 
          src={image} 
          alt="Post" 
          className="mt-3 rounded-lg w-full object-cover max-h-72" 
        />
      )}
    </div>
    
    <div className="flex justify-between pt-2 border-t">
      <Button variant="ghost" size="sm" className="gap-1">
        <ThumbsUp className="h-4 w-4" />
        <span>{likes}</span>
      </Button>
      <Button variant="ghost" size="sm" className="gap-1">
        <MessageCircle className="h-4 w-4" />
        <span>{comments}</span>
      </Button>
      <Button variant="ghost" size="sm">
        <Share2 className="h-4 w-4" />
      </Button>
    </div>
  </Card>
);

interface EventProps {
  title: string;
  date: string;
  location: string;
  attendees: number;
  image: string;
}

const Event = ({ title, date, location, attendees, image }: EventProps) => (
  <Card className="overflow-hidden">
    <img 
      src={image} 
      alt={title} 
      className="w-full h-40 object-cover" 
    />
    <div className="p-4">
      <h3 className="font-medium mb-1">{title}</h3>
      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
        <Calendar className="h-4 w-4" />
        <span>{date}</span>
      </div>
      <p className="text-sm text-muted-foreground mb-4">{location}</p>
      <div className="flex justify-between items-center">
        <span className="text-xs text-muted-foreground">{attendees} attending</span>
        <Button size="sm">Join</Button>
      </div>
    </div>
  </Card>
);

const CommunityPage = () => {
  const posts: PostProps[] = [
    {
      user: {
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1557296387-5358ad7997bb?auto=format&fit=crop&w=150&q=80",
        badge: "Fitness Coach"
      },
      content: "Just finished my morning run! 5K in 22 minutes - a new personal best. Who else is getting their cardio in today?",
      image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=800&q=80",
      likes: 34,
      comments: 8,
      time: "2 hours ago"
    },
    {
      user: {
        name: "Michael Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      },
      content: "I've been following the Mediterranean diet for 3 weeks now and I'm feeling so much better. Anyone else tried it? Would love some recipe recommendations!",
      likes: 22,
      comments: 15,
      time: "5 hours ago"
    },
    {
      user: {
        name: "Emma Wilson",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
        badge: "Nutritionist"
      },
      content: "Three key habits for better sleep: 1) Consistent sleep schedule 2) No screens 1 hour before bed 3) Keep your bedroom cool. What works for you?",
      likes: 56,
      comments: 23,
      time: "Yesterday"
    }
  ];

  const events: EventProps[] = [
    {
      title: "Community 5K Run",
      date: "Aug 15, 2023 • 8:00 AM",
      location: "Central Park, New York",
      attendees: 45,
      image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Yoga in the Park",
      date: "Aug 20, 2023 • 9:00 AM",
      location: "Riverside Park, New York",
      attendees: 32,
      image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Nutrition Workshop",
      date: "Aug 25, 2023 • 6:00 PM",
      location: "Health Center, Brooklyn",
      attendees: 18,
      image: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const groups = [
    {
      name: "Weight Loss Support",
      members: 1250,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Runners Club",
      members: 876,
      image: "https://images.unsplash.com/photo-1486218119243-13883505764c?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Vegetarian Recipes",
      members: 943,
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=150&q=80"
    }
  ];

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
    <div className="container px-4 py-8">
      <SectionHeader
        title="Community"
        description="Connect with others, join groups, and participate in challenges"
        align="left"
      />
      
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search posts, events, or members..." 
                className="pl-9"
              />
            </div>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Post
            </Button>
          </div>
          
          <Tabs defaultValue="feed" className="space-y-6">
            <TabsList>
              <TabsTrigger value="feed">Feed</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="groups">Groups</TabsTrigger>
            </TabsList>
            
            <TabsContent value="feed" className="space-y-4 animate-fade-in">
              {posts.map((post, i) => (
                <Post key={i} {...post} />
              ))}
              
              <Button variant="outline" className="w-full">
                Load More
              </Button>
            </TabsContent>
            
            <TabsContent value="events" className="animate-fade-in">
              <div className="grid gap-4 sm:grid-cols-2">
                {events.map((event, i) => (
                  <Event key={i} {...event} />
                ))}
              </div>
              
              <Button variant="outline" className="w-full mt-6">
                View All Events
              </Button>
            </TabsContent>
            
            <TabsContent value="groups" className="animate-fade-in">
              <div className="space-y-4">
                {groups.map((group, i) => (
                  <Card key={i} className="flex items-center p-4 gap-4">
                    <img
                      src={group.image}
                      alt={group.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{group.name}</h3>
                      <p className="text-sm text-muted-foreground">{group.members} members</p>
                    </div>
                    <Button>Join</Button>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
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
            
            <Button variant="outline" className="w-full mt-4">
              Find Challenges
            </Button>
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
                  <Heart className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  <p className="text-sm group-hover:text-primary transition-colors">{topic}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
