import { useEffect, useRef, useState } from "react";
import { useLandStore } from "@/store/slices/landSlice";

export const useForgetCountdown = (ms = 1000) => {
  const {
    forget: { timer: counter },
    setForgetTimer
  } = useLandStore();

  //   const [counter, setCountDown] = useState(total || 0);
  const [startCountDown, setStartCountDown] = useState(false);
  // Store the created interval
  const intervalId = useRef(null as any);
  const start = () => setStartCountDown(true);
  const pause = () => setStartCountDown(false);
  const reset = () => {
    clearInterval(intervalId.current);
    setStartCountDown(false);
    // setCountDown(total);
  };

  function setCountDown() {
    setForgetTimer(counter - 1);
  }

  useEffect(() => {
    intervalId.current = setInterval(() => {
      //   startCountDown &&
      counter > 0 && setCountDown();
    }, ms);
    // Clear interval when count to zero
    if (counter === 0) clearInterval(intervalId.current);
    // Clear interval when unmount
    return () => clearInterval(intervalId.current);
  }, [startCountDown, counter, ms]);

  return [counter, start, pause, reset];
};
