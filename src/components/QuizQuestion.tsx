import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronRight } from "lucide-react";
import type { ShuffledQuestion } from "@/data/questions";
import QuizTimer from "./QuizTimer";
import logo from "@/assets/logo.png";

interface QuizQuestionProps {
  question: ShuffledQuestion;
  currentQuestion: number;
  totalQuestions: number;
  onNext: (selectedAnswer: number) => void;
  timerDuration: number;
  onTimeUp: () => void;
}

const QuizQuestion = ({ 
  question, 
  currentQuestion, 
  totalQuestions, 
  onNext,
  timerDuration,
  onTimeUp
}: QuizQuestionProps) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const handleNext = () => {
    if (selectedOption !== null) {
      onNext(selectedOption);
      setSelectedOption(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl p-6 md:p-8 space-y-6 shadow-2xl">
        {/* Header with Logo and Timer */}
        <div className="flex items-center justify-between border-b border-border pb-4">
          <img src={logo} alt="Logo" className="w-12 h-12 object-contain" />
          <QuizTimer duration={timerDuration} onTimeUp={onTimeUp} />
        </div>

        {/* Progress Section */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm font-medium">
            <span className="text-muted-foreground">
              Question {currentQuestion + 1} of {totalQuestions}
            </span>
            <span className="text-primary font-bold">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question */}
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
            {question.question}
          </h2>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {question.shuffledOptions.map((option, index) => (
            <button
              key={index}
              onClick={() => setSelectedOption(index)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                selectedOption === index
                  ? "border-primary bg-primary/10 shadow-md scale-[1.02]"
                  : "border-border hover:border-primary/50 hover:bg-secondary/50"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center font-semibold ${
                  selectedOption === index
                    ? "border-primary bg-primary text-white"
                    : "border-muted-foreground text-muted-foreground"
                }`}>
                  {String.fromCharCode(65 + index)}
                </div>
                <span className="text-base md:text-lg">{option}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Next Button */}
        <Button
          onClick={handleNext}
          disabled={selectedOption === null}
          size="lg"
          className="w-full gradient-primary text-white text-lg py-6 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
        >
          {currentQuestion === totalQuestions - 1 ? "Finish Quiz" : "Next Question"}
          <ChevronRight className="ml-2 w-5 h-5" />
        </Button>
      </Card>
    </div>
  );
};

export default QuizQuestion;
