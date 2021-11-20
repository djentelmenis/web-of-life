import type State from "../state/state";
import type Pop from "./pop";
import { InputNeuronType, Neuron } from "./neurons/neurons";

interface GetInputNeuronValueParams {
  state: State;
  pop: Pop;
  neuron: Neuron;
}

const getInputNeuronValue = ({
  state,
  pop,
  neuron,
}: GetInputNeuronValueParams): number => {
  switch (neuron.type) {
    case InputNeuronType.OSCILLOSCOPE:
      return state.tick % 2;
    case InputNeuronType.IS_UP_FREE:
      return pop.habitat.row &&
        state.habitats[pop.habitat.row - 1][pop.habitat.column]?.inhabitant
        ? 0
        : 1;
    case InputNeuronType.IS_DOWN_FREE:
      return pop.habitat.row < window.webOfLife.options.worldSize - 1 &&
        state.habitats[pop.habitat.row + 1][pop.habitat.column]?.inhabitant
        ? 0
        : 1;
    case InputNeuronType.IS_LEFT_FREE:
      return pop.habitat.column &&
        state.habitats[pop.habitat.row][pop.habitat.column - 1]?.inhabitant
        ? 0
        : 1;
    case InputNeuronType.IS_RIGHT_FREE:
      return pop.habitat.column < window.webOfLife.options.worldSize - 1 &&
        state.habitats[pop.habitat.row][pop.habitat.column + 1]?.inhabitant
        ? 0
        : 1;
    case InputNeuronType.LATITUDE:
      return pop.habitat.row / window.webOfLife.options.worldSize;
    case InputNeuronType.LONGITUDE:
      return pop.habitat.column / window.webOfLife.options.worldSize;
    case InputNeuronType.AGE:
      return state.tick / window.webOfLife.options.epochLength;
    case InputNeuronType.RANDOM:
      return Math.random();

    default:
      return 0;
  }
};

export default getInputNeuronValue;
