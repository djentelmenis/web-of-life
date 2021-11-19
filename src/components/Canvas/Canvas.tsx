import { FunctionComponent, useEffect, useState } from "react";

import { SCREEN_OFFSET } from "../../constants/constants";

const Canvas: FunctionComponent = () => {
  const [windowSize, setWindowSize] = useState(
    Math.min(window.innerWidth, window.innerHeight) - SCREEN_OFFSET
  );

  const onResize = () => {
    setWindowSize(
      Math.min(window.innerWidth, window.innerHeight) - SCREEN_OFFSET
    );
  };

  useEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;

    if (canvas) {
      window.addEventListener("resize", onResize);
    }

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div style={{ padding: SCREEN_OFFSET / 2 }}>
      <canvas id="canvas" width={windowSize} height={windowSize} />
    </div>
  );
};

export default Canvas;
