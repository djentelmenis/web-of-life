import { SCREEN_OFFSET } from "../../constants/constants";
import type State from "../../state/state";
import clearFrame from "./clearFrame";
import drawHabitats from "./drawHabitats";
import drawPops from "./drawPops";

const draw = (state: State) => {
  const { worldSize } = window.webOfLife.options;

  const { canvas, pops } = state;
  const { innerWidth, innerHeight } = window;
  const screenSize = Math.min(innerWidth, innerHeight) - SCREEN_OFFSET;
  const habitatSize = screenSize / worldSize;
  const brush = canvas.getContext("2d");

  if (brush) {
    clearFrame({ brush, screenSize });
    drawHabitats({
      brush,
      worldSize,
      habitatSize,
      screenSize,
    });
    drawPops({
      brush,
      habitatSize,
      pops,
    });
  }
};

export default draw;
