import { BORDER_WIDTH, PADDING } from "../constants/constants";

const calculateBoardSize = () =>
  Math.min(
    window.innerWidth / 2 - PADDING * 2 - BORDER_WIDTH,
    window.innerHeight - PADDING * 2 - BORDER_WIDTH
  );

export default calculateBoardSize;
