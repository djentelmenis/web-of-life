import type { NodeConfig } from "@antv/g6";
import type { Brain } from "../../../pop/neurons/neurons";

import getNeuronLabel from "./getNeuronLabel";

const getGraphNodesFromBrain = (brain: Brain): NodeConfig[] => {
  const numberOfInputNeurons = brain.inputNeurons.length;
  const numberOfMiddleNeurons = brain.middleNeurons.length;

  return [
    ...brain.inputNeurons.map((neuron, index) => ({
      id: neuron.id,
      label: getNeuronLabel(neuron.type),
      x: index * 100,
      y: 0,
      style: {
        fill: "#5469DE",
      },
      labelCfg: {
        position: "top",
      },
    })),
    ...brain.middleNeurons.map((neuron, index) => ({
      id: neuron.id,
      x: (index % numberOfInputNeurons) * 100,
      y: 200 + Math.floor(index / numberOfInputNeurons) * 100,
      style: {
        fill: "#6AA4F5",
        opacity: 0.3,
      },
    })),
    ...brain.outputNeurons.map((neuron, index) => ({
      id: neuron.id,
      label: getNeuronLabel(neuron.type),
      x: 75 + index * 150,
      y:
        400 +
        Math.floor((numberOfMiddleNeurons - 1) / numberOfInputNeurons) * 100,
      style: {
        fill: "#5FF2FA",
      },
      labelCfg: {
        position: "bottom",
      },
    })),
  ];
};

export default getGraphNodesFromBrain;
