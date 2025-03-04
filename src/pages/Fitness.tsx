import { useState } from "react";
import { 
  Dumbbell, 
  Heart, 
  Clock, 
  Calendar, 
  BarChart, 
  ChevronRight, 
  Trophy,
  Flame,
  Zap,
  ArrowRight,
  Users,
  Activity,
  Timer,
  PlusCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ExerciseProps {
  name: string;
  duration: string;
  calories: number;
  image: string;
  difficulty?: string;
  muscleGroups?: string[];
}

const Exercise = ({ name, duration, calories, image, difficulty, muscleGroups }: ExerciseProps) => (
  <div className="flex items-center gap-4 p-4 border rounded-lg hover:border-primary/50 cursor-pointer transition-colors">
    <img
      src={image}
      alt={name}
      className="w-16 h-16 rounded-lg object-cover"
    />
    <div className="flex-1">
      <h3 className="font-medium">{name}</h3>
      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>{duration}</span>
        </div>
        <div className="flex items-center gap-1">
          <Flame className="h-4 w-4" />
          <span>{calories} cal</span>
        </div>
      </div>
      {difficulty && muscleGroups && (
        <div className="flex flex-wrap gap-1 mt-2">
          <Badge variant="outline" className="text-xs">{difficulty}</Badge>
          {muscleGroups.map((group, idx) => (
            <Badge key={idx} variant="secondary" className="text-xs">{group}</Badge>
          ))}
        </div>
      )}
    </div>
    <Button variant="ghost" size="icon">
      <ChevronRight className="h-5 w-5" />
    </Button>
  </div>
);

interface WorkoutDetailProps {
  type: string;
  description: string;
  benefits: string[];
  instructions: string[];
  variations: {name: string, description: string}[];
  tips: string[];
  caloriesBurnedPerHour: {weight: string, calories: number}[];
  image: string;
}

const WorkoutDetail = ({
  type,
  description,
  benefits,
  instructions,
  variations,
  tips,
  caloriesBurnedPerHour,
  image
}: WorkoutDetailProps) => (
  <div className="space-y-6">
    <div className="flex flex-col md:flex-row gap-6">
      <div className="md:w-1/3">
        <img 
          src={image} 
          alt={type} 
          className="w-full rounded-lg object-cover h-64"
        />
      </div>
      <div className="md:w-2/3">
        <h2 className="text-2xl font-bold mb-2">{type}</h2>
        <p className="text-muted-foreground mb-4">{description}</p>
        
        <h3 className="font-semibold text-lg mb-2">Benefits</h3>
        <ul className="list-disc list-inside mb-4 space-y-1">
          {benefits.map((benefit, idx) => (
            <li key={idx} className="text-muted-foreground">{benefit}</li>
          ))}
        </ul>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-lg mb-2">Calories Burned (per hour)</h3>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">Weight</th>
                  <th className="text-right">Calories</th>
                </tr>
              </thead>
              <tbody>
                {caloriesBurnedPerHour.map((item, idx) => (
                  <tr key={idx}>
                    <td className="text-muted-foreground">{item.weight}</td>
                    <td className="text-right text-muted-foreground">{item.calories}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">How to do it</h3>
      <ol className="list-decimal list-inside space-y-2">
        {instructions.map((instruction, idx) => (
          <li key={idx} className="text-muted-foreground">{instruction}</li>
        ))}
      </ol>
    </div>
    
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Variations</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {variations.map((variation, idx) => (
          <Card key={idx}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{variation.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{variation.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
    
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Tips</h3>
      <ul className="list-disc list-inside space-y-2">
        {tips.map((tip, idx) => (
          <li key={idx} className="text-muted-foreground">{tip}</li>
        ))}
      </ul>
    </div>
    
    <div className="mt-6">
      <Button>Start This Workout</Button>
    </div>
  </div>
);

const FitnessPage = () => {
  const [selectedWorkout, setSelectedWorkout] = useState<WorkoutDetailProps | null>(null);
  
  const exercises = [
    {
      name: "Morning Yoga",
      duration: "20 min",
      calories: 120,
      image: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&w=240&q=80",
      difficulty: "Beginner",
      muscleGroups: ["Full body", "Core"]
    },
    {
      name: "HIIT Workout",
      duration: "30 min",
      calories: 350,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=240&q=80",
      difficulty: "Advanced",
      muscleGroups: ["Full body", "Cardio"]
    },
    {
      name: "Strength Training",
      duration: "45 min",
      calories: 280,
      image: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&w=240&q=80",
      difficulty: "Intermediate",
      muscleGroups: ["Upper body", "Core"]
    },
    {
      name: "Evening Run",
      duration: "25 min",
      calories: 240,
      image: "https://images.unsplash.com/photo-1486218119243-13883505764c?auto=format&fit=crop&w=240&q=80",
      difficulty: "Beginner",
      muscleGroups: ["Legs", "Cardio"]
    }
  ];

  const workoutCategories = [
    {
      name: "Cardio",
      icon: Heart,
      workouts: [
        {
          type: "Running",
          description: "Running is a high-impact, cardio-intensive exercise that improves heart health, builds endurance, and burns calories effectively.",
          benefits: [
            "Improves cardiovascular health",
            "Burns calories efficiently",
            "Strengthens leg muscles",
            "Boosts mood through endorphin release",
            "Builds endurance and stamina"
          ],
          instructions: [
            "Start with a 5-minute walking warm-up",
            "Gradually increase your pace to a comfortable jog",
            "Keep your posture upright with a slight forward lean",
            "Land midfoot, not on your heels or toes",
            "Breathe rhythmically, inhale for 2-3 steps and exhale for 2-3 steps",
            "Cool down with a 5-minute walk at the end"
          ],
          variations: [
            {
              name: "Interval Running",
              description: "Alternate between periods of high-intensity running and recovery jogging or walking."
            },
            {
              name: "Long Distance Running",
              description: "Maintain a steady, sustainable pace for longer durations, typically over 5km."
            },
            {
              name: "Hill Running",
              description: "Incorporate uphill segments to increase intensity and build more strength in your legs."
            },
            {
              name: "Trail Running",
              description: "Run on natural terrain which adds variety and challenges your balance and coordination."
            }
          ],
          tips: [
            "Invest in good quality running shoes that match your foot type",
            "Stay hydrated before, during, and after your run",
            "Increase your distance gradually, no more than 10% per week",
            "Mix up your running routes to keep it interesting",
            "Listen to your body and take rest days when needed"
          ],
          caloriesBurnedPerHour: [
            { weight: "125 lbs (57 kg)", calories: 480 },
            { weight: "155 lbs (70 kg)", calories: 590 },
            { weight: "185 lbs (84 kg)", calories: 710 }
          ],
          image: "https://images.unsplash.com/photo-1486218119243-13883505764c?auto=format&fit=crop&w=640&q=80"
        },
        {
          type: "Cycling",
          description: "Cycling is a low-impact cardiovascular exercise that builds leg strength and improves heart health while being gentle on the joints.",
          benefits: [
            "Low-impact exercise that's easy on the joints",
            "Builds leg strength and muscle endurance",
            "Improves cardiovascular fitness",
            "Can be done indoors or outdoors",
            "Effective for weight management"
          ],
          instructions: [
            "Adjust your bike seat to hip height when standing next to it",
            "Start with a 5-minute easy pedaling warm-up",
            "Maintain a steady cadence (pedaling rhythm) of 70-90 rpm",
            "Keep your back straight but not rigid",
            "Look ahead, not down at your feet",
            "Cool down with 5 minutes of easy pedaling"
          ],
          variations: [
            {
              name: "Road Cycling",
              description: "Riding on paved roads using a road bike for speed and distance."
            },
            {
              name: "Mountain Biking",
              description: "Off-road cycling on varied terrain that challenges balance and technical skills."
            },
            {
              name: "Spin Class",
              description: "Indoor cycling class led by an instructor, often with music and varying intensities."
            },
            {
              name: "Cycle Commuting",
              description: "Using cycling as transportation to work or errands, combining exercise with daily activities."
            }
          ],
          tips: [
            "Wear a properly fitted helmet for safety",
            "Start with shorter rides and build up gradually",
            "Maintain proper tire pressure for optimal efficiency",
            "Stay hydrated, especially on longer rides",
            "Learn basic bike maintenance like fixing a flat tire"
          ],
          caloriesBurnedPerHour: [
            { weight: "125 lbs (57 kg)", calories: 420 },
            { weight: "155 lbs (70 kg)", calories: 520 },
            { weight: "185 lbs (84 kg)", calories: 620 }
          ],
          image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=640&q=80"
        },
        {
          type: "Swimming",
          description: "Swimming is a full-body, zero-impact exercise that builds endurance, muscle strength, and cardiovascular fitness while cooling you down.",
          benefits: [
            "Full-body workout that engages almost all major muscle groups",
            "Zero-impact exercise ideal for those with joint problems",
            "Improves cardiovascular endurance",
            "Increases flexibility and range of motion",
            "Helps with stress relief and relaxation"
          ],
          instructions: [
            "Start with a few water acclimation exercises at the shallow end",
            "Begin with a stroke you're comfortable with",
            "Focus on proper breathing technique (exhale underwater, inhale when your head is above water)",
            "Keep your body as horizontal as possible to reduce drag",
            "Use your core muscles to stabilize your body",
            "Finish with a cool-down of easy swimming or floating"
          ],
          variations: [
            {
              name: "Freestyle (Front Crawl)",
              description: "The fastest and most efficient swimming stroke, alternating arm movements with a flutter kick."
            },
            {
              name: "Breaststroke",
              description: "A slower stroke with simultaneous arm movements and a whip kick, good for beginners."
            },
            {
              name: "Backstroke",
              description: "Swimming on your back with alternating arm movements and a flutter kick."
            },
            {
              name: "Butterfly",
              description: "An advanced stroke with simultaneous arm movements and a dolphin kick, requiring significant upper body strength."
            }
          ],
          tips: [
            "Wear goggles to protect your eyes and improve visibility",
            "Take lessons if you're a beginner to learn proper technique",
            "Breathe out underwater to avoid swallowing water",
            "Start with shorter sessions (20-30 minutes) and gradually increase",
            "If in open water, never swim alone and be aware of water conditions"
          ],
          caloriesBurnedPerHour: [
            { weight: "125 lbs (57 kg)", calories: 360 },
            { weight: "155 lbs (70 kg)", calories: 440 },
            { weight: "185 lbs (84 kg)", calories: 530 }
          ],
          image: "https://images.unsplash.com/photo-1600965962-b23daebfd2a0?auto=format&fit=crop&w=640&q=80"
        },
        {
          type: "Jump Rope",
          description: "Jump rope is a high-impact, full-body exercise that improves coordination, builds cardiovascular endurance, and burns calories efficiently.",
          benefits: [
            "Burns calories quickly and efficiently",
            "Improves coordination and agility",
            "Portable and requires minimal equipment",
            "Enhances footwork and rhythm",
            "Strengthens bones and improves bone density"
          ],
          instructions: [
            "Hold the handles with a firm but relaxed grip",
            "Keep your elbows close to your sides",
            "Jump just high enough to clear the rope (about 1-2 inches)",
            "Land softly on the balls of your feet",
            "Keep your knees slightly bent",
            "Maintain good posture with a straight back and engaged core"
          ],
          variations: [
            {
              name: "Basic Jump",
              description: "The standard two-foot jump, landing on both feet simultaneously."
            },
            {
              name: "Alternate Foot Jump",
              description: "Similar to running in place, alternating which foot lands first."
            },
            {
              name: "Double Under",
              description: "The rope passes under your feet twice during one jump, requiring higher jumps and faster rope rotation."
            },
            {
              name: "Cross-Over",
              description: "Crossing your arms in front of your body as the rope passes under your feet."
            }
          ],
          tips: [
            "Start with a slightly heavier rope if you're a beginner",
            "Practice without the rope first to get the jumping motion down",
            "Start with short intervals (30-60 seconds) with rest periods in between",
            "Jump on a forgiving surface like a wooden floor or rubber mat",
            "Be patient – jump rope takes practice to master"
          ],
          caloriesBurnedPerHour: [
            { weight: "125 lbs (57 kg)", calories: 600 },
            { weight: "155 lbs (70 kg)", calories: 730 },
            { weight: "185 lbs (84 kg)", calories: 860 }
          ],
          image: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?auto=format&fit=crop&w=640&q=80"
        }
      ]
    },
    {
      name: "Strength",
      icon: Dumbbell,
      workouts: [
        {
          type: "Weight Training",
          description: "Weight training is a resistance exercise that builds muscle strength, increases bone density, and improves overall physical performance.",
          benefits: [
            "Builds muscle mass and strength",
            "Increases metabolism and fat burning",
            "Improves bone density and joint health",
            "Enhances physical performance for daily activities",
            "Prevents age-related muscle loss"
          ],
          instructions: [
            "Start with a proper warm-up of 5-10 minutes of light cardio",
            "Begin with lighter weights to practice proper form",
            "Breathe out during the exertion phase and in during the return phase",
            "Move through the full range of motion for each exercise",
            "Control the weight throughout the entire movement",
            "Rest 30-90 seconds between sets"
          ],
          variations: [
            {
              name: "Free Weights",
              description: "Using dumbbells, barbells or kettlebells for resistance with unrestricted movement patterns."
            },
            {
              name: "Machine Weights",
              description: "Using equipment with guided movement patterns, ideal for beginners learning proper form."
            },
            {
              name: "Bodyweight Exercises",
              description: "Using your own body weight for resistance (push-ups, pull-ups, dips, etc.)."
            },
            {
              name: "Circuit Training",
              description: "Performing a series of exercises with minimal rest between each to combine strength and cardio benefits."
            }
          ],
          tips: [
            "Focus on form over the amount of weight lifted",
            "Increase weight gradually to avoid injury",
            "Train different muscle groups on different days to allow for recovery",
            "Stay hydrated and ensure adequate protein intake for muscle recovery",
            "Incorporate compound exercises (working multiple muscle groups) for efficiency"
          ],
          caloriesBurnedPerHour: [
            { weight: "125 lbs (57 kg)", calories: 180 },
            { weight: "155 lbs (70 kg)", calories: 220 },
            { weight: "185 lbs (84 kg)", calories: 260 }
          ],
          image: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&w=640&q=80"
        },
        {
          type: "Push-ups",
          description: "Push-ups are a foundational bodyweight exercise that strengthen the chest, shoulders, triceps, and core with no equipment needed.",
          benefits: [
            "Builds upper body strength without equipment",
            "Engages multiple muscle groups simultaneously",
            "Improves core stability and posture",
            "Can be modified for any fitness level",
            "Versatile exercise that can be done anywhere"
          ],
          instructions: [
            "Start in a plank position with hands slightly wider than shoulder-width apart",
            "Keep your body in a straight line from head to heels",
            "Lower your body until your chest nearly touches the floor",
            "Keep your elbows at about a 45-degree angle to your body",
            "Push back up to the starting position",
            "Maintain a tight core throughout the movement"
          ],
          variations: [
            {
              name: "Knee Push-ups",
              description: "A modified version with knees on the ground, making it easier for beginners."
            },
            {
              name: "Incline Push-ups",
              description: "Hands elevated on a bench or step, reducing the amount of body weight you're pushing."
            },
            {
              name: "Decline Push-ups",
              description: "Feet elevated, increasing the challenge and focusing more on the upper chest and shoulders."
            },
            {
              name: "Diamond Push-ups",
              description: "Hands close together forming a diamond shape, emphasizing the triceps."
            }
          ],
          tips: [
            "Keep your neck in a neutral position, looking slightly ahead rather than down",
            "Don't let your hips sag or pike up; maintain a straight body line",
            "Start with modified versions if you can't perform standard push-ups with good form",
            "Breathe out as you push up, breathe in as you lower down",
            "To increase difficulty, slow down the movement or add a pause at the bottom"
          ],
          caloriesBurnedPerHour: [
            { weight: "125 lbs (57 kg)", calories: 240 },
            { weight: "155 lbs (70 kg)", calories: 290 },
            { weight: "185 lbs (84 kg)", calories: 350 }
          ],
          image: "https://images.unsplash.com/photo-1571019113536-1bfb1bf7d9a1?auto=format&fit=crop&w=640&q=80"
        },
        {
          type: "Squats",
          description: "Squats are a compound lower body exercise that build strength in the quadriceps, hamstrings, glutes, and core while improving mobility.",
          benefits: [
            "Strengthens multiple lower body muscles simultaneously",
            "Improves functional strength for everyday movements",
            "Increases core stability and balance",
            "Boosts mobility in hips, knees, and ankles",
            "Can be done with or without equipment"
          ],
          instructions: [
            "Stand with feet shoulder-width apart or slightly wider",
            "Keep your chest up and shoulders back",
            "Bend at the knees and hips, lowering as if sitting in a chair",
            "Keep knees in line with toes, not extending past them",
            "Lower until thighs are parallel to the ground (or as low as comfortable)",
            "Drive through your heels to return to standing position"
          ],
          variations: [
            {
              name: "Bodyweight Squats",
              description: "Using only your body weight, ideal for beginners and warm-ups."
            },
            {
              name: "Goblet Squats",
              description: "Holding a kettlebell or dumbbell at chest level, adding upper body engagement."
            },
            {
              name: "Barbell Back Squats",
              description: "With a barbell across your upper back, allowing for significant weight progression."
            },
            {
              name: "Split Squats",
              description: "With one foot forward and one back, working each leg more independently."
            }
          ],
          tips: [
            "Focus on proper form before adding weight",
            "Keep your weight in your heels to engage glutes properly",
            "Avoid rounding your back; maintain a neutral spine",
            "Start with box squats if you're concerned about depth or balance",
            "Warm up your hips, knees, and ankles before heavy squatting"
          ],
          caloriesBurnedPerHour: [
            { weight: "125 lbs (57 kg)", calories: 210 },
            { weight: "155 lbs (70 kg)", calories: 260 },
            { weight: "185 lbs (84 kg)", calories: 310 }
          ],
          image: "https://images.unsplash.com/photo-1567598508481-65985588e295?auto=format&fit=crop&w=640&q=80"
        },
        {
          type: "Deadlifts",
          description: "Deadlifts are a powerful compound movement that strengthens the posterior chain, including the back, glutes, and hamstrings, while building overall strength.",
          benefits: [
            "Develops total-body strength and power",
            "Strengthens the posterior chain (back, glutes, hamstrings)",
            "Improves posture and core stability",
            "Builds grip strength",
            "Enhances bone density"
          ],
          instructions: [
            "Stand with feet hip-width apart, with the barbell over midfoot",
            "Bend at the hips and knees to grab the bar with hands shoulder-width apart",
            "Keep chest up, back flat, and shoulders pulled back",
            "Drive through your heels, extending hips and knees to stand up",
            "Keep the bar close to your body throughout the movement",
            "Return the weight to the ground with controlled hip and knee flexion"
          ],
          variations: [
            {
              name: "Conventional Deadlift",
              description: "The standard form with feet hip-width apart and hands outside the legs."
            },
            {
              name: "Sumo Deadlift",
              description: "With a wider stance and hands inside the legs, emphasizing the inner thighs and glutes."
            },
            {
              name: "Romanian Deadlift",
              description: "Minimal knee bend, focusing on hip hinge movement to target hamstrings and glutes."
            },
            {
              name: "Single-Leg Deadlift",
              description: "Performed on one leg to improve balance and address strength imbalances."
            }
          ],
          tips: [
            "Start with lighter weights to master proper form",
            "Keep the bar close to your body to maintain leverage",
            "Engage your lats by 'pulling the bar into you'",
            "Avoid jerking the weight; lift with controlled movement",
            "Use a hip hinge movement rather than squatting the weight up"
          ],
          caloriesBurnedPerHour: [
            { weight: "125 lbs (57 kg)", calories: 240 },
            { weight: "155 lbs (70 kg)", calories: 300 },
            { weight: "185 lbs (84 kg)", calories: 360 }
          ],
          image: "https://images.unsplash.com/photo-1600026453346-a44501602a02?auto=format&fit=crop&w=640&q=80"
        }
      ]
    },
    {
      name: "Flexibility",
      icon: Activity,
      workouts: [
        {
          type: "Yoga",
          description: "Yoga combines physical postures, breathing techniques, and meditation to improve flexibility, strength, balance, and mental well-being.",
          benefits: [
            "Increases flexibility and range of motion",
            "Builds strength and balance",
            "Reduces stress and promotes relaxation",
            "Improves posture and body awareness",
            "Enhances breath control and mindfulness"
          ],
          instructions: [
            "Start with a few minutes of deep breathing to center yourself",
            "Move through poses with awareness of your breath",
            "Hold each pose while maintaining proper alignment",
            "Focus on the sensations in your body, not how the pose looks",
            "Use modifications or props if needed",
            "End with a period of relaxation in savasana (corpse pose)"
          ],
          variations: [
            {
              name: "Hatha Yoga",
              description: "A gentle practice focusing on basic postures and breathing, ideal for beginners."
            },
            {
              name: "Vinyasa Yoga",
              description: "A flowing, dynamic practice linking breath with movement."
            },
            {
              name: "Power Yoga",
              description: "A vigorous, fitness-based approach to vinyasa-style yoga."
            },
            {
              name: "Yin Yoga",
              description: "A slow-paced style holding poses for longer periods to target deep connective tissues."
            }
          ],
          tips: [
            "Practice on an empty stomach, 2-3 hours after eating",
            "Use a quality yoga mat for comfort and stability",
            "Listen to your body and avoid pushing into pain",
            "Focus on your breath throughout the practice",
            "Consistency is more important than intensity – even 10-15 minutes daily is beneficial"
          ],
          caloriesBurnedPerHour: [
            { weight: "125 lbs (57 kg)", calories: 240 },
            { weight: "155 lbs (70 kg)", calories: 300 },
            { weight: "185 lbs (84 kg)", calories: 360 }
          ],
          image: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&w=640&q=80"
        },
        {
          type: "Pilates",
          description: "Pilates is a low-impact exercise method that focuses on core strength, precise movements, and breath control to improve flexibility, posture, and overall fitness.",
          benefits: [
            "Strengthens the core muscles",
            "Improves posture and alignment",
            "Increases flexibility and joint mobility",
            "Enhances body awareness and control",
            "Gentle on joints while providing effective conditioning"
          ],
          instructions: [
            "Begin with proper positioning, typically lying on your back",
            "Engage your core by drawing your navel toward your spine",
            "Breathe deeply and rhythmically throughout the movements",
            "Focus on precise, controlled movements rather than speed or repetitions",
            "Maintain proper alignment throughout each exercise",
            "End with gentle stretching and relaxation"
          ],
          variations: [
            {
              name: "Mat Pilates",
              description: "Classical Pilates exercises performed on a mat with no or minimal equipment."
            },
            {
              name: "Reformer Pilates",
              description: "Exercises performed on a specialized machine with springs and pulleys for resistance."
            },
            {
              name: "Clinical Pilates",
              description: "Modified exercises designed for rehabilitation and specific physical conditions."
            },
            {
              name: "Contemporary Pilates",
              description: "Incorporates modern exercise science and additional movements beyond the traditional method."
            }
          ],
          tips: [
            "Focus on quality of movement rather than quantity of repetitions",
            "Keep your movements slow and controlled",
            "Engage your core throughout the entire session",
            "Connect your breath to your movements",
            "Start with beginner classes or tutorials if you're new to Pilates"
          ],
          caloriesBurnedPerHour: [
            { weight: "125 lbs (57 kg)", calories: 180 },
            { weight: "155 lbs (70 kg)", calories: 220 },
            { weight: "185 lbs (84 kg)", calories: 260 }
          ],
          image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=640&q=80"
        },
        {
          type: "Stretching",
          description: "Stretching improves flexibility, range of motion, and circulation while reducing muscle tension and injury risk through controlled lengthening of muscles and tendons.",
          benefits: [
            "Increases flexibility and range of motion",
            "Improves circulation to muscles and joints",
            "Reduces muscle tension and soreness",
            "Decreases risk of injury during other activities",
            "Enhances overall movement efficiency"
          ],
          instructions: [
            "Warm up before stretching with 5-10 minutes of light activity",
            "Ease into each stretch slowly, avoiding bouncing",
            "Hold static stretches for 15-60 seconds",
            "Breathe deeply and relax into the stretch",
            "Stretch to the point of mild tension, not pain",
            "Stretch both sides of the body equally"
          ],
          variations: [
            {
              name: "Static Stretching",
              description: "Holding a stretch position for a period of time without movement."
            },
            {
              name: "Dynamic Stretching",
              description: "Moving parts of your body through a full range of motion, ideal before workouts."
            },
            {
              name: "PNF Stretching (Proprioceptive Neuromuscular Facilitation)",
              description: "Combining stretching and contracting of muscle groups, often with a partner."
            },
            {
              name: "Active Isolated Stretching",
              description: "Holding each stretch for 1-2 seconds before releasing and repeating, using the opposing muscle group."
            }
          ],
          tips: [
            "Never stretch cold muscles; always warm up first",
            "Be consistent – daily stretching yields better results than occasional sessions",
            "Focus on major muscle groups and any areas of particular tightness",
            "For post-workout stretching, wait until breathing has returned to normal",
            "Combine different types of stretching for best results"
          ],
          caloriesBurnedPerHour: [
            { weight: "125 lbs (57 kg)", calories: 120 },
            { weight: "155 lbs (70 kg)", calories: 150 },
            { weight: "185 lbs (84 kg)", calories: 180 }
          ],
          image: "https://images.unsplash.com/photo-1566241142559-40e1dab266d6?auto=format&fit=crop&w=640&q=80"
        }
      ]
    },
    {
      name: "HIIT",
      icon: Zap,
      workouts: [
        {
          type: "HIIT Training",
          description: "High-Intensity Interval Training (HIIT) alternates short bursts of intense exercise with recovery periods to maximize calorie burn and improve cardiovascular fitness in less time.",
          benefits: [
            "Burns more calories in less time",
            "Continues burning calories after workout (afterburn effect)",
            "Improves cardiovascular health and endurance",
            "Preserves muscle while burning fat",
            "Can be adapted for all fitness levels"
          ],
          instructions: [
            "Begin with a 5-minute dynamic warm-up",
            "Perform the high-intensity exercise at near-maximum effort",
            "Follow with a recovery period of lower intensity",
            "Repeat the work/recovery cycle for the desired number of rounds",
            "Maintain proper form even when fatigued",
            "Finish with a 5-minute cool-down"
          ],
          variations: [
            {
              name: "Tabata Protocol",
              description: "20 seconds of ultra-high intensity followed by 10 seconds of rest, repeated 8 times (4 minutes total)."
            },
            {
              name: "30-30 Method",
              description: "30 seconds of high intensity work followed by 30 seconds of recovery."
            },
            {
              name: "EMOM (Every Minute On the Minute)",
              description: "Performing a set number of reps at the start of every minute, with the remaining time as recovery."
            },
            {
              name: "Circuit HIIT",
              description: "Rotating through several different exercises with minimal rest between stations."
            }
          ],
          tips: [
            "Start with longer recovery periods if you're a beginner",
            "Focus on quality movements rather than speed",
            "Use a timer app or watch to track intervals accurately",
            "Include both cardio and strength exercises for maximum benefit",
            "Listen to your body and scale intensity as needed"
          ],
          caloriesBurnedPerHour: [
            { weight: "125 lbs (57 kg)", calories: 480 },
            { weight: "155 lbs (70 kg)", calories: 600 },
            { weight: "185 lbs (84 kg)", calories: 710 }
          ],
          image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=640&q=80"
        },
        {
          type: "Tabata",
          description: "Tabata is a specific form of HIIT that involves 20 seconds of maximum effort followed by 10 seconds of rest, repeated for 8 rounds (4 minutes total).",
          benefits: [
            "Extremely time-efficient workout (can be completed in 4 minutes)",
            "Improves both aerobic and anaerobic fitness simultaneously",
            "Significantly increases metabolism for hours after exercise",
            "Adaptable to many different exercises and fitness levels",
            "Requires minimal or no equipment"
          ],
          instructions: [
            "Choose one exercise or prepare a sequence of exercises",
            "Warm up for 5 minutes with light activity",
            "Work at maximum intensity for 20 seconds",
            "Rest for 10 seconds",
            "Repeat for a total of 8 rounds (4 minutes)",
            "Cool down for 5 minutes after completing all rounds"
          ],
          variations: [
            {
              name: "Single Exercise Tabata",
              description: "Using the same exercise for all 8 rounds, such as burpees or mountain climbers."
            },
            {
              name: "Alternating Tabata",
              description: "Switching between two exercises, alternating each round."
            },
            {
              name: "Full Body Tabata",
              description: "Using a different exercise for each round to target various muscle groups."
            },
            {
              name: "Progressive Tabata",
              description: "Completing multiple 4-minute Tabata protocols with short rests between each."
            }
          ],
          tips: [
            "Choose exercises you can perform with good form even when fatigued",
            "Use a Tabata timer app to track the precise intervals",
            "Start with less intense versions if you're new to high-intensity training",
            "Focus on maximum effort relative to your fitness level",
            "Allow adequate recovery (at least 24 hours) before repeating a Tabata workout"
          ],
          caloriesBurnedPerHour: [
            { weight: "125 lbs (57 kg)", calories: 540 },
            { weight: "155 lbs (70 kg)", calories: 660 },
            { weight: "185 lbs (84 kg)", calories: 780 }
          ],
          image: "https://images.unsplash.com/photo-1547919307-1b1844ba7e8a?auto=format&fit=crop&w=640&q=80"
        }
      ]
    },
    {
      name: "Group Classes",
      icon: Users,
      workouts: [
        {
          type: "Zumba",
          description: "Zumba is a dance fitness program that combines Latin and international music with dance moves for a fun, energetic workout that feels more like a party than exercise.",
          benefits: [
            "Burns calories through continuous movement",
            "Improves coordination and rhythm",
            "Boosts mood through music and dance",
            "Provides a social, supportive workout environment",
            "Accessible to various fitness levels and ages"
          ],
          instructions: [
            "Follow the instructor's lead for basic steps",
            "Move to the beat of the music",
            "Focus on having fun rather than perfect execution",
            "Exaggerate movements to increase intensity",
            "Add your own style and personality to the movements",
            "Stay hydrated throughout the class"
          ],
          variations: [
            {
              name: "Zumba Fitness",
              description: "The standard class combining fast and slow rhythms for a calorie-burning dance workout."
            },
            {
              name: "Zumba Toning",
              description: "Incorporates light weights to add resistance training while dancing."
            },
            {
              name: "Aqua Zumba",
              description: "Performed in water, adding resistance while reducing impact on joints."
            },
            {
              name: "Strong by Zumba",
              description: "A more intense workout syncing body-weight exercises to music."
            }
          ],
          tips: [
            "Wear comfortable clothes that allow free movement",
            "Use supportive shoes designed for dance or cross-training",
            "Position yourself where you can clearly see the instructor",
            "Modify movements to match your fitness level",
            "Stay for the whole class, including warm-up and cool-down"
          ],
          caloriesBurnedPerHour: [
            { weight: "125 lbs (57 kg)", calories: 360 },
            { weight: "155 lbs (70 kg)", calories: 440 },
            { weight: "185 lbs (84 kg)", calories: 530 }
          ],
          image: "https://images.unsplash.com/photo-1576084737210-5f2594f85b1b?auto=format&fit=crop&w=640&q=80"
        },
        {
          type: "Spin Class",
          description: "Spin classes are high-energy indoor cycling workouts led by instructors who guide participants through simulated terrain and varying intensities set to motivating music.",
          benefits: [
            "Provides an intense cardiovascular workout",
            "Low-impact exercise that's gentle on joints",
            "Burns significant calories in a group setting",
            "Builds lower body strength and endurance",
            "Group energy and music enhance motivation"
          ],
          instructions: [
            "Arrive early to set up your bike properly with instructor help",
            "Adjust seat height so knees are slightly bent at the bottom of pedal stroke",
            "Follow the instructor's cues for resistance and speed",
            "Maintain proper posture: core engaged, back flat, shoulders relaxed",
            "Adapt intensity to your fitness level when needed",
            "Stay hydrated throughout the class"
          ],
          variations: [
            {
              name: "Rhythm-Based Classes",
              description: "Focuses on riding to the beat of the music with choreographed movements."
            },
            {
              name: "Performance-Based Classes",
              description: "Emphasizes metrics like power, distance, and heart rate zones."
            },
            {
              name: "Hybrid Classes",
              description: "Combines cycling with other exercises like weight training or core work."
            },
            {
              name: "Virtual Classes",
              description: "Following digital instructors or scenic routes on screens."
            }
          ],
          tips: [
            "Wear padded cycling shorts or use a gel seat cover for comfort",
            "Bring a towel and water bottle to every class",
            "Don't be afraid to adjust resistance to your ability level",
            "Focus on proper form rather than keeping up with the fastest riders",
            "Build stamina gradually if you're new to spinning"
          ],
          caloriesBurnedPerHour: [
            { weight: "125 lbs (57 kg)", calories: 480 },
            { weight: "155 lbs (70 kg)", calories: 590 },
            { weight: "185 lbs (84 kg)", calories: 710 }
          ],
          image: "https://images.unsplash.com/photo-1586401100295-7a8096fd231a?auto=format&fit=crop&w=640&q=80"
        }
      ]
    }
  ];

  const handleWorkoutClick = (workout: WorkoutDetailProps) => {
    setSelectedWorkout(workout);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container px-4 py-8">
      <SectionHeader
        title="Fitness Tracker"
        description="Track your workouts, set goals, and improve your fitness level"
        align="left"
      />
      
      {selectedWorkout ? (
        <div className="space-y-6">
          <Button
            variant="ghost"
            size="sm"
            className="mb-4"
            onClick={() => setSelectedWorkout(null)}
          >
            ← Back to workouts
          </Button>
          
          <WorkoutDetail {...selectedWorkout} />
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="workouts" className="space-y-6">
              <TabsList>
                <TabsTrigger value="workouts">Workouts</TabsTrigger>
                <TabsTrigger value="programs">Programs</TabsTrigger>
                <TabsTrigger value="goals">Goals</TabsTrigger>
              </TabsList>
              
              <TabsContent value="workouts" className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Recent Workouts</h2>
                  <Button variant="outline" size="sm">View All</Button>
                </div>
                
                <div className="space-y-3">
                  {exercises.map((exercise, i) => (
                    <Exercise key={i} {...exercise} />
                  ))}
                </div>
                
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Workout Categories</h2>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {workoutCategories.map((category, i) => (
                      <Dialog key={i}>
                        <DialogTrigger asChild>
                          <Card className="cursor-pointer hover:border-primary/50 transition-colors">
                            <CardHeader className="p-4 flex flex-row items-center gap-3">
                              <div className="bg-primary/10 p-2.5 rounded-full">
                                <category.icon className="h-5 w-5 text-primary" />
                              </div>
                              <CardTitle className="text-lg">{category.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="pb-4 pt-0 px-4">
                              <p className="text-sm text-muted-foreground">
                                {category.workouts.length} workout{category.workouts.length !== 1 ? 's' : ''}
                              </p>
                            </CardContent>
                          </Card>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              <category.icon className="h-5 w-5" />
                              {category.name} Workouts
                            </DialogTitle>
                            <DialogDescription>
                              Select a workout to see detailed information and instructions
                            </DialogDescription>
                          </DialogHeader>
                          <ScrollArea className="h-[60vh]">
                            <div className="grid gap-4 pb-4">
                              {category.workouts.map((workout, j) => (
                                <div 
                                  key={j} 
                                  className="flex gap-4 p-3 border rounded-lg cursor-pointer hover:border-primary/50"
                                  onClick={() => {
                                    handleWorkoutClick(workout);
                                    const dialogCloseButton = document.querySelector('[data-state="open"] button[data-radix-collection-item]');
                                    if (dialogCloseButton && dialogCloseButton instanceof HTMLElement) {
                                      dialogCloseButton.click();
                                    }
                                  }}
                                >
                                  <img 
                                    src={workout.image} 
                                    alt={workout.type} 
                                    className="w-20 h-20 object-cover rounded-md"
                                  />
                                  <div className="flex-1">
                                    <h3 className="font-medium">{workout.type}</h3>
                                    <p className="text-sm text-muted-foreground line-clamp-2">{workout.description}</p>
                                    <div className="flex flex-wrap gap-1 mt-2">
                                      <Badge variant="outline" className="text-xs">
                                        {workout.caloriesBurnedPerHour[1].calories} cal/hr
                                      </Badge>
                                      <Badge variant="secondary" className="text-xs">
                                        {workout.benefits.length} benefits
                                      </Badge>
                                    </div>
                                  </div>
                                  <Button variant="ghost" size="icon">
                                    <ChevronRight className="h-5 w-5" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </ScrollArea>
                        </DialogContent>
                      </Dialog>
                    ))}
                  </div>
                </div>
                
                <Button className="w-full">
                  Start New Workout
                </Button>
              </TabsContent>
              
              <TabsContent value="programs" className="animate-fade-in">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Card className="p-6 flex flex-col items-center text-center">
                    <div className="bg-primary/10 p-3 rounded-full mb-4">
                      <Dumbbell className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">7-Day Strength Challenge</h3>
                    <p className="text-muted-foreground mb-4">Build muscle and increase strength with this 7-day program</p>
                    <Button className="mt-auto">Start Program</Button>
                  </Card>
                  
                  <Card className="p-6 flex flex-col items-center text-center">
                    <div className="bg-primary/10 p-3 rounded-full mb-4">
                      <Heart className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Cardio Boost</h3>
                    <p className="text-muted-foreground mb-4">Improve endurance and heart health with targeted cardio</p>
                    <Button className="mt-auto">Start Program</Button>
                  </Card>
                  
                  <Card className="p-6 flex flex-col items-center text-center">
                    <div className="bg-primary/10 p-3 rounded-full mb-4">
                      <Activity className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">30-Day Flexibility Journey</h3>
                    <p className="text-muted-foreground mb-4">Improve your flexibility and mobility in just 30 days</p>
                    <Button className="mt-auto">Start Program</Button>
                  </Card>
                  
                  <Card className="p-6 flex flex-col items-center text-center">
                    <div className="bg-primary/10 p-3 rounded-full mb-4">
                      <Zap className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">HIIT Fat Burner</h3>
                    <p className="text-muted-foreground mb-4">High-intensity interval training to maximize calorie burn</p>
                    <Button className="mt-auto">Start Program</Button>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="goals" className="animate-fade-in">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Weekly Workout Goal</h3>
                      <span className="text-sm font-medium">3/5 days</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Monthly Running Distance</h3>
                      <span className="text-sm font-medium">12/20 km</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Strength Training Sessions</h3>
                      <span className="text-sm font-medium">5/8 sessions</span>
                    </div>
                    <Progress value={62.5} className="h-2" />
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    Set New Goal
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-lg">Today's Activity</h3>
                <Button variant="ghost" size="sm" className="gap-1">
                  Week <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Flame className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="font-medium">Calories Burned</span>
                      <span className="font-medium">420</span>
                    </div>
                    <Progress value={42} className="h-1 mt-2" />
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="font-medium">Active Time</span>
                      <span className="font-medium">45 min</span>
                    </div>
                    <Progress value={37.5} className="h-1 mt-2" />
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <BarChart className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="font-medium">Heart Rate (avg)</span>
                      <span className="font-medium">118 bpm</span>
                    </div>
                    <Progress value={55} className="h-1 mt-2" />
                  </div>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Trophy className="h-5 w-5 text-amber-500" />
                <h3 className="font-medium text-lg">Achievements</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">5-Day Streak</div>
                    <div className="text-sm text-muted-foreground">Keep going!</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Flame className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">1000 Calories Burned</div>
                    <div className="text-sm text-muted-foreground">This week</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Timer className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">10 Hours Active</div>
                    <div className="text-sm text-muted-foreground">This month</div>
                  </div>
                </div>
              </div>
              
              <Button variant="ghost" className="w-full mt-4">
                View All Achievements
              </Button>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <PlusCircle className="h-5 w-5 text-primary" />
                <h3 className="font-medium text-lg">Quick Add</h3>
              </div>
              
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Clock className="mr-2 h-4 w-4" />
                  Log Workout
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Activity className="mr-2 h-4 w-4" />
                  Track Progress
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Session
                </Button>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default FitnessPage;
