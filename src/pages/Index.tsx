import { useState, useEffect } from "react";
import QuizStart from "@/components/QuizStart";
import QuizQuestion from "@/components/QuizQuestion";
import QuizResults from "@/components/QuizResults";
import { questions, type Question } from "@/data/questions";

type QuizStage = "start" | "question" | "results";

const Index = () => {
  const [stage, setStage] = useState<QuizStage>("start");
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);

  // Fisher-Yates shuffle algorithm
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const startQuiz = () => {
    const shuffled = shuffleArray(questions);
    setShuffledQuestions(shuffled);
    setStage("question");
    setCurrentQuestionIndex(0);
    setScore(0);
    setUserAnswers([]);
  };

  const handleNext = (selectedAnswer: number) => {
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    setUserAnswers([...userAnswers, selectedAnswer]);
    
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setStage("results");
    }
  };

  const restartQuiz = () => {
    setStage("start");
    setCurrentQuestionIndex(0);
    setScore(0);
    setUserAnswers([]);
  };

  return (
    <>
      {stage === "start" && (
        <QuizStart 
          onStart={startQuiz} 
          totalQuestions={questions.length}
        />
      )}
      
      {stage === "question" && shuffledQuestions.length > 0 && (
        <QuizQuestion
          question={shuffledQuestions[currentQuestionIndex]}
          currentQuestion={currentQuestionIndex}
          totalQuestions={shuffledQuestions.length}
          onNext={handleNext}
        />
      )}
      
      {stage === "results" && (
        <QuizResults
          score={score}
          totalQuestions={questions.length}
          onRestart={restartQuiz}
        />
      )}
    </>
  );
};

export default Index;
