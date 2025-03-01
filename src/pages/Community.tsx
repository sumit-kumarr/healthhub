
import { 
  Users, 
  MessageSquare, 
  Trophy, 
  Share2, 
  Heart, 
  Clock, 
  ThumbsUp 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { SectionHeader } from "@/components/ui/section-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FeatureCard } from "@/components/ui/feature-card";

const CommunityPost = ({ 
  author, 
  avatar, 
  time, 
  content, 
  likes, 
  comments, 
  image 
}: { 
  author: string;
  avatar: string;
  time: string;
  content: string;
  likes: number;
  comments: number;
  image?: string;
}) => {
  return (
    <div className="border rounded-lg p-4 mb-4">
      <div className="flex items-center mb-3">
        <Avatar className="h-10 w-10 mr-3">
          <img src={avatar} alt={author} className="rounded-full object-cover" />
        </Avatar>
        <div>
          <h3 className="font-medium">{author}</h3>
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="h-3 w-3 mr-1" />
            <span>{time}</span>
          </div>
        </div>
      </div>
      
      <p className="mb-3">{content}</p>
      
      {image && (
        <img 
          src={image} 
          alt="Post attachment" 
          className="rounded-lg mb-3 max-h-64 w-full object-cover" 
        />
      )}
      
      <div className="flex justify-between items-center pt-2 border-t">
        <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground">
          <ThumbsUp className="h-4 w-4" /> {likes}
        </Button>
        <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground">
          <MessageSquare className="h-4 w-4" /> {comments}
        </Button>
        <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground">
          <Share2 className="h-4 w-4" /> Share
        </Button>
      </div>
    </div>
  );
};

const GroupCard = ({ 
  name, 
  description, 
  members, 
  image 
}: { 
  name: string;
  description: string;
  members: number;
  image: string;
}) => {
  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
      <img 
        src={image} 
        alt={name} 
        className="h-32 w-full object-cover" 
      />
      <div className="p-4">
        <h3 className="font-medium mb-1">{name}</h3>
        <p className="text-sm text-muted-foreground mb-3">{description}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="h-4 w-4 mr-1" />
            <span>{members} members</span>
          </div>
          <Button size="sm">Join</Button>
        </div>
      </div>
    </div>
  );
};

const ChallengeCard = ({ 
  title, 
  description, 
  participants, 
  daysLeft, 
  image 
}: { 
  title: string;
  description: string;
  participants: number;
  daysLeft: number;
  image: string;
}) => {
  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
      <div className="relative">
        <img 
          src={image} 
          alt={title} 
          className="h-32 w-full object-cover" 
        />
        <div className="absolute bottom-0 right-0 bg-primary text-primary-foreground px-2 py-1 text-xs font-medium">
          {daysLeft} days left
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-medium mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground mb-3">{description}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="h-4 w-4 mr-1" />
            <span>{participants} participants</span>
          </div>
          <Button size="sm">Join Challenge</Button>
        </div>
      </div>
    </div>
  );
};

const CommunityPage = () => {
  const communityFeatures = [
    {
      title: "Join Wellness Groups",
      description: "Connect with people sharing similar health goals and challenges.",
      icon: Users,
    },
    {
      title: "Health Challenges",
      description: "Participate in monthly challenges to develop healthy habits.",
      icon: Trophy,
    },
    {
      title: "Share Your Journey",
      description: "Document and share your health progress with the community.",
      icon: Share2,
    },
    {
      title: "Get Expert Advice",
      description: "Learn from certified health professionals and coaches.",
      icon: MessageSquare,
    },
  ];

  const posts = [
    {
      author: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=64&auto=format&fit=crop",
      time: "2 hours ago",
      content: "Just completed my first 5K run! It's been a long journey from barely being able to run for 5 minutes to finishing a full 5K. So grateful for all the support from this community!",
      image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=500&auto=format&fit=crop",
      likes: 42,
      comments: 8,
    },
    {
      author: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=64&auto=format&fit=crop",
      time: "Yesterday",
      content: "Today I learned that walking 10,000 steps a day can significantly reduce the risk of heart disease. I've been tracking my steps for a month now and I'm averaging 8,500. Almost there!",
      likes: 28,
      comments: 5,
    },
    {
      author: "Emily Rodriguez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=64&auto=format&fit=crop",
      time: "3 days ago",
      content: "My favorite healthy breakfast recipe: Greek yogurt with berries, honey, and a sprinkle of granola. Quick, delicious, and packed with protein!",
      image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?q=80&w=500&auto=format&fit=crop",
      likes: 56,
      comments: 12,
    },
  ];

  const groups = [
    {
      name: "Marathon Runners",
      description: "From beginners to advanced runners preparing for marathons and races.",
      members: 1284,
      image: "https://images.unsplash.com/photo-1530137204511-5ae8e720a8ee?q=80&w=500&auto=format&fit=crop",
    },
    {
      name: "Plant-Based Nutrition",
      description: "Sharing tips, recipes and advice for plant-based diets.",
      members: 945,
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=500&auto=format&fit=crop",
    },
    {
      name: "Mindfulness & Meditation",
      description: "Learning to reduce stress and improve mental health through daily practice.",
      members: 756,
      image: "https://images.unsplash.com/photo-1474418397713-2f76dc3fe76a?q=80&w=500&auto=format&fit=crop",
    },
    {
      name: "Weight Management",
      description: "Supporting each other on weight loss or maintenance journeys.",
      members: 1842,
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=500&auto=format&fit=crop",
    },
  ];

  const challenges = [
    {
      title: "30-Day Yoga Challenge",
      description: "Complete at least 20 minutes of yoga every day for 30 days.",
      participants: 458,
      daysLeft: 18,
      image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=500&auto=format&fit=crop",
    },
    {
      title: "Sugar-Free Month",
      description: "Cut out added sugars from your diet for one month.",
      participants: 327,
      daysLeft: 25,
      image: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=500&auto=format&fit=crop",
    },
    {
      title: "Step Challenge",
      description: "Reach 10,000 steps daily for two weeks straight.",
      participants: 712,
      daysLeft: 7,
      image: "https://images.unsplash.com/photo-1461788714782-aa2d1ed0b3b2?q=80&w=500&auto=format&fit=crop",
    },
  ];

  return (
    <div className="container px-4 py-8">
      <SectionHeader
        title="Community"
        description="Connect, share, and learn with others on their health journey"
        align="left"
      />
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-10">
        {communityFeatures.map((feature, i) => (
          <FeatureCard
            key={i}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
          />
        ))}
      </div>
      
      <Tabs defaultValue="feed" className="mb-10">
        <TabsList>
          <TabsTrigger value="feed">Feed</TabsTrigger>
          <TabsTrigger value="groups">Groups</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
        </TabsList>
        
        <TabsContent value="feed" className="space-y-6 animate-fade-in">
          <div className="border rounded-lg p-4 mb-6">
            <Textarea placeholder="Share your health journey or ask a question..." className="mb-3" />
            <div className="flex justify-between items-center">
              <Button variant="outline" size="sm" className="gap-1">
                <Heart className="h-4 w-4" /> Photos
              </Button>
              <Button>Post</Button>
            </div>
          </div>
          
          {posts.map((post, i) => (
            <CommunityPost key={i} {...post} />
          ))}
          
          <Button variant="outline" className="w-full">Load More</Button>
        </TabsContent>
        
        <TabsContent value="groups" className="animate-fade-in">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Input placeholder="Search for groups..." className="max-w-md" />
              <Button>Search</Button>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {groups.map((group, i) => (
                <GroupCard key={i} {...group} />
              ))}
            </div>
          </div>
          
          <Button variant="outline" className="w-full">View All Groups</Button>
        </TabsContent>
        
        <TabsContent value="challenges" className="animate-fade-in">
          <div className="mb-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {challenges.map((challenge, i) => (
                <ChallengeCard key={i} {...challenge} />
              ))}
            </div>
          </div>
          
          <Button variant="outline" className="w-full">View All Challenges</Button>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommunityPage;
