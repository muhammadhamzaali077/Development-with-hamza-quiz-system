import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

interface QuizTimerProps {
  duration: number; // in seconds
  onTimeUp: () => void;
}

const QuizTimer = ({ duration, onTimeUp }: QuizTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    const percentageLeft = (timeLeft / duration) * 100;
    if (percentageLeft <= 10) return "text-destructive";
    if (percentageLeft <= 25) return "text-warning";
    return "text-foreground";
  };

  const isWarning = (timeLeft / duration) * 100 <= 10;

  return (
    <div className={`flex items-center gap-2 font-mono text-lg font-bold ${getTimerColor()} ${isWarning ? 'animate-pulse' : ''}`}>
      <Clock className="w-5 h-5" />
      <span>{formatTime(timeLeft)}</span>
    </div>
  );
};

export default QuizTimer;
