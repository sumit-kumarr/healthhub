import { useState } from "react";
import { Filter, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserPost } from "@/components/community/UserPost";
import CreatePostForm, { NewPostData } from "@/components/community/CreatePostForm";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/auth";

export function CommunityFeed() {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  
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

  const handlePostCreated = (newPost: NewPostData) => {
    setPosts([
      {
        id: posts.length + 1,
        user: {
          name: user?.user_metadata?.full_name || user?.email?.split('@')[0] || "Anonymous",
          avatar: user?.user_metadata?.avatar_url || "",
        },
        content: newPost.content,
        image: newPost.imageUrl || null,
        likes: 0,
        comments: 0,
        time: "Just now",
        tags: newPost.tags || []
      },
      ...posts
    ]);
    
    setShowCreatePost(false);
    toast({
      title: "Post published!",
      description: "Your post is now visible to the community",
    });
  };

  const handlePostShare = (postId) => {
    toast({
      title: "Post shared",
      description: "Post has been shared successfully",
    });
  };

  const handlePostLike = (postId) => {
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

  const handlePostComment = (postId, comment) => {
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
    <div className="space-y-6">
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
              <DialogTitle className="sr-only">Create New Post</DialogTitle>
              <DialogDescription className="sr-only">Share your thoughts with the community</DialogDescription>
              <CreatePostForm onPostCreated={handlePostCreated} />
            </DialogContent>
          </Dialog>
          
          <Button variant="outline" className="gap-2 md:hidden">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
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
    </div>
  );
}
