import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import QuizStart from "@/components/QuizStart";
import QuizQuestion from "@/components/QuizQuestion";
import DetailedResults from "@/components/DetailedResults";
import AccessCodeValidator from "@/components/AccessCodeValidator";
import { questions, type ShuffledQuestion, shuffleQuestionOptions } from "@/data/questions";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { LogOut } from "lucide-react";

const QUIZ_DURATION = 2 * 60 * 60; // 2 hours in seconds

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [codeValidated, setCodeValidated] = useState(false);
  const [stage, setStage] = useState<"start" | "question" | "results">("start");
  const [shuffledQuestions, setShuffledQuestions] = useState<ShuffledQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ questionId: number; selectedAnswer: number }[]>([]);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        if (!session?.user) {
          navigate("/auth");
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setUser(session?.user ?? null);
    setLoading(false);
    
    if (!session?.user) {
      navigate("/auth");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const startQuiz = () => {
    const shuffled = shuffleArray(questions).map(q => shuffleQuestionOptions(q));
    setShuffledQuestions(shuffled);
    setStage("question");
    setCurrentQuestionIndex(0);
    setScore(0);
    setUserAnswers([]);
    setStartTime(new Date());
  };

  const calculateFinalScore = (answers: { questionId: number; selectedAnswer: number }[]) => {
    let finalScore = 0;
    answers.forEach(answer => {
      const question = shuffledQuestions.find(q => q.id === answer.questionId);
      if (question) {
        const originalOption = question.shuffledOptions[answer.selectedAnswer];
        const originalIndex = question.options.indexOf(originalOption);
        if (originalIndex === question.correctAnswer) {
          finalScore++;
        }
      }
    });
    return finalScore;
  };

  const handleNext = async (selectedAnswer: number) => {
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    const newAnswers = [...userAnswers, {
      questionId: currentQuestion.id,
      selectedAnswer: selectedAnswer
    }];
    setUserAnswers(newAnswers);

    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const finalScore = calculateFinalScore(newAnswers);
      setScore(finalScore);
      await saveQuizAttempt(finalScore, newAnswers);
      setStage("results");
    }
  };

  const handleTimeUp = async () => {
    const finalScore = calculateFinalScore(userAnswers);
    setScore(finalScore);
    await saveQuizAttempt(finalScore, userAnswers);
    setStage("results");
    
    toast({
      title: "Time's Up!",
      description: "The quiz has been automatically submitted.",
      variant: "destructive"
    });
  };

  const saveQuizAttempt = async (finalScore: number, answers: { questionId: number; selectedAnswer: number }[]) => {
    if (!user) return;

    const timeTaken = startTime 
      ? Math.floor((new Date().getTime() - startTime.getTime()) / 1000)
      : 0;

    try {
      const { error } = await supabase.from("quiz_attempts").insert([
        {
          user_id: user.id,
          email: user.email!,
          score: finalScore,
          total_questions: shuffledQuestions.length,
          answers: answers,
          time_taken: timeTaken,
        },
      ]);

      if (error) {
        console.error("Error saving quiz attempt:", error);
        toast({
          title: "Error",
          description: "Failed to save quiz results",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error saving quiz attempt:", error);
    }
  };

  const restartQuiz = () => {
    setCodeValidated(false);
    setStage("start");
    setCurrentQuestionIndex(0);
    setScore(0);
    setUserAnswers([]);
    setStartTime(null);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  if (!codeValidated) {
    return <AccessCodeValidator onValidated={() => setCodeValidated(true)} />;
  }

  return (
    <div className="min-h-screen">
      {stage !== "results" && (
        <div className="absolute top-4 right-4 flex gap-2 z-10">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/admin")}
          >
            Admin
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      )}

      {stage === "start" && (
        <QuizStart onStart={startQuiz} totalQuestions={questions.length} />
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
        <DetailedResults
          score={score}
          totalQuestions={shuffledQuestions.length}
          questions={shuffledQuestions}
          userAnswers={userAnswers}
          onRestart={restartQuiz}
        />
      )}
    </div>
  );
};

export default Index;
