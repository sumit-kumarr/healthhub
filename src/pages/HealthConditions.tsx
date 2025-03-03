import { useState } from "react";
import { 
  Heart, 
  Droplet, 
  ArrowRight, 
  BellRing, 
  Search, 
  Activity, 
  Clock, 
  Plus,
  Lungs,
  Brain,
  Bone,
  Pill,
  Dumbbell
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionHeader } from "@/components/ui/section-header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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

interface ExerciseItemProps {
  name: string;
  duration: string;
  description: string;
  icon: React.ReactNode;
}

const ExerciseItem = ({ name, duration, description, icon }: ExerciseItemProps) => (
  <div className="rounded-lg border p-3 mb-3">
    <div className="flex items-center gap-3">
      <div className="rounded-full bg-primary/10 p-2 text-primary flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <h4 className="font-medium">{name}</h4>
          <span className="text-xs text-muted-foreground">{duration}</span>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  </div>
);

interface MedicineItemProps {
  name: string;
  dosage: string;
  usage: string;
  sideEffects: string[];
}

const MedicineItem = ({ name, dosage, usage, sideEffects }: MedicineItemProps) => (
  <Card className="mb-4">
    <CardHeader className="pb-2">
      <div className="flex items-center gap-2">
        <Pill className="h-4 w-4 text-primary" />
        <CardTitle className="text-lg">{name}</CardTitle>
      </div>
      <CardDescription>{dosage}</CardDescription>
    </CardHeader>
    <CardContent className="space-y-3">
      <div>
        <h4 className="text-sm font-medium">Usage</h4>
        <p className="text-sm text-muted-foreground">{usage}</p>
      </div>
      
      <div>
        <h4 className="text-sm font-medium">Side Effects</h4>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
          {sideEffects.map((effect, i) => (
            <li key={i}>{effect}</li>
          ))}
        </ul>
      </div>
    </CardContent>
  </Card>
);

const HealthConditionsPage = () => {
  const [selectedCondition, setSelectedCondition] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  
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
      ],
      medicines: [
        {
          name: "Metformin",
          dosage: "500mg-1000mg, 1-2 times daily",
          usage: "Take with meals to reduce stomach upset. Do not crush or chew extended-release tablets.",
          sideEffects: ["Nausea", "Diarrhea", "Stomach upset", "Metallic taste in mouth", "Vitamin B-12 deficiency (with long-term use)"]
        },
        {
          name: "Glipizide",
          dosage: "5mg-10mg, once or twice daily",
          usage: "Take 30 minutes before meals. Do not skip meals after taking this medication.",
          sideEffects: ["Hypoglycemia (low blood sugar)", "Weight gain", "Dizziness", "Stomach upset"]
        },
        {
          name: "Insulin Glargine",
          dosage: "As prescribed by your doctor, typically once daily",
          usage: "Inject subcutaneously at the same time each day. Rotate injection sites.",
          sideEffects: ["Hypoglycemia", "Weight gain", "Injection site reactions", "Allergic reactions"]
        }
      ],
      exercises: [
        {
          name: "Walking",
          duration: "30 minutes, 5 days a week",
          description: "Moderate-paced walking helps improve insulin sensitivity and lower blood sugar levels.",
          icon: <Activity className="h-4 w-4" />
        },
        {
          name: "Resistance Training",
          duration: "20-30 minutes, 2-3 days a week",
          description: "Strength training helps muscles use glucose more efficiently and improves insulin sensitivity.",
          icon: <Dumbbell className="h-4 w-4" />
        },
        {
          name: "Swimming",
          duration: "30 minutes, 3 days a week",
          description: "Low-impact exercise that's gentle on joints while providing cardiovascular benefits.",
          icon: <Droplet className="h-4 w-4" />
        }
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
      ],
      medicines: [
        {
          name: "Lisinopril",
          dosage: "10mg-40mg, once daily",
          usage: "Take at the same time each day with or without food. Avoid potassium supplements unless prescribed.",
          sideEffects: ["Dry cough", "Dizziness", "Headache", "Fatigue", "High potassium levels"]
        },
        {
          name: "Amlodipine",
          dosage: "5mg-10mg, once daily",
          usage: "Can be taken with or without food. Take at the same time each day.",
          sideEffects: ["Swelling in ankles or feet", "Flushing", "Headache", "Dizziness", "Fatigue"]
        },
        {
          name: "Hydrochlorothiazide",
          dosage: "12.5mg-25mg, once daily",
          usage: "Best taken in the morning to prevent nighttime urination. May be taken with food if stomach upset occurs.",
          sideEffects: ["Increased urination", "Electrolyte imbalance", "Dizziness", "Sun sensitivity", "Increased blood sugar"]
        }
      ],
      exercises: [
        {
          name: "Brisk Walking",
          duration: "30 minutes, most days of the week",
          description: "Regular aerobic exercise like walking helps lower blood pressure by making your heart stronger and more efficient.",
          icon: <Activity className="h-4 w-4" />
        },
        {
          name: "Cycling",
          duration: "30-45 minutes, 3-4 days a week",
          description: "Moderate-intensity cycling improves cardiovascular health and helps lower blood pressure.",
          icon: <Activity className="h-4 w-4" />
        },
        {
          name: "Yoga",
          duration: "20-30 minutes daily",
          description: "Certain yoga poses and breathing techniques help reduce stress and lower blood pressure.",
          icon: <Activity className="h-4 w-4" />
        }
      ]
    },
    {
      title: "Asthma Control",
      description: "Managing asthma symptoms and triggers",
      icon: <Lungs className="h-4 w-4" />,
      category: "Respiratory",
      longDescription: "Asthma is a condition in which your airways narrow and swell and may produce extra mucus. This can make breathing difficult and trigger coughing, a whistling sound (wheezing) when you breathe out and shortness of breath. For some people, asthma is a minor nuisance. For others, it can be a major problem that interferes with daily activities and may lead to a life-threatening asthma attack.",
      tips: [
        "Take medications as prescribed",
        "Identify and avoid triggers",
        "Use an inhaler correctly",
        "Monitor breathing",
        "Get vaccinated for flu and pneumonia",
        "Create an asthma action plan with your doctor"
      ],
      medicines: [
        {
          name: "Albuterol Inhaler",
          dosage: "1-2 puffs every 4-6 hours as needed",
          usage: "Use as a quick-relief medication when experiencing symptoms. Shake well before using.",
          sideEffects: ["Nervousness", "Tremor", "Headache", "Rapid heartbeat", "Throat irritation"]
        },
        {
          name: "Fluticasone Inhaler",
          dosage: "1-2 puffs twice daily",
          usage: "Preventive medication to be used regularly. Rinse mouth after use to prevent thrush.",
          sideEffects: ["Hoarseness", "Throat irritation", "Oral thrush", "Cough", "Headache"]
        },
        {
          name: "Montelukast",
          dosage: "10mg tablet once daily",
          usage: "Take in the evening for best results. Continue taking even when symptoms are not present.",
          sideEffects: ["Headache", "Nausea", "Stomach pain", "Mood changes", "Fatigue"]
        }
      ],
      exercises: [
        {
          name: "Swimming",
          duration: "20-30 minutes, 2-3 times a week",
          description: "The humid environment and horizontal position can help reduce asthma symptoms. Always warm up slowly.",
          icon: <Droplet className="h-4 w-4" />
        },
        {
          name: "Walking",
          duration: "30 minutes, most days",
          description: "Low-intensity exercise that's less likely to trigger asthma symptoms. Start slowly and gradually increase pace.",
          icon: <Activity className="h-4 w-4" />
        },
        {
          name: "Breathing Exercises",
          duration: "10-15 minutes daily",
          description: "Techniques like pursed lip breathing and diaphragmatic breathing can strengthen respiratory muscles.",
          icon: <Lungs className="h-4 w-4" />
        }
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
      ],
      medicines: [
        {
          name: "Atorvastatin",
          dosage: "10mg-80mg once daily",
          usage: "Can be taken any time of day, with or without food. Take at the same time each day.",
          sideEffects: ["Muscle pain", "Digestive problems", "Liver function abnormalities", "Headache", "Insomnia"]
        },
        {
          name: "Aspirin (low-dose)",
          dosage: "81mg once daily",
          usage: "Take with food to reduce stomach irritation. Not recommended for everyone - consult your doctor.",
          sideEffects: ["Stomach irritation", "Bleeding risk", "Allergic reactions", "Ringing in ears", "Nausea"]
        },
        {
          name: "Clopidogrel",
          dosage: "75mg once daily",
          usage: "Can be taken with or without food. Do not discontinue without consulting your doctor.",
          sideEffects: ["Bleeding risk", "Bruising", "Stomach pain", "Headache", "Dizziness"]
        }
      ],
      exercises: [
        {
          name: "Aerobic Exercise",
          duration: "30 minutes, 5 days a week",
          description: "Activities like brisk walking, swimming, or cycling strengthen your heart and improve circulation.",
          icon: <Activity className="h-4 w-4" />
        },
        {
          name: "Strength Training",
          duration: "20-30 minutes, 2 days a week",
          description: "Light to moderate weight training helps reduce heart disease risk and improves overall health.",
          icon: <Dumbbell className="h-4 w-4" />
        },
        {
          name: "Interval Training",
          duration: "20 minutes, 1-2 days a week",
          description: "Alternating between high-intensity and low-intensity exercise improves heart health efficiently.",
          icon: <Activity className="h-4 w-4" />
        }
      ]
    },
    {
      title: "Arthritis Management",
      description: "Techniques for managing joint pain and inflammation",
      icon: <Bone className="h-4 w-4" />,
      category: "Musculoskeletal",
      longDescription: "Arthritis is inflammation of one or more joints, causing pain and stiffness that can worsen with age. The most common types are osteoarthritis and rheumatoid arthritis. Osteoarthritis causes cartilage to break down, while rheumatoid arthritis is an autoimmune disorder that first attacks the synovium.",
      tips: [
        "Take medications as prescribed",
        "Protect your joints during activities",
        "Maintain a healthy weight",
        "Stay physically active",
        "Use hot and cold therapies",
        "Try assistive devices",
        "Balance activity with rest"
      ],
      medicines: [
        {
          name: "Ibuprofen",
          dosage: "200mg-800mg, 3-4 times daily with food",
          usage: "Take with food or milk to decrease stomach upset. Do not take for more than 10 days without consulting your doctor.",
          sideEffects: ["Stomach pain", "Heartburn", "Nausea", "Dizziness", "Increased risk of heart attack and stroke with long-term use"]
        },
        {
          name: "Meloxicam",
          dosage: "7.5mg-15mg once daily",
          usage: "Can be taken with or without food. Take with a full glass of water and stay upright for 30 minutes after.",
          sideEffects: ["Stomach upset", "Dizziness", "Headache", "Fluid retention", "Increased blood pressure"]
        },
        {
          name: "Methotrexate",
          dosage: "7.5mg-25mg once weekly",
          usage: "Take as a single dose once weekly, not daily. Take with folic acid as prescribed by your doctor.",
          sideEffects: ["Nausea", "Mouth sores", "Fatigue", "Liver effects", "Decreased blood counts"]
        }
      ],
      exercises: [
        {
          name: "Water Exercises",
          duration: "30 minutes, 3 times a week",
          description: "Exercising in water reduces stress on joints while providing resistance for muscle strengthening.",
          icon: <Droplet className="h-4 w-4" />
        },
        {
          name: "Gentle Stretching",
          duration: "10-15 minutes daily",
          description: "Regular stretching helps maintain and improve joint flexibility. Move slowly and don't bounce.",
          icon: <Activity className="h-4 w-4" />
        },
        {
          name: "Tai Chi",
          duration: "20-30 minutes, 2-3 times a week",
          description: "Slow, gentle movements improve balance, flexibility, and muscle strength with minimal joint stress.",
          icon: <Activity className="h-4 w-4" />
        }
      ]
    },
    {
      title: "Depression & Anxiety",
      description: "Support and strategies for mental health management",
      icon: <Brain className="h-4 w-4" />,
      category: "Mental Health",
      longDescription: "Depression is a mood disorder that causes a persistent feeling of sadness and loss of interest. Anxiety disorders involve excessive worry or fear that interferes with daily activities. Both conditions can affect how you feel, think, and handle daily activities.",
      tips: [
        "Follow your treatment plan",
        "Stay physically active",
        "Maintain social connections",
        "Practice stress management techniques",
        "Stick to a regular sleep schedule",
        "Eat a healthy diet",
        "Avoid alcohol and recreational drugs"
      ],
      medicines: [
        {
          name: "Sertraline",
          dosage: "50mg-200mg once daily",
          usage: "Can be taken with or without food. May take several weeks to feel full effects. Do not stop abruptly.",
          sideEffects: ["Nausea", "Insomnia", "Drowsiness", "Dry mouth", "Sexual problems"]
        },
        {
          name: "Escitalopram",
          dosage: "10mg-20mg once daily",
          usage: "Take at the same time each day. May be taken with or without food. Do not stop without consulting your doctor.",
          sideEffects: ["Nausea", "Drowsiness", "Sweating", "Headache", "Insomnia"]
        },
        {
          name: "Buspirone",
          dosage: "5mg-30mg, divided doses, 2-3 times daily",
          usage: "Take consistently with or without food. Takes 2-4 weeks for full effect. Do not use with grapefruit juice.",
          sideEffects: ["Dizziness", "Nausea", "Headache", "Nervousness", "Lightheadedness"]
        }
      ],
      exercises: [
        {
          name: "Aerobic Exercise",
          duration: "30 minutes, 3-5 times a week",
          description: "Activities like walking, jogging, or swimming help release endorphins that improve mood.",
          icon: <Activity className="h-4 w-4" />
        },
        {
          name: "Yoga",
          duration: "20-30 minutes daily",
          description: "Combines physical postures, breathing exercises, and meditation to reduce anxiety and improve mood.",
          icon: <Activity className="h-4 w-4" />
        },
        {
          name: "Mindfulness Meditation",
          duration: "10-20 minutes daily",
          description: "Focusing on the present moment can help reduce rumination and worry associated with depression and anxiety.",
          icon: <Brain className="h-4 w-4" />
        }
      ]
    }
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

  // Fetch medicines from Supabase
  const { data: medicinesData, isLoading: medicinesLoading } = useQuery({
    queryKey: ['medicines'],
    queryFn: async () => {
      const { data, error } = await supabase.from('medicines').select('*');
      if (error) throw error;
      return data;
    }
  });
  
  const handleConditionClick = (condition: any) => {
    setSelectedCondition(condition);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter conditions based on search term
  const filteredConditions = conditions.filter(condition => 
    condition.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    condition.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    condition.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              <CardContent className="space-y-6">
                <div>
                  <p className="mb-4">
                    {selectedCondition.longDescription}
                  </p>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-3">Management Tips</h3>
                  <ul className="space-y-2">
                    {selectedCondition.tips.map((tip: string, i: number) => (
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
                  <h3 className="font-medium mb-3">Recommended Medicines</h3>
                  <div className="space-y-4">
                    {selectedCondition.medicines.map((medicine: MedicineItemProps, i: number) => (
                      <MedicineItem key={i} {...medicine} />
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-3">Recommended Exercises</h3>
                  <div className="space-y-2">
                    {selectedCondition.exercises.map((exercise: ExerciseItemProps, i: number) => (
                      <ExerciseItem key={i} {...exercise} />
                    ))}
                  </div>
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-medium mb-4">Your Health Conditions</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredConditions.map((condition, i) => (
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
