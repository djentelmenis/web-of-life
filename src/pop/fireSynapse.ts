import type { Neuron } from "./neurons/neurons";

interface FireSynapseParams {
  neuron: Neuron;
}

const fireSynapse = ({ neuron }: FireSynapseParams) => {
  if (
    neuron.synapse.target &&
    neuron.synapse.target !== neuron &&
    neuron.synapse.target !== neuron.synapse.source
  ) {
    const impulseValue = neuron.value * neuron.synapse.weight;
    neuron.synapse.target.value += impulseValue;
    fireSynapse({ neuron: neuron.synapse.target });
  }
};

export default fireSynapse;
