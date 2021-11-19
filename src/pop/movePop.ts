import type State from "../state/state";
import type Pop from "./pop";
import changePopHabitat from "./changePopHabitat";

interface MovePopParams {
  state: State;
  pop: Pop;
}

export const movePopLeft = ({ state, pop }: MovePopParams) => {
  const { row, column } = pop.habitat;

  if (column > 0) {
    const newColumn = column - 1;
    const newHabitat = state.habitats[row][newColumn];
    if (newHabitat.inhabitant === null) {
      changePopHabitat({ pop, newHabitat });
    }
  }
};

export const movePopRight = ({ state, pop }: MovePopParams) => {
  const { worldSize } = window.webOfLife.options;
  const { row, column } = pop.habitat;

  if (column < worldSize - 1) {
    const newColumn = column + 1;
    const newHabitat = state.habitats[row][newColumn];
    if (newHabitat.inhabitant === null) {
      changePopHabitat({ pop, newHabitat });
    }
  }
};

export const movePopUp = ({ state, pop }: MovePopParams) => {
  const { row, column } = pop.habitat;

  if (row > 0) {
    const newRow = row - 1;
    const newHabitat = state.habitats[newRow][column];
    if (newHabitat.inhabitant === null) {
      changePopHabitat({ pop, newHabitat });
    }
  }
};

export const movePopDown = ({ state, pop }: MovePopParams) => {
  const { worldSize } = window.webOfLife.options;
  const { row, column } = pop.habitat;

  if (row < worldSize - 1) {
    const newRow = row + 1;
    const newHabitat = state.habitats[newRow][column];
    if (newHabitat.inhabitant === null) {
      changePopHabitat({ pop, newHabitat });
    }
  }
};
