import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle, Trophy } from "lucide-react";
import type { ShuffledQuestion } from "@/data/questions";

interface UserAnswer {
  questionId: number;
  selectedAnswer: number;
}

interface DetailedResultsProps {
  score: number;
  totalQuestions: number;
  questions: ShuffledQuestion[];
  userAnswers: UserAnswer[];
  onRestart: () => void;
}

const DetailedResults = ({
  score,
  totalQuestions,
  questions,
  userAnswers,
  onRestart,
}: DetailedResultsProps) => {
  const percentage = Math.round((score / totalQuestions) * 100);

  const getResultMessage = () => {
    if (percentage >= 90) return { text: "Outstanding! 🌟", color: "text-green-600" };
    if (percentage >= 75) return { text: "Great Job! 🎉", color: "text-blue-600" };
    if (percentage >= 60) return { text: "Good Work! 👍", color: "text-yellow-600" };
    return { text: "Keep Practicing! 💪", color: "text-orange-600" };
  };

  const result = getResultMessage();

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="p-8 text-center space-y-6">
          <Trophy className="w-20 h-20 mx-auto text-yellow-500" />
          
          <div>
            <h1 className="text-4xl font-bold mb-2">Quiz Complete!</h1>
            <p className={`text-2xl font-semibold ${result.color}`}>{result.text}</p>
          </div>

          <div className="flex justify-center gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">{score}</div>
              <div className="text-sm text-muted-foreground">Correct Answers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">{totalQuestions}</div>
              <div className="text-sm text-muted-foreground">Total Questions</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">{percentage}%</div>
              <div className="text-sm text-muted-foreground">Score</div>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Detailed Review</h2>
          
          {questions.map((question, index) => {
            const userAnswer = userAnswers.find((a) => a.questionId === question.id);
            
            let isCorrect = false;
            let userAnswerText = "Not answered";
            
            if (userAnswer !== undefined) {
              const selectedShuffledOption = question.shuffledOptions[userAnswer.selectedAnswer];
              const originalIndex = question.options.indexOf(selectedShuffledOption);
              isCorrect = originalIndex === question.correctAnswer;
              userAnswerText = selectedShuffledOption;
            }

            return (
              <Card key={question.id} className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  {isCorrect ? (
                    <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  )}
                  <div className="flex-1 space-y-3">
                    <p className="font-semibold text-lg">
                      Question {index + 1}: {question.question}
                    </p>

                    <div className="space-y-2">
                      {question.options.map((option, optionIndex) => {
                        const isUserAnswer = userAnswerText === option;
                        const isCorrectAnswer = question.correctAnswer === optionIndex;

                        let bgColor = "bg-secondary/50";
                        if (isCorrectAnswer) {
                          bgColor = "bg-green-100 dark:bg-green-900/20 border-2 border-green-600";
                        } else if (isUserAnswer && !isCorrect) {
                          bgColor = "bg-red-100 dark:bg-red-900/20 border-2 border-red-600";
                        }

                        return (
                          <div
                            key={optionIndex}
                            className={`p-3 rounded-lg ${bgColor}`}
                          >
                            <div className="flex items-center justify-between">
                              <span>{option}</span>
                              <div className="flex gap-2">
                                {isCorrectAnswer && (
                                  <span className="text-sm font-semibold text-green-600">
                                    ✓ Correct
                                  </span>
                                )}
                                {isUserAnswer && !isCorrect && (
                                  <span className="text-sm font-semibold text-red-600">
                                    Your Answer
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {!isCorrect && userAnswer && (
                      <p className="text-sm text-muted-foreground">
                        Your answer: {userAnswerText} | Correct answer: {question.options[question.correctAnswer]}
                      </p>
                    )}
                    
                    {!userAnswer && (
                      <p className="text-sm text-red-600">
                        Not answered. Correct answer: {question.options[question.correctAnswer]}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <Button onClick={onRestart} className="w-full" size="lg">
          Take Quiz Again
        </Button>
      </div>
    </div>
  );
};

export default DetailedResults;
