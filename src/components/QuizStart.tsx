import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain } from "lucide-react";

interface QuizStartProps {
  onStart: () => void;
  totalQuestions: number;
}

const QuizStart = ({ onStart, totalQuestions }: QuizStartProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8 md:p-12 text-center space-y-6 shadow-2xl">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full gradient-primary mb-4">
          <Brain className="w-10 h-10 text-white" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          Development with Hamza
        </h1>
        
        <p className="text-xl text-muted-foreground">
          Test your web development knowledge
        </p>
        
        <div className="bg-secondary/50 rounded-lg p-6 space-y-3">
          <p className="text-lg font-semibold">Quiz Rules:</p>
          <ul className="text-left space-y-2 text-muted-foreground">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>{totalQuestions} questions in total</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Questions appear in random order</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>One question at a time</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>No going back to previous questions</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Your score will be shown at the end</span>
            </li>
          </ul>
        </div>
        
        <Button 
          onClick={onStart}
          size="lg"
          className="w-full gradient-primary text-white text-lg py-6 hover:opacity-90 transition-opacity"
        >
          Start Quiz
        </Button>
      </Card>
    </div>
  );
};

export default QuizStart;
