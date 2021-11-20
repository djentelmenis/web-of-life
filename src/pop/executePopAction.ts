import type State from "../state/state";
import type Pop from "./pop";
import { movePopDown, movePopLeft, movePopRight, movePopUp } from "./movePop";
import { OutputNeuronType } from "./neurons/neurons";

interface ExecutePopActionParams {
  state: State;
  pop: Pop;
}

const executePopAction = ({ state, pop }: ExecutePopActionParams) => {
  switch (pop.action) {
    case OutputNeuronType.MOVE_UP:
      movePopUp({ state, pop });
      break;
    case OutputNeuronType.MOVE_DOWN:
      movePopDown({ state, pop });
      break;
    case OutputNeuronType.MOVE_RIGHT:
      movePopRight({ state, pop });
      break;
    case OutputNeuronType.MOVE_LEFT:
      movePopLeft({ state, pop });
      break;

    case OutputNeuronType.WAIT:
    default:
      break;
  }
};

export default executePopAction;
