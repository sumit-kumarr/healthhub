
import { useState } from "react";
import { 
  Heart, 
  Droplet, 
  ArrowRight, 
  BellRing, 
  Search, 
  Activity, 
  Clock, 
  Plus 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionHeader } from "@/components/ui/section-header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ConditionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  urgent?: boolean;
  onClick?: () => void;
}

const ConditionCard = ({ title, description, icon, category, urgent, onClick }: ConditionCardProps) => (
  <Card 
    className={`overflow-hidden cursor-pointer transition-all hover:shadow-md ${urgent ? 'border-red-200' : ''}`}
    onClick={onClick}
  >
    <CardHeader className="pb-2">
      <div className="flex justify-between items-start">
        <div className="rounded-full bg-primary/10 p-2 text-primary">
          {icon}
        </div>
        <Badge variant={urgent ? "destructive" : "outline"}>{category}</Badge>
      </div>
      <CardTitle className="mt-2">{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardFooter className="pt-1 pb-3">
      <Button variant="ghost" className="gap-1 p-0 h-auto" onClick={onClick}>
        Learn more <ArrowRight className="h-3 w-3" />
      </Button>
    </CardFooter>
  </Card>
);

interface MedicationReminderProps {
  name: string;
  dosage: string;
  time: string;
  instructions?: string;
}

const MedicationReminder = ({ name, dosage, time, instructions }: MedicationReminderProps) => (
  <div className="rounded-lg border p-3 flex items-center">
    <div className="rounded-full bg-primary/10 p-2 mr-3">
      <Clock className="h-4 w-4 text-primary" />
    </div>
    <div className="flex-1">
      <div className="flex justify-between items-center mb-1">
        <h4 className="font-medium text-sm">{name}</h4>
        <span className="text-xs text-muted-foreground">{time}</span>
      </div>
      <p className="text-xs text-muted-foreground">{dosage}</p>
      {instructions && (
        <p className="text-xs text-muted-foreground mt-1">{instructions}</p>
      )}
    </div>
    <Button variant="ghost" size="icon" className="h-8 w-8">
      <BellRing className="h-4 w-4" />
    </Button>
  </div>
);

const HealthConditionsPage = () => {
  const [selectedCondition, setSelectedCondition] = useState<ConditionCardProps | null>(null);
  
  const conditions = [
    {
      title: "Diabetes Management",
      description: "Tools and advice for managing type 1 and type 2 diabetes",
      icon: <Droplet className="h-4 w-4" />,
      category: "Chronic Condition",
      longDescription: "Diabetes is a chronic health condition that affects how your body turns food into energy. Most of the food you eat is broken down into sugar (glucose) and released into your bloodstream. When your blood sugar goes up, it signals your pancreas to release insulin. Insulin acts like a key to let the blood sugar into your body's cells for use as energy.",
      tips: [
        "Monitor blood glucose levels regularly",
        "Take medications as prescribed",
        "Follow a balanced diet plan",
        "Exercise regularly",
        "Manage stress",
        "Get regular check-ups"
      ]
    },
    {
      title: "Hypertension Care",
      description: "Monitoring and controlling high blood pressure",
      icon: <Heart className="h-4 w-4" />,
      category: "Heart Health",
      longDescription: "Hypertension, or high blood pressure, is a common condition in which the long-term force of the blood against your artery walls is high enough that it may eventually cause health problems, such as heart disease. Blood pressure is determined both by the amount of blood your heart pumps and the amount of resistance to blood flow in your arteries.",
      tips: [
        "Take blood pressure medications as prescribed",
        "Reduce sodium in your diet",
        "Maintain a healthy weight",
        "Exercise regularly",
        "Limit alcohol",
        "Quit smoking",
        "Manage stress"
      ]
    },
    {
      title: "Asthma Control",
      description: "Managing asthma symptoms and triggers",
      icon: <Activity className="h-4 w-4" />,
      category: "Respiratory",
      longDescription: "Asthma is a condition in which your airways narrow and swell and may produce extra mucus. This can make breathing difficult and trigger coughing, a whistling sound (wheezing) when you breathe out and shortness of breath. For some people, asthma is a minor nuisance. For others, it can be a major problem that interferes with daily activities and may lead to a life-threatening asthma attack.",
      tips: [
        "Take medications as prescribed",
        "Identify and avoid triggers",
        "Use an inhaler correctly",
        "Monitor breathing",
        "Get vaccinated for flu and pneumonia",
        "Create an asthma action plan with your doctor"
      ]
    },
    {
      title: "Heart Disease Prevention",
      description: "Lifestyle changes to reduce heart disease risk",
      icon: <Heart className="h-4 w-4" />,
      category: "Heart Health",
      urgent: true,
      longDescription: "Heart disease refers to several types of heart conditions. The most common type is coronary artery disease, which can cause heart attack. Other kinds of heart disease may involve the valves in the heart, or the heart may not pump well and cause heart failure. Some people are born with heart disease.",
      tips: [
        "Eat a heart-healthy diet",
        "Maintain a healthy weight",
        "Exercise regularly",
        "Don't smoke",
        "Limit alcohol consumption",
        "Manage stress",
        "Control blood pressure and cholesterol"
      ]
    },
  ];
  
  const medications = [
    {
      name: "Metformin",
      dosage: "500mg, 1 tablet",
      time: "8:00 AM",
      instructions: "Take with food"
    },
    {
      name: "Lisinopril",
      dosage: "10mg, 1 tablet",
      time: "9:00 AM",
      instructions: "Take on an empty stomach"
    },
    {
      name: "Atorvastatin",
      dosage: "20mg, 1 tablet",
      time: "8:00 PM"
    }
  ];
  
  const handleConditionClick = (condition: ConditionCardProps) => {
    setSelectedCondition(condition);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container px-4 py-8">
      <SectionHeader
        title="Health Conditions"
        description="Manage your health conditions with personalized guidance and tools"
        align="left"
      />
      
      {selectedCondition ? (
        <div className="grid gap-8 lg:grid-cols-3 animate-fade-in">
          <div className="lg:col-span-2">
            <Button
              variant="ghost"
              className="mb-4"
              onClick={() => setSelectedCondition(null)}
            >
              ← Back to conditions
            </Button>
            
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <div className="rounded-full bg-primary/10 p-2.5 text-primary">
                    {selectedCondition.icon}
                  </div>
                  <Badge variant={selectedCondition.urgent ? "destructive" : "outline"}>
                    {selectedCondition.category}
                  </Badge>
                </div>
                <CardTitle className="text-2xl">{selectedCondition.title}</CardTitle>
                <CardDescription>{selectedCondition.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  {conditions.find(c => c.title === selectedCondition.title)?.longDescription}
                </p>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-3">Management Tips</h3>
                  <ul className="space-y-2">
                    {conditions
                      .find(c => c.title === selectedCondition.title)
                      ?.tips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          <span className="text-muted-foreground">{tip}</span>
                        </li>
                      ))}
                  </ul>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-3">Monitoring Tools</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Card>
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-lg">Track Symptoms</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-sm text-muted-foreground">
                          Log your daily symptoms to identify patterns and triggers
                        </p>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Button size="sm" className="w-full">Start Tracking</Button>
                      </CardFooter>
                    </Card>
                    <Card>
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-lg">Medication Reminder</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-sm text-muted-foreground">
                          Set up reminders for your prescriptions and supplements
                        </p>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Button size="sm" className="w-full">Set Reminders</Button>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Talk to a Specialist</CardTitle>
                <CardDescription>
                  Get personalized advice from healthcare professionals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Schedule Consultation</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Related Conditions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {conditions
                  .filter(c => c.category === selectedCondition.category && c.title !== selectedCondition.title)
                  .map((condition, i) => (
                    <div 
                      key={i}
                      className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 cursor-pointer"
                      onClick={() => handleConditionClick(condition)}
                    >
                      <div className="rounded-full bg-primary/10 p-2 text-primary">
                        {condition.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{condition.title}</h4>
                        <p className="text-xs text-muted-foreground">{condition.category}</p>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>
            
            <Alert>
              <BellRing className="h-4 w-4" />
              <AlertTitle>Health Reminder</AlertTitle>
              <AlertDescription>
                Remember to schedule your regular check-up with your healthcare provider.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      ) : (
        <div className="space-y-8 animate-fade-in">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search health conditions..." 
                className="pl-9"
              />
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-medium mb-4">Your Health Conditions</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {conditions.map((condition, i) => (
                <ConditionCard 
                  key={i} 
                  {...condition} 
                  onClick={() => handleConditionClick(condition)}
                />
              ))}
            </div>
            <div className="mt-4 text-center">
              <Button variant="outline" className="gap-2">
                <Plus className="h-4 w-4" />
                Add New Condition
              </Button>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-medium mb-4">Medication Reminders</h2>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {medications.map((medication, i) => (
                <MedicationReminder key={i} {...medication} />
              ))}
            </div>
            <div className="mt-4 text-center">
              <Button variant="outline" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Medication
              </Button>
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Health Risk Assessment</CardTitle>
              <CardDescription>
                Take a quick assessment to identify potential health risks based on your lifestyle and medical history
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button className="gap-2">
                Start Assessment <ArrowRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default HealthConditionsPage;
