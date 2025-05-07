import { useCallback, useState } from "react";

type Reducer<S, A> = (state: S, action: A) => S;
export const useReducer = <S, A>(reducer: Reducer<S, A>, initialState: S): [S, (action: A) => void] => {
  const [state, setState] = useState<S>(initialState);
  const dispatch = (action: A) => {
    setState((prev) => reducer(prev, action));
  };
  return [state, dispatch];
};

export const useLazyReducer = <S, A>(
  reducer: Reducer<S, A>,
  initialState: S,
  init: any
): [S, (action: A) => void] => {
  const [state, setState] = useState<S>(init ? () => init(initialState) : initialState);
  const dispatch = useCallback(
    (action: A) => {
      setState((prev) => reducer(prev, action));
    },
    [reducer]
  );
  return [state, dispatch];
};
