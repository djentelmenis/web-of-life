import type Pop from "./pop";

import findFreeHabitat from "../habitat/findFreeHabitat";
import Habitat from "../habitat/habitat";

interface ResettleParams {
  pops: Pop[];
  habitats: Habitat[][];
  worldSize: number;
  settlementAttemptLimit: number;
}

const resettlePops = ({
  pops,
  habitats,
  worldSize,
  settlementAttemptLimit,
}: ResettleParams): Pop[] =>
  pops.map((pop) => ({
    ...pop,
    habitat:
      findFreeHabitat({
        habitats,
        worldSize,
        settlementAttemptLimit,
      }) || pop.habitat,
  }));

export default resettlePops;
