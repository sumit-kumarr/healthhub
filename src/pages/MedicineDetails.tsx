
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, AlertCircle, Clock, Calendar, Tag, Heart, Star, Plus, ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SectionHeader } from "@/components/ui/section-header";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { MedicineReview } from "@/components/medicine/MedicineReview";
import { MedicineRatingForm } from "@/components/medicine/MedicineRatingForm";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface MedicineReview {
  id: string;
  user: {
    name: string;
    avatar?: string;
    verified?: boolean;
  };
  rating: number;
  date: string;
  content: string;
  helpfulCount: number;
  condition?: string;
  duration?: string;
}

const MedicineDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [medicine, setMedicine] = useState<any>(null);
  const [relatedMedicines, setRelatedMedicines] = useState<any[]>([]);
  const [alternativeMedicines, setAlternativeMedicines] = useState<any[]>([]);
  const [reviews, setReviews] = useState<MedicineReview[]>([]);
  const [activeReviewsTab, setActiveReviewsTab] = useState("all");
  
  // Sample reviews data (in a real app, this would come from the database)
  const sampleReviews: MedicineReview[] = [
    {
      id: "1",
      user: {
        name: "John D.",
        avatar: "https://i.pravatar.cc/150?img=1",
        verified: true
      },
      rating: 5,
      date: "June 15, 2023",
      content: "This medication has been a game-changer for me. After struggling with my condition for years, I finally found relief with minimal side effects. I highly recommend it to anyone in a similar situation.",
      helpfulCount: 24,
      condition: "Hypertension",
      duration: "Over 1 year"
    },
    {
      id: "2",
      user: {
        name: "Sarah M.",
        avatar: "https://i.pravatar.cc/150?img=5",
      },
      rating: 4,
      date: "May 3, 2023",
      content: "Works well for pain relief, but I experienced some mild drowsiness as a side effect. It went away after a few days of use. Overall effective for what I needed.",
      helpfulCount: 15,
      condition: "Chronic Pain",
      duration: "1-6 months"
    },
    {
      id: "3",
      user: {
        name: "Robert K.",
        avatar: "https://i.pravatar.cc/150?img=12",
        verified: true
      },
      rating: 2,
      date: "April 28, 2023",
      content: "Unfortunately, I had a negative reaction to this medicine. It did help with the intended symptoms, but the side effects were too severe for me to continue taking it. I switched to an alternative.",
      helpfulCount: 8,
      condition: "Allergy",
      duration: "Less than a week"
    }
  ];
  
  useEffect(() => {
    setReviews(sampleReviews);
    
    const fetchMedicine = async () => {
      try {
        setLoading(true);
        
        // Check if id is a valid UUID or a numeric ID
        let query = supabase.from('medicines').select('*');
        
        // If the ID is numeric, we need to handle it differently
        // Because Supabase expects UUIDs but the error suggests we're getting numeric IDs
        if (id && !isNaN(Number(id))) {
          const { data, error } = await query.eq('id', id).single();
          
          if (error) {
            // If error with numeric ID, try to fetch all and find by position
            const { data: allData, error: allError } = await supabase
              .from('medicines')
              .select('*');
              
            if (allError) {
              throw allError;
            }
            
            // Try to find medicine by index position (assuming id might be an index)
            const indexBasedMedicine = allData && allData[Number(id) - 1];
            
            if (indexBasedMedicine) {
              setMedicine(indexBasedMedicine);
              
              // Fetch related medicines in the same category
              if (indexBasedMedicine.category) {
                const { data: relatedData } = await supabase
                  .from('medicines')
                  .select('*')
                  .eq('category', indexBasedMedicine.category)
                  .neq('id', indexBasedMedicine.id)
                  .limit(3);
                  
                setRelatedMedicines(relatedData || []);
                
                // Set some sample alternative medicines
                setAlternativeMedicines([
                  {
                    id: "alt1",
                    name: "Generic " + indexBasedMedicine.name,
                    category: indexBasedMedicine.category,
                    description: "Generic alternative with similar properties",
                    isGeneric: true,
                    similarity: "High",
                    averagePrice: "60% less"
                  },
                  {
                    id: "alt2",
                    name: "Natural Alternative",
                    category: "Natural Supplement",
                    description: "Natural supplement with similar effects",
                    isGeneric: false,
                    similarity: "Medium",
                    averagePrice: "Varies"
                  }
                ]);
              }
            } else {
              setMedicine({
                id: id,
                name: "Medicine Not Found",
                description: "We couldn't find the medicine you're looking for.",
                category: "Unknown",
                usage: "N/A",
                side_effects: "N/A",
                dosage: "N/A"
              });
              
              toast({
                title: "Medicine not found",
                description: "The requested medicine could not be found.",
                variant: "destructive",
              });
            }
          } else if (data) {
            setMedicine(data);
            
            // Fetch related medicines in the same category
            if (data.category) {
              const { data: relatedData } = await supabase
                .from('medicines')
                .select('*')
                .eq('category', data.category)
                .neq('id', data.id)
                .limit(3);
                
              setRelatedMedicines(relatedData || []);
              
              // Set some sample alternative medicines
              setAlternativeMedicines([
                {
                  id: "alt1",
                  name: "Generic " + data.name,
                  category: data.category,
                  description: "Generic alternative with similar properties",
                  isGeneric: true,
                  similarity: "High",
                  averagePrice: "60% less"
                },
                {
                  id: "alt2",
                  name: "Natural Alternative",
                  category: "Natural Supplement",
                  description: "Natural supplement with similar effects",
                  isGeneric: false,
                  similarity: "Medium",
                  averagePrice: "Varies"
                }
              ]);
            }
          }
        } else {
          // Handle as UUID
          const { data, error } = await query.eq('id', id).single();
          
          if (error) {
            throw error;
          }
          
          if (data) {
            setMedicine(data);
            
            // Fetch related medicines in the same category
            if (data.category) {
              const { data: relatedData } = await supabase
                .from('medicines')
                .select('*')
                .eq('category', data.category)
                .neq('id', data.id)
                .limit(3);
                
              setRelatedMedicines(relatedData || []);
              
              // Set some sample alternative medicines
              setAlternativeMedicines([
                {
                  id: "alt1",
                  name: "Generic " + data.name,
                  category: data.category,
                  description: "Generic alternative with similar properties",
                  isGeneric: true,
                  similarity: "High",
                  averagePrice: "60% less"
                },
                {
                  id: "alt2",
                  name: "Natural Alternative",
                  category: "Natural Supplement",
                  description: "Natural supplement with similar effects",
                  isGeneric: false,
                  similarity: "Medium",
                  averagePrice: "Varies"
                }
              ]);
            }
          } else {
            setMedicine({
              id: id,
              name: "Medicine Not Found",
              description: "We couldn't find the medicine you're looking for.",
              category: "Unknown",
              usage: "N/A",
              side_effects: "N/A",
              dosage: "N/A"
            });
            
            toast({
              title: "Medicine not found",
              description: "The requested medicine could not be found.",
              variant: "destructive",
            });
          }
        }
      } catch (error: any) {
        console.error("Error fetching medicine:", error);
        toast({
          title: "Error",
          description: error.message || "Failed to load medicine details",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchMedicine();
    }
  }, [id, toast]);

  // Format the date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };
  
  // Filter reviews based on the active tab
  const filteredReviews = activeReviewsTab === "all" 
    ? reviews 
    : activeReviewsTab === "positive" 
      ? reviews.filter(review => review.rating >= 4) 
      : reviews.filter(review => review.rating < 4);
  
  // Calculate average rating
  const averageRating = reviews.length 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  if (loading) {
    return (
      <div className="container mx-auto p-8 text-center">
        <p>Loading medicine details...</p>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8">
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to search
      </Button>
      
      <SectionHeader
        title={medicine?.name || "Medicine Details"}
        description="Detailed information about this medication"
        align="left"
      />
      
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card className="bg-card border-border shadow-sm overflow-hidden">
            <CardHeader className="bg-card/95 backdrop-blur-sm border-b border-border pb-4">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="bg-primary/10 text-primary">{medicine?.category || "Unknown Category"}</Badge>
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span className="text-xs">Updated: {formatDate(medicine?.updated_at)}</span>
                </div>
              </div>
              <CardTitle className="text-2xl">{medicine?.name}</CardTitle>
              <CardDescription className="text-base">{medicine?.description}</CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6 pt-6">
              <Tabs defaultValue="usage" className="w-full">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="usage">Usage</TabsTrigger>
                  <TabsTrigger value="dosage">Dosage</TabsTrigger>
                  <TabsTrigger value="side-effects">Side Effects</TabsTrigger>
                </TabsList>
                
                <TabsContent value="usage" className="space-y-4">
                  <h3 className="font-medium text-lg">Recommended Usage</h3>
                  <div className="bg-muted/40 p-4 rounded-lg">
                    <p className="text-muted-foreground">
                      {medicine?.usage || "Usage information not available."}
                    </p>
                    <div className="mt-4 flex items-start">
                      <Clock className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <div>
                        <p className="font-medium">Administration Schedule</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Take as directed by your healthcare provider. Typically administered with or without food.
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="dosage" className="space-y-4">
                  <h3 className="font-medium text-lg">Dosage Information</h3>
                  <div className="bg-muted/40 p-4 rounded-lg">
                    <p className="text-muted-foreground">
                      {medicine?.dosage || "Dosage information not available."}
                    </p>
                    
                    <div className="mt-4 flex items-start">
                      <Tag className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <div>
                        <p className="font-medium">Standard Formulations</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Available in tablets, capsules, and liquid form. Strengths vary by prescription.
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="side-effects" className="space-y-4">
                  <h3 className="font-medium text-lg">Possible Side Effects</h3>
                  <div className="bg-muted/40 p-4 rounded-lg">
                    <p className="text-muted-foreground">
                      {medicine?.side_effects || "Side effects information not available."}
                    </p>
                    
                    <div className="mt-4 flex items-start">
                      <Heart className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <div>
                        <p className="font-medium">Special Considerations</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Contact your doctor immediately if you experience severe side effects or allergic reactions.
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              <Separator className="my-4" />
              
              <Alert variant="destructive" className="bg-destructive/10 text-destructive border-destructive/20">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Important Notice</AlertTitle>
                <AlertDescription>
                  Always consult with your healthcare provider before starting or changing any medication regimen.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
          
          {/* Alternative Medicines Section */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Alternative Medicines</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {alternativeMedicines.map((alt) => (
                <Card key={alt.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div>
                        <Badge variant={alt.isGeneric ? "default" : "outline"} className="mb-2">
                          {alt.isGeneric ? "Generic Alternative" : alt.category}
                        </Badge>
                        <CardTitle className="text-lg">{alt.name}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground mb-3">{alt.description}</p>
                    <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                      <div className="bg-muted p-2 rounded-md">
                        <p className="text-muted-foreground">Similarity</p>
                        <p className="font-medium">{alt.similarity}</p>
                      </div>
                      <div className="bg-muted p-2 rounded-md">
                        <p className="text-muted-foreground">Avg. Price</p>
                        <p className="font-medium">{alt.averagePrice}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardHeader className="py-0 px-4 pb-4">
                    <Button variant="outline" size="sm" className="w-full">
                      View Details
                    </Button>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
          
          {/* User Reviews Section */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">User Reviews & Ratings</h2>
              <div className="flex items-center gap-1">
                <span className="font-medium">{averageRating.toFixed(1)}</span>
                <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
                <span className="text-sm text-muted-foreground ml-1">({reviews.length} reviews)</span>
              </div>
            </div>
            
            <Tabs 
              value={activeReviewsTab} 
              onValueChange={setActiveReviewsTab}
              className="space-y-6"
            >
              <TabsList>
                <TabsTrigger value="all">All Reviews</TabsTrigger>
                <TabsTrigger value="positive">Positive</TabsTrigger>
                <TabsTrigger value="negative">Critical</TabsTrigger>
              </TabsList>
              
              <div className="space-y-4">
                {filteredReviews.length > 0 ? (
                  filteredReviews.map((review) => (
                    <MedicineReview key={review.id} {...review} />
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No {activeReviewsTab === "all" ? "" : activeReviewsTab} reviews yet.</p>
                  </div>
                )}
                
                <div className="mt-8">
                  <MedicineRatingForm />
                </div>
              </div>
            </Tabs>
          </div>
        </div>
        
        <div className="space-y-6">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle>Medical Consultation</CardTitle>
              <CardDescription>
                Speak with a healthcare professional for personalized advice
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full mb-2 bg-primary hover:bg-primary/90">
                Schedule Consultation
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                Virtual consultations available with licensed physicians
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Similar Medications</CardTitle>
              <CardDescription>
                Other options in the same category
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {relatedMedicines.length > 0 ? (
                relatedMedicines.map((med) => (
                  <div 
                    key={med.id} 
                    className="border border-border p-3 rounded-md hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => navigate(`/medicine/${med.id}`)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-sm">{med.name}</h4>
                        <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                          {med.description}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-xs">{med.category}</Badge>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  No similar medications available at this time.
                </p>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Medicine Effectiveness</CardTitle>
              <CardDescription>
                Based on user reviews and clinical data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Effectiveness Rating</span>
                    <span className="font-medium">{averageRating.toFixed(1)}/5</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full" 
                      style={{ width: `${(averageRating / 5) * 100}%` }}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <div className="bg-muted rounded-md p-3 text-center">
                    <div className="flex justify-center mb-1">
                      <ThumbsUp className="h-5 w-5 text-green-500" />
                    </div>
                    <p className="text-sm font-medium">80%</p>
                    <p className="text-xs text-muted-foreground">Recommend</p>
                  </div>
                  <div className="bg-muted rounded-md p-3 text-center">
                    <div className="flex justify-center mb-1">
                      <ThumbsDown className="h-5 w-5 text-red-500" />
                    </div>
                    <p className="text-sm font-medium">20%</p>
                    <p className="text-xs text-muted-foreground">Don't Recommend</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Interaction Checker</CardTitle>
              <CardDescription>
                Check for potential drug interactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Check Interactions
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                Ensure this medication is safe with your current prescriptions
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MedicineDetailsPage;
