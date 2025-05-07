import { createContext, ReactNode, useContext, useMemo } from "react";

type State = any;
const createStateContext = <T,>(useValue: (init: T) => State) => {
  const StateCtx = createContext<State | undefined>(undefined);
  const StateProvider = ({ init, children }: { init: T; children: ReactNode }) => {
    const value = useMemo(() => useValue(init), [init]);

    return <StateCtx.Provider value={value}>{children}</StateCtx.Provider>;
  };
  const useContextState = (): State => {
    const value = useContext(StateCtx);
    if (value === null) throw new Error("Provider missing");
    return value;
  };
  return [StateProvider, useContextState] as const;
};

export default createStateContext;

// function stateContext() {
//   const useNumberState = (init) => useState(init || 0);
//   const [Count1Provider, useCount1] = createStateContext(useNumberState);
//   const [Count2Provider, useCount2] = createStateContext(useNumberState);
//   const Counter1 = () => {
//     const [count1, setCount1] = useCount1();
//     return (
//       <div>
//         Count1: {count1} <button onClick={() => setCount1((c) => c + 1)}> +1 </button>
//       </div>
//     );
//   };

//   const Counter2 = () => {
//     const [count2, setCount2] = useCount2();
//     return (
//       <div>
//         Count2: {count2} <button onClick={() => setCount2((c) => c + 1)}> +1 </button>
//       </div>
//     );
//   };
// }

// const Parent = () => (
//   <div>
//     <Counter1 /> <Counter1 /> <Counter2 /> <Counter2 />
//   </div>
// );
// const App = () => (
//   <Count1Provider>
//     <Count2Provider>
//       <Parent />
//     </Count2Provider>
//   </Count1Provider>
// );
