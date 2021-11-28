import { FunctionComponent, useState } from "react";
import type { Graph } from "@antv/g6";

import SideBar from "./components/SideBar/SideBar";
import GameBoard from "./components/GameBoard/GameBoard";
import BrainMap from "./components/BrainMap/BrainMap";

import classes from "./App.module.scss";

const App: FunctionComponent = () => {
  const [g6Graph, setG6Graph] = useState<Graph | null>(null);
  const [gameBoard, setGameBoard] = useState<HTMLCanvasElement | null>(null);

  return (
    <div className={classes.App}>
      <SideBar g6Graph={g6Graph} gameBoard={gameBoard} />
      <GameBoard setGameBoard={setGameBoard} />
      <BrainMap g6Graph={g6Graph} setG6Graph={setG6Graph} />
    </div>
  );
};

export default App;
