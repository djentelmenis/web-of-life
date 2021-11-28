import type { EdgeConfig } from "@antv/g6";
import type { Brain } from "../../../pop/neurons/neurons";

const getGraphEdgesFromBrain = (brain: Brain): EdgeConfig[] =>
  [...brain.inputNeurons, ...brain.middleNeurons, ...brain.outputNeurons]
    .filter((neuron) => neuron.synapse.target)
    .map((neuron) => ({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      id: `${neuron.id}-${neuron.synapse.target!.id}`,
      source: neuron.id,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      target: neuron.synapse.target!.id,
      label: neuron.synapse.weight.toFixed(2).toString(),
    }));

export default getGraphEdgesFromBrain;
