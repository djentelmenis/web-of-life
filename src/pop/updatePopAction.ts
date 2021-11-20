import type State from "../state/state";
import type Pop from "./pop";
import fireSynapse from "./fireSynapse";
import getInputNeuronValue from "./getInputNeuronValue";

interface UpdatePopActionParams {
  state: State;
  pop: Pop;
}

const updatePopAction = ({ state, pop }: UpdatePopActionParams) => {
  const { inputNeurons, middleNeurons, outputNeurons } = pop.brain;

  inputNeurons.forEach(
    (neuron) => (neuron.value = getInputNeuronValue({ state, pop, neuron }))
  );
  middleNeurons.forEach((neuron) => (neuron.value = 0));
  outputNeurons.forEach((neuron) => (neuron.value = 0));

  inputNeurons.forEach((neuron) => fireSynapse({ neuron }));

  let triggeredOutputNeuron = outputNeurons[0];
  outputNeurons.forEach((neuron) => {
    triggeredOutputNeuron =
      neuron.value > triggeredOutputNeuron.value
        ? neuron
        : triggeredOutputNeuron;
  });
  pop.action = triggeredOutputNeuron.type;
};

export default updatePopAction;
