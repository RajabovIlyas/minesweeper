import { useState, useEffect } from "react";
export const useStopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId: number;
    if (isRunning) {
      intervalId = Number(setInterval(() => setTime(time + 1), 1000));
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);


  const startOrStopWatch = (value: boolean) => {
    setIsRunning(value);
  };

  const resetStopWatch = () => {
    setIsRunning(false)
    setTime(0);
  };
  return {resetStopWatch, startOrStopWatch, seconds: time, isRunning};
};
