
import { useState, useEffect } from "react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { SectionHeader } from "@/components/ui/section-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, FileText, User, Mail, Shield } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ProfilePage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  
  useEffect(() => {
    const getProfile = async () => {
      try {
        setLoading(true);
        if (!user?.id) return;
        
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (error) {
          throw error;
        }
        
        if (data) {
          setProfile(data);
          setFormData({
            firstName: data.first_name || "",
            lastName: data.last_name || "",
            email: user.email || "",
          });
        }
      } catch (error: any) {
        console.error('Error fetching profile:', error);
        toast({
          title: "Error",
          description: error.message || "Failed to load profile",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    if (user) {
      getProfile();
    }
  }, [user, toast]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleUpdateProfile = async () => {
    try {
      setUpdating(true);
      
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: formData.firstName,
          last_name: formData.lastName,
        })
        .eq('id', user?.id);
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });
      
      // Update the profile state
      setProfile((prev: any) => ({
        ...prev,
        first_name: formData.firstName,
        last_name: formData.lastName,
      }));
      
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
    }
  };
  
  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <p>Loading profile...</p>
      </div>
    );
  }
  
  return (
    <div className="container px-4 py-8">
      <SectionHeader
        title="My Profile"
        description="View and manage your account information"
        align="left"
      />
      
      <div className="grid gap-6 md:grid-cols-3">
        <div>
          <Card>
            <CardHeader className="space-y-4">
              <div className="flex flex-col items-center">
                <Avatar className="h-20 w-20 mb-4">
                  <AvatarImage src={profile?.avatar_url} alt={formData.firstName} />
                  <AvatarFallback className="text-2xl">
                    {formData.firstName?.[0]}{formData.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h3 className="text-xl font-semibold">{formData.firstName} {formData.lastName}</h3>
                  <p className="text-sm text-muted-foreground">{formData.email}</p>
                </div>
              </div>
              
              <div className="flex justify-center">
                <Button className="w-full" variant="outline">
                  Change Photo
                </Button>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Mail className="h-4 w-4 mr-2" />
                  {formData.email}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  Account created: {new Date(profile?.created_at).toLocaleDateString()}
                </div>
                <div className="flex items-center text-sm">
                  <Shield className="h-4 w-4 mr-2" />
                  <Badge variant="outline" className="px-2 py-0">
                    Standard Plan
                  </Badge>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Tabs defaultValue="personal-info">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal-info">Personal Info</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal-info">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update your personal details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled
                    />
                    <p className="text-xs text-muted-foreground">
                      Your email cannot be changed. Contact support for assistance.
                    </p>
                  </div>
                  <Button 
                    onClick={handleUpdateProfile} 
                    disabled={updating}
                    className="mt-4"
                  >
                    {updating ? "Updating..." : "Update Profile"}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Your recent actions and activities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg divide-y">
                      <div className="p-4 flex items-start gap-4">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <p className="font-medium">Profile Updated</p>
                            <span className="text-xs text-muted-foreground">Today</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            You updated your profile information
                          </p>
                        </div>
                      </div>
                      
                      <div className="p-4 flex items-start gap-4">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <p className="font-medium">Logged In</p>
                            <span className="text-xs text-muted-foreground">2 days ago</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            You logged in from a new device
                          </p>
                        </div>
                      </div>
                      
                      <div className="p-4 flex items-start gap-4">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Clock className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <p className="font-medium">Account Created</p>
                            <span className="text-xs text-muted-foreground">
                              {new Date(profile?.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            You created your account
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle>Preferences</CardTitle>
                  <CardDescription>
                    Manage your notification and privacy settings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    These settings control how we communicate with you and how your data is handled.
                  </p>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">Email Notifications</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="marketing" className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" id="marketing" className="rounded" />
                            Marketing emails
                          </Label>
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="updates" className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" id="updates" className="rounded" defaultChecked />
                            Product updates
                          </Label>
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="security" className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" id="security" className="rounded" defaultChecked />
                            Security alerts
                          </Label>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-medium mb-2">Privacy Settings</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="data-collection" className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" id="data-collection" className="rounded" defaultChecked />
                            Allow data collection for service improvement
                          </Label>
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="public-profile" className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" id="public-profile" className="rounded" />
                            Make my profile public
                          </Label>
                        </div>
                      </div>
                    </div>
                    
                    <Button>Save Preferences</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
