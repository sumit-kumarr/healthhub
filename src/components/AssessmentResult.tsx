
import { CheckCircle, AlertCircle, Activity, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ResultProps {
  score: number;
  maxScore: number;
  onReset: () => void;
}

export const AssessmentResult = ({ score, maxScore, onReset }: ResultProps) => {
  const percentage = Math.round((score / maxScore) * 100);
  
  const getResultCategory = () => {
    if (percentage >= 80) {
      return {
        category: "Excellent",
        description: "Your responses indicate excellent health practices and minimal health risks.",
        icon: <CheckCircle className="h-8 w-8 text-green-500" />,
        color: "text-green-500",
        recommendations: [
          "Continue your current health practices",
          "Schedule regular check-ups to maintain your health",
          "Consider helping others adopt similar healthy habits"
        ]
      };
    } else if (percentage >= 60) {
      return {
        category: "Good",
        description: "Your responses indicate good health practices with some areas for improvement.",
        icon: <Activity className="h-8 w-8 text-emerald-500" />,
        color: "text-emerald-500",
        recommendations: [
          "Focus on the few areas where you can improve your health",
          "Maintain your positive health behaviors",
          "Consider a check-up if you haven't had one recently"
        ]
      };
    } else if (percentage >= 40) {
      return {
        category: "Moderate Risk",
        description: "Your responses indicate moderate health risks that should be addressed.",
        icon: <Info className="h-8 w-8 text-amber-500" />,
        color: "text-amber-500",
        recommendations: [
          "Consider scheduling a check-up with your healthcare provider",
          "Focus on improving your diet and physical activity",
          "Work on stress management techniques",
          "Review your sleep habits and make improvements"
        ]
      };
    } else {
      return {
        category: "High Risk",
        description: "Your responses indicate significant health risks that require attention.",
        icon: <AlertCircle className="h-8 w-8 text-red-500" />,
        color: "text-red-500",
        recommendations: [
          "Schedule a comprehensive health check-up as soon as possible",
          "Consider consulting with a healthcare provider about your risk factors",
          "Begin making gradual lifestyle changes to improve your health",
          "Focus on one or two key areas to improve first, such as quitting smoking or increasing physical activity"
        ]
      };
    }
  };
  
  const result = getResultCategory();

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4">
          {result.icon}
        </div>
        <CardTitle className={`text-2xl ${result.color}`}>{result.category}</CardTitle>
        <CardDescription className="text-lg">
          Your Health Assessment Score
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <span className="text-3xl font-bold">{score}</span>
          <span className="text-lg text-muted-foreground"> / {maxScore} points</span>
          <Progress value={percentage} className="h-3 mt-3" />
          <p className="mt-2 text-muted-foreground">{percentage}% of maximum score</p>
        </div>
        
        <div>
          <p className="mb-4">{result.description}</p>
          
          <h3 className="font-medium text-lg mb-2">Recommendations:</h3>
          <ul className="space-y-2">
            {result.recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>{recommendation}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-3">
        <Button className="w-full" onClick={onReset}>Take Assessment Again</Button>
        <Button variant="outline" className="w-full">Download Results</Button>
      </CardFooter>
    </Card>
  );
};

export default AssessmentResult;
