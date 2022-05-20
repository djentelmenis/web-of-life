import type Pop from "./pop";

import { DEATH_ZONE_RATIO } from "../constants/constants";

interface CullPopsParams {
  pops: Pop[];
  worldSize: number;
}

const cullPops = ({ pops, worldSize }: CullPopsParams): Pop[] =>
  pops.filter((pop) => pop.habitat.column > worldSize * DEATH_ZONE_RATIO);

export default cullPops;
