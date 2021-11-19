import type Habitat from "./habitat";
import { generateRandomInteger } from "../utils";

interface FindFreeHabitatParams {
  habitats: Habitat[][];
  worldSize: number;
  settlementAttemptLimit: number;
}

const findFreeHabitat = ({
  habitats,
  worldSize,
  settlementAttemptLimit,
}: FindFreeHabitatParams): Habitat | null => {
  let attempts = 0;

  while (attempts < settlementAttemptLimit) {
    const row = generateRandomInteger({ max: worldSize - 1 });
    const column = generateRandomInteger({ max: worldSize - 1 });
    const habitat = habitats[row][column];

    if (habitat.inhabitant === null) {
      return habitat;
    } else {
      attempts += 1;
    }
  }

  return null;
};

export default findFreeHabitat;
