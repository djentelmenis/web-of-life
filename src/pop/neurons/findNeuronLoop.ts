import type { Neuron } from "./neurons";

interface FindNeuronLoopParams {
  neuron: Neuron;
  traversedNeurons: Map<string, Neuron>;
}

const findNeuronLoop = ({
  neuron,
  traversedNeurons,
}: FindNeuronLoopParams): Map<string, Neuron> | null => {
  if (neuron.synapse.target) {
    if (traversedNeurons.has(neuron.id)) {
      return traversedNeurons;
    } else {
      traversedNeurons.set(neuron.id, neuron);
      return findNeuronLoop({
        neuron: neuron.synapse.target,
        traversedNeurons,
      });
    }
  } else {
    return null;
  }
};

export default findNeuronLoop;
