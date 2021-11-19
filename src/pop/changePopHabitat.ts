import type Habitat from "../habitat/habitat";
import type Pop from "./pop";

interface ChangePopHabitatParams {
  pop: Pop;
  newHabitat: Habitat;
}

const changePopHabitat = ({ pop, newHabitat }: ChangePopHabitatParams) => {
  pop.habitat.inhabitant = null;
  pop.habitat = newHabitat;
  newHabitat.inhabitant = pop;
};

export default changePopHabitat;
