import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTimer } from "../features/Account/accountSlice";

export const useCountDown = (ms = 1000) => {
  const counter = useSelector((state) => state.account.register.timer);
  //   const [counter, setCountDown] = useState(total || 0);
  const [startCountDown, setStartCountDown] = useState(false);
  const dispatch = useDispatch();
  // Store the created interval
  const intervalId = useRef();
  const start = () => setStartCountDown(true);
  const pause = () => setStartCountDown(false);
  const reset = () => {
    clearInterval(intervalId.current);
    setStartCountDown(false);
    // setCountDown(total);
  };

  function setCountDown() {
    dispatch(setTimer(counter - 1));
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
