import { useReducer } from "react";

type ReducerState<T> = T;
type ReducerAction<T> = ((prev: T) => T) | T;
const reducer = <T>(prev: T, action: (prevState: T) => T | T): T =>
  typeof action === "function" ? action(prev) : prev;
export const useState = <T>(initialState: T) => useReducer(reducer<T>, initialState);
