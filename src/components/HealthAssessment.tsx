
import { useState } from "react";
import { CheckCircle, ChevronRight, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: number;
  text: string;
  options: {
    id: string;
    text: string;
    value: number;
  }[];
}

interface AssessmentProps {
  onComplete: (score: number, maxScore: number) => void;
}

const questions: Question[] = [
  {
    id: 1,
    text: "How would you rate your overall physical health?",
    options: [
      { id: "excellent", text: "Excellent", value: 5 },
      { id: "good", text: "Good", value: 4 },
      { id: "fair", text: "Fair", value: 3 },
      { id: "poor", text: "Poor", value: 1 },
    ],
  },
  {
    id: 2,
    text: "How often do you engage in physical activity for at least 30 minutes?",
    options: [
      { id: "daily", text: "Daily", value: 5 },
      { id: "several_times", text: "Several times a week", value: 4 },
      { id: "once_week", text: "Once a week", value: 3 },
      { id: "few_times_month", text: "A few times a month", value: 2 },
      { id: "rarely", text: "Rarely or never", value: 1 },
    ],
  },
  {
    id: 3,
    text: "How would you describe your diet?",
    options: [
      { id: "excellent", text: "Very balanced with plenty of fruits and vegetables", value: 5 },
      { id: "good", text: "Generally balanced", value: 4 },
      { id: "fair", text: "Somewhat balanced with occasional unhealthy choices", value: 3 },
      { id: "poor", text: "Often unbalanced with many unhealthy choices", value: 2 },
      { id: "very_poor", text: "Mostly unhealthy", value: 1 },
    ],
  },
  {
    id: 4,
    text: "How many hours of sleep do you typically get each night?",
    options: [
      { id: "optimal", text: "7-9 hours", value: 5 },
      { id: "adequate", text: "6-7 hours", value: 4 },
      { id: "little", text: "5-6 hours", value: 3 },
      { id: "very_little", text: "Less than 5 hours", value: 2 },
      { id: "too_much", text: "More than 9 hours", value: 3 },
    ],
  },
  {
    id: 5,
    text: "How often do you experience high levels of stress?",
    options: [
      { id: "rarely", text: "Rarely or never", value: 5 },
      { id: "sometimes", text: "Sometimes", value: 4 },
      { id: "often", text: "Often", value: 2 },
      { id: "daily", text: "Daily", value: 1 },
    ],
  },
  {
    id: 6,
    text: "Do you have a family history of any of the following conditions?",
    options: [
      { id: "none", text: "None", value: 5 },
      { id: "one", text: "One condition (diabetes, heart disease, cancer, etc.)", value: 3 },
      { id: "multiple", text: "Multiple conditions", value: 1 },
    ],
  },
  {
    id: 7,
    text: "How often do you consume alcoholic beverages?",
    options: [
      { id: "never", text: "Never", value: 5 },
      { id: "occasionally", text: "Occasionally", value: 4 },
      { id: "weekly", text: "Weekly", value: 3 },
      { id: "several_weekly", text: "Several times a week", value: 2 },
      { id: "daily", text: "Daily", value: 1 },
    ],
  },
  {
    id: 8,
    text: "Do you smoke or use tobacco products?",
    options: [
      { id: "never", text: "Never", value: 5 },
      { id: "quit", text: "Previously but quit", value: 4 },
      { id: "occasionally", text: "Occasionally", value: 2 },
      { id: "regularly", text: "Regularly", value: 1 },
    ],
  },
  {
    id: 9,
    text: "When was your last comprehensive health check-up?",
    options: [
      { id: "six_months", text: "Within the last 6 months", value: 5 },
      { id: "year", text: "Within the last year", value: 4 },
      { id: "two_years", text: "Within the last 2 years", value: 3 },
      { id: "more_years", text: "More than 2 years ago", value: 2 },
      { id: "never", text: "Never had one", value: 1 },
    ],
  },
  {
    id: 10,
    text: "How would you rate your mental health?",
    options: [
      { id: "excellent", text: "Excellent", value: 5 },
      { id: "good", text: "Good", value: 4 },
      { id: "fair", text: "Fair", value: 3 },
      { id: "poor", text: "Poor", value: 2 },
      { id: "very_poor", text: "Very poor", value: 1 },
    ],
  },
];

export const HealthAssessment = ({ onComplete }: AssessmentProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [score, setScore] = useState(0);
  const { toast } = useToast();

  const handleAnswer = (questionId: number, optionId: string, value: number) => {
    setAnswers({
      ...answers,
      [questionId]: optionId,
    });
    setScore(score + value);
  };

  const handleNext = () => {
    if (!answers[questions[currentQuestion].id]) {
      toast({
        title: "Please select an answer",
        description: "You need to select an option before proceeding",
        variant: "destructive",
      });
      return;
    }
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate max possible score
      const maxScore = questions.reduce((sum, question) => {
        const maxOptionValue = Math.max(...question.options.map(option => option.value));
        return sum + maxOptionValue;
      }, 0);
      
      onComplete(score, maxScore);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Health Risk Assessment</CardTitle>
        <CardDescription>
          Question {currentQuestion + 1} of {questions.length}
        </CardDescription>
        <Progress value={progress} className="h-2 mt-2" />
      </CardHeader>
      <CardContent>
        <h3 className="text-lg font-medium mb-4">{question.text}</h3>
        <RadioGroup className="space-y-3">
          {question.options.map((option) => (
            <div key={option.id} className="flex items-center space-x-2 border p-3 rounded-md hover:bg-muted/50">
              <RadioGroupItem
                id={option.id}
                value={option.id}
                checked={answers[question.id] === option.id}
                onClick={() => handleAnswer(question.id, option.id, option.value)}
              />
              <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                {option.text}
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
        <Button onClick={handleNext}>
          {currentQuestion < questions.length - 1 ? (
            <>
              Next <ChevronRight className="ml-1 h-4 w-4" />
            </>
          ) : (
            "Complete Assessment"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default HealthAssessment;
