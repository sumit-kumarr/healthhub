
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, AlertCircle, Clock, Calendar, Tag, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SectionHeader } from "@/components/ui/section-header";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const MedicineDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [medicine, setMedicine] = useState<any>(null);
  const [relatedMedicines, setRelatedMedicines] = useState<any[]>([]);
  
  useEffect(() => {
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
              <CardTitle>Alternative Medications</CardTitle>
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
                  No alternatives available at this time.
                </p>
              )}
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
