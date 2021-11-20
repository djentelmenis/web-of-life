import type State from "../../state/state";
import draw from "../draw/draw";
import updateState from "../../state/updateState";
import ElementId from "../../constants/elementId";

interface TickParams {
  state: State;
  previousUpdateTime: Date;
  previousFpsTime: Date;
  frame: number;
}

const tick = ({
  state,
  previousUpdateTime,
  previousFpsTime,
  frame,
}: TickParams) => {
  const currentTime = new Date();
  const deltaUpdateTime = currentTime.getTime() - previousUpdateTime.getTime();
  const deltaFpsTime = currentTime.getTime() - previousFpsTime.getTime();

  const shouldUpdateState =
    deltaUpdateTime > window.webOfLife.options.tickInterval;
  const shouldUpdateFps = deltaFpsTime > window.webOfLife.options.fpsInterval;

  const newState = shouldUpdateState ? updateState(state) : state;

  let newFrame: number;
  if (shouldUpdateFps) {
    const fpsCounter = document.getElementById(ElementId.FPS);
    const tickCounter = document.getElementById(ElementId.TICK);
    if (fpsCounter) {
      const fps = Math.round((frame / deltaFpsTime) * 1000).toString();
      fpsCounter.innerHTML = fps;
    }
    if (tickCounter) {
      tickCounter.innerHTML = state.tick.toString();
    }
    newFrame = 0;
  } else {
    newFrame = frame + 1;
  }

  draw(newState);

  if (
    !window.webOfLife.shouldSessionBeKilled &&
    state.tick < window.webOfLife.options.epochLength
  ) {
    window.requestAnimationFrame(() =>
      tick({
        state: newState,
        previousUpdateTime: shouldUpdateState
          ? currentTime
          : previousUpdateTime,
        previousFpsTime: shouldUpdateFps ? currentTime : previousFpsTime,
        frame: newFrame,
      })
    );
  } else {
    const fpsCounter = document.getElementById(ElementId.FPS);
    const tickCounter = document.getElementById(ElementId.TICK);
    if (fpsCounter) {
      fpsCounter.innerHTML = "0";
    }
    if (tickCounter) {
      tickCounter.innerHTML = state.tick.toString();
    }
  }
};

export default tick;
