import { BORDER_WIDTH, PADDING, SIDEBAR_WIDTH } from "../constants/constants";

import calculateBoardSize from "./calculateBoardSize";

const calculateBrainMapSize = () =>
  Math.min(
    window.innerWidth -
      calculateBoardSize() -
      SIDEBAR_WIDTH -
      PADDING * 2 -
      BORDER_WIDTH,
    window.innerHeight - PADDING * 2 - BORDER_WIDTH
  );

export default calculateBrainMapSize;
