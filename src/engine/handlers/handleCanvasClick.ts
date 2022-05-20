import { Message, SENDER } from "canvas-input-manager";
import type { Graph } from "@antv/g6";

import type Habitat from "../../habitat/habitat";
import type Pop from "../../pop/pop";
import getGraphFromBrain from "./utils/getGraphFromBrain";

export interface HandleCanvasClickParams {
  message: Message<SENDER.INPUT_MANAGER, PointerEvent>;
  habitats: Habitat[][];
  pops: Pop[];
  graph: Graph;
}

const handleCanvasClick = ({
  message,
  habitats,
  pops,
  graph,
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
    graph.read(getGraphFromBrain(inhabitant.brain));
    graph.fitView();
  } else {
    graph.read({});
  }
};

export default handleCanvasClick;
