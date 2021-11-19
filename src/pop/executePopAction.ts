import type State from "../state/state";
import type Pop from "./pop";
import { PopAction } from "./pop";
import { movePopDown, movePopLeft, movePopRight, movePopUp } from "./movePop";

interface ExecutePopActionParams {
  state: State;
  pop: Pop;
}

const executePopAction = ({ state, pop }: ExecutePopActionParams) => {
  switch (pop.action) {
    case PopAction.MOVE_UP:
      movePopUp({ state, pop });
      break;
    case PopAction.MOVE_DOWN:
      movePopDown({ state, pop });
      break;
    case PopAction.MOVE_RIGHT:
      movePopRight({ state, pop });
      break;
    case PopAction.MOVE_LEFT:
      movePopLeft({ state, pop });
      break;

    case PopAction.WAIT:
    default:
      break;
  }
};

export default executePopAction;
