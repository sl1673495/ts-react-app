type SetState<S> = (stateOrFn: S | Callback<S>) => void;
type Callback<S> = (prevState: S) => S

export function useState<S>(initialState: S): [S, SetState<S>] {
  let state = initialState;

  const setState: SetState<S> = (newState) => {
    if (isFunc(newState)) {
      state = newState(state)
    }else {
      state = newState;
    }
    return state;
  };

  return [state, setState];
}

function isFunc(val: any): val is Function {
  return typeof val === 'function'
}
