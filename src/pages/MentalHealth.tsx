import { useState } from "react";
import { Brain, Moon, Clock, VolumeX, Volume2, Play, Pause, Sun, SkipForward, Search, Activity, HeartPulse, BookOpen, Smile, Frown, ThumbsUp, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface MeditationCardProps {
  title: string;
  duration: string;
  image: string;
  category: string;
  onClick?: () => void;
}

const MeditationCard = ({ title, duration, image, category, onClick }: MeditationCardProps) => (
  <div 
    className="group cursor-pointer rounded-lg overflow-hidden border shadow-sm hover:shadow-md transition-all"
    onClick={onClick}
  >
    <div className="aspect-video w-full relative overflow-hidden">
      <img
        src={image}
        alt={title}
        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
      <div className="absolute top-3 left-3 px-2.5 py-1 text-xs font-medium rounded-full bg-primary/20 backdrop-blur-sm text-primary">
        {category}
      </div>
      <div className="absolute bottom-3 left-3 flex items-center text-sm text-white">
        <Clock className="h-3.5 w-3.5 mr-1.5" />
        {duration}
      </div>
    </div>
    <div className="p-4">
      <h3 className="font-medium">{title}</h3>
    </div>
  </div>
);

interface AudioPlayerProps {
  title: string;
  author: string;
  image: string;
  duration: string;
}

const AudioPlayer = ({ title, author, image, duration }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([75]);
  const [progress, setProgress] = useState(0);
  
  return (
    <div className="rounded-lg border overflow-hidden shadow-sm">
      <div className="aspect-video relative">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent/30"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <h2 className="text-xl font-semibold text-white mb-1">{title}</h2>
          <p className="text-sm text-white/80">{author}</p>
        </div>
      </div>
      <div className="p-4 bg-card">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1:14</span>
              <span>{duration}</span>
            </div>
            <Progress value={progress} className="h-1.5" onClick={() => setProgress(Math.random() * 100)} />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              {volume[0] === 0 ? (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => setVolume([75])}
                >
                  <VolumeX className="h-4 w-4" />
                </Button>
              ) : (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => setVolume([0])}
                >
                  <Volume2 className="h-4 w-4" />
                </Button>
              )}
              <div className="w-20">
                <Slider
                  value={volume}
                  max={100}
                  step={1}
                  onValueChange={setVolume}
                  className="h-1.5"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8"
              >
                <SkipForward className="h-4 w-4 rotate-180" />
              </Button>
              <Button 
                size="icon" 
                className="h-10 w-10 rounded-full"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5 ml-0.5" />
                )}
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8"
              >
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="w-[88px]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface MentalHealthCondition {
  name: string;
  description: string;
  symptoms: string[];
  selfCareSteps: string[];
  exercises: string[];
  icon: React.ReactNode;
}

const MentalHealthPage = () => {
  const [selectedMeditation, setSelectedMeditation] = useState<MeditationCardProps | null>(null);
  const [selectedCondition, setSelectedCondition] = useState<MentalHealthCondition | null>(null);
  
  const meditations = [
    {
      title: "Morning Mindfulness",
      duration: "10 min",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      category: "Mindfulness",
    },
    {
      title: "Stress Relief",
      duration: "15 min",
      image: "https://images.unsplash.com/photo-1476611338391-6f395a0dd82e?auto=format&fit=crop&w=800&q=80",
      category: "Stress",
    },
    {
      title: "Deep Sleep",
      duration: "30 min",
      image: "https://images.unsplash.com/photo-1506377295141-e428b98297c0?auto=format&fit=crop&w=800&q=80",
      category: "Sleep",
    },
    {
      title: "Focus & Concentration",
      duration: "20 min",
      image: "https://images.unsplash.com/photo-1491466424936-e304919aada7?auto=format&fit=crop&w=800&q=80",
      category: "Focus",
    },
    {
      title: "Anxiety Reduction",
      duration: "18 min",
      image: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&w=800&q=80",
      category: "Anxiety",
    },
    {
      title: "Body Scan Relaxation",
      duration: "12 min",
      image: "https://images.unsplash.com/photo-1536623975707-c4b3b2af565d?auto=format&fit=crop&w=800&q=80",
      category: "Relaxation",
    },
  ];

  const mentalHealthConditions: MentalHealthCondition[] = [
    {
      name: "Anxiety",
      description: "Anxiety disorders involve excessive worry, fear, or nervousness that can interfere with daily activities.",
      symptoms: [
        "Excessive worry or fear",
        "Restlessness or feeling on edge",
        "Rapid heartbeat",
        "Difficulty concentrating",
        "Sleep problems",
        "Muscle tension"
      ],
      selfCareSteps: [
        "Practice deep breathing exercises",
        "Limit caffeine and alcohol",
        "Maintain a regular sleep schedule",
        "Challenge negative thoughts",
        "Stay physically active"
      ],
      exercises: [
        "Progressive muscle relaxation",
        "Mindfulness meditation",
        "Grounding techniques (5-4-3-2-1 method)",
        "Guided visualization",
        "Regular aerobic exercise"
      ],
      icon: <HeartPulse className="h-5 w-5 text-red-500" />
    },
    {
      name: "Depression",
      description: "Depression is a mood disorder causing persistent feelings of sadness and loss of interest in activities.",
      symptoms: [
        "Persistent sad or empty mood",
        "Loss of interest in activities once enjoyed",
        "Changes in appetite or weight",
        "Sleep disturbances",
        "Fatigue or low energy",
        "Feelings of worthlessness or guilt"
      ],
      selfCareSteps: [
        "Establish a daily routine",
        "Set small, achievable goals",
        "Spend time in nature and sunlight",
        "Maintain social connections",
        "Avoid isolation"
      ],
      exercises: [
        "Regular physical activity",
        "Behavioral activation (scheduling pleasurable activities)",
        "Gratitude journaling",
        "Creative expression (art, music, writing)",
        "Mindful walking"
      ],
      icon: <Frown className="h-5 w-5 text-blue-500" />
    },
    {
      name: "Stress",
      description: "Stress is the body's response to pressure from challenging or demanding situations.",
      symptoms: [
        "Irritability or short temper",
        "Headaches or muscle tension",
        "Digestive issues",
        "Difficulty focusing",
        "Changes in appetite",
        "Feeling overwhelmed"
      ],
      selfCareSteps: [
        "Identify and reduce stressors",
        "Practice time management",
        "Set boundaries",
        "Take breaks throughout the day",
        "Engage in hobbies and activities you enjoy"
      ],
      exercises: [
        "Deep breathing exercises",
        "Body scan meditation",
        "Progressive muscle relaxation",
        "Yoga or tai chi",
        "Time in nature"
      ],
      icon: <Activity className="h-5 w-5 text-orange-500" />
    },
    {
      name: "Insomnia",
      description: "Insomnia is a sleep disorder characterized by difficulty falling asleep, staying asleep, or getting quality sleep.",
      symptoms: [
        "Difficulty falling asleep",
        "Waking up during the night",
        "Waking up too early",
        "Not feeling well-rested",
        "Daytime tiredness or sleepiness",
        "Irritability, depression, or anxiety"
      ],
      selfCareSteps: [
        "Maintain a consistent sleep schedule",
        "Create a relaxing bedtime routine",
        "Make your sleep environment comfortable",
        "Limit screen time before bed",
        "Avoid caffeine and alcohol close to bedtime"
      ],
      exercises: [
        "Sleep restriction therapy",
        "Stimulus control therapy",
        "Relaxation techniques",
        "Mindfulness meditation for sleep",
        "Progressive muscle relaxation"
      ],
      icon: <Moon className="h-5 w-5 text-purple-500" />
    },
    {
      name: "ADHD",
      description: "Attention-Deficit/Hyperactivity Disorder is characterized by patterns of inattention, hyperactivity, and impulsivity.",
      symptoms: [
        "Difficulty maintaining attention",
        "Easily distracted",
        "Forgetfulness",
        "Hyperactivity",
        "Impulsivity",
        "Difficulty organizing tasks"
      ],
      selfCareSteps: [
        "Create structured routines",
        "Use organizational tools and reminders",
        "Break tasks into smaller steps",
        "Minimize distractions in your environment",
        "Prioritize adequate sleep and nutrition"
      ],
      exercises: [
        "Mindfulness meditation",
        "Regular physical exercise",
        "Pomodoro technique for focus",
        "Body-doubling (working alongside someone else)",
        "Cognitive training exercises"
      ],
      icon: <Brain className="h-5 w-5 text-green-500" />
    },
    {
      name: "Burnout",
      description: "Burnout is a state of emotional, physical, and mental exhaustion caused by excessive and prolonged stress.",
      symptoms: [
        "Feeling exhausted and drained",
        "Reduced performance",
        "Detachment and cynicism",
        "Sense of ineffectiveness",
        "Physical symptoms (headaches, sleep problems)",
        "Loss of motivation"
      ],
      selfCareSteps: [
        "Set boundaries between work and personal life",
        "Take regular breaks",
        "Practice saying no",
        "Seek support from others",
        "Engage in meaningful activities outside of work"
      ],
      exercises: [
        "Self-compassion practices",
        "Values clarification exercises",
        "Nature therapy",
        "Leisure activities that promote flow states",
        "Regular physical activity"
      ],
      icon: <BookOpen className="h-5 w-5 text-yellow-500" />
    }
  ];
  
  const sleepTips = [
    "Maintain a consistent sleep schedule",
    "Create a restful environment (cool, dark, quiet)",
    "Avoid large meals, caffeine, and alcohol before bedtime",
    "Limit screen time before bed",
    "Try relaxation techniques like deep breathing",
    "Regular physical activity promotes better sleep",
  ];
  
  const handleMeditationClick = (meditation: MeditationCardProps) => {
    setSelectedMeditation(meditation);
    setSelectedCondition(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConditionClick = (condition: MentalHealthCondition) => {
    setSelectedCondition(condition);
    setSelectedMeditation(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container px-4 py-8">
      <SectionHeader
        title="Mental Health & Meditation"
        description="Tools and resources to support your mental wellbeing"
        align="left"
      />
      
      {selectedMeditation ? (
        <div className="grid gap-8 lg:grid-cols-3 animate-fade-in">
          <div className="lg:col-span-2">
            <Button
              variant="ghost"
              className="mb-4"
              onClick={() => setSelectedMeditation(null)}
            >
              ← Back to meditations
            </Button>
            
            <AudioPlayer
              title={selectedMeditation.title}
              author="HealthHub Mind"
              image={selectedMeditation.image}
              duration={selectedMeditation.duration}
            />
            
            <div className="mt-6 space-y-4">
              <h2 className="text-lg font-medium">About this meditation</h2>
              <p className="text-muted-foreground">
                This guided meditation session helps you cultivate mindfulness and awareness. 
                It's designed to help you focus on the present moment, reduce stress, and promote overall mental wellbeing. 
                Find a comfortable position, close your eyes, and follow the gentle guidance.
              </p>
              
              <h3 className="font-medium">Benefits</h3>
              <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                <li>Reduces stress and anxiety</li>
                <li>Improves focus and concentration</li>
                <li>Promotes emotional well-being</li>
                <li>Enhances self-awareness</li>
                <li>Supports better sleep</li>
              </ul>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="rounded-lg border p-4">
              <h3 className="font-medium flex items-center gap-2 mb-4">
                <Brain className="h-5 w-5 text-primary" />
                Recommended for You
              </h3>
              <div className="space-y-3">
                {meditations
                  .filter(m => m.title !== selectedMeditation.title)
                  .slice(0, 3)
                  .map((meditation, i) => (
                    <div 
                      key={i}
                      className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 cursor-pointer"
                      onClick={() => handleMeditationClick(meditation)}
                    >
                      <img 
                        src={meditation.image}
                        alt={meditation.title}
                        className="h-12 w-12 rounded-md object-cover"
                      />
                      <div>
                        <h4 className="font-medium text-sm">{meditation.title}</h4>
                        <p className="text-xs text-muted-foreground">{meditation.duration}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            
            <div className="rounded-lg border p-4">
              <h3 className="font-medium flex items-center gap-2 mb-4">
                <Moon className="h-5 w-5 text-primary" />
                Sleep Quality Tips
              </h3>
              <ul className="space-y-2">
                {sleepTips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : selectedCondition ? (
        <div className="grid gap-8 lg:grid-cols-3 animate-fade-in">
          <div className="lg:col-span-2">
            <Button
              variant="ghost"
              className="mb-4"
              onClick={() => setSelectedCondition(null)}
            >
              ← Back to mental health
            </Button>
            
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  {selectedCondition.icon}
                  <CardTitle>{selectedCondition.name}</CardTitle>
                </div>
                <CardDescription>{selectedCondition.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium text-lg mb-3">Common Symptoms</h3>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {selectedCondition.symptoms.map((symptom, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">•</span>
                        {symptom}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-3">Self-Care Steps</h3>
                  <ul className="space-y-3">
                    {selectedCondition.selfCareSteps.map((step, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <span className="flex-shrink-0 inline-flex items-center justify-center rounded-full bg-primary w-6 h-6 text-primary-foreground text-xs font-medium">
                          {i + 1}
                        </span>
                        <p>{step}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-3">Helpful Exercises</h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {selectedCondition.exercises.map((exercise, i) => (
                      <Card key={i} className="bg-muted/50">
                        <CardContent className="p-4">
                          <p className="font-medium text-sm">{exercise}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <div className="rounded-lg bg-primary/10 p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <ThumbsUp className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Professional Support</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    While self-care strategies can help manage symptoms, some conditions may require professional support.
                    Consider reaching out to a mental health professional if symptoms persist or worsen.
                  </p>
                  <Button className="w-full sm:w-auto">Find a Therapist</Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-6">
              <h3 className="font-medium text-lg mb-4">Recommended Meditations for {selectedCondition.name}</h3>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                {meditations
                  .filter(m => {
                    if (selectedCondition.name === "Anxiety") return m.category === "Anxiety" || m.category === "Mindfulness";
                    if (selectedCondition.name === "Depression") return m.category === "Mindfulness" || m.title.includes("Morning");
                    if (selectedCondition.name === "Stress") return m.category === "Stress" || m.category === "Relaxation";
                    if (selectedCondition.name === "Insomnia") return m.category === "Sleep" || m.title.includes("Deep Sleep");
                    if (selectedCondition.name === "ADHD") return m.category === "Focus" || m.title.includes("Concentration");
                    if (selectedCondition.name === "Burnout") return m.category === "Relaxation" || m.category === "Mindfulness";
                    return false;
                  })
                  .slice(0, 2)
                  .map((meditation, i) => (
                    <MeditationCard 
                      key={i} 
                      {...meditation}
                      onClick={() => handleMeditationClick(meditation)}
                    />
                  ))}
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Resource Library</CardTitle>
                <CardDescription>Helpful articles and resources</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="flex items-start gap-3 p-2 rounded-md hover:bg-muted cursor-pointer">
                    <div className="bg-primary/10 p-2 rounded-md flex-shrink-0">
                      <BookOpen className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">
                        {selectedCondition.name === "Anxiety" ? "Understanding Anxiety Triggers" :
                         selectedCondition.name === "Depression" ? "Recognizing Depression Signs" :
                         selectedCondition.name === "Stress" ? "Stress Management Techniques" :
                         selectedCondition.name === "Insomnia" ? "Sleep Hygiene Practices" :
                         selectedCondition.name === "ADHD" ? "ADHD Coping Strategies" :
                         "Preventing Burnout"}
                        {i > 0 ? ` Part ${i+1}` : ""}
                      </h4>
                      <p className="text-xs text-muted-foreground">5 min read</p>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  View All Resources
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Community Support</CardTitle>
                <CardDescription>Connect with others</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg bg-muted/50 p-3">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-sm flex items-center gap-2">
                      <MessageCircle className="h-4 w-4" />
                      {selectedCondition.name} Support Group
                    </h4>
                    <Badge variant="outline" className="text-xs">2.4k members</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    A supportive community for individuals managing {selectedCondition.name.toLowerCase()}.
                  </p>
                  <Button size="sm" variant="outline" className="w-full">Join Group</Button>
                </div>
                
                <div className="rounded-lg bg-muted/50 p-3">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-sm flex items-center gap-2">
                      <MessageCircle className="h-4 w-4" />
                      Weekly Check-in Circle
                    </h4>
                    <Badge variant="outline" className="text-xs">Online</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    Virtual meetups every Sunday at 7PM for mental wellness check-ins.
                  </p>
                  <Button size="sm" variant="outline" className="w-full">Learn More</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div className="space-y-10 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search mental health resources..." className="pl-9" />
            </div>
          </div>
          
          <Tabs defaultValue="conditions" className="space-y-6">
            <TabsList className="grid w-full md:w-auto grid-cols-2">
              <TabsTrigger value="conditions">Mental Health Conditions</TabsTrigger>
              <TabsTrigger value="meditations">Meditation Library</TabsTrigger>
            </TabsList>
            
            <TabsContent value="conditions" className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {mentalHealthConditions.map((condition, i) => (
                  <Card 
                    key={i}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handleConditionClick(condition)}
                  >
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        {condition.icon}
                        <CardTitle className="text-lg">{condition.name}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-3">{condition.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" size="sm" className="w-full">
                        Learn More
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-0">
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="md:w-2/3">
                      <h3 className="text-xl font-medium mb-2">Mental Health Assessment</h3>
                      <p className="text-muted-foreground mb-4">
                        Take our comprehensive assessment to understand your mental wellbeing and get personalized recommendations.
                      </p>
                      <Button>Start Assessment</Button>
                    </div>
                    <div className="md:w-1/3 flex justify-center">
                      <Brain className="h-24 w-24 text-primary/20" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="meditations" className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-medium">Featured Meditations</h2>
                  <Button variant="ghost" size="sm">View All</Button>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {meditations.slice(0, 3).map((meditation, i) => (
                    <MeditationCard 
                      key={i} 
                      {...meditation}
                      onClick={() => handleMeditationClick(meditation)}
                    />
                  ))}
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-medium">Sleep & Relaxation</h2>
                  <Button variant="ghost" size="sm">View All</Button>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {meditations.slice(3, 6).map((meditation, i) => (
                    <MeditationCard 
                      key={i} 
                      {...meditation}
                      onClick={() => handleMeditationClick(meditation)}
                    />
                  ))}
                </div>
              </div>
              
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-xl overflow-hidden border shadow-sm">
                  <div className="p-6">
                    <div className="p-3 bg-primary/10 w-fit rounded-full mb-4">
                      <Sun className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">Daily Mood Tracker</h3>
                    <p className="text-muted-foreground mb-6">
                      Track your mood patterns to understand what affects your mental wellbeing.
                    </p>
                    <Button>Start Tracking</Button>
                  </div>
                </div>
                
                <div className="rounded-xl overflow-hidden border shadow-sm">
                  <div className="p-6">
                    <div className="p-3 bg-primary/10 w-fit rounded-full mb-4">
                      <Brain className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">Stress Assessment</h3>
                    <p className="text-muted-foreground mb-6">
                      Take a quick assessment to measure your current stress levels and get personalized tips.
                    </p>
                    <Button>Take Assessment</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default MentalHealthPage;
