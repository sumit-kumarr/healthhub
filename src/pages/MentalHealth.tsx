
import { Brain, Moon, Clock, VolumeX, Volume2, Play, Pause, Sun, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

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

const MentalHealthPage = () => {
  const [selectedMeditation, setSelectedMeditation] = useState<MeditationCardProps | null>(null);
  
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
      ) : (
        <div className="space-y-10 animate-fade-in">
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
        </div>
      )}
    </div>
  );
};

export default MentalHealthPage;
