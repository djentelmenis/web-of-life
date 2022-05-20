import { nanoid } from "nanoid";

import { generateRandomInteger } from "../utils";
import type Habitat from "../habitat/habitat";
import type Pop from "./pop";
import findFreeHabitat from "../habitat/findFreeHabitat";

interface ReproducePopsParams {
  parentPops: Pop[];
  population: number;
  habitats: Habitat[][];
  worldSize: number;
  settlementAttemptLimit: number;
}

const reproducePops = ({
  parentPops,
  population,
  habitats,
  worldSize,
  settlementAttemptLimit,
}: ReproducePopsParams): Pop[] => {
  const pops: Pop[] = [];

  for (let i = 0; i < population; i++) {
    const parentProp =
      parentPops[generateRandomInteger({ max: parentPops.length - 1 })];

    const habitat = findFreeHabitat({
      habitats,
      worldSize,
      settlementAttemptLimit,
    });

    if (habitat) {
      const pop: Pop = {
        id: nanoid(),
        habitat,
        action: parentProp.action,
        color: parentProp.color,
        brain: parentProp.brain,
        selected: false,
      };

      pops.push(pop);
    }
  }

  return pops;
};

export default reproducePops;
