import { useState, useEffect, useRef } from "react";
import QuizStart from "@/components/QuizStart";
import QuizQuestion from "@/components/QuizQuestion";
import QuizResults from "@/components/QuizResults";
import { questions, type ShuffledQuestion, shuffleQuestionOptions } from "@/data/questions";
import { toast } from "@/hooks/use-toast";

type QuizStage = "start" | "question" | "results";

const QUIZ_DURATION = 2.5 * 60 * 60; // 2.5 hours in seconds

const Index = () => {
  const [stage, setStage] = useState<QuizStage>("start");
  const [shuffledQuestions, setShuffledQuestions] = useState<ShuffledQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [quizStartTime, setQuizStartTime] = useState<number>(0);
  const hasAutoSubmitted = useRef(false);

  // Fisher-Yates shuffle algorithm
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const calculateFinalScore = (answers: (number | null)[], questions: ShuffledQuestion[]) => {
    let finalScore = 0;
    answers.forEach((answer, index) => {
      if (answer !== null && answer === questions[index].correctAnswerIndex) {
        finalScore++;
      }
    });
    return finalScore;
  };

  const startQuiz = () => {
    const shuffled = shuffleArray(questions).map(q => shuffleQuestionOptions(q));
    setShuffledQuestions(shuffled);
    setStage("question");
    setCurrentQuestionIndex(0);
    setScore(0);
    setUserAnswers(new Array(shuffled.length).fill(null));
    setQuizStartTime(Date.now());
    hasAutoSubmitted.current = false;
  };

  const handleTimeUp = () => {
    if (hasAutoSubmitted.current) return;
    hasAutoSubmitted.current = true;
    
    toast({
      title: "Time's Up!",
      description: "The quiz has been automatically submitted.",
      variant: "destructive"
    });
    
    const finalScore = calculateFinalScore(userAnswers, shuffledQuestions);
    setScore(finalScore);
    setStage("results");
  };

  const handleNext = (selectedAnswer: number) => {
    if (hasAutoSubmitted.current) return;
    
    // Update the answer for current question
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = selectedAnswer;
    setUserAnswers(newAnswers);

    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate final score
      const finalScore = calculateFinalScore(newAnswers, shuffledQuestions);
      setScore(finalScore);
      setStage("results");
    }
  };

  const restartQuiz = () => {
    setStage("start");
    setCurrentQuestionIndex(0);
    setScore(0);
    setUserAnswers([]);
    hasAutoSubmitted.current = false;
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
          timerDuration={QUIZ_DURATION}
          onTimeUp={handleTimeUp}
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
