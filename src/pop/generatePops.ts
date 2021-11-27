import { nanoid } from "nanoid";

import { generateRandomInteger } from "../utils";
import type Habitat from "../habitat/habitat";
import type Pop from "./pop";
import findFreeHabitat from "../habitat/findFreeHabitat";
import initializeBrain from "./neurons/initializeBrain";
import { OutputNeuronType } from "./neurons/neurons";

interface GeneratePopsParams {
  population: number;
  habitats: Habitat[][];
  worldSize: number;
  settlementAttemptLimit: number;
}

const generatePops = ({
  population,
  habitats,
  worldSize,
  settlementAttemptLimit,
}: GeneratePopsParams): Pop[] => {
  const pops: Pop[] = [];

  for (let i = 0; i < population; i++) {
    const habitat = findFreeHabitat({
      habitats,
      worldSize,
      settlementAttemptLimit,
    });

    if (habitat) {
      const pop: Pop = {
        id: nanoid(),
        habitat,
        action: OutputNeuronType.WAIT,
        color: generateRandomInteger({ max: 16777215 }),
        brain: initializeBrain({
          numberOfMiddleNeurons: window.webOfLife.options.numberOfMiddleNeurons,
          numberOfSynapses: window.webOfLife.options.numberOfSynapses,
        }),
        selected: false,
      };

      pops.push(pop);
    }
  }

  return pops;
};

export default generatePops;
