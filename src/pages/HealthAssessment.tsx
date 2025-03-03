
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, AlertTriangle, ArrowRight, BarChart3 } from "lucide-react";

interface Question {
  id: number;
  text: string;
  options: {
    value: string;
    label: string;
    score: number;
  }[];
}

const healthQuestions: Question[] = [
  {
    id: 1,
    text: "How many days per week do you engage in at least 30 minutes of moderate physical activity?",
    options: [
      { value: "0", label: "0 days", score: 0 },
      { value: "1-2", label: "1-2 days", score: 1 },
      { value: "3-4", label: "3-4 days", score: 2 },
      { value: "5+", label: "5 or more days", score: 3 },
    ],
  },
  {
    id: 2,
    text: "How many servings of fruits and vegetables do you eat on an average day?",
    options: [
      { value: "0-1", label: "0-1 servings", score: 0 },
      { value: "2-3", label: "2-3 servings", score: 1 },
      { value: "4-5", label: "4-5 servings", score: 2 },
      { value: "5+", label: "More than 5 servings", score: 3 },
    ],
  },
  {
    id: 3,
    text: "How would you rate your stress level on an average day?",
    options: [
      { value: "high", label: "High - I feel overwhelmed regularly", score: 0 },
      { value: "moderate", label: "Moderate - I feel stressed but can manage", score: 1 },
      { value: "low", label: "Low - I rarely feel stressed", score: 3 },
    ],
  },
  {
    id: 4,
    text: "How would you rate your sleep quality?",
    options: [
      { value: "poor", label: "Poor - I rarely get good sleep", score: 0 },
      { value: "fair", label: "Fair - I sometimes get good sleep", score: 1 },
      { value: "good", label: "Good - I usually sleep well", score: 2 },
      { value: "excellent", label: "Excellent - I consistently sleep well", score: 3 },
    ],
  },
  {
    id: 5,
    text: "Do you smoke or use tobacco products?",
    options: [
      { value: "regularly", label: "Yes, regularly", score: 0 },
      { value: "occasionally", label: "Yes, occasionally", score: 1 },
      { value: "former", label: "No, but I used to", score: 2 },
      { value: "never", label: "No, never", score: 3 },
    ],
  },
  {
    id: 6,
    text: "How often do you consume alcoholic beverages?",
    options: [
      { value: "daily", label: "Daily or almost daily", score: 0 },
      { value: "weekly", label: "Weekly (1-3 times per week)", score: 1 },
      { value: "occasionally", label: "Occasionally (1-3 times per month)", score: 2 },
      { value: "never", label: "Rarely or never", score: 3 },
    ],
  },
  {
    id: 7,
    text: "When was your last preventive health check-up or physical exam?",
    options: [
      { value: "never", label: "Never or can't remember", score: 0 },
      { value: "more-than-2-years", label: "More than 2 years ago", score: 1 },
      { value: "1-2-years", label: "1-2 years ago", score: 2 },
      { value: "within-year", label: "Within the last year", score: 3 },
    ],
  },
  {
    id: 8,
    text: "How would you rate your overall energy level?",
    options: [
      { value: "low", label: "Low - I'm often tired", score: 0 },
      { value: "moderate", label: "Moderate - Sometimes energetic, sometimes tired", score: 1 },
      { value: "high", label: "High - I'm generally energetic", score: 3 },
    ],
  },
  {
    id: 9,
    text: "Do you have any chronic health conditions (e.g., diabetes, hypertension, heart disease)?",
    options: [
      { value: "multiple", label: "Yes, multiple conditions", score: 0 },
      { value: "one", label: "Yes, one condition", score: 1 },
      { value: "managed", label: "Yes, but well-managed", score: 2 },
      { value: "none", label: "No chronic conditions", score: 3 },
    ],
  },
  {
    id: 10,
    text: "How often do you practice mindfulness, meditation, or other stress-reduction techniques?",
    options: [
      { value: "never", label: "Never", score: 0 },
      { value: "rarely", label: "Rarely (a few times a year)", score: 1 },
      { value: "sometimes", label: "Sometimes (a few times a month)", score: 2 },
      { value: "regularly", label: "Regularly (weekly or more)", score: 3 },
    ],
  },
];

const HealthAssessmentPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{[key: number]: string}>({});
  const [scores, setScores] = useState<{[key: number]: number}>({});
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();

  const handleAnswer = (questionId: number, option: string, score: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: option }));
    setScores(prev => ({ ...prev, [questionId]: score }));
  };

  const handleNext = () => {
    if (currentQuestion < healthQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResults(true);
      toast({
        title: "Assessment Complete",
        description: "Your health assessment has been successfully completed.",
      });
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setScores({});
    setShowResults(false);
  };

  const calculateTotalScore = () => {
    return Object.values(scores).reduce((acc, score) => acc + score, 0);
  };

  const getMaxPossibleScore = () => {
    return healthQuestions.reduce((acc, question) => {
      const maxScore = Math.max(...question.options.map(opt => opt.score));
      return acc + maxScore;
    }, 0);
  };

  const getScorePercentage = () => {
    const totalScore = calculateTotalScore();
    const maxScore = getMaxPossibleScore();
    return (totalScore / maxScore) * 100;
  };

  const getHealthRating = () => {
    const percentage = getScorePercentage();
    
    if (percentage >= 80) {
      return {
        rating: "Excellent",
        description: "You're maintaining excellent health habits! Keep up the great work.",
        icon: <CheckCircle className="h-8 w-8 text-green-500" />,
        color: "text-green-500"
      };
    } else if (percentage >= 60) {
      return {
        rating: "Good",
        description: "You have good health habits with some room for improvement.",
        icon: <CheckCircle className="h-8 w-8 text-blue-500" />,
        color: "text-blue-500"
      };
    } else if (percentage >= 40) {
      return {
        rating: "Fair",
        description: "Your health habits need attention in several areas.",
        icon: <AlertTriangle className="h-8 w-8 text-amber-500" />,
        color: "text-amber-500"
      };
    } else {
      return {
        rating: "Needs Improvement",
        description: "Consider making significant changes to improve your health outcomes.",
        icon: <AlertTriangle className="h-8 w-8 text-red-500" />,
        color: "text-red-500"
      };
    }
  };

  const getRecommendations = () => {
    const percentage = getScorePercentage();
    const recommendations = [];

    // Check low physical activity
    if (scores[1] <= 1) {
      recommendations.push("Try to increase your physical activity to at least 150 minutes per week.");
    }

    // Check poor nutrition
    if (scores[2] <= 1) {
      recommendations.push("Add more fruits and vegetables to your diet, aiming for 5+ servings daily.");
    }

    // Check high stress
    if (scores[3] === 0) {
      recommendations.push("Consider incorporating stress reduction techniques like meditation or yoga.");
    }

    // Check poor sleep
    if (scores[4] <= 1) {
      recommendations.push("Improve your sleep habits by maintaining a regular sleep schedule.");
    }

    // Check smoking
    if (scores[5] <= 1) {
      recommendations.push("Consider reducing or quitting tobacco use with professional support.");
    }

    // Check preventive care
    if (scores[7] <= 1) {
      recommendations.push("Schedule a preventive health check-up if you haven't had one in the past year.");
    }

    if (recommendations.length === 0) {
      if (percentage >= 80) {
        recommendations.push("Maintain your excellent health habits!");
      } else {
        recommendations.push("Continue to work on improving your overall health habits.");
      }
    }

    return recommendations;
  };

  const question = healthQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / healthQuestions.length) * 100;

  return (
    <div className="container py-8 max-w-4xl mx-auto">
      <SectionHeader
        title="Health Risk Assessment"
        description="Evaluate your health habits and receive personalized recommendations"
        align="center"
      />

      {!showResults ? (
        <Card className="mt-6">
          <CardHeader>
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm font-medium">
                Question {currentQuestion + 1} of {healthQuestions.length}
              </div>
              <div className="text-sm text-muted-foreground">
                {progress.toFixed(0)}% Complete
              </div>
            </div>
            <Progress value={progress} className="h-2" />
            <CardTitle className="text-xl mt-4">{question.text}</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup 
              value={answers[question.id] || ""} 
              className="space-y-3"
              onValueChange={(value) => {
                const selectedOption = question.options.find(opt => opt.value === value);
                if (selectedOption) {
                  handleAnswer(question.id, value, selectedOption.score);
                }
              }}
            >
              {question.options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2 border p-3 rounded-md hover:bg-accent/50 transition-colors">
                  <RadioGroupItem value={option.value} id={`option-${option.value}`} />
                  <Label htmlFor={`option-${option.value}`} className="flex-1 cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            <Button 
              onClick={handleNext}
              disabled={!answers[question.id]}
              className="gap-1"
            >
              {currentQuestion < healthQuestions.length - 1 ? "Next" : "Complete"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-2xl">Your Health Assessment Results</CardTitle>
              <CardDescription className="text-center">
                Based on your responses, here's an evaluation of your health habits
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center justify-center">
                <div className="relative h-32 w-32">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold">{getScorePercentage().toFixed(0)}%</span>
                  </div>
                  <svg viewBox="0 0 100 100" className="h-full w-full rotate-[-90deg]">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      className="fill-none stroke-muted-foreground/20 stroke-[10]"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      className="fill-none stroke-primary stroke-[10]"
                      strokeDasharray="251.2"
                      strokeDashoffset={251.2 - (251.2 * getScorePercentage()) / 100}
                    />
                  </svg>
                </div>
                <div className="mt-4 text-center">
                  <h3 className={`text-2xl font-bold ${getHealthRating().color}`}>
                    {getHealthRating().rating}
                  </h3>
                  <p className="text-muted-foreground">{getHealthRating().description}</p>
                </div>
              </div>

              <div className="border rounded-lg p-4 bg-accent/10">
                <h3 className="font-bold text-lg mb-2 flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Health Breakdown
                </h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Physical Activity</span>
                      <span className="font-medium">{scores[1] !== undefined ? (scores[1] / 3 * 100).toFixed(0) : 0}%</span>
                    </div>
                    <Progress value={scores[1] !== undefined ? (scores[1] / 3 * 100) : 0} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Nutrition</span>
                      <span className="font-medium">{scores[2] !== undefined ? (scores[2] / 3 * 100).toFixed(0) : 0}%</span>
                    </div>
                    <Progress value={scores[2] !== undefined ? (scores[2] / 3 * 100) : 0} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Stress Management</span>
                      <span className="font-medium">{scores[3] !== undefined ? (scores[3] / 3 * 100).toFixed(0) : 0}%</span>
                    </div>
                    <Progress value={scores[3] !== undefined ? (scores[3] / 3 * 100) : 0} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Sleep Quality</span>
                      <span className="font-medium">{scores[4] !== undefined ? (scores[4] / 3 * 100).toFixed(0) : 0}%</span>
                    </div>
                    <Progress value={scores[4] !== undefined ? (scores[4] / 3 * 100) : 0} className="h-2" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2">Recommendations</h3>
                <ul className="space-y-2">
                  {getRecommendations().map((recommendation, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleReset} className="w-full">Take Assessment Again</Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default HealthAssessmentPage;
