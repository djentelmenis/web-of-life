import type { Brain, Neuron } from "./neurons";
import findNeuronLoop from "./findNeuronLoop";

interface RemoveNeuronLoopsParams {
  brain: Brain;
}

const removeNeuronLoops = ({ brain }: RemoveNeuronLoopsParams) => {
  brain.inputNeurons.forEach((neuron) => {
    const neuronLoop = findNeuronLoop({
      neuron,
      traversedNeurons: new Map<string, Neuron>(),
    });

    if (neuronLoop) {
      neuronLoop.forEach((value: Neuron) => {
        value.synapse.target = null;
        value.synapse.source = null;
      });
    }
  });
};

export default removeNeuronLoops;
