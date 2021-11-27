import { Message, SENDER } from "canvas-input-manager";

import type Habitat from "../../habitat/habitat";
import type Pop from "../../pop/pop";

export interface HandleCanvasClickParams {
  message: Message<SENDER.INPUT_MANAGER, PointerEvent>;
  habitats: Habitat[][];
  pops: Pop[];
}

const handleCanvasClick = ({
  message,
  habitats,
  pops,
}: HandleCanvasClickParams) => {
  pops.forEach((pop) => (pop.selected = false));

  const { offsetX: x, offsetY: y } = message.context;
  const target = message.context.target as HTMLCanvasElement;
  const { height } = target;
  const habitatSize = height / window.webOfLife.options.worldSize;
  const row = Math.floor(y / habitatSize);
  const column = Math.floor(x / habitatSize);

  const { inhabitant } = habitats[row][column];
  if (inhabitant) {
    inhabitant.selected = true;
  }
};

export default handleCanvasClick;
