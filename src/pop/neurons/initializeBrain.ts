import { nanoid } from "nanoid";

import { generateRandomBoolean, generateRandomInteger } from "../../utils";
import {
  Brain,
  InputNeuronType,
  MiddleNeuronType,
  OutputNeuronType,
} from "./neurons";
import removeNeuronLoops from "./removeNeuronLoops";

interface InitializeBrainParams {
  numberOfMiddleNeurons: number;
  numberOfSynapses: number;
}

const initializeBrain = ({
  numberOfMiddleNeurons,
  numberOfSynapses,
}: InitializeBrainParams): Brain => {
  const brain: Brain = {
    inputNeurons: [
      ...Object.values(InputNeuronType).map((neuronType) => ({
        id: nanoid(),
        type: neuronType,
        value: 0,
        synapse: {
          source: null,
          target: null,
          weight: 0,
        },
      })),
    ],
    outputNeurons: [
      ...Object.values(OutputNeuronType).map((neuronType) => ({
        id: nanoid(),
        type: neuronType,
        value: 0,
        synapse: {
          source: null,
          target: null,
          weight: 0,
        },
      })),
    ],
    middleNeurons: [
      ...new Array(numberOfMiddleNeurons).fill(0).map(() => ({
        id: nanoid(),
        type: MiddleNeuronType.MIDDLE_NEURON,
        value: 0,
        synapse: {
          source: null,
          target: null,
          weight: 0,
        },
      })),
    ],
  };

  const numberOfInputNeurons = brain.inputNeurons.length;
  const numberOfOutputNeurons = brain.outputNeurons.length;

  for (let i = 0; i < numberOfSynapses; i++) {
    const isSourceNeuronInputNeuron = generateRandomBoolean();
    const isOutputNeuronMiddleNeuron = generateRandomBoolean();

    const sourceNeuron = isSourceNeuronInputNeuron
      ? brain.inputNeurons[
          generateRandomInteger({ max: numberOfInputNeurons - 1 })
        ]
      : brain.middleNeurons[
          generateRandomInteger({ max: numberOfMiddleNeurons - 1 })
        ];

    const targetNeuron = isOutputNeuronMiddleNeuron
      ? brain.middleNeurons[
          generateRandomInteger({ max: numberOfMiddleNeurons - 1 })
        ]
      : brain.outputNeurons[
          generateRandomInteger({ max: numberOfOutputNeurons - 1 })
        ];

    sourceNeuron.synapse.target = targetNeuron;
    sourceNeuron.synapse.weight = Math.random();
    targetNeuron.synapse.source = sourceNeuron;
  }

  removeNeuronLoops({ brain });

  return brain;
};

export default initializeBrain;
