import {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

import ElementId from "../../constants/elementId";
import { calculateBoardSize } from "../../utils";

import classes from "./GameBoard.module.scss";

interface GameBoardProps {
  setGameBoard: Dispatch<SetStateAction<HTMLCanvasElement | null>>;
}

const GameBoard: FunctionComponent<GameBoardProps> = ({
  setGameBoard,
}: GameBoardProps) => {
  const [canvasSize, setCanvasSize] = useState(calculateBoardSize());

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const onResize = () => setCanvasSize(calculateBoardSize());

  useEffect(() => {
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      setGameBoard(canvasRef.current);
    }
  }, [canvasRef]);

  return (
    <div className={classes.GameBoard}>
      <canvas
        id={ElementId.GAME_BOARD}
        ref={canvasRef}
        width={canvasSize}
        height={canvasSize}
      />
    </div>
  );
};

export default GameBoard;
