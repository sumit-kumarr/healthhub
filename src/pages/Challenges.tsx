
import { useState } from "react";
import { Trophy, Award, Target, Star, Zap, Plus, EyeOff, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: "daily" | "weekly" | "achievement";
  reward: number;
  target: number;
  progress: number;
  completed: boolean;
  icon: JSX.Element;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  dateEarned?: string;
  unlocked: boolean;
}

const ChallengesPage = () => {
  const [showCompleted, setShowCompleted] = useState(false);
  
  // Sample challenges data
  const challenges: Challenge[] = [
    {
      id: "1",
      title: "Daily Steps",
      description: "Walk 10,000 steps today",
      type: "daily",
      reward: 50,
      target: 10000,
      progress: 6500,
      completed: false,
      icon: <Zap className="h-5 w-5 text-amber-500" />
    },
    {
      id: "2",
      title: "Water Intake",
      description: "Drink 8 glasses of water",
      type: "daily",
      reward: 30,
      target: 8,
      progress: 5,
      completed: false,
      icon: <Zap className="h-5 w-5 text-blue-500" />
    },
    {
      id: "3",
      title: "Week of Workouts",
      description: "Complete 5 workouts this week",
      type: "weekly",
      reward: 100,
      target: 5,
      progress: 3,
      completed: false,
      icon: <Target className="h-5 w-5 text-green-500" />
    },
    {
      id: "4",
      title: "Early Bird",
      description: "Log a workout before 8 AM",
      type: "daily",
      reward: 40,
      target: 1,
      progress: 0,
      completed: false,
      icon: <Zap className="h-5 w-5 text-orange-500" />
    },
    {
      id: "5",
      title: "Nutrition Tracker",
      description: "Log all meals for 7 days straight",
      type: "weekly",
      reward: 120,
      target: 7,
      progress: 7,
      completed: true,
      icon: <Target className="h-5 w-5 text-purple-500" />
    }
  ];
  
  // Sample achievements data
  const achievements: Achievement[] = [
    {
      id: "1",
      title: "Exercise Enthusiast",
      description: "Complete 10 workouts",
      icon: <Trophy className="h-10 w-10 text-amber-500" />,
      dateEarned: "2023-06-15",
      unlocked: true
    },
    {
      id: "2",
      title: "Hydration Hero",
      description: "Track water intake for 30 days",
      icon: <Trophy className="h-10 w-10 text-blue-500" />,
      dateEarned: "2023-07-02",
      unlocked: true
    },
    {
      id: "3",
      title: "Century Club",
      description: "Log 100 workouts",
      icon: <Award className="h-10 w-10 text-purple-500" />,
      unlocked: false
    },
    {
      id: "4",
      title: "Meal Maestro",
      description: "Log 50 healthy meals",
      icon: <Trophy className="h-10 w-10 text-green-500" />,
      unlocked: false
    },
    {
      id: "5",
      title: "Early Bird",
      description: "Complete 20 morning workouts",
      icon: <Trophy className="h-10 w-10 text-orange-500" />,
      unlocked: false
    }
  ];
  
  // Filter challenges based on completion status
  const filteredChallenges = challenges.filter(challenge => 
    showCompleted ? true : !challenge.completed
  );
  
  // Calculate user stats
  const userPoints = 1240;
  const userLevel = 3;
  const unlockedAchievements = achievements.filter(a => a.unlocked).length;
  const activeStreakDays = 12;
  
  return (
    <div className="container px-4 py-8">
      <SectionHeader
        title="Challenges & Rewards"
        description="Complete challenges, earn points, and unlock achievements"
        align="left"
      />
      
      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Star className="h-8 w-8 text-amber-500 mb-2" />
            <h3 className="text-2xl font-bold">{userPoints}</h3>
            <p className="text-sm text-muted-foreground">Total Points</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Award className="h-8 w-8 text-purple-500 mb-2" />
            <h3 className="text-2xl font-bold">Level {userLevel}</h3>
            <p className="text-sm text-muted-foreground">Current Level</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Trophy className="h-8 w-8 text-blue-500 mb-2" />
            <h3 className="text-2xl font-bold">{unlockedAchievements}</h3>
            <p className="text-sm text-muted-foreground">Achievements</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Zap className="h-8 w-8 text-green-500 mb-2" />
            <h3 className="text-2xl font-bold">{activeStreakDays} Days</h3>
            <p className="text-sm text-muted-foreground">Active Streak</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="challenges" className="space-y-6">
        <TabsList>
          <TabsTrigger value="challenges">Active Challenges</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>
        
        <TabsContent value="challenges" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Your Challenges</h2>
            <div className="flex gap-4 items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCompleted(!showCompleted)}
                className="flex items-center gap-2"
              >
                {showCompleted ? (
                  <>
                    <EyeOff className="h-4 w-4" />
                    <span>Hide Completed</span>
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4" />
                    <span>Show Completed</span>
                  </>
                )}
              </Button>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                <span>Join New Challenge</span>
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredChallenges.map((challenge) => (
              <Card key={challenge.id} className={challenge.completed ? "opacity-75" : ""}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        {challenge.icon}
                        <Badge variant={challenge.type === "daily" ? "default" : "outline"}>
                          {challenge.type === "daily" ? "Daily" : "Weekly"}
                        </Badge>
                      </div>
                      <CardTitle className="mt-2">{challenge.title}</CardTitle>
                    </div>
                    <div className="bg-primary/10 text-primary font-semibold rounded-full h-8 w-8 flex items-center justify-center text-sm">
                      +{challenge.reward}
                    </div>
                  </div>
                  <CardDescription>{challenge.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-medium">
                        {challenge.progress} / {challenge.target}
                      </span>
                    </div>
                    <Progress value={(challenge.progress / challenge.target) * 100} />
                  </div>
                </CardContent>
                <CardFooter>
                  {challenge.completed ? (
                    <Button variant="ghost" disabled className="w-full">
                      Completed
                    </Button>
                  ) : (
                    <Button variant="outline" className="w-full">
                      Track Progress
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="achievements" className="space-y-6">
          <h2 className="text-xl font-semibold">Your Achievements</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement) => (
              <Card 
                key={achievement.id} 
                className={!achievement.unlocked ? "opacity-60 grayscale" : ""}
              >
                <CardContent className="pt-6 px-6 flex flex-col items-center text-center">
                  <div className={`p-4 rounded-full ${achievement.unlocked ? "bg-primary/10" : "bg-muted"} mb-4`}>
                    {achievement.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-1">{achievement.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{achievement.description}</p>
                  {achievement.unlocked ? (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Unlocked on {achievement.dateEarned}
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-muted text-muted-foreground">
                      Locked
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Workout Buddies Section */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Your Workout Buddies</h2>
          <Button variant="outline">Find Buddies</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>Virtual Coach</span>
                <Badge>Premium</Badge>
              </CardTitle>
              <CardDescription>Your personal AI fitness advisor</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <Avatar className="h-20 w-20 mb-4">
                <AvatarImage src="https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=150&q=80" />
                <AvatarFallback>VC</AvatarFallback>
              </Avatar>
              <h3 className="font-bold">Coach Sarah</h3>
              <p className="text-sm text-muted-foreground mb-4">Certified Personal Trainer</p>
              <Separator className="mb-4" />
              <ul className="text-sm space-y-2 text-muted-foreground w-full">
                <li className="flex items-center">
                  <Star className="h-4 w-4 mr-2 text-amber-500" />
                  <span>Personalized workout plans</span>
                </li>
                <li className="flex items-center">
                  <Star className="h-4 w-4 mr-2 text-amber-500" />
                  <span>24/7 motivation & tips</span>
                </li>
                <li className="flex items-center">
                  <Star className="h-4 w-4 mr-2 text-amber-500" />
                  <span>Progress tracking & feedback</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Chat with Coach</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Workout Buddy</CardTitle>
              <CardDescription>Someone with similar fitness goals</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <Avatar className="h-20 w-20 mb-4">
                <AvatarImage src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=150&q=80" />
                <AvatarFallback>MB</AvatarFallback>
              </Avatar>
              <h3 className="font-bold">Michael B.</h3>
              <p className="text-sm text-muted-foreground mb-4">Matched 2 weeks ago</p>
              <Separator className="mb-4" />
              <div className="grid grid-cols-2 gap-2 w-full text-center text-sm mb-4">
                <div className="bg-muted p-2 rounded-md">
                  <p className="text-muted-foreground">Goal</p>
                  <p className="font-medium">Weight Loss</p>
                </div>
                <div className="bg-muted p-2 rounded-md">
                  <p className="text-muted-foreground">Activity</p>
                  <p className="font-medium">Running</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                95% compatibility with your fitness profile
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Message</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Workout Buddy</CardTitle>
              <CardDescription>Someone with similar fitness goals</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <Avatar className="h-20 w-20 mb-4">
                <AvatarImage src="https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?auto=format&fit=crop&w=150&q=80" />
                <AvatarFallback>JT</AvatarFallback>
              </Avatar>
              <h3 className="font-bold">Jennifer T.</h3>
              <p className="text-sm text-muted-foreground mb-4">Matched 3 days ago</p>
              <Separator className="mb-4" />
              <div className="grid grid-cols-2 gap-2 w-full text-center text-sm mb-4">
                <div className="bg-muted p-2 rounded-md">
                  <p className="text-muted-foreground">Goal</p>
                  <p className="font-medium">Strength</p>
                </div>
                <div className="bg-muted p-2 rounded-md">
                  <p className="text-muted-foreground">Activity</p>
                  <p className="font-medium">Lifting</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                87% compatibility with your fitness profile
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Message</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ChallengesPage;
