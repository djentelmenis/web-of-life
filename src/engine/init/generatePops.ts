import { nanoid } from "nanoid";

import type Habitat from "../../habitat/habitat";
import type Pop from "../../pop/pop";
import { PopAction } from "../../pop/pop";
import findFreeHabitat from "../../habitat/findFreeHabitat";
import { generateRandomInteger } from "../../utils";

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
        action: PopAction.WAIT,
        color: generateRandomInteger({ max: 16777215 }),
      };

      pops.push(pop);
    }
  }

  return pops;
};

export default generatePops;
