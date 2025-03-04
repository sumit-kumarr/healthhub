
import { useState, ChangeEvent } from "react";
import { Image, Link2, Smile, Camera, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/auth";

// Define a proper type for the post data
export interface NewPostData {
  content: string;
  imageUrl?: string | null;
  tags?: string[];
}

interface CreatePostFormProps {
  onPostCreated: (newPost: NewPostData) => void;
}

const CreatePostForm = ({ onPostCreated }: CreatePostFormProps) => {
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleTagInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput) {
      e.preventDefault();
      addTag();
    }
  };

  const addTag = () => {
    if (tagInput && !tags.includes(tagInput.toLowerCase())) {
      if (tags.length < 5) {
        setTags([...tags, tagInput.toLowerCase()]);
        setTagInput("");
      } else {
        toast({
          title: "Tag limit reached",
          description: "You can only add up to 5 tags per post",
        });
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = () => {
    if (!content.trim()) {
      toast({
        title: "Post content is required",
        description: "Please write something for your post",
        variant: "destructive",
      });
      return;
    }

    // Create the new post object with properly typed data
    const newPost: NewPostData = {
      content: content.trim(),
      imageUrl: imagePreview,
      tags: tags.length > 0 ? tags : undefined
    };
    
    // Call the callback with the new post data
    onPostCreated(newPost);
    
    // Reset the form
    setContent("");
    setTags([]);
    setTagInput("");
    setImage(null);
    setImagePreview(null);
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-4 pt-4">
        <div className="flex gap-3 mb-3">
          <Avatar>
            <AvatarImage src={user?.user_metadata?.avatar_url || ""} />
            <AvatarFallback>
              {user?.email ? user.email.charAt(0).toUpperCase() : "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-medium">
              {user?.user_metadata?.full_name || user?.email || "You"}
            </h3>
            <p className="text-xs text-muted-foreground">Share your thoughts with the community</p>
          </div>
        </div>
        
        <Textarea
          placeholder="What's on your mind?"
          className="min-h-[120px] mb-3"
          value={content}
          onChange={handleContentChange}
        />
        
        {imagePreview && (
          <div className="relative mb-3">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-background/80 rounded-full h-8 w-8"
              onClick={removeImage}
            >
              <X className="h-4 w-4" />
            </Button>
            <img 
              src={imagePreview} 
              alt="Post preview" 
              className="max-h-[300px] w-full object-cover rounded-md"
            />
          </div>
        )}
        
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {tags.map(tag => (
              <Badge key={tag} variant="secondary" className="gap-1.5">
                #{tag}
                <X 
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => removeTag(tag)}
                />
              </Badge>
            ))}
          </div>
        )}
        
        <div className="flex items-center gap-2 border rounded-md p-2">
          <input
            type="text"
            placeholder="Add tags..."
            className="flex-1 bg-transparent border-none outline-none text-sm"
            value={tagInput}
            onChange={handleTagInputChange}
            onKeyDown={handleTagInputKeyDown}
          />
          <Button variant="ghost" size="sm" onClick={addTag} disabled={!tagInput}>
            Add
          </Button>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="gap-1.5" asChild>
            <label>
              <Camera className="h-4 w-4" />
              <span>Photo</span>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          </Button>
          
          <Button variant="ghost" size="sm" className="gap-1.5">
            <Link2 className="h-4 w-4" />
            <span>Link</span>
          </Button>
        </div>
        
        <Button className="gap-1.5" onClick={handleSubmit}>
          <Send className="h-4 w-4" />
          <span>Post</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CreatePostForm;
