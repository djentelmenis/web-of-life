import type Pop from "./pop";

import { DEATH_ZONE_RATIO } from "../constants/constants";
import ElementId from "../constants/elementId";

interface CullPopsParams {
  pops: Pop[];
  worldSize: number;
  population: number;
}

const cullPops = ({ pops, worldSize, population }: CullPopsParams): Pop[] => {
  const culledPops = pops.filter(
    (pop) => pop.habitat.column > worldSize * DEATH_ZONE_RATIO
  );
  const numberOfCulledPops = pops.length - culledPops.length;

  const culledCounter = document.getElementById(ElementId.CULLED_IN_EPOCH);
  if (culledCounter) {
    culledCounter.innerHTML = numberOfCulledPops.toString();
  }

  const survivorRate = document.getElementById(ElementId.SURVIVOR_RATE);
  if (survivorRate) {
    survivorRate.innerHTML = `${Math.round(
      (1 - numberOfCulledPops / population) * 100
    )} %`;
  }

  return culledPops;
};

export default cullPops;
