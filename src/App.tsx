import { FunctionComponent } from "react";

import Canvas from "./components/Canvas/Canvas";
import SideBar from "./components/SideBar/SideBar";

import classes from "./App.module.scss";

const App: FunctionComponent = () => {
  return (
    <div className={classes.App}>
      <Canvas />
      <SideBar />
    </div>
  );
};

export default App;
