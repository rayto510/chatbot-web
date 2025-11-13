import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook that tracks elapsed time in seconds from a start point.
 * Returns the elapsed time and a function to reset the timer.
 */
export function useElapsedTimer() {
  const [start, setStart] = useState<number>(Date.now());
  const [elapsed, setElapsed] = useState<number>(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setElapsed(Math.floor((Date.now() - start) / 1000));
    }, 1000);
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [start]);

  const reset = () => {
    setStart(Date.now());
    setElapsed(0);
  };

  return { elapsed, reset };
}
