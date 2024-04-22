import { forwardRef, useEffect, useRef, useState } from "react";
import { AlertDialogDemo } from "./alert-dialog";

type TimerProps = {
  currentStep: number;
  initialSeconds: number;
};

// eslint-disable-next-line react/display-name
const Timer = forwardRef<HTMLDivElement, TimerProps>(
  ({ currentStep, initialSeconds }, ref) => {
    const [seconds, setSeconds] = useState<number>(initialSeconds);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const displaySeconds = seconds % 60;
    const displayMinutes = Math.floor(seconds / 60);

    useEffect(() => {
      if (currentStep === 1 && seconds > 0) {
        timeoutRef.current = setTimeout(() => {
          setSeconds((state) => state - 1);
        }, 1000);
      } else {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      }
    }, [seconds, currentStep]);

    return (
        seconds === 0 ? 
        <AlertDialogDemo /> :
        <div
          ref={ref}
          data-state={`${displayMinutes}:${
            displaySeconds < 10 ? `0${displaySeconds}` : displaySeconds
          }`}
        >
          {displayMinutes}:
          {displaySeconds < 10 ? `0${displaySeconds}` : displaySeconds}
        </div>
    );
  }
);

export default Timer;
// Usage
