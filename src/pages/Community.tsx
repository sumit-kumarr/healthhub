
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Users, 
  MessageSquare, 
  Heart, 
  Award, 
  Calendar, 
  Search,
  Plus,
  MessageCircle,
  Filter,
  Video
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/ui/section-header";
import { UserPost } from "@/components/community/UserPost";
import { ExpertSession } from "@/components/community/ExpertSession";
import { FitnessGroup } from "@/components/community/FitnessGroup";
import { Separator } from "@/components/ui/separator";
import CreatePostForm from "@/components/community/CreatePostForm";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const CommunityPage = () => {
  const [activeTab, setActiveTab] = useState("feed");
  const [showCreatePost, setShowCreatePost] = useState(false);
  const { toast } = useToast();
  
  // Sample posts data 
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: {
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1557296387-5358ad7997bb?auto=format&fit=crop&w=150&q=80",
        badge: "Fitness Coach"
      },
      content: "Just finished my morning run! 5K in 22 minutes - a new personal best. Who else is getting their cardio in today?",
      image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=800&q=80",
      likes: 34,
      comments: 8,
      time: "2 hours ago",
      tags: ["running", "cardio", "morningworkout"]
    },
    {
      id: 2,
      user: {
        name: "Michael Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      },
      content: "I've been following the Mediterranean diet for 3 weeks now and I'm feeling so much better. Anyone else tried it? Would love some recipe recommendations!",
      likes: 22,
      comments: 15,
      time: "5 hours ago",
      tags: ["mediterraneandiet", "nutrition", "healthyeating"]
    },
    {
      id: 3,
      user: {
        name: "Emma Wilson",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
        badge: "Nutritionist"
      },
      content: "Three key habits for better sleep: 1) Consistent sleep schedule 2) No screens 1 hour before bed 3) Keep your bedroom cool. What works for you?",
      likes: 56,
      comments: 23,
      time: "Yesterday",
      tags: ["sleep", "wellness", "healthhabits"]
    }
  ]);

  // Sample expert sessions data
  const expertSessions = [
    {
      expert: {
        name: "Dr. Lisa Rodriguez",
        title: "Cardiologist, MD",
        avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=150&q=80",
        specialty: "Heart Health",
      },
      topic: "Cardio Exercise & Heart Health: Myths vs Facts",
      date: "Today",
      time: "7:00 PM - 8:00 PM EST",
      attendees: 156,
      isLive: true
    },
    {
      expert: {
        name: "Jake Williams",
        title: "Certified Personal Trainer",
        avatar: "https://images.unsplash.com/photo-1506919258185-6078bba55d2a?auto=format&fit=crop&w=150&q=80",
        specialty: "Strength Training",
      },
      topic: "Building Muscle: The Right Way to Lift",
      date: "Aug 23, 2023",
      time: "6:30 PM - 7:30 PM EST",
      attendees: 89
    },
    {
      expert: {
        name: "Dr. Maya Patel",
        title: "Nutritionist, PhD",
        avatar: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=150&q=80",
        specialty: "Plant-Based Nutrition",
      },
      topic: "Plant-Based Proteins: Complete Nutrition Guide",
      date: "Aug 15, 2023",
      time: "5:00 PM - 6:00 PM EST",
      attendees: 205,
      recording: "#"
    }
  ];

  // Sample groups data
  const groups = [
    {
      name: "Weight Loss Support",
      description: "A supportive community for those on a weight loss journey. Share tips, celebrate victories, and stay motivated together.",
      memberCount: 1250,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=150&q=80",
      tags: ["WeightLoss", "Support", "Motivation"],
      isJoined: true
    },
    {
      name: "Runners Club",
      description: "For beginners and seasoned runners alike. Training plans, race information, and running buddies.",
      memberCount: 876,
      image: "https://images.unsplash.com/photo-1486218119243-13883505764c?auto=format&fit=crop&w=150&q=80",
      tags: ["Running", "Training", "Races"],
      isJoined: false
    },
    {
      name: "Vegetarian Recipes",
      description: "Exchange delicious and nutritious vegetarian recipes, cooking tips, and meal planning ideas.",
      memberCount: 943,
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=150&q=80",
      tags: ["Vegetarian", "Recipes", "Cooking"],
      isJoined: false
    },
    {
      name: "Yoga & Mindfulness",
      description: "Connect with others interested in yoga, meditation, and mindful living practices for overall wellbeing.",
      memberCount: 1105,
      image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&w=150&q=80",
      tags: ["Yoga", "Meditation", "Mindfulness"],
      isJoined: false
    }
  ];

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

  const handlePostCreated = () => {
    // In a real app, we would fetch the updated posts from the database
    // For now, we'll just close the create post form and refresh the UI
    setShowCreatePost(false);
    toast({
      title: "Post published!",
      description: "Your post is now visible to the community",
    });
  };

  const handlePostShare = (postId: number) => {
    toast({
      title: "Post shared",
      description: "Post has been shared successfully",
    });
  };

  const handlePostLike = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.likes + 1
        };
      }
      return post;
    }));
  };

  const handlePostComment = (postId: number, comment: string) => {
    if (!comment.trim()) return;
    
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments + 1
        };
      }
      return post;
    }));
    
    toast({
      title: "Comment added",
      description: "Your comment has been added to the post",
    });
  };

  return (
    <div className="container px-4 py-8">
      <SectionHeader
        title="Community"
        description="Connect with others, join groups, and participate in challenges"
        align="left"
      />
      
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search posts, events, or members..." 
                className="pl-9"
              />
            </div>
            
            <div className="flex gap-2">
              <Dialog open={showCreatePost} onOpenChange={setShowCreatePost}>
                <DialogTrigger asChild>
                  <Button className="gap-2 flex-1 md:flex-none">
                    <Plus className="h-4 w-4" />
                    New Post
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[550px] p-0">
                  <CreatePostForm onPostCreated={handlePostCreated} />
                </DialogContent>
              </Dialog>
              
              <Button variant="outline" className="gap-2 md:hidden">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <Tabs 
            defaultValue="feed" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="feed">Feed</TabsTrigger>
              <TabsTrigger value="experts">Expert Q&A</TabsTrigger>
              <TabsTrigger value="groups">Groups</TabsTrigger>
            </TabsList>
            
            <TabsContent value="feed" className="space-y-4 animate-fade-in">
              <CreatePostForm onPostCreated={handlePostCreated} />
              
              {posts.map((post, i) => (
                <UserPost 
                  key={i} 
                  {...post} 
                  onLike={() => handlePostLike(post.id)}
                  onComment={(comment) => handlePostComment(post.id, comment)}
                  onShare={() => handlePostShare(post.id)}
                />
              ))}
              
              <Button variant="outline" className="w-full">
                Load More
              </Button>
            </TabsContent>
            
            <TabsContent value="experts" className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-medium">Expert Q&A Sessions</h2>
                <Button variant="outline" size="sm" className="gap-1">
                  <Calendar className="h-4 w-4" />
                  View Schedule
                </Button>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2">
                {expertSessions.map((session, i) => (
                  <ExpertSession key={i} {...session} />
                ))}
              </div>
              
              <Card className="p-4 bg-muted/50 border-dashed">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Video className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Have an expert topic suggestion?</h3>
                    <p className="text-sm text-muted-foreground">
                      Let us know what health or fitness topics you'd like to learn more about.
                    </p>
                  </div>
                  <Button size="sm">Suggest Topic</Button>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="groups" className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-medium">Fitness Groups</h2>
                <Button variant="outline" size="sm" className="gap-1">
                  <Plus className="h-4 w-4" />
                  Create Group
                </Button>
              </div>
              
              <div className="space-y-4">
                {groups.map((group, i) => (
                  <FitnessGroup key={i} {...group} />
                ))}
              </div>
              
              <Button variant="outline" className="w-full">
                Browse All Groups
              </Button>
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
      </div>
    </div>
  );
};

export default CommunityPage;
