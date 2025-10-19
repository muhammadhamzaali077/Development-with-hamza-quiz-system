import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trophy, RotateCcw, CheckCircle2, XCircle } from "lucide-react";

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

const QuizResults = ({ score, totalQuestions, onRestart }: QuizResultsProps) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  const getResultMessage = () => {
    if (percentage >= 90) return { text: "Outstanding! 🎉", color: "text-green-600" };
    if (percentage >= 75) return { text: "Great Job! 👏", color: "text-green-500" };
    if (percentage >= 60) return { text: "Good Effort! 👍", color: "text-blue-500" };
    if (percentage >= 50) return { text: "Keep Practicing! 💪", color: "text-yellow-600" };
    return { text: "Keep Learning! 📚", color: "text-orange-600" };
  };

  const result = getResultMessage();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8 md:p-12 text-center space-y-6 shadow-2xl">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full gradient-accent mb-4 animate-pulse">
          <Trophy className="w-12 h-12 text-white" />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          Quiz Complete!
        </h1>
        
        <p className={`text-2xl md:text-3xl font-bold ${result.color}`}>
          {result.text}
        </p>

        {/* Score Display */}
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 space-y-4">
          <div className="space-y-2">
            <p className="text-lg text-muted-foreground font-medium">Your Score</p>
            <p className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {percentage}%
            </p>
          </div>
          
          <div className="flex items-center justify-center gap-8 text-lg">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
              <span className="font-semibold">{score} Correct</span>
            </div>
            <div className="flex items-center gap-2">
              <XCircle className="w-6 h-6 text-red-600" />
              <span className="font-semibold">{totalQuestions - score} Wrong</span>
            </div>
          </div>
        </div>

        {/* Performance Breakdown */}
        <div className="bg-secondary/50 rounded-lg p-6 space-y-2">
          <p className="font-semibold text-lg">Performance Summary</p>
          <p className="text-muted-foreground">
            You answered <span className="font-bold text-foreground">{score}</span> out of{" "}
            <span className="font-bold text-foreground">{totalQuestions}</span> questions correctly.
          </p>
        </div>

        <Button 
          onClick={onRestart}
          size="lg"
          className="w-full gradient-primary text-white text-lg py-6 hover:opacity-90 transition-opacity"
        >
          <RotateCcw className="mr-2 w-5 h-5" />
          Retake Quiz
        </Button>
      </Card>
    </div>
  );
};

export default QuizResults;
