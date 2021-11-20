import { nanoid } from "nanoid";

import type Habitat from "./habitat";

const generateHabitats = (worldSize: number): Habitat[][] => {
  const squares: Habitat[][] = [];

  for (let row = 0; row < worldSize; row++) {
    const nextRow: Habitat[] = [];
    for (let column = 0; column < worldSize; column++) {
      const square: Habitat = {
        id: nanoid(),
        row,
        column,
        inhabitant: null,
      };

      nextRow.push(square);
    }
    squares.push(nextRow);
  }

  return squares;
};

export default generateHabitats;
