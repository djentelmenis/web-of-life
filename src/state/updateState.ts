import type State from "./state";
import updatePopAction from "../pop/updatePopAction";
import executePopAction from "../pop/executePopAction";

const updateState = (state: State): State => {
  state.tick += 1;
  state.pops.forEach((pop) => {
    updatePopAction({ state, pop });
    executePopAction({ state, pop });
  });

  return state;
};

export default updateState;
