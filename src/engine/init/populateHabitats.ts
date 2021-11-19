import type State from "../../state/state";

const populateHabitats = (state: State): State => {
  state.pops.forEach((pop) => {
    const { row, column } = pop.habitat;
    state.habitats[row][column].inhabitant = pop;
  });

  return state;
};

export default populateHabitats;
