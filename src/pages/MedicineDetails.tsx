
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, AlertCircle } from "lucide-react";
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
  
  useEffect(() => {
    const fetchMedicine = async () => {
      try {
        setLoading(true);
        
        // Fetch medicine data from Supabase
        const { data, error } = await supabase
          .from('medicines')
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) {
          throw error;
        }
        
        if (data) {
          setMedicine(data);
        } else {
          // If no data, show placeholder
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
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline">{medicine?.category || "Unknown Category"}</Badge>
              </div>
              <CardTitle className="text-2xl">{medicine?.name}</CardTitle>
              <CardDescription className="text-base">{medicine?.description}</CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <Tabs defaultValue="usage">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="usage">Usage</TabsTrigger>
                  <TabsTrigger value="dosage">Dosage</TabsTrigger>
                  <TabsTrigger value="side-effects">Side Effects</TabsTrigger>
                </TabsList>
                
                <TabsContent value="usage" className="space-y-4">
                  <h3 className="font-medium text-lg">Recommended Usage</h3>
                  <p className="text-muted-foreground">{medicine?.usage || "Usage information not available."}</p>
                </TabsContent>
                
                <TabsContent value="dosage" className="space-y-4">
                  <h3 className="font-medium text-lg">Dosage Information</h3>
                  <p className="text-muted-foreground">{medicine?.dosage || "Dosage information not available."}</p>
                </TabsContent>
                
                <TabsContent value="side-effects" className="space-y-4">
                  <h3 className="font-medium text-lg">Possible Side Effects</h3>
                  <p className="text-muted-foreground">{medicine?.side_effects || "Side effects information not available."}</p>
                </TabsContent>
              </Tabs>
              
              <Separator />
              
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Important Notice</AlertTitle>
                <AlertDescription>
                  Always consult with your healthcare provider before starting or changing any medication regimen.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Medical Consultation</CardTitle>
              <CardDescription>
                Speak with a healthcare professional for personalized advice
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full mb-2">Schedule Consultation</Button>
              <p className="text-xs text-muted-foreground mt-2">
                Virtual consultations available with licensed physicians
              </p>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Alternative Medications</CardTitle>
              <CardDescription>
                Other options in the same category
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">
                No alternatives available at this time.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MedicineDetailsPage;
