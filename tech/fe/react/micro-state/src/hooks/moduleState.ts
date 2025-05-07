export const createContainer = (initialState) => {
  let state = initialState;
  const getState = () => state;
  const setState = (nextState) => {
    state = typeof nextState === "function" ? nextState(state) : nextState;
  };
  return { getState, setState };
};

// const { getState, setState } = createContainer({  count: 0});
